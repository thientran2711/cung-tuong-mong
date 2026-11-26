#!/usr/bin/env python3
"""SEAL GATE — the gate for mood-seal (con ấn / biểu tượng vẽ mặt) prompts ONLY (rule A24, owner 20/11 verbatim:
"Bây giờ làm một cái cổng riêng cho cái ấn đi. Không có làm cái cổng chung với nhân vật, nó không nó bị confused.").
check_store.py stays the FIGURE gate; no figure rule lives here and no seal rule lives there.

Every seal prompt (keyframe A, keyframe B, clips out / loop / back) must PASS right before the Magnific call. FAIL = no gen.

usage
  seal_gate.py --kind A|B|out|loop|back FILE.txt      one prompt in a text file (or '-' = stdin)
  seal_gate.py --json FILE.json                         any builder JSON (nested; leaves keyed A/B/out/loop/back, any case)
  seal_gate.py --builder groups/th_prompts.py [args]    run a seal builder and gate its whole output
  seal_gate.py --all                                    gate every seal builder in emo-anim/ (report only)
  seal_gate.py --self                                   self-test (good / bad samples)
exit 0 = PASS, 1 = FAIL. In python: import seal_gate; fails = seal_gate.check(text, kind); seal_gate.guard(dict) (exits 1 on FAIL).

Rules (seal only; source in brackets):
  S1 LEN      prompt > 10 000 characters = refused by the gen tool (MG3 finding, A24)
  S2 F14      Qing headdress words, even negated (owner Lượt 800; regex copied from check_store BANNED F14 — --self checks they still match)
  S3 TRANSP   transparent-background words (B9: seals are cut from the chroma green, never transparentBackground)
  S4 SLOT     an unfilled {slot} / 'None' left in the text
  S5 GREEN    A/B: 'flat pure chroma green (#00FF00)'; clips: 'flat chroma green background stays perfectly flat green' (recipe emo-anim/prompts.md:
              "the wording about the rim, the chroma green and 'no text' is what makes the cut work")
  S6 NOTEXT   A/B: 'no text' (or 'no letters or words' for a painted-symbol seal) (recipe; owner OD:L180 no characters)
  S7 FRAME    A: everything kept INSIDE the round medallion · B: bursts OUT of the round medallion + medallion stays round and centred ·
              out: bursts out of the round frame · loop: settles back to exactly the starting pose ·
              back: slides back inside the round medallion + exactly like the end frame (recipe §1–3)
  S8 CLIP     out/loop/back: 'static camera' + 'no camera move, no new objects' (recipe §3)
  S9 CROWN    A/B: Hoàng hậu / EMPRESS (not dowager) = LARGE phoenix crown; Hoàng quý phi = phoenix crown with ornaments as BIG as Quý phi's, never larger/grander than the Empress's, never 'small' (owner 20/11 ~01:01Z overrides 19/11 'small')
  S10 MALE    a male seal (he/his/him, man, emperor, eunuch, official…) must not hold a handkerchief: handkerchief / kerchief / hanky / khăn
              words FAIL unless negated (A25(1), owner 20/11: 'Đàn ông con trai mà cầm khăn.')
  S13 NOEAR   a WOMAN's seal (not S10-male, has a female word): any earring word = FAIL (every kind); keyframes A/B must carry
              master_common.EAR_SENT exactly once (rule F15, owner Lượt 1037: "... không ai được đeo hoa tai."; builders add it via emo-anim/seal_ear.py)
  S12 DISC    A/B: the disc (medallion) colour of the emotion = discs/disc_colours.json (rule A26, SEAL8): its 'en' words must be in the prompt and any
              hex in a medallion/disc sentence must be the table hex; 'PROPOSED' entries (act-ghen) only warn
  S11 CONSORT a consort seal (phi tần, any rank t1–t8 incl. Hoàng hậu; NOT Thái hậu) wears plain BROCADE: silk / gauze / sheer / translucent /
              see-through / chiffon / organza / tulle words on clothing FAIL unless negated (A25(3), owner 20/11: 'cứ cho nó mặc gấm bình thường')
"""
import json, os, re, subprocess, sys

PROMPT_MAX = 10000
F14_RX = re.compile(r'liang[- ]?ba[- ]?tou|\bqi[- ]?tou\b|two[- ]wing(?:ed)?\s+(?:black\s+)?(?:satin\s+)?(?:board|headdress)|(?:flat|black)[- ]board\s+headdress|board[- ]like\s+headdress|flag[- ](?:style|shaped)\s+headdress|banner\s+headdress|\bQing\b|\bManchu(?:rian)?\b', re.I)
TRANSP_RX = re.compile(r'background is (?:completely |fully )?transparent|transparent background|(?:completely|fully) transparent with NOTHING|transparentBackground', re.I)
SLOT_RX = re.compile(r'\{[^{}]{0,40}\}|\bNone\b')
KINDS = {"a": "A", "b": "B", "out": "out", "loop": "loop", "back": "back"}
REQ = {  # kind -> [(rule, regex, what)]
    "A": [("S5 GREEN", r"flat pure chroma green \(#00FF00\)", "flat pure chroma green (#00FF00)"),
          ("S6 NOTEXT", r"no text|no letters or words", "no text"),
          ("S7 FRAME", r"INSIDE the round (?:gold-rimmed )?medallion", "everything kept INSIDE the round medallion")],
    "B": [("S5 GREEN", r"flat pure chroma green \(#00FF00\)", "flat pure chroma green (#00FF00)"),
          ("S6 NOTEXT", r"no text|no letters or words", "no text"),
          ("S7 FRAME", r"\b(?:OUT|out) (?:of|over|through) the (?:gold )?(?:rim of the )?round (?:gold-rimmed )?(?:gold )?(?:medallion|frame)|\bover the gold rim", "comes OUT of the round medallion (or over the gold rim)"),
          ("S7 FRAME", r"medallion stays round and centred", "the medallion stays round and centred")],
    "out": [("S7 FRAME", r"\bout (?:of|over|through) the (?:gold )?(?:rim of the )?round (?:gold )?(?:frame|medallion)", "comes out of the round frame")],
    "loop": [("S7 FRAME", r"settles? back to exactly the starting pose", "settles back to exactly the starting pose")],
    "back": [("S7 FRAME", r"slides? back inside the round medallion", "slides back inside the round medallion"),
             ("S7 FRAME", r"exactly like the end frame", "exactly like the end frame")],
}
for _k in ("out", "loop", "back"):
    REQ[_k] += [("S5 GREEN", r"flat chroma green background stays perfectly flat green", "flat chroma green background stays perfectly flat green"),
                ("S8 CLIP", r"static camera", "static camera"),
                ("S8 CLIP", r"no camera move, no new objects", "no camera move, no new objects")]


MALE_RX = re.compile(r"\b(?:he|his|him|himself)\b|\b(?:young |old |older )?man\b|\bemperor\b|\beunuch\b|\bofficial\b|\bprince\b|Hoàng thượng|thái giám|\bboy\b", re.I)
FEM_RX = re.compile(r"\b(?:she|her|herself)\b|\bwoman\b|\bgirl\b|\bempress\b|\bconsort\b|\bprincess\b|\bmaid\b", re.I)
KERCHIEF_RX = re.compile(r"handkerchief|kerchief|\bhanky\b|\bkhăn\b", re.I)
CONSORT_RX = re.compile(r"\bconsort\b|phi tần|Đáp ứng|Thường tại|Quý nhân|\bTần\b|(?<!Hoàng )(?<!Quý )\bPhi\b|Quý phi|Hoàng quý phi|Hoàng hậu|\bEMPRESS\b(?! DOWAGER)", re.I)
NOT_CONSORT_RX = re.compile(r"dowager|Thái hậu|PALACE MAID|\(cung nữ\)|MA MA|head maid|PRINCESS|PRINCE\b")  # subject is not a consort (case-sensitive caps = the WHO noun)
CLOTH = r"(?:robes?|sleeves?|dress|gown|shawl|scarf|veil|skirt|sash|hanfu|cloth|fabric|outfit|garment|collar|cuffs?|over-?vest|jacket|cape|ribbons?)"
SHEER_RX = re.compile(r"\b(?:silk(?:en)?|gauze|gauzy|sheer|translucent|see-through|transparent|chiffon|organza|tulle)\b(?:[\w\s(),#-]{0,30}?)\b" + CLOTH + r"\b|\b" + CLOTH + r"\b of (?:[a-z]+,? ){0,5}(?:silk|gauze|chiffon|organza|tulle)\b", re.I)
NEG_RX = re.compile(r"\b(no|not|never|without|nothing|none|nor|instead of)\b", re.I)


def negated(text, a, b):
    lo = max(text.rfind(c, 0, a) for c in ".;:(),"); hi = [text.find(c, b) for c in ".;:(),"]; hi = min([h for h in hi if h >= 0] or [len(text)])
    return bool(NEG_RX.search(text[lo + 1:hi]))


def _mc():   # S13: the ONE earring source (dev/art/master_common.py EAR_SENT / EAR_RX), not a copy
    sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__)))); import master_common
    return master_common


def is_male(t):
    return len(MALE_RX.findall(t)) > len(FEM_RX.findall(t))


def kind_of(key):
    return KINDS.get(str(key).lower())


_DISC = None
def disc_table():
    global _DISC
    if _DISC is None:
        try: _DISC = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "discs", "disc_colours.json")))["colours"]
        except Exception: _DISC = {}
    return _DISC


def disc_fails(t, key):
    d = disc_table().get(key)
    if not d: return []
    prop = "PROPOS" in json.dumps(d).upper()
    tag = "S12 DISC (warn: proposed)" if prop else "S12 DISC"
    out = []
    if d["en"].lower() not in t.lower(): out.append((tag, f"'{key}' disc must be '{d['en']}' {d['hex']} (A26 table)"))
    for sent in re.split(r"(?<=[.;])\s+", t):
        if re.search(r"medallion|\bdisc\b", sent, re.I):
            for h in re.findall(r"#[0-9A-Fa-f]{6}", sent):
                if h.upper() not in (d["hex"].upper(), "#00FF00") and not re.search(r"robe|collar|sleeve|vest|hanfu|jacket|crown|hair", sent[max(0, sent.find(h) - 60):sent.find(h) + 40], re.I):
                    out.append((tag, f"disc hex {h} != table {d['hex']} for '{key}'"))
    return out


def check(text, kind, key=None):
    """-> list of (rule, message). Empty = PASS."""
    kind = kind_of(kind) or kind
    t = text.strip(); f = []
    if len(t) > PROMPT_MAX: f.append(("S1 LEN", f"{len(t)} characters > {PROMPT_MAX} (gen tool refuses)"))
    for m in F14_RX.finditer(t): f.append(("S2 F14", f"Qing headdress word '{m.group(0)}' (banned even negated, Lượt 800)"))
    for m in TRANSP_RX.finditer(t): f.append(("S3 TRANSP", f"'{m.group(0)}' (seals use chroma green, B9)"))
    for m in SLOT_RX.finditer(t): f.append(("S4 SLOT", f"unfilled slot '{m.group(0)}'"))
    for rule, rx, what in REQ.get(kind, []):
        if not re.search(rx, t, re.I): f.append((rule, f"missing '{what}'"))
    if kind in ("A", "B"):
        crown = re.search(r"phoenix crown", t, re.I)
        if re.search(r"Hoàng hậu|\bEMPRESS\b(?! DOWAGER)", t) and not re.search(r"dowager|Thái hậu", t, re.I):
            if not re.search(r"\bLARGE\b[^.;]{0,40}phoenix crown|phoenix crown[^.;]{0,20}\blarge\b", t, re.I):
                f.append(("S9 CROWN", "Hoàng hậu seal without a LARGE phoenix crown (owner 19/11 ~17:00Z)"))
        if re.search(r"Hoàng quý phi|imperial noble consort", t, re.I):
            # owner 20/11 ~01:01Z: "trâm cài to như của quí phi, nhưng là mũ phượng bậc hoàng quý phi, không to hơn hoàng hậu"
            if not crown or not re.search(r"(never|not|no)\b[^.;]{0,30}(larger|bigger|grander)[^.;]{0,40}(empress|Hoàng hậu)", t, re.I):
                f.append(("S9 CROWN", "Hoàng quý phi seal needs a phoenix crown + 'never larger/grander than the empress' (owner 20/11 ~01:01Z)"))
            if re.search(r"\bsmall\b[^.;]{0,40}phoenix crown", t, re.I):
                f.append(("S9 CROWN", "Hoàng quý phi crown must not be 'small' — as big as Quý phi's (owner 20/11 ~01:01Z)"))
    if key and kind in ("A", "B"): f += disc_fails(t, key)
    if is_male(t):
        for m in KERCHIEF_RX.finditer(t):
            if not negated(t, m.start(), m.end()): f.append(("S10 MALE", f"male seal with '{m.group(0)}' (A25: men never hold a handkerchief)")); break
    if not is_male(t) and FEM_RX.search(t):   # S13 NOEAR (rule F15, owner Lượt 1037): no woman wears painted earrings
        _M = _mc(); m = _M.EAR_RX.search(t.replace(_M.EAR_SENT, " "))
        if m: f.append(("S13 NOEAR", f"earring word '{m.group(0)}' in a woman's seal (F15: earrings are a separate layer)"))
        if kind in ("A", "B") and t.count(_M.EAR_SENT) != 1: f.append(("S13 NOEAR", f"bare-earlobes sentence {t.count(_M.EAR_SENT)} times (must be 1): '{_M.EAR_SENT}'"))
    if CONSORT_RX.search(t) and not NOT_CONSORT_RX.search(t):
        for m in SHEER_RX.finditer(t):
            if not negated(t, m.start(), m.end()): f.append(("S11 CONSORT", f"consort seal in silk/gauze: '{m.group(0)}' (A25: plain brocade)")); break
    return f


def walk(o, path=()):
    """yield (path, kind, text) for every prompt leaf of a builder JSON."""
    if isinstance(o, dict):
        for k, v in o.items():
            if isinstance(v, str) and kind_of(k): yield path + (k,), kind_of(k), v
            else: yield from walk(v, path + (k,))
    elif isinstance(o, list):
        for i, v in enumerate(o): yield from walk(v, path + (str(i),))


def check_obj(o):
    res = []
    for p, k, t in walk(o):
        key = next((x for x in reversed(p) if x in disc_table()), None)
        res.append(("/".join(p), k, len(t), check(t, k, key)))
    return res


def report(res, name="", out=sys.stdout, quiet=False):
    bad = [r for r in res if r[3]]
    for p, k, n, f in res:
        if f or not quiet:
            print(f"{'FAIL' if f else 'PASS'} {name}{'/' if name else ''}{p} [{k}, {n} ch]", file=out)
            for rule, msg in f: print(f"   {rule}: {msg}", file=out)
    print(f"SEAL GATE {name}: {len(res)} prompts, {len(bad)} FAIL -> {'FAIL = no gen' if bad else 'PASS'}", file=out)
    return not bad


def guard(o, name=""):
    """for builders: gate the whole output; on FAIL print the report to stderr and exit 1 (prompts are NOT printed = no gen)."""
    if os.environ.get("SEAL_GATE_OFF") == "1": return o   # only seal_gate --all / --builder set this (to list every hit itself)
    res = check_obj(o)
    if any(r[3] for r in res):
        report(res, name, out=sys.stderr, quiet=True); sys.exit(1)
    return o


HERE = os.path.dirname(os.path.abspath(__file__))
BUILDERS = [  # (name, argv relative to emo-anim/, or a JSON file to read)
    ("w-new", ["w-new/prompts.py"]), ("w-act", ["w-act/prompts.py"]), ("m", ["m/prompts.py"]), ("m-new", ["m-new/prompts.py"]),
    ("m-act", ["m-act/prompts.py"]), ("mo", ["mo/prompts.py"]), ("mo-new", ["mo-new/prompts.py"]), ("mo-act", "MOACT"),
    ("grp_gian", ["groups/grp_gian_prompts.py"]), ("grp_set bg", ["groups/grp_set_prompts.py", "bg"]),
    ("grp_set bt", ["groups/grp_set_prompts.py", "bt"]), ("grp_set mm", ["groups/grp_set_prompts.py", "mm"]),
    ("hh", ["groups/hh_prompts.py"]), ("th", ["groups/th_prompts.py"]), ("sg4", ["groups/sg4_prompts.py"]), ("sg2", "SG2"),
]


def run_builder(argv):
    env = dict(os.environ, SEAL_GATE_OFF="1")  # the builder's own guard is off here so the gate can list every hit
    r = subprocess.run([sys.executable] + argv, cwd=HERE, capture_output=True, text=True, env=env)
    if r.returncode or not r.stdout.strip(): raise RuntimeError((r.stderr or r.stdout)[-400:])
    return json.loads(r.stdout)


def gate_all(quiet=True):
    ok = True
    for name, src in BUILDERS:
        try:
            if src == "SG2":
                sys.path.insert(0, os.path.join(HERE, "groups")); import sg2_prompts as s2
                o = {k: run_builder(["groups/sg2_prompts.py", k]) for k in s2.G}
            elif src == "MOACT":  # this builder writes prompts.json into its cwd instead of printing
                import tempfile
                with tempfile.TemporaryDirectory() as td:
                    subprocess.run([sys.executable, os.path.join(HERE, "mo-act/prompts.py")], cwd=td, capture_output=True, check=True,
                                   env=dict(os.environ, SEAL_GATE_OFF="1"))
                    o = json.load(open(os.path.join(td, "prompts.json")))
            else: o = run_builder(src)
        except Exception as e:
            print(f"ERROR {name}: {e}"); ok = False; continue
        ok &= report(check_obj(o), name, quiet=quiet)
    return ok


def selftest():
    good = {"A": "Same style, same round gold-rimmed red medallion. Everything kept INSIDE the round medallion. Whole picture on a flat pure chroma green (#00FF00) background outside the medallion, nothing else, no text.",
            "B": "NEW: she bursts OUT of the round medallion toward the viewer. The medallion stays round and centred. " + _mc().EAR_SENT + " Whole picture on a flat pure chroma green (#00FF00) background, nothing else, no text.",
            "out": "Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green the whole time. She bursts out of the round frame. No camera move, no new objects.",
            "loop": "Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green. Then she settles back to exactly the starting pose. no camera move, no new objects.",
            "back": "Hand-painted storybook animation, static camera, flat chroma green background stays perfectly flat green. She slowly slides back inside the round medallion, exactly like the end frame. no camera move, no new objects."}
    bad = [("A", good["A"] + " of the Qing-style inner palace", "S2 F14"), ("A", good["A"].replace("no text", "no words"), "S6 NOTEXT"),
           ("B", good["B"] + " not a liangbatou", "S2 F14"), ("out", good["out"].replace("static camera, ", ""), "S8 CLIP"),
           ("A", good["A"] + " x" * 6000, "S1 LEN"), ("B", good["B"] + " {FACE}", "S4 SLOT"), ("A", good["A"] + " transparent background", "S3 TRANSP"),
           ("A", good["A"] + " the person is the EMPRESS (Hoàng hậu) with a small phoenix crown.", "S9 CROWN"),
           ("back", good["back"].replace("exactly like the end frame", "like before"), "S7 FRAME"),
           ("B", good["B"].replace("she bursts", "he bursts") + " He is a young EMPEROR; his hands tug a pink silk handkerchief.", "S10 MALE"),
           ("A", good["A"] + " The person is a consort (Quý nhân) in a pale blue silk robe with sheer gauze sleeves.", "S11 CONSORT"),
           ("A", good["A"] + " A consort in a brocade robe, pearl earrings. " + _mc().EAR_SENT, "S13 NOEAR"),   # F15: earring word in a woman's seal
           ("B", good["B"].replace(_mc().EAR_SENT + " ", ""), "S13 NOEAR")]   # F15: woman's keyframe without the bare-earlobes sentence
    n2 = 0
    for k, t in (("B", good["B"] + " He is a young emperor, his hands raised, no handkerchief."), ("A", good["A"] + " A consort (Tần) in a plain brocade robe, no silk. " + _mc().EAR_SENT),
                 ("A", good["A"] + " The elderly empress dowager in a royal yellow silk robe. " + _mc().EAR_SENT), ("B", good["B"] + " A maid girl in a pale silk robe tugs a pink silk handkerchief.")):
        if check(t, k): print("SELF BAD good2", k, check(t, k)); n2 += 1
    n = n2
    for k, t in good.items():
        if check(t, k): print("SELF BAD good", k, check(t, k)); n += 1
    for k, t, want in bad:
        if want not in [r for r, _ in check(t, k)]: print("SELF BAD bad", k, want, check(t, k)); n += 1
    try:  # F14 copy must equal check_store's
        sys.path.insert(0, os.path.dirname(HERE)); import check_store as cs
        src = [b["regex"] for b in cs.BANNED if b["id"] == "F14"][0]
        if src != F14_RX.pattern: print("SELF BAD: F14 regex differs from check_store BANNED F14 — copy it again"); n += 1
    except Exception as e: print("self: could not compare F14 with check_store:", e)
    print(f"seal_gate --self: {len(good)} good, {len(bad)} bad samples, {n} problems"); return n == 0


def main(a):
    if not a or a[0] in ("-h", "--help"): print(__doc__); return 0
    if a[0] == "--self": return 0 if selftest() else 1
    if a[0] == "--all": return 0 if gate_all(quiet="-v" not in a) else 1
    if a[0] == "--json": return 0 if report(check_obj(json.load(open(a[1]))), os.path.basename(a[1]), quiet="-v" not in a) else 1
    if a[0] == "--builder": return 0 if report(check_obj(run_builder(a[1:] if not os.path.isabs(a[1]) else a[1:])), a[1], quiet=False) else 1
    if a[0] == "--kind":
        k = kind_of(a[1]); t = sys.stdin.read() if a[2] == "-" else open(a[2]).read()
        f = check(t, k); return 0 if report([(a[2], k, len(t.strip()), f)]) else 1
    print(__doc__); return 2


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))

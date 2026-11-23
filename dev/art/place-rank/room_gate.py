#!/usr/bin/env python3
"""ROOM GATE — the gate for ROOM prompts only (rule A24: every prompt sent to Magnific, rooms included, must PASS its gate right
before the call; FAIL = no gen). Separate file on purpose, like the seal gate (owner 20/11: own gate, not mixed with the figure gate,
"nó không nó bị confused"). check_store.py stays the figure/face gate; no figure rule lives here.

usage
  room_gate.py FILE.txt [--ranks 1,3]          one room prompt (or '-' = stdin); --ranks = occupant ranks t1..t8 (else read from the text)
  room_gate.py --json prompts_pr13.json        a room builder JSON {key: {"prompt": ...}} or {key: "..."}
  room_gate.py --self                          self-test
exit 0 = PASS, 1 = FAIL. In python: import room_gate; room_gate.check(text, ranks=None) -> [(rule, msg)]; room_gate.guard(OUT) exits 1 on FAIL.

Rules (room only; source in brackets):
  R1 LEN     > 10 000 characters = refused by the gen tool (A24 / MG3)
  R2 F14     Qing headdress / Qing look words, even negated (owner Lượt 800, every picture; regex = check_store BANNED F14)
  R3 TRANSP  transparent-background words (rooms are full backdrops; B9)
  R4 SLOT    an unfilled {slot} / 'None'
  R5 B24     rank colours = the ONE RANK COLOUR SYSTEM (B24, L1, L7, L17): dead codes FAIL; every occupant rank's hex present;
             no other rank's hex (royal yellow #EFBD69 allowed as the small touch from t6 up)
  R6 VIEW    FRONTAL ONLY (L14, L20, Lượt 718): no oblique / góc xéo / angled / three-quarter / diagonal view words (unless negated); the
             text must say 'straight on' or 'frontal'
  R7 SOFA    no Western sofa / couch (L6) unless negated
  R8 SHAPE   no curved hall / furniture in an arc / semicircle (L5) unless negated
  R9 DRIFT   the PR-room builder's own drift words (L16 no visible ceiling, no glossy): 'coffered', 'high ceiling', 'floor-to-ceiling', 'everywhere', 'BRIGHT'
  R10 RANK   below t7 (no Hoàng quý phi / Hoàng hậu occupant): no phoenix and no imperial/royal yellow unless negated (L1, L8, B24;
             t6 Quý phi may keep the small royal-yellow touch)
  R11 BED    a bedroom (with a bed) = a tall canopy frame bed (L21 Lượt 804–807); a shared phối bedroom = TWO beds (L7)
"""
import json, os, re, sys

PROMPT_MAX = 10000
F14_RX = re.compile(r'liang[- ]?ba[- ]?tou|\bqi[- ]?tou\b|two[- ]wing(?:ed)?\s+(?:black\s+)?(?:satin\s+)?(?:board|headdress)|(?:flat|black)[- ]board\s+headdress|board[- ]like\s+headdress|flag[- ](?:style|shaped)\s+headdress|banner\s+headdress|\bQing\b|\bManchu(?:rian)?\b', re.I)
TRANSP_RX = re.compile(r'background is (?:completely |fully )?transparent|transparent background|(?:completely|fully) transparent with NOTHING|transparentBackground', re.I)
SLOT_RX = re.compile(r'\{[^{}]{0,40}\}|\bNone\b')
NEG = re.compile(r"\b(no|not|never|without|nothing|none|nor)\b", re.I)
B24 = {1: "#EAE3D0", 2: "#7FB394", 3: "#7E9CCB", 4: "#E3A3B8", 5: "#A88BCB", 6: "#E3A25B", 7: "#D46A64", 8: "#EFBD69"}
DEAD = {"#5FA8A6": "old t4 jade-teal (option B)", "#4F86A8": "old t6 kingfisher blue (option B)", "#C65A4C": "old t8 trim (option B; now #B04E3A measured on 79fMiEWJAL)"}
RANK_RX = [(7, r"Hoàng quý phi|imperial noble consort"), (8, r"Hoàng hậu|Khôn Ninh|\bEmpress\b"), (6, r"(?<!Hoàng )Quý phi"),
           (5, r"\bPhi\b"), (4, r"\bTần\b"), (3, r"Quý nhân"), (2, r"Thường tại"), (1, r"Đáp ứng")]
VIEW_RX = re.compile(r"\boblique\b|góc xéo|\bangled (?:view|camera|version)|three[- ]quarter (?:view|angle)|\bdiagonal (?:view|camera)|seen from a corner|corner view", re.I)
SOFA_RX = re.compile(r"\bsofa\b|\bcouch\b", re.I)
SHAPE_RX = re.compile(r"curved hall|in an arc\b|\barc of (?:chairs|seats)|semi-?circle", re.I)
DRIFT = [("coffered", re.I), ("high ceiling", re.I), ("floor-to-ceiling", re.I), ("everywhere", re.I), ("BRIGHT", 0)]
PHOENIX_RX = re.compile(r"phoenix", re.I)
YELLOW_RX = re.compile(r"imperial yellow|royal yellow|golden-yellow|#EFBD69", re.I)


def negated(text, a, b):
    lo = max(text.rfind(c, 0, a) for c in ".;:()"); hi = [text.find(c, b) for c in ".;:()"]; hi = min([h for h in hi if h >= 0] or [len(text)])
    return bool(NEG.search(text[lo + 1:hi]))


def occupants(text):
    """ranks of the occupants, read from the room sentence: '(a Đáp ứng and a Thường tại)', '(two Quý nhân)', 'where the Empress …'."""
    m = re.search(r"consorts? \((?:a|an|two) ([^)]{2,60})\)", text)
    if m:  # shared phối room: every rank named in the brackets
        return sorted({r for r, rx in RANK_RX if re.search(rx, m.group(1))})
    m = re.search(r"ROOM: ([^.]{0,300})", text)  # single occupant: the FIRST rank named in the room sentence (later ones are comparisons)
    seg = m.group(1) if m else text[:600]
    hits = [(mm.start(), r) for r, rx in RANK_RX for mm in [re.search(rx, seg)] if mm]
    return [min(hits)[1]] if hits else []


def check(text, ranks=None):
    t = text.strip(); f = []
    if len(t) > PROMPT_MAX: f.append(("R1 LEN", f"{len(t)} characters > {PROMPT_MAX} (gen tool refuses)"))
    for m in F14_RX.finditer(t): f.append(("R2 F14", f"Qing word '{m.group(0)}' (banned even negated, Lượt 800)"))
    for m in TRANSP_RX.finditer(t): f.append(("R3 TRANSP", f"'{m.group(0)}'"))
    for m in SLOT_RX.finditer(t): f.append(("R4 SLOT", f"unfilled slot '{m.group(0)}'"))
    have = {h.upper() for h in re.findall(r"#[0-9A-Fa-f]{6}", t)}
    for h, w in DEAD.items():
        if h in have: f.append(("R5 B24", f"dead rank code {h} ({w})"))
    rk = sorted(set(ranks)) if ranks else occupants(t)
    if rk:
        for r in rk:
            if B24[r] not in have: f.append(("R5 B24", f"occupant t{r}: rank colour {B24[r]} missing"))
        for r, h in B24.items():
            if h in have and r not in rk and not (r == 8 and max(rk) >= 6):
                f.append(("R5 B24", f"{h} = t{r} colour, but the occupants are t{','.join(map(str, rk))}"))
    for m in VIEW_RX.finditer(t):
        if not negated(t, m.start(), m.end()): f.append(("R6 VIEW", f"'{m.group(0)}' — rooms are FRONTAL only (L14/L20)"))
    if not re.search(r"straight on|frontal", t, re.I): f.append(("R6 VIEW", "no 'straight on' / 'frontal' camera words (L14)"))
    for m in SOFA_RX.finditer(t):
        if not negated(t, m.start(), m.end()): f.append(("R7 SOFA", f"'{m.group(0)}' (L6: no Western sofa)"))
    for m in SHAPE_RX.finditer(t):
        if not negated(t, m.start(), m.end()): f.append(("R8 SHAPE", f"'{m.group(0)}' (L5: rectilinear, never an arc)"))
    for w, fl in DRIFT:
        if re.search(re.escape(w), t, fl): f.append(("R9 DRIFT", f"drift word '{w}' (L16)"))
    top = max(rk) if rk else 0
    if rk and top < 7:
        for m in PHOENIX_RX.finditer(t):
            if not negated(t, m.start(), m.end()): f.append(("R10 RANK", f"'phoenix' in a t{top} room (only t7/t8)")); break
        if top < 6:
            for m in YELLOW_RX.finditer(t):
                if not negated(t, m.start(), m.end()): f.append(("R10 RANK", f"'{m.group(0)}' in a t{top} room")); break
    bedroom = re.search(r"\bbedroom\b|bedchamber", t, re.I) and not re.search(r"no bed anywhere", t, re.I)
    if bedroom:
        if not re.search(r"canopy (?:frame )?beds?|canopy bed", t, re.I): f.append(("R11 BED", "bedroom without a canopy bed (L21)"))
        if re.search(r"SHARED by two", t) and not re.search(r"\b(?:two|TWO)\b[^.]{0,80}\bbeds\b|exactly two beds", t, re.I):
            f.append(("R11 BED", "shared phối bedroom without TWO beds (L7)"))
    return f


def check_obj(o):
    return [(k, len(v["prompt"] if isinstance(v, dict) else v), check(v["prompt"] if isinstance(v, dict) else v)) for k, v in o.items()]


def report(res, name="", out=sys.stdout, quiet=False):
    bad = [r for r in res if r[2]]
    for k, n, f in res:
        if f or not quiet:
            print(f"{'FAIL' if f else 'PASS'} {name}{'/' if name else ''}{k} [{n} ch]", file=out)
            for rule, msg in f: print(f"   {rule}: {msg}", file=out)
    print(f"ROOM GATE {name}: {len(res)} prompts, {len(bad)} FAIL -> {'FAIL = no gen' if bad else 'PASS'}", file=out)
    return not bad


def guard(o, name=""):
    """for room builders: on FAIL print the report to stderr and exit 1 (= no gen)."""
    if os.environ.get("ROOM_GATE_OFF") == "1": return o
    res = check_obj(o)
    if any(r[2] for r in res): report(res, name, out=sys.stderr, quiet=True); sys.exit(1)
    return o


def selftest():
    good = ("ROOM: X cung Tây phối điện bedroom, the cosy bedchamber SHARED by two lower-ranking imperial consorts (a Đáp ứng and a Thường tại), "
            "seen straight on: TWO tall canopy frame beds. ALL the curtains are cream-ivory like #EAE3D0 and ALL fabrics soft green like #7FB394. "
            "No phoenix anywhere, no imperial yellow. No Western sofa, no upholstered couch. Never a curved hall, never chairs in an arc.")
    bad = [(good + " of the Qing-style palace", "R2 F14"), (good.replace("#7FB394", "#7E9CCB"), "R5 B24"), (good + " #4F86A8", "R5 B24"),
           (good + " An oblique view from the left.", "R6 VIEW"), (good.replace("straight on", "from above"), "R6 VIEW"),
           (good + " A red velvet sofa.", "R7 SOFA"), (good + " Chairs set in an arc.", "R8 SHAPE"), (good + " A coffered roof.", "R9 DRIFT"),
           (good + " Carved phoenix panels.", "R10 RANK"), (good.replace("canopy frame beds", "low beds"), "R11 BED"), (good + " x" * 6000, "R1 LEN"),
           (good + " {COL}", "R4 SLOT")]
    n = 0
    if check(good): print("SELF BAD good", check(good)); n += 1
    for t, want in bad:
        if want not in [r for r, _ in check(t)]: print("SELF BAD bad", want, check(t)); n += 1
    try:
        sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__)))); import check_store as cs
        if [b["regex"] for b in cs.BANNED if b["id"] == "F14"][0] != F14_RX.pattern: print("SELF BAD: F14 regex differs from check_store"); n += 1
        if any(cs.B24_HEX[i] != B24[i] for i in B24): print("SELF BAD: B24 hexes differ from check_store B24_HEX"); n += 1
    except Exception as e: print("self: could not compare with check_store:", e)
    print(f"room_gate --self: 1 good, {len(bad)} bad samples, {n} problems"); return n == 0


def main(a):
    if not a or a[0] in ("-h", "--help"): print(__doc__); return 0
    if a[0] == "--self": return 0 if selftest() else 1
    if a[0] == "--json": return 0 if report(check_obj(json.load(open(a[1]))), os.path.basename(a[1]), quiet="-v" not in a) else 1
    ranks = None
    if "--ranks" in a: ranks = [int(x) for x in a[a.index("--ranks") + 1].split(",")]
    t = sys.stdin.read() if a[0] == "-" else open(a[0]).read()
    return 0 if report([(a[0], len(t.strip()), check(t, ranks))]) else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))

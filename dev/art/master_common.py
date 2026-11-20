#!/usr/bin/env python3
"""ONE MASTER COMMON BLOCK (owner B25, Lượt 745/766) — the only code that reads dev/art/MASTER_COMMON.txt.
Every builder calls apply(prompt) on its final text; check_store.py calls check(prompt) in EVERY scope.

apply(text): every master sentence must be in the prompt VERBATIM exactly once. Sentences the prompt already has (identical text)
  stay where they are (ONE copy, B5: the approved prompt is not reordered); the missing ones are inserted as ONE block, in master order,
  right after master sentence M01 when the prompt already holds it, else at the very start (B25 'starts from the master block').
  Nothing else in the prompt is touched (conflicting approved sentences are NOT deleted: MG1 report lists them, A18).
check(text): -> list of (id, kind, detail); kind = MISSING | REWRITTEN (a near copy, words changed) | NOT ONCE.
NOEAR (owner Lượt 1037): female prompts (default) also get EAR_SENT once and must hold no earring word; pass --male for men / boys.
CLI: python3 dev/art/master_common.py apply <file|-> [--male]   |   check <file|-> [--male]   |   --show"""
import os, re, sys
ART = os.path.dirname(os.path.abspath(__file__))
FILE = os.path.join(ART, "MASTER_COMMON.txt")


def sentences():
    return [l.rstrip("\n") for l in open(FILE, encoding="utf-8") if l.strip()]


def ids():
    return [f"M{i:02d}" for i in range(1, len(sentences()) + 1)]


def _norm(s): return re.sub(r"\s+", " ", s).strip()


# B12 FABRIC BY RANK (owner Lượt 781 via ROOT-57, MG2): t6 Quý phi and ABOVE (Quý phi t6, HQP t7, HH t8, princesses t7/t8 as their builders already are,
# triều phục t6-t8, Thái hậu, Hoàng thượng, Nữ đế) do NOT get master M06 (thin flowing silk + gauze, thướt tha); their fabric sentence is store prompt B BROCADE
# (verbatim, the BUILDER puts it in) + M07 'The silk has real weight' stays. t1-t5, thiếu nữ faces, princesses t1-t6, ma ma / cung nữ / states keep M06.
# Never both. high=True selects the high-rank variant in apply() and check().
M06_ID = "M06"
BROCADE = "FABRIC: thick gold-embroidered brocade with a graceful, flowing drape."
HIGH_SCOPES = {"tp6", "tp7", "tp8", "pr7", "pr8", "trieu6", "trieu7", "trieu8", "nude", "thaihau", "state:thaihau", "emperor"}


# C5 (owner Lượt 779/784, MG2): at a51/a65 every lady prompt except Nữ đế carries this clause (build.py ELDER_M05_BRIDGE / ELDER_M05_SENT) AFTER master M05.
ELDER_KEY = "elder colour rule wins over the first COLOUR RULE (medium-light tone)"


def check_elder(text, scope, age):
    """-> list of (id, kind, detail). Nữ đế (B23) must NOT have it; faces / men have no elder colour rule (not checked)."""
    if age not in ("a51", "a65") or scope in ("face", "emperor"): return []
    t = _norm(text); n = t.count(ELDER_KEY)
    if scope == "nude":
        return [("C5", "NỮ ĐẾ B23", "Nữ đế keeps her bright a36 colours: no elder-colour clause")] if n else []
    if n != 1: return [("C5", "MISSING" if n == 0 else "NOT ONCE", f"a51/a65: elder colours must win over M05: '{ELDER_KEY}' {n} times (must be 1)")]
    m05 = _norm(sentences()[ids().index("M05")])
    if m05 in t and t.index(m05) > t.index(ELDER_KEY): return [("C5", "ORDER", "the elder-colour clause must come AFTER master M05")]
    return []


def high_scope(scope): return scope in HIGH_SCOPES


# NOEAR (owner Lượt 1037, 20/11, verbatim: "Rồi, hoa tai ổn, ok nha. Vậy tiến hành làm hoa tai, bỏ hết, kiểm tra tất cả các cái prompt của tất cả
# mọi người, tất cả các bậc, không có bỏ sót bất kỳ một người nữ nào, bất kỳ một cái bậc nào, không ai được đeo hoa tai."): earrings are a separate
# dress-up layer (dev/art/earring-test, report EAR1) -> NO painted woman / girl of any rank or state wears earrings. Every FEMALE prompt carries EAR_SENT
# exactly once (apply() puts it right after master M11 'Bare clean forehead…') and no earring word anywhere else. Men and boys: female=False, unchanged.
EAR_SENT_OLD = "Bare earlobes: she wears NO earrings, nothing at the ears (earrings are added later as a separate layer)."   # NOEAR1 wording (20/11 06:50Z); shortened by FRUITPET1 (ROOT-67 job 5: 85 build_all prompts went over 10 000 chars), our words, not owner verbatim
EAR_SENT = "Bare earlobes, no earrings."
EAR_RX = re.compile(r"\bear(?:-| )?rings?\b|\bear(?:-| )?(?:drops?|pendants?|studs?|hoops?|cuffs?|jewel\w*)\b|\bjhumkas?\b|\b(?:hoa|bông|khuyên) tai\b"
                    r"|\b(?:jewel\w*|pearls?|jade|gold|silver|dangles?|tassels?|pendants?|drops?)\s+(?:at|on|from|in|hanging from) (?:the|her|both|each) ears?\b", re.I)
M11_ID = "M11"
MALE_SCOPES = {"emperor", "men", "man", "boy"}   # check_store scopes of men / boys (Hoàng thượng = emperor; build_npc men/boys: --scope men); every other scope = a woman / girl


def male_scope(scope): return scope in MALE_SCOPES


def strip_ear(text):
    """remove the earring words of the builders' old wording (the same edit was made in the builder sources; legacy() uses it so old gens still verify)."""
    t = text.replace(" " + EAR_SENT_OLD, "").replace(EAR_SENT_OLD, "")   # the long NOEAR1 sentence (legacy() re-adds today's EAR_SENT)
    t = re.sub(r"Bare earlobes: she wears NO earrings, nothing at the ears\. ?(?! ?\(earrings are added)", "", t)   # the interim maker sentence (F4 make_new_s62_65 / make_c09_hand, 20/11) -> replaced by EAR_SENT
    t = t.replace("gold-and-jade necklace, earrings and bracelets", "gold-and-jade necklace and bracelets")
    t = re.sub(r" and (?:[^,;.()\"]*? )?ear-?rings\b(?= as the only mark|[;.,)\"])", "", t)          # 'a fresh flower and slim silver tassel earrings;' -> 'a fresh flower;'
    t = re.sub(r",(?: with| she wears)? (?:[^,;.()\"]*? )?ear-?rings(?: with [^,;.()\"]*?drops)?(?=[;.,)\"])", "", t)   # ', gold earrings;' / ', with small earrings,' -> ''
    return t


def ear_fails(text):
    """-> list of (id, kind, detail) for a FEMALE prompt: EAR_SENT exactly once + no earring word outside it."""
    t = _norm(text); n = t.count(EAR_SENT); out = []
    if n != 1: out.append(("NOEAR", "MISSING" if n == 0 else "NOT ONCE", f"bare-earlobes sentence {n} times (must be 1): '{EAR_SENT}'"))
    m = EAR_RX.search(t.replace(EAR_SENT, " "))
    if m: out.append(("NOEAR", "EARRING", f"earring word in a woman's prompt (owner Lượt 1037: nobody wears earrings): …{t.replace(EAR_SENT, ' ')[max(0, m.start() - 50):m.end() + 30]}…"))
    return out


def apply_ear(text):
    if EAR_SENT in text: return text
    m11 = sentences()[ids().index(M11_ID)]
    if m11 in text:
        j = text.index(m11) + len(m11); return text[:j] + " " + EAR_SENT + text[j:]
    return text.rstrip() + " " + EAR_SENT + text[len(text.rstrip()):]


def _master(high):
    return [(k, s) for k, s in zip(ids(), sentences()) if not (high and k == M06_ID)]


def apply(text, high=False, female=True):
    """high=True (B12, rank t6+ / Thái hậu / Hoàng thượng / Nữ đế): M06 is not inserted (and must not be in the text); the builder supplies BROCADE.
    female=True (NOEAR, owner Lượt 1037): EAR_SENT is put right after M11 and the text must hold no earring word. Men / boys pass female=False."""
    t = _apply(text, high)
    if not female: return t
    assert not EAR_RX.search(t.replace(EAR_SENT, " ")), "NOEAR (owner Lượt 1037): earring word in a woman's prompt: " + EAR_RX.search(t.replace(EAR_SENT, " ")).group(0)
    return apply_ear(t)


def _apply(text, high=False):
    if high: assert sentences()[ids().index(M06_ID)] not in text, "B12: master M06 (thin silk+gauze) in a t6+ / royal prompt"
    S = [s for _, s in _master(high)]; t = text
    for k, s in _master(high):
        assert t.count(s) <= 1, f"master {k} already present {t.count(s)} times (builder duplicates it)"
    miss = [s for s in S if s not in t]
    if not miss: return t
    block = " ".join(miss)
    if S[0] in t:
        j = t.index(S[0]) + len(S[0])
        return t[:j] + " " + block + t[j:]
    lead = len(t) - len(t.lstrip())
    return t[:lead] + block + " " + t[lead:]


# C1 (owner Lượt 779, MG2): the drawing style is the approved thiếu nữ style ONLY (M01/M02). The old store style clause below was removed from every builder;
# legacy(text) maps a prompt written before Lượt 779 to today's wording so ledger/verify compares still recognise old gens (it is NEVER used to make a prompt).
STYLE_OLD = ("Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, "
             "exactly matching the rendering of the reference portraits; full-body standing figure")
STYLE_OLD_TY = STYLE_OLD.replace("the reference portraits;", "the style reference image;")


# C2 (owner Lượt 780 = B9, MG2): the old K3 'transparent background' sentence (every wording the builders used, incl. the ref-renumbered ones).
K3_RX = (r" ?(?:The \w+ reference image is style only: IGNORE its background completely|IGNORE (?:the style reference image's|the reference image's) background completely)"
         r"[;:] the background is completely transparent with NOTHING behind or around (?:her|him): no backdrop, no parchment, no painted flowers(?:/| or )branches, "
         r"no smoke, no haze, no glow, no stain\.")


def legacy(text):
    t = text.replace(STYLE_OLD, "Full-body standing figure").replace(STYLE_OLD_TY, "Full-body standing figure")
    t = t.replace("skin rendering, painterly near-3D drawing style, fabric", "skin rendering, drawing style, fabric")
    t = re.sub(K3_RX, "", t)   # C2 (Lượt 780): the old transparent-background sentence is gone
    t = strip_ear(t)   # NOEAR (owner Lượt 1037): the old earring words are gone
    return t


def _overlap(s, text):
    w = set(re.findall(r"[a-zA-Z']+", s.lower())); best = 0.0
    for p in re.split(r"(?<=[.;])\s+", text):
        best = max(best, len(w & set(re.findall(r"[a-zA-Z']+", p.lower()))) / max(1, len(w)))
    return best


def check(text, high=False, female=True, winter=False):
    """winter=True (SEASON đông, dev/art/winter_g28.py): each master sentence is checked in its G28 winter form (M06 = opaque silk, never see-through)."""
    import winter_g28
    t = _norm(text); out = ear_fails(text) if female else []
    m06 = winter_g28.master_form(sentences()[ids().index(M06_ID)], winter); nb = t.count(BROCADE)
    if high:   # B12 (Lượt 781): t6+ / royal = BROCADE exactly once, never M06
        if _norm(m06) in t: out.append((M06_ID, "HIGH RANK", "B12: master M06 (thin silk+gauze, thướt tha) in a t6+ / Thái hậu / Hoàng thượng / Nữ đế prompt"))
        if nb != 1: out.append(("B12", "BROCADE MISSING" if nb == 0 else "NOT ONCE", f"B12: t6+ fabric sentence '{BROCADE}' {nb} times (must be 1)"))
    elif nb: out.append(("B12", "LOW RANK", f"B12: brocade fabric sentence in a t1-t5 / face / maid prompt (must be M06 thướt tha only)"))
    for k, s in _master(high):
        s = winter_g28.master_form(s, winter)
        n = t.count(_norm(s))
        if n == 1: continue
        if n > 1: out.append((k, "NOT ONCE", f"master sentence {n} times: {s[:70]}…")); continue
        ov = _overlap(s, t)
        out.append((k, "REWRITTEN" if ov >= 0.6 else "MISSING", f"master sentence (best overlap {ov:.0%}): {s[:70]}…"))
    return out


def _read(p): return sys.stdin.read() if p == "-" else open(p, encoding="utf-8").read()


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a or a[0] == "--show": print(" ".join(sentences())); sys.exit(0)
    if a[0] == "apply": sys.stdout.write(apply(_read(a[1]), female="--male" not in a)); sys.exit(0)
    if a[0] == "check":
        r = check(_read(a[1]), female="--male" not in a)
        for x in r: print("  FAIL", *x)
        print("MASTER BLOCK", "FAIL" if r else "PASS"); sys.exit(1 if r else 0)
    print(__doc__); sys.exit(2)

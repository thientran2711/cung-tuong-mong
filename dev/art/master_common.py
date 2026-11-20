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
# B26 FABRIC ĐOẠN MỜ (owner Lượt 1283 + CORRECTION 1284, matte text Lượt 1275): t4 Tần + t5 Phi ONLY (thường phục, consorts + princesses at t4/t5) get DOAN
# IN PLACE OF master M06 (thin silk + gauze); words = the FABRIC sentence of dev/art/seasons4/m11_t4_VAI_DOAN.txt verbatim. t1-t3 keep M06, t6+ keep BROCADE (B12). Never both.
# M07 'The silk has real weight' stays (master; m11 test file has no M07 -> ART_RULES_CONFLICTS.md, not decided here). Winter: DOAN is already opaque -> same words (G28 swaps nothing).
DOAN = 'The FABRIC is medium-weight silk SATIN (đoạn) with a soft MATTE finish and only a very faint gentle lustre, like fine old silk, never glossy, shiny, wet-looking or plastic: clearly thicker and more opaque than thin silk gauze, with a faint woven self-pattern (damask), yet still soft and supple, NOT heavy stiff brocade like the Empress; it hangs in fuller, rounder, heavier folds while still flowing gracefully (thướt tha); the small embroidered motifs are stitched in fine gold thread.'
DOAN_SCOPES = {"tp4", "tp5", "pr4", "pr5"}


def doan_scope(scope): return scope in DOAN_SCOPES


# B26 LENGTH (Foreman C #5 decision (a), 20/11 ~18:07Z, for the t4/t5 cells the longer đoạn sentence pushes over 10 000 chars): store clauses that only REPEAT a master
# sentence are cut, in this order, one at a time, only while the prompt is still > LIMIT (after build_all's ANGLE drop). Narrow gate exception (check_store.store_check +
# S24): a missing clause is accepted only in a t4/t5 prompt holding DOAN, only when the missing clauses are a PREFIX of this list and the last one was needed (restoring it
# would go over LIMIT). Logged in ART_RULES_CONFLICTS.md item 17 + dev/handover/reports/B26FAB.md.
LIMIT = 10000
DOAN_LEN_CUTS = [   # (exact store words, what stays, master sentence it repeats)
 ("Full-body standing figure head to feet, centered, plain light parchment background, soft even light; ", "", "M03"),
 ("fair porcelain skin; ", "", "M01"),
 ("closed-lip smile, lips closed, no teeth, mouth never open;", "closed-lip smile;", "M10"),
 ("for everyone; face clearly visible, 3/4 or frontal view.", "for everyone; 3/4 or frontal view.", "M10"),
 (" Every hairpin is inserted into the hair pointing upward or backward with dangles hanging down, no hairpin horizontal or sticking out to the side.", "", "M13 (approved S24)"),
]


def _norm1(s): return re.sub(r"\s+", " ", s).strip()


# B26FAB2 (Foreman C #5 decision 1, 20/11): the same length step for t1-t6 thường phục (JOB 2 species names + JOB 3 capes grew them): no DOAN needed
# when the caller says the prompt is t1-t6 (build_all.b26_fit low=True / check_store scope tp1-tp6 pr1-pr6). Cells already > LIMIT at HEAD 7007acc are not cut
# (build_all reads dev/art/b26/HEAD_OVER10K.json).
LEN_SCOPES = {f"{k}{n}" for k in ("tp", "pr") for n in range(1, 9)}   # B26FAB3 (Foreman C #6, 20/11): + tp7/tp8 pr7/pr8 (t7/t8 F2 embroidery names pushed 2 cells over)


# B26FAB4 (Foreman C #8 brief b26fab4-L1404, 20/11; t5 = Foreman C #7 decision, owner L1379 "Thôi, phi ok rồi" = cape text verbatim): more cuts AFTER the 5 above,
# same cut-while / prefix / last-cut-needed rules, ONLY for cells that fitted at HEAD 7007acc ('while' cells, build_all.b26_fit_ok) and only at the ranks listed.
# Each one only drops words another sentence of the SAME prompt already says (N1/N2 = check_store S16/S19 tails; ITEM = S16 'item colour' vs HELD ITEM COLOUR law).
# (exact store words, what stays, what it repeats, ranks). ITEM works on the N1 result (chained).
LEN_CUTS2 = [
 (", and the hand really grips it; the whole face fully visible with the head up toward the viewer, eyes open, lips closed, never looking down, nothing covering the face.",
  "; the head up toward the viewer, never looking down, nothing covering the face.", "N1 (S16 tail: 'EXACTLY ONE held item, the hand really gripping it' + 'The whole face clearly visible, eyes fully open' + 'MOUTH FULLY CLOSED')", (5, 7)),
 ("The item is in a contrasting colour, not the robe colour; the head up toward the viewer", "The head up toward the viewer", "ITEM (HELD ITEM COLOUR law)", (5,)),
 ("Luminous smooth porcelain skin, bare clean forehead with no forehead mark and no flower mark, eyes open, floor-length robe, only slipper toe tips peeking under the hem, no train, no cup, nothing covering the face.",
  "Luminous smooth porcelain skin, no flower mark, floor-length robe, only slipper toe tips peeking under the hem, no train.", "N2 (S19 tail: 'Bare clean forehead, no forehead mark' + 'NOTHING on the forehead' + 'eyes open' + 'no cup' + 'nothing covering the face')", (5, 7)),
 ("(medium-light tone): her own colours in the DEEPER, DARKER mature shades described above, never bright, never pastel; ", "(medium-light tone); ", "E1 (elder COLOUR RULE: 'all colours in the DEEPER, DARKER mature shades described above (... never bright, never pastel ...)')", (5,)),
 ("; gold only as thin accents.", ".", "E2 ('gold only as embroidery accents' + TWO-COLOUR 'gold or silver only as thin accents')", (5,)),
]


def len_cuts(rank=None):
    """-> the (old, new, mid) list for a prompt of this rank: DOAN_LEN_CUTS + the LEN_CUTS2 entries of that rank (rank None = DOAN_LEN_CUTS only)."""
    return DOAN_LEN_CUTS + [(o, n, m) for o, n, m, r in LEN_CUTS2 if rank in r]


def _scope_rank(scope):
    m = re.fullmatch(r"(?:tp|pr)(\d)", scope or ""); return int(m.group(1)) if m else None


def doan_fit(text, low=False, rank=None):
    """-> (text, list of cut ids). Only for a t4/t5 DOAN prompt (or any t1-t8 prompt when low=True) over LIMIT; cuts in order, each only while still over LIMIT.
    rank (B26FAB4) = also the LEN_CUTS2 cuts of that rank (the caller passes it only for 'while' cells)."""
    cuts = []
    if DOAN not in text and not low: return text, cuts
    for old, new, mid in len_cuts(rank):
        if len(text) <= LIMIT: break
        if old in text: text = text.replace(old, new, 1); cuts.append(mid.split(" ")[0])
LEN_SCOPES = {f"{k}{n}" for k in ("tp", "pr") for n in range(1, 7)}


def doan_fit(text, low=False):
    """-> (text, list of cut ids). Only for a t4/t5 DOAN prompt (or any t1-t6 prompt when low=True) over LIMIT; cuts in order, each only while still over LIMIT."""
    cuts = []
    if DOAN not in text and not low: return text, cuts
def doan_fit(text):
    """-> (text, list of cut ids). Only for a t4/t5 DOAN prompt over LIMIT; cuts in order, each only while still over LIMIT."""
    cuts = []
    if DOAN not in text: return text, cuts
    for old, new, mid in DOAN_LEN_CUTS:
        if len(text) <= LIMIT: break
        if old in text: text = text.replace(old, new, 1); cuts.append(mid)
    return text, cuts


def doan_cuts_made(text, scope=None):
    """-> the (old, new) pairs of len_cuts(rank of scope) this prompt shows cut, when allowed (t4/t5 DOAN prompt or scope in LEN_SCOPES, prefix rule, last cut needed), else []."""
    t = _norm1(text)
    if DOAN not in t and scope not in LEN_SCOPES: return []
    L = len_cuts(_scope_rank(scope))
    made = []
    for i, (old, new, _) in enumerate(L):
        o, n = _norm1(old), _norm1(new)
        if o in t: break
        if n and n not in t and not (i + 1 < len(L) and _norm1(L[i + 1][1]) in t and _norm1(L[i + 1][0]) not in t): break   # chained (ITEM on the N1 result): the next cut was made on this one's result
        made.append((old, new))
    if not made: return []
    for old, new, _ in L[len(made):]:
    """-> the (old, new) pairs of DOAN_LEN_CUTS this prompt shows cut, when allowed (t4/t5 DOAN prompt or scope in LEN_SCOPES, prefix rule, last cut needed), else []."""
    t = _norm1(text)
    if DOAN not in t and scope not in LEN_SCOPES: return []
def doan_cuts_made(text):
    """-> the (old, new) pairs of DOAN_LEN_CUTS this prompt shows cut, when allowed (t4/t5 DOAN prompt, prefix rule, last cut needed), else []."""
    t = _norm1(text)
    if DOAN not in t: return []
    made = []
    for old, new, _ in DOAN_LEN_CUTS:
        o, n = _norm1(old), _norm1(new)
        if o in t: break
        if n and n not in t: break
        made.append((old, new))
    if not made: return []
    for old, new, _ in DOAN_LEN_CUTS[len(made):]:
        if _norm1(old) not in t: return []   # a later clause missing too = not a prefix
    if len(t) + len(_norm1(made[-1][0])) - len(_norm1(made[-1][1])) <= LIMIT: return []   # the last cut was not needed
    return made


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


def _master(high, doan=False):
    return [(k, DOAN if (doan and k == M06_ID) else s) for k, s in zip(ids(), sentences()) if not (high and k == M06_ID)]


def apply(text, high=False, female=True, doan=False):
    """high=True (B12, rank t6+ / Thái hậu / Hoàng thượng / Nữ đế): M06 is not inserted (and must not be in the text); the builder supplies BROCADE.
    female=True (NOEAR, owner Lượt 1037): EAR_SENT is put right after M11 and the text must hold no earring word. Men / boys pass female=False."""
    t = _apply(text, high, doan)
    if not female: return t
    assert not EAR_RX.search(t.replace(EAR_SENT, " ")), "NOEAR (owner Lượt 1037): earring word in a woman's prompt: " + EAR_RX.search(t.replace(EAR_SENT, " ")).group(0)
    return apply_ear(t)


def _apply(text, high=False, doan=False):
    if high: assert sentences()[ids().index(M06_ID)] not in text, "B12: master M06 (thin silk+gauze) in a t6+ / royal prompt"
    if high: assert not doan, "B26: đoạn is t4/t5 only, never with the t6+ brocade"
    if doan: text = text.replace(sentences()[ids().index(M06_ID)], DOAN, 1)   # B26: a builder text that already holds M06 gets DOAN in its place
    elif DOAN in text: raise AssertionError("B26: đoạn fabric sentence outside t4/t5")
    S = [s for _, s in _master(high, doan)]; t = text
    for k, s in _master(high, doan):
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


def check(text, high=False, female=True, winter=False, doan=False):
    """winter=True (SEASON đông, dev/art/winter_g28.py): each master sentence is checked in its G28 winter form (M06 = opaque silk, never see-through)."""
    import winter_g28
    t = _norm(text); out = ear_fails(text) if female else []
    m06 = winter_g28.master_form(sentences()[ids().index(M06_ID)], winter); nb = t.count(BROCADE)
    if high:   # B12 (Lượt 781): t6+ / royal = BROCADE exactly once, never M06
        if _norm(m06) in t: out.append((M06_ID, "HIGH RANK", "B12: master M06 (thin silk+gauze, thướt tha) in a t6+ / Thái hậu / Hoàng thượng / Nữ đế prompt"))
        if nb != 1: out.append(("B12", "BROCADE MISSING" if nb == 0 else "NOT ONCE", f"B12: t6+ fabric sentence '{BROCADE}' {nb} times (must be 1)"))
    elif nb: out.append(("B12", "LOW RANK", f"B12: brocade fabric sentence in a t1-t5 / face / maid prompt (must be M06 thướt tha only)"))
    if doan and _norm(m06) in t: out.append(("B26", "THIN SILK", "B26 (owner Lượt 1283): t4 Tần / t5 Phi must carry the matte satin đoạn sentence, not master M06 (thin silk+gauze)"))
    if not doan and _norm(DOAN) in t: out.append(("B26", "NOT T4/T5", "B26 (owner Lượt 1283/1284): the matte satin đoạn sentence is for t4 Tần + t5 Phi only"))
    for k, s in _master(high, doan):
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

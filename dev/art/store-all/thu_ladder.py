#!/usr/bin/env python3
"""THU LADDER (BUILDFIX2, owner L2060 "máy phải ra đúng prompt cho mọi người × bậc × 4 mùa"; G53 thu square collar all tiers, owner L1747).
ONE copy of the owner-approved THU outfit words t1-t5, read from the approved s62 thu files (never edited here):
  t1 s62_t1_THU_fix_L2008 (G69 chest cluster, L1851 Thường tại collar, L1794 waist sash)   t2 s62_t2_THU_fix_L1847 (L1776 square collar)
  t3 s62_t3_THU_fix_L1978 (hoa dày)   t4 s62_t4_THU_L2041 (owner L2041 approved Tần collar + net sewn in)   t5 s62_t5_THU_L2050 (L2050 net sewn in)
The sentences 'Outfit (…)', 'Hair: …', 'HAIR FLOWER SIZE: …' and 'NO BIG FLOWERS: …' of these files become templates: ONLY the person slot of
s62 (main + secondary colour, F2 flower species of the rank, hair-flower colour, main hex) is turned into {slots}; every other word stays.
build_all.season_post (season thu, t1-t5) puts them in place of the builder's sentences of the same kind, filled with HER slots:
  main/sec = palettes_season.json thu names EXACT; species = build.py F2_FL (hairflower_species); hair colour = F20 hair_by_tier tN (f20_name).
t4 CAPELET CUT: the approved L2041 form drops the throat-clasp / long-V clause (capelet open at the front); her own lower-edge shape stays.
t6 QP = s62_t6_THU_vankien2_L2088 (VE12, owner L2088; BUILDFIX3) + refs(6). t7, t8: not in this table yet (builder words + palette)."""
import os, re
ART = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = {1: "s62_t1_THU_fix_L2008.txt", 2: "s62_t2_THU_fix_L1847.txt", 3: "s62_t3_THU_fix_L1978.txt",
       4: "s62_t4_THU_L2041.txt", 5: "s62_t5_THU_L2050.txt",
       6: "s62_t6_THU_vankien2_L2088.txt"}   # BUILDFIX3: t6 QP = VE12 L2088 words (owner L2088 direction: SMALL slim two-tier collar, image 3 = collar crop YMl2p0yWeC)
# reference images per rank in the gen path (image 1 = HER OWN KC_REFS cut, never s62's); t6 QP owner L2066/L2088: image 2 royal-yellow swatch, image 3 collar crop (shape only)
REFS = {6: ["<her KC_REFS cut>", "TdwDfOyVNR", "YMl2p0yWeC"]}
def refs(k): return REFS.get(k, ["<her KC_REFS cut>"])
KINDS = ("Outfit (", "Hair: ", "HAIR FLOWER SIZE: ", "NO BIG FLOWERS: ")
# s62 slot words per rank, longest first: (s62 words, slot). Species words of s62 (F2): t1 lilac, t2 tiger lily, t3 semi-double China rose,
# t4 lotus flower, t5 double hollyhock. Hair-flower colour words of s62 as approved: t1 pure white, t2 soft peach-coral, t3 soft rose-pink, t5 deep rose-pink.
S62 = {
 1: [("pure white lilac", "{hc} {hsp}"), ("embroidered lilac flowers", "embroidered {spl}"), ("(light olive, NOT green)", "({main}{notgreen})"),
     ("light olive and lilac", "{main} and {sec}"), ("light olive silk", "{main} silk"), ("flat lilac band", "flat {sec} band")],
 2: [("soft peach-coral tiger lily", "{hc} {hsp}"), ("embroidered tiger lilies", "embroidered {spl}"), ("(light olive, NOT green)", "({main}{notgreen})"),
     ("light olive and lilac", "{main} and {sec}"), ("light olive silk", "{main} silk"), ("flat lilac band", "flat {sec} band")],
 3: [("soft rose-pink semi-double China rose", "{hc} {hsp}"), ("small China-rose cluster", "small {sp} cluster"), ("China-rose sprigs", "{sp} sprigs"),
     ("embroidered small China roses", "embroidered small {spl}"), ("(light olive, NOT green)", "({main}{notgreen})"),
     ("light olive and lilac", "{main} and {sec}"), ("light olive", "{main}"), ("lilac", "{sec}")],
 4: [("ONE fresh lotus flower", "ONE fresh {hsp}"), ("lotus sprays", "{sp} sprays"), ("lotus flowers", "{spl}"),
     ("light olive and lilac", "{main} and {sec}"), ("(light olive)", "({main})"), ("light olive silk", "{main} silk"), ("flat lilac band", "flat {sec} band")],
 5: [("deep rose-pink double hollyhock", "{hc} {hsp}"), ("double hollyhock medallions", "{sp} medallions"), ("double hollyhocks", "{spl}"),
     ("light olive and lilac", "{main} and {sec}"), ("(light olive)", "({main})"), ("light olive silk", "{main} silk"),
     ("embroidered light olive SINGLE-tier", "embroidered {main} SINGLE-tier")],
 6: [("ivory-white formal double camellia with a soft pink blush", "{hc} {hsp}"), ("formal double camellias", "{spl}"), ("camellia sprigs", "{sp} sprigs"),
     ("light olive and lilac", "{main} and {sec}"), ("light olive silk", "{main} silk"), ("light olive TWO-TIER", "{main} TWO-TIER"),
     ("light olive and gold thread", "{main} and gold thread"), ("lilac only as a small accent", "{sec} only as a small accent")],
}
SENT = re.compile(r"(?<=[.])\s+(?=[A-Z])")
def _sents(t): return [s for s in SENT.split(t) if s.strip()]
_T = None
def templates():
    """-> {rank: {kind: template}} (asserts every s62 slot word was found)."""
    global _T
    if _T is not None: return _T
    _T = {}
    for k, f in SRC.items():
        t = open(os.path.join(ART, "thu_comoi", f), encoding="utf-8").read(); d = {}
        for s in _sents(t):
            kind = next((x for x in KINDS if s.startswith(x)), None)
            if kind: d[kind] = s
        joined = " ".join(d.values()); used = set()
        for a, b in S62[k]:
            n = 0
            for kind in d:
                n += d[kind].count(a); d[kind] = d[kind].replace(a, "\x00" + str(len(used)) + "\x00")
            assert n or a in ("lilac",), ("thu_ladder: s62 slot word not found", k, a)
            used.add(a)
        for kind in d:
            for i, (a, b) in enumerate(S62[k]): d[kind] = d[kind].replace("\x00" + str(i) + "\x00", b)
            left = [w for w in ("olive", "lilac", "hollyhock", "lotus", "tiger lil", "China rose", "China-rose", "peach-coral", "pure white", "#9FB577", "camellia", "ivory-white") if w in d[kind]]
            assert not left, ("thu_ladder: s62 words left", k, kind, left)
        if k in NECK_RANKS: d = neck(k, d)
        _T[k] = d
    return _T
# NECK family fix (THUROOT2 @955482ad, ROOT-B1 GO; owner faults "band rising up the neck" on Tần + Phi): t1-t5 Outfit words, same edits as the
# s6x_t{1..5}_THU_NECK files, applied to THIS table's approved bases (t1 L2008 keeps its G69 chest cluster, t4 stays L2041):
#  (1) after the square-band clause: " (the square band stops at the shoulders, nothing rises up the neck, neck bare)";
#  (2) t1-t3 "at the collar, sleeves and hem" -> "at the sleeves and hem" (fault (a) family, Tần L2041); (3) t4 "no trim band up the neck, " dropped (duplicate).
# t6 = VE12 L2088 words as they are (VE12's t6 line L2074-L2088 does not carry the NECK bracket; its collar says 'never rising up the neck') -> asked ROOT-B2.
NECK_RANKS = (1, 2, 3, 4, 5)
NECK_WORDS = " (the square band stops at the shoulders, nothing rises up the neck, neck bare)"
_BAND = re.compile(r"framed by (?:a|one) wide flat (?:\{sec\} band|band in her second colour)(?: embroidered with \{spl\})?")
def neck(k, d):
    o = d["Outfit ("]
    if NECK_WORDS not in o:
        m = _BAND.search(o); assert m, ("thu_ladder NECK: no square-band clause", k)
        o = o[:m.end()] + NECK_WORDS + o[m.end():]
    if k <= 3: o = o.replace("at the collar, sleeves and hem", "at the sleeves and hem", 1)
    if k == 4: o = o.replace("no trim band up the neck, ", "", 1)
    d["Outfit ("] = o; return d
def fill(k, slots):
    """her sentences for rank k: {kind: sentence}."""
    return {kind: tpl.format(**slots) for kind, tpl in templates().get(k, {}).items()}
CAPELET_CLAUSE = "the robe closes only at the throat clasp, never buttoned down the front, opening gradually in a long soft V toward the hem, "
# t6: the store COLOUR RULE (all colours …) says 'sleeves and any cape'; L2088 says 'sleeves and cloud collar' (her own hex + names kept from the builder)
T6_COLOUR=("the main colour of the robe, sleeves and any cape,", "the main colour of the robe, sleeves and cloud collar,")
def colour_t6(S): return S.replace(*T6_COLOUR) if T6_COLOUR[0] in S else S
# owner L2070/L2072 (Tần t4): no forced lobes / clouds; the neutral L2041 edge words ('soft scalloped wavy (lượn sóng) lower edge', CqnmunHEEy style)
# -> thu t4 CAPELET CUT uses ONE neutral lower-edge form for everyone instead of the per-person CURVE_SHAPES (petal lobes, ruyi clouds, arcs ...).
CAPELET_EDGE = re.compile(r"(CAPELET CUT \(flowing\): its lower edge and collar lines are soft CURVES, never flat; the lower edge is )[^;]*;")
CAPELET_NEUTRAL = "a soft scalloped, gently wavy curve (lượn sóng) all along the lower edge;"
def capelet_thu(S):
    if "CAPELET CUT (flowing):" not in S: return S
    S = S.replace(CAPELET_CLAUSE, "", 1)
    return CAPELET_EDGE.sub(lambda m: m.group(1) + CAPELET_NEUTRAL, S, 1)

if __name__ == "__main__":
    for k, d in templates().items():
        for kind, t in d.items(): print(f"t{k} {kind!r}: {t}\n")

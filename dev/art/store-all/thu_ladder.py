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
t6 (G63 frozen QP), t7, t8: not in this table yet (builder words + palette)."""
import os, re
ART = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = {1: "s62_t1_THU_fix_L2008.txt", 2: "s62_t2_THU_fix_L1847.txt", 3: "s62_t3_THU_fix_L1978.txt",
       4: "s62_t4_THU_L2041.txt", 5: "s62_t5_THU_L2050.txt"}
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
            left = [w for w in ("olive", "lilac", "hollyhock", "lotus", "tiger lil", "China rose", "China-rose", "peach-coral", "pure white", "#9FB577") if w in d[kind]]
            assert not left, ("thu_ladder: s62 words left", k, kind, left)
        _T[k] = d
    return _T
def fill(k, slots):
    """her sentences for rank k: {kind: sentence}."""
    return {kind: tpl.format(**slots) for kind, tpl in templates().get(k, {}).items()}
CAPELET_CLAUSE = "the robe closes only at the throat clasp, never buttoned down the front, opening gradually in a long soft V toward the hem, "
def capelet_thu(S):
    return S.replace(CAPELET_CLAUSE, "", 1) if "CAPELET CUT (flowing):" in S else S

if __name__ == "__main__":
    for k, d in templates().items():
        for kind, t in d.items(): print(f"t{k} {kind!r}: {t}\n")

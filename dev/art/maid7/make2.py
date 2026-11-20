#!/usr/bin/env python3
"""MAID7b round 2 (owner 20/11 ~14:50Z, brief dev/handover/briefs/maid7b.md). Builder untouched.
Inputs: live_*.txt / test_*.txt of round 1. Outputs: test2_<id>.txt. Every swap asserted; listed in CHANGES.md §round 2."""
import os, re, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import master_common as MC
D = os.path.dirname(os.path.abspath(__file__))
def rd(n): return open(os.path.join(D, n), encoding="utf-8").read()
MAIN, MAINX, SEC, SECX = "powder blue", "#A7BAD2", "deep rose", "#CA7281"   # m18 M_COLS (same as her round-1 ma ma two-colour rule)
M06 = MC.sentences()[MC.ids().index(MC.M06_ID)]

def sw(s, a, b):
    assert s.count(a) == 1, ("slot", a[:80]); return s.replace(a, b, 1)

# ---- THÔ SỬ v2: two-piece working outfit + apron, secondary colour only at sash + hair tie
t0 = rd("test_tm0.txt")
t0 = sw(t0, re.search(r"Outfit \(cung nữ thô sử.*?no flowers, no jewels\.", t0).group(0),
    f"Outfit (cung nữ thô sử, the lowest palace maid rank, a WORKING palace uniform for heavy work, clean and neat, never ragged): fine smooth plain cotton-silk in {MAIN} like {MAINX}, pretty, well-fitted and spotless, never coarse, never ragged, patched or faded; TWO SEPARATE PIECES, never one long robe from the neck to the feet: a short crossed-collar jacket that ends at the hip, over a plain ankle-length skirt, with a plain work APRON (tạp dề) in a lighter tone of the same colour tied at the waist over the skirt; practical sleeves about one hand-span wide, the cuffs neatly tied back with a thin cord for work; NO embroidery, no pattern, no jade, no tassel; her secondary colour {SEC} like {SECX} appears ONLY on a narrow cloth sash at the waist and a small cloth hair tie, nowhere else; hair in a simple bun with one wooden pin and that small {SEC} hair tie, no flowers, no jewels.")
t0 = sw(t0, "COLOUR RULE: the whole uniform is one plain soft indigo-blue, the same at every age, never deeper, never another colour; this replaces the colour examples above.",
    f"COLOUR RULE: the jacket, skirt and apron are her main colour {MAIN} in a soft, held-back medium tone; the secondary colour {SEC} only on the narrow sash and the hair tie; this replaces the colour examples above.")

# ---- TAM ĐẲNG v2: nhị đẳng design made smaller/shorter (short outer top with short sleeves), main + secondary clear
t1 = rd("live_tm1.txt")
t1 = sw(t1, re.search(r"Outfit \(a palace maid's uniform\):.*?light makeup\.", t1).group(0),
    f"Outfit (a palace maid's uniform, tam đẳng): a fine silk ruqun, the long inner robe and skirt in {MAIN} like {MAINX}, with a SMALL SHORT outer top on top: a short jacket with short outer sleeves that ends just below the waist, clearly smaller and shorter than a nhị đẳng maid's half-sleeve jacket, in {SEC} like {SECX}, so the main and the secondary colour are both clearly visible; SMALL SIMPLE embroidery fit for a tam đẳng maid: only a narrow band of small embroidered flowers along the collar edge and the edges of the short outer sleeves, in a lighter tone, no embroidery elsewhere; soft flowing fabric folds, a decorative sash with a small jade or tassel pendant; hair in neat double buns with one or two elegant silver hairpins with small pearls; light makeup.")
t1 = sw(t1, f"never dusty or grey; her main colour {MAIN}.", f"never dusty or grey; her main colour {MAIN} on the inner robe and skirt, her secondary colour {SEC} clearly visible on the short outer top.")

# ---- NHẤT ĐẲNG v2: the round-1 MA MA outfit words (1ldexOWr4r) at a18, maid buns
t2 = rd("live_tm2.txt"); mm = rd("test_mama.txt")
t2 = sw(t2, "A senior palace maid (cung nu, nhi dang), clearly finer than an ordinary maid.",
    "A first-rank palace maid (cung nu, nhat dang), the highest palace maid rank, clearly finer than a nhị đẳng maid.")
mo = re.search(r"Outfit \(the ma ma costume, never poor\):.*?never a consort's long trailing sleeves\)\.", mm).group(0)
mo = sw(mo, "Outfit (the ma ma costume, never poor):", "Outfit (a first-rank palace maid, nhất đẳng, never poor):")
mo = sw(mo, "her own hair colour, ALL her hair pinned UP in a neat bun (chignon) with her hairpins;", "hair in neat double-loop buns with several silver and pearl hairpins;")
mo = sw(mo, "the sleeves are wide, a palace ma ma's sleeves (never a consort's long trailing sleeves).", "the sleeves are wide, a palace maid's sleeves (never a consort's long trailing sleeves).")
t2 = sw(t2, re.search(r"Outfit \(a senior palace maid, nhị đẳng\):.*?long trailing wide sleeves\)\.", t2).group(0), mo)
mcol = re.search(r"COLOUR RULE: RECOLOUR.*?never a third colour\.", mm).group(0)
t2 = sw(t2, f"COLOUR RULE: all colours clear, soft and held back, never fresh or bright, never dusty or grey; her main colour {MAIN}.", mcol)
t2 = sw(t2, "she holds a folded letter in an envelope of dyed cotton in a contrasting colour,", "she holds an embroidered handkerchief in a contrasting colour,")

# ---- NỮ QUAN v2: design kept; consort BROCADE fabric sentence (store B12, verbatim) instead of master M06; hair in a bun (builder's own a36+ words)
t4 = rd("test_tm4.txt")
t4 = sw(t4, M06 + " ", "")
t4 = sw(t4, " Pose:", " " + MC.BROCADE + " Pose:")
t4 = sw(t4, "with a gold ornament worn over her hair;", "with a gold ornament worn over her hair, which is ALL pinned UP in a neat bun under the cap (nothing loose down her back);")

for k, s in (("tm0", t0), ("tm1", t1), ("nhat", t2), ("tm4", t4)):
    assert len(s) <= 10000, (k, len(s))
    open(os.path.join(D, f"test2_{k}.txt"), "w", encoding="utf-8").write(s); print(k, len(s))

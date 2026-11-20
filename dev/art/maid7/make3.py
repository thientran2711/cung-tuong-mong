#!/usr/bin/env python3
"""MAID7c round 3 (owner 20/11 ~15:35Z, brief dev/handover/briefs/maid7c.md; colours rule K19). Builder untouched.
Inputs: round-1/2 test files. Outputs: test3_<id>.txt. Every swap asserted; listed in CHANGES.md §ROUND 3."""
import os, re
D = os.path.dirname(os.path.abspath(__file__))
def rd(n): return open(os.path.join(D, n), encoding="utf-8").read()
def sw(s, a, b):
    assert s.count(a) == 1, ("slot", a[:90]); return s.replace(a, b, 1)
# K19 cung nữ uniform = the round-1 ma ma blue/pink (1ldexOWr4r): words copied from its TWO-COLOUR RULE
BLUE, BLUEX, PINK, PINKX = "powder blue", "#A7BAD2", "deep rose", "#CA7281"
# hair: copied from build_mama --oneref HAIR sentence (builder words); "NO ribbons" part dropped for thô sử (her cloth hair tie)
HAIR = " HAIR: ALL her hair is pinned UP in a neat bun: NO long loose hair down her back or over her shoulders, NO ribbons in the hair."
HAIR0 = " HAIR: ALL her hair is pinned UP in a neat bun: NO long loose hair down her back or over her shoulders."
NOBROOM = " She never holds a broom."
def add_hair(s, h=HAIR):
    return sw(s, " Pose:", h + " Pose:")

out = {}
# 1 THÔ SỬ (v2 + one clean sash)
s = rd("test2_tm0.txt")
s = sw(s, "appears ONLY on a narrow cloth sash at the waist and a small cloth hair tie, nowhere else;",
       "appears ONLY on ONE single clean narrow cloth sash at the waist (one even solid colour, no second band under or over it, never blotchy, mottled or patchy) and a small cloth hair tie, nowhere else;")
out["tm0"] = add_hair(s, HAIR0)

# 2 TAM ĐẲNG (v2 + same outer fabric as nhị/nhất, continuous front panel, hem embroidery)
s = rd("test2_tm1.txt")
s = sw(s, "in deep rose like #CA7281, so the main and the secondary colour are both clearly visible;",
       "in deep rose like #CA7281, made of the SAME fine silk brocade with a soft sheen as the outer jacket of the higher maids (never a plainer or duller cloth), its FRONT PANEL (vạt áo) one continuous piece clearly and fully visible from the collar down to its hem, never cut off or hidden behind the sleeve; so the main and the secondary colour are both clearly visible;")
s = sw(s, "only a narrow band of small embroidered flowers along the collar edge and the edges of the short outer sleeves, in a lighter tone, no embroidery elsewhere;",
       "only a narrow band of small embroidered flowers along the collar edge and the edges of the short outer sleeves, and a narrow band of small embroidered flowers along the SKIRT HEM border, in a lighter tone, no embroidery elsewhere;")
out["tm1"] = add_hair(s)

# 3 NHỊ ĐẲNG (round-1 design, uniform colours, embroidery only on borders/hem band, hair up)
s = rd("test_tm2.txt")
s = sw(s, "a fine silk ruqun in powder blue, with narrow embroidered flower borders at the collar, cuffs and hem and a few small embroidered flower sprays on the jacket (a little more embroidery than a tam đẳng maid), a layered half-sleeve brocade jacket (bijia) on top,",
       f"a fine silk ruqun, the robe and skirt in {PINK} like {PINKX}, with narrow embroidered flower borders at the collar, cuffs and a narrow embroidered hem band, NO embroidery on the body of the skirt, a layered half-sleeve brocade jacket (bijia) on top in {BLUE} like {BLUEX} with a few small embroidered flower sprays (a little more embroidery than a tam đẳng maid),")
s = sw(s, f"never dusty or grey; her main colour {BLUE}.", f"never dusty or grey; her main colour {BLUE} on the half-sleeve jacket, her secondary colour {PINK} clearly visible on the robe and skirt.")
out["tm2"] = add_hair(s)

# 4 NHẤT ĐẲNG (v2 as is + hair up, no extra jewellery)
s = rd("test2_nhat.txt")
s = sw(s, "hair in neat double-loop buns with several silver and pearl hairpins;",
       "hair in neat double-loop buns with several silver and pearl hairpins, no extra jewellery;")
out["nhat"] = add_hair(s)

# 5 CHƯỞNG SỰ CÔ CÔ (round-1 design, tím cà, hair up, ledger book, no broom)
s = rd("test_tm3.txt")
s = sw(s, "in a LIGHTER, softer plum purple (still clearly the purple family, not dark, not deep)",
       "in eggplant purple (tím cà), a soft medium eggplant purple (clearly purple, not dark, not black, not grey)")
s = sw(s, "the robe is a lighter, softer plum purple.", "the robe is a soft medium eggplant purple (tím cà).")
s = sw(s, "one gold hairpin and a small gold comb in her hair;", "ALL her hair swept UP into a neat bun (chignon), nothing loose down her back, with one gold hairpin and a small gold comb in the bun;")
s = sw(s, "she holds a small hand broom with a handle of lacquered wood in a contrasting colour,", "she holds a small cloth-bound palace ledger book in a contrasting colour,")
out["tm3"] = add_hair(s) .replace(" Pose:", NOBROOM + " Pose:", 1)

# 6 MA MA a36 (young): NEW outfit, xanh lam ngọc bích leaning green, hair up (recipe HAIR sentence already in)
s = rd("test_mama.txt")
mo = re.search(r"Outfit \(the ma ma costume, never poor\):.*?never a consort's long trailing sleeves\)\.", s).group(0)
s = sw(s, mo, "Outfit (a senior palace ma ma's dress, plainer in cut but more dignified than a first-rank maid, never poor): a long floor-length robe of fine silk with a crossed collar closing to the right, under a long-sleeved knee-length outer coat (beizi) worn open at the front with straight front edges, a broad embroidered border band along its front edges, hem and cuffs; a softly pleated skirt below; a narrow brocade belt with a small jade pendant; restrained embroidery of small clouds and plum blossoms ONLY on the border bands; her own hair colour, ALL her hair pinned UP in a neat bun (chignon) with two plain silver hairpins; soft slippers; the sleeves are moderately wide, a palace ma ma's sleeves (never a consort's long trailing sleeves).")
s = sw(s, "RECOLOUR the whole costume to her colour powder blue, a soft, gentle, held-back medium tone",
       "the whole costume is the ma ma uniform colour, a jade blue-green (xanh lam ngọc bích, leaning a little to green) like #4E8FA3, a soft, gentle, held-back medium tone")
s = sw(s, "the MAIN colour powder blue like #A7BAD2 and the SECONDARY colour deep rose like #CA7281,", "the MAIN colour jade blue-green like #4E8FA3 and the SECONDARY colour soft ivory,")
out["mama"] = s.replace(" Pose:", NOBROOM + " Pose:", 1)

for k, s in out.items():
    assert len(s) <= 10000 and "broom" not in s.replace(NOBROOM, ""), k
    open(os.path.join(D, f"test3_{k}.txt"), "w", encoding="utf-8").write(s); print(k, len(s))

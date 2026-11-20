#!/usr/bin/env python3
"""MAID8 round 4 (brief dev/handover/briefs/maid7d.md + owner sleeve correction 20/11: chưởng sự sleeves stay
the round-3 moderate width, NO narrow/fitted/cuffed sleeves). 4 chưởng sự + 4 ma ma designs on m18.
Inputs test3_tm3.txt / test3_mama.txt. Outputs test4_cs{A..D}.txt / test4_mm{A..D}.txt. Swaps asserted; CHANGES.md §ROUND 4."""
import os, re
D = os.path.dirname(os.path.abspath(__file__))
def rd(n): return open(os.path.join(D, n), encoding="utf-8").read()
def sw(s, a, b):
    assert s.count(a) == 1, ("slot", a[:90]); return s.replace(a, b, 1)
BLUE = "powder blue like #A7BAD2"          # m18 own main = SECONDARY (K19)
PURP = "eggplant purple (tím cà)"
JADE = "jade blue-green like #4E8FA3"
STAFF = (" STAFF LOOK: she must read at a glance as PALACE STAFF, a supervisor, NEVER as a consort: practical, tidy and"
         " authoritative, no trailing train, no floor-sweeping consort sleeves, no crown, no phoenix, no big hair jewellery,"
         " no luxurious gold brocade.")
NOJ = " NO flowers in the hair, only her hairpins."  # earrings: master already says "Bare earlobes, no earrings"
CS = {  # outfit, hair, item
 "A": ("a hip-length upper jacket in " + PURP + " with a crossed collar closing to the right and a broad " + BLUE.split(' like')[0] + " collar band, over a long softly pleated floor-length skirt in " + BLUE + "; a broad plain " + PURP.split(' (')[0] + " cloth sash tied in front with a ring of brass keys and a small ledger pouch hanging from it",
       "one plain gold hairpin and a small gold comb in the bun",
       "a small cloth-bound palace ledger book"),
 "B": ("a long robe in " + PURP + " with a straight upright standing collar, and over it a SLEEVELESS knee-length tabard (long vest) in " + BLUE + " with a narrow " + PURP.split(' (')[0] + " border, open at the sides, held by a broad " + PURP.split(' (')[0] + " sash; two small wooden tally tokens on a cord hang at her hip",
       "a small plain silver crown-piece holding the bun",
       "a narrow wooden roster tablet (a palace duty board)"),
 "C": ("a mid-thigh-length jacket in " + PURP + " with a wide square-cut " + BLUE.split(' like')[0] + " collar and broad " + BLUE.split(' like')[0] + " cuff bands, over a long floor-length skirt in " + BLUE + " with a plain " + PURP.split(' (')[0] + " apron-like front panel down to the knee; a wide practical belt of dark cloth with a small brass seal pouch and a key at the side",
       "two plain silver hairpins in the bun",
       "a small square lacquered seal box with a brass clasp"),
 "D": ("a knee-length outer coat in " + PURP + " worn closed with a single frog button at the chest, with broad " + BLUE.split(' like')[0] + " front-edge borders and a " + BLUE.split(' like')[0] + " lining showing at the hem, over a long inner robe and skirt in " + BLUE + "; a narrow " + PURP.split(' (')[0] + " cord belt with a small embroidered purse and a brass key hanging from it",
       "one plain jade hairpin in the bun",
       "a large ring of brass palace keys"),
}
MM = {
 "A": ("a long-sleeved knee-length outer coat (beizi) in " + JADE + " worn open at the front with straight front edges and a broad " + BLUE.split(' like')[0] + " border band along its front edges, hem and cuffs, over a long crossed-collar inner robe and softly pleated floor-length skirt in " + BLUE + "; a narrow belt with a small jade pendant",
       "two plain silver hairpins in the bun",
       "a closed oiled-paper umbrella, handle of dark lacquered wood with brass fittings"),
 "B": ("a hip-length crossed-collar jacket in " + JADE + " with a broad " + BLUE.split(' like')[0] + " collar band, over a long floor-length skirt in " + JADE + " with a wide " + BLUE + " front panel running from the waist to the hem; a broad " + BLUE.split(' like')[0] + " sash tied in front with a ring of brass keys",
       "one plain silver hairpin and a small silver comb in the bun",
       "a small lacquered box with a brass lock"),
 "C": ("a long robe in " + BLUE + " with an upright standing collar, under a SLEEVELESS knee-length long vest in " + JADE + " with side slits, closed in front with three frog buttons and a narrow " + BLUE.split(' like')[0] + " edge; a narrow dark cord belt with a small purse",
       "a small plain silver crown-piece holding the bun",
       "a rolled palace roster scroll tied with a cord"),
 "D": ("a long crossed-collar robe in " + JADE + ", with a broad shoulder cape-collar in " + BLUE + " (a cloud-shaped collar piece lying over both shoulders) and a broad " + BLUE.split(' like')[0] + " sash wrapped high at the waist, the long skirt in " + JADE + " with a wide " + BLUE.split(' like')[0] + " hem band",
       "two plain silver hairpins in the bun",
       "a small unlit palace lantern of paper and dark wood"),
}
out = {}
base = rd("test3_tm3.txt")
o_cs = re.search(r"Outfit \(the palace mistress of servants\):.*?still beautiful\.", base).group(0)
for k, (fit, hair, item) in CS.items():
    s = sw(base, "about 22, youthful adult.", "about 28 but looking young, a youthful, poised adult, smooth skin.")
    s = sw(s, o_cs, f"Outfit (the palace mistress of servants, design {k}): {fit}; restrained tone-on-tone embroidery only on the borders; ALL her hair swept UP into a neat bun (chignon), nothing loose down her back, with {hair}; an air of calm authority, mature and respected, still beautiful.")
    s = sw(s, "the robe is a soft medium eggplant purple (tím cà).",
           "the MAIN colour is a soft, gentle medium eggplant purple (tím cà), a little softer and less saturated than a strong purple (never dark, never grey). TWO-COLOUR RULE: the outfit uses EXACTLY TWO colours that clearly interact: the MAIN colour eggplant purple and the SECONDARY colour " + BLUE + ", the secondary clearly visible in LARGE areas, never a single flat colour all over; gold or silver only as thin accents." + STAFF)
    s = sw(s, " She never holds a broom.", NOJ + " She never holds a broom.")
    s = sw(s, "she holds a small cloth-bound palace ledger book in a contrasting colour,", f"she holds {item} in a contrasting colour,")
    out["cs" + k] = s
base = rd("test3_mama.txt")
o_mm = re.search(r"Outfit \(a senior palace ma ma's dress.*?never a consort's long trailing sleeves\)\.", base).group(0)
for k, (fit, hair, item) in MM.items():
    s = sw(base, o_mm, f"Outfit (a senior palace ma ma's dress, design {k}, plainer in cut but more dignified than a first-rank maid, never poor): {fit}; restrained embroidery of small clouds and plum blossoms ONLY on the border bands; her own hair colour, ALL her hair pinned UP in a neat bun (chignon) with {hair}; soft slippers; the sleeves are moderately wide, a palace ma ma's sleeves (never a consort's long trailing sleeves).")
    s = sw(s, "the MAIN colour jade blue-green like #4E8FA3 and the SECONDARY colour soft ivory,", "the MAIN colour " + JADE + " and the SECONDARY colour " + BLUE + ",")
    s = sw(s, "never a third colour.", "never a third colour." + STAFF)
    s = sw(s, " She never holds a broom.", " She never holds a broom.")
    s = sw(s, "she holds a closed oiled-paper umbrella, handle of dark lacquered wood with brass fittings in a contrasting colour,", f"she holds {item} in a contrasting colour,")
    out["mm" + k] = s
for k, s in out.items():
    assert len(s) <= 10000 and "broom" not in s.replace(" She never holds a broom.", ""), k
    assert not re.search(r"narrow(er)? sleeve|fitted sleeve|cuffed", s), k
    open(os.path.join(D, f"test4_{k}.txt"), "w", encoding="utf-8").write(s); print(k, len(s))

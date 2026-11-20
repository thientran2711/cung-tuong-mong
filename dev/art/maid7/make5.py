#!/usr/bin/env python3
"""MAID8 round 5 (owner GO 20/11 'tiến hành vẽ lại cung nữ, chưởng sự, mama'; brief maid-edits-1162.md items 1-6, 8).
Inputs: test_tm2 (round-1 nhị), test3_nhat, test3_tm3, test3_mama. Outputs test5_{nhi,nhat,cs,mama}.txt. Swaps asserted."""
import os, re
D = os.path.dirname(os.path.abspath(__file__))
def rd(n): return open(os.path.join(D, n), encoding="utf-8").read()
def sw(s, a, b):
    assert s.count(a) == 1, ("slot", a[:90]); return s.replace(a, b, 1)
BLUE, BLUEX, PINK, PINKX = "powder blue", "#A7BAD2", "deep rose", "#CA7281"
HAIR = " HAIR: ALL her hair is pinned UP in a neat bun: NO long loose hair down her back or over her shoulders, NO ribbons in the hair."
SLV = "Sleeves about two and a half hand-spans wide, a palace maid's sleeves (never a consort's long trailing wide sleeves)."  # = round-1 nhất đẳng (JNCa715Oq4), smaller than round 2/3
STAFF = (" STAFF LOOK: she must read at a glance as PALACE STAFF, NEVER as a consort: practical, tidy and authoritative,"
         " no trailing train, no crown, no phoenix, no big hair jewellery.")
out = {}
# 1 NHỊ ĐẲNG = round-1 prompt exactly, only colours: skirt (ruqun) blue, outer top (bijia) pink; + K22 hair sentence
s = rd("test_tm2.txt")
s = sw(s, "a layered half-sleeve brocade jacket (bijia) on top,", f"a layered half-sleeve brocade jacket (bijia) on top in {PINK} like {PINKX},")
s = sw(s, "her main colour powder blue.", f"her main colour {BLUE} like {BLUEX} on the ruqun (the long skirt, the inner robe and its long sleeves), her secondary colour {PINK} like {PINKX} on the whole half-sleeve outer jacket (bijia), both clearly visible.")
out["nhi"] = sw(s, " Pose:", HAIR + " Pose:")
# 2 NHẤT ĐẲNG = round-3 design; skirt + WHOLE sleeves blue, vest + panels pink; sleeves = round-1 nhất width
s = rd("test3_nhat.txt")
s = sw(s, "the sleeves are wide, a palace maid's sleeves (never a consort's long trailing sleeves).", "the sleeves: " + SLV)
s = sw(s, "never a single flat colour all over; gold or silver only as thin accents, never a third colour.",
       f"never a single flat colour all over; gold or silver only as thin accents, never a third colour. COLOUR PLACEMENT: the long SKIRT and the WHOLE SLEEVES are {BLUE} (a touch deeper than a lower maid's blue), the sleeves blue all the way down, only their embroidered cuff band may carry {PINK} embroidery; the sleeveless over-vest and its two front panels are {PINK}.")
out["nhat"] = s
# 3 CHƯỞNG SỰ = round-3 design (ksetgGU16B), softer tím cà, sleeves = new nhất, powder blue large secondary
s = rd("test3_tm3.txt")
s = sw(s, "a soft medium eggplant purple (clearly purple, not dark, not black, not grey)",
       "a soft, gentle medium eggplant purple, a little softer and less saturated than a strong purple (clearly purple, not dark, not black, not grey)")
s = sw(s, "Sleeves about three hand-spans wide.", SLV)
s = sw(s, "the robe is a soft medium eggplant purple (tím cà).",
       f"the robe is a soft, gentle medium eggplant purple (tím cà). TWO-COLOUR RULE: EXACTLY TWO colours that clearly interact: the MAIN colour eggplant purple on the robe, the SECONDARY colour {BLUE} like {BLUEX} clearly visible in LARGE areas: a {BLUE} inner skirt showing below and at the front opening of the robe, a broad {BLUE} collar band, broad {BLUE} cuff linings and a {BLUE} waist sash; gold only as thin accents." + STAFF)
out["cs"] = s
# 4 MA MA a36 = NEW integrated dress (no open coat), jade main + powder blue secondary, sleeves ≈ nhất
s = rd("test3_mama.txt")
mo = re.search(r"Outfit \(a senior palace ma ma's dress.*?never a consort's long trailing sleeves\)\.", s).group(0)
s = sw(s, mo, f"Outfit (a senior palace ma ma's dress, plainer in cut but more dignified than a first-rank maid, never poor): ONE integrated long dress worn as a single closed garment (NO open coat, NO jacket or overcoat thrown over it, nothing hanging open at the front): a floor-length robe of fine silk with a crossed collar closing to the right, fitted neatly at the bodice and closed by a broad {BLUE} sash wrapped high at the waist; a broad {BLUE} collar band running down the crossing front edge; a long softly pleated skirt with a wide {BLUE} front panel from the waist to the hem; broad {BLUE} cuff bands; a small jade pendant on a cord at the sash; restrained embroidery of small clouds and plum blossoms ONLY on the {BLUE} bands; her own hair colour, ALL her hair pinned UP in a neat bun (chignon) with two plain silver hairpins; soft slippers; " + SLV)
s = sw(s, "the MAIN colour jade blue-green like #4E8FA3 and the SECONDARY colour soft ivory,", f"the MAIN colour jade blue-green like #4E8FA3 and the SECONDARY colour {BLUE} like {BLUEX},")
s = sw(s, "never a third colour.", "never a third colour." + STAFF)
out["mama"] = s
for k, s in out.items():
    assert len(s) <= 10000 and "broom" not in s.replace(" She never holds a broom.", ""), k
    open(os.path.join(D, f"test5_{k}.txt"), "w", encoding="utf-8").write(s); print(k, len(s))

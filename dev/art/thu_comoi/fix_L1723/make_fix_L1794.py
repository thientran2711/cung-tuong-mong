#!/usr/bin/env python3
"""REVERT1 owner L1794 (via Foreman C #22) on the THU @135 sheet: t1 sash to the waist; t6 cloud collar drapes softly; t7 tassel fringe + pearl swag,
jade/pearl/gold luxury; t6-t8 no red / no European (faceted or cabochon) gems -> jewellery only jade, pearl and gold (A46 updated)."""
import os
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
OLDGEM = " All gems are smooth polished CABOCHON stones (rounded, glossy), never faceted, never sparkling or brilliant-cut."
NEWGEM = " JEWELLERY: only jade, pearls and gold, Chinese court style; NO red stones, NO rubies or sapphires, NO faceted or cabochon gems, nothing European."
def rep(t, o, n):
    assert t.count(o) == 1, (o[:70], t.count(o)); return t.replace(o, n)
JOBS = [
 ("s62_t1_THU_fix_L1776", "s62_t1_THU_fix_L1794", [
  ("over a long softly pleated skirt tied high above the waist at the chest with a broad ribbon band whose two long ribbons fall down the front,",
   "over a long softly pleated skirt tied at her natural WAIST (never high on the chest) with a broad ribbon band and its bow at the waist, whose two long ribbons fall down the front, the lilac inner layer at the square neckline clearly visible above it,"),
  ("Mùa Thu · Đáp ứng · cổ vuông L1776", "Mùa Thu · Đáp ứng · đai ngang eo L1794")]),
 ("s62_t6_THU_fix_L1776", "s62_t6_THU_fix_L1794", [
  ("an embroidered cloud collar (yunjian) over the shoulders with a scalloped gold-thread edge",
   "an embroidered SOFT silk cloud collar (yunjian) DRAPING softly over the shoulders, never stiff or flat, with a scalloped gold-thread edge"),
  ("image 2 is only a colour reference; ", ""),   # repeat of the last sentence (length)
  (OLDGEM, NEWGEM), ('"Thu · Quý phi · cổ vuông"', '"Thu · Quý phi · L1794"'),
  ("CAPTION: in LARGE bold letters, top-left corner, on the plain background, never over her body, write exactly this Vietnamese text WITH accents:", "CAPTION: large bold, top-left, on the background, never over her, exactly (with accents):")]),
 ("s62_t7_THU_fix4_L1776", "s62_t7_THU_fix5_L1794", [
  ("a jewelled cloud-collar cape edged with pearls and gold over the shoulders,",
   "a soft gold-and-jade cloud-collar cape edged with pearls and gold over the shoulders, with a fringe of small silk-and-pearl tassels along its edge,"),
  ("strands of pearls across the chest,", "strands of pearls swagged across the chest from the left collar edge to the right collar edge,"),
  ("more jewels on the phoenix crown (rubies, sapphires, pearls and jade),", "more jade, pearls and gold on the phoenix crown,"),
  (OLDGEM, NEWGEM), ("Mùa Thu · Hoàng quý phi · cổ vuông L1776", "Mùa Thu · Hoàng quý phi · L1794")]),
 ("s62_t8_THU_fix6_L1747", "s62_t8_THU_fix7_L1794", [
  ("a jewelled gold-and-pearl cloud collar", "a gold-and-pearl cloud collar set with jade"),
  ("jewelled wings spreading wide", "gold-filigree wings set with pearls and jade spreading wide"),
  (", smooth cabochon rubies and pearls,", ", pearls and jade,"),
  (OLDGEM, NEWGEM), ("Mùa Thu · Hoàng hậu · cổ vuông L1747", "Mùa Thu · Hoàng hậu · L1794")]),
]
# owner L1799 (via Foreman C #22): red gems MAY be on the CROWN of HQP t7 / HH t8, NEVER on clothing -> t7/t8 own jewellery sentence
NEWGEM78 = " JEWELLERY: only jade, pearls and gold, Chinese court style; red gems ONLY on the crown, NEVER on the robe, cape, collar, belt or pendants; NO sapphires, NO faceted or sparkling gems, nothing European."
for j in JOBS:
    if j[1].startswith(("s62_t7", "s62_t8")):
        j[2][:] = [(o, NEWGEM78 if n == NEWGEM else n) for o, n in j[2]]
JOBS[2][2][:] = [(o, "more jade, pearls, gold and a few smooth red gems on the phoenix crown," if o.startswith("more jewels on the phoenix crown") else n) for o, n in JOBS[2][2]]
JOBS[3][2][:] = [(o, ", a few smooth red gems, pearls and jade," if o == ", smooth cabochon rubies and pearls," else n) for o, n in JOBS[3][2]]
for src, dst, R in JOBS:
    t = open(os.path.join(D, src + '.txt')).read().strip()
    for o, n in R: t = rep(t, o, n)
    open(os.path.join(D, dst + '.txt'), 'w').write(t + '\n'); print(dst, len(t))

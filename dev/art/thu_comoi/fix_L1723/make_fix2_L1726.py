#!/usr/bin/env python3
"""REVERT1 owner L1726: s62 thu t6/t7/t8 fix2 from the L1723 files. Chrysanthemum out (t6 -> formal double 'thousand-petal' camellia, F19);
A46 gems = smooth polished cabochon only."""
import os
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
GEM = " All gems are smooth polished CABOCHON stones (rounded, glossy), never faceted, never sparkling or brilliant-cut."
def rep(t, o, n, r):
    assert t.count(o) == 1, (r, o[:70], t.count(o)); return t.replace(o, n)
T = {6: [
 ("embroidered with incurved chrysanthemums in light olive and gold thread", "embroidered with formal double camellias in light olive and gold thread", "L1726 no chrysanthemum"),
 ("embroidered with chrysanthemums, always fully visible,", "embroidered with formal double camellias, always fully visible,", "L1726"),
 ("exactly ONE fresh soft mauve-pink incurved chrysanthemum in her hair", "exactly ONE fresh ivory-white formal double camellia with a soft pink blush in her hair", "L1726 new t6 flower"),
 ("Mùa Thu · Quý phi · thêm ngọc L1723", "Mùa Thu · Quý phi · hoa trà L1726", "caption"),
], 7: [
 ("Mùa Thu · Hoàng quý phi · hoa thược dược L1723", "Mùa Thu · Hoàng quý phi · đá cabochon L1726", "caption"),
], 8: [
 ("inlaid in lilac and light olive, rubies and pearls,", "inlaid in lilac and light olive, smooth cabochon rubies and pearls,", "A46"),
 ("Mùa Thu · Hoàng hậu · mẫu đơn, cổ gọn L1723", "Mùa Thu · Hoàng hậu · đá cabochon L1726", "caption"),
]}
for n in (6, 7, 8):
    t = open(os.path.join(D, f's62_t{n}_THU_fix_L1723.txt')).read().strip()
    for o, w, r in T[n]: t = rep(t, o, w, r)
    t = rep(t, " No text, no labels.", GEM + " No text, no labels.", "A46")
    p = os.path.join(D, f's62_t{n}_THU_fix2_L1726.txt'); open(p, 'w').write(t + '\n'); print(n, len(t))
    open(p + '.keep', 'w').write(f"base: dev/art/thu_comoi/s62_t{n}_THU_fix_L1723.txt\n# REVERT1 owner L1726: no chrysanthemum (F19), A46 cabochon gems\n")

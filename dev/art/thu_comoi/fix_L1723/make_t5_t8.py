#!/usr/bin/env python3
"""REVERT1 job L1723 (owner L1723 via Foreman C #20): s62 thu t5-t8 from s62_tN_THU_revert_sq_L1719.txt.
Hair flower: bloom ONLY, no leaves, colour from the table HF_COL (suits the olive/lilac outfit, never yellow chrysanthemum); t7/t8 own embroidery flowers."""
import os
D = os.path.dirname(os.path.abspath(__file__)); TH = os.path.join(D, '..')
HFL = "the bloom ONLY, NO leaves, never a yellow chrysanthemum"   # owner L1723
def rep(t, o, n, r):
    assert t.count(o) == 1, (r, o[:70], t.count(o)); return t.replace(o, n)
T = {5: [
 ("an embroidered light olive pearl-edged cape/stole over the shoulders, open at the front, never hiding the square collar,",
  "an embroidered light olive pearl-edged cape/stole over the shoulders, open at the front, never hiding the square collar, and laid over the cape a beaded shoulder yoke draped from shoulder to shoulder over the upper chest: a fine open net of pearls and small jade beads with tiny gold flower studs, its lower edge a pearl fringe LONGER and fuller than the Tần's, with bigger pearls, lying flat over the robe, airy; the pearl net starts right at the cape's neck edge and hangs down over the WHOLE cape, never only half of it, never hiding the square collar;", "L1723 Phi gets the Tần pearl net (t4 approved words) + longer/bigger fringe"),
 ("decorated with ONE fresh double hollyhock and", "decorated with ONE fresh deep rose-pink double hollyhock (bloom only, no leaves) and", "L1723 hair-flower colour + no leaves"),
 ("exactly ONE fresh double hollyhock in her hair (never two, never a pair, no cluster),", f"exactly ONE fresh deep rose-pink double hollyhock in her hair ({HFL}; never two, never a pair, no cluster),", "L1723"),
], 6: [
 ("a few strands of pearls across the chest,", "a few strands of pearls across the chest with a little jade: small green jade beads set among the pearls,", "L1723 Quý phi: a little jade"),
 ("exactly ONE fresh incurved chrysanthemum in her hair (never two, never a pair, no cluster),", f"exactly ONE fresh soft mauve-pink incurved chrysanthemum in her hair ({HFL}; never two, never a pair, no cluster),", "L1723 hair-flower colour + no leaves + never yellow"),
], 7: [
 ("phoenixes, incurved chrysanthemums and auspicious clouds", "phoenixes, bomb-form herbaceous peonies (soft rose-pink and ivory) and auspicious clouds", "L1723 HQP own flower"),
 ("embroidered with chrysanthemums, always fully visible,", "embroidered with herbaceous peonies, always fully visible,", "L1723 HQP own flower"),
], 8: [
 ("large phoenixes, incurved chrysanthemums and clouds", "large phoenixes, tree peonies (deep rose-red and lilac) and clouds", "L1723 HH own flower"),
 ("embroidered with chrysanthemums, always fully visible,", "embroidered with tree peonies, always fully visible,", "L1723 HH own flower"),
 ("a wide jewelled gold-and-pearl cloud collar with layered pearl fringes over the shoulders, open at the front, never hiding the square collar,",
  "a jewelled gold-and-pearl cloud collar lying FLAT and close on the shoulders, with layered pearl fringes hanging straight down, open at the front, never hiding the square collar; NO cloak, NO cape, NO mantle: never a bell or flared cone shape at the neck and shoulders,", "L1723 HH bell shape at the neck"),
 ("floor-length robe, slim tall silhouette;", "floor-length robe, slim tall silhouette, the robe hanging close to the body, never bell-wide;", "L1723 HH slim"),
]}
CAP = {5: ("Mùa Thu · Phi · cổ vuông", "Mùa Thu · Phi · lưới ngọc trai L1723"), 6: ("Mùa Thu · Quý phi · cổ vuông", "Mùa Thu · Quý phi · thêm ngọc L1723"),
       7: ("Mùa Thu · Hoàng quý phi · cổ vuông", "Mùa Thu · Hoàng quý phi · hoa thược dược L1723"), 8: ("Mùa Thu · Hoàng hậu · cổ vuông", "Mùa Thu · Hoàng hậu · mẫu đơn, cổ gọn L1723")}
for n in (5, 6, 7, 8):
    t = open(os.path.join(TH, f's62_t{n}_THU_revert_sq_L1719.txt')).read().strip()
    for o, w, r in T[n] + [CAP[n] + ("caption",)]: t = rep(t, o, w, r)
    p = os.path.join(TH, f's62_t{n}_THU_fix_L1723.txt'); open(p, 'w').write(t + '\n'); print(n, len(t))

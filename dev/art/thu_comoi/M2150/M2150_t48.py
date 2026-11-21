"""M2150 t4-t8 replacement lists (imported by make_M2150.py)."""
A = "COLOUR RULE: all colours clear"
CHEST = ("embroidered at the front of the chest as an ordinary part of the robe's embroidery, worn naturally: her hands, the held item, "
         "the sleeves, the shawl or anything else may cover part of it as they normally would; it is never displayed, never shown off")
LAD = ("Tần shortest, then Phi, Quý phi, Hoàng quý phi, Hoàng hậu longest",
       "Đáp ứng shortest, then Thường tại, Quý nhân, Tần, Phi, Quý phi, Hoàng quý phi, Hoàng hậu longest")
def TH(x): return (A, "EMBROIDERY THREAD (rank law): " + x + " " + A)
GEESE = "two small wild geese in flight, wings spread, long necks, short tails, soft warm brown with pale bellies, outlined in fine silver thread, small and clear, not a phoenix"
J48 = {}
J48[4] = ("M2147-04_Tan_s64_thu_khuy.txt", "M2150-04_s64_t4_thu.txt", [
  TH("all embroidery on her outfit is shaded (gradient-dyed) silk floss with a soft silk sheen, the borders edged with fine silver thread with a soft silver gleam, and the pearl net on her vân kiên; gold only as thin accents."),
  ("WIDE gold-thread embroidered borders", "WIDE shaded-silk embroidered borders edged with fine silver thread"),
  ("double kerria pompon sprays on the skirt front,", "double kerria pompon sprays on the skirt front, and exactly ONE small pair of embroidered birds (two in total) on the skirt or a sleeve: " + GEESE + ","),
  ("a short round capelet of ONE layer of thin soft silk that droops softly down over the shoulders",
   "a soft vân kiên (shoulder piece with gently rounded cloud lobes) of ONE layer of the SAME thin, light, flowing silk as her robe that drapes softly down over the shoulders"),
  ("(the SHORTEST of all ranks (", "(a little longer than the Quý nhân's, shorter than the Phi's ("), LAD,
  ("its neck edge plain capelet silk", "its neck edge plain silk"),
  ("EMBROIDERED INTO the capelet as one piece", "EMBROIDERED INTO the vân kiên as one piece"),
  ("sewn onto the capelet's own silk from its neck edge over the WHOLE capelet", "sewn onto the vân kiên's own silk from its neck edge over the WHOLE vân kiên"),
  ("; no cloud collar, no vest, no stiff shoulder pieces;", "; no vest;"),
  ("sleeves and any cape", "sleeves and vân kiên"),
  ("CAPELET CUT (flowing):", "VÂN KIÊN CUT (flowing):"),
])
J48[5] = ("M2147-05_Phi_s62_thu_khuy.txt", "M2150-05_s62_t5_thu.txt", [
  TH("all embroidery on her outfit is shaded (gradient-dyed) silk floss and fine silver thread with a soft silk and silver gleam, plus the pearl net and small gold tassels on her vân kiên; gold only as thin accents."),
  ("a layered silk brocade court robe", "a layered silk court robe"),
  ("richly embroidered in gold with double hollyhocks and small birds,",
   "richly embroidered in shaded silk and silver thread with double hollyhocks and small embroidered birds: one pair plus one more single bird (three in total), scattered lightly, never crowded: " + GEESE + ","),
  ("a light olive soft silk shoulder piece (cầu vai) of TWO thin soft layers of silk",
   "a light olive soft vân kiên (cầu vai) of TWO thin soft layers of the SAME thin, light, flowing silk as her robe"), LAD,
  ("following the slope of the shoulders, never sticking out, never stiff;", "following the slope of the shoulders;"),
  ("a scalloped gold-thread edge", "a scalloped silver-thread edge"),
  ("deep brocade cuffs", "deep silk cuffs"),
  ("ONE slim gold-brocade girdle", "ONE slim gold silk girdle"),
  ("sleeves and any cape", "sleeves and vân kiên"),
])
J48[6] = ("M2147-06_QuyPhi_s62_thu_khuy.txt", "M2150-06_s62_t6_thu.txt", [
  ("FABRIC: the FABRIC is thin, light, flowing silk and gauze with a soft sheen and fine delicate embroidery, long soft graceful drapery that sways and trails elegantly (thướt tha).", "The FABRIC is thin, light, flowing silk and gauze with a soft sheen and fine delicate embroidery, long soft graceful drapery that sways and trails elegantly (thướt tha); the small embroidered motifs are stitched in fine gold thread."),
  TH("she is the first rank with gleaming twisted GOLD thread over the whole robe, with tiny seed pearls among the embroidery."),
  ("a light olive soft silk shoulder piece (cầu vai) of TWO thin layers of soft silk",
   "a light olive soft vân kiên (cầu vai) of TWO thin layers of the SAME thin, light, flowing silk as her robe"),
  ("; it never flares, never spreads outward, never lifts away from the body, the shoulder line stays narrow and natural;", "; the shoulder line stays narrow and natural;"),
  ("DENSE embroidery on the robe body: many formal double camellia sprays closely spaced over the whole robe body, the sleeves and the skirt front, the small birds and butterflies placed among them,",
   "rich embroidery on the robe body: many formal double camellia sprays worked in shining gold thread (gold petals, gold outlines, gold stems and leaves) closely spaced over the whole robe body, the sleeves and the skirt front, so clear gold embroidery shimmers all over the light olive silk (the first rank with gold-thread embroidery over the whole robe), with small embroidered birds among them: two pairs (four in total), spaced apart, never crowded: three small wild geese in flight (long necks, short tails, soft warm brown with pale bellies) and one small white crane (long thin neck and legs, short plain tail, tiny red crown), outlined in gold thread, small and clear, not a phoenix,"),
  ("a small sprig of formal double camellias embroidered flat into the robe front below the neckline, part of the robe's embroidery, flat in the cloth, never emphasised, never standing out,",
   "a small sprig of formal double camellias " + CHEST + ","),
  ("JEWELLERY: only jade", "The INNER robe (the under-layer, visible at the neckline and the front opening) is LIGHTLY embroidered: a few small sprigs of her flower, in fine flat silk thread, plain cloth between them; calm, never busy. JEWELLERY: only jade"),
])
J48[7] = ("M2147-07_HoangQuyPhi_s62_thu_phuong_khuy.txt", "M2150-07_s62_t7_thu.txt", [
  TH("gleaming twisted gold thread, the phoenixes also worked in five-colour silk (ngũ sắc) with a soft silk sheen, small pearls along the trims."), LAD,
])
J48[8] = ("M2147-08_HoangHau_s62_thu_phuong_khuy.txt", "M2150-08_s62_t8_thu.txt", [
  ("FABRIC: the FABRIC is thin, light, flowing silk and gauze with a soft sheen and fine delicate embroidery, long soft graceful drapery that sways and trails elegantly (thướt tha).", "The FABRIC is thin, light, flowing silk and gauze with a soft sheen and fine delicate embroidery, long soft graceful drapery that sways and trails elegantly (thướt tha); the small embroidered motifs are stitched in fine gold thread."),
  TH("gleaming twisted gold thread with touches of flat gold couching along the borders, the phoenixes also worked in iridescent peacock-feather thread (a green-blue sheen, ONLY the Empress), small pearls along the trims."), LAD,
  ("never displayed, never shown off, always fully visible;", "never displayed, never shown off;"),
])

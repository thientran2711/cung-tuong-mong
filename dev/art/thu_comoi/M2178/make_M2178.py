#!/usr/bin/env python3
"""M2178-01 = M2174-06 (t6 Quý phi) + owner L2178: less yellow, lighter look (density/size words only; thread words kept), one headdress, one slim girdle line. THUROOT5, words only, A54/A55."""
import pathlib
R = pathlib.Path(__file__).resolve().parents[4]; P = R / "dev/handover/prompts_L2095"; D = pathlib.Path(__file__).parent
base = "M2174-06_s62_t6_thu.txt"; out = "M2178-01_s62_t6_thu.txt"
REPS = [
 # (b) lighter look
 ("embroidered with formal double camellias in light olive and gold thread along the borders", "embroidered with double camellias in light olive and gold thread along the borders"),
 ("framed by ONE wide flat band in her second colour embroidered with formal double camellias", "framed by ONE wide flat band in her second colour embroidered with double camellias"),
 ("a BIG ornate gold headdress with pearls, gold flowers and many gold tassels;", "an elegant gold headdress with pearls and a few gold tassels, never bulky, clearly less grand than the Hoàng quý phi's;"),
 ("many formal double camellia sprays worked in shining gold thread (gold petals, gold outlines, gold stems and leaves) closely spaced over the whole robe body, the sleeves and the skirt front, so clear gold embroidery shimmers all over the light olive silk (the first rank",
  "graceful double camellia sprays worked in shining gold thread (gold petals, gold outlines, gold stems and leaves), loosely scattered over the robe body, sleeves and skirt front with plenty of plain light olive silk between them, airy, never crowded (the first rank"),
 ("a small sprig of formal double camellias embroidered", "a small sprig of double camellias embroidered"),
 ("never shown off, and a grander gold headdress with more gold ornaments, elegant, NOT a pile of jewels, still clearly less grand than the imperial noble consort;", "never shown off;"),
 # (a) less yellow
 ("plus clearly larger visible parts in royal yellow: a WIDE yellow panel at the SKIRT FRONT", "plus a modest amount of royal yellow: a NARROW yellow panel at the SKIRT FRONT"),
 ("a WIDE royal-yellow silk sash", "a slim royal-yellow silk sash"),
 ("with a gold girdle of flat gold plaques edged with seed pearls running all the way around on top of the sash, clearly visible as a proper belt,",
  "with ONE slim gold girdle line running along the sash (no wide plaque belt on top of it),"),
 ("never bulky and WIDE yellow borders along the neckline, sleeves and hem,", "never bulky and NARROW royal-yellow borders (the edge of the neckline band, the sleeve ends and the hem),"),
 ("much less yellow than an imperial noble consort's robe;", "yellow clearly much less than the Hoàng quý phi's, light olive clearly dominant, lilac secondary;"),
 ("lilac only as a small accent;", "lilac the secondary colour;"),
 ("yellow as clearly larger visible parts (wide yellow borders along the neckline, sleeves and hem, a wide yellow sash, a wide yellow panel at the skirt front below the waist) in rich warm royal golden yellow (#EFBD69),",
  "yellow only in a modest amount (narrow yellow borders at the neckline band edge, the sleeve ends and the hem, a slim yellow sash, a narrow yellow panel at the skirt front below the waist), clearly much less than the Hoàng quý phi's, in rich warm royal golden yellow (#EFBD69),"),
 ("her own light olive still clearly the main colour;", "light olive clearly dominant, lilac secondary;"),
]
s = (P / base).read_text()
for o, w in REPS:
    assert s.count(o) == 1, (o[:60], s.count(o)); s = s.replace(o, w, 1)
for bad in ("WIDE yellow", "WIDE royal", "clearly larger visible parts", "wide yellow"):
    assert bad not in s, bad
s = s.replace('"M2174-06"', '"M2178-01"'); assert s.rstrip().endswith('"M2178-01"')
(D / out).write_text(s); (P / out).write_text(s)
(D / (out + ".keep")).write_text(f"base: dev/handover/prompts_L2095/{base}\n" + "".join(f"allow: {o}  # owner L2178 via ROOT-B4\n" for o, _ in REPS))
print(out, len(s))

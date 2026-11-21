#!/usr/bin/env python3
"""M2174-01..08 = M2170-01..08 + owner L2172 colour plan (t6 QP gets HQP's old yellow; t7 HQP secondary = royal yellow,
lilac only scattered accents; t8 unchanged) + owner L2173 item 12 neckline/layer standard (t5-t8). THUROOT5, words only, A54/A55."""
import re, pathlib
R = pathlib.Path(__file__).resolve().parents[4]; P = R / "dev/handover/prompts_L2095"; D = pathlib.Path(__file__).parent
OWN = "  # owner L2172/L2173 via ROOT-B4"
STD = ("ONE straight SQUARE collar only (no crossed collar, nothing layered under it): a LOW open square neckline just below the collarbones, "
       "neck and collarbones bare, NEVER a high stand collar or mandarin collar")
STOP = "(the square band stops at the shoulders, nothing rises up the neck, neck bare)"
EDGE = "shows at the neckline ONLY as a thin flat edge, never an extra visible layer stacked at the neckline; where it shows"
COLL = ("Collar SHAPE exactly as in image 3 (colours per this prompt; no necklace).",
        "Collar SHAPE exactly as in image 3 (the vân kiên only; the neckline stays the low open square neckline above; colours per this prompt; no necklace).")
OLD_NECK = "a straight SQUARE collar (no crossed collar): a LOW open square neckline just below the collarbones, neck and collarbones bare, NEVER a high stand collar or mandarin collar"
Y7_OLD = ("light olive silk like #9FB577 is the MAIN colour of the robe, sleeves and cloud collar, with lilac in the inner robe and linings; "
  "royal golden yellow covers about a QUARTER TO A THIRD of the visible outfit (about HALF as much yellow as the Empress's, clearly more than the Quý phi's, clearly less than the Empress's): "
  "very wide yellow borders along the neckline, sleeves and hem, wide yellow sleeve linings showing at the cuffs, a wide yellow sash and the yellow streamers, and a wide yellow front panel of the robe from the waist down to the hem, in rich warm royal golden yellow (#EFBD69),")
Y7_NEW = ("light olive silk like #9FB577 is the MAIN colour of the robe, sleeves and cloud collar; rich warm royal golden yellow (#EFBD69) is the SECONDARY colour, in large areas: "
  "the inner robe and skirt, very wide yellow borders along the neckline, sleeves and hem, wide yellow cuffs and sleeve linings, a wide yellow sash and the yellow streamers, "
  "and a wide yellow panel at the SKIRT FRONT below the waist (clearly more yellow than the Quý phi, clearly less than the Empress); "
  "lilac only as a third colour, scattered as small accents in a few places (the shades of the peonies, the phoenixes' outer feathers, small details), never in large areas; the royal yellow exactly #EFBD69,")
J = {
 5: [(OLD_NECK, STD),
     ("framed by a wide flat band in her second colour embroidered with double hollyhocks " + STOP,
      "framed by ONE wide flat band in her second colour embroidered with double hollyhocks " + STOP)],
 6: [(OLD_NECK, STD),
     ("framed by a wide flat band in her second colour embroidered with formal double camellias, always fully visible,",
      "framed by ONE wide flat band in her second colour embroidered with formal double camellias " + STOP + ", always fully visible,"),
     (" a pearl-edged collar,", ""),
     ("a WIDE yellow inner robe panel,", "a WIDE yellow panel at the SKIRT FRONT below the waist (never at the neckline),"),
     ("royal golden yellow (#EFBD69) as clearly larger visible parts (wide yellow borders along the neckline, sleeves and hem, a wide yellow sash, a wide inner panel of the robe), her own light olive still clearly the main colour;",
      "yellow as clearly larger visible parts (wide yellow borders along the neckline, sleeves and hem, a wide yellow sash, a wide yellow panel at the skirt front below the waist) in rich warm royal golden yellow (#EFBD69), not pale cream, not beige/tan/ochre, not heavy mustard, not lemon; her own light olive still clearly the main colour;"),
     ("The INNER robe (the under-layer, visible at the neckline and the front opening) is LIGHTLY embroidered:",
      "The INNER robe (the under-layer) " + EDGE + " at the front opening it is LIGHTLY embroidered:")],
 7: [("a SQUARE neckline at a modest height (no crossed collar), framed by a wide flat pearl-edged gold-embroidered band, always fully visible;",
      STD + ", framed by ONE wide flat pearl-edged gold-embroidered band " + STOP + ", always fully visible;"),
     ("this one robe worn over a lilac inner dress;", "this one robe worn over a royal-yellow inner dress lying flat, never adding bulk at the neckline;"),
     (Y7_OLD, Y7_NEW),
     ("the royal golden yellow (honey-gold like #EFBD69), the MAIN colour light olive and the SECONDARY colour lilac, the secondary clearly visible in large areas (inner robe or skirt, wide borders, sash, cuffs, linings),",
      "the MAIN colour light olive, the SECONDARY colour royal golden yellow (honey-gold like #EFBD69), the secondary clearly visible in large areas (inner robe or skirt, wide borders, sash, cuffs, linings), and lilac only as small scattered accents (peony shades, small details),"),
     ("her robe colour light olive and her secondary colour lilac", "her robe colour light olive and her secondary colour royal yellow"),
     COLL,
     ("The INNER robe (the under-layer, visible at the neckline, the front opening and below the outer robe) is a little more embroidered",
      "The INNER robe (the under-layer) " + EDGE + " at the front opening and below the outer robe it is a little more embroidered")],
 8: [("a SQUARE neckline at a modest height (no crossed collar), framed by a NARROW flat pearl-edged gold-embroidered band that lies",
      STD + ", framed by ONE NARROW flat pearl-edged gold-embroidered band " + STOP + " that lies"),
     ("this one robe worn over a lilac inner dress;", "this one robe worn over a lilac inner dress lying flat, never adding bulk at the neckline;"),
     COLL,
     ("The INNER robe (the under-layer, visible at the neckline, the front opening and below the outer robe) is a little more embroidered",
      "The INNER robe (the under-layer) " + EDGE + " at the front opening and below the outer robe it is a little more embroidered")],
}
EXTRA = {6: ["a wide inner panel of the robe"],
 7: ["with lilac in the inner robe and linings", "royal golden yellow covers about a QUARTER TO A THIRD of the visible outfit", "about HALF as much yellow as the Empress's",
     "clearly more than the Quý phi's", "clearly less than the Empress's", "wide yellow sleeve linings showing at the cuffs",
     "and a wide yellow front panel of the robe from the waist down to the hem", "in rich warm royal golden yellow", "the MAIN colour light olive and the SECONDARY colour lilac"],
 8: ["framed by a NARROW flat pearl-edged gold-embroidered band that lies flat under the vân kiên and never reads as a layer or tier"]}
for n in range(1, 9):
    base = f"M2170-0{n}_s62_t{n}_thu.txt"; s = (P / base).read_text(); reps = J.get(n, [])
    for o, w in reps:
        assert s.count(o) == 1, (n, o[:80], s.count(o)); s = s.replace(o, w, 1)
    s = s.replace(f'"M2170-0{n}"', f'"M2174-0{n}"'); assert s.rstrip().endswith(f'"M2174-0{n}"')
    out = f"M2174-0{n}_s62_t{n}_thu.txt"; (D / out).write_text(s); (P / out).write_text(s)
    al = [o.strip() for o, _ in reps] + EXTRA.get(n, [])
    (D / (out + ".keep")).write_text(f"base: dev/handover/prompts_L2095/{base}\n" + "".join(f"allow: {a}{OWN}\n" for a in al))
    print(n, out, len(s), len(reps))

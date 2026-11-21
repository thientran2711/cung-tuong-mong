#!/usr/bin/env python3
"""M2191-01..04 = t5..t8 (owner L2191 via ROOT-B5), built on M2189-05..08 (all L2189 fixes kept). THUROOT6, words only, 0 cr."""
import pathlib
R = pathlib.Path(__file__).resolve().parents[4]; P = R / "dev/handover/prompts_L2095"; D = pathlib.Path(__file__).parent
LADDER = "(shoulder-piece LENGTH rises by rank: Đáp ứng shortest, then Thường tại, Quý nhân, Tần, Phi, Quý phi, Hoàng quý phi, Hoàng hậu longest)"
SLEEVE_OLD = "SLEEVE LENGTH (rank law): very long, wide, flowing sleeves that hang down to her ANKLES."
SLEEVE_NEW = ("SLEEVE LENGTH (rank law): very long, wide, flowing sleeves that hang down to her ANKLES: the sleeve ends really reach "
              "the level of her ankles, clearly lower than her knees and shins, never shorter, and never touching the floor.")
PHX_OLD = {7: "laid with an airy open net of small pearls and tiny gold flower studs (finer and prettier than the Phi's), with a few small gold-thread phoenixes faintly embroidered in the silk beneath the pearl net, a short pearl fringe along its scalloped edge",
           8: "laid with an airy open net of small pearls and tiny gold flower studs (finer and prettier than the Phi's), with a few small gold-thread phoenix and cloud motifs faintly embroidered in the silk beneath the pearl net, a short pearl fringe along its scalloped edge"}
# item 4: HH M2187-08 phoenix-beneath-net wording (owner: came out right), net words kept light as HQP's (L2189 c)
PHX = ("a gold-thread phoenix and clouds are finely embroidered on the vân kiên's silk first, and an airy open net of small pearls and tiny gold flower studs "
       "(finer and prettier than the Phi's) lies OVER them (the pearls stitched on top of the embroidery), the phoenix and clouds seen through the net")
FR7 = ", a pearl drop fringe along its scalloped edge, a little LONGER than the Quý phi's short fringe"
FR8 = ", a pearl drop fringe along its scalloped edge, the LONGEST of all ranks (longer than the Hoàng quý phi's), still light and airy"
QPW = ("a slim royal-yellow silk sash wrapped all the way around the waist OVER the outer robe, sitting at the natural waist and staying there (only one belt), "
       "with ONE slim gold girdle line running along the sash (no wide plaque belt on top of it), flat, fitted to the waist, never bulky, nothing tight or binding at the chest, closed at its centre front")
J = {}
ONE = "; the vân kiên is ONE continuous piece around the base of the neck, never split into two separate shoulder pieces"
# owner L2193: M2189 clasp edit failed (pictures had no clasp) -> M2187-05/07/08 clasp + neck sentences back VERBATIM; t8 + 'set with small pearls'
J5C = ("joined at the throat by one small horizontal clasp (frog button), open at the front below it;", "joined at the throat by one small horizontal clasp (frog button), open at the front below it" + ONE + ";")
J7C = ("joined at the throat by one small horizontal clasp (frog button), its front open so the square collar stays fully visible;", "joined at the throat by one small horizontal clasp (frog button), its front open so the square collar stays fully visible" + ONE + ";")
J[5] = [J5C,  # t5 Phi: waist / sash / robe / skirt = Tần M2189-04 structure; vân kiên length = Tần's; ONE tier like Tần (owner L2176)
 ("a light olive soft vân kiên (cầu vai) of TWO thin soft layers of the SAME thin, light, flowing silk as her robe (the lower peeking out below the upper as a narrow wavy band) that DRAPES",
  "a light olive soft vân kiên (cầu vai) of ONE layer of the SAME thin, light, flowing silk as her robe that DRAPES"),
 ("a layered silk court robe of two or three visible layers, richly embroidered",
  "a layered silk robe of two or three visible layers with WIDE shaded-silk embroidered borders edged with fine silver thread of double hollyhocks at the sleeves and hem (the small embroidered motifs never run over these borders or bands), richly embroidered"),
 ("its lobes reaching the shoulder points and just over them (about as long as the Tần's, never shorter " + LADDER + ")",
  "its lobes reaching the shoulder points and just over them (exactly as long as the Tần's, never shorter " + LADDER + ")"),
 ("long trailing wide sleeves with deep silk cuffs, NO bow: ONE slim gold silk girdle (only one belt, no second band) set with a row of small flat gold plaques chased with her flower, sitting at the natural waist and staying there, never slipping down to the hips, wrapped OVER the outer robe and closed at its centre front by a small gold flower clasp, two LONG silk ties falling straight down either side of it to well past the knees; SLIM, the front of the skirt embroidered with large double hollyhock medallions, a sheer silk shawl;",
  "double hollyhock sprays on the skirt front, long trailing wide sleeves, NO bow: a slim embroidered lilac silk sash with her small flowers along it, wrapped OVER the outer robe and closed at the CENTRE front of the waist by a small round gold-filigree clasp, two LONG silk ties falling straight down either side of the clasp to well past the knees, with small silk tassels (thướt tha); SLIM, a sheer silk shawl;"),
]
J[6] = [  # t6 QP: base M2187-06 VERBATIM (owner L2192 lock); a little more yellow (about half of HQP's); garment jewels; fringe = HQP's M2187-07 words
 ("ONE short pearl fringe along its scalloped edge,", "a short pearl fringe along its scalloped edge,"),
 ("plus a modest amount of royal yellow: a NARROW yellow panel at the SKIRT FRONT below the waist (never at the neckline)",
  "plus a moderate amount of royal yellow (about HALF of the Hoàng quý phi's): a slim yellow panel at the SKIRT FRONT from the waist to the hem (never at the neckline)"),
 ("NARROW royal-yellow borders (the edge of the neckline band, the sleeve ends and the hem),",
  "NARROW royal-yellow borders (the edge of the neckline band, the sleeve ends and the hem), narrow royal-yellow sleeve linings showing at the cuffs,"),
 ("yellow clearly much less than the Hoàng quý phi's, light olive clearly dominant",
  "about HALF as much yellow as the Hoàng quý phi's, light olive clearly dominant"),
 ("yellow only in a modest amount (narrow yellow borders at the neckline band edge, the sleeve ends and the hem, a slim yellow sash, a narrow yellow panel at the skirt front below the waist), clearly much less than the Hoàng quý phi's,",
  "yellow in a moderate amount, about HALF as much as the Hoàng quý phi's (narrow yellow borders at the neckline band edge, the sleeve ends and the hem, narrow yellow sleeve linings at the cuffs, a slim yellow sash with its two long yellow ties, a slim yellow panel at the skirt front from the waist to the hem),"),
 ("with tiny seed pearls among the embroidery.",
  "with tiny seed pearls among the embroidery, plus small pearls and tiny jade beads stitched along the neckline band and the borders (more pearls and jewels on the robe than the Phi, fewer than the Hoàng quý phi), light and flat, never heavy."),
]
J[7] = [J7C,
 ("; " + PHX_OLD[7], "; " + PHX + FR7),
 ("a slim belt of small carved white-jade plaques in gold frames with seed pearls along both edges, over a wide royal-yellow silk sash wrapped OVER the outer robe, sitting at the natural waist and staying there, closed at the CENTRE front of the waist by a gold cloud plaque",
  QPW + " by a gold cloud plaque"),
 ("a wide yellow sash and the yellow streamers", "a slim yellow sash and the yellow streamers"),
 ("small pearls along the trims.",
  "small pearls and small jade beads stitched along all the trims, the neckline band and the cuffs, and seed pearls scattered among the robe embroidery (clearly more pearls and jewels on the robe than the Quý phi, fewer than the Empress), light and flat, never heavy."),
 (SLEEVE_OLD, SLEEVE_NEW),
]
J[8] = [
 ("joined at the throat by one small horizontal clasp (frog button), its front open",
  "joined at the throat by one small horizontal clasp (frog button), small and gold, set with small pearls, CLEARLY drawn where the two front edges of the vân kiên meet under the chin, its front open"),
 ("its front open so the square collar stays fully visible;", "its front open so the square collar stays fully visible" + ONE + ";"),
 ("; " + PHX_OLD[8], "; " + PHX + FR8),
 ("a slim belt of a few small carved white-jade phoenix-and-cloud plaques, each in a gold frame with pearl rims, over a narrow royal-yellow silk sash wrapped OVER the outer robe, sitting at the natural waist and staying there, closed at the CENTRE front of the waist by a small gold double-phoenix plaque set with white jade and pearls",
  QPW + " by a small gold double-phoenix plaque set with white jade and pearls"),
 ("small pearls along the trims.",
  "small pearls, small jade beads and tiny gold flower studs stitched along all the trims, the neckline band and the cuffs, and seed pearls scattered richly among the robe embroidery (the most pearls and jewels on the robe of all ranks, more than the Hoàng quý phi), still light and flat, never heavy."),
 (SLEEVE_OLD, SLEEVE_NEW),
]
for i, n in enumerate((5, 6, 7, 8), 1):
    base = "M2187-06_s62_t6_thu.txt" if n == 6 else f"M2189-0{n}_s62_t{n}_thu.txt"; s = (P / base).read_text()
    for o, w in J[n]:
        assert s.count(o) == 1, (n, o[:70], s.count(o)); s = s.replace(o, w, 1)
    assert "image 2" not in s and "image 3" not in s and s.count("ONE continuous piece") == 1, n
    code = f"M2191-0{i}"; out = f"{code}_s62_t{n}_thu.txt"
    s = s.replace(f'"M2189-0{n}"', f'"{code}"').replace('"M2187-06"', f'"{code}"'); assert s.rstrip().endswith(f'"{code}"'), n
    (D / out).write_text(s); (P / out).write_text(s)
    (D / (out + ".keep")).write_text(f"base: dev/handover/prompts_L2095/{base}\n" + "".join(f"allow: {o}  # owner L2191 via ROOT-B5\n" for o, _ in J[n]))
    print(out, len(s))

# owner L2192 lock: praised pictures frozen -> LOCKED copies of M2187-01..04 (verbatim)
for n in (1, 2, 3, 4):
    src = P / f"M2187-0{n}_s62_t{n}_thu.txt"; (P / f"LOCKED_t{n}_M2187-0{n}_s62_t{n}_thu.txt").write_bytes(src.read_bytes())

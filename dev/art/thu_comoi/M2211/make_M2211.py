#!/usr/bin/env python3
"""M2211-03..08 = M2206-03..08 + owner L2212 (net/edging/fringe words only INSIDE each rank's one vân kiên sentence, repeats deleted; t3 pearl-edged rim + clasp pearl) + M2206-04..08 + owner L2207 (cloth movement t7/t8) + L2208/L2210 (ONE vân-kiên jewel-net ladder template t4..t8 + drop-fringe material);
M2209-01 = M2211-07 with every neckline/collar/neck word replaced by only 'a low neckline' (owner L2209 test). THUROOT7, words only, 0 cr."""
import pathlib
R = pathlib.Path(__file__).resolve().parents[4]; P = R / "dev/handover/prompts_L2095"; D = pathlib.Path(__file__).parent
LAD = "(jewel-net RICHNESS rises by rank: Tần, Phi, Quý phi, Hoàng quý phi, Hoàng hậu richest)"
def net(a, over, b, fr):
    return ("its pearl net EMBROIDERED INTO the vân kiên as one piece: a fine open net of " + a +
            " sewn onto the vân kiên's own silk from its neck edge over the WHOLE vân kiên" + over + ", " + b +
            ", soft and light, draping and moving softly with the silk " + LAD + ", " + fr + ", never a separate yoke laid over it")
NG = " (never red, never faceted)"
OV = ", OVER the embroidery (the pearls stitched on top of it, the phoenix and clouds seen through the net)"
PH = "a gold-thread phoenix and clouds are finely embroidered on the vân kiên's silk first; "
NET = {
 4: net("pearls and small jade beads with tiny gold flower studs", "", "fewer, widely spaced pearls, airy",
        "a short pearl fringe stitched along its scalloped lower edge"),
 5: net("pearls and small jade beads with tiny gold flower studs and tiny smooth coloured stones at the crossings" + NG, "",
        "denser than the Tần's, the pearls set closer together, still airy", "a short pearl fringe stitched along its scalloped lower edge"),
 6: net("pearls, small jade beads and gold flower studs with small smooth gemstones at the crossings" + NG, "",
        "dense and precious, clearly richer than the Phi's, simpler than the Hoàng quý phi's, truly rare and noble, never bulky",
        "a short fringe of pearl drops with small gold beads and jade tips stitched along its scalloped lower edge (never silk tassels, no pearl swags or loops)"),
 7: PH + net("pearls and jade beads with gold flower studs and small smooth gemstones set at the crossings" + NG, OV,
        "denser and richer than the Quý phi's", "a pearl-and-jade drop fringe with small gold caps stitched along its scalloped lower edge (a little LONGER than the Quý phi's short fringe)"),
 8: PH + net("pearls and jade beads with gold-filigree flower studs and small smooth gemstones set at every crossing" + NG, OV,
        "the most beautiful and richest of all ranks", "a fringe of pearl, jade and small smooth gem drops with gold-filigree caps stitched along its scalloped lower edge (the LONGEST of all ranks, longer than the Hoàng quý phi's, still light and airy)"),
}
MOVE = "the skirt and the long sleeves drifting softly as in a gentle breeze (thướt tha)"
J = {
 4: [("its pearl net EMBROIDERED INTO the vân kiên as one piece: a fine open net of pearls and small jade beads with tiny gold flower studs sewn onto the vân kiên's own silk from its neck edge over the WHOLE vân kiên, fewer, widely spaced pearls, airy, a short pearl fringe stitched along its scalloped lower edge, never a separate yoke laid over it", NET[4])],
 5: [("an airy open net of SMALL pearls and small jade beads sewn onto it, lying flat on the soft silk, a short pearl fringe at its lower edge;", NET[5] + ";"),
     ("the net lying flat and airy on the soft silk, the lower edge in soft rounded scallops", "the lower edge in soft rounded scallops")],
 6: [("an airy open net of small pearls and tiny gold flower studs sewn onto the vân kiên's own silk, lying flat, no pearl swags or loops, finer and a little richer than the Phi's, simpler than the Hoàng quý phi's, soft and light, never bulky; a short pearl fringe along its scalloped edge, never silk tassels, no pearl swags or loops;", NET[6] + ";")],
 7: [("a gold-thread phoenix and clouds are finely embroidered on the vân kiên's silk first, and an airy open net of small pearls and tiny gold flower studs (finer and prettier than the Phi's) lies OVER them (the pearls stitched on top of the embroidery), the phoenix and clouds seen through the net, a pearl drop fringe along its scalloped edge, a little LONGER than the Quý phi's short fringe,", NET[7] + ","),
     ("a near-empress robe of light olive silk,", "a near-empress robe of thin, light, flowing light olive silk,"),
     ("SLIM, floor-length robe;", "SLIM, floor-length robe of light silk that flows and sways softly, " + MOVE + ";")],
 8: [("a gold-thread phoenix and clouds are finely embroidered on the vân kiên's silk first, and an airy open net of small pearls and tiny gold flower studs, the most beautiful of all, lies OVER them (the pearls stitched on top of the embroidery), the phoenix and clouds seen through the net, a pearl drop fringe along its scalloped edge, the LONGEST of all ranks (longer than the Hoàng quý phi's), still light and airy,", NET[8] + ","),
     ("light silk that flows and sways softly, never bell-wide,", "light silk that flows and sways softly, " + MOVE + ", never bell-wide,")],
}
A = {5: ["an airy open net of SMALL pearls and small jade beads sewn onto it", "lying flat on the soft silk", "a short pearl fringe at its lower edge", "the net lying flat and airy on the soft silk"],
     6: ["an airy open net of small pearls and tiny gold flower studs sewn onto the vân kiên's own silk", "lying flat", "no pearl swags or loops", "finer and a little richer than the Phi's", "a short pearl fringe along its scalloped edge", "never silk tassels"],
     7: ["and an airy open net of small pearls and tiny gold flower studs", "finer and prettier than the Phi's", "lies OVER them", "the pearls stitched on top of the embroidery", "the phoenix and clouds seen through the net", "a pearl drop fringe along its scalloped edge", "a little LONGER than the Quý phi's short fringe", "SLIM", "floor-length robe", "a near-empress robe of light olive silk"],
     8: ["and an airy open net of small pearls and tiny gold flower studs", "the most beautiful of all", "lies OVER them", "the pearls stitched on top of the embroidery", "the phoenix and clouds seen through the net", "a pearl drop fringe along its scalloped edge", "the LONGEST of all ranks", "longer than the Hoàng quý phi's", "still light and airy"]}
TAG = "owner L2207/L2208/L2210/L2212 via ROOT-B5"
J[3] = [("flowing light olive silk as her robe, soft and unlined, it DRAPES", "flowing light olive silk as her robe, soft and unlined, edged along its scalloped rim with one row of small pearls (no net, no drops), it DRAPES"),
        ("(frog button) of small plain gold,", "(frog button) of small plain gold with one tiny pearl,")]
J[4] += [(" with a soft silver gleam, and the pearl net on her vân kiên;", " with a soft silver gleam;")]
J[5] += [("never a separate yoke laid over it; the lower edge in soft rounded scallops edged with silver thread, the small gold tassels hanging lightly from the scallops and the short pearl fringe below them, all softly draped down on the shoulders;", "never a separate yoke laid over it;"),
         (" with a soft silk and silver gleam, plus the pearl net and small gold tassels on her vân kiên;", " with a soft silk and silver gleam;")]
J[7] += [(", like the Phi's soft pearl-net vân kiên;", ";"), (", pearl and jade trims along the vân kiên edges;", ";")]
J[8] += [(", like the Phi's soft pearl-net vân kiên;", ";")]
A[4] = ["and the pearl net on her vân kiên"]
A[5] += ["the lower edge in soft rounded scallops edged with silver thread", "the small gold tassels hanging lightly from the scallops and the short pearl fringe below them", "all softly draped down on the shoulders", "plus the pearl net and small gold tassels on her vân kiên"]
A[7] += ["like the Phi's soft pearl-net vân kiên", "pearl and jade trims along the vân kiên edges"]
A[8] += ["like the Phi's soft pearl-net vân kiên"]
# one vân kiên sentence per rank (t5–t8): ';' -> ',' inside the block
VK = {5: ("a light olive soft vân kiên (cầu vai)", "never a separate yoke laid over it"),
      6: ("a light olive soft vân kiên (cầu vai)", "never split into two separate shoulder pieces"),
      7: ("a light olive vân kiên (soft shoulder", "never a separate yoke laid over it"),
      8: ("a royal golden yellow vân kiên", "never a separate yoke laid over it")}
def build(n, base, code, edits, allows, tag):
    s = (P / base).read_text()
    for o, w in edits:
        assert s.count(o) == 1, (code, o[:70], s.count(o)); s = s.replace(o, w, 1)
    if code.startswith("M2211") and n in VK:
        a, b = VK[n]; i = s.index(a); j = s.index(b, i) + len(b); s = s[:i] + s[i:j].replace("; ", ", ") + s[j:]
    old = base[:8]; s = s.replace(f'"{old}"', f'"{code}"'); assert s.rstrip().endswith(f'"{code}"'), code
    out = f"{code}_s62_t{n}_thu.txt"; (D / out).write_text(s); (P / out).write_text(s)
    (D / (out + ".keep")).write_text(f"base: dev/handover/prompts_L2095/{base}\n" + "".join(f"allow: {a}  # {tag}\n" for a in allows))
    print(out, len(s))
for n in range(3, 9):
    build(n, f"M2206-0{n}_s62_t{n}_thu.txt", f"M2211-0{n}", J[n], A.get(n, []), TAG)
# L2209 test: HQP neck words -> only 'a low neckline'
T = [("ONE straight SQUARE collar only (no crossed collar, nothing layered under it): a LOW open square neckline just below the collarbones, neck and collarbones bare, NEVER a high stand collar or mandarin collar, framed by ONE wide flat band in her second colour embroidered with bomb-form herbaceous peonies (the square band stops at the shoulders, nothing rises up the neck, neck bare), always fully visible;", "a low neckline;"),
     ("embroidered on the front of the robe below the collar,", "embroidered on the front of the robe,"),
     ("it is never displayed, never shown off, never inside the neckline, never framed;", "it is never displayed, never shown off;"),
     ("never rising up the neck, joined at the throat", "joined at the throat"),
     ("very wide yellow borders along the sleeves and hem (only a narrow yellow edge on the neckline band),", "very wide yellow borders along the sleeves and hem,"),
     ("stitched along all the trims, the neckline band and the cuffs,", "stitched along all the trims and the cuffs,"),
     (" The INNER robe (the under-layer) shows at the neckline ONLY as a thin flat edge, never an extra visible layer stacked at the neckline; where it shows at the front opening it is LIGHTLY embroidered: a few small sprigs of her flower, in fine flat silk thread, plain cloth between them; calm, never busy.", "")]
TA = ["ONE straight SQUARE collar only", "no crossed collar", "nothing layered under it", "a LOW open square neckline just below the collarbones", "neck and collarbones bare",
      "NEVER a high stand collar or mandarin collar", "framed by ONE wide flat band in her second colour embroidered with bomb-form herbaceous peonies",
      "the square band stops at the shoulders", "nothing rises up the neck", "always fully visible", "embroidered on the front of the robe below the collar", "never inside the neckline",
      "never framed", "never rising up the neck", "only a narrow yellow edge on the neckline band", "the neckline band and the cuffs",
      "The INNER robe", "the under-layer", "shows at the neckline ONLY as a thin flat edge", "never an extra visible layer stacked at the neckline",
      "where it shows at the front opening it is LIGHTLY embroidered", "a few small sprigs of her flower", "in fine flat silk thread", "plain cloth between them", "never busy"]
build(7, "M2211-07_s62_t7_thu.txt", "M2209-01", T, TA, "owner L2209 test via ROOT-B5")

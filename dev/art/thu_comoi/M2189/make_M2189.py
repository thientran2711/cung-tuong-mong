#!/usr/bin/env python3
"""M2189-01..08 (owner L2189 via ROOT-B5). Bases t1-t5 = M2187-01..05, t6 = M2179-03 (owner's favourite), t7/t8 = M2187-07/-08.
(a) clasp back to plain per-rank wording, 'ONE continuous piece' removed, HH 'CLEARLY drawn ... under the chin' removed.
(b) t7/t8 neckline / inner robe / waist = M2179-03 wording. (c) HH vân kiên = HQP's (length, drape, net). (d) phoenix under net, few words.
(e) t6 colour waits for owner. THUROOT6, words only, 0 cr."""
import pathlib
R = pathlib.Path(__file__).resolve().parents[4]; P = R / "dev/handover/prompts_L2095"; D = pathlib.Path(__file__).parent
ONE = "; the vân kiên is ONE continuous piece around the base of the neck, never split into two separate shoulder pieces"
QP_INNER = ("where it shows at the front opening it is LIGHTLY embroidered: a few small sprigs of her flower, in fine flat silk thread, "
            "plain cloth between them; calm, never busy.")
SL = ("the square band stops at the shoulders, nothing rises up the neck, neck bare), always fully visible")
J = {n: [(ONE + ";", ";")] for n in (1, 2, 3, 5)}
J[4] = [(", the vân kiên is ONE continuous piece around the base of the neck, never split into two separate shoulder pieces,", ",")]
# t6 = M2179-03 unchanged except the image-2 swatch words (owner attaches ONE image only; same fix as M2184-02)
J[6] = [("the royal yellow is exactly the colour of the flat colour swatch image (image 2, a honey-gold close to hex #EFBD69, 18K gold tone,",
         "the royal yellow is like #EFBD69, warm honey-gold, 18K gold tone,")]
J[7] = [
 (", this one robe worn over a royal-yellow inner dress lying flat, never adding bulk at the neckline;", ";"),
 ("; it is never displayed, never shown off, never inside the neckline, never framed;", "; it is never displayed, never shown off;"),
 (ONE + ";", ";"),
 ("; the gold-thread phoenixes are embroidered on the vân kiên's silk first, and an airy open net of small pearls and tiny gold flower studs (finer and prettier than the Phi's) lies OVER them (the pearls stitched on top of the phoenix embroidery), the phoenixes seen through the net, a short pearl fringe",
  "; laid with an airy open net of small pearls and tiny gold flower studs (finer and prettier than the Phi's), with a few small gold-thread phoenixes faintly embroidered in the silk beneath the pearl net, a short pearl fringe"),
 ("over a wide royal-yellow silk sash wrapped OVER the outer robe, closed", "over a wide royal-yellow silk sash wrapped OVER the outer robe, sitting at the natural waist and staying there, closed"),
 ("where it shows at the front opening and below the outer robe it is a little more embroidered than the Quý phi's: a moderate number of small sprigs of her flower, loosely scattered with plenty of plain cloth between them, in fine silk thread, flat in the cloth; calm and uncluttered, never busy.", QP_INNER),
]
J[8] = [
 (", this one robe worn over a lilac inner dress lying flat, never adding bulk at the neckline;", ";"),
 ("framed by ONE NARROW flat pearl-edged gold-embroidered band (the square band stops at the shoulders, nothing rises up the neck, neck bare) that lies flat under the vân kiên and never reads as a layer or tier, a SMALL",
  "framed by ONE wide flat pearl-edged gold-embroidered band (" + SL + "; a SMALL"),
 ("of ONE tier (vân kiên một tầng, never olive; ONE single tier, never two or three), made of the SAME thin, light, flowing silk as her robe, soft, light and unlined, never bulky, it DRAPES",
  "of ONE tier (vân kiên một tầng, never olive), made of the SAME thin, light, flowing silk as her robe, soft and unlined, it DRAPES"),
 ("small and gold, CLEARLY drawn where the two front edges of the vân kiên meet under the chin, its front open", "its front open"),
 (ONE + ";", ";"),
 ("; the LONGEST of all, its lobes falling BELOW the middle of the upper arms (shoulder-piece LENGTH rises by rank: Đáp ứng shortest, then Thường tại, Quý nhân, Tần, Phi, Quý phi, Hoàng quý phi, Hoàng hậu longest); a gold-thread phoenix and clouds are finely embroidered on the vân kiên's silk first, and an airy open net of small pearls and tiny gold flower studs, the most beautiful of all, lies OVER them (the pearls stitched on top of the embroidery), the phoenix and clouds seen through the net, a short pearl fringe",
  "; LONGER than the Quý phi's, its lobes falling to about the MIDDLE of the upper arms (the same length as the Hoàng quý phi's); laid with an airy open net of small pearls and tiny gold flower studs (finer and prettier than the Phi's), with a few small gold-thread phoenix and cloud motifs faintly embroidered in the silk beneath the pearl net, a short pearl fringe"),
 ("over a narrow royal-yellow silk sash wrapped OVER the outer robe, closed", "over a narrow royal-yellow silk sash wrapped OVER the outer robe, sitting at the natural waist and staying there, closed"),
 ("SLIM, never covered by the sleeves, the bodice soft and loose, gently draping, never tight or fitted, never corseted, floor-length robe", "SLIM, never covered by the sleeves, floor-length robe"),
 ("where it shows at the front opening and below the outer robe it is a little more embroidered than the Hoàng quý phi's: small flowers and a few small clouds, evenly scattered with plain cloth between them, in fine silk thread with a touch of gold, flat in the cloth; calm and uncluttered, never busy, never covering the whole layer.", QP_INNER),
]
BASE = {n: f"M2187-0{n}_s62_t{n}_thu.txt" for n in (1, 2, 3, 4, 5, 7, 8)}; BASE[6] = "M2179-03_s62_t6_thu.txt"
for n, reps in J.items():
    base = BASE[n]; s = (P / base).read_text(); code = base[:8]
    for o, w in reps:
        assert s.count(o) == 1, (n, o[:60], s.count(o)); s = s.replace(o, w, 1)
    assert "continuous piece" not in s and "CLEARLY drawn" not in s and "image 2" not in s and "image 3" not in s, n
    assert "joined at the throat by one small horizontal clasp (frog button)" in s, n
    out = f"M2189-0{n}_s62_t{n}_thu.txt"
    s = s.replace(f'"{code}"', f'"M2189-0{n}"'); assert s.rstrip().endswith(f'"M2189-0{n}"'), n
    (D / out).write_text(s); (P / out).write_text(s)
    (D / (out + ".keep")).write_text(f"base: dev/handover/prompts_L2095/{base}\n" + "".join(f"allow: {o}  # owner L2189 via ROOT-B5\n" for o, _ in reps))
    if n == 6: (D / (out + ".keep")).open("a").write("allow: a honey-gold close to hex #EFBD69  # owner L2184/L2189 one image only\n")
    print(out, len(s))

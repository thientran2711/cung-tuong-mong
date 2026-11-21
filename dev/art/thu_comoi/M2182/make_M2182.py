#!/usr/bin/env python3
"""M2182-01 = M2179-03 (t6 QP), -02 = M2174-07 (t7 HQP), -03 = M2176-01 (t8 HH) + owner L2182 (A) clasp/neck + image-3 sentence,
(B) phoenix under the pearl net, (C) QP fabric sentence position + ONE-tier vân kiên, (D) HH loose bodice + smaller belt plaques. THUROOT5, words only, A54/A55."""
import pathlib
R = pathlib.Path(__file__).resolve().parents[4]; P = R / "dev/handover/prompts_L2095"; D = pathlib.Path(__file__).parent
NECK = ("the clasp may sit anywhere on the front, the NECK always fully bare and open, NO collar of any kind around the neck, never a stand collar")
CLASP = "fastened by one small clasp (frog button) where its two front edges meet, " + NECK
IMG3 = ("Collar SHAPE exactly as in image 3 (the vân kiên only; the neckline stays the low open square neckline above; colours per this prompt; no necklace).",
        "Image 3 shows ONLY the lobe shape and pearl net of the vân kiên; NEVER copy its stand collar or anything around the neck (colours per this prompt; no necklace).")
FAB = "The FABRIC is thin, light, flowing silk and gauze with a soft sheen and fine delicate embroidery, long soft graceful drapery that sways and trails elegantly (thướt tha); the small embroidered motifs are stitched in fine gold thread. "
J = {
 1: ("M2179-03_s62_t6_thu.txt", "M2182-01_s62_t6_thu.txt", "M2179-03", [
     ("joined at the throat by one small horizontal clasp (frog button), its front open below it,", CLASP + ", its front open below it,"),
     ("vân kiên (cầu vai) of TWO thin layers of the SAME thin, light, flowing silk as her robe, the upper layer lying on the lower, the lower layer peeking out below it as a narrow softly scalloped band;",
      "vân kiên (cầu vai) of ONE single tier (vân kiên một tầng, never two or three) of the SAME thin, light, flowing silk as her robe, soft and unlined, with a softly scalloped lower edge;"),
     ("sewn onto the vân kiên's own silk, lying flat,", "sewn onto the vân kiên's own silk, lying flat, no pearl swags or loops,"),
     ("ONE short pearl fringe along the lower layer only, never silk tassels;", "ONE short pearl fringe along its scalloped edge, never silk tassels, no pearl swags or loops;"),
     (FAB, ""),  # (C) moved to the t1-t5 position below
     ("The fabric is exactly the cloth written in her outfit,", FAB + "The fabric is exactly the cloth written in her outfit,")]),
 2: ("M2174-07_s62_t7_thu.txt", "M2182-02_s62_t7_thu.txt", "M2174-07", [
     ("joined at the throat by one small horizontal clasp (frog button), its front open", CLASP + ", its front open"),
     ("laid with an airy open net of small pearls and tiny gold flower studs (finer and prettier than the Phi's), gold-thread phoenixes embroidered among the pearls,",
      "the gold-thread phoenixes are embroidered on the vân kiên's silk first, and an airy open net of small pearls and tiny gold flower studs (finer and prettier than the Phi's) lies OVER them (the pearls stitched on top of the phoenix embroidery), the phoenixes seen through the net,"),
     IMG3]),
 3: ("M2176-01_s62_t8_thu.txt", "M2182-03_s62_t8_thu.txt", "M2176-01", [
     ("joined at the throat by one small horizontal clasp (frog button), small and gold, CLEARLY drawn where the two front edges of the vân kiên meet under the chin, its front open",
      "fastened by one small gold clasp (frog button), CLEARLY drawn, where its two front edges meet, " + NECK + ", its front open"),
     ("laid with an airy open net of small pearls and tiny gold flower studs, the most beautiful of all, with a gold-thread phoenix and clouds finely embroidered among the pearls,",
      "a gold-thread phoenix and clouds are finely embroidered on the vân kiên's silk first, and an airy open net of small pearls and tiny gold flower studs, the most beautiful of all, lies OVER them (the pearls stitched on top of the embroidery), the phoenix and clouds seen through the net,"),
     ("a slim belt of carved white-jade phoenix-and-cloud plaques,", "a slim belt of a few small carved white-jade phoenix-and-cloud plaques,"),
     ("by a larger gold double-phoenix plaque set with white jade and pearls", "by a small gold double-phoenix plaque set with white jade and pearls"),
     ("SLIM, never covered by the sleeves, floor-length robe,", "SLIM, never covered by the sleeves, the bodice soft and loose, gently draping, never tight or fitted, never corseted, floor-length robe,"),
     IMG3]),
}
for n, (base, out, oc, reps) in J.items():
    s = (P / base).read_text()
    for o, w in reps:
        assert s.count(o) == 1, (n, o[:60], s.count(o)); s = s.replace(o, w, 1)
    assert "at the throat" not in s and "Collar SHAPE" not in s
    s = s.replace(f'"{oc}"', f'"M2182-0{n}"'); assert s.rstrip().endswith(f'"M2182-0{n}"')
    (D / out).write_text(s); (P / out).write_text(s)
    al = [o.strip() for o, _ in reps if o != FAB and not o.startswith("The fabric is exactly")]
    (D / (out + ".keep")).write_text(f"base: dev/handover/prompts_L2095/{base}\n" + "".join(f"allow: {a}  # owner L2182 via ROOT-B4\n" for a in al))
    print(out, len(s), s.find("The FABRIC is"))

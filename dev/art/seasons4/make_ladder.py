#!/usr/bin/env python3
"""DESIGN1 JOB 4 step 2 (owner via Foreman C #3, G32/G30/G31; prompts only, 0 cr). Era rank ladder (table: dev/handover/reports/DESIGN1.md §JOB 4).
Base = ladder_base/s62_t<N>.txt = build_all.py s62 N (store builder, a18). Changes (asserted):
 1. thu colours as in s62_t5_thu_MINH.txt: ice blue -> light clear warm plum, #71B5D7 -> #DF9ED9, mint mist -> bright blush pink;
 2. ONLY the outfit DESIGN words are replaced (t6: the royal-yellow image-2 swatch wording and the inner colour rule are kept; t7: the phoenix crown clause kept);
 3. NO phi bạch (G32): the PHI BẠCH sentence removed; no shawl in the outfit; 4. CAPTION line (G31)."""
import os, re
D = os.path.dirname(os.path.abspath(__file__))
def rd(n): return open(os.path.join(D, n), encoding="utf-8").read()
def sw(s, a, b):
    assert s.count(a) == 1, ("slot", a[:100]); return s.replace(a, b, 1)
CAP = '\nCAPTION: write this exact small, neat Vietnamese caption WITH its accents in the top-left corner of the picture, on the plain background, never over her body: "{}"\n'
PHIBACH = re.compile(r" PHI BẠCH: the sheer shawl.*?keeps its soft graceful drape\.")
M, S2 = "light clear warm plum", "bright blush pink"
DENSE = ("the robe body densely embroidered ALL OVER (not only the borders) with many large autumn flowers spread over the whole garment, clearly more embroidery than any palace maid")
T5_RE = re.compile(r"a NEW outfit, a layered silk brocade court robe.*?a sheer silk shawl; ")
T6_RE = re.compile(r"a NEW outfit, a HEAVY silk brocade robe.*?still clearly less grand than the imperial noble consort; ")
T7_RE = re.compile(r"a near-empress ceremonial robe of .*?only slipper toe tips peeking under the hem; ")
OUT = {
 ("MINH", 5): (T5_RE, "Mùa Thu · Thiết kế thời Minh · Phi",
  "a NEW outfit, a full Ming-dynasty court look, its silhouette clearly DIFFERENT from Tang, Song and Han: a LONG jacket (chang ao) reaching below the knee in " + M + " silk, with a neat STANDING collar "
  "fastened by a row of small gold-and-pearl buttons down the right front, long wide sleeves; a WIDE woven gold band (tongxiu lan) of chrysanthemums and maple leaves runs across both shoulders and down "
  "the full length of each sleeve; " + DENSE + " (large chrysanthemums, maple leaves and small autumn birds in gold and " + S2 + "); under it a long pleated MA-MIAN skirt (horse-face skirt) in " + S2 + " "
  "with flat front and back panels and fine side pleats, carrying TWO wide woven gold bands (a knee band and a hem band); a gold-and-jade pendant set (jinbu) of linked jade plaques and pearl strands with "
  "long silk tassels hanging down the centre of the skirt front; RANK BLOCK, clearly visible at game size: a large SQUARE embroidered gold medallion (buzi) on the chest framed by a double gold border, "
  "the shoulder-and-sleeve gold bands and the two gold skirt bands; no cape, no cloud collar, no shoulder piece, no shawl; hair in a smooth Ming-style high bun with a gold diadem; "),
 ("MINH", 6): (T6_RE, "Mùa Thu · Thiết kế thời Minh · Quý phi",
  "a NEW outfit, a full Ming-dynasty court look in THREE visible layers, richer than the Phi: the Phi's knee-long standing-collar jacket (gold-and-pearl buttons, square gold chest medallion, woven gold "
  "shoulder-and-sleeve bands) worn under a LONG open-front over-robe (pifeng) of HEAVY " + M + " silk brocade reaching the ankle, with long wide sleeves (one single visible sleeve layer, the jacket sleeves "
  "hidden inside) and two broad straight front bands from the neck to the hem embroidered in gold thread with chrysanthemum scrolls and edged with small pearls, the front held at the chest by a large "
  "gold-and-jade clasp; " + DENSE + "; a long pleated MA-MIAN skirt in " + S2 + " with wide woven gold knee and hem bands, a gold-and-jade pendant set (jinbu) at the centre front; RANK BLOCK: the open pifeng with its two pearl-edged gold front bands over the square chest medallion; no cape, no cloud collar, no shoulder piece, no shawl; hair in a smooth Ming-style "
  "high bun with a BIG ornate gold diadem headdress with pearls, gold flowers and many gold tassels, grander than the Phi, still clearly less grand than the imperial noble consort; "),
 ("MINH", 7): (T7_RE, "Mùa Thu · Thiết kế thời Minh · Hoàng quý phi",
  "a near-empress Ming-dynasty ceremonial look: a LONG open-front over-robe (pifeng) of " + M + " silk brocade to the floor with long wide sleeves (one single visible sleeve layer), its two broad front bands "
  "woven in gold with cloud and peony scrolls and edged with pearls, worn over a standing-collar long jacket with a large SQUARE gold-and-pearl chest medallion; " + DENSE + ", with large peonies and "
  "auspicious clouds in gold thread; a MA-MIAN skirt almost fully covered in woven gold brocade bands; two gold-and-jade pendant sets (jinbu) with pearl tassels; a jade-and-gold belt; floor-length robe, only "
  "slipper toe tips peeking under the hem; no cape, no cloud collar, no shoulder piece, no shawl; "),
 ("HAN", 6): (T6_RE, "Mùa Thu · Thiết kế thời Hán · Quý phi",
  "a NEW outfit, a full Han-dynasty court look in TWO visible robe layers, richer than the Phi: a long floor-length straight-hem outer robe (zhiju) of HEAVY " + M + " silk brocade over an inner robe in "
  + S2 + "; the crossed collars of BOTH robes open WIDE: the lapels sweep out to the edge of the SHOULDERS and meet low at the chest in a broad V, showing her neck and collarbones fully but modestly "
  "(never narrow near the neck); very wide long sleeves with deep embroidered cuffs (one single visible sleeve layer, the inner sleeves hidden inside); " + DENSE + " (large peonies and "
  "chrysanthemums in gold); a deep embroidered hem border; RANK BLOCK, clearly visible at game size: THREE stacked WIDE gold-edged collar bands in the wide V reaching "
  "the shoulders, and a WIDE stiff embroidered waist belt with a gold buckle plaque and a long set of jade discs and pearl strands (zupei) hanging to the knee; no cape, "
  "no cloud collar, no shoulder piece, no shawl; a BIG ornate gold headdress with pearls, gold flowers and many gold tassels, grander than the Phi, still clearly less grand than the imperial noble consort; "),
 ("HAN", 7): (T7_RE, "Mùa Thu · Thiết kế thời Hán · Hoàng quý phi",
  "a near-empress Han-dynasty ceremonial look: a long floor-length straight-hem outer robe (zhiju) of " + M + " silk brocade over an inner robe; the crossed collars open WIDE, the lapels sweeping out to the "
  "edge of the SHOULDERS and meeting low at the chest in a broad V, neck and collarbones visible but modest; very wide long sleeves (one single visible sleeve layer); " + DENSE + ", with large peonies and "
  "auspicious clouds in thick gold thread; THREE stacked WIDE collar bands woven in gold and edged with pearls; a WIDE jade-and-gold belt with two long sets of jade discs and pearl strands (zupei) to the knee; "
  "floor-length robe, only slipper toe tips peeking under the hem; no cape, no cloud collar, no shoulder piece, no shawl; "),
}
for (era, n), (rx, cap, body) in OUT.items():
    s = rd(f"ladder_base/s62_t{n}.txt")
    s = s.replace("ice blue", M).replace("#71B5D7", "#DF9ED9").replace("mint mist", S2)
    m = rx.findall(s); assert len(m) == 1, (era, n)
    s = s.replace(m[0], body, 1)
    p = PHIBACH.findall(s); assert len(p) <= 1, (era, n, "phibach"); s = s.replace(p[0], "", 1) if p else s
    s = s.rstrip("\n") + "\n" + CAP.format(cap)
    low = s.lower()
    assert "shawl;" not in low.replace("no shawl;", "") and "phi bạch" not in low and "qing" not in low , (era, n)
    assert len(s) <= 10000, (era, n, len(s))
    out = f"s62_t{n}_{era}_LADDER.txt"
    open(os.path.join(D, out), "w", encoding="utf-8").write(s); print(out, len(s))

#!/usr/bin/env python3
"""DESIGN2 (owner Lượt 1259, 20/11; G30 prompts only, 0 cr, no Magnific). Hán rank ladder t4–t8, Mùa Xuân test (owner: Xuân = Hán, not confirmed).
Owner: 'A là mình cho bậc Tần … B là mình cho bậc Phi … mỗi một bậc lên là khác nhau … lớp áo ở bên ngoài'. Table: dev/handover/reports/DESIGN2.md.
Base = ladder_base/s62_t<N>.txt (= store-all/build_all.py s62 N; t8 added by DESIGN2). Changes (asserted):
 1. colours as HAN_A/HAN_B: ice blue -> light clear warm plum, #71B5D7 -> #DF9ED9, mint mist -> bright blush pink;
 2. ONLY the outfit DESIGN words replaced (t4 = Hán A khúc cư, t5 = Hán B trực cư, t6–t8 = new outer layer); FABRIC (owner Lượt 1262): t4–t6 the same đoạn satin, t7 gấm, t8 gấm kim tuyến;
    t6 royal-yellow swatch wording kept; t7/t8 phoenix crown clause, image-2 sentence and colour rules kept;
 3. NO phi bạch (G32): PHI BẠCH sentence removed, no shawl; 4. F6: phoenix only on the crown (store 'phoenix main motif' sentence
    dropped at t8; approved S04 'All flowers, birds and the phoenix are … embroidery' and S14 'cape edges' kept verbatim = gate); t6/t7 colour-rule 'cape' -> 'over-robe';
 5. CAPTION line (G31, large bold, VN accents)."""
import os, re
D = os.path.dirname(os.path.abspath(__file__))
def rd(n): return open(os.path.join(D, n), encoding="utf-8").read()
def sw(s, a, b):
    assert s.count(a) == 1, ("slot", a[:90]); return s.replace(a, b, 1)
CAP = '\nCAPTION: write this exact Vietnamese caption in LARGE bold letters at the top-left, on the plain background, never over her body: "{}"\n'
PHIBACH = re.compile(r" PHI BẠCH: the sheer shawl.*?keeps its soft graceful drape\.")
M, S2, Y = "light clear warm plum", "bright blush pink", "royal golden yellow"
DENSE = "the robe body densely embroidered ALL OVER (not only the borders) with many {sz} spring flowers spread over the whole garment, clearly more embroidery than any palace maid"
WIDE = ("crossed collar{s} open{v} WIDE: the lapels sweep out toward the edge of the SHOULDERS and meet low at the chest in a broad V, showing her neck and collarbones "
        "fully but modestly (never narrow near the neck, never a tight high crossing)")
SLV = "(one single visible sleeve layer, every inner sleeve hidden inside)"
NOC = "no shawl; "
OPEN = ", worn open at the front so the wide collar shows"
SIG = {
 4: "her ONE signature piece: a short round embroidered satin capelet (not cloud-shaped, scalloped or pointed) over only the shoulders and upper chest" + OPEN + ", a jade clasp at the throat, with a beaded yoke over it: an airy open net of sparse pearls and small jade beads with tiny gold flower studs, lying flat from the throat over the WHOLE capelet, its short pearl fringe at its lower edge, never only half of it; ",
 5: "her ONE signature piece: TWO layered embroidered satin SHORT shoulder capes, one over the other (the upper cape shorter, the lower cape a little longer, both resting on the shoulders, pearl-edged)" + OPEN + ", never covering the neckline; ",
 6: "her ONE signature piece: an embroidered satin cloud collar (yunjian) over the shoulders with a scalloped gold-thread edge and a fringe of small gold tassels" + OPEN + ", never covering the neckline; ",
 7: "her ONE signature piece: a jewelled brocade cloud-collar cape edged with pearls and gold over the shoulders" + OPEN + ", with strands of pearls across the chest; ",
 8: "her ONE signature piece: a wide jewelled gold-brocade and pearl cloud collar with layered pearl fringes over the shoulders" + OPEN + "; ",
}
RX = {4: re.compile(r"a NEW outfit, a layered silk robe of two or three visible layers.*?; (?=her signature colour family)"),
      5: re.compile(r"a NEW outfit, a layered silk brocade court robe.*?; (?=her signature colour family)"),
      6: re.compile(r"a NEW outfit, a HEAVY silk brocade robe.*?still clearly less grand than the imperial noble consort; "),
      7: re.compile(r"a near-empress ceremonial robe of .*?only slipper toe tips peeking under the hem; "),
      8: re.compile(r"the Empress's imperial phoenix ceremonial robe .*?slim tall silhouette; ")}
TRIM = {  # DESIGN3: only duplicated boilerplate (each also stated elsewhere in the prompt), never outfit/embroidery/jewellery/signature piece
 4: [", never a pair", ", no cluster", ", never back-turned", ", never in profile", ", never copy anything but its colour", r" GRACE \(pose variety.*?toward the viewer\.", " Everyone beautiful at every age.",
     r"; her signature colour family .*? robe(?=\. COLOUR RULE)"],
 6: [", no handle", ", no stick", ", never back-turned", ", never in profile", ", never copy anything but its colour", r" GRACE \(pose variety.*?\.(?= TWO-COLOUR| HELD| Pose)", " Everyone beautiful at every age."],
 7: [", never back-turned", ", never in profile", ", never a single flat colour all over", ", never copy anything but its colour", r" GRACE \(pose variety.*?wrists relaxed\.", " Everyone beautiful at every age."],
 8: [", never back-turned", ", never in profile", ", never a single flat colour all over", ", never copy anything but its colour", r" GRACE \(pose variety.*?(?= THREE-COLOUR)"],
}
FAB_DOAN = open(os.path.join(D, "m03_t4_VAI_DOAN.txt"), encoding="utf-8").read()
FAB_DOAN = re.search(r" The FABRIC is medium-weight silk SATIN \(đoạn\).*?fine gold thread\.", FAB_DOAN).group(0)
FAB_THIN = re.compile(r" The FABRIC is thin, light, flowing silk and gauze.*?fine gold thread\.")
ANCHOR = " never elongated, never a tiny head."
OUT = {
 4: ("Mùa Xuân · Thiết kế thời Hán · Tần · Khúc cư đoạn, cổ ba lớp + choàng ngắn lưới ngọc trai",
  "a NEW outfit, a full Han-dynasty court look in TWO visible layers: a long floor-length wrapped robe (quju) in " + M + " over an inner robe in "
  + S2 + "; its " + WIDE.format(s="", v="s") + "; the hem winds once around the body in a curved spiral wrap; very wide long sleeves " + SLV + " ending in broad embroidered cuff bands, a few sparse small "
  "flowers on the sleeves; " + DENSE.format(sz="medium-size") + " (peonies, peach blossoms and small swallows in gold and " + S2 + "); RANK BLOCK: "
  "THREE stacked WIDE collar bands following the wide V out to the shoulders (outer band " + M + " embroidered in gold, inner two " + S2 + " with gold edges), the same triple band on the spiral hem edge; "
  "a WIDE stiff embroidered waist belt with a gold buckle plaque and one set of jade discs and pearl strands (zupei) on silk cords to the knee; " + SIG[4] + NOC +
  "gold and jade hairpins with small dangling gold bu yao tassels; "),
 5: ("Mùa Xuân · Thiết kế thời Hán · Phi · Trực cư đoạn, hai lớp áo cổ rộng + choàng vai hai lớp",
  "a NEW outfit, a full Han-dynasty court look in TWO visible robe layers: a long straight-hem outer robe "
  "(zhiju) in " + M + " reaching the floor over an inner robe in " + S2 + "; the " + WIDE.format(s="s of BOTH robes", v="") + ", the pink inner collar showing as a wide layered edge inside the plum outer collar; "
  "very wide long sleeves " + SLV + " with deep embroidered cuffs and a little more embroidery on the sleeves than the Tần; " + DENSE.format(sz="LARGE") + " (large peony medallions, peach blossoms and "
  "cloud-and-swallow scrolls in gold); a deep embroidered border along the whole hem and front opening; RANK BLOCK, clearly visible at game size: THREE stacked WIDE gold-edged collar bands in the wide V "
  "(outer " + M + " embroidered in gold, inner two " + S2 + ") and a broad embroidered waist sash tied in a flat knot with TWO long jade pendants on silk cords; " + SIG[5] + NOC +
  "a LARGER gold headdress with dangling gold tassels and jade pins; "),
 6: ("Mùa Xuân · Thiết kế thời Hán · Quý phi · Khuê y đuôi én, đoạn + vân kiên",
  "a NEW Han court look in THREE visible layers: the Phi's two robes (" + S2 + " inner, " + M + " zhiju, collars WIDE to the shoulders) under a NEW "
  "third layer, a " + M + " guiyi over-robe whose skirt ends in a ring of long swallowtail points (yanwei) to the shins, with floating silk ribbon streamers; "
  "very wide sleeves " + SLV + " with deep embroidered cuffs; " + DENSE.format(sz="LARGE") + "; RANK BLOCK: FOUR stacked WIDE collar bands (outermost a narrow "
  + Y + " band), the swallowtail ring, a jade belt, a short " + Y + " shou and a zupei; " + SIG[6] + NOC + "a BIG ornate gold headdress with pearls and many gold tassels; "),
 7: ("Mùa Xuân · Thiết kế thời Hán · Hoàng quý phi · Đại bào gấm bốn lớp + choàng vân kiên ngọc",
  "a near-empress Han ceremonial look in FOUR visible layers of thick BROCADE (gấm), richer than the Quý phi's satin: the "
  + S2 + " inner robe, the " + M + " zhiju and the swallowtail guiyi layer (swallowtail points and ribbon streamers), "
  "all collars WIDE to the shoulders; over them a NEW outer layer, a LONG open-front " + M + " over-robe to the floor, very wide sleeves " + SLV + " with deep "
  + Y + " cuffs, two broad " + Y + " front bands edged with pearls; " + DENSE.format(sz="LARGER") + " in thick gold thread; FIVE stacked WIDE gold collar bands; a jade-and-gold belt with a long " + Y + " rank ribbon (shou) with jade rings and two zupei; " + SIG[7] + NOC),
 8: ("Mùa Xuân · Thiết kế thời Hán · Hoàng hậu · Lễ phục gấm kim tuyến, thụ vàng + vân kiên ngọc trai",
  "the Empress's Han-dynasty grand ceremonial dress in FIVE visible layers, FABRIC the richest of all: heavy gold-thread brocade (gấm kim tuyến) richer than the "
  "Hoàng quý phi's brocade: the inner " + S2 + " robe, the " + M + " zhiju, the swallowtail guiyi layer (a DOUBLE ring of swallowtail points and many ribbon streamers), the Hoàng quý phi's "
  "long open-front " + M + " brocade over-robe, and over them all a NEW outermost layer: a grand long open-front mantle of " + Y + " gold-thread brocade to the floor with very wide sleeves "
  + SLV + " and broad " + M + " borders edged with pearls; all collars WIDE to the shoulders, SIX stacked WIDE gold-woven collar bands edged with pearls; the robe body and "
  "mantle densely embroidered ALL OVER with the LARGEST motifs of all ranks: big peonies, peach blossoms and clouds in gold and kingfisher-blue silk thread (far denser than any other rank); "
  "the Empress's long " + Y + " silk shou hung with large jade rings falling to the hem, a jade-and-gold belt and two long zupei; many long "
  "strands of pearls and jade across the chest; " + SIG[8] + NOC + "slim tall silhouette; "),
}
for n, (cap, body) in OUT.items():
    s = rd(f"ladder_base/s62_t{n}.txt")
    s = s.replace("ice blue", M).replace("#71B5D7", "#DF9ED9").replace("mint mist", S2)
    m = RX[n].findall(s); assert len(m) == 1, n
    s = s.replace(m[0], body, 1)
    p = PHIBACH.findall(s); assert len(p) <= 1, (n, "phibach"); s = s.replace(p[0], "", 1) if p else s
    if n <= 6:  # owner Lượt 1262: t4-t6 the SAME medium-weight satin đoạn (fabric wording verbatim from m03_t4_VAI_DOAN.txt); t7/t8 gấm
        f = FAB_THIN.findall(s)
        if f: s = sw(s, f[0], FAB_DOAN)
        else: s = sw(s, ANCHOR, ANCHOR + FAB_DOAN)
        s = sw(s, "The silk has real weight: the wide sleeves", "The wide sleeves")
    if n == 8: s = sw(s, " The phoenix is the main embroidered motif, larger and more prominent than the flowers.", "")
    # DESIGN3 trims: ONLY duplicated boilerplate (logged in reports/DESIGN3.md), never outfit/embroidery/jewellery/signature piece
    for _t in TRIM.get(n, []):
        s, _k = re.subn(_t, "", s, count=1)
    s = s.rstrip("\n") + "\n" + CAP.format(cap)
    low = s.lower()
    assert "shawl;" not in low.replace("no shawl;", "") and "phi bạch" not in low and "qing" not in low, n
    assert ("image 2" in low) == (n >= 6), (n, "image 2 only t6-t8")
    assert len(s) <= 10000, (n, len(s))
    out = f"s62_t{n}_HAN_BAC.txt"
    open(os.path.join(D, out), "w", encoding="utf-8").write(s); print(out, len(s))

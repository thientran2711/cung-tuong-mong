# recolour-sample — c01 a18 t1..t8, 8 fabric colours (W11)

PRIORITY #1 CHECK: OD = owner ~20:10Z (colour variation of the approved live repaints); main none, review/* none, no existing claim. Rank-outfit redesign is cancelled, outfits unchanged.

Method (a), local, 0 credits: saturation/value/hue weighted fabric mask (gold/jewellery by hue, hair by value, flowers/pearls by low saturation), head box + skin-colour-only hand/neck boxes protected (faces/skin/forehead mark untouched), hue/sat/luma shift keeping shading and folds. Alpha identical, same pixel size as live (normal 374x900.. and hd 2x). Nothing live touched. Script: dev/figwork/recolour_fabric.py (+ per-tier hand boxes in this report's generator, kept in worker scratch).

Files (CDN, add-only): https://ctm-img.victoria-tntt.workers.dev/img/_review/recolour-sample/c01_tK_recolour.png and c01_tK_recolour_hd.png (K=1..8)

| key | colour | hex |
|---|---|---|
| c01 t1 | celadon green | #8FB9A3 |
| c01 t2 | wisteria lilac | #A590C9 |
| c01 t3 | apricot orange | #E8A060 |
| c01 t4 | sky blue | #6FA3D4 |
| c01 t5 | emerald | #2E8B6A |
| c01 t6 | rose pink | #E58CA8 |
| c01 t7 | muted indigo | #5A6AA8 |
| c01 t8 | imperial yellow, warm golden (Hoang hau) | #E8AC3C |

v2 (ROOT-9 fixes): lower saturation threshold so shading/highlight patches shift too; held items (scroll, fans, cup, handkerchief, flower branches) keep original colour; inner-collar lining stays original on all tiers; t7/t8 softened. Per-tier boxes now in dev/figwork/recolour_c01_cfg.py.

Known minor leftovers (v1 text, mostly fixed): orange inner collar lining and gold trim keep their original hue on some tiers (t2, t4, t5, t7); tiny unshifted cuff patches next to the lower hand on t5/t7.

## Rotation scheme (everyone's order differs; t8 always imperial yellow)
Palette Q (11 colours, ordered so neighbours are different hue families):
0 celadon #8FB9A3, 1 wisteria #A590C9, 2 apricot #E8A060, 3 sky blue #6FA3D4, 4 emerald #2E8B6A, 5 rose #E58CA8, 6 indigo #3F52A3, 7 crimson #B3364A, 8 teal #3A9A9A, 9 plum #7D4380, 10 terracotta #C0694A.
Person index p (0 = c01): colour(t_k) = Q[(s*p + k - 1) mod 11] for k=1..7, with s = 1 for p=0..10 (rotation), then s = 2..10 for later batches (11 prime, so every (s,p) gives a different order; 110 distinct orders). Adjacent tiers are neighbours in Q, hence different families. t8 = #E8AC3C for all.

## UPDATE: repaint method (owner approved; local recolour REJECTED, deleted)
Owner rules: FRESH Magnific gpt-2-6 gen each time, refs = live hd c01 tN (design) + live img/hd/fig-maid-m09-a18.webp (style/face) + STYLE_ANCHOR prefix; real trâm (hairpins with pearl dangles/tassels) like m09, no flat combs/crown plates; no teacup (t2 = flower basket); bare forehead; skin clause. Cut-out with Magnific bg removal, native gen size (not downscaled).
Files img/_review/recolour-sample/ (gen -> cut): t1 v3 (vQ2Z6Tga47 -> DoJ7SP3pcl, celadon) | t2 v3 (dtPyAMDXSL -> MB7wRZnDCm, wisteria lilac, basket) | t3 v3 (9ZFQlUINYZ -> LwoBH8EswO, apricot) | t4 v6 (UPhmKLcwny -> tC3iM2EmZJ, sky blue; v4 CqzGyQXEEy/0eSgfhqTfW was owner-approved outfit) | t5 v3 (1lepaUDr4r -> N2HFsSI6D9, deep emerald) | t6 v2 (Xm4PcG9Bfo -> Symt1B9Ub8, rose) | t7 v2 (eIyOYz3dqL -> cpglZLI0eP, navy-indigo) | t8 v2 (5jMVCfIKxe -> 1lepFnQr4r, golden imperial yellow).
Imports (Magnific project ba4aecfe): live hd t1 SymtBDTUb8, t2 huZRNPNvqL, t3 N2HFQoY6D9, t4 w4vms2R7EI, t5 xSXdenMjfW, t6 jUBXh72LD0, t7 yiECKdSPW9, t8 N2HFxmZ6D9; style ref eIyOFEidqL. Nothing live; no manifests touched.

## FINAL c01 a18 set (W11, 17/11 ~23:00Z) - owner-approved direction
Method: fresh Magnific gpt-2-6 gen per rank on a TALL canvas 768x2000 (headroom for crowns), refs = live hd c01 tN (outfit, imported creation) + live img/hd/fig-maid-m09-a18.webp (eIyOFEidqL, as image AND style ref); prompt clauses: STYLE_ANCHOR prefix, matte soft translucent silk, face/hair as m09 (near-3D, no outline), bare forehead (no ornament/dot/tick), skull-top->feet = 7.5 heads, face (hairline->chin) = 1/10 of hairline->feet, bun/crown EXTRA above skull, shoulders 2.0 x face, waist ~1.15 x face; real trâm with dangles (t1-t4 ornaments one side, t5+ both sides). Gate: face/(hairline->feet) 0.098-0.107 by eye; 50% overlay on m09. Magnific bg removal for cut-outs; native size; nothing live.
Files (img/_review/recolour-sample/, gen -> cut): t1 v4 (5jMMLTOKxe->lJIIyGqgv9, celadon) | t2 v9 (1leeVW7r4r->VXwwgCmMMU, lilac+basket) | t3 v4 (u5Yna8RQLD->MB7w0yUDCm, apricot; old canvas, not redone) | t4 v10 (jUBBpM5LD0->KLDDT4okqp, sky blue) | t5 v8 (JNffakROq4->gOttte3SXO, deep emerald) | t6 v8 (gOttBbASXO->YMssxbqWeC, rose) | t7 v6 (Xm49fMUBfo->xSXBOuAjfW, navy + imperial yellow inner/borders; owner: colour a bit old -> fresher later) | t8 v7 (mERZHIohJQ->N2HqYSR6D9, yellow mixed with crimson/jade/navy).
Imports: live hd t1..t8 = SymtBDTUb8, huZRNPNvqL, N2HFQoY6D9, w4vms2R7EI, xSXdenMjfW, jUBXh72LD0, yiECKdSPW9, N2HFxmZ6D9; style/body ref eIyOFEidqL. Owner rules learned: no local recolour (rejected), no previous gen as ref, no teacup (basket), no forehead marks, hands varied, 4th age band deep/muted, younger bands brighter. Scripts: dev/figwork/recolour_fabric.py (rejected method, kept for reference only).

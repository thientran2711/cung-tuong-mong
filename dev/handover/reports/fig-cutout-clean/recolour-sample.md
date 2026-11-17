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

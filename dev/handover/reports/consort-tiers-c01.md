# consort-tiers c01 — B7 (W36, 18/11)

## B7
PRIORITY #1 CHECK: brief dev/handover/briefs/consort-tiers-B7.md read; reused old-figure pipeline (fig-cutout-clean batch-consort-rest) + palette Q rotation (recolour-sample.md); no new BAL/code. Claims/other branches not re-scanned beyond the brief's own check.

CDN (review only, nothing live): img/_review/consort-tiers/c01/b7/ — c01_a18_t1..t8.png, c01_a18_nude.png, c01_a18_row9.jpg, c01_a18_live_vs_new.jpg, c01_a18_faces.jpg (md5-verified).

### Row scan (live t1–t8, all one pink family)
| rank | pins look like | change in prompt | robe colour |
|---|---|---|---|
| t1 | pink flower + sticks, one side | none | celadon |
| t2 | like t1 (flower + sticks) | none (cup -> flower basket, no teacup rule) | wisteria |
| t3 | gold flower cluster + long dangles | none | apricot |
| t4 | crown-comb + dangles | none | sky blue |
| t5 | like t6 (crown-comb + flowers) | pins: varied long/short, no phoenix crown | emerald |
| t6 | phoenix crown, like t5 | kept phoenix crown | rose (deep) |
| t7 | large phoenix crown | none | indigo + imperial yellow inner/borders/sash (Q[6]) |
| t8 | paired phoenix, few dangles | none | yellow + crimson/jade |
| Nữ đế | new design, no live original | phoenix+dragon crown, lưu to forehead, tòng teng both sides, woman's dress, stiff short cầu vai | yellow + black/gold |
Colours: p=0, t_k=Q[k-1]; no clash found.

### Figures
| figure | colour | changed | gens (until PASS) |
|---|---|---|---|
| t1 | celadon | colour | 1 |
| t2 | wisteria | colour + basket instead of teacup | 2 (1st kept the cup) |
| t3 | apricot | colour | 1 |
| t4 | sky blue | colour | 1 |
| t5 | emerald | colour + pins varied | 1 |
| t6 | rose | colour | 1 |
| t7 | indigo+yellow | colour | 3 (t7 v1 had a mole by the eye; v3 clean) |
| t8 | yellow+crimson/jade | colour | 3 (v1/v2: red dot on forehead; v3 clean) |
| Nữ đế | yellow+black/gold | own design | 6 (several had a red dot on forehead; last one clean) |

Notes: gpt-2-6 has no 1:2 ratio, snapped to 9:16 (1520x2688, transparent, edges clear). Skull-top row measured with MediaPipe (0.30 x F method), no m09. Forehead zoom-checked per figure. Credits ≈ 135 x 20 gens ≈ 2700.

## B8 (replaces B7; sample only, c01) — two-step method (ROOT-18 addendum)
PRIORITY #1 CHECK: B8 order + addendum from ROOT-18; FIGURE_GATE C3 read; no other person, no Nữ đế.
STEP 1 = exact copy of the live figure, 2K, transparent (gpt-2-6, ref = live fig only, "Reproduce image 1 exactly"). STEP 2 = edit of the STEP-1 copy (ref = copy only), robe colour only. Canvas 9:16 (1520x2688; 9:21 unsupported). Picked the lowest bbox-diff gen per rank.
CDN img/_review/consort-tiers/c01/b8/: c01_a18_t1..t8.png (recoloured), c01_a18_copy_t1..t8.png (step-1 copies), c01_a18_row8.jpg (uniform scale, skull top on upper red line), c01_a18_live_vs_new.jpg (rows live | copy | recolour). md5-verified, nothing live.
| rank | colour | bbox w/h diff vs live: copy / recolour | gens (copy + recolour) |
|---|---|---|---|
| t1 | pale celadon | +0.5% / +0.7% | 2 + 2 |
| t2 | soft lilac | +0.1% / -0.0% | 4 + 2 (first copies +2.7/+1.8) |
| t3 | pale apricot | +0.9% / +1.2% | 2 + 2 |
| t4 | misty sky blue | +0.8% / +0.8% | 4 + 2 (first copies +1.8/+1.6) |
| t5 | dusty jade | +0.6% / +0.8% | 2 + 2 |
| t6 | dusty rose | +1.1% / +1.4% | 2 + 2 |
| t7 | slate blue + pale imperial yellow | +0.5% / +0.5% | 2 + 2 |
| t8 | soft golden yellow + muted coral/jade | +1.2% / +1.5% | 2 + 2 |
All within ±1.5%. Pose/turn/cut/headdress/held item identical to live by eye (t2 keeps the live teacup). Earlier one-step B8 set (same CDN names) replaced.
Credits: step 1 20 gens + step 2 16 gens = 36 x 135 = 4860 (plus the earlier one-step 18 gens ~2430 and the cancelled c24 queue ~2560 wasted).

### B8s update (ROOT-18 correction: m09 style ref = DRAWING STYLE + SKIN + FABRIC)
Step 2 redone for all 8 ranks with "Exactly matching the rendering, skin and fabric of the style reference (near-3D semi-realistic drawing style, luminous porcelain skin, soft silk fabric); the style reference is never for body, pose or face" (ref = step-1 copy + m09 style slot). Step-1 copies unchanged (their prompt already read "rendering, fabric and skin only"). The b8s recolours were replaced at the same CDN names.
bbox w/h diff recolour vs live now: t1 +3.6% FAIL, t2 +1.1, t3 +0.8, t4 +0.3, t5 -0.3, t6 0.0, t7 +0.8, t8 +1.9% FAIL (t1, t8 best-effort after max gens, not stretched). Extra gens: 8 x 135 = 1080 credits.

## B8s soft (owner "Vẽ tiếp"; method C4a: ONE gen per figure, refs = LIVE original + m09 in the STYLE slot, "copy EXACTLY ... ONLY change the robe colour")
m09 (eIyOFEidqL) in the style slot for EVERY figure: drawing style + skin + fabric, never body/pose/face. No feet/legs wording in any prompt. No "soft/flowing" wording.
CDN img/_review/consort-tiers/c01/b8s/: c01_a18_t1..t8.png (final), c01_a18_t1..t8_prev.png (previous set, kept), c01_a18_soft.jpg (t1..t8 one row on red skull-top/feet lines). md5-verified, nothing live.
| rank | change | bbox w/h vs live | gens |
|---|---|---|---|
| t1 | pale celadon | +2.8% | 1 |
| t2 | soft lilac, flower basket (no cup) | -0.2% | 1 |
| t3 | pale apricot | +4.2% | 1 |
| t4 | misty sky blue, fan only (scroll removed) | +5.6% | 1 |
| t5 | dusty jade, phoenix -> flowers + butterflies | +3.7% | 1 |
| t6 | dusty rose, phoenix -> flowers + butterflies | +2.6% | 1 |
| t7 | slate blue + pale imperial yellow, large stitched phoenix + flowers | +6.9% | 2 (1st +4.4% phoenix small) |
| t8 | warm soft golden yellow + coral/jade, large phoenix + flowers | +4.3% | 2 (1st +8.5% phoenix small) |
Looked at all: pose/turn/cut/headdress/held item same as live by eye; costume fabrics unchanged from live (no redesign). bbox w/h is NOT within 1.5% for t1, t3, t4, t5, t6, t7, t8 (single-gen method widens figures a few %); not stretched. Credits 10 x 135 = 1350.

## B10 three versions (W34, 18/11; brief consort-B10.md; base = the LIVE originals img/hd/fig-consort-c01-tN-a18.webp)
PRIORITY #1 CHECK: reused the c12 B10 method (reports consort-tiers-c12.md §B10), m09 eIyOFEidqL in the STYLE slot on every gen, FIGURE_GATE C3/C4a–C4e/D2/D3/D3b + B10 re-read before this person.
Rules ticked: [x] one gen per figure, refs = live original + m09 STYLE, "copy EXACTLY … only change colour" [x] no soft/flowing wording [x] t1–t6 no phoenix (live t5 faint phoenix + t6 phoenixes replaced by flowers/birds/butterflies in v0/v1/v2) [x] t7/t8 phoenix MAIN stitched in all 3 versions [x] t7 v1/v2 = own colour main (sage-green / periwinkle) + deeper warm golden yellow; t8 v1 warm golden yellow, v2 jade-green + golden-yellow parts [x] one held item: t2 live teacup → small flower basket; t4 live scroll + fan → fan only; others unchanged (t1 flower sprig, t3 round fan, t6 handkerchief, t7 flower, t8 folded fan) [x] feet never in a prompt [x] forehead: t8 live dot removed (clean in all 3 after the stronger wording), t7 live has a tiny mole under the left eye — still faintly visible in v0/v1/v2 despite 2 attempts (residual, flagged) [x] overlay vs live (alpha IoU, uniform scale on bbox height, centred).
Versions: v0 = original coral-pink + m09 skin; v1 = celadon, lilac, sky blue, apricot, periwinkle, teal-aqua, sage-green + yellow, warm golden yellow; v2 = powder blue, sage, lavender, aqua, butter-cream, lilac-mauve, periwinkle + yellow, jade-green + yellow.
Overlay IoU vs live:
    v0 t1 IoU 97.4% w/h live 0.358 new 0.363
    v0 t2 IoU 97.6% w/h live 0.389 new 0.390
    v0 t3 IoU 96.7% w/h live 0.321 new 0.332
    v0 t4 IoU 98.7% w/h live 0.371 new 0.374
    v0 t5 IoU 96.5% w/h live 0.352 new 0.358
    v0 t6 IoU 98.1% w/h live 0.393 new 0.398
    v0 t7 IoU 97.4% w/h live 0.377 new 0.382
    v0 t8 IoU 97.2% w/h live 0.356 new 0.364
    v1 t1 IoU 97.9% w/h live 0.358 new 0.363
    v1 t2 IoU 98.3% w/h live 0.389 new 0.389
    v1 t3 IoU 97.8% w/h live 0.321 new 0.330
    v1 t4 IoU 97.5% w/h live 0.371 new 0.377
    v1 t5 IoU 96.8% w/h live 0.352 new 0.356
    v1 t6 IoU 96.3% w/h live 0.393 new 0.402
    v1 t7 IoU 96.4% w/h live 0.377 new 0.382
    v1 t8 IoU 94.7% w/h live 0.356 new 0.373
    v2 t1 IoU 96.9% w/h live 0.358 new 0.368
    v2 t2 IoU 97.5% w/h live 0.389 new 0.390
    v2 t3 IoU 96.3% w/h live 0.321 new 0.341
    v2 t4 IoU 97.4% w/h live 0.371 new 0.377
    v2 t5 IoU 98.1% w/h live 0.352 new 0.354
    v2 t6 IoU 97.1% w/h live 0.393 new 0.401
    v2 t7 IoU 94.1% w/h live 0.377 new 0.388
    v2 t8 IoU 92.8% w/h live 0.356 new 0.378
All >= 95 % except v1 t8 94.7 %, v2 t7 94.1 %, v2 t8 92.8 % (the t7/t8 versions that finally got the forehead dot / mole removed also got the phoenix-enlarged sleeve spread; the earlier variants with IoU >= 95 still carried the dot, so the clean ones were kept).
Retries: v1 t3, v1 t7, v1 t8, v2 t7, v2 t8 (IoU < 95 → silhouette clause, all improved); t7 + t8 x 3 versions twice more (mark removal).
Credits: 24 + 5 + 6 + 6 = 41 gens x 135 = 5535 cr.
Files (md5-verified) https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/c01/b10/ — c01_a18_tN_v0|v1|v2.png (24) + c01_a18_b10_sheet.jpg (rows v0/v1/v2, columns t1–t8). Nothing live.
~100% xong c01 B10 / ~0% chơi được.

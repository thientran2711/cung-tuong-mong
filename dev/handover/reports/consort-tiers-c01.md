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

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

## B8 (replaces B7; sample only, c01)
PRIORITY #1 CHECK: B8 order from ROOT-18 (recolour-only EDIT of the live figure); FIGURE_GATE C3 new text read; no other person, no Nữ đế.
Method: gpt-2-6 edit, references = [live figure only], prompt = "Edit image 1. Recolour ONLY the robe fabric to <colour> ...". Canvas 9:16 (1520x2688; 9:21 unsupported, snapped). transparentBackground.
CDN: img/_review/consort-tiers/c01/b8/ — c01_a18_t1..t8.png, c01_a18_row8.jpg (uniform scale, skull top on upper red line, feet on lower), c01_a18_live_vs_new.jpg (md5-verified, nothing live).
| rank | colour | alpha bbox w/h live -> new (diff) | gens |
|---|---|---|---|
| t1 | pale celadon | 0.358 -> 0.370 (+3.2%) | 3 (all +3.2..+3.6%: FAIL ±1.5%, best kept; not stretched) |
| t2 | soft lilac | 0.389 -> 0.386 (-0.7%) | 3 |
| t3 | pale apricot | 0.320 -> 0.324 (+1.3%) | 3 |
| t4 | misty sky blue | 0.370 -> 0.374 (+1.0%) | 1 |
| t5 | dusty jade | 0.352 -> 0.353 (+0.2%) | 1 |
| t6 | dusty rose | 0.392 -> 0.395 (+0.7%) | 1 |
| t7 | slate blue + pale imperial yellow inner/borders/sash | 0.377 -> 0.379 (+0.6%) | 3 |
| t8 | soft golden yellow + muted coral/jade | 0.356 -> 0.360 (+1.3%) | 3 |
Looked at all: pose/turn, cut, headdress, held item, face identical to live (t2 keeps the live teacup as ordered "same held item"). Credits: 18 gens x 135 = 2430 (plus 2430 wasted on the cancelled c24 queue, never downloaded).

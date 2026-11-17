# fig-style-audit (art audit worker, 17/11, no generation, no live uploads)

PRIORITY #1 CHECK: brief fig-style-audit (OD 0 | ledger 0 | claims 1 event-art-style = event pictures only | main 0 | review/* 0). Reused: CDN img/_index.json, dev/site/cdn_sync.py (review path only).

REFERENCE: https://ctm-img.victoria-tntt.workers.dev/img/hd/fig-maid-m09-a18.webp

## Method
- Index: img/_index.json (32,774 objects). Figure keys: 3,841 in img/hd/ + 420 in img/tn/ (tn = consort/maid a18 thumbnails only; no tn for the DRIFT families). hd2 (14) is player/emperor duplicates.
- STYLE: for every family x age a sheet with the reference + 3-4 different persons at equal height on grey (full figure + face crop) was LOOKED at; 77 family/age sheets + 3 older-age contact sheets + 9 non-court sheets (eunuch, mama, man, kid f/p, official, emperor, player, misc). 36 cells in the long tail were viewed on a compact 3-person contact sheet (fabric/sheen only, no face detail).
- CLOSED EYES: all 3,841 hd figures scanned with MediaPipe FaceLandmarker blink score (both eyes >= 0.5 = closed; threshold validated on c14-t4-a18, c01-t4-a26). All 48 flagged figures were LOOKED at face-crop sheets: 48/48 really closed. 8 more with lids lowered (0.25-0.5 one/both eyes: gaze down, nearly closed) listed as BORDERLINE for the owner.

## Verdict summary

| Group | Verdict | Keys (hd) |
|---|---|---|
| maid ty1 / ty2 / ty3 (all ages) | DRIFT (sheer layered night look) | 206 + 182 + 182 = 570 |
| player look1-look4 | DRIFT partial (sheer overlays) | 35 |
| everything else (consort t1-t8, tm0-4, tcold, kc, ngheo, ty1-8; maid base, t1-t8, tm, cold, kc, ngheo, ty4-8; mama, eunuch, men, officials, kids, emperor, physician/steward/tutor/fallen) | MATCH | 3,236 |
| closed eyes (separate column) | REDRAW | 48 (15 inside maid ty1-3 DRIFT, 33 consort tiers t1-t8/tcold) |

**Total keys to redraw = 605 (style DRIFT) + 33 (closed eyes, consort, not already DRIFT) = 638.** Borderline lowered-eye extras: up to 8 (not counted).
**Cost at ~85 cr/gen: 638 x 85 = 54,230 cr; with 3 cr cutout = 56,144 cr.**

Note: the owner example "C01 manga/anime line" was NOT found in the live hd of consort c01 (t1-t8 a18..a51 all match); c01 is one of the closed-eye cases only at t2-a51 and t4-a26. The manga-line fault may live on a non-hd key (img/_keep, img/_review) or on an event picture (claim event-art-style).

## Table (family | age | hd keys | tn keys | verdict | reason | closed-eye keys | borderline | example)

| family | age | hd | tn | verdict | reason | closed | lowered | example key |
|---|---|---|---|---|---|---|---|---|
| consort-kc | a18 | 29 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-consort-*-kc-a18 |
| consort-kc | a26 | 2 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-consort-*-kc-a26 |
| consort-kc | a36 | 2 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 0 | 0 | fig-consort-*-kc-a36 |
| consort-kc | a51 | 2 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 0 | 0 | fig-consort-*-kc-a51 |
| consort-ngheo | a18 | 29 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-consort-*-ngheo-a18 |
| consort-t1 | a18 | 32 | 32 | MATCH | matte textured silk, painterly, light line | 1 | 0 | fig-consort-*-t1-a18 |
| consort-t1 | a26 | 32 | 0 | MATCH | matte textured silk, painterly, light line | 1 | 2 | fig-consort-*-t1-a26 |
| consort-t1 | a36 | 32 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 2 | 0 | fig-consort-*-t1-a36 |
| consort-t1 | a51 | 32 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 2 | 0 | fig-consort-*-t1-a51 |
| consort-t2 | a18 | 32 | 32 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-consort-*-t2-a18 |
| consort-t2 | a26 | 32 | 0 | MATCH | matte textured silk, painterly, light line | 3 | 2 | fig-consort-*-t2-a26 |
| consort-t2 | a36 | 32 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 2 | 0 | fig-consort-*-t2-a36 |
| consort-t2 | a51 | 32 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 3 | 0 | fig-consort-*-t2-a51 |
| consort-t3 | a18 | 32 | 32 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-consort-*-t3-a18 |
| consort-t3 | a26 | 32 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-consort-*-t3-a26 |
| consort-t3 | a36 | 31 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 3 | 0 | fig-consort-*-t3-a36 |
| consort-t3 | a51 | 32 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 2 | 2 | fig-consort-*-t3-a51 |
| consort-t4 | a18 | 32 | 32 | MATCH | matte textured silk, painterly, light line | 2 | 0 | fig-consort-*-t4-a18 |
| consort-t4 | a26 | 32 | 0 | MATCH | matte textured silk, painterly, light line | 1 | 0 | fig-consort-*-t4-a26 |
| consort-t4 | a36 | 32 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 0 | 4 | fig-consort-*-t4-a36 |
| consort-t4 | a51 | 32 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 2 | 0 | fig-consort-*-t4-a51 |
| consort-t5 | a18 | 32 | 0 | MATCH | matte textured silk, painterly, light line | 1 | 0 | fig-consort-*-t5-a18 |
| consort-t5 | a26 | 32 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-consort-*-t5-a26 |
| consort-t5 | a36 | 32 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 0 | 0 | fig-consort-*-t5-a36 |
| consort-t5 | a51 | 32 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 0 | 0 | fig-consort-*-t5-a51 |
| consort-t6 | a18 | 32 | 0 | MATCH | matte textured silk, painterly, light line | 1 | 0 | fig-consort-*-t6-a18 |
| consort-t6 | a26 | 32 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 2 | fig-consort-*-t6-a26 |
| consort-t6 | a36 | 32 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 3 | 0 | fig-consort-*-t6-a36 |
| consort-t6 | a51 | 31 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 1 | 1 | fig-consort-*-t6-a51 |
| consort-t7 | a18 | 32 | 0 | MATCH | matte textured silk, painterly, light line | 1 | 0 | fig-consort-*-t7-a18 |
| consort-t7 | a26 | 31 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-consort-*-t7-a26 |
| consort-t7 | a36 | 32 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 0 | 0 | fig-consort-*-t7-a36 |
| consort-t7 | a51 | 32 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 0 | 0 | fig-consort-*-t7-a51 |
| consort-t8 | a18 | 32 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-consort-*-t8-a18 |
| consort-t8 | a26 | 32 | 0 | MATCH | matte textured silk, painterly, light line | 1 | 0 | fig-consort-*-t8-a26 |
| consort-t8 | a36 | 30 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 0 | 0 | fig-consort-*-t8-a36 |
| consort-t8 | a51 | 30 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 0 | 0 | fig-consort-*-t8-a51 |
| consort-tcold | a18 | 32 | 0 | MATCH | matte textured silk, painterly, light line | 1 | 0 | fig-consort-*-tcold-a18 |
| consort-tcold | a26 | 32 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-consort-*-tcold-a26 |
| consort-tcold | a36 | 32 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 0 | 0 | fig-consort-*-tcold-a36 |
| consort-tcold | a51 | 32 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 0 | 0 | fig-consort-*-tcold-a51 |
| consort-tm0 | a18 | 32 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-consort-*-tm0-a18 |
| consort-tm0 | a26 | 32 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-consort-*-tm0-a26 |
| consort-tm0 | a36 | 32 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 0 | 0 | fig-consort-*-tm0-a36 |
| consort-tm0 | a51 | 32 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 0 | 0 | fig-consort-*-tm0-a51 |
| consort-tm1 | a18 | 32 | 32 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-consort-*-tm1-a18 |
| consort-tm1 | a26 | 32 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-consort-*-tm1-a26 |
| consort-tm1 | a36 | 32 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 0 | 0 | fig-consort-*-tm1-a36 |
| consort-tm1 | a51 | 31 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 0 | 0 | fig-consort-*-tm1-a51 |
| consort-tm2 | a18 | 32 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-consort-*-tm2-a18 |
| consort-tm2 | a26 | 32 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-consort-*-tm2-a26 |
| consort-tm2 | a36 | 32 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 0 | 0 | fig-consort-*-tm2-a36 |
| consort-tm2 | a51 | 31 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 0 | 0 | fig-consort-*-tm2-a51 |
| consort-tm3 | a18 | 32 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-consort-*-tm3-a18 |
| consort-tm3 | a26 | 32 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-consort-*-tm3-a26 |
| consort-tm3 | a36 | 32 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 0 | 0 | fig-consort-*-tm3-a36 |
| consort-tm3 | a51 | 31 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 0 | 0 | fig-consort-*-tm3-a51 |
| consort-tm4 | a18 | 32 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-consort-*-tm4-a18 |
| consort-tm4 | a26 | 32 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-consort-*-tm4-a26 |
| consort-tm4 | a36 | 32 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 0 | 0 | fig-consort-*-tm4-a36 |
| consort-tm4 | a51 | 32 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault | 0 | 0 | fig-consort-*-tm4-a51 |
| consort-ty1 | a18 | 32 | 0 | MATCH | matte textured silk, painterly, light line; plain smooth robe, low texture but same rendering | 0 | 0 | fig-consort-*-ty1-a18 |
| consort-ty2 | a18 | 32 | 0 | MATCH | matte textured silk, painterly, light line; plain smooth robe, low texture but same rendering | 0 | 0 | fig-consort-*-ty2-a18 |
| consort-ty3 | a18 | 32 | 0 | MATCH | matte textured silk, painterly, light line; plain smooth robe, low texture but same rendering | 0 | 0 | fig-consort-*-ty3-a18 |
| consort-ty4 | a18 | 32 | 0 | MATCH | matte textured silk, painterly, light line; plain smooth robe, low texture but same rendering | 0 | 0 | fig-consort-*-ty4-a18 |
| consort-ty4 | a26 | 32 | 0 | MATCH | matte textured silk, painterly, light line; plain smooth robe, low texture but same rendering | 0 | 0 | fig-consort-*-ty4-a26 |
| consort-ty4 | a36 | 20 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault; plain smooth robe, low texture but same rendering | 0 | 0 | fig-consort-*-ty4-a36 |
| consort-ty5 | a18 | 32 | 0 | MATCH | matte textured silk, painterly, light line; plain smooth robe, low texture but same rendering | 0 | 0 | fig-consort-*-ty5-a18 |
| consort-ty5 | a26 | 32 | 0 | MATCH | matte textured silk, painterly, light line; plain smooth robe, low texture but same rendering | 0 | 0 | fig-consort-*-ty5-a26 |
| consort-ty5 | a36 | 19 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault; plain smooth robe, low texture but same rendering | 0 | 0 | fig-consort-*-ty5-a36 |
| consort-ty6 | a18 | 32 | 0 | MATCH | matte textured silk, painterly, light line; plain smooth robe, low texture but same rendering | 0 | 0 | fig-consort-*-ty6-a18 |
| consort-ty6 | a26 | 32 | 0 | MATCH | matte textured silk, painterly, light line; plain smooth robe, low texture but same rendering | 0 | 0 | fig-consort-*-ty6-a26 |
| consort-ty6 | a36 | 19 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault; plain smooth robe, low texture but same rendering | 0 | 0 | fig-consort-*-ty6-a36 |
| consort-ty7 | a18 | 32 | 0 | MATCH | matte textured silk, painterly, light line; plain smooth robe, low texture but same rendering | 0 | 0 | fig-consort-*-ty7-a18 |
| consort-ty7 | a26 | 32 | 0 | MATCH | matte textured silk, painterly, light line; plain smooth robe, low texture but same rendering | 0 | 0 | fig-consort-*-ty7-a26 |
| consort-ty7 | a36 | 19 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault; plain smooth robe, low texture but same rendering | 0 | 0 | fig-consort-*-ty7-a36 |
| consort-ty8 | a18 | 32 | 0 | MATCH | matte textured silk, painterly, light line; plain smooth robe, low texture but same rendering | 0 | 0 | fig-consort-*-ty8-a18 |
| consort-ty8 | a26 | 32 | 0 | MATCH | matte textured silk, painterly, light line; plain smooth robe, low texture but same rendering | 0 | 0 | fig-consort-*-ty8-a26 |
| consort-ty8 | a36 | 19 | 0 | MATCH | matte textured silk, painterly, light line; a26+ crown/fringe edges slightly soft (cutout), faces more photoreal, not a style fault; plain smooth robe, low texture but same rendering | 0 | 0 | fig-consort-*-ty8-a36 |
| emperor-- | a18 | 2 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-emperor-* |
| emperor-- | a26 | 2 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-emperor-* |
| emperor-- | a36 | 2 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-emperor-* |
| emperor-- | a51 | 2 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-emperor-* |
| eunuch-- | a18 | 120 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-eunuch-* |
| eunuch-- | a26 | 30 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-eunuch-* |
| eunuch-- | a36 | 30 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-eunuch-* |
| eunuch-- | a51 | 30 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-eunuch-* |
| fallen-- | a18 | 1 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-fallen-* |
| kid-- | a14 | 48 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-kid-* |
| maid-base | a18 | 25 | 52 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-base-a18 |
| maid-base | a26 | 2 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-base-a26 |
| maid-base | a36 | 2 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-base-a36 |
| maid-base | a51 | 2 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-base-a51 |
| maid-cold | a18 | 24 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-cold-a18 |
| maid-kc | a18 | 24 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-kc-a18 |
| maid-ngheo | a18 | 24 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-ngheo-a18 |
| maid-t1 | a18 | 24 | 52 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-t1-a18 |
| maid-t1 | a36 | 6 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-t1-a36 |
| maid-t1 | a51 | 6 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-t1-a51 |
| maid-t2 | a18 | 23 | 52 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-t2-a18 |
| maid-t2 | a36 | 7 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-t2-a36 |
| maid-t2 | a51 | 6 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-t2-a51 |
| maid-t3 | a18 | 23 | 52 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-t3-a18 |
| maid-t3 | a36 | 7 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-t3-a36 |
| maid-t3 | a51 | 7 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-t3-a51 |
| maid-t4 | a18 | 22 | 52 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-t4-a18 |
| maid-t4 | a36 | 7 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-t4-a36 |
| maid-t4 | a51 | 6 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-t4-a51 |
| maid-t5 | a18 | 22 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-t5-a18 |
| maid-t5 | a36 | 6 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-t5-a36 |
| maid-t5 | a51 | 8 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-t5-a51 |
| maid-t6 | a18 | 22 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-t6-a18 |
| maid-t7 | a18 | 22 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-t7-a18 |
| maid-t8 | a18 | 22 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-t8-a18 |
| maid-tm0 | a18 | 22 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-tm0-a18 |
| maid-tm2 | a18 | 23 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-tm2-a18 |
| maid-tm3 | a18 | 23 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-tm3-a18 |
| maid-tm4 | a18 | 23 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-tm4-a18 |
| maid-ty1 | a18 | 52 | 0 | DRIFT | sheer layered organza/chiffon, translucent ruffles, saturated glossy sheen (the "sheer night look"), not matte soft silk | 0 | 0 | fig-maid-m52-ty1-a18 |
| maid-ty1 | a26 | 52 | 0 | DRIFT | sheer layered organza/chiffon, translucent ruffles, saturated glossy sheen (the "sheer night look"), not matte soft silk | 0 | 0 | fig-maid-m52-ty1-a18 |
| maid-ty1 | a36 | 52 | 0 | DRIFT | sheer layered organza/chiffon, translucent ruffles, saturated glossy sheen (the "sheer night look"), not matte soft silk | 0 | 1 | fig-maid-m52-ty1-a18 |
| maid-ty1 | a51 | 50 | 0 | DRIFT | sheer layered organza/chiffon, translucent ruffles, saturated glossy sheen (the "sheer night look"), not matte soft silk | 5 | 0 | fig-maid-m52-ty1-a18 |
| maid-ty2 | a18 | 52 | 0 | DRIFT | sheer layered organza/chiffon, translucent ruffles, saturated glossy sheen (the "sheer night look"), not matte soft silk | 0 | 0 | fig-maid-m35-ty2-a36 |
| maid-ty2 | a26 | 52 | 0 | DRIFT | sheer layered organza/chiffon, translucent ruffles, saturated glossy sheen (the "sheer night look"), not matte soft silk | 0 | 0 | fig-maid-m35-ty2-a36 |
| maid-ty2 | a36 | 52 | 0 | DRIFT | sheer layered organza/chiffon, translucent ruffles, saturated glossy sheen (the "sheer night look"), not matte soft silk | 0 | 0 | fig-maid-m35-ty2-a36 |
| maid-ty2 | a51 | 26 | 0 | DRIFT | sheer layered organza/chiffon, translucent ruffles, saturated glossy sheen (the "sheer night look"), not matte soft silk | 5 | 0 | fig-maid-m35-ty2-a36 |
| maid-ty3 | a18 | 52 | 0 | DRIFT | sheer layered organza/chiffon, translucent ruffles, saturated glossy sheen (the "sheer night look"), not matte soft silk | 0 | 0 | fig-maid-m52-ty3-a18 |
| maid-ty3 | a26 | 52 | 0 | DRIFT | sheer layered organza/chiffon, translucent ruffles, saturated glossy sheen (the "sheer night look"), not matte soft silk | 0 | 0 | fig-maid-m52-ty3-a18 |
| maid-ty3 | a36 | 52 | 0 | DRIFT | sheer layered organza/chiffon, translucent ruffles, saturated glossy sheen (the "sheer night look"), not matte soft silk | 0 | 0 | fig-maid-m52-ty3-a18 |
| maid-ty3 | a51 | 26 | 0 | DRIFT | sheer layered organza/chiffon, translucent ruffles, saturated glossy sheen (the "sheer night look"), not matte soft silk | 5 | 0 | fig-maid-m52-ty3-a18 |
| maid-ty4 | a18 | 24 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-ty4-a18 |
| maid-ty5 | a18 | 24 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-ty5-a18 |
| maid-ty6 | a18 | 24 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-ty6-a18 |
| maid-ty7 | a18 | 24 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-ty7-a18 |
| maid-ty8 | a18 | 23 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-maid-*-ty8-a18 |
| mama-- | a18 | 8 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-mama-* |
| man-- | a18 | 33 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-man-* |
| official-- | a18 | 6 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-official-* |
| physician-- | a18 | 3 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-physician-* |
| player-- | a18 | 24 | 0 | DRIFT (partial) | look1-look4 outfits are layered sheer overlays (look1-t1/t6, look2-t3, look4-t1 seen); look3-t1-a51 and look4-t8 are brocade, OK | 0 | 0 | fig-player-* |
| player-- | a26 | 4 | 0 | DRIFT (partial) | look1-look4 outfits are layered sheer overlays (look1-t1/t6, look2-t3, look4-t1 seen); look3-t1-a51 and look4-t8 are brocade, OK | 0 | 0 | fig-player-* |
| player-- | a36 | 4 | 0 | DRIFT (partial) | look1-look4 outfits are layered sheer overlays (look1-t1/t6, look2-t3, look4-t1 seen); look3-t1-a51 and look4-t8 are brocade, OK | 0 | 0 | fig-player-* |
| player-- | a51 | 3 | 0 | DRIFT (partial) | look1-look4 outfits are layered sheer overlays (look1-t1/t6, look2-t3, look4-t1 seen); look3-t1-a51 and look4-t8 are brocade, OK | 0 | 0 | fig-player-* |
| steward-- | a18 | 1 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-steward-* |
| tutor-- | a18 | 1 | 0 | MATCH | matte textured silk, painterly, light line | 0 | 0 | fig-tutor-* |

## Closed-eye key list (48, all verified by eye)

fig-consort-c01-t2-a51, fig-consort-c01-t4-a26, fig-consort-c02-t6-a36, fig-consort-c03-t1-a36, fig-consort-c03-t3-a51, fig-consort-c04-t6-a51, fig-consort-c05-t2-a36, fig-consort-c07-t3-a36, fig-consort-c09-t2-a26, fig-consort-c10-t1-a51, fig-consort-c10-t3-a51, fig-consort-c10-t6-a36, fig-consort-c12-t2-a51, fig-consort-c12-t6-a36, fig-consort-c13-t1-a18, fig-consort-c13-t4-a18, fig-consort-c13-t7-a18, fig-consort-c13-t8-a26, fig-consort-c14-t1-a36, fig-consort-c14-t4-a18, fig-consort-c14-t6-a18, fig-consort-c14-tcold-a18, fig-consort-c15-t5-a18, fig-consort-c16-t2-a36, fig-consort-c20-t2-a26, fig-consort-c20-t4-a51, fig-consort-c21-t1-a51, fig-consort-c23-t2-a51, fig-consort-c25-t3-a36, fig-consort-c26-t4-a51, fig-consort-c27-t2-a26, fig-consort-c29-t1-a26, fig-consort-c29-t3-a36, fig-maid-m28-ty1-a51, fig-maid-m28-ty2-a51, fig-maid-m28-ty3-a51, fig-maid-m33-ty1-a51, fig-maid-m33-ty2-a51, fig-maid-m33-ty3-a51, fig-maid-m38-ty1-a51, fig-maid-m38-ty2-a51, fig-maid-m38-ty3-a51, fig-maid-m43-ty1-a51, fig-maid-m43-ty2-a51, fig-maid-m43-ty3-a51, fig-maid-m48-ty1-a51, fig-maid-m48-ty2-a51, fig-maid-m48-ty3-a51

## Borderline lowered-eye (8, owner decides)

fig-consort-c06-t6-a26, fig-consort-c10-t6-a51, fig-consort-c14-t3-a51, fig-consort-c18-t1-a26, fig-consort-c22-t4-a36, fig-consort-c31-t2-a26, fig-consort-c31-t4-a36, fig-maid-m32-ty1-a36

## Review images (live CDN, review path only; wipe with `cdn_sync.py --wipe-review fig-style-audit` after the verdict)
Base https://ctm-img.victoria-tntt.workers.dev/img/_review/fig-style-audit/
- https://ctm-img.victoria-tntt.workers.dev/img/_review/fig-style-audit/REF-fig-maid-m09-a18.webp
- https://ctm-img.victoria-tntt.workers.dev/img/_review/fig-style-audit/DRIFT-maid-ty1-m52-a18.webp
- https://ctm-img.victoria-tntt.workers.dev/img/_review/fig-style-audit/DRIFT-maid-ty2-m35-a36.webp
- https://ctm-img.victoria-tntt.workers.dev/img/_review/fig-style-audit/DRIFT-maid-ty3-m52-a18.webp
- https://ctm-img.victoria-tntt.workers.dev/img/_review/fig-style-audit/DRIFT-player-look1-t6-a18.webp
- https://ctm-img.victoria-tntt.workers.dev/img/_review/fig-style-audit/CLOSEDEYES-consort-c14-t4-a18.webp

## Notes
- Maid ty1-3 reference look: ruffled translucent layers over the body, strong saturation (orange/red/yellow), almost glossy organza. The reference m09 is opaque matte silk with flat embroidery. Redraw prompt must say opaque matte silk, no sheer overflow layers.
- Cheapest first: 33 closed-eye consorts (a18..a51) and the 15 closed maid-ty a51 figures; then maid ty1-3 = 570.
- Start context ~15% (estimate); no rollover needed. ~100% audit done.

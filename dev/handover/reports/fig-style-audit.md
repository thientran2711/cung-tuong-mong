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


---
## ADDENDUM 1 (ROOT-10 messages, same day): face / pins / item columns

### Face column (owner: "cai mat van chua giong ... van cam giac 2D")
LOOKED at 12 face crops next to the ref (consort t1 a18, t4 a18, a36; maid kc, ty1; mama; kid; eunuch; man; official; emperor) + every sheet's face row above.
- Consort/maid/mama/kid/men (a18..a26): soft near-3D, light contour, painterly shading = MATCH the m09 ref. Closest to "2D": consort-c01-t1-a18 (slightly crisp lash/lip line, mild).
- Consort/maid a36/a51: faces are softer/blurrier (looks upscaled, flat-ish skin, hair edge ragged from the cutout) = mild DRIFT, not a line problem; example fig-consort-c32-t1-a36.
- Emperor a26/a36/a51 (6 keys) + men faces generally: flatter matte skin, no soft blush, mustache drawn flat = DRIFT (face); example fig-emperor-a26-1.
- No heavy dark contour / cel shading found in any hd family. If the owner still sees "2D", the likely source is the big-eye, symmetric, identical face template shared by every figure, not the rendering.

### Pins column (owner: t1 and t2 hairpins the same) - sampled ALL 32 consorts x t1..t8 a18 (256 crops, pins_0..3 sheets)
- t1 vs t2: same look (one flower + a few pins, no step) in 32/32 consorts. FAIL (no rank step).
- t2 vs t3: nearly same in ~24/32 (t3 adds slightly more tassels only).
- t3 vs t4: step visible (crown/comb appears) in 30/32.
- t4 vs t5: small step (more ornament) ~ok. t5 vs t6: nearly same in ~20/32 (both flat gold crown with fringe).
- t6 vs t7: clear step in 32/32 (phoenix appears). t7 vs t8: step ok (bigger phoenix/wings) 32/32.
- Verdict: ranks t1=t2 are identical in all 32, t2~t3 and t5~t6 weak. Redraw focus: t1, t2, t3, t5/t6 headdress; not counted in the 638 total. Per-consort exact lists need a second pass (these counts are eye estimates from the 8-crop rows). Promoted maids (t1..t8 maid) not sampled yet.

### Item column (owner: "Bo cam cai chen tra di")
Method: CLIP zero-shot ("holding a teacup/teapot") over the torso crop of all 3,841 hd figures, 2nd pass with 3 hand crops on the 1,141 mid-score ones; LOOKED at the top 24 (all real teacups/teapots, 24/24), 24 mid-band and 24 low-score (0 teacups missed in the low sample), and 72 more from pass 2 (score>=0.8: all real teacup/teapot/gaiwan; 0.5-0.8: about half real, others fan/vase/lantern/tray).
- CONFIRMED-grade (score >= 0.8, eye-checked samples all real): **151 keys**. By family: {'consort-kc': 2, 'consort-t1': 6, 'consort-t2': 10, 'consort-t3': 13, 'consort-t4': 4, 'consort-t5': 17, 'consort-t6': 9, 'consort-t7': 4, 'consort-t8': 3, 'consort-tm0': 9, 'consort-tm1': 19, 'consort-tm2': 11, 'consort-tm4': 1, 'consort-ty6': 1, 'eunuch': 6, 'maid-cold': 1, 'maid-kc': 2, 'maid-ngheo': 2, 'maid-t2': 2, 'maid-t3': 1, 'maid-t6': 1, 'maid-t7': 6, 'maid-tm0': 1, 'maid-ty1': 5, 'maid-ty2': 8, 'maid-ty3': 3, 'maid-ty4': 1, 'maid-ty5': 2, 'maid-ty6': 1}.
- LIKELY (0.5-0.8, ~50% real, needs a person to filter): 165 keys.
- Also holding a tea tray/bowl (not counted): eunuch tray with gaiwan (eunuch-u25-a18, u29-a18), tcold wooden bowls (consort tcold, maid cold).
- Missed risk: figures where the cup is small/hidden may score below 0.5.

Confirmed-grade key list (151):
consort-c01-t2-a26, consort-c01-t4-a51, consort-c01-t5-a26, consort-c01-tm1-a36, consort-c02-t1-a51, consort-c02-t2-a26, consort-c02-t3-a51, consort-c02-t5-a36, consort-c02-t6-a51, consort-c02-tm1-a26, consort-c03-t3-a26, consort-c03-t5-a51, consort-c03-tm1-a36, consort-c03-tm2-a36, consort-c04-t7-a36, consort-c05-t5-a26, consort-c06-t1-a36, consort-c06-t3-a51, consort-c06-t5-a26, consort-c06-t6-a51, consort-c06-tm0-a36, consort-c07-t5-a36, consort-c07-t6-a51, consort-c07-tm2-a51, consort-c08-t2-a36, consort-c08-t5-a26, consort-c08-t6-a51, consort-c08-tm1-a51, consort-c08-tm2-a51, consort-c09-tm0-a26, consort-c09-tm0-a36, consort-c09-ty6-a18, consort-c10-t1-a26, consort-c10-t3-a26, consort-c11-t6-a51, consort-c11-tm0-a51, consort-c11-tm1-a36, consort-c11-tm2-a36, consort-c12-kc-a18, consort-c12-t3-a51, consort-c12-t6-a51, consort-c12-t7-a36, consort-c12-t7-a51, consort-c12-tm0-a18, consort-c12-tm1-a26, consort-c13-t1-a51, consort-c13-t2-a26, consort-c13-t3-a51, consort-c13-t5-a26, consort-c13-t6-a51, consort-c14-kc-a18, consort-c14-t3-a26, consort-c14-t8-a36, consort-c14-tm0-a36, consort-c14-tm1-a26, consort-c15-t2-a36, consort-c15-t4-a51, consort-c15-t5-a36, consort-c15-t6-a51, consort-c15-tm1-a18, consort-c16-t3-a51, consort-c16-tm1-a51, consort-c16-tm2-a18, consort-c16-tm2-a51, consort-c17-t2-a26, consort-c17-tm0-a18, consort-c17-tm2-a26, consort-c19-t2-a36, consort-c19-t5-a26, consort-c19-tm0-a18, consort-c20-t1-a51, consort-c20-tm4-a18, consort-c21-t3-a36, consort-c21-t5-a36, consort-c21-tm1-a18, consort-c22-t2-a51, consort-c22-t4-a51, consort-c22-tm1-a26, consort-c22-tm1-a51, consort-c23-t5-a26, consort-c23-tm1-a36, consort-c24-t1-a51, consort-c24-t5-a26, consort-c24-tm1-a51, consort-c25-t3-a26, consort-c25-tm1-a36, consort-c26-t2-a36, consort-c26-tm2-a36, consort-c27-t3-a51, consort-c27-t4-a51, consort-c27-tm2-a36, consort-c28-t3-a51, consort-c28-t7-a36, consort-c28-t8-a36, consort-c28-tm1-a18, consort-c29-t5-a26, consort-c30-t2-a36, consort-c30-t5-a26, consort-c30-t8-a36, consort-c30-tm0-a36, consort-c30-tm1-a51, consort-c30-tm2-a26, consort-c31-t5-a36, consort-c31-t6-a36, consort-c31-tm1-a36, consort-c31-tm2-a51, consort-c32-t3-a36, consort-c32-t5-a26, consort-c32-tm1-a51, eunuch-u05-r2-a18, eunuch-u10-a18, eunuch-u21-r2-a18, eunuch-u27-r2-a18, eunuch-u28-a18, eunuch-u29-a18, maid-m03-ngheo-a18, maid-m03-tm0-a18, maid-m03-ty2-a36, maid-m03-ty3-a18, maid-m07-t2-a36, maid-m07-ty4-a18, maid-m09-ngheo-a18, maid-m09-t2-a36, maid-m10-ty5-a18, maid-m11-ty3-a18, maid-m14-ty5-a18, maid-m19-ty1-a36, maid-m19-ty1-a51, maid-m19-ty3-a36, maid-m21-ty6-a18, maid-m27-t7-a18, maid-m27-ty2-a18, maid-m27-ty2-a26, maid-m27-ty2-a51, maid-m28-t7-a18, maid-m30-t7-a18, maid-m31-t7-a18, maid-m32-kc-a18, maid-m33-t7-a18, maid-m34-t7-a18, maid-m35-t6-a18, maid-m35-ty1-a26, maid-m35-ty1-a36, maid-m35-ty1-a51, maid-m35-ty2-a18, maid-m35-ty2-a26, maid-m35-ty2-a36, maid-m36-kc-a18, maid-m37-cold-a18, maid-m40-t3-a18, maid-m51-ty2-a18

Likely list (165):
consort-c01-tcold-a18, consort-c01-tm1-a26, consort-c01-tm1-a51, consort-c01-tm2-a18, consort-c02-t2-a18, consort-c02-tm0-a18, consort-c02-tm2-a36, consort-c03-tm0-a51, consort-c03-tm2-a26, consort-c03-tm4-a26, consort-c04-t2-a51, consort-c04-t4-a51, consort-c04-t5-a51, consort-c04-t6-a26, consort-c04-tm0-a26, consort-c04-tm1-a26, consort-c04-tm1-a51, consort-c05-tm2-a26, consort-c06-t7-a51, consort-c06-tm0-a51, consort-c06-tm1-a26, consort-c06-tm1-a36, consort-c06-tm2-a26, consort-c06-ty3-a18, consort-c07-kc-a18, consort-c07-t1-a36, consort-c07-t6-a26, consort-c07-tm0-a18, consort-c07-tm1-a36, consort-c08-kc-a18, consort-c08-t3-a18, consort-c08-tcold-a51, consort-c08-tm2-a36, consort-c09-t1-a36, consort-c09-t3-a18, consort-c09-tm0-a18, consort-c09-tm1-a36, consort-c09-tm2-a36, consort-c09-ty6-a26, consort-c09-ty6-a36, consort-c10-t4-a51, consort-c10-tm1-a26, consort-c10-tm2-a36, consort-c10-tm2-a51, consort-c10-tm3-a26, consort-c10-ty6-a26, consort-c11-t6-a36, consort-c11-tcold-a51, consort-c11-tm4-a26, consort-c12-t2-a26, consort-c12-t5-a51, consort-c12-tm1-a51, consort-c12-tm2-a26, consort-c13-tm2-a26, consort-c13-tm2-a36, consort-c14-t8-a26, consort-c14-tm0-a51, consort-c14-tm1-a51, consort-c15-tm1-a36, consort-c15-tm2-a51, consort-c16-t2-a51, consort-c16-t5-a51, consort-c16-tm2-a36, consort-c17-t1-a36, consort-c17-t4-a51, consort-c17-t5-a26, consort-c17-ty5-a18, consort-c17-ty5-a26, consort-c18-t1-a36, consort-c18-tm0-a18, consort-c18-tm0-a51, consort-c18-tm2-a36, consort-c18-ty5-a18, consort-c18-ty5-a26, consort-c18-ty6-a26, consort-c19-tm0-a51, consort-c19-tm1-a36, consort-c19-tm2-a36, consort-c20-t4-a26, consort-c20-t4-a36, consort-c20-t8-a36, consort-c20-tcold-a36, consort-c20-tm1-a26, consort-c20-tm1-a51, consort-c21-t1-a26, consort-c21-tm2-a26, consort-c21-tm2-a51, consort-c22-tcold-a26, consort-c22-tm0-a36, consort-c22-tm0-a51, consort-c22-tm2-a26, consort-c23-t2-a26, consort-c23-t4-a36, consort-c23-t6-a36, consort-c23-tm2-a51, consort-c24-t4-a51, consort-c24-t7-a51, consort-c25-tm0-a26, consort-c25-tm0-a36, consort-c25-tm1-a51, consort-c25-tm2-a36, consort-c25-ty3-a18, consort-c26-t3-a26, consort-c26-tm1-a26, consort-c26-ty4-a26, consort-c27-tm0-a51, consort-c27-tm1-a18, consort-c27-tm1-a36, consort-c28-t1-a36, consort-c28-t4-a26, consort-c28-t4-a36, consort-c28-tm1-a26, consort-c28-tm1-a51, consort-c28-tm2-a26, consort-c28-tm2-a51, consort-c28-ty7-a18, consort-c28-ty7-a26, consort-c29-tcold-a26, consort-c29-tm1-a18, consort-c29-tm2-a26, consort-c29-tm2-a51, consort-c30-t4-a51, consort-c30-t6-a36, consort-c30-tcold-a26, consort-c31-tcold-a18, consort-c32-t1-a26, consort-c32-t4-a51, consort-c32-tcold-a36, consort-c32-tm2-a51, eunuch-u01-r2-a18, eunuch-u04-r0-a18, eunuch-u09-a18, eunuch-u23-a18, eunuch-u24-a18, eunuch-u25-a18, eunuch-u30-a18, maid-m02-ty7-a18, maid-m04-cold-a18, maid-m05-a18, maid-m05-t2-a36, maid-m05-t6-a18, maid-m08-ngheo-a18, maid-m09-ty6-a18, maid-m10-ngheo-a18, maid-m11-ty5-a18, maid-m17-ty5-a18, maid-m19-ty2-a18, maid-m19-ty2-a36, maid-m20-ty5-a18, maid-m22-ty4-a18, maid-m27-kc-a18, maid-m27-ty2-a36, maid-m29-cold-a18, maid-m29-t3-a18, maid-m32-t7-a18, maid-m34-tm4-a18, maid-m35-t5-a18, maid-m35-ty2-a51, maid-m36-t6-a18, maid-m38-cold-a18, maid-m39-cold-a18, maid-m39-kc-a18, maid-m43-ty3-a51, maid-m51-ty3-a51, mama-k05-a18

---
## ADDENDUM 2 (correction after ROOT-10/owner feedback): face verdict was too lenient
Re-looked at c01-t4-a18, c11-t4-a18, c22-t4-a18 next to m09 at the same crop. The owner is right: consort (t-tiers, a18 at least) faces have a darker, crisper eyeliner/upper-lid line, sharper lashes and brows, slightly bigger stylised eyes and flatter shading; m09 has soft lids, no hard liner, volumetric cheek shading. Corrected face column:
- consort t1-t8, tm0-4, tcold, kc, ngheo, ty1-8 (all ages): face = DRIFT (crisp liner / stylised eyes / flatter shading), strength mild-to-moderate; a36/a51 additionally blurry.
- maid families (all tiers) and mama/kid: closer to m09 (softer lids), face = MATCH-ish; maid-m40-kc, mama-k05 look equal to the ref. Not scanned numerically; eye judgement from sheets only.
- men/eunuch/official/emperor: faces are a different (male) rendering, flatter; emperor DRIFT; others unverified against a male ref.
Since all consorts are being repainted anyway (owner-approved), the redraw prompt should say: soft lids, no dark liner, no hard brow line, soft volumetric cheek shading, like m09. Face DRIFT is judged by eye on ~16 faces, not measured.

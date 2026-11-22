# PEOPLE1 — pr13 rooms with in-game people (owner 22/11, 0 credits, no generation)
Method: reused stage_exact/exact.py + fold.json (Fold stage 968x406, feet 6.6 %) and ipad_tags.py (iPad dư đồ 1162x599, feet 11.6 %, 3-line tags). Script: dev/art/place-rank/people_pr13/make_sheet.py (one sheet per 5 rooms, Fold | iPad per row).
Sheets (CDN, not in git): https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/people-pr13/batch{1-M2300-01-05,2-M2300-06-10,3-M2299-11-M2300-11,4-M2300-12-16,5-M2300-17-22}.jpg
Observation (all 27): feet on clear wooden floor everywhere; nobody stands inside furniture (beds/daybeds sit behind the figures). Floor below the feet is open (~12 % iPad). Side furniture (dressing tables, shelves) is close to the 1st/4th figure on several rooms (e.g. 03, 05, 09, 15). Fold crop is wide (968x406), figures overlap the centre furniture heavily but not the floor.
Note: Fold stage used is fold.json (984x1016 device measurement); the brief's "755x1000" was not separately measured.
Commit: see git log.

## v2 (owner L2318: Fold is PORTRAIT 755x1000) — old batch1-5 withdrawn
Measured the LIVE game at 755x1000 DSF2 (stage_exact/live_phone755.js 'xy:401,529;130,865;495,750' = Dư đồ > Cảnh Phúc > chính điện card > Đi một mình) -> stage_exact/fold755.json: stage 747x749 (nearly SQUARE, y 163..912), room = PIXI cover, x anchor 70 %, y 50 % => a 2688x1386 room shows only x 34 %..85 % of its width (left 34 % + right 15 % lost, full height). Game shows ONE big figure at the right edge (visible h 566 = 75.6 % of stage, feet 81 px = 10.8 % above stage bottom, centre x 85 % of the stage); the rest are a '+N' chip. Side overlays (stats panel, icons) not drawn. Composite: stage_exact/fold755.py (top bar + bottom nav from a live screenshot template). Sheets: people-pr13/v2-batch{1..5}-*.jpg. Fold left | iPad right (iPad unchanged).
Anchor 70 % was measured on Cảnh Phúc only (assumed same for every room).

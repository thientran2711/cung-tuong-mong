# stage-pets — ROUND 3 (review/stage-pets, KIT 33.9 rewritten, A/B samples dropped)
Rule: [HO/WORKER_BRIEF.md:L21] one kit figure scale, never shrink; owner 16/11 18:15Z rejected r2 (people too small).

## What changed (kit first, whole group)
- jkit.js KIT_STAGE3 = {colA:56, lift:.045} (no A/B switch, no hmin); KIT.md 33.9 rewritten in place.
- j59.js: for 1–3 people on the page `STG` = no J59HMIN shrink (fits() always true); right plaque column folds to icons whenever 3 stand (.k3ico); `stagCs()` = group-photo centres (first person's left edge at free-area left, last person's right edge + pet at right edge, rest evenly between) when the 33.7 slots do not hold the art; odd index = BACK row (feet lifted 4.5 % of stage height, z 1 vs 2, chips stay on one row, z 6); chip width = min centre gap − 8 so names never overlap; pets unchanged (front strip, floor line, kit class S/M/L).
- stage-pets.js: A/B switch removed; new checks = body px not shrunk vs kit, person-on-person FACE cover, name chips cut / overlap; JSON has bodyPct, cap, stag.

## Numbers (CSS px, 16 cases per device: 1/2/3 people × S/M/L pets; all PASS, 0 page errors)
| device | stage h | body px (every person, 1/2/3 people) | body ÷ stage | free height (stage − floor band − ribbon) | back-row lift | face cover (person on person) | name chips cut / overlap |
|---|---|---|---|---|---|---|---|
| iPad 1180x820@2 | 623 | 492 / 492 / 492 | 79 % | 529 (body = 93 % of it) | 28 px (3 people and 2 wide people) | 0 % | 0 / 0 |
| Fold 755x1000@2 | 771 | 542 / 542 / 542 | 70.3 % | 662 (body = 82 %) | 35 px | 0 % | 0 / 0 |
3 people on iPad: art overlap me/middle 118 px, middle/right 149 px of the 267 px art width (≈ 44–56 %), faces still 0 % covered (heads are narrow, sleeves/hems overlap). Pet-on-person cover unchanged (face 0 %, torso ≤ 4.1 % iPad, ≤ 3.5 % Fold).
Kit-conform: 91 CONFORMS, 0 MIXED/CUSTOM, floats none (15 MISSING = dialog kinds not openable in the test state, not touched by this change). Old-save: no save field touched; -base cases run with S.pets undefined = old-save shape, no errors.

## Rule check: 85–90 % — NOT met, and why (numbers)
The kit figure scale is KIT_FIG.h = .79 of the stage (owner-approved 11/15, measured .787) and KIT_FIG.maxPx = 542 px. 1, 2 and 3 people now ALL stand at exactly the 1-person kit height (no shrink). iPad = 79 % of the stage (93 % of the space between floor band and ribbon); Fold = capped by maxPx 542 → 70.3 % of its 771 px stage (the 1-person stage is identical). To reach 85–90 % the kit constants must change for the whole game: KIT_FIG.h .79 → ≈ .86–.88 and maxPx 542 → ≈ 660–690 (Fold free height 662 would be the ceiling, iPad ceiling 529/623 = 85 %). That makes figures ≈ 9–25 % wider (3 people → overlap ≈ 60 %+). Not done: needs the owner's OK (it changes every stage, picture plate and book figure).

## Shots (FULL screen, label = device + size, in dev/handover/reports/stage-pets-r3/)
ipad-1180x820-{n1M,n2SL,n3SML,n3LLL}.jpg · fold-755x1000-{n1M,n2SL,n3SML,n3LLL}.jpg. NPC pictures are the grey placeholder silhouettes in the test env (art not loaded); pets = real cut-out / placeholder art.

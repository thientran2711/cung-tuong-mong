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

# ROUND 4 — SWIPE STAGE (owner 16/11 18:22Z; replaces "3 people on one stage"; the r3 stagger/lift/column-fold code is REMOVED)
Rule: people never shrink; a view holds what fits at the kit height; the rest by swipe; "+N" chips on BOTH sides (left = passed, right = still to come, hidden at 0); no arrow buttons; tap = pop-up, drag never opens it. KIT.md 33.9 rewritten in place; code j59.js (j59swipe / j59go / j59chips), test dev/test/stage-swipe.js (+ stage-pets.js still 16/16 pass).
## Numbers (embedded room stage, test env)
| device | body px (kit) | people per view | swipes (6 people) | chips | arrow buttons | page errors |
|---|---|---|---|---|---|---|
| iPad 1180x820 | 492 (no shrink) | 1 | 5 forward + back OK | L/R = +1/+4, +2/+3, +3/+2, +4/+1, +5/- ; hidden at 0 | 0 | 0 |
| Fold 755x1000 | 542 (no shrink) | 1 | 5 forward + back OK | same | 0 | 0 |
Swipe: drag follows the finger (--j59dx), release ≥ 56 px slides out then in (220 ms, `translate` only; instant for reduced-motion), < 56 px bounces back. rAF frame times over a swipe (headless software rendering, 2 jobs in parallel, screenshots taken mid-swipe add spikes): avg 18–22 ms, p95 22–66 ms; the swap itself (j59lay) is one layout call. Real-device perf not measurable here.
## Why only 1 person per view today — numbers
The room stage on the page keeps the right plaque column (iPad 148 px, Fold 181 px of the stage) and the fixed 33.7 slots (k people at 1/(k+1) of the free width) + the pet rule (art/2 + pet + widest/2 ≤ slot). At kit height the widest art is 267 px (man silhouette, iPad) / 294 px (Fold); woman 189 / 208. Free width iPad ≈ 434, Fold ≈ 574 → two people need 2·(art/2+pet…) > slot (iPad 145 vs 267; Fold 191 vs 294). So the spec "Fold 2 people + 2 pets, iPad 5–6" can only come true on the FULL-SCREEN backdrop (no column): Fold 755 → slot 252 ≥ woman 208 + pet only for SMALL pets (pet allowance 44 px; M/L pets need 89/69+ → 1 per view); iPad 1180 → 3 men or 4 women per view. 5–6 per view on iPad would need the pet to overlap the neighbour's empty margin or edge-to-edge packing (breaks the fixed-slot rule OD 16/11) — owner/main decision.
## NOT done / for main
- The Dư đồ courtyard-map level and the full-screen place painting are NOT on main (only palace names exist); branches review/palace-map, palace-map-port(-r1), palace-start(-r1) hold work — not touched, not built. The swipe stage is kit code on #stage (j59) and will serve that painting once it uses the same stage layer.
- Own-room order: homePeople() already lists the maid before others; a maid's pet follows the maid; eunuchs etc. come after → next swipe (not separately testable here: no eunuchs in the test state).
- Old-save: no save field touched. Dư đồ locks untouched.
## Shots (FULL screen, device + size in the file name): dev/handover/reports/stage-pets-r4/ {ipad-1180x820,fold-755x1000}-{n1-view1,n2-view1,n2-view2,n6-view1,n6-view3,n6-swipe2-drag,n6-swipe2-anim}.jpg

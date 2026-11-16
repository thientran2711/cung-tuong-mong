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

# ROUND 5 (owner rulings 16/11 18:35Z via s21/s22) — own room, fixed spots, Fold .79
- Group-photo stagger/overlap: gone (r4). People NEVER overlap: j59 now uses N fixed EQUAL COLUMNS (KIT 33.7b `kitSlotCxE/kitSlotSwE` in jkit.js): person i stands at the centre of column i of the free width, fits when art ≤ column; pets may overlap a person's legs only (pet clamped inside the free area, torso cover ≤ 8 % checked).
- Fold ratio: the maxPx 542 cap was applied on every device (`capOn=true` always) — the KIT canon says iPad-wide layouts only. Now `capOn = viewport ≥ 1000` and the cap fallback only happens when even ONE person does not fit. Fold stage 771 → body 609 px = .79 (was 542 = 70.3 %); iPad 492 = .79.
## Numbers (own room "Ngọc Thanh các", her + maid + pet, real art)
| device | people per view | body px (ratio) | overlap | chips | swipe |
|---|---|---|---|---|---|
| iPad 1180x820 | 2 (her + pet, maid) | 492 (.79) | none | right +2 (kids etc.), left after swipe | OK, back OK |
| Fold 755x1000 | 2 | 609 (.79) | none | same | OK, back OK |
Outdoor demo (garden, unknown NPCs = wide man silhouettes 267/330 px, so 1 per view there; the real full-screen place would give more): body 492 / 609, 6 people → 5 swipes, chips +1/+4 … +5/hidden, 0 arrows. stage-pets.js 16/16 pass both devices (0 page errors).
## NOT done (needs main)
Rule "Hành sự stage = ONLY her room; outdoor / other places only at the last Dư đồ level (full-screen place painting)": the Dư đồ courtyard-map level and the full-screen painting are not on main, and today other places still render on the Hành sự stage via goTo(). I did not change navigation (Dư đồ is another worker's area). The outdoor shots are the same stage layer used on a garden backdrop as a stand-in. Maid's pet: none in the test state (her pet only), the layout reserves it by the same rule.
## Shots (full screen, device + size + kind in file name): dev/handover/reports/stage-pets-r4/{ipad-1180x820,fold-755x1000}-{ROOM-view1,ROOM-swipe-drag,ROOM-view2,OUTDOOR-n6-view1,OUTDOOR-n6-swipe-drag}.jpg

# ROUND 6 HANDOVER (worker at ~30 % context, START ≈ 4 %: rollover band reached; s22 opens the successor — workers at depth 8 cannot create sessions)
TASK (s22 19:06Z, owner OD 18:22Z / 18:35Z / 19:15Z): (1) Hành sự stage shows ONLY her room; every other place (Ngự hoa viên …) is reached via Dư đồ → (courtyard level only for multi-hall places) → FULL-SCREEN place painting, people at kit figure scale, swipe, "+N" chips both sides, Fold max 2 people + 2 pets per view, iPad as many as really fit WITHOUT overlap, tap a person → that person's interaction pop-up. (2) REUSE, do not rebuild: review/palace-map 9717707e, palace-map-port e1e15a4b (+ -r1 306de247), palace-start 3ac72783 (+ -r1 67af1413), review/pl-courtyards d98df660 (+ -art 028aa7e2, -r1 8b4a2160), review/single-hall ff05f03d; s22 says the courtyard import is under review as review/pl-courtyards-r2 — build on top of it now, merge when it PASSes. Kit only (33.7b kitSlotCxE). Branch review/stage-pets, report "SẴN SÀNG KIỂM <sha>" to s22 (session_01UV1SzjhT28XQmRt2EHNffg).
BASE: review/stage-pets @ bba2bdf6 (r5, accepted by s22): j59.js = fixed equal columns (jkit.js kitSlotCxE/kitSlotSwE), swipe (j59swipe/j59go, translate var --j59dx/--j59tr on #mefig/#j59metag/#tokens/.kspet), "+N" chips both sides (j59chips, top 44 %, hidden at 0), no arrows, capOn = viewport ≥ 1000, pet clamped to G.limR. Tests: dev/test/stage-swipe.js (env PLACE=home | default garden "vuon", NPEOPLE=1,2,6, SHOTS=0, DBGPTR=1) and stage-pets.js (16 cases/device, checks face/names/body); local setup: `python3 dev/build/assemble.py`, serve dev/ on 127.0.0.1:8077 with a server that adds `; charset=utf-8` to html/js/css (script: /tmp/claude-0/srv.py — recreate), run `node dev/test/stage-swipe.js http://127.0.0.1:8077/index.html 755x1000@2 <out> <tag>`; 2 jobs in parallel ≈ 100 s. Do NOT `rm $VAR/...` (the harness blocks it); use git rm with literal paths.
WHAT IS KNOWN (do not re-derive):
- Other places today render on the Hành sept stage through goTo(k)/S.place/S.visit (jk2/j2/j42 srvGoTo) → #stage with j59 layout. The new rule: Hành sự #stage = home only (S.place==="home"/her residence); entering another place must open the full-screen place view (Dư đồ chain) instead. Find: where the Dư đồ tab calls goTo, and what review/palace-map(-port) already do (courtyard map with "N bóng" per hall, full-screen place painting, Dư đồ locks are another worker's: review/dudo-lock 2cd2eb91 — do not touch locks).
- The full-screen place view should REUSE j59lay on a full-size stage element (same kit stage layer: kit height ratio KIT_FIG.h .79, 33.7b columns, swipe + chips); there is no right plaque column on a full-screen backdrop → free width = whole screen: Fold 755 (2 per view only if art ≤ 377 incl. no overlap; M/L pets overlap legs only, clamped), iPad 1180 (≈ 3 men / 4 women of art 267/189). Unknown NPCs render as wide man silhouettes in the test env (267 / 330 px) → real art needed for realistic counts.
- Maid's pet: the test state has none; layout reserves it by the same rule (pets follow the owner's column).
- Test harness note: stage-swipe.js positions the mouse at 0.62·W of the stage; on a full-screen view recompute the box.
DoD: Hành sự = her room only (iPad 2 people, Fold 2, + pets, no overlap) — shots; Dư đồ → courtyard → place full screen (Fold 2 + pets, iPad max that fits) + mid-swipe frame + chips; tap → pop-up works; old save; kit-conform; stage-pets.js/stage-swipe.js green; KIT.md 33.9/33.7b updated (full-screen place section); report + push; message s22 "SẴN SÀNG KIỂM <sha>".

# ROUND 6 — DONE (worker s22-r6; base = review/stage-pets r5 + review/pl-courtyards-r2 9e1e99f4 merged)
Owner rules covered: OD 18:22Z (SWIPE STAGE), 18:35Z (+N both sides), 19:15Z (HÀNH SỰ STAGE = her room only), 19:25Z (courtyard only for multi-hall places), s22 19:24Z new rule (Dư đồ / courtyard / place / room carry the SAME left + right columns as her room), s22 19:23Z (courtyard back button over "Tây phối điện", pl-courtyards-r2 review).
## What changed (kit first, whole group)
- KIT 33.10 FULL-SCREEN PLACE VIEW (`dev/build/jplfs.js`, `kplAway()`; read by the kit shell jk3 `k3Phone`): anywhere that is not her residence the ONE-PAGE shell is used on every screen size: the stage page = the place painting over the whole page (iPad 1164 px wide instead of the 582 px left page), "Hành sự" tab = cards page, tap a person = that person's card page, ✕ = painting. Her residence keeps the Hành sự stage (iPad split). Every road into a place (map, person card, follow, event) lands on the painting (`goTo` → `k3ShowPlace`). Fold portrait: max 2 people per view (j59 MAXN), iPad: as many as fit (MAXN 6).
- KIT 33.11 SIDE COLUMNS EVERYWHERE (`kitSideHost()` in jk3; k3Stage + jrail use it): the same #kshR right column and #krail left rail stand on the room stage, the place painting, the Dư đồ plan and the courtyard (inside the map leather, the picture + hall rows use the space between). One width rule (k3RW from the PAGE width).
- BACK TO MAP = one left-rail button (`back`, icon ico-map, "Về Dư đồ" / "Về <cung>") on every level; replaces the j38 "‹ Dư đồ" pill (was over her name chip) and the courtyard's "‹ Dư đồ" button (was over "Tây phối điện") — whole group.
- KIT 33.9 chips: "+N" chips now stand in the TOP corners above the heads (left under the title + rail, right under the side column in its reserved zone); a new place always opens on view 1 (view index keyed by place).
- Bug fix (whole group, kit shell): the person card page on the one-page shell (#popw.j59dock grid-area "panel" does not exist there) squeezed the top bar + tabs into a 470 px column and the card into a 270 px strip — Fold room AND places. Now grid-area stage.
- KIT §0 build check: j59 `innerWidth>=1000` (r5 capOn) and my MAXN switch replaced by `kitView().pages` (media-check passes; build_site.sh ran).
## Numbers (CSS px; dev/test/place-fs.js, json in dev/handover/reports/stage-pets-r6/)
| step | Fold 755x1000 | iPad 1180x820 |
|---|---|---|
| room (Hành sự, her residence) | split n/a (one page), 2 per view, body 609 (.79), overlap 0, +2 chip under column | stage | cards, 2 per view, body 492, overlap 0, +2 under column |
| Dư đồ plan / courtyard | columns L+R on the leather, back button in left rail | same; "Tây phối điện" label free |
| place in a palace hall (courtyard → hall) | painting full page, body 609, columns, overlap 0 | 2 people, 492, overlap 0 |
| Ngự hoa viên 5–6 people (single hall, straight from Dư đồ) | 1–2 per view (art-dependent: her fan / sleeve poses ~300 px > column 273 px → 1), swipe OK, chips L/R | 3 per view, swipe OK, +3 / +3 |
| Thái y viện (single hall) | straight in, no courtyard | straight in |
| tap person → card page / ✕ | OK / back to painting | OK / back |
| Hành sự tab while away | cards page (no stage) | cards page (no stage) |
| page errors | 0 | 0 |
Swipe frames (stage-swipe.js, 6 people): Fold avg 16.6 ms p95 19 ms; iPad avg 16.9 ms p95 18.7 ms; 0 arrow buttons.
## Tests
- place-fs.js Fold + iPad @2: all steps as above, 0 page errors. Room shot = step 9 (step 1 is taken while the figures still load).
- stage-swipe.js NPEOPLE=2,6 Fold + iPad @2: OK, 0 errors.
- stage-pets.js: Fold 16/16 pass; iPad 13/16 — the 3 "n3*" cases FAIL "p1 has no pet": the painting now holds 3 people per view and the 3rd is a STRANGER (Người lạ, man silhouette in the test env), who by KIT 33.8 shows no pet; the test's expectation predates 3-per-view. Not changed.
- Old save (origin/main build, saved while she stands in Ngự hoa viên) → this build: loads, painting full page, 0 errors (Fold + iPad). No save field added.
- kit-conform 755x1000: 88 CONFORMS, 0 MIXED/CUSTOM, floats none (14 MISSING = dialog kinds not openable in the test state).
## Known / for review
- iPad after a swipe: the left "+N" chip (32 px) can touch the outer 4 px of a wide man silhouette's sleeve at shoulder height (chipOnFig 1 in one frame); faces never.
- Fold: wide poses (fan / spread sleeves ≈ 300 px) do not fit the 273 px column beside the right column → 1 per view there (rule: never shrink, never overlap). Real art with narrower poses gives 2.
- iPad room: her pose decides 1 vs 2 per view the same way (r5 rule, unchanged).
- KIT parts changed (kit keeper please review): jk3 k3Phone / k3Stage / kitSideHost / one-page #popw rule, jrail host, j59 chips + MAXN + capOn, KIT.md 33.9 (rewritten in place), 33.10 + 33.11 (new).
Shots (full screen, device + size + step in name): dev/handover/reports/stage-pets-r6/{fold-755x1000,ipad-1180x820}-{2-dudo,3-court,4a-visit-choice,4-place,7-cards,8-vuon,8a-swipe-drag,8b-swipe-anim,8c-view2,8d-pop,8-tyv,9-home}.jpg (+ Fold 5a–5d).

# stage-pets report (worker, 11/16/2026)

Branch: review/stage-pets @ fdaba9cae (base origin/main fb3677401). Pushed, not merged. SẴN SÀNG KIỂM.

## What it does
- Every person on a room / place stage (her + NPCs, max 3 people as before) shows their ONE "theo hầu" pet (`p.pets[p.petOn]`) in ONE fixed spot: on the person's right, feet on the person's floor line, in front (pet visible left edge = person visible right edge − 0.5 × pet width). Stranger (kitKnown false) = no pet. No outdoor-only rule.
- New kit part `KIT_PET` (jkit.js) registered in KIT.md §33.8 + kit page sample §33.8. Size class per species, visible pet height / woman body height H: S .18, M .26, L .34 (× growth scale Non .62 / Thiếu niên .8 / grown 1). Classes: S meomuop hoami tho cavang meo sao uyenuong cachep vet lyngu ngoctho; M cho sutu linhmieu camke cuuvi phuong; L hac thienma bachloc kylan thanhlong. Final classes = Foreman C's table: change only `KIT_PET.cls`.
- Layout: the slot rule counts the pet (art/2 + pet×0.5 + widest art/2 ≤ slot spacing); everyone scales down together as before, else one person fewer per page.
- Art: `img/pet-stage/pet-<key>.webp` is NOT on the CDN yet (404) → PLACEHOLDER = existing transparent pet picture of the pet's growth stage, tagged `data-ph="1"`. When C uploads, it switches by itself (no code change). Negative probe cached per species (1 request per species).
- Co-op: reads the friend entry's `pets/petOn` (no new packet). On main the friend entry does not carry them yet; they arrive with review/coop-pets (not merged) → friend's pet shows after that merge.
- Not covered: event-dialog stages (kitStageFig/kitEventStage) — only room/place stages (j59), as the owner asked.

## Numbers (dev/test/stage-pets.js, real alpha masks; all 16 cases PASS: face 0 %, no pet over neighbour/side column, feet on floor line)
Occlusion = % of the person's visible pixels covered by the pet. Face band = head top→22 % of body; torso = core columns, 25–75 % of body.
| size | case (her + rivals) | pet class | worst total | worst torso | face |
|---|---|---|---|---|---|
| 1180x820 | 1 person S / M / L | S,M,L | .8 / 6.7 / 8.2 % | 0 / .1 / 4.2 % | 0 |
| 1180x820 | 2 people S+L, L+L | | 3.1 / 3.6 % | 1.9 % | 0 |
| 1180x820 | 3 people (page of 2) SML / LLL / MMM | | 4.6 / 8.9 / 7.1 % | 4.7 % | 0 |
| 755x1000 | 1 person S / M / L | | .9 / 7.3 / 9.1 % | 0 / .1 / 4.6 % | 0 |
| 755x1000 | 2 people SL, LL | | 3.1 / 3.9 % | 2.0 % | 0 |
| 755x1000 | 3 people SML / LLL / MMM | | 4.4 / 9.7 / 7.6 % | 5.0 % | 0 |
Large pets only cover the lower skirt/hem (class L top reaches ~64 % down the body), never the face; worst torso overlap 5 %. First try (L .44 H, 15 % overlap) was rejected: the pet needed so much width that people fell to 1 per page.

COST (be honest): the pet takes room, so people shrink when 2+ people stand there (body height px, no pets → with pets):
- 1180x820: 2 people 258 → 198–203 (−22 %); 3 people (2 per page) 230 → 176–183 (−21 %). 1 person: unchanged 492.
- 755x1000: 2 people 340 → 260–267 (−23 %); 3 people 311 → 239–247 (−22 %). 1 person: unchanged 542.
The number per page does not drop (2 per page as before, so "3 people" is still 2 + "+1" page chip on both devices: the stage is only ~374 px free beside the right plaque column). Option if she wants bigger people: let pets overlap the neighbour (rejected for now: covers someone else's hem) or use less overlap.

## Tests
- stage-pets.js 1180x820@2 + 755x1000@2: 8 cases each (+ no-pet baselines) pass, 0 page errors.
- kit-conform 755x1000: CONFORMS 57 / MISSING 14 (main: 55 / 15) — no regression. tab-pairs 1180x820: 56 pairs, 0 mismatches, 0 errors.
- Old save: no save field added/changed (reads existing `pets/petOn`), so old saves load as before; not separately re-run. game-feel.js not run (needs its own main/new overlay servers; time).
- play-perf.js: harness hangs in this container even on main-vs-main (not a regression signal). Own measure dev/test/stage-pets-perf.js, 4x CPU throttle, median j59lay: no pets 4.1 ms, 3 pets 4.5 ms (p90 7.7 / 6.5). Static images; idle bob only under Hiệu ứng Đầy đủ, off for reduced motion.
- Bytes: placeholder = existing 256 px pet webps (≈13–33 KB each, only the pets shown). C's art size not known yet.

## Shots (@2): dev/handover/reports/stage-pets-shots/ (n1L, n2SL, n3SML, n3LLL × 1180x820 and 755x1000). Also in review/stage-pets nothing (shots dir excluded).

## Open for coordinator
1. Foreman C's final S/M/L table → update `KIT_PET.cls`; re-run stage-pets.js after real art (silhouettes differ from placeholder).
2. Merge order with review/coop-pets (friend pet).
3. Rebuilt site files (index.html, sw.js, assets.json) are in the commit; rebuild after merging other branches.

## Handover (worker context)
START_CTX ≈ 10 %; ended ≈ 35 %. Nothing pending except the items above.

## ROUND 2 HANDOVER (worker at 29 % context, START ≈ 3 %: rollover band reached; coordinator opens the successor)
s21 asked: (1) 3 people + 3 pets on the stage at once (iPad, Fold if it fits), (2) n3LLL shot lacks the place painting, (3) S pet too tiny on Fold, show px per class/device, (4) mark the Hoàng hậu silhouette as placeholder on the sheet. Findings so far:
- (1) The 2-per-page limit is NOT caused by pets: with NO pets the baseline already shows 2 people + "+N" chip (dbg: iPad free width 374 px beside the right plaque column + 46 px page-chip gutters, N=2, body H 230; Fold N=2, H 311). MAXN=3 only happens when 3 art widths fit one slot spacing (sw = free/(N+1)). 3 on one page needs sw ≈ 93 px → H ≈ 130 px (−45 % vs baseline), too small with art ≈ .54 H wide. Real levers (owner decision, KIT 33.7 area): (a) hide/narrow the right plaque column (kshR, ~140 px) on stages with 3 people, (b) drop the page-chip gutters when 3 fit, (c) let neighbours' sleeves overlap (rejected by OD:L1049 never overlapping), (d) pets overlap neighbour hems. Measure each with `dev/test/stage-pets.js` (`dbg` = N / H / slot spacing / widest art / pet extra). Recommend asking the owner: accept 2+“+N” per page (as today), or free the right column.
- (2) Cause not found yet; the test waits for pets, not for the backdrop. Fix: in stage-pets.js wait for `#scimg` natural size > 0 (and `.complete`) before the shot, and re-shoot n3LLL both sizes.
- (3) Pet visible heights = class × H: iPad 2 people H≈200 → S 36 px, M 52, L 68; Fold H≈260 → S 47, M 68, L 88; 1 person 542 → S 98, M 141, L 184. If S reads too small, raise `KIT_PET.h.S` (.18 → .24) — costs width (re-measure).
- (4) Placeholder labels: Hoàng hậu = unknown-silhouette (stranger art), pets = placeholder pictures (data-ph).
Code state: review/stage-pets fdaba9cae unchanged; worktree /home/user/wt/sp (sparse), servers on 8955/8960 can be killed.

## ROUND 2 RESULT (worker, 11/16/2026) — code review/stage-pets @ 1650774a
Fixes: (2) test now waits for the place painting (#scimg background + Pixi copy) before each shot; all r2 shots re-taken, painting present. (3) KIT_PET.h S .18→.24, M .26→.30, L stays .34 (.36 covered 8–9 % of torso, rejected). Pet visible px (S/M/L): 3 people on page, A: iPad 43/54/61, Fold 57/71/80; B: iPad 36/45/50, Fold 47/59/66. 2 people (default): iPad S 48 / L 67, Fold S 63 / L 89. 1 person: iPad 118/148/167, Fold 130/163/184.
(1) SAMPLES only (owner decides): kit part KIT 33.9 `KIT_STAGE3` (jkit.js), switch `?st3=A|B` or `KIT_STAGE3.v`; default null = today's behaviour (2 + "+N"). Both keep the slot rule, no overlap, Fold = iPad page scaled.
| | A: column folds to 56 px portrait icons, text hidden (title/tap keep the card) | B: column kept, everyone shrinks |
|---|---|---|
| iPad 1180x820, 3 people + 3 pets, woman body px | 172–179 (−22 % vs 230 = 2 people no pets) | 144–149 (−35 %) |
| Fold 755x1000 | 229–237 (−30 % vs 340) | 189–196 (−44 %) |
A costs: Ân sủng / stat rows and chip text are hidden while 3 people stand there (portraits only). B costs: smaller people, plaque column unchanged. Tests: all A/B cases pass (face 0 %, torso ≤ 6.2 %, no neighbour overlap); default variant 16 cases pass on both devices, 0 page errors. NOT run: kit-conform, old-save (no save field touched; default path unchanged except S/M sizes). Shots: stage-pets-shots/r2-*.jpg; sheets r2-sheet-AB-1180x820.jpg / r2-sheet-AB-755x1000.jpg (rows n3SML, n3LLL, n3MMM; A left, B right). Placeholders: Hoàng hậu = unknown silhouette art, pets = placeholder pictures.
Handover: START_CTX ≈ 4 %, ended ≈ 25 %. Nothing pending.

## ROUND 3 HANDOVER (worker at ~27 % context, START ≈ 4 %: rollover band reached; coordinator opens the successor)
Owner REJECTED A and B (people far too small). Rule [HO/WORKER_BRIEF.md:L21] ONE kit figure scale: full-body figures ≈85–90 % of stage picture height with 1, 2 or 3 people, never shrink to fit. Redo order from s21: keep KIT_FIG scale; make width work by (a) folding the right plaque column when 3 stand (A's `.stage.k3ico`, already in code), (b) group-photo overlap front/back stagger, names never cut, faces never covered, (c) pets in the front strip at kit class size. Report body px vs stage height (must be 85–90 %), face-cover %, per device (iPad 1180x820, Fold 755x1000); full-screen shots (not crops), each sheet labelled device + size. If impossible without breaking a rule, say why with numbers.
State: code review/stage-pets @ 1650774a (KIT_STAGE3 samples A/B in jkit.js/j59.js/jk3.js, off by default; KIT_PET.h S .24 M .30 L .34). Test harness dev/test/stage-pets.js has env STAGE3=A|B, DUMPCOL=1, J59DBG removed; shots wait for the painting. Local setup: `python3 dev/build/assemble.py` then serve dev/ with a server that adds `charset=utf-8` to html (plain python http.server gives mojibake → SyntaxError); run `node dev/test/stage-pets.js http://127.0.0.1:<port>/index.html 1180x820@2 <out> <tag>`; ~45 s per case, 4 parallel jobs OK.
Numbers measured (CSS px): iPad stage ≈565 x 610; full kit height (1 person) body 492 (≈80 % of stage; Fold 542 of ≈ 640+). Widest figure core at full H = 267 px (a man ×KIT_FIG.man; woman 181), so 3 people at kit height need ~181+267+~200 ≈ 650+ px of art vs free width 503 (column folded, A) → overlap needed ≈ 25 % of total, more with pets. Today's slot rule (j59 `fits`, jkit kitSlotSw/Cx) forbids any overlap (OD:L1049 "never overlapping" is the OLD rule; s21's new order allows front/back stagger) and scales H down (J59HMIN) — the new work = remove the shrink for N≤3, allow stagger: slot spacing sw < art width, alternate rows (centre person back, +fo offset up, scale unchanged or ×KIT_FIG at floor line), draw order by floor y; names stay one slot wide (tag row chips) — check names not cut. Pet strip: keep j59petPut spot (right of person, in front, feet on the person's floor line); with stagger put pets at the front row floor.
Risks to check first: faces covered by a front person's head/hat (use kitFigBody ht/t, test coverFace in stage-pets.js already measures pet-on-person only → add person-on-person face cover); tag chips overlap; `fo` floor band for staggered row; Fold page = iPad scaled (OD:L345/L1278).

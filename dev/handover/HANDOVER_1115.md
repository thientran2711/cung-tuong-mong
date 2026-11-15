> **PRIORITY RULE #1 (LUẬT ƯU TIÊN SỐ 1) (owner, 15/11 ~05:25Z):** BEFORE ASSIGNING ANY TASK to a worker, the coordinator MUST check whether it already exists: (1) grep OWNER_DECISIONS + HANDOVER + PROGRESS_*.md; (2) `git grep` on origin/main AND every origin/review/* branch (feature names, keywords); (3) check the list of running workers. If it exists → reuse it / ship that branch, do NOT build anew, do NOT tell the owner "not there yet" without checking. Workers must also do step (2) before writing new code. (Lesson: handmade items j83 and the 4 buổi already existed on branches while the coordinator said "not there yet".)

# Main-session handover 15/11 (10:30Z) — read this file FIRST, then TAKEOVER_PROMPT.md, HANDOVER.md, OWNER_DECISIONS.md (newest at the end), KIT.md, VANPHONG.md

Address the owner as "sếp", refer to yourself as "em", Vietnamese, short. Reports include "% done / % playable" (~95% / ~88%).
Log every owner decision immediately in dev/OWNER_DECISIONS.md on branch claude/cung-tuong-mong-handover-hj0h8w, commit+push.
Common worker brief: dev/handover/WORKER_BRIEF.md (copy of scratchpad/brief.txt — use it when assigning).

## Work in progress AT HANDOVER
1. **LIVE (10:40Z):** review/coop merged to main = 614b00ec (book UI + 2-player co-op). Play-tested Fold + iPad, 0 bugs. Fixed the sentence "chọn ở nhà làm tiểu thư" in dev/coop/HUONGDAN.md (tiểu thư route NOT merged yet).
2. **Batch 2 (right after):** origin/review/book-release @ 4bbed569 (+ fold-layout 7fbc5b08 merged in): iPad 3 people / Fold 2 (she counts),
   KIT_FIG.maxPx 542 (1366 people .61 — empty space on top, watch whether the owner complains), dialogs scroll only the choices (KIT 32.5),
   people standing on the picture in dialogs (KIT 32.6), she appears everywhere, fixed duplicate #panel on turn. Needs review then merge to main (on top of batch 1).
3. **Whole-sheet page turn** (owner just complained: content must stick to the sheet, rotate around the spine, like shots dev/owner-shots/1115-turn-ref-1/2.jpg):
   page-curl worker on review/page-curl (f40f8d45 is the old version). Must pull book-release (jbook prep() drops ids).

## Workers running in the old session (they report to the old session, CANNOT report to the new one)
New session: check branches on origin; if a worker isn't done, assign a new worker to continue from the branch + PROGRESS file.
- review/page-curl — whole-sheet page turn (see item 3).
- review/routes @978ff81f — story routes: affair, escaping the palace, leaving the palace legally, living in hiding; blood-kinship test + animation/minigame. dev/STORY_ROUTES_PLAN.md.
- review/scheme-games — 3 abstract minigames (Nghe ngóng, Truyền lời, Mặc cả) + "Thời cơ" (heavy harm, fully abstract). First attempt was stopped by the safety filter because of the poison-dose game → ABSOLUTELY no poison/harm-method detail.
- review/men @714e4e56 DONE (men by plan, no luck; 4 guards thive-1..4; cards with full gains/losses). Awaiting review. On merge: drop men's kitFigBody copy in jk4 (use the jkit one).
- review/inventory-origin @c92da910 DONE (Tư trang square cells, 6 equipment slots, Xa xỉ N numbers, allowance not shown, "Ngự", Luân hồi face-down cards). Awaiting review.
- review/palace-map @9717707e DONE (Dư đồ → Phượng Lệnh top-grade courtyard by palace head's rank → rooms; servants' quarters). Awaiting review.
- review/residence-art @2c39d1ca DONE (25 rooms × 16 pictures, jres.js). Merged into palace-map.
- Still to merge: lost-items 77679b52, emotion 527e534a (approved ancient-court female icons; attach to the book UI), difficulty 5a664492 (Khó 20% HH),
  outside 0062c04d (tiểu thư route; HH not measured; khuê các dresses not drawn), loading 6e0888dc (loading screen), appearance e67def05 (illness/poison/slap/rash; code expressions removed),
  balance dcb23148, schedules2 3e55eb5, kit-j95 33e5016, consort-art (ALREADY on main).
- trungsinhgame deep-dive bot (dev/research/TRUNGSINH_COMPARE.md "Đào sâu") — may not be finished.

## Owner questions NOT yet answered
- Should other consorts move by schedule/nature instead of random placement (placeWhere j9)?
- Add a Tai mắt cell to the top bar?
- Draw earrings / embroidered shoes (4–6 images)? Change guard 4's outfit to indigo (~40 credits)? Redraw skin of c02-t1-a18 (grey)?

## New owner rules today (all in OWNER_DECISIONS)
One shared kit, shots sent to the owner must be on the approved UI; standard figure ratio = shot dev/shots/curl2/ipad1180-tab-45-ref-ratio.jpg (.79, men ×1.07);
choice cards always with full Cần/Tốn/Được/Mất + odds; no Chinese characters, no abbreviations; no causeless luck (everything has a real cause);
don't redraw what the owner didn't ask for; don't nitpick what she didn't complain about (dress pose ok); take Phượng Lệnh art (repo thientran2711/phuong-lenh-art) instead of drawing new when it exists.

## Infrastructure
Co-op worker: https://ctm-coop.victoria-tntt.workers.dev (Cloudflare acct in dev/coop/CLOUDFLARE.md). Magnific folder ba4aecfe-efce-47e2-b53f-30d292091886, model gpt-2-6.
Machine slow (many workers) — few Playwright runs, reducedMotion. Disk ~7 GB: clean up finished worker worktrees with `git worktree remove --force --force`.

## Final reports from old-session workers (after handover)
- review/page-curl @0e8cb4ef (whole-sheet turn in 1fdc37c2): sheet rotates around the spine, front = old page / back = new page, 760 ms; the clone carries inline layout (since book-release drops ids). Left: send owner shots (dev/shots/curl2/*-tab-25/45/65), kitSheetTurn not in KIT yet, iPad 65% text overlaps while the person card isn't settled, mirrored image not checked, ask owner whether the week turn should also be whole-sheet.
- review/scheme-games @0c894835 (NOT ready for review): 4 games Nghe ngóng / Truyền lời / Mặc cả / Thời cơ in dev/build/jsgame.js, choice box Tự ra tay / Giao cho người làm, NPCs don't play, kit seal MƯU (KIT §13.2). Left: build_site, rerun dev/test/schemegames.js per browser at 686 and 1180, check Truyền lời at 390px, not yet wired to j78 overhear / j9 placeHarms / bribeServ. Notes: dev/PROGRESS_scheme-games.md.
- review/routes @a59ca018 (NOT ready for review; men + outside merged): dev/build/jroute.js, Hành sự group «Lối riêng»: Tư tình, Trốn cung (7 steps + 5 ways), Rời cung hợp lệ, Ẩn dật; blood-kinship test (demand test, tampering, retest, cleared / exposed / framed) + eye-contact minigame + water-bowl animation; NPCs same rules; Sổ luân hồi «Lối riêng x/y». Left: fix the measuring bot (normal bot also taps route cards), escape too easy (~48%, target 10–25%), taking vows too easy (~70%), re-measure affair/hiding, retake shots. Ask owner: draw the water bowl? The minigame frame seal should use «MƯU» (kit seal on scheme-games). Notes: dev/PROGRESS_routes.md.
- trungsinhgame "Đào sâu" research stopped (dev/research/TRUNGSINH_COMPARE.md, commit d06f2448): top 15 proposals (release animals to disfigure two-way, themed outfit contest, investiture with guests/lì xì, pets, wishes/lantern release…). Their servant/active-revenge system not found (maybe unlocked with an own palace). Waiting for owner to pick ideas.

## New main session takes over (01:20Z real; the "10:40Z" above is really ~01:10Z)
New session: session_01V1ZZH1F24tkuejhCvtXqV8. Messaged the old session telling page-curl/routes/scheme-games workers to push their partial work and stop.
Origin check 01:16Z: no branch pushed anything more (page-curl still f40f8d45, routes 978ff81f, scheme-games not there).
New workers assigned: kit reviewer + merge main + build site for review/book-release; page-curl (whole-sheet turn); routes (story routes); scheme-games (Nghe ngóng, Truyền lời, Mặc cả, Thời cơ — abstract).
Watch reminder: send_later 30 minutes, re-armed every turn (recurring schedule minimum 1 hour).
- 01:30Z also assigned: review/loading (sw self-update, owner stuck on old build), review/cdn-images (images to Cloudflare, img/ out of the repo), review/map-anim (slower Dư đồ unroll). Main merge order: book-release → loading → map-anim → cdn-images.
- 02:00Z review/loading @74c1544e SẴN SÀNG KIỂM (app self-updates; book-release merged) → queued for the reviewer after book-release.
- 02:10Z review/map-anim @af8f56f7e SẴN SÀNG KIỂM (Dư đồ unrolls in 1150 ms; walk ≤ remaining khắc rule) → review queue #3.
- 02:15Z review/page-curl @8aca1aae SẴN SÀNG KIỂM (whole-sheet turn, 1300 ms, swipe to change tab) → review queue #4. Fold single page: the sheet's back is only glimpsed (spine at left edge) — wait to see if the owner complains.
- 02:20Z review/khuecac @197a98b4d: 4-face trial (c05 c08 c29 m05) sent for owner approval; images on Cloudflare ctm-img.victoria-tntt.workers.dev; 80 faces awaiting approval; jkc doesn't read FIGURES-kc.json yet. ~650 credits.
- 02:05Z khuecac: 4-face poor-girl dress trial (c3536cce9) sent for owner approval; khuê các batch of 79 faces being drawn. More workers: review/ts-a, review/ts-b (15 ideas), review/m05-huadian, review/mole-audit.
- 02:30Z LIVE batch 2: main=1277c232 (book-release PASS + purple cover band fix, maxPx iPad only, Fold .79). review/loading PASS, pre-merged at origin/review/main-next 355d6d58 (fast-forward from main) — main push blocked by the permission checker, WAITING FOR OWNER permission. map-anim, page-curl not reviewed, must merge onto main-next.
- 02:45Z review/scheme-games @94f6cb6f SẴN SÀNG KIỂM → main-next merger queue after page-curl.
- 02:50Z m05 done (CDN), m02 drawn; CDN push of m02 blocked by the permission checker → waiting for owner permission to push images to Cloudflare + push main. Huadian change batch ~30k credits (account has ~1.6 million left) — keep drawing.
- 02:55Z LIVE: main=355d6d58 (loading). Owner gave standing permission: PASS builds go to main without asking.
- 03:00Z Mole audit of 5169 faces: 40 clear + 9 faint remain (review/mole-audit 463739ca4) → assigned review/mole-fix (images kept local, waiting for permission to push to Cloudflare). por-kid-p14-a4 badly cut.
- 03:25Z Assigned a 2nd reviewer for the backlog: men, inventory-origin, palace-map, lost-items, emotion, difficulty, appearance, balance, schedules2, kit-j95, outside (measure HH first).
- 03:35Z LIVE main=c30884d9e (purple cover removed + slower Dư đồ unroll + khắc walk rule). Sub-workers blocked from pushing main → coordinator pushes itself (standing owner permission). Reviewer 2 pushes results to review/main-next2.
- 04:00Z review/cdn-images @477d2094 SẴN SÀNG KIỂM (R2 bucket ctm-img + Worker ctm-img.victoria-tntt.workers.dev; 11673 images; img/ removed from the tree). Concern: live loading downloads 83 MB on first run (116 s) — reviewer must fix so the game starts fast. Branches still holding img/: push to CDN with cdn_sync --git before merging (coordinator runs it since workers are blocked). Proposed slimming git history (needs owner).
- 04:15Z LIVE main=482a310ea (review/men: scheduled men, 4 guards). Ran cdn_sync for 109 mole-removed images (review/mole-fix 50a7a15c0) + 392 huadian images.
- 04:40Z review/thinhan-art @6f027b3d3 (new Thỉnh an picture act-thinh-an-v2 on CDN, 160 credits) → merge with cdn-images.
- 05:00Z LIVE main=b165b1f71 (Tư trang square cells + 6 equipment slots, Luân hồi face-down cards; Chinese characters fixed). palace-map waits for cdn-images (images not in git). Disk ~2 GB free — clean worktrees when done.

## OWNER-REPORTED BUGS STILL OPEN (check every watch turn; strike when done)
- [x] Thỉnh an Hoàng hậu not adding — LIVE f7a9e9880
- [x] Consort card shrinking — LIVE df5a60103
- [ ] Word 'Liều' for side chances (pregnancy, reward, status cells) — review/sub-odds
- [x] Transparent turning sheet — LIVE 0783ec32a
- [ ] Chip 'Thỉnh tranh nhân vật' covers text; first download 83 MB — hau-cung-ui + cdn-images
- [x] Men/Hậu cung tab — LIVE 01c3a5b24
- [x] Errand runner — LIVE 01c3a5b24
- [ ] Vague effect words ('tiếng cứng cỏi'); doable acts not on top yet — sub-odds
- [ ] 'Có người đến' event not balanced — ts-b
- [ ] Thỉnh an picture (kneeling / hands behind) — waiting for v3 redraw (needs a new worker when disk allows)
- [ ] Oversized huadian — m05-huadian
- [ ] Portrait frame top detached; Sổ tuần straight columns, full-page figure, next pages — hau-cung-ui
- [ ] 2-column person dialog — dialog-person
- [ ] No reload mid-play; co-op update — update-flow
- [ ] Play with friend: stuck Vào phòng button, week-3 buổi desync — coop-ui
- [ ] Check every button gives the right result (assigned 14/11, lost on session change) — review/act-audit
- [x] One-source rules — LIVE c5b93e63f
- [x] Running out of khắc on arrival — LIVE 312b6b40a
- [ ] Stage: she repeats on every page, confusing page buttons, people count disagrees with Dư đồ, non-standard positions, overlapping names — stage-slots
- 06:05Z LIVE main=0783ec32a (opaque whole-sheet turn, 1300 ms, swipe to change tab; j22 'Đến chỗ hắn' follows the khắc walk rule). Concern: Luân hồi wheel may have empty card pictures — checking.
- 06:10Z hotfix/pc-size 04a204ff6 (ResizeObserver #panel) ready → reviewer 1 merges onto main 0783ec32a + builds site, then pushes.
- 06:30Z cdn_sync: 816 huadian images (all 23 faces switched to flowers/leaves + c12 t2–6 shrunk) to CDN.
- 07:00Z PAUSED (disk): review/ts-a 1103c85e6 (7 ideas done, needs 80+-life bot measurement, HH suspected high), review/ts-b d29e3952c (ideas 1,7,8,9,13 done + Có người đến balanced + dilemma audit; 2 bot TIMEOUTs to check; proposes 4 pet pictures), review/tutorial 190042887 (2/3; needs full test run + locking new tabs), review/routes (waiting). Worktrees removed; rerun when disk allows.
- 07:10Z review/khuecac 963d38bed SẴN SÀNG KIỂM: 84 faces × 2 sets (kc, ngheo) on CDN, jkc.js; sits on review/outside → only goes live when outside merges (waiting for the wearables/balance unification). ~12k credits. Younger sister dressed like her, boudoir friends in kc (worker added it — ask owner).
- 07:20Z SẴN SÀNG KIỂM: review/court-rules b702cae67 (HH/HQP live alone; Thái hậu 51–62 + a51 art; stay at place when khắc run out; tap current place; ‹ place-name button), review/dialog-person 2b321b3b0 (KIT §32.7) → reviewer 1 queue. Thái hậu a51 art (h1/h2/h3 fig+por) looks 25–30 → ask owner about redrawing.
- 07:20Z PAUSED review/routes 453203123 (15 endings reachable; needs balance measurement after merge; proposes a blood-test bowl picture).
- 07:20Z cdn_sync 368 shrunk consort huadian images (batches 1–2).
- 07:25Z LIVE main=df5a60103 (hotfix consort card shrinking: re-measure after every tab change). Luân hồi wheel: pictures just slow, will preload.
- [ ] Choices with no effect (Hỏi han sức khỏe…) — act-audit
- [ ] NPCs without proper names (Tổng quản) — stage-slots
- [ ] Kính sự phòng evening background too garish — waiting for owner to point out place/image
- 08:25Z LIVE main=5c1007a69 (Sổ tuần 'Sổ này ghi' straight columns). hau-cung-ui needs ~30–40 more minutes.
- 08:40Z review/sub-odds 96d7c2df8 SẴN SÀNG KIỂM → review queue after hau-cung-ui. Right-side chips cover heads on phone → stage-slots.
- 08:50Z LIVE main=312b6b40a court-rules (HH/HQP live alone; Thái hậu correct age; stay at place when khắc run out; tap current place; ‹ place-name button; Luân hồi preloads pictures).
- [x] Walking farther than remaining khắc — LIVE 3bf16b9b1
- [ ] Game feel: press/glow buttons, PixiJS effects, vibration, screen shake (reported since 14/11) — review/game-feel
- 09:45Z review/update-flow 41c33af33 SẴN SÀNG KIỂM; review/rules-one-source 21a57eae1 SẴN SÀNG KIỂM → reviewer 1 queue.
- 09:55Z LIVE main=01c3a5b24 (hau-cung-ui) then 3bf16b9b1 (hotfix walk-spill: walking spills into the next buổi).
- 10:00Z LIVE main=c5b93e63f rules-one-source (shown numbers = rule numbers; Thái hậu 55; Đức 33 → 28).
- [x] LIVE df3094e71: update-flow (no auto reload mid-play; chip "Để sau / Mở bản mới"; co-op reopens the same room) + Ân oán 2 columns, quý bar with 0 mark.
- [ ] Person card: spare space above the portrait; acts not split into kit tabs; doable buttons not on top everywhere; top stat bar covered (assigned stage-slots → review/person-acts).
- [~] (fixed on review/act-audit, awaiting review) "quý" and "thiện cảm" are the same number with two names → unify as "Thiện cảm"; act cards reveal the thiện cảm number while the chip is still "?" (assigned act-audit).
- [ ] Handmade items (play skill minigame → product, gift to anyone, sell) ALREADY EXIST in j83 on review/balance-unified but NOT LIVE; the coordinator once wrongly said "not there yet". Must ship balance-unified soon + Bán tab uses j83.
- [ ] 4 buổi (with midday) built in the balance chain (review/balance-unified) but NOT LIVE → review balance-unified right after the batch under review.
- [x] LIVE 1c7a3fcb2: dialog-person (person dialog: full-body figure left, text top right, choices bottom right).
- [ ] Shop panel: small figure, misaligned cells, buy box repeats the item → worker review/shop-fix.
- [ ] Character cheeks black on dark backgrounds (alpha holes) → scene-light scans + patches every person image.
- [ ] Emperor info card (and every person card) not per kit: rule box floating at right corner, big empty space, "Đã hiểu" button → merge into one kit person card (assigned stage-slots/person-acts).
- [ ] Portrait frame tassels cut off; tapping a character opens a private non-kit frame (assigned stage-slots/person-acts).
- [~] (fixed on review/act-audit b3712f0e8, awaiting review) Cung nhân: "Thiện cảm" vs "Lòng" vs "Chủ tin" mixed; "Người chạy việc: Tiểu Lâm Tử" sits on maid Lan's card; "Cung ngươi"; names with numbers (Thúy 2, Vân 2, Lan 2); label "y Trương" cut (assigned act-audit).
- [ ] Top bar broken on Fold portrait: name wraps to 2 lines, rank/age chips covered by the place button, date wraps to 3 lines (assigned review/header-fix).
- [ ] Ân oán: unmet people still show real faces (must be grey silhouette, name only) → kit-fig2 uses the shared stranger function + audits every avatar drawing spot.
- [ ] Ân oán: choosing "Ngươi" shows the Hoàng hậu panel; choosing Chu Thục Nghi (the Hoàng hậu) shows the wrong portrait; "Đã biết" cells identical, unclear who they're about (assigned kit-fig2).
- [x] LIVE cfd321e94 (08:30Z): naming — Cùng/Mời hảo hữu, Tuần lục, Sang buổi, Ám hiệu, Bên mình, tab Chí tôn, "ngươi"→"ta" in the UI.
- [ ] End-of-life card: small character figure (must nearly fill the column), home-made bordered cells not per kit, name under the feet → assigned rank-ui (use person dialog + kit rows).
- [x] LIVE 14967f899 (09:05Z): cdn-images + thinhan-art — game reads every image from Cloudflare, img/ out of git (small huadian, no moles, new Thái hậu faces, colour-graded backgrounds, alpha patch batch 1, 103 new act pictures).
- [x] LIVE d69030384 (09:45Z): sub-odds — detailed odds, "Vì sao", chip quý ta.
- [ ] (10:25Z) Pet care system (growth + virtual-pet screen) assigned to the economy worker after econ (review/pet-care) since 20 workers are already running at once.

- LIVE (11:58Z) review/hoang-tu → main 218a591fd (Hoàng tự §37, Hậu cung §36, portrait frame no longer jumps).
- LIVE (13:55Z) review/act-audit → main 6e6c2ae6d (minigames: tap only opens the game, deduct after playing + 1 result card; double-tap guard; 6 acts via odA).

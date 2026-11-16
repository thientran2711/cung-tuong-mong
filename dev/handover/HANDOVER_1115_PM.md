# HANDOVER 15/11 afternoon (main session 5 → main session 6)

Read in this order:
1. dev/OWNER_DECISIONS.md: all of it, especially the lines from 11:00Z on 15/11. Everything the owner said is logged there.
2. dev/handover/WORKER_BRIEF.md (the top of the file has 2 rules: PRIORITY RULE #1 (LUẬT ƯU TIÊN SỐ 1) and FIX-THE-WHOLE-GROUP RULE (LUẬT SỬA CẢ NHÓM)).
3. This file.
4. dev/handover/HANDOVER_1115.md (this morning's handover, section OWNER-REPORTED BUGS STILL OPEN).

## How to work with the owner (mandatory)
- Address her as "sếp", refer to yourself as "em". Answer in Vietnamese, briefly. Every report ends with "~X% xong / ~Y% chơi được" (currently ~96% / ~90%).
- The main session ONLY coordinates: assigns workers (subagents), assigns reviewers, pushes main itself when a reviewer PASSes (fast-forward), runs cdn_sync for workers.
- Every owner statement → log in dev/OWNER_DECISIONS.md IN THAT SAME turn, then commit and push branch claude/cung-tuong-mong-handover-hj0h8w.
- PRIORITY RULE #1 (LUẬT ƯU TIÊN SỐ 1): before assigning, check OWNER_DECISIONS, HANDOVER, PROGRESS_*, git grep origin/main and every origin/review/*, plus the running workers.
- FIX-THE-WHOLE-GROUP RULE (LUẬT SỬA CẢ NHÓM) (owner 14:50Z): when the owner reports one bug, fix THE WHOLE GROUP of that kind. The worker writes a script to audit everything and reports a before/after table. Restate this rule in every assignment.
- PASS means push main without asking. Pushing images to Cloudflare needs no asking. Drawing missing/wrong images needs no asking.
- Images: Magnific gpt-2-6 ONLY, folder ba4aecfe-efce-47e2-b53f-30d292091886, always pass folderReference. Images live on the CDN, not in git.
- Never two reviewers queued on one branch. Many reviewers run in parallel; whichever branch passes first goes up first.
- Worker watch reminder once every hour (owner 15/11 ~18:05Z), not 30 minutes.
- Limit of 20 concurrent subagents. When full, send further work to workers that have finished (SendMessage auto-resumes).

## CDN
- Upload: dev/site/cdn_sync.py. The script finds the repo root from its own location, so copy it into a temp dir with dev/site/ + img/ then `git init`, or run it inside the worker's worktree.
- Commands: `python3 dev/site/cdn_sync.py <files>`; `--git REF --missing-only`; `--pull`.
- Index: https://ctm-img.victoria-tntt.workers.dev/img/_index.json (files: [key, md5, bytes]).
- img/ACTS.json (act name → picture table) merged at 15:30Z: points only to pictures already on the CDN. When new pictures go up, merge more (compare with _index).
- The shared scratchpad was wiped by other sessions several times. Workers must keep temp files in their own worktree.

## Current main
`70c792d41` (shop-fix). Before that, in order: 6e6c2ae6d act-audit (minigames: tap only opens the game, deduct after playing), 218a591fd hoang-tu.

## Branches and status at handover
Every worker was ordered to push all partial work and write dev/PROGRESS_<branch>.md on its branch. Read that file before reassigning.

### Done, awaiting review (assign new reviewers)
| Branch | sha | Content |
|---|---|---|
| review/fix-float | af7c388cb+ | Decimals → integers (jint.js); "thù" → oán; log records real outcomes; choice lines with context; overnight goes to a new day (jnight.js). Worker is adding a shared template for Tuần lục person pages (chips, HIỆN NAY, lines with only a name). |
| review/opt-render | a8ec98511 | Event choices: ONLY price + Cần + verbal HINT + risk label (KIT §28.6 on). THÀNH/BẠI stamp follows only the roll. Kèm merged. |
| review/rest-balance | 0f4670e90 | Dưỡng sức (evening, ends the buổi, tonic/8 silver, +20) vs Nghỉ lát (+6, eases bad mood) |
| review/kit-close | 1bd240a54 | Tư trang 2 tabs; keeps the news card "Tin trong cung buổi này" + correct images; tap-through guard (#kxcatch); ✕ closes. R5 reviewing. |
| review/rank0-ivory | (see PROGRESS) | Đáp ứng frame A; 8 marks (6/7 swapped); portraits not zoomed, moved up, body centred (jkpor). Images already on CDN. |
| review/scene-light | 05562ad0d+ | Afternoon rain no longer sepia brown (jsl.js). Left: rosy skin for 807 portraits (APPROVED), fix j87 Thái hậu overflowing the column, re-cut edge-cut figures. |
| review/img-quality | badc75e45 | Portraits load immediately (no old upscaled 256 faces), strangers in stone frame, unmet công tử as silhouettes |
| review/game-feel | 80bfd8feb | Pixi effects, vibration, one-layout scaling frame (rot.js), kitGain for every item, handmade items with names/pictures |
| review/brand | bc1c7f324 | App logo from the loading-screen painting; Trân nữ seal top right (jseal.js) |
| review/emo-men | 8bc5b0d40 | Male mood cells (young men + middle-aged men). Images already on CDN. emoBadge conflicts with rank0-ivory (see PROGRESS). |
| review/hoangtu-tuchat | 46917d3db | Hidden tư chất, Văn/Võ/Đức grow, hiền tài from age 6; "Hoàng tự trong cung" shows what the whole palace knows; unmet children as silhouettes; her own children no longer treated as strangers |
| review/poison-gift | fe78f2c07 | Ân tình has a number bar; chân tình has real conditions shown on the card; poison in gifts; NPCs do it too; silver needle poison test |
| review/econ | d0c0c7308 | NPC scheme knob |
| review/sub-odds, review/person-acts, review/stage-slots, review/header-fix, review/drag-curl, review/scheme-games, review/weather, review/gift-chest, review/ts-b + review/pets-gop-thu | see dev/review/*-queue.md | In the old reviewers' queues |

### Returned (FAIL), being fixed
- review/ts-a: misaligned cells, chip breaks the date line on Fold, Lễ tấn phong wrong picture, bare "thiện cảm", "Phi ???", "Lui" button, test broken by the Luân hồi screen. Worker fixing on branch fix-ts-a.
- review/pets: pet shop not yet a picture grid like a shop, 17px misalignment. Worker fixing on review/pets-fix (based on pets-gop-thu). ts-b goes to main only TOGETHER with pets.

### In progress (read the branch's PROGRESS)
- review/act-pics2: own act picture per meaning, about 360/617.
  - Done: 17 person-card act pictures (on CDN), 19 per-subject Tự học pictures (up), 10 makeup reaction banners (up), 4:3 dialog banners ev-<key>.webp (16+/121).
  - Left: Tuần lục Tổng lược line images (sleep, failed dish, old Vương's body, entering the exam, ranking…); 121 dialog banners (dev/review/pic-shared.md on review/gift-ui).
  - Table: dev/figwork/acts/dlg_list.tsv. Group pictures BANNED.
- review/gift-ui:
  - Gift dialog (item image, info, recipient tabs); card for an item someone else is using shows the item image.
  - Daytime acts with the Emperor/Thái hậu (Xin yết kiến, Dâng quà, Thỉnh an). Left: Xin hầu cờ (needs Kỳ), Xin đánh đàn (needs Cầm), Mời dạo ngự hoa viên (no storm), once per day shared with the audience, NPCs too.
  - Wire ev-<key>.webp into dialogs.
  - Normalise head size for every portrait family (children, công tử, servants…), built on rank0-ivory.
- review/kit-fig2:
  - kitEventDp: SHARED template for every event with a person. Left full-body figure, name ABOVE; right top landscape banner; middle info; bottom short buttons two per row or long, depending on content. Sized to the standard person box.
  - kitActCompact: compact act card when a person figure is on the left.
  - Stranger rule in news cards + Tuần lục + Ân oán; Ân oán split into tabs.
  - Act cards without their own picture show NO image (no group pictures).
- review/tabs-kit: Tài nghệ, Mệnh truyện, Việc nhờ tabs in game UI, SPLIT INTO SUB-TABS; filter row fixed right under the stats frame, outside the scroll area (kit rule for every tab).
- review/toilette: morning Điểm trang game (choose dress + brows/powder/lipstick).
  - Pretty/gaudy face layer APPROVED (a820a52ab).
  - 10 reactions shown as EVENT FRAMES (max 2 per occasion).
  - toil-fit must be measured on the current CDN images (old version had big huadian).
- review/j83-variety: handmade works, option A (10 items × 4 grades).
  - Each item has a game matching its name (flower arranging ≠ painting), ingredients matching the dish.
  - Expensive materials must be worth it in EVERY skill and every pay-more choice (dev/review/paid-tiers.md).
  - Remove the Thôi button.
- review/event-honest → event-balance:
  - Outcomes by CONTEXT (random natures per life, mood, relations…) so nobody "memorises" the answers.
  - Skilful play must clearly win; random play gets punished/demoted/killed. Three bots: reads hints / random / always one slot.
  - Events change her mood + face + mood cell shows the CAUSES (her and NPCs).
  - Events must have real preconditions ("trả quà" when nothing was given).
  - Old Vương witness quest: add a silver-free path, price by rank, allow postponing a few buổi.
- review/trung-y: code done (jty.js). Images c01–c12 done (kept, not on CDN until reviewed). c13–c32 + m01–m19 drawn but not cut (zip expires 16/11 ~08:00Z: cut first!). m20–m52 not drawn. Read dev/PROGRESS_trung_y.md.
- review/sfx: sound by event meaning; crying that sounds like laughing → replace.
- review/rank-ui: Bảng vàng podium, end-of-life card.
- review/pets-fix: as above.

## Owner-reported bugs still open (no branch finished)
- [ ] Sổ tuần: turning the page makes the character figure and the right text column FLASH → not assigned. Give to the Tuần lục worker (fix-float or new).
- [ ] "VIỆC · <cung>" box when visiting another's palace (e.g. Chung Tú cung) → not assigned. Give to kit-fig2 (kitEventDp):
  - KEEP the palace banner + people silhouettes as now.
  - Below: LEFT the palace head's portrait (grey silhouette if unmet); RIGHT the explanation (at the palace, lower-rank guests must pay respects, needs 2 khắc has 1…).
  - Buttons at the bottom; remove "Thôi".
- [ ] Tuần lục person page: shared template for everyone, one-colour chips, HIỆN NAY in straight columns, no decimals, "Nàng oán ta" (in fix-float).
- [ ] Tuần lục line images repeat the room picture (act-pics2).
- [ ] Children's portraits zoomed differently → normalise head size (gift-ui/rank0-ivory).
- [ ] "Có người đến" box too big; Đoan ngọ uses the Triều chính picture (kit-fig2 + act-pics2).
- [ ] Thái hậu figure cut by the Tuần lục column (scene-light, fix j87).
- [ ] Pet shop (pets-fix). The cat has been redrawn.

## Decided, do NOT redo
- Event choices hide Được/Mất (KIT §28.6), with verbal hints + risk labels (14:30Z, 15:05Z, 15:10Z).
- Ân tình only with the Emperor. Others use "quý ta"/"oán ta". Chân tình is a gift condition, not a points bar.
- Huadian already shrunk on the CDN. Do NOT redo; only measure/check.
- Male mood cells: only male/female needed, but the middle-aged male set already made is used anyway.
- Rosy skin at the approved sample level; pretty/gaudy makeup approved.

## Reviewers
Each old reviewer logged its queue in dev/review/R*-queue.md. The new session creates new reviewers, each ONE branch, running in parallel. Priority order:
1. fix-float
2. opt-render
3. kit-close
4. rest-balance
5. game-feel
6. hoangtu-tuchat
7. img-quality
8. rank0-ivory + emo-men
9. brand
10. poison-gift
11. scene-light
12. the rest

## Disk
About 4.8 GB free. Clean up finished workers' worktrees: `git worktree remove --force --force` + `git worktree prune`. Don't delete worktrees of running workers or ones with images not yet on the CDN (act-pics2, trung-y/agent-a40a826e3f9c2878f, scene-light, j83-variety).

## APPENDIX: final reports from workers and reviewers (15/11 ~09:50Z)
Read PROGRESS on each branch before reassigning.

### Workers
| Branch | sha | PROGRESS | Notes |
|---|---|---|---|
| review/fix-float | e03bf36a0 | dev/PROGRESS_fix-float.md | Needs rebase onto main. First commit is WIP Tuần lục person page items (1)–(9), untested. LEFT: (7) fixed template, (8) straight columns, integer chip test. |
| review/tabs-kit | a94a34925 | dev/PROGRESS_tabs-kit.md | Rebased onto main 70c792d41, must be retested. |
| review/rest-balance | 0f4670e90 | none | Done. |
| review/ts-a | 02d7db25f | dev/PROGRESS_ts_a.md | WIP: 5 FAIL bugs fixed in code, needs shots at 4 sizes. Emperor grey silhouette left to kit-fig2. |
| review/kit-close | 1bd240a54 | | Ready for review. R5's partial merge: review/kit-close-merged-wip 9e3ab039a (untested). |
| review/opt-render | a8ec98511 | | Ready for review, nobody has looked. |
| review/hoangtu-tuchat | d8e4fe943 | dev/PROGRESS_hoangtu-tuchat.md | Done, 22/22 at 5 sizes. Ready for review. |
| review/toilette | 71efeee98 | dev/PROGRESS_toilette.md | Left: re-measure face points on CDN images then push toil-fit.json; 1180 shots; bot; wire kitEventDp. ev-toil-* banners on CDN. Tell act-audit: leAttire uses S.turn*10+S.buoi but S.turn is the month. |
| review/scene-light | fd765c0a4 | dev/PROGRESS_review-scene-light.md | Rosy skin 807 (approved) NOT started; re-cutting edge-cut figures not done; j87 Thái hậu committed, not re-measured. |
| review/act-pics2 | c457f3d8a | dev/PROGRESS_review-act-pics2.md | 22 Tổng lược line pictures drawn, NOT on CDN (command in PROGRESS); 8 generations waiting to download; kbkArt fix still to do (assigned a467/gift-ui). |
| review/trung-y | f99807021 | worktree agent-a40a826e3f9c2878f: dev/PROGRESS_trung_y.md (section "BÀN GIAO 15/11 ~09:35Z") | All 84 faces drawn. Only c01–c12 newly cut (in img/). c13/15/16/18/19 cut but cutcheck reports semi-transparency (see batch2 sheet). Rest not cut. ZIP EXPIRES 16/11 08:00–09:19Z: do it now! |
| review/sfx | d83929a06 | dev/PROGRESS_sfx.md | Sound by meaning; replaced the laugh-like crying and 5 other sounds. Needs test rerun and a human listener. |
| review/rank-ui | f8f914a0e | dev/PROGRESS_review_rank-ui.md | Bảng vàng podium, end-of-life card. Still to run test 844 + podium.js. On merge take kitDpFit/kitNameRank from kit-fig2. |
| review/pets-fix | 8edc3a83e | dev/PROGRESS_pets-fix.md | Merged pet-care + shop-fix (shop-fix already on main). Left: 17px misalignment, test 5 sizes, fix the test. |
| review/j83-variety, review/kit-fig2, review/gift-ui | see PROGRESS on the branch | | No final report in time, read the branch. |

### Reviewers
| Branch | Result | Notes |
|---|---|---|
| act-audit, shop-fix | PASS, on main | Main = 70c792d41. |
| review/stage-slots | PASS | Ref review/stage-slots-merged = 8b4b51679. Must run stage-slots or coop-e2e once on this ref before pushing main. Not reviewed: drag-curl, header-fix (+ bigger avatar), scene-light. Notes dev/review/R3-queue.md. |
| fix-float | no verdict | coop-e2e failed twice, at a different step each time. Merge review/fix-float-kiem2-wip 2dd99230b. Open question: does jnight call nextBuoi by itself in co-op. |
| rest-balance | nearly PASS | Merge review/rest-balance-kiem2-wip ba566d8ff has 2 fixes: j79 card overflows 57px at 844, a bug currently on main. |
| person-acts | no verdict | 1 bug: "Đối đầu" tab hides under ✕ at 1000x755. Merge review/person-acts-review-wip d5f60c87c. |
| gift-chest | no verdict | Merge review/gift-chest-wip 6e6dea11d; test hangs at Giao tình. Collides with rank0-ivory: promotion shows 2 chests. |
| weather | needs fixes | wxRiskWord must use chanceW(); use "−" not "-". |
| rank0-ivory | needs measuring | KIT_POR.dx=.18 > spare margin .07 so edges may gap. |
| Not started | | game-feel, brand, img-quality, emo-men, opt-render, scheme-games, econ, rank-ui. |

Reviewer notes: review/kiem2-notes (R1 b505ed2df, R2 7edeb353e), review/r5-notes a53375818, R6 on review/gift-chest-wip.

Warning: R5 ran `pkill -f chromium` while cleaning up, which may have killed other people's tests.

## MORE OWNER BUGS AT SESSION CLOSE (16:40Z), not assigned
Details in OWNER_DECISIONS 16:40Z.
- Bái kiến: evening with 4 khắc left still shows no Bái kiến button.
- Phế phi họ Lý in the cold palace: empty frame, no figure.
- Evening weather says "nắng gắt".
- Tapping her on the stage: a faint blue rectangle appears.
- Bottom corner button still says "Qua ngày"; the "Đã mở bản mới" chip covers the scene title.

## IMPORTANT: the new machine has no old worktrees
The new session runs on a new machine. Everything remains only in git (branches) + CDN + Magnific (ids in PROGRESS).
At 16:40Z every image still on the machine was pushed to the CDN:
- act-pics2: all act-*/ev-*.
- trung-y c01–c12 + FIGURES-ty.json.
- fig-eunuch-ndp-tray.

Anything not on the CDN must be re-fetched from Magnific by the ids in PROGRESS:
- j83 cooking images: 40 images + 3 icon sheets;
- trung-y c13+ (zip expires morning of 16/11);
- 8 pending act-pics2 generations.
Trung y images are on the CDN but the code is still on branch review/trung-y.

## MAIN SESSION 6 (taken over at session 5 close)
Assigned 20 tasks (max): trung-y (cut c13+ before the zip expires); fix-float (finish person-page template + FLASH bug when turning Sổ tuần); reviewers: opt-render, kit-close, rest-balance, hoangtu-tuchat, stage-slots (test run on 8b4b51679), game-feel, img-quality, brand; workers: kit-fig2 (+ "VIỆC · <cung>" box), act-pics2 (+ Phế phi họ Lý figure and every side NPC missing a figure), scene-light (rosy skin 807), tabs-kit, ts-a, event-balance, gift-ui, toilette, j83-variety, close-bugs (new branch review/close-bugs: evening Bái kiến, weather by buổi, blue box on tapping her, "Qua ngày" + "Đã mở bản mới" chip).
Waiting for a slot: reviewers rank0-ivory + emo-men, poison-gift; workers pets-fix, sfx, rank-ui. Review fix-float after the worker reports done.
Worker worktrees at /home/user/wt/<name>. Rule summaries for workers: /home/user/wt/PREAMBLE.txt, REVIEWER.txt.
- Session 5 sent 4 more points at 16:50Z (already in OWNER_DECISIONS). Put KIT-FIRST RULE (LUẬT KIT TRƯỚC) at the top of WORKER_BRIEF + the reviewer version. Added to queue: huadian worker to shrink one more size (sample a few faces for owner approval first).
- 09:50Z (machine clock): DISK FULL because 20 workers each did a full fetch of the shallow repo → 6 tasks blocked, rerun. New worker rule: fetch --depth=30 under `flock /home/user/wt/fetch.lock`, never re-clone.
- review/event-honest was never pushed (lost with the old machine) → event-balance redoes it from main + opt-render.
- Assigned: 16:55Z/16:58Z/17:00Z → fix-float (Tuần lục kit sweep); 17:04Z news images of the wrong person → kit-fig2 (priority, report early). Queue: reward-anim (17:02Z), huadian shrink further, R rank0-ivory+emo-men, R poison-gift, pets-fix, sfx, rank-ui.
- 17:06Z main/side story event rule (label + deadline + silver-free path) → event-balance. 17:02Z brocade box details stay in the reward-anim queue (item reveal now ~1.2–1.5 s, audit every item missing a picture, real grade labels, drop no-change lines).
- ~10:00Z DISK: the session has a write quota of ~39 GB (df is wrong). Forced every worktree to use sparse-checkout (excluding dev/shots, dev/owner-shots, dev/figwork), banned full clones; ~19 GB free again.
- 17:08Z festival off-theme (Hội Phượng · thi thêu) + 'TỐN không' → close-bugs; banner images → kit-fig2/act-pics2.
- 17:12Z duplicate Cần chip (Múa yến tiệc) → close-bugs. 'Ân sủng' block (Có thai/Lật thẻ/Ân tình) collapsed, owner can't see it → waiting for owner to choose how to show it.
- LIVE main = ca361b147 (hoangtu-tuchat, PASS, plus fix to j53 age-based tư chất messages).
- opt-render FAIL (notes review/opt-render-r6 6f256f7f4): directly built events (Thái hậu summons, 7 festivals…) still show Được/Mất; hints fall back to "chuyện khác"; private CSS .krisk/.khint → new worker fixes on review/opt-render (make them shared kit). event-balance keeps the bot balance part.
- Opened reviewer for rank0-ivory + emo-men (merged together).
- 17:14Z 'Tuần lục' title drawn as Vietnamese calligraphy (Latin letters with diacritics, no Chinese) 3–4 samples → act-pics2 does it first, owner picks, then attach.
- 17:16Z extra square frame behind small avatars + multicoloured names + long 'Tuần này' line + Lui button (Tuần lục Tổng lược) → fix-float, fix in the shared kit.
- 17:20Z PROMOTION REQUIRES AN EXAM (meeting conditions only allows sitting it; fail and wait; NPCs same rules) → queue, assign as soon as a slot frees (worker promo-exam). Ask owner: do the servant/mama roads need exams.
- 17:24Z midday room still brown (scene-light split off an early batch), fireflies at midday (close-bugs), antique painting reward without chest (game-feel reviewer checks).
- 17:27Z misaligned label|value table (LUẬT · Ân thưởng) → shared kit table + audit every list → fix-float.
- LIVE main = 114887bc1 (brand: app icon + Trân nữ seal; reviewer fixed the "NỮ" mark being read as "NƠ" and the "Có bản mới" chip covering the Emperor card).
- 17:27Z label|value table split off to new worker review/kit-table (fix-float asked to split).
- 4 Tuần lục lettering samples on CDN title-tuanluc-v1..v4.webp, sent for owner to choose.
- Queue (in order): promo-exam (17:20Z), econ-stipend (17:30Z stipend items into real Tư trang + chest; 17:33Z stipend skimming; based on review/econ), header-danh (17:36Z + fix ≈17:50Z: left Sắc·Tài·Tâm cơ·Đức·Danh·Sủng, right Bạc·Sức; merge review/header-fix), reward-anim (17:02Z), huadian shrink, R poison-gift, pets-fix, sfx, rank-ui.
- 17:40Z Ân sủng panel balloons over the edge → stage-slots reviewer finds/fixes; black mark at the neck of Mạnh Mộng Điệp's figure (Thường tại) + audit every figure → scene-light.
- 17:45Z OWNER CORRECTION: Tuần lục does NOT pack pages (one section per page as before); the real bug is the "Triều đình · thiên hạ" page lacking a full-body figure → every page must have a person figure (fix-float). Huadian: measure flower width/face width ratio per tier on the CDN, report tiers that exceed, propose ONE smaller size for every tier, send samples to the owner FIRST (queue, high priority). Kit-first rule: paste verbatim into every assignment (PREAMBLE), reviewers FAIL anything not per kit, log dev/kit/KIT_REQUESTS.md.
- scene-light early batch SẴN SÀNG KIỂM 6f624274e (removed the sepia/brown layer in her room in all 4 buổi; warm rain) → first free reviewer takes it immediately.
- ~10:50Z (machine clock) CPU OVERLOAD: load ~60 on 4 cores; bot browsers crash (ts-a balance could not be measured). Rule: do NOT refill slots as they free; target ≤12 running agents, at most ~6 that run Playwright at once. ts-a 0b7e154a2 UI ready; balance (bot fix + 80 lives) pending until load drops.
- From now on this file and all repo docs are written in English (owner ~18:30Z).
- LIVE main = 041cdcd1f: kit-close (311260527: Tư trang 2 tabs, news card, no tap-through, ✕ only) + ChatGPT docs (ebbbd9eff) + scene-light colour part (no sepia/brown in her room, warm rain). Not refilling the freed reviewer slot (CPU overload rule).
- LIVE main = rest-balance (207824297): Rest a moment (+6, 1 khắc) vs Recover (evening only, tonic or 8 silver, +20); tonic shown under Cost.
- game-feel FAIL (review/game-feel-r6 5a04b3b21, reviewer fixed the no-chest imperial reward + letter placeholders): kitLose missing, slow reveals (17:02Z), private reveal CSS → new worker on review/game-feel (absorbs queued reward-anim).
- LIVE main = rank0-ivory + emo-men (d50f5f772): Đáp ứng frame A, 8 head marks (6/7 swapped) as items with Dùng, portraits not zoomed + moved up + body centred (edge-safe cap), men's mood seals, seal tap popover. Open: tassels cut on every person card by KIT §28.1 vs owner 06:35Z → queued tassel-fix; mark not yet in promotion chest (needs gift-chest); jkpor face-size zoom (POR_FACE.json, up to 1.6) conflicts with owner 11:30Z 'no zoom' → told gift-ui.
- Huadian measure done (review/huadian-size 094ac3c): 672 portraits; every tier has a 1.5–2× tail, t7/t8 almost all over the rule. Proposal: ONE size 0.07× face width (cap 0.08) for all tiers; sample sheet sent to owner (CDN huadian-sample-sheet.jpg). Waiting for owner approval before any batch.
- LIVE main = img-quality (1a99caf7d): proper portraits immediately (no old 256px faces), strangers in stone frame, unmet công tử silhouette (reviewer kept jht faces for met ones). Notes: core first download ~129 MB (owner earlier complained 83 MB) → needs a download-size task; 129 old face-* still requested at startup; POR_FACE.json 404 (jkpor zoom stays off, fine under owner's no-zoom rule); Fold stage upscales figures 1.43–1.53× (needs 1100px+ fig export).
- LIVE main = close-bugs (ee5758195): Bái kiến offered/explained, far walk 2 khắc any weather, weather words fit buổi×season, no blue tap box, no 'Qua ngày', 'Đã mở bản mới' below top bar (kitLine KIT §42), one Sức requirement per card, festival×contest titles (117), no 'TỐN không'. Notes: no kit SAMPLE PAGE exists in repo (owner asked KIT.md + sample page) → queue kit-sample-page; 'Phi ???' in greet text vs named reward row (name hiding owner).
- tabs-kit fixed (c0b650993) → re-review spawned. It also fixes a game-wide bug (jk3 kitActKey shadowed j79's ACTS lookup → many acts lost their own picture) and adds the KIT SAMPLE PAGE (#kit, jkitpage.js, KIT §47) — so kit-sample-page is removed from the queue. Open: 'Điều kiện sắc phong' wrong next rank (promoReq) → promo-exam worker.
- opt-render fixed (54f381436: all events cost mode via data flags + opt-scan.py, honest 3-level hints as pure kitHint, kit parts kitRisk/kitHintRow/kitKemRow/kitSeal, night Bạc−5 = prep cost) → re-review spawned. Two kit sample pages exist (opt-render ?kit vs tabs-kit #kit) → must become one.
- 11:32Z hourly watch: main ee5758195. Load 48 (falling), disk 14 GB free, 14 agents running; queue held. trung-y: all 576/576 Magnific sources for c13–m52 downloaded locally at 10:44Z (zip-expiry risk gone), cutting in progress (refine v6). Waiting: re-reviews of tabs-kit + opt-render, stage-slots reviewer still running.
- LIVE main = tabs-kit (f500d0464): Tài nghệ/Mệnh truyện/Việc nhờ in kit UI with sub-tabs, fixed filter row, one skill card, kitSceneArt thumb, kitActCompact §43, KIT SAMPLE PAGE (#kit, §47); fixes game-wide act-picture lookup (296 lookups were throwing). promo-exam worker spawned.
- gift-ui ready ded3d5ea7 → reviewer spawned. Includes Emperor daytime acts sharing one daily turn, ev-<key> banners actually shown (24/121), no Triều chính fallback, portrait head-size normalised within no-zoom (5551/5744 within ±3%; kid-a4 boys + ~140 big faces can't be equalised without redraw/zoom-out). POR_FACE.json goes to CDN ONLY after merge.
- kit-fig2 batch 1 (e68183a1d: real-save news/Tuần lục avatars, one fact per news row, doubled titles game-wide KIT §9; KIT §48–§50) → reviewer spawned. Worker continues kitEventDp, VIỆC·<cung>, Thái hậu triệu, Ân oán tabs + new bugs: Thất tịch invitation re-queue loop, lesson minigame overlay not closing. KIT REQUEST number chips → fix-float. Balance bot inpage4.js broken on current main (stuck buổi 1) — event-balance must fix.
- toilette ready 8742f8abb → reviewer spawned (face points 4262 on current art, reactions as event frames, leAttire key fix, game-wide quote-split fix). kit-fig2 part 2 handed to a fresh worker (old one out of context).
- kit-table ready 77625c7ab → reviewer (renumber §41→§51). KIT section registry now in /home/user/wt/PREAMBLE.txt: main §39–§43, §45–§47; reserved §48–50 kit-fig2, §51 kit-table, §52 fix-float, §53 opt-render, §54 game-feel, §55 promo-exam, §56 scene-light.
- LIVE main = stage-slots (53a61f8e8): stage slot fixes + Ân sủng panel opens IN PLACE in the right column (owner 17:40Z bug, matched to owner's reference shot); coop-e2e 59/59.
- header-danh worker spawned (left Sắc·Tài·Tâm cơ·Đức·Danh·Sủng, right Bạc·Sức; merges what is still needed from review/header-fix; fixes quẻ/Sắc overlap at 1000x755).
- LIVE main = opt-render (94ea008a2): every event choice in cost mode (cost + Cần + honest verbal hint + kit risk label), active acts full numbers, kit parts §53 on the #kit page, kitSeal name clash fixed (kitResultSeal), Thái y bắt mạch now an event. Open (event-balance): vague-level hints still identical for some options (night1, giu, prep, Thanh minh, Ban cung).
- act-pics2: LIVE on CDN (data only): ACTS.json hands-only patch (124 '-h' pictures, 163 acts), EVENTS.json festival categories (14 own pictures). Code batch 7cce4420d (jly.js Phế phi họ Lý, festival banners + 4 festival maps, cdn_sync --pull User-Agent fix) → reviewer spawned. Worker continues: system-line patch, more man identities, 89 banners, a467, ~240 act pictures.
- j83-variety ready a45a12dc1 (11 kinds × 10 recipes with own pictures and matching minigames, 440 item pictures on CDN, paid-tier fixes game-wide) → reviewer spawned.
- LIVE main = gift-ui (5e491704d): gift dialog in kit, Emperor daytime acts sharing one daily turn (NPCs too), ev-<key> banners shown, no Triều chính fallback, portrait head-size normalisation within no-zoom (≤1.14); POR_FACE2.json uploaded to CDN by coordinator. Garden-walk wording 'Liều → Liều' fixed.
- 12:32Z watch: main 5e491704d; load 49, disk 13 GB; 14 agents (trung-y, fix-float, scene-light, event-balance, game-feel fix, kit-fig2 part2, act-pics2, promo-exam, header-danh + reviewers kit-fig2 b1, toilette, kit-table, act-pics2 code, j83). Removed finished worktrees gift-ui, toilette (only rebuilt site files unstaged). Queue held: econ-stipend, tassel-fix, translate-docs, download-size, fig-export-1100, R ts-a (bot), R fix-float when done, pets-fix, sfx, rank-ui, R poison-gift.
- fix-float ready 56517d0de (Tuần lục kit table, figures on every page, evidence with sources, flash fix, wording game-wide, number-delta kit part for kit-fig2) → reviewer spawned (renumber §51→§52, §52→§57).
- act-pics2 batch 2 LIVE (data): +37 system-line rules (547 rules, 529 keys, 0 missing), 10 new man identities × 4 ages on CDN (FIGURES-congtu.json 20 ids). Code jct2.js (suitor faces, b48742335) needs review. Fresh worker continues: action/event split of 23 figure pictures, merge ~250 unmerged meaning rules, a467, 89 banners, ~240 act pictures.
- header-danh ready 6cc1b756d (owner groups, header-fix merged: portrait = name block height, place button under time block, two-row header only when needed, tooltips/taps on every cell) → reviewer spawned. KIT §32.12 approved.
- LIVE main = act-pics2 batch 1 (ce840fa84): Phế phi họ Lý figure (jly.js), 14 festival banners + 4 festival maps, cdn_sync --pull UA fix. Minor open: at 844x390 a second person on the lãnh cung stage hides behind the people-list panel (general stage layout).
- promo-exam ready a0ea105b1 → reviewer spawned (KIT note → §55; no group picture on the exam card; act-pics3 drawing act-khao-hach-tan-phong). Son's birth now grants an exam instead of +1 rank → ask owner.
- LIVE main = header-danh (afb2676a2): header groups per owner (left Sắc·Tài·Tâm cơ·Đức·Danh·Sủng, right Bạc·Sức), header-fix merged, tooltips/taps. Queued: servant-road header Đức '!' + blank portrait.
- scene-light batch 2 LIVE on CDN (art): rosy skin 954 portraits + 939 figures, neck dark-residue fix 805 figures + 155 portraits, 4 re-cut figures. Code f01bae199 (j87 Tuần lục figure column) → reviewer. Worker: outpaint 8 edge-cut figures (approved), smudge calibration sample before any batch.
- LIVE main = kit-fig2 batch 1 (10043ac2b): real-save news/Tuần lục avatars, one fact per news row, doubled titles game-wide, KIT §48/§49. promo-exam PASS dfe3865d5 (on afb2676a2) → reviewer re-merging 10043ac2b. Exam act picture act-khao-hach-tan-phong live.
- LIVE main = promo-exam (aa9689da5): promotion requires the exam; NPCs too; cold palace shows 'phục vị'. Balance bot not yet run (load) — run run5b.sh when quiet; if HH low, lower BAL.ex.bar[2].
- kit-fig2 r8 ready 196edb362e (kitEventDp for every person event, VIỆC·<cung> place cards, Ân oán sub-tabs, no group pictures, overlay-close fix 35/35) → reviewer spawned.
- game-feel fixed 5ffbf8b267 (kitLose, slow reveals BAL.reveal, real grades, veils pictures, kit §54) → re-review spawned. Also brings rot.js (rotate on phone portrait).
- LIVE main = j83-variety (31907911d): 11 kinds × 10 recipes with own pictures + matching minigames, paid tiers worth it (6→1 dominated, the 1 is legit), Thôi via kit ✕.
- 13:33Z watch: main 31907911d (j83 live). Load 47, disk 11 GB. Started econ-stipend (17:30Z + 17:33Z) and translate-docs (this file and OWNER_DECISIONS will be rewritten in English).
- scene-light r7 PASS 8dfd2be94 HELD (not pushed): wide figures incl. Thái hậu shrink to 57–63% height (breaks owner 03:55Z). Sent back to scene-light worker: train behind text panel, ≥85% height.
- act-pics2 batch 3: LIVE data — 12 action pictures redrawn hands-only (chải chuốt, đeo/tháo trang sức, từ chối…), exam act picture, +15 log rules (562 rules, 537 keys, 0 missing), 16 dialog banners. Code (jct2 suitor faces + a467 'own picture or none' in j87) → reviewer. New art worker: 73 banners + 276 act pictures. Owner to decide: doat-giai pictures show the Emperor giving the prize.
- Coordinator docs translated to English (04cf057d61). WORKER_BRIEF commit-message rule fixed to English.
- LIVE main = toilette (27491781f): morning Điểm trang, approved looks, reactions as kitEventDp frames (max 2), leAttire fix, quote-split fix. Open: bot balance for toilette not run (load); #toil-css small private block awaiting kit review.
- event-balance ready dffda4241 (story labels, deadlines, non-silver routes 179/179 + 34/34, context outcomes, mood causes, real preconditions, hint dedup 88→36) → reviewer. Story art gap: 26 arcs no cover, 305/365 beats no picture → act-art worker queue.
- trung-y: c13–c32 + m01–m19 cut, checked, on CDN (FIGURES-ty.json 1632 records); sources for m20–m52 on disk, cutting continues. Code jty.js still needs review after.
- LIVE main = act-pics2 r7 (f6d80ae65): suitor faces (bacdich-1 never given to ordinary suitors — was a live bug), Tổng lược pages show own picture or none on EVERY page type (0 stand-ins of 1,520 lines). Note: the reviewer's pkill may have killed another session's http.server on 8817.
- LIVE main = kit-fig2 r8 (b8a58e873): kitEventDp for every person event (Thái hậu triệu 408px, banner, chip above), VIỆC·<cung> place cards, Ân oán sub-tabs, no group pictures, overlay-close fix, festival banners for the 4 new festivals, duplicate Lời cảnh báo fixed. Queued: Thái hậu shown as silhouette in dialogs while stage shows her face.
- fix-float FAIL (review/fix-float-r6 6d75eeb576): co-op stalls in week 3 (2/5 runs; jnight auto-advance), occasional page-turn flash on cloned portraits → fresh worker. New PREAMBLE rule: own server on a free port, stop by PID, never pkill by pattern (two reviewers killed others' servers).
- econ-stipend ready 961cae455a (incl. review/econ): stipend goods as real items + chest, 18→0 text-only gifts, skimming with real causes + event, NPCs same; 16 item pictures on CDN → reviewer spawned.
- 14:32Z watch: main b8a58e873; load 11 (dropping), disk 9 GB. Removed stale tmp_pack (1.3 GB). Repacking the shared .git (18 GB of duplicated shallow-fetch packs) under the fetch lock — workers' fetches wait until it ends. Queue starts after repack: tassel-fix, small-bugs (servant-road header !, Thái hậu silhouette in dialogs, stage 844 panel), download-size, pets-fix, sfx, rank-ui, R poison-gift, R ts-a with bot.
- Repack done: shared .git 18 GB → 2.3 GB, disk 24 GB free. Started: tassel-fix, small-bugs-2, R poison-gift, R ts-a (+bot balance). trung-y art COMPLETE (84 faces × 8 tiers × 4 ages on CDN) → jty.js code review spawned.
- scene-light af6a7123: wide Tuần lục figures no longer shrunk (train behind paper panel), 8 edge-cut figures outpainted on CDN (~344 credits), smudge detector calibrated → 0 real smudges, no batch. → re-review.
- scene-light r8 FAIL (51f10427): text cut on figover pages, re-layout jumps reader + global resize, text column ~90–150px. Coordinator decision: min text column ~220px, figure may go to 85% height (never below). Sent back to worker.
- LIVE main = kit-table (e7148caf9): one kit label|value table everywhere (KIT §51), kitReqRows for Sắc phong, compact act cards keep one table (jk4 — kit-fig2 must keep this). Queued: toast over dialog at 844x390.
- LIVE main = econ-stipend + review/econ (618fa6db9): stipend goods real items + chest, 18→0 text-only gifts, skimming with causes + event (Án tham ô picture), NPC scheme knobs. Open: balance pass (worker measured early death ~41%, HH ~36% — HH above 32% target); item names capitalised mid-sentence in Tuần lục.
- 15:33Z watch: main 618fa6db9. Load 43, disk 20 GB. 10 agents (act-art, scene-light fix, fix-float co-op fix, tassel-fix, small-bugs-2; reviewers poison-gift, ts-a, trung-y, event-balance, game-feel). Removed gpt-setup + huadian-size worktrees (huadian branch pushed, waiting for owner approval). Queue held: download-size, toast-over-dialog, pets-fix, sfx, rank-ui, balance pass, servant/mama exam question.
- LIVE main = trung-y (6e4ec9e12): inner robe by tier everywhere, one thiếu lễ only, robbery card immediate, Emperor's night visit no breach; toil-fit.json now 9638 entries (makeup on trung y). Minor open: jaudit 'Vì sao' still says 'mất Danh/Đức' in trung y at Thỉnh an.
- LIVE main = poison-gift (b0052d607): poison in gifts (jpoison.js on the kit gift dialog), honest odds + Vì sao, NPC poisoning, silver needle, chân tình visible condition, 4 new item pictures. Ân tình NOT added to header (stays on Emperor card + Ân sủng panel) — owner may ask for a header cell (needs an icon).
- tassel-fix ready abfecc6c8 (full pendant+tassel on every frame, KIT §28.1 changed; header +17px on landscape — coordinator accepted) → reviewer spawned.
- scene-light db2c0efc3 (r8 fixes) → r9 review. Coordinator accepted 182px text at 1000x755 and train-only fade past the left page edge.
- LIVE main = game-feel (80be56be0): kitLose, slow item reveals, real grades, per-giver boxes, no letter placeholders, Pixi FX, rot.js scaled frame (landscape = 1180x820 design scaled, phone portrait shows rotated). Small open: story-gift box empty 'from' line.
- act art LIVE (data): 73 dialog banners, 263 hands-only act pictures (ACTS log 825 rules / 800 keys, held queue empty), 42 story covers (EVENTS.json). Approved: 305 chapter-beat pictures (~12.2k credits, owner rule 'draw missing art without asking').
- 16:32Z watch: main 80be56be0. Load 29, disk 20 GB, 9 agents. Started pets-fix and sfx. Queue: download-size, rank-ui, toast-over-dialog, small notes (goodsGive empty 'from', trung-y Vì sao wording, item names capitalised), balance pass when quiet.
- LIVE main = event-balance (eb7886c10): story labels, deadlines + countdown chip, non-silver routes everywhere, context-based outcomes, mood causes, real preconditions, hint dedup. NOT yet proven: hint-reading bot clearly beats random (3.8 vs 3.75 rank, small sample) → balance pass queued. Also queued: k3 state row overflow kit rule; opt-render test fails on main (jecon night Bạc line, jty Điềm báo).
- act art: 6 held rules narrowed + live (831 log rules); 64/295 chapter-beat pictures live; fresh worker continues the remaining 231 (~9.2k credits, approved) + 5 order-dependent rules.
- LIVE main = tassel-fix (888463759): full pendant + tassel on every frame (KIT §28.1), header +17px landscape, stage plaques 2 columns when crowded at 844. Queued small: palace labels clipped above face strip; Bổng lộc legacy table; name/time block overlap 1000x755.
- small-bugs-2 ready f5b0b547 (road-aware glosses, portrait never blank, one 'met' rule for chí tôn, no figure under panel, round labels) → reviewer. NEW queued (important): her stage figure wears t1 consort dress on the servant road and in lãnh cung (cold palace must be plain clothes) — needs player maid/cold figures wired.
- pets-fix ready c117502be → reviewer (also checks ts-b inclusion). Owner questions: Ngự tứ pet saves a life at Linh thú only, or already at Trưởng thành? Care bar label 'No' (fullness, higher=better) vs owner's 'Đói'? Co-op friend's pets help/harm/steal not wired (coopPetAct hook, no relay).
- LIVE main = scene-light r9 (ed7271deb): Tuần lục wide figures 85–93% height never scaled/cut, train behind paper panel, text never cut, reader stays on the same fact.
- 17:32Z watch: main ed7271deb. Load 63 (balance bots), disk 18 GB, packs 6.5 GB (repack again when quiet). 8 agents: fix-float co-op fix, sfx, balance-pass, story beats, player-dress; reviewers ts-a, small-bugs-2, pets-fix. Queue held: download-size, rank-ui, toast-over-dialog, k3 state row overflow, small notes.
- story beats: 192/295 live; fresh worker for the last 103 + 5 order-dependent rules. Coordinator decision: pale cream on women OK; imperial yellow only with the Emperor.
- fix-float r7 0840d01e6: co-op stall root cause (jnight keyed on month S.turn; also a single-player 3-day skip) fixed, 5/5 coop-e2e; page-turn flash fixed (decode before turn); actor naming in deltas → re-review (must merge scene-light r9's j87 changes).
- LIVE main = pets-fix + ts-b (17e8fc038): pet kit shop, care screen + 3 minigames, 4 stages, no turtles, help/harm/steal; ts-b Nhịn/Đáp trả real choice. Queued: 'thân ±N' wording sweep (~38 strings).
- figure-background (owner ~18:00Z) → worker; samples sheet to owner before wiring. Note: her screenshot is the OLD live build (Lui button, 6.6, 'đến +23') — those are fixed in fix-float r7 now in review.
- player-dress 8aaf93cf3 (her dress by road/rank everywhere; NPC maids by rank; j66 identity for skipped-Luân-hồi lives; +3,328 toil-fit points) → reviewer. Coordinator decision: pre-11/14 'player look' saves keep t1 on other roads (no new art).
- LIVE main = player-dress (64e91f1ae): her dress by road/rank everywhere (cung nữ tm0–tm4, lãnh cung plain robe), NPC maids by rank, +3,328 toil-fit points. Seen: a lãnh cung test save showed the Ngọc Thanh các stage background (check in place-colour audit).
- story-beats DONE (live CDN): 295/295 audit beats have pictures (433 story files, 0 missing); 5 held act rules live (ACTS 836 rules/805 keys). Coordinator approved swapping the 5 specific rules above the general to-giac/bi-ban-chet. Calendar worker started (review/month-calendar, §58).
- 18:32Z hourly watch: main 64e91f1ae; load 60 (holding queue); 12 agents running (8 workers + calendar + 3 reviewers; act-pics2 resumed for rule swap + act-picture face/light audit); disk OK, packs 8.3G (repack when load drops).
- book-title READY review/book-title e7769dc32 (d4 vertical title + Trân nữ seal on Tuần lục cover, KIT §27.1); reviewer started. Open note: 844x390 cover hint overlaps TUẦN seal.
- act-pics2: 5-rule swap LIVE (19cf6188e; 6 lines moved as allowed). Act-picture audit: 288 faces + 121 negative-on-light + 22 normal-on-dark = 382 to redraw; coordinator approved redraw (batches of 60), keep 18 night-by-nature normal acts.
- fig-bg step 1 sample sent to owner (A scroll / B moon window / C silk wash; rec C). §61 reserved for the background layer. Waiting for her pick.
- fix-float r7 review FAIL (78c9106d4 merged on main ed7271deb): co-op nights desync under COOP_NIGHTS stress (night dialog survives week merge, nightFx stamps new day). Everything else PASS. Worker spawned for r8.
- 20:45Z HANDOVER: coordinator session 7 created (see HANDOVER_TO_SESSION7.md). Session 6 hourly trigger deleted; session 6 only forwards remaining worker reports to session 7, then archives.
- (session 7, 15/11 ~21:10Z) Coordinator session 7 took over in a NEW container (4 CPUs; /home/user/wt recreated with fetch.lock, PREAMBLE says coordinator = session 7). Session 6's workers keep running in session 6's container and are forwarded here. Started: review/chap-label (story Chương N · Hồi M labels, whole class), review/small-bugs-3 (thân→thiện cảm sweep, item-name caps, empty 'from' line, toast over dialog 844, clipped palace labels / name-time overlap 1000x755, 390x844 subtitles, Bổng lộc kit table, k3 state row). Hourly watch trigger creation was blocked by permission — asked owner.
- (s7) month-calendar READY 436c18baa (forwarded) → reviewer spawned in session 7 (review/month-calendar-r1). art-complete forwarded: 1088 missing; A + mamas-via-code + eunuch ranks + grown children approved by s6; old-save player looks (128) and promoted old-love men (56) HELD for owner.
- (s7) Owner 21:00Z tasks assigned: review/outside-r2 (re-port jkc.js pre-palace route + khuecac dress onto current main), review/face-reveal (face known when a person appears in any event dialog; Thái hậu silhouette bug).
- (s7, fwd) por-scale: sample sent to owner; ~3250 portrait re-crops to per-group face targets (children .294, consorts/maids .241, eunuchs .261, men .255…); full run continues in s6; mk-colour must re-run mkfit.py --stale after.
- LIVE main = ts-a r6 (4e37161c0): Top 15 lô A (Nguy hiểm chung, etc.); k61Meet sets S.met; VP 'quý ngươi hơn' fix. Bot: main HH 0% vs ~32% target (balance owner).
- (s7, fwd) LIVE main = ts-a (4e37161c0, ff by s6). Notes routed: S.met/Emperor-grey → face-reveal; HH 0% bot → s6 balance-pass; minor VP 'theo lòng nàng' ambiguity on dressing contest (queue).
- (s7) LIVE main = month-calendar r1 (8ee414c1b): desk calendar on her room stage → 3×10 month grid, fixed FEST festivals only, KIT §58; desk avoids +N chips. Pre-existing #kit §28.1 sample error still open (queue).
- (s7) item-events READY fc6eb5110 (fwd) → reviewer spawned (review/item-events-r1; renumber KIT §58→§64). Registry: §64 item-events.
- (s7) sfx READY a7109a003 (fwd; includes live-bug fix: duplicate global kfWhy made locked-button taps throw) → reviewer spawned (review/sfx-r1). act-pics2 redraw batch 1: 60/380 faceless live (data).
- (s7) chap-label READY 50b9cf202 (lab67 'Chương N · Hồi i/n' on every main/side story label, old-save fallbacks, empty v1 tab fixed) → reviewer spawned (review/chap-label-r1). Open owner question: j72 Việc nhờ cards keep 'bước i/n'?
- (s7) art-complete (fwd) stopped at ab8b1e1a5: 50/272 A live + jartc.js (spouses age yearly, late-met staff maids get free maid face) → reviewer spawned (art-complete-r1, up to ab8b1e1a5); continuation art worker spawned in s7 on review/art-complete (KC c11–c32 66, KC maids 156, eunuch ranks 360 + picker, grown kids 144). Held for owner: old-save player looks 128, promoted old-love men 56.
- (s7) LIVE main = chap-label r1 (e5a327d13): 'Chương N · Hồi i/n' on every story label (+ j6 v1 panel). Queue: #kit §28.1 sample error (rkOfFace via pMe() with no game), 'Phi ???' in arc tab Mục tiêu (check).
- (s7) rank-title READY 3b8aa4aa1 (fwd; KIT §48.1 kitRankTone) → reviewer spawned (rank-title-r1). Owner Q: keep paper halo behind names on stage at night?
- (s7) face-reveal READY 7e71ca65 (one j61 hook: any dialog showing a person reveals face, met for consorts; household always known; old-save backfill; scan 30 grey-after-dialog → 0) → reviewer spawned (face-reveal-r1).
- (s7) LIVE main = item-events r1 (23a8e80eb): item tag on event banners, keep/give/burn/probe animations (KIT §64), 11 item pictures; give flies only to the named person; 844 short-screen item frame. art-complete group 1 (KC c11–c32 66 figs+66 por) live on CDN, c5f24910.
- (s7) act-pics2 redraw (fwd) stopped at 92/380 → continuation art worker spawned in s7 (batches of 60).
- (s7) BIG BATCH 20:05Z assignment plan (4-CPU container, load ~14): NOW → idea-history, idea-design (docs only), promo-rules (son=direct promo, daughter/servant/mama exams, promotion reward chest + new-servant reveal screen, promotion/demotion/cold-palace animations), coop-pets (help/harm/steal relay, Đói label, Linh thú life-save, co-op audit of all features). QUEUED in order: econ-items (stipend item skimming, stolen-clothes re-issue + odds, girlhood chest 6 slots), personality (personality groups + trọng 13 virtues for all incl. player; Thái hậu thỉnh an not flat +8, lowering events), emperor (poison Emperor/Thái hậu story roads, Emperor visits her palace), header-tabs (header only her info, others in room tabs) + update-notes, presentation (sound by event group + voices after sfx lands; frames by event group/main/side; the other approved animations), mood (Sims-like bar), huadian 8.5% batch (art; reuse huadian-size branch).
- (s7) art-complete 0249db70: group 1 (KC c11–c32, 66) done, group 2 KC maids m01–m26 done (78); ~13.1k credits; 894 combos missing. Fresh art worker continues (m27–m52, eunuch ranks, grown kids). Owner 20:10Z her-own-name gold glow → sent to rank-title reviewer.
- (s7) idea-design DONE: dev/ideas/DESIGN_IDEAS_1115.md on review/idea-design 17b2ba71 (30 ideas; top: memories/Kỷ niệm, witnessed NPC scenes, hook ledger, bond ranks, arch-rival, Chí hướng, onboarding mentor, co-op Liên thủ, life-end montage, taste book). Owner rule 20:05Z: build without waiting → queue build after history ideas arrive (memories + hook ledger first).
- (s7) LIVE main = art-complete r1 (e3fc5f612): jartc.js (spouses age yearly, late-met staff maids get maid face) + 50 pictures; reviewer inpainted forehead moles on c05-kc ×3, c08-kc-a26. Still open: #kit §28.1 sample error on main.
- (s7) Owner 20:15Z assigned: review/cal-plus (calendar birthdays/stipend/deadlines/sổ hẹn/prep checklist/quẻ/weather/past-day log/moon/co-op + Trân nữ seal on every event frame), review/skin-match (face vs hand/neck skin tone audit all fig-*, player look1 rosy, ref maid m03 Ngọc Lan).
- (s7) Owner 20:20Z thái y (all 4 ideas) → review/thaiy worker (exposes thaiyNextVisit() for cal-plus).
- (s7) idea-history DONE: dev/ideas/HISTORY_IDEAS_1115.md on review/idea-history aa1714ed (33 ideas). Feed into queued workers: Thái hậu archetypes → personality; poison 3 checks (taster/two-pot/touch record) → emperor; charcoal/ice by rank → econ-items; trap dress, Ban Tiệp dư palanquin, hiệp lý lục cung, mother-below-Tần child raising, hidden prince, tùy giá → idea-build workers after design top ideas (memories, hook ledger first).
- (s7) Owner 20:25Z monthly cycle → review/cycle (new jcycle.js; cycleDaysOf() for cal-plus, cycleLate() for thaiy). Owner 20:30Z dark = gloomy mood not night sky → sent to act-pics2 worker.
- LIVE main = book-title r6 (41cdf7c3f), pushed by session 6.
- (s7, fwd) LIVE main = book-title r6 (41cdf7c3f, ff by s6). Main-side small issues → small-bugs-3 items 9–12 (§28.1, §53 seal samples, 'Tuần' fallback 1000x755, 390x844 rotate prompt).
- (s7) night-end READY ef0582dd5 (fwd; jne.js KIT §62) → reviewer spawned (night-end-r1).
- (s7) placeholder-pics READY d70983bb8 (fwd; jph.js KIT §59) → reviewer spawned (placeholder-pics-r1).
- (s7) Owner 20:40Z batch: #2 dp caption box removal → rank-title reviewer (small fix on r1). QUEUED (load 32 on 4 CPUs — spawn as slots free, in this order): fig-bg step 2 (A silk hanging scroll with top+bottom rods, same figure size inside, status colour/motif table; branch review/fig-bg 21eb452d3, KIT §61); NPC death + replacement whole class (new face, never reuse; some posts empty with stand-in) + Phế phi Lý stays in lãnh cung until death + Lý side story; real side stories (NPC life goals → side quests; pair with personality/trọng). Earlier queue still: econ-items, personality(+Thái hậu archetypes), emperor (poison 3 checks, visits), header-tabs + update-notes, presentation (sound groups, frames, animations), mood bar, huadian 8.5%, idea builds (memories, hook ledger…).
- (s7) recipes READY 7dadbc553 (fwd; jrcp.js, BAL.rcp, sub-styles, teacher 8% bổng or favour, tastes, fatigue, allergies) → reviewer QUEUED (load 35); bot run5b.sh when load allows. Open: her own allergy not modelled.
- (s7) LIVE main = sfx r1 (d51a393e4): sound inventory 431/0 unmapped, kfWhy live bug fixed (locked-button taps threw), j10 faction invite shadowed by j21 invite → facInvite, pet-care missing chime, jitev sounds via table, 8 new audio files. Recipes reviewer spawned (recipes-r1).
- (s7) place-colour READY d99b28a1d (fwd; jsl grade on Pixi too, kitLifePlace fix: lãnh cung showed Ngọc Thanh các) → reviewer spawned (place-colour-r1) + art worker review/place-art (regrade 9 brown trưa + 6 too-bright nights, new Tân Giả khố + cung nữ room paintings).
- (s7) Owner 20:50Z card-flip scene → review/cardflip worker (jflip.js, KIT §67). fig-bg A crop-to-frame note added to the queued fig-bg step 2.
- (s7) outside-r2 READY 7f345703 (jkc.js re-ported on today's kit, palace handover, ~15 bạc roads paired) → reviewer spawned (outside-r2-r1; coordinator decision: 2–10 bạc incidental place acts get equal non-bạc roads too). Art gap queued: house/city paintings for the home road, Huynh trưởng civilian figure, house map.
- (s7) Owner painted-only effects (21:00Z method) → review/fxkit worker building shared KIT §68 painted-fx (sprites via remove_background, light videos on black with screen blend, alpha sprite sheets). cardflip, promo-rules, night-end reviewer told.
- (s7) Owner 21:10Z night follow-ups (morning after mặn nồng / lạnh nhạt mocking / Emperor elsewhere music / rằm & festival night-end variants) → QUEUED to start on top of night-end r1 as soon as it PASSes (uses §62 + §68 fx).
- (s7) act-pics2 redraw 152/380 live (ce225d1f; ~2.6k credits; 4 night-sky darks redone). Coordinator decision: re-check keys 1–92 darks too. Next worker spawned (from key 153). Owner 21:15Z card-flip follows her knowledge → cardflip; 21:20Z level-up grants a recipe → recipes reviewer.
- (s7) Owner 21:25Z co-op buổi timer → review/coop-timer worker (KIT §69).
- (s7) art-complete d27ceb57: KC maids m27–m52 done (78); mole/bead sweep fixed 38 por + 35 fig (recurring per identity; new prompt alone doesn't stop it → demole_por.py on every new face). Audit 816 missing. QUEUED: whole-game mole audit of every por-/fig- family with demole_por.py.
- (s7) Owner 21:35Z art batch QUEUED (20-agent cap reached): item-art (poem items as calligraphy scroll/sheet/fan 44, incense distinct colours, equipment dress no-rack redraw, pet thiếu niên chubby redraw ×8; save 1024 masters img/hi/<key>.webp) + item-big (centre-screen item display hi-res, transparent, no tile; whole class). Makeup feedback went straight to s6 mk-colour.
- (s7, fwd) por-scale LIVE (data): 3317/8093 portraits re-cropped, per-group spread 5–13%. QUEUED small: consort-c12-ty5-a51 pale patch over eyes → redraw; jk2b §7 veil/scar layer box should follow jkpor zoom. Owner 21:45Z scene orientation rule → night-end reviewer + cardflip.
- (s7) art-complete 9ece2024: mole sweep part 2 (kc a18 + c01–c10) 6 por + 8 fig fixed; demole_por.py generic. Owner 22:00Z: sounds never sent to her for approval → PREAMBLE rule.
- (s7) QUEUED (cap): result-sfx — whole-class win/fail sound on every result surface, once, distinct; sound on by default; iPhone Safari unlock.
- LIVE main = small-bugs-2 r6 (d8b81af9e), pushed by session 6 (final re-test on last merge cut short by usage; none of the 49 merged main commits touch its areas).
- ~23:45Z SESSION 6 CLOSED by owner: last agents stopped (all pushed): review/j59-fix da15718ce, review/mk-colour, review/balance-pass → session 7 re-spawns. Session 6 archived.

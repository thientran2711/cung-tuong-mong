# U1 co-op rerun (Foreman B ROOT/child brief) — 11/25/2026

Runner: U1 sonnet co-op rerun runner. Seats: pair 1 host Fold / guest iPad. Header of the running segment: segment 1/U1, seed 114, host Fold / guest iPad, game c4163a93 (+ own Worker), harness 5edf09f6 + B-5edf patch + U1 ktut r4 / olu skip / reload.

## Result so far: 0 valid lives, 0/20 valid segments
15 rooms started, every one INVALID (harness error or stuck). See the JSON for the per-room table. Dumps (not shots) are in review/robot10-coop-saves u1r/<room>/ (2GBH, 9TEZ, DETE, NB8G, 52AR, VZ68).

## Harness fixes found by this unit (all pushed to handover)
- room code not read (cbb90e91): regex `Chép mã` (landed by F in c29a6b5b).
- realtap-U1-ktut-patch.diff -> r2 -> r4 merged into realtap-B-5edf-patch.diff: tap the card's own «Đã hiểu» from the DOM (it is visible but not in the hit list), stop choosing «Đi làm…» after 3 dismissals in a buổi, year-rollover save+reload.

## Findings
- NOT a bug (withdrawn): «Nguyên do chưa rõ» is the legit mood-seal popover; «Lịch tháng» no-close warning = harness false positive (✕ is in the header).
- Open signature VZ68 (new): host `bend 1.2 f=true` repeated while guest `night 1 / pull`; guest sees «Đợi hảo hữu trở lại — hảo hữu đang vắng» (host seat online False) with the #ktut «Thỉnh an» coach over the dawn screen.
- #ktut «Thỉnh an Thái hậu hoặc Hoàng hậu» coach appears at buổi 5–12 over the dawn screen / over a Kỳ ngộ card, no lit card to tap (hole target is not a card).

## Moment log / reviews
Not written: no life reached an end (rule: review at end of life). Every room was invalid before a life ended.

## HANDOVER block (for the successor of this runner)
Setup: /home/user/wt/g6 = worktree of review/robot-coop-fix-6 c4163a93 (build_site.sh already run; play.html = index.html + COOP_URL injection to http://127.0.0.1:8787); `cd coop/worker && npx wrangler dev --local --port 8787 --ip 127.0.0.1`; static server `node /tmp/.../static.js` on 8080 (any threaded static server); harness files in g6/dev/test = 5edf09f6 + B-5edf diff.
Run: `RELOAD_AT=15 node dev/test/robot-rt-coop.js http://127.0.0.1:8080/play.html <out> host=fold guest=ipad kiep=1 seed=<n> tag=<name>` (one room per container). Out dir /home/user/wt/out/u1 (stuck rooms in /home/user/wt/out/stuck).
UPDATE 12:35Z (Foreman B child 2 ruling): STOP burning rooms on c4163a93. Successor must use the ONE shared stack review/robot-coop-stack-u3 512cfee6 (= c4163a93 + fix-5-r1 3f672533; rebuild index.html/sw.js with `bash dev/site/build_site.sh`) + harness review/robot-realtap 5edf09f6 + the shared dev/handover/robot/realtap-B-5edf-patch.diff (RELOAD_AT=<buổi> env hook; NO local variants). Label segments «game = stack 512cfee6 (pre-land), PROVISIONAL» until MAIN 140 accepts it. Segment = 2 h real-tap or year 2, 0 stuck, ≥1 save+reload mid-year; U1 order host Fold / guest iPad; use seeds not yet used (used: 101-114; next 115+).
Last attempts on c4163a93: 1a KSPE (ktut 580x), 1b ECGF (boot flake), 1c VZ68 (cause-3 night loop family, known-fixed-pending-land), 1d 8RQ9 (night loop host «night 2 f=true / pull»), all INVALID. Runner stopped at 12:35Z (context limit), no room running.
Remaining rows: all U1 rows of the RERUN LIST except the STUCK row; U1 now counts in SEGMENTS (MAIN 139): segment 1 running (room 8RQ9).

## U1b (successor, session_01N1tNP33JueFVZyZyM7LWb6) — depth unknown (get_session not read), START_CTX ~5% of window
- 25/11 ~12:45Z setup done: worktree /home/user/wt/s3 = review/robot-coop-stack-u3 512cfee6 + harness 5edf09f6 (dev/test realtap.js, robot-rt.js, robot-rt-coop.js) + realtap-B-5edf-patch.diff applied; build_site.sh run; wrangler dev --local :8787; python http.server :8080 serves index.html directly (COOP_URL env injects the Worker, no play.html needed).
- Run: `COOP_URL=http://127.0.0.1:8787 RELOAD_AT=8,15 node dev/test/robot-rt-coop.js http://127.0.0.1:8080/index.html /home/user/wt/out/u1b host=fold guest=ipad kiep=1 seed=<n> tag=s<n>`.
- Segment label: «game = stack 512cfee6 (pre-land), PROVISIONAL».
- Segment 1 started: room EGEN, seed 115, host Fold / guest iPad. 404 CONSOLE lines = CDN assets absent locally (noise).
- 25/11 ~13:25Z DHQ8 (seed 115) INVALID: stuck-1 host «Bổng lộc tháng ba · Lễ nghĩa» with #kpop «Thang cơ duyên» open (no #kxcatch for kpPop; old fix needed a visible #kxcatch, never fired). Dumps review/robot10-coop-saves 78a07ffe u1r/DHQ8. Fix = total popup close in robot-rt.js (own ✕ else bare-area tap, verify #kpop gone, harness.popClose/popFail); synthetic test (kpop over a .dlg) closes it. New patch sha256 bde8ce78. DHQ8 killed; next seed 116.
- 25/11 ~13:35Z patch 2 (Foreman B ruling, U3c BF8G): realtap.js PROBE never lands on kit triggers (.kodm/.kgl/[data-kgl]/[data-kfx]/[data-kodds]) + extra lower-third probe points; if every point is a chip → harness.noFreePoint (+dead row cover 'noFreePoint…') = real kit hit-area bug. Synthetic tests pass. New patch sha256 5da3600b.
- 25/11 ~14:50Z KZGY (seed 117) INVALID: guest stuck-1 «Tin báo» card tap lands on title chip «Trăng soi rèm ngọc» (opens #modal) — 72 buổi 0 stuck before it; scheduled reload OK. Dumps review/robot10-coop-saves 2041ea9b u1r/KZGY. Patch #3 (sha256 c7e53ed3): chip-trap learning — if a choice-card tap opens an unrelated 1-button modal, that tap point goes into an avoid list for the card (PROBE skips points within 28px), harness.chipTrap + bug row names the chip; rt.last() exposes the last tap point. NB RELOAD_AT takes ONE buổi (list = NaN, never reloads).
- 25/11 ~14:45Z patch #4 (Foreman B): RELOAD_AT accepts a list «8,15» (each buổi once, R.harness.reloads); harness.chipCover rows {screen,label,chip class,pct of card covered,vw} when a sibling overlay / chip covers part of a card (PROBE); chipTrap bug row names the chip class. sha256 581c7635.
- 25/11 ~14:50Z patch #5: chipTrap bug row only when the SAME card's 2nd tap also opens a chip modal (1st occurrence only adds the avoid point): V7E9 showed false rows — «Sẵn sàng» / «Tắm gội…» legitimately open an event/info modal. sha256 2815021b.
- 25/11 ~15:10Z V7E9 (seed 118) INVALID: host stuck-1 = BF8G loop on «Sai Thải Bình đi dò la» (card → chip modal «Phúc ấm đầy nhà» (.dlg layer) → Lui, 49×); #3 chip-trap check required layer '#modal' so it never fired. Patch #6: any non-page layer with a different title and only close buttons counts. sha256 298cff39. Dumps review/robot10-coop-saves u1r/V7E9.
- 25/11 ~15:40Z patch #7 (Foreman B, U3b H5BW regression): a choose-tap that leaves #kpop open (point landed on an odds bar / glossary trigger) puts that point in the card's avoid list at once + bug row with the trigger class + harness.kpopTrap; popClose (#1) unchanged. sha256 ca07fba7.
- 25/11 ~16:25Z 6DBR (seed 119) INVALID: guest iPad stuck-1 at buổi 65 on kit notice «Tin báo» (21 tin mới; options «Xem tin»/«Để sau», no ✕): DEAD «Xem tin…» 27×, banner chip «Tâm như bàn cờ» #modal 32× — SAME signature as KZGY guest (buổi 72). Patch #8: stuck dump now carries topLayerBtns (rect, hit element at centre, scroller state) + topLayerHtml so the cover/scroll cause is visible. Dumps review/robot10-coop-saves 6231663b u1r/6DBR (incl. guest ckpt = full save). sha256 65ee4c92.
- 25/11 ~16:40Z UFFT (seed 120) = boot flake (known: both seats never reached the life, 'life not (re)opened within 5 min' ×4, #title/page «Cung Tường Mộng», 30 min lost; no game played) → not a segment, rerun as seed 121 on patch #8. Dumps in /home/user/wt/out/u1b-UFFT (not pushed: boot flake, known).
- 25/11 ~17:35Z 73HN (seed 121, #8): guest looped 46× DEAD on a greyed focus card «Đưa cơm áo · … · 20 bạc» (.kfoc-off.kitoff: its tap legitimately opens the «why locked» popup) — #7 read that as a trap and avoid-listed every point → noFreePoint loop. Patch #9 (sha256 3a291855): a card whose tap opens #kpop and is itself .kitoff/.kfoc-off/aria-disabled = locked → skipped for the buổi (harness.lockedSkip, no bug row); 3× noFreePoint on one card → skipped for the buổi (harness.noFreeSkip, dead rows kept as kit evidence).

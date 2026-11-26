# D3 — contest-thitam: first place in ANY contest ⇒ thị tẩm that night

PRIORITY #1 CHECK ('thi thố|hạng nhất|thị tẩm|lật thẻ|contest'): OD 76 | ledger 6 | claims 8 | main 15 | review/* 8 | archive 314
(the literal brief phrase "thi thố hạng nhất thị tẩm lật thẻ contest" → 0 everywhere). No existing «first place ⇒ thị tẩm» anywhere;
review/contest-ui-r3 (podium / prize UI) and review/coop-contest-fix-r1 (co-op contest relay) are other jobs, not landed, not this rule.

Worker D3 (opus) · session_01D3E3NY4u5PWtro3m4FhbDG · depth 2 · START_CTX ~3 % · parent FOREMAN D session_01D3E3NX3vWTRXcmN8Wi8Yxw.
Branch `review/contest-thitam` — base LIVE f009e1a6, newest LIVE 02f564ae merged (7f28e647). Status line at the end.

## Owner words (verbatim, OD row «26/11 ~01:25Z»)
"Tôi thấy hiện tại tỉ lệ được lật thẻ bài thấp quá. Tôi muốn khi thắng hạng nhất các cuộc thi, ngoài phần thưởng hiện tại, còn được thị tẩm đêm đó"
→ ruling (1): first place in any contest ⇒ also thị tẩm that night (BAL key; current rewards unchanged; lật thẻ odds unchanged); test every contest kind; co-op two-way + both seats.

## What was built
- `dev/build/jctn.js` (new, last module) — `ctnWin(winner, title)`: keeps tonight for the winner with the SAME «night taken» mark his own
  visit uses (j75 `S.ntk {w: wk(), who, nm}`). Consequences, all from existing code:
  no tablet flip that tối (jnf / jfe realFlip), nobody can take the night (every steal / visit path reads j75 ntTaken / ntReason — same
  for her and NPCs), the winner's normal night plays at the end of tối (her: jnf herNight → «Chuẩn bị thị tẩm» → night cards; an NPC:
  resolveTonight → rivalNight; the co-op friend: the host's flip relay). With the 10-night ledger ON the winner holds the PLAYED tối of the
  tuần and the other nine nights are rolled / recorded as before.
- She is told at once: kit modal «Kính sự phòng báo tin» (same card pattern as ksp / nfsum) + Sổ ghi line. NPC winner: Sổ ghi line.
- Not given (her log says why; same rule for everyone): winner cannot serve tonight (nightCh 0: with child, ill, cấm túc, lãnh cung, her
  monthly days), tonight already taken (his visit, an earlier contest that day), tablet already turned.
- `BAL.ctn = {on: true}` (jbal2) — the rule switch (law 4). No new number: rewards untouched, nightCh / BAL.ag.emp.summon untouched.
- Every contest entry card prints the extra gain beside its own prize (`ctnX()`: «…, đêm nay được thị tẩm»): j71 sign-up / festival day
  / feast cards, jts Hội phối đồ «Tự tay phối đồ», j34 Tranh ghế intro.
- Co-op (host-authoritative night): the host keeps the night for whoever wins in its world (itself, an NPC, the friend's entry) and tells
  the friend; a contest the GUEST plays on her own seat sends her first place to the host (free-form `act` k `ctm-ctn`, no Worker change,
  old clients ignore it); host applies the same rule and answers ok / no; her card + log follow the answer.
- Kit: modal card + log line only (no new part; LAW 9). Words: VANPHONG cổ trang, no %.

## Whole family (LAW 11) — `python3 dev/tools/contest-thitam-scan.py [root]`
Markers: every `bestow(w,"contest")`, the finish functions by name, story endings «đứng đầu» in a «Kỳ thi / Hội thi / khảo» node, child contests.
14 contest kinds found · LIVE: 0 of 8 wired · branch: 8 of 8 wired · 6 not wired with a reason · 0 unknown sites.

| contest kind | file | LIVE | branch | why not |
|---|---|---|---|---|
| Hội thi ngày lễ (j71 festival contest, by formula; she entered or not) | j71 cRun7 | no | yes | |
| Hội thi ngày lễ after her mini-game | j71 cFin7 | no | yes | |
| Yến tiệc đầu xuân / Thi tài Thất tịch after her mini-game | j71 fxFin7 | no | yes | |
| Yến tiệc đầu xuân / Thi tài Thất tịch, no mini-game | j71 festival wrapper | no | yes | |
| base feast (j71 off) | j8 festival | no | yes | |
| Tranh ghế | j34 contestEnd | no | yes | |
| Hội phối đồ | jts tsDressHold | no | yes | |
| Kỳ thi Tài nữ (story contest) | j67 ARC67 thd_tho | no | yes | |
| contest prize table | jcui cuAward | — | — | pays the places of the j71 contests above (wired there) |
| Tuyển tú | jselx / jselxday | — | — | before sắc phong: no thẻ bài, nights are the yard dormitory |
| Ngày khảo việc (cung nữ) | j67 | — | — | servant road, never thị tẩm |
| khảo thí hoàng tử / công chúa dâng nghệ / con đứng đầu kỳ khảo | j53 / j54 / j67 | — | — | the child places, not a consort |

## Tests (LIVE f009e1a6 build vs branch build)
1. `node dev/test/contest-thitam.js <dev/index.html url>` — every kind × (her, NPC), one day each, tablet steered to another NPC so LIVE
   shows what the flip alone gives. Pass = night kept for the winner, winner +1 night, nobody else, no flip choice, day advances once.
   - LIVE: 0/16 (winner never gets the night; the flip choice opens every time).  Branch: 16/16. Ledger ON (`LEDGER=1`): branch 16/16
     (winner holds the played tối; the other nights of the tuần still rolled, 4–9 recorded).
   - Not given: with child → no promise, the tablet runs as before (her 0, other +1). Rewards: each contest's own Sủng / Danh deltas unchanged
     (prize code untouched; deltas equal LIVE ± the random empGive bestow).
   - Entry card on branch: «Dự thi thơ — … thành: đoạt giải, Sủng +3, Danh +3, đêm nay được thị tẩm, có thể được ban thưởng …».
2. Co-op `node dev/test/coop-contest-thitam.js` (2 browsers, LIVE Worker, host Fold 755x1000 / guest iPad 1180x820): C1 host wins, C2 the
   friend's entry wins in the host's contest, C3 the guest wins on her own seat (relay), C4 an NPC wins. RESULT: see «Co-op result» below.

## Co-op result (LIVE Worker, room per run; logs on the worker box /home/user/wt/d3out/coop6.log, coop7.log)
| case | passing run | checks passed |
|---|---|---|
| C1 host first | run 6, run 7 | host keeps tonight (ntk me) · her Kính sự phòng card · that day's played tối = host on BOTH seats (jnf nfX), no flip choice · host +1 night |
| C2 friend's entry first (host's contest) | run 6 | host keeps tonight for her entry (902) · guest gets ok relay + her card · played tối = guest on both seats · guest +1, host +0 |
| C3 guest first on HER seat | run 6 | relay ctm-ctn → host keeps tonight for her entry · guest card · played tối = guest on both seats |
| C4 NPC first (host's contest) | run 7 (C4FIRST=1) | host keeps tonight for the NPC · played tối = that NPC on both seats · neither seat +1 |
Harness notes (not the rule): (a) the «exactly +1» count is loose with the 10-night ledger ON — the guest's other ledger nights of that
tuần land too (run 7 C1 guest +2); (b) the week driver (coop-b2b5 week()) stalls when the host's queue holds «Lễ Phật đản» twice — every run
around that date, then the following cases cannot merge their week (run 6 C3/C4, run 7 C2/C3). Checked on LIVE f009e1a6 with the same
driver: see «LIVE stall check» (below). The set-up steers ONLY «can serve tonight» for the intended winner on both seats (her monthly days
would rightly refuse the night); the rule itself is not stubbed.

## Gates
- quickcheck (bash dev/tools/quickcheck.sh, 420ea238 vs LIVE 6b5d3d05): open 0 errors · old save loads + plays a buổi · time-spill PASS ·
  CORE GATES: G4 80-dialog-fixed FAIL «(kit-dialog-2 a) no empty Tốn / Được cell» = PRE-EXISTING on LIVE (dev/test/dialog-fixed.js on the LIVE
  build fails the same 2 rows); G4 90-button-crawl «Ô lưu · Lui close did not close its layer» (save-slot screen, untouched by this branch;
  not re-run on LIVE). The run hit its 20-minute bound in the selection-reroll step (perf smoke not reached).
- scan: 8/8 wired · solo logic on the final build: 16/16.
3. Real-tap videos (HOST mode, rot.js, the player's screen; set-up = the j71 festival invitation card + her talent pinned top; then only
   real taps): `node dev/test/contest-thitam-video.js <root> <out> <tag>`.

## Videos (CDN review folder img/_review/contest-thitam/)
- Branch Fold 755x1000: https://ctm-img.victoria-tntt.workers.dev/img/_review/contest-thitam/branch-fold-755x1000.webm
  (Dự thi thơ → first place → «Kính sự phòng báo tin: tối nay ngài truyền ngươi thị tẩm» → Sang buổi ×3 → Sang ngày mới → Chuẩn bị thị tẩm
  → Đêm thị tẩm ×2; no flip choice; her nights +1)
- Branch iPad 1180x820: https://ctm-img.victoria-tntt.workers.dev/img/_review/contest-thitam/branch-ipad-1180x820.webm (same flow)
- LIVE Fold 755x1000: https://ctm-img.victoria-tntt.workers.dev/img/_review/contest-thitam/live-fold-755x1000.webm (she wins, no card; the
  tablet decides — this run it happened to turn hers)
- LIVE iPad 1180x820: https://ctm-img.victoria-tntt.workers.dev/img/_review/contest-thitam/live-ipad-1180x820.webm (she wins, no card,
  another consort's card turned → the flip choice → no night)
Note: the video driver stops at the night-end kit scene («Đêm êm đềm / lạnh nhạt», tap-to-close) — the same on LIVE; a harness limit,
not a stall (the player taps the scene).

## Decisions for the reviewer / sếp
- GUARANTEED night (no steal on it): the Emperor himself keeps it, like his own visit. Two-way: an NPC winner's night cannot be stolen by
  her either. (Alternative not built: hand the tablet to the winner but keep the 10-second steal choice.)
- Tuyển tú first place: not wired (no thẻ bài before sắc phong).

## Files
dev/build/jctn.js (new) · j71.js · j8.js · j34.js · jts.js · j67.js · jbal2.js (BAL.ctn) · assemble.py (+jctn last) · dev/site/CHANGE.txt ·
index.html / sw.js rebuilt · dev/tools/contest-thitam-scan.py · dev/test/contest-thitam.js · coop-contest-thitam.js · contest-thitam-video.js

## RV-FIX after BIG rv FAIL fcd5c086 (reviewer session_01D3E3NXwED3bj8Xfp41CezN, report review/contest-thitam-rv 200f59ac) — pushed ab9e28b0
1. LAW 11 missed kinds → wired: Xuân thí round thd_tho_7 (her win; NPC {v} win = two-way), Xuân thí final board thd_tho_10 (her win; {v}),
   Hội bắn xuân bd_san_9 (ONLY her own last shot: option flag f "ctnself"; the prince's shot gives no night — tested). ctnWin is called
   BEFORE rdOan there (the arc ending is called as E.go(A): G is absent). Scan widened: M3b = any «đứng đầu / thắng hội» beside
   thi / bảng / khảo / hội / vòng / bắn in story / road files (j67, jrd_*, jgedata*, jkc*, jroad*) must be a KIND row or an IGNORE entry with
   its reason. Result: 27 kinds · 13 wired (LIVE 0) · 14 excluded with reasons (khuê các home road, jpma duel, j31 Hội Phượng try, jexam,
   thd_tro scholars, thd_hoc / j53 / j54 / j67 children, bd_soi polo, bd_hen wrestling, tuyển tú, cung nữ khảo việc, jcui prize table) · 0 unknown.
2. Night gain cut by the kit hint → the night is printed FIRST among each card's gains (`ctnF()` «đêm ấy được thị tẩm, …»): kitHint levels
   0/1/2 all read «đêm ấy được thị tẩm, đoạt giải, được để mắt; nhưng chuốc lòng ghen» (test out.hint). No kit change, no KIT REQUEST.
3. «đêm ấy» on every entry card (j71 sign-up / invitation / feast / festival day, jts, j34). The night card itself (shown on the contest
   day) keeps «tối nay»; the summons at night (PEND.ctnsum) «đêm nay».
4. Order: her «Kính sự phòng báo tin» card waits until the contest's own result is off screen (kit result toast #rtoast «KẾT QUẢ», podium
   #kpodov, the #kg82 board, S.mg), at least BAL.ctn.waitMs = 1500 ms; the result toast's «Được» row lists «đêm ấy được thị tẩm» (same kit
   item markup). Bots (window.__bot): at once (tests). Co-op guest «ok» relay: same deferral.
Tests after the fix: `node dev/test/contest-thitam.js` branch 21/21 (LIVE 0/21 expected), prince shot → no night, hint shows the night.

## HANDOVER (D3 rolled over at 47 % context; START_CTX ~3 %; depth 2) — the COORDINATOR opens the successor
Branch review/contest-thitam @ ab9e28b0 (LIVE 6b5d3d05 merged at 420ea238; site rebuilt at ab9e28b0). What is LEFT:
a. Re-record the branch real-tap videos (order fix 4 + card fix 2 must be visible): `DEVS=fold,ipadAir node dev/test/contest-thitam-video.js
   <worktree root> <out> branch` (built root index.html), look at the frames (invite card shows «đêm ấy được thị tẩm» first; KẾT QUẢ toast
   with the night in Được BEFORE «Kính sự phòng báo tin»), copy to img/_review/contest-thitam/branch-{fold-755x1000,ipad-1180x820}.webm,
   `python3 dev/site/cdn_sync.py img/_review/contest-thitam` (overwrites). LIVE videos there stay valid.
b. 1-year robot count (rv advisory): `node dev/test/contest-thitam-year.js <url> 4 36` on LIVE and branch builds (was running when I
   rolled; outputs lost with this box) → put the mean nights / ctnMe / ctnNpc table here for sếp.
c. Co-op re-run on the final build: `node dev/test/coop-contest-thitam.js <out>` and `C4FIRST=1 …` (see «Co-op result»; harness caveats:
   ledger extra nights, the «Lễ Phật đản ×2» week-driver stall). A LIVE-build run of the same driver was in progress to see if that
   stall is pre-existing (copy the test into a LIVE worktree and run it; look at «week merged once» lines).
d. quickcheck on the final sha (bash dev/tools/quickcheck.sh; give it > 20 min, the selection-reroll step is slow); dialog-fixed FAIL is
   pre-existing on LIVE.
e. Send the re-review to the SAME reviewer session_01D3E3NXwED3bj8Xfp41CezN (ab9e28b0 + this section), then on PASS: «LAND READY
   review/contest-thitam <sha> (FF from LIVE)» + video URLs here, message Foreman D.
ROLLOVER (verbatim canon): "Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop." "Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker)." LINEAGE: "your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai."

## D3 #2 (session_01D3E3NZf6R8fMhpgSkgZZZG, depth 3, START_CTX ~3 %) — finish after the rv re-check
PRIORITY #1 CHECK: OD 26/11 D3 row | main LIVE 3af7896e (merged) | review/contest-thitam (this), review/contest-thitam-rv 5726f49a | claims D3 row.
1. NEW FIX (found while re-recording): the night item was NOT in the «KẾT QUẢ» toast's «Được» row on screen — the toast is painted
   after resultShow returns, so the old insert found no row (DOM probe: «Được | Sủng +3 | Danh +3»). jctn now tags the toast on the card's
   300 ms tick (tagToast, data-ctn, re-adds if the toast is repainted). After: «Được | đêm ấy được thị tẩm | Sủng +4 | Danh +3». (32bdeda4)
2. LIVE 3af7896e (DRESS stack) merged (1485a122): only conflicts = built files + CHANGE line (this branch's line kept; site rebuilt).
3. Logic `node dev/test/contest-thitam.js` on the merged build: 21/21, prince shot → no night, 0 page errors; card hint starts «đêm ấy được thị tẩm».
4. Co-op 2 browsers (host Fold 755x1000 / guest iPad 1180x820, LIVE Worker): merged build 27/27 PASS (C1–C4); pre-merge build 27/27 (coopD).
   «Lễ Phật đản ×2» STALL = PRE-EXISTING, NOT this branch: the same driver on the bare LIVE build (6b5d3d05) stalls the same way at C3/C4
   (host queue «Lễ Phật đản, Lễ Phật đản», week not merged). Real cause (screens of the stuck seat): the GUEST sat in the jts Hội phối đồ
   screens of the kg82 frame («Điểm trang: Trước gương đồng» → its result «Đã hiểu», «Phối đồ: Đề …») that the shared bot helper could not
   leave. dev/test/lib/coop-clear.js step 5 now also taps «Bỏ qua» / «Đã hiểu» of any visible kg82 frame (#kg82 .kg82act) → weeks merge.
   Side note for the kit owner (not this branch, LIVE too): the «Phối đồ» dressing screen showed its main red button with only «•» as label.
5. 1-year robot (`node dev/test/contest-thitam-year.js <url> N 36`; robot ends contest mini-games by the contest's own «not played» score,
   she enters every contest she is invited to; 16 lives each, 36 tuần = 1 year):
   | build | her nights / year (mean, sd) | her first places | NPC first places | nights kept by the rule: her / NPC |
   |---|---|---|---|---|
   | LIVE 6b5d3d05 | 10.2 (sd 6.2) | 2.3 | 5.3 | — |
   | branch 32bdeda4 | 10.6 (sd 5.0) | 1.9 | 5.1 | 1.9 / 4.4 |
   Net ≈ +0.4 night / year (inside the noise). Why: two-way (law 1) — she gets ~2 promised nights a year, but NPC first places (~4.4 / year)
   now also keep those tối for the NPC winner, and on those days her normal tablet chance is gone. FOR SẾP / FOREMAN D: the rule alone does
   not raise her lật thẻ rate much unless she wins more contests (her own play: mini-game score) — the gain is real for a player who wins.
6. Real-tap videos (merged build 1485a122, HOST mode, only real taps after the invitation set-up), frames looked at:
   - Fold 755x1000: https://ctm-img.victoria-tntt.workers.dev/img/_review/contest-thitam/branch-fold-755x1000.webm
     entry card «Dự thi thơ … ĐƯỢC đêm ấy được thị tẩm, đoạt giải…» (t≈24 s) → KẾT QUẢ «Được: đêm ấy được thị tẩm, Sủng +4, Danh +3»
     (t≈29–35 s) → Sang buổi → «Kính sự phòng báo tin» (t≈38 s) → … → Chuẩn bị thị tẩm → Đêm thị tẩm; no flip choice; her nights +1.
   - iPad 1180x820: https://ctm-img.victoria-tntt.workers.dev/img/_review/contest-thitam/branch-ipad-1180x820.webm
     entry card → KẾT QUẢ with the night (t≈22 s) → Rương bảo vật (his bestow) → «Kính sự phòng báo tin» (t≈32 s) → night.
   - jts «Tự tay phối đồ» card (Được: «đứng đầu: đêm ấy được thị tẩm, Sủng +4, Danh +3, một món ban thưởng»):
     https://ctm-img.victoria-tntt.workers.dev/img/_review/contest-thitam/branch-fold-jts-card.png ·
     https://ctm-img.victoria-tntt.workers.dev/img/_review/contest-thitam/branch-ipad-jts-card.png
   LIVE videos (unchanged rule on LIVE) stay in the same folder.
7. quickcheck on 1485a122: running at push time (result follows in the message to the reviewer / Foreman D).
STATUS D3 #2: READY FOR FINAL RE-REVIEW (same reviewer session_01D3E3NXwED3bj8Xfp41CezN).

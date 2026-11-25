# coop-night-live — LIVE main coop-night FAILS by itself (B co-op fixer, opus, session_01N1tNP4dE81jb4QnAnmVdTX; START_CTX ≈4 %)

PRIORITY #1 CHECK ('coop-night jdayq'): OD 0 | ledger 0 | claims mine | main dev/build/jdayq.js (DAYQ-3 c045be9e) | review/* no sangbuoi-held-fix branch pushed; day-queue-2* = the source of DAYQ-3.

Branch: review/coop-night-live — head 02d99eea (from LIVE main 9f72524b; main unchanged at 15:42Z, nothing to merge).

## Root cause (proven with dumps)
DAYQ-3 c045be9e runs jdayq gate (c) «nothing painted inside an activity» in a co-op room. coop-night's bot taps «Tự tay phối đồ» → the «Phối đồ» board
(jts tsDressGame, kg82, «không giới hạn», NO S.mg) stays open. Every room card after that is held HIDDEN in Q (DQ.stat.actHeld 47/50 on the seat).
The room's gates wait on Q (sendEnd / nextBuoi / dueTick: `!Q.length`), and its bounds can't see a hidden card (autoRead needs a visible #modal;
nightAfk only at tối) → her week end never goes (LIVE dump: host 3:0 pend, room 3:3), partner «Chờ hảo hữu…», everything after case 4 cascades.
Same for a REAL player who leaves any no-clock board open (AFK): the room froze for ever. Pre-jdayq the card painted over the board.

## Fix (whole family of gate (c) points)
- jdayq.js: `dqRoomOwes()` = in a room, the room waits on her seat (CW.pend week end pending, pendBuoi, bend, nReady, room clock out on her buổi =
  new `CW.tm.od()` in jcooptimer.js). `dqHoldC() = dqUiC() && !dqRoomOwes()` replaces dqUiC at: showModal hold, dqPull, dqArmModal tick, the
  activity-gone observer. While her buổi is open the card still waits (v9 rule kept in a room); once the room waits on her it is shown as before
  DAYQ-3 so the room's own bounds work. kmFree hold (c) stays dqUiC (kit scenes never gate the room week; releasing it reordered a scene inside
  the Ready tap → coop-e2e SWAP0 «week after rebirth advances» 3/3 FAIL; kept → 2/2 + suite PASS). Solo: unchanged (dqRoomOwes false outside a room).
- Family table (jdayq gates vs a co-op seat): (a) nextBuoi hold — solo only (dqUi) · (b) dawn/news/newsHold — solo only · (c) showModal / dqPull /
  dqArmModal / observer — FIXED (release when the room waits) · (c) kmFree — unchanged (does not gate the room) · kitModal user / dfOpen / kmOnReset — no hold.
- Harness (test-only, LAW 11 with DAYQ-4's podium step): dev/test/lib/coop-clear.js 5b taps any kg82 board's «Bỏ qua» (.kquick, e.g. #tsdskip),
  5c taps a board's one-road result («Đã hiểu» #toildone; #ov is position:fixed → visibility by client rects). Every co-op bot uses it.
- New test case: dev/test/dayq-hold-coop.js «R (no-clock board)» on both seats: card waits behind the board while her buổi is open; room clock out →
  card shown over the board; week merges. coop-night.js: failure dumps carry jdayq / week-end state + one soonEnd poke (debug only).

## Gates
| gate | bare LIVE 9f72524b | fix |
|---|---|---|
| dayq-hold-coop (new case R) | FAIL 2/23 (×2) | PASS 23/23 (SWAP 0 and 1, earlier heads) |
| coop-night, LIVE Worker | 4da55ce8 13 FAIL (rv); mine 9 FAIL / 38 ok (cascade from case 3/4) | 02d99eea: 112/112 ×3 |
| coop-night, local Worker (wrangler dev :8797) | – | 02d99eea: 112/112, 112/112, (3rd: see below) |
| coop-e2e SWAP0 | 142/142 | earlier head 141/14x ×3 → kmFree kept → 142/142 ×2; suite: see below |
| km-red-end / coop-cal-rebirth (fix-5 / fix-6 tests, their code NOT on main) | FAIL 1 / FAIL 31/51 | FAIL 2 / FAIL 21/51 (same families; expected until fix-5/6 land) |
| coop-one-world (quickcheck G4) | – | one FAIL once, then 4/4 PASS (seeds 7,3 ×2) |
| dayq-hold (solo) | – | PASS 46 cases |
| dayq-order (solo) | – | 1 iPad FAIL once («card over title card»), then PASS ×2 |
| quickcheck alone, old save | – | PASS (core) on earlier head; suite: see below |
Earlier-head flakes (not seen on 02d99eea so far): coop-night case 2 «guest pend, Q empty» once (same shape seen once on bare LIVE); case 4b «host can't press» once (no jdayq hold involved).
Final suite on 02d99eea (one test at a time): coop-night LIVE Worker 112/112 ×3, local Worker 112/112, 112/112, 111/111 · coop-e2e SWAP0 142/142 ×2 (+2 more 142/142 on the same jdayq), SWAP1 142/142 · keymove 12/12 · dayq-hold PASS 46 · dayq-order PASS · dayq-hold-coop SWAP0 23/23, SWAP1 22/22 · quickcheck ALONE PASS (old save ok, core gates PASS) · km-red-end FAIL 1 (= bare LIVE, fix-5 not on main) · coop-cal-rebirth: fix 13 ok/18 FAIL ×2 vs bare 13/18 and 18/17 — same cause-4 stuck family on both (fix-6 not on main), no difference from this branch.

**SẴN SÀNG KIỂM review/coop-night-live 02d99eeac5e217bd37da25d9798de50123172106 FOR FOREMAN B (FOR MAIN 140)** — main still 9f72524b at 17:2xZ (no merge needed); index.html/sw.js rebuilt. Reviewer: run coop-night ×3 (LIVE + local Worker) beside a bare-LIVE coop-night, dayq-hold-coop bare vs fix, coop-e2e SWAP0/1, dayq-hold/dayq-order (solo unchanged).

## HANDOVER (ctx ≈31 % > START 4 % + 25 %)
If this seat stops before the suite ends: successor checks out review/coop-night-live 02d99eea, builds (python3 dev/build/assemble.py; site already rebuilt),
runs the remaining gates above one by one (never two co-op tests at once on 4 cores), local Worker per thin.md fix-5 handover (wrangler dev :8797 from
coop/worker with node_modules symlink, remove it before commit), merges newest LIVE if main moved, then posts SSK.

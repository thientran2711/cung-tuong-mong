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

## Merged head aacc248a (= 02d99eea + LIVE 17dfa64d; LIVE's jdayq additions are solo-only, no overlap)
coop-night LIVE Worker 112/112 · local Worker 111/112 (case 4 «host presses, guest AFK»: host buổi 0, CW.pend true, sent 2, Q carried — the «pend, nothing re-checks» shape the BIG rv found; fixed by rv's tryEnd line, review/coop-night-live-rv 217cbed8) · dayq-hold-coop 23/23 · coop-e2e SWAP0 142/142, SWAP1 142/142 · dayq-hold PASS 46 · dayq-order PASS · quickcheck alone PASS core (G4 coop-one-world «merge differs» once; re-run seeds 7,3 PASS — same flake seen on 02d99eea, 4/4 PASS then).
Fixer review of rv's tryEnd line (`onBuoi(CW.pendBuoi);soonEnd();return`): cause agreed; no double send (sendEnd guards sent===wk, cyHer, resWait). Risk: onBuoi returns early without clearing pendBuoi when eW() (thin level 5) → soonEnd↔tryEnd setTimeout(0) hot loop → suggested `if(!CW.pendBuoi)soonEnd()`.
**SẴN SÀNG KIỂM review/coop-night-live aacc248a05bb9caf070a8e8531625ca1213539e2 (jdayq part) — candidate for landing = rv's review/coop-night-live-rv (aacc248a + tryEnd line) FOR FOREMAN B / FOR MAIN 144.**

## REVIEW (BIG reviewer, session_01N1tNP5h1rt4Z5947oiDeqt, opus, depth 5, START_CTX ~6 %) — 25/11 21:40Z
PRIORITY #1 CHECK ('coop-night-live'): OD 0 | ledger 0 | claims 8 (fixer dE81jb4Q + this seat) | main 0 | review/* review/coop-night-live (this) | archive 0 — reused the fixer report + harness; no rebuild of existing parts.

**VERDICT: PASS on review/coop-night-live-rv eb6e15fed24c686a375c5bbe9c3b0b23d824f629** (aacc248a + one reviewer line). Per Foreman B child 5 it lands ONLY through the union **review/coop-week-wait-rv 8e654ee0** (= robot-coop-fix-6 + eb6e15fe + coop-week-wait); confirmation gates on 8e654ee0 below all PASS.

Reviewer fix (LAW 11, whole family): jcoopworld `tryEnd` returned after `onBuoi(CW.pendBuoi)` without the week-end check → a seat with CW.pend + Q empty sat on «Chờ hảo hữu…» until the next render (my coop-night LIVE #1 on aacc248a: case 5 [5,5,5], last trace `onBuoi 5.1 Q4 → onBuoi 5.1 Q0`; one soonEnd poke merged both; the fixer saw the same shape in case 4 local + case 2/3 earlier). Now `onBuoi(CW.pendBuoi);if(!CW.pendBuoi)soonEnd();return` (guard from the fixer's review: no setTimeout(0) loop when onBuoi returns early on eW / !S). Family scan of tryEnd's returns: resWait re-polls, wantB drops on pend → only member. In the union, fix-6's `Q.every(passive)` condition keeps this guard (8e654ee0 has it once).

Code read: ONE hold rule (law 11) — every gate (c) point in jdayq (showModal, dqPull, dqArmModal tick, observer) uses dqHoldC = dqUiC && !dqRoomOwes; kmFree stays dqUiC (kit scenes never gate the room week — reasoned and gated by e2e). No hold/release of the night or day queue elsewhere (jcoopworld / jcooptimer / worker only read Q). dqRoomOwes reads CW.pend/pendBuoi/bend/nReady/tm.od (overdue = due===myKey||pendBuoi); nit (not blocking): CW.ngoW===wk is not in it, a held card then waits until the room clock runs out (bounded). Solo: dqRoomOwes false outside a room → LIVE's button-crawl-fix-5/6 + m-fix-1 jdayq code unchanged (next-dead / q-softlock / dayq-hold PASS). Save/snap: nothing written by the change. Laws: 1/2/3/5/6 n.a.; 4 no number; 7 no new player words; 9/10 no UI part (the held card shows in its own kit frame); 11 family tables above + fixer's; 12 shots Fold + iPad below.

| gate | bare LIVE 17dfa64d | aacc248a | eb6e15fe | union 8e654ee0 |
|---|---|---|---|---|
| coop-night LIVE Worker | FAIL case 4 + 4b cascade (Q 2 held, «Chờ hảo hữu…») | 111/112 (case 5 tryEnd) | 112/112 ×3 | (Foreman B: 127/127) |
| coop-night local Worker (wrangler :8797) | – | 112/112 | 112/112 ×3 | – |
| MUTATE dqRoomOwes→false | – | dhc FAIL 2/23 (R both seats); coop-night 111/112 (weak: harness 5b closes boards) | – | – |
| dayq-hold-coop | FAIL 2/23 (R both) | – | 23/23 SWAP0, 23/23 SWAP1 | 23/23 |
| coop-e2e | – | – | 142/142 SWAP0, 142/142 SWAP1 | – |
| keymove | – | 12/12 | 12/12 | – |
| dayq-hold (solo) | – | – | PASS 46 | – |
| dayq-order (solo) | FAIL 1 «card painted over the title card» (Fold) | – | FAIL 2 same message (Fold + iPad) | – |
| next-dead / q-softlock (fix-5/6 solo) | – | – | PASS / PASS | PASS / PASS |
| quickcheck ALONE | G4 button-crawl same FAIL | – | old save ok, perf new/live render 318/282 tab 606/660 buổi 1643/3157; CORE FAIL only G4 button-crawl «fold · Ô lưu · Lui · close did not close its layer» | – |
| real 2-seat, 2 nights (reviewer script, not committed) | – | – | – | PASS 18/18 |

Real 2-seat (host Fold 755x1000, guest iPad 1180x820, LIVE Worker): night 1 the guest opens the «Phối đồ» board at tối and leaves it open, host Sẵn sàng («Chờ hảo hữu…»), room clock runs out → the held cards («Áo trái mùa», kit BÁO frame) are painted OVER the open board, she answers them, both reach the next week. Night 2 board open, host ready, guest leaves and rejoins the room mid-night (?room=code, as coop-night case 5) → back at the same tối, presses, both one week on, same date. Shots looked at (N1 card-over-board iPad, N1 host Fold, N2 after-rejoin iPad, N2 after host Fold): no overflow, no cut text, kit frames.

PRE-EXISTING on LIVE (not this branch, FOR MAIN):
1. quickcheck G4 button-crawl «Ô lưu → Lui does not close its layer» (title screen, solo) — reproduced on bare 17dfa64d; red on every candidate's quickcheck until filed / fixed.
2. dayq-order «card painted over the title card: Tin trong cung buổi này» — reproduced on bare 17dfa64d (solo).
3. A seat fully AFK with a card that arrives AFTER her night (CW.pend phase) holds the room for ever: nightAfk needs !CW.pend, sendEnd needs Q empty (jcooptimer / jcoopworld, untouched here). Pre-DAYQ-3 the same; bare LIVE worse (card hidden). Seen in my first 2-seat run (guest strictly AFK 120 s: «Hội phối đồ: báo đề», «Áo trái mùa» on screen, both «Chờ hảo hữu…»). A present player is never stuck. Park for a co-op bound (OD needed: auto-read / carry after the night?).
4. Plain page reload in a room drops ?room= from the URL → the seat lands in its solo game until it rejoins with the code (coop-night case 5 rejoins the same way).
Shots: scratch only (none in git, no CDN folder made). Reviewer worktrees + local Worker removed.

PRIORITY #1 CHECK: grepped OWNER_DECISIONS / OWNER_LEDGER / HANDOVER / PROGRESS for dayq-hold, kmFree, dqHoldC, dqRoomOwes, no-clock, «Phối đồ»; git grep origin/main + origin/review/* for dqRoomOwes / dqHoldC / kmFree hold: the room-owes release (review/coop-night-live, dayq gate c) exists for showModal / dqPull / re-arm / observer, NOT for the kmFree scene hold — reused dqHoldC as is, nothing new invented. CLAIMS + FOREMAN_B_STATUS read: no other worker on jdayq kmFree.

# coop-dayq-noclock — report (fixer, Foreman B)

Branch `review/coop-dayq-noclock` on `coop-afk-l13-r4` ddccdf30. Head: c32160d8a1a949205cb265e0489794fdf5eefb46.
Commits: 073934eb (fix + test + scan), cfb930af (site rebuilt), c32160d8 (test R window).

## (a) Verdict: REAL player fault (plus a harness window that hid it / then reddened the fix)
Reproduced on Fold host 755x1000 + iPad guest 1180x820, both seatings, starting at tối (`DQ_AT=3`): base/r4 code SWAP 1 1 red / 2 R rows, SWAP 0 2 red / 2.

Root cause (a deadlock of two holds):
1. at an overdue / committed tối with the «Phối đồ» board open (tsDressGame / kg82, no clock), the night flip scene (jflip `kcf`, pushed through j93 kmPush/kmFree) waited in jdayq's kmFree wrapper on the board — that hold used `dqUiC()` (any activity open), not `dqHoldC()` (activity open AND the room does not wait on her);
2. jnf's showModal gate holds every card while a flip scene is queued and unstarted;
3. so nothing reached her screen until jnf's CAP dropped the scene (~30 s) and `nightAfk` carried her cards: her flip never played, the partner sat on «Chờ hảo hữu…».

Fix (dev/build/jdayq.js, one guard): the kmFree hold uses `dqHoldC()` like the other four gate-(c) holds. Once the room waits on her seat (`dqRoomOwes`: pend / pendBuoi / bend / nReady / tm.od) the scene starts over the board, she taps it, the choice and the cards follow over the board. Shots: Kính sự phòng flip choice and «Tin báo» over the board.

## (b) Why head reds more often
Row R only reds when her clock runs out AT tối while the board is open (earlier buổi time-ups step the buổi and carry passive cards by design — no flip). Which buổi R starts at, and whether the tối time-up lands inside the test's window, is pure timing (load). Measured the same way (same test copy, SWAP 1, 12 runs each, run 2 streams in parallel):

| code | runs | R red | note |
|---|---|---|---|
| base 62ac32c2 | 12 | 2 | both at buổi 3, od true, cards never shown |
| r4 ddccdf30 | 12 | 0 | |

So the head-vs-base gap of the finding (7/12 vs 1/8) did not reproduce: both carry the same fault (law 11 scan: both FAIL 1 on kmFree); the rate is a function of how often R reaches the tối time-up inside its window, i.e. runner load and start buổi, not of r4's own change.

## (c) LAW 11 — every card / modal / scene that can sit behind the co-op board or the night commit
Scan `dev/test/dayq-room-holds-scan.py` (static: every gate-(c) hold point must be guarded by dqHoldC):

| hold (gate c) | before | after |
|---|---|---|
| showModal: queued card behind an activity | dqHoldC | keep |
| dqPull: card painted in the same tap taken back | dqHoldC | keep |
| dqArmModal tick re-arm | dqHoldC | keep |
| MutationObserver: activity gone → paint | dqHoldC | keep |
| kmFree: kit motion scene (flip, seal, reward…) behind #ov / DF.play | **dqUiC** | **FIX → dqHoldC** |

fix PASS 5/5; r4 FAIL 1; base FAIL 1; MUTATE (kmFree back to dqUiC) FAIL 1.

Room-owes states that release the holds (dqRoomOwes) — dayq, night, week end, selection days:

| state | covers | verdict |
|---|---|---|
| COOPW.pend | week end pending (Sẵn sàng sent), selection days' week end | keep |
| COOPW.pendBuoi | a real choice holding her buổi step, selection days | keep |
| COOPW.bend | her buổi end in progress | keep |
| nReady() | night ready / committed for the room | keep |
| tm.od() | her room clock ran out (any buổi; at tối = night commit) | keep |
| committed night, NOT overdue (partner's end out first) | her own clock still runs and bounds it | keep (no change; a tried `tm.wait` extra was reverted — law 16 minimal) |

## (d) Harness
- Test R now steps to a start buổi (`DQ_AT`), taps the night scene as a player does, asserts the card came to her screen and was NOT carried by the AFK bound (`tm.naf().carried` unchanged), fail dump with clock state (tm.view / dbg / lens).
- After the fix, 6 / 24 still red — all host starting at sáng. Clock dump: lens 0:0 10.2 s, 0:1 9.8 s, 0:2 9.7 s, tối clock up at ~39.4 s, the night scene came and was tapped, the test's 40 s window (counted from the clock cut) ended ~1 s later. Game not stuck. Test fixed: 40 s counted from HER tối time-up, cap 120 s (c32160d8).

## Gates (fix head)
| gate | result |
|---|---|
| dayq-hold-coop SWAP 0 ×12 (live Worker, original start) | 12/12 PASS (25/25 each) |
| dayq-hold-coop SWAP 1 ×12 | 12/12 PASS |
| dayq-hold-coop DQ_AT=3 R only, SWAP 0 / SWAP 1 | 15/15 + 15/15 PASS |
| base / r4 rate (same test) | 2/12 / 0/12 R red → fix 0/24 |
| MUTATE kmFree→dqUiC, DQ_AT=3 R | SWAP 1 FAIL 2 (host+guest), SWAP 0 FAIL 1 (guest): cards carried by AFK, never shown |
| coop-afk-l13 RELOAD h THIN13 SWAP 0 / SWAP 1 | 25/25 / 25/25 (alone; 20/23 under load) |
| coop-afk-l13 RELOAD g THIN13 SWAP 0 / SWAP 1 | 26/26 / 26/26 |
| coop-night THIN13 / THIN0 | 126/126 (alone) / 127/127 |
| coop-e2e SWAP 0 / SWAP 1 | 143/143 / 143/143 |
| coop-week-wait SWAP 0 / SWAP 1 | 34/34 / 34/34 (alone; known A2 flake under load) |
| coop-cal-rebirth | flaky ~50% on BOTH r4 and fix (r4: 1 PASS 1 FAIL; fix live: 1 PASS 1 FAIL) → pre-existing, leftover |
| coop-keymove-unit | 12/12 |
| sangbuoi-held | ALL PASS (alone) |
| worker npm test | ALL OK |
| quickcheck (alone) | core PASS (open 2376 ms, old save ok, perf new/live render 259/234, tab 654/602, buổi 1606/1486); G4 crawl 1 fault «Ô lưu · Lui» on Fold title screen — SAME fault on r4 ddccdf30 (run alone the same way) → pre-existing, leftover |

## Shots / video
CDN img/_review/coop-dayq-noclock/: swap0-fold-host-flip-choice-over-board.png, swap0-fold-host-card-over-board.png, swap0-ipad-guest-tinbao-over-board.png, swap1-fold-guest-flip-choice-over-board.png, swap1-fold-guest-card-over-board.png, swap1-ipad-host-tinbao-over-board.png (Kính sự phòng flip choice / «Tin báo» over the «Phối đồ» board, start at tối) — looked at 3×.

## Laws touched
Law 11 (family fix + scan + before/after table), law 16 (minimal change: one guard), PRIORITY #1 (reused dqHoldC), test law (MUTATE proves the row), shots on CDN not git, English in repo.

## Leftovers
- coop-cal-rebirth ~50% flaky on r4 and fix alike (stuck week step from warm-up); not caused by this branch — needs its own brief.
- RV-173 («Dưỡng Tú viện» queued card never renders, co-op week 0): not seen in any of my traces (grep over ~80 logs: 0 hits).
- quickcheck G4 «Ô lưu · Lui» close fault on Fold title screen: same on r4 → pre-existing.
- Under 4-core load (2 co-op streams) afk-l13 / coop-night / week-wait show single reds that pass alone.

## Handover
Work complete; no successor needed. Worktrees and the local Worker cleaned up.

## REVIEW (B BIG REVIEWER session_01N1tNP5GZwGB897F2q6s8zi, opus, fresh, depth 7) — PASS c32160d8a1a949205cb265e0489794fdf5eefb46
PRIORITY #1 CHECK: brief's line (OD 0 | ledger 0 | claims B only | main 0 | review/* this branch only); git grep dqHoldC / dqRoomOwes / kmFree on origin/main + review/*: only jdayq on this chain; the fix reuses dqHoldC (no new state).
KIT CHECK: no UI change (one guard in jdayq + test + scan); kit-std-scan not needed (no frame/row/chip touched); shots show only existing kit cards (Kính sự phòng flip choice, «Tin báo») over the existing «Phối đồ» board.
Laws touched: 1 (two-way: both seatings same rule, SWAP0/SWAP1 PASS) · 6c (nothing lost/given twice: test asserts the shown card was NOT also carried, naf().carried unchanged) · 11 (family scan 5/5, no 6th hold) · 12 (Fold 755x1000 + iPad 1180x820, looked 3×) · 16 (minimal: one guard). Solo unchanged: dqRoomOwes() is false outside a room (COOPW.on), so dqHoldC ≡ dqUiC solo.

(1) Diff vs ddccdf30 read hunk by hunk: jdayq.js one guard dqUiC()→dqHoldC() in the kmFree wrapper (+comment), test dayq-hold-coop.js (DQ_ONLY / DQ_AT / scene tap / 40 s from her tối time-up / carried check / fail dump), new scan, built index.html/sw.js/assets.json. The guard is now identical to the other four gate-(c) holds (showModal, dqPull, dqArmModal tick, MutationObserver). 6th-hold hunt: grep every dqUiC/dqHoldC/dqActEl/dqActBlocks/#ov hold in jdayq, jnf, jflip, jcoop*, jcooptimer — the rest of jdayq's holds are solo-only (dqUi: dawn/book, newsHold, dqFreeScreen, dqMgStale, dqNextCue) or painters (dqPaintQ); jflip busy() waits on #dawn/.kbk/title only (not the board); jnf's flip gate is bounded by its CAP; no other module calls the dayq holds. → none missed. Nit (no change asked): the «scene posted inside a tap waits one pump» sub-hold also moved under dqHoldC, so once the room owes her seat a tap-posted scene is not delayed 250 ms — consistent with the cards (they are painted at once in that state too), harmless.
(2) Harness window: 40 s counted from her tối time-up (S.buoi>=3 && tm.od() && due===myKey), cap 120 s. BAL.coopTm.nightMs = 30 s < 40 s, so a card hidden until the AFK bound is carried first → either never shown (sh false → FAIL) or shown after the carry (carried≠c0 → FAIL). Proof: MUTATE kmFree→dqUiC FAILs 6/6 runs and base ddccdf30 FAILs 6/6 runs (DQ_AT=3, Q empty, od true = carried by AFK).
(3)(4) see the table; both seatings, both seats; card shown once, not carried.
(5) Pre-existing claims, A/B myself on base ddccdf30 (local wrangler Worker of the head, coop/worker identical in base and head):
- coop-cal-rebirth: head 2/2 PASS (79/79); base 0/2 (73/7, 30/28) → flaky on base, not caused here (head not worse).
- quickcheck G4 «Ô lưu · Lui» close fault on the Fold title screen: SAME 1 fault on head and on base (run alone each) → pre-existing.
- coop-week-wait SWAP0 alone: head 2/5 PASS, base 1/3 PASS; every red is the same family on both (A1/A2/C: kbk true = Tuần lục book up with a hidden card, #ov not involved) → pre-existing flake, leftover. SWAP1 head 34/34.
(6) Real devices: Fold host 755x1000 + iPad guest 1180x820 (SWAP0) and iPad host + Fold guest (SWAP1), start at tối (DQ_AT=3): the night flip scene comes over the board, she taps it, the Kính sự phòng choice / «Tin báo» show over the «Phối đồ» board on both seats; both answer, the week merges. My shots (scratch, looked 3×): r-host-scene-1 / r-host-card / r-guest-card (SWAP0), r-guest-scene-1 / r-host-card / r-guest-card (SWAP1); fixer's CDN shots match (looked at 2 of 6). No cut text, no overflow, odds in words.

| gate (head c32160d8) | result |
|---|---|
| dayq-room-holds-scan.py | head PASS 5/5 · base FAIL 1 (kmFree dqUiC) · mutate FAIL 1 |
| dayq-hold-coop SWAP0 full ×12 (live Worker) | 12/12 PASS (25/25; one run 24/24: A1×S1 skip «no toil button», test's own skip) |
| dayq-hold-coop SWAP1 full ×12 | 12/12 PASS (25/25) |
| dayq-hold-coop DQ_AT=3 R only SWAP0 ×6 / SWAP1 ×6 | 6/6 + 6/6 PASS (15/15) |
| MUTATE kmFree→dqUiC, DQ_AT=3 R | SWAP0 3/3 FAIL (2,2,1 red) · SWAP1 3/3 FAIL (1 each) |
| base ddccdf30 (head's test), DQ_AT=3 R | SWAP0 3/3 FAIL · SWAP1 3/3 FAIL |
| coop-afk-l13 RELOAD h THIN13 SWAP0 / SWAP1 (local Worker, alone) | 25/25 / 25/25 |
| coop-afk-l13 RELOAD g THIN13 SWAP0 / SWAP1 (local Worker, alone) | 26/26 / 26/26 |
| coop-night THIN13 / THIN0 (live Worker) | 126/126 / 126/126 |
| coop-e2e SWAP0 / SWAP1 (live Worker, coop-clear as is) | 143/143 / 143/143 |
| coop-week-wait SWAP1 / SWAP0 (local Worker, alone) | 34/34 / 2 of 5 PASS (base 1 of 3, same reds) |
| coop-keymove-unit | 12/12 |
| sangbuoi-held | ALL PASS |
| worker npm test | ALL OK (both suites) |
| quickcheck alone | open 2336 ms, old save ok, perf new render 232 / tab 608 / buổi 2363 (live not measurable here: frame timeout), time-spill PASS; G4 1 fault «Ô lưu · Lui» = base |
Note for the lander: on the LIVE Worker coop-afk-l13 (h/g, both seatings) and coop-week-wait FAIL 18/23 and 30/34 — on BASE too (base afk-h alone 18/23); on the chain's own Worker (local wrangler dev) they PASS. The B co-op chain under this branch needs its Worker deploy (week-wait-land …); this branch adds no Worker change.
CDN img/_review/coop-dayq-noclock/ wiped (6 objects); scratch shots deleted. Worktrees removed.

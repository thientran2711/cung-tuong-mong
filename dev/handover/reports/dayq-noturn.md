# DAYQ-NOTURN — «Sang ngày mới» dead ×3 with one queued card (F flight2-s21g, LIVE 5fb13d60)

PRIORITY #1 CHECK ('modalHeld|noturn|Sang ngày mới dead|qsoftlock|kmRankCard|rk:1'): OD 0 | ledger 0 | main dev/build/jdayq.js:27,197 (hold path), dev/build/j93.js:42 kmRankCard (RANK SCREEN FIRST f70a75ba), dev/build/jnf.js night gate | review/* review/dayq-qsoftlock (LIVE, dqNewsPass = news-card member of this family), review/flight2-s21 99812ee6 (evidence) | claims none.
KIT CHECK: no UI / no kit part touched (paint order only). No player words added. No number added (bound = BAL.dayq.wake, law 4).

Branch `review/dayq-noturn` from LIVE origin/main 5fb13d60. Worker session_01Rc5AsHh5J6b18v3vQa4fHq.

## Root (captured, not guessed)
1. Evidence dumps: Q = 1, #modal hidden, «Sang ngày mới» ENABLED, dqActEl null, dqDawn false, dqFreeScreen true, DQ.mt armed (rearm counting) → a paint was attempted and swallowed by an inner showModal gate; the tap then hits jdayq nextBuoi `dqQHidden → dqPaintQ → return` = dead tap.
2. All three cards carry `rk` = "tsbAp" / "j95bRum" / "ap.svAsk" (+ `__held`, `__sp13`).
3. `dev/measure/sm-trace-build.py` (every showModal wrapper pushes its id) + `dev/measure/noturn-hunt.js` (robot-lite: random tabs / panel taps / «Sang buổi») reproduced it on LIVE in ~100 steps on BOTH devices: STUCK at bk 1.3 (evening), Q ["Việc của kẻ hầu"], tab open, nfX "open", KMQ 1, kmBusy false; every showModal trace ends in wrapper 57 = the **jnf night gate** (holds every card while the night flip is queued: `scene()`).
4. Why the queued flip never starts: **j93 `kmRankCard(m)` = `!!(m.rk || m.kit.rk)`** (RANK SCREEN FIRST). The rank marker is `rk:1`, but `m.rk` is ALSO the save recipe key that j3 `rcpReg` stamps on nearly every generated choice card. So every such card in Q made `kmRankWait()` true → every kit scene (the night flip, rewards, chests) waited → jnf held the card for that flip → mutual wait with nothing on screen, until jnf's CAP (choice.waitMs − choice.ms) dropped the flip. Robot taps inside that window = dead button.

## Fix (3 files, source only + site rebuilt)
| # | file | change |
|---|---|---|
| 1 | dev/build/j93.js | `kmRankMark(v)` = v===1‖v===true; `kmRankCard` reads only the marker on m.rk / m.kit.rk — a recipe key (string) is never a rank card. RANK SCREEN FIRST unchanged for real rank cards (j14 «Lãnh cung» / «Rời lãnh cung» kit.rk 1). |
| 2 | dev/build/jnf.js | `cfStuck()`: a flip that is only QUEUED (nothing on screen, no job running), older than BAL.dayq.wake, that the kit queue cannot start (kmFree false or kmRankWait) never holds a card in the night gate: the card paints; showChoice stays with step() (no choice put up early); the flip plays when the queue frees. Same family rule as Q-SOFTLOCK dqNewsPass, generalised. Covers a REAL rank card at night (rank card ⇄ flip mutual wait). Counter NFSTAT.cfStuck. |
| 3 | dev/build/jverdict.js | result-first dog: a held result card whose #rtoast keeps .on but is see-through (opacity < .05 = kit cardBox rule) for two dog ticks releases the held card (the capture showed `#rtoast.on` at opacity 0; vis() ignored opacity → an unbounded hold was possible). |

## LAW 11 — whole family: every gate that can keep a queued card hidden (scan `python3 dev/measure/noturn-gate-scan.py`)
The scan lists every showModal wrapper with an early return (25 hits; 17 are decorators that return the inner call = false positives). The real swallow gates, each with its hold and its release bound:
| gate | holds the card while | release / bound BEFORE | AFTER |
|---|---|---|---|
| j93 kmRankCard → kmRankWait (scene side) | ANY recipe card (m.rk string) in Q → all kit scenes wait | none of its own (only when the card shows) → with jnf: mutual wait | only rk:1 marker → recipe cards never hold scenes |
| jnf night gate scene() | flip queued or on screen | jnf CAP (waitMs−ms) then cfDrop | + not held when the queued flip cannot start for BAL.dayq.wake (cfStuck) |
| jverdict RF.held && vis() | a held result card «on screen» | dog: !vis() (display/visibility only) | + opacity < .05 for 2 ticks |
| jverdict RF.depth>0 | inside a choice runner | finally at the runner's end → showModal | unchanged (bounded) |
| jrbatch RB.d>0 | inside renderHold (nlAccept) | finally flush → showModal | unchanged (bounded) |
| jspread SP13.nb | inside nextBuoi | finally + sp13Tick → showModal | unchanged (bounded) |
| jdayq actHeld / modalHeld | activity / #dawn ON screen (on-screen rules r3/r4) | dqArmModal rearm + MutationObserver + dqWake 700 ms | unchanged (bounded) |
| jdfv __dfWait / jgreet __fcW | visitor face loading | ≤ 4 s poll / image onload+onerror | unchanged (bounded) |
| j68 evGate, jspread sp13Pre | — | take the card OUT of Q (no hidden card left; «Sang buổi» not blocked) | n/a |
m.rk readers on cards (same scan, 2nd half): j3/j68/jevc/jeitem/jqsave/jtsb/jagknow/jcooptimer read it as the RECIPE key (correct); jcycle/jcoopworld `c.rk` is a different object (cycle week); **j93 was the only reader treating it as the rank marker** → fixed.
Places (tabs, Sổ, kshR, kscn, co-op): dayq-noturn N1 walks every bottom tab (Hành sự, Dư đồ, Hậu cung, Giao tình, Hoàng tự, Tư trang, Tài nghệ, Mệnh truyện/Sổ ghi); jkstage (kscn) wrapper only clears classes (no swallow); co-op: jdayq gates are solo (dqUi); cfStuck is paint-only and safe on a seat.

## Before / after (dev/test/dayq-noturn.js, real taps)
| check | LIVE 5fb13d60 (before) | review/dayq-noturn (after) |
|---|---|---|
| robot-lite hunt (noturn-hunt.js, both devices) | STUCK ×2 in ~100 steps (trace ends in jnf gate; nfX open, KMQ 1) | used only as capture tool (the deterministic test below is the gate) |
| dayq-noturn N1 Fold / iPad (night flip queued + recipe card hidden + tab open, 3 taps) | FAIL: NOTHING on screen 5245 ms / 5221 ms after 3 taps (dead button), nfX open, KMQ 1, kmBusy false | flip on screen 975–1181 ms on every tab reached (Hành sự, Dư đồ, Hậu cung, Giao tình, Hoàng tự; both devices); card then shows, buổi turns |
| dayq-noturn N2 (REAL rank card + queued flip) | (mutual wait by construction) | PASS both devices: rank card on screen 2.1–2.9 s, then the flip, then the turn (one loaded run timed out the flip wait; widened, PASS alone) |
| sangbuoi-held A–L | — | Fold A–L ALL PASS; iPad A–E,G PASS, H FAIL in a 4-browser overloaded run → RERUN_I |
| dayq-break | FAIL 4 (S.mg row, data-coopWait solo row, both devices) | FAIL 4, the SAME rows (pre-existing, no worse) |
| q-softlock (G4 core gate) | FAIL 4 on Fold in a solo rerun (person view never opens: setup flake) | PASS (solo rerun); the quickcheck-run FAIL 4 was the same Fold setup flake |
| quickcheck --runs 5 | — | QUICKCHECK PASS (open 2034 ms, old save ok, perf median new/live render 255/216, tab 443/457, buổi 1607/1421, tasks>200ms 23/27); core gates FAIL only G4 q-softlock = flake above |
| dayq-hold-coop | COOP_OLD | host rows ok/skip; guest A3×S4 FAIL «activity not open at 400» in the overloaded run → COOP_NEW |
| coop-e2e | not run yet | not run yet (container restarted mid-run) |

## Handover / not done
- Old builds kept outside git (dev/index.old.html = LIVE 5fb13d60) only for the before column.
- Known, separate: a «Người bên cạnh» look-up card whose ✕ does nothing stalls tap-through bots (same row sangbuoi-held already notes); not this family, not touched.

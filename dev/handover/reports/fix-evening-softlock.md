# review/fix-evening-softlock — evening soft-lock «Sang ngày mới» does nothing (ROBOT-10 bug A)

PRIORITY #1 CHECK ('Sang ngày mới|soft-lock|softlock|nfX|nfch'): OD 3 | ledger 0 | claims 1 (this job, session_01964izCj26a6VP5u2Sr3qT5) | main: jnf.js night-flip choice (S.nfX state machine), jsmg.js steal game (render guard for st "mg" after reload already on LIVE, jsmg.js:134 — reused, not rebuilt) | review/* none.

SẴN SÀNG KIỂM review/fix-evening-softlock 8350d536538f6bea95a8841ba2090df75eb696a2

Base: LIVE origin/main 225c5c08. Size: BIG-by-script (time/buổi core), code change small: dev/build/jnf.js (+heal), dev/build/jsmg.js (+stealMgBusy), dev/test/night-softlock.js (new), dev/measure/scan-dayturn-holds.py + scan-pid-nopend.py (family scans), index.html + sw.js (build). Gates below ran on 3f5b3ebb; the two later commits add only the scan scripts.

## Root cause
At tối the jnf night flow (owner OD 16/11 22:45Z forced choice after the card flip) keeps its state in `S.nfX` = {d, st: wait|open|mg|done, dlg, me, …}. `S.nfX` is SAVED. What releases it is NOT:
- the choice card itself (Q pid `nfch`) has no PEND builder → `deserQ` drops it on every reload (save→load, the robot's round trip each buổi, an owner reload / app restart);
- her steal mini-game (jsmg `BUSY`, the j82 `#kg82` layer) is module state.
After a reload at the choice: `S.nfX={st:"open",dlg:1}`, Q empty. Every «Sang ngày mới» → jnf endTurn wrapper → `x.st!=="done"` → `hold()` (buổi stays tối, used 3) → `step()` skips the re-show because `x.dlg` is set → nothing, for ever (Q 0, no modal, no error, S.mg null, nfOn true) — exactly the robot's state.
Same hold when her steal game layer is closed without its onDone (j82 `kg82Close(true)`, e.g. another game layer opened over it): `BUSY` stays 1, so even the existing jsmg render guard (`!BUSY&&!PEND`) never lets `st:"mg"` go.

## Fix
- jnf `heal()` (runs at each press, in endTurn before the hold, and at each step tick): a choice whose card is gone is shown again (`dlg` cleared → step → showChoice, her 10 s clock anew); a steal game no longer running counts as over without a rung (`st` back to "open", her pick `x.me` kept → the one resolve). `window.nfHeal` exported for tests.
- jsmg `window.stealMgBusy()`: BUSY with no `#kg82` layer (and no test fake) is dropped; PEND (pick being recorded inside chooseM) counts as busy, so a game that really runs is never healed away.
- No rule, number, wording or UI changed (no kit part touched; no player-visible text).

## Whole family (LAW 11) — scan scripts (dev/measure/, re-runnable)
1. `python3 dev/measure/scan-dayturn-holds.py`: every endTurn / nextBuoi wrapper that can RETURN without calling through (a hold of the day turn): 23 found. Holds with an empty queue: only jnf.js:322 (this bug) and jcoopworld.js:1039 (co-op room wait: own timers/levels, coop-night 110/111). The rest return through, or return only while Q has a card (shown), or are mode switches (isSrv / isKc / co-op).
2. `python3 dev/measure/scan-pid-nopend.py`: Q cards pushed with a literal pid and no PEND builder (dropped on reload): `nfch` (jnf — a state waits on it → FIXED) and `entpick` (j95s — a picker she opened herself, no state waits on it → harmless, comes again on her tap).
3. Saved hold states of jnf: `wait` (released by step/openChoice at the press — OK), `open`+dlg (FIXED), `mg` after reload (LIVE jsmg render guard — OK), `mg` with BUSY stuck (FIXED), guest waits `nfW/nfFin` (finLate re-asks every choice.ms; host side now heals — OK).

| member | LIVE 225c5c08 | this branch |
|---|---|---|
| 1 reload at her attack choice (Tranh sủng/Chặn ngự giá/Thôi) | FAIL (stuck, 6 presses) | PASS |
| 2 reload while she is the flipped one (Giữ chân/Thôi) | FAIL | PASS |
| 3 reload inside her steal game (st mg) | PASS (jsmg guard) | PASS |
| 3b steal game layer closed without onDone | FAIL | PASS |
| 4 choice card dropped from Q at runtime | FAIL | PASS |
| 5 a steal game really running is not healed away | n/a (no probe) | PASS |
| 6 player mode: the choice dialog is on screen again after reload | FAIL | PASS |
| 7 20 days, save→reload at every tối press | FAIL (stuck day 0) | PASS |

## Gates
- `node dev/test/night-softlock.js [url]` (new regression test, default ../../index.html): 9/9 PASS; on LIVE 6 FAIL (table above).
- `bash dev/tools/quickcheck.sh`: QUICKCHECK PASS (core gates PASS incl. one-core-guard / rules-one-source / kit-conform; old save ok; perf median new/live render 198/221 ms, buổi 966/1133 ms, tasks>200ms 17/23).
- steal-mg-nf, night-final, night-multi, night-day: exit 0. night-steal-unit 29/29 (same as LIVE). coop-night 110/111 (only fail: CDN CORS console line in this sandbox, "host: no page errors").
- Pre-existing, not from this change: `night-steal-oldsave.js` FAILs on LIVE↔LIVE too (it expects an OLD build without BAL.steal; stale test).

## Robot repro
The robot's save (SAVE-A, nc / nc_gian / schemer, seed 110002505) was not yet forwarded when this was built; the repro is reproduced from the state the robot reported (Q 0, buổi 3, nfOn true, S.mg null) and the robot loop itself (case 7: save→reload round trip at each tối press). When SAVE-A arrives it can be checked with: load it, press «Sang ngày mới» until tối, press again → the choice shows, answer → new day.

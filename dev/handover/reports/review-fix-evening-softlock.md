# REVIEW fix-evening-softlock (Foreman D child, BIG time/buổi core) — reviewer session_01964izF9amWbvj8fxTZA1rG

PRIORITY #1 CHECK ('Sang ngày mới|soft-lock|softlock|nfX|nfch|FLIPQ'): OD 3 | ledger 0 | claims: worker Cj26a6VP (fix), this rv (F9amWbvj) | main: jnf.js S.nfX night-flip choice, jsmg.js steal game + its render guard (reused, not rebuilt) | review/*: review/fix-evening-softlock only.

Target: review/fix-evening-softlock 8350d536 → worker heads 2f3474d8 (case 1c) → f3d427a1 (robot-save-replay.js). Reviewed on review/fix-evening-softlock-rv = f3d427a1 + merge LIVE c39e5009 (d64a9499) + merges LIVE 17835565 → 16f5c1dc → e88b09b4 → bba42773 (HEAD 572805a9; LIVE kept moving during the review). Diff vs LIVE bba42773: jnf.js +13, jsmg.js +3, 2 scan scripts, night-softlock.js, robot-save-replay.js, index.html/sw.js build. No reviewer code change (merges + rebuild only; assets.json = LIVE).

## 1. Root cause — both robot findings
(a) «Kính sự phòng» choice card (Q pid `nfch`) has no PEND builder → deserQ drops it on every load, while `S.nfX {st:"open",dlg:1}` is saved → jnf endTurn wrapper → `hold()` at every press, step never re-shows (dlg set). CONFIRMED.
(b) Robot's "flip pending" load (FLIPQ WeakSet identity lost on deser): NOT a lock on its own — after deser FLIPQ is empty, the loaded flip card no longer holds step(); it shows (Q blocks the button until answered), then step → openChoice → the choice. The robot's own save (`dev/handover/robot/saves/proof-save-001-softlock-after-load.json`) holds exactly state (a): `nfX {st:"open",role:"def",dlg:1}`, `P [nfch]`.

Reviewer repro, REAL UI (player mode, Fold 755×1000, real `#next` clicks, real page reload + title «Tiếp tục kiếp này», up to 12 presses, dialogs/scenes/steal game/roulette cleared with their own buttons):
| save taken | LIVE | branch |
|---|---|---|
| right after the first tối press, flip scene on screen (nfX open, no dlg / cf busy) | 10/10 turned (no lock) | 10/10 turned |
| after the flip scene, choice dialog up (nfX open dlg 1, P [nfch]) | **4/4 STUCK** (12 presses, buổi 3, Q 0, no modal) | 4/4 turned: card shown again at press 1, answered once, day turns |
| robot SAVE-A via robot-save-replay.js | exit 1 (12 presses, not turned) | exit 0 (turned at press 2, nfX done) |

In-page bot matrix (ser→deser, 3 lives each, att + def): wait+flip card / wait / open-no-dlg / open-dlg / mg → LIVE locks only open-dlg (3/3); branch all 15 turn; `nfch` shown exactly once per night (0 for mg: her pick kept, one resolve).
Steal game path (jsmg): real-UI «Tranh sủng» → game layer #kg82 → ✕ → «Bỏ cuộc» → day turns (LIVE and branch); st "mg" after reload → one resolve, no rung; layer closed without onDone (3b) → healed; a game really running (#kg82 present / PEND) is never healed (case 5).

## 2. Whole family (LAW 11)
- scan-dayturn-holds.py: 23 wrappers; spot-checked 5 (j99succ:184 holds only while a succ card with PEND is in Q + showModal; jmen:157 returns only with Q filled + showModal; jaudit:6 passes through; j76:130 passes through; jcoopworld:1039 co-op room wait with own timers) — agree with the worker.
- scan-pid-nopend.py: nfch (fixed), entpick (player-opened picker, no state waits) — agree. Reviewer's broader scan (every `pid:"…"` literal vs PEND keys): adds only jhc relPerson pids me/emp/th (person keys, not cards).
- Identity-tracked queue items (every WeakSet/WeakMap in dev/build): only jnf FLIPQ orders a day-turn gate, and losing it only re-orders (above). IEV.claim (jitev) is synchronous try/finally; J95B.pend falls back to a recompute; IL_SENT / KNWQ / OWN_C don't touch the turn. Nothing else must survive deser.

## 3. No double effects, co-op, old saves
- Choice answered once (nfchShown 1), one night (night-day nights 1), day turns after 2 presses (1 to show, 1 to turn) — no extra buổi/khắc.
- coop-e2e: 2 FAILs in the first 5 runs on f3d427a1 («buổi 1:3 advanced for both»: host FRW held 120 s waiting for the guest's steal-game «up»; «week 2: fold advanced»). Checked as possible regression: LIVE 0/7; branch next 10 runs 10/10 clean, 4 of them traced (stealMgBusy wrapped in page): heal's game drop never fired in co-op play. By code heal cannot stop the guest's «up»/«ch» (herGame cb sends them whatever nfX.st is). Judged the known "advanced for both" flake family (npc-chain-land 3/9, dresscode 1/12 on LIVE-based builds). Total branch 15 runs: 13 clean. On the final merges: 141/141 ×2 (d64a9499) + see HEAD line.
- old save: quickcheck old save ok; robot save loads.

## 4. Gates
d64a9499 (= f3d427a1 + LIVE c39e5009): QUICKCHECK PASS (core gates PASS: one-core-guard · rules-one-source · kit-conform · hooks 7; time-spill PASS; old save ok; perf median new/live render 305/309 ms, tab 499/508, buổi 1452/1727, tasks>200ms 24/25) · night-softlock 10/10 · night-steal-unit 29/29 · night-final 11/11 · night-multi 8/8 · night-day ok · steal-mg-nf 11/11 · coop-night 112/112 · coop-e2e 141/141 ×2 · robot-save-replay A exit 0 (LIVE exit 1). No page errors anywhere.
83d8e65f (+ LIVE 17835565: co-op famops/offline): QUICKCHECK PASS (render 300/299, buổi 1487/1716) · night-softlock 10/10 · night-steal-unit 29/29 · replay A exit 0 · coop-e2e 141/141 · coop-night 111/112 (only FAIL = host console line «CORS … ctm-img…/img/INFO.json» — sandbox CDN, same as the worker saw on 3f5b3ebb; no page error).
1ecc3fbb (+ LIVE 16f5c1dc: know-notice, jcoopthin 1 line): night-softlock 10/10 · steal-unit 29/29 · replay exit 0 · coop-night 112/112 · QUICKCHECK PASS.
fa8dfc0f (+ LIVE e88b09b4: kit-selscene, j93 text only): night-softlock 10/10 · steal-unit 29/29 · night-final 11/11 · replay exit 0 · QUICKCHECK PASS (core gates PASS, old save ok, render 254/276, buổi 2520/4063, tasks 22/26).
572805a9 (+ LIVE bba42773: odds wording only, no jnf/jsmg/j3/j6/coop file): build_site.sh clean, night-softlock 10/10, robot-save-replay A exit 0.

## Laws touched
4 one core: no number added. 6: no item/person change. 7/VANPHONG: no player text. 9/10 kit: no UI. 11: family scans + table (worker) + reviewer scans. 13: PRIORITY #1 line present (brief, report, this review). 16/17: no rule changed. OK.

## Notes for later (not blocking)
- coop-e2e «advanced for both» night-1 flake remains in the family (seen 2× here, 0× on LIVE in 7): if it shows again on LIVE, the guest steal-game «up» path (jsmg GHOLD/HELD, host FRW 120 s) is the place to trace.
- Scratch tools used (not committed): real-UI repro (save at choice / at flip, reload via title, 12 presses), in-page bot matrix, traced coop-e2e copy.

REVIEW PASS — LAND READY review/fix-evening-softlock-rv 572805a9d250a5bd142cd1feb218767795339153

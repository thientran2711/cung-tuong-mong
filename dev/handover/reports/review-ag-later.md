# review-ag-later — BIG REVIEWER (opus) session_01UV1SzkmyAXYnCFY6utjvkF

PRIORITY #1 CHECK ('agLater|agDrain|AG LATER|seatresync'): OD ag-all-2 rulings | main none | review/ag-all-2-land 2f2fe9ba, review/npc-chain-land a43ca34e (LANDER #2 SzhJFho1) | claims: none for this review
START_CTX ≈ 4 % (get_session read 0; own estimate). depth 3. Foreman: C-AG #7 SzgaEMtM9 → C-AG #8 SzgXTgLe5 (18/11 01:32Z). MAIN s40 → s41 SzjRPt1nbRqDVLL4KQJ.

## Scope
Only the NEW code on top of already-PASSED bases: AG LATER (c1bd499 / e6c1ce7), world pin (863ab3e = a090dd3e), mkMigrate rounding + ag-moodknow draws (5def7a2), the worker's later commits 4df5f38/a305095 (drain drops slices) and faa03d4/fb4544c (coop-e2e press at tối).

## VERDICT (this session): NO PASS sha yet — code fixes pushed, final re-gate pending the lander's merge of the moving main
Main moved twice during the review (eb3675a6 → 3da5720a makeup-lux → 62a6846x looks). Real source conflicts (jtoil semantic: makeup-lux moved 'diem' from a makeup look to a dress verdict; jbaleff; assemble; jinv) → handed to the lander (not a reviewer small fix). LANDER #3 SzjwxQsd merged 3da5720a (aeae7cc3 / ff76d2d2: "makeup-lux meaning wins", ag-all-2's overdone-face level dropped) and merges the looks batch next, then sends SẴN SÀNG KIỂM.

## Findings (all fixed by me, pushed, tests red before / green after)
| # | where | fault | fix | test |
|---|---|---|---|---|
| 1 | jagent agLater | dedupe by kind kept a STALE twin (other world / buổi, timer not fired) and skipped the new job → lost slice / lz / sync / kn after load, new life, seat swap, or (with #2) the kept slice of the old buổi blocking the new buổi's | stale twin replaced (counted in AGL.stat.drop) | ag-later 4b (red on worker heads) |
| 2 | jagent agDrain (4df5f38/a305095) | drain DROPPED pending slices on every press; the press is often refused (drain shows a dialog → base nextBuoi returns; co-op bend waits for the friend; wantB) → the buổi went on with AG.q holding consorts and no timer: rest of the buổi's decisions lost (co-op host every buổi) | drain runs light jobs only and KEEPS slices; they run on in later frames and die by their buổi pin once the step happened (no extra cost in the step — the worker's perf reason holds) | ag-later 2b updated, 2c new (red on worker heads) |
| 3 | coop-e2e press() | at buổi tối a seat already marked ready (nrdy) was not counted as pressed → false red 'fold #next enabled' (seen on npc run 1, week then advanced) | worker found the same (faa03d4/fb4544c), mine dropped | — |
| 4 | ag-dayk fixture | red '2 the buổi turns: carried' on every AG LATER head (green on 1f8aaf30): the boundary drain runs the khắc view sync (agWatch) BEFORE the step and rightly marks the fixture's UNPAINTED injected deed gone | fixture paints R.P[id][3]=ag_effort as agPlan does in play (game logic correct) | ag-dayk green on branch + base |
Scan ag-later-scan: ALLOW extended to the helper's own re-arm timer (comment anchor), still PASS 18 files / 10 sites.

## Checked, no fault
- agDrain ordering: outermost wrapper (setTimeout install after every load-time wrapper; no other module installs nextBuoi/endTurn wrappers in a timer); jkc's COOPW.weekEnd runs inside the drained endTurn; night `go` → nextBuoi → drain → base nextBuoi refuses on a new dialog, CW.ngoW kept → nCheck re-runs after the dialog. No double-run (AGL.run guard, splice), jobs world+buổi pinned.
- CW.wantB: cleared at onBuoi, by bkey change, bend/pend/nReady; done only when Q/mg/needWhere/waiting/frozen clear; bend()/nightReady guarded (CW.bend / nrdy) → no double advance; render → soonEnd → tryEnd covers dialog close and host places arriving (applyWhere → render). No deadlock: a later manual press still works.
- Guest seat: agOn() false on the guest (agGuest) → no deciders; lz queue off (agDOn); slice jobs world-pinned. coop-e2e 'guest never runs agTick' ok every run; G4 clean.
- Save/load mid-queue: AGL not saved; S replaced → jobs dropped by world pin; old saves unaffected (no save format change). Quickcheck old save from live loads + plays.
- mkMigrate: rest now exact; M.v = round(bar) gives the old bar back exactly; log shows round(d) (cosmetic). Correct.
- ag-moodknow 12→40 rounds: same thresholds (80 ≤ rate2 < 100), more draws → fewer chance reds, more power to catch a missing clamp. Stricter, not weaker.
- No player-visible wording change in the delta (only comments / tests).

## Gates run (under 2 busy loops on 4 cores)
| gate | head | result |
|---|---|---|
| coop-e2e ×9 | ag-all-2-land 2f2fe9b + fix #1 + #3 | 9/9 runs 63/63 |
| G4 coop-one-world seeds 7+3 ×5 | same | 10/10 PASS |
| coop-e2e | npc-chain-land a43ca34 + fix #1 | run 1 62/63 (#3 false red), run 2 63/63 (stopped: ag-all-2-land first) |
| quickcheck --runs 5 --cpu 4 vs eb3675a6 | 6285dc94 | PASS · old save ok · render 147/139 · tab 312/282 · buổi 973/680 · tasks>200 13/10 |
| quickcheck vs ag-all-2 base 1f8aaf30 | 6285dc94 | PASS · buổi 771/663 (run-to-run noise ±200 ms: new 973 vs 771 on the same build) |
| ag long suite | 6285dc94 (+ #4) | all green: ag-all 21, ag-all-b 13, ag-all-c 17, ag-betray 20, ag-carry 9, ag-dayk 10, ag-kh2 13, ag-know 25, ag-mg2 26, ag-mgcal 14, ag-mgh 10, ag-par3, ag-paywin 9, ag-rd 13, ag-sell 19, ag-soft 19, ag-stf2 23, ag-taimat 25, ag-taimat2 16, ag-toil2 16, ag-truth 10, ag-walk 10, ag-wx 6, agemp 20, agent_check 16, agmaid 23, greet 13, world_check2 43, ag-later 9/9 |

## HANDOVER (for the next reviewer of these two branches)
Heads after my last push: review/ag-all-2-land 2bfecc27 (aeae7cc3 + #4), review/npc-chain-land 3a4eac44 (ff76d2d2 + #4). LANDER #3 builds on these (looks-batch merge, ag-toil2 re-map, coop-toil-look 26/29).
On SẴN SÀNG KIỂM per branch (ag-all-2-land first): (1) check the jtoil/jagtoil/jbaleff merge resolution (makeup-lux meaning wins: no NPC overdone face; toilSeeRule reads L.dv==='diem' for the dress) against OD for G11 / makeup-lux; (2) ag-later 9/9 + scan; (3) under 2 busy loops: coop-e2e ×9 0 bad, G4 ×5 (7+3) 0 fail, quickcheck --runs 5 --cpu 4 (buổi vs live within noise), long suite above (most ag tests need `dev/index.html` as argv[2]), npc only: feelings18 / mood-mem / moodknow-step0 / ag-moodknow; (4) PASS sha must have live main as ancestor → C-AG #8 (forwards to s41).
Runner scripts used: /home/user/wt/rvlog/run.sh (coop ×N + G4 ×N with busy loops), /home/user/wt/rvlog/long.sh (container-local, not in git).

~70% xong / ~60% chơi được (review delta: code reviewed + fixed; final gate waits for the lander's merge of the moving main)

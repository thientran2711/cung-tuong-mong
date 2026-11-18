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

## REVIEWER #2 — session_01UV1Szk6Tdgr6dBwZ498fDY (REVIEW AG LATER #2)
PRIORITY #1 CHECK ('ag-all-2-land npc-chain-land toilAns knQ'): OD 0 | ledger 0 | claims 7 | main 0 | review/* 1 — reuse: successor of SzkmyAXY on the same two branches; toilAns / knFlush exist only on these branches (fixed in place, no new module).
START_CTX ≈ 4 % (get_session reads 0; own estimate). Foreman C-AG #8 SzgXTgLe5 → C-AG #9 Szh2asyry (18/11 03:20Z). Lander #3 SzjwxQsd.

### Merge delta reviewed (lander e1cad739 / 69ea327a / 8fc629d3 + 8b2508d8 / 519ded12)
- Re-made each merge (git merge-tree + merge-file --diff3): conflicts only j10 / j29 / jtoil. j10 plantServ keeps main's capRoom AND ag-all-2's pay-on-take; j29 hire keeps main's cap re-check (silver back) AND hireTake; jtoil keeps main's tease wording, toilSay in toilReact, peer options (owner 17/11 06:30Z), replySuc sign unified (BAL.toil.replySuc = −2, used as is). No line main added is missing in 3da5720a→62a6846f→f986ff6a→f8276cdb (scan: main-added lines not in result = only the 6 resolved hunks).
- makeup-lux meaning: toilSeeRule reads L.dv==='diem' (dress verdict) + mk 'vung'; no NPC overdone-face level. OK vs OD makeup-lux / G11.
- sentOr relay family (jcoopworld pos / fam / cyb / tn claim) correct: COOP.send returns false/Promise<false> on a down socket; wrappers (jcooptimer, jslap) pass the return through; room/peer clear the keys.

### Findings (fixed by me, pushed, red before / green after)
| # | where | fault | fix | test |
|---|---|---|---|---|
| 1 | jtoil toilAns | `if(c!=="reply")return null` stood BEFORE the new `c==="harsh"` branch (merge of toil-looks5 into the one-answer function) → the player's 'Đáp trả gay gắt' changed no stat (always the lose log line; no −harshAff, no danh/đức). NPCs have no harsh option (BAL.ag.toil2.ans) → player only | guard `c!=="reply"&&c!=="harsh"` | dev/test/toil-harsh.js FAIL on 8fc629d3 / e55c9e95 → PASS |
| 2 | jagknow knErr/knFlush | a LATE errand report stored t.id and read it back with RV() (rivals only) → an NPC master's late scout/listen on the PLAYER lost its target (no chứng cứ for the NPC); a late report whose target died meanwhile gave a nameless 'đi dò la  …' line. Root of the ag-truth bot-run flake 'every finding … real, living other consort' (bad 1–2, ~1 run in 6). Family scan of stored-id queues resolved by RV in jag*: only knQ (invQ already stores "me") | store key(t), read byKey; target gone → dropped, KN.stat.e_gone | dev/test/kn-late.js 2 FAIL → 4/4 on both branches |
Heads after my pushes: review/ag-all-2-land 98ac3cbe, review/npc-chain-land d729bba6 (ancestor f8276cdb).

### Gates
| gate | head | result |
|---|---|---|
| coop-e2e ×9 (2 busy loops) | ag 8fc629d3+#1 (b80c6d31) | 9/9 runs 63/63 |
| G4 coop-one-world 7+3 ×5 (2 busy loops) | b80c6d31 | 10/10 PASS |
| long ag suite + ag-later 9/9 + scan | b80c6d31 | green; one-off reds ag-all bestowal (30.9 vs 30.0), ag-rd FAR k3 → 3/3 green on rerun (chance); ag-truth → finding #2 |
| long ag suite + npc tests (feelings18 34/34, mood-mem 16/16, moodknow-step0 19/19, ag-moodknow 33) + toil-harsh + kn-late + scan (18 files) | npc d729bba6 | green; one-off reds ag-mgcal §3, ag-walk §4 carry NEAR → 3/3 green on rerun (chance) |
| quickcheck | — | not yet (live main moved to e24d5838: staff-cap-apply touches assemble.py / j10 / jpromo → lander must merge; full re-gate after) |

### HANDOVER (if I roll over)
Wait for LANDER #3 SẴN SÀNG KIỂM on heads that contain 98ac3cbe / d729bba6 and live main; then: review the new merge (j10 staff-cap-apply vs ag-all-2 plantServ/hireTake/p3HireRole, assemble order), coop-e2e ×9 + G4 ×5 under 2 busy loops, quickcheck --runs 5 --cpu 4, long suite (+ toil-harsh, kn-late; npc: feelings18 / mood-mem / moodknow-step0 / ag-moodknow), old-save load; PASS sha must have live main as ancestor → C-AG #9.
Runner scripts (container-local): /home/user/wt/rvlog/run.sh <wt> <tag> <coopN> <g4N>, /home/user/wt/rvlog/long.sh <wt> <tag> [extra tests].

~74% xong / ~60% chơi được (two faults fixed; final gate waits for the lander's merge of live main e24d5838)

### REVIEWER #2 — round 2 (18/11 ~05:00–06:40Z) on lander heads 72adff05 / b620b051 (live main 94a93759)
| gate | ag-all-2-land 72adff05 | npc-chain-land b620b051 |
|---|---|---|
| quickcheck --runs 5 --cpu 4 | PASS · old save ok · buổi 792/728 | PASS · old save ok · buổi 817/744 |
| G4 7+3 ×5 (2 busy loops) | 10/10 | 10/10 |
| coop-e2e ×9 (2 busy loops) | 8/9 — 1 host stall (Q=[Điềm báo…], #modal hidden) = lander's reshowQ root (Tuần lục bar open at week end) | 8/9 — same |
| long suite (2 suites in parallel) | green except perf p95 (load) + finding #3 + ag-truth invariant (test) | green except perf p95 (load) |
Finding #3 (fixed, pushed, heads 49122cf5 / 0863517a): the Thái hậu's household (S.thO; jstaff wraps allServ/ownerOf) has no .name → TIN BÁO pass-by line 'X, người hầu cung undefined, …' and taiMatList placedName undefined. Root fix NM/NMc → 'Thái hậu' for S.thO without a name; placedName via NM. Test dev/test/th-name.js 2 FAIL → 4/4. Test fix: ag-truth bot-run invariant counts the player as living (S has no .alive; after #2 an NPC's late scout on her correctly reaches knErrGive with t=S).
Known flake (pre-existing, not blocking): ag-know 'ONE RULE (NPC)' fixture skip/null ~1 in 4 (red before and after #3).
Next: LANDER #3 merges 49122cf5 / 0863517a + reshowQ fix + main a95e8d4 → SẴN SÀNG KIỂM → my re-gate (review reshowQ/qBlocked, coop-e2e ×9 under busy loops, quickcheck ×2, set-bonus-check, shelf-check, th-name/kn-late/toil-harsh) → PASS ag-all-2-land first → C-AG #10 + MAIN ROOT-46.
~79% xong / ~60% chơi được

### REVIEWER #2 — round 3 (18/11 ~07:00–12:10Z): flakes, PERF
- ag-truth loyal-servant check made deterministic (forced tell for the wording; 200-pick share ≥ 120 tell, observed 172–187) → a937119a / eda2a78f.
- Odds-cap r2 heads-up (main 5cbfd620): BAL.odds.softFail = {spend:["suc"]} → our agSoftTxt (F.me/F.npc) would print 'undefined' in ~13 ag soft-fail sites; must route through j63 oddsSoft (her) / same wording for NPCs. Probe /home/user/wt/rvlog/t/soft-line.js (12 buổi with agTry→miss, agSoft→on; no undefined/NaN/{n}).
- PERF (C-AG #11/#12 rule: > +10 % = FAIL). Engine probe /home/user/wt/rvlog/t/eng.js (seeded Math.random, render/showModal stubbed, bot life, placeWhere+agFlush+nextBuoi, CDP inclusive): 120 buổi × seeds 1/2/3 alternating — ag-all-2-land 7301df77 41.1/43.5/40.9 ms per buổi (mean 41.8) vs live 12a1e4be 31.6/30.0/28.7 (mean 30.1) = **+39 % → FAIL item** (G1 #5: +25–31 %). Earlier UI-inclusive measures (quickcheck +8.8 %, bot+render +5.7 %) dilute it.
  Hot paths (ms/buổi ag vs live): placeWhere 12.9/6.4 (agDayEnsure 3.5 → agReplanB 2.6 → agDrawPerson 3.0 → agDrawB 2.6 → agOptsG 2.5; agTick 3.8/1.3), npcEncounters 4.6/1.3 (tl2Meet 2.2, tl2See 1.3, toilNpc 1.8/0.5), j95planRival 3.5/0.44, renderStage 4.0/1.5 (DOM layout in the step).
  Fix list to LANDER #4: (1) agReplanB redraws only replanned / changed people (keep → reuse D.P[id][b]); (2) memo agOptsG per person per bkey + needs; (3) cache j95planRival per bkey; (4) tl2Meet/tl2See: per-day look cache, skip pairs not together; (5) stage DOM refresh out of the step. Target ≤ +10 % on the same probe (×80 and ×160).
Verdict: NO PASS yet (perf FAIL item open; odds-cap merge + reshowQ + live main pending on LANDER #4's head).
~81% xong / ~60% chơi được

### REVIEWER #2 — round 4 + HANDOVER (18/11 ~13:40Z, rollover at context 58 %; START_CTX 4 %)
State of play:
- Lander: NPC LANDER #6 session_01UV1SzgbHcTuGMRy7HBkdcc; heads ag-all-2-land 44a83196 / npc-chain-land f7ef7148 (live a8a10c66); SẴN SÀNG KIỂM after the ag2-perf merge + gates. Foreman C-AG #12 session_01UV1SzjsNq3uC3tq7Tc8S4S; MAIN ROOT-52 session_01UV1SzhR4VChxDLw6hymSvQ. PASS shas (ag-all-2-land FIRST) → C-AG #12 + ROOT-52.
- Perf owner: AG2-PERF #2 session_01UV1SzimZ43DghURhgEAv8W on review/ag2-perf (25c66b1c judged NOT final by C-AG; judge only its new sha via the lander's merged heads).
GATE (ROOT-52, via C-AG #12): (a) 4× CPU per-KHẮC time ≤ live, measured on the khắc-step function AG2-PERF names in its SẴN SÀNG KIỂM (time the same function on live); per-buổi recorded as info only (+28 % known, not gating). (b) NPC deeds per 160 buổi ≥ 95 % of the PRE-PERF ag-all-2 head 02466132/7301df77, seeds 1-3; else consorts + close servants 100 % and only far NPCs may drop. Either miss = FAIL. (c) part A judged by OD L1637 (every re-pick has a cause, cap = one BAL key BAL.ag.day.redecideCap); B / F1 / F2 seeded diff 0 (dev/test/ag2perf-diff.js).
My numbers on 25c66b1c (deterministic probe, crypto seeded + clock frozen; rerun twice identical): deeds 1642 → 1355 = 82.5 % (s1 546→447, s2 566→431, s3 530→477); consort agLand 1101→927 = 84 %; cap binds only 15–20× / 160 buổi, 'keep' 383–485 → raising the cap cannot fix it; lever = keep her previous plan (D.P[id][b-1] deed if valid) instead of a deed-less schedule row; when the cap binds the order is agDayList (fixed), not the cause order the comment promises → sort by cause or rotate. Sent to AG2-PERF #2.
Earlier perf (engine, UI stubbed, 120 buổi × 3, non-crypto-seeded): 7301df77 41.8 vs live 12a1e4be 30.1 ms/buổi (+39 %); 4× throttle live = 168 ms/buổi.
Open checks for the final head (all ag-all-2-land FIRST, then npc-chain-land):
 1. odds-cap merge: agSoftTxt → j63 oddsSoft (her Sức once) / same wording for NPCs, no 'undefined' — tools/soft-line.js (12 buổi, agTry→miss, agSoft→on).
 2. reshowQ / qBlocked co-op stall fix: coop-e2e ×9 under 2 busy loops (run.sh) 63/63 every run, G4 7+3 ×5.
 3. Perf gate above (tools/eng.js THROTTLE=4 for per-buổi info; per-khắc on the named function; tools/deeds.js for deeds, N 160, seeds 1-3, vs 02466132).
 4. quickcheck --runs 5 --cpu 4 (old save), long suite (long.sh + toil-harsh kn-late th-name men-forbidden soft-line; npc: feelings18 mood-mem moodknow-step0 ag-moodknow), set-bonus-check, shelf-check, ag-truth (deterministic now).
 5. PASS sha must have live main as ancestor.
Known flake (pre-existing, not blocking): ag-know 'ONE RULE (NPC)' fixture ~1 in 4.
Tools: dev/handover/tools/review-ag-later/ (eng.js, deeds.js, soft-line.js, harsh.js→dev/test/toil-harsh.js, kn-late.js, th-name.js, run.sh, long.sh). Tests already on the branches: toil-harsh, kn-late, th-name, eng-probe (dev/test/eng-probe.js = eng.js without THROTTLE).
~81% xong / ~60% chơi được

### REVIEWER #3 — VERDICT ag-all-2-land (18/11 ~16:50Z; AG LATER #3 session_01UV1SziGFScPvg84cnnNiFu, depth 8, START_CTX 6 %)
PRIORITY #1 CHECK: OD 18-laws block read (START_CORE) | main a2ce736a | review/ag-all-2-land-r4 e18697fe, ag2-perf ece17b1b, npc-chain-land 78b7196f | claims C-AG #13 (lander work), AG2-PERF #2.
**PASS ag-all-2-land e18697fe** (review/ag-all-2-land-r4; code = 8b4ee331; live main a2ce736a is ancestor → FF).
Chain: 45c6dbea (LANDER #6: + ag2-perf ece17b1b, scope far / cap 0) → r3 ebf25660 (mine: merge main 997e049d, only index.html/sw.js; LANDER #6's test-only shelf-check fix 9586f3ca; my test-only ag-walk setup retry) → r4 8b4ee331 (C-AG #13: merge main a2ce736a, j10/j19/j2 resolved as npc 78b7196f — checked: runOpt rolls oddsCl(oddsOf(a)+lotB) = optOdds(a) = the card's word) → e18697fe (CLAUDE.md line only).
| check | result |
|---|---|
| deeds 160 buổi seeds 1-3 (tools deeds.js) | perf merge byte-identical to pre-perf 84bd47c4 (100 %); r4 byte-identical to r3; ece17b1b alone byte-identical to 02466132 |
| perf 4× spend(1), ag2perf-probe 40 buổi, seeds 1-3 × 3, alternating vs live a2ce736a | khắc mean +24 % (mean of runs; median of runs +38 %) ≤ MAIN-accepted +41 %; INFO for the follow-up perf job: khắc median 2.5 vs 1.3 ms (+92 %), buổi mean +32 %, buổi median +76 %; errs 0, dead 0 |
| soft-line / set-bonus / one-core-guard / shown-odds | 4/4 · PASS · PASS · 97/97 shown==rolled |
| quickcheck --runs 5 --cpu 4 vs live | PASS (buổi med 1447 vs 1337 ms) |
| coop-e2e ×9 + G4 7+3 ×5 (2 busy loops) | 63/63 ×9 · 10/10 |
| long suite + toil-harsh kn-late th-name men-forbidden(288, bad 0) scan | green except pre-existing flakes below |
| ag-walk ×5 / shelf ×5 | 5/5 · 5/5 |
Laws touched (18 LAWS): 4 ONE CORE (guard PASS), 6 real people (all NPC deeds kept), 7 wording (soft-line, no %), 9 kit (no UI added) — none broken.
Pre-existing, NOT blocking (same rate on pre-perf 84bd47c4 / main) → follow-ups for C-AG #13: (1) agmaid_check 'Tiến cử option text: no invented odds' red on main too; (2) ag-walk carry NEAR/FAR timing ~2/10 (same on 84bd47c4); (3) ag-par3 'Nhờ giúp đỡ helpAsk' 2/5 (same on 84bd47c4); (4) ag-know one-off 3 FAIL under load, 0/5 on rerun.
Next: npc-chain-land 78b7196f (SẴN SÀNG KIỂM from C-AG #13).

### REVIEWER #3 — VERDICT npc-chain-land (18/11 ~18:20Z)
PRIORITY #1 CHECK: OD 18 LAWS read | main 5e6490b4 (ag e18697fe landed + shop-panel r1) | review/npc-chain-land-r2 08774c0e, -r3 d3ea24e8 | claims C-AG #13 (relay only), C-AG #14.
**PASS npc-chain-land d3ea24e8** (review/npc-chain-land-r3) = C-AG #13's 08774c0e (78b7196f + e18697fe as merged 'ours' + test-only ag-stf2 fix) + my merge of live main 5e6490b4 (only index.html / sw.js conflicted, rebuilt). Live main 5e6490b4 is ancestor → FF.
'ours' merge audit: of 200 files ag changed vs a2ce736a, every ag-added line missing on npc is an npc rewrite of that line (ghenUp with cause, FEELINGS-18 agMoodF, emoKnown → kitIsKnown, ghenN), no lost ag content.
| check | result |
|---|---|
| npc tests | feelings18 34/34, mood-mem 16/16, moodknow-step0 19/19, ag-moodknow 33/33, feel-shown 0/5 reds, shown-odds 97/97 |
| one-core / soft-line / set-bonus / shelf | PASS / 4/4 / PASS / PASS |
| deeds 160 buổi seeds 1-3 | 369/111/333 = 813 vs ag 779 (≥ 100 %; s2 dies at buổi ~5 on both) |
| perf 4× spend(1) vs live (2 × 3 seeds, alternating) | khắc mean +22 % (≤ accepted +41 %); INFO: khắc median +104 %, buổi mean +26 % → perf follow-up |
| quickcheck --runs 5 --cpu 4 | PASS (buổi 1432 vs 1256 ms) |
| coop-e2e ×9 + G4 ×5 (08774c0e) | 7/9 clean, 2 reds = network only (coop worker 502 / CDN CORS); G4 10/10 |
| after main 5e6490b4 merge | coop ×3 63/63, G4 4/4, shown-odds 97/97, one-core PASS, feelings18, ag-moodknow green; shop-panel / act-dedupe-w1 reds identical on main under file:// (need an http page) |
| ag-stf2 bribe histogram | was 4/16 red (incorruptible base servant → both floors); C-AG #13 test fix → 0/8 |
Flakes same rate as ag (not blocking, follow-ups listed in the ag verdict): ag-par3, ag-walk carry, ag-know, ag-carry, agmaid.

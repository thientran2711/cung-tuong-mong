PRIORITY #1 CHECK ('doAct spend runAct'): OD 0 | ledger 0 | claims 1 (this job) | main round-1 j9 actCtx/actOdds (live a2ce736a) | review/* review/shown-odds-r2 (work under review) | archive 0
18 LAWS: read '★ THE 18 LAWS — READ FIRST' at the top of dev/rules/START_CORE.md first (ORDER MAIN ROOT-52 18/11 16:12Z/16:13Z); reviewers FAIL any break of a law the work touches.

# D #2 brief — SHOWN-ODDS ROUND 2 (spend-before-roll) BIG REVIEW (opus)
Coordinator: Foreman D #2 session_01964izF9UKqsAGRKtcUxqfx. Report via send_message there + dev/handover/reports/review-shown-odds-one-path.md § ROUND 2 (handover branch) + one line in dev/handover/FOREMAN_D_STATUS.md.
READ FIRST (handover branch claude/cung-tuong-mong-handover-hj0h8w): dev/rules/START_CORE.md + START_WORKER.md + START_REVIEWER.md in full (GATE ZERO at top), then only the dev/rules/topic/*.md files the work touches (odds / one-core). Owner rules verbatim live there.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

## Under review
review/shown-odds-one-path @670aa44c3ae4b9d1bfab8576afe1bc94d2ff7b94 (on live f60b4024). Worker report: dev/handover/reports/shown-odds-one-path.md (read in full). ORDER: MAIN ROOT-52 18/11 13:36Z in FOREMAN_D_STATUS.md. Verdict branch: review/shown-odds-one-path-rv.

## Under review
review/shown-odds-r2 @ b39e66781b63c03d3165f383a5bcc8eee838d5ad (worker session_01964izERxj8PUG495V4QTjS; 2 commits on live a2ce736a). Worker brief: briefs/D2-shown-odds-r2.md (has MAIN's ORDER 15:30Z verbatim). Worker report: reports/shown-odds-one-path.md § ROUND 2.
Fix claimed: j9 fzRun(o,k,fn) freezes the odds she saw BEFORE spend; aRoll(o,a) rolls with those frozen odds (ACTX.fz); side rolls / NPC rolls unchanged; effects still after spend. ~30 build files touched (list in report).

## Check
1. Family complete: re-run dev/tools/shown-odds-scan.py (SPEND-THEN-ROLL section) yourself; plant one spend-then-roll copy → scanner must FAIL. Hunt do-paths it may miss (grep spend( / time advance followed by roll/odds in the same handler).
2. Correctness: frozen odds = exactly what the player saw (same ACTX parts: lá số, spy, sent pen, caps once); nothing that should change with the spend's result is wrongly frozen (e.g. effects, deaths, side rolls); no double oddsCl; BAL only, no typed numbers; actOdds/optOdds/jointO/runAct signatures unchanged (C-AG npc-chain-land merges them).
3. dev/test/shown-odds-spend.test.js really FAILS on live (4/75, incl. steal-tonight 64 vs 48) and PASSES on branch; tests are not vacuous (break fzRun → must FAIL). Round-1 test still passes.
4. BIG gates: odds-cap.js, one-core guard 0, coop-e2e (live 63/63), quickcheck --runs 6 PASS, old save load, short paired bot run (no runaway; report any shift). No text change claimed → one Fold 755x1000@2 + iPad 1180x820@2 look at an act result to confirm.
5. FREEZE: branch must touch NONE of dev/build/jag*.js, j95*.js, jtoil*.js, jbal.js, jcoop*.js or save logic — confirm with git diff --stat.
6. FINAL MERGE newest origin/main, rebuild index.html/sw.js (assemble.py + build_site.sh), quickcheck again, FF from live.
Open by design (report only): co-op invites (jcoop, frozen) roll when the friend answers; j70 plots roll weeks later.
End: "PASS <full FF sha>" (= LAND READY, with touched-file list) or "FAIL <n> @<sha> + list". No PR, never push main. Memory tight: tests one at a time, ≤2 browsers.

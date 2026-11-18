PRIORITY #1 CHECK ('poison-road-fix'): OD 0 | ledger 0 | claims 6 | main 0 | review/* 1 (review/poison-road-fix = the work under review) | archive 0

# D #1 brief — POISON-ROAD r2 BIG REVIEW (opus)
Coordinator: Foreman D #1 session_01964izGKDEJJjzBBQAqWeWg. Report via send_message there + dev/handover/reports/review-poison-road.md § ROUND 2 (handover branch) + one line in dev/handover/FOREMAN_D_STATUS.md.
READ FIRST (handover branch claude/cung-tuong-mong-handover-hj0h8w): dev/rules/START_CORE.md + START_WORKER.md + START_REVIEWER.md in full (GATE ZERO at the top), then only the dev/rules/topic/*.md files the work touches (one-core / BAL / odds). Owner rules verbatim live there — do not rely on this summary.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

## Under review
review/poison-road-fix @1c177a238722c09cee5ad42e92ce5cf199560b40 (worker report dev/handover/reports/poison-road-fix.md). Round 1 FAIL list: dev/handover/reports/review-poison-road.md (read in full). Verdict branch: review/poison-road-r2-rv.

## Check
1. FAIL 2 (ONE CORE OD:L1267): every typed divisor/cost/number in jpq.js + jpoison.js now reads ONE BAL.pg table; texts print BAL; behaviour identical (re-run the worker's odds-identity check yourself on a sample); new one-core-guard kind `div` really catches a re-typed `/4` and does not block unrelated code unfairly. Family scan (fix-the-group OD:L474): any other typed number left in the poison family (jgift taint, Thử độc chain).
2. Odds now pass through main's one ODDS CAP oddsCl; removal of pq.min 3 is right (cap floor 5) and ladder words stay correct.
3. FAIL 3: Đức test + both NPC tests are real (break the build once → they fail).
4. Full BIG gates: poison-road topic tests, one-core-guard 0, coop-e2e (live 63/63; a flake must pass on rerun), quickcheck PASS (--runs 6), Fold 755x1000@2 + iPad 1180x820@2 shots LOOKED, old-save load, bots no runaway (short paired run is enough if numbers unchanged).
5. FINAL MERGE: merge newest origin/main (≥ 2850c45b) into your verdict branch, rebuild index.html/sw.js (assemble.py + build_site.sh), re-run quickcheck; it must FF from live main.
6. FAIL 1 (kit .kpb, picker intro hidden) is the MAIN kit keeper's job (review/kit-kpb, session_01UV1SzmDYo7maUqr1RbcypR). If kit-kpb is LIVE on main when you final-merge, check the poison picker intro is visible on Fold+iPad. If not live, say so — do NOT add private CSS; D will hold the landing until kit-kpb is live (warning text must be visible for a risk road).
End: "PASS <full FF sha>" (= LAND READY) or "FAIL <n> @<sha> + list". No PR, never push main. Memory tight: tests one at a time, ≤2 browsers.

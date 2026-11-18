PRIORITY #1 CHECK ('shown odds one path oddsShown'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 (MAIN's own check 'shown odds rolled ACTX lotB': all 0)

# D #1 brief — SHOWN-ODDS-ONE-PATH (opus; odds/rules = BIG)
ORDER FROM MAIN ROOT-52 18/11 13:36Z (verbatim in dev/handover/FOREMAN_D_STATUS.md, grep "shown-odds-one-path").
Coordinator: Foreman D #1 session_01964izGKDEJJjzBBQAqWeWg. Report via send_message there + dev/handover/reports/shown-odds-one-path.md (handover branch) + one line in dev/handover/FOREMAN_D_STATUS.md.
READ FIRST in full: dev/rules/START_CORE.md + dev/rules/START_WORKER.md; then only the dev/rules/topic/*.md files you touch (odds / VANPHONG / one-core). Owner rules verbatim live there — do not rely on this summary.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

## Problem (found by C-AG LANDER #5, dev/handover/reports/npc-chain-land.md § LANDER #5 — read it)
Person menu j15 `a.o(S,v)` shows odds WITHOUT the runAct ACTX parts (lotB lá số, spyKnowB) that the roll adds → shown ≠ rolled when her lot domain = the act's domain. Same class as the jfeel bug C-AG fixed on npc 6a97777f (look at that fix and reuse its shape).

## Job (fix the WHOLE GROUP, OD:L474 / OD:L52)
1. Write a scan script (dev/tools/, kept in repo) that lists EVERY place in dev/build that prints odds to the player (od(), ladder words, %, chips) and the roll path that decides the same outcome; output a before table: place | shown fn | rolled fn | extra parts only on one side.
2. Make ONE odds function per decision used by BOTH display and roll (shown == rolled), all through main's one ODDS CAP oddsCl (odds-cap r2, live) — reuse that code, no second cap. Numbers from BAL only (OD:L1267 one core); no typed numbers.
3. Tests: a dev/test that, for every row of the table, builds a state where the extra parts are non-zero (e.g. lot domain = act domain, spy knowledge on) and asserts shown == rolled; prove it FAILS on live main once.
4. After table in the report. Gates: the new test, odds-cap.js, one-core guard 0, coop-e2e (live 63/63), quickcheck PASS (--runs 6), Fold 755x1000@2 + iPad 1180x820@2 shots of 2–3 odds screens LOOKED (scratch only).
FREEZE (ORDER ROOT-51 11:53Z): if you must touch dev/build/jag*.js, j95*.js, jtoil*.js, jbal.js, jcoop*.js or save logic, the branch lands only after C-AG LIVE — say so in your report; prefer not touching them.
Branch review/shown-odds-one-path from newest origin/main. Done → push, "SẴN SÀNG KIỂM <full sha>" + touched-file list in your report + STATUS line, send_message D #1. No PR, never push main. Memory tight: tests one at a time, ≤2 browsers. Model: opus.

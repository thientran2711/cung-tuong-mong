PRIORITY #1 CHECK ('shown odds / shown==rolled / one odds'): OD 1 (OD:L394) | ledger 1 (row 90 odA) | claims 1 (this job) | main jaudit §18 + sentPenNow (reused) | review/* 1 (review/shown-odds-one-path = work under review) | archive 0

# D #1 brief — SHOWN-ODDS-ONE-PATH BIG REVIEW (opus)
Coordinator: Foreman D #1 session_01964izGKDEJJjzBBQAqWeWg. Report via send_message there + dev/handover/reports/review-shown-odds-one-path.md (handover branch) + one line in dev/handover/FOREMAN_D_STATUS.md.
READ FIRST (handover branch claude/cung-tuong-mong-handover-hj0h8w): dev/rules/START_CORE.md + START_WORKER.md + START_REVIEWER.md in full (GATE ZERO at top), then only the dev/rules/topic/*.md files the work touches (odds / one-core). Owner rules verbatim live there.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

## Under review
review/shown-odds-one-path @670aa44c3ae4b9d1bfab8576afe1bc94d2ff7b94 (on live f60b4024). Worker report: dev/handover/reports/shown-odds-one-path.md (read in full). ORDER: MAIN ROOT-52 18/11 13:36Z in FOREMAN_D_STATUS.md. Verdict branch: review/shown-odds-one-path-rv.

## Check
1. j9 actCtx/actOdds is the ONE act-odds path for runAct and every display (j15 person menu, j6, j9, j70, j78, jsgame, jwhy, jmood); no remaining display computes its own odds (re-run dev/tools/shown-odds-scan.py yourself; spot-check the scanner is not blind — plant one shown≠rolled copy, it must FAIL).
2. Each side bug fix (j78 typed copies, no-send pen, spyRoll, accTire self-count, BAL.actHere.plant, j10 joint leader odds, j1 optOdds) is right vs the roll and the owner's rules; numbers unchanged where the roll was already right; BAL only, oddsCl cap applied once (not twice).
3. dev/test/shown-odds.test.js really fails on live (5/90) and passes on branch; worker's open gaps: vp/xx not reached (try to cover), "Vì sao" list missing a spyKnowB line (fix-the-group: add it if small, it is the same family), npc-chain jfeel hook note (report only).
4. BIG gates: odds-cap.js, one-core guard 0, coop-e2e (live 63/63), quickcheck --runs 6 PASS, old save, Fold 755x1000@2 + iPad 1180x820@2 shots of person menu / evidence card / Vì sao LOOKED; short paired bot run (no runaway, odds now include lot/spy so results may shift slightly — report the shift).
5. FREEZE: branch must touch NONE of dev/build/jag*.js, j95*.js, jtoil*.js, jbal.js, jcoop*.js or save logic (jbal2 is allowed); confirm with git diff --stat.
6. FINAL MERGE newest origin/main, rebuild index.html/sw.js (assemble.py + build_site.sh), quickcheck again, FF from live.
Not yours: jsgame "Đang thỉnh tranh…" overlapping the KÈM label is on live → note it for MAIN only.
End: "PASS <full FF sha>" (= LAND READY, with touched-file list) or "FAIL <n> @<sha> + list". No PR, never push main. Memory tight: tests one at a time, ≤2 browsers.

PRIORITY #1 CHECK ('doAct spend runAct'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 (round 2 of shown-odds-one-path, LIVE a2ce736a; reports/shown-odds-one-path.md + reports/review-shown-odds-one-path.md)

# D #2 brief — SHOWN-ODDS-ONE-PATH ROUND 2: spend-before-roll (opus; odds/rules = BIG)
Coordinator: Foreman D #2 session_01964izF9UKqsAGRKtcUxqfx. Report via send_message there + dev/handover/reports/shown-odds-one-path.md § ROUND 2 (handover branch) + one line in dev/handover/FOREMAN_D_STATUS.md.
READ FIRST in full: dev/rules/START_CORE.md + dev/rules/START_WORKER.md; then only the dev/rules/topic/*.md files you touch (odds / one-core). Owner rules verbatim live there — do not rely on this summary.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

## ORDER (verbatim from FOREMAN_D_STATUS)
(18/11 15:30Z) ORDER FROM MAIN ROOT-52 — ADD to shown-odds-one-path (same family, found by C-AG #13): j8.js doAct() calls spend(BAL.time.cost.harm) BEFORE runAct(); things in that spend (khắc 32→34, đức 60→56, new ids…) move the act's odds before the roll → npc test feel-shown red ~1/10 (shown 64, rolled 74; plain ACT.steal.o moved across the spend). Fix the WHOLE family: every do-path that spends time then rolls (doAct, empAct, …): roll with the odds she saw (compute/roll before spend, or freeze shown odds and pass them to the roll). If shown-odds-one-path already landed, open it as round 2 on the same branch. Note C-AG npc-chain-land merges j2/j10/j19 with your optOdds/actOdds/jointO.

## Job (fix the WHOLE GROUP, OD:L474 / OD:L52)
1. Branch review/shown-odds-r2 from newest origin/main (round 1 = a2ce736a is live; reuse j9 actCtx/actOdds and the round-1 scan tool + test).
2. Find EVERY do-path that spends time (spend / khắc / buổi advance / world events) and THEN rolls odds the player saw: doAct, empAct, and every other one (extend the round-1 scan to list them; before/after table in the report).
3. Make each roll use exactly the odds she saw: compute + freeze the shown odds BEFORE spend and pass them to the roll (or roll before spend) — ONE shared way, BAL only, no typed numbers. Effects of the act still happen after spend as today (no gameplay change beyond odds = shown).
4. Test: shown == rolled across the spend for each path (seeded; must FAIL on live once, PASS on branch); the C-AG npc test feel-shown case (shown 64 / rolled 74) must pass.
5. Gates: odds-cap, one-core guard, shown-odds test, quickcheck --runs 6, coop-e2e, old-save load, Fold 755x1000 + iPad 1180x820 shots if any text changes.
6. FROZEN (ORDER ROOT-51 11:53Z): if you must touch jag*.js, j95*.js, jtoil*.js, jbal.js, jcoop*.js or save logic, say so — landing then waits for C-AG LIVE. Note C-AG npc-chain-land merges j2/j10/j19 with actOdds/optOdds/jointO: keep those names/signatures stable.
7. Done: push, report, send "SẴN SÀNG KIỂM <sha> + touched files" to Foreman D #2. Never push main.

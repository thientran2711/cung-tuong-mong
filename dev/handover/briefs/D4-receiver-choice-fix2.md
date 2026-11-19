PRIORITY #1 CHECK ('receiver choice'): OD 0 | ledger 0 | claims 1 (= this job) | main role-parity r3 live (40d05b76) | review/* review/receiver-choice 28ebffad8 (this branch) | archive 0
18 LAWS: read '★ THE 18 LAWS — READ FIRST' at the top of dev/rules/START_CORE.md first — this job IS law 1 (TWO-WAY) + 2 (EQUAL-VALUE) + 3 (GAIN-AND-LOSS), keeps 4, 7, 9, 11, 13.

# D #4 brief — RECEIVER-CHOICE FIX ROUND 4 (RE-CHECK #2 FAIL 6 @28ebffad8; opus; BIG)
Coordinator: Foreman D #4 session_01964izFYnHRysp6EvC5M7YK. Report: send_message + dev/handover/reports/receiver-choice.md section "ROUND 4" + one STATUS line. MAIN = ROOT-60 session_01Rc5AsMTMePisU9AmwCgz6i (other account → FOR MAIN lines).
Branch: review/receiver-choice @28ebffad8 — continue on it. Push only review/*; never main, no PR. Before SẴN SÀNG KIỂM final-merge the CURRENT origin/main (8113f42e or newer).
READ FIRST in full: dev/rules/START_CORE.md + START_WORKER.md; dev/handover/briefs/D4-receiver-choice-fix.md (job context + owner OD lines to read verbatim); dev/handover/reports/receiver-choice.md (all rounds, esp. ROUND 3); dev/handover/reports/review-receiver-choice.md «RE-CHECK #2» (the list below in full).
FIX ALL 6 (whole group; the reviewer RULED the 3 cx4 gaps are THIS job's group, law 11):
1. receiver-choice.test flaky (2/3 FAIL): rougeBorrow NPC-lender check {"?":80} — the deed picks its own lender; make it deterministic; show 5 green runs.
2. illMaid (j83 IROUTE.maid): trusted maid ordered with no stf2Ord answer → route through DIRTY_SENT/stf2Ord like bribel/laydo/laydol.
3. illAlly (j83 illBuy ally): holder's item spliced out with no answer, NPC↔NPC the same; she is never asked (illAllies filters v.alive) → RCVK 4 answers + her card (two-way).
4. lxAskHer (her Mượn son phấn lender card): private Q.push with 2 answers → RCVK entry, PEND + rcvCard notice path, 4 answers.
5. Scan: an unreached classified REQ/ORDER/ORDER_SRV/JUDGE key must count as a gap (or have a probe, or be listed in open.json with its owner) — no silent pass.
6. Law 2: Kết giao «yes» (+30 lượng, thiện cảm +25, quý +8 for Sức −4) beats Từ chối (Danh +1, −3/−3) → equal-value BAL cost or gain.
Also: rcvCard fallback → window.kitNotice when present (ONE NOTICE SYSTEM); judge shot staging (S.rank=7 while an NPC queen exists → accused shows «Hoàng hậu»: stage properly).
Landing: parallel-time lands first; when it is on main, re-merge (assemble.py/j21/j29/jbal2 + jptime invite→rcvInviteGo) and re-run every gate.
GATES: receiver-choice.test ×5 green, role-parity.test, quickcheck --runs 6, coop-e2e 63/63, one-world, core gates, old save; Fold 755x1000@2 + iPad 1180x820@2 shots looked at 3×.
Then SẴN SÀNG KIỂM <sha> (STATUS + report + send_message D #4); reviewer #2 session_01964izDhYprGzHx3vd2qwk7 re-checks.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

PRIORITY #1 CHECK ('parallel time'): OD 1 | ledger 0 | claims 3 (all = this job: review/parallel-time rows) | main 0 | review/* review/parallel-time f4eb517a5 (this branch) + review/errand-scene (MAIN's jerr «tin» panel — reuse, do not touch) | archive 0
18 LAWS: read '★ THE 18 LAWS — READ FIRST' at the top of dev/rules/START_CORE.md first — this fix must keep laws 1 (TWO-WAY), 2 (EQUAL-VALUE), 3 (GAIN-AND-LOSS), 4 (ONE CORE), 6, 7, 9 (KIT FIRST), 11 (whole group), 13, 18.

# D #4 brief — PARALLEL-TIME FIX of BIG FAIL 7 @f4eb517a5 (opus; core time system = BIG)
Coordinator: Foreman D #4 session_01964izFYnHRysp6EvC5M7YK. Report via send_message there + dev/handover/reports/parallel-time.md (new section "ROUND 4", handover branch claude/cung-tuong-mong-handover-hj0h8w) + one line in dev/handover/FOREMAN_D_STATUS.md. MAIN = ROOT-58 session_01Rc5AsHvFYTJwaE5mFs48oR (other account → FOR MAIN lines in the STATUS).
Branch: review/parallel-time (HEAD f4eb517a5). Continue on it. Workers push only review/* branches; never main, no PR. Before SẴN SÀNG KIỂM final-merge the CURRENT origin/main (53544bd or newer).
READ FIRST in full: dev/rules/START_CORE.md + dev/rules/START_WORKER.md; dev/handover/briefs/D3-parallel-time.md (the original job + owner OD lines to read verbatim, incl. ~21:15Z receiver 4 answers); dev/handover/reports/parallel-time.md (all rounds, esp. HANDOVER + round 3); dev/handover/reports/review-parallel-time.md (the FAIL 7 list — fix EVERY item, whole group); dev/kit/KIT.md + VANPHONG.md; only the dev/rules/topic/*.md you touch.
FIX ALL 7 (details in the review report):
1. No own «tin» panel: keep only the PTIME reader API (orders/ordWhen/answer); never register on render; register "tin" only when jerr/errIcon is absent. Write a FOR MAIN line: jerr's panel must list PTIME.orders()+ordWhen()+answer().
2. One core: «Giúp qua loa» uses the existing BAL.road.hp.half (drop BAL.ptime.half); remove typed fallbacks (||15, ||2).
3. Qua loa shown = charged: card khắc must include the walk (travel/BAL.walk.far) or the real total; always pay via spend (no direct used=).
4. Two-way: NPC deeds by a SENT servant (j28, j40 mindRun, j70, jtruth npcFrame, jtsb runAct with bestSent) go through the same S.away/due-khắc path as hers; an NPC's away maid cannot be used for other deeds.
5. ptime-scan.py: re-class converted labels, verify PARALLEL labels really call ptSend, no file-wide STORY auto-pass, cover NPC senders + «Mua chuộc» / «Cài người hầu vào cung» (j10 plantsv); remove dead BAL.ptime.kinds.bribe or make it true. Planted test must still exit 1.
6. Receiver dò la «Giúp hết lòng» row shows her công lao gain (srvMerit BAL.eff.j42.srvDoOrder_2).
7. Shot script clears Q/notices before each shot; re-take all 7 Fold 755x1000@2 + 7 iPad 1180x820@2; look at each 3×.
Also the minor notes (jmkt empty segment, cap unread reports in S.away, ptime.test try/catch FAIL line).
GATES: ptime + ptime2 tests, ag-stf2, quickcheck --runs 6, coop-e2e 63/63, coop-one-world, coop-bot; receiver-choice (review/receiver-choice 88de83c5f uses ptOrdAdd — keep its API stable).
Then SẴN SÀNG KIỂM <sha> line in STATUS + report; the same reviewer session_01964izBqmsKFQ8vM26c8CnQ re-checks.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

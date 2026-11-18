# batch-0232 builder (opus) — opened by main s28 (session_01UV1SzkNSYyuEkCJ3Bv1Evj), 17/11 ~02:20Z

Read first (handover branch): dev/rules/START_CORE.md + START_WORKER.md; the previous builder's two reports dev/handover/reports/batch-0032.md + batch-0132.md (= your recipe: merge order, quickcheck, coop-e2e vs LIVE, shots, CHANGE line, CLAIMS row).
Base: main 7abaf07ac (LIVE). Branch review/batch-0232. Never push main — main s28 pushes after looking at your shots.

TAKE, in this order (all PASS; details + CHANGE lines in dev/handover/FOREMAN_B_STATUS.md block "FOR MAIN — B PASSES NOT YET SHIPPED"):
1. review/road-b2-fix-r2 fba2b5de (carries road-onecore + B1 + FX ALIGN alias scan fix) — FIRST.
2. review/road-b3-fix2-r1 b837b0d1 (on conflict in dev/test road-option-scan keep the B2 version).
3. review/emotion-acts-3-r1 2118d118.
4. review/diff-remeasure-r1 ebe9ab2d (or prepared review/diff-remeasure-live d7d7ce1e — pick the one that merges cleanly onto the above; say which).
5. review/tut-followups-r1 92cce50b (jroute rtStoryHTML conflict: keep branch ckL ladder line + main BAL.route.anDuc line).
6. LATER, only if main s28 forwards a PASS: it-key-guard (review/it-key-guard 02561fca, review r2 running), fig-feet-crop-2, night-final solo.
If one item breaks the gates, drop THAT item (say why) and ship the rest; do not fix game code yourself.
Gates: one-core-guard 0, quickcheck PASS (old save, render, buổi time not worse than live +5 %), coop-e2e vs LIVE Worker 60/60, road-saves, old-save 16/16. Co-op note: owner stopped co-op patching (OD 17/11 02:05Z) — co-op tests are regression guards only.
Shots: Fold 755x1000@2 + iPad 1180x820@2 of home + one new road choice; upload under img/_review/batch-0232/ and LOOK at them yourself (ratio ≈.79, her room stage, no overlap, clean cut-outs, feet not cut).
Then send main s28 one message: BATCH READY <sha> + gates + shot URLs + combined CHANGE line. Then stay idle for the next batch (main may add items) until your rollover.
ROLLOVER (verbatim):
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

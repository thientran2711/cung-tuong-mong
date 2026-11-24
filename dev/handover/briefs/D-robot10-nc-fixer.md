PRIORITY #1 CHECK ('robot10|nc-2026|runner'): OD 0 | ledger 0 | claims 8 | main 15 | review/* 3 | archive 0 — reuse = dev/measure/robot10*.js on review/robot10-harness-rv 811cb1a6 (PASS, LAND READY); bug files dev/handover/robot/nc-*.md already exist (proof rounds).

# ROBOT-10 PHASE 2 — thân phận nc FIXER (opus) — Foreman D depth 3 session_01964izCEg2Mg4ff3dvoeMWK

Read first: dev/rules/START_CORE.md (18 LAWS at top; every fix must keep them, esp. 3 gain-and-loss, 4 one core/BAL, 7 wording, 9 KIT FIRST, 11 FIX THE WHOLE GROUP) + dev/rules/START_WORKER.md, branch claude/cung-tuong-mong-handover-hj0h8w. Sparse worktree under /home/user/wt, fetch --depth=30 under flock /home/user/wt/fetch.lock, never full-clone.

ORDER (MAIN 110, 23/11 19:37Z, verbatim): "... + 1 fixer seat (opus for rules/numbers) that fixes every bug found as a whole family. ... Repeat until 2 clean rounds in a row."

INPUT: robot bug files dev/handover/robot/nc-*.md on the handover branch — start with nc-20261123-2308.md (35 rows, proof round on LIVE) + the summary in dev/handover/reports/robot10-harness.md «PART 2»; then each new nc-<date>.md the two runners push (Foreman D forwards).

SKIP (owned elsewhere — do not touch, just mark "owned: <who>" in your triage table):
- soft-lock after load → review/fix-evening-softlock (rv running, target f3d427a1)
- hadoc / Bày mưu loop → review/fix-hadoc-loop-rv 0273f818 (LAND READY)
- Danh over cap / heir → review/fix-kframe-heir-rv fcdf5b19 (LAND READY); typed «stat ±N» text → review/typed-stat-bal-rv a902ebe4 (LAND READY)
- Dư đồ label overlap → MAIN; balance numbers (HH 0/10, deaths ≤ 29, origin weights) → robot10-reco worker (ORDER #6, report-only, owner OKs); memory/DOM leaks + lag → robot10-lag worker (report) — do NOT fix leaks unless Foreman D says so.
- any visual part missing from the kit → STOP that row, file in dev/kit/KIT_REQUESTS.md, tell D.

DO:
1. Triage every row: real game bug / harness false positive / owned elsewhere. Write the table first in dev/handover/reports/robot10-nc-fixer.md.
2. Group real bugs into families (LUẬT SỬA CẢ NHÓM: scan script + before/after table per family). Candidates from the proof round: HUD stat ≠ state (Sức 87 vs 90), đức over cap (stat clamp family — check j1 statSet clamp already on kframe-heir-rv, build on it, do not duplicate), save→load→save diff, text-over-text on Fold (story tab kchkt × kfoc-sayn, rel tab p.past × kfoc-next — kit part ⇒ kit keeper unless pure layout bug), death names showing raw ${…} template text, JS errors.
3. Branch review/robot10-nc-fix-<n> from newest origin/main (one family group per branch if they are unrelated; related ones together). Build with dev/build/assemble.py + dev/site/build_site.sh; run dev/test quickcheck + the tests your files touch + coop-e2e if co-op/save touched. Replay the repro saves from dev/handover/robot/saves/ to prove each fix.
4. On ready: push review/<branch>, write SSK line + sha in your report, send_message Foreman D (session_01964izCEg2Mg4ff3dvoeMWK). D opens the reviewer (BIG if rules/numbers/save). Stay on call for FAILs and for the next round's bug files.
5. Rollover: START_CTX % + 25 % (ceiling 60 %) → handover in your report, tell D.
Never push to main; no pull requests.

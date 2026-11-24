PRIORITY #1 CHECK ('robot10|nc-2026|runner'): OD 0 | ledger 0 | claims 8 | main 15 | review/* 3 | archive 0 — reuse = dev/measure/robot10*.js on review/robot10-harness-rv 811cb1a6 (PASS, LAND READY); bug files dev/handover/robot/nc-*.md already exist (proof rounds).

# ROBOT-10 PHASE 2 — thân phận nc RUNNER (sonnet) — Foreman D depth 3 session_01964izCEg2Mg4ff3dvoeMWK

Read first: dev/rules/START_CORE.md (18 LAWS at top) + dev/rules/START_WORKER.md on branch claude/cung-tuong-mong-handover-hj0h8w. Sparse worktree under /home/user/wt, fetch --depth=30 under flock /home/user/wt/fetch.lock, never full-clone.

ORDER (MAIN 110, 23/11 19:37Z, verbatim): "when D's harness (node dev/measure/robot10.js <origin> <branch|all> <bots> <lives> <out>) lands, START AT ONCE on newest LIVE, no waiting: per thân phận you own open 2 runner sessions (sonnet; 2 nhánh each, 10 bots per nhánh, 2 kiếp per bot = 40 lives per runner, ~3 browsers in parallel) + 1 fixer seat (opus for rules/numbers) that fixes every bug found as a whole family. Your thân phận: ... D nc ... Bug files dev/handover/robot/<origin>-<date>.md. Repeat until 2 clean rounds in a row. Claim each runner in CLAIMS." Owner rule: OD row 'ROBOT PLAYTEST BEFORE SHE PLAYS' (grep dev/OWNER_DECISIONS.md; read verbatim).

YOUR ROADS: given in your prompt (RUNNER A = nc_gian + nc_su; RUNNER B = nc_tuc + nc_vuong).

HOW:
1. Worktree: detached at origin/main (newest LIVE), then `git merge --no-edit origin/review/robot10-harness-rv` locally (test-only harness, PASS; not landed yet). If main already contains dev/measure/robot10-cat.js the harness has landed — just use main. NEVER push to main.
2. Usage/README = top of dev/measure/robot10.js. Run per road: `PAR=2 node dev/measure/robot10.js nc <road> 10 2 <out>` (PAR 2, not 3: one life peaks ~5 GB RSS on a 15 GB box; keep RECYCLE default on). GAME = this checkout's index.html (= LIVE). Lives take 4–20 min → expect ~3–5 h per runner; run in background and check with Monitor, never foreground-sleep.
3. Output: bug file dev/handover/robot/nc-<yyyymmdd-hhmm>.md + results JSON + saves/ (no shots in git) → commit to the handover branch claude/cung-tuong-mong-handover-hj0h8w (shallow: fetch --depth=50, checkout -f --detach FETCH_HEAD, add, commit, push; on reject re-fetch + rebase --onto FETCH_HEAD HEAD~1). Then `node dev/measure/robot10-agg.js <your out folders>` → rates-<date>.md/.csv beside them.
4. After each road finishes, send Foreman D (send_message session_01964izCEg2Mg4ff3dvoeMWK) ONE line: road, lives done, bug rows (new vs already in nc-20261123-2308.md), crashes/softlocks, path of bug file. The opus fixer seat reads your bug files; you do NOT fix game code.
5. A round is CLEAN when 0 game bug rows (harness false positives marked as such don't count). Foreman D decides re-runs after fixes land.
6. Rollover: at START_CTX % + 25 % of the window (ceiling 60 %) write a handover in dev/handover/reports/robot10-nc-<A|B>.md and tell Foreman D; the coordinator opens your successor.
Report file: dev/handover/reports/robot10-nc-<A|B>.md (round, roads, lives, bug rows table, link to bug file + rates).

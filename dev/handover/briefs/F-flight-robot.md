# BRIEF — FLIGHT ROBOT ROUND (Foreman F #3, ORDER MAIN 131 02:10Z 25/11)
PRIORITY #1 CHECK ('flight robot'): OD 0 | ledger 0 | claims 1 | main 0 | review/* 0 | archive 0 → reuse F's robot harness (robot-fix-cnv round scripts: dev/measure/robot10.js, dev/test/r10-play-rt.js RELOAD=1 true reload, r10-shared-ref, load-leak) and the co-op harness review/robot10-coop-stuckcap-r 5127e083 (night-picture tap fix); build no new mechanism.

## Owner question (verbatim, 25/11): «Robot đã chạy các kiếp chưa»
## MAIN 131 order (verbatim core): full-life robot round NOW on two arms: (A) flight head review/lc12-varC9 4232709a (what lands first); (B) a local merge of 4232709a + robot-fix-cnv-2 fe3cb80c (expect only index/sw conflicts → rebuild; do not push to review/lc12-*). Per arm: ≥10 solo lives Fold 755x1000 + co-op pair, true reload in each life; measure endings reached / soft-locks after load / no ending / timeouts / save drift / leak / tab lag vs the baselines. Fast: first numbers ≤90 min; any NEW blocker on arm A → FOR MAIN 131 at once (+ LC13 session_01V1ZZH4ECHMdfFkw4K9wicG).

## Baselines to compare against
- thd R2 24/11 16:51Z (handover 14ba8768): 10 lives, 8 bugs — files dev/handover/robot/thd-20261124-1651-R2.md/.json.
- pf 50-lives 24/11 17:54Z — dev/handover/robot/pf-20261124-R5-pt_su-merged.md + rates-20261124-1754*.
- robot-fix-cnv-2 numbers (reports/robot-fix-cnv.md «BIG REVIEW robot-fix-cnv-2»): true-reload drift LIVE 89–100 vs fe3cb80c 1–5; load leak 0.87 → 0.23 MB.

## Setup (sparse worktrees under /home/user/wt; fetch --depth=30 with explicit refspec under flock /home/user/wt/fetch.lock; never full-clone, never git pull)
- GAME build = your arm: A = 4232709a as is; B = local merge `git merge fe3cb80c` onto 4232709a, resolve index.html/sw.js by rebuilding (dev/build/assemble.py + dev/site/build_site.sh); if any game file conflicts, STOP and report to F #3 (do not guess).
- HARNESS = dev/measure + dev/test from fe3cb80c (has RELOAD=1 true-reload probe); co-op clear/tap from review/robot10-coop-stuckcap-r 5127e083. Overlay test files only; never change game files.
- Run as harness-tracked background jobs (detached runs die when idle containers are recycled); RESUME/FLUSH after every 2 h job cap.

## Runs
- SOLO runner (per arm): ≥10 lives on Fold portrait 755x1000, roads cnv_mat + thd_tho (5 + 5, PAR=2), each life does ≥1 TRUE reload (save → fresh page/reload → title-button load) mid-life; play to an ending or the 90-min no-progress cap.
- CO-OP runner (per arm): one pair (SWAP=0 SEED=1, iPad 1180x820 host + Fold guest) ≥5 kiếp per seat, true reload once per life on each seat.
- Measure per arm: endings reached (count + names), soft-locks after load, lives with no ending, TIMEOUTs, save drift families (true reload), load leak MB/load, tab/buổi lag p95; co-op: stuck rooms (tag stuckcap if night-picture), coop-world/pos/stat mismatch, turn p95.

## Output
- First numbers to F #3 within 90 min of start (one line), then every ~2 h.
- File dev/handover/robot/flight-<arm>-<solo|coop>-<yyyymmdd-hhmm>.md + .json on the handover branch; push often; push every commit before you stop.
- Any NEW blocker on arm A (soft-lock, crash, save loss, no ending where baseline ended) → send F #3 at once with repro (seed, life, week, last 20 actions, save key).
- Known artefacts (count, don't dig): «Bạc +8»/«Sức +6» shown vs applied (old harness), kỳ ngộ card dropped at load (by design).
- End: «RUNNER DONE <name>» to F #3 with the table.

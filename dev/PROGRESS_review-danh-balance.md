# PROGRESS · review/danh-balance (opus, Foreman D) — base origin/main bad941b4
Item: flag 1 of act-dedupe wave 1 (dev/handover/reports/act-dedupe.md): Danh grows slower for a Hành-sự-only player after the dedupe.
Rules read: START_CORE, START_WORKER, topic/balance-economy, OD 16/11 lines (ONE CORE L1267, gain-and-loss L1227, BALANCE L582).
NO BAL value is changed on this branch (owner OK needed); proposal goes in the report.

## Done
1. ONE CORE fixes (no value change): typed Danh gates → `BAL.danhG` (j3 forget, j4 fatherBook, j97 thdBook, j42 srvWed, jkc kcVihanh/kcR5);
   succession condition rows (text + rule) → `BAL.succN` (j99succ); Tài nghệ charity act + card text (j85, jtabs) + Đức panel → `BAL.charity`.
   All in jbal2.js. Probe: texts identical, charity gives Bạc −20 Đức +3 Danh +1, 0 page errors.
2. Harness (reused from review/balance-after-truth: inpage6 + inx/inpz/inty/inpromo/inbirth, run_par, mkinp, anpass) + new:
   - `dev/measure/indanh.js`: Danh per source (card/talk/pick/scheme/lesson/walk/tick), Danh + rank at tuần checkpoints, `__capWk` cap,
     `__hsOnly` (inpage6 guards: sensible AND random bot play only Hành sự cards + exam + dialogs; no pop-ups, walks, schemes, lessons).
   - `dev/measure/andanh.py` (table), `dev/measure/danhscan.py` (static scan of Danh literals/gates per file).
3. Runs (not committed: worktree tmp/): builds `_before.html` = main 0a311183f (pre-dedupe), `_after.html` = main bad941b4.
   `tmp/arms.sh` (sens hs/mix × before/after, seed 501, 48 lives, 4 pages, cap 144 tuần), `tmp/arms2.sh` (rand hs/mix seed 501, sens seed 777).
   Reproduce: `PRE="window.__hsOnly=1;window.__capWk=144;" MORE=indanh bash dev/measure/pass/mkinp.sh tmp/inp_hs.js`, then
   `cd dev/measure && node run_par.js root/_after.html sens 48 out.json ../../tmp/inp_hs.js 4 501`; `python3 dev/measure/andanh.py a=out.json`.

## Done 2
- All arms run, report dev/review/danh-balance.md, data dev/measure/pass/data/danh/, site rebuilt. Proposal P1 (BAL.charity) + P2 (exam, needs a Tài nghệ bot) waiting for the owner.
## Next (old)
- Wait for arms, write the table + proposal into dev/handover/reports/danh-balance.md (handover branch), rebuild the site, push.

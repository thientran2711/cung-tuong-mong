# robot10-E-R5 (origin pf)
PRIORITY #1 CHECK: OD 23/11 ROBOT PLAYTEST; brief E-robot10-runner.md; known families from R3/R4/R7 not re-flagged.
Round 1 · harness main 14ba8768 (pt_hai) · fixed harness 19183dca (pt_su)
| road | lives | bug rows | softlocks | status |
|---|---|---|---|---|
| pt_hai | 50 | 40 | 3 (stuck after load, wall cap, TIMEOUT) | done |
| pt_su | 50 planned | - | - | running (out-R5b) |
Bug file: dev/handover/robot/pf-20261124-0256-R5-pt_hai.md (+ .json); rates: rates-20261124-0856.md. Saves kept on the box (not in git).
New families: js econ card TypeError ('queen' of null); option text vs effect for Sủng/Sức; stat range duc/sac/tai.

## pt_su (done) — merged 50 lives, 4 chunks of 2 bots (run 1 hit the 2 h background cap at 14 lives)
Game sha 14ba876800413622b83814e8a8cdd848ac0ed241. Harness 19183dca (skilled, random) then 9e89619a (greedy…speed). Bug file pf-20261124-R5-pt_su-merged.md (+ .json), rates-20261124-1754.md (all pf lives).
Harness failures (browser closed mid-life, not game bugs): cautious-4/5, schemer-4/5, lover-3, rebel-5 (7 lives). Speed bot: 4 of 5 lives TIMEOUT at 0–12 buổi (inpage6, 66–211 s) — worth a fixer look. 
Saves kept on box (/home/user/wt/out-R5*/saves), not in git. Known families (save round-trip diff, Sang ngày mới stuck, mem leak, tab overlap/lag) not re-flagged.

# knobbot — the studying life bot used for the balance-core-r3 knob sample (results: reports/review-balance-core-r3.md § Knob sample / § Last probes)
1. Put the bot scripts (measure/*.js) into dev/measure/ of a checkout. That checkout is the BOT dir (it was /home/user/wt/rbc, balance-core-r3 8939c663).
2. Build each arm: `git worktree add /home/user/wt/<arm> <sha>`, apply the arm's BAL edit, then `bash dev/site/build_site.sh`. This gives /home/user/wt/<arm>/index.html.
   Arms: rmain = LIVE 8c8b8b6b · nf = ed977bf4 · rst = 8939c663 + LIVE jbal2 hunks · kk = ed977bf4 + deck lv 2 + "sac" out of BAL.grow.keys
         tp = ed977bf4 + LIVE start Tài + BAL.art.stUp 2 · nobc = e5029d1b · k1/k2 = 8939c663 + RANKS d 36/45/55/63 / deck lv 2
3. runk.sh <arm> <seed> <N> <capSec> runs one process: GAME=<arm>/index.html SEED HHSTOP=1 CAP, INP=inpage6.js, INP2=inbc.js + indt.js + instudy.js.
   Edit the BOT dir path and OUT in runk.sh. indt.js is loaded by a relative path from dev/measure.
4. sup2.sh <arm> <N> keeps 4 processes (seeds 21+) until the arm has N lives. Each process uses ~3 GB, so run ≤ 4 at a time.
5. Tables: `ARMS=a,b OUT=outk python3 tablek.py` (HH, rank, stats m0/12/24/36); `python3 net36.py a b` (Danh gain/loss/net by source m0–36, needs l36); s36.py (gains only).
6. lives.csv = one row per sampled life (all arms, 105 lives): HH, rank, Danh m0/12/24/36, Tài/Sắc/art bậc m36, net Danh m0–36. The raw JSON is not kept.

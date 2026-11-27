## SEAT RECIPE (s21)
1. Fetch: `flock /home/user/wt/fetch.lock git fetch -q --depth=30 origin +refs/heads/main:refs/remotes/origin/main +refs/heads/review/robot-realtap:refs/remotes/origin/review/robot-realtap`; harness worktree: `git worktree add --detach /home/user/wt/rt origin/review/robot-realtap` (f65d019b, harness only).
2. Serve newest LIVE: `S=$(git rev-parse origin/main); setsid nohup bash /home/user/wt/rt/dev/test/rt-serve-build.sh $S <port> > serve.log 2>&1 &` (run from the main repo dir); wait for «self-check OK: 137 local paths all 200» and curl the page for window.CTM_BI b.
3. Fresh life: `rm -rf <out>/profile-<life>` (and any old <life>.ckpt.json) BEFORE a fresh start; resume = keep both.
4. Launch: `cd /home/user/wt/rt && setsid nohup node dev/test/robot-rt.js http://127.0.0.1:<port>/ <out> dev=ipad|fold bot=<persona> seed=<n> life=<name> [pick="Tĩnh dưỡng|Truyền thái y"] > <out>/run.log 2>&1 &` (pin=1 default: the log prints «BUILD PIN … served at …»; check GAME BUILD b = served b).
5. 2 h cap / container restart: relaunch the same line + `resume=1` (ckpt written every 50 buổi / 10 min).
6. Watch: Monitor `tail -n0 -F run.log | grep -E "STATUS|BUILD MISMATCH|LIFE DONE|Error:"`, persistent, timeout_ms 3600000 (expires after 30 min; re-arm). Hourly state: `python3` over <life>.ckpt.json: R.buoi, R.dead, R.bugs, R.harness.stuck, R.saves[-1], json.loads(c['ls']['hclh-save-v2-1'])['S'] → rank/suc/ill/fakeIll/khPois.
7. Hourly ping (send_message to foreman, ONE line): life · buổi · year · rank (reader) vs on-screen title (Read <out>/shots-<life>/now.png: Đáp ứng=0, Thường tại=1) · bugs · stuck · dead · alive · save size · Sức + illness.
8. End («LIFE DONE» in run.log): copy <life>.json/.md/-moments.md to dev/handover/robot/ in a sparse worktree on review/flight2-s21; write <life>-bugs.md from json bugs+dead (+ illness log); `node dev/measure/robot-audit.js dev/handover/robot/<life>.json > dev/handover/robot/<life>-audit.md` (script is on origin/review/flight2-s20 / handover branch); commit, `git push origin review/flight2-s21` (retry ×4), send «LIFE DONE <life> <ending> <age> VALID/INVALID <sha>».
9. Rules: real taps only, no cap, no exit road, never main, no PR, never full-clone/git pull.

| round | life | end | valid? | why |
|---|---|---|---|---|
| flight2-s21c.json | flight2-s21c | Hồng nhan bạc mệnh — Bà đỡ quỳ ngoài điện: ngươi khó sinh, chỉ giữ được một. Hoà (age 25 y6) | VALID |  · offers 204/157 picked |

COUNTS: lives 1 · VALID 1 · INVALID 0 · MIXED-BUILD 0 · ends death 1 · why  · mgQuit 0 in 0 lives (mini-games quit, not played; life verdict unchanged) · promotion roads 204 seen / 157 picked (real exam / decree / review / selection cards, rt-offer.js rule 2; old word-match count 204)

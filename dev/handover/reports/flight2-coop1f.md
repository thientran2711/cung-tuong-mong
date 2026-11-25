# HANDOVER A-COOP (flight2-coop1f) — written 09:01Z 25/11, START_CTX ~5%, now ~28% (trigger 30%)
Session: A-COOP session_01UV1Szhju4ofdVDmJdWCiJk (depth 3), reports to Foreman F (now F #8 session_01UV1SzkEpuyWvX9QjA3aJDB).
## State
- Room VGPR (flight2-coop1f), harness 4523381f, seed 7001, host Fold + guest iPad, RTV=1, real taps, no cap, running since 08:08Z, now buổi 73 (Y2 ch2). Launched with setsid nohup in THIS container: process + out dir /home/user/wt/rt-out (run.log, shots-*, *.ckpt.json) live only here. Co-op cannot resume: a successor in a NEW container cannot continue this room; only monitoring from this container works. If this session ends / container is recycled, the room is lost (rerun on 5edf09f6 or newer; ff367ab8 has the Lui false-alarm fix).
- Watch: tail /home/user/wt/rt-out/run.log (grep 'LIFE DONE|ROOM DONE|BUG stuck'); worktree /home/user/wt/rt (harness, detached at 4523381f).
- Voided rooms (evidence on handover branch): flight2-coop1 (title drop, 58013849), coop1c/1d (restart), coop1e KEH9 (mutual wait buoi 30, db01bd2f dev/handover/robot/flight2-coop1e-stuck/).
- Earlier arm-A co-op round (old harness): dev/handover/robot/flight-A-coop-20261125-0520.* + flight-A-coop-repro/.
- Moment log so far: dev/handover/robot/review/flight2-coop1-moments.md (kept in /home/user/wt/hov, pushed with this file). Still to write at the end per ROBOT-PLAYER-REVIEW: end-of-life review per seat (10 areas incl. j co-op) in dev/handover/robot/review/flight2-coop1-<seat>-review.md, results push to dev/handover/robot/flight2-coop1.*, then «LIFE DONE coop1 <host ending/age> <guest ending/age>».
## Resume
Nothing to resume: let the running room finish in this container. A fresh room: cd /home/user/wt/rt && git checkout <harness sha> && RTV=1 setsid nohup node dev/test/robot-rt-coop.js https://thientran2711.github.io/cung-tuong-mong/ <out> host=fold guest=ipad kiep=1 seed=7001 tag=<name>.

# flight2-s15b HANDOVER (written 11/26/2026 ~18:50Z, ctx 23 %, session_01UV1Szhk5EbghGNi7oDMvVw; F #24 cannot open a successor, life keeps running low-context)
Life: flight2-s15b · Fold 755x1000 · bot=cautious · seed 2026112536 · harness 8ea10d7e (switched from 0e0ebe29 at buoi 136, "save restored 715157 of 715157") · build 1dcb373e+ / b 5ab5b80e406e pinned (:8729, builds=1).
State 18:42Z: buoi 1392, year 10, age 27, rank 0, bugs 13, stuck 0, dead 0, save 2.88M chars (+~4k/buoi; quota ~5.2M as s3f -> est. b2300). No crash/restart since the switch.
Files (NOT in git): /home/user/wt/s15out/{flight2-s15b.json,.md,.ckpt.json,-moments.md,run-b2.log,profile-flight2-s15b,shots-flight2-s15b}; harness worktree /home/user/wt/s15h2 (8ea10d7e).
RESUME (if the container dies; same out dir, same args):
cd /home/user/wt/s15h2 && until node dev/test/robot-rt.js https://thientran2711.github.io/cung-tuong-mong/ /home/user/wt/s15out dev=fold bot=cautious seed=2026112536 life=flight2-s15b pin=1 resume=1; do echo "EXIT $?"; sleep 5; done
(pin serves the recorded build b 5ab5b80e406e itself; exit 3 = crash, loop resumes.)
Known bugs: GAME ".kmov dialog no close/next after scroll to end" (x3, harness unsticks by tap), GAME "#kdaytc no reachable button, clipped, nothing scrolls" (x2, life went on); HARNESS 5x "area tap blocked (kemo layer)".
At the end: copy flight2-s15b.json/.md/-moments.md (+ .bugs.md) to dev/handover/robot/ on review/flight2-s15 (worktree /home/user/wt/s15push), run node dev/measure/robot-audit.js on the json (script: handover branch dev/measure/robot-audit.js), send «LIFE DONE flight2-s15b <ending> <age> <VALID?> <sha>».
Reporting: F #24 session_01UV1SzmHA5hTTRBKmL8icCW (hourly -> every 2 h or on game bug / hard stop / LIFE DONE, per F #24). Pause rule: ~55 % ctx -> stop at clean ckpt, push partial as flight2-s15b.*, say «PAUSED at b<N>, resume from ckpt».

---
# flight2-s15d HANDOVER (11/27/2026 ~03:15Z, ctx 29.3 % measured 03:04Z; coordinator F ROOT #2 session_01UV1SzjiyJzqC1pGgm8zVFQ can only message, so the life keeps running low-context)
Life: flight2-s15d · Fold 755x1000 · bot=cautious · seed 2026112541 · harness now 97e55a457 (running process) / worktree /home/user/wt/s15h3 checked out at 39c6e505 (used at next natural resume) · build f573dc94+ / b 653cff86007d pinned (:8925, root /home/user/wt/build-53319e6f4a52…, pixi file copied in at b1271 — buổi 1–1271 pixi screens were degraded vs LIVE, HARNESS pin-copy gap, logged once).
State 03:11Z: buoi 1684, year 12, age 29, rank 0, bugs 10 (GAME «#kdaytc no reachable button» x2), stuck 0, dead 0, save 3.56M chars (quota ~5.2M).
Files (not in git): /home/user/wt/s15out/{flight2-s15d.json,.md,.ckpt.json,-moments.md,run-d2.log,profile-flight2-s15d,shots-flight2-s15d}.
RESUME if the container dies: cd /home/user/wt/s15h3 && until node dev/test/robot-rt.js http://127.0.0.1:8802/ /home/user/wt/s15out dev=fold bot=cautious seed=2026112541 life=flight2-s15d pin=1 resume=1; do echo "EXIT $?"; sleep 5; done   (8802 = rt-serve-build.sh 53319e6f 8802; pin re-serves b 653cff86007d itself)
End procedure: copy flight2-s15d.json/.md/-moments.md (+ .bugs.md incl. the HARNESS pixi-404 note) to dev/handover/robot/ on review/flight2-s15 (worktree /home/user/wt/s15push), node dev/measure/robot-audit.js on the json, send «LIFE DONE flight2-s15d <ending> <age> <VALID?> <sha>» to F ROOT #2. No new life after this one. Pause rule: ~55 % ctx -> clean ckpt, push partial, say «PAUSED at b<N>, resume from ckpt».

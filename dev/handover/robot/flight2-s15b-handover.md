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

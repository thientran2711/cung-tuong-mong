# RESUME flight2-s20d (written 01:32Z by s20, depth 4)
Life: flight2-s20d | iPad 1180x820 | bot=greedy | seed 2026112566 | pick="Tĩnh dưỡng|Truyền thái y" | pinned main 5fb13d60 (CTM_BI b 0b372aa14258 t 2026-11-27T21:07Z)
State at FINAL ckpt 01:30:21Z: buổi 334, year 3 (clock ~3.x), alive, 1 bug, stuck 0, dead 0, save ~149k chars. No ending yet. Runner + loop stopped cleanly by SIGTERM right after that ckpt.
Out dir used: /home/user/wt/s20out (ckpt flight2-s20d.ckpt.json, profile not in git).
Successor: copy flight2-s20d.ckpt.json into <out>/ and run with resume=1 (never a fresh start under the same life name: profile reload = LIFE VOID; resume restores the save from the ckpt).
Command (harness: foreman says use 795f87ec for resume; the running life used f65d019b):
  cd <harness worktree>; NODE_PATH=$(npm root -g) RT_PIN=1 node dev/test/robot-rt.js http://127.0.0.1:<port>/ <out> dev=ipad bot=greedy seed=2026112566 life=flight2-s20d pin=1 "pick=Tĩnh dưỡng|Truyền thái y" resume=1
  (loop on exit 3 = resume again; run via run_in_background, 2 h cap -> relaunch)
Build: serve with `bash dev/test/rt-serve-build.sh 5fb13d60 <port>` (or --b 0b372aa14258); the harness also auto-serves the recorded build via pin=1 / buildGate.
At end: copy flight2-s20d.json/.md/-moments.md to dev/handover/robot/ on review/flight2-s20; run dev/measure/robot-audit.js (from the handover branch); send LIFE DONE to the foreman. Add the illness scan (bệnh/ốm/thái y/Tĩnh dưỡng) to flight2-s20d-bugs.md.
Done so far by s20: s20a VALID e94ee066, s20b VALID 43aaf0b2, s20c VALID 9eec6341 (Hồng nhan bạc mệnh y20, QuotaExceeded save loss at ~5.37M chars on build 1b04f52f65fd).
Foreman: F ROOT 7 child 3 session_01UV1Szk32VwoCUYMeNVb5vA. Reports via mcp__claude-code-remote__send_message.
Open notes: 404 /img/kit/ico-download.webp, emo-anim/vui, emo-fx/vui, mg-undefined-bg; «Danh hiệu mới / lên bậc» «Để sau» dead on s20c; «Tâm bệnh» dialog only «Lui» (s20c).

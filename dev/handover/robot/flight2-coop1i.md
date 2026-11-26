# flight2-coop1i — A-COOP #2 life (host Fold / guest iPad, seed 7004, room P89H) — STOPPED-BY-GAME-BUG (co-op mutual week-end wait) — NOT VALID
PRIORITY #1 CHECK: coop1g VOID 2f109757, coop1h VOID f5ffc84d, F #24 order «STOP now» 19:51Z 11/26.
## Tag
STOPPED-BY-GAME-BUG (co-op mutual week-end wait), NOT VALID; also MIXED-BUILD (see MIXED-BUILD.md: unstamped ≤03:24Z → 3762da08+ → 6b5d3d05+).
## Timeline (UTC)
- 11/25 11:23 room P89H created on 95718760 (host Fold «Thượng Quan Ngân Chúc», guest iPad «Yến Phù Dung»); played with real taps; first frozen frames 17:06Z.
- 17:06Z 11/25 (host-1706.png / guest-1706-kchatp-chatdlg.png): game date «Tháng tám · hạ tuần · năm thứ nhất». Host overlay VERBATIM: «Đợi hảo hữu xong tuần — Ta đã sang ngày mới. Khi hảo hữu cũng xong tuần, tuần mới bắt đầu cho cả hai.» ÁM HIỆU P89H · HẢO HỮU «chưa xong tuần» · TA «đang ở trong cuộc» [Về màn đầu]; host stats Thường tại 19 tuổi Sắc100 Tài64 Tâm cơ17 Đức14 Danh33 Sủng0 Bạc75 Sức100/100, mood «Phẫn uất −88», «Cấm túc 2 tháng». Guest HUD «Hết buổi», disabled button «Chờ hảo hữu…», Đáp ứng 18 tuổi Sắc51 Tài34 Tâm cơ38 Đức35 Danh34 Sủng0 Bạc0 Sức94/99, hạ tuần tháng tám năm thứ nhất.
- 11/26 ~19:50Z (host-2000-frozen.png / guest-2000-frozen.png): both seats stat-for-stat and overlay-for-overlay IDENTICAL to 17:06Z/17:44Z 11/25 → game date did not advance for ~27 h wall. Moments log: «year 1 · turn 5 · tuần 2» (41 look-ins, tuần 2 never closes).
- Harness «buổi» counters (host 253 / guest 245) and every earlier «buổi» line in my reports (hourly lines to F #14–#23) are COUNTER ARTEFACTS (the counter ticks when the clock key changes after each rejoin), NOT game progress.
- The rejoin supervisor (sup*.sh, restart both seats via resume=1 room=P89H every 6 min of no counter change) only reopens pages; it never released the wait. 0 dead buttons, 0 «Một mình»/«Bỏ phòng» taps in the resumed runs; no exit road picked.
## Cause (finding)
Game-side co-op mutual end-of-week wait (family M «Đợi hảo hữu xong tuần» / «Chờ hảo hữu…»): host has finished the week and waits for the guest to finish it; the guest has pressed ready at «Hết buổi» and its button is disabled; nothing in the game releases the pair. Per-buổi cap «Mỗi buổi tối đa 3/5/8 phút» did not release it either. Speed finding (~3.5 buổi/h): NOT harness speed — counter artefact of a frozen game.
## Disk state (kept, not deleted)
/home/user/wt/out-coop1i/ (this container only): profile-coop-flight2-coop1i-fold + -ipad (1.2 GB each, hold the localStorage saves incl. ctm-coop-rooms / ctm-resq:P89H), seat jsons, ckpts (R + game save), shots-* (≈200 MB each, 253 shots, NOT in git), run logs. In git (this folder): seat json, ckpt, pair json, moments md, sup.log, last-run-tail.log, key shots.
## Resume steps for a fix build
1. Same container: `cd /home/user/wt/rt16 && node dev/test/robot-rt-coop.js https://thientran2711.github.io/cung-tuong-mong/ /home/user/wt/out-coop1i host=fold guest=ipad kiep=1 seed=7004 tag=flight2-coop1i resume=1 room=P89H` (harness 2df8f5fa has the resume=1 room=<CODE> patch of b8900828 + resumePre; both seats «Cùng hảo hữu → Chọn sổ → Trở lại phòng»).
2. New container: NOT resumable by ckpt alone — the room slot/pid lives in each profile's localStorage (ctm-coop-pid, ctm-coop-rooms, ctm-resq:P89H) and the game save in the ckpt «save» field is 0 chars in this harness version ('CP … save 0 chars'); copy both 1.2 GB profile dirs, or start a new room.
3. The stall is reproduced by any pair that reaches a week end with one seat done and the other at «Hết buổi · Chờ hảo hữu…».
## Handover (ctx 50%)
A-COOP #2 session_01UV1SziX7QGW5M2nktXq8Av stopped the room and the supervisors 19:5xZ 11/26; nothing runs. No other open item except F #24's push of this folder and the game-bug post to MAIN 161.

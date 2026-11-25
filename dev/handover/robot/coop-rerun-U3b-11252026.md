# U3b co-op rerun — segment results + HANDOVER (runner session_01N1tNP6EaANiCTZTgGFPYfd, 25/11 06:15Z–20:50Z)
Unit U3b, pair 4 (RERUN LIST host k1,2,5–10 / guest k1–24). Rules: real taps; MAIN 139 segment = 2 h real-tap OR year 2, 0 stuck, ≥1 mid-year save+reload. Header of every row: game sha + harness sha + patches.
Context at handover: 43 % (434k / 1M), START_CTX ~3 %.

## Rooms / segments (no VALID segment yet; 0 lives finished)
| # | room | game | harness + patch | devices (host/guest) | seed | clean time | result |
|---|---|---|---|---|---|---|---|
| r1 | QH9Y | LIVE 225c5c08 | cbb90e91 + room-code regex | Fold cn/cn_chu / iPad ch/ch_ho | 1 | ~35 min (Y1 Tháng ba) | STUCK buổi split (host sáng / guest trưa) |
| r2 | U5HB | LIVE 225c5c08 | c826eca4 | same | 2 | ~35 min | STUCK same |
| r3 | P2JR | LIVE 9f72524b | c826eca4+unstick | same | 3 | ~40 min | STUCK week-end barrier |
| fx1 | 6ZB2 | fix-6 d16c5300 (local Worker) | +dump | same | 1 | ~45 min | STUCK buổi split + Tin báo |
| fx2/3/4 | EEWJ, PDXY, AZ9J | fix-6 c4163a93 | +NAV log | same | 1,4,4 | week 0 | host fell to bare #title (cause: ☰ Ô lưu, harness tap) |
| seg1 | 278B | c4163a93 | 5edf09f6 + B#1 (skip Ô lưu) | same | 4 | 65 min clean | no reload → not counted |
| seg2 | WY4C | c4163a93 | + RELOAD_AT=30 | iPad td/td_ke / Fold pf/pt_dang | 5 | 1h45 | STUCK night 9 (cause-3 signature + host «night held … modal»/«seatold undefined») |
| seg3 | 8RZP | stack 512cfee6 | B#1 | Fold cnv/cnv_chu / iPad ch/ch_benh | 6 | ~66 min | STUCK buổi split wk 22 |
| seg4 | R7DR | 512cfee6 | B#2 | iPad nc/nc_su / Fold dtq/dtq_bien | 7 | ~1 h | STUCK PRESENCE (host: friend absent; guest fine) |
| seg5 | H5BW | 512cfee6 | B#5 | Fold thd/thd_tro / iPad bd/bd_hen | 8 | 1h25 | STUCK harness chip-trap (Bổng lộc Lễ nghĩa + Thang cơ duyên popup) |
| seg6 | SXDT | 512cfee6 | B#6 | iPad muoi/muoi_tuoc / Fold tt/tt_mat | 9 | 1h20 | STUCK same chip-trap |
| seg7(dead start TGZE) / 7b | HQHB | 512cfee6 | B#8 | Fold td/td_ke / iPad cnv/cnv_mat | 10 | 1h23 | STUCK wk 24 (#7 locked-card loop; harness) |
| seg8 | 7UGM | 512cfee6 | B#9 | iPad pf/pt_tang / Fold thd/thd_sach | 11 | ~1 h | STUCK buổi split + «Tin báo»+«Để sau» (wheel on wrong scroller) |
| seg9 | WQ55 | 512cfee6 | B#9 | Fold muoi/muoi_lau / iPad nc/nc_gian | 12 | ~50 min | STUCK story scene «Phụ tuyến · Tân quân lập uy» choices unreachable; guest saw host absent |
| seg10 | VFB6 | 512cfee6 | B#10 | iPad bd/bd_soi / Fold dtq/dtq_huynh | 13 | ~50 min | STUCK same story scene (host in scene, guest «Đợi hảo hữu trở lại») |
| seg11 | 7HVJ | 512cfee6 | B#11 (b49a5dd8, e7a53d76) | Fold cn/cn_than / iPad pf/pt_su | 14 | ~25 min (week 3, buổi 15) | STUCK «Tin báo» (39 tin) + undreachable decision card «Để sau» (rect y 2046, k3btns sh 214/ch 112) on Fold even with #11; guest 1 buổi ahead. Dump u3br/seg11-7HVJ/ |
All dumps: review/robot10-coop-saves u3br/<room>/ (latest push 331ce950). Moments logs: dev/handover/robot/review/coop-rt-U3b-*-moments.md. Bugs reported to Foreman B by message at the time (BUG FAST LANE).

## Recurring findings (for the digest)
- Reload mid-year at buổi 30 (both seats, scheduled) rejoined fine in EVERY segment (seg2–seg10).
- Ô lưu ☰ tap (harness) → slot chooser → host on bare #title: cured by skipping it.
- Odds-bar chips sit on option cards: tap lands on the chip → hint popup (#kpop) instead of the card («Nghe ngóng chung», «Trò chuyện với cung nữ», «Biếu quà nhỏ», «Xin chủ ban thưởng»…) = kit/UX bug (host 44 / guest 39 bugs in seg7b).
- «Tin báo» news lists up to 30 lines in one scroll; unknown people print as «???»; result cards «… ta không được gì, cũng không mất gì» for paid actions (Tự chọn đồ, Sai đi dò la, Nghe ngóng chung) feel pointless.
- Game JS error j15.js pcPort: f.rk.split is not a function (MAIN order PCPORT-RK).
- Story scene «Phụ tuyến · Tân quân lập uy · Chương 2 · Hồi 1/1» on iPad: choices below the fold, unreachable by wheel; the OTHER seat then shows «hảo hữu đang vắng».

## HANDOVER (for the successor opened by Foreman B child 5 session_01N1tNP4nRWqavzn2tWse96W)
- Work dir on the old box (gone with the container): /home/user/wt (worktrees rt*, sv, ho, st). To resume in a NEW container: clone sparse (depth 30), `git fetch origin review/robot-coop-stack-u3 review/robot-realtap claude/cung-tuong-mong-handover-hj0h8w`; build game: worktree of review/robot-coop-stack-u3 512cfee6 → `bash dev/site/build_site.sh` (needs curl to CDN; not committed); coop Worker: `cd coop/worker && npm install && npx wrangler dev --local --port 8788 --ip 127.0.0.1`; static: `python3 -m http.server 8081 --bind 127.0.0.1` in the built worktree (Python ≥3.7 is threaded). Harness: worktree of review/robot-realtap 5edf09f6 + `git apply` newest dev/handover/robot/realtap-B-5edf-patch.diff.
- Room command: `SEG_MIN=120 RELOAD_AT=30 COOP_URL=http://127.0.0.1:8788 node dev/test/robot-rt-coop.js http://127.0.0.1:8081/index.html <out> host=<fold|ipad> guest=<ipad|fold> kiep=1 seed=<n> tag=<name> hostOrigin= hostRoad= guestOrigin= guestRoad=`. One room per container. Alternate device order each segment (U3b: iPad host first).
- Stuck rule (Foreman B): on stuck dump BOTH seats (harness writes shots-<life>/stuck-N-dump.json), push to review/robot10-coop-saves u3br/<seg>-<room>/ + README, send_message Foreman B, then start next segment.
- RERUN LIST rows for U3b are NOT done: host k1,2,5–10 and guest k1–24 still need real-ending lives; segments are the new unit (≈20 across B).

## FINAL (20:55Z): seg11 closed STUCK. Tally 0 VALID / 11 closed segments, 0 lives finished. Runner stops here; successor U3b-2 session_01N1tNP2HWuJXKRafMwdgWGn (seeds 15+).

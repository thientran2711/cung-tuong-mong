# rerun-nc_tuc — rerun of D's INVALID nc_tuc lives (seat A3)
Updated 2026-11-26 ~09:20Z. Lives 9/14 finished (scholar-2, lazy-2, speed-1 running; lazy-1, speed-2 queued). Harness: review/robot-realtap 93812531 (segments on 4523381f / 2aad6849 / 1a29f470 earlier). 3 lives run in parallel; checkpoint/resume across page crashes and 2 h job limits.

| life | bot/dev | end | valid | harness sha | review |
|---|---|---|---|---|---|
| random-1 | rand fold 4180392236 | Lãnh cung «Phát điên trong lãnh cung» age 27 b1482 | VALID | 4523381f→1a29f470→93812531 | robot/review/rerun-nc_tuc-random-1-review.md (no live moment log) |
| skilled-1 | sens fold 1103809447 | Hồng nhan bạc mệnh (Chính Đức băng hà) age 26 y8 b1220 | VALID | 4523381f→2aad6849→1a29f470→93812531 (HARNESS-STUCK b23 fixed by 93812531) | robot/review/rerun-nc_tuc-skilled-1-review.md (no live moment log) |
| skilled-2 | sens ipad 3241370198 | Lãnh cung «Tuổi xuân qua đi» age 40 y22 b3247 | VALID | rt2 | robot/review/rerun-nc_tuc-skilled-2-review.md (no live moment log; 17 dead buttons, 23 stuck) |
| random-2 | rand ipad 3192899969 | «Hồng nhan bạc mệnh» ban rượu độc (mưu hại Tô Bạch Mạch Nhi) age 23 y5 b642 | VALID | →93812531 | robot/review/rerun-nc_tuc-random-2-review.md (no live moment log) |
| greedy-1 | bold fold 2020792563 | «Hồng nhan bạc mệnh» (Hưng Long băng hà) age 31 y12 b1678 | VALID | 93812531 | robot/review/rerun-nc_tuc-greedy-1-review.md (no live moment log) |
| cautious-2 | cautious ipad 3758694459 | «Hồng nhan bạc mệnh» (Vĩnh An băng hà) age 24 y5 b639 | VALID | 93812531 | robot/review/rerun-nc_tuc-cautious-2-review.md (no live moment log) |
| lover-1 | sens fold 1379876621 | Xuất gia làm ni cô age 30 y13 b1867 (game-imposed) | VALID | rt2 | robot/review/rerun-nc_tuc-lover-1-review.md (no live moment log) |
| lover-2 | sens ipad 2367368888 | Hồng nhan bạc mệnh (lao phổi) age 27 y8 b1113 | VALID | rt2 | robot/review/rerun-nc_tuc-lover-2-review.md (no live moment log) |
| scholar-1 | sens fold 4239854445 | Công chúa ở lại cố quốc age 19 y2 b122 | VALID | rt2 | robot/review/rerun-nc_tuc-scholar-1-review.md (no live moment log) |
| others (scholar-2, lazy-1/2, speed-1/2) | — | running / queued | — | — | — |

## HARNESS-STUCK
- skilled-1 b23 (08:31Z–10:01Z): sole-option card «Tắm gội chờ giá» in «Kính sự phòng báo tin». Evidence robot/rerun-nc_tuc/stuck/. Fixed by 93812531; life resumed from ckpt.

## Bugs (game/UI), see also FAST LANE messages
Popup «Bổng lộc tháng mười» over ending card; JS error `f.rk.split is not a function` (~b89); «Tin báo» queue stacks (✕ pops one); «Lui» no effect on «Tâm trạng · Ta»/«Tin chờ người sai đi»/«Lịch tháng»; «Nhờ thái giám tìm thú nuôi» buttons covered; «Phụ tuyến · Tân quân lập uy» choices off-screen (iPad); no-clock loops «Trường Môn viện», «Thiên mệnh», «Khải Tường cung · Tĩnh Nghi trai», «Kính sự phòng».
Shots are container-local (not in git).

Harness from 03:14Z 26/11: rt2 = review/robot-realtap 54fa01129 (incl. bfa73a6e) + F10 hang watchdog hooks (RT_MEM/RT_LIGHT/RT_HANGKILL).

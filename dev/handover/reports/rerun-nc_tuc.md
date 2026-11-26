# rerun-nc_tuc — rerun of D's INVALID nc_tuc lives (seat A3)
Updated 2026-11-25 ~21:30Z. Lives 3/14 finished. Harness: review/robot-realtap 93812531 (segments on 4523381f / 2aad6849 / 1a29f470 earlier). 3 lives run in parallel; checkpoint/resume across page crashes and 2 h job limits.

| life | bot/dev | end | valid | harness sha | review |
|---|---|---|---|---|---|
| random-1 | rand fold 4180392236 | Lãnh cung «Phát điên trong lãnh cung» age 27 b1482 | VALID | 4523381f→1a29f470→93812531 | robot/review/rerun-nc_tuc-random-1-review.md (no live moment log) |
| skilled-1 | sens fold 1103809447 | Hồng nhan bạc mệnh (Chính Đức băng hà) age 26 y8 b1220 | VALID | 4523381f→2aad6849→1a29f470→93812531 (HARNESS-STUCK b23 fixed by 93812531) | robot/review/rerun-nc_tuc-skilled-1-review.md (no live moment log) |
| skilled-2 | sens ipad 3241370198 | running (b1849 y12) | — | → 93812531 | — |
| random-2 | rand ipad 3192899969 | «Hồng nhan bạc mệnh» ban rượu độc (mưu hại Tô Bạch Mạch Nhi) age 23 y5 b642 | VALID | →93812531 | robot/review/rerun-nc_tuc-random-2-review.md (no live moment log) |
| greedy-1 | bold fold 2020792563 | running (b846 y6) | — | 93812531 | — |
| cautious-2 | cautious ipad 3758694459 | running (b450 y4) | — | 93812531 | — |
| others (cautious-2, lover-1/2, scholar-1/2, lazy-1/2, speed-1/2) | — | queued | — | — | — |

## HARNESS-STUCK
- skilled-1 b23 (08:31Z–10:01Z): sole-option card «Tắm gội chờ giá» in «Kính sự phòng báo tin». Evidence robot/rerun-nc_tuc/stuck/. Fixed by 93812531; life resumed from ckpt.

## Bugs (game/UI), see also FAST LANE messages
Popup «Bổng lộc tháng mười» over ending card; JS error `f.rk.split is not a function` (~b89); «Tin báo» queue stacks (✕ pops one); «Lui» no effect on «Tâm trạng · Ta»/«Tin chờ người sai đi»/«Lịch tháng»; «Nhờ thái giám tìm thú nuôi» buttons covered; «Phụ tuyến · Tân quân lập uy» choices off-screen (iPad); no-clock loops «Trường Môn viện», «Thiên mệnh», «Khải Tường cung · Tĩnh Nghi trai», «Kính sự phòng».
Shots are container-local (not in git).

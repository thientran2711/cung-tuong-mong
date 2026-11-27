# rerun-nc_su — rerun of D's INVALID nc_su lives (seat A2)
Updated 2026-11-27 ~03:00Z. Lives 12/12 finished, all VALID (no exit pick, no bot-chosen exit; ends are death or game-imposed). Harness: review/robot-realtap 073380f9 + F10 hang watchdog (renderer-mem-lib hooks, RT_HANGKILL=3500); lives resumed from checkpoint after page freezes (exit 3) and 2 h job limits. 3 lives in parallel, 1 robot per life, par 3.

| life | end | age | year | buổi | taps | dead btn | stuck | bugs | valid | harness sha | review |
|---|---|---|---|---|---|---|---|---|---|---|---|
| cautious-1 | Lãnh cung | 21 | 3 | 668 | 1846 | 1 | 4 | 12 | VALID | 073380f9 | robot/review/rerun-nc_su-cautious-1-review.md (no live moment log) |
| cautious-2 | Hồng nhan bạc mệnh | 22 | 5 | 681 | 1918 | 0 | 0 | 4 | VALID | 073380f9 | robot/review/rerun-nc_su-cautious-2-review.md (no live moment log) |
| greedy-1 | Xuất gia | 33 | 16 | 2320 | 1990 | 0 | 0 | 5 | VALID | 073380f9 | robot/review/rerun-nc_su-greedy-1-review.md (no live moment log) |
| lazy-1 | Hồng nhan bạc mệnh | 29 | 12 | 1599 | 2472 | 0 | 0 | 1 | VALID | 073380f9 | robot/review/rerun-nc_su-lazy-1-review.md (no live moment log) |
| lazy-2 | Lãnh cung | 40 | 23 | 3448 | 1804 | 0 | 4 | 4 | VALID | 073380f9 | robot/review/rerun-nc_su-lazy-2-review.md (no live moment log) |
| lover-1 | Lãnh cung | 34 | 17 | 2533 | 2820 | 1 | 0 | 5 | VALID | 073380f9 | robot/review/rerun-nc_su-lover-1-review.md (no live moment log) |
| random-1 | Hồng nhan bạc mệnh | 27 | 8 | 1544 | 2182 | 12 | 15 | 41 | VALID | 073380f9 | robot/review/rerun-nc_su-random-1-review.md (no live moment log) |
| scholar-2 | Lãnh cung | 29 | 12 | 1854 | 3347 | 7 | 0 | 15 | VALID | 073380f9 | robot/review/rerun-nc_su-scholar-2-review.md (no live moment log) |
| skilled-1 | Hồng nhan bạc mệnh | 25 | 8 | 1555 | 3719 | 3 | 16 | 34 | VALID | 073380f9 | robot/review/rerun-nc_su-skilled-1-review.md (no live moment log) |
| skilled-2 | Hồng nhan bạc mệnh | 22 | 4 | 485 | 3367 | 12 | 9 | 18 | VALID | 073380f9 | robot/review/rerun-nc_su-skilled-2-review.md (no live moment log) |
| speed-1 | Xuất gia | 24 | 7 | 927 | 2483 | 0 | 0 | 1 | VALID | 073380f9 | robot/review/rerun-nc_su-speed-1-review.md (no live moment log) |
| speed-2 | Hồng nhan bạc mệnh | 21 | 4 | 485 | 2126 | 0 | 0 | 1 | VALID | 073380f9 | robot/review/rerun-nc_su-speed-2-review.md (no live moment log) |

## HARNESS-STUCK / hangs
- Page freezes (renderer 5-6 GB) on lazy-2, lover-1, speed-2, speed-1: exit 3, resumed from ckpt. greedy-1 b~703 hang stack sent to F10 (fixed on review/renderer-mem 60db5f48). Evidence: robot/rerun-nc_su/stuck/*.hang.json.
- Stuck-dialog families seen (reported earlier with seeds/shots): «Tin báo» / «Bị châm chọc» / «Kính sự phòng báo tin» loops; «Sang ngày mới» softlock with Q=1 «Tin trong cung buổi này»; no-clock loops (page «Trường Môn viện»…); dead «Lui» («Tâm trạng · Ta», «Tin báo», «Nhờ thái giám tìm thú nuôi»); random-1 JS error «Cannot read properties of undefined (reading off)» x2.

## Files
robot/rerun-nc_su/<life>.json|.md (harness output), queue.log, stuck/. Shots are container-local, not in git.

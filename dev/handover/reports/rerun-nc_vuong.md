# Rerun nc_vuong (A4) — partial, 4/10 finished
Open: cautious-2, speed-1, speed-2, lazy-1, rebel-1, random-2 (random-2 at buổi ~1046 running). Lives not yet started run on LIVE 5e013076; running lives keep their starting build (ROOT 2 ruling).
| life | end | valid | buổi | links | harness | counts |
|---|---|---|---|---|---|---|
| nc-nc_vuong-skilled-2 | Hồng nhan bạc mệnh (age 18) | valid (no bot exit) | buổi 119 | [moments](../robot/rerun-nc_vuong/nc-nc_vuong-skilled-2-moments.md) · [review](../robot/rerun-nc_vuong/nc-nc_vuong-skilled-2-review.md) | harness 4523381f | bugs 6 |
| nc-nc_vuong-lover-1 | Hồng nhan bạc mệnh (age 27) | valid (no bot exit) | buổi 1312 | [moments](../robot/rerun-nc_vuong/nc-nc_vuong-lover-1-moments.md) · [review](../robot/rerun-nc_vuong/nc-nc_vuong-lover-1-review.md) | harness 1a29f470 | bugs 35 |
| nc-nc_vuong-random-1 | Xuất gia (age 28) | valid (no bot exit) | buổi 1718 | [moments](../robot/rerun-nc_vuong/nc-nc_vuong-random-1-moments.md) · [review](../robot/rerun-nc_vuong/nc-nc_vuong-random-1-review.md) | harness 4523381f | bugs 46 |
| nc-nc_vuong-skilled-1 | Hồng nhan bạc mệnh (age 31) | valid (no bot exit) | buổi 1941 | [moments](../robot/rerun-nc_vuong/nc-nc_vuong-skilled-1-moments.md) · [review](../robot/rerun-nc_vuong/nc-nc_vuong-skilled-1-review.md) | harness 4523381f | bugs 50 |

Note: random-1 «Xuất gia» is a forced ending (Hoàng thượng băng hà, no children, rank 0), not a bot exit. Game bugs: see robot/rerun-nc_vuong/bugs/BUGS.md.

## PAGE FROZE (renderer memory) — speed-1, speed-2 (LIVE 5e013076)
Both froze at year 1, buổi 65–66, renderer ~5.7 GB / tree ~6.4–6.6 GB, harness exit 3 (no screenshot: page.evaluate hung). Last taps before the freeze, both: the «Tổng lược» book (.kbk «Trang sau/Trước», «Lui») right after a dawn / «Tin trong cung buổi này» step (speed-1: «Nguy hiểm chung: 66» → «Tiếp tục» → Tổng lược; speed-2: «Sang ngày mới» → #dawn «Tiếp theo» → Tổng lược → «Tin trong cung buổi này» «Lui»). Files: dev/handover/robot/rerun-nc_vuong/speed-freeze/nc-nc_vuong-speed-{1,2}.{log,ckpt.json,json} (ckpt = buổi 50, resume=1). For F10 renderer-mem.

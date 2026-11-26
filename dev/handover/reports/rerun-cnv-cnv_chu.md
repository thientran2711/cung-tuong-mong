# RERUN E solo cnv_chu — SEAT R2 report (state 26/11)

Foreman D = session_01D3E3NaM9SCxxy6LNzERgRj (depth 5). Road `cnv_chu`, 14 solo lives (U14/U17 are co-op, E's). Real-tap harness (`review/robot-realtap`), no cap, no bot-chosen exit road.

**Valid lives finished: 13/14** (speed-k2 still playing, Đáp ứng age 32+, buổi 2297). VOID + replayed: lover-k5 run 1 (age-25 «Xuất cung về quê», no «Xin ở lại» evidence), rebel-k2 run 1 and skilled-k5 run 1 (prologue cards «Chủ nợ đến nhà» / «Bà mối nhà phú hộ»: bot tapped «Theo họ về làm người ở» / «Nhận lời làm thiếp» while a non-ending sibling was open). Files of the VOID runs: `dev/handover/robot/rerun-cnv-cnv_chu/VOID/`.

Pattern in the valid lives: robot stays at the age-25 card («Xin ở lại») and is forced out at 30 («Xuất cung tuổi 30») in 10 of 13; 2 deaths by illness (23, 25) and 1 execution (tuẫn táng, age 31, speed-k4). speed-k2 alone left the age-30 route and is still playing.

Harness: sha column = `harness.sha` in the life JSON (value stamped by the process that last wrote it; lives were resumed from ckpt after container/job limits, so early segments ran older shas: 4523381f → 1a29f470 → 93812531 → 956db178 → 64d62d9b → bfa73a6e (exit family fix pushed by R2: «nhận lời làm thiếp | theo họ về làm người ở | ở lại quê nhà» in EXIT_RE) → 54fa0112 → c18e3d7d (+F10 hooks ff4a99a4)).

| life | end | age | buổi | valid | harness sha (+resumes) | bugs / dead | moments |
|---|---|---|---|---|---|---|---|
| chu-cautious-k2-3310950985 | Xuất cung tuổi 30 | 30 | 1992 | VALID | 4523381f (+5 resume) | 2 / 1 | [moments](rerun-cnv-cnv_chu/R2-cnv_chu-cautious-k2-3310950985-moments.md) |
| chu-cautious-k4-1862968319 | Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 23 tuổi | 23 | 663 | VALID | 4523381f (+3 resume) | 1 / 1 | [moments](rerun-cnv-cnv_chu/R2-cnv_chu-cautious-k4-1862968319-moments.md) |
| chu-lover-k5-1919735375 | Xuất cung tuổi 30 | 30 | 1704 | VALID | 956db178 (+3 resume) | 3 / 0 | [moments](rerun-cnv-cnv_chu/R2-cnv_chu-lover-k5-1919735375-moments.md) |
| chu-random-k2-3842829719 | Xuất cung tuổi 30 | 30 | 1420 | VALID | 93812531 (+3 resume) | 2 / 0 | [moments](rerun-cnv-cnv_chu/R2-cnv_chu-random-k2-3842829719-moments.md) |
| chu-rebel-k1-266714893 | Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 25 tuổi | 25 | 867 | VALID | 93812531 (+3 resume) | 1 / 0 | [moments](rerun-cnv-cnv_chu/R2-cnv_chu-rebel-k1-266714893-moments.md) |
| chu-rebel-k2-1254207160 | Xuất cung tuổi 30 | 30 | 1418 | VALID | 496b6b66 (+2 resume) | 0 / 0 | [moments](rerun-cnv-cnv_chu/R2-cnv_chu-rebel-k2-1254207160-moments.md) |
| chu-scholar-k2-2474504974 | Xuất cung tuổi 30 | 30 | 1705 | VALID | 64d62d9b (+1 resume) | 0 / 0 | [moments](rerun-cnv-cnv_chu/R2-cnv_chu-scholar-k2-2474504974-moments.md) |
| chu-scholar-k5-794864139 | Xuất cung tuổi 30 | 30 | 1705 | VALID | 64d62d9b (+1 resume) | 0 / 0 | [moments](rerun-cnv-cnv_chu/R2-cnv_chu-scholar-k5-794864139-moments.md) |
| chu-skilled-k2-3781147108 | Xuất cung tuổi 30 | 30 | 1707 | VALID | 64d62d9b (+3 resume) | 0 / 0 | [moments](rerun-cnv-cnv_chu/R2-cnv_chu-skilled-k2-3781147108-moments.md) |
| chu-skilled-k4-1335800862 | Xuất cung tuổi 30 | 30 | 1705 | VALID | 64d62d9b (+3 resume) | 0 / 0 | [moments](rerun-cnv-cnv_chu/R2-cnv_chu-skilled-k4-1335800862-moments.md) |
| chu-skilled-k5-1796291261 | Xuất cung tuổi 30 | 30 | 1705 | VALID | bfa73a6e (+2 resume) | 0 / 0 | [moments](rerun-cnv-cnv_chu/R2-cnv_chu-skilled-k5-1796291261-moments.md) |
| chu-speed-k1-601648750 | Xuất cung tuổi 30 | 30 | 1709 | VALID | 64d62d9b (+5 resume) | 0 / 0 | [moments](rerun-cnv-cnv_chu/R2-cnv_chu-speed-k1-601648750-moments.md) |
| chu-speed-k2-2242959839 | RUNNING |  | 2297 | — | 54fa0112 (+7 resume) | 2 / 2 | [moments](rerun-cnv-cnv_chu/R2-cnv_chu-speed-k2-2242959839-moments.md) |
| chu-speed-k4-3670154153 | Năm 14, Hoàng thượng niên hiệu Vĩnh An băng hà, thọ 35 tuổi. Tân Thái  | 31 | 1905 | VALID | 54fa0112 (+7 resume) | 1 / 3 | [moments](rerun-cnv-cnv_chu/R2-cnv_chu-speed-k4-3670154153-moments.md) |

## Bugs / candidates (nothing confirmed as play-stopper)
- «Nhờ thái giám tìm thú nuôi» (Tư trang › Thú cưng, jpet.js:266 petShop → kitShop jinv.js:463): ✕/«Lui» tapped 3× for real, dialog stays (speed-k2 buổi 1553 y14 and 2340; Bạc 6, all buys «Thiếu bạc»). Shots `rerun-cnv-cnv_chu/shots-R2-cnv_chu-speed-k2-2242959839/noeffect-1795693401871.png`, `…-1795694189091.png`. Hand repro attempted and NOT conclusive (save reopens on a queued «Biểu quà làm lành»). Hypothesis: dialog re-opens after close. Routed by Foreman D to MAIN 159.
- «Tin báo» / «Lịch tháng» stuck-15-min rows (early shas) = known harness «Tin báo» family, fixed in newer shas.
- F10 memory: speed-k2 PAGE FROZE b653 (renderer 7434 MB, `kitScrollCues < MutationObserver.observe.childList`); hang ckpt pushed `HANG-speed-k2-b653.ckpt.json`. Later segments pass 3.5 GB at b1750–1850 → RT_HANGKILL=3500 exit 3 → resume (not a freeze). Renderer MB per segment: b654 723 · b1000 2695 · b1500 2374 · b1800 3120 · b2000 2272.
- Design note (from the VOID runs, to MAIN after the flight): prologue cards «Nhận lời làm thiếp, trả nợ cho nhà» (d_moi) and «Theo họ về làm người ở» (d_siet) end the life at once but are labelled «an toàn»; options differ in cost, one is a life-ender (LAW 2/3).

## Not done yet (honest)
- Per-life player reviews (ROBOT-PLAYER-REVIEW §B) exist for cautious-k4 only (`dev/handover/robot/review/R2-cnv_chu-cautious-k4-1862968319-*.md`). The 12 other `-moments.md` files are the harness drafts (mechanical lines + shots), without the runner's own feeling lines or end-of-life review. Next worker: look at the shots in each shots-<life>/ dir (kept locally, not in git) and write the reviews.
- speed-k2 must still end.

## HANDOVER (R2, 26/11 ~14:00Z, context well past the roll line — successor please take over the reviews)
Remaining for the successor (open as a worker with START_CORE + START_WORKER + briefs/ROBOT-PLAYER-REVIEW.md):
1. Write the §B end-of-life review + feeling lines for the 12 lives with only a harness-drafted moments file: cautious-k2, lover-k5, random-k2, rebel-k1, rebel-k2, scholar-k2, scholar-k5, skilled-k2, skilled-k4, skilled-k5, speed-k1, speed-k4 (+ speed-k2 once it ends). Files: `dev/handover/robot/rerun-cnv-cnv_chu/R2-cnv_chu-<persona>-k<n>-<seed>.json/.md/-moments.md` (in git); the shots (`shots-<life>/`, `end.png`, `now.png`, m-*.png) are NOT in git: they live in the R2 container `/home/user/wt/r2h/dev/handover/robot/rerun-cnv-cnv_chu/` — if that container is gone, replay a life by its seed (`node dev/test/robot-rt.js <url> <out> dev=fold origin=cnv road=cnv_chu bot=<sens|cautious|bold|quiet|rand> seed=<seed> life=<id>`; persona→bot: cautious→cautious, lover/skilled→sens, random→rand, rebel/speed→bold, scholar→quiet) and review the new life instead. Review file names: `dev/handover/robot/review/R2-cnv_chu-<persona>-k<n>-<seed>-review.md` (+ the finished moments file there; cautious-k4 is the format example).
2. speed-k2 (seed 2242959839, life id R2-cnv_chu-speed-k2-2242959839): still running tracked in R2 (`/home/user/wt/r2-k2.sh`, resumes from its ckpt; exit 3 = RT_HANGKILL 3500 MB, just relaunch). When it ends, add its row/end to the table above.
3. VOID runs in `rerun-cnv-cnv_chu/VOID/` are evidence only, never count.
Rates must come from the 13 valid lives only.

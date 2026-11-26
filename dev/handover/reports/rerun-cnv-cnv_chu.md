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
- speed-k2 must still end (R2 runs it); its §B review is still to write.
- Per-life reviews (§B) for the other 13 lives are DONE by seat R2b (below). They are written from the CDN shots (a sample of 8–17 shots per life, contact sheets, not every one of the ~3800 files); each review lists the shots it looked at.

## HANDOVER (R2, 26/11 ~14:00Z, context well past the roll line — successor please take over the reviews)
Remaining for the successor (open as a worker with START_CORE + START_WORKER + briefs/ROBOT-PLAYER-REVIEW.md):
1. Write the §B end-of-life review + feeling lines for the 12 lives with only a harness-drafted moments file: cautious-k2, lover-k5, random-k2, rebel-k1, rebel-k2, scholar-k2, scholar-k5, skilled-k2, skilled-k4, skilled-k5, speed-k1, speed-k4 (+ speed-k2 once it ends). Files: `dev/handover/robot/rerun-cnv-cnv_chu/R2-cnv_chu-<persona>-k<n>-<seed>.json/.md/-moments.md` (in git); the shots (`shots-<life>/`, `end.png`, `now.png`, m-*.png) are NOT in git: they live in the R2 container `/home/user/wt/r2h/dev/handover/robot/rerun-cnv-cnv_chu/` — if that container is gone, replay a life by its seed (`node dev/test/robot-rt.js <url> <out> dev=fold origin=cnv road=cnv_chu bot=<sens|cautious|bold|quiet|rand> seed=<seed> life=<id>`; persona→bot: cautious→cautious, lover/skilled→sens, random→rand, rebel/speed→bold, scholar→quiet) and review the new life instead. Review file names: `dev/handover/robot/review/R2-cnv_chu-<persona>-k<n>-<seed>-review.md` (+ the finished moments file there; cautious-k4 is the format example).
2. speed-k2 (seed 2242959839, life id R2-cnv_chu-speed-k2-2242959839): still running tracked in R2 (`/home/user/wt/r2-k2.sh`, resumes from its ckpt; exit 3 = RT_HANGKILL 3500 MB, just relaunch). When it ends, add its row/end to the table above.
3. VOID runs in `rerun-cnv-cnv_chu/VOID/` are evidence only, never count.
Rates must come from the 13 valid lives only.

### SHOTS ON CDN (R2, 26/11)
Every shot a moments file names + `end` + `now` + noeffect/stuck/dead shots of the 14 lives, converted to webp q70 (name `.png` → `.webp`): `https://ctm-img.victoria-tntt.workers.dev/img/_review/rerun-cnv_chu/<life>/<name>.webp` (3811 files, 238 MB). `<life>` = `R2-cnv_chu-<persona>-k<n>-<seed>`, `<name>` as in the moments file (shots-<life>/m-new-1-1.png → `<life>/m-new-1-1.webp`). speed-k2 was uploaded mid-life (re-run `python3 dev/site/cdn_sync.py img/_review/rerun-cnv_chu` after it ends if shots are needed). Wipe with the verdict: `python3 dev/site/cdn_sync.py --wipe-review rerun-cnv_chu`.


## PLAYER REVIEWS §B (seat R2b, 26/11) — 13 of 14 lives (speed-k2 pending)
Files: `dev/handover/robot/review/R2-cnv_chu-<persona>-k<n>-<seed>-review.md`. Shots viewed per life in brackets. Scores: pacing / UI / story (0–10, n/a if not judged).

| life | felt | pacing/UI/story | bugs-candidates (new unless noted) |
|---|---|---|---|
| cautious-k2 [10] | alive court news, nothing changes for 13 y | 4 / 5 / – | Tin báo wall (20+ items/day); dead chip «3 Chí tôn» (harness) |
| cautious-k4 | (R2's own) | 4 / 4 / – | known: dead «Tâm trạng +1», end-title overlap |
| lover-k5 [17] | beautiful start, flat middle | 4 / 3 / 6 | Tin báo dialog with 28–77 items has no ✕/«Lui» visible ×3; clipped option text in «Tỉnh thân» |
| random-k2 [10] | two mistresses stage is charming | 5 / 5 / 6 | name tag wraps letter-by-letter + figure cut at right edge (m-look-1200); «Học Cầm» row shows no cost |
| rebel-k1 [12] | broke from y3, slide to illness at 25 | 3 / 3 / 7 | Tin báo no ✕ ×2 (70/76 items); invitee list over Hoàng thượng robe (m-new-460-10); huge season banner over stage |
| rebel-k2 [11] | strong start, starved 11 y (11 lạng) | 4 / 7 / 7 | «Đổi thân phận» text one word per line; «cung nữ ???» tag |
| scholar-k2 [11] | rich (953 lạng) and boring | 3 / 7 / 5 | promotion never moves (see below); stage cut + name wrap |
| scholar-k5 [12] | chain card great, then flat | 4 / 6 / 7 | Tin báo 73 items no ✕; «Xét phẩm: thiếu 1» names nothing |
| skilled-k2 [12] | the life where I felt I rose (tam → nhị → nhất đẳng) | 5 / 6 / 6 | Tin báo 62 items no ✕; info rail on figure |
| skilled-k4 [11] | village prologue + title ladder to Chưởng sự cô cô | 6 / 7 / 6 | end card shows entry status, not top title; 14-line rules wall «Ra vào cung cấm» |
| skilled-k5 [7] | clear chain card, Chủ tín 0 | 5 / 7 / 7 | Xét phẩm thiếu 2–3 unnamed |
| speed-k1 [10] | village debt card is the best moment | 5 / 8 / 7 | **design:** «Chủ nợ đến nhà» all 3 roads «Rất vững», one ends the life (LAW 2/3, now seen in m-new-206-9) |
| speed-k4 [13] | best arc: maid → Đáp ứng → lãnh cung → tuẫn táng | 8 / 4 / 9 | pet-shop dialog ✕ dead ×3 (known); end.png shows Bổng lộc popup, not the ending card |

### Candidates (first = most important)
1. **Tin báo dialog without a visible close** (lover-k5 ×3, rebel-k1 ×2, scholar-k5, skilled-k2, + stuck-1): with 28–77 news lines the header has no ✕ and the footer/«Lui» is not on screen (all `nohit-*.png` / `stuck-1.png` are the same picture). R2 filed these as the harness «Tin báo» family (fixed in newer harness shas); the shots show the game dialog really lacks a reachable close — needs a real-hand test on Fold 755x1000. Not confirmed play-stopper (outside tap may close it).
2. **Pet-shop dialog ✕ dead** (speed-k2, speed-k4): confirmed by `noeffect-1795681622773.png` (dialog still open, Bạc 0, all «Thiếu bạc»). Known, with MAIN 159.
3. **Promotion rule is opaque**: scholar-k2 Công lao 10/10 + Chủ tín 99–100 + «Xét phẩm: đủ» but title stays «Cung nữ tam đẳng» for 13 y (Danh 0); skilled-k2 (Danh 73, Chủ tín 43) rose to nhất đẳng; skilled-k5 (Danh 98, Chủ tín 0–18) stuck at nhị; the Công lao help text says «cần tin cậy 35». Player cannot tell what is missing. Foreman to confirm the rule vs the text.
4. **LAW 2/3 design** (known): prologue life-ender tagged «Rất vững» (speed-k1 m-new-206-9).
5. **Stage layout family** (cosmetic): when the player stands at the right edge the figure is half hidden under the icon rail and the name tag wraps one letter per line (random-k2 m-look-1200, scholar-k2 m-look-240…1420, scholar-k5 m-look-140).
6. End card: shows entry status not the highest title (skilled-k4); end shot for speed-k4 shows the Bổng lộc popup.
7. Economics: rebel-k1/k2, speed-k1/k4 are broke for the whole life (Bạc 0–21, mood −13…−55) — nothing buyable, no equal-value free road (LAW 2 watch).
No new play-stopper found.

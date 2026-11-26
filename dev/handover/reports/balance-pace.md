# review/balance-pace — course pace (Tài nghệ + Tứ đức) and the road to Hoàng hậu

PRIORITY #1 CHECK: OD 2540–2541 (this order) + OD:L353 (15/11 «giữ nguyên tốc độ, HH ~188 tuần» — superseded by her 25/11 order, main to canon-overwrite) + OD 16/11 ~23:00Z L1483 («tài lên 100 quá nhanh», old ladder 8 lessons — the new curve stays far from it) | main: BAL.art (jbal2), jbalcore crsPush, j23 resumeMG (typed ×.6), jtd tdPoints (typed), jtabs course bar `[pts,100]` | review/promo-root 1623b417 → 8169d9da (built on top; it lands NO Sủng/rank change) | claims: none on pace.

Branch: review/balance-pace (on review/promo-root). Worker: BALANCE-PACE, for MAIN 147 → 149.

## Owner order (verbatim, OD 25/11 ~23:52Z)
"Tức là phải chơi tiến bộ 100 thì mới được lên một bậc hả? Mà một lần chơi chỉ được cộng có 2 điểm, tức là ta phải chơi tới 50 ván như vậy. Tức là đâu đó 50 khắc. Mà một ngày, một tuần chỉ có 16 khắc, mày đang giỡn mặt cái tao hả? Game có biết là bao nhiêu game, nào là tứ đức, nào là cầm kỳ thi họa. Mà mày cộng điểm kiểu này rồi tao biết bao giờ tao mới lên được bậc. Mày phải cân bằng sao cho nó hợp lý chứ. Bây giờ cho thợ cân bằng lại hết. Từ game nè, từ điểm số nè. Đó, coi thử trong vòng bao lâu rồi tao có thể lên được hoàng hậu. Chứ chơi kiểu này không thấy có tương lai luôn á."

## Root (measured on live 1623b417)
1. The bar showed points out of the whole ladder («Tiến bộ 2/100») — read as «100 to one bậc». Bậc 1 really needed 10, but nothing said so.
2. The game score barely mattered: self-study = max(1, round(game points × 0.6)) → a Xuất sắc game 2, an average one 1, a bad one 1 (typed in j23). Tứ đức self: 2 only at raw ≥ 9, else 1 (typed in jtd).
3. The ladder was slow: gain [1.2, 1, .8, .6, .4] → a GOOD player needed 83 self-study games (166 khắc ≈ 10 game days of nothing else) for ONE course to Tông sư; an average one 165. There are 12 courses (8 Tài nghệ + 4 Tứ đức).
4. Lives (bot, good hand, balanced play ≈ 3 lessons a month): first bậc 3 at ~50 months, NO course reached Tông sư in 8 years.
5. The rank road itself is not the dead end: the same lives reach Tần ~8 mo, Phi ~2 years; Hoàng hậu in some lives (small sample, see §Lives).

## What changed (all numbers in BAL, law 4; NPCs the same rule, law 2)
| key | before | after |
|---|---|---|
| BAL.art.gain (points per lesson point, by bậc) | [1.2, 1, .8, .6, .4] | [2, 1.5, 1.1, .9, .8] |
| BAL.art.les (new; jbalcore lesG = ONE lesson rule, her j23 lesson + NPC j85 npcStudyDo) | typed ×.6 in j23 | self = max(1, game points × 1); teacher = max(points, self + BAL.tchMin) |
| BAL.td.pts (new; jtd tdPoints) | typed: self raw≥9→2 else 1, ma ma raw≥7→3 else 2 | by the same raw bands as arts (BAL.mgTier.lessonPts 2/5/8): self [1,1,2,3], ma ma [2,2,3,4] |
| course bar (jtabs ×3, kitSkillCard) | points / 100 | phần inside the bậc / phần that bậc needs (crsProg): 3/5, 0/10 … |
| «Năm bậc» rule card (j85) | «Bậc 1 · Nhập môn · 10 điểm», «Điểm x/100» | «… · 5 phần», «Tiến bộ 3/5 phần tới bậc 1» (crsNeedP) |
| every lesson button / quick-lesson text (LUẬT SỬA CẢ NHÓM: jtabs, j85, j23, jtds ×4, jrcp ×3, j83 ×3, j5, jtd ×2) | typed «một hai phần», «+2..3», «tiến bộ một phần» | read from BAL (crsGainW / kStepW(lesG / tdPoints)) — «một đến ba phần», «hai đến bốn phần» |

Unit: 1 phần = 1 lesson point = what the button and the result chip say; the bar counts the same phần. Bậc needs 5 / 10 / 19 / 28 / 38 phần.
Old saves: points stay; only the speed changes.

## Course pace (one course, from the game's own rules; dev/measure/pace-calc.py)
Calendar: 1 game day = 1 tuần = 16 khắc, 3 days a month; a lesson = 2 khắc.

| curve | hand | self-study games to bậc 1 / 2 / 3 / 4 / 5 | khắc to Tông sư | game days if only that course | all 12 courses at 6 khắc/day (months) |
|---|---|---|---|---|---|
| old (live) | good | 5 / 12 / 25 / 45 / 83 | 166 | 10.4 | 111 |
| old (live) | average | 9 / 24 / 49 / 90 / 165 | 330 | 20.6 | 220 |
| **A recommended** | good | **2 / 5 / 12 / 21 / 33** | 66 | 4.1 | 44 |
| **A recommended** | average | 3 / 8 / 17 / 31 / 50 | 100 | 6.2 | 67 |
| A recommended | weak | 5 / 15 / 34 / 61 / 99 | 198 | 12.4 | 132 |
| B gentler | good | 2 / 4 / 9 / 15 / 24 | 48 | 3.0 | 32 |
| B gentler | average | 2 / 6 / 13 / 23 / 36 | 72 | 4.5 | 48 |
| C harsher | good | 3 / 7 / 16 / 28 / 45 | 90 | 5.6 | 60 |
| C harsher | average | 4 / 11 / 23 / 42 / 67 | 134 | 8.4 | 89 |

Teacher (+1, costs Bạc), good hand: old 3/8/17/30/55 · A 2/4/9/16/25 · B 1/3/7/12/18 · C 2/6/12/21/34.
Good hand ⇒ Nhập môn after 2 games (4 khắc, the first day); a good game is worth 3× a bad one.

## Lives (dev/measure/pace.js on the real game, inpage6 «sens» bot, lessons PLAYED with a good hand raw 6.5–10; 4 lives × 96 months each; pace-sum.py)
Balanced = the «sens» bot as is (good hand, ~3 lessons a month); study-minded = the same bot scoring lessons above most acts (~3.5–4 finished lessons a month; the bot still loses many tries to Sức / pickers, so a real player who studies is faster). Rank cells: median month of first reaching it (lives that reached / 4).

| run | courses: first bậc 1 | first bậc 3 | Tông sư (median mo, % courses within horizon) | sum of bậc (12 courses, max 60) at 1 y / 3 y / end | NPC mean art pts at end | Tần | Phi | Quý phi | Hoàng hậu | lives reaching Phi / Quý phi / HH |
|---|---|---|---|---|---|---|---|---|---|---|
| BEFORE, balanced (96 mo) | 6 mo | 50 mo (51 %) | never (0 %) | 15.5 / 21 / 30.5 | 30.5 | 8 mo (4/4) | 23 mo (2/4) | 37.5 mo (2/4) | 46 mo (1/4) | 50 % / 50 % / 25 % |
| **AFTER A, balanced (96 mo)** | 3 mo | 27 mo (96 %) | 65 mo (54 %) | 21 / 34.5 / 53 | 44 | 5.5 mo (4/4) | 26 mo (4/4) | 26 mo (3/4) | 66 mo (1/4) | 100 % / 75 % / 25 % |
| BEFORE, study-minded (96 mo) | 5 mo | 42 mo (71 %) | 93 mo (2 %) | 16.5 / 25 / 41 | 36 | 19 mo (4/4) | 56.5 mo (4/4) | 48 mo (2/4) | 57 mo (1/4) | 100 % / 50 % / 25 % |
| **AFTER A, study-minded (96 mo)** | 3 mo | 23 mo (96 %) | 53 mo (65 %) | 25 / 38 / 54.5 | 43 | 11.5 mo (4/4) | 25 mo (3/4) | 64 mo (3/4) | 50 mo (1/4) | 75 % / 75 % / 25 % |
| B gentler, study-minded (72 mo) | 3.5 mo | 18 mo (100 %) | 42 mo (75 %) | 23.5 / 45.5 / 56.5 | 46 | 39.5 mo (4/4) | 46 mo (3/4) | 53 mo (2/4) | – (0/4 in 6 y) | 75 % / 50 % / 0 % |
| C harsher, study-minded (72 mo) | 4 mo | 27 mo (90 %) | 62 mo (17 %) | 19.5 / 33 / 44.5 | 35.5 | 27.5 mo (4/4) | 37 mo (1/4) | 41 mo (1/4) | – (0/4 in 6 y) | 25 % / 25 % / 0 % |

Reading: skills now move in game-time a player can feel (first bậc in the first weeks, bậc 3 in ~2 years of balanced play, Tông sư in about half the courses within 8 years — before: never). NPC consorts learn by the same rule (law 2): their mean art points at the end rise 30 → 44, so contests stay fair. Rank: Hoàng hậu is reached in 1 of 4 lives (~4–5½ game years) before AND after — 4 lives per row is too few to read rank % finely (rows differ by one life); faster skills help the middle ranks a little (Phi in 4/4 balanced lives after vs 2/4 before) but the HH road is set by Sủng/Danh/seat rules (PROMO-ROOT: no change). In real play time (OD:L353 measured ~2–3 h of real play to HH at 16 khắc/week), a skilled player still has a real path to HH in one life; it is hard, not luck-free.

## Options for sếp (Vietnamese-ready)
- **A (đề xuất, đã làm trên nhánh):** Chơi giỏi thì 2 ván lên Nhập môn (ngay ngày đầu), khoảng 33 ván (4 ngày chơi nếu chỉ học một môn) thành Tông sư; chơi vừa 50 ván. Đủ 12 môn Tông sư mất 3–5 năm trong game nếu mỗi ngày dành 3 buổi học — một đời người là học xong hết. Điểm trò chơi quyết định: ván giỏi được gấp ba ván kém. Thanh tiến bộ nay ghi «3/5 phần tới Bậc 1», không còn «2/100».
- **B (nhẹ tay hơn):** Nhanh hơn chừng 1,4 lần: 24 ván giỏi là Tông sư, 12 môn xong trong ~2,5–4 năm. Dễ thở, nhưng trễ đời thì không còn gì để học.
- **C (gắt hơn):** Chậm hơn A chừng 1,35 lần: 45 ván giỏi là Tông sư, 12 môn mất 5–7 năm. Vẫn thấy bậc 1 trong ngày đầu (3 ván).
Only BAL.art.gain differs between A/B/C (B [2.8,2.1,1.5,1.25,1.1], C [1.5,1.1,.8,.65,.6]); switching = one line.

## Tests
- dev/test/balance-pace.js (new): lesG / tdPoints rules, games per bậc, no «/100» bar, button words from BAL, NPC lesson uses lesG, no page errors — PASS.
- dev/test/balance-core.js — PASS (ladder band updated to the new curve: 2-point lessons to Tông sư 40–70; was 70–130 for the old ladder; the OD 16/11 «too fast» guard of 8 stays far away).
- dev/test/paid-tiers.js — table now reads lesG; FAIL count 93 → 81 (all pre-existing families, none on lessons).
- dev/test/mg-back.js — PASS 12/12.
- Video (iPad 1180×820): Công 3/5 → Tự học (Để trời định) → +2 → Bậc 1 «Nhập môn», bar 0/10:
  https://ctm-img.victoria-tntt.workers.dev/img/_review/balance-pace/bp-ipad-cong-lenbac.mp4 · stills bp-ipad-cong-truoc.jpg / bp-ipad-cong-bac1.jpg (wipe after verdict: `python3 dev/site/cdn_sync.py --wipe-review balance-pace`).

## Notes / not done
- The bot only finishes ~3 lessons a month (many tries are refused: Sức, kit pickers); a skill-minded human studies more → faster than the life table.
- Rank thresholds, Sủng, Danh per bậc (BAL.art.danh), exams untouched (PROMO-ROOT recommends no rank change). Faster courses do feed rank a little (Danh at bậc 2–5, Tài/Sắc +2 per bậc, exam wVir/wArt).
- Canon: OD:L353 («giữ nguyên tốc độ») must be overwritten by main with the 25/11 ruling once sếp picks A/B/C (law 14).

## Handover
Harness: `SKILL=good PAR=4 node dev/measure/pace.js <index.html> <seeds> <months> 0 sens|study` (BALO='{"art":{"gain":[…]}}' for an option) → `python3 dev/measure/pace-sum.py label=file.jsonl …`; `python3 dev/measure/pace-calc.py` for the per-hand table.

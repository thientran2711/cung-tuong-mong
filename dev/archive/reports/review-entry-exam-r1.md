PASS d7364cb2e21d6d19451bae2f98458e1a8e170bb6 (ship after kc-roads-cn-nc fix + mg-balance)

# Review r1 — entry selection exam (review/entry-exam @ab50be5c), branch review/entry-exam-r1

Reviewer: opus, opened by Foreman D s3 (result also sent to s4). START_CTX ≈ 3 % (get_session read 0; own estimate).
Scope: ONLY the entry-exam diff (vs merge-tree(ef6e7a05, 96736fff)); kc-roads-cn-nc-r1 round-3 FAIL items and mg-balance not re-judged.
The PASS sha has current origin/main 92668096 as ancestor; it CONTAINS kc-roads-cn-nc-r1 (FAILED r3) and mg-balance (unreviewed), so it
may only be fast-forwarded after those two pass (or re-merged onto their fixed versions).

## Merge onto origin/main
Conflicts only between mg-balance and main (not entry-exam code): assemble.py (main's list + jmgt, jkc2, jentry), j83.js + jtabs.js
(main's wording "tự học", "(từ 0 đến 10)", wkTierTxt KEPT + mg-balance BAL.mgTier.wk.lvQ / lessonPts / "chút bậc tài nghệ"), index.html /
sw.js regenerated. Whoever re-merges mg-balance must keep this resolution.

## Judgement against the owner lines
- OD:L1244 / L1250: every origin (9, bd data-ready) meets ONE selection round in the shared kg82 exam frame; the origin rank is only the
  ceiling; high score → ceiling, weaker → one / two steps under; patronage (ch th 40) helps the score, rank still earned. OK.
- OD:L1251: cn/nc home roads go through the same hook (route nc: Lễ ra mắt → Quý nhân under Tần ceiling). OK.
- OD:L1288 co-op: both players' road choice at the room start, each exam on her own road, no waiting (coop-together 26/26). OK.
- OD 07:20Z no word games: BAL.entry.word never offered (test checks); lễ nghi quiz options replaced by Thêu / Đàn / Bắn cung / Pha trà. OK.
- OD 07:25Z medium: see table; the only miss was the WORD "Khó" at art level 0 → fixed (3).
- OD 07:20Z / L1261 scene ends with a button: kitPersonReveal, ONE button (Tạ ơn / Theo ma ma), outside tap does not close (tested). OK.
- OD:L1267 ONE CORE: weights, cut, stepSung, fx in BAL.entry; KC2CUT = BAL.entry.cut; the copied ladder thresholds → fixed (1).
- Kit-first: intro = standard event card, exam = kg82 frame (jexam pattern), scene = KIT §65.2; no new CSS/frames. Consistency scan: the
  exam result uses the same kitOvSync ✕ as every other mini-game result. VANPHONG: no %, odds in ladder words only. OK.
- KIT REQUEST (dedicated entry animation on kmStage + kitPersonReveal name option): legit, not a private part.

## Reviewer fixes on review/entry-exam-r1 (0d905472)
1. jentry entWord → shared word() (no copied thresholds).
2. jentry kcPhucPlay skip value 5 → entSkipRaw() (one "not playing" value on every road).
3. BAL.mgTier.occ.tuyen [1.5,0] → [1,0]: "Độ khó" now reads "Vừa" for all 9 origins (was "Khó" for 6/9 at art level 0). Marks unchanged
   (skilled 9.0–10 at ease 0.8 and 1.6). FOREMAN B: keep this value in mg-balance.
4. dev/test/kc-roads/coop-together.js clear(): handles the kg82 exam frame (skip, then the result ✕) — the old helper left it open.

## Tests (0 page errors in all)
| test | size | result |
|---|---|---|
| entry-exam/direct.js | 755x1000 | 9/9 PASS (×2), Vừa ×9 after fix 3 |
| entry-exam/direct.js | 1180x820 | 5/5 PASS (tt muoi nc cnv ch) |
| entry-exam/direct.js | 1366x1024 | 3/3 PASS (dtq td cn) |
| kc-roads/direct.js | 755x1000 | 9/9 PASS |
| kc-roads/route.js --origin=nc | 755x1000@2 | PASS, Quý nhân (ceiling Tần), reload ok |
| old save (origin/main build → this build; palace nc + tiểu thư home muoi) | 755x1000 | no intro / exam / scene, 3 buổi, 0 errors |
| kc-roads/coop-together.js (live Worker) | Fold + iPad | 26/26 |
| coop-e2e.js (live Worker) | Fold + iPad | 59/59 |
Looked at: intro (tt dtq nc cnv), exam frame (dtq nc cnv cn), result, entry scene (nc cnv) at 755@2, 1180, 1366.

## Rank distribution (reviewer re-run: mg-bots occ tuyen art level 0 and 1, 8 plays per kind×bot; entry-bots N=16/origin; home rows
= mid home numbers). bottom / middle / ceiling. Matches the worker's table within ±5.
| origin | road | player | % | labels |
|---|---|---|---|---|
| tt | direct | skilled | 0 / 15 / 85 % | Đáp ứng / Thường tại / Quý nhân |
| tt | direct | average | 3 / 97 / 0 % | Đáp ứng / Thường tại / Quý nhân |
| tt | direct | random | 97 / 3 / 0 % | Đáp ứng / Thường tại / Quý nhân |
| dtq | direct | skilled | 0 / 27 / 73 % | Đáp ứng / Đáp ứng / Thường tại |
| dtq | direct | average | 24 / 76 / 0 % | Đáp ứng / Đáp ứng / Thường tại |
| dtq | direct | random | 100 / 0 / 0 % | Đáp ứng / Đáp ứng / Thường tại |
| muoi | direct | skilled | 0 / 26 / 74 % | Đáp ứng − / Đáp ứng / Đáp ứng + |
| muoi | direct | average | 24 / 76 / 0 % | Đáp ứng − / Đáp ứng / Đáp ứng + |
| muoi | direct | random | 100 / 0 / 0 % | Đáp ứng − / Đáp ứng / Đáp ứng + |
| cn | direct | skilled | 0 / 1 / 99 % | Đáp ứng / Đáp ứng / Thường tại |
| cn | direct | average | 0 / 87 / 13 % | Đáp ứng / Đáp ứng / Thường tại |
| cn | direct | random | 18 / 82 / 0 % | Đáp ứng / Đáp ứng / Thường tại |
| nc | direct | skilled | 0 / 16 / 84 % | Thường tại / Quý nhân / Tần |
| nc | direct | average | 28 / 72 / 0 % | Thường tại / Quý nhân / Tần |
| nc | direct | random | 99 / 1 / 0 % | Thường tại / Quý nhân / Tần |
| nc | home | skilled | 0 / 3 / 97 % | Thường tại / Quý nhân / Tần |
| nc | home | average | 7 / 93 / 0 % | Thường tại / Quý nhân / Tần |
| nc | home | random | 86 / 14 / 0 % | Thường tại / Quý nhân / Tần |
| thd | direct | skilled | 0 / 5 / 95 % | Đáp ứng − / Đáp ứng / Đáp ứng + |
| thd | direct | average | 3 / 97 / 1 % | Đáp ứng − / Đáp ứng / Đáp ứng + |
| thd | direct | random | 88 / 13 / 0 % | Đáp ứng − / Đáp ứng / Đáp ứng + |
| ch | direct | skilled | 0 / 1 / 99 % | Đáp ứng / Thường tại / Quý nhân |
| ch | direct | average | 0 / 93 / 7 % | Đáp ứng / Thường tại / Quý nhân |
| ch | direct | random | 71 / 29 / 0 % | Đáp ứng / Thường tại / Quý nhân |
| td | direct | skilled | 0 / 11 / 89 % | Đáp ứng − / Đáp ứng / Đáp ứng + |
| td | direct | average | 8 / 92 / 0 % | Đáp ứng − / Đáp ứng / Đáp ứng + |
| td | direct | random | 99 / 1 / 0 % | Đáp ứng − / Đáp ứng / Đáp ứng + |
| cnv | direct | skilled | 0 / 25 / 75 % | Tân Giả khố first / low consort maid / high consort maid |
| cnv | direct | average | 19 / 81 / 0 % | Tân Giả khố first / low consort maid / high consort maid |
| cnv | direct | random | 93 / 7 / 0 % | Tân Giả khố first / low consort maid / high consort maid |
| cnv | home | skilled | 0 / 8 / 92 % | Tân Giả khố first / low consort maid / high consort maid |
| cnv | home | average | 3 / 97 / 0 % | Tân Giả khố first / low consort maid / high consort maid |
| cnv | home | random | 86 / 14 / 0 % | Tân Giả khố first / low consort maid / high consort maid |
Reading: skilled → ceiling 73–99 %, not playing → mostly one step under (bottom ≤ 28 %, ceiling ≤ 13 %), random → bottom = medium, and the
ceiling is earned. Ceiling never exceeded on these roads.

## Notes for main (non-blocking, not this diff)
a. jkc tiểu thư Điện tuyển keeps its own cut (KC.cut, not in BAL) and can give Quý nhân to muoi / thd whose ceiling is Đáp ứng (worker Q4):
   ONE CORE + OD:L1250 question for the kc-roads / jkc owner.
b. Before the exam the header and the "Nhập cung" card behind the frame already show the ceiling rank; corrected after the result.
c. With art level 0 every tiểu thư origin is offered Cầm + Kỳ (her two "best" arts tie); fine, but an origin-flavoured default would read better.
d. Home roads give a better selection than "Vào cung ngay" (cnv 92 vs 75 %, nc 97 vs 84 % top): input for the kc-roads BAL.kcv retune.

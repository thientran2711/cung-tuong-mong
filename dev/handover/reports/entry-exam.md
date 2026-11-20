SẴN SÀNG KIỂM __SHA__

# entry-exam report (branch review/entry-exam, Foreman D worker, opus) — 16/11

Task: main s12 07:55Z order (dev/handover/FOREMAN_D.md) items (1) ENTRY SELECTION EXAM for every origin and (2) narrated intro + entry
animation per origin. Owner lines: OD:L1244, L1250, L1251, L1288, OD 07:20Z (no word games), OD 07:25Z (medium), OD 07:20Z (scene ends
with a button, OD:L1261), OD:L1267 (ONE CORE). START_CTX ≈ 3 % of the window (get_session read 0; own estimate).

Base: review/kc-roads-cn-nc-r1 (ef6e7a05, home roads + reviewer fixes + hook contract) + review/mg-balance (96736fff, mgTier) merged in.
Merge order for main: mg-balance and kc-roads-cn-nc(-r1) first, then this branch (it contains both).

## What was built (details: dev/PROGRESS_review-entry-exam.md)
- **ONE seam** `window.kcEntryExam(kind, done, info{art,origin,title,note})` (r1 contract) is now implemented by `dev/build/jentry.js`
  `entExam` and reached from EVERY entry road: "Vào cung ngay" (all 9 origins), cnv / nc / bd home roads, and the six tiểu thư roads'
  Phúc tuyển (jkc kcPhucPlay now calls the hook — r1 FAIL item 4 fixed).
- **The round** = the shared mini-game frame (kg82Open / kitRows / kg82Btn, the jexam pattern): Giám khảo · Môn thi · Độ khó
  (mgTier occ "tuyen", review/mg-balance — no private scheme) · Xét thêm · the odds in ladder words ("để tài nghệ quyết định: … · chơi
  xuất sắc: …", no %) → "Bắt đầu thi" or "Để tài nghệ quyết định" (kg82NpcMean of her level, like jexam) → result → "Đã hiểu".
- **No word games**: BAL.entry.word lists the word kinds (tho, doi, doden, le, tc, xa, thq); they are never offered. The old "lễ nghi"
  quiz options of kc-roads became a second real art: cnv Thêu, nc Đàn, bd Bắn cung, cn Pha trà (Điều hương), others her two best non-word
  arts. Lễ nghi learned at home still counts in the score (weight), it is just not a quiz.
- **ONE score rule** `entScore(road, raw, art)` (BAL.entry.w per road: dir / dan / nc) replaces the four hand-typed formulas in jkc2
  (kc2Score dan, kc2Score nc, kc2SelDo, the old cho line); KC2CUT = BAL.entry.cut; Sủng lost per step = BAL.entry.stepSung (r1 ONE CORE note).
  Score = Sắc, Tài, Đức (+ Sức on the cnv road) + mini-game mark + her level in that art + Thái hậu's favour (patronage: ch starts th 40)
  + road extras (home skills, village fame / treaty, lý trưởng / envoy favour, rumours) + noise. Ceiling / one step under / two steps under.
- **Gain and loss on every path** (BAL.entry.fx): top result Danh +3 Sủng +4, bottom Danh −3 Sủng −2, on top of the rank. Origins with
  ceiling Đáp ứng (muoi, td, thd) now meet the exam too (before: skipped) — their stake is this gain / loss ("được để mắt" / "bị chê").
- The "Cúi đầu chờ xét" / no-game choice is worth exactly the frame's "Để tài nghệ quyết định" (kg82NpcMean of her best art) instead of a
  flat 5 — one value for "not playing". (Contract note says the wait choice is raw 5: changed on purpose, ONE CORE.)
- **Narrated intro**: "Tiền truyện · <origin>" event card with the origin painting (img/origin-wide-<k>) before the selection on the
  direct road; home roads keep their own first card (family still alive, treaty / draft still to come) and get the painting if it had none.
- **Entry scene**: after the "Nhập cung" card's button ("Tiếp theo") → KIT §65.2 kitPersonReveal (her figure, origin · rank, one line,
  ONE button "Tạ ơn" / cnv "Theo ma ma"; only that button closes it, an outside tap does nothing — tested). No demotion scene fires when
  the selection sets a rank under the ceiling (kmDiff snapshot reset).
- New lives only (S.entV, S.selx); old saves untouched. Co-op: all of it is her own state; no gate, no waiting (OD:L1288).

## Rank distribution (dev/measure/entry-bots.js; marks from dev/measure/mg-bots.js real engines, occ tuyen, art level 1, 8 plays per
kind×bot: skilled mean dan 8.6 · mua 9.8 · kim 9.3 · theu 9.9; random 0–3.8). 12 real new lives per origin; player kinds: skilled = skilled
bot marks, average = "Để tài nghệ quyết định", random = random-bot marks. Home rows use mid home numbers (kim 2, le 2, fame 30, rumour 10).
BEFORE = kc-roads numbers moved to BAL unchanged (cut 40/55); AFTER = this branch (cut 37/53). Labels: bottom / middle / ceiling.
| origin | road | player | BEFORE (cut 40/55) bottom / middle / ceiling | AFTER (cut 37/53) bottom / middle / ceiling | labels |
|---|---|---|---|---|---|
| tt | direct | skilled | 0 / 30 / 70 % | 0 / 19 / 81 % | Đáp ứng / Thường tại / Quý nhân |
| tt | direct | average | 19 / 81 / 0 % | 3 / 97 / 0 % | Đáp ứng / Thường tại / Quý nhân |
| tt | direct | random | 100 / 0 / 0 % | 92 / 8 / 0 % | Đáp ứng / Thường tại / Quý nhân |
| dtq | direct | skilled | 0 / 61 / 39 % | 0 / 42 / 58 % | Đáp ứng / Đáp ứng / Thường tại |
| dtq | direct | average | 54 / 46 / 0 % | 24 / 76 / 0 % | Đáp ứng / Đáp ứng / Thường tại |
| dtq | direct | random | 100 / 0 / 0 % | 100 / 0 / 0 % | Đáp ứng / Đáp ứng / Thường tại |
| muoi | direct | skilled | 0 / 71 / 29 % | 0 / 46 / 54 % | Đáp ứng − / Đáp ứng / Đáp ứng + |
| muoi | direct | average | 65 / 35 / 0 % | 25 / 75 / 0 % | Đáp ứng − / Đáp ứng / Đáp ứng + |
| muoi | direct | random | 100 / 0 / 0 % | 100 / 0 / 0 % | Đáp ứng − / Đáp ứng / Đáp ứng + |
| cn | direct | skilled | 0 / 11 / 89 % | 0 / 7 / 93 % | Đáp ứng / Đáp ứng / Thường tại |
| cn | direct | average | 3 / 94 / 4 % | 0 / 94 / 6 % | Đáp ứng / Đáp ứng / Thường tại |
| cn | direct | random | 79 / 16 / 5 % | 70 / 25 / 5 % | Đáp ứng / Đáp ứng / Thường tại |
| nc | direct | skilled | 0 / 33 / 67 % | 0 / 20 / 80 % | Thường tại / Quý nhân / Tần |
| nc | direct | average | 51 / 49 / 0 % | 28 / 72 / 0 % | Thường tại / Quý nhân / Tần |
| nc | direct | random | 95 / 5 / 0 % | 85 / 15 / 0 % | Thường tại / Quý nhân / Tần |
| nc | home | skilled | 0 / 16 / 84 % | 0 / 7 / 93 % | Thường tại / Quý nhân / Tần |
| nc | home | average | 27 / 73 / 0 % | 11 / 87 / 2 % | Thường tại / Quý nhân / Tần |
| nc | home | random | 82 / 18 / 0 % | 63 / 37 / 0 % | Thường tại / Quý nhân / Tần |
| thd | direct | skilled | 0 / 31 / 69 % | 0 / 13 / 88 % | Đáp ứng − / Đáp ứng / Đáp ứng + |
| thd | direct | average | 20 / 80 / 0 % | 4 / 95 / 1 % | Đáp ứng − / Đáp ứng / Đáp ứng + |
| thd | direct | random | 100 / 0 / 0 % | 85 / 15 / 0 % | Đáp ứng − / Đáp ứng / Đáp ứng + |
| ch | direct | skilled | 0 / 12 / 88 % | 0 / 2 / 98 % | Đáp ứng / Thường tại / Quý nhân |
| ch | direct | average | 4 / 96 / 0 % | 0 / 89 / 11 % | Đáp ứng / Thường tại / Quý nhân |
| ch | direct | random | 92 / 8 / 0 % | 57 / 43 / 0 % | Đáp ứng / Thường tại / Quý nhân |
| td | direct | skilled | 0 / 45 / 55 % | 0 / 30 / 70 % | Đáp ứng − / Đáp ứng / Đáp ứng + |
| td | direct | average | 33 / 67 / 0 % | 10 / 90 / 0 % | Đáp ứng − / Đáp ứng / Đáp ứng + |
| td | direct | random | 100 / 0 / 0 % | 99 / 1 / 0 % | Đáp ứng − / Đáp ứng / Đáp ứng + |
| cnv | direct | skilled | 0 / 39 / 61 % | 0 / 23 / 77 % | Tân Giả khố first / low consort maid / high consort maid |
| cnv | direct | average | 46 / 54 / 0 % | 19 / 81 / 0 % | Tân Giả khố first / low consort maid / high consort maid |
| cnv | direct | random | 100 / 0 / 0 % | 100 / 0 / 0 % | Tân Giả khố first / low consort maid / high consort maid |
| cnv | home | skilled | 0 / 13 / 87 % | 0 / 6 / 94 % | Tân Giả khố first / low consort maid / high consort maid |
| cnv | home | average | 17 / 83 / 0 % | 4 / 96 / 0 % | Tân Giả khố first / low consort maid / high consort maid |
| cnv | home | random | 100 / 0 / 0 % | 98 / 2 / 0 % | Tân Giả khố first / low consort maid / high consort maid |

Reading: before, a player who did not play never reached the ceiling and fell two steps in 19–65 % of lives (dtq 54 %, muoi 65 %) —
too harsh for "mức vừa". After: skilled play reaches the ceiling in 54–98 % (weaker-stat origins dtq / muoi lowest: tài, đức count),
not playing lands one step under in most lives (bottom ≤ 28 %), random tapping lands at the bottom. The home roads (preparation) give a
better selection than "Vào cung ngay" for the same player (cnv skilled 94 % vs 77 % top; nc 93 % vs 80 %): **input for the r1 FAIL 1
retune of BAL.kcv** ("Chờ" worth more than "Vào cung ngay") — the kc-roads fixer should count this selection gap as part of the home
road's value (or lower the home extras in BAL.entry.w.dan / .nc).

## Tests (this build, 0 page errors)
| test | sizes | result |
|---|---|---|
| dev/test/entry-exam/direct.js — 9 origins: intro card + painting, Tuyển chọn options (no word game), exam frame rows, occ tuyen, no %, play / skip, rank in [ceiling−2, ceiling] (cnv maid), no demotion scene, "Nhập cung" → entry scene, ONE button, outside tap does not close, button closes | 755x1000, 1180x820 | 9/9 PASS each |
| dev/test/kc-roads/direct.js (regression; updated: closes the Tiền truyện card first, and a Đáp ứng ceiling now expects the selection) | 755x1000 | 9/9 PASS |
| dev/test/kc-roads/route.js --origin=nc (home road → Lễ ra mắt through the exam hook → palace, save/reload) | 755x1000 | PASS, entered Quý nhân (ceiling Tần), 0 errors (one "???" in an act card text "Mời thái y ??? đến tận" — not this branch) |
Screens looked at (Fold + iPad): intro cards (td, muoi), exam frame (muoi, nc), entry scene (muoi, cnv, tt). Note: the board painting
column of the exam frame was still empty in the shots (CDN load in the test; same frame as jexam, not this branch's code).

## Questions / requests (never asked to the owner)
1. **mg-balance (Foreman B)**: occ "tuyen" = stake 1.5 makes the entry exam read "Khó" at art level 0 (most new lives), "Vừa" at level 1.
   Measured skilled marks are 8.6–9.9 anyway, so play is medium in fact; if the word should read "Vừa" for a new girl, set tuyen to [1,0]
   in BAL.mgTier (their file). Not changed here.
2. kitPersonReveal shows "Ta" as the name when the person is her (kit name rule); a `name` option on the kit part would show her real
   name in the entry scene (KIT REQUEST in entry-intro.md, with the dedicated entry-animation request).
3. In the tests a card-flip scene (kcf) left over from rolling hundreds of lives blocked the entry scene until closed; in a real single
   new life none was seen. If a flip can be queued at life start, the entry scene waits behind it (kmPush queue) — no loss, just order.
4. The tiểu thư road keeps jkc's own Điện tuyển rule (score + roll, KC.cut in jkc — not yet in BAL; max Quý nhân for every tiểu thư origin,
   e.g. muoi / thd can reach Quý nhân there although their direct ceiling is Đáp ứng). OD:L1250 says the origin rank is the ceiling;
   whether the home road may raise the ceiling (patronage: father's memorial) is a design call for main — PROPOSAL: keep it (it is the
   reason to wait 3 years) and say so on the identity card.
5. bd: data present, wakes with review/origins-r1.

## Intro / entry art
dev/handover/reports/entry-intro.md (missing illustrations list for main's samples + KIT REQUEST entry animation).

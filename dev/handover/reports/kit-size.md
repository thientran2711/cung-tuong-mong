# kit-size (kit keeper, opus) — KIT SIZE SYSTEM (OD 16/11 15:00Z s17 kit review)

START_CTX ≈ 4 % of 1M (estimate; context_usage read 0). Rollover at ≈ 29 %, ceiling 60 %.

## Phase 1 — SAMPLE SHEET (waiting for the owner's OK before the mass change)
Sheets (real game art + real kit parts, rendered by `kitSizeSheet(area)` in `dev/build/jksize.js`, shot by `dev/test/kit-size-sheet.js`):
- `kit-size/sample-frames-1180x820.jpg`, `kit-size/sample-frames-755x1000.jpg` — frames S/M/L/XL with matching figures + the 4 figure sizes
- `kit-size/sample-buttons-1180x820.jpg`, `kit-size/sample-buttons-755x1000.jpg` — button classes S / LS / LR, 3.4 with picture, 3.1/3.2 compact, 3.7 skill two columns, picture sizes
- `kit-size/sample-long-1180x820.jpg`, `kit-size/sample-long-755x1000.jpg` — VIỆC DÀI = XL, landscape picture on top, info + buttons below
(755x1000 = the real portrait page 590x820 shot at the Fold scale 1.2195 × 2.)
Before shots of today's frames: same folder `now-*` were taken with `dev/test/kit-size-shots.js` (not committed; numbers below).

### The ONE table (KIT_SIZE, jksize.js) — design px
| size | width kv1 / kv2 | body cap | figure (body h / column) | portrait pic | banner |
|---|---|---|---|---|---|
| S | 380 / 380 | 262 | S 200 / 96 | PS 84x112 | LS 192x96 |
| M | 470 / 470 | 400 | M 300 / 140 | PM 120x160 | LS |
| L | 560 / 560 | 518 | L 420 / 192 | PL 162x216 | LM 300x140 |
| XL | 562 / 860 | 732 | XL 560 / 250 | PL | LL full width x 200 / 260 (on top) |
Rule `kitFrameSize(dlg)`: the smallest size whose body holds the content measured at that width (+ the matching figure + name chip for a person frame). Long story without a person → XL with the landscape picture on top.
Rule `kitBtnSize`: S (square 56, shrinks to its info) when ≤ 2 rows and ≤ 70 chars; LS (long, square 72) when ≤ 3 rows and ≤ 160; else LR (long, 3:4 84x112). Skill cards: square 64, two columns.

### Before → sample (self-check)
| case | before (today, 1180 / 755) | sample |
|---|---|---|
| TIN news | 560x574 / 560x700, 147 / 210 px empty | S 380x248, 0 empty |
| KẾT QUẢ person | 560x574, figure 469 px for 2 lines | S 380x366, figure S 200 |
| ĐIỀU Thái hậu | 560x700, empty banner, empty space | S 380x364 (content fits S), no empty banner |
| VIỆC 3 choices | 560x700, figure 581 | L 560x563, figure L 420 |
| VIỆC DÀI | picture left 158x128, text column | XL, picture on top, buttons below |
Figures: aspect error 1.000 everywhere (never stretched; wide robes cut by the column). No page errors.
Known: portrait XL person frame leaves 140 px under the figure (narrow width makes the text taller than the XL figure) — proposal: on kv1 an XL person frame takes the figure L+ (fill to the body) — to settle in phase 2.

### Part 2 (OD 16/11 15:10Z, routed by s19): `sample-items-{755x1000,1180x820}.jpg`
- Item sizes = the 4 kit sizes S 52 · M 72 · L 104 · XL 150; GRADE = chip ON the frame (bottom centre, clear of the red "Ngự" seal); no grade line under tiles.
- 6.2 detail card: name · row 1 kind · row 2 gains/losses chips; Phẩm row dropped (chip); Xa xỉ on EVERY item with a luxury value (Nhân sâm 22, Bức thư 8 were missing: kidLux returned null for non-wearables).
- 6.3 pick grid: picture + name + effects only (kind prefix dropped); full info on tap; gift-chest reveal keeps full info. 6.5 event tag: tile + chip + name.
- 7.1 thumbnails = the picture size table. 7.3 placeholder: one set per orientation (portrait / landscape / square) x tone, spec in the sheet — ART REQUEST → Foreman C.

## Phase 2 (after OK): apply game-wide via kpBuild / kitEventStage / kitDpFit / kitCompactCSS / kitSkillCard / jkpc (compact → S..XL), list of every place before/after, KIT.md §84 + kit page, tests.

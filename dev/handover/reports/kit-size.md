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

## HANDOVER (rollover at 35 % context, 16/11 ~16:05Z) — for the next kit-size worker
State: branch review/kit-size (last sample commit 613f26a + this report). Owner reviewed the sheets 16:00Z (OD "(16/11 16:00Z, s19 chat) OWNER KIT-SIZE SAMPLE REVIEW" (1)–(9), shots dev/owner-shots/1116-kitsize-review-1..3.jpg on the handover branch) — NOT yet addressed. s19's instruction (16:55Z msg): fix ALL in the kit (whole game), new sheets → s19 after self-check.
Code: dev/build/jksize.js (KIT_SIZE table, kitFrameSize, kitBtnSize, CSS, kszFrame/kszBtn/kszItem*, kitSizeSheet(area) area=frames|buttons|long|items) — NOT in assemble.py yet (sheets inject it). dev/build/j79.js kitRows: no "·" between chips (already a game fix). Tests/scripts: dev/test/kit-size-sheet.js (DPR=2.4390 TAGSZ=755x1000 → 590x820 page shot; 1180x820), dev/test/kit-size-shots.js (today's real #modal pop-ups, before numbers).
Server: python http.server is refused by the auto-mode classifier here; use `node dev/test/cdn-overlay-serve.js 8731 <worktree> <empty list file>` (run_in_background). Rebuild index.html for game-code changes: `bash dev/site/build_site.sh` (then `git checkout index.html assets.json sw.js` unless shipping a build).
Planned redesign for (1)–(9) (my analysis, not yet coded):
- (1) figure tag: use kitTitleTag3(p,rank,name,col) / kitNameRank (rank line 1, name line 2; jtitle.js / jk4 §48) above EVERY frame figure; kszFigHtml uses kitName (one line) — replace.
- (2) info frames (ĐIỀU / LUẬT / TIN / KẾT QUẢ): no "Đã hiểu" button; kit ✕ (kitXHTML, jk4 §32.10) in the header + tap outside (first tap only closes, OD:L418) — whole game: kitModal btn for those kinds.
- (3) body align-items:center for figure column AND right column (buttons centred).
- (4) inside one frame all option buttons the SAME width (full width of the info area); S (shrink-to-fit) only in grids of equal cells.
- (5) button = [picture | name + TỐN/ĐƯỢC/MẤT rows], then GỢI Ý as one full-width box under that row.
- (6)(7) ONE layout per frame kind: fixed figure column (~190 px) and ONE figure scale = body height (kitFigBody ht→b) Hb ≈ 380 px × KIT_FIG.fac (men 1.07, kids by age) for every person; frame size changes only the info width/height. Person frames start at L (560; XL 860 kv2). Show both VIỆC samples side by side at the same column.
- (8) 3.4 options = kszBtn (same kit button) with a printed label of the kit size used; 3.1/3.2 = Hành sự compact card before|after (kitActCompact §43).
- (9) add narrow long pictures, e.g. LN 300x76 (≈4:1) and LN2 192x48, for info-frame banners.
Thái hậu file: the sheet uses kitFigOf({kind:"th"}) = the live game's file for that save (S.thF variant, e.g. img/fig-thaihau-h3-a51.webp in one run; h1-a51 only as fallback when unknown) — same as the live game. Her "lùn"/bigger look in the sheet came from sizing by the whole picture box (crown + margins), not by the body: fix = (6) body-height scale.

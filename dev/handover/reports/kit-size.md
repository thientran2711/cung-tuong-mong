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

## kit-size #3 (opus, 16/11 ~16:45Z–17:45Z) — owner 16:45Z s20 (1)–(6) + 17:20Z items override + 17:25Z KẾT QUẢ scope
START_CTX ≈ 4 % (context_usage read 0; estimate). Branch review/kit-size @ 94ce1194 (merged origin/main c7b82a57 first). SAMPLE ONLY — nothing wired into the game.
Code: dev/build/jksize.js section "v3" (kszFrame3 / kitFramePick3 / kitFrameApply3 / kitFrameFits3 / kszPicFit3 / kszBtnGrid3 / KIT_PIC_SUBJ / kszItem3 + KIT_SIZE.v3, fig3, item3), KIT.md §84 "v3". Kit page: kitSizeSheet("v3:<kind>"), kitSizeSheet("items3").
Tools: dev/test/kit-size3.js (frames: BEFORE = #2 builder on the M content, AFTER = 4 sizes + metrics), dev/test/kit-size3-items.js, dev/test/kit-size3-compose.py.

### Sheets (dev/handover/reports/kit-size3/, every one ≤ 2000 px tall)
- k3-755x1000-<kind>.jpg and k3-1180x820-<kind>.jpg for the 14 kinds of KP_SEAL: news TIN · rule LUẬT · notice BÁO · choice VIỆC · result KẾT QUẢ · info ĐIỀU · night ĐÊM · intel MẬT BÁO · evidence CHỨNG CỨ · reward BAN THƯỞNG · week TUẦN · threat CẢNH GIÁC · person NGƯỜI · end KIẾP. Layout: BEFORE (#2) | AFTER S | M | L | XL side by side; each AFTER column says what the content picks (✓/✗) and its size.
- items-755x1000-1..2.jpg, items-1180x820-1..2.jpg: BEFORE | AFTER for item sizes, 6.2 detail cards (same 7 items as sheet 8 incl. Áo gấm thêu hải đường), 6.3 pick grid, 6.5 event tags, wear row.

### What changed (kit level, one place each)
- (1) every frame = person + event picture. Event picture via the real path (spec.pic else kitDefaultBanner). Frames with no person of their own get a NARRATOR (KIT_SIZE.v3.narrator): thân tín maid (TIN, LUẬT, BÁO, TUẦN, MẬT BÁO, CHỨNG CỨ), Hoàng thượng (ĐÊM, BAN THƯỞNG), the player (KIẾP). ← proposal, owner to confirm.
- (2) presentations: S = ONE main picture left by focus (event-centred: TIN LUẬT BÁO ĐÊM MẬT BÁO CHỨNG CỨ BAN THƯỞNG TUẦN → event picture left, person = avatar in a fact row; person-centred: ĐIỀU KẾT QUẢ VIỆC CẢNH GIÁC NGƯỜI KIẾP → portrait frame left (pcPort, tag above), event strip on top of the info); M/L/XL = full figure left (body 300/370/480 px) + event picture top-right as wide as info + buttons. Body = left column height; the event picture grows into what the text leaves → measured empty space under the info = 0 px and figure gap ≤ 1 px on 54 of 56 frames per device.
- (3) KIT_PIC_SUBJ subject boxes + kszPicFit3: crop centred on the subject, strip never shorter than the subject (cap 2.2:1). VIỆC Hoàng hậu triệu kiến: the gold seal is whole at every size, banner = full info/button column width up to the frame's inner edge.
- (4) buttons: frame layout first, then a grid in the button area (S: whole frame width under the body; M/L/XL: info column). Cell = what the widest short button needs at its narrowest; short buttons 1 cell, long ones span (full row on narrow frames). Fold: S 2 cols (174), M 1 col (292), L 2 cols (177), XL 1 col (304); iPad XL 3 cols.
- (5) items per 17:20Z: ONE XL master scaled to L / M / slot (transform from 150 px); Xa xỉ box measured at the same place and size relative to the frame at every size (x 0.747, y 0.027, w 0.227 — all 27 tiles, both devices); word+number at XL/L, number only at M/slot; grade chip unscaled on the bottom edge. Corner-overhang idea dropped.
- (6) S 52 dropped: M 72 / L 104 / XL 150 + bag slot. Wear row: grade chip on the frame, no grade line.
- (7) Thái hậu: current files kept; note printed on the ĐIỀU / VIỆC / TIN / TUẦN sheets (Foreman C redraws).
- KẾT QUẢ sample = "Kết quả tranh ghế" (big event, 17:25Z); note on the sheet that routine actions keep the toast.

### Self-check vs every owner rule (Fold + iPad)
1. Person + event picture in every frame — PASS 112/112 frames (event picture element present, figure or portrait or fact avatar present).
2. 4 sizes per kind, own presentation per size — PASS (56 frames per device). Content picks its own size: 54/56 ✓; ✗ = VIỆC M (that content fits S, because Fold M stacks buttons in 1 column) and TIN M (1 px over → L). Honest marks are on the sheets.
3. No empty space at the bottom — PASS: emptyRight 0 px on all 112; figure top/bottom gap ≤ 1 px except VIỆC M/L (7–16 px).
4. Big = figure left + event picture top-right; small = one main picture by focus — PASS.
5. VIỆC HH: seal whole, banner aligned with the button column to the inner edge — PASS (sheet k3-*-choice).
6. Buttons in a grid per frame layout, short buttons one cell, THE kit button only — PASS; known: L 2-col cell is tight, a long title wraps to 4 lines ("Thưa do Hoàng thượng định").
7. No "Đã hiểu"; ✕ top-right on frames without options — PASS (hasDaHieu false ×112).
8. Tag rank line 1 / name line 2 above the head — PASS on figures and S portraits.
9. Figure + buttons centred vertically — PASS (body = left column; figure centred).
10. Xa xỉ never moves relative to the frame — PASS (measured); it still covers the same small corner as on XL (owner's master).
11. Kit first — all in jksize.js + KIT.md §84 v3, no per-screen CSS.
12. No page errors — PASS (after_errs [] / before_errs [] on both devices).
Known open: XL on the Fold is only 562 wide, so the 5-option VIỆC XL scrolls inside the info column (the last options are below the fold of the column); iPad XL fits in 3 columns.

### (b) routine actions opening a big result frame (17:25Z audit)
Live code: routine actions already use the toast (j63 rtoast .karesult). "Kết quả: Thỉnh an" came only from the #2 sample + jkitpage.js:119 (kit page sample) — not live. Modal result-kind frames found: j34/j90 "Kết quả tranh ghế" (big, keep), j53 + jexam exam results (big, keep), j70 scheme outcome rows (big, keep), j41:54 / j77:47 "Bị bắt" and jkc:396 "Bị bắt gặp" (rare consequence, keep), **j41:57 "Bị từ chối"** (asking to visit and being refused = routine → candidate for the toast).

### go-live-kit kit-conform "MISSING" (s21 request)
Re-ran dev/test/kit-conform.js on main+kit-size (Fold 87 ok / 18 MISSING, iPad 90 / 15). In that script MISSING = no #modal dialog appeared after the scripted tap (not "a dialog without a frame"). Cases: place:vuon dtd tn kn r2 r3 r4 r5 tyv ksp lc cnh nvp (+ tgk ttp acs on Fold), contest, cold-palace. A manual probe: j77Tap('kn') leaves S.place home with no queue; j77Tap('vuon') opens a dialog later → the place taps now run the walk/roulette flow asynchronously, so part of this is a STALE TEST (needs to wait for the walk). Frame kinds they should use once they open: place arrival / place card = BÁO (event-centred, place picture left at S), Tranh ghế = VIỆC (result = KẾT QUẢ), lãnh cung = BÁO. Not verified dialog-by-dialog.

### HANDOVER (next kit-size worker)
Waiting for the owner's verdict via main. Then phase 2: wire kszFrame3/kitFramePick3 into kpBuild / kitEventStage (#modal), map KP_SEAL kinds → focus, narrator from kitStagePeople fallback, items → jk2b kitItem (XL master scale), button grid into kpopts; audit the 67 "Đã hiểu" literals; fix kit-conform test to wait for the walk. Server: node dev/test/cdn-overlay-serve.js 8733 <wt> <empty list> (run_in_background, long timeout). Rebuild: bash dev/site/build_site.sh then restore index.html/sw.js before committing.

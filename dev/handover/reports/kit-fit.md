SẴN SÀNG KIỂM e383a4dd7

# kit-fit (kit keeper, opus) — owner bugs 16/11 s21 (2) figure gaps + (3) option empty space
START_CTX ≈ 5 % (context_usage read 0; estimate). Branch review/kit-fit off origin/main b7c5d787e. Owner screen: dev/handover/refs/owner-viec-thanhminh.jpg (docs branch).

## What changed (kit parts only, no per-screen CSS)
- **(A) KIT §32.2b EQUAL GAPS** — `kitDpFit` (jk4, THE person-column fit used by every #modal frame with a figure) + `kitPersonDlgFit` (jpdlg, the coach / tip person dialog outside #modal).
  Gap from the frame line above (header rule = bottom of .kph) to the top of the name chip = gap from the painted feet to the frame line below
  (#modal: frame inner bottom; kpdlg: bottom of the figure area above the button band). Both ≥ `KIT_DP_GAP` = max(5 % of that height, 14 px)
  → chip + figure ≤ 90 % (kit figure scale 85–90 %). A figure the column width keeps shorter (32.2a cap) is centred (equal larger gaps) instead of
  standing on the floor with empty space above. Re-lays when the sticky whole-column scroll (kdpall) toggles and when an option card changes form.
  Helpers `kitFrameLines` / `kitFrameGaps` (measure). A figure cut at the floor (short column, 32.2a minVis) is not full-body: chip stays one gap under the header rule.
- **(B) KIT §6.2b PICTURE FORM BY CONTENT** — `kitOptFit` / `kitOptFitAll` / `KIT_OPT_SQ` (jk4, beside kitCompactCSS) for EVERY compact act card
  (`button.ka.kart`: dialog options .kopt, person-card act rows §6.3, narrow-pane act cards §43, kit page). Text block shorter than the tall 3:4
  picture → SQUARE picture, side = text height clamped to [0.45 w, w] (84 → 38..84, 72 → 32..72), same meaning picture cover-cropped; class kasq,
  data-kapic. Runs after every kaNorm pass, after showModal, and from a ResizeObserver on each card + its text. Big Hành sự card untouched.
- KIT.md: §6.2 line "(never a square crop)" overwritten in place (canon overwrite) + new §6.2b + §32.2b. Kit sample page: §6.2b (jopic, 3 options short → long).

## Tests (both devices, CSS px)
- NEW `dev/test/kit-fit.js` (own measuring code, so it also measures the old build): 30 cases = coach, tip, Hậu cung › Chí tôn cards (court0–2),
  festival VIỆC Tiết Thanh minh (fest), the 13 KP_SEAL kinds with a person (choice VIỆC, news TIN, result KẾT QUẢ, notice BÁO, night ĐÊM, info ĐIỀU,
  rule LUẬT, intel MẬT BÁO, evidence CHỨNG CỨ, reward BAN THƯỞNG, threat CẢNH GIÁC, person NGƯỜI, end KIẾP), toilette reaction, Thái hậu triệu, visit,
  Emperor visit, man, two people, child, many options, banner, whole-column scroll, shop, pet care.
  **AFTER: 0 violations, 0 page errors** (755x1000 + 1180x820). BEFORE (main): 185 violations.
  Skips: emp (random Emperor visit not drawn in that run; other runs measured it 27/26 after the kdpall fix), pet (a new life owns no pet).
- Residual: option empty ≤ 1 px (rounding); text shorter than the 38 px minimum square would keep (38 − text) px — none in the scan.
- kit-conform (755x1000 + 1180x820): CONFORMS 90 / 87, MIXED 0, CUSTOM 0, MISSING 16 / 16 (MISSING = no dialog after the scripted tap — known stale
  place-tap cases, see kit-size #3 report). Main baseline same run: 755 CONFORMS 86 / MISSING 16, 1180 CONFORMS 90 / MISSING 15, MIXED 0, CUSTOM 0 (the case count varies with the random PEND events). Float "kloadchip" on 755 = the picture-loading chip (also on main).
- Old save: `ts-oldsave.js` main build → this build, same origin: loads, 12 weeks played, 0 page errors.

## Before / after (full screen, labelled) — dev/handover/reports/kit-fit/<case>-<WxH>.jpg
fest (owner's VIỆC Tiết Thanh minh), choice, many, court0 (person-card act rows), coach (kpdlg), toil (Thái hậu), info (ĐIỀU) × 755x1000 / 1180x820.

## Measurements (gap px = header rule → chip top / feet → frame bottom; option empty px = card content bottom − text bottom)

**755x1000**

| case | figure gap BEFORE | AFTER | option empty px BEFORE | AFTER | forms AFTER |
|---|---|---|---|---|---|
| coach | 8/2 | 33/33 | - | - | - |
| tip | 8/2 | 29/28 | - | - | - |
| court0 | - | - | 57,20,20,38,38 | 0,0,0,0,0 | sq,sq,sq,sq,sq |
| court1 | - | - | 57,38 | 0,0 | sq,sq |
| court2 | - | - | 57,20,20,38,38 | 0,0,0,0,0 | sq,sq,sq,sq,sq |
| fest | 124/6 | 65/64 | 23,23,54 | 0,0,0 | sq,sq,sq |
| choice | 86/6 | 33/32 | 70,39 | 0,0 | sq,sq |
| news | 86/6 | 33/32 | - | - | - |
| result | 86/6 | 33/32 | 56 | 0 | sq |
| notice | 86/6 | 33/32 | - | - | - |
| night | 124/6 | 65/64 | 56 | 0 | sq |
| info | 178/6 | 83/83 | - | - | - |
| rule | 178/6 | 83/83 | - | - | - |
| intel | 86/6 | 33/32 | 56 | 0 | sq |
| evidence | 86/6 | 33/32 | 56 | 0 | sq |
| reward | 124/6 | 65/64 | 56 | 0 | sq |
| threat | 86/6 | 33/32 | 56 | 0 | sq |
| person | 86/6 | 33/32 | 56 | 0 | sq |
| end | 86/6 | 33/32 | 56 | 0 | sq |
| toil | 178/6 | 83/83 | 54,70,3 | 0,0,0 | sq,sq,sq |
| thtrieu | 178/6 | 83/83 | 52,54 | 0,0 | sq,sq |
| visit | 10/6 | 52/52 | 36,0,38 | 0,0 | sq,tall |
| emp | - | 65/64 | - | 0,0,0 | tall,sq,tall |
| man | 108/6 | 57/57 | 75,56 | 1,0 | sq,sq |
| two | 86/6 | 33/32 | 75,56 | 1,0 | sq,sq |
| child | 122/6 | 84/84 | 75,56 | 1,0 | sq,sq |
| many | 86/6 | 33/32 | 57,57,57,57,57 | 1,1,1,1,1 | sq,sq,sq,sq,sq |
| ban | 178/6 | 83/83 | 56 | 0 | sq |
| scroll | - | 65/64 | - | 1,1,0,0,0,1,0,0,0,0 | sq,sq,sq,sq,sq,sq,sq,sq,sq,sq |
| shop | 108/6 | 57/57 | - | - | - |
| pet | | skip (none) | | | | |

**1180x820**

| case | figure gap BEFORE | AFTER | option empty px BEFORE | AFTER | forms AFTER |
|---|---|---|---|---|---|
| coach | 8/4 | 27/27 | - | - | - |
| tip | 8/4 | 22/22 | - | - | - |
| court0 | - | - | 24,0,0,0,6 | 0,0,0,0,0 | sq,tall,tall,tall,sq |
| court1 | - | - | 6,6 | 0,0 | sq,sq |
| court2 | - | - | 24,0,0,0,6 | 0,0,0,0,0 | sq,tall,tall,tall,sq |
| fest | 10/6 | 27/26 | 23,23,54 | 0,0,0 | sq,sq,sq |
| choice | 10/6 | 27/26 | 70,52 | 0,0 | sq,sq |
| news | 10/6 | 27/26 | - | - | - |
| result | 10/6 | 27/26 | 56 | 0 | sq |
| notice | 10/6 | 27/26 | - | - | - |
| night | 10/6 | 27/26 | 56 | 0 | sq |
| info | 52/6 | 27/26 | - | - | - |
| rule | 52/6 | 27/26 | - | - | - |
| intel | 10/6 | 27/26 | 56 | 0 | sq |
| evidence | 10/6 | 27/26 | 56 | 0 | sq |
| reward | 10/6 | 27/26 | 56 | 0 | sq |
| threat | 10/6 | 27/26 | 56 | 0 | sq |
| person | 10/6 | 27/26 | 56 | 0 | sq |
| end | 10/6 | 27/26 | 56 | 0 | sq |
| toil | 66/-8 | 27/26 | 54,70,3 | 0,0,0 | sq,sq,sq |
| thtrieu | 66/-8 | 27/26 | 52,38 | 0,0 | sq,sq |
| visit | 10/-8 | 27/27 | 36,0,38 | 0,0,0 | sq,sq,sq |
| emp | | skip (none) | | | | |
| man | 10/6 | 27/26 | 75,56 | 1,0 | sq,sq |
| two | 10/-8 | 27/26 | 75,56 | 1,0 | sq,sq |
| child | 98/6 | 67/67 | 75,56 | 1,0 | sq,sq |
| many | 10/6 | 27/26 | 75,75,75,75,75 | 1,1,1,1,1 | sq,sq,sq,sq,sq |
| ban | 52/6 | 27/26 | 56 | 0 | sq |
| scroll | - | 27/26 | - | 1,1,1,1,1,1,1,1,1,1 | sq,sq,sq,sq,sq,sq,sq,sq,sq,sq |
| shop | 10/6 | 27/26 | - | - | - |
| pet | | skip (none) | | | | |

## Not done / notes for the reviewer
- Week book (Tuần lục) person page (j87 kitStageFig + kitBookFigClamp) and the identity card (kpIdFig) have no header-rule/frame-bottom pair of their own
  (book page / full card); not changed — tell me if the owner wants the same equal-gap rule there.
- review/kit-size v3 (unapproved sample) not wired; its measured "figure gap ≤ 1 px" is consistent with this rule.

## HANDOVER (rollover at ~START_CTX+25 %, 16/11 19:15Z) — two KIT REQUESTS from MAIN s21 NOT started; successor (opened by MAIN s22) does them on review/kit-fit
1. Save-slot row `.kslot` (j74 "Chọn sổ"): 3 full rows (Kiếp/Tuổi/Ngày + buttons) make the iPad 1180x820 panel scroll. Make the ONE kit slot row compact
   (info left, buttons right in 2 columns on wide panels) so 3 rows + Phúc duyên fit on iPad without scrolling; Fold may scroll. review/chonso-tabs 5099b51cf
   adds tabs to that panel (under review): base on it or keep the change inside .kslot only.
2. Card flip §67 (jflip): Fold 755x1000 row labels overlap under the raised card; iPad 1180x820 a faded label shows through the result chip. Fix in the kit
   card-flip layout; before/after shots (labelled, full screen). Probe hint: kit-conform.js hides `.kcf` — the flip overlay is #kroul/.kcf.
Recipe: worktree + `bash dev/site/build_site.sh` + `python3 -m http.server`; restore index.html/sw.js/assets.json before commit; re-run dev/test/kit-fit.js (must stay 0).

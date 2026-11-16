SẴN SÀNG KIỂM 6b9ca17da (ROUND 2, one sha for all items; round 1 e383a4dd7 is included)

# ROUND 2 — kit keeper successor for MAIN s22 (16/11)
START_CTX ≈ 6 % (estimate). Branch review/kit-fit: 28828f29 + merge origin/main 86229158 + round-2 kit changes + merge origin/main 7b5e5e49 (KIT.md: kept both slot paragraphs, dropped a duplicate §77.1 main had moved) + merge origin/main 23595c37 (fold-popw-r1; only built files conflicted); site rebuilt + committed. Tests re-run after the last merge: kit-fit2 / kit-fit same results.

## What changed (kit parts only)
1. **§32.2b equal gaps, whole group** (owner s21/s22: every full figure in a frame):
   - Week book person page — `kitBookFigClamp` (jsl): lines = running-head rule `.kbk-rh` ↔ the page frame's bottom line (art pages: painted
     border inner edge `KBK_ART_LINE.b` = 2.44 % of page height, measured on book-right.webp; plain pages: the drawn `.kbk-in` frame). Figure
     raised by half the difference, never past its column floor (page-number row) or top. Size rule §34.6 unchanged.
   - Identity card — `kpIdLay` (j79, §28.11a overwritten in place): painted figure centred between screen top/bottom (spread) or screen
     top/panel top (one page, `kitView().pages===1`). ROOT CAUSE found on Fold: kpIdLay's own `W<600` phone test disagreed with the CSS
     `html.kv1` one-page rule, so Fold 755x1000 drew a 176 px figure in a 98 px strip at the bottom-left; now the figure stands above the panel.
   - Coach / tip dialog + every #modal person column were done in round 1.
2. **KIT SLOT ROW `.kslot` compact** (j74; KIT.md "KIT SLOT ROW" under §29 Chọn sổ; kit page sample "§29 slot"): slot name as a 6.4em label
   column on the left; info as label+value pairs flowing on lines (a pair never splits, no word-by-word wrap) ON TOP, buttons in ONE row
   BELOW. NOTE: the request suggested "info left, buttons right"; I did NOT do that — the owner ruled 16/11 (OD:1178) "info rows on top,
   buttons below" after a side-by-side slot card wrapped values word by word. Same part for sổ, rooms, Sổ mây card, Nhập ám hiệu.
3. **§67 card flip** (jflip): ROOT CAUSE of the Fold bug: `.kcf-mine` is both the glow `<i>` on her card and the overlay class on her nights;
   the glow CSS (absolute, 83 % × 54 % box) hit the OVERLAY → the whole scene shrank into a box with tray, cards and labels piled under the
   raised card. CSS now `i.kcf-mine`. Plus `coverTags` hides every other card's tag that meets the picked card's final centre rect or the
   result chip (after the chip shows, again after its pop) — the faded "Quý nhân" under "Quý phi ???" on iPad.

## Measurements (dev/test/kit-fit2.js, CSS px) — BEFORE (this branch before round 2) → AFTER
| case | 755x1000 before | 755x1000 after | 1180x820 before | 1180x820 after |
|---|---|---|---|---|
| book gap top/bot | 57/38 | 49/47 | 47/35 | 37/37 |
| id gap top/bot | 812/−696 (176 px figure in a strip) | 15/14 (above panel) | 121/10 | 66/65 |
| slots (Một mình) panel scroll | 0 (row 144) | 0 (row 83) | 99 px (panel 574, no Sổ mây yet) | 0 (panel 560 of 574 incl. Sổ mây card) |
| slotsco (Cùng hảo hữu) scroll | 97 px (row 186) | 0 (row 102) | 223 px (no join card yet) | 54 px incl. Nhập ám hiệu card (542 without it) |
| flip me: tags over pick/chip/each other | 2 / 0 / 0 (scene shrunk) | 0/0/0 | 2 / 0 / 2 | 0/0/0 |
| flip other | 2 / 0 / 0 | 0/0/0 | 3 / 0 / 1 | 0/0/0 |
Extra sizes (after): id 412x1058 17/16, 1366x1024 82/82; book 412x1058 31/31, 1366x1024 39/39 (older line definition).
AFTER THE SECOND MAIN MERGE (main 7b5e5e49 = review/chonso-cloud live: Sổ mây card on Một mình, Nhập ám hiệu card on Cùng hảo hữu):
iPad 1180x820 Một mình = Sổ mây 73 + 3 sổ 83 + Phúc duyên → panel 560 of 574, NO scroll ✓. Cùng hảo hữu = Nhập ám hiệu 82 + 3 rooms 102
(5 pairs = 3 lines) + Phúc duyên → scrolls 54 px on iPad (Fold: none). Closing that needs a content call, not a kit one — options for MAIN:
(a) shorter Nhập ám hiệu row (its explanation "Gõ ám hiệu hảo hữu gửi để vào phòng của hảo hữu" wraps to 2 lines) or drop the row (-19 px);
(b) rooms without the "Tuổi" pair (date + name are enough) → 2 lines (-57 px); (c) accept the small scroll on the co-op tab.

## Tests
- kit-fit2.js (new): AFTER 1 violation = slotsco iPad 54 px scroll (co-op join card, see above), 0 page errors (755x1000 + 1180x820; id/book also 412x1058 + 1366x1024). BEFORE 12.
- kit-fit.js (round 1, 30 cases): 0 violations, 0 page errors (both sizes).
- kit-conform (after the 2nd merge): 755 CONFORMS 88 / MISSING 15, 1180 CONFORMS 86 / MISSING 16, MIXED 0, CUSTOM 0, floats none (MISSING = stale place-tap cases as in round 1).
- Old save: ts-oldsave main build → this build: loads, 12 weeks, 0 page errors.
- media-check: 0 width breakpoints.

## Before | after shots (labelled, full screen) — dev/handover/reports/kit-fit/r2-<case>-<WxH>.jpg
book, id, slots, slotsco, flipme, flipother × 755x1000 / 1180x820 (12).

## Not done / notes
- Card-flip demo shows cards of a fresh life (few rivals); 12-card trays with long names were not reached in this run.
- review/chonso-cloud is now on main and merged here: its Sổ mây / Nhập ám hiệu .kslot cards take the compact row with no change.

(round 1) SẴN SÀNG KIỂM e383a4dd7

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
3. (s22 19:15Z) YES: the equal-gap rule (§32.2b) also covers the week-book person page (j87 kitStageFig + jsl kitBookFigClamp) and the identity card
   (j79 kpIdFig) — whole group. Then merge latest origin/main, push ONE sha, before|after shots Fold 755x1000 + iPad 1180x820 for all items, report
   "SẴN SÀNG KIỂM <sha>" to MAIN s22 = session_01UV1SzjhT28XQmRt2EHNffg (one reviewer for all).

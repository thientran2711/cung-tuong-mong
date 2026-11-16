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

## kit-size #2 (opus, 16/11 ~16:05Z–) — owner 16:00Z (1)–(9) + items 16:10Z/16:15Z, CODED in the kit sample (jksize.js)
START_CTX ≈ 7 % (estimate). Rolled over at ≈ 33 % after push + report (worker rule: coordinator opens the successor).
Done (all in dev/build/jksize.js, sheet scope; NOT wired into the game — mass change waits for the owner's OK via main):
- (1) kszFigHtml → kitTitleTag3 (title plate when worn, rank line 1, name line 2); kszRankName fallbacks (Thái hậu / Hoàng thượng rank only, gold kitRankCol(7); queen; RANKS for rivals).
- (2) KIT_SIZE.infoKinds: no "Đã hiểu"/"Đã rõ" footer; kitXHTML ✕ in the header (data-kszx). Outside-tap close = the live modal's rule (OD:L418) — wire in phase 2.
- (3) .kszbody align-items:center, .kszright justify-content:center.
- (4) .kszopts = one column, every button width 100 %; kitBtnUnify = one class per frame (largest needed).
- (5) kszBtn: row 1 picture + name/TỐN/ĐƯỢC/MẤT, row 2 .kszhint GỢI Ý full-width box; GỢI Ý not counted by kitBtnSize.
- (6)(7) KIT_SIZE.lay/kindLay: big (VIỆC ĐIỀU LUẬT BÁO ĐÊM) = figure L body 310 px, column 176; small (KẾT QUẢ TIN) = figure M 230 / 140. kszFigFit sizes by measured body (kitFigBody b−ht) × KIT_FIG.fac. Frame size changes only the info area.
- (8) sheet tags each button with its class ("nút S/LS/LR"); 3.1/3.2 before = crop of the owner's group-3 shot.
- (9) narrow strips NS 192x56 · NM 300x84 · NL full x 110/140; frame `ban` uses them.
- Items: grade chip centred ON the bottom edge, chip grows S→XL; Xa xỉ = kitItem lux tab as a SQUARE box (word / number; S number only), text row removed from 6.2; Ngự: .kits corner mark hidden, only the "Ngự tứ" chip.
- Item sizes measured (live, both devices): bag = slot 63–96; wear row sm 52 (fits md 72 in one row: wear-row-M-*.jpg); gift shelf/jitd sm 52; panels lg; reveal xl → proposal drop S.
ART REQUEST (→ Foreman C via main): Thái hậu figures fig-thaihau-h1/h2/h3-a51 are out of the standard proportion: head ≈ 1/6.5 of the body (consorts ≈ 1/8) and robe core width 0.40–0.42 of body height (consorts 0.18–0.25) → she reads short / big. Code cannot fix it without distortion; redraw at the standard female proportion.
Known / open: kitFigBody head-top detection (ht) returns ht = t for these figures (pink/gold ornaments pass the skin test) → crowns counted as body; same for every person so the scale is still equal, but a stricter skin test would size bodies more exactly (kit-wide family change, not done). XL portrait VIỆC with 4 long options scrolls inside the info column (cap 732).
Sheets: dev/handover/reports/kit-size/ba-755x1000-*.jpg, ba-1180x820-*.jpg (BEFORE | AFTER, 1600 px wide, ≤ 2000 px tall). Tools: dev/test/kit-size-ba.js (before/after blocks) + dev/test/kit-size-compose.py.
Next (successor): wait for the owner's verdict via main; then phase 2 (wire kszFrame/kszBtn/kitFrameApply into kpBuild / kitEventStage / kitDpFit / compact cards; move the item CSS into jk2b kitItem; audit the 67 "Đã hiểu" literals: info frames only).

## kit-size #5 — PHASE 2 live (opus, 16/11 ~19:50Z–) — s22 task (worker; coordinator = s22 session_01UV1SzjhT28XQmRt2EHNffg)
START_CTX ≈ 3 % of 1M (context_usage read 0; estimate). Rollover at ≈ 28 %, ceiling 60 %. Rolled over at ≈ 28 % (handover below; the COORDINATOR opens the successor).
Branch review/kit-size: merged origin/main (7b5e5e49) → 08129f3d; code f130133c + this commit.

### Done
- `kitFrameLive3` (jksize.js, KIT.md §84 "PHASE 2 · LIVE"): every #modal kit panel of a KP_SEAL kind becomes THE v3 frame (moves the game's nodes; option handlers kept). jksize.js added to the build (assemble.py, last module). Narrator via `kszWho3` / BAL.staff.narrator; ĐÊM tag = "Kính sự phòng" (KIT_SIZE.v3.office). Option cards in the v3 grid (`kszBtnGridLive3`). Old fit passes skip a live frame. Pages/menus excluded (list in KIT.md).
- Tests: `dev/test/kit-size5.js` (20 cases) and `dev/test/kit-conform.js` template T7.

### Measured (kit-size5, Fold 755x1000 · iPad 1180x820; page errors none on both)
| case | Fold size / box | iPad size / box | notes |
|---|---|---|---|
| info, info-person, result, threat, person, end | S 380 | S 380 | portrait pendant + event strip, 0 empty |
| rule, news, notice, night, intel, reward, week, headart-notice | S 380 | S 380 | event picture left, info centred (top gap = bottom gap) |
| notice-long | L 560 (XL on a slow picture load) | XL 860 / L | 0 cut |
| choice (2 opts) | S, grid 2 cols | S, 2 cols | |
| headart-choice | L, 2 cols | L, 2 cols | |
| choice-5 (5 opts, Hoàng hậu) | XL 562, 1 col, info column SCROLLS ~240 px | XL 860, 3 cols, no scroll | Fold risk (owner note): see open item 1 |
| evidence (long page of evidence cards) | XL, scrolls in info column | XL, scrolls | big content by nature |
No frame leaves the screen, no horizontal overflow, no cut text (ellipsis/scroll check), no visible "Đã hiểu" button (✕ in header, kitCloseSync).
kit-conform (all PEND + SRV + places, both devices): T7 CONFORMS 73 · T1 7–8 · T2 2 · T3 1; MIXED 3 = place:tgk / place:ttp / place:night "two pictures: band + left picture" (T2, NOT converted frames — verify whether this exists on main before blaming phase 2); MISSING 15–16 = the stale place-walk cases noted in #3 (test waits not fixed yet).

### Open — HANDOVER for the next kit-size worker (in this order)
1. Fold XL with ≥ 5 option cards scrolls inside the 304-px info column. Tried: options moved under the body (full width) → frame taller than the Fold screen, clipped; reverted. Options: (a) accept scroll (approved #3 "XL: more scrolls inside the info column"), (b) square option cards (§6.2b kit-fit, review/kit-fit not merged yet — once merged the cards are ~half height and choice-5 likely fits), (c) a narrower figure column at XL on kv1. Recommend (b): merge review/kit-fit first, re-measure.
2. Verify the 3 MIXED place cards on origin/main (kit-conform with the old build); if pre-existing, report as separate bug.
3. Items → `kszItem3` XL master inside jk2b `kitItem` (not started).
4. "Đã hiểu" literal audit: 78 literals in 41 files (jlost 8, jksize 5, jkitpage 5, jk4 5, jts 4, jdh2 4, jtut 3, j77 3, …; `git grep -c 'Đã hiểu' -- 'dev/build/j*.js'`). Rule: only info frames lose it (tutorial / scene-end keep, OD:L1261). In #modal the button is already hidden by kitCloseSync (✕) — audit the other surfaces.
5. Runs not done yet: an old-save test (e.g. dev/test/two-way-oldsave.js) and dev/test/coop-e2e.js on this build; kit-conform place-walk waits.
6. Kit page sample for the live frame (KIT_SAMPLES.push) — not added.
Server for tests: `node dev/test/cdn-overlay-serve.js <port> <wt> <empty list>`; rebuild `bash dev/site/build_site.sh`, then `git checkout index.html sw.js assets.json` before committing. Shots outside git (/home/user/wt/ksz2-shots).

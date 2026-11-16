# kit-keeper-2 report (16/11) — branch review/kit-keeper-2, base origin/main a96b3464

STATUS: items 1-3 built and scanned; item 4 (person card at 844x390) built, re-test pending; item 5 (scene-end button, OD:L1261) queued after 4.

## 1. Event-frame body clips long text (Foreman D D-R1) — KIT 32.5b (jk4 `kitDlgText`, jkitpage sample "VIỆC DÀI")
Root cause: in the fixed event frame (`.dlg.kdscroll`, any dialog with `.opts`) `#mb` is overflow:hidden and only `.opts` scrolled (32.5); the story text (`.kpb > .kpmain`) was flex:none, so a text taller than the room was cut. 
Fix, once, in the kit part: `kitDlgText` (called by `kitDlgFit`) keeps the text at its natural height while the options keep min(content, 42 % of the body, ≥96 px); a longer text is capped (`.kdtx`) and scrolls inside `.kpmain` with the same soft top shadow as the options. Title, picture, figures and buttons stay fixed. Person dialogs (kdper) keep their whole-column scroll (`kdpall`). Dialogs without options already scrolled `#mb`.
Scan (new): `dev/test/dlg-clip.js` — every kit modal kind + every PEND event dialog, own text and +long text, text cut by a clipping ancestor = FAIL; long dialog without scroll area = FAIL.

| viewport | cases | text clipped BEFORE | text clipped AFTER | long dialogs with a scroll area BEFORE | AFTER |
|---|---|---|---|---|---|
| 755x1000 | 78 | 16 | 0 | 37/39 | 39/39 |
| 1000x755 | 78 | 16 | 0 | 37/39 | 39/39 |
| 1180x820 | 78 | 16 | 0 | 37/39 | 39/39 |
| 1366x1024 | 78 | 16 | 0 | 37/39 | 39/39 |
| 844x390 | 78 | 16 | 0 | 38/39 | 39/39 |

Clipped before (every size): choice-long, choice-6-long (plain Việc with long text) and the event dialogs tt1 tt2 tt3 nc1 td1 phoenix doanngo vulan dongchi giftpick taintpick evpick plantsv runner (+ the same family: every PEND event with options). After: none. Looked at: 1366x1024 and 844x390 choice-long (text scrolls inside, title and option buttons fixed). The "Nhập cung / Hậu cung" row at 1366x1024 is not clipped on this main (`nl-card`: #mb scrolls, 0 cut).
Open note (not changed): person dialog with a wide event banner in `kdpall` mode (right column scrolls as ONE list, pcard-actrow) scrolls the banner with the text; the person stays pinned. A fixed banner would need a second scroll area in a grid; say if the owner wants it.

## 2. C32b landscape page-curl speed — KIT 34.0 item 5 + new 34.0b
`KIT_TURN_MS` 1300 → 800 ms (jbook.js, the ONE constant: ‹ › buttons, tab switch, week book, cover, drag release). KIT.md 34.0 text and the §844 line updated. Added the missing conditional text from the C32 PASS: KIT 34.0b (portrait = paper slide `kitSlideSheet` / `KIT_SLIDE_MS` 300 / `kitSlideEase`, landscape = curl, Gọn/Cảnh động off = ~120 ms fade, swipe only inside kitBook).

## 3. dev/test/podium.js stale
Cause: after start() the new-life roulette (#kroul/#kroulw) intercepted the first tap; later the prize chest (#kmrew) and a hidden #kg82ok did the same. Fixed in the test: init script that skips/removes `.kroul,#kmrew,#kprevov`, `.kroul{display:none}`, `#kg82ok` taps tolerant. Result: see section 6.

## 4. Person card at short landscape (844x390) — KIT 6.3b (jk2b `kitPcWide`)
Before (`dev/test/pcard-land.js`, new): the card was the stacked card: picture 230x433 + info, first act at y=495 in a 179 px high panel → clipped, 800 px of scroll (pop-maid, pop-elder, tab-rv, tab-court all FAIL). Fix: in landscape ≤ 520 px high `kitPcWide` returns true with `--kpcw`=92 px → the existing two-column card (picture + name + info left, sticky; acts right). One place, every card host. After: see section 6.

## 5. Scene-end button (OD:L1261) — KIT 81 (j93 `kitSceneEnd` / `kitSceneEndLabel` / `kitSceneFit`, `kmStage`) — KIT READY
Every kmStage scene (card flip km-tablet, edict, gloom, bloom, ink) now ends with ONE `.kbtn.kmend`: no auto-close, a tap on the scene never closes it, only the button; words: flip lands on HER "Chuẩn bị thị tẩm", another consort "Ta biết rồi", edict/gloom "Đã hiểu", others "Tiếp theo" (`o.end` overrides). Short screens: a scene taller than the room above the button is scaled (`kitSceneFit`, CSS zoom ≥ .55) so nothing runs under the button. `kitSceneEnd(ov,label,onClick)` = the same button for scenes NOT on kmStage (the sweep uses it). Full list of scenes still to sweep: KIT.md §81. Kit page sample §81. Test `dev/test/scene-end.js`: 6 scenes × 5 sizes = 30/30 PASS (no button while playing, right words, one kbtn, inside screen, no text under it, still open after 3.5 s, tap on scene keeps it open, button closes). Looked at 844x390 flip / edict / gloom shots.

## 6. Test results (build of the branch head; server on a free port)
- `dev/test/dlg-clip.js` 5 sizes: 0 clipped, 39/39 long dialogs scroll (table in section 1).
- `dev/test/kit-conform.js` 755x1000 / 1000x755 / 1180x820 / 1366x1024 / 844x390: CONFORMS 82, MISSING 15 (cases not openable in the test game, same as before the change), floats none. (run on the build with items 1-2; items 4-5 do not touch dialog frames.)
- `dev/test/panel-size.js` 5 sizes (+390x844... not run: rotate prompt): one width per viewport, no nofit / xOut / btnOut, 0 page errors.
- `dev/test/pcard-land.js`: 844x390 pop-maid / pop-elder / tab-rv / tab-court / tab-staff PASS (acts beside the picture, first act fully visible; before: all FAIL, first act at y=495 of a 179 px panel); 755x1000, 1000x755, 1180x820, 1366x1024: same hosts PASS (acts beside picture, no horizontal overflow).
- `dev/test/podium.js` (fixed) at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390: runs to the end at all 5 sizes without a timeout (before: stopped at the first tap); my log cut each size's JSON at 600 chars, so only the first two checks per size (win, lose-4th-stranger) were read: `bad` empty at all 5 sizes; the tranh-ghe / kid-exam / old-save checks were not read — re-run `node dev/test/podium.js <url> WxH@2 <out>` to see them.
- `dev/test/scene-end.js` 30/30.
- No page errors at any of the 5 sizes in any run.

## 7. .kpbar above modal (main s14) — NOT reproduced
`dev/test/kpbar-modal.js`: 8 pane tabs × info / pcm / choice / notice pop-ups × (1180x820, 844x390) with the pane scrolled: the pop-up is on top of the pane bar with the OLD z-index 40 too (16/16 PASS before and after; first runs were polluted by the boot cover #kload and the week book .kbk-cv, fixed in the test). I still lowered `.kpbar` to z 29 (KIT 45.4: under every `.modal` 30), harmless, but the real cause of the owner's shot is unknown: need the screenshot / steps / viewport / which pop-up.

## 8. D3 item-big (OD:L686, review/item-big@adda320 KIT REQUEST) — KIT 28.13b — KIT READY
`kitItem` sizes lg (150 px) / xl (min(260px,36dvh)) are FRAMELESS (no border / ground / shadow / ::after frame; soft drop shadow; `frame:true` opts back in) and HI-RES: `kitItemBigSrc` maps `img/item-X.webp` → `img/item512/item-X.webp` with one onerror fallback to the small file. One place: the ~20 call sites that passed the small src follow without being touched. NOT covered: pet / veil / mark pictures (own src functions), the 22 items without item512 (ART REQUEST in reports/item-big.md). Test `dev/test/item-big.js` 5 sizes PASS (xl/lg frameless, 512 src, xl 260 px / lg 150 px, md and frame:true still framed, real item pop-up frameless). Kit page sample §28.13b. In this sandbox the CDN paintings do not load, so the real item pop-up picture size could not be looked at: coordinator please eyeball one item pop-up on the live build.

## 9. r1 FAIL list (kit-keeper-2-r1 on 5837359e) — fixed
- Real pop-ups, not only item-big.js: the "Mất đồ" notice (kitLose, kind:"notice" + itemPic) was dressed as the compact bag card (`kitSlotDress`) → 64/71 px. Now (main s14 decision, OD:L686): notices with an item picture are the CENTRE display = item alone, big (picture column `min(150px,38%)`), frameless; the bag / Tư trang pop-up and every kind:"info" item panel stay compact WITH frame (28.13f; `kitSlotDress` marks `kitem-fr`). jinv `kpBuild` skips `kitSlotDress` for notices.
- Found while fixing: the reused `.dlg` kept a stale `.kitslot` class after a bag pop-up, so the NEXT notice came out compact. `kpBuild` now removes it first.
- KIT 28.13b/f split written in KIT.md 28.13b. `dev/test/item-big.js` now measures the real "Mất đồ" notice (kitb 150 px, frameless) and the real bag pop-up (still framed): 5 sizes PASS.
- Merged r1's jflip kitSceneEnd (card flip scene ends with the scene-end button) into this branch; conflicts only in built index.html / sw.js (rebuilt).
- 512 files for items that lack them = ART REQUEST (Foreman C), the 256 px picture stays soft until then.

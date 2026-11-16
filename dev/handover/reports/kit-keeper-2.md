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

## 5. Scene-end button (OD:L1261) — queued
Plan: kit part in j93 `kmStage` (`o.endBtn` / `kitSceneEnd`), no auto-close after the final frame, label from `kitSceneEndLabel`.

## 6. Test results
(filled at the end)

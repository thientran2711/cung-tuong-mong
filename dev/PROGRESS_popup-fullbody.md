# PROGRESS popup-fullbody (review/popup-fullbody) — owner bugs 16/11 07:35Z + 07:37Z (OD:L448, OD:L963)

## Rule
Every pop-up where a person appears = approved event template: LEFT full-body figure, RIGHT TOP event picture, info, buttons bottom. No small framed portrait (.kpsubj + pframe). ONE event = ONE frame size for all pages / steps.

## Priority rule #1 (existing work reused)
- Template: kitEventStage / kitDpApply / kitEventDp (jk4, KIT §32.2 / 32.7 / 50) already on main — reused for every #modal dialog.
- Size tokens --kpw / --kph (j79, review/panel-size, KIT §8.1) reused.
- review/tutorial-r2-r6 and review/kit-popup-sample(-r1) do NOT touch the coach card (grep: no figure / stage code in jtut.js) — nothing to reuse there.

## Family scan (before → after)
| pop-up kind | before | after |
|---|---|---|
| LỜI DẶN tutorial coach (`kitCoach`, jtut) — intro pages + spotlight steps | small framed portrait (.ktut-mm), card size by content (pages 3/4 and 4/4 differed) | `kitPersonDlg` (new kit part `dev/build/jpdlg.js`, KIT §50.2): figure left, picture right top, info, buttons; 4 intro pages = `std` frame (--kpw x --kph) all identical; spotlight steps = `coach` frame (same width, --kpch height) all identical |
| LỜI DẶN contextual tips (`kitTip`) | small portrait | `kitPersonDlg` coach size |
| #modal info / rule / person (ĐIỀU / LUẬT / NGƯỜI) about a person | small 3:4 portrait (kitEventStage returned early) | full-body figure column (exclusion removed, jk4) |
| #modal events / BÁO / TIN / VIỆC / KẾT QUẢ / ĐÊM with who / stage | already full-body (T3) | unchanged, now guarded by the test |
| identity card (kpid) | full-body figure already (kpIdFig) | unchanged |

## Not converted (flagged for the owner / coordinator)
- "Nhập cung" and the other new-life scene panels (`.dlg.kpsc`, modal items with `faces:[…]`): bottom-docked scene caption over a full-screen painted background with a row of 3 small portraits. A figure column does not fit that docked strip (tried: broke the layout, reverted). Needs an owner decision (figures standing on the scene background?).
- Person card modal (pcard, `.pcm`) and the week book person page: separate approved components (OD:L832), not event pop-ups.
- Spotlight coach steps use the shorter `coach` height (a full-height card would cover the spotlighted target). One size for every step. Owner to confirm.
- Narrow (<600 px): figure column stays at the LEFT (the #modal template stacks it on top there).

## Tests
- `dev/test/popup-fullbody.js` (new): every PEND person event, person info / rule / news / result / night / intel / evidence, the tutorial pages + steps, a tip. FAILS: small framed portrait, missing figure column, figure not left of the picture, buttons not below, pages / steps of one event with different frame size, tip size ≠ coach size.
- `dev/test/kit-conform.js`: T4 (small portrait on a person pop-up) now FAILS; new cases info-person / news-person; tutorial pages + steps must be one frame size.

## Files
jpdlg.js (new kit part) · jtut.js (coach + tip use it; own card CSS removed) · jk4.js (info / rule / person exclusion removed) · assemble.py (jpdlg after jk4) · jkitpage.js (§50.2 sample) · KIT.md (§8 / 8.2 T4 retired, T6, §32.2 line, §50.2).

## Test results (final build)
| viewport | popup-fullbody.js | note |
|---|---|---|
| Fold 755x1000@2 | 33 OK · 3 WARN(figure measure pending, CDN) · 0 FAIL | |
| iPad 1180x820@2 | 33 OK · 3 WARN · 0 FAIL | |
| iPad Pro 1366x1024@2 | 33 OK · 3 WARN · 0 FAIL | |
| 844x390 | 35 OK · 1 WARN · 0 FAIL | tutorial pages 560x358 x4 identical; steps 560x300 x4 identical |
| 412x1058, 390x844 | SKIPPED | portrait phones show the game's own "Xoay ngang điện thoại" overlay (not a supported screen; the existing #modal template is garbled there too, pre-existing) |
kit-conform.js 755x1000: 73 CONFORMS, 0 MIXED/CUSTOM, no floats, tutorial pages + steps one size.
WARN = a figure still hidden because kitFigBody (CDN CORS measure) had not finished after 25 s in a long sequence (PEND:shop passes alone) — pre-existing latent flake in kitDpFit, not touched here.
Interact tutorial step with no room (phone landscape): the card keeps its frame size and lies at the free edge (the old code narrowed the width = a second size).

## Round 2 (reviewer popup-fullbody-r1 FAIL list, branch review/popup-fullbody-r2 on top of r1 0b1d3096)
1. kept (reviewer's jkpc fix).
2. default banner per kind (kitDefaultBanner, KIT §50.3) — person ĐIỀU / LUẬT / BÁO / KẾT QUẢ / ĐÊM / intel now have the picture right top.
3. tests hardened (popup-fullbody.js): FAIL no banner / figure < 150 px visible / frame size differs across kinds; new cases contest, cold-palace, contest-round (kit-conform MISSING place:* have no `who`, so no portrait form; contest + cold-palace (`who`) covered here). Coach size dropped: tutorial steps + tip = the std frame (same size as every pop-up).
Extra bug found by the new check: evidence / intel panel (person, no options): figure column was the whole scroll height, figure 1100 px below the fold → column = visible #mb height, sticky.

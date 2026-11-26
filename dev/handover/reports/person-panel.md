# person-panel — report (PERSON-PANEL UI worker, look-only; owner bug 26/11 ~19:25Z via MAIN 161)
depth 1 (worker) · START_CTX ~15 %.
PRIORITY #1 CHECK: OD 117 | ledger 5 | main 15 (jk2b kitPcWide, jk4 KIT §6.4 kitPcFitPortrait, j15 pcard) | review/* 10 (person-leftcol, dialog-person, pcard-facts) | claims: kit part = KK44 (session_01Rc5AsLVfGh4xhhKhZGXEWJ).
NOTHING lands. Branches (from LIVE f573dc94, source only, rebuild with `bash dev/site/build_site.sh`): review/person-panel-o1, -a, -b, -c.

## 1. Family list (who shows a person, which kit frame; checked in code)
| screen | kit part | files |
|---|---|---|
| Hậu cung Chí tôn / Phi tần / Nam nhân / Cung nhân | `pcard` + `pcPort` tall frame (550x1037, KIT §4.1) | jhc, j15, j22, j42, jstaff |
| Hoàng tự (kids, kế vị, hòa thân, nuôi) | `pcard` + `pcPort` | j15, jht, j54, jkidlife |
| Việc nhờ (asker + history) | `pcard` + `pcPort` | j72 |
| Kỳ tuyển tú candidates | `pcard` + `pcPort` | jkc, jkc2 |
| Person dialog (Có người đến, visits, faction invite) | jksize ksz3 frame S/M/L/XL + `pcPort` | jksize, jpdlg |
| face strip (pager) | `mdH` round avatar sm | j15 |
| Sổ ghi | `mdH` round xs 26 px + text, no tall frame | j6 |
All pcard families go through ONE function: fix in pcard = fixes the group. The person dialog (jksize) is a separate path and needs the same small-frame rule later.

## 2. Where the width/height come from
`kitPcWide` (jk2b) sets `--kpcw` = clamp(150, 240, 0.36 x panel width) and `--kpcl`; `kitPcFitPortrait` (jk4, KIT §6.4) keeps it ("never shrink", OD 18/11) and floors at 120. Card height `--kpcmax` is fixed by kitPcSize; iPad card is only ~420 px tall (HUD + tabs + pager strip eat the rest), Fold ~570 px.

## 3. Option 1 (frame smaller, layout kept) — review/person-panel-o1 @ one constant `KPC_W=[100,138,.21,150]` in jk2b + jk4
Avatar share of screen height 44 % -> 26 % (Fold), 35 % -> 28 % (iPad). Right column wider (461 -> 551 px Fold). But buttons still cut on iPad (1/5 whole), Fold 2/5; name wraps to 2 lines. => not enough alone.

## 4. Options A / B / C (mock builds, `dev/build/jpp.js`, constant PP_OPT, last module in assemble.py)
- A (review/person-panel-a): round head-and-shoulders medallion 72 px (crop of the SAME kit frame) beside name; ALL info rows moved under it (left column full height); right column = act-group tabs + compact act buttons only.
- B (review/person-panel-b): slim portrait strip 104 px + 3 tabs in the right column (Thông tin · Giao tình · Việc; reuse `.pctabs .pct`); nothing scrolls.
- C (review/person-panel-c): no tall frame on the card: medallion 58 px + name + «Xem dáng» (opens a kit modal with the full frame + wear + relations + facts); compact 2-column facts; act-group tabs + compact act buttons docked at the bottom, always whole.
- Shared new kit request: COMPACT ACT BUTTON (title + odds + Tốn + Được, 1–2 lines; Cần line only on disabled ones; (i) opens kitActZoom full card). Line 2 is single-line with ellipsis (full text in (i)); this bends the "no truncation" rule — KK44 must decide.

## 5. Measured (4 people each: Hoàng thượng, Thái hậu, a cung nhân, a phi tần; DPR 1; whole button = inside every clipping scroller)
| | avatar/screen h | whole buttons | cut | cards still scrolling |
|---|---|---|---|---|
| before Fold | 43 % | 9/14 | 1 | 2/4 |
| before iPad | 34 % | 5/13 | 2 | 2/4 |
| opt1 Fold | 26 % | 8/13 | 2 | 3/4 |
| opt1 iPad | 28 % | 5/13 | 2 | 3/4 |
| A Fold | 7 % | 13/13 | 0 | 2/4 |
| A iPad | 9 % | 14/14 | 0 | 2/4 |
| B Fold | 20 % | 13/13 | 0 | 0/4 |
| B iPad | 24 % | 14/14 | 0 | 0/4 |
| C Fold | 6 % | 13/13 | 0 | 0/4 |
| C iPad | 7 % | 14/14 | 0 | 0/4 |
Raw: `*-measure.json` in the scratch dir (not committed). Stills: https://ctm-img.victoria-tntt.workers.dev/img/_review/person-panel/<TRUOC|PA1|PA-A|PA-B|PA-C>-<court0|court1|staff0|rv0>.jpg (Fold + iPad side by side). PDF: dev/handover/reports/person-panel/person-panel.pdf (14 pages A5, looked at every page).

## 6. Recommendation
B (only one with 0 scroll for all 4 people on both devices; keeps a small tall portrait; two-way relation stays in tab «Giao tình»; cost = one tap). A if she wants everything visible at once (cost: long-fact people still scroll the left box). C only if she accepts hiding the tall figure + relation line from the main card. Option 1 alone fails (iPad buttons).

## 7. Honest limits
- Mock builds: no clean-up of every card state (stranger silhouette, kid cards, Việc nhờ cards not shot; Hộp thoại người not touched). Ellipsis on compact line 2. Name wraps 2 lines in B. Medal crop of the figure is automatic (some heads sit high).
- Conflicts with OD 18/11 "never shrink the figure" and the "no truncation" kit rule: needs her word + KK44.
- Harness note: first shots were polluted by the random «Luân hồi» roulette overlay; fixed (kitRoulette stub) and ALL final shots retaken.
~90 % this task done (look-only) / ~0 % playable (nothing landed).

## Addendum — option D (MAIN 161 request: iPad full width, 2-column acts, name never breaks)
review/person-panel-d: A + on iPad landscape the stage (scene + Ân sủng box) is hidden while a person card is open, card spans the full width, compact acts in 2 columns; `.pcname` nowrap in all options (a/b/c rebuilt too). Measured (4 people): Fold avatar 7 %, whole buttons 14/14, cards still scrolling 2/4 (left box of long-fact people); iPad 9 %, 14/14, 2/4. Cost: Ân sủng box not visible while card open. Stills PA-D-*.jpg on the CDN folder; PDF updated (16 pages).

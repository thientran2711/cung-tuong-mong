# menu-panel report (sonnet worker for MAIN CHÍNH 85)
PRIORITY #1 CHECK: OD:L1217 rollover / owner 21/11 mark #37 | main: j74 title panels (good), j79 kpIdLay sets --kpw inline, jkpc compact | review/* none | claims: CLAIMS row menu-panel (this session)

## Root cause
In game, the Nhập cung identity card (j79 kpIdLay) sets `--kpw:307px` inline on `#modal` (figure-left layout). Nothing cleared it, so ☰ → Chọn sổ / Sổ luân hồi / Thiết lập opened at 307 px (words one per line, «Kéo xuống»). The ☰ home panel was also turned into an event frame (`kszlive`, 380 px).
## Fix (kit part, one place each)
- j79.js kpBuild wrapper: every non-identity panel clears inline `--kpw` and `kpside`.
- jkpc.js: KIT MENU PANEL rule, `.modal.kptitle.kpscene` locks `--kpw` and the bottom position (`!important`).
- jksize.js kitFrameLive3: the ☰ menu (`.kptitle` / `.kpmenu` / `.kpt-mount`) is never an event frame.
- KIT.md §8.1: MENU PANEL entry.
## Whole group, before (origin/main) → after, panel width×height px, in game after a new life
| viewport | home | Chọn sổ | Sổ luân hồi | Thiết lập |
|---|---|---|---|---|
| 755x1000 | 380x419 → 560x368 | 307x574 → 560x471 | 307x574 → 560x574 | 307x574 → 560x574 |
| 390x844 | 358x447 → 362x382 | 359x564 → 362x564 | 359 → 362 | 359 → 362 |
| 412x1058 | 380x453 → 384x382 | 379 → 384 | 379 → 384 | 379 → 384 |
| 1180x820 | 560x516 → 560x368 | 560x471 → same | same | same |
Title-screen (fresh) panels are unchanged and equal to the in-game ones.
Bảng vàng is a full-screen board (not a menu panel) and is untouched; its popups follow the menu width.
Shots (looked): Fold 755x1000, iPad 1180x820, 390x844 — wide bottom panel, rows on one line.
<<<<<<< HEAD

## Addendum (owner ~03:30Z, MAIN 85): Thiết lập scroll, run-together label, cramped root
- `.kbtn>small{display:block}` (kit-wide): «Xem lại lời dặn» / «Game này chơi gì» no longer run together (the second line was block only inside `.kpmenu`; whole group = every `.kbtn small`).
- Menu frame height cap `--kph` = min(100dvh-32, 94 kvh, 780): Thiết lập and Sổ luân hồi now fit with no scroll on Fold 755x1000 and iPad 1180x820 (before: cap 574 → «Kéo xuống»). Phones 390/412 still scroll (content 780+ px).
- `.kpmenu` fills the frame width (centred flex column had shrunk it to 261 px; now 534): root buttons full / half width.
=======
>>>>>>> 60c0578d (B ROOT-4 claim map-places mem fix)

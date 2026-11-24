# flight-ui (review/flight-ui ee91fa9b, SMALL = UI/text) — owner flight bugs 24/11 items 3, 4, 6, 7, 8
PRIORITY #1 CHECK: OD 0/0/1 | main: Tin báo popup, Tuần lục seal §28.8d, kitReward reveal | review/* kit-rewardplate deab3d84 (title plate only, not touched), kit-daytitle 3424b927 | claims none.
START_CTX ~ low; depth not read.

## (3) red strip at the bottom
Cause (best evidence, cannot test on device): `theme-color` meta + manifest `theme_color` = #8a2a1e (red) tint the system bar under the page on every screen (the strip is on f3, f4, f7, f9 alike, not only the day card). Fix: both = paper #f6efe2 (`dev/site/build_site.sh`, `manifest.webmanifest`). The host (rot.js) already paints paper under the frame. NEEDS her phone to confirm (reinstall / reload PWA to refresh the manifest).

## (4) reward reveal bigger
`dev/build/jkrev.js` (ONE reveal part, kitGain + each kitReward item): picture cap 260 → 340 px / 36 → 46 % of page height, glow bigger, name 1.18 → 1.5 rem, sub 0.8 → 1 rem, from 0.76 → 0.9 rem. Fold + iPad shots looked (bigger, fits, button visible).

## (6) wrong person's seal — ROOT CAUSE FOUND
Two leaks, both seals painted ABOVE the open book:
1. the ROOM figure's seal (her own #mefig seal / the one beside a person on the stage) lives in the game shell with z-index 7 and floated over the open book;
2. the seal of the page BESIDE it in the stack (each page's seal is a z-7 child of the page, pages were not stacking contexts) painted over the current page.
Fix (jfigseal.js CSS): `body.kbk-open img.kfseal:not(.kbk-person>img.kfseal){visibility:hidden}` + `body.kbk-open .kbk-pg{isolation:isolate}`. Checked by elementFromPoint on Fold + iPad: the top seal at the slot is the page's own person (Hoàng thượng page = emo-m-binh, hers = emo-binh). The seal art itself is right (sheet checked: women / m- / mo- sets).
WHY THE SEAL IS ON THE RIGHT: KIT §28.8d + KIT 34.6 r5 (owner 18/11 ~03:35Z «figure runs under the ? chip») = ONE fixed slot, right end of the name row of the text column, same on every page (jfigseal.js book branch). Not moved.

## (7) figure scale on Tuần lục pages (measured, NO change)
Fold 755x1000 (page box, px in frame): all figures stand on the same floor line (feet y=740). Heights: Hoàng hậu 590 (top 150), Tổng lược/her 567 (top 174), Hoàng thượng 574 (top 167), eunuchs 563–569 (top 172–177). iPad 1180x820: feet 707–710 for all; heights hậu/Thái hậu 575 (top 132–135), her 568 (139), Hoàng thượng 568 (143), Tần 568 (143).
Reading: feet are identical, so he does not stand lower; his head top is 17 px (Fold) / ~10 px (iPad) lower than the crowned Hoàng hậu because the standard height is the phượng crown (kfr 0.935 hậu vs 1.0 emperor). Shots with measuring lines: scratch (not in git). MAIN to tell her: «chân đứng cùng một vạch; đầu ngài thấp hơn mũ phượng hoàng hậu ~6 %, chưa sửa, chờ sếp nói».

## (8) Tin báo one news = one row
jnotice.js: `kitKnowFlush` keeps `items` (one per fact), the panel renders ONE `ul.kbl` row per notice / per fact (kit bullet part 31.14), no « · » join. 7 facts → 7 rows (checked, `.kntl li`). Family scan: other `join(" · ")` sites are chips / effect lines, not news dialogs (list in git grep; none reported by her).

## tests
know-notice.js (fold) ok, errs 0. book-person.js not run (server start was denied by the sandbox).
## KIT.md: 28.8d line added. Not committed: index.html / sw.js (lander rebuilds).

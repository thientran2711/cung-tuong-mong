# KIT-AP01 report (Kit Keeper #8) — 23/11
PRIORITY #1 CHECK ('AP01 frame overlay'): GAP_LIST_v5 AP01 | review/gapart1 f478b213 (9 frames on CDN, unwired, KIT REQUEST) | main: KPO_ART={} placeholder only (jpres.js) | claims none.
START_CTX ~5 %.

Branch **review/kit-ap01-frame** (off origin/main ca801185) — sha **57061678fbda35b6fbbba8ce32417b722cecb2bd**. Touches kit + AP01 wiring only; no gapart1 merge needed (keys are CDN img/kit/kpo-*.webp).

## What changed
- dev/build/jpres.js: `KPO_ART` filled (tt dtq muoi cn nc td ch thd srv, cnv -> srv); kpresShow also sets `--kpo-img`; ONE CSS rule in #kpres-css: `.dlg[data-kpres-story=main][data-kpres-art]::after` = 9-slice border-image (slice 110, width 26px) over the card, pointer-events none, + card padding 26px so text stays inside. Cards without a frame keep the old double rule.
- dev/kit/KIT.md: placeholder paragraph replaced (canon overwrite) by the ORIGIN FRAME kit part.
- dev/build/jkitpage.js: kit sample §AP01 (9 buttons open a sample main-story card per origin) — built, not opened by me.
- Site rebuilt (index.html, sw.js, assets.json).

## Shots (looked at; scratch only, not in git)
Main-story card, Fold 755x1000@2 and iPad 1180x820@2: dtq, nc, tt, cn, td, thd, muoi, ch seen (consistent layout, colour/ornament per origin, text inside frame, no overlap except the pre-existing TRẦN NỮ seal touching the top-right ornament). srv not captured separately (harness reused previous origin) — same file mechanism. Not all 9 x 2 devices looked 3x.

## Tests
quickcheck PASS on 57061678: open 1656 ms, old save ok, perf render 241/241, tab 489/447, buổi 1174/1105, core gates PASS. 0 page errors in shots.

## Open
Seal vs top-right ornament overlap (minor, pre-existing element). Next request from MAIN: KIT-MGBG (review/kit-mg-backdrop) — not started.

## REVIEW (small kit reviewer, 23/11) — **FAIL** @57061678fbda35b6fbbba8ce32417b722cecb2bd
PRIORITY #1 CHECK: GAP_LIST_v5 AP01 | main: KPO_ART={} before | review/kit-ap01-frame 57061678 (only branch touching it) | claims KIT KEEPER #8. START_CTX ~5 %.
Merge: branch is a direct child of current origin/main ca801185 → merges clean (fast-forwardable).
Laws checked: 9 KIT FIRST ok (one shared rule in jpres.js, one KPO_ART entry per origin, no per-screen variant; kit sample §AP01 + KIT.md canon-overwritten); 7 wording ok (no new player text; sample strings are kit-page only); 12 two devices — see below.
Looked at (Fold 755x1000@2 and iPad 1180x820@2, all 9 origins tt dtq muoi cn nc td ch thd srv incl. srv, short card + long card): frames load (9 x 200 on CDN), art + `--kpo-img` set on every origin, same geometry for all (dlg padding 26px, no horizontal overflow, 0 page errors); short cards: text/seal/✕ inside frame, 9 frames distinct and consistent. Only 404s seen are face-man-*.webp / nvp-ha-sang (unrelated, not this diff).
### FAIL reasons
1. **Frame covers the action buttons on tall/long cards (iPad landscape, also Fold).** Measured on iPad 1180x820, dtq/tt, long main-story card (7 paragraphs + 2 choice buttons): buttons bottom = 697 = dialog bottom 697, i.e. fully under the 26 px bottom border (the frame `::after` has z-index 5). Same card WITHOUT KPO_ART: buttons bottom 677, dialog bottom 690 (13 px clear). So the claimed "card padding keeps text/buttons inside" does not hold: the `padding:26px!important` is not honoured by the inner body/footer layout that sizes itself to the viewport; the bottom ornament sits over the button row (only the top ~20 px of each button is visible in iPad shot ipad-dtq-long). On Fold the last text line is cut by the bottom border the same way. Real main-story cards are often this long. Fix: make the dialog's inner scroller/footer respect the 26 px inset (e.g. shrink max-height / add bottom margin to the body+foot) and re-shoot a long card with choice buttons on both devices.
2. Seal «TRẦN NỮ» (top right) overlaps the frame's top-right ornament in every origin and the top border sits over the title bar edge (keeper noted; pre-existing element but now collides with the new part) — move the seal inside the inset or hide it while the frame is on.
3. Evidence gap: keeper's report says srv/9 x 2 not all looked; I did look at all 9 on both — srv itself is fine.
### Not done
quickcheck on this sha was started but had not finished when this verdict was written (keeper reports PASS 1656 ms / old save ok); not re-verified. Re-review after fix needs it + the long-card shots.

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

## FIX 1 (keeper, 23/11) — sha **7cd4d5fe9db93ea5493ab2bfd9d6de70fad33bc4** (answers the REVIEW FAIL)
1. Frame no longer covers content: dropped the 26px padding (the kit's frame-size/fit JS ignored it); the frame is now `border-image-outset:14px` (14px OUTSIDE the card, only 10px inside). The card's layout/fit is untouched, so buttons/last line are never under the border (reviewer measured 13px clear without frame >= 10px).
2. TRẦN NỮ seal: `.kseal-ev` top forced to 14px (inside the frame's safe area); no collision on any origin.
3. KIT.md ORIGIN FRAME paragraph updated in place.
Looked at: all 9 origins x short + long synthetic card (2 choice buttons) x Fold 755x1000 + iPad 1180x820 (contact sheets): frame visible all round, seal clear of ornament, text not cut, long cards scroll with the kit's «Kéo xuống» cue. Limit: my synthetic long card is not a real main-story card; I did not measure button-to-bottom clearance on a real long card (reviewer's measure should be repeated).
quickcheck PASS on 7cd4d5fe: open 1955 ms, old save ok, core gates PASS, perf render 287/262, tab 476/501, buổi 1380/1358.

## REVIEW 2 (small kit reviewer, 23/11) — **PASS** f38a40b1454b6c3e670a18b99b22be4ef3eba7de
Reviewed keeper FIX 1 review/kit-ap01-frame @7cd4d5fe9db93ea5493ab2bfd9d6de70fad33bc4. origin/main had moved to a689bb80: source merged clean; only generated index.html/sw.js/assets.json conflicted → took main's, rebuilt with dev/site/build_site.sh. Merge commit **f38a40b1** (descends from origin/main a689bb80), pushed as review/kit-ap01-frame-r7. Fast-forward main to it (site already rebuilt in the commit).
PRIORITY #1 CHECK: unchanged from review 1 (AP01 only, no other branch).
1. Buttons / last line vs frame: iPad 1180x820, all 9 origins, long card (7 paragraphs + 2 choice buttons): buttons + last line end 3 px above the frame band (band now 24-14 = 10 px inside the card) — clear (was covered by 26 px before). Frame outset 14 px: dialog-to-screen margin >= 83 px on every side on Fold/iPad, so not clipped by screen edge, no overlap with neighbours.
2. Seal: 15 px below card top, clear of the top-right ornament on all 9 (looked at Fold + iPad short sheets); ✕ and seal do not collide.
3. Regression: all 9 origins (tt dtq muoi cn nc td ch thd srv) x short+long x Fold 755x1000@2 + iPad 1180x820@2 looked at; identical geometry per origin, no horizontal overflow, 0 page errors (only unrelated face-man-*/nvp-ha-sang 404s on CDN).
4. quickcheck on f38a40b1 finished: PASS 253 s, open 1809 ms, old save ok, render 245/247, tab 519/500, buổi 1238/1279, core gates PASS.
Note (not a defect of this part): on Fold, an artificially over-long card (7 paragraphs) clips its button row at the dialog bottom exactly the same WITHOUT the frame (baseline layout, verified by comparing KPO_ART cleared) — not caused by AP01; real cards should be checked by the card-length work, not this kit part.
Law 9 kit-first ok, law 12 two devices ok, law 7 no new player text.

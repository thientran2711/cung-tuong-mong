# fig-cutout-root — Luân hồi / "Thân phận kiếp này" large figure: root cause (code vs image)

Worker session_01UV1SziJ9niRHRJg3rL83SA, 16/11, for MAIN s23. Branch review/fig-cutout-code (code fix) — base origin/main 95282e69.
Owner words: OD 16/11 ~20:35Z–20:40Z (dark streak on the neck, warped/soft face, see-through sleeve, huge hoa điền, wrong hand).
Owner photos (refs/owner-luanhoi-*.jpg) are NOT on the handover branch in git (shots never in git), so the exact owner files could
not be matched by eye; the scan covers the whole group instead.

## 1. What the screen shows and how (j79 kpIdFig / kpIdLay)
- `#modal > img.kidfig2` = `figFor(S)` (player's look; face picker pool = 32 consorts c01–c32 + 52 maids m01–m52, tier files `-t<N>`/`-tm1`).
- Size: one body tier, ~689 CSS px tall at iPad 1180x820 (DPR 2 → ~1380 device px); `object-fit:fill` with measured aspect (no stretch).
- HD: jfighd `kitFigHD` adds srcset `900 file / img/hd twin`; only 1598 of 8770 fig files have an HD twin.
- Filter: `url(#kfa) drop-shadow(0 6px 18px #0006)`. No CSS mask, no blend, no backdrop-filter on the figure, no runtime keying.
- Hoa điền: NO code overlay anywhere (grep: only the item name in j92). It is painted into the figure/portrait files.

## 2. Verdict per defect (proof: dev/test/fig-cutout-cmp.js, same figure rendered in-game at DPR 2 with filter = game / none / shadow only / #kfa only)
| Defect (owner) | Cause | Proof |
|---|---|---|
| Grey band along robe edges, dark streak at neck/chin | BOTH: image has wide feathered alpha (8–12 px) + translucent smoke/veil residue; CODE's drop-shadow shows THROUGH those translucent pixels and turns them grey/dark | `none` and `#kfa only` = no grey band; `shadow only` = grey band + dark neck smoke (cmp crops c09-ty8-a26, c08-t8-a36, m37-t3-a18) |
| See-through sleeve / background between arm, sleeve and head | IMAGE: sleeves keyed half-transparent (alpha ~0.5–0.75), enclosed gaps left as smoke | raw alpha of fig-player-look1-t1-* (translucent interior 1447–2340 /10k px, worst of all 8770) |
| Soft face | IMAGE (resolution): 7166 of 8770 fig files have no HD twin → 900 px file drawn ~1.5x on iPad. Consort t-files WITH a twin load it (checked: currentSrc = img/hd/…) | probe at 1180x820@2 |
| Huge hoa điền | IMAGE (painted). C9 huadian-size never finished: review/huadian-size-r3 NOT merged (reviewer FAIL list), and C9 never processed the 2688 `-ty` (trung y) files (0 lines in log_por.jsonl) | git merge-base, log_por.jsonl |
| Left arm ends in a right hand | IMAGE (anatomy) | needs the owner photo to name the file |

Code-only share: the grey/dark band and the neck streak (drop-shadow through translucent alpha). Everything else is in the files.

## 3. Code fix (review/fig-cutout-code) — kit level, whole group
1. `dev/build/jfighd.js` `#kfa` (first filter in EVERY people picture: stage, dialogs, kesimg, book, pod, identity card):
   alpha slope 1.07/-0.065 → **3/-1.2** (alpha <0.40 → 0, >0.73 → 1). Feathered edges become a ~2 px clean edge, smoke/veil residue
   disappears, so no shadow shows through. Opaque paint untouched; c25/c29 (clean files) look identical; never above native size.
2. `dev/build/j79.js` kpIdLay: calls `kitFigHD(im)` after it sets the figure width (stale `sizes` from an earlier layout could keep the
   900 px file when an HD twin exists).
Tests: QUICKCHECK PASS e2ff340e (Fold open 0 errors, old save loads + plays a buổi, perf median render 344/341 ms, tab 354/363, buổi
1282/1305). coop-invite-ux: 1 FAIL "step 1 done after copy" — the same FAIL on base 95282e69 (headless clipboard), not this change.
Before/after (looked at): CDN img/_review/fig-cutout-code/ beforeafter-1180x820.jpg, beforeafter-755x1000.jpg, modes-*.jpg, raw-*.jpg.

Risks / not verifiable here: (a) iPad Safari is WebKit; only Chromium is installed. If WebKit rasterises `filter:url(#…)` at 1x on
Retina, every figure would look soft on iPad whatever the file: please test one figure on the owner's iPad with and without url(#kfa).
(b) Hard alpha can thin very fine hair wisps/sheer gauze painted below alpha 0.4 — none seen on the 6 figures checked.

## 4. IMAGE work for Foreman C (review/fig-cutout-clean) — do NOT repaint here
Scan: `dev/test/fig-cutout-scan.py <names.txt> <out.tsv>` (dev/figwork/cutcheck.py score + dark fringe + translucent interior +
enclosed holes + native px + HD twin), all 8770 `img/fig-*.webp` on the CDN (6 decode errors). Full list (worst first):
`dev/handover/reports/fig-cutout-defects.tsv` (2441 files with any defect).
| Defect (threshold) | files | by role |
|---|---|---|
| cutcheck residue ≥1 (≥3 clearly visible) | 1902 (469) | consort 1018, maid 602, kid 105, consort/ty 74, eunuch 42, man 15, player 15, thaihau 10, official 8 |
| translucent interior ≥20 /10k px | 473 | consort 217, consort/ty 132, eunuch 36, kid 30, maid 28, man 9, official 7, player 5 |
| dark fringe ≥5 /10k px | 476 | maid/ty 359, consort/ty 116 |
| no HD twin (soft when drawn big) | 7166 | maid 3168, maid/ty 1662, consort/ty 1024, consort 497, eunuch 361, kid 216, man 132, others 106 |
Priority 1 (the owner's own picture on this screen): fig-player-look1-t1-a18/a26/a36/a51 + t3-a18 (scores 29–98, sleeves half
transparent), then the face-picker pool tiers (1409 defect files match `fig-(consort-cNN|maid-mNN)-t*`).
Hoa điền: finish C9 (R3 FAIL list in dev/handover/reports/review-huadian-size-r3.md) and add the 2688 `-ty` files; one size rule
relative to face width. Sheets: img/_review/fig-cutout-code/huadian-t3.jpg, huadian-ty2.jpg (t3/ty2 a18 marks look small; the owner's
green-robe "big teardrop" file is not in these — need her photo or the file name to pin it).
Anatomy: column not filled automatically; the beige look-back figure with a right hand on the left arm needs the owner photo to name;
C's re-cut worker should add a visual L/R-hand / finger / arm-continuity column while re-cutting each file.

## 5. Other finding (not this task)
Fold 755x1000: the identity card's figure column is only ~90 px wide, so the big figure shows ~176 px tall in the bottom-left corner
(same on live main) — layout issue for the kit keeper.

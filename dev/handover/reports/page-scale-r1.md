# page-scale-r1 — reviewer report (BIG, whole-game layout) — 11/16/2026

VERDICT: **PASS** (sha in the CLAIMS row / last commit of `review/page-scale-r1`; ancestor = origin/main c19b25ebf). START_CTX ~3 % (1M window); no rollover.

## What I reviewed / built
- `review/page-scale` @ 1f4912486 had merged the OLD tutrang-layout 57d698fe8. Re-merged the CURRENT `review/tutrang-layout` @ c39139e51 (no textual conflict
  in kitInvFit; only game-feel.js test waits + generated files) and current `origin/main` c19b25ebf; site rebuilt (build_site.sh).
- Reviewer fixes (kit only, whole group):
  1. **Spread bar 3 px taller after main's Q6 room button** (jk4 `.kv2 .khd2>#k3room`, 36 px in a 32.7 px row) → iPad right page 582x620 vs Fold 582x623, every tab FAILED
     page-scale. Fix: that button = 32 px (the free 2nd row beside her portrait). Right page back to 582x623 = one page.
  2. **Tư trang bag stuck at its 2 minimum rows** (both devices, any short page + 1 pet, e.g. a 3-line time block): the wear-column limit was a 14 px guess
     (column ended 1–2 px past the content bottom → page "scrolls" → bag never fills), and `.kinvtight` flip-flopped between fits (sized with titles hidden,
     then un-tightened). Fix (jinv kitInvFit): exact limit (panel content bottom minus every bottom margin/padding between), always size with titles shown,
     tight hides both column titles + pet spare lines, ResizeObserver also watches the column (late pet picture/fonts).
  3. **"Xa xỉ 33" tag cut to "a xỉ 33" on 40 px column slots** (and covered the picture) → column slots (`.keq.keqv`, kitEquipSlots col:true: Tư trang,
     Chọn y phục, pet box) hide the tag; the bag cell, tap panel and sum line still show it. KIT §Tư trang note updated.

## Checks (after fixes)
| check | result |
|---|---|
| page-scale.js full run (36 panels) | 33 PASS + Dư đồ SKIP; `act` + `act/Giao thiệp` FAIL in the full run only = different act CONTENT (12/13 vs 19/22 acts, other maid name), boxes 582x623 = and grids equal; `TABS=act` alone: 9/9 PASS (twice). Seeded-state flake of the test, not layout. |
| own scan, Tư trang 0/1/3 pets, Túi đồ + Thú cưng, Fold 755x1000@2 vs iPad 1180x820@2 | bag **7x6 = 7x6**, wear slot 40–41 px both, page 597/597 no scroll, no h-overflow, 0 errors, real item + pet pictures |
| tab-pairs 1180x820 / 755x1000 | 56 pairs each · 0 mismatches · 0 errors |
| design-scale | pageCanvas, spread, rotated, sameBox, noErrors true; rightPageMatch 99.1 %, leftPageMatch 100 %; oneAtATime false in the loaded run, `SIZES=fold` alone room→page→room (tap blocked under load) |
| kit-conform 755x1000 / 1180x820 | 87/15 and 86/17 CONFORMS/MISSING, 0 MIXED/CUSTOM; MISSING = place:* / contest / cold-palace (same kinds as before) |
| old save (main build) → this build (game-feel PH=4) | ok, inv 8; offline pixi + overlay ok, 0 errors |
| perf fold / ipadAir | 69.6 / 69.8 MB first load, title 47.8 / 47.4 s, playable 7.7 / 11.9 s, warm 9.6 MB — same as main (over-budget items identical to main per the page-scale report) |
| media-check | 0 breakpoints, 0 vh sizes |

Sheets: `dev/handover/reports/page-scale-r1/sheet-tutrang.jpg` (BEFORE main | AFTER, Fold | iPad, Tư trang 1 pet),
`sheet-tabs.jpg` (every tab + 2 pop-ups: Fold page | iPad right page).

## Notes for the coordinator (not blocking)
- Wear slots are 40 px on a 582x597 page on BOTH devices (KIT floor) — readable pictures + names, but the pet lines ("0 tháng tuổi", effect chip) are tiny.
  Bigger slots need a different column (e.g. 2 slots wide, bag 6 columns) = owner/kit-keeper decision.
- page-scale.js should copy state per panel render more strictly (act list differs between the two passes in long runs).

# fold-popw report (review/fold-popw, sha ffc088f7)  —  SẴN SÀNG KIỂM

START_CTX ~6 %. Rollover not needed.

## 1. Fold one-page grid collapse — fixed (kit, jk3)
Root cause: `#popw.j59dock{grid-area:panel}` (j59) but the k3ph grid has only hud/stage/bar -> implicit tracks. Fix: `html body .game#game.k3ph.k3pop>#popw{grid-area:stage!important}` (from two-way-acts b74af30c2, same line). KIT §31.7 note + rule (docked panels use only hud/stage/bar).
Whole group: runtime orphan scan (every element whose grid-area is missing in its grid parent) over home + all 20 tabs + card open at Fold 755x1000. Before: #popw (visible, the bug). After: only hidden elements remain (#emp, #hud2 in the top bar, #stage on the map tab (display none)). j59 is the only module that docks into the game grid.
Geometry (Fold): top bar 329x129 -> 582x129; card 241x579 -> 582x591 (page box); iPad 1180x820 unchanged (two-page spread, popw at right page 582x620).

## 2. "✕ overlaps the scrolled content" — fixed in the kit (jk4)
Cause: `.kit-x.kxabs` (cards WITHOUT a `.kph` header: person / Hoàng thượng card `.kp-person`, #ov kpanel) was absolutely placed over the dialog's content. Cards with `.kph` (event dialogs with options) were already clean (hit-test while list scrolls 30/60/100 %).
Fix: `#modal .dlg:has(>.kit-x.kxabs),#ov .kpanel:has(>.kit-x.kxabs){padding-top:48px!important}` — reserved strip; one rule for every dialog. KIT §32.10 RULE added.
Hit-test table (✕ over text/option/figure at 5 points, 3 scroll positions), Fold + iPad:
| card | before | after |
|---|---|---|
| long-option dialog with .kph (who) | clean | clean |
| person card with options (pcm) | overlap (text <P>, all scroll positions) | clean |
| self card (showSelf) | clean | clean |
| Hoàng thượng card (showEmp) | overlap (H5 at mid scroll; ✕ over the card frame) | clean |
Visible side effect: a 48 px empty strip above the content of headerless cards (viewed, looks tidy).

## 3. Tests
- `node dev/test/fold-popw.js <fold|ipadAir> <outdir> <tag>` (new, committed): card geometry, ✕ hit-test, grid orphan scan. 0 page errors both devices.
- kit-conform at 755x1000 and 1180x820: CONFORMS 87, MISSING 16 (cases not reachable in the harness, same at both sizes), no MIXED/CUSTOM, floats none. (Baseline run on a copy of main crashed on load, so no before/after for this scan.)
- Old save: ser()->deser round trip, card opens at 582x591, 0 page errors (CSS-only change; save format untouched).
- media-check (build) passed. Not run: 1366x1024, 1000x755, 844x390 (CSS touches only k3ph grid + headerless-✕ dialogs; the 1180x820 profile is what 1366 and 1000x755 play at via the host).
Shots (viewed): dev/handover/reports/fold-popw/{before,after}-fold-card.jpg, {before,after}-ipadAir-card.jpg, {before,after}-ipadAir-dlg-pcm.jpg, {before,after}-fold-dlg-emp.jpg.

## 4. Notes / caveats
- Built root index.html/sw.js/assets.json rebuilt in the branch commit (build_site.sh). Main not touched.
- Not verified: other #ov kpanel cards with kxabs (no live example reachable); rule applied to them by the same selector.
- two-way-acts b74af30c2 contains the same jk3 line + KIT note: merge will conflict textually on those two lines (identical meaning); keep either.

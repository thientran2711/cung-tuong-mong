# review kit-display-room-r2 — PASS f4abade8
PRIORITY #1 CHECK: OD 17/11 ~21:10Z/21:20Z/21:22Z/22:05Z (Đa Bảo Các, glow, silhouettes, 5 per group) | main 99f3978d (jdisp gated BAL.shelf.ui=0, jshelf per:5) | review/kit-display-room-r2 f4abade8 | claims MAIN s38.
Verdict: **PASS f4abade8** (branch is a pure fast-forward of origin/main 99f3978d; merge-base = main).
Scope: code only (painted cabinet pictures not delivered; picture slots are a stub).

## Checks
- Name: grep of the whole tree (excl. handover docs/rules) finds no "Nơi/Phòng trưng bày" (only the CTM_BI build string quoting a commit). "Đa Bảo Các" in rail icon, view title, NPC title, aria-label, jshelf modal/log/item text, KIT sample. "Trưng bày" left only as the verb on the act button.
- 5 slots per group: perN() = BAL.shelf.per (fixture only: 5); slots "<g>", "<g>~1".. via shelfSlots(); per-group spots across the compartment.
- Grey silhouettes: made in code (filter on the group's existing cut-outs via silKeys/srcOf), no new art. Fold + iPad shots show them.
- Set glow: setMap() reads shelfView items[i].set by it.slot (fixture: e.set); one shared class .kdr-glow (+ reduced-motion off). Note: shelfView on main has no .set yet, so glow lights only once the C-AG set builder feeds it.
- Kit-first: only kitItem / kitItemCard / kitXHTML / kchip; no private chip/row/frame. One-core: no game numbers typed (geometry fractions in KDR_PIC stub only; "5" only in fixture + m.per default).
- Builder flag "placedOf reads 1 piece per group": resolved, placedOf returns [[slot,entry]] over slotsOf(g); put/take go through the real shelfPut/shelfTake (test does it through the UI with BAL.shelf.ui=1 forced in the test only, then back to 0).
- VANPHONG: no %, no new odds words; copy "Đã bày N món", "Đã đủ N món…", "Còn trống", "Vượt phẩm" fine.
- Old save: quickcheck "old save ok" (load ok, plays a buổi, 0 errors).

## Tests
- node dev/test/display-room.js (HOST mode, Fold 755x1000 + iPad Air 1180x820): both PASS, fit/layout/inslot true, hscroll false, cut false, real-API put+take ok, 0 page errors.
- bash dev/tools/quickcheck.sh HEAD --runs 3: PASS · open 1256 ms · old save ok · core gates PASS · time-spill PASS · perf new/live render 160/143, tab 311/295, buổi 844/761 (no real shift: display room is gated off).
- LOOKED at disp-fold.jpg and disp-ipadAir.jpg (kept in scratch, not committed, no CDN upload): iPad 2 cols x 6, 5 slots each, silhouettes + 3 glowing pieces + "Vượt phẩm" chip; Fold 1 col scrolling, nothing cut.

## Non-blocking notes
1. Both shots show a small broken-image icon top-left of the cabinet while cabinet-*.webp is a 404 on the CDN. With the CDN request failing outright (my probe) the img is removed and the plank stub shows (DOM: .kdr-bgi 0, plank display:block), so I read it as a test-harness artefact; re-check when Foreman C's picture lands. Not player-visible while BAL.shelf.ui=0.
2. Fixture-only literal 5 / `m.per||5` default: harmless, could read BAL later.
3. Harness note (for other reviewers): behind this proxy Chromium must be launched with --no-proxy-server to reach the local serveRoot.

Shot scratch: none on CDN (img/_review/kit-display-room-r2 not used, nothing to wipe).
~100% review done.

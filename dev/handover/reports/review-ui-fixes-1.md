# review ui-fixes-1 r1 (sonnet) — PASS 8ff43bbd

PRIORITY #1 CHECK: briefs/s36-review-ui-fixes-1.md | review/ui-fixes-1 7f902a5b | claims ui-fixes-1 MAIN s36.

Merged 7f902a5b onto origin/main 579e8976 as review/ui-fixes-1-r6 (index.html/sw.js conflicts resolved by rebuild). Head **8ff43bbd** (pushed, ancestor = origin/main, holds its own build).

Checks (host mode, CDN art delayed 6 s, cache off; looked at shots myself):
- 1 rail slots: Fold 755x1000 + iPad 1180x820 show shimmer + letter (L / M) while loading, no empty square; icons swap in. PASS
- 2 ksart pictures: Hành sự 21-28 frames show kit shimmer paper + dark label while art loads (Fold, iPad Air, iPad Pro, 412). PASS
- 3 header 412x1058 direct: time block on own row, cells icon+number, nothing under TRẦN NỮ seal, docW == 412. PASS
- 4 petal guard: half-size margin + .mlab covered; 0.5 s refresh; quickcheck perf unchanged (render 174/175, tab 322/395, buổi 945/885, tasks>200ms 12/14).
- Page errors 0 at all sizes; docW == viewport. Quickcheck: open 1696 ms, old save ok, core gates PASS.

FIX made by reviewer (1): jrail.js KIT sample §77 used undefined `x.title`/`x.glyph` inside `.map(([i,t,b])=>…)` -> ReferenceError when the kit page rendered it; now `data-g="${t.charAt(0)}"`, no kld class on the static sample. Site rebuilt (first quickcheck said NOT BUILT only because of this edit; fresh build committed).

Notes (not blocking): KIT.md lines for §77 / §28.17 / §32.12 still to add (worker flagged). 360 px direct still overflows name block (rotate-prompt device, out of scope). Shot at 1366x1024 not retaken (Pro 1180-class host shots used; layout same host canvas).
CDN img/_review/ui-fixes-1/ wiped (9 objects); scratch shots deleted.

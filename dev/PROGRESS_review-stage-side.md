# review/stage-side — progress (session 8 worker)
Owner 16/11: (1) iPad side info = the same ONE narrow vertical column as the phone; (2) top bar must not flip 1-row/2-row on taps;
(3) fixed stage slots 1 → centre, 2 → 1/3·2/3, 3 → 1/4·2/4·3/4 of the free width, more → pages; (4) side column always fully expanded (no Ân sủng fold), no clipped rows.
## Done
- jk3: #kshR is always one column, width from the stage only (24 % of stage, 132–172 px, `k3RW`), border-box plaques, labels/names wrap,
  scrolls inside itself (`.kasx` always, overflow-x hidden → no left/right clipping). Removed the tassel-fix 2-column mode (`.k3c2`) and the
  crowded fold to "Ân sủng ›": Ân sủng always shown in full.
- jk4 kitHdFit: bar form fixed per viewport: < 1280 px wide (≥1000) = always two rows; ≥ 1280 = one row, measured once per viewport size,
  one-way latch to two rows (never flips back). `KHD1_MIN`.
- j59: free width = stage minus the side column ALWAYS (not only when it reaches the heads); k people on a page stand at i/(k+1) of the free
  width; slots per page ≤ people present; when they do not fit at full height everyone scales down together (≥ 0.62, `J59HMIN`) before a
  page drops a slot; j59-fix min slot width kept. `data-j59free` = x0,avail for tests.
- ROOT CAUSE found: jkit `kitFigBody` (and jk3 `topOf`) loaded CDN pictures without `crossOrigin` → tainted canvas → every figure measured
  as its whole image box (cores far too wide) → paging / crowding. Fixed (`im.crossOrigin="anonymous"`; CDN sends ACAO *). Family scan:
  all 6 getImageData users now set crossOrigin (jk2b kitMask, jkpor, jmark, jsl already did).
- Test: dev/test/stage-side.js (5 viewports × 1/2/3/5 people; 1 column, no cut, no figure/tag under the column, tags never overlap,
  slot centres within 3 px of i/(k+1), header never flips on dialog / longer text). Before 12 FAIL / after 0 FAIL of 20.
## Open
- KIT.md (docs branch) §15 / §33.7 wording: side column + fixed slot fractions + header breakpoint — coordinator to record.

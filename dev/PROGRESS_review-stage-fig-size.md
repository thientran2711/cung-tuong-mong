# PROGRESS review/stage-fig-size (worker, 15/11)
Owner: "Sao khung này, khung trái nhân vật to vậy … nếu cắt váy thì cũng ok mà" (dev/handover/refs/owner-stage-fig-huge.jpg) + coordinator follow-ups
(week book wide robe, info-panel portrait, main actor, title portrait, squashed figures, identity figure missing).

## Cause
- Every event dialog with a person runs kitEventStage → kitDpFit (KIT 32.7 / 32.7b / 50). 32.7b sized the column BY the people: full column
  height, column as wide as the painted figure. A wide-robed figure (Thái hậu: robe + sleeves ≈ 0.85 of her height) made the column 45–49 % of
  the dialog (Fold/tablet portrait, which the design canvas shows at 755x1000) and 40–42 % at 1180x820. KIT 32.2 (36 %) was never enforced.
- Week book: jsl kitBookFigClamp let a wider figure run BEHIND the text (.kbk-figover paper panel) — the owner's p.6 Thái hậu shot.
- Late figure list: kitFigOf needs FIGURES.json (CDN, async). A person dialog opened before it lands falls back to the small portrait and stayed
  so; the identity card (kpIdFig) gave up after 6 × 400 ms → no figure.

## Done (kit only)
- jk4 kitDpFit: KIT 32.2a cap + crop (KIT_DP_COL {pct .36, max 264}, KIT_DP_CROP {knee .5, minH .40, minVis .6}); column overflow:clip.
- jkit kitFigBody: width profile wl/wr (21 steps from the painted top).
- jsl kitBookFigClamp: figure stays inside its column on every screen, never scaled, body centred, cut edge with a 24 px fade.
- jk4 kitEventStage: info / rule / person panels keep the small portrait (§8); main actor = first non-player person; her own figure captioned
  rank + name; FIGURES-late retry (re-show the dialog when the list lands).
- jk4: option / act card title portrait zoomed to one text line.
- j79 kpIdFig: silhouette placeholder while loading, retry up to 30 s, one reload on error.
- KIT.md 32.2a + table row + 32.7b note. Tests: dev/test/stage-fig-size.js (dialogs + distortion + identity + info), dev/test/book-figwide.js (+ overText / faceIn, proxy).

## Results: see the final report table (worker report to coordinator).

## Review r1 (session 8 reviewer, review/stage-fig-size-r1)
- Merged origin/main d34b5116a (index.html / sw.js rebuilt).
- FOUND: kitFigBody (jkit) and jk3 topOf read CDN pictures through a canvas WITHOUT crossOrigin → canvas tainted → getImageData threw →
  measure fell back to the whole-picture box: no core, no wl/wr profile. So the 32.2a crop never ran on the live CDN build: Thái hậu was
  shrunk to her full robe width (310–351 px tall in a 437–495 px column, ~125–178 px empty above). Fixed: crossOrigin="anonymous" on both
  (CDN sends ACAO *, SW fetches CDN in CORS mode). After: Thái hậu fills the column height (~451 px in 477), sleeves cut at the column edge,
  face whole, aspect true. Also: a not-yet-measured figure is hidden instead of drawn at raw picture size.
- Stage <img class="kesimg"> also crossorigin="anonymous" (one shared download with the kitFigBody CORS read).
- Merged origin/main 2d038139e. Scan after (stage-fig-size.js, 7 sizes): every column ≤ 36 %, face true, sq true, distorted 0, over 0, no page
  errors; Thái hậu chê dung nhan / Thái hậu triệu: 411–469 px tall in 437–495 px columns (was 303–351), sleeves cut at the column edge.
  book-figwide.js 755x1000/1180x820/820x1180/686x880 × 3 Thái hậu figures: ALL OK. Identity card figure loads at all 4 sizes.
  Rows measured mid-download (figH 0 / 900 raw) are this sandbox's saturated CDN link (first-run 211 MB preload, SW blocked); the figure is
  now hidden until measured instead of drawn at raw size.

# PROGRESS — kit owner #3 (review/fold-layout)

Done (pushed): KIT 31.18 + 32 in dev/kit/KIT.md, code in dev/build/jk4.js (new, after jk3) + small edits in p1.html, j1, j9, j11, j27, j59, j79, j87, jk2b, jk3.
- kitStatCell / kitStatRow: one cell for all 8 top-bar stats (+ tiles, chips); baselines measured (KIT 32.1). Guard: `node dev/test/kit_dupes.js`.
- Review FAIL 1bf3f138 items: stage strip / full width under plaques (j59), picker counter cut (kitStripFit), old .kcchips removed,
  mixed option grid holes, place line under chips, long helper line → "… ⓘ", lãnh cung rank chip, frame gap (trim incl. crest).
- Panels read their container width (kitPcWide(pc), #panel.k3pn) — 31.18.
- kitEventStage / kitStageFig / kitEvCat (32.2–32.3); week book person pages use full-body figures.
- Tài nghệ pictures (INFO.json art-*/vir-*), Thái hậu chip → her card, Tần = palace head (PAL_HEAD), one stage backdrop (j11).
Test harness (scratchpad k3/): mk.sh builds _t.html, server `python3 -m http.server 8979` in the worktree, scripts bar.js (baselines),
fr.js (frame gap), s1.js, ev2.js, final3.js, fb.js (book), sweep.js (7 sizes), oldsave.js.
Open (next): one kitBar for the 6 bar variants, one tab-row builder, status-sheet chips → kit cells, old .btn screens (KIT 32.4);
allergy rash overlay art (KIT_RASH hook ready); index.html/sw.js not rebuilt on this branch (merger runs dev/site/build_site.sh).

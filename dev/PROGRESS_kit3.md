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

## 11/15 — review r3 FAIL (1366 stage strip) → KIT 33 ONE FIGURE SCALE (KIT_FIG) + kitImgErr
- KIT_FIG (jkit.js top): woman .86 of stage height, man/eunuch ×1.08, child .55+.03·age; j59 reads it (MANF/MEN/.7 strip factor removed).
- j59: one scale per scene, never shrink to fit more; strip = equal whole-person slots (snap per person, exact N slots wide), "› N"/"N ‹"
  in the empty right gutter under the plaques; widths by visible bbox; only exception = scale down to fit her + one whole person.
- jk3 k3Gut: empty plaque column reserves no gutter. jk4 kitStageFig: --kfr = KIT_FIG.fac/man, feet aligned.
- kitImgErr (jkit.js): null-safe inline onerror for j15 pcPort, j3, j90 podium, jk4 event stage (fixes "reading 'classList' of null").
- Measured 686/1180/1366/1024 (KIT.md §33 table), consort + cung nữ 1/3/5/6 people: all whole, chips uncut, 0 errors, 0 overflow.
  Shots dev/shots/review/fold-layout/k33-*.jpg. Harness: scratchpad k3/st.js + h2.js (route-served files, no server).

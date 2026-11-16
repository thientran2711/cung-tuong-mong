# Review face-sharp-r2 (reviewer, 16/11) — branch review/face-sharp @ e9cc2b870b, merged onto origin/main a523531

RESULT: **PASS**. NOTE: at final merge (origin/main a3dbdc19f3) main ALREADY contains review/face-sharp via r1 incl. an equivalent HD-failure fallback (jfighd.js `error` handler, K.bad), so
this branch's final tree = main + this note + dev/test/face-sharp-probe.js; my own jfighd fix (item 1) was dropped in favour of main's. Tests below ran on the pre-merge build of e9cc2b870b (+my fix).
The worker's e9cc2b870b alone FAILED the HD-fallback check (item 1); main's version was read, not re-run in a browser (same mechanism).

## What I checked and found
1. **HD fallback (FAIL on the worker's sha, fixed in r2).** With `img/hd/*` answering 404 (also what happens offline: the SW does not cache HD files by manifest,
   it falls to cache-or-network), her picture became a BROKEN image (naturalWidth 0, she vanished from the stage): a `srcset` candidate that fails has no fallback to `src`.
   Fix (dev/build/jfighd.js, 2 lines): capture-phase `error` listener on a figure with an HD srcset drops `srcset`/`sizes`, remembers the file as bad (`KFHD.bad`),
   `fit()` never re-adds it this session. Re-test BLOCKHD=1 755x1000@2: her `currentSrc` = the 900 file, complete, drawn 225 px wide, no page errors.
2. **Faces sharper.** `face-sharp.js` + `face-sharp-cmp.py` (face detail on screen / ideal of the approved 900 file), her | maid:
   | viewport | main | branch |
   |---|---|---|
   | 755x1000@2 | .92 / .94 | 1.44 / (maid off-screen) |
   | 1000x755@2 | .87 / .97 | 1.05 / 1.01 |
   | 1180x820@2 | .68 / .85 | 1.34 / 1.03 |
   | 1366x1024@2 | .96 / .88 | 1.38 / 1.01 |
   | 844x390@3 | .91 / .96 | 1.15 / 1.15 |
   I looked at the crops (755, 1366, 844 main vs branch): main hazy, branch crisp (eyelashes, lips, huadian). Maids have no HD twin but are no longer softer than before.
3. **No continuous animation on people pictures.** `face-sharp-scan.js` 1180x820@2: main animated 20 (figidle, meidle, j59halo, j59selp) -> branch 0 (63 pictures scanned).
4. **HD files match the approved 900 files.** 54 sampled (every tier t1-t8 / tm0-tm4 / cold, ages a18-a51, emperor, eunuch, player looks), downscaled HD vs 900:
   alpha diff mean <= 0.35/255, luma diff 1.1-2.1, colour offset <= 1.4/255 (systematic, invisible), head detail gain 1.02-3.7x (all >= 1). Looked at 36 face sheets (left 900 upscaled, right HD):
   same face, same huadian, same colours, same hair/ornaments, no drift; HD clearly crisper. All 1598 manifest entries return 200 on the CDN (avg 188 KB, max 307 KB).
   Coverage gap (honest, not a defect of this branch): HD exists only for consorts (1455), eunuchs 120, player 15, emperor 8. Maids/mama/servants, FIGURES-ty, FIGURES-others, por-*
   and ~330 consort files (sheet URL unknown) have none; 7 skipped by the registration guard. They keep the 900 file (sharp now that nothing animates).
5. **No yellow rectangle / glow follows the outline.** #kfa (alpha' = 1.07a - .065) is first in every people-picture filter that the class scan finds (p1, j59 HG/SG/unk/sil, jk4, j79, j90).
   Selected-her screenshot 1180x820 main vs branch: glow traces the silhouette. Family gap (minor, not blocking): `.kbp-fig` in jbook.js (book-page figures, ground shadow only,
   no #kfa) -> same haze rectangle possible as a faint grey shadow; suggest adding `url(#kfa)` there in a later pass (KIT: one filter list for all people pictures).
6. **Download on phones.** 844x390@3 (landscape phone): 0 HD requests (figure drawn ~153 css px x3 = 459 < 900). 390x844@3 (portrait, bigger stage): 2 HD files (~400 KB) because
   her figure is drawn wider (x3) than the 900 file; by design (HD only when drawn above the file). Light 900 file stays for every figure drawn smaller (maids, small slots).
   Not a violation of the "only when drawn > 900 px" claim, but "no extra download on phones" holds for landscape only.
7. **me-mark.** Normal: `.kmemark.kmmove`, `kmmBob` 2.4 s, travel -7 px, static gold glow; `prefers-reduced-motion: reduce`: no `kmmove`, animation none, glow kept. Code path for Hiệu ứng Gọn
   (`OPT.fxon===false` -> kmmMotion false) read, same switch. Only the mark moves (its own layer), not the figure.
8. **KIT FIRST.** jfighd.js adds no chips/rows/frames; #kfa and kitFigHD are shared helpers used by every figure image; kit sample §71 registered. Number collision: this branch's §71 vs
   buoi-transition's §71 and main's §70 (item-info): kit keeper renumbers (not done here). KIT.md merge: both sections kept.
9. **Relation to review/face-sharp-r1.** r1 (already PASS) contains review/face-sharp only up to 045ecea8b2 (merged there). THIS branch (e9cc2b870b) adds one commit on top of that, a PROGRESS-only
   commit (e9cc2b870b), so it holds nothing functional beyond r1. This branch does NOT contain r1 (r1 has main 900ace7fb + opt-pics merges). r2 here = this branch + main a523531 + the fallback fix.
   If r1 already shipped in merge train 1, the only code from r2 that is new is the jfighd.js error fallback (item 1) and the PROGRESS note; r1 lacks the fallback too -> apply item 1 on top of r1/main.
10. Tests: page errors 0 in all runs (755x1000, 1000x755, 1180x820, 1366x1024, 844x390, 390x844); no cut text seen in the screenshots viewed; old-save load not re-tested (no save-format change).
    Not run: coop-e2e (co-op not touched). Memory was tight (other agents' browsers), runs were sequential, one browser.

## Reviewer changes on review/face-sharp-r2
- (dropped at final merge, superseded by main) dev/build/jfighd.js HD-failure fallback.
- dev/test/face-sharp-probe.js: the probe used above.
- merges of origin/main (a523531, then a3dbdc19f3): conflicting generated/kit files taken from main.

# review face-zoom-stretch 717c0c0 (head c1104d9) - small reviewer
PRIORITY #1 CHECK: worker report has the line (OD 18/11 05:25Z, jtoil.js kitFaceZoom §60, no review/* clash); brief OK.
VERDICT: FAIL (process only) - rebase needed. Code itself is good.
1. Branch is NOT a fast-forward of live main a95e8d4: it sits on 94a9375 (merge-base); main moved by merge a95e8d4. Branch head is c1104d9 (717c0c0 + one test-only commit, face-zoom-aspect.js SEED/FORCE), not 717c0c0. Rebase/merge onto a95e8d4, then rebuild index.html + sw.js (only these two generated files conflict; jtoil.js and tests merge clean).
CHECKED on a scratch merge of the branch onto a95e8d4 (generated files rebuilt by dev/site/build_site.sh, nothing pushed):
- aspect (face-zoom-aspect.js, 24 samples = 30 pictures + reveal): Fold 755x1000, iPad 1180x820, 1366x1024, 390x844@3: ratio rendered/file 0.998..1.002 everywhere, 0 bad, 0 page errors; reveal fig box and portrait patch within 0.5 % (e.g. 1.311 vs 1.318). 412x1058 skipped (rotate prompt).
- same-character before/after (SEED=7 FORCE=c16, Fold): looked at both; identical. The live toil-fit2.json fix already hides the stretch on main, so the code is a safety net (stale v[8] can no longer stretch); no regression, makeup marks (brow, blush, forehead flower) sit on the face in both.
- Pre-existing, NOT caused by this branch (same in baseline): a brownish smear + hair strands on the right cheek/chin of fig-consort-c16 reveal at Fold (portrait patch seam). Suggest main logs it separately.
- one-core guard PASS (fails 0); old-save oldsave-r1 16/16 (old origin/main save loads in new build, no overflow, no errors).
- dev/test/quickcheck.sh does not exist in this tree: not run (noted, not a branch fault).
- Kit: change is in the kit part only (kitFaceZoom + toilRow/KIT_PICAR + toilReveal wait); other callers of toilRow get the true aspect. No custom frames.
Next: after rebase onto a95e8d4 (and rebuild) I expect PASS with no further change. Shots were scratch only, nothing on CDN, nothing to wipe.

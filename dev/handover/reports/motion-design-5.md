# MOTION-DESIGN-5 report (successor of MD4; worker under MAIN 127)
PRIORITY #1 CHECK: OD game-feel mock rows | claims MOTION-DESIGN-4 | main 0 | review/* 1 (review/motion-design-4 e99d0477) — continued that branch, merged review/kit-woodskin f685185.
START_CTX ≈ 5 % (fresh session). Not near rollover.

## MAIN 127 FAILs closed (family m1 / m2 / m4)
1. BOX OVER HEAD: m1 background is now the people-free scene painting phi-tan-cung (was ev-cung-nhan.webp with a woman painted in). faceBoxes() also takes `L.__paint` (painted heads of a background) so a future painted bg can be registered; audit s2 (Fold + iPad, enter/lift 1/lift 3, m2 3 taps): 0 face hits, 0 «???», no overflow. Stranger NAME TAG «???» (OD:L673) untouched in the kit.
2. SEE-THROUGH: no opacity on any figure. m1/m2 figures start off-stage by transform and walk in at opacity 1 AFTER the veil opens; layer L is opaque from its first frame. m4: the stage re-render (which showed the game's breathing silhouettes ~1 s) now happens under the veil; M1.choose / M2.close keep the veil closed until `settleStage` says every stage portrait is loaded.
3. DOUBLE EXPOSURE: `MD3.cover(swap)` = ONE opaque kit-paper screen veil sliding by transform (cover → swap → reveal), used at m1 enter+exit, m2 enter+exit, m4 re-render. KIT_REQUESTS K-SCREEN-VEIL filed (mock stand-in until the kit part exists).
Merged review/kit-woodskin f685185 (opaque .ksil, plaque names 2 lines max).

## Evidence
All 6 videos re-shot (Fold 755x1000 + iPad 1180x820; 1x + 2x slow; KSEED=1) and sheeted at fps=12 (10x6 tile): no see-through person after the fix (the one failing sample, m4 iPad ~1.5 s, was fixed and re-shot), no box over a face, no double exposure, no «???». Sheets in scratch only (not in git).
Page: https://ctm-img.victoria-tntt.workers.dev/img/_review/motion4/index.html ; kperf real-device probe link kept: .../motion4/probe/kperf.html?khost=1&kperf=1. Wipe with the verdict: python3 dev/site/cdn_sync.py --wipe-review motion4.
Open for the build: kitScreenVeil part; the veil hold while settling is ~1 s on a cold stage (real build should preload stage portraits before the veil closes).
Status: ~100 % design of picks / ~0 % playable (mocks).

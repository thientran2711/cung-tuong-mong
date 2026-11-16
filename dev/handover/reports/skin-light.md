# skin-light — owner bug 16/11 11:58Z (player vs maid skin = "two different lights")
Branch review/skin-light (from origin/main 695934d1). Worker session_01UV1SzinoxqBjmDnBtQQBku. START_CTX ~8 % of window.

## Root cause
- NOT CSS: every figure kind already had the same filter (`url(#kfa) var(--klf,brightness(1)) drop-shadow`); --klf scene-light is brightness(1) (BAL.klfStrength=0); weather fx does not filter figures. Measured live: player #mefig and maid .figimg computed filters identical.
- The ART: each figure set was painted/graded in its own batch. Face skin median (skin-match audit dev/art/skin-match/log/all.jsonl, 8758 figs):
  maid base outfits L*77.7 b*12.9 · maid tiers ~L*80 · consorts L*81.2 b*14.5 · player looks L*76–86, b*8–18 · eunuchs L*73.5 b*18. Single files spread ±3 L*, ±3 b*.
  Owner screenshot measured: player face L*83.5 vs maid L*75.3 (8 L* apart) → one looks lit by a warm lamp, the other in shade.
- Earlier work reused: skin-match/skin-audit face audit (mediapipe face/neck/hands Lab + face boxes) = the measurement source; rosy pass, makeup, faces untouched.

## Fix (kit, whole group)
- New kit part §82 kitFigLight (dev/build/jfiglight.js): per-painting light-tone curve (out = x + d·w(x), darks/white untouched) that brings every face to one shared skin light per group (women = maid look L*80.5 a*9.5 b*13; men; kids). Data img/FIGLIGHT.json on the CDN (8527 of 8758 figures need a shift; 2333 distinct curves, 47 KB gz), generator dev/art/skin-light/table.py (+ labmath.py, measure.py).
- All person-picture filter rules switched from url(#kfa) to var(--kfs,url(#kfa)) (p1.html, j59, jk4, jpdlg, j79, j90, jbook); un-filtered person pictures (portraits por-*) get img[data-kfl]{filter:var(--kfs)}. Same entry for fig / hd fig / por.
- Scan (dev/test style, .tok/#mefig/cards/portraits on home + 8 tabs, Fold + iPad): every visible fig/por picture carries #kfs filter, 0 misses, 0 page errors. Live CDN load verified (KFL.list 8527).

## Numbers (face skin measured in the rendered screenshot)
- 10-kind lineup, women: spread L* 6.7 → 2.0–2.2, b* 10.1 → 4.2; std L* 2.2 → 0.6, b* 3.2 → 1.1.
- Owner-like pair on stage (player look2-t3 white-gold vs maid m03): b* gap 5.8 → 2.1 (Fold), 6.8 → 3.0 (iPad).

## Before/after (looked at)
- dev/handover/reports/skin-light/fold-755x1000-stage.jpg · fold-755x1000-lineup.jpg · ipad-1180x820-stage.jpg · ipad-1180x820-lineup.jpg
  (scene background not loaded in the test shots — CDN timing; figures are what matter.)

## Risks / notes for review
- Light clothes shift slightly with the skin (it is a light change, by design); hair/dark colours unchanged (first gamma version changed hair → replaced by the light-tone curve).
- A few audit face boxes are stale (e.g. fig-consort-c01-tm3: fbox no longer on the face) → the mediapipe values are still used (they were measured on the face); measure.py re-measures current CDN files if ever needed.
- Perf: portraits now carry an SVG component-transfer filter (cheap; figures already had #kfa). Watch list views on weak devices.
- New figure art must be added to FIGLIGHT.json (KIT §82 note).

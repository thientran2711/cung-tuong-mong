# review/weather-fx-one — WIP (owner 16/11)
Status: code done, first visual check OK (1180x820 day spring petals). NOT ready for review.
## Design (all on the ONE jfx Pixi canvas #kfxcv, painted sprites only, pointer-events none)
- Season layer (v.lay="se"): full screen, month-driven KF_SEASON, cap 8, alpha .7.
- Weather layer (v.lay="wx"): stage-clipped (white Texture.WHITE mask sprite), rain/storm (painted streak), mist (smoke), night fireflies (orb).
- ONE petal effect: falling weather of the same kind as the season (petal/leaf/wind/snow*) replaces the season layer config (full screen, gusts, ~55% count, 70% size). No duplicate.
- Night = alpha x.82 only, no grey tint. Gọn / reduced motion (kfStill) = none, fades out. Caps: per-layer x phone x KFX.q, plus KFK_CAP.
- j11: removed code-drawn dot/petal textures, mkPart, PCOL, pxBurst, weather particles. Stage lamps/stars now painted orb/spark in jfx (kfDeco).
- Celebration bursts (kfPx) unchanged.
## To finish
1. Screenshots day+night at 1180x820, 755x1000, 844x390 (spring petal, storm, snowh); check Gọn gives none.
2. FPS before/after with 4x CPU throttle on a quiet machine (box load was ~47, software GL: numbers useless).
3. Run dev/test/game-feel.js, weather-port.js (KFX.amb/ambOK/kfAmbient names kept).
4. Kit sample entry for the weather/season layer if wanted.

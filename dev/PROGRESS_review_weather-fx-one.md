# review/weather-fx-one (owner 16/11) — READY FOR REVIEW
Status: finished. Merged origin/main (index.html/sw.js conflicts = generated files, rebuilt with dev/site/build_site.sh).
## Design (all on the ONE jfx Pixi canvas #kfxcv, painted sprites only, pointer-events none)
- Season layer (v.lay="se"): full screen, month-driven KF_SEASON, cap 8, alpha .7.
- Weather layer (v.lay="wx"): stage-clipped (white Texture.WHITE mask sprite), rain/storm (painted streak), mist (smoke), night fireflies (orb).
- ONE petal effect: falling weather of the same kind as the season replaces the season layer config (full screen, gusts, ~55% count, 70% size). No duplicate.
- Night = alpha x.82 only, no grey tint. Gọn / reduced motion (kfStill) = none, fades out.
- j11: code-drawn dot/petal textures, mkPart, PCOL and weather particles removed. Stage lamps/stars = painted orb/spark in jfx (kfDeco).
## Finisher changes
- Rain was invisible (the painted "streak" is a thin horizontal flare, ~5 px thick, additive): rain now normal blend, scaled up (x2.6 long, x3 thick), a0 drizzle .75 / storm .8, spawn up to 12 per tick (was 3: only ~12 streaks alive at once).
- BUG FIX: j11 feedback() still called pxBurst (removed in WIP) = ReferenceError on poison/decree/promote/birth/favour/ash. pxBurst is now a 1-line shim to the painted kfPx effects (goldpetals / petals / ash). Checked: all feedback kinds run, 0 page errors.
## Verification (this box: software GL, noisy)
- Shots: dev/shots/weather-fx-one/{spring-petals,storm,snow}-{day,night}-{1180x820,755x1000,844x390}.jpg + gon-<size>.jpg (@2 DPR). Looked at spring day, storm day/night, snow night.
- Gọn (OPT.fxon=false): 0 particles, canvas hidden, at all 3 sizes.
- FPS, 4x CPU throttle, 1x DPR, 4 s rAF (branch vs main): 1180x820 petal 21.1/25.4, storm 15.4/24.5, snow 19.6/26.1; 755x1000 petal 14.4/20.8, storm 19/18.8, snow 14.4/19.3; 844x390 petal 50.5/59, storm 41.3/56.8, snow 54.2/56.8. Branch is slower under software GL (full-screen season + clipped weather vs one small layer); adaptive KFX.q (0.3..1) reduces counts. Numbers are not representative of a real GPU.
- Tests: weather-port.js PASS (0 page errors); game-feel.js ran, 0 errs, no overflow, off switch gives 0 parts.
## Known / not done
- Rain on 844x390 is sparse (cap scaled by stage area x phone x height).
- Kit sample entry for the layers: not added (optional).

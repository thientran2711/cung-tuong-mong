# review/weather-fx-one — SẴN SÀNG KIỂM f6141594
Branch review/weather-fx-one (origin/main merged in; generated index.html/sw.js/assets.json rebuilt with build_site.sh). Details: dev/PROGRESS_review_weather-fx-one.md on the branch.
## What changed
- Rain/storm was invisible (painted streak is a thin additive flare): normal blend, scaled up, higher alpha, up to 12 spawns per tick.
- BUG FIX: j11 feedback() still called removed pxBurst (ReferenceError for poison/decree/promote/birth/favour/ash). Now a shim to painted kfPx (goldpetals/petals/ash). All feedback kinds checked, 0 page errors.
- One painted petal effect (season layer full screen, weather layer stage-clipped), night = alpha x.82 only, no grey. No code-drawn particles left in j11.
## Shots (dev/shots/weather-fx-one/ on the branch, @2 DPR)
{spring-petals,storm,snow}-{day,night}-{1180x820,755x1000,844x390}.jpg and gon-<size>.jpg. I looked at spring day, storm day/night (fold, iPad crop, phone landscape), snow night: petals one effect, rain visible and clipped to the stage (header stays clear), snow night not grey. Not individually viewed: remaining combos (counts logged ok).
## Gọn
OPT.fxon=false: 0 particles, canvas hidden at all 3 sizes.
## FPS (4x CPU throttle, 1x DPR, 4 s, SOFTWARE GL box — noisy, branch/main)
1180x820 petal 21.1/25.4, storm 15.4/24.5, snow 19.6/26.1; 755x1000 petal 14.4/20.8, storm 19/18.8, snow 14.4/19.3; 844x390 petal 50.5/59, storm 41.3/56.8, snow 54.2/56.8. Branch is slower here (full-screen season + clipped weather); adaptive KFX.q lowers counts. Re-measure on a real GPU if it matters.
## Tests
weather-port.js PASS, 0 page errors. game-feel.js: 0 errs, no overflow, off switch 0 parts, old save loads. No single "normal suite" runner exists (only per-feature scripts); the 2 requested were run.
## Open
Rain sparse on 844x390; kit sample entry for the layers not added; spring-day shot first-case flakiness was harness (roulette cover), fixed by re-shoot.

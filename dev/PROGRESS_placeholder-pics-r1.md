# PROGRESS review/placeholder-pics-r1 (reviewer, KIT §59)
Merge of review/placeholder-pics d70983bb8 onto origin/main 41cdf7c3f; jph.js appended LAST in assemble (after jartc.js); KIT.md: §58 + §64 (main) kept, §59 appended; site rebuilt (build_site.sh).
## Checked
- CDN: img/ph-event-light, ph-event-dark-v2 (640x480), ph-act-light, ph-act-dark-v2 (384x506) all 200; looked: generic still-lifes, no people/faces, dark = overcast gloomy day (no moon/candle).
- dev/test/placeholder-pics.js (old main build → merged build) at 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390: all ok, 0 page errors, no h-overflow, placeholder act keeps picture, flowerBloom → ph-event-light.
- ts-oldsave.js: ok (needed proxy + domcontentloaded waits locally; repo copy unchanged).
- month-cal.js all 6 sizes: bad 0.
- kit-page.js: §59 sample renders the 4 pictures; one sample error "§28.1 pcPort" is PRE-EXISTING on origin/main (same on main build), not from this branch.
## Left
- item-events.js (running at handover), missing_pics.js re-run on merged build → MISSING_PICS.md, kitEventDp person-dialog band screenshot, 390x844 shot.

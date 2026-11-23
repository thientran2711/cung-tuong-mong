# HELP-N19 report (body-fit data, N19 data part)
PRIORITY #1 CHECK: OD — | main d1a36374 jbody.js:31 KIT_BODY, no img/body-fit.json in git | review/art-prompts-j 881040e7 BODYFIT_NOTES | claims none.
START_CTX ~ low; lineage depth not read (worker, finished in one pass).

Branch review/body-fit-data @ 6e845d8e (from LIVE main d1a3637). No pictures drawn, no Magnific.
Files: dev/measure/body_fit.py (script), dev/measure/body-fit/body-fit.json (data, = img/body-fit.json), check-measured.jpg, check-default.jpg.

## What was measured
- 8295 woman figures (fig-consort 3568, fig-maid 4680, fig-mama 32, fig-thaihau 15), streamed from the CDN, nothing stored.
- Only the fault BODYFIT_NOTES names: WAIST (slightly low on wide-sleeve women). Rows = {"waist":[l,t,w,h,0]} only (partial rows override only that zone); x/width/height identical to the game's own measure (jbody calc ported to Python), top moved to the sash line.
- Sash = strongest row-to-row colour edge (pair of edges = band centre) on the two side strips of the torso (centre skipped: hands/fans/scrolls), between .25-.45 of body height. Estimate outside .27-.37 or weak edge -> default .315 (995 of 8295 = 12 %, flagged in the script report; the old game default was .34).
- Other kinds (eunuch, man, official, physician, emperor, kid, player) and every other zone: no row = game keeps its own measure (notes say they are fine).

## Check
Overlay sheets LOOKED at: 24 random measured (8 consort, 8 maid, 4 mama, 4 thaihau): blue waist box sits on the sash/belt on all; 16 random default-fallback: all on the torso, a few a little high/low. Not run: dev/test/kit-body-fit.js (needs a built page with the file on the CDN) — reviewer please run it after the file is on a test CDN path; also the 27 KP09 overlays step 3 of the notes is not done (no overlay pictures exist yet).
Land step: python3 dev/site/cdn_sync.py img/body-fit.json from a copy of dev/measure/body-fit/body-fit.json (cdn_sync, no rebuild). Not pushed to CDN by me.

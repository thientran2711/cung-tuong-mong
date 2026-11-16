# review/kit-sweep-r1 (reviewer, 11/16/2026)
Base: review/kit-sweep 3e75a7f3 + origin/main 0a311183 (only index.html conflicted; sources auto-merged; site rebuilt with dev/site/build_site.sh).
Results (direct, 5 sizes unless noted):
- kit-conform: 0 CUSTOM, floats none at 755x1000 / 1000x755 / 1180x820 / 1366x1024 / 844x390. MIXED 5-6 per size, all "generic picture on a person option" (PEND/SRV evpick, plantsv, j70thr, night2): person pickers, owned by pcard-actrow. MISSING 14-17 = cases a random life cannot open (varies per run).
- panel-size: same table as origin/main (compared at 1000x755 and 390x844): same widths/heights, same btnOut plantpick, same waste "intel"; no regression. Exit 1 is pre-existing (390/412 widths differ, owned by kpanel-compact).
- stage-rail: PASS at 1180x820, 755x1000, 844x390, 1000x755.
- coop-e2e (live worker): 59/59. Extra check at world start: #kctm clock strip absent on both seats, friend chip (#kctmf) in the header with status + countdown (screenshots fold + iPad looked at).
- Host mode (?khost=1) boots at all sizes, 390x844 shows the rotate prompt in host and direct; no page errors, no horizontal scroll.
- Looked at: place cards (T2 picture left, rows right) on several places, item card (kit panel, header ✕) at 755x1000 and 844x390.
Notes: at 844x390 the place card text is taller than the frame (options below fold) = known overlap with kpanel-compact sizing. Item card name uses an inline colour style (grade colour) in the kit header; minor.
No code changes by the reviewer beyond the merge.

## Round 2 (11/16): + review/pcard-actrow-r1 db77f3f3b, + origin/main 02a0d3f10
- Merge: pcard-actrow conflicted only in index.html/sw.js/assets.json (rebuilt) and kit-conform.js (add/add; kept kit-sweep's newer copy). No clash between the two in the sources.
- kit-conform.js fix (reviewer): the person-option rule did not know the person pickers' portrait (.kopface, img /por-) and flagged them, and it flagged act options in T3 person dialogs (j70thr, night2) where the person is already the figure column. Now accepts .kopface / por- pictures and skips T3. Result: 0 MIXED, 0 CUSTOM, no floats at 5 sizes (CONFORMS 80-82, MISSING 15-17 = states not reachable in a random life).
- pcard-actrow.js: all scenes PASS at 5 sizes. panel-size: same as main, plantpick btnOut gone. stage-rail 4/4 PASS. coop-e2e 59/59. Host + direct boot, rotate prompt at 390x844, no errors.

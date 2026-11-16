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

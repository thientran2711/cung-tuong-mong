PRIORITY #1 CHECK: harness dev/measure/robot10*.js (review/robot10-harness-rv, merged locally); bug file nc-20261123-2308.md exists (spread run).

# robot10 nc runner A — roads nc_gian + nc_su (round 1, game = main bba42773)
| road | lives | bug rows | no-ending lives |
|---|---|---|---|
| nc_gian | 20/20 | 61 | 4 TIMEOUT, 6 CAP |
| nc_su | 20/20 | 10 lives (skilled, random, greedy, cautious, schemer) in su1/ JSON only (container restart killed the run before its .md was written); 26 distinct rows for the other 10 lives in nc-20261124-0533.md | su1: 1 TIMEOUT (random-1), 3 CAP; su2: 4 TIMEOUT (lazy-1, lazy-2, speed-1, speed-2), 1 CAP |
Files: dev/handover/robot/nc-20261124-0057.md (nc_gian), nc-20261124-0533.md (nc_su half 2), ncA/ (JSON + saves), rates-20261124-0633.md/.csv (40 lives).
Round NOT clean. Note: the bug md for nc_su's first 10 lives can be regenerated from ncA/su1/*.json if the fixer needs it.
No handover needed (context low).

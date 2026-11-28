> INTERIM snapshot 12:34Z — KK70 runner still running; final table follows on this path.

# K-OPTS-READER half A — before/after verdict table (KK70)

AFTER = 4a0d9669 (kk70after), BEFORE = 09e10cd3 (kk70before). Rows merge KK69 (dev/handover/reports/kk69-halfA.md, no logs kept) + KK70 runs (/home/user/wt/kk70-runs/{after,before}/*.log, sum.csv).
Result: pass = exit 0 and no FAIL line; nF = distinct FAIL lines in the log (KK70 logs only). BEFORE "—" = not run (after clean, or already covered).

Counts: PENDING 30 · SAME 17 · VACUOUS-FIXED 3 · WORSE 4

| file | AFTER | BEFORE | KOPTS | verdict | note |
|---|---|---|---|---|---|
| _fe_dbg.js | exit 1 (140s,KK69) | exit 1 (165s,KK69) | KOPTS reads 15 · blind-before 0 · plaques 0 | SAME | rc/last-line compare only (no AFTER log from KK69) |
| act-audit.js | TIMEOUT (1800s,KK69) | TIMEOUT (1800s,KK70) | — | SAME | rc/last-line compare only (no AFTER log from KK69) |
| act-merge-j3-look.js | pass (46s,KK69) | — | KOPTS reads 4 · blind-before 0 · plaques 0 | SAME | after clean; before not needed |
| act-merge-j3-ways.js | exit 1 (443s,KK69) | exit 1 (440s,KK69) | KOPTS reads 106 · blind-before 0 · plaques 0 | SAME | rc/last-line compare only (no AFTER log from KK69) |
| act-merge-j5-kcscan.js | pass (407s,KK69) | pass (294s,KK69) | — | SAME |  |
| act-split-vp.js | exit 1 (151s,KK69) | exit 1 (140s,KK69) | KOPTS reads 3 · blind-before 0 · plaques 0 | SAME | rc/last-line compare only (no AFTER log from KK69) |
| act-text-scan.js | TIMEOUT (900s,KK69) | TIMEOUT (900s,KK69) | — | SAME | rc/last-line compare only (no AFTER log from KK69) |
| ban-cung-shots.js | pass (241s,KK69) | — | KOPTS reads 2 · blind-before 0 · plaques 0 | SAME | after clean; before not needed |
| bongloc-coop-catch.js | TIMEOUT (900s,KK69) | — | — | PENDING | before not run |
| bongloc-coop.js | TIMEOUT (900s,KK69) | — | — | PENDING | before not run |
| cb-gate.fn.js | pass (66s,KK69) | pass (47s,KK69) | — | SAME |  |
| cb-greet.fn.js | pass (24s,KK69) | pass (23s,KK69) | — | SAME |  |
| cb-ton.fn.js | pass (38s,KK69) | pass (31s,KK69) | — | SAME |  |
| charge-taps.js | pass (133s,KK69) | pass (105s,KK69) | — | SAME |  |
| cn-force.js | pass (203s,KK69) | — | KOPTS reads 81 · blind-before 3 · plaques 3 | VACUOUS-FIXED | after clean; before not needed |
| coop-ask-srvprobe.js | TIMEOUT (900s,KK69) | — | — | PENDING | before not run |
| coop-b1.js | exit 2 (77s,KK69) | — | KOPTS reads 50 · blind-before 0 · plaques 0 | PENDING | before not run |
| coop-b2b5.js | exit 2 (69s,KK69) | — | KOPTS reads 42 · blind-before 1 · plaques 1 | PENDING | before not run |
| coop-ban-cung.js | exit 1 (96s,KK69) | — | KOPTS reads 63 · blind-before 1 · plaques 1 | PENDING | before not run |
| coop-bot-x.js | exit 1 (153s,KK69) | — | KOPTS reads 29 · blind-before 0 · plaques 0 | PENDING | before not run |
| coop-bot.js | exit 1 (140s,KK69) | — | KOPTS reads 80 · blind-before 3 · plaques 3 | PENDING | before not run |
| coop-chat.js | exit 1 (106s,KK69) | — | KOPTS reads 11 · blind-before 0 · plaques 0 | PENDING | before not run |
| coop-cold-faction.js | TIMEOUT (900s,KK69) | — | — | PENDING | before not run |
| coop-cyc.js | exit 2 (38s,KK69) | — | KOPTS reads 4 · blind-before 0 · plaques 0 | PENDING | before not run |
| coop-cyhold.js | exit 2 (36s,KK69) | — | KOPTS reads 4 · blind-before 0 · plaques 0 | PENDING | before not run |
| coop-dbg-hostdeath.js | exit 1 (55s,KK69) | — | — | PENDING | before not run |
| coop-dresscode-scan.js | TIMEOUT (900s,KK69) | — | — | PENDING | before not run |
| coop-dresscode.js | TIMEOUT (900s,KK69) | — | — | PENDING | before not run |
| coop-e2e-tr.js | TIMEOUT (900s,KK69) | — | — | PENDING | before not run |
| coop-e2e.js | TIMEOUT (900s,KK69) | — | — | PENDING | before not run |
| coop-emo-seat.js | exit 1 (286s,KK69) | — | KOPTS reads 45 · blind-before 1 · plaques 1 | PENDING | before not run |
| coop-ending-screens.js | exit 1 (85s,KK69) | — | KOPTS reads 140 · blind-before 0 · plaques 0 | PENDING | before not run |
| coop-errand.js | pass (22s,KK69) | — | KOPTS reads 2 · blind-before 0 · plaques 0 | SAME | after clean; before not needed |
| coop-guest-maid.js | TIMEOUT 8F (900s,KK70) | TIMEOUT 2F (900s,KK70) | KOPTS reads 132 · blind-before 0 · plaques 0 | WORSE | new FAIL: # guest: request and stand-in survive the rejoin / # guest: second maid rose (relay dropped) / # guest: stand-in gone, request closed / # host: nothing yet (relay was dropped) / #: week advanced for b |
| coop-guest-men.js | TIMEOUT (900s,KK70) | TIMEOUT (900s,KK70) | KOPTS reads 116 · blind-before 2 · plaques 2 | VACUOUS-FIXED | same failure mode |
| coop-guest-names.js | exit 1 1F (303s,KK70) | exit 1 1F (701s,KK70) | KOPTS reads 38 · blind-before 0 · plaques 0 | SAME | same FAIL set |
| coop-haohuu.js | exit 1 22F (346s,KK70) | exit 1 20F (360s,KK70) | KOPTS reads 57 · blind-before 3 · plaques 3 | WORSE | new FAIL: host ipad back: no word / picture of the bar under the icon + clock / host ipad back: the «!» box and the notice chip not on it |
| coop-hauthay.js | exit 1 1F (104s,KK70) | pass (71s,KK70) | KOPTS reads 60 · blind-before 1 · plaques 1 | WORSE |  |
| coop-lag.js | TIMEOUT (915s,KK70) | TIMEOUT (915s,KK70) | — | SAME | same failure mode |
| coop-ledger.js | exit 1 1F (896s,KK70) | exit 1 1F (889s,KK70) | KOPTS reads 7 · blind-before 0 · plaques 0 | SAME | same FAIL set |
| coop-looks-act.js | exit 1 2F (193s,KK70) | exit 1 3F (684s,KK70) | KOPTS reads 116 · blind-before 2 · plaques 2 | VACUOUS-FIXED | was BETTER; 1 FAIL gone |
| coop-looks.js | exit 1 3F (812s,KK70) | exit 1 1F (474s,KK70) | KOPTS reads 74 · blind-before 4 · plaques 4 | WORSE | new FAIL: after the merged week: A herself = A as seen on B / buổi #:# advanced for both |
| coop-lost-scan-traced.js | TIMEOUT 1F (900s,KK70) | — | KOPTS reads 204 · blind-before 1 · plaques 1 | PENDING | before not run |
| coop-lost-scan.js | TIMEOUT 2F (901s,KK70) | — | KOPTS reads 55 · blind-before 2 · plaques 2 | PENDING | before not run |
| coop-night.js | TIMEOUT 2F (900s,KK70) | — | KOPTS reads 40 · blind-before 1 · plaques 1 | PENDING | before not run |
| coop-one-world-play.js | exit 1 5F (630s,KK70) | — | KOPTS reads 77 · blind-before 0 · plaques 0 | PENDING | before not run |
| coop-p2.js | exit 2 (73s,KK70) | — | KOPTS reads 48 · blind-before 0 · plaques 0 | PENDING | before not run |
| coop-pets.js | exit 2 4F (667s,KK70) | — | KOPTS reads 691 · blind-before 16 · plaques 16 | PENDING | before not run |
| coop-play.js | pass (181s,KK70) | — | — | SAME | after clean; before not needed |
| coop-pool-face.js | TIMEOUT (901s,KK70) | — | KOPTS reads 58 · blind-before 2 · plaques 2 | PENDING | before not run |
| coop-r2.js | exit 2 (67s,KK70) | — | KOPTS reads 54 · blind-before 0 · plaques 0 | PENDING | before not run |
| coop-rejoin-stats.js | TIMEOUT 22F (900s,KK70) | — | KOPTS reads 119 · blind-before 2 · plaques 2 | PENDING | before not run |
| coop-rev2.js | exit 2 (44s,KK70) | — | KOPTS reads 4 · blind-before 0 · plaques 0 | PENDING | before not run |
| coop-room-faces.js | TIMEOUT 6F (900s,KK70) | — | KOPTS reads 75 · blind-before 2 · plaques 2 | PENDING | before not run |

# road-b1 — B1 worker (dtq + muoi + cn full roads) + jroad.js ENGINE OWNER
START_CTX ~5 % of a 1M window (session_01N1tNP2sDgtu4GovRB3yT4X, successor of road-map lead session_01N1tNP4TguHSiLpDgAN6EDF).
Rollover at ~30 % (START_CTX + 25 %), ceiling 60 %. Branches: `review/road-b1` (roads), `review/road-map-next` (engine).

## Engine log (jroad.js, review/road-map-next)
- 93e6a6f0: rdRel / rdOan / RDW moved from jrd_tt.js into jroad.js (shared by every jrd_<origin>.js; none may redefine them). B2, B3, Foreman B told.

## Status
- 16:55Z: brief + structural checker written (dev/build/_parts/check.js: gain AND loss on every option, openings cover every previous ending,
  climax options end the chapter, tokens, no %, typed rank names, RD97L rare finale). 12 roads being written (dtq_*, muoi_*, cn_*).
- Known pattern fault in the tt pilot (checker): ~60 options without a gain or a loss, mostly tt_mat .5–.11; fix when reviewer road-map-r1 reports
  (or as part of its pattern fixes).

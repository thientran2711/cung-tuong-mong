# save-growth fixtures (review/save-growth e573b9b8)
Robot saves used by the save-growth build + review (reports/save-growth.md:14–20, save-growth-review.md:17–18). Same files as dev/handover/robot/{ncA,nc-B-tuc}/saves/ (identical git blobs).
| file | game year | plain JSON chars |
|---|---|---|
| y01-ncA-004.json | 1 | 452,973 |
| y05-ncBtuc-035.json | 5 | 1,902,152 |
| y10-ncA-032.json | 10 | 3,253,700 |
| y14-ncBtuc-010.json | 14 | 4,346,335 |
Run (tests take the saves as ARGS; with no args they only see .out/oldsave.json):
  node dev/test/savegrow-codec.js dev/handover/fixtures/save-growth/y*.json
  node dev/test/savegrow-slot.js  dev/handover/fixtures/save-growth/y*.json
F's s4d save (2.25M chars, year 10) is a further big fixture — owned by Foreman F's runner box, not copied here.

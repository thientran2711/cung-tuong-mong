#!/bin/bash
# concatenate the road fragments into the origin files (run from dev/build)
cd "$(dirname "$0")/.."
{ cat rdfrag/_hd_thd.js; for r in thd_tho thd_sach thd_tro thd_hoc; do [ -f rdfrag/$r.js ] && { echo; cat rdfrag/$r.js; }; done; } > jrd_thd.js
{ cat rdfrag/_hd_cnv.js; for r in cnv_chu cnv_ban cnv_mat cnv_ma; do [ -f rdfrag/$r.js ] && { echo; cat rdfrag/$r.js; }; done; } > jrd_cnv.js
node --check jrd_thd.js && node --check jrd_cnv.js && echo CAT_OK

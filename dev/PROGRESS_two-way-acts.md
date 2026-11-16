# PROGRESS — review/two-way-acts
Task: owner two-way law (16/11 s21). Report: dev/handover/reports/two-way-acts.md (audit table first).
Build: CTM_IMG_BASE= python3 dev/build/assemble.py. Tests: node dev/test/two-way-acts.js <html>; node dev/test/two-way-oldsave.js file://<main.html> file://<this.html> 40; node dev/test/coop-e2e.js <out>.
Bot: GAME=<html> INP=inpage6.js INP2=insuc2.js node dev/measure/runb.js sens 3 out.json → out.ext.json .suc2
SẴN SÀNG KIỂM 83ac50147 (+ this line commit)
State: fixes + tests done; shots of the 2 new options NOT done (see report §5). Gap count: 37 audited rows, 22 fixed, 14 open, 1 by design; + 1b list for the agent loop.

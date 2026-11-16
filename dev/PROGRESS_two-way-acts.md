# PROGRESS — review/two-way-acts
Task: owner two-way law (16/11 s21). Report: dev/handover/reports/two-way-acts.md (audit table first).
Build: CTM_IMG_BASE= python3 dev/build/assemble.py. Tests: node dev/test/two-way-acts.js <html>; node dev/test/two-way-oldsave.js file://<main.html> file://<this.html> 40; node dev/test/coop-e2e.js <out>.
Bot: GAME=<html> INP=inpage6.js INP2=insuc2.js node dev/measure/runb.js sens 3 out.json → out.ext.json .suc2
SẴN SÀNG KIỂM 63dc408a0
State: r2 done — shots taken (Fold + iPad), Fold person-card kit bug fixed (jk3 one CSS line), rows 23/25/26/31/32 + ECONOMY.md line done. Gap count: 37 audited rows, 27 fixed, 9 open (24,27,28,29,30,33,34,35,36), 1 by design; + 1b list for the agent loop.

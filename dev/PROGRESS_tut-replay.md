# PROGRESS tut-replay
Status: DONE, SẴN SÀNG KIỂM ecd2ffb3a (review/tut-replay). Report: dev/handover/reports/tut-replay.md.
Root cause: serQ saved the open ☰ menu card; reloading the slot ("Tiếp tục"/replay) brought it back. Fix in j3 (serQ/deserQ), j74 (kitMenuResume), jtut (replay uses it). Test dev/test/tut-replay.js 20/20 Fold + iPad, Thiết lập 10/10.
Left: reviewer (SMALL tier). Do not push to main from the worker.

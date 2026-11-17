PRIORITY #1 CHECK ('bot-proof|ctxTaste|ctxCap'): OD 0 | ledger 0 | claims 7 | main 6 | review/* 0; ('rank pressure|ration'): OD 24 | ledger 1 | claims 8 | main 15 | review/* 0; ('Giả bệnh'): OD 0 | claims 1 | main 15; own grep: jecon BAL.pay/duty/wage/banThuong + BAL.promo.cap (rank costs exist → reuse), jty BAL.ty rob*, jevb ctxTaste/ctxCap, dev/measure inpage6/instory/indanhlog/evbot → extended, no new system.
# BALANCE-2 — worker report (D8, session_01964izCgvagC6fUGWVGhXHy, opus)
START_CTX ≈ 5 % of the 1M window (get_session reads 0; estimate). Rollover at 30 %, ceiling 60 %.
Branch **review/balance-2** = review/balance-core-r2 baff0824 + origin/main 6c4f21c3 + review/story-bot 0e8f8ff8.

## STATUS (WIP, updated as work lands)
- DONE: (1) inpage6 c.off fix. (3) Giả bệnh one-core + honest card; typed card chances family → BAL.rk (riskscan.py 16 → 0); hidden-risk family: map spot robbery risk shown. (9) clamps + raised-maid Danh.
- BOT FAULT FOUND (all earlier sens-bot balance numbers affected): inpage6 scoreAct/talkScore did `- costW(a.c)` where costW is the (negative) price → every price counted as a GAIN; the bot chose dear acts and fell into «Giả bệnh» 11.6×/life. Fixed (`+costW`). Story-bot P2 "HH 0/30" and fault-2 numbers were measured with this bug.
- RUNNING: 150-life "before" (game_base = branch before balance-2 game changes, fixed bot), Vừa, 8-year cap, /home/user/wt/b2out/before. Then fixes for 2/5/6, "after" run, bot-proof arms (inevpick.js), §7 Sủng curve arms.
- Tools: dev/measure/runbal2.sh (runner), inbal2.js (rank pressure, promotion-gate months, punish her/NPC), anbal2.py (--flow --pun --press --gate --orig), inevpick.js (hint/rand/same event pickers on the sens bot), riskscan.py.

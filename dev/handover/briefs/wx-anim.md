PRIORITY #1 CHECK ('weather animation PX rain snow'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 (by hand: OD L1678 (h)(i) + L1665 (3); main 03a776e4 weather-khac LIVE: j11 PX parts, jwxk BAL.wx.day.fxLv, KIT §56.2; claims C-AG)
# WX-ANIM — weather animation audit + fill (sonnet; UI/fx; Foreman C-AG)
Read: dev/rules/START_CORE.md + START_WORKER.md (handover branch); dev/OWNER_DECISIONS.md L1665 + L1678 (h)(i) VERBATIM; dev/kit/KIT.md §56 + KIT_REQUESTS.md (main); dev/handover/reports/review-weather-khac-r1.md + weather-khac.md.
Branch: review/wx-anim from origin/main (03a776e4 or later).
DO:
1. AUDIT TABLE first: every WX kind (j12 WX + WX_KH) × season × nhẹ/vừa/nặng → which animation plays today (j11 PX parts: rain 3 levels, snow p/h, petal, leaf, dust, mist, frost, wind, storm…), on which surfaces (nền tranh / Dư đồ / room). Mark MISSING.
2. FILL every missing kind/level with the EXISTING particle/fx system and BAL numbers (gió lớn, gió bấc, sương mù, nắng gắt, trời âm u included; levels must be clearly different). No new private CSS look: changes go in the shared fx part so every surface gets them (KIT FIRST, whole group). New painted sprites needed → ART REQUEST line for Foreman C in dev/kit/KIT_REQUESTS.md (do not draw).
3. (i) NO second weather icon on the nền tranh: find any duplicate weather icon on scene backdrops and keep only the one kit place.
4. Shots: Fold 755x1000 + iPad 1180x820, one per kind at nặng + one nhẹ vs nặng pair (close the Luân hồi intro first); perf on Fold (no frame drop vs main); QUICKCHECK --cpu 4.
Report dev/handover/reports/wx-anim.md with the table (C-AG forwards it to main s35); send_message C-AG #4 session_01UV1SzkyZBYRFoSWBF8fg27 'SẴN SÀNG KIỂM <sha>' (SMALL review). No push main, no PR. Roll over at START_CTX + 25 % (ceiling 60 %).

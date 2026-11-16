# road-b2 — helper B2 (nc + bd branch, td, ch roads .5–.11)
START_CTX ~4 % of a 1M window (session_01N1tNP4zDh6M8kQNxdcYKvM). Branch `review/road-b2` off review/road-map @ 240c68a7.
Coordinator: Foreman B s6 (session_01N1tNP2qaiWybrEsrX5iL9y). Engine owner: session_01N1tNP4TguHSiLpDgAN6EDF.

## Status (WIP)
- 12 roads × 7 chapters (nc_gian, nc_su, nc_tuc, nc_vuong, td_an, td_ke, td_song, td_tha, ch_co, ch_benh, ch_ho, ch_bi) being written
  as fragments in dev/build/rdparts/ then joined into dev/build/jrd_nc.js / jrd_td.js / jrd_ch.js (assemble.py: after jrd_tt.js).
- Bắc Địch branch (OD:L1213/L1215, ROAD_MAP §1): no engine change. nc chapters use land tokens ({land} {pv} {mh} {quan} {pa} {pb},
  TOK67 keys added in jrd_nc.js, Nam Chiếu / Bắc Địch words) and are registered a second time under the bd premise ids
  (bd_hoa→nc_su, bd_ngua→nc_gian, bd_tuc→nc_tuc, bd_hoang→nc_vuong), so a bd life rolling a bd_* premise gets a full road too;
  .5 has NCW/BDW openings that follow whichever premise was really played.

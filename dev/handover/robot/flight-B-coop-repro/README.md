# flight-B-coop repro: room H77P week 131 stall (arm B, pair 1, SWAP=0, SEED=1)
Build: local merge lc12-varC9 4232709a + robot-fix-cnv-2 fe3cb80c (not pushed), coop harness 5127e083.
- Stall: no room week step for 240 s at week 131 (buoi 3). Seats: host fold (X), guest ipad (Y).
- Host: TAI NGHE Khao hach overlay (#ov z32, Mon 1/2) open, close button reachable.
- Guest: #modal «Ke hau» (pics fig-maid-m15-a18, ev-cung-nhan, act-thuong-vo-co-h), all 4 options (disabled); Q=1.
- Save (guest page, repro): coop-20261125-0224-p1-1-yr97b6.json (S.bac=117, sung 0, danh 26, suc 92, year 4). Harness logs card title only, no card id.
- JS error in the same room (host): «Cannot read properties of undefined (reading 'off')», message only, no stack.
- Screenshots: not in git (rule: shots never in git); they stay on the runner at /home/user/wt/flightB-out/shots; the stuck table in the .md has the text dump of the layers/buttons.
- Full run bug file: coop-20261125-0224-p1-1.md/.json (partial, run still going).

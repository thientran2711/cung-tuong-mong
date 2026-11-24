# ROBOT-10 CO-OP run coop-20261124-1356-p4-4 (UTC)

Game: dev/index.html of this checkout (assemble.py) · Worker https://ctm-coop.victoria-tntt.workers.dev · 1 pairs (1 planned) × 10 kiếp per seat · X (Fold 755x1000) hosts, Y (iPad 1180x820) joins · 1 parallel · wall 18.9 min
Runner: node dev/measure/robot10-coop.js 4 4 10 /home/user/wt/u3b-out · harness 5a65a561 (RESUMED: «since this process started» counts only hits of this harness) (SEED=1) · repro: a save from saves/ into localStorage "hclh-save-v2-1", «Tiếp tục kiếp này» (Ô 1) for the seat's own state; co-op bugs reproduce with the same pair + SEED

## Bugs (12 distinct; one row per bug, pairs = how many pairs hit it)

1. **stuck** — co-op room stuck: no room week step in 240 s
   - pairs 1/1 (coop-p04-S1) · hits 5 (0 since this process started, harness 5a65a561)
   - first: host {"buoi":3,"week":10,"bend":false,"pendBuoi":null,"pend":false,"sent":9,"Q":0,"Qt":[],"mh":true,"mg":false,"dead":false,"next":true,"title":false,"st":"open","peer":true} || guest {"buoi":3,"week":10,"bend":false,"pendBuoi":null,"pend":false,"sent":9,"Q":0,"Qt":[],"mh":true,"mg":false,"dead":false,"next":true,"title":false,"st":"open","peer":true}
   - last: host {"buoi":3,"week":14,"bend":false,"pendBuoi":null,"pend":false,"sent":13,"Q":0,"Qt":[],"mh":true,"mg":false,"dead":false,"next":true,"title":false,"st":"open","peer":true} || guest {"buoi":3,"week":14,"bend":false,"pendBuoi":null,"pend":false,"sent":13,"Q":0,"Qt":[],"mh":true,"mg":false,"dead":false,"next":true,"title":false,"st":"open","peer":true}
   - screenshots: shots/coop-p04-S1-r1-host-stuck.png, shots/coop-p04-S1-r1-guest-stuck.png (not in git)

2. **coop-world** — world differs between the two screens: consorts differ (id/name/rank/alive/out/kids)
   - pairs 1/1 (coop-p04-S1) · hits 2 (0 since this process started, harness 5a65a561)
   - first: week 27 · host-only [] guest-only [1001:Tiêu Hàm Yên:0:1:0:] · origins td/dtq
   - last: week 29 · host-only [3:Cố Như Ý:3:1:0:] guest-only [3:Cố Như Ý:2:1:0:] · origins td/dtq

3. **save** — save→load→save changes the state (host)
   - pairs 1/1 (coop-p04-S1) · hits 90 (8 since this process started, harness 5a65a561)
   - first: save.R.0.rl.2: 14 → 9
   - last: save.R.0.rl.2: 1 → 2

4. **number** — stat out of range: bac
   - pairs 1/1 (coop-p04-S1) · hits 20 (0 since this process started, harness 5a65a561)
   - first: bac=-13 · ipad guest week 7
   - last: bac=-10 · ipad guest week 38

5. **number** — stat out of range: sung
   - pairs 1/1 (coop-p04-S1) · hits 4 (4 since this process started, harness 5a65a561)
   - first: sung=-1 · ipad guest week 19
   - repro save: saves/coop-20261124-1356-p4-4-310db3.json

6. **coop-pos** — where one sees the friend ≠ where the friend is
   - pairs 1/1 (coop-p04-S1) · hits 110 (36 since this process started, harness 5a65a561)
   - first: buổi 1.3 host sees guest at P:b, guest is at r5 · {"host":{"fpos":"1.3 home life1 Ôn Thuần Nguyên","me":"1.3 r902","life":0,"f":"902 Ôn Thuần Nguyên pal r902 where r902","thl":0,"h7":null},"guest":{"fpos":"1.3 r902 life0 Nhâm Thải Vi","me":"1.3 home","life":1,"f":"901 Nhâm Thải Vi pal r2 where home","thl":0,"h7":null}}
   - last: buổi 17.3 guest sees host at P:a, host is at r4 · {"host":{"fpos":"17.3 home life2 Khương Yên Nhiên","me":"17.3 home","life":0,"f":"902 Khương Yên Nhiên pal r902 where r902","thl":0,"h7":null},"guest":{"fpos":"17.3 home life0 La Lưu Ly","me":"17.3 home","life":2,"f":"901 La Lưu Ly pal r901 where r901","thl":0,"h7":null}}

7. **coop-stat** — the friend's Sủng/Danh/Sức shown ≠ her own (one buổi late or wrong)
   - pairs 1/1 (coop-p04-S1) · hits 17 (6 since this process started, harness 5a65a561)
   - first: buổi 2.3: host sees guest 25/19/99 (guest 25/19/100) · guest sees host 19/0/96 (host 19/0/96)
   - last: buổi 17.3: host sees guest 3/0/100 (guest 3/0/100) · guest sees host 23/19/93 (host 23/16/93)

8. **lag** — co-op LAG budget miss: coopTurnP95
   - pairs 1/1 (coop-p04-S1) · hits 16 (1 since this process started, harness 5a65a561)
   - first: coopTurnP95 32062 > 10000 · game year 1 · room BXUK · per device {"fold":{"seat":"host","kbPerMin":901.7,"upKB":1851,"dnKB":718,"posFlip":null,"resend":9,"resendBy":{"act":8,"where":1},"longTasksPerMin":253.1,"longTaskMax":1471,"errs":0},"ipad":{"seat":"guest","kbPerMin":778.1,"upKB":1189,"dnKB":1028,"posFlip":null,"resend":24,"resendBy":{"act":23,"pos":1},"longTasksPerMin":280.8,"longTaskMax":256
   - last: coopTurnP95 109405 > 10000 · game year 1 · room TGVC · per device {"fold":{"seat":"host","kbPerMin":546.3,"upKB":2860,"dnKB":454,"posFlip":null,"resend":41,"resendBy":{"act":39,"bend":1,"where":1},"longTasksPerMin":235.1,"longTaskMax":1471,"errs":0},"ipad":{"seat":"guest","kbPerMin":504.5,"upKB":1609,"dnKB":1450,"posFlip":null,"resend":39,"resendBy":{"act":32,"pos":7},"longTasksPerMin":298.3,"long

9. **lag** — co-op LAG budget miss: coopSyncKBMax
   - pairs 1/1 (coop-p04-S1) · hits 11 (0 since this process started, harness 5a65a561)
   - first: coopSyncKBMax 168.1 > 100 · game year 1 · room BXUK · per device {"fold":{"seat":"host","kbPerMin":901.7,"upKB":1851,"dnKB":718,"posFlip":null,"resend":9,"resendBy":{"act":8,"where":1},"longTasksPerMin":253.1,"longTaskMax":1471,"errs":0},"ipad":{"seat":"guest","kbPerMin":778.1,"upKB":1189,"dnKB":1028,"posFlip":null,"resend":24,"resendBy":{"act":23,"pos":1},"longTasksPerMin":280.8,"longTaskMax":256
   - last: coopSyncKBMax 271.7 > 100 · game year 2 · room UM4N · per device {"fold":{"seat":"host","kbPerMin":716.1,"upKB":44807,"dnKB":9206,"posFlip":null,"resend":194,"resendBy":{"where":13,"act":169,"pos":11,"bend":1},"longTasksPerMin":261.2,"longTaskMax":1789,"errs":0},"ipad":{"seat":"guest","kbPerMin":568.6,"upKB":26378,"dnKB":16511,"posFlip":null,"resend":207,"resendBy":{"act":151,"pos":56},"longTasksP

10. **lag** — co-op buổi stall (both ready, the room took > 30 s or never stepped)
   - pairs 1/1 (coop-p04-S1) · hits 16 (1 since this process started, harness 5a65a561)
   - first: 2 of 23 buổi in game year 1
   - last: 8 of 23 buổi in game year 1

11. **lag** — co-op LAG budget miss: coopResendPerMin
   - pairs 1/1 (coop-p04-S1) · hits 1 (0 since this process started, harness 5a65a561)
   - first: coopResendPerMin 16.7 > 12 · game year 1 · room 5GV5 · per device {"fold":{"seat":"host","kbPerMin":897,"upKB":2039,"dnKB":832,"posFlip":null,"resend":38,"resendBy":{"act":35,"bend":1,"where":2},"longTasksPerMin":269.9,"longTaskMax":1362,"errs":0},"ipad":{"seat":"guest","kbPerMin":870.6,"upKB":1473,"dnKB":1313,"posFlip":null,"resend":69,"resendBy":{"act":63,"pos":6},"longTasksPerMin":273.7,"longTa

12. **lag** — co-op LAG budget miss: coopActionP95
   - pairs 1/1 (coop-p04-S1) · hits 2 (0 since this process started, harness 5a65a561)
   - first: coopActionP95 9566 > 8000 · game year 1 · room UM4N · per device {"fold":{"seat":"host","kbPerMin":661.7,"upKB":17363,"dnKB":2791,"posFlip":null,"resend":66,"resendBy":{"act":57,"where":5,"pos":4},"longTasksPerMin":271.7,"longTaskMax":1648,"errs":0},"ipad":{"seat":"guest","kbPerMin":590.1,"upKB":11089,"dnKB":6886,"posFlip":null,"resend":113,"resendBy":{"act":98,"pos":14,"bend":1},"longTasksPerMin"
   - last: coopActionP95 11450 > 8000 · game year 2 · room UM4N · per device {"fold":{"seat":"host","kbPerMin":716.1,"upKB":44807,"dnKB":9206,"posFlip":null,"resend":194,"resendBy":{"where":13,"act":169,"pos":11,"bend":1},"longTasksPerMin":261.2,"longTaskMax":1789,"errs":0},"ipad":{"seat":"guest","kbPerMin":568.6,"upKB":26378,"dnKB":16511,"posFlip":null,"resend":207,"resendBy":{"act":151,"pos":56},"longTasks


## Lives (6; 0 ended by the wall cap = not a game ending)

| pair | player | seat | device | kiếp | thân phận | ending | max rank | years | wall min | room |
|---|---|---|---|---|---|---|---|---|---|---|
| coop-p04-S1 | X | host | fold | 1 | cn/cn_chu | Xuất gia [thường: Xuất gia] | Thường tại | 0.33 | 20.1 | XCNH |
| coop-p04-S1 | Y | guest | ipad | 1 | ch/ch_ho | Xuất gia [thường: Xuất gia] | Thường tại | 0.08 | 2.3 | 5GV5 |
| coop-p04-S1 | Y | guest | ipad | 2 | pf/pt_dang | Xuất gia [thường: Xuất gia] | Đáp ứng | 0.5 | 7.3 | 9PXX |
| coop-p04-S1 | Y | guest | ipad | 3 | dtq/dtq_bien | Xuất gia [thường: Xuất gia] | Thường tại | 0.83 | 8.1 | 9PXX |
| coop-p04-S1 | Y | guest | ipad | 4 | nc/nc_su | Xuất gia [thường: Xuất gia] | Quý nhân | 1.75 | 99.5 | UM4N |
| coop-p04-S1 | Y | guest | ipad | 5 | thd/thd_tro | Phế làm thứ dân [thường: Phế làm thứ dân, xuất cung] | Đáp ứng | 0.17 | 0.2 | TGVC |

## LAG set (per pair room and game year; coop-lag-hooks keys; fold = X, ipad = Y)

| pair | room | game year | min | buổi | turn p95 | action p95 | sync KB max | KB/min | resend/min | long tasks/min | long max | fold KB/min · lt/min | ipad KB/min · lt/min |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| coop-p04-S1 | BXUK | 1 | 2.85 | 23 | 32062 | 2483 | 168.1 | 831.9 | 5.8 | 267 | 2568 | 901.7 · 253.1 | 778.1 · 280.8 |
| coop-p04-S1 | BXUK | 1 (end) | 6.5 | 19 | 43902 | 4114 | 73.5 | 491.6 | 4.7 | 310.7 | 2247 | 527.1 · 343.3 | 459.4 · 278.2 |
| coop-p04-S1 | XCNH | 1 | 11.01 | 23 | 168576 | 1707 | 167 | 385.8 | 4.2 | 268.5 | 2069 | 380.8 · 228.9 | 395.1 · 308.1 |
| coop-p04-S1 | XCNH | 1 (end) | 16.63 | 40 | 111798 | 2998 | 158.4 | 576.1 | 4.9 | 333.4 | 2625 | 573.7 · 307.5 | 582.2 · 359.2 |
| coop-p04-S1 | 5GV5 | 1 | 3.2 | 23 | 32301 | 2017 | 200.9 | 883.8 | 16.7 | 271.8 | 2053 | 897 · 269.9 | 870.6 · 273.7 |
| coop-p04-S1 | 5GV5 | 1 (end) | 17.29 | 47 | 113777 | 6910 | 98.4 | 566.3 | 4 | 276.8 | 2350 | 598.8 · 281.3 | 536 · 272.4 |
| coop-p04-S1 | 9PXX | 1 | 2.67 | 22 | 30664 | 1920 | 170.2 | 923.7 | 6.7 | 282.7 | 2410 | 941.6 · 257.1 | 905.9 · 308.4 |
| coop-p04-S1 | 9PXX | 1 | 14.17 | 89 | 45647 | 3144 | 112.2 | 1112.7 | 5.6 | 235 | 2783 | 1151.8 · 221.9 | 1076.5 · 248.1 |
| coop-p04-S1 | 9PXX | 2 (end) | 8.18 | 19 | 120359 | 2566 | 114 | 625 | 3.3 | 246.2 | 2102 | 666.8 · 255.2 | 587.1 · 237.2 |
| coop-p04-S1 | RRJP | 1 | 3.24 | 23 | 34574 | 2573 | 169.9 | 808.3 | 6.5 | 259.1 | 2375 | 822.1 · 247.8 | 794.6 · 270.4 |
| coop-p04-S1 | RRJP | 1 (end) | 15.91 | 32 | 121419 | 4730 | 184.8 | 451.7 | 4.5 | 282.7 | 2578 | 480.2 · 286.6 | 427.8 · 278.9 |
| coop-p04-S1 | B66W | 1 | 3.21 | 22 | 36701 | 3087 | 65.6 | 736.8 | 9 | 255.9 | 2431 | 779.4 · 234.9 | 694.3 · 276.9 |
| coop-p04-S1 | UM4N | 1 | 2.74 | 24 | 30122 | 2387 | 61.1 | 747.5 | 7.9 | 279.6 | 2186 | 798.1 · 272.5 | 710.8 · 286.8 |
| coop-p04-S1 | UM4N | 1 | 30.46 | 92 | 129905 | 9566 | 159.4 | 625.9 | 2.9 | 279.1 | 2467 | 661.7 · 271.7 | 590.1 · 286.5 |
| coop-p04-S1 | UM4N | 2 | 75.42 | 140 | 132889 | 11450 | 271.7 | 642.4 | 2.7 | 269.3 | 2576 | 716.1 · 261.2 | 568.6 · 277.4 |
| coop-p04-S1 | TGVC | 1 | 6.07 | 23 | 109405 | 2189 | 91.6 | 525.4 | 6.6 | 266.7 | 2385 | 546.3 · 235.1 | 504.5 · 298.3 |

## Rooms

| pair | room | host | weeks | buổi | min | turn p95 ms | NPC place diffs | friend-position diffs | friend-stat lags | rejoin ms |
|---|---|---|---|---|---|---|---|---|---|---|
| coop-p04-S1 | BXUK | X | 10 | 45 | 9.5 | 32440 | 0 | 0 | 0 | 5546 |
| coop-p04-S1 | XCNH | X | 16 | 69 | 27.7 | 117147 | 0 | 20 | 3 | 5866 |
| coop-p04-S1 | 5GV5 | X | 18 | 77 | 20.6 | 113046 | 0 | 0 | 0 | 6851 |
| coop-p04-S1 | 9PXX | X | 34 | 142 | 25.3 | 45672 | 0 | 0 | 0 | 6407 |
| coop-p04-S1 | RRJP | X | 14 | 61 | 19.2 | 120023 | 0 | 2 | 0 | 7463 |
| coop-p04-S1 | B66W | X | 14 | 25 | undefined | undefined | 0 | 8 | 0 | 7589 |
| coop-p04-S1 | UM4N | X | 71 | 267 | undefined | undefined | 0 | 44 | 8 | 6044 |
| coop-p04-S1 | TGVC | X | 20 | 25 | undefined | undefined | 0 | 36 | 6 | 6754 |

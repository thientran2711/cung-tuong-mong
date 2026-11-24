# ROBOT-10 CO-OP run coop-20261124-1356-p4-4 (UTC)

Game: dev/index.html of this checkout (assemble.py) · Worker https://ctm-coop.victoria-tntt.workers.dev · 1 pairs (1 planned) × 10 kiếp per seat · X (Fold 755x1000) hosts, Y (iPad 1180x820) joins · 1 parallel · wall 58.4 min
Runner: node dev/measure/robot10-coop.js 4 4 10 /home/user/wt/u3b-out · harness d4b4408d (RESUMED: «since this process started» counts only hits of this harness) (SEED=1) · repro: a save from saves/ into localStorage "hclh-save-v2-1", «Tiếp tục kiếp này» (Ô 1) for the seat's own state; co-op bugs reproduce with the same pair + SEED

## Bugs (16 distinct; one row per bug, pairs = how many pairs hit it)

1. **stuck** — co-op room stuck: no room week step in 240 s
   - pairs 1/1 (coop-p04-S1) · hits 5 (0 since this process started, harness d4b4408d)
   - first: host {"buoi":3,"week":10,"bend":false,"pendBuoi":null,"pend":false,"sent":9,"Q":0,"Qt":[],"mh":true,"mg":false,"dead":false,"next":true,"title":false,"st":"open","peer":true} || guest {"buoi":3,"week":10,"bend":false,"pendBuoi":null,"pend":false,"sent":9,"Q":0,"Qt":[],"mh":true,"mg":false,"dead":false,"next":true,"title":false,"st":"open","peer":true}
   - last: host {"buoi":3,"week":14,"bend":false,"pendBuoi":null,"pend":false,"sent":13,"Q":0,"Qt":[],"mh":true,"mg":false,"dead":false,"next":true,"title":false,"st":"open","peer":true} || guest {"buoi":3,"week":14,"bend":false,"pendBuoi":null,"pend":false,"sent":13,"Q":0,"Qt":[],"mh":true,"mg":false,"dead":false,"next":true,"title":false,"st":"open","peer":true}
   - screenshots: shots/coop-p04-S1-r1-host-stuck.png, shots/coop-p04-S1-r1-guest-stuck.png (not in git)

2. **stuck** — co-op room stuck: no room week step in 600 s
   - pairs 1/1 (coop-p04-S1) · hits 3 (0 since this process started, harness d4b4408d)
   - first: host {"buoi":3,"week":20,"bend":false,"pendBuoi":null,"pend":false,"sent":19,"Q":0,"Qt":[],"mh":true,"mg":false,"dead":false,"next":true,"title":false,"st":"open","peer":true} || guest {"buoi":3,"week":20,"bend":false,"pendBuoi":null,"pend":false,"sent":19,"Q":0,"Qt":[],"mh":true,"mg":false,"dead":false,"next":true,"title":false,"st":"open","peer":true}
   - last: host {"buoi":3,"week":9,"bend":false,"pendBuoi":null,"pend":false,"sent":8,"Q":0,"Qt":[],"mh":true,"mg":false,"dead":false,"next":true,"title":false,"st":"open","peer":true} || guest {"buoi":3,"week":9,"bend":false,"pendBuoi":null,"pend":false,"sent":8,"Q":0,"Qt":[],"mh":true,"mg":false,"dead":false,"next":true,"title":false,"st":"open","peer":true}
   - screenshots: shots/coop-p04-S1-r8-host-stuck.png, shots/coop-p04-S1-r8-guest-stuck.png (not in git)

3. **coop-world** — world differs between the two screens: consorts differ (id/name/rank/alive/out/kids)
   - pairs 1/1 (coop-p04-S1) · hits 2 (0 since this process started, harness d4b4408d)
   - first: week 27 · host-only [] guest-only [1001:Tiêu Hàm Yên:0:1:0:] · origins td/dtq
   - last: week 29 · host-only [3:Cố Như Ý:3:1:0:] guest-only [3:Cố Như Ý:2:1:0:] · origins td/dtq

4. **save** — save→load→save changes the state (host)
   - pairs 1/1 (coop-p04-S1) · hits 137 (0 since this process started, harness d4b4408d)
   - first: save.R.0.rl.2: 14 → 9
   - last: save.S.logs.0 (text differs at char 39): «…ss="ld">T1/3 trung tuần</span><b>Tết Nguyên tiêu · Lễ</b>: Xin đứng hầ» → «…ss="ld">T1/3 trung tuần</span>Thường tại Phú Sát Lục Hoán Bích dời san»

5. **save** — save→load→save changes R[].rl[] (host)
   - pairs 1/1 (coop-p04-S1) · hits 23 (23 since this process started, harness d4b4408d)
   - first: save.R.0.rl.3: 7 → 8
   - last: save.R.0.rl.5: 12 → 9
   - repro save: saves/coop-20261124-1356-p4-4-106byi2.json

6. **save** — save→load→save changes S.logs[] (guest)
   - pairs 1/1 (coop-p04-S1) · hits 1 (1 since this process started, harness d4b4408d)
   - first: save.S.logs.0 (text differs at char 39): «…ss="ld">T8/1 trung tuần</span>Đọc sách giải khuây.» → «…ss="ld">T8/1 trung tuần</span>Quý nhân Giang Nhu Gia dời sang Minh Hòa»
   - repro save: saves/coop-20261124-1356-p4-4-1fxd3ju.json

7. **number** — stat out of range: bac
   - pairs 1/1 (coop-p04-S1) · hits 48 (17 since this process started, harness d4b4408d)
   - first: bac=-13 · ipad guest week 7
   - last: bac=-16 · ipad guest week 49

8. **number** — stat out of range: sung
   - pairs 1/1 (coop-p04-S1) · hits 18 (0 since this process started, harness d4b4408d)
   - first: sung=-1 · ipad guest week 19
   - last: sung=-2 · ipad guest week 23

9. **number** — option text «Bạc +8» but the effect applies bac=20
   - pairs 1/1 (coop-p04-S1) · hits 1 (0 since this process started, harness d4b4408d)
   - first: «Nhận bạc, làm tai mắt | mỗi tháng Bạc +8 · kèm: mỗi tháng chủ phát hiện: khả năng thấp; khi ấy bị đánh chết: không có khả năng, không thì Tân Giả khố 10 tuần» in «Bạc lạ» fx={"bac":20} @ năm 2 th12 t0 b0 (buổi #268) · guest ipad

10. **coop-pos** — where one sees the friend ≠ where the friend is
   - pairs 1/1 (coop-p04-S1) · hits 157 (17 since this process started, harness d4b4408d)
   - first: buổi 1.3 host sees guest at P:b, guest is at r5 · {"host":{"fpos":"1.3 home life1 Ôn Thuần Nguyên","me":"1.3 r902","life":0,"f":"902 Ôn Thuần Nguyên pal r902 where r902","thl":0,"h7":null},"guest":{"fpos":"1.3 r902 life0 Nhâm Thải Vi","me":"1.3 home","life":1,"f":"901 Nhâm Thải Vi pal r2 where home","thl":0,"h7":null}}
   - last: buổi 51.3 host sees guest at r10, guest is at r6 · {"host":{"fpos":"51.3 home life2 Hách Hải Lan","me":"51.3 home","life":0,"f":"902 Hách Hải Lan pal r10 where r10","thl":0,"h7":null},"guest":{"fpos":"51.3 home life0 Tư Mã Ngữ Yên","me":"51.3 home","life":2,"f":"901 Tư Mã Ngữ Yên pal r4 where r4","thl":0,"h7":null}}

11. **coop-stat** — the friend's Sủng/Danh/Sức shown ≠ her own (one buổi late or wrong)
   - pairs 1/1 (coop-p04-S1) · hits 25 (5 since this process started, harness d4b4408d)
   - first: buổi 2.3: host sees guest 25/19/99 (guest 25/19/100) · guest sees host 19/0/96 (host 19/0/96)
   - last: buổi 38.3: host sees guest 39/14/91 (guest 39/6/91) · guest sees host 76/87/91 (host 76/87/91)

12. **lag** — co-op LAG budget miss: coopTurnP95
   - pairs 1/1 (coop-p04-S1) · hits 27 (2 since this process started, harness d4b4408d)
   - first: coopTurnP95 32062 > 10000 · game year 1 · room BXUK · per device {"fold":{"seat":"host","kbPerMin":901.7,"upKB":1851,"dnKB":718,"posFlip":null,"resend":9,"resendBy":{"act":8,"where":1},"longTasksPerMin":253.1,"longTaskMax":1471,"errs":0},"ipad":{"seat":"guest","kbPerMin":778.1,"upKB":1189,"dnKB":1028,"posFlip":null,"resend":24,"resendBy":{"act":23,"pos":1},"longTasksPerMin":280.8,"longTaskMax":256
   - last: coopTurnP95 41304 > 10000 · game year 1 · room RSKR · per device {"fold":{"seat":"host","kbPerMin":1332.9,"upKB":15048,"dnKB":3747,"posFlip":null,"resend":54,"resendBy":{"act":43,"where":10,"pos":1},"longTasksPerMin":220.7,"longTaskMax":1383,"errs":0},"ipad":{"seat":"guest","kbPerMin":1067.7,"upKB":10753,"dnKB":4303,"posFlip":null,"resend":103,"resendBy":{"act":99,"pos":4},"longTasksPerMin":240.1,

13. **lag** — co-op LAG budget miss: coopSyncKBMax
   - pairs 1/1 (coop-p04-S1) · hits 20 (1 since this process started, harness d4b4408d)
   - first: coopSyncKBMax 168.1 > 100 · game year 1 · room BXUK · per device {"fold":{"seat":"host","kbPerMin":901.7,"upKB":1851,"dnKB":718,"posFlip":null,"resend":9,"resendBy":{"act":8,"where":1},"longTasksPerMin":253.1,"longTaskMax":1471,"errs":0},"ipad":{"seat":"guest","kbPerMin":778.1,"upKB":1189,"dnKB":1028,"posFlip":null,"resend":24,"resendBy":{"act":23,"pos":1},"longTasksPerMin":280.8,"longTaskMax":256
   - last: coopSyncKBMax 194.3 > 100 · game year 1 · room RSKR · per device {"fold":{"seat":"host","kbPerMin":1332.9,"upKB":15048,"dnKB":3747,"posFlip":null,"resend":54,"resendBy":{"act":43,"where":10,"pos":1},"longTasksPerMin":220.7,"longTaskMax":1383,"errs":0},"ipad":{"seat":"guest","kbPerMin":1067.7,"upKB":10753,"dnKB":4303,"posFlip":null,"resend":103,"resendBy":{"act":99,"pos":4},"longTasksPerMin":240.1,

14. **lag** — co-op buổi stall (both ready, the room took > 30 s or never stepped)
   - pairs 1/1 (coop-p04-S1) · hits 26 (2 since this process started, harness d4b4408d)
   - first: 2 of 23 buổi in game year 1
   - last: 18 of 91 buổi in game year 1

15. **lag** — co-op LAG budget miss: coopResendPerMin
   - pairs 1/1 (coop-p04-S1) · hits 1 (0 since this process started, harness d4b4408d)
   - first: coopResendPerMin 16.7 > 12 · game year 1 · room 5GV5 · per device {"fold":{"seat":"host","kbPerMin":897,"upKB":2039,"dnKB":832,"posFlip":null,"resend":38,"resendBy":{"act":35,"bend":1,"where":2},"longTasksPerMin":269.9,"longTaskMax":1362,"errs":0},"ipad":{"seat":"guest","kbPerMin":870.6,"upKB":1473,"dnKB":1313,"posFlip":null,"resend":69,"resendBy":{"act":63,"pos":6},"longTasksPerMin":273.7,"longTa

16. **lag** — co-op LAG budget miss: coopActionP95
   - pairs 1/1 (coop-p04-S1) · hits 9 (1 since this process started, harness d4b4408d)
   - first: coopActionP95 9566 > 8000 · game year 1 · room UM4N · per device {"fold":{"seat":"host","kbPerMin":661.7,"upKB":17363,"dnKB":2791,"posFlip":null,"resend":66,"resendBy":{"act":57,"where":5,"pos":4},"longTasksPerMin":271.7,"longTaskMax":1648,"errs":0},"ipad":{"seat":"guest","kbPerMin":590.1,"upKB":11089,"dnKB":6886,"posFlip":null,"resend":113,"resendBy":{"act":98,"pos":14,"bend":1},"longTasksPerMin"
   - last: coopActionP95 16160 > 8000 · game year 1 · room RSKR · per device {"fold":{"seat":"host","kbPerMin":1332.9,"upKB":15048,"dnKB":3747,"posFlip":null,"resend":54,"resendBy":{"act":43,"where":10,"pos":1},"longTasksPerMin":220.7,"longTaskMax":1383,"errs":0},"ipad":{"seat":"guest","kbPerMin":1067.7,"upKB":10753,"dnKB":4303,"posFlip":null,"resend":103,"resendBy":{"act":99,"pos":4},"longTasksPerMin":240.1


## Lives (20; 0 ended by the wall cap = not a game ending)

| pair | player | seat | device | kiếp | thân phận | ending | max rank | years | wall min | room |
|---|---|---|---|---|---|---|---|---|---|---|
| coop-p04-S1 | X | host | fold | 1 | cn/cn_chu | Xuất gia [thường: Xuất gia] | Thường tại | 0.33 | 20.1 | XCNH |
| coop-p04-S1 | Y | guest | ipad | 1 | ch/ch_ho | Xuất gia [thường: Xuất gia] | Thường tại | 0.08 | 2.3 | 5GV5 |
| coop-p04-S1 | Y | guest | ipad | 2 | pf/pt_dang | Xuất gia [thường: Xuất gia] | Đáp ứng | 0.5 | 7.3 | 9PXX |
| coop-p04-S1 | Y | guest | ipad | 3 | dtq/dtq_bien | Xuất gia [thường: Xuất gia] | Thường tại | 0.83 | 8.1 | 9PXX |
| coop-p04-S1 | Y | guest | ipad | 4 | nc/nc_su | Xuất gia [thường: Xuất gia] | Quý nhân | 1.75 | 99.5 | UM4N |
| coop-p04-S1 | Y | guest | ipad | 5 | thd/thd_tro | Phế làm thứ dân [thường: Phế làm thứ dân, xuất cung] | Đáp ứng | 0.17 | 0.2 | TGVC |
| coop-p04-S1 | Y | guest | ipad | 6 | bd/bd_hen | Phế làm thứ dân [thường: Phế làm thứ dân, xuất cung] | Đáp ứng | 0.42 | 5.1 | 2A4P |
| coop-p04-S1 | Y | guest | ipad | 7 | muoi/muoi_tuoc | Phế làm thứ dân [thường: Phế làm thứ dân, xuất cung] | Đáp ứng | 0.83 | 10.1 | 2A4P |
| coop-p04-S1 | X | host | fold | 2 | td/td_ke | Phế làm thứ dân [thường: Phế làm thứ dân, xuất cung] | Đáp ứng | 0.92 | 27.3 | 2A4P |
| coop-p04-S1 | X | host | fold | 3 | thd/thd_tro | Hồng nhan bạc mệnh [death: Bị ban chết vì trốn khỏi cung] | Đáp ứng | 1.33 | 12.7 | 2A4P |
| coop-p04-S1 | Y | guest | ipad | 8 | td/td_ke | Xuất gia [thường: Xuất gia] | Đáp ứng | 1.42 | 22.6 | 2A4P |
| coop-p04-S1 | Y | guest | ipad | 9 | cnv/cnv_mat | Xuất gia [thường: Xuất gia] | Đáp ứng | 1.58 | 5.7 | 2A4P |
| coop-p04-S1 | X | host | fold | 4 | pf/pt_dang | Hồng nhan bạc mệnh [death: Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 1] | Thường tại | 1.75 | 14.7 | 2A4P |
| coop-p04-S1 | Y | guest | ipad | 10 | tt/tt_mat | Xuất gia [thường: Xuất gia] | Thường tại | 0.08 | 4.2 | HHMS |
| coop-p04-S1 | Y | guest | ipad | 11 (extra) | cn/cn_chu | Phế làm thứ dân [thường: Phế làm thứ dân, xuất cung] | Đáp ứng | 0.17 | 0.2 | 6372 |
| coop-p04-S1 | X | host | fold | 5 | tt/tt_co | Xuất gia [thường: Xuất gia] | Quý nhân | 0.83 | 35.0 | 6372 |
| coop-p04-S1 | Y | guest | ipad | 12 (extra) | ch/ch_benh | Phế làm thứ dân [thường: Phế làm thứ dân, xuất cung] | Thường tại | 1.08 | 48.4 | 6372 |
| coop-p04-S1 | Y | guest | ipad | 13 (extra) | pf/pt_tang | Phế làm thứ dân [thường: Phế làm thứ dân, xuất cung] | Thường tại | 1.42 | 21.2 | 6372 |
| coop-p04-S1 | X | host | fold | 6 | muoi/muoi_lau | Xuất gia [thường: Xuất gia] | Quý nhân | 2 | 81.0 | 6372 |
| coop-p04-S1 | Y | guest | ipad | 14 (extra) | dtq/dtq_huynh | Phế làm thứ dân [thường: Phế làm thứ dân, xuất cung] | Đáp ứng | 0.58 | 8.6 | RSKR |

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
| coop-p04-S1 | TGVC | 1 (end) | 22.89 | 58 | 112114 | 9184 | 170.6 | 564 | 1.7 | 279.8 | 3142 | 604.2 · 282.9 | 526 · 276.7 |
| coop-p04-S1 | 2A4P | 1 | 8.61 | 23 | 111112 | 2012 | 170.1 | 385.8 | 4.2 | 302.7 | 2313 | 400.3 · 301.8 | 371.3 · 303.7 |
| coop-p04-S1 | 2A4P | 1 | 14.69 | 93 | 45012 | 6180 | 107 | 1058.8 | 6.2 | 239.2 | 2446 | 1150.5 · 231.7 | 973 · 246.7 |
| coop-p04-S1 | 2A4P | 2 (end) | 40.84 | 127 | 112430 | 15885 | 204.6 | 791.7 | 3.7 | 187.8 | 2467 | 854.4 · 172.8 | 729.1 · 202.9 |
| coop-p04-S1 | HHMS | 1 | 5.7 | 22 | 89201 | 8068 | 137 | 511.5 | 11.4 | 256.8 | 2138 | 554.4 · 256.1 | 474.8 · 257.5 |
| coop-p04-S1 | HHMS | 1 (end) | 12.18 | 14 | 43711 | 10992 | 140.1 | 356.9 | 3.3 | 321.2 | 2171 | 389 · 278.6 | 328.6 · 363.7 |
| coop-p04-S1 | 6372 | 1 | 2.49 | 23 | 28375 | 2083 | 59.8 | 791.6 | 10.3 | 298.9 | 2056 | 838.9 · 273.4 | 759.3 · 324.5 |
| coop-p04-S1 | 6372 | 1 | 36.1 | 92 | 119079 | 8970 | 172.6 | 641.4 | 5.3 | 336.3 | 2155 | 675.8 · 304.5 | 608.8 · 368 |
| coop-p04-S1 | 6372 | 2 | 70 | 139 | 132447 | 11530 | 241.9 | 653 | 3.8 | 266.5 | 2662 | 709.4 · 253.8 | 596.7 · 279.2 |
| coop-p04-S1 | RSKR | 1 | 3.58 | 21 | 36872 | 4496 | 66.8 | 674.7 | 8 | 249.5 | 1788 | 738.5 · 228.2 | 616.3 · 270.8 |
| coop-p04-S1 | RSKR | 1 | 14.1 | 91 | 41304 | 16160 | 194.3 | 1200.3 | 5.6 | 230.4 | 2297 | 1332.9 · 220.7 | 1067.7 · 240.1 |

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
| coop-p04-S1 | TGVC | X | 20 | 85 | 29.3 | 109405 | 0 | 36 | 6 | 6754 |
| coop-p04-S1 | 2A4P | X | 62 | 254 | 64.3 | 87789 | 0 | 11 | 1 | 6202 |
| coop-p04-S1 | HHMS | X | 9 | 41 | 18.2 | 89201 | 0 | 0 | 0 | 7308 |
| coop-p04-S1 | B6AN | X | 4 | 0 | undefined | undefined | 0 | 0 | 0 |  |
| coop-p04-S1 | 6372 | X | 71 | 271 | undefined | undefined | 0 | 19 | 2 | 5706 |
| coop-p04-S1 | RSKR | X | 52 | 122 | undefined | undefined | 0 | 17 | 5 | 6095 |

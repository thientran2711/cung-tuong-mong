# ROBOT AUDIT — Foreman F lines (owner rules 25/11)

PRIORITY #1 CHECK: robot-audit|realtap → OD 25/11 rows 05:10Z/05:15Z/05:20Z/05:40Z/05:45Z | main 0 audit script | review/* 0 | claims: this worker (ROLE A, F-robot-2511 brief).

Tool: `node dev/measure/robot-audit.js <paths> --only <re>` (handover branch 60a6ae02+). A life is VALID only with real-tap proof (harness{realtap:true,jsClicks:0}), a death / grand / game-imposed ending, and no bot-chosen exit road unless it was the only option. Every life run before the real-tap harness has no realtap proof → INVALID; all need RERUN under the new harness.

## Counts

- FLIGHT 2 round (flight2-*, real-tap harness robot-rt.js, audit 25/11 08:45Z): lives 1 · VALID 1 · INVALID 0 · flight2-s5d (cnv/cnv_mat, quiet, Fold, harness 63f87747) — Xuất cung at age 25 y7 «mở tiệm nhỏ ở kinh thành»: VALID, game-imposed — the last bot tap was «Xin ở lại» (non-exit) at the age-out dialog, then the game ended the life with Xuất cung (exitPick null is correct: the bot never picked the exit). Script fix: robot-audit.js now reads the robot-rt one-life-per-file format (was skipped as «no lives») and uses the last real tap to tell bot exit from game-imposed exit.
- FLIGHT round (flight-*: A-SOLO, A-COOP, B-SOLO, B-COOP): lives 49 · VALID 0 · INVALID 49 · ends exit 34 / death 6 / none 8 / imposed 1 · why JS-click harness 49 / bot-chosen exit road «…» 34 / harness error 7 / wall cap 1  (+ A-SOLO 2 lives from reports/flight-robot.md, both CAP45 → INVALID; A-SOLO JSON was not pushed)
- F ROBOT-10 co-op units (coop-*, U4…U21 + pairs): lives 568 · VALID 0 · INVALID 568 · ends exit 512 / death 54 / none 2 · why JS-click harness 566 / bot-chosen exit road «…» 512 / co-op pair with no finished life 2
- WHOLE dev/handover/robot (all foremen, for B/D/E/MAIN): lives 1568 · VALID 0 · INVALID 1568 · ends none 387 / death 434 / exit 678 / imposed 65 / grand 4 · why JS-click harness 1566 / bot-chosen exit road «…» 678 / wall cap 273 / stuck / timeout 72 / harness error 40 / co-op pair with no finished life 2

RERUN: every one of these lives is INVALID → rerun all under review/robot-realtap (no cap, no exit road, parallel, one robot = one life). Without the JS-click reason, the old lives would still fail on: bot exit road (Xuất gia / Xuất cung về quê / Phế làm thứ dân …) 678, wall cap 273, stuck/timeout 72, harness error 40. The co-op guest seat lost most lives to Xuất gia within year 1–3 (bot pressed the exit road).

Not readable (broken JSON, skipped): coop-20261124-0723-p1-2-s.json, coop-20261124-1356-p4-U3b.json — their lives count as INVALID (no proof).

## Flight round — per life

| round | life | end | valid? | why |
|---|---|---|---|---|
| flight-A-coop-20261125-0520.json | coop-p01-S1 guest k1 cn/cn_ban | Xuất gia (age 20 y1) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| flight-A-coop-20261125-0520.json | coop-p01-S1 guest k2 ch/ch_bi | Xuất gia (age 19 y1) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| flight-A-coop-20261125-0520.json | coop-p01-S1 guest k3 pf/pt_hai | Xuất gia (age 20 y1) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| flight-A-coop-20261125-0520.json | coop-p01-S1 guest k4 dtq/dtq_vu | Xuất gia (age 19 y2) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| flight-A-coop-20261125-0520.json | coop-p01-S1 guest k5 nc/nc_tuc | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 19 y2) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| flight-A-coop-20261125-0520.json | coop-p01-S1 guest k6 thd/thd_hoc | Xuất gia (age 18 y2) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| flight-A-coop-20261125-0520.json | coop-p01-S1 guest k7 bd/bd_san | Xuất gia (age 19 y2) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| flight-A-coop-20261125-0520.json | coop-p01-S1 guest k8 muoi/muoi_lau | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 18 y2) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| flight-A-coop-20261125-0520.json | coop-p01-S1 guest k9 td/td_song | Xuất gia (age 19 y3) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| flight-A-coop-20261125-0520.json | coop-p01-S1 guest k10 cnv/cnv_ma | Xuất gia (age 19 y3) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| flight-A-coop-20261125-0520.json | coop-p01-S1 host k1 tt/tt_co | Hồng nhan bạc mệnh — Sổ Kính sự phòng không ghi đêm thị tẩm nào trước khi có 'th (age 20 y3) | INVALID | JS-click harness (pre-25/11, no realtap proof) |
| flight-A-coop-20261125-0520.json | coop-p01-S1 host k2 muoi/muoi_lau | Xuất gia (age 19 y1) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| flight-A-coop-20261125-0520.json | coop-p01-S1 guest k11 tt/tt_co | Xuất gia (age 18 y1) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| flight-A-coop-20261125-0520.json | coop-p01-S1 guest k12 cn/cn_tinh | Xuất gia (age 20 y1) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| flight-A-coop-20261125-0520.json | coop-p01-S1 guest k13 ch/ch_ho | Xuất gia (age 20 y1) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| flight-A-coop-repro/guest-cold/lives.json | seat guest k1 | Xuất gia (age 20 y1) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| flight-A-coop-repro/guest-cold/lives.json | seat guest k2 | Xuất gia (age 19 y1) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| flight-A-coop-repro/guest-cold/lives.json | seat guest k3 | Xuất gia (age 20 y1) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| flight-A-coop-repro/guest-cold/lives.json | seat guest k4 | Xuất gia (age 19 y2) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| flight-B-coop-20261125-0430.json | coop-p01-S1 guest k1 cn/cn_ban | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 19 y1) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| flight-B-coop-20261125-0430.json | coop-p01-S1 guest k2 ch/ch_bi | Xuất cung về quê (age 21 y3) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất cung về quê» (no proof it was the only option) |
| flight-B-coop-20261125-0430.json | coop-p01-S1 guest k3 pf/pt_hai | Xuất cung về quê (age 20 y3) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất cung về quê» (no proof it was the only option) |
| flight-B-coop-20261125-0430.json | coop-p01-S1 host k1 tt/tt_co | Xuất cung về quê (age 21 y3) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất cung về quê» (no proof it was the only option) |
| flight-B-coop-20261125-0430.json | coop-p01-S1 host k2 muoi/muoi_lau | Xuất cung về quê (age 19 y3) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất cung về quê» (no proof it was the only option) |
| flight-B-coop-20261125-0430.json | coop-p01-S1 host k3 nc/nc_tuc | Xuất gia (age 19 y3) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| flight-B-coop-20261125-0430.json | coop-p01-S1 guest k4 dtq/dtq_vu | Xuất gia (age 19 y4) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| flight-B-coop-20261125-0430.json | coop-p01-S1 guest k5 nc/nc_tuc | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 19 y4) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| flight-B-coop-20261125-0430.json | coop-p01-S1 guest k6 thd/thd_hoc | Xuất cung về quê (age 19 y4) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất cung về quê» (no proof it was the only option) |
| flight-B-coop-20261125-0430.json | coop-p01-S1 host k4 ch/ch_bi | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 21 y4) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| flight-B-coop-20261125-0430.json | coop-p01-S1 guest k7 bd/bd_san | Xuất cung về quê (age 20 y4) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất cung về quê» (no proof it was the only option) |
| flight-B-coop-20261125-0430.json | coop-p01-S1 guest k8 muoi/muoi_lau | Xuất gia (age 20 y1) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| flight-B-coop-20261125-0430.json | coop-p01-S1 guest k9 td/td_song | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 20 y1) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| flight-B-coop-20261125-0430.json | coop-p01-S1 host k5 cnv/cnv_chu | Hồng nhan bạc mệnh — Bị Tề Ngân Chúc sai đánh trượng đến chết (age 20 y1) | INVALID | JS-click harness (pre-25/11, no realtap proof) |
| flight-B-solo-20261125-0520/cnv-20261125-0222.json | cnv-cnv_mat-skilled-1 | HARNESS | INVALID | JS-click harness (pre-25/11, no realtap proof); harness error (no life) |
| flight-B-solo-20261125-0520/cnv-20261125-0222.json | cnv-cnv_mat-cautious-1 | Xuất cung — Xuất cung, mở tiệm nhỏ ở kinh thành (age 29 y12) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất cung về quê» (option) (no proof it was the only option) |
| flight-B-solo-20261125-0520/cnv-20261125-0222.json | cnv-cnv_mat-greedy-1 | Xuất cung — Xuất cung tuổi 30 (age 30 y11) | INVALID | JS-click harness (pre-25/11, no realtap proof) |
| flight-B-solo-20261125-0520/cnv-20261125-0222.json | cnv-cnv_mat-lover-1 | Hồng nhan bạc mệnh — Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 29 tuổi (age 29 y11) | INVALID | JS-click harness (pre-25/11, no realtap proof) |
| flight-B-solo-20261125-0520/cnv-20261125-0222.json | cnv-cnv_mat-scholar-1 | HARNESS | INVALID | JS-click harness (pre-25/11, no realtap proof); harness error (no life) |
| flight-B-solo-20261125-0520/cnv-20261125-0223.json | cnv-cnv_mat-skilled-1 | HARNESS | INVALID | JS-click harness (pre-25/11, no realtap proof); harness error (no life) |
| flight-B-solo-20261125-0520/cnv-20261125-0223.json | cnv-cnv_mat-cautious-1 | Xuất cung — Xuất cung, mở tiệm nhỏ ở kinh thành (age 28 y9) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất cung về quê» (option) (no proof it was the only option) |
| flight-B-solo-20261125-0520/cnv-20261125-0223.json | cnv-cnv_mat-greedy-1 | Hồng nhan bạc mệnh — Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 28 tuổi (age 28 y10) | INVALID | JS-click harness (pre-25/11, no realtap proof) |
| flight-B-solo-20261125-0520/cnv-20261125-0223.json | cnv-cnv_mat-lover-1 | HARNESS | INVALID | JS-click harness (pre-25/11, no realtap proof); harness error (no life) |
| flight-B-solo-20261125-0520/thd-20261125-0222.json | thd-thd_tho-skilled-1 | HARNESS | INVALID | JS-click harness (pre-25/11, no realtap proof); harness error (no life) |
| flight-B-solo-20261125-0520/thd-20261125-0222.json | thd-thd_tho-cautious-1 | Hồng nhan bạc mệnh — Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 32 tuổi (age 32 y14) | INVALID | JS-click harness (pre-25/11, no realtap proof) |
| flight-B-solo-20261125-0520/thd-20261125-0222.json | thd-thd_tho-greedy-1 | Xuất gia — Xuất gia làm ni cô (age 35 y17) | INVALID | JS-click harness (pre-25/11, no realtap proof); bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| flight-B-solo-20261125-0520/thd-20261125-0222.json | thd-thd_tho-lover-1 | Hồng nhan bạc mệnh — Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 27 tuổi (age 27 y8) | INVALID | JS-click harness (pre-25/11, no realtap proof) |
| flight-B-solo-20261125-0520/thd-20261125-0222.json | thd-thd_tho-scholar-1 | HARNESS | INVALID | JS-click harness (pre-25/11, no realtap proof); harness error (no life) |
| flight-B-solo-20261125-0520/thd-20261125-0223.json | thd-thd_tho-skilled-1 | CAP (age 37 y20) | INVALID | JS-click harness (pre-25/11, no realtap proof); wall cap (no ending) |
| flight-B-solo-20261125-0520/thd-20261125-0223.json | thd-thd_tho-cautious-1 | HARNESS | INVALID | JS-click harness (pre-25/11, no realtap proof); harness error (no life) |
| flight-B-solo-repro/cnv-20261125-0222.json | cnv-cnv_mat-skilled-1 | HARNESS | dup | same life as flight-B-solo-20261125-0520/cnv-20261125-0222.json |
| flight-B-solo-repro/cnv-20261125-0222.json | cnv-cnv_mat-cautious-1 | Xuất cung — Xuất cung, mở tiệm nhỏ ở kinh thành (age 29 y12) | dup | same life as flight-B-solo-20261125-0520/cnv-20261125-0222.json |
| flight-B-solo-repro/cnv-20261125-0222.json | cnv-cnv_mat-greedy-1 | Xuất cung — Xuất cung tuổi 30 (age 30 y11) | dup | same life as flight-B-solo-20261125-0520/cnv-20261125-0222.json |
| flight-B-solo-repro/thd-20261125-0222.json | thd-thd_tho-skilled-1 | HARNESS | dup | same life as flight-B-solo-20261125-0520/thd-20261125-0222.json |
| flight-B-solo-repro/thd-20261125-0222.json | thd-thd_tho-cautious-1 | Hồng nhan bạc mệnh — Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 32 tuổi (age 32 y14) | dup | same life as flight-B-solo-20261125-0520/thd-20261125-0222.json |
| reports/flight-robot.md A-SOLO | cnv_mat (life 1) | CAP45 — 2781 buổi, rank 4, no ending | INVALID | JS-click harness (pre-25/11, no realtap proof); wall cap (no ending) |
| reports/flight-robot.md A-SOLO | thd_tho (life 2) | CAP45 — 2664 buổi, rank 7, no ending | INVALID | JS-click harness (pre-25/11, no realtap proof); wall cap (no ending) |

## F co-op units — per file (per-life rows: `node dev/measure/robot-audit.js --only /coop-`)

| file | lives | VALID | ends | why INVALID |
|---|---|---|---|---|
| coop-20261124-0723-p1-2.json | 47 | 0 | exit 46 / death 1 | JS-click harness 47 / bot-chosen exit road «…» 46 |
| coop-20261124-0723-p3-4.json | 27 | 0 | exit 24 / death 3 | JS-click harness 27 / bot-chosen exit road «…» 24 |
| coop-20261124-0823-p5-6-s.json | 43 | 0 | exit 41 / death 2 | JS-click harness 43 / bot-chosen exit road «…» 41 |
| coop-20261124-0823-p7-8-s.json | 15 | 0 | exit 12 / death 3 | JS-click harness 15 / bot-chosen exit road «…» 12 |
| coop-20261124-0823-p7-8.json | 25 | 0 | exit 23 / death 2 | JS-click harness 25 / bot-chosen exit road «…» 23 |
| coop-20261124-0824-p11-12-s.json | 33 | 0 | exit 28 / death 5 | JS-click harness 33 / bot-chosen exit road «…» 28 |
| coop-20261124-0824-p9-10.json | 24 | 0 | death 5 / exit 19 | JS-click harness 24 / bot-chosen exit road «…» 19 |
| coop-20261124-0825-p5-6.json | 47 | 0 | exit 40 / death 7 | JS-click harness 47 / bot-chosen exit road «…» 40 |
| coop-20261124-0825-p9-10-s.json | 31 | 0 | exit 27 / death 4 | JS-click harness 31 / bot-chosen exit road «…» 27 |
| coop-20261124-1426-p8-8-s.json | 16 | 0 | exit 16 | JS-click harness 16 / bot-chosen exit road «…» 16 |
| coop-20261124-1927-p8-8.json | 6 | 0 | exit 6 | JS-click harness 6 / bot-chosen exit road «…» 6 |
| coop-U11-20261124-0825-p11-12.json | 31 | 0 | exit 30 / death 1 | JS-click harness 31 / bot-chosen exit road «…» 30 |
| coop-U13-20261124-0825-p13-14.json | 34 | 0 | exit 29 / death 5 | JS-click harness 34 / bot-chosen exit road «…» 29 |
| coop-U14-20261124-1253-p13-14-s.json | 25 | 0 | exit 24 / none 1 | JS-click harness 24 / bot-chosen exit road «…» 24 / co-op pair with no finished life 1 |
| coop-U15-20261124.json | 21 | 0 | exit 20 / death 1 | JS-click harness 21 / bot-chosen exit road «…» 20 |
| coop-U16-20261124-1253.json | 25 | 0 | exit 23 / death 2 | JS-click harness 25 / bot-chosen exit road «…» 23 |
| coop-U17-20261124-1253-final.json | 26 | 0 | exit 23 / death 3 | JS-click harness 26 / bot-chosen exit road «…» 23 |
| coop-U18-20261124-1253-p17-18-s.json | 28 | 0 | death 5 / exit 23 | JS-click harness 28 / bot-chosen exit road «…» 23 |
| coop-U19-20261124.json | 13 | 0 | exit 13 | JS-click harness 13 / bot-chosen exit road «…» 13 |
| coop-U20-20261124-1338-p19-20-s.json | 6 | 0 | exit 6 | JS-click harness 6 / bot-chosen exit road «…» 6 |
| coop-U20-coop-20261124-1338-p19-20-s.json | 12 | 0 | death 3 / exit 9 | JS-click harness 12 / bot-chosen exit road «…» 9 |
| coop-U21-20261124.json | 6 | 0 | death 1 / exit 5 | JS-click harness 6 / bot-chosen exit road «…» 5 |
| coop-U4-20261124-0823-p3-4-s.json | 21 | 0 | exit 19 / death 1 / none 1 | JS-click harness 20 / bot-chosen exit road «…» 19 / co-op pair with no finished life 1 |
| coop-U4b-20261124-1827-p4-4-s.json | 6 | 0 | exit 6 | JS-click harness 6 / bot-chosen exit road «…» 6 |

# ROBOT AUDIT B — co-op runner lives of Foreman B (U1, U2, U3, U3b) vs owner rules 25/11

PRIORITY #1 CHECK ('robot-audit'): OD 0 | ledger 0 | claims 8 | main 0 | review/* 1 (robot-audit-E: --allow-jsclick patch, reused) | archive 0

**AUDIT B total 157 recorded lives + 4 unfinished = 161 · valid 14 · invalid 147 (cap 0 / timeout 0 / stuck 4 unfinished / exit 143 / jsclick 0 allowed)**

## NOTES
- Script: dev/measure/robot-audit.js + E's patch (review/robot-audit-E 91d5ff3a, --allow-jsclick: machine-tap lives that reached a TRUE end are VALID per OD ~05:58Z; JS-click rule off). Run: node dev/measure/robot-audit-E.js dev/handover/robot --allow-jsclick --md out.md --json out.json over B's 4 files only.
- B FILES (from FOREMAN_B_STATUS RUNNER DONE lines + robot/*.md headers): U1 = coop-20261124-0723-p1-2.json/.md (pairs 1-2, SWAP=0, rc-u1); U2 = coop-20261124-0723-p1-2-s.json/.md (pairs 1-2, SWAP=1, session 2VQmoYut); U3 = coop-20261124-0723-p3-4.json/.md (pair 3, SWAP=0, 2fZxefqC; pair 4 NOT run by U3); U3b = coop-20261124-1356-p4-U3b.json/.md (pair 4, SWAP=0, 4zcW21pE). F's U4+ (coop-*-p5-6, p7-8, p9-10, p11-12, U11/U13-U17…) are NOT B's and NOT audited here.
- JSON REPAIR: coop-20261124-0723-p1-2-s.json and coop-20261124-1356-p4-U3b.json are CORRUPT on the handover tip (two partial rewrites spliced: JSON.parse fails at pos 2960322 / 1471760, residue block after "rooms"). Audited by extracting the "lives" arrays by bracket matching (U2: 22 + 27 lives; U3b: 34). Nothing written back to the branch; FIX needed: runner/handover merge must not splice .json (re-push the file from the runner out dir).
- EXIT RULE: no life record carries exitPick, so every exit-road ending is INVALID (same judgment as E: Xuất gia, Phế làm thứ dân, Xuất cung về quê, Được ban hôn…). Deaths / bị ban chết / tuổi trời đã tận / bà đỡ… = VALID. Exit endings are 143 of 157 (91 %).
- NOT IN THE JSON (lives the room never finished): U1 pair 2 host kiếp 8, 9, 10 (week-end stuck, 8 rooms replayed) and U2 pair 2 guest kiếp 10 (room RZPH 353 wk) — counted here as 4 STUCK lives to rerun.
- Per-life rows below: round = unit/pair/SWAP file; life = seat·kiếp·origin/road; resume save = none per life (every rerun is a fresh life, SEED=1 SWAP as listed; repro saves for stuck rooms are on review/robot10-coop-saves u1/ u2/ u3b/).

## Counts by round

| round | N | valid | invalid |
|---|---|---|---|
| U2 · pair 1 · SWAP=1 | 22 | 2 | 20 |
| U2 · pair 2 · SWAP=1 | 27 | 6 | 21 |
| U1 · pair 1 · SWAP=0 | 25 | 1 | 24 |
| U1 · pair 2 · SWAP=0 | 22 | 0 | 22 |
| U3 · pair 3 · SWAP=0 | 27 | 3 | 24 |
| U3b · pair 4 · SWAP=0 | 34 | 2 | 32 |
| U1 · pair 2 host k8-10 (unfinished, stuck) | 3 | 0 | 3 |
| U2 · pair 2 guest k10 (unfinished, stuck) | 1 | 0 | 1 |
| **total** | **161** | **14** | **147** |

## Every life (round · life · end · valid? · why)

| round | life | end | valid? | why |
|---|---|---|---|---|
| U2 p1 SWAP=1 | host k1 cn/cn_ban | Xuất gia (age 20 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U2 p1 SWAP=1 | guest k1 tt/tt_co | Xuất gia (age 20 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U2 p1 SWAP=1 | host k2 ch/ch_bi | Được ban hôn — Được ban hôn cho Tống Tư Viễn (age 20 y1) | INVALID | bot-chosen exit road «Được ban hôn» (no proof it was the only option) |
| U2 p1 SWAP=1 | host k3 pf/pt_hai | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 20 y1) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U2 p1 SWAP=1 | guest k2 muoi/muoi_lau | Xuất gia (age 18 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U2 p1 SWAP=1 | host k4 dtq/dtq_vu | Xuất gia (age 20 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U2 p1 SWAP=1 | guest k3 nc/nc_tuc | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 19 y1) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U2 p1 SWAP=1 | guest k4 ch/ch_bi | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 20 y1) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U2 p1 SWAP=1 | host k5 nc/nc_tuc | Xuất gia (age 19 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U2 p1 SWAP=1 | host k6 thd/thd_hoc | Xuất gia (age 22 y6) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U2 p1 SWAP=1 | host k7 bd/bd_san | Xuất gia (age 18 y7) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U2 p1 SWAP=1 | host k8 muoi/muoi_lau | Hồng nhan bạc mệnh — Bị ban chết vì trốn khỏi cung (age 21 y2) | VALID |  |
| U2 p1 SWAP=1 | host k9 td/td_song | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 20 y2) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U2 p1 SWAP=1 | guest k5 cnv/cnv_chu | Hồng nhan bạc mệnh — Bị Tôn Nhu Tắc sai đánh trượng đến chết (age 22 y4) | VALID |  |
| U2 p1 SWAP=1 | guest k6 bd/bd_soi | Xuất cung về quê (age 19 y4) | INVALID | bot-chosen exit road «Xuất cung về quê» (no proof it was the only option) |
| U2 p1 SWAP=1 | guest k7 dtq/dtq_binh | Xuất gia (age 21 y5) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U2 p1 SWAP=1 | guest k8 cn/cn_than | Xuất cung về quê (age 19 y6) | INVALID | bot-chosen exit road «Xuất cung về quê» (no proof it was the only option) |
| U2 p1 SWAP=1 | guest k9 td/td_an | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 22 y9) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U2 p1 SWAP=1 | guest k10 thd/thd_sach | Xuất gia (age 19 y9) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U2 p1 SWAP=1 | guest k11 pf/pt_tang | Xuất cung về quê (age 19 y9) | INVALID | bot-chosen exit road «Xuất cung về quê» (no proof it was the only option) |
| U2 p1 SWAP=1 | guest k12 tt/tt_mat | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 19 y2) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U2 p1 SWAP=1 | host k10 cnv/cnv_ma | Được ban hôn — Được Lưu Nghiên Thu ban hôn cho Tiến sĩ họ Tô vừa đỗ khoa này (age 21 y2) | INVALID | bot-chosen exit road «Được ban hôn» (no proof it was the only option) |
| U2 p2 SWAP=1 | guest k1 dtq/dtq_bien | Xuất gia (age 18 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U2 p2 SWAP=1 | guest k2 cn/cn_tinh | Xuất gia (age 20 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U2 p2 SWAP=1 | guest k3 td/td_song | Xuất gia (age 19 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U2 p2 SWAP=1 | guest k4 thd/thd_hoc | Xuất gia (age 18 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U2 p2 SWAP=1 | guest k5 pf/pt_hai | Xuất gia (age 19 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U2 p2 SWAP=1 | guest k6 tt/tt_oan | Xuất gia (age 18 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U2 p2 SWAP=1 | guest k7 muoi/muoi_doi | Xuất gia (age 21 y3) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U2 p2 SWAP=1 | guest k8 nc/nc_vuong | Hồng nhan bạc mệnh — Bị ban chết vì trốn khỏi cung (age 19 y3) | VALID |  |
| U2 p2 SWAP=1 | guest k9 ch/ch_co | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 19 y2) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U2 p2 SWAP=1 | host k1 nc/nc_tuc | Hồng nhan bạc mệnh — Tráo con bị bắt quả tang, tội khi quân (age 23 y5) | VALID |  |
| U2 p2 SWAP=1 | host k2 thd/thd_hoc | Xuất gia (age 20 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U2 p2 SWAP=1 | host k3 bd/bd_san | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 20 y2) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U2 p2 SWAP=1 | host k4 muoi/muoi_lau | Xuất gia (age 19 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U2 p2 SWAP=1 | host k5 td/td_song | Hồng nhan bạc mệnh — Bà đỡ quỳ ngoài điện: ngươi khó sinh, chỉ giữ được một. Thái y đoán là hoàng tử. Hoàng thượng lặng đi hồi lâu rồi phán: “Giữ con.” Ngươi gắng sinh hạ hài nhi rồi nhắm mắt (age 21 y3) | VALID |  |
| U2 p2 SWAP=1 | host k6 cnv/cnv_ma | Hồng nhan bạc mệnh — Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 25 tuổi (age 25 y6) | VALID |  |
| U2 p2 SWAP=1 | host k7 tt/tt_co | Hồng nhan bạc mệnh — Sổ Kính sự phòng không ghi đêm thị tẩm nào trước khi có 'thai', giả mang thai bị lật tẩy, tội khi quân (age 22 y4) | VALID |  |
| U2 p2 SWAP=1 | host k8 cn/cn_tinh | Dâng biểu xuất gia — Xuất gia (age 19 y3) | INVALID | bot-chosen exit road «Dâng biểu xuất gia» (no proof it was the only option) |
| U2 p2 SWAP=1 | host k9 ch/ch_ho | Xuất cung về quê (age 19 y3) | INVALID | bot-chosen exit road «Xuất cung về quê» (no proof it was the only option) |
| U2 p2 SWAP=1 | host k10 pf/pt_dang | Xuất gia (age 19 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U2 p2 SWAP=1 | host k11 dtq/dtq_bien | Xuất gia (age 18 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U2 p2 SWAP=1 | host k12 nc/nc_su | Hồng nhan bạc mệnh — Sổ Kính sự phòng không ghi đêm thị tẩm nào trước khi có 'thai', giả mang thai bị lật tẩy, tội khi quân (age 22 y3) | VALID |  |
| U2 p2 SWAP=1 | host k13 thd/thd_tro | Xuất gia (age 19 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U2 p2 SWAP=1 | host k14 bd/bd_hen | Xuất gia (age 18 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U2 p2 SWAP=1 | host k15 muoi/muoi_tuoc | Xuất gia (age 19 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U2 p2 SWAP=1 | host k16 td/td_ke | Xuất cung về quê (age 19 y3) | INVALID | bot-chosen exit road «Xuất cung về quê» (no proof it was the only option) |
| U2 p2 SWAP=1 | host k17 cnv/cnv_mat | Xuất cung về quê (age 21 y4) | INVALID | bot-chosen exit road «Xuất cung về quê» (no proof it was the only option) |
| U2 p2 SWAP=1 | host k18 tt/tt_mat | Xuất cung — Xuất cung, mở tiệm nhỏ ở kinh thành (age 25 y11) | INVALID | bot-chosen exit road «Xuất cung về quê» (option) (no proof it was the only option) |
| U1 p1 SWAP=0 | guest k1 cn/cn_ban | Xuất gia (age 20 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p1 SWAP=0 | host k1 tt/tt_co | Xuất gia (age 20 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p1 SWAP=0 | guest k2 ch/ch_bi | Xuất gia (age 20 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p1 SWAP=0 | guest k3 pf/pt_hai | Xuất gia (age 18 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p1 SWAP=0 | guest k4 dtq/dtq_vu | Xuất gia (age 20 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p1 SWAP=0 | guest k5 nc/nc_tuc | Xuất gia (age 18 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p1 SWAP=0 | host k2 muoi/muoi_lau | Xuất gia (age 22 y3) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p1 SWAP=0 | guest k6 thd/thd_hoc | Xuất gia (age 21 y3) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p1 SWAP=0 | host k3 nc/nc_tuc | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 20 y3) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U1 p1 SWAP=0 | guest k7 bd/bd_san | Xuất gia (age 18 y3) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p1 SWAP=0 | host k4 ch/ch_bi | Được ban hôn — Được ban hôn cho Đậu Bác Văn (age 19 y1) | INVALID | bot-chosen exit road «Được ban hôn» (no proof it was the only option) |
| U1 p1 SWAP=0 | guest k8 muoi/muoi_lau | Xuất gia (age 20 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p1 SWAP=0 | host k5 cnv/cnv_chu | Hồng nhan bạc mệnh — Bị Đoan Mộc Tĩnh Uyển sai đánh trượng đến chết (age 18 y1) | VALID |  |
| U1 p1 SWAP=0 | guest k9 td/td_song | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 20 y1) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U1 p1 SWAP=0 | host k6 bd/bd_soi | Xuất gia (age 20 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p1 SWAP=0 | guest k10 cnv/cnv_ma | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 18 y1) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U1 p1 SWAP=0 | guest k11 tt/tt_co | Xuất gia (age 19 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p1 SWAP=0 | guest k12 cn/cn_tinh | Xuất gia (age 19 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p1 SWAP=0 | guest k13 ch/ch_ho | Xuất gia (age 20 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p1 SWAP=0 | guest k14 pf/pt_dang | Xuất gia (age 19 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p1 SWAP=0 | guest k15 dtq/dtq_bien | Xuất gia (age 19 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p1 SWAP=0 | host k7 dtq/dtq_binh | Xuất gia (age 19 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p1 SWAP=0 | host k8 cn/cn_than | Xuất gia (age 20 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p1 SWAP=0 | host k9 td/td_an | Xuất gia (age 18 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p1 SWAP=0 | host k10 thd/thd_sach | Xuất gia (age 20 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p2 SWAP=0 | host k1 dtq/dtq_bien | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 18 y1) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U1 p2 SWAP=0 | host k2 cn/cn_tinh | Xuất gia (age 20 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p2 SWAP=0 | host k3 td/td_song | Xuất gia (age 18 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p2 SWAP=0 | host k4 thd/thd_hoc | Xuất gia (age 19 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p2 SWAP=0 | host k5 pf/pt_hai | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 18 y2) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U1 p2 SWAP=0 | guest k1 nc/nc_tuc | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 19 y2) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U1 p2 SWAP=0 | guest k2 thd/thd_hoc | Xuất gia (age 20 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p2 SWAP=0 | guest k3 bd/bd_san | Xuất gia (age 19 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p2 SWAP=0 | guest k4 muoi/muoi_lau | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 20 y1) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U1 p2 SWAP=0 | guest k5 td/td_song | Xuất gia (age 19 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p2 SWAP=0 | guest k6 cnv/cnv_ma | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 20 y1) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U1 p2 SWAP=0 | guest k7 tt/tt_co | Xuất gia (age 18 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p2 SWAP=0 | host k6 tt/tt_oan | Xuất gia (age 20 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p2 SWAP=0 | guest k8 cn/cn_tinh | Xuất gia (age 19 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p2 SWAP=0 | host k7 muoi/muoi_doi | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 18 y1) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U1 p2 SWAP=0 | guest k9 ch/ch_ho | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 19 y2) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U1 p2 SWAP=0 | guest k10 pf/pt_dang | Xuất gia (age 20 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p2 SWAP=0 | guest k11 dtq/dtq_bien | Xuất gia (age 19 y3) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p2 SWAP=0 | guest k12 nc/nc_su | Xuất gia (age 19 y3) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U1 p2 SWAP=0 | guest k13 thd/thd_tro | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 18 y1) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U1 p2 SWAP=0 | guest k14 bd/bd_hen | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 18 y1) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U1 p2 SWAP=0 | guest k15 muoi/muoi_tuoc | Xuất gia (age 20 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3 p3 SWAP=0 | host k1 muoi/muoi_tuoc | Xuất gia (age 20 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3 p3 SWAP=0 | guest k1 td/td_song | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 20 y1) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U3 p3 SWAP=0 | guest k2 cnv/cnv_ma | Hồng nhan bạc mệnh — Bị Tôn Kiều Nguyệt sai đánh trượng đến chết (age 22 y5) | VALID |  |
| U3 p3 SWAP=0 | guest k3 tt/tt_co | Xuất gia (age 19 y5) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3 p3 SWAP=0 | guest k4 cn/cn_tinh | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 18 y1) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U3 p3 SWAP=0 | guest k5 ch/ch_ho | Xuất gia (age 20 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3 p3 SWAP=0 | guest k6 pf/pt_dang | Xuất gia (age 19 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3 p3 SWAP=0 | guest k7 dtq/dtq_bien | Xuất gia (age 19 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3 p3 SWAP=0 | guest k8 nc/nc_su | Xuất gia (age 20 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3 p3 SWAP=0 | guest k9 thd/thd_tro | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 18 y1) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U3 p3 SWAP=0 | guest k10 bd/bd_hen | Xuất gia (age 18 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3 p3 SWAP=0 | guest k11 muoi/muoi_tuoc | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 21 y2) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U3 p3 SWAP=0 | guest k12 td/td_ke | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 20 y2) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U3 p3 SWAP=0 | host k2 nc/nc_su | Hồng nhan bạc mệnh — Sổ Kính sự phòng không ghi đêm thị tẩm nào trước khi có 'thai', giả mang thai bị lật tẩy, tội khi quân (age 24 y5) | VALID |  |
| U3 p3 SWAP=0 | host k3 ch/ch_ho | Xuất gia (age 23 y6) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3 p3 SWAP=0 | host k4 cnv/cnv_ma | Xuất cung về quê (age 20 y7) | INVALID | bot-chosen exit road «Xuất cung về quê» (no proof it was the only option) |
| U3 p3 SWAP=0 | guest k13 cnv/cnv_mat | Hồng nhan bạc mệnh — Bị Vu Chỉ Nhược sai đánh trượng đến chết (age 19 y1) | VALID |  |
| U3 p3 SWAP=0 | host k5 bd/bd_san | Xuất gia (age 19 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3 p3 SWAP=0 | host k6 dtq/dtq_vu | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 20 y3) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U3 p3 SWAP=0 | host k7 cn/cn_ban | Xuất cung về quê (age 20 y4) | INVALID | bot-chosen exit road «Xuất cung về quê» (no proof it was the only option) |
| U3 p3 SWAP=0 | host k8 td/td_tha | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 19 y5) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U3 p3 SWAP=0 | host k9 thd/thd_tho | Xuất cung về quê (age 23 y8) | INVALID | bot-chosen exit road «Xuất cung về quê» (no proof it was the only option) |
| U3 p3 SWAP=0 | guest k14 tt/tt_mat | Xuất cung — Xuất cung về quê (age 26 y9) | INVALID | bot-chosen exit road «Xuất cung về quê» (option) (no proof it was the only option) |
| U3 p3 SWAP=0 | guest k15 cn/cn_chu | Xuất gia (age 18 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3 p3 SWAP=0 | guest k16 ch/ch_benh | Xuất gia (age 18 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3 p3 SWAP=0 | guest k17 pf/pt_tang | Xuất gia (age 19 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3 p3 SWAP=0 | host k10 pf/pt_su | Xuất gia (age 21 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3b p4 SWAP=0 | host k1 cn/cn_chu | Xuất gia (age 19 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3b p4 SWAP=0 | guest k1 ch/ch_ho | Xuất gia (age 19 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3b p4 SWAP=0 | guest k2 pf/pt_dang | Xuất gia (age 18 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3b p4 SWAP=0 | guest k3 dtq/dtq_bien | Xuất gia (age 20 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3b p4 SWAP=0 | guest k4 nc/nc_su | Xuất gia (age 20 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3b p4 SWAP=0 | guest k5 thd/thd_tro | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 20 y1) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U3b p4 SWAP=0 | guest k6 bd/bd_hen | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 20 y1) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U3b p4 SWAP=0 | guest k7 muoi/muoi_tuoc | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 19 y2) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U3b p4 SWAP=0 | host k2 td/td_ke | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 19 y2) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U3b p4 SWAP=0 | host k3 thd/thd_tro | Hồng nhan bạc mệnh — Bị ban chết vì trốn khỏi cung (age 19 y2) | VALID |  |
| U3b p4 SWAP=0 | guest k8 td/td_ke | Xuất gia (age 18 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3b p4 SWAP=0 | guest k9 cnv/cnv_mat | Xuất gia (age 20 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3b p4 SWAP=0 | host k4 pf/pt_dang | Hồng nhan bạc mệnh — Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 19 tuổi (age 19 y2) | VALID |  |
| U3b p4 SWAP=0 | guest k10 tt/tt_mat | Xuất gia (age 19 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3b p4 SWAP=0 | guest k11 cn/cn_chu | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 19 y1) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U3b p4 SWAP=0 | host k5 tt/tt_co | Xuất gia (age 20 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3b p4 SWAP=0 | guest k12 ch/ch_benh | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 19 y2) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U3b p4 SWAP=0 | guest k13 pf/pt_tang | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 18 y2) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U3b p4 SWAP=0 | host k6 muoi/muoi_lau | Xuất gia (age 21 y3) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3b p4 SWAP=0 | guest k14 dtq/dtq_huynh | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 20 y1) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U3b p4 SWAP=0 | guest k15 nc/nc_gian | Xuất gia (age 19 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3b p4 SWAP=0 | guest k16 thd/thd_sach | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 19 y3) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U3b p4 SWAP=0 | guest k17 bd/bd_tuyet | Xuất gia (age 19 y3) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3b p4 SWAP=0 | guest k18 muoi/muoi_no | Xuất gia (age 19 y4) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3b p4 SWAP=0 | guest k19 td/td_an | Xuất gia (age 18 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3b p4 SWAP=0 | guest k20 cnv/cnv_ban | Xuất gia (age 19 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3b p4 SWAP=0 | host k7 nc/nc_tuc | Xuất gia (age 21 y3) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3b p4 SWAP=0 | host k8 ch/ch_bi | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 21 y5) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U3b p4 SWAP=0 | host k9 cnv/cnv_chu | Xuất cung về quê (age 18 y5) | INVALID | bot-chosen exit road «Xuất cung về quê» (no proof it was the only option) |
| U3b p4 SWAP=0 | guest k21 tt/tt_tranh | Xuất gia (age 18 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3b p4 SWAP=0 | guest k22 cn/cn_than | Xuất gia (age 18 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3b p4 SWAP=0 | guest k23 ch/ch_co | Phế làm thứ dân — Phế làm thứ dân, xuất cung (age 19 y2) | INVALID | bot-chosen exit road «Phế làm thứ dân» (no proof it was the only option) |
| U3b p4 SWAP=0 | guest k24 pf/pt_su | Xuất gia (age 20 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| U3b p4 SWAP=0 | host k10 bd/bd_soi | Xuất cung về quê (age 21 y3) | INVALID | bot-chosen exit road «Xuất cung về quê» (no proof it was the only option) |
| U1 p2 SWAP=0 | host k8 | stuck (week-end stuck, never finished) | INVALID | stuck-abandoned |
| U1 p2 SWAP=0 | host k9 | stuck | INVALID | stuck-abandoned |
| U1 p2 SWAP=0 | host k10 | stuck | INVALID | stuck-abandoned |
| U2 p2 SWAP=1 | guest k10 | stuck (room RZPH 353 wk) | INVALID | stuck-abandoned |

## RERUN LIST (invalid lives; one life per seat, real taps, no cap, no exit; rerun only after fix-5 cause 3 / fix-6 cause 4 are LIVE for the 4 stuck ones)

| unit | pair | seat | kiếp | reason | resume save |
|---|---|---|---|---|---|
| U2 | 1 | host | 1, 2, 3, 4, 5, 6, 7, 9, 10 | exit road ×9 | none (fresh) |
| U2 | 1 | guest | 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12 | exit road ×11 | none (fresh) |
| U2 | 2 | guest | 1, 2, 3, 4, 5, 6, 7, 9 | exit road ×8 | none (fresh) |
| U2 | 2 | host | 2, 3, 4, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18 | exit road ×13 | none (fresh) |
| U1 | 1 | guest | 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 | exit road ×15 | none (fresh) |
| U1 | 1 | host | 1, 2, 3, 4, 6, 7, 8, 9, 10 | exit road ×9 | none (fresh) |
| U1 | 2 | host | 1, 2, 3, 4, 5, 6, 7 | exit road ×7 | none (fresh) |
| U1 | 2 | guest | 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 | exit road ×15 | none (fresh) |
| U3 | 3 | host | 1, 3, 4, 5, 6, 7, 8, 9, 10 | exit road ×9 | none (fresh) |
| U3 | 3 | guest | 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17 | exit road ×15 | none (fresh) |
| U3b | 4 | host | 1, 2, 5, 6, 7, 8, 9, 10 | exit road ×8 | none (fresh) |
| U3b | 4 | guest | 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24 | exit road ×24 | none (fresh) |
| U1 | 2 | host | 8, 9, 10 | stuck-abandoned | RESUME the .json (SWAP=0 SEED=1 STUCK=600) or fresh |
| U2 | 2 | guest | 10 | stuck-abandoned | u2/ repro saves @9428fb40 |

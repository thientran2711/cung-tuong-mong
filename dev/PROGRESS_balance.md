# PROGRESS — review/balance (tích hợp + cân bằng)

Worktree riêng: /home/user/ctm-balance (thư mục chính có thợ khác dùng).

## Gộp (từ origin/main 7008865)
events 289b311 → merit c871bbb → quests 3c5a194 → nights 5d29864 → intrigue db1ce23 → time-spill b656c41 (bỏ j80, đã gộp vào j76) → map-tap 9c0d66b → works c693c58 → stories 5e4a9fe, rồi c78669f → virtue 2b87377 → minigames 2cf0ec5 → no-repeat 9e23c3d → van-phong 97f800d.
- index.html/sw.js gốc giữ bản main (site sẽ dựng lại khi gộp vào main).
- assemble.py: main + j68,j68e..j68i,j71,j72,j75,j70,j76,j77,j83,j67,j85,j82,j65, jbal2 (núm cân bằng muộn), j84 (CUỐI).
- j72: đổi hằng G7/R7 → G72/R72 (trùng tên với j71, làm hỏng dựng).

## Bot đo
dev/measure/inpage6.js (= inpage5 + xử lý khung trò chơi j82 #kg82, phát hiện kẹt, thẻ gắn buổi theo luật j76).
Chạy: `GAME=<bản dựng có meta charset> INP=inpage6.js node dev/measure/runb.js sens|rand N out.json`, tổng hợp `python3 dev/measure/an7.py out.json`.

## Luật ở cung (jpal.js, 11/14) — cho thợ j95 / review/schedules
- Chủ vị một cung: từ Tần trở lên (palHeadOK: rkOf>=3, không phải HH). Có người ở thiên điện: chỉ Tần/Phi/Quý phi (palHostOK), tối đa 3 người mỗi cung.
- HQP: cung riêng, một mình. HH: một mình ở Càn Ninh; residents("kn") chỉ còn HH; palaceOf bỏ ngoại lệ "dưới HH = kn".
- Quý nhân trở xuống: v.resHead = chủ vị; hết chỗ thì v.pal + v.palLone=1 (một mình một cung trống, nhường khi chủ vị cần).
- Tần chưa có cung trống: v.palWait=1, tạm ở thiên điện một chủ vị; có chỗ thì dời sang, ghi log.
- PALN 13 cung: 8 phía đông + 5 phía tây (Vĩnh Thọ, Dực Khôn, Trữ Tú, Hàm Phúc, Thái Cực điện); img/map-hotspots.json có slot 9-13.
- Vị trí: houseOf(p) → key chủ vị; palaceOf(p) → "kn" | "home" | "r<id>"; palSlot(k) → chỉ số PALN.

## Cân bằng v9 (11/14 tối) — xem dev/measure/BALANCE_REPORT.md
- Lỗi chính trên fix1 (hz 3.5): ~235 lần bị tố mỗi đời, nàng kẹt ở Đáp ứng, HH 4%. Thêm BAL.accCdT 36 tuần (jbal2): ai vừa bị tố thì một năm không ai tố lại (như nhau cho mọi người).
- Núm cuối: hz 3.2, birthAdd 4, illDie 2. Đo n=30: HH 33%, chết sớm 20% (thấp hơn đích 40%; bot khôn phòng bị quá chắc), khó sinh 4,5%/lần; HH sau ~5,3 năm (192 tuần, 32 phút @10s/tuần, 64 phút @20s/tuần).
- Cách đo: `GAME=<bản có meta charset> INP=inpage6.js INP2=inx.js HHSTOP=1 XJS='<xoay 9 thân phận, xem lệnh dưới>' node dev/measure/runb.js sens N out.json`, rồi `python3 dev/measure/anx.py nhãn out*.json`.
  XJS xoay 9 thân phận: `const s9=start;start=function(){window.__origO=["tt","dtq","muoi","cn","nc","td","ch","thd","cnv"][(window.__oj=(window.__oj==null?2:window.__oj+1))%9];return s9.apply(this,arguments)}`
- probe_srv.js (palaceOf của chủ cung nữ), probe_kiep.js (chết sớm không lợi), uismoke.js (save cũ, 755/1180) đều đạt.
- Việc còn mở: chết sớm ~20% với bot khôn; muốn ~40% phải chỉnh độ mạnh lệnh Phòng bị (ords70) hoặc tỉ lệ đầu độc/đẩy xuống hồ.

## v10 (đêm 11/14) — đang ở review/balance
- jbal2: BAL.birthMin 8 (sàn rủi ro khó sinh), seeMaxP 65 (nhận ra độc tối đa), poisonX 1.5. Đo n=30: HH 33%, chết sớm 20%, khó sinh 6,4%/lần.
- Đã thử seeMaxP 75 + poisonX 2: HH 50%, chết 13% → bỏ.
- VIỆC TIẾP (để chết sớm ~35–40%): độc trúng 1–2 lần/đời mà gần như không chết. Kiểm đường đi: j70 runAct (dev/build/j70.js ~dòng 352) có thể chạy độc qua chuỗi riêng, không qua ACT.poison.f; Sức của nàng chỉ xét chết ở tuần sau. Dùng inx.js (đếm "on") + log để xem Sức sau khi trúng độc.

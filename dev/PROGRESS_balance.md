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

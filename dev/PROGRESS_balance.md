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

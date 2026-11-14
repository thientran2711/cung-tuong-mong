# Part C (gộp C1 + C2): 52 cung nữ m01–m52 mặc thang áo phi tần t1–t8 + lãnh cung (nhánh review/maid-art-c)

Lịch sử trước 11/14 sáng: xem PROGRESS_C1.md (m01–m26) và PROGRESS_C2.md (m27–m52). Từ đây một thợ làm cả 52 người, ghi ở file này.

- File: img/fig-maid-mNN-tK-aAA.webp + img/por-maid-mNN-tK-aAA.webp (K = t1..t8 / cold; AA = a18/a26/a36/a51 = tuổi 19/24/32/48;
  por 384x506 canh giữa mặt bằng porcrop.py). Bản ghi img/FIGURES-servants.json role "maid", tier "t1".."t8"/"cold", sheet "C-mNN-tK", palette = họ màu.
- Công cụ gộp: dev/figwork/maidC/ — mjobs.py (prompt m01–m52: dữ liệu C1 m01–m26 + C2 m27–m52), hands.py (TAY LINH ĐỘNG: 4 tuổi 4 kiểu tay khác nhau
  + 4 đạo cụ khác nhau; tuổi 19 cầm đạo cụ riêng của người đó), calm.py (khối STILL dáng đứng yên, ~7.5 đầu, lụa không xuyên thấu, không khăn bay),
  lad3.py (áo t4–t8 = spec5 art5 nhánh consort-art: luật màu, t8 áo choàng + mũ cửu phượng, đuôi áo thẳng), hl.py (hoa điền 8 nấc HL/HS, cỡ +~5%/bậc),
  cold_pose trong mjobs.py (lãnh cung: áo vải trơn, trâm gỗ, không hoa điền, đồ vật giản dị khác nhau mỗi tuổi).
  pproc.py (tách 4 tuổi), cutcheck.py -> fixalpha.py (vá vải mỏng) -> porcrop.py, sheet.py, batch.sh, pub.sh (fetch + đặt lại theo origin rồi gộp bản ghi), merge.py.
- GPT 2.6 (gpt-2-6), 2:1, 4k, high; 1 style ref (consort-01/05/12/18 luân phiên) + ref danh tính = lineup cung nữ gốc a18; folder ba4aecfe…; 270 + 3 (tách nền) = 273 tín dụng/lineup.
- Hoa điền: HUADIAN_C.md (84 kiểu không trùng). Không nốt ruồi (m13, m26 dặn bỏ nốt ruồi của ảnh gốc).
- Tấm xem trước: dev/figwork/sheets/C_mNN_tK.jpg.

## 11/14 kiểm t1/t2 cũ
- Xem lại toàn bộ t1 m01–m52 (dáng yên) và t2 m27–m33: gần như mọi lineup dùng CHUNG một đạo cụ cho 2–3 tuổi (quạt/quạt/quạt, cành hoa ×3, túi thơm ×3…)
  và tuổi 48 hay chắp tay -> trái luật "mỗi tuổi một kiểu tay + một đạo cụ khác". Quyết định: VẼ LẠI cả 52 lineup t1 và t2 bằng hands.py.
  Bỏ 6 bản t2 m01–m06 của C1 (dáng cũ, chưa xử lý) và 2 bản t1 m25/m26 tĩnh của C1 (cùng lỗi tay).

## Trạng thái hiện tại / việc tiếp (đọc trước khi làm tiếp)
- t1: XONG 52/52 (vẽ lại, tay linh động). t2: m01–m14 XONG (bản mới). t2 m27–m33 trên nhánh vẫn là bản CŨ của C2 (đạo cụ lặp) -> sẽ bị đè khi vẽ t2 m27–m33.
- Còn lại: t2 m15–m52 (38), t3–t8 (6×52 = 312), lãnh cung (52) ≈ 402 lineup ≈ 110k tín dụng.
- Cách làm 1 mẻ 8 lineup (scratchpad cw/ = bản sao dev/figwork/maidC/ + cf/cutcheck,porcrop,fixalpha,rematte + haar/yunet.onnx):
  1) `bash mid.sh C-mNN-tK ...` in style ref, ref danh tính và phần giữa prompt; phần đầu/đuôi cố định = PRE.txt/POST.txt (m13, m26 có câu bỏ nốt ruồi).
     Có thể chỉnh tay một đạo cụ nếu hai tuổi trùng loại (ghi chú trong gens.txt).
  2) images_generate gpt-2-6, 2:1, 4k, extraSettings quality high, references [style STY, image MREF], folder ba4aecfe…; ghi `jid gen hands` vào gens.txt.
  3) `python3 rv.py rvN.jpg GEN...` -> xem tấm duyệt; xấu thì vẽ lại.
  4) images_remove_background từng gen, creations_wait cho xong (URL phải nằm trong transcript để urls.py bắt), rồi
     `bash batch.sh "jids" "bgids" "dòng tiến độ"` (addbg -> pproc -> cutcheck/fixalpha -> porcrop 384x506 -> sheet -> PROGRESS -> pub.sh). batch.sh tự dừng nếu thiếu URL.
  pub.sh luôn fetch + đặt lại theo origin/review/maid-art-c trước khi chép file và gộp bản ghi (merge.py chỉ thay bản ghi cùng "file").
- rematte.py chưa cần: cutcheck sau fixalpha đều < 1.

## Mẻ (tín dụng)
Mẻ 1: t1 vẽ lại tay linh động m01–m09 + m30 (10 lineup). Tín dụng 10×273 = 2730.
Mẻ 2: t1 vẽ lại tay linh động m10–m17 (8 lineup). Tín dụng 8×273 = 2184.
Mẻ 3: t1 vẽ lại tay linh động m18–m25 (8 lineup). Tín dụng 8×273 = 2184.
Mẻ 4: t1 vẽ lại tay linh động m26–m29, m31–m34 (8 lineup). Tín dụng 8×273 = 2184.
Mẻ 5: t1 vẽ lại tay linh động m35–m42 (8 lineup). Tín dụng 8×273 = 2184.
Mẻ 6: t1 vẽ lại tay linh động m43–m50 (8 lineup). Tín dụng 8×273 = 2184.
Mẻ 7: t1 m51–m52 → t1 XONG cả 52 người (tay linh động); t2 m01–m06 (hoa điền nấc 2). 8 lineup, tín dụng 8×273 = 2184.
Mẻ 8: t2 m07–m14 (8 lineup). Tín dụng 8×273 = 2184. Cộng dồn phiên này: 66 lineup ≈ 18.0k (gồm 2 lineup thử).

## C-B (thợ m27–m52): mẻ và tín dụng
Mẻ B1: t2 m27–m34 (vẽ lại m27–m33, đạo cụ khác loại mỗi tuổi). 8 lineup, tín dụng 8×273 = 2184.
Mẻ 9 (thợ m01–m26): t2 m15–m22 (8 lineup + 2 vẽ lại hoa điền m16 m21). Tín dụng 10×270 + 8×3 = 2724.

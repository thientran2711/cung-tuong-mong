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

## C-A (thợ m01–m26): mẻ và tín dụng
Mẻ A1 (thợ m01–m26): t2 m15–m22 (8 lineup + 2 vẽ lại hoa điền m16 m21). Tín dụng 10×270 + 8×3 = 2724.
Mẻ A2 (thợ m01–m26): t2 m23–m26 (t2 m01–m26 XONG) + t3 m01–m04. 13 lần vẽ + 8 tách nền: 13×270 + 8×3 = 3534.
Mẻ A3 (thợ m01–m26): t3 m05–m12 (8 lineup + 1 vẽ lại m05 lụa mỏng). 9×270 + 8×3 = 2454.
Mẻ A4 (thợ m01–m26): t3 m13–m20. 13 lần vẽ/sửa + 8 tách nền: 13×270 + 8×3 = 3534.
Mẻ A5 (thợ m01–m26): t3 m21–m26 → t3 XONG m01–m26; t4 m01–m02. 12 lần vẽ/sửa (vẽ lại m21, m24, m25 + sửa tóc m24) + 8 tách nền: 12×270 + 8×3 = 3264; m26 xoá nốt ruồi chấm vá.
Mẻ A6 (thợ m01–m26): t4 m03–m10. 10 lần vẽ/sửa (sửa m04 thêm hoa điền tuổi 19, m05 thu nhỏ hoa điền) + 8 tách nền: 10×270 + 8×3 = 2724.
Mẻ A7 (thợ m01–m26): t4 m11–m18. 8 lineup + 8 tách nền: 8×273 = 2184; m13 xoá nốt ruồi chấm vá (tóc tuổi 48 m13 sẽ sửa ở mẻ sau).
Mẻ A8 (thợ m01–m26): t4 m19–m26 → t4 XONG m01–m26; thay m13 t4 (sửa tóc tuổi 48). 10 lần vẽ/sửa (sửa m23 hoa điền phẳng, m13 tóc) + 9 tách nền: 10×270 + 9×3 = 2727; m13 m26 xoá nốt ruồi chấm vá.
Mẻ A9 (thợ m01–m26): t5 m01–m08 (hoa điền nấc 5 vàng lá + son). 8 lineup + 8 tách nền: 8×273 = 2184.
Mẻ A10 (thợ m01–m26): t5 m09–m16. 8 lineup + 8 tách nền: 8×273 = 2184; m13 xoá nốt ruồi chấm vá.
Mẻ A11 (thợ m01–m26): t5 m17–m24. 11 lần vẽ/sửa (sửa m21 hoa điền hạc ×2, m18 tóc tuổi 48) + 8 tách nền: 11×270 + 8×3 = 2994.
Mẻ A12 (thợ m01–m26): t5 m25–m26 → t5 XONG m01–m26; t6 m01–m06 (hoa điền nấc 6 vàng lá + 1 hạt trai). 12 lần vẽ/sửa (sửa m02 tóc tuổi 48; m04 m05 m06 bỏ dây treo cho hoa điền nằm trên da) + 8 tách nền: 12×270 + 8×3 = 3264; m26 xoá nốt ruồi chấm vá.
Mẻ A13 (thợ m01–m26): t6 m07–m14. 8 lineup + 8 tách nền: 8×273 = 2184; m13 xoá nốt ruồi chấm vá.
Mẻ A14 (thợ m01–m26): t6 m15–m22. 8 lineup + 8 tách nền: 8×273 = 2184.
Mẻ A15 (thợ m01–m26): t6 m23–m25, t7 m01–m04. 7 lineup + 1 sửa (m02-t7 tóc bạc) + 7 tách nền: 8×270 + 7×3 = 2181.
Mẻ A16a (thợ m01–m26): t6 m26 (vẽ 1 + sửa hỏng 1 + vẽ lại 1, bỏ dây trán; xoá nốt ruồi bằng code) + 1 tách nền: 3×270 + 3 = 813.
Mẻ A16 (thợ m01–m26): t7 m05–m12. 8 lineup + 2 sửa (m05, m12 bỏ dây treo hoa điền) + 8 tách nền: 10×270 + 8×3 = 2724.
Mẻ A17 (thợ m01–m26): t7 m13–m20 (m13 xoá nốt ruồi bằng code). 8 lineup + 8 tách nền: 8×273 = 2184.
Mẻ A18 (thợ m01–m26): t7 m21–m26, t8 m01–m02 (m26 xoá nốt ruồi bằng code). 8 lineup + 1 sửa (m02-t8 tóc bạc) + 8 tách nền: 9×270 + 8×3 = 2454.
Mẻ A19 (thợ m01–m26): t8 m03–m10. 8 lineup + 2 sửa (m05 bỏ dây treo, m08 bỏ dải trán) + 8 tách nền: 10×270 + 8×3 = 2724.
Mẻ A20 (thợ m01–m26): t8 m11–m18 (m13 xoá nốt ruồi bằng code). 8 lineup + 8 tách nền: 8×273 = 2184.
Mẻ A21 (thợ m01–m26): t8 m19–m26 + lãnh cung m01–m08 (16 lineup đã vẽ trước = 4320) + 12 sửa hoa điền/tóc (t8 m19, m23, m24, m25, m11, m12, m17 bỏ dây/chuỗi ngọc/dải trán; m03-t8 thu nhỏ; t7 m06, m08, m16 bỏ dây; lãnh cung m01 tóc bạc tuổi 48) + 23 tách nền: 16×270 + 12×270 + 23×3 = 7629. m26 xoá nốt ruồi bằng code.

## C-B (thợ m27–m52): mẻ và tín dụng
Mẻ B1: t2 m27–m34 (vẽ lại m27–m33, đạo cụ khác loại mỗi tuổi). 8 lineup, tín dụng 8×273 = 2184.
Mẻ B2: t2 m35–m42 (8 lineup + 1 vẽ lại m40 vì hoa điền to). Tín dụng 9×273 = 2457.
Mẻ B3: t2 m43–m50 (8 lineup + 1 vẽ lại m47 vì tay áo hơi trong). Tín dụng 9×273 = 2457.
Mẻ B4: t2 m51–m52 (t2 m27–m52 XONG) + t3 m27–m32 (hoa điền nấc 3). 8 lineup, tín dụng 8×273 = 2184.
Mẻ B5: t3 m33–m40. 8 lineup, tín dụng 8×273 = 2184.
Mẻ B6: t3 m41–m48. 8 lineup, tín dụng 8×273 = 2184.
Mẻ B7: t3 m49–m52 (t3 m27–m52 XONG) + t4 m27–m30 (hoa điền nấc 4 viền vàng). 8 lineup, tín dụng 8×273 = 2184.
Mẻ B8: t4 m31–m38. 8 lineup, tín dụng 8×273 = 2184.
Mẻ B9: t4 m39–m46. 8 lineup, tín dụng 8×273 = 2184.
Mẻ B10: t4 m47–m52 (t4 m27–m52 XONG) + t5 m27–m28 (hoa điền nấc 5 vàng lá). 8 lineup, tín dụng 8×273 = 2184.
Mẻ B11: t5 m29–m36 (8 lineup + vẽ lại m33, m36 vì quạt tròn và gương giống nhau). Tín dụng 10×273 = 2730.
Mẻ B12: t5 m37–m44. 8 lineup, tín dụng 8×273 = 2184.
Mẻ B13: t5 m45–m52 (t5 m27–m52 XONG). 8 lineup, tín dụng 8×273 = 2184.
Mẻ B14: t6 m27–m32 (hoa điền nấc 6, 1 hạt trai; 6 lineup + vẽ lại m29, m30 vì đuôi váy hơi trong). Tín dụng 8×273 = 2184.
Mẻ B15: t6 m33–m40. 8 lineup, tín dụng 8×273 = 2184.
Mẻ B16: t6 m41–m48 (8 lineup + vẽ lại m41 vì áo choàng hơi trong). Tín dụng 9×270 + 8×3 = 2454.
Mẻ B17: t6 m49–m52 (t6 m27–m52 XONG) + t7 m27–m30 (hoa điền nấc 7 vàng lá dát phẳng + men son + 1 chấm hồng ngọc). 8 lineup + vẽ lại m51, m29-t7, m30-t7 vì lớp ngoài hơi trong (thêm câu OPACITY vào lad3.py cho t6+). Tín dụng 11×270 + 8×3 = 2994.
Mẻ B18: t7 m31–m38 (8 lineup + vẽ lại m35 vì váy ngoài hơi trong). Tín dụng 9×270 + 8×3 = 2454.
Mẻ B19: t7 m39–m46 (8 lineup + vẽ lại m45 vì tóc tuổi 48 ngả xám). Tín dụng 9×270 + 8×3 = 2454.
Mẻ B20: t7 m47–m52 (t7 m27–m52 XONG). 6 lineup, tín dụng 6×273 = 1638.
Mẻ B21: t8 m27–m34 (hoa điền nấc 8 phượng vàng lá mảnh + thuý lam; bỏ dáng 'tay giấu trong tay áo' ở hands.py để tuổi 48 cũng cầm đạo cụ). 8 lineup, tín dụng 8×273 = 2184.
Mẻ B22: thay t8 m28, m31, m32 (hoa điền phượng quá rộng → sửa hl.py: phượng nghiêng, cánh khép, hẹp không quá khoảng giữa hai đầu mày; m31 vẽ 2 lần vì áo choàng hơi trong → lad3.py: áo choàng + đuôi t8 'heavy opaque brocade'). 4 lần vẽ + 3 tách nền: 4×270 + 3×3 = 1089.
Mẻ B23: t8 m35–m42 (8 lineup + vẽ lại m37 vì tóc tuổi 48 bạc thái dương, m39 vì có nốt ruồi má). Phát hiện ảnh gốc m39 có nốt ruồi má → thêm m39 vào MOLE trong mjobs.py và chấm vá nốt ruồi trên fig t1–t7 m39 (mole.py + spotfix.py, por làm lại). Tín dụng 10×270 + 8×3 = 2724.
Mẻ B24: t8 m43–m50. 8 lineup, tín dụng 8×273 = 2184. (Đã quét nốt ruồi tự động toàn bộ fig m27–m52: chỉ m39 có, đã vá ở B23.)
Mẻ B25: t8 m51–m52 (t8 m27–m52 XONG) + lãnh cung m27–m32 (áo trơn lụa dày đục — đổi 'linen' thành 'thick plain opaque silk' trong mjobs.py; trâm gỗ, không hoa điền, đồ vật giản dị khác loại mỗi tuổi). 8 lineup, tín dụng 8×273 = 2184.
Mẻ B26: lãnh cung m33–m40. 8 lineup, tín dụng 8×273 = 2184.
Mẻ B27: lãnh cung m41–m48 (8 lineup + vẽ lại m41 vì tóc tuổi 48 bạc thái dương). Tín dụng 9×270 + 8×3 = 2454.
Mẻ B28: lãnh cung m49–m52 (4 lineup + vẽ lại m49 vì tóc tuổi 48 bạc, m52 vì đốm má tuổi 48; nốt ruồi còn sót ở m52-cold-a51 đã vá tay). Tín dụng 6×270 + 4×3 = 1632. LÃNH CUNG m27–m52 XONG.
TRẠNG THÁI C-B: XONG TOÀN BỘ m27–m52 cho t2–t8 và lãnh cung (26 nàng × 8 bộ). Cộng dồn C-B: 236 lineup (gồm 20 lineup vẽ lại) ≈ 64.7k tín dụng (33.9k các phiên trước + 30.8k phiên B15–B28). Phiên B15–B28 thêm: lad3.py câu OPACITY cho t≥6 (áo choàng/tà/tay rộng đều gấm dày đục), hl.py t8 = phượng nghiêng cánh XẾP, hẹp không rộng hơn khoảng giữa hai đầu mày; hands.py bỏ giấu tay trong tay áo ở t8; mjobs.py MOLE = m13, m26, m39 (ảnh mẫu có nốt ruồi → lệnh bỏ); m39 t1–t7 đã vá nốt ruồi (mole.py/spotfix.py). Công cụ C-B: dev/figwork/maidCB/ (bản chạy ở scratchpad cwB; pub.sh chỉ chép tệp/bản ghi m27–m52, dòng tiến độ chèn vào mục này). Thay đổi so với maidC: hl.py t7 = vàng lá dát phẳng + men son đỏ + 1 chấm hồng ngọc, t8 = phượng vàng lá mảnh uốn chữ S + thuý lam (theo spec6), cỡ t8 ~1.25–1.33× (nhỏ hơn bản 1.4×), mọi nấc thêm 'vẽ trên da, nằm thấp giữa mày'; hands.py coi giỏ/bình hoa là cùng loại hoa, thư/cuộn/sách cùng loại giấy, quạt tròn/gương cùng loại tròn; gương ghi 'polished bronze hand mirror with a shiny reflective face' (trước đó gương ra giống quạt tròn); calm.py/POST.txt thêm 'thick opaque silk and brocade… skirt and train heavy opaque brocade'; lad3.py + mjobs.py bỏ câu 'NOT cream/ivory' cho họ màu kem/ngà (m36, m44, m48).

# PROGRESS — review/story-rare (kết hiếm cho mọi tuyến Mệnh truyện)

Nhánh từ origin/review/balance (619e35b). Không gộp main. Quyết định chủ: OWNER_DECISIONS 2026-11-14 "Every story arc has at least one RARE ending".

## Đã làm
- `dev/build/j97.js` (MỚI, bọc j67, không sửa j67), thêm vào assemble.py ngay trước j84.
  - 47 kết hiếm, một cho mỗi tuyến ARC67 (36 xuất thân + 8 chung + 3 giữa đời). Không đụng tuyến "Thanh mai trúc mã" (j96, thợ khác).
  - Điều kiện ẩn: chuỗi lựa chọn ở các hồi trước (`path`, cần `np` lần; một lựa chọn trong `bad` là mất) + Lợi thế + một điều kiện số đo/quan hệ/con cái. Xét lúc hồi cao trào được ra (bọc `fireBeat67`), gieo MỘT lần `p` (10–15 %) × `R97CFG.p` (=1); kết quả lưu ở `A.r97`, không gieo lại.
  - Trúng: hồi cao trào thêm lựa chọn `✦ …` viền sáng bằng kit `.ksel` (không CSS riêng), thẻ chỉ có Tốn + "(Cơ duyên hiếm)", không hiện kết quả/bậc may rủi; lời kể thêm "✦ Một cơ duyên hiếm vừa hé mở."
  - Kết hiếm = `ARC67[id].E.r97` (k=1, tính là thắng cho chuỗi chương và kết cục xuất thân) + hệ quả riêng + 1 món Ngự tứ (không bán/tặng: `nt_nhuy`, `nt_haiduong`, `nt_dongchau` cùng khóa j92 review/wardrobe, đăng ký nếu chưa có; `ngocboi`, `bienngu`) + danh hiệu kiếp này (`S.r97`, hiện ở tab Mệnh truyện "Cơ duyên hiếm kiếp này").
  - Nữ vương Nam Chiếu (nc_vuong): sau kết hiếm có lựa chọn "Về cố quốc lên ngôi nữ vương" (kết thúc kiếp này, over với số phận riêng) hoặc "Ở lại bên Hoàng thượng".
  - Kẻ hầu (cnv): kết hiếm có thể phong Đáp ứng (`srvRise`), phá lệ Quý nhân, hay thăng bậc cung nữ (Chưởng sự cô cô, Nữ quan).
  - Sổ luân hồi: `localStorage "ctm-rare97"`, cuối Sổ luân hồi có mục "Kết hiếm" với "x/47 kết hiếm đã gặp" + danh sách; dòng kiếp ghi thêm "Kết hiếm: …". Chỉ để nhớ, không mang gì sang kiếp sau.
  - Móc cho j96: `RARE97.add(id,{t,tag})`, `RARE97.meet(id,tag)`; tổng y tự tăng.
- `dev/RARE_ENDINGS.md`: danh mục đầy đủ (tuyến, lựa chọn, chi phí, chuỗi điều kiện, xác suất, kết quả, phần thưởng, người hiện mặt cho tranh).
- `dev/measure/rare97.js` + `run97.js`: bot (inpage6) biết chọn lựa chọn "Cơ duyên hiếm" khi thấy; ghi số kết hiếm mỗi đời.

## Thử
- Ép trạng thái từng tuyến (47/47): điều kiện đúng, lựa chọn hiện với `.ksel`, chọn ra kết hiếm, có Ngự tứ, danh hiệu, ghi sổ; nc_vuong ra hộp đi/ở; cnv thăng bậc. 0 lỗi trang.
- Playwright 755x1000@2 (và 1180x820@2, 412x1058@2, 390x844@3): thẻ lựa chọn, thẻ kết quả, tab Mệnh truyện, Sổ luân hồi; không tràn ngang, 0 lỗi trang.
- Sổ cũ (dựng không có j97, đang giữa chương) nạp được, chơi tiếp qua hồi cao trào không lỗi.

## Bot đo (30 đời, bot "sens" của inpage6 + rare97.js, 5 mảnh × 6 đời, R97CFG.p=1, p 15 % / 10 %)
`GAME=<bản dựng có meta charset> node dev/measure/run97.js sens 6 out.json`
- 30 đời, trung bình 9 hồi cao trào mỗi đời (270), đủ điều kiện 49 lần (18 %), hiện cơ duyên 10 lần, 9/30 đời gặp ít nhất 1 kết hiếm (30 %; một đời gặp 2).
- Kỳ vọng tính từ tỉ lệ đủ điều kiện: 1-(1-0,18×0,147)^9 ≈ 21 %; mẫu 30 đời trúng nhiều hơn kỳ vọng. Đặt núm `R97CFG.p=0,9` (xác suất thật 9–13,5 %) → kỳ vọng ≈ 19 %, trong khoảng mục tiêu 15–25 %. s_tinh dễ đủ điều kiện với bot "sạch" (3 lần): nâng Đức 45 → 50.
- Kết hiếm đã gặp trong đo: s_tinh ×3, s_hoa ×2, dtq_vu, s_dich, cn_ban, td_song, cn_than.
- Lưu ý: bot xoay xuất thân theo thứ tự cố định, mẫu chưa có cnv; tc ch/thd ít.

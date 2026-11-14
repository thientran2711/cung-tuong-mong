# Cảnh nền bản DỌC (-p) cho vỏ điện thoại / Fold / cột iPad — nhánh review/scene-phone

## ĐÃ HUỶ (chủ, 14/11): "Vẽ lại làm gì, lấy ảnh cũ xài, ảnh cũ ok nếu để full screen rồi"
- Giữ tranh phòng NGANG hiện có (cắt cover trong màn phòng toàn màn hình). Không vẽ bộ dọc. Nhánh này KHÔNG gộp.
- Thí điểm Phi tần cung 16 ảnh -p bị chủ chê ("Phòng nền xấu quá"): hồng kẹo/cam đậm, sàn bóng trơn + thảm to. Đã gỡ khỏi img/
  (còn trong lịch sử commit 3b9c93f3 và trên Magnific, id bên dưới). KIT_STAGE_P để trống; neo "phi-tan-cung-p" còn trong jk2b nhưng vô hại.
- Vẽ lại ảnh chủ (3 bản, gpt-2-6, tham chiếu ảnh ngang xuân-sáng): Bh4OYA1oQR (sàn gỗ, thảm nhỏ phía sau), nVj14PxYQD (sàn đá xám,
  có ghế đôn trước; bỏ), lJ8XHbIgv9 (TỐT NHẤT: đối xứng, sâu, gỗ trầm, màu dịu, thảm tròn nhỏ phía sau; chưa đưa vào game) — dừng theo lệnh.
- Tín dụng tổng: 21 lượt × 65 = 1.365.
- GIỮ cho kit owner: phát hiện PIXI (mục "Mã" dưới, kitPxBg). Khi PIXI chạy (j11), nó vẽ bản tranh ngang CĂN GIỮA phủ lên #scimg,
  bỏ qua cả cách cắt theo neo sàn KIT_FANCHOR của kitFloorFit → trên màn phòng toàn màn hình người chơi thấy khung PIXI chứ không
  phải khung đã căn neo. kitPxBg chỉ ẩn PX.bg khi dùng tranh -p; nếu phòng toàn màn dùng ảnh ngang cover-crop, cần cùng cách xử lý
  (ẩn PX.bg hoặc cho PIXI dùng cùng vị trí/tỉ lệ với #scimg).

## Đặc tả (điều phối 14/11, thay đặc tả 3:2 "-ph" cũ — không vẽ tệp -ph nào)
- img/<cảnh>-<mùa>-<buổi>-p.webp, 1536x2048 (3:4), gpt-2-6 (thư mục ba4aecfe-…), không người, cùng phòng/phong cách/màu/ánh sáng
  với ảnh ngang cùng cảnh-mùa-buổi; dựng lại theo chiều dọc.
- Đồ đạc + chi tiết chính trong ~60 % giữa bề ngang (điện thoại cắt còn ~63 % giữa); Fold cắt 10–20 % chiều cao.
- Sàn trống đi lại được ở ~45 % dưới; vùng chân ~80–92 % chiều cao; giữa sàn không có đồ.
- Mã: KIT_FANCHOR["<cảnh>-p"]={x,feet}; KIT_STAGE_P["<cảnh>"]=true khi đủ 16 tệp (jk2b §2; cơ chế đổi ảnh là của kit owner
  trên review/fold-layout 7084e7fe — phòng cao hơn rộng thì dùng -p; đã gộp, không viết cơ chế riêng).

## Cách vẽ (giữ một bố cục cho cả 16 mùa×buổi)
1. Tải ảnh ngang img/<cảnh>-<mùa>-<buổi>.webp lên Magnific (creations_upload_image từ raw.githubusercontent nhánh này).
2. ẢNH CHỦ (master): gpt-2-6, 1536x2048, tham chiếu = ảnh ngang xuân-sáng, lời nhắc "dựng lại phòng này thành tranh dọc…" (đồ đạc sát
   giữa, hai mép ngoài 20 % chỉ có tường/rèm/cửa sổ, nửa dưới sàn trống, thảm phẳng). Thử 2 bản, chọn bản 2 (đồ gần giữa hơn).
3. 16 bản mùa×buổi: gpt-2-6, tham chiếu 1 = ảnh chủ (giữ khung, kiến trúc, vị trí đồ, sàn, thảm), tham chiếu 2 = ảnh ngang cùng
   mùa-buổi (màu rèm, hoa, cảnh ngoài cửa, ánh sáng). Cả bản xuân-sáng cũng vẽ lại qua bước này để 16 bản cùng một khung.
4. PNG → webp q58 (≈330–450 KB/tệp). Ghép thử: dev/art/scene_phone_comp.py <x> <feet> [--webp] (ảnh ở dev/shots/scene-phone/).
- Giá: 65 tín dụng/ảnh (simulate_cost exact). Ước toàn bộ 160 ảnh + 10 ảnh chủ + ~15 % vẽ lại ≈ 12.700 tín dụng.

## Tiến độ
- [x] phi-tan-cung (thí điểm): 16/16, đã xem từng ảnh: cùng phòng (cửa trăng, bàn trang điểm gương tròn trái, sập phải, đèn
  lồng, thảm hoa mẫu đơn), không người, không chữ; sàn giữa trống; mùa: xuân rèm hồng/đào, hạ rèm xanh nhạt/sen, thu rèm vàng
  hổ phách/phong đỏ/cúc vàng, đông rèm gấm đỏ/tuyết/mai đỏ/lò đồng; tối: trăng, đèn nến. Neo: {x:.5, feet:.86} (giữa thảm).
  Ghi chú: bàn trang điểm (x≈.03–.30) và sập (x≈.70–.98) nằm hơi ra ngoài 60 % giữa: trên điện thoại 0,47 thấy một phần mỗi bên.
- [ ] 9 cảnh còn lại: CHỜ chủ duyệt thí điểm.

## Mã lượt vẽ (Magnific creation id)
Ảnh ngang tải lên (tham chiếu 2), phi-tan-cung: xuan-sang dty7JzdXSL, xuan-trua P3EaCip42C, xuan-chieu 5jVcTjOKxe, xuan-toi gOIB8yeSXO,
ha-sang ov9y4fS829, ha-trua O6fhaRGynm, ha-chieu 0egLlBcTfW, ha-toi rgeMp7Ixtc, thu-sang KLM0VUckqp, thu-trua nVj1xXBYQD,
thu-chieu 6AHuF0AiJO, thu-toi CqGZAxpEEy, dong-sang JNamvGhOq4, dong-trua 4RufEcs9Aa, dong-chieu jUXpd6mLD0, dong-toi jUXpdidLD0.
Ảnh chủ: 1lpVDxXr4r (bản 1, bỏ: đồ đạc sát mép), rgeMpvkxtc (bản 2, DÙNG làm ảnh chủ).
phi-tan-cung-…-p (đã dùng): xuan-sang 8aNPiScIrU, xuan-trua lJ8X8QXgv9, xuan-chieu ksDTDaF16B, xuan-toi Bh4O4c6oQR,
ha-sang 5jVcVf5Kxe, ha-trua KLM0MuJkqp, ha-chieu Bh4O4D2oQR, ha-toi XmPJPpoBfo, thu-sang TdSsSctVNR, thu-trua YMLrLnRWeC,
thu-chieu TdSsUDaVNR, thu-toi WDsxlV4cXe, dong-sang YMLrsVzWeC, dong-trua VXUlwBWMMU, dong-chieu xSdDX7fjfW, dong-toi 5jVcMwNKxe.
Tín dụng thí điểm: 18 lượt × 65 = 1.170.

## Mã (jk2b §2, cho kit owner nhận)
- KIT_STAGE_P = {"phi-tan-cung":true}; KIT_FANCHOR["phi-tan-cung-p"] = {x:.5, feet:.86}.
- SỬA THÊM kitPxBg(): PIXI (j11) đang chạy và tự vẽ bản tranh NGANG (từ SCIMG) căn giữa, che #scimg → tranh -p không hiện
  (cả neo sàn cũng bị bỏ qua trên lớp PIXI). Khi #scimg đang dùng -p: ẩn PX.bg (hạt bụi/hoa PIXI vẫn chạy), #scimg opacity 1.
  Gọi sau renderStage, sau pxScene (bọc, chờ promise) và trong ResizeObserver. Không phải -p → giữ nguyên như cũ.

## Thử Playwright (dev/test/scene-phone.js; phục vụ gốc repo với dev/index.html chép thành t-phone.html, cổng 8942, utf-8)
- 686x880@2.2 (phòng 670x741), 412x1058@2 (396x854), 1180x820@2 (cột 593x687); nơi rv; xuân-sáng / thu (main 3 buổi → tối) / đông-tối.
- #scimg = phi-tan-cung-<mùa>-<buổi>-p.webp ở cả 9 lượt; PIXI bg ẩn; chân trên thảm (614/741, 730/854, 575/687 px từ đỉnh);
  không lỗi trang, không 404. (Tiêu đề nơi hiện "rv" vì bài thử đặt S.place='rv' thẳng — không phải lỗi tranh.)

## Ảnh kiểm
- Ghép (2 người lớn cao 60 % khung, chân trên neo): dev/shots/scene-phone/phi-tan-cung-p-fold-686x880.jpg (khung phòng 670x720@2.2),
  …-phone-412x1058.jpg (400x860@2), …-ipad-1180x820.jpg (cột 680x820@2); cả 16 bản: …-all16-phone.jpg, …-all16-fold.jpg.
- Trong game (dev/test/scene-phone.js, nơi rv = Phi tần cung): dev/shots/scene-phone/game-<cỡ>-<mùa-buổi>.jpg.

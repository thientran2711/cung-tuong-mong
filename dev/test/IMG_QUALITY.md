# IMG_QUALITY — ảnh người trên mọi màn (review/img-quality)

Bộ đo `dev/test/img-quality.js` (Playwright, chạy được trên máy chậm: mỗi cỡ một tiến trình, mở lại trang khi renderer sập, `--merge` gộp bảng).
Đi qua: thanh trên + Hành sự, sân khấu ở các nơi có người + thẻ người bấm trên sân khấu, Hậu cung (Chí tôn · Phi tần · Nam nhân · Cung nhân: dải mặt + thẻ từng người),
Giao tình (từng người), Hoàng tự (+ công tử hôn sự), Phe phái, Dư đồ, Tư trang, Mệnh truyện, thẻ Hoàng thượng, hộp thoại có người, Sổ tuần, trang đầu Luân hồi,
sảnh Chơi cùng bạn, và DANH MỤC: khung chân dung kit (pcPort, đúng bề rộng ô thẻ thật) + khung nhỏ (mdH sm/xs) của MỌI người trong đời (phi tần, cung nữ, ma ma,
thái giám, Tổng quản, thái y, nam nhân, quan, công tử, hoàng tử/công chúa, Thái hậu, Hoàng thượng) ở 3 mức quen biết: người lạ / thấy mặt (???) / quen.
Mỗi ảnh: nguồn, cỡ tự nhiên, cỡ hiển thị × devicePixelRatio → hệ số phóng; phần mặt còn thấy sau object-fit/position, overflow, clip-path; 404; ảnh face-*.webp cũ
(cả lúc vừa mở thẻ, trước khi chân dung tải xong — điều máy chậm thấy). Cỡ: 755x1000@2 (Fold) và 1180x820@2 (iPad).

## Kết quả

| | phóng > 1.25 | face-* cũ | nửa mặt | 404 | làm mờ |
|---|---|---|---|---|---|
| TRƯỚC (main 14967f89) Fold | 24 | 99 | 0 | 0 | 0 |
| TRƯỚC iPad | 12 | 95 | 1 | 0 | 0 |
| SAU (review/img-quality trên main d6903038) Fold | 9 | 0 | 0 | 0 | 0 |
| SAU iPad | 0 | 0 | 0 | 0 | 0 |

Trước: 231 lần hiện ảnh lỗi / 2302 đo. Sau: 9 / 2130, lỗi trang + 404: 0.

**Còn lại (9, chỉ Fold):** người toàn thân trên sân khấu (fig-*.webp cao 900 px) hiện cao 644–689 px CSS ×2 = phóng 1,43–1,53. Cỡ sân khấu Fold đã được duyệt
(KIT §33: Fold giữ trọn .79, không áp trần maxPx), nên không thu nhỏ người; phải có ảnh lớn hơn (xem "Cần vẽ/cắt lại"). iPad 1180: 542 px → 1,20, đạt.

## Nguyên nhân (trước)

1. **face-*.webp cũ 256×256 hiện thay chân dung** (FACE_FALLBACK 194 lần): porOf (j39/j57) và kidPor (j73) trả mặt vuông cũ cho tới khi por-*.webp tải xong trong một
   Image() ẩn, rồi chỉ vẽ lại màn chính. Trên máy sếp (mạng chậm, 600 MB tranh đang tải) thẻ, dải mặt, hộp thoại hiện mặt vuông 256 px trong ô 3:4 của khung kit:
   object-fit cover → phóng 1,5–1,7, cắt hai bên (nửa mặt), lại thêm mặt nạ oval mờ viền của j60 → **mờ nhòe, phóng to, nửa mặt**.
2. **Nam nhân không có chân dung**: 11 identity "man" (FIGURES-others) bị 8 công tử ở danh sách hôn sự (j54 h54Face) lấy trước mỗi khi tab Hoàng tự vẽ;
   6/9 nam nhân trong cung (sứ thần, nhạc sư, thị vệ…) rơi về face-official-*.webp 256 px (thẻ Nam nhân: phóng 1,55–1,7) — đúng "khung chân dung nam, mặt mờ, phóng to".
3. **Người lạ sai khung**: hình bóng người lạ đặt trong khung theo vai (frame-man "khung nam", khung cung nữ/thái giám) khi mặt người không mang theo người (Tổng quản,
   thái giám triều, công tử); hình bóng cũ 360×480 là bức tượng bán thân xám trên nền mây mờ, đầu lấp gần kín ô → trông như **một khuôn mặt bị làm mờ và phóng to**.
4. Sân khấu: j59 vẽ chính hình người lạ (thật) xám + blur(2px) trong lúc chờ hình bóng tải (làm mờ mặt thật); hình bóng sân khấu 900 px phóng 1,43 ở Fold.

## Đã sửa (dev/build/jimg.js, nạp cuối assemble.py)

- Chân dung por-* trả về ngay (trình duyệt tự hiện khi tải xong); face-* cũ chỉ còn khi por thật sự lỗi (onerror) hoặc người đó không có por.
- Có hình bóng ⇒ luôn khung đá frame-unknown + nền bg-unknown + nhãn "Người lạ" (hoặc tước khi đã biết tên, như KIT 4.4); hình bóng đúng giới (nam/nữ/trẻ).
- Hình bóng người lạ cắt lại (dev/figwork/silpor.py) từ hình bóng sân khấu đã vẽ: 768×1012 (2× ô chân dung), khung bán thân như por (cả đầu + vai, không phóng),
  viền sạch mềm, nền trong suốt; hình bóng sân khấu xuất 1350 px.
- Nam nhân trong cung lấy identity trước; công tử (ở ngoài cung, chưa gặp) hiện hình bóng, không giữ identity; sổ cũ: nam nhân thiếu mặt lấy lại identity từ công tử.
- Sân khấu: người lạ chưa có hình bóng thì ẩn chứ không làm mờ mặt thật; hình bóng nạp sẵn khi vào game.

## Cần vẽ / cắt lại (điều phối)

1. **fig-*.webp (5 177 tệp) xuất lại ≥ 1 100 px cao** từ tranh gốc gpt-2-6 trên Magnific (mã lượt vẽ trong gens.txt/sheets*.txt; sheetproc.py đang thu về 900 px).
   Đây là 9 chỗ phóng còn lại trên Fold (1,43–1,53).
2. **por-*.webp cắt lại từ ảnh gốc cỡ lớn** (`porcrop.py --src-scale` / tham số src): hiện por được cắt từ fig 900 px nên đã phóng sẵn ~1,6× bên trong
   (đo 60 tệp: phi tần 1,59, cung nữ 1,59, thái giám 1,74, Hoàng thượng 1,76) — mặt mềm dù hiển thị chỉ ~0,9×. Làm cùng đợt với mục 1.
3. **Thêm ≥ 12 identity nam trẻ "công tử"** (×4 tuổi, áo không hồng/tím) để công tử có mặt khi đã gặp; hiện 11 identity chỉ đủ cho 9 nam nhân trong cung.
4. **Thêm identity thị vệ**: chỉ có 4 (thive-1..4) mà đời có 5–6 thị vệ — jmen.js cho thị vệ dùng vòng lại (hai thị vệ cùng một mặt, trái luật "mỗi người một mặt"). Cần ≥ 4 identity thị vệ nữa.

## Sau — bảng chi tiết

Bộ đo: `node dev/test/img-quality.js <baseURL> <outdir>` (Playwright). Chạy: 2026-11-15T08:15Z · cỡ 755x1000@2, 1180x820@2 · 2130 lần hiện ảnh người trên 232 màn.

Ngưỡng: phóng (cỡ hiển thị × devicePixelRatio ÷ cỡ ảnh) > 1.25 = mờ (UPSCALE) · face-*.webp cũ hiện ra = FACE_FALLBACK · mặt thấy < 85% = HALF_FACE · 404 / không giải mã = BROKEN · bộ lọc blur trên mặt thật = BLUR.

| Lỗi | số lần hiện |
|---|---|
| UPSCALE | 9 |
| FACE_FALLBACK | 0 |
| HALF_FACE | 0 |
| BROKEN | 0 |
| BLUR | 0 |
| lỗi trang / 404 | 0 |

## Chỗ lỗi (gộp theo cỡ + màn + loại nguồn)

| cỡ | màn | người (vd) | nguồn (vd) | cỡ ảnh | hiển thị css | phóng max | mặt thấy min | lỗi | lần |
|---|---|---|---|---|---|---|---|---|---|
| 755x1000@2 | lạ · Nơi home | Cung nữ Tố Cầm | img/fig-maid-m30-a18.webp | 272x900 | 195x644 | 1.43 | 100% | UPSCALE | 1 |
| 755x1000@2 | lạ · Nơi home | - | img/fig-consort-c19-t1-a18.webp | 301x900 | 215x644 | 1.43 | 100% | UPSCALE | 1 |
| 755x1000@2 | lạ · Nơi tn | - | img/fig-consort-c19-t1-a18.webp | 301x900 | 215x644 | 1.43 | 100% | UPSCALE | 1 |
| 755x1000@2 | quen · Nơi home | Cung nữ Tố Cầm | img/fig-maid-m30-a18.webp | 272x900 | 195x644 | 1.43 | 100% | UPSCALE | 1 |
| 755x1000@2 | quen · Nơi home | - | img/fig-consort-c19-t1-a18.webp | 301x900 | 215x644 | 1.43 | 100% | UPSCALE | 1 |
| 755x1000@2 | quen · Nơi dtd | Cung nữ Tố Cầm | img/fig-consort-c04-t5-a18.webp | 351x900 | 251x644 | 1.43 | 100% | UPSCALE | 2 |
| 755x1000@2 | quen · Nơi dtd · người 2 | Cung nữ Tố Cầm | img/fig-maid-m30-a18.webp | 272x900 | 195x644 | 1.43 | 100% | UPSCALE | 1 |
| 755x1000@2 | quen · Nơi dtd · người 2 | - | img/fig-consort-c19-t1-a18.webp | 301x900 | 215x644 | 1.43 | 100% | UPSCALE | 1 |

## Tất cả ảnh đã đo (gộp theo màn + loại)

| cỡ | màn | loại | số | phóng lớn nhất | mặt thấy ít nhất |
|---|---|---|---|---|---|
| 755x1000@2 | lạ · Thanh trên + Hành sự | por | 1 | 0.16 | 100% |
| 755x1000@2 | lạ · Nơi home | por | 2 | 0.16 | 100% |
| 755x1000@2 | lạ · Nơi home | fig | 2 | 1.43 | 100% |
| 755x1000@2 | lạ · Nơi home | unk | 3 | 0.05 | 100% |
| 755x1000@2 | lạ · Nơi home · người 1 | por | 2 | 0.94 | 100% |
| 755x1000@2 | lạ · Nơi thu | por | 1 | 0.16 | 100% |
| 755x1000@2 | lạ · Nơi thu · người 1 | por | 2 | 0.98 | 100% |
| 755x1000@2 | lạ · Nơi tn | por | 2 | 0.16 | 100% |
| 755x1000@2 | lạ · Nơi tn | fig | 2 | 1.43 | 100% |
| 755x1000@2 | lạ · Nơi tn | unk | 3 | 0.05 | 100% |
| 755x1000@2 | lạ · Nơi tn · người 1 | por | 1 | 0.16 | 100% |
| 755x1000@2 | lạ · Nơi tn · người 1 | unk | 1 | 0.41 | 100% |
| 755x1000@2 | lạ · Nơi tn · người 2 | por | 1 | 0.16 | 100% |
| 755x1000@2 | lạ · Nơi tn · người 2 | unk | 1 | 0.41 | 100% |
| 755x1000@2 | lạ · Nơi kn | por | 1 | 0.16 | 100% |
| 755x1000@2 | lạ · Nơi kn · người 1 | por | 1 | 0.16 | 100% |
| 755x1000@2 | lạ · Nơi kn · người 1 | unk | 1 | 0.43 | 100% |
| 755x1000@2 | lạ · Nơi kn · người 2 | por | 1 | 0.16 | 100% |
| 755x1000@2 | lạ · Nơi kn · người 2 | unk | 1 | 0.43 | 100% |
| 755x1000@2 | lạ · Hoàng thượng · Thái hậu | por | 1 | 0.16 | 100% |
| 755x1000@2 | lạ · Hoàng thượng · Thái hậu | unk | 3 | 0.41 | 100% |
| 755x1000@2 | lạ · Hoàng thượng · Thái hậu · thẻ 1 | por | 1 | 0.16 | 100% |
| 755x1000@2 | lạ · Hoàng thượng · Thái hậu · thẻ 1 | unk | 3 | 0.43 | 100% |
| 755x1000@2 | lạ · Hoàng thượng · Thái hậu · thẻ 2 | por | 1 | 0.16 | 100% |
| 755x1000@2 | lạ · Hoàng thượng · Thái hậu · thẻ 2 | unk | 3 | 0.43 | 100% |
| 755x1000@2 | lạ · Phi tần | por | 1 | 0.16 | 100% |
| 755x1000@2 | lạ · Phi tần | unk | 11 | 0.43 | 100% |
| 755x1000@2 | lạ · Phi tần · thẻ 1 | por | 1 | 0.16 | 100% |
| 755x1000@2 | lạ · Phi tần · thẻ 1 | unk | 11 | 0.43 | 100% |
| 755x1000@2 | lạ · Phi tần · thẻ 4 | por | 1 | 0.16 | 100% |
| 755x1000@2 | lạ · Phi tần · thẻ 4 | unk | 11 | 0.43 | 100% |
| 755x1000@2 | lạ · Phi tần · thẻ 7 | por | 1 | 0.16 | 100% |
| 755x1000@2 | lạ · Phi tần · thẻ 7 | unk | 12 | 0.43 | 100% |
| 755x1000@2 | lạ · Phi tần · thẻ 10 | por | 1 | 0.16 | 100% |
| 755x1000@2 | lạ · Phi tần · thẻ 10 | unk | 11 | 0.43 | 100% |
| 755x1000@2 | lạ · Nam nhân | por | 1 | 0.16 | 100% |
| 755x1000@2 | lạ · Cung nhân | por | 4 | 0.98 | 100% |
| 755x1000@2 | lạ · Cung nhân | unk | 9 | 0.05 | 100% |
| 755x1000@2 | lạ · Cung nhân · thẻ 1 | por | 4 | 0.98 | 100% |
| 755x1000@2 | lạ · Cung nhân · thẻ 1 | unk | 9 | 0.05 | 100% |
| 755x1000@2 | lạ · Cung nhân · thẻ 6 | por | 2 | 0.16 | 100% |
| 755x1000@2 | lạ · Cung nhân · thẻ 6 | unk | 10 | 0.43 | 100% |
| 755x1000@2 | lạ · Cung nhân · thẻ 11 | por | 1 | 0.16 | 100% |
| 755x1000@2 | lạ · Cung nhân · thẻ 11 | unk | 11 | 0.43 | 100% |
| 755x1000@2 | lạ · Cung nhân · thẻ 16 | por | 1 | 0.16 | 100% |
| 755x1000@2 | lạ · Cung nhân · thẻ 16 | unk | 11 | 0.43 | 100% |
| 755x1000@2 | lạ · Cung nhân · thẻ 21 | por | 1 | 0.16 | 100% |
| 755x1000@2 | lạ · Cung nhân · thẻ 21 | unk | 11 | 0.43 | 100% |
| 755x1000@2 | lạ · Giao tình | por | 2 | 0.16 | 100% |
| 755x1000@2 | lạ · Giao tình | unk | 2 | 0.05 | 100% |
| 755x1000@2 | lạ · Giao tình · me | por | 2 | 0.16 | 100% |
| 755x1000@2 | lạ · Giao tình · me | unk | 2 | 0.05 | 100% |
| 755x1000@2 | lạ · Giao tình · emp | por | 2 | 0.16 | 100% |
| 755x1000@2 | lạ · Giao tình · emp | unk | 3 | 0.36 | 100% |
| 755x1000@2 | lạ · Giao tình · th | por | 2 | 0.16 | 100% |
| 755x1000@2 | lạ · Giao tình · th | unk | 3 | 0.36 | 100% |
| 755x1000@2 | lạ · Phe phái | por | 1 | 0.16 | 100% |
| 755x1000@2 | lạ · Dư đồ | por | 1 | 0.16 | 100% |
| 755x1000@2 | lạ · Tư trang | por | 1 | 0.16 | 100% |
| 755x1000@2 | lạ · Mệnh truyện | por | 1 | 0.16 | 100% |
| 755x1000@2 | lạ · Thẻ Hoàng thượng | unk | 1 | 0.4 | 100% |
| 755x1000@2 | lạ · Hộp thoại có người | fig | 1 | 0.78 | 100% |
| 755x1000@2 | Sổ tuần | por | 1 | 0.16 | 100% |
| 755x1000@2 | thấy mặt · Danh mục 1-4 | por | 8 | 1.08 | 100% |
| 755x1000@2 | thấy mặt · Danh mục 5-8 | por | 5 | 1.08 | 100% |
| 755x1000@2 | thấy mặt · Danh mục 9-12 | por | 8 | 1.08 | 100% |
| 755x1000@2 | thấy mặt · Danh mục 13-16 | por | 5 | 1.08 | 100% |
| 755x1000@2 | thấy mặt · Danh mục 17-20 | por | 7 | 1.08 | 100% |
| 755x1000@2 | thấy mặt · Danh mục 21-24 | por | 7 | 1.08 | 100% |
| 755x1000@2 | thấy mặt · Danh mục 25-28 | por | 7 | 1.08 | 100% |
| 755x1000@2 | thấy mặt · Danh mục 29-32 | por | 7 | 1.08 | 100% |
| 755x1000@2 | thấy mặt · Danh mục 33-36 | por | 5 | 1.08 | 100% |
| 755x1000@2 | thấy mặt · Danh mục 37-40 | por | 4 | 1.08 | 100% |
| 755x1000@2 | thấy mặt · Danh mục 41-44 | por | 7 | 1.08 | 100% |
| 755x1000@2 | thấy mặt · Danh mục 45-48 | por | 4 | 1.08 | 100% |
| 755x1000@2 | thấy mặt · Danh mục 49-52 | por | 8 | 1.08 | 100% |
| 755x1000@2 | thấy mặt · Danh mục 53-56 | por | 8 | 1.08 | 100% |
| 755x1000@2 | thấy mặt · Danh mục 57-60 | por | 8 | 1.08 | 100% |
| 755x1000@2 | thấy mặt · Danh mục 61-64 | por | 8 | 1.08 | 100% |
| 755x1000@2 | thấy mặt · Danh mục 65-68 | por | 3 | 1.08 | 100% |
| 755x1000@2 | thấy mặt · Danh mục 65-68 | unk | 5 | 0.47 | 100% |
| 755x1000@2 | thấy mặt · Danh mục 69-72 | unk | 8 | 0.47 | 100% |
| 755x1000@2 | thấy mặt · Danh mục 73-73 | unk | 3 | 0.47 | 100% |
| 755x1000@2 | quen · Thanh trên + Hành sự | por | 1 | 0.16 | 100% |
| 755x1000@2 | quen · Nơi home | por | 5 | 0.16 | 100% |
| 755x1000@2 | quen · Nơi home | fig | 2 | 1.43 | 100% |
| 755x1000@2 | quen · Nơi home · người 1 | por | 2 | 0.94 | 100% |
| 755x1000@2 | quen · Nơi vuon | por | 1 | 0.16 | 100% |
| 755x1000@2 | quen · Nơi vuon · người 1 | por | 2 | 0.98 | 100% |
| 755x1000@2 | quen · Nơi vuon · người 2 | por | 2 | 0.98 | 100% |
| 755x1000@2 | quen · Nơi dtd | por | 5 | 0.16 | 100% |
| 755x1000@2 | quen · Nơi dtd | fig | 2 | 1.43 | 100% |
| 755x1000@2 | quen · Nơi dtd · người 1 | por | 2 | 0.94 | 100% |
| 755x1000@2 | quen · Nơi dtd · người 2 | por | 5 | 0.16 | 100% |
| 755x1000@2 | quen · Nơi dtd · người 2 | fig | 2 | 1.43 | 100% |
| 755x1000@2 | quen · Nơi tn | por | 1 | 0.16 | 100% |
| 755x1000@2 | quen · Nơi tn · người 1 | por | 2 | 0.98 | 100% |
| 755x1000@2 | quen · Hoàng thượng · Thái hậu | por | 4 | 0.94 | 100% |
| 755x1000@2 | quen · Hoàng thượng · Thái hậu · thẻ 1 | por | 4 | 0.98 | 100% |
| 755x1000@2 | quen · Hoàng thượng · Thái hậu · thẻ 2 | por | 4 | 0.98 | 100% |
| 755x1000@2 | quen · Phi tần | por | 11 | 0.98 | 100% |
| 755x1000@2 | quen · Phi tần · thẻ 1 | por | 11 | 0.98 | 100% |
| 755x1000@2 | quen · Phi tần · thẻ 4 | por | 11 | 0.98 | 100% |
| 755x1000@2 | quen · Phi tần · thẻ 7 | por | 11 | 0.98 | 100% |
| 755x1000@2 | quen · Phi tần · thẻ 10 | por | 11 | 0.98 | 100% |
| 755x1000@2 | quen · Nam nhân | por | 11 | 0.98 | 100% |
| 755x1000@2 | quen · Nam nhân · thẻ 1 | por | 11 | 0.98 | 100% |
| 755x1000@2 | quen · Nam nhân · thẻ 3 | por | 11 | 0.98 | 100% |
| 755x1000@2 | quen · Nam nhân · thẻ 5 | por | 11 | 0.98 | 100% |
| 755x1000@2 | quen · Nam nhân · thẻ 7 | por | 11 | 0.98 | 100% |
| 755x1000@2 | quen · Nam nhân · thẻ 9 | por | 11 | 0.98 | 100% |
| 755x1000@2 | quen · Cung nhân | por | 12 | 0.98 | 100% |
| 755x1000@2 | quen · Cung nhân · thẻ 1 | por | 12 | 0.98 | 100% |
| 755x1000@2 | quen · Cung nhân · thẻ 6 | por | 12 | 0.98 | 100% |
| 755x1000@2 | quen · Cung nhân · thẻ 11 | por | 12 | 0.98 | 100% |
| 755x1000@2 | quen · Cung nhân · thẻ 16 | por | 12 | 0.98 | 100% |
| 755x1000@2 | quen · Cung nhân · thẻ 21 | por | 12 | 0.98 | 100% |
| 755x1000@2 | quen · Giao tình | por | 17 | 0.82 | 100% |
| 755x1000@2 | quen · Giao tình · me | por | 17 | 0.82 | 100% |
| 755x1000@2 | quen · Giao tình · 1 | por | 16 | 0.16 | 100% |
| 755x1000@2 | quen · Giao tình · 2 | por | 16 | 0.16 | 100% |
| 755x1000@2 | quen · Giao tình · 3 | por | 16 | 0.16 | 100% |
| 755x1000@2 | quen · Giao tình · 4 | por | 16 | 0.16 | 100% |
| 755x1000@2 | quen · Giao tình · 5 | por | 16 | 0.16 | 100% |
| 755x1000@2 | quen · Giao tình · 6 | por | 16 | 0.16 | 100% |
| 755x1000@2 | quen · Giao tình · 7 | por | 16 | 0.16 | 100% |
| 755x1000@2 | quen · Hoàng tự | por | 2 | 0.16 | 100% |
| 755x1000@2 | quen · Hoàng tự | unk | 8 | 0.05 | 100% |
| 755x1000@2 | quen · Phe phái | por | 1 | 0.16 | 100% |
| 755x1000@2 | quen · Dư đồ | por | 1 | 0.16 | 100% |
| 755x1000@2 | quen · Tư trang | por | 1 | 0.16 | 100% |
| 755x1000@2 | quen · Mệnh truyện | por | 1 | 0.16 | 100% |
| 755x1000@2 | quen · Thẻ Hoàng thượng | por | 1 | 0.94 | 100% |
| 755x1000@2 | quen · Hộp thoại có người | por | 1 | 0.16 | 100% |
| 755x1000@2 | quen · Danh mục 1-4 | por | 8 | 1.08 | 100% |
| 755x1000@2 | quen · Danh mục 5-8 | por | 5 | 1.08 | 100% |
| 755x1000@2 | quen · Danh mục 9-12 | por | 8 | 1.08 | 100% |
| 755x1000@2 | quen · Danh mục 13-16 | por | 5 | 1.08 | 100% |
| 755x1000@2 | quen · Danh mục 17-20 | por | 7 | 1.08 | 100% |
| 755x1000@2 | quen · Danh mục 21-24 | por | 7 | 1.08 | 100% |
| 755x1000@2 | quen · Danh mục 25-28 | por | 7 | 1.08 | 100% |
| 755x1000@2 | quen · Danh mục 29-32 | por | 7 | 1.08 | 100% |
| 755x1000@2 | quen · Danh mục 33-36 | por | 5 | 1.08 | 100% |
| 755x1000@2 | quen · Danh mục 37-40 | por | 4 | 1.08 | 100% |
| 755x1000@2 | quen · Danh mục 41-44 | por | 7 | 1.08 | 100% |
| 755x1000@2 | quen · Danh mục 45-48 | por | 4 | 1.08 | 100% |
| 755x1000@2 | quen · Danh mục 49-52 | por | 8 | 1.08 | 100% |
| 755x1000@2 | quen · Danh mục 53-56 | por | 8 | 1.08 | 100% |
| 755x1000@2 | quen · Danh mục 57-60 | por | 8 | 1.08 | 100% |
| 755x1000@2 | quen · Danh mục 61-64 | por | 8 | 1.08 | 100% |
| 755x1000@2 | quen · Danh mục 65-68 | por | 3 | 1.08 | 100% |
| 755x1000@2 | quen · Danh mục 65-68 | unk | 5 | 0.47 | 100% |
| 755x1000@2 | quen · Danh mục 69-72 | unk | 8 | 0.47 | 100% |
| 755x1000@2 | quen · Danh mục 73-73 | unk | 3 | 0.47 | 100% |
| 1180x820@2 | lạ · Thanh trên + Hành sự | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Thanh trên + Hành sự | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Thanh trên + Hành sự | unk | 3 | 0.05 | 100% |
| 1180x820@2 | lạ · Nơi home | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Nơi home | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Nơi home | unk | 3 | 0.05 | 100% |
| 1180x820@2 | lạ · Nơi home · người 1 | por | 3 | 0.83 | 100% |
| 1180x820@2 | lạ · Nơi home · người 1 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Nơi home · người 1 | unk | 3 | 0.05 | 100% |
| 1180x820@2 | lạ · Nơi vuon | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Nơi vuon | fig | 3 | 1.2 | 100% |
| 1180x820@2 | lạ · Nơi vuon | unk | 3 | 0.05 | 100% |
| 1180x820@2 | lạ · Nơi vuon · người 1 | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Nơi vuon · người 1 | fig | 3 | 1.2 | 100% |
| 1180x820@2 | lạ · Nơi vuon · người 1 | unk | 4 | 0.36 | 100% |
| 1180x820@2 | lạ · Nơi vuon · người 2 | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Nơi vuon · người 2 | fig | 3 | 1.2 | 100% |
| 1180x820@2 | lạ · Nơi vuon · người 2 | unk | 4 | 0.36 | 100% |
| 1180x820@2 | lạ · Nơi thu | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Nơi thu | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Nơi thu | unk | 3 | 0.05 | 100% |
| 1180x820@2 | lạ · Nơi thu · người 1 | por | 3 | 0.83 | 100% |
| 1180x820@2 | lạ · Nơi thu · người 1 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Nơi thu · người 1 | unk | 3 | 0.05 | 100% |
| 1180x820@2 | lạ · Nơi tn | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Nơi tn | fig | 3 | 1.2 | 100% |
| 1180x820@2 | lạ · Nơi tn | unk | 3 | 0.05 | 100% |
| 1180x820@2 | lạ · Nơi tn · người 1 | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Nơi tn · người 1 | fig | 3 | 1.2 | 100% |
| 1180x820@2 | lạ · Nơi tn · người 1 | unk | 4 | 0.36 | 100% |
| 1180x820@2 | lạ · Nơi tn · người 2 | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Nơi tn · người 2 | fig | 3 | 1.2 | 100% |
| 1180x820@2 | lạ · Nơi tn · người 2 | unk | 4 | 0.36 | 100% |
| 1180x820@2 | lạ · Hoàng thượng · Thái hậu | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Hoàng thượng · Thái hậu | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Hoàng thượng · Thái hậu | unk | 7 | 0.36 | 100% |
| 1180x820@2 | lạ · Hoàng thượng · Thái hậu · thẻ 1 | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Hoàng thượng · Thái hậu · thẻ 1 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Hoàng thượng · Thái hậu · thẻ 1 | unk | 7 | 0.36 | 100% |
| 1180x820@2 | lạ · Hoàng thượng · Thái hậu · thẻ 2 | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Hoàng thượng · Thái hậu · thẻ 2 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Hoàng thượng · Thái hậu · thẻ 2 | unk | 6 | 0.36 | 100% |
| 1180x820@2 | lạ · Phi tần | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Phi tần | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Phi tần | unk | 11 | 0.36 | 100% |
| 1180x820@2 | lạ · Phi tần · thẻ 1 | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Phi tần · thẻ 1 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Phi tần · thẻ 1 | unk | 11 | 0.36 | 100% |
| 1180x820@2 | lạ · Phi tần · thẻ 4 | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Phi tần · thẻ 4 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Phi tần · thẻ 4 | unk | 11 | 0.36 | 100% |
| 1180x820@2 | lạ · Phi tần · thẻ 7 | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Phi tần · thẻ 7 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Phi tần · thẻ 7 | unk | 11 | 0.36 | 100% |
| 1180x820@2 | lạ · Phi tần · thẻ 10 | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Phi tần · thẻ 10 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Phi tần · thẻ 10 | unk | 11 | 0.36 | 100% |
| 1180x820@2 | lạ · Nam nhân | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Nam nhân | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Nam nhân | unk | 3 | 0.05 | 100% |
| 1180x820@2 | lạ · Cung nhân | por | 5 | 0.83 | 100% |
| 1180x820@2 | lạ · Cung nhân | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Cung nhân | unk | 8 | 0.07 | 100% |
| 1180x820@2 | lạ · Cung nhân · thẻ 1 | por | 5 | 0.83 | 100% |
| 1180x820@2 | lạ · Cung nhân · thẻ 1 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Cung nhân · thẻ 1 | unk | 8 | 0.07 | 100% |
| 1180x820@2 | lạ · Cung nhân · thẻ 6 | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Cung nhân · thẻ 6 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Cung nhân · thẻ 6 | unk | 11 | 0.36 | 100% |
| 1180x820@2 | lạ · Cung nhân · thẻ 11 | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Cung nhân · thẻ 11 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Cung nhân · thẻ 11 | unk | 11 | 0.36 | 100% |
| 1180x820@2 | lạ · Cung nhân · thẻ 16 | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Cung nhân · thẻ 16 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Cung nhân · thẻ 16 | unk | 11 | 0.36 | 100% |
| 1180x820@2 | lạ · Cung nhân · thẻ 21 | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Cung nhân · thẻ 21 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Cung nhân · thẻ 21 | unk | 11 | 0.36 | 100% |
| 1180x820@2 | lạ · Giao tình | por | 3 | 0.16 | 100% |
| 1180x820@2 | lạ · Giao tình | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Giao tình | unk | 5 | 0.05 | 100% |
| 1180x820@2 | lạ · Giao tình · me | por | 3 | 0.16 | 100% |
| 1180x820@2 | lạ · Giao tình · me | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Giao tình · me | unk | 5 | 0.05 | 100% |
| 1180x820@2 | lạ · Giao tình · emp | por | 3 | 0.16 | 100% |
| 1180x820@2 | lạ · Giao tình · emp | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Giao tình · emp | unk | 6 | 0.38 | 100% |
| 1180x820@2 | lạ · Giao tình · th | por | 3 | 0.16 | 100% |
| 1180x820@2 | lạ · Giao tình · th | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Giao tình · th | unk | 6 | 0.14 | 100% |
| 1180x820@2 | lạ · Hoàng tự | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Hoàng tự | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Hoàng tự | unk | 9 | 0.05 | 100% |
| 1180x820@2 | lạ · Phe phái | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Phe phái | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Phe phái | unk | 3 | 0.05 | 100% |
| 1180x820@2 | lạ · Dư đồ | por | 1 | 0.16 | 100% |
| 1180x820@2 | lạ · Tư trang | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Tư trang | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Tư trang | unk | 3 | 0.05 | 100% |
| 1180x820@2 | lạ · Mệnh truyện | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Mệnh truyện | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Mệnh truyện | unk | 3 | 0.05 | 100% |
| 1180x820@2 | lạ · Thẻ Hoàng thượng | unk | 1 | 0.4 | 100% |
| 1180x820@2 | lạ · Hộp thoại có người | por | 2 | 0.16 | 100% |
| 1180x820@2 | lạ · Hộp thoại có người | fig | 2 | 1.2 | 100% |
| 1180x820@2 | lạ · Hộp thoại có người | unk | 3 | 0.05 | 100% |
| 1180x820@2 | Sổ tuần | fig | 1 | 0.78 | 100% |
| 1180x820@2 | thấy mặt · Danh mục 1-6 | por | 13 | 0.95 | 100% |
| 1180x820@2 | thấy mặt · Danh mục 7-12 | por | 14 | 0.95 | 100% |
| 1180x820@2 | thấy mặt · Danh mục 13-18 | por | 11 | 0.95 | 100% |
| 1180x820@2 | thấy mặt · Danh mục 19-24 | por | 10 | 0.95 | 100% |
| 1180x820@2 | thấy mặt · Danh mục 25-30 | por | 11 | 0.95 | 100% |
| 1180x820@2 | thấy mặt · Danh mục 31-36 | por | 10 | 0.95 | 100% |
| 1180x820@2 | thấy mặt · Danh mục 37-42 | por | 10 | 0.95 | 100% |
| 1180x820@2 | thấy mặt · Danh mục 43-48 | por | 7 | 0.95 | 100% |
| 1180x820@2 | thấy mặt · Danh mục 49-54 | por | 14 | 0.95 | 100% |
| 1180x820@2 | thấy mặt · Danh mục 55-60 | por | 14 | 0.95 | 100% |
| 1180x820@2 | thấy mặt · Danh mục 61-66 | por | 14 | 0.95 | 100% |
| 1180x820@2 | thấy mặt · Danh mục 67-72 | por | 3 | 0.95 | 100% |
| 1180x820@2 | thấy mặt · Danh mục 67-72 | unk | 11 | 0.42 | 100% |
| 1180x820@2 | thấy mặt · Danh mục 73-75 | unk | 9 | 0.42 | 100% |
| 1180x820@2 | quen · Thanh trên + Hành sự | por | 5 | 0.16 | 100% |
| 1180x820@2 | quen · Thanh trên + Hành sự | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Nơi home | por | 5 | 0.16 | 100% |
| 1180x820@2 | quen · Nơi home | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Nơi home · người 1 | por | 6 | 0.83 | 100% |
| 1180x820@2 | quen · Nơi home · người 1 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Nơi thu | por | 5 | 0.16 | 100% |
| 1180x820@2 | quen · Nơi thu | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Nơi thu · người 1 | por | 6 | 0.83 | 100% |
| 1180x820@2 | quen · Nơi thu · người 1 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Nơi tn | por | 5 | 0.16 | 100% |
| 1180x820@2 | quen · Nơi tn | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Nơi tn · người 1 | por | 6 | 0.83 | 100% |
| 1180x820@2 | quen · Nơi tn · người 1 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Nơi kn | por | 5 | 0.16 | 100% |
| 1180x820@2 | quen · Nơi kn | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Nơi kn · người 1 | por | 6 | 0.83 | 100% |
| 1180x820@2 | quen · Nơi kn · người 1 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Hoàng thượng · Thái hậu | por | 8 | 0.83 | 100% |
| 1180x820@2 | quen · Hoàng thượng · Thái hậu | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Hoàng thượng · Thái hậu · thẻ 1 | por | 9 | 0.83 | 100% |
| 1180x820@2 | quen · Hoàng thượng · Thái hậu · thẻ 1 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Hoàng thượng · Thái hậu · thẻ 2 | por | 8 | 0.83 | 100% |
| 1180x820@2 | quen · Hoàng thượng · Thái hậu · thẻ 2 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Phi tần | por | 12 | 0.83 | 100% |
| 1180x820@2 | quen · Phi tần | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Phi tần · thẻ 1 | por | 12 | 0.83 | 100% |
| 1180x820@2 | quen · Phi tần · thẻ 1 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Phi tần · thẻ 4 | por | 12 | 0.83 | 100% |
| 1180x820@2 | quen · Phi tần · thẻ 4 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Phi tần · thẻ 7 | por | 12 | 0.83 | 100% |
| 1180x820@2 | quen · Phi tần · thẻ 7 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Phi tần · thẻ 10 | por | 12 | 0.83 | 100% |
| 1180x820@2 | quen · Phi tần · thẻ 10 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Nam nhân | por | 12 | 0.83 | 100% |
| 1180x820@2 | quen · Nam nhân | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Nam nhân · thẻ 1 | por | 12 | 0.83 | 100% |
| 1180x820@2 | quen · Nam nhân · thẻ 1 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Nam nhân · thẻ 3 | por | 12 | 0.83 | 100% |
| 1180x820@2 | quen · Nam nhân · thẻ 3 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Nam nhân · thẻ 5 | por | 12 | 0.83 | 100% |
| 1180x820@2 | quen · Nam nhân · thẻ 5 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Nam nhân · thẻ 7 | por | 12 | 0.83 | 100% |
| 1180x820@2 | quen · Nam nhân · thẻ 7 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Nam nhân · thẻ 9 | por | 12 | 0.83 | 100% |
| 1180x820@2 | quen · Nam nhân · thẻ 9 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Cung nhân | por | 13 | 0.83 | 100% |
| 1180x820@2 | quen · Cung nhân | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Cung nhân · thẻ 1 | por | 13 | 0.83 | 100% |
| 1180x820@2 | quen · Cung nhân · thẻ 1 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Cung nhân · thẻ 6 | por | 13 | 0.83 | 100% |
| 1180x820@2 | quen · Cung nhân · thẻ 6 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Cung nhân · thẻ 11 | por | 13 | 0.83 | 100% |
| 1180x820@2 | quen · Cung nhân · thẻ 11 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Cung nhân · thẻ 16 | por | 13 | 0.83 | 100% |
| 1180x820@2 | quen · Cung nhân · thẻ 16 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Cung nhân · thẻ 21 | por | 13 | 0.83 | 100% |
| 1180x820@2 | quen · Cung nhân · thẻ 21 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Giao tình · me | por | 21 | 0.47 | 100% |
| 1180x820@2 | quen · Giao tình · me | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Giao tình · 1 | por | 20 | 0.16 | 100% |
| 1180x820@2 | quen · Giao tình · 1 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Giao tình · 2 | por | 20 | 0.16 | 100% |
| 1180x820@2 | quen · Giao tình · 2 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Giao tình · 3 | por | 20 | 0.16 | 100% |
| 1180x820@2 | quen · Giao tình · 3 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Giao tình · 4 | por | 20 | 0.16 | 100% |
| 1180x820@2 | quen · Giao tình · 4 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Giao tình · 5 | por | 20 | 0.16 | 100% |
| 1180x820@2 | quen · Giao tình · 5 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Giao tình · 6 | por | 20 | 0.16 | 100% |
| 1180x820@2 | quen · Giao tình · 6 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Giao tình · 7 | por | 20 | 0.16 | 100% |
| 1180x820@2 | quen · Giao tình · 7 | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Hoàng tự | por | 7 | 0.16 | 100% |
| 1180x820@2 | quen · Hoàng tự | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Hoàng tự | unk | 4 | 0.05 | 100% |
| 1180x820@2 | quen · Phe phái | por | 5 | 0.16 | 100% |
| 1180x820@2 | quen · Phe phái | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Dư đồ | por | 1 | 0.16 | 100% |
| 1180x820@2 | quen · Tư trang | por | 5 | 0.16 | 100% |
| 1180x820@2 | quen · Tư trang | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Mệnh truyện | por | 5 | 0.16 | 100% |
| 1180x820@2 | quen · Mệnh truyện | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Thẻ Hoàng thượng | por | 1 | 0.94 | 100% |
| 1180x820@2 | quen · Hộp thoại có người | por | 5 | 0.16 | 100% |
| 1180x820@2 | quen · Hộp thoại có người | fig | 2 | 1.2 | 100% |
| 1180x820@2 | quen · Danh mục 1-6 | por | 13 | 0.95 | 100% |
| 1180x820@2 | quen · Danh mục 7-12 | por | 14 | 0.95 | 100% |
| 1180x820@2 | quen · Danh mục 13-18 | por | 11 | 0.95 | 100% |
| 1180x820@2 | quen · Danh mục 19-24 | por | 10 | 0.95 | 100% |
| 1180x820@2 | quen · Danh mục 25-30 | por | 11 | 0.95 | 100% |
| 1180x820@2 | quen · Danh mục 31-36 | por | 10 | 0.95 | 100% |
| 1180x820@2 | quen · Danh mục 37-42 | por | 10 | 0.95 | 100% |
| 1180x820@2 | quen · Danh mục 43-48 | por | 7 | 0.95 | 100% |
| 1180x820@2 | quen · Danh mục 49-54 | por | 14 | 0.95 | 100% |
| 1180x820@2 | quen · Danh mục 55-60 | por | 14 | 0.95 | 100% |
| 1180x820@2 | quen · Danh mục 61-66 | por | 14 | 0.95 | 100% |
| 1180x820@2 | quen · Danh mục 67-72 | por | 3 | 0.95 | 100% |
| 1180x820@2 | quen · Danh mục 67-72 | unk | 11 | 0.42 | 100% |
| 1180x820@2 | quen · Danh mục 73-75 | unk | 9 | 0.42 | 100% |
| 1180x820@2 | quen · Giao tình | por | 21 | 0.49 | 100% |
| 1180x820@2 | quen · Giao tình | fig | 2 | 1.2 | 100% |
| 755x1000@2 | lạ · Hoàng tự | por | 4 | 0.16 | 100% |
| 755x1000@2 | lạ · Hoàng tự | unk | 7 | 0.05 | 100% |


## Trước — gộp theo cỡ + tệp (main 14967f89)

| cỡ | tệp | lỗi | lần |
|---|---|---|---|
| 755x1000@2 | face-official-#.webp | FACE_FALLBACK | 74 |
| 1180x820@2 | face-official-#.webp | FACE_FALLBACK | 54 |
| 1180x820@2 | face-physician.webp | FACE_FALLBACK | 18 |
| 755x1000@2 | face-official-#.webp | UPSCALE+FACE_FALLBACK | 12 |
| 1180x820@2 | face-official-#.webp | UPSCALE+FACE_FALLBACK | 10 |
| 755x1000@2 | fig-consort-c#-t#-a#.webp | UPSCALE | 7 |
| 755x1000@2 | face-eunuch-#.webp | FACE_FALLBACK | 5 |
| 755x1000@2 | face-maid-#.webp | FACE_FALLBACK | 4 |
| 755x1000@2 | fig-maid-m#-a#.webp | UPSCALE | 4 |
| 1180x820@2 | face-consort-#.webp | FACE_FALLBACK | 4 |
| 1180x820@2 | face-eunuch-#.webp | FACE_FALLBACK | 4 |
| 755x1000@2 | face-consort-#.webp | FACE_FALLBACK | 3 |
| 1180x820@2 | face-maid-#.webp | FACE_FALLBACK | 2 |
| 1180x820@2 | face-physician.webp | UPSCALE+FACE_FALLBACK | 2 |
| 755x1000@2 | face-emperor-#.webp | FACE_FALLBACK | 1 |
| 755x1000@2 | unknown-fig-f.webp | UPSCALE | 1 |
| 1180x820@2 | face-emperor-#.webp | FACE_FALLBACK | 1 |
| 1180x820@2 | por-man-thaiy-#-a#.webp | HALF_FACE | 1 |

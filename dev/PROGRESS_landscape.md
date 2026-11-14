# PROGRESS review/landscape-art (thợ nền ngang, 14/11)
Nhiệm vụ: sếp 16:05Z — mọi nền toàn màn phải có tranh dọc VÀ tranh ngang vẽ riêng (gpt-2-6), không kéo giãn / mờ / để trống.

## Đã làm
- Bộ nền kit `dev/build/jbd.js` (nạp trước j74): sổ `KIT_BD` + `kitBackdrop(el,key,{box})`; chọn tranh theo hướng màn (CSS media) hoặc theo hình khung (ResizeObserver, `data-kbdo`). KIT.md mục 30.
- Nối: tựa đề `#title.title` (j74 bỏ nền riêng), nền chuyển kiếp + bánh xe xuất thân (jk2b dùng kitBackdrop), bục vinh danh `.kpod` (j90, đo khung), thị tẩm `.modal.night` (p1).
- Tranh mới (Magnific gpt-2-6, thư mục ba4aecfe):
  - img/title-key-l.webp 2100x1400 — bố cục ngang của tranh tựa đề (lượt 5jVW2y0Kxe; tham chiếu tải lên eIOUrlAdqL). Lượt bỏ: VXUs57JMMU, rgeVGXrxtc (bên phải chỉ sương), iGquhp73uK.
  - img/kit/podium-bg-p.webp 1050x1400 (lượt rgeVnAmxtc; bỏ KLMcAREkqp; tham chiếu TdSLKCJVNR).
  - img/tam-cung-dem-p.webp 1050x1400 (lượt lJ8dVoDgv9; bỏ lJ8dVoagv9; tham chiếu eIOULgZdqL).
- Kiểm kê: xem KIT.md mục 30 (bảng + "Not backdrops").

## Còn lại / ghi chú
- Nền minigame (review/minigames, chưa vào main) là ô vuông trong khung trò chơi; khi nhánh đó vào main, cái nào hiện toàn màn phải thêm vào KIT_BD với hai hướng.
- Cảnh sân khấu (SCIMG 1280x720) thuộc thợ bố cục sân khấu (review/fold-layout) — không đụng.

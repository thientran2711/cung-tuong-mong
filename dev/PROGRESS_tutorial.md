# review/tutorial (gốc origin/main b165b1f71) — Lời dặn tân thủ (sếp 15/11 03:55Z)

- Mã: `dev/build/jtut.js` (trước j84 trong assemble.py). Kit: KIT.md §36 (kitCoach khoanh sáng + kitTip lời dặn lần đầu).
- Người dẫn: Quế ma ma — tranh ma ma có sẵn (FIGURES-servants role mama, a51), lấy mặt ma ma chưa ai dùng trong kiếp (S.fidUsed, giữ ở S.tutFid).
- Lượt dẫn 12 bước (KTUT_STEPS): Lời chào · Thanh trên cùng · Buổi/khắc/quẻ tuần · Đọc một thẻ việc · Làm thử (+ Thẻ kết quả) · Dư đồ · Hậu cung ·
  Cung nhân · Tư trang · Sổ ghi · Ghi sổ/Nạp sổ (☰) · Qua buổi.
- Lời dặn lần đầu (KTUT_TIPS): 11 mục + quẻ đầu tuần, trò nhỏ, mưu kế, thị tẩm, có thai, tuyển tú, tranh ghế, lãnh cung, luân hồi, chơi cùng bạn.
- Bật/tắt: Thiết lập "Lời dặn tân thủ" (OPT.tut). ☰ → "Xem lại lời dặn". Sổ cũ: hỏi một lần (Không cần / Nghe ma ma dặn).
- Tắt khi bot (__bot, quiet) và trình duyệt tự động (navigator.webdriver) trừ khi localStorage hclh-tut-test=1 hoặc ?tut=1.
- Kiểm: `node dev/test/tutorial.js <url> WxH@dpr dev/shots/tutorial <tag> [tour,skip,replay,old,bot]`.

## TẠM DỪNG (đĩa đầy, điều phối) — trạng thái để làm tiếp
- Đã chạy tay trên Fold (bản trước): bước 1–6 hiện đúng (chào, thanh trên, buổi/khắc/quẻ, đọc thẻ, làm thử → kết quả, Dư đồ). Sửa sau đó: chờ #rtoast
  mới sang bước Thẻ kết quả; lời quẻ "Hung"; bảng Bạc/Sức/Sủng/Danh tách hàng; lời dặn lần đầu bị dialog che thì ẩn rồi hiện lại.
- Bước nhóm mục (GROUP_ANCHORS rv/rel/staff + SUBSAY theo data-ksub, nhãn đọc từ nút sống, KG) để hợp bố cục mới của review/hau-cung-ui
  (Hậu cung: Hoàng thượng · Thái hậu | Phi tần | Nam nhân | Cung nhân; Giao tình: Ân oán | Phe phái). Khi nhánh ấy vào main: kiểm tên khóa
  data-ksub mới (vd emp/th/men) rồi thêm vào SUBSAY, KTUT_TIPS ("tab-<khóa>"), GROUP_ANCHORS nếu cần.
- CHƯA XONG: dev/test/tutorial.js chưa chạy trọn (đã sửa: bấm qua vòng luân hồi .kroul + thẻ thân phận). Còn chạy: Fold 755x1000@2 (tour,skip,replay,old,bot),
  iPad 1180x820@2, 412x1058@2, 390x844@3; ảnh vào dev/shots/tutorial/; dựng lại site (bash dev/site/build_site.sh) rồi commit index.html/sw.js.
- Đã đạt: chế độ bot (webdriver không cờ + window.__bot) không bật lượt dẫn, không lời dặn (fold bot: fails 0).
- Lưu ý máy: Hậu cung (rv) ở Fold từng treo trang headless khi máy quá tải (cả bản main chưa có jtut) — xem lại khi máy nhẹ.

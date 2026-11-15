# Kiểm duyệt kit: review/coop @ 0c986a53 (bản phát hành gộp: Chơi cùng bạn + book-release 1b90526) — PASS

Ngày 2026-11-15 ~01:10Z. Người kiểm độc lập (chỉ xét, không sửa).

## Gộp thử
- origin/main 1ebb0bb6 là tổ tiên của review/coop (0 commit main thiếu trên nhánh, 111 commit mới) → gộp thử SẠCH, 0 xung đột (thực chất fast-forward).
- `python3 dev/build/assemble.py` trên nhánh cho ra đúng all.js/dev/index.html đã commit (git status sạch). `node dev/test/kit_dupes.js` → OK.
- **BẮT BUỘC khi gộp main:** `index.html` gốc (bản site) trên nhánh vẫn là bản dựng của book-release 1b90526 — KHÔNG có co-op (0 lần "Chơi cùng bạn").
  Phải chạy `bash dev/site/build_site.sh` rồi commit index.html + sw.js trong commit gộp (như các lần gộp trước "dựng lại site"); nếu không, trang sống sẽ không có Chơi cùng bạn.
  Người kiểm đã dựng thử site (rồi trả lại) và chạy các thử dưới đây trên chính bản site đó.

## Co-op (Worker sống https://ctm-coop.victoria-tntt.workers.dev)
- `node dev/test/coop-e2e.js` do người kiểm tự chạy: **59/59 ok** (phòng 9NG4): lập phòng, vào bằng ?room=, 3 tuần chung (cùng ngày, thấy nhau là người),
  B rời → A đứng "Đợi bạn trở lại", B trở lại cùng tuần, B chết → kiếp mới trong CÙNG thế giới, chơi một mình + save cũ vẫn nạp; 0 lỗi trang, 0 tràn ngang ở Fold 686x880@2.2 và iPad 1180x820@2.
- Màn sảnh (ảnh dev/shots/review/coop-release/): tựa đề "Chơi một mình / Chơi cùng bạn / Sổ luân hồi / Thiết lập"; "Chơi cùng bạn" → Mời bạn · Nhập mã · ‹ Lui;
  "Mời bạn" → MÃ PHÒNG chữ lớn vàng, BẠN chưa vào phòng, Đường dẫn mời + Chép đường dẫn / Gửi cho bạn; "Đợi bạn trở lại" (BẠN đang vắng / NGƯƠI đang ở trong cuộc, Về màn đầu);
  "Đợi bạn" BÁO khi khách vào lúc chủ phòng chọn thân phận; nút Qua buổi đổi thành "Đợi bạn xong buổi". Tất cả là khung kit (kpanel/kbtn/kr, thẻ BÁO), lời cổ trang đúng VANPHONG; "bạn" chỉ ở màn co-op (đúng nhãn chủ chọn).
- Mã: jcoop/jcooplobby/jcoopworld nối thêm sau jk4, mọi bọc hàm (runAct, endTurn, nextBuoi, save, over, render, placeWhere…) đều `if(!CW.on) return f(...)` → chơi một mình đi đường cũ. jcooplobby có một khối <style> nhỏ chỉ bố cục trên lớp kit (lưới nút, cỡ chữ mã phòng, z-index) — không khung riêng; chấp nhận.

## Chơi một mình — không lùi (tự viết thử, 686x880@2.2, 1180x820@2, 1366x1024@2)
- Save cũ: tạo save bằng index.html của origin/main (ser() → hclh-save-v2-1), mở bản nhánh: tựa đề hiện "Chơi một mình · Tiếp tục: <tước> <tên>", nạp đúng người, Qua buổi chạy (0:0→1:0), **0 lỗi trang** ở cả 3 cỡ.
- Mọi tab (Hành sự, Dư đồ, Hậu cung/Giao tình, Phe, Cung nhân, Hoàng tự, Tư trang, Tài nghệ, Mệnh truyện, Sổ ghi): 0 tràn ngang, 0 chữ bị cắt/ellipsis.
- Một nền sân khấu (một tranh phòng; lớp thứ hai đo được là canvas mưa/thời tiết). Người trên sân khấu: cao 0.79–0.80 chiều cao sân khấu (KIT_FIG h .79, nam ×1.07 ≈ .85), **2 người trọn** ở 1180 và 1366 (không cắt mép, tên đủ). Fold: phòng toàn màn + "‹ Phòng".
- Lật trang: khi đổi tab có .kcl (trang cong) giữa chừng, xong thì gỡ (0 còn sót).
- Dư đồ: khung da (leather), điện khóa có ổ khóa trên nhãn (Đức Thọ cung, Càn Ninh cung, Dưỡng Hòa điện, Cần Chính điện).

## Không chặn (ghi nhận)
- Đã biết, để bản sau: iPad 3–4 người, hộp thoại cuộn cố định đầu, flap toàn trang, nhãn Dư đồ chồng góc phải trên Fold.
- Fold 686: dòng ngày "Tháng ba · thượng tuần · năm thứ / nhất" xuống 2 dòng vì nút "‹ Phòng" (không cắt chữ); "Đợi bạn xong buổi" 3 dòng trong nút Qua buổi — đọc được.
- Khách vào phòng khi chủ còn chọn thân phận: sau thẻ "Đợi bạn" là khung game trống (tên "—", ô số rỗng) — nên phủ nền tựa đề.
- .github/workflows/coop-worker.yml chạy khi main đổi coop/worker/** — cần secret Cloudflare trên repo, nếu thiếu action báo đỏ (không ảnh hưởng trang).

Ảnh: dev/shots/review/coop-release/ (sảnh, đợi bạn, phòng Fold/iPad 1180/1366, Dư đồ).

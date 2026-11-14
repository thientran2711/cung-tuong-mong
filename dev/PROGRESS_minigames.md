# PROGRESS: trò chơi nhỏ, mỗi môn một trò (review/minigames, j82 + j91)

## 11/14 — bỏ trắc nghiệm, 15 môn 15 cơ chế
- Sếp chê các cuộc thi Thơ, Câu đối, Đố đèn, Nấu ăn, Điều hương là "5 câu hỏi chọn đáp án". Đã thay hết: bảng môn → cơ chế → cách chấm → độ khó ở `dev/MINIGAMES.md`.
- `dev/build/j91.js` (mới, sau j82 trong assemble.py): 10 trò mới — Hát (giữ/buông theo giai điệu), Đầu hồ (kéo-thả ném, gió), Thơ (kéo chữ điền câu bát lục bát, chữ 6 hiệp vần),
  Câu đối (nối chữ đối bằng sợi chỉ), Đố đèn (xoay 9 mảnh đèn, rồi chạm đèn lời giải), Vẽ (đồ nét bằng ngón tay), Cắm hoa (kéo cành theo thế Thiên–Nhân–Địa, cân thế),
  Khéo tay (gỡ rối chỉ: kéo nút cho hết chỗ chéo), Nấu ăn (giữ Quạt lửa trong vùng + bỏ nguyên liệu đúng thứ tự), Điều hương (3 thanh trượt pha màu khói khớp mẫu).
  Giữ 5 trò cũ của j82 cho Đàn (nhịp rơi), Cờ (ăn quân), Bắn cung (canh ngắm), Thêu (nhớ mẫu), Múa (nhớ chuỗi bước). Trò trắc nghiệm `quiz` không còn môn nào dùng.
- Học trong tab Tài nghệ (`openMG`): mỗi tài nghệ chơi đúng trò môn mình (Cầm→Đàn, Kỳ→Cờ, Thi→Thơ, Họa→Vẽ, Vũ→Múa, Y thuật & điều hương→Điều hương, Thêu→Thêu, Nấu nướng→Nấu ăn).
  `playArt` (tác phẩm j83, tự luyện) và Tranh ghế (j34 vòng Tài nghệ) đi qua cùng các trò này.
- j82: độ khó theo bậc tài nghệ của chính người chơi (`kg82LvFor`), hiện hàng "Độ khó" ở màn mở đầu; 5 trò cũ cũng nới theo bậc (cửa trúng, thời gian nhìn mẫu…).
  Đối thủ là phi tần (khi j82 tự chấm) thi màn thi theo CÙNG bậc tài nghệ (`kg82NpcRaw`: ≈ 4 + 0,4·bậc ± 4 trên 10) — luật hai chiều; "Để tài nghệ quyết định" = mức người cùng bậc.
  Rows j71 đưa sẵn (may rủi 0–30) giữ nguyên để bảng thi j71/j82 khớp nhau. Kết quả trả về y như cũ (`standings` cho bục vinh danh review/kit-podium).
- Kiểm thử: `dev/test/minigames91.js` (mỗi môn: một thao tác CHẠM/KÉO/GIỮ thật qua CDP touch phải tới trò như sự kiện touch tin cậy, rồi tự chơi hết bằng oracle `KG82.peek`),
  `dev/test/lessons91.js` (8 bài học). Ảnh từng tấm: `dev/shots/minigames/` (<môn>-<cỡ>-1intro / 2play / 3result; cỡ phụ chỉ 2play; lesson-<tài nghệ>-755x1000@2).

## Nhu cầu bộ kit (ghi cho kit owner — chưa tự tạo kiểu)
1. **Mặt bàn trò chơi** (game board surface): j82/j91 đang vẽ nền lụa/giấy, ô chữ (tile), vòng đích, dải giai điệu… ngay trong canvas của `.kgbox`, dùng biến màu kit
   (`--gold`, `--red`, `--good`, `--peony`, `--display`, `--body`). Đề nghị kit có bộ hàm canvas chung: `kitBoard(g,W,H,kind)` (lụa/giấy), `kitTile(g,…,state)` (thường/chọn/đúng/sai/ô trống),
   `kitTarget(g,…)` (vòng đích có nhãn), để mọi trò vẽ cùng một kiểu. j91 đã gom về `k91Tile` / `k91RR` để thay một chỗ khi kit có.
2. **Nút giữ** (hold button: "Quạt lửa"): đang dùng `.kgbtn` + `.on` khi đang giữ; kit có thể thêm trạng thái "đang giữ" riêng.
3. **Thanh trượt dọc** (Điều hương): đang vẽ trong canvas; nếu kit muốn một thanh trượt chung thì thay.
Không có CSS mới ở j91; nút ở hàng `.kg82act` sẵn có của j82.

## Còn lại / gợi ý
- j71 (review/merit) có thể gọi `window.kg82NpcRaw(p, kind)` thay may rủi đều 0–30 để đối thủ thi theo bậc tài nghệ như j82.

## 11/14 — sửa theo kiểm duyệt (FAIL: đồ vật vẽ bằng canvas)
- Vẽ 11 lượt gpt-2-6 (1 ref phong cách: cảnh ngu-hoa-vien cho nền, item-dan-co cho mảnh rời; thư mục Magnific ba4aecfe-…), mỗi lượt một lưới; 5 lưới mảnh rời được tách nền (Magnific, cả tờ) rồi cắt từng mảnh.
  Kết quả: 24 nền (15 nền thi `mg-<k>-bg`, 8 nền học `mg-<k>-bg-hoc`, 1 nền Chải chuốt `mg-chai-bg`) + 73 mảnh rời trong `img/kit/`. Bảng ở KIT.md 13.1.
- j82: `kg82Bg` / `kg82Spr` / `kg82Lbl` / `kg82Preload`; `KG82.ctx` thi/học; 5 trò j82 (đàn, cờ, bắn cung, thêu, múa) và 10 trò j91 đặt tranh; canvas chỉ còn nét động nhỏ.
  Nền được thu nhỏ một lần vào canvas phụ, bỏ bóng đổ thường trực (máy yếu vẫn mượt; bộ thử tự chơi nhanh như cũ). Cơ chế, cách chấm, oracle `KG82.peek` giữ nguyên
  (riêng Đầu hồ: vùng "tai bình" theo đúng tai trong tranh, ±1,6 miệng bình thay vì ±2,2).
- Chữ: HUD mọi trò "Hồi x/y" (bỏ Lần/Bình/Bước/Đèn/Nốt/Câu/Phát/Mối/Lư/Bức); bảng xếp hạng "Bảng định thứ"; j34 Tranh ghế bỏ "điểm" → "phần".
- Bộ thử: `minigames91.js` thêm bước qua bục vinh danh j90; `dev/test/mgshots91.js` chụp mỗi môn lúc đang chơi (đồng hồ trang dừng để ảnh đúng một khung), cả nền học (`hoc`).
- Thử (bản cuối): minigames91 755x1000@2 15/15, 1180x820@2 15/15, 390x844@3 15/15 (Nấu ăn: ô nguyên liệu nay luôn nằm trong bàn ở máy hẹp); lessons91 8/8 ở 755 và 1180;
  không lỗi trang, không tràn ngang, không chữ cắt. Ảnh: `dev/shots/minigames/<môn>-<cỡ>-play.jpg` (755, 1180, 390), `hoc-<môn>-755x1000@2-play.jpg` (nền học), `lesson-<tài nghệ>-<cỡ>.jpg`.

KIT READY: minigame art


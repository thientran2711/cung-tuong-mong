# Kiểm duyệt: review/balance-unified @ 9a2ba35b (4 buổi, đồ tự làm j83, đồ mặc vào Tư trang, cân bằng, cảm xúc) — PASS sau sửa

Ngày 2026-11-15. Gộp lên main-next 1c7a3fcb (main df3094e7 + dialog-person). Xung đột chỉ index.html/sw.js (dựng lại).

## Lỗi người kiểm tìm ra và đã sửa (cùng commit gộp)
1. **Mất nút "Giao tình" ở hàng tab dưới** (mọi khổ): j79 kgBar không gỡ `kghide` khỏi nút đầu nhóm; `rel` từng là thành viên nhóm Hậu cung
   cũ (jbal2 gọi kgBar trước khi jhc đổi KG) nên còn ẩn. Sửa j79: nút đầu nhóm luôn gỡ kghide.
2. **"Việc nhờ" (q72) mất khỏi Mệnh truyện**: jhc đặt lại KG.mt, bỏ q72 jbal2 thêm. Sửa jhc: giữ thành viên mt do module khác thêm.
3. **54 tranh chưa vào git** (img/wd-*.webp đồ mặc, img/kit/emo-*.webp dấu tâm trạng, img/veil.png): nhánh ghi "chờ CDN" nhưng main vẫn phục vụ
   img/ từ git → sẽ 404 trên live. Người kiểm kéo từ CDN ctm-img (đối chiếu md5 mục lục, 54/54 khớp, ~1 MB), xem tờ ghép, đưa vào img/.
4. **Chơi hai người kẹt ở buổi chiều** (4 buổi): Worker co-op chặn `bend` từ buổi 2 ("buổi tối kết thúc bằng end"), client jcoopworld coi
   buổi 2 là tối. Sửa: client gửi `nb` (B4N=4) lúc init phòng; Worker giữ `m.nb` (mặc định 3 cho client cũ) và chặn từ `nb-1`; jcoopworld
   "Qua đêm"/kết buổi dùng B4L; j41/j77 "ở lại nơi đó" dùng B4L. coop-e2e dùng B4N buổi mỗi tuần.
   Worker sửa ở coop/worker/src/index.js — **GitHub Action coop-worker.yml tự triển khai khi main có thay đổi coop/worker/** (tương thích ngược:
   phòng của client 3 buổi vẫn như cũ).

## Kiểm
- Sổ cũ 3 buổi → 4 buổi (lưu bằng main, buổi sáng / chiều / tối): nạp thành sáng / chiều / tối, qua buổi sáng → trưa → chiều → tối → sáng tuần kế, 0 lỗi.
- Kit 13 tab: 755x1000@2, 1180x820@2, 412x1058@2, 1000x755@2, 844x390@3 (8 tab) — 0 lỗi, 0 tràn, 0 cắt chữ, 1 #panel, 0 ảnh vỡ. Sổ cũ nạp (3 khổ).
- coop-e2e: trên Worker sống (chưa sửa) 52/73 — kẹt buổi chiều (lỗi 4); trên Worker đã sửa chạy cục bộ (wrangler dev) 59/59; merge.test ok.
## Đáng lo
- Lúc lên main: trang Pages và Worker triển khai lệch nhau vài phút — trong lúc đó phòng chơi hai người mới có thể kẹt buổi chiều.
- 844x390: cột chip triều bên phải sân khấu che đầu/tên người bên phải (đã biết, thợ stage-slots đang sửa).
Ảnh: dev/shots/review/balance-unified/.

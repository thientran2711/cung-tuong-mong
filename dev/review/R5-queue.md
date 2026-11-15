# Hàng duyệt R5 (người duyệt kit, phiên agent-a058) — 2026-11-15

| Nhánh | Trạng thái |
|---|---|
| review/shop-fix @ 144f28bc4 (+ act-pics b2d2deae4) | **PASS** → review/shop-fix-merged **70c792d41**, ĐÃ lên main (70c792d41). Chi tiết dev/review/shop-fix.md |
| review/kit-close @ 1bd240a54 (vòng 2) | **CHƯA KẾT LUẬN** (dừng theo lệnh). Đã gộp lên 70c792d41 → `review/kit-close-merged-wip` **9e3ab039a** (KHÔNG phải ref PASS). Chưa chạy kit-close.js / kit-close2.js / shop-fix / sổ cũ / coop trên bản gộp |
| review/brand @ bc1c7f324 | **CHƯA BẮT ĐẦU** |

## Ghi chú cho người duyệt kit-close tiếp
- Gộp kit-close lên main mới xung đột jinv.js / jk2b.js / jk4.js (cả hai nhánh đều làm kit-x KIT 32.10). Cách gộp trong 9e3ab039a:
  - jk4: lấy kitXHTML/kitXAdd(dlg, close) + kitCloseSync/kitCloseLayer/#kxcatch của kit-close; nhãn ✕ "Lui" (VANPHONG) thay "Đóng";
    giữ sửa kitDpFit của shop-fix (gỡ position/max-width do kitEsFit để lại trên chip tên).
  - jinv: return mới của kit-close (kinvSubHTML: Túi đồ / Việc) + toàn bộ kitShop của shop-fix sau đó.
  - jk2b kitEvArt: id tin = kitNewsArtId(m) (kit-close) + chặn id không có hạng mục → tranh phòng (j17 evArt) thay tranh mặc định Triều chính (act-pics).
  - KIT.md: bỏ mục 32.10 trùng của shop-fix (mục 32.10 của kit-close bao trùm), nhãn "Lui".
- review/act-audit đã ở main (6e6c2ae6d) trước khi gộp → kit-close gộp lên main hiện tại đã gồm act-audit; merge-tree kit-close × act-audit: không xung đột.
- Cần kiểm trên bản gộp: kit-close2.js 4 khổ (chạm không lọt #kxcatch, Tư trang Túi đồ/Việc, tin buổi không Triều chính), kit-close.js,
  shop-fix.js (cửa hàng với kitCloseSync: ✕ phải đóng qua nút "Lui" ẩn trong #mr), sổ cũ, coop-e2e.
- Máy rất tải (load 50–60): chặn tải nền `ctmload=1` khi đo (ctx.route abort), nếu không tranh người chờ >12 s; coop-e2e cần
  setDefaultNavigationTimeout(180000). Thư mục scratchpad dùng chung có thể bị người khác xóa: để tệp thử trong worktree (.rvtmp, không commit).

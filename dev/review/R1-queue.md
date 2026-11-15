# Hàng đợi của người duyệt kit số 2 — bàn giao 2026-11-15

main lúc bàn giao: **6e6c2ae6d** (act-audit đã lên main).

| Nhánh | Trạng thái |
|---|---|
| review/act-audit (c7faad1de) | **PASS**, đã lên main = 6e6c2ae6d (review/main-next). Sửa: jaudit giữ resultShow khi mở trò chơi (kết mạng bằng tay). dev/review/act-audit.md |
| review/fix-float (af7c388cb) | **Chưa có kết luận.** Gộp lên 6e6c2ae6d chỉ xung đột ở assemble.py: thứ tự `… jplace, jwhy, jaudit, jint, jnight, j84`. Bản gộp ở nhánh `review/fix-float-kiem2-wip` (site chưa dựng trong commit, chạy build_site.sh). **Đạt:** int-stats ở 4 khổ, night-day, rules-one-source 755, minigame-tap và veil (act-audit vẫn đúng), kit 8 tab × 4 khổ (0 lỗi, 0 tràn, 0 cắt chữ, 0 ngươi), sổ cũ ở 4 khổ. **coop-e2e chập chờn:** lần 1 57/59 (B không thấy A lúc bắt đầu), lần 2 59/61 (buổi 3:2 kẹt "Đợi hảo hữu" sau khi đầu thai), mỗi lần lỗi một chỗ khác. Lần 3 bị dừng vì bàn giao. Cần chạy lại coop. Khi chạy bằng .rv/coopfast.js, ảnh CDN được thay bằng ảnh rỗng (CDN qua proxy mất khoảng 18 s mỗi ảnh). Nghi vấn còn mở: jnight gọi `used=4;nextBuoi()` lặp lại trong co-op; logChoice gộp dòng nhật ký thành "…→…", nên kaSentence (j63, bỏ các dòng có "→") làm mất câu tóm tắt trên thẻ kết quả của lựa chọn trong hộp thoại/đêm. Nghi vấn này chưa xác nhận. |
| review/opt-render | **Chưa duyệt.** Bản 16e92125d đã bỏ, vì chủ game đổi ý. Bản mới là a8ec98511 (§28.6 bật lại, có gợi ý bằng chữ và nhãn rủi ro). Gộp bản cũ lên main không xung đột, nhưng bản mới chưa gộp. |
| review/rest-balance (0f4670e90) | **Chưa có kết luận, gần xong.** Gộp lên main-next: xung đột assemble.py, đặt jrest sau jplace. Bản gộp ở nhánh `review/rest-balance-kiem2-wip`, đi kèm 2 sửa. (1) j79:674: thẻ hành động có tranh ở 844x390 rộng 440px, tràn khung 57px và cắt chữ. Lỗi này có sẵn trên main. Sửa thành `minmax(min(100%,max(440px,31%)),1fr)`. (2) jrest: bỏ đoạn "(thang thuốc bổ rẻ nhất; không mất bạc)" khỏi dòng Tốn. rest-cards.js PASS. Kiểm tra ở 4 khổ: 0 cắt chữ, 0 ngươi, nhật ký ghi "Ta sắc A giao…". Còn thiếu: chạy lại rest-cards sau 2 sửa, sổ cũ, coop. Sau đó gộp lại lên main mới. |
| review/scheme-games | Chưa xong. Bản gộp WIP cũ ở nhánh cục bộ `sgwip`. Cần gộp lại trên main mới. |
| econ, rank-ui | Chưa bắt đầu. |

Không có ref fast-forward nào sẵn sàng ngoài act-audit, mà act-audit đã lên main.

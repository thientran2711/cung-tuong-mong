# So sánh 1kiep.com với Cung Tường Mộng — KHÔNG LÀM ĐƯỢC PHẦN 1KIEP (bị trang chặn)

Ngày 14/11/2026. Bot mức DỄ (bot so sánh chính).

## 0. Vì sao chưa có phần 1kiep
- Playwright (chromium, 755x1000 @2) mở `http://1kiep.com/` → trang trả về nguyên văn:
  `Forbidden: automated access is not allowed on this site. See /robots.txt`
  (1180x820 cũng y vậy). Không phải proxy mạng chặn: chính trang chặn trình duyệt tự động (curl tới https trả 200, http trả 301 → https).
- `robots.txt` của họ ghi rõ: cấm các bot AI, kể cả **agent làm theo yêu cầu người dùng** (`Claude-User`, `ChatGPT-User`…: `Disallow: /`), và ghi "nội dung game không được dùng để huấn luyện, làm dữ liệu hay trả lời cho hệ thống AI". Thẻ meta cũng có `noai, noimageai`.
- Vì vậy em **dừng ngay**, không thử https, không đổi user-agent, không lách. Không chơi, không chụp ảnh, không ghi lại nội dung game của họ. Thư mục ảnh `scratchpad/kiep/` chỉ có 2 ảnh trang "Forbidden".
- Hệ quả: mục (a), (b), (c), (e) và **"So sánh 3 mức khó" không thể làm bằng bot**. Hai bot VỪA / KHÓ chắc chắn gặp cùng chặn này (cùng trình duyệt tự động) — nên dừng chúng.
- Cách làm được mà vẫn tôn trọng họ: **sếp tự chơi tay** (trên Fold/iPad), rồi điền bảng kiểm ở mục 3. Em/thợ chỉ so sánh dựa trên ghi chú của sếp, không lấy chữ, tên, hình của họ.

## 1. Tính năng của mình (đã có — để đối chiếu khi sếp chơi họ)
| Nhóm | Mình có | Mô-đun |
|---|---|---|
| Khởi đầu | Quay vòng thân phận (9 xuất thân, tỉ lệ đã duyệt), thẻ thân phận, tự chọn mặt, màn tiêu đề key art | j52, j66, j86, j74, kitRoulette |
| Vòng chơi | Tuần = 4 buổi × 4 khắc, Sức là giới hạn chính; thẻ hành động có giá / được / mất / thang khả năng (Liều…Nắm chắc) | j8, j19, j63, j80 |
| Sự kiện | Sự kiện cung đấu, sự kiện tuần, Mệnh truyện (chương truyện) có kết cục hiếm "Cơ duyên hiếm"; lựa chọn sự kiện chỉ hiện chi phí | j7, j67/j68, j89, j96/j97 |
| Thăng tiến | 8 phẩm phi tần, ghế giới hạn, Tranh ghế, đẩy người xuống, xét giáng, lãnh cung, tuyển tú 3 năm | j1, j27, j30, j34, j14 |
| Con cái | Mang thai/sinh (rủi ro), hoàng tử học Văn·Võ·Đức, lập Thái tử, công chúa, hòa thân | j51, j53, j54, j73 |
| Quan hệ | Lưới quan hệ hai chiều, Ghen/Oán/Sủng, người lạ dần quen, NPC có tính cách, tự đến thăm/tặng/triệu | j9, j21, j40, j43, j61 |
| Tình báo | Tai mắt, chứng cứ, bắt gặp hẹn hò bí mật, sổ vị trí mọi người mỗi khắc | j78, j95 |
| Người hầu | Cung nữ/thái giám, tính ẩn có lợi-hại, Chủ tin/Lòng, lương; xuất thân cung nữ (cnv) chơi được | j10, j29, jtin, j42 |
| Tình riêng | Nam nhân trong cung, tình cấm (fade-to-black), Thanh mai trúc mã | j22, j24, j96 |
| Triều đình | 5 nhà quyền thần, quốc sự ảnh hưởng tâm trạng vua | j55 |
| Bản đồ | Bản đồ cung theo mùa/buổi/lễ, quyền ra vào, "Lẻn vào", chạm là có việc | j26, j38, j41, j77 |
| Minigame | 15 môn hội thi tài nghệ thật (không trắc nghiệm), bục vinh danh | j5, j82, j90 |
| Đồ vật | Tủ đồ 2 ô (Trâm/Y phục), 5 phẩm đồ, ân thưởng, rương thưởng, bộ sưu tập | j20, j98, kitItem |
| Thế giới | Thời tiết, bệnh tật, tuổi 4 bậc, lễ hội, nền theo mùa × buổi | j12, j13, j17, j31, j94 |
| Chết/luân hồi | Chết là hết, Sổ luân hồi, Phúc duyên, chống "chết để quay lại" (kiếp dở dang) | j32, j52 |
| Lưu | Nhiều ô lưu (localStorage), xuất/nhập mã lưu dạng chữ | j6, j16 |
| Cài đặt/cảm giác | Âm thanh, giọng nói cảm xúc, thanh trượt/công tắc kit, chuyển động (lật thẻ, ấn Thành/Bại, sổ báo tuần) | j11, j36, jkitctl, j87, j93 |
| Độ khó | **Chưa có** — cân bằng cho một mức (chết sớm ~40–45 %, HH ~32 %) | jbal |
| Hướng dẫn | Chưa thấy màn hướng dẫn lần đầu riêng (chỉ bảng chú giải, ⓘ trên thẻ) | j79 §12 |

## 2. Điều mình chắc chắn hơn (không cần chơi họ cũng biết là mạnh của mình)
- Một luật cho mọi người (NPC làm được gì với nàng thì nàng làm được với họ), NPC có động cơ thật, sổ vị trí nhất quán.
- Minigame thật cho từng môn, tranh vẽ riêng cho từng người/phẩm/tuổi, khung chân dung theo phẩm.
- Thể hiện rủi ro minh bạch (giá/được/mất/thang khả năng), sự kiện giấu kết quả nhưng thẻ kết quả ghi số thật.

## 3. Bảng kiểm để sếp chơi tay 1kiep (điền "có/không/ghi chú")
Mỗi mức Dễ / Vừa / Khó, sếp ghi nhanh:
1. Màn chọn độ khó: có giải thích khác nhau gì không? Đổi giữa chừng được không?
2. Dễ vs Khó khác ở: chỉ số đầu, tỉ lệ thành công, số sự kiện xấu, tỉ lệ chết sớm, nhịp (mấy lượt/năm), có hồi sinh/tải lại không?
3. Vòng chơi chính: một lượt là gì (ngày/tháng/năm?), mỗi lượt chọn mấy việc?
4. Lựa chọn có hiện chi phí / tỉ lệ không? Hiện bằng % hay bằng chữ?
5. Màn kết quả, màn kết thúc đời, có "kiếp sau" mang theo gì không?
6. Có hướng dẫn lần đầu, thành tựu, chia sẻ kết quả (ảnh/link), bảng xếp hạng?
7. Bố cục điện thoại dọc vs iPad ngang: thanh trên, tab dưới, chữ to hay nhỏ?
8. Điều gì làm sếp muốn chơi tiếp thêm một kiếp?

## 4. Khuyến nghị về độ khó cho mình (không cần dữ liệu của họ)
- **Nên có, nhưng nhẹ: 3 mức chọn khi bắt đầu kiếp** (khóa trong kiếp đó; ghi mức vào Sổ luân hồi). Mức "Vừa" = cân bằng hiện tại (mục tiêu đã đo giữ nguyên).
- Chỉ chỉnh bằng núm có sẵn trong `jbal` (BAL.hz — độ hung của đối thủ, rủi ro sinh nở, hồi Sức/tuần, độ lệch thang khả năng ±1 nấc), **không** đổi luật hai chiều, không làm NPC "gian lận".
- Dễ: hz thấp hơn, cảnh báo sớm hơn trước nguy hiểm, chết sớm mục tiêu ~25 %; Khó: chết sớm ~55–60 %, ít thông tin miễn phí hơn. Phúc duyên nhân hệ số theo mức (Khó nhiều hơn) để không ai bị thiệt khi chọn Khó.
- Đo lại bằng bot cân bằng (inpage6) cho từng mức trước khi phát hành; kiểm theo luật "kiếp dở dang" để Dễ không thành đường cày Phúc duyên.

## 5. Ảnh
Không có ảnh game của họ (bị chặn, và họ không cho AI dùng nội dung). Ảnh duy nhất: trang chặn
`/tmp/claude-0/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/scratchpad/kiep/00_p_landing.png`, `.../kiep/00_l_landing.png`.

## 6. Ghi chú gộp 3 bản
Lúc viết, `dev/research/kiep-vua.md` và `kiep-kho.md` **chưa có**. Nhiều khả năng hai bot kia cũng bị chặn y hệt; mục "So sánh 3 mức khó" để trống chờ ghi chú chơi tay của sếp (mục 3).

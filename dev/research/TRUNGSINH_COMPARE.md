# So sánh "Phượng Hoàng Trùng Sinh" (trungsinhgame.com) với Cung Tường Mộng

Ngày 14/11/2026 (giờ VN đã sang 15/11). Bot Playwright, 755x1000 @2 (chính) + liếc 1180x820 @2.

## 0. Kiểm tra quyền truy cập (làm trước khi chơi)
- `https://trungsinhgame.com/robots.txt` → 404 (không có luật robots nào). Trang có `meta robots noindex` (chỉ nói chuyện chỉ mục tìm kiếm). Không có câu nào cấm truy cập tự động, không có thẻ `noai`. Chơi được ngay ở chế độ khách: không đăng nhập, không trả tiền, không nhập dữ liệu cá nhân. Không đổi user-agent, không lách gì.
- Không chép chữ, tên nhân vật, tên đồ, hình của họ vào repo. File này chỉ mô tả cơ chế bằng lời của mình. Ảnh chụp chỉ nằm ở scratchpad. Ảnh màn quyên góp (có thông tin cá nhân của tác giả) đã xoá.
- Đã chơi: kiếp 1 (con nhà quan, qua tuyển tú) 23 tháng, chết vì án xử tử. Kiếp 2 (cung nữ, con nhà thường dân) khoảng 25 tháng, qua khảo hạch và được thăng cấp. Tổng khoảng **48 lượt tháng** cùng khoảng 40 sự kiện, 2 minigame vẽ, 1 minigame lật thẻ 3 vòng, 1 lễ hội thời trang, 1 tiệc đầu năm, 1 buổi hẹn, mở lồng thú, mua bán ở tiệm.

## (a) Tóm tắt game của họ
- **Thể loại:** game mô phỏng đời người kiểu "life-sim" (giống BitLife), bối cảnh cung đấu. Có thêm thời trang/sưu tầm và luân hồi. Chạy web/PWA, giao diện chỉ có một cột dọc kiểu điện thoại. Phiên bản 1.59, cập nhật gần như mỗi ngày.
- **Vòng chơi:** **1 lượt = 1 tháng.** Mỗi tháng có 5 lượt "việc" chọn từ 8 ô (lễ nghi, đọc sách, tài nghệ, đối đáp, y quan, nhận việc, lập danh, dâng công). Mỗi việc cộng 1 chỉ số và **ngẫu nhiên cộng/trừ một chỉ số phụ** (vd đọc sách: trí +, dung mạo −). Có thêm 5 điểm "thể lực" riêng để đi bản đồ, làm quen hay tặng quà. Bấm nút lớn "+1 tháng" ở giữa thanh tab dưới để qua tháng; khi đó có 1–3 biến cố.
- **Chỉ số:** dung mạo, trí, tài nghệ, hoạt ngôn, sức khỏe, công trạng, uy danh, ân điển, thiện, ác, may mắn, cùng thanh **Đố kỵ** (người khác ghen với mình, càng cao càng bị hại nhiều). Lương bạc theo tháng. Phẩm vị chặn mức tối đa của chỉ số, game ghi "(giới hạn)".
- **Thăng tiến:** 10 bậc từ thải nữ lên hoàng hậu. Hai năm một kỳ "đại khảo", đồng hồ đếm ngược luôn hiện trên màn chính. Mỗi xuất thân có lối vào riêng: con nhà quan dự tuyển tú, con thường dân làm cung nữ với kỳ khảo hạch riêng.
- **Luân hồi:** chết hoặc cưỡng ép luân hồi thì sang kiếp mới. Mang theo thành tựu, kết cục đã mở và điểm luân hồi; đồ đạc, bạc, thú cưng đều mất. Điểm luân hồi dùng để roll lại thân phận hoặc mua mặt VIP.

## (b) Bảng tính năng
| Nhóm | Họ có | Mình có | Ghi chú |
|---|---|---|---|
| Tạo nhân vật | Thẻ "một đời mới": xuất thân, cha mẹ, 7 chỉ số; roll lại tốn 1 điểm; tự chọn mặt (32 mặt có sẵn trang điểm, chi tiết mắt/mũi/môi/hoa điền/tóc), mặt VIP 5 điểm | Quay vòng 9 xuất thân, thẻ thân phận, tự chọn mặt, lật bài úp (đã duyệt) | Ngang nhau. Họ có ô gia đình (cha + chức, mẹ + vị thế) hiện ngay trên thẻ |
| Nhịp thời gian | Tháng; 5 việc + 5 thể lực mỗi tháng | Tuần = 4 buổi × 4 khắc, Sức | Mình chi tiết hơn nhiều; họ nhanh hơn (1 tháng chừng 10 giây) |
| Việc thường ngày | 8 ô việc có hình chibi; kết quả hiện ngay ở toast và nhật ký; phần thưởng phụ ngẫu nhiên, có lúc âm | Thẻ hành động có giá/được/mất/thang khả năng | Mình minh bạch hơn; họ không cho biết trước kết quả phụ |
| Biến cố/lựa chọn | 3 lựa chọn, mỗi lựa chọn ghi **chỉ số chi phối + "Thuận lợi N%"** (+ giá bạc nếu có); thẻ kết quả liệt kê số cộng/trừ | Sự kiện chỉ hiện chi phí (luật của sếp); thẻ hành động dùng thang chữ, không dùng % | Họ dùng %, mình cố ý dùng chữ. Câu "cùng lựa chọn có thể ra kết quả khác nhau, chỉ số tốt thì dễ thuận lợi hơn" dạy người chơi rất gọn |
| Biến cố lặp | Nhiều biến cố lặp lại trong 2 năm (bị hắt nước, vu oan trộm, thư nhà…) | Sự kiện tuần + Mệnh truyện | Họ lặp nhiều nên chán; mình có sổ vị trí và động cơ thật nên đỡ lặp |
| Quan hệ | Danh sách người đã gặp, xếp theo chức; thiện cảm số; lọc Nam/Nữ/Con cái; thiện cảm 50 thì mở sự kiện; tặng quà mỗi người mỗi tháng tối đa 1 lần | Lưới quan hệ hai chiều Ghen/Oán/Sủng, NPC tự tìm đến | Mình sâu hơn hẳn. Họ dễ hiểu: chỉ 1 con số |
| Đố kỵ | Một thanh chung (ghen của cả cung), hiện ngay dưới nhân vật; quà bánh mua ở tiệm giảm được Đố kỵ | Ghen theo từng người | Thanh "mức nguy hiểm" chung dễ đọc; mình có thể tổng hợp lại từ dữ liệu sẵn có |
| Tâm trạng/cảm xúc | Không thấy | Đã quyết làm (biểu cảm mặt người trên khung) | Mình hơn khi xong |
| Hủy dung | Bị thú cào, dung mạo về 0 và không tăng được; vết cào hiện trên mặt cả ở màn phối đồ; thuốc đổi mặt ngẫu nhiên chữa được | Đã có (vết cào 1/2/3, dị ứng, bệnh, độc, tát) | Ý giống nhau. Họ có thêm "đổi mặt" làm cách chữa |
| Bản đồ | Một tranh cung toàn cảnh, 12 điểm; điểm hiện "N bóng người"; điểm cấm ghi rõ "từ phẩm X"; dạo chơi tốn 1 thể lực thì gặp tối đa 5 NPC tại chỗ | Bản đồ theo mùa/buổi/lễ, bóng ẩn danh, Lẻn vào, xin yết kiến | Rất giống thiết kế của mình. Mình đầy đủ hơn |
| Thủ công | Thêu túi hương (tặng nam) / làm hộp trà (tặng nữ) bằng **minigame vẽ theo mẫu**; chất lượng (Tệ/Thường/Ưu tú/Tuyệt tác) quyết định lượng thiện cảm khi tặng | Đồ làm ra từ bài học, 4 bậc chất lượng | Họ nối thẳng: làm đồ → tặng → +thiện cảm, rõ nghĩa |
| Minigame | (1) **Vẽ tay theo mẫu** trên canvas, chấm độ giống hình/hoàn thiện/bố cục (tuyển tú + thủ công); (2) **lật thẻ ghép cặp** 3 vòng, giới hạn số lần sai (khảo hạch cung nữ); ngoài ra menu còn nhắc cờ caro, đàn, bắt trà, ao cá | 15 môn hội thi thật (nhịp, ngắm bắn, cờ, nhớ mẫu, đối…) | Mình nhiều môn hơn. Vẽ tay chấm điểm thật của họ là cơ chế mình chưa có |
| Thi cử thăng cấp | Kết quả minigame quyết định ngay phẩm vị khởi đầu (vd 77 điểm thì xếp bậc 2); màn kết quả có điểm, % từng tiêu chí, phần chỉ số cộng thêm | Tuyển tú 3 năm, Tranh ghế, xét giáng | Họ biến tuyển tú thành **bài thi tay**. Màn điểm chi tiết rất hay |
| Thời trang | Túi đồ: y phục, trang sức tóc, kiểu tóc (123 y phục, 111 trang sức), mỗi món có điểm **Xa xỉ** + chỉ số + **chấm màu (biến thể màu)**; lọc phẩm chất; "chỉ hiện đồ đã có" | Tủ 2 ô, 5 phẩm, tranh đồ theo phẩm | Ngang nhau; họ có điểm xa xỉ và màu dùng cho luật |
| Lễ hội thời trang | Tháng 6 mỗi năm: đề bài "có màu X" + "tổng xa xỉ trong khoảng Y"; phối 2 món; tick ✓/✕ trực tiếp; cung nữ được mượn ngẫu nhiên 5+5 món; lễ xướng danh có hoàng đế, xếp hạng (giải an ủi → á khôi → hoa khôi), phần thưởng hoa + bạc/hộp | Hội thi tài nghệ + bục vinh danh | **Ý hay nhất về thời trang.** Mình có đồ và có bục, chỉ thiếu "đề bài phối đồ" |
| Tiệc đầu năm | Chọn đồ dự tiệc, cảnh pháo hoa với cả dàn phi tần đứng toàn thân, nghe 3 lời chúc, rút thăm lộc (ra đồ) | Lễ hội, Tết (theo mùa) | Nhịp lễ nghi ngắn, đẹp, có quà. Mình có thể học |
| Hẹn hò/CG | Cảnh toàn màn hình (tranh vẽ, 2 nhân vật toàn thân, chữ trên tranh) | Thanh mai trúc mã, tình cấm (fade-to-black) | Họ: hẹn với thân vương thì **chết ngay, không báo trước** → gắt, dễ ức |
| Thú cưng | 50 con; mua lồng ở tiệm rồi mở (có thể trượt; trùng thì đổi bạc); cho đi theo | Không có | Họ là gacha nhẹ trong game, không dùng tiền thật |
| Cửa tiệm | Mua quà bánh, lồng thú, thuốc đổi mặt, thuốc an thai (giới hạn 1 viên/5 năm); bán lại đồ | Bán 40–60 %, cầm/chuộc | Họ có món "bảo hiểm" mua trước được, giới hạn thời gian |
| Ước nguyện | Mỗi năm 1 lần, tốn bạc + 1 món đồ từ phẩm Tinh xảo trở lên | Không có | Cơ chế "đổi đồ lấy may", đơn giản |
| Thành tựu | 33 thành tựu, mỗi cái +1 điểm luân hồi, vài cái thưởng mặt/đồ; cái đầu tiên nhận ngay lúc vào game | Sổ luân hồi, danh hiệu mốc sưu tập | Họ có thưởng sớm để móc câu |
| Kết cục | **Bộ sưu tập 32 kết cục**, xem trước tên + mô tả kể cả khi chưa mở | Kết cục hiếm, Sổ luân hồi ghi x/y | Họ cho thấy trước kết cục nên người chơi có mục tiêu săn |
| Màn kết thúc đời | Thẻ đỏ "kiếp thứ N đã khép": tuổi, phẩm, người liên quan, lý do, tên kết cục, mất gì/giữ gì, nút "Đọc lại cuộc đời" (dòng thời gian ngược) | Sổ luân hồi, Phúc duyên | Ngang nhau. "Đọc lại cuộc đời" của họ chỉ là log thô |
| Nhật ký | Nhật ký tháng luôn hiện dưới màn chính, kéo lên xem lại | Sổ báo tuần | Ngang nhau |
| Lưu | Tự lưu localStorage (tải lại trang vẫn y nguyên, kể cả giữa minigame); đăng nhập để lưu online | Nhiều ô lưu, mã lưu | Họ có lưu đám mây (tài khoản) |
| Bảng xếp hạng | Online: Top địa vị (ai đạt phẩm cao khi trẻ nhất), Top sưu tầm, Top hoa khôi; reset 21h mỗi ngày | Không có | Có cả khách vô danh. Tạo cạnh tranh nhẹ |
| Cưỡng ép luân hồi | Có (không nhận điểm) | "Kiếp dở dang" (phạt) | Cùng ý chống cày |
| Độ khó | Không có lựa chọn | Đã quyết làm Dễ/Vừa/Khó | Mình hơn khi xong |
| Hướng dẫn | Một trang "Cách chơi" 7 dòng ngắn trong menu | Chưa có màn hướng dẫn riêng | Họ ngắn và đủ |
| Kiếm tiền | Chỉ có quyên góp tự nguyện (QR ngân hàng). Không quảng cáo, không nạp; nút "Skip 50 bạc" là bạc trong game | — | Cả hai không có pay-to-win |
| Điện thoại dọc | Thanh trên (ảnh tròn, tên, phẩm, tuổi, bạc, điểm luân hồi); cảnh lớn với nhân vật toàn thân đứng giữa, chỉ số chia 2 cột hai bên **nằm đè trên cảnh**; dải việc; nhật ký; 5 tab dưới với nút "+1 tháng" tròn to ở giữa | Thanh trên mảnh, cảnh phòng, tab dưới (đang làm) | Bố cục chỉ số đặt trên cảnh **trùng với hướng sếp đã chọn** (mục 51) |
| Ngang (iPad 1180x820) | Chỉ là cột điện thoại đặt giữa, hai bên để trống | Trải 2 trang sách | Mình hơn rõ |
| Âm thanh | Nhạc nền bật/tắt | Âm thanh + giọng cảm xúc | Mình hơn |

## (c) Điểm hay của họ mà mình CHƯA có (xếp theo giá trị)
1. **Lễ hội phối đồ theo đề bài.** Mỗi năm có một đề: màu bắt buộc + khoảng phẩm/giá trị đồ, phối 2 ô Trâm + Y phục, ✓/✕ hiện ngay, sau đó lên bục xếp hạng. *Áp dụng:* dùng ngay tủ 2 ô và 5 phẩm đồ sẵn có. Đề ra theo mùa/lễ ("sắc thu, không quá Trân phẩm"). Cung nữ được Thượng phục cục cho mượn đồ. Chấm điểm bằng luật + một chút Sắc/Tâm cơ. Kết quả lên bục vinh danh đã duyệt. Thắng thì Sủng/Danh, có NPC ghen. Đây là cách làm cho tủ đồ có việc dùng.
2. **Màn chấm điểm chi tiết sau thi.** Tổng điểm to, bên dưới 3 tiêu chí có %, và dòng "chỉ số giúp +x". *Áp dụng:* đưa vào kit làm khung kết quả chung cho cả 15 môn: điểm, 2–3 tiêu chí, phần do Tư chất cộng thêm. Người chơi hiểu vì sao thắng/thua mà không cần % ở lựa chọn.
3. **Minigame vẽ tay theo mẫu, chấm độ giống thật.** *Áp dụng:* làm môn mới "Tô theo nét" cho Vẽ/Thêu (mình hiện chỉ có kiểu nhớ mẫu): mẫu là tranh mực của mình, chấm theo hình dạng + bố cục, Tài nghệ cộng tối đa ~15 %. Dùng cả khi làm đồ tặng, đồ đẹp hơn thì quà có giá hơn.
4. **Sổ kết cục cho xem trước** (tên + một câu mô tả, kể cả khi chưa mở) + thành tựu thưởng ngay từ phút đầu. *Áp dụng:* Sổ luân hồi hiện hết kết cục thường. Kết cục hiếm thì để "???" kèm gợi ý mờ. Tặng 1–2 thành tựu dễ (vd "Bước qua cửa cung") ngay trong kiếp đầu để người chơi biết sổ này tồn tại.
5. **Thanh nguy hiểm chung ("Đố kỵ").** Một con số cho biết cả cung đang ghét mình cỡ nào, hiện ngay dưới nhân vật. *Áp dụng:* gộp từ Ghen/Oán sẵn có của mọi người thành một chip "Nhân tâm: Yên / Dị nghị / Sóng ngầm / Nguy" (theo thang chữ, không %) trên thanh trên. Chạm vào thì thấy ai đóng góp nhiều nhất. Có cách giảm (biếu bánh, lễ, nhún nhường).
6. **Nút qua lượt to ở giữa thanh tab + nhật ký tháng luôn hiện.** *Áp dụng:* nút "Qua buổi/Qua tuần" tròn to nằm giữa thanh tab dưới (một component kit), người chơi luôn biết bấm đâu để đi tiếp.
7. **Tiệc đầu năm ngắn có quà.** Chọn đồ, cả dàn phi tần đứng toàn thân trên một cảnh, 3 câu chúc từ NPC có thật trong cung, rồi rút thăm ra đồ. *Áp dụng:* nghi lễ 1 phút cho Tết/Trung thu. Lời chúc sinh theo quan hệ thật (người ghét chúc mỉa) nên vẫn giữ luật "mọi thứ có động cơ". Rút thăm lấy từ kho đồ thật.
8. **Làm đồ để tặng, có giới hạn.** Thêu túi tặng nam, hộp trà tặng nữ; mỗi người mỗi tháng nhận tối đa 1 lần; chất lượng quyết định lượng thiện cảm. *Áp dụng:* gắn đồ làm ra từ bài học vào hành động Tặng; mỗi người chỉ nhận quà 1 lần/tuần; NPC thích loại nào thì tính ẩn sẽ quyết.
9. **Món "bảo hiểm" mua trước, có hạn.** Thuốc giữ thai mua 1 lần mỗi 5 năm, thuốc đổi mặt chữa hủy dung. *Áp dụng:* thêm vài món hiếm ở Nội vụ phủ (an thai, thuốc giải độc) có giá cao và giới hạn thời gian. Tạo quyết định tiêu bạc có ý nghĩa, không phá luật "đồ không cho không".
10. **Bảng xếp hạng online nhẹ** (đạt phẩm cao khi trẻ nhất, sưu tầm, hoa khôi; reset hằng ngày; khách vô danh vẫn có mặt). *Áp dụng:* để sau, khi backend co-op Cloudflare đã chạy. Chỉ gửi số liệu ẩn danh, không bắt đăng nhập.
11. **Trang "Cách chơi" 7 dòng.** *Áp dụng:* tấm hướng dẫn kit 6–8 dòng mở ở kiếp đầu (vòng thời gian, Sức, thăng tiến, quan hệ, nguy hiểm, luân hồi), xem lại được trong menu.
12. (Nhỏ) **Thú cưng gacha nhẹ** (mua lồng bằng bạc trong game, có thể trượt, trùng thì đổi bạc). Nhiều tranh, ít giá trị lối chơi. Chỉ cân nhắc khi đã dư sức vẽ.

**Không nên học:** chết ngay vì một lựa chọn không có cảnh báo (nhận lời hẹn → xử tử). Luật mình đã cấm chết vô cớ, cần có điềm/cảnh báo. Cũng không nên học: biến cố lặp lại dày; phần thưởng phụ âm ngẫu nhiên khi làm việc thường; khung chân dung tròn (sếp cấm); bản ngang chỉ là cột điện thoại.

## (d) Điểm mình hơn
- **Chiều sâu xã hội:** quan hệ hai chiều Ghen/Oán/Sủng, NPC có động cơ thật, sổ vị trí từng khắc, tai mắt, chứng cứ, bắt gặp hẹn hò. Họ chỉ có 1 số thiện cảm và biến cố ngẫu nhiên.
- **Minh bạch rủi ro có chủ đích:** thẻ hành động có giá/được/mất/thang chữ; sự kiện ẩn kết quả nhưng thẻ kết quả ghi số thật. Họ không cho biết trước phần thưởng phụ, và cái chết lớn nhất xảy ra không cảnh báo.
- **Nhịp thời gian và thế giới:** tuần 4 buổi × 4 khắc, thời tiết, mùa × buổi trên cảnh, triều đình 5 nhà, con cái học hành, lập Thái tử, chọn kế vị (Thái hậu / Nhiếp chính / Nữ đế).
- **Minigame:** 15 môn thật với bục vinh danh (họ có khoảng 2–4 loại).
- **Nhân vật:** tranh riêng cho mỗi người × 8 phẩm × 4 tuổi, khung theo phẩm, trạng thái mặt (bệnh, độc, tát, dị ứng, sẹo). Họ dùng chung mẫu mặt và một bộ đồ cho NPC.
- **Thiết bị:** iPad trải 2 trang sách; họ để trống hai bên.
- **Đang làm mà họ không có:** độ khó Dễ/Vừa/Khó, cảm xúc mặt người, co-op 2 người, lối tiểu thư ngoài cung.

## (e) Ảnh tiêu biểu (scratchpad, không đưa vào repo)
- Màn chính dọc (chỉ số đặt trên cảnh, 8 ô việc, nút +1 tháng): `/tmp/claude-0/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/scratchpad/tsg/00_home.png`
- Biến cố 3 lựa chọn có "chỉ số · Thuận lợi N%": `/tmp/claude-0/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/scratchpad/tsg/16_month.png`
- Minigame vẽ tay theo mẫu (bài của bot): `/tmp/claude-0/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/scratchpad/tsg/09_drawn.png`
- Phối đồ dự hội theo đề (màu + tổng xa xỉ, vết cào hiện trên mặt): `/tmp/claude-0/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/scratchpad/tsg/39_festival.png`
- Lễ xướng danh hội thời trang (cả dàn toàn thân): `/tmp/claude-0/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/scratchpad/tsg/59_fest_end.png`
- Thẻ kết thúc đời: `/tmp/claude-0/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/scratchpad/tsg/49_ending.png`
- (Thêm) bản đồ cung `18_hoangcung.png`, bản ngang `54_land_main.png`, tiệc đầu năm `42_square.png`.

---

## Đào sâu (CHƯA XONG — dừng giữa chừng theo lệnh tiết kiệm credit, 15/11)

**Đã chơi thêm:** 2 bot chạy song song qua 2 phiên trình duyệt riêng, 3 kiểu chơi: "liều" (ưu tiên lựa chọn đối đầu), "an toàn" (chọn % cao, từ chối hẹn hò) và "tập trung thi". Tổng thêm khoảng 9 kiếp, 2 đường xuất thân (con nhà quan dự tuyển tú, cung nữ), khoảng 150 tháng, 196 loại màn/sự kiện được ghi lại. Có một kiếp lên tới **Quý Phi** (20 tuổi, được ban cung riêng), nhưng chết ngay tháng sau vì một lượt tung 49 %.

**Chưa thấy:** hệ thống **nô bộc** và **báo thù do người chơi chủ động** (bản 1.59 ghi "Update hệ thống nô bộc & trả thù" lúc 02:22 15/11). Khả năng cao hai hệ thống này chỉ mở khi đã có cung riêng (Tần/Phi trở lên). Bot chưa sống sót đủ lâu ở phẩm cao để mở. Danh sách người quen (Nhân duyên) và thẻ người trên bản đồ, kể cả với người "Thù địch", chỉ có 2 nút **Trò chuyện / Tặng quà**, không có nút hại hay trả thù. Muốn làm tiếp: chơi tay tới Phi có cung riêng.

Kiểm tra phía mình: đã grep `dev/build/j*.js` và docs.

### Danh mục tính năng/sự kiện đã thấy (họ) — mình có chưa — cách đưa vào game mình

**A. Bị hại (NPC → nàng), kích hoạt theo thanh Đố kỵ.** Tất cả đều là **một màn + nút Tiếp tục**, không có lựa chọn, chỉ báo số.
| Sự kiện (mô tả lại) | Kích hoạt / kết quả | Mình có? | Đề xuất |
|---|---|---|---|
| **Thả linh miêu cào mặt** | Phi tần phẩm cao hơn ghen → thú cào mặt: Dung mạo về 0 và *không tăng lại được*, thiện cảm −20 với kẻ đó; vết cào hiện trên tranh mặt; người chơi bị **đuổi khỏi tẩm điện** khi được triệu; chữa bằng thuốc đổi mặt (500 bạc) | Có hủy dung + vết cào 1/2/3; có "nhồi lông mèo" / bột ngứa; **chưa có thú tấn công** | Thêm hành động hại "Thả mèo hoang/linh miêu" vào nhóm Hại nhỏ (hai chiều, có động cơ). Hệ quả: hủy dung 1–3 vết, không dự thị tẩm/thi Sắc cho tới khi chữa (khăn che / thái y / thuốc). Dùng lại overlay vết cào đã duyệt |
| Hắt nước ngay lần đầu gặp | Lần đầu gặp người cao phẩm hơn: Sức −, Danh −, mở đầu bằng thiện cảm âm | Gần có (Dằn mặt, Khiêu khích) | Tạo "ấn tượng đầu" với người ghét mình: một câu có số, đặt ngay lúc gặp lần đầu trên bản đồ |
| Chặn đường đòi bạc | 2 nút: nhịn (mất bạc) / không giao (bị làm nhục, Đố kỵ +8, Sức −, Danh −) | Có tống tiền | Giữ đúng 2 nút đơn giản này cho NPC mạnh hơn bắt nạt; lặp lại thì mở lựa chọn tố lên trên |
| Trà bị tráo, phấn có độc, thuốc đổi màu | Mất Sức/Sắc; với thuốc lạ thì có 3 lựa chọn (giữ lại cho thái y xem / uống / khéo trả) | Có hạ độc, dị ứng, chứng cứ | Đã có, chỉ cần màn ngắn hơn |
| Vu trộm (đồ giấu trong phòng), sổ sách bị sửa, tráo quà/thư, truyền sai giờ hẹn, bóp méo lời nói, phá bài luyện | Trừ Danh/Công trạng/thiện cảm với người bị lừa | Có (cài đồ vào rương, phản gián, vu oan) | Đã có. Họ hay ở chỗ **kẻ bị lừa là NPC thật** (thân vương, tướng quân) nên thiện cảm người đó giảm |
| Hỏa hoạn | Cháy mất 1 món trong tủ, được cấp lại đồ thường | Không | Sự kiện thế giới: lửa đốt 1 món (Ngự tứ không cháy); có thể là mưu của kẻ thù |
| "Sóng ngầm" (đại thần can gián vì quá được sủng) | 2 lựa chọn khoảng 50 %, có thể **chết** | Có (triều đình 5 nhà) | Giữ, nhưng luật mình bắt buộc phải có điềm báo trước |
| Bạch nguyệt quang trở về | Người cũ của vua quay lại, chỉ 1 nút chịu chỉ → lãnh cung trọn đời | Không | Mệnh truyện theo tropes ngôn tình cung đấu; mình phải cho đường gỡ (Cơ duyên hiếm), không ép chết |

**B. Tình cảm / sủng ái**
| Sự kiện | Họ | Mình có? | Đề xuất |
|---|---|---|---|
| Lật thẻ bài thị tẩm | Nhận lời / cáo bệnh; chọn y phục thị tẩm; màn "kết quả" (hài lòng / bình thường / có thai) | Có (Kính sự phòng, lật thẻ) | Đã có |
| Vua triệu: đánh đàn (minigame nhịp 30 giây, chạm/giữ nốt, chấm sao), caro 11×11 với vua (vua tự đánh, lưu ván, xin hoà), du hồ (chọn đồ, có thể gặp thích khách) | Có | Có đàn/cờ trong hội thi; triệu kiến có | **Đáng học:** minigame dùng làm *lời mời riêng của vua* chứ không chỉ để thi. Chơi tốt thì Sủng + |
| Hẹn hò thân vương/tể tướng/thần y | Thiện cảm tới mốc → lời hẹn; phi tần nhận lời thì bị tố, có khi bị **xử tử**; cung nữ thì bị phạt bạc; cung nữ có thể được **cầu hôn → xuất cung** (kết cục) | Có tình cấm + Thanh mai trúc mã | Cùng một hành động, hậu quả theo thân phận: rất rõ và dễ nhớ |
| **Vua vô sinh → mật ước với thân vương để có con nối dõi** | Bí mật, có thai, được ghi là con vua; sinh con được thăng phẩm, có thể nhảy tới Quý Phi | Không | Mệnh truyện hiếm: lựa chọn đạo đức, rủi ro bị lộ |
| Sinh con thì thăng một bậc + tặng đồ | Có | Có sinh nở | Thêm "ân thưởng sau sinh": thăng 1 bậc + đồ ngự ban |

**C. Thăng tiến / nghi lễ**
- Tuyển tú = vẽ tay theo mẫu. **Khảo hạch cung nữ** = 3 vòng lật thẻ. **Đại khảo 2 năm/lần** = đủ 3 chỉ số ngưỡng (đổi theo kỳ) rồi mới thi vẽ, tối đa lên Tiệp dư; phẩm cao hơn cần "cơ duyên" (sinh con, sủng). → Mình có thể lấy ý **cổng ngưỡng chỉ số hiển thị rõ (x/y · Thiếu/Đủ) trước kỳ thi**.
- **Đại lễ sắc phong** (cả của người khác): chọn lễ phục, đứng hàng chúc tụng, từng người chúc một câu, mở chiếu, rồi **phát phong bao** (20 bạc/người, +thiện cảm mỗi người). Được ban cung riêng. → Mình chưa có lễ phong phẩm có khách dự. Đề xuất "Lễ tấn phong": khách là NPC thật, phát lì xì để giảm ghen.
- Tân đế đăng cơ khi vua băng hà; vua chết không người nối dõi → kết cục xuất gia. Mình có kế vị.

**D. Đời sống, kinh tế, vật phẩm**
- Biến cố đời thường có 3 lựa chọn (stat + %): thư nhà xin bạc, cứu cháy kho, ngựa hoảng, đèn rơi, bạn cùng phòng sốt, ma ma cũ ốm, nhặt trâm, nhặt ngọc ở giếng, túi bạc hối lộ, chợ đổi đồ cuối tháng (mua / mặc cả), cánh cổng hé mở (8 % trốn cung). Mình có nhiều sự kiện tuần tương tự.
- **Hồ ước nguyện** (12 tháng/lần): dâng 100 bạc + 1 món từ Tinh xảo trở lên → hồ trả 0/100/500/1.000 bạc ngẫu nhiên, món dâng mất hẳn. Mình chưa có. Đề xuất "Thả đèn cầu may" ở Phật đường: đổi đồ thừa lấy vận may.
- **Thú cưng:** lồng 100 bạc → gacha (có thể trượt, trùng thì đổi bạc); có phẩm và Xa xỉ; mỗi lúc **1 con đi cùng, cộng 1 chỉ số**; NPC nam thích mình thì tặng lồng thú; xếp hạng sưu tầm. Mình chưa có. Đề xuất: thú nuôi trong cung (mèo, chim, cá…), 1 con theo hầu +1 Tư chất nhỏ. Thú có thể bị kẻ thù hại hoặc dùng để hại (nối với mục A).
- Cửa tiệm: quà bánh (−10 Đố kỵ), thuốc đổi mặt, thuốc an thai (1 viên / 5 năm). Thu mua đồ. Mình có bán/cầm.
- Thủ công: thêu túi (tặng nam) / hộp trà (tặng nữ) bằng minigame vẽ; mỗi người nhận 1 lần/tháng. Mình có đồ làm từ bài học, chưa nối với tặng quà.

**E. Hệ thống/giao diện đơn giản đáng học**
- Mọi biến cố đều **một màn, 2–3 nút, mỗi nút một dòng "chỉ số · %"**, kết quả là thẻ "Vượt qua phép thử / Một bước chông chênh" kèm các dòng số. Rất dễ đọc. (Mình giữ luật thang chữ.)
- 5 thể lực/tháng dùng chung cho việc, dạo chơi, trò chuyện, tặng quà, thủ công → **một nguồn lực duy nhất**, dễ hiểu (giống Sức của mình).

### Top 15 nên thêm (xếp theo giá trị / độ dễ)
1. Thả thú (linh miêu/mèo) hủy dung, hai chiều, chặn thị tẩm cho tới khi chữa.
2. Lễ hội phối đồ theo đề (màu + phẩm), bục xếp hạng; cung nữ mượn đồ.
3. Minigame làm *lời triệu riêng của vua* (đàn, cờ, du hồ) → Sủng.
4. Đại lễ tấn phong có khách NPC + phát lì xì giảm ghen.
5. Cổng ngưỡng chỉ số cho kỳ xét phẩm (x/y Đủ/Thiếu) hiện trước.
6. Thanh nguy hiểm chung (tổng Ghen/Oán), cao thì các sự kiện bị hại mục A dày hơn.
7. Thú cưng: nuôi, 1 con theo hầu +1 Tư chất, có thể bị hại.
8. Ấn tượng đầu khi gặp người ghét mình (hắt nước, dằn mặt) bằng một câu có số.
9. Bắt nạt đòi bạc, 2 nút đơn giản.
10. Hậu quả hẹn hò khác nhau theo thân phận (phi tần bị tố / cung nữ bị phạt / cung nữ được cầu hôn xuất cung).
11. Mật ước sinh con khi vua vô sinh (Mệnh truyện hiếm).
12. Ân thưởng sau sinh (thăng 1 bậc + đồ ngự ban).
13. Hỏa hoạn đốt đồ trong tủ.
14. Hồ ước nguyện / thả đèn cầu may (đổi đồ lấy vận).
15. Đồ thủ công nối với tặng quà (mỗi người 1 lần/tuần, chất lượng → thiện cảm).

**Không nên học:** chết hoặc lãnh cung không báo trước, chỉ sau một lượt tung khoảng 50 % hoặc sau một màn chỉ có 1 nút. Mình luôn có điềm báo và đường gỡ.

**Việc còn dở:** tìm hệ thống nô bộc và báo thù (cần chơi tay lên Phi có cung riêng). Ảnh chụp thêm: `scratchpad/tsg/70_wish.png`, `71_wishres.png`, `75_caro.png`, `77_pettab.png`, `78_petcard.png`. Log thô của bot: `scratchpad/bot/catalog*.log`, chỉ để đọc, không đưa vào repo.

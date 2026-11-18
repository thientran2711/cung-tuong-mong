# Đề xuất đổi tên cho ra cổ trang, cổ ngữ (CHỈ ĐỀ XUẤT, chưa sửa)

Soát trên origin/main: dev/kit/VANPHONG.md, dev/OWNER_DECISIONS.md, dev/build/j*.js, dev/site/swreg.js.
Mỗi dòng: **tên hiện tại → tên đề xuất** · lý do · chỗ xuất hiện. GIỮ = đã đúng cổ ngữ, không đổi.
Nguyên tắc: Hán Việt hay chữ Việt cổ mà người xem *Chân Hoàn truyện*, *Diên Hy công lược* hiểu ngay; không chữ Hán, không viết tắt; rõ nghĩa trước, hoa mỹ sau; vừa ô 390 px.

---

## 1. Sổ tuần: chọn tên

Người xưa chia tháng làm ba **tuần** (thượng, trung, hạ tuần; mỗi tuần mười ngày), nên chữ "tuần" giữ được. Chỉ cần thay chữ "Sổ" (chữ Nôm, nghe như sổ sách thường ngày) bằng một chữ chỉ sách chép việc.

| Lựa chọn | Nghĩa | Được | Mất |
|---|---|---|---|
| **Tuần lục** | tuần (mười ngày) + lục (sách chép, như *ký lục*, *mục lục*) | ngắn, rõ là chép theo tuần, nghe cổ, hợp với nhịp thượng/trung/hạ tuần | chữ "lục" hơi trang trọng (vẫn dễ hiểu) |
| Tuần ký | tuần + ký (ghi chép, như *nhật ký*) | dễ hiểu nhất | gần "nhật ký" mà game đã bỏ vì nghe hiện đại |
| Cung sự lục | sách chép việc trong cung | đẹp, cổ | không nói rõ là theo tuần; dài |
| Tuần báo | tờ báo mỗi tuần | — | nghe như báo bây giờ; không dùng |
| Khởi cư chú | sổ chép việc hằng ngày của vua (có thật trong sử) | đúng sử | khó hiểu, lại là việc của vua chứ không phải của ngươi |

**Khuyến nghị: Tuần lục.** Kèm theo đó:

| Hiện tại | Đề xuất | Lý do | Chỗ |
|---|---|---|---|
| Sổ tuần (tiêu đề, bìa) | **Tuần lục** | như trên | j87.js `title:"Sổ tuần"` |
| Sổ tuần · Tháng tư · thượng tuần | **Tuần lục · Tháng tư · thượng tuần** | đi theo tên mới | j87.js `` `Sổ tuần · ${date}` `` |
| Bìa sổ | Bìa lục (hoặc GIỮ "Bìa sổ") | đi theo tên mới; "Bìa sổ" vẫn hiểu được | j87.js |

## 2. Các mục trong Tuần lục

| Hiện tại | Đề xuất | Lý do | Chỗ |
|---|---|---|---|
| Tổng lược | GIỮ | Hán Việt, rõ | j87.js |
| Triều đình · thiên hạ | GIỮ | đã cổ | j87.js |
| Ngươi tuần qua | **Tự thân** | "Ngươi tuần qua" đọc như câu cụt; "Tự thân" là Hán Việt quen ("tự thân vận động"), nghĩa là chính ngươi | j87.js `h:"Ngươi tuần qua"` |
| Việc của ngươi | **Hành trạng** (dự phòng: Việc đã làm) | hành trạng là bản chép việc một người đã làm; không dùng "Hành sự" để khỏi lẫn với tab | j87.js `h:"Việc của ngươi"` |
| Sổ này ghi | **Lục này chép** | đi theo Tuần lục; "chép" cổ hơn "ghi" | j87.js `h:"Sổ này ghi"` |
| Sổ ghi 12 việc, 4 người. | **Lục này chép 12 việc, 4 người.** | như trên; khỏi lẫn với tab Sổ ghi | j87.js (note) |
| Bổng lộc | GIỮ | đã duyệt | j87.js, j14/j15/j19/j20/j79 |
| Đã lĩnh | GIỮ | đúng cổ ngữ | j87.js |
| Kỳ tới · còn N tuần | GIỮ | rõ, không mang chữ hiện đại | j87.js |
| Quẻ tuần / Lời quẻ / Thượng · Cát | GIỮ | đã cổ | j87.js |
| Hiện nay (nhãn trước số Thiện cảm) | **Nay** | ngắn, cổ, nhãn vẫn dính số | j87.js |
| Tuần này đến đây là hết. | **Tuần lục chép đến đây là hết.** | đi theo tên mới | j87.js |
| Dấu triện HẾT · TUẦN | **MÃN · TUẦN** | "mãn" là hết, đủ (như mãn hạn, mãn tang); hợp dấu triện | j87.js `seal:["HẾT","TUẦN"]` |
| Vào ngày mới (nút cuối Tuần lục) | **Sang tuần mới** | VANPHONG không cho dùng "ngày" khi ý là buổi/tuần; ở đây người chơi đang sang tuần mới | j87.js |
| Vào ngày mới (nút sau đêm, j18/j79 `dawn-go`) | **Sang buổi sáng** | cùng lý do | j18.js, j79.js |
| Vuốt trang hoặc chạm mép phải để lật | **Vuốt hay chạm mép phải để lật trang** | gọn hơn; "hay" thay "hoặc" cho mềm giọng | j87.js |
| Trang trước / Trang sau | GIỮ | rõ | j87.js, j79.js (nhãn cho máy đọc) |

## 3. Các sổ, bảng khác

| Hiện tại | Đề xuất | Lý do | Chỗ |
|---|---|---|---|
| Sổ ghi (tab) | GIỮ | đã duyệt; nếu sau này muốn cùng họ với Tuần lục thì có thể đổi thành "Nhật lục", nhưng nay chưa cần | thanh tab, j84 VP |
| Sổ luân hồi | GIỮ | chữ nhà Phật, cổ, rõ | j32, j52, j74 |
| Sổ ân thưởng | GIỮ | rõ; "Sổ" cũng hợp cổ trang (sổ Kính sự phòng) | j20.js `<h3>` |
| Sổ thị tẩm / Sổ Kính sự phòng | GIỮ | đúng tích, phim nào cũng dùng | j8.js, nút "Xem sổ thị tẩm" |
| Sổ đồ mất | **Sổ đồ thất lạc** | "thất lạc" là Hán Việt quen, nghe cổ hơn "mất" | chưa thấy trên origin/main (chắc ở nhánh đang làm) |
| Chọn sổ / Sổ chưa ghi / Ghi sổ / Nạp sổ / Chép sổ | GIỮ | đã duyệt | j74, j84 VP |
| "Đã ghi vào Ô N. Bấm “Tiếp tục kiếp này”…" | **Đã ghi vào Sổ N. Chạm “Tiếp tục kiếp này”…** | còn sót "Ô" và "Bấm" (VANPHONG: sổ, chạm) | j16.js (XIO.msg) |
| Bảng vinh danh | **Bảng vàng** | đúng tích bảng vàng đề danh; ngắn, ai cũng hiểu | j90.js (kitPodium) |
| Kết quả tranh ghế | **Ngôi thứ đã định** | "kết quả" nghe hiện đại | j34.js, j90.js |
| Bảng định thứ / Bảng phẩm vị | GIỮ | đã duyệt | — |
| Mâm thưởng / Hộp gấm / Ngự tứ / Rương bảo vật | GIỮ | đã cổ | j93.js |

## 4. Nhãn, chip

| Hiện tại | Đề xuất | Lý do | Chỗ |
|---|---|---|---|
| Tư chất (nút thu bảng, nhóm) | GIỮ | đã duyệt | j79, jk2b… |
| Nhân tâm / Ân sủng (nhóm trên thanh tư chất) | GIỮ | đã cổ | j79.js |
| Thời gian (nhóm trên thanh tư chất) | **Ngày tháng** | gom buổi, lương, ngày tháng; "thời gian" nghe như sách bây giờ | j79.js (nhóm `["Thời gian",…]`) |
| Cơ may | **Cơ duyên** | VANPHONG đã định: dịp tốt = cơ duyên. Nếu ý là bậc may rủi thì dùng thẳng bậc (Liều…Nắm chắc), không đặt nhãn mới | chưa thấy trên origin/main |
| Thỉnh tranh nhân vật (chip, nhãn cho máy đọc) | **Thỉnh chân dung** | "chân dung" là Hán Việt, ngắn, đúng là tranh người | jload.js |
| Đã thỉnh đủ tranh nhân vật | **Đã thỉnh đủ chân dung** | như trên | jload.js |
| Lần đầu nhập cung · thỉnh tranh vẽ, tiếng nhạc về máy | **Lần đầu nhập cung · đang thỉnh tranh vẽ, khúc nhạc** | bỏ chữ "về máy" | jload.js |
| Máy hết chỗ cất tranh | **Kho tranh đã đầy** | bỏ chữ "máy" mà vẫn rõ | jload.js |
| Mạng đứt / Mạng chập chờn | GIỮ | thông báo của máy; nói rõ quan trọng hơn nói cổ | jload.js |
| "a / b MB" (thanh tải) | **"a / b bức"** (đếm tranh) nếu dễ làm; không được thì GIỮ MB | MB là chữ viết tắt nước ngoài; đếm bức tranh vừa rõ vừa cổ | jload.js (kprog-n) |
| Đang mang (tab con của rương) | **Bên mình** | jinv đã dùng "đeo bên mình"; cổ, ngắn | jinv.js |
| Đang mặc | **Đang vận** | "vận y phục" quen trong phim cổ trang | jinv.js |
| Xa xỉ N / Xa xỉ 112 / 84 | GIỮ | Hán Việt, rõ | jinv.js |
| Giản dị / Vừa phẩm / Quá xa xỉ | GIỮ | rõ | jinv.js |
| Tất cả / Y phục / Trang sức / Hương liệu / Thuốc men / Thư từ / Kỷ vật / Lễ vật / Vải vóc / Tạp vật (tab con) | GIỮ | đã cổ | jinv.js |
| Người lạ (bậc 1 nhận mặt) | **Lạ mặt** | phim cổ trang hay nói "kẻ lạ mặt"; thành cặp với bậc sau | j61.js `K61STN`, j59/j60/j90, jcoopworld, jk2b |
| Thấy mặt (bậc 2) | **Biết mặt** | thành cặp Lạ mặt / Biết mặt / Biết tên | j61.js |
| Biết tên / Quen biết (bậc 3, 4) | GIỮ | rõ | j61.js |
| Bóng người | GIỮ | đã cổ ("thấp thoáng bóng người") | chưa thấy trên origin/main |
| Nàng với ngươi | GIỮ | rõ | j65, jk2b |
| Phẩm cao nhất | GIỮ | rõ | j32, j42 |
| Lương tháng (chế độ cung nữ) | **Bổng tháng** (dự phòng: Nguyệt lệ) | cùng họ với Bổng lộc của phi tần; "lương" nghe như làm công bây giờ. "Nguyệt lệ" đúng sử hơn nhưng khó hiểu hơn | j42.js |
| Chuẩn bị (dòng cộng phần, "Chuẩn bị thị tẩm") | **Sửa soạn** / **Sửa soạn thị tẩm** | chữ Việt cổ, mềm hơn | j79, j82, j8 |
| Cách chơi (trò nhỏ) | **Phép chơi** | "phép" là lệ luật (như phép nước) | j79, j82 |
| Điểm (đồng hồ trò nhỏ) | **Phần** | VANPHONG đã định: điểm thi = phần | j79.js `hud:[["score","Điểm",0]…]` |
| Thời gian · 30 giây (đồng hồ trò nhỏ) | **Hạn giờ · 30 giây** | "hạn giờ" rõ là thời hạn | j79.js |
| Hết giờ | GIỮ | "giờ" vẫn cổ (canh giờ) | j82, j91 |
| Danh sách (nút trên Dư đồ) | GIỮ | Hán Việt, rõ | j26, j27 |
| Tin trong cung / Tai mắt báo tin / Chủ tin | GIỮ | đã cổ | j3, j28, j79 |
| Thân phận kiếp này / Đổi thân phận / Phúc duyên | GIỮ | đã duyệt | — |

## 5. Nút

| Hiện tại | Đề xuất | Lý do | Chỗ |
|---|---|---|---|
| Qua buổi | **Sang buổi** | "sang" nói rõ là thời gian đi tới | j6.js `#next`, j77, jcoopworld, jk3 |
| Qua đêm | **Đợi sáng** | "qua đêm" dễ đọc thành "ở lại qua đêm" (rất dễ lẫn trong game có thị tẩm); j77 đã có "Đợi sáng mai" | j6.js, j77, jcoopworld |
| Lui / Đã hiểu / Tạ ơn / Tuân chỉ / Lĩnh chỉ | GIỮ | đã duyệt | — |
| Ghi sổ / Nạp sổ / Chép sổ | GIỮ | đã duyệt | — |
| Bắt đầu (màn đầu) | **Nhập cung** | VANPHONG đã định: ngày đầu cuộc = Nhập cung | j74 (màn đầu) |
| Kiếp mới / Tiếp tục kiếp này | GIỮ | rõ | j6, j74 |
| Đầu thai kiếp sau (j3) và Chuyển kiếp (j32) | dùng chung **Chuyển kiếp** | một việc mà hai tên; "Chuyển kiếp" ngắn hơn | j3.js, j32.js |
| Vào cung ngay (màn tải) | GIỮ | rõ | jload.js |
| Chơi một mình / Chơi cùng bạn | **Một mình / Cùng tri kỷ** | VANPHONG cấm "bạn"; tri kỷ đã được duyệt cho người quen thân | jcooplobby.js (màn đầu) |
| Mời bạn / Đợi bạn / Đợi bạn xong tuần / Đợi bạn trở lại | **Mời tri kỷ / Đợi tri kỷ / Đợi tri kỷ xong tuần / Đợi tri kỷ trở lại** | như trên | jcooplobby, jcoop, jcoopworld |
| Nhập mã / mã phòng | **Báo ám hiệu / ám hiệu** | "mã" là chữ máy (VANPHONG cấm "mã"); "ám hiệu" cổ và rõ | jcooplobby.js |
| Xem người (kẻ hầu, tốn Bạc -15) | **Dò xét** | việc này là bỏ bạc ra dò tính nết; "xem người" nghe nhẹ quá | j15.js, j29.js |
| Đổi người / Thưởng / Phạt / Che chở / Mua chuộc | GIỮ | rõ | j10, j15, j19 |
| Thôi / Tiếp | GIỮ | cổ, ngắn | nhiều nơi |

## 6. Thông báo của máy

| Hiện tại | Đề xuất | Lý do | Chỗ |
|---|---|---|---|
| Có bản mới (tiêu đề) | GIỮ | "bản" đã cổ (bản in, bản khắc), nói rõ | dev/site/swreg.js |
| Cung Tường Mộng vừa có bản mới (dòng phụ) | **Cung Tường Mộng vừa được tu bổ** | cổ hơn, khỏi lặp chữ "bản mới" ngay dưới tiêu đề | swreg.js |
| Sổ đã ghi vẫn giữ nguyên. Tự mở bản mới sau N giây. | GIỮ | rõ, không mang chữ cấm | swreg.js |
| Mở bản mới (nút) | GIỮ | rõ | swreg.js |
| Vuốt trang hoặc chạm mép phải để lật | xem mục 2 | — | j87.js |

## 7. Tab (đã duyệt, GIỮ cả)

Hành sự · Dư đồ · Phi tần · Giao tình · Phe phái (ngắn: Phe) · Cung nhân · Hoàng tự · Tư trang · Tài nghệ · Mệnh truyện (ngắn: Mệnh) · Sổ ghi · Hậu cung; chế độ cung nữ: Phận sự · Đồng liêu · Thân phận. Không đổi.

## 8. Chữ cũ còn sót trong mã nguồn (VP có thể chưa vá hết, nên soát lại trên màn hình)

Hành động, Quan hệ, Chỉ số, Đã rõ, Đã biết, Đóng, Bảng điểm / BẢNG ĐIỂM, Kiểm tra đồ, Rương / Rương đồ (khi là tên tab), Trống, "Ô N", Bấm, Điểm. Bảng VP ở j84.js đã có một phần (Nhật ký, Bản đồ, Tuyến truyện, Thu gọn, Xét nghiệm, Bật/Tắt âm thanh…); cần soát chỗ nào chưa có.

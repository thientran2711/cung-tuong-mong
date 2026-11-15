# review/map-anim (gốc origin/review/book-release 4bbed569)

## 1. Dư đồ trải chậm lại (chủ 01:30Z)
- Hoạt cảnh duy nhất khi vào Dư đồ = kitUnroll (bản đồ da trải từ giữa, jbook). Căn bản đồ về chỗ nàng (j27/j38) là nhảy tức thì, không phải hoạt cảnh.
- Cũ: 620 ms, cubic-bezier(.25,.7,.25,1); và trên máy thật bị CẮT ngang ở ~0.3 s vì một lần render() sau (ảnh chân dung tải xong) thay phần tử bản đồ → trông "quá nhanh".
- Mới: KIT_MAP_MS = {unroll 1150 ms, ease cubic-bezier(.45,.05,.3,1)}; render lại giữa chừng thì trải tiếp đúng chỗ (kitUnrollKeep, animation-delay âm); chạm/nhấp/lăn/phím trên bản đồ dừng ngay; Cảnh động tắt / reduced motion: không trải. KIT §34.1b.

## 2. Luật đi đường (điều phối 01:35Z)
- walkOk(tc)/walkWhy(tc) (j9): đi được khi khắc đường ≤ khắc còn (bỏ +1). Áp cho bản đồ (j26/j27 nhãn, j9 danh sách), goTo (j2), seeBtn/visitBtn/visitPal/goSee (j21), accState (j41), srvGoTo cung nữ (j42), j77Kh/j77WalkWhy.
- Đến nơi hết khắc: thẻ kit "Đường đi N khắc · đến nơi là hết buổi, chỉ kịp xem ai ở đó" (Đi/Thôi, j77LastWalk); buổi sau bắt đầu ở đó (nextBuoi giữ chỗ).
- Nhãn: "hết khắc" chỉ khi còn 0; đường dài hơn số còn → "đi N khắc" + dấu khóa. KIT §34.1d.

## Kiểm (Fold 755x1000@2, iPad 1180x820@2)
- 0 lỗi trang, không tràn ngang. Trải đo theo khung: ~1.15–1.2 s, êm đầu êm cuối, sống qua render lại; chạm giữa chừng dừng ngay; tắt Cảnh động không trải.
- Còn 2 khắc ở nhà: Ngự hoa viên, Càn Ninh, Thái y viện… mở (2 khắc), chạm → thẻ, Đi → đến nơi, used 4, thấy người. Còn 1: "đi 2 khắc" khóa, 1-khắc vẫn mở. Còn 0: "hết khắc".

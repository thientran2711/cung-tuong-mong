# Kiểm tranh từng dòng việc (review/act-pics, 15/11)

Sếp 08:15Z (Sổ tuần, trang "Việc của ngươi"): "Nhịn." và "Làm thơ dâng lên" cùng một tranh (rương gấm); "Ngủ đêm hồi sức" và "Đi." cùng một
tranh phòng; "Đi." vô nghĩa; "Nhịn." thiếu ngữ cảnh. 08:20Z: Thỉnh an Thái hậu ≠ Thỉnh an Hoàng hậu, vạn phúc lễ đúng, không quay lưng, không quỳ.
09:40Z: hộp thoại "Nhờ thái giám mua đồ" (cảnh Triều chính sai; lưới cửa hàng).

## 1. Tranh của mỗi dòng đến từ đâu (trước khi sửa)
| Chỗ | Cách chọn tranh | Lỗi |
|---|---|---|
| Sổ tuần (j87 `kbkArt`) | câu → `KBK_EVRE` (regex) → tranh sự kiện `ev-*` (EVENTS.json); không khớp → mặc định theo trang: trang mình/người = `j24:co-nguoi-den` = nhóm **khach-den** (2 tranh: `ev-khach-den` = phòng, `ev-khach-den-2` = rương gấm), chọn theo băm (tuần, số dòng) | gần như mọi việc của mình (Làm thơ, Nhịn, Ngủ đêm, Đi, Cho mượn, Đánh đàn, Dưỡng nhan, Đọc binh thư…) rơi vào 2 tranh khách đến, xen kẽ ngẫu nhiên. Đây đúng là lỗi sếp thấy. Tranh thẻ việc (act-*) KHÔNG được dùng dù có. |
| Thẻ việc (j79 `kitActArt`/`kitActKey`) | tên thẻ → ACTS.json `acts` → `act-<key>.webp`; không có → `act-cat-<nhóm>` | 209 tên dùng 91 tranh; phần lớn chung tranh vì cùng cảnh (xem mục 3) |
| Thẻ kết quả (jk2b, sau một lựa chọn) | tranh của hộp thoại câu hỏi (kitEvArt: pid → EVENTS; pid không có nhóm → **mặc định trieu-chinh**) | kết quả "Nhịn" mang tranh câu hỏi; hộp thoại không có nhóm (Nhờ thái giám mua đồ, Tin trong cung) mang tranh Triều chính (quan quỳ) |
| Sổ ghi (j6 tab log) | không tranh, chỉ mặt người được nhắc | chữ "Nhịn." / "Đi." / "Thôi." / "Từ chối." không ngữ cảnh |
| Chữ dòng lựa chọn (j3 `chooseM`) | ghi `"<tên nút>. <số>"` | "Nhịn.", "Đi.", "Từ chối.", "Cho mượn.", "Thôi.", "Xin bái kiến." + ngay sau đó câu kết quả (lặp) |

Nhãn quan hệ: Sổ tuần đọc chữ của nhật ký, chữ này đã là "Hoàng hậu quý ngươi +4" (j1 NAMES.hh) trên main; ảnh của sếp là bản cũ.
Kiểm lại trong lượt chơi thử: "Thỉnh an Hoàng hậu. Hoàng hậu quý ngươi +4 · Danh +2 · Đức +1".

## 2. Đo (chơi tự động 6 tuần cùng hạt giống 11, Fold 755x1000@2; dev/test/act-pics.js + act-pics-count.py)
"Nghĩa" = phần đầu câu trước dấu . : · ( [ (tên người giữ nguyên, nên vài nghĩa giống nhau đếm hai lần).
| | main (trước) | review/act-pics (sau) |
|---|---|---|
| dòng trong sổ (trừ triều đình) | 99 | 78 |
| tranh khác nhau dùng | 14 | 40 |
| tranh bị nhiều nghĩa dùng chung | 6 | 9 |
| số nghĩa nằm trong nhóm dùng chung | 71 | 29 |
| hai dòng liền nhau khác nghĩa cùng tranh | 4 | 0 |
| nhóm lớn nhất | ev-khach-den 28 nghĩa, ev-khach-den-2 26 nghĩa | act-cat-giao-thiep 9 (câu tin "Ngươi đã biết…", "Muốn thấy tận mắt…", không phải việc) |
Còn chung (đúng cảnh, chấp nhận): ev-hoang-de-dem (Thị tẩm, Khen một câu, Lặng lẽ xoa vai: cùng đêm thị tẩm), act-lat-the (Tranh sủng, thẻ bài
được lật), act-duong-nhan (Điểm trang / Để mộc), act-thinh-an-th (Thỉnh an Thái hậu / được dẫn đến trước mặt Thái hậu), act-lam-tho-v2 (Làm thơ /
Bàn thơ văn), act-len-vao. Sửa thêm sau lượt đo: dòng chỉ có số sau Thị tẩm ("Sủng +3 · Ân tình +2.") gộp vào dòng trước (KBK_DELTA_ONLY nhận "·");
khoảng trắng không ngắt trong tên không làm trượt luật ("Ngươi đã được thấy mặt Thái hậu" → thinh-an-th); places() lỗi không làm mất tranh nơi đến.
Lượt "trước" chạy index.html của main, lượt "sau" chạy nhánh này, cùng dev/test/act-pics.js + act-pics-count.py.

## 3. Luật mới
- Mỗi việc khác nghĩa → tranh riêng đúng nghĩa. Thứ tự chọn tranh cho mỗi dòng sổ (j87 `kbkCands`): ACTS.json `log` (regex → tranh) →
  "Đến <nơi>" = cảnh nơi đó đúng mùa + buổi lúc đi (j94 `sceneImg`, nhật ký mang buổi) → tên thẻ việc ở đầu câu (= tranh của thẻ việc, cùng
  `kitActKey`) → regex sự kiện cũ → tranh nhóm của việc (`act-cat-*`) → mặc định cũ. Hai dòng liền nhau khác nghĩa không bao giờ trùng tranh
  (lấy ứng viên kế tiếp); cùng nghĩa (cùng đầu câu) thì giữ cùng tranh.
- Dòng lựa chọn (j87 bọc `chooseM`): nút chỉ để đi/thôi (Thôi, Đi, Đợi buổi sau) không ghi; nút không tự có số mà trò chơi đã viết câu kết quả
  riêng ("Núp nghe lén." + "Núp sau hòn giả sơn, ngươi nghe rõ…") → chỉ giữ câu kết quả; nút ngắn thêm ngữ cảnh:
  "Nhịn lời mỉa của <tên>", "Đáp trả lời mỉa của <tên>", "Cho <tên> mượn bạc", "Từ chối cho <tên> mượn bạc", "Nhận lời xin lỗi của <tên>",
  còn lại "<nút> (<câu đầu của câu hỏi>)". Cùng tên đó làm tiêu đề thẻ kết quả, và thẻ kết quả mang tranh của chính lựa chọn khi có.
- "Đi." → không còn. Đường đi ghi "Đến <nơi>." (đã có từ goTo) và nay HIỆN trong Sổ tuần với tranh nơi đến theo mùa/buổi (trước bị giấu).
- Hộp thoại không có nhóm sự kiện → cảnh phòng đang ở (mùa/buổi), không rơi về Triều chính (jk2b kitEvArt).

## 4. Nhóm dùng chung (thẻ việc, ACTS.json): giữ hay tách
Tách (nghĩa khác hẳn) — tranh mới hoặc tranh có sẵn đúng hơn:
| tên | trước | sau |
|---|---|---|
| Thỉnh an Thái hậu, Thỉnh an, chép kinh | thinh-an-v2 (một tranh cho mọi thỉnh an) | **thinh-an-th** (Đức Thọ cung, Thái hậu ~58 tuổi trên bảo tọa, phi tần vạn phúc 3/4 chính diện) |
| Thỉnh an, Thỉnh an Hoàng hậu | thinh-an-v2 | **thinh-an-hh** (Càn Ninh cung, Hoàng hậu trẻ đội phượng quan, phi tần đứng hàng hai bên, người chào vạn phúc tay chắp bên phải eo) |
| Xin bái kiến, Xin yết kiến, Chào hỏi đúng lễ, Hành lễ thỉnh an | thinh-an-v2 | **bai-kien** (trước cổng cung, phi tần vạn phúc, thái giám cúi đáp lễ) |
| Làm thơ dâng lên, Gửi bài thơ cũ, Làm thơ Trùng cửu, Bàn thơ văn, Giữ bài thơ | lam-tho (SAI: cuộn giấy trắng) | **lam-tho-v2** (phi tần cầm bút viết thơ trên án thư; bản vẽ 14/11 SytoLFAUb8 tải lại, không vẽ mới) |
| Tha lỗi, Nhận lời xin lỗi | ta-loi (người xin lỗi: ngược nghĩa) | **tha-loi** (chủ nhà nắm tay người xin lỗi) |
| Ngủ sớm, Ngủ đêm hồi sức | nghi-ngoi (giường ban ngày) / khach-den | **ngu-dem** (giường màn đêm, đèn lồng, trăng) |
| Nhịn (lời mỉa) | khach-den-2 (rương) | **nhin-loi-mia** (phi tần cúi mặt nhẫn nhịn trước người cầm quạt nói, cung nữ sau lưng) |
| Cho mượn, Cho N lượng, "<tên> trả lại N lượng đã mượn" | khach-den | **cho-muon** (trao túi bạc) |
| Từ chối, Khéo từ chối, Đuổi đi/về, Tiếp đãi lạnh nhạt, Lạnh lùng | khach-den | **tu-choi** (ngồi giơ tay từ chối, khách lui ra) |
| Đáp trả lời mỉa | khach-den | khieu-khich (có sẵn, cùng cảnh đối đáp) |
| "Đêm qua thẻ bài của X được lật" | khach-den / tin-don / benh-tat (ngẫu nhiên) | lat-the (có sẵn) |
| "Vào … không chào chủ vị", "Vào thẳng" | khach-den-2 | cảnh cung phi tần (scene:rv) |
| Điểm trang / Để mộc; Tập trước Thi; Xin ân cho gia đình; Hội Phượng; Thưởng vì… | khach-den | duong-nhan; luyen-cam-ky; xin-an-dien; vo-nghe; thuong (có sẵn) |
Giữ chung (thật cùng cảnh, ghi rõ): xin-che-cho (các kiểu cầu xin che chở), day-con-hoc (dạy chữ/mời thầy), cai-tai-mat (mua chuộc làm tai mắt),
nghe-len (dò la), to-giac (các kiểu tố), nghi-ngoi (nghỉ ngày), luc-ruong (tìm chứng cứ), chon-nguoi (chọn người), phat-chan, lat-the (thẻ bài),
xin-an-dien, thai-y, dan-dem-trang, luyen-cam-ky, tung-kinh, tang-qua, cai-do, so-thi-tam, ta-loi (Tạ lỗi, Nhún nhường), day-ho, ha-doc, dang-so,
dang-tra, theo-hau, tra-khao, den-tham, dang-canh, mua-yen, theu-khan-ban, duong-nhan, dan-con-thinh-an, chua-benh-con, an-thai, khieu-khich,
boc-thuoc, mua-hang, hoi-han, ngang-chan, tung-tin, ket-giao, phong-tuoc, thu-toi, gia-benh, xuat-gia, hoc-le, vo-nghe, tham-con, hon-su.
Còn lệch nhẹ, chưa tách (đề xuất, chờ sếp): "Khen tài nghệ nàng", "Hỏi chuyện" trong tro-chuyen-hoang-thuong (tranh trò chuyện với Hoàng thượng);
"Giúp đỡ nàng / Giúp nàng" trong thuong (thưởng cung nữ); "Hỏi chuyện cũ" trong luc-ruong; "Xin Hoàng thượng cử Đại học sĩ" trong day-con-hoc.

## 5. Tranh vẽ mới (gpt-2-6, thư mục ba4aecfe…, 3:4 1k, cắt 384x506 bằng dev/figwork/acts/fetch2.py; tự xem từng tranh)
| tệp | id dùng | thử bỏ | ghi chú |
|---|---|---|---|
| act-thinh-an-th.webp | CqGzn2KEEy | 3zb55OEREY, UPmhhr8wny (tay giữa bụng, chưa hướng về bảo tọa), 1lpedMJr4r | sửa từ ksDpOj816B rồi từ 3zb55OEREY + dáng của P3EuuSz42C |
| act-thinh-an-hh.webp | P3EuuSz42C | JNaffsnOq4 (tay giữa) | sửa từ ksDpOj816B |
| act-bai-kien.webp | 3zb556bREY | | |
| act-nhin-loi-mia.webp | EbznnmcuuO | tCi33d3mZJ | |
| act-ngu-dem.webp | s7o88xTl8e | | style ref iGq8UJy3uK (tẩm cung đêm) |
| act-tha-loi.webp | jUXBBxcLD0 | | |
| act-cho-muon.webp | rgedB4axtc | | sửa từ jUXBBxcLD0 |
| act-tu-choi.webp | gOIthZsSXO | | sửa từ jUXBBxcLD0 |
| act-lam-tho-v2.webp | SytoLFAUb8 | | bản 14/11 có sẵn, chỉ tải lại |
| fig-eunuch-ndp-tray.webp | tCi3GKpmZJ → tách nền SytmCITUb8 | 4RuQ5cx9Aa | thái giám Nội vụ phủ bưng khay hàng (từ dáng u01 KLM20Jnkqp), 340x900, cutcheck 0 |
Tín dụng: 14 lượt 1k × 40 = 560 + 2 lượt 2k × 65 = 130 + tách nền 3 = **693**. Tờ ghép: dev/shots/act-pics/new.jpg.
Mọi id cũng ghi ở dev/figwork/acts/gens.txt. Ảnh KHÔNG vào git: lên Cloudflare bằng cdn_sync (điều phối chạy).

## 6. Mặt Thái hậu (sếp 10:05Z: face-thaihau-3 "gian, kiêu": mắt xếch liếc, nhếch môi, son đậm)
Xét cả 6 mặt (bản trên CDN): 3 gian/liếc, 2 cau mày trừng, 5 mí nặng nghiêm, son đậm → vẽ lại (gpt-2-6, sửa từ chính ảnh CDN, style face-consort-01:
hiền, mắt nhìn thẳng, môi khép cười nhẹ, son tự nhiên, ~55–60, giữ mũ phượng/áo/bố cục). Giữ 1, 4, 6 (6 trên CDN đã là bản hiền).
3 = rgedmM8xtc · 2 = u5nYDGiQLD · 5 = YMLsJjFWeC (bỏ: MBw7NgNDCm, s7o8fXel8e, Do7J6wgpcl). 6 lượt × 40 = 240. Tờ trước/sau: dev/shots/act-pics/thaihau-faces.jpg.
Cùng tên tệp (j17 dựng face-thaihau-N): máy người chơi có thể giữ bản cũ tới 7 ngày.

## 7. Cửa hàng Nội vụ phủ (sếp 09:40Z, 10:30Z, 10:45Z) — KIT 28.13d kitShop (jinv.js)
Bố cục thẻ người của kit: thái giám Nội vụ phủ đứng bưng khay (fig-eunuch-ndp-tray) cột trái, không nền cảnh; phải: lời + "Ngươi có N bạc",
lưới ô nhỏ (ô Tư trang theo phẩm) với tên, một dòng công dụng, giá; chạm ô → khung mua dưới lưới: thẻ món (Phẩm/Được/Mất/Ghi chú), số lượng
− +1 +2 +3 +4 Tối đa, "Tổng: N bạc", Mua / "Thiếu bạc"; mua nhiều thì Tư trang gộp ×N. "Thôi" nút nhỏ. Không còn tranh Triều chính
(jk2b: hộp thoại không có nhóm sự kiện lấy phòng đang ở). Kiểm dev/test/shop-grid.js (Fold 755, 412, iPad 1180).

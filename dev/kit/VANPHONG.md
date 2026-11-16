# VĂN PHONG — chuẩn lời chữ cổ trang cho Cung Tường Mộng

Mọi chữ người chơi thấy (nút, tab, chỉ số, tên việc, lời kể, tin, sự kiện, bản đồ, sổ ghi, lời chú, màn đầu, kết cục) viết theo giọng cổ trang như bản dịch/lồng tiếng *Chân Hoàn truyện*, *Diên Hy công lược*. Rõ luật chơi vẫn quan trọng hơn hoa mỹ: con số, bậc may rủi, các dòng Tốn/Thành/Hỏng/Kèm giữ nguyên.

Thi hành: `dev/build/j84.js` (module cuối trong assemble.py) sửa dữ liệu và thay chữ trên màn hình theo bảng `window.VP`. Module mới nên viết thẳng theo chuẩn này; khi lỡ, VP sẽ vá trên màn hình. Gọi `VP.fix(str)` để chuẩn hóa một chuỗi, `VP.date(m,y,tuan,buoi)` để viết ngày tháng.

## 1. Bảng thuật ngữ (một khái niệm, một chữ)

| Khái niệm | Dùng | Không dùng |
|---|---|---|
| Đơn vị thời gian | buổi (sáng / chiều / tối), khắc (4 khắc một buổi), tuần (thượng / trung / hạ tuần), tháng, năm | lượt, turn, ngày (khi ý là buổi), vòng |
| Một lần trong trò nhỏ (đàn, múa, lật bài) | hồi: "Hồi 2/5" | lượt, round |
| Ngày tháng (đầy đủ) | Tháng ba, năm thứ nhất, thượng tuần, buổi chiều | T3/1, Năm 1 · Tháng 3, 3/1 |
| Ngày tháng (ngắn, thanh trên cùng, sổ ghi) | Tháng ba · thượng tuần · năm thứ nhất | T3/1 |
| Tên tháng | giêng, hai, ba, tư, năm, sáu, bảy, tám, chín, mười, mười một, chạp | tháng 1, tháng 12 |
| Năm | năm thứ nhất, năm thứ hai, … (có thể kèm niên hiệu: "Cảnh Hòa năm thứ hai") | năm 1, Năm 2 |
| Bảng chỉ để đọc / khép bảng / thẻ | không có nút: một ✕ góc trên phải đầu thẻ, chạm ra ngoài hoặc Esc (KIT 32.10) | Đã hiểu, Đã rõ, OK, Xong, Thôi, Lui, Đóng, ✕ Đóng |
| Thu / mở bảng | Thu lại / Mở ra | Thu gọn / Mở rộng |
| Lời dặn bảng nổi | Chạm để lui · đầy đủ trong Sổ ghi | Chạm để đóng · đầy đủ ở Nhật ký |
| Nút sang buổi / sang ngày (nút lớn đỏ, thẻ nơi chốn, mẹo) | ban ngày: Sang buổi · buổi tối: Sang ngày mới | Qua buổi, Qua đêm, Qua ngày, Đợi sáng, Đợi buổi sau |
| Nút nhận thánh chỉ, ân thưởng | Tạ ơn / Tuân chỉ / Lĩnh chỉ | OK |
| Một kiếp chơi | kiếp | ván, game, màn |
| Chỗ ghi kiếp | sổ: "Sổ một, Sổ hai, Sổ ba"; chỗ chưa ghi: "Chưa ghi" | Ô 1, Trống, slot |
| Ghi / nạp kiếp | Ghi sổ / Nạp sổ | Lưu / Tải |
| Chép kiếp ra ngoài | Chép sổ · "chép kiếp này thành bản chép" | Xuất ván, mã |
| Nạp kiếp từ ngoài | Nạp sổ · "dán bản chép vào để nạp" | Nhập ván, dán mã |
| Bảng tùy chỉnh | Thiết lập | Cài đặt, Tùy chọn, Settings |
| Tiếng | Nhạc · Tiếng động · Giọng · Im tiếng · Rung · Hiệu ứng: Đầy đủ / Gọn (owner 22:35Z; was Cảnh động); nút: Mở tiếng / Im tiếng | Âm thanh, Hiệu ứng âm, Hiệu ứng hình, Bật/Tắt âm thanh, Tắt tiếng |
| Tab việc làm | Hành sự | Hành động |
| Tab bản đồ | Dư đồ (nút quay lại: "‹ Dư đồ") | Bản đồ, map |
| Tab quan hệ (nút dưới) | Giao tình; mục con: Ân oán · Phe phái (lời chỉ: "Giao tình › Ân oán") | Quan hệ |
| Tab truyện riêng của thân phận | Mệnh truyện | Tuyến truyện, storyline |
| Tab sổ việc đã qua | Sổ ghi | Nhật ký, log |
| Nút dưới "Hậu cung" = mọi người trong cung | mục con: Hoàng thượng · Thái hậu (chữ ngắn "Thánh thượng") · Phi tần · Nam nhân · Cung nhân; lời chỉ: "Hậu cung › Cung nhân" | "Mục Cung nhân" (cũ) |
| Tab kẻ hầu | Cung nhân (mục con của Hậu cung) | Kẻ hầu (tên tab; trong câu vẫn dùng "kẻ hầu") |
| Tab con cái | Hoàng tự | Con cái (tên tab) |
| Tab rương | Tư trang (chữ ngắn cũng "Tư trang") | Rương đồ, Rương |
| Tab phe | Phe phái (chữ ngắn "Phe") | — |
| Việc học một môn (Tài nghệ, Tứ đức) (sếp 15/11) | Tự học · Học với thầy · Học với ma ma · Học với Thái hậu (tên thật người dạy giữ trong lời, vd. "ma ma giáo tập") | Tự rèn, Tự luyện, Theo ma ma giáo tập, Xin Thái hậu cho học cùng |
| Khoảng số trên thẻ việc (sếp 15/11) | "tiến bộ Thi một hai phần", "Sủng +3 đến +8" | "+1..2", "0..10" |
| Tab ở chế độ cung nữ | Phận sự · Dư đồ · Đồng liêu · Thân phận · Sổ ghi; lời dặn "Mục Phận sự" | Việc |
| Nút thu bảng trên cùng | Tư chất | Chỉ số |
| Nút dưới (8 nút + Sang buổi) | Hành sự, Dư đồ, Hậu cung, Giao tình, Hoàng tự, Tư trang, Tài nghệ, Mệnh truyện | — |
| Chữ ngắn của tab (màn dưới 1280 px) | Hành sự, Dư đồ, Phi tần, Giao tình, Phe, Cung nhân, Hoàng tự, Tư trang, Tài nghệ, Mệnh, Sổ ghi | Việc, Bản đồ, Quan hệ, Kẻ hầu, Con, Rương, Truyện, Nhật ký |
| Mưu người khác nhắm vào ngươi (sổ ghi) | «Hạ độc» nhắm vào ngươi (việc khó): không thành. | [Hạ độc · Khó · hỏng] |
| Bảng thi tài | bảng định thứ; "nàng mất 2 phần" | bảng điểm, điểm |
| Bậc tài nghệ | Bậc 1: … | B1: … |
| Soát đồ | Soát đồ, soát rương | Kiểm tra |
| Thái y xem đồ | nghiệm độc | xét nghiệm |
| Người quen thân | người quen, tri kỷ | bạn |
| Dịp tốt | cơ duyên, dịp | cơ hội |
| Tình cảm giữa hai người (owner 11/15 09:55Z; một số, một tên) | **thiện cảm**: chip "Nàng → ta: thiện cảm", "Ta → nàng: thiện cảm"; dòng thẻ việc "thiện cảm +10"; mối hận "oán ta +8". Chưa biết thì "chưa rõ nàng nghĩ gì", không hiện số. Hằng chung: `KIT_REL` (jaudit) | quý ngươi, quý ta, thân, thù (khi ý là thiện cảm), "đang −40" khi nàng chưa biết |
| Kẻ hầu với chủ / chủ với kẻ hầu (owner 11/15 10:10Z) | kẻ hầu đối với ta: **thiện cảm** (thanh "Thiện cảm", dòng thẻ "thiện cảm +6"); ta đối với kẻ hầu: **tin cậy** (thanh "Ta tin cậy", dòng thẻ "tin cậy Tiểu Lộ Tử +3"); nhóm "Cung ta"; người chạy việc ghi trên thẻ chính người ấy ("Đang là người chạy việc"). Chế độ cung nữ giữ "Chủ tin" (chủ tin nàng). `KIT_REL.srvThem/srvTrust/runner` | Lòng, Chủ tin (ngoài chế độ cung nữ), Cung ngươi |
| Ngôi thứ ba (người khác) (owner 11/15) | nữ: **nàng ta** ("Khen tài nghệ nàng ta", "nàng ta nắm 1 chứng cứ của ta"); nam: **y** (trung tính, lễ độ), **hắn** chỉ khi thù địch; Hoàng thượng: **bệ hạ**; Thái hậu: **Thái hậu**; chưa rõ: **vị ấy**. Hàm `kitThey(p)` (jaudit); VP đổi "nàng" trơn thành "nàng ta" trên màn hình | "nàng" trơn khi nói người khác |
| Y phục dưới phẩm ở lễ (owner 11/15) | **thiếu lễ** ("thiếu lễ (y phục dưới phẩm): Danh −2 …"); khác **vượt phẩm** (mặc quá phẩm) | ăn mặc sai, không hợp |
| Món đang mang (Tư trang, mọi ô) | **Đang mặc** (một chữ cho trâm, áo, vòng…) | Đang cài, Đang đeo, Đang dùng |
| Tên món đồ trong câu (review/small-bugs-3) | danh từ chung: giữa câu viết thường ("Khương Lạc Anh tặng trâm gỗ đào cho …", "Phần thưởng: vòng ngọc Hòa Điền vào rương."); đứng một mình (ô đồ, tên thẻ, chip, đầu câu / đầu dòng) viết hoa chữ đầu; tên riêng trong tên món giữ hoa (Hòa Điền, Hàng Châu). VP làm trên màn hình: `VP.itemLow` (j84, tên từ IT + WD_ITEMS) | "tặng Trâm gỗ đào cho" |
| Thay đổi thiện cảm (review/small-bugs-3) | "thiện cảm +20", "<tên> thiện cảm +25" | "thân +20", "nàng thân +20" (VP đổi cả dòng sổ cũ) |
| Việc cung nữ làm hộ (chọn đồ ra mắt, review/small-bugs-4) | gọi tên cung nữ, nói rõ cái gì quyết định: "<tên> chọn giúp (có hợp ý hay không tùy thiện cảm của <tên> với ngươi: Chắc)"; bất kỳ "thiện cảm" nào cũng phải nói của ai với ai | "theo lòng nàng" (nàng là ai?), "Lòng" |
| Món đang mang, mọi câu (review/small-bugs-4) | **Đang mặc** / "Ngươi đang mặc." cho trâm, áo, vòng, mọi món | Đang cài, Đang đeo, Đang dùng, "Ngươi đang cài" (cả trong câu) |
| Tên kẻ hầu | không trùng trong cả cung, không có số ("Thúy 2") | tên kèm số |
| Số đo (Sắc, Tài, Sủng…) | gọi đúng tên; khi chung chung: "không đổi gì" | chỉ số, stat, điểm |
| Điểm thi (tuyển tú, thi tài) | phần: "nàng mất 2 phần" | điểm |
| Bậc may rủi (CHỈ cơ may thành/hỏng của chính việc làm: một chữ ở góc thẻ / cạnh lựa chọn) | Liều / Khó / Năm ăn năm thua / Khá chắc / Chắc / Rất chắc / Nắm chắc (việc chắc không ghi chữ) | %, Chắc chắn, random |
| Khả năng của một điều kèm theo (có thai, được ban thưởng, lật thẻ, bị lộ, bị phạt, chết… trong Được / Mất / Kèm, thẻ kết quả, Sổ ghi, lời dặn, ô trạng thái) | Rất thấp / Thấp / Vừa / Cao / Rất cao (không có thì "Không có"); trong dòng: "có thai: khả năng thấp · được ban thưởng: khả năng vừa"; ô: "Có thai: Thấp"; sổ ghi: "(khả năng: vừa)". Hàm `chanceW` / `chanceLvl` (j1) | "có thai: Liều", "được ban thưởng: Khó", "cơ may: …" cho điều kèm theo |
| Chạm màn hình (lời dặn) | chạm | bấm, click, nhấn |
| Mở một tab (lời dặn) | Vào mục Phe phái | Mở tab Phe phái |
| Quan hệ hai chiều (thẻ người, Giao tình, sổ tuần, kết quả việc) | chủ ngữ + động từ + đối tượng: "Nàng quý ngươi: Bình thường · -5", "Nàng oán ngươi: 0", "Ngươi quý nàng …", "Ngươi oán nàng …"; theo vai khi tự nhiên: "Hoàng hậu quý ngươi", "Hắn quý ngươi"; chưa biết: "Nàng quý ngươi: chưa rõ" | Thiện cảm (đứng trơ), Ngươi với nàng, Nàng với ngươi | (thẻ người, sổ tuần, kết quả việc vẫn dùng lối này)
| Mức "quý" | Ghét (≤ -30) · Không ưa (-29…-11) · Bình thường (-10…10) · Có cảm tình (11…29) · Quý mến (30…59) · Thân thiết (≥ 60) | Lạnh nhạt, Thân |
| Hàng quan hệ kitRelRow (Giao tình › Ân oán, owner 11/15) | dòng 1: "<A> → <B>: thiện cảm" / "<A> → <B>: oán" (người chơi = "ta": "Hoàng hậu → ta: oán", "Ta → Hoàng hậu: thiện cảm"); dòng 2: "<mức> · <số>" rồi thanh | "Nàng quý ngươi" trong Ân oán, "thù" |
| Hai chỉ số quan hệ (giữ riêng, không gộp; owner 11/15) | chạm nhãn: **Thiện cảm**: "có chịu giúp, kết giao với ta không" · **Oán**: "mối hận vì việc ta đã làm, có muốn trả đũa ta không; nguôi dần mỗi tháng" | thù, thù hận |
| Mức "oán" (0…100, BAL.oanLv) | Không oán (< 5) · Chút oán (5…19) · Oán (20…44) · Oán sâu (45…74) · Oán hận (≥ 75) | Thù, Thù hận |
| Người chưa gặp (Ân oán) | "Ta chưa gặp <tên>, chưa rõ nàng ta đối với người khác ra sao. Gặp nàng ta, dò la, hoặc có thêm tai mắt." | Ngươi chưa gặp …, Gặp nàng |
| Tiền của người chơi (cửa hàng) | "Ta có N bạc" | Ngươi có N bạc |
| Kẻ hầu được sai đi làm việc | Người chạy việc: <tên> (chạm: "Khi ngươi sai người dò la, đưa thư, mua đồ…, người này đi; chọn theo Lòng và tài"); nút "Đổi ›" | Sai đi: <tên> |
| Ngày đầu cuộc | Thân phận kiếp này · Nhận thân phận · Nhập cung | — |
| Chơi chung (sếp 15/11) | Cùng hảo hữu · Mời hảo hữu · hảo hữu (người chơi cùng) · Ám hiệu · Nhập ám hiệu | Chơi cùng bạn, Mời bạn, bạn, tri kỷ, Mã phòng |
| Sổ tóm tắt tuần | Tuần lục | Sổ tuần |
| Đồ đang đeo | Bên mình | Đang mang |
| Bảng xếp hạng | Bảng vàng | Bảng vinh danh, leaderboard |
| Tab Hoàng thượng + Thái hậu | Chí tôn | Hoàng thượng · Thái hậu, Thánh thượng |

Từ đã cổ trang, giữ nguyên: Bạc, Sức, Sủng, Danh, Sắc, Tài, Tâm cơ, Đức, Tai mắt, Ân tình, Phúc duyên, Lòng, Chủ tin, thiện cảm, oán, ghen, khắc, quẻ, thẻ bài, thị tẩm, tấn phong, sắc phong, lãnh cung, cấm túc, ân thưởng, bổng lộc, Phi tần, Phe phái, Kẻ hầu, Con cái, Rương đồ, Tài nghệ, Bảng phẩm vị.

## 2. Xưng hô (theo phẩm, theo người nói)

| Người nói | Tự xưng | Gọi người chơi |
|---|---|---|
| Lời kể (người kể chuyện), nhãn, thẻ, chip | — | **ta** (sếp 15/11: người chơi đọc là chính mình — "Con của ta", "Hoàng hậu với ta"; j84 đổi trên màn hình, lời NPC trong “…” vẫn gọi "ngươi") |
| Người chơi trước Hoàng thượng / Thái hậu / Hoàng hậu | thần thiếp | — |
| Người chơi (phẩm Tần trở lên) với người dưới | bổn cung | — |
| Người chơi (dưới Tần) với kẻ hầu | ta | — |
| Hoàng thượng | trẫm | ái phi (khi có sủng) / tên hiệu / "ngươi" khi giận |
| Thái hậu | ai gia | con (khi thương) / "ngươi" |
| Hoàng hậu | bổn cung | muội muội / theo phẩm |
| Phi tần ngang hàng | muội / tỷ (tỷ tỷ, muội muội); "hai ta" được | — |
| Thái giám | nô tài | tiểu chủ (người chơi dưới Tần) · nương nương (Tần trở lên) |
| Cung nữ, ma ma | nô tỳ | tiểu chủ / nương nương như trên |
| Kẻ hầu nói về chủ mình với người khác | "chủ tử nhà nô tỳ / nô tài" | — |
| Chế độ cung nữ (người chơi là kẻ hầu) | nô tỳ | người trên gọi: ngươi |

Quy tắc phẩm: Đáp ứng, Thường tại, Quý nhân = **tiểu chủ**; Tần, Phi, Quý phi, Hoàng quý phi = **nương nương**; Hoàng hậu = **Hoàng hậu nương nương**. Không bao giờ dùng: bạn, tôi, em, anh, chị (trừ "chị em" nghĩa kết nghĩa), mình (trừ "một mình", "mình" phản thân trong lời kể).

## 3. Không có trên màn hình

- Chữ ngoại: OK, buff, stat, level, combo, random, bot, test, game, click, tab, slot.
- Ký hiệu máy: %, "B1:", "T3/1", thẻ nội bộ trong ngoặc vuông kiểu "[Tung tin đồn · Năm ăn năm thua · hỏng]" (thay bằng câu: "Tung tin đồn — hỏng").
- Từ hiện đại: điểm, chỉ số, cơ hội, kiểm tra, xét nghiệm, tải lại trang, cài đặt, lưu, dữ liệu, phiên bản, hệ thống.

## 4. Giữ rõ luật chơi

- Con số giữ nguyên và đứng sau tên: "Sủng +6", "Bạc -30", "Sủng 28 → 31".
- Các dòng của bộ giao diện (Cần / Tốn / Được / Mất / Kèm / Ghi chú; Tốn / Thành / Hỏng / Kèm trên thẻ việc) là của chủ bộ giao diện: không ai tự đổi. Đề xuất chữ cổ (chờ chủ bộ giao diện duyệt):

| Hiện tại | Đề xuất |
|---|---|
| Cần | Phải có |
| Tốn | Hao |
| Được / Thành | Đắc / Thành |
| Mất / Hỏng | Thất / Hỏng |
| Kèm | Hệ lụy |
| Ghi chú | Lời chua |

- Câu ngắn, rõ; mỗi lời dặn nói được ngay phải làm gì.
- Không cắt chữ (không "…"): đổi chữ phải vừa ô ở 390 px.

## 5. Ví dụ

| Trước | Sau |
|---|---|
| T3/1 · thượng tuần | Tháng ba · thượng tuần |
| Năm 1, tháng 3, trung tuần (Xuân) | Tháng ba, năm thứ nhất, trung tuần (Xuân) |
| Đã rõ / Đã hiểu (nút đóng) | (bỏ nút; ✕ góc trên phải) |
| ✕ Đóng / ✕ Lui | ✕ |
| Ô 1 · Trống | Sổ một · Chưa ghi |
| Xuất ván · chép ván thành mã chữ | Chép sổ · chép kiếp này thành bản chép |
| Lượt 2/5: múa lại 4 bước | Hồi 2/5: múa lại 4 bước |
| B3: Mở «Phượng cầu hoàng»: cơ hội được thị tẩm | Bậc 3: Mở «Phượng cầu hoàng»: thêm dịp được thị tẩm |
| Đem đến Thái y viện xét nghiệm | Đem đến Thái y viện nghiệm độc |
| “Không có khẩu dụ, nương nương xin hồi cung.” (người chơi là Thường tại) | “Không có khẩu dụ, tiểu chủ xin hồi cung.” |

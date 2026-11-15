# ACT AUDIT — mọi nút có ra đúng như nút ghi (review/act-audit)

Bộ kiểm: `dev/test/act-audit.js` (Playwright) + `dev/test/act-audit-sum.py` (chấm). Kiểm luật một nguồn: `dev/test/rules-one-source.js`.
Bot so hai bản cùng hạt ngẫu nhiên: `dev/test/bot-same.js`.

## 1. Luật một nguồn (owner 06:15Z / 06:20Z / 06:40Z / 07:05Z) — nhánh review/rules-one-source

Mọi ngưỡng lên Hoàng hậu người chơi thấy nay đọc từ `BAL` (jbal.js) và `hhNeed(p)`; chính các phép kiểm (`promoReqP` j8,
`candOK` j34) cũng đọc từ đó. Bổng lộc đọc từ `BL` (j20), ghế theo phẩm từ `SEATCAP` (j30).

| Chỗ hiện | Chữ cũ | Luật thật đã chạy (và đã đo cân bằng) | Chọn |
|---|---|---|---|
| Ngôi Hoàng hậu, có hoàng tử: Thái hậu | "Thái hậu 50" (j8 promoReqP, j6 bảng sắc phong) | `BAL.hhTh` = 55 (jbal kiểm thêm ở candOK/promoReqP) | **55** (`BAL.hhTh`) |
| Như trên, Hoàng thượng hiếu thảo | "Thái hậu 40" | vẫn 55 (jbal) | **55** |
| Chưa có hoàng tử | "Thái hậu 80" (hiếu thảo 70) | 80 / 70 (lớn hơn 55) | **80 / 70** (`BAL.hhThNoSon`, `hhThNoSonHieu`) — không đổi |
| Danh sách điều kiện | hai dòng Thái hậu ("…/50" và "Thái hậu với ngươi 55+") | một luật | **một dòng**, số = số kiểm |
| j34 candOK | `th>=40` (chú thích cũ) | bị jbal 55 che | **`BAL.hhTh`** |
| Đức, mẹ Thái tử | "(mẹ Thái tử)" không bao giờ hiện (lỗi `nd<40`) | 40 | hiện đúng khi là mẹ Thái tử |
| Ghi chú Đức trên thẻ việc (ducWarn/ducWarnTxt) | "Đức 33 → 28: cần Đức 50 mới lên Hoàng hậu"; j65 VP viết lại thành "còn 28: cần 50" (mất chữ Đức); điều kiện `S.duc>=40` | ngưỡng 50 (mẹ Thái tử 40) | **"Đức 33 → 28"** (owner 07:05Z), chỉ hiện khi tụt dưới ngưỡng thật của nàng; bỏ lối viết lại của j65 |
| Ô Đức "!" trên thanh trên (jk3) | "Cần Đức 50 mới được lập Hoàng hậu" cứng, hiện cả khi là mẹ Thái tử | 50 / 40 | đọc `hhNeed`: hiện khi Đức < ngưỡng của nàng; chữ: "Cần Đức 50 mới được lập Hoàng hậu (mẹ Thái tử: 40)" |
| Chú giải Đức (j79 KIT_GLOSS, HX) | "50 (mẹ Thái tử 40)" cứng | 50 / 40 | đọc `BAL.hhDuc` / `BAL.hhDucHeir` |
| Bảng sắc phong (j6) | "Thái hậu 50 (không con trai: 80), Đức …/50 (mẹ Thái tử: 40)" | 55 / 80 / 50 / 40 | đọc BAL + `hhNeed` |
| Hoàng hậu không chặn (Tần…Quý phi) | "-40; hoặc Thái hậu 50" | -40 / 50 | `BAL.qBlockHh/qBlockTh` (không đổi số) |
| Phi trở lên: HH không phản đối | "Thái hậu 30, thế lực 180", HH -30 | như chữ | `BAL.hiOppTh/hiOppFac/hiOppHh` (không đổi số) |
| Chú giải Bổng lộc | "30–320 bạc" cứng | `BL` 30…320 | đọc `BL` |

Đã soát, chữ = luật: "Xin Thái hậu cho học cùng" (Thái hậu 40), "Xin Thái hậu đỡ lời" (30), "Xin Hoàng hậu che chở" (20),
bậc Sủng/Danh/khoảng cách sắc phong (đọc `RANKS`, `promoGap`), ghế (`SEATCAP`).
Quét tự động "cần … N" cạnh phép so trong dev/build: không còn chỗ lệch khác.

Kiểm: Fold 755x1000@2 và iPad 1180x820@2 — 0 lỗi trang, sổ cũ (bản main) nạp được, 200 trạng thái ngẫu nhiên: chữ = số kiểm = luật cũ thật.

## 2. Bộ kiểm mọi nút (dev/test/act-audit.js)

- Mỗi trạng thái dựng từ một ván mới, hạt ngẫu nhiên cố định; trạng thái được ghi (`ser()`), mỗi lần bấm đều nạp lại đúng trạng thái ấy (`deser` + chia lại bài cùng hạt).
- Trạng thái: **dau** (đầu game, buổi sáng, chưa quen ai), **toi** (buổi tối), **cao** (phẩm Phi, Sủng/Danh 60+, Tai mắt 3, đủ kẻ hầu), **con** (một hoàng tử 4 tuổi, một công chúa 2 tuổi), **hau** (đủ kẻ hầu), **hh** (ngươi là Hoàng hậu). Từ "toi" trở đi đã quen mọi phi tần.
- Mặt bấm: Hành sự (mọi thẻ), Hậu cung (thẻ 3 phi tần đầu + Hoàng hậu: Giao thiệp, Hại nhỏ/nặng, Sát hại, Dùng chứng cứ, quyền Hoàng hậu…), Cung nhân (cung nữ thân tín + 3 kẻ hầu), Hoàng tự, Tư trang, Tài nghệ, Mệnh truyện, Giao tình, Phe phái, Tẩm cung và **mọi nơi trên Dư đồ** (mỗi người gặp ở đó, mọi lựa chọn trên thẻ người), và **mọi lựa chọn của hộp thoại** mà nút mở ra (một tầng, tới 14 lựa chọn).
- Mỗi nút bấm hai lần: mọi lần gieo ép **thành**, rồi ép **hỏng**; việc chắc chắn bấm một lần. Nút khóa thì chỉ đọc lý do.
- So: (a) từng số trên Tốn/Được/Mất với thay đổi thật (chiều, người, cỡ; khoảng "+3 đến +11" phải chứa số thật), (b) thay đổi thật không dòng nào nhắc (HIỆU ỨNG ẨN), (c) thẻ kết quả (không "không đổi gì" khi có đổi; số "a → b" phải là số thật), (d) nút khóa phải nêu lý do, (e) lỗi trang. Thêm: nút không đổi gì cả (TRỐNG) hoặc chỉ ghi sổ/biết tin (TRỐNG? — xem tay).
- Giới hạn đã biết: việc có kết quả để buổi sau (Mời sang cung, sớ tấu, học với thầy) không thấy ngay — xem §8 (báo tin khi thời gian trôi); trò nhỏ (Tự học, thi) mở màn chơi nên chỉ thấy phần Tốn.

## 3. Cơ may của từng việc: công thức, yếu tố, chỗ bỏ sót (owner 05:55Z)

Chung: `odA(a,b)` = b, −15 khi Sức < 30, cộng Quẻ tuần (`lotB`) khi làm thật, trừ phạt sai người (`ACTX.pen` = `sentPen` − bậc×3) khi không cùng chỗ; kẹp 5…95.
"Vì sao <bậc>?" (jwhy) nay liệt kê đúng các yếu tố này cho từng thẻ.

| Việc | Công thức (trước) | Yếu tố | Bỏ sót rõ (cờ) → đã làm |
|---|---|---|---|
| Dò la (thẻ phi tần, cả NPC) | `oSpy` 45 + Tai mắt×6 + Tài/10 + Tâm cơ/5 − 6 (Hoàng thượng đa nghi) | chỉ người dò | **BỎ SÓT**: người bị dò (Tâm cơ, nết Đa nghi, thái giám canh, Tai mắt nàng), kẻ hầu được sai (Lòng, nết, bậc, quen người bên ấy) chỉ ẩn trong `sentPen` và thẻ không tính → **jwhy `spyFactors`**: một công thức cho mọi người |
| Sai cung nữ dò la (tẩm cung) | `od(40 + Lòng/3)` + người bị dò **chọn ngẫu nhiên** (j78maidT `pick`) | chỉ Lòng cung nữ | **BỎ SÓT** mọi yếu tố trên + **ngẫu nhiên người bị dò** → nàng tự chọn người (hộp chọn, mỗi người một bậc cơ may), cùng `spyFactors` |
| Người của X dò hỏi (NPC, j28 SOC.spy) | 40 cố định | không | **BỎ SÓT** → `spyRoll(v,t)` |
| Lệnh chủ: dò la (khởi đầu cung nữ, j42 `ordOdds`) | 45 + Tâm cơ/5 + Tài/10 | chỉ người đi | **BỎ SÓT** người bị dò → thêm Tâm cơ/Đa nghi/thái giám/Tai mắt nàng, quen người bên ấy |
| Kết giao | `oAlly` 60 − độc ác nàng/3 + 15 nếu đã quý + Danh/10 | đủ hai bên | thẻ thiếu phạt sai người → sửa (thẻ = cơ may thật) |
| Tung tin đồn | `oRumor` 50 + Tâm cơ/4 + Tai mắt×3 | chỉ người tung | không tính người bị đồn (Danh, phe) — **ghi để điều phối** |
| Vu oan | `oFrame` 30 + Tai mắt×5 + thủ hạ×10 + Tâm cơ/5 + 4 (đa nghi) | chỉ người vu | không tính Tâm cơ/Tai mắt người bị vu — ghi; còn "phát giác" riêng (`caught`) có tính |
| Hạ độc | `oPoison` 25 + Tai mắt×5 + thủ hạ×10 + Tâm cơ/5 − 6 | chỉ người hạ | người bị hạ: chỉ có ở `caught` (thử độc) — ghi |
| Phá việc học / Hạ độc con / Vu con trù ẻo | `oKSab`/`oKPoison`/`oKFrame` | chỉ người làm | không tính mẹ đứa trẻ canh con — ghi |
| Tố giác | `oAccuse` 40 − 30 (tố Hoàng hậu) + chứng cứ×15 + Danh/10 + Tài/10 + 5 (đa nghi) + phe | đủ | — |
| Mua chuộc cung nữ | `oBribe` 40 + Tâm cơ/3 − Lòng cung nữ nàng/3 | đủ | — |
| Cài đồ vào rương | `oPlant` 40 + Tâm cơ/3 + Tai mắt×3 − Lòng cung nữ nàng/4 | đủ | — |
| Rút thẻ bài | `oBlock` 50 + Tâm cơ/5 + Tai mắt×3 | chỉ người làm | — |
| Tố vượt phẩm | `oVP` 55 + Danh/5 | Danh | — |
| Tranh sủng / Chặn ngự giá | `oSteal` 34 + Sủng/3 + Sắc/10 (+ múa×5) + hợp ý ngài + tâm trạng | đủ | — |
| Ly gián, Hạ độc dần, Tố tội thật, Bóc tư tình (j30) | `odT` base + Tâm cơ/4 | **không qua `odA`**: không tính Sức yếu, Quẻ, phạt sai người | ghi để điều phối (khác luật chung) |
| Trình Thái hậu / Trình Hoàng hậu / Uy hiếp (j78) | 40 + chứng cứ×10 + lòng Thái hậu/5 … | đủ | Trình Hoàng hậu không qua `odA` — ghi |
| Xin Hoàng hậu giáng (j30) | 30 + HH quý người xin/2 − HH quý người bị/2 | đủ | không qua `odA` — ghi |
| Hoàng thượng: Tâng bốc / Nói thật lòng / Phô tài / Xin ân điển / Bàn triều chính | 55+Sủng/5+tâm trạng; 45+Đức/3 (+10 nhân từ); 30+bậc tài×10; 35+Sủng/3; 40+Tâm cơ/2+Thơ×3 | đủ | Tâng bốc: 25 phần trăm biết thêm sở thích của ngài — ẩn, nay hiện ở "Vì sao" không được (không phải cơ may chính) → ghi |
| Thái hậu: Thỉnh an chép kinh / Đỡ lời / Kể tội | 75; 45 + Thái hậu/3; 40 + chứng cứ×10 + Thái hậu/5 | | Thỉnh an 75 cố định — hợp lý (lễ) |
| Hoàng hậu: Thỉnh an / Che chở | 70; 45 + HH/3 | | — |
| Phế phi: Hỏi chuyện cũ | 50 + Tâm cơ/5; người được kể **ngẫu nhiên** | | → người được kể cố định, ghi trên thẻ ("về: …") |
| Khen tài nghệ nàng | 60 + Tài/5 | | — |
| Nghe lén câu chuyện | 40 + Tai mắt×6 | | — |

## 4. Lỗi SAI chính (lần chạy đầu, bản main c5b93e63f) → đã sửa trên review/act-audit

| # | Nút | Sai gì (thẻ ghi ≠ thật) | Tệp / hàm gây sai | Sửa |
|---|---|---|---|---|
| 1 | Mọi việc hại trên thẻ phi tần khi **không cùng chỗ** (Tung tin đồn, Vu oan, Hạ độc, Rút thẻ bài, Mua chuộc cung nữ, Ly gián…) | kẻ hầu được sai có thể bị bắt: khai ra ngươi (nàng +1 chứng cứ), 3/10 bị đánh chết (mất người) — **thẻ không ghi** | j9 `runAct` → `confessRisk`, j10 `servCaught` | Kèm: "<tên> được sai đi bị bắt thì khai ra ngươi …, có khi bị đánh chết: <bậc>" (jaudit §3) |
| 2 | Mọi việc trên thẻ phi tần khi không cùng chỗ | bậc cơ may trên thẻ **không trừ** phạt sai người (`sentPen` − bậc×3) → thẻ dễ hơn thật 1–2 bậc | j15 `rvGroups` dùng `ACT[k].o` không có `ACTX.pen` | `ACT[k].o` của ngươi trừ đúng phạt ấy; "Vì sao" ghi dòng "Phải sai … đi" (jwhy) |
| 3 | Kết giao, Dò la, Tung tin đồn, Vu oan, Lục rương, Bàn tán… | số quan hệ trên thẻ là số gốc; thật bị nhân theo nết người nhận (`persF` trust/slight) và `relAdd` còn đổi oán 0,6× — ví dụ "oán ngươi +5" ra +3…+11, "oán +30" ra +22 (thật là thiện cảm −30, oán +18×nết), Kết giao "+25" ra +13 | j9 `relAdd`, j28 `affAdd/oanAdd` (persF), chữ ở j17 `AOUT`, j9 `topicOpts` | thẻ vẽ số bằng **chính** hàm ấy: số đúng khi đã rõ nết, khoảng "+3 đến +11" khi chưa rõ (jaudit §5) |
| 4 | Thỉnh an Hoàng hậu | thẻ "Hoàng hậu quý ngươi +4", thật +2…+5; **ẩn** ghen −5 | j2 talkOpts hh (w hh:8, go ghen −5) | ghen −5 lên thẻ ("nàng bớt ghen 5"); số chính: thợ hotfix-thinhan (chỉ ghi nhận) |
| 5 | Xin Thái hậu đỡ lời | "Hoàng hậu +5", thật +3 | j2 talkOpts th (w hh:5 qua S.hh) | ghi nhận (cùng gốc S.hh ↔ quan hệ Hoàng hậu của thợ hotfix) |
| 6 | Sai cung nữ đi dò la | người bị dò **ngẫu nhiên** (`j78maidT` pick), cơ may chỉ theo Lòng | j2/j78 | nàng chọn người (hộp chọn), một công thức dò la (jwhy) |
| 7 | Tranh sủng / Chặn ngự giá | ẩn: nàng bị tranh "thiện cảm −15" (thẻ ghi "thù −15", sai nghĩa) | j8 `stealWin` (relAdd −15), j2 `stealX` | thẻ: "<tên> ghen +25, <tên> thiện cảm −15, oán ta +…" |
| 8 | Sai tai mắt dò nơi ở / Soát rương đồ / Hỏi người hầu "đó là ai?" | không dò ra mà thẻ kết quả đóng dấu **THÀNH**; Hỏi người hầu và Soát rương **không có thẻ kết quả** | j63 `resultShow` (`failTxt`), j61 `k61Ask`, j8 `invAct` | dấu HỎNG khi "không dò ra/không thấy gì…"; thêm thẻ kết quả (jaudit §6) |
| 9 | Phế phi: Hỏi chuyện cũ; Nhờ giúp đỡ | người được kể chọn ngẫu nhiên / người đầu danh sách, thẻ không nói ai | j78 fallen `pick`, j9 topicOpts | người cố định theo lý do thật, ghi "về: …" trên thẻ |
| 10 | Điều kiện sắc phong | "Thái hậu gật đầu (62/0)", "Sủng 62/85" (phân số) | j8 `promoReqP` | "Sủng 62 (cần 85)", "Hoàng thượng hiếu thảo: Thái hậu không được ghét ngươi (… cần từ 0)" |
| 11 | Mọi thẻ có giá bạc | "CẦN ✗ thiếu bạc (cần 20)" và "TỐN Bạc −20" (một điều hai lần) | j63 `kaNorm1` | bỏ dòng Cần ấy; Tốn thêm "thiếu bạc (có N)" (KIT 31.19) |
| 12 | Nhờ giúp đỡ | khóa ghi "cần thiện cảm 30 (đang −40)" khi chip còn "?" — **lộ số** | j25 | "(chưa rõ nàng nghĩ gì)" khi chưa biết |

## 5. Hiệu ứng ẩn → đã ghi lên thẻ

| Nút | Ẩn | Nay ghi |
|---|---|---|
| Mọi việc sai kẻ hầu đi (cả Kết giao, Dò la) | Chủ tin với kẻ hầu +3 khi xong việc (jtin `servMerit`→`tinAdd`) | Được: "Chủ tin với <tên> +3" |
| Việc hại bị người của nàng phát giác (`caught`) | ngoài 2 chứng cứ còn thiện cảm −10, oán ta +6×nết | Kèm: "…, thiện cảm −10, oán ta +…" |
| Thỉnh an Hoàng hậu | ghen −5 | "nàng bớt ghen 5" |
| Tranh sủng / Chặn ngự giá | thiện cảm −15 (và oán) người bị tranh | Kèm (xem #7) |
| Nhờ thái giám mua đồ › món | món vào rương (Tư trang +1) — đúng nghĩa tên nút | không đổi (tên nút đã nói), không tính là ẩn |
| Đến cung nàng thăm › Lẻn vào (hỏng) | cấm túc 2 tháng | ghi để thợ person-acts thêm vào thẻ (thẻ của nhánh khác) |
| Tiến cử kẻ hầu | Chủ tin +8 | ghi để thợ Cung nhân |

## 6. Nút không làm gì (owner 07:30Z): danh sách và quyết định

Bộ kiểm đánh dấu TRỐNG khi cả hai lần bấm không đổi gì (không số, không quan hệ, không mở hộp thoại) và TRỐNG? khi chỉ ghi sổ/cho biết tin. Xem tay từng nút:

| Nút | Thật sự làm gì | Quyết định |
|---|---|---|
| Hỏi han sức khỏe (thẻ phi tần, Hoàng hậu) | trước: thiện cảm +4 giảm dần theo số lần trong tháng; thẻ kết quả có khi "không đổi gì" | **cho tác dụng thật**: thiện cảm +2 (lần hai trong tháng +1), nhân theo nết; nàng có bệnh thì có thể kể bệnh (cơ may theo thiện cảm, Đa nghi giấu); khỏe thì biết Sức vừa/yếu. 1 khắc |
| Chào hỏi (người lạ trên Dư đồ) | thấy mặt + thân phận theo y phục (k61 bậc 1) | giữ: có tin thật |
| Sai tai mắt dò nơi ở | biết nàng ở đâu buổi này | giữ; sửa dấu kết quả khi không dò ra |
| Hỏi người hầu: đó là ai? | biết tên (lời thật) | giữ; thêm thẻ kết quả |
| Soát rương đồ | tìm đồ bị tẩm/cài | giữ; thêm thẻ kết quả |
| Nghe ngóng chung (mới) | 1 điều thật trong cung | giữ |
| Tự học (Tài nghệ) | mở trò học; tiến bộ theo số phần đạt | giữ (kết quả ở trò nhỏ) |
| Mời đến cung ta | kết quả buổi sau (nhận lời / từ chối: thiện cảm −3) | giữ; nay có báo tin khi buổi sau tới (§8) |
| Thôi / Để sau trong hộp thoại | đóng | giữ (không phải việc) |
| "Phe phái hậu cung", "Triều đình" | thẻ chuyển mục | không phải việc |

Không còn nút việc nào không có tác dụng trong các trạng thái đã chạy. NPC: j28 `SOC` — "provoke" với ngươi có dòng `apply({duc:0})` vô nghĩa nhưng việc vẫn có tác dụng (oán +6, Danh nàng −1) — không có việc NPC rỗng.

## 7. Người được nhắm chọn ngẫu nhiên (owner 08:45Z)

| Việc của nàng | Trước | Nay |
|---|---|---|
| Sai cung nữ đi dò la | `j78maidT` → `pick(liveRivals)` mỗi buổi | nàng chọn trong hộp thoại (mặt, tên, phẩm; người chưa quen ghi "ở <cung> (chưa quen)"), thẻ ghi "nhắm: …" |
| Phế phi: Hỏi chuyện cũ | `pick` người có việc ác | người có nhiều việc ác thật nhất (rồi người ghét nàng nhất), ghi "về: …" |
| Nhờ giúp đỡ (nàng kể chuyện) | người đầu danh sách | người nàng ghét nhất, ghi tên |
| Nghe ngóng chung (mới) | — | không nhắm ai; nghiêng theo nguyên do thật (người đang có chuyện với ngươi, người cung nữ quen bên ấy, người đang được sủng, người có thai) |
| Nghe lén câu chuyện | người có mặt tại chỗ | giữ (ai ở đó thì nghe người ấy) |
| Dạy dỗ / Đưa con thỉnh an / Chữa bệnh cho con | con có Tài thấp nhất / ít được thương nhất / yếu nhất — đã ghi tên trên thẻ | giữ |
Các `pick()` còn lại trong j10/j29/j21/j22/j14 là việc của NPC hoặc sự kiện thời gian (NPC chọn theo động cơ thật: `pickTarget`, hostility), không phải việc nàng bấm.

## 8. Sự kiện đổi số của nàng mà không báo (owner 08:35Z) — `dev/test/silent-events.js`

Cho thời gian trôi 160 buổi (bản trước sửa: chỉ ghi Sổ ghi / sổ tuần, không hộp thoại, không thẻ kết quả):

| Đường sự kiện | Tệp / hàm | Đổi gì của nàng | Trước | Nay |
|---|---|---|---|---|
| Sớ hặc tội cha phi tần khác do nhà ngươi/người khác dâng, Hoàng thượng trách kẻ dâng sớ | j55 `tdImpeach` (chỉ báo khi nàng là người bị hặc) | Sủng, thế lực nhà | chỉ sổ tuần | thẻ "Trong cung vừa qua" khi số của nàng đổi |
| Kết quả "Mời sang cung" (từ chối: thiện cảm −3) | j21 `placeWhere` | thiện cảm | chỉ Sổ ghi | thẻ báo |
| Bổng lộc tháng | j20 `stipend` | Bạc | chỉ Sổ ghi | thẻ báo |
| Xin xăm / quẻ tuần | j13 | quẻ | chỉ Sổ ghi | (quẻ hiện trên thanh trên) |
| Lòng cung nữ nhích dần | j3/j10 | thiện cảm của cung nữ | không báo | không báo khi đổi ≤ 2 (trôi nhẹ); báo khi đổi lớn hơn |
| Ngủ đêm hồi sức | j6 | Sức | chỉ Sổ ghi | không báo (thường lệ) |
| Việc NPC nhắm vào nàng (đồn, hại, kết giao) | j28/j40 `mindRun` | Danh, thiện cảm, oán… | một số có hộp thoại "Tai mắt báo tin", số khác chỉ Sổ ghi | thẻ báo cho mọi thay đổi |

Cách làm (jaudit §1): mỗi lần thời gian trôi ở tầng trên cùng (`nextBuoi` không nằm trong một việc nàng vừa bấm), so số của nàng + quan hệ trước/sau; có đổi thì hiện **thẻ kết quả kit** (KIT §7) "Trong cung vừa qua" với số thật trước → sau và câu từ Sổ ghi, đợi hộp thoại đang mở đóng rồi mới hiện, không chặn. Việc NPC chỉ giữa NPC với nhau vẫn chỉ ghi sổ.

## 9. Số hiện cho người chơi khác luật thật đang chạy (ngoài §1)

| Chỗ | Hiện | Luật thật | Tình trạng |
|---|---|---|---|
| Bậc cơ may việc phi tần (không cùng chỗ) | không trừ phạt sai người | `odA` trừ `ACTX.pen` | **đã sửa** (§4 #2) |
| Việc có "ban chết" (Hạ độc, Đẩy xuống hồ…) | bậc luôn "Liều", Mất "ban chết" | bậc thật `oPoison`…; `deathSentence`: năm đầu tha một lần (giáng 1 bậc, cấm túc 3 tháng, Danh −10, Sủng −10), Hoàng thượng nhân từ 30 phần trăm đày lãnh cung | **đã sửa**: bậc thật, chữ theo `deathSentence` |
| Số quan hệ trên mọi thẻ | số gốc | nhân theo nết (`persF`), `relAdd` thêm oán 0,6× | **đã sửa** (§4 #3) |
| Thỉnh an Hoàng hậu / Xin Thái hậu đỡ lời | "+4" / "+5" | +2…+5 / +3 (S.hh và quan hệ Hoàng hậu lệch nhau) | thợ hotfix-thinhan |
| Ly gián, Hạ độc dần, Tố tội thật, Bóc tư tình, Xin Hoàng hậu giáng, Trình Hoàng hậu | bậc thẻ = bậc gieo | các việc này **không qua `odA`**: Sức dưới 30 không làm khó hơn, Quẻ tuần không tính, sai người đi không bị phạt — khác luật chung | ghi để điều phối quyết (đổi sẽ làm khó hơn) |
| Bổng lộc, ghế theo phẩm, ngưỡng sắc phong | — | đọc `BL`, `SEATCAP`, `BAL`/`hhNeed` | đúng (§1) |
| "Chắc chắn" trong vài chữ thẻ (j23 "Xin Thái hậu cho học cùng", j15 Tổng quản "Hỏi chuyện") | chữ "Chắc chắn" trong nguồn | VANPHONG cấm; kitParse bỏ chữ ấy khi vẽ | đúng trên màn hình |

## 10. Đề bạt kẻ hầu (owner) — jaudit §4, số trong `BAL.db*`

- Nút "Đề bạt lên <bậc>" trên thẻ kẻ hầu của ngươi (nhóm Thưởng phạt). Cần: phẩm ngươi cho phép bậc ấy (`srkMax`), Lòng ≥ `BAL.dbLoyal` 55, Công lao ≥ `BAL.dbMerit` 3. Tốn: Bạc `BAL.dbCost[bậc]` (20/40/80/120, lót tay Nội vụ phủ) + 1 khắc. Được: lên bậc, Lòng +8, tác dụng thật của bậc (sai việc dễ hơn 3 mỗi bậc; Chưởng sự cô cô mở "tra xét cung nữ"; thái giám bậc ≥ 3 giúp được chọn đêm +4). Mất: hỏng thì mất bạc, Lòng −2. Kèm: kẻ hầu khác cùng cung Lòng −3; từ bậc 2 tiền thưởng hằng tháng. Cơ may: 70 + (Lòng−50)/5 + (Công lao−3)×2 − (bậc−1)×8.
- NPC: cùng luật, theo động cơ (kẻ hầu lòng ≥ 70, đủ điều kiện, chủ đủ gấp đôi bạc; mỗi tháng 15 phần trăm).
- Thị vệ: không phải kẻ hầu của cung nào (là nam nhân trong cung, `MROLES` j22), nên không có bậc để đề bạt.

## 11. Số lệch để điều phối quyết (không tự đổi cân bằng lớn)

- Dò la một công thức (BAL.spyBase 58): bình quân cơ may (mọi cặp phi tần, kẻ hầu thật) trên hai ván mới: ngươi 50 → 46 và 37 → 33; NPC 55,6 → 57 và 46,1 → 51,5; cung nữ dò la ở tẩm cung 67 → 61 và 61 → 47 (cũ chỉ tính Lòng, nay có phạt sai người đi và yếu tố người bị dò). Bình quân gộp theo số cặp: 46,6 → 49,6. Nếu muốn cung nữ giữ mức cũ: giảm `BAL.spySent` (12) hoặc tăng `spyBase` — để điều phối quyết. Khoảng cách theo người bị dò nay rộng hơn (Hoàng hậu đa nghi, nhiều thái giám: khó hơn 1–2 bậc; cung nữ quen người bên ấy: dễ hơn 1 bậc).
- Đề bạt là việc mới: kẻ hầu lên bậc sớm hơn `servRanks` (trước chỉ theo công lao); NPC dùng 15 phần trăm mỗi tháng.
- "Hỏi han sức khỏe": +4 giảm dần → +2/+1, thêm biết bệnh.
- Các việc không qua `odA` (§9) — đổi thì khó hơn.

## 12. Kết quả chạy và bảng mọi nút

| Lần chạy | Bản | Trạng thái | Nút/lựa chọn | Lần bấm | ĐÚNG | SAI | HIỆU ỨNG ẨN | TRỐNG / TRỐNG? | Lỗi trang |
|---|---|---|---|---|---|---|---|---|---|
| Đầu (trước sửa) | main c5b93e63f | dau (+ một phần toi) | 291 | 743 | 213 | 46 | 13 | 1 / 18 | 0 |
| Sau sửa (đợt 1) | review/act-audit (trước các sửa §12-§17 cuối) | dau, toi, cao, con, hh | 837 | 2405 | 626 | 78* | 103* | 2 / 28 | 0 |
| Kiểm lại | review/act-audit mới nhất | dau (đến Dư đồ Càn Ninh) | 143 | 356 | 118 | 11 | 3 | 1 / 10 | 0 |

\* Đợt 1 bao 5 trạng thái nên nhiều nút hơn. Phần lớn SAI/ẨN còn lại của đợt 1 đã sửa sau đó (việc hại tại Dư đồ, "thù/thân" → số thật, Sủng qua `sg`, Bái kiến) hoặc là **báo nhầm của bộ chấm** (đã kiểm tay):
- "Mua chuộc cung nữ: Bạc −40 mà thật −10": đúng (−40 rồi trộm được +30).
- "Phạt vô cớ: kẻ hầu khác −5 mà −25": đúng (−25 là của người bị phạt, đã ghi ở Tốn).
- Các lần "trạng thái toi: không có thẻ kết quả": lỗi của bộ chạy (thử tay buổi tối: thẻ kết quả hiện đủ, BẤT LỢI/THÀNH đúng).
- "Cài người vào cung khác › …: kẻ hầu mất khỏi cung": đúng nghĩa việc.
- Khi mọi lần gieo bị ép "thành", rủi ro phụ (bị phát giác, kẻ hầu bị bắt) cũng nổ: bộ chấm tính đó là kết quả hỏng.

Còn mở (ghi để điều phối):
- Thỉnh an Hoàng hậu / Xin Thái hậu đỡ lời: số "Hoàng hậu quý ngươi" (S.hh và quan hệ Hoàng hậu lệch nhau) — thợ hotfix-thinhan.
- Học với thầy: "thầy kể một sở thích của Hoàng thượng hoặc chuyện của một phi tần" — có lần không cho tin gì (j23); cần chủ của Tài nghệ xem.
- Phe phái › Biếu quà, gửi thư cho quan: ngoài "thiện cảm +20" của quan còn làm Hoàng hậu (nhà đối địch) thiện cảm −5 — ẩn (j55).
- Phe phái › Dò la nhà ngoại phi tần: người bị dò oán ta +7…+22 — ẩn (j55).
- Đến cung nàng thăm › Lẻn vào (hỏng): cấm túc — ẩn; Đợi sáng mai (Qua đêm): Sủng −1, mọi phi tần ghen −1 — ẩn (j77).
- Ban thưởng / Khất bổng lộc / Ân xá (quyền Hoàng hậu): Danh nàng +3, thiện cảm cả cung, Đức +2 — ẩn (j8 `empAct`).
- Lục rương tìm chứng cứ (bị bắt gặp): ngoài "thiện cảm −15" còn oán ta +9…+20.
- Ly gián, Hạ độc dần, Tố tội thật, Bóc tư tình, Xin Hoàng hậu giáng, Trình Hoàng hậu không qua `odA` (§9).

Bảng mọi nút (đợt 1, sau sửa; một dòng một nút theo chỗ; "Vì sao" ghi trạng thái:lần):
| Chỗ | Nút | Kết luận | Vì sao (trạng thái:lần) |
|---|---|---|---|
| Hành sự | Người lạTranh sủng | ĐÚNG |  |
| Hành sự | Người lạChặn ngự giá | ĐÚNG |  |
| Hành sự | Thỉnh an Thái hậu | ĐÚNG |  |
| Hành sự | Hoàng hậuThỉnh an Hoàng hậu | ĐÚNG |  |
| Hành sự | Hối lộ Kính sự phòng | ĐÚNG |  |
| Hành sự | Giả bệnh | ĐÚNG |  |
| Hành sự | Dưỡng nhan | ĐÚNG |  |
| Hành sự | Cài tai mắt | ĐÚNG |  |
| Hành sự | Thêu khăn bán ra ngoài | ĐÚNG |  |
| Hành sự | Dâng canh ở ngự thư phòng | ĐÚNG |  |
| Hành sự | Cầu tự ở Phụng Tiên điện | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Đến cung nàng thăm | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Sai tai mắt dò nơi ở | TRỐNG? |  |
| Hậu cung · thẻ phi tần | Mời đến cung ta | TRỐNG? | thẻ ghi «nàng từ chối, thiện cảm -3» mà không đổi gì (hỏng) [cao:lose,con:lose,dau:lose] |
| Hậu cung · thẻ phi tần | Kết giao | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Tặng quà | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Tố giác | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Tố tội thật | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Bóc chuyện tư tình | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Trình Thái hậu | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Trình Hoàng hậu | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Uy hiếp đòi bạc | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Bán cho phe khác | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Trả chứng cứ lấy lòng | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Tung tin đồn | SAI | thẻ ghi «Danh nàng -8, Chủ tin với Tiểu Phúc Tử +3» mà không đổi gì (thành) [toi:win] |
| Hậu cung · thẻ phi tần | Dò la | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Ngáng chân | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10, Danh +3, Tâm cơ +2, Chủ tin với T» mà không đổi gì (thành) [toi:win] |
| Hậu cung · thẻ phi tần | Cài đồ vào rương | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Rút thẻ bài | SAI | thẻ ghi «2 tuần nàng không được lật thẻ, Chủ tin với Tiểu Phúc Tử +3» mà không đổi gì (thành) [toi:win] |
| Hậu cung · thẻ phi tần | Mua chuộc cung nữ | SAI | thẻ ghi «Bạc -40» mà đổi S.bac -10 [cao:win,con:win,dau:win] | thẻ ghi «moi được mưu kế (chứng cứ +2) hoặc trộm bạc của nàng» mà không đổi gì (thành) [toi:win] | thẻ ghi «Chủ tin với Tiểu Phúc Tử +3» mà không đổi gì (thành) [toi:win] |
| Hậu cung · thẻ phi tần | Tố vượt phẩm | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Tranh sủng | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Chặn ngự giá | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Ly gián | HIỆU ỨNG ẨN | ẩn nhỏ: kẻ hầu được sai đi xong việc, Chủ tin +3 [cao:lose,con:lose,dau:lose] |
| Hậu cung · thẻ phi tần | Xin Hoàng hậu giáng | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Hạ độc | SAI | ẩn: S.sung -8 [dau:lose,toi:lose] | ẩn: S.danh -8 [dau:lose] | thẻ ghi «nàng trúng độc, Chủ tin với Tiểu Phúc Tử +3» mà không đổi gì (thành) [toi:win] | ẩn: S.danh -10 [toi:lose] |
| Hậu cung · thẻ phi tần | Đẩy xuống hồ sen | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Bỏ xạ hương | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Mua chuộc bà đỡ | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Hạ độc dần | SAI | ẩn nhỏ: kẻ hầu được sai đi xong việc, Chủ tin +3 [cao:lose,con:lose,dau:lose] | thẻ ghi «nàng Sức -25, ốm 3 tháng (Sủng -4 mỗi tháng» mà không đổi gì (thành) [toi:win] |
| Hậu cung · thẻ phi tần | Hỏi người hầu: đó là ai? | TRỐNG? |  |
| Hậu cung · thẻ phi tần | Đến cung nàng thăm › Bái kiến Quý phi rồi vào | SAI | thẻ ghi «thiện cảm Ca +2» mà không đổi gì (thành) [dau:win] | ẩn: rv.Lâm Thanh Ca.aff +3 [dau:lose,dau:win] | ẩn: rv.Lâm Thanh Ca.myaff +2 [dau:lose,dau:win] | thẻ kết quả: "không đổi gì" mà có đổi: rv.Lâm Thanh Ca.aff, rv.Lâm Thanh Ca.myaff [dau:lose,dau:win] |
| Hậu cung · thẻ phi tần | Đến cung nàng thăm › Vào thẳng, không bái kiến | SAI | ẩn: rv.Lâm Thanh Ca.aff -2 [dau:lose,dau:win] | ẩn: rv.Lâm Thanh Ca.myaff -2 [dau:lose,dau:win] | ẩn: rv.Lâm Thanh Ca.oan +1 [dau:lose,dau:win] | thẻ kết quả: "không đổi gì" mà có đổi: rv.Lâm Thanh Ca.aff, rv.Lâm Thanh Ca.myaff, rv.Lâm Thanh Ca.oan [dau:lose,dau:win] |
| Cung nhân | Thêm cung nữ | ĐÚNG |  |
| Cung nhân | Thêm thái giám | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Từ Diễm Thu | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Quý phi ??? | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Phi ??? | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Tần ??? | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Quý nhân ??? | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Thường tại ??? | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Đáp ứng ??? | ĐÚNG |  |
| Cung nhân | Thưởng vô cớ | ĐÚNG |  |
| Cung nhân | Phạt vô cớ | SAI | thẻ ghi «kẻ hầu khác lòng -5» mà đổi staff.Tiểu Hỉ Tử.loyal -25 [dau:win] | thẻ ghi «kẻ hầu khác lòng -5» mà đổi staff.Tiểu Phúc Tử.loyal -25 [toi:win] | thẻ ghi «kẻ hầu khác lòng -5» mà đổi staff.Lão Hỉ Tử.loyal -25 [con:win] |
| Cung nhân | Đề bạt lên Thủ lĩnh thái giám | ĐÚNG |  |
| Cung nhân | Xem người | ĐÚNG |  |
| Cung nhân | Hỏi chuyện | HIỆU ỨNG ẨN | ẩn: staff.Tiểu Thúy 4.tin, staff.Hồng Liên 2.tin [cao:win] |
| Cung nhân | Tiến cử | HIỆU ỨNG ẨN | ẩn nhỏ: kẻ hầu được sai đi xong việc, Chủ tin +8 [cao:win,con:win,dau:win] |
| Cung nhân | Đổi người | ĐÚNG |  |
| Tư trang | Nhờ thái giám mua đồ | ĐÚNG |  |
| Tư trang | Nhờ thái giám mua đồ › Nghiên mực Đoan Khê | ĐÚNG |  |
| Tư trang | Nhờ thái giám mua đồ › Đàn cổ Tiêu Vĩ | ĐÚNG |  |
| Tư trang | Nhờ thái giám mua đồ › Lụa Hàng Châu | ĐÚNG |  |
| Tư trang | Nhờ thái giám mua đồ › Bộ diêu vàng | ĐÚNG |  |
| Tư trang | Nhờ thái giám mua đồ › Tranh cổ | ĐÚNG |  |
| Tư trang | Nhờ thái giám mua đồ › Vòng ngọc Hòa Điền | ĐÚNG |  |
| Tư trang | Nhờ thái giám mua đồ › Hạc đỉnh hồng | ĐÚNG |  |
| Tư trang | Kiểm tra đồ | TRỐNG? |  |
| Tài nghệ | Tự học | TRỐNG |  |
| Tài nghệ | Học với thầy | SAI | thẻ ghi «thầy kể một sở thích của Hoàng thượng hoặc chuyện của một ph» mà không đổi gì (thành) [cao:win,con:win,dau:win] |
| Tài nghệ | Xin Thái hậu cho học cùng | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Tâm sự | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la › Hoàng hậu Từ Diễm Thu | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la › Quý phi ở Cảnh Phúc cung (chưa quen) · đang nhắm | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la › Phi ở Khải Tường cung (chưa quen) | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la › Phi ở Chung Tú cung (chưa quen) | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la › Tần ở Hàm An cung (chưa quen) | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la › Tần ở Thừa Minh cung (chưa quen) | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la › Quý nhân ở thiên điện của Quý nhân ??? (chưa quen) | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la › Thường tại ở thiên điện của Thường tại ??? (chưa quen) | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la › Đáp ứng ở thiên điện của Tống Cẩm Tú (chưa quen) | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la › Đáp ứng ở thiên điện của Đáp ứng ??? (chưa quen) | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Nghe ngóng chung | TRỐNG? |  |
| Dư đồ · Hoàng hậu Từ Diễm Thu | Chào hỏi | TRỐNG? |  |
| Dư đồ · Hoàng hậu Từ Diễm Thu | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Hoàng hậu Từ Diễm Thu | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Hoàng hậu Từ Diễm Thu | Thỉnh an | ĐÚNG |  |
| Dư đồ · Hoàng hậu Từ Diễm Thu | Xin Hoàng hậu che chở | ĐÚNG |  |
| Dư đồ · Hoàng hậu Từ Diễm Thu | Khiêu khích | ĐÚNG |  |
| Dư đồ · Diệp Hồng Diệp | Chào hỏi | TRỐNG? |  |
| Dư đồ · Diệp Hồng Diệp | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Diệp Hồng Diệp | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Diệp Hồng Diệp | Bàn tán về Từ Diễm Thu | ĐÚNG |  |
| Dư đồ · Diệp Hồng Diệp | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Diệp Hồng Diệp | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Diệp Hồng Diệp | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Diệp Hồng Diệp | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Diệp Hồng Diệp | Tặng quà | ĐÚNG |  |
| Dư đồ · Diệp Hồng Diệp | Khiêu khích | ĐÚNG |  |
| Dư đồ · Diệp Hồng Diệp | Dò la | ĐÚNG |  |
| Dư đồ · Diệp Hồng Diệp | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Diệp Hồng Diệp | Đẩy nàng xuống hồ sen | ĐÚNG |  |
| Dư đồ · Diệp Hồng Diệp | Ngáng chân nàng | ĐÚNG |  |
| Dư đồ · Diệp Hồng Diệp | Vu oan | ĐÚNG |  |
| Dư đồ · Diệp Hồng Diệp | Nghe lén câu chuyện | ĐÚNG |  |
| Dư đồ · ??? | Chào hỏi | TRỐNG? |  |
| Dư đồ · ??? | Chào hỏi đúng lễ | ĐÚNG |  |
| Dư đồ · ??? | Liếc mắt đưa tình | ĐÚNG |  |
| Dư đồ · Hạ Vân | Tâm sự | ĐÚNG |  |
| Dư đồ · Hạ Vân | Sai đi dò la | ĐÚNG |  |
| Dư đồ · Hạ Vân | Sai đi dò la › Hoàng hậu Từ Diễm Thu | ĐÚNG |  |
| Dư đồ · Hạ Vân | Sai đi dò la › Quý phi ở Cảnh Phúc cung (chưa quen) · đang nhắm | ĐÚNG |  |
| Dư đồ · Hạ Vân | Sai đi dò la › Phi ở Khải Tường cung (chưa quen) | ĐÚNG |  |
| Dư đồ · Hạ Vân | Sai đi dò la › Phi ở Chung Tú cung (chưa quen) | ĐÚNG |  |
| Dư đồ · Hạ Vân | Sai đi dò la › Tần ở Hàm An cung (chưa quen) | ĐÚNG |  |
| Dư đồ · Hạ Vân | Sai đi dò la › Tần ở Thừa Minh cung (chưa quen) | ĐÚNG |  |
| Dư đồ · Hạ Vân | Sai đi dò la › Quý nhân ở thiên điện của Quý nhân ??? (chưa quen) | ĐÚNG |  |
| Dư đồ · Hạ Vân | Sai đi dò la › Thường tại ở thiên điện của Thường tại ??? (chưa quen) | ĐÚNG |  |
| Dư đồ · Hạ Vân | Sai đi dò la › Đáp ứng ở thiên điện của Tống Cẩm Tú (chưa quen) | ĐÚNG |  |
| Dư đồ · Hạ Vân | Sai đi dò la › Đáp ứng ở thiên điện của Đáp ứng ??? (chưa quen) | ĐÚNG |  |
| Dư đồ · Hạ Vân | Nghe ngóng chung | TRỐNG? |  |
| Dư đồ · Thái hậu | Hành lễ | TRỐNG? |  |
| Dư đồ · Thái hậu | Thỉnh an, chép kinh | ĐÚNG |  |
| Dư đồ · Thái hậu | Xin Thái hậu đỡ lời | ĐÚNG |  |
| Dư đồ · Thái hậu | Kể tội một phi tần | ĐÚNG |  |
| Dư đồ · Thượng Quan Lan Chi | Chào hỏi | TRỐNG? |  |
| Dư đồ · Thượng Quan Lan Chi | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Thượng Quan Lan Chi | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Thượng Quan Lan Chi | Bàn tán về Từ Diễm Thu | ĐÚNG |  |
| Dư đồ · Thượng Quan Lan Chi | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Thượng Quan Lan Chi | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Thượng Quan Lan Chi | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Thượng Quan Lan Chi | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Thượng Quan Lan Chi | Tặng quà | ĐÚNG |  |
| Dư đồ · Thượng Quan Lan Chi | Khiêu khích | ĐÚNG |  |
| Dư đồ · Thượng Quan Lan Chi | Dò la | ĐÚNG |  |
| Dư đồ · Thượng Quan Lan Chi | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Thượng Quan Lan Chi | Bỏ độc vào trà nàng | ĐÚNG |  |
| Dư đồ · Thượng Quan Lan Chi | Ngáng chân nàng | ĐÚNG |  |
| Dư đồ · Thượng Quan Lan Chi | Vu oan | ĐÚNG |  |
| Dư đồ · Vân Tuyết Dao | Chào hỏi | TRỐNG? |  |
| Dư đồ · Vân Tuyết Dao | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Vân Tuyết Dao | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Vân Tuyết Dao | Bàn tán về Từ Diễm Thu | ĐÚNG |  |
| Dư đồ · Vân Tuyết Dao | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Vân Tuyết Dao | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Vân Tuyết Dao | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Vân Tuyết Dao | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Vân Tuyết Dao | Tặng quà | ĐÚNG |  |
| Dư đồ · Vân Tuyết Dao | Khiêu khích | ĐÚNG |  |
| Dư đồ · Vân Tuyết Dao | Dò la | ĐÚNG |  |
| Dư đồ · Vân Tuyết Dao | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Vân Tuyết Dao | Bỏ độc vào trà nàng | ĐÚNG |  |
| Dư đồ · Vân Tuyết Dao | Ngáng chân nàng | ĐÚNG |  |
| Dư đồ · Vân Tuyết Dao | Vu oan | ĐÚNG |  |
| Dư đồ · Vân Tuyết Dao | Nghe lén câu chuyện | ĐÚNG |  |
| Dư đồ · Khương Băng Tâm | Chào hỏi | TRỐNG? |  |
| Dư đồ · Khương Băng Tâm | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Khương Băng Tâm | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Khương Băng Tâm | Bàn tán về Từ Diễm Thu | ĐÚNG |  |
| Dư đồ · Khương Băng Tâm | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Khương Băng Tâm | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Khương Băng Tâm | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Khương Băng Tâm | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Khương Băng Tâm | Tặng quà | ĐÚNG |  |
| Dư đồ · Khương Băng Tâm | Khiêu khích | ĐÚNG |  |
| Dư đồ · Khương Băng Tâm | Dò la | ĐÚNG |  |
| Dư đồ · Khương Băng Tâm | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Khương Băng Tâm | Bỏ độc vào trà nàng | ĐÚNG |  |
| Dư đồ · Khương Băng Tâm | Ngáng chân nàng | ĐÚNG |  |
| Dư đồ · Khương Băng Tâm | Vu oan | ĐÚNG |  |
| Dư đồ · Khương Băng Tâm | Nghe lén câu chuyện | ĐÚNG |  |
| Dư đồ · Bạch Vân Thường | Chào hỏi | TRỐNG? |  |
| Dư đồ · Bạch Vân Thường | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Bạch Vân Thường | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Bạch Vân Thường | Bàn tán về Từ Diễm Thu | ĐÚNG |  |
| Dư đồ · Bạch Vân Thường | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Bạch Vân Thường | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Bạch Vân Thường | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Bạch Vân Thường | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Bạch Vân Thường | Tặng quà | ĐÚNG |  |
| Dư đồ · Bạch Vân Thường | Khiêu khích | ĐÚNG |  |
| Dư đồ · Bạch Vân Thường | Dò la | ĐÚNG |  |
| Dư đồ · Bạch Vân Thường | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Bạch Vân Thường | Bỏ độc vào trà nàng | ĐÚNG |  |
| Dư đồ · Bạch Vân Thường | Ngáng chân nàng | ĐÚNG |  |
| Dư đồ · Bạch Vân Thường | Vu oan | ĐÚNG |  |
| Dư đồ · Bạch Vân Thường | Nghe lén câu chuyện | ĐÚNG |  |
| Dư đồ · Rương của Thượng Quan Lan Chi | Cài đồ vào rương nàng | ĐÚNG |  |
| Dư đồ · Rương của Thượng Quan Lan Chi | Lục rương tìm chứng cứ | ĐÚNG |  |
| Dư đồ · Rương của Vân Tuyết Dao | Cài đồ vào rương nàng | ĐÚNG |  |
| Dư đồ · Rương của Vân Tuyết Dao | Lục rương tìm chứng cứ | SAI | ẩn: staff.Tiểu Hỉ Tử.tin [dau:win] | thẻ ghi «cung nhân của Phi Vân Tuyết Dao bắt gặp: nàng thiện cảm -15,» mà đổi rv.Vân Tuyết Dao.oan +13 [dau:lose] |
| Dư đồ · Tạ Tịch Nhan | Chào hỏi | TRỐNG? |  |
| Dư đồ · Tạ Tịch Nhan | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Tạ Tịch Nhan | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Tạ Tịch Nhan | Bàn tán về Từ Diễm Thu | ĐÚNG |  |
| Dư đồ · Tạ Tịch Nhan | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Tạ Tịch Nhan | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Tạ Tịch Nhan | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Tạ Tịch Nhan | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Tạ Tịch Nhan | Tặng quà | ĐÚNG |  |
| Dư đồ · Tạ Tịch Nhan | Khiêu khích | ĐÚNG |  |
| Dư đồ · Tạ Tịch Nhan | Dò la | ĐÚNG |  |
| Dư đồ · Tạ Tịch Nhan | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Tạ Tịch Nhan | Ngáng chân nàng | ĐÚNG |  |
| Dư đồ · Tạ Tịch Nhan | Vu oan | ĐÚNG |  |
| Dư đồ · Thái y Trương | Chào hỏi | TRỐNG? |  |
| Dư đồ · Thái y Trương | Bài thuốc dễ thụ thai | ĐÚNG |  |
| Dư đồ · Thái y Trương | Mời làm thái y tâm phúc | ĐÚNG |  |
| Dư đồ · Thái y Trương | Học hỏi y lý | ĐÚNG |  |
| Dư đồ · Tổng quản | Chào hỏi | TRỐNG? |  |
| Dư đồ · Tổng quản | Đút lót lật thẻ | ĐÚNG |  |
| Dư đồ · Tổng quản | Hỏi sở thích Hoàng thượng | ĐÚNG |  |
| Dư đồ · Tổng quản | Xem sổ thị tẩm | TRỐNG? |  |
| Dư đồ · Phế phi họ Lý | Đưa cơm áo | ĐÚNG |  |
| Dư đồ · Phế phi họ Lý | Hỏi chuyện cũ | HIỆU ỨNG ẨN | ẩn: staff.Tiểu Hỉ Tử.tin [dau:win] | ẩn: staff.Lão Thuận Tử.tin, staff.Tiểu Thúy 4.tin, staff.Hồng Liên 2.tin [cao:win] | ẩn: staff.Lão Hỉ Tử.tin [con:win] | ẩn: staff.Tiểu Trung Tử.tin, staff.Lam Ngọc.tin, staff.Ngân Hạnh.tin, staff.Hạ Vân.tin [hh:win] |
| Hành sự | Tranh sủng | ĐÚNG |  |
| Hành sự | Tranh sủng › Tắm cánh hoa, xông hương | ĐÚNG |  |
| Hành sự | Tranh sủng › Điểm trang lộng lẫy | ĐÚNG |  |
| Hành sự | Tranh sủng › Tập trước giọng hát | ĐÚNG |  |
| Hành sự | Tranh sủng › Để mộc, tự nhiên | ĐÚNG |  |
| Hành sự | Chặn ngự giá | ĐÚNG |  |
| Hành sự | Chặn ngự giá › Tắm cánh hoa, xông hương | ĐÚNG |  |
| Hành sự | Chặn ngự giá › Điểm trang lộng lẫy | ĐÚNG |  |
| Hành sự | Chặn ngự giá › Tập trước giọng hát | ĐÚNG |  |
| Hành sự | Chặn ngự giá › Để mộc, tự nhiên | ĐÚNG |  |
| Hành sự | Thỉnh an Hoàng hậu | SAI | thẻ ghi «Hoàng hậu quý ngươi +4» mà đổi S.hh +2 [con:win] |
| Hậu cung · thẻ phi tần | Đến cung nàng thăm › Xin bái kiến | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Đến cung nàng thăm › Lẻn vào | HIỆU ỨNG ẨN | ẩn: S.confined +1 [toi:lose] |
| Hậu cung · thẻ phi tần | Đến cung nàng thăm › Đợi sáng mai (Qua đêm) | HIỆU ỨNG ẨN | ẩn: S.sung -1 [toi:lose,toi:win] | ẩn: rv.HH Chu Linh Lung.ghen -1, rv.Tạ Tú Uyển.ghen -1, rv.Từ Tịch Nhan.ghen -1, rv.Đoan Mộc Vân Khanh.ghen -1, rv.Đường Ngọc Dao.ghen -1, rv.Mộ Dung Vân Thường.ghen -1, rv.Thượng Quan Băng Tâm.ghen -1, rv.Kiều Thanh Liên.ghen -1, rv.Hoa Thủy Tiên.ghen -1, rv.Cố Dao Cầm.ghen -1, rv.Tống Tử Yên.ghen -1, rv.Tô Bích Dao.ghen -1, rv.Hạ Hồng Diệp.ghen [toi:win] | ẩn: rv.HH Chu Linh Lung.suc +18, rv.Tạ Tú Uyển.suc +18, rv.Từ Tịch Nhan.suc +18, rv.Đoan Mộc Vân Khanh.suc +18, rv.Đường Ngọc Dao.suc +18, rv.Mộ Dung Vân Thường.suc +18, rv.Thượng Quan Băng Tâm.suc +18, rv.Kiều Thanh Liên.suc +18, rv.Hoa Thủy Tiên.suc +18, rv.Cố Dao Cầm.suc +18, rv.Tống Tử Yên.suc +18, rv.Tô Bích Dao.suc +18, rv.Hạ Hồng Diệp.suc [toi:win] | ẩn: rv.Từ Tịch Nhan.sung +3, rv.Đoan Mộc Vân Khanh.sung -1, rv.Đường Ngọc Dao.sung +1, rv.Mộ Dung Vân Thường.sung -1, rv.Thượng Quan Băng Tâm.sung +1, rv.Hoa Thủy Tiên.sung +3, rv.Cố Dao Cầm.sung +1, rv.Tống Tử Yên.sung -3, rv.Tô Bích Dao.sung +11, rv.Hạ Hồng Diệp.sung [toi:win] |
| Cung nhân | Cài người vào cung khác › Chu Linh Lung | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Tạ Tú Uyển | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Từ Tịch Nhan | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Đoan Mộc Vân Khanh | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Đường Ngọc Dao | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Mộ Dung Vân Thường | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Thượng Quan Băng Tâm | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Kiều Thanh Liên | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Hoa Thủy Tiên | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Cố Dao Cầm | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Tống Tử Yên | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Tô Bích Dao | ĐÚNG |  |
| Tư trang | Nhờ thái giám mua đồ › Yến sào | ĐÚNG |  |
| Tư trang | Nhờ thái giám mua đồ › Nhân sâm trăm năm | ĐÚNG |  |
| Tư trang | Nhờ thái giám mua đồ › Đệm gấm | ĐÚNG |  |
| Tư trang | Nhờ thái giám mua đồ › Thuốc giải độc | ĐÚNG |  |
| Tư trang | Nhờ thái giám mua đồ › Vòng vàng chạm phượng | ĐÚNG |  |
| Phe phái | Nhờ cha dâng sớ | SAI | thẻ ghi «Sủng +2» mà đổi S.sung +1 [toi:win] |
| Phe phái | Dò la nhà ngoại phi tần | ĐÚNG |  |
| Phe phái | Dò la nhà ngoại phi tần › Chu Linh Lung (nhà Tể tướng) | HIỆU ỨNG ẨN | ẩn: rv.HH Chu Linh Lung.oan +16 [toi:win] |
| Phe phái | Dò la nhà ngoại phi tần › Tạ Tú Uyển (nhà Hộ bộ) | HIỆU ỨNG ẨN | ẩn: rv.Tạ Tú Uyển.oan +13 [toi:win] |
| Phe phái | Dò la nhà ngoại phi tần › Từ Tịch Nhan (nhà Đại tướng quân) | HIỆU ỨNG ẨN | ẩn: rv.Từ Tịch Nhan.oan +21 [toi:win] |
| Phe phái | Dò la nhà ngoại phi tần › Đoan Mộc Vân Khanh (nhà Hộ bộ) | HIỆU ỨNG ẨN | ẩn: rv.Đoan Mộc Vân Khanh.oan +22 [toi:win] |
| Phe phái | Dò la nhà ngoại phi tần › Đường Ngọc Dao (nhà Lễ bộ) | HIỆU ỨNG ẨN | ẩn: rv.Đường Ngọc Dao.oan +16 [toi:win] |
| Phe phái | Dò la nhà ngoại phi tần › Mộ Dung Vân Thường (nhà Lễ bộ) | HIỆU ỨNG ẨN | ẩn: rv.Mộ Dung Vân Thường.oan +9 [toi:win] |
| Phe phái | Dò la nhà ngoại phi tần › Thượng Quan Băng Tâm (nhà Hàn lâm) | HIỆU ỨNG ẨN | ẩn: rv.Thượng Quan Băng Tâm.oan +7 [toi:win] |
| Phe phái | Dò la nhà ngoại phi tần › Kiều Thanh Liên (nhà Đại tướng quân) | HIỆU ỨNG ẨN | ẩn: rv.Kiều Thanh Liên.oan +13 [toi:win] |
| Phe phái | Tung chứng cứ tham ô | ĐÚNG |  |
| Phe phái | Biếu quà, gửi thư cho Hàn Kính Chi | SAI | thẻ ghi «thiện cảm +20» mà đổi ngược chiều: rv.HH Chu Linh Lung.aff -5 [toi:win] |
| Phe phái | Biếu quà, gửi thư cho Tần Lục Trường | SAI | thẻ ghi «thiện cảm +20» mà đổi ngược chiều: rv.HH Chu Linh Lung.aff -5 [toi:win] |
| Phe phái | Biếu quà, gửi thư cho Khương Thừa Chí | SAI | thẻ ghi «thiện cảm +20» mà đổi ngược chiều: rv.HH Chu Linh Lung.aff -5 [toi:win] |
| Phe phái | Biếu quà, gửi thư cho Vân Bá Ngôn | SAI | thẻ ghi «thiện cảm +20» mà đổi ngược chiều: rv.HH Chu Linh Lung.aff -5 [toi:win] |
| Tẩm cung · Tiểu Thúy | Tâm sự | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la › Hoàng hậu Chu Linh Lung | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la › Quý phi Tạ Tú Uyển · đang nhắm | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la › Phi Từ Tịch Nhan | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la › Phi Đoan Mộc Vân Khanh | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la › Tần Đường Ngọc Dao | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la › Tần Mộ Dung Vân Thường | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la › Quý nhân Thượng Quan Băng Tâm | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la › Quý nhân Kiều Thanh Liên | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la › Thường tại Hoa Thủy Tiên | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la › Thường tại Cố Dao Cầm | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la › Đáp ứng Tống Tử Yên | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la › Đáp ứng Tô Bích Dao | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Nghe ngóng chung | TRỐNG? |  |
| Dư đồ · Tiểu Thúy | Tâm sự | ĐÚNG |  |
| Dư đồ · Tiểu Thúy | Sai đi dò la | ĐÚNG |  |
| Dư đồ · Tiểu Thúy | Sai đi dò la › Hoàng hậu Chu Linh Lung | ĐÚNG |  |
| Hành sự | Giả mang thai | ĐÚNG |  |
| Hành sự | Múa trong yến tiệc | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Phá việc học | SAI | thẻ ghi «oán ngươi +20» mà đổi rv.HH Hoa Lạc Anh.oan +10 [cao:lose] | ẩn: S.confined +2 [cao:lose] |
| Hậu cung · thẻ phi tần | Hạ độc con nàng | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Đẩy con nàng xuống hồ | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Hoa Lạc Anh | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Mộ Dung Tú Uyển | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Ôn Tịch Nhan | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Phùng Nguyệt Hoa | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Âu Dương Tử Yên | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Cố Nhược Lan | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Vân Phương Hoa | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Thượng Quan Hồng Diệp | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Đoan Mộc Tuyết Dao | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Tạ Linh Lung | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Từ Mộng Điệp | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Thẩm Dao Cầm | ĐÚNG |  |
| Cung nhân | Hỏi người hầu: đó là ai? | TRỐNG? |  |
| Cung nhân | Đề bạt lên Đại cung nữ | ĐÚNG |  |
| Tư trang | Nhờ thái giám mua đồ › Trâm ngọc bích | ĐÚNG |  |
| Tư trang | Nhờ thái giám mua đồ › Túi thơm thêu | ĐÚNG |  |
| Tư trang | Nhờ thái giám mua đồ › Son phấn Dương Châu | ĐÚNG |  |
| Tư trang | Nhờ thái giám mua đồ › Hương trầm | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la › Hoàng hậu Hoa Lạc Anh | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la › Quý phi Mộ Dung Tú Uyển · đang nhắm | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la › Phi Ôn Tịch Nhan | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la › Phi Phùng Nguyệt Hoa | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la › Tần Âu Dương Tử Yên | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la › Tần Cố Nhược Lan | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la › Quý nhân Vân Phương Hoa | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la › Quý nhân Thượng Quan Hồng Diệp | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la › Thường tại Đoan Mộc Tuyết Dao | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la › Thường tại Tạ Linh Lung | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la › Đáp ứng Từ Mộng Điệp | ĐÚNG |  |
| Tẩm cung · Tiểu Thúy | Sai đi dò la › Đáp ứng Thẩm Dao Cầm | ĐÚNG |  |
| Dư đồ · Hoàng hậu Hoa Lạc Anh | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Hoàng hậu Hoa Lạc Anh | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Hoàng hậu Hoa Lạc Anh | Thỉnh an | ĐÚNG |  |
| Dư đồ · Hoàng hậu Hoa Lạc Anh | Xin Hoàng hậu che chở | ĐÚNG |  |
| Dư đồ · Hoàng hậu Hoa Lạc Anh | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.HH Hoa Lạc Anh.oan +5 [cao:win] |
| Dư đồ · Tạ Linh Lung | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Tạ Linh Lung | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Tạ Linh Lung | Bàn tán về Hoa Lạc Anh | ĐÚNG |  |
| Dư đồ · Tạ Linh Lung | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Tạ Linh Lung | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Tạ Linh Lung | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Tạ Linh Lung | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Tạ Linh Lung | Tặng quà | ĐÚNG |  |
| Dư đồ · Tạ Linh Lung | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.Tạ Linh Lung.aff -15 [cao:win] |
| Dư đồ · Tạ Linh Lung | Dò la | SAI | ẩn: S.bac -15 [cao:lose,cao:win] | thẻ ghi «bị lộ, nàng oán ngươi +8» mà đổi rv.Tạ Linh Lung.oan +11 [cao:lose] | ẩn: S.sung +3 [cao:lose] | ẩn: rv.Tạ Linh Lung.aff -8 [cao:lose] |
| Dư đồ · Tạ Linh Lung | Tung tin đồn | HIỆU ỨNG ẨN | ẩn: S.sung +3 [cao:lose] |
| Dư đồ · Tạ Linh Lung | Đẩy nàng xuống hồ sen | HIỆU ỨNG ẨN | ẩn: S.duc -12 [cao:lose,cao:win] | ẩn: rv.Tạ Linh Lung.aff -10 [cao:win] | ẩn: rv.Tạ Linh Lung.myaff -10 [cao:win] | ẩn: S.danh -8 [cao:lose] |
| Dư đồ · Tạ Linh Lung | Ngáng chân nàng | HIỆU ỨNG ẨN | ẩn: S.duc -4 [cao:lose,cao:win] | ẩn: rv.Tạ Linh Lung.aff -6 [cao:win] | ẩn: rv.Tạ Linh Lung.myaff -6 [cao:win] | ẩn: rv.Tạ Linh Lung.aff -12 [cao:lose] |
| Dư đồ · Tạ Linh Lung | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10» mà không đổi gì (thành) [cao:win] | thẻ ghi «Danh +3» mà không đổi gì (thành) [cao:win] | ẩn: S.duc -5 [cao:lose,cao:win] | thẻ ghi «oán ngươi +30» mà đổi rv.Tạ Linh Lung.oan +40 [cao:lose] |
| Dư đồ · Tạ Linh Lung | Nghe lén câu chuyện | ĐÚNG |  |
| Dư đồ · Tiểu Thúy | Sai đi dò la › Hoàng hậu Hoa Lạc Anh | ĐÚNG |  |
| Dư đồ · Tiểu Thúy | Sai đi dò la › A Hoàng hậu Hoa Lạc Anh | ĐÚNG |  |
| Dư đồ · Tiểu Thúy | Sai đi dò la › Quý phi Mộ Dung Tú Uyển · đang nhắm | ĐÚNG |  |
| Dư đồ · Tiểu Thúy | Sai đi dò la › Phi Ôn Tịch Nhan | ĐÚNG |  |
| Dư đồ · Tiểu Thúy | Sai đi dò la › Phi Phùng Nguyệt Hoa | ĐÚNG |  |
| Dư đồ · Tiểu Thúy | Sai đi dò la › Y Tần Âu Dương Tử Yên | ĐÚNG |  |
| Dư đồ · Tiểu Thúy | Sai đi dò la › Tần Âu Dương Tử Yên | ĐÚNG |  |
| Dư đồ · Tiểu Thúy | Sai đi dò la › Tần Cố Nhược Lan | ĐÚNG |  |
| Dư đồ · Tiểu Thúy | Sai đi dò la › Quý nhân Vân Phương Hoa | ĐÚNG |  |
| Dư đồ · Tiểu Thúy | Sai đi dò la › Quý nhân Thượng Quan Hồng Diệp | ĐÚNG |  |
| Dư đồ · Tiểu Thúy | Sai đi dò la › Thường tại Đoan Mộc Tuyết Dao | ĐÚNG |  |
| Dư đồ · Tiểu Thúy | Sai đi dò la › L Thường tại Tạ Linh Lung | ĐÚNG |  |
| Dư đồ · Tiểu Thúy | Sai đi dò la › Thường tại Tạ Linh Lung | ĐÚNG |  |
| Dư đồ · Tiểu Thúy | Sai đi dò la › Đáp ứng Từ Mộng Điệp | ĐÚNG |  |
| Dư đồ · Tiểu Thúy | Sai đi dò la › Đáp ứng Thẩm Dao Cầm | ĐÚNG |  |
| Dư đồ · Tiểu Thúy | Nghe ngóng chung | TRỐNG? |  |
| Dư đồ · Tiểu Thúy | Sai đi dò la › N Phi Ôn Tịch Nhan | ĐÚNG |  |
| Dư đồ · Ôn Tịch Nhan | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Ôn Tịch Nhan | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Ôn Tịch Nhan | Bàn tán về Hoa Lạc Anh | ĐÚNG |  |
| Dư đồ · Ôn Tịch Nhan | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Ôn Tịch Nhan | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Ôn Tịch Nhan | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Ôn Tịch Nhan | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Ôn Tịch Nhan | Tặng quà | ĐÚNG |  |
| Dư đồ · Ôn Tịch Nhan | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.Ôn Tịch Nhan.aff -15 [cao:win] |
| Dư đồ · Ôn Tịch Nhan | Dò la | SAI | ẩn: S.bac -15 [cao:lose,cao:win] | thẻ ghi «bị lộ, nàng oán ngươi +8» mà đổi rv.Ôn Tịch Nhan.oan +3 [cao:lose] | ẩn: rv.Ôn Tịch Nhan.aff -8 [cao:lose] |
| Dư đồ · Ôn Tịch Nhan | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Ôn Tịch Nhan | Bỏ độc vào trà nàng | HIỆU ỨNG ẨN | ẩn: S.duc -10 [cao:lose,cao:win] |
| Dư đồ · Ôn Tịch Nhan | Ngáng chân nàng | HIỆU ỨNG ẨN | ẩn: S.duc -4 [cao:lose,cao:win] | ẩn: rv.Ôn Tịch Nhan.aff -6 [cao:win] | ẩn: rv.Ôn Tịch Nhan.myaff -6 [cao:win] | ẩn: rv.Ôn Tịch Nhan.aff -12 [cao:lose] |
| Dư đồ · Ôn Tịch Nhan | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10» mà không đổi gì (thành) [cao:win] | thẻ ghi «Danh +3» mà không đổi gì (thành) [cao:win] | ẩn: S.duc -5 [cao:lose,cao:win] | thẻ ghi «oán ngươi +30» mà đổi rv.Ôn Tịch Nhan.oan +11 [cao:lose] |
| Dư đồ · Ôn Tịch Nhan | Nghe lén câu chuyện | ĐÚNG |  |
| Dư đồ · Âu Dương Tử Yên | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Âu Dương Tử Yên | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Âu Dương Tử Yên | Bàn tán về Hoa Lạc Anh | ĐÚNG |  |
| Dư đồ · Âu Dương Tử Yên | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Âu Dương Tử Yên | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Âu Dương Tử Yên | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Âu Dương Tử Yên | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Âu Dương Tử Yên | Tặng quà | ĐÚNG |  |
| Dư đồ · Âu Dương Tử Yên | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.Âu Dương Tử Yên.aff -15 [cao:win] |
| Dư đồ · Âu Dương Tử Yên | Dò la | SAI | ẩn: S.bac -15 [cao:lose,cao:win] | thẻ ghi «bị lộ, nàng oán ngươi +8» mà đổi rv.Âu Dương Tử Yên.oan +6 [cao:lose] | ẩn: rv.Âu Dương Tử Yên.aff -8 [cao:lose] |
| Dư đồ · Âu Dương Tử Yên | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Âu Dương Tử Yên | Bỏ độc vào trà nàng | HIỆU ỨNG ẨN | ẩn: S.duc -10 [cao:lose,cao:win] |
| Dư đồ · Âu Dương Tử Yên | Ngáng chân nàng | HIỆU ỨNG ẨN | ẩn: S.duc -4 [cao:lose,cao:win] | ẩn: rv.Âu Dương Tử Yên.aff -6 [cao:win] | ẩn: rv.Âu Dương Tử Yên.myaff -6 [cao:win] | ẩn: rv.Âu Dương Tử Yên.aff -12 [cao:lose] |
| Dư đồ · Âu Dương Tử Yên | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10» mà không đổi gì (thành) [cao:win] | thẻ ghi «Danh +3» mà không đổi gì (thành) [cao:win] | ẩn: S.duc -5 [cao:lose,cao:win] | thẻ ghi «oán ngươi +30» mà đổi rv.Âu Dương Tử Yên.oan +22 [cao:lose] |
| Dư đồ · Âu Dương Tử Yên | Nghe lén câu chuyện | ĐÚNG |  |
| Dư đồ · Cố Nhược Lan | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Cố Nhược Lan | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Cố Nhược Lan | Bàn tán về Hoa Lạc Anh | ĐÚNG |  |
| Dư đồ · Cố Nhược Lan | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Cố Nhược Lan | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Cố Nhược Lan | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Cố Nhược Lan | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Cố Nhược Lan | Tặng quà | ĐÚNG |  |
| Dư đồ · Cố Nhược Lan | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.Cố Nhược Lan.aff -15 [cao:win] |
| Dư đồ · Cố Nhược Lan | Dò la | SAI | ẩn: S.bac -15 [cao:lose,cao:win] | thẻ ghi «bị lộ, nàng oán ngươi +8» mà đổi rv.Cố Nhược Lan.oan +3 [cao:lose] | ẩn: rv.Cố Nhược Lan.aff -8 [cao:lose] |
| Dư đồ · Cố Nhược Lan | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Cố Nhược Lan | Bỏ độc vào trà nàng | HIỆU ỨNG ẨN | ẩn: S.duc -10 [cao:lose,cao:win] |
| Dư đồ · Cố Nhược Lan | Ngáng chân nàng | HIỆU ỨNG ẨN | ẩn: S.duc -4 [cao:lose,cao:win] | ẩn: rv.Cố Nhược Lan.aff -6 [cao:win] | ẩn: rv.Cố Nhược Lan.myaff -6 [cao:win] | ẩn: rv.Cố Nhược Lan.aff -12 [cao:lose] |
| Dư đồ · Cố Nhược Lan | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10» mà không đổi gì (thành) [cao:win] | thẻ ghi «Danh +3» mà không đổi gì (thành) [cao:win] | ẩn: S.duc -5 [cao:lose,cao:win] | thẻ ghi «oán ngươi +30» mà đổi rv.Cố Nhược Lan.oan +12 [cao:lose] |
| Dư đồ · Cố Nhược Lan | Nghe lén câu chuyện | ĐÚNG |  |
| Dư đồ · Vân Phương Hoa | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Vân Phương Hoa | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Vân Phương Hoa | Bàn tán về Hoa Lạc Anh | ĐÚNG |  |
| Dư đồ · Vân Phương Hoa | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Vân Phương Hoa | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Vân Phương Hoa | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Vân Phương Hoa | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Vân Phương Hoa | Tặng quà | ĐÚNG |  |
| Dư đồ · Vân Phương Hoa | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.Vân Phương Hoa.aff -15 [cao:win] |
| Dư đồ · Vân Phương Hoa | Dò la | SAI | ẩn: S.bac -15 [cao:lose,cao:win] | thẻ ghi «bị lộ, nàng oán ngươi +8» mà đổi rv.Vân Phương Hoa.oan +5 [cao:lose] | ẩn: rv.Vân Phương Hoa.aff -8 [cao:lose] |
| Dư đồ · Vân Phương Hoa | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Vân Phương Hoa | Bỏ độc vào trà nàng | HIỆU ỨNG ẨN | ẩn: S.duc -10 [cao:lose,cao:win] |
| Dư đồ · Vân Phương Hoa | Ngáng chân nàng | HIỆU ỨNG ẨN | ẩn: S.duc -4 [cao:lose,cao:win] | ẩn: rv.Vân Phương Hoa.aff -6 [cao:win] | ẩn: rv.Vân Phương Hoa.myaff -6 [cao:win] | ẩn: rv.Vân Phương Hoa.aff -12 [cao:lose] |
| Dư đồ · Vân Phương Hoa | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10» mà không đổi gì (thành) [cao:win] | thẻ ghi «Danh +3» mà không đổi gì (thành) [cao:win] | ẩn: S.duc -5 [cao:lose,cao:win] | thẻ ghi «oán ngươi +30» mà đổi rv.Vân Phương Hoa.oan +20 [cao:lose] |
| Dư đồ · Vân Phương Hoa | Nghe lén câu chuyện | ĐÚNG |  |
| Dư đồ · Thượng Quan Hồng Diệp | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Thượng Quan Hồng Diệp | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Thượng Quan Hồng Diệp | Bàn tán về Hoa Lạc Anh | ĐÚNG |  |
| Dư đồ · Thượng Quan Hồng Diệp | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Thượng Quan Hồng Diệp | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Thượng Quan Hồng Diệp | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Thượng Quan Hồng Diệp | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Thượng Quan Hồng Diệp | Tặng quà | ĐÚNG |  |
| Dư đồ · Thượng Quan Hồng Diệp | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.Thượng Quan Hồng Diệp.aff -15 [cao:win] |
| Dư đồ · Thượng Quan Hồng Diệp | Dò la | SAI | ẩn: S.bac -15 [cao:lose,cao:win] | thẻ ghi «bị lộ, nàng oán ngươi +8» mà đổi rv.Thượng Quan Hồng Diệp.oan +7 [cao:lose] | ẩn: rv.Thượng Quan Hồng Diệp.aff -8 [cao:lose] |
| Dư đồ · Thượng Quan Hồng Diệp | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Thượng Quan Hồng Diệp | Bỏ độc vào trà nàng | HIỆU ỨNG ẨN | ẩn: S.duc -10 [cao:lose,cao:win] |
| Dư đồ · Thượng Quan Hồng Diệp | Ngáng chân nàng | HIỆU ỨNG ẨN | ẩn: S.duc -4 [cao:lose,cao:win] | ẩn: rv.Thượng Quan Hồng Diệp.aff -6 [cao:win] | ẩn: rv.Thượng Quan Hồng Diệp.myaff -6 [cao:win] | ẩn: rv.Thượng Quan Hồng Diệp.aff -12 [cao:lose] |
| Dư đồ · Thượng Quan Hồng Diệp | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10» mà không đổi gì (thành) [cao:win] | thẻ ghi «Danh +3» mà không đổi gì (thành) [cao:win] | ẩn: S.duc -5 [cao:lose,cao:win] | thẻ ghi «oán ngươi +30» mà đổi rv.Thượng Quan Hồng Diệp.oan +26 [cao:lose] |
| Dư đồ · Thượng Quan Hồng Diệp | Nghe lén câu chuyện | ĐÚNG |  |
| Dư đồ · Thẩm Dao Cầm | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Thẩm Dao Cầm | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Thẩm Dao Cầm | Bàn tán về Hoa Lạc Anh | ĐÚNG |  |
| Dư đồ · Thẩm Dao Cầm | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Thẩm Dao Cầm | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Thẩm Dao Cầm | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Thẩm Dao Cầm | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Thẩm Dao Cầm | Tặng quà | ĐÚNG |  |
| Dư đồ · Thẩm Dao Cầm | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.Thẩm Dao Cầm.aff -15 [cao:win] |
| Dư đồ · Thẩm Dao Cầm | Dò la | SAI | ẩn: S.bac -15 [cao:lose,cao:win] | thẻ ghi «bị lộ, nàng oán ngươi +8» mà đổi rv.Thẩm Dao Cầm.oan +3 [cao:lose] | ẩn: rv.Thẩm Dao Cầm.aff -8 [cao:lose] |
| Dư đồ · Thẩm Dao Cầm | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Thẩm Dao Cầm | Bỏ độc vào trà nàng | HIỆU ỨNG ẨN | ẩn: S.duc -10 [cao:lose,cao:win] |
| Dư đồ · Thẩm Dao Cầm | Ngáng chân nàng | HIỆU ỨNG ẨN | ẩn: S.duc -4 [cao:lose,cao:win] | ẩn: rv.Thẩm Dao Cầm.aff -6 [cao:win] | ẩn: rv.Thẩm Dao Cầm.myaff -6 [cao:win] | ẩn: rv.Thẩm Dao Cầm.aff -12 [cao:lose] |
| Dư đồ · Thẩm Dao Cầm | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10» mà không đổi gì (thành) [cao:win] | thẻ ghi «Danh +3» mà không đổi gì (thành) [cao:win] | ẩn: S.duc -5 [cao:lose,cao:win] | thẻ ghi «oán ngươi +30» mà đổi rv.Thẩm Dao Cầm.oan +12 [cao:lose] |
| Dư đồ · Thẩm Dao Cầm | Nghe lén câu chuyện | ĐÚNG |  |
| Dư đồ · Mộ Dung Tú Uyển | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Mộ Dung Tú Uyển | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Mộ Dung Tú Uyển | Bàn tán về Hoa Lạc Anh | ĐÚNG |  |
| Dư đồ · Mộ Dung Tú Uyển | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Mộ Dung Tú Uyển | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Mộ Dung Tú Uyển | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Mộ Dung Tú Uyển | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Mộ Dung Tú Uyển | Tặng quà | ĐÚNG |  |
| Dư đồ · Mộ Dung Tú Uyển | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.Mộ Dung Tú Uyển.aff -15 [cao:win] |
| Dư đồ · Mộ Dung Tú Uyển | Dò la | SAI | ẩn: S.bac -15 [cao:lose,cao:win] | thẻ ghi «bị lộ, nàng oán ngươi +8» mà đổi rv.Mộ Dung Tú Uyển.oan +5 [cao:lose] | ẩn: rv.Mộ Dung Tú Uyển.aff -8 [cao:lose] |
| Dư đồ · Mộ Dung Tú Uyển | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Mộ Dung Tú Uyển | Bỏ độc vào trà nàng | HIỆU ỨNG ẨN | ẩn: S.duc -10 [cao:lose,cao:win] |
| Dư đồ · Mộ Dung Tú Uyển | Ngáng chân nàng | HIỆU ỨNG ẨN | ẩn: S.duc -4 [cao:lose,cao:win] | ẩn: rv.Mộ Dung Tú Uyển.aff -6 [cao:win] | ẩn: rv.Mộ Dung Tú Uyển.myaff -6 [cao:win] | ẩn: rv.Mộ Dung Tú Uyển.aff -12 [cao:lose] |
| Dư đồ · Mộ Dung Tú Uyển | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10» mà không đổi gì (thành) [cao:win] | thẻ ghi «Danh +3» mà không đổi gì (thành) [cao:win] | ẩn: S.duc -5 [cao:lose,cao:win] | thẻ ghi «oán ngươi +30» mà đổi rv.Mộ Dung Tú Uyển.oan +18 [cao:lose] |
| Dư đồ · Rương của Ôn Tịch Nhan | Cài đồ vào rương nàng | ĐÚNG |  |
| Dư đồ · Rương của Ôn Tịch Nhan | Lục rương tìm chứng cứ | SAI | ẩn: staff.Lão Thuận Tử.tin, staff.Tiểu Thúy 4.tin, staff.Hồng Liên 2.tin [cao:win] | thẻ ghi «cung nhân của Phi Ôn Tịch Nhan bắt gặp: nàng thiện cảm -15, » mà đổi rv.Ôn Tịch Nhan.oan +5 [cao:lose] |
| Dư đồ · Phùng Nguyệt Hoa | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Phùng Nguyệt Hoa | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Phùng Nguyệt Hoa | Bàn tán về Hoa Lạc Anh | ĐÚNG |  |
| Dư đồ · Phùng Nguyệt Hoa | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Phùng Nguyệt Hoa | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Phùng Nguyệt Hoa | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Phùng Nguyệt Hoa | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Phùng Nguyệt Hoa | Tặng quà | ĐÚNG |  |
| Dư đồ · Phùng Nguyệt Hoa | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.Phùng Nguyệt Hoa.aff -15 [cao:win] |
| Dư đồ · Phùng Nguyệt Hoa | Dò la | SAI | ẩn: S.bac -15 [cao:lose,cao:win] | thẻ ghi «bị lộ, nàng oán ngươi +8» mà đổi rv.Phùng Nguyệt Hoa.oan +6 [cao:lose] | ẩn: rv.Phùng Nguyệt Hoa.aff -8 [cao:lose] |
| Dư đồ · Phùng Nguyệt Hoa | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Phùng Nguyệt Hoa | Bỏ độc vào trà nàng | HIỆU ỨNG ẨN | ẩn: S.duc -10 [cao:lose,cao:win] |
| Dư đồ · Phùng Nguyệt Hoa | Ngáng chân nàng | HIỆU ỨNG ẨN | ẩn: S.duc -4 [cao:lose,cao:win] | ẩn: rv.Phùng Nguyệt Hoa.aff -6 [cao:win] | ẩn: rv.Phùng Nguyệt Hoa.myaff -6 [cao:win] | ẩn: rv.Phùng Nguyệt Hoa.aff -12 [cao:lose] |
| Dư đồ · Phùng Nguyệt Hoa | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10» mà không đổi gì (thành) [cao:win] | thẻ ghi «Danh +3» mà không đổi gì (thành) [cao:win] | ẩn: S.duc -5 [cao:lose,cao:win] | thẻ ghi «oán ngươi +30» mà đổi rv.Phùng Nguyệt Hoa.oan +22 [cao:lose] |
| Dư đồ · Rương của Âu Dương Tử Yên | Cài đồ vào rương nàng | ĐÚNG |  |
| Dư đồ · Rương của Âu Dương Tử Yên | Lục rương tìm chứng cứ | SAI | ẩn: staff.Lão Thuận Tử.tin, staff.Tiểu Thúy 4.tin, staff.Hồng Liên 2.tin [cao:win] | thẻ ghi «cung nhân của Tần Âu Dương Tử Yên bắt gặp: nàng thiện cảm -1» mà đổi rv.Âu Dương Tử Yên.oan +11 [cao:lose] |
| Dư đồ · Rương của Cố Nhược Lan | Cài đồ vào rương nàng | ĐÚNG |  |
| Dư đồ · Rương của Cố Nhược Lan | Lục rương tìm chứng cứ | SAI | ẩn: staff.Lão Thuận Tử.tin, staff.Tiểu Thúy 4.tin, staff.Hồng Liên 2.tin [cao:win] | thẻ ghi «cung nhân của Tần Cố Nhược Lan bắt gặp: nàng thiện cảm -15, » mà đổi rv.Cố Nhược Lan.oan +6 [cao:lose] |
| Cung nhân | Cài người vào cung khác › N Vân Uyển Nhi | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Vân Uyển Nhi | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Nhan Thục Nghi | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Lâm Họa Mi | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Mộ Dung Vân Khanh | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Tần Mộng Điệp | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Lý Thanh Liên | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Thẩm Ngọc Hành | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Diệp Như Ý | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Tạ Phương Hoa | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Khương Bích Dao | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Tống Nhược Lan | ĐÚNG |  |
| Hoàng tử | Dạy chữ | HIỆU ỨNG ẨN | ẩn: kid.Hoàng tử Hoằng Chiêm.tal +1 [con:win] |
| Hoàng tử | Dạy lễ nghi | HIỆU ỨNG ẨN | ẩn: kid.Hoàng tử Hoằng Chiêm.tal +1 [con:win] |
| Hoàng tử | Mời thầy riêng | ĐÚNG |  |
| Hoàng tử | Chăm sóc | ĐÚNG |  |
| Hoàng tử | Dẫn đi thỉnh an Hoàng thượng | SAI | thẻ ghi «Sủng +2» mà đổi S.sung +1 [con:win] |
| Hoàng tử | Canh giữ các con | ĐÚNG |  |
| Hoàng tử | Hỏi người hầu: đó là ai? | TRỐNG? |  |
| Hoàng tử | Về tẩm cung thăm con | ĐÚNG |  |
| Hoàng tử | Tự dạy con tài nghệ | ĐÚNG |  |
| Tư trang | Nhờ thái giám mua đồ › A giao | ĐÚNG |  |
| Phe phái | Dò la nhà ngoại phi tần › N Vân Uyển Nhi (nhà Tể tướng) | HIỆU ỨNG ẨN | ẩn: rv.HH Vân Uyển Nhi.oan +16 [con:win] |
| Phe phái | Dò la nhà ngoại phi tần › Vân Uyển Nhi (nhà Tể tướng) | ĐÚNG |  |
| Phe phái | Dò la nhà ngoại phi tần › Nhan Thục Nghi (nhà Hộ bộ) | HIỆU ỨNG ẨN | ẩn: rv.Nhan Thục Nghi.oan +18 [con:win] |
| Phe phái | Dò la nhà ngoại phi tần › N Nhan Thục Nghi (nhà Hộ bộ) | ĐÚNG |  |
| Phe phái | Dò la nhà ngoại phi tần › Lâm Họa Mi (nhà Đại tướng quân) | HIỆU ỨNG ẨN | ẩn: rv.Lâm Họa Mi.oan +13 [con:win] |
| Phe phái | Dò la nhà ngoại phi tần › Mộ Dung Vân Khanh (nhà Hộ bộ) | HIỆU ỨNG ẨN | ẩn: rv.Mộ Dung Vân Khanh.oan +24 [con:win] |
| Phe phái | Dò la nhà ngoại phi tần › Tần Mộng Điệp (nhà Lễ bộ) | HIỆU ỨNG ẨN | ẩn: rv.Tần Mộng Điệp.oan +8 [con:win] |
| Phe phái | Dò la nhà ngoại phi tần › Đ Tần Mộng Điệp (nhà Lễ bộ) | ĐÚNG |  |
| Phe phái | Dò la nhà ngoại phi tần › Lý Thanh Liên (nhà Lễ bộ) | HIỆU ỨNG ẨN | ẩn: rv.Lý Thanh Liên.oan +11 [con:win] |
| Phe phái | Dò la nhà ngoại phi tần › L Lý Thanh Liên (nhà Lễ bộ) | ĐÚNG |  |
| Phe phái | Dò la nhà ngoại phi tần › Thẩm Ngọc Hành (nhà Hàn lâm) | HIỆU ỨNG ẨN | ẩn: rv.Thẩm Ngọc Hành.oan +10 [con:win] |
| Phe phái | Dò la nhà ngoại phi tần › Diệp Như Ý (nhà Đại tướng quân) | HIỆU ỨNG ẨN | ẩn: rv.Diệp Như Ý.oan +8 [con:win] |
| Phe phái | Dò la nhà ngoại phi tần › Ý Diệp Như Ý (nhà Đại tướng quân) | ĐÚNG |  |
| Phe phái | Biếu quà, gửi thư cho Hạ Văn Uyên | ĐÚNG |  |
| Phe phái | Biếu quà, gửi thư cho Ôn Kính Chi | ĐÚNG |  |
| Phe phái | Biếu quà, gửi thư cho Đoan Mộc Bá Ngôn | ĐÚNG |  |
| Phe phái | Biếu quà, gửi thư cho Phùng Tử Khiêm | ĐÚNG |  |
| Phe phái | Biếu quà, gửi thư cho Liễu Thừa Chí | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la › Hoàng hậu Vân Uyển Nhi | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la › N Hoàng hậu Vân Uyển Nhi | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la › Quý phi Nhan Thục Nghi · đang nhắm | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la › Phi Lâm Họa Mi | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la › Phi Mộ Dung Vân Khanh | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la › Tần Tần Mộng Điệp | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la › Tần Lý Thanh Liên | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la › Quý nhân Thẩm Ngọc Hành | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la › Quý nhân Diệp Như Ý | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la › Thường tại Tạ Phương Hoa | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la › Thường tại Từ Diễm Thu | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la › T Thường tại Từ Diễm Thu | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la › Đáp ứng Khương Bích Dao | ĐÚNG |  |
| Tẩm cung · Hạ Vân | Sai đi dò la › Đáp ứng Tống Nhược Lan | ĐÚNG |  |
| Tẩm cung · Hoàng tử Hoằng Chiêm | Chào hỏi | TRỐNG? |  |
| Tẩm cung · Công chúa Ninh Thọ | Chào hỏi | TRỐNG? |  |
| Dư đồ · Từ Diễm Thu | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Từ Diễm Thu | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Từ Diễm Thu | Bàn tán về Vân Uyển Nhi | ĐÚNG |  |
| Dư đồ · Từ Diễm Thu | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Từ Diễm Thu | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Từ Diễm Thu | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Từ Diễm Thu | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Từ Diễm Thu | Tặng quà | ĐÚNG |  |
| Dư đồ · Từ Diễm Thu | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.Từ Diễm Thu.aff -15 [con:win] |
| Dư đồ · Từ Diễm Thu | Dò la | HIỆU ỨNG ẨN | ẩn: S.bac -15 [con:lose,con:win] | ẩn: rv.Từ Diễm Thu.aff -8 [con:lose] |
| Dư đồ · Từ Diễm Thu | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Từ Diễm Thu | Đẩy nàng xuống hồ sen | HIỆU ỨNG ẨN | ẩn: S.duc -12 [con:lose,con:win] | ẩn: rv.Từ Diễm Thu.aff -10 [con:win] | ẩn: rv.Từ Diễm Thu.myaff -10 [con:win] | ẩn: S.danh -8 [con:lose] |
| Dư đồ · Từ Diễm Thu | Ngáng chân nàng | HIỆU ỨNG ẨN | ẩn: S.duc -4 [con:lose,con:win] | ẩn: rv.Từ Diễm Thu.aff -6 [con:win] | ẩn: rv.Từ Diễm Thu.myaff -6 [con:win] | ẩn: S.sung +2 [con:lose] |
| Dư đồ · Từ Diễm Thu | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10» mà không đổi gì (thành) [con:win] | thẻ ghi «Danh +3» mà không đổi gì (thành) [con:win] | ẩn: S.duc -5 [con:lose,con:win] | thẻ ghi «oán ngươi +30» mà đổi rv.Từ Diễm Thu.oan +32 [con:lose] |
| Dư đồ · Hạ Vân | Sai đi dò la › Hoàng hậu Vân Uyển Nhi | ĐÚNG |  |
| Dư đồ · Hạ Vân | Sai đi dò la › Quý phi Nhan Thục Nghi · đang nhắm | ĐÚNG |  |
| Dư đồ · Hạ Vân | Sai đi dò la › Phi Lâm Họa Mi | ĐÚNG |  |
| Dư đồ · Hạ Vân | Sai đi dò la › Phi Mộ Dung Vân Khanh | ĐÚNG |  |
| Dư đồ · Hạ Vân | Sai đi dò la › Tần Tần Mộng Điệp | ĐÚNG |  |
| Dư đồ · Hạ Vân | Sai đi dò la › Tần Lý Thanh Liên | ĐÚNG |  |
| Dư đồ · Hạ Vân | Sai đi dò la › Quý nhân Thẩm Ngọc Hành | ĐÚNG |  |
| Dư đồ · Hạ Vân | Sai đi dò la › Quý nhân Diệp Như Ý | ĐÚNG |  |
| Dư đồ · Hạ Vân | Sai đi dò la › Thường tại Tạ Phương Hoa | ĐÚNG |  |
| Dư đồ · Hạ Vân | Sai đi dò la › Thường tại Từ Diễm Thu | ĐÚNG |  |
| Dư đồ · Hạ Vân | Sai đi dò la › Đáp ứng Khương Bích Dao | ĐÚNG |  |
| Dư đồ · Hạ Vân | Sai đi dò la › Đáp ứng Tống Nhược Lan | ĐÚNG |  |
| Dư đồ · Hoàng tử Hoằng Chiêm | Chào hỏi | TRỐNG? |  |
| Dư đồ · Công chúa Ninh Thọ | Chào hỏi | TRỐNG? |  |
| Dư đồ · Hoàng hậu Vân Uyển Nhi | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Hoàng hậu Vân Uyển Nhi | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Hoàng hậu Vân Uyển Nhi | Thỉnh an | SAI | thẻ ghi «Hoàng hậu quý ngươi +4» mà đổi S.hh +2 [con:win] |
| Dư đồ · Hoàng hậu Vân Uyển Nhi | Xin Hoàng hậu che chở | ĐÚNG |  |
| Dư đồ · Hoàng hậu Vân Uyển Nhi | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.HH Vân Uyển Nhi.oan +7 [con:win] |
| Dư đồ · Nhan Thục Nghi | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Nhan Thục Nghi | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Nhan Thục Nghi | Bàn tán về Vân Uyển Nhi | ĐÚNG |  |
| Dư đồ · Nhan Thục Nghi | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Nhan Thục Nghi | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Nhan Thục Nghi | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Nhan Thục Nghi | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Nhan Thục Nghi | Tặng quà | ĐÚNG |  |
| Dư đồ · Nhan Thục Nghi | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.Nhan Thục Nghi.aff -15 [con:win] |
| Dư đồ · Nhan Thục Nghi | Dò la | SAI | ẩn: S.bac -15 [con:lose,con:win] | thẻ ghi «bị lộ, nàng oán ngươi +8» mà đổi rv.Nhan Thục Nghi.oan +7 [con:lose] | ẩn: rv.Nhan Thục Nghi.aff -8 [con:lose] |
| Dư đồ · Nhan Thục Nghi | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Nhan Thục Nghi | Bỏ độc vào trà nàng | HIỆU ỨNG ẨN | ẩn: S.duc -10 [con:lose,con:win] |
| Dư đồ · Nhan Thục Nghi | Ngáng chân nàng | HIỆU ỨNG ẨN | ẩn: S.duc -4 [con:lose,con:win] | ẩn: rv.Nhan Thục Nghi.aff -6 [con:win] | ẩn: rv.Nhan Thục Nghi.myaff -6 [con:win] | ẩn: rv.Nhan Thục Nghi.aff -12 [con:lose] |
| Dư đồ · Nhan Thục Nghi | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10» mà không đổi gì (thành) [con:win] | thẻ ghi «Danh +3» mà không đổi gì (thành) [con:win] | ẩn: S.duc -5 [con:lose,con:win] | thẻ ghi «oán ngươi +30» mà đổi rv.Nhan Thục Nghi.oan +25 [con:lose] |
| Dư đồ · Nhan Thục Nghi | Nghe lén câu chuyện | ĐÚNG |  |
| Dư đồ · Mộ Dung Vân Khanh | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Mộ Dung Vân Khanh | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Mộ Dung Vân Khanh | Bàn tán về Vân Uyển Nhi | ĐÚNG |  |
| Dư đồ · Mộ Dung Vân Khanh | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Mộ Dung Vân Khanh | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Mộ Dung Vân Khanh | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Mộ Dung Vân Khanh | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Mộ Dung Vân Khanh | Tặng quà | ĐÚNG |  |
| Dư đồ · Mộ Dung Vân Khanh | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.Mộ Dung Vân Khanh.aff -15 [con:win] |
| Dư đồ · Mộ Dung Vân Khanh | Dò la | SAI | ẩn: S.bac -15 [con:lose,con:win] | thẻ ghi «bị lộ, nàng oán ngươi +8» mà đổi rv.Mộ Dung Vân Khanh.oan +9 [con:lose] | ẩn: rv.Mộ Dung Vân Khanh.aff -8 [con:lose] |
| Dư đồ · Mộ Dung Vân Khanh | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Mộ Dung Vân Khanh | Bỏ độc vào trà nàng | HIỆU ỨNG ẨN | ẩn: S.duc -10 [con:lose,con:win] |
| Dư đồ · Mộ Dung Vân Khanh | Ngáng chân nàng | HIỆU ỨNG ẨN | ẩn: S.duc -4 [con:lose,con:win] | ẩn: rv.Mộ Dung Vân Khanh.aff -6 [con:win] | ẩn: rv.Mộ Dung Vân Khanh.myaff -6 [con:win] | ẩn: rv.Mộ Dung Vân Khanh.aff -12 [con:lose] |
| Dư đồ · Mộ Dung Vân Khanh | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10» mà không đổi gì (thành) [con:win] | thẻ ghi «Danh +3» mà không đổi gì (thành) [con:win] | ẩn: S.duc -5 [con:lose,con:win] | thẻ ghi «oán ngươi +30» mà đổi rv.Mộ Dung Vân Khanh.oan +35 [con:lose] |
| Dư đồ · Mộ Dung Vân Khanh | Nghe lén câu chuyện | ĐÚNG |  |
| Dư đồ · Lý Thanh Liên | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Lý Thanh Liên | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Lý Thanh Liên | Bàn tán về Nhan Thục Nghi | ĐÚNG |  |
| Dư đồ · Lý Thanh Liên | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Lý Thanh Liên | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Lý Thanh Liên | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Lý Thanh Liên | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Lý Thanh Liên | Tặng quà | ĐÚNG |  |
| Dư đồ · Lý Thanh Liên | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.Lý Thanh Liên.aff -15 [con:win] |
| Dư đồ · Lý Thanh Liên | Dò la | SAI | ẩn: S.bac -15 [con:lose,con:win] | thẻ ghi «bị lộ, nàng oán ngươi +8» mà đổi rv.Lý Thanh Liên.oan +4 [con:lose] | ẩn: rv.Lý Thanh Liên.aff -8 [con:lose] |
| Dư đồ · Lý Thanh Liên | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Lý Thanh Liên | Bỏ độc vào trà nàng | HIỆU ỨNG ẨN | ẩn: S.duc -10 [con:lose,con:win] |
| Dư đồ · Lý Thanh Liên | Ngáng chân nàng | HIỆU ỨNG ẨN | ẩn: S.duc -4 [con:lose,con:win] | ẩn: rv.Lý Thanh Liên.aff -6 [con:win] | ẩn: rv.Lý Thanh Liên.myaff -6 [con:win] | ẩn: rv.Lý Thanh Liên.aff -12 [con:lose] |
| Dư đồ · Lý Thanh Liên | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10» mà không đổi gì (thành) [con:win] | thẻ ghi «Danh +3» mà không đổi gì (thành) [con:win] | ẩn: S.duc -5 [con:lose,con:win] | thẻ ghi «oán ngươi +30» mà đổi rv.Lý Thanh Liên.oan +16 [con:lose] |
| Dư đồ · Lý Thanh Liên | Nghe lén câu chuyện | ĐÚNG |  |
| Dư đồ · Thẩm Ngọc Hành | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Thẩm Ngọc Hành | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Thẩm Ngọc Hành | Bàn tán về Vân Uyển Nhi | ĐÚNG |  |
| Dư đồ · Thẩm Ngọc Hành | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Thẩm Ngọc Hành | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Thẩm Ngọc Hành | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Thẩm Ngọc Hành | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Thẩm Ngọc Hành | Tặng quà | ĐÚNG |  |
| Dư đồ · Thẩm Ngọc Hành | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.Thẩm Ngọc Hành.aff -15 [con:win] |
| Dư đồ · Thẩm Ngọc Hành | Dò la | SAI | ẩn: S.bac -15 [con:lose,con:win] | thẻ ghi «bị lộ, nàng oán ngươi +8» mà đổi rv.Thẩm Ngọc Hành.oan +4 [con:lose] | ẩn: rv.Thẩm Ngọc Hành.aff -8 [con:lose] |
| Dư đồ · Thẩm Ngọc Hành | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Thẩm Ngọc Hành | Bỏ độc vào trà nàng | HIỆU ỨNG ẨN | ẩn: S.duc -10 [con:lose,con:win] |
| Dư đồ · Thẩm Ngọc Hành | Ngáng chân nàng | HIỆU ỨNG ẨN | ẩn: S.duc -4 [con:lose,con:win] | ẩn: rv.Thẩm Ngọc Hành.aff -6 [con:win] | ẩn: rv.Thẩm Ngọc Hành.myaff -6 [con:win] | ẩn: rv.Thẩm Ngọc Hành.aff -12 [con:lose] |
| Dư đồ · Thẩm Ngọc Hành | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10» mà không đổi gì (thành) [con:win] | thẻ ghi «Danh +3» mà không đổi gì (thành) [con:win] | ẩn: S.duc -5 [con:lose,con:win] | thẻ ghi «oán ngươi +30» mà đổi rv.Thẩm Ngọc Hành.oan +14 [con:lose] |
| Dư đồ · Thẩm Ngọc Hành | Nghe lén câu chuyện | ĐÚNG |  |
| Dư đồ · Diệp Như Ý | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Diệp Như Ý | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Diệp Như Ý | Bàn tán về Nhan Thục Nghi | ĐÚNG |  |
| Dư đồ · Diệp Như Ý | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Diệp Như Ý | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Diệp Như Ý | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Diệp Như Ý | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Diệp Như Ý | Tặng quà | ĐÚNG |  |
| Dư đồ · Diệp Như Ý | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.Diệp Như Ý.aff -15 [con:win] |
| Dư đồ · Diệp Như Ý | Dò la | SAI | ẩn: S.bac -15 [con:lose,con:win] | thẻ ghi «bị lộ, nàng oán ngươi +8» mà đổi rv.Diệp Như Ý.oan +3 [con:lose] | ẩn: rv.Diệp Như Ý.aff -8 [con:lose] |
| Dư đồ · Diệp Như Ý | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Diệp Như Ý | Bỏ độc vào trà nàng | HIỆU ỨNG ẨN | ẩn: S.duc -10 [con:lose,con:win] |
| Dư đồ · Diệp Như Ý | Ngáng chân nàng | HIỆU ỨNG ẨN | ẩn: S.duc -4 [con:lose,con:win] | ẩn: rv.Diệp Như Ý.aff -6 [con:win] | ẩn: rv.Diệp Như Ý.myaff -6 [con:win] | ẩn: rv.Diệp Như Ý.aff -12 [con:lose] |
| Dư đồ · Diệp Như Ý | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10» mà không đổi gì (thành) [con:win] | thẻ ghi «Danh +3» mà không đổi gì (thành) [con:win] | ẩn: S.duc -5 [con:lose,con:win] | thẻ ghi «oán ngươi +30» mà đổi rv.Diệp Như Ý.oan +11 [con:lose] |
| Dư đồ · Diệp Như Ý | Nghe lén câu chuyện | ĐÚNG |  |
| Dư đồ · Tạ Phương Hoa | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Tạ Phương Hoa | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Tạ Phương Hoa | Bàn tán về Nhan Thục Nghi | ĐÚNG |  |
| Dư đồ · Tạ Phương Hoa | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Tạ Phương Hoa | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Tạ Phương Hoa | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Tạ Phương Hoa | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Tạ Phương Hoa | Tặng quà | ĐÚNG |  |
| Dư đồ · Tạ Phương Hoa | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.Tạ Phương Hoa.aff -15 [con:win] |
| Dư đồ · Tạ Phương Hoa | Dò la | SAI | ẩn: S.bac -15 [con:lose,con:win] | thẻ ghi «bị lộ, nàng oán ngươi +8» mà đổi rv.Tạ Phương Hoa.oan +6 [con:lose] | ẩn: rv.Tạ Phương Hoa.aff -8 [con:lose] |
| Dư đồ · Tạ Phương Hoa | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Tạ Phương Hoa | Bỏ độc vào trà nàng | HIỆU ỨNG ẨN | ẩn: S.duc -10 [con:lose,con:win] |
| Dư đồ · Tạ Phương Hoa | Ngáng chân nàng | HIỆU ỨNG ẨN | ẩn: S.duc -4 [con:lose,con:win] | ẩn: rv.Tạ Phương Hoa.aff -6 [con:win] | ẩn: rv.Tạ Phương Hoa.myaff -6 [con:win] | ẩn: rv.Tạ Phương Hoa.aff -12 [con:lose] |
| Dư đồ · Tạ Phương Hoa | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10» mà không đổi gì (thành) [con:win] | thẻ ghi «Danh +3» mà không đổi gì (thành) [con:win] | ẩn: S.duc -5 [con:lose,con:win] | thẻ ghi «oán ngươi +30» mà đổi rv.Tạ Phương Hoa.oan +22 [con:lose] |
| Dư đồ · Tạ Phương Hoa | Nghe lén câu chuyện | ĐÚNG |  |
| Dư đồ · Khương Bích Dao | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Khương Bích Dao | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Khương Bích Dao | Bàn tán về Vân Uyển Nhi | ĐÚNG |  |
| Dư đồ · Khương Bích Dao | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Khương Bích Dao | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Khương Bích Dao | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Khương Bích Dao | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Khương Bích Dao | Tặng quà | ĐÚNG |  |
| Dư đồ · Khương Bích Dao | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.Khương Bích Dao.aff -15 [con:win] |
| Dư đồ · Khương Bích Dao | Dò la | SAI | ẩn: S.bac -15 [con:lose,con:win] | thẻ ghi «bị lộ, nàng oán ngươi +8» mà đổi rv.Khương Bích Dao.oan +4 [con:lose] | ẩn: rv.Khương Bích Dao.aff -8 [con:lose] |
| Dư đồ · Khương Bích Dao | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Khương Bích Dao | Bỏ độc vào trà nàng | HIỆU ỨNG ẨN | ẩn: S.duc -10 [con:lose,con:win] |
| Dư đồ · Khương Bích Dao | Ngáng chân nàng | HIỆU ỨNG ẨN | ẩn: S.duc -4 [con:lose,con:win] | ẩn: rv.Khương Bích Dao.aff -6 [con:win] | ẩn: rv.Khương Bích Dao.myaff -6 [con:win] | ẩn: rv.Khương Bích Dao.aff -12 [con:lose] |
| Dư đồ · Khương Bích Dao | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10» mà không đổi gì (thành) [con:win] | thẻ ghi «Danh +3» mà không đổi gì (thành) [con:win] | ẩn: S.duc -5 [con:lose,con:win] | thẻ ghi «oán ngươi +30» mà đổi rv.Khương Bích Dao.oan +16 [con:lose] |
| Dư đồ · Khương Bích Dao | Nghe lén câu chuyện | ĐÚNG |  |
| Dư đồ · Tống Nhược Lan | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Tống Nhược Lan | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Tống Nhược Lan | Bàn tán về Vân Uyển Nhi | ĐÚNG |  |
| Dư đồ · Tống Nhược Lan | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Tống Nhược Lan | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Tống Nhược Lan | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Tống Nhược Lan | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Tống Nhược Lan | Tặng quà | ĐÚNG |  |
| Dư đồ · Tống Nhược Lan | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.Tống Nhược Lan.aff -15 [con:win] |
| Dư đồ · Tống Nhược Lan | Dò la | SAI | ẩn: S.bac -15 [con:lose,con:win] | thẻ ghi «bị lộ, nàng oán ngươi +8» mà đổi rv.Tống Nhược Lan.oan +6 [con:lose] | ẩn: rv.Tống Nhược Lan.aff -8 [con:lose] |
| Dư đồ · Tống Nhược Lan | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Tống Nhược Lan | Bỏ độc vào trà nàng | HIỆU ỨNG ẨN | ẩn: S.duc -10 [con:lose,con:win] |
| Dư đồ · Tống Nhược Lan | Ngáng chân nàng | HIỆU ỨNG ẨN | ẩn: S.duc -4 [con:lose,con:win] | ẩn: rv.Tống Nhược Lan.aff -6 [con:win] | ẩn: rv.Tống Nhược Lan.myaff -6 [con:win] | ẩn: rv.Tống Nhược Lan.aff -12 [con:lose] |
| Dư đồ · Tống Nhược Lan | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10» mà không đổi gì (thành) [con:win] | thẻ ghi «Danh +3» mà không đổi gì (thành) [con:win] | ẩn: S.duc -5 [con:lose,con:win] | thẻ ghi «oán ngươi +30» mà đổi rv.Tống Nhược Lan.oan +22 [con:lose] |
| Dư đồ · Tống Nhược Lan | Nghe lén câu chuyện | ĐÚNG |  |
| Dư đồ · Rương của Nhan Thục Nghi | Cài đồ vào rương nàng | ĐÚNG |  |
| Dư đồ · Rương của Nhan Thục Nghi | Lục rương tìm chứng cứ | SAI | ẩn: staff.Lão Hỉ Tử.tin [con:win] | thẻ ghi «cung nhân của Quý phi Nhan Thục Nghi bắt gặp: nàng thiện cảm» mà đổi rv.Nhan Thục Nghi.oan +13 [con:lose] |
| Dư đồ · Rương của Mộ Dung Vân Khanh | Cài đồ vào rương nàng | ĐÚNG |  |
| Dư đồ · Rương của Mộ Dung Vân Khanh | Lục rương tìm chứng cứ | SAI | ẩn: staff.Lão Hỉ Tử.tin [con:win] | thẻ ghi «cung nhân của Phi Mộ Dung Vân Khanh bắt gặp: nàng thiện cảm » mà đổi rv.Mộ Dung Vân Khanh.oan +17 [con:lose] |
| Dư đồ · Tần Mộng Điệp | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Tần Mộng Điệp | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Tần Mộng Điệp | Bàn tán về Vân Uyển Nhi | ĐÚNG |  |
| Dư đồ · Tần Mộng Điệp | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Tần Mộng Điệp | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Tần Mộng Điệp | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Tần Mộng Điệp | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Tần Mộng Điệp | Tặng quà | ĐÚNG |  |
| Dư đồ · Tần Mộng Điệp | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.Tần Mộng Điệp.aff -15 [con:win] |
| Dư đồ · Tần Mộng Điệp | Dò la | SAI | ẩn: S.bac -15 [con:lose,con:win] | thẻ ghi «bị lộ, nàng oán ngươi +8» mà đổi rv.Tần Mộng Điệp.oan +3 [con:lose] | ẩn: rv.Tần Mộng Điệp.aff -8 [con:lose] |
| Dư đồ · Tần Mộng Điệp | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Tần Mộng Điệp | Bỏ độc vào trà nàng | HIỆU ỨNG ẨN | ẩn: S.duc -10 [con:lose,con:win] |
| Dư đồ · Tần Mộng Điệp | Ngáng chân nàng | HIỆU ỨNG ẨN | ẩn: S.duc -4 [con:lose,con:win] | ẩn: rv.Tần Mộng Điệp.aff -6 [con:win] | ẩn: rv.Tần Mộng Điệp.myaff -6 [con:win] | ẩn: rv.Tần Mộng Điệp.aff -12 [con:lose] |
| Dư đồ · Tần Mộng Điệp | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10» mà không đổi gì (thành) [con:win] | thẻ ghi «Danh +3» mà không đổi gì (thành) [con:win] | ẩn: S.duc -5 [con:lose,con:win] | thẻ ghi «oán ngươi +30» mà đổi rv.Tần Mộng Điệp.oan +11 [con:lose] |
| Dư đồ · Rương của Lý Thanh Liên | Cài đồ vào rương nàng | ĐÚNG |  |
| Dư đồ · Rương của Lý Thanh Liên | Lục rương tìm chứng cứ | SAI | ẩn: staff.Lão Hỉ Tử.tin [con:win] | thẻ ghi «cung nhân của Tần Lý Thanh Liên bắt gặp: nàng thiện cảm -15,» mà đổi rv.Lý Thanh Liên.oan +8 [con:lose] |
| Hành sự | Buôn bán lén trong cung | HIỆU ỨNG ẨN | ẩn: S.confined +1 [hau:lose] |
| Hành sự | Dâng bạc vào quốc khố | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Xử tội | ĐÚNG |  |
| Hậu cung · thẻ phi tần | Tịch thu vô cớ | TRỐNG | thẻ ghi «Danh -3» mà không đổi gì (thành) [hh:win] | thẻ ghi «Thái hậu -5» mà không đổi gì (thành) [hh:win] |
| Hậu cung · thẻ phi tần | Ban thưởng | SAI | thẻ ghi «thiện cảm +20» mà đổi rv.Bạch Ngưng Sương.aff +23 [hh:win] | ẩn: rv.Bạch Ngưng Sương.danh +3 [hh:win] | ẩn: rv.Tô Lan Chi.danh +3 [hh:win] | thẻ ghi «thiện cảm +20» mà đổi rv.Khương Thanh Ca.aff +10 [hh:win] |
| Hậu cung · thẻ phi tần | Khất bổng lộc | HIỆU ỨNG ẨN | ẩn: rv.Bạch Ngưng Sương.aff -15 [hh:win] | ẩn: rv.Tô Lan Chi.aff -15 [hh:win] | ẩn: rv.Khương Thanh Ca.aff -15 [hh:win] |
| Hậu cung · thẻ phi tần | Ân xá | HIỆU ỨNG ẨN | ẩn: S.duc +2 [hh:win] | ẩn: rv.Tô Lan Chi.aff +30 [hh:win] | ẩn: rv.Tô Lan Chi.myaff +30 [hh:win] |
| Cung nhân | Cài người vào cung khác › Cố Lạc Anh | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Bạch Ngưng Sương | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Chu Họa Mi | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Đường Dao Cầm | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Từ Lăng Vân | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Ôn Kiều Nguyệt | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Tô Lan Chi | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Khương Thanh Ca | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Lý Yên Nhiên | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Hạ Tố Tâm | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Mạnh Cẩm Tú | ĐÚNG |  |
| Cung nhân | Cài người vào cung khác › Hoa Khinh Vũ | ĐÚNG |  |
| Tư trang | Nhờ thái giám mua đồ › Xạ hương | ĐÚNG |  |
| Tẩm cung · Tiểu Linh | Tâm sự | ĐÚNG |  |
| Tẩm cung · Tiểu Linh | Sai đi dò la | ĐÚNG |  |
| Tẩm cung · Tiểu Linh | Sai đi dò la › Hoàng quý phi Cố Lạc Anh | ĐÚNG |  |
| Tẩm cung · Tiểu Linh | Sai đi dò la › Quý phi Bạch Ngưng Sương · đang nhắm | ĐÚNG |  |
| Tẩm cung · Tiểu Linh | Sai đi dò la › Phi Chu Họa Mi | ĐÚNG |  |
| Tẩm cung · Tiểu Linh | Sai đi dò la › Phi Đường Dao Cầm | ĐÚNG |  |
| Tẩm cung · Tiểu Linh | Sai đi dò la › Tần Từ Lăng Vân | ĐÚNG |  |
| Tẩm cung · Tiểu Linh | Sai đi dò la › Tần Ôn Kiều Nguyệt | ĐÚNG |  |
| Tẩm cung · Tiểu Linh | Sai đi dò la › Quý nhân Tô Lan Chi | ĐÚNG |  |
| Tẩm cung · Tiểu Linh | Sai đi dò la › Quý nhân Khương Thanh Ca | ĐÚNG |  |
| Tẩm cung · Tiểu Linh | Sai đi dò la › Thường tại Lý Yên Nhiên | ĐÚNG |  |
| Tẩm cung · Tiểu Linh | Sai đi dò la › Thường tại Hạ Tố Tâm | ĐÚNG |  |
| Tẩm cung · Tiểu Linh | Sai đi dò la › Đáp ứng Mạnh Cẩm Tú | ĐÚNG |  |
| Tẩm cung · Tiểu Linh | Sai đi dò la › Đáp ứng Hoa Khinh Vũ | ĐÚNG |  |
| Tẩm cung · Tiểu Linh | Nghe ngóng chung | TRỐNG? |  |
| Dư đồ · Bạch Ngưng Sương | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Bạch Ngưng Sương | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Bạch Ngưng Sương | Bàn tán về Cố Lạc Anh | ĐÚNG |  |
| Dư đồ · Bạch Ngưng Sương | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Bạch Ngưng Sương | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Bạch Ngưng Sương | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Bạch Ngưng Sương | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Bạch Ngưng Sương | Tặng quà | ĐÚNG |  |
| Dư đồ · Bạch Ngưng Sương | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.Bạch Ngưng Sương.aff -15 [hh:win] |
| Dư đồ · Bạch Ngưng Sương | Dò la | SAI | ẩn: S.bac -15 [hh:lose,hh:win] | thẻ ghi «bị lộ, nàng oán ngươi +8» mà đổi rv.Bạch Ngưng Sương.oan +4 [hh:lose] | ẩn: rv.Bạch Ngưng Sương.aff -8 [hh:lose] |
| Dư đồ · Bạch Ngưng Sương | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Bạch Ngưng Sương | Đẩy nàng xuống hồ sen | HIỆU ỨNG ẨN | ẩn: S.duc -12 [hh:lose,hh:win] | ẩn: rv.Bạch Ngưng Sương.aff -10 [hh:win] | ẩn: rv.Bạch Ngưng Sương.myaff -10 [hh:win] | ẩn: S.danh -8 [hh:lose] |
| Dư đồ · Bạch Ngưng Sương | Ngáng chân nàng | HIỆU ỨNG ẨN | ẩn: S.duc -4 [hh:lose,hh:win] | ẩn: rv.Bạch Ngưng Sương.aff -6 [hh:win] | ẩn: rv.Bạch Ngưng Sương.myaff -6 [hh:win] | ẩn: rv.Bạch Ngưng Sương.aff -12 [hh:lose] |
| Dư đồ · Bạch Ngưng Sương | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10» mà không đổi gì (thành) [hh:win] | thẻ ghi «Danh +3» mà không đổi gì (thành) [hh:win] | ẩn: S.duc -5 [hh:lose,hh:win] | thẻ ghi «oán ngươi +30» mà đổi rv.Bạch Ngưng Sương.oan +15 [hh:lose] |
| Dư đồ · Bạch Ngưng Sương | Nghe lén câu chuyện | ĐÚNG |  |
| Dư đồ · Chu Họa Mi | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Chu Họa Mi | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Chu Họa Mi | Bàn tán về Cố Lạc Anh | ĐÚNG |  |
| Dư đồ · Chu Họa Mi | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Chu Họa Mi | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Chu Họa Mi | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Chu Họa Mi | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Chu Họa Mi | Tặng quà | ĐÚNG |  |
| Dư đồ · Chu Họa Mi | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.Chu Họa Mi.aff -15 [hh:win] |
| Dư đồ · Chu Họa Mi | Dò la | SAI | ẩn: S.bac -15 [hh:lose,hh:win] | thẻ ghi «bị lộ, nàng oán ngươi +8» mà đổi rv.Chu Họa Mi.oan +5 [hh:lose] | ẩn: rv.Chu Họa Mi.aff -8 [hh:lose] |
| Dư đồ · Chu Họa Mi | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Chu Họa Mi | Đẩy nàng xuống hồ sen | HIỆU ỨNG ẨN | ẩn: S.duc -12 [hh:lose,hh:win] | ẩn: rv.Chu Họa Mi.aff -10 [hh:win] | ẩn: rv.Chu Họa Mi.myaff -10 [hh:win] | ẩn: S.danh -8 [hh:lose] |
| Dư đồ · Chu Họa Mi | Ngáng chân nàng | HIỆU ỨNG ẨN | ẩn: S.duc -4 [hh:lose,hh:win] | ẩn: rv.Chu Họa Mi.aff -6 [hh:win] | ẩn: rv.Chu Họa Mi.myaff -6 [hh:win] | ẩn: rv.Chu Họa Mi.aff -12 [hh:lose] |
| Dư đồ · Chu Họa Mi | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10» mà không đổi gì (thành) [hh:win] | thẻ ghi «Danh +3» mà không đổi gì (thành) [hh:win] | ẩn: S.duc -5 [hh:lose,hh:win] | thẻ ghi «oán ngươi +30» mà đổi rv.Chu Họa Mi.oan +20 [hh:lose] |
| Dư đồ · Chu Họa Mi | Nghe lén câu chuyện | ĐÚNG |  |
| Dư đồ · Tiểu Linh | Tâm sự | ĐÚNG |  |
| Dư đồ · Tiểu Linh | Sai đi dò la | ĐÚNG |  |
| Dư đồ · Tiểu Linh | Sai đi dò la › Hoàng quý phi Cố Lạc Anh | ĐÚNG |  |
| Dư đồ · Tiểu Linh | Sai đi dò la › Quý phi Bạch Ngưng Sương · đang nhắm | ĐÚNG |  |
| Dư đồ · Tiểu Linh | Sai đi dò la › Phi Chu Họa Mi | ĐÚNG |  |
| Dư đồ · Tiểu Linh | Sai đi dò la › Phi Đường Dao Cầm | ĐÚNG |  |
| Dư đồ · Tiểu Linh | Sai đi dò la › Tần Từ Lăng Vân | ĐÚNG |  |
| Dư đồ · Tiểu Linh | Sai đi dò la › Tần Ôn Kiều Nguyệt | ĐÚNG |  |
| Dư đồ · Tiểu Linh | Sai đi dò la › Quý nhân Tô Lan Chi | ĐÚNG |  |
| Dư đồ · Tiểu Linh | Sai đi dò la › Quý nhân Khương Thanh Ca | ĐÚNG |  |
| Dư đồ · Tiểu Linh | Sai đi dò la › Thường tại Lý Yên Nhiên | ĐÚNG |  |
| Dư đồ · Tiểu Linh | Sai đi dò la › Thường tại Hạ Tố Tâm | ĐÚNG |  |
| Dư đồ · Tiểu Linh | Sai đi dò la › Đáp ứng Mạnh Cẩm Tú | ĐÚNG |  |
| Dư đồ · Tiểu Linh | Sai đi dò la › Đáp ứng Hoa Khinh Vũ | ĐÚNG |  |
| Dư đồ · Tiểu Linh | Nghe ngóng chung | TRỐNG? |  |
| Dư đồ · Rương của Cố Lạc Anh | Cài đồ vào rương nàng | ĐÚNG |  |
| Dư đồ · Rương của Cố Lạc Anh | Lục rương tìm chứng cứ | SAI | ẩn: staff.Tiểu Trung Tử.tin, staff.Lam Ngọc.tin, staff.Ngân Hạnh.tin, staff.Hạ Vân.tin [hh:win] | thẻ ghi «cung nhân của Hoàng quý phi Cố Lạc Anh bắt gặp: nàng thiện c» mà đổi rv.Cố Lạc Anh.oan +10 [hh:lose] |
| Dư đồ · Rương của Bạch Ngưng Sương | Cài đồ vào rương nàng | ĐÚNG |  |
| Dư đồ · Rương của Bạch Ngưng Sương | Lục rương tìm chứng cứ | SAI | ẩn: staff.Tiểu Trung Tử.tin, staff.Lam Ngọc.tin, staff.Ngân Hạnh.tin, staff.Hạ Vân.tin [hh:win] | thẻ ghi «cung nhân của Quý phi Bạch Ngưng Sương bắt gặp: nàng thiện c» mà đổi rv.Bạch Ngưng Sương.oan +8 [hh:lose] |
| Dư đồ · Rương của Chu Họa Mi | Cài đồ vào rương nàng | ĐÚNG |  |
| Dư đồ · Rương của Chu Họa Mi | Lục rương tìm chứng cứ | SAI | ẩn: staff.Tiểu Trung Tử.tin, staff.Lam Ngọc.tin, staff.Ngân Hạnh.tin, staff.Hạ Vân.tin [hh:win] | thẻ ghi «cung nhân của Phi Chu Họa Mi bắt gặp: nàng thiện cảm -15, oá» mà đổi rv.Chu Họa Mi.oan +10 [hh:lose] |
| Dư đồ · Đường Dao Cầm | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Đường Dao Cầm | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Đường Dao Cầm | Bàn tán về Cố Lạc Anh | ĐÚNG |  |
| Dư đồ · Đường Dao Cầm | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Đường Dao Cầm | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Đường Dao Cầm | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Đường Dao Cầm | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Đường Dao Cầm | Tặng quà | ĐÚNG |  |
| Dư đồ · Đường Dao Cầm | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.Đường Dao Cầm.aff -15 [hh:win] |
| Dư đồ · Đường Dao Cầm | Dò la | SAI | ẩn: S.bac -15 [hh:lose,hh:win] | thẻ ghi «bị lộ, nàng oán ngươi +8» mà đổi rv.Đường Dao Cầm.oan +5 [hh:lose] | ẩn: rv.Đường Dao Cầm.aff -8 [hh:lose] |
| Dư đồ · Đường Dao Cầm | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Đường Dao Cầm | Bỏ độc vào trà nàng | HIỆU ỨNG ẨN | ẩn: S.duc -10 [hh:lose,hh:win] |
| Dư đồ · Đường Dao Cầm | Ngáng chân nàng | HIỆU ỨNG ẨN | ẩn: S.duc -4 [hh:lose,hh:win] | ẩn: rv.Đường Dao Cầm.aff -6 [hh:win] | ẩn: rv.Đường Dao Cầm.myaff -6 [hh:win] | ẩn: rv.Đường Dao Cầm.aff -12 [hh:lose] |
| Dư đồ · Đường Dao Cầm | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10» mà không đổi gì (thành) [hh:win] | thẻ ghi «Danh +3» mà không đổi gì (thành) [hh:win] | ẩn: S.duc -5 [hh:lose,hh:win] | thẻ ghi «oán ngươi +30» mà đổi rv.Đường Dao Cầm.oan +18 [hh:lose] |
| Dư đồ · Rương của Từ Lăng Vân | Cài đồ vào rương nàng | ĐÚNG |  |
| Dư đồ · Rương của Từ Lăng Vân | Lục rương tìm chứng cứ | SAI | ẩn: staff.Tiểu Trung Tử.tin, staff.Lam Ngọc.tin, staff.Ngân Hạnh.tin, staff.Hạ Vân.tin [hh:win] | thẻ ghi «cung nhân của Tần Từ Lăng Vân bắt gặp: nàng thiện cảm -15, o» mà đổi rv.Từ Lăng Vân.oan +5 [hh:lose] |
| Dư đồ · Ôn Kiều Nguyệt | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Ôn Kiều Nguyệt | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Ôn Kiều Nguyệt | Bàn tán về Cố Lạc Anh | ĐÚNG |  |
| Dư đồ · Ôn Kiều Nguyệt | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Ôn Kiều Nguyệt | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Ôn Kiều Nguyệt | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Ôn Kiều Nguyệt | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Ôn Kiều Nguyệt | Tặng quà | ĐÚNG |  |
| Dư đồ · Ôn Kiều Nguyệt | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.Ôn Kiều Nguyệt.aff -15 [hh:win] |
| Dư đồ · Ôn Kiều Nguyệt | Dò la | SAI | ẩn: S.bac -15 [hh:lose,hh:win] | thẻ ghi «bị lộ, nàng oán ngươi +8» mà đổi rv.Ôn Kiều Nguyệt.oan +4 [hh:lose] | ẩn: rv.Ôn Kiều Nguyệt.aff -8 [hh:lose] |
| Dư đồ · Ôn Kiều Nguyệt | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Ôn Kiều Nguyệt | Bỏ độc vào trà nàng | HIỆU ỨNG ẨN | ẩn: S.duc -10 [hh:lose,hh:win] |
| Dư đồ · Ôn Kiều Nguyệt | Ngáng chân nàng | HIỆU ỨNG ẨN | ẩn: S.duc -4 [hh:lose,hh:win] | ẩn: rv.Ôn Kiều Nguyệt.aff -6 [hh:win] | ẩn: rv.Ôn Kiều Nguyệt.myaff -6 [hh:win] | ẩn: rv.Ôn Kiều Nguyệt.aff -12 [hh:lose] |
| Dư đồ · Ôn Kiều Nguyệt | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10» mà không đổi gì (thành) [hh:win] | thẻ ghi «Danh +3» mà không đổi gì (thành) [hh:win] | ẩn: S.duc -5 [hh:lose,hh:win] | thẻ ghi «oán ngươi +30» mà đổi rv.Ôn Kiều Nguyệt.oan +14 [hh:lose] |
| Dư đồ · Cố Lạc Anh | Hỏi han sức khỏe | ĐÚNG |  |
| Dư đồ · Cố Lạc Anh | Khen tài nghệ nàng | ĐÚNG |  |
| Dư đồ · Cố Lạc Anh | Bàn tán về Tô Lan Chi | HIỆU ỨNG ẨN | ẩn: rv.Cố Lạc Anh.aff +4 [hh:win] |
| Dư đồ · Cố Lạc Anh | Chia sẻ bí mật | ĐÚNG |  |
| Dư đồ · Cố Lạc Anh | Nhờ giúp đỡ | ĐÚNG |  |
| Dư đồ · Cố Lạc Anh | Cảnh báo nàng | ĐÚNG |  |
| Dư đồ · Cố Lạc Anh | Giúp đỡ nàng | ĐÚNG |  |
| Dư đồ · Cố Lạc Anh | Tặng quà | ĐÚNG |  |
| Dư đồ · Cố Lạc Anh | Khiêu khích | HIỆU ỨNG ẨN | ẩn: rv.Cố Lạc Anh.aff -15 [hh:win] |
| Dư đồ · Cố Lạc Anh | Dò la | SAI | ẩn: S.bac -15 [hh:lose,hh:win] | thẻ ghi «bị lộ, nàng oán ngươi +8» mà đổi rv.Cố Lạc Anh.oan +5 [hh:lose] | ẩn: rv.Cố Lạc Anh.aff -8 [hh:lose] |
| Dư đồ · Cố Lạc Anh | Tung tin đồn | ĐÚNG |  |
| Dư đồ · Cố Lạc Anh | Ngáng chân nàng | HIỆU ỨNG ẨN | ẩn: S.duc -4 [hh:lose,hh:win] | ẩn: rv.Cố Lạc Anh.aff -6 [hh:win] | ẩn: rv.Cố Lạc Anh.myaff -6 [hh:win] | ẩn: rv.Cố Lạc Anh.aff -12 [hh:lose] |
| Dư đồ · Cố Lạc Anh | Vu oan | SAI | thẻ ghi «nàng mất Danh và Sủng -10» mà không đổi gì (thành) [hh:win] | thẻ ghi «Danh +3» mà không đổi gì (thành) [hh:win] | ẩn: S.duc -5 [hh:lose,hh:win] | thẻ ghi «oán ngươi +30» mà đổi rv.Cố Lạc Anh.oan +19 [hh:lose] |

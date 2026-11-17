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

### Makeup (Điểm trang): the six result levels — owner 17/11 05:03Z / 05:16Z (OD:L1553-1554). ONE label source: `TOIL_MK` (jtoil.js; `toilMkW` inside a sentence: a name keeps its capital, only "mặt mộc" is lower case)

| Level id (code, saves) | Player name | Meaning |
|---|---|---|
| `moc` | Mặt mộc | no makeup: her own face, no layer |
| `vung` | Vụng về | a part went wrong: smeared lip / cheek (brows untouched), funny but still pretty |
| `vua` | Đoan trang | a decent face, the light layer; not enough for a big occasion |
| `dep` | Kiều diễm | the beautiful level (positive); what big occasions / bold đề require |
| `tuyet` | Khuynh thành | the most beautiful: luminous, never heavy |
| `diem` | Diêm dúa | OVERDONE beyond the occasion or her rank (still pretty, never clownish); judged with the word "phô trương" |

- Preset groups the player picks from (`TOIL_STY`): **Kiểu thanh nhã** · **Kiểu cầu kỳ** (bold, elaborate, NOT negative; owner 03:38Z). A preset shows ONLY its own name (owner 03:35Z: never "(sắc lạnh)" / "(sắc ấm)").
- The hidden tone a person / a Hội phối đồ đề likes, once she learns it (`TOIL_TONE`): **tông đào cam** · **tông hồng tím**. Hoàng thượng's row in "Điều ngài thích": **Son phấn**.
- Never use "đẹp / tuyệt / vừa / vụng" as a level name on screen; "đoan trang" is not used for dress hints any more (dress: "chỉnh tề", "y phục đoan trang" for the dress taste).

**Ghen (điểm) vs Chạnh lòng (cảm xúc)** (owner OD 17/11 ~18:25Z (g)): the jealousy SCORE (`v.ghen`, `v.pg`, chips "Ghen", "Ngươi ghen N") keeps the word **Ghen**; the short jealous FEELING (mood seal key `ghen`, `EMO.ghen`) is named **Chạnh lòng** — one constant `EMO_GHEN` in jemo.js (owner's pick pending; a rename is that one line). A memory waking a feeling reads: "gặp X, chợt nhớ chuyện cũ: …" · "trở lại <nơi>, chợt nhớ chuyện cũ: …" · "tròn một năm ngày …".

Từ đã cổ trang, giữ nguyên: Bạc, Sức, Sủng, Danh, Sắc, Tài, Tâm cơ, Đức, Tai mắt, Ân tình, Phúc duyên, Lòng, Chủ tin, thiện cảm, oán, ghen, khắc, quẻ, thẻ bài, thị tẩm, tấn phong, sắc phong, lãnh cung, cấm túc, ân thưởng, bổng lộc, Phi tần, Phe phái, Kẻ hầu, Con cái, Rương đồ, Tài nghệ, Bảng phẩm vị.

## 2. Xưng hô và giọng cung đình (theo phẩm, theo người nói, theo tình)

Nguồn đối chiếu (chuyên gia, sếp OD:L1327): bản lồng tiếng / phụ đề Việt của *Hậu cung Chân Hoàn truyện*, *Hậu cung Như Ý truyện*, *Diên Hy công lược*, tiểu thuyết cung đấu; lễ chế hậu cung nhà Thanh (chủ vị = phẩm Tần trở lên mới làm chủ một cung, được tự xưng "bổn cung" và được gọi "nương nương"; phẩm dưới chỉ là "tiểu chủ", ở nhờ trong cung của chủ vị).

**Một lõi duy nhất (sếp OD:L1267):** mọi lời thoại lấy xưng hô từ `kAddr(người nói, người nghe, {tình, chốn})` trong `dev/build/jvoice.js`; dòng thoại viết bằng thẻ `{goi}` (gọi người nghe), `{Goi}` (viết hoa đầu câu), `{xung}` / `{Xung}` (tự xưng), `kSay(nói, nghe, câu)` điền thẻ. Không ai gõ tay "tiểu chủ / nương nương / thần thiếp…" vào câu thoại nữa.

### 2.1 Lời kể, nhãn, thẻ, chip
| Chỗ | Người chơi là |
|---|---|
| Lời kể, nhãn, thẻ, chip, sổ ghi | **ta** (sếp 15/11: "Con của ta", "Hoàng hậu với ta"; j84 đổi trên màn hình) |
| Lời NPC trong “…” | gọi theo bảng 2.2, KHÔNG gọi trống "ngươi" trừ khi giận hoặc người trên quở người dưới |
| Người khác ở ngôi thứ ba | nàng ta (nữ), y / hắn (nam), bệ hạ, Thái hậu, vị ấy |

### 2.2 Ai gọi ai thế nào
| Người nói → người nghe | Tự xưng | Gọi | Ghi chú |
|---|---|---|---|
| Phi tần (mọi phẩm) → Hoàng thượng | thần thiếp | Hoàng thượng | thân mật lắm mới "Hoàng thượng…" kèm làm nũng; không bao giờ "chàng" |
| Phi tần → Thái hậu | thần thiếp | Thái hậu | lễ: "Thần thiếp thỉnh an Thái hậu, Thái hậu vạn phúc kim an" |
| Phi tần → Hoàng hậu | thần thiếp | Hoàng hậu nương nương / nương nương | |
| Phi tần thấp → phi tần cao hơn | tần thiếp | "‹phẩm› nương nương" (người nghe từ Tần) · "tỷ tỷ" (thân) | Chân Hoàn: "Tần thiếp tham kiến Hoa phi nương nương" |
| Phi tần cao (từ Tần) → phi tần thấp | bổn cung | muội muội · "‹phẩm›" khi lạnh nhạt · "ngươi" khi quở | |
| Phi tần dưới Tần → phi tần thấp hơn | ta | muội muội / muội | chưa làm chủ vị thì không "bổn cung" |
| Phi tần ngang phẩm, thân | muội / tỷ | tỷ tỷ / muội muội (theo tuổi) | "hai ta" được |
| Phi tần ngang phẩm, ghét | ta | "‹phẩm› muội muội" giọng mát mẻ | lời ngọt mà gai, xem 2.4 |
| Hoàng thượng → phi tần (cả người chơi, kể cả khi nàng là Hoàng hậu) | trẫm | **chỉ hai chữ** (sếp 16/11 ~21:05Z): **nàng** (Sủng dưới `BAL.voice.aiPhi`) · **ái phi** (Sủng từ `BAL.voice.aiPhi`); không gọi phẩm, không "ngươi"; lời ngắn, không dài dòng | gọi Hoàng hậu (người khác): "Hoàng hậu"; gọi Thái hậu: "mẫu hậu" |
| Thái hậu → phi tần | ai gia | con (thương, hiếm) · "‹phẩm›" (bình thường) · ngươi (giận, răn) | gọi Hoàng thượng: "Hoàng đế"; gọi Hoàng hậu: "Hoàng hậu" |
| Hoàng hậu → phi tần | bổn cung | muội muội · "‹phẩm›" khi răn · ngươi khi trị tội | |
| Kẻ hầu → chủ mình | nô tỳ (nữ) · nô tài (thái giám) | tiểu chủ (chủ dưới Tần) · nương nương (chủ từ Tần) · **chủ tử** (lúc thân, lo lắng, khuyên can) | |
| Kẻ hầu → phi tần khác | như trên | "‹phẩm› tiểu chủ" / "‹phẩm› nương nương" | |
| Kẻ hầu → Hoàng thượng / Thái hậu / Hoàng hậu | nô tài / nô tỳ | Hoàng thượng · Thái hậu · Hoàng hậu nương nương | nhận lỗi: "Nô tỳ đáng chết" |
| Kẻ hầu nói về chủ với người ngoài | — | "chủ tử nhà nô tỳ / nô tài" | |
| Chủ → kẻ hầu | bổn cung (từ Tần) · ta (dưới Tần) | tên · ngươi · "ma ma", "cô cô" (cung nữ lớn tuổi), "công công" (thái giám có chức) | |
| Kẻ hầu với nhau | ta / tỷ / muội | tên · tỷ tỷ · ma ma · công công | |
| Thái y, quan, sứ thần, họa sư, nhạc sư → phi tần | vi thần | tiểu chủ / nương nương như kẻ hầu | thị vệ: "nô tài"/"ti chức" |
| Chế độ cung nữ (người chơi là kẻ hầu) | nô tỳ | chủ gọi: tên / ngươi | |

**Quy tắc phẩm:** Đáp ứng, Thường tại, Quý nhân = **tiểu chủ**; Tần, Phi, Quý phi, Hoàng quý phi = **nương nương**; Hoàng hậu = **Hoàng hậu nương nương**. Gọi bằng phẩm: có phong hiệu thì hiệu + phẩm ("Hy tần", "Uyển quý nhân"); phẩm một chữ không có hiệu thì họ + phẩm ("Từ phi", "Âu Dương tần"), không gọi trống "Phi", "Tần". Bị biếm vào lãnh cung: kẻ hầu vẫn gọi theo phẩm cũ nếu còn trung, kẻ bạc bẽo gọi trống "ngươi" (chỉ trong cảnh lãnh cung). Không bao giờ dùng: bạn, tôi, em, anh, chị (trừ "chị em" kết nghĩa), mình (trừ "một mình", phản thân trong lời kể).

**Câu hợp phẩm người nghe (sếp 16/11 ~21:05Z):** mỗi chùm câu chia theo **bậc phẩm của người nghe** (`kBand`, jvoice): **lo** = tiểu chủ (Đáp ứng, Thường tại, Quý nhân) · **mid** = chủ một cung (Tần, Phi) · **hi** = Quý phi, Hoàng quý phi · **hq** = Hoàng hậu. Câu chỉ hợp một bậc mang thẻ đầu câu `[lo]`, `[mid,hi]`…; câu không thẻ phải hợp mọi bậc. Câu kiểu "nhớ thời mình mới vào cung" chỉ nói với tiểu chủ, không bao giờ với Quý phi; "chủ một cung", "mẫu nghi thiên hạ" không nói với Thường tại. Khi nàng là Hoàng hậu, mọi người gọi "Hoàng hậu nương nương", tự xưng "thần thiếp". Test: `dev/test/voice-band.js`.

**Chơi chung:** câu của một sự việc chung (người khác nói về một phi tần khác…) truyền `o.shared` cho `kLine`: hai bên cùng thấy một câu (xoay theo tuần + buổi, không lấy ngẫu nhiên riêng).

### 2.3 Lời lễ (dùng trong thỉnh an, nhận chỉ, tạ tội)
- Thỉnh an: "Thần thiếp thỉnh an Hoàng hậu nương nương, nương nương vạn phúc kim an." — đáp: "Đứng lên đi." / "Bình thân."
- Hoàng thượng tới: thái giám xướng "Hoàng thượng giá lâm!"; phi tần: "Thần thiếp cung nghênh Hoàng thượng, Hoàng thượng vạn phúc kim an."
- Nhận ân: "Tạ ơn Hoàng thượng" · "Tạ ân điển của Thái hậu". Nhận chỉ: "Thần thiếp lĩnh chỉ." Nhận lỗi: "Thần thiếp biết tội." / "Nô tỳ đáng chết."
- Cáo lui: "Thần thiếp xin cáo lui." · đuổi: "Lui ra đi." · "Ai gia mệt rồi."

### 2.4 Giọng cung đấu (cách nói, không chỉ cách gọi)
1. **Nói vòng, không nói thẳng.** Khen để răn, hỏi để ép: "Muội muội thật khéo chăm chút, chỉ e cây cao thì đón gió." thay cho "Ngươi diện quá".
2. **Ngọt mà có gai.** Kẻ thù cười nói như chị em: "Tỷ tỷ phúc dày, đâu như muội phận mỏng." Người trên răn bằng ân: "Ai gia nói vậy cũng là vì muốn tốt cho con."
3. **Thành ngữ, bốn chữ.** Dùng vừa phải, mỗi câu tối đa một: cây cao đón gió, tai vách mạch rừng, họa từ miệng mà ra, mẫu nghi thiên hạ, đức hạnh vẹn toàn, an phận thủ thường, thuận nước đẩy thuyền, ngư ông đắc lợi, một bước lên mây, rút dây động rừng, ăn nói cẩn trọng (cẩn ngôn thận hành), hoa không đỏ trăm ngày, lòng người khó đoán, lấy lui làm tiến, nhẫn một bước trời cao biển rộng.
4. **Lấy vật nói người.** Hoa, trăng, trà, cờ, chim lồng: "Hoa nở rộ quá, e chẳng bền." · "Chim trong lồng hót hay đến mấy cũng là chim trong lồng."
5. **Trên dưới rõ ràng.** Người dưới khiêm (thần thiếp ngu muội, nô tỳ không dám), người trên ban (thưởng cho ngươi, ai gia cho phép). Bị khen: khiêm ("Thần thiếp không dám nhận"); bị chê: nhận rồi biện ("Thần thiếp biết tội, chỉ là…").
6. **Theo tâm trạng và quan hệ.** Cùng một việc, người thương nói ấm, người ghét nói mát, người trên giận nói gọn và lạnh. Mỗi tình huống lặp lại có một **chùm câu** (≥ 4 câu, chia theo tâm trạng / quan hệ / kết quả), không lặp câu trong `BAL.voice.noRepeat` ngày (jvoice `kLine`).

### 2.5 Lời giải thích được / mất (thẻ việc, kết quả)
Giữ rõ luật (mục 4): con số, bậc may rủi, Tốn/Thành/Hỏng/Kèm không đổi. Câu chữ kèm theo viết theo giọng cung: nói được gì, mất gì, ai vừa lòng ai phật ý — gọn, có hình ảnh, không sáo rỗng, không %.
| Khô | Cung đấu |
|---|---|
| Thái hậu thiện cảm +2 khi gặp hôm nay | Thái hậu khẽ gật đầu, ánh mắt dịu đi — thiện cảm +2 |
| Hỏng thì Hoàng hậu phật ý | Hỏng thì Hoàng hậu ngoài mặt cười, trong lòng ghi một nét |
| Có rủi ro | Được ăn cả, ngã về không |
| Không đổi gì | Gió lặng sóng yên, chẳng ai để tâm |

**Hai dạng, một hàm (sếp 16/11 ~21:05Z):** cùng một dòng được / mất có **dạng NGẮN** — ô kết quả nhỏ dưới màn hình sau mỗi việc (`#rtoast`, chỉ thông tin) — và **dạng DÀI văn chương** — ô sự kiện, TIN, Sổ ghi, Tuần lục. Lõi: `kGL(ngắn, văn)` / `kLitLog(seq0, văn)` trong jvoice bọc phần văn trong `<span class="klit">`; ô kết quả gọi `kShort` (bỏ phần văn), mọi chỗ khác hiện đủ. Không viết hai câu riêng ở hai nơi.

### 2.6 Ví dụ trước / sau
| Trước | Sau |
|---|---|
| (Thái hậu, ngày nào cũng vậy) “Hôm nay ăn vận đoan trang, thật vừa mắt ai gia.” | chùm câu theo tình: “Quý nhân hôm nay ăn vận đúng mực, ai gia nhìn cũng thấy yên lòng.” · “Đoan trang mà không phô trương, mới ra dáng người trong cung.” · “Con biết giữ lễ, ai gia có lời khen.” … không lặp trong mấy ngày |
| (Hoàng hậu) “Muội ăn vận lộng lẫy như vậy, định át cả bổn cung sao?” | “Muội muội hôm nay rực rỡ quá, hoa nở rộ thì e chẳng bền đâu.” |
| (cung nữ, chủ là Thường tại) “Nương nương nghỉ sớm đi.” | “Tiểu chủ nghỉ sớm đi.” · lúc lo lắng: “Chủ tử, người phải giữ sức.” |
| (Hoàng thượng, Sủng thấp) “Quý nhân hôm nay khác hẳn mọi ngày, trẫm suýt không nhận ra.” | “Nàng hôm nay khác hẳn.” (Sủng cao: “Ái phi hôm nay khác hẳn.”) |
| (phi tần Thường tại nói với Phi) “Ta không dám.” | “Tần thiếp không dám, Phi nương nương.” |

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

- Nết (trait) names: the pre-judged villain nết "Hiểm độc" is now "Xảo quyệt" (owner 17/11 05:35Z). One label map TRAIT_OLD/traitLabel in j1.js; old saves migrate on load (trMigrate in deser).
- Nết (ONE TRAIT POOL, owner 17/11 05:45Z–06:20Z): the only nết words the player reads are the rows of BAL.net (jbal2.js): Tính tình Ân cần/Lạnh lùng, Nóng nảy/Điềm tĩnh, Nhiều chuyện/Kín đáo, Kiêu ngạo/Khiêm nhường (men: Cương trực/Xu nịnh); Lòng dạ Thật thà/Xảo quyệt, Thanh liêm/Ham lợi, Rộng lượng/Thù dai, Trọng nghĩa/Thực dụng; Chí hướng Tham vọng/An phận, Ham học/Ham vui, Mê tín/Thực tế, Vì gia tộc/Vì mình. Each row's tend/gain/cost text is cổ trang and shown as "Hay:" and the nết tooltip (Được … · Mất …). Old words (Hiền lành, Đa nghi, Nhu mì, Tham tiền, servant trung thành/tham lam/nhát gan/lanh lợi…) are never shown again; old saves map them (BAL.net.old).

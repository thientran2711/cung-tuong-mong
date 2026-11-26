# S1 — Rà soát toàn game Cung Tường Mộng

Ngày rà soát: 15/11/2026. Vai: **ĐIỀU PHỐI**. Người nhận: sếp và Claude.

**Nhận định của em:** game đã có một nền cung đấu đáng giữ: địa vị hữu hạn, nhiều quan hệ hai chiều, người hầu có thể bảo vệ hoặc phản chủ, vật phẩm có nguồn, mưu hại có chuẩn bị, và nhiều đời để khám phá. Bước làm game sâu hơn nên là nối những hệ ấy bằng **ký ức, trách nhiệm, thông tin và hậu quả có thể lần theo**, thay vì thêm nhiều thanh hay thêm tai họa ngẫu nhiên.

Đây là **ý kiến tư vấn**, không phải luật, thiết kế được duyệt, bản chốt số, hay chứng nhận kiểm toán. Mỗi đề nghị mang mã S1-xx để Claude trả lời nhận / để sau / bỏ. Những chỗ em nêu hành vi mã là căn cứ cho lời khuyên, chưa phải kết luận đã tái hiện đầy đủ trong mọi đường chơi. Em không đổi game, số cân bằng, tài liệu thiết kế, tranh, giao diện, giọng hay triển khai.

## Căn cứ và giới hạn kiểm tra

- Bản `main` khi bắt đầu rà: [`17e8fc0382027e20ed7b80fa884ed38ef29e7817`](https://github.com/thientran2711/cung-tuong-mong/tree/17e8fc0382027e20ed7b80fa884ed38ef29e7817). Trước khi gửi đã cập nhật nhánh lên [`64e91f1ae9379941d489dae4b01f9aa1603ba260`](https://github.com/thientran2711/cung-tuong-mong/tree/64e91f1ae9379941d489dae4b01f9aa1603ba260), đọc phần chênh lệch `player-dress`, `j66.js`, `j88.js` và PROGRESS mới; không có thay đổi kết luận về các hệ chơi dưới đây. Đã đối chiếu `AGENTS.md`, `CLAUDE.md`, nguồn trong “Rule sources”, các tệp thiết kế/trạng thái trong `dev/`, tài liệu co-op và những mô-đun liên quan trong `dev/build/`. Phần kit, chuyển động và mỹ thuật chỉ dùng để hiểu giới hạn và trạng thái; báo cáo không nhận xét hình thức.
- Quyết định mới lấy từ `dev/OWNER_DECISIONS.md` trên nhánh `claude/cung-tuong-mong-handover-hj0h8w`, đầu tiên blob `d95a8222954f0a4fb76977f7590e6ec149f4ca18`, kiểm lại trước gửi tới blob `6339091f0bd3243a72c36dfd13d7238600faa812`; đã đọc `WORKER_BRIEF.md` và `HANDOVER_1115_PM.md` trên nhánh ấy. Phần mới về lịch lễ công khai được nối vào §28; quyết định hình ảnh chỉ đối chiếu phạm vi, không biến thành lời khuyên hình thức. Các ghi chép giờ giấc không hoàn toàn theo thứ tự; không dùng một dòng cũ để phủ quyết lời sửa sau.
- Đã đọc `chatgpt-claims:S_LOG.md`: S1 đang chờ trả lời, chưa có PR. Trong `docs/ideas/` và `docs/reviews/chatgpt/` tại mốc rà chỉ có README; chưa có báo cáo tuần trước để loại trùng.
- `AGENTS.md` hiện tại chỉ có §1–§3, không có §9 được nhắc trong paste/README. Nhật ký đã thay mô hình kiểm từng mục bằng rà soát theo yêu cầu. Em thực hiện **yêu cầu S1 trực tiếp lần này** và tên tệp/nhánh/PR sếp chỉ định; không khôi phục lịch, cổng duyệt hay tự nhận quyền chốt.
- **Game trực tuyến:** đã thử mở URL được giao bằng trình duyệt, HTTP và công cụ đọc web; môi trường trả lỗi đường hầm/HTTP 403, nên không xác nhận được bản đang phục vụ trên GitHub Pages. Để vẫn xem hành vi thật, em phục vụ nguyên `index.html` đã đóng gói của mốc `main` ở máy cục bộ, không build. Đã mở một kiếp Quý nhân xuất thân Tể tướng, đọc Hành sự, Chí tôn, Phi tần, Nam nhân, Cung nhân, Ân oán, Phe phái, Hoàng tự, Tư trang, Tài nghệ, Mệnh truyện và chuyển một buổi: lượt khảo sát đó không ghi nhận lỗi JavaScript. Dùng cờ thử để bỏ tải tài nguyên/vòng Luân hồi; tài nguyên ngoài và mạng co-op không được kiểm trọn. Đây không phải phép đo cân bằng hay kiểm thử đủ một đời.
- Số trong `BAL`, `jbal2.js`, các `PROGRESS` và báo cáo đo được dùng để **hiểu bản đang có**. Những số đo ở các build, bot hoặc cấu hình khác nhau không được cộng lại thành bằng chứng cho bản hiện tại. Em không đặt thêm ngưỡng hay xác suất.

### Phân biệt việc đã có và việc chưa nằm trong bản rà

| Hệ | Căn cứ tại mốc rà | Cách hiểu trong báo cáo |
|---|---|---|
| Khảo hạch tấn phong | `jexam.js`, `jbal2.js`, `PROGRESS_promo-exam.md` | Đã có; không đề nghị xây lại. Sinh hoàng tử đổi thành ân thi là lựa chọn triển khai còn cần sếp quyết. |
| Bổng bằng vật phẩm, cắt xén | `jstip.js`, `ECONOMY.md` §6–§7 | Đã có; rà hậu quả và đường đòi công bằng. |
| Nhãn chính/phụ tuyến, hạn, đường không bạc | `jstory.js`, `jevb.js` | Đã có; cần rà đồng hồ và tính thật của người giúp. |
| Bốn buổi, nghỉ, Điểm trang, trung y | `jtime4.js`, `jrest.js`, `jtoil.js`, `jty.js` | Đã có; giữ nhịp sếp chốt. |
| Quà có độc, nghiệm độc, chân tình | `jpoison.js`, `jgift.js` | Đã có; cần tách phát hiện dấu lạ với kết tội đúng người. |
| Trẻ nhỏ, tư chất, học và hôn sự | `j53.js`, `j54.js`, `jht.js` | Đã có; rà sự trưởng thành và danh phận. |
| Thú nuôi bốn giai đoạn, chăm, hại/trộm | `jpet.js`, `jpetcare.js`, `PROGRESS_pets-fix.md` | Đã có với NPC; móc tác động thú của hảo hữu chưa nối relay. |
| Sinh hoạt, sổ vị trí và cổng động cơ thống nhất | `review/schedules2:dev/PROGRESS_schedules.md`, `j95*.js` | Đã tồn tại trên nhánh. `assemble.py` ở mốc rà chưa nạp j95; khảo sát cục bộ cũng chưa có `motiveOK`/`S.roster`. Không gọi đây là ý tưởng mới. |
| Khuê các ngoài cung | `review/outside:dev/OUTSIDE_PLAN.md`; mã/kế hoạch còn ở `review/routes` | Có kế hoạch và công việc trên nhánh; chưa nạp trong bản rà. |
| Tư tình, trốn, xuất cung hợp lệ, ẩn dật, nghiệm thân | `review/routes:dev/STORY_ROUTES_PLAN.md`, `jroute.js` | Đã có trên nhánh; lời khuyên là rà trước tích hợp. |
| Hoàng thái hậu / Nhiếp chính / Nữ đế | `review/succession2:dev/SUCCESSION_PLAN.md`, `j99succ.js` | Đã được sếp chọn là ba đường có điều kiện. Bản rà chưa nạp j99succ. Nữ đế không bị đổi lại thành kết hiếm. |
| Bảng vàng online | `review/rank-ui:dev/LEADERBOARD.md`, `jrank.js` | Có hệ riêng trên nhánh; bản rà mới có bục thi j90, chưa nạp jrank. |
| Độ khó và hướng dẫn tân thủ | `review/difficulty:dev/PROGRESS_difficulty.md`, `review/tutorial:dev/PROGRESS_tutorial.md` | Có việc sẵn; bản rà chưa nạp jdiff/jtut. |

### Cách đọc thẻ đề nghị

**Khả năng** là khả năng rủi ro thiết kế xảy ra: hiếm (**rare**), có thể (**possible**), dễ xảy ra (**likely**); đó là ước lượng định tính của em, không phải xác suất trong game. **Mức hại** là nhỏ / vừa / lớn (**small / medium / large**). **Khối lượng** ước lượng công việc riêng, cũng theo ba cỡ ấy. “Bắt/gỡ” gồm cách Claude phát hiện vấn đề và cách nhân vật hoặc bản cập nhật có thể sửa hậu quả. Mỗi mã có đúng một **VERDICT**, không coi lợi ích là đã được đo.

## Nguồn học từ game và phim

Đây là kỹ thuật em chọn học, không phải bảng xếp hạng khách quan. Chỉ mượn cách tạo quyết định, không lấy tài sản, tên riêng, thoại hay nội dung.

| Mã | Nguồn có tên | Điều học và giới hạn |
|---|---|---|
| G1 | [Crusader Kings III — giới thiệu của Paradox](https://www.paradoxinteractive.com/media/press-releases/paradox-interactive/long-live-the-king-crusader-kings-iii-now-available) | Bí mật và quan hệ có thể thành đòn bẩy chính trị. Ứng dụng của em: chứng cứ gắn người, việc và lợi ích; không biến mọi bí mật thành quyền cưỡng ép vô hạn. |
| G2 | [The Sims 4: Snowy Escape — EA nói về Sentiments](https://www.ea.com/able/news/snowy-escape-launch) | Trải nghiệm chung để lại tình cảm lâu dài. Ứng dụng: nhớ lần cứu giúp hay phản bội, khác với tâm trạng thoáng qua. |
| G3 | [RimWorld — Ludeon](https://rimworldgame.com/index.php?lang=en) | Game hướng tới câu chuyện phát sinh từ người và biến cố. Ứng dụng: khoảng yên, mất mát, hồi phục rồi bước ngoặt; không ép tai họa chỉ để đủ chỉ tiêu. |
| G4 | [Stardew Valley — ConcernedApe](https://www.stardewvalley.net/about/) | Đời sống mở, quan hệ và nhiều việc để tự chọn. Ứng dụng: chuẩn bị theo mùa, sở thích và lịch hẹn; không chép nhịp nông trại vào cung. |
| G5 | [Long Live the Queen — Hanako Games](https://hanakogames.itch.io/long-live-the-queen) | Chọn học gì và xử lý khủng hoảng tạo đường sống khác nhau. Ứng dụng: môn học mở cách giải quyết; tránh bắt người chơi biết trước đáp án bí mật. |
| G6 | *Chân Hoàn truyện*, *Như Ý truyện*, *Diên Hy công lược* | Tham khảo cách ân sủng biến thành thế lực, thể diện và món nợ; lời công khai khác ý riêng. Phim là nguồn thủ pháp kể chuyện, **không chứng minh y thuật, tố tụng hay tần suất đầu độc có thật**. |
| G7 | *Lục Trinh truyền kỳ*, *Đại Trường Kim* | Tham khảo niềm vui thành nghề, trách nhiệm bếp/kho/lễ và quan hệ thầy trò. Không coi chức danh, kỳ thi trong phim hay cung đình Triều Tiên là định chế nhà Thanh. |
| G8 | Bộ ý “Trùng Sinh — Top 15” đã được ghi trong `OWNER_DECISIONS`, `PROGRESS_ts_a.md` trên `review/ts-a`, `PROGRESS_ts_b.md` | Đây là **tổng hợp nội bộ đã có**, không phải em vừa kiểm chứng website gốc. Tái dùng việc đã làm; không lặp ý sếp đã bỏ về bí mật sinh con khi vua vô sinh. |
| G9 | [Fate of the Empress — mô tả của Wish Interactive trên Google Play](https://play.google.com/store/apps/details?hl=en-US&id=com.GF.palacem5uscn.hwyad.google) | Nhà phát hành giới thiệu nuôi con tới lớn, thú và đời sống ngoài vòng quan trường. Điều em chọn học: trò cung đình cần cả gắn bó và nhịp sống riêng, không chỉ chạy quyền lực. Đây là đối chiếu mô tả tính năng, không nhận đã chơi/đo toàn game, không mượn chiến đấu triệu hồi hay tài sản. |

## 1. Nền sử: một triều đại hư cấu phải có nội bộ nhất quán

**Mạnh nhất:** game có quyền tự do của một triều đại hư cấu, đủ chỗ cho hòa thân, nữ quan và đường Nữ đế. **Thiếu:** bộ phẩm vị mang dấu Thanh, nhưng Nam Chiếu, Tể tướng, lục cục và nhiều điển tích thuộc những bối cảnh khác. Nếu mọi thứ đều được giới thiệu như “đúng sử”, lời hứa ấy tự mâu thuẫn.

Nam Chiếu trong nghiên cứu sử gắn với thế kỷ VIII–đầu X, không phải một nước cùng thời Thanh; xem [nghiên cứu *Nanzhao as a Southeast Asian kingdom, c.738–902*](https://www.cambridge.org/core/journals/journal-of-southeast-asian-studies/article/abs/nanzhao-as-a-southeast-asian-kingdom-c738902/664A52DACC0381482F1BF4952E128A2F). Nữ quan lục cục có nguồn riêng, chẳng hạn [*Minh sử*, quyển 74](https://zh.wikisource.org/zh-hans/%E6%98%8E%E5%8F%B2/%E5%8D%B774).

**S1-01 — Khuyên chọn: giữ triều hư cấu, xác định xuất xứ từng nhóm thiết chế.** Claude có thể phân biệt điều mượn sử, điều theo phim và điều sếp cố ý hư cấu ngay trong lời giải thích nội dung. Hậu cung, quan trường và nước ngoài cùng vận hành theo một hệ danh phận của game; không cần đổi tên, bỏ xuất thân hay thay mỹ thuật. Học G1: một thế giới có quy tắc chính trị nhất quán quan trọng hơn gom nhiều danh từ cổ.

- **Rủi ro:** công việc nghiên cứu lan thành viết lại toàn thế giới. **Khả năng:** possible. **Mức hại:** medium. **Khối lượng:** medium; khả thi nếu rà theo nhóm danh phận, không làm lại truyện hàng loạt.
- **Bắt/gỡ:** tìm cùng một chức được trao hai quyền trái nhau; Claude ghi ngoại lệ hư cấu có chủ đích và chỉ sửa những câu khẳng định sai sử. Nếu phương án kéo theo đổi canon rộng, dừng ở chú giải tư vấn.
- **VERDICT: gain larger** — giữ bản sắc game mà tránh dạy người chơi một lịch sử ghép sai.

**S1-01B — Phương án khác: ép toàn bộ thành một triều Thanh thuần sử.**

- **Rủi ro:** đụng xuất thân, chức quan, lối riêng và kết cục sếp đã duyệt. **Khả năng:** likely. **Mức hại:** large. **Khối lượng:** large; chưa có cơ sở coi là đáng làm.
- **Bắt/gỡ:** lập danh sách nội dung phải bỏ trước khi quyết; giữ nguyên triều hư cấu nếu mất các đường chơi quan trọng.
- **VERDICT: risk larger** — chi phí phá bản sắc lớn hơn lợi ích của đồng nhất niên đại.

## 2. Chín xuất thân, tuyển tú và đời ngoài cung

**Mạnh nhất:** xuất thân đã khác nhau về tài nguyên, quan hệ và truyện, chứ không chỉ tên. `cn` là cung nữ đã được sủng, `cnv` mới là đường làm cung nữ; `ch` là cháu Thái hậu. **Thiếu:** ý nghĩa pháp lý của đường nhập cung và nghĩa vụ với nhà mẹ đẻ dễ bị rút thành lợi thế khởi đầu. Khuê các đã có trên nhánh; không nên xây một hệ thứ hai.

[Cố Cung, “Cung nữ chế độ”](https://www.dpm.org.cn/court/system/236418.html) phân biệt nguồn tuyển tú nữ và cung nữ thời Thanh. Vì vậy, con nhà buôn hay thầy đồ vào hậu cung theo đường của game cần được hiểu là đặc lệ của triều hư cấu, không phải quy trình Thanh phổ quát. Game giữ người trưởng thành theo quyết định sếp; không phục hồi tuổi tuyển lịch sử.

**S1-02 — Khuyên chọn: cho thân phận đi cùng một nghĩa vụ còn sống sau nhập cung.** Ví dụ nhà muối cần giữ đường cung ứng, nhà tướng cần tránh bị coi chuyên binh, nhà nghèo muốn bảo vệ người thân; nhân vật có thể thương lượng mức giúp thay vì luôn vâng lời hoặc cắt đứt. Tái dùng quan hệ gia đình, thư và truyện của nhánh ngoài cung. Học G4/G5: quyết định đầu đời tiếp tục có ý nghĩa, không biến đoạn ở nhà thành khóa luyện chỉ số bắt buộc.

- **Rủi ro:** xuất thân khó bị đánh thuế bằng nhiệm vụ, còn xuất thân mạnh nhận thêm lợi. **Khả năng:** possible. **Mức hại:** medium. **Khối lượng:** medium; khả thi bằng hệ thư/chương hiện có.
- **Bắt/gỡ:** so đường sống và quyền lựa chọn theo từng xuất thân; cho khất, nhờ người, từ chối có hệ quả hợp lý. Bỏ nghĩa vụ lặp vô hạn nếu nó chỉ là phí duy trì.
- **VERDICT: gain larger** — gia đình thành quan hệ thật, tăng giá trị chơi lại mà không cần thêm xuất thân.

## 3. Phẩm vị và Khảo hạch tấn phong

**Mạnh nhất:** điều kiện chỉ cho đủ tư cách, phải thi rồi mới được xét phong; NPC cũng phải qua. **Thiếu:** “đỗ”, “được chọn khi có ghế” và “đã nhận sắc phong” cần có ý nghĩa khác nhau. Bản hiện tại có ân thi sau sinh hoàng tử; đó chưa phải lời chốt riêng của sếp cho ngoại lệ ấy.

Thứ bậc Hoàng hậu, Hoàng quý phi, Quý phi, Phi, Tần, Quý nhân, Thường tại, Đáp ứng có cơ sở Thanh; [Cố Cung, “Hôn nhân chế độ của hoàng đế”](https://www.dpm.org.cn/topic/wedding_institution.html) mô tả hệ ấy và ngạch người. **Chưa có căn cứ ở nguồn đã tra để gọi khảo hạch phi tần mỗi lần tấn phong là lệ Thanh.** Giữ đây là thiết chế chơi do sếp chọn. Thi nữ quan trong G7 chỉ là gợi ý làm nghề, không phải bằng chứng lịch sử.

**S1-03 — Khuyên chọn: làm rõ giá trị của việc đỗ, và dùng bài thi để chuẩn bị cho trách nhiệm sắp nhận.** Phẩm thấp học quy trình; phẩm làm chủ cung xử nguồn lực, sai sót và người dưới; phẩm cao cân nhắc vụ án hoặc xung đột lợi ích. Tái dùng bài thi/môn hiện tại. Những bài có đáp án cố định nên kiểm hiểu việc, còn tình huống quản trị nên có lựa chọn hợp cảnh, không chỉ chọn câu đạo đức dài nhất. Học G5: học mở khả năng, nhưng chưa tự động mua được ghế.

- **Rủi ro:** quá nhiều thủ tục chặn nhịp leo phẩm đã được sếp giữ. **Khả năng:** possible. **Mức hại:** medium. **Khối lượng:** medium; khả thi bằng thay tình huống trong bộ thi sẵn có.
- **Bắt/gỡ:** xem thời gian chờ ghế sau đỗ, số lần thi lại và lý do trượt theo xuất thân; giữ cách để tài nghệ quyết định. Nếu dài hơn mục tiêu, Claude đo rồi chỉnh; em không đặt số.
- **VERDICT: gain larger** — thăng phẩm mang cảm giác đủ sức gánh việc, không chỉ đủ một dãy chỉ số.

**OPEN (hers):** sinh hoàng tử có được ân thi ngay, miễn điều kiện như `jexam.js:123`, hay vẫn theo lịch thường? Em nghiêng về ân thi như bản đang làm, đồng thời coi đứa trẻ là thành viên gia đình chứ không là vé mua phẩm. Quyền quyết thuộc sếp; không tự quay lại tự động thăng.

## 4. Giáng phẩm, cấm túc, lãnh cung và phục vị

**Mạnh nhất:** mất phẩm có tác động vào áo, đồ, tiền và nơi ở; lãnh cung vẫn có hành động và đường trở lại. **Thiếu:** người chơi cần hiểu ai có quyền phạt, tội nào đã được xét, khi nào được xin giảm hoặc phục vị. Mất một vụ không nên xóa luôn mọi quan hệ đã xây.

“Lãnh cung” không phải tên một tòa duy nhất trong lịch sử Minh–Thanh; nhà nghiên cứu Cố Cung Tấn Hồng Quỳ giải thích điều này trong [bài về *Cố Cung doanh kiến lục bách niên*](https://www.chinanews.com/cul/2021/04-21/9460340.shtml). Trường Môn viện là lựa chọn của game, có thể giữ. G6 gợi ý hay nhất là sự cô lập và nhân tình đổi mặt, không phải danh mục án phạt có thể chép nguyên.

**S1-04 — Khuyên chọn: gắn mỗi án phạt với một vụ và một đường phục hồi phù hợp.** Chẳng hạn hết cấm túc khác được minh oan; được thương lại khác phục nguyên danh dự; phục vị khác tấn phong mới. Tái dùng chứng cứ, ân xá, thư lãnh cung và người bảo trợ hiện có. Những người từng chịu ơn có thể giúp bằng việc cụ thể trong phạm vi quyền của họ.

- **Rủi ro:** xin tha trở thành đường xóa mọi tội, khiến làm ác luôn có lợi. **Khả năng:** possible. **Mức hại:** large. **Khối lượng:** medium; khả thi nếu giữ hậu quả riêng của từng vụ.
- **Bắt/gỡ:** theo dõi ai tha, tha điều gì và điều gì còn tồn tại; lời thú tội/ân xá không biến chứng cứ thành chưa từng có. Nếu một vòng xin tha bị lạm dụng, hạn chế đúng đặc ân ấy thay vì cấm toàn bộ đường phục hồi.
- **VERDICT: gain larger** — thất thế trở thành một hồi đời đáng chơi thay vì màn chờ chết.

## 5. Cung điện, chủ vị, ra vào và sinh hoạt NPC

**Mạnh nhất:** ngạch chủ vị, người ở thiên điện, lời mời và nơi cấm đã tạo không gian xã hội thật. Nam nhân có ca trực/lệnh vào cung tốt hơn rải người tùy tiện. **Thiếu:** các hệ vẫn cần cùng hiểu một người đang làm gì, ở đâu và có quyền ở đó không; không thể dựa mãi vào nhiều lời mô tả độc lập.

Lấy cảm hứng G4 về thói quen và G1 về địa vị; nguồn [Cố Cung về cung nữ](https://www.dpm.org.cn/court/system/236418.html) cũng cho thấy quy mô hầu hạ tùy thân phận. Không suy từ đó rằng mọi triều đều có đúng cấu trúc phòng/ngạch mà game đang chọn.

**S1-05 — Khuyên chọn: ưu tiên nối việc đã có trên `review/schedules2`, rồi khai thác quan hệ đồng cung.** Thói quen, sổ vị trí và cổng động cơ của nhánh ấy không phải ý mới. Đề nghị mới là cho việc dùng chung nhân lực/quyền tiếp khách tạo những trao đổi có nguyên cớ: xin chủ vị bảo lãnh, chia người hầu khi có lễ, hoặc xin đổi nơi ở sau xung đột. Tận dụng nhà ở và quan hệ sẵn có.

- **Rủi ro:** tích hợp hai hệ lịch làm NPC xuất hiện mâu thuẫn hoặc áp quyền chủ vị quá rộng. **Khả năng:** possible. **Mức hại:** large. **Khối lượng:** large; khả thi theo từng nhóm hành vi, sau rà độc lập nhánh đang có.
- **Bắt/gỡ:** đối chiếu cùng người/cùng thời điểm ở dư đồ, cuộc gặp, tai mắt và truyện; thử cả chết, cấm túc, đổi chủ vị và co-op. Nếu trao đổi đồng cung gây kẹt, bỏ riêng việc ấy, giữ sổ vị trí đã kiểm.
- **VERDICT: gain larger** — cung điện thành nơi có người sống và có quyền hạn, thay vì danh sách điểm đến.

## 6. Sủng, lật thẻ và thị tẩm

**Mạnh nhất:** đã có thiên tính hoàng đế, tâm trạng, việc nước, gu, hối lộ Kính sự phòng, tranh sủng và mức chán một sủng phi. **Thiếu:** cần luôn phân biệt được lật thẻ, được triệu, đổi ý và thực sự có một đêm gần gũi; chúng không đương nhiên đồng nghĩa.

Kính sự phòng có cơ sở thể chế; [Cố Cung về Càn Đông ngũ sở](https://www.dpm.org.cn/explore/building/236577.html) ghi nơi này từng có Kính sự phòng. Tuy nhiên, nguồn đó **không chứng minh toàn bộ nghi thức thị tẩm chi tiết thường kể trên phim**. G6 là nguồn dựng kịch tính cho thẻ bài; không dùng truyền thuyết phòng ngủ làm sự thật chắc chắn.

**S1-06 — Khuyên chọn: nối kết quả đêm với diễn biến thực, đồng thời để Sủng có đường tăng ban ngày.** Bản đã có hầu cờ, đàn, dạo và yết kiến; không thêm lại. Đề nghị là để những việc ấy tạo ký ức riêng hợp tính vua, và chỉ tính quan hệ đêm/thụ thai khi đúng sự kiện đã diễn ra. Khi quốc sự, bệnh hoặc tang khiến đêm đổi, nguyên nhân ấy theo cả NPC. Học G2/G5: sự thân gần có nhiều hình thức và tài nghệ có giá trị riêng.

- **Rủi ro:** ký ức ban ngày cộng chồng lợi ích thành đường tranh sủng luôn thắng. **Khả năng:** possible. **Mức hại:** medium. **Khối lượng:** medium; khả thi bằng các hoạt động đã có.
- **Bắt/gỡ:** đối chiếu sổ thẻ, đêm và thai; đo đường chỉ giao tiếp ban ngày so với các lối khác. Nếu cộng lợi quá mạnh, giảm phần cộng mới sau đo, giữ ý nghĩa câu chuyện.
- **VERDICT: gain larger** — hoàng đế thành người có đời sống và lịch làm việc, không chỉ một lượt xổ thẻ.

## 7. Ân tình và quà chân tình

**Mạnh nhất:** Sủng khác Ân tình; chân tình hiện dựa việc tự làm, đúng ý, đủ gắn bó và không vừa xin việc. **Thiếu:** sự thân thiết vẫn dễ được hiểu như tích điểm rồi tiêu khi xin tha. Cũng cần phân biệt một món đúng điều kiện game với lời phán xét “người này thật lòng”.

G2 cho bài học về ký ức chung; *Như Ý truyện* gợi ý mối thân quen có thể còn ngay khi địa vị suy. Đó là thủ pháp nhân vật, không phải công thức ân tình có thật trong sử.

**S1-07 — Khuyên chọn: cho một số kỷ niệm đã xảy ra trở lại trong hành vi, không thêm thanh Chân tình.** Ví dụ vua nhớ lần nàng không tranh công; món thêu cũ được giữ, hoặc lời hứa chưa làm được khiến người nhận dè chừng. Tái dùng nguồn/người làm của món đồ và sổ sự kiện; Ân tình vẫn là khái niệm riêng với hoàng đế như sếp chốt.

- **Rủi ro:** ký ức thành lá bùa miễn nghi ngờ hoặc quà đúng gu bị lặp để thao túng. **Khả năng:** possible. **Mức hại:** medium. **Khối lượng:** medium; khả thi với vài sự kiện mốc, không phải nhớ mọi cuộc trò chuyện.
- **Bắt/gỡ:** chỉ cho ký ức tác động đúng hoàn cảnh; mâu thuẫn mới vẫn có trọng lượng. Gỡ lợi ích máy móc nếu món lặp luôn là tối ưu, giữ phản ứng nhận ra món cũ.
- **VERDICT: gain larger** — người chơi thấy một quan hệ có quá khứ thay vì chỉ nhìn số tăng.

## 8. Bốn buổi, khắc, hạn và nhịp một đời

**Mạnh nhất:** nhịp bốn buổi đã được sếp giữ; có đi xuyên buổi và phân biệt việc nhỏ/việc dài. **Thiếu:** một buổi đại diện cho phần thời gian mô phỏng, không phải một tuần lịch sử có đúng một ngày. Mọi hạn và tuổi cần nhất quán với cách nén đó.

Căn cứ đáng rà ngay: `jtime4.js:8` đặt `B4N=4`; nhưng `jstory.js:16–17` vẫn dùng `wk()*3 + buoi` và đổi ngày bằng ba buổi. Đây là khác biệt trực tiếp trong mã nạp, không phải đề nghị tăng tốc game.

**S1-08 — Khuyên chọn: Claude rà cả họ đồng hồ trên cùng quy ước bốn buổi.** Ưu tiên hạn lo bạc, hạn nhận việc, lỡ kỳ thi, cấm túc, thai kỳ, chăm thú và co-op. Học G4: hẹn và mùa phải đáng tin để người chơi lập kế hoạch. Giữ tổng nhịp đã chốt, không dùng lần sửa này để tăng việc hay tăng tần suất hại.

- **Rủi ro:** sửa cách tính hạn vô tình làm hạn của sổ cũ hết ngay hoặc đổi nhịp thai/sinh. **Khả năng:** possible. **Mức hại:** large. **Khối lượng:** medium; khả thi nhưng cần kiểm trường hợp đang dở.
- **Bắt/gỡ:** thử nhận lời ở buổi tối, qua tuần/tháng, ghi/nạp, và người đi xuyên buổi; đếm số buổi thực đã tiêu. Nếu hạn cũ bị hiểu sai, bảo toàn thời gian còn lại của việc đã nhận thay vì phạt người chơi.
- **VERDICT: gain larger** — mọi chiến lược về thời gian đều cần một chiếc đồng hồ đáng tin.

## 9. Sức, nghỉ, bệnh và hồi phục

**Mạnh nhất:** Sức là tài nguyên chính; nghỉ lát và dưỡng sức có vai trò khác; bệnh và người chăm đã tồn tại. **Thiếu:** sau bệnh nặng, bị phạt hay sinh con, hồi phục dễ thành thao tác bù Sức, ít mang cảm giác có người chăm hoặc việc phải nhờ.

Hồ sơ [Cố Cung, *Ý Quý phi ngộ hỉ đương*](https://www.dpm.org.cn/ancient/archive/148518.html) có ghi thái y trực, người phục vụ và đồ điều dưỡng sau sinh. Nguồn cho thấy tổ chức chăm sóc, không cho phép suy ra tỷ lệ tử vong hay hiệu lực thuốc của game.

**S1-09 — Khuyên chọn: dùng các trạng thái bệnh sẵn có để tạo thời gian giao việc và nhận chăm sóc.** Người hầu đáng tin có thể giữ lời hẹn, bạn đồng cung gửi đồ đúng nhu cầu, đối thủ quyết định giúp hay lợi dụng. Học G3/G2: khoảng hồi phục cũng tạo chuyện. Không đề nghị thêm một dãy nhu cầu ăn/ngủ/vệ sinh cho nhân vật chính.

- **Rủi ro:** biến dưỡng bệnh thành chuỗi chờ mất quyền chơi, hoặc bắt buộc mua thuốc. **Khả năng:** possible. **Mức hại:** medium. **Khối lượng:** medium; khả thi qua bệnh, lệnh kẻ hầu và quà hiện có.
- **Bắt/gỡ:** kiểm trong lúc bệnh còn lựa chọn đáng làm nào; cho hoạt động nhẹ và nhờ giúp phù hợp. Nếu khoảng hồi phục chỉ kéo dài thời gian, rút phần chờ mới, không xóa các quan hệ đã phát sinh.
- **VERDICT: gain larger** — chăm sóc trở thành quan hệ và lựa chọn, tăng chiều sâu cho cả lúc không tranh sủng.

## 10. Thời tiết, mùa và điềm báo

**Mạnh nhất:** thời tiết đã tác động nơi gặp, việc ngoài trời và rủi ro; sếp đã bỏ phạt thêm khắc đi đường. **Thiếu:** cần theo dõi hậu quả của cùng một đợt thời tiết, thay vì mỗi lần ra ngoài lại nhận tai nạn rời rạc.

**S1-10 — Khuyên chọn: nối một đợt rét/mưa với việc chăm lo cụ thể trong cung.** Than cấp thiếu dẫn đến khiếu nại, áo/ô đã có giúp đúng việc, người ốm được hỏi thăm; sau đợt rét, chuyện được giải hoặc để lại ân oán. Tái dùng than bổng, bệnh và bối cảnh ngoài trời. Học G4 về chuẩn bị theo mùa; lễ mùa có căn cứ riêng ở §28, không coi mọi biến thể thời tiết là nghi lễ lịch sử.

- **Rủi ro:** cộng chồng lạnh, thiếu than và tốn Sức thành phạt kép người nghèo. **Khả năng:** likely nếu các hệ chạy độc lập. **Mức hại:** medium. **Khối lượng:** medium; khả thi vì có vật phẩm và nguyên nhân sẵn.
- **Bắt/gỡ:** theo dõi cùng nguyên nhân gây bao nhiêu hậu quả trong một đợt; kiểm NPC và thai phụ. Gỡ phần phạt trùng, giữ việc ứng phó; không khôi phục phụ phí khắc do thời tiết.
- **VERDICT: gain larger** — mùa tạo cách chuẩn bị khác nhau mà vẫn giữ luật đi đường sếp đã chốt.

## 11. Thiện cảm, oán, ghen và làm lành

**Mạnh nhất:** thiện cảm và oán đã được tách; người ta có thể còn quý nhưng chưa hết giận. Ghen là động cơ hại người có điều kiện, không đồng nghĩa cứ được sủng là mọi người lập tức ác. **Thiếu:** cơ chế quà và xin lỗi dễ lấn át ký ức về đúng việc đã gây tổn thương.

**S1-11 — Khuyên chọn: làm lành theo món nợ quan hệ, dùng hai trục hiện có.** Người bị bỏ mặc khi ốm cần được chăm; người bị vu oan cần được trả thanh danh; quà đắt có thể tăng thiện cảm mà không xóa oán về chuyện ấy. Học G2 về ký ức riêng của từng cặp người. Chân Hoàn và Như Ý là tham chiếu kịch tính về ân nghĩa lâu dài, không phải bằng chứng rằng cung phi lịch sử đều hành xử như phim.

- **Rủi ro:** cất nhiều chuyện vụn khiến NPC giữ hận vô hạn hoặc trừng phạt lặp. **Khả năng:** possible. **Mức hại:** medium. **Khối lượng:** medium; tái dùng sự kiện nổi bật, không cần ghi mọi câu nói.
- **Bắt/gỡ:** xem một chuyện có tiếp tục phát phạt sau khi đã sửa không; cho lời giải đúng nguyên nhân và dấu hiệu quan hệ đã đổi. Nếu ký ức gây lặp, dừng hiệu ứng đang chạy nhưng giữ lịch sử đã xảy ra.
- **VERDICT: gain larger** — hòa giải trở thành lựa chọn có ý nghĩa, không chỉ chuyển bạc thành điểm.

## 12. Đức, danh tiếng, tâm cơ và nội tâm

**Mạnh nhất:** game có nhiều cách sống, không chỉ một đường được sủng; Đức và tính cách có thể kìm hành vi hại người. **Thiếu:** nguy cơ đồng nhất giỏi mưu với độc ác, nghèo với thiếu giáo dưỡng, hoặc ghen với toàn bộ nhân cách. Cảm xúc tức thời cũng cần khác đánh giá lâu dài của cung đình.

**S1-12 — Khuyên chọn: để cùng một tổn thương có các cách đáp theo tính cách đã cố định của kiếp.** Có người ghen nhưng tự kiềm, có người tránh mặt, có người đòi công bằng, có người mới tìm cách hại. Tâm cơ giúp hiểu tình thế, không tự tẩy hành vi thành tốt; danh tiếng là điều người khác biết, không phải máy đọc Đức thật. Học G3 về con người có điểm mạnh, điểm yếu và hoàn cảnh.

- **Rủi ro:** thêm quá nhiều nhánh cảm xúc nhưng không đổi hành động; hoặc lời giải thích trở thành tiết lộ mọi bí mật NPC. **Khả năng:** possible. **Mức hại:** small. **Khối lượng:** medium; ưu tiên các phản ứng trong sự kiện sẵn có.
- **Bắt/gỡ:** đối chiếu hành động với tính cách và điều NPC thực sự biết; gộp các phản ứng trùng chức năng, giữ khác biệt có hậu quả. Không đổi sở thích ngẫu nhiên mỗi lần gặp.
- **VERDICT: gain larger** — NPC khó đoán vì có đời sống, nhưng vẫn nhất quán để người chơi học được.

## 13. Tai mắt, tin đồn và giới hạn biết chuyện

**Mạnh nhất:** Tai mắt, thám tin, giấu vật và lời báo đã cho người chơi cách chuẩn bị trước. Kế hoạch sổ vị trí còn đặt câu hỏi đúng: một người đang ở đâu, làm gì, có thể chứng kiến gì. **Thiếu:** phân biệt sự thật trong thế giới với lời người báo, nhận định của chủ nhân và tin công khai.

**S1-13 — Khuyên chọn: mỗi tin quan trọng có đường đến và mức đáng tin bằng lời.** Báo cáo trực tiếp, nghe kể lại, suy đoán và lời thú nhận có giá trị khác nhau. Người hầu trung thành vẫn có thể nhìn nhầm; người oán vẫn có thể nói thật. Học G1 về bí mật và người biết bí mật. Chỉ cung cấp điều nhân vật có thể biết; không cần thêm thanh điểm tin cậy.

- **Rủi ro:** người chơi cảm thấy game giấu điều thiết yếu hoặc mọi tin đều vô dụng. **Khả năng:** possible. **Mức hại:** medium. **Khối lượng:** medium; cần nối người báo với sự kiện gốc.
- **Bắt/gỡ:** với mỗi cáo buộc, lần ngược ai thấy gì và ai truyền lại; bảo đảm có cách kiểm chứng phù hợp. Nếu tin sai do lỗi trạng thái, hủy hậu quả do lỗi ấy và trả chi phí, không gọi lỗi là “mưu sâu”.
- **VERDICT: gain larger** — xây mạng lưới tai mắt trở thành việc đọc người và đối chiếu nguồn.

## 14. Mưu kế, trộm, cháy, hủy dung và trả đũa

**Mạnh nhất:** nhiều hành vi đã có giá, đối tượng, phản tác dụng và đường phát hiện; kho đồ thật làm mất mát đáng kể. **Thiếu:** khi nhiều hệ cùng nhắm một người yếu, hậu quả có thể nối thành chuỗi không còn lựa chọn. Một lần thất bại cũng chưa chắc tạo thay đổi trong quan hệ giữa chủ mưu, người làm thuê và nạn nhân.

**S1-14 — Khuyên chọn: dùng một vụ việc có người chịu trách nhiệm và hậu quả kéo dài vừa đủ.** Một vụ trộm kéo theo đồ thất lạc, người giữ chìa khóa bị nghi, lựa chọn bồi thường hay tố giác; không phát thêm vụ độc lập chỉ vì nạn nhân đang yếu. Học G1/G3: mưu kế hay nhờ sự tham gia và động cơ của nhiều người, không chỉ một lần tung kết quả. Giữ các lối phòng bị đã có, tránh buộc mua thêm bảo hiểm thường trực.

- **Rủi ro:** chuỗi quá dài che mất nguyên nhân, hoặc nhờ thuộc hạ thành cách miễn trách nhiệm cho chủ mưu. **Khả năng:** possible. **Mức hại:** large với hại không hồi phục. **Khối lượng:** medium; áp dụng trước cho một họ vụ đã có.
- **Bắt/gỡ:** theo vết vật, lệnh và người thực hiện; kiểm nạn nhân còn đường chữa, kiện, phục hồi hoặc đổi đường sống. Khóa phần hậu quả trùng cùng vụ, cho bồi hoàn có căn cứ; không tự hoàn tác mọi thất bại hợp lệ.
- **VERDICT: gain larger** — ít vụ nhưng có dây người và hậu quả sẽ sâu hơn tăng mật độ tai họa.

## 15. Độc, thử độc và cách giải độc

**Mạnh nhất:** độc đã gắn với món đồ cụ thể, người tặng, khả năng chặn và hậu quả; người chơi cũng chịu rủi ro khi dùng mưu. **Thiếu nghiêm trọng:** `jpoison.js` hiện mô tả kim bạc đổi đen là có độc; lựa chọn kim bạc phát hiện mọi món độc rồi cộng bằng chứng chống người tặng. Đó là ba khẳng định khác nhau bị gộp: phát hiện chất lạ, chứng minh độc, xác định thủ phạm.

[*Tẩy oan tập lục* qua bản tại Thư viện Quốc hội Hoa Kỳ](https://www.loc.gov/resource/gdcwdl.wdl_17865_001/) cho thấy thử bạc thuộc lịch sử pháp y. [Nghiên cứu về giới hạn thử bạc](https://pubmed.ncbi.nlm.nih.gov/24660656/) không xác nhận bạc là máy dò mọi độc. Không có cơ sở để biến xạ hương thành bảo đảm sảy thai trong mọi hoàn cảnh, hay một thuốc giải dùng chung thành kiến thức y khoa thật.

**S1-15 — Khuyên chọn: giữ thử độc làm hành vi thận trọng, tách kết quả quan sát khỏi kết luận.** Kim, lời thái y, thức ăn còn lại và tình trạng người dùng là các đầu mối có giới hạn. Chất độc trong game có thể là chất hư cấu với tác dụng được quy ước rõ trong thế giới; tránh đưa công thức, liều hay cách sử dụng thật. Học G5: chuẩn bị giúp tăng cơ hội sống, nhưng công cụ phải có phạm vi nhất quán. Giữ phạm vi đối tượng sếp đã chốt, không mở mặc định sang hành thích Hoàng đế/Thái hậu.

- **Rủi ro:** bỏ sự bảo đảm hiện có khiến người chơi mất lớp phòng thân, nhất là kiếp nghèo. **Khả năng:** likely nếu chỉ giảm công dụng. **Mức hại:** large. **Khối lượng:** medium; cần sửa cả mô tả, sự kiện, chứng cứ và đối sách.
- **Bắt/gỡ:** kiểm toàn bộ đường ăn, quà, thử, khám và chữa; luôn còn lựa chọn từ chối, giữ mẫu hoặc nhờ kiểm phù hợp. Bảo toàn công dụng đã mua trong sổ cũ cho đến khi có phương án chuyển tương đương; không âm thầm khiến dụng cụ cũ thành vô ích.
- **VERDICT: gain larger** — sửa ngộ nhận lịch sử và mở điều tra thật sự, với điều kiện không lấy mất đường sống hiện có.

**S1-15B — Phương án sau, không khuyên: giữ kim bạc chắc chắn phát hiện mọi độc và tự chỉ ra người tặng có tội.** Có thể tiện, nhưng chỉ đứng vững nếu gọi rõ là pháp khí giả tưởng và cả thế giới chấp nhận hệ quả ấy.

- **Rủi ro:** làm vô hiệu phần lớn điều tra, đồng nhất chuyển quà với đầu độc, truyền kiến thức sai. **Khả năng:** likely. **Mức hại:** large. **Khối lượng:** small để giữ nguyên, medium để hòa giải các hệ quả.
- **Bắt/gỡ:** tìm các vụ người tặng vô tình đưa đồ bị tráo, mọi độc đều bị bắt; nếu tiếp tục dùng, bỏ kết luận thủ phạm tự động. Chuyển sang S1-15 khi có đường phòng bị tương đương.
- **VERDICT: risk larger** — sự tiện không bù được việc đóng cả hệ mưu và chứng cứ bằng một vật.

## 16. Bằng chứng, tố cáo, xét xử và phục hồi

**Mạnh nhất:** đã có thu thập chứng cứ, thám thính, phủ nhận, vu cáo và hậu quả tố sai. **Thiếu:** độ mạnh của lời tố, sự thật khách quan và quyết định chính trị của người xử có thể bị gộp thành một con số. Bảo hộ sau khi được minh oan cũng cần khác sự miễn truy cứu cho mọi hành vi mới.

**S1-16 — Khuyên chọn: một vụ án phân biệt điều đã chứng minh, điều còn nghi và phán quyết.** Người được che chở có thể thoát án dù chưa sạch nghi; người vô tội bị xử có đường tìm chứng cứ mới, xin phục hồi danh phận, lấy lại đồ hoặc sửa lời đồn. Học Chân Hoàn về việc bằng chứng bị sử dụng trong quyền lực, và G1 về người nắm bí mật. Đây là chất liệu kịch, không khẳng định cung đình lịch sử có chuẩn tố tụng hiện đại.

- **Rủi ro:** xử theo quyền thế làm người chơi thấy mọi chuẩn bị vô ích; sửa bảo hộ có thể khiến một người bị tố liên tiếp. **Khả năng:** possible. **Mức hại:** large. **Khối lượng:** medium; giữ cơ chế hiện có, nối hồ sơ vụ và người quyết định.
- **Bắt/gỡ:** theo dõi vụ cũ, chứng cứ mới và hành vi mới; cho lời giải thích nguyên nhân phán quyết mà không tiết lộ bí mật chưa biết. Claude đo tác động trước khi đổi thời hạn bảo hộ; nếu vòng tố cáo trở lại, khôi phục bảo vệ chống lặp cùng vụ.
- **VERDICT: gain larger** — công lý trở thành nơi đấu trí có thể hiểu được, và minh oan có tác dụng ngoài cộng điểm.

## 17. Mang thai, sinh nở và thời gian sau sinh

**Mạnh nhất:** đã có theo dõi thai, chăm thai, thái y, nguy cơ sinh, hậu thưởng; sếp đã nhấn mạnh phần thưởng sau sinh. **Thiếu:** thai kỳ dễ bị trải nghiệm như chờ nhận con hoặc phòng độc, còn sinh xong trở về nhịp thường ngay. Đứa bé, mẹ sinh, người chăm và người bảo trợ cần cùng có hậu quả xã hội.

Hồ sơ *Ý Quý phi ngộ hỉ đương* nói trên cho thấy người đỡ sinh, trực chăm và lễ sau sinh; không chứng minh các tỷ lệ rủi ro trong BAL. Phim Như Ý có thể gợi cảm giác cô độc, áp lực sinh nối dõi; không dùng phim làm chứng cứ dược tính hay chẩn đoán.

**S1-17 — Khuyên chọn: phát triển chăm sóc và lựa chọn sau sinh trên hệ hiện có.** Ai trông con lúc mẹ dưỡng bệnh, ai nhận công chăm sóc, quà nào thực dùng, lời hứa nào được giữ; mẹ vẫn có việc nhẹ và quyền quyết định. Học G2/G3: sinh con đổi lịch sống và quan hệ, không chỉ sinh ra một chỉ số nối dõi. Tách việc có con khỏi tình yêu của Hoàng đế và khỏi tự động được tấn phong.

- **Rủi ro:** biến thai/sinh thành giai đoạn người chơi mất quyền chơi hoặc gán trách nhiệm mất con cho lựa chọn nhỏ không thể biết. **Khả năng:** possible. **Mức hại:** large. **Khối lượng:** medium; nội dung và liên kết trạng thái là phần chính.
- **Bắt/gỡ:** kiểm mọi mất mát có dấu hiệu, nguyên nhân và đối sách phù hợp; không dùng điềm hay cảm xúc làm chẩn đoán chắc. Bỏ phần chờ hoặc hậu quả mới nếu chỉ làm mẹ yếu hơn mà không có lựa chọn; giữ kết quả sinh hợp lệ đã xảy ra.
- **VERDICT: gain larger** — thai và sinh trở thành một chương đời, sâu hơn việc tăng thưởng hoặc tăng tai biến.

## 18. Huyết thống, cha thật và “nhỏ máu nhận thân”

**Mạnh nhất:** kế hoạch lối riêng phân biệt cha thật và bí mật cần che giấu, cho tình cảm ngoài cung hậu quả lâu dài. **Thiếu:** kế hoạch có đoạn xét máu dựa vào cha thật và nước bị can thiệp; nếu được diễn đạt như phép kiểm huyết thống đúng, game sẽ hợp thức hóa một sai lầm nổi tiếng trong phim.

[Hội Truyền máu Trung Quốc](https://csbt.org.cn/plus/view.php?aid=127360) giải thích nhỏ máu hòa nhau không xác nhận cha con. Cảnh trong Chân Hoàn đáng học ở việc thao túng niềm tin và phiên xử, không ở giá trị xét nghiệm.

**S1-18 — Khuyên chọn: nếu giữ cảnh nhỏ máu, kết quả chỉ đổi điều triều đình tin.** Cha thật là sự thật của thế giới; người công nhận con, người nuôi con và người biết bí mật là các quan hệ riêng. Một phép thử cổ không tự sửa cha thật. Không đưa xét nghiệm hiện đại vào bối cảnh.

- **Rủi ro:** thêm trạng thái huyết thống pháp lý làm rối đường kế vị và sổ con cũ. **Khả năng:** possible. **Mức hại:** large. **Khối lượng:** medium; nên thống nhất trước khi nhập nhánh lối riêng và kế vị.
- **Bắt/gỡ:** thử con được nhận, bị nghi, được minh oan và cha thật qua đời; đối chiếu điều mỗi NPC biết. Nếu dữ liệu cũ thiếu, giữ quan hệ đang được công nhận, không hồi tố kết tội người chơi.
- **VERDICT: gain larger** — giữ được cao trào cung đấu và hậu quả xã hội mà không biến mê tín thành khoa học.

## 19. Con cái, tư chất, nuôi dạy và ký ức gia đình

**Mạnh nhất:** con có tư chất, trưởng thành, giáo dưỡng và đường tương lai; không chỉ là điều kiện tấn phong. **Thiếu:** tư chất dễ thành xếp hạng “con tốt/con bỏ”, còn nuôi dạy thành tối ưu ứng viên nối ngôi. Quan hệ với mẹ sinh, người nuôi, anh chị em và người dạy cần tồn tại ngay cả khi không tranh ngôi.

**S1-19 — Khuyên chọn: dùng tư chất ổn định để mở sở trường và trở ngại khác nhau, không định giá tình thân.** Một đứa học chậm nhưng giữ lời, một đứa rất sáng nhưng sợ kỳ vọng, anh chị có thể che chở hoặc cạnh tranh. Việc chăm và lời hứa để lại ký ức cụ thể; có đường thành tựu ngoài làm vua. Học G2/G3 về con người không hoàn hảo, G1 về gia đình có lợi ích riêng. Lễ giáo của triều giả tưởng cần ghi rõ là quy ước game, không suy tính cách từ huyết thống như sự thật lịch sử.

- **Rủi ro:** thêm gánh quản lý từng con hoặc biến tính cách thành án định sẵn. **Khả năng:** possible. **Mức hại:** medium. **Khối lượng:** medium; dùng các mốc trưởng thành đã có.
- **Bắt/gỡ:** xem người chơi có thể chăm con tư chất thấp mà vẫn có kết quả đáng quý; kiểm con có lựa chọn khác kỳ vọng của mẹ. Nếu nội dung chỉ đổi lời nhưng vẫn một điểm tổng quyết định tất cả, bỏ điểm tổng mới, giữ khác biệt hành vi.
- **VERDICT: gain larger** — khiến người chơi thương từng đứa trẻ, tạo lý do sống tiếp ngoài cuộc đua tối ưu.

## 20. Kế vị, đích thứ, mật chỉ và ba đường cầm quyền

**Mạnh nhất:** kế vị đã xét nhiều mặt, và nhánh `succession2` đã có ba lựa chọn chủ động: Hoàng thái hậu, nhiếp chính, Nữ đế. Nữ đế là đường sếp cho phép chọn, không được hạ thành kết hiếm ngoài ý muốn. **Thiếu:** chuẩn kế vị công khai và mật chỉ cần được hòa giải; danh phận mẹ lúc hiện tại không đủ diễn tả lịch sử pháp lý của con. Trong `j51.js`, xét “đích” đang dựa vào mẹ hiện là Hoàng hậu.

[Cố Cung về chế độ mật kiến trữ](https://www.dpm.org.cn/court/system/236361.html) và [Đệ nhất Lịch sử đương án quán, di chiếu Đạo Quang](https://fhac.com.cn/treasure/detail/1774.html) cho căn cứ một mô hình Thanh cụ thể. Đó không phải tục chung của mọi triều, cũng không phải luật “con trai Hoàng hậu luôn thắng”. [Ohio State, Võ Tắc Thiên](https://origins.osu.edu/read/wu-zetian-woman-emperor-china) giúp phân biệt nhiếp chính với tự xưng hoàng đế; không biến con đường khác thường ấy thành thông lệ Thanh.

**S1-20 — Khuyên chọn: thống nhất mô hình truyền ngôi và lưu đúng danh phận đã được công nhận.** Nếu đời vua dùng mật chỉ, số đo sức ủng hộ chỉ là nhận định chứ không là người chơi đọc được toàn văn di chiếu. Nếu dùng lập trữ công khai, việc lập/phế phải là sự kiện chính trị. Con được lập làm đích hay được nhận nuôi cần có dấu mốc pháp lý riêng, thay vì đổi theo áo mũ hiện tại của mẹ. Ba đường cầm quyền dùng các liên minh và trở lực đã có trong kế hoạch, không thêm một ngưỡng chung để bấm thắng.

- **Rủi ro:** sửa nền kế vị làm đổi người thắng trong kiếp đang chơi và mâu thuẫn kết hiếm cũ. **Khả năng:** likely nếu nhập các nhánh riêng lẻ. **Mức hại:** large. **Khối lượng:** large; cần rà cả truyện, con, mẹ, quan lại, chiếu và kết.
- **Bắt/gỡ:** đối chiếu các trường hợp Hoàng hậu bị phế, con nuôi, người được lập chết trước vua, vua chết trong co-op; bảo toàn danh phận đã công nhận của sổ cũ. Nếu chưa nối đủ, giữ đường cũ hoạt động và ghi đường mới chưa sẵn, không thay nửa chừng.
- **VERDICT: gain larger** — kế vị là trục kết của toàn game; thống nhất trước khi thêm biến cố sẽ tránh cao trào tự phủ nhận nhau.

## 21. Công chúa, hôn sự và nhà ngoại

**Mạnh nhất:** con gái có hôn sự và tước hiệu, đủ điều kiện thành nhân vật chính trị. **Thiếu:** `j54.js` hiện có một dãy “Công chúa → Trưởng công chúa → Cố Luân công chúa”. “Trưởng công chúa” thường chỉ quan hệ thế hệ với vua trong những hệ chế khác; Cố Luân/Hòa Thạc là hai loại tước Thanh, có quy định xuất thân và có đặc phong. Không phải mọi tên gọi ấy là các bậc của một thang.

[Bảo tàng Cung vương phủ về công chúa Thanh](https://www.pgm.org.cn/pgm/xsyjou/202101/973187d48a7444e88ca8e8055cd552f7.shtml) và [Cố Cung về các công chúa Càn Long](https://www.dpm.org.cn/explode/others/255113.html) cho ví dụ cần đọc cả thân phận lẫn sắc phong, không chỉ một nhãn.

**S1-21 — Khuyên chọn: tách quan hệ thân thuộc, tước được phong và quyền lợi của hôn sự trong logic truyện.** Với triều hư cấu, sếp có thể giữ đặc phong; lời kể cần nói vì sao được phong thay vì coi đổi đời vua là tự leo tước. Hôn sự tạo người thân mới, nghĩa vụ và lựa chọn của người con trưởng thành; không chỉ cộng thế lực cho mẹ. Học G1 về liên minh có người chịu hậu quả, giữ giới hạn trưởng thành sếp đã chốt.

- **Rủi ro:** biến con gái thành vật trao đổi hoặc sửa tước làm mất phần thưởng cũ. **Khả năng:** possible. **Mức hại:** medium. **Khối lượng:** medium; liên quan con, gia phả và kết truyện.
- **Bắt/gỡ:** kiểm người con có tiếng nói và đường sống khác cuộc hôn nhân; giữ quyền lợi sắc phong cũ như đặc lệ được công nhận, sửa câu giải thích trước khi đụng phần thưởng.
- **VERDICT: gain larger** — chính danh rõ hơn, đồng thời con gái có đời sống ngoài vai trò tài nguyên phe phái.

## 22. Thái hậu, Hoàng hậu và quyền quản hậu cung

**Mạnh nhất:** đã có hai trung tâm quyền lực ngoài Hoàng đế, thỉnh an và quan hệ bảo trợ. **Thiếu:** nếu mọi việc quy về tăng thiện cảm để xin ân, quyền quản người, lễ, cấp phát và giữ thể diện của hai ngôi này chưa được chơi đủ. Vua yêu ai cũng không đồng nghĩa người ấy được toàn quyền vận hành cung.

Tài liệu [Nội vụ phủ và pháp chế tại Cố Cung](https://www.dpm.org.cn/classify_detail/262767.html) cho thấy có cơ quan và phạm vi việc, không phải mọi chuyện đều do người được sủng tự quyết. [Thực đơn tiết đông của Thái hậu tại Bảo tàng Quốc gia Trung Quốc](https://www.chnmuseum.cn/zp/zpml/gjwxbt/202008/t20200824_247144.shtml) là ví dụ việc chăm một ngôi cao kéo theo tổ chức cụ thể; không dùng một hiện vật để suy ra toàn bộ quyền pháp lý của mọi Thái hậu.

**S1-22 — Khuyên chọn: thêm chiều trách nhiệm vào các quyền đã có.** Khi được giao quản việc, nhân vật phải xử món bổng thiếu, xung đột cung nhân hoặc nghi thức; quyết định giúp một người có thể làm người khác bất mãn. Hoàng hậu/Thái hậu đánh giá cách làm theo tính cách và lợi ích, không cùng thích một câu nịnh. Nếu người chơi lên ngôi ấy, việc cũ quay lại dưới góc người chịu trách nhiệm. Học G5 và G6 về mâu thuẫn giữa tình riêng với việc chung.

- **Rủi ro:** lên cao lại bị bắt làm việc vặt, hoặc ngôi cao biến thành quyền phạt vô hạn. **Khả năng:** possible. **Mức hại:** medium. **Khối lượng:** medium; tái dùng vụ án, kho và nhân sự.
- **Bắt/gỡ:** lựa việc có đánh đổi thật, cho giao việc nhưng vẫn chịu trách nhiệm; kiểm có lối khiếu nại người quản. Nếu công việc mới chỉ lặp thu/phát đồ, bỏ lượt lặp ấy, giữ quyết định quan trọng.
- **VERDICT: gain larger** — leo phẩm mở một kiểu chơi mới, chứ không chỉ hưởng thu nhập và sủng lớn hơn.

## 23. Quan trường, phe phái và nhà mẹ đẻ

**Mạnh nhất:** đã có nhóm quan và các nhà quyền lực, tạo chiến trường rộng hơn hậu cung. **Thiếu:** “nhà Hộ bộ” hay “nhà Binh bộ” có thể bị hiểu như một chức vụ cha truyền con nối; một phe cũng không nên là tất cả thành viên cùng muốn một việc mãi mãi.

Nghiên cứu của Evelyn S. Rawski, [*The Last Emperors: A Social History of Qing Imperial Institutions*](https://www.ucpress.edu/books/the-last-emperors/paper), là đầu mối nghiên cứu phù hợp cho quan hệ gia đình và thiết chế Thanh. Em đã kiểm thông tin sách, không nhận là đã đọc toàn văn hay dùng sách để chứng minh chi tiết chưa tra.

**S1-23 — Khuyên chọn: cho phe sẵn có một lợi ích cụ thể và người đại diện có nhiệm kỳ đời người.** Gia đình khác cơ quan; người giữ chức có thể mất chức mà họ hàng vẫn còn. Hỗ trợ chuyện cung ứng, hôn sự, lập trữ hay cứu một người tạo món nợ khác nhau, không mua luôn toàn bộ phe. Học G1: liên minh bền vì lợi ích và ký ức, vẫn có bất đồng nội bộ. Không đề nghị thêm thanh “thế lực” song song với tài nguyên hiện có.

- **Rủi ro:** chính trị lan ra quá nhiều NPC và người chơi không đọc nổi nguyên nhân đổi phe. **Khả năng:** possible. **Mức hại:** medium. **Khối lượng:** large nếu làm đầy đủ; khả thi hơn khi dùng ngay đại diện đã có.
- **Bắt/gỡ:** chỉ mở xung đột quanh vụ người chơi tham gia; kiểm việc đổi quan có vô tình xóa cả nhà hay không. Nếu quá rối, giữ số phe hiện tại và giản lược người trung gian, không làm tất cả thành viên thành một ý chí.
- **VERDICT: gain larger** — tăng chiều sâu chính trị mà vẫn tận dụng dàn nhân vật hiện hữu.

## 24. Cung nhân, người hầu riêng và đường cung nữ/Ma ma

**Mạnh nhất:** đã có việc, bậc nghề, lương, người theo hầu, phản chủ và bảo vệ; thiện cảm của người hầu khác mức người chơi tin họ. Đường `cnv` là đời làm việc thực sự, không chỉ đoạn chờ được vua nhìn thấy. **Thiếu:** thành nghề, bàn giao việc, người dạy nghề và quyền lợi lúc bị chủ đổ lỗi cần có sức nặng tương đương đường thành phi.

[*Minh sử*, quyển 74](https://zh.wikisource.org/zh-hans/%E6%98%8E%E5%8F%B2/%E5%8D%B774) có nữ quan và tổ chức lục cục; [Cố Cung về cung nữ](https://www.dpm.org.cn/court/system/236418.html) cho bối cảnh Thanh khác. Chức Ma ma không phải tên gọi chung của bất kỳ phụ nữ chỉ cần leo đủ cấp; tuổi, kinh nghiệm, việc nuôi dạy/phục vụ phải được đặt trong quy ước game. G7 giúp kể niềm vui giỏi nghề, không chứng minh hệ phẩm của game có thật.

**S1-24 — Khuyên chọn: làm đường nghề đáng kết một đời bằng uy tín trong công việc và người mình đào tạo.** Sửa được vụ kho sai, giữ được người dưới khỏi oan, để lại người kế nhiệm là các thành tựu dùng cơ chế nhiệm vụ/quan hệ đã có. Người hầu riêng có lợi ích và giới hạn; trả lương, bảo vệ và cho nghỉ đúng việc quan trọng hơn chỉ tặng quà để mua trung thành.

- **Rủi ro:** thêm gánh quản trị hoặc biến nghề thành chuỗi thao tác dài hơn tranh sủng. **Khả năng:** possible. **Mức hại:** medium. **Khối lượng:** medium; ưu tiên mốc nghề thay vì giao việc mỗi buổi.
- **Bắt/gỡ:** so khả năng có kết đáng quý của kiếp không được sủng với kiếp thành phi; kiểm cáo buộc người hầu có thể được phản biện. Gỡ nhiệm vụ lặp nếu chỉ làm chậm, không xóa thành quả nghề.
- **VERDICT: gain larger** — mở chiều sâu cho người muốn sống tốt trong cung mà không làm vợ vua.

**OPEN (hers):** đường cung nữ/Ma ma tiếp tục lên bậc nghề như hiện tại hay có khảo hạch riêng? Khảo hạch tấn phong phi tần đã được sếp chốt; không tự áp nó cho mọi nghề. Em nghiêng về đánh giá qua việc thật ở mốc nghề, tránh chép nguyên bài thi phi tần.

## 25. Bạc, bổng phẩm và mức sống theo phẩm

**Mạnh nhất:** bổng đã gồm đồ dùng thật, có thể dùng/tặng/bán; phận thấp có áp lực kinh tế thật. **Thiếu:** cần biết kinh tế đang yêu cầu người chơi sống bằng bổng, kiếm thêm hay bán đồ; nếu đồ bổng chỉ tồn tại để đổi bạc ngay, việc chuyển từ tiền sang vật vẫn chưa tạo đời sống.

*Quốc triều cung sử* có chế độ cấp bạc và vật theo thân phận; [bài dẫn sử liệu trên Nhân Dân](https://culture.people.com.cn/n/2013/0922/c172318-22985871.html) cho ví dụ phân biệt khoản theo năm và khẩu phần. Không lấy mức lịch sử đổi thẳng thành bạc/tháng trong game: lịch, sức mua và mục tiêu chơi khác nhau.

**S1-25 — Khuyên chọn: dùng chính đồ bổng để đáp nhu cầu theo mùa, quà và nghề hiện có.** Than có việc vào mùa rét, vải dùng cho áo hoặc tác phẩm; người đủ đồ có quyền giữ, chia hay bán. Claude đo rổ chi tiêu thực của từng phẩm, cả khi bệnh/cấm túc, trước khi chỉnh bạc. Học G4: tài nguyên có nhiều công dụng tạo lựa chọn, không cần thêm nhiều loại tiền.

- **Rủi ro:** ép phải giữ mọi thứ vì sợ nhiệm vụ bí mật, hoặc làm đồ thường khó kiếm chỉ để duy trì thiếu thốn. **Khả năng:** possible. **Mức hại:** medium. **Khối lượng:** medium; ưu tiên công dụng của vật đã có.
- **Bắt/gỡ:** xem tỷ lệ đồ bổng thực dùng và lý do bán, đối chiếu kiếp mới nghèo; nhu cầu quan trọng phải được báo hợp cảnh. Nếu đồ mới thành phí sống bắt buộc, bỏ phí ấy trước khi tăng bổng bù.
- **VERDICT: gain larger** — vật phẩm trở thành đời sống thay vì một bước trung gian đổi bạc.

## 26. Nội vụ phủ cắt xén, bảo trợ và đòi bổng

**Mạnh nhất:** cắt xén đã có nguyên nhân thật: thất sủng, án phạt, oán của bề trên, lòng tham, người hầu không trung thành; có che chở và xử lý. Đây đúng hướng hơn tung một lần “xui”. **Thiếu:** người chơi có thể thấy bị thiếu mà chưa biết thủ phạm; kết quả cần phân biệt khoản thiếu, người ra lệnh, người ăn chặn và điều còn nghi.

*Nội vụ phủ hiện hành điều lệ* có ghi việc cấp phát và xử lý ăn bớt trong ngữ cảnh cụ thể; [bản văn được số hóa](https://www.shidianguji.com/book/CADAL02024795/chapter/1lm6hte0xllba) là đầu mối, không đủ để nói mọi người thất sủng thời Thanh đều bị bớt theo một công thức. Nguyên nhân hiện tại là quy ước chơi đã duyệt.

**S1-26 — Khuyên chọn: cho đòi lại bổng thành một vụ nhỏ có thể lần theo.** Đối chiếu phần đáng nhận, vật đã tới, người giao; nhờ bảo trợ, thương lượng hoặc tố cáo có đánh đổi. Bồi hoàn bằng chính đồ thiếu hoặc giá trị tương ứng, tránh nhận kép. Giữ ngoại lệ Hoàng đế/Hoàng hậu không bị cắt như bản đang có. Học G7 về uy tín người quản kho, G1 về bảo trợ có giá.

- **Rủi ro:** phải làm án kho mỗi kỳ mới được sống, hoặc đưa tiền lót tay thành thuế bắt buộc. **Khả năng:** likely nếu lặp vụ quá thường. **Mức hại:** medium. **Khối lượng:** medium; nối các nguyên nhân và lựa chọn đã có.
- **Bắt/gỡ:** đếm số lần bị cắt cùng nguyên nhân, xem đã xử xong mà người giao còn ăn bớt không; kiểm trừ án phạt rồi cắt xén có vô tình tính hai lần. Cho giải quyết nguyên nhân kéo dài, gỡ lặp sau khi vụ đã kết.
- **VERDICT: gain larger** — bất công có người, nguyên nhân và đường xử lý, tạo cung đấu đời thường thay vì phí ngẫu nhiên.

## 27. Tư trang: chợ, cầm đồ, quà, tác phẩm, y phục và Điểm trang

**Mạnh nhất:** nhiều vật có nguồn, phẩm chất và công dụng; cầm/bán/tặng/làm tác phẩm tạo lối kiếm sống. Y phục có quy chế, phẩm chất khác bậc được phép; Điểm trang và trung y đã có, không còn chỉ một bộ áo mặc suốt đời. **Thiếu:** danh dự của người làm/người tặng và cách biết quy chế cần đi cùng giá tiền. Quà qua nhiều tay cũng cần tách người đưa khỏi người can thiệp.

### Chợ, cầm đồ và tặng nhận

**S1-27 — Khuyên chọn: giữ dấu của món đồ có ý nghĩa, không ghi lịch sử mọi đồ vặt.** Tác phẩm từng dâng, vật được ban, vật cầm vì túng và đồ bị trộm có thể quay lại trong quan hệ. Người nhận biết sự chăm chút và hoàn cảnh họ có thể biết, không đọc được “chân tình thật” trong đầu người chơi. Giữ riêng các hạn chế hiện có với đồ Ngự tứ; dấu nguồn gốc không mở quyền bán/cầm/tặng món vốn bị cấm. Học G4 về quà theo người, G2 về món đồ gắn kỷ niệm. Không đề nghị thêm chợ đấu giá hay một tiền tệ mới.

- **Rủi ro:** nguồn gốc đồ làm nặng trạng thái; vòng mua–tặng–bán tạo lợi vô hạn hoặc nhân bản đồ. **Khả năng:** possible. **Mức hại:** medium. **Khối lượng:** medium; chỉ áp cho vật đáng nhớ.
- **Bắt/gỡ:** lần theo một món qua mua/cầm/chuộc/tặng/trộm/ghi nạp; người bán mất đúng vật, người nhận có đúng vật. Nếu phát hiện bản sao, khóa giao dịch đang lỗi và trả nguồn gốc hợp lệ, không xóa cả kho.
- **VERDICT: gain larger** — đồ vật kể chuyện và tạo hệ quả xã hội, không cần tăng số lượng hàng.

### Tự làm và giá trị tay nghề

**S1-28 — Khuyên chọn: dùng yêu cầu của người đặt việc để làm tác phẩm có mục đích.** Áo cho người bệnh, tranh mừng thọ, món dùng trong lễ cần đúng người/việc; chất lượng là lợi thế nhưng không thay sự hợp cảnh. Thất bại có thể sửa, tặng người khác hoặc giữ, thay vì mọi món dưới bậc cao đều thành rác. Học G7 về thành nghề, G4 về chọn dùng hay bán; không xây lại bộ công thức đã có trong `ITEMS_EARNED.md`.

- **Rủi ro:** yêu cầu bí mật làm người chơi phí nguyên liệu, hoặc đơn hàng trở thành cách farm bạc tốt nhất. **Khả năng:** possible. **Mức hại:** small. **Khối lượng:** medium; dùng các tác phẩm và nhiệm vụ hiện tại.
- **Bắt/gỡ:** yêu cầu được nêu trước khi nhận việc, hạn theo đồng hồ thống nhất; theo nguồn nguyên liệu và đầu ra. Nếu có vòng lợi dễ lặp, sửa nhu cầu đặt hàng và công dụng, không làm nghề nghèo thêm vô cớ.
- **VERDICT: gain larger** — tay nghề được dùng để hiểu người và hoàn thành việc, vượt khỏi chế tạo để bán.

### Y phục, Điểm trang, trung y và lễ nghi

[Cố Cung về nghi lễ sách lập hoàng hậu nhà Minh](https://www.dpm.org.cn/lemmas/243889.html) cho thấy y phục và lễ phụ thuộc dịp cụ thể; đây là ví dụ **Minh**, không dùng làm toàn bộ quy chế Thanh. *Quốc triều cung sử* là đầu mối Thanh riêng về cấp phát và phục dụng. Trò chơi cần giữ rõ hệ chế hư cấu của mình.

**S1-29 — Khuyên chọn: thêm học và cứu tình huống lễ nghi vào cơ chế phạm lễ đã có.** Người mới có thể được người dạy cảnh báo đúng dịp; đã học thì hiểu vì sao áo, trang sức hay Điểm trang không hợp. Mất áo do cướp có thể nhờ báo trước, xin đồ tạm hoặc xin vắng đúng phép, chứ không mặc nhiên vô tội hay mặc nhiên bị xử y như cố ý tiếm lễ. Áo và Điểm trang trong cùng một lần xuất hiện là một tình huống xét, tránh bị hai hệ phạt lặp cùng lỗi. Không tự lộ trần xa xỉ/phẩm áo mà sếp đã chốt phải học mới biết; không đề nghị mặc tự động hoàn hảo.

- **Rủi ro:** “không biết luật” thành lỗ thoát vô hạn, hoặc đồ bị trộm khiến nhân vật bị phạt dây chuyền không thể tránh. **Khả năng:** possible. **Mức hại:** medium. **Khối lượng:** medium; nối người dạy, đồ cấp lại và vụ mất đồ sẵn có.
- **Bắt/gỡ:** kiểm lần đầu/lần tái phạm, lỗi cố ý/ngoài ý muốn, vừa giáng phẩm chưa kịp thay đồ và đang trung y. Giữ chế tài sếp đã chốt cho đến khi sếp nhận ngoại lệ; nếu hệ phạt trùng, hoàn phần trùng và giữ một kết quả đúng vụ.
- **VERDICT: gain larger** — lễ nghi thành tri thức có thể học và ứng xử, vẫn giữ áp lực thân phận.

## 28. Tài nghệ, minigame, thi tài và lễ tiết

**Mạnh nhất:** tài nghệ có hoạt động chơi thật, minigame, thi và tác phẩm; đã có kỳ lễ để đổi nhịp sinh hoạt. **Thiếu:** cùng một môn cần có chỗ dùng ngoài thi, còn kỳ lễ cần có ý nghĩa xã hội khác nhau, không chỉ thay tên cuộc thi và tăng thưởng.

Sếp vừa chốt thêm lịch tháng để chuẩn bị lễ từ trước. Phạm vi kiến thức rất đúng: chỉ lễ cố định công khai, không tự lộ tiệc riêng, hẹn kín hay biến cố bất ngờ. Em ghi nhận là quyết định mới, không tự chứng nhận phần lịch ấy đã được tích hợp. Các môn trong `MINIGAMES.md` có cơ chế riêng từ nhịp đàn, thế cờ, chữ thơ đến trí nhớ thêu và canh lửa; không quay lại thi bằng một bộ trắc nghiệm chung. Thơ lục bát/Truyện Kiều trong trò là lựa chọn ngôn ngữ của game, không phải chứng cứ về bài thi hậu cung Thanh.

[Cố Cung về chính đán](https://www.dpm.org.cn/court/culture/160449.html) và [tư liệu tiết diễn](https://www.dpm.org.cn/ancient/text/180079.html) cho các ví dụ lễ có mùa và công việc riêng. Khất xảo ở Thất tịch không đồng nghĩa một ngày hẹn hò hiện đại; lễ gia đình hay lễ triều không nên tùy tiện thay bằng mọi người thi cùng một môn.

**S1-30 — Khuyên chọn: mỗi môn có một cách dùng trong đời sống; mỗi lễ có một đánh đổi hợp dịp.** Cầm giúp một buổi gặp riêng đã có, thêu phục vụ việc tặng/đặt làm, thơ dùng trong giao tiếp; môn khác nhau mở lối khác nhau để xử việc. Kỳ lễ có trách nhiệm, người dự và cơ hội quan hệ, dùng cùng ngày lễ với lịch chuẩn bị sếp vừa chọn. Tin riêng vẫn đến bằng lời mời/tai mắt, không bị công khai hóa. Học G5 về học mở lối giải; G4 về lịch năm đáng mong. Không đòi mọi người giỏi mọi môn hay thêm lịch lễ dày đặc.

- **Rủi ro:** ép chơi minigame mới qua truyện, hoặc một môn thành chìa khóa cho mọi việc. **Khả năng:** possible. **Mức hại:** medium. **Khối lượng:** medium; ưu tiên dùng lại bài đang có trong `MINIGAMES.md`.
- **Bắt/gỡ:** đối chiếu đường thi và đường sống khi người chơi không giỏi thao tác; giữ lối giải bằng quan hệ/chuẩn bị phù hợp, phần thưởng cao vẫn đòi năng lực. Kiểm lịch báo trước đúng ngày thực diễn ra và không chứa tin riêng. Nếu một môn áp đảo, sửa loại tình huống nó giải được trước khi sửa số; nếu lịch bị lệch, sửa nguồn ngày chung thay vì sửa riêng từng lời mời.
- **VERDICT: gain larger** — tài nghệ và lễ tạo cách sống khác nhau, tăng chơi lại mà không thêm thao tác bắt buộc.

## 29. Thú nuôi, chăm sóc, lớn lên và linh thú

**Mạnh nhất:** không còn chỉ là vật cộng tư chất: có giai đoạn, ăn/sạch/vui/tình cảm, minigame, giúp chăm, bị hại và bị trộm; NPC cũng có thú. Các giống thường và linh thú là phần sếp đã duyệt, không cần xóa giả tưởng để làm đúng sử. **Thiếu:** công việc chăm dễ thành thuế mỗi tuần; con vật “biết” hoặc cứu mạng cần giới hạn rõ. Đặc biệt chim học được lời chỉ là đầu mối, không phải nhân chứng biết đầy đủ vụ án.

[Chuyên đề khuyển trong cung của Cố Cung](https://www.dpm.org.cn/topic/ruiquan.html) xác nhận có nuôi chó và văn hóa liên quan; không xác nhận mọi thú quý hay năng lực linh thú trong game là vật nuôi lịch sử.

**S1-31 — Khuyên chọn: ưu tiên cá tính, gắn bó và chăm có thể nhờ người; giữ phép lạ trong phần linh thú.** Con vật nhận ra người chăm, có thói quen, để lại dấu hoặc lặp âm thanh đã tiếp xúc. Chủ phải đối chiếu dấu ấy với chứng cứ khác. Nhờ người chăm dùng hệ người hầu/hảo hữu hiện tại; lựa chọn chất lượng chăm quan trọng hơn bấm đủ lượt. Cứu mạng là ngăn một lần chết theo điều kiện đã được duyệt, không hồi sinh người đã chết.

- **Rủi ro:** thú trở thành máy dò thủ phạm, bảo hiểm bất tử hoặc việc bắt buộc gây sợ bỏ game. **Khả năng:** possible. **Mức hại:** medium. **Khối lượng:** medium; dùng lại các giai đoạn và việc chăm hiện có.
- **Bắt/gỡ:** kiểm con vật đã ở đâu, tiếp xúc điều gì, đã tiêu quyền cứu chưa; kiểm chăm qua người khác và ghi/nạp. Nếu manh mối không có đường tiếp xúc, bỏ kết luận tự sinh và hoàn hậu quả tố sai do lỗi; giữ tình cảm đã nuôi.
- **VERDICT: gain larger** — thú thành một sinh linh gắn bó mà không phá điều tra, sự hữu hạn của kiếp hay nhịp sống.

**OPEN (hers):** “lớn hẳn mới cứu chủ” có nghĩa Trưởng thành hay riêng Linh thú? Mã hiện tại chặn ở Linh thú. Em nghiêng giữ cứu mạng siêu nhiên ở Linh thú; thú thường bảo vệ/cảnh báo theo khả năng. Không tự mở thêm lượt cứu.

## 30. Chính tuyến, phụ tuyến, yêu cầu tài nguyên và hạn

**Mạnh nhất:** nhãn tuyến, chương/bước, hạn lo liệu và đường không bạc đã có; đúng lời sếp ngày 15/11. **Thiếu:** đường nhờ người giúp dễ thành ngân hàng miễn phí không có đời sống, còn từ chối hay quá hạn dễ làm việc biến mất như chưa xảy ra.

**S1-32 — Khuyên chọn: mỗi yêu cầu để lại một cam kết và một cách kết thúc có nguyên nhân.** Người nhận việc biết trước phải lo gì và trước dịp nào; người giúp có lý do, khả năng và món nợ thích hợp. Không bạc có thể là công sức, nghề, chứng cứ hay đổi nghĩa vụ, không cần luôn bắt vay tiền. Quá hạn tạo kết quả của việc đó: người khác nhận thay, phải xin khất, mất lòng hoặc đổi hướng truyện; không mặc nhiên chết hay chặn toàn chính tuyến. Học G5 về nhiều cách vượt khủng hoảng và G4 về lời hẹn. Tham chiếu G6 ở món nợ nhân tình, không lấy việc nợ ân làm quyền sai khiến vĩnh viễn.

- **Rủi ro:** mọi đường “không bạc” đều đắt hơn về lâu dài; hạn bị đặt trong lúc cấm túc/bệnh khiến không thể làm. **Khả năng:** possible. **Mức hại:** large nếu khóa chính tuyến. **Khối lượng:** medium; nối trạng thái nhiệm vụ, người giúp và đồng hồ S1-08.
- **Bắt/gỡ:** kiểm nhận/khất/từ chối/hoàn thành/quá hạn và người nhờ đã chết/mất quyền. Báo đúng điều nhân vật biết trước khi nhận; nếu lỗi đồng hồ gây trễ, trả thời gian hoặc phục hồi bước, không phạt người chơi.
- **VERDICT: gain larger** — yêu cầu tài nguyên trở thành chuyện người và lời hứa, không phải cửa thu phí.

## 31. Sự kiện, lựa chọn theo hoàn cảnh và người chơi giỏi

**Mạnh nhất:** tính nết, quan hệ, tâm trạng, người chứng kiến và sở thích đã có chỗ tác động; câu trả lời không nhất thiết đúng trong mọi kiếp. **Thiếu:** chưa đủ bằng chứng rằng người đọc hoàn cảnh chơi tốt rõ ràng hơn bấm ngẫu nhiên trên bản đã gộp. “Đổi kết quả” không đồng nghĩa “có thể suy luận”.

`dev/review/event-balance.md` lượt r6 ghi nhóm dùng gợi ý chỉ vài kiếp, kết quả chết chưa tốt hơn nhóm ngẫu nhiên; các nhóm còn khác mẫu. Đó là tín hiệu cần đo, **không phải bằng chứng người có kỹ năng thua trong game**, cũng không đủ để tuyên bố yêu cầu sếp đã đạt. Tương tự, không gộp các phiên bản cảm xúc v3/v4 thành kiểm chứng chính xác riêng v4; không lấy số bổng/giam ở `jbal.js` trước khi xem ghi đè `jbal2.js`.

**S1-33 — Khuyên chọn: ưu tiên tính suy luận được trước khi thêm sự kiện.** Giữ tính cách/sở thích ổn định trong kiếp; đổi hoàn cảnh phải có dấu trong lời, người dự và tin người chơi đã học. Tai mắt/Tâm cơ nâng chất lượng hiểu bối cảnh, không bảo đảm thắng. Theo đúng quyết định sếp: lựa chọn sự kiện nêu giá, điều kiện và gợi ý bằng lời hợp hiểu biết; kết quả mới nói rõ được/mất, không rò xác suất hay số hậu quả bí mật. Hành động thường giữ thông tin đầy đủ theo luật riêng, không gộp hai loại. Học G5 về chuẩn bị giúp sống; G3 về chuyện có khoảng yên sau biến cố.

- **Rủi ro:** biến mọi lựa chọn thành câu đố có một câu luôn đúng, hoặc ngụy trang tung kết quả bằng văn mơ hồ. **Khả năng:** possible. **Mức hại:** large với lời hứa chơi có kỹ năng. **Khối lượng:** medium; cần nội dung và phép đo đúng bản.
- **Bắt/gỡ:** Claude so cùng bản, cùng tập hoàn cảnh/xuất thân, tách nhóm đọc tín hiệu, nhóm ngẫu nhiên và nhóm lặp một lựa chọn; ghi cả thăng phẩm, sống, mất mát và mức thông tin có thật. Các tình huống đổi kết quả mà không đổi tín hiệu là nơi cần sửa. Nếu sửa gợi ý làm lộ hết đáp án, bỏ phần tiết lộ, giữ dấu hợp cảnh. Em không đặt cỡ mẫu hay kết luận cân bằng thay người đo.
- **VERDICT: gain larger** — người chơi có thể học để giỏi lên, thay vì học thuộc nút hoặc chịu một trò may rủi không thể hiểu.

## 32. Nam nhân, tư tình và lối xuất cung

**Mạnh nhất:** `MEN_PLAN.md` đã đi đến lịch/lệnh và kế hoạch thật; chỉ bắt gặp khi có mặt đúng nơi/thời điểm, khác việc rải người lạc vô cớ. Phi tần NPC cũng có bí mật và khả năng bắt gặp. Nhánh lối riêng đã có yêu, trốn, rời cung hợp lệ và ẩn dật. **Thiếu:** việc chăm một quan hệ kín cần đời sống ngoài bị bắt; lệnh vào cung hợp lệ khác tự do tiếp cận mọi người, và bị thấy đứng gần không tự chứng minh tư thông.

**S1-34 — Khuyên chọn: làm quan hệ ấy có trách nhiệm và khác hậu quả theo thân phận, dùng các tuyến đã có.** Người yêu có công việc, người thân, lời hứa và giới hạn; giúp người chơi không có nghĩa sẵn sàng hy sinh tất cả. Xuất cung hợp lệ, bỏ trốn và rút khỏi tranh quyền là lựa chọn khác nhau; sau khi đi còn quan hệ với người và con ở lại. Học G1 về bí mật có người biết và G2 về gắn bó qua việc làm. Chuyện tình lén trong G6 là chất liệu kịch, không phải bằng chứng cung đình cho phép giao du tự do. Không làm lại nam nhân thành hệ hẹn hò độc lập.

- **Rủi ro:** chỉ đổi người trao thưởng từ vua sang nam nhân, hoặc hai người bị xử cùng một tội chỉ vì cùng chỗ. **Khả năng:** possible. **Mức hại:** large vì kết có thể không hồi phục. **Khối lượng:** large; đối chiếu trước tích hợp sẽ tiết kiệm sửa các nhánh đã lệch nhau.
- **Bắt/gỡ:** rà lệnh, vùng, người chứng kiến, hành vi cụ thể và điều họ biết; thử cả đường cung nữ, phi tần, khuê các. Nếu bắt gặp bị hiểu sai do lỗi quyền vào, hủy kết luận từ lỗi đó; giữ hậu quả của hành vi thật đã được cảnh báo.
- **VERDICT: gain larger** — tình yêu ngoài đường tranh sủng thành một đời sống có lựa chọn, không chỉ một cửa chết hoặc lối thoát miễn phí.

## 33. Truyện xuất thân, kết hiếm và phần thưởng làm đổi thế giới

**Mạnh nhất:** `RARE_ENDINGS.md` có những kết riêng theo thân phận và việc đã làm, không chỉ chung một đích Hoàng hậu. **Thiếu:** một số kết trao quyền rất lớn nhưng hậu quả chính trị chưa cân xứng; những lời ví von dễ thành lời khẳng định lịch sử sai.

Các trường hợp cần rà cùng họ, không tách thành những ý mới để viết lại toàn bộ:

- `dtq_vu`: miễn tử cho cả hậu duệ vô hạn. [Thiết khoán Tiền Lưu tại Bảo tàng Quốc gia](https://www.chnmuseum.cn/zp/zpml/kgfjp/202111/t20211116_252287.shtml) là hiện vật cụ thể có phạm vi ân miễn, không chứng minh quyền bất tử phổ quát, mãi mãi.
- `dtq_binh`: đưa nửa binh phù rồi có quyền phủ quyết quân sự. Một tín vật không tự giải thích quân đội tuân lệnh ai, chiếu nào có hiệu lực và các quan có chấp nhận không. Chưa có nguồn đã kiểm xác nhận đặc quyền này là lệ.
- `ch_co`: nhận một phi tần làm con gái Thái hậu tạo xung đột quan hệ với vị vua đang là chồng; “coi như con” trong tình cảm cần khác nhận vào gia phả chính thức.
- `thd_tho`: phong vào Hàn lâm cho nữ nhân như một phần thưởng thường lệ chưa có căn cứ được kiểm; có thể là đặc lệ hư cấu, không gọi là thông lệ.
- `st_dong`: mật chỉ sau Chính Đại Quang Minh cần nối với mô hình lập trữ ở S1-20, không đồng thời coi người chơi biết chắc cả người kế vị công khai lẫn di chiếu bí mật chưa mở.
- Các kết y thuật: thành tựu nghề có thể đáng quý, nhưng không suy hiệu lực hay công thức chữa bệnh thật từ hiệu ứng game.

**S1-35 — Khuyên chọn: giữ kết và cảm giác thành tựu, rà quyền thật đi sau tên thưởng.** Mỗi phần thưởng thay quyền, quan hệ hay đời sau cần được triều đình công nhận trong thế giới và có phạm vi. Danh dự tình cảm có thể rất lớn mà không cần cho quyền miễn mọi tội; đặc lệ hư cấu có thể tồn tại nếu lời kể nhận đúng là đặc lệ. Học G1: quyền lớn kéo theo người thực thi và người phản đối; G3: một kết đáng nhớ nhờ đời đã sống, không chỉ món thưởng mạnh nhất.

- **Rủi ro:** làm phần thưởng hiếm mất hấp dẫn hoặc hồi tố tước quyền của người đã đạt. **Khả năng:** possible. **Mức hại:** large nếu ảnh hưởng kiếp sau. **Khối lượng:** medium; chủ yếu rà từng quyền và trạng thái kéo theo.
- **Bắt/gỡ:** lần từ lời kết sang tác dụng thật, người nhận và phạm vi thời gian; thử qua đời vua/đổi ngôi/chuyển kiếp. Giữ thành tích đã đạt; nếu phải chuyển quyền, Claude trình phương án tương đương để sếp quyết, không lặng lẽ tước.
- **VERDICT: gain larger** — giữ được những kết giàu tưởng tượng mà không biến phần thưởng thành ngoại lệ phá mọi luật khác.

## 34. Tuần lục, tin cung đình và ký ức một đời

**Mạnh nhất:** đã có nơi ghi sự kiện của tuần, tin về người khác và lịch sử biến động; rất hợp thể loại tin hành lang. **Thiếu:** cùng một việc có thể được kể như sự thật toàn tri dù nhân vật chỉ nghe đồn; việc đã minh oan có thể không đi tiếp tới người từng nghe lời vu cáo.

**S1-36 — Khuyên chọn: dùng lại tin đã có để lưu cả sự thay đổi của điều người ta tin.** Một tin đồn được xác nhận, bác bỏ hoặc còn nghi; việc sửa tin có thể đến người thân trước, cung khác sau. Tuần lục của nhân vật giữ điều đã trải qua và nghe được, không tự mở bí mật của mọi người. Học G3 về câu chuyện phát sinh và G1 về phạm vi người biết. Không đề nghị thay hình thức sách hay cách trình bày tin.

- **Rủi ro:** lưu quá nhiều phiên bản tin, hoặc việc đính chính biến thành thêm hình phạt danh tiếng kéo dài. **Khả năng:** possible. **Mức hại:** medium. **Khối lượng:** medium; tái dùng vụ việc ở S1-13/S1-16.
- **Bắt/gỡ:** theo một tin từ phát ra, truyền, sửa đến người nhận; chỉ một vụ gốc, không cộng phạt mỗi lần kể lại. Nếu tin cũ được dựng lại sai sau ghi/nạp, giữ bản kết luận đã được thế giới xác nhận và gỡ ảnh hưởng trùng.
- **VERDICT: gain larger** — người chơi cảm thấy mình sống trong một cung đình có trí nhớ, và minh oan thực sự thay đổi đời sống.

## 35. Kết một đời, Luân hồi, phúc đức và độ khó

**Mạnh nhất:** chơi nhiều đời làm xuất thân và kết hiếm có giá trị; đời không lên Hoàng hậu vẫn có khả năng thành chuyện riêng. **Thiếu:** khi phần thưởng chỉ ưu tiên phẩm, mọi đường nghề, tình thân và rời cung dễ bị xem là “chơi hỏng”. Các mức độ khó đã có công việc trên nhánh, chưa phải tính năng em xác nhận ở bản rà.

**S1-37 — Khuyên chọn: để kết ghi nhận điều đời ấy thật sự theo đuổi, dùng các đường kết sẵn có.** Đạt nghề, giữ được người thân, dạy con, minh oan, rời cung bình an có kết quả xứng với lựa chọn và mất mát; không bắt mọi kiếp đều đi cùng một mục tiêu. Học G3/G4 về mục tiêu tự chọn và G9 về đời sống bên cạnh tranh quyền; Cung Tường Mộng dùng nghề, con và quan hệ đã có cho mục đích ấy. Giữ nguyên chủ trương chống đổi kiếp lấy lợi sếp đã duyệt; em không đề nghị bỏ mức phạt hay đổi điều kiện hoàn kiếp. Phân biệt người tự bỏ với lỗi kỹ thuật làm mất kiếp là việc xác minh sự cố, không tạo cách lách luật.

- **Rủi ro:** thêm “thành tựu” vụn để farm phúc đức, hoặc kết an toàn trở thành đường lấy lợi nhanh nhất. **Khả năng:** possible. **Mức hại:** medium. **Khối lượng:** medium; nội dung kết là chính, không thêm công thức điểm trong lời khuyên này.
- **Bắt/gỡ:** theo thời gian/đầu tư thật của từng đường, kết có phản ánh hành vi hay chỉ nhãn chọn cuối đời; thử lại kiếp và ghi/nạp. Nếu có vòng farm mới, gỡ thưởng mới gây vòng ấy, vẫn giữ lời kết và thành tích cũ hợp lệ.
- **VERDICT: gain larger** — tăng lý do chơi lại mà không làm mọi người bị buộc tranh cùng một ghế.

## 36. Bảng vàng và ý nghĩa của so tài

**Mạnh nhất:** kế hoạch Bảng vàng đã phân biệt một đời tốt nhất với tích lũy nhiều đời, có chống gửi trùng và tính lại điểm phía dịch vụ. **Thiếu:** tóm tắt đời do máy người chơi gửi lên vẫn là dữ liệu tự khai. Tính lại phép cộng không xác nhận được các thành tích ấy đã xảy ra; định danh khách cũng chưa là tài khoản bền. Bản rà chưa nạp `jrank.js`.

**S1-38 — Khuyên chọn: trước hết làm rõ ý nghĩa thành tích và giới hạn so sánh.** Thành tích từ bản luật/độ khó/solo–co-op khác nhau không tự chứng minh ai chơi giỏi hơn. Dùng thông tin nguồn phiên chơi mà hệ có thể xác nhận; coi bảng khách là so thành tích cộng đồng với mức bảo đảm đúng khả năng. Học G3/G4 về giá trị một đời có câu chuyện; không sao chép thang điểm của game khác. Chưa khuyên xây cả hệ máy chủ xác minh mọi lượt chỉ để bảo vệ một bảng phụ.

- **Rủi ro:** chia quá vụn làm mất ý nghĩa cộng đồng, hoặc bảng tự khai được diễn đạt thành chứng nhận công bằng tuyệt đối. **Khả năng:** likely với lời hứa chống gian lận quá mạnh. **Mức hại:** medium. **Khối lượng:** medium cho đề nghị làm rõ phạm vi; xây lại thành mô phỏng do máy chủ quyết định sẽ lớn hơn và chưa được khuyên chọn.
- **Bắt/gỡ:** thử gửi trùng, thay dữ liệu, cập nhật phiên bản, xóa dữ liệu cục bộ và chơi offline rồi gửi lại. Nếu nguồn thành tích không đủ tin, giữ trong thành tích cá nhân/nhóm phù hợp thay vì dùng nó kết luận ai giỏi nhất. Không tước kết trong game chỉ vì mạng không gửi được.
- **VERDICT: gain larger** — bảng tạo niềm vui chia sẻ với lời hứa trung thực, không kéo toàn game sang một dự án chống gian lận.

## 37. Co-op: chung một cung đình, hai người có quyền hành động

**Mạnh nhất:** có thế giới chung do chủ phòng điều phối, kết nối lại, ghi chuyển biến và quan hệ giữa người chơi; thuận chất liệu liên minh/bí mật cung đấu. **Thiếu:** quy tắc dùng chung cần đi đến các tính năng mới, không chỉ sự hiện diện. `jcoopworld.js` hiện chặn vua chết khi bật co-op; vì thế chưa thể gọi kết kế vị solo và co-op tương đương. Móc chăm thú ở `jpetcare.js` còn ghi chưa nối relay. Tài liệu giao thức cũ nói ba buổi, trong khi đồng hồ main đã bốn buổi.

**S1-39 — Khuyên chọn: ưu tiên những hành động cần một sự thật chung, trước khi thêm trò co-op.** Cùng món đồ chỉ chuyển một lần; cùng ghế chỉ có một người giữ; phiên thi/đêm được triệu và người đang ở đâu phải theo cùng thời gian. Hai máy thấy được điều nhân vật mình có quyền biết, không đọc luôn bí mật bạn. Mất mạng không tự làm nhân vật phản bội, bị xử hay mất đồ. Học G1 về liên minh có lợi ích riêng, G3 về hậu quả phát sinh từ người, giữ khả năng cung đấu hai chiều sếp đã cho phép.

- **Rủi ro:** sửa chồng quyền chủ phòng/khách làm nhân bản vật, chạy hai lượt hoặc khóa cả phòng. **Khả năng:** likely nếu từng module nối riêng. **Mức hại:** large. **Khối lượng:** large; cần rà theo hành động và giao dịch, không chỉ theo trang.
- **Bắt/gỡ:** thử hai người cùng nhận/mua/tặng một vật, nhận cùng ghế, ngắt mạng giữa việc, tải lại, đổi đời và nối lại; đối chiếu số đồ, thời điểm và kết quả hai bên. Dừng hành động chưa đồng bộ, giữ bản giao dịch được chủ phòng chấp nhận và trả khoản chưa thành, không nhân đôi bù. Đường vua chết/kế vị và chăm thú chỉ được gọi là sẵn sàng sau khi kiểm chung.
- **VERDICT: gain larger** — củng cố nền chung bảo vệ mọi ý tưởng cùng chơi về sau, còn thêm sự kiện lúc này sẽ nhân các điểm lệch.

## 38. Học luật trong game, lưu kiếp và trở lại sau khi nghỉ

**Mạnh nhất:** đã có hướng dẫn trên nhánh, người dạy trong thế giới, lưu/nạp và hoạt động không phụ thuộc việc online liên tục. **Thiếu:** kiến thức lễ nghi, bí mật và tiến độ người chơi đã học cần bền qua nghỉ chơi; hướng dẫn không nên bị tính thành công khai điều nhân vật chưa biết. Không thể lấy khảo sát một lần nạp làm chứng nhận sổ cũ của mọi nhánh đều an toàn.

**S1-40 — Khuyên chọn: nối học luật với việc đã trải qua, giữ nguyên tiến độ khi quay lại.** Quế ma ma dạy việc đã tới lúc cần; bỏ hướng dẫn không làm mất quyền học sau. Một vụ đang dở, người đã biết, lễ đã học, vật đang cầm và hạn còn lại vẫn cùng sự thật sau nạp. Học G5 về học để xử khủng hoảng và G4 về quyền chọn nhịp sống. Đây là lời khuyên về nội dung/tiến trình, không yêu cầu màn hình hay bố cục mới.

- **Rủi ro:** hướng dẫn chen vào quá nhiều, hoặc chuyển sổ cũ âm thầm biến “chưa biết” thành “đã được cảnh báo”. **Khả năng:** possible. **Mức hại:** large nếu dẫn đến phạt oan. **Khối lượng:** medium; liên kết các cờ đã có, không làm lại hướng dẫn.
- **Bắt/gỡ:** ghi/nạp giữa vụ án, thai kỳ, thi, chăm thú, cấm túc và khi mất mạng co-op; so kiến thức/hạn/vật trước sau. Nếu chuyển dữ liệu không chắc, giữ quyền lợi và cho học lại việc liên quan, không hồi tố lỗi vì một cảnh báo chưa từng nhận.
- **VERDICT: gain larger** — người chơi có thể nghỉ rồi trở lại một đời vẫn đáng tin, giúp chiều sâu được tiếp cận lâu dài.

## 39. Lễ nghi ngoài chuyện mặc đúng áo

**Mạnh nhất:** đã có phẩm, vùng cấm, thỉnh an, lệnh triệu và phản ứng thất lễ. **Thiếu:** “thiếu quy củ” dễ bị rút thành kiểm áo/Điểm trang; lời nói đúng với thân phận, quyền cho phép, việc có tang hay đang yến cũng cần cùng một nền. Các cảnh trưởng bối rất dễ lẫn thân tình với quyền vượt lễ.

Lễ sách lập Minh, thiết chế Thanh và tiết lễ được dẫn ở trên thuộc những ngữ cảnh khác nhau. Không có một phép quỳ, một cách xưng hô hay một chu kỳ chịu tang đúng cho mọi triều, mọi người và mọi dịp. G6 hữu ích ở lớp ý nghĩa thể diện: cho ngồi, cho miễn lễ hoặc gọi riêng có thể là ưu ái, không có nghĩa xóa phẩm.

**S1-41 — Khuyên chọn: áp dụng một nền lễ nghi nội dung nhất quán cho các cảnh đã có.** Ai chủ lễ, ai được mời, ai có quyền miễn một thủ tục, có đang trong án/tang không; ngoại lệ phải do người có quyền trao, đúng phạm vi. Người mới có đường hỏi trước; lần cố ý vượt lễ khác nhầm vì chưa được dạy. Tái dùng cảnh thỉnh an, tấn phong, yến và xét án, không thêm việc bắt người chơi lạy nhiều lần để tiêu Sức.

- **Rủi ro:** biến game thành học thuộc tiểu tiết, thêm phạt chồng áo/lời nói/vị trí trong một cảnh. **Khả năng:** likely nếu mỗi nhóm tự đặt lễ. **Mức hại:** medium. **Khối lượng:** medium; ưu tiên cảnh trọng đại đã có.
- **Bắt/gỡ:** rà cùng một thân phận ở cùng loại dịp có bị yêu cầu trái nhau không; gộp kết quả cùng vụ với S1-29. Nếu nguồn chưa chắc, nói rõ quy ước triều hư cấu thay vì bịa tên lệ; gỡ chế tài mới chưa được dạy hoặc mâu thuẫn.
- **VERDICT: gain larger** — cung đình có trật tự sống được, và người chơi được học cách xử thế thay vì chỉ né lỗi trang phục.

## Thứ tự em khuyên Claude thẩm định

Đây là thứ tự đọc và quyết định, không phải lệnh triển khai hay điều kiện chặn công việc khác. Các hàng chỉ gom đề nghị đã có thẻ rủi ro; không tạo thêm luật hoặc số.

| Ưu tiên | Mã đã phân tích | Vì sao đứng trước |
|---|---|---|
| Độ tin cậy của kiếp đang chơi | S1-08, S1-15, S1-16, S1-18, S1-39, S1-40 | Đồng hồ, độc/chứng cứ, huyết thống, dữ liệu chung và lưu kiếp có thể làm người chơi mất đời vì điều không thể hiểu hoặc không phải hành vi thật. |
| Tôn trọng quyết định mới của sếp | S1-03, S1-25, S1-26, S1-29, S1-30, S1-32, S1-33 | Thi, bổng thật, cắt xén có nguyên nhân, lễ, hạn và lựa chọn hợp cảnh đã được làm; giá trị tiếp theo nằm ở nối đúng và kiểm chứng, không dựng bản khác. |
| Chiều sâu đáng chơi ngay từ hệ sẵn có | S1-07, S1-09, S1-11 đến S1-14, S1-17, S1-19, S1-24, S1-27, S1-28, S1-31, S1-36 | Ký ức, chăm sóc, nghề và đồ có câu chuyện dùng lại tài nguyên hiện hữu. |
| Nhập các nhánh lớn cho khớp | S1-02, S1-05, S1-20 đến S1-23, S1-34, S1-35, S1-37, S1-38 | Đời ngoài cung, lịch NPC, lối riêng, kế vị và Bảng vàng đã có việc; cần hòa giải trạng thái và hệ quả trước khi quảng bá là đã chơi trọn. |
| Nhất quán thế giới xuyên suốt | S1-01, S1-04, S1-06, S1-10, S1-21, S1-41 | Phẩm, quyền, mùa, phạt và lễ làm người chơi tin cung đình là một nơi sống được. |

Hai phương án em không khuyên là ép cả game thành Thanh thuần sử (S1-01B) và giữ kim bạc toàn năng tự kết tội (S1-15B). Các đề nghị còn lại có lợi dự kiến lớn hơn hại **trong phạm vi và với cách bắt/gỡ đã ghi**; đó chưa phải phê duyệt hay hiệu quả đã đo.

## Bảng phủ phạm vi và nguồn trong kho

| Nhóm tệp đã đối chiếu | Phần trả lời |
|---|---|
| `AGENTS.md`, `CLAUDE.md`, quyết định sống, hai bản bàn giao mới, `HANDOVER.md`, `S_LOG.md` | Phạm vi, quyền tư vấn, trạng thái nhánh, quyết định xuyên suốt; các OPEN không bị biến thành luật. |
| `ITEMS.md`, `ITEMS_EARNED.md`, `ECONOMY.md`, PROGRESS về nguồn đồ, vật phẩm làm được, quà, bổng và tư trang | §25–§27; liên kết với mất đồ §14, lễ §39, chăm thú §29. |
| `MINIGAMES.md`, PROGRESS minigame, Điểm trang, trung y, trang phục, khảo hạch, bục thi | §3, §27–§28, §39; không nhận xét hình thức hay đề nghị thêm tranh. |
| `EMOTION_PLAN.md`, PROGRESS cảm xúc; `MEN_PLAN.md`, PROGRESS nam nhân | §5–§7, §11–§14, §32; sổ vị trí/motive chưa nạp được phân biệt riêng. |
| `RARE_ENDINGS.md`, PROGRESS truyện tình/truyện hiếm và sự kiện | §18, §20, §30–§33, §35; phần thưởng có quyền thật cần nối với thế giới. |
| PROGRESS hoàng tự/tư chất, ân oán/mưu, công trạng và phe phái | §11–§24; con không chỉ là tài nguyên kế vị, nghề không chỉ chờ thành phi. |
| PROGRESS thú nuôi/pets-fix, ts-b và ts-a trên nhánh | §14, §27, §29; phần đã có không bị tính thành ý mới. |
| PROGRESS cân bằng, cân bằng hợp nhất, event-balance, đo và rà hành động | §8, §31; không gộp mẫu khác phiên bản, chưa tuyên bố đạt yêu cầu kỹ năng thắng ngẫu nhiên. |
| Kế hoạch ngoài cung, lối riêng, kế vị; PROGRESS schedules2, difficulty, tutorial; thiết kế Bảng vàng trên các nhánh nêu đầu tệp | §2, §5, §18, §20–§21, §32, §35–§38; đây là rà trước tích hợp, không chứng nhận tính năng đã ở main. |
| Tài liệu `dev/coop/`, mã thế giới chung, người chơi và móc thú | §37; giới hạn vua chết/chăm thú và ba–bốn buổi được ghi rõ. |
| `KIT.md`, `VANPHONG.md`, `KIT_REQUESTS.md`, `MOTION.md`, `STYLE_ANCHOR.md`; các PROGRESS kit, trang sách, tải, tối ưu, danh tính, trang phục nhân vật, ánh sáng/chuyển động | Chỉ đối chiếu luật từ ngữ, kiến thức, giới hạn và trạng thái có liên quan. Phần hình thức không thuộc vai này; không có lời khuyên layout, art, giọng hay điểm chạm. |
| `dev/build/assemble.py`, các mô-đun liên quan, `jbal.js` và `jbal2.js`, `index.html` đóng gói | Phân biệt thiết kế/mã được nạp; căn cứ cụ thể về đồng hồ, độc, đích thứ, tước công chúa, co-op và ghi đè số. Không sửa hay build. |

## Điều còn cần quyết và điều chưa được chứng minh

**OPEN (hers):** ba điểm quyết riêng đã đặt đúng ngữ cảnh: ân thi sau sinh (§3), khảo hạch đường cung nữ/Ma ma (§24), và Trưởng thành hay Linh thú mới được cứu chủ (§29). Em đã ghi phương án nghiêng chọn tại từng chỗ; Claude có thể trình chúng cùng kết quả rà, không cần sếp trả lời để báo cáo này có hiệu lực tư vấn.

Không có kết luận trong báo cáo rằng lịch sử cung đình thường xuyên xảy ra độc/phóng hỏa/tư thông theo tần suất của game. Nguồn sử và phim được phân biệt ở từng chỗ. Chưa xác minh trực tiếp được URL live; chưa chơi trọn các minigame, thai/sinh, một đời kế vị hoặc hai máy co-op; chưa có phép đo mới cho bản hiện tại. Những giới hạn này không được thay bằng lời “đã PASS toàn game”.

Với sếp, điều em nghiêng chọn nhất là **nối sâu cái đã có**: một người nhớ đúng việc, một món đồ có đời, một án có đường lần, một lễ có người chịu trách nhiệm, một đứa trẻ có tương lai riêng. Các mã trên là đề nghị để Claude và sếp chọn, không tự thay quyết định của sếp.

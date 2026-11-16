# Trò chơi nhỏ: mỗi môn một trò (j82 + j91)

Sếp (11/14): thi Thơ, Câu đối, Đố đèn, Nấu ăn, Điều hương… không được là "5 câu hỏi chọn đáp án". Mỗi môn một trò RIÊNG, không hai môn chung cơ chế,
chơi bằng thao tác thật (kéo, chạm, vẽ, nhớ, canh nhịp).

Mã: `dev/build/j82.js` (khung thi, chấm điểm, 5 trò cũ) + `dev/build/j91.js` (10 trò mới, gắn lại bảng môn). Mọi nơi gọi trò đều đi qua j82:
`startContest` (hội thi j71, thi tài trong Tranh ghế), `playArt` (tác phẩm j83, tự luyện), `openMG` (học trong tab Tài nghệ: mỗi tài nghệ chơi đúng trò của môn mình).

## Bảng môn → cơ chế

| Môn (khóa) | Trò | Thao tác | Cách chấm (0–10 phần màn thi) | Bậc tài nghệ làm dễ hơn |
|---|---|---|---|---|
| Đàn (`dan`, học Cầm) | Tấu khúc: hoa mai rơi theo 4 dây | chạm đúng dây khi hoa chạm vạch son (nhịp) | 20 nốt; trúng giữa 1, lệch ít 0,6, chạm hụt −0,3 | cửa trúng +14 ms/bậc, hoa rơi chậm hơn |
| Hát (`hat`) | Giữ hơi theo giai điệu | GIỮ ngón tay để lên giọng, buông để xuống; giữ đóa hoa trong dải vàng (bài ca dao 4 câu) | thời gian nằm trong dải / tổng thời gian (82 % = 10) | dải giai điệu rộng thêm mỗi bậc |
| Cờ (`co`, học Kỳ) | Ăn quân: thế cờ vây 7×7 | chạm giao điểm đặt quân ăn nhóm trắng còn một khí | 5 thế, mỗi thế 2 | thêm 0,8 giây mỗi thế/bậc |
| Đầu hồ (`dauho`) | Ném tên vào bình | KÉO ngược rồi buông (lực + hướng), gió đổi mỗi lần | 6 lần: giữa miệng 1, vào miệng 0,7, vào tai bình 0,5 | đường bay dự kiến hiện dài hơn, miệng bình rộng hơn |
| Bắn cung (`ban`) | Bắn hồng tâm | ngắm đưa qua lại, chạm đúng lúc ngắm ở giữa (canh thời điểm) | 6 phát: hồng tâm 1 … trượt 0 | vòng trúng rộng thêm 6 %/bậc |
| Thơ (`tho`, học Thi) | Thư pháp đồ nét (jnwp, không chữ) | ĐẶT ngón tay ở chấm xanh rồi KÉO theo nét mờ, làm các nét theo số thứ tự (3 chữ 2–5 nét) | tiến độ dọc nét × độ giữ trong vệt (BAL.nw.calli) | vệt rộng hơn, bóng bút chạy sẵn, thêm giờ |
| Câu đối (`doi`) | Đối nét bút (jnwp, không chữ) | KÉO nét trong khay sang liễn phải: phải là hình lật gương của nét liễn trái, cùng hàng (3 hồi, 3–5 cặp) | mỗi cặp đúng một phần, đặt sai trừ BAL.nw.doi.miss | ít nét nhử hơn, hình mờ gợi sẵn, thêm giờ |
| Thắp đèn (`doden`, was Đố đèn) | Thắp đèn theo mẫu (`jlant.js`, no words) | 3 hồi, CHẠM: 1 chạm mọi đèn giống đèn mẫu (dáng + màu) · 2 chạm thắp đèn cho giống hình mẫu · 3 chạm đèn theo thứ tự dải mẫu | mỗi hồi có điểm gốc (3 / 3,5 / 3,5) × (nhanh), trừ mỗi lần chạm nhầm; hết giờ chỉ tính phần xong | số đèn, số mẫu, thời gian theo `BAL.lantern` (cột bậc 0/1/2) |
| Vẽ (`ve`, học Họa) | Đồ nét bút | VẼ bằng ngón tay theo nét mờ (cành trúc, lá lan, núi, sóng, trăng, chữ Nhân) | độ phủ nét × độ vững tay, 4 bức | vùng nét rộng thêm 10 %/bậc, thêm giờ |
| Cắm hoa (`hoa`) | Cắm thế thiên – nhân – địa | KÉO từng cành vào bình; cành dài = Thiên, vừa = Nhân, ngắn = Địa; cân thế hoa | khoảng cách đóa hoa tới vòng đích (85 %) + cân đối (15 %); 3 bình 3/4/5 cành | vòng đích rộng hơn, thêm giờ |
| Thêu (`theu`) | Nhớ mẫu thêu | NHỚ ô có mũi thêu rồi chạm lại | 5 hồi, 3→6 mũi | mẫu hiện lâu hơn 0,16 giây/bậc |
| Khéo tay (`kim`) | Gỡ rối chỉ | KÉO các nút cho đến khi không còn sợi chỉ nào chéo nhau | 3 mối rối 6/7/8 nút; gỡ xong 60 % + nhanh 40 %; chưa xong: theo số chỗ chéo đã gỡ | thêm 2,5 giây mỗi mối/bậc |
| Múa (`mua`, học Vũ) | Theo bước múa | XEM 4 thế sáng lên theo thứ tự rồi chạm lại (trí nhớ chuỗi) | 5 hồi, 3→5 bước | bước mẫu chậm hơn |
| Nấu ăn (`banh`, học Nấu nướng) | Canh lửa nấu món | GIỮ nút Quạt lửa cho lửa trong vùng xanh của từng bước + KÉO nguyên liệu vào nồi đúng thứ tự công thức | mỗi bước: đúng lượt 0,4 + đều lửa khi ninh 0,6; sai lượt/bỏ đồ lạ −0,3 | vùng lửa rộng hơn, ít đồ nhử |
| Điều hương (`huong`, học Y thuật & điều hương) | Pha hương theo mẫu | KÉO 3 thanh trượt (3 vị hương) cho màu khói khớp hương mẫu, rồi Dâng hương | 3 lư; độ lệch tỉ lệ (0 → 10, lệch 0,32 → 0) | thêm giờ |

Không hai môn trùng cơ chế: nhịp rơi (Đàn) · giữ/buông liên tục (Hát) · giải thế (Cờ) · kéo-ném vật lý (Đầu hồ) · canh thời điểm một chạm (Bắn cung) ·
đồ nét theo thứ tự (Thơ/thư pháp) · lật gương nét bút (Câu đối) · chọn/thắp đèn theo mẫu (Thắp đèn) · đồ nét tự do (Vẽ) · đặt góc theo bố cục (Cắm hoa) · nhớ vị trí (Thêu) ·
gỡ đồ thị không chéo (Khéo tay) · nhớ chuỗi (Múa) · giữ đại lượng + thứ tự (Nấu ăn) · pha tỉ lệ thanh trượt (Điều hương).

## Thứ hạng (một luật cho mọi người)
Phần thi = **tài nghệ** (chỉ số + bậc tài nghệ theo công thức từng môn, như j71 SC7; Hoàng thượng ưa môn nào thì bậc môn đó ×2) + **chuẩn bị** + **màn thi**.
- Ngươi: màn thi = phần tự chơi 0–10, quy ra 0–`luck` (j71: 30).
- Phi tần khác (khi j82 tự chấm): màn thi rút theo **cùng bậc tài nghệ**: phần ≈ 4 + 0,4·bậc ± 4 (0–10), quy ra cùng thang. Hàm `kg82NpcRaw(p, kind)` để j71 dùng chung nếu muốn.
- Rows j71 đưa sẵn (đã có may rủi 0–`luck`) giữ nguyên, để bảng thi của j71 và j82 không lệch nhau.
- "Để tài nghệ quyết định" = màn thi bằng mức của người cùng bậc (5/10 khi đối thủ do j71 chấm).
- Kết quả trả về như cũ: `{score, raw, skill, talent, prep, skipped, place, of, standings:[{id,name,score}], shown:true}`; bảng thứ bậc vẽ bằng `kitGameResult` (bục vinh danh review/kit-podium chỉ cần đọc `standings`).

## Giao diện
Chỉ bộ kit: `kitGameFrame` (ấn TÀI NGHỆ, Cách chơi, ô HUD Phần / Hồi / Còn), trò vẽ trong `.kgbox` (canvas), nút `.kgbtn` trong hàng `.kg82act`,
kết quả `kitGameResult`. Không thêm CSS mới ở j91.

## Tranh (sửa theo kiểm duyệt 11/14)
Nền bàn chơi và mọi đồ vật là tranh gpt-2-6 (`img/kit/mg-*.webp`, 24 nền + 73 mảnh rời); canvas chỉ vẽ vạch nhịp, vệt ngắm, dải giai điệu, nét mực, sợi chỉ, vòng đích, thước lửa, màu khói và chữ.
Thi dùng nền sân hội (khán đài, rèm, đèn lồng); học, tự luyện, tác phẩm dùng nền phòng học riêng. Bảng đủ các trò và tranh: `dev/kit/KIT.md` mục 13.1.


## Exam games, no word games (family C, review/nw-quiz, owner 16/11 07:20Z)
The four promotion-exam kinds that were question banks are now skill games of the same subject (`dev/build/jnwq.js`, numbers in `BAL.nwq`):
| Kind | Game (engine) | Action | Scoring (raw 0–10) | Easier at low tier |
|---|---|---|---|---|
| le Lễ nghi | Bày lễ (`lay`) | drag each object to the place it has on the model altar | pieces placed right − misses·BAL.nwq.miss − hints·BAL.nwq.hint | 3 objects, model always shown, wrong drop bounces back |
| tc Trị cung | Phân kho (`sort`) | drag each ware into the storeroom whose door shows the same kind of ware | same | 2 samples + label on each door |
| xa Xử án | Khám vật chứng (`clue`) | tap the suspect whose robe and carried thing match the pictured evidence | 2 points a case, 5 cases | 3 suspects, 2 clues, colour/thing labels |
| thq Thái hậu hỏi | Xếp chỗ ngồi yến (`seat`) | drag each guest to a seat: more jade pins = higher rank = nearer Thái hậu | same as lay | 4 guests, seats numbered |
Tier 2 (free placement judged on «Xong», model hides after BAL.nwq.peek s) · every tier: Gợi ý button, first-time demo card, quiet auto-hint when she stalls (tier 0/1).
Tier comes from `mgTier(kind, occasion)` (review/mg-balance) when it exists, else `kg82Tier(lv) + BAL.nwq.shift`. The old Tài nghệ lesson «Y thuật & điều hương» (j5 `MG.y` quiz) now plays the pha-hương game.

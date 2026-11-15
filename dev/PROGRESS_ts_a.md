# PROGRESS review/ts-a — Top 15 lô A (sếp duyệt 15/11 02:00Z)

Nhánh từ origin/review/book-release @004d90f5. Mã: `dev/build/jts.js` (thêm vào assemble.py ngay trước j84). KIT.md mục 35.
Thử: `python3 -m http.server 8765` ở gốc kho, rồi `node dev/test/ts-a.js http://localhost:8765/index.html 755x1000@2 dev/shots/ts-a fold`
(và `1180x820@2 … ipad`); `node dev/test/ts-a.js <url> 755x1000@1 /tmp x smoke` chạy 60 tuần liền xem lỗi.
Đo bot: `node dev/measure/run_url.js <url> sens 80 out.json` rồi `python3 dev/measure/an7.py out.json`.

## Đã làm (mỗi ý: có sẵn gì → nối gì)
- **(6) Nguy hiểm chung** — có sẵn: Nguy hiểm từng người (j24 danger/bandOf, thang 4 mức). Thêm: một thanh gộp = cơ một tháng có ít nhất một người
  ra tay với nàng (cùng công thức rivalsBuoi: mức × phần nhắm × 9 buổi), chỉ gộp người nàng đã rõ lòng (người chưa rõ đếm riêng: thông tin thật).
  Ô "Nguy hiểm chung: N" ở hàng Tình trạng; chạm → bảng (người nặng lòng nhất, cách tính) + 2 việc: Đóng cửa giữ mình (2 tuần mưu hại giảm nửa,
  Sủng -2), Biếu quà làm lành (12 bạc/người: bớt ghen 8, bớt oán 5). Điềm báo: khi thanh lên bậc (≥30, ≥60) cung nữ thân tín báo trước.
  NPC cùng luật: phi tần bị nhiều người nhắm (≥35) tự đóng cửa giữ mình theo tính nết; giữ mình áp cho cả hai chiều (npcAct).
- **(5) Ngưỡng trước kỳ xét** — có sẵn: điều kiện sắc phong (promoReqP, bảng Phẩm vị j6). Thêm: ô "Xét phẩm: thiếu N/đủ" + bảng Đủ/Thiếu x/y;
  tuần cuối tháng, khi chỉ còn thiếu ≤1 điều, báo trước "Xét phẩm cuối tháng". Trước hai yến thi (tháng giêng: Sắc + Vũ; tháng bảy: Tài + Cầm/Thi)
  báo trước một tuần: phần gốc của nàng, phần gốc cao nhất năm trước (chưa kể vận may).
- **(3) Hoàng thượng triệu riêng** — có sẵn: trò Đàn (rhythm), Cờ (go) ở j82/j91; "Hoàng thượng đến" ghé uống trà (j24). Thêm: mỗi tuần Hoàng thượng
  có thể triệu một phi tần (theo tâm trạng ngài; chọn người theo Sủng^1.4 × Ân tình; cùng luật cho NPC): đàn / cờ / du hồ (du hồ chỉ tháng 4–9;
  đàn/cờ nặng theo bậc Cầm/Kỳ của người được triệu). Trò nhỏ quyết định Sủng +1..+7, Ân tình +1..+4; Bỏ qua = cơ may thường (theo bậc tài nghệ + Tài/Tâm cơ).
  Du hồ: khi biên cương bất ổn (trieu.bien < 50) thẻ ghi điềm báo "cấm quân đang lùng loạn đảng", có lựa chọn xin đổi sang ngắm hoa; nếu đi, 40% gặp
  "Lau sậy khẽ động": chạm Hộ giá trong 3,5 giây → Sủng +6, Danh +4, Ân tình +4; không kịp → cấm quân lo, nàng Sức -8. Không chết, không chi tiết bạo lực.
  Trò mới: du hồ (hái sen trôi qua khoảng Tầm tay).
- **(4) Lễ tấn phong** — có sẵn: thánh chỉ + hoạt cảnh kitEdict, ban thưởng tấn phong. Thêm: sau khi nàng được tấn phong, lễ có khách (phi tần thật,
  lời chúc theo thiện cảm/ghen thật: thân / theo lễ / gượng), quà mừng của người thân (thiện cảm ≥30), rồi chọn lì xì: hậu (8 bạc/khách: bớt ghen 6,
  thiện cảm +4, Danh +2) / vừa (4 bạc) / không phát (Danh -2, người đang ghen ≥40 ghen +3). Phi tần khác tấn phong thì mời nàng: Đến chúc (Sức -5,
  thiện cảm +5, nhà nàng có của thì được lì xì 6 bạc) / Gửi lễ (15 bạc) / Không đến (thiện cảm -6, oán +3). NPC khách khác: chủ giàu phát lì xì → thiện cảm.
- **(12) Ân thưởng sau sinh** — có sẵn: sinh hoàng tử thăng một bậc, bổng thêm, 50% được ban một món (hên xui). Đổi: bỏ hên xui; Hoàng thượng ban chắc
  khi sinh hoàng tử, khi Sủng mẹ ≥30 hoặc là con đầu; Thái hậu ban (nhân sâm/yến/đệm gấm + 20 bạc) khi Thái hậu với mẹ ≥20; con đầu Danh +3.
  Một bảng "Ân thưởng sau sinh" (tranh ev-sinh-no, nút Tạ ơn). Cùng luật cho NPC.
- **(14) Thả đèn hoa đăng** — có sẵn: không. Thêm: thẻ Hành sự đêm Nguyên tiêu / Thất tịch / Trung thu (buổi tối, 2 khắc, 10 bạc, một lần mỗi hội), chọn
  điều cầu, trò nhỏ thả đèn (kéo đèn theo dòng sáng, gió đẩy, tránh hoa sen). Kết quả gắn nguyên nhân thật: Cầu tin tức → người hầu nghe được bên hồ
  lòng một người đang muốn hại nàng (nếu có) hoặc Thư nhà (người nhà gửi vào, mỗi năm một lần); Cầu bình an → Đức +1, Phúc duyên +2 (tối đa 6 mỗi kiếp);
  Cầu thánh ân → chỉ khi Hoàng thượng thật dạo hồ (tâm trạng ≤ bình thường và Sủng ≥20): Sủng +3, Ân tình +2. NPC cũng thả đèn (Đức +1, có khi được ngài để ý).
- **(2) Hội phối đồ theo đề** — có sẵn: món đeo (Cài tóc / Đeo tay), vải may áo, luật vượt phẩm (j8). (Hệ trang phục j92 của review/wardrobe chưa gộp.)
  Thêm: tháng ba / chín báo đề (Thanh nhã / Phú quý / Hương sắc), trung tuần tháng tư / mười mở hội; nàng tự phối 4 chỗ trên bảng ô đồ (kitItem) hoặc
  Bỏ qua để cung nữ chọn giúp (đúng ý theo lòng nàng); điểm = hợp đề + phẩm đồ − vượt phẩm (bị nhắc: Danh -3) rồi + Sắc + Tâm cơ; NPC phối từ rương
  của họ (khéo hay vụng theo Tâm cơ); bục vinh danh; Nhất: Sủng +4, Danh +4, một món ban. Mượn đồ: người thân (thiện cảm ≥25) có món hợp đề thì mượn
  được, xong hội trả lại (thiện cảm -2, nợ ân tình).

## Ảnh (dev/shots/ts-a/): fold-* và ipad-* mỗi ý một ảnh trở lên.

## Đề xuất tranh (chưa vẽ, chờ sếp)
Không bắt buộc — đã dùng tranh có sẵn. Nếu sếp muốn đẹp hơn: (a) nền trò du hồ: mặt hồ sen ban ngày nhìn từ mũi thuyền (mg-duho-bg, ngang + dọc);
(b) nền trò thả đèn: dòng nước đêm hội hoa đăng, không người (mg-den-bg); (c) mảnh đèn hoa sen trôi nước (mg-den-lotuslamp). Hiện dùng ev-le-ha, ev-le-thu-2, doden-lantern.

## Cân bằng
(đang đo — xem mục dưới khi xong)

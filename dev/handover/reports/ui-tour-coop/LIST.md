# UI tour — CO-OP (both seats) — LIST (main 8c8b8b6b, LIVE co-op Worker)

PRIORITY #1 CHECK: OD L594 (co-op is the core, both seats), L1060-1063 (friend chip spec), L165 (stranger rule, friend = "Hảo hữu của ta" until met), L1412 (Chọn sổ tabs); main dev/build/jcoopworld.js (buildFriend), jcooptimer.js (kitCoopFriend / kitCoopFriendPanel / kitCoopHold), jcoopchat.js, jcooplobby.js, j15.js rvCard, j61.js stranger mask, j79.js kitPersonStats; review/ui-tour 6d43f4bc (350-page solo PDF, co-op not captured: 403 then). Reused dev/test/coop-e2e.js two-browser setup (coop-serve.js, clear/tapText) → dev/test/coop-ui-tour.js.

Owner (21/11 ~01:52Z, verbatim): "Mấy cái khung PDF file bạn gửi tôi á, không có thấy cái người chơi thứ hai, tức là không có chỗ cho cái người chơi thứ hai để mà tôi thấy được cái thông tin của người đó đó."

Build: `python3 dev/build/assemble.py` on origin/main 8c8b8b6b; two Playwright browsers, host A = seat a (COOP_A_ORIGIN=tt, Con gái Tể tướng), guest B = seat b (COOP_B_ORIGIN=nc, Công chúa Cao Ly hòa thân), real room on https://ctm-coop.victoria-tntt.workers.dev. Every shot taken at Fold portrait 755x1000 and iPad landscape 1180x820 (same page, viewport switched, deviceScaleFactor 1, JPEG q72). Read-only: no game code changed.
PDF: `ui-tour-coop.pdf` — 50 pages (TOC + 49 screens, Fold left / iPad right, seat named on every page), 15.5 MB. Re-run: `COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc node dev/test/coop-ui-tour.js <outdir>` then `python3 dev/handover/reports/ui-tour-coop/mkpdf.py <outdir> out.pdf`.

## Part A answer — where a player sees the OTHER player's info
| Place | What it shows | How to reach | Code |
|---|---|---|---|
| Friend chip (top bar, always in co-op) | grey face until met + "Hảo hữu của ta"/her name + ONE status (Sẵn sàng / Đang bận / Đang làm việc / Vắng / Tạm dừng) + buổi countdown | always visible | jcooptimer.js:229-232 kitCoopFriend |
| Friend panel | 3 rows: her status, time left this buổi, my khắc + Tạm dừng button. No rank/stats/relations | tap the chip | jcooptimer.js:233-241 kitCoopFriendPanel |
| Hậu cung › Phi tần card | she is an NPC entry in rivals: portrait, rank, name, sở trường, tính nết, "đã biết", relation chips (Thiện cảm/Oán/Ghen), stat chips (mostly "?"), Gặp mặt / Giao thiệp / Hại buttons | Hậu cung tab › Phi tần › her thumb | jcoopworld.js:81 buildFriend; j15.js:41 rvCard; j79.js:1231 kitPersonStats |
| Giao tình › Ân oán | relation viewer (Ta / Chí tôn / Phi tần groups) — in this run it opened on "Ta ↔ Hoàng thượng"; she sits in the Phi tần group | Giao tình tab | jhc.js:85-105 |
| Stage token | her figure when she is in the same place | walk to the same place | jcoopworld.js:283 refreshHere |
| Thư từ (chat) | her name + messages only | header Thư button | jcoopchat.js:50 |
| Lobby / "Đợi hảo hữu" panels | room code + "Hảo hữu: đã vào phòng / đang vắng" | lobby, disconnect | jcooplobby.js:116 |

Catches seen in the PDF: (a) the stranger rule masks her everywhere until met (p18-19: "Người lạ", silhouette, only "Hỏi người hầu"); even after "Đã quen" (p22-23) her card shows tính nết "chưa rõ" and stats "?" — nothing about her health, khắc, household, kids, what she is doing in words. (b) tiểu thư road (jkc, friendHome) → no rivals entry, only the chip; (c) servant road → only a maid row in a consort's staff (not captured this run, origins pinned tt/nc). (d) There is NO dedicated partner sheet anywhere.

## Pages

### 1 · Vào phòng chơi cùng
- p2 · A host · Màn đầu (chủ phòng)
- p3 · A host · Chọn sổ — tab Cùng hảo hữu
- p4 · A host · Phòng chờ của chủ phòng: ám hiệu, 1-2-3, chọn phút mỗi buổi
- p5 · B guest · Khách mở đường dẫn mời (vào phòng)
- p6 · A host · Chủ phòng khi khách vào

### 2 · Màn chính khi chơi cùng (chip hảo hữu, đồng hồ)
- p7 · A host · Popup: Tiền truyện · Con gái Tể tướng · 3/4
- p8 · A host · Popup: Tiền truyện · Con gái Tể tướng · 4/4
- p9 · A host · Popup: Tuyển chọn
- p10 · A host · Thi tuyển chọn mở đầu (mini-game, đè lên bảng Nhập cung)
- p11 · B guest · Popup: Tiền truyện · Công chúa nước Cao Ly hòa thân · 3/4
- p12 · B guest · Popup: Tiền truyện · Công chúa nước Cao Ly hòa thân · 4/4
- p13 · B guest · Popup: Lễ ra mắt
- p14 · A host · Màn chính: chip hảo hữu trên cùng + đồng hồ buổi
- p15 · B guest · Màn chính: chip hảo hữu trên cùng + đồng hồ buổi (đang có báo Nội vụ phủ)
- p16 · A host · Chạm chip hảo hữu → bảng hảo hữu (chỉ trạng thái)
- p17 · B guest · Chạm chip hảo hữu → bảng hảo hữu (chỉ trạng thái; báo Nội vụ phủ phía sau)

### 3 · Thông tin hảo hữu (Hậu cung › Phi tần, Giao tình)
- p18 · A host · Hậu cung › Phi tần: thẻ của hảo hữu khi CHƯA quen (luật người lạ)
- p19 · B guest · Hậu cung › Phi tần: thẻ của hảo hữu khi CHƯA quen (luật người lạ)
- p20 · A host · Giao tình › Quan hệ (hảo hữu trong nhóm Phi tần)
- p21 · B guest · Giao tình › Quan hệ (hảo hữu trong nhóm Phi tần)
- p22 · A host · Thẻ hảo hữu khi ĐÃ QUEN (Hậu cung › Phi tần)
- p23 · B guest · Thẻ hảo hữu khi ĐÃ QUEN (Hậu cung › Phi tần)
- p24 · A host · Giao tình › Quan hệ khi đã quen
- p25 · B guest · Giao tình › Quan hệ khi đã quen

### 4 · Sang cung hảo hữu
- p26 · A host · Ở cung của hảo hữu (r902)
- p27 · B guest · Ở cung của hảo hữu (r4)

### 5 · Lời mời / hành động giữa hai người
- p28 · A host · Kết giao (ally) chủ phòng → khách — người ngỏ ý: «Ngươi ngỏ ý kết giao với Liễu Khinh Vũ, đợi nàng trả lời. »
- p29 · B guest · Kết giao (ally) chủ phòng → khách — hảo hữu nhận lời mời: Hảo hữu tìm đến
- p30 · A host · Kết giao (ally) chủ phòng → khách — kết quả về người ngỏ ý: Hảo hữu nhận lời
- p31 · B guest · Kết giao (ally) chủ phòng → khách — bên hảo hữu sau khi nhận: Hảo hữu ra tay
- p32 · B guest · Tặng quà (gift) khách → chủ phòng — người ngỏ ý: «Ngươi ngỏ ý tặng quà với Lâm Như Ý, đợi nàng trả lời. »
- p33 · A host · Tặng quà (gift) khách → chủ phòng — hảo hữu nhận lời mời: Hảo hữu tìm đến
- p34 · B guest · Tặng quà (gift) khách → chủ phòng — kết quả về người ngỏ ý: Hảo hữu nhận lời
- p35 · A host · Tặng quà (gift) khách → chủ phòng — bên hảo hữu sau khi nhận: Hảo hữu ra tay
- p36 · A host · Tung tin đồn (hại nhỏ) chủ phòng → khách — người ra tay: «Lời đồn ngươi tung ra về Liễu Khinh Vũ không ai tin. (sai Quỳnh Chi đi»
- p37 · B guest · Tung tin đồn — bên bị hại thấy: Biến cố

### 6 · Thư từ (trò chuyện)
- p38 · A host · Thư từ: nút (Thư) có tin mới (trên đầu)
- p39 · A host · Thư từ: bảng trò chuyện
- p40 · B guest · Thư từ: nút (Thư) có tin mới (trên đầu)
- p41 · B guest · Thư từ: bảng trò chuyện

### 7 · Đồng hồ, Sẵn sàng, Tạm dừng
- p42 · A host · Chủ phòng đã bấm Sẵn sàng: chờ hảo hữu
- p43 · B guest · Khách thấy: hảo hữu đã sẵn sàng
- p44 · A host · Sang buổi mới cho cả hai
- p45 · A host · Tạm dừng (người bấm)
- p46 · B guest · Tạm dừng (hảo hữu thấy)

### 8 · Cuối tuần / đợi hảo hữu
- p47 · A host · Buổi tối: chủ phòng đã xong, nút «Chờ hảo hữu…»
- p48 · A host · Hết ngày: màn Bình minh (cả hai đã xong buổi tối)
- p49 · B guest · Sang ngày mới (khách): màn Bình minh

### 9 · Hảo hữu rời phòng
- p50 · A host · Hảo hữu mất kết nối: chờ hảo hữu trở lại

## How shots were made / test steps (honest list)
- Real clicks: title → Cùng hảo hữu → Mời hảo hữu; guest opens `?room=` link; friend chip tap; Thư từ panel opened through its hook `COOPCHAT.openPanel()` and messages sent with `COOPCHAT.send()`; Sẵn sàng (#next) pressed on both seats; Tạm dừng pressed in the friend panel.
- Forced (test steps, labelled): opening mini-game resolved with «Để tài nghệ quyết định»; "Đã quen" pages (p22-25) = S.known=3 + S.met set by script (as after greeting her); "Ở cung của hảo hữu" (p26-27) = place set to her palace by script (she was not at home: palace shown empty); asks = `runAct(S, friend, 'ally'|'gift'|'rumor')` (the same call the card buttons make), the partner answered «Nhận».

## Not captured (no silent skip)
- Partner view on the tiểu thư road (jkc) and the servant road (guest maid): origins pinned to tt/nc; needs COOP_B_ORIGIN=cnv / a tiểu thư origin run.
- Pet help/harm/steal on the friend, item gift with picker, poison/frame on the friend: only ally/gift/rumor asks shot.
- Chọn sổ co-op tab with saved rooms (rooms were empty in this fresh browser).
- Guest's own "Đợi hảo hữu trở lại" (only host side shot when the guest left); reconnect / rejoin.
- The friend-chip "Đang vắng" / "Đã sẵn sàng" on the Fold header is cut short ("Thường tại Bạch…") — seen p43; layout note only.
- Giao tình › Ân oán was not switched to "Phi tần → hảo hữu" (it opened on Ta ↔ Hoàng thượng).

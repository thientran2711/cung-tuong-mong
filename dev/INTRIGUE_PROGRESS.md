# Mưu hại thành chuỗi + Phòng bị (j70) — trạng thái và dữ liệu cho bộ giao diện

Nhánh: `review/intrigue`. Module: `dev/build/j70.js`, nạp cuối cùng trong `assemble.py` (sau j68/j68e). Chỉ bọc hàm, không sửa module khác. Tắt: `window.__j70off=1`.

## Chuỗi mưu
động cơ (mức nguy hiểm, bị làm nhục, ghen khi Sủng nàng tăng nhanh, tranh ngôi cho con, lệnh phe) → chuẩn bị 2–4 tuần (mỗi bước để lại dấu vết riêng theo cách làm và nơi chốn) → chờ thời cơ (lễ hội, ốm, mang thai, trở dạ, mưa, thất sủng, đêm vắng) → ra tay bằng hành động có sẵn (ACT/runAct/mindRun, chứng cứ evA, caught/punish/accuse) → điều tra.
16 cách × 47 đường mưu (`j70Count()`). Tối đa 4 mưu NPC cùng lúc, 2 nhắm vào người chơi, người chơi tự bày 2.

## Phòng bị
- (a) Tự ý bảo vệ: cung nữ thân tín, kẻ hầu trung thành, phi tần thân, Hoàng thượng, Thái hậu — xác suất theo lòng / thiện cảm / tính nết; tin báo ghi rõ từng người.
- (b) Lệnh người chơi giao: `canh` canh chừng cung, `thudoc` thử độc, `theodoi` theo dõi một người, `giuchung` giữ sổ sách làm chứng. Mỗi kẻ hầu một việc, kẻ giữ việc không sai đi được; có giá bạc/lòng mỗi tháng; kẻ đã bị mua chuộc giữ việc cũng như không.
- Nút "Giao việc phòng bị" trên thẻ kẻ hầu (pcard/pbtn của bộ giao diện, nhóm "Phòng bị"); mọi lời cảnh báo có các cách ứng phó.

## Dữ liệu cho bảng của bộ giao diện
| hàm | trả về |
|---|---|
| `threatsAgainstMe()` | các mối đe dọa người chơi đã biết: `{id, who (phẩm + tên), kind:"plot"|"danger", method, route, stage, waitsFor, tells[], why, ev, evNeed, band}` |
| `defenceOrders()` | `{orders:[{k,name,desc,servant:{sid,name,loyal},target,costMonth:{bac,loyal},busy,power}], earned:[{k,name,desc}], types:[...]}` |
| `resolveNotices()` | 20 tin gần nhất: `{wk,id,who,rank,act,actName,ok,why,whyK,whyV,self[],by[],gainEv,evNow,evNeed,lost[],body,sentBy}` |
| `openDefence()` | mở hộp thoại giao lệnh |
Kiểm thử: `j70Force(method,route,actorId|'me',targetId|'me')`, `j70Tick()`.

## Hủy dung
Hành động `huydung` (mức hại nặng) cho mọi người; 4 đường mưu (phấn độc, canh nóng lỡ tay, mèo dữ/ong, son phấn hỏng). Sẹo nhẹ/vừa/nặng: Sắc thực (effSac) -10/-25/-45 khi còn sẹo, Sủng -4/-8/-14, Danh -1/-3/-5; lành sau 4/8/14 bước tuần (thái y tâm phúc, Y ≥2, đang chữa mỗi thứ +1 bước/tuần); vừa để lại Sắc -3, nặng -15 nếu không có Ngọc dung cao / Tuyết liên. Che mạng: phần Sắc mất còn 2/3. `scarOf(p)` → `{sev,name,sacLost,weeksLeft,veil,treated,permanent,chip}`.
Mạng che trên chân dung/hình (img/veil*.png trên review/act-art) là việc của bộ giao diện: đọc `scarOf(p).veil` / `p.scar`.

## Cân bằng (bot hợp lý, dừng đời khi lên Hoàng hậu)
- main + j68 (không j70): n=91, Hoàng hậu 32%, chết sớm 41%.
- kit-panels + j68 (không j70): n=73, Hoàng hậu 52%, chết sớm 22%.
- kit-panels + j68 + j70 (bản cuối): n=124, Hoàng hậu 58%, chết sớm 14%; chết trong 6 tuần đầu: 0.
Núm chỉnh: `J70CFG.mot` (tần suất mưu do động cơ), `J70CFG.prep` (lợi thế khi chuẩn bị), `J70CFG.cap`/`capMe`.

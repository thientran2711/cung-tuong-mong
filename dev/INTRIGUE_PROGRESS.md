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

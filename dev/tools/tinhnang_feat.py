import html,collections
X,R,D,L,T,S='✅ Xong','⏳ Chờ duyệt','🔧 Đang làm','🚀 Chờ lên live','🔁 Chờ sếp thử lại','❓ Chờ sếp chọn'
data=[("Nhân vật & thời gian",[
("Chọn xuất thân, thân phận, ngoại hình","✓","✓",X),("Buổi / khắc, lịch tháng, mùa, thời tiết","✓","✓",X),
("Mọi «còn kịp không» tính khắc còn trong ngày","✓","✓",X),("Đi lại tốn khắc (gần/xa)","✓","✓",L+" (D)"),
("NPC đi từ việc này sang việc kia có đường đi thật","—","✓",L+" (D)"),("Tên cổ trang không trùng, một sổ tên chung","✓","✓",D),
("Cân lại chỉ số khởi đầu theo xuất thân","✓","✓",D)]),
("Hậu cung & thăng tiến",[("Thăng / giáng vị phân, phong hiệu","✓","✓",X),("Thỉnh an, thăm hỏi, quan hệ ân oán","✓","✓",X),
("Ân oán với Nam nhân / Cung nhân","✓","✓",D),("Hoàng thượng sủng hạnh, thị tẩm","✓","✓",X),("Đêm cuối: tranh sủng / chặn ngự giá","✓","✓",R),
("Sổ 10 đêm trong tuần","✓","✓",R),("«Giữ chân Hoàng thượng» (phòng thủ)","✓","✓",D+" (D)"),("Lập phe, rủ vào phe","✓","✓",X),
("Phe lạnh nhạt: đường đi mới","✓","✓",R+" (E)"),
("Mang thai, sinh con, nuôi con","✓","✓",X),("Luật con cái (gọi về, Thái tử, mồ côi)","✓","✓",D+" (B)"),("Lãnh cung, giáng chức tịch thu","✓","✓",X)]),
("Mưu kế & chứng cứ",[("Mưu kế, vu oan, chứng cứ thật, phòng thân","✓","✓",X),("Hạ độc / giải độc","✓","✓",X),
("Mua an toàn bằng bạc (thuê người) — Tâm cơ","✓","✓",R+" (D)"),("Đồ vật thật: không tự biến mất (cung nữ trộm hộp trang sức)","✓","✓",D+" (B)")]),
("Đồ vật & kinh tế",[("Bạc, chợ, cửa hàng, tặng quà","✓","✓",X),("Việc vặt: cân lại tiền công","✓","✓",L+" (E)"),("Y phục, trâm, tủ đồ theo vị phân","✓","✓",D),
("Thêm ô đeo: hoa tai, giày","✓","✓",L+" (B)"),("Chọn đồ / quà mở ngay tại chỗ, không bật cửa sổ","✓","—",R),
("Đa Bảo Các: bày đồ, xa xỉ, ghé thăm, tố vượt phẩm","✓","✓",X),
("Đa Bảo Các: tranh tủ + 67 hình món đồ","✓","✓",D+" (C)"),("Cung nhân, tớ gái, thưởng người hầu theo vị phân","✓","✓",X),
("Bổng lộc tháng nào cũng có lựa chọn","✓","✓",D+" (E)")]),
("Trò chơi nhỏ",[("31 trò, Thử tay, nút Quay lại, không chữ khi chơi","✓","✓",X),("Luật mini-game gọn 5 giây","✓","—",X),
("Điểm theo tay người chơi + sở trường/sở đoản nhân vật","✓","✓",X),
("Tay NPC công bằng (chuông theo tuổi, học vấn)","—","✓",X),("Sửa trò lỗi: Đầu hồ, Hoa điền, Hoa đăng, Chải, Dung, Điều hương, Múa, Nấu","✓","—",T),
("Trò thủ công riêng: Thêu, Vẽ, Cắm hoa, Khéo tay","✓","✓",R),("Giới thiệu hội thi: tranh sự kiện trên đầu","✓","—",R+" (B)"),
("Trò tài nghệ với người (phần C)","✓","✓",L+" (E)"),("Cùng chơi / Thách đấu với người khác","✓","✓",D),
("Vẽ tay đồ vật/người trong trò (đèn, nghi phạm…)","✓","—",D),("Đưa Cờ, mưu kế, chăm thú, chăm cây vào Thử tay","✓","—",D),
("Đấu trực tiếp, bảng xếp hạng từng môn","✓","✓",D+" (E)")]),
("Đường đời & kết cục",[("Đường truyện từng xuất thân (ch.1–3, nhánh)","✓","✓",X),("Lời thoại đúng giọng từng người (story-voice)","✓","✓",R+" (E)"),
("Đường riêng Bắc Địch (4 nhánh)","✓","✓",X),
("Đường Phù Tang / công chúa ngoại quốc","✓","✓",L+" (E)"),("Lý do mỗi hồi (mục tiêu, thù, nợ, phe)","✓","✓",D),("Đường của Hoàng thượng (4 kiểu)","—","✓",D),
("Kết cục hiếm","✓","✓",X),("Màn kết cục / lễ hội toàn màn hình","✓","—",R),("Đại kết cục Thiên mệnh + Bảng + Sơ đồ nhánh","✓","—",X),
("Đại kết cục cho NPC (ngang người chơi)","—","✓",D),("Luân hồi, Sổ luân hồi","✓","✓",X)]),
("Ngoài cung (trước khi vào cung)",[("Tuyển tú: cổng cung → điện tuyển","✓","✓",X),("Bục tuyển tú: em gái + khuê hữu thi cùng","✓","✓",R),
("Chương ở nhà nhiều nhánh, sự kiện nhà (E9/E15/E28)","✓","✓",R+" (E)"),("Người nhà thật: nhũ mẫu, thầy, bà mối","✓","✓",R+" (E)"),
("Mang theo khi vào cung (thư mẹ, lời đồn cũ)","✓","—",D+" (B)"),("Cảnh ngoài cung, bản đồ thành","✓","—",R+" (B)")]),
("Chơi chung & giao diện",[("Chơi chung: mời, chờ khi chủ phòng vắng, chat","✓","✓",X),("Chơi chung: khách nhẹ, đồng bộ thế giới","✓","✓",D+" (B)"),
("Hảo hữu: icon bạn chơi chung trên thanh trên","✓","—",D),("Bộ kit giao diện chung (khung, nút, thẻ)","✓","—",X),
("Hộp thoại: một luật avatar, bỏ «ma ma» dẫn chuyện","✓","✓",L),
("Sửa giao diện theo 85 dấu sếp 21/11","✓","—",D),("Màu nền A «Ngọc sương» / B «Đào phấn»","✓","—",S),
("Tranh: kết cục, kết cục hiếm, sự kiện, thời tiết","✓","—",D+" (C)")])]
c=collections.Counter(s.split(' (')[0] for _,rows in data for *_,s in rows);n=sum(c.values())
col={X:'#1b7a2e',R:'#a8740c',D:'#b5651d',L:'#1f5fa8',T:'#8a4bb0',S:'#b0303a'}
h=f"""<html><head><meta charset=utf-8><style>body{{font-family:'DejaVu Sans';margin:28px;font-size:12.5px;color:#2a1a10}}h1{{font-size:21px;margin:0 0 4px}}.s{{color:#555;margin-bottom:8px}}table{{border-collapse:collapse;width:100%}}th{{background:#7c2a2a;color:#fff;text-align:left;padding:6px}}td{{border:1px solid #ccc;padding:5px 7px}}.g td{{background:#f3e3cc;font-weight:bold}}.c{{text-align:center;width:60px}}</style></head><body>
<h1>Cung Tường Mộng — Tính năng trong game (21/11, bản 4)</h1><div class=s>Tổng {n} mục · {' · '.join(f'{k}: {v}' for k,v in c.items())}<br>Người chơi / NPC: ✓ = làm được (luật hai chiều), — = không áp dụng. (B/C/D/E) = quản đốc giữ việc. 🚀 = đã duyệt xong, đang trong hàng lên live. Ước chừng ~92% xong / ~89% chơi được.</div>
<table><tr><th>Tính năng</th><th class=c>Người chơi</th><th class=c>NPC</th><th>Tình trạng</th></tr>"""
for g,rows in data:
    h+=f"<tr class=g><td colspan=4>{g}</td></tr>"
    for a,p,q,s in rows:
        k=s.split(' (')[0];h+=f"<tr><td>{html.escape(a)}</td><td class=c>{p}</td><td class=c>{q}</td><td style='color:{col[k]};font-weight:{'bold' if k==X else 'normal'}'>{s}</td></tr>"
open('tn.html','w').write(h+"</table></body></html>");print(n,c)

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
("Đường Phù Tang / công chúa ngoại quốc","✓","✓",X),("Lý do mỗi hồi (mục tiêu, thù, nợ, phe)","✓","✓",D),("Đường của Hoàng thượng (4 kiểu)","—","✓",D),
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
NEW=['Đi lại tốn khắc', 'NPC đi từ việc', 'Phe lạnh nhạt', 'Tâm cơ', 'Việc vặt', 'Chọn đồ / quà', 'Bổng lộc', 'Luật mini-game gọn', 'Giới thiệu hội thi', 'Trò tài nghệ với người', 'story-voice', 'Đường Phù Tang', 'Màn kết cục', 'Cảnh ngoài cung', 'Hảo hữu', 'Hộp thoại: một luật', 'Sửa giao diện theo 85']
c=collections.Counter(s.split(' (')[0] for _,rows in data for *_,s in rows);n=sum(c.values())
col={X:'#1b7a2e',R:'#a8740c',D:'#b5651d',L:'#1f5fa8',T:'#8a4bb0',S:'#b0303a'}
h=f"""<html><head><meta charset=utf-8><style>body{{font-family:'DejaVu Sans';margin:28px;font-size:12.5px;color:#2a1a10}}h1{{font-size:21px;margin:0 0 4px}}.s{{color:#555;margin-bottom:8px}}table{{border-collapse:collapse;width:100%}}th{{background:#7c2a2a;color:#fff;text-align:left;padding:6px}}td{{border:1px solid #ccc;padding:5px 7px}}.g td{{background:#f3e3cc;font-weight:bold}}.c{{text-align:center;width:60px}}</style></head><body>
<h1>Cung Tường Mộng — Tính năng trong game (21/11, bản 5)</h1><div class=s>Tổng {n} mục · {' · '.join(f'{k}: {v}' for k,v in c.items())}<br>Người chơi / NPC: ✓ = làm được (luật hai chiều), — = không áp dụng. (B/C/D/E) = quản đốc giữ việc. 🚀 = đã duyệt xong, đang trong hàng lên live. Ước chừng ~92% xong / ~89% chơi được.</div>
"""+"<div style='border:2px solid #1b7a2e;border-radius:8px;padding:8px 12px;margin:8px 0 12px'><b>Hôm nay 21/11 đã lên game (từ ~01:40Z): 25 lần lên live</b><br>\n<b>Tính năng:</b> Đường Phù Tang (công chúa ngoại bang) · luật mini-game gọn 5 giây · lịch tháng kiểu điện thoại (#42) · dấu cảm xúc khung tâm trạng (#39) · bảng Menu rộng (#37) · hộp thoại «Kiếp này» không đè nhau (#46) · túi đồ mở tại chỗ (#21) · chơi chung: tên không trùng · thêm nhãn «!» bấm-xem-chữ cho cả game.<br>\n<b>Sửa giao diện theo dấu sếp:</b> #3 #4 #25 #40 #41 (Chí tôn — màu vàng Hoàng thượng đang sửa lại), #38 cột trái khung người, ô quan hệ lẻ trải hàng, thẻ hành động vuông, ô Tốn một hàng, trò Chải/Dung/Đầu hồ/Điều hương sửa luật.<br>\n<b>Đã duyệt, đang lên live tối nay (14):</b> thẻ chương (#26–29 #43), tab trống (#15 #16 #22 #30), hộp thoại kit (#44 #47 #49 #54 #56 #72), bỏ «ma ma» (#58 #59 #67 #70 #77…), câu lặp (#85), dấu cảm xúc sự kiện (#68), ô đeo hoa tai/giày, đi lại tốn khắc, việc vặt, khuê các chơi chung, trò tài nghệ phần C, chức vị một kiểu chữ, ghi chú «!» (#60).<br>\n<span style='color:#666'>★ = mục mới hoặc đổi trạng thái hôm nay. Phần lớn việc hôm nay là sửa 85 dấu giao diện của sếp nên ít mục «tính năng» chuyển sang Xong.</span></div>"+"""<table><tr><th>Tính năng</th><th class=c>Người chơi</th><th class=c>NPC</th><th>Tình trạng</th></tr>"""
for g,rows in data:
    h+=f"<tr class=g><td colspan=4>{g}</td></tr>"
    for a,p,q,s in rows:
        k=s.split(' (')[0];star=' <b style="color:#c0392b">★</b>' if any(w in a for w in NEW) else '';h+=f"<tr><td>{html.escape(a)}{star}</td><td class=c>{p}</td><td class=c>{q}</td><td style='color:{col[k]};font-weight:{'bold' if k==X else 'normal'}'>{s}</td></tr>"
open('tn.html','w').write(h+"</table></body></html>");print(n,c)

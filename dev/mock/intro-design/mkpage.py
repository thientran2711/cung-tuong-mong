import html
T=[
('A','Hoàng thượng, Thái hậu, Hoàng hậu lần đầu hiện ra trong điện',
 'Ba cô tú nữ bước vào điện, chưa thấy ai trên ngai. Dòng suy nghĩ của nàng chạy từng chữ; tới chữ «Hoàng thượng» thì nền mờ đi, hình nửa người của ngài hiện to, tên viết dọc bên cạnh, rồi mở ra toàn thân và thu nhỏ về chỗ ngồi. Sau đó tới Thái hậu, rồi Hoàng hậu, cùng một cách.',
 [('A1','Thẻ cận cảnh','Hình nửa người to giữa màn hình, nền mờ; mở ra toàn thân rồi bay về chỗ ngồi. Đúng như sếp tả.'),
  ('A2','Máy quay đẩy sát','Cả điện phóng sát vào chỗ ngồi của người đó rồi kéo ra; người đứng yên tại chỗ, tên nằm dưới. Mượt như phim hơn, ít giống thẻ bài.')],'A1'),
('B','Tú nữ tự giới thiệu ở sân chờ',
 'Một tú nữ cất lời giới thiệu bản thân: nàng nổi bật, những người khác tối và mờ đi, tên và quê quán hiện dưới chân, lời của nàng chạy từng chữ.',
 [('B1','Bước ra giữa, toàn thân','Nàng bước ra giữa và lớn thêm một chút (không vượt chiều cao chuẩn), tên dưới chân.'),
  ('B2','Thẻ nửa người trượt vào','Sân vẫn thấy mờ phía sau; hình nửa người trượt vào từ bên phải, tên viết dọc bên trái. Nàng không rời chỗ.')],'B1'),
('C','Tổng quản lên tiếng (nhân vật dẫn chuyện)',
 'Tổng quản bước lên to ra, nền mờ hẳn, khung lời đặt chỗ nào cũng được vì không còn gì phía sau để che.',
 [('C1','Ở giữa','Ông đứng giữa, khung lời nằm dưới.'),
  ('C2','Bên trái, khung lời bên phải','Giống bố cục sự kiện sếp đã chốt: người nói bên trái toàn thân, khung lời bên phải.')],'C2'),
('D','Điểm danh tú nữ: chữ chạy tới đâu, người sáng tới đó',
 'Cả điện tối, chỉ Tổng quản sáng. Dòng xướng tên chạy từng chữ; chữ chạm tới tên cô nào thì cô đó sáng lên và tên hiện dưới chân; dòng kế, cô kế.',
 [('D1','Sáng + tên dưới chân','Gọn, đúng điều sếp tả.'),
  ('D2','Thêm chùm sáng và ấn số','Có thêm chùm sáng ấm trên người được gọi và con dấu số nhỏ (nhất, nhị, tam, tứ) trên bảng tên.')],'D1'),
('E','Những lần gặp đầu tiên khác',
 'Cùng một cách làm cho mọi lần gặp đầu: người mới tới thăm và lần đầu Hoàng thượng ngự giá.',
 [('E1','Gặp người mới (dải tên)','Người đến bước vào, nền mờ nhẹ, dải «LẦN ĐẦU GẶP» + tên + nơi ở trượt vào rồi lui sau lời đầu.'),
  ('E2','Hoàng thượng giá lâm (ánh sáng ở cửa)','Phòng của nàng tối đi, chùm sáng ở cửa, bóng đen rồi hiện màu, bảng «Hoàng thượng giá lâm».')],'E2'),
('F','Ngày đầu ở Dưỡng Tú viện: ma ma chia sở, chia phòng',
 '12 cô xếp hàng trong sân. Giáo tập ma ma sáng lên, nền và các cô khác mờ đi. Bà xướng tên từng người, chữ chạy tới đâu: người đó hiện nửa thân to ở giữa rồi thu nhỏ đứng vào nhóm. Đủ 4 người thì cả nhóm dời về một góc: Tây sở, Đông sở, Bắc sở. Cuối cùng là phòng của nàng, có 3 bóng xám «Người lạ» (hình xám có sẵn trong kit). Ma ma tạm dùng hình một phu nhân lớn tuổi có sẵn.',
 [('F1','Chia ba sở, bốn người một phòng','Một phương án duy nhất vì đã bám sát lời sếp; nếu sếp muốn đổi cách bố trí nhóm (góc nào, to nhỏ ra sao) thì nói em chỉnh.')],'F1'),
('G','Kết quả chọn tú: ban hương nang (ở lại) và ban hoa (về nhà)',
 'Thái giám bưng khay đi dọc hàng. Cô nào được gọi thì sáng lên, túi thơm (ở lại) hoặc hoa (về nhà) được trao. Người ở lại bước sang bên, người ban hoa cúi chào rồi rời đi. Kết quả của chính nàng làm bản to riêng.',
 [('G1','Cả hàng tú nữ','Thái giám đi dọc hàng, từng cô một: túi thơm thì đứng sang phải, ban hoa thì cúi chào rồi đi.'),
  ('G2','Kết quả của chính nàng (bản to)','Nàng đứng giữa, khay bay túi thơm tới nàng, ánh sáng ấm. Cần một nền tranh riêng cho khoảnh khắc này (hiện tạm dùng nền điện), việc vẽ để sau vì đang giữ ngân sách ảnh.')],'G1')]
stills={'A':['8%','23%','54%','82%']}
out=['''<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Cảnh giới thiệu nhân vật</title>
<style>:root{--bg:#fbf3e6;--ink:#3a2410;--gold:#c99a3b;--red:#a8321f}@media(prefers-color-scheme:dark){:root{--bg:#1d1410;--ink:#f1e2c6}}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.55 "Be Vietnam Pro",system-ui,sans-serif;padding:0 16px 60px}
.w{max-width:1100px;margin:auto}h1{font-size:24px;margin:22px 0 4px}h2{font-size:20px;margin:36px 0 4px;border-top:2px solid var(--gold);padding-top:14px}
.tag{display:inline-block;background:var(--red);color:#fff6e0;border-radius:6px;padding:0 9px;margin-right:6px;font-weight:700}
.opt{border:1px solid var(--gold);border-radius:12px;padding:12px;margin:14px 0}.opt h3{margin:0 0 4px;font-size:17px}
.row{display:flex;flex-wrap:wrap;gap:14px;align-items:flex-start}.row figure{margin:0;flex:1 1 280px}
video{width:100%;max-height:78vh;background:#000;border-radius:8px}.st{display:flex;gap:6px;overflow-x:auto;margin-top:8px}.st img{height:210px;border-radius:6px;flex:none}
.rec{font-weight:700;color:var(--red)}small{opacity:.8}a{color:var(--red)}
</style></head><body><div class="w"><h1>Cảnh giới thiệu nhân vật lần đầu</h1>
<p>Mỗi loại có hai cách (A1/A2, B1/B2…). Sếp xem từng video (có nút tốc độ 0.5×–2× khi bấm vào video; kèm bản chạy nhanh gấp đôi), rồi cho em biết chọn chữ nào mỗi loại. Hình dựng thật trên bản game hiện tại, bằng nhân vật và nền có sẵn của game. Mỗi video có hai máy: <b>Fold dọc</b> và <b>iPad ngang</b>.</p>
<p><small><b>Lưu ý:</b> khung ngoài (thanh trên, cột bên phải, nút dưới) là bản game hiện tại, chỉ xem cảnh ở giữa.</small></p>
<p><b>Em khuyến nghị:</b> A1 · B1 · C2 · D1 · E1 và E2.</p>
<p><small>Một chỗ cần sếp quyết: cảnh giới thiệu chỉ chiếu một lần cho mỗi người (lần sau chỉ chạy bản rút gọn).</small></p>''']
B='intro-design/'
for L,title,desc,opts,rec in T:
    out.append(f'<h2><span class="tag">{L}</span>{html.escape(title)}</h2><p>{html.escape(desc)}</p>')
    for oid,on,od in opts:
        out.append(f'<div class="opt"><h3><span class="tag">{oid}</span>{html.escape(on)}{" <span class=rec>· em khuyến nghị</span>" if oid==rec or (L in "EG") else ""}</h3><p>{html.escape(od)}</p><div class="row">')
        for dev,dn in (('fold','Fold dọc 755×1000'),('ipad','iPad ngang 1180×820')):
            out.append(f'<figure><figcaption><b>{dn}</b></figcaption><video controls preload="metadata" playsinline src="{B}{oid}-{dev}.mp4" poster="{B}{oid}-{dev}-s2.jpg"></video><small><a href="{B}{oid}-{dev}-x2.mp4">bản nhanh gấp đôi</a></small><div class="st">'+''.join(f'<img loading="lazy" src="{B}{oid}-{dev}-s{i}.jpg" alt="">' for i in (1,2,3,4))+'</div></figure>')
        if oid=='G2':out.append('<p><small>Ghi chú cho họa sĩ: khoảnh khắc này cần một nền tranh riêng (hiện tạm dùng nền điện).</small></p>')
        out.append('</div></div>')
out.append('</div></body></html>')
open('page.html','w').write('\n'.join(out))

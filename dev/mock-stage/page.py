import os
from PIL import Image
S='/home/user/wt/mock-shots';O='/home/user/wt/mock/img/_review/mock-stage'
def cv(src,name):
    im=Image.open(src).convert('RGB');w=im.size[0]
    if w>1600: im=im.resize((1600,int(im.size[1]*1600/w)))
    im.save(f'{O}/{name}.jpg',quality=80)
cv(f'{S}/q/q-fold.png','q-fold');cv(f'{S}/q/q-ipad.png','q-ipad')
for f in os.listdir(f'{S}/m'):
    if f.endswith('.png'): cv(f'{S}/m/{f}',f[:-4])
def pair(n,cap=''):
    return f'<figure><div class="pr"><a href="mock-stage/{n}-fold.jpg"><img loading="lazy" src="mock-stage/{n}-fold.jpg" alt="Fold"></a><a href="mock-stage/{n}-ipad.jpg"><img loading="lazy" src="mock-stage/{n}-ipad.jpg" alt="iPad"></a></div><figcaption>{cap}<span class="dv">Trái: Fold 755x1000 · Phải: iPad 1180x820</span></figcaption></figure>'
H=f'''<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,noai"><title>Mẫu sân khấu và phòng trang điểm</title>
<style>:root{{--bg:#f7efe1;--card:#fffaf0;--ink:#3a2a1c;--gold:#b8901f;--red:#8a2020}}body{{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 system-ui,sans-serif}}
main{{max-width:1500px;margin:0 auto;padding:12px 16px 60px}}h1{{font:700 24px serif;color:var(--red)}}h2{{font:700 21px serif;color:var(--red);border-bottom:2px solid var(--gold);padding-bottom:4px;margin-top:34px}}
nav{{position:sticky;top:0;background:var(--bg);padding:8px 0;z-index:2;display:flex;gap:8px;flex-wrap:wrap}}nav a{{background:var(--red);color:#fff3d6;padding:6px 14px;border-radius:8px;text-decoration:none;font-weight:700}}
.v{{background:var(--card);border:1.5px solid var(--gold);border-radius:12px;padding:10px 12px;margin:14px 0}}.v h3{{margin:0 0 6px;font:700 19px serif}}.v h3 b{{background:var(--red);color:#fff;border-radius:6px;padding:0 9px;margin-right:8px}}
.pr{{display:grid;grid-template-columns:755fr 1180fr;gap:10px;align-items:start}}.pr img{{width:100%;border-radius:8px;border:1px solid #d8c49a;display:block}}
figure{{margin:8px 0}}figcaption{{font-size:14px;color:#6b5236}}.dv{{display:block;font-size:12px;color:#8a7458}}.rec{{background:#fff3c4;border-left:5px solid var(--gold);padding:8px 12px;border-radius:6px}}
@media(max-width:700px){{.pr{{grid-template-columns:1fr}}}}</style></head><body><main>
<h1>Mẫu: sự kiện toàn sân khấu · hội thoại · phòng trang điểm</h1>
<p>Mẫu dựng trên game thật (nhân vật thật, tranh phòng thật, khung kit thật), chưa đưa vào game. Sếp chỉ cần nói ví dụ “M1-B, M2-A, M3: Đã chỉnh tề”.</p>
<nav><a href="#q">Q</a><a href="#m1">M1</a><a href="#m2">M2</a><a href="#m3">M3</a></nav>
<h2 id="q">Q. Hôm nay khung sự kiện cỡ lớn nhất có che thanh trên / thanh 8 tab không?</h2>
<div class="v"><p><b>Có che thanh trên (một phần), không che thanh 8 tab.</b> Đo trên game thật, sự kiện chữ dài (khung XL):</p>
<ul><li><b>Fold:</b> khung từ y 115 đến 885; thanh trên kết thúc ở 157 → khung đè lên <b>hàng Tâm trạng và mép dưới hàng chỉ số</b> (42 px). Thanh 8 tab bắt đầu 918 → không bị khung che.</li>
<li><b>iPad:</b> khung từ y 125 đến 695; thanh trên kết thúc 157 → đè <b>hàng Tâm trạng</b> (32 px). Thanh tab bắt đầu 770 → không bị che.</li>
<li>Ngoài ra lớp tối phủ <b>toàn màn hình</b> (cả hai thanh): hai thanh bị tối đi và không bấm được khi khung đang mở.</li></ul>
{pair('q','Hôm nay: khung sự kiện XL (người bên trái).')}</div>
<h2 id="m1">M1. Sự kiện toàn sân khấu (người cắt nền, phóng to, chỉ còn khung thông tin bên phải)</h2>
<p>Hai thanh trên/dưới giữ nguyên, sáng rõ. Nền sân khấu làm mờ + tối nhẹ; ngày dùng tranh buổi sáng, đêm dùng tranh buổi tối của chính nơi đó (game đã có sẵn).</p>
<div class="v"><h3><b>A</b>Người lớn, khung chiếm khoảng nửa phải, có tranh sự kiện</h3>{pair('m1-A')}</div>
<div class="v"><h3><b>B</b>Khung rộng hơn, bỏ tranh sự kiện (sân khấu đã là cảnh)</h3>{pair('m1-B')}</div>
<div class="v"><h3><b>C</b>Lời kể thành ô thoại cạnh người, khung chỉ chứa lựa chọn</h3>{pair('m1-C')}</div>
<div class="v"><h3>Ban đêm (mẫu A)</h3>{pair('m1-A-night','Cùng bố cục, nền tranh buổi tối: vẫn tối nhưng phân biệt rõ với ban ngày.')}</div>
<p class="rec">Em đề xuất: <b>M1-B</b>. Khung đủ chỗ cho chữ dài + 3 lựa chọn trên Fold, iPad gần như không phải cuộn; người vẫn to hết chiều cao sân khấu.</p>
<h2 id="m2">M2. Kiểu hội thoại (người báo tin bên trái, nhân vật của sếp bên phải)</h2>
<div class="v"><h3><b>A</b>Mỗi ô nói nằm sát người nói, có đuôi chỉ vào người đó (Fold: nửa người, hai tầng · iPad: toàn thân hai đầu)</h3>{pair('m2-A')}</div>
<div class="v"><h3><b>B</b>Kiểu truyện tranh tương tác: một dải chữ dưới cùng, người đang nói sáng, người kia tối đi</h3>{pair('m2-B','Bước 1: người báo tin nói.')}{pair('m2-B2','Bước 2: tới lượt sếp chọn, ô lựa chọn gắn với nhân vật của sếp.')}</div>
<div class="v"><h3>Ban đêm (mẫu A)</h3>{pair('m2-A-night')}</div>
<p class="rec">Em đề xuất: <b>M2-A</b> nếu chọn kiểu hội thoại: nhìn là biết ai nói gì, không phải bấm thêm bước. Nhưng em nghiêng về <b>M1-B</b> cho mọi sự kiện (ít đổi, chữ dài vẫn đủ chỗ); M2 hợp cho các cảnh trò chuyện ngắn.</p>
<h2 id="m3">M3. Phòng trang điểm</h2>
<div class="v"><h3>Hôm nay</h3>{pair('m3-t1','Vào: chip «Chưa điểm trang» trên thanh trên hoặc thẻ Điểm trang.')}{pair('m3-t2','Hôm nay: chọn y phục trong khung trò chơi.')}{pair('m3-t3','Hôm nay: trò trang điểm trước gương đồng (giữ nguyên).')}</div>
<div class="v"><h3>Mới · 1. Chuyển cảnh</h3>{pair('m3-f1','Bấm Trang điểm: sân khấu phóng to dần về phía trước và tranh phòng trang điểm hiện lên (khoảng 0,7 giây, chạm để bỏ qua; chế độ «Gọn» chỉ mờ chuyển).')}</div>
<div class="v"><h3>Mới · 2. Trong phòng</h3>{pair('m3-f2','Gương «Thay xiêm y», bàn «Điểm trang», viền vàng sáng ôm sát đồ vật, lúc nào cũng sáng. Nút «Đã chỉnh tề» luôn có; «Quay lại» góc trên.')}
<p>Chữ đề xuất (cổ ngữ): gương <b>«Thay xiêm y»</b> (theo sếp) · khác: «Đổi xiêm áo», «Y phục». Bàn <b>«Điểm trang»</b> (theo sếp) · khác: «Trang đài», «Bàn phấn sáp». Nút xong: <b>A «Đã chỉnh tề»</b> · B «Hoàn tất» · C «Lui ra».</p></div>
<div class="v"><h3>Mới · 3. Thay xiêm y</h3>{pair('m3-f3','Người bên trái (đang mặc trung y), ô đồ bên phải (đúng ô đồ của game).')}{pair('m3-f4','Chạm một món → người bên trái thay đồ ngay (mờ chéo 0,25 giây).')}</div>
<div class="v"><h3>Mới · 4. Điểm trang</h3>{pair('m3-f5','Trò trang điểm hiện có, đặt trên nền phòng mờ, nhân vật đứng bên trái. (Dáng ngồi trước gương cần vẽ thêm tranh mới.)')}</div>
<div class="v"><h3>Mới · 5. Bấm «Đã chỉnh tề» → dáng cuối trong phòng</h3>{pair('m3-f6','Chỉ trang điểm: mặt đã trang điểm, mặc trung y.')}{pair('m3-f7','Chỉ thay đồ: mặc đồ mới, mặt mộc.')}{pair('m3-f8','Cả hai: dáng đầy đủ.')}
<p>Chuyển cảnh: người bước ra giữa phòng (0,6 giây), viền vàng tắt dần; sau đó trở lại sân khấu bằng cách thu nhỏ ngược lại.</p></div>
</main></body></html>'''
open('/home/user/wt/mock/img/_review/mock-stage.html','w').write(H)
print(len(os.listdir(O)))

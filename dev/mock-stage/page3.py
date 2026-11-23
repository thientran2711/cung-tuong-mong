# builds img/_review/mock-stage.html v3 (Q + event layout A1/A2 per owner 23/11 20:20Z/20:22Z + M3 kept). Throwaway (never land).
# Only the new m13-* files are written locally; Q + M3 pictures/videos stay on the CDN from v2.
import os, shutil
from PIL import Image
S = '/home/user/wt/mock3-shots'; R = '/home/user/wt/ms/img/_review'; O = R + '/mock-stage'
os.makedirs(O, exist_ok=True)
for f in os.listdir(O): os.remove(os.path.join(O, f))
def cv(src, name):
    im = Image.open(src).convert('RGB'); w = im.size[0]
    if w > 1600: im = im.resize((1600, int(im.size[1] * 1600 / w)))
    im.save(f'{O}/{name}.jpg', quality=80)
for f in os.listdir(S):
    p = os.path.join(S, f)
    if f.startswith('m13-') and f.endswith('.png'): cv(p, f[:-4])
    elif f.startswith('m13-') and (f.endswith('.mp4') or f.endswith('-poster.jpg')): shutil.copy(p, O)
def pair(n, cap=''):
    im=lambda d,a: f'<a href="mock-stage/{n}-{d}.jpg"><img loading="lazy" src="mock-stage/{n}-{d}.jpg" alt="{a}"></a>' if os.path.exists(f'{O}/{n}-{d}.jpg') else f'<div class="na">{a}: vừa khít, không cần kéo</div>'
    return f'<figure><div class="pr">{im("fold","Fold")}{im("ipad","iPad")}</div><figcaption>{cap}<span class="dv">Trái: Fold 755x1000 · Phải: iPad 1180x820</span></figcaption></figure>'
def vid(n, cap=''):
    return f'<figure><div class="pr"><video playsinline controls muted loop preload="metadata" poster="mock-stage/{n}-fold-poster.jpg" src="mock-stage/{n}-fold.mp4"></video><video playsinline controls muted loop preload="metadata" poster="mock-stage/{n}-ipad-poster.jpg" src="mock-stage/{n}-ipad.mp4"></video></div><figcaption>{cap}<span class="dv">Video · Trái: Fold 755x1000 · Phải: iPad 1180x820 · bấm ▶ để xem</span></figcaption></figure>'
H = f'''<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,noai"><title>Mẫu khung sự kiện và phòng trang điểm</title>
<style>:root{{--bg:#f7efe1;--card:#fffaf0;--ink:#3a2a1c;--gold:#b8901f;--red:#8a2020}}body{{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 system-ui,sans-serif}}
main{{max-width:1500px;margin:0 auto;padding:12px 16px 60px}}h1{{font:700 24px serif;color:var(--red)}}h2{{font:700 21px serif;color:var(--red);border-bottom:2px solid var(--gold);padding-bottom:4px;margin-top:34px}}
nav{{position:sticky;top:0;background:var(--bg);padding:8px 0;z-index:2;display:flex;gap:8px;flex-wrap:wrap}}nav a{{background:var(--red);color:#fff3d6;padding:6px 14px;border-radius:8px;text-decoration:none;font-weight:700}}
.v{{background:var(--card);border:1.5px solid var(--gold);border-radius:12px;padding:10px 12px;margin:14px 0}}.v h3{{margin:0 0 6px;font:700 19px serif}}.v h3 b{{background:var(--red);color:#fff;border-radius:6px;padding:0 9px;margin-right:8px}}
.pr{{display:grid;grid-template-columns:755fr 1180fr;gap:10px;align-items:start}}.pr img,.pr video{{width:100%;border-radius:8px;border:1px solid #d8c49a;display:block;background:#2a1a12}}
figure{{margin:8px 0}}.na{{border:1px dashed #d8c49a;border-radius:8px;padding:30px 10px;text-align:center;color:#8a7458}}figcaption{{font-size:14px;color:#6b5236}}.dv{{display:block;font-size:12px;color:#8a7458}}.rec{{background:#fff3c4;border-left:5px solid var(--gold);padding:8px 12px;border-radius:6px}}
@media(max-width:700px){{.pr{{grid-template-columns:1fr}}}}</style></head><body><main>
<h1>Mẫu: khung sự kiện A (bản sửa 3.1) · phòng trang điểm</h1>
<p>Mẫu dựng trên game thật (nhân vật thật, tranh nơi ở thật, khung và thẻ lựa chọn thật của game), chưa đưa vào game. Mỗi mẫu có <b>video</b> (mở → kéo danh sách lựa chọn → chạm một lựa chọn → đóng) và ảnh. Sếp chỉ cần nói ví dụ “A1” hoặc “A2”.</p>
<nav><a href="#q">Q</a><a href="#ev">Khung sự kiện</a><a href="#m3">Phòng trang điểm</a></nav>
<h2 id="q">Q. Hôm nay khung sự kiện cỡ lớn nhất có che thanh trên / thanh 8 tab không?</h2>
<div class="v"><p><b>Có che thanh trên (một phần), không che thanh 8 tab.</b> Đo trên game thật, sự kiện chữ dài (khung XL):</p>
<ul><li><b>Fold:</b> khung từ y 115 đến 885; thanh trên kết thúc ở 157 → khung đè lên <b>hàng Tâm trạng và mép dưới hàng chỉ số</b>. Thanh 8 tab bắt đầu 918 → không bị che.</li>
<li><b>iPad:</b> khung từ y 125 đến 695; thanh trên kết thúc 157 → đè <b>hàng Tâm trạng</b>. Thanh tab bắt đầu 770 → không bị che.</li>
<li>Ngoài ra lớp tối phủ <b>toàn màn hình</b> (cả hai thanh): hai thanh bị tối đi và không bấm được khi khung đang mở.</li></ul>
{pair('q', 'Hôm nay: khung sự kiện XL (người bên trái).')}</div>
<h2 id="ev">Khung sự kiện A (bản sửa 3.1 theo lời sếp)</h2>
<p>Sửa thêm đúng 3 điều sếp dặn: <b>(1)</b> ở A1, <b>tranh sự kiện làm luôn cái nền</b>: tranh hiện ra trước, rõ và đầy đủ (khoảng 1–1,5 giây), rồi mờ dần, rồi mới hiện người và các ô lời; ban đêm = cùng tranh đó phủ màu đêm; <b>(2)</b> <b>không cắt nhân vật nào</b>: tay áo, vạt áo, tay đều nguyên vẹn, không chạm mép khung; ô lời chỉ đè lên người một cách tự nhiên; <b>(3)</b> chữ độ chắc («Nắm chắc»…) nằm <b>ngay bên cạnh thanh</b>, cùng một hàng, không xuống hàng.</p>
<p>Vẫn giữ: người bên trái toàn thân, ô bên phải; tên người nói + lời kể đứng yên, chỉ danh sách lựa chọn kéo được (chấm tròn trắng trong video là ngón tay). Ô lựa chọn là đúng khung và thẻ của game. Máy kiểm tra cả 12 ảnh + 12 video (khung cố định, chữ vừa không phải cuộn, người toàn thân và không chạm mép cả bốn phía, chữ độ chắc cùng hàng với thanh): <b>đạt hết</b>.</p>
<div class="v"><h3><b>A1</b>Tranh sự kiện làm nền · hai ô: ô lời kể gắn với người báo tin, ô lựa chọn gắn với nhân vật của sếp</h3>
{vid('m13-A1-day', 'Ban ngày: tranh sự kiện hiện rõ → mờ dần → người và ô hiện ra → kéo danh sách lựa chọn xuống rồi lên → chạm một lựa chọn → đóng.')}{vid('m13-A1-night', 'Ban đêm: cùng tranh, phủ màu đêm.')}
{pair('m13-A1-day-intro', 'Bước 1: tranh sự kiện hiện rõ, đầy đủ.')}{pair('m13-A1-day', 'Bước 2: tranh mờ làm nền, người và ô hiện ra.')}{pair('m13-A1-day-scrolled', 'Đã kéo danh sách lựa chọn xuống hết: tên, lời kể vẫn y chỗ cũ.')}{pair('m13-A1-night', 'Ảnh ban đêm.')}
{vid('m13-A1-solo-day', 'Không có người báo tin: tranh hiện rõ → mờ → nhân vật của sếp bên trái, một ô bên phải (lời kể + lựa chọn).')}{pair('m13-A1-solo-day-intro')}{pair('m13-A1-solo-day')}</div>
<div class="v"><h3><b>A2</b>Nền là nơi ở · một ô: tên người nói → tranh sự kiện nhỏ → lời kể → lựa chọn</h3>
<p>Để sếp so sánh. Tranh sự kiện nhỏ trong ô làm chật chỗ cho lời kể và lựa chọn, nhất là trên Fold.</p>
{vid('m13-A2-day', 'Ban ngày.')}{vid('m13-A2-night', 'Ban đêm.')}
{pair('m13-A2-day', 'Ảnh ban ngày.')}{pair('m13-A2-day-scrolled', 'Đã kéo danh sách lựa chọn xuống hết.')}{pair('m13-A2-night', 'Ảnh ban đêm.')}
{vid('m13-A2-solo-night', 'Không có người báo tin (ban đêm).')}{pair('m13-A2-solo-night')}</div>
<p class="rec">Em đề xuất: <b>A1</b>. Tranh sự kiện được hiện to, rõ, đầy đủ trên cả sân khấu trước khi vào chuyện, rồi làm nền; các ô có nhiều chỗ hơn cho lời kể và lựa chọn. Nhìn là biết ai nói gì. A2 (khung như hiện nay, tranh nhỏ trong ô) vẫn giữ để sếp chọn./p>
<h2 id="m3">Phòng trang điểm</h2>
<div class="v"><h3>Video cả lượt</h3>{vid('m3-flow', 'Bấm Trang điểm → phóng vào phòng → viền vàng gương và bàn → gương «Thay xiêm y»: chạm món đồ, người bên trái thay ngay → Quay lại → bàn «Điểm trang» (trò trang điểm hiện có) → Quay lại → «Đã chỉnh tề» → dáng cuối giữa phòng → trở lại sân khấu.')}</div>
<div class="v"><h3>Hôm nay</h3>{pair('m3-t1', 'Vào: chip «Chưa điểm trang» trên thanh trên hoặc thẻ Điểm trang.')}{pair('m3-t2', 'Hôm nay: chọn y phục trong khung trò chơi.')}{pair('m3-t3', 'Hôm nay: trò trang điểm trước gương đồng (giữ nguyên).')}</div>
<div class="v"><h3>Mới · 1. Chuyển cảnh</h3>{pair('m3-f1', 'Sân khấu phóng to dần và tranh phòng trang điểm hiện lên (khoảng 0,7 giây, chạm để bỏ qua; chế độ «Gọn» chỉ mờ chuyển).')}</div>
<div class="v"><h3>Mới · 2. Trong phòng</h3>{pair('m3-f2', 'Gương «Thay xiêm y», bàn «Điểm trang», viền vàng sáng ôm sát đồ vật, lúc nào cũng sáng. Nút «Đã chỉnh tề» luôn có; «Quay lại» góc trên.')}
<p>Chữ đề xuất (cổ ngữ): gương <b>«Thay xiêm y»</b> (theo sếp) · khác: «Đổi xiêm áo», «Y phục». Bàn <b>«Điểm trang»</b> (theo sếp) · khác: «Trang đài», «Bàn phấn sáp». Nút xong: <b>A «Đã chỉnh tề»</b> · B «Hoàn tất» · C «Lui ra».</p></div>
<div class="v"><h3>Mới · 3. Thay xiêm y</h3>{pair('m3-f3', 'Người bên trái (đang mặc trung y), ô đồ bên phải (đúng ô đồ của game).')}{pair('m3-f4', 'Chạm một món → người bên trái thay đồ ngay.')}</div>
<div class="v"><h3>Mới · 4. Điểm trang</h3>{pair('m3-f5', 'Trò trang điểm hiện có, trên nền phòng mờ, nhân vật đứng bên trái. (Dáng ngồi trước gương cần vẽ thêm tranh mới.)')}</div>
<div class="v"><h3>Mới · 5. Bấm «Đã chỉnh tề» → dáng cuối trong phòng</h3>{pair('m3-f6', 'Chỉ trang điểm: mặt đã trang điểm, mặc trung y.')}{pair('m3-f7', 'Chỉ thay đồ: mặc đồ mới, mặt mộc.')}{pair('m3-f8', 'Cả hai: dáng đầy đủ.')}</div>
</main></body></html>'''
open(R + '/mock-stage.html', 'w').write(H)
print(sorted(os.listdir(O)))

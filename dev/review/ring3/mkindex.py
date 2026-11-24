#!/usr/bin/env python3
"""python3 mkindex.py → img/_review/ring4/index.html (owner review page, Vietnamese). Reads ring4-shots/<dev>/perf.json."""
import json,os
W='/home/user/wt/ring4/img/_review/ring4';S='/home/user/wt/ring4-shots'
def perf(d):
  try:return json.load(open(f'{S}/{d}/perf.json'))
  except Exception:return {}
P={d:perf(d) for d in ['fold','ipad']}
STEPS=[('idle-live','Đứng yên (đối chứng)'),('map','Mở bản đồ khu'),('enter','Vào khu'),('group','Chọn nhóm'),('step','Người bước ra'),('picker','Mở nút'),('lift','Nhấc một nút'),('talk','Nói chuyện'),('back','Lui ra')]
def cell(d,k,r):
  x=P[d].get(k,{}).get(str(r)) or P[d].get(k,{}).get(r)
  if not x:return '<td>—</td>'
  return f"<td>{x['p95']:.0f} / {x['p50']:.0f}</td>"
rows=''.join(f"<tr><td>{n}</td>{''.join(cell(d,k,r) for d in ['fold','ipad'] for r in [1,4,6])}</tr>" for k,n in STEPS)
def pair(n,cap):
  return f'<figure><div class="pair"><img loading="lazy" src="s3/fold-{n}.jpg" alt=""><img loading="lazy" class="ip" src="s3/ipad-{n}.jpg" alt=""></div><figcaption>{cap}</figcaption></figure>'
PK=[('hang','Thẻ gỗ treo','các thẻ rơi xuống cạnh người, đung đưa rồi đứng yên; chạm một thẻ = thẻ nhấc lên và hiện dòng chi tiết, chạm lần nữa = chọn'),
    ('fan','Quạt nút','các nút đầy đủ (tên + lời đoán + Tốn) xòe ra theo đường cong từ hông người đó, đọc được hết một lượt'),
    ('rib','Nan quạt giấy','các nút là nan quạt ghim ở tay người đó: quạt khép rồi mở ra; chạm một nan = nan đó xoay thẳng và trượt ra, chạm lần nữa = chọn')]
pk=''
for k,n,d in PK:
  pk+=f'<h3>{n}</h3><p>{d}.</p>'+pair(f's-{k}','Người được chọn bước ra phía sếp, người khác mờ đi')+pair(f'p-{k}',f'{n} mở ra cạnh chân/tay người đó')+pair(f'l-{k}','Chạm một nút: nút nhấc lên, hiện chi tiết')+pair(f't-{k}','Nói chuyện: người đó bên trái, sếp bên phải')
CHK=[('Không có đường chấm bầu dục (08:55Z)','Đạt — không vẽ vòng, không đường chấm'),
('Nền giữ độ sáng thường, chỉ người không được chọn mờ đi (09:05Z, 15:30Z)','Đạt — tranh nền không tối; nhóm/người không chọn mờ, người được chọn sáng'),
('Một màn, không vuốt trái phải trong một khu (09:10Z)','Đạt — mỗi khu là một màn; đổi khu bằng bản đồ khu'),
('Nút, khung, bảng tên đều là đồ kit; không avatar tròn; người lạ = bóng xám «Người lạ» (09:15Z)','Đạt — kitPalaceMap, .kfoc-b, .pctabs, .kchip, bảng tên kscn; người lạ = bóng xám. Vân gỗ của «thẻ gỗ treo» chưa có trong kit → đã gửi yêu cầu kit'),
('Mẫu phải hoàn chỉnh, cùng một kiếp trên hai máy (14:50Z)','Đạt — cùng kiếp Phùng Uyển Ninh, cùng buổi trưa, cùng 15 người trong vườn (Dư đồ ghi «Ta + 15 bóng» = tổng các khu), cùng người được chọn (Quý nhân Tư Mã Ý Hoan) trên hai máy'),
('Người không được chọn mờ đi hoặc tối — KHÔNG trong suốt (15:30Z)','Đạt — người không chọn tối và nhạt màu nhưng vẫn đặc, không nhìn xuyên qua; bóng xám người hầu / người lạ cũng đặc. Máy kiểm từng ảnh và quét video mỗi 0,1 giây: 0 lỗi'),
('Bảng tên không bao giờ chồng lên nhau; tên không bị cắt','Đạt — máy kiểm từng ảnh và từng 0,1 giây video: 0 chỗ chồng, 0 chỗ cắt'),
('Không có «???» trên màn của sếp','Đạt — kiếp này đã gặp các phi tần nên biết tên; ai chưa biết tên thì bảng ghi «Người lạ» (bóng xám)'),
('Fold: số người không đè lên tên nơi, nút công cụ không chen','Đạt — cột nút về đúng chỗ kit (mép trái), số người = người của khu đang đứng, tên «Ngự hoa viên · tên khu» ở góc phải'),
('Nút chọn việc mọc ra cạnh người, thấp gần chân, không che mặt ai (15:30Z)','Đạt — cả 3 kiểu nằm cạnh người được chọn, từ ngang hông xuống; máy kiểm không nút nào che mặt người nào (kể cả lúc đang mọc ra)'),
('iPad là MỘT cảnh ngang rộng, không phải nửa màn (15:30Z)','Đạt — mọi ảnh iPad 1180x820 một cảnh'),
('Không đặt trần người; mỗi màn tối đa 3–4 nhóm; người đến có mục đích (15:30Z)','Đạt — chia khu theo việc/nết/lộ trình Hoàng thượng; Fold 2 nhóm/màn, iPad tới 4; ai thừa sang khu bên cạnh rồi «Lối đi», không đuổi ai'),
('Người được chọn bước ra; nút hiện có hoạt cảnh gần chân; không khung, không bảng che mặt (15:30Z)','Đạt — không khung nào; nút mọc ra cạnh người, không che mặt'),
('Chọn việc với người KHÔNG dùng lá bài (15:30Z)','Đạt — 3 kiểu sếp nêu, đều không phải lá bài'),
('Bấm Ngự hoa viên → tầng thứ hai của Dư đồ, mỗi khu ghi số bóng người, chọn một khu (15:40Z)','Đạt — bản đồ khu (tranh tạm có dấu «tạm») + hàng nút từng khu'),
('Kế hoạch 60–70 người đi khu nào trước khi vẽ (15:40Z)','Đạt — bản kế hoạch dev/AREA_PLAN.md (số đo thật, số BAL, mô tả tranh cho C)'),
('Làm cả 3 kiểu: thẻ gỗ treo, quạt nút, nan quạt giấy (15:40Z)','Đạt — đủ 3, hai máy, ảnh + video'),
('Hoạt cảnh bắt buộc, phải mượt (15:40Z)','Đo trong máy ảo (không có card đồ họa) + trang đo cho máy thật của sếp — xem bảng dưới'),
('Không nhắc trước khi bấm (08:08Z)','Đạt — không có hỏi lại'),
('Tranh khu: hiện là cắt từ MỘT bức Ngự hoa viên (chỉ cho mẫu)','Chờ C vẽ bản đồ vườn + mỗi khu một cảnh theo kế hoạch')]
chk=''.join(f'<tr><td>{a}</td><td>{b}</td></tr>' for a,b in CHK)
html=f'''<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Khu vườn — mẫu 4</title>
<style>:root{{--bg:#f7efe7;--ink:#3a2418;--line:#e0cfc0;--acc:#8a2c2c}}@media (prefers-color-scheme:dark){{:root:not([data-theme=light]){{--bg:#1d1612;--ink:#f1e4d6;--line:#4a3a30;--acc:#e59a8a}}}}
body{{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 system-ui,sans-serif}}main{{max-width:1300px;margin:auto;padding:16px}}h1{{font-size:22px}}h2{{margin-top:32px;border-bottom:2px solid var(--line)}}
.pair{{display:flex;gap:8px;align-items:flex-start}}.pair img{{width:38%;height:auto;border:1px solid var(--line)}}.pair img.ip{{width:61%}}figure{{margin:12px 0}}figcaption{{font-size:14px;opacity:.85}}
table{{border-collapse:collapse;width:100%;font-size:14px}}td,th{{border-bottom:1px solid var(--line);padding:4px 6px;text-align:left;vertical-align:top}}video{{width:100%;max-height:80vh;background:#000}}
.vids{{display:grid;grid-template-columns:1fr 1.5fr;gap:10px}}@media (max-width:700px){{.vids{{grid-template-columns:1fr}}.pair{{flex-direction:column}}.pair img,.pair img.ip{{width:100%}}}}.rec{{border-left:4px solid var(--acc);padding:6px 12px}}</style></head><body><main>
<h1>Ngự hoa viên chia khu + 3 kiểu chọn việc — mẫu 4</h1>
<p>Cùng một kiếp (Phùng Uyển Ninh, Thường tại, buổi trưa), cùng 15 người thật trong vườn, trên Fold 755x1000 (trái) và iPad 1180x820 (phải). Tranh các khu hiện là cắt từ một bức Ngự hoa viên có sẵn (chỉ cho mẫu); bản đồ vườn có dấu «tạm».</p>
<div class="rec"><b>Khuyến nghị của em:</b> dùng <b>Thẻ gỗ treo</b> cho mọi màn nói chuyện giữa người với người. Lý do: gọn nhất trên Fold (2 cột thẻ ngắn cạnh người, không che mặt), giống luật lá bài sếp đã chốt (chạm = nhấc lên đọc, chạm lần nữa = chọn), hoạt cảnh rơi–đung đưa rõ «cảm giác game». Quạt nút dễ đọc nhất (thấy hết lời đoán và Tốn một lượt) nhưng chiếm nhiều chỗ và ít lạ mắt. Nan quạt giấy đẹp và lạ nhất khi mở, nhưng chữ bị nghiêng nên đọc chậm hơn, nhất là trên Fold. Vân gỗ cho thẻ cần kit làm (em đã gửi yêu cầu).</div>
<h2>Video</h2><div class="vids"><div><b>Fold</b><br><video controls preload="metadata" src="vid/fold-1x.mp4"></video><br><a href="vid/fold-2x.mp4">chậm 2×</a></div><div><b>iPad</b><br><video controls preload="metadata" src="vid/ipad-1x.mp4"></video><br><a href="vid/ipad-2x.mp4">chậm 2×</a></div></div>
<h2>1. Dư đồ → bản đồ khu của Ngự hoa viên</h2>{pair('d0','Dư đồ: Ngự hoa viên ghi «Ta + 15 bóng»')}{pair('m1','Bấm Ngự hoa viên: tầng thứ hai — 5 khu, mỗi khu ghi số bóng người; chọn một khu')}
<h2>2. Từng khu (tối đa 3–4 nhóm một màn)</h2>{pair('a0','Ngự đạo (người hầu đứng sau lưng chủ tử, bóng xám)')}{pair('a1','Vườn hoa')}{pair('a2','Thủy tạ')}{pair('a3','Đình cờ')}{pair('a4','Non bộ (iPad: khu này vắng vì các nhóm đã đứng đủ ở khu khác)')}
<figure><img loading="lazy" style="width:38%" src="s3/fold-a5.jpg" alt=""><figcaption>Fold: khu «Lối đi» chỉ hiện khi các khu khác đã đủ nhóm (iPad rộng hơn nên không cần)</figcaption></figure>
<h2>3. Chọn nhóm → chọn người → 3 kiểu nút</h2>{pair('g-hang','Chạm một nhóm: nhóm đó sáng, các nhóm khác mờ, nền vẫn sáng')}{pk}
<h2>Kiểm theo từng lời sếp dặn</h2><table><tr><th>Lời dặn</th><th>Mẫu này</th></tr>{chk}</table>
<h2>Độ mượt</h2><p>Số: khung chậm (95 phần trăm khung nhanh hơn) / khung thường, tính bằng mili-giây; 17 là mượt (60 hình/giây), trên 34 là khựng. Máy ảo của em không có card đồ họa nên chỉ so được với dòng «đứng yên»; số thật phải đo trên máy sếp.</p>
<table><tr><th>Bước</th><th>Fold ×1</th><th>Fold ×4 chậm</th><th>Fold ×6 chậm</th><th>iPad ×1</th><th>iPad ×4</th><th>iPad ×6</th></tr>{rows}</table>
<p><b>Em đọc bảng:</b> khi máy ảo rảnh (Fold ×1) các bước hoạt cảnh đều 17 = mượt như lúc đứng yên; bước nặng nhất là «Vào khu» vì trong mẫu nó vẽ lại cả màn game khi đổi trang — bản làm thật sẽ mở khu mà không vẽ lại cả game, nên bước đó sẽ nhẹ như các bước khác. Số iPad đo lúc máy ảo đang bận tải ảnh lên (dòng «đứng yên» cũng đã 67), nên chỉ so tương đối được. Không có bước nào bị bỏ hoạt cảnh.</p>
<p><b>Đo trên máy thật:</b> mở <a href="kperf.html?kperf=1">trang đo độ mượt</a> trên Fold và trên iPad, đợi chừng 20 giây, chụp bảng gửi em.</p>
<p>Kế hoạch khu (ai đi khu nào, số người đo thật, số trong BAL, mô tả tranh cho C): dev/AREA_PLAN.md trên nhánh review/ring-design-4.</p>
</main></body></html>'''
open(f'{W}/index.html','w').write(html);print('index',len(html))

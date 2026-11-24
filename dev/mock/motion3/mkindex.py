#!/usr/bin/env python3
"""mkindex.py <dir> [probe-link]: writes <dir>/index.html for img/_review/motion3/ — per-ruling checklist, Fold + iPad side by side (1x + 2x slow video + stills), perf table, kperf probe link."""
import sys,os,html,json
d=sys.argv[1];F=sorted(os.listdir(d))
CHECK=[
 ('MAIN 127 FAIL 1','Không khung lời / khung chi tiết nào che đầu người nào: nền mẫu 1 = tranh cung điện KHÔNG có người vẽ sẵn (phi-tan-cung); kiểm tra khuôn mặt đếm cả đầu vẽ trong nền (L.__paint) + mọi người trên sân khấu: 0 điểm chạm.'),
 ('MAIN 127 FAIL 2','Người không bao giờ trong suốt: vào cảnh CHỈ bằng transform ở opacity 1, dưới MỘT màn che kit đặc; không có fade opacity trên người.'),
 ('MAIN 127 FAIL 3','Không chồng hình hai màn: màn che kit đặc trượt vào → đổi cảnh → trượt ra (kitScreenVeil, KIT_REQUESTS K-SCREEN-VEIL); vào và ra cảnh đều dùng.'),
 ('15:15Z (a)','Không có khung sự kiện trước — mở thẳng vào hoạt cảnh (mẫu 1: nền vào, người nói bước vào từ trái, nàng trượt vào từ phải, rồi chia bài; mẫu 2: sân khấu mở thẳng).'),
 ('15:15Z (b)','Lá bài chỉ hiện hình + tên ngắn (+ thang tỉ lệ bằng chữ); chạm = lá nhô lên + thông tin hiện; chạm lần nữa = chọn; 5–10 lá, không phải cuộn (ảnh n=5 / 7 / 10, Fold + iPad).'),
 ('15:15Z (c) + 04:35Z','Giữ bố cục hội thoại của sếp: người báo bên TRÁI toàn thân, khung lời bên PHẢI, vùng chọn đè lên người bên trái, nàng ở bên PHẢI nhỏ hơn. Khung lời kit giữ; không khung nào che mặt (kiểm tra 0 điểm chạm mặt).'),
 ('15:15Z (d) + 15:30Z (d)','Tặng đồ: chạm người → người đó bước ra + sáng lên; thẻ gỗ treo (kitPick, KIT §98) rơi xuống NGAY BÊN CẠNH, thấp, gần chân người đó, trên khoảng sàn trống (người khác trượt dạt ra); KHÔNG khung/bảng nào; kiểm tra khuôn mặt: 0 điểm trùng trên MỌI người (Fold 3 + iPad 3 lần chọn), không chữ «???».'),
 ('15:15Z (e)','Mẫu 4: không có thẻ lật; khung kết quả thường, từng thay đổi bay MỘT-MỘT về đúng ô; ô giữ số cũ tới khi chạm.'),
 ('15:15Z (f) + 15:40Z (4)','Mượt: hoạt cảnh BẮT BUỘC, đã tối ưu (số HUD giữ trong dữ liệu, bỏ MutationObserver; giải mã ảnh bài trước khi chia; vòng ≤ 12 lớp; chỉ transform/opacity). Trang đo thật trên Fold/iPad: xem mục «Đo độ mượt».'),
 ('15:30Z (iPad)','iPad = MỘT màn ngang rộng 1180x820 (không nửa trái, không dạng điện thoại dọc): mẫu 2 trên màn ngang rộng.'),
 ('15:30Z (b)(c)','Nền giữ sáng; người không chọn tối đục bằng kitDim (BAL.kdim, không trong suốt) và dạt ra xa; người chọn bước ra phía mình.'),
 ('15:40Z (3)','Bộ chọn khi nói với một người = «thẻ gỗ treo» (RING-DESIGN) — dùng bộ phận kit kitPick/kitDim của KK21 (không còn bản riêng trong mock); vòng đồ dùng chung ONE kitRing.'),
 ('09:15Z','Chỉ dùng bộ phận kit (nút .kfoc-b, khung kit, kitName, kitItem, kitChip…); người lạ = bóng xám.'),
 ('08:55Z / 09:05Z','Không vẽ vòng chấm; nền không tối.'),
 ('Luật 4 (một lõi số)','Số trên bài = bài hành sự THẬT của game (số lấy từ BAL); số mẫu 4 lấy từ BAL.kitpage.demo; «Thiện cảm +n» lấy từ giftVal.'),
]
T={'m1':'Mẫu 1 · Bàn bài — sự kiện = hội thoại + bài trên tay (chạm = nhô lên + chi tiết, chạm lần nữa = chọn → kết quả bay về ô)',
   'm2':'Mẫu 2 · Vòng bảo vật — một màn rộng; chạm người → bước ra + thẻ gỗ treo → «Biếu» → vòng đồ → «Tặng»',
   'm4':'Mẫu 4 · Bay về túi — khung kết quả như cũ, từng thay đổi bay MỘT-MỘT về đúng ô'}
h=['<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>Motion mocks 4</title>',
 '<style>body{font:15px/1.4 sans-serif;background:#fbf4ea;color:#3a2618;margin:16px;max-width:1500px}h2{margin:28px 0 8px}.r{display:flex;gap:12px;flex-wrap:wrap;align-items:flex-start}video,img{max-width:100%;border:1px solid #d8c3a0;border-radius:8px}.c{flex:1 1 360px}small{color:#7a5b3a}table{border-collapse:collapse;font-size:13px}td,th{border:1px solid #d8c3a0;padding:3px 7px}li{margin:3px 0}</style>',
 '<h1>MOTION-DESIGN-5 — mẫu 1 / 2 / 4 trên game thật (Fold 755x1000 + iPad 1180x820)</h1><p><small>Mock chạy trong game thật (chưa nối vào game). Video 1x + bản chậm 2×. Nền giữ độ sáng bình thường; không khung nào che mặt.</small></p>',
 '<h2>Đối chiếu từng lời sếp</h2><ul>'+''.join(f'<li><b>[x] {html.escape(a)}</b> — {html.escape(b)}</li>' for a,b in CHECK)+'</ul>']
if len(sys.argv)>2: h.append(f'<h2>Đo độ mượt trên máy thật</h2><p>Mở trên Fold / iPad: <a href="{sys.argv[2]}">{sys.argv[2]}</a> — bấm «Bắt đầu đo», để máy yên ≈ 2 phút, «Chép kết quả». Mốc so sánh = đoạn idle/live (game hôm nay).</p>')
if os.path.exists(os.path.join(d,'perf.html')): h.append(open(os.path.join(d,'perf.html')).read())
for m in ['m1','m2','m4']:
  h.append(f'<h2>{html.escape(T[m])}</h2>')
  for sp in ['1x','2x-slow']:
    h.append('<div class=r>'+''.join(f'<div class=c><b>{dv} {sp}</b><br><video src="{m}-{dv}-{sp}.mp4" controls playsinline muted preload=metadata></video></div>' for dv in ['fold','ipadAir'] if f'{m}-{dv}-{sp}.mp4' in F)+'</div>')
  st=[f for f in F if f.startswith('st-'+m)]
  if st:h.append('<div class=r>'+''.join(f'<div class=c><small>{html.escape(f)}</small><br><img src="{f}" loading=lazy></div>' for f in st)+'</div>')
open(os.path.join(d,'index.html'),'w').write('\n'.join(h))
print('ok',len(F))

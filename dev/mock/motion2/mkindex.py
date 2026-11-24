#!/usr/bin/env python3
"""mkindex.py <dir>: writes <dir>/index.html for img/_review/motion2/ (videos 1x + 2x slow, Fold + iPad side by side, chosen stills)."""
import sys,os,html
d=sys.argv[1];F=sorted(os.listdir(d))
T={'m1':'Mẫu 1 · Bàn bài — sự kiện = hội thoại + bài trên tay (chạm = nhô lên + bảng chi tiết, chạm lần nữa = chọn → kết quả bay về ô)',
   'm2':'Mẫu 2 · Vòng bảo vật — chạm người trên sân khấu → nàng sáng lên + nút kit → «Tặng đồ» → vòng đồ (vuốt có quán tính, nút ‹ ›) → «Tặng»',
   'm4':'Mẫu 4 · Bay về túi — khung kết quả như cũ, từng thay đổi bay MỘT-MỘT về đúng ô (ô giữ số cũ tới khi chạm)'}
h=['<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>Motion mocks 2</title>',
 '<style>body{font:15px/1.4 sans-serif;background:#fbf4ea;color:#3a2618;margin:16px}h2{margin:28px 0 8px}.r{display:flex;gap:12px;flex-wrap:wrap;align-items:flex-start}video,img{max-width:100%;border:1px solid #d8c3a0;border-radius:8px}.c{flex:1 1 360px}small{color:#7a5b3a}</style>',
 '<h1>MOTION-DESIGN-2 — mẫu 1 / 2 / 4 trên game thật (Fold 755x1000 + iPad 1180x820)</h1><p><small>Mock chạy trong game thật (không nối vào game). Video 1x + bản chậm 2×. Nền giữ độ sáng bình thường; không khung nào che mặt.</small></p>']
for m in ['m1','m2','m4']:
  h.append(f'<h2>{html.escape(T[m])}</h2>')
  for sp in ['1x','2x-slow']:
    h.append('<div class=r>'+''.join(f'<div class=c><b>{dv} {sp}</b><br><video src="{m}-{dv}-{sp}.mp4" controls playsinline muted preload=metadata></video></div>' for dv in ['fold','ipadAir'] if f'{m}-{dv}-{sp}.mp4' in F)+'</div>')
  st=[f for f in F if f.startswith('st-'+m+'-')]
  if st:h.append('<div class=r>'+''.join(f'<div class=c><small>{html.escape(f)}</small><br><img src="{f}" loading=lazy></div>' for f in st)+'</div>')
open(os.path.join(d,'index.html'),'w').write('\n'.join(h))
print('ok',len(F))

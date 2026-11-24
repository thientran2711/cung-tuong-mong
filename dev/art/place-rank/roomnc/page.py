import json,sys
# state.json: list of {id,key,label,gen,look,structure,src}  (src: 'pr13' or 'places-l2370')
st=json.load(open(sys.argv[1])); v=sys.argv[2]
C='https://ctm-img.victoria-tntt.workers.dev/img/_review/'
rows=''
for r in st:
    k=r['key']; o=f"{C}place-rank/{r.get('src','pr13')}/{k}-ha-sang.webp"; n=f"{C}rooms-nc/{k}.webp?v={r.get('v',v)}"
    rows+=(f'<section id="{k}"><h2>{r["id"]} · {r["label"]}</h2><p class=n><b>Rèm:</b> {r["look"]}<br><b>Kết cấu:</b> {r["structure"]}</p><div class=g>'
           f'<figure><figcaption>CŨ</figcaption><a href="{o}"><img src="{o}" loading=lazy alt="cũ {k}"></a></figure>'
           f'<figure><figcaption>MỚI (prompt cũ + “cửa sổ không rèm”)</figcaption><a href="{n}"><img src="{n}" loading=lazy alt="mới {k}"></a></figure></div></section>\n')
html=f'''<!doctype html><html lang=vi><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>Phòng không rèm</title>
<style>body{{margin:0;padding:12px 16px;background:#f6f1e7;color:#3a2a1a;font:15px/1.45 system-ui,sans-serif}}h1{{font-size:19px}}h2{{font-size:16px;margin:20px 0 4px}}.n{{margin:0 0 6px;font-size:14px}}
.g{{display:grid;grid-template-columns:1fr;gap:8px}}@media(min-width:1000px){{.g{{grid-template-columns:1fr 1fr}}}}figure{{margin:0}}figcaption{{font-weight:600;font-size:13px;margin-bottom:2px}}
img{{width:100%;height:auto;aspect-ratio:2688/1386;object-fit:contain;display:block;border:1px solid #c9b79a;background:#eee4d2}}</style></head><body>
<h1>D1-ROOMNC · cửa sổ không rèm · {len(st)} phòng</h1><p>Cách làm (đúng lời chị): chạy lại đúng prompt cũ của từng phòng, chỉ bỏ chữ “rèm cửa sổ” và ghi rõ “cửa sổ không rèm” (khối L30, thêm 1 câu riêng khi ảnh cũ có rèm ở chỗ lạ). Không sửa bằng code, không đưa ảnh cũ lên cho nó sửa. Ảnh nguyên khung, chạm để xem ảnh gốc.</p>
{rows}</body></html>'''
open('/home/user/cung-tuong-mong/img/_review/rooms-nc.html','w').write(html)
print('page', len(st))

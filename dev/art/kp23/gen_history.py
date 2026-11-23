#!/usr/bin/env python3
"""Generate dev/art/kp23/history.html: one row per UNTICKED act key (194 - new - old = 52), every picture on the CDN for it.
Inputs: keys.json, labels.json, unticked.json, hist_pics.json (CDN _index: act-<key>[-g][-h].webp + ev-/info- of the same name).
Run from repo root: python3 dev/art/kp23/gen_history.py -> upload: python3 dev/site/cdn_sync.py img/_review/kp23-history.html"""
import json
D='dev/art/kp23/'
un=json.load(open(D+'unticked.json'));L=dict(json.load(open(D+'labels.json')));P=json.load(open(D+'hist_pics.json'))
SHOW={'-h':('Cũ (-h)','Cận cảnh tay/áo, không thấy mặt · đang dùng trong game'),'':('Mới','Cảnh rộng, người nhỏ hoặc quay lưng, không thấy mặt · vẽ 23/11'),
 '-g-h':('Cũ biến thể g (-g-h)','Quay lưng/cúi, không thấy mặt'),'-g':('Biến thể g','Quay lưng/cúi, không thấy mặt')}
rows=[]
for k in un:
    pics=[]
    for f,mg in P[k]:
        st=f.split('/')[-1][:-5]
        if f.startswith('img/_review/kp23-hist/'):
            lab,note='Magnific '+mg.split(', ',1)[0].replace('Magnific ','')+' · '+st,mg.split(', ',1)[1]
        elif f.startswith('img/act-'+k):
            suf=st[len('act-'+k):];lab,note=SHOW[suf]
        else: lab,note=st+' (cùng tên)','Tranh sự kiện/thông tin cùng tên'
        if k=='xin-th-do-loi' and st.endswith('xin-th-do-loi'):note='Ngồi nghiêng, thấy một phần má'
        pics.append([st,f,lab,note])
    rows.append([k,L[k],pics])
T=open(D+'history.tpl.html',encoding='utf-8').read()
open(D+'history.html','w',encoding='utf-8').write(T.replace('/*ROWS*/[]',json.dumps(rows,ensure_ascii=False)))
print(len(rows),sum(len(r[2]) for r in rows))

#!/usr/bin/env python3
"""Rooms review page (owner 23/11 ~18:44Z). Reuses the KP23 compare tool look (dev/art/kp23, review/kp23-compare).
Needs the CDN index: curl -s https://ctm-img.victoria-tntt.workers.dev/img/_index.json -o /tmp/idx.json
Run from repo root: python3 dev/art/rooms-page/gen_rooms.py [/tmp/idx.json] -> dev/art/rooms-page/rooms.html
Upload: python3 dev/site/cdn_sync.py img/_review/rooms-page/rooms.html  (copy the file there first)"""
import json, re, sys
idx = {r[0]: r for r in json.load(open(sys.argv[1] if len(sys.argv) > 1 else '/tmp/idx.json'))['files']}
PAL = {'canh-phuc': 'Cảnh Phúc', 'chung-tu': 'Chung Tú', 'dien-huy': 'Diên Huy', 'ham-an': 'Hàm Ân', 'khai-tuong': 'Khải Tường',
       'thua-minh': 'Thừa Minh', 'truong-xuan': 'Trường Xuân', 'vinh-hoa': 'Vĩnh Hòa'}
RK = {'dong-phoi': 'Đông phối', 'tay-phoi': 'Tây phối', 'quyphi': 'Quý phi', 'phi': 'Phi', 'tan': 'Tần'}
def latest(pre):
    g = {}
    for k in idx:
        if not (k.startswith(pre) and '/' not in k[len(pre):] and k.endswith('-ha-sang.webp')): continue
        m = re.match(r'(.*?)(?:-r(\d+))?-ha-sang\.webp$', k[len(pre):]); b, r = m.group(1), int(m.group(2) or 1)
        if b not in g or r > g[b][0]: g[b] = (r, k)
    return g
def live(base, k):  # is the CDN live <base>-ha-sang.webp identical to this picture
    l = idx.get('img/%s-ha-sang.webp' % base); return bool(l and l[1] == idx[k][1])
def room_name(b):
    ngu = b.endswith('-ngu'); s = b[:-4] if ngu else b
    m = re.match(r'(.+?)-cung-(.+)$', s); p, r = m.group(1), m.group(2)
    return '%s cung · %s · %s' % (PAL[p], RK[r], 'phòng ngủ' if ngu else 'tiếp khách')
S1, S2, S3 = [], [], []
for i, (b, (r, k)) in enumerate(sorted(latest('img/_review/place-rank/pr13/').items()), 1):
    S1.append(['ph%02d' % i, room_name(b), k, 'r%d' % r, b, live(b, k)])
pj = json.load(open('dev/art/place-rank/prompts_places_L2370.json'))
for i, (b, (r, k)) in enumerate(sorted(latest('img/_review/place-rank/places-l2370/').items()), 1):
    nm = (pj.get(b) or pj.get('%s-r%d' % (b, r)) or {}).get('name') or b
    S2.append(['nc%02d' % i, nm, k, 'r%d' % r, b, live(b, k)])
R1 = ['canh-phuc-cung', 'canh-phuc-cung-tay-phoi', 'chung-tu-cung-dong-phoi', 'chung-tu-cung', 'dien-huy-cung-dong-phoi', 'dien-huy-cung', 'dien-huy-cung-tay-phoi',
      'ham-an-cung-dong-phoi', 'ham-an-cung', 'khai-tuong-cung-tay-phoi', 'thua-minh-cung-dong-phoi', 'thua-minh-cung', 'thua-minh-cung-tay-phoi',
      'truong-xuan-cung-dong-phoi', 'truong-xuan-cung', 'vinh-hoa-cung']
def nm1(b):
    m = re.match(r'(.+?)-cung(?:-(.+))?$', b); return '%s cung · %s · phòng gốc (đã gỡ rèm)' % (PAL[m.group(1)], RK.get(m.group(2), 'chính điện'))
for i, b in enumerate(R1, 1): S3.append(['rm%02d' % i, nm1(b), 'img/%s-ha-sang.webp' % b, 'live', b, True])
R2 = [('toil-room-c5-phi', 'Phi (cũng là gương toil-mirror-room)'), ('toil-room-c1-dapung', 'Đáp ứng'), ('toil-room-c2-thuongtai', 'Thường tại'), ('toil-room-c3-quynhan', 'Quý nhân'),
      ('toil-room-c4-tan', 'Tần'), ('toil-room-c6-quyphi', 'Quý phi'), ('toil-room-c7-hoangquyphi', 'Hoàng quý phi'), ('toil-room-c8-hoanghau', 'Hoàng hậu'),
      ('toil-room-maid1-thosu', 'Thợ sứ'), ('toil-room-maid2-cungnu', 'Cung nữ'), ('toil-room-maid3-daicungnu', 'Đại cung nữ'), ('toil-room-maid4-chuongsu', 'Chưởng sự'), ('toil-room-maid5-nuquan', 'Nữ quan')]
for i, (b, n) in enumerate(R2, 17): S3.append(['rm%02d' % i, 'Phòng trang điểm · ' + n + ' (đã gỡ rèm)', 'img/%s.webp' % b, 'live', b, True])
for s in S1 + S2 + S3: assert s[2] in idx, s[2]
secs = [['Phòng các cung (trực diện, vẽ lại)', S1], ['Nơi chốn (trực diện, vẽ lại) — dấu «● đang dùng» chỉ hiện khi tranh trùng đúng bản đang chạy trong game', S2], ['Phòng đã gỡ rèm hôm nay (đang dùng trong game)', S3]]
TPL = open('dev/art/rooms-page/rooms.tpl.html', encoding='utf-8').read()
open('dev/art/rooms-page/rooms.html', 'w', encoding='utf-8').write(TPL.replace('/*SECS*/[]', json.dumps(secs, ensure_ascii=False)))
print(len(S1), len(S2), len(S3), 'live S1', sum(s[5] for s in S1), 'live S2', [s[1] for s in S2 if s[5]])

#!/usr/bin/env python3
# python3 rebuild_events.py <EVENTS.json pulled from the CDN> <_index.json> <OUT.json>
# act-pic-match 18/11: the 17/11 02:41Z stale push reset EVENTS.json to the 15/11 base. Re-adds what later workers had added (PROGRESS_ev-art-fit.md, PROGRESS_review-act-pics2.md):
#  ev-art-fit: categories mat-bao am-muu bac-tien canh-phong hao-huu nguy-gia tham-hoi qua-tang tin-cung; khach-den = tea-visit picture only; e68 giftArrive -> qua-tang,
#  gossipTea/kindVisit/newGirlAdvice/officialWife/borrowDress -> tham-hoi.  act-pics2: 14 festival categories fest-<k> (img/ev-fest-<k>.webp), events fest:<k> -> fest-<k>.
# Idempotent. Every file is checked against the CDN index.
import json, sys
src, idx, out = sys.argv[1:4]
E = json.load(open(src, encoding='utf-8')); ks = {f[0] for f in json.load(open(idx))['files']}
C, V = E['categories'], E['events']
new = {'mat-bao': ('Mật báo', ['img/ev-mat-bao.webp']), 'am-muu': ('Ngầm mưu', ['img/ev-am-muu.webp']), 'bac-tien': ('Bạc tiền', ['img/ev-bac-tien.webp']),
       'canh-phong': ('Canh phòng', ['img/ev-canh-phong.webp']), 'hao-huu': ('Hảo hữu', ['img/ev-hao-huu.webp']), 'nguy-gia': ('Nguy giá', ['img/ev-nguy-gia.webp']),
       'tham-hoi': ('Thăm hỏi', ['img/ev-khach-den.webp']), 'qua-tang': ('Quà tặng', ['img/ev-khach-den-2.webp']), 'tin-cung': ('Tin trong cung', ['img/ev-news-tin-trong-cung.webp'])}
FEST = {'newyear': 'Tết Nguyên đán', 'nguyentieu': 'Tết Nguyên tiêu', 'thanhminh': 'Tiết Thanh minh', 'doanngo': 'Tết Đoan ngọ', 'phoenix': 'Hội Phượng', 'thattich': 'Tết Thất tịch',
        'trungthu': 'Tết Trung thu', 'trungcuu': 'Tết Trùng cửu', 'dongchi': 'Tiết Đông chí', 'giaothua': 'Đêm Giao thừa', 'vulan': 'Lễ Vu lan', 'vantho': 'Lễ Vạn thọ',
        'thanhtho': 'Lễ Thánh thọ', 'lapbat': 'Lễ Lạp bát'}
for k, (t, f) in new.items(): C.setdefault(k, {'title': t, 'files': f})
C['khach-den'] = {'title': C['khach-den']['title'], 'files': ['img/ev-khach-den.webp']}
for k, t in FEST.items():
    C.setdefault('fest-' + k, {'title': t, 'files': ['img/ev-fest-%s.webp' % k]}); V['fest:' + k] = 'fest-' + k
V['e68:giftArrive'] = 'qua-tang'
for n in ('gossipTea', 'kindVisit', 'newGirlAdvice', 'officialWife', 'borrowDress'): V['e68:' + n] = 'tham-hoi'
bad = sorted({f for c in C.values() for f in c.get('files', []) if f not in ks}); assert not bad, bad
json.dump(E, open(out, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':')); print('categories', len(C), 'events', len(V), 'stories', len(E['stories']))

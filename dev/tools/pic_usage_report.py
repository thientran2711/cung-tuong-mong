#!/usr/bin/env python3
"""Report for dev/tools/pic_usage.js: image -> the different dialogs (meanings) that show it.
usage: python3 dev/tools/pic_usage_report.py <pic_usage.json> <out.md> [ACT_PIC_ALL.md of review/act-pics2]
Meaning = the dialog id without its variant suffix (#n). An image used by 2+ meanings is SHARED; the meaning whose own EVENTS.json mapping
names that image's category keeps it (the "owner"), every other user needs its own picture. A dialog whose id has no mapping at all
(fallback) needs its own picture even when it is the only user."""
import sys, json, re, collections

def base(i): return re.sub(r'#\d+$', '', i or '')
def cat_of(pic):
    m = re.match(r'ev-([a-z-]+?)(?:-\d+)?\.webp$', pic or '')
    return m.group(1) if m else ''

def main(src, out, actall=None):
    d = json.load(open(src)); R = [r for r in d['rows'] if r.get('pic')]
    act_keys = set()
    if actall:
        act_keys = set(re.findall(r'`([a-z0-9-]+)`', open(actall, encoding='utf-8').read()))
    by = collections.defaultdict(dict)
    for r in R:
        m = base(r['id']) or ('title:' + r['title'])
        by[r['pic']].setdefault(m, r)
    shared = {p: M for p, M in by.items() if len(M) >= 2}
    need = []  # (meaning, row, why, pic)
    for p, M in sorted(by.items()):
        cat = cat_of(p)
        owners = [m for m, r in M.items() if r.get('own') and r['own'] == cat]
        owner = owners[0] if owners else None
        for m, r in M.items():
            fallback = not r.get('own')
            if r.get('item'): continue  # gift dialog shows the item itself
            if m == owner and not fallback: continue
            if len(M) < 2 and not fallback: continue
            need.append((m, r, 'mặc định / không có tranh riêng' if fallback else f'dùng chung với {len(M)-1} nghĩa khác', p))
    L = []
    L.append('# Tranh hộp thoại dùng chung / tranh mặc định (review/gift-ui, sếp 11/15)\n')
    L.append('Phạm vi: hộp thoại, popup, thiệp lễ hội / lời mời, tin trong cung, hộp quà, sự kiện NPC (E68), việc nhờ (T72), tranh mặc định. '
             'Thẻ việc, Sổ tuần (Tuần lục) và dòng kết quả việc đã có ở review/act-pics2 (`dev/art/ACT_PIC_ALL.md`, 713 nghĩa) — không lặp lại ở đây. '
             'Đối chiếu theo tên tệp: một nghĩa dưới đây không trùng khóa `act-<khóa>` nào của danh sách đó.\n')
    L.append('Công cụ: `node dev/tools/pic_usage.js <url> out.json` (mở từng hộp thoại trong game, ghi tranh), `python3 dev/tools/pic_usage_report.py out.json dev/review/pic-shared.md`.\n')
    n_dlg = len({base(r['id']) or r['title'] for r in R})
    L.append(f'## Số liệu\n- hộp thoại đã mở: {len(R)} (nghĩa khác nhau: {n_dlg}) · tranh khác nhau: {len(by)}\n'
             f'- tranh bị 2+ nghĩa dùng chung: **{len(shared)}** · nghĩa cần tranh riêng: **{len(need)}** '
             f'(trong đó rơi vào tranh mặc định / không có tranh riêng: **{sum(1 for x in need if x[2].startswith("mặc định"))}**)\n')
    L.append('## Bảng tranh → các nghĩa dùng nó (chỉ tranh dùng chung)\n| tranh | số nghĩa | các nghĩa (id · tiêu đề) |\n|---|---|---|')
    for p, M in sorted(shared.items(), key=lambda x: -len(x[1])):
        L.append(f'| `{p}` | {len(M)} | ' + ' · '.join(f'{m} ({r["title"][:40]})' for m, r in list(M.items())[:12]) + (' …' if len(M) > 12 else '') + ' |')
    L.append('\n## Danh sách cần vẽ (mỗi dòng = một tranh mới, 3:4, không mặt người cận cảnh; khóa đề xuất `ev-<khóa>`)\n'
             '| # | khóa đề xuất | id hộp thoại | tiêu đề | tranh đang dùng | lý do | cảnh (một dòng) |\n|---|---|---|---|---|---|---|')
    for i, (m, r, why, p) in enumerate(sorted(need, key=lambda x: (x[3], x[0])), 1):
        key = re.sub(r'[^a-z0-9]+', '-', m.lower().replace('đ', 'd')).strip('-')[:40]
        if key in act_keys: key += '-dlg'
        first = re.sub(r'\s+', ' ', r.get('first', ''))[:120]
        L.append(f'| {i} | `{key}` | {m} | {r["title"][:50]} | `{p}` | {why} | {first} |')
    open(out, 'w', encoding='utf-8').write('\n'.join(L) + '\n')
    print(len(R), 'dialogs', len(by), 'pictures', len(shared), 'shared', len(need), 'to draw')

if __name__ == '__main__':
    main(*sys.argv[1:4])

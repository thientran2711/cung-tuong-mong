# D1-ROOMNC (Foreman C ROOT-D1, owner order 24/11 ~00:29Z, verbatim in dev/handover/briefs/D1-rooms-nc.md):
# "run lại cái prompt cũ, rồi ghi là sửa là cái cửa sổ không rèm" -> every rank room with window curtains is REDRAWN text-to-image
# from its ORIGINAL prompt (same refs, gpt-2-6 2k 2688x1386). No edit, no upload of the old picture, no pixel fix.
# New prompt = original word for word with ONLY: (a) window-curtain wording cut, (b) STY word swap, (c) L30 block + NC sentence appended.
# Bed curtains (帐) and doorway / partition-arch hangings stay (allowed by L30). This file changes no other builder (A55).
import os, sys, json, re
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, D)
ROOT = os.path.abspath(os.path.join(D, '..', '..', '..'))
OUTD = os.path.join(D, 'roomnc'); BASED = os.path.join(OUTD, 'base'); os.makedirs(BASED, exist_ok=True)
WIN = " " + open(os.path.join(D, '..', 'common_blocks', 'window_L30.txt'), encoding='utf-8').read().strip()
NC = " Windows have NO curtains, NO drapes, NO hanging fabric at any window."
STY = ('same depth with furniture, curtains and objects', 'same depth with furniture, carved lattice windows and objects')
# source builder JSON of every base (rank_rooms.json order); the picture in img/_review/place-rank/pr13/<base>-ha-sang.webp was made from it
SRC = {}
for f in ['prompts_pr13.json', 'prompts_roompf1_M2294.json', 'prompts_roompf1_M2299.json', 'prompts_roompf1_M2300.json',
          'prompts_pr19_batch1.json', 'prompts_pr18_room30.json', 'prompts_pr19_room30.json', 'prompts_pr19_room32b.json']:
    for k, v in json.load(open(os.path.join(D, f))).items(): SRC.setdefault(k, []).append((f, v))
# places on the rooms page (img/_review/place-rank/places-l2370/<key>-ha-sang.webp) that still show window fabric when LOOKED (24/11): only nvp
SRC['nvp'] = [('prompts_places_L2370.json', json.load(open(os.path.join(D, 'prompts_places_L2370.json')))['nvp'])]
PLACE_KIND = {'nvp': 'tiep-khach'}
# window-curtain wording -> replacement (applied in order, each must hit where listed in CUTS[key])
RX = [
 ('(the sheer window curtains tied back, ', '('),
 ('(the window curtains, the lantern tassels)', '(the lantern tassels)'),
 (', the sheer window curtains tied back,', ','),          # "...soft blue like #X: the sheer window curtains tied back, the curtain of the doorway,"
 (': the sheer window curtains tied back, ', ': '),
 (', the window curtains and the lantern tassels', ' and the lantern tassels'),
 (', the window curtains,', ','),
 (' the window curtains and', ''),
]
GEN = {  # generic "curtains" in the colour sentence: bedroom -> bed curtains (allowed), reception -> dropped
 'ngu': ('the main colour of the silks, curtains and cushions', 'the main colour of the silks, bed curtains and cushions'),
 'tiep-khach': ('the main colour of the silks, curtains and cushions', 'the main colour of the silks and cushions'),
}
# base -> source json file when several hold the key (ledger: KT Tần = room 32 redo VX7s33bMMU from prompts_pr19_room32b;
# TX Tây phối = room 30 redo DoOgSWcpcl from prompts_pr19_room30); one source otherwise.
PICK = {'khai-tuong-cung-tan': 'prompts_pr19_room32b.json', 'truong-xuan-cung-tay-phoi': 'prompts_pr19_room30.json'}
# room-specific line (ROOT-D1 24/11 ~00:41Z: inside her order "nhắc kỹ trong prompt là cửa sổ không rèm") naming a spot where the OLD
# picture (or a first redo) had fabric at a window in an odd place. Appended after NC. Only such lines; nothing else changes.
EXTRA = {
 'khai-tuong-cung-tay-phoi-ngu': " No fabric hangs anywhere on the right side wall: no curtain on rings, no drape behind or above the tall cabinet; the right wall shows bare wooden panels and bare carved lattice only.",
 'thua-minh-cung-tan-ngu': " No fabric hangs anywhere on the left side wall: no curtain on rings, no drape behind or above the tall shelf; the left wall shows bare wooden panels and bare carved lattice only.",
 'truong-xuan-cung-dong-phoi': " No fabric hangs anywhere on the left side wall: no curtain on rings, no drape behind or above the tall shelf; the left wall shows bare wooden panels and bare carved lattice only.",
 'ham-an-cung-dong-phoi': " No fabric hangs anywhere on the left side wall: no white curtain on rings, no drape behind or above the tall shelf; the left wall shows bare wooden panels and bare carved lattice only.",
 'nvp': " The lattice windows in the LEFT side wall are bare carved lattice with window paper: no white lace, no sheer curtain hangs at them.",
 'chung-tu-cung-tay-phoi': " On the left side wall behind the tall shelf cabinet, any lattice window is bare carved lattice with window paper: no curtain, no fabric hangs there.",
 'canh-phuc-cung-tay-phoi-ngu': " On the right side wall behind the tall shelf cabinet, any lattice window is bare carved lattice with window paper: no curtain, no fabric hangs there.",
 'dien-huy-cung-dong-phoi': " No fabric hangs anywhere on the left side wall: no white curtain on rings, no drape behind or above the tall shelf; the left wall shows bare wooden panels and bare carved lattice only.",
 'ham-an-cung-tay-phoi': " On the left side wall between the tall shelf and the chairs, any lattice window is bare carved lattice with window paper: no green curtain, no fabric hangs there.",
 'ham-an-cung-phi-ngu': " On the right side wall behind the tall shelf, any lattice window is bare carved lattice with window paper: no curtain, no fabric hangs there.",
 'khai-tuong-cung-tan': " At the far left edge of the back wall, beside the vase of lotus, no curtain and no fabric hangs: bare wall or bare carved lattice.",
 'khai-tuong-cung-dong-phoi': " The small high lattice window on the left side wall, behind the tall cabinet, is bare carved lattice with window paper: no curtain, no sheer white fabric hanging there.",
}
def build(base, kind, src_key=None):
    c = [(f, v) for f, v in SRC[base] if PICK.get(base) in (None, f)]; assert len(c) == 1 or base not in PICK, base
    f, v = c[-1]
    p0 = v['prompt']; p = p0; cut = []
    assert p.count(STY[0]) == 1, base; p = p.replace(*STY); cut.append('curtains and objects arranged through the room')
    for a, b in RX:
        if a in p: p = p.replace(a, b); cut.append(a.strip(' ,:;'))
    if '(the window curtains, the lantern tassels)' in p0:   # no bed/door curtain left in that room: the generic word follows
        for a, b in [('ALL the curtains of the room are', 'ALL the hangings of the room are'), (' (curtains) and', ' (hangings) and')]:
            if a in p: p = p.replace(a, b); cut.append(a.strip(' (),'))
    g = GEN[kind]
    if g[0] in p: p = p.replace(*g); cut.append(g[0])
    p = p + WIN + NC + EXTRA.get(base, '')
    assert len(p) < 10000, (base, len(p))
    left = [p[max(0, m.start() - 70):m.end() + 40] for m in re.finditer(r'window curtain|curtains? at (the )?window|sheer .{0,20}curtain', p[:len(p) - len(WIN + NC + EXTRA.get(base, ''))])]
    return dict(v, prompt=p, src=f), p0, cut, left
if __name__ == '__main__':
    keys = sys.argv[1:]
    rows = {r['base']: r for r in json.load(open(os.path.join(D, 'rank_rooms.json')))}
    OUT = json.load(open(os.path.join(OUTD, 'prompts_roomnc.json'))) if os.path.exists(os.path.join(OUTD, 'prompts_roomnc.json')) else {}
    import room_gate
    for b in keys:
        o, p0, cut, left = build(b, rows[b]['kind'] if b in rows else PLACE_KIND[b])
        assert not left, (b, left)
        OUT[b] = o
        open(os.path.join(BASED, b + '.txt'), 'w').write(p0)
        open(os.path.join(OUTD, b + '.txt'), 'w').write(o['prompt'])
        why = '  # owner 24/11 ~00:29Z "ghi là sửa là cái cửa sổ không rèm" + rule L30'
        open(os.path.join(OUTD, b + '.txt.keep'), 'w').write(f"base: dev/art/place-rank/roomnc/base/{b}.txt\n" + ''.join(f"allow: {a}{why}\n" for a in cut))
        print(b, o['src'], len(p0), '->', len(o['prompt']), 'cut:', cut)
    room_gate.guard({k: v['prompt'] for k, v in OUT.items()}, 'roomnc-D1')
    json.dump(OUT, open(os.path.join(OUTD, 'prompts_roomnc.json'), 'w'), ensure_ascii=False, indent=1)
    print('ROOM GATE PASS', len(OUT))

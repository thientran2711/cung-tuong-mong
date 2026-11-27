# ROOMPF1 batch 3 = ALL remaining chính điện bedrooms + reception rooms (owner L2300 via Foreman C ROOT-B9, verbatim: "Làm luôn một loạt các
#   cái phòng còn lại luôn đi, ... không có cần đợi tôi phải duyệt hay không duyệt nữa, mà là cứ làm hết tất cả các cái phòng ngủ và phòng
#   chính sách còn lại rồi gửi cho tôi một lần luôn." + L2296 "bạn tự làm bên mặt đi").
# Recipe = prompts_roompf1_M2294.py (approved L2299) EXACTLY: same helpers (pr20 bed/rec + floor fix + TONE v2 + CL 'rất nhẹ'), same Phi swap.
# NEW rank swap Quý phi (t6), built like the Phi swap: occupant words; RC6 = B24 t6 honey orange #E3A25B (words 'honey orange' = prompts_pr13
#   RANK colour table) + the small royal-yellow touch of B24/B21/G77 (t6 = a few small points: trims, tassel knots); LUX6 = approved
#   RANK['quyphi']['lux'] words; 'soft pink' -> 'soft honey-orange'; TONE 'pink' -> 'honey orange'; image 4 = QP strip (#E3A25B:4 #F3EBDD:1
#   #A8CDB8:1). QP furniture words from the approved RANK['quyphi'] bedx/rec lists (gilt lacquer cabinet, coral tree, cloisonné, guqin).
# Palaces: existing cards only (CT HA DH VH KT TX + TM approved L2299). No new style words. Trường Xuân (Q1: Tần/Phi/QP versions of the HQP
#   palace, owner 'yes, drawn last') uses CARD_TX. Từ Ninh (Thái hậu) is NOT built: no rank recipe for her rooms in this chain (foreman).
# Own layout per palace + rank (L19, no repeat of the same palace's earlier layouts), 3-wall bedrooms / 2-wall receptions alternate.
import os, sys, json, contextlib, io
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, D)
with contextlib.redirect_stdout(io.StringIO()):
    import prompts_roompf1_M2294 as M
R, A, B, T = M.R, M.A, M.B, M.T
OUTD = M.OUTD
QP = "a Quý phi (an imperial consort of the sixth rank, below a Hoàng quý phi) who heads this palace and lives here alone, in ancient China, a real room in daily use"
QPR = "a Quý phi (an imperial consort of the sixth rank, below a Hoàng quý phi) who heads this palace and lives here alone in ancient China"
RC6 = (" RANK COLOUR (Quý phi, owner B24): honey orange like #E3A25B, a soft medium honey orange, is the one rank colour of the room, woven "
       "through the bed curtains, the bedding, the seat cushions, the window curtains and the lantern tassels, with ivory and soft jade-green as "
       "its quiet partners, and a small royal-yellow touch like #EFBD69 only in a few small points (a few trims and tassel knots), far less "
       "than in a Hoàng quý phi's room; no pink, no purple, no red silks.")
RC6R = RC6.replace('the bed curtains, the bedding, the seat cushions', 'the seat cushions'); assert RC6R != RC6
ANCH6 = "no pink, no purple, no red silks."
LUX6 = " " + B.P['RANK']['quyphi']['lux']
TONE6 = T.TONE.replace('the pink of image 4', 'the honey orange of image 4'); assert TONE6 != T.TONE
SW6 = 'EbWFgREuuO'   # QP strip CDN img/_review/place-rank/roompf1/tone-swatch-quyphi-t6.png -> creations_upload_image (0 cr) -> id here

def to_qp(p):
    for a, b in ((A.TAN, QP), (A.TANR, QPR), (A.RC4, RC6), (A.RC4R, RC6R), (A.LUX4, LUX6)):
        p = p.replace(a, b)
    return p.replace('soft pink', 'soft honey-orange')

def finish(p, rank):
    if rank == 4: return M.finish(p)
    if rank == 5: return M.finish(M.to_phi(p), phi=True)
    p = R.fix(to_qp(p)); assert p.count(ANCH6) == 1; p = p.replace(ANCH6, ANCH6 + TONE6)
    assert p.count(M.CL_OLD) == 1; return p.replace(M.CL_OLD, M.CL_RN)

PAL = {  # name, wood, bed flower, screen flower, doorway, chairs, pots, card
 'KT': ('Khải Tường', M.KT_W, 'lotus flowers', 'lotus flowers and cranes', 'the vase-shaped doorway in a hexagonal lattice partition',
        'square-backed nanmu armchairs', 'celadon bowls of lotus flowers on slim stands', B.CARD_KT),
 'CT': ('Chung Tú', M.CT_W, 'plum blossoms', 'plum blossoms and magpies', 'the rectangular doorway with rounded corners in a cracked-ice lattice partition',
        'low-backed rose chairs', 'vases of plum branches on slim stands', B.CARD_CT),
 'HA': ('Hàm An', R.HA_W, 'orchids', 'orchids and butterflies', 'the four-lobed begonia-shaped doorway in a key-fret lattice partition',
        'armchairs with gently curved yoke-shaped top rails', 'blue-and-white pots of orchids on slim stands', B.CARD_HA),
 'TM': ('Thừa Minh', M.TM_W, 'osmanthus sprays', 'osmanthus and mandarin ducks among reeds', 'the fan-shaped doorway in a lattice partition of step-patterned frets',
        'spindle-backed camphor-wood armchairs', 'pots of osmanthus on slim stands', M.CARD_TM),
 'DH': ('Diên Huy', R.DH_W, 'chrysanthemums', 'chrysanthemums and swallows among willows', 'the octagonal doorway in a lattice partition of interlocking coin circles',
        'tall-backed armless side chairs', 'pots of chrysanthemums on slim stands', B.CARD_DH),
 'VH': ('Vĩnh Hòa', R.VH_W, 'camellias', 'camellias and orioles on bamboo', 'the gourd-shaped doorway in a lattice partition of overlapping lozenges',
        "southern official's-hat armchairs", 'pots of camellias on slim stands', B.CARD_VH),
 'TX': ('Trường Xuân', 'dark zitan sandalwood', 'white magnolias', 'white magnolias and kingfisher-blue feather inlay', 'the tall vase-shaped doorway in a carved openwork partition',
        'square-backed zitan armchairs', 'porcelain vases of white magnolias on slim stands', B.CARD_TX),
}
RANKX = {  # dressing table, robe stand, shelf (bed) / shelf, extra object (reception); rank words from prompts.py RANK[...] bedx / rec
 4: ('a dressing table with a bronze mirror and a small jewellery box', 'a clothes rack with a soft pink robe', 'a bookshelf with boxes',
     'a low shelf with porcelain and boxes', 'an embroidery frame on a stand'),
 5: ('a dressing table with a large bronze mirror and a lacquered jewellery cabinet', 'a clothes stand with a soft pink silk robe',
     'a shelf with jade and porcelain treasures', 'curio shelves with jade carvings, porcelain and lacquer boxes', 'a guqin on a stand'),
 6: ('a large carved dressing table with a tall bronze mirror and a gilt lacquer jewellery cabinet open with pearls and jade',
     'a clothes stand with a soft pink silk robe', 'a curio shelf with jade, coral and porcelain treasures and a coral tree ornament',
     'curio shelves full of jade carvings, cloisonné, coral and porcelain treasures', 'a guqin on a stand, cloisonné vases'),
}
OPP = {'LEFT': 'RIGHT', 'RIGHT': 'LEFT'}
GUIDE = {(3, 'RIGHT'): B.M3, (3, 'LEFT'): B.M3X, (2, 'RIGHT'): B.M2, (2, 'LEFT'): B.M2X}

def bedroom(pk, rank, side, pos):
    name, wood, fb, fs, door, chairs, pots, card = PAL[pk]; dress, robe, shelf = RANKX[rank][:3]
    if pos == 'C':
        where = 'against the middle of the back wall'; dp = f"in the {OPP[side]} side wall {door}"
    else:
        where = f'against the back wall in its {pos} half'; dp = f"in the {OPP[pos]} half of the back wall {door}"
    extra = (f"{dp} onto an inner room; along the {side.lower()} window wall, square to it, {dress} and a round stool with a soft pink "
             f"cushion; {robe} beside the bed, {pots}, {shelf}")
    return A.room(R.bed(name, B.WL3, side, wood, fb, where, extra, card))

def reception(pk, rank, side, pos, chairmode):
    name, wood, fb, fs, door, chairs, pots, card = PAL[pk]; shelf, obj = RANKX[rank][3:]
    walls = B.WL2 if side == 'LEFT' else R.WL2R
    near = ', near the window wall' if pos == side else ''
    where = f'against the back wall in its {pos} half{near}'
    if chairmode == 'facing':
        ch = (f"in front of the {OPP[pos]} half, a pair of {chairs} with soft pink cushions facing each other across a small square tea table")
    else:
        ch = (f"along the {side.lower()} window wall, square to it, a pair of {chairs} with soft pink cushions and a small tea table between them")
    extra = (f"in the {OPP[pos]} half of the back wall {door} onto an inner room; {ch}; {shelf}, {pots.replace(' slim', '')}, a bronze incense "
             f"burner on a side table, {obj}")
    return A.room(R.rec(name, walls, side, wood, fs, where, extra, card))

KEYP = {'KT': 'khai-tuong', 'CT': 'chung-tu', 'HA': 'ham-an', 'TM': 'thua-minh', 'DH': 'dien-huy', 'VH': 'vinh-hoa', 'TX': 'truong-xuan'}
KEYR = {4: 'tan', 5: 'phi', 6: 'quyphi'}
PLAN = [  # palace, rank, kind, side (windows), pos (bed/daybed: C / LEFT / RIGHT), chairs
 ('DH', 5, 'bed', 'LEFT', 'C', None), ('DH', 5, 'rec', 'RIGHT', 'RIGHT', 'facing'),
 ('VH', 5, 'bed', 'RIGHT', 'LEFT', None), ('VH', 5, 'rec', 'LEFT', 'LEFT', 'facing'),
 ('KT', 6, 'bed', 'RIGHT', 'LEFT', None), ('KT', 6, 'rec', 'LEFT', 'LEFT', 'facing'),
 ('CT', 6, 'bed', 'LEFT', 'RIGHT', None), ('CT', 6, 'rec', 'RIGHT', 'RIGHT', 'facing'),
 ('HA', 6, 'bed', 'RIGHT', 'RIGHT', None), ('HA', 6, 'rec', 'LEFT', 'LEFT', 'wall'),
 ('TM', 6, 'bed', 'RIGHT', 'LEFT', None), ('TM', 6, 'rec', 'LEFT', 'LEFT', 'facing'),
 ('DH', 6, 'bed', 'RIGHT', 'RIGHT', None), ('DH', 6, 'rec', 'LEFT', 'RIGHT', 'wall'),
 ('VH', 6, 'bed', 'RIGHT', 'C', None), ('VH', 6, 'rec', 'RIGHT', 'LEFT', 'wall'),
 ('TX', 4, 'bed', 'RIGHT', 'C', None), ('TX', 4, 'rec', 'LEFT', 'RIGHT', 'wall'),
 ('TX', 5, 'bed', 'LEFT', 'RIGHT', None), ('TX', 5, 'rec', 'RIGHT', 'LEFT', 'wall'),
 ('TX', 6, 'bed', 'RIGHT', 'LEFT', None), ('TX', 6, 'rec', 'LEFT', 'LEFT', 'facing'),
]
OUT = {}
for n, (pk, rank, kind, side, pos, chm) in enumerate(PLAN, 1):
    key = f"{KEYP[pk]}-cung-{KEYR[rank]}" + ('-ngu' if kind == 'bed' else '')
    raw = bedroom(pk, rank, side, pos) if kind == 'bed' else reception(pk, rank, side, pos, chm)
    p = finish(raw, rank)
    hexr = {4: '#E3A3B8', 5: '#A88BCB', 6: '#E3A25B'}[rank]
    assert p.count(hexr) == 1 and all(h not in p for h in {'#E3A3B8', '#A88BCB', '#E3A25B'} - {hexr}), key
    if rank != 4: assert p.replace('no pink,', '').count('pink') == 0 and 'Tần (' not in p, key
    if rank == 6: assert TONE6 in p and p.count('#EFBD69') == 1 and 'phoenix' not in p.replace('No phoenix anywhere (no phoenix', ''), key
    assert M.CL_RN in p and 'never paler' in p and 'five sixths' in p and A.WHITE in p and 'stone' not in p and '{' not in p, key
    if kind == 'rec': assert 'canopy bed' not in p, key
    nw = 3 if kind == 'bed' else 2
    img4 = {4: M.SW4, 5: M.SW5, 6: SW6}[rank]
    base = 'prompts_pr20_tone_vinh-hoa-cung-tan' + ('-ngu' if kind == 'bed' else '') + '.txt'
    OUT[key] = dict(prompt=p, code=f'M2300-{n:02d}', rank=rank, refs=[*M.G9, GUIDE[(nw, side)], img4], base=base,
                    layout=f"{nw}w windows {side}, {'bed' if kind == 'bed' else 'daybed'} {pos}{' chairs ' + chm if chm else ''}")
import room_gate; room_gate.guard({k: v['prompt'] for k, v in OUT.items()}, 'roompf1-M2300')
json.dump(OUT, open(os.path.join(D, 'prompts_roompf1_M2300.json'), 'w'), ensure_ascii=False, indent=1)
for k, v in OUT.items():
    open(os.path.join(OUTD, f"{v['code']}_{k}_ha_sang.txt"), 'w').write(v['prompt'] + M.CAPTION.format(v['code']))
print(len(OUT), {v['code']: (k, len(v['prompt'])) for k, v in OUT.items()}, 'ROOM GATE PASS')

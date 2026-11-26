# PR20 — PREPARED builders, NO gen until the owner's go via the foreman (A20/A21). Text + gate only.
# SET r3334: rooms 33/34 redraw (owner "3 sàn rộng, 4 rộng"). A18/A17: the ONLY change vs batch 1 is the LESS-FLOOR FIX of room 32b
#   (FR four fifths/one fifth -> five sixths/one sixth + CAMERA CLOSE). Layout, refs, colours, words otherwise identical. 2 gens = 270 cr.
# SET batch2: next 5 TẦN chính điện rooms that have palace cards (Thừa Minh still has none): room-32b recipe (room-30-NEW + LESS-FLOOR FIX),
#   B24 t4 soft pink, one occupant. Every room has its own layout (PR19 note: 31/35 came out alike):
#   ham-an-cung-tan       reception 3w windows LEFT (M3X)  daybed centred, begonia doorway in the RIGHT side wall, armchairs along left windows
#   dien-huy-cung-tan-ngu bedroom   2w windows RIGHT (M2)  bed in the LEFT half, octagonal doorway right half, dressing table at right windows
#   dien-huy-cung-tan     reception 2w windows LEFT (M2X)  daybed in the LEFT half by the windows, octagonal doorway right half, side chairs facing
#   vinh-hoa-cung-tan-ngu bedroom   3w windows LEFT (M3X)  bed in the RIGHT half of the back wall, gourd doorway left half, dressing table at left windows
#   vinh-hoa-cung-tan     reception 2w windows RIGHT (M2)  daybed in the RIGHT half near the windows, gourd doorway left half, armchairs at right windows
#   5 gens = 675 cr.
import os, sys, json, contextlib, io
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, D)
with contextlib.redirect_stdout(io.StringIO()):
    import prompts_pr19_batch1 as A
B = A.B; P = B.P
OLD_FR = ("stand at about four fifths of the picture height, so the open floor in front is a strip of about one fifth of the picture height, never more.")
NEW_FR = ("stand at about five sixths of the picture height, so the open floor in front is a narrow strip of about one sixth of the picture height, "
          "never more. CAMERA CLOSE (owner 'sàn còn rộng quá'): the camera stands only a few steps in front of the furniture, so the room and its "
          "furniture fill the picture down to that line; never a wide empty floor in the middle of the picture.")
def fix(p):
    assert p.count(OLD_FR) == 1; return p.replace(OLD_FR, NEW_FR)

R3334 = {k: dict(prompt=fix(A.OUT[k]['prompt']), refs=list(A.OUT[k]['refs'])) for k in ('chung-tu-cung-tan-ngu', 'chung-tu-cung-tan')}

WL2R = B.WL2.replace('the LEFT side wall', 'the RIGHT side wall'); assert WL2R != B.WL2
TAN, TANR, RC4, RC4R, LUX4, BED1 = A.TAN, A.TANR, A.RC4, A.RC4R, A.LUX4, A.BED1
TAIL = B.NOPE + B.RECT + B.GUIDE_S + B.FR + B.TAGZONE
TAILR = B.NOPE + P['NOSOFA'] + B.RECT + B.GUIDE_S + B.FR + B.TAGZONE
def bed(pal, walls, side, wood, flower, where, extra, card):
    return (f"{pal} cung chính điện bedroom, the private bedchamber of {TAN}, " + walls + f": pillars, lattice windows in the {side} side wall onto "
        f"a sunny garden; {where}, square to it and seen straight on, ONE canopy bed, the large clear main subject: a wide canopy bed of carved {wood} "
        f"with soft pink gauze curtains tied back and soft pink silk bedding embroidered with {flower}; {extra}, hanging paper lanterns with tassels. "
        + card + RC4 + LUX4 + BED1 + TAIL)
def rec(pal, walls, side, wood, flower, where, extra, card):
    return (f"{pal} cung chính điện reception room, the sitting room where {TANR} receives her guests, a real room in daily use, no bed anywhere, "
        + walls + f": pillars, lattice windows in the {side} side wall onto a sunny garden; {where}, square to it and seen straight on, the host "
        f"seat, the large clear main subject: a luohan daybed of carved {wood} with a three-sided panel back, soft pink silk cushions and a small low "
        f"kang table with a tea set in its middle, before a folding screen painted with {flower}; {extra}, hanging paper lanterns with tassels. "
        + card + RC4R + LUX4 + TAILR)
HA_W, DH_W, VH_W = 'light walnut-brown elm wood', 'warm chestnut-brown huanghuali wood', 'warm reddish-brown jichimu wood'
BATCH2 = {
 'ham-an-cung-tan': dict(prompt=A.room(rec('Hàm An', B.WL3, 'LEFT', HA_W, 'orchids and butterflies', 'against the middle of the back wall',
    "in the RIGHT side wall the four-lobed begonia-shaped doorway in a key-fret lattice partition onto an inner room; along the left window wall, "
    "square to it, a pair of armchairs with gently curved yoke-shaped top rails and soft pink cushions and a small tea table between them; "
    "blue-and-white pots of orchids on stands, a small incense burner on a side table, a low shelf with books and scrolls", B.CARD_HA)),
    refs=[*B.G9, B.M3X]),
 'dien-huy-cung-tan-ngu': dict(prompt=A.room(bed('Diên Huy', WL2R, 'RIGHT', DH_W, 'chrysanthemums', 'against the back wall in its LEFT half',
    "in the RIGHT half of the back wall the octagonal doorway in a lattice partition of interlocking coin circles onto an inner room; along the "
    "right window wall, square to it, a dressing table with a bronze mirror and a small white-jade jewellery box and a tall-backed armless side "
    "chair with a soft pink cushion; a clothes rack with a soft pink robe beside the bed, pots of chrysanthemums on slim stands", B.CARD_DH)),
    refs=[*B.G9, B.M2]),
 'dien-huy-cung-tan': dict(prompt=A.room(rec('Diên Huy', B.WL2, 'LEFT', DH_W, 'chrysanthemums and swallows among willows',
    'against the back wall in its LEFT half, near the window wall',
    "in the RIGHT half of the back wall the octagonal doorway in a lattice partition of interlocking coin circles onto an inner room; in front of "
    "the right half, two tall-backed armless side chairs with soft pink cushions facing each other across a small square tea table; a pot of "
    "chrysanthemums on a stand by the windows, a small incense burner on a side table, a curio shelf with white jade pieces by the doorway",
    B.CARD_DH)), refs=[*B.G9, B.M2X]),
 'vinh-hoa-cung-tan-ngu': dict(prompt=A.room(bed('Vĩnh Hòa', B.WL3, 'LEFT', VH_W, 'camellias', 'against the back wall in its RIGHT half',
    "in the LEFT half of the back wall the gourd-shaped doorway in a lattice partition of overlapping lozenges onto an inner room; along the left "
    "window wall, square to it, a dressing table with a bronze mirror and a small boxwood jewellery box and a round stool with a soft pink cushion; "
    "in the right side wall a tall clothes cabinet, a clothes rack with a soft pink robe beside the bed, pots of camellias on slim stands",
    B.CARD_VH)), refs=[*B.G9, B.M3X]),
 'vinh-hoa-cung-tan': dict(prompt=A.room(rec('Vĩnh Hòa', WL2R, 'RIGHT', VH_W, 'camellias and orioles on bamboo',
    'against the back wall in its RIGHT half, near the window wall',
    "in the LEFT half of the back wall the gourd-shaped doorway in a lattice partition of overlapping lozenges onto an inner room; along the right "
    "window wall, square to it, a pair of southern official's-hat armchairs with soft pink cushions and a small tea table between them; a low "
    "shelf with porcelain and boxes beside the doorway, pots of camellias on stands, a small incense burner on a side table", B.CARD_VH)),
    refs=[*B.G9, B.M2]),
}
for k in BATCH2: BATCH2[k]['prompt'] = fix(BATCH2[k]['prompt'])
for S in (R3334, BATCH2):
    for k, v in S.items():
        p = v['prompt']; assert A.WHITE in p and 'five sixths' in p and 'four fifths' not in p and '{' not in p and 'stone' not in p, k
        assert p.count('#E3A3B8') == 1 and '#A88BCB' not in p, k
        if not k.endswith('-ngu'): assert 'bed curtains' not in p and 'canopy bed' not in p, k
import room_gate
room_gate.guard(R3334, 'pr20-r3334'); room_gate.guard(BATCH2, 'pr20-batch2')
json.dump({'r3334': R3334, 'batch2': BATCH2}, open(os.path.join(D, 'prompts_pr20_rooms.json'), 'w'), ensure_ascii=False, indent=1)
for S in (R3334, BATCH2):
    for k, v in S.items(): open(os.path.join(D, f'prompts_pr20_{k}.txt'), 'w').write(v['prompt'])
print({k: len(v['prompt']) for S in (R3334, BATCH2) for k, v in S.items()}, 'GATE PASS')

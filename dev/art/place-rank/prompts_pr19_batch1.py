# PR19 — rooms BATCH 1 (owner "Ok" to batches of 5 with the room-30-NEW recipe, via ROOT-64 ~02:58Z). 5 gens, 1 try each.
# Queue (PR17 NEXT + L2): chính điện of the 7 palaces in 3 versions Tần < Phi < Quý phi, each reception + bedroom. Batch 1 = TẦN (t4) rooms:
#   31 Khải Tường chính điện bedroom (3w, windows RIGHT, M3) · 32 Khải Tường chính điện reception (2w, windows LEFT, M2X)
#   33 Chung Tú chính điện bedroom (2w, windows LEFT, M2X) · 34 Chung Tú chính điện reception (3w, windows RIGHT, M3)
#   35 Hàm An chính điện bedroom (3w, windows RIGHT, M3)
#   (Thừa Minh skipped for now: no palace signature card exists in the builders — needs a card first.)
# Recipe = room 30 NEW (prompts_pr19_room30.py): rooms 25–29 C9 block + L25 white-light sentence, wooden floor, refs G9 + image 3 guide.
# New vs phối rooms (L1/L2/B24): ONE occupant (a Tần lives alone), ONE rank colour soft pink #E3A3B8 (B24 t4) with ivory + soft jade-green
# partners; Tần luxury level = the approved Cảnh Phúc Tần wording (prompts.py RANK['tan']['lux']); bedroom = ONE wide tall canopy bed.
import os, sys, json, contextlib, io
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, D)
with contextlib.redirect_stdout(io.StringIO()):
    import prompts_pr13 as B
P = B.P
WHITE = "bright neutral white daylight, clean white light, no warm golden or amber cast, lanterns unlit"
STYLE = P['C9_STYLE'].replace('same natural warm light', 'same natural light'); assert STYLE != P['C9_STYLE']
OLDL = "LIGHT: soft warm morning daylight from the right, like the light on the girl in image 2."
END = P['C9_END'].replace(OLDL, "LIGHT: morning daylight from the right, like the light on the girl in image 2: " + WHITE + "."); assert END != P['C9_END']
FLOOR = 'warm polished wooden floorboards'
def room(txt, img3=B.GUIDE): return STYLE + " ROOM: " + txt + P['C9_CAM'].replace('{IMG3}', img3) + END.replace('{FLOOR}', FLOOR)
WL3R = B.WL3   # 3 walls; image 3 = M3 (windows in the RIGHT side wall)
TAN = ("a Tần (an imperial consort of the fourth rank, below a Phi) who heads this palace and lives here alone, in ancient China, a real room in daily use")
TANR = "a Tần (an imperial consort of the fourth rank, below a Phi) who heads this palace and lives here alone in ancient China"
RC4 = (" RANK COLOUR (Tần, owner B24): soft pink like #E3A3B8, a soft medium pink, is the one rank colour of the room, woven through the bed curtains, "
       "the bedding, the seat cushions, the window curtains and the lantern tassels, with ivory and soft jade-green as its quiet partners; no purple, "
       "no orange, no red silks.")
LUX4 = (" TẦN level, the simplest of the three chính điện versions yet one step richer than a lower consort's room: polished wood with fine carving "
        "and some jade-green inlay, embroidered silk, a few jade and porcelain ornaments, a little gilt edging; pretty and noble, never poor, never grand.")
TAIL = B.NOPE + B.RECT + B.GUIDE_S + B.FR + B.TAGZONE
RC4R = RC4.replace('the bed curtains, the bedding, the seat cushions', 'the seat cushions')
TAILR = B.NOPE + P['NOSOFA'] + B.RECT + B.GUIDE_S + B.FR + B.TAGZONE
BED1 = (" BED (owner Lượt 804, 815): the canopy bed is a tall frame bed about 2.4 m high, its canopy top clearly above the head of a standing woman, "
        "WIDE and full like a generous double bed, never a low box, never a slim narrow bed.")
def bed3R(pal, card, wood, flower, extra):
    return (f"{pal} cung chính điện bedroom, the private bedchamber of {TAN}, " + WL3R + ": pillars, lattice windows in the RIGHT side wall onto "
        f"a sunny garden; against the middle of the back wall, square to it and seen straight on, ONE canopy bed, the large clear main subject: a wide "
        f"canopy bed of carved {wood} with soft pink gauze curtains tied back and soft pink silk bedding embroidered with {flower}; around the room, "
        f"along the walls: {extra}, hanging paper lanterns with tassels. " + card + RC4 + LUX4 + BED1 + TAIL)
def bed2L(pal, card, wood, flower, extra):
    return (f"{pal} cung chính điện bedroom, the private bedchamber of {TAN}, " + B.WL2 + ": pillars, lattice windows in the LEFT side wall onto "
        f"a sunny garden; against the back wall in its RIGHT half, square to it and seen straight on, ONE canopy bed, the large clear main subject: a "
        f"wide canopy bed of carved {wood} with soft pink gauze curtains tied back and soft pink silk bedding embroidered with {flower}; {extra}, "
        f"hanging paper lanterns with tassels. " + card + RC4 + LUX4 + BED1 + TAIL)
def rec2L(pal, card, wood, flower, door, chairs, extra):
    return (f"{pal} cung chính điện reception room, the sitting room where {TANR} receives her guests, "
        "a real room in daily use, no bed anywhere, " + B.WL2 + ": pillars, lattice windows in the LEFT side wall onto a sunny garden; against the back wall in its RIGHT "
        f"half, square to it and seen straight on, the host seat, the large clear main subject: a luohan daybed of carved {wood} with a three-sided "
        f"panel back, soft pink silk cushions and a small low kang table with a tea set in its middle, before a folding screen painted with {flower}; "
        f"in the LEFT half of the back wall {door} onto an inner room; along the left window wall, square to it, a pair of {chairs} with soft pink "
        f"cushions and a small tea table between them; {extra}, hanging paper lanterns with tassels. " + card + RC4R + LUX4 + TAILR)
def rec3R(pal, card, wood, flower, door, chairs, extra):
    return (f"{pal} cung chính điện reception room, the sitting room where {TANR} receives her guests, "
        "a real room in daily use, no bed anywhere, " + WL3R + ": pillars, lattice windows in the RIGHT side wall onto a sunny garden; against the middle of the back "
        f"wall, square to it and seen straight on, the host seat, the large clear main subject: a luohan daybed of carved {wood} with a three-sided "
        f"panel back, soft pink silk cushions and a small low kang table with a tea set in its middle, before a folding screen painted with {flower}; "
        f"in the LEFT side wall {door} onto an inner room; a pair of {chairs} with soft pink cushions and a small tea table between them stands along "
        f"the right window wall, square to it; {extra}, hanging paper lanterns with tassels. " + card + RC4R + LUX4 + TAILR)
M3, M2X = B.M3, B.M2X
OUT = {
 'khai-tuong-cung-tan-ngu': dict(prompt=room(bed3R('Khải Tường', B.CARD_KT, 'honey-brown nanmu wood', 'lotus flowers',
    "a dressing table with a bronze mirror and a small jewellery box, round stools with soft pink cushions, a small screen painted with lotus "
    "flowers, a clothes rack with a soft pink robe, a celadon bowl of lotus flowers, a small tea table, a bookshelf with boxes")), refs=[*B.G9, M3]),
 'khai-tuong-cung-tan': dict(prompt=room(rec2L('Khải Tường', B.CARD_KT, 'honey-brown nanmu wood', 'lotus flowers and cranes',
    'the vase-shaped doorway in a hexagonal lattice partition', 'square-backed nanmu armchairs',
    "shelves with celadon vases and boxes, a bowl of lotus flowers on a stand, a small incense burner on a side table, a guqin on a low table")),
    refs=[*B.G9, M2X]),
 'chung-tu-cung-tan-ngu': dict(prompt=room(bed2L('Chung Tú', B.CARD_CT, 'dark red sandalwood', 'plum blossoms',
    "in the LEFT half of the back wall the rectangular doorway with rounded corners in a cracked-ice lattice partition; along the left window wall, "
    "square to it, a dressing table with a bronze mirror and a small cloisonné jewellery box and a low-backed rose chair with a soft pink cushion; "
    "a clothes rack with a soft pink robe by the bed, a vase of plum branches on a slim stand")), refs=[*B.G9, M2X]),
 'chung-tu-cung-tan': dict(prompt=room(rec3R('Chung Tú', B.CARD_CT, 'dark red sandalwood', 'plum blossoms and magpies',
    'the rectangular doorway with rounded corners in a cracked-ice lattice partition', 'low-backed rose chairs',
    "curio shelves with porcelain vases and small cloisonné boxes in the left back corner, vases of plum branches, a small incense burner on a "
    "side table, an embroidery frame on a stand")), refs=[*B.G9, M3]),
 'ham-an-cung-tan-ngu': dict(prompt=room(bed3R('Hàm An', B.CARD_HA, 'light walnut-brown elm wood', 'orchids',
    "a dressing table with a bronze mirror and a small jewellery box, round stools with soft pink cushions, a small screen painted with orchids "
    "and butterflies, a clothes rack with a soft pink robe, blue-and-white pots of orchids, a small tea table, a bookshelf with boxes and scrolls")),
    refs=[*B.G9, M3]),
}
for k, v in OUT.items():
    p = v['prompt']; assert WHITE in p and 'stone' not in p and '{' not in p and 'pale grey' not in p, k
    assert p.count('#E3A3B8') == 1 and '#A88BCB' not in p, k
import room_gate; room_gate.guard(OUT, 'pr19-batch1')
json.dump(OUT, open(os.path.join(D, 'prompts_pr19_batch1.json'), 'w'), ensure_ascii=False, indent=1)
for k, v in OUT.items(): open(os.path.join(D, f'prompts_pr19_b1_{k}.txt'), 'w').write(v['prompt'])
print({k: len(v['prompt']) for k, v in OUT.items()}, 'GATE PASS')

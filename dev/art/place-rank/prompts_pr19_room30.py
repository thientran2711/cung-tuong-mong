# PR19 — room 30 REDO (owner via ROOT-64 Lượt 969: "Phòng 30 mới nhìn AI quá" → "Nền gỗ như cũ, nhưng thêm câu ánh sáng trắng thử"). ONE gen.
# Old recipe = rooms 25–29 (prompts_pr13 room9 + C9, floor 'warm polished wooden floorboards', refs G9 + M2X; NO light refs 4/5, NO BASE).
# A17 DIFF vs the rooms 25–29 recipe — ONLY the L25 white-light sentence:
#   C9_END LIGHT 'soft warm morning daylight from the right, like the light on the girl in image 2.' ->
#     'morning daylight from the right, like the light on the girl in image 2: <WHITE>.'
#   C9_STYLE 'same natural warm light' -> 'same natural light' (contradicts WHITE; ROOT-64: drop golden/glow words that contradict).
# Room text = PR18's TX_TAY_REC layout minus its BASE sentence (that sentence carried the stone floor).
import os, sys, json, contextlib, io
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, D)
with contextlib.redirect_stdout(io.StringIO()):
    import prompts_pr13 as B
P = B.P
WHITE = "bright neutral white daylight, clean white light, no warm golden or amber cast, lanterns unlit"   # L25 verbatim
STYLE = P['C9_STYLE'].replace('same natural warm light', 'same natural light'); assert STYLE != P['C9_STYLE']
OLDL = "LIGHT: soft warm morning daylight from the right, like the light on the girl in image 2."
END = P['C9_END'].replace(OLDL, "LIGHT: morning daylight from the right, like the light on the girl in image 2: " + WHITE + ".")
assert END != P['C9_END']
TX_TAY_REC = ("Trường Xuân cung Tây phối điện reception room, the small sitting room where two lower-ranking imperial consorts (a Đáp ứng and "
    "a Quý nhân) living in the west side hall of a palace in ancient China receive their guests, a real room in daily use, no bed anywhere, " + B.WL2
    + ": pillars, lattice windows in the LEFT side wall onto a sunny garden; against the back wall in its RIGHT half, square to it and seen "
    "straight on, the host seat, the large clear main subject: a square-backed zitan luohan daybed with a small low kang table and a tea set in its "
    "middle and flat silk cushions, before a standing screen with kingfisher-blue feather inlay of white magnolias; in the LEFT half of the back "
    "wall a carved openwork partition with the tall vase-shaped doorway onto an inner room; along the left window wall, square to it, a pair of "
    "square-backed armchairs with a small tea table between them; a slim stand with a vase of white magnolias, a small incense burner on a side "
    "table, hanging paper lanterns with tassels. " + B.CARD_TX + B.pair_cols(3, 1).replace('the gauze curtains of BOTH beds, ', '').replace(
    'the bedding and cushions of BOTH beds, ', '').replace('; the two beds look alike in colour, never one bed soft blue and the other cream-ivory', '')
    + B.QN + " Only the two colours soft blue (curtains) and cream-ivory (fabrics)." + B.NOPE + P['NOSOFA'] + B.RECT + B.GUIDE_S + B.FR
    + B.TAGZONE)
FLOOR = 'warm polished wooden floorboards'
p = STYLE + " ROOM: " + TX_TAY_REC + P['C9_CAM'].replace('{IMG3}', B.GUIDE) + END.replace('{FLOOR}', FLOOR)
OUT = {'truong-xuan-cung-tay-phoi': dict(prompt=p, refs=[*B.G9, B.M2X])}
assert WHITE in p and 'stone floor' not in p and 'BASE' not in p and '{' not in p
import room_gate; room_gate.guard(OUT, 'pr19-room30')
json.dump(OUT, open(os.path.join(D, 'prompts_pr19_room30.json'), 'w'), ensure_ascii=False, indent=1)
open(os.path.join(D, 'prompts_pr19_room30.txt'), 'w').write(p)
print(len(p), OUT['truong-xuan-cung-tay-phoi']['refs'], 'GATE PASS')

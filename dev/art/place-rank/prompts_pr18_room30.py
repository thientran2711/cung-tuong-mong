# PR18 — room 30 SAMPLE (owner GO ~02:39Z via ROOT-64: "Thì mày vẽ hình đi"), rule L25 (+L26/L27): ONE gen.
# Trường Xuân TÂY phối reception, pair ĐQ as room 29 (curtains soft blue t3, fabrics cream-ivory t1). TWO walls, windows LEFT (M2X;
# receptions alternate 24 3wR, 26 2wL, 28 3wR -> 30 2wL). Own layout (new): host seat = square-backed zitan luohan daybed with a kang table in
# the RIGHT half of the back wall before a kingfisher-feather screen of magnolias; vase doorway in an openwork partition in the LEFT half;
# along the left window wall a pair of square-backed armchairs + tea table.
# A17 DIFF vs the PR17 room method (room9 + C9 common block): ONLY the L25 light/base words —
#   C9_STYLE 'same natural warm light' -> 'same natural light'; C9_END LIGHT sentence -> L25 white-light sentence (verbatim) + images 4/5 =
#   LIGHT references (live tẩm cung hạ sáng 5jDWGSRKxe, live Ngự hoa viên hạ sáng bxMYASU5Y2), light + base only, never their colours/objects;
#   FLOOR 'warm polished wooden floorboards' -> 'a pale grey polished stone floor'; BASE sentence (light neutral walls, wood only on frames,
#   pillars and furniture). Everything else = the PR17 builder (CARD_TX, pair_cols(3,1), QN, NOPE, NOSOFA, RECT, GUIDE_S, FR, TAGZONE).
import os, sys, json
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, D)
import contextlib, io
with contextlib.redirect_stdout(io.StringIO()):
    import prompts_pr13 as B
P = B.P
WHITE = "bright neutral white daylight, clean white light, no warm golden or amber cast, lanterns unlit"   # L25 mandatory, verbatim
STYLE = P['C9_STYLE'].replace('same natural warm light', 'same natural light'); assert STYLE != P['C9_STYLE']
END = P['C9_END'].replace("LIGHT: soft warm morning daylight from the right, like the light on the girl in image 2.",
    "LIGHT (owner L25): " + WHITE + ". Images 4 and 5 are LIGHT references only (two live scenes of our game): copy their bright airy "
    "daylight, their clean whites and their light, fresh base; never copy their objects, flowers, curtains, screens or colours.")
assert END != P['C9_END']
BASE = (" BASE (owner L25): light neutral pale walls and partitions, a pale grey polished stone floor, wood only on the frames, pillars and "
    "furniture, never brown boards underfoot; all the silks keep the two rank colours written here.")
def room_l25(room, img3, floor):
    return STYLE + " ROOM: " + room + P['C9_CAM'].replace('{IMG3}', img3) + END.replace('{FLOOR}', floor)
TX_TAY_REC = ("Trường Xuân cung Tây phối điện reception room, the small sitting room where two lower-ranking imperial consorts (a Đáp ứng and "
    "a Quý nhân) living in the west side hall of a palace in ancient China receive their guests, a real room in daily use, no bed anywhere, " + B.WL2
    + ": pillars, lattice windows in the LEFT side wall onto a sunny garden; against the back wall in its RIGHT half, square to it and seen "
    "straight on, the host seat, the large clear main subject: a square-backed zitan luohan daybed with a small low kang table and a tea set in its "
    "middle and flat silk cushions, before a standing screen with kingfisher-blue feather inlay of white magnolias; in the LEFT half of the back "
    "wall a carved openwork partition with the tall vase-shaped doorway onto an inner room; along the left window wall, square to it, a pair of "
    "square-backed armchairs with a small tea table between them; a slim stand with a vase of white magnolias, a small incense burner on a side "
    "table, hanging paper lanterns with tassels. " + B.CARD_TX + B.pair_cols(3, 1).replace('the gauze curtains of BOTH beds, ', '').replace(
    'the bedding and cushions of BOTH beds, ', '').replace('; the two beds look alike in colour, never one bed soft blue and the other cream-ivory', '')
    + B.QN + " Only the two colours soft blue (curtains) and cream-ivory (fabrics)." + BASE + B.NOPE + P['NOSOFA'] + B.RECT + B.GUIDE_S + B.FR
    + B.TAGZONE)
OUT = {'truong-xuan-cung-tay-phoi': dict(prompt=room_l25(TX_TAY_REC, B.GUIDE, 'a pale grey polished stone floor'),
                                         refs=[*B.G9, B.M2X, '5jDWGSRKxe', 'bxMYASU5Y2'])}
p = OUT['truong-xuan-cung-tay-phoi']['prompt']
for w in ('warm', 'golden light', 'wooden floor', 'floorboards', 'everywhere', 'BRIGHT', 'coffered', '{'):
    assert w not in p.replace('no warm golden', ''), w
assert WHITE in p
import room_gate; room_gate.guard(OUT, 'pr18-room30')
json.dump(OUT, open(os.path.join(D, 'prompts_pr18_room30.json'), 'w'), ensure_ascii=False, indent=1)
open(os.path.join(D, 'prompts_pr18_room30.txt'), 'w').write(p)
print(len(p), 'GATE PASS')

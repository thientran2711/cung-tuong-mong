# PR13 (owner Lượt 793, Foreman C ROOT-57): the MISSING rooms, one at a time, one try each.
# Method = approved common room block C9 (prompts.py room9: C9_STYLE + C9_CAM + C9_END) + per-room part; refs gOmYI7iSXO + EbYJzsMuuO
# + image 3 = an approved FIRST-gen model as a GUIDE only (frontal 3-wall cpS5YIl0eP / 2-wall 4RFIyNR9Aa; mirrors 1ldYySkr4r / 8aiwqQTIrU).
# Rank colours = B24 (t1 #EAE3D0, t2 #7FB394, t3 #7E9CCB, t4 #E3A3B8, t5 #A88BCB, t6 #E3A25B, t7 #D46A64, t8 #EFBD69).
import json, os, io, contextlib
D = os.path.dirname(os.path.abspath(__file__))
with contextlib.redirect_stdout(io.StringIO()):
    P = {'__file__': os.path.join(D, 'prompts.py'), '__name__': 'prompts'}
    exec(open(os.path.join(D, 'prompts.py')).read(), P)
room9, QN, NOPE, RECT, GUIDE, GUIDE_S, G9 = (P[k] for k in ('room9', 'QN', 'NOPE', 'RECT', 'GUIDE', 'GUIDE_S', 'G9'))
WL3, W2, WL2 = P['WL3'], P['W2'], P['WL2']
M3, M2, M3X, M2X = 'cpS5YIl0eP', '4RFIyNR9Aa', '1ldYySkr4r', '8aiwqQTIrU'
B24 = {1: ('cream-ivory', '#EAE3D0'), 2: ('soft green', '#7FB394'), 3: ('soft blue', '#7E9CCB'), 4: ('soft pink', '#E3A3B8'),
       5: ('lavender-violet', '#A88BCB'), 6: ('honey orange', '#E3A25B')}

def pair_cols(cur, fab):
    """L7 (owner Lượt 766): the pair is split by OBJECT TYPE — all curtains one rank colour, all furniture fabrics the other."""
    (cn, ch), (fn, fh) = B24[cur], B24[fab]
    return (f" COLOURS BY OBJECT TYPE (owner Lượt 491, 766): ALL the curtains of the room are {cn} like {ch} (the gauze curtains of BOTH beds, "
            f"the window curtains, the lantern tassels), and ALL the furniture fabrics are {fn} like {fh} (the bedding and cushions of BOTH beds, "
            f"the stool cushions, the seat cushions, the robes on the racks); the two beds look alike in colour, never one bed {cn} and the other {fn}. ")

OUT = {}
# 1) Thừa Minh TÂY phối bedroom — pair Đáp ứng (t1) + Thường tại (t2): curtains cream-ivory, fabrics soft green.
#    Own layout (L11/L19): the approved Đông phối bedroom = beds side by side with a screen between, back wall only, windows at the back;
#    here THREE walls, windows in the LEFT side wall, the two beds in the left and right halves of the back wall with a shelf cabinet between.
TM_TAY_NGU = ("Thừa Minh cung Tây phối điện bedroom, the cosy bedchamber SHARED by two lower-ranking imperial consorts (a Đáp ứng and a Thường tại) "
    "living in the west side hall of a palace in ancient China, a real room in daily use, " + WL3 + ": wooden pillars, lattice windows in the LEFT side "
    "wall onto a sunny garden; against the back wall, square to it and seen straight on, TWO canopy beds of carved lacquered wood with painted flowers, "
    "one in the left half and one in the right half of the back wall, together the large clear main subject; between them, in the middle of the back "
    "wall, a tall carved shelf cabinet with a few boxes, books and a vase of white orchids, a round lattice window above it; each bed with its own small "
    "dressing table with a bronze mirror and a stool standing along the side wall next to it, and a clothes rack with a robe; hanging paper lanterns with "
    "tassels, slippers at the bed steps, a small embroidery basket." + pair_cols(1, 2) + QN + " Exactly two beds; only the two colours cream-ivory "
    "(curtains) and soft green (fabrics)." + NOPE + RECT + GUIDE_S)
OUT['thua-minh-cung-tay-phoi-ngu'] = dict(prompt=room9(TM_TAY_NGU, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M3])

# 2) Thừa Minh TÂY phối reception — same pair ĐT; TWO walls (back + LEFT window wall; alternates with room 1), own layout:
#    approved Đông phối reception = daybed centred + mirrored chair rows; here the daybed in the RIGHT half of the back wall, a moon-gate
#    opening in the left half, the armchair pair along the left window wall. Image 3 = 2-wall model mirrored (window left) 8aiwqQTIrU.
TM_TAY_REC = ("Thừa Minh cung Tây phối điện reception room, the small sitting room where two lower-ranking imperial consorts (a Đáp ứng and a "
    "Thường tại) living in the west side hall of a palace in ancient China receive their guests, a real room in daily use, no bed anywhere, " + WL2 + ": "
    "wooden pillars, lattice windows in the LEFT side wall onto a sunny garden; against the back wall in its RIGHT half, square to it and seen straight on, "
    "the host seat, the large clear main subject: a luohan daybed (a wide low carved, flower-painted lacquered wood daybed with a three-sided carved panel "
    "back, a small low kang table with a tea set standing in its middle, flat silk cushions) with a painted folding screen with orchids behind it; in the "
    "LEFT half of the back wall a round moon-gate opening onto a small inner room with a hanging lantern; along the left window wall, square to it, a pair "
    "of small carved lacquered armchairs with a small tea table between them; shelves with porcelain vases, books and boxes, hanging paper lanterns with "
    "tassels, vases of white orchids, a small incense burner, an embroidery frame against the wall, potted plants. COLOURS BY OBJECT TYPE (owner Lượt 491, "
    "766): ALL the curtains of the room are cream-ivory like #EAE3D0 (the sheer window curtains tied back, the curtain of the moon gate, the lantern "
    "tassels), and ALL the furniture fabrics are soft green like #7FB394 (the daybed cushions, the armchair cushions, the table runner). " + QN
    + " Only the two colours cream-ivory (curtains) and soft green (fabrics)." + NOPE + P['NOSOFA'] + RECT + GUIDE_S)
OUT['thua-minh-cung-tay-phoi'] = dict(prompt=room9(TM_TAY_REC, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M2X])

# BUILDER FIX after rooms 1–2 (too much floor): new rooms 3+ carry PR11's approved measured floor sentences.
FB, FR = P['FLOOR11F_BED'], P['FLOOR11F_REC']
# 3) Cảnh Phúc ĐÔNG phối bedroom — pair Đáp ứng (t1) + Quý nhân (t3): curtains soft blue, fabrics cream-ivory. THREE walls (alternation),
#    windows at the RIGHT; own layout: the two beds against the LEFT and RIGHT side walls, square to them, a shared dressing table +
#    crabapple screen in the middle of the back wall (rooms 1/đông TM = beds on the back wall). Palace card CARD_CP. Image 3 = 3-wall model cpS5YIl0eP.
CP_DONG_NGU = ("Cảnh Phúc cung Đông phối điện bedroom, the cosy bedchamber SHARED by two lower-ranking imperial consorts (a Đáp ứng and a Quý nhân) "
    "living in the east side hall of a palace in ancient China, a real room in daily use, " + P['W3'].replace(' (owner Lượt 613: two walls read wider)', '')
    + ": wooden pillars, lattice windows in the RIGHT side wall onto a sunny garden; TWO canopy beds of carved lacquered wood with painted flowers, "
    "together the large clear main subject, one standing against the LEFT side wall and one against the RIGHT side wall, each square to its wall with its "
    "long side along the wall and its bed step facing the middle of the room, each bed whole inside the picture; in the middle of the back wall, seen "
    "straight on, a carved partition with a round moon-gate opening and, in front of it, a shared dressing table with a bronze mirror and two stools; "
    "beside each bed a small clothes rack with a robe; hanging paper lanterns with tassels, vases of crabapple blossoms, slippers at the bed steps, a "
    "small embroidery basket. " + P['CARD_CP'] + pair_cols(3, 1).replace('never one bed soft blue and the other cream-ivory', 'never one bed blue and the other ivory')
    + QN + " Exactly two beds; only the two colours soft blue (curtains) and cream-ivory (fabrics)." + NOPE + RECT + GUIDE_S + FB)
OUT['canh-phuc-cung-dong-phoi-ngu'] = dict(prompt=room9(CP_DONG_NGU, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M3])

# GATE (as v9): common block present, method refs, no drift words, no phoenix/yellow below t7.
for k, v in OUT.items():
    p = v['prompt']
    assert p.startswith(P['C9_STYLE']) and P['C9_CAM'].split('{IMG3}')[0] in p and P['C9_END'].split('{FLOOR}')[1] in p, k
    assert v['refs'][:2] == list(G9) and len(v['refs']) == 3, k
    for w in ('everywhere', 'BRIGHT', 'coffered', 'high ceiling', 'floor-to-ceiling', 'apricot', 'ruby', '{', 'transparent'):
        assert w not in p, (k, w)
json.dump(OUT, open(os.path.join(D, 'prompts_pr13.json'), 'w'), ensure_ascii=False, indent=1)
print({k: len(v['prompt']) for k, v in OUT.items()})

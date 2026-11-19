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

# GATE (as v9): common block present, method refs, no drift words, no phoenix/yellow below t7.
for k, v in OUT.items():
    p = v['prompt']
    assert p.startswith(P['C9_STYLE']) and P['C9_CAM'].split('{IMG3}')[0] in p and P['C9_END'].split('{FLOOR}')[1] in p, k
    assert v['refs'][:2] == list(G9) and len(v['refs']) == 3, k
    for w in ('everywhere', 'BRIGHT', 'coffered', 'high ceiling', 'floor-to-ceiling', 'apricot', 'ruby', '{', 'transparent'):
        assert w not in p, (k, w)
json.dump(OUT, open(os.path.join(D, 'prompts_pr13.json'), 'w'), ensure_ascii=False, indent=1)
print({k: len(v['prompt']) for k, v in OUT.items()})

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

# ---- PR14 (successor of PR13): rooms 4+. Owner Lượt 804: every NEW bedroom carries the bed-height sentence (canopy crown above the
#      standing women's heads); 'high ceiling' is a gate drift word, so "far below the high ceiling" -> "far below the ceiling beams".
#      Bedrooms: FLOOR11G_CLOSE (PR13 lesson; gave PASS on the HQP frontal in PR11); beds on the BACK wall (PR13 room 3: side-wall beds got cut).
BEDH = (" BED HEIGHT (owner Lượt 804): each bed is a tall canopy frame bed about 2.4 m high: its canopy top rises clearly above the head of a "
        "standing woman, far below the ceiling beams; never a low box.")
FG = P['FLOOR11G_CLOSE']
W2R = P['W2'].replace(' (owner Lượt 613: two walls read wider)', '')
# 4) Cảnh Phúc ĐÔNG phối reception — same occupants as room 3 (pair ĐQ: curtains soft blue, fabrics cream-ivory). TWO walls (alternation; room 3 = 3w),
#    windows in the RIGHT wall (room 2 = left). Own layout: TM đông = daybed centred + mirrored rows; TM tây = daybed right half + moon gate left;
#    here the daybed LEFT of centre with a crabapple screen, a tall curio shelf (duobaoge) right of it on the back wall, ONE round-backed armchair
#    pair + tea table along the right window wall. CARD_CP. Image 3 = 2-wall model window right 4RFIyNR9Aa.
CP_DONG_REC = ("Cảnh Phúc cung Đông phối điện reception room, the small sitting room where two lower-ranking imperial consorts (a Đáp ứng and a "
    "Quý nhân) living in the east side hall of a palace in ancient China receive their guests, a real room in daily use, no bed anywhere, " + W2R + ": "
    "wooden pillars, lattice windows in the RIGHT side wall onto a sunny garden; against the back wall, a little LEFT of its middle, square to it and "
    "seen straight on, the host seat, the large clear main subject: a luohan daybed (a wide low carved lacquered rosewood daybed with a three-sided "
    "carved panel back, a small low kang table with a tea set standing in its middle, flat silk cushions) with a painted folding screen of crabapple "
    "blossoms behind it; to the right of it on the back wall a tall carved curio shelf (duobaoge) with porcelain, jade pieces and boxes; along the right "
    "window wall, square to it, a pair of round-backed rosewood armchairs with a small tea table between them; hanging paper lanterns with tassels, "
    "vases of crabapple blossoms, a small incense burner, an embroidery frame, potted plants. " + P['CARD_CP'] + "COLOURS BY OBJECT TYPE (owner Lượt 491, "
    "766): ALL the curtains of the room are soft blue like #7E9CCB (the sheer window curtains tied back, the curtain of the moon gate, the lantern "
    "tassels), and ALL the furniture fabrics are cream-ivory like #EAE3D0 (the daybed cushions, the armchair cushions, the table runner). " + QN
    + " Only the two colours soft blue (curtains) and cream-ivory (fabrics)." + NOPE + P['NOSOFA'] + RECT + GUIDE_S + FR)
OUT['canh-phuc-cung-dong-phoi'] = dict(prompt=room9(CP_DONG_REC, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M2])

# 5) Cảnh Phúc TÂY phối bedroom — pair Thường tại + Thường tại (TT, both t2): the whole room one rank colour, soft green (curtains AND fabrics).
#    THREE walls, windows in the LEFT side wall (room 3 = right). Own layout, beds on the BACK wall: two built-in ALCOVE beds set INTO the back
#    wall (carved alcove fronts), flanking a central moon-gate opening onto a small inner dressing room (room 1 = free-standing beds + shelf between;
#    TM đông = beds side by side + screen). CARD_CP. Image 3 = 3-wall model window LEFT 1ldYySkr4r. + FLOOR11G_CLOSE + BEDH.
CP_TAY_NGU = ("Cảnh Phúc cung Tây phối điện bedroom, the cosy bedchamber SHARED by two lower-ranking imperial consorts (two Thường tại) living in "
    "the west side hall of a palace in ancient China, a real room in daily use, " + WL3 + ": wooden pillars, lattice windows in the LEFT side wall onto "
    "a sunny garden; the back wall, seen straight on, is a carved rosewood partition holding TWO alcove canopy beds (bat-carved alcove fronts with "
    "gauze curtains), one in its left part and one in its right part, both square to the back wall and whole inside the picture, together the large "
    "clear main subject; between the two beds, in the middle of the back wall, a round moon-gate opening onto a small inner dressing room with a "
    "bronze mirror; in front of each bed a low bed step with slippers; along the left window wall a small dressing table with a stool, along the right "
    "wall a clothes rack with a robe and a small cabinet; hanging paper lanterns with tassels, vases of crabapple blossoms, a small embroidery basket. "
    + P['CARD_CP'] + "COLOURS (owner Lượt 491, 766): both occupants have the same rank, so the whole room has ONE rank colour, soft green like #7FB394: "
    "the gauze curtains of BOTH beds, the window curtains, the lantern tassels, the bedding and cushions of BOTH beds, the stool cushion and the robe "
    "on the rack; the two beds look alike. " + QN + " Exactly two beds; the only rank colour is soft green." + NOPE + RECT + GUIDE_S + BEDH + FG)
OUT['canh-phuc-cung-tay-phoi-ngu'] = dict(prompt=room9(CP_TAY_NGU, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M3X])

# Khải Tường style card (new, PR14; pattern CARD_CP/CARD_TX: flower, carved motif, wood + inlay, furniture shape, partition shape) — reused in every later Khải Tường room.
CARD_KT = ("Khải Tường cung signature style, the same in every room of this palace: lotus flowers are its flower, painted on the screens, embroidered "
    "on the silks and in the bowls and vases; motifs of cranes among pine branches carved in the beams and furniture; warm honey-brown nanmu wood with "
    "mother-of-pearl inlay; square-backed armchairs with straight lines; a vase-shaped doorway in a hexagonal lattice partition. ")
BEDH2 = BEDH + (" The carved canopy crown of each bed stands at about one tenth of the picture height, above the hanging lanterns' tassels, and its "
    "gauze curtains hang from that crown; free-standing four-poster frame beds, never beds set into a wall alcove.")
pair1 = lambda cn, ch: (f"COLOURS (owner Lượt 491, 766): both occupants have the same rank, so the whole room has ONE rank colour, {cn} like {ch}: ")
# 6) Khải Tường ĐÔNG phối bedroom — pair Quý nhân + Quý nhân (QQ): whole room soft blue #7E9CCB. TWO walls (room 5 = 3w), windows LEFT
#    (image 3 = 2-wall model mirrored, window left, 8aiwqQTIrU). Own layout: both beds free-standing on the back wall in its RIGHT two thirds,
#    separated by a lattice partition with a vase-shaped doorway; the left third = writing desk under the window + tall lattice cabinet. + BEDH2 + FG.
KT_DONG_NGU = ("Khải Tường cung Đông phối điện bedroom, the cosy bedchamber SHARED by two lower-ranking imperial consorts (two Quý nhân) living in "
    "the east side hall of a palace in ancient China, a real room in daily use, " + WL2 + ": wooden pillars, lattice windows in the LEFT side wall "
    "onto a sunny garden; against the back wall in its RIGHT two thirds, square to it and seen straight on, TWO tall free-standing canopy frame beds "
    "of carved honey-brown nanmu wood, side by side with a narrow hexagonal lattice partition with a vase-shaped doorway between them, each bed whole "
    "inside the picture, together the large clear main subject; each bed with a low bed step and slippers; in the LEFT third of the room, under the "
    "window, a small writing desk with books, a brush stand and a stool, and against the back wall there a tall lattice cabinet with boxes and a "
    "bowl of lotus; a small clothes rack with a robe at the right end; hanging paper lanterns with tassels, a small embroidery basket. " + CARD_KT
    + pair1('soft blue', '#7E9CCB') + "the gauze curtains of BOTH beds, the window curtains, the lantern tassels, the bedding and cushions of BOTH "
    "beds, the stool cushion and the robe on the rack; the two beds look alike. " + QN + " Exactly two beds; the only rank colour is soft blue."
    + NOPE + RECT + GUIDE_S + BEDH2 + FG)
OUT['khai-tuong-cung-dong-phoi-ngu'] = dict(prompt=room9(KT_DONG_NGU, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M2X])
# 7) Khải Tường ĐÔNG phối reception — QQ soft blue. THREE walls, windows RIGHT (image 3 cpS5YIl0eP). Own layout: the host seats = a pair of
#    square-backed armchairs flanking a square tea table in the LEFT half of the back wall under a hanging lotus scroll; the vase-shaped doorway
#    in the middle of the back wall; a long table with a guqin and an incense burner in the right half; side walls: left tall cabinet, right windows.
KT_DONG_REC = ("Khải Tường cung Đông phối điện reception room, the small sitting room where two lower-ranking imperial consorts (two Quý nhân) living "
    "in the east side hall of a palace in ancient China receive their guests, a real room in daily use, no bed anywhere, "
    + P['W3'].replace(' (owner Lượt 613: two walls read wider)', '') + ": wooden pillars, lattice windows in the RIGHT side wall onto a sunny "
    "garden; against the back wall in its LEFT half, square to it and seen straight on, the host seats, the large clear main subject: a pair of "
    "square-backed armchairs of honey-brown nanmu wood with a square tea table and a tea set between them, a hanging scroll painting of lotus above, on a "
    "low wide platform; in the middle of the back wall a hexagonal lattice partition with a vase-shaped doorway onto a small inner room; in the "
    "RIGHT half of the back wall a long low table with a guqin zither, an incense burner and a bowl of lotus; against the left side wall a tall "
    "lattice cabinet with porcelain and boxes; along the right window wall a plant stand with a potted orchid; hanging paper lanterns with tassels, "
    "an embroidery frame. " + CARD_KT + pair1('soft blue', '#7E9CCB') + "the sheer window curtains tied back, the curtain of the doorway, the "
    "lantern tassels, the seat cushions and the table runner. " + QN + " The only rank colour is soft blue." + NOPE + P['NOSOFA'] + RECT + GUIDE_S + FR)
OUT['khai-tuong-cung-dong-phoi'] = dict(prompt=room9(KT_DONG_REC, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M3])

# PR14 room 8+: BEDH2 still gave crowns at ~17 % H (level with the heads) → BEDH3: crown near the top edge (about one twentieth), taller than the women.
BEDH3 = BEDH + (" Each bed is clearly taller than the standing women: its four posts and its carved canopy crown rise almost to the top edge of "
    "the picture, the crown at about one twentieth of the picture height, the hanging lanterns in front of it; its gauze curtains hang from that "
    "crown; free-standing four-poster frame beds, never beds set into a wall alcove.")
# 8) Khải Tường TÂY phối bedroom — pair Đáp ứng + Đáp ứng (ĐĐ): whole room cream-ivory #EAE3D0. THREE walls, windows LEFT (image 3 1ldYySkr4r).
#    Own layout: beds at the LEFT and RIGHT ENDS of the back wall, in the middle of the back wall a vase doorway with a shared dressing table +
#    round mirror in front; left window wall: small tea table + 2 stools; right wall: tall wardrobe cabinet. + CARD_KT + BEDH3 + FG.
KT_TAY_NGU = ("Khải Tường cung Tây phối điện bedroom, the cosy bedchamber SHARED by two lower-ranking imperial consorts (two Đáp ứng) living in the "
    "west side hall of a palace in ancient China, a real room in daily use, " + WL3 + ": wooden pillars, lattice windows in the LEFT side wall onto a "
    "sunny garden; against the back wall, square to it and seen straight on, TWO tall free-standing canopy frame beds of carved honey-brown nanmu "
    "wood, one at the LEFT end and one at the RIGHT end of the back wall, each bed whole inside the picture, together the large clear main subject; "
    "in the middle of the back wall a hexagonal lattice partition with a vase-shaped doorway, and in front of it a shared dressing table with a "
    "round bronze mirror and a stool; each bed with a low bed step and slippers; along the left window wall a small tea table with two stools; "
    "against the right side wall a tall wardrobe cabinet; hanging paper lanterns with tassels, a bowl of lotus, a small embroidery basket. " + CARD_KT
    + pair1('cream-ivory', '#EAE3D0') + "the gauze curtains of BOTH beds, the window curtains, the lantern tassels, the bedding and cushions of BOTH "
    "beds and the stool cushions, set off by the honey-brown wood; the two beds look alike. " + QN + " Exactly two beds; the only rank colour is "
    "cream-ivory." + NOPE + RECT + GUIDE_S + BEDH3 + FG)
OUT['khai-tuong-cung-tay-phoi-ngu'] = dict(prompt=room9(KT_TAY_NGU, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M3X])
# 9) Khải Tường TÂY phối reception — ĐĐ cream-ivory. TWO walls, windows RIGHT (image 3 4RFIyNR9Aa). Own layout: luohan daybed + kang table in
#    the RIGHT third of the back wall between two tall lattice cabinets; vase doorway in the LEFT third; round table with four drum stools in
#    front of the left part. + CARD_KT + FR.
KT_TAY_REC = ("Khải Tường cung Tây phối điện reception room, the small sitting room where two lower-ranking imperial consorts (two Đáp ứng) living "
    "in the west side hall of a palace in ancient China receive their guests, a real room in daily use, no bed anywhere, " + W2R + ": wooden "
    "pillars, lattice windows in the RIGHT side wall onto a sunny garden; against the back wall in its RIGHT third, square to it and seen straight "
    "on, the host seat, the large clear main subject: a luohan daybed (a wide low carved honey-brown nanmu daybed with a three-sided carved panel "
    "back, a small low kang table with a tea set in its middle, flat silk cushions) between two tall lattice cabinets with porcelain and books; in "
    "the LEFT third of the back wall a hexagonal lattice partition with a vase-shaped doorway onto a small inner room; in front of the left part, "
    "back near the wall, a small round table with four drum stools and a bowl of lotus; hanging paper lanterns with tassels, an incense burner, "
    "potted plants by the windows. " + CARD_KT + pair1('cream-ivory', '#EAE3D0') + "the sheer window curtains tied back, the curtain of the doorway, "
    "the lantern tassels, the daybed cushions, the drum stool cushions and the table runner, set off by the honey-brown wood. " + QN
    + " The only rank colour is cream-ivory." + NOPE + P['NOSOFA'] + RECT + GUIDE_S + FR)
OUT['khai-tuong-cung-tay-phoi'] = dict(prompt=room9(KT_TAY_REC, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M2])

# PR14 room 10+: BEDH2/BEDH3 still gave crowns at ~16-17 % H (the model stops the bed under the lanterns) → BEDH4: posts + crown run OUT of the
#    top edge like the walls and pillars; lanterns only beside the beds, never in front of them.
BEDH4 = BEDH + (" Each bed is clearly taller than the standing women: its four posts and its carved canopy crown run out of the top edge of the "
    "picture, like the walls and pillars, so the top of the bed is cut by the top edge; its gauze curtains hang from high up; the hanging lanterns "
    "hang only beside the beds, never in front of them; free-standing four-poster frame beds, never beds set into a wall alcove.")
# Chung Tú style card (new, PR14) — reused in every later Chung Tú room.
CARD_CT = ("Chung Tú cung signature style, the same in every room of this palace: plum blossoms (hoa mai) are its flower, painted on the screens, "
    "embroidered on the silks and in the vases; motifs of magpies on plum branches carved in the beams and furniture; dark red sandalwood with small "
    "cloisonné enamel plaques; low-backed rose chairs; a rectangular doorway with rounded corners in a cracked-ice lattice partition. ")
# 10) Chung Tú ĐÔNG phối bedroom — pair Đáp ứng (t1) + Thường tại (t2), colours swapped vs room 1: curtains soft green, fabrics cream-ivory.
#     THREE walls, windows RIGHT (image 3 cpS5YIl0eP). Own layout: both beds side by side in the LEFT two thirds of the back wall on ONE long shared
#     low platform, a cracked-ice lattice doorway between them; right third: dressing table + stool under the right windows, tall clothes cabinet
#     at the back right. + CARD_CT + BEDH4 + FG.
CT_DONG_NGU = ("Chung Tú cung Đông phối điện bedroom, the cosy bedchamber SHARED by two lower-ranking imperial consorts (a Đáp ứng and a Thường tại) "
    "living in the east side hall of a palace in ancient China, a real room in daily use, " + P['W3'].replace(' (owner Lượt 613: two walls read wider)', '')
    + ": wooden pillars, lattice windows in the RIGHT side wall onto a sunny garden; against the back wall in its LEFT two thirds, square to it and "
    "seen straight on, TWO tall free-standing canopy frame beds of carved dark red sandalwood standing side by side on ONE long shared low platform "
    "step, with a cracked-ice lattice partition and its rounded doorway between them, each bed whole in width inside the picture, together the large "
    "clear main subject; slippers on the platform step; in the RIGHT third of the room a tall clothes cabinet at the back and, under the right "
    "windows, a small dressing table with a bronze mirror and a stool; hanging paper lanterns with tassels, vases of plum blossoms, a small "
    "embroidery basket. " + CARD_CT + pair_cols(2, 1) + QN + " Exactly two beds; only the two colours soft green (curtains) and cream-ivory (fabrics)."
    + NOPE + RECT + GUIDE_S + BEDH4 + FG)
OUT['chung-tu-cung-dong-phoi-ngu'] = dict(prompt=room9(CT_DONG_NGU, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M3])

# 11) Chung Tú ĐÔNG phối reception — same pair as room 10 (ĐT: curtains soft green, fabrics cream-ivory). TWO walls, windows LEFT (image 3 8aiwqQTIrU).
#     Own layout: host seats = a pair of low rose chairs + tea table CENTRED on the back wall before a large painted plum-blossom wall panel,
#     flanked by two rounded doorways in cracked-ice lattice (left and right); along the left window wall an embroidery frame and a guqin table. + CARD_CT + FR.
CT_DONG_REC = ("Chung Tú cung Đông phối điện reception room, the small sitting room where two lower-ranking imperial consorts (a Đáp ứng and a "
    "Thường tại) living in the east side hall of a palace in ancient China receive their guests, a real room in daily use, no bed anywhere, " + WL2
    + ": wooden pillars, lattice windows in the LEFT side wall onto a sunny garden; in the middle of the back wall, square to it and seen straight on, "
    "the host seats, the large clear main subject: a pair of low-backed rose chairs of dark red sandalwood with a small square tea table and a tea "
    "set between them, on a low wide platform, before a large painted wall panel of plum blossoms and magpies; to the left and to the right of that "
    "panel, in the back wall, two cracked-ice lattice partitions each with a rounded doorway onto an inner room; along the left window wall an "
    "embroidery frame on its stand and a low table with a guqin zither; a tall slim cabinet with porcelain at the right end of the back wall; "
    "hanging paper lanterns with tassels, vases of plum blossoms, a small incense burner. " + CARD_CT + "COLOURS BY OBJECT TYPE (owner Lượt 491, "
    "766): ALL the curtains of the room are soft green like #7FB394 (the sheer window curtains tied back, the curtains of the doorways, the lantern "
    "tassels), and ALL the furniture fabrics are cream-ivory like #EAE3D0 (the chair cushions, the platform mat edge, the table runner). " + QN
    + " Only the two colours soft green (curtains) and cream-ivory (fabrics)." + NOPE + P['NOSOFA'] + RECT + GUIDE_S + FR)
OUT['chung-tu-cung-dong-phoi'] = dict(prompt=room9(CT_DONG_REC, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M2X])

# PR15 R2 of room 10 (owner Lượt 823: "beds too NARROW" — make each bed clearly wider, a full generous canopy bed; keep BEDH4 + everything else).
#     A17 DIFF vs CT_DONG_NGU: "TWO tall free-standing canopy frame beds" -> "TWO tall, WIDE, generous free-standing canopy frame beds"
#     + one width sentence after "the large clear main subject". Nothing else changed.
CT_DONG_NGU_R2 = CT_DONG_NGU.replace("TWO tall free-standing canopy frame beds", "TWO tall, WIDE, generous free-standing canopy frame beds").replace(
    "together the large clear main subject;", "together the large clear main subject; each bed is WIDE and full like a generous double canopy bed, "
    "much wider than a person lying across it, its mattress platform wide and deep, never a slim narrow bed, the two wide beds together filling "
    "most of the width of the back wall's left two thirds;")
assert CT_DONG_NGU_R2.count('WIDE') == 2
OUT['chung-tu-cung-dong-phoi-ngu-r2'] = dict(prompt=room9(CT_DONG_NGU_R2, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M3])

# ---- PR15 batch 3 rooms 12–15. Owner Lượt 815/823: beds too small / too narrow → every NEW bedroom also carries BEDW (the width sentence of
#      the room-10 redraw, same words). Owner Lượt 816: frontal layout with the two beds on both sides OK for all palaces; no alcove beds.
BEDW = (" BED WIDTH (owner Lượt 815, 823): each bed is WIDE and full like a generous double canopy bed, much wider than a person lying across it, "
    "its mattress platform wide and deep, never a slim narrow bed.")
W3R = P['W3'].replace(' (owner Lượt 613: two walls read wider)', '')
# 12) Cảnh Phúc TÂY phối reception — same occupants as room 5 (TT: whole room soft green #7FB394). THREE walls (room 11 = 2w), windows RIGHT
#     (room 11 = left; image 3 cpS5YIl0eP). Own layout (CP đông rec = daybed left of centre + curio shelf; TM = daybed centred / right half):
#     host seats = a pair of round-backed armchairs + round tea table in the RIGHT half of the back wall before a tall folding crabapple screen;
#     LEFT half of the back wall = a carved partition with the round moon-gate opening; left side wall = writing desk + scroll; right windows =
#     a plant stand. + CARD_CP + FR.
CP_TAY_REC = ("Cảnh Phúc cung Tây phối điện reception room, the small sitting room where two lower-ranking imperial consorts (two Thường tại) living "
    "in the west side hall of a palace in ancient China receive their guests, a real room in daily use, no bed anywhere, " + W3R + ": wooden "
    "pillars, lattice windows in the RIGHT side wall onto a sunny garden; against the back wall in its RIGHT half, square to it and seen straight on, "
    "the host seats, the large clear main subject: a pair of round-backed armchairs of dark rosewood with a small round tea table and a tea set "
    "between them, on a low wide platform, before a tall folding screen painted with crabapple blossoms; in the LEFT half of the back wall a carved "
    "partition with a round moon-gate opening onto a small inner room; against the left side wall a writing desk with brushes and an inkstone under "
    "a hanging scroll; along the right window wall a tall plant stand with a potted orchid; hanging paper lanterns with tassels, vases of crabapple "
    "blossoms, a small incense burner. " + P['CARD_CP'] + pair1('soft green', '#7FB394') + "the sheer window curtains tied back, the curtain of the "
    "moon gate, the lantern tassels, the seat cushions and the table runner, set off by the dark rosewood. " + QN
    + " The only rank colour is soft green." + NOPE + P['NOSOFA'] + RECT + GUIDE_S + FR)
OUT['canh-phuc-cung-tay-phoi'] = dict(prompt=room9(CP_TAY_REC, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M3])

# 13) Chung Tú TÂY phối bedroom — pair Thường tại (t2) + Quý nhân (t3) (TQ; only used on the approved TM đông): curtains soft blue, fabrics soft
#     green. TWO walls, windows LEFT (image 3 8aiwqQTIrU). Own layout (owner Lượt 816 frontal two beds on both sides): the two beds at the LEFT and
#     RIGHT ends of the back wall, square to it; centre of the back wall = a large plum + magpie wall panel with a low dressing table, round mirror
#     and two rose stools before it, a rounded cracked-ice doorway beside it; left window wall = small embroidery frame. + CARD_CT + BEDH4 + BEDW + FG.
CT_TAY_NGU = ("Chung Tú cung Tây phối điện bedroom, the cosy bedchamber SHARED by two lower-ranking imperial consorts (a Thường tại and a Quý nhân) "
    "living in the west side hall of a palace in ancient China, a real room in daily use, " + WL2 + ": wooden pillars, lattice windows in the LEFT "
    "side wall onto a sunny garden; against the back wall, square to it and seen straight on, TWO tall, WIDE, generous free-standing canopy frame beds "
    "of carved dark red sandalwood, one at the LEFT end and one at the RIGHT end of the back wall, each on its own low bed step with slippers, each "
    "bed whole in width inside the picture, together the large clear main subject; in the middle of the back wall between them a large painted wall "
    "panel of plum blossoms and magpies with a low dressing table, a round bronze mirror and two low rose stools before it, and a cracked-ice lattice "
    "partition with its rounded doorway onto a small inner room beside the panel; along the left window wall a small embroidery frame on its stand; "
    "hanging paper lanterns with tassels, vases of plum blossoms, a small embroidery basket. " + CARD_CT + pair_cols(3, 2) + QN
    + " Exactly two beds; only the two colours soft blue (curtains) and soft green (fabrics)." + NOPE + RECT + GUIDE_S + BEDH4 + BEDW + FG)
OUT['chung-tu-cung-tay-phoi-ngu'] = dict(prompt=room9(CT_TAY_NGU, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M2X])

# 14) Chung Tú TÂY phối reception — same pair TQ (curtains soft blue, fabrics soft green). THREE walls, windows RIGHT (image 3 cpS5YIl0eP).
#     Own layout (room 11 = rose-chair pair centred before the plum panel): host seat = a luohan daybed with a kang table in the LEFT third of
#     the back wall under a plum scroll; centre = cracked-ice partition with the rounded doorway; RIGHT third = a long table with a guqin; left
#     side wall = a porcelain cabinet; along the right window wall two low rose chairs + small tea table. + CARD_CT + FR.
CT_TAY_REC = ("Chung Tú cung Tây phối điện reception room, the small sitting room where two lower-ranking imperial consorts (a Thường tại and a "
    "Quý nhân) living in the west side hall of a palace in ancient China receive their guests, a real room in daily use, no bed anywhere, " + W3R
    + ": wooden pillars, lattice windows in the RIGHT side wall onto a sunny garden; against the back wall in its LEFT third, square to it and seen "
    "straight on, the host seat, the large clear main subject: a luohan daybed of dark red sandalwood (a wide low carved daybed with a three-sided "
    "panel back, a small low kang table with a tea set in its middle, flat silk cushions) under a hanging scroll of plum blossoms; in the middle of "
    "the back wall a cracked-ice lattice partition with its rounded doorway onto an inner room; in the RIGHT third of the back wall a long low table "
    "with a guqin zither and a vase of plum blossoms; against the left side wall a tall cabinet with porcelain; along the right window wall two low "
    "rose chairs with a small tea table between them; hanging paper lanterns with tassels, a small incense burner. " + CARD_CT + "COLOURS BY OBJECT "
    "TYPE (owner Lượt 491, 766): ALL the curtains of the room are soft blue like #7E9CCB (the sheer window curtains tied back, the curtain of the "
    "doorway, the lantern tassels), and ALL the furniture fabrics are soft green like #7FB394 (the daybed cushions, the chair cushions, the table "
    "runner). " + QN + " Only the two colours soft blue (curtains) and soft green (fabrics)." + NOPE + P['NOSOFA'] + RECT + GUIDE_S + FR)
OUT['chung-tu-cung-tay-phoi'] = dict(prompt=room9(CT_TAY_REC, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M3])

# Hàm An style card (new, PR15; pattern CARD_CP/KT/CT: flower, carved motif, wood + inlay, furniture shape, partition shape) — reused in every later Hàm An room.
CARD_HA = ("Hàm An cung signature style, the same in every room of this palace: orchids (hoa lan) are its flower, painted on the screens, embroidered "
    "on the silks and in the pots; motifs of butterflies among orchids carved in the beams and furniture; light warm walnut-brown elm wood with small "
    "blue-and-white porcelain plaques; armchairs with gently curved yoke-shaped top rails; a four-lobed begonia-shaped doorway in a key-fret lattice "
    "partition. ")
# 15) Hàm An ĐÔNG phối bedroom — pair Đáp ứng (t1) + Quý nhân (t3), colours swapped vs room 3 (ĐQ): curtains cream-ivory, fabrics soft blue.
#     TWO walls, windows LEFT (image 3 8aiwqQTIrU). Own layout (frontal, two beds on both sides, owner Lượt 816): beds at the LEFT and RIGHT ends
#     of the back wall; centre = the begonia doorway with a low writing desk + curved-rail armchair before it and an orchid stand each side;
#     left window wall = small tea table + two stools. + CARD_HA + BEDH4 + BEDW + FG.
HA_DONG_NGU = ("Hàm An cung Đông phối điện bedroom, the cosy bedchamber SHARED by two lower-ranking imperial consorts (a Đáp ứng and a Quý nhân) "
    "living in the east side hall of a palace in ancient China, a real room in daily use, " + WL2 + ": wooden pillars, lattice windows in the LEFT "
    "side wall onto a sunny garden; against the back wall, square to it and seen straight on, TWO tall, WIDE, generous free-standing canopy frame beds "
    "of carved walnut-brown elm wood, one at the LEFT end and one at the RIGHT end of the back wall, each on its own low bed step with slippers, each "
    "bed whole in width inside the picture, together the large clear main subject; in the middle of the back wall between them a key-fret lattice "
    "partition with a four-lobed begonia-shaped doorway onto a small inner room, a low writing desk with an armchair before it and a tall stand with "
    "a potted orchid on each side; along the left window wall a small tea table with two stools; hanging paper lanterns with tassels, pots of "
    "orchids, a small embroidery basket. " + CARD_HA + pair_cols(1, 3) + QN
    + " Exactly two beds; only the two colours cream-ivory (curtains) and soft blue (fabrics)." + NOPE + RECT + GUIDE_S + BEDH4 + BEDW + FG)
OUT['ham-an-cung-dong-phoi-ngu'] = dict(prompt=room9(HA_DONG_NGU, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M2X])

# 16) Hàm An ĐÔNG phối reception — same pair as room 15 (ĐQ swapped: curtains cream-ivory, fabrics soft blue). THREE walls (room 15 = 2w),
#     windows RIGHT (image 3 cpS5YIl0eP). Own layout: the begonia doorway at the LEFT end of the back wall; host seat = a luohan daybed with a
#     kang table in the middle of the back wall's RIGHT two thirds before a large painted orchid-and-butterfly wall panel, a pair of yoke-rail
#     armchairs at its two ends; left side wall = tall bookcase with scrolls; right windows = orchid stands + small writing desk. + CARD_HA + FR.
HA_DONG_REC = ("Hàm An cung Đông phối điện reception room, the small sitting room where two lower-ranking imperial consorts (a Đáp ứng and a "
    "Quý nhân) living in the east side hall of a palace in ancient China receive their guests, a real room in daily use, no bed anywhere, " + W3R
    + ": wooden pillars, lattice windows in the RIGHT side wall onto a sunny garden; at the LEFT end of the back wall a key-fret lattice partition "
    "with a four-lobed begonia-shaped doorway onto an inner room; in the middle of the RIGHT two thirds of the back wall, square to it and seen "
    "straight on, the host seat, the large clear main subject: a luohan daybed of walnut-brown elm wood (a wide low carved daybed with a "
    "three-sided panel back, a small low kang table with a tea set in its middle, flat silk cushions) before a large painted wall panel of orchids "
    "and butterflies, with one armchair with a curved yoke-shaped top rail at each end of the daybed; against the left side wall a tall bookcase "
    "with scrolls and books; along the right window wall a small writing desk with brushes and two tall stands with potted orchids; hanging paper "
    "lanterns with tassels, a small incense burner. " + CARD_HA + "COLOURS BY OBJECT TYPE (owner Lượt 491, 766): ALL the curtains of the room are "
    "cream-ivory like #EAE3D0 (the sheer window curtains tied back, the curtain of the doorway, the lantern tassels), and ALL the furniture fabrics "
    "are soft blue like #7E9CCB (the daybed cushions, the chair cushions, the table runner). " + QN
    + " Only the two colours cream-ivory (curtains) and soft blue (fabrics)." + NOPE + P['NOSOFA'] + RECT + GUIDE_S + FR)
OUT['ham-an-cung-dong-phoi'] = dict(prompt=room9(HA_DONG_REC, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M3])

# 17) Hàm An TÂY phối bedroom — pair Thường tại (t2) + Quý nhân (t3) swapped vs room 13: curtains soft green, fabrics soft blue. TWO walls,
#     windows LEFT (room 16 = 3w right; image 3 8aiwqQTIrU). Own layout (owner L816 frontal, beds both ends; room 15 = doorway centre): centre of
#     the back wall = a large round painted orchid panel above a dressing table with a round mirror and two stools; a tall cabinet beside it.
#     + CARD_HA + BEDH4 + BEDW + FG.
HA_TAY_NGU = ("Hàm An cung Tây phối điện bedroom, the cosy bedchamber SHARED by two lower-ranking imperial consorts (a Thường tại and a Quý nhân) "
    "living in the west side hall of a palace in ancient China, a real room in daily use, " + WL2 + ": wooden pillars, lattice windows in the LEFT "
    "side wall onto a sunny garden; against the back wall, square to it and seen straight on, TWO tall, WIDE, generous free-standing canopy frame beds "
    "of carved walnut-brown elm wood, one at the LEFT end and one at the RIGHT end of the back wall, each on its own low bed step with slippers, each "
    "bed whole in width inside the picture, together the large clear main subject; in the middle of the back wall between them a large round painted "
    "panel of orchids and butterflies above a dressing table with a round bronze mirror and two low stools, and a tall slim lattice cabinet with "
    "porcelain beside it; hanging paper lanterns with tassels, pots of orchids, a small embroidery basket. " + CARD_HA + pair_cols(2, 3) + QN
    + " Exactly two beds; only the two colours soft green (curtains) and soft blue (fabrics)." + NOPE + RECT + GUIDE_S + BEDH4 + BEDW + FG)
OUT['ham-an-cung-tay-phoi-ngu'] = dict(prompt=room9(HA_TAY_NGU, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M2X])

# 18) (PR16) Hàm An TÂY phối reception — same pair as room 17 (TQ swapped: curtains soft green, fabrics soft blue). THREE walls (room 17 = 2w left),
#     windows RIGHT (image 3 cpS5YIl0eP). Own layout (14 = daybed left third, 16 = daybed right two thirds + armchairs, 11/12 = chair pairs):
#     host seat = a wide LOW RAISED DAIS of elm wood with a low square kang table + flat seat cushions in the LEFT two thirds of the back wall under
#     three hanging orchid scrolls; begonia doorway at the RIGHT end of the back wall (16 = left end, 15 = centre); left side wall = tall curio
#     shelf with porcelain; right windows = small round chess table + two drum stools + a tall orchid stand. + CARD_HA + FR.
#     A17: new room on the HA_DONG_REC frame; changed only layout sentences, occupants (Thường tại + Quý nhân) and the colour pair (green / blue).
HA_TAY_REC = ("Hàm An cung Tây phối điện reception room, the small sitting room where two lower-ranking imperial consorts (a Thường tại and a "
    "Quý nhân) living in the west side hall of a palace in ancient China receive their guests, a real room in daily use, no bed anywhere, " + W3R
    + ": wooden pillars, lattice windows in the RIGHT side wall onto a sunny garden; at the RIGHT end of the back wall a key-fret lattice partition "
    "with a four-lobed begonia-shaped doorway onto an inner room; in the LEFT two thirds of the back wall, square to it and seen straight on, the "
    "host seat, the large clear main subject: a wide low raised dais of walnut-brown elm wood one step high with a carved apron, on it a low square "
    "kang table with a tea set and flat silk seat cushions on both sides of the table, under a row of three hanging scrolls of orchids; against the "
    "left side wall a tall curio shelf with porcelain vases and small boxes; along the right window wall a small round chess table with two drum "
    "stools and a tall stand with a potted orchid; hanging paper lanterns with tassels, a small incense burner. " + CARD_HA + "COLOURS BY OBJECT "
    "TYPE (owner Lượt 491, 766): ALL the curtains of the room are soft green like #7FB394 (the sheer window curtains tied back, the curtain of the "
    "doorway, the lantern tassels), and ALL the furniture fabrics are soft blue like #7E9CCB (the seat cushions, the stool cushions, the table "
    "runner). " + QN + " Only the two colours soft green (curtains) and soft blue (fabrics)." + NOPE + P['NOSOFA'] + RECT + GUIDE_S + FR)
OUT['ham-an-cung-tay-phoi'] = dict(prompt=room9(HA_TAY_REC, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M3])

# ---- PR16 pre-build (ROOT-59 00:38Z: "pre-build Diên Huy (CARD_DH + pair) while waiting; no gens"). Pairs = the least-used so far
#      (TT 2, QQ 2, ĐĐ 2 vs ĐT/ĐQ/TQ 4–5): Diên Huy đông = TT (whole room soft green), tây = QQ (whole room soft blue).
#      Walls / windows continue the alternation from room 18 (3w right): 19 = 2w left, 20 = 3w right, 21 = 2w left, 22 = 3w right.
# Diên Huy style card (new, PR16; pattern of CARD_CP/KT/CT/HA: flower, carved motif, wood + inlay, furniture shape, partition shape — none of
# these used by another palace): chrysanthemums; pairs of swallows among willow branches; chestnut-brown huanghuali +
# small white jade plaques; tall-backed lamp-hanger chairs without arms; an octagonal doorway in a lattice of interlocking coin circles.
CARD_DH = ("Diên Huy cung signature style, the same in every room of this palace: chrysanthemums (hoa cúc) are its flower, painted on the screens, "
    "embroidered on the silks and in the pots; motifs of pairs of swallows among willow branches carved in the beams and furniture; warm "
    "chestnut-brown huanghuali wood with small white jade plaques; tall-backed lamp-hanger side chairs without arms; an octagonal doorway in a "
    "lattice partition of interlocking coin circles. ")
# 19) Diên Huy ĐÔNG phối bedroom — pair Thường tại + Thường tại (TT): whole room soft green #7FB394. TWO walls, windows LEFT (image 3 8aiwqQTIrU).
#     Own layout (10 = both beds on one shared platform in the left two thirds; 15/17 = beds at both ends): both beds side by side in the RIGHT
#     two thirds of the back wall, each on its own low bed step, a small carved bedside cabinet between them; the octagonal doorway at the LEFT end
#     of the back wall; along the left window wall a dressing table with a round mirror + stool and a clothes rack with a robe. + CARD_DH + BEDH4 + BEDW + FG.
DH_DONG_NGU = ("Diên Huy cung Đông phối điện bedroom, the cosy bedchamber SHARED by two lower-ranking imperial consorts (two Thường tại) living in "
    "the east side hall of a palace in ancient China, a real room in daily use, " + WL2 + ": wooden pillars, lattice windows in the LEFT side wall "
    "onto a sunny garden; against the back wall in its RIGHT two thirds, square to it and seen straight on, TWO tall, WIDE, generous free-standing "
    "canopy frame beds of carved chestnut-brown huanghuali wood side by side, each on its own low bed step with slippers, a small carved bedside "
    "cabinet with a lamp between them, each bed whole in width inside the picture, together the large clear main subject; at the LEFT end of the "
    "back wall a lattice partition with the octagonal doorway onto an inner room; along the left window wall a dressing table with a round bronze "
    "mirror and a low stool, and a clothes rack with a robe; hanging paper lanterns with tassels, pots of chrysanthemums, a small embroidery basket. "
    + CARD_DH + pair1('soft green', '#7FB394') + "the gauze curtains of BOTH beds, the window curtains, the curtain of the doorway, the lantern "
    "tassels, the bedding and cushions of BOTH beds and the stool cushion, set off by the chestnut-brown wood; the two beds look alike. " + QN
    + " Exactly two beds; the only rank colour is soft green." + NOPE + RECT + GUIDE_S + BEDH4 + BEDW + FG)
OUT['dien-huy-cung-dong-phoi-ngu'] = dict(prompt=room9(DH_DONG_NGU, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M2X])

# 20) Diên Huy ĐÔNG phối reception — TT soft green. THREE walls, windows RIGHT (image 3 cpS5YIl0eP). Own layout (daybeds 9/14/16, dais 18,
#     chair pairs 11 centred + two doorways / 12 right half + screen): host seats = a pair of tall-backed lamp-hanger chairs + square tea table
#     in the CENTRE of the back wall before a long narrow side table with a vase, under a large horizontal painted chrysanthemum panel; the
#     octagonal doorway at the LEFT end of the back wall only; RIGHT end = a tall standing embroidered screen panel; left side wall = writing
#     desk; right windows = two chrysanthemum stands + small weiqi table. + CARD_DH + FR.
DH_DONG_REC = ("Diên Huy cung Đông phối điện reception room, the small sitting room where two lower-ranking imperial consorts (two Thường tại) "
    "living in the east side hall of a palace in ancient China receive their guests, a real room in daily use, no bed anywhere, " + W3R + ": wooden "
    "pillars, lattice windows in the RIGHT side wall onto a sunny garden; in the middle of the back wall, square to it and seen straight on, the "
    "host seats, the large clear main subject: a pair of tall-backed lamp-hanger side chairs of chestnut-brown huanghuali wood with a square tea "
    "table and a tea set between them, before a long narrow side table with a vase of chrysanthemums, under a large horizontal painted panel of "
    "chrysanthemums and swallows; at the LEFT end of the back wall a lattice partition with the octagonal doorway onto an inner room; at the RIGHT "
    "end of the back wall a tall standing screen panel embroidered with willows; against the left side wall a writing desk with brushes and an "
    "inkstone; along the right window wall two stands with potted chrysanthemums and a small weiqi game table with two stools; hanging paper "
    "lanterns with tassels, a small incense burner. " + CARD_DH + pair1('soft green', '#7FB394') + "the sheer window curtains tied back, the "
    "curtain of the doorway, the lantern tassels, the seat cushions and the table runner, set off by the chestnut-brown wood. " + QN
    + " The only rank colour is soft green." + NOPE + P['NOSOFA'] + RECT + GUIDE_S + FR)
OUT['dien-huy-cung-dong-phoi'] = dict(prompt=room9(DH_DONG_REC, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M3])

# 21) Diên Huy TÂY phối bedroom — pair Quý nhân + Quý nhân (QQ): whole room soft blue #7E9CCB. TWO walls, windows LEFT (image 3 8aiwqQTIrU).
#     Own layout (owner L816 frontal, beds at both ends; centre used before: doorway 15, round panel + dressing table 17, shelf 1, vase door 8):
#     centre = a pair of tall compound wardrobes side by side; the octagonal doorway in the LEFT side wall's far end; along the left window wall a
#     small tea table with two stools. + CARD_DH + BEDH4 + BEDW + FG.
DH_TAY_NGU = ("Diên Huy cung Tây phối điện bedroom, the cosy bedchamber SHARED by two lower-ranking imperial consorts (two Quý nhân) living in "
    "the west side hall of a palace in ancient China, a real room in daily use, " + WL2 + ": wooden pillars, lattice windows in the LEFT side wall "
    "onto a sunny garden; against the back wall, square to it and seen straight on, TWO tall, WIDE, generous free-standing canopy frame beds of "
    "carved chestnut-brown huanghuali wood, one at the LEFT end and one at the RIGHT end of the back wall, each on its own low bed step with "
    "slippers, each bed whole in width inside the picture, together the large clear main subject; in the middle of the back wall between them a "
    "pair of tall compound wardrobes side by side (a small top cabinet on a tall cabinet) with brass fittings and a pot of chrysanthemums before "
    "them; at the far end of the left side wall a lattice partition with the octagonal doorway; along the left window wall a small tea table with "
    "two stools; hanging paper lanterns with tassels, a small embroidery basket. " + CARD_DH + pair1('soft blue', '#7E9CCB') + "the gauze "
    "curtains of BOTH beds, the window curtains, the curtain of the doorway, the lantern tassels, the bedding and cushions of BOTH beds and the "
    "stool cushions, set off by the chestnut-brown wood; the two beds look alike. " + QN + " Exactly two beds; the only rank colour is soft blue."
    + NOPE + RECT + GUIDE_S + BEDH4 + BEDW + FG)
OUT['dien-huy-cung-tay-phoi-ngu'] = dict(prompt=room9(DH_TAY_NGU, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M2X])

# 22) Diên Huy TÂY phối reception — QQ soft blue. THREE walls, windows RIGHT (image 3 cpS5YIl0eP). Own layout (≠ room 20 centred chairs): host
#     seats = a pair of lamp-hanger chairs + small tea table in the RIGHT two thirds of the back wall on a low wide platform before a large round
#     framed embroidered screen of chrysanthemums; the octagonal doorway at the LEFT end; left side wall = a long painting table with scrolls in a
#     jar; right windows = a tall flower stand with chrysanthemums + a low cabinet with a fish bowl. + CARD_DH + FR.
DH_TAY_REC = ("Diên Huy cung Tây phối điện reception room, the small sitting room where two lower-ranking imperial consorts (two Quý nhân) "
    "living in the west side hall of a palace in ancient China receive their guests, a real room in daily use, no bed anywhere, " + W3R + ": wooden "
    "pillars, lattice windows in the RIGHT side wall onto a sunny garden; against the back wall in its RIGHT two thirds, square to it and seen "
    "straight on, the host seats, the large clear main subject: a pair of tall-backed lamp-hanger side chairs of chestnut-brown huanghuali wood "
    "with a small tea table and a tea set between them, on a low wide platform, before a large round-framed standing screen embroidered with "
    "chrysanthemums and swallows; at the LEFT end of the back wall a lattice partition with the octagonal doorway onto an inner room; against the "
    "left side wall a long painting table with brushes and a porcelain jar of scrolls; along the right window wall a tall flower stand with "
    "potted chrysanthemums and a low cabinet with a blue-and-white fish bowl; hanging paper lanterns with tassels, a small incense burner. "
    + CARD_DH + pair1('soft blue', '#7E9CCB') + "the sheer window curtains tied back, the curtain of the doorway, the lantern tassels, the seat "
    "cushions and the table runner, set off by the chestnut-brown wood. " + QN + " The only rank colour is soft blue." + NOPE + P['NOSOFA']
    + RECT + GUIDE_S + FR)
OUT['dien-huy-cung-tay-phoi'] = dict(prompt=room9(DH_TAY_REC, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M3])

# PR16 R3 of room 10 (owner Lượt 835 via ROOT-60: r2 looked IDENTICAL to the old one → "vẽ lại … khác đi, đừng có chạy lại cái prompt này nữa":
#     a NEW prompt, not a rerun). Same occupants + colours (ĐT: curtains soft green, fabrics cream-ivory, pair_cols(2, 1)) + CARD_CT, but a
#     different picture: windows LEFT (old: right) with image 3 = M3X 1ldYySkr4r; beds at the LEFT and RIGHT ENDS of the back wall, frontal
#     (owner L816; old: side by side on one platform in the left two thirds; room 13 = side by side too); centre = a tall painted plum-blossom
#     folding screen with two low rose chairs + a small tea table before it; doorway in the RIGHT side wall; dressing table + stool on the
#     left window wall. + BEDH4 + BEDW (the r2 width sentence, now the shared BEDW) + FG.
CT_DONG_NGU_R3 = ("Chung Tú cung Đông phối điện bedroom, the cosy bedchamber SHARED by two lower-ranking imperial consorts (a Đáp ứng and a Thường tại) "
    "living in the east side hall of a palace in ancient China, a real room in daily use, " + WL3 + ": wooden pillars, lattice windows in the LEFT "
    "side wall onto a sunny garden; against the back wall, square to it and seen straight on, TWO tall, WIDE, generous free-standing canopy frame "
    "beds of carved dark red sandalwood, one at the LEFT end and one at the RIGHT end of the back wall, each on its own low bed step with slippers, "
    "each bed whole in width inside the picture, together the large clear main subject; in the middle of the back wall between them a tall "
    "folding screen painted with plum blossoms and magpies, and before it two low rose chairs with a small tea table; in the right side wall a "
    "cracked-ice lattice partition with its rounded doorway onto an inner room; along the left window wall a small dressing table with a bronze "
    "mirror and a stool; hanging paper lanterns with tassels, vases of plum blossoms, a small embroidery basket. " + CARD_CT + pair_cols(2, 1) + QN
    + " Exactly two beds; only the two colours soft green (curtains) and cream-ivory (fabrics)." + NOPE + RECT + GUIDE_S + BEDH4 + BEDW + FG)
OUT['chung-tu-cung-dong-phoi-ngu-r3'] = dict(prompt=room9(CT_DONG_NGU_R3, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M3X])

# PR17: Vĩnh Hòa style card (new; pattern of CARD_CP/KT/CT/HA/DH, none of these used by another palace): camellias; pairs of orioles on
# bamboo stems; warm reddish-brown jichimu wood with small carved boxwood inlays; southern official's-hat chairs; a gourd-shaped doorway in a
# lattice partition of overlapping lozenges.
CARD_VH = ("Vĩnh Hòa cung signature style, the same in every room of this palace: camellias (hoa trà) are its flower, painted on the screens, "
    "embroidered on the silks and in the pots; motifs of pairs of orioles on bamboo stems carved in the beams and furniture; warm reddish-brown "
    "jichimu wood with small carved boxwood inlays; southern official's-hat armchairs with a gently curved top rail that does not stick out; a "
    "gourd-shaped doorway in a lattice partition of overlapping lozenges. ")
# 24) Vĩnh Hòa ĐÔNG phối reception — pair Đáp ứng + Đáp ứng (ĐĐ, least used: 2× in rooms 1–22): whole room cream-ivory #EAE3D0. THREE walls,
#     windows RIGHT (image 3 cpS5YIl0eP; alternation 22 = 3w right, 23 = 2w left bedroom (HOLD L22), 24 = 3w right). Own layout (daybeds
#     9/14/16, dais 18, chairs centred 11/20, chairs right half 12/22, chairs left half on a platform 7, daybed left of centre 4): host seats =
#     a pair of official's-hat armchairs + square tea table in the LEFT third under a tall hanging scroll of camellias; the gourd doorway in
#     the CENTRE of the back wall; RIGHT third = a tall open curio shelf (duobao ge); left side wall = a guqin on a long low table; right
#     windows = a bamboo-root flower stand with camellias + a hanging birdcage. + CARD_VH + FR.
VH_DONG_REC = ("Vĩnh Hòa cung Đông phối điện reception room, the small sitting room where two lower-ranking imperial consorts (two Đáp ứng) "
    "living in the east side hall of a palace in ancient China receive their guests, a real room in daily use, no bed anywhere, " + W3R + ": wooden "
    "pillars, lattice windows in the RIGHT side wall onto a sunny garden; against the back wall in its LEFT third, square to it and seen straight "
    "on, the host seats, the large clear main subject: a pair of official's-hat armchairs of reddish-brown jichimu wood with a square tea table "
    "and a tea set between them, under a tall hanging scroll painted with camellias and orioles; in the CENTRE of the back wall a lattice "
    "partition of overlapping lozenges with the gourd-shaped doorway onto an inner room; in the RIGHT third of the back wall a tall open curio "
    "shelf with porcelain, books and small jade pieces; against the left side wall a guqin on a long low table; along the right window wall a "
    "bamboo-root flower stand with potted camellias and a small birdcage hanging by the window; hanging paper lanterns with tassels, a small "
    "incense burner. " + CARD_VH + pair1('cream-ivory', '#EAE3D0') + "the sheer window curtains tied back, the curtain of the doorway, the "
    "lantern tassels, the seat cushions and the table runner, set off by the reddish-brown wood. " + QN + " The only rank colour is cream-ivory."
    + NOPE + P['NOSOFA'] + RECT + GUIDE_S + FR)
OUT['vinh-hoa-cung-dong-phoi'] = dict(prompt=room9(VH_DONG_REC, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M3])

# ---- PR17: owner L22 + ROOT-61 01:12Z verbatim "Mẫu D và E ok, thay đổi qua lại": the two-bed LAYOUT TEMPLATES are D = room 3 Cảnh Phúc
#      đông bedroom Lw8MjWZswO (beds against the LEFT and RIGHT side walls, 3-wall, windows right) and E = room 5 Cảnh Phúc tây bedroom
#      u5WZqYHQLD (two alcove beds in a back-wall partition, 3-wall, windows left); every NEW two-bed room alternates D, E, D, E …; image 3 =
#      the template picture itself; palace card + colours stay per palace. TPL_D / TPL_E replace GUIDE_S in those rooms.
TPL_D = (" Image 3 is the owner's LAYOUT TEMPLATE for every two-bed room (owner L22): copy its wall layout, camera distance, floor amount, "
    "people scale AND its bed placement: one bed against the LEFT side wall and one against the RIGHT side wall, each square to its wall with its "
    "long side along the wall, the middle of the back wall between them; NOT its colours, carvings, flowers or small objects: this room keeps its "
    "own palace style and colours as written here.")
TD, TE = 'Lw8MjWZswO', 'u5WZqYHQLD'
# 23) Vĩnh Hòa ĐÔNG phối bedroom — template D; pair ĐĐ (same hall as room 24): whole room cream-ivory #EAE3D0. THREE walls, windows RIGHT
#     (as template D). Centre of the back wall = the Vĩnh Hòa gourd doorway in a lozenge lattice with a shared dressing table + two stools
#     before it (template D: moon gate + dressing table). + CARD_VH + BEDH4 + BEDW (owner L815/L823 bed size; room 3 was 'bed too small') + FG.
VH_DONG_NGU = ("Vĩnh Hòa cung Đông phối điện bedroom, the cosy bedchamber SHARED by two lower-ranking imperial consorts (two Đáp ứng) living in "
    "the east side hall of a palace in ancient China, a real room in daily use, " + W3R + ": wooden pillars, lattice windows in the RIGHT side "
    "wall onto a sunny garden; TWO tall, WIDE, generous free-standing canopy frame beds of carved reddish-brown jichimu wood, together the large "
    "clear main subject, one standing against the LEFT side wall and one against the RIGHT side wall, each square to its wall with its long side "
    "along the wall and its bed step with slippers facing the middle of the room, each bed whole inside the picture; in the middle of the back "
    "wall, seen straight on, a lattice partition of overlapping lozenges with the gourd-shaped doorway and, in front of it, a shared dressing "
    "table with a bronze mirror and two stools; beside each bed a small clothes rack with a robe; hanging paper lanterns with tassels, pots of "
    "camellias, a small embroidery basket. " + CARD_VH + pair1('cream-ivory', '#EAE3D0') + "the gauze curtains of BOTH beds, the window "
    "curtains, the curtain of the doorway, the lantern tassels, the bedding and cushions of BOTH beds and the stool cushions, set off by the "
    "reddish-brown wood; the two beds look alike. " + QN + " Exactly two beds; the only rank colour is cream-ivory." + NOPE + RECT + TPL_D
    + BEDH4 + BEDW + FG)
OUT['vinh-hoa-cung-dong-phoi-ngu'] = dict(prompt=room9(VH_DONG_NGU, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, TD])

# ---- PR17 batch 6 (ROOT-62 01:16Z): (a) template-E rooms keep the alcove beds of room 5 (owner L24 'Mẫu D và E ok' approves E as drawn):
#      BEDH4E = BEDH4 without its 'never beds set into a wall alcove' clause; the no-alcove clause stays for D rooms. (b) fixes asked by ROOT-62
#      for NEW rooms (owner faults on 22/23/24): TAGZONE (no props on the name-tag strip), BEDSHOW (D beds not hidden behind the women),
#      CAMELLIA (Vĩnh Hòa flowers read as peonies).
BEDH4E = BEDH + (" Each bed is clearly taller than the standing women: its carved canopy crown runs out of the top edge of the picture, like the "
    "walls and pillars; its gauze curtains hang from high up; the hanging lanterns hang only beside the beds, never in front of them; the two beds "
    "are alcove canopy beds built into the carved back-wall partition, exactly as in image 3.")
TPL_E = (" Image 3 is the owner's LAYOUT TEMPLATE for every two-bed room (owner L22, L24): copy its wall layout, camera distance, floor amount, "
    "people scale AND its bed placement: the back wall seen straight on is a carved partition holding TWO alcove canopy beds, one in its left part "
    "and one in its right part, with an opening in the middle between them; NOT its colours, carvings, flowers or small objects: this room keeps "
    "its own palace style and colours as written here.")
TAGZONE = (" NAME-TAG STRIP: the bottom eighth of the picture, across the whole width and in the bottom-left corner too, is bare floor only: no "
    "basket, box, stool, pot, incense burner, slippers or any other object stands there.")
BEDSHOW = (" Each bed stands deep along its side wall towards the back corner, so most of each bed shows beside the women standing in front, "
    "never hidden behind them.")
CAMELLIA = (" The camellias are true camellias: round flat flowers with neat overlapping petals around a small yellow centre, among glossy "
    "dark-green leaves, never peonies, never roses.")
CARD_TX = P['CARD_TX']
# 25) Vĩnh Hòa TÂY phối bedroom — TEMPLATE E (image 3 = room 5 u5WZqYHQLD): 3-wall, windows LEFT; the back wall = a carved jichimu partition
#     holding two alcove beds, a gourd doorway between them. Pair ĐT (all pairs used 4×; ĐT split): curtains cream-ivory, fabrics soft green.
VH_TAY_NGU = ("Vĩnh Hòa cung Tây phối điện bedroom, the cosy bedchamber SHARED by two lower-ranking imperial consorts (a Đáp ứng and a Thường tại) "
    "living in the west side hall of a palace in ancient China, a real room in daily use, " + WL3 + ": wooden pillars, lattice windows in the LEFT "
    "side wall onto a sunny garden; the back wall, seen straight on, is a carved reddish-brown jichimu partition holding TWO tall, WIDE alcove canopy "
    "beds (alcove fronts carved with orioles on bamboo, with gauze curtains), one in its left part and one in its right part, both square to the back "
    "wall and whole inside the picture, together the large clear main subject; between the two beds, in the middle of the back wall, the "
    "gourd-shaped doorway in a lattice of overlapping lozenges onto a small inner dressing room; in front of each bed a low bed step with slippers; "
    "along the left window wall a small dressing table with a bronze mirror and a stool; against the right wall a clothes rack with a robe and a "
    "small cabinet; hanging paper lanterns with tassels, pots of camellias. " + CARD_VH + pair_cols(1, 2) + QN + " Exactly two beds; only the two "
    "colours cream-ivory (curtains) and soft green (fabrics)." + CAMELLIA + NOPE + RECT + TPL_E + BEDH4E + BEDW + FG + TAGZONE)
OUT['vinh-hoa-cung-tay-phoi-ngu'] = dict(prompt=room9(VH_TAY_NGU, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, TE])
# 26) Vĩnh Hòa TÂY phối reception — ĐT as room 25 (curtains cream-ivory, fabrics soft green). TWO walls, windows LEFT (M2X; receptions
#     alternate 24 = 3w right → 26 = 2w left). Own layout (study corner never used): LEFT half of the back wall = a tall bookcase wall with a
#     writing desk + one armchair before it; RIGHT half = host pair of official's-hat chairs + tea table before a carved camellia relief panel;
#     gourd doorway at the RIGHT end. + CARD_VH + CAMELLIA + FR + TAGZONE.
VH_TAY_REC = ("Vĩnh Hòa cung Tây phối điện reception room, the small sitting room where two lower-ranking imperial consorts (a Đáp ứng and a "
    "Thường tại) living in the west side hall of a palace in ancient China receive their guests, a real room in daily use, no bed anywhere, " + WL2
    + ": wooden pillars, lattice windows in the LEFT side wall onto a sunny garden; against the back wall, square to it and seen straight on: in "
    "its RIGHT half the host seats, the large clear main subject, a pair of official's-hat armchairs of reddish-brown jichimu wood with a small tea "
    "table and a tea set between them, before a large carved and painted wall panel of camellias and orioles; in its LEFT half a tall bookcase "
    "of books, scroll boxes and porcelain with a writing desk and one armchair before it; at the RIGHT end of the back wall a lattice partition of "
    "overlapping lozenges with the gourd-shaped doorway onto an inner room; along the left window wall a flower stand with potted camellias; "
    "hanging paper lanterns with tassels. " + CARD_VH + pair_cols(1, 2).replace('the gauze curtains of BOTH beds, ', '').replace(
    'the bedding and cushions of BOTH beds, ', '').replace('; the two beds look alike in colour, never one bed cream-ivory and the other soft green', '')
    + QN + " Only the two colours cream-ivory (curtains) and soft green (fabrics)." + CAMELLIA + NOPE + P['NOSOFA'] + RECT + GUIDE_S + FR + TAGZONE)
OUT['vinh-hoa-cung-tay-phoi'] = dict(prompt=room9(VH_TAY_REC, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M2X])
# 27) Trường Xuân ĐÔNG phối bedroom — TEMPLATE D (Lw8MjWZswO): 3-wall, windows RIGHT, beds against the LEFT and RIGHT side walls; centre = the
#     TX tall vase-shaped doorway in an openwork partition + shared dressing table + two stools. Pair TQ: curtains soft green, fabrics soft blue.
TX_DONG_NGU = ("Trường Xuân cung Đông phối điện bedroom, the cosy bedchamber SHARED by two lower-ranking imperial consorts (a Thường tại and a "
    "Quý nhân) living in the east side hall of a palace in ancient China, a real room in daily use, " + W3R + ": wooden pillars, lattice windows in "
    "the RIGHT side wall onto a sunny garden; TWO tall, WIDE, generous free-standing canopy frame beds of carved dark zitan wood, together the large "
    "clear main subject, one standing against the LEFT side wall and one against the RIGHT side wall, each square to its wall with its long side "
    "along the wall and its bed step facing the middle of the room, each bed whole inside the picture; in the middle of the back wall, seen "
    "straight on, a carved openwork partition with the tall vase-shaped doorway and, in front of it, a shared dressing table with a bronze mirror "
    "and two stools; beside each bed a small clothes rack with a robe; hanging paper lanterns with tassels, vases of white magnolias. " + CARD_TX
    + pair_cols(2, 3) + QN + " Exactly two beds; only the two colours soft green (curtains) and soft blue (fabrics)." + NOPE + RECT + TPL_D
    + BEDH4 + BEDW + BEDSHOW + FG + TAGZONE)
OUT['truong-xuan-cung-dong-phoi-ngu'] = dict(prompt=room9(TX_DONG_NGU, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, TD])
# 28) Trường Xuân ĐÔNG phối reception — TQ as room 27. THREE walls, windows RIGHT (M3). Own layout: host seats = square-backed zitan armchair
#     pair + tea table in the LEFT half before a kingfisher-feather inlaid screen; vase doorway at the RIGHT end; centre-right = a long
#     side table with a magnolia vase under a scroll; left wall = curio cabinet. + CARD_TX + FR + TAGZONE.
TX_DONG_REC = ("Trường Xuân cung Đông phối điện reception room, the small sitting room where two lower-ranking imperial consorts (a Thường tại and "
    "a Quý nhân) living in the east side hall of a palace in ancient China receive their guests, a real room in daily use, no bed anywhere, " + W3R
    + ": wooden pillars, lattice windows in the RIGHT side wall onto a sunny garden; against the back wall in its LEFT half, square to it and seen "
    "straight on, the host seats, the large clear main subject: a pair of square-backed zitan armchairs with a square tea table and a tea set "
    "between them, before a standing screen with kingfisher-blue feather inlay of magnolias; right of the middle of the back wall a long narrow "
    "side table with a vase of white magnolias under a hanging scroll; at the RIGHT end of the back wall a carved openwork partition with the tall "
    "vase-shaped doorway onto an inner room; against the left side wall a tall curio cabinet with porcelain; along the right window wall a small "
    "flower stand; hanging paper lanterns with tassels. " + CARD_TX + pair_cols(2, 3).replace('the gauze curtains of BOTH beds, ', '').replace(
    'the bedding and cushions of BOTH beds, ', '').replace('; the two beds look alike in colour, never one bed soft green and the other soft blue', '')
    + QN + " Only the two colours soft green (curtains) and soft blue (fabrics)." + NOPE + P['NOSOFA'] + RECT + GUIDE_S + FR + TAGZONE)
OUT['truong-xuan-cung-dong-phoi'] = dict(prompt=room9(TX_DONG_REC, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, M3])
# 29) Trường Xuân TÂY phối bedroom — TEMPLATE E (u5WZqYHQLD): 3-wall, windows LEFT; back wall = carved zitan partition holding two alcove beds,
#     the vase-shaped doorway between them. Pair ĐQ: curtains soft blue, fabrics cream-ivory.
TX_TAY_NGU = ("Trường Xuân cung Tây phối điện bedroom, the cosy bedchamber SHARED by two lower-ranking imperial consorts (a Đáp ứng and a Quý nhân) "
    "living in the west side hall of a palace in ancient China, a real room in daily use, " + WL3 + ": wooden pillars, lattice windows in the LEFT "
    "side wall onto a sunny garden; the back wall, seen straight on, is a carved dark zitan openwork partition holding TWO tall, WIDE alcove canopy "
    "beds (alcove fronts carved with the endless swastika fret, with gauze curtains), one in its left part and one in its right part, both square "
    "to the back wall and whole inside the picture, together the large clear main subject; between the two beds, in the middle of the back wall, "
    "the tall vase-shaped doorway onto a small inner dressing room; in front of each bed a low bed step with slippers; along the left window wall a "
    "small dressing table with a bronze mirror and a stool; against the right wall a clothes rack with a robe and a small cabinet; hanging paper "
    "lanterns with tassels, vases of white magnolias. " + CARD_TX + pair_cols(3, 1) + QN + " Exactly two beds; only the two colours soft blue "
    "(curtains) and cream-ivory (fabrics)." + NOPE + RECT + TPL_E + BEDH4E + BEDW + FG + TAGZONE)
OUT['truong-xuan-cung-tay-phoi-ngu'] = dict(prompt=room9(TX_TAY_NGU, GUIDE, 'warm polished wooden floorboards'), refs=[*G9, TE])

# GATE (as v9): common block present, method refs, no drift words, no phoenix/yellow below t7.
for k, v in OUT.items():
    p = v['prompt']
    assert p.startswith(P['C9_STYLE']) and P['C9_CAM'].split('{IMG3}')[0] in p and P['C9_END'].split('{FLOOR}')[1] in p, k
    assert v['refs'][:2] == list(G9) and len(v['refs']) == 3, k
    for w in ('everywhere', 'BRIGHT', 'coffered', 'high ceiling', 'floor-to-ceiling', 'apricot', 'ruby', '{', 'transparent'):
        assert w not in p, (k, w)
import sys; sys.path.insert(0, D); import room_gate  # A24 ROOM GATE (MG4): FAIL = exit 1 before the JSON is written = no gen
room_gate.guard(OUT, 'pr13')
json.dump(OUT, open(os.path.join(D, 'prompts_pr13.json'), 'w'), ensure_ascii=False, indent=1)
print({k: len(v['prompt']) for k, v in OUT.items()})

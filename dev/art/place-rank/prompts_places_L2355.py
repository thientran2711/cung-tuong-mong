# PLACES1 (owner L2355 22/11 via Foreman C ROOT-C2): redraw ALL game places + Từ Ninh bedroom/reception, ONE base hạ-sáng each, codes M2355-01..17.
# Owner words: L800 all live place pictures dropped + redrawn; L2293 keep the OLD in-game style; L2296 we draw on Magnific; L2300/L2306 do them
#   all, send every 5; L2303 furniture against the walls; L2319 best floor = M2300-05 / M2300-03; L2323/L14 frontal only.
# Recipe = the M2300 room prompts EXACTLY (prompts_roompf1_M2300.json, no re-build): the common head (style + COLOUR LEVEL 'rất nhẹ' + 'Wide
#   panoramic view, summer morning.') and the common tail (ROOM SHAPE … FLOOR AMOUNT 5/6 … CAMERA CLOSE … NAME-TAG … scale … FLOOR … LIGHT … no
#   text) are copied unchanged from M2300-03 (bed-type places) / M2300-02 (all others). ONLY the middle (ROOM sentence + palace card + RANK
#   COLOUR + TONE + rank lux + no-phoenix/no-yellow line) is replaced by a per-place ROOM part, because these places have no consort rank:
#   no rank colour, no tone strip (so image 4 dropped from refs). Bed-type places keep the BED (L804/815) sentence. Each place keeps the
#   function + key props of its live old picture (looked at 22/11: img/<place>-ha-sang.webp).
# Outdoor places (Lãnh cung, Tân giả khố, Ngự hoa viên): the same tail with 4 marked word swaps (room->courtyard/garden ground, no-ceiling line
#   -> eaves/branches line, wooden floor -> grey brick paving / garden path) — listed in OUTDOOR below, nothing else changed.
# Thái hậu (Từ Ninh): B22 deep antique-gold royal yellow #CE9C48 (not #EFBD69); she is named 'Thái hậu (the emperor's mother)'.
import os, sys, json
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, D)
ROOT = os.path.abspath(os.path.join(D, '..', '..', '..'))
OUTD = os.path.join(ROOT, 'dev', 'handover', 'prompts_L2095')
J = json.load(open(os.path.join(D, 'prompts_roompf1_M2300.json')))
BASEB = J['vinh-hoa-cung-phi-ngu']; BASER = J['dien-huy-cung-phi']
assert BASEB['code'] == 'M2300-03' and BASER['code'] == 'M2300-02'
G9 = ['gOmYI7iSXO', 'EbYJzsMuuO']
GUIDE = {(3, 'RIGHT'): 'cpS5YIl0eP', (3, 'LEFT'): '1ldYySkr4r', (2, 'RIGHT'): '4RFIyNR9Aa', (2, 'LEFT'): '8aiwqQTIrU'}
CUT = 'ROOM SHAPE (owner Lượt 491)'

def parts(p):
    i = p.index(' ROOM: ') + len(' ROOM: '); j = p.index(CUT)
    return p[:i], p[i:j], p[j:]
HEADB, MIDB, TAILB = parts(BASEB['prompt']); HEADR, MIDR, TAILR = parts(BASER['prompt'])
BED1 = MIDB[MIDB.index(' BED (owner Lượt 804, 815)'):]; BED1 = BED1[:BED1.index('never a slim narrow bed.') + len('never a slim narrow bed.')]
NOSOFA = ' No Western sofa, no upholstered couch. '
OUTDOOR = [  # (old, new) word swaps in the tail for open-air places
    ('the room reads rectilinear with square corners, straight walls and straight beams, never a curved hall',
     'the courtyard reads rectilinear with square corners, straight walls, straight eaves and straight paths, never a curved hall'),
    ('no ceiling in the picture: the walls, pillars and hanging lanterns run out of the top edge',
     'little sky in the picture: the roof eaves and tree branches run out of the top edge'),
    ('the floor of the room simply continues to the bottom edge', 'the ground simply continues to the bottom edge'),
    ('FLOOR: warm polished wooden floorboards, no large rug or carpet covering it.', '{GROUND}'),
]

def walls(n, side):
    if n == 3:
        return ("seen with THREE walls: the back wall straight across the middle of the picture and the left and right side walls running towards "
                "the viewer in clear perspective, meeting it at square corners, like the wall layout of image 3")
    return (f"seen with TWO walls only: the back wall straight across the picture and the {side} side wall running towards the viewer in clear "
            f"perspective, meeting at a square corner, like the wall layout of image 3")

def court(n, side):
    return (f"seen straight on like a stage set: the front of a building straight across the back of the picture and the {side} side wall of the "
            f"courtyard running towards the viewer in clear perspective, meeting it at a square corner, like the wall layout of image 3")

TH = "deep antique-gold royal yellow like #CE9C48"
# key: (code no, name, kind, nw, side, head noun, ROOM text, ground)  kind: bed / rec / out
P = [
 # ---- B1
 ('duong-tam-dien', 'Dưỡng Tâm điện', 'rec', 3, 'RIGHT', 'richly furnished hall',
  "Dưỡng Tâm điện, the hall where the emperor of ancient China sits to read memorials and receive his ministers, a real hall in daily use, no "
  "bed anywhere, {W}: tall red lacquered pillars with gilt dragons coiling up them, lattice windows in both side walls onto a sunny garden; "
  "against the middle of the back wall, square to it and seen straight on, the large clear main subject: a low carved platform of three steps "
  "with a gilt carved dragon throne with royal yellow like #EFBD69 silk cushions, a long low gilt desk before it with brushes, an ink stone and "
  "stacks of memorials, and behind it a tall gilt folding screen carved with dragons among clouds; on each side of the platform a pair of "
  "bronze cranes and tall bronze incense burners on low stands, along the side walls, square to them, tall cabinets of scrolls and a pair of "
  "cloisonné vases, hanging palace lanterns with yellow tassels. The emperor's own colours: royal yellow like #EFBD69, vermilion red and "
  "gold, with blue-and-green painted beams; majestic, rich and orderly.", None),
 ('ngu-thu-phong', 'Ngự thư phòng', 'rec', 2, 'LEFT', 'richly furnished study',
  "Ngự thư phòng, the emperor's private study in ancient China, where he reads and writes, a real room in daily use, no bed anywhere, {W}: "
  "red pillars, lattice windows in the LEFT side wall onto a sunny garden with a blue-and-white vase of white magnolias before them; against "
  "the back wall in its RIGHT half, square to it and seen straight on, the large clear main subject: a long carved rosewood writing desk with "
  "a royal yellow like #EFBD69 silk desk runner embroidered with a dragon, brushes on a brush rack, an ink stone, rolled scrolls and a small "
  "jade seal, and a carved armchair with a royal yellow cushion behind it; above it on the back wall a large painted landscape scroll of "
  "blue-green mountains; in the LEFT half of the back wall tall bookcases full of blue-bound books and boxed scrolls, square to the wall; a tall "
  "porcelain jar of rolled scrolls, a small side table with a tea set, a bronze incense burner, hanging palace lanterns with tassels. Scholarly, "
  "rich and calm: dark rosewood, royal yellow, deep blue and red.", None),
 ('thai-y-vien', 'Thái y viện', 'rec', 2, 'RIGHT', 'busy, well-stocked room',
  "Thái y viện, the hall of the imperial physicians in an ancient Chinese palace, where medicines are weighed and brewed, a real room in "
  "daily use, no bed anywhere, {W}: red pillars, lattice windows in the RIGHT side wall onto a sunny garden; against the back wall in its "
  "LEFT half, square to it and seen straight on, the large clear main subject: a huge wooden medicine cabinet of many small square drawers with "
  "brass pulls, wide and tall, and before it a long work table with a brass hand scale, a bronze mortar and pestle, open paper packets of "
  "herbs, ginseng roots and a book of prescriptions; in the RIGHT half of the back wall a small clay stove with a simmering medicine pot and a "
  "fan, and shelves of blue-and-white herb jars; bunches of dried herbs, red chillies and gourds hanging from a beam along the back wall; "
  "round bamboo trays of drying herbs on a low bench against the window wall, large lidded blue-and-white jars at the foot of the cabinet, "
  "hanging paper lanterns with tassels. Warm brown wood, blue-and-white porcelain, herb greens and touches of red; tidy and full.", None),
 ('lanh-cung', 'Lãnh cung', 'out', 2, 'LEFT', 'neglected, forgotten courtyard',
  "Lãnh cung, the cold palace of an ancient Chinese imperial palace where disgraced consorts are shut away, a plain, poor and neglected "
  "place, no bed anywhere, {C}: against the back, square to it and seen straight on, the large clear main subject: an old single-storey hall with faded, "
  "peeling red pillars, grey tiled eaves, dusty lattice doors with torn paper panes, one door half open onto a dim bare room, and three worn "
  "grey brick steps up to it; along the LEFT side, the high plain courtyard wall with cracked, faded plaster and moss; an old gnarled tree "
  "with summer leaves at the right of the hall, weeds growing between the paving and at the foot of the walls, a cracked water vat and a "
  "broken stool against the hall front. Poor and plain: no lanterns, no flowers in pots, no rich furniture, faded red, grey and moss green, "
  "quiet and lonely but still clear and painterly in the morning light.",
  "GROUND: old uneven grey brick paving with moss in the cracks, no rug or carpet."),
 ('nvp', 'Nội vụ phủ', 'rec', 2, 'LEFT', 'busy, well-stocked storehouse office',
  "Nội vụ phủ, the imperial household office of an ancient Chinese palace that keeps and hands out the palace's silks, porcelain and "
  "supplies, a real room in daily use, no bed anywhere, {W}: red pillars, lattice windows in the LEFT side wall onto a sunny garden; against "
  "the back wall, square to it and seen straight on, the large clear main subject: tall wooden shelves across the whole back wall, full of "
  "folded bolts of coloured silk and brocade, rolls of satin, stacked porcelain bowls and vases and lacquer boxes; before the RIGHT half of "
  "the shelves a long carved counter desk with an open ledger, an abacus, brushes and an ink stone; a glass-fronted curio cabinet of jade and "
  "porcelain samples against the back wall at the right, a pair of large blue-and-white vases, a few closed wooden chests along the window "
  "wall, hanging paper lanterns with tassels. Warm red-brown wood with many colourful silks; orderly, rich and busy.", None),
 # ---- B2
 ('kinh-su-phong', 'Kính sự phòng', 'rec', 3, 'LEFT', 'well-kept office',
  "Kính sự phòng, the office of the eunuchs who keep the records of the emperor's nights in an ancient Chinese palace, a real room in daily "
  "use, no bed anywhere, {W}: red pillars, lattice windows in both side walls onto a sunny garden; against the middle of the back wall, "
  "square to it and seen straight on, the large clear main subject: a tall wide wooden rack of many shelves holding rows of small green jade "
  "name tablets standing upright like little plaques, each with a green top, with a tall cabinet of record drawers beside it; before it a "
  "long carved desk with a silver tray of green tablets, an open record book, brushes and an ink stone, and a carved armchair; a small "
  "altar table with an incense burner and a vase of lotus flowers against the left side wall, a pair of blue-and-white vases, a red lacquer "
  "chest, hanging red palace lanterns with tassels. Red lacquer, dark wood and jade green; neat and official. The tablets carry no writing.",
  None),
 ('tam-cung-dem', 'Tẩm cung', 'bed', 3, 'RIGHT', 'richly furnished bedchamber',
  "Tẩm cung, the emperor's own bedchamber in an ancient Chinese palace where a consort is called to spend the night, a real room in daily "
  "use, {W}: red pillars, lattice windows in the RIGHT side wall onto a sunny garden; against the middle of the back wall, square to it and "
  "seen straight on, ONE canopy bed, the large clear main subject: a very wide canopy bed of carved red sandalwood with gilt carving, its "
  "sheer white gauze curtains tied back with red tassels, red and gold silk brocade bedding embroidered with peonies and a royal yellow like "
  "#EFBD69 silk bolster; a folding screen painted with flowers against the left wall, a dressing table with a round bronze mirror and a round "
  "stool against the right window wall, square to it, tall red silk lanterns hanging on each side of the bed, a pair of tall candle stands "
  "with red candles, vases of lotus flowers on slim stands. Red, gold and white gauze; intimate, rich and romantic.", None),
 ('thuong-thu-phong', 'Thượng thư phòng', 'rec', 2, 'RIGHT', 'well-kept schoolroom',
  "Thượng thư phòng, the imperial schoolroom of an ancient Chinese palace where the princes study with their tutors, a real room in daily "
  "use, no bed anywhere, {W}: red pillars, lattice windows in the RIGHT side wall onto a sunny garden; against the back wall in its RIGHT "
  "half, square to it and seen straight on, the large clear main subject: the tutor's carved desk on a low wooden dais with brushes, an ink "
  "stone and stacked books, a carved armchair behind it and a plain hanging scroll on the wall above; in the LEFT half of the back wall tall "
  "bookcases full of thread-bound books and boxed scrolls, square to the wall; three small low students' desks with brushes and paper in a "
  "straight row in front of the dais, each with a flat silk floor cushion, set square to the back wall; a blue-and-white vase of lotus "
  "leaves, a brush pot, hanging paper lanterns with tassels. Warm wood, deep blue books and cream paper; orderly, calm and scholarly.", None),
 ('phong-cung-nu', 'Phòng cung nữ', 'bed', 2, 'RIGHT', 'plain, tidy room',
  "Phòng cung nữ, the plain shared sleeping room of the palace maids in an ancient Chinese palace, a real room in daily use, {W}: pillars, "
  "plain lattice windows in the RIGHT side wall onto a sunny garden; against the back wall, square to it and seen straight on, the large clear "
  "main subject: a long, low shared canopy bed: a wooden sleeping platform across most of the back wall under a simple wooden canopy frame with plain gauze curtains tied back, with neatly folded quilts in soft pink, green and cream "
  "cotton and small pillows lined up on it; a tall plain wooden wardrobe with brass fittings against the back wall at the left; a small "
  "dressing table with a round mirror and a stool against the window wall, square to it; a wooden washstand with a basin, a small plum "
  "blossom scroll on the wall, a single hanging paper lantern. Simple warm wood and soft cotton colours; humble but clean and pretty, no rich "
  "treasures, no gilt.", None),
 ('cung-nhan', 'Cung nhân', 'bed', 3, 'LEFT', 'plain, tidy room',
  "the room of the cung nhân, the junior palace women of an ancient Chinese palace, a plain shared sleeping room in daily use, {W}: pillars, "
  "plain lattice windows in both side walls onto a sunny garden, an open doorway in the middle of the back wall onto a green courtyard; "
  "against the back wall on each side of the doorway, square to it and seen straight on, the large clear main subject: two simple single "
  "wooden canopy beds with soft pink and pale blue cotton quilts and thin gauze curtains tied back, each with a small wooden chest at its foot; a "
  "clothes rack with a few pale robes against the left wall, a plain wooden cabinet and a small dressing table with a round mirror and a "
  "stool against the right wall, square to it, a vase of lotus on a small stand, a single hanging paper lantern. Soft pink, cream and warm "
  "wood; humble but clean and pretty, no rich treasures, no gilt.", None),
 # ---- B3
 ('tan-gia-kho', 'Tân giả khố', 'out', 2, 'RIGHT', 'busy work courtyard',
  "Tân giả khố, the laundry and labour courtyard of an ancient Chinese palace where servants wash, dry and mend the palace linen, a real "
  "place in daily use, {C}: against the back, square to it and seen straight on, the large clear main subject: a long plain wooden gallery "
  "with grey tiled eaves and open bays, with long bamboo poles across them hung with drying white sheets, pale robes and cloths; under it "
  "wooden washtubs, washboards, baskets of linen and a low wooden bench; along the RIGHT side, a plain grey wall with shelves of folded "
  "linen and baskets under a small roof; an old water well with a wooden bucket near the back left, a big wooden tub of water, a tree with "
  "green summer leaves over the wall. Plain and humble: grey, white linen, warm wood and green; hard-working but clean, no lanterns, no rich "
  "furniture, no bed anywhere.",
  "GROUND: plain grey brick paving, clean and evenly lit, no rug or carpet."),
 ('a-ca-so', 'A ca sở', 'bed', 2, 'LEFT', 'cheerful, well-furnished room',
  "A ca sở, the quarters of the young princes in an ancient Chinese palace where a boy prince lives, sleeps, studies and plays, a real "
  "room in daily use, {W}: pillars, lattice windows in the LEFT side wall onto a sunny garden with light blue gauze curtains; against the "
  "back wall in its RIGHT half, square to it and seen straight on, the large clear main subject: ONE canopy bed: a carved wooden canopy bed for the boy, its light blue gauze curtains tied back, with "
  "light blue and green silk bedding and a bolster; in the LEFT half of the back wall a bookcase of books and scrolls and a folding screen "
  "painted with wisteria; a low study desk with brushes and books and a floor cushion against the window wall, square to it; a small bow and "
  "a quiver of arrows on a wall rack, a wooden toy horse on wheels, a kite, a hanging paper lantern with blue tassels. Light blue, green and "
  "warm wood; lively and young, never girlish.", None),
 ('dong-cung', 'Đông cung', 'rec', 3, 'RIGHT', 'richly furnished hall',
  "Đông cung, the hall of the crown prince in an ancient Chinese palace where he studies and receives visitors, a real room in daily use, "
  "no bed anywhere, {W}: red pillars, lattice windows in both side walls onto a sunny garden with royal yellow like #EFBD69 silk curtains "
  "tied back; against the middle of the back wall, square to it and seen straight on, the large clear main subject: a long carved writing "
  "desk on a low dais with brushes, an ink stone and scrolls, a carved armchair with a royal yellow cushion, before a folding screen painted "
  "with blue-green mountains; a carved luohan daybed with royal yellow cushions against the left wall, square to it; tall bookcases of books "
  "and scrolls and a framed map against the right wall, square to it; a pair of blue-and-white vases, a bronze incense burner, a sword on a "
  "stand, hanging palace lanterns with tassels. Royal yellow, dark wood, deep blue; noble, young and orderly.", None),
 ('phi-tan-cung', 'Phi tần cung', 'rec', 2, 'RIGHT', 'richly furnished room',
  "the consorts' palace (phi tần cung), the private sitting and dressing room of an imperial consort in an ancient Chinese palace, a real room in daily use, no bed "
  "anywhere, {W}: pillars, lattice windows in the RIGHT side wall onto a sunny garden with pale green gauze curtains; in the middle of the "
  "back wall a round moon-gate doorway in a carved lattice partition onto an inner room; against the back wall in its RIGHT half, square to "
  "it and seen straight on, the large clear main subject: a carved luohan daybed with pale jade-green and cream silk cushions embroidered "
  "with lotus and a small low kang table with a tea set; in the LEFT half of the back wall a carved dressing table with a tall oval bronze "
  "mirror, jewellery boxes, combs and a round stool; vases of lotus flowers on slim stands, a bronze incense burner on a side table, hanging "
  "paper lanterns with tassels. Pale jade green, cream, soft pink and warm wood; elegant, feminine and gentle.", None),
 ('ngu-hoa-vien', 'Ngự hoa viên', 'out', 2, 'LEFT', 'beautiful imperial garden',
  "Ngự hoa viên, the imperial flower garden of an ancient Chinese palace, a real garden in daily use, {C}: across the back, square to the "
  "picture and seen straight on, the large clear main subject: a calm lotus pond with pink lotus flowers and an open pavilion with red "
  "pillars and a golden-yellow glazed tiled roof standing over the water, a white marble balustrade along the near edge of the pond and a "
  "small arched bridge; along the LEFT side, a red garden wall with a covered walkway and a weeping willow; raised white marble flower beds "
  "of pink, red and white peonies along the back and the sides, a tall grey scholar's rock, distant palace roofs beyond the trees. Fresh "
  "greens, pink and red peonies, white marble and red; bright, airy and lovely; no bed anywhere.",
  "GROUND: a wide, clean garden path of pale grey paving bricks, evenly lit, no rug or carpet."),
 # ---- B4 (Từ Ninh, Thái hậu: B22 #CE9C48)
 ('tu-ninh-cung-ngu', 'Từ Ninh cung (phòng ngủ)', 'bed', 3, 'LEFT', 'richly furnished room',
  "Từ Ninh cung bedroom, the private bedchamber of the Thái hậu (the emperor's mother, the highest lady of the palace) in an ancient Chinese "
  "palace, a real room in daily use, {W}: red pillars, lattice windows in both side walls onto a sunny garden; against the middle of the "
  "back wall, square to it and seen straight on, ONE canopy bed, the large clear main subject: a very wide canopy bed of carved dark zitan "
  "wood with rich gilt carving of peonies and cranes among pines, its heavy silk brocade curtains tied back and silk bedding in " + TH +
  " with deep plum-red and old-gold trims; a carved zitan dressing table with a bronze mirror and a gilt jewellery cabinet against the right "
  "window wall, square to it; a small Buddhist shrine with a gilt Buddha, a string of prayer beads and an incense burner on a carved altar "
  "table against the left wall, square to it; cloisonné vases of peonies, a curio shelf of jade and porcelain treasures, hanging palace "
  "lanterns with gold tassels. Deep antique-gold royal yellow, deep plum-red, dark zitan and old gold: the richest room of the palace, above "
  "an Empress's in luxury, dignified, calm and elder in taste, never girlish, no pink.", None),
 ('tu-ninh-cung', 'Từ Ninh cung (phòng khách)', 'rec', 3, 'RIGHT', 'richly furnished hall',
  "Từ Ninh cung reception hall, the hall where the Thái hậu (the emperor's mother, the highest lady of the palace) receives the consorts "
  "who come to pay their respects, a real hall in daily use, no bed anywhere, {W}: red pillars, lattice windows in both side walls onto a "
  "sunny garden; against the middle of the back wall, square to it and seen straight on, the large clear main subject: a low carved dais "
  "with a wide carved dark zitan throne-like daybed with rich gilt carving, cushions in " + TH + " embroidered with peonies and cranes and a "
  "small low table with a tea set, before a tall gilt folding screen carved with pines and cranes; at the left side wall, square to it, a "
  "small Buddhist shrine with a gilt Buddha, lotus flowers and an incense burner on a carved altar table; along the right side wall, square "
  "to it, a row of carved zitan armchairs with plum-red cushions and small tea tables for the visiting consorts; cloisonné vases, a bronze "
  "incense burner with a curl of smoke, hanging palace lanterns with gold tassels. Deep antique-gold royal yellow, deep plum-red, dark zitan "
  "and old gold: richer than an Empress's hall, dignified, calm and elder in taste, never girlish, no pink.", None),
]
assert len(P) == 17
OUT = {}
for n, (key, vn, kind, nw, side, noun, room, ground) in enumerate(P, 1):
    head, tail = (HEADB, TAILB) if kind == 'bed' else (HEADR, TAILR)
    head = head.replace('richly furnished room', noun) if kind != 'out' else head.replace('lived-in, richly furnished room', 'lived-in, ' + noun).replace(
        'natural, lived-in', 'natural, lived-in')
    assert noun in head, key
    if kind == 'out':
        for a, b in OUTDOOR:
            assert tail.count(a) == 1, (key, a); tail = tail.replace(a, b.replace('{GROUND}', ground))
        mid = room.replace('{C}', court(nw, side))
    else:
        mid = room.replace('{W}', walls(nw, side))
    if 'ONE canopy bed' in mid: mid += BED1
    p = head + mid + NOSOFA + tail
    assert '{' not in p and 'image 4' not in p and 'RANK COLOUR' not in p and 'stone' not in p.replace('ink stone', ''), key
    OUT[key] = dict(prompt=p, code=f'M2355-{n:02d}', name=vn, kind=kind, refs=[*G9, GUIDE[(nw, side)]],
                    base=f"dev/handover/prompts_L2095/{'M2300-03_vinh-hoa-cung-phi-ngu' if kind == 'bed' else 'M2300-02_dien-huy-cung-phi'}_ha_sang.txt",
                    layout=f"{nw}w windows {side} {kind}")
import room_gate; room_gate.guard({k: v['prompt'] for k, v in OUT.items()}, 'places-M2355')
json.dump(OUT, open(os.path.join(D, 'prompts_places_L2355.json'), 'w'), ensure_ascii=False, indent=1)
CAP = '\n\nCAPTION: write ONLY this code, small, bold, in the top-left corner, the only text in the picture: "{}"\n'
for k, v in OUT.items():
    open(os.path.join(OUTD, f"{v['code']}_{k}_ha_sang.txt"), 'w').write(v['prompt'] + CAP.format(v['code']))
print(len(OUT), {v['code']: (k, len(v['prompt'])) for k, v in OUT.items()}, 'ROOM GATE PASS')

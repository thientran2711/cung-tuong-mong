# PLACES2 (owner L2370 22/11 via ROOT-C3): white-light CAUSE fix for the whole place group + 4 redraws M2370-01..04.
# Base = prompts_places_L2355.json (PLACES1, M2355-NN). Nothing else in the M2355 prompts is touched (A17/A18).
# CAUSE (job 1, measured): light sentence, refs (G9 + wall guide), model, settings and grade are IDENTICAL in all 17 places; only the ROOM
#   part differs. The prompt never names a wall colour, and the head says 'painted exactly like image 1 ... same natural light' (image 1 =
#   a warm pink-red bedroom, R-B 31; wall guide image 3 R-B 44, pink sunlit floor). So the model takes the wall/plaster tone and the haze from
#   the object palette + image 1: A ca sở's 'deep blue, ink grey, bronze' -> white-grey walls = clean white light; every other room's
#   'warm wood, pink, cream, gilt' -> cream/beige walls + peach floor glow = yellow light. The blue phối rooms (pr13) are yellow because their
#   own prompt asked 'same natural warm light' + 'soft warm morning daylight' twice.
# FIX (WHITE, every place): (1) head 'same natural light' -> takes NOT image 1's warm light; (2) new WALLS sentence before LIGHT naming
#   clean soft white walls/window paper + no warm haze (= what A ca sở got by chance). Apply to all 17 later only on the owner's word (cost).
import os, sys, json
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, D)
ROOT = os.path.abspath(os.path.join(D, '..', '..', '..'))
OUTD = os.path.join(ROOT, 'dev', 'handover', 'prompts_L2095')
B = json.load(open(os.path.join(D, 'prompts_places_L2355.json')))

HEAD_OLD = 'same natural light, '
HEAD_NEW = "the same daylight direction but NOT image 1's warm colour of light (the light is written in LIGHT below), "
WALLS_IN = ("WALLS AND WHITES (owner L2370, the clean white light of A ca sở): the plaster walls, wall panels and lattice window paper are a "
            "clean soft white like #F3F2EE, never cream, beige, yellow, peach or pink; white gauze and white porcelain read pure white; the wood "
            "keeps its own colour; the whole room looks fresh, airy and bright, with no warm golden, amber, peach or pink haze over the picture. ")
WALLS_OUT = ("WALLS AND WHITES (owner L2370, the clean white light of A ca sở): plaster walls and window paper are a clean soft white or light "
             "grey like #EDEDEA, never cream, beige, yellow or peach; whites read pure white; the scene looks fresh, airy and bright, with no "
             "warm golden, amber, peach or pink haze over the picture. ")
LIGHT = 'LIGHT: morning daylight'

def white(p, outdoor):
    assert p.count(HEAD_OLD) == 1 and p.count(LIGHT) == 1
    return p.replace(HEAD_OLD, HEAD_NEW).replace(LIGHT, (WALLS_OUT if outdoor else WALLS_IN) + LIGHT)

def room(p, new):
    i = p.index(' ROOM: ') + len(' ROOM: '); j = p.index(' No Western sofa, no upholstered couch. ')
    return p[:i] + new + p[j:]

R = {}
# job 2 — Phòng cung nữ up to the finish of Cung nhân (M2355-10); same function + key props (shared sleeping platform, wardrobe,
# dressing table, washstand, plum scroll, lantern). Owner: no room in the game may look poor.
R['phong-cung-nu'] = (
    "Phòng cung nữ, the shared sleeping room of the palace maids in an ancient Chinese palace, a real room in daily use, pretty, cosy and well "
    "kept, finished like the rooms of the junior palace women, seen with TWO walls only: the back wall straight across the picture and the RIGHT "
    "side wall running towards the viewer in clear perspective, meeting at a square corner, like the wall layout of image 3: red-brown lacquered "
    "pillars, fine lattice windows with an interlocking flower pattern in the RIGHT side wall onto a sunny garden, a painted frieze of small "
    "flowers and birds along the beam above the back wall; against the back wall, square to it and seen straight on, the large clear main "
    "subject: a long, low shared canopy bed: a carved wooden sleeping platform across most of the back wall under a carved wooden canopy frame "
    "with fine white gauze curtains embroidered with small plum blossoms, tied back with pink silk cords and small tassels, with neatly folded "
    "quilts in soft pink, jade green and cream silk-cotton with small embroidered borders and small embroidered pillows lined up on it; a tall "
    "carved wooden wardrobe with brass fittings against the back wall at the left; a pretty dressing table with a round bronze mirror, a small "
    "jewellery box and a stool with a pink cushion against the window wall, square to it; a wooden washstand with a white porcelain basin and "
    "a folded towel, a blue-and-white vase of fresh flowers on a small stand, an embroidery frame with a half-done flower, a plum blossom "
    "scroll on the wall, a hanging paper lantern painted with flowers and pink tassels. Soft pink, jade green, cream and warm wood; modest but "
    "pretty and loved, the same level of finish as the junior palace women's room: carved and painted wood, fine fabrics and fresh flowers, "
    "only small brass fittings, no rich treasures, no large gilt carving; never bare, never shabby, never poor.")
# job 4 — A ca sở: curtains refined princely silk in the room's tone (owner: coarse + too dark); décor and white light kept.
ACS_OLD = [("lattice windows in the LEFT side wall onto a sunny garden with plain deep blue silk curtains tied back",
            "lattice windows in the LEFT side wall onto a sunny garden with refined, fine-woven princely silk curtains in a soft misty blue-grey "
            "like #9FB3C8 with a subtle tone-on-tone cloud damask and a narrow embroidered border, light and graceful, gathered and tied back "
            "with silk cords"),
           ("with plain deep indigo-blue silk curtains tied back with dark blue cords",
            "with refined, fine-woven princely silk curtains in the same soft misty blue-grey like #9FB3C8, a subtle tone-on-tone cloud damask, "
            "a narrow embroidered border and a fine silver-grey edging, softly gathered and tied back with silk cords and small jade toggles; "
            "the curtains are light and noble, in harmony with the soft white walls, never heavy, never coarse, never dark indigo"),
           ("Deep blue, ink grey, bronze and warm wood", "Soft misty blue, deep blue, ink grey, bronze and warm wood")]
# job 3 (law 11) — Lãnh cung was painted 'poor and neglected' (peeling, torn paper, cracked, broken) = shabby. Owner rule: old/worn but
# still beautiful. Keep function + key props (old hall, steps, high wall, old tree, water vat, stool, no lanterns/flowers in pots).
R['lanh-cung'] = (
    "Lãnh cung, the cold palace of an ancient Chinese imperial palace where disgraced consorts are shut away, a quiet, lonely and forgotten "
    "place, old and faded but still beautiful and dignified, swept and kept clean, no bed anywhere, {C}: against the back, square to it and seen "
    "straight on, the large clear main subject: an old single-storey hall with softly faded red pillars whose paint is gently weathered but "
    "whole, grey tiled eaves with a few old carved brackets, old lattice doors with clean white paper panes, one door half open onto a quiet "
    "dim room, and three old grey brick steps up to it, worn smooth by time; along the LEFT side, the high plain courtyard wall in faded "
    "soft white plaster with a little soft moss at its foot; an old gnarled tree with fresh green summer leaves at the right of the hall, "
    "casting soft leaf shadows, a few small wild flowers and grass at the foot of the walls, an old glazed water vat and a simple wooden stool "
    "against the hall front. Old, faded and simple, but clean, calm and lovely: no lanterns, no flowers in pots, no rich furniture, faded "
    "red, soft grey, white and fresh green, quiet and lonely, clear and painterly in the morning light; never ruined, never broken, never "
    "torn, never peeling, never dirty, never poor-looking.")
LANH_GROUND = [("GROUND: old uneven grey brick paving with moss in the cracks", "GROUND: old grey brick paving, worn smooth, a little moss in the joints")]
# job 5 — Ngự hoa viên: tables/chairs ONLY inside the pavilion, never on the path/terrace; frontal camera, lake, pavilion, bridge kept.
NHV_OLD = [("Image 4 is the old picture of this same garden,",
            "GARDEN FURNITURE (owner L2370): the only tables and seats of the garden stand INSIDE the pavilion on the water: a small round "
            "table with round drum stools under its roof; NO table, chair, stool, bench or stand anywhere on the near shore, the terrace, the "
            "paths or the bridge: the open paved terrace in front holds only the balustrade, the raised flower beds and potted peonies. Image 4 "
            "is the old picture of this same garden,"),
           ("So the furniture stands BEHIND where they will stand: the bases of the beds, seats, tables and stands in that band sit no lower",
            "So the garden stands BEHIND where they will stand: the balustrade, flower beds and flower pots in that band sit no lower"),
           ("The corners are furnished, never bare, and the left part of the room near the viewer holds only small, low objects",
            "The corners hold flowers and plants, never bare, and the left part of the garden near the viewer holds only small, low plants")]

OUT = {}
JOBS = [('phong-cung-nu', 2, 'Phòng cung nữ (lên mức Cung nhân)'), ('a-ca-so', 4, 'A ca sở (rèm lụa hoàng tử, tông phòng)'),
        ('lanh-cung', 3, 'Lãnh cung (cũ nhưng đẹp, luật 11)'), ('ngu-hoa-vien', 5, 'Ngự hoa viên (bàn ghế trong đình)')]
for n, (key, job, vn) in enumerate(JOBS, 1):
    b = B[key]; p = b['prompt']; out = b['kind'] == 'out'
    if key in R:
        new = R[key]
        if '{C}' in new:
            new = new.replace('{C}', p[p.index('seen straight on like a stage set'):p.index(', like the wall layout of image 3') + len(', like the wall layout of image 3')])
        p = room(p, new)
    for a, c in {'a-ca-so': ACS_OLD, 'lanh-cung': LANH_GROUND, 'ngu-hoa-vien': NHV_OLD}.get(key, []):
        assert p.count(a) == 1, (key, a); p = p.replace(a, c)
    if key == 'phong-cung-nu':
        assert p.count('lived-in, plain, tidy room') == 1; p = p.replace('lived-in, plain, tidy room', 'lived-in, pretty, well-kept room')
    if key == 'lanh-cung':
        p = p.replace('lived-in, neglected, forgotten courtyard', 'lived-in, old, quiet, forgotten courtyard'); assert 'neglected' not in p
    p = white(p, out)
    assert '{' not in p, key
    OUT[key] = dict(prompt=p, code=f'M2370-{n:02d}', name=vn, kind=b['kind'], refs=b['refs'], job=job,
                    base=f"dev/handover/prompts_L2095/{b['code']}_{key}_ha_sang.txt", layout=b['layout'])
# GROUP (ROOT-C3 GO 22/11 06:15Z on the owner's standing rule; 13 × 135 cr): the other 13 drawn places get WHITE only, nothing else changed.
for key, b in B.items():
    if key in OUT: continue
    n = len(OUT) + 1
    OUT[key] = dict(prompt=white(b['prompt'], b['kind'] == 'out'), code=f'M2370-{n:02d}', name=b['name'], kind=b['kind'], refs=b['refs'], job=1,
                    base=f"dev/handover/prompts_L2095/{b['code']}_{key}_ha_sang.txt", layout=b['layout'])
# REDO (ROOT-C3 06:25Z, owner standing rule): M2370-06 / -11 shelves read as modern upright ring binders = anachronism -> BOOKS sentence.
BOOKS = (" BOOKS (owner L2370 redo: no modern binders): every book is an ancient Chinese thread-bound book lying FLAT in low stacks, many "
         "kept in indigo-blue cloth book cases (hán sáo) tied with small ivory clasps, with rolled scrolls and scroll boxes; never upright "
         "modern ring binders, file boxes, folders or hardback spines with paper labels.")
for key in ('ngu-thu-phong', 'thuong-thu-phong'):
    v = OUT[key]; n = len(OUT) + 1; p = v['prompt']; a = ' No Western sofa, no upholstered couch. '; assert p.count(a) == 1
    OUT[key + '-r2'] = dict(v, prompt=p.replace(a, BOOKS + a), code=f'M2370-{n:02d}', job=1,
                            base=f"dev/handover/prompts_L2095/{v['code']}_{key}_ha_sang.txt")
import room_gate; room_gate.guard({k: v['prompt'] for k, v in OUT.items()}, 'places-M2370')
json.dump(OUT, open(os.path.join(D, 'prompts_places_L2370.json'), 'w'), ensure_ascii=False, indent=1)
CAP = '\n\nCAPTION: write ONLY this code, small, bold, in the top-left corner, the only text in the picture: "{}"\n'
for k, v in OUT.items():
    open(os.path.join(OUTD, f"{v['code']}_{k}_ha_sang.txt"), 'w').write(v['prompt'] + CAP.format(v['code']))
print({v['code']: (k, len(v['prompt'])) for k, v in OUT.items()}, 'ROOM GATE PASS')

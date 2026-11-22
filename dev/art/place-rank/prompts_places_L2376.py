# PLACES3 (owner L2376 22/11 via ROOT-C3): 7 redraws M2370-21..27. Reads the FROZEN prompts_places_L2370.json (= the generated M2370-01..20
# files; prompts_places_L2370.py can no longer rebuild it because prompts_places_L2355.json on the branch is broken JSON / changed) and
# appends new codes only; used codes are never rewritten. Ngự hoa viên = 0 cr calm grade (room_calm.py), no prompt.
import os, sys, json, re
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, D)
ROOT = os.path.abspath(os.path.join(D, '..', '..', '..'))
OUTD = os.path.join(ROOT, 'dev', 'handover', 'prompts_L2095')
OUT = json.load(open(os.path.join(D, 'prompts_places_L2370.json')))
# used codes are frozen: a key keeps its code forever; a new key gets the next free number (bug fixed 22/11 L2384: renumbering)
CODE = {k: v['code'] for k, v in OUT.items()}
CODE['khon-ninh-cung-r1'] = 'M2370-39'   # used by PLACES4 L2387 (Khôn Ninh edit, no builder prompt): frozen
CODE['khon-ninh-cung-r2'] = 'M2370-46'   # PLACES4 L2389 Khôn Ninh open-window edit (no builder prompt): frozen
def code_for(k):
    if k in CODE: return CODE[k]
    n = max(int(c.split('-')[1]) for c in CODE.values() if c.startswith('M2370-')) + 1; CODE[k] = f'M2370-{n:02d}'; return CODE[k]
for k in [k for k, v in OUT.items() if v.get('job') == 2376]: del OUT[k]   # rebuild own codes only
WALLS_IN = ("WALLS AND WHITES (owner L2370, the clean white light of A ca sở): the plaster walls, wall panels and lattice window paper are a "
            "clean soft white like #F3F2EE, never cream, beige, yellow, peach or pink; white gauze and white porcelain read pure white; the wood "
            "keeps its own colour; the whole room looks fresh, airy and bright, with no warm golden, amber, peach or pink haze over the picture. ")
# ===== PLACES3 (owner L2376 via ROOT-C3, approved, details ours, one try each). New codes from M2370-21; used codes never rewritten.
# Base of each = the current M2370 prompt of that place (OUT[...]); only the ROOM text (+ Từ Ninh's WALLS sentence) changes; the BED /
# BOOKS sentences that sat inside the old ROOM part are carried over unchanged.
def room3(p, new):
    i = p.index(' ROOM: ') + len(' ROOM: '); j = p.index(' No Western sofa, no upholstered couch. ')
    old = p[i:j]; keep = ''
    for t in (' BED (owner Lượt 804', ' BOOKS (owner L2370'):
        if t in old: keep += old[old.index(t):] if not keep else ''
    return p[:i] + new + keep + p[j:]
NOPAINT = (" WALLS OF A SERVANTS' ROOM (owner L2376): nothing is painted on the walls or beams: no painted frieze, no wall painting, no "
           "painted flowers or birds on plaster; the only decoration of the walls is CARVED wood (carved lattice and openwork panels in "
           "natural polished wood) and one small hanging scroll.")
R3 = {}
R3['phong-cung-nu'] = (
    "Phòng cung nữ, the shared sleeping room of the palace maids in an ancient Chinese palace, a real room in daily use, neat, clean and "
    "pleasant, the same modest level as the junior palace women's room, never a noble lady's boudoir, seen with TWO walls only: the back wall "
    "straight across the picture and the RIGHT side wall running towards the viewer in clear perspective, meeting at a square corner, like the "
    "wall layout of image 3: red-brown wooden pillars, simple lattice windows with a plain square pattern in the RIGHT side wall onto a sunny "
    "garden; the back wall is clean soft white plaster framed by plain wooden posts and beams, with a band of simple carved wooden lattice "
    "panels in natural wood along the top under the beam; against the back wall, square to it and seen straight on, the large clear main "
    "subject: a long, low shared canopy bed: a sleeping platform of plain polished wood across most of the back wall under a simple wooden "
    "canopy frame with "
    "plain white cotton-gauze curtains tied back with plain cords, neatly folded quilts in soft pink, pale blue and jade-green cotton and "
    "small plain pillows lined up on it, a small wooden chest at its foot; a plain wooden wardrobe with small brass fittings against the back "
    "wall at the left; a small plain wooden dressing table with a round bronze mirror and a stool against the window wall, square to it; a "
    "wooden washstand with a white porcelain basin and a folded towel, a clothes rack with two pale robes, a vase of a few fresh flowers on a "
    "small stand, a small plum blossom scroll on the wall, a single round paper lantern. Soft pink, pale blue, cream and warm polished wood; "
    "simple, tidy and pretty, well kept and cared for: plain polished wood with only small simple carving, plain cotton and gauze, no rich "
    "embroidered silks, no painted furniture, no gilt, no rich treasures; never bare, never shabby, never poor." + NOPAINT)
R3['cung-nhan'] = (
    "the room of the cung nhân, the junior palace women of an ancient Chinese palace, a shared sleeping room in daily use, warm, cosy and "
    "pretty, seen with THREE walls: the back wall straight across the middle of the picture and the left and right side walls running towards "
    "the viewer in clear perspective, meeting it at square corners, like the wall layout of image 3: red-brown wooden pillars, lattice windows "
    "with a fine interlocking pattern in both side walls onto a sunny garden, an open doorway with a carved wooden door frame in the middle of "
    "the back wall onto a green courtyard; the walls are warm wooden wall panels and posts with soft white plaster between them, and along "
    "the top of the back wall under the beam a band of carved wooden openwork panels of flowers in natural polished wood; against the back "
    "wall on each side of the doorway, square to it and seen straight on, the large clear main subject: two single carved wooden canopy beds "
    "with light carving on the canopy frame, soft pink and pale blue silk-cotton quilts with small embroidered borders and embroidered "
    "pillows, gauze curtains with small embroidered flowers tied back with pink silk cords, each with a carved wooden chest with brass "
    "fittings at its foot; a clothes rack with a few pale pink and cream robes against the left wall with a vase of peonies on a small stand "
    "beside it, a wooden cabinet with brass fittings and a small dressing table with a round bronze mirror, a small jewellery box and a stool "
    "with a pink cushion against the right wall, square to it, a vase of lotus on a small stand, a hanging paper lantern with a pink tassel. "
    "Soft pink, pale blue, cream and warm red-brown wood; warm, cosy, pretty and lived-in like a loved home, generous and well furnished, "
    "never cold, never bare, never restrained; modest rank: no rich treasures, no gilt." + NOPAINT)
R3['a-ca-so'] = (
    "A ca sở, the quarters of the young princes in an ancient Chinese palace where a teenage prince lives, sleeps, studies and trains, a real "
    "room in daily use, a young man's room: youthful, crisp, masculine, princely and noble, seen with TWO walls only: the back wall straight "
    "across the picture and the LEFT side wall running towards the viewer in clear perspective, meeting at a square corner, like the wall "
    "layout of image 3: dark lacquered pillars, lattice windows with a strong straight geometric pattern in the LEFT side wall onto a sunny "
    "garden, with straight-hanging curtains of crisp, firm sapphire-blue silk like #2E5C9E with a navy-blue key-fret border, neatly tied "
    "back with navy cords; against the back wall in its RIGHT half, square to it and seen straight on, the large clear main subject: ONE "
    "canopy bed: a carved dark wooden canopy bed with straight, clean lines and carved cloud-scroll motifs, its curtains of the same crisp "
    "sapphire-blue silk like #2E5C9E with a navy key-fret border, hanging straight and neatly tied back with navy cords and small dark jade "
    "toggles, bedding in steel blue like #5B7FA6 and deep navy like #1F3355 with a silver-grey key-fret border and a firm round bolster; in "
    "the LEFT half of the back wall a bookcase of books and scrolls and a folding screen painted in ink with mountains, pines and a galloping "
    "horse; a low study desk with brushes, an ink stone and an open book of calligraphy and a navy floor cushion against the window wall, "
    "square to it; a bow and a quiver of arrows on a wall rack, a sword in a dark sheath on a stand, a weiqi board on a small table, a hanging "
    "calligraphy scroll, a bronze incense burner, a square hanging lantern with a dark wooden frame and navy tassels. Clear sapphire blue, "
    "steel blue, navy, ink black, silver grey and dark wood: crisp, fresh and young, a noble young man's taste: no pink, no lilac, no pastel, "
    "no misty or powdery blue, no sheer gauze, no lace, no ruffles, no floral silks; never girlish, never old-fashioned or dusty.")
TN_CURT = ("hung with heavy curtains of amber-brown silk brocade like #8A5A2B woven with gold longevity roundels, tied back with gold cords; "
           "the walls are rich dark zitan wall panels carved with gilt longevity characters, cranes and clouds, with soft ivory plaster between")
TN_TAIL = (" Deep antique gold, amber, warm brown brocade, deep plum-red, dark zitan and old gold: dignified, calm and elder in taste, "
           "never girlish, no pink; NO white or pale curtains, no sheer gauze, no lace anywhere: every curtain and hanging is rich amber, "
           "antique-gold or brown brocade.")
R3['tu-ninh-cung-ngu'] = (
    "Từ Ninh cung bedroom, the private bedchamber of the Thái hậu (the emperor's mother, the highest lady of the palace) in an ancient "
    "Chinese palace, a real room in daily use, seen with THREE walls: the back wall straight across the middle of the picture and the left and "
    "right side walls running towards the viewer in clear perspective, meeting it at square corners, like the wall layout of image 3: dark red "
    "lacquered pillars with gilt bands, lattice windows in both side walls onto a sunny garden, " + TN_CURT + "; against the middle of the "
    "back wall, square to it and seen straight on, ONE canopy bed, the large clear main subject: a very wide canopy bed of carved dark zitan "
    "wood with rich gilt carving of peonies and cranes among pines, its curtains of heavy silk brocade in deep antique gold like #CE9C48 lined "
    "with amber, woven with gold longevity roundels and edged in deep plum-red, tied back with thick gold cords and tassels, silk bedding in "
    "deep antique-gold royal yellow like #CE9C48 with deep plum-red and old-gold trims and a warm brown brocade coverlet; a carved zitan "
    "dressing table with a bronze mirror and a gilt jewellery cabinet against the right window wall, square to it; a small Buddhist shrine "
    "with a gilt Buddha, a string of prayer beads and an incense burner on a carved altar table against the left wall, square to it; "
    "cloisonné vases of peonies, a curio shelf of jade and porcelain treasures, hanging palace lanterns of amber silk with gold tassels. The "
    "richest room of the palace, above an Empress's in luxury." + TN_TAIL)
R3['tu-ninh-cung'] = (
    "Từ Ninh cung reception hall, the hall where the Thái hậu (the emperor's mother, the highest lady of the palace) receives the consorts "
    "who come to pay their respects, a real hall in daily use, no bed anywhere, seen with THREE walls: the back wall straight across the "
    "middle of the picture and the left and right side walls running towards the viewer in clear perspective, meeting it at square corners, "
    "like the wall layout of image 3: dark red lacquered pillars with gilt bands, lattice windows in both side walls onto a sunny garden, "
    + TN_CURT + "; against the middle of the back wall, square to it and seen straight on, the large clear main subject: a low carved dais "
    "with a wide carved dark zitan throne-like daybed with rich gilt carving, cushions in deep antique-gold royal yellow like #CE9C48 "
    "embroidered with peonies and cranes, a warm brown brocade bolster and a small low table with a tea set, before a tall gilt folding "
    "screen carved with pines and cranes; at the left side wall, square to it, a small Buddhist shrine with a gilt Buddha, lotus flowers and "
    "an incense burner on a carved altar table; along the right side wall, square to it, a row of carved zitan armchairs with amber and "
    "plum-red brocade cushions and small tea tables for the visiting consorts; cloisonné vases, a bronze incense burner with a curl of "
    "smoke, hanging palace lanterns of amber silk with gold tassels. Richer than an Empress's hall." + TN_TAIL)
R3['ngu-thu-phong-r2'] = (
    "Ngự thư phòng, the emperor's own private study in the imperial palace of ancient China, where the Son of Heaven reads memorials and "
    "writes, a real room in daily use, imperial, rich and majestic, no bed anywhere, seen with TWO walls only: the back wall straight across "
    "the picture and the LEFT side wall running towards the viewer in clear perspective, meeting at a square corner, like the wall layout of "
    "image 3: red lacquered pillars with coiling gilt dragons, a beam above carved and gilded with dragons among clouds, lattice windows with "
    "gilt-edged frames in the LEFT side wall onto a sunny garden, hung with imperial yellow silk brocade curtains like #E3B04B woven with "
    "gold dragon roundels, tied back with gold cords and tassels, a large cloisonné vase of white magnolias before them; against the back "
    "wall in its RIGHT half, square to it and seen straight on, the large clear main subject: on a low carved dais, a long imperial writing "
    "desk of dark red zitan with gilt dragon carving along its apron and legs, an imperial yellow silk desk runner like #EFBD69 embroidered "
    "with a golden dragon, a jade brush rack with brushes, an ink stone in a carved box, a jade imperial seal and rolled memorials, and "
    "behind it a carved zitan dragon armchair with gilt dragon heads on its arms and an imperial yellow dragon cushion; behind the chair a "
    "tall carved and gilded screen of dragons among clouds; in the LEFT half of the back wall tall carved zitan bookcases with gilt edging "
    "full of books in imperial yellow and indigo silk cases and boxed scrolls, square to the wall, with jade and celadon treasures on their "
    "shelves; a tall cloisonné jar of rolled scrolls, a carved side table with a gold-and-jade tea set, a large gilt-bronze incense burner "
    "with a curl of smoke, a pair of bronze cranes, hanging imperial palace lanterns of yellow silk with gold tassels. Imperial yellow, gold, "
    "dark red zitan, deep blue and jade green: the richest study in the realm, majestic, scholarly and calm; never plain, never modest, never "
    "poor, no white curtains, no sheer gauze.")
R3['thuong-thu-phong-r2'] = (
    "Thượng thư phòng, the imperial schoolroom of an ancient Chinese palace where the princes study with their tutors, a real room in daily "
    "use, refined, scholarly and quietly rich, no bed anywhere, seen with TWO walls only: the back wall straight across the picture and the "
    "RIGHT side wall running towards the viewer in clear perspective, meeting at a square corner, like the wall layout of image 3: red "
    "lacquered pillars, a beam above with finely carved, lightly gilded cloud scrolls, lattice windows in the RIGHT side wall onto a sunny "
    "garden, hung with refined deep-blue silk curtains like #2F4E7A with a small gold-thread border, tied back with silk cords; against the "
    "back wall in its RIGHT half, square to it and seen straight on, the large clear main subject: the tutor's long carved rosewood desk on a "
    "low carved wooden dais with brushes on a jade brush rack, an ink stone, a celadon water dropper and stacked books, a carved rosewood "
    "armchair with a deep-blue brocade cushion behind it and a fine landscape scroll mounted in brocade on the wall above; in the LEFT half "
    "of the back wall tall carved rosewood bookcases full of thread-bound books and boxed scrolls, with a few celadon and jade pieces on the "
    "shelves, square to the wall; three low students' desks of carved rosewood with brushes, ink stones and paper in a straight row ALONG the "
    "RIGHT window wall, square to it, each with a flat deep-blue brocade floor cushion beside it against the wall (owner L2303: furniture "
    "along the walls, never in the middle of the floor), the open floor in front left clear; a bronze incense burner, a blue-and-white vase "
    "of lotus, a carved bamboo brush pot, a bonsai pine on a stand, hanging palace lanterns of silk with tassels. Dark rosewood, deep blue, "
    "celadon, cream paper and touches of gold: the princes' schoolroom, refined, orderly, calm and quietly rich, a step below the emperor's "
    "own study; never plain, never bare, never poor, no white curtains.")
WALLS_TN = ("WALLS AND WHITES (owner L2370 clean light; owner L2376 Từ Ninh = the Thái hậu's tones): the light is clean white daylight and "
            "the plaster between the dark carved wall panels is a clean soft ivory like #F1EEE6, never yellow or peach; the curtains are NOT "
            "white: every curtain and hanging is rich amber, antique-gold or brown brocade; the room looks bright and clear, with no golden, "
            "amber or peach haze over the picture. ")
ORDER3 = ['phong-cung-nu', 'a-ca-so', 'cung-nhan', 'tu-ninh-cung-ngu', 'tu-ninh-cung', 'ngu-thu-phong-r2', 'thuong-thu-phong-r2']
for key in ORDER3:
    v = OUT[key]; n = len(OUT) + 1; p = room3(v['prompt'], R3[key])
    if key == 'phong-cung-nu': p = p.replace('lived-in, pretty, well-kept room', 'lived-in, neat, well-kept room')
    if key.startswith('tu-ninh'): assert p.count(WALLS_IN) == 1; p = p.replace(WALLS_IN, WALLS_TN)
    nk = (key[:-3] + '-r3') if key.endswith('-r2') else key + '-r2'
    OUT[nk] = dict(v, prompt=p, code=code_for(nk), job=2376, base=f"dev/handover/prompts_L2095/{v['code']}_{key}_ha_sang.txt")
# ===== PLACES3 L2381 (owner via ROOT-C4, approved plan; one try each). job=2381, codes continue after M2370-27.
for k in [k for k, v in OUT.items() if v.get('job') == 2381]: del OUT[k]
# (2) Phòng cung nữ = the Cung nhân prompt COPIED as-is (owner: "copy cái prompt của cung nhân qua làm cái prompt của cung nữ").
# (3) A ca sở M2370-22: everything kept; curtains + bed made princely-luxurious (owner: "độ cầu kỳ của cái rèm không có ... giống như những người phi tần").
ACS3 = [("with straight-hanging curtains of crisp, firm sapphire-blue silk like #2E5C9E with a navy-blue key-fret border, neatly tied "
         "back with navy cords",
         "with luxurious layered princely curtains: an outer drape of heavy sapphire-blue silk brocade like #2E5C9E woven with silver-grey "
         "cloud-and-dragon roundels, a wide navy border embroidered in gold and silver thread with key-fret and waves, a gold-fringed edge, "
         "over an inner layer of fine pale-blue silk, all under a carved gilt pelmet with a short embroidered valance, gathered and tied back "
         "with thick braided gold-and-navy cords ending in large tassels and jade toggles"),
        ("a carved dark wooden canopy bed with straight, clean lines and carved cloud-scroll motifs, its curtains of the same crisp "
         "sapphire-blue silk like #2E5C9E with a navy key-fret border, hanging straight and neatly tied back with navy cords and small dark jade "
         "toggles, bedding in steel blue like #5B7FA6 and deep navy like #1F3355 with a silver-grey key-fret border and a firm round bolster",
         "a grand canopy bed of dark zitan wood as rich as an imperial consort's, its canopy frame, posts and front panels richly carved in deep "
         "relief with clouds, waves and coiling young dragons, picked out in gold and silver; a deep embroidered valance runs round the "
         "canopy top; its curtains are layered: heavy sapphire-blue silk brocade like #2E5C9E woven with silver-grey cloud-and-dragon "
         "roundels, with a wide navy border embroidered in gold and silver thread and a gold-fringed edge, over fine pale-blue silk, gathered "
         "and tied back with thick braided gold-and-navy cords, large silk tassels and jade toggles; bedding of steel-blue like #5B7FA6 and "
         "deep navy like #1F3355 silk brocade embroidered with silver clouds, a silver-grey key-fret border and a firm round brocade bolster "
         "with gold-thread ends"),
        ("crisp, fresh and young, a noble young man's taste",
         "crisp, fresh and young, a noble young man's taste, as rich and luxurious as an imperial consort's room")]
# (4) Thượng thư phòng M2370-27: curtains as finely embroidered as its chairs and lanterns.
TTP3 = [("hung with refined deep-blue silk curtains like #2F4E7A with a small gold-thread border, tied back with silk cords",
         "hung with refined, finely embroidered curtains: deep-blue silk brocade like #2F4E7A embroidered with gold and cream peonies, "
         "clouds and cranes in the same rich embroidery as the brocade chair cushions and silk lanterns, a wide embroidered border, a "
         "gold-fringed edge and a carved gilt pelmet with an embroidered valance, gathered and tied back with braided gold cords and silk tassels")]
for src, nk, reps in (('cung-nhan-r2', 'phong-cung-nu-r3', []), ('a-ca-so-r2', 'a-ca-so-r3', ACS3), ('thuong-thu-phong-r3', 'thuong-thu-phong-r4', TTP3)):
    v = OUT[src]; p = v['prompt']
    for a, b in reps: assert p.count(a) == 1, (nk, a[:50]); p = p.replace(a, b)
    base = OUT['phong-cung-nu'] if nk.startswith('phong-cung-nu') else v
    OUT[nk] = dict(base, prompt=p, code=code_for(nk), job=2381, refs=v['refs'], layout=v['layout'],
                   base=f"dev/handover/prompts_L2095/{v['code']}_{src}_ha_sang.txt", name=base['name'])
# ===== PLACES3 L2384 (owner via ROOT-C4/C5 + HIST1 prince rule e80219f). job=2384, codes after M2370-30.
for k in [k for k, v in OUT.items() if v.get('job') == 2384]: del OUT[k]
PRINCE = (" PRINCE ROOM RULE (owner L2384 + history expert HIST1): the quarters of a prince (a-ge), NOT imperial: absolutely no dragons of "
          "any kind, no python-dragons, no phoenix anywhere, in carving, weaving or embroidery; carvings and embroidery use only qilin, bats "
          "among auspicious clouds, key-fret borders, scrolling grass, lotus, peony, plum, orchid, bamboo, chrysanthemum, gourds, "
          "pomegranates, pine and crane, books and antiques; no yellow silk, yellow curtains or yellow bedding; gold only as thin restrained "
          "trim and small brass fittings, never gilded panels, gilt carving or gold walls.")
ACS4 = [("woven with silver-grey cloud-and-dragon roundels, a wide navy border embroidered in gold and silver thread with key-fret and waves, "
         "a gold-fringed edge, over an inner layer of fine pale-blue silk, all under a carved gilt pelmet with a short embroidered valance, "
         "gathered and tied back with thick braided gold-and-navy cords ending in large tassels and jade toggles",
         "woven with silver-grey roundels of bats among auspicious clouds, a wide navy border embroidered in silver and pale-blue thread with "
         "key-fret and waves and a thin gold line, a navy silk-fringed edge, over an inner layer of fine pale-blue silk, all under a carved "
         "dark zitan pelmet with a short embroidered valance, gathered and tied back with thick braided navy silk cords ending in large "
         "tassels and jade toggles"),
        ("richly carved in deep relief with clouds, waves and coiling young dragons, picked out in gold and silver",
         "richly carved in deep relief with qilin, bats among auspicious clouds, waves and pine, in the natural dark wood with only a thin "
         "gold line on the edges"),
        ("woven with silver-grey cloud-and-dragon roundels, with a wide navy border embroidered in gold and silver thread and a gold-fringed "
         "edge, over fine pale-blue silk, gathered and tied back with thick braided gold-and-navy cords",
         "woven with silver-grey roundels of bats among auspicious clouds, with a wide navy border embroidered in silver and pale-blue thread "
         "with a thin gold line and a navy silk-fringed edge, over fine pale-blue silk, gathered and tied back with thick braided navy silk "
         "cords"),
        ("a firm round brocade bolster with gold-thread ends", "a firm round brocade bolster with silver-thread ends"),
        ("as rich and luxurious as an imperial consort's room", "as rich and luxurious as an imperial consort's room, but a prince's: no dragons, no yellow, no gilding")]
TTP5 = [("a beam above with finely carved, lightly gilded cloud scrolls", "a beam above with finely carved bats among clouds in the natural wood"),
        ("hung with refined, finely embroidered curtains: deep-blue silk brocade like #2F4E7A embroidered with gold and cream peonies, clouds "
         "and cranes in the same rich embroidery as the brocade chair cushions and silk lanterns, a wide embroidered border, a gold-fringed "
         "edge and a carved gilt pelmet with an embroidered valance, gathered and tied back with braided gold cords and silk tassels",
         "hung with refined embroidered curtains, moderate and quiet: deep-blue silk like #2F4E7A embroidered with a few sprays of plum, "
         "orchid and bamboo in cream and soft green thread, matching the embroidered chair cushions, a narrow key-fret border, tied back "
         "with plain blue silk cords and small tassels"),
        ("hanging palace lanterns of silk with tassels", "two plain hanging silk lanterns"),
        ("cream paper and touches of gold", "cream paper and small brass fittings"),
        ("never plain, never bare, never poor, no white curtains.",
         "never plain, never bare, never poor, no white curtains; but moderate and uncluttered, never over-decorated: plain polished "
         "rosewood furniture with light carving and no gilding, few ornaments, books and calligraphy first.")]
for src, nk, reps in (('a-ca-so-r3', 'a-ca-so-r4', ACS4), ('thuong-thu-phong-r4', 'thuong-thu-phong-r5', TTP5)):
    v = OUT[src]; p = v['prompt']
    for a, b in reps: assert p.count(a) == 1, (nk, a[:60]); p = p.replace(a, b)
    a = ' No Western sofa, no upholstered couch. '; assert p.count(a) == 1; p = p.replace(a, PRINCE + a)
    OUT[nk] = dict(v, prompt=p, code=code_for(nk), job=2384, base=f"dev/handover/prompts_L2095/{v['code']}_{src}_ha_sang.txt")
# ===== PLACES4 L2387 (owner: "Cửa sổ là không có rèm" + HIST2 @6e8e23b, rule L30). job=2387, codes after M2370-32.
# Only the WINDOW clause changes (curtains -> lattice + paper); the shared style sentence says "carved lattice windows" instead of
# "curtains"; the L30 window block (dev/art/common_blocks/window_L30.txt) is appended. Bed curtains stay (allowed by L30).
for k in [k for k, v in OUT.items() if v.get('job') == 2387]: del OUT[k]
WIN = " " + open(os.path.join(D, '..', 'common_blocks', 'window_L30_v1_L2387.txt'), encoding='utf-8').read().strip()   # frozen: codes -33..38 used
STY = ('same depth with furniture, curtains and objects', 'same depth with furniture, carved lattice windows and objects')
def cut_to(p, start, end):   # the clause from `start` up to (not incl.) the first `end` after it
    i = p.index(start); j = p.index(end, i); return p[i:j]
W87 = {
 'a-ca-so-r4': ('a-ca-so-r5', 'with luxurious layered princely curtains:', ';',
   "with NO curtains at all (rule L30): the windows are densely carved dark zitan lattice in a strong straight bubu-jin and key-fret "
   "pattern with only a thin gold line on the edges, backed by glowing white window paper with a few small glass panes in the lattice "
   "centre, warm diffused light falling through the paper"),
 'thuong-thu-phong-r5': ('thuong-thu-phong-r6', 'hung with refined embroidered curtains, moderate and quiet:', ';',
   "with NO curtains (rule L30): densely carved rosewood lattice in an ice-crack and key-fret pattern in the natural wood, backed by "
   "glowing white window paper with small glass panes in the centre, soft diffused light through the paper"),
 'ngu-thu-phong-r3': ('ngu-thu-phong-r4', 'hung with imperial yellow silk brocade curtains', ',  a large',
   ""),
 'phi-tan-cung': ('phi-tan-cung-r2', ' with pale green gauze curtains', ';',
   " with NO curtains (rule L30): carved lattice in an ice-crack pattern with pale green painted frames, backed by glowing white "
   "window paper, soft light through the paper"),
 'tu-ninh-cung-r2': ('tu-ninh-cung-r3', 'hung with heavy curtains of amber-brown silk brocade', ';',
   "with NO curtains (rule L30): densely carved dark red lacquered lattice with gilt edges in a longevity-character and key-fret "
   "pattern, backed by glowing white window paper, warm amber light through the paper"),
 'dong-cung': ('dong-cung-r2', ' with royal yellow like #EFBD69 silk curtains tied back', ';',
   " with NO curtains (rule L30): densely carved lattice in a bubu-jin pattern with gilt edges, backed by glowing white window paper; "
   "royal yellow like #EFBD69 silk stays on the cushions and lantern tassels"),
}
W87['ngu-thu-phong-r3'] = ('ngu-thu-phong-r4', 'hung with imperial yellow silk brocade curtains', ', a large',
   "with NO curtains (rule L30): densely carved gilded lattice in a bubu-jin and key-fret pattern, backed by glowing white window "
   "paper with small glass panes in the centre; imperial yellow like #E3B04B dragon-roundel silk stays on the cushions and lanterns")
CUT87 = {}
for src, (nk, start, end, rep) in W87.items():
    v = OUT[src]; p = v['prompt']; old = cut_to(p, start, end); assert p.count(old) == 1, (nk, old[:60])
    p = p.replace(old, rep); assert p.count(STY[0]) == 1, nk; p = p.replace(*STY)
    if src == 'tu-ninh-cung-r2':
        p = p.replace('every curtain and hanging is rich amber', 'every hanging, cushion and door curtain is rich amber')
    p = p + WIN; CUT87[nk] = (old, v['code'], src)
    OUT[nk] = dict(v, prompt=p, code=code_for(nk), job=2387, base=f"dev/handover/prompts_L2095/{v['code']}_{src}_ha_sang.txt")
    assert len(p) < 10000, (nk, len(p))
# ===== PLACES4 L2389 (owner on the L2388 sheet: "Tạo sao cửa sổ kín mít vậy"): windows OPEN + bright (L30 overwritten).
# Same sources as job 2387 (the ORIGINAL approved prompts); only the window clause differs; the current L30 block is appended.
for k in [k for k, v in OUT.items() if v.get('job') == 2389]: del OUT[k]
WIN2 = " " + open(os.path.join(D, '..', 'common_blocks', 'window_L30.txt'), encoding='utf-8').read().strip()
OPEN = ("with NO curtains (rule L30) and the windows OPEN and bright: {f} lattice frames filled with translucent summer silk gauze "
        "through which the sunny garden is clearly seen, one or two window panels swung open on their hinges showing green trees, "
        "small clear glass panes in the lattice, daylight pouring in")
F89 = {'a-ca-so-r4': ('a-ca-so-r6', "dark zitan bubu-jin and key-fret (only a thin gold line on the edges)"),
       'thuong-thu-phong-r5': ('thuong-thu-phong-r7', "natural rosewood ice-crack and key-fret"),
       'ngu-thu-phong-r3': ('ngu-thu-phong-r5', "gilded bubu-jin and key-fret"),
       'phi-tan-cung': ('phi-tan-cung-r3', "pale green painted ice-crack"),
       'tu-ninh-cung-r2': ('tu-ninh-cung-r4', "dark red lacquered longevity-character and key-fret with gilt edges"),
       'dong-cung': ('dong-cung-r3', "gilt-edged bubu-jin")}
CUT89 = {}
for src, (nk87, start, end, rep87) in W87.items():
    nk, f = F89[src]; v = OUT[src]; p = v['prompt']; old = cut_to(p, start, end)
    rep = OPEN.format(f=f)
    if src == 'phi-tan-cung' or src == 'dong-cung': rep = ' ' + rep
    if src == 'dong-cung': rep += "; royal yellow like #EFBD69 silk stays on the cushions and lantern tassels"
    if src == 'ngu-thu-phong-r3': rep += "; imperial yellow like #E3B04B dragon-roundel silk stays on the cushions and lanterns"
    p = p.replace(old, rep).replace(*STY)
    if src == 'tu-ninh-cung-r2':
        p = p.replace('every curtain and hanging is rich amber', 'every hanging, cushion and door curtain is rich amber')
    p = p + WIN2; CUT89[nk] = (old, v['code'], src)
    OUT[nk] = dict(v, prompt=p, code=code_for(nk), job=2389, base=f"dev/handover/prompts_L2095/{v['code']}_{src}_ha_sang.txt")
    assert len(p) < 10000, (nk, len(p))
import room_gate; room_gate.guard({k: v['prompt'] for k, v in OUT.items() if v['job'] in (2376, 2381, 2384, 2387, 2389)}, 'places-M2370-L2376')
json.dump(OUT, open(os.path.join(D, 'prompts_places_L2370.json'), 'w'), ensure_ascii=False, indent=1)
CAP = '\n\nCAPTION: write ONLY this code, small, bold, in the top-left corner, the only text in the picture: "{}"\n'
for k, v in OUT.items():
    if v['job'] not in (2376, 2381, 2384, 2387, 2389): continue
    open(os.path.join(OUTD, f"{v['code']}_{k}_ha_sang.txt"), 'w').write(v['prompt'] + CAP.format(v['code']))
print({v['code']: (k, len(v['prompt'])) for k, v in OUT.items() if v['job'] in (2376, 2381, 2384, 2387, 2389)}, 'ROOM GATE PASS')
for nk, (old, bc, src) in list(CUT87.items()) + list(CUT89.items()):   # A38 sidecars: base = the prompt each was edited from; allow = the window clause only
    k = OUT[nk]; f = os.path.join(OUTD, f"{k['code']}_{nk}_ha_sang.txt")
    why = '  # owner L2387 "Cửa sổ là không có rèm" + rule L30 (HIST2)'
    al = [x.strip(' ,;:') for x in re.split(r'[;:,]', old) if len(x.split()) >= 3] + ['curtains and objects arranged through the room']
    if nk in ('tu-ninh-cung-r3', 'tu-ninh-cung-r4'): al.append('every curtain and hanging is rich amber')
    open(f + '.keep', 'w').write(f"base: dev/handover/prompts_L2095/{bc}_{src}_ha_sang.txt\n" + ''.join(f"allow: {a}{why}\n" for a in al))

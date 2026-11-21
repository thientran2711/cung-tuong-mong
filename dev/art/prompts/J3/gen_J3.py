#!/usr/bin/env python3
"""J3 generator: KP23 (act pictures still missing) + M45 (tall figure-column backdrops for the mini-games) + 2 outing places.
Reads its data from the code / data tables: dev/figwork/acts/meanings.py (rules + scenes + section headers), gens2.txt, assets.json,
dev/build/j82.js + friends (mini-game kinds). Calls NO image generator. Run from anywhere: python3 gen_J3.py"""
import os, re, sys, json, hashlib
J3DIR = os.path.dirname(os.path.abspath(__file__)); HERE = J3DIR; PR = os.path.dirname(HERE); ROOT = os.path.abspath(os.path.join(PR, "..", "..", ".."))
sys.path.insert(0, PR); sys.path.insert(0, os.path.join(ROOT, "dev", "figwork", "acts"))
from _lib import *
import meanings
A = os.path.join(ROOT, "dev", "figwork", "acts")
ASSETS = {k[0] for k in json.load(open(os.path.join(ROOT, "assets.json")))["files"]}
DONE = {l.split()[0] for l in open(os.path.join(A, "gens2.txt")) if l.strip()}
PEND = {l.split()[0] for l in open(os.path.join(A, "pending2.txt")) if l.strip()}
S_HAN = "Han / Ming court costume only (cross-collar robes, soft round hair buns with simple hairpins): no Qing-style collars, no Qing-style hats or headdresses, no cheongsam cut (rule F14)."
def h(s): return int(hashlib.md5(s.encode()).hexdigest(), 16)

# ---------------------------------------------------------------- KP23 acts
txt = open(os.path.join(A, "meanings.py"), encoding="utf-8").read().split("\n")
heads = [(i + 1, l) for i, l in enumerate(txt) if re.match(r"^# *-{3,}", l)]
GROUP_EN = [  # (first header line of that section in meanings.py, English group label, Vietnamese header kept in INDEX)
 (8, "Not a book meaning"), (34, "Follow-up sentence"), (39, "Opening sentences, remaining (misc. daily moments)"), (107, "Night with the Emperor"),
 (134, "Greeting / audience / entering another palace"), (150, "Knowing people / identity"), (160, "News from ears and eyes"), (201, "Visits / invitations"),
 (215, "Dealing with fellow consorts"), (263, "The Emperor by day"), (318, "Children"), (375, "Arts / study"), (424, "Grooming / rest"),
 (436, "Servants and palace staff"), (536, "Alms / rites / festivals"), (578, "Schemes"), (737, "Punishment / cold palace / pardon"),
 (776, "Maid status / promotion / selection"), (802, "System lines of the week book (Tong luoc)")]
def group_of(line):
    g = GROUP_EN[0][1]
    for ln, name in GROUP_EN:
        if line >= ln: g = name
    return g
first_line, SC = {}, {}
for i, l in enumerate(txt):
    m = re.match(r'^\("([^"]+)",\s*r["\'].*["\'],\s*"(.*)"\),?\s*(#.*)?$', l)
    if m and m.group(1) != "-" and m.group(2) and m.group(1) not in SC:
        SC[m.group(1)] = m.group(2); first_line[m.group(1)] = i + 1
# the same scene table the approved queue uses (prompts2.py builds SC the same way from meanings.R)
SC2 = {}
for k, rx, sc in meanings.R:
    if sc and k not in SC2 and k != "-": SC2[k] = sc
assert set(SC2) >= set(SC) and all(SC2[k] == SC[k] for k in SC), "scene table mismatch with prompts2.py"
for k in SC2: SC.setdefault(k, SC2[k]); first_line.setdefault(k, 10**6)
ORDER = list(SC2)                                # = prompts2.py --todo order (meanings.py order)
todo_all = [k for k in ORDER if k not in DONE]   # what `prompts2.py --todo 9999` prints
missing = [k for k in todo_all if "img/act-%s.webp" % k not in ASSETS]
skipped = [k for k in todo_all if "img/act-%s.webp" % k in ASSETS]

GLOSS0 = ("phi tần = imperial consort; cung nữ = palace maid; thái giám = eunuch; Hoàng thượng = the Emperor; Hoàng hậu = the Empress; "
 "Thái hậu = the Empress Dowager (about 58, dignified); ma ma = senior court lady; thái y = court physician; thị vệ = palace guard; "
 "phế phi / lãnh cung = deposed consort in the cold palace (plain undyed robes, no jewellery); tú nữ = candidate maidens; hoàng tử / công chúa = prince / princess; "
 "vạn phúc = women's standing greeting bow, hands clasped at the right side of the waist, knees slightly bent, never kneeling to greet")
GL = [x.split(" = ", 1) for x in GLOSS0.split("; ")]
def gloss(sc):
    g = ["%s = %s" % (t, e) for t, e in GL if any(w.strip().lower() in sc.lower() for w in t.split("/"))]
    return ("Glossary: " + "; ".join(g) + ".") if g else ""
DARK_GROUPS = {"Schemes", "Punishment / cold palace / pardon"}
DARK_RX = re.compile(r"độc|giết|chết|tử |khóc|sảy|hại|phạt|đánh|bắt|nhốt|trách|mắng|ghen|tố |vu oan|hãm|bùa|trộm|lén|rình|phản|hối lộ|uy hiếp|tang|bệnh nặng|ốm nặng|thương tích|vết thương|lãnh cung|phế|đuổi|bỏ rơi|thất sủng|cãi|xô|ngã|run sợ|sợ hãi|thua|trục trặc|bị che|bị chê", re.I)
NIGHT_RX = re.compile(r"đêm|khuya|trăng|tối|ngọn nến|giao thừa|dưới đèn|đèn lồng", re.I)
def is_dark(k, grp):
    sc = SC[k]
    if grp in DARK_GROUPS: return True
    return bool(DARK_RX.search(sc)) and not re.search(r"khen|thắng|mừng|vui|ban thưởng|tấn phong|sủng", sc, re.I)
COMP = [
 "high angle looking down from a gallery balcony onto a courtyard, tiny figures, strong diagonal of the roof ridge",
 "tight still-life close-up on a tabletop: the hands (small, no face) and the objects of the story fill the frame, background softly blurred",
 "wide long shot, figures very small in a large architectural space, a lot of calm empty floor and sky",
 "seen from behind one figure at the lower left, over her shoulder toward the action in the centre distance",
 "framed through a round moon window or a latticed screen in the foreground, the scene glimpsed through it",
 "low camera at floor level looking along a corridor with receding red pillars, figures as silhouettes at the far end",
 "side view as a frieze: all figures in profile far from the viewer, strictly horizontal bands of floor, wall and roof",
 "centred symmetrical view down the middle of the hall, one tiny figure on the axis, curtains and screens either side",
 "diagonal composition from a garden path, figures half hidden behind flowering branches or bamboo, faces never shown",
 "three-quarter view from a raised terrace, figures seen from behind their shoulders, the story object glowing in the middle ground",
 "close crop on sleeves, hem and footwork only (figures cut off above the chest by the frame), objects of the story in sharp focus",
 "silhouettes cast on a paper screen lit from behind, the room and the objects around the screen painted in detail",
 "reflection in still water or a polished floor carrying the scene, the real figures small at the edge of the picture",
 "view from a doorway threshold, door posts framing the left and right edges, figures turned away from the viewer",
]
PAL_L = ["jade green and cream", "peach pink and pale gold", "sky blue and soft white", "apricot and warm ivory", "lotus pink and celadon",
         "wheat gold and misty green", "fresh spring green and rosewood brown", "coral and sandalwood beige", "bamboo green and rice-paper white"]
PAL_D = ["deep indigo and umber", "deep plum and grey-green", "teal-charcoal and dull old gold", "wine red and slate blue", "midnight blue and weathered bronze",
         "dark moss green and burnt sienna", "ash grey-blue and faded vermilion"]
def kp_part(i, k):
    sc = SC[k]; grp = group_of(first_line[k]); dark = is_dark(k, grp); night = bool(NIGHT_RX.search(sc))
    comp = COMP[(h(k) + i) % len(COMP)]
    pal = (PAL_D if dark else PAL_L)[h(k + "p") % (len(PAL_D) if dark else len(PAL_L))]
    mood = S_DARK if dark else (S_LIGHT + (" The scene is at night, so use a clean warm lantern glow instead of daylight, still bright and clear." if night else ""))
    subj = ("SUBJECT (one picture = one meaning, act key «%s», meaning group: %s). Paint exactly ONE story moment, readable at thumbnail size. "
            "The moment, in Vietnamese (read it for its meaning, do not write it into the picture): «%s». %s "
            "Invent only what that sentence needs: the setting that fits a Chinese imperial harem palace, the props named in it, the people it names. "
            "Each figure holds at most ONE item. If the Emperor appears: imperial yellow robe and a small gold crown on his topknot (never a fur hat). "
            "Women in Han / Ming cross-collar hanfu with wide sleeves and long loose skirts, men never in pink or purple, no blood, no gore." ) % (k, grp, sc, gloss(sc))
    comp_p = "COMPOSITION (vary: this picture must not share its angle with its neighbours): %s. Portrait 3:4, 768x1024; keep the important action inside the central 80 %% of the picture so it survives a centre-crop to 384:506." % comp
    comp_p = comp_p.replace("80 %", "four fifths")
    colour = "Palette for this picture: %s." % pal
    return [S_STYLE_FULL, S_TAKE, subj, S_NOFACE, S_HAN, comp_p, colour, mood, S_COLOUR, S_NOTEXT], grp, dark

OUT = J3DIR
rows = []   # (group, code, key, file, size, read, note)
for i, k in enumerate(missing, 1):
    parts, grp, dark = kp_part(i, k)
    code = "AJ3-KP23-%03d" % i
    write_prompt(OUT, "act-" + k, parts, code)
    rows.append((grp, code, "img/act-%s.webp" % k, "act-%s.txt" % k, dark, k in PEND))

# ---------------------------------------------------------------- outing places (no code reads them yet: proposed keys, L10 port + land)
OUTINGS = [
 ("ngu-uyen-ngoai", "Outer imperial park (Ngự uyển ngoài)", "a large imperial hunting park and garden beyond the palace walls: wide meadow, old pines, a stone bridge over a stream, a small pavilion on a rise, distant palace roofs on the horizon, a few tiny riders and carriages far away in silhouette", "LIGHT"),
 ("chua-ho-quoc", "Hộ Quốc temple (chùa Hộ Quốc)", "a hillside Buddhist temple outside the capital: stone steps climbing through misty pines to a tiered-roof hall with a bronze incense burner in the forecourt, ginkgo leaves on the steps, a few tiny monks and pilgrims far away in grey robes seen from behind", "LIGHT"),
]
for key, nm, scene, tone in OUTINGS:
    for sfx, ar, px in (("port", "portrait 3:4", "768x1024"), ("land", "landscape 4:3", "1024x768")):
        code = "AJ3-OUT-%02d" % (len(rows) - len(missing) + 1)
        parts = [S_STYLE, S_TAKE, "SUBJECT: an empty establishing backdrop of %s: %s." % (nm, scene), S_NOFACE,
                 "COMPOSITION: %s, %s; open calm ground in the lower third, the main building or landmark in the upper middle, depth through three planes (near foliage, middle ground, far horizon)." % (ar, px),
                 S_LIGHT, S_COLOUR, S_NOTEXT]
        write_prompt(OUT, "outing-%s-%s" % (key, sfx), parts, code)
        rows.append(("Outer outing places (map stage picture)", code, "(no key yet) proposed img/outing-%s-%s.webp" % (key, sfx), "outing-%s-%s.txt" % (key, sfx), False, False))

# ---------------------------------------------------------------- M45 mini-game tall figure-column backdrops
JS = "".join(open(os.path.join(ROOT, "dev", "build", f), encoding="utf-8").read() for f in
             ("j82.js", "j91.js", "jexam.js", "jmgx.js", "jtd.js", "jslap.js", "j92.js", "jhd.js", "jpma.js", "jnwp.js"))
SCEN = {  # kind -> what the figure-column backdrop paints (English). One distinct place per subject. Names are read from the code below.
 "dan": "a moonlit garden terrace for guqin playing: a low zither table on a stone terrace, plum branches in bloom hanging in from the top corner, a bronze incense burner, soft mist over a lotus pond far below",
 "hat": "a lakeside song pavilion at dusk: a curved wooden railing, paper lanterns strung along the eaves, reeds and low willow at the water edge, a faint rose-gold sky",
 "co": "a quiet scholar's pavilion for the game of Go: an empty stone Go table with two closed bowls of stones set to one side, bamboo screens, a pine bough, morning light",
 "co7": "a plain garden tea-house for five-in-a-row: a low lacquered game table with two bowls of black and white stones, a bamboo blind half raised, a maple branch with red leaves",
 "dauho": "a courtyard laid for the arrow-throwing game: a tall bronze pot stands on the paving at the lower middle, a few painted arrows in a quiver, hanging silk pennants, a moon gate behind",
 "ban": "an archery ground beside a palace wall: a round straw target on a wooden stand, a quiver and a bow rack, fluttering pennants, bright blue morning sky",
 "tho": "a calligraphy study: a long desk with brush stand, ink stone and a rolled paper, bamboo shadows on a paper window, warm lamplight",
 "doi": "a hall with two tall empty hanging scrolls either side of a doorway (blank, no text), ink stones and brushes on small tables, a bonsai pine",
 "doden": "a lantern festival lane at night: rows of hanging silk lanterns in many shapes and colours receding along a covered walkway, warm glow",
 "ve": "a painter's pavilion: an easel-like screen with a half-finished misty mountain painting (no text), ink and colour dishes on a low table, a window onto bamboo",
 "hoa": "a flower-arranging room: a low table with a tall celadon vase, freshly cut branches and blossoms in a basket, scissors, a round window onto spring peonies",
 "theu": "an embroidery chamber: a wooden embroidery frame holding a silk panel with a half-finished lotus pattern, silk threads in many colours on a rack, soft window light",
 "kim": "a paper-cutting workroom: red and gold papers, small scissors, finished cut-outs pinned on a lattice window, warm lamp",
 "mua": "a dance pavilion with a polished wooden floor: long silk ribbons hung from the rafters, a drum on a stand, an open stage, golden afternoon light",
 "banh": "a palace kitchen: a clay stove with glowing embers, steaming bamboo baskets, hanging copper pots and herb bundles, warm orange firelight",
 "huong": "an incense chamber: shelves of small porcelain jars and bronze burners, thin smoke curling upward in soft ribbons, a sandalwood table, dim amber light",
 "chai": "a dressing room: a large bronze mirror on a stand, a lacquer cosmetic case, combs and hairpin boxes, silk curtains, soft pink morning light",
 "hoadien": "a dressing table with a polished bronze mirror, a small lacquer tray of golden flower stickers, a hanging silk curtain, candlelight",
 "le": "a ritual hall of the Household Department: a long altar table with bronze vessels set out in order, red pillars, yellow silk hangings, incense haze",
 "tc": "a palace storeroom: tall wooden shelves with sealed jars, silk bolts and lacquer boxes, labelled doors in the background (no text), dusty shafts of light",
 "xa": "a magistrate's side hall: a heavy desk with an evidence tray (a robe sleeve, a small jade charm), a screen with a painted tiger, cold grey light",
 "thq": "a banquet hall laid for a feast: low tables in rows with cushions, the high dais at the far end under a canopy, hanging lanterns, ceremonial order",
 "nghe": "an eavesdropping corner: a covered corridor beside a latticed wall, a half-open lattice window with a lantern beyond, shadows of two silhouettes behind paper, dark mood",
 "truyen": "a back corridor where messages are passed: a narrow gallery with many doors, a folded letter on a small table, hanging lanterns swaying, a messenger silhouette far away",
 "mac": "a covered market lane outside the palace gate: stalls with silk and jade on display, scales and a small abacus on a counter, awnings, busy and warm",
 "thoico": "a quiet garden path at the edge of a pond in the rain: stepping stones, a stone bridge, a hanging lantern, waiting stillness",
 "thu_tam": "a pet courtyard: a small cushion and a comb tray on a sunny veranda, a wicker basket, peony pots, soft light",
 "thu_choi": "a sunny palace lawn with a low rock garden: a small embroidered ball and a ribbon lying on the grass, butterflies, bright light",
 "tuoi": "a potted-plant terrace: rows of porcelain pots with orchids and bonsai, a copper watering can and a small ladle, a stone wall with trailing vines, morning dew",
 "tat": "a stern corridor: a raised wooden step, red walls and heavy doors, a bamboo ruler hung on the wall, hard side light, tense and dark",
 "ne": "a narrow side alley between two palace walls: shadow on the left, a patch of light on the right, a swung-open door, tense and dark",
 "td_cong": "a stitch workroom: pale silk stretched on a frame, a needle and a skein of thread ready on it, bright window light, cloud pattern drawn in faint ink on the cloth",
 "td_dung": "a long palace hall seen from the front: polished floor, a straight line of red pillars, a bowl on a low stand at the near edge, balanced and calm",
 "td_ngon": "an audience chamber with a screen and two cushions facing each other, a tea tray between them, soft lamplight, hushed",
 "td_hanh": "a charity courtyard: rows of steamed buns and rice bowls on long tables, baskets of grain, a gate opening onto the street, warm light",
}
KINDS = ["dan","hat","co","co7","dauho","ban","tho","doi","doden","ve","hoa","theu","kim","mua","banh","huong","chai","hoadien","le","tc","xa","thq",
         "nghe","truyen","mac","thoico","thu_tam","thu_choi","tuoi","tat","ne","td_cong","td_dung","td_ngon","td_hanh"]
def kname(k):
    m = re.search(r"\b%s:\{e:\"\w+\"[^{}]*?n:\"([^\"]+)\"" % k, JS) or re.search(r"KG82_KIND\.%s=\{e:\"\w+\",n:\"([^\"]+)\"" % k, JS)
    return m.group(1) if m else {"kim": "Khéo tay", "ve": "Vẽ", "hoa": "Cắm hoa"}.get(k, k)
M45_DARK = {"nghe", "tat", "ne"}
assert set(SCEN) == set(KINDS), set(SCEN) ^ set(KINDS)
m45rows = []
for i, k in enumerate(KINDS, 1):
    code = "AJ3-M45-%02d" % i; dark = k in M45_DARK
    comp = ("TALL NARROW PORTRAIT backdrop, generate 2:3 portrait (1024x1536). On screen it is shown inside a column about 0.30 to 0.35 times as wide as it is tall, "
            "covering and centre-cropped, so keep ALL important painting inside the central vertical strip (the middle 45 percent of the width) and let the left and right "
            "sides carry only soft continuing scenery. The player's own figure stands in front of this painting at the lower centre of the column, filling about the whole height: "
            "leave the lower two thirds of the central strip calm and open (floor, ground or a quiet low table surface), with no person, no animal and no large object there. "
            "Put the story elements of the place in the upper third and at the sides, receding in depth. NO person, NO face, NO figure anywhere in this painting (the player's own figure is placed on top by the game).")
    parts = [S_STYLE, S_TAKE, "SUBJECT: the empty setting for the mini-game «%s» (kind %s): %s." % (kname(k), k, SCEN[k]), comp,
             S_DARK if dark else S_LIGHT, "Palette: %s." % ((PAL_D if dark else PAL_L)[h(k + "m") % (len(PAL_D) if dark else len(PAL_L))]), S_COLOUR, S_NOTEXT]
    write_prompt(OUT, "mgbg-" + k, parts, code)
    m45rows.append((code, "img/mgbg-%s.webp" % k, "mgbg-%s.txt" % k, kname(k), dark))
save_codes("J3")
json.dump({"missing": missing, "skipped_exists": skipped, "pending_in_missing": [k for k in missing if k in PEND],
           "rows": [list(r) for r in rows], "m45": [list(r) for r in m45rows]}, open(os.path.join(J3DIR, "_gen_state.json"), "w"), ensure_ascii=False, indent=0)
print("KP23 missing", len(missing), "skipped", len(skipped), "outings", 2 * len(OUTINGS), "M45", len(m45rows))

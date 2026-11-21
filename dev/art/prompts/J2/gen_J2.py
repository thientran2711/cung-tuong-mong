#!/usr/bin/env python3
"""J2 ICONS / SPRITES (KP08 weather icons + fogbank, KP10 Đa Bảo Các rail icon + cabinet + cut-outs, KP11 ico-tin + ico-alert).
Item keys, groups, grade, names READ from dev/build/jshelf.js (BAL.shelf.it, name table D); 'already has a picture' = img/item-<key>.webp in assets.json.
Subject paragraphs are written per picture below (SUBJ), from the game's own name + one-line meaning."""
import sys, os, re, json
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(HERE, ".."))
from _lib import *
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
rd = lambda p: open(os.path.join(ROOT, p), encoding="utf-8").read()
OUT = os.path.join(HERE, "J2")   # NB: _lib's star import rebinds HERE
WHITE = ("Background: plain solid chroma-free pure white (#FFFFFF), the object isolated on it with a soft clean edge and NO ground, NO shadow on a floor, NO table, "
         "NO other object, so the owner can cut the background out later.")
ICON_SIL = ("Make it read at 24 to 64 px: a bold simple silhouette, ONE clear object, large simple shapes, no tiny detail, no thin hairlines.")
rows = []; n = [0]
def emit(key, parts, tag, target, refs, readat, note):
    n[0] += 1
    code = "AJ2-%s-%02d" % (tag, n[0])
    write_prompt(OUT, key, parts, code)
    rows.append((code, key, target, refs, readat, note))

# ---------------- KP08 weather icons (4) ----------------
# j93.js:268/273 reads img/kit/mo-wx-<k>.webp (20 px chip, 40 px popup); KM_WX map j93.js:256; keys requested KIT_REQUESTS.md:51-52; reuse today jclose.js:62-69
WX = [
 ("mo-wx-amu", "trời âm u / chiều âm u / đêm u ám (an overcast grey day)",
  "ONE heavy overcast cloud: a broad, soft, rounded grey-blue cloud mass made of three or four plump lobes, flat underside, lit gently from above-left so the top is pale pearl and the underside a soft slate grey-blue. A few quiet cloud-scroll curls (xiangyun style) trace its edge. Nothing else: no sun, no rain, no bird.",
  "front view, the cloud centred and filling about 70 percent of the square"),
 ("mo-wx-muarao", "mưa rào / mưa thu (a sudden shower, autumn rain)",
  "ONE small dark-grey-blue rain cloud with a short, slanting curtain of five or six bold rain streaks falling from it, each streak a thick tapered stroke of cool blue with a pale highlight; one round raindrop splashing at the lower end of the longest streak. The streaks lean slightly to the right as if driven by a gust.",
  "the cloud in the upper half, the streaks falling through the lower half, the whole group slightly diagonal and centred"),
 ("mo-wx-giolon", "gió lớn / gió bấc (strong wind, cold north wind)",
  "ONE bold wind gust drawn as three thick flowing ribbon-like swirls curling to the left in the classic Chinese wind-and-cloud style (like carved cloud scrolls), pale blue-white with soft grey-blue shading, the middle swirl longest and ending in a tight spiral; two dry leaves, one golden and one russet, tumble along inside the swirls.",
  "the swirls sweeping horizontally across the square, centred, the leaves near the spirals"),
 ("mo-wx-suongmu", "sương mù / chiều sương mù / đêm sương mù (thick fog)",
  "ONE thick fog bank drawn as three horizontal, overlapping, soft-edged banners of milky white and pale grey-blue mist stacked with slight offsets, with the dark silhouette of one small pavilion roof and one pine branch just visible and half swallowed in the mist behind the top banner (flat simple shapes, no detail).",
  "frontal, banners stacked low to high, the group centred and filling about 75 percent of the square; the mist is milky and soft but its outline stays clear on white"),
]
for key, words, subj, comp in WX:
    emit(key, [S_STYLE, S_TAKE,
      "Subject: a small painted WEATHER ICON for the game's weather chip, the weather named \"%s\". %s" % (words, subj),
      "Same painted look, line weight, shading and palette family as the game's existing weather icons mo-wx-suongsom, mo-wx-muaphun and mo-wx-gioheomay (attach one as the second reference and match its painting, size of the object in the square and softness). Composition: %s. 1:1 square. %s" % (comp, ICON_SIL),
      WHITE, S_LIGHT, "Mood: calm and readable; the weather is clear at a glance, not frightening.", S_COLOUR, S_NOTEXT], "KP08",
      "1024x1024 PNG on white -> owner cuts out -> transparent webp at the SAME size as the existing img/kit/mo-wx-*.webp (match it; shown 20 px chip + 40 px popup)",
      "REF_STYLE + existing img/kit/mo-wx-suongsom.webp (CDN)", "j93.js:256 (KM_WX), 268, 273; jclose.js:62-69 (WX_BUOI icon names)",
      "after landing: jclose WX_BUOI icon names -> amu / muarao / giolon / suongmu + one KM_WX line each in j93.js:256")

# ---------------- KP08 fogbank sprite (2 variants) ----------------
# jfx.js:199-209 mist*/cloud* rows use k:["smoke"]; KIT_REQUESTS.md:54 asks fx-fogbank 512x256 webp, 2 variants, alpha edges, tinted grey by code
for v, look in ((1, "a long low bank with a gently rolling top edge, three soft puffs rising slightly higher on the left, fading thin and ragged on the right"),
                (2, "a long layered bank made of two overlapping bands, the upper band thinner and wispier, the lower band thicker, the whole bank slightly tilted, with a thin ragged tail at the left end")):
    emit("fx-fogbank-%d" % v, [S_STYLE, S_TAKE,
      "Subject: a soft wide horizontal FOG / CLOUD BANK sprite (variant %d of 2) that the game's weather layer drifts slowly across a picture; the code tints it grey for the overcast weather and keeps it white for fog. Painted as milky white with the faintest warm-grey and pale blue-grey shading: %s. Soft feathered edges that fade out completely; no hard outline, no sun, no sky, no ground, no pavilion, no tree, nothing inside the mist." % (v, look),
      "Composition: wide banner, the bank centred and spanning almost the full width with a clear margin top and bottom and at both ends; looks tileable (left and right ends fade to nothing). Aspect 2:1 (target 512x256; ask for 1536x768 if allowed). It must stay visible on a pure white background (the grey-blue shading carries the shape) so it can be cut out later.",
      WHITE, "Mood: quiet, airy and soft, daylight.", S_COLOUR, S_NOTEXT], "KP08",
      "2:1 (1536x768) PNG on white -> owner cuts out (soft alpha) -> webp 512x256, <= 40 KB",
      "REF_STYLE", "jfx.js:199-209 (cloud1/cloud/cloud3, mist1/mist/mist3 `k:[\"smoke\"]`); KIT_REQUESTS.md:54",
      "key fx-fogbank-%d; code change after landing = swap `k:` name in KF_WX mist*/cloud* only" % v)

# optional heat glare (KIT_REQUESTS.md:54 (2); jfx.js:199-204 heat rows use glowburst)
emit("fx-heatglare", [S_STYLE, S_TAKE,
  "Subject: a soft warm GLARE PATCH sprite for the nắng gắt (scorching sun) weather layer: a round soft cloud of warm cream-gold light, brightest in a pale centre and fading smoothly to nothing at the rim, with the faintest orange tint on the outer ring and a few soft lens-like ripples. No sun disc, no rays, no hard edge, no object.",
  "Composition: square 1:1, the glow centred with clear margin so it fades fully before the edge. Target 256x256.",
  WHITE + " (the glow fades to white at the rim so it can be cut to alpha later)", "Mood: hot, bright, summery, soft.", S_COLOUR, S_NOTEXT], "KP08",
  "1:1 (1024x1024) PNG on white -> alpha -> webp 256x256", "REF_STYLE", "jfx.js:200-202 (heat1/heat/heat3 `k:[\"glowburst\"]`); KIT_REQUESTS.md:54 (2)",
  "OPTIONAL (the order lists only fogbank; heat glare is the optional second item of the same request)")

# ---------------- KP11 icons ----------------
# jerr.js:80 kitStatusIcon id "tin" (glyph 信 until ico-tin); KIT_REQUESTS.md:92 (folded letter with a red seal, 128 px, same family as ico-download/ico-update)
emit("ico-tin", [S_STYLE, S_TAKE,
  "Subject: a small painted STATUS ICON \"Tin\" (a letter or message: someone has been sent away, or a report is back): ONE folded paper letter lying slightly rotated, cream rice paper with a thin soft-red band folded across the middle, sealed with ONE round red wax seal at the fold; a short loose tail of red silk cord hangs from the seal. Nothing else.",
  "Painted exactly like the game's icons ico-download.webp and ico-update.webp (attach one; match line, shading, how much of the square the object fills). Composition: the letter at a gentle 20 degree tilt, seen slightly from above, centred, filling about 70 percent of the square. 1:1. " + ICON_SIL,
  WHITE, S_LIGHT, "Mood: neutral, a message arriving.", S_COLOUR, S_NOTEXT + " The seal carries no character, only a plain round shape with one small ring."], "KP11",
  "1024x1024 PNG on white -> transparent webp 128x128 (~7 KB), same as ico-download", "REF_STYLE + existing img/kit/ico-download.webp (CDN)",
  "jerr.js:80 (kitStatusIcon.set id tin); KIT_REQUESTS.md:92", "after landing: add icon:\"img/kit/ico-tin.webp\" and drop glyph in jerr.js:80")
# jstagehere.js:9 K-ICO-ALERT KIT_REQUESTS.md:97 (closing palace gate or hanging bell, square rail icon, family of ico-cal/ico-goal)
emit("ico-alert", [S_STYLE, S_TAKE,
  "Subject: a small painted ALERT ICON \"Sắp đóng cửa\" (a place is about to close): ONE small palace gate seen from the front, its two red-lacquered doors closing toward each other with a narrow slit of warm light between them, a grey-green tiled roof with upturned eaves above, one hanging brass door-ring on each door, a tiny gold lantern hanging under the eave. Nothing else around it.",
  "Painted exactly like the game's rail icons ico-cal.webp, ico-goal.webp and ico-room.webp (attach one; match line, shading and fill). Composition: straight frontal view, gate centred, filling about 75 percent of the square, the slit of light as the one bright accent. 1:1. " + ICON_SIL,
  WHITE, S_LIGHT, "Mood: a gentle warning, not alarming.", S_COLOUR, S_NOTEXT], "KP11",
  "1024x1024 PNG on white -> transparent webp 128x128", "REF_STYLE + existing img/kit/ico-room.webp (CDN; the same red door look)",
  "jstagehere.js:9, 37 (the ONE alert now lives in the top-bar kitNotice box); KIT_REQUESTS.md:97", "note: r4 removed the stage-rail item (jstagehere.js:37); C/keeper decides which element shows the icon")

# ---------------- KP10 rail icon + cabinet ----------------
emit("ico-disp", [S_STYLE, S_TAKE,
  "Subject: a small painted RAIL ICON for \"Đa Bảo Các\" (the curio cabinet where she displays treasures): ONE small curio cabinet of dark red-brown carved wood with a gold trim, three open shelves in a zigzag layout, a tiny blue-white vase on the top shelf, a small green jade piece on the middle shelf and a little gold ingot on the bottom shelf. Simple, bold, no tiny ornament.",
  "Same family as the game's rail icons ico-cal / ico-room / ico-goal (attach one; match line, shading and fill). Composition: front view, cabinet centred, slightly taller than wide, filling about 75 percent of the square. 1:1. " + ICON_SIL,
  WHITE, S_LIGHT, "Mood: proud, warm, collectible.", S_COLOUR, S_NOTEXT], "KP10",
  "1024x1024 PNG on white -> transparent webp 128x128", "REF_STYLE + existing img/kit/ico-cal.webp (CDN)",
  "jdisp.js:153 (rail icon now img/kit/ico-room.webp placeholder); KIT_REQUESTS.md:73", "key img/kit/ico-disp.webp; after landing change `icon:` in jdisp.js:153")

CAB_COMMON = ("Subject: the PAINTED CURIO CABINET (đa bảo các) of the game's display room, an empty cabinet drawn straight on from the front, dark red-brown carved hardwood (huanghuali look) with fine gold inlay trim, "
  "every compartment an open niche with a warm cream silk-paper back wall and a flat wooden shelf plank along its bottom edge (the plank is the floor line where pieces will stand), staggered frame bars between the niches, "
  "a little pierced-lattice corner ornament on some bars, and tiny feet at the base. The niches are EMPTY: no vase, no object, no plant, no figure in any niche. ")
emit("cabinet-land", [S_STYLE, S_TAKE, CAB_COMMON + "Layout: EXACTLY 2 columns by 6 rows = 12 equal rectangular niches, each niche about 4.5 times wider than tall (low, wide shelves), the 6 rows of equal height, thin frame bars between them, the cabinet fills the whole picture edge to edge.",
  "Composition: landscape 3:2 (1536x1024), the cabinet fills the whole frame; flat frontal view, no perspective, soft even light, a faint warm shadow inside each niche under its top bar.",
  "Background: the cabinet IS the whole picture (no outer wall, no floor, no white); every niche is the same cream colour.", S_LIGHT, "Mood: stately, warm, calm.", S_COLOUR, S_NOTEXT], "KP10",
  "1536x1024 webp (3:2), opaque, <= ~250 KB; slot points (cx, fy, w, h as fractions) are then measured -> reports/display-bg.md", "REF_STYLE",
  "jdisp.js:23 (KDR_PIC.land, ar 1.5, gridSlots(2,6)); KIT_REQUESTS.md:76", "land = ONE picture 2x6 for iPad landscape (kv2)")
for i in (1, 2):
    emit("cabinet-port-%d" % i, [S_STYLE, S_TAKE, CAB_COMMON + "Layout: EXACTLY 1 column by 6 rows = 6 equal rectangular niches stacked, each niche about 4 times wider than tall, the cabinet fills the picture edge to edge. This is part %d of 2 stacked parts of ONE tall cabinet (12 niches in all): %s" % (i,
      "the TOP part: the carved cornice and top rail of the cabinet run across the top edge, the bottom edge is a plain frame bar that continues into part 2." if i == 1 else
      "the BOTTOM part: the top edge is a plain frame bar that continues from part 1, the base rail and the small carved feet run along the bottom edge."),
      "Composition: portrait 2:3 (1024x1536), flat frontal view, no perspective, soft even light; both parts use the same wood, gold trim and cream niche colour so they join without a seam.",
      "Background: the cabinet IS the whole picture (no outer wall, no floor, no white).", S_LIGHT, "Mood: stately, warm, calm.", S_COLOUR, S_NOTEXT], "KP10",
      "1024x1536 webp (2:3), opaque, <= ~250 KB each; slot points measured afterwards", "REF_STYLE + part 1 (when painting part 2)",
      "jdisp.js:24 (KDR_PIC.port = ONE seg `cabinet-port.webp` ar .42 gridSlots(1,12)); KIT_REQUESTS.md:76 (`cabinet-port*.webp`)",
      "part %d of 2 - needs `segs:[{src:cabinet-port-1,ar:.667,gridSlots(1,6)},{cabinet-port-2,...}]` in jdisp.js:24 (see Open questions 1)" % i)

# ---------------- KP10 cut-outs ----------------
src = rd("dev/build/jshelf.js")
it_blk = re.sub(r"/\*.*?\*/", "", src[src.index(" it:{"):src.index(" per:5")], flags=re.S)
ITEMS = re.findall(r'(\w+):\{g:"(\w+)"([^}]*)\}', it_blk)
NAME = dict((k, v) for k, v in re.findall(r'(\w+):\["([^"]+)","[^"]+"\]', src[src.index("(function(){const D={"):src.index(" const P=BAL.shelf.it;for(const k in D)")]))
DESC = dict((k, v) for k, v in re.findall(r'(\w+):\["[^"]+","([^"]+)"\]', src[src.index("(function(){const D={"):src.index(" const P=BAL.shelf.it;for(const k in D)")]))
HAVE = {x[0] for x in json.load(open(os.path.join(ROOT, "assets.json")))["files"]}
GROUPN = dict(re.findall(r'\["(\w+)","([^"]+)"\]', src[src.index(" groups:[["):src.index(" it:{")]))
GRAD = ["Thường", "Tinh phẩm", "Trân phẩm", "Tuyệt phẩm", "Ngự tứ"]
MAT = ["a humble everyday finish: plain glaze or plain wood, simple shapes, one modest accent colour",
       "a fine finish: clean crisp craft, a little gold or fine pattern, two refined accent colours",
       "a rich finish: delicate fine detail, gold inlay or rare material, a refined accent palette",
       "a superb finish: masterwork detail, gold and gems, a rich but soft palette",
       "an imperial treasure finish: flawless craft, imperial yellow and gold accents, a very luminous precious look"]
# SUBJ[key] = (what is painted, view/angle)   one per picture, written from the item's own name + meaning
SUBJ = {
 "cuc": ("a glazed round pot of golden-yellow chrysanthemums in full bloom, the layered curled petals bright yellow with a few cream ones, dark glossy leaves, standing on a small wooden stand", "front, slightly above"),
 "maitrang": ("a squat blue-glazed pot holding a short gnarled plum branch crowded with white five-petal blossoms and a few red buds, the bark dark and mossy", "three-quarter from the left"),
 "thuytien": ("a shallow oval white-porcelain water bowl with pebbles, narcissus bulbs sprouting long green leaves and small white blossoms with golden cups", "front, low angle"),
 "maudon": ("a large pot of one huge pink-and-crimson peony with ruffled layered petals and a golden centre among broad serrated leaves, on a carved red wooden stand", "front, centred"),
 "haiduong": ("a glazed pot of crab-apple blossom (hải đường) with clusters of deep rose-pink five-petal flowers drooping on a slender dark branch, glossy leaves", "three-quarter from the right"),
 "caytung": ("a bonsai pine shaped in tiered cloud-pads on a twisting trunk, planted in a rectangular green-glazed tray with a small moss mound and one tiny stone", "front, slightly from the left"),
 "phatthu": ("a blue-and-white bowl planted with a small citron tree, one finger-shaped golden Buddha's-hand citron among green leaves", "three-quarter from the right"),
 "caykho": ("a plain glazed pot holding a dead dry plant: bare brown snapped stalks, a few curled brittle leaves, dry cracked soil", "front, slightly above"),
 "binhsu": ("a tall blue-and-white (thanh hoa) vase with a rounded body, a slim neck and a lotus-and-wave pattern in cobalt on white glaze", "front"),
 "dialt": ("a wide shallow celadon dish of soft jade-green glaze with a faint incised lotus, standing on its edge in a tiny black wooden stand", "slightly from the right"),
 "maibinh": ("a meiping vase with a small mouth, swelling shoulder and slim waist in deep cobalt-blue glaze, holding ONE plum-blossom branch", "front"),
 "cuudao": ("a round porcelain plate on a wooden stand painted with a peach tree bearing nine soft pink peaches among green leaves", "front, plate tilted slightly back"),
 "phanthai": ("a famille-rose (phấn thái) vase with a round belly painted with flowers and two small birds in soft pink, green and rose-gold, gilded rim and handles", "three-quarter from the left"),
 "dauthai": ("a tiny doucai cup with a flared mouth, painted outside with a hen and chicks in soft red, green and blue outlines, placed on a small carved wooden stand", "front, slightly above"),
 "nhudieu": ("a Ru-ware vase of a single pale sky-blue crackled glaze, simple elegant bottle form with a slender neck, on a small carved gold-lacquer base", "front, centred"),
 "holo": ("a small calabash gourd carved from pale green jade, the two-lobed body with a tiny knotted red silk cord around its waist", "three-quarter"),
 "tuan": ("a small square seal of blue-green jade with a carved crouching lion on top, an ink pad of red paste beside it, one soft red seal impression on a tiny paper scrap", "slightly from above"),
 "nhuy": ("a ruyi sceptre of pale green jade with a cloud-head tip, a gently curved shaft and a small red tassel, lying on a small silk cushion", "diagonal, slightly from above"),
 "sanho": ("a branching tree of red coral, thick coral-red twigs, standing on a round carved wooden base", "front, centred"),
 "caithao": ("a jadeite cabbage with white stalk and green leaves carved naturally, a tiny locust and katydid perched on the leaves", "three-quarter from the right"),
 "ngocson": ("a small mountain of green jade carved with tiny cliffs, pine trees and a river with figures too small to see, on a carved wooden stand", "front, slightly from the left"),
 "ngocty": ("a small square imperial jade seal, creamy white, with a coiled dragon on top, a short yellow silk tassel", "three-quarter, slightly from above"),
 "caudoi": ("a pair of vertical red paper couplet scrolls hanging side by side from small gold rods, edged with gold-thread embroidery, the strips blank except for a few abstract gold brush strokes (no readable characters)", "front"),
 "chuphuc": ("a square sheet of red paper pinned flat, with one big bold gold brush-stroke flourish suggesting a calligraphy character (abstract, not readable text), a tiny red seal in the corner", "front"),
 "mynhan": ("a hanging scroll painting on cream silk in a brocade mount, showing one small beauty seen from far behind in a garden, tiny, no face visible, soft colours, with rollers of dark wood", "front"),
 "luhuong": ("a small three-legged round bronze incense burner with two ear handles and a lid pierced with holes, a thin curl of pale smoke rising", "three-quarter from the left"),
 "tuyenduc": ("a squat Xuande red-copper censer with a flared rim, two ear handles and a deep reddish gold sheen, a thin wisp of smoke", "front, slightly above"),
 "phaplam": ("a four-legged cloisonne (pháp lam) incense burner with a turquoise-blue enamel body and gold wire flower patterns, a lid with a lotus knob", "three-quarter from the right"),
 "luhac": ("a bronze incense burner shaped like a standing crane with raised wings, a thin curl of smoke rising from its open beak", "side view, facing left"),
 "hoannghi": ("a small lidded gilt box with a red silk bag, a stick of sweet incense lit beside it with a thin curl of smoke, a few dried petals at its foot", "slightly from above"),
 "hophuong": ("a round lidded bronze incense box with a tiny spoon and a pair of incense tongs leaning against it", "three-quarter from the right"),
 "chuongso": ("a wind chime of seashells: six small pearly pink and white shells strung on silk threads below a short bamboo bar, hanging", "front"),
 "chuonggio": ("a brass wind bell hung from a short red cord, a rounded bell with a flared rim and a thin clapper with a small paper tag (blank)", "front, slightly from the left"),
 "chuongngoc": ("a wind chime of seven jade plaques of graduated length in pale green, strung on silk threads from a carved wood bar", "front"),
 "chuongpl": ("a wind chime of clear crystal prisms of different lengths hanging from a slim gilt bar, soft sparkles of light on them", "front"),
 "thietma": ("a small bronze eave bell with a curled top loop, a rounded bell body and a flat tongue-shaped clapper with a tiny tag", "three-quarter"),
 "remtruc": ("a bamboo blind half rolled up: slim green-yellow bamboo slats bound by dark thread, a red cord on one side", "front"),
 "banbinh": ("a small tabletop screen of three panels in a dark wooden frame, silk embroidered with a pair of mandarin ducks and lotus in soft colours (Suzhou embroidery)", "slightly from the left"),
 "remlua": ("a thin pale-pink silk curtain tied back at one side with a cord, falling in soft folds and slightly translucent", "front"),
 "remchau": ("a bead curtain: many strings of small pearls and jade beads hanging in parallel from a gilded bar, glinting softly", "front"),
 "bpxacu": ("a small black lacquer screen of two panels inlaid with mother-of-pearl cranes and pines, shimmering with pearly colours", "slightly from the right"),
 "bpngubut": ("a three-panel tabletop screen painted with the four gentlemen (plum, orchid, bamboo, chrysanthemum) in elegant ink brushwork, a gilded frame", "front"),
 "tuminh": ("a Western mantel clock in a gilt case with a round white dial, thin hands, a little brass figure on top (no readable numerals: simple tick marks only)", "front, slightly from the left"),
 "hopnhac": ("a small Western music box in a wooden case with the lid half open, a tiny brass comb and a tiny gold dancer inside, a key winder at the side", "three-quarter from the right"),
 "guongtay": ("a Western round hand mirror with a gilded rococo frame and a glass that reflects only soft light-blue sky (nothing reflected)", "tilted, slightly from the left"),
 "kinhvv": ("a brass telescope with a leather-wrapped barrel, sliding sections and a small tripod stand", "diagonal from the lower left to the upper right"),
 "diacau": ("a small terrestrial globe with soft blue seas and cream-green continents (no names) in a polished wooden ring on a turned stand", "front"),
 "nhatquy": ("a brass sundial: a flat round bronze plate with engraved hour marks (plain marks, no numerals) and a triangular gnomon casting a short shadow", "slightly from above"),
 "quattron": ("a round silk fan (tuan shan) with a pale cream silk face painted with a tiny branch of plum, a short carved handle and a small red tassel", "front, slightly tilted"),
 "quatgap": ("a folding fan of bamboo ribs, half open, the paper painted with a bamboo grove and a bird, a small jade pendant on a cord at the base", "slightly from the left"),
 "quatdh": ("a sandalwood fan with thin carved openwork blades, half open, warm honey-brown wood, a silk cord with a tassel", "slightly from the right"),
 "quatcong": ("a peacock-feather fan: a fan of iridescent blue-green feathers with eye spots, on a slender gilded handle", "front, slightly tilted"),
 "quattri": ("a very long pheasant-feather ceremonial fan of golden-brown and white striped feathers on a tall gilded pole with a yellow silk tassel", "front, tall"),
 "hoami": ("a brown thrush (họa mi) with a pale eye ring perched in a small round bamboo cage with a ring on top for hanging, a tiny water cup", "front, slightly from the left"),
 "vet": ("a green parrot with a red beak and a yellow cheek on a brass perch stand with a tiny seed cup, tail feathers long and blue-tipped", "side view, facing right"),
 "kimngu": ("a round white-porcelain fishbowl with blue lotus painting, clear water, two fat goldfish with flowing fantail fins, a few green water-plant strands", "front, slightly above"),
 "de": ("a tiny round bamboo cricket cage with a bone lid, a small brown cricket visible between the bars", "three-quarter, slightly from above"),
 "longtrong": ("an EMPTY round bamboo bird cage, door ajar, a dry seed cup, a single grey feather on the floor of the cage", "front, slightly from the left"),
 "saotruc": ("a slim bamboo flute (sáo trúc) hung horizontally from two silk cords on a small wooden rack, a red tassel at one end", "front"),
 "tyba": ("a pipa lute with a pear-shaped body of dark wood inlaid with ivory-coloured patterns, a bent-back neck with four tuning pegs, resting upright", "front, slightly rotated"),
 "dantranh": ("a small zheng zither of dark wood on two low feet, a row of silk strings over ivory bridges, the end carved with gold clouds", "diagonal, slightly from above"),
 "ngocdich": ("a flute carved from pale green jade with finger holes and a red silk tassel, resting on a small silk cushion", "diagonal, slightly from above"),
 "tranchi": ("a pair of jade paperweights of pale green nephrite shaped like two small crouching lions beside a short strip of paper", "three-quarter from the left"),
 "thaiho": ("a small Taihu scholar's rock of grey-blue stone, full of holes and hollows, on a carved wooden base", "front, slightly from the left"),
 "cungdang": ("a hanging silk palace lantern, hexagonal, pale pink silk panels with painted plum branches, a red tassel at each corner, a gold top ring", "front"),
 "daminh": ("a perfectly round luminous pearl of pale green-white glow resting on a carved golden dragon-claw stand, a soft halo of light", "front"),
 "sonthuy": ("a hanging scroll on cream silk in a brocade mount, showing a misty landscape of blue-green mountains, a river and a tiny pavilion, wooden rollers", "front"),
 "hoadieu": ("a hanging scroll on cream silk in a brocade mount, showing a small bird perched on a blossoming branch, delicate colours, wooden rollers", "front"),
 "butlong": ("a long bamboo-handled writing brush with a pale pointed tip resting on a small pale jade brush rest", "diagonal"),
 "muchuy": ("a thick black ink stick shaped like a rectangular bar with gold characters-like ornament (abstract strokes, not readable) lying on a small wooden tray", "slightly from above"),
}
PIX = re.compile(r"[^a-z0-9]")
missing_subj = []; made = []; skipped = []
for k, g, rest in ITEMS:
    if "img/item-%s.webp" % k in HAVE:
        skipped.append(k); continue
    if k not in SUBJ:
        missing_subj.append(k); continue
    gr = 4 if "imp:1" in rest and "gr:" not in rest else int((re.search(r"gr:(\d)", rest) or [0, 0])[1] if re.search(r"gr:(\d)", rest) else 0)
    dead = "dead:1" in rest
    what, view = SUBJ[k]
    mood = S_DARK + " The mood belongs to the object colours only (muted, dried, faded); the background stays pure white." if dead else S_LIGHT
    emit("item-%s" % k, [S_STYLE, S_TAKE,
      "Subject: ONE decorative display piece for the cabinet of the game, \"%s\" (group \"%s\"; game meaning: %s). Painted: %s. Quality of the piece: %s (%s tier)." % (NAME[k], GROUPN[g], DESC[k], what, MAT[gr], GRAD[gr]),
      "Painted like the game's existing item pictures item-*.webp (lanquy, tranhco, huongtram, dancoc, nghien: attach one of them as the second reference): soft painted gouache object, clear readable silhouette, gentle volume. Composition: ONE object only, %s, centred and standing as if on a shelf plank (no plank, no stand unless named above), filling about 80 percent of the square with an even margin. 1:1 square (target 512x512 master, 256x256 small)." % view,
      WHITE, mood, S_COLOUR, S_NOTEXT + (" No Chinese characters or letters on the object: any seal, couplet or inscription is only abstract brush strokes." if k in ("caudoi", "chuphuc", "tuan", "muchuy", "ngocty", "mynhan") else "")], "KP10",
      "1024x1024 PNG on white -> transparent; ship `img/item-%s.webp` 256x256 + `img/item512/item-%s.webp` 512x512" % (k, k),
      "REF_STYLE + an existing item-*.webp (CDN)", "jshelf.js:29-70 (BAL.shelf.it), 105-147 (names); j98.js:26 itemArt; jdisp.js:8,85",
      "%s · %s%s" % (NAME[k], GROUPN[g], " · DEAD-state piece" if dead else ""))
    made.append(k)
assert not missing_subj, missing_subj
json.dump({"made": made, "skipped": skipped}, open(os.path.join(OUT, "_cutouts.json"), "w"))
save_codes("J2")
# ---------------- INDEX.md ----------------
def imgpath(k):
    if k.startswith("mo-wx-") or k.startswith("ico-"): return "img/kit/%s.webp" % k
    if k.startswith("fx-"): return "img/fx/%s.webp (proposed; KIT_REQUESTS names fx-fogbank)" % k
    if k.startswith("cabinet-"): return "img/display/%s.webp" % k
    return "img/item-%s.webp (+ img/item512/)" % k[5:]
H = """# J2 ICONS / SPRITES (KP08, KP10, KP11) - index

PRIORITY #1 CHECK: `git grep` origin/main + assets.json for mo-wx-amu/muarao/giolon/suongmu, fx-fogbank, ico-tin, ico-alert, ico-disp, cabinet-*, and the 75 BAL.shelf.it keys: NONE of the new keys exist (assets.json has only the 16 old mo-wx-*, ico-room/cal/goal/map/chat/friend/download/update, no img/display/*, no fx-fogbank); only 5 shelf pieces already have `img/item-<key>.webp` (lanquy, tranhco, huongtram, dancoc, nghien) -> skipped. KIT_REQUESTS.md:51-54, 73, 76, 92, 97 are the standing requests; code for KP08/KP10 is live (jclose.js:62, jdisp.js:23). review/* branches not fetched here (no new art found in handover prompts_L2095 / dev/art either).
A53: no Magnific; these are ChatGPT prompts only, nothing drawn, no credits used.
How to use: new ChatGPT chat, attach the style reference `dev/handover/prompts_L2095/refs/mau_net_ve.jpg` (branch claude/cung-tuong-mong-handover-hj0h8w) + the extra ref in the table (an existing icon / item picture from the CDN: look-and-size match only), paste ONE .txt, ask for ONE image. Sprites/icons/items are painted on PLAIN PURE WHITE; the owner cuts the background later (A53 utility op) and resizes to the target.
Generator: `dev/art/prompts/J2/gen_J2.py` (item keys, groups, grades, names READ from jshelf.js:29-147; skipped = img/item-<key>.webp in assets.json). Canon applied: N1 (no face: the beauty painting is far/behind), N2 (light; the 2 dead-state pieces dark), N4, F14/no text (couplets, seals = abstract strokes), one object per picture.

| code | key (path as the code reads it) | prompt file | refs to attach | target | read at | note |
|---|---|---|---|---|---|---|
"""
T = ""
for code, key, target, refs, readat, note in rows:
    T += "| %s | `%s` | J2/%s.txt | %s | %s | %s | %s |\n" % (code, imgpath(key), key, refs.replace("REF_STYLE", "mau_net_ve.jpg"), target, readat, note)
TAIL = """
## Counts
%d prompt files = KP08: 4 weather icons + 2 fogbank + 1 optional heat glare; KP11: ico-tin + ico-alert; KP10: ico-disp + cabinet-land + 2 cabinet-port parts + %d item cut-outs (68 live pieces + 2 dead-state pieces caykho / longtrong).

## Skipped (already exists)
%s - `img/item-<key>.webp` already in assets.json. Not pictured on purpose: **fog grade** (KP08 third part) is CODE (KIT_SCENE.grade by level, KIT_REQUESTS.md:55 weather-khac r1), not a picture, so no prompt.

## Open questions for the owner/C
1. Portrait cabinet: code reads ONE tall picture `cabinet-port.webp` ar .42 (jdisp.js:24) = ~768x1830, which ChatGPT cannot output. I wrote 2 stacked parts (`cabinet-port-1/2`, 1x6 each, 2:3). C must change KDR_PIC.port to 2 segs `{src,ar:.667,slots:gridSlots(1,6)}` (the code comment jdisp.js:19 and KIT_REQUESTS.md:76 `cabinet-port*.webp` already allow stacked segments).
2. Order says 67 cut-outs; shelf table has 75 pieces - 5 pictured = 70 files (68 live + `caykho` withered pot + `longtrong` empty cage, both real inventory items, jshelf.js:34/63/110/137). Say if the 2 dead ones are to be dropped (-> 68).
3. Weather icon file size: existing mo-wx-*.webp pixel size is only on the CDN (not in git); prompts ask for 1:1 and the owner resizes to match the existing ones.
4. ico-alert: jstagehere.js:37 says the stage-rail item was removed (the ONE alert is the top-bar kitNotice box); which element shows ico-alert needs a keeper decision (the icon is painted regardless).
5. Cut-outs serve the shelf AND the kit item card (same `img/item-<key>.webp` via itemArt, j98.js:26); a shelf piece stands on its plank in code, so no plank is painted.

## Checks
CHECKS_PLACEHOLDER
"""
skipped_l = ", ".join(skipped)
open(os.path.join(OUT, "INDEX.md"), "w", encoding="utf-8").write(H + T + TAIL % (len(rows), len(made), skipped_l))
print(len(rows), "prompt files;", len(skipped), "skipped:", skipped)

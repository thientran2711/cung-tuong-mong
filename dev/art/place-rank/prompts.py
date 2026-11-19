#!/usr/bin/env python3
"""place-rank SAMPLE (owner Lượt 447, FIGURE_GATE 14): build the 10 prompts from dev/art/place-redraw/prompt_template.txt (RECIPE v2).
v3 (owner Lượt 461 A–D + Lượt 462): luohan daybed receptions, bottom-right corner rule, phối bedroom with two beds + three low-rank
colours, richness shifted up one step (phối = old Tần level), Quý phi gold-yellow a bit more visible.
python3 dev/art/place-rank/prompts.py  -> writes prompts.json next to this file."""
import json, os, re
D = os.path.dirname(os.path.abspath(__file__))
T = open(os.path.join(D, '..', 'place-redraw', 'prompt_template.txt')).read().strip()
NOPE = ' No phoenix anywhere (no phoenix carving, embroidery, figure or pendant), no imperial yellow, no golden-yellow fabrics.'
NOPE_QF = (" No phoenix anywhere (no phoenix carving, embroidery, figure or pendant); yellow only as the gold-yellow touches named above "
           "(the brocade throw, cushion trims and tassels), clearly visible but far less than in an Empress's room: no imperial yellow curtains, bedding or walls.")
# v3 (owner Lượt 461 B; exact wording from ROOT-48): the bottom-right corner near the viewer stays almost clear
RIGHT = ' The bottom-right corner nearest the viewer stays almost clear, holding at most one small object; tea tables and stools stand further back in the room.'
# v3 (owner Lượt 461 A): reception seating = luohan daybed (罗汉床) + paired Chinese armchairs with tea tables, never a sofa
NOSOFA = ' No Western sofa, no upholstered couch.'
def LUOHAN(wood, cush, chairs):
    return (f"the host seat is a luohan daybed (a wide low {wood} daybed with a three-sided carved panel back, a small low kang table with a tea set "
            f"standing in its middle, flat {cush} silk cushions), flanked on each side by a pair of {chairs} with a small tea table between each pair")
# STYLE CARDS (ROOT-48 relay of owner add to Lượt 447: each palace its own signature, same across ranks and both rooms)
CARD_CP = ("Cảnh Phúc cung signature style, the same in every room of this palace: crabapple blossoms (hải đường) are its flower, painted on the screens, "
           "embroidered on the silks and in the vases; motifs of bats among auspicious clouds carved in the beams and furniture; dark rosewood with jade-green inlay "
           "and jade ornaments; round-backed rosewood furniture; a round moon-gate opening in a carved partition. ")
# Cảnh Phúc chính điện: SAME architecture in all three versions, only the furnishing gets richer
CPA_BED = ("Cảnh Phúc cung chính điện bedroom, the private bedchamber of the imperial consort who heads this palace in ancient China, "
           "a real room in daily use: dark rosewood pillars and beams, carved lattice windows at the back opening onto a sunny courtyard "
           "garden with a tree and a lotus pond, a carved wooden partition with a round moon-gate opening; ")
CPA_REC = ("Cảnh Phúc cung chính điện reception room, the sitting room where the imperial consort who heads this palace in ancient China "
           "receives her guests, a real room in daily use, no bed anywhere: dark rosewood pillars and beams, carved lattice windows at the back "
           "opening onto a sunny courtyard garden with a tree and a lotus pond, a carved wooden partition with a round moon-gate opening; ")
RANK = {
 'tan': dict(col='pale pink', bed="one canopy bed of carved rosewood with pale pink gauze curtains tied back and pale pink silk bedding embroidered with crabapple blossoms, fine jade-green inlay on the bed frame",
             bedx="a dressing table with a bronze mirror and a small jewellery box, a small screen painted with crabapple blossoms, round stools with pale pink cushions, hanging palace lanterns with pink tassels, a clothes rack with a pink robe, a vase of crabapple branches, a small tea table, a bookshelf with boxes, slippers and a small basket on the floor",
             rec=LUOHAN('carved rosewood', 'pale pink', 'round-backed rosewood armchairs with pale pink cushions embroidered with crabapple blossoms')
                 + ", a folding screen painted with crabapple blossoms, shelves with porcelain vases and boxes, pale pink sheer curtains tied back, hanging palace lanterns with pink tassels, vases of crabapple branches, an incense burner, an embroidery frame on a stand, potted plants",
             lux="TẦN level, the simplest of the three yet one step richer than a lower consort's room: polished rosewood with fine carving and some jade-green inlay, embroidered silk, a few jade and porcelain ornaments, a little gilt edging.", nope=None),
 'phi': dict(col='soft purple', bed="one larger canopy bed of carved rosewood with soft purple gauze curtains tied back with tassels and purple silk brocade bedding embroidered with crabapple blossoms, more carving and jade-green inlay on the bed frame",
             bedx="a carved dressing table with a large bronze mirror, a lacquered jewellery cabinet and jade ornaments, a carved screen painted with crabapple blossoms, round stools with purple cushions, hanging palace lanterns with purple tassels, a clothes stand with a purple silk robe, porcelain vases of crabapple branches, a tea table with a fine tea set, a shelf with jade and porcelain treasures, a small incense burner, slippers on the floor",
             rec=LUOHAN('deeply carved rosewood', 'purple brocade', 'carved round-backed rosewood armchairs with purple brocade cushions')
                 + ", a carved screen painted with crabapple blossoms, curio shelves with jade carvings, porcelain and lacquer boxes, soft purple sheer curtains tied back with tassels, hanging palace lanterns with purple tassels, vases of crabapple branches, a bronze incense burner, a guqin on a stand, potted plants",
             lux="PHI level, clearly richer than a Tần: deeper carving, rich jade-green inlay, gilt edging on the furniture, silk brocade, many jade and porcelain treasures.", nope=None),
 'quyphi': dict(col='rose red', bed="one grand canopy bed of deeply carved rosewood with gilt carving, jade-green inlay and pearl strings, rose red gauze curtains tied back, rose red silk brocade bedding embroidered with crabapple blossoms, a gold-yellow brocade throw folded across the foot of the bed, gold-yellow trims on the rose red cushions and gold-yellow tassels on the curtain ties",
             bedx="a large carved dressing table with a tall bronze mirror, a gilt lacquer jewellery cabinet open with pearls and jade, a large carved gilded screen painted with crabapple blossoms, round stools with rose red cushions, ornate hanging palace lanterns with rose red tassels, a clothes stand with a rose red silk robe, cloisonné and fine porcelain vases of crabapple branches, a coral tree ornament, a tea table with a gold-trimmed tea set, a curio shelf with jade, coral and porcelain treasures, a bronze incense burner, slippers on the floor",
             rec=LUOHAN('gilt-carved rosewood', 'rose red brocade', 'gilt-carved round-backed rosewood armchairs with rose red cushions')
                 + ", a gold-yellow brocade throw laid over the daybed, gold-yellow trims on its rose red cushions and gold-yellow tassels hanging from it, a large carved gilded screen painted with crabapple blossoms, curio shelves full of jade carvings, cloisonné, coral and porcelain treasures, rose red sheer curtains tied back with tassels, ornate hanging palace lanterns with rose red tassels, cloisonné vases of crabapple branches, a bronze incense burner, a guqin on a stand, potted plants",
             lux="QUÝ PHI level, the richest of the three: lavish gilt carving, jade-green inlay, silk brocade, pearls, coral, jade and cloisonné, yet clearly below an Empress.", nope=True),
}
ROOMS = {}
for k, r in RANK.items():
    ROOMS[f'canh-phuc-cung-{k}-ngu'] = dict(room=CPA_BED + "at the centre of the room, the large clear main subject, " + r['bed'] + "; around it " + r['bedx'] + ". " + CARD_CP + r['lux'] + f" The {r['col']} accent colour is woven through the bedding, curtains and cushions." + (NOPE_QF if r['nope'] else NOPE) + RIGHT,
        floor='warm polished wooden floorboards', mat='the bed step', key='the canopy bed')
    ROOMS[f'canh-phuc-cung-{k}'] = dict(room=CPA_REC + r['rec'] + ". " + CARD_CP + r['lux'] + f" The {r['col']} accent colour is woven through the cushions, curtains and silks." + (NOPE_QF if r['nope'] else NOPE) + NOSOFA + RIGHT,
        floor='warm polished wooden floorboards', mat='the luohan daybed', key='the luohan daybed with its kang table')
# phối richness = sample v1 as drawn (owner Lượt 465 overrides item D for the phối: keep it, only two beds + three colours)
QN = "Pretty, noble and well kept, never poor: carved lacquer furniture with fine painted flowers, embroidered silk, but modest in size and luxury, a lower consort's quarters."
ROOMS['thua-minh-cung-dong-phoi-ngu'] = dict(room="Thừa Minh cung Đông phối điện bedroom, the bedchamber SHARED by two lower-ranking imperial consorts living in the east side hall of a palace in ancient China, a real room in daily use: wooden pillars, lattice windows at the back onto a sunny garden; in the central part of the room, the large clear main subject, TWO canopy beds of carved lacquered wood with painted flowers standing side by side with a painted orchid screen between them: one bed with ivory gauze curtains tied back and ivory embroidered silk bedding, the other bed with pale green gauze curtains tied back and pale green embroidered silk bedding, pale blue silk cushions on both beds; around them two small dressing tables each with a bronze mirror, embroidered stools with pale blue cushions, hanging paper lanterns with blue tassels, a clothes rack with an ivory robe and a pale green robe, vases of white and blue orchids, a small tea table, a shelf with a few boxes and books, slippers and a small basket on the floor. " + QN + " The three soft colours ivory, pale green and pale blue are woven through the bedding, curtains and cushions. Exactly two beds." + NOPE + RIGHT,
        floor='warm polished wooden floorboards', mat='the bed steps', key='the two canopy beds')
ROOMS['thua-minh-cung-dong-phoi'] = dict(room="Thừa Minh cung Đông phối điện reception room, the small sitting room where a lower-ranking imperial consort living in the east side hall of a palace in ancient China receives her guests, a real room in daily use, no bed anywhere: wooden pillars, lattice windows at the back onto a sunny garden; " + LUOHAN('carved, flower-painted lacquered wood', 'pale blue', 'small carved lacquered armchairs with pale blue cushions') + ", a painted folding screen with orchids, shelves with porcelain vases, books and boxes, pale blue sheer curtains tied back, hanging paper lanterns with blue tassels, vases of white and blue orchids, a small incense burner, an embroidery frame, potted plants. " + QN + " The pale blue accent colour is woven through the cushions, curtains and silks." + NOPE + NOSOFA + RIGHT,
        floor='warm polished wooden floorboards', mat='the luohan daybed', key='the luohan daybed with its kang table')
EMP = " The most dazzling room of the whole palace: imperial yellow silk and gold everywhere, phoenix motifs carved, embroidered and gilded, red lacquer pillars wrapped with gold, the richest treasures."
ROOMS['khon-ninh-cung-ngu'] = dict(room="Khôn Ninh cung bedroom, the private bedchamber of the Empress in an ancient Chinese imperial palace, a real room in daily use: red lacquer pillars with gilded phoenix carving, golden lattice windows at the back onto a sunny summer garden; at the centre of the room, the large clear main subject, one magnificent canopy bed of gilded carved wood with golden phoenixes on its crown, imperial yellow gauze curtains lined with rich crimson red silk, tied back with red and gold tassels, imperial yellow silk brocade bedding embroidered with phoenixes and peonies with crimson red borders and red silk cushions; around it a grand dressing table with a tall gilt mirror and a jewellery cabinet with gold phoenix hairpins and pearls, a gilded folding screen with a phoenix among peonies, stools with red and yellow brocade cushions, ornate gilded palace lanterns, a pair of golden phoenix figures on stands, cloisonné vases of peonies, a tea table with a gold tea set, a curio shelf of jade and gold treasures, a gold incense burner, slippers on the floor." + EMP.replace("imperial yellow silk and gold everywhere", "imperial yellow silk, crimson red silk and gold") + " Imperial yellow and rich crimson red are mixed together everywhere (owner Lượt 466): red lacquer, red silk linings, red cushions and tassels interwoven with the yellow and gold, festive and beautiful, never all yellow." + RIGHT,
        floor='polished stone tiles', mat='the bed dais', key='the canopy bed')
ROOMS['khon-ninh-cung'] = dict(room="Khôn Ninh cung reception hall, where the Empress of an ancient Chinese imperial palace receives the consorts, a real room in daily use, no bed anywhere: red lacquer pillars with gilded phoenix carving, golden lattice windows at the back onto a sunny summer garden; on a low dais a carved gilded throne seat (a wide Chinese throne with a tall carved panel back) with imperial yellow silk cushions embroidered with phoenixes and a small low table with a gold tea set, behind it a large gilded folding screen with a phoenix among peonies, a pair of golden phoenix figures on tall stands; below the dais, rows of paired Chinese armchairs with small tea tables between them for the visiting consorts; the open floor in the middle ground in front of the dais is furnished: small embroidered rugs, low carved tables with fruit and tea, a tall gilt incense stand, potted peonies; imperial yellow sheer curtains tied back with gold tassels, ornate gilded palace lanterns, side tables with cloisonné and porcelain vases of peonies, curio shelves of jade and gold treasures." + EMP + NOSOFA + RIGHT,
        floor='polished stone tiles', mat='the low tables in front of the dais', key='the throne seat on its dais')
# ---- v4 (owner Lượt 473, FIGURE_GATE 14c; ROOT-48 GO for ONE round): redraw 4 rooms only; the 6 kept v3 rooms keep their v3 prompts ----
# CORNER NUMBERS measured on the liked v3 Cảnh Phúc bedrooms (report place-rank-sample.md v4): right-side table group inner edge at
# 67–82 % of the width, top 47–52 %, feet 83–88 % of the height; bottom-left low table 0–8 % wide, about 1/10 of the height.
CORNER = (" CORNER NUMBERS (owner Lượt 473): the floor in the middle of the picture, from one sixth to four fifths of the width in the lower half, "
          "stays open with nothing standing on it, because people will stand there; a table group with stools may stand only in the back right corner, "
          "kept inside the outer fifth of the width and between one half and seven eighths of the height, never reaching the bottom edge; "
          "at the bottom-left at most one small low table about one tenth of the picture height.")
CORNER_473 = CORNER  # used by the 4 first v4 gens (rejected: too much open floor, owner Lượt 477 arrived after they were launched)
# LAYOUT NUMBERS (owner Lượt 477): the v3 Phi bedroom (gen SyhTG51Ub8, image 3 as layout ref) is the template: furniture fills ~5/6 of the room;
# open floor from the bottom edge = ~32 % of the height at the left, ~22 % at the centre, ~13 % at the right; right table group x 67–100 %, y 47–87 %.
CORNER = (" LAYOUT NUMBERS (owner Lượt 477): lay the room out like image 3 (the room in image 3 is only a layout guide, not its colours or furniture): "
          "seen from as close as in image 3, the furniture fills about five sixths of the room, the main piece large and its base reaching down to about "
          "four fifths of the picture height; the open floor in front is only a strip of about one fifth of the picture height at the centre, never more "
          "floor than in image 3, and nothing stands on that strip; a table group with stools may stand only in the back right corner, kept inside the "
          "outer fifth of the width and between one half and seven eighths of the height, never reaching the bottom edge; at the bottom-left at most "
          "one small low table about one tenth of the picture height.")
ORDER = (" LAYOUT (owner Lượt 473): orderly and symmetric like a formal Chinese hall, the furniture following the room's architecture: the luohan daybed "
         "stands centred against the back wall in front of the screen, square to it and seen straight on; the armchair pairs with their tea tables stand "
         "in straight mirrored rows on both sides, square to the walls and lined up with the pillars; no piece of furniture at an odd or diagonal angle.")
for k in ('phi', 'quyphi'):
    ROOMS[f'canh-phuc-cung-{k}']['room'] = ROOMS[f'canh-phuc-cung-{k}']['room'].replace(NOSOFA + RIGHT, NOSOFA + ORDER + CORNER + RIGHT)
# PHỐI COLOURS BY PAIR (Lượt 473 e): sample pair = Thường tại pale green + Quý nhân pale blue (no ivory in this sample); richness = sample v1 (Lượt 465)
ROOMS['thua-minh-cung-dong-phoi-ngu'] = dict(room="Thừa Minh cung Đông phối điện bedroom, the cosy bedchamber SHARED by two lower-ranking imperial consorts (a Thường tại and a Quý nhân) living in the east side hall of a palace in ancient China, a real room in daily use, seen from a little closer so the room feels snug and full, not a big empty hall: wooden pillars, lattice windows at the back onto a sunny garden, the back wall and both sides lined with furniture; TWO canopy beds of carved lacquered wood with painted flowers stand side by side against the back wall, square to it, with a painted orchid screen between them, together the large clear main subject: the first bed with pale green gauze curtains tied back, pale green embroidered silk bedding and pale green cushions, and next to it its own small dressing table with a bronze mirror, a stool and a clothes rack with a pale green robe, all in pale green; the second bed with pale blue gauze curtains tied back, pale blue embroidered silk bedding and pale blue cushions, and next to it its own small dressing table with a bronze mirror, a stool and a clothes rack with a pale blue robe, all in pale blue; along the walls a shelf with a few boxes and books, hanging paper lanterns with green and blue tassels, vases of white and blue orchids, slippers at the bed steps; in the back right corner a small round tea table with two stools. " + QN + " Exactly two beds; the two colours pale green and pale blue only, each bed and its corner in one of them." + NOPE + CORNER + RIGHT,
        floor='warm polished wooden floorboards', mat='the bed steps', key='the two canopy beds')
ROOMS['thua-minh-cung-dong-phoi'] = dict(room="Thừa Minh cung Đông phối điện reception room, the small sitting room where two lower-ranking imperial consorts (a Thường tại and a Quý nhân) living in the east side hall of a palace in ancient China receive their guests, a real room in daily use, no bed anywhere: wooden pillars, lattice windows at the back onto a sunny garden; " + LUOHAN('carved, flower-painted lacquered wood', 'pale green and pale blue', 'small carved lacquered armchairs, one of each pair with a pale green cushion and the other with a pale blue cushion') + ", a painted folding screen with orchids behind the daybed, shelves with porcelain vases, books and boxes along the walls, pale green and pale blue sheer curtains tied back, hanging paper lanterns with green and blue tassels, vases of white and blue orchids, a small incense burner, an embroidery frame against the wall, potted plants. " + QN + " Pale green and pale blue are mixed through the cushions, curtains and silks; no ivory, no other accent colour." + NOPE + NOSOFA + ORDER + CORNER + RIGHT,
        floor='warm polished wooden floorboards', mat='the luohan daybed', key='the luohan daybed with its kang table')
V4REF = 'SyhTG51Ub8'  # image 3 = layout reference (v3 Phi bedroom)
V4 = ('canh-phuc-cung-phi', 'canh-phuc-cung-quyphi', 'thua-minh-cung-dong-phoi-ngu', 'thua-minh-cung-dong-phoi')

# ---- v5 (owner Lượt 491, FIGURE_GATE 14d, ART_RULES L5 L7 L11; ROOT-49 GO for ONE round) ----
# KEEP: canh-phuc-cung-phi-ngu (v3 SyhTG51Ub8 = layout template), canh-phuc-cung-tan (WDgFohIcXe), thua-minh-cung-dong-phoi (JNCp5R3Oq4),
# khon-ninh-cung + khon-ninh-cung-ngu. REDRAW: tan-ngu, quyphi-ngu, phi + quyphi receptions, phối bedroom. Tần ≠ Phi ≠ Quý phi (L11).
RECT = (" ROOM SHAPE (owner Lượt 491): the room reads rectilinear with square corners, straight walls and straight beams, never a curved hall, "
        "never furniture in an arc or a curve; every piece of furniture stands in clear straight lines along the walls, square to the walls, orderly, "
        "never scattered and never at a slant.")
CORNER5 = (" LAYOUT NUMBERS (owner Lượt 477, 491): seen from as close as in image 3, the furniture fills about five sixths of the room, the main piece "
           "large with its base reaching down to about four fifths of the picture height; the open floor in front is only a strip of about one fifth "
           "of the picture height at the centre, never more floor than in image 3, and nothing stands on that strip, because people will stand there. "
           "Image 3 is only a guide for how close and how full the room is, NOT for where things stand: this room has its own different arrangement "
           "as written above. The right corner is furnished, never empty or bare: a table group stands there inside the outer fifth of the width, "
           "set back from the bottom edge, between one half and seven eighths of the picture height, so a person standing in front of it covers it naturally.")
L5BED = {
 'tan': ("seen as a corner of two walls meeting at a square corner on the right: the back wall straight across the picture and the right side wall "
         "running towards the viewer in clear perspective, with tall carved lattice windows in the right side wall onto a sunny courtyard garden with "
         "a tree and a lotus pond; dark rosewood pillars and beams; the canopy bed stands in a real bed place in the RIGHT half of the back wall: set "
         "deep into a carved rosewood bed alcove built into the back wall just right of the centre (the bed between about two fifths and three quarters "
         "of the width), its back and both ends enclosed by the alcove, its long side facing the room, two steps in front of it; in the LEFT part of "
         "the back wall a carved wooden partition with a round moon-gate opening shows a glimpse of a small study with a desk and bookshelves; between "
         "the moon gate and the bed alcove a dressing table with a mirror stands flat against the back wall; "),
 'quyphi': ("seen straight on as a correct box of three walls with square corners: the back wall straight across the picture and the left and right "
            "side walls running towards the viewer in clear one-point perspective; dark rosewood pillars and beams; the canopy bed stands exactly "
            "centred against the back wall on a low carved platform, perfectly symmetric, with a carved rosewood partition with a round moon-gate "
            "opening on EACH side of it in the back wall, the two moon gates mirroring each other; tall carved lattice windows in the right side wall "
            "onto a sunny courtyard garden with a tree and a lotus pond; tall curio shelves standing flat against the left side wall; "),
}
L5REC = {
 'phi': ("seen as a corner of two walls meeting at a square corner on the left: the back wall straight across the picture and the left side wall "
         "running towards the viewer in clear perspective; dark rosewood pillars and beams, carved lattice windows across the right part of the back "
         "wall opening onto a sunny courtyard garden with a tree and a lotus pond, a carved wooden partition with a round moon-gate opening in the "
         "left side wall; the luohan daybed stands against the back wall a little right of the centre, square to it and seen straight on, a carved "
         "screen behind it; ONE straight row of armchairs with tea tables between them stands flat along the left side wall, from the moon gate "
         "towards the room, square to that wall (seen in perspective, never curved); one more pair of armchairs with a tea table stands in a straight "
         "line against the back wall to the left of the daybed; "),
 'quyphi': ("seen straight on as a correct box of three walls with square corners: the back wall straight across the picture and the left and right "
            "side walls running towards the viewer in clear one-point perspective, like a real rectangular hall; dark rosewood pillars and beams, "
            "carved lattice windows high in both side walls opening onto a sunny courtyard garden, a carved wooden partition with a round moon-gate "
            "opening in the back wall to the left; the luohan daybed stands on a low wide platform against the back wall, exactly centred, square to "
            "it and seen straight on, a large screen behind it; TWO straight rows of armchairs with tea tables between them stand along the left and "
            "the right side walls, each row flat against its wall and square to it, the two rows facing each other across the room (seen in "
            "perspective, never curved, never turned towards the viewer); "),
}
for k in ('tan', 'quyphi'):
    r = RANK[k]
    ROOMS[f'canh-phuc-cung-{k}-ngu'] = dict(room="Cảnh Phúc cung chính điện bedroom, the private bedchamber of the imperial consort who heads this palace in ancient China, a real room in daily use, "
        + L5BED[k] + "the canopy bed is the large clear main subject: " + r['bed'] + "; around the room, along the walls, " + r['bedx'] + ". " + CARD_CP + r['lux']
        + f" The {r['col']} accent colour is woven through the bedding, curtains and cushions." + (NOPE_QF if r['nope'] else NOPE) + RECT + CORNER5,
        floor='warm polished wooden floorboards', mat='the bed step', key='the canopy bed')
for k in ('phi', 'quyphi'):
    r = RANK[k]
    ROOMS[f'canh-phuc-cung-{k}'] = dict(room="Cảnh Phúc cung chính điện reception room, the sitting room where the imperial consort who heads this palace in ancient China receives her guests, a real room in daily use, no bed anywhere: "
        + L5REC[k] + "the furniture: " + re.sub(r', flanked on each side by a pair of (.*?) with a small tea table between each pair', r'; the armchairs are \1, standing only in the straight rows described above', r['rec']) + ". " + CARD_CP + r['lux'] + f" The {r['col']} accent colour is woven through the cushions, curtains and silks."
        + (NOPE_QF if r['nope'] else NOPE) + NOSOFA + RECT + CORNER5,
        floor='warm polished wooden floorboards', mat='the luohan daybed', key='the luohan daybed with its kang table')
# PHỐI v5 (L7): split by OBJECT TYPE, not by bed: ALL curtains pale blue, ALL furniture fabrics pale green; layout close to v4 1ldAmKir4r (image 3 here)
ROOMS['thua-minh-cung-dong-phoi-ngu'] = dict(room="Thừa Minh cung Đông phối điện bedroom, the cosy bedchamber SHARED by two lower-ranking imperial consorts (a Thường tại and a Quý nhân) living in the east side hall of a palace in ancient China, a real room in daily use, seen from a little closer so the room feels snug and full, not a big empty hall: wooden pillars, lattice windows at the back onto a sunny garden, the back wall and both sides lined with furniture; TWO canopy beds of carved lacquered wood with painted flowers stand side by side against the back wall, square to it, with a painted orchid screen between them, together the large clear main subject, each bed with its own small dressing table with a bronze mirror, a stool and a clothes rack with a robe; along the walls a shelf with a few boxes and books, hanging paper lanterns with tassels, vases of white and blue orchids, slippers at the bed steps. COLOURS BY OBJECT TYPE (owner Lượt 491): ALL the curtains of the room are pale blue (the gauze curtains of BOTH beds, the window curtains, the lantern tassels), and ALL the furniture fabrics are pale green (the bedding and cushions of BOTH beds, the stool cushions, the seat cushions, the robes on the racks); the two beds look alike in colour, never one bed blue and the other green. " + QN + " Exactly two beds; only the two colours pale blue (curtains) and pale green (fabrics)." + NOPE + RECT + CORNER5.replace("a table group stands there", "a small round tea table with two stools and a low cabinet with a vase of orchids stand there").replace("so a person standing in front of it covers it naturally.", "so a person standing in front of it covers it naturally; this group stands forward in the right part of the room, NOT pushed back against the window wall: its front stools stand at about five sixths of the picture height, so the lower right of the picture is furnished and never bare floor, like the tea table in the right corner of an Empress's bedroom.").replace("Image 3 is only a guide for how close and how full the room is, NOT for where things stand: this room has its own different arrangement as written above.", "Image 3 is the previous version of this same room: keep its layout, closeness and fullness closely; only the colours change and the right corner is furnished."),
        floor='warm polished wooden floorboards', mat='the bed steps', key='the two canopy beds')
V5 = ('canh-phuc-cung-tan-ngu', 'canh-phuc-cung-quyphi-ngu', 'canh-phuc-cung-phi', 'canh-phuc-cung-quyphi', 'thua-minh-cung-dong-phoi-ngu')
V5REF = {k: 'SyhTG51Ub8' for k in V5}; V5REF['thua-minh-cung-dong-phoi-ngu'] = '1ldAmKir4r'  # image 3 (share guide; phối = its own v4 layout)
out = {}
for k, r in ROOMS.items():
    out[k] = (T.replace('{SEASON_TIME}', 'summer morning').replace('{TIME_LIGHT}', 'morning daylight').replace('{ROOM_LINE}', r['room'])
               .replace('{FLOOR}', r['floor']).replace('{MAT_UNDER}', r['mat']).replace('{KEY_PIECE}', r['key']))
    # the only right-side mention allowed is the RIGHT sentence (ROOT-48 wording for owner Lượt 461 B)
    if k in V5:
        assert '{' not in out[k] and 'right corner nearest the viewer stays almost clear' not in r['room'], k; continue
    assert 'right side' not in r['room'] and r['room'].count('right') == 1 + (k in V4) * CORNER.count('right') + (k == 'thua-minh-cung-dong-phoi-ngu') and '{' not in out[k], k
json.dump(out, open(os.path.join(D, 'prompts.json'), 'w'), ensure_ascii=False, indent=1)
print(len(out), max(len(v) for v in out.values()))

# ---- v6 (owner Lượt 520, ART_RULES L12 + A18 LAW #0; ROOT-50 GO, worker PR7): FLOOR ONLY. Every room keeps its approved layout:
# its v5 prompt word for word, image 3 = that room's OWN current gen, and ONLY the floor numbers change (base of the main piece 4/5 -> 7/8,
# open floor strip 1/5 -> 1/10). Rooms without floor numbers get the one FLOOR6 sentence ADDED (B5: insert, never rewrite).
V6REF = {'canh-phuc-cung-tan-ngu': 'EbY494KuuO', 'canh-phuc-cung-phi-ngu': 'SyhTG51Ub8', 'canh-phuc-cung-quyphi-ngu': 'VX7KHZNMMU',
         'canh-phuc-cung-tan': 'WDgFohIcXe', 'canh-phuc-cung-phi': 'ov6ljBx829', 'canh-phuc-cung-quyphi': 'gOmTc4oSXO',
         'thua-minh-cung-dong-phoi-ngu': 'cpSqbrH0eP', 'thua-minh-cung-dong-phoi': 'JNCp5R3Oq4',
         'khon-ninh-cung-ngu': 'jUonRSTLD0', 'khon-ninh-cung': 'kse24n816B'}
SAME6 = "keep the same room and the same arrangement as image 3 (this same room as drawn before), seen a little closer and lower so less floor shows"
FLOOR6 = (" FLOOR SHARE (owner Lượt 520): " + SAME6[0].upper() + SAME6[1:] + ": the furniture comes down to about seven eighths of the picture height, "
          "and the open floor in front is only a strip of about one tenth of the picture height at the centre, clearly less floor than in image 3.")
V6SUB = [("its base reaching down to about four fifths of the picture height", "its base reaching down to about seven eighths of the picture height"),
         ("a strip of about one fifth of the picture height at the centre, never more floor than in image 3",
          "a strip of about one tenth of the picture height at the centre, clearly less floor than in image 3"),
         ("Image 3 is only a guide for how close and how full the room is, NOT for where things stand: this room has its own different arrangement as written above.",
          SAME6[0].upper() + SAME6[1:] + "."),
         ("Image 3 is the previous version of this same room: keep its layout, closeness and fullness closely; only the colours change and the right corner is furnished.",
          SAME6[0].upper() + SAME6[1:] + "."),
         ("seen from as close as in image 3, the furniture fills", "seen a little closer and lower than in image 3, the furniture fills"),
         ("lay the room out like image 3 (the room in image 3 is only a layout guide, not its colours or furniture): seen a little closer and lower than in image 3,", SAME6 + ",")]
out6 = {}
for k, p in out.items():
    q = p
    for a, b in V6SUB: q = q.replace(a, b)
    if q == p:  # no floor numbers in this prompt -> ADD the one floor sentence after the room line
        i = q.index(' FLOOR: '); q = q[:i] + FLOOR6 + q[i:]
    assert 'four fifths of the picture height' not in q and 'one fifth of the picture height' not in q and 'seven eighths' in q, k
    out6[k] = q
json.dump(out6, open(os.path.join(D, 'prompts_v6.json'), 'w'), ensure_ascii=False, indent=1)
print('v6', len(out6))

# ---- HQP (t7) SAMPLE pair (owner Lượt 520 "add HQP bedroom + reception to compare with Hoàng hậu"; ROOT-50 answer: no HQP palace in game data ->
# PR7 picked TRƯỜNG XUÂN CUNG (in the game's Đông lục cung list, no rooms drawn yet). A1: ONE sample pair, then STOP. L11 own layout, L5 rectilinear,
# I1 yellow/phoenix gradient (HQP = clearly less yellow than HH, phoenix allowed), L12 floor share (v6 numbers). Image 3 = closeness guide only (v6 Phi bedroom).
CARD_TX = ("Trường Xuân cung signature style, the same in every room of this palace: white magnolias (ngọc lan) are its flower, painted on the screens, "
           "embroidered on the silks and in the vases; borders of the endless swastika fret and round longevity medallions carved in the beams and furniture; "
           "dark zitan sandalwood with gold lacquer and mother-of-pearl inlay; square-backed zitan furniture (never round-backed); a tall vase-shaped doorway "
           "(never a round moon gate) in a carved openwork partition; screens with kingfisher-blue feather inlay. ")
LUX7 = ("HOÀNG QUÝ PHI level: clearly richer than a Quý phi and only one step below the Empress: gold lacquer and gilt carving, mother-of-pearl, "
        "pearls, jade, coral, cloisonné and kingfisher-blue inlay, many treasures, yet less gold and less yellow than an Empress's room. ")
COL7 = (" COLOURS (owner rank rule): golden apricot yellow, a warmer and softer gold-yellow than the Empress's bright imperial yellow, only in the bedding "
        "and seat brocades and cushions; deep ruby red for the curtains, lanterns and tassels; the walls, pillars and wood stay dark zitan and red lacquer, "
        "so the room reads clearly less yellow than an Empress's room. Phoenixes allowed but few and small: a pair of small phoenixes embroidered or "
        "carved among magnolias, never golden phoenix statues, never phoenixes everywhere.")
FLOOR7 = (" LAYOUT NUMBERS (owner Lượt 477, 491, 520): seen as close and as low as in image 3 (image 3 is only a guide for how close and how full the room is, "
          "NOT for its arrangement, colours or furniture: this room has its own different arrangement as written above), the furniture fills about five "
          "sixths of the room, the main piece large with its base reaching down to about seven eighths of the picture height; the open floor in front is "
          "only a strip of about one tenth of the picture height at the centre, and nothing stands on that strip, because people will stand there. "
          "The right corner is furnished, never empty or bare: a table group stands there inside the outer fifth of the width, set back from the bottom "
          "edge, between one half and seven eighths of the picture height, so a person standing in front of it covers it naturally.")
HQP = {
 'truong-xuan-cung-hqp-ngu': dict(room="Trường Xuân cung chính điện bedroom, the private bedchamber of the Imperial Noble Consort (Hoàng quý phi), the highest consort below the Empress, "
    "in ancient China, a real room in daily use, seen straight on with the back wall straight across the picture and the right side wall running towards the viewer "
    "in clear perspective, meeting at a square corner; dark zitan pillars and beams with gold lacquer; the main subject is a grand walk-in canopy bed (a babu bed: a "
    "bed built like a small carved room with its own front porch and a carved openwork front gate) standing against the back wall, centred, square to it and seen "
    "straight on, the large clear main subject, its carved front gate open, ruby red silk curtains tied back inside, golden apricot brocade bedding embroidered "
    "with white magnolias and a pair of small phoenixes, pearl strings on the gate; to the left of the bed, flat against the back wall, a tall folding screen with "
    "kingfisher-blue feather inlay and magnolias; to the right of the bed a carved openwork partition with a tall vase-shaped doorway giving a glimpse of a "
    "dressing room; tall carved lattice windows in the right side wall onto a sunny courtyard garden with a magnolia tree; along the walls a gold-lacquer dressing "
    "table with a tall bronze mirror and a jewellery cabinet open with pearls and jade, a zitan curio shelf of jade, coral and cloisonné treasures, ornate hanging "
    "palace lanterns with ruby red tassels, a clothes stand with a ruby red robe, cloisonné vases of magnolia branches, a gold incense burner, slippers on the "
    "bed porch step. " + CARD_TX + LUX7 + COL7 + RECT + FLOOR7,
    floor='warm polished wooden floorboards', mat='the bed porch step', key='the walk-in canopy bed'),
 'truong-xuan-cung-hqp': dict(room="Trường Xuân cung chính điện reception room, the hall where the Imperial Noble Consort (Hoàng quý phi), the highest consort below the Empress, "
    "in ancient China receives her guests, a real room in daily use, no bed anywhere, seen straight on with the back wall straight across the picture and the right "
    "side wall running towards the viewer in clear perspective, meeting at a square corner; dark zitan pillars and beams with gold lacquer, a horizontal gilt "
    "plaque carved with magnolias (no writing, no characters) high on the back wall; a carved openwork floor-to-ceiling arch frame (a luozhao) spans the room from wall to wall, square to the "
    "back wall, framing an inner raised area; inside it, on a low one-step platform against the back wall, exactly centred and seen straight on, the host seat: a "
    "wide square-backed zitan luohan daybed with gold lacquer and mother-of-pearl inlay, golden apricot brocade cushions embroidered with magnolias, a small low "
    "kang table with a gold-trimmed tea set in its middle, behind it a large folding screen with kingfisher-blue feather inlay and white magnolias with a pair of "
    "small phoenixes; on each side of the platform a tall cloisonné flower stand with magnolias; in front of the arch frame ONE straight row of square-backed zitan "
    "armchairs with golden apricot cushions and small tea tables between them stands flat along the right side wall, square to it (seen in perspective, never "
    "curved), and a carved vase-shaped doorway opens in the left part of the back wall; deep ruby red sheer curtains tied back with tassels, ornate hanging palace "
    "lanterns with ruby red tassels, curio shelves of jade, coral and cloisonné treasures, a gold incense burner, a guqin on a stand, potted plants. "
    + CARD_TX + LUX7 + COL7 + NOSOFA + RECT + FLOOR7,
    floor='warm polished wooden floorboards', mat='the platform', key='the luohan daybed on its platform'),
}
HQPREF = 'If3UHfPtvE'  # image 3 = closeness guide only (v6 Phi bedroom)
outh = {k: T.replace('{SEASON_TIME}', 'summer morning').replace('{TIME_LIGHT}', 'morning daylight').replace('{ROOM_LINE}', r['room'])
           .replace('{FLOOR}', r['floor']).replace('{MAT_UNDER}', r['mat']).replace('{KEY_PIECE}', r['key']) for k, r in HQP.items()}
assert all('{' not in v and 'moon-gate' not in v for v in outh.values())
json.dump(outh, open(os.path.join(D, 'prompts_hqp.json'), 'w'), ensure_ascii=False, indent=1)
print('hqp', len(outh), max(len(v) for v in outh.values()))

# ---- v6b (owner Lượt 548 via ROOT-50, A20): Phi bedroom v6 If3UHfPtvE "đang bị sát, gần quá" -> ONLY the camera distance changes:
# a little farther back, distance like the Quý phi bedroom v6 (gOmViD0SXO, OK), not cropped; floor numbers of v6 stay. image 3 = v3 SyhTG51Ub8 (own layout).
FLOOR6B = FLOOR6.replace("seen a little closer and lower so less floor shows:",
    "seen from about the same distance as image 3, NOT closer (owner Lượt 548: not too close), so the whole canopy bed with its top and its curtains fits "
    "inside the picture with some space around it, nothing cropped; the camera is only a little lower so less floor shows:")
assert FLOOR6B != FLOOR6
outb = {'canh-phuc-cung-phi-ngu': out6['canh-phuc-cung-phi-ngu'].replace(FLOOR6, FLOOR6B)}
assert outb['canh-phuc-cung-phi-ngu'] != out6['canh-phuc-cung-phi-ngu']
json.dump(outb, open(os.path.join(D, 'prompts_v6b.json'), 'w'), ensure_ascii=False, indent=1)

# ---- v6c (owner Lượt 554 via ROOT-50, A20): Khôn Ninh reception v6 rgXnGrDxtc: "mấy cái ghế nó muốn đặt đi đâu mà đặt cái bàn nó nằm ngay giữa như vậy"
# -> ONLY her point: no low table / stools in the middle of the floor; tea tables only beside the seats; centre floor open for the 4 people. Rest = v6 word for word.
KN_MID = ("the open floor in the middle ground in front of the dais is furnished: small embroidered rugs, low carved tables with fruit and tea, "
          "a tall gilt incense stand, potted peonies;")
KN_MID6C = ("NO table and NO stools in the middle of the floor (owner Lượt 554): the floor in the middle in front of the dais stays open for people to stand; "
            "the small tea tables stand only between the armchairs along the sides, each table beside its seats, and a tall gilt incense stand and potted "
            "peonies stand only at the sides beside the dais;")
kn = out6['khon-ninh-cung']
assert KN_MID in kn and 'at most a small mat under the low tables in front of the dais' in kn
outc = {'khon-ninh-cung': kn.replace(KN_MID, KN_MID6C).replace('at most a small mat under the low tables in front of the dais', 'at most a small mat at the foot of the dais').replace('Keep the same room and the same arrangement as image 3 (this same room as drawn before)', 'Keep the same room and the same arrangement as image 3 (this same room as drawn before), except that the low table and stools in the middle of its floor are removed')}
json.dump(outc, open(os.path.join(D, 'prompts_v6c.json'), 'w'), ensure_ascii=False, indent=1)

# ---- v6d (owner Lượt 563 via ROOT-50): Phi bedroom v6b aFGyN6afSh "vẫn cứ rộng rộng ở dưới" -> between v6 (too close) and v6b (too much floor):
# whole bed inside, no crop, bottom empty strip ~8-10 %. image 3 = v6b aFGyN6afSh (own layout). Only the FLOOR SHARE sentence changes.
FLOOR6D = (" FLOOR SHARE (owner Lượt 520, 548, 563): Keep the same room and the same arrangement as image 3 (this same room as drawn before), seen only "
           "slightly closer than image 3, so the whole canopy bed with its top and its curtains still fits inside the picture, nothing cropped; the empty "
           "floor strip at the bottom is clearly smaller than in image 3: the furniture comes down to about eleven twelfths of the picture height, and the "
           "open floor at the bottom is only about one twelfth of the picture height at the centre.")
outd = {'canh-phuc-cung-phi-ngu': outb['canh-phuc-cung-phi-ngu'].replace(FLOOR6B, FLOOR6D)}
assert outd['canh-phuc-cung-phi-ngu'] != outb['canh-phuc-cung-phi-ngu']
json.dump(outd, open(os.path.join(D, 'prompts_v6d.json'), 'w'), ensure_ascii=False, indent=1)

# ---- v6f (owner Lượt 563 via ROOT-50): Khôn Ninh reception v6c 9ZHIFD7NYZ "nhỏ xíu" -> GRAND large main hall (wide, deep, high ceiling, more columns)
# + chairs/tables follow the structure: two straight mirrored rows facing each other along the sides, on the central axis to the throne dais.
knc = outc['khon-ninh-cung']
A1_ = "ROOM: Khôn Ninh cung reception hall, where the Empress of an ancient Chinese imperial palace receives the consorts, a real room in daily use, no bed anywhere:"
B1_ = "below the dais, rows of paired Chinese armchairs with small tea tables between them for the visiting consorts;"
C1_ = "Keep the same room and the same arrangement as image 3 (this same room as drawn before), except that the low table and stools in the middle of its floor are removed, seen a little closer and lower so less floor shows:"
assert A1_ in knc and B1_ in knc and C1_ in knc
outf = {'khon-ninh-cung': knc
  .replace(A1_, A1_ + " a GRAND, very large main hall (owner Lượt 563: never a small room), wide and deep with a high ceiling, many tall red lacquer columns standing in two straight rows along the length of the hall, seen straight on along its central axis;")
  .replace(B1_, "below the dais, TWO straight rows of Chinese armchairs with small tea tables between them for the visiting consorts (owner Lượt 563), one row along each side of the hall, the two rows facing each other across the open central aisle, mirrored exactly on the central axis that leads to the throne dais, each chair lined up with the columns and square to the walls, nothing placed at random;")
  .replace(C1_, "Keep the same throne, screen, colours and furnishings as image 3 (this same room as drawn before), but the hall is much larger and grander than in image 3, with the floor numbers here:")}
json.dump(outf, open(os.path.join(D, 'prompts_v6f.json'), 'w'), ensure_ascii=False, indent=1)

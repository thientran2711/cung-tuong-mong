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

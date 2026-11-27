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

# ---- v7 (owner Lượt 572 on sheet C, relayed by ROOT-50/PR7 handover; worker PR8)
# (2) KHÔN NINH RECEPTION: NEW LAYOUT of the quality of the HQP reception (image 3 = HQP reception rgXnolAxtc as QUALITY/closeness guide only),
#     its OWN arrangement (L11): grand hall, throne on a platform under a gilt plaque (no writing), carved full-width arch frame, seat rows aligned
#     with the structure, mirrored (Lượt 563), no table in the middle (Lượt 554), full Empress yellow + phoenix (EMP).
KN7 = ("Khôn Ninh cung main reception hall, where the Empress of an ancient Chinese imperial palace receives the consorts, a real room in daily use, no bed anywhere: "
    "a GRAND, very large and high hall (owner Lượt 563: never a small room), seen straight on along its central axis, with the back wall straight across the picture "
    "and both side walls running towards the viewer in correct perspective, meeting the back wall at square corners; red lacquer columns wrapped with gilded "
    "phoenix carving stand in two straight rows along the hall; a high coffered ceiling painted gold and red; a large horizontal gilt plaque carved with phoenixes and "
    "clouds (no writing, no characters) high on the back wall, centred; a carved gilded openwork floor-to-ceiling arch frame (a luozhao) spans the whole width of the "
    "hall from wall to wall, square to the back wall, carved with phoenixes among peonies, framing the raised throne area behind it; inside it, on a wide platform "
    "of three steps with a gilded balustrade, against the back wall, exactly centred and seen straight on, the Empress's throne: a wide gilded carved throne seat "
    "with a tall carved panel back crowned by a golden phoenix, imperial yellow silk cushions embroidered with phoenixes, a small low table with a gold tea set "
    "beside it on the platform; behind the throne a large five-panel gilded screen with a phoenix among peonies; on each side of the throne a tall ceremonial fan of "
    "imperial yellow silk with a phoenix on a long gilded pole, and a pair of golden phoenix figures on tall stands; in front of the arch frame, at the foot of "
    "the platform, a gold crane-shaped incense burner on each side; TWO straight rows of carved gilded square-backed armchairs with imperial yellow cushions and "
    "small tea tables between them (owner Lượt 563), one row along each side wall, mirrored exactly on the central axis, the two rows facing each other across the "
    "open central aisle that leads to the throne platform, each chair lined up with the columns and square to the walls, the rows starting from the arch frame and "
    "ending half way towards the viewer; NO table and NO stools in the middle of the floor (owner Lượt 554): the central aisle in front of the platform stays open "
    "for people to stand; imperial yellow silk curtains tied back with gold tassels at the windows of the side walls, golden lattice windows onto a sunny summer "
    "garden, ornate gilded palace lanterns with yellow tassels hanging in pairs, cloisonné vases of peonies, gilded curio shelves of jade and gold treasures against "
    "the side walls behind the chairs." + EMP + NOSOFA + RECT +
    " LAYOUT NUMBERS (owner Lượt 477, 520): seen as close and as low as in image 3 (image 3 is only a guide for how close, how rich and how finely made the room is, "
    "NOT for its arrangement, colours or furniture: this hall has its own different, grander arrangement as written above); the main throne platform is large and "
    "clear, its base at about two thirds of the picture height; the chair rows come down to about seven eighths of the picture height; the open floor of the "
    "central aisle in front is only a strip of about one tenth of the picture height at the bottom, and nothing stands on it, because people will stand there.")
HHREC7REF = 'rgXnolAxtc'  # image 3 = HQP reception (quality/closeness guide only)
out7 = {'khon-ninh-cung': T.replace('{SEASON_TIME}', 'summer morning').replace('{TIME_LIGHT}', 'morning daylight').replace('{ROOM_LINE}', KN7)
        .replace('{FLOOR}', 'polished stone tiles').replace('{MAT_UNDER}', 'the platform steps').replace('{KEY_PIECE}', 'the throne platform')}

# (1) HQP = PHÓ HẬU: keep both layouts (image 3 = its own picture), change ONLY colour + luxury: yellow about HALF of Khôn Ninh's amount
#     (curtains may now be yellow/golden), imperial near-Empress furniture (richer gilt, throne-like seats); still one step below the Empress.
LUX7B = ("HOÀNG QUÝ PHI level, the Vice-Empress (phó hậu, owner Lượt 572): nearly as splendid as the Empress, only one small step below her: rich gilt carving "
         "everywhere on the furniture, gold lacquer, mother-of-pearl, pearls, jade, coral, cloisonné and kingfisher-blue inlay, many treasures; the main seats "
         "and the bed look imperial and throne-like, with tall carved gilded backs and gilded frames, close to the Empress's own. ")
COL7B = (" COLOURS (owner Lượt 572): golden yellow is strong and clearly visible, about HALF as much yellow as in the Empress's room: golden yellow silk curtains and "
         "bed curtains, golden yellow brocade bedding, seat brocades and cushions, mixed with deep ruby red silks, lanterns and tassels and with dark zitan and "
         "red lacquer wood, so the room reads golden and imperial, only a little less yellow than the Empress's room. Phoenixes allowed: a pair of phoenixes "
         "carved and gilded or embroidered among magnolias on the bed, the screen and the cushions, and a pair of small gilded phoenix figures.")
KEEP7 = (" Keep the same room and the same arrangement as image 3 (this same room as drawn before): the same walls, windows, furniture places and the same "
         "distance; change only the colours and the richness as written here.")
outh7 = {}
for k, p in outh.items():
    q = p.replace(LUX7, LUX7B).replace(COL7, COL7B)
    i = q.index(' LAYOUT NUMBERS'); q = q[:i] + KEEP7 + q[i:]
    q = q.replace('seen as close and as low as in image 3 (image 3 is only a guide for how close and how full the room is, NOT for its arrangement, colours or furniture: this room has its own different arrangement as written above), ', 'seen as in image 3, ')
    # colour words inside the room lines follow her colour point (only colours, layout words untouched)
    for a, b in [('golden apricot brocade', 'golden yellow brocade'), ('golden apricot cushions', 'golden yellow cushions'),
                 ('ruby red silk curtains tied back inside', 'golden yellow silk curtains lined with ruby red tied back inside'),
                 ('deep ruby red sheer curtains tied back with tassels', 'golden yellow sheer curtains tied back with ruby red tassels')]:
        q = q.replace(a, b)
    assert 'apricot' not in q, k
    assert q != p and LUX7B in q and COL7B in q and 'NOT for its arrangement' not in q, k
    outh7[k] = q
out7.update(outh7)
H7REF = {'truong-xuan-cung-hqp-ngu': 's7I0dD0l8e', 'truong-xuan-cung-hqp': 'rgXnolAxtc', 'khon-ninh-cung': HHREC7REF}
assert all('{' not in v for v in out7.values())
json.dump(out7, open(os.path.join(D, 'prompts_v7.json'), 'w'), ensure_ascii=False, indent=1)
print('v7', {k: len(v) for k, v in out7.items()})

# ---- v8 (owner Lượt 584 + 587 on sheet C v7, relayed by ROOT-51; rule L14): layouts KEEP (image 3 = each room's own v7/v6 picture), colours only,
#      + Khôn Ninh reception: much higher ceiling so people look small in the hall.
# HQP = ORANGE + yellow (bedsheet orange + yellow, never red + yellow), LESS yellow than v7; HH = yellow + more RED.
COL8 = (" COLOURS (owner Lượt 584, rank colours: Hoàng quý phi = ORANGE + yellow): warm bright orange is the main colour of the silks, with golden yellow "
        "as its partner: bright orange silk bedding and seat brocades with golden yellow borders and embroidery, orange silk curtains lined with golden "
        "yellow, orange and gold tassels; yellow clearly LESS than in an Empress's room (only borders, linings, embroidery and gilt); no red silks, no "
        "red bedding; the wood stays dark zitan with gold lacquer. Phoenixes allowed: a pair of phoenixes carved and gilded or embroidered among "
        "magnolias on the bed, the screen and the cushions, and a pair of small gilded phoenix figures.")
KEEP8 = (" Keep the same room, the same arrangement and the same distance as image 3 (this same room as drawn before): the same walls, windows, "
         "furniture places and size; change only the colours as written here.")
out8 = {}
for k in ('truong-xuan-cung-hqp-ngu', 'truong-xuan-cung-hqp'):
    q = out7[k].replace(COL7B, COL8).replace(KEEP7, KEEP8)
    for a, b in [('golden yellow silk curtains lined with ruby red tied back inside', 'bright orange silk curtains lined with golden yellow tied back inside'),
                 ('golden yellow brocade bedding embroidered with', 'bright orange silk brocade bedding with golden yellow borders, embroidered with'),
                 ('golden yellow brocade cushions', 'bright orange brocade cushions with golden yellow borders'),
                 ('golden yellow cushions', 'bright orange cushions with golden yellow borders'),
                 ('golden yellow sheer curtains tied back with ruby red tassels', 'bright orange sheer curtains tied back with golden tassels'),
                 ('lanterns with ruby red tassels', 'lanterns with orange tassels'), ('a ruby red robe', 'an orange silk robe')]:
        q = q.replace(a, b)
    assert COL8 in q and KEEP8 in q and 'ruby' not in q and 'golden yellow silk curtains' not in q, k
    out8[k] = q
# HH bedroom: more RED (red bedsheet). Base = v6 (the current picture YMlHuhtWeC), floor sentence -> keep same view.
RED8 = (" MORE RED (owner Lượt 584): crimson red is as strong as the imperial yellow: the bedding is rich crimson red silk brocade embroidered with golden "
        "phoenixes and peonies, with imperial yellow borders and yellow and red cushions; red silk linings, red cushions on the stools, red and gold tassels, "
        "red lacquer pillars; the yellow stays in the gauze curtains, the gilt and the embroidery.")
hb = out6['khon-ninh-cung-ngu']
FS6 = hb[hb.index(' FLOOR SHARE (owner Lượt 520):'):hb.index(' FLOOR: ')]
hb8 = hb.replace('imperial yellow silk brocade bedding embroidered with phoenixes and peonies with crimson red borders and red silk cushions',
                 'rich crimson red silk brocade bedding embroidered with golden phoenixes and peonies, with imperial yellow borders and red and yellow silk cushions')
assert hb8 != hb
out8['khon-ninh-cung-ngu'] = hb8.replace(FS6, RED8 + KEEP8)
# HH reception: same layout (aFGyB4ZfSh), more red, MUCH higher hall so people look small in it.
kr = out7['khon-ninh-cung']
LN7 = kr[kr.index(' LAYOUT NUMBERS (owner Lượt 477, 520):'):kr.index(' FLOOR: ')]
HIGH8 = (" Keep the same hall and the same arrangement as image 3 (this same hall as drawn before: the plaque, the arch frame, the throne platform, the "
         "screen, the fans and the two mirrored chair rows), but the hall is MUCH HIGHER and grander (owner Lượt 584: the ceiling was too low, people looked too "
         "big for the room): seen from a little farther back, the red columns are very tall, the coffered ceiling is high above and fully visible at the top, "
         "a large empty height of air between the top of the arch frame and the ceiling; everything in the hall is smaller in the picture than in image 3: the "
         "armchair backs reach only about one fifth of the picture height, the throne platform is far back in the middle of the picture, so a standing woman "
         "placed in front (about three quarters of the picture height tall) looks small in this vast hall. The open floor of the central aisle at the bottom "
         "stays a strip of about one tenth of the picture height, nothing on it." +
         " MORE RED (owner Lượt 584): crimson red as strong as the imperial yellow: crimson red silk cushions with yellow borders on the armchairs, crimson red "
         "silk hangings and banners between the columns, red lacquer columns and beams, red and gold tassels; yellow stays on the throne, the screen, the fans, the curtains and the gilt.")
out8['khon-ninh-cung'] = kr.replace(LN7, HIGH8).replace('carved gilded square-backed armchairs with imperial yellow cushions', 'carved gilded square-backed armchairs with crimson red cushions')
assert HIGH8 in out8['khon-ninh-cung']
H8REF = {'truong-xuan-cung-hqp-ngu': '9ZHI728NYZ', 'truong-xuan-cung-hqp': 'jUoWKaeLD0', 'khon-ninh-cung-ngu': 'YMlHuhtWeC', 'khon-ninh-cung': 'aFGyB4ZfSh'}
assert all('{' not in v for v in out8.values())
json.dump(out8, open(os.path.join(D, 'prompts_v8.json'), 'w'), ensure_ascii=False, indent=1)
print('v8', {k: len(v) for k, v in out8.items()})

# ---- v9 (owner Lượt 602/604/607/610, rules L13–L18; worker PR9 for ROOT-52): ONE COMMON room block + per-room parts.
# Method KEPT (L17, Lượt 610): image 1 = tẩm cung gOmYI7iSXO, image 2 = M09 EbYJzsMuuO, image 3 = an APPROVED first-generation room picture
# (never a re-gen of a re-gen: PR8 drift diagnosis). Luxury words moderate; colour LEVEL in words (B18); rank colours = triều phục option B (L17).
# Fit the game as it is (L18): iPad dư đồ frame = people band 15.1–88.4 % H, feet line 88.4 %, centres x 14.5/36.2/56.3/76.4 %, empty floor 11.6 % under the feet.
# L30 WINDOW RULE (owner L2387 + HIST2): shared window block, appended to every room style block below.
WINDOW_L30 = " " + open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "common_blocks", "window_L30.txt"), encoding="utf-8").read().strip()
C9_STYLE = ("A brand-new painting of a natural, lived-in, richly furnished room in an ancient Chinese imperial palace, painted exactly like image 1 "
    "(the bedroom): same hand, same brushwork, same soft painterly finish, same natural warm light, same depth with furniture, carved lattice windows and objects "
    "arranged through the room; the soft painted style of our game, never glossy, never over-detailed, never a shiny 3D render. "
    "COLOUR LEVEL: soft, clear colours at the same level as the girl in image 2 and the room in image 1: gentle, light and pretty, every colour clearly "
    "readable, never saturated, never glaring, never neon, never pastel or washed out, never grey or dull. Wide panoramic view, summer morning.") + WINDOW_L30
C9_CAM = (" CAMERA AND SCALE: eye level of a standing woman, the same camera distance, eye level and natural people scale as image 3 {IMG3}; no ceiling "
    "in the picture: the walls, pillars and hanging lanterns run out of the top edge. The room is made for four standing women placed later in front of "
    "the furniture: each woman about three quarters of the picture height tall, her feet at about seven eighths of the picture height, spread across the "
    "width (centres at about 15, 36, 56 and 76 % of the width). So the furniture stands BEHIND where they will stand: the bases of the beds, seats, tables "
    "and stands in that band sit no lower than seven eighths of the picture height; below that, the floor of the room simply continues to the bottom "
    "edge, open, nothing standing on it. The corners are furnished, never bare, and the left part of the room near the viewer holds only small, low "
    "objects, never a large piece close up at the left edge. The floor strip under the feet (the bottom tenth of the picture) is calm and evenly lit "
    "plain floor, without busy pattern or strong reflections, so three short lines of small name text placed there later read clearly.")
C9_END = (" FLOOR: {FLOOR}, no large rug or carpet covering it. LIGHT: soft warm morning daylight from the right, like the light on the girl in image 2. "
    "Natural and furnished, never an empty stage; people will be placed in it later. Empty of people, no text, no writing, no characters.")
def room9(room, img3, floor):
    return C9_STYLE + " ROOM: " + room + C9_CAM.replace('{IMG3}', img3) + C9_END.replace('{FLOOR}', floor)
# rank colour sentences (triều phục option B codes, L17) with the medium-tone wording (B18)
RC9 = {5: "RANK COLOUR: lavender-violet like #A88BCB, a soft medium lavender-violet, woven through the bedding, bed curtains, cushions and tassels, with ivory and soft jade-green as its partners.",
       7: ("RANK COLOURS (Hoàng quý phi = orange + yellow, L14): honey-amber orange like #E3A25B, a soft medium honey-amber, is the main colour of the silks "
           "(bedding, bed curtains, seat cushions, lantern tassels), with golden yellow like #EFBD69 as its partner in the borders, linings and embroidery; "
           "clearly less yellow than an Empress's room; no red silks, no red bedding; the wood stays dark zitan with gold lacquer."),
       8: ("RANK COLOURS (Hoàng hậu = yellow + red, L14): royal yellow like #EFBD69, a soft medium royal yellow, on the throne cushions, the ceremonial fans "
           "and the curtains, mixed with brick-crimson like #C65A4C on the armchair cushions, the silk hangings and the tassels, and court red like #99443F on "
           "the lacquer columns and beams, with gilt; festive and beautiful, never all yellow.")}
# (a) Phi bedroom (t5): same room + arrangement as approved v6b aFGyN6afSh (1st gen of v3), redrawn to fit the iPad frame (L18).
PHI9 = (CPA_BED + "at the centre of the room, the large clear main subject, " + RANK['phi']['bed'] + "; around it " + RANK['phi']['bedx'] + ". "
        + CARD_CP + "PHI level, clearly richer than a Tần: deeper carving, jade-green inlay, gilt edging on the furniture, silk brocade, jade and porcelain treasures. "
        + RC9[5] + NOPE + " Keep the same room and the same arrangement as image 3 (this same room as drawn before), the whole canopy bed with its top inside the picture.")
PHI9 = PHI9.replace('soft purple gauze', 'lavender-violet gauze').replace('purple silk brocade', 'lavender-violet silk brocade').replace('purple cushions', 'lavender-violet cushions').replace('purple tassels', 'lavender-violet tassels').replace('a purple silk robe', 'a lavender-violet silk robe')
# (b) HQP bedroom (t7): same room + arrangement as approved v6-level s7I0dD0l8e (owner Lượt 572: layout beautiful); orange + yellow (L14); moderate near-Empress luxury.
HQPR = HQP['truong-xuan-cung-hqp-ngu']['room']
HQP9 = HQPR[:HQPR.index(CARD_TX)]
for a, b in [('ruby red silk curtains tied back inside', 'honey-amber silk curtains lined with golden yellow tied back inside'),
             ('golden apricot brocade bedding', 'honey-amber silk brocade bedding with golden yellow borders,'),
             ('lanterns with ruby red tassels', 'lanterns with honey-amber tassels'), ('a ruby red robe', 'a honey-amber silk robe')]:
    assert a in HQP9, a; HQP9 = HQP9.replace(a, b)
LUX9 = ("HOÀNG QUÝ PHI level, the Vice-Empress: one small step below the Empress: gilt carving on the bed and the main seats, gold lacquer, mother-of-pearl, "
        "pearls, jade, coral, cloisonné and kingfisher-blue inlay, fine treasures on the shelves; the bed looks imperial with a tall carved gilded crown. "
        "Phoenixes allowed: a pair of phoenixes carved or embroidered among magnolias on the bed, the screen and the cushions. ")
HQP9 = HQP9 + CARD_TX + LUX9 + RC9[7] + RECT + " Keep the same room and the same arrangement as image 3 (this same room as drawn before); change the colours as written here."
# (c) HH reception (t8): KN7 own layout (L11) WITHOUT any ceiling / height plan (owner Lượt 604); grandeur from throne, screen, columns, colours.
KN9 = KN7[:KN7.index(EMP)]
for a, b in [("a GRAND, very large and high hall (owner Lượt 563: never a small room), seen straight on", "a grand hall (owner Lượt 563: never a small room), seen straight on"),
             ("a high coffered ceiling painted gold and red; ", ""), ("high on the back wall", "on the back wall"),
             ("a carved gilded openwork floor-to-ceiling arch frame", "a tall carved gilded openwork arch frame"),
             ("carved gilded square-backed armchairs with imperial yellow cushions", "carved gilded square-backed armchairs with brick-crimson cushions"),
             ("imperial yellow silk cushions embroidered with phoenixes", "royal yellow silk cushions embroidered with phoenixes"),
             ("a tall ceremonial fan of imperial yellow silk", "a tall ceremonial fan of royal yellow silk"),
             ("imperial yellow silk curtains tied back with gold tassels", "royal yellow silk curtains tied back with brick-crimson tassels")]:
    assert a in KN9, a; KN9 = KN9.replace(a, b)
KN9 += (" The grandeur comes from the throne, the screen, the columns, the gilt and the colours, NOT from height: the hall is seen as close as an "
        "ordinary approved room, the columns simply run out of the top of the picture. The most splendid room of the palace, yet in the same soft painted "
        "style: phoenix motifs carved, embroidered and gilded, gilt on the red columns, fine treasures. " + RC9[8] + NOSOFA + RECT)
G9 = 'gOmYI7iSXO', 'EbYJzsMuuO'
# (d) HH bedroom (owner Lượt 613, L14): TWO samples, A = 2 walls (wider, her preference) and B = 3 walls; same everything else.
#     Room line = the v3/v6 Khôn Ninh bedroom words with red bedding (Lượt 584) and option-B colours; image 3 = layout + camera guide only.
HHBED9 = ("Khôn Ninh cung bedroom, the private bedchamber of the Empress in an ancient Chinese imperial palace, a real room in daily use, open, airy and wide, {WALLS}; "
    "red lacquer pillars with gilded phoenix carving, golden lattice windows onto a sunny summer garden; against the back wall, centred, square to it and seen "
    "straight on, the large clear main subject, one magnificent canopy bed of gilded carved wood with golden phoenixes on its crown, royal yellow gauze curtains "
    "lined with brick-crimson silk, tied back with red and gold tassels, brick-crimson silk brocade bedding embroidered with golden phoenixes and peonies, with "
    "royal yellow borders and red and yellow silk cushions; along the walls a grand dressing table with a tall gilt mirror and a jewellery cabinet with gold "
    "phoenix hairpins and pearls, a gilded folding screen with a phoenix among peonies, stools with red and yellow brocade cushions, gilded palace lanterns, a "
    "pair of golden phoenix figures on stands, cloisonné vases of peonies, a tea table with a gold tea set, a curio shelf of jade and gold treasures, a gold "
    "incense burner, slippers on the bed step. The most splendid bedroom of the palace, yet in the same soft painted style: phoenix motifs carved, embroidered "
    "and gilded, gilt on the red pillars, fine treasures. " + RC9[8].replace("on the throne cushions, the ceremonial fans and the curtains", "on the bed curtains, "
    "the borders and the cushions").replace("on the armchair cushions, the silk hangings and the tassels", "on the bedding (a red bedsheet), the curtain linings, "
    "the stool cushions and the tassels") + RECT + " Image 3 is a guide ONLY for the wall layout, the camera distance and the people scale, NOT for its colours, "
    "furniture or arrangement.")
assert 'throne' not in HHBED9 and 'armchair' not in HHBED9
W2 = ("seen with TWO walls only (owner Lượt 613: two walls read wider): the back wall straight across the picture and the right side wall running towards "
      "the viewer in clear perspective, meeting at a square corner, like the wall layout of image 3")
W3 = ("seen with THREE walls: the back wall straight across the middle of the picture and the left and right side walls running towards the viewer in "
      "clear perspective, meeting it at square corners, like the wall layout of image 3")
out9 = {'canh-phuc-cung-phi-ngu': dict(prompt=room9(PHI9, "(this same room as drawn before)", "warm polished wooden floorboards"), refs=[*G9, 'aFGyN6afSh']),
        'truong-xuan-cung-hqp-ngu': dict(prompt=room9(HQP9, "(this same room as drawn before)", "warm polished wooden floorboards"), refs=[*G9, 's7I0dD0l8e']),
        'khon-ninh-cung-ngu-A2': dict(prompt=room9(HHBED9.replace('{WALLS}', W2), "(another approved room, used only as the guide written above)", "polished stone tiles"), refs=[*G9, 'rgXnolAxtc']),
        'khon-ninh-cung-ngu-B3': dict(prompt=room9(HHBED9.replace('{WALLS}', W3), "(another approved room, used only as the guide written above)", "polished stone tiles"), refs=[*G9, 's7I0dD0l8e']),
        'khon-ninh-cung': dict(prompt=room9(KN9, "(image 3 is another approved reception room, a guide ONLY for camera distance, eye level and people scale, NOT for its arrangement, colours or furniture: this hall has its own arrangement as written above)", "polished stone tiles"), refs=[*G9, 'rgXnolAxtc'])}
# GATE v9: common block present, method refs kept, no drift words, no ceiling/height plan, image 3 never a re-gen chain picture (v7/v8 gens).
DRIFT_IMG3 = {'9ZHI728NYZ', 'jUoWKaeLD0', 'P3Q8IIK42C', 'jUoc0VKLD0', 'EbYNiqeuuO', 'xSBW07fjfW', 'aFGyB4ZfSh'}
for k, v in out9.items():
    p = v['prompt']
    assert p.startswith(C9_STYLE) and C9_CAM.split('{IMG3}')[0] in p and C9_END.split('{FLOOR}')[1] in p, k
    assert v['refs'][:2] == list(G9) and len(v['refs']) == 3 and v['refs'][2] not in DRIFT_IMG3, k
    for w in ('everywhere', 'BRIGHT', 'bright', 'MUCH HIGHER', 'coffered', 'high ceiling', 'floor-to-ceiling', 'farther back', 'throne-like', 'apricot', 'ruby', '{'):
        assert w not in p, (k, w)
    assert k != 'khon-ninh-cung' or 'imperial yellow' not in p
json.dump(out9, open(os.path.join(D, 'prompts_v9.json'), 'w'), ensure_ascii=False, indent=1)
print('v9', {k: len(v['prompt']) for k, v in out9.items()})

# ---- v10 (owner Lượt 622 via ROOT-52/53; L14 every room 2 versions, L19 layout variety; A20 only her points; worker PR9)
# KEPT: Phi bedroom v9 4RFIyNR9Aa (= 2-wall model), HH bedroom B v9 cpS5YIl0eP (= 3-wall model). Mirrors uploaded for "window LEFT":
#   1ldYySkr4r = HH bedroom B mirrored, 8aiwqQTIrU = Phi bedroom v9 mirrored (img/_review/place-rank/v10ref/).
M3, M2, M3X, M2X = 'cpS5YIl0eP', '4RFIyNR9Aa', '1ldYySkr4r', '8aiwqQTIrU'
GUIDE = "(another approved room, used only as the guide written above)"
GUIDE_S = (" Image 3 is a guide ONLY for the wall layout, the camera distance, the floor amount and the people scale, NOT for its colours, "
           "furniture or arrangement: this room has its own arrangement as written here.")
FLOOR10 = (" FLOOR AMOUNT (owner Lượt 622): no more open floor than in image 3: the furniture groups come forward close behind where the people "
           "stand, their bases at about four fifths to seven eighths of the picture height, so only a little empty floor shows between them and the feet.")
HQPC10 = ("RANK COLOURS (Hoàng quý phi = orange + yellow, owner Lượt 622: a SOFT honey orange, never deep, never strong): a soft, light honey orange, "
          "lighter and gentler than #E3A25B, like #EDB57A, is the main colour of the silks (bedding, bed curtains, seat cushions, lantern tassels), with "
          "pale golden yellow like #EFBD69 as its partner in the borders, linings and embroidery; clearly less yellow than an Empress's room; no red silks; "
          "the wood stays dark zitan with gold lacquer.")
WL2 = "seen with TWO walls only: the back wall straight across the picture and the LEFT side wall running towards the viewer in clear perspective, meeting at a square corner, like the wall layout of image 3"
WL3 = "seen with THREE walls: the back wall straight across the middle of the picture and the left and right side walls running towards the viewer in clear perspective, meeting it at square corners, like the wall layout of image 3"
out10 = {}
# 1) Phi bedroom 3-wall: v9 Phi words; only the walls + image 3 change.
KEEPPHI = " Keep the same room and the same arrangement as image 3 (this same room as drawn before), the whole canopy bed with its top inside the picture."
assert KEEPPHI in PHI9
PHI10 = PHI9.replace(KEEPPHI, " The same Cảnh Phúc bedroom " + WL3 + ": the round moon-gate partition and the shelves on the left side wall, tall lattice windows "
        "onto the garden in the right side wall, the canopy bed against the back wall; the whole canopy bed with its top inside the picture." + GUIDE_S)
out10['canh-phuc-cung-phi-ngu-3w'] = dict(prompt=room9(PHI10, GUIDE, "warm polished wooden floorboards"), refs=[*G9, M3])
# 2) HH bedroom A 2-wall: v9 A words + less floor; image 3 = the 2-wall model (Phi v9).
out10['khon-ninh-cung-ngu-2w'] = dict(prompt=room9(HHBED9.replace('{WALLS}', W2) + FLOOR10, GUIDE, "polished stone tiles"), refs=[*G9, M2])
# 3) HH reception: less floor; 3-wall (as v9) + 2-wall (back + left wall; rows mirrored on the axis, the right row along the columns).
KN10_2 = KN9.replace("with the back wall straight across the picture and both side walls running towards the viewer in correct perspective, meeting the back wall at square corners",
        "with TWO walls only: the back wall straight across the picture and the LEFT side wall running towards the viewer in correct perspective, meeting at a square corner, the right side open between columns")
KN10_2 = KN10_2.replace("one row along each side wall, mirrored exactly", "one row along the left side wall and one row along the line of columns on the open right side, mirrored exactly")
KN10_2 = KN10_2.replace("at the windows of the side walls", "at the windows of the left wall").replace("against the side walls behind the chairs", "against the left wall behind the chairs")
assert KN10_2.count('TWO walls only') == 1 and 'line of columns on the open right side' in KN10_2
CAMKN = "(image 3 is another approved reception room, a guide ONLY for camera distance, eye level and people scale, NOT for its arrangement, colours or furniture: this hall has its own arrangement as written above)"
out10['khon-ninh-cung-3w'] = dict(prompt=room9(KN9 + FLOOR10, GUIDE, "polished stone tiles"), refs=[*G9, M3])
out10['khon-ninh-cung-2w'] = dict(prompt=room9(KN10_2 + FLOOR10, GUIDE, "polished stone tiles"), refs=[*G9, M2])
# 4) HQP bedroom: NEW own layout (L19: window LEFT, bed in the right half, a canopy bed not the babu bed) + soft honey orange; 3-wall + 2-wall.
HQPB10 = ("Trường Xuân cung chính điện bedroom, the private bedchamber of the Imperial Noble Consort (Hoàng quý phi), the highest consort below the Empress, "
    "in ancient China, a real room in daily use, open and airy, {WALLS}; dark zitan pillars and beams with gold lacquer; tall carved lattice windows in the LEFT "
    "side wall onto a sunny courtyard garden with a magnolia tree; against the back wall in the RIGHT half of the room, square to it and seen straight on, the "
    "large clear main subject: a grand canopy bed of carved zitan with a tall carved gilded crown and gold lacquer, soft honey-orange silk curtains lined with "
    "pale golden yellow, tied back, soft honey-orange silk brocade bedding with pale golden yellow borders, embroidered with white magnolias and a pair of small "
    "phoenixes, pearl tassels on the curtain ties; in the middle of the back wall, left of the bed, a tall carved openwork partition with a vase-shaped doorway "
    "giving a glimpse of a small study with books; a tall folding screen with kingfisher-blue feather inlay and magnolias stands beside the bed on its right; "
    "under the left windows a gold-lacquer dressing table with a tall bronze mirror and a jewellery cabinet open with pearls and jade, and a square-backed zitan "
    "chair; a zitan curio shelf of jade, coral and cloisonné treasures, ornate hanging palace lanterns with soft honey-orange tassels, a clothes stand with a soft "
    "honey-orange silk robe, cloisonné vases of magnolia branches, a gold incense burner, slippers on the bed step. " + CARD_TX + LUX9 + HQPC10 + RECT + GUIDE_S + FLOOR10)
out10['truong-xuan-cung-hqp-ngu-3w'] = dict(prompt=room9(HQPB10.replace('{WALLS}', WL3), GUIDE, "warm polished wooden floorboards"), refs=[*G9, M3X])
out10['truong-xuan-cung-hqp-ngu-2w'] = dict(prompt=room9(HQPB10.replace('{WALLS}', WL2), GUIDE, "warm polished wooden floorboards"), refs=[*G9, M2X])
# 5) HQP reception: its OWN layout (rgXnolAxtc) + soft honey orange; 2-wall (as drawn, image 3 = itself) + 3-wall.
HR = HQP['truong-xuan-cung-hqp']['room']; HR = HR[:HR.index(CARD_TX)]
for a, b in [('golden apricot brocade cushions', 'soft honey-orange brocade cushions with pale golden yellow borders'),
             ('golden apricot cushions', 'soft honey-orange cushions'),
             ('deep ruby red sheer curtains tied back with tassels', 'soft honey-orange sheer curtains tied back with pale golden tassels'),
             ('lanterns with ruby red tassels', 'lanterns with soft honey-orange tassels')]:
    assert a in HR, a; HR = HR.replace(a, b)
HR = HR.replace('a carved openwork floor-to-ceiling arch frame', 'a tall carved openwork arch frame')
assert 'ruby' not in HR and 'apricot' not in HR
HR3 = HR.replace("seen straight on with the back wall straight across the picture and the right side wall running towards the viewer in clear perspective, meeting at a square corner",
                 "seen straight on " + WL3.replace("seen with THREE walls", "with THREE walls").replace(", like the wall layout of image 3", ""))
assert HR3 != HR
REC10 = CARD_TX + LUX9.replace("on the bed and the main seats", "on the daybed and the main seats").replace("the bed looks imperial with a tall carved gilded crown", "the daybed looks imperial with a tall carved gilded back") + HQPC10 + NOSOFA + RECT
out10['truong-xuan-cung-hqp-2w'] = dict(prompt=room9(HR + REC10 + " Keep the same room and the same arrangement as image 3 (this same room as drawn before); change the colours as written here." + FLOOR10.replace('no more open floor than in image 3', 'less open floor than in image 3, like the approved bedrooms'),
                                        "(this same room as drawn before)", "warm polished wooden floorboards"), refs=[*G9, 'rgXnolAxtc'])
out10['truong-xuan-cung-hqp-3w'] = dict(prompt=room9(HR3 + REC10 + GUIDE_S + FLOOR10, GUIDE, "warm polished wooden floorboards"), refs=[*G9, M3])
for k, v in out10.items():
    p = v['prompt']
    assert p.startswith(C9_STYLE) and C9_END.split('{FLOOR}')[1] in p and v['refs'][:2] == list(G9) and v['refs'][2] not in DRIFT_IMG3, k
    for w in ('everywhere', 'BRIGHT', 'bright', 'MUCH HIGHER', 'coffered', 'high ceiling', 'floor-to-ceiling', 'farther back', 'throne-like', 'apricot', 'ruby', '{'):
        assert w not in p, (k, w)
json.dump(out10, open(os.path.join(D, 'prompts_v10.json'), 'w'), ensure_ascii=False, indent=1)
print('v10', {k: len(v['prompt']) for k, v in out10.items()})
# ---- v10b (1 redo each, our full-size check: owner Lượt 622 point "less floor" NOT met in HH bedroom 2w WDg5tUgcXe (bed base ~62 % H),
#      HH reception 3w 3zKfpXnREY / 2w eIPsQKidqL (platform ~70 %, aisle floor ~25-30 %)): ONLY the FLOOR AMOUNT sentence changes (A17).
FLOOR10B_BED = (" FLOOR AMOUNT (owner Lượt 622: too much empty floor before): the camera stands closer, so the room fills the picture: the bed is large, "
    "the front of its bed step at about four fifths of the picture height, and the furniture groups at the sides come forward to about seven eighths "
    "of the picture height, so only a little empty floor shows between them and the feet.")
FLOOR10B_REC = (" FLOOR AMOUNT (owner Lượt 622: too much empty floor before): the camera stands closer, so the hall fills the picture: the throne platform "
    "is large, the front of its lowest step at about four fifths of the picture height, and the chair rows at the sides come forward to about seven eighths "
    "of the picture height, so only a little empty floor of the aisle shows between them and the feet.")
out10b = {'khon-ninh-cung-ngu-2w': dict(out10['khon-ninh-cung-ngu-2w'], prompt=out10['khon-ninh-cung-ngu-2w']['prompt'].replace(FLOOR10, FLOOR10B_BED)),
          'khon-ninh-cung-3w': dict(out10['khon-ninh-cung-3w'], prompt=out10['khon-ninh-cung-3w']['prompt'].replace(FLOOR10, FLOOR10B_REC)),
          'khon-ninh-cung-2w': dict(out10['khon-ninh-cung-2w'], prompt=out10['khon-ninh-cung-2w']['prompt'].replace(FLOOR10, FLOOR10B_REC))}
for k, v in out10b.items(): assert v['prompt'] != out10[k]['prompt'] and FLOOR10 not in v['prompt'], k
json.dump(out10b, open(os.path.join(D, 'prompts_v10b.json'), 'w'), ensure_ascii=False, indent=1)
print('v10b', list(out10b))
# ---- v11 (owner Lượt 635 via ROOT-53, L14 rewritten: each room = FRONTAL + ANGLED-CAMERA version of the SAME room; worker PR10)
# A17: angled = the room's frontal prompt UNCHANGED except: straight-on/guide wording removed, ANG11 camera sentence added,
#      image 3 = the frontal picture itself (same room), image 4 = Phi v9 4RFIyNR9Aa (the owner's angle model) as camera guide only.
ANGREF = '4RFIyNR9Aa'
ANG11 = (" ANGLED CAMERA (owner Lượt 635): this is the SAME room as image 3: the same furniture, the same colours, the same walls, windows and objects, "
    "the same room identity; only the camera is turned to an oblique angle: it stands in the right part of the room and looks towards the back-left "
    "corner, turned about forty degrees to the left, so the back wall runs diagonally into the depth and much more of the left side wall with its "
    "windows is seen; the {SUBJ} is seen at a slant from its front corner, so two of its faces show (its front and its side), like the slanting view "
    "of the bed in image 4. The furniture still stands square to the walls; only the camera is turned. Image 4 is a guide ONLY for this oblique camera "
    "angle, NOT for its colours, furniture or arrangement. It must NOT look like the straight-on view of image 3, and never a mirror of it.")
STRAIGHT = [("seen straight on along its central axis, with", "with"), ("seen straight on with THREE walls:", "with THREE walls:"),
            (", centred, square to it and seen straight on,", ", centred, square to it,"), ("exactly centred and seen straight on,", "exactly centred,"),
            (", like the wall layout of image 3", ""), (GUIDE_S, ""),
            (" Image 3 is a guide ONLY for the wall layout, the camera distance and the people scale, NOT for its colours, furniture or arrangement.", "")]
SAME_IMG3 = "(this same room, drawn straight on)"
def angled(p, subj):
    room = p[p.index(' ROOM: ') + 7:p.index(' CAMERA AND SCALE:')]
    floor = p[p.index(' FLOOR: ') + 8:p.index(', no large rug')]
    for a, b in STRAIGHT: room = room.replace(a, b)
    assert 'straight on' not in room and 'image 3' not in room.replace('than in image 3', ''), room
    return room9(room + ANG11.replace('{SUBJ}', subj), SAME_IMG3, floor)
out11 = {}
# 1) HQP bedroom FRONTAL 3-wall, redo of 9ZHmVqFNYZ: HQPB10 room words (own layout, window left, bed right half) + WL3;
#    changes (owner Lượt 635): bed big with real space; soft honey orange like Xm9gqieBfo → image 3 = Xm9gqieBfo (same room) instead of the HH-B mirror.
BIG11 = (" BED SIZE (owner Lượt 635): the canopy bed is big and takes real space in the room: about one third of the picture width, its crown near the "
         "top edge, standing free with open floor around it, never squeezed between shelves, screens or other furniture.")
SAMEX = (" Image 3 is this same room as drawn before (there seen with two walls): keep its furniture, its arrangement and its soft honey-orange colour "
         "level, but now seen straight on with three walls.")
h1 = HQPB10.replace('{WALLS}', WL3).replace(', like the wall layout of image 3', '').replace(GUIDE_S, SAMEX) + BIG11
out11['truong-xuan-cung-hqp-ngu-F3'] = dict(prompt=room9(h1, "(this same room as drawn before)", "warm polished wooden floorboards"), refs=[*G9, 'Xm9gqieBfo'])
# 3) HQP reception ANGLED of O6EoWbJynm ; 4) HH bedroom ANGLED of cpS5YIl0eP ; 5) HH reception ANGLED of bxMA4ov5Y2
out11['truong-xuan-cung-hqp-A'] = dict(prompt=angled(out10['truong-xuan-cung-hqp-3w']['prompt'], "host daybed on its platform with the arch frame"), refs=[*G9, 'O6EoWbJynm', ANGREF])
out11['khon-ninh-cung-ngu-A'] = dict(prompt=angled(out9['khon-ninh-cung-ngu-B3']['prompt'] + '', "canopy bed") , refs=[*G9, 'cpS5YIl0eP', ANGREF])
out11['khon-ninh-cung-A'] = dict(prompt=angled(out10b['khon-ninh-cung-3w']['prompt'], "throne platform with its arch frame"), refs=[*G9, 'bxMA4ov5Y2', ANGREF])
# HH bedroom (owner Lượt 635: HH beds big) — same BIG11 sentence on the angled HH bedroom
out11['khon-ninh-cung-ngu-A']['prompt'] = out11['khon-ninh-cung-ngu-A']['prompt'].replace(ANG11.replace('{SUBJ}', 'canopy bed'), ANG11.replace('{SUBJ}', 'canopy bed') + BIG11)
# 6) Cảnh Phúc QUÝ PHI bedroom FRONTAL 2-wall (palaces alternate; L14) — room words of approved v6 gOmViD0SXO; changes: two walls (window LEFT, L19),
#    rank colour t6 option B #4F86A8 + royal yellow touches (L17, B21). image 3 = gOmViD0SXO (same room as drawn before).
QV6 = json.load(open(os.path.join(D, 'prompts_v6.json')))['canh-phuc-cung-quyphi-ngu']
QV6 = QV6 if isinstance(QV6, str) else QV6['prompt']
QR = QV6[QV6.index(' ROOM: ') + 7:QV6.index(' ROOM SHAPE')]
for a, b in [("seen straight on as a correct box of three walls with square corners: the back wall straight across the picture and the left and right side walls running towards the viewer in clear one-point perspective",
              "seen straight on with TWO walls only: the back wall straight across the picture and the LEFT side wall running towards the viewer in clear perspective, meeting at a square corner"),
             ("tall carved lattice windows in the right side wall", "tall carved lattice windows in the LEFT side wall"),
             ("tall curio shelves standing flat against the left side wall", "tall curio shelves standing flat against the back wall at its right end"),
             ("rose red gauze curtains", "soft steel-blue gauze curtains"), ("rose red silk brocade bedding", "soft steel-blue silk brocade bedding"),
             ("the rose red cushions", "the steel-blue cushions"), ("round stools with rose red cushions", "round stools with steel-blue cushions"),
             ("lanterns with rose red tassels", "lanterns with steel-blue tassels"), ("a rose red silk robe", "a steel-blue silk robe"),
             ("The rose red accent colour is woven through the bedding, curtains and cushions.",
              "RANK COLOUR (Quý phi, L17): steel blue like #4F86A8, a soft medium steel blue, woven through the bedding, bed curtains, cushions and tassels, "
              "with royal yellow like #EFBD69 as touches (the brocade throw, cushion trims, tassels) and ivory and soft jade-green as partners.")]:
    assert a in QR, a; QR = QR.replace(a, b)
assert 'rose red' not in QR
QR += RECT + (" Image 3 is this same room as drawn before (there with three walls and rose red silks): keep its furniture and its arrangement around the "
              "centred bed with the two moon gates, but now with two walls and the rank colour written here.") + FLOOR10
out11['canh-phuc-cung-quyphi-ngu-F2'] = dict(prompt=room9(QR, "(this same room as drawn before)", "warm polished wooden floorboards"), refs=[*G9, 'gOmViD0SXO'])
for k, v in out11.items():
    p = v['prompt']
    assert p.startswith(C9_STYLE) and C9_END.split('{FLOOR}')[1] in p and v['refs'][:2] == list(G9) and v['refs'][2] not in DRIFT_IMG3, k
    for w in ('everywhere', 'BRIGHT', 'bright', 'MUCH HIGHER', 'coffered', 'high ceiling', 'floor-to-ceiling', 'farther back', 'throne-like', 'apricot', 'ruby', '{'):
        assert w not in p, (k, w)
json.dump(out11, open(os.path.join(D, 'prompts_v11.json'), 'w'), ensure_ascii=False, indent=1)
print('v11', {k: len(v['prompt']) for k, v in out11.items()})
# ---- v11b: ANGLED versions of the two v11 frontals (image 3 = the new frontal gen itself; same angled() rule)
STRAIGHT += [(" square to it and seen straight on,", " square to it,"), (SAMEX, ""), ("seen straight on with TWO walls only", "with TWO walls only"),
             (" Image 3 is this same room as drawn before (there with three walls and rose red silks): keep its furniture and its arrangement around the "
              "centred bed with the two moon gates, but now with two walls and the rank colour written here.", "")]
out11b = {'truong-xuan-cung-hqp-ngu-A': dict(prompt=angled(out11['truong-xuan-cung-hqp-ngu-F3']['prompt'], "canopy bed"), refs=[*G9, '0eUkgjhTfW', ANGREF]),
          'canh-phuc-cung-quyphi-ngu-A': dict(prompt=angled(out11['canh-phuc-cung-quyphi-ngu-F2']['prompt'], "canopy bed"), refs=[*G9, '9ZHmQHVNYZ', ANGREF])}
for k, v in out11b.items():
    for w in ('straight on,', '{', 'rose red'): assert w not in v['prompt'], (k, w)
json.dump(out11b, open(os.path.join(D, 'prompts_v11b.json'), 'w'), ensure_ascii=False, indent=1)
print('v11b', {k: len(v['prompt']) for k, v in out11b.items()})
# ---- v11c: 1 redo of HQP bedroom ANGLED (rgXWBWExtc only a small turn, reads too close to its frontal 0eUkgjhTfW = owner Lượt 635 fault):
#      ONLY the ANG11 sentence is made stronger (A17).
ANG11C = ANG11.replace("turned about forty degrees to the left, so the back wall runs diagonally into the depth",
    "turned strongly, about sixty degrees to the left, so the back wall runs steeply diagonally into the depth").replace(
    "so two of its faces show (its front and its side), like the slanting view of the bed in image 4.",
    "so its long side and its foot end both show clearly and the bed runs diagonally across the picture, exactly like the slanting bed in image 4; "
    "the picture is clearly a different view from image 3.")
assert ANG11C != ANG11
p = out11b['truong-xuan-cung-hqp-ngu-A']['prompt']
out11c = {'truong-xuan-cung-hqp-ngu-A-r1': dict(prompt=p.replace(ANG11.replace('{SUBJ}', 'canopy bed'), ANG11C.replace('{SUBJ}', 'canopy bed')), refs=out11b['truong-xuan-cung-hqp-ngu-A']['refs'])}
assert out11c['truong-xuan-cung-hqp-ngu-A-r1']['prompt'] != p
json.dump(out11c, open(os.path.join(D, 'prompts_v11c.json'), 'w'), ensure_ascii=False, indent=1)
# ---- v11d (ROOT-53 20:41Z, L14 + A9/A21 auto-regen): 4 angled rooms turned too little → ONLY the angle sentence = ANG11C (the strong turn of yiu8HmwPW9);
#      for receptions the bed-only words of ANG11C are generalised; HH reception + one sentence: chair rows whole inside the picture (ROOT-53 edge fix).
ANG11R = ANG11C.replace("so its long side and its foot end both show clearly and the bed runs diagonally", "so its front and its side both show clearly and it runs diagonally")
EDGE = " The chair rows stay whole inside the picture, never cut by the picture edges."
out11d = {}
for k, src, subj, A in [('khon-ninh-cung-ngu-A-r1', out11['khon-ninh-cung-ngu-A'], 'canopy bed', ANG11C),
                        ('canh-phuc-cung-quyphi-ngu-A-r1', out11b['canh-phuc-cung-quyphi-ngu-A'], 'canopy bed', ANG11C),
                        ('truong-xuan-cung-hqp-A-r1', out11['truong-xuan-cung-hqp-A'], 'host daybed on its platform with the arch frame', ANG11R),
                        ('khon-ninh-cung-A-r1', out11['khon-ninh-cung-A'], 'throne platform with its arch frame', ANG11R)]:
    old = ANG11.replace('{SUBJ}', subj); assert old in src['prompt'], k
    new = A.replace('{SUBJ}', subj) + (EDGE if k == 'khon-ninh-cung-A-r1' else '')
    out11d[k] = dict(prompt=src['prompt'].replace(old, new), refs=src['refs'])
json.dump(out11d, open(os.path.join(D, 'prompts_v11d.json'), 'w'), ensure_ascii=False, indent=1)
print('v11d', list(out11d))
# ---- v11e (owner Lượt 658 via ROOT-53: angled bedrooms look like a bed dumped into a hall; keep a LOGICAL bedroom layout = the frontal arrangement
#      seen from another angle). Changes vs v11d bedroom prompts: BIG11 "standing free with open floor around it" (our words) → bed in its place;
#      angle sentence: bed stays against the back wall; + LOGIC11 sentence (her point).
BIG11L = (" BED SIZE (owner Lượt 635): the canopy bed is big and takes real space in the room: about one third of the picture width, its crown near the "
          "top edge, never squeezed between shelves, screens or other furniture.")
LOGIC11 = (" LOGICAL BEDROOM LAYOUT (owner Lượt 658): even from this new angle the room keeps a real bedroom arrangement: the bed stays in its proper "
           "place, its head against the back wall under its canopy, with its footstool and curtains, and the dressing table, the screen, the shelves "
           "and the stools arranged around it exactly as in image 3; the same arrangement as image 3, only seen from another angle; never a bed "
           "standing alone in the middle of a hall.")
ANGB = ANG11C.replace("so its long side and its foot end both show clearly and the bed runs diagonally across the picture, exactly like the slanting bed in image 4;",
                      "so its front and its side both show clearly while it stays against the back wall, like the slanting view of the bed in image 4;")
assert ANGB != ANG11C
out11e = {}
for k, src in [('truong-xuan-cung-hqp-ngu-A-r2', out11c['truong-xuan-cung-hqp-ngu-A-r1']), ('khon-ninh-cung-ngu-A-r2', out11d['khon-ninh-cung-ngu-A-r1']),
               ('canh-phuc-cung-quyphi-ngu-A-r2', out11d['canh-phuc-cung-quyphi-ngu-A-r1'])]:
    p = src['prompt']; old = ANG11C.replace('{SUBJ}', 'canopy bed'); assert old in p, k
    p = p.replace(old, ANGB.replace('{SUBJ}', 'canopy bed') + LOGIC11)
    if BIG11 in p: p = p.replace(BIG11, BIG11L)
    assert 'standing free' not in p
    out11e[k] = dict(prompt=p, refs=src['refs'])
json.dump(out11e, open(os.path.join(D, 'prompts_v11e.json'), 'w'), ensure_ascii=False, indent=1)
print('v11e', list(out11e))
# ---- v11f (owner Lượt 668/671/672 via ROOT-54; worker PR11). A17 diff vs the last prompts of each room:
#  FRONTALS (HQP bedroom F3, Quý phi bedroom F2): FLOOR10 → FLOOR11F_BED (measured floor, owner Lượt 668); HQP F3 also BIG11 → BIG11L ('standing free with
#  open floor around it' adds floor). ANGLED (all 5): ANG11/ANG11C/ANGB camera sentences → GOC11F = the góc xéo composition of the owner's praised bedrooms
#  (Phi v9 4RFIyNR9Aa / Phi v3 SyhTG51Ub8 / Tần EbY494KuuO), image 4 = that model (mirrored 8aiwqQTIrU when the frontal has its windows on the LEFT);
#  floor = FLOOR11F_BED / FLOOR11F_REC; LOGIC11 + BIG11L kept on bedrooms (owner Lượt 658/635). Everything else word for word.
FLOOR11F_BED = (" FLOOR AMOUNT (owner Lượt 668, measured): the open floor in front of the furniture is a strip of about one eighth of the picture "
    "height: the front of the bed step and footstool and the fronts of the side groups stand at about seven eighths of the picture height (never "
    "higher up than four fifths of the picture height, never lower down than nine tenths), like the approved Empress bedroom.")
FLOOR11F_REC = (" FLOOR AMOUNT (owner Lượt 668, measured): the same open floor as image 3: the front of the platform step and the fronts of the chair "
    "rows stand at about four fifths of the picture height, so the open floor in front is a strip of about one fifth of the picture height, never more.")
GOC11F = (" OBLIQUE VIEW (góc xéo, owner Lượt 671/672): this is the SAME room as image 3 (the same furniture, colours, walls, windows and objects), now "
    "painted in the composition of image 4, the owner's model room: the back wall runs across the picture in gentle perspective and the {WIN} side wall "
    "with its tall lattice windows runs towards the viewer on the {WIN}: two walls at a gentle angle, never a steep diagonal. The WHOLE {SUBJ} stands in "
    "the middle of the picture against the back wall, seen slightly from its front corner so its front and one end show, completely inside the picture, "
    "its top inside the picture, never cut by the picture edges; {GROUPS} stand on BOTH sides of it along the walls, like in image 4; a strip of open "
    "floor in front like image 4; a tall room: the pillars and walls rise high and run out of the top edge. Image 4 is a guide ONLY for this composition "
    "and camera angle, NOT for its colours, furniture or decoration.")
GROUPS_BED = "the room's own furniture groups from image 3 (dressing table, screen, shelves, clothes stand, tea table and stools)"
GROUPS_REC = "the chair rows with their tea tables and the room's own side pieces from image 3"
def goc(p, subj, win, groups, floor_s):
    room = p[p.index(' ROOM: ') + 7:p.index(' CAMERA AND SCALE:')]
    floor = p[p.index(' FLOOR: ') + 8:p.index(', no large rug')]
    for a, b in STRAIGHT: room = room.replace(a, b)
    W2 = "TWO walls: the back wall and the " + win + " side wall with its tall windows, meeting at a square corner"
    for a in ("THREE walls: the back wall straight across the middle of the picture and the left and right side walls running towards the viewer in clear perspective, meeting it at square corners",
              "TWO walls only: the back wall straight across the picture and the LEFT side wall running towards the viewer in clear perspective, meeting at a square corner"):
        room = room.replace(a, W2)
    room = room.replace("with the back wall straight across the picture and both side walls running towards the viewer in correct perspective, meeting the back wall at square corners", "with " + W2)
    assert 'THREE walls' not in room and 'both side walls' not in room, room[:400]
    for old in (FLOOR10, FLOOR10B_BED, FLOOR10B_REC, FLOOR11F_BED, FLOOR11F_REC, BIG11):
        room = room.replace(old, BIG11L if old == BIG11 else '')
    assert 'straight on' not in room and 'image 3' not in room.replace('than in image 3', ''), room
    room += GOC11F.replace('{WIN}', win).replace('{SUBJ}', subj).replace('{GROUPS}', groups) + floor_s
    return room9(room, SAME_IMG3, floor)
out11f = {}
h = out11['truong-xuan-cung-hqp-ngu-F3']['prompt']; assert FLOOR10 in h and BIG11 in h
out11f['truong-xuan-cung-hqp-ngu-F3-r1'] = dict(prompt=h.replace(FLOOR10, FLOOR11F_BED).replace(BIG11, BIG11L), refs=out11['truong-xuan-cung-hqp-ngu-F3']['refs'])
q = out11['canh-phuc-cung-quyphi-ngu-F2']['prompt']; assert FLOOR10 in q
out11f['canh-phuc-cung-quyphi-ngu-F2-r1'] = dict(prompt=q.replace(FLOOR10, FLOOR11F_BED), refs=out11['canh-phuc-cung-quyphi-ngu-F2']['refs'])
# angled: HH bedroom (frontal cpS5YIl0eP, windows right → model SyhTG51Ub8), HQP reception (O6EoWbJynm, windows right → 4RFIyNR9Aa),
# HH reception (bxMA4ov5Y2, windows both sides → 4RFIyNR9Aa, right wall)
hhb = goc(out9['khon-ninh-cung-ngu-B3']['prompt'], 'canopy bed with its footstool', 'right', GROUPS_BED, FLOOR11F_BED)
out11f['khon-ninh-cung-ngu-A-r3'] = dict(prompt=hhb.replace(' OBLIQUE VIEW', BIG11L + LOGIC11.replace('exactly as in image 3; the same arrangement as image 3, only seen from another angle;', 'as in image 3;') + ' OBLIQUE VIEW', 1), refs=[*G9, 'cpS5YIl0eP', 'SyhTG51Ub8'])
out11f['truong-xuan-cung-hqp-A-r2'] = dict(prompt=goc(out10['truong-xuan-cung-hqp-3w']['prompt'], 'host daybed on its platform with the arch frame', 'right', GROUPS_REC, FLOOR11F_REC), refs=[*G9, 'O6EoWbJynm', '4RFIyNR9Aa'])
out11f['khon-ninh-cung-A-r2'] = dict(prompt=goc(out10b['khon-ninh-cung-3w']['prompt'], 'throne platform with its arch frame and steps', 'right', GROUPS_REC, FLOOR11F_REC) , refs=[*G9, 'bxMA4ov5Y2', '4RFIyNR9Aa'])
def goc_bed_from(frontal_key, frontal_gen, model):
    p = goc(out11f[frontal_key]['prompt'], 'canopy bed with its footstool', 'left', GROUPS_BED, FLOOR11F_BED)
    p = p.replace(' OBLIQUE VIEW', LOGIC11.replace('exactly as in image 3; the same arrangement as image 3, only seen from another angle;', 'as in image 3;') + ' OBLIQUE VIEW', 1)
    return dict(prompt=p, refs=[*G9, frontal_gen, model])
for k, v in out11f.items():
    p = v['prompt']
    assert p.startswith(C9_STYLE) and C9_END.split('{FLOOR}')[1] in p and v['refs'][:2] == list(G9), k
    for w in ('standing free', 'ANGLED CAMERA', '{', 'seen straight on' if k.endswith(('A-r2', 'A-r3')) else '§§'): assert w not in p, (k, w)
if True:
    json.dump(out11f, open(os.path.join(D, 'prompts_v11f.json'), 'w'), ensure_ascii=False, indent=1)
    print('v11f', {k: len(v['prompt']) for k, v in out11f.items()})
# ---- v11g (A21 auto-redo after measure_floor.py: HQP bedroom F iG5fGfX3uK 16.0 % (> 15.6), HH bedroom A 3zKCnvmREY 15.2 % (Δ 3.5 vs 11.7),
#      Quý phi bedroom F eIPlIUodqL 7.8 % (< 8.7, footstool/stools at the feet line)). ONLY the FLOOR AMOUNT sentence changes (A17).
FLOOR11G_CLOSE = (" FLOOR AMOUNT (owner Lượt 668, measured; the last picture still showed too much floor): the camera stands a little closer, so the "
    "open floor in front of the furniture is only a narrow strip of about one tenth of the picture height: the front of the bed step and footstool "
    "and the fronts of the side groups stand at about nine tenths of the picture height, like the approved Empress bedroom.")
FLOOR11G_BACK = (" FLOOR AMOUNT (owner Lượt 668, measured; the last picture had the footstool and the stools down at the feet line): the footstool, "
    "the stools and the tea table stand back close to the bed and the walls, their fronts at about five sixths of the picture height, so a clear strip "
    "of open floor of about one seventh of the picture height runs in front of all the furniture, nothing standing on it.")
out11g = {}
for k, src, F in [('truong-xuan-cung-hqp-ngu-F3-r2', 'truong-xuan-cung-hqp-ngu-F3-r1', FLOOR11G_CLOSE),
                  ('khon-ninh-cung-ngu-A-r4', 'khon-ninh-cung-ngu-A-r3', FLOOR11G_CLOSE),
                  ('canh-phuc-cung-quyphi-ngu-F2-r2', 'canh-phuc-cung-quyphi-ngu-F2-r1', FLOOR11G_BACK)]:
    p = out11f[src]['prompt']; assert p.count(FLOOR11F_BED) == 1, k
    out11g[k] = dict(prompt=p.replace(FLOOR11F_BED, F), refs=out11f[src]['refs'])
json.dump(out11g, open(os.path.join(D, 'prompts_v11g.json'), 'w'), ensure_ascii=False, indent=1)
print('v11g', list(out11g))
# ---- v11h (wave 2): ANGLED HQP bedroom (frontal = VX7x8c8MMU, F3-r2) and Quý phi bedroom (frontal = eIPlheldqL, F2-r2); windows LEFT → model
#      image 4 = mirrored Phi v9 8aiwqQTIrU. Floor sentence = the one that made its frontal pass (FLOOR11G_CLOSE / FLOOR11G_BACK).
#      HQP: "in the RIGHT half of the room" dropped (owner Lượt 671/672: the whole bed centred against the back wall in the angled version).
out11h = {}
for k, fk, gen, F in [('truong-xuan-cung-hqp-ngu-A-r3', 'truong-xuan-cung-hqp-ngu-F3-r1', 'VX7x8c8MMU', FLOOR11G_CLOSE),
                      ('canh-phuc-cung-quyphi-ngu-A-r3', 'canh-phuc-cung-quyphi-ngu-F2-r1', 'eIPlheldqL', FLOOR11G_BACK)]:
    v = goc_bed_from(fk, gen, '8aiwqQTIrU'); p = v['prompt']
    assert p.count(FLOOR11F_BED) == 1; p = p.replace(FLOOR11F_BED, F)
    p = p.replace("against the back wall in the RIGHT half of the room, square to it,", "against the back wall, square to it,")
    assert 'RIGHT half' not in p and 'THREE walls' not in p and 'seen straight on' not in p, k
    out11h[k] = dict(prompt=p, refs=v['refs'])
json.dump(out11h, open(os.path.join(D, 'prompts_v11h.json'), 'w'), ensure_ascii=False, indent=1)
print('v11h', list(out11h))
# ---- v11i (A21 auto-redo): HQP bedroom A 5jDzShyKxe 7.8 % (stools at the bottom edge; bed still in the right half = owner Lượt 671/672 point
#      'bed centred' not met), Quý phi bedroom A ov6wu0U829 14.7 % (Δ 3.9 vs 10.8). Only the floor sentence (+ HQP: CENTRE11I for the owner's point).
FLOOR11I = (" FLOOR AMOUNT (owner Lượt 668, measured): the camera stands a little closer, and the footstool, the stools and the tea tables stand "
    "back close to the bed and the walls, their fronts at about seven eighths of the picture height, so a clear strip of open floor of about one "
    "eighth of the picture height runs in front of all the furniture, nothing standing on it, nothing near the bottom edge.")
CENTRE11I = (" BED IN THE MIDDLE (owner Lượt 671/672): in this view the canopy bed is NOT in the right half: it stands in the middle of the picture "
    "width, between about one third and two thirds of the width, with the dressing table group on its left and the screen and cabinet on its right.")
out11i = {}
for k, src, F, extra in [('truong-xuan-cung-hqp-ngu-A-r4', 'truong-xuan-cung-hqp-ngu-A-r3', FLOOR11G_CLOSE, CENTRE11I),
                         ('canh-phuc-cung-quyphi-ngu-A-r4', 'canh-phuc-cung-quyphi-ngu-A-r3', FLOOR11G_BACK, '')]:
    p = out11h[src]['prompt']; assert p.count(F) == 1, k
    out11i[k] = dict(prompt=p.replace(F, extra + FLOOR11I), refs=out11h[src]['refs'])
json.dump(out11i, open(os.path.join(D, 'prompts_v11i.json'), 'w'), ensure_ascii=False, indent=1)
print('v11i', list(out11i))
# ---- v11j (A21): HQP bedroom A xSB0PcujfW passes the measure (13.9 %) but FAILS the eye check: same view as its frontal, bed in the right half
#      (owner Lượt 671/672 not met) → image ORDER swapped: image 3 = the góc xéo model 8aiwqQTIrU (composition), image 4 = the frontal VX7x8c8MMU
#      (room); text roles swapped accordingly, words unchanged. Quý phi bedroom A xSB0PTFjfW 14.7 % (Δ 3.9) → FLOOR11G_CLOSE (camera closer).
def swap34(p):
    i = p.index(' ROOM: ')
    q = p[i:]
    for a, b in (('mage 3', 'mage §'), ('mage 4', 'mage 3'), ('mage §', 'mage 4')): q = q.replace(a, b)
    return p[:i] + q
out11j = {}
p = out11i['truong-xuan-cung-hqp-ngu-A-r4']['prompt']
out11j['truong-xuan-cung-hqp-ngu-A-r5'] = dict(prompt=swap34(p), refs=[*G9, '8aiwqQTIrU', 'VX7x8c8MMU'])
assert 'the composition of image 3' in out11j['truong-xuan-cung-hqp-ngu-A-r5']['prompt'] and 'Image 3 is a guide ONLY' in out11j['truong-xuan-cung-hqp-ngu-A-r5']['prompt']
p = out11i['canh-phuc-cung-quyphi-ngu-A-r4']['prompt']; assert p.count(FLOOR11I) == 1
out11j['canh-phuc-cung-quyphi-ngu-A-r5'] = dict(prompt=p.replace(FLOOR11I, FLOOR11G_CLOSE), refs=out11i['canh-phuc-cung-quyphi-ngu-A-r4']['refs'])
json.dump(out11j, open(os.path.join(D, 'prompts_v11j.json'), 'w'), ensure_ascii=False, indent=1)
print('v11j', list(out11j))
# ---- v12 (owner Lượt 692 via ROOT-55; worker PR12). (1) GÓC XÉO = the owner-praised model prompt VERBATIM: Phi bedroom v3 SyhTG51Ub8
#      (creations_get metadata.prompt, seed 97820, refs ONLY gOmYI7iSXO + EbYJzsMuuO, NO image 3/4); only the room-specific parts are swapped
#      (palace name, wood, garden, partition, main piece, furniture list, signature style, level, rank colours, phoenix line; receptions: the
#      bed words of the two generic layout sentences → their seat). (2) BED12 = the bed as big as the HQP reception middle section between its
#      two pillars (O6EoWbJynm, measured PR12: pillar centres 27.7 % and 71.9 % W → 44 % W apart, inner opening 29.2–70.2 % = 41 % W; pillars
#      run from the top edge down to their bases at ~77 % H). Frontals: HQP bedroom BIG11L → BED12; Quý phi bedroom + BED12; HH bedroom
#      frontal kept (bed already ~39 % W, between two pillars).
SYH = "A brand-new painting of a natural, lived-in, richly furnished room, painted exactly like image 1 (the bedroom): same hand, same brushwork, same soft painterly finish, same natural warm colours, saturation and contrast, same depth with furniture, carved lattice windows and objects arranged through the whole room from the foreground to the back. Wide panoramic, eye-level view, summer morning. ROOM: Cảnh Phúc cung chính điện bedroom, the private bedchamber of the imperial consort who heads this palace in ancient China, a real room in daily use: dark rosewood pillars and beams, carved lattice windows at the back opening onto a sunny courtyard garden with a tree and a lotus pond, a carved wooden partition with a round moon-gate opening; at the centre of the room, the large clear main subject, one larger canopy bed of carved rosewood with soft purple gauze curtains tied back with tassels and purple silk brocade bedding embroidered with crabapple blossoms, more carving and jade-green inlay on the bed frame; around it a carved dressing table with a large bronze mirror, a lacquered jewellery cabinet and jade ornaments, a carved screen painted with crabapple blossoms, round stools with purple cushions, hanging palace lanterns with purple tassels, a clothes stand with a purple silk robe, porcelain vases of crabapple branches, a tea table with a fine tea set, a shelf with jade and porcelain treasures, a small incense burner, slippers on the floor. Cảnh Phúc cung signature style, the same in every room of this palace: crabapple blossoms (hải đường) are its flower, painted on the screens, embroidered on the silks and in the vases; motifs of bats among auspicious clouds carved in the beams and furniture; dark rosewood with jade-green inlay and jade ornaments; round-backed rosewood furniture; a round moon-gate opening in a carved partition. PHI level, clearly richer than a Tần: deeper carving, rich jade-green inlay, gilt edging on the furniture, silk brocade, many jade and porcelain treasures. The soft purple accent colour is woven through the bedding, curtains and cushions. No phoenix anywhere (no phoenix carving, embroidery, figure or pendant), no imperial yellow, no golden-yellow fabrics. The bottom-right corner nearest the viewer stays almost clear, holding at most one small object; tea tables and stools stand further back in the room. The dressing table and its stools stand far back against the back wall; the bed stands in the middle of the width, its curtains well away from the left edge; the floor near the viewer is open polished floor. FLOOR: warm polished wooden floorboards visible between the furniture, no large rug or carpet covering the floor (at most a small mat under the bed step); the canopy bed sits in the central half of the width. LIGHT: soft warm morning daylight from the right, like the light on the girl in image 2, so a person standing in the room looks lit by it. Do not leave the room empty like a stage; it should feel natural and furnished, people will simply be placed in it later. LEFT SIDE (owner Lượt 406): the left part of the room near the viewer stays open like in image 1 — only small, low objects there at most, never a large piece of furniture or a big object close up at the left edge, because people will stand on the left. Empty of people, no text."
SYH_SEED = 97820
BED12 = (" BED SIZE (owner Lượt 692, measured on the approved Trường Xuân reception hall): the canopy bed is as big as the middle section of that hall "
    "between its two pillars: the bed with its canopy posts and curtains fills about two fifths of the picture width (about 41 to 44 % of the width, "
    "the space between two pillars), and from its canopy crown near the top edge down to its step it is about three quarters of the picture height "
    "tall; never smaller, never squeezed.")
def seg(p, a, b):
    i = p.index(a); j = p.index(b, i); return p[i:j]
def SUB(src, pairs):
    p = src
    for a, b in pairs:
        assert p.count(a) == 1, (a[:60], p.count(a)); p = p.replace(a, b)
    return p
S_ID = "Cảnh Phúc cung chính điện bedroom, the private bedchamber of the imperial consort who heads this palace in ancient China, a real room in daily use:"
S_WOOD = "dark rosewood pillars and beams, carved lattice windows at the back opening onto a sunny courtyard garden with a tree and a lotus pond, a carved wooden partition with a round moon-gate opening;"
S_BED = "one larger canopy bed of carved rosewood with soft purple gauze curtains tied back with tassels and purple silk brocade bedding embroidered with crabapple blossoms, more carving and jade-green inlay on the bed frame;"
S_LIST = seg(SYH, "around it a carved dressing table", " Cảnh Phúc cung signature")
S_SIG = seg(SYH, " Cảnh Phúc cung signature", " PHI level")
S_LVL = seg(SYH, " PHI level", " The soft purple")
S_ACC = " The soft purple accent colour is woven through the bedding, curtains and cushions."
S_PHX = " No phoenix anywhere (no phoenix carving, embroidery, figure or pendant), no imperial yellow, no golden-yellow fabrics."
S_DT = "The dressing table and its stools stand far back against the back wall; the bed stands in the middle of the width, its curtains well away from the left edge;"
S_FL = "(at most a small mat under the bed step); the canopy bed sits in the central half of the width."
S_END = " FLOOR: warm polished wooden floorboards visible"
HQPB = json.load(open(os.path.join(D, 'prompts_v11g.json')))['truong-xuan-cung-hqp-ngu-F3-r2']['prompt']
HQPR = out10['truong-xuan-cung-hqp-3w']['prompt']
HHB = out9['khon-ninh-cung-ngu-B3']['prompt']
HHR = out10b['khon-ninh-cung-3w']['prompt']
QPB = json.load(open(os.path.join(D, 'prompts_v11g.json')))['canh-phuc-cung-quyphi-ngu-F2-r2']['prompt']
TX_SIG = ' ' + seg(HQPB, "Trường Xuân cung signature", " HOÀNG QUÝ PHI level")
TX_COL = ' ' + seg(HQPB, "RANK COLOURS (Hoàng quý phi", " ROOM SHAPE")
TX_PHX = " Phoenixes allowed: a pair of phoenixes carved or embroidered among magnolias on the bed, the screen and the cushions."
TX_WOOD = "dark zitan pillars and beams with gold lacquer, carved lattice windows at the back opening onto a sunny courtyard garden with a magnolia tree, a tall carved openwork partition with a vase-shaped doorway giving a glimpse of a small study with books;"
assert TX_PHX in HQPB and TX_PHX in HQPR
out12 = {}
# HQP bedroom góc xéo
p = SUB(SYH, [(S_ID, "Trường Xuân cung chính điện bedroom, the private bedchamber of the Imperial Noble Consort (Hoàng quý phi), the highest consort below the Empress, in ancient China, a real room in daily use:"),
    (S_WOOD, TX_WOOD),
    (S_BED, seg(HQPB, "a grand canopy bed of carved zitan", "; in the middle of the back wall") + ';'),
    (S_LIST, "around it " + seg(HQPB, "a gold-lacquer dressing table", " Trường Xuân cung signature").replace("chair; a zitan curio", "chair; a tall folding screen with kingfisher-blue feather inlay and magnolias, a zitan curio")),
    (S_SIG, TX_SIG), (S_LVL, ' ' + seg(HQPB, "HOÀNG QUÝ PHI level", " Phoenixes allowed")), (S_ACC, TX_COL), (S_PHX, TX_PHX),
    ("The dressing table and its stools stand", "The dressing table and its chair stand"), (S_END, BED12 + S_END)])
out12['truong-xuan-cung-hqp-ngu-G12'] = dict(prompt=p, refs=list(G9), seed=SYH_SEED)
# Quý phi bedroom góc xéo (same palace: ID, wood, garden, signature unchanged)
p = SUB(SYH, [("a carved wooden partition with a round moon-gate opening;", "carved rosewood partitions with a round moon-gate opening on each side of the bed;"),
    (S_BED, seg(QPB, "one grand canopy bed of deeply carved rosewood", "; around the room") + ';'),
    (S_LIST, "around it " + seg(QPB, "a large carved dressing table", " Cảnh Phúc cung signature")),
    (S_LVL, ' ' + seg(QPB, "QUÝ PHI level", " RANK COLOUR (Quý phi")), (S_ACC, ' ' + seg(QPB, "RANK COLOUR (Quý phi", " No phoenix anywhere")),
    (S_PHX, ' ' + seg(QPB, "No phoenix anywhere", " ROOM SHAPE")), (S_END, BED12 + S_END)])
out12['canh-phuc-cung-quyphi-ngu-G12'] = dict(prompt=p, refs=list(G9), seed=SYH_SEED)
# HH bedroom góc xéo
p = SUB(SYH, [(S_ID, "Khôn Ninh cung bedroom, the private bedchamber of the Empress in an ancient Chinese imperial palace, a real room in daily use:"),
    (S_WOOD, "red lacquer pillars with gilded phoenix carving, golden lattice windows at the back opening onto a sunny summer garden;"),
    (S_BED, seg(HHB, "one magnificent canopy bed of gilded carved wood", "; along the walls") + ';'),
    (S_LIST, "around it " + seg(HHB, "a grand dressing table with a tall gilt mirror", " The most splendid")),
    (S_SIG, ' ' + seg(HHB, "The most splendid bedroom", " RANK COLOURS")), (S_LVL, ''), (S_ACC, ' ' + seg(HHB, "RANK COLOURS (Hoàng hậu", " ROOM SHAPE")), (S_PHX, ''),
    (S_END, BED12 + S_END)])
out12['khon-ninh-cung-ngu-G12'] = dict(prompt=p, refs=list(G9), seed=SYH_SEED)
# HQP reception góc xéo
p = SUB(SYH, [(S_ID, "Trường Xuân cung chính điện reception room, the hall where the Imperial Noble Consort (Hoàng quý phi), the highest consort below the Empress, in ancient China receives her guests, a real room in daily use, no bed anywhere:"),
    (S_WOOD, TX_WOOD.replace(" giving a glimpse of a small study with books", "")),
    (S_BED, "the host seat on a low one-step platform under a tall carved openwork arch frame (a luozhao): " + seg(HQPR, "a wide square-backed zitan luohan daybed", "; on each side of the platform") + ';'),
    (S_LIST, "around it a tall cloisonné flower stand with magnolias on each side of the platform, ONE straight row of square-backed zitan armchairs with soft honey-orange cushions and small tea tables between them along the side wall, a horizontal gilt plaque carved with magnolias (no writing, no characters) high on the back wall, " + seg(HQPR, "soft honey-orange sheer curtains", " Trường Xuân cung signature")),
    (S_SIG, TX_SIG), (S_LVL, ' ' + seg(HQPR, "HOÀNG QUÝ PHI level", " Phoenixes allowed")), (S_ACC, TX_COL), (S_PHX, TX_PHX + " No Western sofa, no upholstered couch."),
    (S_DT, "The chair row and its tea tables stand far back along the side wall; the daybed platform stands in the middle of the width, its arch frame well away from the left edge;"),
    (S_FL, "(at most a small mat under the platform step); the daybed platform sits in the central half of the width.")])
out12['truong-xuan-cung-hqp-G12'] = dict(prompt=p, refs=list(G9), seed=SYH_SEED)
# HH reception góc xéo
p = SUB(SYH, [(S_ID, "Khôn Ninh cung main reception hall, where the Empress of an ancient Chinese imperial palace receives the consorts, a real room in daily use, no bed anywhere:"),
    (S_WOOD, "red lacquer columns wrapped with gilded phoenix carving, golden lattice windows at the back opening onto a sunny summer garden;"),
    (S_BED, "the Empress's throne on a wide platform of three steps with a gilded balustrade, under a tall carved gilded openwork arch frame (a luozhao) carved with phoenixes among peonies: " + seg(HHR, "a wide gilded carved throne seat", "; on each side of the throne") + ';'),
    (S_LIST, "around it a tall ceremonial fan of royal yellow silk with a phoenix on a long gilded pole and a golden phoenix figure on a tall stand on each side of the throne, a gold crane-shaped incense burner on each side at the foot of the platform, straight rows of carved gilded square-backed armchairs with brick-crimson cushions and small tea tables between them along the side walls, a large horizontal gilt plaque carved with phoenixes and clouds (no writing, no characters) on the back wall, royal yellow silk curtains tied back with brick-crimson tassels, ornate gilded palace lanterns with yellow tassels hanging in pairs, cloisonné vases of peonies, gilded curio shelves of jade and gold treasures."),
    (S_SIG, ' ' + seg(HHR, "The most splendid room", " RANK COLOURS")), (S_LVL, ''), (S_ACC, ' ' + seg(HHR, "RANK COLOURS (Hoàng hậu", " No Western sofa") + " No Western sofa, no upholstered couch."), (S_PHX, ''),
    (S_DT, "The chair rows and their tea tables stand far back along the side walls; the throne platform stands in the middle of the width, its arch frame well away from the left edge;"),
    (S_FL, "(at most a small mat under the platform step); the throne platform sits in the central half of the width.")])
out12['khon-ninh-cung-G12'] = dict(prompt=p, refs=list(G9), seed=SYH_SEED)
# frontals (A17: only the bed size sentence)
assert HQPB.count(BIG11L) == 1
out12['truong-xuan-cung-hqp-ngu-F12'] = dict(prompt=HQPB.replace(BIG11L, BED12), refs=['gOmYI7iSXO', 'EbYJzsMuuO', 'Xm9gqieBfo'])
assert QPB.count(' CAMERA AND SCALE:') == 1
out12['canh-phuc-cung-quyphi-ngu-F12'] = dict(prompt=QPB.replace(' CAMERA AND SCALE:', BED12 + ' CAMERA AND SCALE:'), refs=['gOmYI7iSXO', 'EbYJzsMuuO', 'gOmViD0SXO'])
for k, v in out12.items():
    for w in ('Cảnh Phúc', 'purple', 'crabapple') if not k.startswith('canh-phuc') else ('purple',):
        assert w not in v['prompt'], (k, w)
    assert '  ' not in v['prompt'] and ';;' not in v['prompt'] and '..' not in v['prompt'], k
json.dump(out12, open(os.path.join(D, 'prompts_v12.json'), 'w'), ensure_ascii=False, indent=1)
print('v12', {k: len(v['prompt']) for k, v in out12.items()})
# ---- v12b (A21 redo after the eye check + bed measure, PR12):
#  góc xéo HH reception 1ldWWJfr4r = nearly straight-on; HH bedroom SyheePgUb8 + HQP reception w4aXXie7EI = a large table at the bottom-left
#  corner under person 1 (against the model's LEFT SIDE sentence) → SAME prompt, other seed = the Tần model's seed 60161 (prompt unchanged).
#  frontals HQP ov6wwWf829 (bed frame 34 % W) + Quý phi Xm9SSYMBfo (31 % W) = the bed did not grow (image 3 anchors it) → BED12 + the bed
#  position numbers (owner Lượt 692 'giường quá nhỏ' — only the bed size part changes).
TAN_SEED = 60161
BED12F_HQP = BED12 + (" The bed is clearly bigger and wider than the bed in image 3: its front canopy posts stand at about 47 % and 90 % of the picture width.")
BED12F_QP = BED12 + (" The bed is clearly bigger and wider than the bed in image 3: its front canopy posts stand at about 29 % and 71 % of the picture width.")
out12b = {}
for k in ('khon-ninh-cung-G12', 'khon-ninh-cung-ngu-G12', 'truong-xuan-cung-hqp-G12'):
    out12b[k + '-r1'] = dict(prompt=out12[k]['prompt'], refs=out12[k]['refs'], seed=TAN_SEED)
for k, B in (('truong-xuan-cung-hqp-ngu-F12', BED12F_HQP), ('canh-phuc-cung-quyphi-ngu-F12', BED12F_QP)):
    p = out12[k]['prompt']; assert p.count(BED12) == 1
    out12b[k + '-r1'] = dict(prompt=p.replace(BED12, B), refs=out12[k]['refs'])
json.dump(out12b, open(os.path.join(D, 'prompts_v12b.json'), 'w'), ensure_ascii=False, indent=1)
print('v12b', list(out12b))
# ---- v12c (A21, PR12): frontal beds still small in FRAME width (HQP UPvdosowny 36 % W, Quý phi iG5fuN83uK 31 % W; the 41–44 % was filled
#      by the curtains because BED12 counted them) → only the bed-size words: 'the bed with its canopy posts and curtains fills' → the frame itself.
OLD12 = "the bed with its canopy posts and curtains fills about two fifths of the picture width"
NEW12 = "the bed frame itself (its carved base and its canopy posts, not counting the curtains) fills about two fifths of the picture width"
out12c = {}
for k in ('truong-xuan-cung-hqp-ngu-F12-r1', 'canh-phuc-cung-quyphi-ngu-F12-r1'):
    p = out12b[k]['prompt']; assert p.count(OLD12) == 1
    out12c[k[:-3] + '-r2'] = dict(prompt=p.replace(OLD12, NEW12), refs=out12b[k]['refs'])
json.dump(out12c, open(os.path.join(D, 'prompts_v12c.json'), 'w'), ensure_ascii=False, indent=1)
print('v12c', list(out12c))
# ---- v12d (ROOT-55 relay 21:43Z, A21): Quý phi frontal: drop image 3 gOmViD0SXO (it held the bed at 31 % W in 3 tries). Only the image-3 words go:
#      the 'Image 3 is this same room…' sentence, 'than the bed in image 3', and the camera clause 'the same … as image 3 (this same room as drawn before)'.
p = out12c['canh-phuc-cung-quyphi-ngu-F12-r2']['prompt']
for a, b in ((" Image 3 is this same room as drawn before (there with three walls and rose red silks): keep its furniture and its arrangement around the centred bed with the two moon gates, but now with two walls and the rank colour written here.", ""),
             (" The bed is clearly bigger and wider than the bed in image 3: its front", " Its front"),
             ("eye level of a standing woman, the same camera distance, eye level and natural people scale as image 3 (this same room as drawn before);", "eye level of a standing woman, natural people scale;")):
    assert p.count(a) == 1, a[:50]; p = p.replace(a, b)
assert 'image 3' not in p
out12d = {'canh-phuc-cung-quyphi-ngu-F12-r3': dict(prompt=p, refs=['gOmYI7iSXO', 'EbYJzsMuuO'])}
json.dump(out12d, open(os.path.join(D, 'prompts_v12d.json'), 'w'), ensure_ascii=False, indent=1)
print('v12d', len(p))
# ---- v12e (owner Lượt 707 via ROOT-56, A20): góc xéo redo, same Phi v3 verbatim method, same refs + seed; ONLY her points:
#  HQP bedroom / HQP reception / HH reception: the right corner looks empty → the model's 'bottom-right corner … almost clear' sentence → RIGHT12E.
#  Quý phi bedroom: layout ≠ frontal, bed hidden/cut → windows in the LEFT side wall like the frontal + QP12E (layout of the frontal, bed fully visible).
S_BR = "The bottom-right corner nearest the viewer stays almost clear, holding at most one small object; tea tables and stools stand further back in the room."
RIGHT12E = ("RIGHT CORNER (owner Lượt 707): the right part of the room is furnished, never empty: along the right side, set back from the bottom edge, "
    "a group of furniture fills the right corner (a tall cabinet or curio shelf with treasures, a tea table with two chairs or stools, a tall vase stand with flowers), "
    "its front at about four fifths of the picture height, so a person standing in front of it covers it naturally.")
QP12E = (" LAYOUT LIKE THE STRAIGHT VIEW OF THIS ROOM (owner Lượt 707): the canopy bed stands centred against the back wall on a low carved platform, "
    "with a round moon-gate partition on EACH side of it in the back wall; tall curio shelves at the right end of the back wall; the dressing table "
    "under the left windows. The WHOLE bed is clearly visible: its curtains tied back so the bed, its bedding and its foot are seen, never hidden "
    "behind curtains or furniture, never cut by the picture edges.")
out12e = {}
for k in ('truong-xuan-cung-hqp-ngu-G12', 'truong-xuan-cung-hqp-G12', 'khon-ninh-cung-G12'):
    p = out12[k]['prompt']; assert p.count(S_BR) == 1, k
    out12e[k + '-r2'] = dict(prompt=p.replace(S_BR, RIGHT12E), refs=out12[k]['refs'], seed=(TAN_SEED if k == 'khon-ninh-cung-G12' else SYH_SEED))
p = out12['canh-phuc-cung-quyphi-ngu-G12']['prompt']
p = SUB(p, [("carved lattice windows at the back opening onto", "tall carved lattice windows in the LEFT side wall opening onto"),
            (" FLOOR: warm polished wooden floorboards visible", QP12E + " FLOOR: warm polished wooden floorboards visible")])
out12e['canh-phuc-cung-quyphi-ngu-G12-r1'] = dict(prompt=p, refs=out12['canh-phuc-cung-quyphi-ngu-G12']['refs'], seed=SYH_SEED)
json.dump(out12e, open(os.path.join(D, 'prompts_v12e.json'), 'w'), ensure_ascii=False, indent=1)
print('v12e', {k: (v['seed'], len(v['prompt'])) for k, v in out12e.items()})

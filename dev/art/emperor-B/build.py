#!/usr/bin/env python3
"""EMPEROR PROMPT B -- FROZEN by W81 (owner 18/11 ~22:25Z via Foreman C: ONE frozen emperor builder, same structure as dev/art/t8-prompt-B/build.py).
Usage: python3 build.py live1|live2|e1|e2|e3|e4 [--age a18|a26|a36|a51|a65]  -> prints the exact prompt.
ONLY the FACE line, the OUTFIT slot and the ITEM/hand slot differ between the six emperors; PRE, identity/style lines, AGE_TXT, COLOUR rule, FAB, pose sentence and END are byte-identical.
"""
import sys,os
# PRE / END / FAB / YEL_NEW copied byte-for-byte from the consort builder (dev/art/t8-prompt-B/build.py)
PRE=("Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering of the reference portraits; full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porcelain skin; gentle expression with soft eyes and a bright closed-lip smile, lips closed, no teeth, mouth never open; elegant, slim, clearly adult; beautiful/handsome romantic-lead looks for everyone; face clearly visible, body and face frontal, standing squarely facing the viewer, no turn.")
END=" Eyes soft, warm and round-almond, never slanted or upturned, never teary. Everyone beautiful at every age. No text, no labels."
# D9 (owner Lượt 529, ART_RULES D9): owner words verbatim, same constant as t8-prompt-B/build.py D9_FOREHEAD, right before END; the existing "bare clean forehead" words stay.
D9_FOREHEAD=" NOTHING on the forehead (no hoa điền, no dot, no mark, nothing)."
FAB="The silk has real weight: the wide sleeves and robe hang and fold naturally under their own weight, with natural creases, never stiff, flat or board-like."
# OWNER 18/11 ~23:00Z: v7 still too rực, not like live-1/2 -> target the live-1/2 v7 yellow (#EEB464); wide sleeves; lishui wave hem. (earlier ~22:35Z: v5 read too rực (saturated) in game -> LIGHTER, softer: target the approved e1 yellow (median ~#F6BC5E). Consort builder keeps its own #EFBD69 words; the emperor builder is the only one with this lighter wording.
YEL_NEW="soft light honey-gold, luminous and gentle, close to hex #EEB464 (light-medium depth, 18K gold tone), not saturated, not orange, not pale cream, not beige/tan/ochre, not heavy mustard, not lemon"
# J6 (owner Lượt 529 via ROOT-50, ART_RULES J6 "ALL FIVE ages, everyone, MEN AND WOMEN"): men's AGE_TXT = the women's / Nữ đế AGE_TXT (dev/art/t8-prompt-B/build.py AGE_TXT) of ALL FIVE ages
# copied VERBATIM, changing ONLY gender words (her->his, Her->His, she->he, lady/woman->man); a65 ADDED. build_npc.py asserts this copy (gender swap of build.py AGE_TXT) byte for byte.
# D15 (owner Lượt 692+694, ROOT-56 pt 3): a51/a65 carry the ma ma STYLE LOCK sentence, gender-swapped (his) like the rest of this copy.
# Old men's wording (own a51 'a few silver strands', no a65) replaced. NOTE: a51 keeps the women's colour example words 'an empress dowager or senior palace matron' (not a gender word of HIM; flagged to ROOT-50).
AGE_TXT={"a18":'about 22, youthful adult.',
"a26":'about 30, mature and poised.',
"a36":'about 36 but looking young for his age (trẻ trước tuổi): still youthful and very beautiful, only a touch more mature and poised than his young self, smooth skin, no visible lines, never an older face.',
"a51":'about 51, a graceful beautiful older man who ages beautifully (đẹp lão): a slightly fuller mature face, soft fine lines at the eyes and gentle smile lines, dignified and elegant, still lovely and refined; clearly VISIBLE silver-grey streaks at the temples and in the front of his warm dark-brown hair (a visible silver patch that is easy to see at game size, hair still mostly dark, never white hair); never a 20-30-year-old face, never haggard or plain. STYLE LOCK (same drawing as his 36-year-old picture, the second reference): exactly the same soft painterly guofeng illustration rendering, the same smooth luminous painted skin, soft stylised features and gentle painted shading as the 36-year-old picture; his age shows ONLY through the silver in his hair and a few soft painted lines, NEVER photographic, NEVER photo-realistic, no realistic skin texture, no pores, no detailed wrinkles. His robe keeps the same colour families as described below, but every colour is a DEEPER, DARKER, rich mature shade, the dark dignified tones an empress dowager or senior palace matron wears (e.g. pink becomes deep rose-plum, blue becomes deep navy blue, green becomes deep dark jade, purple becomes deep aubergine, red becomes deep burgundy; the royal yellow becomes a deep antique gold); dignified and rich, never bright.',
"a65":'about 65, a truly elderly man who ages beautifully (đẹp lão): clearly older than his 51-year-old self, with gentle visible wrinkles at the eyes, mouth and forehead, softer cheeks and jawline, a calm wise dignified look; his hair is largely silver-grey mixed with some dark strands (much more silver than at 51, but NOT pure white); still graceful, elegant and beautiful, never haggard. STYLE LOCK (same drawing as his 36-year-old picture, the second reference): exactly the same soft painterly guofeng illustration rendering, the same smooth luminous painted skin, soft stylised features and gentle painted shading as the 36-year-old picture; his age shows ONLY through the silver in his hair and a few soft painted lines, NEVER photographic, NEVER photo-realistic, no realistic skin texture, no pores, no detailed wrinkles. His robe keeps exactly the same colours as described below, but every colour is a DEEPER, DARKER, more subdued shade suited to an elderly man (dignified, not bright; the royal yellow becomes a deeper antique gold).'}
# ---- per-emperor slots (the ONLY thing that differs) ----
FACE={
"live1":"a handsome oval face, soft round-almond eyes, gently arched brows, a thin neat moustache",
"live2":"a handsome oval face, soft round-almond eyes, gently arched brows, a thin neat moustache",
"e1":"oval face, soft round-almond eyes, gentle straight brows, clean-shaven",
"e2":"slightly longer face, defined jaw, slightly fuller brows, a light moustache",
"e3":"softly rounded jaw, high cheekbones, thin elegant brows, clean-shaven, a kind gentle look",
"e4":"strong straight nose, squarer jaw, thick straight brows, a short neat beard along the jaw"}
ROBE_LIVE="a round-collar imperial dragon robe of golden yellow silk with a large front dragon medallion on the chest, smaller dragons and clouds on the shoulders and skirt, a wide gold-and-jade belt with long tassels and jade pendants hanging at the front, floor-length robe with shoes visible; a small gold imperial crown with a short pin"
ROBE_E="the Emperor's imperial crossed-collar dragon robe of golden yellow silk, richly embroidered with five-claw dragons and clouds in gold thread, a stiff short slightly pointed shoulder piece, a jade-and-gold belt with a long tassel, floor-length robe with shoes visible; {crown} (NO Qing feathered hat)"
OUTFIT={
"live1":ROBE_LIVE,"live2":ROBE_LIVE,
"e1":ROBE_E.format(crown="a Ming-style gold guan crown with a jade pin"),
"e2":ROBE_E.format(crown="a tall Ming-style black-and-gold guan crown")+", a thin black collar edge and a black-and-gold belt as the only dark trim",
"e3":ROBE_E.format(crown="a flat Ming-style miện crown with short bead strings reaching only the brow, never covering the face")+", narrow crimson trim along the collar and sleeve edges",
"e4":ROBE_E.format(crown="a Ming-style gold dragon-head guan crown")+", narrow dark-jade trim along the collar and sleeve edges"}
ITEM={
"live1":("a gold-mounted imperial scroll","the rolled scroll in one hand lowered at his side, the other hand resting lightly at his belt, body and face frontal, standing squarely facing the viewer, no turn"),
"live2":("an imperial folding fan with carved ribs","the closed fan held in both hands lowered before him at waist height, body and face frontal, standing squarely facing the viewer, no turn, head up toward the viewer"),
"e1":("a jade ruyi scepter","the ruyi upright in one hand at chest height below the chin, the other hand resting at his belt, body and face frontal, standing squarely facing the viewer, no turn"),
"e2":("a gold-mounted imperial scroll","the rolled scroll in one hand lowered at his side, the other hand resting lightly at his belt, body and face frontal, standing squarely facing the viewer, no turn"),
"e3":("an imperial closed folding fan","the closed fan held in both hands lowered before him at waist height, body and face frontal, standing squarely facing the viewer, no turn, head up toward the viewer"),
"e4":("a jade ceremonial tablet","the tablet held in both hands at waist height before him, body and face frontal, standing squarely facing the viewer, no turn")}
# OWNER 18/11 ~22:35Z (via Foreman C): no train; shoulder pieces STIFF; slim-but-imperial silhouette like the approved e1
SHAPE="SILHOUETTE: a man's robe that falls straight to the ankles, no train, nothing trailing behind; if shoulder pieces are worn they are STIFF, structured, firm armour-like shoulder caps that hold their shape, never soft, never drooping or draped over the shoulders; an imperial silhouette: the robe fitted at the waist, the sleeves WIDE and full, hanging in long clear folds (an emperor's sleeves are never narrow), neither bulky and puffed nor thin and starved. HEM: the lower skirt ends in a lively deep sea-wave-and-cliff (lishui) border embroidered with white-capped waves and cliffs in blue-green, white and gold, so the robe is not plain yellow from top to bottom."
def colour():
    return (f"all colours fresh, clear and luminous, never dusty or greyed; the royal golden yellow is the DOMINANT colour of the whole robe, sleeves and skirt (far more than half of everything visible), any other colour only as narrow trim; the yellow is {YEL_NEW}; the crown, pin and jewellery gold in the same 18K tone; gold only as thin accents on the borders.")
REF2=""  # set by --ref2: image reference 2 = the live-1 v7 picture
REF2_TXT="Image reference 2 is ONLY a look reference for the colour of the yellow, the blue-green sea-wave hem and the lively accent colours: never copy its face, pose or robe design."
def build(k,age="a26"):
    s=PRE+f" An imperial emperor (Hoàng thượng). His face: {FACE[k]}. From the identity reference keep ONLY his face, facial features and hairstyle colour; do NOT copy the outfit, crown or accessories of the reference, dress him in the NEW outfit below. The style reference image is only for skin, drawing style, fabric and embroidery: never copy its face, body or pose. {AGE_TXT[age]}"
    s+=f" Outfit (the Emperor, clearly the most splendid man in the palace): {OUTFIT[k]}."
    s+=" "+SHAPE
    s+=" COLOUR RULE: "+colour()
    s+=" All dragons, clouds and waves are fine silk-thread embroidery stitched directly into the fabric, flat and integrated with the cloth, following its folds, not appliqué, not pasted patches, not raised. "+FAB
    item,hand=ITEM[k]
    s+=f" Pose: calm standing pose; he holds {item} in a contrasting colour, not the robe colour, the item held below the chin or before the waist, the hand really gripping it, the whole face fully visible. His hands interact naturally with the item (gently presenting, turning or touching it), lively and natural, while his head stays up facing the viewer, eyes open, lips closed, never looking down. His hands and body: {hand}."
    if REF2: s+=" "+REF2
    s+=" Luminous smooth porcelain skin, bare clean forehead, eyes open, floor-length robe with shoes visible, no train, no cup, nothing covering the face."
    sys.path.insert(0,os.path.dirname(os.path.dirname(os.path.abspath(__file__)))); import master_common
    return master_common.apply(s+D9_FOREHEAD+END)   # B25 ONE MASTER COMMON BLOCK (owner Lượt 745/766, MG1), last step
if __name__=="__main__":
    age="a26"
    if "--age" in sys.argv: age=sys.argv[sys.argv.index("--age")+1]
    if "--ref2" in sys.argv: REF2=REF2_TXT
    print(build([a for a in sys.argv[1:] if a in FACE][0],age),end="")

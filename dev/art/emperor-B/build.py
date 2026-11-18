#!/usr/bin/env python3
"""EMPEROR PROMPT B -- FROZEN by W81 (owner 18/11 ~22:25Z via Foreman C: ONE frozen emperor builder, same structure as dev/art/t8-prompt-B/build.py).
Usage: python3 build.py live1|live2|e1|e2|e3|e4 [--age a18|a26|a36|a51]  -> prints the exact prompt.
ONLY the FACE line, the OUTFIT slot and the ITEM/hand slot differ between the six emperors; PRE, identity/style lines, AGE_TXT, COLOUR rule, FAB, pose sentence and END are byte-identical.
"""
import sys
# PRE / END / FAB / YEL_NEW copied byte-for-byte from the consort builder (dev/art/t8-prompt-B/build.py)
PRE=("Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering of the reference portraits; full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porcelain skin; gentle expression with soft eyes and a bright closed-lip smile, lips closed, no teeth, mouth never open; elegant, slim, clearly adult; beautiful/handsome romantic-lead looks for everyone; face clearly visible, 3/4 or frontal view.")
END=" Eyes soft, warm and round-almond, never slanted or upturned, never teary. Everyone beautiful at every age. No text, no labels."
FAB="The silk has real weight: the wide sleeves and robe hang and fold naturally under their own weight, with natural creases, never stiff, flat or board-like."
YEL_NEW="rich warm royal golden yellow, a honey-gold close to hex #EFBD69 (medium depth, 18K gold tone), not pale cream, not beige/tan/ochre, not heavy mustard, not lemon"
# men's ages: wording follows the consort AGE_TXT pattern (a36 young for his age, a51 ages beautifully) and the old emperor lineup (clean-shaven young; thin moustache / short beard later; silver strands at 51)
AGE_TXT={"a18":"about 22, youthful adult.",
"a26":"about 30, mature and poised.",
"a36":"about 36 but looking young for his age: still youthful and very handsome, only a touch more mature and poised than his young self, smooth skin, no visible lines, never an older face.",
"a51":"about 51, a dignified handsome older man who ages beautifully: a slightly fuller mature face, soft fine lines at the eyes and gentle smile lines, still very handsome and refined; a few visible silver strands at the temples (only a few, never white hair)."}
# ---- per-emperor slots (the ONLY thing that differs) ----
FACE={
"live1":"a handsome oval face, soft round-almond eyes, gently arched brows, a thin neat moustache",
"live2":"a handsome oval face, soft round-almond eyes, gently arched brows, a thin neat moustache",
"e1":"oval face, soft round-almond eyes, gentle straight brows, clean-shaven",
"e2":"slightly longer face, defined jaw, slightly fuller brows, a light moustache",
"e3":"softly rounded jaw, high cheekbones, thin elegant brows, clean-shaven, a kind gentle look",
"e4":"strong straight nose, squarer jaw, thick straight brows, a short neat beard along the jaw"}
ROBE_LIVE="a round-collar imperial dragon robe of golden yellow silk with a large front dragon medallion on the chest, smaller dragons and clouds on the shoulders and skirt, a wide gold-and-jade belt with long tassels and jade pendants hanging at the front, a deep sea-wave hem embroidered with white-capped waves in blue-green and gold, wide sleeves, floor-length robe with shoes visible; a small gold imperial crown with a short pin"
ROBE_E="the Emperor's imperial crossed-collar dragon robe of golden yellow silk, richly embroidered with five-claw dragons, clouds and sea waves in gold thread, a stiff short slightly pointed shoulder piece, a jade-and-gold belt with a long tassel, floor-length robe with shoes visible; {crown} (NO Qing feathered hat)"
OUTFIT={
"live1":ROBE_LIVE,"live2":ROBE_LIVE,
"e1":ROBE_E.format(crown="a Ming-style gold guan crown with a jade pin"),
"e2":ROBE_E.format(crown="a tall Ming-style black-and-gold guan crown")+", a thin black collar edge and a black-and-gold belt as the only dark trim",
"e3":ROBE_E.format(crown="a flat Ming-style miện crown with short bead strings reaching only the brow, never covering the face")+", narrow crimson trim along the collar and sleeve edges",
"e4":ROBE_E.format(crown="a Ming-style gold dragon-head guan crown")+", narrow dark-jade trim along the collar and sleeve edges"}
ITEM={
"live1":("a gold-mounted imperial scroll","the rolled scroll in one hand lowered at his side, the other hand resting lightly at his belt, body turned slightly three-quarters"),
"live2":("an imperial folding fan with carved ribs","the closed fan held in both hands lowered before him at waist height, a slight turn of the body, head up toward the viewer"),
"e1":("a jade ruyi scepter","the ruyi upright in one hand at chest height below the chin, the other hand resting at his belt, body turned slightly three-quarters"),
"e2":("a gold-mounted imperial scroll","the rolled scroll in one hand lowered at his side, the other hand resting lightly at his belt, body turned slightly three-quarters"),
"e3":("an imperial closed folding fan","the closed fan held in both hands lowered before him at waist height, a slight turn of the body, head up toward the viewer"),
"e4":("a jade ceremonial tablet","the tablet held in both hands at waist height before him, body turned slightly three-quarters")}
def colour():
    return (f"all colours fresh, clear and luminous, never dusty or greyed; the royal golden yellow is the DOMINANT colour of the whole robe, sleeves and skirt (far more than half of everything visible), any other colour only as narrow trim; the yellow is {YEL_NEW}; the crown, pin and jewellery gold in the same 18K tone; gold only as thin accents on the borders.")
def build(k,age="a26"):
    s=PRE+f" An imperial emperor (Hoàng thượng). His face: {FACE[k]}. From the identity reference keep ONLY his face, facial features and hairstyle colour; do NOT copy the outfit, crown or accessories of the reference, dress him in the NEW outfit below. The style reference image is only for skin, drawing style, fabric and embroidery: never copy its face, body or pose. {AGE_TXT[age]}"
    s+=f" Outfit (the Emperor, clearly the most splendid man in the palace): {OUTFIT[k]}."
    s+=" COLOUR RULE: "+colour()
    s+=" All dragons, clouds and waves are fine silk-thread embroidery stitched directly into the fabric, flat and integrated with the cloth, following its folds, not appliqué, not pasted patches, not raised. "+FAB
    item,hand=ITEM[k]
    s+=f" Pose: calm standing pose; he holds {item} in a contrasting colour, not the robe colour, the item held below the chin or before the waist, the hand really gripping it, the whole face fully visible. His hands interact naturally with the item (gently presenting, turning or touching it), lively and natural, while his head stays up facing the viewer, eyes open, lips closed, never looking down. His hands and body: {hand}."
    s+=" Luminous smooth porcelain skin, bare clean forehead, eyes open, floor-length robe with shoes visible, no train, no cup, nothing covering the face."
    return s+END
if __name__=="__main__":
    age="a26"
    if "--age" in sys.argv: age=sys.argv[sys.argv.index("--age")+1]
    print(build([a for a in sys.argv[1:] if a in FACE][0],age),end="")

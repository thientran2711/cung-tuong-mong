#!/usr/bin/env python3
"""t8 PROMPT B (Hoang hau, a18, ONE figure) -- FROZEN by W72 (owner 18/11 ~18:20Z: draw all 90 with THIS prompt, change nothing).
Usage: python3 build.py cNN v0|v1|v2 [--golden]   -> prints the exact prompt.
--golden = byte-identical to the 4 prompts actually run (c06 c16 c20 c25, version A/B test, B = with fabric sentence; see golden/).
Default mode = the same text, ONLY the colour slot differs (owner 18:17Z: royal yellow of c25 B, measured; 18:00Z: fresh colours).
Per-person data (palette, face words) copied from dev/figwork/jobs.json on origin/main (N-cNN-t8 figs[0].palette and 'Her own features').
"""
import sys
DATA={
"c01": [
"rose red and gold",
"oval face, almond eyes, long soft lashes"
],
"c02": [
"sapphire blue and silver",
"heart-shaped face, deep-set calm eyes, thick straight brows"
],
"c03": [
"emerald green and cream",
"long slender face, clear bright eyes, gently arched brows"
],
"c04": [
"royal purple and lavender",
"softly round face, large soft eyes, a softly defined cupid's-bow upper lip"
],
"c05": [
"peacock teal and gold",
"diamond face with high cheekbones, large round eyes, thin high-arched brows"
],
"c06": [
"vermilion and ivory",
"face with a petite pointed chin, warm round-almond eyes, softly rounded brows"
],
"c07": [
"lavender and pale pink",
"gentle square-jawed face, almond eyes, softly rounded cheekbones"
],
"c08": [
"cherry-blossom pink and pale green",
"wide soft cheeks, deep-set calm eyes, a faint dimple in her left cheek"
],
"c09": [
"powder blue and white",
"oval face, clear bright eyes, long soft lashes"
],
"c10": [
"peach and cream",
"heart-shaped face, large soft eyes, thick straight brows"
],
"c11": [
"lilac and silver",
"long slender face, large round eyes, gently arched brows"
],
"c12": [
"mint green and white",
"softly round face, warm round-almond eyes, a softly defined cupid's-bow upper lip"
],
"c13": [
"apricot and cream",
"diamond face with high cheekbones, almond eyes, thin high-arched brows"
],
"c14": [
"soft butter yellow and white",
"face with a petite pointed chin, deep-set calm eyes, softly rounded brows"
],
"c15": [
"coral pink and ivory",
"gentle square-jawed face, clear bright eyes, softly rounded cheekbones"
],
"c16": [
"sage green and cream",
"wide soft cheeks, large soft eyes, a faint dimple in her left cheek"
],
"c17": [
"blush pink and pale gold",
"oval face, large round eyes, long soft lashes"
],
"c18": [
"magenta rose and lilac",
"heart-shaped face, warm round-almond eyes, thick straight brows"
],
"c19": [
"plum and pink",
"long slender face, almond eyes, gently arched brows"
],
"c20": [
"lotus pink and celadon",
"softly round face, deep-set calm eyes, a softly defined cupid's-bow upper lip"
],
"c21": [
"ruby and blush pink",
"diamond face with high cheekbones, clear bright eyes, thin high-arched brows"
],
"c22": [
"orchid purple and pink",
"face with a petite pointed chin, large soft eyes, softly rounded brows"
],
"c23": [
"crimson and gold",
"gentle square-jawed face, large round eyes, softly rounded cheekbones"
],
"c24": [
"scarlet and ivory",
"wide soft cheeks, warm round-almond eyes, a faint dimple in her left cheek"
],
"c25": [
"deep cherry red and black-gold",
"oval face, almond eyes, a softly defined cupid's-bow upper lip"
],
"c26": [
"burgundy and gold",
"heart-shaped face, deep-set calm eyes, thin high-arched brows"
],
"c27": [
"cinnabar and cream",
"long slender face, clear bright eyes, softly rounded brows"
],
"c28": [
"celadon and white",
"softly round face, large soft eyes, softly rounded cheekbones"
],
"c29": [
"ink blue and pale grey",
"diamond face with high cheekbones, large round eyes, a faint dimple in her left cheek"
],
"c30": [
"moonlight blue and white",
"face with a petite pointed chin, warm round-almond eyes, long soft lashes"
],
"c31": [
"pale jade and silver",
"gentle square-jawed face, almond eyes, thick straight brows"
],
"c32": [
"ivory and soft grey-blue",
"wide soft cheeks, deep-set calm eyes, gently arched brows"
]
}
V2={"c01": "jade green", "c02": "coral pink", "c03": "crimson red", "c04": "jade green", "c05": "rose pink", "c06": "azure blue", "c07": "leaf green", "c08": "sky blue", "c09": "rose red", "c10": "turquoise", "c11": "leaf green", "c12": "rose pink", "c13": "sky blue", "c14": "orchid purple", "c15": "jade green", "c16": "rose pink", "c17": "turquoise", "c18": "azure blue", "c19": "leaf green", "c20": "sky blue", "c21": "turquoise", "c22": "jade green", "c23": "azure blue", "c24": "lavender violet", "c25": "jade green", "c26": "sky blue", "c27": "turquoise", "c28": "coral pink", "c29": "rose red", "c30": "peach orange", "c31": "coral pink", "c32": "azure blue"}
PRE=("Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering of the reference portraits; full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porcelain skin; gentle expression with soft eyes and a bright closed-lip smile, lips closed, no teeth, mouth never open; elegant, slim, clearly adult; beautiful/handsome romantic-lead looks for everyone; face clearly visible, 3/4 or frontal view.")
END=" Eyes soft, warm and round-almond, never slanted or upturned, never teary. Everyone beautiful at every age. No text, no labels."
FAB="The silk has real weight: the wide sleeves and robe hang and fold naturally under their own weight, with natural creases, never stiff, flat or board-like."
YEL_GOLDEN="fresh royal golden yellow, lighter depth, 18K gold tone, not pale cream, not beige/tan/ochre, not heavy mustard, not lemon"
# measured from c25 B (img/_review/t8-reprompt/c25_a18_t8_ab_B.png): yellow pixels median #F2C985, IQR #E1BA73..#FBD493, HSV ~37deg 45% 95%
YEL_NEW="rich warm royal golden yellow, a honey-gold close to hex #F2C985 (light-medium depth, 18K gold tone), not pale cream, not beige/tan/ochre, not heavy mustard, not lemon"
# 3f t8 list (10 items): (text, hand-template key)
ITEMS=[("a gold ruyi set with gems","one"),("an imperial phoenix-embroidered round fan with a gold-and-jade handle and pearl tassels","two"),
("a gold-mounted imperial scroll","scroll"),("a gold phoenix seal box","box"),("a phoenix-headed gold hand mirror with pearls","one"),
("a gold phoenix-shaped incense ball","one"),("a kingfisher-and-pearl phoenix folding fan with gold ribs","two"),
("a gold lidded jewel casket with a phoenix and pearls","box"),("an imperial book bound in gold-thread silk","two"),
("a gold phoenix palace lantern with pearl tassels","two")]
GOLDEN_ITEM={"c06":0,"c16":1,"c20":2,"c25":3}   # as run in the A/B test
EXTRA_ITEM={"c24":5}   # c24 would repeat neighbour c25
def hand(key,right):
    d="right" if right else "left"; o="left" if right else "right"
    if key=="one": return f"the item upright in one hand at chest height below the chin, the other hand resting over her sash, body turned slightly three-quarters to the {d}"
    if key=="two": return "the item in both hands lowered before her at waist height, a slight turn of the body, head tilted gently toward the viewer"
    if key=="scroll": return f"the rolled scroll in one hand lowered at her side, the other hand lifting her sleeve slightly, body turned slightly three-quarters to the {d}"
    return f"the box in both hands at waist height before her, body turned slightly three-quarters to the {d}"
def item_for(c):
    n=int(c[1:])
    if c in GOLDEN_ITEM: return GOLDEN_ITEM[c]
    if c in EXTRA_ITEM: return EXTRA_ITEM[c]
    return (n*3+(n//10))%10 if (n*3)%10 not in GOLDEN_ITEM.values() else (n*3+1)%10
def colour(c,v,golden):
    pal,_=DATA[c]; main=pal.split(" and ")[0]; fam=pal
    if golden: return (f"her own signature colour {main} (colour family {fam}, as in her first reference) stays clearly visible as a main colour of the robe, sleeves and mantle, mixed with a golden yellow in the inner robe, borders, sash and large areas of the sleeves and skirt; the yellow is {YEL_GOLDEN}; the crown, hairpin and jewellery gold in the same 18K tone; gold only as thin accents on the borders; NOT an all-yellow robe.",main)
    fresh="all colours fresh, clear and luminous, never dusty or greyed; "
    if v=="v0": return (f"{fresh}her own signature colour {main} (colour family {fam}, as in her first reference) stays clearly visible as a main colour of the robe, sleeves and mantle, mixed with a golden yellow in the inner robe, borders, sash and large areas of the sleeves and skirt; the yellow is {YEL_NEW}; the crown, hairpin and jewellery gold in the same 18K tone; gold only as thin accents on the borders; NOT an all-yellow robe.",main)
    if v=="v1": return (f"{fresh}the royal golden yellow is the MAIN colour of the robe, mantle and sleeves, with one fresh accent of her colour {main} (inner robe, collar and a few borders); the yellow is {YEL_NEW}; the crown, hairpin and jewellery gold in the same 18K tone; NOT dusty, NOT pale.",main)
    f=V2[c]; return (f"{fresh}a fresh {f} (a different colour family from her first reference) is the main colour of the robe, sleeves and mantle, mixed with a golden yellow in the inner robe, borders, sash and large areas of the sleeves and skirt; the yellow is {YEL_NEW}; the crown, hairpin and jewellery gold in the same 18K tone; gold only as thin accents on the borders; NOT an all-yellow robe.",f)
def build(c,v="v0",golden=False):
    pal,face=DATA[c]; rule,main=colour(c,v,golden); item,hk=ITEMS[item_for(c)]; right=(int(c[1:])%2==1) if c not in GOLDEN_ITEM else {"c06":True,"c25":True,"c16":True,"c20":False}[c]
    robe=main if (v!="v1" or golden) else "golden yellow"
    s=PRE+f" An imperial consort, the Empress. Her face: {face}. From the identity reference keep ONLY her face, facial features, hairstyle colour and signature colour family; do NOT copy the outfit, hair ornaments or accessories of the reference, dress her in the NEW outfit below. The style reference image is only for skin, drawing style, fabric and embroidery: never copy its face, body or pose. about 22, youthful adult."
    s+=f" Outfit (the Empress (Hoàng hậu), clearly much richer and more splendid than the lower ranks): the Empress's imperial phoenix ceremonial robe of {robe} silk mixed with golden yellow, richly embroidered on the chest, shoulders and wide sleeves with large phoenixes, peonies and clouds in gold and kingfisher-blue silk thread (far denser and richer embroidery than any other rank), over it a long ceremonial silk mantle falling from the shoulders to the floor, edged with a broad band of gold brocade and pearls, a wide jewelled gold-and-pearl cloud collar with layered pearl fringes over the shoulders, many long strands of pearls and jade across the chest, a jade-and-gold belt with long tassels and jade pendants, floor-length robe with slippers visible, slim tall silhouette; the GRANDEST headdress of all: a FULL tall imperial nine-phoenix crown, clearly taller and wider than a noble consort's crown, with a large central gold phoenix holding a pearl string in its beak, jewelled wings spreading wide on both sides, kingfisher-blue inlay, rubies and pearls, and a few clean pearl tassels at the sides; the most splendid outfit of all, clearly grander than every other rank."
    s+=" COLOUR RULE: "+rule
    s+=" The phoenix is the main embroidered motif, larger and more prominent than the flowers."
    s+=" All flowers, birds and the phoenix are fine silk-thread embroidery stitched directly into the fabric, flat and integrated with the cloth, following its folds, not appliqué, not pasted patches, not raised. "+FAB
    s+=f" Pose: calm standing pose; she holds {item} in a contrasting colour, not the robe colour, the item held below the chin, the hand really gripping it, the whole face fully visible. Her hands and body: {hand(hk,right)}."
    s+=" Every hairpin is inserted into the hair pointing upward or backward with dangles hanging down, no hairpin horizontal or sticking out to the side. Luminous smooth porcelain skin, bare clean forehead with no forehead mark and no flower mark, eyes open, floor-length robe with slippers visible, no train, no cup, nothing covering the face."
    return s+END
if __name__=="__main__":
    a=[x for x in sys.argv[1:] if not x.startswith("--")]
    print(build(a[0],a[1] if len(a)>1 else "v0","--golden" in sys.argv),end="")

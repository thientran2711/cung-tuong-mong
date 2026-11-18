#!/usr/bin/env python3
"""t8 PROMPT B (Hoang hau, a18, ONE figure) -- FROZEN by W72 (owner 18/11 ~18:20Z: draw all 90 with THIS prompt, change nothing).
Usage: python3 build.py cNN v0|v1|v2 [--golden]   |   python3 build.py cNN --t7  (Hoang quy phi v0)   -> prints the exact prompt.
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
# ORIGINAL robe colour of each person = the robe colour of her own t1 figure (img/_review/consort-tiers/<cNN>/b10/<cNN>_a18_t1_v0.png), image 1 of every v0 gen
# (owner 18:35Z: one original colour for all ranks; NO third reference image). hex = median of the robe area of that t1 (head/skin/gold excluded, measure.py), checked by eye.
# People not listed fall back to the jobs.json palette (colour family) until measured.
ORIG1={
"c01":("soft coral pink silk like #F19489","a deeper coral like #E17A70"),
"c02":("muted blue silk like #838AA1","a silvery grey like #B3ADB4"),
"c03":("muted olive green silk like #97946D","a deeper olive like #747250"),
"c04":("mauve purple silk like #9B688D","a soft pink-lilac like #D7B0C2"),
"c05":("muted teal silk like #697974","a grey-sage like #8F9486"),
"c06":("coral red silk like #D5745E","a deeper coral red like #BA5F49"),
"c07":("soft rose pink silk like #E2B8B8","a dusty rose like #CDA2A6"),
"c08":("soft cherry-blossom pink silk like #F0B9BB","a pale sage green like #A9B596"),
"c10":("soft peach silk like #F2C6A5","a cream like #F3E2CC"),
"c09":("pale silver grey-blue silk like #CAC6C8","a silvery grey like #A8A9AD"),
"c11":("soft pink-grey silk like #D6BFC3","a dusty rose like #B198A0"),
"c16":("muted sage green silk like #9CA283","a cream like #E6DCC0"),
"c20":("soft rose pink silk like #E9B5AE","a pale pink like #F0D6CF"),
"c23":("coral red silk like #BA5B44","a cream like #EBDCC4"),
"c24":("coral red silk like #D97B60","a pale blush cream like #F3D1B1"),
"c25":("brick rust red silk like #8C4D40","a warmer red like #B86457"),
"c12":("pale sage green silk like #C9D2B4","a cream like #E8DCC4"),
"c13":("apricot peach silk like #EBA98E","a soft peach like #F0C5B0"),
"c14":("butter cream yellow silk like #EBDDB0","a pale cream like #F0E6CC"),
"c15":("soft coral pink silk like #E0A398","a pale pink like #EBC4BA"),
"c17":("soft rose pink silk like #E5A598","a pale blush like #F0C6BB"),
"c18":("mauve rose silk like #BF868F","a soft lilac-pink like #D9B5C5"),
"c19":("dusty rose silk like #B97E78","a pale pink like #E3B9B0"),
"c21":("rose red silk like #C9746C","a blush pink like #E8B5AC"),
"c22":("soft lavender silk like #CDB9DC","a pale pink like #EBC7D0"),
}
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
    if v=="v0" and c in ORIG1: return (f"{fresh}her ORIGINAL robe colour is kept exactly as in image 1 (her first reference): {ORIG1[c][0]} as the main colour of the robe, sleeves and mantle, with {ORIG1[c][1]} in the inner robe and linings, mixed with a golden yellow in the inner robe, borders, sash and large areas of the sleeves and skirt; the yellow is {YEL_NEW}; the crown, hairpin and jewellery gold in the same 18K tone; gold only as thin accents on the borders; NOT an all-yellow robe.",ORIG1[c][0].split(" silk")[0])
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

# ---------- t7 Hoang quy phi variant (same method; colour slot: ORIGINAL t7 colour MAIN + royal yellow ONLY as parts) ----------
ITEMS7=[("a gilded hand censer","c"),("an imperial round fan with a gold filigree frame and gems","two"),("a gold-filigree jewel casket set with gems","box"),
("a kingfisher-feather folding fan with gold ribs","two"),("a gold lotus-shaped incense box","box"),("a gold hand mirror set with gems","one"),
("a gold-mounted jade vase with peonies","one"),("a gold-filigree palace lantern with gem tassels","two"),("a gold flower basket set with gems","box"),
("a gold-and-coral bead string held as a hand ornament","one")]
GOLDEN7={"c06":0,"c25":2}
def hand7(key,right):
    d="right" if right else "left"
    if key=="c": return f"the censer held in one hand at chest height below the chin, the other hand resting lightly on her sash, body turned slightly three-quarters to the {d}"
    if key=="one": return f"the item held in one hand at chest height below the chin, the other hand resting lightly on her sash, body turned slightly three-quarters to the {d}"
    if key=="two": return "the item held in both hands lowered before her at waist height, a slight turn of the body, head tilted gently toward the viewer"
    return f"the item held in both hands at waist height before her, body turned slightly three-quarters to the {d}"
# T7V2 (W77 18/11): third fresh colour family per person for t7 v2 (not her t1 family, not her V2 family, never dusty/rực). t7 v1 = V2[c] as MAIN.
T7V2={'c01': 'azure blue', 'c02': 'turquoise', 'c03': 'sky blue', 'c04': 'rose pink', 'c05': 'jade green', 'c06': 'leaf green', 'c07': 'orchid purple', 'c08': 'lavender violet', 'c09': 'turquoise', 'c10': 'azure blue', 'c11': 'sky blue', 'c12': 'orchid purple', 'c13': 'jade green', 'c14': 'coral pink', 'c15': 'lavender violet', 'c16': 'azure blue', 'c17': 'leaf green', 'c18': 'turquoise', 'c19': 'sky blue', 'c20': 'jade green', 'c21': 'leaf green', 'c22': 'peach orange', 'c23': 'orchid purple', 'c24': 'azure blue', 'c25': 'lavender violet', 'c26': 'turquoise', 'c27': 'sky blue', 'c28': 'orchid purple', 'c29': 'jade green', 'c30': 'leaf green', 'c31': 'lavender violet', 'c32': 'rose pink'}
def build_t7(c,v="v0"):
    pal,face=DATA[c]; n=int(c[1:]); i=GOLDEN7.get(c,(n*3+5)%10); item,hk=ITEMS7[i]; right=(c=="c25") if c in GOLDEN7 else n%2==1
    m,m2=ORIG1[c] if c in ORIG1 else (pal.split(" and ")[0]+" silk",pal.split(" and ")[-1])
    main=m.split(" silk")[0]
    nf=V2[c] if v=="v1" else T7V2[c] if v=="v2" else None
    if nf: main=nf
    s=PRE+f" An imperial consort. Her face: {face}. From the identity reference keep ONLY her face, facial features, hairstyle colour and signature colour family; do NOT copy the outfit, hair ornaments or accessories of the reference, dress her in the NEW outfit below. The style reference image is only for skin, drawing style, fabric and embroidery: never copy its face, body or pose. about 22, youthful adult."
    s+=f" Outfit (rank-7 imperial noble consort (Hoàng quý phi), clearly much richer and more splendid than the lower ranks): a near-empress ceremonial robe of {main} silk, embroidered with phoenixes, peonies and auspicious clouds in gold thread on the chest and along the borders, a jewelled cloud-collar cape edged with pearls and gold over the shoulders, strands of pearls across the chest, a jade-and-gold belt with long tassels, floor-length robe with slippers visible; tall grand chignon crowned by a LARGE ornate gold phoenix crown (one large gold phoenix with spreading wings, grander and taller than a noble consort's headdress, but clearly simpler than the Empress's nine-phoenix crown) with pearl strands, kingfisher-blue inlay and a few gold tassels."
    s+=f" COLOUR RULE: all colours fresh, clear and luminous, never dusty or greyed; "+(f"her ORIGINAL robe colour is kept exactly as in image 1 (her first reference): {m} is the MAIN colour of the robe, cape and sleeves, with {m2} in the linings" if not nf else f"a fresh {nf} (a different colour family from her first reference) is the MAIN colour of the robe, cape and sleeves, with a paler tint of the same {nf} in the linings")+f"; yellow only as parts (the borders, the sash, the collar and a narrow inner panel of the robe) in {YEL_NEW}; the crown, hairpin and jewellery gold in the same 18K tone; NOT an all-yellow robe."
    s+=" All flowers, birds and the phoenix are fine silk-thread embroidery stitched directly into the fabric, flat and integrated with the cloth, following its folds, not appliqué, not pasted patches, not raised. "+FAB
    s+=f" Pose: calm standing pose; she holds {item} in a contrasting colour, not the robe colour, the item held below the chin, the hand really gripping it, the whole face fully visible. Her hands and body: {hand7(hk,right)}."
    s+=" Every hairpin is inserted into the hair pointing upward or backward with dangles hanging down, no hairpin horizontal or sticking out to the side. Luminous smooth porcelain skin, bare clean forehead with no forehead mark and no flower mark, eyes open, floor-length robe with slippers visible, no train, no cup, nothing covering the face."
    return s+END

# ---------- t1..t6 variant (same recipe as t8 B; NO phoenix; sample c06 c25 only so far) ----------
# ORIGINAL ladder outfit text of that rank (jobs.json N-cNN-tK 'Outfit for all four ...' segment, copied unchanged)
OUTFIT_LOW={
"c06-t1": "Outfit: a fine silk robe with delicate embroidered butterflies at the collar, sleeves and hem and a soft silk sash (elegant, never poor, little gold), hair in a neat bun with pretty silver hairpins and a fresh flower (an orchid), clean bright colours: vermilion and ivory",
"c06-t2": "Outfit: a fine silk robe with embroidered borders and a small woven butterflies pattern (elegant, a little more ornate than the lowest rank, little gold), neat chignon with silver and pearl hairpins and a fresh flower (an orchid), clean bright colours: vermilion and ivory",
"c06-t3": "Outfit: a patterned silk robe with small woven butterflies, layered chignon with fresh flower hairpins and small silk flowers, clean bright colours: vermilion and ivory",
"c06-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of butterflies at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family vermilion and ivory stays the MAIN robe colour (vermilion, NOT green); the robe itself is clearly vermilion silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c06-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins, gold earrings; her signature colour family vermilion and ivory stays the MAIN robe colour (vermilion, NOT green); the robe itself is clearly vermilion silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c06-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED vermilion silk, embroidered with phoenixes and butterflies in vermilion and gold thread along the borders, an embroidered vermilion pearl-edged cape/stole over the shoulders, gold-and-jade necklace, earrings and bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly vermilion silk (her signature colour family vermilion and ivory), with large areas of plain vermilion silk visible; ivory only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green",
"c25-t1": "Outfit: a fine silk robe with delicate embroidered bamboo leaves at the collar, sleeves and hem and a soft silk sash (elegant, never poor, little gold), hair in a neat bun with pretty silver hairpins and a fresh flower (a pink peony), clean bright colours: deep cherry red and black-gold",
"c25-t2": "Outfit: a fine silk robe with embroidered borders and a small woven bamboo leaves pattern (elegant, a little more ornate than the lowest rank, little gold), neat chignon with silver and pearl hairpins and a fresh flower (a pink peony), clean bright colours: deep cherry red and black-gold",
"c25-t3": "Outfit: a patterned silk robe with small woven bamboo leaves, layered chignon with fresh flower hairpins and small silk flowers, clean bright colours: deep cherry red and black-gold",
"c25-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of bamboo leaves at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family deep cherry red and black-gold stays the MAIN robe colour (deep cherry red, NOT green); the robe itself is clearly deep cherry red silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c25-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins, gold earrings; her signature colour family deep cherry red and black-gold stays the MAIN robe colour (deep cherry red, NOT green); the robe itself is clearly deep cherry red silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c25-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED deep cherry red silk, embroidered with phoenixes and bamboo leaves in deep cherry red and gold thread along the borders, an embroidered deep cherry red pearl-edged cape/stole over the shoulders, gold-and-jade necklace, earrings and bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly deep cherry red silk (her signature colour family deep cherry red and black-gold), with large areas of plain deep cherry red silk visible; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green"
}
ITEMS_LOW={"c06":{1:("a plain silk round fan with a bamboo handle","two"),2:("an embroidered silk sachet with a tassel","one"),3:("an embroidered silk round fan with a silk tassel","two"),
 4:("a round fan with a carved jade handle and jade tassel","two"),5:("a round fan with a gold-inlaid handle and gem tassel","two"),6:("a white-jade ruyi","one")},
 "c25":{1:("a sprig of fresh plum blossoms","one"),2:("a painted paper folding fan","one"),3:("a painted scroll with wooden rollers","scroll"),
 4:("a lacquered jewel box","box"),5:("a painted scroll with gold fittings","scroll"),6:("a jewelled box","box")}}
LOWNAME={"c06":("vermilion","coral red"),"c25":("deep cherry red","brick rust red")}
def build_low(c,t):
    pal,face=DATA[c]; m,m2=ORIG1[c]; item,hk=ITEMS_LOW[c][t]; right=(c=="c25")
    o=OUTFIT_LOW[f"{c}-t{t}"].replace(LOWNAME[c][0],LOWNAME[c][1])
    o=o.replace("phoenixes and peonies","peonies and small birds").replace("phoenixes and butterflies","peonies and butterflies").replace("phoenixes and bamboo leaves","peonies and bamboo leaves")
    s=PRE+f" An imperial consort. Her face: {face}. From the identity reference keep ONLY her face, facial features, hairstyle colour and signature colour family; do NOT copy the outfit, hair ornaments or accessories of the reference, dress her in the NEW outfit below. The style reference image is only for skin, drawing style, fabric and embroidery: never copy its face, body or pose. about 22, youthful adult. "+o+"."
    s+=f" COLOUR RULE: all colours fresh, clear and luminous, never dusty or greyed; her ORIGINAL robe colour is kept exactly as in image 1 (her first reference): {m} is the main colour of the robe, sleeves and any cape, with {m2} in the inner robe and linings; gold only as thin accents."
    s+=" Hair: her own hairstyle decorated with fresh flowers and several gold hairpins (trâm) with dangles, rich like her rank. No phoenix anywhere on the robe or in the hair: only flowers, birds, butterflies or other motifs. All flowers, birds and butterflies are fine silk-thread embroidery stitched directly into the fabric, flat and integrated with the cloth, following its folds, not appliqué, not pasted patches, not raised. "+FAB
    s+=f" Pose: calm standing pose; she holds {item} in a contrasting colour, not the robe colour, the item held below the chin, the hand really gripping it, the whole face fully visible. Her hands and body: {hand7(hk if hk in ('one','two','box') else 'one',right) if hk!='scroll' else 'the scroll in one hand lowered at her side, the other hand lifting her sleeve slightly, body turned slightly three-quarters to the right'}."
    s+=" Every hairpin is inserted into the hair pointing upward or backward with dangles hanging down, no hairpin horizontal or sticking out to the side. Luminous smooth porcelain skin, bare clean forehead with no forehead mark and no flower mark, eyes open, floor-length robe with slippers visible, no train, no cup, nothing covering the face."
    return s+END
if __name__=="__main__":
    a=[x for x in sys.argv[1:] if not x.startswith("--")]
    print(build_low(a[0],int(sys.argv[sys.argv.index("--low")+1])) if "--low" in sys.argv else build_t7(a[0],a[1] if len(a)>1 else "v0") if "--t7" in sys.argv else build(a[0],a[1] if len(a)>1 else "v0","--golden" in sys.argv),end="")

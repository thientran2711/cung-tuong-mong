# lad3.py: t4-t8 outfits for Part C = consort-art spec5 (art5 final): LAD + colour rule + t8 grand mantle/crown, opaque, slim train
import re
GREEN=("green","celadon","jade","teal","mint","sage","aqua")
RANK={4:"rank-4 consort (Tan)",5:"rank-5 consort (Phi)",6:"rank-6 noble consort (Quy phi)",7:"rank-7 imperial noble consort (Hoang quy phi)",8:"the Empress (Hoang hau)"}
ACC={}
LAD={4:"a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of {mot} at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins",
5:"a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins, gold earrings",
6:"a HEAVY silk brocade robe in SATURATED {main} silk, embroidered with phoenixes and {mot} in {main} and gold thread along the borders, an embroidered {main} pearl-edged cape/stole over the shoulders, gold-and-jade necklace, earrings and bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels",
7:"a near-empress ceremonial robe of SATURATED {main} silk, embroidered with phoenixes and auspicious clouds in gold thread on the chest and along the borders, a jewelled cloud-collar cape edged with pearls and gold over the shoulders, strands of pearls across the chest, a jade-and-gold belt with long tassels, a long flowing {main} train behind her; tall grand chignon crowned by a LARGE ornate gold phoenix crown (grander and taller than a noble consort's headdress, only a little smaller than the Empress's) with spreading gold phoenix wings, pearl strands, kingfisher-blue inlay and many dangling gold tassels",
8:"the Empress's imperial phoenix ceremonial robe of SATURATED {main} silk with large phoenixes and clouds embroidered in gold thread, a jewelled layered gold-and-pearl cloud-collar cape over the shoulders, many pearl strands, a jade-and-gold belt with long tassels, a VERY long {main} trailing train; the GRANDEST headdress of all: a FULL tall gold phoenix crown with nine gold phoenixes, pearls, kingfisher-blue inlay, and long pearl strands hanging at the sides; the most splendid outfit of all, clearly grander than every other rank"}
ACC={"cherry-blossom pink and pale green":"pale green","lotus pink and celadon":"celadon"}
WHITE=("ivory","white","moonlight")
def outfit(t,pal,mot):
    main=pal.split(" and ")[0]; acc=pal.split(" and ")[1] if " and " in pal else "gold"
    neg="" if any(g in pal for g in GREEN) else ", NOT green"
    col=f"her signature colour family {pal} stays the MAIN robe colour ({main}{neg}); the robe itself is clearly {main} silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe"
    if any(w in main for w in ("cream","ivory","beige")): col=f"her signature colour family {pal} stays the MAIN robe colour ({main}{neg}); the robe itself is clearly {main} silk with rich gold embroidery accents, NOT an all-gold robe"  # C-B: no contradiction for cream palettes
    if pal in ACC: col=f"her signature colour family {pal}: {main} is the MAIN robe colour (the robe is clearly {main}, NOT a green robe; {ACC[pal]} only as a small accent), gold only as embroidery accents, NOT a cream or all-gold robe"
    if t>=6:  # art4: strong colour rule (t6 first tries washed pale palettes into cream/gold; this wording fixed c17 c20 c28 c30 c31 c32)
        m=main if not any(w in main for w in ("ivory","white")) else "luminous cool "+main+"-white"
        notiv="" if any(w in main for w in ("ivory","white")) else ", NOT ivory"
        if pal in ACC: neg=", NOT a green robe"
        col=(f"COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly {m} silk (her signature colour family {pal}), with large areas of plain {main} silk visible; "+
             ("" if "gold" in acc and pal not in ACC else f"{acc if pal not in ACC else ACC[pal]} only as a small accent; ")+f"gold only as thin accents on the borders; NOT cream, NOT beige{notiv}, NOT an all-gold robe{neg}")
        if any(w in main for w in ("ivory","white")): col=col.replace("NOT cream, NOT beige","NOT yellow, NOT beige")
    m2=("luminous cool "+main) if any(w in main for w in ("ivory","white")) else main
    return f"Outfit for all four ({RANK[t]}, clearly much richer and more splendid than the lower ranks): a NEW outfit, {LAD[t].format(mot=mot,main=m2).replace("SATURATED luminous","luminous")}; {col}"
IDK=" From the identity reference lineup keep ONLY her face, facial features, hairstyle colour, signature colour family and the same four ages; do NOT copy the outfit, hair ornaments or accessories of the reference, dress her in the NEW richer outfit below."
L8O=re.compile(r"the Empress's imperial phoenix ceremonial robe of (SATURATED |)(.+?) silk with large phoenixes.*?clearly grander than every other rank")
def L8N(m):
    sat,c=m.group(1),m.group(2)
    return (f"the Empress's imperial phoenix ceremonial robe of {sat}{c} silk, richly embroidered on the chest, shoulders and wide sleeves with large phoenixes, peonies "
     f"and clouds in gold and kingfisher-blue silk thread (far denser and richer embroidery than any other rank), over it a long ceremonial {c} silk mantle "
     f"falling from the shoulders to the floor, edged with a broad band of gold brocade and pearls, a wide jewelled gold-and-pearl cloud collar with layered "
     f"pearl fringes over the shoulders, many long strands of pearls and jade across the chest, a jade-and-gold belt with long tassels and jade pendants, "
     f"a VERY long {c} train spread on the ground behind her; the GRANDEST headdress of all: a FULL tall imperial nine-phoenix crown, clearly taller and "
     f"wider than a noble consort's crown, with a large central gold phoenix holding a pearl string in its beak, jewelled wings spreading wide on both sides, "
     f"kingfisher-blue inlay, rubies and pearls, and long curtains of pearl tassels hanging at both sides down to the shoulders; the most splendid outfit of all, "
     f"clearly grander than every other rank")

def ca_outfit(t,pal,mot):
    o=outfit(t,pal,mot).replace("a sheer silk shawl","an opaque silk shawl draped close over the arms")
    if t==8:
        o=L8O.sub(L8N,o,count=1)
        o=re.sub(r"a VERY long (.+?) train spread on the ground behind her",r"a VERY long \1 train trailing straight behind her, skirt and train NOT spread wide to the sides, slim tall silhouette",o)
    return o

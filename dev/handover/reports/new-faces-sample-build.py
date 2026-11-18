import json,re
ns={}
src=open("/tmp/claude-0/sp/spec2.py").read().split("LOOKS=")[0]
exec(src,ns)
TIERS=ns['TIERS']; col=ns['col']; TCOL=dict(ns['TCOL'])
PRE=("Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering of the reference portraits; full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porcelain skin; serene gentle neutral expression, soft eyes, closed lips or faint smile; elegant, slim, clearly adult; beautiful/handsome romantic-lead looks for everyone; face clearly visible, 3/4 or frontal view.")
SM="serene gentle neutral expression, soft eyes, closed lips or faint smile"
assert SM in PRE
PRE=PRE.replace(SM,"gentle expression with soft eyes and a bright closed-lip smile, lips closed, no teeth, mouth never open")
END=" Eyes soft, warm and round-almond, never slanted or upturned, never teary. Everyone beautiful at every age. No text, no labels."
EMB7=" All flowers, birds and the phoenix are fine silk-thread embroidery stitched directly into the fabric, flat and integrated with the cloth, following its folds, not appliqué, not pasted patches, not raised."
LAD={4:"a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of {mot} at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins",
5:"a silk brocade robe richly embroidered in gold with peonies and birds, long wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins, gold earrings",
6:"a HEAVY silk brocade robe in SATURATED {main} silk, embroidered with peonies, butterflies and {mot} in {main} and gold thread along the borders, an embroidered {main} pearl-edged cape/stole over the shoulders, gold-and-jade necklace, earrings and bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels",
7:"a near-empress ceremonial robe of SATURATED {main} silk, embroidered with phoenixes and auspicious clouds in gold thread on the chest and along the borders, a jewelled cloud-collar cape edged with pearls and gold over the shoulders, strands of pearls across the chest, a jade-and-gold belt with long tassels, floor-length robe with slippers visible; tall grand chignon crowned by a LARGE ornate gold phoenix crown (grander and taller than a noble consort's headdress, only a little smaller than the Empress's) with spreading gold phoenix wings, pearl strands, kingfisher-blue inlay and many dangling gold tassels",
8:"the Empress's imperial phoenix ceremonial robe of SATURATED {main} silk, richly embroidered on the chest, shoulders and wide sleeves with large phoenixes, peonies and clouds in gold and kingfisher-blue silk thread (far denser and richer embroidery than any other rank), over it a long ceremonial {main} silk mantle falling from the shoulders to the floor, edged with a broad band of gold brocade and pearls, a wide jewelled gold-and-pearl cloud collar with layered pearl fringes over the shoulders, many long strands of pearls and jade across the chest, a jade-and-gold belt with long tassels and jade pendants, floor-length with slippers visible; the GRANDEST headdress of all: a FULL tall imperial nine-phoenix crown, clearly taller and wider than a noble consort's crown, with a large central gold phoenix holding a pearl string in its beak, jewelled wings spreading wide on both sides, kingfisher-blue inlay, rubies and pearls, and a few clean pearl tassels at the sides; the most splendid outfit of all, clearly grander than every other rank"}
RANK={4:"rank-4 consort (Tần)",5:"rank-5 consort (Phi)",6:"rank-6 noble consort (Quý phi)",7:"rank-7 imperial noble consort (Hoàng quý phi)",8:"the Empress (Hoàng hậu)"}
EMB=" All flowers and small songbirds are fine silk-thread embroidery stitched directly into the fabric, flat and integrated with the cloth, following its folds, not appliqué, not pasted patches, not raised; no phoenix, no long-tailed bird anywhere on the robe."
HAIR={1:"hair in her own hairstyle ({hs}) decorated with a few fresh flowers and several gold hairpins (trâm) with small pearl dangles",2:"hair in her own hairstyle ({hs}) decorated with more flowers and several gold and silver hairpins with long dangles",3:"hair in her own hairstyle ({hs}) decorated with a gold flower cluster, pink flowers and several hairpins with long dangles"}
YEL="the yellow exactly the warm royal golden yellow of the colour reference image (imperial gold-yellow, medium saturation), not pale cream, not beige/tan/ochre, not bright mustard or lemon"
def outfit(t,pal,mot):
    main=pal.split(" and ")[0]; acc=pal.split(" and ")[1]
    if t<=3:
        base=TIERS[t]; base=base[:base.rindex(", ")] if t==1 else base[:base.rindex(", ")] if t==2 else base[:base.rindex(", ")]
        hs=P[CUR]['face'].split("hair ",1)[1] if "hair " in P[CUR]['face'] else "neat"
        return base+", "+HAIR[t].format(hs=hs)+", "+(f"in muted simple {pal} tones" if t<=2 else f"in {pal}")
    body=LAD[t].format(mot=mot,main=main)
    if t<=6:
        col_=(f"COLOUR RULE: robe, skirt, sleeves, cape are all clearly {main} silk (her signature colour family {pal}), with large areas of plain {main} silk visible; {acc} only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe")
        if t==4: col_=f"her signature colour family {pal} stays the MAIN robe colour ({main}); the robe itself is clearly {main} silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe"
        if t==5: col_=f"her signature colour family {pal} stays the MAIN robe colour ({main}); the robe itself is clearly {main} silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe"
    elif t==7:
        col_=f"COLOUR RULE: her own colour {main} (signature family {pal}) is the MAIN colour of the robe, cape and sleeves, with yellow parts (inner robe, borders and sash) in {YEL}; gold only as thin accents; NOT an all-yellow robe"
        body=body.replace(f"SATURATED {main} silk",f"SATURATED {main} silk with yellow parts")
    else:
        col_=f"COLOUR RULE: yellow mixed with fresh colours: the robe is mainly {YEL}, mixed with fresh bright {main} and {acc} (large {main} mantle edges and sleeve borders); gold only as thin accents; NOT pale cream"
        body=body.replace(f"SATURATED {main} silk","imperial yellow silk").replace(f"long ceremonial {main} silk mantle","long ceremonial imperial yellow silk mantle lined with fresh "+main)
    return f"{body}; {col_}"
OUTH={t:"" for t in range(1,9)}
RANKTXT=lambda t: ("" if t<=3 else f"({RANK[t]}, clearly much richer and more splendid than the lower ranks) ")
ITEM={1:("a plain silk round fan with a bamboo handle","an embroidered silk handkerchief"),2:("a silk round fan with a lacquered handle and a small tassel","a small embroidered silk sachet"),3:("an embroidered silk round fan with a silk tassel","a small red-lacquered box"),4:("a round fan with a carved jade handle and jade tassel","a sandalwood folding fan with carved ribs"),5:("a round fan with a gold-inlaid handle and gem tassel","a gilded lacquer box"),6:("a white-jade ruyi (như ý)","a jewelled box"),7:("a gilded hand censer","an imperial round fan with a gold filigree frame and gems"),8:("a gold ruyi set with gems","an imperial phoenix-embroidered round fan with a gold-and-jade handle and pearl tassels")}
GEST=["the other hand lightly resting on her sash","the other hand gently lifting the edge of her sleeve near the hip","the other hand cupped beneath it","the other hand resting at her waist"]
STANCE={"hienlanh":"gentle relaxed stance, a slight turn of the body, holding {it} in one hand at chest height, {g}",
"dangi":"body half-turned gracefully, looking toward the viewer, {it} held close to her chest in both hands",
"thanhnha":"neutral elegant stance, holding {it} before her with one hand, {g}"}
P={"n01":dict(face="softly round face, warm round-almond eyes, soft thin brows, hair in two neat buns with a centre parting",pal="dusty teal and terracotta",mot="chrysanthemums",tr="hienlanh",ref="MB7TtWMDCm"),
"n02":dict(face="long slender oval face, clear gentle eyes, fine arched brows, long hair partly pinned up and partly falling over the shoulder",pal="dusty mauve and olive green",mot="magnolias",tr="dangi",ref="MB7TtTeDCm"),
"n03":dict(face="small heart-shaped face, large bright eyes, softly rounded cheeks, hair in two low side loops",pal="warm sienna brown and pale aqua",mot="lotus flowers",tr="thanhnha",ref="ovNXuIE829")}
IDK=" From the identity reference keep ONLY her face, facial features and hair colour; do NOT copy the outfit, hair ornaments or accessories of the reference, dress her in the NEW outfit below. The style reference image is only for skin, drawing style, fabric and embroidery: never copy its face, body or pose."
def prompt(n,t):
    global CUR; CUR=n
    p=P[n]; k=int(n[1:])
    it=ITEM[t][(k+t)%2]
    pose=STANCE[p['tr']].format(it=it+" in a contrasting colour, not the robe colour,",g=GEST[(k+t)%4])+", the item held below the chin, the whole face fully visible"
    s=PRE+f" An imperial consort. Her face: {p['face']}."+(IDK if t>1 else " Keep her exact face and features from the identity reference. The style reference image is only for skin, drawing style, fabric and embroidery: never copy its face, body or pose.")+" about 22, youthful adult. Outfit: "+RANKTXT(t)+outfit(t,p['pal'],p['mot'])+". Pose: "+pose+"."+(EMB7 if t>=7 else EMB)+" Every hairpin is inserted into the hair pointing upward or backward with dangles hanging down, no hairpin horizontal or sticking out to the side. Luminous smooth porcelain skin, bare clean forehead with no forehead mark and no flower mark, eyes open, floor-length robe with slippers visible, no train, no cup."+END
    return s
if __name__=="__main__":
    out={f"{n}_t{t}":prompt(n,t) for n in P for t in range(1,9)}
    json.dump(out,open('/tmp/claude-0/nf/prompts.json','w'),indent=1,ensure_ascii=False)
    print(out['n01_t1']);print();print(out['n02_t7']);print();print(out['n03_t8'])
    for k,v in out.items():
        for bad in ("cung nữ","maid","servant","train behind","trailing"): assert bad not in v.lower() ,(k,bad)

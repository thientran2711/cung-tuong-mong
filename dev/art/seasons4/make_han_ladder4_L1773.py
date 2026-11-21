import re
D='/home/user/cung-tuong-mong/dev/art/seasons4/'
def rep(t,a,b):
    assert t.count(a)==1,(a[:80],t.count(a)); return t.replace(a,b)
def sent(t,k):
    m=re.search(re.escape(k)+r".*?\.(?= [A-Z\"]|\n|$)",t,re.S); assert m,k; return m.group(0)
PHI=open(D+'han_bac_base/s62_t5_HAN_BAC_02cd263.txt').read()
SRC={1:D+'s62_t1_HAN_BAC.txt'}; SRC.update({n:D+f's62_t{n}_HAN_LADDER2_L1762.txt' for n in range(2,9)})
P,S="light clear warm plum","bright blush pink"; PK,IV="peach-blossom pink","ivory white"
CORE="open WIDE: the lapels sweep out toward the edge of the SHOULDERS and meet low at the chest in a broad V, showing her neck and collarbones fully but modestly (never narrow near the neck, never a tight high crossing)"
LAB={1:"rank-1 consort (Đáp ứng), the lowest consort rank, elegant, never poor",2:"rank-2 consort (Thường tại), a little more ornate than the lowest rank",3:"rank-3 consort (Quý nhân), richer than the ranks below",
 4:"rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks",5:"rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks",
 6:"rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks",7:"rank-7 imperial noble consort (Hoàng quý phi), clearly much richer and more splendid than the lower ranks",
 8:"the Empress (Hoàng hậu), clearly much richer and more splendid than the lower ranks"}
SLV={1:"the sleeve body plain, ending in narrow embroidered cuff bands",2:"the sleeve body plain, ending in embroidered cuff bands",3:"with embroidered cuff bands and a few small flowers on the sleeves",
 4:"ending in broad embroidered cuff bands, a few sparse small flowers on the sleeves",5:"with deep embroidered cuffs and a little more embroidery on the sleeves than the Tần",
 6:"with deep embroidered cuffs and more embroidery on the sleeves than the Phi",7:"with deep gold-embroidered cuffs and rich embroidery on the sleeves",8:"with the deepest gold-embroidered cuffs and the richest embroidery on the sleeves of all ranks"}
EMB={1:"many SMALL lilac sprays spread over the whole garment, clearly more embroidery than any palace maid (light, sparse sprays in ivory white and fine gold thread)",
 2:"many small tiger lilies spread over the whole garment, clearly more embroidery than any palace maid (a little larger than at the lowest rank, in ivory white and fine gold thread)",
 3:"many small-to-medium semi-double China roses spread over the whole garment, clearly more embroidery than any palace maid (in ivory white and fine gold thread)",
 4:"many medium-size spring flowers spread over the whole garment, clearly more embroidery than any palace maid (peach blossoms, magnolias and small swallows in flight, in gold and bright blush pink)",
 5:"many LARGE spring flowers spread over the whole garment, clearly more embroidery than any palace maid (large magnolia medallions, peach blossoms and cloud-and-swallow scrolls in gold)",
 6:"many large autumn flowers spread over the whole garment, clearly more embroidery than any palace maid (large camellia medallions and sprays of osmanthus in gold)",
 7:"many large autumn flowers spread over the whole garment, far more embroidery than any palace maid (large peonies and auspicious clouds in thick gold thread)",
 8:"the LARGEST, densest flowers of all ranks spread over the whole garment (large peonies, auspicious clouds and small gold phoenix roundels in thick gold thread)"}
BRD={1:"a narrow embroidered hem band",2:"an embroidered hem band",3:"a wide embroidered hem band",4:"a deep embroidered hem border",5:"a deep embroidered border along the whole hem and front opening",
 6:"a deep embroidered border along the whole hem and front opening",7:"a deep gold-embroidered border along the whole hem and front opening",8:"the widest gold-embroidered border along the whole hem and front opening"}
BELT={1:"a soft narrow ivory white silk sash whose two ends hang down the front; no belt plaque, no pendants",2:"an ivory white sash tied at the waist with ONE small jade disc on a silk cord; no belt plaque",
 3:"a wide ivory white silk girdle with a small carved jade pendant set on each side, linked by strings of pearls",
 4:"a WIDE stiff embroidered waist belt with a gold buckle plaque and one set of jade discs and pearl strands (zupei) on silk cords to the knee",
 5:"a broad embroidered waist sash tied in a flat knot with TWO long jade pendants on silk cords",
 6:"a WIDE stiff embroidered waist belt with a gold buckle plaque and a long set of jade discs and pearl strands (zupei) hanging to the knee",
 7:"a WIDE jade-and-gold belt with two long sets of jade discs and pearl strands (zupei) to the knee",8:"a WIDE jade-and-gold belt with two long sets of jade discs and pearl strands (zupei) to the knee"}
FR={4:"a flat pearl-and-jade bead yoke over both shoulders with a short pearl fringe",5:"a flat pearl-and-jade bead yoke over both shoulders with a longer, fuller pearl fringe of bigger pearls",
 6:"a flat pearl-and-jade bead yoke over both shoulders with a long pearl fringe and small gold tassels between the pearls",
 7:"a flat gold, pearl and jade bead yoke over both shoulders with layered pearl fringes and small jade drops",8:"the richest flat gold-and-pearl bead yoke over both shoulders with layered pearl fringes and small cabochon ruby and jade drops"}
HEAD={1:"pretty silver hairpins and a fresh flower (a lilac spray)",2:"silver and pearl hairpins and a fresh flower (a tiger lily)",3:"slim pearl hairpins and a fresh flower (a semi-double China rose)",
 4:"gold and jade hairpins with small dangling gold bu yao tassels",5:"a LARGER gold headdress with dangling gold tassels and jade pins",
 6:"a BIG ornate gold headdress with pearls, gold flowers and many gold tassels, grander than the Phi",
 7:"a tall chignon with a LARGE ornate gold phoenix crown with pearl strands and a few gold tassels, simpler than the Empress's",
 8:"a tall chignon with a LARGE ornate gold nine-phoenix crown (one central phoenix and eight small ones, the grandest of all ranks) with pearl strands and a few gold tassels"}
YEL6=" plus a clearly visible amount of royal yellow: a yellow inner robe panel, a yellow sash and narrow yellow borders in honey-gold exactly the colour of image 2 (a colour swatch only, close to hex #F2BC61), much less yellow than an imperial noble consort's robe;"
NUM={2:"TWO",3:"THREE",4:"FOUR"}; VN={2:"hai",3:"ba",4:"bốn"}
WRAP={1:"the front panel crosses the body in ONE SHORT straight diagonal and ends at the HIP, its straight edge trimmed with a narrow band",
 2:"the front panel crosses the body in ONE straight diagonal all the way to the SIDE SEAM under the arm, then falls straight to the floor",
 3:"the front panel wraps across the front and round the side to end at the BACK, its straight bordered edge running in one clean diagonal line across the skirt",
 4:"a DOUBLE-EDGED diagonal wrap: the outer panel crosses in one straight diagonal and the inner robe's embroidered border shows as a second parallel edge just beside it",
 5:"the outer panel crosses in one straight diagonal and ends in ONE neat POINTED corner tail at the hip side, its edge bordered in gold",
 6:"ONE LONG sweeping diagonal across the whole skirt from the waist down to the opposite hem, ending in a narrow softly CURVED tip",
 7:"CURVED WRAP: the outer front panel sweeps in ONE wide CURVE across the front, covering the inner layer, whose edge shows under the curve; a curved hem edge",
 8:"CURVED WRAP, the longest and grandest of all: the outer front panel sweeps in ONE wide CURVE across the front round to the back hem, covering the inner layer, whose edge shows under the curve; curved hem edge"}
def outfit(n):
    L=2; B=2 if n<=3 else (3 if n<=6 else 4)
    M,Sx,ms,ss=(PK,IV,"pink","ivory") if n<=3 else (P,S,"plum","pink")
    robes=f"a long wrapped outer robe (quju, khúc cư) in {M} reaching the floor over an inner robe in {Sx}, NOT a straight-hem robe; WRAP CUT: {WRAP[n]} (collar unchanged; no spiral or swallowtail points)"
    coll=f"the crossed collars of BOTH robes {CORE}, the {ss} inner collar showing as a wide layered edge inside the {ms} outer collar"
    bands={2:f"(outer {M} embroidered in gold, inner {Sx})",3:f"(outer {M} embroidered in gold, inner two {Sx})",4:f"(outer {M} woven in gold and edged with pearls, then royal yellow, inner two {Sx})"}[B]
    extra="" if B==2 else ", never a third robe"
    fr=f"SHOULDER FRINGE: {FR[n]}, lying outside the collar, never touching or hiding the collar; no cape, no cloud collar, no shawl;" if n>=4 else "no cape, no cloud collar, no shoulder piece, no shawl;"
    o=(f"Outfit ({LAB[n]}): a NEW outfit, a full Han-dynasty court look in TWO visible robe layers: {robes}; {coll}; very wide long sleeves (one single visible sleeve layer, every inner sleeve hidden inside) {SLV[n]}; "
       f"the robe body densely embroidered ALL OVER (not only the borders) with {EMB[n]}; {BRD[n]}; RANK BLOCK, clearly visible at game size: {NUM[B]} stacked WIDE gold-edged collar bands in the wide V {bands}{extra}, and {BELT[n]}; {fr} {HEAD[n]};"
       + (YEL6 if n==6 else "") +
       f" her signature colour family {M} and {Sx} stays the MAIN robe colour ({M}); the robe itself is clearly {M} silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe.")
    return o,B,M,Sx
DUP=re.compile(r"Full-body standing figure head to feet[^.]*\. ")
out={}
for n in range(1,9):
    src=open(SRC[n]).read(); t=DUP.sub("",PHI,1)
    o,L,M,Sx=outfit(n)
    t=rep(t,t[t.find("Outfit (rank-5"):t.find(" COLOUR RULE:")],o)
    # colour paragraph
    a=t.find("her ORIGINAL robe colour"); b=t.find(" Hair: her own",a); sa=src.find("her ORIGINAL robe colour")
    sb=src.find(" Hair: her own",sa)
    if sb<0: sb=src.find(" All flowers",sa)
    assert sa>0 and sb>sa; t=t[:a]+src[sa:sb]+t[b:]
    for k in ["Hair: her own","HAIR (rank law)","SLEEVE LENGTH (rank law)","ANGLE:","GRACE (pose variety","Pose:","HELD ITEM COLOUR"]:
        if k=="Hair: her own" and k not in src: t=rep(t,sent(t,k)+" ",""); continue
        t=rep(t,sent(t,k),sent(src,k))
    # flower / no flower
    if n<=6: t=rep(t,sent(t,"HAIR FLOWER SIZE"),sent(src,"HAIR FLOWER SIZE"))
    else: t=rep(t,sent(t,"HAIR FLOWER SIZE"),sent(src,"NO flowers in"))
    if n>=7:
        t=rep(t,sent(t,"TWO-COLOUR RULE"),sent(src,"THREE-COLOUR RULE"))
        t=rep(t,"No phoenix anywhere on the robe or in the hair: only flowers, birds, butterflies or other motifs. ","")
        t=rep(t,"All flowers, birds and butterflies are","All flowers, birds and the phoenix are")
        t=rep(t,sent(t,"SLEEVE LENGTH (rank law)"),sent(src,"SLEEVE LENGTH (rank law)")+" "+sent(src,"Even while"))
        lux=sent(src,"HOÀNG QUÝ PHI LUXURY" if n==7 else "EMPRESS LUXURY")
        t=rep(t,"Pose:",lux+" "+sent(src,"INNER LAYER")+" Pose:")
    else:
        t=rep(t,sent(t,"TWO-COLOUR RULE"),sent(src,"TWO-COLOUR RULE"))
    if n==8: t=rep(t,"yellow as clearly larger visible parts","yellow as the LARGEST yellow parts of all ranks")
    if n==7: t=t.replace("(rubies, sapphires","(cabochon rubies, sapphires")
    cap=src[src.find("CAPTION:"):].rstrip(); season=re.search(r'"(Mùa [^·]+)·',cap).group(1)
    newcap=cap[:cap.find('"')]+f'"{season}· Thiết kế thời Hán · {LAB[n].split("(")[-1].split(")")[0]} · Khúc cư đoạn, hai lớp áo, {VN[L]} dải cổ rộng"'
    t=t[:t.find("CAPTION:")]+newcap+"\n"
    t=rep(t,"a small sweet closed-lip smile, eyes fully open","a bright closed-lip smile, lips closed, no teeth, mouth never open, eyes fully open")
    if n>=7:
        t=rep(t,", clearly much richer and more splendid than the lower ranks):","):")
        t=rep(t,"very wide long sleeves (one single visible sleeve layer, every inner sleeve hidden inside)","very wide long sleeves")
        t=rep(t,"RANK BLOCK, clearly visible at game size: ","")
        t=rep(t,", lying outside the collar, never touching or hiding the collar;",", outside the collar;")
        t=rep(t,"(wide yellow borders along the front opening, sleeves and hem, a wide yellow sash, a broad yellow collar and a wide inner panel of the robe, well visible at game size)","(the yellow collar band, wide yellow borders and a wide yellow sash, well visible at game size)")
        t=rep(t,sent(t,"GRACE (pose variety")+" ","")
        t=rep(t,"): a NEW outfit, a full","): a full")
        m=re.search(r" her signature colour family [^.]*\.",t); t=rep(t,m.group(0),"")
    if n>=6:   # L1772/L1773 trims to fit 10 000 (boilerplate only, store sentences kept)
        t=rep(t,"Both eyes look straight at the viewer together: the two irises centred in the eyes and perfectly aligned at the same height, never cross-eyed, never wall-eyed, never looking in two directions.","Both eyes look straight at the viewer, irises centred and aligned, never cross-eyed or wall-eyed.")
        t=rep(t,"Everyone beautiful at every age. ","")
        t=t.replace(" gaze to the viewer,","",1)
    if n>=7:
        t=rep(t,", NOT a straight-hem robe;",";")
        t=rep(t,"(quju, khúc cư)","(quju)")
        t=rep(t,", well visible at game size)",")")
        t=rep(t,"INNER LAYER EMBROIDERED (t7/t8)","INNER LAYER EMBROIDERED")
        t=rep(t,"THREE-COLOUR RULE (t7/t8)","THREE-COLOUR RULE")
        if n==8: t=rep(t,"An imperial consort. ","")
    if n==6:
        t=rep(t,"RANK BLOCK, clearly visible at game size: ","")
        t=rep(t,"): a NEW outfit, a full","): a full")
    f=D+f's62_t{n}_HAN_LADDER4_L1773.txt'; open(f,'w').write(t); out[n]=len(t)
print(out)

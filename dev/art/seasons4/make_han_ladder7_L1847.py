# LADDER7 (owner L1847 via #24): = LADDER5 files with ONLY collar / collar-band / shoulder-yoke words changed
# (+ t8 colour-distribution words). Hair, pose, angle, held item, crown, captions byte-identical to LADDER5/6.
# Cause found (sheet han_ladder6_t2_t8_L1832): Phi CqnIKlAEEy = same collar words as t2/t8; its wide flat
# shoulder-to-shoulder neckline came from the yoke lying ON the collar line. t1-t3 have no yoke and LADDER6
# pushed the t4-t8 yoke off the collar -> plain diagonal V. Fix: write the SHAPE itself + bold equal bands.
D='/home/user/cung-tuong-mong/dev/art/seasons4/'
def rep(t,a,b):
    assert t.count(a)==1,(a[:80],t.count(a)); return t.replace(a,b)
CORE5="open WIDE: the lapels sweep out toward the edge of the SHOULDERS and meet low at the chest in a broad V, showing her neck and collarbones fully but modestly (never narrow near the neck, never a tight high crossing)"
CORE7=("open WIDE: the opening runs almost straight across the tops of both shoulders to the shoulder points, the bands lying flat "
       "ON the shoulders, then drops in one wide V meeting low at the chest, showing her neck and collarbones fully but modestly "
       "(never narrow near the neck, never a tight high crossing)")
BAND5="THREE stacked WIDE gold-edged collar bands in the wide V ("
BAND7="THREE BOLD flat collar bands of EQUAL width side by side, each two fingers wide and gold-edged, unbroken from the neck over each shoulder down to the V, never thin, never two ("
T78=[("not pale cream, not beige/tan/ochre, not heavy mustard, not lemon","not cream, beige, ochre, mustard or lemon"),
     (" INNER LAYER EMBROIDERED: the inner robe and skirt are ALSO embroidered, more sparsely.",""),
     (" (medium depth, 18K gold tone)",""),(" (honey-gold like #EFBD69)","")]
for n in range(1,9):
    t=open(D+f's62_t{n}_HAN_LADDER5_L1794.txt').read()
    t=rep(t,CORE5,CORE7)
    t=rep(t,BAND5,BAND7)
    # t4-t7 yoke = Phi's own words (they drew the Phi look); t8 yoke small and quiet (owner L1794/L1847)
    if n==8:
        t=rep(t,"the richest flat gold-and-pearl bead yoke over both shoulders with a long fringe of small pearls and tiny jade drops, lying outside the collar, never touching or hiding the collar;",
                "a small flat gold-and-pearl bead yoke along the outer edge of the bands with a very short pearl fringe, never covering the bands;")
        t=rep(t,"her plum is the second colour (inner robe, collar edge, wide borders)",
                "her plum is the clear second colour in LARGE areas (inner robe, skirt front, wide plum collar band, borders)")
        t=rep(t,"the plum inner collar showing as a wide layered edge inside the yellow outer collar","the plum inner collar showing inside the yellow outer collar")
    if n==7: t=rep(t,'the pink inner collar showing as a wide layered edge inside the plum outer collar','the pink inner collar showing inside the plum outer collar')
    if n in (7,8):
        for a,b in T78: t=rep(t,a,b)
    open(D+f's62_t{n}_HAN_LADDER7_L1847.txt','w').write(t)

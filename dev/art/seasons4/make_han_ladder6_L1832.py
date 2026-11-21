# LADDER6 (owner L1831/L1832): = LADDER5 files with ONLY collar / collar-band / shoulder-yoke words changed
# (+ t8 colour-distribution words). Hair, pose, angle, held item, crown, captions untouched (byte-identical).
D='/home/user/cung-tuong-mong/dev/art/seasons4/'
def rep(t,a,b):
    assert t.count(a)==1,(a[:80],t.count(a)); return t.replace(a,b)
T78=[("not pale cream, not beige/tan/ochre, not heavy mustard, not lemon","not cream, beige, ochre, mustard or lemon"),(" INNER LAYER EMBROIDERED: the inner robe and skirt are ALSO embroidered, more sparsely.",""),(" (medium depth, 18K gold tone)",""),(" (honey-gold like #EFBD69)","")]
TRIM={7:T78,8:T78+[("the plum inner collar showing as a wide layered edge inside the yellow outer collar","the plum inner collar showing inside the yellow outer collar")]}
for n in range(1,9):
    t=open(D+f's62_t{n}_HAN_LADDER5_L1794.txt').read()
    # 1. wide flat V like Phi
    t=rep(t,"the lapels sweep out toward the edge of the SHOULDERS and meet low at the chest in a broad V",
            "the lapels lie FLAT over the tops of the shoulders out to their edge and meet low at the chest in one broad, shallow V")
    # 2. three bands clearly separate and unbroken
    t=rep(t,"THREE stacked WIDE gold-edged collar bands in the wide V (",
            "THREE WIDE flat collar bands side by side, each gold-edged, all three running unbroken over both shoulders to the V, three clearly separate stripes, never two (")
    # 3. yoke outside/below the bands (t4+); t8 smaller (owner L1794 smaller jewellery)
    if n>=4:
        if n==8:
            t=rep(t,"the richest flat gold-and-pearl bead yoke over both shoulders with a long fringe","a narrow flat gold-and-pearl bead yoke over both shoulders with a short fringe")
        t=rep(t," bead yoke over both shoulders with"," bead yoke on the outer shoulders only, OUTSIDE and below the three bands, with")
        t=rep(t,", lying outside the collar, never touching or hiding the collar;",", never covering any collar band;")
    if n==8:
        t=rep(t,"her plum is the second colour (inner robe, collar edge, wide borders)",
                "her plum is the clear second colour in LARGE calm areas (inner robe and skirt front, plum collar band, wide borders)")
    for a,b in TRIM.get(n,[]): t=rep(t,a,b)
    open(D+f's62_t{n}_HAN_LADDER6_L1832.txt','w').write(t); print(n,len(t))

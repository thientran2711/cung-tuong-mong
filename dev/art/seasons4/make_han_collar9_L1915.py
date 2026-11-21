# Owner L1915 (via Foreman C #26): roll the approved L1893 collar (aFGoe7afSh, frozen in HAN_COLLAR_L1915_FROZEN.txt) out to t1–t8.
# t5 = s62_t5_HAN_PHISIMPLE_L1893.txt; other ranks = their LADDER7 file (own rank words, G57) with the collar swapped.
# Innermost band = ivory white (L1915 test). Shoulder yoke removed. Tiny collar ornament grows one small step per rank.
import re
D='/home/user/cung-tuong-mong/dev/art/seasons4/'
def rep(t,a,b):
    assert t.count(a)==1,(a[:80],t.count(a)); return t.replace(a,b)
def rex(t,pat,b):
    m=list(re.finditer(pat,t,re.S)); assert len(m)==1,(pat,len(m)); return t[:m[0].start()]+b+t[m[0].end():]
F=open(D+'HAN_COLLAR_L1915_FROZEN.txt').read().splitlines()
EARLY=F[F.index('EARLY (right after the daylight sentence):')+1]
CLAUSE=F[F.index('COLLAR CLAUSE (in the outfit):')+1]
PK,IV,P,S,Y="peach-blossom pink","ivory white","light clear warm plum","bright blush pink","royal golden yellow"
MS={1:(PK,IV),2:(PK,IV),3:(PK,IV),4:(P,S),5:(P,S),6:(P,S),7:(P,S),8:(Y,P)}
TINY=", all tiny and flat, never bulky"
ORN={1:"",
 2:", a fine gold thread line on the outer band"+TINY,
 3:", a fine gold thread line and tiny embroidered flower dots on the outer band"+TINY,
 4:", a single row of tiny seed pearls on the outer edge"+TINY,
 5:", tiny seed pearls on the outer edge and small gold flowers on the outer band"+TINY,
 6:", tiny seed pearls on the outer edge, small gold flowers on the outer band and one tiny jade bead at the V"+TINY,
 7:", tiny seed pearls on the outer and middle bands, fine gold embroidery on the outer band and one tiny jade bead at the V"+TINY,
 8:", seed pearls on the outer and middle bands, tiny gold phoenixes on the outer band and a small flat gold clasp at the V"+TINY}
# extra duplicate trims per rank to fit 10 000 (each tested with check_store: no new FAIL)
XTR={3:[" her signature colour family peach-blossom pink and ivory white stays the MAIN robe colour (peach-blossom pink); the robe itself is clearly peach-blossom pink silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe."],
     6:["RANK BLOCK, clearly visible at game size: "],
     8:["RANK BLOCK, clearly visible at game size: ","collar unchanged; ",("(inner robe, skirt front, wide plum collar band, borders)","(inner robe, skirt front, borders)")]}
for n in range(1,9):
    M,Sx=MS[n]
    BAND=f"THREE stacked WIDE gold-edged collar bands in the wide V (outer {M} embroidered in gold, middle {Sx}, innermost ivory white){ORN[n]}"
    if n==5:
        t=open(D+'s62_t5_HAN_PHISIMPLE_L1893.txt').read()
        assert EARLY in t and CLAUSE in t
        t=rex(t,r"THREE stacked WIDE gold-edged collar bands in the wide V \([^)]*\)",BAND)
    else:
        t=open(D+f's62_t{n}_HAN_LADDER7_L1847.txt').read()
        t=rep(t,"no yellow, golden or sepia colour cast.","no yellow, golden or sepia colour cast. "+EARLY)
        t=rex(t,r"the crossed collars of BOTH robes open WIDE: the opening runs.*?never a tight high crossing\)",CLAUSE)
        t=rex(t,r"THREE BOLD flat collar bands of EQUAL width.*?never two \([^)]*\)",BAND)
        if n>=4: t=rex(t,r" SHOULDER FRINGE:[^;]*;","")
    # trims to fit 10 000 (duplicates only; never the frozen collar words, hair, pose, angle, item, crown)
    TR=[(r", the [a-z]+ inner collar showing (as a wide layered edge )?inside the [a-z]+ outer collar",""),
        (r" \(one single visible sleeve layer, every inner sleeve hidden inside\)",""),
        (r" Everyone beautiful at every age\.","")]
    for pat,b in TR:
        if len(t)>9800 and n!=5: t=re.sub(pat,b,t,count=1)
    for x in XTR.get(n,[]):
        a,b=(x,"") if isinstance(x,str) else x
        t=rep(t,a,b)
    open(D+f's62_t{n}_HAN_COLLAR_L1915.txt','w').write(t)

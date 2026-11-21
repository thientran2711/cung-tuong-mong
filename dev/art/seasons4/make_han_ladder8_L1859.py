# LADDER8 (owner L1859 via Foreman C #25): re-think the Hán silhouette from real Han quju (garment words only, A47).
# Built from LADDER7 files (G57 no pendants kept). Hair, pose, angle, held item, crown, captions byte-identical.
# Owner L1859 bands: OUTER = main colour (outer robe), MIDDLE = secondary (lining layer), INNERMOST = WHITE (inner garment).
import re
D='/home/user/cung-tuong-mong/dev/art/seasons4/'
def rep(t,a,b):
    assert t.count(a)==1,(a[:80],t.count(a)); return t.replace(a,b)
def rex(t,pat,b):
    m=list(re.finditer(pat,t,re.S)); assert len(m)==1,(pat,len(m)); return t[:m[0].start()]+b+t[m[0].end():]
PK,IV,P,S,Y="peach-blossom pink","ivory white","light clear warm plum","bright blush pink","royal golden yellow"
MS={1:(PK,IV),2:(PK,IV),3:(PK,IV),4:(P,S),5:(P,S),6:(P,S),7:(P,S),8:(Y,P)}
TURN={1:"ONE spiral turn",2:"ONE spiral turn",3:"TWO spiral turns",4:"TWO spiral turns",5:"TWO spiral turns",
      6:"THREE spiral turns",7:"THREE spiral turns",8:"THREE full spiral turns, the grandest"}
for n in range(1,9):
    t=open(D+f's62_t{n}_HAN_LADDER7_L1847.txt').read()
    M,Sx=MS[n]
    m=re.search(r"in ([a-z -]+) reaching the floor over an inner robe in ([a-z -]+?)[;,]",t); OM,IM=m.group(1),m.group(2)
    # 1. silhouette: narrow close-fitting spiral-wrapped quju with wide edge bands, trumpet hem
    t=rex(t,r"a long wrapped outer robe \(quju(, khúc cư)?\) in .*?no spiral or swallowtail points\)",
          f"a long NARROW Han-dynasty wrapped robe (quju, khúc cư) in {OM} over an inner robe in {IM}: a SLIM close-fitting body that follows her figure, "
          f"the front panel WRAPPING round her body in {TURN[n]}, each turn a wide {Sx} edge band winding diagonally round the hips and thighs, "
          f"the hem flaring softly at the floor like a trumpet; every edge (collar, cuffs, wrap edge, hem) bordered with a wide {Sx} band; never loose or boxy, no swallowtail points")
    # 2. Han crossed collar, layered, not off the shoulders
    t=rex(t,r"the crossed collars of BOTH robes open WIDE:.*?outer collar",
          "the CROSSED COLLAR (right side over left) lies close round the neck and dips in a clear V to the middle of the chest, showing her neck and collarbones fully but modestly, never off the shoulders")
    # 3. three layered bands main / secondary / white (owner L1859)
    t=rex(t,r"THREE BOLD flat collar bands.*?never a third robe,",
          f"THREE stacked WIDE layered collar bands, each clearly visible as its own separate stripe with a thin gold line between them: "
          f"outer {M} (the outer robe, embroidered in gold), middle {Sx} (the lining layer), innermost pure WHITE (the white under-robe collar, the only white), never two,")
    # 4. no bead yoke over the collar (not Han; hid the bands)
    if n>=4: t=rex(t,r" SHOULDER FRINGE:[^;]*;","")
    # 5. colour rule: white innermost collar allowed
    if n>=7: t=rep(t,"no other colour","no other colour except the white innermost collar band")
    open(D+f's62_t{n}_HAN_LADDER8_L1859.txt','w').write(t)

import sys,os
D='/home/user/cung-tuong-mong/dev/art/seasons4/'
TOP="OPEN-NECK LOOK: collar wide OFF the neck: bare neck, collarbones and upper chest. "
def OPEN(inner):
    return ("the collar is worn OPEN, pulled wide OFF the neck: its two edges start at the OUTER shoulder points "
            "and run straight down to cross only LOW at the sash; between them BARE SKIN: the whole neck, both collarbones "
            "and the upper chest to mid-chest (modest, no cleavage, shoulders covered); "+inner+" all collar bands lie flat only along those edges, leaving the skin open")
def OPEN2(bands):
    return ("the collar is worn OPEN, wide OFF the neck: its edges run straight from the OUTER shoulder points "
            "to cross LOW at the sash, BARE SKIN between them: the whole neck, both collarbones and the upper chest to mid-chest "
            "(modest, no cleavage, shoulders covered); inner collars and "+bands+" lie flat only along those edges, leaving the skin open, no horizontal inner top")
INNER1="the pink inner collar lies flat just inside those edges, never a straight horizontal inner top or band across the chest;"
INNERN="inner collars lie flat just inside those edges, never a horizontal inner top;"
J={
 4:('s62_t4_HAN_BAC_gon2.txt',[
   ("in bright blush pink; the crossed collars of BOTH robes open WIDE: the lapels sweep out toward the edge of the SHOULDERS and meet low at the chest in a broad V, showing her neck and collarbones fully but modestly (never narrow near the neck, never a tight high crossing), the pink inner collar showing as a wide layered edge inside the plum outer collar, never a straight horizontal inner top or band across the chest;",
    "in bright blush pink; "+OPEN(INNER1)+";"),
   ("THREE stacked WIDE collar bands following the wide V out to the shoulders","THREE stacked NARROW flat collar bands along the two outer edges"),
   ("; nothing at the throat; her neck, collarbones and the wide V neckline are fully visible, never covered by it;",";"),
 ]),
 5:('s62_t5_HAN_BAC_gon.txt',[
   ("in bright blush pink; the crossed collars of BOTH robes open WIDE: the lapels sweep out toward the edge of the SHOULDERS and meet low at the chest in a broad V, showing her neck and collarbones fully but modestly (never narrow near the neck, never a tight high crossing), the pink inner collar showing as a wide layered edge inside the plum outer collar;",
    "in bright blush pink; "+OPEN(INNER1)+";"),
   ("THREE stacked WIDE gold-edged collar bands in the wide V","THREE stacked NARROW gold-edged collar bands along the two outer edges"),
   ("; nothing at the throat; her neck, collarbones and the wide V neckline are fully visible, never covered by the bands;",";"),
 ]),
 6:('s62_t6_HAN_BAC_gon3.txt',[
   ("the crossed collars of ALL three robes open WIDE: the lapels reach the very edge of the SHOULDERS and meet LOW near the sash in a broad deep V like the Phi's; every inner robe is ALSO a crossed-collar robe whose collar is a V nested inside it, so the open chest shows only nested V collar lines down to the sash, the pink inner collar a wide edge inside:",
    OPEN2("FOUR NARROW collar bands")+":"),
   ("RANK BLOCK: FOUR stacked WIDE collar bands along the V (outermost a narrow royal golden yellow band), ","RANK BLOCK: the four collar bands (outermost a narrow royal golden yellow band), "),
   (", nothing at the throat; her neck, collarbones and the wide V neckline are fully visible, never covered by the cloud collar;",";"),
 ]),
 7:('s62_t7_HAN_BAC_gon3.txt',[
   ("all collars WIDE to the shoulders: the lapels reach the very edge of the SHOULDERS and meet LOW near the sash in a broad deep V like the Phi's; every inner robe is ALSO a crossed-collar robe whose collar is a V nested inside it, so the open chest shows only nested V collar lines down to the sash;",
    OPEN2("FIVE NARROW gold collar bands")+";"),
   ("; FIVE stacked WIDE gold collar bands along the V;",";"),
   (", nothing at the throat, with strands of pearls hanging DOWN from the V point; her neck, collarbones and the wide V neckline are fully visible, never covered by the collar;",", with strands of pearls hanging DOWN from the V point;"),
 ]),
 8:('s62_t8_HAN_BAC_gon3.txt',[
   ("all collars WIDE to the shoulders, soft and draping like the Hoàng quý phi's, never stiff: the lapels reach the very edge of the SHOULDERS and meet LOW near the sash in a broad deep V like the Phi's; every inner robe is ALSO a crossed-collar robe whose collar is a V nested inside it, so the open chest shows only nested V collar lines down to the sash;",
    "all collars soft and draping like the Hoàng quý phi's, never stiff: "+OPEN2("SIX NARROW gold collar bands")+";"),
   ("; SIX stacked WIDE gold collar bands along the V;",";"),
      (", nothing at the throat; her neck, collarbones and the wide V neckline are fully visible, never covered by the collar;",";"),
 ]),
}
HT=("; her head turns together with her shoulders and body. ",". ")
SL=(" The wide sleeves and robe hang and fold naturally under their own weight, with natural creases, never stiff, flat or board-like."," ")
TRIM={4:[SL],5:[SL],
 6:[],7:[],8:[]}
for t,(f,reps) in J.items():
    s=open(D+f).read()
    for a,b in reps+TRIM.get(t,[]):
        assert s.count(a)==1,(t,a[:60],s.count(a)); s=s.replace(a,b)
    s=TOP+s
    out=D+'s62_t%d_HAN_BAC_open.txt'%t
    open(out,'w').write(s); print(t,len(s))
# move the OPEN statement to the very start of the Outfit block
import re
for t in J:
    p=D+'s62_t%d_HAN_BAC_open.txt'%t; s=open(p).read()
    a=s.index('the collar is worn OPEN'); b=s.index('leaving the skin open',a)+len('leaving the skin open')
    if s[b:b+len(', no horizontal inner top')]==', no horizontal inner top': b+=len(', no horizontal inner top')
    elif s[b:b+len(', never a horizontal inner top')]==', never a horizontal inner top': b+=len(', never a horizontal inner top')
    seg=s[a:b]
    # drop the segment plus the separator before it ("; " or ", " or ": ") and keep the following punctuation
    pre=s[:a].rstrip(); post=s[b:]
    K="all collars soft and draping like the Hoàng quý phi's, never stiff:"
    if pre.endswith(K): pre=pre[:-len(K)].rstrip(); seg=K+' '+seg
    if pre.endswith(','): pre=pre[:-1]+';'  # t7/t8 "streamers), the collar" -> "streamers);"
    if t in (4,5): pre=pre  # "pink; " stays
    s2=pre+post
    # clean double separators
    s2=s2.replace(';;',';').replace('; ;',';').replace(';:',':').replace(':;',';')
    h=re.search(r'Outfit \((?:[^()]|\([^()]*\))*\): ',s2); assert h,t
    s2=s2[:h.end()]+seg[0].upper()+seg[1:]+'. '+s2[h.end()][0].upper()+s2[h.end()+1:] if False else s2[:h.end()]+seg+'; '+s2[h.end():]
    s2=s2.replace("never stiff: the collar is worn OPEN, wide","never stiff, worn OPEN, wide")
    open(p,'w').write(s2); print(t,len(s2))

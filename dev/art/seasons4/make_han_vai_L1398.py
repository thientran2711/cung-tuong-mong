# DESIGN10 (owner Lượt 1398, Foreman C #7): Hán t4-t8 = horizontal opaque inner top ALLOWED + outer crossed collar STARTS AT THE SHOULDERS.
# Base = pre-open files (A39): t4 _gon2, t5 _gon, t6/t7/t8 _gon3. Only collar words change.
D='/home/user/cung-tuong-mong/dev/art/seasons4/'
def VAI(band,coll="the plum outer crossed collar STARTS AT THE SHOULDERS: its two edges begin",tail=";"):
    return ("COLLAR FROM THE SHOULDERS: a real opaque pink inner top with a "
            "HORIZONTAL neckline across the upper chest, edged by "+band+", covers the whole chest; "+coll+
            " at the OUTER shoulder points, never at the neck, and cross LOW at the sash; "
            "neck and collarbones visible above it; no cleavage, no sheer chest layer"+tail)
CC="the crossed collars begin"
CC6="the crossed collars START AT THE SHOULDERS: their edges begin"
YB="a broad royal yellow pearl-edged band"
J={
 4:('s62_t4_HAN_BAC_gon2.txt',[
   ("the crossed collars of BOTH robes open WIDE: the lapels sweep out toward the edge of the SHOULDERS and meet low at the chest in a broad V, showing her neck and collarbones fully but modestly (never narrow near the neck, never a tight high crossing), the pink inner collar showing as a wide layered edge inside the plum outer collar, never a straight horizontal inner top or band across the chest;",
    VAI("a flat gold-embroidered plum band")),
   ("THREE stacked WIDE collar bands following the wide V out to the shoulders","THREE stacked WIDE collar bands along the outer collar edges from the shoulders"),
   ("ALONG the two sloping V collar edges from the shoulders down to the chest, never a horizontal band across the chest,","ALONG the two outer collar edges from the shoulders down to the sash, never on the inner top's neckline,"),
   ("; nothing at the throat; her neck, collarbones and the wide V neckline are fully visible, never covered by it;","; nothing at the throat;"),
 ]),
 5:('s62_t5_HAN_BAC_gon.txt',[
   ("the crossed collars of BOTH robes open WIDE: the lapels sweep out toward the edge of the SHOULDERS and meet low at the chest in a broad V, showing her neck and collarbones fully but modestly (never narrow near the neck, never a tight high crossing), the pink inner collar showing as a wide layered edge inside the plum outer collar;",
    VAI("a flat gold-embroidered plum band")),
   ("THREE stacked WIDE gold-edged collar bands in the wide V","THREE stacked WIDE gold-edged collar bands along the outer collar edges"),
   ("sewn flat along the collar, following the wide V out to the shoulders,","sewn flat along the outer collar edges from the shoulders,"),
   ("; nothing at the throat; her neck, collarbones and the wide V neckline are fully visible, never covered by the bands;","; nothing at the throat;"),
 ]),
 6:('s62_t6_HAN_BAC_gon3.txt',[
   ("the crossed collars of ALL three robes open WIDE: the lapels reach the very edge of the SHOULDERS and meet LOW near the sash in a broad deep V like the Phi's; every inner robe is ALSO a crossed-collar robe whose collar is a V nested inside it, so the open chest shows only nested V collar lines down to the sash, the pink inner collar a wide edge inside:",
    VAI("a flat royal yellow band",CC,":")),
   ("FOUR stacked WIDE collar bands along the V (","FOUR stacked WIDE collar bands along the collar edges ("),
   ("at the front its ends slope DOWN along the V edges, no fringe across the chest","at the front its ends slope DOWN along the collar edges, no fringe across the chest"),
   (", nothing at the throat; her neck, collarbones and the wide V neckline are fully visible, never covered by the cloud collar;",", nothing at the throat;"),
   ("a yellow inner collar nested in the V,","the yellow band edging the inner top,"),
 ]),
 7:('s62_t7_HAN_BAC_gon3.txt',[
   ("all collars WIDE to the shoulders: the lapels reach the very edge of the SHOULDERS and meet LOW near the sash in a broad deep V like the Phi's; every inner robe is ALSO a crossed-collar robe whose collar is a V nested inside it, so the open chest shows only nested V collar lines down to the sash;",
    VAI(YB,CC)),
   ("; FIVE stacked WIDE gold collar bands along the V;","; FIVE stacked WIDE gold bands along the collar edges;"),
   ("at the front its ends slope DOWN along the V edges, no fringe across the chest","at the front its ends slope DOWN along the collars, no fringe across the chest"),
   ("; her neck, collarbones and the wide V neckline are fully visible, never covered by the collar;",";"),
 ]),
 8:('s62_t8_HAN_BAC_gon3.txt',[
   ("all collars WIDE to the shoulders, soft and draping like the Hoàng quý phi's, never stiff: the lapels reach the very edge of the SHOULDERS and meet LOW near the sash in a broad deep V like the Phi's; every inner robe is ALSO a crossed-collar robe whose collar is a V nested inside it, so the open chest shows only nested V collar lines down to the sash;",
    "all collars soft and draping like the Hoàng quý phi's, never stiff; "+VAI(YB,CC)),
   ("; SIX stacked WIDE gold collar bands along the V;","; SIX stacked WIDE gold bands along the collar edges;"),
   ("at the front its ends slope DOWN along the V edges, no fringe across the chest","at the front its ends slope DOWN along the collars, no fringe across the chest"),
   ("; her neck, collarbones and the wide V neckline are fully visible, never covered by the collar;",";"),
 ]),
}
for t,(f,reps) in J.items():
    s=open(D+f).read()
    for a,b in reps:
        assert s.count(a)==1,(t,a[:60],s.count(a)); s=s.replace(a,b)
    open(D+'s62_t%d_HAN_BAC_vai.txt'%t,'w').write(s); print(t,len(s))
# Stage 2 — owner Lượt 1399 (via C #7): khúc cư (quju) by rank: t5 SHORT wrap exactly like the Tần, t6 LONG spiral wrap
# replacing the straight-hem zhiju, t7/t8 keep a long spiral quju under their layers. Only hem words change.
H={
 5:[(" The wide sleeves and robe hang and fold naturally under their own weight, with natural creases, never stiff, flat or board-like."," "),
    ("a long curved-hem wrapped outer robe (quju, khúc cư) in light clear warm plum reaching the floor, its front panel wound in a curved spiral around the body from the waist down to the hem,",
     "a long floor-length wrapped outer robe (quju, khúc cư) in light clear warm plum, its front panel wraps across ONCE to the side and ends in a smooth, softly curved hem edge (a short simple wrap exactly like the Tần's, never a long spiral, never petal panels, never swallowtail points),"),
    ("along the whole spiral wrap edge and hem","along the whole curved wrap edge and hem"),
    ("Phi · Khúc cư đoạn, hai lớp áo cổ rộng","Phi · Khúc cư vạt ngắn, hai lớp áo cổ từ vai")],
 6:[("THREE visible straight-hem robes (trực cư, zhiju),","THREE visible robes, the middle one a LONG-wrap quju (khúc cư), its front panel wound SEVERAL times in a long spiral round the body to the floor;"),
    ("the three level hems stepped at the floor;","the spiral wrap edges under the open outer robe;"),
    ("the three stepped straight hems,","the long spiral quju wrap,"),
    ("Quý phi · Trực cư gấm ba lớp","Quý phi · Khúc cư vạt dài gấm ba lớp")],
 7:[("the light clear warm plum zhiju","the light clear warm plum long-spiral quju (khúc cư)"),
    ("a wide inner collar nested in the V,","a wide yellow inner-top band,")],
 8:[("the light clear warm plum zhiju","the light clear warm plum longest-spiral quju (khúc cư)")],
}
for t,reps in H.items():
    p=D+'s62_t%d_HAN_BAC_vai.txt'%t; s=open(p).read()
    for a,b in reps:
        assert s.count(a)==1,(t,a[:60],s.count(a)); s=s.replace(a,b)
    open(p,'w').write(s); print('L1399',t,len(s))

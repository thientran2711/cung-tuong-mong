# DESIGN10 open2 (owner Lượt 1406 via Foreman C #8): base = the _open prompts (DESIGN9 af01373).
# Add ONE plain sentence: an opaque inner layer in the person's 2nd colour slot under the open collar (no bare chest / cleavage),
# its neckline left natural. Drop only the bare-skin words that contradict it. Hem = khúc cư by rank as in 3a80455 (owner Lượt 1399).
D='/home/user/cung-tuong-mong/dev/art/seasons4/'
INNER="an opaque bright blush pink inner layer over the chest (no bare chest, no cleavage, shoulders covered), its neckline left natural;"
TOP=("OPEN-NECK LOOK: collar wide OFF the neck: bare neck, collarbones and upper chest. ","OPEN-NECK LOOK: collar wide OFF the neck: bare neck and collarbones. ")
BS1=("between them BARE SKIN: the whole neck, both collarbones and the upper chest to mid-chest (modest, no cleavage, shoulders covered);",
     "between them "+INNER)
BS2=("BARE SKIN between them: the whole neck, both collarbones and the upper chest to mid-chest (modest, no cleavage, shoulders covered);",
     "between them "+INNER)
J={
 4:[TOP,BS1,
    ("the pink inner collar lies flat just inside those edges, never a straight horizontal inner top or band across the chest;","the inner collar lies flat just inside those edges;"),
    ("all collar bands lie flat only along those edges, leaving the skin open;","all collar bands lie flat only along those edges;")],
 5:[TOP,BS1,
    ("the pink inner collar lies flat just inside those edges, never a straight horizontal inner top or band across the chest;","the inner collar lies flat just inside those edges;"),
    ("all collar bands lie flat only along those edges, leaving the skin open;","all collar bands lie flat only along those edges;"),
    ("a long curved-hem wrapped outer robe (quju, khúc cư) in light clear warm plum reaching the floor, its front panel wound in a curved spiral around the body from the waist down to the hem,",
     "a long floor-length wrapped outer robe (quju, khúc cư) in light clear warm plum, its front panel wraps across ONCE to the side and ends in a smooth, softly curved hem edge (a short simple wrap like the Tần's, never a long spiral, never petal panels, never swallowtail points),"),
    ("along the whole spiral wrap edge and hem","along the whole curved wrap edge and hem"),
    ("Phi · Khúc cư đoạn,","Phi · Khúc cư vạt ngắn,")],
 6:[TOP,BS2,
    ("lie flat only along those edges, leaving the skin open, no horizontal inner top;","lie flat only along those edges;"),
    ("THREE visible straight-hem robes (trực cư, zhiju):","THREE visible robes, the middle one a LONG-wrap quju (khúc cư), its front panel wound SEVERAL times in a long spiral round the body to the floor:"),
    ("the three level hems stepped at the floor;","the spiral wrap edges under the open outer robe;"),
    ("the three stepped straight hems,","the long spiral quju wrap,"),
    ("Quý phi · Trực cư gấm ba lớp","Quý phi · Khúc cư vạt dài gấm ba lớp")],
 7:[TOP,BS2,
    ("lie flat only along those edges, leaving the skin open, no horizontal inner top;","lie flat only along those edges;"),
    ("the light clear warm plum zhiju","the light clear warm plum long-spiral quju (khúc cư)")],
 8:[TOP,BS2,
    ("lie flat only along those edges, leaving the skin open, no horizontal inner top;","lie flat only along those edges;"),
    ("the light clear warm plum zhiju","the light clear warm plum longest-spiral quju (khúc cư)")],
}
for t,reps in J.items():
    s=open(D+'s62_t%d_HAN_BAC_open.txt'%t).read()
    for a,b in reps:
        assert s.count(a)==1,(t,a[:60],s.count(a)); s=s.replace(a,b)
    open(D+'s62_t%d_HAN_BAC_open2.txt'%t,'w').write(s); print(t,len(s.strip()))

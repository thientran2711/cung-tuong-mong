#!/usr/bin/env python3
"""ONE builder for every rank prompt of every person (owner HARD LAW Lượt 371/373, 19/11: copy the STORE prompt word for word;
only SLOT words may change; later owner laws are ADDED as extra sentences, never replace a store sentence).

STORE = dev/art/t8-prompt-B/build.py, run VERBATIM through its own CLI pipeline (--low 1..6 = t1-t6, --t7 = Hoàng quý phi, default = Hoàng hậu t8,
with --spec5pose, K3 background sentence, angle law, ref renumbering: exactly what `build.py ... --spec5pose` prints). It is exec'd in-process; for the
3 foreign princesses (ids p01 bt = Ba Tư, p02 cl = Cao Ly, p03 pt = Phù Tang) ONLY their slot rows (palette, hex, motif, hair flower) are put into the store's
own per-person tables, exactly how the store itself adds the maids m01-m52. People: c01-c32, m01-m52 (store tables), p01-p03.

SLOTS that change (all inside the store's own slots): face words (m*/princess: from INDEX_m.md / 'exactly as in her reference'), colours + hex, embroidery motif, held item,
hair flower, age. Everything else = store text byte for byte.
ADDED SENTENCES (inserted as ONE block right before ' Pose:', never replacing anything), each = one owner law:
  HAIR by rank (Lượt 337) · SLEEVE LENGTH by rank (Lượt 355) · ONE SLEEVE LAYER (331/353) · HAIR FLOWER SIZE t1-t6 / NO flower t7-t8 (323/331) ·
  HEAD turns with BODY (326) · prompt-B FABRIC at t7/t8 (364) · princess: foreign-princess sentence + ONE national-touch sentence at EVERY rank t1-t8 (371), veil law Ba Tư (329/346).
CHECK (check_all): for every person x rank, F minus the added sentences == STORE output (+ face slot) exactly; every frame sentence shared by the store outputs of c06 and c25
at that rank is present in F; every law sentence present. Any miss -> prints FAIL and exits 1.

Usage:  build_all.py PERSON RANK [--age a18|a26|a36|a51|a65]     (PERSON c01..c32 m01..m52 p01..p03|bt|cl|pt ; RANK 1..8)
        build_all.py --check [--age aNN]        build_all.py --samples
"""
import sys,os,re,io,contextlib
HERE=os.path.dirname(os.path.abspath(__file__)); ART=os.path.dirname(HERE); STORE_DIR=os.path.join(ART,"t8-prompt-B"); STORE=os.path.join(STORE_DIR,"build.py")
_SRC=open(STORE,encoding="utf-8").read(); _I=_SRC.index('if __name__=="__main__":')
_PART1=compile(_SRC[:_I],STORE,"exec"); _MAIN=compile(_SRC[_I:].replace('if __name__=="__main__":',"if True:",1),STORE,"exec")

# ---------------- slot data: face words of the maids (INDEX_m.md) ----------------
def _face_index():
    d={}; p=os.path.join(ART,"face-common","INDEX_m.md")
    if os.path.exists(p):
        for l in open(p,encoding="utf-8"):
            c=[x.strip() for x in l.strip().strip("|").split("|")]
            if len(c)>=3 and re.fullmatch(r"m\d\d",c[0]): d[c[0]]=c[2]
    return d
FACE_M=_face_index()
FACE_REF="exactly as in her reference image, the same person"

# ---------------- the 3 foreign princesses: slot rows only (colours/hex/motif/flower) + national touch ----------------
PR={"p01":"bt","p02":"cl","p03":"pt"}; ALIAS={"bt":"p01","cl":"p02","pt":"p03"}
PRS={
"bt":dict(country="Ba Tư (a Persian-style foreign kingdom)",main="indigo blue",hex1="#5B6CA6",sec="ivory",hex2="#EFE6D2",motif="arabesques",flower="a red rose",
  touch="ONE clear touch of her Persian homeland, clearly visible at game size: the robe borders are embroidered with gold-thread Persian arabesques and small birds, she wears teardrop pearl earrings, and a sheer silk veil lies over the back of her head, held by a jewelled circlet or tiara.",
  low={1:"ONE clear touch of her Persian homeland, clearly visible at game size: narrow gold-thread arabesque borders at the neck and hem, small teardrop pearl earrings, and a SHORT sheer ivory silk veil over the back of her head that reaches ONLY to her shoulders, held by a small pearl circlet.",
       2:"ONE clear touch of her Persian homeland, clearly visible at game size: gold-thread arabesque and small-bird embroidery along the edges and hem, teardrop pearl earrings, and a sheer ivory silk veil over the back of her head that falls LONGER, down to her WAIST, held by a small gold jewelled tiara.",
       3:"ONE clear touch of her Persian homeland, clearly visible at game size: rich gold-thread arabesques, birds and pomegranate flowers along the borders, teardrop pearl earrings, and a LONG sheer ivory silk veil falling from a tall jewelled gold tiara with a central ruby all the way down her back to her KNEES."},
  veil_hi="the sheer veil over the back of her head is SHEER ROYAL-YELLOW silk gauze (still transparent, clearly royal golden yellow, not ivory), falling to her knees"),
"cl":dict(country="Cao Ly (a Korean-style foreign kingdom)",main="deep rose",hex1="#C9708A",sec="jade green",hex2="#79A98F",motif="chrysanthemums",flower="a white plum blossom",
  touch="ONE clear touch of her Korean homeland, clearly visible at game size: a long ornate norigae tassel ornament (a jade knot with a long deep-rose silk tassel) hanging from her sash.",
  low={1:"ONE clear touch of her Korean homeland, clearly visible at game size: a small norigae tassel ornament (a jade knot with a deep-rose silk tassel) hanging from her ribbon.",
       2:"ONE clear touch of her Korean homeland, clearly visible at game size: a long ornate norigae tassel ornament (a jade knot with a long deep-rose silk tassel) hanging from her ribbon.",
       3:"ONE clear touch of her Korean homeland, clearly visible at game size: a triple norigae tassel ornament of jade and deep-rose silk hanging from her ribbon."}),
"pt":dict(country="Phù Tang (a Japanese-style foreign kingdom)",main="wisteria purple",hex1="#9C88BC",sec="soft crimson",hex2="#B8556A",motif="wisteria",flower="a purple wisteria sprig",
  touch="ONE clear touch of her Japanese (Heian) homeland, clearly visible at game size: at the collar and sleeve openings the edges of several thin layered inner robes show in graded shades of wisteria purple with a soft crimson innermost edge.",
  low={1:"ONE clear touch of her Japanese (Heian) homeland, clearly visible at game size: at the collar and sleeve openings the edges of two thin layered inner robes show in graded shades of wisteria purple with a soft crimson innermost edge, and her very long straight black hair hangs loose down her back.",
       2:"ONE clear touch of her Japanese (Heian) homeland, clearly visible at game size: at the collar and sleeve openings the edges of three thin layered inner robes show in graded shades of wisteria purple with a soft crimson innermost edge, and her very long straight black hair hangs loose down her back.",
       3:"ONE clear touch of her Japanese (Heian) homeland, clearly visible at game size: at the collar and sleeve openings the edges of five thin layered inner robes show in graded shades of wisteria purple with a soft crimson innermost edge, and her very long straight black hair hangs loose down her back."}),
}
def _inject(g):
    for pid,k in PR.items():
        d=PRS[k]; pal=f"{d['main']} and {d['sec']}"
        g["DATA"][pid]=(pal,""); g["ORIG1"][pid]=(f"{d['main']} silk like {d['hex1']}",f"{d['sec']} like {d['hex2']}")
        g["MOTIF_LOW"][pid]=(d["motif"],d["flower"]); g["LOWNAME"][pid]=(d["main"],d["main"])
        g["ITEMS_LOW"][pid]=g["items3f"](pid); g["SPEC5_IDS"][pid]=("kieungao",1+list(PR).index(pid))
        for t in (4,5,6): g["OUTFIT_JOBS"][f"{pid}-t{t}"]=g["_g3"]["outfit"](t,pal,d["motif"]).replace("Outfit for all four (","Outfit (",1).replace("(Tan)","(Tần)").replace("(Quy phi)","(Quý phi)")

def store(person,rank,age="a18"):
    """EXACT stdout of the store CLI for this person/rank (princess rows injected into the store's own tables)."""
    argv=["build.py",person]+(["--low",str(rank)] if rank<=6 else ["--t7"] if rank==7 else [])+["--spec5pose"]+(["--age",age] if age!="a18" else [])
    old=sys.argv; sys.argv=argv; g={"__name__":"build_store","__file__":STORE}
    try:
        exec(_PART1,g); _inject(g); buf=io.StringIO()
        with contextlib.redirect_stdout(buf): exec(_MAIN,g)
    finally: sys.argv=old
    return buf.getvalue()

# ---------------- owner laws, added as extra sentences ----------------
def _fl():
    s=open(os.path.join(ART,"owner-copy","mk_ranks_v3.py"),encoding="utf-8").read(); g={}; exec(s[s.index("FL="):s.index("FLCOL=")],g); return g["SZ"]
SZ=_fl()
HAIR_LOW="HAIR (rank law): her hair stays LOOSE and flowing like her young-lady picture: at most the top half gathered up, most of her hair hanging loose down her back."
HAIR_HIGH="HAIR (rank law): ALL her hair is swept UP into a high bun / chignon, nothing loose hanging down her back."
def sleeve(t):
    if t<=3: return "SLEEVE LENGTH (rank law): very long, wide, flowing sleeves that fall well past her hands and hang down to her KNEES."
    if t<=6: return "SLEEVE LENGTH (rank law): very long, wide, flowing sleeves that hang down to her ANKLES."
    return "SLEEVE LENGTH (rank law): very long, very wide sleeves that hang down past her ankles until they touch the floor."
ONE_LAYER="ONE SINGLE SLEEVE LAYER: each sleeve begins at the shoulder and falls in one piece; NO shorter outer sleeve, NO half-sleeve or elbow-length layer, NO short jacket sleeve or cuff layer visible on top of it."
HEADBODY="HEAD AND BODY: her head turns together with her shoulders and body in the same direction with natural anatomy, never a frontal head on a turned body."
FABRIC_B="FABRIC: thick gold-embroidered brocade with a graceful, flowing drape."
NOFLOWER="NO flowers in the hair or on the crown at this rank (flowers only at ranks 1 to 6)."
def laws(t):
    L=[HAIR_LOW if t<=3 else HAIR_HIGH,sleeve(t),ONE_LAYER]
    L.append(SZ[t] if t<=6 else NOFLOWER)
    L.append(HEADBODY)
    if t>=7: L.append(FABRIC_B)
    return L
def princess_sentences(k,t):
    d=PRS[k]; L=[f"She is a foreign princess from {d['country']} who has entered the imperial palace."]
    L.append(d["low"][t] if t<=3 else d["touch"])
    if k=="bt" and t>=4: L.append(("From rank 4 the veil keeps its length to her knees; " if t<=6 else "At this rank ")+d["veil_hi"]+"." if t>=7 else "From rank 4 the sheer ivory head veil keeps its length down to her knees.")
    return L

def build(person,rank,age="a18"):
    person=ALIAS.get(person,person); S0=store(person,rank,age); S=S0
    if "Her face: . " in S:
        face=FACE_M.get(person,FACE_REF); S=S.replace("Her face: . ","Her face: "+face+(". " if not face.endswith(".") else " "),1)
    anchor=" Pose:"; assert S.count(anchor)==1,("pose anchor",person,rank)
    add=laws(rank)+(princess_sentences(PR[person],rank) if person in PR else [])
    return S0,S.replace(anchor," "+" ".join(add)+anchor,1),add

# ---------------- CHECK ----------------
def _frame(rank,age):
    """frame sentences = those identical in the store outputs of c03 (green), c06 (red), c25 (cherry): colour/motif-dependent clauses drop out."""
    r=None
    for p in ("c03","c06","c25"):
        x=set(re.split(r"(?<=[.;]) ",store(p,rank,age))); r=x if r is None else r&x
    return r
def check(person,rank,age="a18",ref=None):
    S0,F,add=build(person,rank,age); errs=[]
    blk=" "+" ".join(add)
    if F.count(blk)!=1: errs.append("added block not exactly once")
    stripped=F.replace(blk,"",1)
    S=S0
    if "Her face: . " in S:
        face=FACE_M.get(ALIAS.get(person,person),FACE_REF); S=S.replace("Her face: . ","Her face: "+face+(". " if not face.endswith(".") else " "),1)
    if stripped!=S: errs.append("F minus added sentences != store output")
    for x in add:
        if x not in F: errs.append("law sentence missing: "+x[:50])
    if ref is None:
        ref=_frame(rank,age)
    for s in ref:
        if s.strip() and s not in F: errs.append("store frame sentence missing: "+s[:70])
    return errs
PEOPLE=[f"c{i:02d}" for i in range(1,33)]+[f"m{i:02d}" for i in range(1,53)]+list(PR)
def check_all(age="a18"):
    bad=0
    for t in range(1,9):
        ref=_frame(t,age)
        for p in PEOPLE:
            e=check(p,t,age,ref)
            if e: bad+=1; print("FAIL",p,"t%d"%t,age,"|",e[:3])
    n=len(PEOPLE)*8; print(f"checked {n} prompts ({len(PEOPLE)} people x 8 ranks, age {age}): {bad} FAIL"); return 1 if bad else 0
if __name__=="__main__":
    a=sys.argv[1:]; age=a[a.index("--age")+1] if "--age" in a else "a18"
    if "--check" in a: sys.exit(check_all(age))
    if "--samples" in a:
        for p,t in (("m19",1),("m19",3),("c06",7),("p01",2),("p03",8)):
            print(f"\n===== {p} t{t} {age} =====\n"+build(p,t,age)[1])
        sys.exit(0)
    pos=[x for x in a if not x.startswith("--") and x!=age]; print(build(pos[0],int(pos[1]),age)[1],end="")

#!/usr/bin/env python3
"""NDX3 Nữ đế set-B prompt maker (owner Lượt 554, ROOT-50 brief).
Prompt = build.py mNN v0 --state nude --spec5pose --nudeopt <auto map A..D> --nostyle [--age aNN] (the 18/11 ~23:33Z approved Nữ đế prompt + r11 crowns),
then ONLY: (0) ROOT-50 ruling (b): S04 approved wording, + S07 FABRIC B, + S17 hands tail, stole/sash out of the pose (X05); (1) empty face slot filled with her v3 face words VERBATIM (B8, from KC_REFS.json);
(2) 'Image 3' -> 'Image 2' (one-ref renumber, same as store-all/build_all.py l.98: style image gone, swatch = image 2).
Refs: image 1 = her set-B cut (kc_ref.py), image 2 = royal swatch TdwDfOyVNR.
Usage: mk.py mNN  -> writes dev/art/nude-B/prompts/mNN_aXX.txt for the 5 ages."""
import sys,json,re,subprocess,os
R=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.abspath(os.path.join(R,"../../.."))
p=sys.argv[1]
kc=json.load(open(os.path.join(ROOT,"dev/art/KC_REFS.json"),encoding="utf-8"))
row=kc["people"][p]
if row.get("m09_ok")!="yes": sys.exit(2)
face=row["face_words"].strip()
assert face.startswith("Her face: ") and face.endswith(".")
assert face in open(os.path.join(ROOT,row["prompt_file"]),encoding="utf-8").read(),"face words not verbatim in v3 FULL"
os.makedirs(os.path.join(R,"prompts"),exist_ok=True)
# E11 items = IT1 lists in build.py (NUDE_LIST 25 + NUDE_AGE 5 per age, commit 438794d)
AGES=["a18","a26","a36","a51","a65"]
import ast as _ast
_tree=_ast.parse(open(os.path.join(ROOT,"dev/art/t8-prompt-B/build.py"),encoding="utf-8").read())
_lit={n.targets[0].id:n.value for n in _tree.body if isinstance(n,_ast.Assign) and len(n.targets)==1 and isinstance(n.targets[0],_ast.Name) and n.targets[0].id in ("NUDE_LIST","NUDE_AGE")}
_NL=_ast.literal_eval(_lit["NUDE_LIST"]); _NA=_ast.literal_eval(_lit["NUDE_AGE"])
assert len(_NL)==25 and all(len(v)==5 for v in _NA.values())
WRAP=os.path.join(R,"_build_item.py")   # runs build.py unchanged except age_item() for tier 'nude' returns NDX_ITEM
for age in ("a18","a26","a36","a51","a65"):
    argv=[sys.executable,WRAP,p,"v0","--state","nude","--spec5pose","--nudeopt","auto","--nostyle"]+(["--age",age] if age!="a18" else [])
    it=_NL[_NA[age][(int(p[1:])-1)%5]]   # IT1 438794d (E11): build.NUDE_LIST[NUDE_AGE[age][(n-1)%5]]
    o=subprocess.run(argv,capture_output=True,text=True,check=True,env={**os.environ,"PYTHONDONTWRITEBYTECODE":"1","NDX_ITEM":it[0],"NDX_HK":it[1]}).stdout
    if "Her face: ." in o: o=o.replace("Her face: .",face,1)   # older builder: empty slot
    assert o.count(face)==1,"face words (BW3 builder fills them from KC_REFS)"
    o=re.sub(r"\b([Ii])mage 3\b",r"\1mage 2",o)
    # ROOT-50 ruling (b) 19/11 (owner's LATER rules the gate enforces; LAW #0 OK): S04 wording, S07 fabric B, S17 hands tail, X05 no stole/sash in the pose
    S04o="All flowers, clouds and dragons are fine"; S04n="All flowers, birds and the dragon are fine"   # = approved S04 with motif slot as in the gate-passing nude store text
    assert o.count(S04o)==1; o=o.replace(S04o,S04n,1)
    S07=" FABRIC: thick gold-embroidered brocade with a graceful, flowing drape."
    a=" The silk has real weight:"; assert o.count(a)==1; o=o.replace(a,S07+a,1)
    o,n=re.subn(r"one hand holding the edge of her long sheer silk stole, (.*?) in the other hand, the item held",r"\1 in one hand, the other hand gently touching it, the item held",o)
    for x in (", the other hand resting over her sash, holding the edge of her long sheer silk stole",", the other hand holding the edge of her long sheer silk stole"):
        if x in o: o=o.replace(x,", the other hand gently touching it",1); n+=1
    if ", her long sheer silk stole over both arms" in o: o=o.replace(", her long sheer silk stole over both arms","",1); n+=1
    assert n==1,("stole pose",n)
    # NDX4 (owner Lượt 683 'sleeves don't reach the floor, sleeve fabric wrong — copy the Hoàng hậu'; K6 sleeves exactly like HH):
    # the HH t8 sleeve sentences COPIED VERBATIM from the store builder (build_all.py l.119-120, t8 output), inserted after the shared weight/drape sentence as in HH.
    _hh=subprocess.run([sys.executable,os.path.join(ROOT,"dev/art/store-all/build_all.py"),p,"8"]+(["--age",age] if age!="a18" else []),capture_output=True,text=True,check=True).stdout
    HHS=[" SLEEVE LENGTH (rank law): very long, very wide sleeves that hang down past her ankles until they touch the floor."," ONE SINGLE SLEEVE LAYER: each sleeve begins at the shoulder and falls in one piece; NO shorter outer sleeve, NO half-sleeve or elbow-length layer, NO short jacket sleeve or cuff layer visible on top of it."]
    for s in HHS: assert _hh.count(s)==1,("not verbatim in HH t8",s)
    for s in (S07," The silk has real weight: the wide sleeves and robe hang and fold naturally under their own weight, with natural creases, never stiff, flat or board-like."): assert s in _hh,("HH fabric sentence missing in HH",s)
    a_w=" The silk has real weight: the wide sleeves and robe hang and fold naturally under their own weight, with natural creases, never stiff, flat or board-like."
    assert o.count(a_w)==1; o=o.replace(a_w,a_w+"".join(HHS),1)
    # NDX4 round 2 (owner Lượt 692 via ROOT-55: full sentence diff vs HH t8): add HH's NO-flowers, HEAD AND BODY, ANGLE (HH t8 of this age, verbatim)
    # and HELD ITEM COLOUR (HH template, only the colour names = Nữ đế colours); FABRIC moved to the HH position (after HEAD AND BODY, before ANGLE).
    def _hhs(pref):
        m=re.findall(r" "+re.escape(pref)+r"[^.]*\.",_hh); assert len(m)==1,(pref,m); return m[0]
    NOFL=" NO flowers in the hair or on the crown at this rank (flowers only at ranks 1 to 6)."
    HB=" HEAD AND BODY: her head turns together with her shoulders and body in the same direction with natural anatomy, never a frontal head on a turned body."
    ANG=_hhs("ANGLE: ")
    HIC=" HELD ITEM COLOUR: the held item and any embroidery, painting or tassel on it are in a colour family clearly different from BOTH her robe colour royal golden yellow and her secondary colour wine-crimson like #7E2A33."
    for x in (NOFL,HB): assert _hh.count(x)==1,("not verbatim in HH t8",x)
    _hic_hh=_hhs("HELD ITEM COLOUR: "); assert re.sub(r"her robe colour .*$","",_hic_hh)==re.sub(r"her robe colour .*$","",HIC),"HELD ITEM COLOUR template differs from HH"
    assert o.count(S07)==1; o=o.replace(S07,"",1)   # move FABRIC out of its old place
    HH2=[NOFL,HB,S07,ANG,HIC]
    tail="".join(HHS); assert o.count(tail)==1; o=o.replace(tail,tail+"".join(HH2),1)
    # the ANGLE sentence now gives the turn (as in HH, whose pose has no turn words): drop the spec5 turn phrase that would contradict it
    o=o.replace(", body turned slightly three-quarters to the right,",",")
    S17=" Her hands interact naturally with the item (gently presenting, turning or touching it), lively and natural, while her head stays up facing the viewer, eyes open, lips closed, never looking down."
    a="no flying, floating or windblown cloth."; assert o.count(a)==1; o=o.replace(a,a+S17,1)
    # F11 (owner Lượt 583): Nữ đế hair UP in a bun at EVERY age, stated explicitly
    HAIR=" Hair: ALL of her hair is pinned UP in a neat high imperial bun (chignon) under the crown, at every age; NO loose hair: nothing hanging down her back, over her shoulders or in front of her chest."
    a=" Outfit (the Female Emperor"; assert o.count(a)==1; o=o.replace(a,HAIR+a,1)
    # owner Lượt 624 (ROOT-53): a51/a65 age + colour text = VERBATIM 18/11 Thái hậu text (dev/art/elder-copy/THAIHAU_1811_AGE_COLOUR.md); own D13 sentence removed
    if age in ("a51","a65"):
        _md=open(os.path.join(ROOT,"dev/art/elder-copy/THAIHAU_1811_AGE_COLOUR.md"),encoding="utf-8").read()
        def _blk(h): return _md.split("## "+h+" (verbatim)\n",1)[1].split("\n",1)[0].strip()
        TA,TC=_blk(age+" AGE TEXT"),_blk(age+" COLOUR TEXT")
        i=o.index("Her face:"); i=o.index("dress her in the NEW outfit below. ",i)+len("dress her in the NEW outfit below. ")
        j=o.index(HAIR)
        o=o[:i]+TA+" "+TC+o[j:]
        assert o.count(TA)==1 and o.count(TC)==1
    assert not re.search(r"Pose:[^.]*\b(stole|ribbon|sash|shawl)\b",o)
    assert "style reference" not in o.lower() and "Image 3" not in o
    for s in HHS+HH2+[a_w]: assert o.count(s)==1,("NDX4 HH gate",s)   # GATE (Lượt 683+692)
    assert o.index(a_w)<o.index(HHS[0])<o.index(NOFL)<o.index(HB)<o.index(S07)<o.index(ANG)<o.index(HIC)<o.index(" Pose:"),"HH order"
    assert "three-quarters to the right" not in o   # GATE: every HH t8 sleeve/fabric sentence exactly once
    open(os.path.join(R,"prompts",f"{p}_{age}.txt"),"w",encoding="utf-8").write(o)
    print(p,age,len(o),"chars")

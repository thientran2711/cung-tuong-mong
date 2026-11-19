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
GATE: every output is run through dev/art/check_store.py (owner Lượt 375 STORE GATE, ROOT-45's checker, reused, not duplicated); PASS required, else exit 1.
Internal invariant (assert, not a second checker): F minus the added sentences == STORE output (+ face slot) exactly; every frame sentence shared by the store outputs of c06 and c25
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
"cl":dict(country="Cao Ly (a Korean-style foreign kingdom)",main="rose",hex1="#C9708A",sec="jade",hex2="#79A98F",motif="chrysanthemums",flower="a white plum blossom",
  touch="ONE clear touch of her Korean homeland, clearly visible at game size: a long ornate norigae tassel ornament (a jade knot with a long deep-rose silk tassel) hanging from her sash.",
  low={1:"ONE clear touch of her Korean homeland, clearly visible at game size: a small norigae tassel ornament (a jade knot with a deep-rose silk tassel) hanging from her ribbon.",
       2:"ONE clear touch of her Korean homeland, clearly visible at game size: a long ornate norigae tassel ornament (a jade knot with a long deep-rose silk tassel) hanging from her ribbon.",
       3:"ONE clear touch of her Korean homeland, clearly visible at game size: a triple norigae tassel ornament of jade and deep-rose silk hanging from her ribbon."}),
"pt":dict(country="Phù Tang (a Japanese-style foreign kingdom)",main="wisteria",hex1="#9C88BC",sec="crimson",hex2="#B8556A",motif="wisteria",flower="a purple wisteria sprig",
  touch="ONE clear touch of her Japanese (Heian) homeland, clearly visible at game size: at the collar and sleeve openings the edges of several thin layered inner robes show in graded shades of wisteria purple with a soft crimson innermost edge.",
  low={1:"ONE clear touch of her Japanese (Heian) homeland, clearly visible at game size: at the collar and sleeve openings the edges of two thin layered inner robes show in graded shades of wisteria purple with a soft crimson innermost edge, and her very long straight black hair hangs loose down her back.",
       2:"ONE clear touch of her Japanese (Heian) homeland, clearly visible at game size: at the collar and sleeve openings the edges of three thin layered inner robes show in graded shades of wisteria purple with a soft crimson innermost edge, and her very long straight black hair hangs loose down her back.",
       3:"ONE clear touch of her Japanese (Heian) homeland, clearly visible at game size: at the collar and sleeve openings the edges of five thin layered inner robes show in graded shades of wisteria purple with a soft crimson innermost edge, and her very long straight black hair hangs loose down her back."}),
}
# Lượt 434/438 item 2 (owner: "mỗi bậc cầm một món riêng, đã có cái bảng đó rồi" = FIGURE_GATE rule 3f FIXED ITEM LIST PER RANK, 10 items per rank, t1..t8): rank tN takes ONE item VERBATIM from the 3f list of rank tN
# (build.py L3F[1..6], ITEMS7 = t7, ITEMS = t8; identical to the FIGURE_GATE 3f lists). Nothing invented. The lists are different per rank, so 8 ranks = 8 different items; an item listed at one rank is never used at another.
# Rotation: index = (person number - 1) + 3 * (age step) mod 10 -> neighbours differ, every age of one person its own item (3f EVERY AGE ITS OWN ITEM). Nữ đế / other states keep their own H lists (age_item untouched for them).
LADDER_TIERS=["t%d"%i for i in range(1,9)]
def _install_ladder(g):
    IA=g["_IA"]; orig=g["age_item"]
    def pick(c,tier,age):
        n=int(re.sub(r"\D","",c) or 0) or sum(map(ord,c)); ai=IA.AGES.index(age); idx=(n-1+3*ai)%10; N=int(tier[1:])
        if N<=6: it,kind=g["L3F"][N][idx]; return it,"L:"+kind
        return (g["ITEMS7"][idx] if N==7 else g["ITEMS"][idx])
    def age_item(c,tier,item,hk):
        if tier not in LADDER_TIERS: return orig(c,tier,item,hk)
        age=g["AGE"]; ages=IA.TIER_AGES[tier]; a=age if age in ages else min(ages,key=lambda x:abs(int(x[1:])-int(age[1:])))
        return pick(c,tier,a)
    g["age_item"]=age_item; g["LADDER_PICK"]=pick
def _inject(g):
    _install_ladder(g)
    """princess rows live in the store itself (build.py PRINCESS_ROWS, data rows like the maids); here only assert they match this file's slot rows."""
    for pid,k in PR.items():
        d=PRS[k]; assert g["PRINCESS_ROWS"][pid]==(d["main"],d["sec"],d["hex1"],d["hex2"],d["motif"],d["flower"]),("store row differs",pid)

STYLE_OVERRIDE=None   # None = default; True (CLI --style) = force the old 2/3-image refs with the style image
def NOSTYLE_FOR(rank):
    """Lượt 414/416 RULE: the style image (6AbGv6EiJO, the owner's "M09") is used ONLY for the t1 thiếu nữ itself; ranks t2..t8 (and t8o) use her OWN t1 picture as image 1 and drop the style sentences
    (store --nostyle; swatch of the royal ranks = image 2). Nữ đế ('nude') keeps the style image (not named by the owner yet)."""
    if STYLE_OVERRIDE: return False
    return rank not in (1,"nude")
def store(person,rank,age="a18"):
    """EXACT stdout of the store CLI for this person/rank (princess rows injected into the store's own tables)."""
    if rank=="nude": argv=["build.py",person,"v0","--nude3"]+(["--age",age] if age!="a18" else [])   # Nữ đế = the store HH t8 + added Nữ đế sentences (build.py nude3); crown varies per person (NUDE_CROWNS)
    else: argv=["build.py",person]+(["--low",str(rank)] if rank<=6 else ["--t7"] if rank==7 else [])+["--spec5pose"]+(["--age",age] if age!="a18" else [])
    if NOSTYLE_FOR(rank): argv=argv+["--nostyle"]
    old=sys.argv; sys.argv=argv; g={"__name__":"build_store","__file__":STORE}
    try:
        exec(_PART1,g); _inject(g); buf=io.StringIO()
        with contextlib.redirect_stdout(buf): exec(_MAIN,g)
    finally: sys.argv=old
    global LAST_G; LAST_G=g
    out=buf.getvalue()
    if NOSTYLE_FOR(rank): out=re.sub(r"\b([Ii])mage 3\b",r"\1mage 2",out)   # renumber: with the style image gone the swatch is image 2
    return out

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
def angle_sentence(person,rank):
    """Lượt 440: one of the 14 standing angles (7 + 7 mirrored, build.py ANG14), rotated per person: ANG[(t-1+(n-1))%14]; the head turns WITH the body; frontal or three-quarter only."""
    return "ANGLE: "+LAST_G["ang_for"](person,rank)+"; her head turns together with her shoulders and body, never back-turned, never in profile."
def laws(t):
    L=[HAIR_LOW if t<=3 else HAIR_HIGH,sleeve(t),ONE_LAYER]
    L.append(SZ[t] if t<=6 else NOFLOWER)
    L.append(HEADBODY)
    if t>=7: L.append(FABRIC_B)
    return L
# Lượt 397 item 4 (PHI BẠCH): the draped sheer shawl behind the back / over the arms goes on EVERY thường phục rank t1-t6 (ROOT-47 ruling; wording differs where the store text has no shawl); NOT on t7 HQP, t8 Hoàng hậu, Nữ đế.
# Its colour = the outfit's SECONDARY colour (second word group of her palette), explicit per person, so it does not melt into the dress.
# Lượt 434 item 3: the phi bạch must be a CLEARLY DIFFERENT colour (another colour family AND tone) from the main robe colour, so the shawl never melts into the robe.
# Her own secondary colour is used only if it is in another hue family than her main AND is not a neutral/metal (ivory, white, cream, silver, gold...); otherwise a contrasting harmonious colour from FAMILY_CONTRAST, rotated per person.
FAMILY_WORDS=[("green",("green","celadon","jade","teal","mint","sage","aqua","olive","moss","emerald","willow","turquoise","peacock")),
 ("blue",("blue","indigo","sapphire","azure","sky","cornflower","navy","periwinkle","powder")),
 ("purple",("purple","violet","lilac","lavender","wisteria","orchid","mauve","plum","amethyst")),
 ("pink",("pink","rose","blush","peach","salmon","magenta","fuchsia","coral")),
 ("red",("red","crimson","vermilion","cherry","brick","rust","wine","burgundy","scarlet","maroon","terracotta")),
 ("yellow",("yellow","gold","golden","amber","honey","apricot","orange","caramel","mustard","saffron","tan","sand","camel","oat")),
 ("neutral",("ivory","white","cream","pearl","silver","grey","gray","beige","black","taupe","cocoa","brown","mocha"))]
def family(word):
    w=word.lower()
    for fam,ws in FAMILY_WORDS:
        if any(x in w for x in ws): return fam
    return "other"
FAMILY_CONTRAST={"green":["deep rose","crimson"],"pink":["jade green","deep teal"],"purple":["crimson","antique gold"],"neutral":["deep rose","deep teal"],
 "yellow":["blue-violet","deep sapphire blue"],"red":["jade green","deep teal"],"blue":["warm coral rose","soft apricot-gold"],"other":["deep rose","deep teal"]}
def phibach_colour(person,pal=None):
    """(main, own secondary, family main, phi bạch colour, note)"""
    pal=pal or LAST_G["DATA"][person][0]; main=pal.split(" and ")[0]; sec=pal.split(" and ")[-1] if " and " in pal else ""
    fm=family(main); fs=family(sec) if sec else "neutral"
    # the main may itself be a neutral robe (ivory...) -> contrast comes from the neutral row
    if sec and fs not in ("neutral",fm,"other"):
        return main,sec,fm,sec,"own secondary (other hue family)"
    c=FAMILY_CONTRAST[fm]; col=c[_pn(person)%len(c)]
    return main,sec,fm,col,"contrast (secondary %s is neutral/same family)"%(sec or "none")
def phi_bach(person,has_shawl=True):
    main,sec,fm,col,why=phibach_colour(person)
    intro="the sheer shawl draped behind her back and over her arms" if has_shawl else "over her outfit she wears a sheer silk shawl (phi bạch) draped behind her back and over her arms; the shawl"
    return f"PHI BẠCH: {intro} is in a clearly DIFFERENT colour from her robe: {col} (another colour family and tone than her main robe colour {main}), so it never melts into the dress; it keeps its soft graceful drape."
# Lượt 397 item 5 (Tần-style capelet / collar): CURVED cut lines, front opens gradually (no closed, buttoned top-to-bottom front); flowing (uyển chuyển).
# Lượt 412 (owner approved the Phù Tang t4 test): this Tần cut is the Tần outfit for EVERYONE. Lower-edge SHAPE varies per person (index = person number mod 6, like the Nữ đế crowns),
# every variant still reads as the same short round shoulder capelet overall. (The store sentence says the outline is smooth and round; the variants only shape the LOWER EDGE; owner approved the result.)
CURVE_SHAPES=[
 "a plain soft scalloped curve: gentle rounded scallops all along the lower edge",
 "a cloud-shaped edge: soft ruyi-cloud scallops (vân kiên) along the lower edge",
 "rounded petal-like lobes along the lower edge, like the soft petals of a flower",
 "one deep sweeping arc: the lower edge dips lower at the centre front and rises in a long curve toward the shoulders",
 "a gentle wave of long soft curves along the lower edge, like flowing water ripples",
 "a double curve: a soft scooped line under the collar and a second soft curved line below it with a short curved fringe of fine silk"]
def _pn(person): return int(re.sub(r"\D","",person) or 0)
def capelet_cut(person):
    return ("CAPELET CUT (flowing): the capelet stays the same short round shoulder capelet, but its lower edge and the collar lines are soft CURVES, never flat horizontal edges; the lower edge is "+CURVE_SHAPES[_pn(person)%len(CURVE_SHAPES)]+"; "
     "the front is NOT closed or buttoned from top to bottom: the robe is closed only at the throat clasp and its front opens gradually from the collar downward in a long soft V, the two front panels parting more and more toward the hem, flowing and graceful (uyển chuyển), never cramped or boxy.")
def collar_cut(person):
    return ("COLLAR CUT (flowing): the collar's lower edge follows soft CURVES, never flat horizontal edges: "+CURVE_SHAPES[_pn(person)%len(CURVE_SHAPES)]+"; "
     "the front is NOT closed or buttoned from top to bottom: it opens gradually from the collar downward in a long soft V, flowing and graceful (uyển chuyển), never cramped or boxy.")
def extras(S0,person,rank):
    L=[]
    if isinstance(rank,int) and rank<=6:
        L.append(phi_bach(person,"shawl" in S0))   # owner Lượt 397 via ROOT-47: phi bạch on EVERY thường phục rank t1-t6 (consorts and princesses), also where the store text has no shawl; never t7/t8/Nữ đế/triều phục
        if "capelet" in S0 and rank==4: L.append(capelet_cut(person))   # Lượt 434: the curved/open-V cut is ONLY for the Tần t4 capelet; t5 (and every other rank) keeps the approved store collar (closed high collar covering the neck)
    return L
def princess_sentences(k,t):
    d=PRS[k]; L=[f"She is a foreign princess from {d['country']} who has entered the imperial palace."]
    L.append(d["low"][t] if t<=3 else d["touch"])
    if k=="bt" and t>=4: L.append(("From rank 4 the veil keeps its length to her knees; " if t<=6 else "At this rank ")+d["veil_hi"]+"." if t>=7 else "From rank 4 the sheer ivory head veil keeps its length down to her knees.")
    return L

# Lượt 469 (owner: "trong các prompt 8 bậc là góc đứng khác nhau, tay cầm đồ khác nhau, và dáng tạo hình cũng khác nhau"): audit (dev/handover/reports/two-new-8rank.md) found the
# spec5 pose repeating inside one person's 8 ranks (6 poses per personality list + skips -> e.g. c06 t4=t5, m07 t2=t3=t8, m29 t4=t5, t1=t7). Fix = ADD only, store text untouched:
# (1) POSE DEDUPE: rank tN keeps the store's own spec5 pick unless a lower rank of the same person/age already used that pose; then it takes the next allowed pose of the SAME spec5
#     table (her own list from (i+t-1), then the other five lists) -- every pose text is still a verbatim spec5 entry (+ SPEC5_ADAPT / SPEC5_FRONTAL, same skips as the store). Pose = slot (check_store SLOT 'Pose:').
# (2) GRACE sentence: one of 8 head/shoulder/arm nuances, rotated per rank AND person like the angles: GRACE[(t-1+3*(n-1))%8] -> 8 different per person, neighbours differ.
GRACE=["her head tilted very slightly to one side, a soft graceful line from her neck to her shoulder",
 "her chin lifted just a little, her neck long and elegant",
 "her head inclined gently toward the hand that holds the item, her face still toward the viewer",
 "her shoulders soft and relaxed, one shoulder a touch lower than the other",
 "a gentle S-curve through her body, her hips softly shifted to one side",
 "her fingers softly and gracefully curved around the item, wrists relaxed",
 "her elbows held softly away from her body, her arms forming soft rounded lines",
 "her head tilted very slightly against the turn of her body, a lively graceful counter-line"]
def grace_sentence(person,rank):
    return "GRACE (pose variety, every rank its own): "+GRACE[(rank-1+3*(_pn(person)-1))%8]+"."
_POSE_MEMO={}
def _pose_tpl(g,tr,j,adapt=True):
    """spec5 entry verbatim; adapt=True -> SPEC5_ADAPT whenever the entry is listed there (also the lantern+item entry, which carries {prop}: one held item only, FIGURE_GATE D3)."""
    r_=g["SPEC5_POSES"][tr][j]
    if adapt and r_ in g["SPEC5_ADAPT"]: return g["SPEC5_ADAPT"][r_]
    return r_ if "{prop}" in r_ else g["SPEC5_ADAPT"][r_]
def _banned(t,age,prop=""):
    """store skips (look back; t6+/a51+ no twirl/skip/dance/swirl) + CALM WITH RANK (A0 rule 3) for re-picks: t6+ no butterfly/songbird/stair-step, t7-t8 no walking/mid-step;
    'reading {prop}' only when the item is a book or scroll."""
    b=[r"look(?:ing)? back"]+([r"twirl",r"skipping",r"dance",r"swirl",r"light turn"] if (t>=6 or age in ("a51","a65")) else [])
    if t>=6 or age in ("a51","a65"): b+=[r"butterfly",r"songbird",r"stair"]
    if t>=7: b+=[r"walking",r"mid-step"]
    if not re.search(r"book|scroll",prop): b+=[r"reading"]
    if not re.search(r"fan|book|scroll",prop): b+=[r" open "]
    b+=[r"looking down"]   # FIGURE_GATE D3d / store pose tail: never looking down
    return b
# same GESTURE inside one person = a repeat even if the spec5 entry differs (e.g. two hairpin-adjusting entries)
GESTURE_KEYS=[r"hairpin",r"stole",r"stair|skirt hem",r"cheek",r"offer",r"butterfly",r"songbird",r"twirl|dance",r"reading",r"both hands"]
def _keys(txt): return {k for k in GESTURE_KEYS if re.search(k,txt)}
def _frontal(g,raw):
    for o,n in g["SPEC5_FRONTAL"]: raw=raw.replace(o,n)
    return raw
def _store_pose(g,S):
    """which spec5 template the store picked + its prop (regex match of every template on the store's pose slot)."""
    m=re.search(r" Pose: (.+?)\. The item is in a contrasting colour",S); assert m,"pose slot"
    body=re.sub(r"(, poised|, with stately grace)$","",m.group(1))
    for tr in g["_SP5_ORDER"]:
        for j in range(6):
            f=_frontal(g,_pose_tpl(g,tr,j,adapt=False)); rx="^"+re.escape(f).replace(re.escape("{prop}"),"(.+?)")+"$"
            mm=re.match(rx,body)
            if mm: return (tr,j),(mm.group(1) if mm.groups() else None),body
    raise AssertionError(("store pose not in spec5 table",body))
def dedupe_pick(person,rank,age):
    """(template,prop,store template,store body) for this rank: the store pick unless a lower rank (same person, same age) used it."""
    key=(person,rank,age)
    if key in _POSE_MEMO: return _POSE_MEMO[key]
    used=[dedupe_pick(person,t,age)[0] for t in range(1,rank)]
    S=_clean_pose(store(person,rank,age)); g=LAST_G
    sp,prop,body=_store_pose(g,S); tr,mi=g["SPEC5_IDS"][person]; i=mi-1
    ukeys=set().union(*[_keys(_pose_tpl(g,*u)) for u in used]) if used else set()
    bad=lambda c:any(re.search(q,_pose_tpl(g,*c)) for q in _banned(rank,age,prop)) or bool(_keys(_pose_tpl(g,*c))&ukeys)
    if sp not in used and not (_keys(_pose_tpl(g,*sp))&ukeys): pick=sp
    else:
        # fallback order: her own list from (i+t-1), then the other five lists starting at a per-person offset (n mod 5) and a per-person slot (n+t) -> same-rank neighbours differ
        n=_pn(person); O=g["_SP5_ORDER"]; k0=O.index(tr); rest=O[k0+1:]+O[:k0]; rest=rest[n%5:]+rest[:n%5]
        cand=[(tr,(i+rank-1+k)%6) for k in range(6)]+[(L,(n+rank+k)%6) for L in rest for k in range(6)]
        bad0=lambda c:any(re.search(q,_pose_tpl(g,*c)) for q in _banned(rank,age,prop))
        pick=next((c for c in cand if c not in used and not bad(c)),None) or next(c for c in cand if c not in used and not bad0(c))   # relax the gesture-key rule only if nothing else is left
    _POSE_MEMO[key]=(pick,prop,sp,body); return _POSE_MEMO[key]
def apply_dedupe(person,rank,age,S):
    pick,prop,sp,body=dedupe_pick(person,rank,age)
    if pick==sp and _pose_tpl(LAST_G,*pick)==_pose_tpl(LAST_G,*pick,adapt=False): return S
    g=LAST_G; new=_frontal(g,_pose_tpl(g,*pick)).format(prop=prop)
    a=" Pose: "+body; assert S.count(a)==1,("pose slot",person,rank)
    return S.replace(a," Pose: "+new,1)
TQ_RIGHT=", body turned slightly three-quarters to the right"
def _clean_pose(S):
    """Lượt 440: the store's pose pass appends 'body turned slightly three-quarters to the right' at every odd pose slot (why almost everybody faced right); the ANGLE sentence (14 standing angles, left AND right) replaces it."""
    return S.replace(TQ_RIGHT,"")
def build(person,rank,age="a18"):
    person=ALIAS.get(person,person); S0=store(person,rank,age); S=S0
    if rank=="nude": return S0,S0,[]
    if "Her face: . " in S:
        face=FACE_M.get(person,FACE_REF); S=S.replace("Her face: . ","Her face: "+face+(". " if not face.endswith(".") else " "),1)
    S=_clean_pose(S)
    S=apply_dedupe(person,rank,age,S); store(person,rank,age)   # Lượt 469 pose dedupe (slot); re-run store so LAST_G is this rank's
    anchor=" Pose:"; assert S.count(anchor)==1,("pose anchor",person,rank)
    add=laws(rank)+[angle_sentence(person,rank),grace_sentence(person,rank)]+extras(S0,person,rank)+(princess_sentences(PR[person],rank) if person in PR else [])
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
    S=_clean_pose(S); S=apply_dedupe(ALIAS.get(person,person),rank,age,S); store(ALIAS.get(person,person),rank,age)   # Lượt 469: the pose slot may be re-picked (spec5 verbatim)
    if stripped!=S: errs.append("F minus added sentences != store output (pose slot dedupe applied)")
    for x in add:
        if x not in F: errs.append("law sentence missing: "+x[:50])
    if ref is None:
        ref=_frame(rank,age)
    for s in ref:
        if s.strip() and s not in F: errs.append("store frame sentence missing: "+s[:70])
    return errs
PEOPLE=[f"c{i:02d}" for i in range(1,33)]+[f"m{i:02d}" for i in range(1,53)]+list(PR)
import subprocess,tempfile
def gate(person,rank,age,text):
    """dev/art/check_store.py (owner Lượt 375 STORE GATE, reused) on this exact prompt with the SAME person's store args; PASS required."""
    sp=ALIAS.get(person,person)
    with tempfile.NamedTemporaryFile("w",suffix=".txt",delete=False,encoding="utf-8") as f: f.write(text); fn=f.name
    try:
        args=[sp,"v0"]+(["--nostyle"] if NOSTYLE_FOR(rank) else [])+([] if rank=="nude" else ["--low",str(rank)] if rank<=6 else ["--t7"] if rank==7 else [])+(["--age",age] if age!="a18" else [])
        p=subprocess.run([sys.executable,os.path.join(ART,"check_store.py"),fn]+args,capture_output=True,text=True)
        return p.returncode==0 and "STORE CHECK PASS" in p.stdout, p.stdout.strip()
    finally: os.unlink(fn)
def check_all(age="a18"):
    bad=0
    for t in range(1,9):
        ref=_frame(t,age)
        for p in PEOPLE:
            e=check(p,t,age,ref); ok,msg=gate(p,t,age,build(p,t,age)[1])
            if not ok: e=e+["check_store: "+msg[:200]]
            if e: bad+=1; print("FAIL",p,"t%d"%t,age,"|",e[:3])
    for p in [f"c{i:02d}" for i in range(1,33)]:   # Nữ đế (nude3) of every consort: gate only
        ok,msg=gate(p,"nude",age,build(p,"nude",age)[1])
        if not ok: bad+=1; print("FAIL",p,"nude",age,"|",msg[:200])
    n=len(PEOPLE)*8+32; print(f"checked {n} prompts ({len(PEOPLE)} people x 8 ranks, age {age}): {bad} FAIL"); return 1 if bad else 0
if __name__=="__main__":
    a=sys.argv[1:]; age=a[a.index("--age")+1] if "--age" in a else "a18"
    if "--style" in a: STYLE_OVERRIDE=True
    if "--check" in a: sys.exit(check_all(age))
    if "--samples" in a:
        for p,t in (("m19",1),("m19",3),("c06",7),("p01",2),("p03",8)):
            print(f"\n===== {p} t{t} {age} =====\n"+build(p,t,age)[1])
        sys.exit(0)
    pos=[x for x in a if not x.startswith("--") and x!=age]; out=build(pos[0],(pos[1] if pos[1]=="nude" else int(pos[1])),age)[1]
    ok,msg=gate(pos[0],(pos[1] if pos[1]=="nude" else int(pos[1])),age,out)
    if not ok: print(msg,file=sys.stderr); sys.exit(1)
    print(out,end="")

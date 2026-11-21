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
import sys,os,re,io,contextlib,json
sys.path.insert(0,os.path.dirname(os.path.dirname(os.path.abspath(__file__)))); import lowneck_L2228 as _LN   # G76 (owner L2228) low neckline a18-a36
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
  touch="ONE clear touch of her Persian homeland, clearly visible at game size: the robe borders are embroidered with gold-thread Persian arabesques and small birds, and a sheer silk veil lies over the back of her head, held by a jewelled circlet or tiara.",
  low={1:"ONE clear touch of her Persian homeland, clearly visible at game size: narrow gold-thread arabesque borders at the neck and hem, and a SHORT sheer ivory silk veil over the back of her head that reaches ONLY to her shoulders, held by a small pearl circlet.",
       2:"ONE clear touch of her Persian homeland, clearly visible at game size: gold-thread arabesque and small-bird embroidery along the edges and hem, and a sheer ivory silk veil over the back of her head that falls LONGER, down to her WAIST, held by a small gold jewelled tiara.",
       3:"ONE clear touch of her Persian homeland, clearly visible at game size: rich gold-thread arabesques, birds and pomegranate flowers along the borders, and a LONG sheer ivory silk veil falling from a tall jewelled gold tiara with a central ruby all the way down her back to her KNEES."},
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
        # E11 + E6 (BW5, ROOT-52/53 19/11): the 25-item age-split lists (IT1) via the store's own pick _e6_picks (5 items per age, t1-t8 never repeat a kind); --olditem = old 10-list rotation
        if "--olditem" not in sys.argv:
            it,kind=g["_e6_picks"](c,age)[tier]; return (it,"L:"+kind) if int(tier[1:])<=6 else (it,kind)
        n=int(re.sub(r"\D","",c) or 0) or sum(map(ord,c)); ai=IA.AGES.index(age); idx=(n-1+3*ai)%10; N=int(tier[1:])
        if N<=6: it,kind=g["L3F"][N][idx]; return it,"L:"+kind
        return (g["ITEMS7"][idx] if N==7 else g["ITEMS"][idx])
    def age_item(c,tier,item,hk,pet=True):
        if pet and "--olditem" not in sys.argv:   # PETS (owner Lượt 1057/1059, rule F17, t8-prompt-B/pets.py): a18/a26, kc + t1–t6, the pet replaces the held item
            _p=g["_PETS"].pet(c,tier,g["AGE"])
            if _p: return _p
        if tier not in LADDER_TIERS: return orig(c,tier,item,hk,pet=False)
        return pick(c,tier,g["AGE"])   # E7 (Lượt 529): the person's OWN age index always (was: nearest status age -> two ages could share one item); step 3 mod 10 = 5 distinct items
    g["age_item"]=age_item; g["LADDER_PICK"]=pick
def _inject(g):
    _install_ladder(g)
    """princess rows live in the store itself (build.py PRINCESS_ROWS, data rows like the maids); here only assert they match this file's slot rows."""
    for pid,k in PR.items():
        d=PRS[k]; assert g["PRINCESS_ROWS"][pid]==(d["main"],d["sec"],d["hex1"],d["hex2"],d["motif"],d["flower"]),("store row differs",pid)

STYLE_OVERRIDE=None   # None = default (own picture only, Lượt 482); True (CLI --style) = force the old 2/3-image refs with the style image, ONLY for a brand-new character
def NOSTYLE_FOR(rank):
    """Owner Lượt 482 (widens Lượt 414/416/479): the style image (6AbGv6EiJO, the owner's "M09") is ONLY for creating a brand-new character. All 90 characters exist,
    so EVERY rank t1..t8 and Nữ đế ('nude') uses the person's OWN picture as image 1 and drops the style sentences (store --nostyle; swatch of the royal ranks = image 2).
    CLI --style (STYLE_OVERRIDE) forces the old style-image refs, ONLY for a NEW character."""
    if STYLE_OVERRIDE: return False
    return True
def store(person,rank,age="a18"):
    """EXACT stdout of the store CLI for this person/rank (princess rows injected into the store's own tables)."""
    if rank=="nude": argv=["build.py",person,"v0","--nude3"]+(["--age",age] if age!="a18" else [])   # Nữ đế = the store HH t8 + added Nữ đế sentences (build.py nude3); crown varies per person (NUDE_CROWNS)
    else: argv=["build.py",person]+(["--low",str(rank)] if rank<=6 else ["--t7"] if rank==7 else [])+["--spec5pose"]+(["--age",age] if age!="a18" else [])
    if NOSTYLE_FOR(rank): argv=argv+["--nostyle"]
    old=sys.argv; sys.argv=argv; g={"__name__":"build_store","__file__":STORE}
    try:
        exec(_PART1,g); _inject(g); b20_winter(g,person); buf=io.StringIO()   # PALFIX c3 (winter: B20 đông palette)
        with contextlib.redirect_stdout(buf): exec(_MAIN,g)
    finally: sys.argv=old
    global LAST_G; LAST_G=g
    out=buf.getvalue()
    if NOSTYLE_FOR(rank): out=re.sub(r"\b([Ii])mage 3\b",r"\1mage 2",out)   # renumber: with the style image gone the swatch is image 2
    if g.get("_B20W"): out=b20_winter_words(out,g["_B20W"])   # PALFIX c3: root colour words left in the Outfit sentence (pre-written rows) -> đông words
    return out

# ---------------- owner laws, added as extra sentences ----------------
def _fl():
    s=open(os.path.join(ART,"owner-copy","mk_ranks_v3.py"),encoding="utf-8").read(); g={}; exec(s[s.index("FL="):s.index("FLCOL=")],g); return g["SZ"]
SZ=_fl()
# F13 (owner Lượt 639, ROOT-53 -> BW5): exactly ONE hair flower at t1-t6 (never two or a pair), its SIZE grows with rank (t1 small ... t6 large); replaces the Lượt 323 size ladder (t3 'flowers', t4 'plus smaller blooms', t5 'two or three', t6 'cluster').
_F13="HAIR FLOWER SIZE: exactly ONE fresh flower in her hair (the bloom ONLY, NO leaves; never two, never a pair, no cluster), "   # BUILDFIX1: F19 bloom-only words (owner L1723/L2011; approved thu s62/s63 wording)
SZ={1:_F13+"SMALL but clearly visible at game size.",2:_F13+"small-to-medium, a little bigger than at the lowest rank, clearly visible at game size.",
    3:_F13+"MEDIUM, a full bloom about the size of her palm.",4:_F13+"LARGE, a full bloom larger than her palm, clearly bigger than the lower ranks.",
    5:_F13+"BIG, a full bloom clearly bigger than at the Tần rank.",6:_F13+"the LARGEST single bloom of all ranks, the grandest hair flower in the palace."}
F13_SWAP=[("with silver, pearl and fresh flowers,","with silver, pearl and ONE fresh flower,"),("decorated with fresh flowers and several","decorated with ONE fresh flower and several"),
          ("small silk flowers and a fresh flower","a fresh flower")]   # F13: hair-ornament words that asked for several flowers -> one
HAIR_LOW="HAIR (rank law): her hair stays LOOSE and flowing like her young-lady picture: at most the top half gathered up, most of her hair hanging loose down her back."
HAIR_HIGH="HAIR (rank law): ALL her hair is swept UP into a high bun / chignon, nothing loose hanging down her back."
def sleeve(t):
    if t<=3: return "SLEEVE LENGTH (rank law): very long, wide, flowing sleeves that fall well past her hands and hang down to her KNEES."
    if t<=6: return "SLEEVE LENGTH (rank law): very long, wide, flowing sleeves that hang down to her ANKLES."
    return "SLEEVE LENGTH (rank law): very long, very wide sleeves that hang down past her ankles until they touch the floor."
# SL1 (owner Lượt 773/774: Nữ đế a36/a51/a65 + Thái hậu a36 sleeves ended at the knees while the hands hold the item at chest height): added right after the t7/t8 floor sentence
SLEEVE_FLOOR_HOLD="Even while her hands are raised to hold her item at chest height, each wide sleeve still hangs straight down from her forearm and its hem lies on the floor beside her feet; the sleeve hem is NEVER at knee or shin height."
ONE_LAYER="ONE SINGLE SLEEVE LAYER: each sleeve begins at the shoulder and falls in one piece; NO shorter outer sleeve, NO half-sleeve or elbow-length layer, NO short jacket sleeve or cuff layer visible on top of it."
HEADBODY="HEAD AND BODY: her head turns together with her shoulders and body in the same direction with natural anatomy, never a frontal head on a turned body."
FABRIC_B="FABRIC: thick gold-embroidered brocade with a graceful, flowing drape."
NOFLOWER="NO flowers in the hair or on the crown at this rank (flowers only at ranks 1 to 6)."
def angle_sentence(person,rank,age="a18"):
    """Lượt 440: one of the 14 standing angles (7 + 7 mirrored, build.py ANG14); E12 (BW6): the plan of THIS age (was always the a18 plan); the head turns WITH the body; frontal or three-quarter only."""
    return "ANGLE: "+LAST_G["ANG14"][plan(age)[(ALIAS.get(person,person),rank)][0]]+"; her head turns together with her shoulders and body, never back-turned, never in profile."
def laws(t,age="a18",princess=False):
    L=[HAIR_LOW if t<=3 and age in ("a18","a26") else HAIR_HIGH,sleeve(t)]+([SLEEVE_FLOOR_HOLD] if t>=7 else [])+[ONE_LAYER]   # F11 (owner Lượt 583): a36/a51/a65 = hair UP for everyone (t1-t3 too); loose only a18/a26
    L.append(SZ[t] if t<=6 else NOFLOWER)
    L.append(HEADBODY)
    if t>=7 or (t==6 and not princess): L.append(FABRIC_B)   # B12 (owner Lượt 781, MG2): consort Quý phi t6 and above = brocade (princess t6 stays as her builder is: M06)
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
FAMILY_CONTRAST={"green":["deep rose","crimson"],"pink":["jade green","deep teal"],"purple":["crimson","deep teal"],"neutral":["deep rose","deep teal"],
 "yellow":["blue-violet","deep sapphire blue"],"red":["jade green","deep teal"],"blue":["warm coral rose","deep rose"],"other":["deep rose","deep teal"]}
# Lượt 483 (owner, angry: "the outfits all look ONE colour - you deleted the outfit's SECONDARY colour"): root cause = f2c2835 (W72, 18/11 18:30, first --low builder): the
# store COLOUR RULE puts the secondary only "in the inner robe and linings" (copied from the t8 ORIG1 sentence where yellow dominates). Fix = slot REPLACE of that clause + one ADDED
# OUTFIT COLOURS sentence (t1-t6). Secondary = (1) her listed secondary if it is a real colour of another family (not neutral/metal/yellow); (2) else the second colour MEASURED
# from her live original (ORIG1 second entry, consorts W74-W77) if it is chromatic, another family and not yellow; (3) else a contrasting colour (FAMILY_CONTRAST, no gold/yellow).
import colorsys as _cs
def _hexhs(h):
    r,g,b=(int(h[i:i+2],16)/255 for i in (1,3,5)); hh,ss,vv=_cs.rgb_to_hsv(r,g,b); return hh*360,ss
# PALFIX a2 + c3 (owner L1419 via Foreman C #9, PALAUDIT1): B20 = dev/art/face-common/palettes_season.json (86 consorts). a2: a B20 person's secondary is her B20 secondary
# as written (no FAMILY_CONTRAST swap). c3: --season dong uses her B20 ĐÔNG palette (main + secondary + hexes) instead of her root colours (G26 'only add fur' stays for the rest).
B20=json.load(open(os.path.join(ART,"face-common","palettes_season.json"),encoding="utf-8"))
SEASON_PAL=None   # "xuan"|"ha"|"thu"|"dong" while a season cell is built (_build_season)
# BUILDFIX2 (AUDIT1 row 1, owner L2060 "máy phải ra đúng prompt cho mọi người × bậc × 4 mùa"): every season uses her palettes_season.json
# main + secondary (names + hexes EXACT), also when the season is her root season (DATA rows were stale for 50/74 persons).
SEASONS=("xuan","ha","thu","dong")
def _season_pal(person):
    """her B20 palette of the season being built (any season, root included), else None."""
    return b20(person) if SEASON_PAL in SEASONS else None
def B20_SEASON(person):
    d=B20.get(ALIAS.get(person,person)); return None if not isinstance(d,dict) or "root_season" not in d else (SEASON_PAL or d["root_season"])
def b20(person):
    s=B20_SEASON(person); return B20[ALIAS.get(person,person)].get(s) if s else None
def b20_winter(g,person):
    """c3: record her root -> B20 đông colour words for this store run (the store tables stay untouched, so the F2 flower swap never sees a đông colour name
    such as 'pale orchid'); store() applies them to the printed text (b20_winter_words)."""
    d=B20.get(person)
    if not (SEASON_PAL in SEASONS and isinstance(d,dict) and isinstance(d.get(SEASON_PAL),dict) and person in g["DATA"]): return   # BUILDFIX2: every season, root included
    w=d[SEASON_PAL]; m,mh,s,sh=w["main"],w["main_hex"],w["sec"],w["sec_hex"]; pal=g["DATA"][person][0]
    old=pal.split(" and ")[0]; _s0=pal.split(" and ")[-1] if " and " in pal else ""; low=g["LOWNAME"].get(person,(old,old))
    ex=[(pal,f"{m} and {s}")]   # exact phrases, whole prompt
    if person in g["ORIG1"]: o1=g["ORIG1"][person]; ex+=[(o1[0],f"{m} silk like {mh}"),(o1[1],f"{s} like {sh}")]
    if person in g["M_COLS"]: mc=g["M_COLS"][person]; ex+=[(f"{mc[0]} like {mc[1]}",f"{m} like {mh}"),(f"{mc[2]} like {mc[3]}",f"{s} like {sh}")]
    rs=d[d["root_season"]].get("sec","")
    g["_B20W"]=(ex,[(low[0],m),(low[1],m),(old,m),(rs,s),(_s0,s)])
def winter_pairs(person,season="dong"):
    """check_store (STORE gate, season prompt): the same root -> season pairs the builder used, from the store tables (None = no swap for her)."""
    global SEASON_PAL
    person=ALIAS.get(person,person); g={"__name__":"build_store","__file__":STORE}; old=sys.argv; sys.argv=["build.py",person]
    try:
        exec(_PART1,g); _inject(g); SEASON_PAL,_o=season,SEASON_PAL; b20_winter(g,person)
    finally: sys.argv=old; SEASON_PAL=_o
    return g.get("_B20W")
def b20_winter_words(out,pairs):
    """c3: exact palette phrases (DATA pair, ORIG1, M_COLS name+hex) everywhere; then inside the Outfit sentence her root main / secondary words -> đông words
    (never after 'NOT ', longest words first)."""
    ex,pairs=pairs
    for a,b in sorted(ex,key=lambda x:-len(x[0])):
        if a and a!=b: out=out.replace(a,b)
    if "Outfit (" not in out: return out
    i=out.index("Outfit ("); j=out.index(". ",i)+1; o=out[i:j]
    seen=set()
    for a,b in sorted(pairs,key=lambda x:-len(x[0])):
        if not a or a==b or a in seen or a in ("gold","golden","silver","pearl","white","jade"): continue   # metal / pearl words (DATA 'peacock teal and gold') are trims, never her colour
        seen.add(a); o=re.sub(r"(?<!NOT )(?<![A-Za-z-])"+re.escape(a)+r"(?![A-Za-z-])",b,o)
    return out[:i]+o+out[j:]
def secondary(person):
    """(colour words, source) of her outfit SECONDARY colour."""
    g=LAST_G
    _w=_season_pal(person)
    if _w: return (f"{_w['sec']} like {_w['sec_hex']}" if person in g.get("M_COLS",{}) else _w["sec"]),f"B20 {SEASON_PAL} palette (PALFIX c3, BUILDFIX2)"
    if person in g.get("M_COLS",{}): _m=g["M_COLS"][person]; return f"{_m[2]} like {_m[3]}","owner table (m_colours_proposed.json / nc princess colours, Lượt 603/592)"   # BW4
    pal=g["DATA"][person][0]; main=pal.split(" and ")[0]; sec=pal.split(" and ")[-1] if " and " in pal else ""
    fm=family(main); fs=family(sec) if sec else "neutral"
    if sec and fs not in ("neutral",fm,"other","yellow"): return sec,"listed secondary"
    o=g["ORIG1"].get(person)
    if o:
        m=re.search(r"(.+?) like (#[0-9A-Fa-f]{6})",o[1]); m1=re.search(r"#[0-9A-Fa-f]{6}",o[0])
        if m and m1:
            h2,s2=_hexhs(m.group(2)); h1,_=_hexhs(m1.group(0)); d=abs(h2-h1); d=min(d,360-d)
            w=re.sub(r"^(a|an) ","",m.group(1).strip())
            if s2>=0.15 and d>=40 and not (40<=h2<=70) and family(w) not in ("neutral","yellow",fm): return w+" like "+m.group(2).upper(),"live original (ORIG1 measured)"
    _b=b20(person)
    if _b: return _b["sec"],"B20 %s secondary as written (PALFIX a2, owner L1419)"%B20_SEASON(person)   # PALFIX a2: never FAMILY_CONTRAST for a B20 person
    c=FAMILY_CONTRAST[fm]; return c[_pn(person)%len(c)],"contrast (listed %s is neutral/metal/same family)"%(sec or "none")
def main_name(person):
    """DATA main name (no hex); PALFIX c3: winter = her B20 đông main."""
    _w=_season_pal(person)
    if _w: return _w["main"]
    return LAST_G["DATA"][person][0].split(" and ")[0]
def main_words(person):
    """MAIN colour words of the TWO/THREE-COLOUR sentence: owner-table people = name like #HEX (BW4, Lượt 603), others = DATA name."""
    _w=_season_pal(person)
    if _w: return f"{_w['main']} like {_w['main_hex']}" if person in LAST_G.get("M_COLS",{}) else _w["main"]   # PALFIX c3
    m=LAST_G.get("M_COLS",{}).get(person)
    return f"{m[0]} like {m[1]}" if m else LAST_G["DATA"][person][0].split(" and ")[0]
def outfit_colours(person):
    """Lượt 489: the owner-APPROVED two-colour sentence (Cao Ly princess V2, Lượt 301-303, dev/art/owner-copy/pr_cl_t2_V2.txt) copied VERBATIM; only the two colour slots swapped.
    It lived only in the owner-copy generators (mk_ranks_v3.py / mk_princess_ranks.py), never in the store t8-prompt-B/build.py that build_all copies, so the store path never had it."""
    main=main_words(person); sec,_=secondary(person)
    return f"TWO-COLOUR RULE: the whole outfit uses EXACTLY TWO colours that clearly interact: the MAIN colour {main} and the SECONDARY colour {sec}, the secondary clearly visible in large areas (inner robe or skirt, wide borders, sash, cuffs, linings), never a single flat colour all over; gold or silver only as thin accents, never a third colour."
def phibach_colour(person,pal=None):
    """(main, own secondary, family main, phi bạch colour, note)"""
    pal=pal or LAST_G["DATA"][person][0]; main=pal.split(" and ")[0]; sec=pal.split(" and ")[-1] if " and " in pal else ""
    fm=family(main); fs=family(sec) if sec else "neutral"
    # the main may itself be a neutral robe (ivory...) -> contrast comes from the neutral row
    col,why=secondary(person)   # Lượt 483: phi bạch = her outfit SECONDARY colour (never gold/yellow below t6)
    return main,sec,fm,col,why
# G36 (owner L1446 'Phi bạch chỉ giữ cho mùa hạ và mùa thu ... mùa xuân và mùa đông sẽ không giữ'; extends G34 L1439): the builder's output is XUÂN (season None = the current
# Hán set) or ĐÔNG -> no phi bạch sentence and no store shawl words ('a sheer silk shawl'); a future hạ/thu builder sets G36_PHIBACH=True. Negative 'no shawl' lines stay.
G36_PHIBACH=False
G36_RX=re.compile(r"(?:,|;) a sheer silk shawl(?=[;.,])")
def g36(S):
    return S if G36_PHIBACH else G36_RX.sub("",S)
# L1834 (owner approved PALBACH1 L1821 via Foreman C #23): phi bạch colour = her own per-season 3rd colour from
# dev/art/face-common/phibach_3rd_L1821.json (person -> ha/thu -> prompt_colour) + THIN GOLD EDGE; season from the season arg or PHIBACH_SEASON
# (a hạ/thu builder sets it); unknown season/person -> the old G56 pale IVORY-CREAM words.
PHIBACH_SEASON=None
_PB3=None
def phibach3(person,season=None):
    global _PB3
    season=season or PHIBACH_SEASON
    if season not in ("ha","thu"): return None
    if _PB3 is None:
        _PB3=json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)),"..","face-common","phibach_3rd_L1821.json"),encoding="utf-8"))
    e=_PB3.get(ALIAS.get(person,person),{}).get(season)
    return e["prompt_colour"] if e else None
def phi_bach(person,has_shawl=True,rank=None,season=None):
    # G56 (owner L1804/L1805) + L1834: phi bạch = her 3rd colour (phibach3) with a THIN GOLD EDGE (outside her two palette colours, exception to B20/A31),
    # t1-t6 only (t7/t8: none, any season); t6 Quý phi = THICKER, much less transparent silk (G54, L1801). Old F12 words (secondary hue) in git history.
    if isinstance(rank,int) and rank>=7: return ""
    intro="the sheer shawl draped behind her back and over her arms" if has_shawl else "over her outfit she wears a sheer silk shawl (phi bạch) draped behind her back and over her arms; the shawl"
    c3=phibach3(person,season)
    if c3:
        col,kind,veil=c3,"a soft pastel","a light airy veil of that soft hue"
    else:
        col,kind,veil="pale IVORY-CREAM silk","a soft neutral","a light airy ivory veil"
    # L1847 (owner): t6 Quý phi = a LITTLE less see-through than Phi and below (slightly thicker), still softly translucent (replaces G54 'much less transparent ... never see-through').
    if rank==6: return f"PHI BẠCH: {intro.replace('the sheer shawl','the shawl')} is a slightly THICKER soft silk gauze shawl in {col.replace('pale IVORY-CREAM silk','pale IVORY-CREAM')} with a THIN GOLD EDGE along its borders ({kind}, the only colour outside her two robe colours), a little LESS see-through than at the lower ranks yet still softly translucent, matching the weight of her brocade; it keeps its soft graceful drape."
    return f"PHI BẠCH: {intro} is a very sheer, highly translucent gauze shawl in {col} with a THIN GOLD EDGE along its borders ({kind}, the only colour outside her two robe colours) — the robe, sleeves and arms are clearly visible through it, so it reads as {veil}, never an opaque solid band of colour; it keeps its soft graceful drape."
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
    return ("CAPELET CUT (flowing): its lower edge and collar lines are soft CURVES, never flat; the lower edge is "+CURVE_SHAPES[_pn(person)%len(CURVE_SHAPES)]+"; "
     "the robe closes only at the throat clasp, never buttoned down the front, opening gradually in a long soft V toward the hem, graceful (uyển chuyển), never boxy.")
def collar_cut(person):
    return ("COLLAR CUT (flowing): the collar's lower edge follows soft CURVES, never flat horizontal edges: "+CURVE_SHAPES[_pn(person)%len(CURVE_SHAPES)]+"; "
     "the front is NOT closed or buttoned from top to bottom: it opens gradually from the collar downward in a long soft V, flowing and graceful (uyển chuyển), never cramped or boxy.")
HQP_LUX="HOÀNG QUÝ PHI LUXURY: richer than every lower rank: more jade, pearls, gold and a few smooth red gems on the phoenix crown, pearl and jade trims along the cape edges; still clearly simpler and less golden than the Empress."   # owner L1794 + L1799: red gems only on the crown, never on clothing (A46, S14_L1794)
INNER_EMB="INNER LAYER EMBROIDERED (t7/t8): the inner robe and skirt layer is ALSO embroidered with fine silk-thread embroidery stitched into the fabric, the motifs smaller, lighter and sparser than on the outer robe."
def item_colour(person,rank,F):
    m=re.search(r" Pose: .*?(?:holding|holds|carrying|offering|raising|with) (an? [^,.]+?)(?: in | up | raised| held| forward| beside| at |,|\.)",F)
    main=main_name(person); sec,_=secondary(person)
    return f"HELD ITEM COLOUR: the held item and any embroidery, painting or tassel on it are in a colour family clearly different from BOTH her robe colour {main} and her secondary colour {sec}."
def outfit_colours3(person):
    """B17 (owner Lượt 583): t7/t8 = THREE colours: royal yellow #EFBD69 + her MAIN and SECONDARY colour with exactly the words of her t1-t6 TWO-COLOUR sentence
    (same data: DATA main + secondary()); the B15 sentence adapted so it never says 'never a third colour'."""
    main=main_words(person); sec,_=secondary(person)
    return (f"THREE-COLOUR RULE (t7/t8): the whole outfit uses EXACTLY THREE colours that clearly interact: the royal golden yellow (honey-gold like #EFBD69), the MAIN colour {main} and the SECONDARY colour {sec}, "
            "the secondary clearly visible in large areas (inner robe or skirt, wide borders, sash, cuffs, linings), never a single flat colour all over; gold or silver only as thin accents, no other colour.")
def extras(S0,person,rank):
    L=[]
    if isinstance(rank,int):
        L.append(outfit_colours(person) if rank<=6 else outfit_colours3(person))   # B15 two-colour sentence verbatim: t1-t6 (Lượt 489/499) + t7 HQP / t8 HH (G14, owner Lượt 529: the secondary disappeared at t7/t8)
        L.append(item_colour(person,rank,S0))
        if rank==7: L.append(HQP_LUX)
        if rank in (7,8): L.append(INNER_EMB)   # G20 owner 20/11 ~08:02Z: "Ghi vào, Hoàng Quý Phi và Hoàng hậu lớp áo trong cũng phải theo nha."
    if isinstance(rank,int) and rank<=6:
        if G36_PHIBACH: L.append(phi_bach(person,"shawl" in S0,rank))   # G36 (owner L1446): builder output = xuân (current Hán set) / đông -> no phi bạch; phi_bach() kept for hạ/thu builders   # owner Lượt 397 via ROOT-47: phi bạch on EVERY thường phục rank t1-t6 (consorts and princesses), also where the store text has no shawl; never t7/t8/Nữ đế/triều phục
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
def grace_sentence(person,rank,age="a18"):
    return "GRACE (pose variety, every rank its own): "+GRACE[plan(age)[(ALIAS.get(person,person),rank)][2]]+"."   # E12 (BW6): this age's plan
_POSE_MEMO={}
def _pose_tpl(g,tr,j,adapt=True):
    """spec5 entry verbatim; adapt=True -> SPEC5_ADAPT whenever the entry is listed there (also the lantern+item entry, which carries {prop}: one held item only, FIGURE_GATE D3)."""
    if tr=="p30": return P30[j][1]   # E4: the 30 new poses (POSES_30.md verbatim, 'the item' = {prop})
    r_=g["SPEC5_POSES"][tr][j]
    if adapt and r_ in g["SPEC5_ADAPT"]: return g["SPEC5_ADAPT"][r_]
    return r_ if "{prop}" in r_ else g["SPEC5_ADAPT"][r_]
PET_RX=r"songbird|\bbird|kitten|\bcat\b|rabbit|parrot|puppy|\bpet\b"   # RANK8-C (owner rule via ROOT-68 20/11): NO pet at t7 Hoàng quý phi / t8 Hoàng hậu
S_NEW_SET={"s62","s64","s65"}|{"s%02d"%i for i in range(7,62)}|{"s63"}   # T78-PREP: + s07-s61, s63 (pet ban t7/t8, grammar fix)
S_NEW_SET=S_NEW_SET   # applied to the new people only for now (c02 t8, c13 t7 still draw a songbird: reported to ROOT-68)
def _banned(t,age,prop=""):
    """E4 (owner Lượt 529 + correction Lượt 534): t4+ may draw ANY of the 66 poses; walking/stepping poses ALLOWED at every rank (the Lượt 486 t6+ walking ban
    and the t6+/a51+ calm skips are replaced by the rank's restraint ENDING, see POSE_END). Still banned (other current rules, not E4):
    E2 no look-back over the shoulder · FIGURE_GATE D3d never looking down · G4 no shawl/stole/sash drape at t7/t8 · item logic ('reading'/'open' only with a book/scroll/fan)."""
    b=[r"look(?:ing)? back",r"glancing back",r"back over her shoulder",r"looking down"]
    if t>=7: b+=[r"stole",r"ribbon",r"sash",r"shawl"]   # G4 (+ "shawl": POSES_30 M8, check_store X05) / Lượt 486: no shawl-like drape on t7/t8 (owner saw "cái dây" on m13 t8 = pose 'a breeze lifts her long stole')
    if not re.search(r"book|scroll",prop): b+=[r"reading"]
    if not re.search(r"fan|book|scroll",prop): b+=[r" open "]
    return b
# ---------------- E4 POSE POOL (owner Lượt 529/534): 36 old spec5 poses + 30 new (dev/art/POSES_30.md) = 66 ----------------
def _p30():
    """the 30 new poses COPIED from dev/art/POSES_30.md (L1-L10 lively, M1-M10 medium, C1-C10 calm); only 'the item' -> {prop} (the rank's held item)."""
    out=[]
    for l in open(os.path.join(ART,"POSES_30.md"),encoding="utf-8"):
        m=re.match(r"^([LMC])(\d+) (.+?)\s*$",l)
        if m:
            assert m.group(3).count("the item")==1,("POSES_30 'the item'",l)
            out.append((m.group(1)+m.group(2),m.group(3).replace("the item","{prop}")))
    assert len(out)==30,("POSES_30 count",len(out)); return out
P30=_p30()
# t1-t3 draw ONLY lively/airy poses: POSES_30 L1-L10 + every old spec5 pose with movement words (walking/stepping/twirl/dance/sway/breeze/flutter...).
LIVELY_RX=r"walk|step|skip|twirl|danc|sway|swirl|breeze|flutter|float|flowing|swinging|trailing|butterfly|songbird"
def lively(o):
    tr,j=o
    if tr=="p30": return P30[j][0][0]=="L"
    return bool(re.search(LIVELY_RX,_pose_tpl(LAST_G,tr,j)))
# ENDING at the END of the pose sentence (E4 alt framing, owner: "low 3 lively / middle 3 / top 2 calm endings"; wording = POSE_GROUPS.md Lượt 501 endings)
# G23 (owner 20/11 verbatim: "Sửa cái prompt, cái chân lại cho nó phù hợp đi."): ONE motion per prompt: a walking pose never ends with "still and straight";
# walking -> the hem sways with the step; standing -> the t7+ calm ending. Same walk words as the check_store G23 gate (WALK_RX).
WALK_RX=re.compile(r"\bwalk(?:s|ing)?\b|mid-step|\bstep(?:s|ping)?\b(?! stool)|\bstrid(?:e|es|ing)\b|\bstroll",re.I)
def pose_end(t,pose=""):
    if t>=7 and WALK_RX.search(pose): return "the robe hem swaying gently with her step"
    return "the skirt hem swinging softly" if t<=3 else "the robe hem stirring slightly" if t<=6 else "the robe falling still and straight"
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
    """(planned template, prop, store template, store body): Lượt 476 the pose is the seeded-random plan pick (not the store's rank-tied spec5 slot)."""
    key=(person,rank,age)
    if key in _POSE_MEMO: return _POSE_MEMO[key]
    S=_clean_pose(store(person,rank,age)); g=LAST_G
    sp,prop,body=_store_pose(g,S)
    _POSE_MEMO[key]=(plan(age)[(person,rank)][1],prop,sp,body); return _POSE_MEMO[key]
# ---------------- Lượt 476 PLAN: angle / pose / grace NOT tied to the rank ----------------
# Owner Lượt 476 (via ROOT-48): "standing ANGLE (and pose/gesture) must NOT be tied to the rank" -> per (person, rank) a SEEDED RANDOM draw (seed = person id + rank,
# reproducible), no repeat inside one person's 8 ranks, spread across people so a rank never shares one angle for everyone. Method (one global pass over PEOPLE in fixed order):
# for each person, ranks are visited in a seeded order; each rank takes, among the options still unused by that person (and, for poses, allowed at that rank/age/item and not
# sharing a gesture key with her other ranks), the option used LEAST so far at that rank over all people; ties broken by random.Random(person+rank). -> 8 distinct per person,
# per-rank counts balanced (angles 87/14 ≈ 6.2 per cell). Same for the 36 spec5 poses (verbatim entries + ADAPT/FRONTAL) and the 8 GRACE lines. Replaces ANG[(t-1+(n-1))%14] here.
import random as _random
_PLAN={}
def plan(age="a18"):
    if age in _PLAN: return _PLAN[age]
    store("c06",1,age); g=LAST_G
    allp=[(L,j) for L in g["_SP5_ORDER"] for j in range(6)]+[("p30",j) for j in range(30)]   # E4: 66 poses
    def item(c,t):
        it=g["age_item"](c,"t%d"%t,None,None); return it[0] if isinstance(it,tuple) else it
    ca={t:{k:0 for k in range(14)} for t in range(1,9)}; cp={t:{k:0 for k in allp} for t in range(1,9)}; cg={t:{k:0 for k in range(8)} for t in range(1,9)}
    P={}
    for c in PEOPLE:
        rr=list(range(1,6)); _random.Random(c+"-order").shuffle(rr); rr=[8,7,6]+rr; ua=set(); up=[]; ug=set()   # Lượt 486: the calm ranks choose first from the small calm pool; ua=set(); up=[]; ug=set()
        for t in rr:
            R=_random.Random(f"{c}-{t}")
            def best(opts,cnt):
                opts=list(opts); R.shuffle(opts); return min(opts,key=lambda o:cnt[t][o])
            a=best([k for k in range(14) if k not in ua],ca); ua.add(a); ca[t][a]+=1
            prop=item(c,t); keys=set().union(*[_keys(_pose_tpl(g,*u)) for u in up]) if up else set()
            ok0=[o for o in allp if o not in up and (t>=4 or lively(o)) and not any(re.search(q,_pose_tpl(g,*o)) for q in _banned(t,age,prop)+([PET_RX] if (t>=7 and c in S_NEW_SET) else []))]   # E4: t1-t3 lively only
            ok=[o for o in ok0 if not (_keys(_pose_tpl(g,*o))&keys)] or ok0
            pz=best(ok,cp); up.append(pz); cp[t][pz]+=1
            gr=best([k for k in range(8) if k not in ug],cg); ug.add(gr); cg[t][gr]+=1
            P[(c,t)]=(a,pz,gr)
    # A41 (owner Lượt 1411 'nobody wears a necklace', B26FAB4 item 6): a cell whose plan pose touches a necklace (POSES_30 C6) gets ANOTHER allowed pose AFTER the
    # plan is made, so every other cell keeps exactly its old pose (least-used at that rank, not used by her other ranks, same bans / gesture keys as above).
    for c in PEOPLE:
        for t in range(1,9):
            a,pz,gr=P[(c,t)]
            if not re.search(r"necklace",_pose_tpl(g,*pz)): continue
            up=[P[(c,u)][1] for u in range(1,9)]; prop=item(c,t); keys=set().union(*[_keys(_pose_tpl(g,*u)) for u in up if u!=pz])
            ok0=[o for o in allp if o not in up and (t>=4 or lively(o)) and not re.search(r"necklace",_pose_tpl(g,*o)) and not any(re.search(q,_pose_tpl(g,*o)) for q in _banned(t,age,prop)+([PET_RX] if (t>=7 and c in S_NEW_SET) else []))]
            ok=[o for o in ok0 if not (_keys(_pose_tpl(g,*o))&keys)] or ok0
            R=_random.Random(f"{c}-{t}-A41"); ok=list(ok); R.shuffle(ok); nz=min(ok,key=lambda o:cp[t][o]); cp[t][pz]-=1; cp[t][nz]+=1; P[(c,t)]=(a,nz,gr)
    # G36 (owner L1446, B26FAB5): no phi bạch in the builder (xuân/đông) -> a cell whose plan pose rests a hand on the draped shawl (POSES_30 M8) gets another
    # allowed pose the same way as A41, in a SECOND pass after it (so the A41 re-picks and every other cell keep exactly their pose).
    for c in PEOPLE:
        for t in range(1,9):
            a,pz,gr=P[(c,t)]
            if not re.search(r"draped shawl",_pose_tpl(g,*pz)): continue
            up=[P[(c,u)][1] for u in range(1,9)]; prop=item(c,t); keys=set().union(*[_keys(_pose_tpl(g,*u)) for u in up if u!=pz])
            ok0=[o for o in allp if o not in up and (t>=4 or lively(o)) and not re.search(r"necklace|shawl",_pose_tpl(g,*o)) and not any(re.search(q,_pose_tpl(g,*o)) for q in _banned(t,age,prop)+([PET_RX] if (t>=7 and c in S_NEW_SET) else []))]
            ok=[o for o in ok0 if not (_keys(_pose_tpl(g,*o))&keys)] or ok0
            R=_random.Random(f"{c}-{t}-G36"); ok=list(ok); R.shuffle(ok); nz=min(ok,key=lambda o:cp[t][o]); cp[t][pz]-=1; cp[t][nz]+=1; P[(c,t)]=(a,nz,gr)
    # G45 (owner L1622 21/11, POSEFIX1): POSES_30 M6 (hand adjusting the belt pendant) + C3 (hands folded under the long sleeves) are DROPPED: a cell whose plan
    # pose is one of them gets another allowed pose the same way as A41/G36, in a THIRD pass after them (every other cell keeps exactly its pose).
    for c in PEOPLE:
        for t in range(1,9):
            a,pz,gr=P[(c,t)]
            if not re.search(r"DROPPED G45",_pose_tpl(g,*pz)): continue
            up=[P[(c,u)][1] for u in range(1,9)]; prop=item(c,t); keys=set().union(*[_keys(_pose_tpl(g,*u)) for u in up if u!=pz])
            ok0=[o for o in allp if o not in up and (t>=4 or lively(o)) and not re.search(r"necklace|draped shawl|DROPPED G45",_pose_tpl(g,*o)) and not any(re.search(q,_pose_tpl(g,*o)) for q in _banned(t,age,prop)+([PET_RX] if (t>=7 and c in S_NEW_SET) else []))]
            ok=[o for o in ok0 if not (_keys(_pose_tpl(g,*o))&keys)] or ok0
            R=_random.Random(f"{c}-{t}-G45"); ok=list(ok); R.shuffle(ok); nz=min(ok,key=lambda o:cp[t][o]); cp[t][pz]-=1; cp[t][nz]+=1; P[(c,t)]=(a,nz,gr)
    # E12 (owner Lượt 650/656, ROOT-54 ruling (b), BW6): inside each LOOK GROUP the angle and grace of THIS age are replaced by the group plan
    # (different angle sentence per person at one rank, <=2 per visual class, different grace line; E1 no repeat inside one person). Poses: untouched.
    for name,mem in g["look_groups"]().items():
        mem=[c for c in mem if c in PEOPLE]
        if not mem: continue
        cls=[ang_class(x) for x in g["ANG14"]]
        old=[c for c in mem if c not in S_NEW_SET]   # FRUITPET2 (ROOT-69 BEFORE MASS (a)): s62/s64/s65 joined their owner groups (OWNER_GROUPS_L686) -> the people already in the group keep
        A=group_angles(name,old,age,cls)              # EXACTLY their old angle plan; the newcomers are fitted into the free slots under the same E1/E12 caps (group_angles_add)
        mem1=[c for c in mem if c not in S_NEW2]   # T78-PREP: s62/s64/s65 keep EXACTLY their RANK8-C plan (already drawn): the old fit first, without the T78 newcomers
        if len(old)<len(mem1): A=group_angles_add(name,mem1,old,age,cls,A)
        if len(mem1)<len(mem): A=group_angles_add(name,mem,mem1,age,cls,A)   # then s07-s61/s63 into the free slots (same caps, full group)
        Gr=group_grace(name,mem1+[c for c in mem if c in S_NEW2],age)   # newcomers take the next Latin-square rows, the earlier members keep theirs
        for c in mem:
            for t in range(1,9):
                a,pz,gr=P[(c,t)]; P[(c,t)]=(A[(c,t)],pz,Gr.get((c,t),gr))
    _PLAN[age]=P; return P
def ang_class(s):
    """visual class of an ANG14 sentence: frontal / slight left|right / 3/4 left|right (E12: at most 2 per class inside a group at one rank)."""
    side=re.search(r"\b(RIGHT|LEFT)\b",s); side=side.group(1).lower() if side else ""
    if "THREE-QUARTER" in s: return "3/4 "+side
    if "FRONTAL" in s and "SLIGHT" not in s: return "frontal"
    return "slight "+side
_CYCLE={}
def _ang_cycle(cls):
    """cyclic order of the 14 ANG14 indices that spreads the visual classes (seeded search, deterministic) + per window length r the max class count."""
    key=tuple(cls)
    if key in _CYCLE: return _CYCLE[key]
    import collections
    m=len(cls); sz=collections.Counter(cls); R=_random.Random("E12-angle-cycle"); best=None
    def win(Pp):
        W={}
        for r in range(m+1):
            W[r]=max(collections.Counter(cls[Pp[(a+b)%m]] for b in range(r)).get(k,0) for a in range(m) for k in sz) if r else 0
        return W
    for _ in range(2000):
        Pp=list(range(m)); R.shuffle(Pp); W=win(Pp); sc=sum(W.values())
        if best is None or sc<best[0]: best=(sc,Pp,W)
    _CYCLE[key]=(best[1],best[2]); return _CYCLE[key]
def e12_caps(n,cls):
    """E12 caps inside a group of n at one rank + age: (item/grace, angle sentence, angle class).
    item/grace = ceil(n/8); angle sentence = ceil(n/14); class: n <= 14 -> 2 up to 10 people, then the smallest cap with one spare slot;
    n > 14 -> the bound of the cyclic construction (full laps x class size + the most of one class in a window of n mod 14)."""
    import math,collections
    ca=math.ceil(n/len(cls)); sz=collections.Counter(cls)
    if n<=len(cls):
        cc=2
        while sum(min(k*ca,cc) for k in sz.values())<n+(n>10) and cc<max(sz.values())*ca: cc+=1
    else:
        q,r=divmod(n,len(cls)); W=_ang_cycle(cls)[1]; cc=max(sz.values())*q+W[r]
    return math.ceil(n/8),ca,cc
def group_angles(name,mem,age,cls):
    """E12: people x ranks grid of ANG14 indices. Each rank: each sentence <= ceil(n/14) (all different up to 14 people), each class <= e12_caps (2 up to 10 people);
    each person: 8 different (E1). n <= 14: deterministic seeded backtracking. n > 14: members in a seeded order, person i at rank t = CYCLE[(i + t + shift) % 14]
    (8 consecutive cycle positions -> 8 different per person; every sentence ceil or floor of n/14 per rank)."""
    A={}
    if len(mem)>len(cls):
        Pp=_ang_cycle(cls)[0]; R=_random.Random(f"E12-angle-{name}-{age}"); order=list(mem); R.shuffle(order); sh=R.randrange(len(cls))
        for i,c in enumerate(order):
            for t in range(1,9): A[(c,t)]=Pp[(i+t-1+sh)%len(cls)]
        return A
    cells=[(c,t) for t in range(1,9) for c in mem]; _,ca,cc=e12_caps(len(mem),cls); nodes=[0]
    def ok(c,t,v):
        if any(A.get((c,u))==v for u in range(1,9)): return False
        col=[A[(d,t)] for d in mem if (d,t) in A]
        return col.count(v)<ca and sum(cls[x]==cls[v] for x in col)<cc
    def go(i):
        if i==len(cells): return True
        nodes[0]+=1
        if nodes[0]>200000: return False
        c,t=cells[i]; vals=list(range(len(cls))); _random.Random(f"E12-angle-{name}-{age}-{c}-{t}").shuffle(vals)
        for v in vals:
            if ok(c,t,v):
                A[(c,t)]=v
                if go(i+1): return True
                del A[(c,t)]
        return False
    assert go(0),("E12 angle plan not found",name,age,len(mem))
    return A
def group_angles_add(name,mem,old,age,cls,A):
    """FRUITPET2: extend the angle plan A of the old members by the newcomers (mem minus old) without touching A:
    each newcomer 8 different (E1); each rank: each sentence / class within e12_caps of the FULL group (n = len(mem)). Seeded backtracking, deterministic."""
    A0=dict(A); new=[c for c in mem if c not in old]; _,ca,cc=e12_caps(len(mem),cls)
    cells=[(c,t) for c in new for t in range(1,9)]
    # when the old plan leaves too few free slots (Dịu dàng a26: 15 usable for 16), a newcomer may repeat a sentence already used at that rank,
    # as FEW times as possible (dup budget 0, 1, 2, ...); the old members never move. Such cells are listed in ANGLE_ADD_DUPS (report / E12 audit).
    for dupmax in range(0,len(cells)+1):
        A=dict(A0); nodes=[0]; dups=[]
        def ok(c,t,v):
            if any(A.get((c,u))==v for u in range(1,9)): return False
            col=[A[(d,t)] for d in mem if (d,t) in A]
            if sum(cls[x]==cls[v] for x in col)>=cc: return False
            return col.count(v)<ca or (col.count(v)<ca+1 and len(dups)<dupmax)
        def go(i):
            if i==len(cells): return True
            nodes[0]+=1
            if nodes[0]>200000: return False
            c,t=cells[i]; vals=list(range(len(cls))); _random.Random(f"E12-angle-add-{name}-{age}-{c}-{t}").shuffle(vals)
            vals.sort(key=lambda v:[A[(d,t)] for d in mem if (d,t) in A].count(v))   # free sentences first
            for v in vals:
                if ok(c,t,v):
                    d=[A[(x,t)] for x in mem if (x,t) in A].count(v)>=ca
                    A[(c,t)]=v
                    if d: dups.append((c,t))
                    if go(i+1): return True
                    del A[(c,t)]
                    if d: dups.pop()
            return False
        if go(0):
            if dups: ANGLE_ADD_DUPS[(name,age)]=list(dups)
            return A
    raise AssertionError(("E12 angle add not found",name,age,new))
ANGLE_ADD_DUPS={}
def group_grace(name,mem,age,K=8):
    """E12: Latin square over members (sorted) x 8 ranks: every person 8 different lines; member i uses row i % 8 -> every rank each line at most ceil(n/8) times."""
    R=_random.Random(f"E12-grace-{name}-{age}"); rp=list(range(K)); cp=list(range(K)); sp=list(range(K)); R.shuffle(rp); R.shuffle(cp); R.shuffle(sp)
    return {(c,t):sp[(rp[i%K]+cp[t-1])%K] for i,c in enumerate(mem) for t in range(1,9)}
def apply_dedupe(person,rank,age,S):
    pick,prop,sp,body=dedupe_pick(person,rank,age)
    store(person,rank,age)   # LAST_G back to this rank
    g=LAST_G
    if not (pick==sp and _pose_tpl(g,*pick)==_pose_tpl(g,*pick,adapt=False)):
        new=_frontal(g,_pose_tpl(g,*pick)).format(prop=prop)
        if person in S_NEW_SET: new=re.sub(r"held in the hand in (one hand|both hands)",r"held in \1",new)   # RANK8-C (c): grammar
        a=" Pose: "+body; assert S.count(a)==1,("pose slot",person,rank)
        S=S.replace(a," Pose: "+new,1)
    # E4 (Lượt 529/534): the rank's ending at the END of the pose sentence (pose slot)
    i=S.index(" Pose: "); j=S.index(". The item is in a contrasting colour",i)
    global G45_HAD; G45_HAD=G45_SLEEVE in S[i:j]; P=S[i:j].replace(G45_SLEEVE,"")   # G45: the sleeve / jade clause goes in AFTER the length fit (g45_post)
    return S[:i]+P+", "+pose_end(rank,P)+S[j:]
# G45 JADE PENDANT VISIBLE (owner L1622 21/11, POSEFIX1): COVER/RISK poses end with G45_SLEEVE (POSES_30.md + build.py SPEC5); a prompt that names a jade pendant
# instead gets the ONE shared clause master_common.JADE_CLEAR at the end of the pose slot; both are added AFTER the B26 length fit and only while the prompt stays
# <= 10 000 (else the shorter G45_SLEEVE goes back in, else nothing; the cell is logged in G45_OVER): G45 never makes the fit cut a sentence (A38).
G45_SLEEVE=", her sleeves kept clear of the front of her waist"
G45_JADE_RX=re.compile(r"\bjade pendants?\b",re.I)
G45_OVER=[]; G45_HAD=False
def g45_post(S,tag=""):
    sys.path.insert(0,ART); import master_common as _MC
    jade=bool(G45_JADE_RX.search(S.split(" Pose: ")[0])); had=G45_HAD   # BUILDFIX1: a HELD jade pendant (Pose sentence, free under G57/L1979) is not a body pendant -> no 'at her waist' clause
    if not (jade or had) or _MC.JADE_CLEAR in S or " Pose: " not in S: return S
    i=S.index(" Pose: "); j=S.find(". The item is in a contrasting colour",i)
    if j<0: j=S.index(". ",i)   # Nữ đế / other paths: end of the pose sentence
    for add in ((", "+_MC.JADE_CLEAR) if jade else None, G45_SLEEVE if had and G45_SLEEVE not in S[i:j] else None):
        if add and len(S)+len(add)<=10000: return S[:j]+add+S[j:]
    G45_OVER.append((tag,len(S),"jade" if jade else "sleeve")); return S
TQ_RIGHT=", body turned slightly three-quarters to the right"
def _clean_pose(S):
    """Lượt 440: the store's pose pass appends 'body turned slightly three-quarters to the right' at every odd pose slot (why almost everybody faced right); the ANGLE sentence (14 standing angles, left AND right) replaces it."""
    return S.replace(TQ_RIGHT,"")
def _sec_slot(person,rank,S):
    """Lượt 483 slot REPLACE (colour slot of the store COLOUR RULE, t1-t6): the secondary is no longer only 'in the inner robe and linings'."""
    if not isinstance(rank,int): return S
    sec,_=secondary(person)
    _w7=_season_pal(person); _m7=re.search(r"with ([^;]+?) in the linings",S)
    if rank>=7 and _w7 and _m7 and " like #" in _m7.group(1) and " like #" not in sec: sec=f"{sec} like {_w7['sec_hex']}"   # BUILDFIX3: same family as the t1-t6 ORIG1 fix: keep her season hex where the store clause has one
    if rank>=7:   # B17: no stale 'silver #E2C3C5 in the linings' line: the linings clause carries her t1-t6 secondary words
        S,k=re.subn(r"with [^;]+? in the linings",f"with {sec} in the inner robe and linings",S,count=1); assert k==1,("t7/t8 linings slot",person,rank); return S
    if rank<=3 and re.search(r"\babout (36|51|65)\b",S):   # F11 (owner Lượt 583): at a36/a51/a65 the t1-t3 hair line says hair UP (the thiếu-nữ ref has loose hair)
        _h="Hair: her own hairstyle exactly as in her first reference, with"; assert S.count(_h)==1,("t1-3 hair slot",person,rank)
        S=S.replace(_h,"Hair: her own hair colour, ALL her hair swept UP into a bun / chignon (nothing hanging loose down her back), with",1)
    elif rank<=3:   # owner reference law (ROOT-51 -> BW4): the hairstyle never comes from the reference; a18/a26 t1-t3 = loose (F11), said in words
        _h="Hair: her own hairstyle exactly as in her first reference, with"; assert S.count(_h)==1,("t1-3 young hair slot",person,rank)
        S=S.replace(_h,"Hair: her own hair colour, LOOSE and flowing (at most the top half gathered up, most of her hair hanging down her back), with",1)
    else:   # t4-t6 (HAIR_HIGH rank law): hair UP, said in words, not "her own hairstyle"
        _h="Hair: her own hairstyle decorated with"; assert S.count(_h)==1,("t4-6 hair slot",person,rank)
        S=S.replace(_h,"Hair: her own hair colour, ALL her hair swept UP into a high bun / chignon, decorated with",1)
    _w=_season_pal(person); _m=re.search(r"with ([^;]+?) in the inner robe and linings",S)
    if _w and _m and " like #" in _m.group(1) and " like #" not in sec: sec=f"{sec} like {_w['sec_hex']}"   # BUILDFIX3: ORIG1 persons (s22 s27 s29 s32 s38 s51 s61): the store clause carries 'secondary like #hex' (season palette swap) -> keep her season hex, as at her root
    S=re.sub(r"with [^;]+? in the inner robe and linings",f"with {sec} in the inner robe and linings",S,count=1)   # colour slot swap only (no new wording, Lượt 489)
    for _a,_b in F13_SWAP: S=S.replace(_a,_b)   # F13 one hair flower
    return _t3_slot(person,rank,S)
# G15 (owner Lượt 559): QUÝ NHÂN t3 DESIGN = option B v2 -> dev/art/check_store.py g15_t3 (one copy of the wording, shared with the gate).
def _t3_slot(person,rank,S):
    if rank!=3: return S
    import importlib.util as _iu
    _sp=_iu.spec_from_file_location("check_store",os.path.join(ART,"check_store.py")); _cs_mod=_iu.module_from_spec(_sp); _sp.loader.exec_module(_cs_mod)
    main=main_name(person); sec,_=secondary(person)
    return _cs_mod.g15_t3(S,main,sec,LAST_G.get("AGE","a18"))   # G21: crossed collar at a36/a51/a65
class NotDrawn(Exception): pass
# SEASON (owner 20/11 ~16:50Z: "áp dụng cái prompt mới … Đưa vào trong cái prompt chính vào cái máy duyệt prompt luôn đi"): đông = G25 (t1-t3 old crossed
# collar) + G28 (t1-t6 opaque silk) + G26 (fur ladder Lông 1/2/3); words live in dev/art/winter_g28.py (one copy, shared with check_store.py).
def build_season(person,rank,age="a18",season=None):
    """HQP COLLAR (L1384): t7 cells that fitted but go over with the long LAYERED NECKLINE get the compact form (make_thu_comoi.py SHORT, same meaning)."""
    global HQP_SHORT
    r=_build_season(person,rank,age,season)
    if rank==7 and len(r[1])>10000 and b26_fit_ok(person,rank,age,season):
        HQP_SHORT=True
        try: r=_build_season(person,rank,age,season)
        finally: HQP_SHORT=False
    if season and age in _LN.AGES: r=(r[0],_LN.post(r[1])[0])+tuple(r[2:])   # G76 (owner L2228) season cells, last step
    return r
def _build_season(person,rank,age="a18",season=None):
    global SEASON_PAL,G36_PHIBACH,PHIBACH_SEASON
    if not season: return build(person,rank,age)
    assert season in SEASONS,("--season must be one of",SEASONS)
    SEASON_PAL=season   # PALFIX c3: every store run of this season cell (incl. the G25 a36 build) uses her B20 palette of that season
    G36_PHIBACH,PHIBACH_SEASON=(season in ("ha","thu")),season   # G36 (owner L1446): phi bạch only in hạ + thu; colour = phibach_3rd_L1821.json (L1834)
    G76_ON[0]=age in _LN.AGES
    try: return _build_season2(person,rank,age,season)
    finally: SEASON_PAL=None; G36_PHIBACH,PHIBACH_SEASON=False,None; G76_ON[0]=False
# BUILDFIX2: season words after the store text. (1) a season that is not her root season no longer keeps the colour of image 1 (her reference) ->
# the 'ORIGINAL robe colour is kept exactly as in image 1 (her first reference): ' clause is dropped, the colour words after it stay (approved thu files
# s62_t1_THU_fix_L2008 … read the same). (2) the store's fixed ', NOT green' after a main colour that is itself green (palette 'light olive green') is
# dropped, as the store's own outfit() already does for green palettes.
_ORIG_RX=re.compile(r"her ORIGINAL robe colour is kept exactly as in image 1 \(her first reference\): ")
G76_ON=[False]   # G76 (owner L2228): True while a builder a18-a36 season cell is built (never on the check_store store side)
def season_post(S,person,season,strict=True):
    d=B20.get(ALIAS.get(person,person),{}); notes=[]
    if season!=d.get("root_season"):
        S,k=_ORIG_RX.subn("",S)
        if k: notes.append("season: image-1 colour clause dropped")
    w=d.get(season) or {}
    m=w.get("main","")
    if m and any(g in m for g in ("green","celadon","jade","teal","mint","sage","aqua")):
        S,k=re.subn(r"\("+re.escape(m)+r", NOT green\)","("+m+")",S)
        if k: notes.append("season: NOT green dropped (green main)")
    if season=="thu" and isinstance(_SP_RANK[0],int) and 1<=_SP_RANK[0]<=8: S,_n=thu_sentences(S,person,_SP_RANK[0],strict); notes+=_n
    sys.path.insert(0,ART); import master_common as _MCv; S,_vk=_MCv.l2119_post(S,_SP_RANK[0]); notes+=_vk
    if season=="thu": S,_b32=_MCv.b32_post(S,_SP_RANK[0]); notes+=_b32   # BUILDFIX5 B32 (owner L2122 CHỐT): thu t6-t8 = the t1-t5 thu fabric words   # BUILDFIX5 L2105/L2119: again after the thu ladder words (they carry TWO-TIER / STIFF / cape)
    if G76_ON[0]: S=_LN.post(S)[0]   # G76 (owner L2228) builder a18-a36 cells: before the thu length trims (check_store reads the store via store_swap)
    if season=="thu" and strict:
        for bp in THU_TRIMS+THU_TRIMS_RANK.get(_SP_RANK[0],()):   # length: the boilerplate the owner-approved thu files already go without (A38 trims listed in their .keep)
            if len(S)>10000 and bp in S: S=S.replace(bp,"",1); notes.append("thu trim "+bp[:30])
    return S,notes
THU_TRIMS=("An imperial consort. ","Everyone beautiful at every age. ","Everyone beautiful at every age.")
# BUILDFIX3: t6 = the dedup trim of the approved VE12 L2088 file (.keep allow 'Image 2 is only a colour reference for the royal yellow' …: the Outfit words
# already say 'the royal yellow is exactly the colour of the flat colour swatch image (image 2 …)')
THU_TRIMS_RANK={6:("Image 2 is only a colour reference for the royal yellow, never copy anything but its colour; the royal yellow in the robe is exactly that colour. ",
                   "Image 2 is only a colour reference for the royal yellow, never copy anything but its colour; the royal yellow in the robe is exactly that colour."),
                7:("; the royal yellow in the robe is exactly that colour",), 8:("; the royal yellow in the robe is exactly that colour","An imperial consort, the Empress. ")}   # t8 2nd: boilerplate identity line (ROOT-B2 21/11 'trim boilerplate'; same kind as THU_TRIMS 'An imperial consort.')   # t7/t8: approved L2023 form keeps 'Image 2 is only a colour reference …, never copy anything but its colour' and drops this clause
_SP_RANK=[None]   # rank of the season cell being built (set by _build_season2)
CAPTION='CAPTION: in LARGE bold letters, top-left corner, on the plain background, never over her body, write exactly this Vietnamese text WITH accents: "{}"'   # approved thu-file sheet label form
THU_MARK=("straight SQUARE collar","straight SQUARE NECKLINE (a LOW open square neckline")   # G53 thu ladder words (t1-t6); BUILDFIX3: the bare 'straight SQUARE NECKLINE' is also in the G15 t3 option-B words of EVERY season -> every t3 cell was read as thu (t3 store gate FAIL 112/112 in root/xuân/hạ)
def is_thu(text): return any(m in text for m in THU_MARK) and "WINTER:" not in text
def season_store(store,person,rank,season):
    """check_store STORE part: the same season words on the store text (palette swap + season_post) as the builder used."""
    global SEASON_PAL
    person=ALIAS.get(person,person); wp=winter_pairs(person,season)
    if wp: store=b20_winter_words(store,wp)
    if "hairflower_species" not in (globals().get("LAST_G") or {}): globals()["store"](person,1)   # loads LAST_G (store tables)
    _o=SEASON_PAL; SEASON_PAL=season; _SP_RANK[0]=rank
    try: store,_=season_post(store,person,season,strict=False)
    finally: SEASON_PAL=_o
    return store
# BUILDFIX2: THU t1-t5 = the owner-approved thu ladder words (G53 square collar all tiers, owner L1747; s62 approved files, store-all/thu_ladder.py),
# filled with HER slots: palette thu main/sec (names exact), F2 species of the rank, F20 thu hair colour of the rank.
import importlib.util as _iu3
_sp3=_iu3.spec_from_file_location("thu_ladder",os.path.join(HERE,"thu_ladder.py")); THU=_iu3.module_from_spec(_sp3); _sp3.loader.exec_module(THU)
def thu_slots(person,rank):
    p=ALIAS.get(person,person); sp=LAST_G["hairflower_species"](p,rank)
    main=main_name(p); sec=secondary(p)[0]   # her thu palette when she has one (B20), else her own DATA colours (maids m01… have no season palette)
    hx=F20.get(p,{}).get("thu",{}).get("hair_by_tier",{}).get(f"t{rank}")
    assert sp,("thu slots: no F2 species",person,rank)
    g=any(x in main for x in ("green","celadon","jade","teal","mint","sage","aqua"))
    return dict(main=main,sec=sec,notgreen="" if g else ", NOT green",sp=sp[0],hsp=sp[0],spl=sp[1],hc=f20_name(hx) if hx else "fresh")
def thu_slots78(person,S):
    """t7/t8 slots: main / secondary names (palette thu EXACT, as t1-t6) + main hex from her own builder COLOUR RULE (maids without palette: their own)."""
    p=ALIAS.get(person,person); main=main_name(p); sec=secondary(p)[0]
    m=re.search(r"COLOUR RULE: all colours[^.]*?silk like (#[0-9A-Fa-f]{6})",S); w=_season_pal(p)
    hx=(w or {}).get("main_hex") or (m.group(1) if m else None); assert hx,("thu t7/t8: no main hex",person)
    return dict(main=main,sec=re.sub(r" like #[0-9A-Fa-f]{6}$","",sec),hex=hx)
def _sent_rx(kind): return re.compile(r"(?:(?<=^)|(?<=\. ))"+re.escape(kind)+r"[^\n]*?\.(?= [A-Z]|$)")
def thu_sentences(S,person,rank,strict=True):
    notes=[]; sl=thu_slots(person,rank) if rank<=6 else thu_slots78(person,S)
    new=THU.fill(rank,sl)
    for kind,sent in new.items():
        m=_sent_rx(kind).search(S)
        if m: S=S[:m.start()]+sent+S[m.end():]; notes.append("thu ladder "+kind.strip(" (:"))
        elif kind=="NO BIG FLOWERS: ":
            h=_sent_rx("Hair: ").search(S); assert h or not strict,("thu: no Hair sentence",person,rank)
            if h: S=S[:h.end()]+" "+sent+S[h.end():]; notes.append("thu ladder NO BIG FLOWERS (added)")
        elif kind in THU.ADD_R.get(rank,()):
            j=S.find(" No text, no labels."); j=j if j>=0 else len(S.rstrip())
            S=S[:j]+" "+sent+S[j:]; notes.append("thu ladder ADD "+kind.strip(" :"))
        elif strict: raise AssertionError(("thu: builder sentence not found",kind,person,rank))
    for kind in THU.DROP_R.get(rank,()):
        m=_sent_rx(kind).search(S)
        if m: S=(S[:m.start()]+S[m.end():]).replace("  "," "); notes.append("thu ladder DROP "+kind)
    if rank==4: S=THU.capelet_thu(S); notes.append("thu L2041 CAPELET CUT (open front)")
    if rank==6: S=THU.colour_t6(S); notes.append("thu COLOUR RULE cloud collar (no cape, L2119); refs "+" + ".join(THU.refs(6)))
    if rank>=7: notes.append("thu refs "+" + ".join(THU.refs(rank)))
    return S,notes
def _build_season2(person,rank,age,season):
    assert isinstance(rank,int), "season: ranks 1-8 only"
    sys.path.insert(0,ART); import winter_g28
    _LN.OFF[0]=age not in _LN.AGES   # G76: an a51/a65 cell takes the ORIGINAL a36 words (owner L2228: a51/a65 untouched)
    try: a36=build(person,rank,"a36")[1] if rank<=3 else None
    finally: _LN.OFF[0]=False
    S0,S,add=build(person,rank,age,_season=season); S,notes=winter_g28.season(S,rank,a36,season); _SP_RANK[0]=rank; S,_sn=season_post(S,person,season); notes+=_sn
    _m=b26_fit_ok(person,rank,age,season)
    if _m and len(S)>10000:
        _ang=False   # đông: winter_g28.season already dropped ANGLE; xuân/hạ/thu: keep HER OWN ANGLE (G72, owner L2039) unless the B26 cuts alone do not fit
        _T,_n=b26_fit(S,notes,angle=_ang,whole=_m=='whole',rank=_c2rank(rank))   # B26 length
        if len(_T)>10000 and season!="dong": _ang=True; _T,_n=b26_fit(S,notes,angle=True,whole=_m=='whole',rank=_c2rank(rank))
        if len(_T)>10000: _S2,_n2=f20_fit(S,notes); _T,_n=b26_fit(_S2,_n2,angle=_ang,whole=_m=='whole',rank=_c2rank(rank)) if len(_S2)>10000 else (_S2,_n2)   # BUILDFIX1: F20 first
        S,notes=_T,_n
    S,notes=f20_fit(S,notes)
    S=g45_post(S,f"{person} t{rank} {age} {season}")   # G45 jade clause after the fit
    return S0,S,add+notes

def _kc_drawn(person):   # B8 (BW3): same table + rule as build.py kc_drawn (dev/art/KC_REFS.json m09_ok yes + real face words)
    import json as _j
    p=_j.load(open(os.path.join(ART,"KC_REFS.json"),encoding="utf-8"))["people"].get(person)
    return bool(p and p.get("m09_ok")=="yes" and (p.get("face_words") or "").startswith("Her face: "))
def g_pets_allowed(rank,age): return isinstance(rank,int) and rank<=6 and age in ("a18","a26")
# EYES (CUT-SS via Foreman C, 20/11: m18 t7 drawn cross-eyed; the owner EYES sentence was only in the s-people face words): every figure prompt that lacks it
# gets the exact face-common/make_nf4.py EYES_STRAIGHT sentence right after the "Her face: ..." sentence (prompts that already hold it: unchanged).
EYES_STRAIGHT=re.search(r'^EYES_STRAIGHT="(.+)"$',open(os.path.join(ART,"face-common","make_nf4.py"),encoding="utf-8").read(),re.M).group(1)
def eyes(S):
    if EYES_STRAIGHT[:-1] in S: return S
    m=re.search(r"Her face: [^.]*\. ",S); assert m,"EYES: face sentence"
    return S[:m.end()]+EYES_STRAIGHT+" "+S[m.end():]
def build(person,rank,age="a18",_season=None):
    global G45_HAD; G45_HAD=False   # G45: set again by apply_dedupe inside _build
    S0,S,add=_build(person,rank,age); S=g36(eyes(S))   # G36 no phi bạch (xuân/đông)
    sys.path.insert(0,ART); import master_common as _MCv; S,_vk=_MCv.l2119_post(S,rank); add=add+_vk   # BUILDFIX5 L2105/L2119: t7 one-tier vân kiên, no stiff, no cape (t6-t8)
    if age in _LN.AGES: S=_LN.post(S)[0]   # G76 (owner L2228) BEFORE the length fit: the B26 cuts are only made when still needed (gate necessity rule)
    _m=b26_fit_ok(person,rank,age,_season)
    if _m and len(S)>10000 and _season in (None,"dong"):   # BUILDFIX2: xuân/hạ/thu fit once, after their season words (_build_season2)
        _T,_a=b26_fit(S,add,angle=True,whole=_m=='whole',rank=_c2rank(rank))
        if len(_T)>10000: _S2,_a2=f20_fit(S,add); _T,_a=b26_fit(_S2,_a2,angle=True,whole=_m=='whole',rank=_c2rank(rank)) if len(_S2)>10000 else (_S2,_a2)   # BUILDFIX1: the F20 sentence goes first, so a cell the B26 cut fitted stays fitted
        S,add=_T,_a
    if not _season: S,add=f20_fit(S,add)
    if not _season: S=g45_post(S,f"{person} t{rank} {age}")   # G45 jade clause after the fit (season cells: after winter_g28.season, below)
    if age in _LN.AGES: S=_LN.post(S)[0]   # G76 (owner L2228): a18-a36 every woman = ONE low-neckline phrase, every collar word gone; a51/a65 untouched
    return S0,S,add
# B26FAB2 (Foreman C #5 decision 1, 20/11): length step t1-t6, CUT WHILE > 10 000 (no longer all-or-nothing), only for cells that were <= 10 000 at HEAD 7007acc
# (before B26/JOB 2/JOB 3); the cells already over then are listed in dev/art/b26/HEAD_OVER10K.json and are never cut. Logged ART_RULES_CONFLICTS.md item 17(d).
def _c2rank(rank):   # B26FAB4: t7 gets the LEN_CUTS2 cuts only in the HQP SHORT pass (the long-collar pass stays as before, so every t7 cell that fitted stays the same)
    return None if rank==7 and not HQP_SHORT else rank
_HEAD_OVER=None
def b26_fit_ok(person,rank,age,season):
    """-> 'while' (cut while > 10 000), 'whole' (cell over at HEAD, t4/t5: the JOB 1 all-or-nothing fit kept as it was, so nothing that fitted before goes over again), or False."""
    global _HEAD_OVER
    if not (isinstance(rank,int) and 1<=rank<=8): return False   # B26FAB3 (Foreman C #6, 20/11): t7/t8 too (F2 embroidery names), same cut-while step
    if _HEAD_OVER is None:
        import json as _j; _HEAD_OVER=set(_j.load(open(os.path.join(ART,"b26","HEAD_OVER10K.json"),encoding="utf-8"))["cells"])
    if not ({f"{x}|{rank}|{age}|{season}" for x in (person,ALIAS.get(person,person))} & _HEAD_OVER): return 'while'
    return 'whole' if rank in (4,5) else False
def b26_fit(S,add,angle,whole=False,rank=None):
    """B26 length (owner Lượt 1283 đoạn sentence; JOB 2/3 growth): t1-t6, (1) drop the ANGLE sentence (owner ~15:39Z length rule, as winter_g28.season) when
    angle=True, (2) master_common.doan_fit master-repeat store clauses (Foreman C #5 decision (a)), each only while still > 10 000."""
    sys.path.insert(0,ART); import winter_g28 as _W, master_common as _MC
    T=S; notes=[]
    m=_W.ANGLE_RX.search(T) if angle else None
    if m: T=T.replace(m.group(0)+" ","",1); notes.append("ANGLE dropped (length, B26)")
    if len(T)>10000:
        T,_c=_MC.doan_fit(T,low=not whole,rank=None if whole else rank); notes+=[f"B26 length cut (repeats {x})" for x in _c]
    if whole and len(T)>10000: return S,add   # JOB 1 all-or-nothing (cells already over at HEAD)
    return T,add+notes
# HQP COLLAR (owner Lượt 1384 via Foreman C #7, 20/11: "Áp dụng Hoàng Quý Phi cho cái trang phục hiện tại luôn"): t7 current outfit = the LAYERED NECKLINE block
# of dev/art/thu_comoi/s62_t7_THU_COMOI.txt (make_thu_comoi.py layer() + OPEN, words verbatim) for every person, with her own main / secondary colour.
# Only these two slots change; luxury, jewels, crown, pearls, embroidery untouched. SHORT = make_thu_comoi.py compact form (same meaning), used only when the long form
# would push a cell that fitted over 10 000. Words: ONE copy in dev/art/check_store.py (hqp_layer / HQP_OPEN), shared with the gate (as G15).
HQP_SHORT=False
_HQP_CS=None
def _hqp_cs():
    global _HQP_CS
    if _HQP_CS is None:
        import importlib.util as _iu
        _sp=_iu.spec_from_file_location("check_store",os.path.join(ART,"check_store.py")); _HQP_CS=_iu.module_from_spec(_sp); _sp.loader.exec_module(_HQP_CS)
    return _HQP_CS
def hqp_collar(person,S):
    cs=_hqp_cs(); m=re.search(r"a near-empress ceremonial robe of ([^,]+?) silk, ",S); assert m,("HQP collar slot",person)
    main=re.sub(r"^SATURATED ","",m.group(1)); sec=re.sub(r" like #[0-9A-Fa-f]{6}$","",secondary(person)[0])
    S=S.replace(m.group(0),f"a near-empress ceremonial robe of {m.group(1)} silk with {cs.hqp_layer(main,sec,HQP_SHORT)}; the robe ",1)
    assert S.count(cs.HQP_CAPE)==1,("HQP cape slot",person)
    return S.replace(cs.HQP_CAPE,cs.HQP_CAPE+cs.HQP_OPEN+", ",1)
def _build(person,rank,age="a18"):
    if not _kc_drawn(ALIAS.get(person,person)): raise NotDrawn(person)   # B8: people NOT drawn are refused (CLI exit 2, --check counts them HELD)
    person=ALIAS.get(person,person); S0=store(person,rank,age); S=S0
    if rank=="nude": S0=LAST_G["_PETS"].depet(S0); return S0,S0,[]   # F17 PETS: Nữ đế never holds an animal pose
    if "Her face: . " in S:
        face=FACE_M.get(person,FACE_REF); S=S.replace("Her face: . ","Her face: "+face+(". " if not face.endswith(".") else " "),1)
    S=_clean_pose(S)
    S=apply_dedupe(person,rank,age,S); store(person,rank,age); S=_sec_slot(person,rank,S)   # Lượt 469 pose dedupe (slot); re-run store so LAST_G is this rank's
    if rank==7: S=hqp_collar(person,S)   # L1384 HQP current-outfit layered neckline
    anchor=" Pose:"; assert S.count(anchor)==1,("pose anchor",person,rank)
    add=(laws(rank,age,person in PR) if isinstance(rank,int) else laws(rank))+[angle_sentence(person,rank,age),grace_sentence(person,rank,age)]+extras(S0,person,rank)+(princess_sentences(PR[person],rank) if person in PR else [])
    if rank in (4,5,6): add=[hairflower_named(a,person,rank) for a in add]   # (t1-t3 name the species in the outfit's hair clause already)
    _f20=f20_sentence(person,rank)
    if _f20: add.append(_f20)   # BUILDFIX1: F20 flower colours (owner L2025)
    if not g_pets_allowed(rank,age): S=LAST_G["_PETS"].depet(S)   # F17 PETS: no animal pose where pets are not allowed (only the animal words change)
    return S0,S.replace(anchor," "+" ".join(add)+anchor,1),add
# HAIR FLOWER SPECIES t4-t6 (Foreman C #5 decision 2, 20/11; species = F2 NEW TABLE owner DUYỆT Lượt 1352, build.py F2_FL via hairflower_species(person, rank)):
# the F13 HAIR FLOWER SIZE sentence names the F2 species of this rank ('ONE fresh <species> in her hair'); size words unchanged.
# F20 FLOWER COLOUR (owner L2025, rule F20) — BUILDFIX1: embroidery-flower colour + hair-flower colour (hair_by_tier t1..t6) of her season
# from dev/art/face-common/flower_colours_L2013.json; English colour words made from the hex with the table maker's own OKLCH classes (name_vi).
import importlib.util as _iu2
F20=json.load(open(os.path.join(ART,"face-common","flower_colours_L2013.json"),encoding="utf-8"))
_sp2=_iu2.spec_from_file_location("mk_flower_colours",os.path.join(ART,"face-common","make_flower_colours_L2013.py")); _MFC=_iu2.module_from_spec(_sp2); _sp2.loader.exec_module(_MFC)
F20_HUE=[(10,"rose-pink"),(30,"coral"),(55,"peach"),(80,"apricot"),(105,"cream"),(135,"cream"),(160,"green"),(190,"aqua green"),(215,"sky blue"),(250,"soft blue"),(285,"periwinkle"),(315,"lilac"),(345,"orchid pink"),(361,"pink")]
def f20_name(hx):
    L,C,H=_MFC.h2o(hx)
    if C<0.025: return "cream-white" if L>0.88 else "pale pearl grey"
    hue=next(n for t,n in F20_HUE if H<t)
    if C<0.05: lv={True:"very pale"}.get(L>0.86) or ("pale" if L>0.76 else "powder")
    else: lv=("soft " if C<0.09 else "fresh " if C<0.13 else "vivid ")+("pale" if L>0.86 else "light" if L>0.76 else "" if L>0.62 else "deep")
    return re.sub(r"\s+"," ",f"{lv} {hue}").strip()
def f20_sentence(person,rank):
    if not isinstance(rank,int): return None
    p=ALIAS.get(person,person); se=B20_SEASON(person); d=F20.get(p,{}).get(se) if se else None
    if not isinstance(d,dict): return None
    s=f"FLOWER COLOUR: embroidered flowers {f20_name(d['embroidery_hex'])} (like {d['embroidery_hex']}) with gold thread"
    hx=d.get("hair_by_tier",{}).get(f"t{rank}") if rank<=6 else None
    if hx: s+=f"; hair flower {f20_name(hx)} (like {hx}), brighter than the embroidery"
    return s+"."
def f20_fit(S,add):
    """BUILDFIX1 length: the F20 sentence is added only where it fits the 10 000 gen limit (a cell that fitted never goes over because of it)."""
    m=re.search(r" FLOWER COLOUR: [^.]*\.(?= )",S)
    if m and len(S)>10000: return S.replace(m.group(0),"",1),add+["F20 sentence dropped (length)"]
    return S,add
def hairflower_named(a,person,rank):
    if not a.startswith(_F13): return a
    sp=LAST_G["hairflower_species"](ALIAS.get(person,person),rank)   # F2 (owner Lượt 1352): the F2 species of THIS rank
    if not sp: return a
    return a.replace("ONE fresh flower in her hair","ONE fresh "+sp[0]+" in her hair",1)

# ---------------- THÁI HẬU (owner Lượt 618 + 624, ROOT-53 order: BASE = the 18/11 Thái hậu prompt the owner liked, VERBATIM) ----------------
# BASE file dev/art/elder-copy/THAIHAU_1811_c04_a36_BASE.txt = Magnific prompt of gen CqnHqn1EEy (c04 a36, 18/11 22:28Z; a51 bxMrxpT5Y2 / a65 cpSDpJs0eP
# are the same text with the age+colour block of dev/art/elder-copy/THAIHAU_1811_AGE_COLOUR.md). Changes, each asserted (TH_DIFF lists them for the report):
#  SLOTS  face line (her KC v3 face words, B8) · colour name (her main) · item + hands (IT1 TH_ITEMS/TH_AGE) · age block (a51/a65 = elder-copy file)
#  B8     identity sentence -> owner identity law (IDENT_LAW); style-image sentence removed (no style image); KC people: generic eye clause removed
#  ADDED  (Lượt 618, copied from THIS person's Hoàng hậu t8 prompt = build(person,8)): the t8 law/extra block (HAIR up, SLEEVE to the floor, ONE SLEEVE LAYER,
#         NO hair flowers, HEAD AND BODY, FABRIC brocade, ANGLE, GRACE, THREE-COLOUR with #EFBD69 + her main/secondary hexes, HELD ITEM COLOUR) before Pose,
#         the HH pose tail sentence, the 18/11 swatch sentence (build.py TH_SWATCH, Image 3 -> Image 2) and D9 forehead sentence.
TH_BASE=os.path.join(ART,"elder-copy","THAIHAU_1811_c04_a36_BASE.txt")
TH_OLD={"face":"Her face: softly round face, large soft eyes, a softly defined cupid's-bow upper lip.",
        "ident":"From the identity reference keep ONLY her face, facial features and hairstyle colour; do NOT copy the outfit, hair ornaments or accessories of the reference, dress her in the NEW outfit below.",
        "style":" The style reference image is only for skin, drawing style, fabric and embroidery: never copy its face, body or pose.",
        "colour":"royal purple","item":"a gold phoenix-shaped incense ball",
        "hands":"Her hands and body: the item held in one hand at chest height below the chin, the other hand resting lightly on her sash, body turned slightly three-quarters to the left.",
        "eyes":" Eyes soft, warm and round-almond, never slanted or upturned, never teary.",
        "tailpos":" nothing covering the face. Everyone beautiful at every age."}
def th1811(age):
    t=open(os.path.join(ART,"elder-copy","THAIHAU_1811_AGE_COLOUR.md"),encoding="utf-8").read()
    def sec(h):
        m=re.search(r"^## "+re.escape(h)+r" \(verbatim\)\n(.+?)\n",t,re.M); assert m,("1811 section",h); return m.group(1).strip()
    return sec(age+" AGE TEXT")+" "+sec(age+" COLOUR TEXT")
def thaihau(person,age):
    person=ALIAS.get(person,person)
    _,Fhh,add=build(person,8,age)            # this person's Hoàng hậu t8 prompt (+ its added law block) -> sentences copied from it
    g=LAST_G; n=int(re.sub(r"\D","",person) or 1)
    import json as _j
    face=_j.load(open(os.path.join(ART,"KC_REFS.json"),encoding="utf-8"))["people"][person]["face_words"].strip()
    main=g["DATA"][person][0].split(" and ")[0]
    item,hk=g["TH_ITEMS"][g["th_index"](person,age)]   # E12 (BW6): different inside a look group (store th_index); others (n-1)%5 as before
    hands=g["low_hand"](hk,n%2==1)
    for ph in (", body and face frontal, standing squarely facing the viewer, no turn",", body and face frontal, facing the viewer squarely, no turn"): hands=hands.replace(ph,"")
    tail=re.search(r" The item is in a contrasting colour, not the robe colour, and the hand really grips it;[^.]*\.",Fhh).group(0)
    swatch=g["TH_SWATCH"].replace("Image 3","Image 2")
    F=open(TH_BASE,encoding="utf-8").read().strip(); D=[]
    def sw(old,new,cnt=1,why=""):
        nonlocal F; assert F.count(old)==cnt,("TH base slot",old[:50],F.count(old)); F=F.replace(old,new); D.append((why,old,new))
    sys.path.insert(0,ART); import master_common as _MC0
    sw(_MC0.STYLE_OLD,"Full-body standing figure",why="C1 (owner Lượt 779, MG2): old store style clause removed; style = master M01/M02 only")
    sw(TH_OLD["face"],face,why="SLOT face (B8: her KC v3 face words)")
    sw(TH_OLD["ident"],g["IDENT_LAW"],why="B8 identity law (owner words)")
    sw(TH_OLD["style"],"",why="B8: no style image -> style sentence removed")
    if age!="a36":
        _ta,_tc=th1811(age).split(" Her robe keeps",1); assert _ta+" Her robe keeps"+_tc==th1811(age)   # 18/11 AGE TEXT | COLOUR TEXT
        sw(g["AGE_TXT"]["a36"],_ta+" "+g["D15_STYLE3"]+" Her robe keeps"+_tc+g["ELDER_M05_SENT"],why="+ C5 (owner Lượt 779, MG2): elder colours win over master M05 (ELDER_M05_SENT after the 18/11 COLOUR TEXT); "+"AGE+COLOUR a51/a65 = 18/11 verbatim (elder-copy file); D15 STYLE LOCK between AGE and COLOUR TEXT (image 2 = swatch -> her a36 picture = third reference, ROOT-56)")
    sw(TH_OLD["colour"],main,cnt=2,why="SLOT colour name (her main)")
    sw(TH_OLD["item"],item,why="SLOT item (IT1 TH_ITEMS[TH_AGE])")
    sw(TH_OLD["hands"],"Her hands and body: "+hands+"."+tail,why="SLOT hands for her item (+ ADDED HH pose tail)")
    sw(TH_OLD["eyes"],"",why="B8: KC face words name her own eyes -> generic eye clause removed (same as every KC prompt)")
    sw(" Pose:"," "+" ".join(add)+" Pose:",why="ADDED (Lượt 618) the Hoàng hậu t8 law block, copied from her HH prompt")
    sw(TH_OLD["tailpos"]," nothing covering the face."+swatch+g["D9_FOREHEAD"]+" Everyone beautiful at every age.",why="ADDED royal-yellow swatch sentence (18/11 TH_SWATCH, image 2) + D9 forehead")
    sw("the royal golden yellow (honey-gold like #EFBD69)","the deep antique-gold royal yellow #CE9C48",why="B22 (owner Lượt 670): Thái hậu yellow = deep antique-gold royal yellow #CE9C48 (measured on the v624 m05 a36 robe), not #EFBD69")
    assert "#EFBD69" not in F,"B22: #EFBD69 left in a Thái hậu prompt"
    sys.path.insert(0,ART); import master_common as _MC; F=_MC.apply(F,high=True); D.append(("B25 MASTER block (owner Lượt 745/766; MG1 master_common.apply, last step, as every other path)","",""))   # SL1 (ROOT-57): the Thái hậu path starts from the 18/11 BASE file, so the master block was missing
    if age in _LN.AGES: F=_LN.post(F)[0]; D.append(("G76 (owner L2228): a36 low neckline, the standing collar words replaced by the one phrase","",""))
    globals()["TH_DIFF"]=D
    return None,F,add
TH_EXEMPT={"a18":"S03","a26":"S03","a36":"S03","a51":"S33","a65":"S33"}
def gate_th(person,age,text):
    """Thái hậu gate = check_store.py APPROVED part at Hoàng hậu scope (--scope tp8 --age: every owner-approved t8 sentence verbatim + every ban),
    with ONE named exemption: the HH tone sentence (S03 a18-a36 / S33 a51-a65), because the owner keeps the 18/11 Thái hậu COLOUR RULE words
    ("all colours MUTED and deep …", Lượt 618/624, ROOT-53 order). Any other FAIL line (missing sentence or ban) = FAIL."""
    with tempfile.NamedTemporaryFile("w",suffix=".txt",delete=False,encoding="utf-8") as f: f.write(text); fn=f.name
    try:
        p=subprocess.run([sys.executable,os.path.join(ART,"check_store.py"),fn,"--scope","tp8","--age",age],capture_output=True,text=True)
        fails=[l.strip() for l in p.stdout.splitlines() if l.strip().startswith("FAIL ")]
        other=[l for l in fails if not l.startswith("FAIL "+TH_EXEMPT[age]+" ")]
        ok=not other and (p.returncode==0 or len(fails)==1)
        msg=("THAI HAU GATE PASS (scope tp8 %s; exempt %s = 18/11 colour rule kept: %s)"%(age,TH_EXEMPT[age],"yes" if fails else "not needed")) if ok else p.stdout.strip()
        return ok,msg
    finally: os.unlink(fn)

# ---------------- CHECK ----------------
def _frame(rank,age):
    """frame sentences = those identical in the store outputs of c03 (green), c06 (red), c25 (cherry): colour/motif-dependent clauses drop out."""
    r=None
    for p in ("c03","c06","c25"):
        x=set(re.split(r"(?<=[.;]) ",store(p,rank,age))); r=x if r is None else r&x
    return {s for s in r if not s.lstrip().startswith(("Eyes soft, warm and round-almond","Hair:"))}   # + F11: 'Hair:' is a slot (check_store SLOT) swapped at a36+ t1-t3   # B8: KC people drop this END clause (their own face words name the eyes)
def check(person,rank,age="a18",ref=None):
    S0,F,add=build(person,rank,age); errs=[]
    blk=" "+" ".join(add)
    if F.count(blk)!=1: errs.append("added block not exactly once")
    stripped=F.replace(blk,"",1)
    S=S0
    if "Her face: . " in S:
        face=FACE_M.get(ALIAS.get(person,person),FACE_REF); S=S.replace("Her face: . ","Her face: "+face+(". " if not face.endswith(".") else " "),1)
    S=_clean_pose(S); S=apply_dedupe(ALIAS.get(person,person),rank,age,S); store(ALIAS.get(person,person),rank,age); S=_sec_slot(ALIAS.get(person,person),rank,S)   # Lượt 469: the pose slot may be re-picked (spec5 verbatim); Lượt 483 secondary slot
    if not g_pets_allowed(rank,age): S=LAST_G["_PETS"].depet(S)   # FRUITPET2 (ROOT-69 (c)): the same F17 depet step as build(); without it the invariant FAILed wherever the picked pose was an old animal pose (m04/m42 t7, m01/m30 t8 a18)
    _g45=lambda x: x.replace(", "+__import__("master_common").JADE_CLEAR,"").replace(G45_SLEEVE,"")   # G45 (POSEFIX1): the jade / sleeve clause is added after the fit (g45_post)
    if age in _LN.AGES: S=_LN.post(S)[0]; ref=None if ref is None else {x for x in ref if not _LN.touches(x)}   # G76 (owner L2228): the store side read with the same low-neckline swaps
    if _g45(stripped)!=_g45(S): errs.append("F minus added sentences != store output (pose slot dedupe applied)")
    for x in add:
        if x not in F: errs.append("law sentence missing: "+x[:50])
    if ref is None:
        ref=_frame(rank,age)
        if age in _LN.AGES: ref={x for x in ref if not _LN.touches(x)}   # G76: frame sentences that carry collar words are replaced by the one phrase
    for s in ref:
        if s.strip() and s not in F: errs.append("store frame sentence missing: "+s[:70])
    return errs
PEOPLE=[f"c{i:02d}" for i in range(1,33)]+[f"m{i:02d}" for i in range(1,53)]+list(PR)
S_NEW=["s62","s64","s65"]   # RANK8-C (owner GO via ROOT-68 20/11): new people, data rows in the store S_NEW_ROWS
PEOPLE+=S_NEW   # appended LAST so the global plan of everyone before them is unchanged
S_NEW2=["s%02d"%i for i in range(7,62)]+["s63"]   # T78-PREP (Foreman C ROOT 20/11): s07-s61 + s63, data rows in S_NEW_ROWS, appended LAST again (nobody else's plan changes)
PEOPLE+=S_NEW2; S_NEW+=S_NEW2
import subprocess,tempfile
GATE_SEASON=None
def gate(person,rank,age,text):
    """dev/art/check_store.py (owner Lượt 375 STORE GATE, reused) on this exact prompt with the SAME person's store args; PASS required."""
    sp=ALIAS.get(person,person)
    if sp in S_NEW_SET and rank in (7,8):
        m=re.search(r" Pose: (.+?)\. The item is in a contrasting colour",text)
        if m and re.search(PET_RX,m.group(1),re.I): return False,"PET GATE FAIL: pet in the t%d pose (owner: no pet at t7/t8): %s"%(rank,m.group(1)[:120])
    with tempfile.NamedTemporaryFile("w",suffix=".txt",delete=False,encoding="utf-8") as f: f.write(text); fn=f.name
    try:
        args=[sp,"v0"]+(["--nostyle"] if NOSTYLE_FOR(rank) else [])+([] if rank=="nude" else ["--low",str(rank)] if rank<=6 else ["--t7"] if rank==7 else [])+(["--age",age] if age!="a18" else [])+(["--season",GATE_SEASON] if GATE_SEASON else [])   # BUILDFIX3: the store gate is told the season (xuân/hạ palette; thu ladder only for thu)
        p=subprocess.run([sys.executable,os.path.join(ART,"check_store.py"),fn]+args,capture_output=True,text=True)
        return p.returncode==0 and "STORE CHECK PASS" in p.stdout, p.stdout.strip()
    finally: os.unlink(fn)
def _E6_GATE(age):
    """E6 (owner): one person, one age: t1-t8 never the same item kind; Nữ đế never her t8 kind. Uses the store's e6_check."""
    old=sys.argv; sys.argv=["build.py"]; g={"__name__":"build_store","__file__":STORE}
    try: exec(_PART1,g)
    finally: sys.argv=old
    return g["e6_check"]([p for p in PEOPLE if re.fullmatch(r"[cm]\d\d",p)],(age,))
def _E12_GATE(age):
    """E12 (owner Lượt 650/656): inside one look group at one rank + age: held item, angle sentence and grace line all different (cap = ceil(members/options):
    items/grace 8 options, angles 14), at most 2 per visual angle class; Thái hậu item different too. Same sources build() uses (store picks + plan)."""
    import math,collections
    store("c06",1,age); g=LAST_G; P=plan(age); bad=[]
    for name,mem in g["look_groups"]().items():
        mem=[c for c in mem if c in PEOPLE]
        if not mem: continue   # a group of new people only (s-ids, not in the builders yet)
        ci,ca,cc=e12_caps(len(mem),[ang_class(x) for x in g["ANG14"]])
        for t in range(1,9):
            for f,vals,cap in (("item",[g["_e6_picks"](c,age)["t%d"%t][0] for c in mem],ci),("angle",[P[(c,t)][0] for c in mem],ca),
                               ("angle class",[ang_class(g["ANG14"][P[(c,t)][0]]) for c in mem],cc),("grace",[P[(c,t)][2] for c in mem],ci)):
                m=max(collections.Counter(vals).values())
                if m>cap: bad.append((name,"t%d"%t,f,m))
        m=max(collections.Counter(g["th_index"](c,age) for c in mem).values())
        if m>ci: bad.append((name,"thaihau","item",m))
    return bad
def check_all(age="a18"):
    bad=0; held=0
    for t in range(1,9):
        ref=_frame(t,age)
        for p in PEOPLE:
            if not _kc_drawn(ALIAS.get(p,p)): held+=1; continue   # B8: not drawn -> HELD (builder refuses)
            e=check(p,t,age,ref); ok,msg=gate(p,t,age,build(p,t,age)[1])
            if not ok: e=e+["check_store: "+msg[:200]]
            if e: bad+=1; print("FAIL",p,"t%d"%t,age,"|",e[:3])
    for p in [f"c{i:02d}" for i in range(1,33)]:   # Nữ đế (nude3) of every consort: gate only
        if not _kc_drawn(p): held+=1; continue
        ok,msg=gate(p,"nude",age,build(p,"nude",age)[1])
        if not ok: bad+=1; print("FAIL",p,"nude",age,"|",msg[:200])
    e6=_E6_GATE(age)
    if e6: bad+=len(e6); print("FAIL E6 item kind repeated (person, age, kind, ranks):",e6[:20])
    e12=_E12_GATE(age)
    if e12: bad+=len(e12); print("FAIL E12 same rank, same look group (group, rank, field, count):",e12[:20])
    n=len(PEOPLE)*8+32; print(f"checked {n-held} prompts ({len(PEOPLE)} people x 8 ranks + 32 Nữ đế, age {age}; {held} HELD = not drawn, B8): {bad} FAIL"); return 1 if bad else 0
if __name__=="__main__":
    a=sys.argv[1:]; age=a[a.index("--age")+1] if "--age" in a else "a18"
    if "--style" in a: print("--style is retired (B8, owner Lượt 543/551/555): every person uses ONE set-B reference; new characters = dev/art/NEW_CHARACTER_TEMPLATE.md",file=sys.stderr); sys.exit(2)
    if "--check" in a: sys.exit(check_all(age))
    if "--samples" in a:
        for p,t in (("m19",1),("m19",3),("c06",7),("p01",2),("p03",8)):
            print(f"\n===== {p} t{t} {age} =====\n"+build(p,t,age)[1])
        sys.exit(0)
    pos=[x for x in a if not x.startswith("--") and x!=age and not ("--season" in a and x==a[a.index("--season")+1]) and not ("--caption" in a and x==a[a.index("--caption")+1])]
    if len(pos)==3 and "--age" not in a and re.fullmatch(r"a(18|26|36|51|65)",pos[2]): age=pos.pop()   # ROOT-51: positional age (build_all.py m13 3 a26) used to build a18 silently
    if len(pos)!=2: print("usage: build_all.py <person> <rank 1-8|nude|thaihau> [aNN | --age aNN] [--season xuan|ha|thu|dong]",file=sys.stderr); sys.exit(2)
    if not _kc_drawn(ALIAS.get(pos[0],pos[0])): print(f"REFUSED {pos[0]}: NOT drawn (ART_RULES B8, dev/art/KC_REFS.json)",file=sys.stderr); sys.exit(2)
    if pos[1]=="thaihau":   # Lượt 618 I4: Thái hậu = HH t8 + 3 Thái hậu slots (see thaihau())
        out=thaihau(pos[0],age)[1]; ok,msg=gate_th(pos[0],age,out)
        if not ok: print(msg,file=sys.stderr); sys.exit(1)
        print(msg,file=sys.stderr)
        print(out,end=""); sys.exit(0)
    season=a[a.index("--season")+1] if "--season" in a else None   # SEASON: --season dong (winter, G25/G26/G28)
    GATE_SEASON=season
    out=(build_season(pos[0],int(pos[1]),age,season) if season else build(pos[0],(pos[1] if pos[1]=="nude" else int(pos[1])),age))[1]
    if "--caption" in a:   # BUILDFIX2: sheet label for a test picture (approved thu-file CAPTION form); only when it fits the 10 000 gen limit
        _c=CAPTION.format(a[a.index("--caption")+1])
        if len(out)+1+len(_c)>10000: print("CAPTION dropped (length)",file=sys.stderr)
        else: out=out.rstrip()+" "+_c
    ok,msg=gate(pos[0],(pos[1] if pos[1]=="nude" else int(pos[1])),age,out)
    if not ok: print(msg,file=sys.stderr); sys.exit(1)
    print(out,end="")

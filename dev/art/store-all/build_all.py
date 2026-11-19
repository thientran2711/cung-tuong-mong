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
        # E11 + E6 (BW5, ROOT-52/53 19/11): the 25-item age-split lists (IT1) via the store's own pick _e6_picks (5 items per age, t1-t8 never repeat a kind); --olditem = old 10-list rotation
        if "--olditem" not in sys.argv:
            it,kind=g["_e6_picks"](c,age)[tier]; return (it,"L:"+kind) if int(tier[1:])<=6 else (it,kind)
        n=int(re.sub(r"\D","",c) or 0) or sum(map(ord,c)); ai=IA.AGES.index(age); idx=(n-1+3*ai)%10; N=int(tier[1:])
        if N<=6: it,kind=g["L3F"][N][idx]; return it,"L:"+kind
        return (g["ITEMS7"][idx] if N==7 else g["ITEMS"][idx])
    def age_item(c,tier,item,hk):
        if tier not in LADDER_TIERS: return orig(c,tier,item,hk)
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
# F13 (owner Lượt 639, ROOT-53 -> BW5): exactly ONE hair flower at t1-t6 (never two or a pair), its SIZE grows with rank (t1 small ... t6 large); replaces the Lượt 323 size ladder (t3 'flowers', t4 'plus smaller blooms', t5 'two or three', t6 'cluster').
_F13="HAIR FLOWER SIZE: exactly ONE fresh flower in her hair (never two, never a pair, no cluster), "
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
ONE_LAYER="ONE SINGLE SLEEVE LAYER: each sleeve begins at the shoulder and falls in one piece; NO shorter outer sleeve, NO half-sleeve or elbow-length layer, NO short jacket sleeve or cuff layer visible on top of it."
HEADBODY="HEAD AND BODY: her head turns together with her shoulders and body in the same direction with natural anatomy, never a frontal head on a turned body."
FABRIC_B="FABRIC: thick gold-embroidered brocade with a graceful, flowing drape."
NOFLOWER="NO flowers in the hair or on the crown at this rank (flowers only at ranks 1 to 6)."
def angle_sentence(person,rank,age="a18"):
    """Lượt 440: one of the 14 standing angles (7 + 7 mirrored, build.py ANG14); E12 (BW6): the plan of THIS age (was always the a18 plan); the head turns WITH the body; frontal or three-quarter only."""
    return "ANGLE: "+LAST_G["ANG14"][plan(age)[(ALIAS.get(person,person),rank)][0]]+"; her head turns together with her shoulders and body, never back-turned, never in profile."
def laws(t,age="a18"):
    L=[HAIR_LOW if t<=3 and age in ("a18","a26") else HAIR_HIGH,sleeve(t),ONE_LAYER]   # F11 (owner Lượt 583): a36/a51/a65 = hair UP for everyone (t1-t3 too); loose only a18/a26
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
FAMILY_CONTRAST={"green":["deep rose","crimson"],"pink":["jade green","deep teal"],"purple":["crimson","deep teal"],"neutral":["deep rose","deep teal"],
 "yellow":["blue-violet","deep sapphire blue"],"red":["jade green","deep teal"],"blue":["warm coral rose","deep rose"],"other":["deep rose","deep teal"]}
# Lượt 483 (owner, angry: "the outfits all look ONE colour - you deleted the outfit's SECONDARY colour"): root cause = f2c2835 (W72, 18/11 18:30, first --low builder): the
# store COLOUR RULE puts the secondary only "in the inner robe and linings" (copied from the t8 ORIG1 sentence where yellow dominates). Fix = slot REPLACE of that clause + one ADDED
# OUTFIT COLOURS sentence (t1-t6). Secondary = (1) her listed secondary if it is a real colour of another family (not neutral/metal/yellow); (2) else the second colour MEASURED
# from her live original (ORIG1 second entry, consorts W74-W77) if it is chromatic, another family and not yellow; (3) else a contrasting colour (FAMILY_CONTRAST, no gold/yellow).
import colorsys as _cs
def _hexhs(h):
    r,g,b=(int(h[i:i+2],16)/255 for i in (1,3,5)); hh,ss,vv=_cs.rgb_to_hsv(r,g,b); return hh*360,ss
def secondary(person):
    """(colour words, source) of her outfit SECONDARY colour."""
    g=LAST_G
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
    c=FAMILY_CONTRAST[fm]; return c[_pn(person)%len(c)],"contrast (listed %s is neutral/metal/same family)"%(sec or "none")
def main_words(person):
    """MAIN colour words of the TWO/THREE-COLOUR sentence: owner-table people = name like #HEX (BW4, Lượt 603), others = DATA name."""
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
def phi_bach(person,has_shawl=True):
    main,sec,fm,col,why=phibach_colour(person)
    intro="the sheer shawl draped behind her back and over her arms" if has_shawl else "over her outfit she wears a sheer silk shawl (phi bạch) draped behind her back and over her arms; the shawl"
    # F12 (owner Lượt 601, ROOT-51 -> BW4): same secondary hue, but clearly MORE TRANSPARENT (a light airy veil, never an opaque band)
    return f"PHI BẠCH: {intro} is a very sheer, highly translucent gauze shawl in {col} (her secondary colour, clearly different from her main robe colour {main}) — the robe, sleeves and arms are clearly visible through it, so it reads as a light airy veil of that hue, never an opaque solid band of colour; it keeps its soft graceful drape."
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
HQP_LUX="HOÀNG QUÝ PHI LUXURY: richer than every lower rank: more jewels on the phoenix crown (rubies, sapphires, pearls and jade), a layered pearl-and-gold necklace, pearl and jade trims along the cape edges, and long jade-and-gold belt pendants with pearl tassels; still clearly simpler and less golden than the Empress."
def item_colour(person,rank,F):
    m=re.search(r" Pose: .*?(?:holding|holds|carrying|offering|raising|with) (an? [^,.]+?)(?: in | up | raised| held| forward| beside| at |,|\.)",F)
    main=LAST_G["DATA"][person][0].split(" and ")[0]; sec,_=secondary(person)
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
def grace_sentence(person,rank,age="a18"):
    return "GRACE (pose variety, every rank its own): "+GRACE[plan(age)[(ALIAS.get(person,person),rank)][2]]+"."   # E12 (BW6): this age's plan
_POSE_MEMO={}
def _pose_tpl(g,tr,j,adapt=True):
    """spec5 entry verbatim; adapt=True -> SPEC5_ADAPT whenever the entry is listed there (also the lantern+item entry, which carries {prop}: one held item only, FIGURE_GATE D3)."""
    if tr=="p30": return P30[j][1]   # E4: the 30 new poses (POSES_30.md verbatim, 'the item' = {prop})
    r_=g["SPEC5_POSES"][tr][j]
    if adapt and r_ in g["SPEC5_ADAPT"]: return g["SPEC5_ADAPT"][r_]
    return r_ if "{prop}" in r_ else g["SPEC5_ADAPT"][r_]
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
def pose_end(t): return "the skirt hem swinging softly" if t<=3 else "the robe hem stirring slightly" if t<=6 else "the robe falling still and straight"
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
            ok0=[o for o in allp if o not in up and (t>=4 or lively(o)) and not any(re.search(q,_pose_tpl(g,*o)) for q in _banned(t,age,prop))]   # E4: t1-t3 lively only
            ok=[o for o in ok0 if not (_keys(_pose_tpl(g,*o))&keys)] or ok0
            pz=best(ok,cp); up.append(pz); cp[t][pz]+=1
            gr=best([k for k in range(8) if k not in ug],cg); ug.add(gr); cg[t][gr]+=1
            P[(c,t)]=(a,pz,gr)
    # E12 (owner Lượt 650/656, ROOT-54 ruling (b), BW6): inside each LOOK GROUP the angle and grace of THIS age are replaced by the group plan
    # (different angle sentence per person at one rank, <=2 per visual class, different grace line; E1 no repeat inside one person). Poses: untouched.
    for name,mem in g["look_groups"]().items():
        mem=[c for c in mem if c in PEOPLE]; A=group_angles(name,mem,age,[ang_class(x) for x in g["ANG14"]]); Gr=group_grace(name,mem,age)
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
def group_angles(name,mem,age,cls,cap=2):
    """E12: people x ranks grid of ANG14 indices; each rank: all different, <= cap per visual class; each person: 8 different (E1). Deterministic seeded backtracking."""
    cells=[(c,t) for t in range(1,9) for c in mem]; A={}
    def ok(c,t,v):
        if any(A.get((c,u))==v for u in range(1,9)): return False
        col=[A[(d,t)] for d in mem if (d,t) in A]
        return v not in col and sum(cls[x]==cls[v] for x in col)<cap
    def go(i):
        if i==len(cells): return True
        c,t=cells[i]; vals=list(range(len(cls))); _random.Random(f"E12-angle-{name}-{age}-{c}-{t}").shuffle(vals)
        for v in vals:
            if ok(c,t,v):
                A[(c,t)]=v
                if go(i+1): return True
                del A[(c,t)]
        return False
    assert go(0),("E12 angle plan impossible",name,age)
    return A
def group_grace(name,mem,age,K=8):
    """E12: Latin square over the first 8 members (sorted) x 8 ranks: every rank 8 different lines, every person 8 different lines; a 9th member keeps her plan line."""
    R=_random.Random(f"E12-grace-{name}-{age}"); rp=list(range(K)); cp=list(range(K)); sp=list(range(K)); R.shuffle(rp); R.shuffle(cp); R.shuffle(sp)
    return {(c,t):sp[(rp[i]+cp[t-1])%K] for i,c in enumerate(mem[:K]) for t in range(1,9)}
def apply_dedupe(person,rank,age,S):
    pick,prop,sp,body=dedupe_pick(person,rank,age)
    store(person,rank,age)   # LAST_G back to this rank
    g=LAST_G
    if not (pick==sp and _pose_tpl(g,*pick)==_pose_tpl(g,*pick,adapt=False)):
        new=_frontal(g,_pose_tpl(g,*pick)).format(prop=prop)
        a=" Pose: "+body; assert S.count(a)==1,("pose slot",person,rank)
        S=S.replace(a," Pose: "+new,1)
    # E4 (Lượt 529/534): the rank's ending at the END of the pose sentence (pose slot)
    i=S.index(" Pose: "); j=S.index(". The item is in a contrasting colour",i)
    return S[:j]+", "+pose_end(rank)+S[j:]
TQ_RIGHT=", body turned slightly three-quarters to the right"
def _clean_pose(S):
    """Lượt 440: the store's pose pass appends 'body turned slightly three-quarters to the right' at every odd pose slot (why almost everybody faced right); the ANGLE sentence (14 standing angles, left AND right) replaces it."""
    return S.replace(TQ_RIGHT,"")
def _sec_slot(person,rank,S):
    """Lượt 483 slot REPLACE (colour slot of the store COLOUR RULE, t1-t6): the secondary is no longer only 'in the inner robe and linings'."""
    if not isinstance(rank,int): return S
    sec,_=secondary(person)
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
    S=re.sub(r"with [^;]+? in the inner robe and linings",f"with {sec} in the inner robe and linings",S,count=1)   # colour slot swap only (no new wording, Lượt 489)
    for _a,_b in F13_SWAP: S=S.replace(_a,_b)   # F13 one hair flower
    return _t3_slot(person,rank,S)
# G15 (owner Lượt 559): QUÝ NHÂN t3 DESIGN = option B v2 -> dev/art/check_store.py g15_t3 (one copy of the wording, shared with the gate).
def _t3_slot(person,rank,S):
    if rank!=3: return S
    import importlib.util as _iu
    _sp=_iu.spec_from_file_location("check_store",os.path.join(ART,"check_store.py")); _cs_mod=_iu.module_from_spec(_sp); _sp.loader.exec_module(_cs_mod)
    main=LAST_G["DATA"][person][0].split(" and ")[0]; sec,_=secondary(person)
    return _cs_mod.g15_t3(S,main,sec)
class NotDrawn(Exception): pass
def _kc_drawn(person):   # B8 (BW3): same table + rule as build.py kc_drawn (dev/art/KC_REFS.json m09_ok yes + real face words)
    import json as _j
    p=_j.load(open(os.path.join(ART,"KC_REFS.json"),encoding="utf-8"))["people"].get(person)
    return bool(p and p.get("m09_ok")=="yes" and (p.get("face_words") or "").startswith("Her face: "))
def build(person,rank,age="a18"):
    if not _kc_drawn(ALIAS.get(person,person)): raise NotDrawn(person)   # B8: people NOT drawn are refused (CLI exit 2, --check counts them HELD)
    person=ALIAS.get(person,person); S0=store(person,rank,age); S=S0
    if rank=="nude": return S0,S0,[]
    if "Her face: . " in S:
        face=FACE_M.get(person,FACE_REF); S=S.replace("Her face: . ","Her face: "+face+(". " if not face.endswith(".") else " "),1)
    S=_clean_pose(S)
    S=apply_dedupe(person,rank,age,S); store(person,rank,age); S=_sec_slot(person,rank,S)   # Lượt 469 pose dedupe (slot); re-run store so LAST_G is this rank's
    anchor=" Pose:"; assert S.count(anchor)==1,("pose anchor",person,rank)
    add=(laws(rank,age) if isinstance(rank,int) else laws(rank))+[angle_sentence(person,rank,age),grace_sentence(person,rank,age)]+extras(S0,person,rank)+(princess_sentences(PR[person],rank) if person in PR else [])
    return S0,S.replace(anchor," "+" ".join(add)+anchor,1),add

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
    sw(TH_OLD["face"],face,why="SLOT face (B8: her KC v3 face words)")
    sw(TH_OLD["ident"],g["IDENT_LAW"],why="B8 identity law (owner words)")
    sw(TH_OLD["style"],"",why="B8: no style image -> style sentence removed")
    if age!="a36": sw(g["AGE_TXT"]["a36"],th1811(age),why="AGE+COLOUR a51/a65 = 18/11 verbatim (elder-copy file)")
    sw(TH_OLD["colour"],main,cnt=2,why="SLOT colour name (her main)")
    sw(TH_OLD["item"],item,why="SLOT item (IT1 TH_ITEMS[TH_AGE])")
    sw(TH_OLD["hands"],"Her hands and body: "+hands+"."+tail,why="SLOT hands for her item (+ ADDED HH pose tail)")
    sw(TH_OLD["eyes"],"",why="B8: KC face words name her own eyes -> generic eye clause removed (same as every KC prompt)")
    sw(" Pose:"," "+" ".join(add)+" Pose:",why="ADDED (Lượt 618) the Hoàng hậu t8 law block, copied from her HH prompt")
    sw(TH_OLD["tailpos"]," nothing covering the face."+swatch+g["D9_FOREHEAD"]+" Everyone beautiful at every age.",why="ADDED royal-yellow swatch sentence (18/11 TH_SWATCH, image 2) + D9 forehead")
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
        mem=[c for c in mem if c in PEOPLE]; ci=math.ceil(len(mem)/8); ca=math.ceil(len(mem)/14)
        for t in range(1,9):
            for f,vals,cap in (("item",[g["_e6_picks"](c,age)["t%d"%t][0] for c in mem],ci),("angle",[P[(c,t)][0] for c in mem],ca),
                               ("angle class",[ang_class(g["ANG14"][P[(c,t)][0]]) for c in mem],2),("grace",[P[(c,t)][2] for c in mem],ci)):
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
    pos=[x for x in a if not x.startswith("--") and x!=age]
    if len(pos)==3 and "--age" not in a and re.fullmatch(r"a(18|26|36|51|65)",pos[2]): age=pos.pop()   # ROOT-51: positional age (build_all.py m13 3 a26) used to build a18 silently
    if len(pos)!=2: print("usage: build_all.py <person> <rank 1-8|nude|thaihau> [aNN | --age aNN]",file=sys.stderr); sys.exit(2)
    if not _kc_drawn(ALIAS.get(pos[0],pos[0])): print(f"REFUSED {pos[0]}: NOT drawn (ART_RULES B8, dev/art/KC_REFS.json)",file=sys.stderr); sys.exit(2)
    if pos[1]=="thaihau":   # Lượt 618 I4: Thái hậu = HH t8 + 3 Thái hậu slots (see thaihau())
        out=thaihau(pos[0],age)[1]; ok,msg=gate_th(pos[0],age,out)
        if not ok: print(msg,file=sys.stderr); sys.exit(1)
        print(msg,file=sys.stderr)
        print(out,end=""); sys.exit(0)
    out=build(pos[0],(pos[1] if pos[1]=="nude" else int(pos[1])),age)[1]
    ok,msg=gate(pos[0],(pos[1] if pos[1]=="nude" else int(pos[1])),age,out)
    if not ok: print(msg,file=sys.stderr); sys.exit(1)
    print(out,end="")

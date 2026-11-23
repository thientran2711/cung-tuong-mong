#!/usr/bin/env python3
"""t8 PROMPT B (Hoang hau, a18, ONE figure) -- FROZEN by W72 (owner 18/11 ~18:20Z: draw all 90 with THIS prompt, change nothing).
Usage: python3 build.py cNN v0|v1|v2 [--golden]   |   python3 build.py cNN --t7  (Hoang quy phi v0)   -> prints the exact prompt.
--golden = byte-identical to the 4 prompts actually run (c06 c16 c20 c25, version A/B test, B = with fabric sentence; see golden/).
Default mode = the same text, ONLY the colour slot differs (owner 18:17Z: royal yellow of c25 B, measured; 18:00Z: fresh colours).
Per-person data (palette, face words) copied from dev/figwork/jobs.json on origin/main (N-cNN-t8 figs[0].palette and 'Her own features').
"""
import sys,re
DATA={
"c01": [
"rose red and gold",
"oval face, almond eyes, long soft lashes"
],
"c02": [
"sapphire blue and silver",
"heart-shaped face, deep-set calm eyes, thick straight brows"
],
"c03": [
"emerald green and cream",
"long slender face, clear bright eyes, gently arched brows"
],
"c04": [
"royal purple and lavender",
"softly round face, large soft eyes, a softly defined cupid's-bow upper lip"
],
"c05": [
"peacock teal and gold",
"diamond face with high cheekbones, large round eyes, thin high-arched brows"
],
"c06": [
"vermilion and jade green",
"face with a petite pointed chin, warm round-almond eyes, softly rounded brows"
],
"c07": [
"lavender and pale pink",
"gentle square-jawed face, almond eyes, softly rounded cheekbones"
],
"c08": [
"cherry-blossom pink and pale green",
"wide soft cheeks, deep-set calm eyes, a faint dimple in her left cheek"
],
"c09": [
"powder blue and white",
"oval face, clear bright eyes, long soft lashes"
],
"c10": [
"peach and cream",
"heart-shaped face, large soft eyes, thick straight brows"
],
"c11": [
"lilac and silver",
"long slender face, large round eyes, gently arched brows"
],
"c12": [
"mint green and white",
"softly round face, warm round-almond eyes, a softly defined cupid's-bow upper lip"
],
"c13": [
"apricot and cream",
"diamond face with high cheekbones, almond eyes, thin high-arched brows"
],
"c14": [
"soft butter yellow and white",
"face with a petite pointed chin, deep-set calm eyes, softly rounded brows"
],
"c15": [
"coral pink and ivory",
"gentle square-jawed face, clear bright eyes, softly rounded cheekbones"
],
"c16": [
"sage green and cream",
"wide soft cheeks, large soft eyes, a faint dimple in her left cheek"
],
"c17": [
"blush pink and pale gold",
"oval face, large round eyes, long soft lashes"
],
"c18": [
"magenta rose and lilac",
"heart-shaped face, warm round-almond eyes, thick straight brows"
],
"c19": [
"plum and pink",
"long slender face, almond eyes, gently arched brows"
],
"c20": [
"lotus pink and celadon",
"softly round face, deep-set calm eyes, a softly defined cupid's-bow upper lip"
],
"c21": [
"ruby and blush pink",
"diamond face with high cheekbones, clear bright eyes, thin high-arched brows"
],
"c22": [
"orchid purple and pink",
"face with a petite pointed chin, large soft eyes, softly rounded brows"
],
"c23": [
"crimson and gold",
"gentle square-jawed face, large round eyes, softly rounded cheekbones"
],
"c24": [
"scarlet and ivory",
"wide soft cheeks, warm round-almond eyes, a faint dimple in her left cheek"
],
"c25": [
"deep cherry red and black-gold",
"oval face, almond eyes, a softly defined cupid's-bow upper lip"
],
"c26": [
"burgundy and gold",
"heart-shaped face, deep-set calm eyes, thin high-arched brows"
],
"c27": [
"cinnabar and cream",
"long slender face, clear bright eyes, softly rounded brows"
],
"c28": [
"celadon and white",
"softly round face, large soft eyes, softly rounded cheekbones"
],
"c29": [
"ink blue and pale grey",
"diamond face with high cheekbones, large round eyes, a faint dimple in her left cheek"
],
"c30": [
"moonlight blue and white",
"face with a petite pointed chin, warm round-almond eyes, long soft lashes"
],
"c31": [
"pale jade and silver",
"gentle square-jawed face, almond eyes, thick straight brows"
],
"c32": [
"ivory and soft grey-blue",
"wide soft cheeks, deep-set calm eyes, gently arched brows"
]
}
V2={"c01": "jade green", "c02": "coral pink", "c03": "crimson red", "c04": "jade green", "c05": "rose pink", "c06": "azure blue", "c07": "leaf green", "c08": "sky blue", "c09": "rose red", "c10": "turquoise", "c11": "leaf green", "c12": "rose pink", "c13": "sky blue", "c14": "orchid purple", "c15": "jade green", "c16": "rose pink", "c17": "turquoise", "c18": "azure blue", "c19": "leaf green", "c20": "sky blue", "c21": "turquoise", "c22": "jade green", "c23": "azure blue", "c24": "lavender violet", "c25": "jade green", "c26": "sky blue", "c27": "turquoise", "c28": "coral pink", "c29": "rose red", "c30": "peach orange", "c31": "coral pink", "c32": "azure blue"}
# a36/a51 age phrases strengthened 18/11 ~20:45Z (FIGURE_GATE AGE 51 FACE: a51 must read 51, W78b finding: a51 faces read 22-28); a18/a26 unchanged
# a36/a51 per OWNER 18/11 ~21:35Z: a36 = young for her age (trẻ trước tuổi), a51 = ages beautifully (đẹp lão)
# OWNER 18/11 ~22:00Z: hands interact with the item, but never head down / eyes closed / open-mouth smile (pose sentence added to every builder)
# a65 (OWNER 18/11 ~22:20Z): new 60+ band for older women (Thái hậu, Ma ma): more wrinkles, much more silver hair, not white — SAMPLE ONLY until she approves
# OWNER 18/11 ~22:45Z: a65 = the exact b7228a02 text the owner APPROVED 22:55Z ("65 tuổi ok, duyệt 65 tuổi, tiến hành làm 65 tuổi"); a51 colours DARKER like Thái hậu/Ma ma wear (owner 23:05Z) (trầm = lower saturation, slightly deeper; owner 22:50Z: "màu này nó giống như là nó hạ sắc"), a65 more muted; overrides the 19:55Z "a51 same colours" rule
# --age a18|a26|a36|a51 (owner 19:55Z): ONLY the age phrase changes (original spec3/jobs.json wording); colours/yellow identical at every age
AGE="a18"
# N5c (FIGURE_GATE 3f, owner 19/11 ~00:45Z): the held item comes from item_age.py, cell (AGE x RANK/STATUS), pick_item(cNN, age, status):
# every age of one person a different KIND, Nữ đế kind != her t8 kind. --olditem = the old per-rank pick (reproduces earlier outputs).
import os as _os
sys.path.insert(0,_os.path.dirname(_os.path.abspath(__file__))); import item_age as _IA
import pets as _PETS
OLDITEM="--olditem" in sys.argv
# item kind -> hand interaction key (HAND_LOW key, or one/two/box for hand7 via low_hand)
_HK={"rfan":"rfan","ffan":"ffan","mirror":"mirror","ball":"dangle","slant":"lantern","flute":"flute","bfly":"dangle","fbask":"basket","sachet":"dangle",
"hoop":"hoop","speony":"sprig","pipa":"two","parasol":"one","sceptre":"one","sealbox":"box","edict":"scroll","lamp":"lamp","pbook":"book","pscroll":"scroll",
"combbox":"box","plant":"lantern","gobox":"box","pend":"dangle","ruyi":"ruyi","hot":"two","incbox":"box","casket":"box","hanky":"kerchief","orchid":"two",
"powder":"box","hcomb":"one","beads":"dangle","censer":"one","jseal":"two","sutra":"book","warmer":"two","brush":"one","iball":"dangle","whisk":"one",
"album":"book","pouch":"dangle","coral":"stand","staff":"one","plaque":"two","almanac":"book","pastebox":"box","pine":"scroll","hballs":"two","chrys":"sprig","bell":"dangle",
"p_sprig":"sprig","p_plum":"sprig","p_wbask":"basket","p_flute":"flute","p_lant":"lantern","p_hsach":"dangle","p_mulb":"basket","p_sutra":"book","p_beads":"dangle",
"m_lant":"lantern","m_fbask":"basket","m_beads":"dangle","m_sutra":"book","m_ledger":"book"}
def age_item(c,tier,item,hk,pet=True):
    # PETS (owner Lượt 1057/1059, rule F17, pets.py): a18/a26, kc + t1–t6 only, 3+ people per rank x age; the pet (in contact, never beside) REPLACES the held item
    if pet and not OLDITEM:
        _p=_PETS.pet(c,tier,AGE)
        if _p: return _p
    # E7 (Lượt 529): an age outside the status ages gets the nearest age's cell but its OWN unused kind (item_age.pick_kind pass 2); was: the nearest age's item (repeat)
    if OLDITEM: return item,hk
    # E11 (owner Lượt 583/585; IT1 lists, BW5 wiring 19/11): every tier with a 25-item age-split list picks LIST[AGE_DICT[AGE][(n-1)%5]]
    # (5 per age, so a person never repeats an item across ages); the item's own hand key is used exactly as in the list (same as the non-age path).
    n=int(c[1:]) if c[1:].isdigit() else sum(map(ord,c)); j=(n-1)%5
    if tier in _E6_TIERS or tier=="nude":
        it,k=_e6_picks(c,AGE)[tier]; return (it,"L:"+k) if tier in ("t1","t2","t3","t4","t5","t6") else (it,k)   # L3F kind -> low_hand (same as the build_all ladder)
    if tier=="thaihau": return TH_ITEMS[th_index(c,AGE)]   # E12: different inside a look group
    L=_E11_LISTS().get(tier)
    if L: lst,d=L; return lst[d[AGE][j]]
    if tier in _IA.AGE5:
        k=_IA.AGE5[tier][AGE][j]; return _art(_IA.fill(k,tier)),"L:"+_HK.get(k,"two")
    k=_IA.pick_kind(c,AGE,tier); return _art(_IA.fill(k,tier)),"L:"+_HK.get(k,"two")
# E6 (owner; ROOT-53 19/11 Lượt 624 round): one person at one age never holds the same item KIND at two ranks t1-t8; Nữ đế never her t8 kind.
# Pick = for t1..t8 the first combination (depth-first, each rank trying its 5 age items from (n-1)%5) with 8 different kinds; Nữ đế = first of her 5 whose kind != t8.
_E6_TIERS=["t%d"%t for t in range(1,9)]
_E6_KINDS=[("box",r"\bbox\b|casket"),("censer",r"censer|incense"),("healthballs",r"health balls"),("fan",r"\bfan\b"),("mirror",r"mirror"),
 ("scroll",r"scroll"),("book",r"\bbook\b|almanac"),("lantern",r"lantern"),("flute",r"flute"),("lamp",r"\blamp\b"),("basket",r"basket"),
 ("sachet",r"sachet"),("beads",r"beads?\b|bead string"),("pendant",r"pendant"),("hairpin",r"hairpin"),("comb",r"\bcomb\b"),
 ("handkerchief",r"handkerchief"),("hoop",r"\bhoop\b"),("ball",r"\bball\b|tú cầu"),("lute",r"\bpipa\b|\blute\b"),("parasol",r"parasol"),
 ("warmer",r"hand warmer|\bwarmer\b"),("seal",r"\bseal\b"),("staff",r"\bstaff\b"),("plaque",r"longevity plaque"),("cage",r"\bcage\b|birdcage"),
 ("drum",r"\bdrum\b"),("kite",r"\bkite\b"),("letter",r"\bletter\b"),("brush",r"\bbrush\b"),("whisk",r"whisk"),("screen",r"\bscreen\b"),
 ("flask",r"flask"),("ruyi",r"\bruyi\b"),("sceptre",r"sceptre"),("tablet",r"tablet"),("coral",r"coral branch"),("figurine",r"statuette|jade mountain|jade crane|lingzhi|mandarin ducks"),
 ("plant",r"potted|\bpot with\b"),("flowers",r"sprig|chrysanthemums|blossoms\b"),("fish",r"wooden fish"),("bell",r"\bbell\b"),("whistle",r"whistle"),("needle",r"needle case"),("pouch",r"\bpouch\b")]   # +3 kinds for the E12 items (BW6)
def e6_kind(item):
    import re as _re
    for k,rx in _E6_KINDS:
        if _re.search(rx,item): return k
    return item
_E6_CACHE={}
_J53=None
def _items_L2053():
    global _J53
    if _J53 is None:
        _f=_os.path.join(_os.path.dirname(_os.path.dirname(_os.path.abspath(__file__))),"items_per_person_L2053_DRAFT.json")
        _J53={k:v for k,v in _json.load(open(_f,encoding="utf-8")).items() if not k.startswith("_")} if _os.path.exists(_f) else {}
    return _J53
def _e6_picks(c,age):
    key=(c,age)
    if key in _E6_CACHE: return _E6_CACHE[key]
    n=int(c[1:]) if c[1:].isdigit() else sum(map(ord,c)); j=(n-1)%5; L=_E11_LISTS(); used=set(); out={}
    _J=_items_L2053()
    if age=="a18" and c in _J:   # BUILDFIX2 (owner L2053, ITEMS1): her OWN a18 ladder t1-t8 from dev/art/items_per_person_L2053_DRAFT.json (index into the same E11 lists)
        for t in _E6_TIERS:
            it=L[t][0][_J[c][t]["idx"]]; assert (it[0] if isinstance(it,(tuple,list)) else it)==_J[c][t]["item"],("items_L2053 mismatch",c,t)
            out[t]=it
        lst,d=L["nude"]; k8=e6_kind(out["t8"][0])
        out["nude"]=lst[next((d[age][(j+k)%5] for k in range(5) if e6_kind(lst[d[age][(j+k)%5]][0])!=k8),d[age][j])]
        _E6_CACHE[key]=out; return out
    gs=group_slot(c)
    if gs:   # E12: look-group member -> her slot's colour class (8 different items per rank inside the group, 8 different kinds per person)
        GI=_group_items(gs[0],age)
        if GI:
            for t in _E6_TIERS: out[t]=L[t][0][GI[(gs[1]%8,t)]]
            lst,d=L["nude"]; k8=e6_kind(out["t8"][0])
            out["nude"]=lst[next((d[age][(j+k)%5] for k in range(5) if e6_kind(lst[d[age][(j+k)%5]][0])!=k8),d[age][j])]
            _E6_CACHE[key]=out; return out
    opts=[[L[t][1][age][(j+k)%5] for k in range(5)]+L[t][1][age][5:] for t in _E6_TIERS]   # each rank: its 5 first age items, preferred (n-1)%5 first (unchanged order), then the 3 E12 items
    def dfs(i,used):
        if i==len(_E6_TIERS): return []
        lst=L[_E6_TIERS[i]][0]
        for idx in opts[i]:
            k=e6_kind(lst[idx][0])
            if k in used: continue
            r=dfs(i+1,used|{k})
            if r is not None: return [idx]+r
        return None
    sel=dfs(0,frozenset()) or [o[0] for o in opts]   # no solution -> preferred picks (e6_check then FAILS)
    for t,idx in zip(_E6_TIERS,sel): out[t]=L[t][0][idx]
    lst,d=L["nude"]; k8=e6_kind(out["t8"][0])
    out["nude"]=lst[next((d[age][(j+k)%5] for k in range(5) if e6_kind(lst[d[age][(j+k)%5]][0])!=k8),d[age][j])]
    _E6_CACHE[key]=out; return out
# E12 SAME RANK, DIFFERENT PEOPLE (owner Lượt 650/656; ROOT-54 ruling (b), BW6 19/11): inside one LOOK GROUP (owner groups Lượt 686, OWNER_GROUPS_L686.json, m and c ids) at one rank + age every person holds a DIFFERENT item. E11 lists hold 8 items per rank per age, so 8 people x 8 ranks:
# the items of one age form a bipartite multigraph rank -- item kind (every rank 8 items, every kind <= 8 items at one age); a proper 8-edge-colouring (Kőnig,
# alternating-path method, deterministic edge order t1..t8 x list order) gives 8 colour classes, each = one item per rank with 8 different kinds (E6).
# Group member number i (members sorted) takes colour class i % 8 (groups bigger than 8: each item at most ceil(members/8) times, the pigeonhole minimum).
_LG=None
def look_groups():
    """owner Lượt 686 (ROOT-54 21:13Z): the owner's own face groups = dev/art/face-common/OWNER_GROUPS_L686.json (person -> group, m AND c ids);
    replaces the old (n-1)%6 lists of LOOK_GROUPS.md. {group: sorted members}."""
    global _LG
    if _LG is None:
        import json as _js; _LG={}
        for k,v in _js.load(open(_os.path.join(_os.path.dirname(_os.path.abspath(__file__)),"..","face-common","OWNER_GROUPS_L686.json"),encoding="utf-8")).items():
            if v!="Kho": _LG.setdefault(v,[]).append(k)   # "Kho" (owner Lượt 697, KHO_L697.md) = people stored away, not a face group
        _LG={k:sorted(v) for k,v in _LG.items()}
    return _LG
def group_slot(c):
    """(group name, index of c among the sorted members) or None."""
    for k,v in look_groups().items():
        if c in v: return k,v.index(c)
    return None
_GRP_CACHE={}
def _group_items(name,age,K=8):
    key=(name,age)
    if key in _GRP_CACHE: return _GRP_CACHE[key]
    L=_E11_LISTS(); edges=[(t,idx,e6_kind(L[t][0][idx][0])) for t in _E6_TIERS for idx in L[t][1][age]]
    if any(len(L[t][1][age])!=K for t in _E6_TIERS) or max(__import__("collections").Counter(k for _,_,k in edges).values())>K:
        _GRP_CACHE[key]=None; return None   # not colourable -> per-person picks (the E12 gate then FAILS)
    atR={t:{} for t in _E6_TIERS}; atK={}; col=[None]*len(edges)
    for e,(t,idx,k) in enumerate(edges):
        atK.setdefault(k,{})
        a=next(x for x in range(K) if x not in atR[t]); b=next(x for x in range(K) if x not in atK[k])
        if a in atK[k]:   # flip the a/b alternating path that starts at kind k (it never reaches rank t)
            path=[]; side,v,cc=("K",k,a)
            while True:
                D=atK[v] if side=="K" else atR[v]
                if cc not in D: break
                f=D[cc]; path.append(f); ft,_,fk=edges[f]
                side,v=("R",ft) if side=="K" else ("K",fk); cc=b if cc==a else a
            for f in path: ft,_,fk=edges[f]; del atR[ft][col[f]]; del atK[fk][col[f]]
            for f in path: ft,_,fk=edges[f]; col[f]=b if col[f]==a else a; atR[ft][col[f]]=f; atK[fk][col[f]]=f
        col[e]=a; atR[t][a]=e; atK[k][a]=e
    out={(col[e],t):idx for e,(t,idx,_) in enumerate(edges)}
    _GRP_CACHE[key]=out; return out
def th_index(c,age):
    """Thái hậu item index: look-group member i -> TH_AGE[age][i % 8] (different inside the group); others (n-1)%5 (unchanged)."""
    gs=group_slot(c); d=TH_AGE[age]
    if gs: return d[gs[1]%len(d)]
    n=int(c[1:]) if c[1:].isdigit() else sum(map(ord,c)); return d[(n-1)%5]
def e6_check(people,ages=("a18","a26","a36","a51","a65")):
    """E6 gate: list of (person, age, kind, ranks) where a kind repeats in t1-t8, or Nữ đế = t8 kind."""
    bad=[]
    for c in people:
        for a in ages:
            p=_e6_picks(c,a); ks=[e6_kind(p[t][0]) for t in _E6_TIERS]
            for k in set(ks):
                if ks.count(k)>1: bad.append((c,a,k,[t for t in _E6_TIERS if e6_kind(p[t][0])==k]))
            if e6_kind(p["nude"][0])==ks[-1]: bad.append((c,a,"nude=t8",ks[-1]))
    return bad
def _E11_LISTS():
    g=globals(); d={"t%d"%t:(g["L3F"][t],g["L3F_AGE"][t]) for t in range(1,7)}
    d.update({"t7":(g["ITEMS7"],g["ITEMS7_AGE"]),"t8":(g["ITEMS"],g["ITEMS_AGE"]),"nude":(g["NUDE_LIST"],g["NUDE_AGE"]),"thaihau":(g["TH_ITEMS"],g["TH_AGE"])})
    return d
def _hh(fn,hk,right): return low_hand(hk,right) if hk.startswith("L:") else fn(hk,right)
AGE_TXT={"a18":"about 22, youthful adult.","a26":"about 30, mature and poised.","a36":"about 36 but looking young for her age (trẻ trước tuổi): still youthful and very beautiful, only a touch more mature and poised than her young self, smooth skin, no visible lines, never an older face.","a65":"about 65, a truly elderly lady who ages beautifully (đẹp lão): clearly older than her 51-year-old self, with gentle visible wrinkles at the eyes, mouth and forehead, softer cheeks and jawline, a calm wise dignified look; her hair is largely silver-grey mixed with some dark strands (much more silver than at 51, but NOT pure white); still graceful, elegant and beautiful, never haggard. STYLE LOCK (same drawing as her 36-year-old picture, the second reference): exactly the same soft painterly guofeng illustration rendering, the same smooth luminous painted skin, soft stylised features and gentle painted shading as the 36-year-old picture; her age shows ONLY through the silver in her hair and a few soft painted lines, NEVER photographic, NEVER photo-realistic, no realistic skin texture, no pores, no detailed wrinkles. Her robe keeps exactly the same colours as described below, but every colour is a DEEPER, DARKER, more subdued shade suited to an elderly lady (dignified, not bright; the royal yellow becomes a deeper antique gold).","a51":"about 51, a graceful beautiful older lady who ages beautifully (đẹp lão): a slightly fuller mature face, soft fine lines at the eyes and gentle smile lines, dignified and elegant, still lovely and refined; clearly VISIBLE silver-grey streaks at the temples and in the front of her warm dark-brown hair (a visible silver patch that is easy to see at game size, hair still mostly dark, never white hair); never a 20-30-year-old face, never haggard or plain. STYLE LOCK (same drawing as her 36-year-old picture, the second reference): exactly the same soft painterly guofeng illustration rendering, the same smooth luminous painted skin, soft stylised features and gentle painted shading as the 36-year-old picture; her age shows ONLY through the silver in her hair and a few soft painted lines, NEVER photographic, NEVER photo-realistic, no realistic skin texture, no pores, no detailed wrinkles. Her robe keeps the same colour families as described below, but every colour is a DEEPER, DARKER, rich mature shade, the dark dignified tones an empress dowager or senior palace matron wears (e.g. pink becomes deep rose-plum, blue becomes deep navy blue, green becomes deep dark jade, purple becomes deep aubergine, red becomes deep burgundy; the royal yellow becomes a deep antique gold); dignified and rich, never bright."}
# D15 ELDER STYLE LOCK (owner Lượt 692+694, ART_RULES D15; ROOT-56 order): the ma ma STYLE LOCK sentence copied VERBATIM from dev/handover/reports/mama-specs/m05-a51.styleref.r55.prompt.txt
# into AGE_TXT a51/a65 at the ma ma spot (after the age words, before "Her robe keeps"). Its a36 picture is the 2nd reference; where image 2 is already the royal swatch (t6/t7/t8, triều t6-t8) only the
# ordinal changes to "third" (__main__, swatch block). Nữ đế (--state nude / --nude3) is EXCLUDED: stripped in __main__ (nude-B/mk.py owns Nữ đế). Men: emperor-B/build.py AGE_TXT = gender-swapped copy (J6).
D15_STYLE="STYLE LOCK (same drawing as her 36-year-old picture, the second reference): exactly the same soft painterly guofeng illustration rendering, the same smooth luminous painted skin, soft stylised features and gentle painted shading as the 36-year-old picture; her age shows ONLY through the silver in her hair and a few soft painted lines, NEVER photographic, NEVER photo-realistic, no realistic skin texture, no pores, no detailed wrinkles."
assert all(AGE_TXT[_a].count(D15_STYLE)==1 for _a in ("a51","a65")) and not any(D15_STYLE in AGE_TXT[_a] for _a in ("a18","a26","a36"))
D15_STYLE3=D15_STYLE.replace("the second reference):","the third reference):",1)
# C5/G4 (owner Lượt 779 via ROOT-57, MG2): at a51/a65 her elder colours (her own root colours, DEEPER, DARKER, muted like an older lady) WIN over master M05 (the medium-light
# young COLOUR RULE that master_common puts near the top). ONE bridging clause, words copied from S33 / AGE_TXT ("DEEPER, DARKER mature shades described above", "never bright, never pastel"),
# placed right after the S33 elder COLOUR RULE (i.e. after M05). Nữ đế keeps B23 (nude-B/mk.py forces the a36 rule; no S33 there -> no bridge). build_npc.py Thái hậu uses ELDER_M05_SENT.
ELDER_M05_BRIDGE="this elder colour rule wins over the first COLOUR RULE (medium-light tone): her own colours in the DEEPER, DARKER mature shades described above, never bright, never pastel; "
ELDER_M05_SENT=" At this age "+ELDER_M05_BRIDGE.rstrip("; ")+"."
# C1 (owner Lượt 779 via ROOT-57, MG2): the drawing style = the approved thiếu nữ style ONLY (master M01/M02, dev/art/MASTER_COMMON.txt). The old store style clause
# "Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering of the reference portraits; " is REMOVED (master_common.STYLE_OLD keeps it for legacy compares).
PRE=("Full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porcelain skin; gentle expression with soft eyes and a bright closed-lip smile, lips closed, no teeth, mouth never open; elegant, slim, clearly adult; beautiful/handsome romantic-lead looks for everyone; face clearly visible, body and face frontal, standing squarely facing the viewer, no turn.")
END=" Eyes soft, warm and round-almond, never slanted or upturned, never teary. Everyone beautiful at every age. No text, no labels."
# N5d item 1 (ROOT-36 order, FIGURE_GATE K3): ONE no-background sentence on EVERY figure prompt (all states), default ON. Import it: `from build import K3_BG` (W107b). Text verbatim from the order.
K3_BG=" The second reference image is style only: IGNORE its background completely; the background is completely transparent with NOTHING behind or around her: no backdrop, no parchment, no painted flowers/branches, no smoke, no haze, no glow, no stain."
K3_BG_OLD=" IGNORE the style reference image's background completely: the background is completely transparent with NOTHING behind or around her: no backdrop, no parchment, no painted flowers or branches, no smoke, no haze, no glow, no stain."   # pre-N5d wording of build_trieu (kept: build_npc.py asserts it is in this file); replaced by K3_BG in the output
# D9 (owner Lượt 529 via ROOT-50, ART_RULES D9 "every prompt says clearly NOTHING on the forehead (no hoa điền, no dot, no mark, nothing)"): ONE added sentence, owner words verbatim, on EVERY output (all states) right before END; the existing "bare clean forehead" words stay. --golden untouched. build_npc.py / emperor-B import or copy it.
D9_FOREHEAD=" NOTHING on the forehead (no hoa điền, no dot, no mark, nothing)."
FAB="The silk has real weight: the wide sleeves and robe hang and fold naturally under their own weight, with natural creases, never stiff, flat or board-like."
YEL_GOLDEN="fresh royal golden yellow, lighter depth, 18K gold tone, not pale cream, not beige/tan/ochre, not heavy mustard, not lemon"
# OWNER 18/11 ~19:05Z: NOT the c25 yellow any more; the C2 pick (img/_review/yellow-deeper/c03_a18_t8_C2.png). Measured by W77 (robe yellow pixels): median #EFBD69, IQR #E2AE4F..#F9CB84
YEL_NEW="rich warm royal golden yellow, a honey-gold close to hex #EFBD69 (medium depth, 18K gold tone), not pale cream, not beige/tan/ochre, not heavy mustard, not lemon"
# ORIGINAL robe colour of each person = the robe colour of her own t1 figure (img/_review/consort-tiers/<cNN>/b10/<cNN>_a18_t1_v0.png), image 1 of every v0 gen
# (owner 18:35Z: one original colour for all ranks; NO third reference image). hex = median of the robe area of that t1 (head/skin/gold excluded, measure.py), checked by eye.
# People not listed fall back to the jobs.json palette (colour family) until measured.
ORIG1={
"c01":("soft coral pink silk like #F19489","a deeper coral like #E17A70"),
"c02":("muted blue silk like #838AA1","a silvery grey like #B3ADB4"),
"c03":("muted olive green silk like #97946D","a deeper olive like #747250"),
"c04":("mauve purple silk like #9B688D","a soft pink-lilac like #D7B0C2"),
"c05":("muted teal silk like #697974","a grey-sage like #8F9486"),
"c06":("soft vermilion silk like #D28977","jade green like #6AAF98"),   # PALFIX a3 (owner L1419): B20 thu (root) colours; was coral red #D5745E / deeper coral red #BA5F49
"c07":("soft rose pink silk like #E2B8B8","a dusty rose like #CDA2A6"),
"c08":("soft cherry-blossom pink silk like #F0B9BB","a pale sage green like #A9B596"),
"c10":("soft peach silk like #F2C6A5","a cream like #F3E2CC"),
"c09":("pale silver grey-blue silk like #CAC6C8","a silvery grey like #A8A9AD"),
"c11":("soft pink-grey silk like #D6BFC3","a dusty rose like #B198A0"),
"c16":("muted sage green silk like #9CA283","a cream like #E6DCC0"),
"c20":("soft rose pink silk like #E9B5AE","a pale pink like #F0D6CF"),
"c23":("coral red silk like #BA5B44","a cream like #EBDCC4"),
"c24":("coral red silk like #D97B60","a pale blush cream like #F3D1B1"),
"c25":("brick rust red silk like #8C4D40","a warmer red like #B86457"),
"c12":("pale sage green silk like #C9D2B4","a cream like #E8DCC4"),
"c13":("apricot peach silk like #EBA98E","a soft peach like #F0C5B0"),
"c14":("butter cream yellow silk like #EBDDB0","a pale cream like #F0E6CC"),
"c15":("soft coral pink silk like #E0A398","a pale pink like #EBC4BA"),
"c17":("soft rose pink silk like #E5A598","a pale blush like #F0C6BB"),
"c18":("mauve rose silk like #BF868F","a soft lilac-pink like #D9B5C5"),
"c19":("dusty rose silk like #B97E78","a pale pink like #E3B9B0"),
"c21":("rose red silk like #C9746C","a blush pink like #E8B5AC"),
"c22":("soft lavender silk like #CDB9DC","a pale pink like #EBC7D0"),
"c26":("dusty rose red silk like #C4736E","a cream blush like #E7C4AB"),
"c27":("terracotta coral red silk like #C27362","a pale cream blush like #EBCFBE"),
"c28":("ivory cream silk like #EEDED1","a pale sage-cream like #DCCBB8"),
"c29":("muted mauve-lilac silk like #BCA7AB","a soft pink-mauve like #D8C1C1"),
"c30":("pale ivory silk like #EBDFD9","a soft grey-lilac like #C1BCBE"),
"c31":("pale celadon-cream silk like #D4C6B4","a soft sage like #BAB09B"),
"c32":("ivory cream silk like #EEDCCE","a pale ivory-taupe like #C5B5A8"),
}
# 3f t8 list (10 items): (text, hand-template key)
ITEMS=[("a gold ruyi set with gems","one"),("an imperial phoenix-embroidered round fan with a gold-and-jade handle and pearl tassels","two"),
("a gold-mounted imperial scroll","scroll"),("a gold phoenix seal box","box"),("a phoenix-headed gold hand mirror with pearls","one"),
("a gold phoenix-shaped incense ball","one"),("a kingfisher-and-pearl phoenix folding fan with gold ribs","two"),
("a gold lidded jewel casket with a phoenix and pearls","box"),("an imperial book bound in gold-thread silk","two"),
("a gold phoenix palace lantern with pearl tassels","two"),
("a gold phoenix hairpin with pearl dangles, slim and palm-length, held between her fingers, never a sceptre","one"),
("a pair of mandarin ducks carved in white jade on a pearl cord","one"),
("a white-jade flute with gold phoenix bands","two"),
("a small pipa lute inlaid with mother-of-pearl phoenixes","two"),
("a closed imperial phoenix-embroidered silk parasol with a jade handle","one"),
("a white-jade perfume flask with a gold phoenix stopper","one"),
("a gold phoenix hair comb set with pearls, held in the hand","one"),
("a small hand-held table screen of phoenix-embroidered imperial silk in a jade frame","two"),
("a cloisonné hand censer with phoenixes and pearl tassels","one"),
("a hand warmer of gold carved with phoenixes in an imperial silk cover","two"),
("a small coral branch on a gold phoenix stand","box"),
("a sutra book bound in phoenix-embroidered imperial silk","two"),
("a small white-jade statuette of Guanyin on a gold stand","two"),
("a round imperial-jade longevity plaque carved with a round shou symbol, on a gold stand","two"),
("a pair of imperial-jade health balls","two"),
("an imperial phoenix-embroidered silk ball (tú cầu) with pearl tassels, a round stuffed ball held in the palm or by its cord, no handle","one"),
("a folded letter on gold-flecked imperial paper tied with a pearl cord","two"),
("a gold phoenix pellet drum (trống lắc) with pearl strings, a short deep drum seen side-on so its round body shows, two knotted pellets on cords at its sides, a short stick handle, never a flat disc, never on a long pole","one"),
("an embroidery hoop in a gold phoenix frame with an imperial-silk scene, two thin rings clamping the cloth stretched tight and flat, a needle and thread in the half-done stitching, never on a handle","two"),
("a phoenix-embroidered imperial-silk round fan with pearl tassels","one"),
("a gold phoenix pendant set with pearls on a silk cord","one"),
("a gold phoenix hand bell with pearl tassels","one"),
("a gold phoenix basket of pearl-and-jade flowers","box"),
("a calligraphy brush with a gold phoenix shaft and a white-jade cap","one"),
("a gold phoenix fly-whisk with a white-jade handle","one"),
("a string of pearl prayer beads with a gold phoenix tassel","one"),
("a white-jade lotus lamp with gold phoenix mounts","two"),
("a phoenix-headed gold walking staff with pearl tassels","one"),
("a small potted orchid in a gold phoenix pot","two"),
("a carved imperial-jade lingzhi fungus on a gold stand","two")]
# E11 (owner Lượt 583/585, IT1): +15 items appended (the first 10 unchanged, same order) -> 25; {age: 5 indices}, 25 different items per rank, adjacent ranks (t1..t8, Nữ đế, Thái hậu) never share an item kind at one age. Pick: LIST[AGE_DICT[age][(n-1)%5]].
ITEMS_AGE={"a18": [14, 10, 15, 7, 3, 25, 26, 27], "a26": [12, 16, 17, 4, 11, 28, 29, 30], "a36": [13, 18, 2, 1, 20, 31, 32, 33], "a51": [8, 19, 22, 21, 5, 34, 35, 36], "a65": [24, 6, 0, 23, 9, 37, 38, 39]}
GOLDEN_ITEM={"c06":0,"c16":1,"c20":2,"c25":3}   # as run in the A/B test
EXTRA_ITEM={"c24":5}   # c24 would repeat neighbour c25
def hand(key,right):
    d="right" if right else "left"; o="left" if right else "right"
    if key=="one": return f"the item upright in one hand at chest height below the chin, the other hand resting over her sash, body and face frontal, standing squarely facing the viewer, no turn"
    if key=="two": return "the item in both hands lowered before her at waist height, body and face frontal, standing squarely facing the viewer, no turn, head tilted gently toward the viewer"
    if key=="scroll": return f"the rolled scroll in one hand lowered at her side, the other hand lifting her sleeve slightly, body and face frontal, standing squarely facing the viewer, no turn"
    return f"the box in both hands at waist height before her, body and face frontal, standing squarely facing the viewer, no turn"
# per-person headdress text (her OWN live a18 headdress motif, copied from the live fig-consort-cNN-t8-a18 image, scaled up to the rank). Only used with --head.
HEAD={
"c04-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: one large gold phoenix with spread wings perched on top of a wide gold crown band set with small pink flowers, pearls and a single blue sapphire at the centre, gold blossom-branch sprigs curving out to both sides of the head with a large pink peony at each temple, and long gold-and-pearl strand dangles hanging from the sides",
"c25-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: three gold phoenixes with swept-back spread wings (one large central phoenix rising from the middle of a gold crown band, a smaller phoenix on each side facing outward) set with a single red ruby at the centre and small ruby flowers, a coral-pink peony at each temple, and long straight gold-and-pearl tassel dangles hanging from the sides",
"c01-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: one large central gold phoenix with raised wings flanked by two smaller gold phoenixes facing outward, rising from a gold crown band densely set with large blossoms and a single red ruby at the centre, long straight gold-and-pearl bead dangles hanging from both sides",
"c01-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): one large central gold phoenix with raised wings flanked by two smaller gold phoenixes facing outward, rising from a gold crown band densely set with large blossoms and a single red ruby at the centre, long straight gold-and-pearl bead dangles hanging from both sides",
"c02-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a large central gold-and-pearl phoenix with wide feathered wings spread horizontally on top of a jewelled crown band, sprays of small pearl-and-gold blossom sprigs fanning out to both sides, a red gem at the centre, long pearl strand dangles with pearl drops hanging from the sides",
"c02-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a large central gold-and-pearl phoenix with wide feathered wings spread horizontally on top of a jewelled crown band, sprays of small pearl-and-gold blossom sprigs fanning out to both sides, a red gem at the centre, long pearl strand dangles with pearl drops hanging from the sides",
"c03-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a central gold phoenix with wings spread wide flanked by delicate gold leaf sprays, a gold crown band with many small blossoms and a butterfly ornament, a few small flower pins, long beaded dangles with small flower drops hanging from both sides",
"c03-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a central gold phoenix with wings spread wide flanked by delicate gold leaf sprays, a gold crown band with many small blossoms and a butterfly ornament, a few small flower pins, long beaded dangles with small flower drops hanging from both sides",
"c05-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a gold phoenix with wide spread wings perched on a tall rounded crown band set with large peonies and jewels, small gold flower sprigs along the sides, long straight gold bead-and-pearl dangles hanging from both sides",
"c05-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a gold phoenix with wide spread wings perched on a tall rounded crown band set with large peonies and jewels, small gold flower sprigs along the sides, long straight gold bead-and-pearl dangles hanging from both sides",
"c06-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a large gold phoenix with wide swept wings above a tall ornate gold crown band set with a cluster of flowers at the front, curling gold leaf-and-flower sprays rising on both sides of the head, long gold dangles with a few pearl drops hanging from the sides",
"c06-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a large gold phoenix with wide swept wings above a tall ornate gold crown band set with a cluster of flowers at the front, curling gold leaf-and-flower sprays rising on both sides of the head, long gold dangles with a few pearl drops hanging from the sides",
"c07-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a small gold phoenix with spread wings perched above a wide crown band covered with many delicate blossoms, sprays of small flowers and leaves fanning out to both sides, many thin pearl strand dangles hanging from the crown",
"c07-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a small gold phoenix with spread wings perched above a wide crown band covered with many delicate blossoms, sprays of small flowers and leaves fanning out to both sides, many thin pearl strand dangles hanging from the crown",
"c08-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a large central gold phoenix with raised wings flanked by two smaller gold phoenixes facing outward, a gold crown band set with large blossoms and a red gem at the centre, long straight gold-and-pearl bead dangles hanging from both sides",
"c08-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a large central gold phoenix with raised wings flanked by two smaller gold phoenixes facing outward, a gold crown band set with large blossoms and a red gem at the centre, long straight gold-and-pearl bead dangles hanging from both sides",
"c09-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a tall fan-shaped crown of layered feather-like wings rising behind a central lotus-and-phoenix motif with a red gem at the centre, gold leaf-and-flower sprays fanning out to both sides, long straight gold-and-pearl bead dangles hanging from both sides",
"c09-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a tall fan-shaped crown of layered feather-like wings rising behind a central lotus-and-phoenix motif with a red gem at the centre, gold leaf-and-flower sprays fanning out to both sides, long straight gold-and-pearl bead dangles hanging from both sides",
"c10-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a large gold phoenix with raised wings on top of a gold crown band with a red gem at the centre, smaller gold phoenix heads and curling gold sprigs set with small flowers fanning out to both sides, long straight gold bead dangles hanging from the sides",
"c10-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a large gold phoenix with raised wings on top of a gold crown band with a red gem at the centre, smaller gold phoenix heads and curling gold sprigs set with small flowers fanning out to both sides, long straight gold bead dangles hanging from the sides",
"c11-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a central gold phoenix with spread wings on a crown band of many large peonies and small flowers with a red gem at the centre, curling gold sprigs with small gems on both sides, long thin bead dangles with small tassels hanging from the sides",
"c11-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a central gold phoenix with spread wings on a crown band of many large peonies and small flowers with a red gem at the centre, curling gold sprigs with small gems on both sides, long thin bead dangles with small tassels hanging from the sides",
"c12-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a central lotus-shaped gold ornament flanked by two gold phoenix-like birds facing each other on a crown band set with large flowers and jade-coloured leaves, gold sprigs on both sides, long thin gold-and-pearl bead dangles hanging from the sides",
"c12-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a central lotus-shaped gold ornament flanked by two gold phoenix-like birds facing each other on a crown band set with large flowers and jade-coloured leaves, gold sprigs on both sides, long thin gold-and-pearl bead dangles hanging from the sides",
"c13-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: two gold phoenixes with soft spread wings rising from a crown band covered with many pale blossoms and soft ornaments, pearl-and-bead strand dangles hanging from the sides",
"c13-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): two gold phoenixes with soft spread wings rising from a crown band covered with many pale blossoms and soft ornaments, pearl-and-bead strand dangles hanging from the sides",
"c14-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a large central gold phoenix with spread wings flanked by two smaller gold phoenixes facing outward, rising from a crown band covered with many soft blossoms, long fine bead-and-pearl strand dangles hanging from both sides",
"c14-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a large central gold phoenix with spread wings flanked by two smaller gold phoenixes facing outward, rising from a crown band covered with many soft blossoms, long fine bead-and-pearl strand dangles hanging from both sides",
"c15-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a gold phoenix with raised wings on a tall rounded crown band of layered feather-like wings and many small blossoms, a gold ornament at the centre, long fine pearl strand dangles hanging from the sides",
"c15-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a gold phoenix with raised wings on a tall rounded crown band of layered feather-like wings and many small blossoms, a gold ornament at the centre, long fine pearl strand dangles hanging from the sides",
"c16-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a central gold phoenix with spread wings flanked by smaller gold bird ornaments on a tall crown band covered with many small gold-and-jade blossoms and leaves with a gem at the centre, long fine bead dangles hanging from the sides",
"c16-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a central gold phoenix with spread wings flanked by smaller gold bird ornaments on a tall crown band covered with many small gold-and-jade blossoms and leaves with a gem at the centre, long fine bead dangles hanging from the sides",
"c17-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a central gold phoenix with wide feathered wings on a crown band set with a red gem and large peonies on each side, tall gold sprigs with small flowers curving out to both sides, long straight gold-and-pearl bead dangles hanging from both sides",
"c17-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a central gold phoenix with wide feathered wings on a crown band set with a red gem and large peonies on each side, tall gold sprigs with small flowers curving out to both sides, long straight gold-and-pearl bead dangles hanging from both sides",
"c18-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a large central gold phoenix with wide spread wings and a smaller bird ornament above it, on a crown band of small blossoms, gold phoenix-head sprigs with large peonies fanning out to both sides, long straight gold-and-pearl bead dangles hanging from both sides",
"c18-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a large central gold phoenix with wide spread wings and a smaller bird ornament above it, on a crown band of small blossoms, gold phoenix-head sprigs with large peonies fanning out to both sides, long straight gold-and-pearl bead dangles hanging from both sides",
"c19-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a gold phoenix with wings spread wide and low across a crown band set with a cluster of small flowers and a red gem, gold leaf-and-flower sprays rising on both sides with a large peony at each temple, long gold dangles with pearl drops hanging from the sides",
"c19-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a gold phoenix with wings spread wide and low across a crown band set with a cluster of small flowers and a red gem, gold leaf-and-flower sprays rising on both sides with a large peony at each temple, long gold dangles with pearl drops hanging from the sides",
"c20-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a central gold phoenix with a second phoenix beside it, both with raised wings, on a crown band covered with many pale blossoms and gold leaf sprays fanning out to both sides, long straight gold-and-pearl bead dangles hanging from both sides",
"c20-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a central gold phoenix with a second phoenix beside it, both with raised wings, on a crown band covered with many pale blossoms and gold leaf sprays fanning out to both sides, long straight gold-and-pearl bead dangles hanging from both sides",
"c21-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a gold phoenix with wide raised wings above a plain polished gold crown band with a red gem at the centre, a cluster of large peonies and small flowers at each temple, tall gold sprigs on both sides, long straight gold bead dangles hanging from the sides",
"c21-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a gold phoenix with wide raised wings above a plain polished gold crown band with a red gem at the centre, a cluster of large peonies and small flowers at each temple, tall gold sprigs on both sides, long straight gold bead dangles hanging from the sides",
"c22-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a central gold phoenix with raised wings and a red gem on a crown band, smaller gold phoenix heads and curling gold sprigs with small blossoms on both sides, long straight gold bead dangles hanging from both sides",
"c22-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a central gold phoenix with raised wings and a red gem on a crown band, smaller gold phoenix heads and curling gold sprigs with small blossoms on both sides, long straight gold bead dangles hanging from both sides",
"c23-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a large gold phoenix with a long curving neck and enormous feathered wings spread wide on top of the head, large blossom clusters at both temples, long gold bead-and-pearl dangles hanging from both sides",
"c23-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a large gold phoenix with a long curving neck and enormous feathered wings spread wide on top of the head, large blossom clusters at both temples, long gold bead-and-pearl dangles hanging from both sides",
"c24-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a central gold phoenix with spread wings and a red gem below it, a gold lotus-flame ornament rising above, soft feathered wings curving out to both sides with small blossoms, long gold bead-and-pearl dangles hanging from both sides",
"c24-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a central gold phoenix with spread wings and a red gem below it, a gold lotus-flame ornament rising above, soft feathered wings curving out to both sides with small blossoms, long gold bead-and-pearl dangles hanging from both sides",
"c26-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a gold phoenix with spread wings on top of a crown band of small blossoms with a large peony at each temple, curling gold sprigs and a small gold bird on both sides, long gold dangles hanging from the sides",
"c26-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a gold phoenix with spread wings on top of a crown band of small blossoms with a large peony at each temple, curling gold sprigs and a small gold bird on both sides, long gold dangles hanging from the sides",
"c27-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a gold phoenix with wide spread wings on a gold crown band with a ring of small coral flowers and blossom sprigs rising around it, a large pink flower at each temple, long gold bead-and-pearl dangles with small tassels hanging from the sides",
"c27-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a gold phoenix with wide spread wings on a gold crown band with a ring of small coral flowers and blossom sprigs rising around it, a large pink flower at each temple, long gold bead-and-pearl dangles with small tassels hanging from the sides",
"c28-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a large central gold flower medallion with a red gem at its heart rising from the crown, wide feather-like gold wings and blossom clusters spreading out to both sides, a gem pendant at the centre of the forehead edge, many long straight gold-and-pearl bead dangles hanging from both sides",
"c28-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a large central gold flower medallion with a red gem at its heart rising from the crown, wide feather-like gold wings and blossom clusters spreading out to both sides, a gem pendant at the centre of the forehead edge, many long straight gold-and-pearl bead dangles hanging from both sides",
"c29-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a central gold phoenix pair facing each other with soft feathered wings spread wide behind them, a crown band set with large peonies on each side and a red gem at the centre, long gold dangles with small jewelled ornaments hanging from both sides",
"c29-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a central gold phoenix pair facing each other with soft feathered wings spread wide behind them, a crown band set with large peonies on each side and a red gem at the centre, long gold dangles with small jewelled ornaments hanging from both sides",
"c30-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a large gold phoenix with wings spread wide perched on top of a very broad crown band layered with many pale blossoms, gold leaf sprigs and a blue gem at the centre, long gold-and-pearl bead dangles with jewelled drops hanging from both sides",
"c30-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a large gold phoenix with wings spread wide perched on top of a very broad crown band layered with many pale blossoms, gold leaf sprigs and a blue gem at the centre, long gold-and-pearl bead dangles with jewelled drops hanging from both sides",
"c31-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a gold phoenix with wide raised wings on a crown band covered with fine gold leaf sprays and many small blossoms with a green gem at the centre, long straight gold-and-pearl bead dangles hanging from both sides",
"c31-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a gold phoenix with wide raised wings on a crown band covered with fine gold leaf sprays and many small blossoms with a green gem at the centre, long straight gold-and-pearl bead dangles hanging from both sides",
"c32-t8":"her OWN headdress design from her first reference, enlarged to imperial grandeur: a central gold phoenix with spread wings flanked by two smaller phoenixes on a crown band covered with small blossoms and gems, long fine pearl-and-bead strand dangles hanging densely from both sides",
"c32-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): a central gold phoenix with spread wings flanked by two smaller phoenixes on a crown band covered with small blossoms and gems, long fine pearl-and-bead strand dangles hanging densely from both sides",
"c04-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): one large gold phoenix with spread wings perched on top of a wide gold crown band set with small pink flowers, pearls and a single blue sapphire at the centre, gold blossom-branch sprigs curving out to both sides of the head with a large pink peony at each temple, and long gold-and-pearl strand dangles hanging from the sides",
"c25-t7":"her OWN headdress design from her first reference, enlarged to a grand noble-consort crown (slightly simpler than the Empress's): three gold phoenixes with swept-back spread wings (one large central phoenix rising from the middle of a gold crown band, a smaller phoenix on each side facing outward) set with a single red ruby at the centre and small ruby flowers, a coral-pink peony at each temple, and long straight gold-and-pearl tassel dangles hanging from the sides",
}

def item_for(c):
    n=int(c[1:])
    if c in GOLDEN_ITEM: return GOLDEN_ITEM[c]
    if c in EXTRA_ITEM: return EXTRA_ITEM[c]
    return (n*3+(n//10))%10 if (n*3)%10 not in GOLDEN_ITEM.values() else (n*3+1)%10
def colour(c,v,golden):
    pal,_=DATA[c]; main=pal.split(" and ")[0]; fam=pal
    if golden: return (f"her own signature colour {main} (colour family {fam}, as in her first reference) stays clearly visible as a main colour of the robe and sleeves, mixed with a golden yellow in the inner robe, borders, sash and large areas of the sleeves and skirt; the yellow is {YEL_GOLDEN}; the crown, hairpin and jewellery gold in the same 18K tone; gold only as thin accents on the borders; NOT an all-yellow robe.",main)
    fresh="all colours fresh, clear and luminous, never dusty or greyed; "
    if v=="v0" and c in ORIG1: return (f"{fresh}her ORIGINAL robe colour is kept exactly as in image 1 (her first reference): {ORIG1[c][0]}, with {ORIG1[c][1]} in the linings; the royal golden yellow is the DOMINANT colour of the robe, sleeves and skirt (more than half of everything visible), her colour is the second colour (collar, inner robe, wide borders and a few panels); the yellow is {YEL_NEW}; the crown, hairpin and jewellery gold in the same 18K tone; gold only as thin accents on the borders; NOT an all-yellow robe.",ORIG1[c][0].split(" silk")[0])
    if v=="v0": return (f"{fresh}her own signature colour {main} (colour family {fam}, as in her first reference) is the second colour (collar, inner robe, wide borders and a few panels); the royal golden yellow is the DOMINANT colour of the robe, sleeves and skirt (more than half of everything visible); the yellow is {YEL_NEW}; the crown, hairpin and jewellery gold in the same 18K tone; gold only as thin accents on the borders; NOT an all-yellow robe.",main)
    if v=="v1": return (f"{fresh}the royal golden yellow is the MAIN colour of the robe and sleeves, with one fresh accent of her colour {main} (inner robe, collar and a few borders); the yellow is {YEL_NEW}; the crown, hairpin and jewellery gold in the same 18K tone; NOT dusty, NOT pale.",main)
    f=V2[c]; return (f"{fresh}a fresh {f} (a different colour family from her first reference) is the second colour (collar, inner robe, wide borders and a few panels); the royal golden yellow is the DOMINANT colour of the robe, sleeves and skirt (more than half of everything visible); the yellow is {YEL_NEW}; the crown, hairpin and jewellery gold in the same 18K tone; gold only as thin accents on the borders; NOT an all-yellow robe.",f)
def build(c,v="v0",golden=False):
    pal,face=DATA[c]; rule,main=colour(c,v,golden); item,hk=age_item(c,"t8",*ITEMS[item_for(c)]); right=(int(c[1:])%2==1) if c not in GOLDEN_ITEM else {"c06":True,"c25":True,"c16":True,"c20":False}[c]
    robe=main if golden else "golden yellow"
    s=PRE+f" An imperial consort, the Empress. Her face: {face}. From the identity reference keep ONLY her face, facial features, hairstyle colour and signature colour family; do NOT copy the outfit, hair ornaments or accessories of the reference, dress her in the NEW outfit below. The style reference image is only for skin, drawing style, fabric and embroidery: never copy its face, body or pose. {AGE_TXT[AGE]}"
    s+=f" Outfit (the Empress (Hoàng hậu), clearly much richer and more splendid than the lower ranks): the Empress's imperial phoenix ceremonial robe of {robe} silk{(" mixed with "+main) if (not golden and v!="v1") else " mixed with golden yellow" if golden else ""}, richly embroidered on the chest, shoulders and wide sleeves with large phoenixes, peonies and clouds in gold and kingfisher-blue silk thread (far denser than any other rank), this one robe worn over an inner dress of the lining colour; a SQUARE neckline at a modest height (no crossed collar), framed (across the upper chest AND up both sides to the shoulders) by a wide flat pearl-edged gold-embroidered band, always fully visible; a wide jewelled gold-and-pearl cloud collar with layered pearl fringes over the shoulders, its front cut away so the square neckline stays fully visible, many pearl strands lying flat on the cloud collar, a jade-and-gold belt with long tassels, slim tall silhouette; the GRANDEST headdress of all: a FULL tall imperial nine-phoenix crown, clearly taller and wider than a noble consort's crown, with a large central gold phoenix holding a pearl string in its beak, jewelled wings spreading wide on both sides, kingfisher-blue inlay, rubies and pearls, and a few clean pearl tassels at the sides."
    s+=" COLOUR RULE: "+rule
    s+=" The phoenix is the main embroidered motif, larger and more prominent than the flowers."
    s+=" All flowers, birds and the phoenix are fine silk-thread embroidery stitched directly into the fabric, flat and integrated with the cloth, following its folds, not appliqué, not pasted patches, not raised. "+FAB
    s+=f" Pose: calm standing pose; she holds {item} in a contrasting colour, not the robe colour, the item held below the chin, the hand really gripping it, the whole face fully visible. Her hands interact naturally with the item (gently presenting, turning or touching it), lively and natural, while her head stays up facing the viewer, eyes open, lips closed, never looking down. Her hands and body: {_hh(hand,hk,right)}."
    s+=" Every hairpin is inserted into the hair pointing upward or backward with dangles hanging down, no hairpin horizontal or sticking out to the side. Luminous smooth porcelain skin, bare clean forehead with no forehead mark and no flower mark, eyes open, floor-length robe, only slipper toe tips peeking under the hem, no train, no cup, nothing covering the face."
    return s+END

# ---------- t7 Hoang quy phi variant (same method; colour slot: ORIGINAL t7 colour MAIN + royal yellow ONLY as parts) ----------
ITEMS7=[("a gilded hand censer","c"),("an imperial round fan with a gold filigree frame and gems","two"),("a gold-filigree jewel casket set with gems","box"),
("a kingfisher-feather folding fan with gold ribs","two"),("a gold lotus-shaped incense box","box"),("a gold hand mirror set with gems","one"),
("a gold lotus lamp set with gems","one"),("a gold-filigree palace lantern with gem tassels","two"),("a gold flower basket set with gems","box"),
("a gold-and-coral bead string held as a hand ornament","one"),
("a gold-filigree butterfly hairpin with kingfisher-feather wings, held in the hand","one"),
("a kingfisher-feather silk ball (tú cầu) with gem tassels, a round stuffed ball held in the palm or by its cord, no handle","one"),
("a jade flute with gold-filigree bands and gem tassels","two"),
("a small pipa lute inlaid with gold filigree and gems","two"),
("a closed kingfisher-feather silk parasol with a gold handle","one"),
("a poetry book bound in kingfisher silk with gold clasps","two"),
("a gold-filigree perfume flask set with gems","one"),
("a gold-filigree hair comb set with gems, held in the hand","one"),
("a small hand-held table screen of kingfisher-feather silk in a gold frame","two"),
("a gold-filigree birdcage with its silk cover drawn back","one"),
("a gold-filigree hand warmer in a kingfisher-silk cover","two"),
("an imperial-jade ruyi with gold-filigree mounts","two"),
("a sutra book bound in kingfisher silk","two"),
("a jade walking staff with a gold-filigree head","one"),
("a carved imperial-jade crane on a gold stand","two"),
("a folded letter on gold-flecked kingfisher-blue paper tied with a silk cord","two"),
("a gold-filigree pellet drum (trống lắc) with gem tassels, a short deep drum seen side-on so its round body shows, two knotted pellets on cords at its sides, a short stick handle, never a flat disc, never on a long pole","one"),
("an embroidery hoop in a gold-filigree frame with a kingfisher-silk scene, two thin rings clamping the cloth stretched tight and flat, a needle and thread in the half-done stitching, never on a handle","two"),
("a gold-filigree round fan set with gems","one"),
("a name seal of imperial jade with a gold-filigree knob","one"),
("a kingfisher-silk handkerchief embroidered with gold","two"),
("a gold-filigree pendant set with gems on a silk cord","one"),
("an imperial-jade hand bell with gold-filigree mounts","one"),
("a calligraphy brush with a gold-filigree shaft","one"),
("a pair of gold-filigree health balls set with gems","two"),
("a gold-filigree fly-whisk with an imperial-jade handle","one"),
("a hanging scroll on kingfisher silk with gold-filigree rollers","two"),
("a small potted orchid in a gold-filigree pot set with gems","two"),
("a string of imperial-jade prayer beads with a gold tassel","one"),
("a round gold-filigree longevity plaque carved with a round shou symbol, set with gems","two")]
# E11 (owner Lượt 583/585, IT1): +15 items appended (the first 10 unchanged, same order) -> 25; {age: 5 indices}, 25 different items per rank, adjacent ranks (t1..t8, Nữ đế, Thái hậu) never share an item kind at one age. Pick: LIST[AGE_DICT[age][(n-1)%5]].
ITEMS7_AGE={"a18": [1, 12, 6, 8, 11, 25, 26, 27], "a26": [10, 16, 13, 19, 21, 28, 29, 30], "a36": [14, 9, 2, 18, 7, 31, 32, 33], "a51": [0, 3, 4, 5, 17, 34, 35, 36], "a65": [22, 24, 23, 20, 15, 37, 38, 39]}
GOLDEN7={"c06":0,"c25":2}
def hand7(key,right):
    d="right" if right else "left"
    if key=="c": return f"the censer held in one hand at chest height below the chin, the other hand resting lightly on her sash, body and face frontal, standing squarely facing the viewer, no turn"
    if key=="one": return f"the item held in one hand at chest height below the chin, the other hand resting lightly on her sash, body and face frontal, standing squarely facing the viewer, no turn"
    if key=="two": return "the item held in both hands lowered before her at waist height, body and face frontal, standing squarely facing the viewer, no turn, head tilted gently toward the viewer"
    return f"the item held in both hands at waist height before her, body and face frontal, standing squarely facing the viewer, no turn"
# T7V2 (W77 18/11): third fresh colour family per person for t7 v2 (not her t1 family, not her V2 family, never dusty/rực). t7 v1 = V2[c] as MAIN.
T7V2={'c01': 'azure blue', 'c02': 'turquoise', 'c03': 'sky blue', 'c04': 'rose pink', 'c05': 'jade green', 'c06': 'leaf green', 'c07': 'orchid purple', 'c08': 'lavender violet', 'c09': 'turquoise', 'c10': 'azure blue', 'c11': 'sky blue', 'c12': 'orchid purple', 'c13': 'jade green', 'c14': 'coral pink', 'c15': 'lavender violet', 'c16': 'azure blue', 'c17': 'leaf green', 'c18': 'turquoise', 'c19': 'sky blue', 'c20': 'jade green', 'c21': 'leaf green', 'c22': 'peach orange', 'c23': 'orchid purple', 'c24': 'azure blue', 'c25': 'lavender violet', 'c26': 'turquoise', 'c27': 'sky blue', 'c28': 'orchid purple', 'c29': 'jade green', 'c30': 'leaf green', 'c31': 'lavender violet', 'c32': 'rose pink'}
def build_t7(c,v="v0"):
    pal,face=DATA[c]; n=int(c[1:]); i=GOLDEN7.get(c,(n*3+5)%10); item,hk=age_item(c,"t7",*ITEMS7[i]); right=(c=="c25") if c in GOLDEN7 else n%2==1
    m,m2=ORIG1[c] if c in ORIG1 else (pal.split(" and ")[0]+" silk",pal.split(" and ")[-1])
    main=m.split(" silk")[0]
    nf=V2[c] if v=="v1" else T7V2[c] if v=="v2" else None
    if nf: main=nf
    s=PRE+f" An imperial consort. Her face: {face}. From the identity reference keep ONLY her face, facial features, hairstyle colour and signature colour family; do NOT copy the outfit, hair ornaments or accessories of the reference, dress her in the NEW outfit below. The style reference image is only for skin, drawing style, fabric and embroidery: never copy its face, body or pose. {AGE_TXT[AGE]}"
    s+=f" Outfit (rank-7 imperial noble consort (Hoàng quý phi), clearly much richer and more splendid than the lower ranks): a near-empress ceremonial robe of {main} silk, embroidered with phoenixes, peonies and auspicious clouds in gold thread on the chest and along the borders, a jewelled cloud-collar cape edged with pearls and gold over the shoulders, pearl strands lying flat on the cloud-collar cape, a jade-and-gold belt with long tassels, floor-length robe, only slipper toe tips peeking under the hem; tall grand chignon crowned by a LARGE ornate gold phoenix crown (one large gold phoenix with spreading wings, grander and taller than a noble consort's headdress, but clearly simpler than the Empress's nine-phoenix crown) with pearl strands, kingfisher-blue inlay and a few gold tassels."
    s+=f" COLOUR RULE: all colours fresh, clear and luminous, never dusty or greyed; "+(f"her ORIGINAL robe colour is kept exactly as in image 1 (her first reference): {m} is the MAIN colour of the robe, cape and sleeves, with {m2} in the linings" if not nf else f"a fresh {nf} (a different colour family from her first reference) is the MAIN colour of the robe, cape and sleeves, with a paler tint of the same {nf} in the linings")+f"; yellow as clearly larger visible parts (wide yellow borders along the front opening, sleeves and hem, a wide yellow sash, a broad yellow collar and a wide inner panel of the robe, well visible at game size) in {YEL_NEW}; the crown, hairpin and jewellery gold in the same 18K tone; NOT an all-yellow robe."
    s+=" All flowers, birds and the phoenix are fine silk-thread embroidery stitched directly into the fabric, flat and integrated with the cloth, following its folds, not appliqué, not pasted patches, not raised. "+FAB
    s+=f" Pose: calm standing pose; she holds {item} in a contrasting colour, not the robe colour, the item held below the chin, the hand really gripping it, the whole face fully visible. Her hands interact naturally with the item (gently presenting, turning or touching it), lively and natural, while her head stays up facing the viewer, eyes open, lips closed, never looking down. Her hands and body: {_hh(hand7,hk,right)}."
    s+=" Every hairpin is inserted into the hair pointing upward or backward with dangles hanging down, no hairpin horizontal or sticking out to the side. Luminous smooth porcelain skin, bare clean forehead with no forehead mark and no flower mark, eyes open, floor-length robe, only slipper toe tips peeking under the hem, no train, no cup, nothing covering the face."
    return s+END

# ---------- t1..t6 variant (same recipe as t8 B; NO phoenix; sample c06 c25 only so far) ----------
# ORIGINAL ladder outfit text of that rank (jobs.json N-cNN-tK 'Outfit for all four ...' segment, copied unchanged)
OUTFIT_LOW={
"c06-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of butterflies at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family vermilion and jade green stays the MAIN robe colour (vermilion, NOT green); the robe itself is clearly vermilion silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c06-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family vermilion and jade green stays the MAIN robe colour (vermilion, NOT green); the robe itself is clearly vermilion silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c06-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED vermilion silk, embroidered with phoenixes and butterflies in vermilion and gold thread along the borders, an embroidered vermilion pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; more luxury than the rank below: rich gold-thread embroidery covering much of the robe, a pearl-edged collar trim, a few strands of pearls across the chest, and a grander gold headdress with more gold ornaments, elegant, NOT a pile of jewels, still clearly less grand than the imperial noble consort; plus a clearly visible amount of royal yellow: a yellow inner robe panel, a yellow sash and narrow yellow borders, the royal yellow is exactly the colour of the flat colour swatch image (image 3, a honey-gold close to hex #F2BC61, 18K gold tone, not pale cream, not beige, not mustard); image 3 is only a colour reference, never copy anything but its colour; her own colour stays clearly the main robe colour, much less yellow than an imperial noble consort's robe; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly vermilion silk (her signature colour family vermilion and jade green), with large areas of plain vermilion silk visible; jade green only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green",
"c25-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of bamboo leaves at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family deep cherry red and black-gold stays the MAIN robe colour (deep cherry red, NOT green); the robe itself is clearly deep cherry red silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c25-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family deep cherry red and black-gold stays the MAIN robe colour (deep cherry red, NOT green); the robe itself is clearly deep cherry red silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c25-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED deep cherry red silk, embroidered with phoenixes and bamboo leaves in deep cherry red and gold thread along the borders, an embroidered deep cherry red pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; more luxury than the rank below: rich gold-thread embroidery covering much of the robe, a pearl-edged collar trim, a few strands of pearls across the chest, and a grander gold headdress with more gold ornaments, elegant, NOT a pile of jewels, still clearly less grand than the imperial noble consort; plus a clearly visible amount of royal yellow: a yellow inner robe panel, a yellow sash and narrow yellow borders, the royal yellow is exactly the colour of the flat colour swatch image (image 3, a honey-gold close to hex #F2BC61, 18K gold tone, not pale cream, not beige, not mustard); image 3 is only a colour reference, never copy anything but its colour; her own colour stays clearly the main robe colour, much less yellow than an imperial noble consort's robe; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly deep cherry red silk (her signature colour family deep cherry red and black-gold), with large areas of plain deep cherry red silk visible; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green"
}
# t1-t3 TEMPLATE (owner 18/11 ~19:12Z): same sentence structure as the spec5 LAD t4 text, stepped DOWN in richness per rank. {pal}/{main} = colour words, MOTIF = embroidery motif, FLOWER = hair flower.
MOTIF_LOW={"c06":("butterflies","an orchid"),"c25":("bamboo leaves","a pink peony")}
MOTIF_LOW.update({
"c01":["peonies", "a pink peony"],
"c02":["plum blossoms", "a white jasmine sprig"],
"c03":["lotus flowers", "a red camellia"],
"c04":["orchids", "a lotus"],
"c05":["chrysanthemums", "a plum blossom"],
"c07":["cranes", "a pale magnolia"],
"c08":["auspicious clouds", "a begonia"],
"c09":["bamboo leaves", "a pink peony"],
"c10":["magnolias", "a white jasmine sprig"],
"c11":["begonias", "a red camellia"],
"c12":["pomegranates", "a lotus"],
"c13":["camellias", "a plum blossom"],
"c14":["wisteria", "an orchid"],
"c15":["swallows", "a pale magnolia"],
"c16":["osmanthus", "a begonia"],
"c17":["peonies", "a pink peony"],
"c18":["plum blossoms", "a white jasmine sprig"],
"c19":["lotus flowers", "a red camellia"],
"c20":["orchids", "a lotus"],
"c21":["chrysanthemums", "a plum blossom"],
"c22":["butterflies", "an orchid"],
"c23":["cranes", "a pale magnolia"],
"c24":["auspicious clouds", "a begonia"],
"c26":["magnolias", "a white jasmine sprig"],
"c27":["begonias", "a red camellia"],
"c28":["pomegranates", "a lotus"],
"c29":["camellias", "a plum blossom"],
"c30":["wisteria", "an orchid"],
"c31":["swallows", "a pale magnolia"],
"c32":["osmanthus", "a begonia"],
})
# t4-t6 'Outfit for all four' segment of dev/figwork/jobs.json N-cNN-t4..t6, copied unchanged except 'for all four' dropped (c06/c25 are in OUTFIT_LOW above, t6 with the yellow sentence)
OUTFIT_JOBS={
"c01-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of peonies at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family rose red and gold stays the MAIN robe colour (rose red, NOT green); the robe itself is clearly rose red silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c01-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family rose red and gold stays the MAIN robe colour (rose red, NOT green); the robe itself is clearly rose red silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c01-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED rose red silk, embroidered with phoenixes and peonies in rose red and gold thread along the borders, an embroidered rose red pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly rose red silk (her signature colour family rose red and gold), with large areas of plain rose red silk visible; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green",
"c02-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of plum blossoms at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family sapphire blue and silver stays the MAIN robe colour (sapphire blue, NOT green); the robe itself is clearly sapphire blue silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c02-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family sapphire blue and silver stays the MAIN robe colour (sapphire blue, NOT green); the robe itself is clearly sapphire blue silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c02-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED sapphire blue silk, embroidered with phoenixes and plum blossoms in sapphire blue and gold thread along the borders, an embroidered sapphire blue pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly sapphire blue silk (her signature colour family sapphire blue and silver), with large areas of plain sapphire blue silk visible; silver only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green",
"c03-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of lotus flowers at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family emerald green and cream stays the MAIN robe colour (emerald green); the robe itself is clearly emerald green silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c03-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family emerald green and cream stays the MAIN robe colour (emerald green); the robe itself is clearly emerald green silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c03-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED emerald green silk, embroidered with phoenixes and lotus flowers in emerald green and gold thread along the borders, an embroidered emerald green pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly emerald green silk (her signature colour family emerald green and cream), with large areas of plain emerald green silk visible; cream only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe",
"c04-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of orchids at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family royal purple and lavender stays the MAIN robe colour (royal purple, NOT green); the robe itself is clearly royal purple silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c04-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family royal purple and lavender stays the MAIN robe colour (royal purple, NOT green); the robe itself is clearly royal purple silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c04-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED royal purple silk, embroidered with phoenixes and orchids in royal purple and gold thread along the borders, an embroidered royal purple pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly royal purple silk (her signature colour family royal purple and lavender), with large areas of plain royal purple silk visible; lavender only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green",
"c05-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of chrysanthemums at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family peacock teal and gold stays the MAIN robe colour (peacock teal); the robe itself is clearly peacock teal silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c05-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family peacock teal and gold stays the MAIN robe colour (peacock teal); the robe itself is clearly peacock teal silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c05-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED peacock teal silk, embroidered with phoenixes and chrysanthemums in peacock teal and gold thread along the borders, an embroidered peacock teal pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly peacock teal silk (her signature colour family peacock teal and gold), with large areas of plain peacock teal silk visible; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe",
"c07-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of cranes at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family lavender and pale pink stays the MAIN robe colour (lavender, NOT green); the robe itself is clearly lavender silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c07-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family lavender and pale pink stays the MAIN robe colour (lavender, NOT green); the robe itself is clearly lavender silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c07-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED lavender silk, embroidered with phoenixes and cranes in lavender and gold thread along the borders, an embroidered lavender pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly lavender silk (her signature colour family lavender and pale pink), with large areas of plain lavender silk visible; pale pink only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green",
"c08-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of auspicious clouds at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family cherry-blossom pink and pale green: cherry-blossom pink is the MAIN robe colour (the robe is clearly cherry-blossom pink, NOT a green robe; pale green only as a small accent), gold only as embroidery accents, NOT a cream or all-gold robe",
"c08-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family cherry-blossom pink and pale green: cherry-blossom pink is the MAIN robe colour (the robe is clearly cherry-blossom pink, NOT a green robe; pale green only as a small accent), gold only as embroidery accents, NOT a cream or all-gold robe",
"c08-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED cherry-blossom pink silk, embroidered with phoenixes and auspicious clouds in cherry-blossom pink and gold thread along the borders, an embroidered cherry-blossom pink pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly cherry-blossom pink silk (her signature colour family cherry-blossom pink and pale green), with large areas of plain cherry-blossom pink silk visible; pale green only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT a green robe",
"c09-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of bamboo leaves at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family powder blue and white stays the MAIN robe colour (powder blue, NOT green); the robe itself is clearly powder blue silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c09-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family powder blue and white stays the MAIN robe colour (powder blue, NOT green); the robe itself is clearly powder blue silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c09-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED powder blue silk, embroidered with phoenixes and bamboo leaves in powder blue and gold thread along the borders, an embroidered powder blue pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly powder blue silk (her signature colour family powder blue and white), with large areas of plain powder blue silk visible; white only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green",
"c10-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of magnolias at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family peach and cream stays the MAIN robe colour (peach, NOT green); the robe itself is clearly peach silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c10-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family peach and cream stays the MAIN robe colour (peach, NOT green); the robe itself is clearly peach silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c10-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED peach silk, embroidered with phoenixes and magnolias in peach and gold thread along the borders, an embroidered peach pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly peach silk (her signature colour family peach and cream), with large areas of plain peach silk visible; cream only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green",
"c11-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of begonias at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family lilac and silver stays the MAIN robe colour (lilac, NOT green); the robe itself is clearly lilac silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c11-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family lilac and silver stays the MAIN robe colour (lilac, NOT green); the robe itself is clearly lilac silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c11-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED lilac silk, embroidered with phoenixes and begonias in lilac and gold thread along the borders, an embroidered lilac pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly lilac silk (her signature colour family lilac and silver), with large areas of plain lilac silk visible; silver only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green",
"c12-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of pomegranates at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family mint green and white stays the MAIN robe colour (mint green); the robe itself is clearly mint green silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c12-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family mint green and white stays the MAIN robe colour (mint green); the robe itself is clearly mint green silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c12-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED mint green silk, embroidered with phoenixes and pomegranates in mint green and gold thread along the borders, an embroidered mint green pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly mint green silk (her signature colour family mint green and white), with large areas of plain mint green silk visible; white only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe",
"c13-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of camellias at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family apricot and cream stays the MAIN robe colour (apricot, NOT green); the robe itself is clearly apricot silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c13-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family apricot and cream stays the MAIN robe colour (apricot, NOT green); the robe itself is clearly apricot silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c13-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED apricot silk, embroidered with phoenixes and camellias in apricot and gold thread along the borders, an embroidered apricot pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly apricot silk (her signature colour family apricot and cream), with large areas of plain apricot silk visible; cream only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green",
"c14-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of wisteria at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family soft butter yellow and white stays the MAIN robe colour (soft butter yellow, NOT green); the robe itself is clearly soft butter yellow silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c14-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family soft butter yellow and white stays the MAIN robe colour (soft butter yellow, NOT green); the robe itself is clearly soft butter yellow silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c14-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED soft butter yellow silk, embroidered with phoenixes and wisteria in soft butter yellow and gold thread along the borders, an embroidered soft butter yellow pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly soft butter yellow silk (her signature colour family soft butter yellow and white), with large areas of plain soft butter yellow silk visible; white only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green",
"c15-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of swallows at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family coral pink and ivory stays the MAIN robe colour (coral pink, NOT green); the robe itself is clearly coral pink silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c15-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family coral pink and ivory stays the MAIN robe colour (coral pink, NOT green); the robe itself is clearly coral pink silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c15-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED coral pink silk, embroidered with phoenixes and swallows in coral pink and gold thread along the borders, an embroidered coral pink pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly coral pink silk (her signature colour family coral pink and ivory), with large areas of plain coral pink silk visible; ivory only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green",
"c16-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of osmanthus at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family sage green and cream stays the MAIN robe colour (sage green); the robe itself is clearly sage green silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c16-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family sage green and cream stays the MAIN robe colour (sage green); the robe itself is clearly sage green silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c16-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED sage green silk, embroidered with phoenixes and osmanthus in sage green and gold thread along the borders, an embroidered sage green pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly sage green silk (her signature colour family sage green and cream), with large areas of plain sage green silk visible; cream only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe",
"c17-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of peonies at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family blush pink and pale gold stays the MAIN robe colour (blush pink, NOT green); the robe itself is clearly blush pink silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c17-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family blush pink and pale gold stays the MAIN robe colour (blush pink, NOT green); the robe itself is clearly blush pink silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c17-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED blush pink silk, embroidered with phoenixes and peonies in blush pink and gold thread along the borders, an embroidered blush pink pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly blush pink silk (her signature colour family blush pink and pale gold), with large areas of plain blush pink silk visible; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green",
"c18-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of plum blossoms at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family magenta rose and lilac stays the MAIN robe colour (magenta rose, NOT green); the robe itself is clearly magenta rose silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c18-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family magenta rose and lilac stays the MAIN robe colour (magenta rose, NOT green); the robe itself is clearly magenta rose silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c18-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED magenta rose silk, embroidered with phoenixes and plum blossoms in magenta rose and gold thread along the borders, an embroidered magenta rose pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly magenta rose silk (her signature colour family magenta rose and lilac), with large areas of plain magenta rose silk visible; lilac only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green",
"c19-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of lotus flowers at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family plum and pink stays the MAIN robe colour (plum, NOT green); the robe itself is clearly plum silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c19-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family plum and pink stays the MAIN robe colour (plum, NOT green); the robe itself is clearly plum silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c19-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED plum silk, embroidered with phoenixes and lotus flowers in plum and gold thread along the borders, an embroidered plum pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly plum silk (her signature colour family plum and pink), with large areas of plain plum silk visible; pink only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green",
"c20-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of orchids at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family lotus pink and celadon: lotus pink is the MAIN robe colour (the robe is clearly lotus pink, NOT a green robe; celadon only as a small accent), gold only as embroidery accents, NOT a cream or all-gold robe",
"c20-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family lotus pink and celadon: lotus pink is the MAIN robe colour (the robe is clearly lotus pink, NOT a green robe; celadon only as a small accent), gold only as embroidery accents, NOT a cream or all-gold robe",
"c20-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED lotus pink silk, embroidered with phoenixes and orchids in lotus pink and gold thread along the borders, an embroidered lotus pink pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly lotus pink silk (her signature colour family lotus pink and celadon), with large areas of plain lotus pink silk visible; celadon only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT a green robe",
"c21-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of chrysanthemums at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family ruby and blush pink stays the MAIN robe colour (ruby, NOT green); the robe itself is clearly ruby silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c21-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family ruby and blush pink stays the MAIN robe colour (ruby, NOT green); the robe itself is clearly ruby silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c21-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED ruby silk, embroidered with phoenixes and chrysanthemums in ruby and gold thread along the borders, an embroidered ruby pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly ruby silk (her signature colour family ruby and blush pink), with large areas of plain ruby silk visible; blush pink only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green",
"c22-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of butterflies at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family orchid purple and pink stays the MAIN robe colour (orchid purple, NOT green); the robe itself is clearly orchid purple silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c22-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family orchid purple and pink stays the MAIN robe colour (orchid purple, NOT green); the robe itself is clearly orchid purple silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c22-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED orchid purple silk, embroidered with phoenixes and butterflies in orchid purple and gold thread along the borders, an embroidered orchid purple pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly orchid purple silk (her signature colour family orchid purple and pink), with large areas of plain orchid purple silk visible; pink only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green",
"c23-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of cranes at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family crimson and gold stays the MAIN robe colour (crimson, NOT green); the robe itself is clearly crimson silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c23-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family crimson and gold stays the MAIN robe colour (crimson, NOT green); the robe itself is clearly crimson silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c23-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED crimson silk, embroidered with phoenixes and cranes in crimson and gold thread along the borders, an embroidered crimson pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly crimson silk (her signature colour family crimson and gold), with large areas of plain crimson silk visible; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green",
"c24-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of auspicious clouds at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family scarlet and ivory stays the MAIN robe colour (scarlet, NOT green); the robe itself is clearly scarlet silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c24-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family scarlet and ivory stays the MAIN robe colour (scarlet, NOT green); the robe itself is clearly scarlet silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c24-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED scarlet silk, embroidered with phoenixes and auspicious clouds in scarlet and gold thread along the borders, an embroidered scarlet pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly scarlet silk (her signature colour family scarlet and ivory), with large areas of plain scarlet silk visible; ivory only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green",
"c26-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of magnolias at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family burgundy and gold stays the MAIN robe colour (burgundy, NOT green); the robe itself is clearly burgundy silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c26-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family burgundy and gold stays the MAIN robe colour (burgundy, NOT green); the robe itself is clearly burgundy silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c26-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED burgundy silk, embroidered with phoenixes and magnolias in burgundy and gold thread along the borders, an embroidered burgundy pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly burgundy silk (her signature colour family burgundy and gold), with large areas of plain burgundy silk visible; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green",
"c27-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of begonias at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family cinnabar and cream stays the MAIN robe colour (cinnabar, NOT green); the robe itself is clearly cinnabar silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c27-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family cinnabar and cream stays the MAIN robe colour (cinnabar, NOT green); the robe itself is clearly cinnabar silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c27-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED cinnabar silk, embroidered with phoenixes and begonias in cinnabar and gold thread along the borders, an embroidered cinnabar pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly cinnabar silk (her signature colour family cinnabar and cream), with large areas of plain cinnabar silk visible; cream only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green",
"c28-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of pomegranates at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family celadon and white stays the MAIN robe colour (celadon); the robe itself is clearly celadon silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c28-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family celadon and white stays the MAIN robe colour (celadon); the robe itself is clearly celadon silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c28-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED celadon silk, embroidered with phoenixes and pomegranates in celadon and gold thread along the borders, an embroidered celadon pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly celadon silk (her signature colour family celadon and white), with large areas of plain celadon silk visible; white only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe",
"c29-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of camellias at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family ink blue and pale grey stays the MAIN robe colour (ink blue, NOT green); the robe itself is clearly ink blue silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c29-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family ink blue and pale grey stays the MAIN robe colour (ink blue, NOT green); the robe itself is clearly ink blue silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c29-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED ink blue silk, embroidered with phoenixes and camellias in ink blue and gold thread along the borders, an embroidered ink blue pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly ink blue silk (her signature colour family ink blue and pale grey), with large areas of plain ink blue silk visible; pale grey only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green",
"c30-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of wisteria at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family moonlight blue and white stays the MAIN robe colour (moonlight blue, NOT green); the robe itself is clearly moonlight blue silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c30-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family moonlight blue and white stays the MAIN robe colour (moonlight blue, NOT green); the robe itself is clearly moonlight blue silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c30-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED moonlight blue silk, embroidered with phoenixes and wisteria in moonlight blue and gold thread along the borders, an embroidered moonlight blue pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly moonlight blue silk (her signature colour family moonlight blue and white), with large areas of plain moonlight blue silk visible; white only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe, NOT green",
"c31-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of swallows at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family pale jade and silver stays the MAIN robe colour (pale jade); the robe itself is clearly pale jade silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c31-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family pale jade and silver stays the MAIN robe colour (pale jade); the robe itself is clearly pale jade silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c31-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in SATURATED pale jade silk, embroidered with phoenixes and swallows in pale jade and gold thread along the borders, an embroidered pale jade pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly pale jade silk (her signature colour family pale jade and silver), with large areas of plain pale jade silk visible; silver only as a small accent; gold only as thin accents on the borders; NOT cream, NOT beige, NOT ivory, NOT an all-gold robe",
"c32-t4": "Outfit (rank-4 consort (Tần), clearly much richer and more splendid than the lower ranks): a NEW outfit, a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of osmanthus at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins; her signature colour family ivory and soft grey-blue stays the MAIN robe colour (ivory, NOT green); the robe itself is clearly ivory silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c32-t5": "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins; her signature colour family ivory and soft grey-blue stays the MAIN robe colour (ivory, NOT green); the robe itself is clearly ivory silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe",
"c32-t6": "Outfit (rank-6 noble consort (Quý phi), clearly much richer and more splendid than the lower ranks): a NEW outfit, a HEAVY silk brocade robe in luminous cool ivory silk, embroidered with phoenixes and osmanthus in luminous cool ivory and gold thread along the borders, an embroidered luminous cool ivory pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels; COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly luminous cool ivory-white silk (her signature colour family ivory and soft grey-blue), with large areas of plain ivory silk visible; soft grey-blue only as a small accent; gold only as thin accents on the borders; NOT yellow, NOT beige, NOT an all-gold robe, NOT green",
}
TIER_LOW={   # G17 (owner 20/11, RANK8-A test s62 xSBeugTjfW 'kiểu một ok'): t1 Đáp ứng AND t2 Thường tại = OPEN SQUARE NECKLINE style 1 (same words); t2 = same cut, 2-layer embroidered edge (owner clarification 'thêm một bậc'); t2 keeps its own robe below the neckline; t3 unchanged

1:("rank-1 consort (Đáp ứng), the lowest consort rank, elegant, never poor","a Tang-style TWO-PIECE ruqun: a snug upper garment with an OPEN SQUARE NECKLINE (style 1, simple): a low, simple straight-edged square opening that shows her neck and collarbones, edged only by a narrow plain {sec} silk band with no embroidery on it; never a round collar, never a V, NO crossed wrap collar; with long wide flowing sleeves and wide embroidered cuffs showing a sheer thin undersleeve, over a long softly pleated skirt tied high above the waist at the chest with a broad ribbon band whose two long ribbons fall down the front, the skirt in a lighter tone of the same colour with a wide embroidered {motif} hem band, small sprays of embroidered {motif} on the upper garment and a sparse small cluster of embroidered {motif} at the CENTRE of the chest (fewer than at Thường tại and Quý nhân, small motifs only)","pretty silver hairpins and a fresh flower ({flower})","little gold"),
2:("rank-2 consort (Thường tại), a little more ornate than the lowest rank","a fine silk robe with an OPEN SQUARE NECKLINE (style 1 cut, Thường tại edge): the SAME low, simple, narrow straight-edged square opening as the lowest rank (NOT wide, NOT stretched toward the shoulders), showing her neck and collarbones, framed by a LAYERED border of two stacked narrow bands, a thin {sec} piping inside and a narrow band of small embroidered {motif} outside; never a round collar, never a V, NO crossed wrap collar; delicate embroidered {motif} at the sleeves and hem and a soft silk sash","silver and pearl hairpins and a fresh flower ({flower})","little gold"),
3:("rank-3 consort (Quý nhân), richer than the ranks below","a fine silk robe with wide embroidered {motif} bands at the collar, sleeves and hem, long trailing wide sleeves, a silk waistband with hanging jade belt pendants and tassels, a sheer silk shawl","two or three slim pearl hairpins set INTO her gathered hair at natural angles, mostly hidden in the hair, each with a small dangling pearl ornament, never a radiating crown of straight pins or spikes, small silk flowers and a fresh flower ({flower})","a little gold thread only at the borders")}
FAB_LOW="Light, soft, thin flowing silk: the long sleeves, skirt and sash are supple and airy, drifting softly as in a gentle breeze, with soft natural folds, never stiff, flat or board-like."
# G21 (owner 20/11, ROOT-67 chat Lượt 1128, verbatim: 'Nếu như vậy á, thì là cái bậc thường tại đáp ứng và cả quý nhân luôn. Cái cổ áo từ 36, 51 và 65 tuổi á, là phải là cái cổ xéo kín đáo. ...'):
# at a36/a51/a65 t1 Đáp ứng + t2 Thường tại = the OLD robe words from before G17 (git show aef86d9^:dev/art/t8-prompt-B/build.py, copied exactly) = modest crossed collar;
# t3 Quý nhân at those ages = G15 option B with the same crossed collar (check_store.py G21_T3_COLLAR). a18/a26 unchanged (G17 square neckline).
CROSSED_AGES=("a36","a51","a65")
TIER_LOW_CROSSED={
1:"a Tang-style TWO-PIECE ruqun: a snug crossed-collar upper garment with long wide flowing sleeves and wide embroidered cuffs showing a sheer thin undersleeve, over a long softly pleated skirt tied high above the waist at the chest with a broad ribbon band whose two long ribbons fall down the front, the skirt in a lighter tone of the same colour with a wide embroidered {motif} hem band, small sprays of embroidered {motif} on the upper garment",
2:"a fine silk robe with delicate embroidered {motif} at the collar, sleeves and hem and a soft silk sash"}
def outfit_low123(c,t,pal,main):
    rk,robe,hair,gold=TIER_LOW[t]; mo,fl=MOTIF_LOW[c]
    _sp=hairflower_species(c,t); fl=_art(_sp[0]) if _sp else fl   # F2 (owner Lượt 1352): hair flower t1–t3 = the F2 species of this rank
    if AGE in CROSSED_AGES and t in TIER_LOW_CROSSED: robe=TIER_LOW_CROSSED[t]   # G21: crossed collar at a36/a51/a65
    return f"Outfit ({rk}): a NEW outfit, {robe.format(motif=mo,sec=pal.split(" and ")[-1])}; {hair.format(flower=fl)}; her signature colour family {pal} stays the MAIN robe colour ({main}, NOT green); the robe itself is clearly {main} silk, {gold}, NOT a cream, beige or all-gold robe"
ITEMS_LOW={"c06":{1:("a plain silk round fan with a bamboo handle","two"),2:("a small round embroidered silk fan with a silk tassel","one"),3:("an embroidered silk round fan with a silk tassel","two"),
 4:("a round fan with a carved jade handle and jade tassel","two"),5:("a round fan with a gold-inlaid handle and gem tassel","two"),6:("a white-jade ruyi","one")},
 "c25":{1:("a sprig of fresh plum blossoms","one"),2:("a painted paper folding fan","one"),3:("a painted scroll with wooden rollers","scroll"),
 4:("a lacquered jewel box","box"),5:("a painted scroll with gold fittings","scroll"),6:("a jewelled box","box")}}
# per-person item ladder (t1..t6) for everyone else: signature object of her jobs.json poses (phoenix-free), stepped up in richness per rank
# (B, hand key, style); styles: trim (default) | jade | pearls | flower
LOW_SIG={"c01":("round silk fan painted with peonies","two","trim"),"c02":("round silk fan","two","trim"),"c03":("white feather fan","two","trim"),
"c04":("round gauze fan with a red tassel","two","trim"),"c05":("round fan painted with peonies","two","trim"),"c07":("silk handkerchief","one","trim"),
"c08":("small embroidered silk fan","one","trim"),"c09":("small white flower","one","flower"),"c10":("sprig of white jasmine","one","flower"),
"c11":("folded letter","one","trim"),"c12":("string of pearls","one","pearls"),"c13":("embroidery hoop","two","trim"),"c14":("basket of flowers","two","trim"),
"c15":("sprig of plum blossom","one","flower"),"c16":("pink lotus flower","one","flower"),"c17":("spool of silk thread and a needle case","one","trim"),
"c18":("sandalwood folding fan","two","trim"),"c19":("painted silk folding fan","two","trim"),"c20":("embroidered silk folding fan","two","trim"),
"c21":("ivory folding fan","two","trim"),"c22":("folding fan painted with butterflies","two","trim"),"c23":("carved jade token","one","jade"),
"c24":("jade ruyi sceptre","one","jade"),"c26":("jade pendant on a red cord","one","jade"),"c27":("hairpin box","box","trim"),"c28":("thread-bound book","two","trim"),
"c29":("small guqin","two","trim"),"c30":("rolled scroll","scroll","trim"),"c31":("jade flute","two","jade"),"c32":("brush and a sheet of paper","two","trim")}
def _art(s): return ("an " if s[0] in "aeiou" else "a ")+s
def low_items(c):
    B,hk,st=LOW_SIG[c]
    if st=="flower": r=[_art(f"fresh {B}"),_art(f"fresh {B}"),f"{_art('fresh '+B)} tied with a silk ribbon",f"{_art('fresh '+B)} tied with a silk ribbon and a jade bead",
        f"{_art('fresh '+B)} tied with a gold ribbon and a jade bead",f"{_art('fresh '+B)} set in a small gold-and-jade holder"]
    else:
        tr={"trim":("jade","gold","gold and gems"),"jade":("silver","gold","gold and gems"),"pearls":("a jade clasp","a gold clasp","a gold-and-gem clasp")}[st]
        w=(lambda x:f"with {x}") if st=="pearls" else (lambda x:f"trimmed with {x}")
        r=[_art(f"simple {B}"),_art(f"neat {B}"),_art(f"finely made {B}"),f"{_art('fine '+B)} {w(tr[0])}",f"{_art('fine '+B)} {w(tr[1])}",f"{_art(B)} {w(tr[2])}"]
    return {t+1:(r[t],hk) for t in range(6)}
for _c in LOW_SIG: ITEMS_LOW[_c]=low_items(_c)

# ITEMS t1-t6 = FIGURE_GATE 3f FIXED LISTS (Foreman C ROOT-30, 18/11 ~21:22Z real). OWNER (verbatim): "Ủa sao mày vẽ? Tao đang coi C05 nè, mày vẽ ai cũng cầm quạt vậy? Bậc nào cũng cầm quạt vậy, đâu phải. Ủa? Cái luật cầm đồ của tao đâu? Mày bỏ sót cái luật món cầm trên tay rồi. Và thêm một cái nữa là ai cũng có một Bậc nào cũng sẽ có một cái món đồ riêng cầm trên tay. Đã có một người làm cái danh sách đó rồi mà tại sao mày không làm theo? Rồi họ còn phải tương tác với cái món đồ đó nữa. ..."
# The old LOW_SIG ladder (her signature item stepped up) is REPLACED: every rank takes ONE item from ITS OWN 3f list, spread so neighbouring people differ and one person never holds the same KIND of item at two ranks; each item kind has its own hand interaction (HAND_LOW).
L3F={1:[("a plain silk round fan with a bamboo handle","rfan"),("an embroidered silk handkerchief","kerchief"),("a small woven bamboo flower basket","basket"),("a sprig of fresh plum blossoms","sprig"),("a plain paper folding fan","ffan"),("a thread-bound book","book"),("a small embroidery hoop with silk","hoop"),("a small bamboo flute","flute"),("a small silk lantern on a short bamboo stick","lantern"),("a small round embroidered silk fan","dangle"),
("a small paper kite painted like a swallow, its string on a bamboo reel","two"),
("an embroidered silk ball (tú cầu) with a small tassel, a round stuffed ball, no handle, no stick","dangle"),
("a folded letter on flower-patterned paper tied with a silk cord","two"),
("a small painted wooden comb box","box"),
("a small glazed clay pot with an orchid","two"),
("a plain wooden hand mirror","mirror"),
("a closed plain silk parasol with a bamboo handle","one"),
("a sutra book bound in plain blue cloth","book"),
("a string of plain wooden prayer beads","dangle"),
("a small hand warmer in a plain silk cover","two"),
("a calligraphy brush with a bamboo shaft","one"),
("a bamboo walking staff with a silk cord","one"),
("a bundle of white lilies tied with a silk ribbon","sprig"),
("a small wooden fish (mõ) with its striker","one"),
("a pair of walnut health balls","two"),
("a small woven-grass cricket cage with a cotton tassel","dangle"),
("a plain wooden hair comb, held in the hand","one"),
("a small painted clay whistle shaped like a bird","one"),
("a plain wooden hairpin carved with a flower, held in the hand","dangle"),
("a small painted scroll on plain paper with wooden rollers","scroll"),
("a small cloth pouch embroidered with a single flower","dangle"),
("a small plain clay lotus lamp","lamp"),
("a plain wooden name seal with a cotton tassel","one"),
("a carved bamboo needle case with a cotton tassel","dangle"),
("a small plain bronze hand bell with a cotton tassel","dangle"),
("a small plain bamboo box with a woven lid","box"),
("a small bronze hand censer with a plain wooden handle","one"),
("a fly-whisk of horsehair with a plain bamboo handle","one"),
("a small plain bamboo birdcage with its cloth cover drawn back","lantern"),
("a thread-bound almanac in a plain cloth cover","book")],
2:[("a silk round fan with a lacquered handle and a small tassel","rfan"),("a small round embroidered silk fan with a silk tassel","dangle"),("a painted paper folding fan","ffan"),("a poetry book with a silk cover","book"),("a small porcelain lotus lamp","lamp"),("an embroidery hoop with a fine silk scene","hoop"),("a jade-bead tassel ornament","dangle"),("a silk-covered lantern with a tassel","lantern"),("a small lacquered comb box","box"),("a bamboo flute with a silk tassel","flute"),
("a small pellet drum (trống lắc) with a lacquered handle, a deep drum with two pellets, not flat","one"),
("a small cricket cage of lacquered bamboo with a silk tassel","dangle"),
("a lacquered butterfly hairpin, held in the hand","dangle"),
("a small pipa lute with a lacquered body","two"),
("a closed embroidered silk parasol with a lacquered handle","one"),
("a small lacquered hand mirror","mirror"),
("a painted scroll on lacquered rollers","scroll"),
("a lace-edged embroidered silk handkerchief","kerchief"),
("a small potted orchid in a glazed porcelain pot","two"),
("a small lacquered hand warmer in an embroidered silk cover","two"),
("a sutra book bound in embroidered silk","book"),
("a thread-bound almanac in an embroidered silk cover","book"),
("a round carved wooden longevity plaque carved with a round shou symbol","two"),
("a string of agate prayer beads","dangle"),
("a fly-whisk of white horsehair with a lacquered handle","one"),
("a small paper kite painted like a butterfly, its string on a lacquered reel","two"),
("a sprig of red plum blossoms tied with a silk ribbon","sprig"),
("a folded letter on painted red-and-gold paper tied with a silk cord","two"),
("a red-lacquered hair comb, held in the hand","one"),
("a lacquered name seal with a silk tassel","one"),
("a small painted lacquer flower basket","basket"),
("an embroidered silk ball (tú cầu) with a long silk tassel, a round stuffed ball, no handle, no stick","dangle"),
("a small painted porcelain perfume flask with a silk tassel","one"),
("a calligraphy brush with a painted porcelain shaft","one"),
("a small lacquered hand bell with a silk tassel","dangle"),
("a pair of painted lacquer health balls","two"),
("a lacquered wooden fish (mõ) with its striker","one"),
("a lacquered walking staff with a silk cord","one"),
("a small potted pine in a painted porcelain pot","two"),
("an agate pendant on a silk cord","dangle")],
3:[("an embroidered silk round fan with a silk tassel","rfan"),("a small red-lacquered box","box"),("a painted scroll with wooden rollers","scroll"),("a painted silk folding fan with bone ribs","ffan"),("a small celadon lotus lamp","lamp"),("a silver hand mirror","mirror"),("an embroidered silk palace lantern","lantern"),("a silver-mounted thread-bound book","book"),("a carved peach-wood comb in a silk case","box"),("a small silver-wire flower basket","basket"),
("an embroidered silk ball (tú cầu) with small silver bells, a round stuffed ball, no handle, no stick","dangle"),
("a silver butterfly hairpin, held in the hand","dangle"),
("a small round embroidered silk fan with a silver bead","dangle"),
("a bamboo flute with silver bands","flute"),
("a small pipa lute inlaid with silver","two"),
("a folded letter on silver-flecked flower paper","two"),
("an embroidered silk handkerchief with silver thread","kerchief"),
("a personal name seal of agate with a silk tassel","one"),
("a silver hand warmer in an embroidered silk cover","two"),
("a sutra book bound in finely embroidered silk","book"),
("a calligraphy brush with a red-lacquer shaft and a silver cap","one"),
("a small potted orchid in a celadon pot","two"),
("a red-lacquer walking staff with a silver head","one"),
("a pair of agate health balls","two"),
("a small silver hand bell with a silk tassel","dangle"),
("a small paper kite painted like a crane, its string on a silver-trimmed reel","two"),
("a small pellet drum (trống lắc) with a silver-banded handle, a deep drum with two pellets, not flat","one"),
("a sprig of fresh pear blossoms","sprig"),
("a small silver cricket cage with a silk tassel","dangle"),
("a silver needle case with a silk tassel","dangle"),
("a closed silver-trimmed silk parasol with a red-lacquer handle","one"),
("a silver perfume flask with a silk tassel","one"),
("an embroidery hoop in a silver-banded frame with a silk scene, cloth stretched flat in two thin rings, a needle in it, never on a handle","hoop"),
("a silver-mounted red-agate pendant on a silk cord","dangle"),
("a red-lacquer box with silver corners","box"),
("a small silver hand censer with a silk tassel","one"),
("a fly-whisk of white horsehair with a silver handle","one"),
("a string of red-agate prayer beads with a silver tassel","dangle"),
("a round red-agate longevity plaque carved with a round shou symbol","two"),
("a thread-bound almanac in a silver-thread cover","book")],
4:[("a round fan with a carved jade handle and jade tassel","rfan"),("a sandalwood folding fan with carved ribs","ffan"),("a lacquered jewel box","box"),("a scroll with jade rollers","scroll"),("a jade disc pendant on a silk cord","dangle"),("a silver-and-enamel hand mirror","mirror"),("a small cloisonné lotus lamp","lamp"),("a silk palace lantern with a jade tassel","lantern"),("a silver-mounted book box","box"),("a small white-jade lotus lamp","lamp"),
("a jade butterfly hairpin, held in the hand","dangle"),
("a small cricket cage of jade-trimmed bamboo","dangle"),
("a jade flute with a jade tassel","flute"),
("a small pellet drum (trống lắc) with a carved jade handle, a deep drum with two pellets, not flat","one"),
("a small pipa lute inlaid with jade","two"),
("a closed silk-brocade parasol with a carved jade handle","one"),
("a poetry book bound in silk brocade with jade clasps","book"),
("a small birdcage with a jade hook and its brocade cover drawn back","lantern"),
("a carved jade hair comb, held in the hand","one"),
("a jade name seal with a silk tassel","one"),
("a small carved-jade hand warmer in a brocade cover","two"),
("a small carved jade mountain on a rosewood stand","stand"),
("a carved jade crane on a rosewood stand","stand"),
("a round jade longevity plaque carved with a round shou symbol","two"),
("a small jade statuette of Guanyin on a stand","stand"),
("an embroidered silk ball (tú cầu) with small jade tassels, a round stuffed ball, no handle, no stick","dangle"),
("a folded letter on jade-green flower paper tied with a silk cord","two"),
("a sprig of white magnolia blossoms tied with a silk cord","sprig"),
("an embroidered silk handkerchief with small jade corner weights","kerchief"),
("a jade-handled small round embroidered silk fan with a silk tassel","dangle"),
("an embroidery hoop in a jade-banded frame with a silk scene, cloth stretched flat in two thin rings, a needle in it, never on a handle","hoop"),
("a jade-handled flower basket of woven bamboo","basket"),
("a calligraphy brush with a carved jade shaft","one"),
("a small jade hand bell with a silk tassel","dangle"),
("a jade-handled fly-whisk of white horsehair","one"),
("a small jade hand censer with a silk tassel","one"),
("a pair of jade health balls","two"),
("a sandalwood walking staff with a jade head","one"),
("a small potted orchid in a jade-green glazed pot","two"),
("a string of jade prayer beads","dangle")],
5:[("a round fan with a gold-inlaid handle and gem tassel","rfan"),("a gilded lacquer box","box"),("a painted scroll with gold fittings","scroll"),("an ivory folding fan with gold leaf","ffan"),("a cloisonné enamel lotus lamp with gilt petals","lamp"),("a gold-and-jade hand mirror","mirror"),("a gilded silver flower basket","basket"),("a silver-gilt palace lantern with pearl tassels","lantern"),("a coral-and-pearl bead tassel ornament","dangle"),("a gold-mounted embroidered silk book","book"),
("a gold butterfly hairpin with gem wings, held in the hand","dangle"),
("a gold-thread embroidered ball (tú cầu) with a gem tassel, a round stuffed ball, no handle, no stick","dangle"),
("a flute with gold bands and a gem tassel","flute"),
("a small pipa lute inlaid with gold and mother-of-pearl","two"),
("a closed gold-thread brocade parasol with a gilded handle","one"),
("a gilded birdcage with its brocade cover drawn back","lantern"),
("a gold-thread brocade handkerchief","kerchief"),
("a gilded hair comb set with gems, held in the hand","one"),
("a small hand-held table screen of gold-thread brocade embroidered with flowers","two"),
("a gilded hand warmer in a brocade cover","two"),
("a fine-jade name seal with a gem tassel","one"),
("a sutra book bound in gold-thread brocade","book"),
("a gilded walking staff with a jade head","one"),
("a pair of fine-jade health balls","two"),
("a carved fine-jade lingzhi fungus on a gilded stand","stand"),
("a folded letter on gold-flecked paper tied with a silk cord","two"),
("a small gilded pellet drum (trống lắc) with gem tassels, a deep drum with two pellets, not flat","one"),
("a silk kite painted like a crane, its string on a gilded reel","two"),
("a gold-thread embroidered small round silk fan with a gem tassel","dangle"),
("a gilded perfume flask set with small gems","one"),
("a small cloisonné hand bell with a gem tassel","dangle"),
("an embroidery hoop in a gold-banded frame with a fine silk scene, cloth stretched flat in two thin rings, a needle in it, never on a handle","hoop"),
("a cloisonné pendant on a gold cord","dangle"),
("a calligraphy brush with a gilded sandalwood shaft","one"),
("a gilded hand censer inlaid with mother-of-pearl","one"),
("a gold-mounted fly-whisk with a fine-jade handle","one"),
("a round fine-jade longevity plaque carved with a round shou symbol, on a gilded stand","two"),
("a small potted orchid in a cloisonné pot","two"),
("a thread-bound almanac with gold clasps","book"),
("a string of gold-and-jade prayer beads","dangle")],
6:[("a white-jade ruyi","ruyi"),("a jewelled box","box"),("a round fan with a carved jade-and-gold handle and pearls","rfan"),("a gold-and-pearl hand mirror","mirror"),("a white-jade lotus lamp with gold mounts","lamp"),("a pearl-embroidered silk folding fan with jade ribs","ffan"),("a carved jade incense box","box"),("a small coral branch on a gold stand","stand"),("a pearl-tasselled silk lantern with a jade top","lantern"),("a gold-mounted jade pendant on a silk cord","dangle"),
("a pearl-and-gold butterfly hairpin, held in the hand","dangle"),
("a small cricket cage of white jade and gold with a pearl tassel","dangle"),
("a white-jade flute with gold bands","flute"),
("a small pipa lute inlaid with mother-of-pearl and white jade","two"),
("a closed pearl-embroidered silk parasol with a white-jade handle","one"),
("a white-jade perfume flask with a gold stopper","one"),
("a poetry book bound in pearl-embroidered silk with gold clasps","book"),
("a pearl-embroidered silk handkerchief","kerchief"),
("a small hand-held table screen of pearl-embroidered silk in a white-jade frame","two"),
("a white-jade hair comb mounted in gold, held in the hand","one"),
("a white-jade hand warmer in a pearl-embroidered cover","two"),
("an openwork gold incense ball with pearl tassels","dangle"),
("a hanging scroll of pine and cranes on pearl-embroidered silk with white-jade rollers","scroll"),
("a round white-jade longevity plaque carved with a round shou symbol, on a gold stand","two"),
("a pair of white-jade health balls","two"),
("a pearl-embroidered silk ball (tú cầu) with jade tassels, a round stuffed ball, no handle, no stick","dangle"),
("a folded letter on gold-flecked paper sealed with white jade","two"),
("a small white-jade pellet drum (trống lắc) with pearl strings, a deep drum with two pellets, not flat","one"),
("an embroidery hoop in a gold-and-pearl frame with a fine silk scene, cloth stretched flat in two thin rings, a needle in it, never on a handle","hoop"),
("a white-jade name seal with a pearl tassel","one"),
("a pearl-embroidered small round silk fan with a jade tassel","dangle"),
("a white-jade flower basket with gold handles","basket"),
("a calligraphy brush with a white-jade shaft and a gold cap","one"),
("a string of pearls and white-jade beads held as a hand ornament","dangle"),
("a sutra book bound in pearl-embroidered silk","book"),
("a white-jade hand bell with a pearl tassel","dangle"),
("a fly-whisk of white horsehair with a white-jade-and-gold handle","one"),
("a white-jade walking staff with a gold head","one"),
("a small potted orchid in a white-jade pot","two"),
("a carved white-jade lingzhi fungus on a gold stand","stand")]}
# E11 (owner Lượt 583/585, IT1): +15 items appended (the first 10 unchanged, same order) -> 25; {age: 5 indices}, 25 different items per rank, adjacent ranks (t1..t8, Nữ đế, Thái hậu) never share an item kind at one age. Pick: LIST[AGE_DICT[age][(n-1)%5]].
L3F_AGE={1:{"a18": [7, 12, 11, 5, 10, 25, 26, 27], "a26": [0, 2, 4, 13, 8, 28, 29, 30], "a36": [6, 16, 9, 1, 3, 31, 32, 33], "a51": [19, 15, 23, 20, 17, 34, 35, 36], "a65": [22, 24, 14, 18, 21, 37, 38, 39]},2:{"a18": [15, 1, 10, 12, 13, 25, 26, 27], "a26": [11, 16, 5, 14, 9, 28, 29, 30], "a36": [0, 18, 2, 3, 19, 31, 32, 33], "a51": [8, 6, 17, 4, 23, 34, 35, 36], "a65": [22, 24, 20, 7, 21, 37, 38, 39]},3:{"a18": [15, 10, 7, 13, 2, 25, 26, 27], "a26": [11, 16, 1, 12, 17, 28, 29, 30], "a36": [14, 4, 9, 5, 6, 31, 32, 33], "a51": [3, 19, 23, 24, 8, 34, 35, 36], "a65": [21, 20, 0, 22, 18, 37, 38, 39]},4:{"a18": [13, 8, 1, 9, 10, 25, 26, 27], "a26": [12, 15, 17, 14, 11, 28, 29, 30], "a36": [3, 16, 20, 18, 0, 31, 32, 33], "a51": [4, 19, 23, 6, 2, 34, 35, 36], "a65": [7, 5, 22, 21, 24, 37, 38, 39]},5:{"a18": [4, 13, 12, 11, 6, 25, 26, 27], "a26": [1, 9, 10, 2, 5, 28, 29, 30], "a36": [20, 15, 7, 14, 18, 31, 32, 33], "a51": [17, 21, 24, 0, 16, 34, 35, 36], "a65": [22, 19, 8, 3, 23, 37, 38, 39]},6:{"a18": [16, 8, 5, 15, 10, 25, 26, 27], "a26": [17, 11, 14, 12, 9, 28, 29, 30], "a36": [1, 4, 19, 13, 20, 31, 32, 33], "a51": [0, 18, 21, 24, 23, 34, 35, 36], "a65": [22, 2, 7, 6, 3, 37, 38, 39]}}
HAND_LOW={"rfan":"the round fan held up in one hand at chest height, gently turned to show its painting, the other hand lightly touching its tassel, body and face frontal, standing squarely facing the viewer, no turn",
"ffan":"the folding fan half-open in one hand at waist height, her fingers spreading its ribs, the other hand resting on her sash, body and face frontal, standing squarely facing the viewer, no turn",
"kerchief":"the handkerchief draped over the fingers of one hand, lifted gently at waist height, the other hand smoothing its edge, body and face frontal, standing squarely facing the viewer, no turn",
"basket":"the basket hanging from the crook of one arm, the other hand arranging a flower in it, body and face frontal, standing squarely facing the viewer, no turn",
"sprig":"the sprig held up in one hand at chest height below the chin, the other hand touching a blossom, body and face frontal, standing squarely facing the viewer, no turn",
"book":"the book open in both hands at waist height as if she was just reading it, head up toward the viewer, body and face frontal, standing squarely facing the viewer, no turn",
"hoop":"the hoop held in one hand at waist height, the other hand drawing a silk thread from it, body and face frontal, standing squarely facing the viewer, no turn",
"flute":"the flute held horizontally in both hands at chest height (not at the lips), fingers resting on its holes, body and face frontal, standing squarely facing the viewer, no turn",
"lantern":"the lantern hanging from its handle in one hand beside her at hip height, the other hand steadying its tassel, body and face frontal, standing squarely facing the viewer, no turn",
"dangle":"the ornament dangling from the fingers of one hand at chest height, the other hand cupped beneath it, body and face frontal, standing squarely facing the viewer, no turn",
"lamp":"the lamp cradled in both hands at waist height, one hand under its base, body and face frontal, standing squarely facing the viewer, no turn, head tilted gently toward the viewer",
"box":"the box in both hands at waist height, one hand lifting its lid slightly, body and face frontal, standing squarely facing the viewer, no turn",
"scroll":"the rolled scroll in one hand lowered at her side, the other hand lifting her sleeve slightly, body and face frontal, standing squarely facing the viewer, no turn",
"mirror":"the hand mirror held in one hand at waist height with its back turned outward, the other hand touching a hairpin, body and face frontal, standing squarely facing the viewer, no turn",
"ruyi":"the ruyi held across both palms at waist height, presenting it, body and face frontal, standing squarely facing the viewer, no turn, head tilted gently toward the viewer",
"stand":"the stand presented in both hands at waist height, body and face frontal, standing squarely facing the viewer, no turn, head tilted gently toward the viewer"}
def low_hand(hk,right):
    if hk.startswith("L:"): hk=hk[2:]
    if hk in HAND_LOW: return HAND_LOW[hk].format(d="right" if right else "left")
    return hand7(hk if hk in ('one','two','box') else 'one',right) if hk!='scroll' else 'the scroll in one hand lowered at her side, the other hand lifting her sleeve slightly, body and face frontal, standing squarely facing the viewer, no turn'
def items3f(c):
    n=int(c[1:]); used=set(); out={}
    for t in range(1,7):
        L=L3F[t]; k=__import__('random').Random(f'item3f-{c}-{t}').randrange(10)
        for j in range(10):
            it,kind=L[(k+j)%10]
            if kind not in used: break
        used.add(kind); out[t]=(it,kind)
    return out
for _c in [f"c{i:02d}" for i in range(1,33)]+[f"m{i:02d}" for i in range(1,53)]: ITEMS_LOW[_c]=items3f(_c)   # N5d item 5: maids too (t1-t6 default pick; age_item overrides)
LOWNAME={"c06":("vermilion","soft vermilion"),   # PALFIX a3: was ("vermilion","coral red"); DATA c06 was "vermilion and ivory"
 "c25":("deep cherry red","brick rust red")}
# ---------- N5d item 5: MAID rows m01–m52 (data only; each maid keeps her own face = image 1, no face words exist for maids) ----------
# PAL = signature palette (main dev/figwork/maidC/mjobs.py PAL, :22 and :31); MOT = motif list (mjobs.py MOT, index (n-1)%13); ORIG1 hex = the two dominant robe tones MEASURED from the live fig-maid-mNN-t1-a18.webp
# (k-means on rows 32-93 percent of the figure, no hue filter: the maids' pale robes sit in the skin/gold hue band); the colour NAMES come from PAL (name()-style naming gave "silver grey" for pale sage). LOWNAME is auto-filled below from DATA+ORIG1.
MAID_ROWS=[["m01", "sage green and cream", "#E8CDB5", "#CAB295"],
  ["m02", "moss green and silver", "#D0C1A1", "#B8AA89"],
  ["m03", "slate blue and silver", "#B7AFAB", "#D7C7BF"],
  ["m04", "warm apricot and gold", "#ECBA9C", "#D39C7B"],
  ["m05", "coral red and gold", "#DF9A84", "#EDC2AA"],
  ["m06", "pale blue-grey and silver", "#DDCFC8", "#BFB3AE"],
  ["m07", "pale jade green and white", "#C7B9A1", "#E8D2BF"],
  ["m08", "peach-salmon and gold", "#E4AC94", "#F6CFBC"],
  ["m09", "rose pink and gold", "#DCA79D", "#E9C7BA"],
  ["m10", "sage green and gold", "#D0C0A4", "#EBD8C4"],
  ["m11", "sky blue and silver", "#B6B6B8", "#DDD1C9"],
  ["m12", "pale golden yellow and ivory", "#EBCDAC", "#D5B48C"],
  ["m13", "lilac and silver", "#CBAAB0", "#E2C3C5"],
  ["m14", "ivory white and celadon", "#B2AA97", "#D8C8B4"],
  ["m15", "blush pink and pearl white", "#DEC3B5", "#C8A89B"],
  ["m16", "lavender purple and gold", "#CDABAF", "#B39197"],
  ["m17", "olive green and gold", "#B19B7A", "#D1B89A"],
  ["m18", "powder blue and pearl white", "#BFB5AE", "#D8CABF"],
  ["m19", "caramel apricot and gold", "#DFBBA1", "#C7A085"],
  ["m20", "slate blue and gold", "#A79E9C", "#7E7877"],
  ["m21", "aqua celadon and silver", "#C4BFB2", "#ACAA9D"],
  ["m22", "dusty rose and taupe", "#C1A294", "#D8BFB1"],
  ["m23", "butter yellow and gold", "#DDC1A0", "#BFA17C"],
  ["m24", "jade green and gold", "#B8AB93", "#D9C5AD"],
  ["m25", "lavender violet and silver", "#B49EAD", "#D2BBC0"],
  ["m26", "blush pink and gold", "#E1BDAE", "#CAA393"],
  ["m27", "soft spring green and gold", "#CAB99A", "#E6CFBA"],
  ["m28", "coral pink and ivory", "#DB947A", "#E9C6B2"],
  ["m29", "pale celadon and silver", "#E9D8C7", "#C7B8A2"],
  ["m30", "soft lilac and silver", "#D1B9BA", "#E6D0CC"],
  ["m31", "pale buttercup yellow and gold", "#DEBF9D", "#EFD3B7"],
  ["m32", "pale mint green and ivory", "#D4C1AE", "#EAD5C6"],
  ["m33", "lavender blue and silver", "#AC9CAE", "#C9B7BD"],
  ["m34", "peach pink and gold", "#DFB49F", "#EFD3BF"],
  ["m35", "pale jade green and pearl white", "#DCCCBA", "#C2B49D"],
  ["m36", "ivory cream and gold", "#ECD5C4", "#D8BAA1"],
  ["m37", "pale aqua and silver", "#C6BBB0", "#E9D5C9"],
  ["m38", "warm apricot and gold", "#E4BF9F", "#EFD6C1"],
  ["m39", "sky blue and silver", "#BDB6BD", "#D7CCCE"],
  ["m40", "dusty rose and gold", "#D2A396", "#B78279"],
  ["m41", "soft willow green and gold", "#C4AE8F", "#DBC3A7"],
  ["m42", "peach coral and gold", "#E3C3AD", "#D0A288"],
  ["m43", "periwinkle and silver", "#ACA0A5", "#C9B9BA"],
  ["m44", "ivory and blush pink", "#E4C3B1", "#CEA492"],
  ["m45", "pale sky blue and pearl white", "#C7C2C1", "#E8DBD5"],
  ["m46", "rust red and gold", "#9F6353", "#BD8874"],
  ["m47", "pale lilac and mint", "#DECCC3", "#C8B3AF"],
  ["m48", "warm beige cream and gold", "#D8B79C", "#EBCEB6"],
  ["m49", "powder blue and silver", "#CBC1C2", "#B3ABAB"],
  ["m50", "soft pink and pearl white", "#D8B4A7", "#BA9386"],
  ["m51", "pale mint and silver", "#C0BDAB", "#D8D0BF"],
  ["m52", "pink lilac and gold", "#CEA6A9", "#B4898E"]]
MAID_MOT=["peonies", "plum blossoms", "lotus flowers", "orchids", "chrysanthemums", "butterflies", "cranes", "auspicious clouds", "magnolias", "begonias", "camellias", "osmanthus", "wisteria"]
MAID_FLOWER=["a pink silk flower","a white jasmine sprig","a plum blossom","an orchid","a peach blossom","a camellia"]   # ROOT-54 (A21, BW6 19/11): size words dropped from the NAME ("small", "little", "tiny") -> only the F13 SZ ladder sets the size   # mjobs.py (maid) FLW
# OWNER Lượt 603 (ROOT-51 -> BW4): m01-m52 colours = dev/art/face-common/m_colours_proposed.json (NF1, FINAL, Lượt 599 revision): main name + main hex
# (col 3) and the outfit SECONDARY name + hex (col 4; palette = "<main> and <secondary>"). M_COLS also feeds store-all/build_all.py secondary() (name like #HEX).
import json as _json
M_COLS={_k:(_v["main"],_v["main_hex"],_v["secondary"],_v["secondary_hex"]) for _k,_v in _json.load(open(_os.path.join(_os.path.dirname(_os.path.abspath(__file__)),"..","face-common","m_colours_proposed.json"),encoding="utf-8"))["rows"].items()}
MAID_ROWS=[[_c,f"{M_COLS[_c][0]} and {M_COLS[_c][2]}",M_COLS[_c][1],M_COLS[_c][3]] if _c in M_COLS else [_c,_p,_a,_b] for _c,_p,_a,_b in MAID_ROWS]
for _c,_pal,_h1,_h2 in MAID_ROWS:
    _n=int(_c[1:]); _main,_sec=_pal.split(" and ")[0],_pal.split(" and ")[-1]
    DATA[_c]=(_pal,"")
    ORIG1[_c]=(f"{_main} silk like {_h1}",f"{_sec} like {_h2}")
    MOTIF_LOW[_c]=(MAID_MOT[(_n-1)%13],MAID_FLOWER[_n%6])
# N5d: maids at consort ranks t4-t6 = the OLD main dev/figwork/maidC/lad3.py ladder (verbatim source below), exactly how the consorts' OUTFIT_JOBS rows were made (verified: equal to c01/c02/c03/c07 rows apart from the diacritics of the rank names).
_LAD3_SRC=r'''import re
GREEN=("green","celadon","jade","teal","mint","sage","aqua")
RANK={4:"rank-4 consort (Tan)",5:"rank-5 consort (Phi)",6:"rank-6 noble consort (Quy phi)",7:"rank-7 imperial noble consort (Hoang quy phi)",8:"the Empress (Hoang hau)"}
ACC={}
LAD={4:"a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of {mot} at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins",
5:"a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins",
6:"a HEAVY silk brocade robe in SATURATED {main} silk, embroidered with phoenixes and {mot} in {main} and gold thread along the borders, an embroidered {main} pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels",
7:"a near-empress ceremonial robe of SATURATED {main} silk, embroidered with phoenixes and auspicious clouds in gold thread on the chest and along the borders, a jewelled cloud-collar cape edged with pearls and gold over the shoulders, pearl strands lying flat on the cloud-collar cape, a jade-and-gold belt with long tassels, a long flowing {main} train behind her; tall grand chignon crowned by a LARGE ornate gold phoenix crown (grander and taller than a noble consort's headdress, only a little smaller than the Empress's) with spreading gold phoenix wings, pearl strands, kingfisher-blue inlay and many dangling gold tassels",
8:"the Empress's imperial phoenix ceremonial robe of SATURATED {main} silk with large phoenixes and clouds embroidered in gold thread, a jewelled layered gold-and-pearl cloud-collar cape over the shoulders, many pearl strands, a jade-and-gold belt with long tassels, a VERY long {main} trailing train; the GRANDEST headdress of all: a FULL tall gold phoenix crown with nine gold phoenixes, pearls, kingfisher-blue inlay, and long pearl strands hanging at the sides; the most splendid outfit of all, clearly grander than every other rank"}
ACC={"cherry-blossom pink and pale green":"pale green","lotus pink and celadon":"celadon"}
WHITE=("ivory","white","moonlight")
def outfit(t,pal,mot):
    main=pal.split(" and ")[0]; acc=pal.split(" and ")[1] if " and " in pal else "gold"
    neg="" if any(g in pal for g in GREEN) else ", NOT green"
    col=f"her signature colour family {pal} stays the MAIN robe colour ({main}{neg}); the robe itself is clearly {main} silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe"
    if pal in ACC: col=f"her signature colour family {pal}: {main} is the MAIN robe colour (the robe is clearly {main}, NOT a green robe; {ACC[pal]} only as a small accent), gold only as embroidery accents, NOT a cream or all-gold robe"
    if t>=6:  # art4: strong colour rule (t6 first tries washed pale palettes into cream/gold; this wording fixed c17 c20 c28 c30 c31 c32)
        m=main if not any(w in main for w in ("ivory","white")) else "luminous cool "+main+"-white"
        notiv="" if any(w in main for w in ("ivory","white")) else ", NOT ivory"
        if pal in ACC: neg=", NOT a green robe"
        col=(f"COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly {m} silk (her signature colour family {pal}), with large areas of plain {main} silk visible; "+
             ("" if "gold" in acc and pal not in ACC else f"{acc if pal not in ACC else ACC[pal]} only as a small accent; ")+f"gold only as thin accents on the borders; NOT cream, NOT beige{notiv}, NOT an all-gold robe{neg}")
        if any(w in main for w in ("ivory","white")): col=col.replace("NOT cream, NOT beige","NOT yellow, NOT beige")
    m2=("luminous cool "+main) if any(w in main for w in ("ivory","white")) else main
    return f"Outfit for all four ({RANK[t]}, clearly much richer and more splendid than the lower ranks): a NEW outfit, {LAD[t].format(mot=mot,main=m2).replace("SATURATED luminous","luminous")}; {col}"
'''
_g3={}; exec(_LAD3_SRC,_g3)
for _c,_pal,_h1,_h2 in MAID_ROWS:
    for _t in (4,5,6):
        OUTFIT_JOBS[f"{_c}-t{_t}"]=_g3["outfit"](_t,_pal,MAID_MOT[(int(_c[1:])-1)%13]).replace("Outfit for all four (","Outfit (",1).replace("(Tan)","(Tần)").replace("(Quy phi)","(Quý phi)")
for _c in DATA:
    if _c not in LOWNAME and _c in ORIG1: LOWNAME[_c]=(DATA[_c][0].split(" and ")[0],ORIG1[_c][0].split(" silk")[0])
# ITEMFIX2 (owner 20/11 GO "Ok làm đi": prompts over 10 000 chars): t6 luxury/yellow words shortened (same items), the in-outfit "image 3 is only a colour reference" dropped (the closing Image 3 sentence says it); t8 Empress outfit: duplicate hem clause + "most splendid outfit of all" line dropped (said elsewhere), filler words cut
# owner L1829 (Foreman C #23 JOB6): luxury words + "collar and cape trim" restored (Quý phi has capes again, swap cancelled L1803)
YEL_T6="; more luxury than the rank below: rich gold-thread embroidery covering much of the robe, a pearl-edged collar and cape trim, a few pearl strands across the chest, a grander gold headdress with more gold ornaments, elegant, NOT a pile of jewels, still clearly less grand than the imperial noble consort; plus clearly visible royal yellow: a yellow inner robe panel, sash and narrow borders, exactly the colour of the flat colour swatch image (image 3, a honey-gold close to hex #F2BC61, 18K gold tone, not pale cream, not beige, not mustard); her own colour stays clearly the main robe colour, much less yellow than an imperial noble consort's robe; COLOUR RULE:"
LUX_T6="; more luxury than the rank below: rich gold-thread embroidery covering much of the robe, a pearl-edged collar and cape trim, a few pearl strands across the chest, a grander gold headdress with more gold ornaments, elegant, NOT a pile of jewels, still clearly less grand than the imperial noble consort; COLOUR RULE:"
# 19/11 N8b (ROOT-46 one-builder job): the 3 foreign princesses p01 Ba Tư / p02 Cao Ly / p03 Phù Tang = DATA ROWS ONLY, added exactly like the maids above (palette, hex, motif, hair flower; no store sentence touched).
# Their face = their reference image (empty face words, like the maids). Lets `build.py p01 v0 --low N|--t7|(t8)` and dev/art/check_store.py run on them.
PRINCESS_ROWS={"p01":("indigo blue","ivory","#5B6CA6","#EFE6D2","arabesques","a red rose"),"p02":("rose","jade","#C9708A","#79A98F","chrysanthemums","a white plum blossom"),"p03":("wisteria","crimson","#9C88BC","#B8556A","wisteria","a purple wisteria sprig")}
for _i,(_c,(_m,_s,_h1,_h2,_mo,_fl)) in enumerate(PRINCESS_ROWS.items()):
    _pal=f"{_m} and {_s}"; DATA[_c]=(_pal,""); ORIG1[_c]=(f"{_m} silk like {_h1}",f"{_s} like {_h2}"); MOTIF_LOW[_c]=(_mo,_fl); LOWNAME[_c]=(_m,_m)
    ITEMS_LOW[_c]=items3f(_c)
    for _t in (4,5,6): OUTFIT_JOBS[f"{_c}-t{_t}"]=_g3["outfit"](_t,_pal,_mo).replace("Outfit for all four (","Outfit (",1).replace("(Tan)","(Tần)").replace("(Quy phi)","(Quý phi)")
# RANK8 (owner ~07:22Z 20/11 + GO via ROOT-68, worker RANK8-C): NEW people s62 s64 s65 (faces owner OK Lượt 1046) = DATA ROWS ONLY, added exactly like the princesses above
# (palette = root pair from face-common/s_root_colours.json, motif = the motif of her approved face outfit, hair flower = the maid index rule MAID_FLOWER[n%6]; no store sentence touched).
S_NEW_ROWS={"s62":("plum blossoms",),"s64":("lilies of the valley",),"s65":("chrysanthemums",)}
# T78-PREP (Foreman C ROOT order 20/11, owner standing order T78-MASS): s07-s61 + s63 = the same DATA ROWS (motif = the embroidered motif of her approved face outfit
# = FACE_MAP_L703 prompt_file of her cut (sNN.v5.FULL.txt, or v5b/v5r2/v4c/qr where FACE_MAP says so); a leading 'gold' dropped since the motifs are gold-thread anyway;
# s11 'phoenix feathers' -> 'feather scrolls' (phoenix is t7/t8 only: build_low assert); appended AFTER s62/s64/s65, no store sentence touched.
# s44: root sec word 'sage grey' in s_root_colours.json is stale -> 'sage green' = her approved face (s44.qr.FULL.txt, owner Lượt 961 'Xám là bỏ hết'); hex kept.
S_ROOT_FIX={"s44":{"sec":"sage green"}}
S_NEW_ROWS.update({"s07":("plum branches",),"s08":("bamboo",),"s09":("orchids",),"s10":("peonies",),"s11":("feather scrolls",),"s12":("peacock feathers",),"s13":("snowflake plum blossoms",),"s14":("pine needles",),"s15":("water ripples and reeds",),"s16":("peach blossoms",),"s17":("camellias",),"s18":("wisteria",),"s19":("peonies",),"s20":("plum blossoms",),"s21":("orchids",),"s22":("cranes",),"s23":("pine needles",),"s24":("camellias",),"s25":("lotus leaves",),"s26":("peonies",),"s27":("plum blossoms",),"s28":("orchids",),"s29":("cranes",),"s30":("pine needles",),"s31":("camellias",),"s32":("lotus leaves",),"s33":("peonies",),"s34":("plum blossoms",),"s35":("orchids",),"s36":("cranes",),"s37":("pine needles",),"s38":("camellias",),"s39":("chrysanthemums",),"s40":("swallows",),"s41":("ginkgo leaves",),"s42":("magnolias",),"s43":("cloud scrolls",),"s44":("pomegranate flowers",),"s45":("cranes",),"s46":("snowflakes",),"s47":("chrysanthemums",),"s48":("pear blossoms",),"s49":("bamboo leaves",),"s50":("wave and cloud scrolls",),"s51":("peony scrolls",),"s52":("lotus scrolls",),"s53":("magnolias",),"s54":("orchids",),"s55":("begonias",),"s56":("butterflies",),"s57":("wisteria",),"s58":("plum blossoms",),"s59":("peonies",),"s60":("lotus flowers",),"s61":("swallows and willow leaves",),"s63":("osmanthus sprigs",)})
_SRC_S=_json.load(open(_os.path.join(_os.path.dirname(_os.path.abspath(__file__)),"..","face-common","s_root_colours.json"),encoding="utf-8"))
for _c,(_mo,) in S_NEW_ROWS.items():
    _r=dict(_SRC_S[_c],**S_ROOT_FIX.get(_c,{})); _m,_s,_h1,_h2=_r["main"],_r["sec"],_r["main_hex"],_r["sec_hex"]; _n=int(_c[1:]); _fl=MAID_FLOWER[_n%6]
    _pal=f"{_m} and {_s}"; DATA[_c]=(_pal,""); ORIG1[_c]=(f"{_m} silk like {_h1}",f"{_s} like {_h2}"); MOTIF_LOW[_c]=(_mo,_fl); LOWNAME[_c]=(_m,_m)
    ITEMS_LOW[_c]=items3f(_c)
    for _t in (4,5,6): OUTFIT_JOBS[f"{_c}-t{_t}"]=_g3["outfit"](_t,_pal,_mo).replace("Outfit for all four (","Outfit (",1).replace("(Tan)","(Tần)").replace("(Quy phi)","(Quý phi)")
def low_outfit(c,t,v="v0"):
    if f"{c}-t{t}" in OUTFIT_LOW: o=OUTFIT_LOW[f"{c}-t{t}"]
    else:
        o=OUTFIT_JOBS[f"{c}-t{t}"]
        if t==6 and "; more luxury than the rank below" not in o: o=o.replace("; COLOUR RULE:",YEL_T6,1)
    if t==6: o=_re_cape6.sub(CAPE6_TWO,o,1)   # G1 (owner 20/11): Quý phi = TWO layered short shoulder capes
    return o
# SWAP56 (owner L1266 20/11): t5 Phi <-> t6 Quý phi signature piece swapped (t5 = TWO layered short capes, t6 = vân kiên cloud collar). Original G1 note follows.
# G1 (owner 20/11, verbatim: "Coi thử cái prompt của Quý Phi á, là cái áo choàng á, là áo choàng một lớp hay hai lớp? Tôi nhớ là tôi đã bắt buộc là phải là áo choàng hai lớp mà. Cái áo choàng ngắn trên vai á."):
# the LAD3 one-layer "pearl-edged cape/stole" becomes TWO layered SHORT shoulder capes (Phi has one cloud collar).
import re as _re6
_re_cape6=_re6.compile(r"an embroidered ([^,]+?) pearl-edged cape/stole over the shoulders")
# SWAP CANCELLED (owner L1803, rule G1): Quý phi = her OWN two short shoulder capes again, exactly as in the winter1 sheet (dev/art/winter1/s62_t6_dong_L1803.txt); old SWAP56 value: CAPE6_SWAP56=r"an embroidered \1 cloud collar (yunjian) over the shoulders with a scalloped gold-thread edge and a fringe of small gold tassels, pearl-edged, with small jade and pearl drops dangling beneath it, fewer and smaller than the imperial noble consort's, never covering the neckline"   # JOB 3 owner Lượt 1317: t6 collar drops added (reference dev/art/swap56/s62_t6_v2.txt)
CAPE6_TWO=r"TWO layered embroidered \1 SHORT shoulder capes, one over the other (the upper cape shorter, the lower cape a little longer, both resting on the shoulders, pearl-edged), never covering the neckline"
# SWAP56 (owner 20/11 L1266): Quý phi now carries the Phi's old cloud collar (yunjian); pearl edge stays with Quý phi
CAPE5_TWO="TWO layered embroidered SHORT shoulder capes, one over the other (upper shorter, lower longer), never covering the neckline"
# JOB 3 (owner Lượt 1312/1314, FINAL Lượt 1317 via Foreman C #5, reference dev/art/b26/s62_t5_v2.txt): Phi capes v2 = her main colour + gold-thread flower embroidery +
# a row of small sewn-on pearls on each cape edge (the old Quý phi capes) + a short fringe of tiny pearl drops (Lượt 1321). 'peonies' -> her hair-flower species via
# flower_outfit (owner Lượt 1303); people with no species keep peonies (Foreman rule).
CAPE5_V2=("TWO layered embroidered {main} SHORT shoulder capes, one over the other (the upper cape shorter, the lower cape a little longer, both resting on the shoulders), "
          "each cape richly embroidered in gold thread with small peonies, each edged with a row of small sewn-on pearls (exactly the old Quý phi capes) "
          "with a short fringe of tiny pearl drops dangling beneath each cape edge, a little richer than the Tần's pearl fringe and fewer than the Quý phi's drops, "
          "and over both capes an airy open net of small pearls and small jade beads lying flat (the same kind of beaded pearl net as the Tần's capelet), "
          "never covering the neckline")   # owner Lượt 1321 + 1329 pearl net (supersedes 1312/1314/1317)   # SWAP56: Phi now carries the Quý phi's old TWO-layer short capes (pearl edge NOT moved: pearls stay Quý phi)
# KHO2 (owner L1580/L1589/L1596 21/11, verbatim L1596: "đây là cái áo choàng của quý phi cũ mà tao nói nè ... của bậc ba tư quý phi ... cái lớp thứ nhất á, là nó sẽ giống như của bên Tần ... lớp thứ hai á, là nó sẽ chỉ có một chút xíu một cái tay áo nhỏ ở hai bên vai thôi"):
# Phi capes v3 = the OLD Quý phi capes of picture Ba Tư t6 V3 (JNCRrjtOq4, owner-copy/pr_bt_t6_V3.txt, 19/11) — first sentence kept verbatim, then layer 1 = Tần-like round capelet, layer 2 = small cap-sleeve flap per shoulder;
# owner L1598 correction ("Vẫn có lưới ngọc, vẫn có tua rủ"): the V2 pearl edge + drop fringe (L1321) + pearl net (L1329) are KEPT verbatim; only the cape SHAPE changes. Supersedes CAPE5_V2 (kept above for the record).
CAPE5_V3=("TWO layered embroidered {main} pearl-edged shoulder capes, one over the other (the upper one shorter), softly draping over the shoulders: "
          "the UPPER layer is a short round embroidered silk capelet like the Tần's, over only the shoulders and upper chest, its lower edge softly scalloped; "
          "UNDER it the LOWER layer is only a small scalloped flap over the top of each upper arm like a tiny cap sleeve, never a full cape; "
          "each cape richly embroidered in gold thread with small peonies, each edged with a row of small sewn-on pearls (exactly the old Quý phi capes) "
          "with a short fringe of tiny pearl drops dangling beneath each cape edge, a little richer than the Tần's pearl fringe and fewer than the Quý phi's drops, "
          "and over both capes an airy open net of small pearls and small jade beads lying flat (the same kind of beaded pearl net as the Tần's capelet), "
          "never covering the neckline")
# LOWV1/LOWV2[cNN][t] = (robe main colour word, hex, lining word, hex), MEASURED (W79, 18/11) from the LIVE v1/v2 pictures
# img/_review/consort-tiers/<cNN>/b10/<cNN>_a18_t<t>_v<1|2>.png : median RGB of the dominant non-neutral k-means cluster of the central torso/skirt band
# (alpha>200, gold and near-black hair pixels gated out), lining = next distinct cluster. Foreman ruling: --low v1/v2 never use royal yellow (only the t6 small touch).
# Cells whose live picture read yellow/olive-gold (hue 36-70) were DERIVED from the same person+version at the nearest rank (see reports/low-ranks-B-W79.md).
# LOWV1/LOWV2 REWRITTEN by Foreman C ROOT-30 (18/11 ~21:10Z real): the measured W79 tables were all pastel blush/peach (W96 c05: v1≈v2, same colour every rank) = breaks FIGURE_GATE C3 (each rank its own colour) + C3a (v0/v1/v2 three completely different families). Now: 16 fresh families (never rực, never yellow), each v1/v2 rank a different family, neighbouring ranks a different group, v1[t] and v2[t] different groups, none in v0's group (pink+coral = one warm group). Generator /tmp lowv gen.py seed 'lowv-<cNN>'.
LOWV1={
"c01":{1:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),2:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),3:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),4:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),5:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1'),6:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3')},
"c02":{1:('rose pink', '#E596AA', 'pale rose pink', '#F1C5D0'),2:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),3:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),4:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),5:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),6:('apricot', '#EFB679', 'pale apricot', '#F6D7B5')},
"c03":{1:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),2:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),3:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),4:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),5:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),6:('apricot', '#EFB679', 'pale apricot', '#F6D7B5')},
"c04":{1:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),2:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1'),3:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),4:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),5:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),6:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7')},
"c05":{1:('peach orange', '#F0AE84', 'pale peach orange', '#F7D2BB'),2:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),3:('rose pink', '#E596AA', 'pale rose pink', '#F1C5D0'),4:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),5:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),6:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC')},
"c06":{1:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),2:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1'),3:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),4:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),5:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),6:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC')},
"c07":{1:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),2:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),3:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),4:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),5:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),6:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC')},
"c08":{1:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),2:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),3:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),4:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),5:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),6:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5')},
"c09":{1:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),2:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),3:('peach orange', '#F0AE84', 'pale peach orange', '#F7D2BB'),4:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),5:('rose pink', '#E596AA', 'pale rose pink', '#F1C5D0'),6:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5')},
"c10":{1:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),2:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),3:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),4:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),5:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1'),6:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8')},
"c11":{1:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),2:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),3:('apricot', '#EFB679', 'pale apricot', '#F6D7B5'),4:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),5:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),6:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8')},
"c12":{1:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),2:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),3:('apricot', '#EFB679', 'pale apricot', '#F6D7B5'),4:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),5:('rose pink', '#E596AA', 'pale rose pink', '#F1C5D0'),6:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8')},
"c13":{1:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),2:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),3:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),4:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),5:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),6:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1')},
"c14":{1:('apricot', '#EFB679', 'pale apricot', '#F6D7B5'),2:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),3:('rose pink', '#E596AA', 'pale rose pink', '#F1C5D0'),4:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),5:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),6:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4')},
"c15":{1:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),2:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),3:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),4:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),5:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),6:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8')},
"c16":{1:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),2:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),3:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),4:('coral pink', '#EC9585', 'pale coral pink', '#F5C5BC'),5:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),6:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4')},
"c17":{1:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1'),2:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),3:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),4:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),5:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),6:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4')},
"c18":{1:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),2:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),3:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),4:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),5:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),6:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1')},
"c19":{1:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),2:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),3:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),4:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),5:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1'),6:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3')},
"c20":{1:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),2:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),3:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),4:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),5:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),6:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC')},
"c21":{1:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),2:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),3:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),4:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1'),5:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),6:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6')},
"c22":{1:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),2:('coral pink', '#EC9585', 'pale coral pink', '#F5C5BC'),3:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),4:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),5:('peach orange', '#F0AE84', 'pale peach orange', '#F7D2BB'),6:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6')},
"c23":{1:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),2:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),3:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),4:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),5:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),6:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6')},
"c24":{1:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),2:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),3:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),4:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),5:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),6:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3')},
"c25":{1:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),2:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),3:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),4:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),5:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),6:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4')},
"c26":{1:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),2:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),3:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),4:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),5:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),6:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8')},
"c27":{1:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),2:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),3:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1'),4:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),5:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),6:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4')},
"c28":{1:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),2:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),3:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),4:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),5:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1'),6:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4')},
"c29":{1:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),2:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),3:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),4:('apricot', '#EFB679', 'pale apricot', '#F6D7B5'),5:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),6:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4')},
"c30":{1:('coral pink', '#EC9585', 'pale coral pink', '#F5C5BC'),2:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),3:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),4:('rose pink', '#E596AA', 'pale rose pink', '#F1C5D0'),5:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1'),6:('peach orange', '#F0AE84', 'pale peach orange', '#F7D2BB')},
"c31":{1:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),2:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),3:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),4:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),5:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),6:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1')},
"c32":{1:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),2:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),3:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),4:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),5:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),6:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC')}}
LOWV2={
"c01":{1:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),2:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),3:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),4:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),5:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),6:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5')},
"c02":{1:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),2:('peach orange', '#F0AE84', 'pale peach orange', '#F7D2BB'),3:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1'),4:('coral pink', '#EC9585', 'pale coral pink', '#F5C5BC'),5:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),6:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7')},
"c03":{1:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),2:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),3:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),4:('rose pink', '#E596AA', 'pale rose pink', '#F1C5D0'),5:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),6:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5')},
"c04":{1:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),2:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),3:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),4:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),5:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),6:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8')},
"c05":{1:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1'),2:('plum rose', '#C57C98', 'pale plum rose', '#DFB7C6'),3:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),4:('coral pink', '#EC9585', 'pale coral pink', '#F5C5BC'),5:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),6:('apricot', '#EFB679', 'pale apricot', '#F6D7B5')},
"c06":{1:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),2:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),3:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),4:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),5:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),6:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6')},
"c07":{1:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),2:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1'),3:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),4:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),5:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),6:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5')},
"c08":{1:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),2:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),3:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),4:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),5:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1'),6:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6')},
"c09":{1:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),2:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),3:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),4:('apricot', '#EFB679', 'pale apricot', '#F6D7B5'),5:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),6:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1')},
"c10":{1:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),2:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),3:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),4:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),5:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),6:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6')},
"c11":{1:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),2:('coral pink', '#EC9585', 'pale coral pink', '#F5C5BC'),3:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),4:('plum rose', '#C57C98', 'pale plum rose', '#DFB7C6'),5:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),6:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6')},
"c12":{1:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),2:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),3:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),4:('plum rose', '#C57C98', 'pale plum rose', '#DFB7C6'),5:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),6:('peach orange', '#F0AE84', 'pale peach orange', '#F7D2BB')},
"c13":{1:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),2:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),3:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),4:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),5:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1'),6:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC')},
"c14":{1:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),2:('peach orange', '#F0AE84', 'pale peach orange', '#F7D2BB'),3:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),4:('plum rose', '#C57C98', 'pale plum rose', '#DFB7C6'),5:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),6:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6')},
"c15":{1:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),2:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),3:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),4:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1'),5:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),6:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5')},
"c16":{1:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),2:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),3:('peach orange', '#F0AE84', 'pale peach orange', '#F7D2BB'),4:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),5:('apricot', '#EFB679', 'pale apricot', '#F6D7B5'),6:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8')},
"c17":{1:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),2:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),3:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),4:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),5:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),6:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7')},
"c18":{1:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),2:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),3:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),4:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),5:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),6:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6')},
"c19":{1:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),2:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),3:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),4:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),5:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),6:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5')},
"c20":{1:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),2:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),3:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),4:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),5:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),6:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1')},
"c21":{1:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),2:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),3:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),4:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),5:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),6:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3')},
"c22":{1:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1'),2:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),3:('rose pink', '#E596AA', 'pale rose pink', '#F1C5D0'),4:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),5:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),6:('apricot', '#EFB679', 'pale apricot', '#F6D7B5')},
"c23":{1:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),2:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),3:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1'),4:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),5:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),6:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5')},
"c24":{1:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1'),2:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),3:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),4:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),5:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),6:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC')},
"c25":{1:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),2:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),3:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),4:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1'),5:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),6:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8')},
"c26":{1:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),2:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),3:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),4:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1'),5:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),6:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6')},
"c27":{1:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),2:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),3:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),4:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),5:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),6:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5')},
"c28":{1:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),2:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),3:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),4:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8'),5:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),6:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5')},
"c29":{1:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),2:('plum rose', '#C57C98', 'pale plum rose', '#DFB7C6'),3:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),4:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),5:('rose pink', '#E596AA', 'pale rose pink', '#F1C5D0'),6:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6')},
"c30":{1:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),2:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),3:('apricot', '#EFB679', 'pale apricot', '#F6D7B5'),4:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),5:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6'),6:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7')},
"c31":{1:('aqua blue', '#7CC3CC', 'pale aqua blue', '#B7DEE3'),2:('orchid purple', '#B184C0', 'pale orchid purple', '#D4BBDC'),3:('turquoise', '#5FB3B0', 'pale turquoise', '#A7D5D4'),4:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),5:('leaf green', '#93BE7C', 'pale leaf green', '#C4DBB7'),6:('lilac', '#C2A3D6', 'pale lilac', '#DDCCE8')},
"c32":{1:('sky blue', '#86B4DC', 'pale sky blue', '#BCD6EC'),2:('mint green', '#93CDB3', 'pale mint green', '#C4E4D5'),3:('azure blue', '#6A98D2', 'pale azure blue', '#ADC6E6'),4:('jade green', '#6FAF8E', 'pale jade green', '#B0D3C1'),5:('lavender violet', '#A797D0', 'pale lavender violet', '#CFC6E5'),6:('cornflower blue', '#7F8FD2', 'pale cornflower blue', '#B9C1E6')}}
# PHI t5 E-H (W103c, owner 19/11 ~00:20Z PHI REDESIGN VERDICT in FIGURE_GATE: A-D rejected; ONE signature piece at the neck/shoulders, not the t4 collar, not the t6 cầu vai, no vest): same robe for E-H, only the signature piece differs.
# PHI t5 VARIANTS (owner 18/11 ~22:20Z: Phi must differ from Tan t4 beyond the collar; 3-4 designs to choose from). Flags --phiA..--phiD (default t5 unchanged until she picks). Phi-level luxury, below Quy phi t6; no cloud collar, no phoenix.
PHI_VAR={
"A":"a silk brocade court robe richly embroidered in gold with peonies and small birds, worn under a short gold-edged brocade over-jacket with wide elbow-length half sleeves, the long wide inner sleeves of the robe falling below the half sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels",
"B":"a long sleeveless brocade vest-coat richly embroidered in gold with peonies and small birds, worn open over a long-sleeved robe, a long gold-embroidered silk stole draped across both arms and trailing to the hem, a gold-embroidered waistband with hanging jade belt pendants",
"C":"a silk brocade court robe richly embroidered in gold with peonies and small birds, the wide sleeves falling in three stacked tiers of different tones of her colour, each tier edged with a band of gold embroidery, a gold-embroidered waistband with hanging jade belt pendants and tassels",
"D":"a fitted gold-brocade bodice with a stiff embroidered waist panel over a long brocade over-skirt with a wide front panel of large peony medallions and side pleats, long wide brocade sleeves, a long silk apron falling from the waist with two hanging jade pendants",
"E":"a silk brocade court robe with a crossed collar, richly embroidered in gold with peonies and small birds, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, and as her ONE signature piece, clearly visible at game size, a large jewelled necklace-collar (yingluo) worn around the neck: a rigid gold ring collar set with pearls and jade, with strings of pearls and small jade pendants hanging from it in a curved fringe over the upper chest; no cloud collar, no vest, no stiff shoulder pieces",
"F":"a silk brocade court robe with a crossed collar, richly embroidered in gold with peonies and small birds, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, and as her ONE signature piece, clearly visible at game size, a short round capelet covering only the shoulders and upper chest, of soft silk brocade with a smooth round outline (not cloud-shaped, not scalloped, not pointed), embroidered all over with small gold flowers, edged with a row of pearls and fastened at the throat with a jade clasp; no cloud collar, no vest, no stiff shoulder pieces",
"G":"a silk brocade court robe with a crossed collar, richly embroidered in gold with peonies and small birds, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, and as her ONE signature piece, clearly visible at game size, a beaded shoulder yoke draped from shoulder to shoulder over the upper chest: a fine open net of pearls and small jade beads with tiny gold flower studs, its lower edge a short pearl fringe, lying flat over the robe; no cloud collar, no vest, no stiff shoulder pieces",
"H":"a silk brocade court robe with a crossed collar, richly embroidered in gold with peonies and small birds, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, and as her ONE signature piece, clearly visible at game size, a small Ming-style stand collar: the inner collar rises a little at the throat as a short gold-brocade stand collar (no higher than the middle of the neck), fastened by two round gold button-clasps, with a gold pendant chain hanging from the top clasp down to the chest and ending in a small jade plaque; the crossed outer collar stays visible below it; no cloud collar, no vest, no stiff shoulder pieces"
}
# LOW_TONE (W103c, owner 19/11 ~00:10Z real, FIGURE_GATE rule 3 GAME COLOUR BENCHMARK = SHEET5 TONE LEVEL): the low-rank t1-t6 COLOUR RULE clause for young ages; same words as the triều rule (build_trieu); no trầm/subdued.
# B18 (owner Lượt 586/590/592, BW4): colour model = the 3 foreign princesses nc1-nc3 (clear soft colours L~0.62-0.75 S~0.30-0.50, a real pretty second colour, ivory/cream OK, never grey); replaces the old "coral-red and brick-red robes of the game" benchmark
LOW_TONE="all colours clear, soft and gentle at a medium-light tone, like fine silk in soft daylight: medium-soft saturation, pretty and clean, the secondary colour a real pretty colour (it may be a little deeper or a soft ivory, never heavy, never black, never grey), never rực, never glaring, never neon, never pastel-washed or faded, never dusty, grey, muddy or black; "
# canon overwrite (ROOT-36 relay of FIGURE_GATE @84343b0, owner: Tần = Phi F capelet + the Phi G BEADED YOKE laid over it, pearls SPARSER): the WHOLE Phi G yoke sentence, sliced VERBATIM from PHI_VAR["G"], + a sparseness qualifier.
_G_YOKE=PHI_VAR["G"][PHI_VAR["G"].index("a beaded shoulder yoke"):PHI_VAR["G"].index("; no cloud collar")]
assert _G_YOKE.endswith("lying flat over the robe"),_G_YOKE
TAN_CAPE_PEARLS=", and laid over the capelet "+_G_YOKE+", with fewer, more widely spaced pearls than usual, airy"
# F1 (owner verdict 19/11 ~03:05Z, FIGURE_GATE last block item 1, verbatim: "cái ngọc trai đó ... nó rủ bằng, nó dài bằng cái áo ngắn ở ngoài luôn, ngay chỗ cái cổ luôn, chứ không phải là một nửa như vậy"): the pearl net starts at the collar and hangs the FULL length of the short capelet.
TAN_CAPE_PEARLS+="; the pearl net starts right at the collar at the throat and hangs down over the WHOLE capelet, as long as the capelet itself, its pearl fringe at the capelet's lower edge, never only half of it"
# ITEMFIX2 (owner 20/11 GO "Ok làm đi, rồi chạy magnific 1 người test lại coi có khác không": t4 prompts over 10 000 chars): the same yoke + F1 length, filler words removed (old text above kept for the record)
TAN_CAPE_PEARLS=", with a beaded yoke over it: an airy open net of sparse pearls and small jade beads with tiny gold flower studs, lying flat from the throat over the WHOLE capelet, its short pearl fringe at its lower edge, never only half of it"
# Phi capes v4 (owner L1626 21/11 via Foreman C #15, verbatim: "bạn copy y chang cái áo choàng nhỏ của bậc tầng, từng câu từng chữ đưa qua cho bên bậc Phi, nhưng mà mình thêm một cái là một cái lớp, tức là thêm một cái lớp nhỏ ở trên vai ở hai bên cho bậc Phi ... Cũng sẽ có ngọc trai luôn, cũng có tu rua như vậy luôn."): the Tần capelet words (t4 sentence below + TAN_CAPE_PEARLS) VERBATIM
# + CAPE5_V4_EXTRA (one small layer on top of each shoulder, pearls + tassel fringe). Supersedes CAPE5_V3 (kept for the record). DESIGN20.
CAPE5_V4_EXTRA="; PLUS ONE extra small layer: on top of EACH shoulder (both sides) a small SOFT round embroidered silk layer lying over the capelet, clearly visible, also edged with sparse pearls and a short pearl tassel fringe"
CAPE5_V4="a short round embroidered silk capelet (not cloud-shaped, scalloped or pointed) over only the shoulders and upper chest, a jade clasp at the throat"+TAN_CAPE_PEARLS+"; no cloud collar, vest or stiff shoulder pieces"+CAPE5_V4_EXTRA
# SWAP CANCELLED (owner L1803 21/11 via Foreman C #23, rule G1): Phi = her OWN vân kiên cloud collar again, exactly as in the winter1 sheet (dev/art/winter1/s62_t5_dong_L1803.txt); CAPE5_V2/V3/V4 kept for the record, no longer used.
CAPE5_VK="an embroidered cloud collar (yunjian) over the shoulders with a scalloped gold-thread edge and a fringe of small gold tassels, and laid over the cloud collar an airy open net of SMALL pearls (about the Tần's size) and small jade beads, lying flat, its short pearl fringe at the lower edge, never covering the neckline"   # owner L1829 (Foreman C #23): Phi pearl net (L1329/L1598, small pearls L1797) restored onto her own cloud collar
def build_low(c,t,v="v0"):
    pal,face=DATA[c]; m,m2=ORIG1[c]; item,hk=age_item(c,f"t{t}",*ITEMS_LOW[c][t]); right=(int(c[1:])%2==1)
    main0,orig=LOWNAME[c]
    LV=None if v=="v0" else (LOWV1 if v=="v1" else LOWV2)[c][t]
    o=(outfit_low123(c,t,pal if LV is None else LV[0],main0 if LV is None else LV[0]) if t<=3 else low_outfit(c,t,v))
    # colour word of the outfit text: v0 = her ORIGINAL robe colour (skipped when the original name already contains the family word); v1 = royal yellow; v2 = V2 family
    new=orig if LV is None else LV[0]
    if (t>3 or v=="v0") and not (v=="v0" and main0 in orig): o=re.sub(re.escape(main0)+r"(?! blossom)",new,o)
    o=o.replace("phoenixes and peonies","peonies and small birds").replace("phoenixes and butterflies","peonies and butterflies").replace("phoenixes and bamboo leaves","peonies and bamboo leaves")
    o=re.sub(r"phoenixes and (peonies|[a-z\- ]+?) in ",lambda k:"peonies and small birds in " if k.group(1)=="peonies" else "peonies and "+k.group(1)+" in ",o)
    if t==6: o=o.replace("tall chignon crowned by a BIG ornate gold headdress","a BIG ornate gold headdress")   # owner 18/11 ~22:20Z: no hairstyle words
    if t==4: o=o.replace("elegant high chignon with gold and jade hairpins","gold and jade hairpins")   # owner 18/11 ~22:05Z: no hairstyle words, her own hair stays; only ornaments
    if t==4:   # TAN <-> PHI SWAP (owner 19/11 ~01:20Z + CORRECTION "doi thanh phi f", FIGURE_GATE last line): t4 Tan = Phi F DESIGN (PHI_VAR["F"]: crossed collar, long trailing wide sleeves, waistband with hanging jade belt pendants and tassels, short round capelet) at the t4 LUXURY level (t4 words kept: silk, WIDE gold-thread embroidered borders of <motif>, embroidered silk sash, gold and jade hairpins + bu yao). Dropped as Phi luxury: brocade, "richly embroidered in gold", gold-embroidered waistband, capelet "soft silk brocade ... embroidered all over with small gold flowers, edged with a row of pearls".
        _m=re.search(r"a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of (.+?) at collar, sleeves and hem, an embroidered cloud collar \(yunjian\) over the shoulders and an embroidered silk sash; gold and jade hairpins",o)
        assert _m,(c,t)
        # F1 (owner verdict 19/11 ~03:05Z item 1: "mày không có hề copy cái request ... của bên tầng qua ... tầng cũ ... theo hoa theo chim ngay trên cái áo"): the OLD Tần robe+embroidery clause is copied WHOLE (W72 golden_low @d18fae6 = the prompt of the old t1t6 Tần images): "a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of <motif> at collar, sleeves and hem" ... "an embroidered silk sash"; only its cloud collar is replaced by the approved capelet (swap design).
        _G20=AGE in ("a18","a26")   # G22 (owner 20/11 via ROOT-69) + DENSITY LOCK (owner L2006: 'rất đẹp, giữ mật độ thêu của Tần như thế này', thu Tần L1994 VX7nsw2MMU): t4 Tần a18/a26 = G17 square cut (richer) + a few MEDIUM flowers on robe body+sleeves and flower sprays on the skirt front (more than Thường tại, fewer than Phi; was: a few LARGE flowers); collar embroidery NOT mentioned at all (owner correction 20/11 via ROOT-70: 'cổ áo bậc tầng đừng có đề cập gì tới hết'); a36+ = COLLAR1 crossed collar, unchanged
        _G20B=(f"WIDE gold-thread embroidered borders of {_m.group(1)} at sleeves and hem, a few MEDIUM embroidered {_m.group(1)} scattered on the robe body and the sleeves (clearly more than at Thường tại, still fewer than the Phi) and sprays of {_m.group(1)} on the skirt front" if _G20 else f"WIDE gold-thread embroidered borders of {_m.group(1)} at collar, sleeves and hem")
        _G20N="a crossed collar"   # TAN-REVERT (owner 20/11 ~18:45Z, verbatim: "Không, bậc tần tao đã trả về cổ áo trước đó, không còn vuông như 3 bậc dưới nữa"): G22's square neckline ("the low square neckline of rank 1, richer gold-brocade edge, NO crossed collar") removed at a18/a26 -> the pre-G22 collar words (same as a36+); G22's big flowers + no collar-embroidery words (_G20B) kept
        o=o.replace(_m.group(0),f"a layered silk robe of two or three visible layers with {_G20B}, {_G20N}, long trailing wide sleeves, an embroidered silk sash with silk tassels, and her ONE signature piece: a short round embroidered silk capelet (not cloud-shaped, scalloped or pointed) over only the shoulders and upper chest, a jade clasp at the throat{TAN_CAPE_PEARLS}; no cloud collar, vest or stiff shoulder pieces; gold and jade hairpins")
        o=o.replace("gold and jade hairpins and small dangling gold bu yao tassel hairpins","gold and jade hairpins with small dangling gold bu yao tassels",1).replace(", gold only as embroidery accents, NOT a cream",", NOT a cream",1)   # ITEMFIX2: gold-accent words said twice more below (COLOUR RULE, TWO-COLOUR RULE)
    if t==5:   # owner 18/11 ~22:05Z: Phi redesigned (not the t3 cut, not the rejected collar): next step of the Tan -> Quy phi neck piece (t4 cloud collar, t6 pearl-edged collar + cape, t7 jewelled cloud-collar cape)
        _a="a silk brocade robe richly embroidered in gold with peonies and small birds, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress"
        assert _a in o,(c,t)
        _pv=[x for x in "ABCDEFGH" if "--phi"+x in sys.argv]
        if _pv: o=o.replace(_a,PHI_VAR[_pv[0]]+"; a LARGER gold headdress")
        else:
            # TAN <-> PHI SWAP (owner 19/11 ~01:20Z, FIGURE_GATE last line): t5 Phi = the OLD t4 Tan DESIGN (layered robe of two or three visible layers, embroidered cloud collar (yunjian) over the shoulders, waist tie) at the t5 Phi LUXURY level (old t5 default words: silk brocade court robe richly embroidered in gold, scalloped gold-thread edge + gold tassel fringe, deep brocade cuffs, broad gold brocade girdle with jade pendants, peony medallions, LARGER gold headdress). "larger than the rank below" dropped (t4 no longer has a cloud collar).
            o=o.replace(_a,"a layered silk brocade court robe of two or three visible layers, richly embroidered in gold with peonies and small birds, "+CAPE5_VK+", long trailing wide sleeves with deep brocade cuffs, a broad gold brocade girdle, the front of the skirt embroidered with large peony medallions, a sheer silk shawl; a LARGER gold headdress")   # F1 (owner verdict 19/11 ~03:05Z item 2): OLD Phi light sheer silk outer layer, words copied verbatim from the old t5 text ("a sheer silk shawl")
    if LV is not None: o=o.replace("NOT yellow, ","")   # v1/v2: no yellow words outside the t6 small-touch clause
    assert "phoenix" not in o,(c,t)
    s=PRE+f" An imperial consort. Her face: {face}. From the identity reference keep ONLY her face, facial features, hairstyle colour and signature colour family; do NOT copy the outfit, hair ornaments or accessories of the reference, dress her in the NEW outfit below. The style reference image is only for skin, drawing style, fabric and embroidery: never copy its face, body or pose. {AGE_TXT[AGE]} "+o+"."
    _fr="all colours fresh, clear and luminous, never dusty or greyed; " if AGE in ("a51","a65") else LOW_TONE   # a51/a65: old clause kept, the elder swap below replaces it
    if v=="v0": s+=f" COLOUR RULE: {_fr}her ORIGINAL robe colour is kept exactly as in image 1 (her first reference): {m} is the main colour of the robe, sleeves and any cape, with {m2} in the inner robe and linings; gold only as thin accents."
    else: s+=f" COLOUR RULE: {_fr}this version's robe colour is {LV[0]} silk like {LV[1]} (a different colour family from her first reference), the main colour of the robe, sleeves and any cape, with {(LV[2]+' like '+LV[3]) if LV[3]!=LV[1] else 'a slightly deeper tone of the same colour'} in the inner robe and linings; gold only as thin accents."
    hairs={1:" Hair: her own hairstyle exactly as in her first reference, with pretty silver hairpins and a fresh flower, little gold. ",2:" Hair: her own hairstyle exactly as in her first reference, with silver and pearl hairpins and a fresh flower, little gold. ",3:" Hair: her own hairstyle exactly as in her first reference, with silver, pearl and fresh flowers, little gold. "}[t] if t<=3 else " Hair: her own hairstyle decorated with several gold hairpins (trâm) with dangles, rich like her rank. "
    if t==4 or (t==5 and not [x for x in "ABCDEFGH" if "--phi"+x in sys.argv]): hairs=" Hair: her own hairstyle decorated with fresh flowers and several gold hairpins (trâm) with dangles, rich like her rank. "   # F1 (owner verdict 19/11 ~03:05Z items 1+2: Tần jewellery + Phi hairpins as rich as the OLD ones): the OLD t4/t5 hair-ornament sentence copied verbatim (W72 build.py @d18fae6 / golden_low); hairstyle words stay out (FIGURE_GATE HAIR SAME AT EVERY RANK)
    s+=hairs+"No phoenix anywhere on the robe or in the hair: only flowers, birds, butterflies or other motifs. All flowers, birds and butterflies are fine silk-thread embroidery stitched directly into the fabric, flat and integrated with the cloth, following its folds, not appliqué, not pasted patches, not raised. "+(FAB_LOW if t<=3 else FAB)
    s+=f" Pose: calm standing pose; she holds {item} in a contrasting colour, not the robe colour, the item held below the chin, the hand really gripping it, the whole face fully visible. Her hands interact naturally with the item (gently presenting, turning or touching it), lively and natural, while her head stays up facing the viewer, eyes open, lips closed, never looking down. Her hands and body: {low_hand(hk,right)}."
    s+=" Every hairpin is inserted into the hair pointing upward or backward with dangles hanging down, no hairpin horizontal or sticking out to the side. Luminous smooth porcelain skin, bare clean forehead with no forehead mark and no flower mark, eyes open, floor-length robe, only slipper toe tips peeking under the hem, no train, no cup, nothing covering the face."
    return s+END
# F2 (owner 19/11 ~03:05Z, FIGURE_GATE last block item (3), canon overwrite of the N3b build_low-based --bdq): --bdq 1|2 = the OLD APPROVED Quý phi t6 prompt (c06 a18 t6 v0, Magnific VXw4SmmMMU, stored prompt QP_OLD below, copied verbatim from creations_get) with ONLY the Bắc Địch swaps: robe colour (BD_OPT jade/sapphire), a modest fur trim, and her face from her BD identity image. Image numbering (F2 r2, ROOT-39: no swatch, the old QP had none): 1 style, 2 own face, 3 = the approved Quý phi picture VXw4SmmMMU (the costume source that the old prompt's "image 1" was). No added emphasis sentences. --bditem is no longer used by --bdq.
QP_OLD="Copy EXACTLY everything from image 1: hair, headdress, face, costume, pose, proportions, fabric material and stitching. Do NOT change any colour: the robe stays the same coral-terracotta as image 1, same colours everywhere. Replace the embroidered phoenix with peonies and butterflies stitched in the same places (no phoenix). Skin, drawing style and fabric rendering like the style reference. Clean bare forehead, no mark. Exactly ONE held item, no cup. Soft closed-lip faint smile. Full body figure, transparent background."
BDQ_COL={"1":"jade-green like #4E9C86","2":"sapphire-blue like #4F78B4"}
BDQ_COSTUME={"1":"KLpl1nHkqp","2":"UPv97BAwny"}   # F2 r4: our r3 BĐ gens = costume source per colour
BDITEM="10"
BD_ITEMS={"1":("a turquoise-and-coral bead string","bead"),"2":("a small fur-trimmed leather pouch","pouch"),"3":("a silver-mounted horn-handled whisk-fan of horsehair","fan"),"4":("a carved bone hand mirror with a turquoise rim","mirror"),"5":("a small felt-bound book","book"),"6":("a painted leather folding fan","fan"),"7":("a branch of dried steppe flowers tied with red cord","branch"),"8":("an embroidered silk bag with coral beads","pouch"),"9":("a small ornamented silver whistle-flute on a cord","flute"),"10":("a white-jade ruyi with a turquoise bead","ruyi"),"11":("a small round felt fan trimmed with fur, with a silver handle","fan"),"12":("a carved horn comb set with turquoise, held in the hand","ruyi"),"13":("a small embroidered felt ball with coral tassels","pouch"),"14":("a small two-stringed horse-head fiddle","flute"),"15":("a turquoise-studded silver amulet box on a cord","bead"),"16":("a small felt-wrapped bundle of letters tied with red cord","book"),"17":("a silver-handled riding crop with a coral tassel","ruyi"),"18":("a small silver hand bell with coral beads","bead"),"19":("a small silver prayer wheel","ruyi"),"20":("a felt-bound sutra book with silver clasps","book"),"21":("a dark wooden walking staff with a silver ram's-head top","ruyi"),"22":("a small fur-lined silver hand warmer","pouch"),"23":("a silver-mounted turquoise snuff bottle","fan"),"24":("a bundle of dried wormwood tied with red cord","branch"),"25":("a silver-mounted eagle-feather fan","fan")}
# E11 (owner Lượt 583/585, IT1): +15 items appended (the first 10 unchanged, same order) -> 25; {age: 5 indices}, 25 different items per rank, adjacent ranks (t1..t8, Nữ đế, Thái hậu) never share an item kind at one age. Pick: LIST[AGE_DICT[age][(n-1)%5]]. BD keys are the dict keys.
BD_AGE={"a18": ["14", "11", "13", "9", "4"], "a26": ["5", "16", "12", "8", "7"], "a36": ["22", "10", "3", "17", "2"], "a51": ["23", "24", "25", "18", "1"], "a65": ["15", "20", "19", "21", "6"]}
HAND_BD={"bead":"the bead string draped over the fingers of one hand at chest height below the chin, the other hand resting lightly on her sash","pouch":"the pouch held in one hand at waist height, the other hand resting lightly on its cord","fan":"the fan held up in one hand at chest height below the chin, the other hand resting lightly on her sash","mirror":"the hand mirror held in one hand at chest height with its back turned outward, the other hand touching a hairpin","book":"the book held open in both hands at waist height","branch":"the branch held up in one hand at chest height below the chin, the other hand touching a blossom","flute":"the flute held in both hands at chest height below the chin","ruyi":"the ruyi held upright in one hand at chest height below the chin, the other hand resting lightly on her sash"}
def build_bdq(o="1"):
    # F2 r4 (owner Lượt 229 via ROOT-40 ~03:51Z, option A): image 2 = her BĐ rank-1 picture BhNIDfhoQR (face + her own hair), image 3 = our r3 BĐ gen (costume + headdress ONLY, no c06 person); hair braided BĐ-style pinned up high; item = FIGURE_GATE H BĐ #1; slight shoulder turn. Built from QP_OLD by swaps (provenance kept).
    t=QP_OLD
    def sw(a,b):
        nonlocal t
        assert t.count(a)==1,a; t=t.replace(a,b)
    sw("Copy EXACTLY everything from image 1: hair, headdress, face, costume, pose, proportions, fabric material and stitching.","Copy EXACTLY from image 3 ONLY the costume: robe, cape, sleeves, fur trim, fabric material and stitching, and its "+BDQ_COL[o].replace(" like "," colour like ")+", exactly as in image 3. The woman is the Bắc Địch princess of image 2: her face and her own hair from image 2 (face and hair only, do NOT copy its outfit), her hair braided in her Bắc Địch way and pinned up high in a tall braided chignon, decorated only with the hairpins and headdress of image 3. She holds a turquoise-and-coral bead string in her hand at chest height below the chin. Pose: calm standing pose, body turned slightly with one shoulder a little forward, face toward the viewer; not a frontal ID-photo pose, not sideways.")
    sw(" Do NOT change any colour: the robe stays the same coral-terracotta as image 1, same colours everywhere. Replace the embroidered phoenix with peonies and butterflies stitched in the same places (no phoenix).","")
    return t+END
# ---------- STATES (SAMPLES ONLY, owner 18/11 ~21:00Z real; brief dev/handover/briefs/states-sample.md): --state nude|thaihau|kc|ngheo|nc1|nc6|bd1|bd6 ----------
# Same sentence structure as the 8 ranks (PRE, identity sentence, AGE_TXT, outfit, COLOUR RULE, embroidery+drape, item pose, closing hairpin rule, END). Existing outputs untouched: all code below is only reached with --state.
# PDATA (separate from DATA on purpose: tests iterate DATA) = the two approved foreign-princess sample faces (img/_review/princess-sample/{namchieu,bacdich}_a18_s1.png): (signature colour words, face words)
PDATA={"nc":("dusty teal-blue and silver","oval face with soft cheeks, gentle almond eyes, softly curved brows, a small rosy mouth"),
"bd":("deep teal-green and ivory fur","oval face with gently high cheekbones, warm round-almond eyes, softly arched brows, a small rosy mouth")}
PTALL={"nc":"Nam Chiếu (Nanzhao, Yunnan) princess","bd":"Bắc Địch (northern steppe) princess"}
for _k in ("bd","nc"):   # 19/11 Lượt 407: the 6 princess faces bd1-3 / nc1-3 as DATA rows (palette + face words of PDATA) so that `--state mama` works for them
    for _j in (1,2,3): DATA[f"{_k}{_j}"]=(PDATA[_k][0].replace(" fur",""),PDATA[_k][1])
# OWNER-approved princess colours (ART_RULES B18 Lượt 592, ROOT-51 -> BW4 GO): nc1-nc3 replace the placeholder "dusty teal-blue and silver" (name in DATA, name + hex in ORIG1)
for _id,_m,_mh,_s,_sh in (("nc1","indigo","#5E6694","warm ivory","#EAD7BF"),("nc2","soft jade green","#9EB28F","deep rose","#CF7E83"),("nc3","wisteria lilac","#CCA7C8","rose-red","#D18A92")):
    DATA[_id]=(f"{_m} and {_s}",DATA[_id][1]); ORIG1[_id]=(f"{_m} silk like {_mh}",f"{_s} like {_sh}"); M_COLS[_id]=(_m,_mh,_s,_sh)
IDENT=" From the identity reference keep ONLY her face, facial features and hairstyle colour; do NOT copy the outfit, hair ornaments or accessories of the reference, dress her in the NEW outfit below. The style reference image is only for skin, drawing style, fabric and embroidery: never copy its face, body or pose."
TH_ITEMS=[("a string of sandalwood prayer beads","one"),("a jade-headed dragon-head staff","one"),("a thread-bound sutra book with a gold-brocade cover","two"),("a small gilded bronze hand censer","two"),("a scroll of calligraphy on yellow silk","two"),("an ivory-handled silk fan","one"),("a small white-jade ruyi","two"),("an embroidered silk prayer-bead pouch","one"),("a carved sandalwood box","two"),("a hand mirror in a bronze-and-jade frame","one"),
("a dark-sandalwood folding fan with a long silk tassel","one"),
("an old-jade pendant carved with the longevity character on a silk cord","one"),
("a small lotus lamp of old celadon","two"),
("a palace lantern of longevity-pattern brocade on a sandalwood frame","two"),
("a painting album bound in longevity-pattern brocade","two"),
("a small hand warmer of gilt bronze in a brocade cover","two"),
("an openwork gilt-bronze incense ball on a long silk tassel","one"),
("a fly-whisk of white horsehair with a sandalwood handle","one"),
("a round old-jade longevity plaque carved with a round shou symbol","two"),
("a small old-jade statuette of Guanyin on a sandalwood base","two"),
("a pair of old-jade health balls","two"),
("a small potted orchid in a dark glazed pot","two"),
("a carved old-jade lingzhi fungus on a sandalwood stand","two"),
("a small gilt-bronze hand bell with a silk tassel","one"),
("a thread-bound almanac in a brocade cover","two"),
("a calligraphy brush with a sandalwood shaft","one"),
("an old-jade name seal with a silk tassel","one"),
("a small round fan of longevity-pattern brocade","one"),
("a carved sandalwood comb, held in the hand","one"),
("an embroidered silk handkerchief with longevity characters","one"),
("a small sandalwood birdcage with its brocade cover drawn back","two"),
("a sprig of winter plum blossoms","one"),
("a small sandalwood wooden fish (mõ) with its striker","one"),
("a small hand-held table screen of longevity-pattern brocade in a sandalwood frame","two"),
("a small old-jade perfume flask with a silk tassel","one"),
("a small woven-rattan flower basket with orchids","two"),
("a small potted pine in an old celadon pot","two"),
("a carved sandalwood ruyi inlaid with old jade","two"),
("a string of old-jade prayer beads","one"),
("a hanging scroll of pine and cranes on old silk","two")]
# E11 (owner Lượt 583/585, IT1): +15 items appended (the first 10 unchanged, same order) -> 25; {age: 5 indices}, 25 different items per rank, adjacent ranks (t1..t8, Nữ đế, Thái hậu) never share an item kind at one age. Pick: LIST[AGE_DICT[age][(n-1)%5]].
TH_AGE={"a18": [9, 8, 11, 21, 4, 25, 26, 27], "a26": [5, 7, 13, 6, 12, 28, 29, 30], "a36": [2, 14, 0, 15, 10, 31, 32, 33], "a51": [20, 18, 23, 22, 1, 34, 35, 36], "a65": [16, 19, 17, 24, 3, 37, 38, 39]}
# owner 18/11 ~22:55Z (FIGURE_GATE A0 REFERENCES): royal ranks incl. Thai hau = 3 images; image 3 = royal-yellow swatch TdwDfOyVNR
TH_SWATCH=" Image 3 is only a colour reference for the royal yellow, never copy anything but its colour; the Empress Dowager's yellow is that royal yellow in its deep antique-gold, subdued shade as the colour rule says."
def _pose(item,hk,right):
    return f" Pose: calm standing pose; she holds {item} in a contrasting colour, not the robe colour, the item held below the chin, the hand really gripping it, the whole face fully visible. Her hands interact naturally with the item (gently presenting, turning or touching it), lively and natural, while her head stays up facing the viewer, eyes open, lips closed, never looking down. Her hands and body: {low_hand(hk,right)}."
CLOSE=" Every hairpin is inserted into the hair pointing upward or backward with dangles hanging down, no hairpin horizontal or sticking out to the side. Luminous smooth porcelain skin, bare clean forehead with no forehead mark and no flower mark, eyes open, floor-length robe, only slipper toe tips peeking under the hem, no train, no cup, nothing covering the face."
EMB_NOPH="No phoenix anywhere on the robe or in the hair: only flowers, birds, butterflies or other motifs. All flowers, birds and butterflies are fine silk-thread embroidery stitched directly into the fabric, flat and integrated with the cloth, following its folds, not appliqué, not pasted patches, not raised. "
# Nu de: per person crown/shoulder variety (owner: every person her OWN robe and crown; front tassels vary; shoulder piece stiff + short, pointed or not)
NUDE_VAR=[("only five short bead tassels hanging at the front of the crown to the forehead","slightly pointed outward"),
("one full row of bead tassels across the front of the crown, the outer ones short and the middle ones longer, all ending at the forehead","not pointed, squared and short"),
("seven bead tassels at the front of the crown, graduated in length, ending at the forehead","slightly pointed outward")]
# ---------- NỮ ĐẾ OWN PROMPT (N1 round 10, owner ~22:40Z, brief nude-r10 JOB 1): same sentence structure / length / wording style as the approved Hoàng hậu t8 prompt, her OWN marks: dragons only, STIFF SHORT shoulder piece, more majestic, woman's robe. Options via --nudeopt A|B|C|D (default A). Replaces the old (longer, NEVER/hex-heavy) --state nude text. ----------
# N4 nude-mass PHASE 1a: FIGURE_GATE H NỮ ĐẾ list (1..10), one item per person, neighbours (+-8) differ, never her own t8 item/kind (c06 #5 fan, c25 #4 ruyi unchanged)
NUDE_LIST=[('an imperial jade seal (ngọc tỷ) on a yellow silk cord', 'one'), ('a gold dragon-headed sceptre', 'one'), ('an imperial edict scroll on yellow silk with gold rollers', 'scroll'), ('a gold-and-jade ruyi with a dragon', 'one'), ('a gold dragon-framed round fan', 'two'), ('a gold dragon-handled hand mirror', 'mirror'), ('a jade tablet (hốt) edged in gold', 'two'), ('a yellow-silk folding fan with gold dragon ribs', 'ffan'), ('a small gilded dragon censer', 'one'), ('a gold-mounted jade dragon-ring pendant on a yellow cord', 'dangle'),
("a gold dragon hairpin with jade dangles, slim and palm-length, held between her fingers, never a sceptre","dangle"),
("a dragon-embroidered silk ball (tú cầu) with jade tassels, a round stuffed ball held in the palm or by its cord, no handle","dangle"),
("a white-jade flute with gold dragon bands","two"),
("a closed dragon-embroidered silk parasol with a jade handle","one"),
("a poetry book bound in dragon-embroidered silk","two"),
("a small pipa lute inlaid with gold dragons","two"),
("a small hand-held table screen of dragon-embroidered silk in a jade frame","two"),
("a gold dragon-framed palace lantern with jade tassels","two"),
("a calligraphy brush with a jade shaft and a gold dragon cap","one"),
("a gold-mounted jade tiger tally (hổ phù) on a silk cord","dangle"),
("an openwork gold dragon incense ball","dangle"),
("a hand warmer of gold carved with dragons","two"),
("a jade walking staff with a gold dragon head","one"),
("a small imperial-jade mountain carving on a gold dragon stand","two"),
("a carved imperial-jade crane on a gold dragon stand","two")]
# E11 (owner Lượt 583/585, IT1): +15 items appended (the first 10 unchanged, same order) -> 25; {age: 5 indices}, 25 different items per rank, adjacent ranks (t1..t8, Nữ đế, Thái hậu) never share an item kind at one age. Pick: LIST[AGE_DICT[age][(n-1)%5]].
NUDE_AGE={"a18": [11, 0, 17, 7, 12], "a26": [15, 14, 1, 10, 13], "a36": [23, 6, 5, 20, 18], "a51": [16, 3, 8, 9, 19], "a65": [2, 22, 4, 24, 21]}
NUDE_PICK={'c01': 1, 'c02': 2, 'c03': 3, 'c04': 4, 'c05': 6, 'c06': 5, 'c07': 7, 'c08': 8, 'c09': 9, 'c10': 10, 'c11': 1, 'c12': 2, 'c13': 3, 'c14': 4, 'c15': 6, 'c16': 7, 'c17': 5, 'c18': 8, 'c19': 9, 'c20': 10, 'c21': 1, 'c22': 2, 'c23': 3, 'c24': 6, 'c25': 4, 'c26': 5, 'c27': 7, 'c28': 9, 'c29': 8, 'c30': 10, 'c31': 1, 'c32': 2}
NUDE_ITEM={c:NUDE_LIST[k-1] for c,k in NUDE_PICK.items()}
# N4 PHASE 1b: option per person spread evenly A,B,C,D,A,... (c01 A, c02 B, ...); `--nudeopt auto` uses it; explicit A|B|C|D still works
NUDE_OPTMAP={"c%02d"%n:"ABCD"[(n-1)%4] for n in range(1,33)}
NUDE_PICK.update({"m%02d"%n:(n-1)%10+1 for n in range(1,53)}); NUDE_ITEM.update({"m%02d"%n:NUDE_LIST[(n-1)%10] for n in range(1,53)}); NUDE_OPTMAP.update({"m%02d"%n:"ABCD"[(n-1)%4] for n in range(1,53)})   # N5d item 5: maids (fallback item only; age_item picks)
NUDE_OPT={
"A":dict(sec="deep wine-crimson",secrule="a deep, quiet wine-crimson like #7E2A33",sh="a STIFF, SHORT, structured shoulder piece (cầu vai cứng) of gold brocade edged with pearls over each shoulder, slightly pointed outward",tas="a row of bead tassels (lưu) hanging in front from the rim of the crown to the forehead, ending above the eyebrows",crown=None),
"B":dict(sec="black",secrule="black silk richly embroidered with gold thread (the yellow clearly more than the black)",sh="a STIFF, SHORT, squared structured shoulder piece (cầu vai cứng) of gold brocade edged with pearls over each shoulder, set firmly across the shoulder line",tas="a row of bead tassels (lưu) hanging in front from the rim of the crown to the forehead, ending above the eyebrows",crown=None),
"C":dict(sec=None,secrule=None,sh="a STIFF, SHORT, structured shoulder piece (cầu vai cứng) of gold brocade edged with pearls over each shoulder, slightly pointed outward",tas="a row of bead tassels (lưu) hanging in front from the rim of the crown to the forehead, ending above the eyebrows",crown=None),
"D":dict(sec="deep wine-crimson",secrule="a deep, quiet wine-crimson like #7E2A33",sh="a STIFF, SHORT, structured shoulder piece (cầu vai cứng) of gold brocade edged with pearls over each shoulder, rising a little at the tip, with a high upright standing collar of gold brocade at the throat",tas="only five bead tassels (lưu) hanging in front from the rim of the crown to the forehead, the outer ones short and the middle ones longer, ending above the eyebrows",crown=None)}
NUDE_OPTSEL="A"
# N3b (owner 00:12Z 19/11; colour canon overwrite 00:10Z real: GAME COLOUR = sheet5 tone level, medium saturation + medium lightness, NO trầm/subdued wording): fur ONLY as a trim band round the sleeve edge/cuff + collar, sleeve stays embroidered fabric. --bdopt 1 jade-teal, 2 sapphire-blue (only with --state bd6)
BDOPT=None
BD_OLDCOL="a RICH, deep, saturated teal-green silk with real colour depth, like deep jade or peacock teal (full-bodied and vivid but refined, not neon, not garish, never pale, never washed-out, never silvery or greyed)"
BD_OPT={"1":("jade-green silk like #4E9C86, a clear medium jade with medium saturation and medium lightness, fresh but never glaring, never dark, never greyed","jade-green thread","an embroidered jade-green pearl-edged cape/stole","a clear medium jade-green like #4E9C86 (a deeper jade like #3C8470 in the inner robe and linings)","her signature colour"),
"2":("sapphire-blue silk like #4F78B4, a clear medium sapphire with medium saturation and medium lightness, fresh but never glaring, never dark, never greyed","sapphire-blue thread","an embroidered sapphire-blue pearl-edged cape/stole","a clear medium sapphire-blue like #4F78B4 (a deeper blue like #3E619A in the inner robe and linings)","her main colour")}
BD_FURSLEEVE="a thick soft white fur trim band running all along the edge of the wide sleeve opening, all the way round each cuff (a broad fur band at the sleeve edge only, NOT a full fur sleeve), and a fur collar, the sleeves themselves being the same embroidered silk as the robe with no fur on them"
def bd_opt(t,o):
    c,th,cape,rend,sig=BD_OPT[o]
    for a,b in ((BD_OLDCOL,c),("tone-on-tone teal-green thread",th),("an embroidered soft teal-green pearl-edged cape/stole",cape),("a slim white fur edge on the collar and cuffs",BD_FURSLEEVE)): assert t.count(a)==1,a; t=t.replace(a,b)
    i=t.index(" COLOUR RULE:"); j=t.index(" Hair:")
    t=t[:i]+f" COLOUR RULE: all colours fresh, clear and luminous, never dusty or greyed; {sig} is the main colour of the robe, sleeve linings and any cape, rendered as {rend}; the fur is ivory-white; gold as thin accents on the borders; soft coral and soft turquoise as tiny accents only."+t[j:]
    return t
# N3 r11 (owner ~23:33Z): ONE splendid imperial phoenix-and-dragon crown (dragon in the centre, a phoenix at each side), NO flowers on the crown or hairpins (the old crown came from the HEAD table, which has flowers); bead fringe (tas) stays per option
NUDE_CROWN="one splendid imperial gold phoenix-and-dragon crown: a large gold dragon with a pearl in its claws rising from the centre of a tall gold crown band, a gold phoenix with raised wings on each side of the dragon, set with rubies, pearls and kingfisher-blue inlay, pure gold metalwork with no flowers and no flower ornaments anywhere on the crown or the hairpins, and a few gold hairpins with slim gold-and-pearl dangles at the sides"
# Lượt 397 (owner: c17 and c06 have the SAME dragon-phoenix crown): the Nữ đế crown is NOT pinned to one design. NUDE_CROWNS = 6 described variants (variant 0 = the approved NUDE_CROWN, unchanged);
# nude3 picks one per person by index (person number mod 6), so neighbours and any two people differ. Common tail (no flowers, gold hairpins with dangles) kept in every variant.
_CT=", pure gold metalwork with no flowers and no flower ornaments anywhere on the crown or the hairpins, and a few gold hairpins with slim gold-and-pearl dangles at the sides"
NUDE_CROWNS=[NUDE_CROWN,
 "one splendid imperial gold crown of TWO coiled gold dragons facing each other over a large central pearl on a tall gold crown band, gold cloud scrolls rising behind them, set with rubies, pearls and kingfisher-blue inlay"+_CT,
 "one splendid tall imperial gold crown topped by a single large gold dragon head with its body curling down both sides of the crown band, a pearl in its jaws, set with jade, pearls and kingfisher-blue inlay"+_CT,
 "one splendid imperial gold crown with a great gold phoenix rising from the centre of a tall crown band, its wings spread high, flanked by two small gold dragons, set with rubies, pearls and jade inlay"+_CT,
 "one splendid tall imperial gold crown of three rising tiers of gold filigree clouds with a gold dragon holding a pearl at the summit, pearls hanging along every tier, set with rubies and kingfisher-blue inlay"+_CT,
 "one splendid broad imperial gold crown band set all around with small gold dragons and a very large pearl at the front, tall gold phoenix plumes rising at the back and sides, set with rubies, pearls and jade inlay"+_CT]
def build_nude_own(c,face,right):
    o=NUDE_OPT[NUDE_OPTSEL]; item,hk=age_item(c,"nude",*NUDE_ITEM[c]); pal,_=DATA[c]; m,m2=ORIG1[c]
    sec=o["sec"] or m.split(" silk")[0]; secrule=o["secrule"] or None
    if AGE in ("a51","a65") and sec=="black": sec="deep midnight-navy"; secrule="black silk richly embroidered with gold thread (the yellow clearly more than the black)".replace("black silk","deep midnight-navy silk").replace("the black","the navy")   # N4 1c: ELDER COLOURS never black/brown
    crown=o["crown"] or NUDE_CROWN
    s=PRE+f" An imperial consort, the Female Emperor (Nữ đế), the highest rank of all. Her face: {face}."+IDENT+" "+AGE_TXT[AGE]
    s+=(f" Outfit (the Female Emperor (Nữ đế), equal to the Empress in colour but clearly more majestic, and different in design from the Empress's robe): a woman's imperial ceremonial dragon robe of golden yellow silk mixed with {sec}, richly embroidered on the chest, shoulders and wide sleeves with large dragons, peonies and clouds in gold and kingfisher-blue silk thread (far denser and richer embroidery than any other rank), over it a long ceremonial silk mantle falling from the shoulders to the floor, edged with a broad band of gold brocade and pearls, {o['sh']}, many long strands of pearls and jade across the chest, a jade-and-gold belt with long tassels and jade pendants, floor-length robe, only slipper toe tips peeking under the hem, slim tall silhouette; the GRANDEST headdress of all: a FULL tall imperial dragon crown, clearly taller and wider than the Empress's crown, {crown}, and {o['tas']}, the bare forehead clean under them; the most majestic outfit of all, clearly grander than every other rank.")
    if secrule: second=f"{secrule} is the second colour (collar, inner robe, wide borders and a few panels)"; keep=""
    else: second="her colour is the second colour (collar, inner robe, wide borders and a few panels)"; keep=f"her ORIGINAL robe colour is kept exactly as in image 1 (her first reference): {m}, with {m2} in the linings; "
    s+=f" COLOUR RULE: all colours fresh, clear and luminous, never dusty or greyed; {keep}the royal golden yellow is the DOMINANT colour of the robe, mantle, sleeves and skirt (more than half of everything visible), {second}; the yellow is {YEL_NEW}; the crown, hairpin and jewellery gold in the same 18K tone; gold only as thin accents on the borders; NOT an all-yellow robe."
    s+=" The dragon is the main embroidered motif, larger and more prominent than the flowers."
    s+=" All flowers, clouds and dragons are fine silk-thread embroidery stitched directly into the fabric, flat and integrated with the cloth, following its folds, not appliqué, not pasted patches, not raised. "+FAB
    return s+_pose(item,hk,right)+CLOSE+END
# ---------- N5d item 4: --state ty1..ty8 (trung y) and --state cold (lãnh cung), consorts cNN and maids mNN, all 5 ages ----------
# RE-MAKE MODE (FIGURE_GATE A0): image 1 = her live picture of that tier+age (face + figure), image 2 = the style image (two approved portraits). Design = the approved maid-ty-m09 v2 recipe (dev/handover/reports/fig-cutout-clean/PROMPT_TEMPLATE.txt:
# DESIGN + HAIR sentences verbatim; its "like figure number COLNO of reference 2" is dropped: no sheet image in this builder). Colour per tier = FIGURE_GATE C8 [OD:L392] = jty.js TY_COL.
# a51/a65: owner d0f31d3 (no switch): a DEEPER shade of the SAME colour, same hue family (AGE_TXT's generic "pink becomes deep rose-plum" is overridden by this sentence).
# Cold = the OLD lãnh cung outfit sentence copied verbatim from main dev/figwork/jobs.json N-cNN-tcold (+ gp.py B: robe hanging straight and calm, opaque). Held item: ty N -> the tN rank cell of item_age.py, cold -> "lanh" cell.
TY_COLOUR={1:"ivory",2:"pale sage-green",3:"pale blue",4:"pale powder-pink",5:"pale lavender-purple",6:"pale rose-red",7:"pale amber-orange",8:"pale yellow"}
TY_HAIR=" HAIR: neat bun with soft strands; ONE small gold hairpin set close against the side of the bun with a short pearl bead tassel hanging down along the hair; the hairpin must lie within the hair outline: NO stick or rod sticking out sideways beyond the hair, no flower."
COLD_OUTFIT="Outfit (the cold palace, ONE plain outfit identical for everyone): a plain UNDYED pale natural white coarse linen robe with a simple cross collar and a plain linen sash, NO embroidery, NO pattern, NO colour, NO jewellery, NO gold; hair in a simple neat low bun held by ONE plain wooden hairpin, no flowers, no ornaments; clean, neat and tidy, never ragged, torn, dirty or poor-looking; she is still very beautiful, graceful and dignified."
COLD_FAB=" The linen robe hangs straight and calm, the sleeves and sash fall naturally with NO swirling and NO flying fabric; all fabrics opaque."
# TY0 fixes (ROOT-39 order 19/11, 2K sample faults 3-6): face sentence = FIGURE_GATE D.1 "Face = the person's OWN face ... never m09's face" + l.518 "face and hair only — do NOT copy its outfit or sleeves";
# colour negatives = the approved yellow wording "not pale cream, beige or khaki" / "not beige/tan/ochre" (b10 prompts); a65 one step deeper than a51 (AGE_TXT a65 "clearly older than her 51-year-old self" + "DEEPER, DARKER").
TYC_FACE=" Her face is HER OWN face from her first reference image (face and hair only — do NOT copy its outfit or sleeves), never a face from the style reference image."
TYC_HUE=", still clearly {col} at a glance, never khaki, sand, beige or tan"   # {col} = the hue WITHOUT "pale" (fix1 round 2: "pale" pulled a65 back to pastel)
_A51EX=AGE_TXT["a51"][AGE_TXT["a51"].index("(e.g. pink"):AGE_TXT["a51"].index("; the royal yellow")]+")"   # verbatim a51 example list: a65 at least this deep
def _tyhue(col): return "pearl ivory (never yellowed)" if col=="ivory" else col.replace("pale ","",1)   # ty1: pearl ivory = approved palette word (b10 v2 lists)
# TY0 fix2 (owner Lượt 229b: c06 cold a36 / ty4 a65 face + hair differ from her live picture; ROOT-40 approved 03:52Z). Cause: identity line kept only "hairstyle colour",
# the outfit text prescribed a NEW bun (COLD_OUTFIT "simple neat low bun", TY_HAIR "neat bun with soft strands" -> bangs), CLOSE forbade her horizontal pin, consort face WORDS overrode image 2.
# Fix = the owner-approved kc2k K3 re-make sentence (reports/kc2k-K3.md l.44, "young" dropped for all ages); hair = "her own hairstyle exactly as in her first reference" (build.py t1-t3 hair wording).
# Source numbering is pre-_reorder_refs: "first reference" here = image 2 (her picture) in the output. Style image goes as Magnific type "style" (as kc2k).
TYC_REMAKE=(" Redraw this exact figure as a sharp, high-detail 2K full-body standing figure: the SAME woman as in the first reference image, same face and facial features, same hairstyle and hair colour, same proportions, whole figure from top of head to feet centered with margin around it."
 " Use the style reference image ONLY as a style reference for skin rendering, drawing style, fabric texture and embroidery; do not copy any of its people, faces, clothes or colours."
 " Her face and her hairstyle come ONLY from her first reference image; change only her outfit, her held item, her pose and her age as described below.")
TYC_COLD_HAIR_OLD="hair in a simple neat low bun held by ONE plain wooden hairpin"
TYC_COLD_HAIR="her own hairstyle exactly as in her first reference, held by ONE plain wooden hairpin"
TYC_TY_HAIR=" Hair: her own hairstyle exactly as in her first reference, with ONE small gold hairpin with a short pearl bead tassel; no flower."
TYC_PIN_RULE=" Every hairpin is inserted into the hair pointing upward or backward with dangles hanging down, no hairpin horizontal or sticking out to the side."
TYC_PRE_FR=" body and face frontal, standing squarely facing the viewer, no turn."
TYC_PRE_RENDER="exactly matching the rendering of the reference portraits"
def build_ty_cold(c,state):
    n=int(c[1:]); right=(n%2==1); pal,face=DATA[c]
    who="A palace maid" if c[0]=="m" else "An imperial consort"
    s=PRE+f" {who}."+TYC_REMAKE+" "+AGE_TXT[AGE]   # TY0 fix2 (ROOT-40 GO 03:52Z): kc2k K3 re-make sentence; NO consort face words, NO new hairstyle. AGE_TXT verbatim (rule 0); its generic a51/a65 colour examples are overridden by this state's own COLOUR RULE below (same hue family, no switch)
    if state=="cold":
        item,hk=age_item(c,"lanh","a plain wooden bowl","two")
        s+=" "+COLD_OUTFIT.replace(TYC_COLD_HAIR_OLD,TYC_COLD_HAIR,1)+" COLOUR RULE: the linen stays the same undyed pale natural white at every age (not beige, tan, khaki or cream), never dyed, never deeper, no other colour anywhere; this replaces the colour examples above."+COLD_FAB
    else:
        N=int(state[2:]); col=TY_COLOUR[N]
        item,hk=age_item(c,"t%d"%N,"an embroidered handkerchief","one",pet=False)   # trung y: no pet (rank outfit only)
        s+=f" Outfit (her trung y, the plain inner robe worn alone, no outer garment): a plain {col} silk trung y inner robe (simple crossed collar, tied sash, long skirt, no embroidery, no outer layer), {col}, matte soft silk with gentle folds, no gloss."+TYC_TY_HAIR
        if AGE=="a51": s+=f" COLOUR RULE: the whole trung y is a deeper, more muted shade of the same {col}, same hue family (rich and dignified, never bright, never pastel, never black or brown)"+TYC_HUE.format(col=_tyhue(col))+"; no other colour anywhere; this replaces the colour examples above."
        elif AGE=="a65": s+=f" COLOUR RULE: the whole trung y is an even deeper, more muted shade of the same {col} than at 51 (DEEPER than her 51-year-old trung y, never lighter or paler, at least as deep as at 51 {_A51EX}), same hue family (rich and dignified, never bright, never pastel, never black or brown)"+TYC_HUE.format(col=_tyhue(col))+"; no other colour anywhere; this replaces the colour examples above."
        else: s+=f" COLOUR RULE: the whole trung y, collar and sash are one plain {col}, as soft and pale as the rank-colour portrait frame; no other colour anywhere."
        s+=" Any flower or pattern on the fabric would be real silk embroidery, never printed or pasted-on."
    s=s+_pose(item,hk,right)+CLOSE+END   # TYC_PIN_RULE is dropped in __main__ AFTER spec5pose (it anchors on that sentence)
    assert s.count(TYC_PRE_FR)>=1   # F4b-4 (ROOT-40): angle words now come ONLY from the final __main__ pass (Nữ đế A header + HH B 3/4), same as every path; was MAMA_ANGLE (invented)   # ANGLE LAW (owner Lượt 229 A), same sentence as build_mama
    assert s.count(TYC_PRE_RENDER)==0   # C1 (Lượt 779): PRE has no rendering clause any more (style = master M01/M02 only); was renamed here to "...of the style reference image"   # PRE's "reference portraits" = the style faces -> name it style only
    return s
# ---------- N5d item 5: MAID ladder --state tm0..tm4 (+ nhat / mama PENDING). Names (FIGURE_GATE CUNG NỮ LADDER, Lượt 174, owner "174 đúng rồi"):
#   tm0 = cung nữ thô sử | tm1 = tam đẳng (the CURRENT 'Cung nữ') | tm2 = nhị đẳng (the CURRENT 'Đại cung nữ', never say đại cung nữ) | nhất đẳng = NEW outfit, NO tm id, PENDING (owner has not picked the sheet) |
#   tm3 = chưởng sự cô cô | tm4 = nữ quan (always red #99443F) | ma ma = PENDING (the NPC outfit wording exists nowhere in the repo, only the live picture fig-mama-k01).
# Wording is COPIED, never invented: tm1 = the m01 tam đẳng re-make prompt (maids-M1.md); tm2/tm3/tm4 = main dev/figwork/maid/mjobs.py mout() k=2/3/4 (tm3 colour = LIGHTER purple, owner "đỡ đậm hơn"; tm4 colour = the live Nữ quan red);
# tm0 = THÔ SỬ design 842754fa (FIGURE_GATE Lượt 172). Sleeves: tm0/tm1 ~1 hand-span, tm2 ~2, tm3 ~3 (owner ladder); tm4 as live. Each maid keeps HER OWN hairstyle at every rank (owner ~01:55Z); the ranks differ by hairpins.
# Re-make mode: image 1 = her live maid picture, image 2 = the style image (two approved portraits). Items: item_age.py tmK cell.
NHAT_DANG_PENDING=None   # PENDING: nhất đẳng outfit wording. The owner has NOT chosen the reference sheet from her Phượng Lệnh art yet; do not write wording here until she does.
# MA MA (MM1, owner GO 19/11 ~03:15Z via ROOT-39, verbatim: "Mama 18 tuoi gi dau ma mac do cung nu la sao" -> ma ma = the BROWN a36/a51 live picture of the Ma ma NPC fig-mama-k01; the pink a18 is a maid outfit, ignored).
# WORDING IS WORDED FROM THE LIVE a36/a51 PICTURE (no earlier prompt text exists anywhere in the repo or in Magnific: owner-ordered, not copied). Colours by age (FIGURE_GATE l.496): a51/a65 = the NPC's brown; a36 = normal game colour (her palette main).
# Image 3 = the live fig-mama-k01 a36 picture, COSTUME only (cut, layers, embroidery, accessories), never its face, pose or (at a36) its colour.
MAMA_REF={"name":"live fig-mama-k01-a36 = COSTUME only (cut, layers, embroidery, accessories), never its face/pose","magnific_id":"(upload the CDN file on the current account)","url":"https://ctm-img.victoria-tntt.workers.dev/img/fig-mama-k01-a36.webp"}
MAMA_PENDING=None        # kept for old readers: wording now exists in build_mama()
MAMA_FLOWERS=[("peony","deep rose"),("plum blossom","white"),("lotus","pale pink"),("orchid","lilac"),("chrysanthemum","golden yellow"),("camellia","crimson"),("magnolia","ivory"),("peach blossom","soft coral")]   # per-person hair flower (owner Luot 229: every ma ma had the same flower + colour): kind + colour rotate by person number
MAMA_HAIR=" Her hair, hairpins and hair flower come ONLY from the identity reference and this text; the style reference image must not influence her hair."
MAMA_ANGLE="her body stands with the shoulders slightly turned (between frontal and three-quarter, as in the approved Nu de A picture), the whole face clearly visible and towards the viewer; never a dead-frontal ID-photo stance, never the body sideways."   # owner Luot 229 ANGLE LAW
MAMA_IMG3=" Image 3 is only a costume reference for the cut, layers, embroidery and accessories of the outfit; never copy its face, hair, pose or background; its front layer has ONE panel, but the text above says TWO front panels (hai tà): follow the text for the front layer."
# Lượt 440 (owner: she sees almost everybody facing RIGHT, nobody LEFT; Lượt 321 point 4 "ANGLES: 7 + 7 mirrored = 14, rotated per person ANG[(t-1+(n-1))%14]"): the 14 STANDING ANGLES = the 7 angle sentences of dev/art/owner-copy/mk_ranks_v3.py ANG (angle part only) + their 7 mirrored versions (its _mir).
# Only change vs that file: the two "walking STRAIGHT TOWARD the viewer" angles (3 and 10) are written as a frontal stance with the weight on one foot (the pose text of the rank already carries the action, and ranks t6+/a51+ never walk or swirl).
# Head turns WITH the body (HEAD-BODY law); every angle is frontal or three-quarter, never back-turned, never profile.
# E12 (BW6): entries 8 and 12 were word-identical to 5 and 1 -> rewritten with approved words: 'body turned slightly three-quarters to the {s}' (_TA_NF, approved HH words) + 'the whole face clearly visible and towards the viewer' (MAMA_ANGLE, approved Nữ đế A picture).
# ROOT-68 / owner 20/11 ~07:50Z ("không có thấy ai đứng nghiêng về bên trái cả"), RANK8-B: LEFT/RIGHT were read in HER frame by some sentences and the viewer's by others
# (idx 2 and 9 even said "viewer's RIGHT" + "her left shoulder nearer" = contradictory) -> the model drew almost everyone turned the same way. Now EVERY side word = the PICTURE's side
# (where her chest and face point) + which shoulder (by picture side) is nearer. Same 14 slots, same visual class per index (ang_class unchanged -> E1/E12 plans unchanged). Next gens only.
ANG14=['FULLY FRONTAL, her body, shoulders and face squarely facing the viewer, no turn', "a SLIGHT turn toward the LEFT side of the picture (about 15 degrees): her chest and face point a little toward the left edge of the picture, the shoulder on the picture's right side slightly nearer the viewer, body almost frontal, face toward the viewer",
"a clear THREE-QUARTER view toward the RIGHT side of the picture, NOT frontal: her whole body, shoulders, hips and face turned about 45 degrees so that her chest and face point toward the right edge of the picture, the shoulder on the picture's left side nearer the viewer, face fully visible", 'FULLY FRONTAL, her body, shoulders and face squarely facing the viewer, her weight resting on her RIGHT foot', "a clear THREE-QUARTER view toward the LEFT side of the picture, NOT frontal: her whole body, shoulders, hips and face turned about 45 degrees so that her chest and face point toward the left edge of the picture, the shoulder on the picture's right side nearer the viewer, face fully visible (never side view)",
"a SLIGHT turn toward the RIGHT side of the picture (about 15 degrees): her chest and face point a little toward the right edge of the picture, the shoulder on the picture's left side slightly nearer the viewer, body almost frontal, face toward the viewer",
"a SLIGHT turn toward the LEFT side of the picture (about 15 degrees): her chest and face point a little toward the left edge of the picture, the shoulder on the picture's right side slightly nearer the viewer, body almost frontal, the whole face toward the viewer", 'FULLY FRONTAL, her body, shoulders and face squarely facing the viewer, no turn, mirrored: her weight and the item on the LEFT side of the picture', "a SLIGHT turn toward the RIGHT side of the picture (about 15 degrees): her chest and face point a little toward the right edge of the picture, the shoulder on the picture's left side slightly nearer the viewer, the whole face clearly visible and towards the viewer",
"a clear THREE-QUARTER view toward the LEFT side of the picture, NOT frontal: her whole body, shoulders, hips and face turned about 45 degrees so that her chest and face point toward the left edge of the picture, the shoulder on the picture's right side nearer the viewer, face fully visible", 'FULLY FRONTAL, her body, shoulders and face squarely facing the viewer, her weight resting on her LEFT foot', "a clear THREE-QUARTER view toward the RIGHT side of the picture, NOT frontal: her whole body, shoulders, hips and face turned about 45 degrees so that her chest and face point toward the right edge of the picture, the shoulder on the picture's left side nearer the viewer, face fully visible (never side view)",
"a SLIGHT turn toward the LEFT side of the picture (about 15 degrees): her chest and face point a little toward the left edge of the picture, the shoulder on the picture's right side slightly nearer the viewer, the whole face clearly visible and towards the viewer",
"a SLIGHT turn toward the RIGHT side of the picture (about 15 degrees): her chest and face point a little toward the right edge of the picture, the shoulder on the picture's left side slightly nearer the viewer, body almost frontal, the whole face toward the viewer"]
def ang_for(c,t):
    n=int(re.sub(r"\D","",c) or 0); return ANG14[(t-1+(n-1))%14]
# G43 (owner L1608 21/11, verbatim: "Sửa lại là cung nữ là sẽ không có đeo ngọc bội, nhưng mà đổi lại thì cung nữ có thể đeo túi thơm nha."): maids (tm1 tam đẳng, tm2 nhị đẳng, ma ma) wear NO jade pendant -> a small embroidered fragrant sachet (túi thơm) at the sash; only that change (A39). check_store G43 fails a maid prompt with a jade pendant.
MAMA_DRAWN={"m01"}   # ma ma pictures already drawn/approved: no ANGLE sentence, output byte-identical
def build_mama(c):
    n=int(re.sub(r"\D","",c) or 0); right=(n%2==1); pal,face=DATA[c]; main=pal.split(" and ")[0]; elder=AGE in ("a51","a65")   # 19/11 Lượt 407 (ROOT-47): ma ma for EVERY person id (c01-c32, m01-m52, p01-p03, bd1-3, nc1-3), not only m*
    fw=(f" Her face: {face}." if face else " Her face and facial features exactly as in the identity reference image.")
    s=PRE+" A palace ma ma (ma ma, a senior woman of the palace staff), dignified, gracious and still beautiful."+fw+MAID_IDENT+" "+AGE_TXT[AGE]
    fk,fc=MAMA_FLOWERS[(n-1)%len(MAMA_FLOWERS)]
    s+=(" Outfit (the ma ma costume, exactly the cut of image 3, never poor): a long robe of fine embroidered silk brocade with a subtle woven pattern; a sleeveless embroidered over-vest with a stand collar closed by a small knot button, with a band of gold-edged trim down the front, worn over a crossed-collar inner robe; wide layered sleeves hanging softly, each with a broad embroidered cuff band; a short front layer made of TWO separate long embroidered front panels (hai tà, never one single panel), one hanging down each side of the front from the waist, each with a gold-edged border, the centre front of the skirt showing between them, over a layered, softly pleated skirt with a band of flower embroidery along the hem; a wide silk sash tied in a bow at the waist; delicate cream-and-blush peony and plum-blossom embroidery over the vest, sleeves, panel and hem; hair exactly as in the identity reference image (her own bun and hairpins kept), and one small fresh "+fk+" in "+fc+" tucked beside the bun; soft slippers; the sleeves are wide, a palace ma ma's sleeves (never a consort's long trailing sleeves).")
    if elder:
        # owner Lượt 397 item 3 (FIGURE_GATE LAW #1): a51/a65 keep the person's OWN a36 colour, each age a deeper step of the same family ("darker does not mean the same shade"); the old brown a51/a65 stay as skins
        if AGE=="a51": step=f"a DEEPER, more muted, mature shade of her {main}: a deeper muted {main}, clearly darker and less fresh than at 36 but still clearly {main}"
        elif any(_w in main for _w in ("green","celadon","jade","teal","mint","sage","aqua")): step=f"an even DEEPER, dusky, older shade of her {main}: a deeper dusty {main}, clearly deeper and more muted than at 51 (each age its own deeper step, never the same shade), staying strictly in the same hue family as her {main}, never shifting to any other hue"   # BW5 (Lượt 624 J2 elder copy): pre-BW4 deeper wording; B19: the old green-grey words NOT restored (same words as the non-green a65 step)
        else:   # Lượt 407-fix (ROOT-47): a non-green person names ONLY her own colour family, deeper and older; no green example text (it drifted ivory/olive people to grey-green)
            _wh=(" (for ivory, cream or white: a soft warm muted ivory)" if any(_w in main for _w in ("ivory","cream","white","pearl")) else "")
            step=f"an even DEEPER, dusky, older shade of her {main}{_wh}: a deeper dusty {main}, clearly deeper and more muted than at 51 (each age its own deeper step, never the same shade), staying strictly in the same hue family as her {main}, never shifting to any other hue"
        s+=(f" COLOUR RULE: take ONLY the cut from image 3; RECOLOUR the whole costume to her own colour {main} (the same colour family as her 36-year-old self) at "+step+", never brown, never black, never grey; with the embroidery in a lighter tone of the same colour and one soft gold accent; do not copy the brown of image 3.")
    else:
        s+=(f" COLOUR RULE: take ONLY the cut from image 3; RECOLOUR the whole costume to her colour {main}, a soft, gentle, held-back medium tone (clear but quiet, never fresh or bright, never pale or pastel-washed, never dark, never grey, never brown), with the embroidery in a lighter tone of the same colour and one soft gold accent; do not copy the brown of image 3.")
    if "--twocol" in sys.argv:   # owner Lượt 499 / ART_RULES B15 (ONE ma ma sample first): APPROVED two-colour sentence copied VERBATIM from dev/art/owner-copy/pr_cl_t2_V2.txt; only the two colour names are slot words. Opt-in flag -> every other output byte-identical.
        sec=sys.argv[sys.argv.index("--twocol")+1]
        if c in globals().get("M_COLS",{}):   # BW4 (owner Lượt 603): owner-table people: the same names + hexes as every other mode
            _mc=M_COLS[c]; main=f"{_mc[0]} like {_mc[1]}"
            if sec in (_mc[2],"auto"): sec=f"{_mc[2]} like {_mc[3]}"
        s+=f" TWO-COLOUR RULE: the whole outfit uses EXACTLY TWO colours that clearly interact: the MAIN colour {main} and the SECONDARY colour {sec}, the secondary clearly visible in large areas (inner robe or skirt, wide borders, sash, cuffs, linings), never a single flat colour all over; gold or silver only as thin accents, never a third colour."
    s+=" Any flower or pattern on the fabric is fine silk-thread embroidery stitched directly into the fabric, flat, following the folds, never printed or pasted-on."
    item,hk=age_item(c,"mama","an embroidered handkerchief","one")
    if c not in MAMA_DRAWN: s+=" ANGLE: "+ang_for(c,8)+"; her head turns together with her shoulders and body, never a frontal head on a turned body."   # Lượt 440
    s+=MAMA_HAIR+_pose(item,hk,right)+CLOSE
    _fr=" body and face frontal, standing squarely facing the viewer, no turn."
    assert s.count(_fr)>=1,"PRE frontal sentence"   # >=1: some item hand clauses (basket, vase...) end with the same phrase   # F4b-4 (ROOT-40): MAMA_ANGLE (invented) dropped -> the final __main__ angle pass gives the copied Nữ đế A / HH B wording, same as every path
    if "--noflower" in sys.argv:   # owner Lượt 520 / ART_RULES K15: ma ma wear NO hair flowers (only consorts). Opt-in flag: removes the flower wording + adds ONE negative sentence (ROOT-50 ruling A); every other output byte-identical.
        _fl=", and one small fresh "+fk+" in "+fc+" tucked beside the bun"; assert s.count(_fl)==1,"mama hair flower clause"; s=s.replace(_fl,"",1)
        assert s.count(MAMA_HAIR)==1,"MAMA_HAIR"; s=s.replace(MAMA_HAIR," Her hair and hairpins come ONLY from the identity reference and this text; the style reference image must not influence her hair. NO flowers in the hair (no fresh or silk flowers), only her hairpins.",1)   # + ROOT-50 ruling (A) 19/11: removal alone failed (gen copied the face ref's orchid, MMX3 c06) -> ONE added negative sentence
    if "--noflower" in sys.argv or "--oneref" in sys.argv:   # owner Lượt 543 ONE reference only (ROOT-50 19/11 18:34Z, same flags MMX3 uses): no costume image -> every "image 3" (= image 2 after --nostyle) costume pointer removed; the garment description words stay
        for _a,_b in ((" Outfit (the ma ma costume, exactly the cut of image 3, never poor):"," Outfit (the ma ma costume, never poor):"),
                      ("COLOUR RULE: take ONLY the cut from image 3; RECOLOUR the whole costume","COLOUR RULE: RECOLOUR the whole costume"),
                      ("; do not copy the brown of image 3.",".")):
            assert s.count(_a)==1,("mama one-ref slot",_a); s=s.replace(_a,_b,1)
        _h="hair exactly as in the identity reference image (her own bun and hairpins kept)"; assert s.count(_h)==1,"mama hair slot"
        s=s.replace(_h,"her own hair colour, ALL her hair pinned UP in a neat bun (chignon) with her hairpins",1)   # F11 (owner Lượt 583): ma ma = neat bun; the thiếu-nữ ref has long loose hair + ribbon
        _mh=" Her hair and hairpins come ONLY from the identity reference and this text; the style reference image must not influence her hair."; assert s.count(_mh)==1,"mama hair sentence"
        s=s.replace(_mh," HAIR: ALL her hair is pinned UP in a neat bun: NO long loose hair down her back or over her shoulders, NO ribbons in the hair.",1)
        assert "image 3" not in s,"mama one-ref: image 3 left"
        return s+END   # MAMA_IMG3 (the costume-image sentence; its "ONE panel" describes the old image, the text says TWO panels) dropped
    return s+MAMA_IMG3+END
IDENT_LAW="From the identity reference keep ONLY her face, facial features, hair COLOUR and signature colour family; do NOT copy poses, outfit, HAIRSTYLE, hair ornaments or accessories of the reference, dress her in the NEW outfit below."
IDENT_RX=re.compile(r"From the identity reference keep ONLY her face, facial features[^;]*; do NOT copy [^.;]*?hair ornaments or accessories(?: of the reference)?, dress her in the NEW outfit below\.")
MAID_IDENT=IDENT.replace("and hairstyle colour","her own hairstyle (the same at every rank) and hair colour",1)
TM_FADED=["faded indigo-blue","light indigo","earth brown"]   # B19 (owner Lượt 591; ROOT-51 -> BW4): "grey-blue" -> a soft real faded colour
TM_NAME={"tm0":"cung nữ thô sử","tm1":"tam đẳng cung nữ","tm2":"nhị đẳng cung nữ","tm3":"chưởng sự cô cô","tm4":"nữ quan"}
TM_TONE=" COLOUR TONE: the main colour is a soft, held-back medium tone: medium-soft saturation and medium lightness, clear but quiet, NOT fresh or bright, NOT pale, NOT washed-out, NOT pastel-faded, NOT dark, NOT grey, NOT glaring."   # BW4 B18: maids held back
# BW1 (owner Lượt 520, ART_RULES K15: only consorts wear hair flowers): tm1 'and a fresh flower' and tm2 'and small fresh flowers' removed from the hair clause (removal only, no new words); tm0/tm3/tm4 (nữ quan) had none. Ma ma: MMX3 --noflower.
TM_NOFLOWER=" NO flowers in the hair (no fresh or silk flowers), only her hairpins."   # verbatim = build_mama --noflower sentence (asserted below)
def build_maid(c,state):
    assert c[0]=="m" or c[0]=="c"; n=int(c[1:]); right=(n%2==1); pal,face=DATA[c]; main=pal.split(" and ")[0]; elder=AGE in ("a51","a65")
    fw=(f" Her face: {face}." if face else " Her face and facial features exactly as in the identity reference image.")
    k=int(state[2]); who={0:"A palace maid of the lowest rank (cung nu tho su)",1:"A palace maid (cung nu, tam dang)",2:"A senior palace maid (cung nu, nhi dang), clearly finer than an ordinary maid",3:"The palace mistress of servants (chuong su co co), a dignified senior lady with authority",4:"A female court official (nu quan), the most refined of all palace servants but still simpler than any imperial consort"}[k]
    s=PRE+f" {who}."+fw+MAID_IDENT+" "+AGE_TXT[AGE]
    if k==0:
        col=TM_FADED[n%3]
        s+=f" Outfit (cung nữ thô sử, the lowest palace maid rank, a palace uniform, clean and neat, never ragged): plain coarse cotton/hemp in one plain faded colour ({col}), a single-layer short crossed-collar jacket and a plain skirt to the ankle, a same-colour cloth sash, NO embroidery, no pattern, no jade, no tassel, no apron; sleeves about one hand-span wide, loose, never tight on the arm; hair in a simple bun with one wooden pin or a cloth tie, no flowers, no jewels."
        colr=f"the whole uniform is one plain faded {col}"
        tone=""
    elif k==1:
        s+=f" Outfit (a palace maid's uniform): a fine fresh {main} silk palace maid's uniform with visible delicate embroidery (floral borders on the layered collar, sleeves and hem, small embroidered flower motifs), crisp fabric folds, a decorative sash; hair in neat double buns with one or two elegant silver hairpins with small pearls; light makeup. Sleeves about one hand-span wide, a palace maid's sleeves (never a consort's long trailing wide sleeves)."
        colr=f"her main colour {main}"; tone=TM_TONE
    elif k==2:
        s+=f" Outfit (a senior palace maid, nhị đẳng): a fine silk ruqun in {main}, with woven brocade trim at collar, cuffs and hem, a layered half-sleeve brocade jacket (bijia) on top, an embroidered silk sash; neat double-loop buns with several silver and pearl hairpins; clearly finer than an ordinary maid. Sleeves about two hand-spans wide, a palace maid's sleeves (never a consort's long trailing wide sleeves)."
        colr=f"her main colour {main}"; tone=TM_TONE
    elif k==3:
        s+=" Outfit (the palace mistress of servants): a dignified long robe of rich silk in a LIGHTER, softer plum purple (still clearly the purple family, not dark, not deep), with subtle tone-on-tone woven pattern and neat embroidered borders, a brocade waist sash with a ring of brass keys and a small ledger pouch hanging at her waist; one gold hairpin and a small gold comb in her hair; an air of calm authority, mature and respected, still beautiful. Sleeves about three hand-spans wide."
        colr="the robe is a lighter, softer plum purple"; tone=""
    else:
        s+=" Outfit (a female court official, nữ quan): a formal court lady official's robe in the court-dress red (a medium-saturation, medium-lightness brick-crimson, close to hex #99443F), with a square embroidered rank badge (buzi) of a crane and clouds on the chest, a crossed collar (jiaoling) closing to the right, neat embroidered borders, a narrow jewelled belt; a clearly visible formal black gauze court official's headdress (small winged cap) with a gold ornament worn over her hair; refined and dignified, with much less gold and no phoenix crown, clearly below an imperial consort."
        colr="the robe is the court-dress red #99443F at every age"; tone=""
    if AGE in ("a36","a51","a65"):   # F11 (BW4): explicit bun at a36+; tm0-tm2 already say bun/buns, tm3/tm4 get it here
        if k==3: _h="one gold hairpin and a small gold comb in her hair"; assert s.count(_h)==1,"tm3 hair"; s=s.replace(_h,"ALL her hair swept UP into a neat bun (chignon), nothing loose down her back, with one gold hairpin and a small gold comb in the bun",1)
        if k==4: _h="with a gold ornament worn over her hair;"; assert s.count(_h)==1,"tm4 hair"; s=s.replace(_h,"with a gold ornament worn over her hair, which is ALL pinned UP in a neat bun under the cap (nothing loose down her back);",1)   # NOEAR (Lượt 1037): anchor was 'hair,' before ', jade earrings' was removed
    if k in (1,2,4): s+=TM_NOFLOWER   # K15 (owner Lượt 520; ROOT-50 19/11 18:24Z): cung nữ tm1/tm2 + nữ quan tm4, the ma ma --noflower sentence copied VERBATIM (removal alone fails: the gen copies the face ref's flower)
    if k in (0,4): s+=f" COLOUR RULE: {colr}, the same at every age, never deeper, never another colour; this replaces the colour examples above."
    elif elder: s+=f" COLOUR RULE: {colr} in a deeper, more muted shade of the SAME colour, same hue family (rich and dignified, never bright, never black or brown), no other main colour; this replaces the colour examples above."
    else: s+=f" COLOUR RULE: all colours clear, soft and held back, never fresh or bright, never dusty or grey; {colr}."+tone   # BW4 B18 (maids held back)
    s+=" Any flower or pattern on the fabric is fine silk-thread embroidery stitched directly into the fabric, flat, following the folds, never printed or pasted-on."
    item,hk=age_item(c,state,"an embroidered handkerchief","one")
    return s+_pose(item,hk,right)+CLOSE+END
def build_state(c,state,v="v0"):
    if state=="mama": return build_mama(c)
    if state=="nhat": raise SystemExit("PENDING: nhat dang (the owner has not chosen the reference sheet for the new outfit)")
    if re.fullmatch(r"tm[0-4]",state): return build_maid(c,state)
    if state=="cold" or re.fullmatch(r"ty[1-8]",state): return build_ty_cold(c,state)
    n=int(c[1:]) if c[0]=="c" else 0
    right=(n%2==1) if c[0]=="c" else (c=="nc")
    if state in ("nc1","nc6","bd1","bd6"):
        k=state[:2]; t=int(state[2]); pal,face=PDATA[k]
        s=PRE+f" A foreign princess who became an imperial consort ({PTALL[k]}). Her face: {face}."+IDENT+" "+AGE_TXT[AGE]
        if k=="nc":
            if t==1: o=("Outfit (rank-1 consort (Đáp ứng), the lowest consort rank, elegant, never poor, in the HOME costume of her country): a NEW outfit, a fitted short jacket with a stand collar of dusty teal-blue damask with fine delicate embroidered camellias at the collar, sleeves and hem, over a long softly pleated dusty-rose skirt with an embroidered hem band, a soft silk sash; a neat chignon with pretty silver flower hairpins (trâm) with small silver dangles, a fresh flower; little gold, silver is the metal of her people; rank readable by richness: modest but lovely, never poor")
            else: o=("Outfit (rank-6 noble consort (Quý phi), in the standard court consort robes like the other consorts of the palace, her own unique set): a NEW outfit, a HEAVY silk brocade court robe in SATURATED dusty teal-blue silk, embroidered with peonies and small birds in teal-blue and gold thread along the borders, an embroidered teal-blue pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels, with one slim silver camellia hairpin as the only mark of her homeland; more luxury than the rank below: rich gold-thread embroidery covering much of the robe, a pearl-edged collar trim, a few strands of pearls across the chest, elegant, NOT a pile of jewels")
        else:
            if t==1: o=("Outfit (rank-1 consort (Đáp ứng), the lowest consort rank, elegant, never poor, in the HOME costume of her country): a NEW outfit, a side-closing long robe of deep teal-green silk with a soft white fur edge at the collar and cuffs, fine delicate embroidered flowers and small steppe horses along the hem, a silk sash; hair in a smooth low knot at the back of the head with a jewelled fur-trimmed headband and several silver hairpins (trâm) with turquoise-and-coral dangles, the rest of the hair falling loose down her back, never a side braid, never a high bun; rank readable by richness: modest but lovely, never poor")
            else: o=("Outfit (rank-6 noble consort (Quý phi), in the standard court consort robes like the other consorts of the palace, her own unique set): a NEW outfit, a heavy silk brocade court robe in a RICH, deep, saturated teal-green silk with real colour depth, like deep jade or peacock teal (full-bodied and vivid but refined, not neon, not garish, never pale, never washed-out, never silvery or greyed), embroidered along the borders with peonies and small birds in tone-on-tone teal-green thread with a few stitches of rich ivory, warm gold and soft rose, every stitch woven INTO the weave of the cloth like real needlework, flat, following the folds and the cloth texture, never floating on top, never glowing, an embroidered soft teal-green pearl-edged cape/stole over the shoulders, gold-and-jade bracelets; tall chignon with ALL of her hair gathered up under the headdress, NO braids, NO side braid, no loose strands, crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels, with a few soft turquoise and pale coral bead strands in the hair, a slim white fur edge on the collar and cuffs and a small metal plaque on the belt as the only marks of her homeland; more luxury than the rank below: rich gold-thread embroidery covering much of the robe, a pearl-edged collar trim, a few strands of pearls across the chest, elegant, NOT a pile of jewels")
        s+=" "+o+"."
        s+=(f" COLOUR RULE: all colours rich, deep and full-bodied with good saturation, a harmonious refined palette, never washed-out, never pale, never silvery, never greyed, never neon, never garish; her signature colour {pal} is the main colour of the robe, sleeves and any cape, rendered as a deep saturated emerald-teal, as in her first reference; gold as thin accents on the borders; coral and turquoise as small clear accents." if state=="bd6" else f" COLOUR RULE: all colours fresh, clear and luminous, never dusty or greyed; her signature colour {pal} is the main colour of the robe, sleeves and any cape, as in her first reference; gold only as thin accents on the borders.")
        hair=" Hair: her own hairstyle as described in the outfit, with hairpins, "+("silver, pearls and fresh flowers, little gold. " if t==1 else "gold hairpins with dangles, rich like her rank. ")
        s+=hair+EMB_NOPH+(FAB_LOW if t==1 else FAB)
        if state=="bd6" and BDOPT: s=bd_opt(s,BDOPT)
        it={("nc",1):("a folded ivory-gold silk fan","two"),("nc",6):("a round fan with a gold-inlaid handle and gem tassel","two"),("bd",1):("a small bouquet of coral-red flowers","one"),("bd",6):("a white-jade ruyi","one")}[(k,t)]; it=age_item(c,k,*it)
        return s+_pose(it[0],it[1],right)+CLOSE+END
    pal,face=DATA[c]; m,m2=ORIG1[c]; main0,orig=LOWNAME[c]; mo,fl=MOTIF_LOW[c]
    if state=="nude":
        return build_nude_own(c,face,right)
    if state=="thaihau":
        # owner 18/11 ~22:05Z + FIGURE_GATE H: Thai hau holds ONLY an item of the H THAI HAU list (never a t8 consort item)
        # TH1 (owner Lượt 607, ART_RULES I4): Thái hậu in HER OWN root colours (M_COLS main + secondary WITH hexes) instead of the old "deep antique-gold yellow mixed with a trầm {main0}";
        # ONE ref (B8, run with --nostyle; no royal-yellow swatch any more: no yellow robe); tone = B18 sentence via the shared swap in __main__ (a36 LOW_TONE, a51/a65 elder S33 clause);
        # collar / mantle / stiff shoulder piece / HH-rank phoenix crown = the approved states-sample sheet3 design (K5) with only the colour words changed; hair UP (F11, S21 words).
        item,hk=age_item(c,"thaihau",*TH_ITEMS[(item_for(c)+2)%10])
        _mn,_mh,_sn,_sh=M_COLS[c] if c in M_COLS else (main0,"","","")
        assert _sh,"TH1: Thái hậu needs her m-table colours (M_COLS) -- "+c
        MAIN=f"{_mn} like {_mh}"; SEC=f"{_sn} like {_sh}"
        s=PRE+f" An imperial consort, the Empress Dowager (Thái hậu), dignified and gracious. Her face: {face}."+IDENT+" "+AGE_TXT[AGE]
        s+=f" Outfit (the Empress Dowager (Thái hậu), as splendid as the Empress but dignified and restrained): a ceremonial robe of {_mn} silk, richly embroidered on the chest, shoulders and wide sleeves with phoenixes, peonies and clouds in gold and {_sn} silk thread, over it a long ceremonial silk mantle in {_sn} falling from the shoulders to the floor, edged with a band of gold brocade and pearls, a STIFF, STRUCTURED, squared shoulder piece (cầu vai cứng) of embroidered gold brocade with a pearl edge, standing firm and horizontal over both shoulders to show her authority, and her own collar: a high upright round standing collar of {_sn} brocade fastened at the throat with a small jade button (not a crossed collar, not a cloud collar), strands of pearls and jade across the chest, a jade-and-gold belt with tassels, floor-length robe, only slipper toe tips peeking under the hem, slim tall silhouette; a full imperial phoenix crown of the Empress's rank, a large central gold phoenix holding a pearl string in its beak, jewelled wings spreading to both sides, kingfisher-blue inlay, rubies and pearls, and a few clean pearl tassels at the sides."
        s+=f" COLOUR RULE: all colours fresh, clear and luminous, never dusty or greyed; her own colours: {MAIN} is the MAIN colour of the robe and wide sleeves, {SEC} is the SECONDARY colour of the mantle, collar, inner robe and wide borders; the crown, hairpins and jewellery in gold; gold only as thin accents on the borders; NOT a yellow robe, no royal yellow."
        s+=f" TWO-COLOUR RULE: the whole outfit uses EXACTLY TWO colours that clearly interact: the MAIN colour {MAIN} and the SECONDARY colour {SEC}, the secondary clearly visible in large areas (inner robe or skirt, wide borders, sash, cuffs, linings), never a single flat colour all over; gold or silver only as thin accents, never a third colour."
        s+=" The phoenix is the main embroidered motif, larger and more prominent than the flowers."
        s+=" HAIR (rank law): ALL her hair is swept UP into a high bun / chignon, nothing loose hanging down her back."
        s+=" All flowers, birds and the phoenix are fine silk-thread embroidery stitched directly into the fabric, flat and integrated with the cloth, following its folds, not appliqué, not pasted patches, not raised. "+FAB
        return s+_pose(item,hk,right)+CLOSE+END
    # kc / ngheo: stepped-down versions of the --low t1 structure (outfit sentence = TIER_LOW[1] pattern)
    if state=="kc":
        item,hk=age_item(c,"kc",*{"c06":("a thread-bound book","two"),"c25":("a painted silk round fan","two")}.get(c,("an embroidery hoop with a half-finished flower","two")))
        o=f"Outfit (a young lady of a noble family (khuê các tiểu thư) before she enters the palace, simple refined daywear of a good house, never poor, NOT a consort, NOT a palace robe): a NEW outfit, a long-sleeved crossed-collar inner blouse in a lighter tone, over it a SLEEVELESS EMBROIDERED VEST (a waistcoat-like bối tâm) with fine delicate embroidered {mo} on the front panels and a narrow embroidered edge, a long softly pleated skirt to the floor with a little embroidery at the hem, and a long ribbon sash tied at the waist with long hanging ribbon ends; hair in a neat bun with a silk hair ribbon and a few pretty jade and pearl hairpins (trâm) with small dangles and a fresh flower ({fl}), the rest of her long hair falling down her back, modest jewellery (a jade bracelet), no crown, no gold headdress, nothing of royal rank; her signature colour family {pal} stays the MAIN colour of the vest and sash ({main0}, NOT green); the vest is clearly {orig}, the blouse and skirt in a softer lighter tone of it or cream, NOT yellow, NOT an all-gold outfit"
        fab=FAB_LOW; who="A young lady of a noble family before entering the palace"
    else:
        item,hk=age_item(c,"ngheo",*{"c06":("a small bamboo basket with a few fresh flowers","two"),"c25":("a sprig of fresh plum blossoms","one")}.get(c,("an embroidered handkerchief","one")))
        o=f"Outfit (a young woman of a poor but respectable family (nhà nghèo), neat, clean and pretty, never ragged, never torn, not plain: normal good clothes fitting her modest standing, a working girl's daywear, not a consort): a NEW outfit, a plain matte cotton-silk crossed-collar jacket with simple long sleeves, over one plain long pleated cotton skirt, with a plain linen APRON (a long wrap apron) tied at the waist over the skirt by a cloth sash with a bow, one or two layers only, no sheer gauze, no layered overskirt, no flowing scarves; a little embroidery ONLY on the collar edge, the cuffs and a few small {mo} sprigs on the apron and the skirt hem; hair tidy with a plain cloth ribbon and one or two simple wooden or silver hairpins (trâm) and a small fresh flower ({fl}), no gold jewellery, no crown; her signature colour family {pal} stays the MAIN colour of the jacket ({main0}, NOT green), in a softer, simpler cotton-silk, the apron in natural linen beige, the skirt a plain muted tone; the jacket is clearly {orig}, NOT yellow, no patches, no stains"
        fab="Plain cotton-silk with simple soft folds, matte and slightly stiff, not sheer, not airy, not drifting, hanging simply and naturally."; who="A young woman of a modest family before entering the palace"
    s=PRE+f" {who}. Her face: {face}."+IDENT+" "+AGE_TXT[AGE]+" "+o+"."
    s+=f" COLOUR RULE: all colours fresh, clear and luminous, never dusty or greyed; her ORIGINAL robe colour is kept exactly as in image 1 (her first reference): {m} is the main colour of the robe and sleeves, with {m2} in the inner robe; no gold, no royal yellow."
    s+=" Hair: her own hairstyle as described in the outfit, "+("with jade, pearl and fresh flowers. " if state=="kc" else "simple and tidy. ")+"No phoenix anywhere on the robe or in the hair: only flowers, birds, butterflies or other motifs. All flowers and birds are fine thread embroidery stitched directly into the fabric, flat and integrated with the cloth, following its folds, not appliqué, not pasted patches, not raised. "+fab
    return s+_pose(item,hk,right)+CLOSE+END
# ---------- TRIỀU PHỤC (court uniform, SAMPLE ONLY): --trieu 1..8 [--tcut A|B] [--tswap] [--tpal rank] ----------
# ROUND 8 (owner verdict 18/11 ~22:45Z, verbatim in dev/handover/briefs/owner-1118-2245.md): (1) colour = the game's tone (fresh, clear, luminous like the approved t1-t8 v0 sets, never rực / deep / saturated);
# (2) RANK RE-MAP of round 7: new t1 = old t2 (luxury + crown), t1/t2/t3 ONE shoulder-piece size, t4 = old t3 size, t5 = old t4, t6 = t5 size + more jewels, t7/t8 = old t5 (purple) SIZE, one exactly old-t5 design, the other a little different;
# (3) cut = round 1/2 cut with TWO SIDE PANELS (hai vạt hai bên); (4) shoulder pearl fringe longer with rank; (5) t7/t8 sleeves + complexity like her live Hoàng hậu figures; (6) crown + tasselled hairpins BOTH sides.
# ROUND 9 (owner 18/11 ~23:28Z): default cut = B (--tcut A keeps the round-8 cut); pearl fringe per rank t1-t3 none / t4-t6 short / t7-t8 long; t7/t8 sleeves + t8 crown as the everyday Hoang hau; colour = FIGURE_GATE rule 3 (fresh but restrained, deep toned-down); K3 background line. REFS per gen (FIGURE_GATE A0): style3_girls Xm9tPkMBfo [style] + her own t1 face gOm7wObSXO; t6+ also royal swatch TdwDfOyVNR; never m09 alone, never pink kspkwKx16B.
# Triều phục (court uniform) builder, cut B only (owner 18/11 ~23:28Z: two long narrow stole panels). Round 11 (19/11): HH-style prompt; --trieu N prints the t-N prompt.
# Same sentence structure as the 8 ranks (PRE, identity sentence, AGE_TXT, outfit, COLOUR RULE, embroidery+drape, pose, closing). Existing outputs untouched: only reached with --trieu.
TRIEU_MAIN=("brick-crimson silk, the exact red of the court robe of the Nữ quan (the palace women officials), a medium-saturation, medium-lightness true brick red with no coral, orange or pink cast","#99443F","a slightly deeper brick-crimson","#893A37")   # owner 19/11 ~01:40Z: triều phục red = live Nữ quan (tm4 m37 a18) red; measured median of its red robe pixels = #99443F (p25 #893A37, p75 #A65D4F)
TRIEU_GOLD=(YEL_NEW,"#EFBD69")
# ROUND 11 (W104i, owner 19/11 ~00:10Z): written like the approved Hoàng hậu prompt (`build.py c06 v0`): ONE flowing outfit sentence, soft silk with weight, no pile of stiff construction rules.
# t8 only: the Hoàng hậu mantle (HH sentence verbatim); t1-t7 no mantle. Embroidery density rises per rank (TRIEU field 5); every rank covers chest, shoulders, WHOLE sleeves, skirt and every red area.
TRIEU_MANTLE="over it a long ceremonial silk mantle falling from the shoulders to the floor, edged with a broad band of gold brocade and pearls, "
# ROUND 13 (F3, owner verdict 19/11 ~03:05Z item 4): embroidery FEWER and purposeful (rank motif on chest, sleeves, hem only), fabric soft like the approved HH prompt B (FAB copied); the old whole-robe cover sentence is gone (canon overwrite).
TRIEU_COVER="the embroidery is placed with purpose, not scattered: the rank motif only on the chest, on each sleeve and along the hem band, with smooth plain silk between them; "
TRIEU_PANELS="two long narrow court panels of soft silk hang and fold naturally like stoles from the collar down both sides of the front to the hem, each in the rank colour with a gold-edged border and a tassel at its tip, the centre front of the robe showing between them; "
TRIEU_SLV="wide sleeves of soft silk, each hanging on its own at the side with a broad cuff band in the rank colour, falling in soft folds and clearly separate from the court panels; "
TRIEU_SLV_HI="very wide, very long layered sleeves of soft flowing silk in two layers, each hanging on its own at the side, falling in soft folds to about the knee, as long and voluminous as the sleeves of the Empress's everyday robe, with a very broad embroidered gold-and-pearl cuff band and a lining in the second colour showing at the opening; "
# ROUND 14 (F3b, owner 19/11 ~03:15Z "cái vải ... ống tay áo nó không có đúng. Bên nữ đế ... rất là mềm mại"): t8 sleeves = Nữ đế A / HH B wording (only "wide sleeves" + FAB), long and flowing, no layered/cuff-band construction words.
TRIEU_SLV_HH="the wide sleeves long and flowing, of soft silk; "
# ROUND 14: t8 shoulders = HH prompt B cloud collar (verbatim) instead of the rigid scalloped cầu vai (r13 fault "big and rigid-looking next to HH's draped cloud collar").
TRIEU_COLLAR_HH="a wide jewelled gold-and-pearl cloud collar with layered pearl fringes over the shoulders, "
# ROUND 14: HAIR for every rank (owner 19/11 ~03:15Z: "búi hai tóc hai chùm ở phía dưới" = maid hair, never on t8/empresses). HH B / Nữ đế A carry no hair sentence of their own (crown + hairpin sentence only), so this is the HH B hairpin sentence + one high-updo clause.
TRIEU_HAIR=" Hair: her own hair colour, all of it swept up and gathered HIGH on the top of the head into one tall, smooth, neat court updo beneath the crown, smooth at the temples; never low buns, never two buns or double buns, never braids, never hair loops or coils beside the face or at the nape."
_CR="ONE WHOLE court crown worn on the head as a single solid headpiece sitting on top of the hair like a hat (the same family of crown as the Empress's phoenix crown, but with no phoenix), the hair gathered up beneath it; "
_HP=lambda n:f"from BOTH sides of the crown a matching pair of symmetric gold tassel hairpins, one on each side, {n}, hanging beside the face without covering it (the same kind of tasselled hairpins as the Empress's), the whole headdress symmetric and orderly"
# rank: (rank words, secondary colour words, hex, shoulder-piece size, embroidery motif + density, headdress, luxury)
SH_S="SMALL, with a gentle upward curve (the one common shoulder-piece size of ranks 1, 2 and 3)"
SH_T4="a little larger than the lowest ranks', with a clear gentle upward curve"
SH_T5="medium, curving up elegantly with a shaped cloud edge"
SH_T6="exactly the SAME size as the Phi's (rank 5), NOT larger, curving up elegantly with a shaped cloud edge"
SH_OLD5="medium-large (the size of a Phi's grand shoulder piece, never larger), curving up more, with a shaped cloud edge and gold edging"
# OWNER Lượt 598 (ROOT-51 -> BW4): triều phục rank secondary colours = option B (main brick red #99443F/#893A37 + TRIEU_GOLD kept): t1 white-jade ivory #EAE3D0, t2 jade green #7FB394, t3 azure #7E9CCB, t4 jade-teal #5FA8A6 (was rose-pink), t5 lavender-violet #A88BCB, t6 kingfisher blue #4F86A8 (was vermilion-rose), t7 honey-amber #E3A25B, t8 royal yellow #EFBD69 + brick-crimson trim #C65A4C
# MG4 20/11 (ROOT-60 GO, B24 Lượt 726/728 + 765 'colour changes = prompt only'): t4/t6/t7 secondary colours -> B24 t4 #E3A3B8 hồng phấn, t6 #E3A25B cam + small royal-yellow touch, t7 #D46A64 đỏ (option-B #5FA8A6 / #4F86A8 / old t7 #E3A25B are dead). t8 trim #C65A4C (dead option-B) -> #B04E3A = measured median of the crimson trim/sleeve/panel pixels on the owner-approved Hoàng hậu triều phục cut 79fMiEWJAL (r18 final, kept Lượt 437; p25 #A13D2D p75 #C05D46).
TRIEU={
1:("rank-1 consort (Đáp ứng), the lowest consort rank but a court lady in full court dress, never poor","lustrous white-jade ivory (a soft milky ivory with a pearly jade sheen, clearly a jade-white ivory tone, NOT brown, NOT grey)","#EAE3D0",SH_S,"small, light plum blossom sprays, delicate and fine",_CR+"a small silver-gilt crown with white jade, cloud-and-flower motifs and small pearls, one jade-white plaque at the front, solemn and orderly; "+_HP("short, with a few pearl dangles"),"LUXURY: as luxurious as the everyday robe of a Phi consort: a gold belt inlaid with jade and pearls with a long pendant set of jade, pearls and tassels, two strings of pearls and jade beads on the chest, gold-thread embroidery borders, a pearl-fringed jewelled shoulder-piece edge, clearly more splendid than an everyday robe"),
2:("rank-2 consort (Thường tại), a little more ornate than the lowest rank","jade-green, a medium-saturation, medium-lightness leaf-jade green","#7FB394",SH_S,"light, delicate orchid sprays and leaves",_CR+"a small-to-medium silver-gilt crown a little taller than the lowest rank's, with white jade, cloud-and-flower motifs and pearls, a small jade flower plaque at the front, solemn and orderly; "+_HP("short, with pearl and jade dangles"),"LUXURY: a gold belt inlaid with jade and pearls with a long pendant set of jade, pearls and tassels, two strings of pearls and jade beads on the chest, gold-thread borders, a jewelled pearl-fringed shoulder-piece edge, clearly more splendid than an everyday robe"),
3:("rank-3 consort (Quý nhân), richer than the ranks below","azure-blue, a medium-saturation, medium-lightness sapphire-azure blue","#7E9CCB",SH_S,"small and medium lotus flowers and leaves",_CR+"a medium crown of gold and silver-gilt in two tiers with cloud-and-flower motifs, pearls and small jade beads, a gold flower plaque at the front, solemn and orderly; "+_HP("short-to-medium, with pearl and jade dangles"),"LUXURY: a gold belt inlaid with jade and pearls with a long pendant set of jade, pearls and tassels, a pearl and jade necklace of three strings on the chest, gold thread in the borders and cuffs, richly jewelled pearl-fringed shoulder edges, clearly more splendid than an everyday robe"),
4:("rank-4 consort (Tần), clearly richer than the lower ranks","soft powder pink (hồng phấn), a medium-soft, medium-light rose pink","#E3A3B8",SH_T4,"medium peonies and butterflies in gold thread, richer than the ranks below",_CR+"a medium-tall gold crown of two tiers with jade, pearls and cloud-and-flower motifs, a gold flower plaque at the front, a clean outline; "+_HP("medium length, with pearl and jade dangles"),"LUXURY: a gold belt inlaid with jade and a long pendant set of jade, pearls and tassels, a layered pearl necklace on the chest, gold-thread borders, jewelled pearl-fringed shoulder edges, clearly more splendid than an everyday robe"),
5:("rank-5 consort (Phi), clearly richer than every rank below","lavender-violet, a medium-saturation, medium-lightness lilac-violet","#A88BCB",SH_T5,"medium peonies and cranes in gold thread",_CR+"a tall gold crown of three tiers with gold flowers, clouds, jade, pearls and small gems, a gold plaque at the front, a clean outline; "+_HP("medium-long, with pearl and gem dangles"),"LUXURY: a broad gold belt inlaid with jade and rubies and a long pendant set of jade, pearls and gem tassels, a rich court necklace of pearls and jade on the chest, gold-thread borders on the sleeves, richly jewelled pearl-fringed shoulder edges, clearly more splendid than an everyday robe"),
6:("rank-6 noble consort (Quý phi), much richer than the lower ranks, richer in jewels and pearls than the Phi","warm orange (cam), a medium-saturation, medium-lightness soft orange with a small royal-yellow touch (with a thin gold edge on every trim)","#E3A25B",SH_T6,"large peonies, cranes and clouds in gold thread, the richest below the phoenix ranks",_CR+"a BIG tall crown of gold, the grandest below the phoenix crowns and clearly larger than the rank below, of three or four tiers with pearls, jade, rubies, gold flowers and clouds, a large gold plaque at the front, a clean outline, no phoenix; "+_HP("long, with many pearl, jade and gem dangles"),"LUXURY: MORE jewels and pearls than the Phi: a wide gold belt inlaid with jade, rubies and pearls with a long rich pendant set of jade, pearls and gem tassels, a heavy court necklace of several pearl and jade strings, extra pearl strings looped across the chest, gold-embroidered cuffs, very richly jewelled pearl-fringed shoulder edges set with pearls and gems, clearly far more splendid than an everyday robe"),
7:("rank-7 imperial noble consort (Hoàng quý phi), near-empress, far richer than the lower ranks","red (đỏ), a medium-saturation, medium-lightness soft coral red","#D46A64",None,"large gold phoenixes, peonies and clouds, splendid, yet clearly less rich than the Empress's own robe",_CR+"a LARGE ornate gold phoenix crown (one large gold phoenix with spreading wings, with pearl strands and kingfisher-blue inlay), grander than a noble consort's headdress but clearly simpler than the Empress's nine-phoenix crown; "+_HP("long, with pearl, jade and gem dangles"),"LUXURY: a broad gold belt inlaid with jade, rubies and pearls with a very long pendant set of jade, pearls and gem tassels, a heavy court necklace of many pearl, jade and gold strings, jewelled cuffs, very richly jewelled shoulder edges, imperial splendour"),
8:("the Empress (Hoàng hậu), the highest rank, the most splendid of all","brick-crimson for the shoulder-piece trim, the collar band, the sash and the cuff linings","#B04E3A",None,"large phoenixes, peonies and clouds in gold and kingfisher-blue silk thread (far denser and richer embroidery than any other rank)",_CR+"a FULL imperial nine-phoenix crown as LARGE and splendid as the Empress's everyday spread-wing phoenix crown: very tall and very wide, clearly taller and wider than a noble consort's crown, with a large central gold phoenix holding a pearl string in its beak, jewelled wings spreading wide on both sides, more gold phoenixes and flowers around it, kingfisher-blue inlay, rubies and pearls; "+_HP("the longest, with many pearl and gem dangles"),"LUXURY: the richest of all: a very broad gold belt inlaid with jade, rubies and pearls with a very long pendant set of jade, pearls and gem tassels, a magnificent court necklace of many strings of pearls, jade and gold reaching the waist, jewelled cuffs, the most richly jewelled shoulder edges, imperial splendour, luxurious but not cluttered")}
# shoulder-piece edge + pearl-fringe length (rises with rank, "áo ngọc trai")
TRIEU_EDGE={1:"a row of small pearls with a few jade beads SEWN DIRECTLY onto the shoulder piece along a gold-stitched edge, NO fringe, nothing hanging from it",2:"a row of pearls with small jade beads SEWN DIRECTLY onto the shoulder piece along a gold edge, NO fringe, nothing hanging from it",3:"a row of pearls and jade beads SEWN DIRECTLY onto the shoulder piece along a gold edge, NO fringe, nothing hanging from it",4:"a row of pearls with jade beads along a gold edge, with a SHORT pearl fringe (about a hand long) hanging from it",5:"pearls and jade beads with small gems along a gold edge, with a SHORT pearl fringe (about a hand long) hanging from it",6:"a rich band of pearls, jade beads and small gems along the edge, with a SHORT pearl fringe (about a hand long) hanging from it",7:"pearls and jade beads with small gems along a gold edge, with a LONG pearl fringe hanging down to the elbow, several pearl strings deep",8:"the richest edge: a double row of pearls and gem beads (rubies, jade, kingfisher-blue) with the LONGEST pearl tassels hanging in a curtain of pearl strings to below the waist, like a robe of pearls, luxurious but not cluttered"}
SH_OLD5_EXACT=SH_OLD5+"; its edge: pearls and jade beads with small gems and a pearl fringe along a gold edge"
SH_OLD5_VAR="the SAME size (never larger), but a different shape: a rounded multi-lobed scalloped cloud-lobe edge, embroidered with small phoenixes and clouds in gold thread"
def build_trieu(c,t,v="v0"):
    pal,face=DATA[c]; rk,sc,sh,sp,emb,head,lux=TRIEU[t]
    mc,mh,dc,dh=TRIEU_MAIN; gc,gh=TRIEU_GOLD
    edge=TRIEU_EDGE[t]
    if t in (7,8):   # both = old t5's SIZE; t7 exactly its design, t8 a little different
        sp=SH_OLD5
        edge=TRIEU_EDGE[t]+" (the exact shoulder-piece design of the rank-5 consort)" if t==7 else TRIEU_EDGE[t]+"; "+SH_OLD5_VAR
    s=PRE+f" An imperial consort{', the Empress' if t==8 else ''}. Her face: {face}. From the identity reference keep ONLY her face, facial features and hairstyle colour; do NOT copy the outfit, hair ornaments or accessories of the reference, dress her in the NEW outfit below. The style reference image is only for skin, drawing style, fabric and embroidery: never copy its face, body or pose. {AGE_TXT[AGE]}"
    robe="golden yellow silk mixed with brick-crimson court red" if t==8 else mc   # ROUND 14 (F3b): "coral red" (HH word) pulled t8 to coral; court brick red instead (exact hexes in COLOUR RULE)
    if t>=7: head=head.replace(" (the same family of crown as the Empress's phoenix crown, but with no phoenix)","")
    slv=TRIEU_SLV_HH if t==8 else TRIEU_SLV_HI if t==7 else TRIEU_SLV
    shoulder=TRIEU_COLLAR_HH if t==8 else f"a jewelled shoulder piece (cầu vai) over each shoulder, {sp}, its edge: {edge}; "
    mantle=TRIEU_MANTLE if t==8 else ""
    if t<=3: lux=lux.replace('pearl-fringed ','pearl-studded ')
    s+=f" Outfit ({rk}): the formal court robe (triều phục) of {robe}, a floor-length Han-style robe with a crossed collar edged with a thin gold line, richly embroidered on the chest, shoulders and wide sleeves with {emb}{', ' if mantle else '; '}{mantle}{TRIEU_PANELS}{TRIEU_COVER}{shoulder}{slv}{lux.replace('LUXURY: ','')}; floor-length robe, only slipper toe tips peeking under the hem, slim tall silhouette; {head}."
    s+=" COLOUR RULE: all colours at ONE medium tone level, the same as the soft coral-red and brick-red robes of the game: medium saturation, medium lightness, neither too fresh nor too dark, never rực, never glaring, never neon, never pastel-washed, never dusty, grey, muddy or black; "
    if t==8: s+=f"the MAIN colour of the Empress's robe body, skirt and mantle is {gc}; BOTH SLEEVES (the arms of the robe, from the shoulder down to the cuff) and the collar band with its collar trims are the court red, {mc} like {mh}, clearly red, with {dc} like {dh} in the linings and belt; the sash and the cloud-collar trim also in that red; "
    else:
        s+=f"the COMMON main colour of the court robe is {mc} like {mh}, the main colour of the robe and sleeves, with {dc} like {dh} in the linings and belt; the secondary colour {sc} like {sh} is the colour of the shoulder pieces, the collar band, the cuff bands, the sash and the court panels, and it shows her rank; "
        if t==7: s+=f"the royal golden yellow is clearly and generously visible as the court panels, the sash and the wide cuff bands, in {gc}; "
    s+="the crown and jewellery in real shining gold; gold thread on the borders, hem band and embroidery; this robe colour belongs to the court, it is NOT her own signature colour."
    s+=TRIEU_HAIR
    if t<7: s+=" No phoenix anywhere on the robe or in the hair: only flowers, birds, butterflies, clouds or other motifs. No mantle and no cape: the sleeves and the court panels hang free. All embroidery is fine silk-thread embroidery stitched directly into the fabric, flat and integrated with the cloth, following its folds, not appliqué, not pasted patches, not raised. "+FAB
    else: s+=(" No mantle and no cape: the sleeves and the court panels hang free." if t==7 else "")+" The phoenix is the main embroidered motif, larger and more prominent than the flowers. All flowers, birds and the phoenix are fine silk-thread embroidery stitched directly into the fabric, flat and integrated with the cloth, following its folds, not appliqué, not pasted patches, not raised. "+FAB
    # ROUND 14 (F3b, owner 19/11 ~03:15Z "tướng rất là đơ, không cầm gì trong tay" + "ai cũng đứng ở một cái kiểu một mà tao cực kỳ ghét"): the hard-coded folded-hands pose is gone. Pose = HH prompt B pose block (_pose, as `build.py c06 v0` emits) with ONE item
    # of that rank (t1-t6: 3f table ITEMS_LOW as --low N; t7: ITEMS7 as --t7; t8: ITEMS as v0), then spec5pose(t) = a different spec5 pose per rank, frontal (3d2), calm skips for t6+ (A0 rule 3). Do not pass --spec5pose with --trieu.
    # Items = the raw rank tables (no age_item: at a18 it turns every rank of c06 into a flute -> 8 identical props). Poses: t1-t5 = spec5 list, one DIFFERENT pose each (TRIEU_S5 index into her spec5 list, look-back pose never);
    # t6-t8 = calm with rank (A0 rule 3: serene, small restrained gestures; the spec5 list has no calm pose left for them): the HH B pose block itself with the rank's own hand clause (t6 3f fan, t7 censer as --t7, t8 as v0).
    if t==8: item,hk=ITEMS[item_for(c)]; right={"c06":True,"c25":True,"c16":True,"c20":False}.get(c,int(c[1:])%2==1); hc=_hh(hand,hk,right)
    elif t==7: _n=int(c[1:]); item,hk=ITEMS7[GOLDEN7.get(c,(_n*3+5)%10)]; right=(c=="c25") if c in GOLDEN7 else _n%2==1; hc=hand7(hk,right)
    else: item,hk=ITEMS_LOW[c][t]; right=(int(c[1:])%2==1); hc=low_hand(hk,right)
    s+=_pose(item,hk,right).replace(f"Her hands and body: {low_hand(hk,right)}.",f"Her hands and body: {hc}.")+CLOSE
    s+=" IGNORE the style reference image's background completely: the background is completely transparent with NOTHING behind or around her: no backdrop, no parchment, no painted flowers or branches, no smoke, no haze, no glow, no stain."
    s+=" The headdress is worn on the head as ONE WHOLE crown in a single piece with its tasselled hairpins on both sides, never loose casual hairpins or sticks."
    s+=END
    return trieu_angle(s,t)   # ROUND 15 (F3c): no spec5pose on any rank (one pose template = HH B pose block for all 8); angle law instead of the frontal words
# ---------- ROUND 15 (F3c, owner Lượt 229 + ROOT-40 rules A/E): ANGLE LAW + t8 = approved HH prompt + ONLY triều phục sentences (--trieu only; every other output byte-identical) ----------
# Angle words come from approved / live prompts where they exist: PRE "face clearly visible, 3/4 or frontal view." and hands "body turned slightly three-quarters to the right" = goldenC2/t8_v0_c06.txt (the approved HH picture's stored prompt);
# "three-quarter view" = the old live figure prompts (dev/figwork/spec.py). The MID wording and the "never sideways" guard are NEW words (no approved source).
TRIEU_FRONT_PRE="face clearly visible, body and face frontal, standing squarely facing the viewer, no turn."
TRIEU_FRONT_HAND=", body and face frontal, standing squarely facing the viewer, no turn"
TRIEU_ANGLE_PRE="face clearly visible, 3/4 or frontal view."
_TA_NF="body turned slightly three-quarters to the {s}"                      # near-frontal (approved HH words)
_TA_TQ="three-quarter view, her body and face turned the same way toward the {s}, never sideways"   # her 3/4 = live tm0 angle
_TA_MID="body turned a little more than slightly, halfway between frontal and three-quarter view, toward the {s}"   # in-between (NEW words)
TRIEU_ANGLE={1:_TA_NF.format(s="right"),2:_TA_TQ.format(s="left"),3:_TA_MID.format(s="right"),4:_TA_NF.format(s="left"),5:_TA_TQ.format(s="right"),6:_TA_MID.format(s="left"),7:_TA_TQ.format(s="left"),8:_TA_NF.format(s="right")}
def trieu_angle(s,t):
    assert s.count(TRIEU_FRONT_PRE)==1, "PRE frontal words not found once"
    s=s.replace(TRIEU_FRONT_PRE,TRIEU_ANGLE_PRE)   # first: the PRE phrase contains the hand phrase
    assert s.count(TRIEU_FRONT_HAND)==1, "hand frontal words not found once"
    s=s.replace(TRIEU_FRONT_HAND,", "+TRIEU_ANGLE[t])
    assert "body and face frontal" not in s and "squarely" not in s, "frontal words left"
    return s
# t8 triều phục details, ADDED as one block before " Pose:" in the `build.py c06 v0` text; nothing in that text is edited except the two angle phrases above.
# cầu vai = NUDE_OPT A wording (approved Nữ đế A) + SH_OLD5 "curving up"; fringe = TRIEU_EDGE[7] (t7 "LONG ... to the elbow") made at least as long; panels = TRIEU_PANELS with the court red.
def trieu_t8_add():
    mc,mh,dc,dh=TRIEU_MAIN
    return (" TRIỀU PHỤC (formal court uniform) details on this same outfit: BOTH SLEEVES (the arms of the robe, from the shoulder down to the cuff) and the collar band with its collar trims are the court red, "
            f"{mc} like {mh}, clearly red, with {dc} like {dh} in the linings; "
            +TRIEU_PANELS.replace("each in the rank colour","each in that court red")
            +"the cloud collar sits on a STIFF, SHORT, structured shoulder piece (cầu vai cứng) of gold brocade edged with pearls over each shoulder, curving up and slightly pointed outward; "
            "from its edge hangs a LONG pearl fringe, several pearl strings deep, down to the elbow or longer, at least as long as the Hoàng quý phi's.")
def build_trieu8(c,v="v0"):
    s=build(c,v,False)
    a=s.index(" Pose: calm standing pose;")
    s=s[:a]+trieu_t8_add()+s[a:]
    return trieu_angle(s,8)
TRIEU_S5={1:5,2:0,3:1,4:3,5:4}   # spec5 index per rank (c06 'kieungao': 5 skirt-hem stair step, 0 walking + item by the cheek, 1 walking forward sleeves flowing, 3 adjusting a hairpin, 4 breeze lifts the stole); 2 = look back, never
# ---------- SPEC5 POSES (owner 18/11 ~21:55Z, FIGURE_GATE D.3a): flag --spec5pose ----------
# The ORIGINAL pose system that made the live 32 consorts = dev/figwork/spec5.py POSES[personality][(i+t-1)%6] (+ suffix ", poised" t5-t6, ", with stately grace" t7-t8),
# COPIED WORD FOR WORD (POSES below is a verbatim copy; i = index-1 from dev/figwork/consorts_ids.json; a18 = ps[0] = this entry). Only changes: {prop} = the rank's 3f item,
# and a pose that holds a teacup / a second object / no object keeps its movement but holds the rank item instead (ADAPT, one item only). Without --spec5pose nothing changes.
SPEC5_POSES={"kieungao":["walking mid-step, raising {prop} beside her cheek with one hand, chin slightly lifted, the other long sleeve floating out",
 "walking forward mid-step, long sleeves flowing behind her, {prop} held at her side",
 "turning to look back over her shoulder, body in three-quarter view, {prop} held near her waist",
 "turning mid-step while adjusting a gold hairpin set in her hair with one raised empty hand, her sleeve sliding back, {prop} in the other hand, her sleeves kept clear of the front of her waist",
 "standing as a breeze lifts her long silk stole, one hand catching the stole, {prop} in the other hand, her sleeves kept clear of the front of her waist",
 "lifting her skirt hem slightly with one hand as if stepping up a stair, {prop} in the other hand, her sleeves kept clear of the front of her waist"],
"numi":["offering {prop} forward with both hands, head tilted gently, her sleeves kept clear of the front of her waist",
 "gazing sideways at a small butterfly resting on her raised finger, {prop} in the other hand, her sleeves kept clear of the front of her waist",
 "holding a small round palace lantern in one hand and {prop} in the other, mid-step",
 "a small songbird perched on her raised finger, feeding it, {prop} in the other hand, her sleeves kept clear of the front of her waist",
 "skipping lightly forward, holding {prop} at her chest, skirt and ribbons fluttering",
 "twirling one long sleeve in a light dance step, {prop} in the other hand, her sleeves kept clear of the front of her waist"],
"hienlanh":["walking lightly forward holding {prop}, looking down at it tenderly, sleeves swaying",
 "walking mid-step carrying {prop}, long sleeves swaying, her sleeves kept clear of the front of her waist",
 "stepping forward to offer a small teacup in both hands, sleeves swinging",
 "raising a small plum blossom branch up to her face to smell it",
 "a light little twirl, hands clasped at her chest, skirt swirling out",
 "walking forward holding a small round palace lantern, sleeves and sash swaying"],
"dangi":["raising {prop} open beside her cheek, glancing over it",
 "turning to look back over her shoulder, {prop} in hand",
 "twirling a long silk ribbon in a graceful dance step",
 "adjusting a hairpin set in her hair with one raised empty hand, {prop} in the other hand, her sleeves kept clear of the front of her waist",
 "walking mid-step with sleeves flowing, {prop} held open at her side",
 "swaying in a light turn, {prop} held up near her shoulder, skirt swirling"],
"thamvong":["walking forward mid-step with sleeves flowing, {prop} in one hand, her sleeves kept clear of the front of her waist",
 "turning to look back over her shoulder, holding {prop}",
 "walking while reading an unrolled scroll held open in both hands, sleeves trailing",
 "walking forward holding {prop} raised, glancing at it, stole flowing",
 "standing as a breeze lifts her long stole, one hand holding {prop}, her sleeves kept clear of the front of her waist",
 "adjusting a gold hairpin set in her hair with one raised empty hand, the other hand holding {prop}, her sleeves kept clear of the front of her waist"],
"thanhnha":["playing a jade flute held to her lips while stepping forward, sleeves fluttering",
 "walking with a pipa held upright, plucking it, skirt swirling",
 "walking while reading an unrolled scroll held open in both hands, sleeves trailing",
 "walking slowly while reading {prop} held open in one hand, her sleeves kept clear of the front of her waist",
 "turning mid-step with a raised writing brush in one hand and a sheet of paper in the other, sleeves flowing",
 "turning lightly with a small teacup in both hands, sash fluttering"]}
# ADAPT: the spec5 poses that hold a teacup / second object / nothing -> same movement, rank item ({prop}); (not needed for c06/c25 except c25 t1)
SPEC5_ADAPT={
"holding a small round palace lantern in one hand and {prop} in the other, mid-step":"holding {prop} in one hand, mid-step, the other hand lifting her sleeve, her sleeves kept clear of the front of her waist",
"stepping forward to offer a small teacup in both hands, sleeves swinging":"stepping forward to offer {prop} in both hands, sleeves swinging, her sleeves kept clear of the front of her waist",
"raising a small plum blossom branch up to her face to smell it":"raising {prop} up beside her cheek, glancing at it",
"a light little twirl, hands clasped at her chest, skirt swirling out":"a light little twirl, holding {prop} at her chest, skirt swirling out",
"walking forward holding a small round palace lantern, sleeves and sash swaying":"walking forward holding {prop}, sleeves and sash swaying, her sleeves kept clear of the front of her waist",
"twirling a long silk ribbon in a graceful dance step":"a graceful dance step, twirling one long sleeve, {prop} in the other hand, her sleeves kept clear of the front of her waist",
"walking while reading an unrolled scroll held open in both hands, sleeves trailing":"walking while holding {prop} in both hands, sleeves trailing, her sleeves kept clear of the front of her waist",
"playing a jade flute held to her lips while stepping forward, sleeves fluttering":"stepping forward holding {prop} raised in one hand, sleeves fluttering",
"walking with a pipa held upright, plucking it, skirt swirling":"walking with {prop} held upright in one hand, skirt swirling, her sleeves kept clear of the front of her waist",
"turning mid-step with a raised writing brush in one hand and a sheet of paper in the other, sleeves flowing":"turning mid-step with {prop} raised in one hand, sleeves flowing",
"turning lightly with a small teacup in both hands, sash fluttering":"turning lightly with {prop} in both hands, sash fluttering, her sleeves kept clear of the front of her waist"}
SPEC5_FRONTAL=[("turning mid-step while adjusting","mid-step while adjusting"),("gazing sideways at","gazing at"),("swaying in a light turn,","swaying gently,"),
("turning mid-step with","mid-step with"),("turning lightly with {prop} in both hands","lightly holding {prop} in both hands"),("body in three-quarter view, ","")]
SPEC5_IDS={"c%02d"%n:(t,m) for t,rng in (("kieungao",range(1,7)),("numi",range(7,13)),("hienlanh",range(13,18)),("dangi",range(18,23)),("thamvong",range(23,28)),("thanhnha",range(28,33))) for m,n in enumerate(rng,1)}
# N5d item 5: maid m01-m52 -> SPEC5 pose list BY INDEX (the game gives each maid a random trait, no fixed one): the six lists in the consorts' order, maid n takes list (n-1)%6 and slot (n-1)//6+1.
_SP5_ORDER=["kieungao","numi","hienlanh","dangi","thamvong","thanhnha"]
SPEC5_IDS.update({"m%02d"%n:(_SP5_ORDER[(n-1)%6],(n-1)//6+1) for n in range(1,53)})
for _i,_c in enumerate(PRINCESS_ROWS): SPEC5_IDS[_c]=("kieungao",_i+1)   # N8b: princess rows (see PRINCESS_ROWS)
for _c in S_NEW_ROWS: _n=int(_c[1:]); SPEC5_IDS[_c]=(_SP5_ORDER[(_n-1)%6],(_n-1)//6+1)   # RANK8: new s-people = the maid index rule
def spec5pose(o,c,t,force=None):
    m=re.search(r" Pose: calm standing pose; she holds (.+?) in a contrasting colour",o); assert m,"pose paragraph not found"
    prop=m.group(1); tr,mi=SPEC5_IDS[c]; i=mi-1
    # FACING (FIGURE_GATE D.3a, owner 18/11 ~22:10Z): never back turned / looking back over the shoulder -> skip to the next pose of the same list ((i+t)%6, (i+t+1)%6 ...)
    # CALM WITH RANK AND AGE (APPROVED_PROMPTS rule 3): t6-t8 and a51/a65 never dance / twirl / skip / swirl -> same skip
    def _badf(ag):
        b=[r"look(?:ing)? back"]+([r"twirl",r"skipping",r"dance",r"swirl",r"light turn"] if (t>=6 or ag in ("a51","a65")) else [])
        # N2 r10b (ROOT-33, owner A0 rule 3): Nữ đế (--state nude) = top rank -> also skip walking / mid-step / turning / skirt-lifting / hairpin-adjusting frames (only affects --state nude)
        if globals().get("STATE")=="nude": b+=[r"walking",r"mid-step",r"turning",r"lifting her skirt",r"adjusting"]
        if re.fullmatch(r"ty[1-8]|cold",str(globals().get("STATE"))): b+=[r"stole"]
        if str(globals().get("STATE")) in ("tm0","tm4"): b+=[r"adjusting",r"hairpin"]   # N5d item 5: tm0 wears one wooden pin, tm4 a winged court cap: no hairpin-touching pose   # N5d item 4: trung y / cold linen robe has no stole
        return b
    def _raw(j):
        r_=SPEC5_POSES[tr][j]
        return r_ if "{prop}" in r_ else SPEC5_ADAPT[r_]
    # N5d item 3 (AGE offset): the 5 ages of ONE person get DIFFERENT poses. each age starts one step further (a18 at (i+t-1)) and takes the first pose that passes ITS OWN skip lists and is not taken by another age; ages with the fewest allowed poses choose first; if every allowed pose is taken it falls back to its first allowed one. Ages outside the 5 (kids) keep the old pick.
    _AO=["a18","a26","a36","a51","a65"]; _used=[]; _pick=None
    if AGE not in _AO: _AO=[AGE]
    _oks={}
    for _ag in _AO:
        _off=_AO.index(_ag); _cand=[(i+t-1+_off+_k)%6 for _k in range(6)]
        _oks[_ag]=[j for j in _cand if not any(re.search(q,_raw(j)) for q in _badf(_ag))]
        if not _oks[_ag]: raise AssertionError(("no allowed spec5 pose",c,t))
    _pk={}
    for _ag in sorted(_AO,key=lambda g:(len(_oks[g]),_AO.index(g))):   # the age with the fewest allowed poses (a51/a65, t6+) chooses first
        _pk[_ag]=next((j for j in _oks[_ag] if j not in _pk.values()),_oks[_ag][0])
    _pick=_pk[AGE] if force is None else force   # force: --trieu only (ROUND 14), every other caller unchanged
    raw=_raw(_pick)
    # N5c (owner 19/11 ~00:50Z, FIGURE_GATE 3d2 "từ đây về sau là không có vẽ góc 3 phần tư nữa"): FRONTAL ONLY. Applied AFTER the pose choice (skip lists above see the verbatim spec5 text, so every person keeps the same pose);
    # only the turn/side words change, the hand/item action stays; every spec5 pose then states the frontal body.
    for _o,_n in SPEC5_FRONTAL: raw=raw.replace(_o,_n)
    if globals().get("STATE")=="cold": raw=raw.replace("a gold hairpin","her one plain wooden hairpin")   # TY0 fix2: COLD_OUTFIT "ONE plain wooden hairpin ... NO gold"; the pose keeps her wooden pin (same pose choice, no skip)
    pose=raw.format(prop=prop)+", body and face frontal, facing the viewer squarely, no turn"+(", with stately grace" if t>=7 else ", poised" if t>=5 else "")   # F4b-4: ty/cold too -> final __main__ angle pass
    global SP5_ODD; SP5_ODD=bool(_pick%2)   # F4b-3 angle (ROOT-40): odd spec5 slots get the HH B slight 3/4 turn in the final pass (__main__)
    # N5b (ROOT-36 order; FIGURE_GATE A0 rule 3 + canon 19/11 (e) "Nữ đế mass pose = CALM at all ages (item below the chin, no flying cloth)"): --state nude only -> one calm sentence for every person and age; every other output byte-identical
    # F4 fix1 (ROOT-39, owner verdict 19/11 ~03:05Z item 5 "bộ trang phục nó lại thuần luộc, đi xuống dưới chân"): the N5b sentence ("standing still and upright ... elbows close to her body ... all hang straight down, still ... no movement") was the ONLY difference from the approved Hoàng hậu prompt B / Nữ đế A outfit+fabric text and made the robe a stiff tube.
    # Now = approved HH prompt B pose wording copied ("calm standing pose; she holds ... at chest height below the chin") + 3d2 frontal words + Nữ đế A "with stately grace"; only the canon (e) clause "no flying, floating or windblown cloth" kept. The fabric sentence (HH B: "hang and fold naturally ... natural creases, never stiff") is untouched and no longer contradicted.
    # F4 fix2: fix1 ("in one or both hands") still gave a symmetric column (both hands centred). Hands = HH prompt B "Her hands and body" clause copied (item in one hand, the other hand resting over her sash); only its "three-quarters" turn replaced by the 3d2 frontal words.
    # F4b option (i) (ROOT-39 GO; owner 19/11 ~03:15Z "ai cũng đứng ở một cái kiểu" + Nữ đế must be soft like Nữ đế A / HH): fix2's single pose replaced by a Nữ đế-only list of 5 calm poses built ONLY from approved wording
    # (Nữ đế A stole action without "breeze" = F4 test (b) bxMjQS45Y2, proven soft; HH B "item upright in one hand at chest height below the chin, the other hand resting over her sash"; HH low builder "gently presenting / turning / touching it").
    # EVERY pose keeps the sheer silk stole (the soft layer). One pose per age, rotated per person (pose = (age index + person number) % 5) so the 5 ages of one person and same-age neighbours differ. --state nude only; every other output byte-identical.
    if globals().get("STATE")=="nude":
        _NP=["one hand holding the edge of her long sheer silk stole, {prop} in the other hand",
             "{prop} upright in one hand at chest height below the chin, the other hand resting over her sash, holding the edge of her long sheer silk stole",
             "gently presenting {prop} in one hand at chest height, the other hand holding the edge of her long sheer silk stole",
             "gently turning {prop} in one hand at chest height, the other hand holding the edge of her long sheer silk stole",
             "{prop} upright in one hand at chest height, the other hand gently touching it, her long sheer silk stole over both arms"]
        _A5=["a18","a26","a36","a51","a65"]; _cn=int(re.sub(r"\D","",c) or 0)
        _np=_NP[((_A5.index(AGE) if AGE in _A5 else 0)+_cn)%5].format(prop=prop)
        # F4b angle (ROOT-40, owner Lượt 225/229 "ta không muốn ... đứng chính diện ... cái vai của họ vẫn có thể hơi nghiêng ... nữ đế A ... hơi nghiêng"; ANGLE LAW (A) overrides 3d2 for NEW Nữ đế gens): no dead-frontal words.
        # Angle words COPIED from approved prompts only: Nữ đế A header "face clearly visible, 3/4 or frontal view" (A's pose carries no angle words) for every Nữ đế;
        # odd pose SLOTS (1,3 of the 5) add Hoàng hậu B "body turned slightly three-quarters to the right" (the 3/4 end, like live tm0) -> neighbours alternate near-frontal / 3/4.
        _ang=", body turned slightly three-quarters to the right" if (((_A5.index(AGE) if AGE in _A5 else 0)+_cn)%5)%2 else ""
        pose=f"calm standing pose; {_np}, the item held below the chin{_ang}, with stately grace; no flying, floating or windblown cloth"
        _fh="face clearly visible, body and face frontal, standing squarely facing the viewer, no turn."; assert o.count(_fh)==1,"nude frontal header"
        o=o.replace(_fh,"face clearly visible, 3/4 or frontal view.",1)
    a=o.index(" Pose: calm standing pose;"); b=o.index(" Every hairpin is inserted")
    new=f" Pose: {pose}. The item is in a contrasting colour, not the robe colour, and the hand really grips it; the whole face fully visible with the head up toward the viewer, eyes open, lips closed, never looking down, nothing covering the face."
    o=o[:a]+new+o[b:]
    return o.replace("do NOT copy the outfit, hair ornaments or accessories of the reference","do NOT copy the reference's poses, outfit, hair ornaments or accessories",1)
# ---------- --nude2 A|B|C|D (N1 round 10, brief nude-r10, owner 18/11 ~22:35Z): Nữ đế = the approved Hoàng hậu t8 output (`build.py cNN v0 --head --spec5pose`) COPIED, changing ONLY: (a) phoenix->dragon (+ "larger" once on the crown), (b) + stiff short shoulder piece sentence, (c) + front bead tassels to the forehead only, (d) item = one from FIGURE_GATE H NỮ ĐẾ list (never her t8 item), (e) colour slot per option. Nothing else. Only reached with --nude2. ----------
NUDE2_ITEM={"c06":"a gold dragon-framed round fan","c25":"a gold-and-jade ruyi with a dragon"}   # FIGURE_GATE H NỮ ĐẾ #5 / #4; their t8 items are a gold ruyi (c06) / phoenix seal box (c25)
NUDE2_SHOULDER=" a STIFF, SHORT, structured shoulder piece (cầu vai cứng) over each shoulder, slightly pointed outward, never a soft drooping cape,"
NUDE2_TAS={"A":"a row of bead tassels (lưu) hanging in front from the rim of the crown, reaching the forehead only, never over the eyes or the face",
"B":"a row of bead tassels (lưu) hanging in front from the rim of the crown, reaching the forehead only, never over the eyes or the face",
"C":"a row of bead tassels (lưu) hanging in front from the rim of the crown, reaching the forehead only, never over the eyes or the face",
"D":"only five bead tassels (lưu) hanging in front from the rim of the crown, the outer ones short and the middle ones longer, reaching the forehead only, never over the eyes or the face"}
NUDE2_COL={"B":"a DEEP, low-saturation crimson like #7E2A33 (a dark muted wine-crimson, never a bright or AI-looking red, never orange, never coral)",
"C":"black silk richly embroidered with gold thread (the yellow clearly more than the black, black never the main colour)"}
def nude2(o,c,opt):
    assert c in NUDE2_ITEM and opt in "ABCD"
    t8item=age_item(c,"t8",*ITEMS[item_for(c)])[0]; assert t8item in o,("t8 item not in pose",c,t8item)   # N5c: follow the age-table t8 item (--olditem = old)
    o=o.replace(t8item,NUDE2_ITEM[c])                                   # (d)
    o=o.replace("phoenixes","dragons").replace("phoenix","dragon")        # (a)
    assert o.count("a FULL tall imperial crown")==1
    o=o.replace("a FULL tall imperial crown","a larger FULL tall imperial crown",1)   # (a) "larger" once
    m=" slim tall silhouette;"; assert o.count(m)==1
    o=o.replace(m," slim tall silhouette,"+NUDE2_SHOULDER[:-1]+";",1)     # (b)
    m="; the most splendid outfit of all"; assert o.count(m)==1
    o=o.replace(m,", and "+NUDE2_TAS[opt]+m,1)                          # (c)
    if opt in "BC":                                                      # (e)
        a=o.index("her ORIGINAL robe colour is kept exactly"); b=o.index("the royal golden yellow is the DOMINANT")
        o=o[:a]+o[b:]
        import re as _re; _m=_re.search(r"golden yellow silk mixed with ([a-z\- ]+?),",o); assert _m  # outfit sentence names her colour too: colour slot (e)
        o=o.replace(_m.group(0),"golden yellow silk mixed with "+("deep wine-crimson" if opt=="B" else "black")+",",1)
        assert o.count("her colour is the second colour")==1
        o=o.replace("her colour is the second colour",NUDE2_COL[opt]+" is the second colour",1)
    assert "phoenix" not in o.lower()
    return o
# ---------- --nude3 (F4b, owner Lượt 364 + 369, ROOT-46 order 19/11 ~08:09Z): NỮ ĐẾ REBUILT on the approved Hoàng hậu prompt B (store `build.py cNN v0`).
# Base = the HH t8 store output for the same person (keeps face, colour rule, image-3 royal swatch sentence + ref order: Lượt 359). Swapped, each piece COPIED from approved text:
#  (1) title + outfit header + dragon motif = approved Nữ đế A builder (build_nude_own); (2) headdress segment (dragon crown + bead fringe lưu) = build_nude_own output verbatim;
#  (3) HH cloud collar -> the Nữ đế shoulder piece of her option (NUDE_OPT, approved A-D); (4) second colour = her option (NUDE_OPTMAP auto); (5) item = her Nữ đế item (FIGURE_GATE H list, NUDE_ITEM) + matching hand clause;
#  (6) + HAIR UP / SLEEVES / FABRIC sentences copied verbatim from dev/art/owner-copy/tpl_hh.txt (prompt B, Lượt 331/355/364/369: hair up, one sleeve layer to the floor, "FABRIC: thick gold-embroidered brocade with a graceful, flowing drape.").
NUDE3_HHSENT=("HAIR UP: ALL of her glossy pure BLACK hair (never brown) is swept UP and gathered into the tall high chignon on top of her head under the crown, smooth at the nape; NO hair hanging loose down her back or over her shoulders. "
 "SLEEVES: very long, very wide, flowing sleeves that fall well past her hands and hang PAST her ankles all the way down until they TOUCH THE FLOOR, ONE single sleeve layer (no shorter outer sleeve on top); the brocade flows and drapes softly like heavy silk, never stiff. Even while her hands are raised to hold her item at chest height, each wide sleeve still hangs straight down from her forearm and its hem lies on the floor beside her feet; the sleeve hem is NEVER at knee or shin height. "
 "FABRIC: thick gold-embroidered brocade with a graceful, flowing drape.")
def nude3(o,c):
    # F4b-6 (owner Lượt 371/373/375 STORE GATE): the HH t8 store text stays WORD FOR WORD; only slot words swap (motif phoenix->dragon, colour slot, item + hand clause);
    # every Nữ đế difference is ADDED as extra sentences after the store outfit sentence. dev/art/check_store.py <file> cNN v0 must PASS before any gen.
    import re as _re
    _tpl=open(os.path.join(os.path.dirname(os.path.abspath(__file__)),"..","owner-copy","tpl_hh.txt"),encoding="utf-8").read()
    assert NUDE3_HHSENT in _tpl,"HH prompt-B sentences drifted from tpl_hh.txt"
    opt=NUDE_OPTMAP[c]; O=NUDE_OPT[opt]; right=(int(c[1:])%2==1)
    def rep(a,b):
        nonlocal o; assert o.count(a)==1,("nude3 anchor",a[:60]); o=o.replace(a,b,1)
    if O["sec"]:                                                                                                   # colour slot
        m=_re.search(r"golden yellow silk mixed with ([a-z\- ]+?),",o); assert m; rep(m.group(0),f"golden yellow silk mixed with {O['sec']} and her own {m.group(1)},")   # PALFIX c2 (owner L1419): + her own MAIN colour
        i=o.index("her ORIGINAL robe colour is kept exactly"); j=o.index("the royal golden yellow is the DOMINANT")
        _own=_re.search(r"\(her first reference\): (.+?), with ",o[i:j]); assert _own,"c2 own main colour"
        o=o[:i]+f"her OWN main colour {_own.group(1).replace(' silk like',' like')} stays clearly visible in large areas (inner skirt, sleeve linings and a few panels); "+o[j:]   # PALFIX c2: wine-crimson 2nd colour stays, her own main colour ALSO carried clearly
        rep("her colour is the second colour",O["secrule"]+" is the second colour")
    t8item,t8hk=age_item(c,"t8",*ITEMS[item_for(c)]); nitem,nhk=age_item(c,"nude",*NUDE_ITEM[c])                  # item slot + hand clause
    rep(f"she holds {t8item} in a contrasting colour",f"she holds {nitem} in a contrasting colour")
    i=o.index(" Her hands and body: ")+len(" Her hands and body: "); j=o.index(". Every hairpin is inserted")
    o=o[:i]+_hh(hand,nhk,right)+o[j:]
    o=o.replace("phoenixes","dragons").replace("phoenix","dragon")                                                  # motif slot word
    add=(" NỮ ĐẾ: she is the Female Emperor (Nữ đế), the highest rank of all, equal to the Empress in colour but clearly more majestic, and different in design from the Empress's robe: a woman's imperial ceremonial dragon robe, with "
         +O["sh"]+"; her crown is "+NUDE_CROWNS[int(c[1:])%len(NUDE_CROWNS)]+", and "+O["tas"]+", the bare forehead clean under them; the most majestic outfit of all.")
    rep(" COLOUR RULE:",add+" "+NUDE3_HHSENT+" COLOUR RULE:")                                                       # added sentences
    return o
# ---- N5d item 2: gen ledger (--log) + verifier (--verify) -------------------------------------------------
# --log   appends {ts, cmd, argv, prompt, refs, gen_id, magnific_prompt} to dev/art/gen_ledger.jsonl (gen_id / magnific_prompt null until filled)
# --refs  prints the A0 reference list (JSON) to stderr; the prompt on stdout stays byte-identical
# --verify LEDGER [--since TS]  re-runs every logged cmd, compares the fresh prompt with magnific_prompt (what Magnific really received), PASS/FAIL per line, exit 1 on any FAIL
import os
LEDGER=os.path.join(os.path.dirname(os.path.abspath(__file__)),"..","gen_ledger.jsonl")
REF_STYLE={"name":"style2_portraits_c01_c12 (owner-approved square portraits c01 pink + c12 green, redrawn in m09 style; FIGURE_GATE 19/11 ~02:55Z) = STYLE only","magnific_id":"6AbGv6EiJO","url":"https://ctm-img.victoria-tntt.workers.dev/img/_review/style-refs/style2_portraits_c01_c12.png"}
REF_SWATCH={"name":"royal-yellow swatch = colour only","magnific_id":"TdwDfOyVNR (OLD account: re-upload the CDN file on the current one)","url":"https://ctm-img.victoria-tntt.workers.dev/img/_review/swatch/royal_yellow_C2.png"}
REF_BDID={"name":"Bắc Địch princess rank-1 picture (img/_review/princess-sample/bacdich_a18_s1.png) = FACE + her own hair","magnific_id":"BhNIDfhoQR"}
REF_QP={"name":"BĐ Quý phi r3 gen (states-r11/bd_a18_t6_f2c_*.png) = costume + headdress ONLY","magnific_id":"KLpl1nHkqp (jade) / UPv97BAwny (sapphire)"}
def _reorder_refs(o):
    o=o.replace("The second reference image is style only","The FIRST_REF_TMP reference image is style only")
    o=o.replace("image 1 (her first reference)","image 2 (her second reference)")
    o=o.replace("first reference","second reference").replace("First reference","Second reference")
    return o.replace("FIRST_REF_TMP","first")
def gen_refs(argv,prompt):
    """A0 reference list (owner order): image 1 = style image, image 2 = her own live picture (face only; re-make states: her live tier+age picture), image 3 = royal swatch (only when the prompt carries the ROYAL3 sentence)."""
    a=[x for x in argv if not x.startswith("--")]; age=argv[argv.index("--age")+1] if "--age" in argv else "a18"
    own={"name":"own live t1 of %s at %s (a65 = her a65 t1 / live picture) = FACE only; re-make states: her live tier+age picture"%(a[0] if a else "?",age)}
    _id=a[0] if a else ""
    if kc_drawn(_id):   # B8 (owner Lượt 543/551; ROOT-51 old-ref clean-up): ONE identity ref = her set-B KC_REFS cut; never the style image 6AbGv6EiJO, never img/fig-*/hd t1
        if "--nostyle" not in argv: raise SystemExit(f"B8: {_id} uses ONE reference (her KC_REFS cut) -> build with --nostyle (the style image 6AbGv6EiJO is retired)")
        own={"name":f"her ONE identity reference = KC_REFS cut of {_id} (set B, python3 dev/art/kc_ref.py {_id})","magnific_id":KC_PEOPLE[_id]["ref_id"]}
    r=[{"image":1,**own}] if "--nostyle" in argv else [{"image":1,**REF_STYLE},{"image":2,**own}]   # ROOT-38: owner order 1 style, 2 own, 3 swatch
    if "--state" in argv and re.fullmatch(r"ty[1-8]|cold",argv[argv.index("--state")+1]) and "--nostyle" not in argv: r[0]={**r[0],"magnific_type":"style"}; r[1]={**r[1],"magnific_type":"image","name":"her live picture of this state+age (a65: her NEW 2K a51 re-make) = face + hairstyle"}   # TY0 fix2
    if "--bdq" in argv: r[1]={"image":2,**REF_BDID}   # F2: BD princess identity = face only
    if "Image 3 is only a colour reference" in prompt: r.append({"image":3,**REF_SWATCH})
    if "--bdq" in argv: r.append({"image":3,**REF_QP})   # F2: costume source = the approved old Quý phi picture
    if "Image 3 is only a costume reference" in prompt: r.append({"image":3,**MAMA_REF})
    if "Image 2 is only a costume reference" in prompt: r.append({"image":2,**MAMA_REF})   # ma ma one-ref (--nostyle): face = image 1, costume = image 2
    # D15 (owner Lượt 692+694, ROOT-56 pt 5): a51/a65 = + her OWN a36 picture (same rank/state) as the STYLE LOCK reference; number = the ordinal of the D15 sentence in the prompt
    # (second; third where image 2 is the royal swatch: with --nostyle the swatch is renumbered Image 3 -> Image 2 by store-all/build_all.py / nude-B/mk.py, listed so here). Id: --a36ref ID.
    if D15_STYLE in prompt or D15_STYLE3 in prompt:
        _a36=argv[argv.index("--a36ref")+1] if "--a36ref" in argv else "TO FILL: pass --a36ref <gen/cut id of her a36 picture of this same rank/state>"
        _n=3 if D15_STYLE3 in prompt else 2
        if "--nostyle" in argv and _n==3: r=[{**x,"image":2} if x.get("image")==3 and x.get("magnific_id")==REF_SWATCH["magnific_id"] else x for x in r]
        elif "--nostyle" not in argv: _n=len(r)+1   # style-image mode (retired, B8; new characters only): appended last
        r.append({"image":_n,"name":f"her OWN a36 picture of this same rank/state ({_id} a36) = STYLE LOCK reference only (D15: same drawing as her 36-year-old picture)","magnific_id":_a36})
    # K18 (owner Lượt 591, BW4): NEVER a live game file (img/fig-*, img/hd/*, any live img/ path) as a reference; refs only from our store (KC_REFS cut ids, store ids). --golden (frozen A/B reproduction) exempt.
    if "--golden" not in argv:
        _live=[x for x in r if is_live_ref(x)]
        if _live: print("REFUSED K18: live game file used as reference: "+"; ".join(str(x.get("url") or x.get("name")) for x in _live),file=sys.stderr); sys.exit(2)
    return r
def is_live_ref(x):
    """K18: a reference that points at a live game picture (img/ path outside img/_review and img/_keep, or a 'live …' / 'own live …' entry)."""
    u=str(x.get("url",""))+" "+str(x.get("magnific_id",""))
    return bool(re.search(r"(?:^|[/\s])img/(?!_review/|_keep/)",u)) or str(x.get("name","")).startswith(("live ","own live "))
def _run_cmd(argv):
    import subprocess
    r=subprocess.run([sys.executable,os.path.abspath(__file__)]+argv,capture_output=True,text=True,env={**os.environ,"PYTHONDONTWRITEBYTECODE":"1"})
    return r.returncode,r.stdout,r.stderr.strip()
def _legacy_master(out,mp):
    """a gen made BEFORE the B25 master block (MG1): PASS when master_common.apply(its prompt) == today's builder output (only the block differs)."""
    sys.path.insert(0,os.path.dirname(os.path.dirname(os.path.abspath(__file__)))); import master_common as _MC
    try: _lm=_MC.apply(_MC.legacy(mp.strip()))   # NOEAR (owner Lượt 1037): legacy() strips the old earring words; an unknown earring wording -> not the same prompt
    except AssertionError as _e:
        if str(_e).startswith("NOEAR"): return False
        raise
    return _lm==out.strip().replace(ELDER_M05_BRIDGE,"").replace(ELDER_M05_SENT,"")   # + C1/C5 (Lượt 779): old style clause / no elder bridge
def verify_ledger(path,since=None):
    import json
    bad=0; n=0
    for i,l in enumerate(open(path,encoding="utf-8"),1):
        if not l.strip(): continue
        e=json.loads(l)
        if since and e["ts"]<since: continue
        n+=1; tag="line %d %s %s"%(i,e["ts"],e["cmd"].split("build.py",1)[-1].strip())
        if not e.get("magnific_prompt"): print("FAIL",tag,"| magnific_prompt missing (painter: creations_get gen_id, then --log-fill)"); bad+=1; continue
        rc,out,err=_run_cmd(e["argv"])
        if rc: print("FAIL",tag,"| builder error:",err[-120:]); bad+=1
        elif out.strip()!=e["magnific_prompt"].strip() and not _legacy_master(out,e["magnific_prompt"]):
            k=next((j for j,(x,y) in enumerate(zip(out.strip(),e["magnific_prompt"].strip())) if x!=y),min(len(out.strip()),len(e["magnific_prompt"].strip())))
            print("FAIL",tag,"| Magnific prompt differs from the builder at char",k,": builder ...%r / magnific ...%r"%(out.strip()[max(0,k-30):k+40],e["magnific_prompt"].strip()[max(0,k-30):k+40])); bad+=1
        else: print("PASS",tag)
    print("%d lines, %d FAIL"%(n,bad)); return 1 if bad else 0
def log_gen(argv,prompt,gen_id=None,mprompt=None):
    import json,datetime
    e={"ts":datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),"cmd":"python3 dev/art/t8-prompt-B/build.py "+" ".join(argv),"argv":argv,"prompt":prompt,"refs":gen_refs(argv,prompt),"gen_id":gen_id,"magnific_prompt":mprompt}
    with open(LEDGER,"a",encoding="utf-8") as f: f.write(json.dumps(e,ensure_ascii=False)+"\n")
    return e
def log_fill(ts,gen_id,mprompt):
    import json
    L=[json.loads(l) for l in open(LEDGER,encoding="utf-8") if l.strip()]; hit=[e for e in L if e["ts"]==ts and not e.get("gen_id")]
    assert hit,"no unfilled ledger line with ts "+ts
    hit[0]["gen_id"]=gen_id; hit[0]["magnific_prompt"]=mprompt
    open(LEDGER,"w",encoding="utf-8").write("".join(json.dumps(e,ensure_ascii=False)+"\n" for e in L))
# B8 FACE WORDS (owner Lượt 543/551, ART_RULES B8; BW3): every person in dev/art/KC_REFS.json with m09_ok yes (m01-m52 thiếu nữ v3, nc1-nc3 Lượt 570)
# gets her KC_REFS face_words VERBATIM as the face line: every builder writes "Her face: {face}." -> face = face_words without "Her face: " and the final ".".
# People NOT drawn (m09_ok NO: c01-c32, p01-p03, bd1-bd3) are refused by the CLI below (exit 2), so nobody paints them on old refs. --golden (frozen A/B reproduction) exempt.
import json as _json
KC_PEOPLE=_json.load(open(_os.path.join(_os.path.dirname(_os.path.dirname(_os.path.abspath(__file__))),"KC_REFS.json"),encoding="utf-8"))["people"]
def kc_drawn(c):
    p=KC_PEOPLE.get(c); return bool(p and p.get("m09_ok")=="yes" and (p.get("face_words") or "").startswith("Her face: "))
for _c in list(DATA):
    if kc_drawn(_c):
        _fw=KC_PEOPLE[_c]["face_words"]; assert _fw.endswith("."),_c
        DATA[_c]=(DATA[_c][0],_fw[len("Her face: "):-1])
KC_ID=re.compile(r"(?:c|m|p|s)\d\d|nc\d|bd\d")
# FLOWER EMBROIDERY = HER HAIR FLOWER (owner Lượt 1303, B26FAB JOB 2): t1 Đáp ứng … t6 Quý phi (thường phục) – every FLOWER species word in the Outfit sentence's embroidery
# becomes her OWN hair-flower species (MOTIF_LOW[c][1], the flower she wears at t1–t3). Birds, butterflies, clouds, leaves, fruit and other non-flower motifs stay; generic
# 'flower' words (gold flower studs, gold flowers in the headdress) stay; the hair flower itself is not touched. t7/t8 untouched. People whose hair flower names no species
# ('a pink silk flower') keep their embroidery (HAIRFL_NONE). Words only; nothing is added or cut except a doubled 'X and X' after the swap -> 'X'.
HAIRFL={"an orchid":("orchid","orchids","lan"),"a white jasmine sprig":("jasmine","jasmine blossoms","nhài"),"a plum blossom":("plum blossom","plum blossoms","mai"),
 "a white plum blossom":("plum blossom","plum blossoms","mai"),"a peach blossom":("peach blossom","peach blossoms","đào"),"a camellia":("camellia","camellias","trà"),
 "a red camellia":("camellia","camellias","trà"),"a pink peony":("peony","peonies","mẫu đơn"),"a lotus":("lotus","lotus flowers","sen"),
 "a pale magnolia":("magnolia","magnolias","mộc lan"),"a begonia":("begonia","begonias","hải đường"),"a red rose":("rose","roses","hồng"),
 "a purple wisteria sprig":("wisteria","wisteria","tử đằng")}
HAIRFL_NONE=("a pink silk flower",)
# F2 NEW TABLE (owner DUYỆT Lượt 1352, FLORA1 table dev/handover/reports/FLORA1.md: petal count rises strictly with rank): hair flower t1–t6 = F2_FL[t][(n-1)%5],
# n = the number in her id (c07 -> 7, as owner-copy/pr-night-1119/mk.py); embroidery flower t1–t6 = the same species; t7 HQP / t8 HH embroidery = her t6 species
# (owner Lượt 1342; still NO hair flower at t7/t8). Entries = (singular, plural, VN label); short builder names of FLORA1's prompt words (petal form kept, colour left
# to F3 'flower colour suits her outfit'). Replaces JOB 2's MOTIF_LOW species (one per person) — every person now has a species (the 17 'pink silk flower' included).
F2_FL={1:[("osmanthus cluster","osmanthus clusters","quế"),("lilac flower","lilac flowers","tử đinh hương"),("pear blossom","pear blossoms","lê"),
          ("single peach blossom","single peach blossoms","đào đơn"),("plum blossom","plum blossoms","mai đỏ")],
       2:[("cymbidium orchid","cymbidium orchids","lan"),("tiger lily","tiger lilies","ly hổ"),("narcissus flower","narcissus flowers","thủy tiên"),
          ("lily magnolia","lily magnolias","mộc lan tím"),("pomegranate flower","pomegranate flowers","lựu")],
       3:[("michelia blossom","michelia blossoms","ngọc lan"),("semi-double China rose","semi-double China roses","hồng nguyệt quý"),
          ("double azalea","double azaleas","đỗ quyên kép"),("semi-double rose of Sharon","semi-double rose-of-Sharon flowers","mộc cận kép"),
          ("wintersweet blossom","wintersweet blossoms","lạp mai")],
       4:[("epiphyllum (queen of the night) flower","epiphyllum flowers","quỳnh"),("lotus flower","lotus flowers","sen hồng"),
          ("double peach blossom","double peach blossoms","bích đào"),("double kerria pompon","double kerria pompons","đệ đường kép"),
          ("double daylily","double daylilies","huyên thảo kép")],
       5:[("formal double camellia","formal double camellias","trà kép trắng"),("double hollyhock","double hollyhocks","thục quỳ kép"),
          ("tea-scented China rose","tea-scented China roses","hồng trà vàng"),("double cotton-rose hibiscus","double cotton-rose hibiscus flowers","phù dung kép"),
          ("double gardenia","double gardenias","dành dành kép")],
       6:[("centifolia hundred-petal rose","centifolia hundred-petal roses","hồng bách diệp"),("formal double thousand-petal camellia","formal double thousand-petal camellias","trà ngàn cánh"),
          ("thousand-petal lotus","thousand-petal lotuses","sen ngàn cánh"),("mophead hydrangea","mophead hydrangeas","cẩm tú cầu"),
          ("double crabapple blossom","double crabapple blossoms","hải đường kép")],   # BUILDFIX1: F19 (4) (owner L1723/L1726): no chrysanthemum, no peony at t6
       7:[("bomb-form herbaceous peony","bomb-form herbaceous peonies","thược dược cầu")]*5,   # F19 (3): t7 HQP embroidery = bomb-form herbaceous peony
       8:[("tree peony","tree peonies","mẫu đơn")]*5}   # F19 (3): t8 HH embroidery = tree peony
def f2_n(c):
    m=re.fullmatch(r"[a-z]+(\d+)",c or ""); return int(m.group(1)) if m else None
# flower species words as they occur in the t1–t6 outfits (plural forms first, then the adjective/singular form used in 'peony medallions', 'lotus scrolls' …)
FLOWER_PL=["snowflake plum blossoms","pomegranate flowers","lilies of the valley","lotus flowers","plum blossoms","peach blossoms","pear blossoms","jasmine blossoms",
 "chrysanthemums","peonies","orchids","camellias","magnolias","begonias","roses","osmanthus","wisteria"]
FLOWER_SG=["plum blossom","peach blossom","pear blossom","chrysanthemum","peony","orchid","camellia","magnolia","begonia","lotus"]   # 'rose' never as a source: it is a colour word (rose pink, dusty rose)
_FL_RX=re.compile(r"(?<![-\w])("+"|".join(re.escape(w) for w in FLOWER_PL+FLOWER_SG)+r")\b(?! leaves| purple| pink| lilac| red|-)")   # colour names (orchid purple, lotus pink, wisteria lilac) and leaves stay
def hairflower_species(c,t):
    """F2 (Lượt 1352): her species at rank t (t7/t8 -> her t6 species, embroidery only)."""
    n=f2_n(c)
    if not n or not isinstance(t,int) or not 1<=t<=8: return None
    return F2_FL[t][(n-1)%5]   # BUILDFIX1: t7/t8 = their own F19 (3) peony (was the t6 species)
def flower_outfit(o,c,t):
    sp=hairflower_species(c,t)
    if not sp or "Outfit (" not in o: return o
    i=o.index("Outfit ("); j=o.find(". ",i); j=len(o) if j<0 else j
    seg=o[i:j]
    _tok=[]   # protect words already = her species (the t1–t3 hair-flower clause, F2 names holding 'lotus'/'peony' …) from a second swap
    def _prot(m): _tok.append(m.group(0)); return f"\x00{len(_tok)-1}\x00"
    seg=re.sub(r"fresh flower \([^)]*\)|"+"|".join(re.escape(x) for x in (sp[1],sp[0])),_prot,seg)
    def rep(m):
        w=m.group(1)
        return sp[1] if w in FLOWER_PL else sp[0]
    new=_FL_RX.sub(rep,seg)
    new=re.sub(r"\x00(\d+)\x00",lambda m:_tok[int(m.group(1))],new)
    for f in (sp[1],):   # 'plum blossoms and plum blossoms' -> 'plum blossoms'
        new=new.replace(f+" and "+f,f).replace(f+", "+f+",",f+",")
    return o[:i]+new+o[j:]

# B26 FABRIC ĐOẠN MỜ (owner Lượt 1283 + CORRECTION 1284; words = owner-approved m11 test dev/art/seasons4/m11_t4_VAI_DOAN.txt, Lượt 1275): t4 Tần / t5 Phi robe = satin (đoạn).
# ONLY the robe's fabric word changes (as in the m11 file: 'a layered satin (đoạn) robe', 'the robe itself is clearly <main> satin'); every detail (capelet, capes,
# embroidery, cuffs, girdle, pendants, shawl, headdress) is kept word for word; brocade cuffs / gold brocade girdle trims stay (details). Master M06 -> DOAN in master_common.
DOAN_SWAPS=[("a layered silk robe of two or three visible layers","a layered satin (đoạn) robe of two or three visible layers"),   # t4 Tần (m11 test words)
            ("a layered silk brocade court robe of two or three visible layers","a layered satin (đoạn) court robe of two or three visible layers")]   # t5 Phi
DOAN_MAIN_RX=re.compile(r"(the robe itself is clearly [^,;.]+?) silk\b")
def doan_outfit(o):
    n=0
    for a,b in DOAN_SWAPS:
        if a in o: o=o.replace(a,b,1); n+=1
    o,k=DOAN_MAIN_RX.subn(r"\1 satin",o,count=1)
    return o
if __name__=="__main__":
    if "--verify" in sys.argv:
        i=sys.argv.index("--verify"); _since=sys.argv[sys.argv.index("--since")+1] if "--since" in sys.argv else None
        sys.exit(verify_ledger(sys.argv[i+1],_since))
    if "--log-fill" in sys.argv:   # --log-fill TS GEN_ID MAGNIFIC_PROMPT_FILE
        i=sys.argv.index("--log-fill"); log_fill(sys.argv[i+1],sys.argv[i+2],open(sys.argv[i+3],encoding="utf-8").read().strip()); sys.exit(0)
    _RAW=[x for x in sys.argv[1:]]
    for _f in ('--gen-id','--mprompt','--a36ref'):   # value flags of --log: strip so the value is not read as a person id
        if _f in sys.argv: _i=sys.argv.index(_f); sys.argv[_i:_i+2]=[]
    NUDE2=None
    if "--nudeopt" in sys.argv: i=sys.argv.index("--nudeopt"); NUDE_OPTSEL=sys.argv[i+1]; sys.argv[i:i+2]=[]
    if NUDE_OPTSEL=="auto": NUDE_OPTSEL=NUDE_OPTMAP[[x for x in sys.argv[1:] if not x.startswith("--")][0]]
    if "--bdopt" in sys.argv: i=sys.argv.index("--bdopt"); BDOPT=sys.argv[i+1]; sys.argv[i:i+2]=[]
    if "--nude2" in sys.argv: i=sys.argv.index("--nude2"); NUDE2=sys.argv[i+1]; sys.argv[i:i+2]=[]
    if "--age" in sys.argv: AGE=sys.argv[sys.argv.index("--age")+1]; sys.argv[sys.argv.index("--age"):sys.argv.index("--age")+2]=[]
    STATE=None
    if "--state" in sys.argv: i=sys.argv.index("--state"); STATE=sys.argv[i+1]; sys.argv[i:i+2]=["--state"]
    LOWN=None
    if "--low" in sys.argv: i=sys.argv.index("--low"); LOWN=int(sys.argv[i+1]); sys.argv[i:i+2]=["--low"]
    if "--bditem" in sys.argv: i=sys.argv.index("--bditem"); BDITEM=sys.argv[i+1]; sys.argv[i:i+2]=[]
    BDQ=None
    if "--bdq" in sys.argv: i=sys.argv.index("--bdq"); BDQ=sys.argv[i+1]; sys.argv[i:i+2]=[]
    TRIEUN=None
    if "--trieu" in sys.argv: i=sys.argv.index("--trieu"); TRIEUN=int(sys.argv[i+1]); sys.argv[i:i+2]=["--trieu"]
    a=[x for x in sys.argv[1:] if not x.startswith("--")]
    if __name__=="__main__" and not BDQ and a and KC_ID.fullmatch(a[0]) and not kc_drawn(a[0]) and "--golden" not in sys.argv:   # B8 (BW3): NOT drawn -> refuse (real CLI only; store-all/build_all.py execs this block in-process for frame sentences and refuses on its own)
        sys.stderr.write(f"REFUSED {a[0]}: NOT drawn (ART_RULES B8: no approved thiếu nữ reference in dev/art/KC_REFS.json; python3 dev/art/kc_ref.py {a[0]})\n"); sys.exit(2)
    _o=build_bdq(BDQ) if BDQ else build_state(a[0],STATE,a[1] if len(a)>1 else "v0") if STATE else (build_trieu8(a[0],a[1] if len(a)>1 else "v0") if TRIEUN==8 else build_trieu(a[0],TRIEUN,a[1] if len(a)>1 else "v0")) if "--trieu" in sys.argv else build_low(a[0],LOWN,a[1] if len(a)>1 else "v0") if "--low" in sys.argv else build_t7(a[0],a[1] if len(a)>1 else "v0") if "--t7" in sys.argv else build(a[0],a[1] if len(a)>1 else "v0","--golden" in sys.argv)
    if "--spec5pose" in sys.argv:
        _t=LOWN if "--low" in sys.argv else 7 if "--t7" in sys.argv else int(STATE[2:]) if STATE and STATE[:2]=="ty" else max(1,int(STATE[2])) if STATE and re.fullmatch(r"tm[0-4]",STATE) else 1 if STATE=="cold" else 8   # N5d item 4: trung y tN poses at rank N, cold at the lowest
        _o=spec5pose(_o,a[0],_t)
    if "--golden" not in sys.argv and __name__=="__main__" and not ((("--low" in sys.argv and not STATE and not TRIEUN) or STATE=="kc") and AGE in _PETS.AGES): _o=_PETS.depet(_o)   # F17 PETS (owner Lượt 1057/1059): animal pose words only at a18/a26, ranks 1–6 / khuê các
    if STATE and re.fullmatch(r"ty[1-8]|cold",STATE): assert _o.count(TYC_PIN_RULE)==1; _o=_o.replace(TYC_PIN_RULE,"",1)   # TY0 fix2: her own (often horizontal) pin from image 2 stays
    if "--nostyle" in sys.argv:   # owner 18/11 ~22:30Z: only her own identity image is a reference, no style image -> drop ONLY the style-reference sentence
        _st=" The style reference image is only for skin, drawing style, fabric and embroidery: never copy its face, body or pose."
        assert _st in _o,"style sentence not found"
        _o=_o.replace(_st,"",1)
        if STATE=="mama": _o=re.sub(r"\b([Ii])mage 3\b",r"\1mage 2",_o)   # MMX1 (owner Lượt 479 ONE-REF for ma ma, FIGURE_GATE 11-12): no style image -> image 1 = her own face picture, the costume picture becomes image 2 (same renumber as consorts t2-t8 in store-all/build_all.py)
    # a51 DARK (Foreman C ROOT-30, owner 23:05Z "màu tối giống như là ma hoặc là Thái hậu"): W90 found the shared "fresh, clear and luminous" clause kept c13 a51 bright; a51 only swaps it, every other age byte-identical
    # OWNER 18/11 ~21:06Z real (verbatim): "51 tuổi và 65 tuổi là phải dùng của những cái màu của những người già xài á, không có dùng cái màu tươi rói nha ... mặc dù già nhưng không có nghĩa là màu đen hay màu nâu ... Mà nó là một cái màu nó sang, mà cái kiểu mình nhìn vô mình thấy nó là một cái người đã lớn tuổi, trầm tĩnh lớn tuổi" → a51 AND a65 use the elder clause (a51 text = the approved a51d2 sample)
    if AGE not in ("a51","a65") and not STATE or STATE in ("nude","thaihau"):   # TH1 (Lượt 607 I4): Thái hậu a36 gets the same B18 LOW_TONE   # B18 (owner Lượt 583): neutral tone: t7/t8/Nữ đế 'fresh, clear and luminous' -> the SAME medium-tone sentence t1-t6 use (LOW_TONE); a51/a65 keep their elder clause below
        if AGE not in ("a51","a65") and TRIEUN is None and not BDQ and "--low" not in sys.argv: _o=_o.replace("all colours fresh, clear and luminous, never dusty or greyed; ",LOW_TONE,1)
    if AGE in ("a51","a65"): _o=_o.replace("all colours fresh, clear and luminous, never dusty or greyed; ","all colours in the DEEPER, DARKER mature shades described above (rich and dignified, never bright, never pastel, never dusty or washed-out); the colour names and hex values below are her young colours, darken them as described above; "+("elegant, luxurious elder colours that read as a calm, dignified older lady, never vivid or fresh bright colours, yet never black or brown; " if AGE=="a65" else "")+ELDER_M05_BRIDGE).replace("one fresh accent","one accent").replace("a fresh ","a ")
    # --head (ROOT-31 order, owner 18/11 ~21:36Z "ai cũng có trâm cài y chang nhau"): per-person headdress = the motif/shape of HER OWN live a18 hairpins, scaled up for the rank. Off by default (goldens unchanged).
    if "--head" in sys.argv:
        _k=a[0]+("-t7" if "--t7" in sys.argv else "-t8")
        if _k in HEAD:
            _old8="a FULL tall imperial nine-phoenix crown, clearly taller and wider than a noble consort's crown, with a large central gold phoenix holding a pearl string in its beak, jewelled wings spreading wide on both sides, kingfisher-blue inlay, rubies and pearls, and a few clean pearl tassels at the sides;"
            _old7="(one large gold phoenix with spreading wings, grander and taller than a noble consort's headdress, but clearly simpler than the Empress's nine-phoenix crown) with pearl strands, kingfisher-blue inlay and a few gold tassels."
            _n=_o.count(_old8)+_o.count(_old7); assert _n==1,("head slot not found",_n)
            _o=_o.replace(_old8,"a FULL tall imperial crown, clearly taller and wider than a noble consort's crown, "+HEAD[_k]+";").replace(_old7,HEAD[_k]+".")
    if NUDE2: _o=nude2(_o,a[0],NUDE2)
    if "--nude3" in _RAW: _o=nude3(_o,a[0])
    if (STATE=="nude" or "--nude3" in _RAW or "--golden" in sys.argv) and AGE in ("a51","a65") and " "+D15_STYLE in _o: assert _o.count(" "+D15_STYLE)==1,"D15 nude strip"; _o=_o.replace(" "+D15_STYLE,"",1)   # D15 (ROOT-56): Nữ đế EXCLUDED here (nude-B/mk.py owns it); --golden = frozen A/B reproduction, untouched
    # owner 18/11 ~22:55Z (FIGURE_GATE A0 REFERENCES): ROYAL cases (--trieu N>=6, --state nude, --state bd6) = 3 images, image 3 = royal-yellow swatch. One flag-independent sentence; every other output byte-identical.
    # N2 r10b (ROOT-33): bd6 keeps swatch as image 3 but its robe is teal with no royal-yellow part (FIGURE_GATE C8 has no yellow rule for Bắc Địch Quý phi) -> no image-3 sentence for bd6
    # W107 (ROOT-36, FIGURE_GATE A0 REFERENCES: ROYAL ranks Quý phi t6 and up = 3 images, image 3 = royal-yellow swatch): t6 (--low 6), t7 (--t7), t8 (default) get the SAME image-3 sentence, copied verbatim (elder variant at a51/a65 as for Nữ đế); --bdq (Bắc Địch, no royal yellow) excluded
    _ROYRANK=(not STATE and TRIEUN is None and not BDQ and (LOWN==6 if "--low" in sys.argv else True))
    if (TRIEUN is not None and TRIEUN>=6) or STATE=="nude" or _ROYRANK:   # F2 r2 (ROOT-39 19/11 ~03:14Z): --bdq has NO swatch and NO image-3 sentence (the old QP had none; copy it whole)
        _r=" Image 3 is only a colour reference for the royal yellow, never copy anything but its colour; the royal yellow in the robe is exactly that colour."
        assert _o.count(END)==1 and _o.endswith(END),"END not at end"
        if (STATE=="nude" or _ROYRANK) and AGE in ("a51","a65"): _r=" Image 3 is only a colour reference for the royal yellow, never copy anything but its colour; her yellow is that royal yellow in its deeper, subdued antique-gold elder shade as the colour rule says."   # N4 1c
        _o=_o[:-len(END)]+_r+END
        if "--nostyle" in sys.argv and D15_STYLE in _o: _o=_o.replace(D15_STYLE,D15_STYLE3,1)   # D15 (ROOT-56 pt 4): image 2 = royal swatch (Image 3 -> 2 one-ref renumber) -> her a36 picture = image 3; ONLY the ordinal word changes
    # N4b (ROOT-35 / owner via brief UPDATE: "Keep the a65 yellow as soft as the a51 (no ochre/mustard)"): Nữ đế a65 only; every other output byte-identical
    # N4b (Nữ đế a65 "same soft antique gold as at 51") REMOVED by BW5 (owner Lượt 624 / ROOT-53): contradicts the verbatim 18/11 a65 text "the royal yellow becomes a deeper antique gold"
    # N5d item 1: K3_BG on every output. trieu already carried the old K3 wording -> replaced (never two K3 sentences). --nostyle = no style image: "second reference image is style only" would be false -> only the IGNORE-background part.
    _k3=K3_BG
    if "--nostyle" in sys.argv: _k3=_k3.replace("The second reference image is style only: IGNORE its background","IGNORE the reference image's background",1)
    if K3_BG_OLD in _o: assert _o.count(K3_BG_OLD)==1; _o=_o.replace(K3_BG_OLD,"",1)
    assert _o.count("IGNORE")==0 or "--golden" in sys.argv,"K3 already present"
    # C2 (owner Lượt 780 = B9 GEN METHOD via ROOT-57, MG2): NO transparent-background sentence any more: drawn on the plain light parchment (master M03, the ONLY background sentence),
    # then images_remove_background. K3_BG / K3_BG_OLD kept above only so old texts can be recognised; never added to an output.
    if "--golden" not in sys.argv and a and kc_drawn(a[0]):   # B8 (ROOT-51, TN4 m13): her KC face words name her own eyes (e.g. m13 "long PHOENIX eyes clearly upturned") -> the generic END eye clause contradicts them: dropped for KC people only
        _eye=" Eyes soft, warm and round-almond, never slanted or upturned, never teary."; assert _o.count(_eye)==1,"END eye clause"; _o=_o.replace(_eye,"",1); END=END.replace(_eye,"",1)
    if "--golden" not in sys.argv: assert _o.endswith(END) and D9_FOREHEAD not in _o,"D9"; _o=_o[:-len(END)]+D9_FOREHEAD+END   # D9 (Lượt 529): owner words verbatim, every output, right before END = frozen A/B reproduction (golden/pB_*.txt), never a gen mode
    # ROOT-38 REF ORDER (owner A0 REFERENCES l.16): image 1 = style image, image 2 = her own face/live picture, image 3 = royal swatch.
    # Approved texts keep their old numbering in source; only the ordinal words are renumbered here (style first <-> identity second). --nostyle / --golden: unchanged.
    if "--nostyle" not in sys.argv and "--golden" not in sys.argv: _o=_reorder_refs(_o)
    # F4b-3/4 ANGLE, EVERY path (ROOT-40 19/11 ~03:55Z; owner Lượt 225/229/236-237 "đứng thẳng trực diện luôn, nhìn không có duyên dáng ... cái prompt tư thế của mày rất là cứng"; FIGURE_GATE ANGLE LAW (A)):
    # dead-frontal words removed from every output (low t1-t6, t7, t8, kc/ngheo, ty/cold, tm*, mama, trieu, bdq, nude). ONE wording, COPIED from approved prompts only:
    # header = Nữ đế A "face clearly visible, 3/4 or frontal view."; odd spec5 slots = HH B "body turned slightly three-quarters to the right"; else nothing (A's pose has no angle words).
    # --golden (frozen reproduction) untouched. build_npc.py (imports PRE) untouched.
    if "--golden" not in sys.argv:
        _o=_o.replace("face clearly visible, body and face frontal, standing squarely facing the viewer, no turn.","face clearly visible, 3/4 or frontal view.")
        _t34=", body turned slightly three-quarters to the right" if globals().get("SP5_ODD") else ""
        for _ph in (", body and face frontal, standing squarely facing the viewer, no turn",", body and face frontal, facing the viewer squarely, no turn"):
            while _ph in _o: _o=_o.replace(_ph,_t34,1); _t34=""
    # OWNER REFERENCE LAW (ROOT-51 -> BW4, from MMX4): the identity sentence keeps ONLY face, facial features, hair COLOUR and signature colour family; the HAIRSTYLE comes
    # from the rank/age hair line (F11), never from the thiếu-nữ ref (loose hair). Every mode (consort t1-t8, Nữ đế, triều, states, maids, ma ma); --golden (frozen A/B) exempt.
    if "--golden" not in sys.argv:
        _o,_n=IDENT_RX.subn(IDENT_LAW,_o)
        assert "hairstyle colour" not in _o and "her own hairstyle (the same" not in _o,"identity sentence variant not covered: "+_o[max(0,_o.find("hairstyle")-200):_o.find("hairstyle")+80]
    # C5 (owner Lượt 779/784, MG2): EVERY a51/a65 lady prompt except Nữ đế (B23) says her elder colours win over master M05. Paths with the S33 COLOUR RULE got the clause above;
    # the others (ma ma, triều, cung nữ/nữ quan states ...) get ELDER_M05_SENT right after her age text (AGE_TXT, which holds the 'DEEPER, DARKER ... older lady' colour words).
    if AGE in ("a51","a65") and STATE!="nude" and "--nude3" not in _RAW and "--golden" not in sys.argv and ELDER_M05_BRIDGE not in _o and ELDER_M05_SENT.strip() not in _o:
        if AGE_TXT[AGE] in _o: _o=_o.replace(AGE_TXT[AGE],AGE_TXT[AGE]+ELDER_M05_SENT,1)
        else:
            _m=re.search(r"[^.]*DEEPER, DARKER[^.]*\.",_o)
            if _m: _o=_o[:_m.end()]+ELDER_M05_SENT+_o[_m.end():]
    if "--golden" not in sys.argv and os.environ.get("CTM_MASTER_LATER")!="1":   # B25 ONE MASTER COMMON BLOCK (owner Lượt 745/766, MG1): dev/art/MASTER_COMMON.txt verbatim, every output (golden = frozen reproduction, exempt; CTM_MASTER_LATER=1 = a post-editing caller (nude-B/mk.py) applies it as ITS last step; check_store FAILs any prompt without it)
        sys.path.insert(0,os.path.dirname(os.path.dirname(os.path.abspath(__file__)))); import master_common as _MC
        _PRIN=bool(a) and a[0] in ("p01","p02","p03","bt","cl","pt")
        _HIGH=(STATE in ("nude","thaihau")) or (TRIEUN is not None and TRIEUN>=6) or (not STATE and TRIEUN is None and not BDQ and ((LOWN if "--low" in sys.argv else 7 if "--t7" in sys.argv else 8)>=(7 if _PRIN else 6)))   # B12 (owner Lượt 781, MG2): fabric by rank
        if _HIGH and (STATE=="thaihau" or TRIEUN is not None) and _MC.BROCADE not in _o:   # B12: triều t6-t8 / Thái hậu state get the store prompt-B fabric sentence right before Pose (thường phục t6-t8: store-all/build_all.py laws)
            assert _o.count(" Pose:")==1,"B12 pose anchor"; _o=_o.replace(" Pose:"," "+_MC.BROCADE+" Pose:",1)
        _DOAN=(not _HIGH) and not STATE and TRIEUN is None and not BDQ and "--low" in sys.argv and LOWN in (4,5)   # B26 (owner Lượt 1283/1284): t4 Tần + t5 Phi = matte satin đoạn
        if _DOAN: _o=doan_outfit(_o)
        if (not _HIGH or LOWN==6) and not STATE and TRIEUN is None and not BDQ and "--low" in sys.argv and LOWN in (1,2,3,4,5,6): _o=flower_outfit(_o,a[0],LOWN)
        if not STATE and TRIEUN is None and not BDQ and "--low" not in sys.argv and not any(x.startswith("--nude") for x in sys.argv): _o=flower_outfit(_o,a[0],7 if "--t7" in sys.argv else 8)   # owner Lượt 1342: t7/t8 embroidery = her t6 F2 species (no hair flower)   # owner Lượt 1303: embroidery flower = her hair flower, t1–t6
        _o=_MC.apply(_o,high=_HIGH,doan=_DOAN)
    print(_o,end="")
    _lg=[x for x in _RAW if x not in ("--log","--refs")]
    if "--gen-id" in _lg: _i=_lg.index("--gen-id"); _gid=_lg[_i+1]; _lg[_i:_i+2]=[]
    else: _gid=None
    if "--mprompt" in _lg: _i=_lg.index("--mprompt"); _mp=open(_lg[_i+1],encoding="utf-8").read().strip(); _lg[_i:_i+2]=[]
    else: _mp=None
    if "--refs" in _RAW:
        import json; print(json.dumps(gen_refs(_lg,_o),ensure_ascii=False,indent=1),file=sys.stderr)
    if "--log" in _RAW: log_gen(_lg,_o,_gid,_mp)

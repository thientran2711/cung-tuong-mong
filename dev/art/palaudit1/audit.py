#!/usr/bin/env python3
"""PALAUDIT1 (owner L1405): colour words in prompts minus the person's palette (B20 palettes_season.json + her builder colours) minus allowed classes
-> LEFTOVER, grouped by template sentence. READ ONLY."""
import sys,os,re,json,collections,glob
HERE=os.path.dirname(os.path.abspath(__file__)); ART=os.path.dirname(HERE); REPO=os.path.dirname(os.path.dirname(ART))
PAL=json.load(open(os.path.join(ART,"face-common","palettes_season.json"),encoding="utf-8"))
HUES="""pink rose rosy plum lilac lavender mint teal blue yellow cream ivory beige red crimson coral peach apricot green jade purple violet gold golden gilt silver white black grey gray
brown persimmon orange scarlet vermilion magenta fuchsia turquoise aqua cyan navy indigo sapphire emerald olive khaki tan champagne amber ochre rust wine burgundy maroon mauve taupe
sage moss celadon cerulean azure cobalt ruby cherry salmon lemon saffron mustard honey butter sand charcoal ebony pearl snow milk cinnabar blush lotus peony wisteria orchid lilac
smoke dove pewter bronze copper vanilla buttercream jasmine pistachio seafoam aquamarine periwinkle cornflower hydrangea iris heather mulberry raspberry strawberry watermelon
pomegranate camellia magnolia sakura petal""".split()
HUES=set(HUES)-{"iris","petal","lotus","peony","camellia","magnolia","sakura","jasmine","honey","sand","snow","milk","smoke","dove","heather","wisteria","orchid","hydrangea","cornflower"}  # flower/object words: counted only as part of a hue phrase
FLOWERISH={"lotus","peony","camellia","magnolia","sakura","jasmine","wisteria","orchid","hydrangea","cornflower","honey","sand","snow","milk","smoke","dove","heather"}
HEX=re.compile(r"#[0-9A-Fa-f]{6}\b")
WORD=re.compile(r"[A-Za-zÀ-ỹ]+")
B24_HEX={"#EAE3D0","#7FB394","#7E9CCB","#E3A3B8","#A88BCB","#E3A25B","#D46A64","#EFBD69","#F2BC61"}
NEG=re.compile(r"\b(never|no|not|without|nor|avoid|instead of|rather than|free of|ban|banned|other than|dead|old)\b",re.I)
CTX={
 "winter fur ivory (G26)": r"fur trim|no coloured fur|plain ivory at every rank",
 "colour-rule text (describes tone, not a colour used)": r"COLOUR RULE: all colours clear|a soft ivory, never heavy",
 "body (skin/hair/eyes/lips)": r"\b(skin|hair|eyes?|eyebrows?|brows?|lips?|cheeks?|teeth|iris|pupils?|lashes|nails?|complexion|blush|makeup|rouge)\b",
 "background (parchment, B9)": r"\b(background|parchment|backdrop)\b",
 "jewellery / metal / embroidery accent (B15 thin accents)": r"\b(hairpins?|pins?|jewel\w*|earrings?|bracelets?|bangles?|necklace|crown|coronet|diadem|tiara|ornaments?|filigree|embroider\w*|thread\w*|trim\w*|accents?|phoenix\w*|buyao|tassels?|combs?|pendants?|rings?|beads?|metal\w*|leaf|leaves|clasp|buckle|piping|edging|stitch\w*|brocade|motifs?|patterns?|sequins?|chains?|gems?|stones?|filament|plaques?|medallion|frets?|inlay|band|crown|tassels?|strands?|rubies|kingfisher)\b",
 "rank colour (B24/K13/L1)": r"\b(rank colour|rank color|rank band|rank bands|tier|trung y|frame|badge|halo|rank accent|rank-colour)\b",
 "royal yellow (B17/B21/B22)": r"royal[- ](golden[- ])?yellow|antique[- ]gold|#EFBD69|#F2BC61|less golden|than the Empress|honey-gold",
 "held item (B16/E5)": r"\b(holds?|holding|held|grips?|item|carries|carrying|in her hands?|fan|parasol|umbrella|scroll|flute|lantern|basket|book|brush|mirror|sachet|handkerchief|pet|cat|dog|bird|rabbit)\b",
 "flower / nature object": r"\b(flowers?|blossoms?|petals?|buds?|peony|lotus|plum blossom|orchid|chrysanthemum|camellia|leaves|branch)\b",
 "maid / role uniform": r"\b(maid|cung nữ|ma ma|eunuch|uniform|servant)\b",
 "fabric quality (sheer / gauze, no hue)": r"\b(sheen|lustre|luster|shimmer)\b",
}
def toks(s): return {w.lower() for w in WORD.findall(s or "")}
DEEP=json.load(open(os.path.join(ART,"face-common","palettes_season_deep.json"),encoding="utf-8"))
def pal_of(pid):
    """(words, hexes) for every season of this person in palettes_season.json (B20) + palettes_season_deep.json (P6/A32, owner L1042)"""
    W=set(); H=set(); bys={}
    for d in (PAL.get(pid),DEEP.get(pid)):
      if not isinstance(d,dict): continue
      if True:
        for s,v in d.items():
            if not isinstance(v,dict): continue
            items=[v]+([v["root_drawn"]] if isinstance(v.get("root_drawn"),dict) else [])
            for it in items:
                for k in ("main","sec","secondary"): W|=toks(it.get(k))
                for k in ("main_hex","sec_hex","secondary_hex"):
                    if it.get(k): H.add(it[k].upper())
            o=bys.get(s,(set(),set()))
            bys[s]=(o[0]|toks(v.get("main"))|toks(v.get("sec")), o[1]|{x.upper() for x in (v.get("main_hex"),v.get("sec_hex")) if x})
    return W,H,bys
def sentences(t):
    return [x.strip() for x in re.split(r"(?<=[.;!?])\s+|\n+",t) if x.strip()]
def colour_hits(sent):
    """yield (term, start) — hue word with up to 2 modifiers before it, plus hex codes"""
    ws=list(WORD.finditer(sent)); out=[]
    for i,m in enumerate(ws):
        w=m.group(0).lower()
        if w in HUES: out.append((w,m.start(),m.end()))
    for m in HEX.finditer(sent): out.append((m.group(0).upper(),m.start(),m.end()))
    return out
def classify(sent,term,a,b,rank):
    win=sent[max(0,a-90):b+90]
    pre=sent[max(0,a-60):a]
    if NEG.search(pre) or re.search(r"\blittle\s*$",pre): return "ban / negation (not a colour used)"
    if re.search(CTX["royal yellow (B17/B21/B22)"],win,re.I) and term in ("yellow","royal","gold","golden","#EFBD69","#F2BC61","antique"): return "royal yellow (B17/B21/B22)"
    if term in B24_HEX: return "rank colour (B24/K13/L1)"
    for k,rx in CTX.items():
        if k.startswith("royal"): continue
        if k.startswith("winter") or k.startswith("colour-rule"):
            if re.search(rx,sent,re.I) and term in ("ivory","white"): return k
            continue
        if re.search(rx,win,re.I):
            if k.startswith("jewellery") and term not in ("gold","golden","gilt","silver","jade","pearl","white","bronze","copper","pewter","black"):
                continue  # a hue (pink/blue..) next to 'embroidery' is still a hue -> keep checking other classes
            return k
    return None
def norm_template(sent,pw,phex):
    s=HEX.sub(lambda m: "{HEX}" if m.group(0).upper() in phex else m.group(0),sent)
    s=WORD.sub(lambda m: "{P}" if m.group(0).lower() in pw else m.group(0),s)
    return s
SLOT=re.compile(r"the MAIN colour ([^,;.:]{1,70}?) and the SECONDARY colour ([^,;:]{1,70}?)[,;.]")
def slot_words(p):
    ms=SLOT.findall(p); return ms[-1] if ms else ("","")
def audit(cells):
    """cells: iterable of dict(src, person, rank, season, prompt, extra_words, extra_hex). returns rows"""
    G=collections.defaultdict(lambda: {"cells":set(),"people":set(),"ex":None,"cls":collections.Counter()})
    stats=collections.Counter()
    for c in cells:
        pid=c.get("person") or ""; W,H,bys=pal_of(pid)
        sm,ss=slot_words(c["prompt"]); c["main"]=(c.get("main") or "")+" "+sm; c["sec"]=(c.get("sec") or "")+" "+ss
        if c.get("season_strict") and c["season_strict"] in bys: W,H=bys[c["season_strict"]]
        pw=W|toks(c.get("main"))|toks(c.get("sec"))|set(c.get("extra_words",())); ph=H|{x.upper() for x in HEX.findall((c.get("main") or "")+" "+(c.get("sec") or ""))}|set(c.get("extra_hex",()))
        for sent in sentences(c["prompt"]):
            for term,a,b in colour_hits(sent):
                stats["hits"]+=1
                if (term in pw) or (term in ph): stats["palette"]+=1; continue
                cls=classify(sent,term,a,b,c.get("rank"))
                key=(c["src"],term,cls or "LEFTOVER",norm_template(sent,pw,ph)[:400])
                g=G[key]; g["cells"].add(c["id"]); g["people"].add(pid); g["ex"]=g["ex"] or (c["id"],sent[:400])
                stats[cls or "LEFTOVER"]+=1
    return G,stats

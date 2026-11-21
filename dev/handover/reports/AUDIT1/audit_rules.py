import re,sys,json,os,glob,collections
R="/home/user/cung-tuong-mong"
L=json.load(open(R+"/dev/art/face-common/palettes_season.json")); F=json.load(open(R+"/dev/art/face-common/flower_colours_L2013.json"))
NEG=re.compile(r"\b(no|not|never|without|nothing|none|nor|avoid|instead of)\b",re.I)
HELD=re.compile(r"\b(holds?|holding|held|carr(y|ies|ying)|flute|fan|parasol|lantern|lamp|ball|ruyi|scroll|book|drum|letter|umbrella|cup|basket|mirror|pipa|qin|brush|whisk|hand)\b",re.I)
def clauses(t): return [c for c in re.split(r"(?<=[.;:!?])\s+|,\s+|\s+-\s+|\(|\)",t) if c.strip()]
def pos_hits(t,rx,held_ok=False):
    out=[]
    for c in clauses(t):
        m=re.search(rx,c,re.I)
        if not m: continue
        if NEG.search(c[:m.start()]): continue
        if held_ok and HELD.search(c): continue
        out.append(c.strip()[:140])
    return out
def chk(t,k,p=None,season=None):
    r={}
    r["G57 body pendant"]=pos_hits(t,r"\b(pendants?|yupei|zupei|jinbu|jade discs?|ngọc bội|tassel pendant)\b",held_ok=True)
    r["G59 sachet"]=pos_hits(t,r"\b(sachets?|túi thơm|scent pouch|perfume bag|hà bao|embroidered pouch|pouch)\b")
    r["G60 side bow"]=pos_hits(t,r"\b(bow|knot)\b[^.]{0,40}\b(to one side|at (her|one|the) (left |right )?hip|off-?cent(re|er)|at the side|side-tied)\b")
    bows=[b for b in re.findall(r"[^.]*\bbow\b[^.]*\.",re.sub(r"cupid.s bow","",t,flags=re.I),re.I)]
    r["G60 bow not centred"]=[] if not bows or re.search(r"cent(re|er)[ -]front|at the cent(re|er)|centred|centered|middle of",t,re.I) else [bows[0][:140]]
    r["G60 bow no long ties"]=[] if not bows or re.search(r"long[^.]{0,25}(ties|ribbons|streamers|ends)|trailing",t,re.I) else [bows[0][:140]]
    r["G61 front waist"]=pos_hits(t,r"\b(in front of (her|the) (waist|belly|stomach|lap)|before her waist|at (her|the) front waist|clasped at (her|the) waist|hands? (folded|clasped) (at|over|in front of) (her|the) (waist|belly))\b")
    if k<=3:
        r["G58/G65 big flower t1-3"]=pos_hits(t,r"\b(large|big|huge|bold|oversized|grand)\b[^.,;]{0,30}\b(flowers?|blossoms?|medallions?|roundels?|motifs?|peon(y|ies)|lotus|sprays?|blooms?)\b")
    r["G65 big motif on trim"]=pos_hits(t,r"\b(sleeve bands?|cuffs?|neckline bands?|front trims?|hem bands?|borders?|collar bands?)\b[^.]{0,50}\b(large|big|huge)\b[^.]{0,20}\b(flowers?|blossoms?|motifs?|medallions?)")
    if k>=6:
        r["G67 cloak t6-8"]=pos_hits(t,r"\b(open outer robe|outer robe|over-?robe|cloak|cape|mantle|open coat|outer coat|bei ?zi|phi phong)\b")
    if k==4:
        r["G68 Tần MEDIUM words missing"]=[] if re.search(r"a few MEDIUM embroidered",t) else ["(no 'a few MEDIUM embroidered')"]
        r["G68 old LARGE words"]=re.findall(r"a few LARGE embroidered[^.]{0,60}",t)
    if k==1:
        r["G69 t1 chest-centre flower missing"]=[] if re.search(r"cent(re|er) of (her|the) chest|chest[ -]cent(re|er)|middle of (her|the) chest",t,re.I) else ["(no chest-centre embroidery)"]
    r["F19 chrysanthemum"]=pos_hits(t,r"chrysanthemums?|hoa cúc")
    hs=[s for s in re.split(r"(?<=\.)\s+",t) if re.search(r"\bin (her|the) hair\b|hair flower|tucked (into|in) her hair|behind (her|one) ear",s,re.I) and re.search(r"flower|blossom|bloom|rose|lily|lotus|camellia|peony|lilac|magnolia|hibiscus|narcissus|azalea|orchid|plum|peach|pear|osmanthus|aster|kerria|daylily|hollyhock|hydrangea|michelia|wintersweet|epiphyllum|pomegranate",s,re.I) and not re.search(r"\bno (fresh )?(hair )?flowers?\b|never a flower|without (a )?flower",s,re.I)]
    if k>=7: r["F2 hair flower at t7/t8"]=[s[:140] for s in hs if not NEG.search(s[:40])]
    else:
        r["F19 hair flower has no 'bloom only/no leaves'"]=[] if (not hs) or re.search(r"bloom only|bloom ONLY|no leaves|NO leaves|without leaves",t) else [hs[0][:140]]
        r["F19 hair flower with leaf words"]=[c for s in hs for c in pos_hits(s,r"\b(leaf|leaves|leafy|sprig|spray|foliage|stem)\b")]
        r["F2 no hair flower t1-6"]=[] if hs else ["(no hair-flower sentence found)"]
    r["G35 cleavage words"]=re.findall(r"[^.,]{0,40}(cleavage|khe ngực|décolleté|decollete|bust line|hint of (the )?bust)[^.,]{0,30}",t,re.I)
    r["LEN>10000"]=["%d chars"%len(t)] if len(t)>10000 else []
    if p and season and p in L:
        pal=L[p][season]
        m=re.search(r"MAIN colou?r ([^,]+?) and the SECONDARY colou?r ([^,]+?),",t)
        mw,sw=(m.group(1),m.group(2)) if m else ("","")
        r["B20 main colour != palette"]=[] if pal["main"].lower() in mw.lower() or pal["main_hex"].upper() in t.upper() else [f"wants '{pal['main']}' {pal['main_hex']} | has '{mw}'"]
        r["B20 secondary != palette"]=[] if pal["sec"].lower() in sw.lower() or pal["sec_hex"].upper() in t.upper() else [f"wants '{pal['sec']}' {pal['sec_hex']} | has '{sw}'"]
        fc=F[p][season]
        r["F20 emb colour not in prompt"]=[] if fc["embroidery_hex"].upper() in t.upper() else [f"wants {fc['embroidery_hex']} {fc['embroidery_vi']}"]
        if k<=6: r["F20 hair colour not in prompt"]=[] if fc["hair_by_tier"][f"t{k}"].upper() in t.upper() or fc["hair_hex"].upper() in t.upper() else [f"wants {fc['hair_by_tier'][f't{k}']}"]
    return r
if __name__=="__main__":
    mode=sys.argv[1]; files=sys.argv[2:]
    tab=collections.defaultdict(lambda: collections.defaultdict(lambda:[0,0,[]]))
    for f in files:
        b=os.path.basename(f); m=re.match(r"([cms]\d\d)_t(\d)",b); p,k=m.group(1),int(m.group(2))
        season={"root":L[p]["root_season"] if p in L else None,"dong":"dong","thu":"thu"}[mode]
        t=open(f).read()
        for rule,hits in chk(t,k,p,season).items():
            c=tab[rule][k]; c[1]+=1
            if hits: c[0]+=1; c[2].append((b,hits[0]))
    json.dump({r:{k:v for k,v in d.items()} for r,d in tab.items()},open(f"{os.path.dirname(__file__)}/res_{mode}.json","w"),ensure_ascii=False,indent=0)
    for rule,d in tab.items():
        row=" ".join(f"t{k}:{d[k][0]}/{d[k][1]}" for k in sorted(d))
        tot=sum(v[0] for v in d.values())
        ex=next((v[2][0] for k,v in sorted(d.items()) if v[2]),None)
        print(f"{rule:42s} FAIL {tot:4d} | {row}" + (f"\n     e.g. {ex[0]}: {ex[1]}" if ex else ""))

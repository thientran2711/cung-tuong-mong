#!/usr/bin/env python3
"""ORDER THIN P3 seed validator (j72 composed việc nhờ; schema in dev/handover/reports/thin.md «## API P3»).
usage: python3 dev/test/j72seeds_validate.py [files…] [--min N] [--kinds craft,social]   (no file = every dev/handover/content/thin/j72seeds*.md; --min N = at least N seeds for EACH kind in --kinds, default all 4; ids unique across files)
Checks per seed: id unique, type j72, kind, tag K|D + src, tone, tier; req/other who-kind, nết/lòng only for rv/fallen/sv/rsv/man and names in BAL.net F/M,
need known; title + ask (in quotes); object null or {name,owner A|B|me|kho,clue,trace_ok,trace_no[,it = real IT key]} (law 6c); 1–3 steps of go/wait/pick with real
place keys, known skill, odds de|vua|kho, fail retry|end|bad; pick = 2–3 options, each Σgain == Σloss ≥1 and the same total for all (laws 2/3);
ok.gain ≥1, no.loss ≥1, keys = her stats + rel/relb (relb only with other); placeholders {A}{B}{M}{O}{S}{goi}{Goi}{xung}{Xung} only, {B} needs other, {O} needs object;
VANPHONG word scan (no %, no digits, no odds words, no modern words); no title equal to one of the 110 old templates."""
import json,re,sys,os
ROOT=os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
B=lambda f:open(os.path.join(ROOT,'dev/build',f),encoding='utf8').read()
bal=B('jbal2.js');NET=set()
m=re.search(r'BAL\.net=\{.*?\n\s*F:\{(.*?)\},\s*\n\s*M:\{(.*?)\},',bal,re.S)
for blk in m.groups():NET|=set(re.findall(r'"([^"]+)"',blk))
ITK=set()  # candidate IT keys (static scan of every build file; the in-game test dev/test/j72c-play.js checks IT[key] for real)
for f in os.listdir(os.path.join(ROOT,'dev/build')):
    if f.endswith('.js'):ITK|=set(re.findall(r'\b([a-zA-Z0-9_]+):\{n:"',B(f)))
OLD=set(re.findall(r'\bT7\("[^"]+","[a-z]+",\{[^\n]*?\bt:"([^"]+)"',B('j72.js')))
KINDS={"craft","social","court","fam"};TONES={"tense","sad","petty","funny","tender","warm","cruel"}
WHO={"rv","hh","fallen","sv","rsv","ak","off","fam","emp","th","doc","eun","maid"};NETK={"rv","fallen","sv","rsv","man"};MANRW={"sứ thần","họa sư","nhạc sư","thái y"}
NEEDS_ID={"ill","preg","friend","feud","thIll","empIll","bienLo","khoLo","kids","poor","fest"};PER={"ill","preg","friend","kids","poor"}
PLACES={"A","B","home","vuon","thu","dtd","tn","kn","tyv","ksp","lc"}
SK={"","tai","tamco","sac","danh","duc","mat","sung","an","thi","cam","ky","hoa","vu","y","rel","relb"}
STAT={"sung","danh","bac","suc","mat","th","hh","duc","an"};ODDS={"de","vua","kho"};FAIL={"retry","end","bad"}
NEEDS={"rank_min","rank_max","nights_min","month","not_confined","kids_min"}
PH={"A","B","M","O","S","goi","Goi","xung","Xung"}
L_="A-Za-zÀ-ỹĐđ"
# review thin-p3 r1 (VANPHONG xưng hô): never bạn/tôi/em/anh/chị (chị em ok)/cô ấy/ông ấy; the requester's address and self-word go through
# {goi}/{Goi}/{xung}/{Xung} (one voice core, OD:L1267) — never hand-typed «nương nương / tiểu chủ / tại hạ / thần thiếp» in the ask or a “quoted” line.
BAD2=re.compile(rf"(?<![{L_}])(tôi|bạn|cô ấy|ông ấy|anh ấy|chị ấy)(?![{L_}])",re.I)
ADDR=re.compile(rf"(?<![{L_}])(nương nương|tiểu chủ|tại hạ|thần thiếp)(?![{L_}])",re.I)
BAD=re.compile(r"%|\d|\b(OK|game|turn|round|slot|lượt|ván|level|quest)\b|Chắc chắn|Nắm chắc|Rất chắc|Khó lường|Mong manh|Tùy duyên|Có cơ|Rất vững",re.I)
A=sys.argv[1:];args=[a for n,a in enumerate(A) if not a.startswith('--') and not (n and A[n-1] in('--min','--kinds'))];MIN=int(A[A.index('--min')+1]) if '--min' in A else 0
CHK=set(A[A.index('--kinds')+1].split(',')) if '--kinds' in A else {"craft","social","court","fam"}
import glob
if not args:args=sorted(glob.glob(os.path.join(ROOT,'dev/handover/content/thin/j72seeds*.md')))
bad=0
def err(m):
    global bad;bad+=1;print("ERR",m)
rows=[]
for fn in args:
    for n,l in enumerate(open(fn,encoding='utf8'),1):
        if l.lstrip().startswith('{'):
            try:rows.append(json.loads(l))
            except Exception as e:err(f"{fn}:{n} bad JSON {e}")
def who(i,tag,r):
    if not isinstance(r,dict):err(f"{i} {tag} must be an object");return
    k=r.get("kind","rv");base=k.split(":")[0]
    if base=="man":
        if k[4:] not in MANRW:err(f"{i} {tag} man:<rw> rw '{k[4:]}' unknown")
    elif k not in WHO:err(f"{i} {tag} kind '{k}'")
    for g in("nết","lòng"):
        L=r.get(g,[])
        if L and base not in NETK:err(f"{i} {tag}: kind {k} takes no {g} filter")
        for n in L:
            if n not in NET:err(f"{i} {tag} {g} '{n}' not in BAL.net")
    nd=r.get("need")
    if nd and nd not in NEEDS_ID:err(f"{i} {tag} need '{nd}' unknown")
    if nd in("ill","preg","poor","kids") and base not in("rv","hh","fallen"):err(f"{i} {tag} need {nd} only for rv/hh/fallen")
def keys(i,where,d,has_b,need_one=True):
    if not isinstance(d,dict):err(f"{i} {where} must be an object");return 0
    if need_one and not d:err(f"{i} {where} empty (law 3)")
    t=0
    for k,n in d.items():
        if not isinstance(n,int) or n<1:err(f"{i} {where} {k} steps must be int>=1");continue
        if k in STAT or k=="rel":pass
        elif k=="relb":
            if not has_b:err(f"{i} {where} relb without other")
        else:err(f"{i} {where} bad key {k}")
        t+=n
    return t
ids=set();per={k:0 for k in KINDS}
for r in rows:
    i=r.get("id","?")
    if i in ids:err(i+" dup id")
    ids.add(i)
    if r.get("type")!="j72":err(i+" type must be j72")
    if r.get("kind") not in KINDS:err(i+" kind")
    else:per[r["kind"]]+=1
    if r.get("tag") not in("K","D") or not r.get("src"):err(i+" tag/src")
    if r.get("tone") not in TONES:err(i+" tone")
    if r.get("tier") not in("s","m","l"):err(i+" tier")
    who(i,"req",r.get("req"));hb="other" in r and r["other"] is not None
    if hb:who(i,"other",r["other"])
    if (r.get("other") or {}).get("need")=="feud" or (r.get("req") or {}).get("need")=="feud":
        if not hb:err(i+" need feud requires other")
    if not r.get("title"):err(i+" title")
    elif r["title"] in OLD:err(i+" title copies an old template: "+r["title"])
    ask=r.get("ask","")
    if not ask or not re.match(r'^[“"]',ask):err(i+" ask must be A's words in “ ”")
    o=r.get("object","MISSING");ho=isinstance(o,dict)
    if o=="MISSING":err(i+" object missing (use null for a pure errand)")
    elif ho:
        for f in("name","owner","clue","trace_ok","trace_no"):
            if not o.get(f):err(f"{i} object.{f}")
        if o.get("owner") not in("A","B","me","kho"):err(f"{i} object owner '{o.get('owner')}'")
        if o.get("owner")=="B" and not hb:err(i+" object owner B without other")
        if o.get("it") and o["it"] not in ITK:err(f"{i} object.it '{o['it']}' is not a real IT key")
        if re.search(r"\bmất\b|biến mất|không còn",(o.get("trace_ok","")+" "+o.get("trace_no","")),re.I):err(i+" object trace must say where it IS (law 6c), not that it is lost")
    elif o is not None:err(i+" object must be null or an object")
    st=r.get("steps") or []
    if not 1<=len(st)<=3:err(i+" needs 1–3 steps")
    texts=[r.get("title",""),ask]+([o.get("name",""),o.get("clue",""),o.get("trace_ok",""),o.get("trace_no","")] if ho else [])
    for n,s in enumerate(st):
        w=f"{i}.step{n+1}";t=s.get("t")
        if not s.get("n"):err(w+" n")
        texts.append(s.get("n",""))
        if s.get("at") is not None and s["at"] not in PLACES:err(f"{w} at '{s['at']}'")
        if s.get("at")=="B" and not hb:err(w+" at B without other")
        if t=="go":
            if s.get("sk","") not in SK:err(f"{w} sk '{s.get('sk')}'")
            if s.get("sk")=="relb" and not hb:err(w+" relb without other")
            if s.get("odds") not in ODDS:err(f"{w} odds must be de|vua|kho")
            if s.get("fail","retry") not in FAIL:err(f"{w} fail")
        elif t=="wait":pass
        elif t=="pick":
            ops=s.get("opts") or []
            if not 2<=len(ops)<=3:err(w+" pick needs 2–3 opts")
            tot=set()
            for m2,op in enumerate(ops):
                ww=f"{w}.opt{m2+1}";texts.append(op.get("n",""))
                if not op.get("n"):err(ww+" n")
                if op.get("at") is not None and op["at"] not in PLACES:err(f"{ww} at '{op['at']}'")
                if op.get("at")=="B" and not hb:err(ww+" at B without other")
                if op.get("odds") is not None and op["odds"] not in ODDS:err(ww+" odds")
                if op.get("sk","") not in SK:err(f"{ww} sk")
                if op.get("fail","retry") not in FAIL:err(ww+" fail")
                g=keys(i,ww+".gain",op.get("gain") or {},hb);l=keys(i,ww+".loss",op.get("loss") or {},hb)
                if set(op.get("gain") or {})&set(op.get("loss") or {}):err(ww+" same key in gain and loss")
                if g!=l:err(f"{ww} gain {g} != loss {l} (law 2)")
                tot.add(g)
            if len(tot)>1:err(w+" options not equal value "+str(sorted(tot)))
        else:err(f"{w} t must be go|wait|pick")
    if st and all(s.get("t")=="wait" for s in st):err(i+" only wait steps")
    ok=r.get("ok") or {};no=r.get("no") or {}
    keys(i,"ok.gain",ok.get("gain") or {},hb)
    if ok.get("loss"):keys(i,"ok.loss",ok["loss"],hb,False)
    keys(i,"no.loss",no.get("loss") or {},hb)
    texts+=[ok.get("text",""),no.get("text","")]
    tw=r.get("twist")
    if tw is not None:
        if not isinstance(tw,dict) or not tw.get("text"):err(i+" twist.text")
        else:
            a=keys(i,"twist.gain",tw.get("gain") or {},hb,False)+keys(i,"twist.loss",tw.get("loss") or {},hb,False)
            if not a:err(i+" twist without gain or loss");texts.append(tw["text"])
    for t in texts:
        for p in re.findall(r"\{([^}]+)\}",t or ""):
            if p not in PH:err(f"{i} placeholder {{{p}}} unknown")
            if p=="B" and not hb:err(f"{i} {{B}} without other")
            if p=="O" and not ho:err(f"{i} {{O}} without object")
        mm=BAD.search(t or "") or BAD2.search(t or "")
        if mm:err(f"{i} VANPHONG word: {mm.group(0)!r} in «{t[:60]}»")
        for q in ([t] if t==r.get("ask") else [])+re.findall(r"“[^”]*”",t or ""):
            ma=ADDR.search(q.replace("Hoàng hậu nương nương",""))
            if ma:err(f"{i} hand-typed address {ma.group(0)!r} (use {{goi}}/{{xung}}) in «{q[:60]}»")
    for k in (r.get("needs") or {}):
        if k not in NEEDS:err(f"{i} unknown needs key {k}")
if MIN:
    for k,n in per.items():
        if k in CHK and n<MIN:err(f"kind {k}: only {n} seeds, need >= {MIN}")
print(f"j72seeds: {len(rows)} seeds ({', '.join(f'{k} {per[k]}' for k in sorted(per))}), {bad} errors")
sys.exit(1 if bad else 0)

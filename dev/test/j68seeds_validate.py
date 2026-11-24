#!/usr/bin/env python3
"""ORDER THIN P4 seed validator (j68 composed openings; schema in dev/handover/reports/thin.md «## API P4»).
usage: python3 dev/test/j68seeds_validate.py [files…] [--min] [--fams day,visit]
  no file = every dev/handover/content/thin/j68seeds*.md; --min = at least 60 comp for day/visit/serv/emp, 40 for sea/court/rumor/kid/myst and
  12 open per family, for the families in --fams (default all 9); ids unique across files.
Checks: id unique (j68c-<fam>-…), type open|comp, fam; open: a kind, text 1 line, placeholders {A}{M}{S}{W}{P} ({A} only when a≠any), needs.month only;
comp: tag K|D + src, tone, tier, roles A/B (kind, nết/lòng only for rv/sv, names in BAL.net F/M, need known and allowed for the kind), text,
object null or {name,owner A|B|me|kho,clue,trace} (law 6c), exactly 4 stances {text,gain,loss[,trace]} with Σgain == Σloss == tier steps (s1 m2 l3),
gain ≥1 and loss ≥1 (laws 2/3), keys = her stats + rel.A/rel.B (rel.B only with role B; no rel for emp/th; no 'an' in loss), no key both sides;
outcomes for the same 4 ids; placeholders {A}{B}{M}{O}{S}{W}{P} only ({B} needs B, {O} needs object, {A} needs A); every opener-joinable comp of a
family with role A kind K has ≥1 opener a=K or any (warn); VANPHONG scan (no %, digits, odds words, modern words); no comp text ≈ an old j68 wording."""
import json,re,sys,os,glob,difflib
ROOT=os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
B=lambda f:open(os.path.join(ROOT,'dev/build',f),encoding='utf8').read()
bal=B('jbal2.js');NET=set()
m=re.search(r'BAL\.net=\{.*?\n\s*F:\{(.*?)\},\s*\n\s*M:\{(.*?)\},',bal,re.S)
for blk in m.groups():NET|=set(re.findall(r'"([^"]+)"',blk))
OLD=[]
for f in ('j68e.js','j68f.js','j68g.js','j68h.js','j68i.js'):
    for vb in re.findall(r'\bv:\[(.*?)\],?\s*\n',B(f),re.S):OLD+=re.findall(r'"([^"]{20,})"',vb)
OLDN=[re.sub(r'\{[A-Z]\}','',o).lower() for o in OLD]
FAMS={"day":60,"visit":60,"serv":60,"emp":60,"sea":40,"court":40,"rumor":40,"kid":40,"myst":40};OPMIN=12
TONES={"tense","sad","petty","funny","tender","warm","cruel"}
KIND={"rv","sv","maid","emp","th","doc","eun","ksp","kid"};MANRW={"sứ thần","họa sư","nhạc sư","thái y"};NETK={"rv","sv"}
OPA=KIND|{"man","any"}
NEEDS_ID={"ill","preg","friend","feud","kids","poor","thIll","empIll","fest","rain","snow"};RVONLY={"ill","preg","friend","feud","kids","poor"}
STAT={"sung","danh","bac","suc","mat","th","hh","duc","tamco","an"};TIER={"s":1,"m":2,"l":3}
NEEDS={"rank_min","rank_max","nights_min","month","not_confined","kids_min"}
PH={"A","B","M","O","S","W","P"};OPH={"A","M","S","W","P"}
BAD=re.compile(r"%|\d|\b(OK|game|turn|round|slot|lượt|ván|level|quest|item)\b|Chắc chắn|Nắm chắc|Rất chắc|Khó lường|Mong manh|Tùy duyên|Có cơ|Rất vững",re.I)
A=sys.argv[1:];args=[a for n,a in enumerate(A) if not a.startswith('--') and not (n and A[n-1]=='--fams')]
MIN='--min' in A;CHK=set(A[A.index('--fams')+1].split(',')) if '--fams' in A else set(FAMS)
if not args:args=sorted(glob.glob(os.path.join(ROOT,'dev/handover/content/thin/j68seeds*.md')))
bad=0;warn=0
def err(m):
    global bad;bad+=1;print("ERR",m)
def wrn(m):
    global warn;warn+=1;print("WARN",m)
rows=[]
for fn in args:
    for n,l in enumerate(open(fn,encoding='utf8'),1):
        if l.lstrip().startswith('{'):
            try:rows.append(json.loads(l))
            except Exception as e:err(f"{os.path.basename(fn)}:{n} bad JSON {e}")
def kof(r):
    k=(r or {}).get("kind","rv");return "man" if k.startswith("man:") else k
def phs(i,t,allowed,where):
    if not isinstance(t,str) or not t.strip():err(f"{i} {where} empty");return set()
    P=set(re.findall(r'\{([^}]*)\}',t))
    for p in P-allowed:err(f"{i} {where} placeholder {{{p}}} not allowed here")
    if BAD.search(re.sub(r'\{[^}]*\}','',t)):err(f"{i} {where} VANPHONG: '{BAD.search(re.sub(r'{[^}]*}','',t)).group(0)}' (no %, digits, odds words, modern words)")
    return P
def role(i,tag,r):
    if not isinstance(r,dict):err(f"{i} roles.{tag} must be an object");return
    k=r.get("kind","rv")
    if k.startswith("man:"):
        if k[4:] not in MANRW:err(f"{i} {tag} man:<rw> '{k[4:]}' unknown")
    elif k not in KIND:err(f"{i} {tag} kind '{k}'")
    for g in("nết","lòng"):
        L=r.get(g,[])
        if L and kof(r) not in NETK:err(f"{i} {tag}: kind {k} takes no {g} filter")
        for n in L:
            if n not in NET:err(f"{i} {tag} {g} '{n}' not in BAL.net")
    nd=r.get("need")
    if nd:
        if nd not in NEEDS_ID:err(f"{i} {tag} need '{nd}' unknown")
        elif nd in RVONLY and kof(r)!="rv":err(f"{i} {tag} need {nd} only for kind rv")
    for x in r:
        if x not in("kind","nết","lòng","need"):err(f"{i} {tag} unknown field {x}")
def steps(i,where,d,R,side):
    if not isinstance(d,dict) or not d:err(f"{i} {where} empty (law 3: gain ≥1 and loss ≥1)");return 0
    t=0
    for k,n in d.items():
        if not isinstance(n,int) or n<1:err(f"{i} {where} {k} steps must be int ≥1");continue
        if k in STAT:
            if k=="an" and side=="loss":err(f"{i} {where} 'an' only as gain")
        elif k in("rel.A","rel.B"):
            rr=R.get(k[-1])
            if not rr:err(f"{i} {where} {k} without role {k[-1]}")
            elif kof(rr) in("emp","th"):err(f"{i} {where} {k}: kind {kof(rr)} uses sung/th, not rel")
        else:err(f"{i} {where} bad key {k}")
        t+=n
    return t
ids=set();cnt={f:0 for f in FAMS};opn={f:0 for f in FAMS};OPK={f:set() for f in FAMS};NEEDK={f:set() for f in FAMS};seen_t={}
for r in rows:
    i=r.get("id","?")
    if i in ids:err(i+" dup id")
    ids.add(i);f=r.get("fam")
    if f not in FAMS:err(f"{i} fam '{f}'");continue
    if not re.match(rf'^j68c-{f}-[a-z0-9]+$',i):err(f"{i} id must be j68c-{f}-<n> (open: j68c-{f}-oNN)")
    ty=r.get("type")
    if ty=="open":
        opn[f]+=1;a=r.get("a")
        if a not in OPA:err(f"{i} open a '{a}'")
        P=phs(i,r.get("text"),OPH,"text")
        if "A" in P and a=="any":err(f"{i} a=any but text uses {{A}}")
        if a not in("any",None) and "A" not in P:wrn(f"{i} a={a} but text never shows {{A}}")
        if len(re.findall(r'[.!?…]',r.get("text","").rstrip('.!?…')))>1:wrn(f"{i} opener longer than one sentence")
        for k in (r.get("needs") or {}):
            if k!="month":err(f"{i} open needs: only month")
        OPK[f].add(a)
        for x in r:
            if x not in("id","type","fam","a","text","needs"):err(f"{i} unknown field {x}")
        continue
    if ty!="comp":err(f"{i} type must be open|comp");continue
    cnt[f]+=1
    if r.get("tag") not in("K","D") or not r.get("src"):err(i+" tag K|D + src")
    if r.get("tone") not in TONES:err(i+" tone")
    tier=r.get("tier")
    if tier not in TIER:err(i+" tier");tier="m"
    R=r.get("roles")
    if not isinstance(R,dict):err(i+" roles must be an object ({} = nobody)");R={}
    for k in R:
        if k not in("A","B"):err(f"{i} roles: only A and B")
    if "B" in R and "A" not in R:err(i+" role B without A")
    if not R and f not in("sea","myst","court"):err(f"{i} fam {f} needs a role A (a real person)")
    for k,v in R.items():role(i,k,v)
    if "A" in R and "B" in R and kof(R["A"])==kof(R["B"]) and kof(R["A"]) in("maid","emp","th","doc","eun","ksp"):err(f"{i} roles A and B are the same fixed person ({kof(R['A'])}) → never cast")
    if "A" in R:NEEDK[f].add(kof(R["A"]))
    else:NEEDK[f].add("-")
    o=r.get("object","MISSING")
    if o=="MISSING":err(i+" object missing (null or object)")
    elif o is not None:
        for k in("name","owner","clue","trace"):
            if not o.get(k):err(f"{i} object.{k} missing (law 6c)")
        if o.get("owner") not in("A","B","me","kho"):err(f"{i} object.owner must be A|B|me|kho")
        elif o["owner"] in("A","B") and o["owner"] not in R:err(f"{i} object.owner {o['owner']} is not cast")
        for k in("name","clue","trace"):phs(i,o.get(k,""),PH-{"O"},"object."+k)
        if re.search(r'\bmất\b',o.get("trace","")):err(f"{i} object.trace says «mất» (law 6c: always somewhere)")
    allowed=set(PH)
    if "A" not in R:allowed.discard("A")
    if "B" not in R:allowed.discard("B")
    if o in(None,"MISSING"):allowed.discard("O")
    phs(i,r.get("text"),allowed,"text")
    st=r.get("stances") or {}
    if not isinstance(st,dict) or len(st)!=4:err(f"{i} exactly 4 stances");st=st if isinstance(st,dict) else {}
    for sid,s in st.items():
        if not re.match(r'^[a-z]+$',sid):err(f"{i} stance id '{sid}' must be [a-z]+")
        phs(i,s.get("text"),allowed,f"stance {sid}.text")
        if len((s.get("text") or "").split())>8:wrn(f"{i} stance {sid} label > 8 words")
        g=steps(i,f"{sid}.gain",s.get("gain"),R,"gain");l=steps(i,f"{sid}.loss",s.get("loss"),R,"loss")
        if g!=l or g!=TIER[tier]:err(f"{i} stance {sid}: Σgain {g} / Σloss {l} must both be {TIER[tier]} (tier {tier}; laws 2/3)")
        both=set(s.get("gain") or {})&set(s.get("loss") or {})
        if both:err(f"{i} stance {sid}: {both} on both sides")
        if "trace" in s:
            if o in(None,"MISSING"):err(f"{i} stance {sid}.trace without object")
            else:phs(i,s["trace"],allowed-{"O"},f"stance {sid}.trace")
        for x in s:
            if x not in("text","gain","loss","trace"):err(f"{i} stance {sid} unknown field {x}")
    oc=r.get("outcomes") or {}
    if set(oc)!=set(st):err(f"{i} outcomes ids must equal stance ids")
    for k,v in oc.items():phs(i,v,allowed,f"outcome {k}")
    for k,v in (r.get("needs") or {}).items():
        if k not in NEEDS:err(f"{i} needs.{k} unknown")
    tn=re.sub(r'\{[A-Z]\}','',r.get("text","")).lower()
    for oo in OLDN:
        if difflib.SequenceMatcher(None,tn,oo).ratio()>.8:err(f"{i} text copies an old j68 wording: «{oo[:60]}»");break
    if tn in seen_t:err(f"{i} text duplicates {seen_t[tn]}")
    seen_t[tn]=i
    for x in r:
        if x not in("id","type","fam","tag","src","tone","tier","roles","text","object","stances","outcomes","needs","slug","note"):err(f"{i} unknown field {x}")
for f in FAMS:
    if f in CHK:
        for k in NEEDK[f]:
            if k!="-" and k not in OPK[f] and "any" not in OPK[f] and cnt[f]:wrn(f"fam {f}: comps with A kind {k} have no opener (a={k} or any) → shown without an opener")
        if MIN and cnt[f]<FAMS[f]:err(f"fam {f}: {cnt[f]} comp < {FAMS[f]}")
        if MIN and opn[f]<OPMIN:err(f"fam {f}: {opn[f]} open < {OPMIN}")
print("j68seeds:",", ".join(f"{f} {cnt[f]}c/{opn[f]}o" for f in FAMS if cnt[f] or opn[f]),f"— {bad} errors, {warn} warnings")
sys.exit(1 if bad else 0)

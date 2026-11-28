#!/usr/bin/env python3
"""ORDER THIN P6a seed validator (composed WORLD reactions; schema in dev/handover/reports/thin.md «## API P6»).
usage: python3 dev/test/wseeds_validate.py [files…] [--min] [--kinds a,b]
  no file = every dev/handover/content/thin/wseeds*.md; --min = ≥4 seeds per kind of jworld.js (tang away tuyen hoa dis dich su tho sao xa) and ≥3 per
  kind of jworld2.js, for the kinds in --kinds (default all 27); ids unique across files.
Checks: id unique (wc-<k>-…), type wc, k one of the 27 kinds, sub tags allowed for k, scope allowed for k (house only for kinds with {X}),
tag K|D + src, tone, tier, roles A/B (kind, nết/lòng only for rv/sv, names in BAL.net F/M), news 1 sentence + text, object null or
{name,owner A|B|X|me|kho,clue,trace} (law 6c), exactly 3 stances NHẸ · VỪA · NẶNG {text,npc,gain,loss[,trace]} with stance i Σgain == Σloss == BAL.wc.tier[i] steps, om = {removed: kept sibling}, gain ≥1
and loss ≥1 (laws 2/3), keys = her stats + rel.A/rel.B (rel.B only with B; no rel for emp/th; no 'an' in loss), no key both sides, npc tag known,
≥2 different npc tags; outcomes for the same 4 ids; placeholders {A}{B}{X}{M}{O}{S} only ({X} only for kinds with a person); VANPHONG scan;
spread warnings (scopes per kind, object share)."""
import json,re,sys,os,glob
ROOT=os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
B=lambda f:open(os.path.join(ROOT,'dev/build',f),encoding='utf8').read()
bal=B('jbal2.js');NET=set()
m=re.search(r'BAL\.net=\{.*?\n\s*F:\{(.*?)\},\s*\n\s*M:\{(.*?)\},',bal,re.S)
for blk in m.groups():NET|=set(re.findall(r'"([^"]+)"',blk))
K1=["tang","away","tuyen","hoa","dis","dich","su","tho","sao","xa"]
K2=["day","lap","hau","thb","thi","vuong","ret","trung","vuco","cam","trom","phong","hon","ngoai","phat","benh","tinh"]
KMIN={**{k:4 for k in K1},**{k:3 for k in K2}}
SUB={"tang":{"th","queen","heir"},"away":{"te","san","tuan","chinh"},"hoa":{"storm","lamp"},"dis":{"lut","han"},"tho":{"emp","th"},"day":{"m","f"},
     "hau":{"phe","lap"},"phat":{"big","small"},"cam":{"vuco","ngoai","giac"}}
XK={"hoa","day","lap","hon","hau","tuyen"}
SCOPES={"all","house","hi","lo","near","kids","srv"}
NPC={"help","harm","social","bribe","flee","art","pray","court","scheme"}
TONES={"tense","sad","petty","funny","tender","warm","cruel"}
KIND={"rv","sv","maid","emp","th","doc","eun","kid"};MANRW={"sứ thần","họa sư","nhạc sư","thái y"};NETK={"rv","sv"}
STAT={"sung","danh","bac","suc","mat","th","hh","duc","tamco","an"};TIERS={"s","m","l"}
TIER=[int(x) for x in re.search(r"BAL\.wc=\{[^\n]*?tier:\[([\d,]+)\]",bal).group(1).split(",")]  # BAL.wc.tier: way i Σgain == Σloss == TIER[i] (law 2 TIERED CHOICES NHẸ · VỪA · NẶNG, owner OD 27/11 ~00:46Z)
NEEDS={"rank_min","rank_max","nights_min","month","not_confined","kids_min"}
PH={"A","B","X","M","O","S"}
BAD=re.compile(r"%|\d|\b(OK|game|turn|round|slot|lượt|(?<!tấm )ván(?! gỗ| cầu| thuyền)|level|quest|item)\b|Chắc chắn|Nắm chắc|Rất chắc|Khó lường|Mong manh|Tùy duyên|Có cơ|Rất vững",re.I)
A=sys.argv[1:];args=[a for n,a in enumerate(A) if not a.startswith('--') and not (n and A[n-1]=='--kinds')]
MIN='--min' in A;CHK=set(A[A.index('--kinds')+1].split(',')) if '--kinds' in A else set(KMIN)
if not args:args=sorted(glob.glob(os.path.join(ROOT,'dev/handover/content/thin/wseeds*.md')))
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
    s=re.sub(r'\{[^}]*\}','',t);b=BAD.search(s)
    if b:err(f"{i} {where} VANPHONG: '{b.group(0)}' (no %, digits, odds words, modern words)")
    return P
def role(i,tag,r):
    if not isinstance(r,dict):err(f"{i} roles.{tag} must be an object");return
    k=r.get("kind","rv")
    if k.startswith("man:"):
        if k[4:] not in MANRW:err(f"{i} {tag} man:<rw> '{k[4:]}' unknown")
    elif k not in KIND:err(f"{i} {tag} kind '{k}'")
    for g in("nết","lòng"):
        L=r.get(g,[])
        if L and kof(r) not in NETK:err(f"{i} {tag} {g} only for rv/sv")
        if not isinstance(L,list):err(f"{i} {tag} {g} must be a list");continue
        for x in L:
            if x not in NET:err(f"{i} {tag} {g} '{x}' not in BAL.net F/M")
    for x in set(r)-{"kind","nết","lòng"}:err(f"{i} {tag} unknown field '{x}'")
ids=set();per={};scopes={};objs={}
for r in rows:
    i=r.get("id","?")
    if i in ids:err(f"{i} duplicate id")
    ids.add(i)
    if r.get("type")!="wc":err(f"{i} type must be 'wc'");continue
    k=r.get("k")
    if k not in KMIN:err(f"{i} k '{k}' not one of the 27 world kinds");continue
    if not re.match(rf"^wc-{k}-",i):err(f"{i} id must start with wc-{k}-")
    per[k]=per.get(k,0)+1
    if r.get("tag") not in("K","D"):err(f"{i} tag K|D")
    if not r.get("src"):err(f"{i} src (basis, law 8)")
    if r.get("tone") not in TONES:err(f"{i} tone '{r.get('tone')}'")
    t=r.get("tier")
    if t not in TIERS:err(f"{i} tier s|m|l");t="m"
    sub=r.get("sub")
    if sub is not None:
        if not isinstance(sub,list) or not sub:err(f"{i} sub must be a non-empty list or omitted")
        else:
            for s in sub:
                if s not in SUB.get(k,set()):err(f"{i} sub '{s}' not a real cause tag of {k} (allowed: {sorted(SUB.get(k,[])) or 'none, omit sub'})")
    sc=r.get("scope")
    if sc not in SCOPES:err(f"{i} scope '{sc}'")
    elif sc=="house" and k not in XK:err(f"{i} scope house only for kinds with a person {sorted(XK)}")
    scopes.setdefault(k,set()).add(sc)
    R=r.get("roles") or {}
    if not isinstance(R,dict):err(f"{i} roles must be an object");R={}
    for tg in R:
        if tg not in("A","B"):err(f"{i} role '{tg}' (only A, B)")
        else:role(i,tg,R[tg])
    if "B" in R and "A" not in R:err(f"{i} role B without A")
    if "A" in R and "B" in R:
        a,b=R["A"],R["B"];fixed={"maid","emp","th","doc","eun"}
        if kof(a)==kof(b) and kof(a) in fixed:err(f"{i} A and B are the same fixed person ({kof(a)})")
    if sc=="house" and "A" in R and kof(R["A"])!="rv":err(f"{i} scope house: role A is {{X}} herself, kind must be rv")
    allowed=set(PH)
    if "A" not in R:allowed.discard("A")
    if "B" not in R:allowed.discard("B")
    if k not in XK:allowed.discard("X")
    ob=r.get("object")
    if ob is None:allowed.discard("O")
    else:
        if not isinstance(ob,dict):err(f"{i} object must be null or an object")
        else:
            for f in("name","owner","clue","trace"):
                if not ob.get(f):err(f"{i} object.{f} missing (law 6c)")
            ow=ob.get("owner")
            if ow not in("A","B","X","me","kho"):err(f"{i} object.owner '{ow}' (A|B|X|me|kho)")
            elif ow in("A","B") and ow not in R:err(f"{i} object.owner {ow} but no role {ow}")
            elif ow=="X" and k not in XK:err(f"{i} object.owner X but kind {k} has no person")
            if re.search(r'\bmất\b',str(ob.get("trace",""))):err(f"{i} object.trace must say where it IS (never «mất»)")
            phs(i,ob.get("trace",""),allowed,"object.trace");phs(i,ob.get("clue",""),allowed,"object.clue")
            objs[k]=objs.get(k,0)+1
    news=r.get("news","");phs(i,news,allowed,"news")
    if isinstance(news,str) and len(re.findall(r'[.!?…]\s',news.strip()+" "))>1:err(f"{i} news must be ONE sentence")
    txt=r.get("text","");phs(i,txt,allowed,"text")
    if isinstance(txt,str) and len(re.findall(r'[.!?…](?=\s|$|”)',txt))>3:wrn(f"{i} text longer than 3 sentences")
    used=set(re.findall(r'\{([A-Z])\}',json.dumps(r,ensure_ascii=False)))
    if "X" in used and k not in XK:err(f"{i} {{X}} used but kind {k} has no person")
    ST=r.get("stances")
    if not isinstance(ST,dict) or len(ST)!=len(TIER):err(f"{i} exactly {len(TIER)} stances (NHẸ · VỪA · NẶNG)");ST=ST if isinstance(ST,dict) else {}
    om=r.get("om")
    if not isinstance(om,dict) or len(om)!=1 or any(k in ST or v not in ST for k,v in om.items()):err(f"{i} om must be {{removed stance id: kept sibling id}}")
    tags=set()
    for ti,(sid,st) in enumerate(ST.items()):
        if not isinstance(st,dict):err(f"{i}.{sid} stance must be an object");continue
        lb=st.get("text","");phs(i,lb,allowed,f"{sid}.text")
        if isinstance(lb,str) and len(lb.split())>8+lb.count("{"):wrn(f"{i}.{sid} label longer than 8 words")
        if st.get("npc") not in NPC:err(f"{i}.{sid} npc tag '{st.get('npc')}' ({'|'.join(sorted(NPC))})")
        else:tags.add(st["npc"])
        g=st.get("gain") or {};l=st.get("loss") or {}
        for side,mp in(("gain",g),("loss",l)):
            if not isinstance(mp,dict):err(f"{i}.{sid} {side} must be an object");continue
            for kk,v in mp.items():
                if kk in STAT:pass
                elif kk in("rel.A","rel.B"):
                    rr=R.get(kk[-1])
                    if not rr:err(f"{i}.{sid} {kk} without role {kk[-1]}")
                    elif kof(rr) in("emp","th"):err(f"{i}.{sid} {kk} on {kof(rr)}: use sung / th")
                else:err(f"{i}.{sid} {side} key '{kk}' unknown")
                if not isinstance(v,int) or v<1:err(f"{i}.{sid} {side}.{kk} must be a whole step ≥1")
        if "an" in l:err(f"{i}.{sid} 'an' is gain only")
        for kk in set(g)&set(l):err(f"{i}.{sid} '{kk}' on both sides")
        sg=sum(v for v in g.values() if isinstance(v,int));sl=sum(v for v in l.values() if isinstance(v,int))
        if sg<1 or sl<1:err(f"{i}.{sid} gain ≥1 and loss ≥1 (laws 2/3)")
        if ti<len(TIER) and (sg!=TIER[ti] or sl!=TIER[ti]):err(f"{i}.{sid} Σgain {sg} / Σloss {sl} must both be {TIER[ti]} (way {ti+1} of NHẸ · VỪA · NẶNG, law 2)")
        if "trace" in st:
            if not ob:err(f"{i}.{sid} trace without object")
            else:phs(i,st["trace"],allowed,f"{sid}.trace")
        for x in set(st)-{"text","npc","gain","loss","trace"}:err(f"{i}.{sid} unknown field '{x}'")
    if len(tags)<2:err(f"{i} use ≥2 different npc tags across the 4 stances")
    OC=r.get("outcomes") or {}
    if set(OC)!=set(ST):err(f"{i} outcomes ids must equal stance ids")
    for sid,o in OC.items():phs(i,o,allowed,f"outcomes.{sid}")
    nd=r.get("needs") or {}
    for x in nd:
        if x not in NEEDS:err(f"{i} needs.{x} unknown")
    for x in set(r)-{"id","type","k","tag","src","tone","tier","sub","scope","roles","news","text","object","stances","outcomes","om","needs"}:wrn(f"{i} extra field '{x}' (ignored)")
for k in sorted(CHK):
    n=per.get(k,0)
    if MIN and n<KMIN[k]:err(f"kind {k}: {n} seeds < {KMIN[k]}")
    if n>=2 and len(scopes.get(k,set()))<2:wrn(f"kind {k}: only one scope used ({','.join(scopes[k])}) — use ≥2")
tot=sum(per.get(k,0) for k in CHK);ob=sum(objs.get(k,0) for k in CHK)
if tot and ob*10<tot*3:wrn(f"objects in {ob}/{tot} seeds (<30 %)")
print(f"wseeds: {len(rows)} seeds ({', '.join(f'{k} {per[k]}' for k in sorted(per))}), {bad} errors, {warn} warnings")
sys.exit(1 if bad else 0)

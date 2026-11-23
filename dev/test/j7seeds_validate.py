#!/usr/bin/env python3
"""ORDER THIN P2 seed validator (like content/selscene/tools/validate_tests.py). usage: python3 dev/test/j7seeds_validate.py <seeds.md|jsonl> [--min N]
Reads every line starting with '{'. Checks per seed: id unique, type j7, tag K|D + src, tone, tier s|m|l; roles kind + nết/lòng names from BAL.net
F/M (jbal2.js); incident.text; object null or {name,owner,clue,trace} with owner = a role or 'me' (law 6c); exactly 4 stances with the same ids in
outcomes; each stance gain+loss non-empty, Σgain == Σloss steps (law 2/3), equal total across the 4 stances (law 2), valid keys, friend.*/proof.* gain only, grudge.* loss only,
no key both gain and loss; every {placeholder} is a role or {maid}; needs keys known; VANPHONG word scan (no %, no digits, no modern words)."""
import json,re,sys,os
ROOT=os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
bal=open(os.path.join(ROOT,'dev/build/jbal2.js'),encoding='utf8').read()
NET=set()
m=re.search(r'BAL\.net=\{.*?\n\s*F:\{(.*?)\},\s*\n\s*M:\{(.*?)\},',bal,re.S)
for blk in m.groups():NET|=set(re.findall(r'"([^"]+)"',blk))
KINDS={"rv","sv","man","kid","maid","emp","th","doc","eun"};FIXED={"maid","emp","th","doc","eun"}
STAT={"sung","danh","bac","suc","mat","th","hh","duc","maid"}
NEEDS={"rank_min","rank_max","nights_min","month","not_confined","kids_min"}
TONES={"tense","cruel","sad","petty","funny","tender"}
BAD=re.compile(r"%|\d|\b(OK|game|turn|round|slot|lượt|ván)\b|Chắc chắn|Nắm chắc|Rất chắc|Khó lường",re.I)
args=[a for a in sys.argv[1:] if not a.startswith('--')];MIN=int(sys.argv[sys.argv.index('--min')+1]) if '--min' in sys.argv else 0
bad=0
def err(m):
    global bad;bad+=1;print("ERR",m)
rows=[]
for fn in args:
    for n,l in enumerate(open(fn,encoding='utf8'),1):
        if l.lstrip().startswith('{'):
            try:rows.append(json.loads(l))
            except Exception as e:err(f"{fn}:{n} bad JSON {e}")
ids=set()
for r in rows:
    i=r.get("id","?")
    if i in ids:err(i+" dup id")
    ids.add(i)
    if r.get("type")!="j7":err(i+" type must be j7")
    if r.get("tag") not in("K","D") or not r.get("src"):err(i+" tag/src")
    if r.get("tone") not in TONES:err(i+" tone")
    if r.get("tier") not in("s","m","l"):err(i+" tier")
    roles=r.get("roles") or {}
    if not roles:err(i+" no roles")
    for k,v in roles.items():
        kind=(v or {}).get("kind","rv")
        if kind not in KINDS:err(f"{i} role {k} kind {kind}")
        for g in("nết","lòng"):
            for n in (v or {}).get(g,[]):
                if n not in NET:err(f"{i} role {k} {g} '{n}' not in BAL.net")
        if kind in FIXED and ((v or {}).get("nết") or (v or {}).get("lòng")):err(f"{i} role {k}: fixed person takes no nết filter")
    inc=r.get("incident") or {}
    if not inc.get("text"):err(i+" incident.text")
    o=inc.get("object","MISSING")
    if o=="MISSING":err(i+" incident.object missing (use null for a rumour)")
    elif o is not None:
        for f in("name","owner","clue","trace"):
            if not o.get(f):err(f"{i} object.{f}")
        if o.get("owner") not in roles and o.get("owner")!="me":err(f"{i} object owner '{o.get('owner')}' is not a role or me")
    st=r.get("stances") or {};oc=r.get("outcomes") or {}
    if len(st)!=4:err(i+" needs 4 stances")
    if set(st)-set(oc):err(i+" outcomes missing for "+str(sorted(set(st)-set(oc))))
    tot=set();texts=[inc.get("text","")]+([o.get("name",""),o.get("clue",""),o.get("trace","")] if isinstance(o,dict) else [])
    for sid,x in st.items():
        g,l=x.get("gain") or {},x.get("loss") or {}
        if not x.get("text"):err(f"{i}.{sid} text")
        if not g or not l:err(f"{i}.{sid} gain/loss empty (law 3)")
        if set(g)&set(l):err(f"{i}.{sid} same key in gain and loss")
        for side,d in(("gain",g),("loss",l)):
            for k,n in d.items():
                if not isinstance(n,int) or n<1:err(f"{i}.{sid} {k} steps must be int>=1")
                a,_,b=k.partition(".")
                if a in STAT and not b:continue
                if a=="friend" and b in roles and side=="gain":continue
                if a=="grudge" and b in roles and side=="loss":continue
                if a=="proof" and b in roles and side=="gain" and (roles[b] or {}).get("kind","rv")=="rv":continue
                err(f"{i}.{sid} bad {side} key {k}")
        sg,sl=sum(v for v in g.values() if isinstance(v,int)),sum(v for v in l.values() if isinstance(v,int))
        if sg!=sl:err(f"{i}.{sid} gain {sg} != loss {sl} (law 2)")
        tot.add(sg);texts+= [x.get("text",""),oc.get(sid,"")]
    if len(tot)>1:err(i+" stances not equal value "+str(tot))
    for t in texts:
        for p in re.findall(r"\{([^}]+)\}",t or ""):
            if p!="maid" and p not in roles:err(f"{i} placeholder {{{p}}} is not a role")
        if BAD.search(t or ""):err(f"{i} VANPHONG word: {BAD.search(t).group(0)!r} in «{t[:60]}»")
    for k in (r.get("needs") or {}):
        if k not in NEEDS:err(f"{i} unknown needs key {k}")
if len(rows)<MIN:err(f"only {len(rows)} seeds, need >= {MIN}")
print(f"j7seeds: {len(rows)} seeds, {bad} errors")
sys.exit(1 if bad else 0)

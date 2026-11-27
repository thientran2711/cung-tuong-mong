#!/usr/bin/env python3
"""ORDER THIN P5 seed validator (composed Kỳ ngộ; schema dev/handover/reports/thin.md «## API P5»).
usage: python3 dev/test/kyseeds_validate.py [files…] [--min N]   (no file = every dev/handover/content/thin/kyseeds*.md; --min N = at least N seeds in all)
Checks: id unique (kyc-<grp>-…, not an old id), type ky, grp, tag K|D + src, tone; who kind + its fields, the place list fits where that kind can
really be (jky kyPpl), what + the specials it allows; when keys (buoi 0–3, night, winter, wx, fest keys); b ⊂ 0123; w; text placeholders {W}{O}{own}{S}
({O} only for lost/dead/rare, {own} only for lost/plot); a choice = exactly 2 n + 2 o, a plain card = no n; numbers: g keys danh sung duc tamco th rel art
sucR, c keys kh suc bac danh oan seen relM, a = an art key when art, s = a known special allowed for this who/what; LAW 2/3 = the kyngo-eq rule
(value = Σg×vw + sv[s] − Σc×vw, × V[band]; the 2 options within eqTol on every band; every option a gain AND a real cost; plain = no cost); VANPHONG scan;
no text ≈ one of the 25 old scenes."""
import json,re,sys,os,glob,subprocess,difflib
ROOT=os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
K=json.loads(subprocess.check_output(['node','-e',"const fs=require('fs');const BAL={};new Function('BAL',fs.readFileSync(process.argv[1],'utf8'))(BAL);process.stdout.write(JSON.stringify(BAL.kyngo))",os.path.join(ROOT,'dev/build/jbalky.js')]))
OLDIDS=set(K['E']);J=open(os.path.join(ROOT,'dev/build/jky.js'),encoding='utf8').read()
OLDT=[re.sub(r'\$\{[^}]*\}','',m).lower() for m in re.findall(r't:c=>`<p>(.*?)</p>',J)]
GRP={"ma","vat","de","th","sv"};TONES={"tender","sad","funny","tense","warm","petty","cruel"}
WHO={"ly","el","man","court","rv","emp","th","sv","kid","maid"}
PLACES={"vuon","lc","tn","kn","thu","dtd","tyv","nvp","ksp","home","*"}
CAN={"ly":{"lc"},"el:gt":{"nvp","tn"},"el:tn":{"tn"},"el":{"nvp","tn"},"court:ty":{"tyv"},"court:tq":{"thu","dtd"},"court:ksp":{"ksp"},"court:ped":{"nvp","ksp"},"th":{"tn"},"maid":{"home","*"}}
ROLES={"Nhạc sư","Họa sư","Sứ thần","Thái y"};FEST={"newyear","nguyentieu","thanhminh","doanngo","phoenix","thattich","trungthu","trungcuu","dongchi","giaothua","vulan","vantho","lapbat"}
ARTS={"cam","ky","thi","hoa","vu","y","theu"};G={"danh","sung","duc","tamco","th","rel","art","sucR"};C={"kh","suc","bac","danh","oan","seen","relM"}
SPEC={"intel","cure","loi","spy","rk","kn","ev","ret","item","give"}
NET=set()
bal=open(os.path.join(ROOT,'dev/build/jbal2.js'),encoding='utf8').read();m=re.search(r'BAL\.net=\{.*?\n\s*F:\{(.*?)\},\s*\n\s*M:\{(.*?)\},',bal,re.S)
for blk in m.groups():NET|=set(re.findall(r'"([^"]+)"',blk))
BAD=re.compile(r"%|\d|\b(OK|game|turn|round|slot|lượt|ván|level|quest|item)\b|Chắc chắn|Nắm chắc|Rất chắc|Khó lường|Mong manh|Tùy duyên|Có cơ|Rất vững",re.I)
A=sys.argv[1:];args=[a for n,a in enumerate(A) if not a.startswith('--') and not (n and A[n-1]=='--min')];MIN=int(A[A.index('--min')+1]) if '--min' in A else 0
if not args:args=sorted(glob.glob(os.path.join(ROOT,'dev/handover/content/thin/kyseeds*.md')))
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
def val(O,b):
    v=0
    for k,n in (O.get('g') or {}).items():v+=n*(K['sucRest'] if k=='sucR' else 1)*K['vw'].get(k,0)
    if O.get('s'):v+=K['sv'].get(O['s'],0)
    for k,n in (O.get('c') or {}).items():v-=n*K['vw'].get(k,0)
    return round(v*(K['V'][b] if b<len(K['V']) else 1),1)
def txt(i,where,t,allowed):
    if not isinstance(t,str) or not t.strip():err(f"{i} {where} empty");return
    for p in set(re.findall(r'\{([^}]*)\}',t))-allowed:err(f"{i} {where} placeholder {{{p}}} not allowed")
    s=re.sub(r'\{[^}]*\}','',t);mm=BAD.search(s)
    if mm:err(f"{i} {where} VANPHONG: '{mm.group(0)}'")
ids=set();per={g:0 for g in GRP};seen_t={}
for r in rows:
    i=r.get("id","?")
    if i in ids or i in OLDIDS:err(i+" dup id (or an old id)")
    ids.add(i);g=r.get("grp")
    if g not in GRP:err(f"{i} grp");g="ma"
    per[g]+=1
    if not re.match(rf'^kyc-{g}-[a-z0-9]+$',i):err(f"{i} id must be kyc-{g}-<n>")
    if r.get("type")!="ky":err(i+" type ky")
    if r.get("tag") not in("K","D") or not r.get("src"):err(i+" tag K|D + src")
    if r.get("tone") not in TONES:err(i+" tone")
    w=r.get("who") or {};k=w.get("kind");what=r.get("what")
    if what not in(None,"plot","lost","dead","rare"):err(f"{i} what '{what}'")
    if k not in WHO:err(f"{i} who.kind '{k}'")
    if k=="el" and w.get("eid") not in(None,"gt","tn"):err(f"{i} who.eid")
    if k=="man" and w.get("role") not in ROLES:err(f"{i} who.role must be one of {ROLES}")
    if k=="court" and w.get("c") not in("ty","tq","ksp","ped"):err(f"{i} who.c")
    if w.get("nết") and k not in("rv","sv"):err(f"{i} nết only for rv/sv")
    for n in w.get("nết") or []:
        if n not in NET:err(f"{i} nết '{n}' not in BAL.net")
    if (w.get("old") or w.get("sameBand")) and k!="rv":err(f"{i} old/sameBand only for rv")
    if "eunuch" in w and k!="sv":err(f"{i} eunuch only for sv")
    for x in w:
        if x not in("kind","eid","role","c","old","sameBand","eunuch","nết"):err(f"{i} who.{x} unknown")
    if what=="plot" and k!="rv":err(f"{i} what plot: who.kind must be rv (the plotter)")
    if what in("dead","rare") and not(k=="court" and w.get("c")=="ped"):err(f"{i} what {what}: who must be court ped")
    pl=r.get("pl") or ["*"]
    for p in pl:
        if p not in PLACES:err(f"{i} pl '{p}'")
    if what in("dead","rare") and set(pl)-{"nvp"}:err(f"{i} what {what}: pl must be [nvp]")
    ck=k+(":"+w["eid"] if k=="el" and w.get("eid") else ":"+w["c"] if k=="court" and w.get("c") else "")
    if ck in CAN and what not in("plot","lost"):
        ok=[p for p in pl if p in CAN[ck] or (p=="*" and ck!="maid" and False)]
        if "*" in pl and ck!="maid":wrn(f"{i} pl * for a who that is only at {sorted(CAN[ck])}: fine, but list those places")
        elif not ok:err(f"{i} who {ck} is never at {pl} (only {sorted(CAN[ck])}) → the seed could never fire")
    wh=r.get("when") or {}
    for x,v in wh.items():
        if x=="buoi":
            if not isinstance(v,list) or any(b not in(0,1,2,3) for b in v):err(f"{i} when.buoi")
        elif x in("night","winter","wx"):
            if v is not True:err(f"{i} when.{x} must be true")
        elif x=="fest":
            for f in v:
                if f not in FEST:err(f"{i} when.fest '{f}'")
        else:err(f"{i} when.{x} unknown")
    b=str(r.get("b","0123"))
    if not b or set(b)-set("0123"):err(f"{i} b")
    if not isinstance(r.get("w",1),(int,float)) or not .2<=r.get("w",1)<=2:err(f"{i} w 0.2–2")
    allowed={"W","S"}|({"O"} if what in("lost","dead","rare") else set())|({"own"} if what in("lost","plot") else set())
    txt(i,"t",r.get("t"),allowed)
    if "{W}" not in (r.get("t") or "") and what not in("plot","lost"):wrn(f"{i} text never names the person {{W}}")
    tn=re.sub(r'\{[^}]*\}','',r.get("t","")).lower()
    for oo in OLDT:
        if difflib.SequenceMatcher(None,tn,oo).ratio()>.7:err(f"{i} text copies an old Kỳ ngộ scene");break
    if tn in seen_t:err(f"{i} text duplicates {seen_t[tn]}")
    seen_t[tn]=i
    plain=r.get("plain");O=r.get("o")
    allowS=lambda s:{"intel":True,"cure":(k=="court" and w.get("c")=="ty") or (k=="man" and w.get("role")=="Thái y"),"loi":k=="el","spy":k=="sv","rk":b=="0",
        "kn":what=="plot","ev":what=="plot","ret":what=="lost","item":what in("lost","dead","rare"),"give":what=="dead"}.get(s,False)
    def opt(where,o,isplain):
        if not isinstance(o,dict):err(f"{i} {where} must be an object");return
        for x in o:
            if x not in("g","c","s","a","od","buy","seenW"):err(f"{i} {where}.{x} unknown")
        for kk,n in (o.get("g") or {}).items():
            if kk not in G:err(f"{i} {where}.g.{kk} unknown")
            if not isinstance(n,(int,float)) or n<=0:err(f"{i} {where}.g.{kk} must be >0")
        for kk,n in (o.get("c") or {}).items():
            if kk not in C:err(f"{i} {where}.c.{kk} unknown")
            if not isinstance(n,(int,float)) or n<=0:err(f"{i} {where}.c.{kk} must be >0")
        if (o.get("g") or {}).get("art") and o.get("a") not in ARTS:err(f"{i} {where}: art needs a = one of {ARTS}")
        if o.get("s") and (o["s"] not in SPEC or not allowS(o["s"])):err(f"{i} {where}: special '{o.get('s')}' not allowed for who {ck} / what {what}")
        if o.get("buy") and what not in("dead","rare"):err(f"{i} {where}: buy only with what dead/rare")
        if isplain and o.get("c"):err(f"{i} plain card carries a cost")
        gain=any(v>0 for v in (o.get("g") or {}).values()) or (o.get("s") and K['sv'].get(o['s'],0)>0) or o.get("buy")
        if not gain:err(f"{i} {where}: no gain (law 3)")
        if not isplain and not o.get("buy") and not any(v>0 and K['vw'].get(kk,0)>0 for kk,v in (o.get("c") or {}).items()):err(f"{i} {where}: no real cost (law 3)")
    if plain is not None:
        if r.get("n"):err(f"{i} plain card takes no n")
        if O:err(f"{i} plain AND o")
        opt("plain",plain,True)
    else:
        if not isinstance(O,list) or len(O)!=2:err(f"{i} a choice needs exactly 2 o");O=O if isinstance(O,list) else []
        n=r.get("n") or []
        if len(n)!=2:err(f"{i} exactly 2 n")
        for j,x in enumerate(n):
            txt(i,f"n[{j}]",x,set())
            if len(x.split())>8:wrn(f"{i} n[{j}] > 8 words")
        for j,o in enumerate(O):opt(f"o[{j}]",o,False)
        if len(O)==2:
            for bb in [int(x) for x in b if x in "0123"]:
                V=[val(o,bb) for o in O];mx,mn=max(V),min(V);rr=mx/mn if mn>0 else 99
                if rr>K['eqTol']:err(f"{i} band {bb}: values {V[0]} / {V[1]} ratio {rr:.2f} > eqTol {K['eqTol']} (law 2)")
    for x in r:
        if x not in("id","type","grp","tag","src","tone","who","pl","when","what","b","w","t","n","o","plain","note"):err(f"{i} unknown field {x}")
tot=sum(per.values())
if MIN and tot<MIN:err(f"{tot} seeds < {MIN}")
print("kyseeds:",", ".join(f"{g} {per[g]}" for g in sorted(GRP) if per[g]),f"= {tot} — {bad} errors, {warn} warnings")
sys.exit(1 if bad else 0)

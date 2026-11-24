#!/usr/bin/env python3
"""ORDER THIN P7 seed validator (composed festivals; schema in dev/handover/reports/thin.md «## API P7»).
usage: python3 dev/test/fseeds_validate.py [files…] [--min] [--fests a,b]
  no file = every dev/handover/content/thin/fseeds*.md; --min = per festival in --fests (default all 14): ≥6 stages (≥3 kind C, ≥1 non-C),
  ≥4 own comps, ≥3 prizes; and ≥40 composed variants per festival (stage × fitting comp, + prizes on contests); ids unique across files.
Checks: stage {fest,kind,sub (C: SC7 key, W: WT7 theme, P: emp|th, else ""), title (C), text 1–2 sentences, {A} only and required for G,
no copy of an old FV7 text}; comp {fest key or *, kinds ⊆ CWGBPR, tag/src, tone, tier, roles only B (rv, nết/lòng in BAL.net), text,
object null|{name,owner B|me|kho,clue,trace}, exactly 4 stances Σgain == Σloss == tier steps (s1 m2 l3), gain ≥1 loss ≥1, keys her stats + rel.B,
no 'an' in loss, no key both sides; outcomes same ids; placeholders {B}{O}{M}{F}{S}}; prize {fest, name, from, trace_me, trace_npc ({W} only),
it optional = a real IT key (j72_itkeys.md)}; VANPHONG scan (no %, digits, odds words, modern words); traces never «mất»."""
import json,re,sys,os,glob,difflib
ROOT=os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
B=lambda f:open(os.path.join(ROOT,'dev/build',f),encoding='utf8').read()
bal=B('jbal2.js');NET=set()
m=re.search(r'BAL\.net=\{.*?\n\s*F:\{(.*?)\},\s*\n\s*M:\{(.*?)\},',bal,re.S)
for blk in m.groups():NET|=set(re.findall(r'"([^"]+)"',blk))
j71=B('j71.js')
SC=set(re.findall(r'^ ([a-z]+):\{n:"',re.search(r'const SC7=\{(.*?)\};',j71,re.S).group(1),re.M))
WT=set(re.findall(r'([a-z0-9]+):\[',re.search(r'const WT7=\{(.*?)\};',j71,re.S).group(1)))
fv=re.search(r'const FV7=\{(.*?)\n\};',j71,re.S)
FEST={};OLD=[]
body=fv.group(1) if fv else j71
for mm in re.finditer(r'^([a-z0-9]+):\[(.*)$',body,re.M):
    FEST[mm.group(1)]=mm.group(2).count('["');OLD+=re.findall(r'\["[CWGBPR]","[a-z0-9]*","([^"]+)"',mm.group(2))
OLDL=[o.lower() for o in OLD]
TONES={"tense","sad","petty","funny","tender","warm","cruel"};KINDS=set("CWGBPR")
STAT={"sung","danh","bac","suc","mat","th","hh","duc","tamco","an"};TIER={"s":1,"m":2,"l":3}
NEEDS={"rank_min","rank_max","not_confined","kids_min"}
BAD=re.compile(r"%|\d|\b(OK|game|turn|round|slot|lượt|(?<!tấm )ván(?! gỗ| cầu| thuyền)|level|quest|item)\b|Chắc chắn|Nắm chắc|Rất chắc|Khó lường|Mong manh|Tùy duyên|Có cơ|Rất vững",re.I)
A=sys.argv[1:];args=[a for n,a in enumerate(A) if not a.startswith('--') and not (n and A[n-1]=='--fests')]
MIN='--min' in A;CHK=set(A[A.index('--fests')+1].split(',')) if '--fests' in A else set(FEST)
if not args:args=sorted(glob.glob(os.path.join(ROOT,'dev/handover/content/thin/fseeds*.md')))
ITK=set()
for c in [os.path.join(os.path.dirname(os.path.abspath(args[0])) if args else '','j72_itkeys.md'),os.path.join(ROOT,'dev/handover/content/thin/j72_itkeys.md')]:
    if c and os.path.exists(c):ITK=set(re.findall(r'`([A-Za-z0-9_]+)`',open(c,encoding='utf8').read()))|set(re.findall(r'^\s*[-*]?\s*([A-Za-z0-9_]+)\b',open(c,encoding='utf8').read(),re.M));break
bad=0;warn=0
def err(m):
    global bad;bad+=1;print("ERR",m)
def wrn(m):
    global warn;warn+=1;print("WARN",m)
def phs(i,t,allowed,where):
    if not isinstance(t,str) or not t.strip():err(f"{i} {where} empty");return set()
    P=set(re.findall(r'\{([^}]*)\}',t))
    for p in P-allowed:err(f"{i} {where} placeholder {{{p}}} not allowed here")
    b=BAD.search(re.sub(r'\{[^}]*\}','',t))
    if b:err(f"{i} {where} VANPHONG: '{b.group(0)}' (no %, digits, odds words, modern words)")
    return P
rows=[]
for fn in args:
    for n,l in enumerate(open(fn,encoding='utf8'),1):
        if l.lstrip().startswith('{'):
            try:rows.append(json.loads(l))
            except Exception as e:err(f"{os.path.basename(fn)}:{n} bad JSON {e}")
ids=set();st={};co={};pz={};stk={};cok={};shared=[]
for r in rows:
    i=r.get("id","?")
    if i in ids:err(f"{i} duplicate id")
    ids.add(i);t=r.get("type");f=r.get("fest")
    if t not in("stage","comp","prize"):err(f"{i} type stage|comp|prize");continue
    if not(f in FEST or (t=="comp" and f=="*")):err(f"{i} fest '{f}' ({', '.join(sorted(FEST))}{' or *' if t=='comp' else ''})");continue
    if r.get("tag") not in("K","D"):err(f"{i} tag K|D")
    if not r.get("src"):err(f"{i} src (basis, law 8)")
    if t=="stage":
        if not re.match(rf"^fc-{f}-s\d+$",i):err(f"{i} id must be fc-{f}-sNN")
        k=r.get("kind");sub=r.get("sub","")
        if k not in KINDS:err(f"{i} kind C|W|G|B|P|R");continue
        st[f]=st.get(f,0)+1;stk.setdefault(f,[]).append(k)
        if k=="C":
            if sub not in SC:err(f"{i} sub '{sub}' not a contest key ({' '.join(sorted(SC))})")
            ti=r.get("title","");phs(i,ti,set(),"title")
            if isinstance(ti,str) and len(ti.split())>8:err(f"{i} title > 8 words")
        elif k=="W":
            if sub not in WT:err(f"{i} sub '{sub}' not a wager theme ({' '.join(sorted(WT))})")
        elif k=="P":
            if sub not in("emp","th"):err(f"{i} sub emp|th for P")
        elif sub:err(f"{i} sub must be \"\" for kind {k}")
        if k!="C" and r.get("title"):wrn(f"{i} title only used for C")
        tx=r.get("text","");P=phs(i,tx,{"A"} if k=="G" else set(),"text")
        if k=="G" and "A" not in P:err(f"{i} G stage text must contain {{A}} (the real consort who invites her)")
        if isinstance(tx,str) and len(re.findall(r'[.!?…](?=\s|$|”)',tx))>2:err(f"{i} text 1–2 sentences")
        if isinstance(tx,str):
            tl=tx.lower()
            for o in OLDL:
                if difflib.SequenceMatcher(None,tl,o).ratio()>.75:err(f"{i} text ≈ old FV7 «{o[:70]}»");break
        for x in set(r)-{"id","type","fest","kind","sub","tag","src","title","text","needs"}:wrn(f"{i} extra field '{x}'")
    elif t=="comp":
        if f=="*":
            if not re.match(r"^fc-x[ab]-c\d+$",i):err(f"{i} shared comp id must be fc-xa-cNN / fc-xb-cNN")
            shared.append(r)
        elif not re.match(rf"^fc-{f}-c\d+$",i):err(f"{i} id must be fc-{f}-cNN")
        co[f]=co.get(f,0)+1;K=r.get("kinds")
        if not isinstance(K,list) or not K or set(K)-KINDS:err(f"{i} kinds ⊆ C W G B P R");K=[]
        cok.setdefault(f,[]).append(set(K))
        if r.get("tone") not in TONES:err(f"{i} tone")
        tr=r.get("tier")
        if tr not in TIER:err(f"{i} tier s|m|l");tr="m"
        R=r.get("roles") or {}
        if not isinstance(R,dict):err(f"{i} roles object");R={}
        for tg,rr in R.items():
            if tg!="B":err(f"{i} role '{tg}' (only B, the rival)");continue
            if (rr or {}).get("kind","rv")!="rv":err(f"{i} B kind must be rv")
            for g in("nết","lòng"):
                for x in (rr or {}).get(g,[]) or []:
                    if x not in NET:err(f"{i} B {g} '{x}' not in BAL.net F/M")
        allowed={"B","O","M","F","S"}
        if "B" not in R:allowed.discard("B")
        ob=r.get("object")
        if ob is None:allowed.discard("O")
        elif not isinstance(ob,dict):err(f"{i} object null or object")
        else:
            for x in("name","owner","clue","trace"):
                if not ob.get(x):err(f"{i} object.{x} missing (law 6c)")
            if ob.get("owner") not in("B","me","kho"):err(f"{i} object.owner B|me|kho")
            elif ob.get("owner")=="B" and "B" not in R:err(f"{i} object.owner B without role B")
            if re.search(r'\bmất\b',str(ob.get("trace",""))):err(f"{i} object.trace never «mất»")
            phs(i,ob.get("trace",""),allowed,"object.trace");phs(i,ob.get("clue",""),allowed,"object.clue")
        phs(i,r.get("text",""),allowed,"text")
        S_=r.get("stances")
        if not isinstance(S_,dict) or len(S_)!=4:err(f"{i} exactly 4 stances");S_=S_ if isinstance(S_,dict) else {}
        for sid,s in S_.items():
            if not isinstance(s,dict):err(f"{i}.{sid} object");continue
            lb=s.get("text","");phs(i,lb,allowed,f"{sid}.text")
            if isinstance(lb,str) and len(lb.split())>8+lb.count("{"):wrn(f"{i}.{sid} label > 8 words")
            g=s.get("gain") or {};l=s.get("loss") or {}
            for side,mp in(("gain",g),("loss",l)):
                for kk,v in mp.items():
                    if kk not in STAT and kk!="rel.B":err(f"{i}.{sid} {side} key '{kk}'")
                    if kk=="rel.B" and "B" not in R:err(f"{i}.{sid} rel.B without role B")
                    if not isinstance(v,int) or v<1:err(f"{i}.{sid} {side}.{kk} whole step ≥1")
            if "an" in l:err(f"{i}.{sid} 'an' is gain only")
            for kk in set(g)&set(l):err(f"{i}.{sid} '{kk}' on both sides")
            sg=sum(v for v in g.values() if isinstance(v,int));sl=sum(v for v in l.values() if isinstance(v,int))
            if sg<1 or sl<1:err(f"{i}.{sid} gain ≥1 and loss ≥1 (laws 2/3)")
            if sg!=TIER[tr] or sl!=TIER[tr]:err(f"{i}.{sid} Σgain {sg} / Σloss {sl} must both be {TIER[tr]} (tier {tr}, law 2)")
            if "trace" in s:
                if not ob:err(f"{i}.{sid} trace without object")
                else:phs(i,s["trace"],allowed,f"{sid}.trace")
            for x in set(s)-{"text","gain","loss","trace"}:err(f"{i}.{sid} unknown field '{x}'")
        OC=r.get("outcomes") or {}
        if set(OC)!=set(S_):err(f"{i} outcomes ids = stance ids")
        for sid,o in OC.items():phs(i,o,allowed,f"outcomes.{sid}")
        for x in (r.get("needs") or {}):
            if x not in NEEDS:err(f"{i} needs.{x}")
        for x in set(r)-{"id","type","fest","kinds","tag","src","tone","tier","roles","text","object","stances","outcomes","needs"}:wrn(f"{i} extra field '{x}'")
    else:
        if not re.match(rf"^fc-{f}-p\d+$",i):err(f"{i} id must be fc-{f}-pNN")
        pz[f]=pz.get(f,0)+1
        for x in("name","from","trace_me","trace_npc"):
            if not r.get(x):err(f"{i} {x} missing")
        phs(i,r.get("name",""),set(),"name");phs(i,r.get("from",""),set(),"from");phs(i,r.get("trace_me",""),set(),"trace_me")
        if "W" not in phs(i,r.get("trace_npc",""),{"W"},"trace_npc"):err(f"{i} trace_npc must name the winner {{W}}")
        for x in("trace_me","trace_npc"):
            if re.search(r'\bmất\b',str(r.get(x,""))):err(f"{i} {x} never «mất»")
        it=r.get("it")
        if it is not None and not ITK:wrn(f"{i} it '{it}' not checked: j72_itkeys.md not found (run with the handover checkout's file)")
        if it is not None and ITK and it not in ITK:err(f"{i} it '{it}' not a real IT key (j72_itkeys.md)")
        for x in set(r)-{"id","type","fest","tag","src","name","from","trace_me","trace_npc","it"}:wrn(f"{i} extra field '{x}'")
SH=[set(c.get("kinds") or []) for c in shared]
for f in sorted(CHK):
    if f not in FEST:err(f"--fests {f} unknown");continue
    ks=stk.get(f,[])
    old=FEST[f]
    comps=cok.get(f,[])+SH
    nC=sum(1 for k in ks if k=="C")
    combos=sum(max(1,sum(1 for c in comps if k in c))*(max(1,pz.get(f,0)) if k=="C" else 1) for k in ks)+old
    print(f"  {f}: stages {len(ks)} (C {nC}) · own comps {co.get(f,0)} + shared {len(shared)} · prizes {pz.get(f,0)} · composed variants ≈ {combos}")
    if MIN:
        if len(ks)<6 or nC<3 or len(ks)-nC<1:err(f"festival {f}: stages {len(ks)} (C {nC}) — want ≥6, ≥3 C, ≥1 non-C")
        if co.get(f,0)<4:err(f"festival {f}: own comps {co.get(f,0)} < 4")
        if pz.get(f,0)<3:err(f"festival {f}: prizes {pz.get(f,0)} < 3")
        if combos<40:err(f"festival {f}: composed variants {combos} < 40")
print(f"fseeds: {len(rows)} rows (stages {sum(st.values())}, comps {sum(co.values())}, prizes {sum(pz.values())}); old FV7 {sum(FEST.values())} in {len(FEST)} festivals; {bad} errors, {warn} warnings")
sys.exit(1 if bad else 0)

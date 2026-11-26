#!/usr/bin/env python3
"""svt-scan (law 11, servant-trust): every place in dev/build/j*.js where an act makes ANOTHER person's servant engage (spyFor = …, or a call of
bribeServ / threatServ / tmTake / tmAsk / svTalk) and whether it reaches the ONE relationship effect svTouch (jsvt.js).
usage: python3 dev/measure/svt-scan.py [build_dir]   → one row per site: file:line  kind  status ; exit 1 when a site is UNWIRED.
status: inline (svTouch on the line) · wrapped (inside a function jsvt wraps) · via-wrapped (calls a wrapped function) · exempt:<why> · UNWIRED
fix r1 (law 11, review FAIL 1): the family is widened to «any act whose target is a servant whose owner ≠ the actor's house» — every write of a
servant↔servant liking (srvAf / stfLike / nrAf / <x>.af[<y>.sid]=, the cung-nữ road j42 srvStaffAct + place card, the NPC servants' jagstaff Đồng liêu
acts) must reach svtPeer / svTouch on its line or the next two lines of the same act, or be exempt with a reason (seeding, same-house only, no approach).
--legacy prints only the old 31-site scan (the «before» row of the report table)."""
import os,re,sys
A=[a for a in sys.argv[1:] if not a.startswith('--')];LEG='--legacy' in sys.argv
D=A[0] if A else os.path.join(os.path.dirname(__file__),'..','build')
WR=('bribeServ','threatServ','tmTake')  # wrapped by jsvt (svtWrap)
EXEMPT={('j10.js','plantServ'):'her own servant moves house (no other person\'s servant engaged)',
 ('jagknow.js','have++'):'old-save seeding of existing eyes (load time, no act)',
 ('jcoopworld.js',''):'co-op state sync (the act ran on its own seat)',
 ('jcoopask.js',''):'co-op read only'}
rows=[];bad=0
for f in sorted(os.listdir(D)):
    if not re.fullmatch(r'j[\w]*\.js',f) or f in('jsvt.js',):continue
    L=open(os.path.join(D,f),encoding='utf-8').read().split('\n')
    fn=''
    for i,l in enumerate(L,1):
        m=re.match(r'\s*function (\w+)\(',l)
        if m:fn=m.group(1)
        for m in re.finditer(r'(\b[\w.]*spyFor=(?!=|null)[^;,)]{0,20})|\b(bribeServ|threatServ|tmTake|tmAsk|svTalk)\(',l):
            if m.group(1) and re.search(r'spyFor===|spyFor!==',m.group(0)):continue
            kind='set' if m.group(1) else m.group(2)
            if kind!='set' and re.search(r'function\s+'+kind+r'\(',l[max(0,m.start()-10):m.end()]):continue
            if kind!='set' and re.search(r'typeof '+kind,l[max(0,m.start()-12):m.end()]):continue
            st=None
            for (ef,key),why in EXEMPT.items():
                if f==ef and (key=='' or key in l[max(0,m.start()-400):m.end()+40] or fn==key):st='exempt: '+why
            if st is None:
                if 'svTouch' in l: st='inline'
                elif kind=='set' and fn in WR: st='wrapped ('+fn+')'
                elif kind in WR or kind=='svTalk': st='via-wrapped' if kind!='svTalk' else 'inline (svTalk)'
                elif kind=='tmAsk': st='via-wrapped (tmAsk → tmTake)'
                elif kind=='set' and re.search(r'spyFor=(s\.spyFor\|\|)?"?me"?|spyFor=key\(',l) and ('S.srv' in l): st='UNWIRED'
                else: st='UNWIRED'
            if st=='UNWIRED':bad+=1
            rows.append((f'{f}:{i}',kind,st))
# ---- fix r1: servant ↔ servant across houses (the missed family) ----
EX2={'srvInit':'new cung-nữ life: seeding who she already knows (no act)','srvMet':'seeding','servInit':'seeding (old saves / new life)','fillStaff':'seeding',
 'nvp':'a chance meeting at Nội vụ phủ (no one approaches)','frame':'same house only (ownerOf(s)!==m → null; P.foe = her own palace)',
 'stfLike':'answer to a same-house frame (cnvFrame: the accuser is of her own palace)','nrAf':'a rivalry outcome (jnroad), no approach',
 'nrMPlay':'a rivalry outcome (jnroad), no approach','srvAf':'the helper itself','whyMaidInit':'seeding (a man knows two servants, jwhy)','srvMeet':'a chance meeting at Nội vụ phủ (no one approaches)',
 'cnvFrameOpts':'answer to a same-house frame (cnvFrame: the accuser is of her own palace)','msAffAdd':'the relation store itself (j9)',
 'kcSeed':'seeding (her home-village friend Xuân Đào, jkc2 opening)','knSrvCards':'her eavesdropping on a consort (listen / scout): no servant engaged','knWatchLand':'she keeps watch at her own gate: no servant engaged',
 'tellMis':'a servant tells HER OWN master (same house)','knErrGive':'a servant listens / scouts on a consort for her master: no servant engaged','kc2EnterSrv':'seeding (her home-village friend Xuân Đào, jkc2 opening)'}
P2=re.compile(r'\b(srvAf|stfLike|nrAf)\(|\bS\.srv\.intel(?:\.push\(|=)|\b[a-z]\.intel=(?!=)|\b[\w.]+\.af\[\w+\.sid\]\s*=(?!=)')
ACT=re.compile(r'^\s?(\w+)\(s[,)]')
n2=0
if not LEG:
  for f in sorted(os.listdir(D)):
    if not re.fullmatch(r'j[\w]*\.js',f) or f in('jsvt.js',):continue
    L=open(os.path.join(D,f),encoding='utf-8').read().split('\n');fn='';act='';cb=''
    for i,l in enumerate(L,1):
        m=re.match(r'\s*function (\w+)\(',l)
        if m:fn=m.group(1);act=''
        a=ACT.match(l)
        if a:act=a.group(1)
        b=re.findall(r'if\(k==="(\w+)"\)',l)
        if b:cb=b[-1]
        elif re.match(r'\s*function ',l):cb=''
        for m in P2.finditer(l):
            if re.search(r'function\s+\w+\($',l[:m.start()+len(m.group(0))]) or re.match(r'\s*function (srvAf|stfLike|nrAf)\(',l):continue
            w=l+(L[i-2] if i>=2 and not re.match(r'\s*function ',l) and not ACT.match(l) else '')
            for j in range(i,min(i+2,len(L))):
                if ACT.match(L[j]) or re.match(r'\s*(function |if\(k===)',L[j]):break
                w+=L[j]
            br=re.findall(r'k==="(\w+)"',l[:m.start()]);br=br[-1] if br else cb
            key=act or (br if br=='frame' else '') or fn
            if 'svtPeer' in w or 'svTouch' in w: st='inline (svtPeer)'
            elif key in EX2: st='exempt: '+EX2[key]
            elif fn in EX2: st='exempt: '+EX2[fn]
            elif re.search(r'\.af\[\w+\.sid\]=R\(|=30;\w+\.af\[',l): st='exempt: seeding'
            else: st='UNWIRED'
            if st=='UNWIRED':bad+=1
            n2+=1;rows.append((f'{f}:{i}','peer:'+(m.group(1) or ('intel' if 'intel' in m.group(0) else 'af')),st))
for r in rows:print('\t'.join(r))
print(f'# {len(rows)} sites ({len(rows)-n2} spy/bribe/talk + {n2} servant↔servant), {bad} UNWIRED');sys.exit(1 if bad else 0)

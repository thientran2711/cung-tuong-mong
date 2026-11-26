#!/usr/bin/env python3
"""PUNISH-TIER family scan (review/punish-tier, owner OD 26/11 ~19:05Z + ~19:10Z, LAW 11): every road that punishes a consort, her and an NPC.
Lists each call of fall / cold / demote / punish / deathSentence / chPunish / punCold / punTier / punGiang + every raw lãnh cung write
(.out=true / .out=1) with the crime words and the weight → penalty after this branch.
FAIL families: raw_cold = an NPC/her sent into lãnh cung outside jpun punCold / j14 cold (title + seat rule skipped);
stack = a site that drops a rank AND sends to lãnh cung outside punCold (the nặng penalty does both, only via punCold).
usage: python3 dev/test/punish-tier-scan.py [-v] [--md]   (exit 1 on a FAIL)"""
import re,sys,glob,os
D=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
SKIP=re.compile(r'^(jbal.*|all)\.js$')
ALLOW_RAW={('j42.js','srvW'),('jkc.js','kcW'),('j14.js','cold'),('jpun.js','punCold')}  # temporary S.out=1 wrappers (servant life / kỳ tuyển), not a punishment
CALL=re.compile(r'(?<![\w.])(fall|cold|demote|punish|deathSentence|chPunish|punCold|punTier)\(')
RAW=re.compile(r'\.out=(?:true|1)\b')
PEN={'nhe':'phạt bổng / cấm túc ngắn','vua':'giáng 1 bậc','nang':'giáng 1 bậc + lãnh cung','tu':'ban chết hoặc phế vị + lãnh cung chung thân','phe':'phế vị + lãnh cung chung thân (tử tội được tha)','keep':'lãnh cung giữ phẩm (không tội)','demote':'giáng 1 bậc (không phải tội)'}
def args(s,i):
    d=0;j=i;q=None
    while j<len(s):
        c=s[j]
        if q:
            if c=='\\':j+=2;continue
            if c==q:q=None
        elif c in '"\'`':q=c
        elif c in '([{':d+=1
        elif c in ')]}':
            d-=1
            if d<0:return s[i:j]
        j+=1
    return s[i:i+200]
def split(a):
    out=[];d=0;q=None;cur=''
    for c in a:
        if q:
            cur+=c
            if c==q:q=None
            continue
        if c in '"\'`':q=c
        if c in '([{':d+=1
        if c in ')]}':d-=1
        if c==',' and d==0:out.append(cur);cur='';continue
        cur+=c
    out.append(cur);return [x.strip() for x in out]
rows=[];fails=[]
for f in sorted(glob.glob(os.path.join(D,'*.js'))):
    b=os.path.basename(f)
    if SKIP.match(b):continue
    lastfn='';incom=False
    for n,l in enumerate(open(f,encoding='utf-8').read().split('\n'),1):
        fd=re.findall(r'function\s+(\w+)\s*\(',l)
        code='';i=0
        while i<len(l):
            if incom:
                k=l.find('*/',i)
                if k<0:i=len(l);break
                incom=False;i=k+2;continue
            k=l.find('/*',i)
            if k<0:code+=l[i:];break
            code+=l[i:k];incom=True;i=k+2
        for m in CALL.finditer(l):
            fn=m.group(1)
            pre=l[max(0,m.start()-9):m.start()]
            if re.search(r'function\s*$',pre):continue
            A=split(args(l,m.end()))
            why=next((x for x in A if x[:1] in '"`\''),'')[:70]
            if fn=='fall':x=A[3].strip('"') if len(A)>3 else 'vua'
            elif fn=='cold':x=A[2].strip('"') if len(A)>2 else 'nang'
            elif fn=='demote':x='demote'
            elif fn=='punish':
                sv=A[2] if len(A)>2 and A[0][:1] not in '"`' else (A[1] if len(A)>1 and A[0][:1] in '"`' else '1')
                x='nhe';why=why+f' [sev {sv}]'
            elif fn=='deathSentence':x='tu'
            elif fn=='chPunish':x='charge (BAL.charge.C[c].tier; tử tội by tuDeed / tuTgt)'
            elif fn in ('punCold','punTier'):x=(A[1] if len(A)>1 else '').strip('"')
            else:x='vua'
            rows.append((b,n,fn,why,x,PEN.get(x,x)))
        for m in RAW.finditer(code):
            fnm=re.findall(r'function\s+(\w+)',code[:m.start()])
            cur=fnm[-1] if fnm else lastfn
            if (b,cur) in ALLOW_RAW:continue
            fails.append(('raw_cold',b,n,code[max(0,m.start()-80):m.end()+20]))
        if fd:lastfn=fd[-1]
        if re.search(r'rank\s*=\s*punDown|seatPut\([^)]*punDown',l) and RAW.search(l) and b!='jpun.js':
            fails.append(('stack',b,n,l[:120]))
v='-v' in sys.argv;md='--md' in sys.argv
if md:
    print('| # | site | road | crime words | weight | penalty after |');print('|---|---|---|---|---|---|')
    for i,r in enumerate(rows,1):print(f'| {i} | {r[0]}:{r[1]} | {r[2]} | {r[3].replace("|","/")} | {r[4]} | {r[5]} |')
elif v:
    for r in rows:print(f'{r[0]}:{r[1]} {r[2]} {r[3]!r} → {r[4]}')
from collections import Counter
C=Counter(r[2] for r in rows)
print('sites:',len(rows),dict(C))
for k in ('raw_cold','stack'):
    L=[x for x in fails if x[0]==k];print(f'{k}: {len(L)}')
    for x in L:print('  FAIL',x[1]+':'+str(x[2]),x[3])
sys.exit(1 if fails else 0)

#!/usr/bin/env python3
"""hand-max-static.py — KIT §101.11 (owner 26/11 ~21:25Z «mỗi một cái sự kiện mình chỉ cần maximum là 7 lá thôi»): static half of the ≤7-card census.
Every literal option array in dev/build/j*.js (`opts:[...]`, `opts=[...]`) → its element count; > 7 = a source fault row. Arrays built from lists
(`opts:X.map(...)`, `.concat`, `...spread`) are VARIABLE: listed with their source so the dynamic census (hand-max-hook.js via evbot) shows the real count.
usage: python3 dev/test/hand-max-static.py [min=8]   prints file:line count first-option-text"""
import re,sys,glob,os
MIN=int(sys.argv[1]) if len(sys.argv)>1 else 8
R=os.path.join(os.path.dirname(__file__),'..','build')
def scan(src,i):
    """src[i]=='[' → (count of top-level elements, end index, has spread)"""
    d=0;n=0;k=i;q=None;nonempty=False;spread=False;tpl=0
    while k<len(src):
        c=src[k]
        if q:
            if c=='\\':k+=2;continue
            if q=='`' and c=='$' and src[k+1:k+2]=='{':tpl+=1;q=None;k+=2;d+=1;continue
            if c==q:q=None
            k+=1;continue
        if c in '"\'`':q=c;nonempty=nonempty or d==1
        elif c in '([{':
            if tpl and c=='{':pass
            d+=1;nonempty=nonempty or d>1
        elif c in ')]}':
            d-=1
            if tpl and c=='}' and d>=1:tpl-=1;q='`';k+=1;continue
            if d==0:return (n+1 if nonempty else 0),k,spread
        elif c==',' and d==1:n+=1
        elif d==1 and not c.isspace():
            nonempty=True
            if src[k:k+3]=='...':spread=True
        k+=1
    return n,k,spread
rows=[];var=[]
for f in sorted(glob.glob(os.path.join(R,'j*.js'))):
    s=open(f,encoding='utf8').read();b=os.path.basename(f)
    for m in re.finditer(r'\bopts\s*[:=]\s*',s):
        j=m.end();ln=s.count('\n',0,m.start())+1
        if s[j]=='[':
            n,e,sp=scan(s,j);first=re.search(r'''n\s*:\s*["'`]([^"'`]{1,40})''',s[j:e]);
            if n>=MIN or sp:rows.append((n,b,ln,'spread' if sp else '',first.group(1) if first else ''))
        else:
            ex=s[j:j+90].split('\n')[0]
            if re.search(r'\.map\(|\.concat\(|\.filter\(',ex):var.append((b,ln,ex[:80]))
print(f'LITERAL option arrays with ≥{MIN} entries (or a ...spread):')
for n,b,ln,sp,fi in sorted(rows,reverse=True):print(f'  {n:3d} {sp:6s} {b}:{ln}  «{fi}»')
print(f'VARIABLE option arrays (built from a list; real count from the dynamic census): {len(var)}')
for b,ln,ex in var:print(f'  {b}:{ln}  {ex}')

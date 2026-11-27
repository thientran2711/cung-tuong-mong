#!/usr/bin/env python3
"""inv-stack (law 11 whole group): find every push into a person's chest in dev/build/j*.js.
   usage: python3 dev/test/inv-stack-scan.py [--fix] [--table]
   A site is "raw" when it still writes `<who>.inv.push(` / `(<who>.inv=…).push(` instead of the ONE rule invAdd(<who>, …).
   Not a person's chest (left alone, listed): KMSNAP.inv (the bag snapshot for the new-piece animation), jdisp F.inv / local inv (display fixture).
   Exit 1 when a raw site remains (CI guard)."""
import re,glob,os,sys
ROOT=os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
NOTP=("KMSNAP",)
PAT=re.compile(r'(\(\s*)?([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*)\.inv(\s*=\s*[^;()]*?\|\|\s*\[\]\s*\))?\.push\(')
def args_end(s,i):
    d=0;q=None;j=i
    while j<len(s):
        c=s[j]
        if q:
            if c=='\\':j+=2;continue
            if c==q:q=None
            elif q=='`' and c=='$' and s[j+1:j+2]=='{':
                # template literal expression: skip balanced braces
                k=j+2;b=1
                while k<len(s) and b:
                    if s[k]=='{':b+=1
                    elif s[k]=='}':b-=1
                    k+=1
                j=k;continue
        elif c in '"\'`':q=c
        elif c in '([{':d+=1
        elif c in ')]}':
            if d==0:return j
            d-=1
        j+=1
    return -1
def top_commas(a):
    d=0;q=None;n=0;j=0
    while j<len(a):
        c=a[j]
        if q:
            if c=='\\':j+=2;continue
            if c==q:q=None
        elif c in '"\'`':q=c
        elif c in '([{':d+=1
        elif c in ')]}':d-=1
        elif c==',' and d==0:n+=1
        j+=1
    return n
fix='--fix' in sys.argv;rows=[];raw=0
for f in sorted(glob.glob(os.path.join(ROOT,'dev/build/j*.js'))):
    b=os.path.basename(f)
    if b in('jstack.js',):continue
    src=open(f,encoding='utf-8').read();out=[];pos=0;changed=False
    for m in PAT.finditer(src):
        if m.start()<pos:continue
        who=m.group(2);paren=m.group(1);asg=m.group(3)
        if who.split('.')[0] in NOTP or (b=='jdisp.js' and who=='F'):rows.append((b,src.count('\n',0,m.start())+1,who,'not a chest (left)'));continue
        if paren and not asg:continue
        st=m.end();en=args_end(src,st)
        if en<0:continue
        a=src[st:en];line=src.count('\n',0,m.start())+1
        if top_commas(a)>0:
            # several pieces in one push: one invAdd per piece
            parts=[];d=0;q=None;cur='';j=0
            while j<len(a):
                c=a[j]
                if q:
                    cur+=c
                    if c=='\\':cur+=a[j+1];j+=2;continue
                    if c==q:q=None
                elif c in '"\'`':q=c;cur+=c
                elif c in '([{':d+=1;cur+=c
                elif c in ')]}':d-=1;cur+=c
                elif c==',' and d==0:parts.append(cur);cur=''
                else:cur+=c
                j+=1
            parts.append(cur)
            rep='('+','.join(f'invAdd({who},{x.strip()})' for x in parts)+')'
        else:rep=f'invAdd({who},{a})'
        s0=m.start()+(len(paren) if paren else 0)
        if paren and asg:
            # (p.inv=p.inv||[]).push(x) → invAdd(p,x): the opening paren of the group is part of the match, its closing one ends before .push
            s0=m.start()
        raw+=1;rows.append((b,line,who,'raw → invAdd' if fix else 'RAW'))
        if fix:out.append(src[pos:s0]);out.append(rep);pos=en+1;changed=True
    if fix and changed:out.append(src[pos:]);open(f,'w',encoding='utf-8').write(''.join(out))
if '--table' in sys.argv:
    for r in rows:print('| %s:%d | %s | %s |'%r)
print(('FIXED' if fix else 'RAW')+' sites: %d · listed %d'%(raw,len(rows)))
sys.exit(1 if (raw and not fix) else 0)

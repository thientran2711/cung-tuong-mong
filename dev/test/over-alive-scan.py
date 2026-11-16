"""LUẬT SỬA CẢ NHÓM scan (review/succession-port): every end-of-life call over(h,t,fate[,alive]) and every over() wrapper.
The end card says "Kết cục" for a living ending and "Chết vì" for a death (j32 overAlive: 4th arg, else the fate wording).
Reports: (1) wrappers that drop the 4th argument, (2) calls whose heading/fate is a LIVING ending but would print "Chết vì".
usage: python3 dev/test/over-alive-scan.py [dev/build]"""
import re,sys,glob,os
D=sys.argv[1] if len(sys.argv)>1 else os.path.join(os.path.dirname(__file__),'..','build')
ALIVE=re.compile(r'thoái vị|xuất cung|ra khỏi cung|xuất gia|về quê|ẩn cư|an hưởng|còn sống|trốn khỏi cung|tự do|nhường ngôi',re.I)
DEAD=re.compile(r'chết|qua đời|tự vẫn|băng hà|ban chết|xử tử',re.I)
def args_at(s,i):
    """s[i]=='(' -> list of top-level argument source strings"""
    out=[];depth=0;cur='';j=i;st=[]
    while j<len(s):
        c=s[j]
        if st and st[-1] in '"\'':
            cur+=c
            if c=='\\':cur+=s[j+1];j+=2;continue
            if c==st[-1]:st.pop()
            j+=1;continue
        if st and st[-1]=='`':
            cur+=c
            if c=='\\':cur+=s[j+1];j+=2;continue
            if c=='`':st.pop()
            elif c=='$' and s[j+1]=='{':cur+='{';st.append('{');j+=2;continue
            j+=1;continue
        if c in '"\'`':st.append(c);cur+=c;j+=1;continue
        if c in '([{':
            if c=='(' and depth==0 and not st and j==i:depth=1;j+=1;continue
            st.append(c);cur+=c;j+=1;continue
        if c in ')]}':
            if st and st[-1] in '([{':st.pop();cur+=c;j+=1;continue
            out.append(cur.strip());return out
        if c==',' and not st:out.append(cur.strip());cur='';j+=1;continue
        cur+=c;j+=1
    return out
rows=[];wr=[]
for f in sorted(glob.glob(os.path.join(D,'j*.js'))):
    s=open(f,encoding='utf-8').read();b=os.path.basename(f)
    for m in re.finditer(r'(?<![\w.])over=function\(([^)]*)\)',s):
        seg=s[m.end():m.end()+1500];call=re.search(r'o0\.(call|apply)\(this,([^)]*)\)|\bf\.apply\(this,arguments\)',seg)
        ok='arguments' in (call.group(0) if call else '') or 'alive' in m.group(1)
        wr.append((b,s.count('\n',0,m.start())+1,m.group(1),'passes all' if ok else 'DROPS alive'))
    for m in re.finditer(r'(?<![\w.])over\(',s):
        if s[m.start()-9:m.start()]=='function ':continue
        a=args_at(s,m.end()-1)
        if len(a)<3:continue
        h,t,fate=a[0],a[1],a[2];al=a[3] if len(a)>3 else ''
        lit=lambda x:re.sub(r'\$\{[^}]*\}','…',x.strip('"\'`'))
        F=lit(fate)
        if al in('true','!0'):live='alive (arg)'
        elif al in('false','!1'):live='dead (arg)'
        elif al:live='arg '+al[:20]
        else:live='alive (words)' if (ALIVE.search(F) and not DEAD.search(F)) else 'dead (words)'
        rows.append((b,s.count('\n',0,m.start())+1,lit(h)[:40],F[:60],live))
print('## over() wrappers');print('| file:line | params | 4th arg |');print('|---|---|---|')
for r in wr:print(f'| {r[0]}:{r[1]} | {r[2]} | {r[3]} |')
print('\n## over() calls');print('| file:line | heading | fate | card says |');print('|---|---|---|---|')
for r in rows:print(f'| {r[0]}:{r[1]} | {r[2]} | {r[3]} | {"Kết cục" if r[4].startswith("alive") else "Chết vì" if r[4].startswith("dead") else r[4]} ({r[4]}) |')

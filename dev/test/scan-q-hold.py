#!/usr/bin/env python3
"""Q-SOFTLOCK family scan (dev/test/scan-q-hold.py): every wrapper of showModal / nextBuoi in dev/build/j*.js that can RETURN WITHOUT calling
the inner function (= a hold source: the card stays unpainted in Q / the turn does not run). Prints one row per hold-return with file:line and the
condition text before it. usage: python3 dev/test/scan-q-hold.py [dev/build]"""
import re,sys,os,glob
D=sys.argv[1] if len(sys.argv)>1 else 'dev/build'
def body(s,i):
    d=0
    for j in range(i,len(s)):
        c=s[j]
        if c=='{':d+=1
        elif c=='}':
            d-=1
            if d==0:return s[i:j+1]
    return s[i:]
rows=[]
for f in sorted(glob.glob(os.path.join(D,'j*.js'))):
    if f.endswith('all.js'):continue
    s=open(f,encoding='utf8').read()
    for fn in ('showModal','nextBuoi'):
        for m in re.finditer(r'const\s+(\w+)\s*=\s*'+fn+r'\s*;\s*'+fn+r'\s*=\s*function\s*\([^)]*\)\s*',s):
            inner=m.group(1);b=body(s,m.end())
            call=re.search(r'\b'+inner+r'\s*\.\s*(apply|call)\b|\b'+inner+r'\s*\(',b)
            ci=call.start() if call else len(b)
            for r in re.finditer(r'\breturn\b',b[:ci+40]):
                if re.match(r'return\s+'+inner+r'\b',b[r.start():]):continue
                # a return inside a nested arrow/function before the call is not the wrapper's own return
                pre=b[:r.start()]
                if re.search(r'=>\s*\{[^}]*$|function\s*\([^)]*\)\s*\{[^}]*$',pre[-200:]):continue
                line=s.count('\n',0,m.end()+r.start())+1
                cond=re.sub(r'\s+',' ',pre[-170:])
                rows.append((fn,os.path.basename(f),line,cond))
print('| fn | file:line | condition before the hold-return (last 170 chars) |\n|---|---|---|')
for fn,f,l,c in rows:print(f'| {fn} | {f}:{l} | `{c.replace("|","/")}` |')
print(f'\nTOTAL hold-returns: showModal {sum(1 for r in rows if r[0]=="showModal")} · nextBuoi {sum(1 for r in rows if r[0]=="nextBuoi")}')

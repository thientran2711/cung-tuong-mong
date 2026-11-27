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

# ---- family B: the motion-scene queue (KMQ) holders — a host that merely EXISTS / a busy flag with nothing on screen (Q-SOFTLOCK (a)/(b))
j93=open(os.path.join(D,'j93.js'),encoding='utf8').read();dq=open(os.path.join(D,'jdayq.js'),encoding='utf8').read()
m=re.search(r'function kmFree\(\)\{(.*?)return true\}',j93,re.S);kb=m.group(1) if m else ''
ex=re.findall(r'getElementById\("(\w+)"\)|querySelector\(\'([^\']+)\'\)',kb)
hosts=[a or b for a,b in ex]
cov1='dqKmReal' in dq and 'DQ.kg' in dq
cov2='function dqKmStale' in dq
print('\n| family B: scene-queue holder (j93 kmFree / kmPump) | ghost-prone (exists ≠ on screen) | covered by jdayq on-screen rule |\n|---|---|---|')
for h in hosts:print(f'| kmFree host `{h}` | yes | {"yes (kmFree wrapper: dqKmReal after BAL.dayq.wake)" if cov1 else "NO"} |')
print(f'| kmBusy held by a scene job with nothing on screen (600 s guard) | yes | {"yes (dqKmStale after BAL.dayq.stale, queue waiting)" if cov2 else "NO"} |')
# the jdayq kmFree wrapper's OWN gates (every other kmFree wrapper in dev/build would be listed the same way: grep `kmFree=function`)
wr=re.search(r'const kf=kmFree;kmFree=function\(\)\{(.*?)\}\}\)\(\);',dq,re.S);wb=wr.group(1) if wr else ''
gates=[('activity gate (c): `#ov` un-hidden','ovS',r'dqShown\(ov\)'),('activity gate (c): `DF.play` handle','dfS',r'dqOn\("\.kfoc"\)')]
unc=sum(1 for h in hosts if not cov1)+(0 if cov2 else 1)
for name,key,onrule in gates:
    held=(key in wb) or ('DF.play' in wb if key=='dfS' else '!dqHidden(ov)' in wb)
    ok=bool(re.search(onrule,wb)) and 'DQ.ka' in wb
    if held and not ok:unc+=1
    print(f'| jdayq kmFree {name} | {"yes" if held else "n/a"} | {"yes (on screen only, ghost released after BAL.dayq.wake: DQ.ka)" if ok else "NO"} |')
print('| jdayq kmFree tap gate (scene posted inside a tap waits ONE pump) | no (bounded: one 250 ms pump) | n/a |')
print('| jdayq kmFree newsHold (scene waits on the unpainted news card) | no (bounded: newsLet lets the scene through when the card cannot paint) | n/a |')
print(f'\nFAMILY B uncovered: {unc} of {len(hosts)+1+len(gates)}')

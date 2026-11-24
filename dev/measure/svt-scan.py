#!/usr/bin/env python3
"""svt-scan (law 11, servant-trust): every place in dev/build/j*.js where an act makes ANOTHER person's servant engage (spyFor = …, or a call of
bribeServ / threatServ / tmTake / tmAsk / svTalk) and whether it reaches the ONE relationship effect svTouch (jsvt.js).
usage: python3 dev/measure/svt-scan.py [build_dir]   → one row per site: file:line  kind  status ; exit 1 when a site is UNWIRED.
status: inline (svTouch on the line) · wrapped (inside a function jsvt wraps) · via-wrapped (calls a wrapped function) · exempt:<why> · UNWIRED"""
import os,re,sys
D=sys.argv[1] if len(sys.argv)>1 else os.path.join(os.path.dirname(__file__),'..','build')
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
for r in rows:print('\t'.join(r))
print(f'# {len(rows)} sites, {bad} UNWIRED');sys.exit(1 if bad else 0)

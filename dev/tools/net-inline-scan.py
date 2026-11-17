#!/usr/bin/env python3
"""ONE CORE scan (show-why): numbers chosen by a nết test written inline in game code instead of read from BAL.net.
Hits: nq(p,k,<literal>) · <nết test>?<literal>:<literal> · if(<nết test>)x+=/-=<literal> · (<nết test>?<literal>:<literal>).
Nết tests: hasT(...), netIs(...), netRx(...). Prints file:line + snippet; last line = count. Usage: python3 dev/tools/net-inline-scan.py [dev/build]"""
import re,sys,glob,os
d=sys.argv[1] if len(sys.argv)>1 else os.path.join(os.path.dirname(__file__),'..','build')
T=r'(?:hasT|netIs|netRx)\((?:[^()]|\([^()]*\))*\)'
NUM=r'-?(?:\d+\.?\d*|\.\d+)'
pats=[re.compile(r'\bnq\([^,()]+,"[a-z]+",\s*'+NUM+r'\)'),
      re.compile(T+r'(?:\s*(?:\|\||&&)\s*'+T+r')*\s*\?\s*'+NUM+r'\s*:'),
      re.compile(r'if\(\s*'+T+r'(?:\s*(?:\|\||&&)\s*'+T+r')*\s*\)\s*[\w.]+\s*[+\-*]=\s*'+NUM+r'\b'),
      re.compile(r'if\(\s*'+T+r'(?:\s*(?:\|\||&&)\s*'+T+r')*\s*\)\s*[\w.]+\s*[+\-]=\s*\w+\s*\?\s*'+NUM)]
n=0
for f in sorted(glob.glob(os.path.join(d,'j*.js'))):
    b=os.path.basename(f)
    if b in('jnet.js','jbal.js','jbal2.js'):continue
    for i,l in enumerate(open(f,encoding='utf-8'),1):
        seen=set()
        for p in pats:
            for m in p.finditer(l):
                if m.start() in seen:continue
                seen.add(m.start());n+=1;print(f'{b}:{i}: {m.group(0)[:110]}')
print(f'INLINE NET NUMBERS: {n}')

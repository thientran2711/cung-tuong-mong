#!/usr/bin/env python3
"""review/mg-score-same: shown-vs-given table from a mg-bots.js run with the shown/given fields (MGBOT_ALL31=1 ... out.json).
usage: python3 dev/measure/mg-score-same.py before.json.jsonl [after.json.jsonl]
per kind: n plays, how many plays ended with the board's last score == the mark given, typical shown→given pairs."""
import json,sys,re,collections
def load(p):
    D=collections.OrderedDict()
    for l in open(p):
        r=json.loads(l)
        if r.get('given') is None: continue
        m=re.match(r'\s*([\d.]+)\s*/\s*(\d+)',str(r.get('shown') or ''))
        sh=None if not m else (float(m.group(1)) if m.group(2)=='10' else 'x/'+m.group(2))
        D.setdefault(r['kind'],[]).append((sh,r['given'],r.get('raw')))
    return D
A=load(sys.argv[1]);B=load(sys.argv[2]) if len(sys.argv)>2 else None
def cell(L):
    if not L: return 'n=0','–'
    same=sum(1 for s,g,_ in L if isinstance(s,float) and s==g)
    ex=', '.join(sorted({f"{(s if not isinstance(s,float) else ('%g'%s))}→{g}" for s,g,_ in L})[:4])
    return f"{same}/{len(L)}",ex
print('| kind | before same | before shown→given | after same | after shown→given |')
print('|---|---|---|---|---|')
for k in A:
    a=cell(A[k]);b=cell(B.get(k,[])) if B else ('','')
    print(f"| {k} | {a[0]} | {a[1]} | {b[0]} | {b[1]} |")

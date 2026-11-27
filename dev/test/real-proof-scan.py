#!/usr/bin/env python3
"""REAL-PROOF family scan (law 11; owner 27/11 ~00:10Z «Bằng chứng và nhân chứng có thật trong game không vậy, hay chỉ là 1 con số đó ?").
usage: python3 dev/test/real-proof-scan.py [git-rev]   (no rev = the working tree; exit 1 on a fault)
Checks every place that MAKES a piece of evidence text or a witness:
 F1 invented evidence: a j78proof road that writes «nói xấu … lần thứ N» / talk with no overheard fact behind it
 F2 witness store written as a bare count (h.ewc / W[c] = number) instead of real people's ids
 F3 witness found without a real person (chWitGo / write path not reading t.wsee through chWitAv)
 F4 witness shown without a name (chWitTxt / notice list with no chWitNm)
Story-arc witness flags (S.st.wit, f:"wit") are listed as INFO (a story's own named person; not the charge witness store)."""
import re,subprocess,sys
rev=sys.argv[1] if len(sys.argv)>1 else None
def rd(p):
    if rev: return subprocess.run(['git','show',f'{rev}:{p}'],capture_output=True,text=True).stdout
    return open(p,encoding='utf-8').read()
nc=lambda s:re.sub(r'/\*.*?\*/','',s,flags=re.S)
j78=nc(rd('dev/build/j78.js'));jc=nc(rd('dev/build/jcharge.js'))
F=[]
m=re.search(r'function j78proof\(v\)\{(.*?)\nfunction j78mkEvd',j78,re.S);body=m.group(1) if m else ''
if 'lần thứ' in body: F.append(('F1','j78.js j78proof','invents «nói xấu … lần thứ N có người nghe thấy»'))
if re.search(r'nói xấu',body) and 'để bụng' not in body: F.append(('F1','j78.js j78proof','talk piece with no overheard fact (S.intel) behind it'))
for x in re.finditer(r'W\[(\w+)\]=([^;]{0,60})',jc):
    rhs=x.group(2)
    if re.match(r'\(W\[\w+\]\|\|0\)\+1|x\b|\d',rhs): F.append(('F2','jcharge.js',f'W[{x.group(1)}]={rhs[:30]}'))
if 'chWitAv' not in jc or 'wsee' not in jc: F.append(('F3','jcharge.js','no «who really saw it» store (t.wsee) read when a witness is found'))
if 'chWitNm' not in jc: F.append(('F4','jcharge.js','witnesses shown as a count / kind only, never a name'))
info=[]
for p in ['dev/build/j4.js','dev/build/jstory.js']:
    s=rd(p);n=len(re.findall(r'st\.wit|f:"wit"',s))
    if n: info.append((p,n))
print(f'real-proof-scan @ {rev or "worktree"}: faults {len(F)}')
for f in F: print(' FAULT',*f)
for p,n in info: print(f' INFO story witness flags {p}: {n} (story arc person, not the charge store)')
sys.exit(1 if F else 0)

import subprocess,sys
B='05804755';sides={'ours':'origin/review/lr-rules','theirs':'origin/review/tmk-oanpace-fix-rv'}
def sh(*a):return subprocess.run(a,capture_output=True,text=True).stdout
for name,ref in sides.items():
  files=sh('git','diff','--name-only',B,ref,'--','dev/build','dev/test').split()
  for f in files:
    try:m=set(open(f,encoding='utf-8').read().split('\n'))
    except FileNotFoundError: print(name,f,'FILE GONE');continue
    d=sh('git','diff','-U0',B,ref,'--',f)
    add=[l[1:] for l in d.split('\n') if l.startswith('+') and not l.startswith('+++')]
    miss=[l for l in add if l not in m and l.strip()]
    if miss: print(name,f,len(miss),'of',len(add))
print('--- low-similarity (<0.85) missing lines')
import difflib
for name,ref in sides.items():
  for f in sh('git','diff','--name-only',B,ref,'--','dev/build','dev/test').split():
    M=open(f,encoding='utf-8').read().split('\n');ms=set(M)
    d=sh('git','diff','-U0',B,ref,'--',f)
    for l in [l[1:] for l in d.split('\n') if l.startswith('+') and not l.startswith('+++')]:
      if l in ms or not l.strip(): continue
      best=max((difflib.SequenceMatcher(None,l,x,autojunk=False).quick_ratio(),x) for x in M if abs(len(x)-len(l))<len(l)*.6+50) if M else (0,'')
      r=difflib.SequenceMatcher(None,l,best[1],autojunk=False).ratio() if best[0]>.5 else 0
      if r<.85: print(name,f,round(r,2),l[:160])

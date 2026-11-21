#!/usr/bin/env python3
"""cold-faction scan (law 11 whole family): every faction-logic spot that reads HER as present without the lãnh cung rule.
Looks at the faction functions (j10 fac*/found/joinFac/leaveFac/sellOut/divide/jointScheme/facMonth/facHTML/facAct, jagacts3 p3Fac*,
jrcv RCVK.fac*, j25 approachOne facAsk, jagwhyg2b facAsk/facDiv, j14 coldActsOf) and flags a presence test that lets S through unconditionally
(`x===S||`, `p===S||`, `y===S||`) or a filter without a presence test where an NPC check (`alive`, `out`) is applied.
usage: python3 dev/tools/cold-faction-scan.py [git-ref]   (default: working tree)"""
import re,subprocess,sys
ref=sys.argv[1] if len(sys.argv)>1 else None
FILES={'dev/build/j10.js':r'fac|found\(|joinFac|leaveFac|sellOut|divide\(|jointScheme|askJoin|clanOf','dev/build/jagacts3.js':r'p3Fac|cx3:fac','dev/build/jrcv.js':r'RCVK\.fac|PEND\.rcvAsk',
 'dev/build/j25.js':r'facAsk','dev/build/jagwhyg2b.js':r'npwReg\("fac','dev/build/j14.js':r'coldActsOf|coldFacActs|facOf\(p\)'}
PAT=[(r'\b([a-z])===S\|\|\(?\1\.alive','S always present (x===S||x.alive…)'),(r'\(p===S\|\|\(p\.alive','S always present in member list'),
     (r'l!==S&&!facOf\(S\)&&aff\(l,S\)','invite her: no presence test'),(r'!p\|\|p===S\|\|!p\.alive\|\|p\.out\|\|','letter asker dropped when out')]
def src(f):
    if ref: return subprocess.run(['git','show',f'{ref}:{f}'],capture_output=True,text=True).stdout
    return open(f).read()
tot=0
for f,scope in FILES.items():
    for i,l in enumerate(src(f).split('\n'),1):
        if not re.search(scope,l): continue
        for p,why in PAT:
            for m in re.finditer(p,l):
                tot+=1;print(f'{f}:{i}: {why}: …{l[max(0,m.start()-40):m.end()+30]}…')
print(f'COLD-FACTION SCAN {ref or "worktree"}: {tot} spot(s)')

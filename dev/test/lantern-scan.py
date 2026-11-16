#!/usr/bin/env python3
"""nw-lantern scan: every entry point of the old Đố đèn riddle game. usage: python3 dev/test/lantern-scan.py [git-rev]  (default: working tree)
Counts riddle words (đố đèn / câu đố / giải đố / lời đố / k91Lantern / KG82_DO / b:"do" quiz bank) in dev/build/j*.js (generated all*.js excluded)."""
import re,subprocess,sys,glob,os
pat=re.compile(r'đố đèn|câu đố(?![iì])|giải đố|lời đố|k91Lantern|KG82_DO|doden-panel|b:"do"|e:"lantern"',re.I)
rev=sys.argv[1] if len(sys.argv)>1 else None
def files():
    if rev:
        out=subprocess.check_output(['git','ls-tree','-r','--name-only',rev,'dev/build/'],text=True).split()
        return [f for f in out if re.search(r'dev/build/j[^/]*\.js$',f)]
    return [f for f in glob.glob('dev/build/j*.js')]
def read(f):
    return subprocess.check_output(['git','show',f'{rev}:{f}'],text=True) if rev else open(f,encoding='utf8').read()
n=0
for f in sorted(files()):
    for i,l in enumerate(read(f).split('\n'),1):
        for m in pat.finditer(l):
            n+=1;print(f"{f}:{i}: {m.group(0)}")
print("TOTAL",n)

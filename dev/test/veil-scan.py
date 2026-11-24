#!/usr/bin/env python3
"""veil-scan: every dev/test/*.js that calls start() AND taps (mouse.click / tap / click) must be guarded against the #kroulw picture-wait veil.
usage: python3 dev/test/veil-scan.py [root]   -> counts + the list of UNGUARDED tests (exit 1 if any)"""
import re,glob,sys
from collections import Counter
d=sys.argv[1] if len(sys.argv)>1 else '.'
T=re.compile(r'mouse\.click|touchscreen\.tap|\.tap\(|\.click\(|dispatchEvent')
rows=[]
for f in sorted(glob.glob(d+'/dev/test/*.js')):
    s=open(f,encoding='utf-8',errors='ignore').read()
    if not(re.search(r'\bstart\(',s) and T.search(s)):continue
    rows.append(('guarded' if re.search(r"lib/veil|kroulw",s) else 'kroul-handled' if 'kroul' in s else 'UNGUARDED',f.split('/')[-1]))
print(dict(Counter(c for c,_ in rows)))
un=[f for c,f in rows if c=='UNGUARDED']
for f in un:print(' ',f)
sys.exit(1 if un else 0)

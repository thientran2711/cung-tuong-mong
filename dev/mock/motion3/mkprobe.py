#!/usr/bin/env python3
"""mkprobe.py <game index.html> <out dir>: out/kperf.html = the built game + <script src=kperf.js> (hidden ?kperf=1 probe); copies the mock files next to it."""
import sys,shutil,os
src,out=sys.argv[1],sys.argv[2];os.makedirs(out,exist_ok=True);h=open(src,encoding='utf-8').read()
assert '</body>' in h;h=h.replace('</body>','<script src="kperf.js"></script></body>',1);open(os.path.join(out,'kperf.html'),'w',encoding='utf-8').write(h)
d=os.path.dirname(os.path.abspath(__file__))
for f in ['kperf.js','lib.js','m1.js','m2.js','m4.js','scen.js']:shutil.copy(os.path.join(d,f),out)
print('ok',len(h))

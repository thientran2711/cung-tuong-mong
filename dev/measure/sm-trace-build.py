#!/usr/bin/env python3
"""DAYQ-NOTURN: build dev/index.trace.html = dev/index.html with every showModal wrapper pushing its number into window.__smT when entered.
The last number of one showModal() call is the gate that swallowed it (the wrappers inside it never ran). Map: /tmp file printed at the end.
usage: python3 dev/build/assemble.py && python3 dev/measure/sm-trace-build.py [map.json]"""
import re,json,sys
s=open('dev/index.html',encoding='utf-8').read();n=[0];ctx={}
def rep(m):
    n[0]+=1;ctx[n[0]]=s[max(0,m.start()-160):m.start()].replace('\n',' ')[-160:];return m.group(1)+'(window.__smT||(window.__smT=[])).push(%d);'%n[0]
s2=re.sub(r'((?<![\w.])showModal\s*=\s*function\s*\w*\s*\([^)]*\)\s*\{)',rep,s)
def base(m):
    n[0]+=1;ctx[n[0]]='BASE function showModal';return m.group(1)+'(window.__smT||(window.__smT=[])).push(%d);'%n[0]
s2=re.sub(r'(function showModal\s*\([^)]*\)\s*\{)',base,s2)
open('dev/index.trace.html','w',encoding='utf-8').write(s2)
out=sys.argv[1] if len(sys.argv)>1 else 'smtrace-map.json';json.dump(ctx,open(out,'w'),ensure_ascii=False,indent=0);print(n[0],'wrappers; map',out)

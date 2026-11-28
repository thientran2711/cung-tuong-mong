#!/usr/bin/env python3
"""srvmerit-guard family scan (static): every read of S.srv.<x> in dev/build/j*.js and the guard it sits behind.
usage: python3 dev/tools/srv-reader-scan.py [--list]
A read is 'guarded' when the same source line (statements are one per line in this code base) tests the record first
(isSrv() / S.srv&& / S.srv? / if(!S.srv / S&&S.srv / srvM() returning null); 'act' = inside a cung nữ act builder (srvCards / srvTalk),
now gated as a whole by jsrvguard.js; 'other' = the rest, listed with --list for review."""
import re,glob,os,sys
D=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
G=re.compile(r'isSrv\(\)|S\.srv&&|S\.srv\?|!S\.srv\b|S&&S\.srv|isSrv67\(\)|isSrvSafe\(\)|exSrv\(|tsSrv\(\)')
R=re.compile(r'S\.srv\.[A-Za-z_]')
ACT=('srvCards','srvTalk')
tot=gd=act=0;other=[]
for f in sorted(glob.glob(os.path.join(D,'j*.js'))):
  if os.path.basename(f)=='jsrvguard.js':continue
  cur=None
  for i,l in enumerate(open(f,encoding='utf-8'),1):
    m=re.match(r'\s*function (\w+)',l)
    if m:cur=m.group(1)
    n=len(R.findall(l))
    if not n:continue
    tot+=n
    if G.search(l):gd+=n
    elif cur in ACT or (os.path.basename(f)=='j42.js' and 171<=i<=330):act+=n
    else:other.append((os.path.basename(f),i,cur,n,l.strip()[:110]))
print(f"S.srv.<x> reads: {tot} · guarded on the line: {gd} · inside the cung nữ act builders (gated by jsrvguard): {act} · other: {sum(x[3] for x in other)} in {len(other)} lines")
if '--list' in sys.argv:
  for x in other:print(f"  {x[0]}:{x[1]} [{x[2]}] ×{x[3]}  {x[4]}")

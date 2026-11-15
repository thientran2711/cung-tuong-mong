#!/usr/bin/env python3
"""review/small-bugs-3 source scan (LUAT SUA CA NHOM). usage: python3 dev/test/sb3-scan.py [than]
than: every player-visible 'thân ±N' (relation delta written with the old word) in dev/build/j*.js — must be 0.
Comments (/* */, //) are skipped; 'xuất thân', 'bản thân', 'thân phận', 'thân thiết', 'người thân' (kin) are not relation deltas."""
import re,glob,sys,os
D=os.path.dirname(os.path.abspath(__file__))+'/../build/'
def strip_comments(t):
  # keep line structure; drop /* */ and // comments outside strings (rough but fine for this codebase)
  out=[];i=0;n=len(t);q=None
  while i<n:
    c=t[i]
    if q:
      out.append(c)
      if c=='\\' and i+1<n: out.append(t[i+1]);i+=2;continue
      if c==q: q=None
      i+=1;continue
    if c in '"\'`': q=c;out.append(c);i+=1;continue
    if t.startswith('/*',i):
      j=t.find('*/',i+2);j=n if j<0 else j+2;out.append(re.sub(r'[^\n]','',t[i:j]));i=j;continue
    if t.startswith('//',i) and (i==0 or t[i-1] not in ':\\'):
      j=t.find('\n',i);j=n if j<0 else j;i=j;continue
    out.append(c);i+=1
  return ''.join(out)
THAN=re.compile(r'(?<![\wÀ-ỹ])(?<!Phụ )thân\s*(?:[+\-−±]\s*(?:\d|\$\{)|\$\{[^}]*\}\s*\d*\s*(?=[^\w]))')
def scan(rx,files=None):
  hits=[]
  for f in sorted(files or glob.glob(D+'j*.js')):
    b=os.path.basename(f)
    if b.startswith('all'):continue
    t=strip_comments(open(f,encoding='utf-8').read())
    for ln,l in enumerate(t.split('\n'),1):
      for m in rx.finditer(l):
        hits.append((b,ln,l[max(0,m.start()-50):m.end()+25].strip()))
  return hits
if __name__=='__main__':
  what=sys.argv[1] if len(sys.argv)>1 else 'than'
  H=scan(THAN)
  for h in H: print('%s:%d: %s'%h)
  print('TOTAL',len(H))

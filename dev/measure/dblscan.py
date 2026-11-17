#!/usr/bin/env python3
"""balance-2 (D8) family scan: dialog options whose fx (applied by chooseM) is ALSO applied again inside go (same key with apply/ap on her).
usage: python3 dev/measure/dblscan.py  (static, one-line options {n:…,fx:{…},…go:…})"""
import re,glob,os
D='dev/build/';n=0
for f in sorted(glob.glob(D+'j*.js')):
  if os.path.basename(f).startswith('all'):continue
  for ln,line in enumerate(open(f,encoding='utf-8'),1):
    for m in re.finditer(r'\{n:(?:"[^"]{1,60}"|`[^`]{1,80}`),fx:\{([^{}]*)\}',line):
      keys=set(k for k in re.findall(r'(\w+):',m.group(1)))
      if not keys:continue
      seg=line[m.end():m.end()+900];nx=re.search(r'\{n:["`]',seg);seg=seg[:nx.start()] if nx else seg
      g=seg.find('go:')
      if g<0:continue
      body=seg[g:]
      hits=[k for k in keys if re.search(r'(apply\(|ap\(S,)\{[^}]*\b'+k+r':',body)]
      if hits:n+=1;print(f'{f[len(D):]}:{ln}  {line[m.start()+4:m.start()+44]!r}  fx {sorted(keys)} re-applied {hits}')
print('DOUBLE-APPLY candidates:',n)

#!/usr/bin/env python3
"""rv net-build: relation gates that do NOT read netTh / netThK / bandVT (wider than net-scan.py).
Lists every aff()/oan()/hostility()/evG() call or raw .rel/.oan/.rl[]/.ro[] read compared with
(a) a non-zero number, or (b) a name (BAL key / alias) that is not netTh*. Sign tests (vs 0) are skipped.
usage: python3 dev/measure/net-scan-rv.py [dev/build]   -> one line per gate + totals."""
import re,glob,sys,collections
D=sys.argv[1] if len(sys.argv)>1 else 'dev/build'
CALL=r"(?:\b(?:aff|oan|hostility|evG)\((?:[^()]|\([^()]*\))*\)|\b\w+\.(?:rel|oan)\b|\brl\[[^\]]+\]|\bro\[[^\]]+\])"
OP=r"\s*(>=|<=|>|<)\s*"
RHS=r"(-?\d+(?:\.\d+)?|-?[A-Za-z_][\w.]*(?:\[[^\]]*\])?(?:\([^()]*\))?)"
P=re.compile(CALL+OP+RHS)
tot=collections.Counter();rows=[]
for f in sorted(glob.glob(D+'/j*.js')):
  b=f.split('/')[-1]
  if b in('all.js',) or b.startswith('jbal'):continue
  for i,l in enumerate(open(f,encoding='utf8'),1):
    for m in P.finditer(l):
      r=m.group(2)
      if re.fullmatch(r"-?0(\.0+)?",r) or r.startswith(('netTh','bandVT','bandCut')) or re.fullmatch(r"-?(aff|oan|hostility|evG)",r):continue
      k='evidence(evG)' if m.group(0).startswith('evG') else 'number' if re.fullmatch(r"-?\d+(\.\d+)?",r) else 'name'
      tot[k]+=1;rows.append(f"{b}:{i}\t{k}\t{m.group(0)[:110]}")
print("\n".join(rows));print("TOTAL",sum(tot.values()),dict(tot))

#!/usr/bin/env python3
"""rv net-build: relation gates that do NOT read netTh / netThK / bandVT (wider than net-scan.py).
Lists every aff()/oan()/hostility()/evG() call or raw .rel/.oan/.rl[]/.ro[] read compared with
(a) a non-zero number, or (b) a name (BAL key / alias) that is not netTh*. Sign tests (vs 0) are skipped.
usage: python3 dev/measure/net-scan-rv.py [dev/build]   -> one line per gate + totals."""
import re,glob,sys,collections
D=sys.argv[1] if len(sys.argv)>1 else 'dev/build'
CALL=r"(?:\b(?:aff|oan|rel|hostility|evG)\((?:[^()]|\([^()]*\))*\)|\b\w+\.(?:rel|oan)\b|\brl\[[^\]]+\]|\bro\[[^\]]+\])"
OP=r"\s*(>=|<=|>|<)\s*"
RHS=r"(-?\d+(?:\.\d+)?|-?[A-Za-z_][\w.]*(?:\[[^\]]*\])?(?:\([^()]*\))?)"
P=re.compile(CALL+OP+RHS)
# net-build-rv fix 3: gates that are NOT a relation level (classified by hand, reason kept here; anything else must read netTh / netThK / bandVT)
KEEP={('jge.js','aff(S,v)>bv'):'best-so-far pick (the closest sister), not a level',
      ('jagwhy1.js','y>h'):'running max (the most hostile foe), not a level',('jrcv.js','h>bh'):'running max (the most hostile foe), not a level',
      ('jagwhy1.js','x<bar'):'bar = the level the caller passes (netTh / netThK, jagwhy1 npw1Mot callers)',('jrtrig.js','h>=L'):'L = netThK(v,"host","hostMid")',('jrtrig.js','o>=L'):'L = netTh(S,"act")',
      ('jmem.js','dA<=-B()'):'a CHANGE of thiện cảm (gift taint), not a level',
      ('jtsb.js','hostility(e2,S)>=hostility(v,S)'):'compares two people, not a level'}
tot=collections.Counter();rows=[];kept=[]
for f in sorted(glob.glob(D+'/j*.js')):
  b=f.split('/')[-1]
  if b in('all.js',) or b.startswith('jbal'):continue
  for i,l in enumerate(open(f,encoding='utf8'),1):
    for m in P.finditer(l):
      r=m.group(2)
      if re.fullmatch(r"-?0(\.0+)?",r) or r.startswith(('netTh','bandVT','bandCut')) or re.fullmatch(r"-?(aff|oan|hostility|evG)",r):continue
      if (b,m.group(0)) in KEEP:kept.append(f"{b}:{i}\tKEEP\t{m.group(0)}\t{KEEP[(b,m.group(0))]}");continue
      if m.group(0).startswith('evG'):tot['evidence(evG) — chứng cứ, not a relation level (fix 1)']+=1;continue
      k='evidence(evG)' if m.group(0).startswith('evG') else 'number' if re.fullmatch(r"-?\d+(\.\d+)?",r) else 'name'
      tot[k]+=1;rows.append(f"{b}:{i}\t{k}\t{m.group(0)[:110]}")
# (fix 3 family) a level tested through a local copy: const h=hostility(..) … h>=X / const f=aff(..) … f>=X, and raw (v.oan||0) / (v.rel||0) / (x.rl[..]||0)>=X (rv r2: + .rel / rl / ro)
VP=re.compile(r"\b(?:const|let)\s+(\w+)\s*=\s*(?:aff|oan|rel|hostility)\(")
for f in sorted(glob.glob(D+'/j*.js')):
  b=f.split('/')[-1]
  if b=='all.js' or b.startswith('jbal'):continue
  for i,l in enumerate(open(f,encoding='utf8'),1):
    for m in VP.finditer(l):
      v=m.group(1)
      for g in re.finditer(r"(?<![\w.])"+v+OP+RHS,l[m.end():]):
        r=g.group(2)
        if re.fullmatch(r"-?0(\.0+)?",r) or r.startswith(('netTh','bandVT','bandCut')):continue
        if (b,g.group(0)) in KEEP:kept.append(f"{b}:{i}\tKEEP\t{g.group(0)}\t{KEEP[(b,g.group(0))]}");continue
        tot['via local']+=1;rows.append(f"{b}:{i}\tvia local\t{g.group(0)[:110]}")
    for g in re.finditer(r"\(\w+\.(?:oan|rel|rl\[[^\]]+\]|ro\[[^\]]+\])\|\|0\)"+OP+RHS,l):
      r=g.group(2)
      if re.fullmatch(r"-?0(\.0+)?",r) or r.startswith('netTh'):continue
      tot['raw oan']+=1;rows.append(f"{b}:{i}\traw oan\t{g.group(0)[:110]}")
print("\n".join(rows+kept));lv=sum(v for k,v in tot.items() if not k.startswith('evidence'))
print("TOTAL relation gates not on netTh:",lv,dict(tot),"| kept (not levels):",len(kept))

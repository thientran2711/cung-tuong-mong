#!/usr/bin/env python3
"""ONE TRAIT POOL family scan (LUẬT SỬA CẢ NHÓM): counts every old-trait read in dev/build/j*.js of a git tree.
usage: python3 dev/test/net-scan.py [<git-ref>]   (no ref = working tree). PASS = 0 in every 'old' row on the branch."""
import re,sys,subprocess,os
ref=sys.argv[1] if len(sys.argv)>1 else None
root=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..')
def files():
  if ref:
    L=subprocess.run(['git','-C',root,'ls-tree','--name-only',ref,'dev/build/'],capture_output=True,text=True).stdout.split()
    return [(f,subprocess.run(['git','-C',root,'show',ref+':'+f],capture_output=True,text=True).stdout) for f in L if re.match(r'dev/build/j[^/]*\.js$',f)]
  d=os.path.join(root,'dev/build');return [('dev/build/'+f,open(os.path.join(d,f),encoding='utf-8').read()) for f in sorted(os.listdir(d)) if re.match(r'j.*\.js$',f)]
OLDW='Hiền lành|Đa nghi|Nhu mì|Hiếu thảo|Ghen tuông|Tham tiền|Cả nể|Thẳng thắn|Khéo léo|Hiểm độc'
ROWS=[('old: X.trait==="…" / !== (field compare)',r'\.trait2?(?:===|!==)"'),
 ('old: servant X.tr==="trung|tham|nhat|lanh|chuyen"',r'\.tr(?:===|!==)"(?:trung|tham|nhat|lanh|chuyen)"'),
 ('old: TABLE[X.trait] / TABLE[X.tr] lookup',r'[A-Za-z_\]]\[[a-z][\w$]*\.(?:trait2?|tr)\]'),
 ('old: /…/.test(X.trait…) regex on the field',r'\.test\([^)]*\.trait'),
 ('old: [..].includes(X.trait)',r'\.includes\([a-z][\w$.]*\.trait\)'),
 ('old: ${X.trait} / STR[s.tr] shown to the player',r'\$\{[a-z][\w$.]*\.trait\}|STR\[[a-z][\w$.]*\.tr\]'),
 ('old: removed nết word as a code string',r'"(?:'+OLDW+')"'),
 ('old: player-only P_TR / S.pTr read',r'P_TR\[|S\.pTr\b'),
 ('pool: hasT / netIs / nq / qv / tv / netRx / netTxt / traitsOf calls',r'\b(?:hasT|netIs|nq|qv|tv|netRx|netTxt|traitsOf)\(')]
ALLOW=[r'TRK\[who\.trait\]',r'return\[[a-z&]*\.trait\]',r'TRAIT_OLD',r'const ETRAITS',r'^ (?:danghi|hieuthao):\[',r'BAL\.net=|old:\{|"Hiểm độc":"Xảo quyệt"',r'n:"Đa nghi"',r'trTraits\(p\)\{if\(p===S.emp\)']
F=files();out=[]
for name,rx in ROWS:
  n=0;where={}
  for f,s in F:
    if f.endswith(('all.js',)):continue  # the stale all40*/all4x/all_asm* snapshots (private capOf copy) were deleted in review/staff-root-r1
    for line in s.split('\n'):
      for m in re.finditer(rx,line):
        seg=line[max(0,m.start()-60):m.end()+40]
        if name.startswith('old') and any(re.search(a,line if a.startswith('^') else seg) for a in ALLOW):continue
        if name.startswith('old') and f.endswith(('j27.js',)) and ('ensureT2' in line or 'spreadTraits' in line):continue
        n+=1;where[f]=where.get(f,0)+1
  out.append((name,n,where))
for name,n,w in out:print('%-70s %5d  %s'%(name,n,' '.join('%s:%d'%(k.split('/')[-1],v) for k,v in sorted(w.items(),key=lambda x:-x[1])[:6]) if name.startswith('old') and n else ''))

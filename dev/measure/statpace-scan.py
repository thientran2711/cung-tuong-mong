#!/usr/bin/env python3
"""review/stat-pace — LAW 11 whole-family scan: every site in dev/build/j*.js that CHANGES Danh / Đức / Sủng / thiện cảm (th, hh, rel, rl)
or oán (oan, ro). Classes: FUNNEL = goes through apply / ap / affAdd / relAdd / hhSet / oanAdd / statSet (the pace rule sits in these);
DIRECT = a raw write (x.sung=…, x.rel+=…); riseDirect = a raw write that RISES a stat without the rule (must be 0 outside
fx-object builders jlux / jpoison / jrcp, the co-op mirror jcoopworld friendEntry and the funnel j9 itself); spAdd = raw rises routed through the rule.
--root <dir> scans another tree (e.g. LIVE: git worktree of origin/main). usage: python3 dev/measure/statpace-scan.py [--list] [--json]"""
import re,glob,sys,json,os
ROOT=sys.argv[sys.argv.index('--root')+1] if '--root' in sys.argv else os.path.join(os.path.dirname(__file__),'..','build')
STAT=r'(sung|danh|duc|th|hh|rel|oan|sac|tai|tamco)'  # sac / tai / tamco: PACE-SPEED (BAL.stp.abs)
PAT={
 'apply':re.compile(r'\bapply\(\{[^}]*\b(sung|danh|duc|th|hh|sac|tai|tamco)\s*:'),
 'ap':re.compile(r'\bap\([^,()]+,\{[^}]*\b(sung|danh|duc|th|hh|sac|tai|tamco)\s*:'),
 'statSet':re.compile(r'\bstatSet\([^,]+,"(sung|danh|duc|th|hh|sac|tai|tamco)"'),
 'affAdd':re.compile(r'\baffAdd\('),'relAdd':re.compile(r'\brelAdd\('),'hhSet':re.compile(r'\bhhSet\('),'oanAdd':re.compile(r'\boanAdd\('),
 'direct':re.compile(r'(?<![\w$])(?:S|p|v|x|y|o|q|r|w|m|c|t|n|e|a|b|V|P|who|tgt|her|riv|me|it)\.'+STAT+r'\s*(?:\+=|-=|=(?!=))'),
 'riseDirect':re.compile(r'([\w$.\[\]]+)\.'+STAT+r'\s*\+=\s*(?!-)|([\w$.]+)\.'+STAT+r'\s*=\s*(?:cl\(|Math\.min\(\s*100\s*,\s*)?\(*\s*\3\.\4(?:\|\|\d+)?\)?\s*\+\s*(?!-)'),
 'spAdd':re.compile(r'\bspAdd\('),'spRow':re.compile(r'\bspRow\('),
 # BIG review 3: a raw RISE of a regard / grudge MAP row (x.rl[id] / x.ro[id] += n, or = cl((x.rl[id]||0)+n …)) without the rule
 'riseMap':re.compile(r'([\w$.]+)\.(rl|ro)\[([^\]]+)\]\s*\+=\s*(?!-)|([\w$.]+)\.(rl|ro)\[([^\]]+)\]\s*=\s*(?:cl\(|Math\.min\(\s*100\s*,\s*)?\(*\s*\4\.\5\[\6\](?:\|\|\d+)?\)?\s*\+\s*(?!-)'),
 'directMap':re.compile(r'\b(?:S|p|x|v)\.(rl|ro)\[[^\]]+\]\s*(?:\+=|-=|=(?!=))'),
}
DEF=re.compile(r'function (apply|ap|affAdd|relAdd|hhSet|oanAdd|statSet|msAffAdd|msOanAdd)\(')
rows={};lst=[]
for f in sorted(glob.glob(os.path.join(ROOT,'j*.js'))):
  if f.endswith('_build.py'):continue
  b=os.path.basename(f)
  for i,l in enumerate(open(f,encoding='utf8',errors='ignore'),1):
    if DEF.search(l) and b in('j1.js','j8.js','j9.js','j24.js','jstatpace.js'):continue
    if b=='jstatpace.js' and 'function spRow' in l:continue
    for k,P in PAT.items():
      n=len(P.findall(l))
      if n:
        rows.setdefault(b,{}).setdefault(k,0);rows[b][k]+=n
        if k in('riseDirect','riseMap'):lst.append(f'{b}:{i}: '+l.strip()[:150])
tot={};[tot.__setitem__(k,tot.get(k,0)+v) for r in rows.values() for k,v in r.items()]
if '--json' in sys.argv:print(json.dumps({'total':tot,'files':rows}));sys.exit()
print('kind\tsites');[print(f'{k}\t{v}') for k,v in sorted(tot.items())]
print('files touched',len(rows))
if '--list' in sys.argv:print('\n'.join(lst))

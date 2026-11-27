#!/usr/bin/env python3
"""review/charge-followups (a) LAW 6c REAL OBJECTS — whole-family scan of every «tịch thu» (also «thu hồi», «sung công», «bị thu lại») site in
dev/build/j*.js. Each site is one of:
  text     — the words only (a label, a story line, a sound / effect matcher): no piece leaves anyone there
  routed   — a piece leaves AND goes through the one item ledger: ilSeize / ilGone / ilFilter / vpSeize / dropJ on the line, or the enclosing
             function is wrapped by jil ilGuard (its removals are routed after the call)
  unrouted — a piece leaves (splice / = null / inv filter) with no ledger road: it vanishes (law 6c) — family «seize_unrouted», must be 0
usage: python3 dev/test/seize-scan.py [git-ref]   (no ref = the working tree) → exit 1 if seize_unrouted > 0"""
import re,subprocess,sys,os
ref=sys.argv[1] if len(sys.argv)>1 else None
root=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..')
def files():
    if ref:
        out=subprocess.run(['git','-C',root,'ls-tree','--name-only',ref,'dev/build/'],capture_output=True,text=True).stdout.split()
        return [(f,subprocess.run(['git','-C',root,'show',f'{ref}:{f}'],capture_output=True,text=True).stdout) for f in out if re.match(r'dev/build/j[\w]*\.js$',f)]
    d=os.path.join(root,'dev/build');return [('dev/build/'+f,open(os.path.join(d,f),encoding='utf-8').read()) for f in sorted(os.listdir(d)) if re.match(r'j[\w]*\.js$',f)]
W=re.compile(r'tịch thu|thu hồi|sung công|bị thu lại',re.I)
RM=re.compile(r'\.inv\.splice\(|\.splice\([^)]*\)\[0\]|\b(?:w|wd|t|p|v|S)\.(?:vl|dress)=null|\bw\[sl\]=null|\.inv=\([^;]*\.filter\(')
RT=re.compile(r'\b(ilSeize|ilGone|ilFilter|vpSeize|dropJ|toStore|seize|ilAsk)\(')  # toStore = jdh2 own store road (sắc phong book / seal), seize = jdemo (jil ilGone inside), ilAsk = co-op box record
src_all='\n'.join(s for f,s in files() if f.endswith('jil.js'))
GU=set(re.findall(r'ilGuard\("(\w+)"',src_all))
FN=re.compile(r'(?:function\s+(\w+)\s*\(|(\w+)\s*=\s*function\s*\()')
rows=[];cnt={'text':0,'routed':0,'unrouted':0}
for f,s in files():
    if f.endswith('/all.js') or f.endswith('jil.js'):continue
    L=s.split('\n');off=[0]
    for l in L:off.append(off[-1]+len(l)+1)
    for i,line in enumerate(L,1):
        w=W.search(line)
        seize=bool(re.search(r'\b(ilSeize|vpSeize)\(',line))
        if not w and not seize:continue
        win='\n'.join(L[max(0,i-4):i])  # the site line + 3 lines before (a removal one line above the message)
        rm=bool(RM.search(win)) or seize
        if not rm:cnt['text']+=1;continue
        pos=off[i-1]+((w.start() if w else 0))
        fm=list(FN.finditer(s[:pos]));fn=(fm[-1].group(1) or fm[-1].group(2)) if fm else ''
        cls='routed' if RT.search(win) or fn in GU else 'unrouted'
        rows.append((cls,f'{f.split("/")[-1]}:{i}',fn));cnt[cls]+=1
print(f'seize scan {ref or "working tree"}: text {cnt["text"]} · routed {cnt["routed"]} · seize_unrouted {cnt["unrouted"]}')
for c,loc,fn in rows:print(f'  {c:9} {loc:16} {fn}')
sys.exit(1 if cnt['unrouted'] else 0)

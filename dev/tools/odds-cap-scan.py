# ODDS CAP scan (owner 17/11 17:00Z / 17:35Z): every place a chance could still be "sure" or escape the one cap.
# usage: python3 dev/tools/odds-cap-scan.py [git-ref]   (default: the working tree)  -> counts per pattern + file:line list
import re,subprocess,sys,glob,os
A_=[a for a in sys.argv[1:] if not a.startswith('-')];ref=A_[0] if A_ else None
def files():
  if ref:
    L=subprocess.run(['git','ls-tree','--name-only',ref,'dev/build/'],capture_output=True,text=True).stdout.split()
    for f in L:
      if f.endswith('.js') and not f.endswith('all.js'):yield f,subprocess.run(['git','show',f'{ref}:{f}'],capture_output=True,text=True).stdout
  else:
    for f in sorted(glob.glob('dev/build/*.js')):
      if not f.endswith('all.js'):yield f,open(f,encoding='utf-8').read()
P={'sure o:100 (no fix)':r'o:100(?!,fix:1)','sure o:100 marked fix (bookkeeping)':r'o:100,fix:1','ladder word "Chắc chắn"':r'Chắc chắn(?!\?| ghi)',
 'typed cap cl(…,5,95)':r',5,95\)','raw Math.random()*100< (bypasses roll)':r'Math\.random\(\)\*100<','sure skip >=100||roll':r'>=100\|\|roll\(',
 'roll at the cap (BAL.odds.hi)':r'roll\(BAL\.odds\.hi\)','capAt gate (button)':r'capAt\(','cap: option gate':r'\{cap:[^,]+,(?:k:"\w+",)?n:','oddsCl(':r'oddsCl\('}
C={k:[] for k in P}
for f,t in files():
  for i,l in enumerate(t.split('\n'),1):
    for k,r in P.items():
      for _ in re.finditer(r,l):C[k].append(f'{os.path.basename(f)}:{i}')
for k in P:print(f'{k}: {len(C[k])}')
if '-v' in sys.argv:
  for k in P:print('##',k,' '.join(C[k][:400]))

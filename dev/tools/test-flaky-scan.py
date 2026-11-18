# test-flaky-sure scan: dev/test/*.js patterns that make a test flaky (LUẬT SỬA CẢ NHÓM, review/test-flaky-sure).
#  A) retry loop `for(...){start();if(<cond>)break}` WITHOUT window.__nlInner: start() -> nlBegin -> nlGet(NL_KEY) replays the STORED life, so every
#     retry gets the same cung-nữ and the loop never changes anything. Fix: nlNew() before each start().
#  B) odds >= BAL.odds.hi (95) used as "sure": roll(o) caps at hi, so o=100/1000 fails ~1/20. Fix: force the roll itself (window.roll=()=>true, restored).
# usage: python3 dev/tools/test-flaky-scan.py [--fix-a]   -> table; exit 1 if any unfixed hit remains
import re,glob,os,sys
FIX='--fix-a' in sys.argv
RA=re.compile(r'(for\s*\(\s*let\s+(\w+)\s*=\s*0\s*;\s*\2\s*<\s*\d+\s*;\s*\2\+\+\s*\)\s*\{?\s*)(start\(\)\s*;)')
NL='try{nlNew()}catch(e){}'
RB=re.compile(r'(?:\.o\s*=\s*(?:100|1000)\b|\bo\s*:\s*(?:100|1000)\b|BAL\.[\w.]*\.o\s*=\s*(?:100|1000)\b)')
FP={"weather-port.js"}  # o:100 only feeds the pure predicate wxOutAct (no roll) -> not a sure-roll
def skip(t,m):return 'window.__nlInner=1' in t[max(0,m.start()-200):m.end()] or 'nlNew()' in t[m.start():m.end()+60]
rows=[];bad=0
for f in sorted(glob.glob('dev/test/*.js')):
  t=open(f,encoding='utf-8').read()
  a=sum(1 for m in RA.finditer(t) if not skip(t,m))
  if FIX and a:open(f,'w',encoding='utf-8').write(RA.sub(lambda m:m.group(0) if skip(t,m) else m.group(1)+NL+m.group(3),t))
  b=0 if (os.path.basename(f) in FP or 'window.roll=()=>true' in t) else len(RB.findall(t))
  if a or b:rows.append((os.path.basename(f),a,b))
  bad+=(0 if FIX else a)+b
print('file | A retry-replays-stored-life | B sure-by-odds>=hi')
for r in rows:print('%s | %d | %d'%r)
print('files',len(rows),'A',sum(r[1] for r in rows),'B',sum(r[2] for r in rows))
sys.exit(1 if bad else 0)

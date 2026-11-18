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
FP={"weather-port.js","ag-soft.test.js"}  # weather-port: o:100 only feeds the pure predicate wxOutAct (no roll); ag-soft.test.js: o:100 is the SOFT-FAIL case on purpose (Math.random pinned to .999)
# A2: other retry forms: `if(s)start()`, `if(s){Q.length=0;start()}`, `if(isSrv())start()`, `S=null;start()`
RA2=re.compile(r'((?:if\([\w()!]+\)\s*\{(?:[^{}]{0,40};)?\s*|if\([\w()!]+\)\s*|S\s*=\s*null\s*;\s*|for\s*\(\s*let\s+\w+\s*=\s*0\s*;[^;]*;\s*\w+\+\+\s*\)\s*(?:\{\s*try\s*\{\s*)?))(start\(\)\s*[;)}\]]?)')
def skip2(t,m):return 'window.__nlInner=1' in t[max(0,m.start()-200):m.end()] or 'nlNew()' in t[max(0,m.start()-40):m.end()]
def skip(t,m):return 'window.__nlInner=1' in t[max(0,m.start()-200):m.end()] or 'nlNew()' in t[m.start():m.end()+60]
rows=[];bad=0
for f in sorted(glob.glob('dev/test/*.js')):
  t=open(f,encoding='utf-8').read()
  a=sum(1 for m in RA.finditer(t) if not skip(t,m))+sum(1 for m in RA2.finditer(t) if not skip2(t,m))
  if FIX and a:
    n=RA.sub(lambda m:m.group(0) if skip(t,m) else m.group(1)+NL+m.group(3),t)
    n=RA2.sub(lambda m:m.group(0) if skip2(n,m) else m.group(1)+NL+m.group(2),n)
    open(f,'w',encoding='utf-8').write(n)
  b=0
  if os.path.basename(f) not in FP:
    for m in RB.finditer(t):
      near=t[max(0,m.start()-600):m.end()+700]
      if not re.search(r'window\.roll\s*=\s*\(\)\s*=>\s*true|roll\s*=\s*o\s*=>\s*o>=100\|\||roll\s*=\s*\(\)\s*=>\s*v|forceRoll\(',near):b+=1
  if a or b:rows.append((os.path.basename(f),a,b))
  bad+=(0 if FIX else a)+b
print('file | A retry-replays-stored-life | B sure-by-odds>=hi')
for r in rows:print('%s | %d | %d'%r)
print('files',len(rows),'A',sum(r[1] for r in rows),'B',sum(r[2] for r in rows))
sys.exit(1 if bad else 0)

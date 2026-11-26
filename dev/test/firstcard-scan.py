#!/usr/bin/env python3
"""FIRSTCARD family scan (law 11; MAIN 153): every option whose own go/run can END the life or take her out of the palace (ban hoa, xuất giá,
xuất gia, tự vẫn, chết, the home-road endings, the cards that lead to an all-exit card) — how does its card tell the risk?
  declared  = kitRiskOpt / kc2SelRisk / kc2ExRisk: the TRUE chance (the same BAL rule as its roll) leads the line + the loss in the kit Mất row
  own odds  = the option carries its own odds (o: / x: `${word(o)} …`), the meter reads it
  words     = a certain ending whose words the kit reads as «this life ends» (jk2b KIT_END_RE, the option text or the jkc KCH hint table):
              kitOptOdds prints word(BAL.odds.lo), never the sure «Rất vững»; the «nhưng …» part is the red Mất row
  none      = NOT TOLD: the sure meter «Rất vững» on a pick that can end the life (law 7 FAIL)
usage: python3 dev/test/firstcard-scan.py [--fail]   (--fail exits 1 on any «none» row)"""
import re,sys,glob,os
D=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
END=re.compile(r'(?<![A-Za-z0-9_.])(over|die|kcDie|kcEnd|kcEndDo|kcMarry|kc2End|selxBanHoa|kc2SelPlay|selxMini|kcIll|kcElope|kcSoGo|kcDien)\(|e:"(dinhhon2|trave)"')
ENDW=re.compile(r'kiếp này dừng|kết thúc kiếp này|bị ban hoa|mất mạng')  # = jk2b KIT_END_RE
J=open(os.path.join(D,'jkc.js'),encoding='utf-8').read();K=J[J.index('const KCH={'):];K=K[:K.index('};')]
KCH_END=[m.group(1) for m in re.finditer(r'\["([^"]+)","([^"]*)"',K) if ENDW.search(m.group(2))]
R97='cơ duyên hiếm: một kết cục khác hẳn; nhưng kiếp này dừng' in J  # jkc KCH pass: the hint of every ✦ (r97) option
def body(s,i):
  d=0;j=i;q=None
  while j<len(s):
    c=s[j]
    if q:
      if c=='\\':j+=2;continue
      if c==q:q=None
    elif c in '"\'`':q=c
    elif c in '([{':d+=1
    elif c in ')]}':
      d-=1
      if d==0:return s[i:j+1]
    j+=1
  return s[i:i+400]
def how(s,a,b,name):
  pre=s[max(0,a-40):a]
  if re.search(r'(kitRiskOpt|kc2SelRisk|kc2ExRisk)\((?:kc2H\()?$',pre):return 'declared'
  if '...[' in s[max(0,a-700):a] and re.search(r'\]\]?\.map\([^)]*\)=>kitRiskOpt',s[b:b+900]):return 'declared'  # an option list mapped through kitRiskOpt
  if re.search(r'\bx:`\$\{word\(|\bo:(?:od\(|\d)',s[a:b]):return 'own odds'
  tail=s[b:b+260].split('kcO(')[0]
  if ENDW.search(s[a:b]) or ENDW.search(tail):return 'words'
  if re.search(r'\[\[?$',s[max(0,a-6):a]) and re.search(r'\]\]?\.map\([^)]*\)=>kitRiskOpt',s[b:b+900]):return 'declared'
  nm=name.strip('"`')
  if nm.startswith('✦') and R97:return 'words'
  if any(nm.startswith(k) for k in KCH_END):return 'words'
  return 'none'
rows=[]
for f in sorted(glob.glob(os.path.join(D,'j*.js'))):
  if f.endswith('all.js'):continue
  s=open(f,encoding='utf-8').read();fn=os.path.basename(f)
  for m in re.finditer(r'kcO\(("(?:[^"\\]|\\.)*"|`[^`]*`|[A-Za-z0-9_.()?:"\' ]{1,80}?),',s):
    b=body(s,m.start()+3);e=END.search(b)
    if not e:continue
    rows.append((fn,s.count('\n',0,m.start())+1,m.group(1)[:44],e.group(1) or e.group(2),how(s,m.start(),m.start()+3+len(b),m.group(1))))
  for m in re.finditer(r'\{n:("(?:[^"\\]|\\.)*"|`[^`]*`)',s):
    b=body(s,m.start())
    if not re.search(r'\b(go|run)\s*:',b):continue
    e=END.search(b)
    if not e:continue
    rows.append((fn,s.count('\n',0,m.start())+1,m.group(1)[:44],e.group(1) or e.group(2),how(s,m.start(),m.start()+len(b),m.group(1))))
un=[r for r in rows if r[4]=='none']
print(f"{'file:line':<22} {'option':<46} {'ends via':<12} risk told by")
for r in rows:print(f"{r[0]+':'+str(r[1]):<22} {r[2]:<46} {r[3]:<12} {r[4]}")
c=lambda k:sum(r[4]==k for r in rows)
print(f"TOTAL {len(rows)} life-ending options · declared {c('declared')} · own odds {c('own odds')} · ending words {c('words')} · NOT TOLD {len(un)}")
if '--fail' in sys.argv and un:sys.exit(1)

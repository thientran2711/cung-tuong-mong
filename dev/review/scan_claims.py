# LUẬT SỬA CẢ NHÓM: event texts that claim something she did before (a gift she gave, a loan, a promise, a planted servant...)
# must have a real precondition. Lists every j68 EV6 variant / PEND text with such a claim and whether the template filters variants (vf).
import re,glob,sys,os
D=os.path.dirname(os.path.abspath(__file__))+'/../build/'
CLAIM=re.compile(r"(quà ngươi tặng|ngươi tặng|ngươi đã tặng|đồ ngươi cho|ngươi cho mượn|ngươi hứa|ngươi từng giúp|ơn ngươi|ngươi nhờ|người ngươi cài|ngươi gửi|thư ngươi|trả lại (quà|đồ)|đã nhận của ngươi)",re.I)
rows=[]
for f in sorted(glob.glob(D+'j*.js')):
  if '/all' in f:continue
  t=open(f,encoding='utf-8').read()
  for m in re.finditer(r'EV6\("(\w+)"',t):
    s=t[m.start():t.find('\nEV6(',m.end()) if t.find('\nEV6(',m.end())>0 else len(t)]
    vm=re.search(r'v:\[(.*?)\],\s*\n?\s*o:',s,re.S)
    if not vm:continue
    V=re.findall(r'"((?:[^"\\]|\\.)*)"',vm.group(1))
    vf='vf:' in s[:vm.start()] or 'vf(' in s
    for i,v in enumerate(V):
      if CLAIM.search(v):rows.append((os.path.basename(f),m.group(1),i,'có' if vf else 'KHÔNG',v[:90]))
for r in rows:print(' | '.join(map(str,r)))
print('total',len(rows),'without vf',sum(1 for r in rows if r[3]=='KHÔNG'),file=sys.stderr)

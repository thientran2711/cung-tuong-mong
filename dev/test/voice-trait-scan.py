#!/usr/bin/env python3
"""voice-by-tính-tình scan (LUẬT SỬA CẢ NHÓM, review/voice-trait): every kLine( / kOutcome( call site of the game and the static line pools behind it,
marked TONE (pool keyed by the 8 Tính tình, read through jvoice kTone) or MOOD (old pool: mood warm/cool/cold or one flat list).
usage: python3 dev/test/voice-trait-scan.py [--git REV]   (REV: scan that commit for the BEFORE table)"""
import re,sys,subprocess,os,collections
D=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
rev=sys.argv[sys.argv.index('--git')+1] if '--git' in sys.argv else None
def rd(f):
    if rev:
        r=subprocess.run(['git','show',f'{rev}:dev/build/{f}'],capture_output=True,text=True,cwd=D);return r.stdout
    try:return open(os.path.join(D,f),encoding='utf8').read()
    except Exception:return ''
files=sorted(set(re.findall(r'["\'](j[\w]*\.js)["\']',rd('assemble.py'))))
rows=[];tone=0;mood=0
for f in files:
    s=rd(f)
    for m in re.finditer(r'(?<![A-Za-z])(kLine|kOutcome)\(([^)]{0,140})',s):
        if 'function' in s[max(0,m.start()-9):m.start()] or s[s.rfind('\n',0,m.start())+1:m.start()].lstrip().startswith(('/*','//','   ')) and f in('jvoice.js','jtone.js'):continue
        a=m.group(2);ln=s.count('\n',0,m.start())+1
        t=('TONE_POOL' in a) or (f=='jvoice.js' and 'tp,' in a) or (m.group(1)=='kOutcome' and f!='jvoice.js' and ',p)' in s[m.start():m.start()+90]) or ('about:' in a)
        rows.append((f,ln,m.group(1),'TONE' if t else 'MOOD',a.split(',')[0][:40]))
        tone+=t;mood+=not t
print('call sites: %d  TONE %d  MOOD %d'%(len(rows),tone,mood))
for r in rows:print('  %-12s:%-5d %-9s %-5s %s'%r)
t=rd('jtone.js');n=len(re.findall(r'"(?:Ân cần|Lạnh lùng|Nóng nảy|Điềm tĩnh|Nhiều chuyện|Kín đáo|Kiêu ngạo|Khiêm nhường)":\["',t))
print('tone pools written: %d (tone × situation) in jtone.js'%n)

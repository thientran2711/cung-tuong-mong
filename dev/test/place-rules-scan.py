#!/usr/bin/env python3
"""review/place-rules scan (LUẬT SỬA CẢ NHÓM): every forced-move path, every arrival card, every time-limited place in dev/build/j*.js,
and which ONE mechanism now covers it. usage: python3 dev/test/place-rules-scan.py  → markdown table on stdout."""
import re,glob,os
D=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
SKIP=re.compile(r'(sd|_b\d?|_c|_m|_w\d|_bd|_pt)\.js$|^jtone|^jgedata|^jrd_|^jnrask')
rows=[]
def scan(kind,pat,cover):
  for f in sorted(glob.glob(D+'/j*.js')):
    b=os.path.basename(f)
    if SKIP.search(b):continue
    for i,l in enumerate(open(f,encoding='utf-8'),1):
      for m in re.finditer(pat,l):rows.append((kind,f'{b}:{i}',l[max(0,m.start()-40):m.end()+40].replace('|','/').replace('\n',' ').strip(),cover))
# 1 forced moves: every way S gets cấm túc / lãnh cung / is sent away
scan('cấm túc (S)',r'punish\((?:S\b|`|")',"plSweep (render/renderStage): cấm túc ⇒ her room at once")
scan('cấm túc (S)',r'S\.confined\s*=\s*(?!0)',"plSweep")
scan('lãnh cung',r'\bcold\(',"jsl kitLifePlace + j14 coldVisit (existing)")
scan('stay caught',r'function stayRoll',"plHome + render (was goTo('home'), refused while a card was open)")
scan('door refusal',r'Ngươi phải lui ra|Thái giám chặn cửa',"jplrule goTo wrap → plHome")
scan('summons',r't:"Thái hậu triệu"|/triệu/i\.test',"jplrule chooseM → walk there (actPendRun)")
# 2 arrival cards from a person
scan('arrival card',r'"Có người đến"|"Có người tìm đến"|giá đáo',"plWith: skipped (gmCard / AP_MK) or reworded (agScene) when she is already beside her")
# 3 time-limited places (accessOf)
scan('time-limited place',r'if\(k==="(?:kn|tn)"\)\{|ACC_DAY\[k\]\)\{|if\(k==="dtd"\|\|k==="thu"\)',"jstagehere stClose: entry notice «chỉ được lưu đến hết …» + last-khắc notice; stayRoll needs it shown")
print('| kind | where | code | covered by |\n|---|---|---|---|')
for r in rows:print('| '+' | '.join(r)+' |')
print(f'\n{len(rows)} rows')

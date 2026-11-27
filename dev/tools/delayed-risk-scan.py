#!/usr/bin/env python3
"""delayed-risk-scan (review/m-fix-3, law 11): every PLAYER card whose go() sets a state flag that a LATER roll turns into a
punishment / death (deathSentence, die, cold, punish, demote, fall). Such a card must show the WHOLE-ROAD odds (its own word covers the
later exposure, law 7 + laws 2/3) and the later exposure must have a counter-play. Static scan of dev/build/*.js.
usage: python3 dev/tools/delayed-risk-scan.py [--md]   -> table: card | file:line | flag | later punisher file:line | shows road odds?"""
import re,glob,os,sys
B=os.path.join(os.path.dirname(__file__),'..','build')
SKIP=re.compile(r'^(jbal|j7sd|jtone|jrd_|jnrask|all\.js)')
files=sorted(f for f in glob.glob(os.path.join(B,'*.js')) if not SKIP.match(os.path.basename(f)))
L={f:open(f,encoding='utf-8').read().split('\n') for f in files}
card=re.compile(r'\{n:"([^"]{2,60})"((?:(?!\{n:")(?!\n\s*\{n:).){0,1200}?)go:\(\)=>(\{.{0,600}?\}|[^,}]{0,200})',re.S)
setf=re.compile(r'\bS\.(\w+)(?:=(?!=)|\+\+|\+=)')
pun=re.compile(r'deathSentence\(|\bdie\(|\bcold\(|\bpunish\(|\bdemote\(|\bfall\(')
IGN={'preg','hidden','tonight','place','visit','done','buoi','pregWk','an','confined','fakeIll_','inv','dress'}
rows=[]
# triage of every hit (review/m-fix-3). DELAYED = a real later danger -> must show the road word; the rest are not a delayed road.
KNOWN={('Giả mang thai','fake'):'DELAYED: road word (j8 fpRoad) + counter-plays j22',
 ('Giả bệnh','fakeIll'):'DELAYED: road word oi = 100 - fakeIllRisk',
 ('Giấu đi, im lặng','wdNtHide'):'DELAYED: road word p = 100 - wdHideCatch + Kèm',
 ('Mời làm thái y tâm phúc','doctor'):'not a risk: the doctor LOWERS later risks',
 ('Để ông tự lo','doctor'):'not a risk: the doctor LOWERS later risks',
 ('Hối lộ Kính sự phòng sửa sổ','pregMismatch'):'counter-play (clears the mismatch)',
 ('Uống thuốc phá thai','pregMismatch'):'counter-play (own risk shown: băng huyết chanceW)',
 ('Uống thuốc phá thai','trueFather'):'counter-play (clears the father)',
 ('Khai lùi ngày nguyệt sự','pregMismatch'):'counter-play (clears the mismatch)',
 ('Tìm chứng cứ minh oan','coldEv'):'not her risk: the FRAMER falls when the case turns',
 ('Báo sảy thai','fake'):'counter-play (ENDS the fake; own fail = cấm túc, shown)',
 ('Tâu nên tuyển nhiều','moreRivals'):'no punisher (next-month new rival)',
 ('Lui về sau chủ','nt'):'no punisher (line is a read of S.nt)',
 ('Diệt khẩu tên thái giám','schemes'):'immediate roll; schemes = world-wide betrayal risk of ALL schemes (not one road)',
 ('Vâng mệnh','schemes'):'immediate roll; schemes = world-wide betrayal risk of ALL schemes (not one road)',
 ('Diệt kẻ tống tiền','schemes'):'immediate roll; schemes = world-wide betrayal risk of ALL schemes (not one road)'}
for f,lines in L.items():
  T='\n'.join(lines)
  if True:
    for m in card.finditer(T):
      i=T.count('\n',0,m.start())
      n,mid,body=m.groups();flags={x for x in setf.findall(body) if x not in IGN}
      for fl in sorted(flags):
        hits=[]
        for g,ls in L.items():
          for j,k in enumerate(ls):
            if re.search(r'\b(?:p|S|v|q)\.'+fl+r'\b(?!\s*=[^=])',k) and not (g==f and j==i) and any(pun.search(x) for x in ls[j:j+3]) and not re.search(r'\bfunction cold\(',k):hits.append(f"{os.path.basename(g)}:{j+1}")
        if hits:
          road='road word' if re.search(r'\boi:',mid) or re.search(r'\bp:100-',mid) else 'first step only'
          rows.append((n,f"{os.path.basename(f)}:{i+1}",fl,",".join(hits[:3]),road,KNOWN.get((n,fl),'NEW - triage')))
md='--md' in sys.argv
if md:print('| card | where | flag | later punisher | odds shown | triage |\n|---|---|---|---|---|---|')
for r in rows:print(('| '+' | '.join(r)+' |') if md else '\t'.join(r))
bad=[r for r in rows if r[5].startswith('DELAYED') and r[4]!='road word' or r[5].startswith('NEW')]
print(f"delayed-risk-scan: {len(rows)} hit(s), {sum(1 for r in rows if r[5].startswith('DELAYED'))} delayed road(s), {len(bad)} without the road word / untriaged")
sys.exit(1 if bad else 0)

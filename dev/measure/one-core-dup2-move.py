#!/usr/bin/env python3
"""one-core-dup2-move (review/one-core-dup2, ONE CORE duplicate-rule hunt part 2): replace typed copies of a concept's cut points
with the ONE BAL key (jbal.js 'ONE CORE dup2' section). Each rule = (file, line, regex, value->key map | fixed text, expected count).
Run once on the base; proof: dev/measure/one-core-dup2-same.js. usage: python3 dev/measure/one-core-dup2-move.py"""
import re,sys,os
D=os.path.join(os.path.dirname(__file__),'..','build')
LOY={'70':'trust','60':'close','50':'mid','45':'warn','40':'low','35':'bad','30':'out','55':'firm','75':'deep','80':'top'}
R=[]
def rule(f,l,rx,m,n=None):R.append((f,l,rx,m,n))
# --- Lòng (servant loyalty) cut points: every `<x>.loyal[||d][)] op N`
LOYRX=r'(loyal(?:\|\|\d+)?\)?\s*(?:>=|<=|<|>)\s*)(\d+)\b'
for fl in """j14:3 j15:63 j19:86 j21:76 j22:16 j24:27 j24:29 j24:49 j24:69 j32:4 j34:27 j40:54 j43:54 j43:55 j68h:33 j68h:34
j68h:35 j68h:44 j68h:61 j70:166 j70:169 j70:185 j70:323 j70:331 j70:410 j70:415 j71:21 j72:394 j72:396 j72:482 j72:485 j72:503
j72:571 j8:281 j8:331 j8:382 j8:42 j8:56 j82:60 j83:225 j83:250 j92:208 j92:210 j92:364 j95b:80 j96:181 jaudit:66 jdh:98 jecon:136
jecon:146 jeitem:57 jface:250 jlost:114 jmen:199 jmen:86 jpoison:46 jroute:254 jroute:80 jtin:8 jtruth:86 jtsb:178 jtsb:20 jtsb:47
jveil:116 jveil:117""".split():
 f,l=fl.split(':');rule(f+'.js',int(l),LOYRX,('loy',LOY))
rule('jsgame.js',127,r'(l>=)(70|50|30)\b',('loy',LOY),3)
rule('jk3.js',57,r'(n>=)(60)(\?"g":n<)(45)\b','KIT3')
# --- Tâm cơ (NPC wit) cut points
WIT={'30':'lo','35':'mid','60':'hi','70':'top'}
WRX=r'(\btc\s*(?:>=|<)\s*)(30|35|60|70)\b'
for fl in "j40:19 j40:20 j40:49 j40:52 j40:54 j43:43 j43:55 j51:35 j51:36 j70:127 j70:129 j70:165 j70:169".split():
 f,l=fl.split(':');rule(f+'.js',int(l),WRX,('wit',WIT))
rule('j40.js',19,r'\(tc-30\)/35','(tc-BAL.wit.lo)/BAL.wit.mid',1)
rule('j51.js',35,r'\(tc-30\)/35','(tc-BAL.wit.lo)/BAL.wit.mid',1)
# --- Đức tiers
rule('j3.js',109,r'S\.duc>=60\)','S.duc>=BAL.ducLv.up)',1);rule('j3.js',109,r'S\.duc<20\)','S.duc<BAL.ducLv.down)',1)
rule('j8.js',443,r'v\.duc>=60\)','v.duc>=BAL.ducLv.up)',1);rule('j8.js',443,r'v\.duc<20\)','v.duc<BAL.ducLv.down)',1)
rule('j85.js',145,r'tf=d>=60\?1:d<20\?','tf=d>=BAL.ducLv.up?1:d<BAL.ducLv.down?',1)
rule('j85.js',147,r'lf=d>=70\?1:d<25\?','lf=d>=BAL.ducLv.staffUp?1:d<BAL.ducLv.staffDown?',1)
rule('j85.js',79,r'd>=80\?"hiền đức":d>=60\?"tử tế":d>=40\?"thường":d>=20\?','d>=BAL.ducLv.word[3]?"hiền đức":d>=BAL.ducLv.word[2]?"tử tế":d>=BAL.ducLv.word[1]?"thường":d>=BAL.ducLv.word[0]?',1)
rule('j85.js',82,r'v\.duc<40\?"r":v\.duc>=60\?','v.duc<BAL.ducLv.word[1]?"r":v.duc>=BAL.ducLv.up?',1)
rule('jlogsync.js',136,r'S\.duc>=60\?','S.duc>=BAL.ducLv.up?',1)
# --- Sủng word ladders (no owner ruling: each screen keeps its live cuts, all in BAL.sungLv; disagreement listed)
rule('j24.js',85,r'S\.sung>=70\?(.{0,40}?)S\.sung>=45\?(.{0,40}?)S\.sung>=25\?',r'S.sung>=BAL.sungLv.emp[2]?\1S.sung>=BAL.sungLv.emp[1]?\2S.sung>=BAL.sungLv.emp[0]?',1)
rule('j68f.js',100,r'v\.sung>=55\?"cao":v\.sung>=30\?','v.sung>=BAL.sungLv.th[1]?"cao":v.sung>=BAL.sungLv.th[0]?',1)
rule('j68g.js',74,r'S\.sung>=60\?"rất cao":S\.sung>=35\?"khá":S\.sung>=15\?','S.sung>=BAL.sungLv.kinh[2]?"rất cao":S.sung>=BAL.sungLv.kinh[1]?"khá":S.sung>=BAL.sungLv.kinh[0]?',1)
rule('j68h.js',62,r'S\.sung<30\?\[0,3\]:S\.sung>=55\?','S.sung<BAL.sungLv.th[0]?[0,3]:S.sung>=BAL.sungLv.th[1]?',1)
rule('jk2b.js',148,r'S\.sung>=60\?"Sủng ái":S\.sung>=30\?"Để mắt":S\.sung>=10\?"Biết mặt":"Chưa để ý",S\.sung>=30\?','S.sung>=BAL.sungLv.card[2]?"Sủng ái":S.sung>=BAL.sungLv.card[1]?"Để mắt":S.sung>=BAL.sungLv.card[0]?"Biết mặt":"Chưa để ý",S.sung>=BAL.sungLv.card[1]?',1)
for l in (277,596):rule('jkc.js',l,r'v\.sung>=60\?"rất cao":v\.sung>=30\?','v.sung>=BAL.sungLv.kc[1]?"rất cao":v.sung>=BAL.sungLv.kc[0]?',1)
# --- night tone (BAL.nightEnd warm / normal already the key)
rule('jne.js',225,r's>=6\?"warm":s>=3\?','s>=BAL.nightEnd.warm?"warm":s>=BAL.nightEnd.normal?',1)
rule('j8.js',311,r'\bs>=6\?','s>=BAL.nightEnd.warm?',1);rule('j8.js',311,r'\bs>=3\?','s>=BAL.nightEnd.normal?',1)
rule('j75.js',140,r'sc>=6\?"đêm vui":sc>=3\?','sc>=BAL.nightEnd.warm?"đêm vui":sc>=BAL.nightEnd.normal?',1)
def apply():
 files={};tot=0;bad=[]
 for f,l,rx,m,n in R:
  if f not in files:files[f]=open(os.path.join(D,f),encoding='utf-8').read().split('\n')
  L=files[f];s=L[l-1]
  if m=='KIT3':new,c=re.subn(rx,r'\1BAL.loy.close\3BAL.loy.warn',s)
  elif isinstance(m,tuple):
   ns,mp=m;new,c=re.subn(rx,lambda q:q.group(1)+'BAL.%s.%s'%(ns,mp[q.group(2)]),s)
  else:new,c=re.subn(rx,m,s)
  if c==0 or (n is not None and c!=n):bad.append('%s:%d %s matched %d'%(f,l,rx[:40],c))
  L[l-1]=new;tot+=c
 for f,L in files.items():open(os.path.join(D,f),'w',encoding='utf-8').write('\n'.join(L))
 print('replaced',tot,'in',len(files),'files');
 if bad:print('CHECK\n '+'\n '.join(bad));sys.exit(1)
apply()

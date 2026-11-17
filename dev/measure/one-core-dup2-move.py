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
PART2=[]
def rule2(f,l,rx,m,n=None):PART2.append((f,l,rx,m,n))
# --- part 2 (second commit) ---
TIN={'10':'known','30':'warm','40':'prince','50':'close','60':'ally','70':'love'}
TRX=r'(\btinh\s*(?:>=|<|>)\s*)(10|30|40|50|60)\b'
for fl in "j22:23 j22:24 j22:25 j22:48 j42:378 j42:398 j42:399 j42:402 j42:408 j42:418 j42:435 j42:448 j24:43 j24:45 jmen:240".split():
 f,l=fl.split(':');rule2(f+'.js',int(l),TRX,('tinhLv',TIN))
rule2('j22.js',13,r'(\bt>=)(70|50|30|10)\b',('tinhLv',TIN),4)
rule2('j42.js',323,r'S\.tin<30\?"hot":S\.tin>=60\?','S.tin<BAL.tinLv.lo?"hot":S.tin>=BAL.tinLv.hi?',1)
rule2('j42.js',335,r'S\.tin<30\?"r":S\.tin>=60\?','S.tin<BAL.tinLv.lo?"r":S.tin>=BAL.tinLv.hi?',1)
rule2('jpet.js',221,r'c>=70\?\["Khỏe","g"\]:c>=30\?','c>=BAL.pet.life.careOk?["Khỏe","g"]:c>=BAL.pet.life.careLow?',1)
rule2('j69.js',21,r'w<=6\?"Rất hiếm":w<=9\?','w<=BAL.rareLv[0]?"Rất hiếm":w<=BAL.rareLv[1]?',1)
rule2('jk2b.js',638,r'w<=6\?"Rất hiếm":w<=9\?','w<=BAL.rareLv[0]?"Rất hiếm":w<=BAL.rareLv[1]?',1)
rule2('jthaiy.js',50,r's>=70\?(.{0,30}?)s>=50\?(.{0,30}?)s>=30\?',r's>=BAL.sucLv.word[2]?\1s>=BAL.sucLv.word[1]?\2s>=BAL.sucLv.word[0]?',1)
rule2('jaudit.js',108,r'v\.suc>=60\?"tốt":v\.suc>=30\?','v.suc>=BAL.sucLv.ask[1]?"tốt":v.suc>=BAL.sucLv.ask[0]?',1)
rule2('j25.js',76,r's\.age>=45&&','s.age>=BAL.srvAge.old&&',1)
rule2('j25.js',77,r's\.age>=45\b','s.age>=BAL.srvAge.old',1)
rule2('jage.js',4,r'const AGE_MIN=18;','const AGE_MIN=BAL.age.adult;',1)
rule2('j28.js',68,r'Math\.round\(2\*persF','Math.round(BAL.oanFade*persF',1)
rule2('j28.js',68,r'S\.ro\[k\]-2\)','S.ro[k]-BAL.oanFade)',1)
rule2('jts.js',119,r'D\.n>=30\?"r"','D.n>=BAL.tsDanger.hot?"r"',1)
rule2('jts.js',145,r'D\.n<35\)continue','D.n<BAL.tsDanger.act)continue',1)
rule2('jts.js',150,r'D\.n>=30\?"hot":D\.n<10\?','D.n>=BAL.tsDanger.hot?"hot":D.n<BAL.tsDanger.calm?',1)
rule2('j55.js',43,r'function ccWord\(a\)\{const r=ccRisk\(a\);return r>=30\?"cao":r>=15\?"vừa":"thấp"\}','function ccWord(a){return chanceLo(ccRisk(a))}/* ONE CORE: side chance → the Rất thấp … Rất cao scale (owner OD:L221, j1 chanceLvl); was its own 30/15 cao/vừa/thấp */',1)
rule2('j21.js',20,r'^function oanW\(v\)\{return v<=10\?"Không oán":v<30\?"Hơi oán":v<60\?"Oán":"Thù sâu"\}$','/* (ONE CORE: dead second oán ladder 10/30/60 removed; the live one is jhc window.oanW on BAL.oanLv) */',1)
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
R[:]=PART2 if '--part2' in sys.argv else R
if '--part3' not in sys.argv:apply()
# --- part 3: single-copy ladders → BAL.cut.<name> (exact text, count) — run: python3 dev/measure/one-core-dup2-move.py --part3
P3=[('j5.js','end(hits>=13?3:hits>=8?2:1)','end(hits>=BAL.cut.rhythm[1]?3:hits>=BAL.cut.rhythm[0]?2:1)',1),
('j10.js','${st>=20?"thân":st<=-20?"thù"','${st>=BAL.cut.facRel?"thân":st<=-BAL.cut.facRel?"thù"',1),
('j10.js','st<=-20?"hot":st>=20?"ok"','st<=-BAL.cut.facRel?"hot":st>=BAL.cut.facRel?"ok"',1),
('j31.js','d<=10?0:d<=20?1:2','d<=BAL.cut.tuanDays[0]?0:d<=BAL.cut.tuanDays[1]?1:2',None),
('j55.js','function tdRelW(v){return v>=25?"Đồng minh"','function tdRelW(v){return v>=BAL.cut.clanRel?"Đồng minh"',1),
('j55.js','v<=-25?"Đối đầu"','v<=-BAL.cut.clanRel?"Đối đầu"',1),
('j71.js','function form7(s){return s>=65?"phong độ rất tốt":s>=50?"phong độ tốt":s>=35?','function form7(s){return s>=BAL.cut.form[2]?"phong độ rất tốt":s>=BAL.cut.form[1]?"phong độ tốt":s>=BAL.cut.form[0]?',1),
('j85.js','b.tier=lv>=5?2:lv>=3?1:0;b.prog=lv>=2?1:0','b.tier=lv>=BAL.cut.virCong[2]?2:lv>=BAL.cut.virCong[1]?1:0;b.prog=lv>=BAL.cut.virCong[0]?1:0',1),
('j85.js','let tier=q<25?1:q<45?2:q<65?3:q<85?4:5;','let tier=q<BAL.cut.wkQ[0]?1:q<BAL.cut.wkQ[1]?2:q<BAL.cut.wkQ[2]?3:q<BAL.cut.wkQ[3]?4:5;',1),
('jmort.js','const w=p.tho<40?"yểu mệnh":p.tho<60?"trung thọ":p.tho<75?','const w=p.tho<BAL.cut.tho[0]?"yểu mệnh":p.tho<BAL.cut.tho[1]?"trung thọ":p.tho<BAL.cut.tho[2]?',1),
('j99succ.js','end:()=>E.an>=5?"c_bad":E.q>=6?"c_ok":"c_abd"','end:()=>E.an>=BAL.cut.succEnd.an?"c_bad":E.q>=BAL.cut.succEnd.q?"c_ok":"c_abd"',1),
('jveil.js','const i=q>=14?3:q>=10?2:q>=6?1:0;','const i=q>=BAL.cut.veil[2]?3:q>=BAL.cut.veil[1]?2:q>=BAL.cut.veil[0]?1:0;',1),
('jlost.js','pr>=200?3:pr>=100?2:pr>=40?1:0','pr>=BAL.cut.lost[2]?3:pr>=BAL.cut.lost[1]?2:pr>=BAL.cut.lost[0]?1:0',1),
#('jroute.js','function rtHeatW(h){return h<15?"Yên ắng":h<35?"Có kẻ xì xào":h<60?"Nhiều người bàn tán":h<80?','function rtHeatW(h){return h<BAL.cut.heat[0]?"Yên ắng":h<BAL.cut.heat[1]?"Có kẻ xì xào":h<BAL.cut.heat[2]?"Nhiều người bàn tán":h<BAL.cut.heat[3]?',1),
('jht.js','function kinHealth(k){return k.hp<35?"đang ốm nặng, thái y ra vào":k.hp<60?','function kinHealth(k){return k.hp<BAL.cut.kidHp[0]?"đang ốm nặng, thái y ra vào":k.hp<BAL.cut.kidHp[1]?',1),
('jht.js','kinHealth(k),k.hp<35?"r"','kinHealth(k),k.hp<BAL.cut.kidHp[0]?"r"',1),
('jexam.js','function exTier(to){return to<=3?0:to<=5?1:2}','function exTier(to){return to<=BAL.cut.exTier[0]?0:to<=BAL.cut.exTier[1]?1:2}',1),
('jlux.js','const add=(x.lv>=3?2:x.lv>=2?1:0)','const add=(x.lv>=BAL.cut.luxRep[1]?2:x.lv>=BAL.cut.luxRep[0]?1:0)',1),
('jreign.js','r.tr>=60?"rất tin":r.tr>=35?"tin":r.tr>=15?','r.tr>=BAL.cut.rgTrust[2]?"rất tin":r.tr>=BAL.cut.rgTrust[1]?"tin":r.tr>=BAL.cut.rgTrust[0]?',1),
('jts.js','{sung:raw>=8?4:raw>=5?3:raw>=3?2:1,an:raw>=8?3:raw>=5?2:1}','{sung:raw>=BAL.cut.summon[2]?4:raw>=BAL.cut.summon[1]?3:raw>=BAL.cut.summon[0]?2:1,an:raw>=BAL.cut.summon[2]?3:raw>=BAL.cut.summon[1]?2:1}',1),
('jsgame.js','function sgStep(raw){return raw>=7?1:raw<=3?-1:0}','function sgStep(raw){return raw>=BAL.cut.sgStep.up?1:raw<=BAL.cut.sgStep.down?-1:0}',1)]
if '--part3' in sys.argv:
 bad=[]
 for f,o,n,c in P3:
  p=os.path.join(D,f);s=open(p,encoding='utf-8').read();k=s.count(o)
  if k==0 or (c is not None and k!=c):bad.append('%s %d× %s'%(f,k,o[:40]));continue
  open(p,'w',encoding='utf-8').write(s.replace(o,n))
 print('part3',len(P3)-len(bad),'rules');
 if bad:print('CHECK\n '+'\n '.join(bad));sys.exit(1)

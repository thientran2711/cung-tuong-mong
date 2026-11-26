#!/usr/bin/env python3
"""relshow-scan (review/net-ghen, law 11 family «shown == applied»): every player-visible text that prints a RELATION DELTA
(oán / thiện cảm / quý … / ghen / tin) in dev/build/j*.js, classified:
  WIRED   the number is drawn by the shared preview (pvOan / pvQuy / pvOanAny / aaNum / aaSay: jaudit §5 — the SAME nết factor
          the oanAdd / affAdd wrappers apply in j28, as an honest range while her knowledge of the holder's nết is partial)
  HER     the holder is the player (ta / ngươi oán …, quý nàng, Ta → nàng): no hidden factor, shown == applied
  NEG     a fall (−n): the wrappers scale only a rise → shown == applied
  NOFAC   ghen / tin: no nết factor on apply (ghenN / tinAdd) → shown == applied
  FALL    pvOan's own fallback text inside a try/typeof guard
  LOY     thiện cảm whose apply on the SAME line is servant loyalty set directly (loyAdd / .loyal) and no affAdd / relAdd:
          the trust wrapper never runs → shown == applied (review/net-ghen-2, wave 2)
  DIRECT  (wave 2) the number (BAL path / dotted name: anywhere in the build; a bare literal: on the same line) is applied ONLY through a
          direct, factor-free sink (.loyal = / loyAdd, srvAf, stfLike, apply({maid}), a bare .rel / .af field, the family kcAf / kc3Af / kc3TeachAf
          (jkc m.af +=), eaAfOne (jemoact o.af[k] +=)) and NEVER as an argument of
          affAdd / relAdd / msAffAdd → no trust factor → shown == applied
  THR     a threshold, not a change («thiện cảm dưới N», «Dưới N», «từ N»): nothing is applied
  TH      (wave 2) Thái hậu's liking: it is her own .th stat on the player / a consort (apply / ap {th}, j8:20 ap adds it raw;
          no Thái hậu object, no nết factor) → shown == applied
  XFORM   (wave 2) a word rewriter (old «thù -n» → «oán ngươi +n»): n comes from an older text, nothing is computed here
  SAMPLE  (wave 2) the kit sample pages (jkitpage, jkrel): demo cards (go: nop), nothing is applied
  PROVEN  (wave 2) read by hand, the apply goes through a direct, factor-free sink the regex cannot follow (an alias) — each site
          with its reason in PROVEN below; a reviewer checks these by reading
  RAW     oán / thiện cảm toward an NPC holder printed from a bare number → shown ≠ applied when the holder's nết factor ≠ 1
usage: python3 dev/test/relshow-scan.py [--list] [--fail-raw]   (run from the repo root)"""
import re,glob,sys,os
R=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
NUM=r'(?:[+−-]\$\{[^}]{1,80}\}|\$\{balSg\([^}]{1,80}\}|\$\{balAb\([^}]{1,80}\}|[+−][0-9]+)'
OAN=re.compile(r'(oán|Oán)([^`"$\n]{0,30}?)'+NUM)
AFF=re.compile(r'(thiện cảm|Thiện cảm|quý ngươi|quý nàng|quý ta|quý hắn)([^`"$\n]{0,30}?)'+NUM)
GT=re.compile(r'(ghen|Ghen|Chủ tin|tin )([^`"$\n]{0,12})'+NUM)
WIRE=('pvOan','pvQuy','pvOanAny','pvQuyAny','aaNum','aaSay')
def her(pre,word,kind):
  p=pre[-24:]
  if kind=='oan':return bool(re.search(r'(ta|ngươi|Ta|Ngươi)\s*$',p)) or bool(re.search(r'oán (nàng|hắn)',word+p))
  return word in('quý nàng','quý hắn') or 'Ta → nàng' in p or bool(re.search(r'(ta|Ta|ngươi|Ngươi)\s*$',p))
# site → why shown == applied (read by hand, review/net-ghen-2); keyed file:the matched text (start), so line moves keep it
PROVEN={
 'j7.js:thiện cảm ${balSg(BAL.cv.ngAff.warm)}':'newGirl(rel) SETS n.rel on a brand-new consort (j7:16), no affAdd',
 'j85.js:thiện cảm (${balSg(lf)}':'lf = ±BAL.rl.j85.ducStaff added straight to s.loyal (j85:159)',
 'j55.js:quý ngươi +${BAL.tdCourt.wedAf[1]}':'BAL.tdCourt.wedAf[kind] added straight to the court house head h.af (j55 tdKin), both cases shown',
 'jkc3.js:thiện cảm ${balSg(B.af)}':'kc3Ill → kcAf(me, BAL.kc3.ev.mebenh.af): m.af += n (jkc:74)',
 'jkc3.js:thiện cảm ${balSg(B.af)}':'kc3Ill → kcAf(me, BAL.kc3.ev.mebenh.af): m.af += n (jkc:74)',
 'jcoopworld.js:thiện cảm ${balSg(B.grudge)}':'co-op bribe: the holder is the OTHER PLAYER (a person, no nết); brbAff writes S.rl[id] straight (jcoopworld:1229)',
 'jcoopworld.js:thiện cảm ${balSg(B.grudge)}':'same co-op bribe card (PEND.thBribe), answered through briberRes → brbAff',
 'j83.js:Thiện cảm +${ev.fx.maid}':'ev.fx.maid → ap(a, ev.fx) → maid loyalty (j8:20 / j1:172), straight',
 'jhouse.js:thiện cảm +${H.che.failLoy}':'H = BAL.house: H.che.failLoy added straight to s.loyal (j10:108 servAct che)',
 'jkcg.js:thiện cảm ${balSg(H.writeAf)}':'kcAf(m, H.writeAf): m.af += n (jkc:74), jkcg:118',
 'jmline.js:thiện cảm +${B.beatLoy}':'s.loyal += B.beatLoy straight (jmline:96)',
 'jpet.js:quý ngươi +2':'«Hoàng hậu quý ngươi +2» = apply({hh:2}) on her own S.hh stat (jpet:197), no nết factor',
 'jpromsv.js:thiện cảm +${B.keepGain}':'spLvLoy(s, B.keepGain): s.loyal += n straight, her own Chủ tin when she is the servant (jpromsv:51)',
 'jpromsv.js:thiện cảm +${B.demoteOthers}':'others.forEach(y => y.loyal += B.demoteOthers) straight (jpromsv:57)',
 'jpromsv.js:thiện cảm +${B.letOthers}':'others.forEach(y => y.loyal += B.letOthers) straight (jpromsv:59)',
 'jstaff.js:quý ngươi +${B().giftAf||10}':'st.af.me += B().giftAf straight (jstaff:148 elder bieu)',
 'jstaff.js:quý ngươi +${B().giftAf||10}':'st.af.me += B().giftAf straight on the same line',
 'jopic.js:thiện cảm +6':'kit SAMPLE page text (§ sample cards), nothing is applied',
 'jtc.js:thiện cảm ${balSg(B.drop.calm)}':'B = BAL.thc: cur.loyal += B.drop.loy, the other maids e.s.loyal += B.drop.calm, straight (jtc:34)',
 'jtc.js:thiện cảm ${balSg(B.drop.loy)}':'B = BAL.thc: cur.loyal += B.drop.loy, the other maids e.s.loyal += B.drop.calm, straight (jtc:34)',
 'jtc.js:thiện cảm ${balSg(B.pick.loy)}':'s.loyal += B.pick.loy straight (jtc:36)',
 'jtc.js:thiện cảm ${balSg(B.drop.calm)}':'same drop rule (jtc:34)',
 'jtc.js:thiện cảm ${balSg(B.drop.loy)}':'same drop rule (jtc:34)',
 'jtc.js:thiện cảm ${balSg(B.pick.loy)}':'same pick rule (jtc:36)',
 'jtsb.js:Thiện cảm ${balSg(BAL.eff.jtsb.loyalDap)}':'tsbLoyal(BAL.eff.jtsb.loyalDap): maid + staff .loyal += d straight (jtsb:223)',
 'jgreet.js:oán nàng +${Math.round(PK.rel*BAL.relOan.hurt)}':'«Ngươi … oán nàng +n»: the holder is HER (oanAdd(S,v,…), the wrapper skips S) → exact',
 'jkc.js:oán ${balSg(r.oan)}':'family r = per(m): r.oan += round(−n/2) straight (jkc:211), no oanAdd',
 'j85.js:Thiện cảm ${balSg(BAL.rl.j85.ducStaff)}':'same rule (j85:159) printed on the Đức ladder: s.loyal += lf',
}
def proven(b,i,txt):
  for k,v in PROVEN.items():
    f,w=k.split(':',1)
    if f==b and txt.startswith(w):return True
  return False
rows=[];args=sys.argv[1:]
ALLT={}
for _f in glob.glob(os.path.join(R,'j*.js')):
  if not os.path.basename(_f).startswith('jbal'):ALLT[_f]=open(_f,encoding='utf-8').read()
_KC={}
SINK=r'(?:\.loyal\s*[+-]?=|loyAdd\(|srvAf\(|stfLike\(|kcAf\(|kc3Af\(|kc3TeachAf\(|eaAfOne\(|\bmaid\s*:|\.rel\s*[+-]?=|\.af(?:\[[^\]]+\]|\.\w+)?\s*[+-]?=)'
FAC=r'\b(affAdd|relAdd|msAffAdd|relAddAll|affAll)\('
def sinkKey(k,texts):
  e=re.escape(k)+r'(?![\w.\[])' if not k.isdigit() else r'(?<![\w.])'+k+r'(?![\w.])'
  rel=re.compile(FAC+r'[^;{}]*?'+e);snk=re.compile(SINK+r'[^;{}]*?'+e)
  return not any(rel.search(t) for t in texts) and any(snk.search(t) for t in texts)
def keyLOY(k):
  # key-level proof: k is only ever applied through a direct, factor-free sink (servant loyalty .loyal / loyAdd, srvAf / stfLike,
  # apply({maid}), a bare .rel / .af field), never through the trust-wrapped affAdd / relAdd / msAffAdd
  if k in _KC:return _KC[k]
  r=k.startswith(('BAL.','SRVA.')) and sinkKey(k,ALLT.values())
  _KC[k]=r;return r
def numKey(tail):
  m=re.match(r'[+−-]?([0-9]+)\b',tail)
  if m:return m.group(1)
  m=re.match(r'[+−-]?\$\{(?:balSg|balAb)\(([A-Za-z_.0-9\[\]]+)\)\}',tail) or re.match(r'[+−-]\$\{([A-Za-z_.0-9\[\]]+)\}',tail)
  return m.group(1) if m else None
import json
# W10: without the BAL dump every balSg(BAL.x) fall reads as sign 0 and lands in RAW (W9 saw «RAW 29» = 29 falls, all < 0).
# So the dump is required and must be newer than the built game: build it with
#   python3 dev/build/assemble.py && node dev/test/relshow-bal.js $PWD/dev/index.html dev/test/relshow-bal.json
_BJ=os.path.join(os.path.dirname(os.path.abspath(__file__)),'relshow-bal.json');_IX=os.path.join(R,'..','index.html')
if not os.path.exists(_BJ) or (os.path.exists(_IX) and os.path.getmtime(_BJ)<os.path.getmtime(_IX)):
  sys.exit('relshow-scan: dev/test/relshow-bal.json missing or older than dev/index.html — run: node dev/test/relshow-bal.js $PWD/dev/index.html dev/test/relshow-bal.json')
BALJ=json.load(open(_BJ))
def SIGN(path):
  # sign of a bare BAL path (relshow-bal.json = JSON.stringify(BAL) of the built game); 0 when unknown
  if not path.startswith('BAL.'):return 0
  o=BALJ
  for k in re.findall(r'[A-Za-z_0-9]+',path[4:]):
    if isinstance(o,dict) and k in o:o=o[k]
    elif isinstance(o,list) and k.isdigit() and int(k)<len(o):o=o[int(k)]
    else:return 0
  return (o>0)-(o<0) if isinstance(o,(int,float)) else 0
for f in sorted(glob.glob(os.path.join(R,'j*.js'))):
  b=os.path.basename(f)
  if b.startswith('jbal'):continue
  T=open(f,encoding='utf-8').read()
  T=re.sub(r'/\*.*?\*/',lambda m:re.sub(r'[^\n]',' ',m.group(0)),T,flags=re.S)  # comments out, lines kept
  for i,code in enumerate(T.split('\n'),1):
    if re.match(r'\s*//',code) or re.search(r'function (pvOan|pvOanAny|pvQuy|aaSay|aaNum)\(',code):continue
    for m in re.finditer(r'\b(pvOan|pvOanAny|pvQuy|pvQuyAny)\(',code):rows.append((b,i,'oan' if 'Oan' in m.group(1) else 'aff','WIRED',code[m.start():m.start()+60]))
    for kind,rx in (('oan',OAN),('aff',AFF),('gt',GT)):
      for m in rx.finditer(code):
        pre=code[:m.start()];tail=m.group(0)[len(m.group(1))+len(m.group(2)):]
        neg=tail.startswith(('-','−')) or tail.startswith('${balSg(-') or bool(re.match(r'\$\{balSg\(([A-Za-z_.0-9\[\]]+)\)\}',tail) and SIGN(re.match(r'\$\{balSg\(([A-Za-z_.0-9\[\]]+)\)\}',tail).group(1))<0) or pre.rstrip().endswith('bớt') or m.group(2).rstrip().endswith(('-','−','bớt oán','bớt'))
        if b in('jkitpage.js','jkrel.js') and kind!='gt':c='SAMPLE'
        elif kind=='oan' and re.search(r'\.replace\(/[^/]*thù[^/]*/g,\s*\(m,p,n\)=>`[^`]*$',pre):c='XFORM'
        elif kind=='gt':c='NOFAC'
        elif neg:c='NEG'
        elif any(w in code[max(0,m.start()-120):m.end()] for w in WIRE):c='WIRED' if any(w+'(' in m.group(0) or w in code[max(0,m.start()-60):m.start()] for w in WIRE) else ('FALL' if 'typeof pv' in code[max(0,m.start()-120):m.start()] else 'RAW')
        elif her(pre,m.group(1),kind):c='HER'
        elif kind=='aff' and re.search(r'Thái hậu\s*$',pre[-16:]):c='TH'
        elif kind=='aff' and (re.search(r'(dưới|Dưới|trên|Trên|từ|cần|≥)\s*$',m.group(2)) or code[m.end():m.end()+1]=='+' or code[m.end():m.end()+8].lstrip().startswith('trở lên')):c='THR'
        elif kind=='aff' and re.search(r'loyAdd\(|\.loyal\b',code) and not re.search(r'\b(affAdd|relAdd)\(',code):c='LOY'
        elif kind=='aff' and numKey(tail) and (keyLOY(numKey(tail)) or sinkKey(numKey(tail),[code])):c='DIRECT'
        else:c='RAW'
        if c=='RAW' and proven(b,i,m.group(0)):c='PROVEN'
        rows.append((b,i,kind,c,m.group(0)[:70]))
from collections import Counter
C=Counter((k,c) for _,_,k,c,_ in rows)
print('| kind | WIRED | HER | NEG | NOFAC | FALL | LOY | DIRECT | THR | TH | XFORM | SAMPLE | PROVEN | RAW | total |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|')
for k in('oan','aff','gt'):
  n=[C[(k,c)] for c in('WIRED','HER','NEG','NOFAC','FALL','LOY','DIRECT','THR','TH','XFORM','SAMPLE','PROVEN','RAW')];print(f'| {k} | '+' | '.join(map(str,n))+f' | {sum(n)} |')
if '--list' in args:
  for r in rows:
    if r[3]=='RAW' or ('--class' in args and r[3]==args[args.index('--class')+1]):print(f'{r[0]}:{r[1]} {r[2]} {r[3]} {r[4]}')
if '--fail-raw' in args and any(r[3]=='RAW' for r in rows):sys.exit(1)

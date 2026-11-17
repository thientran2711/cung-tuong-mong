#!/usr/bin/env python3
"""ONE TRAIT POOL code migration (review/trait-pool). Rewrites every old trait read in dev/build/j*.js into the pool API
(jnet.js): field compares -> hasT / netIs, nết-keyed tables -> tv, regex tests -> netRx, shown words -> netTxt, old words -> pool words.
Usage: python3 dev/tools/netmig.py [--dry]   (idempotent; prints per-file counts). The scan half lives in dev/test/net-scan.py."""
import re,sys,glob,os,json
D=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
OLD={"Hiểm độc":"Xảo quyệt","Hiền lành":"Ân cần","Đa nghi":"Kín đáo","Nhu mì":"Khiêm nhường","Hiếu thảo":"Vì gia tộc","Ghen tuông":"Nóng nảy",
 "Tham tiền":"Ham lợi","Cả nể":"Rộng lượng","Thẳng thắn":"Thật thà","Khéo léo":"Thực dụng"}
ALL=dict(OLD,**{"Xảo quyệt":"Xảo quyệt","Kiêu ngạo":"Kiêu ngạo","Tham vọng":"Tham vọng","Trọng nghĩa":"Trọng nghĩa","Nhiều chuyện":"Nhiều chuyện","Thù dai":"Thù dai","Mê tín":"Mê tín",
 "phong lưu":"Ham vui","đa tình":"Ham vui","trung hậu":"Thật thà","tham vọng":"Tham vọng","cẩn trọng":"Kín đáo"})
SQ={"trung":"loyal","tham":"greed","nhat":"timid","lanh":"sharp","chuyen":"talk"}
SKIP={'jnet.js','jbal2.js'}
X=r'([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*)'
def nm(w):return ALL.get(w,w)
def rx_names(body):
  for o,n in sorted(OLD.items(),key=lambda x:-len(x[0])):body=body.replace(o,n)
  return body.replace('Hiểm','Xảo quyệt')
def mig(s,f):
  c={}
  def sub(k,pat,rep,s,fl=0):
    n=[0]
    def r(m):n[0]+=1;return rep(m)
    s=re.sub(pat,r,s,flags=fl);c[k]=c.get(k,0)+n[0];return s
  # servant graded: (X.tr==="lanh"?15:0) -> nq(X,"sharp",15)
  s=sub('svq',r'\('+X+r'\.tr==="(trung|tham|nhat|lanh|chuyen)"\?(-?\d+(?:\.\d+)?):0\)',lambda m:'nq(%s,"%s",%s)'%(m.group(1),SQ[m.group(2)],m.group(3)),s)
  s=sub('svb',X+r'\.tr==="(trung|tham|nhat|lanh|chuyen)"',lambda m:'netIs(%s,"%s")'%(m.group(1),SQ[m.group(2)]),s)
  # regex tests on the trait fields
  s=sub('rx',r'(/[^/\n]{2,80}/)\.test\(`\$\{'+X+r'\.trait\|\|""\} \$\{\3\.trait2\|\|""\}`\)'.replace(r'\3',r'\2'),lambda m:'netRx(%s,%s)'%(m.group(2),rx_names(m.group(1))),s)
  s=sub('rx',r'(/[^/\n]{2,80}/)\.test\('+X+r'\.trait(?:\|\|"")?\)',lambda m:'netRx(%s,%s)'%(m.group(2),rx_names(m.group(1))),s)
  # [..].includes(X.trait)
  s=sub('inc',r'(\[[^\]\n]{2,120}\]|[A-Z_][A-Z_0-9]*)\.includes\('+X+r'\.trait\)',lambda m:'%s.some(t=>hasT(%s,t))'%(m.group(1),m.group(2)),s)
  # field compares
  s=sub('eq',X+r'\.trait2?===("[^"]+")',lambda m:'hasT(%s,"%s")'%(m.group(1),nm(m.group(2)[1:-1])),s)
  s=sub('ne',X+r'\.trait2?!==("[^"]+")',lambda m:'!hasT(%s,"%s")'%(m.group(1),nm(m.group(2)[1:-1])),s)
  # nết-keyed tables: TBL[X.trait] -> tv(TBL,X)
  s=sub('tv',r'((?:BAL\.)?[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*(?:\[[a-z]\])?)\['+X+r'\.trait\]',lambda m:'tv(%s,%s)'%(m.group(1),m.group(2)),s)
  # shown words
  s=sub('txt',r'\$\{'+X+r'\.trait\}\$\{\1\.trait2\?", "\+\1\.trait2:""\}',lambda m:'${netTxt(%s)}'%m.group(1),s)
  s=sub('txt',r'\$\{'+X+r'\.trait\}',lambda m:'${netTxt(%s)}'%m.group(1),s)
  # old words in string literals / keys / regex alternations
  for o,n in OLD.items():
    s=sub('word','"'+re.escape(o)+'"',lambda m,n=n:'"'+n+'"',s)
    s=sub('word',r'(?<=[/|(])'+re.escape(o)+r'(?=[|/)])',lambda m,n=n:n,s)
  return s,{k:v for k,v in c.items() if v}
dry='--dry' in sys.argv;tot={}
for p in sorted(glob.glob(os.path.join(D,'j*.js'))):
  f=os.path.basename(p)
  if f in SKIP:continue
  s=open(p,encoding='utf-8').read()
  # Emperor labels (ETRAITS) and Thái hậu archetype display names keep their words
  keep=[]
  def hold(m):keep.append(m.group(0));return '\x00%d\x00'%(len(keep)-1)
  t=re.sub(r'[^\n]*TRAIT_OLD[^\n]*',hold,s)
  t=re.sub(r'const ETRAITS=\{[\s\S]*?\n\};',hold,t);t=re.sub(r'n:"[^"]*"',hold,t) if f=='jtrong.js' else t
  t,c=mig(t,f)
  t=re.sub('\x00(\\d+)\x00',lambda m:keep[int(m.group(1))],t)
  if t!=s:
    tot[f]=c
    if not dry:open(p,'w',encoding='utf-8').write(t)
for f,c in tot.items():print(f,c)
print('files',len(tot),'sites',sum(sum(c.values()) for c in tot.values()))

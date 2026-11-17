# LUẬT SỬA CẢ NHÓM scan (review/seatcap-r1): every statement in dev/build/j*.js that WRITES a consort rank (rank=, rank++/--, rank+=/-=, queen=true).
import re,glob,os,sys
D=os.path.join(os.path.dirname(__file__),'..','build')
W=re.compile(r'(\b[\w$.\[\]]*\brank\s*(\+\+|--|[-+]?=(?!=))|(\+\+|--)\s*[\w$.]*\brank\b|\bqueen\s*=\s*(true|1|!0)\b)')
for f in sorted(glob.glob(D+'/j*.js')):
  for n,l in enumerate(open(f,encoding='utf-8'),1):
    for m in W.finditer(l):
      s=l[max(0,m.start()-70):m.end()+60].replace('\n','')
      if re.search(r'(coldRank|sRank|minRank|maxRank|\.rank\s*=>)',m.group(0)):continue
      print(f"{os.path.basename(f)}:{n}: {s}")

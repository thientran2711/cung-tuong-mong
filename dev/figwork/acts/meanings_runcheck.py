# python3 meanings_runcheck.py result.json... : first sentence of every logged line from real playthroughs (dev/test/act-pics.js)
# -> which meaning rule it hits; lists lines no rule covers (should be 0 besides UI words).
import json,re,sys,os,collections
H=os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0,H)
from meanings import R
C=[(k,re.compile(rx,re.I)) for k,rx,sc in R]
SKIP=re.compile(r'^(Xin xăm|Gieo lại|Đến |T\d+/\d+)')
hit=collections.Counter(); un=collections.Counter()
for f in sys.argv[1:]:
    for l in json.load(open(f)).get('logs',[]):
        l=re.sub(r'^T\d+/\d+ (Tuần|tuần) \S+\s*','',l.replace(' ',' ')).strip()
        l=re.sub(r'^(Tháng này|Tin triều đình|Triều đình|Thiên hạ)\s*:\s*','',l)
        s=re.split(r'(?<=[.!?])\s+(?=["“(]?[A-ZÀ-ỸĐ0-9])',l)[0].strip()
        if not s or SKIP.match(s): continue
        k=next((k for k,rx in C if rx.search(s)),None)
        if k: hit[k]+=1
        else: un[re.sub(r'\d+','N',s)[:110]]+=1
print('lines',sum(hit.values())+sum(un.values()),'covered',sum(hit.values()),'keys used',len(hit),'uncovered',sum(un.values()))
for s,n in un.most_common(80): print(' ?',n,s)

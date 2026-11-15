# python3 corpus_diff.py BEFORE.json AFTER.json CORPUS.txt : first matching log rule per corpus line, before vs after.
# Approval rule: 0 lines may go from a picture to another picture or to none ("lost").
import json,re,sys
B,A=[json.load(open(p)) for p in sys.argv[1:3]]; C=[l.strip() for l in open(sys.argv[3]) if l.strip()]
def comp(M):
    o=[]
    for rx,k in M['log']:
        try:o.append((re.compile(rx),k))
        except re.error:o.append((None,k))
    return o
def hit(R,s):
    for r,k in R:
        if r and r.search(s):return k
    return None
RB,RA=comp(B),comp(A); lost=gain=same=chg=0; ex=[]
for s in C:
    b,a=hit(RB,s),hit(RA,s)
    if b==a: same+=1
    elif b in (None,'-'): gain+=1; ex.append(('gain',b,a,s))
    else: lost+=1; ex.append(('LOST',b,a,s))
print('lines',len(C),'same',same,'gained picture/marker',gain,'lost picture',lost)
import os
if os.environ.get('V'):
    for e in ex[:40]: print(*e[:3],'|',e[3][:80])

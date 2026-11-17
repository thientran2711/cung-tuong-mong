"""ch1-4 goal before/after table (review/ch14-goals). usage: python3 dev/measure/ch14cmp.py <before_dir> <after_dir>
Per origin x difficulty: tutorial chapters 1-3 done (Xong) / closed, from story_*.json of runstory.sh (CHSTOP=4).
Also: ch3 failing step split (friend / art) and cnv ch2 S.nt at close, from the step log (instory tq.st) when present."""
import json,glob,sys,collections
def load(d):
    L=[]
    for f in glob.glob(d+'/story_*.json'):
        if f.endswith('.ext.json'):continue
        try:L+=json.load(open(f))
        except Exception:pass
    return L
def cells(L):
    C=collections.defaultdict(lambda:[[0,0],[0,0],[0,0],0])
    for x in L:
        o=x.get('origin');d=(x.get('rot') or '/').split('/')[-1] or x.get('diff')
        c=C[(o,d)];c[3]+=1
        for p in x.get('past',[])[:3]:
            n=p.get('n')
            if n in(1,2,3):
                c[n-1][1]+=1
                if p.get('tag')=='Xong':c[n-1][0]+=1
    return C
B,A=load(sys.argv[1]),load(sys.argv[2])
CB,CA=cells(B),cells(A)
OR="tt dtq muoi cn nc bd td ch thd cnv".split();DF="de vua kho".split()
f=lambda c,i:f"{c[i][0]}/{c[i][1]}" if c[i][1] else "-"
pc=lambda c,i:(100*c[i][0]/c[i][1]) if c[i][1] else None
print("| origin | diff | lives B/A | ch1 before → after | ch2 before → after | ch3 before → after |\n|---|---|---|---|---|---|")
tot={'B':[[0,0]]*3,'A':[[0,0]]*3}
low=[];hi=[]
for o in OR:
    for d in DF:
        b,a=CB[(o,d)],CA[(o,d)]
        print(f"| {o} | {d} | {b[3]}/{a[3]} | {f(b,0)} → {f(a,0)} | {f(b,1)} → {f(a,1)} | {f(b,2)} → {f(a,2)} |")
        for i in range(3):
            p=pc(a,i)
            if p is not None and a[i][1]>=5:
                if p<50:low.append((o,d,i+1,f(a,i)))
                if p>=100:hi.append((o,d,i+1,f(a,i)))
for nm,C in(("before",CB),("after",CA)):
    s=[[sum(C[k][i][0] for k in C),sum(C[k][i][1] for k in C)] for i in range(3)]
    print(f"\n**{nm}** lives {sum(C[k][3] for k in C)} · ch1 {s[0][0]}/{s[0][1]} ({100*s[0][0]//max(1,s[0][1])} %) · ch2 {s[1][0]}/{s[1][1]} ({100*s[1][0]//max(1,s[1][1])} %) · ch3 {s[2][0]}/{s[2][1]} ({100*s[2][0]//max(1,s[2][1])} %)")
print("\nafter cells < 50 %:",low);print("after cells at 100 %:",hi)
for nm,L in(("before",B),("after",A)):
    fr=ar=both=n=0;nt=[]
    for x in L:
        for t in x.get('tq',[]):
            st=t.get('st')
            if t.get('id')=='tap14' and st:
                n+=1;fr+=st[0];ar+=st[1];both+=st[0] and st[1]
            if t.get('id')=='sung14' and x.get('origin')=='cnv':nt.append(t.get('nt')) if t.get('nt') is not None else None
    if n:print(f"{nm} ch3 closes {n}: friend step ok {fr}, art step ok {ar}, both {both}")
    if nt:print(f"{nm} cnv ch2 Hoàng thượng để ý at close: sorted {sorted(nt)}")

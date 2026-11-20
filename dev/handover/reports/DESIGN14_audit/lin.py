import re,sys
def units(t):
    return [u.strip() for u in re.split(r'(?<=[.;])\s+|:\s(?=[A-Z])',t) if len(u.split())>=4]
def W(u): return set(re.findall(r"[a-zà-ỹ0-9#']+",u.lower()))
chain=sys.argv[1:]
for a,b in zip(chain,chain[1:]):
    A=open(a,encoding='utf-8').read(); B=open(b,encoding='utf-8').read()
    UB=[W(u) for u in units(B)]; allB=W(B)
    print(f"\n### {a.split('/')[-1]} -> {b.split('/')[-1]}")
    for u in units(A):
        w=W(u); best=max((len(w&x)/len(w) for x in UB),default=0)
        if best<0.7:
            miss=[x for x in re.findall(r"[A-Za-zÀ-ỹ0-9#']+",u) if x.lower() not in allB]
            print(f" - [{best:.0%}] {u[:230]}" + (f"  || words gone: {' '.join(miss[:15])}" if miss else ""))

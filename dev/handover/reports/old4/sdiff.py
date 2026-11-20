import re,sys
def sents(t): return [s.strip() for s in re.split(r'(?<=[.;:])\s+(?=[A-Z])',t) if s.strip()]
a=open(sys.argv[1]).read(); b=open(sys.argv[2]).read()
A=sents(a); B=sents(b); SA=set(A); SB=set(B)
print("--- ONLY OLD:"); [print(" -",s) for s in A if s not in SB]
print("--- ONLY NEW:"); [print(" +",s) for s in B if s not in SA]

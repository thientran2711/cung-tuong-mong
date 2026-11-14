# addcol.py jid=id ... : append id as next column to the jid's line in ages.txt ; new jid lines created if absent
import sys
L=[l.split() for l in open('ages.txt') if l.strip()]
idx={p[0]:p for p in L}
for a in sys.argv[1:]:
    j,v=a.split('=')
    if j in idx: idx[j].append(v)
    else: p=[j,v]; L.append(p); idx[j]=p
open('ages.txt','w').write("\n".join(" ".join(p) for p in L)+"\n")

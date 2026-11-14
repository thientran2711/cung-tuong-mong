# mid.sh JID... : print style/idref + variable middle of each prompt (between fixed prefix and STILL)
cd "$(dirname "$0")"; python3 mjobs.py "$@" | grep -v "^$" | python3 -c "
import sys
L=sys.stdin.read().splitlines()
for i in range(0,len(L),2):
    h=L[i]; p=L[i+1]
    a=p.index(' Outfit for all four')+1
    b=p.index('; all four standing still')
    pre=p[:a]; post=p[b:]
    print(h); print(p[a:b]); print()
import hashlib
"

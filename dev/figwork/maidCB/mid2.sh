# mid2.sh JID... : print "JID STY MREF" + middle (Outfit..poses) only; full prompt = PRE.txt + " " + middle + POST.txt
cd "$(dirname "$0")"; python3 mjobs.py "$@" | python3 -c "
import sys
L=[l for l in sys.stdin.read().splitlines() if l]
pre=open('PRE.txt').read().rstrip('\n'); post=open('POST.txt').read().rstrip('\n')
for i in range(0,len(L),2):
    p=L[i+1]; a=p.index('Outfit for all four'); b=p.index('; all four standing still')
    assert p[:a].strip()==pre.strip() and p[b:]==post, 'prefix/suffix mismatch '+L[i]
    print(L[i]); print(p[a:b]); print()"

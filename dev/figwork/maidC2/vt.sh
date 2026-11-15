cd "$(dirname "$0")"; for j in "$@"; do python3 mjobs.py $j > p.txt; head -1 p.txt; sed -n 2p p.txt | python3 -c "
import sys,re;p=sys.stdin.read();p=p[p.index('Outfit for all'):p.index('; all four standing')]
p=re.sub(r'Forehead: a huadian ornament between the brows: (.*?) (painted|finely|cut|of gold).*?; the same huadian on all four figures\.',r'HD[\1]',p)
p=re.sub(r'Poses \(NEW.*?left to right: ','P: ',p); print(p)"; done

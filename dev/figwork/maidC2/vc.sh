cd "$(dirname "$0")"; for j in "$@"; do python3 mjobs.py $j > p.txt; head -1 p.txt; sed -n 2p p.txt | python3 -c "
import sys,re;p=sys.stdin.read();p=p[p.index('Outfit for all'):p.index('; all four standing')]
p=re.sub(r'a NEW outfit, a fine silk robe with delicate embroidered (.*?) at the collar.*?fresh flower;',r'[T1 \1];',p)
p=p.replace('Forehead: a small, delicate, refined huadian between the brows, elegant, not large, about the size of a fingertip and clearly visible (like the small red flower between the brows in a classic portrait): her signature motif ','HD: ').replace('; same small size at every rank, never covering the forehead or spreading to the brows; the same huadian on all four figures.','')
p=re.sub(r'Poses \(NEW.*?left to right: ','P: ',p); p=p.replace('Outfit for all four (rank-1 consort (Dap ung)): ','').replace('her signature colour family ','COL ').replace(' stays the MAIN robe colour','')
print(p)"; done

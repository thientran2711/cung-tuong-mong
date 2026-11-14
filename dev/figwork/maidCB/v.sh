# v.sh JID... : compact variable parts (STY MREF | outfit | huadian | poses)
cd "$(dirname "$0")"; python3 mjobs.py "$@" | python3 -c "
import sys,re
L=[l for l in sys.stdin.read().splitlines() if l]
for i in range(0,len(L),2):
    p=L[i+1]; a=p.index('Outfit for all four'); h=p.index(' Forehead:') if ' Forehead:' in p else p.index(' No huadian'); s=p.index(' Poses (NEW'); b=p.index('; all four standing still')
    hd=p[h:s]; hd=re.sub(r'; size: .*','',hd)
    po=p[s:b]; po=po[po.index('left to right: ')+15:]
    print(L[i]); print('  O:',p[a:h]); print('  H:',hd); print('  P:',po)"

# vp.sh JID... : print style ref and only the variable part (after "a NEW outfit, " up to " All four stand")
cd "$(dirname "$0")"
for j in "$@"; do python3 mjobs.py $j | head -2 | python3 -c "
import sys;l=sys.stdin.read().split('\n');p=l[1];print(l[0]);print(p[p.index('a NEW outfit, ')+14:p.index(' All four stand')])"; done

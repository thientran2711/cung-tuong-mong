# run.sh JID... : process latest bg line for each jid
cd "$(dirname "$0")"
python3 - "$@" <<'P' > _b.txt
import sys
want=set(sys.argv[1:]); d={}
for l in open('sheets4_bg.txt'):
    p=l.split()
    if len(p)==3 and p[0] in want: d[p[0]]=l
sys.stdout.write(''.join(d[k] for k in sys.argv[1:] if k in d))
P
python3 sheetproc.py _b.txt | tail -n 20

# fin.sh N "jids" "bgs" "status line" "commit msg" : addbg, mproc, previews, sheet, PROGRESS status line, publish
cd "$(dirname "$0")"; N=$1; J="$2"
bash addbg.sh "$J" "$3" >/dev/null
python3 mproc.py bg.txt $J 2>&1 | grep -v " ok " | tail -5
python3 lv.py ../wt-maidB/dev/figwork/maidB/preview $J
ids=$(for j in $J; do echo $j | cut -d- -f2; done | sort -u | tr '\n' ' ')
TH=150 python3 msheet.py ../B_b$N.jpg consort t1,tm0,tm1,tm2,tm3,tm4 $ids
python3 - "$4" <<'P'
import sys;p='../wt-maidB/dev/figwork/PROGRESS_B.md';s=open(p).read();i=s.index('## NEXT (exact)');s=s[:i].rstrip('\n')+'\n'+sys.argv[1]+'\n\n'+s[i:];open(p,'w').write(s)
P
bash pubm.sh "$5" ../B_b$N.jpg 2>&1 | tail -2

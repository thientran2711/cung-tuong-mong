# proc.sh A|B LIST(jid gen bg) : moles inpaint -> ledgers -> mproc -> afix -> porcrop
set -e
S=/tmp/claude-0/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/scratchpad
P=$1; L=$2; M=$S/maid$P; W=$S/wt-maid$P
cp $S/urls_all.json $M/urls.json
mkdir -p $M/bg
python3 - "$L" "$M" <<'PY'
import sys,json,subprocess,os
S="/tmp/claude-0/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/scratchpad"
db=json.load(open(S+"/urls_all.json")); L,M=sys.argv[1:3]
for l in open(L):
    jid,gen,bid=l.split()
    raw=f"{M}/bg/{jid}-{bid}.png"; g=f"{M}/bg/gen-{gen}.png"
    for p,c in ((raw,bid),(g,gen)):
        if not os.path.exists(p): subprocess.run(["curl","-sS","--retry","6","--retry-all-errors","-o",p,db[c]],check=True)
    subprocess.run(["python3",S+"/tools/mole.py","fix",jid,gen,raw,g],check=True)
PY
while read j g b; do echo "$j $g" >> $M/gens.txt; echo "$j $g $b" >> $M/bg.txt; done < $L
python3 $M/mproc.py $M/bg.txt $(cut -d' ' -f1 $L) | tail -3
cd $W
FIGS=$(for j in $(cut -d' ' -f1 $L); do who=$(echo $j | cut -d- -f2); t=$(echo $j | cut -d- -f3); ls img/fig-*-$who-t$t-a??.webp; done)
python3 $S/tools/afix.py $FIGS | awk '{s+=$1} END{print "afix",NR,s}'
python3 $S/tools/porcrop.py $FIGS | awk '{print $1}' | sort | uniq -c

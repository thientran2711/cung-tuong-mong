# proc.sh JID... : cut-out split -> out/ fig+por, cutcheck(+fixalpha), porcrop 384x506, sheets (bg.txt already has the lines)
cd /tmp/claude-0/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/scratchpad/cw
python3 pproc.py "$@" 2>&1 | grep -v WARN | grep -E "ok|NOURL|darkfix|Error|error" | cut -c1-90 | tee pp.log
grep -q "NOURL\|rror" pp.log && { echo "ABORT"; exit 1; }
FIGS=""; for j in "$@"; do w=$(echo $j|cut -d- -f2); t=$(echo $j|cut -d- -f3|sed 's/^tcold$/cold/'); FIGS="$FIGS $(ls out/fig-maid-$w-$t-a*.webp)"; done
python3 cf/cutcheck.py $FIGS 2>/dev/null | awk '$1>=1.0{print $NF}' > flagged.txt
[ -s flagged.txt ] && { echo "CUTCHECK flagged:"; cat flagged.txt; python3 cf/fixalpha.py $(cat flagged.txt); python3 cf/cutcheck.py $(cat flagged.txt) 2>/dev/null | head; }
python3 cf/porcrop.py --out out $FIGS 2>&1 | grep -vi "^eyes" | grep -iv "^ok\|wrote" | tail -5
python3 sheet.py "$@" >/dev/null && echo sheets

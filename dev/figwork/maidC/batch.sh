# batch.sh "jids" "bgids" "progress line" : addbg, cut-out, split, porcrop, cutcheck(+fixalpha), sheets, progress, publish
cd "$(dirname "$0")"
bash addbg.sh "$1" "$2" >/dev/null
python3 pproc.py $1 2>&1 | grep -v WARN | grep -E "ok|NOURL|darkfix|Error|error" | sed 's/\[.face., .face., .face., .face.\]//' | tee pp.log
grep -q "NOURL\|rror" pp.log && { echo "ABORT: missing url / error"; exit 1; }
FIGS=""; for j in $1; do w=$(echo $j|cut -d- -f2); t=$(echo $j|cut -d- -f3|sed 's/^tcold$/cold/'); FIGS="$FIGS $(ls out/fig-maid-$w-$t-a*.webp)"; done
python3 cf/cutcheck.py $FIGS 2>/dev/null | awk '$1>=1.0{print $NF}' > flagged.txt
[ -s flagged.txt ] && { echo "CUTCHECK flagged:"; cat flagged.txt; python3 cf/fixalpha.py $(cat flagged.txt); }
python3 cf/porcrop.py --out out $FIGS 2>&1 | grep -vi "^eyes" | grep -iv "^ok\|wrote" | tail -5
python3 sheet.py $1 >/dev/null
[ -n "$3" ] && echo "$3" >> PROGRESS_C.md
[ -n "$3" ] && bash pub.sh "Part C: $3"

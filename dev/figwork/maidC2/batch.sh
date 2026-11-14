# batch.sh "jids" "bgids" "progress line" : addbg, cut-out, sheets, progress, publish
cd "$(dirname "$0")"
bash addbg.sh "$1" "$2" >/dev/null
python3 pproc.py $1 2>&1 | grep -v WARN | grep -E "ok|NOURL|mincut|darkfix" | sed 's/\[.face., .face., .face., .face.\]//'
FIGS=""; for j in $1; do w=$(echo $j|cut -d- -f2); t=$(echo $j|cut -d- -f3|sed 's/^tcold$/cold/'); FIGS="$FIGS $(ls out/fig-maid-$w-$t-a*.webp)"; done
PYTHONPATH=cv4 python3 cf/porcrop.py --out out $FIGS 2>&1 | grep -v "^eyes" | tail -5
python3 cf/cutcheck.py $FIGS 2>&1 | awk '$1>=8{print "CUTCHECK",$0}'
python3 sheet.py $1 >/dev/null
echo "$3" >> PROGRESS_C2.md
bash pub.sh "Part C2: $3"

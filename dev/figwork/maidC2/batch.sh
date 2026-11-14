# batch.sh "jids" "bgids" "progress line" : addbg, cut-out, sheets, progress, publish
cd "$(dirname "$0")"
bash addbg.sh "$1" "$2" >/dev/null
python3 pproc.py $1 2>&1 | grep -v WARN | grep -E "ok|NOURL|mincut|darkfix" | sed 's/\[.face., .face., .face., .face.\]//'
python3 sheet.py $1 >/dev/null
echo "$3" >> PROGRESS_C2.md
bash pub.sh "Part C2: $3"

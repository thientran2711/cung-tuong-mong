# dl.sh bgfile : curl every bg png listed (jid gen bg) from urls.json
cd "$(dirname "$0")"
while read j g b; do [ -n "$b" ] && [ ! -s bg/$b.png ] && python3 -c "import json,sys;print(json.load(open('urls.json'))['$b'])" | xargs -I{} curl -sS -o bg/$b.png "{}"; done < $1
ls -la bg | tail -n +4 | wc -l

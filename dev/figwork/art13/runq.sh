#!/bin/bash
# runq.sh : sequential paste queue. Lines in jobs13.txt: "NAME EDITFILE MODES [cur]" ; "END" stops. Progress in runq.log (one line per job)
cd "$(dirname "$0")"
i=$(wc -l < runq.log 2>/dev/null || echo 0)
while true; do
  line=$(sed -n "$((i+1))p" jobs13.txt 2>/dev/null)
  if [ -z "$line" ]; then sleep 15; continue; fi
  [ "$line" = "END" ] && exit 0
  set -- $line
  if [ "$4" = "cur" ]; then B=cur; else B=; fi
  BASE=$B python3 -I hdg.py paste $1 $2 $3 > g/p-$1.log 2>&1 && st=ok || st=FAIL
  echo "$st $1 $(grep -c 'BAD' g/p-$1.log) bad" >> runq.log
  i=$((i+1))
done

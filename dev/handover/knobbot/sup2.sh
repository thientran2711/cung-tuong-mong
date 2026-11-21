#!/bin/bash
# keep 4 processes on arm $1 until >=30 lives
cd /home/user/wt/rv-bot; a=$1; N=${2:-30}
cnt(){ python3 -c "
import json,glob;print(sum(len(json.load(open(f))) for f in glob.glob('outk/life-$a-[0-9]*[0-9].json')))" 2>/dev/null || echo 0; }
nxt(){ s=21; while [ -e outk/log-$a-$s.txt ]; do s=$((s+1)); done; echo $s; }
while :; do
  n=$(cnt); [ "$n" -ge $N ] && { pkill -f "outk/life-$a-"; break; }
  run=$(pgrep -fc "outk/life-$a-")
  while [ "$run" -lt 4 ]; do s=$(nxt); nohup ./runk.sh $a $s 30 5400 >/dev/null 2>&1 & echo "$(date -u +%H:%M) start $a $s (have $n)"; run=$((run+1)); sleep 5; done
  sleep 120
done
date -u; echo DONE $a=$(cnt)

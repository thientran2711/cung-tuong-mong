#!/bin/bash
# nxt.sh N [SKIP]: print compact job lines key|sheet|a18|pose and the prompt template with @@POSE@@
cd "$(dirname "$0")"; python3 job.py ${1:-4} ${2:-0} | python3 -c "
import sys,json
t=None
for l in sys.stdin:
  d=json.loads(l);p=d['prompt'].split('five fingers: ')[1].split(' She holds')[0];print(d['key'],d['sheet'],d['a18'],'|',p);t=d['prompt'].replace(p,'@@POSE@@')
print(t)"

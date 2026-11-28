#!/bin/bash
cd /home/user/wt
echo "pid: $(pgrep -f 'robot-rt.*s2h' | head -1) etime: $(ps -o etime= -p $(pgrep -f 'robot-rt.*s2h' | head -1) 2>/dev/null)"
echo "guard: $(pgrep -f guard5 | head -1)"
echo "pin server 8812: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:8812/ 2>&1) pixi: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:8812/dev/vendor/pixi-8.5.2.min.js)"
echo "ckpt mtime: $(stat -c %y out6/flight2-s2h.ckpt.json | cut -c1-19) now: $(date -u '+%F %T')"
grep -E '^CP' out6/flight2-s2h.log | tail -1
python3 s2h-stat.py | cut -c1-230

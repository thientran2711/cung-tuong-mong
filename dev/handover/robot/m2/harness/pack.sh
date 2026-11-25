#!/bin/bash
# usage: pack.sh "<progress line>"   — copies harness+logs to the handover worktree and pushes (single clean attempt)
set -e
M=/home/user/wt/m2; H=/home/user/wt/ho
cd $M; rm -f eval.out; echo '(()=>JSON.stringify({keys:Object.keys(localStorage).filter(k=>/hclh-save/.test(k)),saves:Object.keys(localStorage).filter(k=>/hclh-save/.test(k)).map(x=>[x,localStorage.getItem(x)])}))()' > EVAL.js; for i in $(seq 1 30); do [ -s eval.out ] && break; sleep 2; done; [ -s eval.out ] && cp eval.out evid/save_dump_latest.json
cd $H; git checkout -q --detach; flock /home/user/wt/fetch.lock git fetch -q --depth=30 origin claude/cung-tuong-mong-handover-hj0h8w
git checkout -q -B m2pack origin/claude/cung-tuong-mong-handover-hj0h8w
D=dev/handover/robot/m2; mkdir -p $D/harness $D/logs
cp $M/RESUME.md $M/robot.js $M/policy.js $M/lib.js $M/srv.js $M/pack.sh $D/harness/ 2>/dev/null || true
cp $M/bugs.jsonl $M/moments.md $M/stuck.log $M/status.json $D/logs/ 2>/dev/null || true
tail -n 3000 $M/life.log > $D/logs/life-tail.log
cp $M/evid/save_dump_latest.json $D/logs/save_dump_latest.json
F=dev/handover/robot/flight-M2.md
[ -f $F ] || printf '# flight-M2 — one SOLO life, LIVE origin/main, Fold 755x1000, SEED 102, thd_tho (real taps)\nHarness: dev/handover/robot/m2/harness (robot.js engine + policy.js, node, Playwright persistent context, touchscreen taps after elementFromPoint hit-check).\nSave to resume: logs/save_dump_latest.json (localStorage hclh-save-v2-*, slot 2 = this life).\n\n## Hourly progress\n' > $F
echo "- $(date -u +%H:%MZ) $1" >> $F
git add $D $F; git commit -q -m "M2 flight: progress + harness + save snapshot

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01V1ZZH4epskhw29EGpzVRnh"
git push -q origin HEAD:claude/cung-tuong-mong-handover-hj0h8w 2>&1 | tail -2; git log --oneline -1 | cut -c1-70

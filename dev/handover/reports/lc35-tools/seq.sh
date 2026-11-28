#!/bin/bash
S=/tmp/claude-0/-home-user-cung-tuong-mong/16431846-4a1e-5251-849f-501ccdc71bb2/scratchpad
while pgrep -f 'dayq-noturn.js' >/dev/null; do sleep 15; done; echo "dayq-noturn finished (rc see log tail)" >> $S/dq-test2.log
for i in 1 2; do (cd /home/user/wt/lc35-s2 && timeout 900 node dev/test/next-dead.js file:///home/user/wt/lc35-s2/index.html > $S/nd/s2-$i.log 2>&1; echo "s2 run$i rc=$? $(tail -1 $S/nd/s2-$i.log)" >> $S/nd/sum.txt); done
(cd /home/user/wt/lc35-live && git checkout -q -f --detach 22afefb4 && timeout 900 node dev/test/next-dead.js file:///home/user/wt/lc35-live/index.html > $S/nd/live.log 2>&1; echo "LIVE 22afefb4 rc=$? $(tail -1 $S/nd/live.log)" >> $S/nd/sum.txt)
(cd /home/user/wt/lc35-dq && bash dev/tools/quickcheck.sh > $S/dq-qc2.log 2>&1; echo "QC rc=$?" >> $S/dq-qc2.log)
bash $S/u3.sh

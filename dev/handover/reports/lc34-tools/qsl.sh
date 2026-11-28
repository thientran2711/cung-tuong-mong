#!/bin/bash
# q-softlock ×3 interleaved: savepid vs LIVE (file path, not file:// url)
O=/tmp/claude-0/-home-user-cung-tuong-mong/91da9bef-5288-585b-baf6-4ec29e0fa17c/scratchpad/sp; : > $O/qsl.txt
for i in 1 2 3; do for w in sp live; do cd /home/user/wt/$w; timeout 900 node dev/test/q-softlock.js /home/user/wt/$w/index.html > $O/qsl-$w-$i.log 2>&1; echo "$w run$i rc=$? :: $(grep -c '^FAIL' $O/qsl-$w-$i.log) FAIL :: $(grep '^FAIL' $O/qsl-$w-$i.log | cut -c1-90 | tr '\n' '|')" >> $O/qsl.txt; done; done; echo QSLDONE >> $O/qsl.txt

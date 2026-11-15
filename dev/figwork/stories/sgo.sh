#!/bin/bash
# sgo.sh : fetch every "arc:beat ID" in spending.txt (finished urls from the session transcript, TRX), crop to img/st-*.webp, sheet $PREV/ss.jpg.
# Lines fetched are removed from spending.txt. Then look at the sheet and run swire.sh on the good keys.
H=$(cd "$(dirname "$0")" && pwd); cd $H
K=$(awk 'NF==2{print $1}' spending.txt)
python3 ../acts/trxurl.py $(awk 'NF==2{print $1"="$2}' spending.txt) | python3 sfetch.py | tee /dev/stderr | awk '{print $2}' > /dev/null
ok=$(for k in $K; do a=${k%%:*}; b=${k#*:}; [ -f ../../../img/st-${a//_/-}-$b.webp ] && echo $k; done)
for k in $ok; do sed -i "/^$k /d" spending.txt; done
python3 ssheet.py $PREV/ss.jpg 8 $ok

#!/bin/bash
# download each zip (only when >1.5 GB free), convert to src/*.webp, delete zip. Restartable.
T=/home/user/wt/trung-y/.tywork; cd $T; touch conv.txt
while read b url; do
  grep -qx "$b" conv.txt && continue
  f=zipdl/ty-$b.zip
  for t in 1 2 3 4 5 6 7 8; do
    if [ -f $f ] && unzip -tq $f >/dev/null 2>&1; then break; fi
    until [ $(df --output=avail -k $T | tail -1) -gt 1500000 ]; do sleep 20; done
    curl -sS -C - --retry 3 -o $f "$url"; unzip -tq $f >/dev/null 2>&1 || { echo "$b retry $t"; sleep 15; [ $((t%3)) -eq 0 ] && rm -f $f; }
  done
  unzip -tq $f >/dev/null 2>&1 || { echo "$b FAILED"; continue; }
  python3 -I $T/bin/z2src.py $f $T/src && echo "$b" >> conv.txt && rm -f $f
done < zips.txt
echo DONE

#!/bin/bash
# usage: regress.sh <html> <outfile>   runs every test in tests.txt against the given built page
H=$(readlink -f $1);OUT=$2;: > $OUT
cd /home/user/wt/sp
for t in $(cat /home/user/wt/sp-out/tests.txt); do
  f=dev/test/$t
  if grep -q -E "path\.resolve\(|'file://'\+|\"file://\"\+|readFileSync\(process\.argv\[2\]" $f; then A=$H; else A="file://$H"; fi
  timeout 240 node $f "$A" > /tmp/claude-0/rg.$$ 2>&1; e=$?; r=$(tail -2 /tmp/claude-0/rg.$$ | tr '\n' ' ' | cut -c1-200); echo "$t	$e	$r" >> $OUT
done

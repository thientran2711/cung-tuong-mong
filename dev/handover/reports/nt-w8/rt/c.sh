#!/bin/bash
# usage: c.sh dev "cmd1" "cmd2" ...  — sends commands, waits, prints new output
D=${RTD:-/tmp/claude-0/-home-user-cung-tuong-mong/9f39e592-4039-5226-9b8f-180fa3a29ccf/scratchpad/w8/rt}; dev=$1; shift
n0=$(wc -l < $D/out-$dev.txt); k0=$(grep -c '^  ok$' $D/out-$dev.txt)
for c in "$@"; do echo "$c" >> $D/cmd-$dev.txt; done
want=$((k0+$#)); for i in $(seq 1 300); do k=$(grep -c '^  ok$' $D/out-$dev.txt); [ $k -ge $want ] && break; grep -q FATAL $D/out-$dev.txt && break; sleep 1; done
tail -n +$((n0+1)) $D/out-$dev.txt | grep -v '^  ok$' | cut -c1-1500

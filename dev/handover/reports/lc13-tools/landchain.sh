#!/bin/bash
S=/tmp/claude-0/-home-user-cung-tuong-mong/06e5c955-6f72-5bee-9f11-e0a73a5f2e13/scratchpad; L=$S/land.log
cd /home/user/wt/v9 || exit 1
for s in "$@"; do
  ok=; for try in 1 2; do bash $S/golive-lc13.sh $s --yes > $S/gl-$s-$try.log 2>&1 && grep -q "^LIVE " $S/gl-$s-$try.log && { ok=1; break; }; grep -q 'quickcheck FAILED' $S/gl-$s-$try.log || break; done
  if [ -n "$ok" ]; then echo "$(date -u +%H:%MZ) $(grep '^LIVE ' $S/gl-$s-$try.log)" >> $L; else echo "$(date -u +%H:%MZ) STOP at $s: $(grep -E 'STOP|FAIL|error|rejected' $S/gl-$s-$try.log | tail -2 | tr '\n' ' ')" >> $L; exit 1; fi
done
echo "$(date -u +%H:%MZ) CHAIN DONE" >> $L

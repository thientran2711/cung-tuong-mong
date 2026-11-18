#!/bin/sh
# one file per commit on the busy handover branch: sh dev/tools/archive_one.sh <name> [extra archive_move.py args]  (e.g. CLAIMS --protect 58 --claims)
B=claude/cung-tuong-mong-handover-hj0h8w; N=$1; shift
for try in 1 2 3 4 5 6; do
  git fetch -q origin $B && git reset -q --hard origin/$B && git clean -fdq dev/archive
  F=dev/handover/$N.md; cp $F /tmp/_before_$N.md
  python3 dev/tools/archive_move.py $F "$@" || exit 1
  A=$(ls dev/archive/$N-*.md | head -1)
  # nothing lost: every line before is in live or archive (multiset check)
  cat $F $A | sort > /tmp/_a.txt; sort /tmp/_before_$N.md > /tmp/_b.txt
  [ "$(comm -23 /tmp/_b.txt /tmp/_a.txt | wc -l)" = 0 ] || { echo LOST LINES; exit 1; }
  [ -z "$(grep -rln '^<<<<<<< ' dev)" ] || { echo CONFLICT MARKERS; exit 1; }
  git add dev/archive $F && git commit -q -m "docs: archive finished entries of $N (live file <= 100 KB, owner 18/11 03:04Z)" && \
  git push -q origin HEAD:$B && { echo "PUSHED $N $(git rev-parse --short HEAD)"; exit 0; }
  echo "push rejected, retry $try"; sleep 2
done; exit 1

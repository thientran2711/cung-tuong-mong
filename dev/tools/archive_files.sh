#!/bin/sh
# one commit per kind: sh dev/tools/archive_files.sh reports|briefs
B=claude/cung-tuong-mong-handover-hj0h8w; K=$1
for try in 1 2 3 4 5 6; do
  git fetch -q origin $B && git reset -q --hard origin/$B && git clean -fdq dev/archive
  python3 dev/tools/archive_files.py $K || exit 1
  [ -z "$(grep -rln '^<<<<<<< ' dev)" ] || { echo CONFLICT; exit 1; }
  git commit -q -m "docs: move old $K to dev/archive/$K (unreferenced, >24 h; git mv, same names)" && git push -q origin HEAD:$B && { echo "PUSHED $K $(git rev-parse --short HEAD)"; exit 0; }
  echo retry; sleep 2
done; exit 1

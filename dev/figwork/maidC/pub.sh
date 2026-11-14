# pub.sh "msg" : fetch, reset worktree wc to origin/review/maid-art-c, copy out/ + tools + sheets + PROGRESS_C.md, merge my records, commit, push (retry)
S=/tmp/claude-0/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/scratchpad; C=$S/cw; W=$S/wc; m="$1"
cd $W || exit 1
for try in 1 2 3 4 5; do
  git fetch -q origin
  git checkout -q -f --detach origin/review/maid-art-c && git clean -qfd img dev/figwork >/dev/null
  cp $C/out/*.webp img/ 2>/dev/null
  mkdir -p dev/figwork/maidC dev/figwork/sheets
  cp $C/*.py $C/*.sh $C/gens.txt $C/bg.txt $C/mref.json $C/myrecs.json dev/figwork/maidC/ 2>/dev/null
  cp $C/cf/*.py dev/figwork/maidC/ 2>/dev/null
  cp $C/sheets/C_*.jpg dev/figwork/sheets/ 2>/dev/null
  cp $C/PROGRESS_C.md dev/figwork/PROGRESS_C.md
  [ -f $C/HUADIAN_C.md ] && cp $C/HUADIAN_C.md dev/figwork/HUADIAN_C.md
  python3 $C/merge.py $W || exit 1
  python3 -m json.tool img/FIGURES-servants.json >/dev/null || { echo BADJSON; exit 1; }
  git add img dev/figwork && git commit -q -m "$m

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Rc5AsLPQEe167UjGtvecD3"
  git push -q origin HEAD:refs/heads/review/maid-art-c 2>&1 | grep -v '^remote' 
  git fetch -q origin; [ "$(git rev-parse HEAD)" = "$(git rev-parse origin/review/maid-art-c)" ] && { git log --oneline -1; exit 0; }
  echo "retry $try"; sleep 5
done; echo PUSHFAIL; exit 1

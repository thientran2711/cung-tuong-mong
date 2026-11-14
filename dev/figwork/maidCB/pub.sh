# pub.sh "msg" "progress line" : (Part C-B, m27–m52) fetch, reset worktree wcB to origin/review/maid-art-c, copy MY out/ + sheets, tools -> dev/figwork/maidCB/,
# append progress line under "## C-B" in PROGRESS_C.md, merge only my m27–m52 records, commit, push (retry)
S=/tmp/claude-0/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/scratchpad; C=$S/cwB; W=$S/wcB; m="$1"; P="$2"
cd $W || exit 1
for try in 1 2 3 4 5 6; do
  git fetch -q origin
  git checkout -q -f --detach origin/review/maid-art-c && git clean -qfd img dev/figwork >/dev/null
  for f in $C/out/*.webp; do case $(basename $f) in *-m2[7-9]-*|*-m[34][0-9]-*|*-m5[0-2]-*) cp $f img/;; esac; done
  mkdir -p dev/figwork/maidCB dev/figwork/sheets
  cp $C/*.py $C/*.sh $C/PRE.txt $C/POST.txt $C/gens.txt $C/bg.txt $C/mref.json $C/myrecs.json dev/figwork/maidCB/ 2>/dev/null
  cp $C/cf/*.py dev/figwork/maidCB/ 2>/dev/null
  for f in $C/sheets/C_m*.jpg; do case $(basename $f) in C_m2[7-9]_*|C_m[34][0-9]_*|C_m5[0-2]_*) cp $f dev/figwork/sheets/;; esac; done
  [ -n "$P" ] && python3 $C/addprog.py dev/figwork/PROGRESS_C.md "$P"
  [ -n "$STATUS" ] && python3 $C/status.py dev/figwork/PROGRESS_C.md "$STATUS"
  python3 $C/merge.py $W || exit 1
  python3 -m json.tool img/FIGURES-servants.json >/dev/null || { echo BADJSON; exit 1; }
  git add img dev/figwork && git commit -q -m "$m

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Rc5AsLPQEe167UjGtvecD3"
  git push -q origin HEAD:refs/heads/review/maid-art-c 2>&1 | grep -v '^remote'
  git fetch -q origin; [ "$(git rev-parse HEAD)" = "$(git rev-parse origin/review/maid-art-c)" ] && { git log --oneline -1; exit 0; }
  echo "retry $try"; sleep $((5+RANDOM%10))
done; echo PUSHFAIL; exit 1

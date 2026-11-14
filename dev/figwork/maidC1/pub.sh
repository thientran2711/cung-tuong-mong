# pub.sh "msg" : sync worktree to origin/review/maid-art-c (or origin/main), add my files, merge my records into FIGURES-servants.json, push
S=/tmp/claude-0/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/scratchpad; T=$S/tc; W=$S/wt-c; m="$1"
cd $W || exit 1
for try in 1 2 3 4 5; do
  git fetch -q origin
  if git rev-parse -q --verify origin/review/maid-art-c >/dev/null; then base=origin/review/maid-art-c; else base=origin/main; fi
  git reset -q --hard $base
  cp $T/out/img/*.webp img/
  mkdir -p dev/figwork/maidC1 dev/figwork/sheets
  cp $T/*.py $T/*.sh $T/gens.txt $T/bg.txt dev/figwork/maidC1/; cp $T/sheets/*.jpg dev/figwork/sheets/ 2>/dev/null; cp $T/PROGRESS_C1.md $T/HUADIAN_C.md dev/figwork/
  python3 - <<'PY' || exit 1
import json
F="img/FIGURES-servants.json"; S=json.load(open(F)); mine=json.load(open("/tmp/claude-0/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/scratchpad/tc/out/recs.json"))
mf={r["file"] for r in mine}
S=[r for r in S if r["file"] not in mf]+mine
S.sort(key=lambda r:r["file"]); json.dump(S,open(F,"w"),indent=1,ensure_ascii=False); print(len(S),"records in servants")
PY
  git add img dev/figwork
  git commit -q -m "$m

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Rc5AsLPQEe167UjGtvecD3" || { echo nothing; exit 0; }
  if git push -q origin HEAD:review/maid-art-c 2>&1 | grep -v '^remote'; then :; fi
  git fetch -q origin; [ "$(git rev-parse HEAD)" = "$(git rev-parse origin/review/maid-art-c)" ] && { git log --oneline -1; exit 0; }
  echo "push race, retry $try"; sleep 5
done

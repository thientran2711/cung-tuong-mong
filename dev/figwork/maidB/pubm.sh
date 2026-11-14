# pubm.sh "msg" [sheet.jpg...] : (part B) commit img/ + dev/figwork/maidB (+sheets) in wt-maidB, fast-forward push to review/maid-art-b
S=/tmp/claude-0/-home-user-cung-tuong-mong/ed00be27-1e8d-5500-9afe-ce233b508a61/scratchpad; W=$S/wt-maidB; m="$1"; shift
mkdir -p $W/dev/figwork/maidB; cp $S/maidB/*.py $S/maidB/*.sh $S/maidB/gens.txt $S/maidB/bg.txt $W/dev/figwork/maidB/
for f in "$@"; do cp "$f" $W/dev/figwork/sheets/; done
cd $W && for j in img/FIGURES-servants.json img/FIGURES.json; do python3 -m json.tool $j >/dev/null || { echo BADJSON $j; exit 1; }; done
git add img dev/figwork && git commit -q -m "$m

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Rc5AsLPQEe167UjGtvecD3" && git fetch -q origin review/maid-art-b && git rebase -q origin/review/maid-art-b && git push -q origin HEAD:review/maid-art-b 2>&1 | grep -v '^remote' ; git log --oneline -1

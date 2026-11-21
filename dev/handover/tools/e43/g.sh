# usage: g.sh <worktree> <tag> ; own tests from $O/own-<tag>.sh
WT=$1; T=$2; O=/home/user/wt/e43-out/$T; mkdir -p $O; cd $WT
r(){ n=$1; shift; echo "### $n START $(date -u +%H:%M:%S)"; "$@" > $O/$n.log 2>&1; c=$?; echo "### $n EXIT $c · $(tail -1 $O/$n.log | cut -c1-250)"; }
U=file://$WT/dev/index.html
r quickcheck bash dev/tools/quickcheck.sh
r coop-e2e env COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc node dev/test/coop-e2e.js $O/ce
source /home/user/wt/e43-out/own-$T.sh
cp dev/tools/role-parity-table.md $O/rp0.md
r rp1 node dev/tools/role-parity-scan.js
r rp2 node dev/tools/role-parity-scan.js
md5sum $O/rp0.md dev/tools/role-parity-table.md $O/rp1.log $O/rp2.log
git status --short | head
echo ALLDONE

# mk78.sh : re-paste pilots P67(t7 only)/P8 after the colour transfer, then build t7/t8 grids S7_n / S8_n (4 maids x 4 ages each)
cd /tmp/claude-0/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/scratchpad/agC
MODE=fh8 python3 ag.py paste P67 m08-t6-a18 m08-t6-a26 m08-t6-a36 m08-t6-a51 m33-t6-a18 m33-t6-a26 m33-t6-a36 m33-t6-a51 | grep -vc skip
MODE=fh8 python3 ag.py paste P8 | wc -l
export AGES="a18 a26 a36 a51" MINROWS=2
for T in 7 8; do
  L=""; for m in $(seq -w 1 52); do [ $m = 08 ] || [ $m = 33 ] || L="$L m$m-t$T"; done
  set -- $L; n=1
  while [ $# -gt 0 ]; do k=4; [ $# -lt 4 ] && k=$#; python3 ag.py make S${T}_$n ${@:1:$k} >/dev/null; shift $k; n=$((n+1)); done
done
ls g/S7_*.png g/S8_*.png | wc -l

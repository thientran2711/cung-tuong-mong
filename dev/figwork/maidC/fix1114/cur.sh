# cur.sh JID... : current processed gen (last in bgA/bgB/bg)
D=/tmp/claude-0/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/scratchpad/cw
for j in "$@"; do cat $D/bgA.txt $D/bgB.txt $D/bg.txt | awk -v j=$j '$1==j{g=$2}END{print j, g}'; done

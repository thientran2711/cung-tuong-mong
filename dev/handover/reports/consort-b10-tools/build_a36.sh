# usage: build.sh cNN  (new/ holds new v1/v2 (+v0 if redone); old/ holds previous)
c=$1; S=/tmp/claude-0/-home-user-cung-tuong-mong/87a9ff2c-82eb-56ce-a14c-131b7f579a6f/scratchpad
D=$S/root/img/_review/consort-tiers/$c/b10-a36; mkdir -p $D $S/$c/final
for v in 0 1 2; do for k in 1 2 3 4 5 6 7 8; do
 f=$S/$c/new/v${v}_t$k.png; [ -f $f ] || f=$S/$c/old/v${v}_t$k.png
 cp $f $S/$c/final/v${v}_t$k.png; cp $f $D/${c}_a36_t${k}_v$v.png
 if [ "$2" = prev ] && [ -f $S/$c/new/v${v}_t$k.png ] && [ $v != 0 ]; then cp $S/$c/old/v${v}_t$k.png $D/${c}_a36_t${k}_v${v}_prev_row.png; fi
done; done
python3 /home/user/cung-tuong-mong/dev/handover/reports/consort-b10-tools/sheet2.py $S/$c/final $D/${c}_a36_b10_sheet.jpg $c

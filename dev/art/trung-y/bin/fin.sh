#!/bin/bash
# fin.sh TAG ROLE-ID... : for complete faces: alpha-holes --fix (in place), cutcheck + solid report, review sheet dev/art/trung-y/sheet-TAG.jpg
R=/home/user/wt/trung-y; T=$R/.tywork; cd $R; tag=$1; shift
ids=$(python3 dev/art/trung-y/ty.py complete "$@"); [ -z "$ids" ] && { echo "none complete"; exit 1; }
files=""; for x in $ids; do files="$files $(ls $T/out/fig-$x-ty*.webp $T/out/por-$x-ty*.webp)"; done
grep -qx "$tag" $T/fixed.txt 2>/dev/null || { rm -rf $T/fix; python3 $T/alpha-holes.py --fix $T/fix $files | tail -1; [ -d $T/fix ] && mv $T/fix/*.webp $T/out/; echo "$tag" >> $T/fixed.txt; }
python3 dev/figwork/cutcheck.py $files 2>/dev/null | awk '$1>=30' | head -12
python3 -I $T/bin/solid.py $(echo $files | tr ' ' '\n' | grep /fig-) | tail -4
TYW=$T python3 dev/art/trung-y/ty.py sheet dev/art/trung-y/sheet-$tag.jpg $ids | tail -1
python3 -I $T/bin/porsheet.py dev/art/trung-y/por-$tag.jpg $T/out $ids; echo "COMPLETE: $ids"

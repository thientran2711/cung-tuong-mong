# post.sh JID... : after cproc: cutcheck -> fixalpha flagged (score>=1) -> porcrop (384x506 face-centred) -> sheets
cd "$(dirname "$0")"; F=""; for j in "$@"; do w=${j#C-}; m=${w%%-*}; t=${w#*-}; F="$F $(ls out/img/fig-maid-$m-$t-a*.webp)"; done
python3 cutcheck.py $F | awk '$1>=1.0{print $NF}' > flagged.txt; cat flagged.txt
[ -s flagged.txt ] && python3 fixalpha.py $(cat flagged.txt)
python3 porcrop.py $F | grep -vi "^eyes" ; python3 sheet.py "$@"

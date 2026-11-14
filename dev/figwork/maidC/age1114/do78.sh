# do78.sh : download S7_/S8_ edits, check size, paste forehead (fh8), forehead check sheets c/f7_*.jpg c/f8_*.jpg
cd /tmp/claude-0/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/scratchpad/agC
args=""; for n in $(awk '$1 ~ /^S[78]_/{print $1}' up78.txt); do args="$args e/$n.png=$(awk -v n=$n '$1==n{x=$3}END{print x}' log.txt)"; done
python3 tx.py dl $args | grep -v "^ok"
for n in $(awk '$1 ~ /^S[78]_/{print $1}' up78.txt); do
  python3 -c "from PIL import Image;import sys;a=Image.open('e/$n.png').size;b=Image.open('g/$n.png').size;print('$n',a,b) if a[0]*b[1]!=a[1]*b[0] else None"
  MODE=fh8 python3 ag.py paste $n | awk '{if($3+0>3||$3+0<-3||$4+0>3||$4+0<-3||$5+0<0.5)print "WARN",$0}'
done
export Z=0.9 TOP=0.35 COLS=8
L=""; for m in $(seq -w 1 26); do L="$L m$m-t7"; done; python3 fh.py c/f7_a.jpg a18,a26,a36,a51 $L >/dev/null
L=""; for m in $(seq -w 27 52); do L="$L m$m-t7"; done; python3 fh.py c/f7_b.jpg a18,a26,a36,a51 $L >/dev/null
L=""; for m in $(seq -w 1 26); do L="$L m$m-t8"; done; python3 fh.py c/f8_a.jpg a18,a26,a36,a51 $L >/dev/null
L=""; for m in $(seq -w 27 52); do L="$L m$m-t8"; done; python3 fh.py c/f8_b.jpg a18,a26,a36,a51 $L >/dev/null
echo done

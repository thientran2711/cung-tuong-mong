k=$1; B=https://ctm-img.victoria-tntt.workers.dev/img
for p in fig-$k hd/fig-$k tn/fig-$k por-$k; do
  mkdir -p keep/$(dirname $p); c=$(curl -s -o keep/$p.webp -w "%{http_code}" $B/$p.webp)
  [ "$c" = 200 ] && echo "$p ok" || { rm -f keep/$p.webp; echo "$p $c"; }
done

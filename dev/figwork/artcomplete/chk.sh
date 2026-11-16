#!/bin/bash
# chk.sh OUTPREFIX GLOBSTEM...  e.g. chk.sh .cache/look/c2 eunuch-u02 eunuch-u03 : cutcheck top lines, demole dry run, review sheet (figs + por per stem)
# run from worktree root
P=$1; shift; F=(); R=()
for s in "$@"; do F+=(img/fig-$s-*.webp img/por-$s-*.webp); R+=("$(ls img/por-$s-*.webp | tr '\n' ',' | sed 's/,$//')" "$(ls img/fig-$s-*.webp | tr '\n' ',' | sed 's/,$//')"); done
echo "== cutcheck (fig>=8 / por>=20 = re-cut)"; PYTHONPATH=dev/figwork/artcomplete/.cache/pylib python3 dev/figwork/cutcheck.py "${F[@]}" 2>&1 | sort -rn | head -3
echo "== demole"; python3 -I dev/figwork/artcomplete/demole_por.py -n --sheet $P-mole.jpg "${F[@]}" 2>&1 | tail -5
H=200 python3 dev/figwork/artcomplete/rvsheet.py $P.jpg "${R[@]}" 2>&1 | tail -1

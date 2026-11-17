#!/bin/bash
# build the game into dev/tmp/$1 for bots (does not touch the root index.html other bots read). usage: bash dev/measure/pass/mkgame.sh fix.html
R=$(cd "$(dirname "$0")/../../.." && pwd); D=$R/dev; mkdir -p $D/tmp
python3 $D/build/assemble.py >/dev/null
IMG_BASE=$(sed -n 's/^const IMG_BASE="\([^"]*\)";.*/\1/p' $D/build/jcdn.js)
{ printf '<!doctype html>\n<html lang="vi">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%%}[hidden]{display:none!important}</style>\n<script>\n'; sed "s|__IMG__|$IMG_BASE|" $D/site/kboot.js; cat $D/site/rot.js; printf '</script>\n</head>\n<body>\n'; cat $D/index.html; printf '\n</body>\n</html>\n'; } > $D/tmp/$1
git -C $R checkout -q dev/index.html 2>/dev/null; echo built $D/tmp/$1

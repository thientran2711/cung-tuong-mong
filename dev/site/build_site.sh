#!/bin/bash
# Build the PWA site at the repo root from dev/build (no scratchpad). usage: bash dev/site/build_site.sh  (does not commit)
set -e
R=$(cd "$(dirname "$0")/../.." && pwd); D=$R/dev
python3 $D/build/assemble.py
# B = this build of the game (dev/index.html + swreg.js): window.CTM_BUILD, compared by the two players of a co-op room (KIT §35.2)
B=$(cat $D/index.html $D/site/swreg.js | sha256sum | cut -c1-12)
# index.html = PWA head + the assembled game + dev/site/swreg.js (new-build check on open / return to foreground, chip + card "Có bản mới", reopen at a natural break)
{ printf '<!doctype html>\n<html lang="vi">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<meta name="theme-color" content="#8a2a1e">\n<link rel="manifest" href="manifest.webmanifest">\n<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%%}[hidden]{display:none!important}</style>\n</head>\n<body>\n'; cat $D/index.html; printf '\n<script>\n'; sed "s|__B__|$B|" $D/site/swreg.js; printf '</script>\n</body>\n</html>\n'; } > $R/index.html
python3 $D/site/assets.py
# app shell = small versioned cache (index.html, manifest, assets.json, JSON data, icons); its version is the content hash of those files,
# so a build that changes nothing makes the same sw.js (no update), and images/sounds live in the long-lived content-keyed cache (sw.tpl.js)
SHELLF=$(cd $R && ls manifest.webmanifest assets.json img/*.json audio/*.json 2>/dev/null)
V=$(cd $R && cat index.html $SHELLF | sha256sum | cut -c1-12)
PRE=$(printf '%s\n' index.html $SHELLF | sed 's/.*/"&"/' | paste -sd, | sed 's/^/[/;s/$/]/')
sed -e "s|__V__|$V|g" -e "s|__PRE__|$PRE|" $D/site/sw.tpl.js > $R/sw.js
grep -q "__V__\|__PRE__" $R/sw.js && { echo "sw.js: placeholder left" >&2; exit 1; }
node --check $R/sw.js
echo "published to $R (not committed) · shell $V"

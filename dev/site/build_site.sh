#!/bin/bash
# Build the PWA site at the repo root from dev/build (no scratchpad). usage: bash dev/site/build_site.sh  (does not commit)
set -e
R=$(cd "$(dirname "$0")/../.." && pwd); D=$R/dev
python3 $D/build/assemble.py
{ printf '<!doctype html>\n<html lang="vi">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<meta name="theme-color" content="#8a2a1e">\n<link rel="manifest" href="manifest.webmanifest">\n<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%%}[hidden]{display:none!important}</style>\n</head>\n<body>\n'; cat $D/index.html; printf '\n<script>if("serviceWorker" in navigator){let had=!!navigator.serviceWorker.controller;navigator.serviceWorker.addEventListener("controllerchange",()=>{if(had)location.reload();had=true});addEventListener("load",()=>navigator.serviceWorker.register("sw.js").then(r=>r.update()).catch(()=>{}))}</script>\n</body>\n</html>\n'; } > $R/index.html
python3 $D/site/assets.py
# app shell = small versioned cache (index.html, manifest, assets.json, JSON data, icons); its version is the content hash of those files,
# so a build that changes nothing makes the same sw.js (no update), and images/sounds live in the long-lived content-keyed cache (sw.tpl.js)
SHELLF=$(cd $R && ls manifest.webmanifest assets.json img/*.json audio/*.json 2>/dev/null)
V=$(cd $R && cat index.html $SHELLF | sha256sum | cut -c1-12)
PRE=$(printf '%s\n' index.html $SHELLF | sed 's/.*/"&"/' | paste -sd, | sed 's/^/[/;s/$/]/')
sed -e "s|__V__|$V|" -e "s|__PRE__|$PRE|" $D/site/sw.tpl.js > $R/sw.js
node --check $R/sw.js
echo "published to $R (not committed) · shell $V"

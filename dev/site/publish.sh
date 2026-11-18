#!/bin/bash
# Sync the scratchpad build into dev/, assemble, and build the PWA site at the repo root.
# usage: dev/site/publish.sh [scratchpad-dir]   (does not commit)
set -e
S=${1:-/tmp/claude-0/-home-user-phuong-lenh/1e222f2f-177f-54ad-8b97-a62a9b124c31/scratchpad}
R=$(cd "$(dirname "$0")/../.." && pwd); D=$R/dev
cp $S/build/j*.js $S/build/p1.html $S/build/icon.webp $D/build/
cp $S/cung-dau/avatars.js $D/build/avatars.js
python3 - "$S/build/assemble.py" "$D/build/assemble.py" <<'P'
import sys,re
src=open(sys.argv[1]).read();dst=open(sys.argv[2]).read()
import ast
L=ast.literal_eval(re.search(r"for f in (\[[^\]]*\])",src).group(1));old=ast.literal_eval(re.search(r"for f in (\[[^\]]*\])",dst).group(1))
L=L+[x for x in old if x not in L]  # keep modules that live only in dev/ (j50+), in their order, at the end
dst=re.sub(r"for f in \[[^\]]*\]","for f in "+repr(L),dst,count=1);open(sys.argv[2],'w').write(dst)
P
python3 $D/build/assemble.py
mkdir -p $R/img $R/audio $R/icons
find $S/cung-dau/img -maxdepth 1 -type f \( -name '*.webp' -o -name '*.json' \) ! -name '_*' -exec cp {} $R/img/ \;
cp $S/cung-dau/audio/*.mp3 $S/cung-dau/audio/*.json $R/audio/ 2>/dev/null || true
V=$(date +%s)
FILES=$(cd $R && ls img/*.webp audio/*.mp3 icons/*.png | grep -v -E "img/(fig-|por-|map-fest-|_)" | sed 's/.*/"&"/' | paste -sd,)
cat > $R/sw.js <<W
/* Offline cache for Cung Tường Mộng; version bumps on every build. */
const C='ctm-$V';
const PRE=['./','index.html','manifest.webmanifest',$FILES];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(PRE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(/\.json$/.test(u.pathname)){e.respondWith(fetch(e.request).catch(()=>caches.match(e.request,{ignoreSearch:true})));return}if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put('index.html',cp));return res}).catch(()=>caches.match('index.html')));return}e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();if(res.ok&&u.origin===location.origin)caches.open(C).then(c=>c.put(e.request,cp));return res}).catch(()=>caches.match('index.html'))))});
W
{ printf '<!doctype html>\n<html lang="vi">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<meta name="theme-color" content="#8a2a1e">\n<link rel="manifest" href="manifest.webmanifest">\n<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%%}[hidden]{display:none!important}</style>\n</head>\n<body>\n'; cat $D/index.html; printf '\n<script>if("serviceWorker" in navigator){let had=!!navigator.serviceWorker.controller;navigator.serviceWorker.addEventListener("controllerchange",()=>{if(had)location.reload();had=true});addEventListener("load",()=>navigator.serviceWorker.register("sw.js").then(r=>r.update()).catch(()=>{}))}</script>\n</body>\n</html>\n'; } > $R/index.html
echo "published to $R (not committed)"

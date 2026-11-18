#!/bin/bash
# Build the standalone PWA site for Cung Tường Mộng into the GitHub repo.
set -e
S=/tmp/claude-0/-home-user-phuong-lenh/1e222f2f-177f-54ad-8b97-a62a9b124c31/scratchpad; R=/home/user/cung-tuong-mong
mkdir -p $R/icons $R/img $R/audio
cp $S/cung-dau/img/*.webp $R/img/; rm -f $R/img/_*.webp; cp $S/cung-dau/audio/*.mp3 $R/audio/
convert $S/icon/icon-a-512.png -resize 512x512 $R/icons/icon-512.png
convert $S/icon/icon-a-512.png -resize 192x192 $R/icons/icon-192.png
convert $S/icon/icon-a-512.png -resize 180x180 $R/icons/apple-touch-icon.png
touch $R/.nojekyll
cat > $R/manifest.webmanifest <<'M'
{"name":"Cung Tường Mộng","short_name":"Cung Tường Mộng","start_url":"./","scope":"./","display":"standalone","orientation":"any","background_color":"#f6efe2","theme_color":"#8a2a1e","lang":"vi","icons":[{"src":"icons/icon-192.png","sizes":"192x192","type":"image/png","purpose":"any"},{"src":"icons/icon-512.png","sizes":"512x512","type":"image/png","purpose":"any maskable"}]}
M
V=$(date +%s)
FILES=$(cd $R && ls img/*.webp audio/*.mp3 icons/*.png | grep -v -E "img/(fig-|por-|map-fest-|_)" | sed 's/.*/"&"/' | paste -sd,)
cat > $R/sw.js <<W
/* Offline cache for Cung Tường Mộng; version bumps on every build. */
const C='ctm-$V';
const PRE=['./','index.html','manifest.webmanifest',$FILES];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(PRE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put('index.html',cp));return res}).catch(()=>caches.match('index.html')));return}e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();if(res.ok&&new URL(e.request.url).origin===location.origin)caches.open(C).then(c=>c.put(e.request,cp));return res}).catch(()=>caches.match('index.html'))))});
W
{ printf '<!doctype html>\n<html lang="vi">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<meta name="theme-color" content="#8a2a1e">\n<link rel="manifest" href="manifest.webmanifest">\n<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%%}[hidden]{display:none!important}</style>\n</head>\n<body>\n'; cat $S/cung-dau/index.html; printf '\n<script>if("serviceWorker" in navigator){let had=!!navigator.serviceWorker.controller;navigator.serviceWorker.addEventListener("controllerchange",()=>{if(had)location.reload();had=true});addEventListener("load",()=>navigator.serviceWorker.register("sw.js").then(r=>r.update()).catch(()=>{}))}</script>\n</body>\n</html>\n'; } > $R/index.html
printf '# Cung Tường Mộng\n\nGame cung đấu (một trang, chơi trên điện thoại). Mở: https://thientran2711.github.io/cung-tuong-mong/ rồi bấm Install.\n' > $R/README.md
echo built

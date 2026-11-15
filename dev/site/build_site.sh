#!/bin/bash
# Build the PWA site at the repo root from dev/build (no scratchpad). usage: bash dev/site/build_site.sh  (does not commit)
set -e
R=$(cd "$(dirname "$0")/../.." && pwd); D=$R/dev
python3 $D/build/assemble.py
V=$(date +%s)
# pictures live on Cloudflare (dev/art/CDN.md): IMG_BASE from dev/build/jcdn.js (CTM_IMG_BASE overrides; empty = local img/ as before).
# Precache list = the same pictures as before (img/*.webp + img/item512/*.webp, not fig-/por-/map-fest-/_), read from the CDN's img/_index.json.
IMG_BASE=${CTM_IMG_BASE-$(sed -n 's/^const IMG_BASE="\([^"]*\)";.*/\1/p' $D/build/jcdn.js)}
if [ -n "$IMG_BASE" ]; then
 IMGF=$(curl -sSf --retry 4 "${IMG_BASE}img/_index.json" | python3 -c 'import json,re,sys;b=sys.argv[1];[print(b+k) for k,h,n in json.load(sys.stdin)["files"] if re.fullmatch(r"img/(item512/)?[^/]+\.webp",k) and not re.match(r"img/(item512/)?(fig-|por-|map-fest-|_)",k)]' "$IMG_BASE")
 [ -n "$IMGF" ] || { echo "CDN index empty: ${IMG_BASE}img/_index.json"; exit 1; }
else IMGF=$(cd $R && ls img/*.webp img/item512/*.webp 2>/dev/null | grep -v -E "img/(item512/)?(fig-|por-|map-fest-|_)"); fi
FILES=$( { echo "$IMGF"; cd $R && ls audio/*.mp3 icons/*.png 2>/dev/null; } | grep . | sed 's/.*/"&"/' | paste -sd,)
cat > $R/sw.js <<W
/* Offline cache for Cung Tường Mộng; version bumps on every build. */
const C='ctm-$V';
/* pictures come from the Cloudflare Worker IMG (dev/art/CDN.md): cached here like same-origin files, fetched in CORS mode (no opaque
   responses), manifests (*.json) network-first with the cached copy as offline fallback */
const IMG='$IMG_BASE';
const PRE=['./','index.html','manifest.webmanifest',$FILES];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(PRE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);const cdn=!!IMG&&e.request.url.startsWith(IMG);const key=cdn?u.origin+u.pathname:e.request;if(/\.json\$/.test(u.pathname)){e.respondWith(fetch(cdn?new Request(u.href,{mode:'cors',credentials:'omit',cache:'no-cache'}):e.request).then(res=>{if(cdn&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(key,cp))}return res}).catch(()=>caches.match(key,{ignoreSearch:true})));return}if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put('index.html',cp));return res}).catch(()=>caches.match('index.html')));return}e.respondWith(caches.match(key,{ignoreSearch:true}).then(r=>r||fetch(cdn?new Request(u.href,{mode:'cors',credentials:'omit'}):e.request).then(res=>{const cp=res.clone();if(res.ok&&(cdn||u.origin===location.origin))caches.open(C).then(c=>c.put(key,cp));return res}).catch(()=>cdn?Response.error():caches.match('index.html'))))});
W
{ printf '<!doctype html>\n<html lang="vi">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<meta name="theme-color" content="#8a2a1e">\n<link rel="manifest" href="manifest.webmanifest">\n<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%%}[hidden]{display:none!important}</style>\n</head>\n<body>\n'; cat $D/index.html; printf '\n<script>if("serviceWorker" in navigator){let had=!!navigator.serviceWorker.controller;navigator.serviceWorker.addEventListener("controllerchange",()=>{if(had)location.reload();had=true});addEventListener("load",()=>navigator.serviceWorker.register("sw.js").then(r=>r.update()).catch(()=>{}))}</script>\n</body>\n</html>\n'; } > $R/index.html
echo "published to $R (not committed)"

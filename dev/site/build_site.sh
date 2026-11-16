#!/bin/bash
# Build the PWA site at the repo root from dev/build (no scratchpad). usage: bash dev/site/build_site.sh  (does not commit)
set -e
R=$(cd "$(dirname "$0")/../.." && pwd); D=$R/dev
# KIT §0 build check: no width/height/orientation breakpoint inside the design canvas (html.kv1 / html.kv2 only)
node $D/measure/media-check.js
python3 $D/build/assemble.py
# picture CDN base (dev/build/jcdn.js; CTM_IMG_BASE overrides, empty = local img/): the boot cover (kboot.js) and sw.js use it
IMG_BASE=${CTM_IMG_BASE-$(sed -n 's/^const IMG_BASE="\([^"]*\)";.*/\1/p' $D/build/jcdn.js)}
# B = this build of the game (dev/index.html + swreg.js): window.CTM_BUILD, compared by the two players of a co-op room (KIT §35.2)
B=$(cat $D/index.html $D/site/swreg.js | sha256sum | cut -c1-12)
# index.html = PWA head + dev/site/kboot.js (boot cover from the first paint, KIT §14.1) + dev/site/rot.js (design canvas host, KIT § 0 SUPPORTED SCREENS) + the assembled game + dev/site/swreg.js (new-build check on open / return to foreground, chip + card "Có bản mới", reopen at a natural break)
{ printf '<!doctype html>\n<html lang="vi">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<meta name="theme-color" content="#8a2a1e">\n<link rel="manifest" href="manifest.webmanifest">\n<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%%}[hidden]{display:none!important}</style>\n<script>\nwindow.CTM_BI=null;\n'; sed "s|__IMG__|$IMG_BASE|" $D/site/kboot.js; cat $D/site/rot.js; printf '</script>\n</head>\n<body>\n'; cat $D/index.html; printf '\n<script>\n'; sed "s|__B__|$B|" $D/site/swreg.js; printf '</script>\n</body>\n</html>\n'; } > $R/index.html
python3 $D/site/assets.py
# app shell = small versioned cache (index.html, manifest, assets.json, JSON data, icons); its version is the content hash of those files,
# so a build that changes nothing makes the same sw.js (no update), and images/sounds live in the long-lived content-keyed cache (sw.tpl.js)
# pictures + their manifests (img/*.json) live on Cloudflare (dev/art/CDN.md): IMG_BASE from dev/build/jcdn.js (CTM_IMG_BASE overrides,
# empty = local img/ as before). The CDN manifests are precached by URL but not hashed into V (they change without a build).
IMG_BASE=${CTM_IMG_BASE-$(sed -n 's/^const IMG_BASE="\([^"]*\)";.*/\1/p' $D/build/jcdn.js)}
if [ -n "$IMG_BASE" ]; then SHELLF=$(cd $R && ls manifest.webmanifest assets.json audio/*.json 2>/dev/null || true)
 IMGJ=$(curl -sSf --retry 4 -H 'Cache-Control: no-cache' "${IMG_BASE}img/_index.json" | python3 -c 'import json,re,sys;[print(sys.argv[1]+k) for k,h,n in json.load(sys.stdin)["files"] if re.fullmatch(r"img/[^/_][^/]*\.json",k)]' "$IMG_BASE")
else SHELLF=$(cd $R && ls manifest.webmanifest assets.json img/*.json audio/*.json 2>/dev/null || true); IMGJ=""; fi
V=$(cd $R && cat index.html $SHELLF | sha256sum | cut -c1-12)
PRE=$(printf '%s\n' index.html $SHELLF $IMGJ | sed 's/.*/"&"/' | paste -sd, | sed 's/^/[/;s/$/]/')
sed -e "s|__V__|$V|g" -e "s|__PRE__|$PRE|" -e "s|__IMG__|$IMG_BASE|" $D/site/sw.tpl.js > $R/sw.js
grep -q "__V__\|__PRE__\|__IMG__" $R/sw.js && { echo "sw.js: placeholder left" >&2; exit 1; }
node --check $R/sw.js
# build line for the game menu (go-live kit, owner OD:L1370 (d)): source commit + time + ONE "what changed" line + the last 10 live builds.
# Written AFTER V so a rebuild that only changes this line never makes players fetch a new build. Line: env CTM_CHANGE or dev/site/CHANGE.txt.
python3 $D/site/buildinfo.py "$R" "$B" || echo "buildinfo: skipped (build line stays empty)" >&2
echo "published to $R (not committed) · shell $V"

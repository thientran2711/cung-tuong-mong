#!/bin/bash
# Overlays for dev/test/sw-serve.js (one site, several builds). usage: bash dev/test/sw-overlays.sh <outdir>   (after dev/site/build_site.sh)
#   A    = this build (index.html + sw.js at the repo root)
#   B    = the same build "deployed again with changes": window.__CTM_MARK="B", its own CTM_BUILD and sw.js version
#   main = index.html + sw.js of origin/main (the build on the owner's phone)
# then: node dev/test/sw-serve.js 8790 . A=<outdir>/A B=<outdir>/B main=<outdir>/main
set -e
R=$(cd "$(dirname "$0")/../.." && pwd); O=$1; [ -n "$O" ] || { echo "usage: $0 <outdir>" >&2; exit 1; }
mkdir -p $O/A $O/B $O/main
cp $R/index.html $R/sw.js $O/A/
sed -e 's|</head>|<script>window.__CTM_MARK="B"</script>\n</head>|' -e 's|const BUILD="|const BUILD="b|' $R/index.html > $O/B/index.html
V=$(sed -n "s/^const V='\([^']*\)'.*/\1/p" $R/sw.js); sed "s/$V/${V}b/g" $R/sw.js > $O/B/sw.js
git -C $R show origin/main:index.html > $O/main/index.html; git -C $R show origin/main:sw.js > $O/main/sw.js
grep -q '__CTM_MARK="B"' $O/B/index.html && grep -q "${V}b" $O/B/sw.js && echo "overlays in $O · A $V · B ${V}b"

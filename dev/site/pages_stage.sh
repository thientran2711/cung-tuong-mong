#!/bin/bash
# Stage ONLY the player files into $1 (default _site). Used by .github/workflows/pages.yml and by local proof (owner 23/11: the repo goes private,
# the Pages site must serve nothing but the game). Allowlist proven by dev/handover/reports/PAGES-LOCK.md. Never add dev/, docs/, *.md, tests, workers.
set -e
R=$(cd "$(dirname "$0")/../.." && pwd); S=${1:-_site}
rm -rf "$S"; mkdir -p "$S/audio" "$S/icons" "$S/dev/vendor"
cd "$R"
cp index.html sw.js assets.json manifest.webmanifest .nojekyll "$S/"
cp dev/site/robots.txt "$S/robots.txt"
cp audio/*.mp3 audio/MANIFEST.json audio/VOICES.json "$S/audio/"
cp icons/*.png "$S/icons/"
cp dev/vendor/pixi-8.5.2.min.js "$S/dev/vendor/"
# guard: nothing but the allowlist may be in the artifact
bad=$(cd "$S" && find . -type f | grep -vE '^\./(index\.html|sw\.js|assets\.json|manifest\.webmanifest|\.nojekyll|robots\.txt|audio/[^/]+\.(mp3|json)|icons/[^/]+\.png|dev/vendor/pixi-8\.5\.2\.min\.js)$' || true)
[ -z "$bad" ] || { echo "pages_stage: unexpected files: $bad" >&2; exit 1; }
find "$S" -type f | wc -l

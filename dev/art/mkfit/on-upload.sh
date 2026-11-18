#!/bin/bash
# Run after Foreman C (or anyone) uploads new/changed por-/fig- pictures of the 32 consort faces / player looks (owner 17/11: anchors must sit on the painted face, automatically).
# From the repo root, with data pulled first (img/mk-fit -> dev/art/mkfit/*.json, img/toil-fit2.json -> dev/art/toil-fit2.json):
#  1. mkfit.py --missing     face-mesh points for every picture of a woman that has none          2. verify.py --fix     independent whole-picture mesh (THR .10) replaces displaced sets
#  3. fixtoil.py             re-seats the toil-fit mouths on the corrected lips                     4. anchor-table.py     must print "bad 0"   then: cdn_sync.py img/mk-fit img/toil-fit2.json
# needs: pip install mediapipe (+ libegl1 libgles2), the model face_landmarker.task (MediaPipe model storage, float16/1)
# usage: bash dev/art/mkfit/on-upload.sh [model.task]
set -e; D=$(cd "$(dirname "$0")" && pwd); R=$(cd "$D/../../.." && pwd); M=${1:-${MK_MODEL:-$R/.mk/face_landmarker.task}}
[ -f "$M" ] || { echo "model not found: $M (pass it as the first argument)"; exit 1; }
python3 -I "$D/mkfit.py" --missing --model "$M"
python3 -I "$D/verify.py" --fit-dir "$D" --out /tmp/mkverify --fix --model "$M"
python3 -I "$D/fixtoil.py" --fit "$R/dev/art/toil-fit2.json" --mk "$D" --out "$R/dev/art/toil-fit2.json"
python3 "$R/dev/test/anchor-table.py"
echo "now: mkdir -p img/mk-fit && cp dev/art/mkfit/{consort,player}-*.json img/mk-fit/ && cp dev/art/toil-fit2.json img/toil-fit2.json && python3 dev/site/cdn_sync.py img/mk-fit img/toil-fit2.json"

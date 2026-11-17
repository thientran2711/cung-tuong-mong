#!/bin/bash
# Run after Foreman C (or anyone) uploads new/changed por-/fig- pictures of the 32 consort faces / player looks (owner 17/11: points must sit on the painted face, automatically):
#  1. mkfit.py --missing / --stale  -> face-mesh points for new or changed pictures  2. verify.py --fix -> independent whole-picture mesh, replaces displaced sets
#  3. fixtoil.py -> re-seats toil-fit mouths  4. dev/test/anchor-table.py -> must print "bad 0"  (needs: pip install mediapipe, libegl1 libgles2, face_landmarker.task)
# usage: bash dev/art/mkfit/on-upload.sh <mk-fit dir (copy of img/mk-fit)> <toil-fit2.json> <model.task>
set -e; D=$(cd "$(dirname "$0")" && pwd); MK=${1:?mk-fit dir}; TF=${2:?toil-fit2.json}; M=${3:-/home/user/wt/face_landmarker.task}
python3 -I $D/verify.py --fit-dir "$MK" --out /tmp/mkverify --fix --model "$M"
python3 -I $D/fixtoil.py --fit "$TF" --mk "$MK" --out "$TF"
echo "now copy $MK -> dev/art/mkfit, $TF -> dev/art/toil-fit2.json, run python3 dev/test/anchor-table.py, then cdn_sync.py img/mk-fit img/toil-fit2.json"

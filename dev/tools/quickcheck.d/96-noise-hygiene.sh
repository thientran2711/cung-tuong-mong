#!/bin/bash
# quickcheck hook (qc-noise-hygiene 26/11, owner OD 26/11 ~06:50Z (A) PLAYER-NOISE BUDGET + (D) TEXT HYGIENE): Non-zero = the go-live FAILS.
#  0. noise-sampler-pure (BIG #9 FAIL 1): the sampler never changes the life it measures (S / save / Math.random / KN.cb identical)
#  1. text-hygiene --static: no NEW fault in a string builder of dev/build/j*.js (frozen list dev/test/text-hygiene-known.json may only shrink)
#  2. vp-doubled (KK38 scan, review/kit-stage-r2 919f6c1b): the screen wording pass never makes «thiện cảm thiện cảm»
#  3. noise-day: REAL-TAP robot slices (Fold 755x1000 + iPad 1180x820, dev/test/robot-rt.js, the shared harness) with the read-only noise
#     sampler; every channel per game day inside BAL.noise (+ D2's BAL.evc for big / visit cards); then text-hygiene --runtime on every line
#     the robot SAW (doubled words, code glue, brackets, English / ids, %, over-long one-line texts).
#  env QC_NOISE_SLICE (buổi per life, default 24 per device lane; a life that ends early is followed by the next seed), QC_NOISE_LIVES (default fold:sens:11,ipad:sens:21; QC_NOISE_MIN wall-clock cap per lane, default 7 (coregates gives a hook 600 s); QC_NOISE_DAYS full days needed, default 3). ~8.5 min. This hook is a SMOKE: its 2 short seeded lanes see ~3–4 game days and rarely meet a flood day (LIVE: 6 of 177 days over) — the REAL noise gate is the nightly «noise-day» suite (4 lanes × 60 buổi).
KIT=${QC_KIT:-$(cd "$(dirname "$0")/../../.." && pwd)}; WT=${QC_WT:-$KIT}; OUT=${QC_OUT:-/tmp}/noise-hygiene; mkdir -p "$OUT"; rc=0
[ -f "$KIT/dev/test/text-hygiene.js" ] || { echo "noise-hygiene: dev/test/text-hygiene.js missing in kit"; exit 1; }
grep -q 'BAL.noise=' "$WT/dev/build/jbal2.js" || { echo "noise-hygiene: the sha has no BAL.noise (pre qc-noise-hygiene build)"; exit 1; }
node "$KIT/dev/test/text-hygiene.js" --static --build "$WT/dev/build" > "$OUT/static.log" 2>&1 || rc=1; tail -1 "$OUT/static.log"
URL=${QC_URL:-file://$WT/index.html}
( cd "$WT" && node "$KIT/dev/test/vp-doubled.js" "$WT/index.html" ) > "$OUT/vp-doubled.log" 2>&1 || rc=1; tail -1 "$OUT/vp-doubled.log"
node "$KIT/dev/test/noise-sampler-pure.js" "$WT/index.html" > "$OUT/sampler-pure.log" 2>&1 || rc=1; tail -1 "$OUT/sampler-pure.log"
rm -rf "$OUT/lives"; node "$KIT/dev/measure/noise-day.js" run "$URL" "$OUT/lives" lives=${QC_NOISE_LIVES:-fold:sens:11,ipad:sens:21} slice=${QC_NOISE_SLICE:-24} mins=${QC_NOISE_MIN:-7} mindays=${QC_NOISE_DAYS:-3} --build "$WT/dev/build" > "$OUT/noise-day.log" 2>&1; nrc=$?; tail -1 "$OUT/noise-day.log"
# BIG #10 FAIL 2: the noise-day step is ADVISORY by default (a ~4-day smoke meets flood days owned by NEWS-SIEVE-2 / the kit keeper — N1 / N2 / N4);
# QC_NOISE_STRICT=1 makes it blocking (FOR MAIN: set it the day N1 + N2 land). The nightly «noise-day» suite stays the real, blocking budget gate.
if [ $nrc -ne 0 ]; then if [ "${QC_NOISE_STRICT:-0}" = 1 ]; then rc=1; else echo "noise-day ADVISORY (QC_NOISE_STRICT=1 makes it blocking)"; fi; fi
node "$KIT/dev/test/text-hygiene.js" --runtime "$OUT/lives" --build "$WT/dev/build" > "$OUT/runtime.log" 2>&1 || rc=1; tail -1 "$OUT/runtime.log"
exit $rc

START_CTX ≈ 3 % of 1M (own estimate) · ended ≈ 9 % · cost 0 cr
# REVIEW-N14 — review/act-seals-n14 @f1510547 (ACTWIRE, 21 Thái hậu act seals) — PASS · landable sha **77619056** (review/act-seals-n14-r)

PRIORITY #1 CHECK: OD 23/11 ~03:25Z (owner approved all 21 Thái hậu act seals, THACT5 final -D112) + L2386/L2387 | main LIVE 4ad20bd6 (no th- seal set, no person seal set) | review/* none besides this branch | claims ACTWIRE N14. Worker report dev/handover/reports/ACTWIRE.md read.

## Merge onto LIVE
review/act-seals-n14-r = f1510547 + LIVE 52ad65b3 (dev/test only) + 91dc91d3 (places-swap-n13: doc + test + build) + 4ad20bd6 (rooms2: assets/build only). Only conflicts: index.html/sw.js/assets.json (generated) → took LIVE, rebuilt with dev/site/build_site.sh. Rebuild reproduces (only the CTM_BI line differs). 77619056 has origin/main 4ad20bd6 as ancestor → fast-forward. Diff vs main = exactly the worker's 11 files.
Note: the rebuilt assets.json also picks up other workers' CDN uploads already in img/_index.json (img/kit/death-drape-*, death-flower, fest-drape-l, changed st-st-* hashes) — normal for any build off the live index, not from this branch.

## (1) Diff minimal, kit-first, others unchanged — OK
- All in the existing seal kit: KIT_EMOSEAL gets data only (roleSet {thaihau:"th-"}, setThree["th-act-"] expanded into three[]); kesSet / kesPartsUrl read the set; emoArtSet(p,k) / faceKeyFor / emoBadge / emoBoxArt pass the set. No new frame, chip, CSS or UI part. No player-visible word added (VANPHONG untouched).
- three[set+ak] || three[ak]: women/men keep the exact old lookup; th- is picked only for role thaihau AND only when img/kit/emo-th-<key>.webp is in the CDN index.
- Fallback probed live (Fold build, real faceKeyFor/emoBadge): Thái hậu act-lo → set th-, art act-lo; Thái hậu feeling lo → set "" (unchanged); Thái hậu act-lo with the still removed from KIT_CDNHAVE → set "", badge src img/kit/emo-lo.webp (old path); Emperor → m-; 4 consorts with act-lo → "" / lo; a thị vệ → m- / lo. = no other person's seal and none of her feeling seals change.
- Laws touched: 9 (kit first) OK, 11 (whole group: one set mechanism, roleSet table, not a per-screen hack) OK, 12 (two devices) OK, 4 (timings are kit seal data like the existing three.gian, not game numbers) OK. Laws 1–3, 5–8, 13–18 not touched.

## (2) assets.py — OK
ALWAYS now `img/kit/(?!mg-|ne-|podium|cf-|emo-anim/th-)`. Tested the shipped regex + first-hour.txt on paths: img/kit/emo-anim/th-act-lo(.webp|-out.webp) → not ALWAYS, not in first-hour → lazy/background, never core. img/kit/emo-anim/gian.webp and the 21 stills img/kit/emo-th-act-*.webp stay core (stills 21 files, ≈ 0.3 MB; core 51.8 → 53.2 MB incl. other uploads). Clips are not on the CDN yet, so today's assets.json does not list them at all.

## (3) LOOK, both devices — OK
dev/test/actwire-look.js in a throw-away worktree with the 63 clips staged by dev/art/actwire_stage.py (bytes as reviewed):
- Fold 755x1000@2: lo, buon, choang, tinhnghich, hon, so · iPad 1180x820@2: lo, khochiu, dau, hanghai, binh, chuyentam = 12 seals (none overlap the worker's 10 except lo).
- Every one: still emo-th-act-<k>.webp, faceKeyFor {kind act, set th-}, parts out → loop → back at ~0 / ~3.9–4.3 / ~7.0–7.3 s, lean ≈ 10 s, page errors 0 on both.
- Looked at the 8-frame sheets of all 12 and at frame strips across both swaps for lo on both devices: disc pops out, loop larger, back to rest; same face across swaps, no blank/beige square. Scan of all 1015 frames (centre patch): 0 flat frames, 0 white frames (min stddev 35).

## (4) quickcheck — PASS
- 671cdcc1 (= f1510547 + LIVE 52ad65b3) `--runs 5`: QUICKCHECK PASS · open 1837 ms · old save ok (loads + plays a buổi, 0 errors) · perf median new/live: render 268/277, tab 516/459, buổi 1449/2370, tasks>200ms 23/24 · core gates PASS · time-spill PASS.
- 4c3fc00c (+ LIVE 91dc91d3) `--runs 3`: QUICKCHECK PASS · open 1760 ms · old save ok · render 270/272, tab 566/490, buổi 1596/1630, tasks 25/26.
- 77619056 (+ LIVE 4ad20bd6, generated files only): build reproduces; no code change since 4c3fc00c.

## (5) Lander steps + revert — OK, with one revert note
LAND: fast-forward main to 77619056. THEN (from a worktree of main): `python3 dev/art/actwire_stage.py && python3 dev/site/cdn_sync.py img/kit/emo-anim/th-act-*` (≈ 2 min, 63 files ≈ 32 MB; do NOT git add img/), rebuild `bash dev/site/build_site.sh`, check the 63 th-act clips are listed NOT core (`python3 -c "import json;print({f[3] for f in json.load(open('assets.json'))['files'] if 'emo-anim/th-' in f[0]})"` → no 'core'), commit + push the build. Until then her act seal shows the still + CSS motion (kesPre probes the clips, no 404 break) — safe.
REVERT: `git revert` the merge range (code only, 3 worker commits). **Note:** once the clips are on the CDN, reverting assets.py alone would make those 32 MB core on the next build → on revert also wipe img/kit/emo-anim/th-act-* from the CDN (or keep the assets.py line). The 21 stills are harmless on the CDN (nothing asks for th- without this code).

## Non-blocking
- Pre-existing (worker's note, confirmed in code): jevb emoEvMark `KIT_CDNHAVE.has(\`img/kit/emo-…\`)` is always false after the build turns the literal into a CDN url → fallback walk. Same strip fix as emoArtSet. For the KIT keeper.
- lo's OUT holds ≈ 2.2 s (THACT5 known, owner OK'd).

VERDICT: **PASS** · landable sha **77619056** (branch review/act-seals-n14-r). CDN img/_review/act-seals-n14/ wiped with the verdict. Scratch shots deleted.

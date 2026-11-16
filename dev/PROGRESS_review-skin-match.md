# PROGRESS review/skin-match (owner 15/11 20:15Z: face rosier than hands/neck after the rosy pass; player look 1 not rosy)

## Method (dev/art/skin-match/)
- seg.py: MediaPipe selfie-multiclass (face-skin / body-skin) on square tiles. Needs: venv with mediapipe 1.2.3 + libegl1 libgles2 (apt),
  model .ahcache/sm/mc.tflite = https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_multiclass_256x256/float32/latest/selfie_multiclass_256x256.tflite
  (cv2 5.0 here has NO CascadeClassifier → dev/art/scene-light/tools/face.py / skin-smudge.py analyse() return None on this box.)
- measure.py: median Lab of face / neck / hands skin per fig (audit at half size, one 0.6H tile). all.jsonl = audit records.
- calibrate.py → base.json: natural face-minus-region offset on figs that never had the rosy pass (neck a+0.2 b-1.1, hands a-0.8 b-1.3).
- rule.py: region fixed only if face is ROSIER than it by >= 2.5 a* beyond the natural offset, region colour plausible as skin
  (else = clothes picked up → skip). Shift a = excess (cap 7), b = excess clipped to [-2, +4].
- fix.py: constant a*/b* offset with soft weight (P_body x Lab closeness x alpha x (1-P_face)); L*, alpha, positions untouched.
  fixrun.py also applies the fig's neck shift to the matching por-* neck.
- player.py: look 1 — whole visible skin +a/+b to face a 10.5 b 12.5 (maid m03 Ngọc Lan warmth) + soft cheek blush.
- sheet.py / zoom.py / crops.py: before|after sheets (zoom shows changed-pixel map).
- Calibration on 21 samples LOOKED at (hands/necks only change; clothes untouched apart from WebP re-encode noise, q92 like the rosy pass).

## State (session end, ~21:50Z)
- Rosy-pass class + players DONE locally: 892 figs + 609 por necks fixed (dev/art/skin-match/TABLE.md: median face-rosier excess a*
  neck 4.2–4.5 → 0.2–0.3, hands 5.3 → 0.4–0.5), player look 1 rosy (5 fig + 5 por), player look 3 neck/hands matched (5 fig + 5 por).
  Looked at sheets: only hands/necks change; clothes untouched (WebP q92 re-encode noise only). Sample: dev/art/skin-match/sample-before-after.jpg
- cutcheck on all 1500 changed files (log/cut.tsv): none worse except +0.25..+0.5 on 2 player-look1 figs (pre-existing scores ~91–97) and 2 por (+0.3).
- UPLOADED TO CDN: 234 of 1500 files = log/uploaded.txt. NOT uploaded = files in log/fix.jsonl (f + por) minus uploaded.txt.
  The fixed pixels are LOST with this container → re-generate them (deterministic): see Resume.
- Audit of the ~7300 never-rosied figs: 1036 lines in log/all.jsonl (only ~80 random non-rosied so far; 1 natural mismatch per ~80 → expect ~100 more).


## Session 8 resume (worker, 15/11 ~22:00Z–23:30Z)
- Step 1 (missing on CDN): fix list = log/cut.tsv (1500 files). On CDN as fixed: the 234 in the old log/uploaded.txt. The other 1266
  (750 fig incl. player look1/look3 + 516 por) were still the ORIGINALS on the CDN: proved by re-measuring every CDN file — all 745
  re-run figs give "before" stats equal to the old log's before (delta < 0.3 a*), identical shifts (max diff 0.00) and identical por pairing.
  The session-7 upload left nothing half-done.
- Step 3: all 1266 regenerated (fixrun.py on log list, player.py for look1, logged neck shift for orphan por-consort-c09-t8-a51).
- Step 2 (soft/hazy check, dev/art/skin-match/sharp.py, log/sharp_q92.tsv → log/sharp.tsv): ratio fixed/original of Laplacian variance
  and Tenengrad in the head zone (top 22% of the figure, solid alpha). The colour fix itself keeps detail (L* untouched, crops
  sharp-crops.jpg identical); the loss is WebP q92 RE-ENCODE generation loss, worst on 506x384 por-*:
    q92 as made: fig head-lap median 0.999 min 0.962 (20 < 0.98); por median 0.997 p5 0.949 min 0.911 (159 < 0.98).
    Plain re-encode of the untouched original at q92 gives the same drop (por-kid-p18-a4 0.91) → encoder, not the fix.
  Fix: reenc.py re-encodes those 179 at the first quality in 92/95/98 with both ratios >= 0.98 (176 at q95, 3 at q98).
    After: fig min 0.980 median 0.999; por min 0.980 median 0.999. Bytes: fig 54.09→53.66 MB, por 24.50→25.38 MB (max por 129 KB).
  Alpha and size identical on all 1266.
- RISK (not fixable here): the 234 files uploaded in session 6/7 were q92; 92 of them are por; ~30% of those (~28) plus ~4 figs likely lost 2–9% head detail
  (originals are gone from the CDN, so it cannot be measured or undone without pre-fix originals).
- Upload: coordinator unblocked Cloudflare 15/11; all 1266 uploaded with cdn_sync AFTER the check; live _index.json md5 == fixed file for 1266/1266. log/uploaded.txt = 1500/1500. PENDING CDN UPLOAD: none.
  Encoder rule for any future pass: never re-save at q92 blindly — use reenc.py's adaptive quality (>= 0.98 head detail).

## Step 4 PLAN — audit of the never-rosied figures (not run: ~1 h CPU + ~450 MB download)
- Scope: 8378 fig-* on CDN; 1031 measured (log/all.jsonl); 1500 fixed; remaining 7347 (maid 4430, consort 2465, kid 159, man 111,
  eunuch 100, mama 29, official 21, physician 13, thaihau 10, emperor 6, player 3). Expect ~1 mismatch per ~80 → ~90–100 to fix (+ por).
- Run (4 CPU box, 3 procs nice 19): download fig-* of the list into .ahcache/sm/base (xargs -P8 curl, ~450 MB; delete after);
  measure.py .ahcache/sm/all.jsonl <chunk> (runm.sh was in the lost .ahcache: just split the list in 3 and loop measure.py; ~1.5 s/fig/proc
  → ~60 min); select.py all.jsonl base.json dev/art/skin-rosy-fixed.txt flag.txt; download por-* of flagged; fixrun.py on flag.txt
  (fresh REC); sharp.py → reenc.py for any < 0.98; crops.py sheet and LOOK; cdn_sync (img/ copies), append log/uploaded.txt; table.py.
- upload.sh hard-codes W=/home/user/wt/skin-match, q92 and cutcheck from dev/figwork (sparse-excluded here): use the steps above instead.

## Next steps (exact)
1. Setup (Resume block below), download base: fig-* listed in log/fix.jsonl + their por-*.
2. Re-run fixes only for the NOT-uploaded names (fixrun skips names already in REC, so use a fresh REC):
   python3 -c "import json;u=set(open('dev/art/skin-match/log/uploaded.txt').read().split());[print(json.loads(l)['f']) for l in open('dev/art/skin-match/log/fix.jsonl') if json.loads(l)['f'] not in u and 'player_look1' not in l]" > todo.txt
   .ahcache/sm/venv/bin/python dev/art/skin-match/fixrun.py dev/art/skin-match/base.json .ahcache/sm/base .ahcache/sm/out .ahcache/sm/fix.jsonl $(cat todo.txt)
   (por of a fig whose fig was uploaded but por not: check uploaded.txt for por-<id> too.) Player look1: player.py if its files are not in uploaded.txt.
3. dev/art/skin-match/upload.sh (cutcheck + cdn_sync, logs uploaded.txt).
4. Finish audit: .ahcache/sm/runm.sh (measure.py over remaining fig-*), select.py → flag.txt, fixrun on new names, LOOK at crops.py sheet, upload.sh.
5. Update TABLE.md (table.py), commit logs, push, report "SẴN SÀNG KIỂM".
## Resume (fresh container)
  cd <worktree>; mkdir -p .ahcache/sm; python3 -m venv --system-site-packages .ahcache/sm/venv; .ahcache/sm/venv/bin/pip install mediapipe==1.2.3
  apt-get install -y libegl1 libgles2; curl -o .ahcache/sm/mc.tflite <model url above>; curl -o .ahcache/sm/index.json https://ctm-img.victoria-tntt.workers.dev/img/_index.json
  download fig-* (+ por-* of flagged) into .ahcache/sm/base/ ; cp dev/art/skin-match/base.json .ahcache/sm/
  audit:  .ahcache/sm/venv/bin/python dev/art/skin-match/measure.py .ahcache/sm/all.jsonl .ahcache/sm/base/fig-*.webp  (chunks, nice -n 19)
  select: python3 dev/art/skin-match/select.py .ahcache/sm/all.jsonl .ahcache/sm/base.json dev/art/skin-rosy-fixed.txt flag.txt
  fix:    .ahcache/sm/venv/bin/python dev/art/skin-match/fixrun.py .ahcache/sm/base.json .ahcache/sm/base .ahcache/sm/out .ahcache/sm/fix.jsonl $(cat flag.txt)
  player: .ahcache/sm/venv/bin/python dev/art/skin-match/player.py .ahcache/sm/out .ahcache/sm/base/{por,fig}-player-look1-*.webp
  check:  python3 dev/figwork/cutcheck.py on out files; sheets; copy out/*.webp to img/ and python3 dev/site/cdn_sync.py img/<files>
No generated (Magnific) art in this task.

## D52 skin-audit (branch review/skin-audit, continues review/skin-match; step 4 DONE)
- Setup note: this box needed `apt-get update && apt-get install -y libegl1 libgles2`; runm.sh (new, in dev/art/skin-match/) = chunked download(100) -> measure.py -> delete.
- Measured: 7727 never-measured fig-* (CDN now has 8758 fig-*): consort 2520, maid 4451, eunuch 448, kid 186, man 119, mama 29, official 21, physician 13, thaihau 11, emperor 6, player 15 (appended to log/all.jsonl; 0 read/no-face errors).
- Flagged by select.py (half-size audit): 322 (4.2%). Re-measured at full res by fixrun.py: 205 fig really mismatched and fixed (+35 por necks) = 240 files; 117 rejected (full-res shift = 0, borderline at half size, left untouched).
  Fixed: consort 47, maid 125, eunuch 17, kid 3, man 9, physician 2, emperor 1, mama 1 (table: `table.py log/fix_audit2.jsonl base.json`; median excess hands 2.9-3.0 -> 0.3, necks 2.6-3.1 -> 0.5).
- Sharpness (sharp.py vs original): q92 as made had 38 files < 0.98 (min 0.927); reenc.py re-encoded them (33 at q95, 5 at q98). Final: head Laplacian/Tenengrad ratios min 0.981, none rejected as soft. Bytes 14.1 MB -> 15.1 MB.
- Contact sheets (crops.py around changed skin for 205 figs, sheet.py for 35 por) all LOOKED at: only hands/necks warmer, clothes/faces untouched, no blotches.
- Coordination: every file was downloaded from the CURRENT CDN right before fixing; index md5 re-checked before upload: only fig-consort-c23-t6-a51 had changed (someone's newer edit) -> re-downloaded and re-fixed on that version. After upload all 240 live files are byte-identical to my outputs (cmp). No file of the C9 huadian / D23 mole workers was overwritten with an older version.
- Uploaded: 240/240 with cdn_sync (6 batches of 40, after the sheets were checked). cutcheck not run (dev/figwork sparse-excluded; alpha untouched by fix.apply, same dimensions).
- Files changed on CDN: log/uploaded_audit2.txt (the full list); fix records log/fix_audit2.jsonl, flagged list log/flag_audit2.txt, sharpness log/sharp_audit2.tsv, log/reenc_audit2.tsv.
- Heads-up for C9/D23: a later full-res re-edit of these 240 files must start from the current CDN version (they now carry the skin fix).
- Pending CDN upload: none.

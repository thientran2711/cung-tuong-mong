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

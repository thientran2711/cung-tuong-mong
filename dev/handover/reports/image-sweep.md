PRIORITY #1 CHECK ('image-sweep|image sweep|_review/|cdn_sync'): OD 7 | ledger 0 | claims 8 | main 7 | review/* 0 — REUSE: Foreman B's img-cleanup (CLAIMS: review/img-cleanup, DONE SẴN SÀNG a2e99bd0, 16/11 19:05Z; owner OD 16/11 18:40Z/18:50Z) already moved images out of git once; this sweep is the follow-up, not a redo.

# image-sweep (worker, sonnet) — branch review/image-sweep @ 7e0250ec0bc3a4a0c2e296c335c6389d7b797427 (= origin/main, no file changed)

Rules read verbatim: OD "(17/11 ~14:15Z real, s32 chat) OWNER RULE storage" + 16/11 ~18:40Z/~18:50Z lines; START_CORE, START_WORKER; img-cleanup.md (B's report + allow-list).

## 1. GIT
Method: bare scratch repo, `fetch --depth=1 --filter=blob:none` under the flock for origin/main + all 1009 origin/review/* heads, `git ls-tree -r --name-only`. Review-branch blob sizes are NOT available without downloading blobs (blob:none), so review/* rows are counted, not sized.

### origin/main (7e0250ec): 7 image files, all kept, nothing to remove
| path | size | branch | kept/removed | why |
|---|---|---|---|---|
| icons/apple-touch-icon.png | 53364 | main | kept | index.html head (apple-touch) |
| icons/favicon-48.png | 6054 | main | kept | assets.json / sw precache |
| icons/icon-192.png | 70680 | main | kept | manifest.webmanifest |
| icons/icon-512.png | 403204 | main | kept | manifest.webmanifest |
| icons/icon-maskable-192.png | 44408 | main | kept | manifest.webmanifest |
| icons/icon-maskable-512.png | 259338 | main | kept | manifest.webmanifest |
| dev/build/icon.webp | 6552 | main | kept | inlined by dev/build/assemble.py |
Exactly dev/site/img-allowlist.txt; `python3 dev/test/img-allowlist.py` = OK. No svg/avif/ico/mp4/webm/psd files on main either. B's img-cleanup is live and holds; review/image-sweep therefore has NO diff vs main (pushed as the record, tier SMALL, 0 files).

### origin/review/* (1009 heads): 745 heads still carry images, 264 clean — LIST ONLY (they die when landed)
745 heads hold 3,085,451 file entries / 20,304 unique paths outside the allow-list (older branches are from before img-cleanup, so they carry dev/shots, dev/figwork, dev/kit, dev/art, dev/review, dev/owner-shots, .out/*, .tmp/*; 2,000-14,000 files each). Full per-branch list: dev/handover/reports/image-sweep-branches.tsv (branch | files | top dirs | kept/removed = listed only). Biggest: review/rank-ui 13,811, drag-curl 13,778, gift-chest 13,777. Per-folder spread: dev/kit 741 heads, dev/shots 714, dev/owner-shots 698, dev/figwork 678, dev/art 587, dev/review 572, .out/* 547. As B noted: such a branch FAILs quickcheck step 0 until its images are `git rm`-ed (intended); nobody should land one without it.

### Handover branch (docs, not in the brief's scope — listed, not touched)
719 image files: dev/handover/reports 691, dev/handover/shots 19, dev/handover/refs 5 (+3 icons/icon.webp). KEEP+MARK owner screenshots dev/handover/refs/: owner-eunuch-clip-fold-1116.jpg, owner-event-style-ref-1117.jpg, owner-figsmall-fold-1116.jpg, owner-figsmall-ipad-1116.jpg, owner-luanhoi-skin-1116.webp. The 691 report images + 19 shots break the same rule again (committed after img-cleanup). FOR FOREMAN D: decide a `git rm` of reports/*.{png,jpg,webp} + shots/ on the handover branch (reports reference by name).

## 2. CDN img/_review/<topic>/ (before: 47 topics; after: 38 topics, 904 objects, 445 MB)
Deleted with `python3 dev/site/cdn_sync.py --wipe-review <topic>` — NO 403 this time (R2 delete works). Deleted = finished topics only (LIVE on main / PASS landed per CLAIMS), 72 objects:
| topic | objects | evidence |
|---|---|---|
| batch-s31a | 13 | LIVE c29866a6 (CLAIMS L776) = the kit-ico-rank-r2 shots (RANK-coop-rebirth-blocked…); r2 PASS aaa1bec1 |
| batch-0032 | 2 | batch-0032-oi-r1 PASS, merged into batch-d8 LIVE |
| batch-0132 | 4 | base of batch-0415, LIVE |
| batch-0415 | 8 | LIVE 4719d424 (L621) |
| batch-0430 | 7 | LIVE 6c4f21c3 (L636) |
| batch-2300 | 2 | shipped before batch-0032 |
| batch-d8 | 8 | LIVE 6ca04148 (L720/751) |
| coop-thin-a | 2 | r1 PASS b95a56e3c, shipped |
| fig-cutout-code | 26 | r1 PASS → LIVE 9c49f13c (L410); r2 PASS 8fb59e05 |
Verified afterwards from the live img/_index.json: none of these topics is left.

KEPT (38 topics, 904 objects, 445 MB) — not deleted, reason:
- RUNNING / READY / SẴN SÀNG KIỂM per brief or CLAIMS: toil-looks (8), morechip-sil (5), pcard-facts (6), pcard-facts-2 (4), loading-words (7), tinbao-ui (6), batch-s31b (9, RUNNING row), hapmark-size (14, READY 37f43fb2), coop-thin-b-r1fix/-r2fix (2+4; thin-b r3 RUNNING), coop-thin-d-r1 (32; FAIL, rework), fig-feet-crop-2 (18), stage-pets-r7 (7).
- PASS but still waiting for builder batch s32a (not live yet; main/builder may still LOOK): learn-scene-fix (3), morechip-fix (3), map-me-mark (20), map-portrait (17), person-leftcol (5), night-final (5; PASS 52d5092d, landing order), palace-voice (32).
- Owner reference screenshots, never delete: owner-refs-1116 (16, 30 MB), owner-refs-1117 (3).
- Art samples with NO CLAIMS/OD verdict row found (owner decides; "ask before deleting"): art-pres-a123, art-requests-c, courtyard-art, event-art-style (10) + event-art-style2 (407 objects, 137 MB — largest), fig-oldrollout, oldroll-src, fp-s5, kit-size5, origin-intros (63), rank-vankien, thaihau-night (45), thanhtai (21), toil-rooms, toil-vung.
FOR MAIN/D: the biggest cleanup left is event-art-style2 (137 MB) + fig-feet-crop-2 (36 MB) + owner-refs-1116 (30 MB, keep) + loading-words (29 MB) once the verdicts are in; run `--wipe-review <topic>` per verdict.

## 3. Gates (review/image-sweep = origin/main 7e0250ec, SMALL, 0 files touched)
- `node dev/tools/tier.js HEAD` → TIER SMALL · 0 files.
- build_site.sh builds ("built 9580909", 3 s); generated files reverted, tree clean.
- quickcheck.sh 7e0250ec: QUICKCHECK PASS · 129 s · open 1406 ms · old save ok · render 156/160, tab 266/275, buổi 685/786 ms (new/live), tasks>200ms 12/12 · core gates PASS (one-core-guard 0 fails, rules-one-source, kit-conform, coop-one-world) · time-spill PASS.
- Console check Fold 755x1000@2 + iPad 1180x820@2 (Playwright on the built site): 0 page errors, 0 broken <img>; image requests 535/545 OK, 33 × 404 on `https://ctm-img.victoria-tntt.workers.dev/img/@W<n>.webp`. NOT caused by this sweep: key `@W…` never existed in the CDN index; code origin = dev/build/j25.js:88 `CW=n=>"@W"+n` (main). Same on live code (tree is identical to main). FOR D: a whole-family bug of its own (a "@W" key sent as a file name) — open a separate topic, not part of the sweep.
- Looked at: no visual change possible (no code diff), so no new shots; nothing stored in git or on the CDN.

## PART 2 — handover branch `git rm` (tree only, no history rewrite; ordered by Foreman D #10)
| folder (dev/handover/) | files | kept/removed | why |
|---|---|---|---|
| reports/fig-cutout-clean | 421 | removed | finished topic |
| reports/fig-proportion | 141 | removed | finished topic |
| reports/fig-proportion-redo | 60 | removed | finished topic |
| reports/foreign-princess-art | 30 | removed | finished topic |
| reports/pl-night-art | 11 | removed | finished topic |
| reports/map-frame-art / map-frame-research | 7 / 6 | removed | finished topic |
| reports/event-art-dark-fix | 6 | removed | finished topic |
| reports/fig-tier-succ | 4 | removed | finished topic |
| reports/cf-tray-style | 4 | removed | CLAIMS DONE (old E live on CDN) |
| reports/art-complete-p2 | 1 | removed | CLAIMS DONE (48/48 live on CDN) |
| shots/opt-pic-same 8, narrow-t3 5, morechip-corners 4, stage-caption 2 | 19 | KEPT | PASS / awaiting batch land per CLAIMS; remove after landing |
| refs/* | 5 | KEPT | owner screenshots |
Removed 691 files (~190 MB of tree; history keeps them). No verdict was open on a removed topic, so nothing was uploaded to the CDN. Each topic report that exists got the note "(image removed per OD ~14:15Z storage rule)". Handover branch now: 19 shots + 5 refs + 3 icons/icon.webp.

SẴN SÀNG KIỂM 7e0250ec0bc3a4a0c2e296c335c6389d7b797427

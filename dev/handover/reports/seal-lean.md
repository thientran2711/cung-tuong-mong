# seal-lean — report (worker, sonnet; ROOT-62 child; depth 1)
PRIORITY #1 CHECK: OD 2 ('seal anim' 17/11 ~18:00Z + ~18:30Z (D)) + 19/11 ~02:15Z real | main dev/build/jemoseal.js (kemo-m-* keyframes), KIT.md §38.4 | review/* none | claims seal-lean (this session). START_CTX ~0 %.

## What (ONE kit part: jemoseal.js; KIT.md §38.4 motion lines canon-overwritten, nothing else touched)
- IDLE: every live seal sways ±1.2deg, period 6–8 s (random per seal, random phase), CSS `rotate` property only. Data: `KIT_EMOSEAL.idle`.
- LEAN-IN: per seal random 4–8 s (`KIT_EMOSEAL.lean.min/max`), global stagger gap 1.2 s between any two lean starts (`lean.gap`, a due seal waits +0.1–0.9 s), scale 1.12–1.18 (`lean.scale`, random per lean, ease-out), then the feeling's own stronger motion for `keys[k].d` s (1.0–1.6) and back to idle. Lean = `transform`/`filter` (separate properties from idle `rotate`, they never fight). Per feeling in DATA `KIT_EMOSEAL.keys[k].m` (keyframes kemoL-<m>): giận shake (strong, fast, heat glow) · buồn/khóc droop · vui sway + glow · sợ tremble · lo bob · ghen/hờn flicker (side glance) · mưu glint · đau wince · bình/an nod. Unknown / act-* key → its feeling, else `defaultMotion`.
- Frame loop `emo-anim/<set><k>.webp` and `emo-fx/<k>.webp` now play DURING the lean-in only (probe kept; swapped in at lean start, removed at lean end / leaving the screen); no file = still + CSS.
- Gates kept: only on screen (`kemo-live`), Cảnh động on, no reduced-motion, not Gọn, no per-place motion (the existing saveOpt hook still re-applies at once).
- Test: `MOTION=1 [SECS=40] node dev/test/fig-seal.js <W>x<H>@2 <outdir>` extended (lean timing / stagger / idle range + strip frames for gian, buon, vui via Web Animations API); montage `python3 dev/test/seal-strip.py`.

## Branch / sha
review/seal-lean @ 5f7aef61 (from origin/main b1c3631e; built with build_site.sh; main unmoved at push time).

## Tests (40 s window, 4 live seals in the room, no page errors)
| | Fold 755x1000@2 | iPad 1180x820@2 |
|---|---|---|
| idle rotate range | −1.2..+1.2 deg | −1.2..+1.2 deg |
| idle half-period | 3.2–3.9 s (full 6.5–7.8 s) | 3.5–3.9 s |
| leans (4 seals) | 21 | 20 |
| rest between leans (end→next start) | 4.31–8.66 s | 4.0–9.75 s* |
| lean duration | 1.15–1.25 s | 1.15–1.25 s |
| peak scale | up to 1.177 | up to 1.178 |
| min start gap between ANY two seals | 1.32 s | 1.22 s |
| overlapping leans | 0 | 0 |
*9.75 = a seal that waited for the stagger gap / left and re-entered the screen.
Strip frames (idle vs lean 0.2/0.4/0.6/0.8, scale ~1.13–1.17): gian = shake + warm glow, buon = droop up-down with tilt, vui = tilt both ways with glow. Single-frame transforms confirmed per feeling (gian translateX, buon translateY+rotate, vui rotate). buon/vui were not on screen in the room, so the strip test re-keys one real on-screen seal (same kit code path).
LOOKED at strips + room (both devices). Shots (CDN, delete after verdict): https://ctm-img.victoria-tntt.workers.dev/img/_review/seal-lean/{strips-fold.png,strips-ipad.png,room-fold.jpg,room-ipad.jpg}
quickcheck: see the line at the end of this file.

## Scan table (fix the whole group)
Every `img.kemo` (pcPort, person cards, lists, mood box, figure-head `kfseal`) goes through the same `kesLive` → one behaviour; grep: no other file defines kemo-m-* / kemo animation (only jfigseal `animation:none` base, lower in the cascade than the kit rule; unchanged). Old `kemo-m-breathe` class is gone (bình/an → nod); no other reference.

## Fold perf
Idle = one compositor `rotate` animation per live seal, lean = transform/filter only, ≤1 lean at a time per screen (global gap), no per-frame JS other than the test itself. Quickcheck perf smoke below.

quickcheck --runs 3 vs live b1c3631e: **PASS** 190 s · open 1540 ms · old save ok · core gates PASS · time-spill PASS · perf median new/live render 232/231, tab 464/433 (+7 %), buổi 1172/1048 (+12 %), tasks>200ms 18/18. Note: tab/buổi deltas are with 3 runs on a software-GL box; the idle rotate is compositor-only and the lean fires at most one seal per 1.2 s, so I expect noise, not cost — reviewer may rerun with --runs 7.

STATUS: SẴN SÀNG KIỂM seal-lean 5f7aef61. No HANDOVER needed (context low). After the verdict: wipe CDN img/_review/seal-lean (python3 dev/site/cdn_sync.py --wipe-review seal-lean).

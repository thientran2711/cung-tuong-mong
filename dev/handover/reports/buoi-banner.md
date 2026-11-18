# buoi-banner — report (worker; sha 8b50182 on review/buoi-banner; tree = live main 550dd1b + one change)
PRIORITY #1 CHECK: 'buổi transition' — OD canon 18/11 ~06:20Z BUỔI CHANGE (OD:L891) + owner's later words relayed by ROOT-46 (plaque REJECTED: keep the approved animation, remove only the opaque backdrop); main jbuoi.js (BTR_*), j18 curtain(), j93 btrKill reset; review/* none else.
## What (final direction)
- `jbuoi.js` (KIT §74): the approved animation is unchanged (art, motion, timing, season/festival variants, mist, sky band, title plate, seal). REMOVED only the opaque full-screen backdrop: tint, ink wash, vignette (JS layers, animations, CSS). The whole `#buoitr` lies on the game UI at `BTR_OP` = 0.80 (hook `window.__btrOp`; ladder 70/80/85 shown). Gọn = the title only, 0.7 s. KIT.md §74 note added.
- The earlier title-only plaque (commits be73c79 / 5a40cb2) is fully reverted by the final commit (history keeps it; force-push was denied).
## Tests (local build, fold + ipad): buoi-transition (REAL=1) FAIL 0, 0 page errors, skip/sync/Gọn ok; buoi-art 0 errs; buoi-moon ok.
## Shots (CDN, same save per device, scene loaded, anim paused at its middle; LOOKed at fold-70/85 + ipad-70/85 + both strips; fold-80 / ipad-80 not individually viewed)
https://ctm-img.victoria-tntt.workers.dev/img/_review/buoi-banner/{fold,ipad}-trua-{70,80,85}.png ; strips (6/30/55/97 % of the animation, op 80): .../fold-strip.png, .../ipad-strip.png
## For main
- 70/80/85 differ subtly on a busy room backdrop. After her pick set BTR_OP; wipe: `python3 dev/site/cdn_sync.py --wipe-review buoi-banner`.
- No art became unused (all pieces kept).

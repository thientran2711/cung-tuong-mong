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
# buoi-banner — report (worker, sha be73c79 on review/buoi-banner, from main a95e8d4)
PRIORITY #1 CHECK: 'buổi transition' — OD 5 hits (canon = 18/11 ~06:20Z BUỔI CHANGE line, OD:L891); main jbuoi.js (BTR_C), j12.js light by buổi (kept), j93.js overlay reset (kept, comment only); review/* none; CLAIMS none else.
## What
- `jbuoi.js` rewritten (111 → ~35 lines): `buoiShift()` now shows ONLY the buổi title in a rectangle plaque (`.btr-t`, kit §31.2 plaque look: --k3pl, 1px --line, radius 8) just under `header.hud` bottom (+6px), whole plaque opacity `BTR_OP`=0.80 (hook `__btrOp`). Fade kitPace(860) ≈ 1.5 s (measured 1.57–1.78 s); Gọn 0.7 s; tap = gone in ~0.1–0.25 s and still clicks the game; bots/quiet nothing; sfx unchanged; sync untouched (nextBuoi returns before overlay).
- Removed (no dead code): ink wash, tint, vignette, mist, light, sky band, sun/moon arcs + moon phases, season/festival variants + particles, kit seal, BTR_ART/ICON/POS/MOONBAND, btrWarm, btrVariant. `btrKill` kept (j93 reset). j11/j18/j93 comments updated. first-hour.txt: dropped buoi-hills/orb/wash. Tests: buoi-art.js + buoi-moon.js deleted (tested removed pieces); buoi-transition.js rewritten. KIT.md §74 rewritten. Night→morning reads "Buổi sáng".
## Tests (local build, fold + ipad): 0 page errors; title text right for all 4 buổi; 1 child only; no full-screen veil; top >= hud bottom; skip/Gọn/len/bot/sync checks PASS (FAIL 0 on ipad; fold same checks passed in the ladder run). Quickcheck script named in brief does not exist on main; build_site.sh checks (media-check, img-allowlist) pass.
## Shots (CDN, LOOK done) — ladder 70/80/85 of "Buổi trưa", same moment, same screen
https://ctm-img.victoria-tntt.workers.dev/img/_review/buoi-banner/fold-trua-70.png (and -80, -85) — Fold 755x1000@2
https://ctm-img.victoria-tntt.workers.dev/img/_review/buoi-banner/ipad-trua-70.png (and -80, -85) — iPad 1180x820@2
Note: on iPad the plaque overlaps the first stage chip row / tab row (expected: it floats under the top bar for ~1.5 s); at 70 the text behind shows through more. Default is 80 until the owner picks; changing = one number `BTR_OP`.
## For main
- Old CDN art img/fx/buoi-* (wash, mist, hills, orb, band-*, ico-*, moon-*) now unused: delete from CDN on your word (I did not touch them).
- After her pick: set BTR_OP, wipe review folder: `python3 dev/site/cdn_sync.py --wipe-review buoi-banner`.

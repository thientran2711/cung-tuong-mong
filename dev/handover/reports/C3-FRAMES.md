# C3-FRAMES report (ART worker, kit request KK40, owner-bug family ob-ngoaicung)

PRIORITY #1 CHECK: OD ob-ngoaicung (MAIN 156 order 26/11 ~09:34Z) | origin/main: only frame-consort-0..7 + frame-cold on CDN, frame-home / frame-dan = 404 before this job | review/* none | claims none.

## Result
- https://ctm-img.victoria-tntt.workers.dev/img/kit/frame-home.webp  («tiểu thư», plain red-lacquer, 13.9 KB)
- https://ctm-img.victoria-tntt.workers.dev/img/kit/frame-dan.webp   («thôn nữ», plain carved wood, 24.1 KB)
- Sheet (frame-consort-0 | frame-home | frame-dan, sample portrait on bg-consort-0 brocade, parchment row + dark row): https://ctm-img.victoria-tntt.workers.dev/img/_review/c3-frames/sheet.png
- Uploaded with `dev/site/cdn_sync.py` (3 new keys, nothing overwritten; both frame keys were 404 before).

## Measured (live frame-consort-0..7 / frame-cold = 550x1037 RGBA, NOT exactly 3:4: body+tassel on one canvas)
| | canvas | frame body bbox (x, y) | inner window (x, y) | tassel ends |
|---|---|---|---|---|
| frame-consort-0 | 550x1037 | 53..496, 184..749 | x 85..466 (382 px), y 215..717 (503 px) | y 974 |
| frame-home | 550x1037 | 55..497, 183..~750 | same window, 99.5 % transparent | y 953 |
| frame-dan | 550x1037 | 55..495, 183..~750 | same window, 99.3 % transparent | y 944 |
Window position/size equal to consort-0 to the pixel (generated art scaled so its own cut-out = 382x503 at (85,215); ratio of the window 0.76 = same as the consort set). Alpha: background and window flood-cut from flat white, 1 px grown + 0.7 px feather (no white halo on dark or parchment). The two tassels are a little shorter than the consort ones (plain red silk / plain hemp, no bead).

## Look
Humbler than every consort frame: no crest, no gem, no flowers, no gold caps. home = glossy vermilion lacquer + thin dark-gold edge line; dan = pale carved wood, grain + double carved groove. Same shape family (rounded window, tassel at bottom centre). Note: the AI render is a little cleaner/smoother than the painted consort frames; reads fine at game size (see sheet). Candidates not used: home1 (thicker bevel), dan1 (darker wood).

## Credits
2 prompts x 2 variants x 80 cr = 320 cr (gpt-2-6, folder ba4aecfe…, style ref = frame-consort-0). Cut-out done locally (0 cr). Budget 600: OK.

## Follow-up for the coder (not done here, no code changes)
KIT.md section 1.3 / portrait-frame table needs two new rows (home, dan); sprite keys img/kit/frame-home.webp, img/kit/frame-dan.webp.

~100% xong (art) / ~0% chơi được (needs wiring by KK40's coder)

PRIORITY #1 CHECK ('emo-anim'): prio1.sh "emo-": OD 9 | ledger 0 | claims 7 | main 15 | review/* 5 | archive 32. Order of 17/11 17:46Z never painted; CDN img/kit/emo-anim, emo-fx, emo-khoc all 404 before this job (emo-gian/buon/vui live). Reused: live img/kit/emo-gian.webp + emo-buon.webp (160x160 RGBA seals).

# emo-anim pilot — E1 (women set; SAMPLES ONLY, nothing live)

## Prompt source (honest)
Original emo-gian/buon prompt NOT FOUND: git grep 'emo-' (dev/kit, dev/art, handover, archive) + Magnific folder ba4aecfe: only upload "emo-female-v2-sheet" (no prompt). So I wrote the shortest prompt copying the live look, with the live emo-buon / emo-gian stills (upscaled 640px) as image references:
"Same round emotion seal as the two reference seals: the same young palace lady (…two-bun chignon, pink flower, gold bộ diêu hairpin with pearl tassels), same soft muted painted style, thin gold circular rim, same framing and size, plain pale blue-grey background. Her expression: crying — …"
Frames: "Animation frame N of 6 of this same <crying|angry> seal. Keep everything identical… Only change: …" (gpt-2-6, 1:1, ref = the khóc still / live gian).

## Made (16 gens of 20; ~1,280 credits)
CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/emo-anim/ :
- emo-khoc.webp (still, 7.8 KB)  — 2 candidates, picked the one with clearer tears
- khoc.webp 41 KB, gian.webp 44 KB — 6 frames, 160x160, 140 ms, loop forever (animated webp, alpha, circular)
- fx-khoc.webp (tear 3.6 KB), fx-gian.webp (smoke puff 5 KB), 128px transparent, checked on white + dark
- sheet1.jpg (frames + live seal for comparison), emo-anim-preview.mp4 / .gif (khóc + giận side by side; also repo out/)
Method: gpt-2-6 frames from the still as reference (cheaper than Magnific video and kept the seal identical; 12 gens). Frames masked to a clean circle (raw gens have opaque black corners — the live seals are transparent there), bbox-aligned, then assembled with Pillow.
Looked at every frame (strips + sheet): face/hair/flower/frame identical; khóc: tears well → streak → wail → fade; giận: anger mark grows, glare peak with teeth, huff, ease.

## Faults (honest)
1. Hairpin/flower on new frames is more detailed and slightly bigger than the live emo-gian/buon (live pin is thinner); khóc/gian frames match each other, not 100% the live stills. If the owner wants the old look exactly, repaint with a stronger ref or I redo the still.
2. gian frame 4 has a baked-in small steam puff at the mouth; the separate fx-gian smoke may double it — either drop frame 4 puff use or skip fx there.
3. Frames are ~3 % non-square before resize (cropped bbox 989x1020 for khóc) — invisible in the loop.
4. khóc frame 6 differs slightly in skin tone from frame 1 (loop seam visible only if looked for).
5. Not live: img/kit/emo-anim/{khoc,gian}.webp and emo-fx/* NOT uploaded (samples only). Frames are flat webp animations; code (KIT §38.4 / jemoseal.js) must read img/kit/emo-anim/<key>.webp.
Spare: 4 gens left unused.

Next on owner OK: remaining women's feelings + m / mo sets (same method, ~12 gens per feeling) then move files to img/kit/.

# PROGRESS review/buoi-transition (queue C27)
Spec: OWNER_DECISIONS 15/11 "Buổi change page-flip animation looks odd" + "stage glow / buổi transition approved" (Magnific-painted, like other §68 effects).
## Done
- Found the old effect: j11 W("curtain") = feedback("page") (paper sound) + inkWipe (dark wipe .fxo.inkwipe) + j18 buoiShift (cream curtain, label) + j93 kitDayShift (incense, sky slide). Removed the page sound + dark wipe from curtain (j11), unhooked the j93 wrapper; the new `buoiShift` in dev/build/jbuoi.js replaces j18's (loaded last). Tuần lục page turn / dawn() week summary untouched.
- New transition KIT §74 (see KIT.md): ink-wash veil, painted sky band with sun/moon arc, calligraphy title + kit seal, dawn variant, tap to skip, Gọn = quick fade, bots/quiet nothing, never awaited (co-op safe: plays locally after state applies; sync test: nextBuoi returns synchronously with S.buoi already new).
- 4 painted images (gpt-2-6, looked at each): wash, mist, hills, orb. Sources dev/fxwork/buoi/raw (not committed, 4 PNG), recipe slice_buoi.py. 130 KB total on demand. Magnific ids: wash Bh4ng1JoQR, mist gOIHMYVSXO, hills UPmbp0Twny, orb mE3TJSkhJQ (160 credits).
- LUẬT SỬA CẢ NHÓM: family = every place a buổi changes goes through curtain() (nextBuoi, jnight toMorning, j76 long trips, co-op). Scan: `grep -n "buoiShift\|kitDayShift\|inkWipe" dev/build` -> all callers now go through the one new function; no other page-flip-like call on buổi (rotateY only in kmFlip card / j87 book).
| before | after |
|---|---|
| page sound + dark ink wipe + curtain label + incense | painted time-of-day transition, no page sound/wipe; bell / night-watch sfx kept |
## Tests (dev/test/buoi-transition.js, swiftshader, box load ~40; screenshots at dsf 1)
755x1000, 1000x755, 1180x820, 1366x1024, 844x390, 390x844: each of 4 buổi plays with the right title, dawn has mist, tap skip removes it (tap still reaches the page), Gọn = 1 layer fade only and gone, 0 page errors. FAIL 0. Viewed frames at 755x1000 (trưa, tối, sáng/dawn), 844x390 (dawn), ok. 390x844 frames were hidden by the Luân hồi roulette in the harness (layout identical to 755 portrait; DOM checks pass).
## PENDING CDN UPLOAD (Cloudflare token 401)
Files in /home/user/wt/buoi-transition/img/fx/ (git-ignored): buoi-wash.webp 38544, buoi-mist.webp 42148, buoi-hills.webp 35138, buoi-orb.webp 15116. Run `python3 dev/site/cdn_sync.py img/fx/buoi-*.webp` then `bash dev/site/build_site.sh` (assets.json fx group). Until uploaded the overlay layers 404 (title/tint still show). Do NOT delete the worktree.

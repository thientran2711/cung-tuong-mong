# review-kit-size-r7 (reviewer, SMALL tier)
Branch review/kit-size-r7 = review/minigame-frame-r1 (9e856a4d) + origin/review/kit-size c4e35f53; assemble.py union (+jksize.js after jlag2.js); index/sw/assets from main; site rebuilt.
## Verdict: PASS
- kit-size7-pics (329 pictures x S/M/L/XL x news+notice, both devices): 2632 frames per device, NOT filling/broken 0, centre of the subject outside the crop 0, page errors 0. No .kpz / blur-pad left in dev/build (grep). Focal crop lives in jksize.js (kitPicFocus), one place.
- Before/after sheets (CDN img/_review/kit-size7) looked: blurred side pads gone, pictures fill the strip/main frame, crop on the subject. Wiped after this verdict.
- Note (not a blocker): in the narrow news strip at M/L/XL a large subject is cropped to ~56% on average (min 24%); the subject centre is always inside. That is the cost of cover on a wide strip (owner rule: always cover).
- coop-e2e 59/59, QUICKCHECK PASS (168 s). Live-visible parts beyond the sample page: #6b goal/task card pictures (kitOptPic "Đi làm" wrapper, jopic.js) - quickcheck/coop clean.

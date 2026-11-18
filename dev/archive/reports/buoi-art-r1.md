# Review buoi-art-r1 (SMALL tier, reviewer Sonnet)

**PASS 42ff535b676cf469c035566f0e213f81038418c3** = NEW READY sha (review/buoi-art-r1, merged with origin/main f03886af, ancestor-ok; rebuilt, buoi-art.js + buoi-moon.js FAIL 0, 0 page errors, Fold + iPad). Earlier PASS be25de29 superseded. Details below are from the first review pass.

Reviewed: review/buoi-art 70fcddac (bands 4 seasons + 13 festivals, 4 buổi icons, moon on tối by tuần). Merged onto latest main (3 times, main kept moving); conflicts only in generated index.html + sw.js, resolved by rebuild. Diff vs main = jbuoi.js, 2 tests, PROGRESS, assets.json, index.html, sw.js. No deletions.

## Tests (merged build, local server, art pulled from CDN into untracked img/fx)
- dev/test/buoi-art.js (4 seasons + 13 festivals, band + icon file per buổi, 755x1000 + 1180x820): FAIL 0, 0 page errors.
- dev/test/buoi-moon.js (10 cases x 2 viewports): FAIL 0, 0 page errors.
- All 17 band files + 4 icons + 3 moon sprites return 200 on the CDN (9-51 KB each; within the sprite/band budgets).

## Shots (Fold 755x1000, iPad 1180x820), looked at each
- Season bands: hạ sáng, thu chiều, đông (tối): correct painted season band (lotus / maple / plum + snow mountains).
- Festival bands: Đoan Ngọ trưa, Nguyên Đán sáng (peach blossom + lanterns), Đông chí chiều, Trung Thu tối, Vu Lan tối, Giao thừa tối: each shows its own band + the festival name under "Buổi …" (festival wins on a festival day, else season).
- Moon on tối: tuần 0 painted crescent, tuần 1 full, tuần 2 half lit on the left (Fold: all three; iPad: crescent + full; halfL iPad is covered by the buoi-moon.js assertion, my iPad t2 shot was hidden by a random Luân hồi card). Trung Thu / Nguyên Tiêu / Vu Lan: only their painted moon (no sprite, orb hidden); Giao thừa: no moon. No double moon in any shot.
- All art is painted (CDN webp); code only masks/animates. Title uses the existing kit seal/plate/icon (buoi-ico), no new chip/row/frame; band sits in the transition overlay and does not cover any UI (the overlay is the transition by design, it clears after).
- Old saves: change reads `S.tuan||0` (clamped 0..2), adds no save field; test boots through the normal start/load path with 0 page errors.

## Notes (not blockers)
- Summer/spring/autumn bands are daytime skies even at tối (the moon sits in the day sky); owner approved the bands, so left as is.
- Spare moon art (half, gibbous) not shipped.
- The test scripts read art from local img/fx, which is not in git (CDN); to run them, pull the files from the CDN first.

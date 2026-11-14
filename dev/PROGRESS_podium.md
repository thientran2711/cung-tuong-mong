# PROGRESS: kit podium (review/kit-podium)
Kit owner (podium). Branch from origin/main + origin/review/minigames (j82). Module dev/build/j90.js (last in assemble.py), KIT.md section 20.

- 11/14 first design (podium on top of the board) replaced by owner's new design: two screens, full-body figures, game-like celebration.
- j90: kitPodium / kitPodiumShow / kitPodiumTag / kitFigOf; wired to j82 startContest (all contests incl. j71), Tranh ghế (j34), hoàng tự exams (j53), công chúa dâng nghệ (j54).
- Art (Magnific gpt-2-6, 1 style ref): img/kit/medal-1..3.webp, podium-step.webp, podium-bg.webp.
- Test: dev/test/podium.js (win + confetti + screen 2, 5th place with a stranger as Nhất, Tranh ghế, kid exam, old save from the main build).
- Fixes: rays behind all three figures (stage level), step heights as min-height + refit on image/font load (no plaque pushed off screen at 1024x768),
  Tranh ghế scores with decimal comma, her child on a kid board tagged "Con ngươi".
- Playwright (dev/test/podium.js) PASS at 755x1000@2, 1180x820@2, 1366x1024@2, 412x1058@2, 390x844@3, 1024x768@2: no page errors, no horizontal
  overflow, no text outside the viewport or clipped, no "…", no "có thể", Nhất step highest, every figure loaded, screen 2 (score board / panel)
  shown after Tiếp, old save written by the main build loads. Shots (one per file, JPEG): dev/shots/podium/<n>-<scene>-<size>.jpg
  1 reveal · 2 confetti (animation paused mid-burst) · 3 final · 4 screen 2 board · 5 she is 5th, stranger as Nhất · 6/7 Tranh ghế + screen 2 · 8 kid exam.

KIT READY: podium
- 11/14 owner: rays "giống hào quang Quan Âm" → removed. Now per-place soft stage light (beam from above, oval pool on the step, motes): gold / silver / copper-rose,
  brighter by place; confetti + petals follow HER place in that place's colours (none when she is outside the top three); medal drawn above the light.
  Tests: dev/test/podium-place.js (her place 1/2/3/5) + dev/test/podium.js at 755x1000@2 and 1180x820@2: PASS (pieces centred over her column, no rays,
  no overflow/clipping, no errors, old save loads). Shots: dev/shots/podium/place-{1,2,3,5}-{755x1000_2,1180x820_2}.jpg
KIT READY: podium (v2 lights)

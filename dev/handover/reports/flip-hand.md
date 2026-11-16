# flip-hand — the Emperor's hand in the live 2D card flip
Worker: flip-hand. Code: branch review/flip-hand @ 745e1ab8 (from origin/main fb367740). 2D only (CSS/WAAPI transforms, no PlayCanvas/WebGL). 11/16/2026.

## Owner words (OD s20 chat 17:40Z)
Current hand "bị nhỏ, bị cắt, giống như dán vào"; the demo hand "có một người thò tay vào".

## Finding (root cause)
The demo used the SAME art (cf-hand-emp, 306x480 webp), not a different hand. What looked different: in the live flip the sprite was only ~2.9 card heights (≈380 px at 755x1000), placed so that its two CUT edges (sleeve leaves the picture on the left edge rows 0–.43 and the top edge columns 0–.43) lay INSIDE the screen, and it faded in (opacity 0→1) mid-scene = a floating cut-out. In the demo the plane was big and the sleeve ran off the top of the screen.
Only the card flip draws the Emperor's hand (git grep origin/main + gh code search: only jflip.js + the kit sample); no other hand animation exists.

## What changed (all in dev/build/jflip.js, kit part `kitEmpHand`, KIT.md §67b)
- Size from the SCREEN (≥3.6 card heights, ≥40 % of screen height, ≤86 %): 600 px tall at 755x1000 (was 382), 706 px at 1180x820 (was 565).
- Sprite turned 32° about the pinch point so the forearm runs straight up; its height is raised until both sleeve-carrying cut edges lie above the screen top (measured edge rows from the pixels, BAL.cardFlip.hand.cutL/cutT) → whole arm + sleeve enters from the top edge, no cut edge ever inside the screen, no fade.
- Motion: slide in along the arm (ease-out, ~0.7 of the 1.4 s window), small touch-down dip, rest, lift WITH the card by the same pixels (before: hand lifted 34 px, card 13 px), leave the way it came (ease-in, no fade). BAL t.hand 6500→6200 so the reach is not rushed (everything after is unchanged).
- Shadows: soft blurred silhouette of the hand on the tray (far when high, tucked when touching) + a soft shadow pad under the lifted card (.kcf-cs). Transform/opacity animation only; blur is rasterised once.
- Reduced motion / Gọn: unchanged (final still only, no hand).
- No new art, no save state touched (old saves load unchanged).

## Evidence (before | after, real speed, 10 s, left = before)
Videos (dev/handover/reports/flip-hand/): flip-hand-755x1000-me.mp4, flip-hand-755x1000-3.mp4, flip-hand-1180x820-me.mp4, flip-hand-1180x820-3.mp4 ("3" = a card in the right column). Stills: still-755x1000.jpg, still-1180x820.jpg; before/after frame sheets for 755x1000.
Measure (dev/test/flip-hand.js, per rAF frame, sleeve cut edges mapped through the hand's turn; frames where any cut-edge point is on screen):
| viewport / card | before | after |
| 755x1000 me | 14/168 | 0/163 |
| 755x1000 right col | 36/144, 31/126 | 0/151, 0/33* |
| 1180x820 me | 0/219 | 0/236 |
| 1180x820 right col | 28/132, 30/163 | 0/172, 0/181 |
Hand height / card height: 2.9 → 4.5 (755), 2.9 → 3.6 (1180). *one 755x1000 run of the new build hit a software-render stall (33 frames; video encoder + SwiftShader on a shared box), not repeated in 5 other runs.

## PERF (first priority)
The flip is DOM + WAAPI (no Pixi, no second WebGL). The new part adds 1 wrapper + 2 img (same 27 KB art, already preloaded) + 1 shadow pad per card (opacity 0 until picked). No new network bytes. Long tasks measured with video recording on, SwiftShader, 1x CPU: before 1.6–2.7 s total per 15 s scene, after 0.75–3.4 s, same noise band (the recording itself causes them); no new long task class, no frame-gap increase (gaps >60 ms: 25–52 before, 12–47 after). dev/test/play-perf.js measures tab switches, which this scene does not touch, so it was not re-run.
Not measured on a real iPad/Fold GPU.

## Tests
- dev/test/cardflip.js 755x1000,1180x820: demo scenes OK (cards inside tray, picked card on screen, no h-scroll, tap-skip, reduced-motion still, old save "old ok"), page errors none from the game (only a CORS error loading a CDN event picture from localhost, same on main). The "real week end" step shows NO SCENE on both builds here (queue busy in this harness) — environment, same as main; demo path verified.
- kit-conform 755x1000: CONFORMS 91 / MISSING 15 (floats: kloadchip) — a kit-conform scan of dialogs; the flip is not a dialog; no new floating non-kit part.
- game-feel: ran to the "old/offline" step then threw "reading 'inv'" (S undefined after the offline switch) — a harness problem; the same script on a main build is re-run in the background (see S21 message if it differs).
- Old save load: cardflip.js "old":{"ok":true}; no save fields added.

## ART REQUEST
None required — the existing sprite works because the arm leaves through the top. If a flatter/farther view is ever wanted (arm entering from a SIDE edge), write: "ART REQUEST: Emperor hand + sleeve, long, cut-out" — same pose and style as cf-hand-emp, forearm continuing ~2x longer past the current crop (sleeve fabric running to the image edge on the top/left), 612x960 px transparent webp. Foreman C draws.

## HANDOVER
Worker finished; nothing pending except review of review/flip-hand and a real-device look.

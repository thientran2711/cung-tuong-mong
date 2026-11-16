# PROGRESS review/cardflip — KIT §67 card-flip (lật thẻ bài) scene (owner 15/11 20:50Z)

## State (15/11 ~21:40Z): DONE, ready for review
- dev/build/jflip.js (assembled after jsfx, before j84): kitCardFlip scene + flip() wrapper (outermost) + cfDemo(n,barred,who) + kit sample §67 + CSS.
  Retires j93 piece 1 (kitFlipTablet / kitFlipNote are no-ops while flip() runs; still callable elsewhere).
- j75 hook (2 lines): S.nightWhy.flip0 = the card he turned before the custom (mùng một / rằm) move; old saves without it fall back to pick.
- Steal inside j8 flip: jflip wraps stealNight during flip to record the turned card (stoleFrom).
- Co-op: friend's card added from rivals (v.coop); scene waits while COOPW.pend so both see it after the merged week arrives.
- Cycle: inCycle(p) / cycleDaysOf(p,month) (review/cycle) read via typeof; grey when true or nightCh=0.
- Knowledge: cards = mdH frame (j61 silhouettes), names via kitKnownName → "???".
- Effects: kitFxBurst/kitFxSprite/kitFxLight (KIT §68 review/fxkit) guarded; fallback kitFx("decree") + painted mo-petal-peach + filter glow.
- Plates: landscape 1600x1200, tray centred; plateBox() fits the tray RIM to the screen (focal = rim centre) and cards are laid out in the same box,
  so slots hold at every aspect (portrait crops the picture sides).

## Art (gpt-2-6, folder ba4aecfe, on CDN img/kit/, NOT in git; sources in dev/figwork/cardflip/ locally only)
- cf-plate-ksp.webp  = Magnific jUXf6zALD0 (style ref SytQc5NUb8 = ne-night-normal). Tray floor x .177–.821, y .252–.691 (measured).
- cf-plate-emp.webp  = O6fKWQnynm (image ref jUXf6zALD0; tray floor matches within 2 px).
- cf-hand-emp.webp   = iGqsDfa3uK → remove-bg gOIQ2IeSXO, cropped to alpha bbox, 701x1100; pinch ≈ (.70,.905).
- cf-seal-thitam.webp = s7oEAeVl8e (from gOIQGbfSXO, hook on Ẩ correct), cropped 300x291.
- Portrait pair (owner 21:45Z rule): cf-plate-ksp-p.webp = VXU69gxMMU (ref jUXf6zALD0), cf-plate-emp-p.webp = YMLyJjxWeC (ref O6fKWQnynm), 1200x1600.
- Rejected: TdSNaq8VNR (plate alt), MBwiEy1DCm (plate B alt), P3E1ctT42C (hand alt), gOIQGbfSXO/1lph6Cqr4r/JNa50tTOq4 (seal: wrong diacritic).
- No video made (painted crossfade A→B instead, allowed by the brief).

## Tests (15/11 ~21:40Z, dev/test/cardflip.js @2, load ~60, one browser)
| viewport | real week end (j75 pick shown) | cards outside floor | picked card on screen / chip clear | 22 cards / 2 cards | reduced motion | old save | errors |
|---|---|---|---|---|---|---|---|
| 755x1000 | custom (rằm → Hoàng hậu), her card turned | 0 | yes / yes | ok (cw 53) / ok | still | loads + scene | 0 |
| 1000x755 | custom | 0 | yes / yes | ok (71) / ok | still | ok | 0 |
| 1180x820 | hers (thị tẩm) | 0 | yes / yes | ok (84) / ok | still | ok | 0 |
| 1366x1024 | hers | 0 | yes / yes | ok (97) / ok | still | ok | 0 |
| 844x390 | custom | 0 | yes / yes (side layout) | ok (40) / ok | still | ok | 0 |
Looked at: hand frame, final (hers) 755/844/1180, 22-card arrangement 755/1180, 22-card final 1000.

## Known / not done
- No corridor video: painted crossfade A→B (allowed by brief). Co-op pick itself is not shared (each player's tablet is rolled locally; the
  scene waits for the merged week so both see it at the same time). Monthly cycle greys only once review/cycle defines inCycle/cycleDaysOf.
- j93 kmFree does not wait for the Tuần lục book (#dawn.kbkdawn); jflip waits itself (busy()). Other j93 pieces may still show under the book.

## Resume
1. Run test: bash dev/site/build_site.sh; serve repo root on a free port; `node dev/test/cardflip.js http://127.0.0.1:PORT/index.html <out> 755x1000,1000x755,1180x820,1366x1024,844x390 2 few`.
2. Look at frames; tune hand position, centre size, caption overlap at 844x390.
3. KIT.md §67 section + register; commit site build; report.

## review/cardflip-smooth (16/11)
Jank + too-fast fix, see KIT.md §67 "SMOOTHNESS + CALM". Measures in dev/measure/cardflip-smooth.md. Timing lives in BAL.cardFlip.turn.

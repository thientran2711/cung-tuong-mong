# Review state — review/night-end-r1 (reviewer, 15/11 ~22:00Z)
Base: origin/main 41cdf7c3f + origin/review/night-end ef0582dd5. Verdict so far: FAIL (worker items below); r1 merge itself is clean.
## Fixes made on r1
- Merge: assemble list = main's + jne.js after jevb; KIT §58/§64/§62 all kept; site rebuilt.
- jne.js: his mood step now also runs in bot / no-UI paths (was UI-only → sims ≠ game).
- KIT §62: owner scene rule (≥1536 px landscape, focal point, portrait crop via object-position) + painted-only effects.
## Checked
- Art on CDN (8 pictures 1024x768): present, beautiful, no bedding act, no faces; cold = gloomy (OK for "dark" rule).
- night-end.js 5 viewports: 0 page errors, no h-overflow; 844x390 card: 1 element offscreen (Nhận button under the fold).
- item-events.js: PASS. kit-page.js: error "Cannot read properties of undefined (reading 'out')" at 1366/844 — compare with main (old.html) pending.
- review/sfx MANIFEST: conflicts textually; resolve as JSON union (sfx values + zither + candle-out); 4 shared mp3 byte-identical.
- Balance: mood ±1 resets monthly (moodMonth / j55), capped (never to giận dữ); outcome of play, not a choice → not a dominant strategy.
## Left
- month-cal.js, ts-oldsave.js (timed out once under load), coop-e2e x3, kit-page on main for comparison.

# mg-visual — SẴN SÀNG KIỂM (branch review/mg-visual d9800e60, main d74f86a5 merged)
PRIORITY #1 CHECK: OD:L1264 + OD 20/11 ~05:10Z | main none (no BAL.mgFx) | review/* none | claims none.
Scope (MAIN ROOT-73/74): A lit cue + press pop on every engine from BAL.mgFx; B Nấu ăn pictures. Word removal in other kinds = mg-noword-a/b (untouched).

## What
- BAL.mgFx (jbal2.js) is the one source: pop 1.24, ms 300, glow #fff0a0, ring white, blur 44, 3 glow passes, ringW.
- j82 kg82Spr: any sprite with `glow` gets the stacked glow, `ring:true` adds the ring; kg82FxPop (scale curve), kg82FxRing (press ring).
- Cook (j91): recipe = painted ingredients + flame icons; tiles picture-only; gauge/pot labels, pops, Quạt lửa button = pictures/symbols.

## Scan: engine | cue before -> after | press scale before -> after
| engine (kinds) | lit cue | press scale |
|---|---|---|
| steps (mua) | glow 30px gold -> stacked glow + white ring | 1.08 -> 1.24 pop, 180 -> 300 ms |
| pattern (ve, hoa, theu, kim) | none -> pop + ring on tapped cell | none -> 1.24 |
| rhythm (dan, hat) | faint 33% column flash -> 55% flash + glow + ring on bridge | none -> 1.24 |
| go (co) | none -> ring on captured stone | none -> 1.24 stone |
| aim (dauho, ban) | none -> ring + glow on marker | none -> 1.24 marker |
| lamp (doden, jlant) | glow in lantern colour -> gold glow + white ring | none -> 1.24 |
| kim knot / hat lotus / hoa branch | glow 16-18 -> BAL.mgFx glow | 1.14 -> 1.24 |
| cook (banh) | n/a (button .on CSS) | recipe = pictures, 0 words |
Not changed (other engines: hold/fling/trace/arrange/untangle/blend and tdwalk etc. have their own drag feedback, not a lit cue): listed for follow-up if the owner still finds one hard to see.

## Tests
dev/test/mg-visual.js ALL OK (BAL values, pop curve, no private scale, Múa ring, banh 0 words; other kinds informational — word table in the earlier scan). mg-ready-guide PASS 9/9. quickcheck PASS (165 s; first run FAIL on buổi 2747 vs live 876 = perf noise, rerun 1054/908 PASS). Site rebuilt and committed (index.html/sw.js).
Shots (scratch, looked): Múa lit cushion Fold 755x1000 = clear gold glow + ring; Nấu ăn iPad 1180x820 = recipe pictures. Other 8 shots in /home/user/wt/shots (not in git, not uploaded to CDN).

## Added by ROOT-74: touch highlight (td_dung "yellow boxes")
Cause: NOT the browser tap highlight (html,body,* already transparent in jclose) — td_dung drew its OWN half-screen yellow rect (rgba 255,224,138,.22 over half the board x 70 % height) while a half was held. Same class: rhythm column flash (tall yellow column per tap, mine from the first pass).
| kind | highlight before -> after |
|---|---|
| td_dung | half-screen yellow box while held -> kit ring + glow + pop on the bowl only (BAL.mgFx) |
| dan, hat (rhythm) | tall 55 % yellow column flash -> bridge pop + glow + ring only |
| all others | no screen-covering touch rect found (scan of fillRect on touch in all engines; static trays are not touch feedback) |
Also added `-webkit-tap-highlight-color:transparent; user-select:none` for #kg82 canvas/buttons (j82 CSS).
Left as is: td_dung full-board cream flash when the bowl spills (stag) — a state flash, not a touch; say if the owner means that too.
Tests after: mg-visual ALL OK (new checks for td_dung + rhythm), mg-ready-guide 9/9, quickcheck PASS (166 s). Shots looked: td_dung Fold 755x1000 + iPad 1180x820 while holding the left half = ring + glow on bowl, no yellow box (scratch /home/user/wt/shots/dung-*.png).

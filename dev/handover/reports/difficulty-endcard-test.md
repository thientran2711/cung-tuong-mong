# difficulty-endcard-test — REAL GAME BUG (option b), no game code changed

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 0 | main dev/test/difficulty.js:77-81 | review/* 0 | archive 0

## Verdict
BUG difficulty-endcard: the test is NOT stale. On origin/main 9f72524b every life end card (all difficulties, all origins) has lost
its Phúc duyên ending line and its "Độ khó" row. The test is the only thing that noticed.

## Root cause
jend.js (KES end screen; a21eaa11 / 350ca1a9 family) rewrites the end card class at over() time:
`m.cls = "end kes kes-<tone> kes-t-<type>"` (kesMark, jend.js:54). Five end-card hooks still match the OLD exact class:

| file:line | matcher | what silently stops working |
|---|---|---|
| dev/build/j52.js:75 | `m.cls==="end"` | "Kiếp này được +N Phúc duyên (kết cục ...)" line + the pdSet bonus (observed gain 0) |
| dev/build/j69.js:43 | `x.cls==="end"&&x.pd` | hard-origin (+10 / +20) bonus + its line (needs j52's m.pd) |
| dev/build/jdiff.js:68 | `x.cls==="end"` | "Độ khó" row + ×1.5 Khó extra line (M never found) |
| dev/build/jkiep.js:28 | `x.cls==="end"` | unfinished-life Phúc duyên rewrite |
| dev/build/jrank.js:82, :88 | `x.cls==="end"` | krk-end rank block refresh / track |
| dev/build/jkc.js:508, jkc2.js:437, dev/test/mortality-ui.js:18 | `m.cls==="end"` | filters that would drop/keep the wrong cards (same class) |

Fix direction (for whoever owns game code): match `/\bend\b/.test(cls)` (kitEndType in jend.js:40 already does) — one shared helper
`isEndCard(m)` used by all of the above, then rebuild with dev/build/assemble.py + dev/site/build_site.sh. Test dev/test/difficulty.js:79
also needs the same regex once the game is fixed (it is `x.cls==="end"` too, so the test fails for the same reason; leave it as is,
it is correct in intent).

## Repro (live main 9f72524b, node dev/test/difficulty.js <url> 1180x820)
1. New life, accept identity, `S.diff='kho'; over("Qua đời","Thử kết kiếp.","bệnh")`.
2. `Q` holds one card with cls `"end kes kes-mourn kes-t-death"`; `Q.find(x=>x.cls==="end")` is undefined.
3. Card HTML has only the "Kiếp này" section (Thân phận, Sống trong cung, Phẩm cao nhất, Con cái, Chết vì) and `<p class="past">Chết là hết...`:
   no `krl>Độ khó`, no `pdend` paragraph, `pdGet()` gain = 0. lifeLog()[0].f = "bệnh · Kiếp này: Khó" (that part still works).
4. Result `{"row":false,"line":false,"gain":0}`; all 12 other cases of the file pass (11 ok + no page errors).

## Shots
Fold 755x1000 and iPad 1180x820 end card were captured to scratch (not in git). Both show the ink-reveal animation still playing
after 12 s in headless, text unreadable, so they add no evidence; the DOM dump above is the proof. Not uploaded to the CDN.
Same family check: scan above lists every `cls==="end"` in dev/build and dev/test (law 11 before/after table = after the fix: 0 exact matches).

## Handover
Session used ~15 % of context, nothing in flight. Owner decision needed: who fixes game code (Foreman F / main) — worker did not.

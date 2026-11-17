# review-presentation-wiring-r1 (reviewer r1, 11/17/2026)
PRIORITY #1 CHECK: report presentation-wiring ROUND 3 read | review/presentation-wiring cd9dce81 (only branch on this job) | main 4719d424 (batch-0415) | name-clash scan tool + KIT 68.8 reused | nothing new built.

Reviewed review/presentation-wiring @ cd9dce81. It was on old main (bad6d59f), so I merged current origin/main (4719d424), rebuilt (only generated files conflicted) -> review/presentation-wiring-r1 @ bc8461cc (= merge + one small fix, below).

Checks
- Name-clash scan (python3 dev/tools/name-clash-scan.py origin/main): 157 now / 157 on main, 0 new clashes.
- KIT-FIRST scan of kitEdictOpen + seal, my own scan on real cards, shots looked at by me at 755x1000@2 and 1180x820@2 (never committed):
  - court (cat trieu-chinh): ent=scroll, edict:open, scroll unrolls, then the card opens from its middle line; no ghost left.
  - tan-phong: same. Main story ("Chinh tuyen"): same. Side story ("Phu tuyen") and plain cards: no entrance (as designed).
  - contest ("Ket qua tranh ghe"): its picture resolves to category tan-phong, so it ALSO unrolls like an edict and then gets the seal (same kit part, same look).
  - exam verdict: seal fires (KPM_LOG seal=1 through exDone); my synthetic exDone opens no toast, so the stamp position was not seen.
  - No page errors, no horizontal overflow, no leftover .kfxk-g after 2.4 s at both sizes. Gon = nothing.
- Figure animations (test --shots, Fold): poison green tint + blur reads; die = silk falls over the figure; pregnancy pink rim round the figure (face clear); slap flush very subtle at a still frame (worker already noted); join / drag not visible at the captured frame.
- node dev/test/presentation-people.js: ok:true at 755x1000@2 and 1180x820@2 (the 1180 run failed once on hooks.preg=0 and passed on rerun: that hook depends on the random scene, the test is mildly flaky).
- quickcheck bc8461cc vs live 4719d424 (--runs 5): PASS, open 1262 ms, old save loads and plays a buoi, core gates PASS, time-spill PASS, perf medians new/live: render 242/247 ms, tab 321/319, buoi 920/965 ms (-4.7 %, gate +5 % met), tasks>200ms 12/11.

Small fix I made (bc8461cc): dev/kit/KIT.md had NO section 68.9 (kitEdictOpen was only in code + the kit page sample, although the report said it was in KIT.md). Added 68.9 (part, who calls it, which cards, seal moment, origin placeholder). Site rebuilt.

Residuals (not blocking)
1. KIT-FIRST letter: the main-story origin "double rule" (jpres.js #kpres-css, inset box-shadow in the origin colour, KPO table) is a private frame style on a kit dialog. It is an explicit placeholder until ART REQUEST A1 (9 painted frames) lands, then KPO_ART replaces it. Accept as placeholder, or move the rule into the kit frame part.
2. Seal moment: it fires (kitFx "seal" = lock vibration + shake + up to 3 faint ink blots, jfx FX table), but in 90 ms frames I saw no ink and no shake on the contest card (dark-pixel count in the card region unchanged across 7 frames). Wiring is right; the kit effect itself is very subtle. If the owner wants a visible stamp, strengthen kitFx "seal" (kit side) or show the Thanh/Bai seal sprite (.kmseal, j93).
3. Slap flush is a short jolt, near-invisible at a still frame (known).
4. The contest result card is the one card where unroll + seal stack.
VERDICT: PASS bc8461cc

# cardflip-glow — review/cardflip-glow (base origin/main a942395)
Owner bug: after the flip the light sits in the middle of the portrait and hides the face; animation still too fast.
Places using the reveal glow on a portrait (listed first): only the card-flip scene `kitCardFlip` in dev/build/jflip.js (both cases: her card "me" and another consort's card) — `glow()` (kitFxLight glow-gold on the card) and `burst()` (glowburst + 18 sparks at 38% height). grep: no other caller of that glow on a portrait (the wider §68 lights/bursts on other screens are not portrait reveals).
Fix (kit part only, KIT §67 updated):
1. `edgeLight()` replaces glow()+burst(): 14 painted glowburst sprites (kitFxObj, §68) circle the frame ring centre line; sparks fly outward; nothing over the portrait window. Gọn/reduced: static ring.
2. Slower ≈1.75×: BAL.cardFlip.slow=1.75 on all hard-coded motion + CSS (--kcf-s); t/turn/hold retimed (reveal 6.1 s -> 10.7 s, end 8.5 s -> 14.9 s). Tap-to-skip, Gọn, others ×.82 unchanged.
Tests: node dev/test/cardflip.js 755x1000,1180x820 (dpr 2, few): no errors, cards inside floor, picked card on screen, chip not over card. cfDemo(14,3,'me') and cfDemo(14,3,5) at 755x1000 recorded; reveal frames at 755x1000 and 1180x820 looked at: face fully visible during and after the reveal (the seal THỊ TẨM keeps its old lower-right spot over the band).
Videos: dev/handover/reports/cardflip-videos/cardflip-me-v2.mp4 (1.4 MB), cardflip-other-v2.mp4 (1.2 MB). Headless software GL, 755x1000 DPR 1. Real-device fps still unmeasured.
Not run: 1366x1024, 844x390 (only the asked two sizes; the edge ring is relative to the card so geometry is size-independent).

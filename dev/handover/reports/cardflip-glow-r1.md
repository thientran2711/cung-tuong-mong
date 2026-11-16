# cardflip-glow-r1 — review of review/cardflip-glow @ 68084205 (delta vs kit-keeper-2 d131e1d8)
Verdict: PASS 68084205 (pending merge of main after kit-keeper-2-r1 is live -> READY line to main s14).
START_CTX ~5%.

Checked (file:// build of the worktree, Playwright software GL, dpr 2, cfDemo(14,3,'me') and cfDemo(14,3,5), frames every 1.2 s from the reveal):
- 755x1000, 1180x820, 1366x1024, 844x390, 412x1058: light = gold glows on the frame ring, sparks outward, nothing over the portrait window; face clear in every frame. (412x1058 shows the normal rotate prompt over the scene.)
- Slower: reveal at ~10.9 s (her) / ~9 s (other) vs 6.1 s before; end button ~15.7-16.7 s / ~12 s.
- Button: "Chuan bi thi tam" when she is picked, "Ta biet roi" otherwise; kit part kitSceneEnd (KIT 81); chip does not overlap the button (chipOverBtn=false at all sizes); a tap does not close (tapKeepsOpen=true), closing only via the button (closedByBtn=true); 4 s after the button the scene is still open; no horizontal overflow.
- No page errors (only file:// fetch of audio/VOICES.json, a test artifact).
- Kit consistency: edgeLight uses kitFxObj/kitFxSprite (KIT 68), button = kitSceneEnd; no private frame/chip/button. Only caller of the portrait reveal glow is kitCardFlip.
- Notes (not FAIL): stale comment "final still before it closes by itself" after CF.edge in jflip.js; dev/test/cardflip.js hung at the game-start loop in this container (own script used instead).
Videos for the owner: dev/handover/reports/cardflip-videos/cardflip-me-v3.mp4, cardflip-other-v3.mp4 (755x1000 dpr1, includes ~5 s of setup at the start).

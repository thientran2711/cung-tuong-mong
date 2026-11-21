# mg-noword-care — SẴN SÀNG KIỂM (review/mg-noword-care 5fde6816, from main f13dc915)
PRIORITY #1 CHECK: OD 20/11 ~05:10Z + 21/11 00:50Z (guiding words stay) | main: mg-noword-a/b/kit LIVE | no claim on thu_tam/thu_choi/tuoi.
FAULT: mg-noword-kit FAIL 3 kinds (thu_tam, thu_choi, tuoi). Ran over ALL 38 kinds: only these 3 had kit (non-canvas) words; canvas words of other kinds are guiding cues (kept, OD 00:50Z).
Scan before -> after (DOM words in play): thu_tam «Thường» grade chip on stroked cat -> none (grade:null); «Đã vuốt 0/5» -> 5 dots; thu_choi «Hồi 0/3 · trúng 0» -> 3 dots (round count; hits live on HUD score); tuoi «Lần 1/3 · đã đổ 6/10 · vừa đủ: 6–8» -> 10 dots, filled = water, green-ringed = right zone; tuoi button «Dừng tưới» -> ● sign (word in title/aria); Tắm tutorial «Đã vuốt n/2» -> 2 dots.
Code: NWB.cnt (jnwb.js), jpetcare.js, jshelf.js. 
Tests (rebuilt index.html): mg-noword-kit PASS 38 kinds 0 words; mg-noword-b ALL OK; mg-noword-a errors []; mg-allkinds 13/13; mg-ready-guide 9/9; quickcheck PASS (open 2224 ms, old save ok); coop-e2e 92/92. Fold 755x1000 + iPad 1180x820 shots of all 3 looked (dots, ● button, green band readable, no chip). Shots not in git.
Left: td_hanh KNOWN in test (portraits, group b); mg-intro-2 tests not re-run separately (branch not in main yet).

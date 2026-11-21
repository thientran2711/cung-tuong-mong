# rv-mg-intro-2 — re-merge review (small reviewer, Sonnet)
PRIORITY #1 CHECK: reviewed review/mg-intro-2 head 570ec621 (code 2bff694c) against the 18 laws touched (kit first, fix whole group, 2 devices, cổ trang wording); nothing duplicated.

## Result: PASS
Merged sha **847a5934957c91a091b6f83bc8a2f610b55eb503** pushed to review/mg-intro-2-rv3 (= 570ec621 + origin/main ce99b707; only conflicts index.html/sw.js, rebuilt with dev/site/build_site.sh; j-files merged clean).

## Conflict resolutions (2bff694c) checked
- j79.js: identical to main 74cea8bf (kitNoteBang = main's, has title arg). OK.
- jshelf.js: vs main differs by 1 line only = `ev:false` added to the kgReady call; main's `W,env` kept. OK.
- jnwb.js: base 068662ad→main had NO change; branch removes exactly the 145-line NWB_DEMO block (nothing else); no NWB_DEMO left in dev/build or dev/test. Nothing of mg11 lost.
- mg-intro-2's own #55 work present: j82.js intro (kgBangRows, «Phần của ngươi» short, rivals behind «!»), jentry/jexam/jpetcare/jtd/jshelf deltas intact vs main.

## Gates on 847a5934957c91a091b6f83bc8a2f610b55eb503 (rebuilt with ce99b707)
mg-intro-2 ALL OK (Fold 755x1000 and iPad 1180x820) · mg-ui-rest 39/39 · mg-allkinds 13/13 · mg-noword-a 0 FAIL · mg-noword-b ALL OK · mg-ready-guide 9/9 · coop-e2e 92/92 · quickcheck PASS (193 s).
mg-noword-kit «FAIL 3 kinds»: reproduced on clean origin/main ce99b707 → pre-existing, not from this branch (note: still unfixed on LIVE; owner of pet/plant care text should take it).

## Looked (Fold + iPad): contest intro (Thất tịch) and mini-game intro
Event picture on top, no rules-demo picture, 3 kit «!» (luật / phần của ta / đối thủ), «Sẵn sàng» + «Hướng dẫn» + quick button, rules pop-up opens from «!», no overflow. Kit parts only; wording cổ trang (no %).

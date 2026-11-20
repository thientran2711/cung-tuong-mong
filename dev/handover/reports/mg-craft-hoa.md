# mg-craft-hoa — Cắm hoa «Chọn mùa · cắt cành · nghiêng thế»
PRIORITY #1 CHECK: OD 20/11 ~08:15Z (each craft own mechanic), ~05:10Z (no words) | main k91Arrange j91:322 (old rings) | review/mg-craft-design 54ad4544 | claims: lead mg-craft.
START_CTX ~8% (session start). Branch review/mg-craft-hoa @ e8b6e7f9 (from main 70bea3d3). NOT yet merged with the lead's scaffold.
## What
- dev/build/jcraft_hoa.js: engine hoacraft (kcHoa), registered + KG82_KIND.hoa re-pointed (lead's j91 re-wire block should replace my 2 lines at the end of the file); assemble.py order after jmgt.js.
- Flow per vase: tap season flower (wrong one wilts, season share -) → swipe-cut stem to vase ratio → drag into vase mouth → drag tip to lean. 3 vases (3/4/5 stems + mgMore). ✓ judges; stars as picture. No text in play (test: only the ✓ sign).
- BAL: BAL.mgTier.lev.hoa {ghost,cutTol,angTol,alike,sway,limStem} + BAL.mgTier.hoa {n,thien,k,guest,ang,cut,zero,seat,w,wrong,balTol,judgeMs} (jbal2.js after BAL.mgFx; Object.assign into lead's lev.hoa block if it exists).
- Season flower aid in the window = lev.hoa.ghost (hidden at hardest ease: she must know đông mai, hạ sen, thu cúc, xuân đào; the rules text says so).
- Stand-in art on canvas, canvas.dataset.tam="hoa" (no visible word).
## Tests
dev/test/mg-craft-hoa.js (Fold 755x1000 and iPad 1180x820: ALL OK): contest caller rules screen, Hướng dẫn ghost hand, Sẵn sàng, oracle full play, wrong pick costs season share, ≥9 at ease 5, no text, no page errors.
Measure (skilled bot, n=6, ease → mean raw): e0 7.35 · e2 8.93 · e5 9.44 (law 5 holds). Old rings board not re-measured; before-table, random bot (0 everywhere) and full set (quickcheck, one-core, mg-ready-guide all kinds, co-op) NOT yet run — need lead's scaffold merge first.
## Open
- KIT REQUEST KG82_DEMO "cut" filed (KIT_REQUESTS.md); rules picture uses "drag" (tạm), switch one line in jcraft_hoa.js.
- Callers reaching kind hoa: startContest (art "hoa"), Thử tay mgCalRun("hoa"); playArt/lessons map hoa→ve. Full caller scan with lead.
- Shots: iPad rules shot caught the boot cover, redo; shots kept outside git (scratch), not uploaded to CDN yet.
- ART REQUEST (Foreman C): 4 season window views, 6 stems x 4 seasons uncut with bloom, 3 vases (bình men lam), cut-end sprite.
## Handover (if rolled)
Next: merge review/mg-craft (SCAFFOLD READY) into review/mg-craft-hoa, move knobs into lead's block, add cases to dev/test/mg-craft.js, run full tests, upload shots, then SẴN SÀNG KIỂM.

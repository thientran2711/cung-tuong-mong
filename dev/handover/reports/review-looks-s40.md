PRIORITY #1 CHECK: OD 0 new (brief cites 00:13Z/00:08Z/23:20Z/23:40Z + owner "smaller grains") | main none | review/* toil-looks5 c52cb985, tuyet-glow 1c4ea403 (v8; replaces 7e80f3cd), makeup-lux-r2v 0e6489f6 (not in main) | claims MAIN s40 reviewer
# review looks-s40 — PASS 4cdcffa9
Branch review/looks-s40 = origin/main eb3675a6 + toil-looks5 c52cb985 + tuyet-glow 1c4ea403 (v8, BAL.toil.glow.size .72). Conflicts only in generated index.html / sw.js / assets.json (taken from main, rebuilt with build_site.sh); jtoil.js auto-merged. makeup-lux-r2v not in main: no r2 recipe.
## Tests (on 4cdcffa9)
- quickcheck PASS (322 s): core gates PASS, old save loads, open 1083 ms, perf new/live median render 137/119 (single noisy run; earlier same-content run 108/117), tab 270/254, buoi 590/637.
- toil-draw PASS 10; toil-tease 0 fails; toil-overlay iPad bad 0 (Fold earlier bad 0); toil-react 0 fails (v7 run); toil-allday only the 28x38 kpor entries, same on live.
- Glow perf (render() micro, Khuynh thanh, median of 7, two passes): v8 on 28.1 vs off 26.8 ms (+5 %); earlier v7 run 40 vs 34.
## Looks (scratch shots, branch fit table injected from dev/art)
Fold 755x1000@2/@4 and iPad 1180x820@2, face c11-tcold-a18, Doan trang 60 / Kieu diem 60 / Khuynh thanh 80, pink + warm sets: lips on the mouth in all cells, no colour outside the face, no page errors. v8 grains are visibly smaller than v7; burst frames show stars on lid, cheeks, chin, none on lips. Minor: in two burst frames one star sits right on the face edge next to the hair/ear line (cheek 490,400 and temple 1180,130 in my crops); not on lips, owner may judge.
## CDN files that must go with the landing (python3 dev/site/cdn_sync.py ...)
img/mk-fit/consort-c01.json .. consort-c32.json (32) + img/mk-fit/player-look1.json .. player-look4.json (4), from dev/art/mkfit/, plus img/toil-fit2.json (from dev/art/toil-fit2.json) = 37 files. Without them the lips drift 5-8 % left of the mouth (c05).
## Cleanup
No CDN review folder used; scratch shots local only.

---
# r2 — re-merge onto main 3da5720a (makeup-lux r2v live) — PASS f6ee11b1
PRIORITY #1 CHECK: OD main s41 order 01:08Z | main 3da5720a (makeup-lux) | review/looks-s40 4cdcffa9 (previous PASS) | claims MAIN s41.
Merged origin/main 3da5720a into review/looks-s40 (FF-compatible: main is an ancestor). Conflicts: index.html/sw.js/assets.json = generated (taken from main, rebuilt); dev/build/jtoil.js 5 hunks resolved per review-makeup-lux §r2: lv/lvBase kept (main side); BAL.toil keeps toil-looks5 level/blush/vung numbers WITHOUT allow/diemOdds; toilLookOf tail = tl5 (score>=tier[2] -> tuyet, no diem roll); tease = tl5 wording, condition L.dv==="diem"||L.mk==="vung", Diem text "an van diem dua"; TOIL_LOOKS = tl5 table minus diem (vua/dep/tuyet(glow)/vung) + main's toilArt; toilLookRec by LEVEL: toilMk(r) -> moc ? null : toilArt(k); toilLookOfP from main. TOIL_MKS (colour-layer table, still has its own diem row) untouched.
Tests on f6ee11b1: quickcheck PASS (278 s; core gates PASS; old save ok; perf new/live render 134/130, tab 228/230, buoi 589/583); one-core-guard/text/text-rule/bind PASS; makeup-lux, makeup-theme, toilette Fold + iPad PASS (no fails, no overflow, no errors); toil-tease 25/25; toil-overlay Fold+iPad bad 0; toil-react Fold+iPad 0 fails; toil-draw PASS 10; coop-toil-look 29/29.
Looks (Fold 755x1000@3, iPad 1180x820@2, pink + warm sets, Doan trang 60 / Kieu diem 60 / Khuynh thanh 80 with level driven by score 50/75/92): lips on the mouth, ladder reads, no leak outside the face, glow layer present on Khuynh thanh only. Note: a test that sets a fixed score (not the level) now gets the level from the score (my first sampler pass used score 30 = vung, fixed in the sampler, not a code fault).
CDN with landing: same 37 files (img/mk-fit/consort-c01..c32.json, player-look1..4.json, img/toil-fit2.json).

---
# r3 — + hoa-dien r3b 8b2468cb (main s41 order 01:18Z) — PASS 347a8ee8
PRIORITY #1 CHECK: OD 18/11 tail (hoa dien rulings, named in order) | main 3da5720a | review/looks-s40 f6ee11b1, review/hoa-dien-r3b 8b2468cb | claims MAIN s41.
review/looks-s40 347a8ee8 = origin/main 3da5720a + toil-looks5 + tuyet-glow v8 + hoa-dien r3b (main is an ancestor). hoa-dien merge: only generated index.html/sw.js conflicted (taken from main, rebuilt); jtoil.js auto-merged with no conflict (both sides kept; result row 'Dan hoa dien' present); assemble picks jhd.js after jlux.
Owner rulings checked in code (jhd.js): up .38 (BAL.hd.up); sizeByRank .115/.115/.115/.125/.125/.135/.135/.135 (Dap ung..Quy nhan 11.5, Tan/Phi 12.5, higher 13.5); tone = saturation only, sat .85, metal kept, no darken/white/opacity; drop ["hd_mai","hoadien_bac"] TEMP kept (old-save migration test ok); gradient designs kept.
Tests on 347a8ee8: quickcheck PASS (278 s; core gates incl. one-core-guard/rules-one-source/kit-conform PASS; old save ok; perf new/live render 127/124, tab 243/270, buoi 628/600); one-core-text/text-rule/bind PASS; hoa-dien.js Fold mouse ALL OK, Fold touch (TOUCH=1) ALL OK, iPad ALL OK (no overflow, no page errors, old save migrates); toilette, makeup-lux, makeup-theme Fold + iPad PASS; luxury PASS (all 8, no page errors); toil-tease 25/25; toil-overlay, toil-react, toil-draw PASS; coop-toil-look 29/29.
Looks: hoa-dien test shots Fold 755x1000@2 and iPad 1180x820@2 of the stage with hoa dien placed, forehead zoomed 3x: crisp sprite edges, no blob, no petal drawn over it, small at rank size (11.5 %). Previous looks sheets (lips, ladder, glow) still hold after this merge only through the tests above (no new look code touched).
CDN with landing: same 37 files (img/mk-fit/consort-c01..c32.json, player-look1..4.json, img/toil-fit2.json); hoa-dien adds no CDN JSON.
Scratch shots only, none in git/CDN.

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

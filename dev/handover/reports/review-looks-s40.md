PRIORITY #1 CHECK: OD 0 new (brief cites 00:13Z/00:08Z/23:20Z/23:40Z) | main none | review/* toil-looks5 c52cb985, tuyet-glow 7e80f3cd, makeup-lux-r2v 0e6489f6 (not in main) | claims MAIN s40 reviewer
# review looks-s40 — PASS 9bce35b8
Branch review/looks-s40 = origin/main eb3675a6 + toil-looks5 c52cb985 + tuyet-glow 7e80f3cd. Conflicts only in generated index.html / sw.js / assets.json (taken from main, rebuilt with build_site.sh); jtoil.js auto-merged, no conflict. makeup-lux-r2v is not in main, so no r2 recipe needed.
## Tests
- quickcheck PASS (305 s): core gates PASS (one-core-guard, rules-one-source, kit-conform, coop-one-world, anchor/mk-layer scans), old save loads, open 1135 ms, perf new/live median render 108/117 ms, tab 237/221, buoi 514/528.
- toil-draw 755x1000 PASS 10; toil-react 0 fails; toil-tease 25 n, 0 fails; toil-overlay Fold + iPad: bad 0; toil-allday: exit 0, only the tiny 28x38 kpor entries flagged, identical on live (pre-existing).
- Glow perf (render() micro, Khuynh thanh, 7 runs median, two passes): glow on 40/36 ms vs off 34/27 ms (+6..9 ms absolute). Full room render in quickcheck is not above live (108 vs 117), so the glow stays under the 10 % room budget; flagging that the micro delta on the face layer alone is larger in percent.
## Looks (scratch shots, not in git/CDN; branch fit table injected from dev/art)
Fold 755x1000@2 (+@4 close-up) and iPad 1180x820@2, face c11-tcold-a18, Doan trang 60 / Kieu diem 60 / Khuynh thanh 80, pink set and warm "Cam anh do" set: lips sit ON the mouth in all 12 cells; blush on cheeks, no colour outside the face; Khuynh thanh glow burst stars land on lids, cheeks, chin and jaw, none on the lips; no page errors. Kit: no new private UI.
## CDN files that must go with the landing (python3 dev/site/cdn_sync.py ...)
36 files img/mk-fit/: consort-c01.json .. consort-c32.json (32) + player-look1.json .. player-look4.json (4), from dev/art/mkfit/ (differ from origin/main), plus img/toil-fit2.json (from dev/art/toil-fit2.json). Total 37 files. Live CDN still has the old table until then; the CDN-side manifest rows for these must be uploaded in the SAME landing or the lips drift (5-8 % left of the mouth on c05).
## Cleanup
No CDN review folder used; local scratch shots only.

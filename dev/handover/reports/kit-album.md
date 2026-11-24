# kit-album review (KIT §100 + §100.1 kitAlbum)
## REVIEW r1 (small kit reviewer, 11/24/2026) review/kit-album 716310c2
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims KK22 | main none | review/* review/kit-album (716310c2; main 502c48c9-era parent, origin/main 225c5c08 is an ancestor) | brief b-kit-batch-2041-review.md.
**VERDICT: KIT FAIL kit-album r1 -> KK22** (3 rows; the seal itself is right).
### Checks
- Missing card = SVG seal (ring + diamond + dot, no text) on Fold 755x1000 and iPad 1180x820 shots: OK, no «?» anywhere (test fails on «?»; `missBad 0`).
- Law 9/11 scan: `git grep -n "kitAlbum|album" dev/build` outside jkalbum.js = no other album place on this branch (old moBookHTML lives on review/moment; Foreman E is to swap it) → one kit part, no private album. Staging is written in KIT §100 last sentence (worker swaps moBookHTML, BAL.mo.album=1): OK.
- Law 10: all cards one size per device (Fold 129x233, iPad 133x239), names wrap, no clipping (`clip 0`), grid 4 columns Fold / 6 iPad.
- `DSF=2 node dev/test/kit-album.js file://…/index.html out 755x1000,1180x820` on a LOCAL build of the head: both ALL PASS.
### FAIL rows for KK22
1. Head index.html/sw.js NOT BUILT: committed index.html has 0 hits for kitAlbum and kalb-seal; `bash dev/site/build_site.sh` rebuilds it (sw.js V changes). Commit the built files.
2. KIT.md §100 (line 4685) still says MISSING = «veiled empty card (hatch + «?»)» while §100.1 says never «?» → two versions side by side (law 14, canon overwrite). Rewrite §100 to «seal».
3. Test shots are under a veil: both album shots show the title menu modal («Cung Tường Mộng», Chơi một mình …) behind/under the album panel on Fold and iPad; the test must hide/close #modal (use dev/test/lib/veil.js V.guard or the kit-pick.js pattern) and assert it before each shot. Note: owned cards in the sample show an empty beige frame (no painting) — fine for a mock, but the kit page sample should show one real painting so «owned vs missing» is judged on a real picture.

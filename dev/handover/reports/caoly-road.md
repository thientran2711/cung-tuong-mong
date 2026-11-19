# caoly-road — Nam Chiếu princess road → CAO LY (E20, sonnet)
PRIORITY #1 CHECK: OD 3 (~06:40/06:42/06:50Z + FIGURE_GATE «LƯỢT 283») | main j71.js:238 court event untouched | review/* 0 | claims: E20 (this) | source reports/foreign-princess-3-history.md §0/§A.1/§C.1/§C.4/§E/§F.
Branch `review/caoly-road` @ **30d7cca8** (from origin/main 5400c87b), site rebuilt. Laws touched: 1,2,3,4,6,7,11,14 checked.

## What changed (in place, law 14; legacy ids nc_* / save keys kept — Foreman ruling 1)
- NCL.nc tokens: land Cao Ly, mh Vương hậu, pa Thế tử huynh, pb Vương thúc, canh canh rong biển, laq lá tía tô dại, nden thắp đèn Nhiên Đăng; NEW token `{kha}` (nc "Phác", bd "Kha": chapters are shared with the bd branch, so bd text is unchanged). `jnroad.js` tx() learned `{kha}` (NRASK asks are static).
- j67 .4 arcs (nc_gian/su/tuc/vuong), j4 stub, j97 rares, jrd_nc (s5 áo thêu hạc), jkc2 home phase (Khai Kinh, Hưng Vương tự, bến Lễ Thành, Nhiên Đăng hội, hoa mai, sâm/giấy/lụa market, nhẫn khắc hạc), joi/jentry/j1/jorigins origin lines, j96 thanh-mai (Phó sứ Cao Ly, Kim/Phác/Thôi, vòng bạc hoa mai), j72 fam_nc letter, jhall HALL_NC = «Thọ Xương cung» (invented, ruling 3), jgedata/jgedata_w2/jgecat endings, jnrask_b.
- Swaps: peacock→hạc (váy/áo thêu hạc, hạc vũ, «con hạc của ai gia»), voi trắng+ngọc bích→nhân sâm+ngựa+gốm phỉ sắc (fake jade→fake ginseng rễ cát cánh), múa voi→kiếm vũ, cá nướng lá chuối→canh rong biển+cơm nếp, thuốc đắp→cao nhân sâm (rf «quá nóng»), té nước→Đoan ngọ đu dây, Nhĩ Hải/Sùng Thánh→Khai Kinh/Hưng Vương tự, sông Lan Thương→Áp Lục, ba châu→ba thành bên sông Áp Lục, phương nam→phương đông.
- 3 MEANING changes: (a) «Học chữ Hán… gà bới» → «Giọng đọc Đại Hy»: Thái hậu's sneer = bắt chước quá giỏi mà lễ lạ; option «luyện vận luật và giọng Đại Hy»; «chữ Nam Chiếu» → «khúc hương ca mượn âm Hán». (b) Yunnan images → Cao Ly (above). (c) Hoàng huynh→Thế tử huynh, hoàng thúc→Vương thúc; 'man nữ/man di/rợ' (nc) → «con bé Hải Đông bắt chước» / «bắt chước». Origin text «người ngoại tộc» → «người nước phiên» (arc TITLE «Người ngoại tộc» kept: art manifests key on it).
- One dependency touched outside the nc files: **j55.js:162** (court-news hook that regex-reads j4's war strings) now matches «Cao Ly» (else the hook silently died). Nothing else in j54/j55/jht/jct2/jk2b/jroad/jrdhp changed; j71.js:238 and Nam Chiếu court/random events KEPT.
- Laws: options unchanged in value (2/3) — each renamed option keeps its win/loss lines; 6b lão Kha → lão Phác is still the same Story NPC; 6c props are narrative/own-garment (áo thêu hạc stays «áo của mẹ»), no new objects; no numbers touched (4); no UI/kit (9); no %.

## Tests (on this build, host 127.0.0.1)
- ge_guard check.py ERRORS 0; ge-guard.js 6/6 (every renamed option label matches a real option); one-core-guard PASS; npc-roads-tokscan 71 roads, titleBad 0 tagBad 0, errs 0; kc-roads/scan.js nc,bd runs (test strings updated to Thế tử huynh/Vương thúc); goods-scan updated.
- NEW dev/test/caoly-oldsave.js: Nam Chiếu life built on MAIN (40 months, mid-road ch.12) saved → loads in this build, plays 60 buổi, reads Cao Ly everywhere, no Nam Chiếu / chim công / voi trắng / hoa trà / Hoàng huynh on any panel, no page errors: **7/7 PASS**.
- road-full.js (nc_*): NOT completed — Chromium «Target crashed»/timeout in this container (2 tries, one alone). Substitute: oldsave test plays the nc road to ch.12 + tokscan. Reviewer may rerun `road-full.js <url> 1 nc_tuc,nc_vuong` on a bigger box.
- build_site OK; media-check/img-allowlist OK. VANPHONG: no %, no «Chắc chắn» in added lines (script).

## Scan before/after (law 11)
Script `dev/measure/caoly_scan.py` (hits) + `dev/measure/caoly_table.py origin/main` (full before/after list, 241 rows incl. kept with reason; run it in the branch). Per file: j67 28→0 · jrd_nc tokens+s5 · j97 10→0 · j4 13→0 · jkc2 27→0 · joi/jentry/j96/jorigins(nc)/j1/jhall/jgecat/jgedata/jgedata_w2/jnrask_b/j72 → 0 Nam Chiếu/Yunnan hits. KEPT: j55:162 (updated hook), j71:238 court event, jbal/jorigins comments, generic Đại Hy goods (jshelf quạt lông công, jwkr bình hoa trà / lá chuối cake, jtds dầu hoa trà, ngọc bích trâm items, jmark), bd rows (Ba Tư worker's).

## FOR C (draw nothing)
Cao Ly princess nc2 costume: short jacket (jeogori-like, no Joseon silhouette) + high-waisted long skirt, low chignon with binyeo hairpin, NO gauze veil; mother's robe with embroidered CRANE (was peacock-feather); crane-motif props (cloud-and-crane celadon vase, hạc vũ dance pose); Thế tử huynh / Vương thúc / Phó sứ in Goryeo-era court robes (no gat); envoy surnames Kim/Phác/Thôi; sâm hộp, giấy mật quả, phỉ sắc bowl as gift props (replace white elephant / jade). Home scenes: Khai Kinh palace (Thọ Xương cung), Hưng Vương tự bell, Lễ Thành river port, Nhiên Đăng lantern night, Đoan ngọ swing. Scene keys nn*/origin-wide-nc images exist for Nam Chiếu look (lake, 3 white towers, peacock) → need Cao Ly repaints.

## Open notes for Foreman E
1. Shared chapters .5–.11 serve bd too: Ba Tư worker uses NCL.bd row (incl. `kha`); 'tấm da sói / người rợ' bd beats untouched.
2. «Nữ vương Cao Ly» rare ending (j97 nc_vuong) is drama, not history (Goryeo had no queen regnant) — kept per «keep almost whole».
3. Name «Thọ Xương cung» invented; [D] renderings checked for cổ trang tone.
4. Rollover: not needed (context low).

## ROUND 2 (E20, after E20r FAIL 30d7cca8) — branch @ **10c432fa**
- Merged LIVE main d9b32074 (only index.html/sw.js conflicted → rebuilt).
- FIX 1: jkc2.js end — `kc2MigNc()` wrapped around `deser` (nc life only, bd untouched): S.kc.fam titles «Hoàng huynh»→«Thế tử huynh», «Hoàng thúc»→«Vương thúc», «Mẫu hậu»→«Vương hậu» (ids/keys unchanged) and every stored string of the princess road's thanh-mai (role «Phó sứ Nam Chiếu» → Cao Ly). Family scan (law 11): dumped a full ser() of an old nc HOME life and an old nc palace life from main, walked every string for Nam Chiếu / Hoàng huynh / Hoàng thúc / chim công / voi trắng / hoa trà / Nhĩ Hải / Sùng Thánh / Quân Ân / man di / lão Kha. Before: S.kc.fam.2.t «Hoàng huynh», .3.t «Hoàng thúc», (me «Mẫu hậu»), S.men[*].role «Phó sứ Nam Chiếu», S.logs line «…vương cung Nam Chiếu…» (past log = history, left as written). After load: all migrated except the log line; palace-phase save had no other stored hits. Court-event Nam Chiếu envoys in S.men are NOT touched (migration matches only the thanh-mai role).
- caoly-oldsave.js: NIT-4 fixed (check 1 uses old.land) + CASE B (home phase on main → load → titles migrated, ids unchanged, no Nam Chiếu in S.men/panels, 40 buổi, no errors): **14/14 PASS**. one-core-guard PASS, ge-guard 6/6.
- NITs left to E (not blocking): NIT-1 {kha} by asker origin; NIT-2 jgedata «tấm da» (bd beat); NIT-3 scene art (FOR C).

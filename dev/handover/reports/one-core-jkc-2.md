# one-core-jkc-2 — «thiếu bạc (cần N)» price locks + text↔rule amounts + game-wide odb

PRIORITY #1 CHECK ('thiếu bạc cần' / 'odb' / 'fx both'): OD ONE CORE OD:L1267 | ledger 0 | claims CLAIMS:838 = this session (B, successor of one-core-jkc #1 session_01N1tNP4pyJv7mGA2v6arE1f) | main 7e0250ec typed locks j15:65, j24:65, j25:49/51/62, j42:358, j54:138/203/204, j55:175-177, jinv:139, jht:122 | review/* review/one-core-jkc 84129fa23 (base). Reused: existing keys BAL.house.thuongBac / lookBac / upBac / upDanh / swapBac, BAL.net.n.bribeCost, BAL.tw.reward, jecon econSchemePrice; movers one-core-jkc-move.js / one-core-dup3-stat-move.js (pattern), proof one-core-dup2-same.js (extended).
START_CTX ≈ 4 % of 1M (get_session reads 0; estimate) → rollover ≈ 29 %, ceiling 60 %. All three brief items done; rollover not reached.

Branch **review/one-core-jkc-2**, stacked on review/one-core-jkc 84129fa23 (reviewer r1 has not pushed review/one-core-jkc-r1 yet — merge its PASS sha when it lands). Commits: c6e4a6512 (part 1), de96b5747 (part 1 load-order fix + part 2), da026fc87 (part 3) = **SẴN SÀNG KIỂM da026fc87**.

## 1. «thiếu bạc (cần N)» price-lock family (brief item 1)
Scan **dev/measure/one-core-bac-lock.js [ref]**: lock = a typed price in a lock word («cần N bạc», «thiếu bạc (cần N)», «cần Bạc N», «Bạc N (có …)»); cmp = a typed bạc compare x.bac<N / >=N (N>0).
Before (84129fa23): **lock 25, cmp 103**. After: **lock 0, cmp 16** (the 16 are not prices: NPC money reserves j10:34/53, j55:150/151, j8:405, j83:203 ×2; j72 event triggers ×7; j42:294/295 old-age fate «≥100 bạc» — no charge equals them).
Rule: one key per action; the cost text («Bạc -N»), the lock (S.bac<N), the lock word and the handler (apply/ap) — and the NPC mirror of the same act — all read it.
| action (files) | was typed | key |
|---|---|---|
| Thưởng kẻ hầu (j10:39/58, j24:62/65) | 10 ×6 | BAL.house.thuongBac (existing) |
| Xem người (j15:65, j29:39/69) | 15 ×6 | BAL.house.lookBac (existing) |
| Tiến cử (j15:65, j10:58, j14:40) +Danh -2 | 30 / 2 | BAL.house.upBac / upDanh (existing) |
| Đổi người (j15:65, j24:73, j29:42/50/69) | 20 ×6 | BAL.house.swapBac (existing) |
| Thêm cung nữ / thái giám (j15:64, j10:16/59, j29:32/33/37, j6:90; NPC fill too) | 20 ×14 | BAL.house.hireBac (new) |
| Cài người vào cung khác (j15:64, j10:25/59/63) | 40 ×6 | BAL.house.plantBac (new) |
| Mua chuộc kẻ hầu (j15:70, j10:61) | 30 ×4 | **nv(s,"bribeCost")** = what bribeServ charges (BAL.net.n.bribeCost: greedy 15, else 30) — **was wrong**: a greedy servant showed «cần 30 bạc» but cost 15 |
| Biếu quan (j15:66, j10:49/53/60, NPC Tổng quản gift) | 20 ×6 | BAL.bacFee.court |
| Chăm sóc / Canh giữ các con (j25:49/51/54/56) | 10 / 20 | bacFee.kidCare / kidGuard |
| Biếu quà đồng liêu (j42:358/363) | 5 ×3 | bacFee.cnvGift |
| con gái gả xa: thư / nói giúp / tông nữ (j54:138/203/204/218/219) | 15 / 10 / 50 | bacFee.h54Thu / h54Noi / h54Hoa |
| triều đình dò la / tung chứng cứ / biếu (j55:55/64/70/149/175-177/201) | 30 / 20 / 40 | bacFee.tdProbe / tdLeak / tdGift |
| Nghiệm độc (j8:492/510, jinv:139 «tốn: Bạc 10» → «Bạc -10») | 10 ×5 | bacFee.itTest |
| Dò hỏi gia thế (jht:122/126) | 5 ×3 | bacFee.htAsk |
| Mời danh sư (j2:185) | 60 ×2 | bacFee.master |
| Ban thưởng phi tần, old render (j6:28) | 30 ×2 | BAL.tw.reward (existing; j15 already read it) |
| tiểu thư: Đưa bạc / Hồi âm / Xin miễn tuyển / Dúi bạc ma ma (jkc:367/378/421/501) | 50/15/40/60 | BAL.kc2.st.kc.bacHuynh / bacThu / bacMien / bacMama |
| 14 scheme acts c / ok / f (j8 spy ally bribe block musk catswap, j30 lygian slowpoison xinhh, j70 huydung, j92 giahoa, jtsb thathu phonghoa, jpet thaopet) | 3 copies each | BAL.actBac.<k> (c is `{get bac(){…}}`: j8 / j30 load before BAL) |
| their lock words (j25 LACK.block, j70 huydung button + dò la card, j92 LACK.giahoa, jtsb LACK ×3) | base | **actBac(k,S,t)** (new, jecon) = the price really charged — **was wrong**: jecon raises a scheme's price by target rank / guards, the lock said the base |
| NPC-only price + its check (j9 lend +«cần 30» thiện cảm, j28 ksp, j32 midwife, j34 backer, j75 material, j8:326 + j75:143 «giữ» bribe = one rule in two modules, j8:410 ally) | 2 copies each | bacFee.lend / lendAff / ksp / midwife / backer / npcMat / giu, BAL.actBac.ally |
CHANGE line added (the two real fixes).

## 2. Amounts typed in BOTH a text and its rule (brief item 2, the guard's fx kind)
Scan **dev/measure/one-core-fx-both.js [ref] [--list]**: on one source line, a text «Stat ±N» (Sủng Danh Đức Bạc Sức Thái hậu Tâm cơ Tai mắt Ân tình Tài Sắc Chủ tin) and a typed code amount of the same stat and value ({danh:-5}, S.x±=N).
Mover **dev/measure/one-core-fx-both-move.js**: code amount → BAL.eff.<module>.<stat><Site>[_n] (jbaleff.js); every paired text prints ${balSg(key)} (string → template; a top-level x:"…" property → get x(){return `…`}, only j30 lygian / slowpoison). Pairing = smallest common AST node per text; codes sharing a text share one key.
Before **340** pairs (33 modules) → after **25**. Left (STOP POINT): j8:148–174 item table IT (19: d «Sắc +2» + use {sac:2}), jinv:259, jkc:56/57, jpet:23/33, jweather:63 — static tables at load time (j8 loads before BAL): need the getter pattern on both the text and the amount; not done.

## 3. Game-wide odb (brief item 3)
Mover **dev/measure/one-core-odb-move.js f1,f2,…** (one-core-jkc-move pattern, any module): od(N…) / roll(N±…) literal → BAL.odb.<module>.od<Site> / rb<Site> (block at the end of jbal2.js, rewritten by the script); the same call text (preview word(od(N+x)) + handler roll(od(N+x))) reads ONE key. All 300 sites were inside functions: **300 → 0**, 43 modules (j42 34, j68e 32, j2 27, jroute 24, j68f 23, j7 20, j71 19, j4 16, j31 14, j68g 11, j8 7, j14 6, j22 6, j75 5, j68h 5, … 1). No stop point left for odb.

## 4. Proofs
- `node dev/measure/one-core-dup2-same.js 84129fa23` → **PASS, 60 modules, 798 refs put back**. NS + house / bacFee / actBac / tw / odb; fold reads `get bac(){return -N}`; ADDED (new helper fn) jecon actBac.
  INTENDED (listed in the script with reasons): j10 staffHTML + j15 staffTabHTML (bribeCost), j25 LACK / j70 thrOpts70 + rvButtons / j92 + jtsb TryStatement (actBac real price), j6 rvButtons (-BAL.tw.reward.bac, fold can't do a double minus), jinv kinvOpen («Bạc 10» → «Bạc -10»). Cross-check: with nv(…bribeCost)→30, actBac(k,…)→BAL.actBac.k and j6 put back by sed, all of them read **identical** (26 modules, 0 intended except jinv).
- BAL: new keys only, no existing value changed.
- one-core-guard: **4957 → 4742 (part 1) → 4146 (part 2) → 3846 (part 3)**, baseline updated (only shrinks).

## 5. Tests (on da026fc87)
| gate | result |
|---|---|
| one-core-guard / one-core-text / one-core-bind | PASS 3846 = 3846 / PASS / PASS (1138 prints, 0 mismatches) |
| quickcheck (build, core gates incl. rules-one-source + kit-conform + coop-one-world, old save, perf) | **PASS** 348 s; render 157/127, tab 267/345, buổi 794/946 ms |
| road-end | 50/51 first run (page error «r.updateLocalTransform is not a function» = Pixi graphics, no number code), **51/51 on rerun** (flake) |
| coop-e2e | 63/63 first try |
| boot (Fold 755x1000, own probe) | 0 page errors; ACT.spy.c.bac -15, ACT.musk.c {duc:-8,bac:-30}, ACT.lygian.x prints «Sủng -10», BAL.bacFee.court 20 |
| lock texts at Fold 755x1000 + iPad 1180x820 | new life, Bạc 3, Cung nhân tab: the plant button reads «Tốn Bạc -40 · 2 khắc · thiếu bạc (có 3)» at both sizes (kit cost row prints the key), 0 page errors. Honest note: that button sits in a collapsed group, so I checked it in the page DOM, not on a visible screen. Text-only change, no layout change. Shots in scratch, deleted, none in git or CDN. |
Fail on main and not this branch: none seen. Pre-existing (from #1): outside/route.js «Danh carry-over ≤ 30» — not rerun here.

## 6. Stop point / left for a successor
1. fx-both 25 pairs in static load-time tables: j8:148–174 (item table IT, 19), jinv:259, jkc:56/57, jpet:23/33, jweather:63 → getter pattern on the text AND the amount (j8 loads before BAL). `node dev/measure/one-core-fx-both.js --list`.
2. bạc compares left (not prices, listed in §1): NPC reserves, j72 event triggers, j42 fate cut — the guard cmp kind; give each a named key if the reviewer wants them.
3. one-core-fx-both.js only sees a text and its amount on ONE source line; a text whose rule sits on another line is not found by it (one-core-text.js still catches any text that types a value a nearby BAL.eff key holds).
4. Merge review/one-core-jkc-r1's PASS sha into this branch when it lands (#1's commits untouched here).

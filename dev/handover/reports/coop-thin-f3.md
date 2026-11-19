# coop-thin F3 — HER BAG / SHOP / WEAR / GIFTS AS INTENTS (on the F1 wrapper TH.F.reg) — STEP 0 (report first, before code)

PRIORITY #1 CHECK ('useItem|wear|sellItem|giveTo|plantItem|kitShop|onBuy|wdWear|courtGive|tsGift|tdAct gift|wkGive|TH.F.reg'): OD 0 new (thin guest 17/11 ~01:40Z / ~02:05Z / ~02:15Z via the brief) | ledger 0 | claims: CLAIMS row 'coop-thin F3' (this worker) | main f43a2ba6: F1 LIVE (jcoopthinf.js TH.F.reg, runAct), no bag/shop/wear/gift registration | review/*: review/coop-thin-f2 e0f242f0 (F2, level 7, in final gates — the base of this branch), no review/coop-thin-f3 | archive 0.

Worker session_01N1tNP4NVrwK67H3DPhD9Ld (opus), coordinator FOREMAN B ROOT-3 session_01N1tNP3obSHDf3JJ3GqMHp8. depth 4 (get_session lineage.depth). START_CTX ≈ 3 % of 1M (used_tokens reads 0; estimate) → rollover at ≈ 28 %, ceiling 60 %.
Branch review/coop-thin-f3 STACKED on origin/review/coop-thin-f2 e0f242f0 (F2 lands first; merge origin/main when F2 is LIVE). Worktree /home/user/wt/f3 (sparse). Level **8** (Foreman B ruling 18/11 ~22:50Z: F3 = 8; `TH.CAP` 7 → 8; Worker THINMAX 9 already).

## 0a. Every bag / shop / wear / gift entry point the guest runs today (base e0f242f0) and which part moves it
Today at L7 every row below RUNS ON HER PHONE (writes S.inv / S.bac / her worn slots / the receiver locally; the host learns it from her next `do erd` / `ready` diff, the receiver's side from the friend relay). Engine = the function the tap ends in (wrapped by many modules; jcoopthinf loads last → a registration is the OUTERMOST layer, every inner wrapper = the act's own effects, run once on the host).

| # | entry (guest tap / caller) | file:line | engine it ends in | part |
|---|---|---|---|---|
| 1 | Rương đồ item card "Dùng" (jinv `[data-kinvact]` → itemAct use; kit pick tiles `data-kidpick="use"`; fabric "May áo" via jwdinv useItem) | jinv.js:196, j8.js:514-515, jwdinv.js:33 | `useItem(S,ix)` | **F3** |
| 2 | "Dùng … với ai?" (itarget, bột ngứa) / "Tập chứng cứ này nói về ai?" (evpick) | j8.js:501-502 | `useItem(S,ix,v)` (go: spend + log) | **F3** |
| 3 | Rương đồ "Đeo / Cài / Mặc" + "Tháo" (itemAct wear; Điểm trang dress tab jtoil toilAct) | j8.js:516, jtoil.js:358-362 | `wear(S,ix)`, `wdWear(S,ix)`, `wdTakeOff(S,"tram")` | **F3** |
| 4 | Tư trang y phục: Thay y phục / Tháo / Tự chọn đồ / Bán lén / Cầm cố / Chuộc lại (`[data-wd]`) | j92.js:430-440, :487-489 | `wdWearUI(ix)`, `wdOffUI(sl)`, `wdAutoUI()`, `wdSellUI(ix)`, `wdPawnUI(ix)`, `wdRedeemUI(i)` (each: can + spend + engine + log) | **F3** (Chải chuốt `wdGroomUI` = mini-game → F5) |
| 5 | Rương đồ "Bán" (itemAct sell) / the Bán button of jecon (`[data-econsell]`) | j8.js:518, jecon.js:96-98 | `sellItem(S,ix)` (= econSell, jecon:93), `econSellUI(ix)` | **F3** |
| 6 | "Nhờ thái giám mua đồ" — the kit shop (Nội vụ phủ tray kitShopNvp: Mua tab + rare item (jact) + buy-back tiles (jil) + Bán tab) | jinv.js:547-558 (tiles' onBuy :544, :553), jact.js:102-106, jil.js:147-154; the buy click jinv.js:461 | the tile's `onBuy(x,q)` closure (no engine function today) | **F3** — new ONE engine `kitShopBuy(key,k,q)` (the click handler's body moved into it, solo unchanged); registered for key `nvp`; the pet shop (key `pet`, jpet.js:271-273) = **F4** (one line: add the key) |
| 7 | Tặng quà: item card "Tặng" (itemAct gift → giftpick = jgift giftDialog), person card Tặng quà (giftpick with v), Dâng lên Hoàng thượng / Thái hậu (giftto), works "Dâng, tặng" (wkgive), poisoned dish (wkgive Hạc đỉnh hồng) | j8.js:494-496, jgift.js:46-52, :93, :152-156, j83.js:173-181 | `giveTo(S,r,ix)`, `wkGive(S,r,ix)`, `wkPoison(S,v,ix)` (go: spend + log) | **F3** |
| 8 | Biếu quà làm lành (jts tsgift: Lễ bạc / tác phẩm / đồ trong rương) | jts.js:160-178 | `tsGiftBac(S,L)`, `tsGiftPiece(S,v,i)` | **F3** |
| 9 | Biếu quà người trong triều (Tổng quản / Kính sự phòng: courtAct thuong) | j10.js:103-104, :108 | `courtGive(S,k)` (ONE function, player + NPC) | **F3** |
| 10 | Biếu quà, gửi thư nhà ngoại (triều đình tab: tdAct gift) | j55.js:200-201 | `tdAct("gift",d)` → tdGift (router: ask/probe/leak = F6) | **F3** (only a==="gift") |
| 11 | Cài đồ vào rương "tại cung nàng" (plantpick, here) | j8.js:497-498 | `plantItem(S,v,i)` (the not-here road = runAct "plant" = F1) | **F3** |
| 12 | Tẩm đồ (taintpick) / Nghiệm độc (itemAct test) / Kiểm tra rương đồ (invAct inspect) | j8.js:499, :519-520, :524 | `taintItem(S,ix,k)`, `itemTest(S,ix)`, `invAct("inspect")` | **F3** |
| 13 | Works: Bán ra ngoài cung / Bày ở yến tiệc (wkAct sell / show) | j83.js:180-183, :117 | `wkSell(S,ix)` (fzRun odds), `wkShow(ix)` | **F3** |
| 14 | a gift that ARRIVES (Quà tặng card giftin: Nhận / Trả lại / Thái y xét) | j8.js:504-507 | part-D card built on the host in her context (bridge D.afterRun) | already host (D) |
| 15 | gifts between the two players (her giveTo to the host's stand-in, his to her) | jcoopthin.js:168-172, :381-383 | the withSeat bridge (bridgeItems → the receiver's Quà tặng card) | becomes an ordinary act in the one engine once row 7 is an intent (both directions tested) |
| 16 | cung-nữ talk "Biếu quà nhỏ" (cnv option closures), servant "Thưởng" (servAct), court "Hỏi chuyện", j70 plot "Biếu quà Tổng quản", j68f event "Sang làm lành", jil "Chép kinh sám hối, xin lại" | j42.js:178/337-338, j10.js:90-95, j70.js:85, j68f.js:96, jil.js:144 | closures / routers of other families | **F6** (cnv closures, servants, events) / E-G (plot execution) |
| 17 | pets (pet shop, petBuyOne), kitchen / garden / study items made | jpet.js:271, … | — | **F4** |
| 18 | Chải chuốt (wdGroomUI), Điểm trang makeup game (jtoil) | j92.js:488, jtoil.js:395 | mini-game scores | **F5** |

## 0b. How each registers on TH.F.reg (level 8)
ONE generic helper in the F3 block of jcoopthinf.js: `reg8(name, kinds, opts)` where `kinds` lists each argument: `me` (must be her S), `ix` (an index into her S.inv — travels as the index + the item itself, found by value on the host, exactly as F1's runAct item), `who` (a person — travels as an id, the friend = the host's stand-in id in her context; "emp" / "th" / "maid" strings as they are), `v` (plain JSON: a slot key, a court key, a shop key, a dataset copy). mine = she is the actor (`me`) and she is alive; UI-level functions (`wd*UI`, `econSellUI`, `invAct`, `tdAct`) = `mine` checks only the act kind (`inspect`, `gift`).
- registered (26): `useItem`, `wear`, `wdWear`, `wdTakeOff`, `wdWearUI`, `wdOffUI`, `wdAutoUI`, `wdSellUI`, `wdPawnUI`, `wdRedeemUI`, `sellItem`, `econSellUI`, `kitShopBuy`, `giveTo`, `wkGive`, `wkPoison`, `tsGiftBac`, `tsGiftPiece`, `courtGive`, `tdAct` (gift only), `plantItem`, `taintItem`, `itemTest`, `invAct` (inspect only), `wkSell`, `wkShow`.
- `log:true` where the caller logs the return (`if(r)log(r)` / `log(f(...))`): the host logs it in her context; her phone logs nothing. UI-level functions log inside themselves (log:false).
- ctx (reuse F2's CX: `used`, `tab`, `popIdx`/`popMsg`, … + back) + `ACTFZ` (the odds she saw, j9 fzRun: wkSell, tdAct gift read them; set for the call only, never back) + `__kitLastEvArt` (the gift moment's picture).
- result card: `title` + `snap` for the functions wrapped by wrapR (wd*UI, wkAct) and tdAct (rsnap inside) → F1's cardLater shows the same kit card after the answer.
- shop: `kitShopBuy(key,k,q)` on the host rebuilds HER shop data in her context (the same builder kitShopNvp with every wrapper: rare item, buy-back tiles) with the kit modal OFF (`window.__kshData`: kitShop returns the data object, never opens a modal and never touches KSHOP.reg — the host's own open shop stays his), finds the tile by key, checks kitShopWhyQ (money / stock), runs its onBuy (the sell tab loop included). Her phone: the tile's stock / the panel refresh happen after the answer (R.done → kitShopRefresh).
Old guest path deleted for the moved family (behind L8, one switch): every row 1–13 runs on her phone today; at L8 none of them does (the call becomes `do f`); her `erd` diff stops carrying bag / bạc changes from these acts. Delete-for-good when L8 is the default (part H), same rule as C/E/F1/F2.
Wrapper gaps: none proven yet (F2's R.lv / R.back / R.done / R.snap / ui capture cover this family). One possible gap to prove in tests: an act whose caller reads the result synchronously after the call (kit shop sell loop `got+=S.bac-b0` — moved inside kitShopBuy, so it runs on the host; toilAct reads the new worn slot — R.done re-renders the dress panel).

## 0c. Tap-to-screen time before
Today (L7) every bag / shop / wear / gift act is local on her phone: tap → her screen = one render (≈ 40–180 ms on iPad, measured in Done as the L7 column of coop-thin-f3.js); her result reaches the host only at her next erd / ready. After (L8) = two network legs + the host run, expected ≈ F1/F2: no throttle ≈ 0.3–0.5 s, 4G profile (LAG 85 + host CPU ×4) ≈ 0.8–1 s; the pending state shows at once (#next locked, buttons off, a second tap ignored).

## #1 progress (11/19/2026 ~05:20Z, context ≈ 20 %) — review/coop-thin-f3 @ 5a2de048 + merge F2 4dabbd46 (local, push at Done)
Built (all behind TH.on(8); CAP 7 → 8): F3 block in jcoopthinf.js (reg8 over the step-0 engines); wrapper gaps proven by the test: snap "soft" + okHint (solo wrapR card rule), noRes (a registered UI function's own result card opened on the HOST's screen), chooseM title + no half card on her phone; ONE item matcher itemFind (F1 runAct item too); FOUND + FIXED (law 6c, whole family): (1) jcoopthin pApply resolved an item path by eid, not unique for two pieces of one kind → the host's flag (tested / worn) landed on the WRONG piece on her phone (B4b: guest p1/p2 vs host); position first now; 'r' and jcoopworld invHer / invRun compared items with key-order-sensitive JSON (duplicate on her stored chest / "no longer in the chest") → key-order-free; (2) gifts between the players bypassed the ASK act (every gift picker called giveTo onto the other player's entry): the host's gift stayed in her ENTRY's bag on the host (lost to her) → at L8 one path = runAct "gift" (invite card, then Quà tặng); (3) jil ilUid in her context on the host used her seq WITHOUT her 1e7 prefix → ledger ids collided with the host's. Solo refactors (identical behaviour): jinv kitShopBuy, j8 plantHereGo, jts tsGiftBacGo / tsGiftPieceGo, j55 tdGiftGo.
Results so far (live Worker): coop-thin-f3 L8 36/37 → 37/38 (X1 timing under 2 lanes, wait raised) · swap 36/36 · f2 at L8 19/19 · one-core ×4 PASS · TRIP before (L7) F3 entry writes 551 → after (L8) 0 · latency no throttle median 558–583 ms (iPad guest), swap 326 ms; her tap itself 126–190 ms.
Left: gates (f1 L6/L8, a, b, c, d, e, e-net, cyc THIN=8, e2e + swap, night THIN=8, timer, p2, b1, one-world 1–10, quickcheck), 4G latency (LAG=85 CPU=4), LOOK Fold 755x1000 + iPad 1180x820, build_site.sh generated files, '## Done', CLAIMS, push, send Foreman B.

## Done — SẴN SÀNG KIỂM f659cf7b (review/coop-thin-f3, pushed; = F3 + merge origin/review/coop-thin-f2-r1 3db28bd8, which carries origin/main f43a2ba6)
Touched vs F2-r1: dev/build/jcoopthinf.js (F3 block + wrapper gaps), jcoopthin.js (CAP 8, pApply item path by position, 'r' key-order-free), jcoopworld.js (CW.isF, invHer / invRun key-order-free), jil.js (ilUid prefix in her context), jinv.js (kitShopBuy + kitShop data mode), j8.js (plantHereGo), jts.js (tsGiftBacGo / tsGiftPieceGo), j55.js (tdGiftGo); dev/test/coop-thin-f3.js (new), coop-thin-trip.js (F3 entries); index.html / sw.js / assets.json (build_site.sh).

### Moved paths (level 8; below 8 + solo unchanged)
| family | engines registered (her tap → `do f`, the host runs it in context b) | before (L7) | L8 |
|---|---|---|---|
| bag | useItem, sellItem (= econSell), econSellUI, itemTest, taintItem, invAct(inspect), wkSell, wkShow | ran on her phone | intent; F3 table B1–B6 green (B6 skipped: no taint without a need item) |
| wear | wear, wdWear, wdTakeOff, wdWearUI, wdOffUI, wdAutoUI, wdSellUI, wdPawnUI, wdRedeemUI, vlWearUI, vlOffUI | her phone | intent; W1–W7 green, self-only acts = a solo twin (same deltas: bạc, bag, worn, slots, veil, Sức/Sắc/Danh, khắc, log line) |
| shop | kitShopBuy (nvp: buy, sell tab, rare item, buy-back tiles), vlBuyNvp, vlBuyOut, vlAsk | tile onBuy closures on her phone | intent; S1 buy ×2 (bạc −price×2, +2), S2 sell (bạc + shown price, the piece in the ledger 'mkt') |
| gifts | giveTo, wkGive, wkPoison, plantHereGo, tsGiftBacGo, tsGiftPieceGo, courtGive, tdGiftGo | her phone | intent; G1–G7 green; G1 the piece in ONE place (the consort's bag, host + her lens) |
| gifts between the two | giveTo / wkGive onto the other player's entry = the ASK act "gift" (F1 path) | her gift: bridge only; HIS gift stayed in her entry's bag (lost to her) | X1 her → host (his invite → Nhận, Quà tặng → Nhận, his bag) / X2 host → her (her invite → Nhận, Quà tặng → Nhận, her bag), one place each |
Deleted-for-good when L8 is the default (part H): the local runs of all rows above on her phone (unreachable at L8).

### Law 6c / whole-family fixes found by the test (before → after)
| fault | before | after |
|---|---|---|
| a host patch on one of two same-kind pieces (eid "kyensao#" not unique) | flag landed on the WRONG piece on her phone (guest p2, host p1/none) | same piece both phones (B4b) |
| item matched by key-order-sensitive JSON (F1 runAct item, ixD, pApply 'r', invHer, invRun) | intent "gone" 4–6 rows/run, possible duplicate in her stored chest | 0 |
| gifts between the players bypassing the ASK act | host's gift lost in her entry (X2 red), her gift without the invite | ONE path both ways (X1/X2 green) |
| ledger ids made in her context on the host (ilUid) | her seq without the 1e7 prefix → collided with the host's ids (two pieces one iu) | her prefix |
| L7 old road (TRIP run): G1 duplicate (her + consort), S2 sold piece still in her host copy, X1/X2 lost | red | L8 green |

### Tripwire (guest writes outside fromCanon during the F3 act table, TRIP=1)
| | L7 (before) | L8 (after) |
|---|---|---|
| F3 entry (the engines above) | **551** (log 306, S.inv 66+53+13+11, mkSync …) | **0** |
| "?" render writers (F6) / F1 bucket (directActs render) / D cards (her decision cards) / D·patch (designed) | 1760 / 831 / 997 / 55 | 1027–1333 / 686–740 / 741–779 / 1770–1899 |

### Latency (tap → answer on her phone, live Worker, n = 24 acts)
| profile | median | min–max |
|---|---|---|
| L7 before: the tap itself (local render) | 150 ms | 93–249 |
| L8 no throttle, guest iPad / swap guest Fold | 558–667 / 326–374 ms | 405–1228 / 267–824 |
| L8 4G (LAG 85 ms each way both phones + host CPU ×4) | **986 ms** | 800–3395 |
Pending shows at once (#next locked, buttons off; D1: a 2nd tap ignored, one intent). Same network-bound picture as F1/F2 (FOR MAIN latency line of F1 stands).

### Tests (live Worker)
| test | result |
|---|---|
| coop-thin-f3 L8 / swap / 4G (final build) | 37/37 / 36/36 / 36/36 (earlier: 36/37, 37/38 = X1 wait under 2 lanes, raised) |
| coop-thin-f3 L7 (before) | rows local; 5 law-6c reds = the old road (table above) |
| coop-thin-f2 L8 | 19/19 |
| coop-thin-f1 L6 / L8 | 22/22 / 22/22 (one earlier L8 run 22/24 'spy' her copy vs phone under 2 parallel suites; 3 reruns alone green; L7 green) |
| coop-thin-a L1 / b L4 / c L4 / d L4 / e L5 / e-net L8 | 24/24 / 136/136 / 16/16 / 46/52 (= main: 6 kit sameDom) / 33/33 / green |
| coop-cyc THIN=8 | 73/73 |
| coop-e2e / COOP_SWAP=1 | 63/63 / 63/63 |
| coop-night THIN=8 / coop-timer / coop-p2 | 105/105 / 43/43 / 46/46 |
| coop-b1 (level 0, F3 off) | 42/43, 36/41, 31/41, 19/41 — main fd6118cd same run pair 29/41: the known pairing / laydo flake (F1 review) |
| coop-one-world seeds 1–10 | 10 × PASS |
| one-core guard / text / text-rule / bind | PASS ×4 |
| quickcheck f659cf7b | PASS (old save ok; render 170/229, tab 381/381, buổi 1134/1120 ms new/live; core gates PASS) |
LOOK (scratch only, deleted, nothing uploaded): host Fold 755x1000@2 + guest iPad 1180x820@2 at the wear card / shop: kit frames clean, no overflow, 0 page errors; the setup's rank edict ("Thánh chỉ … Tần", from the test's staging) sat on top of the result card → reviewer: LOOK at her wear card / shop panel directly.
Laws: 1 gifts both directions (one path) · 4 no new number (one-core PASS) · 6c pieces traced, never lost / doubled (fixes above) · 7/9–12 no new word, no UI part changed.
FOR B: (1) her own changes made on her phone outside intents (life-start items etc.) reach the host only with her next intent / ready diff (E/F1 design; the F3 table saw her bag 37–83 on her phone vs 1 in the host copy at setup); (2) the pet shop (kitShop key 'pet') = F4: add the key to KSH in jcoopthinf.

### Quiet-gated emitters reached by F3 acts (B ROOT-4 05:35Z: F2 r1 FAIL "withSeat quiet=true silences her cards"; the fix = review/coop-thin-f2-r2, NOT rebuilt here)
| emitter | reached from (F3 act in her context) | silenced today at L8 |
|---|---|---|
| jtq14 introCard / doneCard (Tống ma ma task cards «Xong việc …») | note("buy" / "sell" / gift / wear) after kitShopBuy, sellItem/econSell/wkSell, giveTo, wear / wdWearUI (seen in W1: the log line «Xong việc «Thay y phục…»» arrives, the card does not) | yes |
| j55 tdPop | tdGiftGo → tdGift (Biếu quà nhà ngoại house news) | yes |
| jts rank line (al && !quiet) | tsGiftBacGo / tsGiftPieceGo when the gift crosses a rank cut | yes |
| j8 dhHieuGrant {quiet:1}, jdh2 giveItems(quiet), jmem o.quiet | own option flags, not the global | no (unchanged) |
Plan: merge review/coop-thin-f2-r2 (+ main 7fb7c104) when B says SẴN SÀNG KIỂM, then rerun coop-thin-f3 L8 + swap with a check that the jtq14 done card reaches her phone after W1 / S1.

## Re-merge (B ROOT-4 06:48Z): SẴN SÀNG KIỂM 46ec7743 = f659cf7b + review/coop-thin-f2-r2 81ac2af8 + origin/main f3114755
Conflicts: jcoopthinf host run (kept r2's TH.tapRun + F3 noRes around it), j55 tdAct gift (tdGiftGo now reads main's minister house MINC/minNs), j8 plantpick (main's `p: oddsCl(fz)` kept + plantHereGo), generated files (rebuilt by build_site.sh).
New check "W done card": the «Xong việc: Thay y phục hay trang sức trong Tư trang» card her wear act earns shows on HER phone once, none on the host — PASS L8 and swap (was silenced by quiet before r2).
coop-thin-f3 L8 37/37 · swap 37/38 in a 2-lane run (B1 her copy at the first act, the known first-act timing) → B1 swap alone 2/2 green.

## Re-merge 2 (B ROOT-4 07:15Z): SẴN SÀNG KIỂM abb9a6a6 = 46ec7743 + review/coop-thin-f2-r2 083227d4 (E buổi step fix; only generated files conflicted, rebuilt)
coop-thin-f3 L8 37/37 · swap 37/37 · W done card PASS both (her «Xong việc» card on her phone once, none on the host).

## REVIEW r1 (reviewer session_01N1tNP5fWL4VXMTtqchmHQX, opus BIG, depth 5; START_CTX ~4 %, ended ~22 %) — VERDICT: PASS e5c42937
PRIORITY #1 CHECK ('coop-thin F3 review'): OD 17/11 thin guest + L1487/L1489/L1493/L1494 (via the brief) | main 62055a31 (F1 LIVE; no F3 registration) | review/coop-thin-f3 f659cf7b → 46ec7743 → abb9a6a6 (worker's re-merges), review/coop-thin-f2-r2 81ac2af8 / 083227d4 (quiet-gate fix, merged in), review/coop-thin-f3-r1 (this) | claims: REVIEW row (this session), F3/F4 worker 4NVrwK67, F2-r2 worker 4v5eCkat.
Branch review/coop-thin-f3-r1 @ **e5c42937** = abb9a6a6 (F3 + F2-r2 final + main f3114755) + origin/main **62055a31** + 1 reviewer fix (7fd3c08a). Conflicts: j8 plantpick (kept plantHereGo + main's `p:oddsCl(fz)`), else only index.html / sw.js (rebuilt by build_site.sh). origin/main is an ancestor → fast-forward ready (F3 lands after F2-r2, which it contains).

### Reviewer fix (F3 scope, Foreman B ROOT-5 UICAP family check)
| fault | before | after |
|---|---|---|
| her act sounds: jsfx wraps buy / sellItem / wkSell / giveTo with `kitSfx`; in her tap run on the host (TH.tapRun) `kitSfx` is a NOOP outside UICAP → silenced on the host AND never replayed on her phone (solo ≠ guest) | probe (outermost wrapper on the host, F3 L8 table): dropped in her runs: kitSfx sell ×1, give ×3; guest heard none | `"kitSfx"` added to UICAP (jcoopthin.js:196): guest plays sell / give after the answer; host still silent. f3 L8 37/37, swap 36–38, f2 L8 25/25, f1 L8 22/22 after the fix |
Other names her F3 runs reach on the host outside UICAP (same probe): render 7–8, showModal 1–2, resultShow 6–7 (= cardLater on her phone), kitPanel 1 (jtq14 doneCard → her Q → part D card: W done card PASS), popNum 16 (→ kitStatFx, in UICAP). No other F3 redraw missing.

### Checks
- (1) every act from the guest = solo: coop-thin-f3 L8 **37/37** (×3 on the final merges), swap 36/37–38/38 (×5; the reds = item FOR B 1), 4G 37/37 (twin deltas bạc / bag / worn / slots / veil / Sức-Sắc-Danh / khắc / log). «Nhờ thái giám mua đồ» from the guest (S1 buy ×2, S2 sell): green; LOOK guest iPad: the bought piece's Nhận overlay over the kit shop, host Fold shows nothing of hers. Code read: 31 registrations (reg8) in jcoopthinf.js F3 block; encA/decA; itemFind tiers never cross kinds; kitShop data mode does not touch KSHOP.reg; tdAct on the guest returns at once (tdGiftGo → "" while pending; probe: no half card, one card after the answer, __tdOk back).
- Law 6c (4 worker fixes), each checked: pApply same-position-first (B4b green both phones); key-order-free SJ in pApply 'r' / invHer / invRun / itemFind (no JSON item compare left in jcoop*); host→her gift = ONE ASK path (giveTo / wkGive intercept, CW.inv lets the accepted run through; X2 green when the piece is not refused); ilUid 1e7 prefix in her context (jil.js:62). Every X1/X2 red keeps the piece in exactly ONE place (sender's bag) — never lost or doubled.
- (2) level gate: CAP 8; F3 regs `lv:8` → `on(8)`; old rooms: a L1 24/24 (×3 alone; one 19/24 and one 23/24 only under 2 parallel lanes; main 24/24), b L4 136/136, c L4 16/16, d L4 46/52 (= main: 6 kit sameDom), e L5 33/33, e-net L8 20/20, f1 L8 22/22 + swap 22/22, f2 L8 25/25 + swap 24/25 (P2 visit timing, F2 scope).
- (3) tripwire (TRIP=1): F3 entries L7 **375** (log 199, __wdmig 196, inv …; worker's run 551) → L8 **0**. Old local road unreachable at L8; deleted for good with part H (same rule as C/E/F1/F2).
- (4) latency: no throttle median 520–532 ms; 4G (LAG 85 + host CPU ×4) median **936–983 ms** (max 3.0–3.8 s). Cause = two network legs + host run, same picture as F1/F2. FOR MAIN: co-op 4G bag/shop/wear/gift taps of the guest answer in ~1 s median (up to ~4 s); network-bound + host long tasks, not a F3 fault.
- (5) LOOK (scratch only, nothing uploaded, deleted): guest iPad 1180x820@2 shop (kit frames clean, no overflow, 0 page errors); host Fold 755x1000@2 = his own screen only. Wear-card shot covered by the test's staging edict (known); gift moment not shot separately (X rows prove the cards by pid).
- Gates on the merges: coop-cyc THIN=8 73/73 + swap 73/73 (final; earlier merges 65/73, 71/73 «som»/«giấu» draw timing — main THIN=7 swap 73/73 ×2; green after f2-r2 final) · coop-e2e 68/68 + swap 68/68 · coop-p2 45/45 · coop-night THIN=8 105/105 · coop-timer 43/43 · coop-b1 42/43, 30/41, 19/41 (known pairing / laydo flake class, main same) · coop-one-world seeds 1–10 PASS (seed 9 one red under load; 5/5 alone, main 6/6) · one-core guard / text / text-rule / bind PASS · quickcheck e5c42937 PASS (old save ok, render 190/169, tab 313/370, buổi 1042/939 ms new/live; core gates PASS).
- Quiet-gated emitters an F3 act reaches (for the F2-r2 check; all now under TH.tapRun quiet=false): jtq14.js:117 introCard / :128 doneCard (note buy/sell/gift/wear) · j55.js:138 tdPop (tdGiftGo) · jts.js:252 rank line (tsGift*) · j67.js:151 card67 (a chapter step closed by a gift / buy) · j1.js:139 popNum (every fx) · j11.js:78 coin feedback (sell) · j85.js:70 Đức deed log line (taintItem, wkPoison) · jagknow.js:380 mắt log · j72.js:168 «Lỡ hẹn». Re-check after the F2-r2 merge: W done card (her «Xong việc» once on her phone, none on the host) PASS L8 + swap.
- Laws: 1 gifts both ways one path (see FOR B 1) · 4 no new number (one-core ×4) · 6c pieces traced, never lost / doubled · 7 no new word · 9–12 no UI part changed, devices Fold + iPad.

### FOR B (not F3 faults)
1. **A gift the other PLAYER accepted can still be refused by the NPC dislike roll** (jdis.js:63–71 giveTo wrapper): the receiver's entry has NPC dislikes; after he taps Nhận on her invite, `roll(BAL.dis.refuse)` can answer «… không nhận …: nàng không ưa …, thiện cảm −2, món quà vẫn còn trong rương» under a card titled «Hảo hữu nhận lời». Seen in ~1 of 4 full F3 runs (X1 swap / X2), both directions; the piece stays in the sender's bag (no loss). Pre-existing on every co-op gift path (L0 res, F1 ASK), not introduced by F3. Rule question (law 16, not changed here): should a player's accepted gift skip the dislike refusal (his own Nhận decides), keeping only the dislike's thiện cảm cost? Recommend yes; one line in jdis (skip refuse when `COOPW.inv` and the target is the friend entry) + test X1/X2 then deterministic.
2. Tests under 2 parallel lanes produce timing reds (thin-a «host sees the friend», one-world seed 9, f1 'spy'); all green alone — run co-op gates one lane at a time before a verdict.
Images: none uploaded; CDN img/_review/coop-thin-f3/ wiped; scratch shots deleted.

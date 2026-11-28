# BIG REVIEW — review/d-family-gift e391965c (rv session_01964izBoau3kRhKvgk45bRN, for Foreman D ROOT) — 28/11

PRIORITY #1 CHECK: brief briefs/d-family-gift-rv.md | claims D-FAMILY-GIFT (worker session_01964izCqcy28euSanyuhN8A, archived) | base review/d-giftin-like-rv 7c143419 (LAND READY, not yet on main) + origin/main c03d6ee7 | LIVE was aecbc267 at start, moved 3 times during the review: 8a30664e (dayq-noturn r3) → 8a1a71de (LR-RULES-2 unit A: d-maid-road + row 37; LC36 UI) → **5fc4bc79** (LC36 kit-hand) | main: j55 tdGiftGo (court houses, own father hidden), jkcg family→her, jecon econHome — reused, no second copy | review/* no other rv on this topic.
KIT CHECK: reuses pbtn act card, PEND option dialog → kitHand cards with oddsChip + kitOff greyed card (§84, kitOffLast order), kitRows, h4.kpst, resultShow card, KINV_XTRA Tư trang sub-tab (dev/kit/KIT_CHECKLIST.md). No new UI part.
START_CTX ≈ 3 % (estimate; get_session reads 0); at delivery ≈ 22 %.

## Verdict: **PASS 6e597833 (FF from 5fc4bc79)** — with fixes made by me on review/d-family-gift-rv (law 2 BLOCKING fixed via BAL, law 1 parity, 2 test fixes for LIVE oán pace)

Note for the lander: this sha also carries review/d-giftin-like-rv 7c143419 (row 10, already LAND READY) — landing this lands both.

## Claims checked
| claim | result |
|---|---|
| §EXPERT before code (law 8) | PASS — table E1–E9 with H / D / ? tags, sources named (Smithsonian NMAA Empresses overview, Rawski *The Last Emperors*, Consort Zhen 1894, Consort Ling banner); uncertain points marked «?»; rules R1–R5 drawn from it |
| ONE act fgGo(p,tier,way) for her and NPC consorts (law 1) | PASS after fix — same cost, same gate odds, same box. **Fixed:** an NPC's successful parcel paid no Đức/Danh (only p.dad) while a stopped one cost Đức/Danh → now ap(p,{duc,danh}) on success too |
| «Gửi quà về nhà» in Tư trang › Thư nhà, tiers Nhẹ · Vừa · Nặng | PASS — kit dialog of 5 cards + ✕ (Fold + iPad shots looked at) |
| **LAW 2: cost and result rise together** | **FAIL as built → FIXED (BAL only).** Worker values: Nặng costs 95 vs Vừa 35, gate 50 vs 72, Danh +2/−4, Đức +2/−2. Expected at base odds: Danh Vừa +0.16 vs Nặng −1.00; Đức Vừa +0.72 vs Nặng 0.00; liking 4.3 vs 5.0 — Nặng is WORSE than Vừa on Danh and Đức for 60 more Bạc = dominated, not «net-negative by design». New BAL.gift.fam.nang: o 60, af 12, danh 3, lostDanh 3, lostDuc 1, up 20 (m 3). Expected now: liking 4.32 → **7.20**, Đức 0.72 → **0.80**, Danh 0.16 → **0.60**; Mất still rises (Vừa Danh −2 → Nặng Danh −3, Đức −1); Nặng bạc returns 3 × 20 home money on success (net −35, the same as Vừa's cost, but only on success; expected Bạc −59 vs −35). Gate still harder than Vừa (expert E6). Check added to family-gift.js |
| law 3 (no cost-only option) | PASS — every card has Thành; Nhẹ gain-only with Sức cost |
| law 4 (every number BAL.gift.fam) | PASS in code; **fixed in the test**: family-gift.js typed 95 / 10 / 4 → reads BAL |
| law 6c (piece → jil box «nha», stopped → Nội vụ phủ store) | PASS — ilOut + ilGone "home" → box nha (IL_BOXES + census); stopped → "conf" (nvp, confW); family answer gift logged nha→me; Nhẹ handkerchief made then logged at nha |
| law 6b (real named mother) | PASS — kcgMom() on the Khuê các road, else S.fgh named via nmNew("mo"); origins td / nc / bd / pf / cnv / servant: no road (test checks td) |
| law 7 wording | PASS — odds words only (Rất vững / Có cơ / Tùy duyên on the cards), Tốn exact, Được/Mất as marks; no % |
| law 9 kit | PASS — kit cards, greyed §84 card last, result card; 0 page errors, no horizontal overflow (Fold + iPad) |
| jpoison Object.assign fix | PASS — BAL.gift an 30 / rel 40 / th 40 / askW 2 / sinc {emp 1, oth 2, tr 1} unchanged; BAL.gift.fam survives (jbal2 loads before jpoison; no other BAL.gift writer) |
| imperial bestowals never sent | PASS — fgPiece skips from:"emp" / "base", worn (e.h), used, non-durable; test checks |

## Other fixes by me (small)
- jfamg fgGo: one Bạc deduction (fee + silver) — the float showed «Bạc −90» while the result card said «Bạc −95».
- jfamg month-end: showModal only when fgReply pushed the family letter (was: any queued card at every month end).
- giftin-like-scan.js (row 10 test, same family as the d19 one below): on LIVE aecbc267 the oán/ghét pace (joanpace b′, store holder.opa/opz) caps one liking fall per pair per day, so the scan's own «want» pre-run spent the answer's budget → «Trả lại quà» read 0 (FAIL 2 on the merge; bare LIVE shows the same 0). prep() now clears opa/opz. Game code untouched.
- d19-gift.js: the grudge set-up (oán ≥ 30) was capped at 16 by the same LIVE pace (FAIL 3 on bare LIVE aecbc267 too) → pace off during the set-up only.

## Gates
| gate | e391965c | trial merge on LIVE aecbc267 (d1189f31) → 8a30664e (df27de17) → 8a1a71de (2bbe47b7) → 5fc4bc79 (final 6e597833) |
|---|---|---|
| family-gift (8 roads + runtime) | PASS 31 | PASS on every merge incl. 6e597833 (+ law-2 expected-value check, + NPC Đức/Danh) |
| giftin-like-scan | PASS | FAIL 2 before the test fix (LIVE pace, see above) → PASS (d1189f31, df27de17, 2bbe47b7) |
| d19-gift Fold + iPad | FAIL 1 = the known flaky iPad/Fold card overflow (pre-existing, d-giftin review) | FAIL 4 before the test fix (bare LIVE aecbc267: FAIL 3, same set-up lines) → PASS Fold + iPad (d1189f31, df27de17); on 2bbe47b7 only the known card-overflow check fails (Fold + iPad), and bare LIVE 8a1a71de fails it too (iPad) = the flaky ticket from the d-giftin review, not this diff |
| gift-dead y05-ncBtuc-035 / y14-ncBtuc-010 | PASS / PASS | PASS / PASS |
| undef-scan | PASS (372) | PASS (378) on d1189f31 / df27de17 / 2bbe47b7 |
| LIVE tests touched by the 8a1a71de merge: kri-one-row · d-row37 · gift-return-scan · kit/gift-back | — | PASS / PASS / PASS / PASS (2bbe47b7) |
| LIVE kit-hand tests (5fc4bc79 merge): kit-hand-clip · kit-hand-dupmat · kit-empty-under | — | PASS · PASS · FAIL 3 = bare LIVE 5fc4bc79 FAIL 3, the same 3 cases (pre-existing; for KK) |
| dayq-noturn (LIVE 8a30664e test; jfamg month-end opens the queue) | — | Fold N1 + N2 PASS (df27de17); iPad N1 + N2 PASS (df27de17); N3 iPad PASS on 2bbe47b7 AND bare LIVE 8a1a71de (very slow on this box: ~35 min a case set; the first runs were cut by my time limit, not failures) |
| quickcheck part 2 (by hand) + old save from LIVE | — | d1189f31: **QUICKCHECK PASS** · open 2225 ms · old save from LIVE loads + plays a buổi · perf median new/live: render 261/250, tab 537/611, buổi 1599/3224 ms, tasks>200ms 31/31 · df27de17: **QUICKCHECK PASS** (old save ok; render 289/335, tab 662/689, buổi 1872/2189, tasks>200ms 48/39) · 6e597833: **QUICKCHECK PASS** · open 2079 ms · old save from LIVE 5fc4bc79 ok · render 308/341, tab 750/676, buổi 2928/1860 (box noise; gate passed), tasks>200ms 46/61 |
| kit-std-scan REPORT_ONLY Fold + iPad | — | 16 findings (X06 ×12, X08 ×4), ALL tab:court = LIVE baseline; Thư nhà tab / dialog: 0 |
| shots Fold 755x1000 + iPad 1180x820 (outside git, looked at) | — | Thư nhà tab (mother row, act card, list) · dialog (5 kit cards, odds words, greyed item card last) · result after Nặng bạc (Đức +2, Danh +3/+2 by stat-pace, Bạc −95, liking 50→62, «tháng này đã gửi» lock) |

## Merge / build
- Merge onto 5fc4bc79: sources auto-merged (kit-hand files untouched here); dialog re-shot on Fold: same 5 cards + ✕, no overflow.
- Merge onto 8a1a71de: **two real hand hunks** j8 giveTo / j83 wkGive — row-10 giftin (the giver's gain to HER waits for her answer, pp.kg) vs LIVE K-RING-ONEROW (print the real rise via affGot): kept the giftin structure; giftKeepGo now returns affGot(r,a,…) so keepGain.d prints the real rise for an NPC receiver. jbal2 union (BAL.ghetHit + BAL.gift.fam). giftin-like-scan / gift-back / kri-one-row / d-row37 PASS after.
- Merge onto 8a30664e (after aecbc267): sources auto-merged (j93 / jnf / jverdict untouched by this branch); index.html / sw.js rebuilt.
- Merge onto aecbc267: jbal2 union (LIVE SIDEQ/PUNISH blocks + BAL.gift.fam), assemble union (+ jfamg after jkcg; LIVE jcover/jdead kept); index.html conflict → rebuilt.
- CDN host ctm-img.victoria-tntt.workers.dev gives 403 on this box: build_site.sh run with the img/*.json list taken from LIVE sw.js and assets.json = LIVE. **The lander rebuilds index.html / sw.js** with build_site.sh + CHANGE line.

## Notes for D (not blocking)
- The result card lists her own stats only; the mother's liking gain shows in the Thư nhà row (50 → 62), not on the card.
- The worker's report (on review/d-family-gift) still lists the old Nặng numbers; BAL.gift.fam in jbal2 is the source.

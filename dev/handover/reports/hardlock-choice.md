# hardlock-choice — no choice card may lock her (SEAT C, brief b-coop-0045)

HARD-LOCK FIXER (opus) session_01N1tNP3HWwA785d24xRGQTm · START_CTX ≈3 % (used_tokens read 0 → estimate) · roll at ≈28 %, ceiling 60 %.
PRIORITY #1 CHECK ('j68c'): OD 0 | ledger 0 | claims 8 | main 15 | review/* 0 | archive 0 · ('hard-lock'): all 0 — reused: the one choice path j3 showModal / chooseM, kit grey jgrey (kitOff / kitOffBac), kit ✕ (kitCancelIx / kitModalCloser), harvest of dev/tools/choice-value-scan.js; nothing rebuilt.

## SẴN SÀNG KIỂM review/hardlock-choice ea9cfd51da75974e8e07b12719c2c37772a1f147 (from LIVE 502c48c9)

### What was wrong (FIXER #9, LIVE, solo + co-op)
j68c «VIỆC · Kẻ hầu» j68c-serv-022: all 4 stances cost bạc (BAL steps 2/1/1/1 × 60); at 46 bạc j3 showModal greys every road (poor), the card has no ✕ → the game stands still. Law 2 («a bạc road always has another road of equal cost») + law 3 broken; a dead end.

### Fix (shared engine, not per card — law 11)
`dev/build/jnolock.js` (assembled LAST, after jcoophl: the outermost showModal / chooseM wrappers, so the thin guest, the host running her pick, bots, the ✕ closer, the co-op timer and every inner wrapper see the same roads):
- `kitLockWhy(c,m)` = ONE list of every hold-back the game has: kit grey (c.off), bạc short, gift lock (c.lock), night taken (j75 c.lk), temper (jemoact eaLockWhy). `kitTakeable`.
- `kitNoLock(m)` before every draw and every pick: a road she can take or a ✕ → nothing changes. Else every road held back by **bạc alone** is offered paid with an **equal value**: her whole purse, the rest in Sức (then Danh) at `BAL.nolock.per` = the j68c step table (one bạc step == one Sức step: 40/8 = 5 bạc per Sức; 40/3 per Danh) — all such roads change the same way, so they stay equal (law 2); the road name gets `BAL.nolock.tag` « (thiếu bạc, lấy công sức bù)»; Tốn row shows the real numbers (Bạc −46 · Sức −15). Nothing payable (no Sức / Danh either) or held back by rank / item / evidence → a «Thôi» road is added: the kit ✕ on an open card, a plain road on a forced card (mustChoose); it leaves the card, nothing paid. Undone and worked out again every pass (her purse can change). A road greyed by rank / item keeps its price and grey (never paid another way).
- `BAL.nolock` (jbal2.js, after BAL.j68c; numbers derived from BAL.j68c.fx.m — law 4). `jgrey.js kitOffBac` tags `c.off.k="bac"` (data tag only, no look change) so a bạc grey set by a builder can be paid the same way; a stale bạc grey she can now pay is cleared.
- No new UI part: the same kit option card, Cần/Tốn rows, kit ✕ (law 9). Words cổ trang, no digits in the tag (law 7).

### Family scan — `node dev/tools/hardlock-scan.js [--turns N] [--purse 0,46] [--md]` (from a built repo root)
Walks every PEND builder (2 pp variants), every EV6 j68 template (old 90 + 460 composed, own cast), MF7 / FV7 / FX7 / WORLD cards / TSA summons, + N buổi steps (nextBuoi); draws each card through the REAL showModal at purse 0 and 46 bạc and judges the DOM she sees (open roads + kit ✕). Always-on PLANT (2 roads, both bạc over her purse, no ✕) as self-test. Static part: every seed file option set whose EVERY option costs bạc.

| scan (`--turns 40 --md`) | LIVE 502c48c9 | head ea9cfd51 |
|---|---|---|
| choice cards judged | 906 | 907 |
| HARD LOCKS | **2**: j68c-serv-022 «Kẻ hầu» (120/60/60/60 bạc), j68c-sea-023 «Thời tiết» (4 × 60 bạc) | **0** |
| PLANT (self-test) | LOCKED | not locked (guarded) |
| page errors | 0 | 0 |
| static: seed option sets all-bạc | 6 (j68c-serv-022, j68c-sea-023, j72c-craft-007/029/057, j72c-social-013) | 6 (data unchanged; the 2 j68c are now guarded by the engine; the 4 j72c are «pick» steps of an accepted favour in the Việc nhờ panel, which always has «Bỏ việc» (q72Drop) → never a lock) |

Coverage note: 243 of 550 j68 templates had no cast in the one scan world (their people / needs absent); every composed seed's prices come from data, so the static part covers all 460 of them. 8 cards were held back by other wrappers (j95c clash / festival not today) and not judged — same on both builds.

### Gates (commands + outputs)
- `node dev/test/hardlock-choice.js` (new; Fold 755x1000 + iPad 1180x820): on LIVE 502c48c9 → `HARDLOCK-CHOICE FAIL (12)` («at 46 bạc she can take a road (0 open, ✕ false) — [off] Thưởng nặng… | [off] Đưa nàng… | [off] Kể công… | [off] Cầm tay…», both devices); on head → `HARDLOCK-CHOICE ALL PASS` (3 runs): 4 roads open at 46 bạc, road taken pays Bạc −46 + Sức −15 (74 bạc short at 5 bạc/Sức), card gone; enough bạc → card untouched; purse 0 + no Sức/Danh → kit ✕, leaves, nothing paid; forced card greyed by rank → one plain «Thôi», rank-greyed road keeps price + grey; 0 page errors.
- `bash dev/tools/quickcheck.sh` → `QUICKCHECK PASS · 267 s · open 2191 ms · old save ok · perf (median of 3, new/live): render 286/296 ms, tab 594/542 ms, buổi 2097/4534 ms, tasks>200ms 26/27 · core gates PASS · build 3 s · total 683 s` (core gates: one-core-guard · rules-one-source · kit-conform · coop-one-world · hooks 7; TIME-SPILL GUARD PASS).
- `node dev/test/one-core-guard.js` → `PASS: one core (no second value, no typed core text, no new inline rule number)`.
- `python3 dev/build/assemble.py && node dev/test/undef-scan.js` → `PASS: no unguarded undefined identifier (302 names checked)`.
- `node dev/test/coop-e2e.js` (Fold host A + iPad guest B, LIVE Worker) → `142/142 passed` (co-op: the wrappers are outermost, so the thin guest and the host running her pick build the same roads; the added «Thôi» goes through closeModal = her i:-1 leave on the host).
- SHOTS (scratch only, not in git; LOOKED 3×): serv022 at 46 bạc, Fold + iPad: kit VIỆC frame, 4 open option cards, Tốn «Bạc -46 · Sức -17/-4» (before the rate fix to the pure step rate), no overflow, names wrap, no cut text.

### Notes for Foreman B (not blocking)
- Data law 2 (content, not a lock any more): j68c-serv-022 / j68c-sea-023 have no non-bạc stance; j72c-craft-007/029/057 + social-013 «pick» steps are both-bạc. The engine now always leaves a road, but a writer pass could give each a non-bạc stance of equal steps.
- Existing scripts that check `c.fx.bac&&S.bac+c.fx.bac<0` inline (bots/measures, jcooptimer autoRead, j87, jemoact) keep working: after kitNoLock the paid-another-way road is no longer «poor».

## REVIEW r1 — FAIL (BIG reviewer Seat E, b-coop-0045; session_01N1tNP3inDSatM7LPmx51yi)
PRIORITY #1 CHECK ('altCost|bacTuan|altK|nolock'): OD 1 (OD:L582 bạc road = equal value valued AT HER RANK) | main jstory.js:43–45 altCost / BAL.bacTuan / BAL.altK (used by altOf67, jstory j72 alt :122–124, jeitem eitAlt :126) | review/* hardlock-choice only | claims Seat C fixer 3HWwA785.
Reviewed ea9cfd51 bare + merged onto newest origin/main 5d4f722f (merge 2d05a78d, clean; site rebuilt, not pushed).

### Gates (all run by the reviewer; outputs)
| gate | LIVE 502c48c9 | head ea9cfd51 | merged 2d05a78d |
|---|---|---|---|
| `node dev/test/hardlock-choice.js` (Fold + iPad) | `HARDLOCK-CHOICE FAIL (12)` (exit 1) | `HARDLOCK-CHOICE ALL PASS` (30 ok) | `HARDLOCK-CHOICE ALL PASS` (30 ok) |
| `node dev/tools/hardlock-scan.js --turns 40 --md` | `FAIL · 906 cards · HARD LOCKS 2 · PLANT LOCKED` | `PASS · 907 · HARD LOCKS 0 · plant guarded · page errors 0` | `PASS · 907 · HARD LOCKS 0 · plant guarded · page errors 0` |
| `node dev/test/one-core-guard.js` | – | PASS | PASS |
| `node dev/test/undef-scan.js` | – | PASS (302 names) | PASS (302 names) |
| `node dev/test/coop-e2e.js` (Fold host) / `COOP_SWAP=1` (iPad host) | – | – | 142/142 · 142/142 |
| `bash dev/tools/quickcheck.sh` ALONE | – | – | `QUICKCHECK PASS · old save ok · render 186/206 ms, tab 389/449, buổi 1487/1298, tasks>200ms 21/23 · core gates PASS` |
Perf: the outer wrapper is two short loops per draw/pick; quickcheck buổi 1487 vs 1298 ms is within run noise of the fixer's own 2097/4534; no concern. Co-op: guest pick + host replay both pass through the wrapper in her context, «Thôi» → closeModal → i:-1; both seat orders pass. Existing affordable cards: untouched (test c, scan).

### FAIL list (fix on review/hardlock-choice, then SẴN SÀNG KIỂM again)
1. **BLOCKING — the rescue road can kill her (law 3 / law 6, game-breaking).** `kitBacSub` counts what she can give from `S[k]−keep` but ignores the Sức (and Danh) the road ALREADY costs; `fx[k]=(fx[k]||0)+sub[k]` then stacks both. Reviewer probe (Fold, head): forced card 2 × `{bac:-60,suc:-12}`, purse 0, Sức 13, Danh 0 → both roads shown OPEN «Tốn Sức -24», picked → `S.suc 0` (j3:123 `S.suc<=0 → die`). Real card: j68c-serv-022 stances 3 + 4 are `{bac:-60,suc:-12,…}` → at purse 0 with Sức ≤ 24 the offered road drains her to 0. Fix: room left = `S[k] − keep[k] − max(0,−own fx[k])`; a road whose TOTAL fx would take any key below keep is never offered (→ next means, else «Thôi»). Add this case to dev/test/hardlock-choice.js (must FAIL on ea9cfd51).
2. **Law 2 by OD:L582 + law 13 reuse / law 4 one value.** OD:L582: the non-bạc road «must hurt as much as [the] bạc does at that rank (bạc is scarce at low ranks, so value it by how hard it is to earn at her rank)». The game already has that ONE rule: `altCost(bac,rank)` (BAL.bacTuan + BAL.altK, capped at altK.sucMax). BAL.nolock.per is a second, flat bạc→Sức worth (5 bạc/Sức at every rank, no cap). Same 74 bạc short at rank 3: nolock Sức −15 vs altCost Sức −20; rank 0 and rank 7 also differ; 0 purse vs a 240-bạc road → Sức −48 in one tap (no cap). Fix: price the short part through `altCost(short,S.rank)` (its Sức; Danh only when Sức cannot reach, at a rate derived from the same rule), drop BAL.nolock.per. All roads still change alike (same function) — the law-2 claim keeps.
3. nit — jnolock header says «at the j68c step rate × the rank price factor»; there is no rank factor in the code. After fix 2 the comment must say what the code does.
4. not blocking (content, law 2/6): j68c-serv-022 / j68c-sea-023 still have no non-bạc stance; j72c-craft-007/029/057 + social-013 «pick» steps all-bạc (panel has «Bỏ việc», so no lock). Writer pass to give each a non-bạc stance of equal steps — Foreman B to queue.
Law check: 1 OK (both seats) · 2 FAIL (item 2) · 3 FAIL (item 1) · 4 FAIL (item 2: second rate) · 6 content note (item 4) · 7 OK («Thôi», « (thiếu bạc, lấy công sức bù)», no digits) · 9 OK (kit ✕ / kit option card, no new part) · 11 OK (scan walks PEND + 550 j68 + MF7/FV7/FX7/WORLD/TSA + 40 turns + static seeds + plant; only Q-path cards — panels outside Q, e.g. Việc nhờ, rely on their own leave road; accepted) · 13 FAIL (item 2: altCost not reused).

## FIXER r2 (SEAT F, b-coop-0045; session_01N1tNP5Yc6auMDK1Fws7jFB) — SẴN SÀNG KIỂM review/hardlock-choice b7ea3141414110da26a426c6051b4bab7cf4ee20
START_CTX ≈3 % (used_tokens read 0 → estimate) · roll at ≈28 %, ceiling 60 %.
PRIORITY #1 CHECK ('altCost|bacTuan|altK|nolock'): reused the reviewer's hits — jstory.js:43–45 altCost / BAL.bacTuan / BAL.altK (already used by altOf67, jstory alt72, jeitem eitAlt); review/* hardlock-choice only; claims Seat F only. Nothing new built.
Base: r1 ea9cfd51 + merge newest origin/main d6b6fd6f (LIVE; only built index.html / sw.js conflicted → took main's, site rebuilt).

### What changed (r1 FAIL items)
1. **BLOCKING fixed — the swap never stacks past her floor.** `kitBacSub(c,short)`: room in k = `S[k] − BAL.nolock.keep[k] − the road's OWN cost in k`; new `kitFloorOk(fx)`: a swapped road whose WHOLE fx would take Sức below 1 (Sức 0 = death, j3) or Danh below 0 is never offered → stays closed → «Thôi» if nothing else. Reviewer probe 2×{bac:-60,suc:-12}, purse 0, Sức 13, Danh 0: r1 both roads open «Sức -24» → Sức 0; r2 both closed, only «Thôi», Sức stays 13.
2. **One core (law 2 OD:L582 / 4 / 13).** BAL.nolock.per (flat 5 bạc/Sức) REMOVED. The short bạc is priced by the game's one rule `altCost(short, S.rank, BAL.nolock.floor, 0).suc` (BAL.bacTuan + BAL.altK, capped at altK.sucMax 20; floor 1 Sức so a tiny short is never free; altCost's pen = an odds cut, card roads have no roll). Sức she cannot spare is taken as Danh at `BAL.nolock.of.danh` = j68c step ratio 3 Danh : 8 Sức (a Sức→Danh step equivalence from BAL.j68c, not a bạc worth). All bạc-held roads go through the same function → still equal (law 2).
   | short bạc | r1 (flat) | r2 altCost Sức, rank 0/1/2/3/4/5/6/7 |
   |---|---|---|
   | 14 | Sức −3 | 16/13/11/7/6/5/4/4 |
   | 74 (serv-022 at 46) | Sức −15 | 20 at every rank (cap) |
   | 240 | Sức −48 (no cap) | 20 at every rank (cap) |
3. nit fixed: jnolock header + BAL.nolock comment now say exactly what the code does (altCost at her rank, Danh via the step ratio, floor check). No «rank price factor» text left.
4. Content note for writers (not mine, Foreman B to queue): j68c-serv-022 «Kẻ hầu» and j68c-sea-023 «Thời tiết» need a real non-bạc stance of equal steps; j72c-craft-007/029/057 + j72c-social-013 «pick» steps are all-bạc (panel has «Bỏ việc», no lock).

### Gates (commands + outputs)
| gate | LIVE d6b6fd6f | r1 ea9cfd51 | head r2 |
|---|---|---|---|
| `node dev/test/hardlock-choice.js` (Fold + iPad; now 36 checks incl. new (g)(h)(i)) | `HARDLOCK-CHOICE FAIL (18)` exit 1 | `HARDLOCK-CHOICE FAIL (8)` exit 1 — (g) «Sức stays 0 … Đường A (thiếu bạc, lấy công sức bù) \| Đường B …», (h)/(i) «Sức 0 ≥ 1», (b) «Sức -15 = own 0 + altCost -20» | `HARDLOCK-CHOICE ALL PASS` exit 0 |
| `node dev/tools/hardlock-scan.js --turns 40 --md` (plant always on) | `HARDLOCK-SCAN FAIL · 906 · HARD LOCKS 1 · PLANT LOCKED` (sea-023 not drawn this run — season) | – | `HARDLOCK-SCAN PASS · 906 · HARD LOCKS 0 · plant not locked (guarded) · page errors 0` |
| `node dev/test/one-core-guard.js` | | | `PASS: one core (no second value, no typed core text, no new inline rule number)` |
| `node dev/test/undef-scan.js` | | | `PASS: no unguarded undefined identifier (304 names checked)` |
| `node dev/test/coop-e2e.js` (Fold host) / `COOP_SWAP=1` (iPad host) | | | `142/142 passed` / `142/142 passed` |
| `bash dev/tools/quickcheck.sh` ALONE | | | `QUICKCHECK PASS · 231 s · open 1937 ms · old save ok · perf (median of 3, new/live): render 262/263 ms, tab 488/549 ms, buổi 1656/1488 ms, tasks>200ms 23/26 · core gates PASS · total 627 s` |
Head test lines (Fold, iPad same): «(b) the rest (74 bạc) paid as Sức -20 = own 0 + altCost -20» · «(g) … no swapped road open, only «Thôi»; Sức stays 13» · «(h) Sức 40 → road open, Sức -32 = own -12 + altCost -20; she keeps Sức 8 ≥ 1» · «(i) Sức 14, Danh 30 → the rest in Danh ({"suc":-13,"danh":-8}); Sức 1 ≥ 1, Danh 22» · 0 page errors.

## REVIEW r2 — PASS (BIG reviewer Seat E, b-coop-0045; session_01N1tNP3inDSatM7LPmx51yi)
PRIORITY #1 CHECK: same as r1 (altCost / BAL.bacTuan / BAL.altK reused; nothing rebuilt).
**LAND READY hardlock-choice-r2 c8a2bb3e11a22149cb4d779b6c476d9d365cf710 FOR MAIN 131 / LC13** (branch review/hardlock-choice-r2 = b7ea3141 + final merge of LIVE origin/main 49f17d4d, index.html/sw.js conflict only → rebuilt; ancestor check: origin/main 49f17d4d ⊂ c8a2bb3e). Stale review/hardlock-choice-r1 (cd064c5c, an older merge of mine) — ignore; the remote refused my delete.
### r1 FAIL rows
1. FIXED — kitBacSub(c,short): room = S[k] − keep − the road's own cost; kitFloorOk drops a swapped road whose whole fx takes Sức < 1 / Danh < 0. Test (g): 2×{bac:-60,suc:-12}, purse 0, Sức 13 → only «Thôi», Sức stays 13; (h) Sức 40 → Sức −32 (own −12 + altCost −20), keeps 8; (i) Sức 14, Danh 30 → {suc:−13, danh:−8}, Sức 1, Danh 22. LIVE fails (g)(h)(i).
2. FIXED — BAL.nolock.per gone; the short bạc is priced by altCost(short,S.rank,floor 1) (OD:L582 «at her rank», one rule, altK.sucMax cap); Danh only for the Sức she cannot spare, at the j68c Sức:Danh step ratio (BAL.nolock.of, derived). one-core-guard PASS.
3. FIXED — header comment says what the code does.
4. Content note kept in the report (writer pass for j68c-serv-022 / sea-023 non-bạc stance) — not blocking.
### Reviewer small fix (pushed on the r2 branch, c8a2bb3e)
LIVE 49f17d4d brought jdayq (solo new-day order) which holds back every card when `!window.__bot` → the scan drew NOTHING (`not drawn 904`, so «HARD LOCKS 0» meant nothing). dev/tools/hardlock-scan.js __hlJudge now sets __bot=1 while judging (restored after). After: `not drawn 0`.
### Gates (reviewer runs, outputs)
| gate | LIVE 49f17d4d | bare b7ea3141 | merged c8a2bb3e (and earlier merges 2b68/3a32/4232) |
|---|---|---|---|
| hardlock-choice.js Fold+iPad | `HARDLOCK-CHOICE FAIL (18)` | `ALL PASS` (36 ok) | `ALL PASS` (every merge) |
| hardlock-scan.js --turns 40 (fixed scan) | `FAIL · 905 · HARD LOCKS 2 · not drawn 0 · PLANT LOCKED` | (LIVE 2b68: FAIL 2 / merged PASS 0) | `PASS · 904 · HARD LOCKS 0 · not drawn 0 · plant guarded · page errors 0` |
| one-core-guard / undef-scan | – | – | PASS / PASS (305 names) |
| coop-e2e Fold host / COOP_SWAP=1 iPad host | – | – | 142/142 · 142/142 |
| quickcheck.sh ALONE | – | – | `QUICKCHECK PASS · old save ok · render 186/205, tab 483/472, buổi 989/1137, tasks>200ms 22/20 · core gates PASS` |
| viecnho-fix.test.js (main's new Việc nhờ, merge 4232) | – | – | ALL OK |
Law check: 1 OK · 2 OK (one altCost function for every swapped road; Tốn row shows the real cost before she picks) · 3 OK (never below floor; «Thôi» costs nothing, gains nothing = a leave) · 4 OK · 6 content note (row 4) · 7 OK · 9 OK · 11 OK (scan + plant, fixed for jdayq) · 13 OK.
Non-blocking: the scan's «N buổi steps» part catches 0 cards from 40 turns on LIVE and head alike (jdayq era) — the static + builder parts carry the coverage; scan keeper may revisit.

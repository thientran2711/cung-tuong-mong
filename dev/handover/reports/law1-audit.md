# LAW-1 (TWO-WAY) WHOLE-GAME AUDIT — Foreman B worker

PRIORITY #1 CHECK ('law1-audit|two-way|role-parity'): OD 48 | ledger 3 | claims 8 | main 15 | review/* 10 | archive 0 — reuse: dev/tools/role-parity-scan.js (+ exempt/open json), reports/role-parity*.md, ag-all-parity.md; all old review/role-parity* branches landed or superseded → base LIVE main c0dff1b3.
PRIORITY #1 CHECK ('bancung|ban cung|Cầm cố|wdPawn'): OD 4 | ledger 0 | claims 8 (D built Ban cung #14, landed 21/11; no open job) | main 15 | review/* 0 | archive 0.

Worker session_01N1tNP2qbiASDhL5cLTai4Z (opus) for Foreman B session_01N1tNP5QAMJMb8uPDHpuXza. START_CTX ≈ 3 % of 1M (estimate) → rollover at ≈ 28 %, ceiling 60 %.
Order: OD 24/11 ~08:35Z (MAIN CHÍNH 116, verbatim in dev/OWNER_DECISIONS.md) + brief dev/handover/briefs/b-law1-audit.md. Work branch review/law1-audit (from LIVE c0dff1b3).

## Scanner extension (one scanner, families as rows)
- dev/tools/role-parity-fam.js (new, required by dev/tools/role-parity-scan.js): the RULE FAMILIES that are not one button — gifts given and received, likes/dislikes holders, dislike effect, likes knowledge, per-nết thresholds, promotion routes, selection contest, endings/leaving/lãnh cung, knowledge (knFor / moodCauseKnownBy / greetName), notices, ban cung, contests/mini-game boards, wardrobe pawn, co-op.
- Proof per row = a runtime probe in one seeded consort life (the game's own functions called for S AND for an NPC) + static call-site checks on the built index.html.
- `node dev/tools/role-parity-scan.js index.html --fam` runs the families only (~1 min); the full scan appends the family table after the act table.

## GAP TABLE — families (LIVE c0dff1b3, `--fam`)
| family | rule | her side | NPC side | reverse | verdict | owner | fix plan |
|---|---|---|---|---|---|---|---|
| Quà tặng | Tặng quà | she gives to anyone (giveTo, kit «Tặng») | NPC gives (AG cx:gift → giveTo): to her yes, to an NPC yes | same giveTo both ways | SAME | D | — |
| Quà tặng | Có sở thích / sở ghét | her: ghét 2 · thích 0 | consort ghét 2 · thích 1 · Emperor ghét 2 · thích 6 · Thái hậu ghét 2 · thích 0 · servant ghét 0 · thích 0 · man ghét 1 · thích 0 | — | GAP | D | missing likes or dislikes (save field / like keys): her, servant, man, th (OD ~06:35Z/~07:20Z; D order 07:21Z) |
| Quà tặng | Quà trúng sở ghét → mất thiện cảm | only when SHE gives (jdis giveTo wrap a===S) | NPC giver: no rule; she as recipient: no dislikes | reverse (NPC → her): NONE | GAP | D | one rule for every giver/recipient: liked ↑ · neutral small/none · disliked ↓ (BAL.dis), D order 07:21Z |
| Quà tặng | Biết sở thích người khác | she learns NPC likes/dislikes (talk, spy, gift) | NPC learns nobody's (no store) | — | GAP | D | with her likes (D): NPCs learn and use likes by the same roads |
| Ngưỡng theo nết | Thân / oán → hành động theo nết | flat thresholds (BAL.ag.know.friend …), BAL.net.T refs 14 | same flat numbers for every NPC | — | OPEN | D | per-nết thresholds design (D order 06:02Z, examples only 06:40Z) |
| Thăng phẩm | Sinh hoàng tử / ân thi (PROMO_SRC) | her (promoReward(S…) ×3) | NPC (promoReward(v…) ×3) | — | SAME | D | — |
| Thăng phẩm | Đại lễ / sủng ái (ngưỡng theo nết vua) / truy phong | not on LIVE | not on LIVE | — | OPEN | D | promo-redesign (D order 08:33Z; waits for sếp) — one route table for her and every NPC |
| Tuyển tú | 12 tú nữ thi, top 4 giữ | LIVE score code ×0 | other 11 girls scored by the same 3 tests | — | OPEN | MAIN (SELSCENE-4) | review/selection-scene (OD ~06:15Z/~06:20Z: same formula, score only from the 3 tests) |
| Kết cục / rời cung | Tự rời cung = kết cục | her own choice → ending (E64 leave-palace) | NPC leaves by her own road (jgenpc left) ×19 | — | OPEN | E | E64b review/leave-palace: severity ladder for forced removal applies to NPCs too (OD ~07:55Z) |
| Kết cục / rời cung | Lãnh cung: thẻ trong lãnh cung | her coldActsOf cards | NPC chooses among HER cards (jagacts3 coldMonth) ×3 | Hoàng hậu xử tội both ways | SAME | E | — |
| Tin tức / biết | Ai biết chuyện (knFor) | knFor(S,…) ×2 | knFor(NPC,…) ×6; runtime her true / NPC true | one rule | SAME | B | — |
| Tin tức / biết | Biết nguyên do tâm trạng (moodCauseKnownBy) | her | NPC | true | SAME | B | — |
| Tin tức / biết | Chào hỏi, xưng tên (greetName) | her → NPC true | NPC → her true · NPC ↔ NPC true | one function | SAME | B | — |
| Tin tức / biết | Tin báo («!» / Tin trong cung) | her: kitNotice box (UI) | NPC: the same knFor → news (newsAdd) | — | EXEMPT | B | UI only: the notice box is her screen; who learns what is knFor (row above) |
| Ban cung | Tâu xin cung khác | her bcAsk | NPC bcNpcAsk → bcAsk (same odds/gains/losses) | a refused ask makes the top rival's relation drop either way | SAME | B | — |
| Ban cung | Nhận chỉ (Đức +) | her «Nhận <cung>» Đức +ducTake | NPC who does not ask: nothing | — | GAP | B | bcNpcAsk: no ask → accept, Đức +BAL.banCung.ok.ducTake (one gain) |
| Ban cung | Xin cung thấp / ngang (khiêm nhường) | her humble ask (Đức +ducHumble) | NPC only asks UP | — | GAP | B | bcNpcAsk: a humble nết (BAL.net.n.bcHumble) may ask the humble palace on the same card |
| Hội thi / mini-game | Điểm hội thi (cScore7) | her (mini-game or formula) | every entrant, same formula + same luck | — | SAME | B | — |
| Hội thi / mini-game | Càng lên càng khó (bàn chơi theo phẩm) | her board mgTier(rank) | NPC play mgNpcRaw on the board of HER seat: rank0 6.225 → rank6 3.775 | — | SAME | B | — |
| Tư trang | Cầm cố / chuộc đồ | her «Cầm cố» + «Chuộc» (j92 wdPawn / wdRedeem) | NPC short of silver only SELLS (j92 wdMonth → wdSell); never pawns / redeems | — | GAP | B | NPC poor → pawn or sell by nết (same wdPawn); redeem when silver allows; expiry for everyone |
| Co-op | Bạn chơi = một người trong cung | her acts on the friend = on a consort card | NPC acts on the friend (rival entry {coop:true}) | — | SAME | B | — |
| Co-op | Vay / lấy trộm khẩu phần | NPC borrows / steals from her (host) | never from the friend (jagacts4 p4Lender/p4StealT skip x.coop ×2) | friend → NPC: her own cards | GAP | B | parked: the friend's chest lives on her own seat; a cross-seat item move needs the item-ledger protocol (item-ledger.md parked row) → follow-up job |

Verdicts: SAME = both sides, one rule · GAP = one side missing · OPEN = owned by another lane, being built (not duplicated here) · EXEMPT = UI only.

## Owner split
- **D (sent nothing to build — already ordered by MAIN 116)**: likes/dislikes for everyone incl. her + servants + men, the gift rule for every giver/recipient (07:21Z order), NPCs learning likes, per-nết thresholds (06:02Z/06:40Z), promotion routes (promo-redesign 08:33Z). Note for D: her S.dis is already drawn by disOf (2 keys on a fresh life) but never used — the jdis giveTo wrap only fires for `a===S` givers.
- **E**: own-choice leaving = ending, severity ladder for forced removal — must hold for NPCs too (E64b review/leave-palace).
- **MAIN (SELSCENE-4, review/selection-scene)**: the 12 tú nữ scored by the same 3 tests (OD ~06:15Z / ~06:20Z).
- **B (this job)**: Ban cung «Nhận chỉ» + humble ask for NPCs · NPC «Cầm cố» / «Chuộc» · co-op ration borrow/steal never targets the friend (parked: cross-seat item move needs the item-ledger protocol; follow-up job proposed, not built here).

## Act table (buttons, role × act) — re-run on LIVE c0dff1b3 (13 min)
ROLE PARITY: rows 239 · cells {"—":655,"SAME":942,"NUM":384,"N·draw":7,"P-ONLY":11,"N-ONLY":2,"EXEMPT":389} · gaps 13 = exactly dev/tools/role-parity-open.json (no drift since the last round). PROMOTION npc/me: act sets equal.
- REAL (B, closed here): «Cầm cố» t4–t7 + hh (5 rows, an NPC never pawned) · maid:beside (N-ONLY: the player maid's «Hầu bên cạnh chủ» sat in the rv/hh branch with v===m, but her own master's card is sk "mis" → dead for every master except a Hoàng hậu).
- Carried (documented in earlier rounds, all SAME in every t1…hh column; only the «up» column = the moment of promotion, household / ration not yet given): up cx3:def_* ×4, up cx3:staffHoi, up cx4:rougeBorrow, up cx:buy (probe world, B4 note).

## FIXES (review/law1-audit, from LIVE c0dff1b3)
| # | gap (family) | LIVE c0dff1b3 | branch | how (one rule, law 1) | numbers (law 4) |
|---|---|---|---|---|---|
| 1 | Ban cung «Nhận chỉ» | GAP: NPC who does not ask gets nothing (her «Nhận» = Đức +1) | SAME | jbancung bcNpcAsk: no ask → takes the decree, Đức + ok.ducTake | BAL.banCung.ok.ducTake |
| 2 | Ban cung humble ask | GAP: NPC only asked UP | SAME | bcNpcAsk picks among HER roads by nết: humble nết → humble palace (Đức road), else up (Danh road, incl. same standing nearer = her danhNear road), else Nhận; same bcAsk odds / gains / losses | BAL.net.n.bcHumble (Khiêm nhường, Ân cần) |
| 3 | Tư trang «Cầm cố» / «Chuộc» | GAP: NPC short of silver only sold (wdSell); never pawned / redeemed; expiry ran for her only | SAME | j92 wdNpcPawn (wdPawn by nết, else wdSell), wdNpcRedeem (same wdRedeem when silver stays above the poor line), wdPawnMonth for every consort; NPC pawn leak → palace news like a sale | BAL.net.n.wdPawn; BAL.ag.why.wd.poor (existing); WD prices (existing) |
| 4 | maid «Hầu bên cạnh chủ» | N-ONLY: dead branch for the player | SAME (scan: N-ONLY row gone; open list trimmed) | j42 srvTalk: on her master's card (sk "mis") when the master is away — the NPC maid's jagstaff asMisHome rule — the same SRVA.beside row | SRVA.beside (existing) |
| 5 | Co-op ration borrow / steal | GAP: NPCs borrow / steal from her (host) never from the friend | PARKED | the friend's chest lives on her own seat; a host-side item move into / out of her blob has no way back (same parked row as «Trả lại quà», item-ledger.md) → proposed follow-up job: cross-seat item request through the co-op protocol, then drop the x.coop skip in jagacts4 p4Lender / p4StealT | — |
Gains AND losses (laws 2–3): every NPC road above is her road with her gains and losses (bcAsk fail = Sủng/Danh loss + rival grudge; pawn = Bạc now, Bạc back to redeem, loss at expiry, leak = Danh −; beside = Chủ tin + / −). No new card, no new UI, no new wording (laws 7, 9): no shots needed.
Co-op: NPC decisions run where they ran before (bcNpcAsk host-only palFix wrap; wd NPC paths in the host world pass; wdNpcRedeem returns on a non-world seat).

## Tests / gates — branch head 0cf18edad63ac034b8e5f249c0aa9a62955092e5 (build files from 736f11eb, unchanged after)
- dev/test/law1-audit.test.js 13/13 PASS (on LIVE c0dff1b3 the same test fails: no BAL.net.n.bcHumble / wdNpcPawn).
- dev/test/role-parity.test.js PASS: no new act gap · law-1 families: no new GAP row (FAM_OPEN = 3 D gift rows + co-op ration) · open list 13 → 7 (OPEN_MAX 7) · promotion act sets equal both sides · no page errors.
- coop-e2e both seat orders: Fold host 142/142, COOP_SWAP iPad host 142/142.
- quickcheck PASS (core gates G1–G5 PASS incl. one-core-guard / text / bind / text-rule; old save loads + plays a buổi; perf median new/live render 275/284 ms, buổi 1557/1506 ms).
- undef-scan PASS (299 names).
- Shots: none — no card / UI / wording changed (all fixes are NPC-side rules + one existing kit option row reused for the player maid).

## Open after this branch
- D: gift rule for every giver/recipient + likes/dislikes for her/Thái hậu likes/servants/men + NPC likes knowledge (FAM_OPEN 3 rows; trim when D lands). Per-nết thresholds, promotion routes (designs pending sếp).
- E: own-choice leaving / severity ladder must hold for NPCs (E64b).
- MAIN SELSCENE-4: 12 tú nữ scored by the same 3 tests.
- B follow-up proposal: co-op cross-seat item request (so NPCs can borrow/steal ration from the friend too; drop the x.coop skip in jagacts4).
- Act table up-column timing rows (def_* ×4, staffHoi, rougeBorrow, cx:buy): carried, SAME in every rank column.

**SẴN SÀNG KIỂM 0cf18edad63ac034b8e5f249c0aa9a62955092e5** (review/law1-audit)
## Act table (buttons, role × act) — re-run on LIVE
(running; appended when done)

## REVIEW r1 — PASS (BIG reviewer-lander session_01N1tNP2ZbYMtMYdedMue4Fk, opus, for Foreman B)
PRIORITY #1 CHECK: reports/law1-audit.md first line | main dev/tools/role-parity-scan.js | review/law1-audit 0cf18eda | claims B (worker 2qbiASDh archived).
START_CTX ≈ 4 % of 1M. Read: START_CORE (18 laws) + START_WORKER + START_REVIEWER, OD «(24/11 ~08:35Z, MAIN CHÍNH 116 chat) OWNER (verbatim)», briefs/b-law1-audit.md, this report.
Branch review/law1-audit-r1 = 0cf18eda + merges of LIVE 35647d5e / 2308b425 / fd85907a / ac4790f0 + one reviewer fix. **PASS sha 18aca38902d8d936c3ce0189e5d1fd1ecf6792f7** (origin/main ac4790f0 is its ancestor → fast-forward).

### (1) Gap table — honest and complete
- Every family named in the order has a row (gifts given/received, likes/dislikes, per-nết thresholds, promotion routes, selection, endings/leaving/lãnh cung, knowledge/greeting/notices, ban cung, contests/mini-games, co-op, + wardrobe pawn). D / E / MAIN rows are only listed (OPEN or GAP with owner D/E/MAIN), nothing built for them.
- Spot-checked in code, both directions (7 rows): (a) «Quà trúng sở ghét» GAP true — jdis.js:65-66 giveTo wrap fires only for `a===S`; (b) «Biết sở thích» GAP true — like knowledge lives only in S.likK (jdis.js:77) / mK, no NPC store; (c) Lãnh cung SAME true — jagacts3 p3Cold picks from coldActsOf(v) (HER cards); (d) Co-op ration GAP true — jagacts4.js:30/32 p4Lender / p4StealT skip `x.coop`; (e) contests SAME true — jmgt mgNpcRaw on the seat board, probe rank0 > rank6; (f) Ban cung «Tâu xin» SAME true — one bcAsk(p,…) for S and NPC (same odds / gains / losses); (g) Cầm cố GAP on LIVE true — LIVE wdMonth sold only (wdSell), no NPC pawn/redeem.
- Note (not a fault): 4 rows are fixed text verdicts, not probes (Lãnh cung SAME, Co-op friend = a consort SAME, Tin báo EXEMPT, ngưỡng/promo/selection/leave OPEN) — each checked by hand above or owned by another lane.

### (2) Laws on each B fix
| fix | law 1 two-way | laws 2–3 equal value, gain+loss | law 4 BAL | law 6 real | law 7 / 9 wording, kit |
|---|---|---|---|---|---|
| Ban cung NPC «Nhận chỉ» | NPC now holds her «Nhận» (Đức +ok.ducTake) | her card unchanged; Nhận = gain-only (time cost), allowed | BAL.banCung.ok.ducTake | — | no new text / card |
| Ban cung NPC humble ask by nết | NPC picks among HER 3 roads (humble / up / Nhận), same bcChoices + bcAsk | ask: gain Đức/Danh, loss Sủng/Danh + rival grudge (unchanged) | BAL.net.n.bcHumble, BAL.banCung.* | — | log line reuses bcAsk text |
| NPC Cầm cố / Chuộc (j92) | wdPawn / wdRedeem / wdPawnMonth now for every consort | pawn: Bạc now, Bạc back to redeem, piece lost at expiry, leak Danh − | BAL.net.n.wdPawn, BAL.ag.why.wd.poor, WD | 6c: forfeited NPC piece goes to the item ledger market box (jil ilGuard wdPawnMonth → ilGone "pawn") — proven by the new test row | NPC leak → newsAdd text cổ trang, same as the sale text |
| maid «Hầu bên cạnh chủ» | player maid now has it on her master's card when the master is away (NPC maid's asMisHome rule) | same SRVA.beside row (Chủ tin + / −) | SRVA.beside | — | existing option row (kit) |
No new card / UI → no device shots needed (law 12 n/a). Note for a later job (not this branch, pre-existing): on her master's card the player maid keeps «Đấm lưng…» etc. when the master is away, while an NPC maid only gets them at home (jagstaff asOpts) — a small parity drift the act scan does not see (card vs place).

### (4) Reviewer fix on review/law1-audit-r1 (e8a672b9)
- j92 wdMonth: NPC pawn expiry and the NPC pawn/sell choice now run only in the world pass (`worldOn()`; co-op = host), like wdNpcRedeem already did. Before: the guest seat ran wdPawnMonth for every NPC copy → ilGuard could route an NPC piece into the GUEST's own item ledger (the coop dup family, jagwhy E44h T8). Her own expiry still runs on her seat.
- dev/test/law1-audit.test.js: the NPC expiry row now also asserts law 6c (the forfeited piece is in S.il.box at "mkt", why "pawn"): bx0 0 → bx1 1.

### (3) Tests — exact commands, output lines
BARE head 0cf18eda (worktree /home/user/wt/l1r, dev/index.html assembled):
- `node dev/test/law1-audit.test.js` → `law1-audit: 13/13 PASS` · `node dev/test/law1-audit.test.js index.html` → `law1-audit: 13/13 PASS`
- `node dev/tools/role-parity-scan.js index.html --fam` → `LAW-1 FAMILIES: rows 22 · GAP 4 · D:Quà tặng/Có sở thích / sở ghét ; D:Quà tặng/Quà trúng sở ghét → mất thiện cảm ; D:Quà tặng/Biết sở thích người khác ; B:Co-op/Vay / lấy trộm khẩu phần`
- `node dev/test/role-parity.test.js` → `ALL PASS` · `node dev/test/role-parity.test.js index.html` → `ALL PASS` (families: no new GAP row; open baseline ≤ 7 rows: 7; no NEW role-parity gap)
- `node dev/test/undef-scan.js` → `PASS: no unguarded undefined identifier (299 names checked)` · `node dev/test/one-core-guard.js` → `PASS: one core …` (fails 0)
- `node dev/test/coop-e2e.js <out>` → `142/142 passed` · `COOP_SWAP=1 node dev/test/coop-e2e.js <out>` → `142/142 passed`
- `bash dev/tools/quickcheck.sh` → `QUICKCHECK PASS · 294 s · open 2028 ms · old save ok · perf (median of 3, new/live): render 282/286 ms, tab 626/617 ms, buổi 1765/1704 ms · core gates PASS`
MERGED head 18aca389 (LIVE ac4790f0 merged; worktree /home/user/wt/l1m):
- `node dev/test/law1-audit.test.js` → `law1-audit: 13/13 PASS` (incl. `PASS wd expiry for an NPC (piece kept by the ledger at the market, law 6c) {"bx0":0,"bx1":1}`) · with `index.html` → `law1-audit: 13/13 PASS`
- `node dev/test/role-parity.test.js index.html` → `ok law-1 families: no new GAP row []` … `ALL PASS`; no-arg run → `ALL PASS` on b3d429b5 (LIVE fd85907a; ac4790f0 after it only touches the map: j27/j38/jres + map tests)
- `node dev/tools/role-parity-scan.js index.html --fam` (b3d429b5) → same 22 rows · GAP 4 (3 D gift rows + parked co-op ration)
- `node dev/test/undef-scan.js` → `PASS … (301 names checked)` · `node dev/test/one-core-guard.js` → `PASS: one core …`
- `node dev/test/coop-e2e.js` → `142/142 passed` · `COOP_SWAP=1 …` (iPad hosts) → `142/142 passed`
- `bash dev/tools/quickcheck.sh` → `QUICKCHECK PASS · 276 s · open 2254 ms · old save ok · perf (median of 3, new/live): render 314/288 ms, tab 692/720 ms, buổi 1683/1741 ms · core gates PASS` (old save from LIVE loads and plays a buổi)
- Flake noted: one earlier quickcheck on 6806c899 failed G4 dialog-fixed (#54 title plate) + perf buổi 4021 ms under load; dialog-fixed re-run alone PASS on both LIVE fd85907a and the branch; later quickcheck runs PASS. One no-arg role-parity run hit «Target crashed» while two scans ran in parallel (memory); re-run alone ALL PASS.

### (7) Open list after this branch (owner per row)
| # | open item | owner |
|---|---|---|
| 1 | Gift rule for every giver/recipient (liked ↑ · neutral · disliked ↓) | D (order 07:21Z) |
| 2 | Likes/dislikes for her, Thái hậu likes, servants, men | D |
| 3 | NPCs learn and use others' likes (incl. hers) | D |
| 4 | Per-nết thresholds | D (design waits for sếp) |
| 5 | Promotion routes (đại lễ / sủng ái / truy phong) for her and NPCs | D (promo-redesign, waits for sếp) |
| 6 | Own-choice leaving = ending; forced-removal severity ladder for NPCs too | E (E64b review/leave-palace) |
| 7 | 12 tú nữ scored by the same 3 tests | MAIN (SELSCENE-4, review/selection-scene) |
| 8 | Co-op: NPCs borrow/steal ration from the friend (cross-seat item request, drop x.coop skip in jagacts4) | B follow-up (parked: item-ledger protocol) |
| 9 | Act-table «up» column timing rows (def_* ×4, staffHoi, rougeBorrow, cx:buy) | B (carried, SAME in every rank column) |
| 10 | Player maid at an away master: «Đấm lưng / Xin thưởng / tiến cử» still shown (NPC maid: home only) | B (small parity follow-up, found in this review) |

**LAND READY law1-audit-r1 18aca38902d8d936c3ce0189e5d1fd1ecf6792f7**
<<<<<<< HEAD

## REVIEW r1 — re-merge 178cac37 (ORDER MAIN 121 10:38Z via Foreman B)
review/law1-audit-r1 = 18aca389 + merge of LIVE 178cac37 (kit-framefit: jflip / jk2b / jksize / KIT.md / ending-screens test; only index.html / sw.js conflicted, rebuilt with dev/site/build_site.sh). Head **45b4057b25a7dca52405623703b79db457aaea11**, origin/main 178cac37 is its ancestor (FF).
- `node dev/test/law1-audit.test.js` → `law1-audit: 13/13 PASS` · `… index.html` → `law1-audit: 13/13 PASS`
- `node dev/test/role-parity.test.js index.html` → `ok open baseline only shrinks (≤ 7 rows, each with its side) 7` … `ALL PASS`
- `node dev/test/one-core-guard.js` → `PASS: one core …` · `node dev/test/undef-scan.js` → `PASS: no unguarded undefined identifier (301 names checked)`
- `bash dev/tools/quickcheck.sh` (alone) → `QUICKCHECK PASS · 269 s · open 2124 ms · old save ok · perf (median of 3, new/live): render 291/309 ms, tab 566/625 ms, buổi 1867/2020 ms · core gates PASS`
- coop-e2e RED on LIVE itself (e2e now 162 checks; LIVE red around the new «Tiền truyện» prequel cards at buổi 0:0 — Q 8 modals, #next disabled). LOAD-COMPARE, same machine, same command:

| run | Fold hosts (`node dev/test/coop-e2e.js`) | iPad hosts (`COOP_SWAP=1 …`) |
|---|---|---|
| bare LIVE 178cac37 | 138/162 · FAIL rows: fold #next ×4, ipad #next ×8, buổi 0:0 ×4, buổi 2:0 ×4, week 1 fold/ipad, canonical W wk1, week after rebirth | 138/162 · same rows (fold #next ×8, ipad #next ×4) |
| branch 45b4057b25a7dca52405623703b79db457aaea11 | 138/162 · **identical rows and counts** | run 1: 137/162 = LIVE rows + «after week 1: same names» with EMPTY lists (onlyA/onlyB/nmA []; weeks 2–3 + rejoin ok) · run 2: 137/162 = LIVE rows + «after week 2: canonical W» (host-lag diffs: S.emp.met, wxDay, staff loyal/suc — no wdPawn / pal / Ban cung field) |
The one extra row differs run to run and belongs to the coop-host-lag family LIVE also shows (LIVE A also lists staff .duc drift) → LIVE-identical red, not this branch. Owner of the LIVE red: co-op fixer #4 (session_01N1tNP2dfra9gDdChCWdbcB, same rows on 178cac37).

**LAND READY law1-audit-r1 45b4057b25a7dca52405623703b79db457aaea11 FOR MAIN 121 (re-merge on 178cac37)**
=======
>>>>>>> 01958043 (MAIN 122: test-mrfoot ruling + B order)

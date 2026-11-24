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

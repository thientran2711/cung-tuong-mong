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

## Act table (buttons, role × act) — re-run on LIVE
(running; appended when done)

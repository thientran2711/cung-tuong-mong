# d19-gift-work — report (worker session_01N1tNP3DzrQ7aYVjZPFWzCr, depth 1, START_CTX ~3 %)

PRIORITY #1 CHECK: OD 1 (OD:L752 + OD:L582 equivalent value) | main dev/build/jts.js tsOptGifts + a SECOND act tsOptGiftsItem "Biếu quà làm lành bằng đồ" + PEND.tsgiftpick (already on main, top person only, gate BAL.tsGift.eq on the gift scale, `mọn` blocked) — REUSED and reshaped, not rebuilt | review/* 0 | claims 0.

Branch `review/d19-gift-work` — READY sha **ddc29092** (merged origin/main 36e574fa; site rebuilt).

## What changed (dev/build/jts.js only; no held file touched)
- ONE act "Biếu quà làm lành" (Nguy hiểm chung panel + the maid's warning card). The second act "… bằng đồ" is gone. The act opens ONE choice (PEND.tsgift) of three kit option cards: **Lễ bạc** (as before: ≤4 people, BAL.tsGift.bac each) / **Tác phẩm tự tay làm** / **Đồ trong rương** (one piece for the person who bears the most ill will, instead of her bạc share). Each piece card opens the kit gift picker (PEND.tsgiftpick, kind wk / it).
- EQUIVALENT VALUE (ONE CORE, no typed number): a piece is enough when its worth TO THE RECEIVER in bạc ≥ BAL.tsGift.bac. Worth = econPrice (the ONE sale API) × her taste on the ONE gift scale: work = wkEval v / WVAL[grade] (chân tình, her art, Tham vọng halves, Kiêu ngạo refuses, fatigue); item = giftVal / giftVal-if-liked (1 or 1/3). So a liked piece costs the giver exactly what the bạc does; a piece she doesn't care for costs ~3×. jlux.luxGift's word (mọn / vừa / hợp / quá hậu) is shown as a Kèm note, no longer a gate (it judged a piece against her rank allowance while the bạc road is a flat 12 — two yardsticks for one act).
- Gain AND loss told: cards show Cần / Tốn (`<món> −1 (bán được N bạc; nàng coi như M bạc)`, 2 khắc) / Được (bớt ghen, bớt oán, thiện cảm from giftEval = the gift dialog's own preview) / Kèm; not-enough pieces are greyed with "… (nàng coi như M bạc, cần 12)". Log/result lines carry "Được: … Mất: …". tsgift + tsgiftpick added to KIT_ACT_PIDS (act pickers → full rows, not hidden event hints). tsOpt gained an optional `ton` list (cost that is not a BAL number).
- NPCs, same rule: tsNpcGift(a,D) — called from tsNpcDanger when a threatened consort acts (it already closed her doors; the comment said "sends gifts" but no code did): cheapest road that is enough (a piece whose sale price ≤ the bạc share, else bạc). Ghen exists only toward the player (j28 danger), so an NPC's gift eases oán + thiện cảm.
- Old saves: a pending PEND.tsgiftpick without a kind lists both kinds. quickcheck old save OK.

## Value parity (dev/test/d19-gift.js → parity.md; Fold run; bạc share 12)
| Receiver traits | Road | Piece | Worth to her (bạc, need ≥12) | Enough | Cost to giver (sale bạc) | Thiện cảm |
|---|---|---|---|---|---|---|
| Lạnh lùng, Thanh liêm | Lễ bạc | 12 bạc | 12 | yes | 12 | 3 |
| same | Tác phẩm | Khăn thêu Thường / Khá / Tinh xảo / Tuyệt phẩm | 10 / 14 / 21 / 32 | no / yes / yes / yes | 10 / 14 / 21 / 32 | 4 / 5 / 7 / 9 |
| same | Đồ | Trâm hoa lụa (20, liked) / Hoa điền phỉ thúy (100, liked) | 8 / 40 | no / yes | 8 / 40 | — / 7 |
| same | Đồ | Xạ hương (50, not liked) / Áo lông chồn (120, not liked) | 8 / 24 | no / yes | 25 / 60 | — / 5 |
| Ham lợi, Vì gia tộc (no chân tình) | Tác phẩm | Thường / Khá / Tinh xảo / Tuyệt phẩm | 5 / 9 / 13 / 18 | no / no / yes / yes | 10 / 14 / 21 / 32 | 2–5 |
| Tham vọng | Tác phẩm | Tinh xảo / Tuyệt phẩm | 13 / 18 | yes | 21 / 32 | 5 / 6 |
| Kiêu ngạo | Tác phẩm | any | — | no ("chỉ nhận đồ quý mua bằng bạc") | — | — |
Reading: liked piece = same cost as bạc and more thiện cảm (taste rewarded); unliked = 2–3× cost; the bạc road stays the cheap road for many people at once (it covers ≤4, a piece covers one). Neither road dominates.

## BAL — PENDING (jbal* held by C-AG until ~10:00Z; nothing written)
- `BAL.tsGift.eq` (jbal.js:9) is no longer read (threshold is now BAL.tsGift.bac). After the hold: delete `eq:4` and change the comment to "Biếu quà làm lành (jts): bạc per person, effect; a work/item is enough when worth ≥ bac to the receiver (D19)". No new key needed. (one-core-guard passes today with the dead key.)

## WHOLE GROUP — other "give bạc to make peace / to please" acts (report; not built)
| Act | Where | Take a work/item too? |
|---|---|---|
| Biếu quà (a cung nữ colleague, BAL.bacFee.cnvGift) | j42.js:358/363 | YES — same function would serve once giftVal/wkEval accept a servant receiver (today r = emp/th/maid/consort only) |
| Biếu quà người trong cung (court staff "thuong") | j10.js:87 | YES (same gap: non-consort receiver) |
| Biếu quà, gửi thư cho nhà chồng/ông (tdGift) | j55.js:182/201 | YES — handmade letter/work fits; receiver is a man (giftO) |
| Biếu ma ma chút quà / Biếu thầy | j68e.js:99 / j68g.js:55 | maybe (event options; jbac already prices the bạc vs free road) |
| Biếu quà lý trưởng | jkc2.js:180 | already has the handmade road "Thêu khăn biếu bà lý trưởng" |
| Biếu quà Tổng quản / Thị lang (case roads) | j70.js:85 / jrd_dtq.js:28 | NO — bribes, bạc by nature |
| Đút bạc bịt miệng / đút lót KSP / hối lộ | j4, j7, j8, j14, j22, j28, j42:285/444, jcycle | NO — bribes |
Recommendation: one follow-up job "gift-receiver-wide" = extend giftVal/wkEval to servants, court staff and men, then let j42/j10/j55 offer the same three roads via tsGiftWorth.

## Tests (all on ddc29092 or its parent 79a85dc1)
- dev/test/d19-gift.js (new): PASS Fold + iPad (three roads + ✕, bạc spends 36 for 3, ghen −8 / oán eased each; work + item given, inventory −1, thiện cảm up, log has Được + Mất; not-enough greyed with reason; old-save picker; act greyed when no road; NPC piece + NPC bạc roads; no page errors, no overflow).
- coop-e2e 63/63 · one-core-guard / one-core-text / one-core-text-rule / one-core-bind PASS · quickcheck PASS (old save ok, core gates PASS, perf new/live render 192/159 tab 445/388 buổi 1267/983 ms) · gift-pick PASS · scenes3 updated (uses the one act) runs clean.
- poison-gift.js FAILS identically on main a2ad2401 (`reading 'click'`, pre-existing, not this branch).
- Shots looked at (scratch /home/user/wt/d19-shots, not uploaded): Fold + iPad option cards = kit option cards (picture left, Cần/Tốn/Được/Kèm), gift picker = kit item grid. Note: the first test shots caught a promotion edict overlay from forcing rank — test no longer forces rank.

## Handover
Not needed (done). Worktrees /home/user/wt/d19 + d19h can be deleted after review.

## REVIEW r1 (opus BIG reviewer session_01N1tNP33iyLFhRjyAqZVTqZ, depth 1, START_CTX ~3 %) — PASS
PRIORITY #1 CHECK: OD:L752 + OD:L582 (equivalent value) | main dev/build/jts.js (old bạc act + second act tsOptGiftsItem, reused/reshaped by the worker) | review/* only review/d19-gift-work | claims: this row.
Branch `review/d19-gift-work-r1` = worker ddc29092 + reviewer fixes + merged origin/main up to 711d7bad (generated files rebuilt). PASS sha **5103d561** (descends from origin/main 13e2b834).

### Checks
1. OD:L752 / OD:L582 — PASS after fix. ONE act, three roads; worth = econPrice × the receiver's taste on the ONE gift scale (wkEval / giftVal, the rules the gift dialog uses). Probe over every rival × art × grade × material: an item is never worth more than its sale price (max ratio 1.0); a work can be worth up to 4× its sale (her art + material + chân tình), but the cheapest enough work still sells for 10 vs the 12 bạc share (giver pays ≈ the same; the work itself took time/materials). No piece under 10 bạc of sale value is ever enough. Kiêu ngạo refuses works; tainted items refused; unsellable/no-price items (27) never enough. Pieces leave the bag (inv −1, giveTo/wkGive, one gift rule).
   **FOUND + FIXED (blocking, free peace):** jdis may REFUSE a piece she dislikes (random BAL.dis.refuse; the piece stays in the chest), but giveTo still returns text, so tsGiftPiece eased ghen −8 / oán −5 and logged "Mất: <món>" while she kept nothing and the player kept the piece → repeatable free peace. Seen live in the iPad run of d19-gift after the main merge. Fix: tsGiftPiece checks the piece really left the bag; if not, nothing is eased, the log says "Lễ làm lành không thành, lòng nàng chưa dịu." (khắc still spent: she tried); NPC road falls back to bạc. Also: the 2 khắc are now spent only after the piece really went (before, a giveTo refusal by a wrapper took khắc with no log). d19-gift.js: new check "refused piece eases nothing"; the jdis random refusal is pinned off for the main road checks (they flaked on it).
   "Fatigue": the only gift fatigue in the game is the Emperor's (WFAT); consort gifts have none (wkEval0 / giftVal), so none applies here — consistent with the ONE gift rule.
2. ONE CORE — PASS: every number BAL.tsGift.* / econPrice / WVAL(=BAL.craftGift); one-core-guard / text / text-rule / bind PASS. BAL.tsGift.eq is dead (pending removal after the jbal hold, as the worker wrote — do it in the next jbal touch).
3. KIT FIRST / VANPHONG — PASS: the three roads are kit option cards (same as every tsOpt card: picture left, Cần/Tốn/Được/Kèm), piece picker = kit item grid (gift-pick PASS Fold + iPad); no private CSS. Main's odds-cap (merged 5cbfd620) removed "Chắc chắn"; the picker now uses capW() + cap:0 like main's old picker. Shots looked at Fold 755x1000@2 + iPad 1180x820@2 (scratch, not uploaded, deleted).
4. NPC + co-op + old saves — PASS: tsNpcGift uses the same worth/giveTo functions (NPC piece + bạc roads tested); the new dialogs are id-based PEND (serialisable, thin-guest friendly). coop-e2e 63/63 and COOP_SWAP 63/63 (one earlier run had 63/64 on "fold #next enabled" timing, rerun clean — unrelated to jts). quickcheck PASS (old save ok, core gates PASS, perf ≈ live).
5. WHOLE GROUP — agree with the worker's table; FOR MAIN (do not build here): one job "gift-receiver-wide" (giftVal/wkEval for servants, court staff, men) so j42 cnvGift / j10 thuong / j55 tdGift offer the same three roads via tsGiftWorth.
6. poison-gift.js — red IDENTICAL on main 36e574fa and on the branch (`reading 'click'` at line 38) → pre-existing, not this branch.

### FOR MAIN (non-blocking notes)
- KIT rows de-duplicate repeated chunks: the Lễ bạc card's Được shows "X bớt ghen 8, bớt oán 5 · Tần ??? bớt ghen 8 · Tần ??? bớt ghen 8" — "bớt oán 5" is dropped for the 2nd+ person (same on main's old act). Kit keeper: the row splitter should not drop repeats across different people.
- Personal dislikes (jmind/jdis) are not part of "enough" (hidden until learned; greying would leak them); the refusal/penalty now applies honestly via the fix above.
- OD:L582 "value bạc by how hard it is to earn at her rank": BAL.tsGift.bac is a flat 12 at every rank (pre-existing); a rank-scaled share would be a balance job.
- NPC road picks a piece (eases one person) when its sale ≤ the whole bạc bill (eases up to 4) — acceptable, but the bạc road would often be the better NPC choice.

Tests on the final sha: d19-gift PASS ×2 (Fold + iPad), one-core x4 PASS, coop-e2e 63/63 + swap 63/63, gift-pick PASS, quickcheck PASS. Worktrees /home/user/wt/rv-d19c, rv-d19-gift, rv-d19-main + scratch to be deleted after the verdict.

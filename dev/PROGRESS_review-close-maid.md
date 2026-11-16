# PROGRESS review/close-maid (D58, worker for Foreman D) — the close maid by origin (owner APPROVED table v2, OD "close-maid" 16/11 s9)
Base: review/servant-mline-r2 (c3e1cacd). Code: dev/build/jcmaid.js (after jmline.js in assemble.py), numbers BAL.cmaid (jbal2.js).
PRIORITY RULE #1: git grep of origin/main + all origin/review/* for close-maid / maid-by-origin: nothing existed (review/origins has only the
ORIGIN_LORE text "Cung nữ quý chữ nghĩa của ngươi" for thd); S.maid (j2 newMaid) was the same random maid for every origin.

## What S.maid has now
src (by origin), loyalty random per game in the src range (BAL.cmaid.loy), ONE talent (known), ONE secret (hidden until she confides).
| origin | source | gain | loss |
|---|---|---|---|
| tt | home | loyalty 65–85 from day one | "Thư nhà" dilemma: obey the father (Danh +3, Sủng −3) or refuse (lòng −10, bạc −30) |
| dtq | home, martial | 50 % of NPC harms aimed at her household fail (jmline cmGuard) | brawls: punish her (lòng −8, Danh +1, foe oán −8) or defend her (lòng +8, Danh −1, oán +8) |
| ch | Thái hậu's plant | 15 %/month Thái hậu thiện cảm +2 | every wrong she does (deedAdd): 50 % Thái hậu −4 |
| muoi | home | 40 % of her bribe money comes back (logged) | scorned: endure (lòng −6, Danh −1) or demand (Danh +1, Đức −1, oán +8) |
| nc (+ bd when review/origins lands: CM_SRC.bd) | home country | cannot be bought; 4 %/month gift bạc +25 | questioned (8 %): let them (lòng −12, Thái hậu +2) or vouch (Danh −2, Thái hậu −4, lòng +6) |
| thd | she PICKS 1 of 3 (talent + start loyalty shown, secret hidden) | cannot be bought, decay halved; her maids merit +1/month (letters) | loyalty 35–50; talent only after 3 months |
| td | palace-assigned 40–60 + old family servant (4 %/month dilemma, 30 bạc) | the old servant: loyalty 100, no decay, cannot be bought, chứng cứ vụ án +1 | exposure 3 %/month: Danh −4, Thái hậu −3, both questioned |
| cn | old roommate 60–80 | 10 %/month a true fact (proof, true-capped) | if she is bought: Danh −8 |
| cnv | she picks at her rise (same card) | 8 %/month a true fact | scorned dilemma (as muoi, "không ai chống lưng") |
Talents (every consort's maid too): theu bạc +3/month, thuoc Sức +3, nghe 6 % a true fact, kin refuses a buyer 50 %. Secrets: lover (exposed: Danh −3),
debt (bạc −15 taken), family (lòng −5), spy (proof to the buyer, true-capped); she confides at loyalty ≥ 70 (8 %/month) → a dilemma (help 30 bạc / ignore).
Display: only existing kit parts: the Nhập cung kitRows "Theo hầu" row (cmRow: source; picking origins "Chưa có ai theo từ nhà …"), the stage person
info line (cmInfo: thiện cảm · source · talent · secret once known; "lòng" → "thiện cảm" per VANPHONG row 51), the kit dilemma card (pushDil/PEND).
Old saves: no S.cm → the maid she has stays (loyalty kept), gets a source/talent/secret. Co-op: her maid is personal; NPC maids' month runs on the host only.
## Tests / measures: see dev/handover/reports/close-maid.md

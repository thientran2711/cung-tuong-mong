# punish-reason (worker D1+D4, session_01D3E3NZVRzGzU2XqyYG8zY4, depth 2, START_CTX ~5 %)

PRIORITY #1 CHECK ('giáng|lãnh cung|ân xá|bằng chứng|tố cáo'): OD 32 | ledger 2 | claims 8 | main 15 | review/* 0 | archive 77
Reuse: jtruth.js (true-evidence deed ledger, on main), j14 cold/restore, j30 demote, j8 fall, jseat seatDown. review/evidence-truth-r1 = already in main (jtruth.js).

## D4 — EVIDENCE PER CHARGE (RECOMMENDATION, no build until the pick)

### What the game does today (main f009e1a6)
- Evidence is ONE number per holder→target (`evG(h,t)` = `t.ev` / `h.evm[key]`), capped by the target's real wrongs (`deedCap`, jtruth DEEDW weights 1–2).
- ~20 accusation sites read that one total: j8 accOK (`BAL.accNeedEv`), j6/jagacts Xử tội (`BAL.ag.ev.judge`), j30 Tố tội thật (`tocaoEv` 1) / Bóc chuyện tư tình (`exposeEv` 2), j78 Trình Thái hậu / Trình Hoàng hậu (`evFirm` 2) / Uy hiếp / Bán cho phe khác / Trả chứng cứ, j15 Tịch thu, jkh blood test (`accEv` 3), j95 / jtsb / jagacts3 NPC tells.
- So 2 pieces of ANY wrong open ANY accusation; the charge text is generic. Every search uses the same odds whatever the crime.

### Recommendation: 8 charges, each with its own pieces of its own kind
Pieces are kept per (holder, target, charge). A piece exists only if the target really did a deed of that charge (law 6a, jtruth per charge). Shown as «Chứng cứ Mưu hại: 2/3».

| # | Charge (tội danh, player text) | deeds that feed it (DEEDW keys) | weight | pieces needed | find odds per search (law 7 word, BAL mid-band) | if proven (one rank max per punishment, D1) |
|---|---|---|---|---|---|---|
| A | Vượt phẩm, xa xỉ | vp (đồ vượt phẩm), over-rank dress | nhẹ | 1 | Rất vững (88) | tịch thu món vượt phẩm, phạt bổng 1 tháng, Danh − nhỏ |
| B | Giấu đồ cấm | il, illbuy | nhẹ | 2 | Vững (76) | tịch thu, cấm túc (BAL days), Đức − nhỏ |
| C | Ức hiếp, quấy phá | trip, batnat, uyhiep, steal, petsteal, thaopet, block, blockf, ksab, rumor, lygian | nhẹ | 2 | Vững (76) | bồi bạc cho người bị hại, cấm túc, Danh − |
| D | Mua chuộc, dọa người hầu | bribe, sbribe, sthreat | nhẹ-vừa | 2 | Có cơ (63) | người hầu bị đuổi khỏi cung, phạt bổng, Đức − |
| E | Hại dung nhan, hại thân | huydung, thathu, pushp, phonghoa | vừa | 2 | Tùy duyên (50) | giáng 1 bậc |
| F | Mưu hại tính mạng, long thai | poison, kpoison, slowpoison, pgift, musk, pond, catswap | nặng | 3 | Khó lường (37) | giáng 1 bậc + lãnh cung (≥ BAL days); if a life was lost: ban chết (current rule kept) |
| G | Vu oan, giá họa | frame, kframe, giahoa, plant | nặng | 3 | Khó lường (37) | lãnh cung; the victim is cleared (existing frameExpose) |
| H | Tư thông, thai không khớp sổ | tryst, pm (+ flirt / mangift as weak pieces) | nặng nhất | 3 | Hiểm (24) | lãnh cung or ban chết (current j22/j30 rule); pm → nghiệm thân (existing jkh) |
| – | Bày mưu chưa thành | plot | nhẹ | counts as 1 piece toward the charge of the planned act; alone → «Bày mưu chưa thành» 2 pieces, Có cơ | cấm túc, Đức − |

Rules that go with the table (all numbers in one BAL block, `BAL.charge`):
1. One search (Dò la / Lén xem / Tra hỏi / người hầu đi dò…) rolls for ONE piece of ONE charge the target truly committed (the heaviest unfound first); odds = the charge's band.
2. Harder as she climbs (law 5): −1 step (≈ −6) per 2 ranks of the target above Thường tại; her eyes / maid skill add as today.
3. Every piece is findable (owner): each miss on that charge adds +BAL step (≈ +8) to the next search on it, so a nặng piece is found in about 3–5 tries, a nhẹ one in 1–2.
4. Accusing = pick the charge whose pieces are full; the notice names WHO, the CHARGE and EACH piece (kind + one line, e.g. «gói xạ hương trong túi thơm», «lời khai cung nữ Tiểu Thúy»). No total-count accusation anywhere.
5. Two-way (law 1): NPCs against her and her against NPCs use the same table; her defence roads (frameDef) stay.
6. Equal value (law 2): a nặng charge costs more searching but hits harder; a nhẹ one is quick but mild.

Alternative B (smaller change): keep pieces 2 for every charge, only the find odds differ by weight. Em recommends A (closer to sếp's words: "việc này 3 bằng chứng, việc khác 2").

### Vietnamese summary for sếp
Đề xuất: bằng chứng chia theo TỘI, không tính tổng nữa. 8 tội: Vượt phẩm (1 chứng, dễ tìm) · Giấu đồ cấm, Ức hiếp, Mua chuộc người hầu (2 chứng, dễ) · Hại dung nhan (2 chứng, Tùy duyên, phạt giáng 1 bậc) · Mưu hại tính mạng, Vu oan (3 chứng, Khó lường, lãnh cung) · Tư thông (3 chứng, Hiểm, nặng nhất). Tội càng nặng chứng càng khó, nhưng mỗi lần tìm hụt lần sau dễ hơn nên chứng nào cũng tìm được. Tố ai thì khung hiện rõ: ai tố, tội gì, từng món chứng. Phi tần tố ta cũng y luật đó (hai chiều). Mỗi hình phạt hạ tối đa 1 bậc.

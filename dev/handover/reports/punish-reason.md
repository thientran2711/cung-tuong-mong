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

## D1 — BUILT (review/punish-reason)

### What changed (whole family, `python3 dev/test/punish-scan.py [ref]`)
| family | origin/main f009e1a6 | branch |
|---|---|---|
| two_rank (a 2-rank drop at once: j8 fall her + NPC, j4 father) | 3 | 0 |
| skip_seat (punishment through seatDown(rank-1): full seat pushes further) | 6 | 0 |
| npc_free (NPC leaves lãnh cung with no stay gate) | 8 | 0 |
| npc_floor (NPC released straight to Đáp ứng from any rank) | 7 | 0 |
| me_note (her punishment function with no reason notice: fall/demote/punish/deathSentence/cold) | 5 | 0 |
| gloom (j93 «Bị giáng xuống» scene without the reason) | 1 | 0 |
| me_free (her release calls — all gated inside restore) | 10 | 10 (gated) |

Rules now (jpun.js + BAL.pun in jbal2):
- ONE PUNISHMENT = lãnh cung OR one rank down, never two ranks; never two rank punishments on one person within BAL.pun.gapDays (1) day — a second becomes cấm túc; lãnh cung after a same-day demotion keeps the pre-demotion rank for phục vị (one rank in all).
- Seat cap never pushes the punished one further (jseat settle skips her while she holds that rank; the newest other holder moves with the existing «ghế đã đủ người» line, so the cap still holds).
- LÃNH CUNG STAY BAL.pun.coldMinDays = 3 days (one month) before ANY release (ân xá, đại xá, cầu xin, nhờ người, minh oan, Thái hậu) — hers and every NPC road (law 1). Her early pardon waits («Chờ ngày ra lãnh cung» notice) and comes the first day the stay is served. Phục vị = one rank below the old rank (full when minh oan); NPCs likewise (were always sent back to Đáp ứng).
- REASON FIRST: every punishment of her shows one kit notice (kitPanel kind notice, fact rows): AI TỐ (name + rank; the edict reveals the name) / VÌ SAO / CHỨNG CỨ (n pieces + the real wrongs behind them from jtruth, + things found in her chest) / HÌNH PHẠT (from → to, cấm túc months, lãnh cung + stay). Lãnh cung notice = same rows + the narrative. Rời lãnh cung: VÌ SAO ĐƯỢC RA (e.g. «Hoàng hậu X ân xá vì nàng quý ngươi (thiện cảm N)») / PHỤC VỊ / VÌ SAO PHẨM NÀY. j93 gloom line carries «Vì …». Story-road cấm túc (jrd_*) stays on its own option card (cause already visible).
- Law 16 note: NPC release rank (was always Đáp ứng) is now one rank below — follows sếp's «one rank per punishment», two-way.

### Tests
- `node dev/test/punish-reason.js <url> [W H videoDir]` — real page, notices closed by taps: 18/18 PASS at Fold 755x1000 and iPad 1180x820.
- `node dev/test/punish-live-vs.js <url> 40` — same steps LIVE vs branch:
  - LIVE: 40 falls → 22 two-rank drops, 18 lãnh cung, 18/18 early ân xá left AT ONCE, 0 notices with reason rows.
  - branch: 40 falls → 23 one-rank drops, 0 two-rank, 17 lãnh cung, 0/17 left early, 40/40 notices with Ai tố / Vì sao / Chứng cứ.
- `node dev/test/cold-faction.js dev/index.html` 20/20 PASS (row 11 + coop-cold-faction + life-place now serve the stay before restore).
- Videos (CDN): https://ctm-img.victoria-tntt.workers.dev/img/_review/punish-reason/fold-755x1000.webm · https://ctm-img.victoria-tntt.workers.dev/img/_review/punish-reason/ipad-1180x820.webm (+ fold-sheet.png / ipad-sheet.png contact sheets)

## HANDOVER (worker D1+D4 session_01D3E3NZVRzGzU2XqyYG8zY4, depth 2, START_CTX ~5 %, rolled over at ~30 % on 26/11 05:16Z)
State:
- D1 = review/punish-reason c6336349 (FF from LIVE f009e1a6), under BIG review by my child session_01D3E3NYgP2MiapKNFbLV7bG (told to send its verdict to me AND Foreman D). NPC-release rank line is PENDING OWNER (law 16): switch BAL.pun.npcOneBelow; revert ready = review/punish-reason-npcfloor 38467ddf. LAND READY only after reviewer PASS + her answer.
- Seatcap bot (dev/test/seatcap-active.js 4 lives sens) on the branch was still running at handover — successor re-runs it once on the final sha (expect overMonths {} and no page errors).
- D4: sếp PICKED option A (Foreman D 05:15Z). NOT STARTED. Successor builds it on a NEW branch review/charge-evidence from review/punish-reason (D1 shows the evidence kinds).
D4 BUILD — read VERBATIM first: dev/OWNER_DECISIONS.md rows 26/11 ~05:15Z → ~05:35Z and dev/handover/FOREMAN_D_STATUS.md «FROM MAIN 152» 05:15Z + 05:35Z (05:20Z and 05:25Z are REPLACED, ignore). Binding summary from Foreman D (not a substitute for the verbatim rows):
 (1) every search shows in plain words «Tìm chứng: <odds word>» = chance ONE search finds ONE piece, with its reasons, on the search act and on the accusation frame (VANPHONG, law 7 words, BAL.odds.cut);
 (2) FIND-ODDS (all keys BAL.charge): crime base (table A above) · MAIN factor = the MASTER's Tâm cơ (hers or the NPC master's) vs target's Tâm cơ, ±1 step per 20, cap ±2 · sent servant's skill small (±1 only at extremes; caught-risk via existing rules) · TAI MẮT total ≥ matMid +1, ≥ matHigh +2, planted eye in target palace +1, bonus cap +2 (reuse the existing Tai mắt stat; Tai mắt also warns her when someone searches HER) · guard: target Phi+ −1 · each miss +1 step on the next search of that charge;
 (3) sim table both directions (low-rank high-Tâm cơ vs high-rank low-Tâm cơ), LIVE vs branch.
Code map for D4: evidence store today = evG(h,t) (j8:35, t.ev / h.evm[key]) capped by jtruth deedCap; spyFind (jtruth:75) is the search; ~20 accusation sites read the total (j8 accOK/accNeed, j6 + jagacts judge BAL.ag.ev.judge, j30 tocao/expose, j78 trinhth/trinhhh/uyhiep/banphe/tieuhuy, j15 conf, jkh accEv, j95/jtsb/jagacts3 tells) — move each to per-charge pieces (h.evc[key][charge]); DEEDW key → charge map = table A; punEvTxt (jpun) then lists pieces per charge. Keep old saves: total ev → spread onto the target's real deeds by weight at load.
Then: whole-family scan + before/after table, tests, Fold+iPad videos, ONE opus BIG reviewer as child, LAND READY in dev/handover/reports/charge-evidence.md → Foreman D.

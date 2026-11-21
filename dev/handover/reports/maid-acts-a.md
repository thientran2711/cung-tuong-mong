# WORKER maid-acts-a (OPUS) — MAIN CHÍNH 90 · session_01Rc5AsKzCEhNeHRAnkWCAkA · 21/11

PRIORITY #1 CHECK ('maid Chủ tử acts'): OD 21/11 ~03:15Z (8 tabs, "cũng chả cần phải khóa", mapping "tôi sẽ báo bạn sau") | main: no act table for the srv road (git grep ROAD8.srv.acts / road8Acts: none) | review/maid-8tabs 941c1367 (base; untouched) | claims maid-8tabs-2 KY5r handover = this job.
START_CTX ~6 % (1M window).

## SẴN SÀNG KIỂM — review/maid-acts-a @ 90931482 (from review/maid-8tabs 941c1367)
| file | what |
|---|---|
| dev/build/jroad8.js | `ROAD8.srv.acts` = the ONE allowlist (card kind `rival` → act key → kept / kept with her words) + `ROAD8.srv.acts.note`; `road8ActKey(btn)` (data-a / hh:data-k / see / visit / scout / invite / pm:x / k61:x / ?other) and `road8Acts(o)` filter. Unlisted key = absent (no lock, no grey button). |
| dev/build/j15.js | base `pcard` calls `road8Acts(o)` first — innermost, so buttons added by every wrapper (jpma Cùng chơi/Thách đấu, Dùng chứng cứ group, kid acts …) pass the table. Consort road: `road8()===""` → untouched. |
| dev/tools/role-parity-scan.js | maid phase now also reads `rvCard` of every consort on the srv road (src `rv-srv`): a consort act leaking onto her card = maid P-ONLY gap (before: rvCard was read only when `!isSrv()`). |
| dev/tools/role-parity-exempt.json | movement row also covers «Đến cung nàng (ta) thỉnh an» (a walk, like «Đến cung nàng thăm»). |
| dev/test/maid-8tabs.js | +5 lines × 2 devices: her Chủ tử cards hold only table keys, no consort words, no lock; kept act in her words; the table is the switch (off → 55 consort keys back); law 1 (meeting a consort: Hành lễ thỉnh an + Mật báo chuyện của chủ); consort road keeps Kết giao / Tranh sủng / Ly gián / Mời đến cung ta. |

Kept acts and costs: walking acts cost only khắc (same `travel()` on every road, no consort currency); «Hỏi người hầu: đó là ai?» 1 khắc (j61, same function). Her acts on meeting a consort are the existing maid acts with SRVA costs (j42 srvTalk: greet / betray / accuse) — unchanged.

## UPDATE — merged maid-8tabs LAND READY 561e3f47 → review/maid-acts-a @ **90c83c93** (MAIN 91 order)
One merge commit (only index.html / sw.js conflicted = generated, rebuilt). Gates on 90c83c93: maid-8tabs.js 70/70 (old save ok) · quickcheck PASS (render 248/293, buổi 1554/1287, core gates PASS) · role-parity ALONE ALL PASS. coop-e2e not re-run (94/94 on 90931482; the merge brings only maid-8tabs-rv + LIVE main).

## Gates
- maid-8tabs.js 70/70 (Fold 755x1000 + iPad 1180x820; old save from LIVE main build served locally: PASS).
- role-parity ALONE on 2b15ba0d (= code of 90931482): ALL PASS (no new gap, open 13/13, promotion sets equal, no page error).
- role-parity NEGATIVE proof (scan on a scratch copy of this build with the table switched off, `acts`→`acts0`): 37 new maid P-ONLY gaps (cx:ally, cx3:invite2, harm:lygian, harm:block, harm:poison, harm:rumor …) — the extended scan catches the leak; with the table on: 0.
- quickcheck 90931482: PASS (render 245/255 ms, tab 603/583, buổi 1801/1602, tasks>200ms 24/23, core gates PASS, old save ok).
- coop-e2e (tt + nc, live co-op worker): 94/94.
- Shots Fold 755x1000 + iPad 1180x820 of a maid's Chủ tử card (Hoàng hậu card: only «Đến cung nàng ta thỉnh an»; stranger card: «Làm quen» Hỏi người hầu + «Gặp mặt»), looked 3×, scratch only (not in git, deleted).

## Notes for MAIN
- Card side note on her road: «Gặp mặt: hành lễ thỉnh an; biết chuyện của chủ thì có thể mật báo.» replaces the consort's «phải sai người / làm tại chỗ» (not visible on the shots taken; harmless either way).
- Out of scope, flagged for her mapping pass: Hậu cung › Chí tôn on her road still offers «Xin hầu cờ», «Xin đánh đàn hầu ngài», «Dâng quà lên Hoàng thượng / Thái hậu», «Đến … gặp ngài», «Sang Đức Thọ cung thỉnh an» (serve-type, plausible for a maid). Adding `court` (or that card's tabKey) to `ROAD8.srv.acts` closes them the same way if she rules so.
- Option B later (maid-true versions of more consort acts) = add the key to the table + a maid cost; role-parity will then require an NPC-maid twin (law 1).

## KEPT / ABSENT table — Hậu cung › Chủ tử card (every consort) on the cung nữ road (for the owner's later ruling; MAIN shows it to her)
Source of truth = `ROAD8.srv.acts.rival` in dev/build/jroad8.js (one table: add a key there to give it back to her). "Absent" = the button is simply not on her card (no lock, owner «chả cần phải khóa»).
Her own maid-true acts toward a consort stay where they always were: when she meets the consort (walk / Dư đồ), j42 srvTalk offers **Hành lễ thỉnh an** (SRVA.greet), **Mật báo chuyện của chủ** (SRVA.betray), and at the Hoàng hậu **Tố cáo chủ trước Hoàng hậu** (SRVA.accuse) — the same acts an NPC maid does to a consort (jagstaff asOpts greet / betray / accuse), law 1.

| group (consort card) | act (key) | on her road | why / her maid-true road |
|---|---|---|---|
| Gặp mặt | Đến cung nàng thăm (visit) | **KEPT** as «Đến cung nàng thỉnh an» | a walk (khắc only, same cost everywhere); there she meets the consort → Hành lễ thỉnh an / Mật báo |
| Gặp mặt | Đến gặp <tên> (see) | **KEPT** («… hành lễ, hầu chuyện tại chỗ» instead of «dễ hơn sai người») | a walk to where she is seen |
| Gặp mặt / unknown person | Hỏi người hầu: đó là ai? (k61:ask) | **KEPT** | asking a servant who someone is — a maid can |
| Gặp mặt | Sai tai mắt dò nơi ở (scout) | absent | needs her own tai mắt; her road: «Tự đi dò la cho chủ» (Việc chủ sai) |
| Gặp mặt | Mời đến cung ta (invite) | absent | she has no palace |
| Gặp mặt | Cùng chơi / Thách đấu (pm:play / pm:duel) | absent | a consort's pastime with a wager |
| Giao thiệp | Kết giao (ally) | absent | Bạc 30, sends a servant; her road: Hành lễ thỉnh an on meeting |
| Giao thiệp | Tặng quà (gift) | absent | consort-to-consort gift; her gifts: «Biếu quà nhỏ» to Đồng liêu |
| Giao thiệp | Giúp chăm thú nuôi của nàng (petcare) | absent | sends her people |
| Dùng chứng cứ | Tố giác (accuse) · Tố tội thật (tocao) · Bóc chuyện tư tình (expose) · Trình Thái hậu (trinhth) · Trình Hoàng hậu (trinhhh) · Uy hiếp đòi bạc (uyhiep) · Bán cho phe khác (banphe) · Trả chứng cứ lấy lòng (tieuhuy) | absent | consort evidence economy (Đức, Danh, Sủng sides); her road: Mật báo chuyện của chủ, Tố cáo chủ trước Hoàng hậu, Bẩm tin dò được |
| Hại nhỏ | Tung tin đồn (rumor) | absent | consort harm (Danh nàng −8) |
| Hại nhỏ | Dò la (spy) | absent | Bạc 35, sends someone; her road: Nghe ngóng / Tự đi dò la cho chủ |
| Hại nhỏ | Tự đi dò la (spyk) | absent | her own version is the chủ's errand «Tự đi dò la cho chủ» |
| Hại nhỏ | Ngáng chân (trip) · Tát (tat) · Hắt nước (nuoc) · Hắt trà (tea) · Quạt mực (ink) · Bỏ phấn lạ (rash) | absent | a maid laying hands on a consort; consort acts priced in Đức |
| Hại nhỏ | Phạt quỳ (phatquy) · Ép nộp của (batnat) | absent | need Hoàng hậu / higher phẩm |
| Hại nhỏ | Hại thú nuôi của nàng (thaopet) | absent | consort harm |
| Hại nặng | Tranh sủng (steal) · Chặn ngự giá (road) | absent | cost / stake Sủng, she has none |
| Hại nặng | Ly gián (lygian) | absent | «Sủng ngươi −4» on fail |
| Hại nặng | Rút thẻ bài (block) · Nhờ ơn người quen rút thẻ bài (blockf) | absent | Kính sự phòng bribes, consort favour economy |
| Hại nặng | Vu oan (frame) · Cài đồ vào rương (plant) · Giá họa trộm đồ (giahoa) · Sai người lấy trộm đồ (laydo) · Mua chuộc cung nữ (bribe) | absent | send people / Bạc 70–94; her road: «Tố lỗi với chủ» on a Đồng liêu |
| Hại nặng | Sai cung nữ thân tín lấy đồ (laydol) · Sai cung nữ thân tín lấy lòng (bribel) | absent | she has no maid of her own |
| Hại nặng | Hặc ăn mặc sai phẩm (vp) · Tố xa xỉ (xx) · Xin Hoàng hậu giáng (xinhh) | absent | a consort's standing to accuse |
| Hại nặng | Trộm thú nuôi (petsteal) · Thả thú dữ (thathu) · Phóng hỏa kho đồ (phonghoa) · Phá việc học (ksab) | absent | consort harm (send people) |
| Sát hại | Hạ độc (poison) · Hạ độc dần (slowpoison) · Hạ độc con nàng (kpoison) · Tặng quà ăn có độc (pgift) · Bỏ xạ hương (musk) · Mua chuộc bà đỡ (catswap) · Hủy dung (huydung) · Đẩy xuống hồ sen (pushp) · Đẩy con nàng xuống hồ (pond) | absent | consort harm; her poison road stays «Bỏ độc vào bát cơm» (a maid of a hostile palace, jmline) |
| Quyền Hoàng hậu | Xử tội · Tịch thu · Ban thưởng · Ân xá · Khất bổng lộc (hh:*) | absent | Hoàng hậu only (never on her road anyway) |
| (any act added later) | unknown key | absent by default | allowlist: a new consort act never leaks onto her card; role-parity now scans this card in the maid column |

Not changed here (flag for her mapping pass): Hậu cung › Chí tôn on her road still offers «Xin hầu cờ», «Xin đánh đàn hầu ngài», «Dâng quà lên Hoàng thượng / Thái hậu», «Đến … gặp ngài», «Sang Đức Thọ cung thỉnh an» (serve-type acts, plausible for a maid; outside this brief's card).

# SPLIT-MERGE AUDIT (Foreman D worker, READ-ONLY, no code)

Worker: session_01D3E3NbNhyXThyLPBaUqqFN (opus) · depth 1 · START_CTX ~3 % (get_session read 0; own estimate) → roll at 28 %, ceiling 60 %.
Audited sha: origin/main **03a8c17c** (LIVE). Orders: FOREMAN_D_STATUS «ORDER FROM MAIN 163 (~21:12Z 26/11)» + «ORDER FROM MAIN 164 (~21:37Z 26/11) — ADD to your split/merge audit».

PRIORITY #1 CHECK: OD 25 (nhân chứng|over-split|merged; rows 21:00Z, 21:10Z cb46f8d2, 21:17Z/21:40Z witness rule with owner 21:35Z quote, 21:45Z max-7 cards) | ledger 20 | main 15 | review/* 5 (review/punish-tier ab73bc26, charge-evidence, charge-followups, evidence-truth, punish-reason — PUNISH-TIER-2 session_01Rc5AsJPKETRcb56pBRgzJK owns witness/evidence/charge code: NO edits) | claims SPLIT-MERGE AUDIT = this session (CLAIMS 21:58Z).

Owner words this audit serves (verbatim, OD on the handover branch):
- 26/11 ~21:10Z: "Nhân chứng và chứng cú có thẻ giữ, có thể có nhân chứng mà chưa đủ chứng cứ. Cũng là 1 cách hay, nhưng có không phải là cách too much detail của chứng cứ, vì chứng cứ khác nhân chứng mà, bạn hiểu ý mà tôi nói ở đây không. Những cái khác trong game cũng làm tương tự như vụ nhân chứng và chứng cứ"
- 26/11 ~21:35Z: "Nhân chứng có thể bị mua chuộc, rút lời hoặc bị bịt miệng: hai chiều, giá ngang nhau. Gì vậy, đã nói đừng tách nhỏ ra nữa, còn làm thêm vụ này nữa, mệt quá" (→ OD: NO buy-off / recant / silence mechanic for witnesses; witnesses are only a count.)
- 26/11 ~21:00Z (part kept): "... tóm lại hạn chế tách 1 việc ra detail quá mức cần thiết ..."
- 26/11 ~21:45Z: "... mỗi một cái sự kiện mình chỉ cần maximum là 7 lá thôi chứ."

---

## WITNESS/EVIDENCE BUTTONS

Method: `git grep` on origin/main 03a8c17c, dev/build/j*.js, for every button label (`n:"…"`) and every system path with bịt miệng / diệt khẩu / mua chuộc / rút lời / đổi lời / tiêu hủy / xóa dấu / làm chứng / nhân chứng / lời khai / chứng cứ / tang vật (279 labels), then read the code of each one that acts on a witness or on evidence. jgedata_w1/w2/w3/bd hold the same road labels as jrd_* (same roads, data copy) — counted once.

Rules held in every rec: law 1 two-way (whatever is removed is removed for her AND for NPCs: same function serves both where it exists), law 2 equal value (what stays on a card is still a fair choice), law 3 gain-and-loss. Recs only REMOVE detail; none adds a mechanic. Charge/punish code = PUNISH-TIER-2; nothing here is built until MAIN / sếp pick.

### Verdict in one line
The over-detail sits in **system mechanics that keep a witness alive as its own little game** (bought-off witness, blackmailing witness paid monthly, half-silenced secret, recanting accuser) and in **evidence panels that split one act «tố / dùng chứng cứ» into 4–9 buttons by who hears it**. One-off story cards that offer «pay bạc and it goes away» as ONE road among equals are not a witness mechanic (no witness state, no count) → keep.

### A. Witness mechanics (a witness / informer is bought, silenced, killed, or recants) — the owner's 21:35Z target

| # | Button(s) | file:line (03a8c17c) | What it does to witness / evidence | Over-detailed? | Rec + why |
|---|---|---|---|---|---|
| A1 | «Lời nhờ cậy» card: «Nhận lễ, giữ im lặng» / «Trả lại hộp gấm» | j95.js:420–426 (j95bribe, j95bribeTake) | She is the WITNESS (caught a rival's tryst and was seen); the rival sends bạc to buy her silence; taking it = owe +1, promise kept | **yes** — a second card after the catch card, whose only job is buying the witness | **REMOVE** the whole bribe card (v.j95bribe path). The catch card already has «Lặng im, đổi lấy ân tình» (A2) = the same outcome. Two-way kept: NPC witnesses have no buy-off either. |
| A2 | catch card «Lặng im, đổi lấy ân tình» + «Giả như không thấy» | j95.js:439, 440 | two ways to stay silent as witness (one gives aff/owe for a khắc, one gives nothing) | **yes** — 2 silent roads + A1 = 3 ways to keep quiet | **MERGE** into one «Lặng im» (keep the ân-tình version: it has gain + cost, law 3). Also the «diệt khẩu» note at j95.js:421 (rival with malice ≥55 marks her as a witness to silence) → **REMOVE** the witness tag z.wit as a separate state; the rival's oán already carries the threat. |
| A3 | «Bị nắm thóp» monthly: «Nộp n lượng bạc» / «Làm việc cho nàng» / «Ra tay trước: tố nàng» / «Mặc kệ nàng» | jroute.js:120 (T.bm), 227–234, 260 | a witness of her secret blackmails her EVERY MONTH (T.bm.k up to 8 pays, n 30–60) | **yes** — a running witness-blackmail sub-game (counter, monthly re-card, stop rules) | **MERGE to one-shot**: keep the card once (pay once / work / tố / mặc kệ), drop the monthly repeat counter (T.bm.k, paid/since loop at :260). Equal value kept (each road still has its price). Two-way: rtGate("uyhiep") is the same gate NPCs use. |
| A4 | cung nữ «bị nắm thóp»: «Nghe lời, làm tai mắt» / «Đút bạc bịt miệng» / «Mặc kệ» | j42.js:411–416; weights jbal2.js:1707 (BAL.ag.par3.cnv.black) | a witness of the maid's affair (S.srv.leak) blackmails her; «Đút bạc» resets leak + rumor | **yes (one road)** — «Đút bạc bịt miệng» is exactly «witness bought silent» | **REMOVE «Đút bạc bịt miệng»** only; card keeps 2 equal roads (obey = becomes tai mắt, cost lòng; ignore = roll). Same function for NPC maids (a param) → two-way holds. |
| A5 | «Đút bạc cho X rút lời» (framed for theft) | j42.js:391 (cnvFrame); NPC side jagstf2.js:26 | the ACCUSER recants for 10 bạc | borderline — accuser, not a counted witness | **KEEP** (1 of 3 equal roads: thanh minh roll / nhận tội / pay; NPC mirror exists). Flag for sếp only if she counts the accuser as a witness — then REMOVE pay on both sides (j42:391 + jagstf2:26) together. |
| A6 | «Đút bạc bịt miệng» / «Diệt khẩu tên thái giám» / «Xin cho hắn ra biên ải» | j4.js:113–115 (PEND.cn2, st.secret 1/2) | 3 ways to silence ONE eunuch who sniffed out her old love; secret half-kept (1) vs kept (2) | **yes** — 3 silencing roads + a half-state; «Đút bạc» (−50 bạc, half) is strictly worse than «biên ải» (−20 bạc, Đức +4, full) = law 2 break | **REMOVE «Đút bạc bịt miệng»** and the half-state st.secret=1 (one state: kept / not). Keeps 2 unequal-in-kind, equal-in-value roads (diệt khẩu: roll + Đức −; biên ải: bạc + Đức +). |
| A7 | «Đưa bạc cho nàng ta im miệng» / «Giả vờ không hiểu» / «Thu thập chứng cứ nàng ta» | j96.js:140–143 (arc h96 b1l) | story: a blackmailer (witness of her old love) wants bạc | no — one card, 3 different roads, no counter | **KEEP** (story beat; pay road = plain cost). |
| A8 | «Đút bạc bịt miệng» + «Dọa tố hắn» (eunuch sniffs, wants bạc) | j96.js:162–164; j67.js:682–685; j67.js:1520–1522 | same story beat written 3 times in 3 arcs, no witness state | no mechanic; **duplicate text** | **KEEP** as cards (each in its own arc). Note for the (b) scan: 3 copies of one beat — can share one template if the event engine allows; no mechanic change. |
| A9 | «Diệt kẻ tống tiền» / «Trả bạc thay ông» / «Để ông tự lo» | j7.js:98–101 | a blackmailer of her physician | no — 3 distinct roads | **KEEP**. |
| A10 | «Bịt miệng thầy tướng» (phoenix rumor); «Mua chuộc Khâm Thiên giám» (comet) | j7.js:114; j7.js:105 | silence a rumor-maker / buy an omen reader — not a witness | no | **KEEP**. |
| A11 | story roads «Lo bạc bịt miệng» / «Bỏ bạc bịt miệng» / «Bịt miệng người kể» / «Dùng tin này ép {v} im miệng» | jrd_ch.js:131; jrd_cn.js:90; jrd_tt.js:724; jrd_muoi.js:614 (+ jgedata copies) | one road on a story card; no witness store, no counter | no | **KEEP**. |
| A12 | story fail texts «hắn có thể đổi lời», «nhân chứng rút lời giữa chừng», «Phúc An đổi lời» | j67.js:558, 570; jrd_cn.js:129; jrd_cnv.js:459, 830, 842, 1056, 1068; jrd_td.js:225, 229, 855; jrd_nc.js:571 … | the fail branch of a story roll is told as a recant; no recant mechanic behind it | no | **KEEP** (a failed roll needs a reason; nothing to remove). |

### B. Evidence-use panels (one act split by who hears it)

| # | Button(s) | file:line | What it does | Over-detailed? | Rec + why |
|---|---|---|---|---|---|
| B1 | person card evidence panel: «Tố giác» (accuse, j8.js:137) · «Tố tội thật» (tocao, j30.js:24) · «Bóc chuyện tư tình» (expose, j30.js:25) · «Trình Thái hậu» (trinhth, j78.js:141) · «Trình Hoàng hậu» (trinhhh, j78.js:144) · «Xử tội» (judge, HH) | panel j78.js:186–200 (evidenceActs); door jdoor.js:198 P11 «Tố cáo» | 6 buttons that all = spend the pieces of a charge to have the accused punished; differ only by listener (Hoàng thượng / HH / Thái hậu / self as HH) and by charge kind (tư thông = expose; «tội thật» = tocao) | **yes** — the clearest over-split in the family | **MERGE to ONE «Tố tội»**: the charge comes from the pieces held (charge picked from the list she already sees), the listener = the highest one who can judge it (HH if there is one and the accused is below her; Hoàng thượng otherwise; she as HH = Xử tội). Drop trinhth/trinhhh/expose/tocao as separate acts. P11's own help line already says «Chọn tội để tố, và tâu với ai» → keep that ONE door. Two-way: NPCs use the same ACT keys (j78:182) → merge both sides. PUNISH-TIER-2 to build if picked. |
| B2 | «Mặc cả chứng cứ»: «Uy hiếp đòi bạc» (uyhiep, j78.js:146) · «Bán cho phe khác» (banphe, j78.js:149) · «Trả chứng cứ lấy lòng» (tieuhuy, j78.js:154) | panel j78.js:197–199; jdoor.js:199 P12; NPC jagharm.js:103, j78.js:182 | 3 ways to trade held evidence: back to her for bạc, to her enemy for bạc, back to her for goodwill | **yes (one too many)** — uyhiep and tieuhuy both = hand the evidence back to the accused, for bạc vs for thiện cảm | **MERGE uyhiep + tieuhuy → one «Trả chứng cứ»** (she pays what she can, the rest is goodwill — the BAL numbers already exist: j78pay, j78thAff) or, simpler, **REMOVE tieuhuy**; keep banphe. Same change for NPCs (jagharm tieuhuy branch). |
| B3 | catch card «Tố giác lên Hoàng hậu» / «Xử tội theo luật cung» / «Tố giác lên Hoàng thượng» / «Giữ làm con bài khống chế» | j95.js:434–437 | same split as B1 on the «bắt gặp» card | **yes** (3 listener buttons) | **MERGE the 3 into one «Tố giác»** (listener rule as B1); keep «Giữ làm con bài» + the merged «Lặng im» (A2) → 3 roads instead of 6. |
| B4 | «Soát cung trước, tiêu hủy mọi thứ» / «Nhờ {lvn} ra tay xóa dấu» / «Bình thản chờ» | j96.js:165–168 | destroy evidence against her (story arc) | no — 3 roads, one each | **KEEP**. |
| B5 | «Xóa dấu chân mình»; «Dời chứng cứ ra ngoài cung» | jrd_cnv.js:112; jrd_td.js:368 | story roads hiding evidence | no | **KEEP**. |

### C. Not witness/evidence (MAIN 161's other hits) — confirmed, keep

| # | Button | file:line | What it really is | Over-detailed? | Rec |
|---|---|---|---|---|---|
| C1 | «Nhận bạc, làm tai mắt» / «Từ chối, bẩm chủ» / «Từ chối, im lặng» | j42.js:376–378 (cnvBribeOpts) | a servant is offered bạc to become a SPY; «bẩm chủ» gives her master 1 evidence of the briber | no — spy recruitment, 3 equal roads, one text for solo + co-op | **KEEP**. |
| C2 | bribeServ (her «Mua chuộc» on a servant) | j29.js:23–27 | turn a servant into tai mắt; refusal → master gets evidence (BAL.eff.j29.evBribeServ) | no | **KEEP** (= the NPC side of C1; two-way). |
| C3 | «Mua chuộc» / «Dọa tố đối thực» (Mưu kế group) | j15.js:80; wrap j19.js:64 servAct | person-card buttons for C2 and for threatening a servant with a known đối thực | no | **KEEP**. |
| C4 | «Giả mang thai» («Mua chuộc thái y, độn bụng…») | j2.js:58 | «mua chuộc thái y» is only the road's description; no witness/evidence act | no | **KEEP**. |
| C5 | thái y bribed by a rival (treat) | j13.js:39–41 (thyBribedBy) | a rival paid the physician to worsen her illness; no witness | no | **KEEP**. |
| C6 | spyFor (tai mắt state) | j29.js:27, j42.js:377, 412 | the spy link itself | no | **KEEP**. |
| C7 | tài-lộ / scheme routes «Mua chuộc người ở Ngự thiện phòng / cung nữ dâng trà / thái y / bà đỡ / vú nuôi / thầy dạy», «Mua lời khai» | j70.js:41–96 (M70 routes) | accomplice routes of a harm scheme; «Mua lời khai» (accuse route) = a way to GET a witness piece | no — each route is one road of a scheme | **KEEP** (route list per scheme ≤ 4). |
| C8 | «Gọi {maid} làm chứng» (defence) | jtruth.js:124 | a defence road when she is framed: a loyal maid testifies | no | **KEEP** — this is the witness COUNT working as the owner ruled. |
| C9 | story «Giữ … làm chứng» / «Cho bạc, giữ hắn làm chứng» / «Ép hắn viết lời khai» (f:"wit") | j67.js:296–297, 428, 558–559, 892–893, 1106, 1291, 1428 and jrd_* | how a story gets its witness (the count) | no — two roads to one result (bạc vs risk) = law 2 | **KEEP**. Note for PUNISH-TIER-2: these story flags are not BAL.charge.wit; no change asked. |

### Totals
- Over-detailed (rec REMOVE / MERGE): **A1, A2, A3, A4, A6, B1, B2, B3** = 8 rows → removes ≈ 13 buttons and 4 small states (j95bribe/z.wit, T.bm monthly counter, S.srv.leak pay-reset path, st.secret half-state).
- Borderline, sếp's call: **A5** (accuser recants for bạc).
- Keep: A7–A12, B4–B5, C1–C9.
- MAIN 161 hits: j4.js:113–114 → A6 (113 remove, 114 keep) · j42.js:376–377 → C1 keep · j42.js:414 → A4 remove · j29.js:23 → C2 keep · j15.js:80 → C3 keep · j19.js:64 → C3 keep · j2.js:58 → C4 keep · j13.js:41 → C5 keep · spyFor → C6 keep · tài-lộ paths → C7 keep.

Nothing built. Owners if picked: A1–A3, B1–B3 = PUNISH-TIER-2 (charge/evidence code) or whoever MAIN names; A4–A6 = the maid-life / story owner MAIN names.

---

## PART 2 — WHOLE-GAME SPLIT / MERGE FAMILY SCAN (BAL keys, stats, item kinds, NPC roles, choice kinds, result lines)

Same sha (origin/main 03a8c17c), same rules (law 1, 2, 3, 4 ONE CORE, 14 canon overwrite; recs only remove detail or point to the ONE store that already exists; nothing built).
Kinds: **(a)** really-different things merged into one · **(b)** one thing split finer than needed (or kept in two stores).

| # | Kind | Before (file:line) | After (rec) | Why (law) |
|---|---|---|---|---|
| P1 | (b) | «Hoàng hậu → ta: thiện cảm» lives in TWO stores: her stat S.hh (j1.js:57 NAMES, j85.js:158, jselxday.js:288; NPCs p.hh) AND, when the Hoàng hậu is an NPC, the relation model aff(queen, x) (j9.js:33). jtrong.js:83 reads S.hh for her but aff(host, who) for others; nothing syncs them → two numbers for one feeling | ONE store: when a Hoàng hậu exists, S.hh / p.hh read and write aff(queenP(), x) (affAdd); the separate number only while the seat is empty (or drop it then). Same check for S.th vs the Thái hậu elder card | law 4 (one number per fact); law 1 (her and NPCs read the same relation) |
| P2 | (b) | «nàng nợ ngươi một ân tình» = j95 z.owe (written j95.js:426, 451, 459) — **never read anywhere**; the game's real favour ledger is j72 «nợ ân» (q72Debt / q72DebtAdd, j72.js:67–69, used by jnroadhp) | write those 3 places into the j72 ledger (q72DebtAdd); delete z.owe | law 3 (a promised gain that does nothing); law 4 (one ledger) |
| P3 | (a)+law 4 | crime WEIGHT is typed in two tables that disagree: door tiers jdoor.js:184–201 («nhẹ/vừa/nặng» per act) vs BAL.charge deed → charge (jbal2.js:2274–2286; tiers on review/punish-tier ab73bc26). Mismatches: frame / plant / giahoa door «nặng» vs charge vo «vừa»; musk door «vừa» vs mh «nặng»; phonghoa (arson) door «nặng» vs uh «nhẹ»; block / blockf / lygian / laydo / laydol / petsteal / thaopet door «vừa» vs uh «nhẹ» | doors print the tier read from BAL.charge (deed → C[c].tier); delete jdoor `tiers` maps. And move **phonghoa → mh** (an existing charge): arson is really different from «Ức hiếp quấy phá» | law 4; (a) arson ≠ teasing; no new charge |
| P4 | (b) | evidence kept twice: total t.ev / h.evm AND per-charge h.evc, kept equal by chSync (jcharge.js:1–5) | keep per-charge evc only; the total = sum on read | law 4. Internal; PUNISH-TIER-2 owns it |
| P5 | (a) | on main, witness pieces are counted INSIDE evidence: BAL.charge.C pk «lời khai người bị hại», «người tận mắt chứng kiến», «lời khai người hầu», «lời khai kẻ canh cửa» … (jbal2.js:2275–2282) | already ruled (OD 21:17Z/21:40Z): those pieces move to the witness store BAL.charge.wit; review/punish-tier ab73bc26 does not have BAL.charge.wit yet → **PUNISH-TIER-2's open item, do not double-fix** | owner 21:10Z «chứng cứ khác nhân chứng» |
| P6 | (b) | «tâu với ai» split into separate buttons in 3 places: j78 evidence panel (6), j95 catch card (3), jtsb «Báo lên Hoàng hậu / Thái hậu» (jtsb.js:20–21) | one «Tố / Báo» button per place, listener = the highest one who can judge (see B1/B3) | owner 21:00Z «hạn chế tách 1 việc»; 21:45Z ≤ 7 cards |
| P7 | (a) naming | BAL key «wit» means two different things: BAL.wit = Tâm cơ cleverness marks (jbal.js:360–369, j40/j43/j51/j70) vs BAL.ag.wit / BAL.ag.why.wit = witness hearing / witness rank (jbal2.js:859, 1602) — and BAL.charge.wit is about to be a third | rename the cleverness table (e.g. BAL.tcw) when PUNISH-TIER-2 adds BAL.charge.wit, so a «witness» number is never read from the cleverness table | law 4 (a wrong-table read is a silent bug); no play change |
| P8 | law 14 (docs) | odds words: live code + VANPHONG = Mong manh / Hiểm / Khó lường / Tùy duyên / Có cơ / Vững / Rất vững (j0.js:5 KIT_ODDS, jbal.js:322 BAL.odds.cut). Old ladder (Liều / Khó / Năm ăn năm thua / Khá chắc / Chắc / Rất chắc / Nắm chắc) still in CLAUDE.md «Core laws», WORKER_BRIEF L15 (START_WORKER), j0.js:4 comment | overwrite the old ladder in place in those 3 spots (coordinator owns CLAUDE.md / brief) | law 14 canon overwrite; law 7 |
| P9 | (b) dup text | the beat «thái giám đánh hơi, đòi bạc» written 3× (j67.js:682–685, j67.js:1520–1522, j96.js:162–164) | keep the 3 cards (3 arcs); optional: one shared text | no mechanic; low |
| P10 | (b) checked → keep | item kinds: 27 kd labels on IT (j8.js:192…), many with 1–3 items (Rượu, Nến, Băng, Than sưởi …) | KEEP: the bag already folds them into a few tabs (jinv.js:380 KINV_CATS / kinvCat) | no player-visible over-split |
| P11 | checked → keep | Sủng (S.sung) vs Ân tình (S.an, «tích qua các đêm», fades, j8.js:388) | KEEP: fast favour vs slow bond = really different | — |
| P12 | checked → keep | spy recruitment (tai mắt) across j15 / j19 / j29 / j42 / jcoopworld: one rule (bribeServ ↔ cnvBribeOpts, BAL.coopBribe) | KEEP (already one core, two-way) | — |
| P13 | checked → keep | servant role words (Cung nữ / Thái giám / ma ma / quản sự) | KEEP: each has its own work and places | — |

Not re-scanned here (already ordered to other seats, do not double): every hand > 7 cards (owner 21:45Z → MAIN's whole-game scan), oán / ghét / ghen caps (OD 21:09Z, applied), punish tiers + witness counts (PUNISH-TIER-2).

### Part 2 totals
Recs that change something: **P1, P2, P3, P6** (play / numbers), **P4, P7** (internal, law 4), **P8** (docs). P5 = PUNISH-TIER-2 open item. P9–P13 checked, keep.

---

## HANDOVER (worker)
Both parts done; nothing built. If MAIN / sếp pick rows, owners: A1–A3, B1–B3, P3–P7 → PUNISH-TIER-2 (charge/evidence code) or the seat MAIN names; A4–A6, P1, P2 → seat MAIN names; P8 → coordinator (CLAUDE.md / WORKER_BRIEF). Worker ctx at end ≈ 22 % (START_CTX ~3 %): no successor needed.

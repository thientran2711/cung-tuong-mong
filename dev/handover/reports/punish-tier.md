# punish-tier — worker PUNISH-TIER (MAIN 161 → 162) session_01Rc5AsM52ELWPWfgECaMwsh — depth 1 · START_CTX ~3 %

PRIORITY #1 CHECK ('lãnh cung|giáng cấp|demote'): OD 8 | main 15 (LIVE f573dc94 charge-trinh-punish D1+D4; BAL.coldEvNeed 2 jbal.js:395; BAL.accCdT jbal2.js:55) | review/* 0 | claims 0.
Reused (no second system): jcharge chPunish / chNeed / chRows / chLine / chUseTxt / punEvTxt, jpun punRows / punNote / punDown / punTwice / punFromToday / coldFree / coldStayOk, j8 fall / punish / deathSentence, j14 cold / restore, jseat seatHas / holders, j34 fillSeats → contestOpen (free seat → «Tranh ghế»), BAL.charge (the 8 approved charges kept).
SPEC (final, verified on the handover branch cd5cb2e0): owner 26/11 ~20:35Z (OD:2649) + MAIN recs under it — canon overwrite of 19:05Z / 19:10Z / 19:50Z — ~20:40Z: phản tọa approved; ~21:00Z: evidence = a plain COUNT, 4 tiers × 3 rank groups of the accused (no kinds of proof); general rule «do not split one thing into more detail than needed». Earlier relay: 26/11 ~19:50Z ruling (voids 19:05Z 4 tiers + 19:10Z «cây cao đón gió»): SAME penalty for every rank, THREE tiers — nhẹ (phạt bổng, cấm túc ngắn, no rank change) · vừa = giáng 1 bậc + lãnh cung (seat always frees) · nặng = ban chết; evidence nhẹ 1 · vừa 2 · nặng 3 incl. one strong; each piece shows its tier; PHẢN TỌA; minh oan → old rank if the seat is free else one lower; freed seat → contest; drop rank-scaled evidence.
Builds: 7aa5b292 (19:05Z + 19:10Z) → 3953e8c5 (19:50Z) → 4352eaa6 (20:35Z) → 8907d122 (20:40Z) → a5fa2fa5 (21:00Z count table, THIS ONE). Rows 19:50Z (OD:2641) and 20:35Z (OD:2649) read verbatim on the remote.

## §history (expert note, OD:L1327 — Ming/Qing harem practice)
| penalty | practice | typical crimes (examples) |
|---|---|---|
| 罚俸 phạt bổng | the lightest; stipend cut for months | thất lễ, small breaches of palace rule, over-rank dress (Qing 宫规: fines for consorts' household faults) |
| 禁足 / 禁闭 cấm túc | confinement to her own palace for a term | quarrels, rumours, harassing lower ranks; often paired with a fine |
| 降位 giáng vị | one or more ranks down; the quota seat frees (Qing 皇贵妃1·贵妃2·妃4·嫔6) | meddling, selling favours, harming another without death — e.g. Guangxu 1894: Consorts Zhen and Jin 妃 → 贵人 for 干政/卖官 (Zhen also confined) |
| 打入冷宫, title kept | Qing had no formal 冷宫; a fallen consort was shut in a remote court, often keeping her nominal title | Qianlong's Step-Empress Ula-Nara 1765: seals and attendants taken, confined, never formally deposed — precedent for «lãnh cung giữ phẩm» |
| 降位 + 幽禁 | demotion and confinement together for a grave fault at a high rank | Zhen 1894 (demoted + 禁闭); Shunzhi's Empress Borjigit deposed to 静妃 and moved out |
| 废位 / 废为庶人 + 冷宫 | stripped of rank, sent to a cold court | Han Wudi's Empress Chen 130 BC for 巫蛊 (vu cổ) → Trường Môn cung; Ming Xuande's Empress Hu deposed; Ming Jiajing's Empress Zhang deposed 1534 |
| 赐死 / execution | treason against the throne, khi quân, tư thông proven | Ming 1542 壬寅宫变: Consort Duan and Consort Ning executed (plot on the emperor's life) |
| 诬告反坐 | a false accuser bears the penalty of the crime she alleged (Tang/Ming/Qing codes) | basis for «tố hụt thì chịu phạt», heavier when aimed at a higher person |
Fit with the 20:35Z ladder: 罚俸/禁足/跪/抄经 = nhẹ; 降位 = vừa; 降位 + 幽禁/冷宫 (Zhen 1894, Ula-Nara) = nặng; 赐死 for 谋逆 / 欺君 / killing the heir, often commuted to 废为庶人 + lifelong confinement (Empress Chen, Han; Ming deposed empresses) = tử tội; 诬告反坐 = PHẢN TỌA; 自首减等 (Qing Code: confession before discovery lowers the penalty) = tự thú −1; 待产 (a pregnant woman's punishment waits for the birth — Qing Code art. on pregnant offenders) = deferral. Adjustments: real tư thông stays nặng (the rec lists tử tội ONLY for mưu phản / hại chết hoàng tự / mưu hại Hoàng thượng / khi quân trọng); khi quân deeds (giả thai, tráo hoàng tự) and a mưu hại aimed at Hoàng thượng = tử tội. «Hại chết hoàng tự» needs an outcome flag the deed ledger does not record (musk / kpoison are written whether the child died) → parked; no consort-level mưu phản / vu cổ deed exists in the game (only the father's story arcs, which already use phế vị + chung thân).

## Ladder (BAL.charge.tier / rkPlus / tu / rep / conf, jbal2.js — ONE CORE; penalties the same for every rank, her and every NPC)
Evidence = a plain count = tier need + BAL.charge.rkPlus[the accused's rank group] = [0,0,0,1,1,1,2,2] → nhẹ 1/2/3 · vừa 2/3/4 · nặng 3/4/5 · tử tội 4/5/6 (≤ Quý nhân · Tần/Phi/Quý phi · Hoàng quý phi/Hoàng hậu); queenPlus folded into it; no «chắc / mạnh / nhân chứng» kinds (the piece names on the card are the D4 table-A names, unchanged).
| weight | need | charges (C[c].tier) | penalty |
|---|---|---|---|
| nhẹ | 1 (+ group) | Vượt phẩm xa xỉ, Mua chuộc người hầu (lite bong: phạt bổng, Danh, Đức) · Giấu đồ cấm, Ức hiếp quấy phá (lite cam: cấm túc ngắn) | no rank change; the 3rd nhẹ within a year (rep n 3 / win 36 wk) = vừa |
| vừa | 2 (+ group) | Hại dung nhan, Vu oan giá họa | giáng 1 bậc (seat frees) |
| nặng | 3 (+ group) | Mưu hại tính mạng, Tư thông | giáng 1 bậc + lãnh cung (title one lower; seat frees) |
| tử tội | 4 | a charge with a tuDeed (cyfake giả thai, catswap tráo hoàng tự) or a mưu hại aimed at Hoàng thượng (tuTgt) | ban chết; Emperor may commute (tu.spare: base 10 + Sủng/4 + Thái hậu ≥60 +20 + Hoàng hậu «thân» +15 + family ≥60 +10) to phế vị + lãnh cung CHUNG THÂN (only minh oan opens it) |
Plus: PHẢN TỌA on Tố giác, Tố tội thật, Bóc chuyện tư tình (chBack: the alleged weight on the accuser; card fail row + her notice «lời tố … không đứng vững»). TỰ THÚ one step lighter (chConfess; wired on the existing confess roads j22 «Thú tội tư thông», jroute «Nhận tội tư thông»), proven lie one step heavier (chLie helper; no deny-then-proven road exists yet). PREGNANT: vừa / nặng / tử deferred until after the birth (punDefer → j8 birthP hook; kit notice «Hoãn hình phạt»). Death sentence mercy (early turns, nhân từ) kept; spared = phế vị + chung thân. Non-crime demotions (Sủng low, ill, Hoàng hậu tâu giáng) = single giáng, unchanged.
Release (her + NPC; replaces the PENDING BAL.pun.npcOneBelow): minh oan → rank before the conviction (coldFrom), pardon / đại xá (EVD.xa, exists) / plea → the title kept inside; seat free → that rank, else BAL.pun.oneBelow lower. Freed seat → j34 fillSeats → contestOpen («Tranh ghế», exists). Inside she holds no seat. Face line «Quý nhân · lãnh cung» / «Phế phi · lãnh cung».
Notice rows on every punishment of her (kit fact rows): Mức tội · Hình phạt · Giáng phẩm («không» kept) · Lãnh cung («không» / «có, vẫn mang phẩm …» / «có, chung thân»). Evidence lines: «Mưu hại tính mạng (nặng) 2/4» on a Tần, «… tội nặng (có 1)», each piece «… · tang vật · tội nặng», «Chứng cứ −2 (tội …, nặng)».

## STEP 2 — family scan (LAW 11): dev/test/punish-tier-scan.py
| family | LIVE f573dc94 | branch a5fa2fa5 |
|---|---|---|
| raw_cold (lãnh cung write outside punCold / cold: no title, no seat rule) | 13 (j4:71, j4:108, j67:908, j67:994, j8:104, j8:111, j8:112, jcharge:99, jroute:248/273/368/380 …) | 0 |
| fall() coin toss lãnh cung OR giáng | 14 callers | 0 — each names its weight |
| failed accusation without phản tọa | Tố giác / Tố tội thật / Bóc chuyện tư tình | 0 (Trình Hoàng hậu = the queen's choice, open for MAIN) |
Rank / lãnh cung roads (153 punishing sites; punish 75 = nhẹ cấm túc / khất bổng; deathSentence 25 = tử tội):
| path | crime | penalty LIVE | after |
|---|---|---|---|
| chPunish (Tố giác, Xử tội, Trình Hoàng hậu verdict, j71 tomuu, jtsb, Tố tội thật, Bóc chuyện tư tình, j8 vp) — her / NPC / Hoàng hậu | by charge | C.pun light / cam / giang / cold; Hoàng hậu → rank 6 + cold | by weight (ladder) |
| fall j3:119 thư tư tình · j7:187 xạ hương · jroute:384 gian lận nghiệm thân | nặng | rank ≥5 → lãnh cung, else 50/50 | giáng + lãnh cung |
| fall j10:168 · j14:25 lật tẩy vu oan · j4:25 vu cáo · j42:187 / jagstaff:122 cung nữ tố · j7:177 / j8:315 trộm ngự dụng · j8:139 · j30:14 | vừa | same coin toss | giáng 1 |
| cold (her) j22:22 tư thông lộ · j30 · jcoopworld:836/875 | nặng | lãnh cung, rank 0, pardon = old −1 | giáng + lãnh cung, pardon = title |
| j22:65 / jroute:362 confess | nặng, tự thú | lãnh cung | vừa (giáng) |
| cold j3:162 «Bị bỏ quên» | no crime | lãnh cung | title kept |
| death roll else lãnh cung: jroute:362 / 368 / 380 con không phải cốt nhục · deathSentence mercy | tử tội | lãnh cung | spared = phế vị + chung thân |
| jroute:176 / 248 / 273 trốn khỏi cung | nặng (death roll kept) | lãnh cung | spared = giáng + lãnh cung |
| j4:71 / j67:908 / j67:994 nhà bị xử mưu phản · j4:108 Hoàng hậu bị phế | tử tội (story) | raw out=true | phế vị + chung thân |
| demote j30:16-17 · j30:26 / jaudit:252 / jrcv:225 · e67drop · rgPurge · j4:22 · jrd_cn | not a crime | giáng 1 | unchanged |
| night (jnight) | — | no punishing call (scan 0) | — |

## STEP 3 — robot check
dev/test/punish-tier.js (real page, 32 checks, ALL PASS Fold 755x1000 + iPad 1180x820): count table nhẹ/vừa/nặng 1-2-3 · 2-3-4 · 3-4-5 by group, tử tội 4 · weight on every evidence line · ROBOT: she Quý nhân, Tần 3/3 full → Tố giác vừa → the Tần drops to Quý nhân, seat free; Tố giác nặng → Quý nhân + lãnh cung, seat free · nặng on a Quý nhân → Thường tại + lãnh cung · tử tội no mercy → ban chết; commuted → phế vị + chung thân, pardon / đại xá refused, minh oan opens · NPC + HER minh oan (seat free → old rank, full → one lower), pardon → title · HER notice rows · 3rd nhẹ = vừa · tự thú nặng → vừa · pregnant → deferred, applied after the birth · PHẢN TỌA her (vừa → giáng) and NPC (nhẹ → fined) · Tố tội thật lost → phản tọa · Bóc chuyện tư tình won → nặng / lost → phản tọa nặng.
Answer: YES — vừa (giáng) and nặng (giáng + lãnh cung) both open a Tần seat; a thin case costs the climber the same weight (phản tọa).
BEFORE / AFTER (seeded scripted cases; «win» forces the dice, so a tử tội here is always commuted):
| case (same script on both builds: dev/measure/punish-tier-vs.js) | LIVE f573dc94 | branch |
|---|---|---|
| need: vượt phẩm / hại dung nhan / mưu hại / tư thông (on a Quý nhân) | 1 / 2 / 3 / 3 | 1 / 2 / 3 / 3 |
| need on a Hoàng quý phi: hại dung nhan / mưu hại | 2 / 3 | 4 / 5 |
| need on a Quý phi: hại dung nhan / mưu hại | 2 / 3 | 3 / 4 |
| Tố giác hại dung nhan → a Tần (Tần 3/3 full) | NPC: Quý nhân; Tần seat free | NPC: Quý nhân; Tần seat free |
| Tố giác mưu hại → a Tần (Tần 3/3 full) | NPC: lãnh cung, Tần; Tần seat free | NPC: lãnh cung, Quý nhân; Tần seat free |
| Tố giác mưu hại → a Quý nhân | NPC: lãnh cung, Quý nhân | NPC: lãnh cung, Thường tại |
| Tố giác tư thông (thư từ) → a Tần | NPC: lãnh cung, Tần | NPC: lãnh cung, Quý nhân |
| Tố giác khi quân (giả thai) → a Tần | NPC: lãnh cung, Tần | NPC: lãnh cung, Đáp ứng chung thân |
| NPC Tố giác mưu hại → HER at Tần | her: lãnh cung, Tần | her: lãnh cung, Quý nhân |
| NPC Tố giác hại dung nhan → HER at Tần | her: Quý nhân | her: Quý nhân |
| HER Tố giác hại dung nhan LOST (target Quý nhân, she Tần) | her: Tần | her: Quý nhân |
| HER Tố giác vượt phẩm LOST (target Hoàng quý phi, she Tần) | her: Tần | her: Tần |
| HER minh oan, Tần full (was Tần) | her: Quý nhân | her: Quý nhân |
| HER pardon (was Tần) | her: Quý nhân | her: Quý nhân |
| NPC pardon out of lãnh cung (was Tần) | NPC: Đáp ứng | NPC: Quý nhân |
A full-life bot (inpage4) was tried for a lives table: ~4 min per 2 game months on this box with ~0 convictions — no signal; scripted cases used instead.

## Tests (review/punish-tier a5fa2fa5, FF from LIVE f573dc94)
| test | result |
|---|---|
| punish-tier.js (32 checks) Fold / iPad | ALL PASS / ALL PASS, 0 page errors |
| punish-tier-scan.py | raw_cold 0 · stack 0 |
| charge-trinh-punish · charge-followups · seize-ledger · punish-reason · charge-smoke · cold-faction (20) | ALL PASS (expectations moved to the new rules; repeat-nhẹ off in suites that punish the same people many times — it is tested in punish-tier.js) |
| charge-scan.py | all families 0 |
| quickcheck --runs 3 | see STATUS |
LOOK stills (looked at; kit rows, nothing cut, no overflow): https://ctm-img.victoria-tntt.workers.dev/img/_review/punish-tier/ evidence-755x1000.webp · evidence-1180x820.webp (weight per charge and piece) · cold-*.webp (her nặng verdict: Mức tội nặng / Giáng phẩm từ Tần xuống Quý nhân / Lãnh cung có, vẫn mang phẩm Quý nhân) · giang-*.webp (her vừa: «Lãnh cung: không») · back-*.webp (her phản tọa: «lời tố của ta … không đứng vững; 2 món chứng bị hủy»). Verdict giver wipes: python3 dev/site/cdn_sync.py --wipe-review punish-tier
Notes: the cold still is shot after the test's release → her figure wears court dress (test artifact). Kit: no new part (kit notice fact rows; j19 rkOfFace label text only). G1 one-core-text-rule FAIL jph.js:169 is LIVE's (file untouched here).
Open for MAIN: (1) phản tọa on Trình Hoàng hậu when the queen rejects (rcvJudge choice) — helper chBack ready; (2) «hại chết hoàng tự» outcome flag (parked); (3) a deny-then-proven road for the +1 lie rule (chLie ready, no road calls it).

## STATUS / HANDOVER (26/11 ~21:05Z, worker PUNISH-TIER session_01Rc5AsM52ELWPWfgECaMwsh, depth 1, rolling at MAIN's call ~52 %)
- review/punish-tier a5fa2fa5 pushed (FF from LIVE f573dc94): 20:35Z ladder + recs, 20:40Z phản tọa, 21:00Z count table. All tests above PASS on a5fa2fa5; LOOK stills on CDN _review/punish-tier/ (a5fa2fa5).
- quickcheck --runs 3 on a5fa2fa5: running at handover (log /home/user/wt/punish-shots/qc5.log on this box). Earlier run on 3953e8c5: QUICKCHECK PASS (perf median new/live render 198/225 ms, tab 554/529, buổi 996/1190); core gates FAIL only on LIVE faults (G1 text-rule jph.js:169, untouched here; button-crawl «Ô lưu · Lui»).
- «Drop sub-kinds» (owner 21:00Z general rule): nothing extra kept beyond the ruled items — evidence is a count only (no kinds were ever required); the only internal variants are the lãnh cung titles needed by the rules (nặng = one lower, tử tội commuted = phế vị chung thân, «Bị bỏ quên» = no crime) and the existing D4 nhẹ split phạt bổng / cấm túc.
TODO for the successor: (1) read qc5.log result (or rerun `bash dev/tools/quickcheck.sh --runs 3` in a fresh worktree of review/punish-tier) → LOOK READY / RV READY to MAIN 163 with the stills URL; (2) open items: phản tọa on Trình Hoàng hậu rejection (chBack ready), «hại chết hoàng tự» outcome flag, a deny-then-proven road for chLie; (3) coop-e2e not run on this branch (touches jpun/jcharge/j14/j8; host computes, no co-op write added) — run it before LAND.

## PUNISH-TIER-2 (MAIN 163, session_01Rc5AsJPKETRcb56pBRgzJK) — review/punish-tier ab73bc26
PRIORITY #1 CHECK: OD 26/11 rows 19:50Z→21:10Z (tiers, evidence by rank group, phản tọa, count only, then 21:10Z witnesses ≠ evidence) | main LIVE 03a8c17c | review/punish-tier a5fa2fa5 → ab73bc26 | claims PUNISH-TIER → PUNISH-TIER-2.
Commits: ff36e656 merge LIVE 03a8c17c (only index.html / sw.js conflicted → rebuilt) · 1f89e379 piece weight label dropped + LOOK still uses a met accused · ab73bc26 her punishment notice shows her own figure.
1. GREY FIGURE on the evidence card (MAIN LOOK note): NOT a bug and NOT load timing. The predecessor's test still used an accused she had never MET (k61Know name only, no S.met) → kitKnown false → the unmet-face rule (OD 15/11 L482, 17/11 L1703: unmet = grey silhouette) drew the stranger figure. Probe: same accused unmet → silhouette; met → her kit figure. The test still now uses a met (known) Tần + a check «accused known (kit figure)». Family scan: jcharge / jpun / j14 / j8 / j79 draw no figure of their own (0 <img> / unknown-fig) — all go through the kit known test (j59known / kitKnown).
2. SAME FAMILY, real fault found (LAW 11): punNote (her giáng / cấm túc / phạt bổng / phản tọa notices) put the ACCUSER in the left figure slot while j14 «Lãnh cung» / «Rời lãnh cung» put HER there. Now every punishment notice of hers = her figure (pMe), the accuser in the «Ai tố» row. Before/after: punNote subject accuser → her; j14 cold/restore her → her (unchanged).
3. «Weight per piece / solid / strong / witness» kinds: each evidence piece no longer carries «· tội nặng/vừa/nhẹ» (jcharge piece line); the charge line keeps «Mưu hại tính mạng (nặng) 2/4» = held vs needed. Scan: no «chắc / mạnh / solid / strong» evidence kinds left in jcharge / jpun / j79 / BAL.charge (rkPlus count only).
   ⚠ OWNER 21:10Z (after my brief): NHÂN CHỨNG and CHỨNG CỨ stay TWO separate counts; witnesses may carry a charge while evidence is short; thresholds apply to evidence; witnesses counted separately in BAL; whole-game «really different but merged» scan. NOT BUILT here. Today witnesses exist only as piece NAMES inside the evidence count (BAL.charge C[c].pk: «lời khai người hầu», «người tận mắt chứng kiến», «lời khai người bị hại» …). Needs: a witness store per holder/target/charge, find roads (Nghe lén, loyal maid, servant testimony), MAIN's first BAL values and HOW witnesses stand in (evidence + witnesses ≥ need? witnesses alone = a weaker charge?), a witness line on the evidence card + verdict rows, phản tọa / tự thú interplay, then the whole-game merged-pairs scan with a table.
4. Open items — not small, listed for MAIN: (a) phản tọa when the Hoàng hậu REJECTS a Trình Hoàng hậu case (a rejection is the queen's choice, not proof the accusation was false — 诬告反坐 applies to false accusations; chBack ready if MAIN rules yes); (b) «hại chết hoàng tự» needs a child-died outcome flag in the deed ledger (parked); (c) a deny-then-proven road for the +1 lie rule (chLie ready, no road; new road = feature freeze, law 18).
Tests (ab73bc26 unless noted; served http://127.0.0.1, Fold 755x1000 + iPad 1180x820):
| test | result |
|---|---|
| punish-tier.js (33 checks incl. the new known-figure / no-piece-label check) | ALL PASS / ALL PASS, 0 page errors |
| punish-reason | ALL PASS / ALL PASS |
| charge-trinh-punish · charge-followups · seize-ledger · charge-smoke · charge-taps (1f89e379) | ALL PASS both devices |
| cold-faction | ALL PASS 20 |
| punish-tier-scan · charge-scan · punish-scan · seize-scan · punish-weight-scan | raw_cold 0 · stack 0 · all families 0 · faults [] |
| quickcheck --runs 3 | quickcheck.js PASS (open · old LIVE save loads + plays a buổi · perf tabs 4/4 new vs live); core gates FAIL only G1 one-core-text-rule jph.js:169 = LIVE fault, file untouched (same as predecessor) |
| coop-e2e | not run (live Worker; host computes, no co-op write added) — run before LAND |
LOOK stills (looked at): https://ctm-img.victoria-tntt.workers.dev/img/_review/punish-tier/ evidence-755x1000 / -1180x820 (kit portrait, no piece label) · back-* (her phản tọa notice with HER figure; her plain dress = the test's last case left her in lãnh cung, test artifact) · giang-* · cold-*. Verdict giver wipes: python3 dev/site/cdn_sync.py --wipe-review punish-tier
HANDOVER for PUNISH-TIER-3 (FINAL witness rule = OD rows 26/11 ~21:17Z as overwritten by owner ~21:40Z, read them verbatim on the handover branch; the earlier MAIN 163 «witness-carried lighter verdict» rule and any buy-off / recant / silence mechanic are VOID — owner 21:35Z, angry: "Gì vậy, đã nói đừng tách nhỏ ra nữa ... mệt quá"):
- Owner 21:40Z verbatim: "Không phải tội nào cũng cần nhân chứng, nhẹ vừa không cần, nặng và tử tội thì cần nhân chứng chẳng hạn"
- Build: a separate witness COUNT (BAL.charge.wit) per holder / target / charge. NHẸ and VỪA = evidence only (tier table, unchanged). NẶNG = evidence count + 1 witness; TỬ TỘI = evidence count + 2 witnesses; same for every rank group. Witnesses are only a count — NO buy-off / recant / silence. The piece names «lời khai người hầu», «người tận mắt chứng kiến» (and other testimony names in BAL.charge C[c].pk, e.g. «lời khai người bị hại», «lời khai kẻ mua hộ») move to the witness store. Evidence card: one plain witness line beside the evidence line for nặng / tử tội charges (count held vs needed). Two-way (NPC on her the same).
- Then: whole-game «really different but merged / or over-split» family scan with a table (OD 21:10Z), keep separate only where it changes play.
- Report to MAIN CHÍNH 164 = session_01Rc5AsMRACKNY1roydzvpF7 (163 stood down). Kit keeper = KK46 session_01Rc5AsJWaXnsnQJdFazBWmx.

## PUNISH-TIER-3 (MAIN 164, session_01Rc5AsMnybeP3fAzDgPB67Y) — review/punish-tier-wit (from ab73bc26)
PRIORITY #1 CHECK: OD 26/11 rows 21:00Z, 21:10Z, 21:17Z (overwritten), 21:35Z, 21:40Z | main 03a8c17c (charge code, no witness store) | review/punish-tier ab73bc26 (PUNISH-TIER-2, built on top, untouched) | git grep origin/main + review/*: no «ewc» / «wit.need» / witness store anywhere | claims PUNISH-TIER-2 → PUNISH-TIER-3.
0. coop-e2e on ab73bc26 (MAIN 164 order, for RV-163B's review of PUNISH-TIER-2): 143/143 passed, EXIT 0 (clean worktree, LIVE Worker). Sent to RV-163B.
1. RULE BUILT (owner 21:40Z verbatim: "Không phải tội nào cũng cần nhân chứng, nhẹ vừa không cần, nặng và tử tội thì cần nhân chứng chẳng hạn"):
   - BAL.charge.wit.need = {nhe:0, vua:0, nang:1, tu:2}, same for every rank group. Evidence tier table unchanged (nhẹ 1/2/3 · vừa 2/3/4 · nặng 3/4/5 · tử tội 4/5/6).
   - Own store h.ewc[key(t)][c] beside h.evc (her S.ewc and every NPC's). The evidence total (t.ev / h.evm) stays evidence only.
   - Testimony kinds moved from C[c].pk to C[c].wk for all 8 charges («lời khai người hầu», «người tận mắt chứng kiến», «lời khai kẻ canh cửa», «lời khai người bị hại», «lời khai kẻ mua hộ», «lời khai người hầu bị mua», «lời khai kẻ được sai»). Evidence kinds left: physical only (uh got «dấu vết nơi ra tay»; vp «món vượt phẩm thấy tận nơi»).
   - How a witness is found (no new road, no new mechanic): the existing find/write evA — a found piece of a charge that still lacks witnesses goes to the witness store every other find, and always once its evidence is at the cap. Search odds unchanged (chFind). So «witnesses held, evidence short» is a real middle state.
   - chReady / chOK / accOK need evidence AND witnesses → Tố giác, Xử tội, Trình Hoàng hậu, Bóc chuyện tư tình, j71 mưu hại road, NPC accusers all follow. Presenting a charge spends its witnesses with its pieces; her notice «Chứng cứ» row adds «; N nhân chứng: <kinds>»; phản tọa line counts them.
   - Shown numbers print BAL (law 4): card rows «4/4, nhân chứng 0/1 · Tìm chứng: …», chLine, chNeedTxt «… và 1 nhân chứng (có 0)», Tố giác note «tội nặng cần thêm 1 nhân chứng, tử tội 2», Bóc chuyện tư tình «cần 3 chứng cứ và 1 nhân chứng», jkh nghiệm thân card need row, j71 note. Test changes the constant and the texts follow.
   - Two-way (law 1): one evA / chReady for her and every NPC; tested NPC → her with and without the witness.
   - OLD SAVE: a holder with an evidence store but no witness store: pieces held were named in turn from the old 3-kind list whose 2nd kind was the testimony → witnesses = min(need, floor((pieces+1)/3)), evidence kept (no held proof lost). save → load keeps h.ewc (plain data in ser()).
   - NOT built (owner 21:35Z): no buy-off / recant / silence, no witness-carried lighter verdict. Parked items untouched (phản tọa on HH rejection, «hại chết hoàng tự», deny-then-proven). The whole-game merged-pairs scan from the PUNISH-TIER-2 handover was NOT done: MAIN 164's order said «FINAL rule, nothing more».
   - Co-op: h.ewc travels like h.evc (no co-op write added; host computes).
2. Files: jbal2.js (C[c].pk/wk, BAL.charge.wit) · jcharge.js (chWitNeed / chWitS / chWit / chRoom / chWitGo / chWitTxt, evA write+spend, chFor / chReady / chChase / chLine / chNeedTxt / chRows / accuse note / punEvTxt) · j30.js · j71.js · jkh.js · tests punish-wit.js (new), punish-tier.js, charge-smoke.js, charge-followups.js (feeds now include the witness).
Tests (b5f3d85e, served http://127.0.0.1, Fold 755x1000 + iPad 1180x820):
| test | result |
|---|---|
| punish-wit.js (new, 24 checks + card/notice look) | ALL PASS / ALL PASS, 0 page errors |
| punish-tier.js | ALL PASS / ALL PASS |
| punish-reason · charge-trinh-punish · charge-followups · charge-smoke · charge-taps · seize-ledger · cold-faction | 0 FAIL both devices (charge-smoke / -followups had 2 / 6 FAIL = old «3 pieces = ready» feeds for nặng; fixed to feed the witness; they pass on ab73bc26 as they were) |
| punish-tier-scan · charge-scan · punish-scan · punish-weight-scan · seize-scan | raw_cold 0 · stack 0 · charge families 0 · faults [] · punish-scan me_free 11 = same on ab73bc26 (pre-existing) |
| quickcheck | quickcheck.js PASS (open 1835 ms · old LIVE save loads + plays a buổi · perf median of 3 new/live: render 165/160, tab 492/433, buổi 1034/935 ms, tasks>200ms 18/20). Core gates FAIL = G1 one-core-text-rule jph.js:169 (LIVE, untouched) + npc-purpose j8.js:89 · dialog-fixed «kit-dialog-2 a» 2 FAIL · button-crawl «Ô lưu · Lui» — all three reproduced on ab73bc26 itself (pre-existing, files untouched) |
LOOK stills (looked at, both devices): https://ctm-img.victoria-tntt.workers.dev/img/_review/punish-tier-wit/ wit-evidence-755x1000 / -1180x820 (Tư thông 4/4, nhân chứng 0/1 not ready · Mưu hại 1/4, nhân chứng 1/1 middle state · Hại dung nhan 3/3 đủ để tố, no witness line; kit fact rows, known kit figure) · wit-notice-* (her lãnh cung notice, HER figure, «…; 1 nhân chứng: lời khai người hầu», fits without scroll). Verdict giver wipes: python3 dev/site/cdn_sync.py --wipe-review punish-tier-wit

## PUNISH-TIER-3 → HANDOVER for SPLIT-MERGE-FIX (successor; MAIN 167 order 27/11 ~00:06Z)
State: review/punish-tier-wit b5f3d85e = RV-163C BIG PASS; land sha 85d1c0ec (review/punish-tier-wit-r163c on LIVE 4cfcda61), LC26 landing. PUNISH-TIER-3 rolled (context past START_CTX + 25 %) right after writing the delta.
MAIN 167 order (verbatim): "Do (b)+(a) as ONE job: first a short delta section vs the new witness store; then build on LIVE (after LC26 lands 85d1c0ec) the recs for A1–A6, B1–B3, P1–P7 — ONLY those that merge, fix law 4 (BAL one-source) or fix a real bug. Any rec that ADDS a new split / sub-mechanic → do NOT build, list it for me (owner lesson «đừng tách nhỏ ra nữa»). P8 docs → you write it too. New branch review/split-merge-fix, tests + before/after table → RV READY to me + RV-163C session_01Rc5AsLFUVRepsLs2do3jnh."
(b) DONE: «## DELTA vs the WITNESS STORE» at the end of dev/handover/reports/split-merge-audit.md (handover 74f5960d).
(a) TO DO, from LIVE once 85d1c0ec has landed: read split-merge-audit.md Part 1 (A1–A6, B1–B3) + Part 2 (P1–P8) + the delta. Build A1–A6, B1–B3, P1, P2, P4, P6, P7 (rename BAL.wit → BAL.tcw); P3 only after MAIN confirms the arson remap (nhẹ → nặng + witness); P8 = the odds-ladder overwrite in CLAUDE.md «Core laws», WORKER_BRIEF L15 and the j0.js:4 comment (coordinator files: ask MAIN whether you write them or they do).
Keep: every merged accuse road gates on chReady and prints chNeedTxt (witnesses included); law 1 (one function for her and NPCs), law 2/3 on every card left; ≤ 7 cards. Tests to keep green: punish-wit, punish-tier, punish-reason, charge-trinh-punish / -followups / -smoke / -taps, seize-ledger, cold-faction (Fold 755x1000 + iPad 1180x820) + quickcheck + coop-e2e (j95 / j78 / jtsb touch co-op cards). Known pre-existing gate FAILs on ab73bc26 and on LIVE: G1 jph.js:169, npc-purpose j8.js:89, dialog-fixed «kit-dialog-2 a», button-crawl «Ô lưu · Lui».
Env notes: create /home/user/wt/fetch.lock if it is missing; fetch the handover branch with «+» (shallow refs are forced); the tests need index.html built by dev/site/build_site.sh (dev/index.html alone does not boot); quickcheck rewrites index.html during its run (do not commit until it exits).

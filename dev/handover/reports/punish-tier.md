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

## PUNISH-TIER-4 (MAIN 167, session_01Rc5AsJgemEyzYz28CFtYq4)
PRIORITY #1 CHECK: OD 26/11 ~21:10Z / ~21:35Z + 27/11 ~00:10Z (owner verbatim «Bằng chứng và nhân chứng có thật trong game không vậy, hay chỉ là 1 con số đó ?») / ~00:09Z (P3 arson → mh) | main 4cfcda61 (LC26 not landed yet → base 85d1c0ec = review/punish-tier-wit-r163c) | git grep main + review/*: witness store h.ewc = bare count (jcharge chWitS), agent witness path jagent agWatch / jagday agSeeNpc (place + khắc rows, agRec), j95secApply tryst passers-by, no «wsee» anywhere | claims PUNISH-TIER-3 (rolled) → PUNISH-TIER-4.

### JOB 1 — review/real-proof f95d94fb (base 85d1c0ec) — RV READY
Built (law 6 real evidence / real people; law 1 same function for her and every NPC; owner ~21:35Z kept: witnesses only counted, NO buy-off / recant / silence, no new sub-mechanic):
1. NHÂN CHỨNG = a real living person who was really there. `t.wsee[c]` = ledger ids (j95 ledgerId: consorts v*, servants s*, her «me», emp, th) of the people whose day-record row (agRec, the same place/khắc rows the agent witness path reads) stood at the doer's place in that khắc when the deed was written (jtruth deedAdd hook; an agent deed landing uses its own place + khắc window via an agLand hook), plus everyone at a secret meeting's spot in its khắc (j95secApply hook; the lover / henchman aside). Men and children are never witnesses; cap BAL.charge.wit.keep = 8 per person and charge.
2. The holder's store `h.ewc[key(t)][c]` now holds those ids (never the holder, never the accused); a find goes to the witness store only while a real person is left to find, else to evidence (or a miss); nobody there → no witness ever. A witness who dies stops counting (chWitP alive check on every read). Shown by NAME: card row «nhân chứng 1/1 (Tần Ôn Ngọc Thù)», Sổ ghi line «Tìm được nhân chứng tội …: <tên> (<lời khai …>)», her notice «1 nhân chứng: <tên> (người tận mắt chứng kiến)». Kind per person: the victim «lời khai người bị hại», a servant the charge's «lời khai …», others «người tận mắt chứng kiến» (C[c].wk). Unmet people keep the game's name mask (k61, «Cung nữ ???» / «một vị Thường tại») — same rule as every other name.
3. CHỨNG CỨ: j78proof's invented fallback «lời … nói xấu … sau lưng, lần thứ N có người nghe thấy» is gone; after the real deed / affair / plan / chest / over-rank roads it reads the jtruth ledger deeds (deedsOf, what the evidence cap is made of), then talk ONLY if her Tai mắt truly overheard a «để bụng» fact about her (S.intel), once per person; nothing real → no record (j78mkEvd null, evdSync stops).
4. OLD SAVE: a held count (number) → the real people t.wsee holds, at most that count; none → none. Pre-witness evidence (ewOld) → the same.
5. Co-op: hooks skip guest seats (deedSyncGuest), host computes; t.wsee is plain person data (travels like p.wrongs).
Files: jcharge.js (chWitP / chWitNm / chHere / chSawAdd / chWitAv / chWitL / chWitKind / chWitNames, store + reads + notice), j78.js (j78proof, j78mkEvd, evdSync), jbal2.js (BAL.charge.wit.keep), tests.
FAMILY SCAN (law 11) dev/test/real-proof-scan.py:
| check | 85d1c0ec | f95d94fb |
|---|---|---|
| F1 invented evidence (j78proof «nói xấu … lần thứ N» / talk with no overheard fact) | 2 | 0 |
| F2 witness store written as a bare count | 2 | 0 |
| F3 witness found with no real person behind it (no t.wsee) | 1 | 0 |
| F4 witness shown without a name | 1 | 0 |
| INFO story-arc witness flags (j4 «Lão thái giám họ Vương» S.st.wit 7, jstory f:"wit" 3) | listed | listed — a story's own named person, not the charge store; NOT built (making him a living NPC = a new person mechanic → MAIN's call) |
Tests (f95d94fb build, http://127.0.0.1, Fold 755x1000 + iPad 1180x820):
| test | Fold | iPad |
|---|---|---|
| punish-wit (+8 REAL-PROOF checks: day-record capture, nobody there → none, id + name, dead stops counting, holder/accused never witness, old count → real people, no invented piece, save→load keeps t.wsee) | ALL PASS | ALL PASS |
| punish-tier · punish-reason · charge-followups · seize-ledger | ALL PASS | ALL PASS |
| charge-smoke · charge-trinh-punish · charge-taps | exit 0, 0 FAIL | exit 0, 0 FAIL |
| cold-faction (index.html) | COLD-FACTION ALL PASS 20 | — |
Test change: legacy charge tests fed «need + witness» on deeds written outside the day record (now no witness = not ready, right per law 6) → a fixture adds three real servants as «who stood there» (punish-tier, charge-smoke; charge-followups one line). punish-wit regex now expects a NAME in the notice. One punish-tier Fold FAIL seen once before the fixture (random presence) → gone with it, 3 later runs PASS.
LOOK stills (looked at, both devices): https://ctm-img.victoria-tntt.workers.dev/img/_review/real-proof/ wit-evidence-755x1000 / -1180x820 (Mưu hại 1/4, nhân chứng 1/1 (Cung nữ ???) — a real maid, masked as unmet) · wit-notice-* (her lãnh cung notice «1 nhân chứng: một vị Thường tại (người tận mắt chứng kiến)», kit fact rows, fits without scroll). Verdict giver wipes: python3 dev/site/cdn_sync.py --wipe-review real-proof
quickcheck (f95d94fb): open 2322 ms 0 errors · old LIVE save loads + plays a buổi · TIME-SPILL PASS · core gates FAIL = G1 jph.js:169 + dialog-fixed «kit-dialog-2 a» 2 + button-crawl «Ô lưu · Lui» — the known pre-existing three (files untouched); the perf leg did not print inside my 900 s wrapper (gates took 848 s), not a FAIL. coop-e2e (LIVE Worker): 143/143 passed.
Wiring for the lander: f95d94fb sits on 85d1c0ec; once LC26 lands 85d1c0ec it fast-forwards (touches jcharge / j78 / jbal2 / 4 tests + index.html / sw.js rebuild).

### P8 docs (MAIN: «YOU write the docs lines, handover branch only, never main») — DONE here
Old odds ladder overwritten IN PLACE (law 14) with the live one «Mong manh/Hiểm/Khó lường/Tùy duyên/Có cơ/Vững/Rất vững (7 equal bands, BAL.odds.cut)» in dev/handover/WORKER_BRIEF.md L15 and its verbatim copy dev/rules/START_WORKER.md ([HO/WORKER_BRIEF.md:L15]). CLAUDE.md does not exist on the handover branch (main only) → its «Core laws» odds line is for the coordinator's main sync (I do not touch main). j0.js:4 comment = code → goes in review/split-merge-fix.

### JOB 2 review/split-merge-fix — NOT STARTED → ROLLOVER HANDOVER (PUNISH-TIER-4 rolls: context past START_CTX + 25 %)
MAIN 167 order (verbatim from the wake): "JOB 2 review/split-merge-fix: the build list in the handover. MAIN decisions: P3 = YES, arson (phonghoa) moves to mh (nặng, so it needs 1 witness like other nặng charges) — MAIN rec applied; P8 = YOU write the docs lines (CLAUDE.md / WORKER_BRIEF on the handover branch only, never main). Any rec that would ADD a split → list it, don't build. RV READY → MAIN 167 + RV-163C."
Build list (split-merge-audit.md Part 1 + 2 + «DELTA vs the WITNESS STORE»): A1 remove j95 bribe card (v.j95bribe, j95bribeTake) · A2 merge «Lặng im, đổi lấy ân tình» + «Giả như không thấy» → one «Lặng im» (keep the ân-tình one), drop z.wit · A3 jroute T.bm monthly blackmail → one-shot (drop T.bm.k / paid-since loop jroute.js:260) · A4 j42.js:414 remove «Đút bạc bịt miệng» (cnv black) · A5 KEEP (sếp's call, borderline) · A6 j4.js:113 remove «Đút bạc bịt miệng» + st.secret half-state · B1 j78 evidence panel 6 acts → ONE «Tố tội» (listener = highest who can judge; HH, else Hoàng thượng, she as HH = Xử tội; NPC ACT keys j78:182 too) · B2 merge uyhiep + tieuhuy (or remove tieuhuy; NPC jagharm tieuhuy too; spend the charge's witnesses with its pieces) · B3 j95 catch card 3 listener buttons → one «Tố giác» (gate on chReady!) · P1 S.hh/p.hh ↔ aff(queenP(),x) one store · P2 j95 z.owe → j72 q72DebtAdd, delete z.owe · P3 BAL.charge.deed.phonghoa "uh"→"mh" + jdoor tiers read BAL.charge (deed→C[c].tier), delete jdoor `tiers` maps · P4 evc only, total = sum on read (witnesses NOT in the sum) · P6 jtsb.js:20–21 «Báo lên Hoàng hậu / Thái hậu» → one · P7 rename BAL.wit → BAL.tcw (jbal.js:369; reads j40 ×5, j43 ×2, j51 ×2, j70 ×4) · j0.js:4 comment (P8 code part). P5 DONE.
Rules for the builder: every merged accuse road gates on chReady and prints chNeedTxt (witnesses now = REAL people, see JOB 1 — build JOB 2 ON TOP of review/real-proof f95d94fb or on LIVE after it lands, else jcharge/j78 conflict); law 1 one function her + NPCs; law 2/3 on every card left; ≤ 7 cards; nothing that ADDS a split (none found in the list).
Tests to keep green: punish-wit, punish-tier, punish-reason, charge-trinh-punish / -followups / -smoke / -taps, seize-ledger (url + 755 1000 / 1180 820), cold-faction (arg = index.html, no device args), quickcheck (give it > 15 min), coop-e2e (j95 / j78 / jtsb co-op cards). Build index.html with dev/site/build_site.sh then `git checkout assets.json`; serve with python3 -m http.server.
Env: worktrees /home/user/wt/rp (review/real-proof) · /home/user/wt/ho (handover, local branch pt4-ho → push to claude/cung-tuong-mong-handover-hj0h8w) — delete when done.

### PUNISH-TIER-4 — NEW ORDERS ARRIVED AFTER RV READY (read 27/11 00:47Z; NOT BUILT — I had already rolled) → for PUNISH-TIER-5
Read these OD rows VERBATIM (law 15), dev/OWNER_DECISIONS.md, newest last: 27/11 ~00:13Z/~00:15Z (keep it simple: «Tôi đang sợ nó đang tách nhiều tầng chi tiết quá lại rối»; exposure line), ~00:24Z (Xóa dấu vết, Tâm cơ odds; overwrites ~21:35Z «no silence»), ~00:28Z → overwritten by ~00:36Z → order overwritten by ~00:50Z (witness levels), ~00:38Z (refused bribe = no bạc spent), ~00:57Z (Đức on any wicked deed by tier; Danh only when exposed; whole-game scheme scan), ~00:46Z / ~01:00Z (merged buttons: general button, specific true result).
MAIN relays (data, summarised; the OD rows win):
1. CHARGE CARD = ONE line only «Chứng cứ a/b · Nhân chứng c/d» (+ odds word); witness NAMES + evidence details ONLY in Sổ ghi (one tap «Xem trong Sổ ghi»). ⚠ f95d94fb puts names in the card row (chWitTxt «nhân chứng 1/1 (Tên)», chRows) → FIX FIRST: card row count only; names stay in the Sổ ghi find line + notice. RV-163D should hold the f95d94fb review until this lands on review/real-proof.
2. EXPOSURE LINE after ANY bad deed (her and NPC deeds on her): ONE short line on the result card — «Không ai hay biết.» · «Để lại dấu vết.» · «<Tên> đã trông thấy.» (last two may join); from the real witnesses (t.wsee written at deedAdd — chHere gives them) + whether a real evidence piece exists; kit line component (law 9); Fold+iPad stills.
3. «Xóa dấu vết» (ONE generic act): removes evidence only; bạc + khắc from BAL; odds from TÂM CƠ (BAL, word only).
4. Witness handling on a NAMED real witness, 3 levels picked freely (OD ~00:50Z order): NHẸ «Đe dọa bịt miệng» (Sức only, small −Đức) · VỪA «Mua chuộc» (bạc; refused → she pays NOTHING; spent only on accept) · NẶNG «Thủ tiêu» (heavy −Đức; −Danh only if exposed; success = NPC really dies/vanishes, traceable, world reacts; failure = exposed + new evidence of the attempt). Odds from Tâm cơ + the witness (BAL, words only). FINAL-RESULT LAW: success permanent (never recants / reappears); failure shown at once on the same card. NPCs can do all of it to her (law 1); laws 2/3 equal value. Natural home: remove the witness id from t.wsee (+ from every holder's h.ewc) — no new state.
5. ĐỨC/DANH split (OD ~00:57Z): Đức falls on any wicked deed (known or not) by tier; Danh only when exposed, by tier, at the moment it becomes known. Apply to the witness acts AND scan every scheme in the game (before/after table, law 11, NPCs same, BAL values, robot-checked: a nặng deed is felt, not game-ending).
Reviewer now: RV-163D session_01Rc5AsMQU1ehAQ8bwbw6pWo. MAIN now: MAIN CHÍNH 168 session_01Rc5AsMYn5V43iERgwDRQrj. JOB 2 (split-merge-fix) still open as above; obey ~00:46Z/~01:00Z merge rules there.

## PUNISH-TIER-5 (MAIN CHÍNH 168, session_01Rc5AsKFVDKrXU1parcWZ5Q) — review/real-proof-2 (from review/real-proof f95d94fb)
PRIORITY #1 CHECK: OD 27/11 ~00:13Z / ~00:15Z / ~00:24Z / ~00:28Z→~00:36Z→~00:50Z / ~00:38Z / ~00:46Z / ~00:57Z (+ ~01:00Z–~01:14Z read: door conversion = MAIN 168's door worker, not here) | main LIVE fa722503 (no «wsee» cover / wipe / witness acts; f95d94fb not landed) | review/real-proof f95d94fb (built on top) | git grep main + review/*: no «Xóa dấu vết», «Thủ tiêu nhân chứng», «Ẩn lộ», BAL.charge.cover | claims PUNISH-TIER-4 (rolled) → PUNISH-TIER-5.
Reused (no second system): jcharge t.wsee / chHere / chWitP / chWitNm / h.ewc (witness = real person, REAL-PROOF), jtruth deedAdd / deedCap / evTruthSweep (wiped evidence above the cap → rumour), j63 result-card kit row, jdoor DOOR.add + doorFold + PEND.door (the tier card), jrcv RCVK card (her answer to an NPC's bribe), j85 caught Danh line, jmort death ledger, jagstaff asOut, ducAdd / withDeed.
### What was built (jcover.js + BAL.charge.cover; same road for her and every NPC, law 1; numbers BAL, law 4; odds words only, law 7)
1. CHARGE CARD = ONE line per charge «Chứng cứ a/b · Nhân chứng c/d · Tìm chứng: <word>» (or «· đủ để tố»); the witness part only where the weight needs witnesses (nặng / tử tội); NO names on any card (chRows / chLine / chWitTxt). Names stay in the Sổ ghi find line and her verdict notice (unchanged).
2. «ẨN LỘ» row on HER result card after her bad deed, and after an NPC's deed on her (OD ~00:15Z): «Không ai hay biết.» · «Để lại dấu vết.» · «<Tên> đã trông thấy.» (joined «Để lại dấu vết; <Tên> đã trông thấy.», ≤ 2 names + «và N người khác», k61 masks kept). Kit: the same `.kr` row (j63, last row), KIT.md §7 «ẨN LỘ».
   TRACE: a deed done in an action leaves a trace with odds BAL.charge.cover.trace.band[weight] − the doer's Tâm cơ bands (chFind tcStep / tcCap); no trace → the deed adds no evidence cap (nothing can ever be found of it); witnesses still saw it. Direct writes outside an action (old roads, tests) always leave a trace (cap unchanged).
3. «Xóa dấu vết» (ONE act; on her maid — she does the cleaning; an NPC does it herself): wipes the newest traced deed of the last wipe.win wk (d.w → 0); held pieces above the new cap become rumour at the week end (evTruthSweep, existing). Cost bạc wipe.bac[weight] (10/20/40/60) + the act khắc (BAL.time.cost.talkAct); odds wipe.band + Tâm cơ. Witnesses untouched.
4. WITNESS DOOR «Xử nhân chứng» (one door on the person she meets — Dư đồ / Hành sự / her room; kinds rival, hh, npc servant; never Hoàng thượng / Thái hậu), three tiers at once, tier in the title (KIT §7.1):
   NHẸ «Đe dọa bịt miệng» — Sức −10, odds band 2 (+ timid, − a witness above her rank) · VỪA «Mua chuộc nhân chứng» — bạc by the gravest weight the witness saw (15/30/50/80), paid ONLY on acceptance (refused = no bạc lost, OD ~00:38Z), greed + / loyal − · NẶNG «Thủ tiêu nhân chứng» — odds band 5, success = the person really dies (consort: alive false, npcRetire, death ledger «plot», seat; servant: dead + asOut; her when an NPC does it: Sức −30, death at 0); failure = caught: Danh at once, the witness holds a piece of «mưu hại» and saw the attempt.
   FINAL-RESULT LAW: success removes the id from the doer's t.wsee AND every holder's h.ewc (a.wsil kept) — never comes back, also after save → load. Each act is itself a deed (wthreat → Ức hiếp, wbribe → Mua chuộc, wkill → Mưu hại), so it has its own trace / witnesses / Đức. Option rows carry the true result words (o.hint: «X sợ hãi, câm lặng; nhưng mang tiếng thất đức (chút ít); hỏng thì …»).
5. ĐỨC / DANH (OD ~00:57Z MAIN rec, law 11): Đức cover.duc[weight] (−2/−4/−8/−12) on EVERY deed written outside the lazy state sync, known or not — skipped where the road already takes Đức (ACT c.duc, or cover.ownDuc: caught, story, ls, ml*, giahoa, laydo, laydol, tat). Danh only when exposed: caught red-handed = j85's caught line now reads cover.danh by the act's weight (nhẹ −3 · vừa −6 · nặng −10; canon overwrite of the flat −5, her and NPCs); proven by a verdict = cover.danh[weight] (chPunishX, not phản tọa, not the light «phạt bổng» which keeps BAL.charge.danh).
6. NPCs (law 1): each week an NPC wipes her own traced deed (npc.wipe, pays the bạc) and deals with one of her own witnesses (npc.wit): Đức ≥ 60 → nhẹ, else bạc enough → vừa, Đức < 30 → nặng, else nhẹ. On HER: a threat silences her as a witness of that deed; a bribe = her jrcv card «Lời mua chuộc» (take the bạc and stay silent / refuse); thủ tiêu = an attempt on her life.
FAMILY SCAN (law 11) dev/measure/cover-scan.js — every scheme on the DOER, rolls forced (same script, base f95d94fb → branch):
| scheme | weight | Đức unexposed | Danh caught / proven |
|---|---|---|---|
| Hạ độc · Bỏ xạ hương · Đẩy xuống hồ sen · Đẩy con nàng xuống hồ | nặng | own c.duc kept (−10 / −8 / −12 / −15) | −6 → −11 (nặng −10 + high-rank watch −1) |
| Hạ độc dần · Tặng quà ăn có độc | nặng | 0 → −8 | own road |
| Vu oan · Vu con nàng trù ẻo · Hủy dung | vừa | own kept (−13 / −15 / −8) | −5/−6 → −6/−7 |
| Cài đồ vào rương | vừa | 0 → −4 | own road |
| Giá họa · Sai người lấy trộm đồ · Tát | vừa/nhẹ | own kept (−4 / −4 / −2) — the first run took it twice (−8 / −6 / −4) → fixed with ownDuc | — |
| Tung tin đồn · Rút thẻ bài | nhẹ | 0 → −2 | −5 → −3 |
| Ly gián · Mua chuộc cung nữ · Tranh sủng · Uy hiếp · Ép nộp · thú nuôi | nhẹ | 0 → −2 | own road |
| bày mưu · mua chuộc / dọa người hầu · lén mua đồ cấm · mlbeat · cyforge | nhẹ | 0 → −2 | — |
| liếc mắt đưa tình · nhận quà nam nhân · giả thai · khai man nguyệt sự | nặng | 0 → −8 | — |
| proven Ức hiếp / Hại dung nhan / Mưu hại | nhẹ/vừa/nặng | — | 0 / 0 / 0 → −3 / −6 / −10 |
FAMILY line: «no Đức on an unexposed deed» 26 → 0 · «Danh lost while unexposed» 1 → 1 = Vu oan with the victim's defence roll forced too (she clears herself → framer exposed, jtruth fDanh); with the frame standing (framed()=1) the framer GAINS frameDanh +3, no loss — not a fault. Thả thú dữ / Phóng hỏa: no fitting target in the scan (their own c.duc).
Tests (review/real-proof-2 482e1635, http://127.0.0.1, Fold 755x1000 + iPad 1180x820):
| test | Fold | iPad |
|---|---|---|
| cover.js (NEW, 34 checks: one-line card, Ẩn lộ 3 forms + join + NPC-on-her, clean deed = no cap, Xóa dấu vết success/fail/BAL, door 3 tiers + rising odds, nhẹ silences everywhere + save→load, vừa refused = no bạc / accepted = paid, nặng real death + death ledger / failure = Danh + evidence, servant killed, Đức by tier never twice, Danh proven/caught by weight, NPC threat / bribe card / wipe; + LOOK checks) | ALL PASS | ALL PASS |
| punish-wit (card regex → one line, name only in Sổ ghi/notice) · punish-tier · punish-reason · charge-followups · seize-ledger · charge-smoke (regex → «: chứng cứ a/b, nhân chứng c/d») · charge-trinh-punish · charge-taps | ALL PASS / 0 FAIL | ALL PASS / 0 FAIL |
| cold-faction | ALL PASS 20 | — |
| cover-scan (law 11 family) | no-Đức 26 → 0 | |
Not run here: quickcheck, coop-e2e (jcover writes no co-op state of its own: hooks skip guest seats via deedSyncGuest; NPC turn runs on the host's endTurn) — run before LAND.
LOOK stills (looked at, both devices): https://ctm-img.victoria-tntt.workers.dev/img/_review/real-proof-2/ cover-result-* (THÀNH Ngáng chân · Mất Đức −2 · ẨN LỘ «Để lại dấu vết; <Tên> đã trông thấy.») · cover-door-* («Xử nhân chứng»: Đe dọa bịt miệng · nhẹ / Mua chuộc nhân chứng · vừa / Thủ tiêu nhân chứng · nặng, odds words rising, true Được / Mất) · wit-evidence-* (card rows «Chứng cứ 4/4 · Nhân chứng 0/1 · Tìm chứng: Hiểm», no names) · wit-notice-*. Verdict giver wipes: python3 dev/site/cdn_sync.py --wipe-review real-proof-2
For MAIN / reviewer: (a) the door is already the tier form; the ~01:07Z door-conversion worker may turn it into the one-tap tier picker of that model. (b) her own maid («mm:me») is not a witness today (chWitP does not resolve mm: ids, pre-existing) — left as is to not move other witness counts; MAIN's call. (c) «Lão thái giám họ Vương» S.st.wit stays a story flag (untouched).

### JOB 2 review/split-merge-fix — NOT STARTED → ROLLOVER HANDOVER (PUNISH-TIER-5 rolls: context past START_CTX + 25 %)
Build ON TOP of review/real-proof-2 482e1635 (jcharge / j78 / jbal2 / jcover). Build list and rules: unchanged, see «PUNISH-TIER-4 … JOB 2» above (A1–A6, B1–B3, P1–P4, P6, P7, j0.js:4; P3 = phonghoa "uh" → "mh" in BAL.charge.deed + jdoor tiers read BAL.charge) — PLUS obey OD 27/11 ~00:46Z (3 tiers per matter) / ~01:00Z (general button, specific true result) / ~01:12Z (tier bounds the outcome); merges only. NOTE for P3: BAL.charge.cover reads the weight through chOfDeed, so the arson remap automatically moves its Đức / Danh / trace to nặng. NOTE for A2 «Lặng im» / B2 tiêu hủy: the witness acts in jcover now ARE the silence road (nhẹ/vừa/nặng); merge old silence cards into it, do not keep a second one.
Env: worktrees /home/user/wt/rp2 (review/real-proof-2), /home/user/wt/rpbase (base build f95d94fb, for before/after), /home/user/wt/ho5 (handover, local pt5-ho) — delete when done. Servers 127.0.0.1:8731 (rp2) / 8732 (base).
### PUNISH-TIER-5 — ORDERS THAT ARRIVED AFTER RV READY (read 27/11 01:27Z; NOT BUILT — rolled) → for PUNISH-TIER-6, do FIRST, before JOB 2
1. MAIN 168 (00:54Z): RV-163D PASSed real-proof → land branch review/real-proof-r163d a2902d43 (merged on LIVE). REBASE / merge review/real-proof-2 482e1635 onto a2902d43 (only index.html / sw.js should conflict → rebuild), rerun cover + punish-wit both devices, re-send RV READY to RV-163D.
2. Same message, law 6a/6c (RV-163D §1, dev/handover/reports/rv-163d.md): the pieces of ONE deed print as identical rows («hủy dung Quý nhân ??? · tang vật» ×3 — visible in the wit-evidence stills) → each piece names what it really is, or the pieces of one deed fold into ONE row (e.g. «… · tang vật (3 món)»); no counter-like duplicates. Family: the evidence panel list (j79 kitEvidencePanel «Chứng cứ đang giữ», S.evd j78) AND her notice line (jcharge punEvTxt cycles DL[i%len] · PK[i%len]) — fix both, scan + before/after table.
3. MAIN is now MAIN 169 session_01Rc5AsLs58Sh2uCgF1R9EHu (ROOT MAIN 170 to follow) — report there.

## PUNISH-TIER-6 (MAIN CHÍNH 170, session_01Rc5AsKSV1EG8TGLZ2T7KX9) — DO FIRST on review/real-proof-2
START_CTX ≈ 8 %. PRIORITY #1 CHECK: OD 27/11 ~00:10Z (real proof) + RV-163D §1 OPEN (identical piece rows) + MAIN_STATUS 01:30Z (PT Qs: (a) keep the choice, (b) her own maid CAN be a witness, (c) caught Danh by tier = already built) | main LIVE 17f23656 (no pieceFold / no «mu:» maid witness) | review/real-proof-r163d a2902d43 (base merged), review/real-proof-2 482e1635 | git grep main + review/*: no fold of evidence rows anywhere, no maid witness id | claims PUNISH-TIER-5 (rolled) → PUNISH-TIER-6.
Branch review/real-proof-2: 59cabe39 (merge of a2902d43 into 482e1635; only index.html/sw.js conflicted → rebuilt, assets.json = LIVE) · 020b21b4 (§1 fold) · 10d562ce (maid witness).
### 1. RV-163D §1 — identical piece rows (law 6a/6c), whole family (law 11)
Cause: one deed with more pieces than its charge has kinds (hd pk = [«tang vật»]; mh = 2 kinds) printed «deed · kind» again and again (j78proof fallback D.list[0]; punEvTxt DL[i%len] · PK[i%len]).
Fix: pieceFold / pieceN (j78): identical rows fold into ONE «… (N món)» — evidence panel «Chứng cứ đang giữ» (evidenceOf items), her verdict notice «Chứng cứ» row (jcharge punEvTxt; fold first, then BAL.pun.evShow), the «Ngươi có thêm chứng cứ» find line (j78gainTxt, count before «(nguồn: …)»). Distinct pieces stay one row each.
FAMILY SCAN dev/test/dup-piece-scan.js (duplicate rows; Fold 755x1000 + iPad 1180x820 same):
| place · case | 59cabe39 | 020b21b4 |
|---|---|---|
| P1 panel · hủy dung 1 deed 3 pieces | 3 rows, 1 dup | «… · tang vật (3 món)» |
| P1 panel · bỏ độc 1 deed (2 kinds) | 1 dup | «tang vật (2 món)» + «dấu vết nơi ra tay» |
| P1 panel · 2 deeds 4 pieces | 1 dup | 0 |
| P2 notice · hủy dung | 1 dup | «hủy dung X · tang vật (3 món)» |
| P2 notice · bỏ độc | 2 dup | «tang vật (2 món); dấu vết nơi ra tay (2 món); 1 nhân chứng: …» |
| P3 find line · 3 at once | 1 dup | «… · tang vật (3 món) (nguồn: tai mắt của ngươi)» |
| total | 6 | 0 |
### 2. MAIN 169 answer (b): her own maid (and every consort's maid) CAN be a witness (law 6b/1)
The day record's maid row «mm:<owner>» is a ROLE (the next maid gets the same key), so a maid at the place is stored as HERSELF «mu:<owner>:<uid>» (jcharge chMaidId; uid on the maid object, S.maidSeq; saved with her). A replaced / dead maid never resolves (never her successor). Kind = «lời khai người hầu». Witness door: covWitId turns her maid's «mm:me» into «mu:». Thủ tiêu a maid witness (jcover covKill): she really dies (death ledger g «maid», c «plot»), her mistress gets a new maid from Nội vụ phủ (maidMk). NOTE for RV: a doer's own maid who follows her now sees her deeds (realistic, law 6b) → more nặng deeds have a findable witness.
### Tests (10d562ce, file:// index.html, Fold 755x1000 + iPad 1180x820)
| test | Fold | iPad |
|---|---|---|
| dup-piece-scan (NEW) | ALL PASS 0 dup | ALL PASS 0 dup |
| punish-wit (+3 MAID checks) · cover · punish-tier · punish-reason · charge-followups · seize-ledger · charge-trinh-punish | ALL PASS | ALL PASS |
| charge-smoke · charge-taps | 0 FAIL, 0 page errors | 0 FAIL, 0 page errors |
| cold-faction | ALL PASS 20 | — |
### Gates on the branch (quickcheck 10d562ce → fixes ae2e0a07)
- quickcheck 10d562ce: QUICKCHECK PASS (open 2655 ms · old LIVE save loads + plays a buổi · perf median new/live render 264/247, tab 718/810, buổi 1719/1636 ms, tasks>200ms 41/32). Core gates: G1 one-core-guard FAIL = «jcover.js evA(h,a,1» (PT-5 code) → FIXED ae2e0a07 (BAL.charge.cover.wit.nang.ev), guard PASS. Still failing, the known pre-existing ones (files untouched): npc-purpose-scan 1, button-crawl «Ô lưu · Lui» fold.
- coop-e2e 10d562ce: 142/143, FAIL «same world after week 2: R#3.evR A=undefined B=1». t.evR = rumours HELD BY the viewing player (jtruth rumA; jcover's NPC wipe → evTruthSweep makes them more often) → a viewer row like ev → FIXED ae2e0a07 (jcoophl VIEW + the coop-e2e / coop-host-lag-scan strip lists). coop-e2e ae2e0a07: 143/143.
- cover Fold + iPad ALL PASS on ae2e0a07.
RV READY: review/real-proof-2 ae2e0a07 (base a2902d43 = real-proof on LIVE a22cf45d; the lander restacks onto LIVE 17f23656, only built files should conflict).
### ROLLOVER → PUNISH-TIER-7: JOB 2 review/split-merge-fix NOT STARTED
Build list and rules unchanged: «PUNISH-TIER-4 … JOB 2» + «PUNISH-TIER-5 … JOB 2» above (A1–A6, B1–B3, P1–P4, P6, P7, j0.js:4; merges only; OD 27/11 ~00:46Z / ~01:00Z / ~01:12Z). Build ON TOP of review/real-proof-2 ae2e0a07. Env: worktrees /home/user/wt/rp6 (review/real-proof-2), /home/user/wt/ho6 (handover, local pt6-ho) — delete when done. MAIN now = MAIN 171 session_01Rc5AsLtirkQB1N5Nb16Wct.

## PUNISH-TIER-7 (MAIN CHÍNH 171, session_01Rc5AsHuiZGX8Ag8NH7CPTW) — review/split-merge-fix (from review/real-proof-2 ae2e0a07)
START_CTX ≈ 5 % (get_session reads 0; own estimate). PRIORITY #1 CHECK: OD 27/11 ~00:09Z (arson → mh) / ~00:13Z (merges only, no new layer) / ~00:46Z / ~00:50Z (Nhẹ·Vừa·Nặng) / ~01:00Z / ~01:12Z, law 2 | main 2a80712b (no chTo / one Tố giác / tcw) | review/real-proof-2 ae2e0a07 (built on top, unchanged at RV time) | git grep main + review/*: no «chTo», «BAL.tcw», «j95owe», door chT | claims PUNISH-TIER-6 → PUNISH-TIER-7.
Branch review/split-merge-fix: 2933e560 (A1 A2 B3 P2 A3 A4 A6 P3 P7) · 46a34673 is the death notice; B1 B2 + scan in the 2nd commit · e71a493b (tests). Only merges / removals / one-source reads; no new step, button, state or screen.
### Built (her and NPCs the same, law 1)
- A1 j95 bribe card «Lời nhờ cậy» removed (v.j95bribe, j95bribeTake, BAL.eff.j95.j95bribeTake).
- A2 catch card: ONE «Lặng im, đổi lấy ân tình» («Giả như không thấy» gone); z.wit tag gone (the rival's oán carries the threat).
- B3 catch card: ONE «Tố giác» (was «lên Hoàng hậu» / «Xử tội theo luật cung» / «lên Hoàng thượng»): listener j95to = she as Hoàng hậu → luật cung, a Hoàng hậu above → Hoàng hậu, else Hoàng thượng; NOW gated on chReady and locked with chNeedTxt (pieces AND witnesses) — before it had no gate. Card = 3 roads.
- P2 z.owe (write-only) → j72 nợ ân ledger (j95owe → q72DebtAdd; NPC who kept quiet for her → she owes her −1).
- A3 jroute «Bị nắm thóp»: one card, one payment, no monthly repeat (since / paid / k loop gone; an old save's running one closes at the month tick).
- A4 j42 maid blackmail: «Đút bạc bịt miệng» removed (obey / mặc kệ; BAL…cnv.black.pay gone). A6 j4 cn2: «Đút bạc bịt miệng» half-road removed (secret 2 kept / 1 not).
- B1 ONE «Tố giác» = ACT accuse routed by chTo (jcharge): a Hoàng hậu above the accused → the Trình Hoàng hậu road (her odds, jrcv verdict card), else Hoàng thượng (accuse, phản tọa). Evidence panel: one accusation row (+ «tâu Hoàng hậu / Hoàng thượng» in Tốn), she as Hoàng hậu = Xử tội; «Dùng chứng cứ» group = accuse · uyhiep · banphe; door P11 = accuse · xx · vp; NPC menus (j30 BANDS/push list, j43 PUSHK, j78 mindMenu) no longer offer tocao / expose / trinhth / trinhhh. AOUT.accuse tells the true road. The old ACT defs stay internal (old saves' NPC plans keep running).
- B2 «Trả chứng cứ lấy lòng» (tieuhuy) folded away: panel, door P12, NPC jagharm road. Uy hiếp / Bán kept.
- P3 arson phonghoa → mh (nặng). jdoor P7–P10: the typed `tiers` maps are gone; tiers READ BAL.charge (deed → C[c].tier) via DOOR.chTier (talk members mapped to their deed; xinhh = no crime keeps «nặng», tiers0).
  Tier changes: block · blockf · lygian vừa→nhẹ · frame · plant · giahoa · «Vu oan» nặng→vừa · musk vừa→nặng · laydo · laydol · petsteal · thaopet vừa→nhẹ · phonghoa nặng (now also by charge). Others unchanged.
- P7 BAL.wit → BAL.tcw (13 reads j40/j43/j51/j70 + dev/measure/one-core-dup2-move.py).
### Already done before me (no change): P6 jtsb already ONE «Báo lên <judge>» (judge picked); P8 j0.js:1–4 comment already the live ladder (old words = parse-only).
### NOT built — MAIN's call
- P1 (S.hh / p.hh ↔ aff(queen, x) one store): touches ~every «hh» story fx and co-op (q.rel is world state, S.hh viewer state: a guest's apply would write the world); and the switch overwrites each save's hh with aff (origin hh −15 etc. jump). Needs a ruling on which value wins + a co-op plan; not a split the player sees.
- P4 (evc only, total = sum on read): internal only, touches evG everywhere + co-op viewer rows (t.ev); no player change → left.
### FAMILY SCAN (law 11) dev/test/split-merge-scan.py ae2e0a07 → HEAD
| check | ae2e0a07 | HEAD |
|---|---|---|
| A1 j95 bribe card «Lời nhờ cậy» (buy the witness) | 1 | 0 |
| A2 j95 silent roads on the catch card | 2 | 1 |
| A2 j95 z.wit witness tag writes | 1 | 0 |
| B3 j95 catch card accuse buttons (one per listener) | 3 | 1 |
| B3 j95 accuse button gated on chReady | 0 | 1 |
| j95 catch card options total | 6 | 3 |
| P2 write-only z.owe ledger writes | 5 | 0 |
| A3 jroute monthly blackmail repeat (paid / since / k counter) | 7 | 0 |
| A4 j42 «Đút bạc bịt miệng» on the maid blackmail card | 1 | 0 |
| A6 j4 «Đút bạc bịt miệng» half road | 1 | 0 |
| B1 evidence panel act code paths (evidenceActs; HEAD shows ONE accusation by listener + 2 trades) | 9 | 5 |
| B1 «Dùng chứng cứ» card group keys | 8 | 3 |
| B1 door P11 «Tố cáo» members | 7 | 3 |
| B2 door P12 «Mặc cả chứng cứ» members | 3 | 2 |
| B1 NPC menus offering tocao / expose / trinhth / trinhhh | 11 | 0 |
| B2 NPC «Trả chứng cứ lấy lòng» road (jagharm) | 1 | 0 |
| P6 jtsb «Báo lên …» buttons on one card | 1 | 1 |
| P3 jdoor typed crime tiers (P7–P10 «a:<act>»:tier pairs) | 31 | 1 |
| P3 arson (phonghoa) charge = Mưu hại (mh) | 0 | 1 |
| P7 reads of BAL.wit (Tâm cơ marks under a «witness» name) | 23 | 0 |
### Tests (http 127.0.0.1, Fold 755x1000 + iPad 1180x820)
| test | Fold | iPad |
|---|---|---|
| split-merge (NEW, 21 checks incl. death notice) | ALL PASS | ALL PASS |
| punish-wit · punish-tier (+B1 chTo check; phản tọa checks run with no Hoàng hậu) · punish-reason · charge-followups · charge-trinh-punish (person card = evidence card on the one road) · seize-ledger · dup-piece-scan | ALL PASS | ALL PASS |
| charge-smoke · charge-taps | 0 FAIL, 0 page errors | 0 FAIL, 0 page errors |
| cover | logic ALL PASS; LOOK «witness door card shows the three tiers at once» FAIL — SAME on base ae2e0a07 (pre-existing, stills branch only) | same |
| act-merge-j2 | PASS T1–T6 | — |
| cold-faction | ALL PASS 20 | — |
| one-core-guard | PASS (fails 0) | |
| quickcheck e71a493b | QUICKCHECK PASS part (open 2428 ms · old LIVE save loads + plays a buổi · TIME-SPILL PASS · perf new/live render 239/259, tab 600/500, buổi 1565/1600 ms, tasks>200 25/32); core gates FAIL = the known pre-existing ones only: G1 one-core-text-rule jph.js:169, npc-purpose j8.js:89, button-crawl «Ô lưu · Lui» (files untouched) | |
| coop-e2e 46a34673 (LIVE Worker) | 143/143 passed | |
RV READY: review/split-merge-fix 46a34673 (base review/real-proof-2 ae2e0a07, unchanged; lands after it). Env cleaned: worktrees /home/user/wt/smf, /home/user/wt/ho7 removed after push.
Context at end ≈ 30 % (START ≈ 5 %): no successor needed unless MAIN sends a new job.

### OWNER ITEM (MAIN 171, OD 27/11 ~04:08Z) — death notice, built FIRST-priority in 46a34673
- jcover covWitDo «Thủ tiêu nhân chứng» success on a person tied to someone (maid «mu:», servant, housemate consort): covOwner finds the one she belongs to; the wkill deed is written ON that house (t = mistress), so its real pieces / witnesses are hers to find and the existing «Tố giác» works (law 6a). covTell: HER → ONE kit notice «Tin dữ» at once (who, role, how found from what the world shows — 4 sign lines, never the killer's name; «Không ai biết kẻ nào ra tay.»; the 00:15Z exposure line only when a real trace or witness exists; «Nội vụ phủ đưa <tên> đến hầu thay.») + the same line in Sổ ghi. NPC mistress: the same deed on her house + her new maid (law 1), no card to the player. No new button / screen.
- LOOK (looked at, both devices): https://ctm-img.victoria-tntt.workers.dev/img/_review/split-merge-fix/ tin-du-755x1000 · tin-du-1180x820 (fits, no scroll). Verdict giver wipes: python3 dev/site/cdn_sync.py --wipe-review split-merge-fix
FAMILY (law 11) — every road where a person tied to her dies:
| road | notice before | after |
|---|---|---|
| jcover Thủ tiêu her maid (mu:) | none (silently replaced) | «Tin dữ» + Sổ ghi + new maid; deed on her house |
| jcover Thủ tiêu her servant | none | «Tin dữ» + Sổ ghi; deed on her house |
| jcover Thủ tiêu a housemate consort | killer's line only | «Tin dữ» to her (sameHouse) |
| jcover Thủ tiêu an NPC's maid / servant | none | deed on the NPC mistress's house + new maid (law 1) |
| jmort natural death of her maid | «Cung nữ thân cận … lâm bệnh qua đời. Nội vụ phủ đưa … đến hầu thay.» | unchanged (already) |
| jmort her staff / housemate / court / Thái hậu / child (kidDie) / kin (kc3Die) | own death line each | unchanged (already) |
| j42 maid beaten to death / jagstaff betrayer killed | ordered by the mistress herself (she knows; jagstaff asSee line) | unchanged |
| jagstaff Tân Giả khố / wed / age / expel | not deaths | — |
### LATER (MAIN 171, 27/11 ~04:50Z: ship 46a34673 as is)
- OPEN: P1 (S.hh / p.hh ↔ aff(queen, x) one store — touches co-op world/viewer split + save values) and P4 (evidence total = sum of evc on read, internal) — not built; for a later seat when MAIN picks it.
### ROLLOVER → PUNISH-TIER-8 (PUNISH-TIER-7 at 51 % context, START ≈ 5 %: past START + 25 %, near the 60 % ceiling)
State: review/split-merge-fix 46a34673 (on review/real-proof-2 ae2e0a07) = RV READY, 2nd in RV-163F's queue (session_01Rc5AsMvEuneMZA87bEtG2n). real-proof-2 PASS at RV-163E = f3ceae2f (ae2e0a07 on LIVE + Xóa dấu vết Bạc-else-Sức fix covWipeCost). MAIN = MAIN CHÍNH 173 session_01Rc5AsLaitM5XK7q19672R8.
NEW JOB from MAIN 173 (06:53Z, NOT STARTED): LC28 cannot stage real-proof-2 f3ceae2f — SOURCE conflicts vs the bundle (jpun punNote vs place-close __punQuiet; j63; assemble.py). (1) Remerge real-proof-2 (f3ceae2f) onto review/lc28-b1 448622df (or lc28-b3 if LC28 pushed it) as review/real-proof-2-lc28, KEEP BOTH behaviours (punNote + __punQuiet), rebuild index.html/sw.js, rerun cover · punish-wit · dup-piece-scan · punish-tier (Fold 755x1000 + iPad 1180x820) + one-core-guard. (2) Rebase review/split-merge-fix (3 code commits 2933e560 / B1-B2 commit / e71a493b tests + 46a34673 death notice) on top of the same, as review/split-merge-fix-lc28; rerun split-merge · punish-tier · charge-trinh-punish · charge-followups · cover · punish-wit + one-core-guard. (3) Send both new shas to RV-163F (diff-only re-check) and MAIN 173.
Env: worktrees /home/user/wt/smf (review/split-merge-fix, sparse, built), /home/user/wt/ho7 (handover, local pt7-ho); http server 127.0.0.1:8741 serving /home/user/wt/smf — a new container will not have them: make fresh sparse worktrees (`git worktree add --no-checkout` + sparse-checkout set --no-cone '/*' '!/dev/shots/' '!/dev/owner-shots/' '!/dev/figwork/'). Build: bash dev/site/build_site.sh then git checkout assets.json. Tests take ~1.5 min each; quickcheck ~20 min (known pre-existing gate FAILs only: G1 jph.js:169, npc-purpose j8.js:89, button-crawl «Ô lưu · Lui»); cover LOOK «three tiers at once» FAIL is pre-existing on base too (stills branch only).

### PUNISH-TIER-8 REPORT (27/11 ~07:10Z) — depth 4, START_CTX ≈ 3 %
PRIORITY #1 CHECK: no review/real-proof-2-lc28 / split-merge-fix-lc28 existed; lc28-b3 not pushed → base = review/lc28-b1 448622df; reused the RV-163E PASS f3ceae2f and split-merge-fix 46a34673 as-is (no new code).
1. review/real-proof-2-lc28 = 47d1d4e7 (merge f3ceae2f into 448622df). Conflicts kept BOTH: jpun punNote = real-proof-2 body (punTierRows, her figure) + place-close `window.__punQuiet` early return; j63 resultShow guard = bundle `!sen0` + real-proof-2 `K.lo`; assemble.py = bundle list + `jcover.js` after jcharge.js. index.html/sw.js rebuilt, assets.json = LIVE. Tests: cover · punish-wit · dup-piece-scan · punish-tier Fold 755x1000 + iPad 1180x820 ALL PASS; place-close PASS (C2 no modal, no Q card); one-core-guard PASS (fails 0).
2. review/split-merge-fix-lc28 = 1fb43e5b (2933e560 / f308d856 / e71a493b / 46a34673 cherry-picked onto 47d1d4e7; only index.html/sw.js conflicted → rebuilt in the last commit; assets.json = LIVE). Tests: split-merge · punish-tier (Fold + iPad) · charge-trinh-punish · charge-followups · cover · punish-wit · place-close ALL PASS; one-core-guard PASS.
Sent to RV-163F (diff-only re-check), LC28, MAIN 173. SẴN SÀNG KIỂM.

### PUNISH-TIER-8 job 2 (27/11 ~08:20Z) — review/oan-pace-ghen-lc28 = fa35bacd
PRIORITY #1 CHECK: RV-163G had pushed the same remerge (review/oan-pace-ghen-rv163g 82279b78); sources identical. ab6fdb86 merged into lc28-b1 448622df: j10 facHTML = parity-facfix facFrOk roads + oan-pace spSee on Rời phe / Bán đứng / Gạch tên; assemble.py + joanpace.js after jagharm.js; CHANGE = one line (both texts). Stale paced test setups fixed (BAL.oanPace off for the exact setup write only, as cold-faction / receiver-choice): fac-parity-play (4 FAIL → PASS), nroadhp-unit (1 FAIL → PASS 40).
PASS: oan-pace 33, mood-mem 16/16, moodknow-step0 19/19, cold-faction 20, fac-roads-play, fac-parity-play, nroadhp-unit, result-sieve-card Fold+iPad, one-core-guard. Fail the same way on the parents' own builds: receiver-choice (BAL.rcv.kw), ghen-shown (= ab6fdb86), ob-oan-enc (= lc28-b1, «Nguy hiểm chung» modal).
role-parity: 2 FAIL ×2 runs (lc28-b1 2 FAIL, ab6fdb86 2 FAIL). Gap set = lc28-b1 ∪ ab6fdb86 + up:N-ONLY:cx2:court (draw-only: same has("chamchinh") gate both sides; the maid-life world drew the trait). RV-163G diff PASS, then archived; analysis sent to RV-163H + MAIN 175 (option: make the up probe explicit).

### PUNISH-TIER-8 job 3 (27/11 ~10:10Z, MAIN 177) — landing path for the two owner rows
Death notice (OD 27/11 ~04:08Z) = 46a34673 (PUNISH-TIER-7, RV-163F PASS 3f43f64c); witness 3 tiers / Xóa dấu vết = punish-tier-wit 85d1c0ec (RV-163C PASS) + real-proof-2 f3ceae2f (RV-163E PASS). None on main. The -lc28 restacks sat on lc28-b1 r3, but main took B1 r4 611fca61 + door-onetap 0562e15f.
review/punish-stack-live = 13b1e064 = 1fb43e5b merged onto LIVE 0562e15f (assemble.py: LIVE list + jcover.js; CHANGE = LIVE; built rebuilt; assets.json = LIVE; r4's kit-std revert kept). PASS: door-onetap, split-merge, punish-tier Fold+iPad, punish-wit, cover, dup-piece-scan, charge-trinh-punish, charge-followups, place-close, one-core-guard. LOOK stills on CDN img/_review/death-notice/ (fold, ipad). Sent to RV-163H (diff-only) + LC29 + MAIN 177.

### PUNISH-TIER-8 job 4 (27/11 ~11:00Z) — death-notice LOOK fix → review/punish-stack-live-2 = 90885d1d
MAIN 177 LOOK: wording PASS, picture FAIL ×3 (figure must be the DEAD person b/w incl. frame; new-maid avatar covered the picture on Fold; same layout both devices). Restacked on review/owner-ui-a 9724b12d (a11fd8be; holds §84b .kst-dead), then 90885d1d: covTell kit facts spec (who:[] lines) + who = kitDeadWho(dead); covKill maid/servant alive=false; covStageSwap (stage snapshot drops the dead maid, new maid stands in); KIT §84b.2 kitDeadWho / kstOfP / kitStageFig + kstPaint dialog pass / dead plate b/w / kitFigOf staff role. KIT_REQUESTS filled (filed on review/kitreq-dead-portrait 3b2a9ef3). Tests PASS (split-merge +1, punish-tier Fold+iPad, punish-wit, cover, dup, ctp, cfu, place-close, door-onetap, guard); dlg-fig-scan 63/63 BAD = same on base. Re-stills on CDN img/_review/death-notice/. Waiting: MAIN LOOK, KK57 kit sign-off, then RV-163I + LC29.

### ROLLOVER → PUNISH-TIER-9 (PUNISH-TIER-8 at 32 % context, START ≈ 3 %: past START + 25 %) — 27/11 ~10:45Z, depth 4
Coordinator = MAIN CHÍNH 178 session_01Rc5AsK6mbiZrd5Xo7fQ4EE. Reviewer BIG = RV-163I session_01Rc5AsKXFW3dP8VDY8wrGhP. Lander = LC29 session_01Rc5AsJXMuocXkEBTSY35Pa. Kit keeper = KK58 session_01Rc5AsKr7KUmN5RV74HWdut. owner-ui-a owner = OWNER-UI-C session_01Rc5AsLoQNjZmHi3rWPc992.
STATE:
- review/punish-stack-live-2 = 1cbe0c31 (on review/owner-ui-a 976a26a3 ← verdict-dlg-fix ← LIVE 0562e15f). Carries punish-tier-wit 85d1c0ec + real-proof-2 f3ceae2f + split-merge-fix + death notice + the death-notice LOOK fix (90885d1d, MAIN 177 LOOK PASS) + KIT §84b.2 (kitDeadWho / kstOfP / kitStageFig + kstPaint dialog pass / dead plate / kitFigOf staff role). All tests PASS (split-merge, punish-tier Fold+iPad, punish-wit, cover, dup-piece-scan, charge-trinh-punish, charge-followups, place-close, door-onetap, kst-scan, dead-card, one-core-guard).
- HELD: owner-ui-a 976a26a3 FAILED RV-172; OWNER-UI-C is fixing. When it sends the fixed owner-ui-a sha: `git merge` it into punish-stack-live-2 (only index.html/sw.js conflicted last time → `git checkout --ours index.html sw.js`, `bash dev/site/build_site.sh`, `git checkout HEAD -- assets.json`), rerun the tests above, push, send RV-163I the DELTA only (+ LC29 copy, MAIN 178).
- KK58 kit sign-off on §84b.2 asked (10:35Z), no answer yet.
- Done earlier: review/oan-pace-ghen-lc28 fa35bacd LAND READY (RV-163H). review/real-proof-2-lc28 47d1d4e7 / split-merge-fix-lc28 1fb43e5b / punish-stack-live 13b1e064 = SUPERSEDED by punish-stack-live-2. review/kitreq-dead-portrait 3b2a9ef3 = request text only (filled in punish-stack-live-2).
NEW JOB from MAIN 178 (10:42Z, NOT STARTED), verbatim: "(2) NEW WORKER JOB «DLG-DEAD-BTN» (whole family, law: fix the family): branch review/dlg-dead-btn off LIVE 00dca386 (merge review/live-bugs-2711-rv d4629189 first so gift tiles are not redone). Foreman F faults on LIVE (FOREMAN_F_STATUS 09:55Z/10:28Z): «Đông sở» .dlg scrolled to end has no close/next button; «Tin báo» «Để sau» dead after 3 real taps; «Biếu quà làm lành» item cards outside viewport are dead + 326 confirm buttons disabled. Write a scan: every .dlg / picker on Fold + iPad, scroll to end, real taps (no el.click) on every close/next/later/confirm + every item card → list dead/unreachable before → fix (kit parts only; missing part → KIT_REQUESTS + tell KK58 session_01Rc5AsKr7KUmN5RV74HWdut, who is checking K-RING-ALL overlap) → after table 0 dead. Stills Fold+iPad to me (LOOK), then RV-172 session_01Rc5AsMQUkvknjvx1NAFt25. Report dev/handover/reports/dlg-dead-btn.md on the branch. Your roll at START+25 %: write handover in report and tell me."
Env tips: worktree /home/user/wt/rp2l (branch psl2 = punish-stack-live-2) will not exist in a new container — make fresh sparse worktrees (git worktree add --no-checkout + sparse-checkout set --no-cone '/*' '!/dev/shots/' '!/dev/owner-shots/' '!/dev/figwork/'); fetch --depth=30..60 under flock /home/user/wt/fetch.lock. Stills script pattern: start(), remove #kroul/#kload/#kboot/#klife, Q.length=0, closeModal(), render(), then the act, then render() before showModal(). door-onetap.js takes a FILE path (dev/index.html), not a URL; place-close.js serves the root itself.
TAKEOVER LINES (copy verbatim into the successor prompt):
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11, every foreman and main): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.
UPDATE 10:46Z (after the rollover note): RV-163I PASSED the punish diff of 1cbe0c31 (rv-163i.md §3) and wiped the death-notice CDN folder. Still needed for LAND READY: (a) restack on OWNER-UI-C's fixed owner-ui-a → new sha → RV-163I checks the delta only; (b) KK58 kit sign-off for KIT §84b.2 (law 9).

## PUNISH-TIER-9 (MAIN 179, session_01Rc5AsJMhFUrAuYcVqnYC2Z, depth 1, START_CTX ≈ 3 %) — review/punish-stack-live-3 = 5211d747
PRIORITY #1 CHECK ('punish-stack-live-2'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 1 (review/punish-stack-live-2 9585e741) | archive 0 — reused that branch, no rebuild.
BASE: LIVE = 772bee4f; 3a/3b not LIVE → stacked on review/lc31-b3b 612afc75 (holds lc31-b3a 05804755 ← ui2l 26a1eacd ← LIVE). Merge 8fdde380 (punish-stack-live-2 9585e741, carries owner-ui-a 7539432d) + ee44ccd8 (ttExposed family + leave-palace test expectations) + aa42bbab / 5211d747 (npc-purpose rows j22.js:21 → out, j8.js:89 done-text = merged mercy line; test data only, build unchanged since ee44ccd8). Gates: LIVE 772bee4f ancestor OK, b3b ancestor OK, 0 deletions vs LIVE and vs b3b. index.html / sw.js rebuilt; assets.json = b3b; CHANGE.txt = b3b line (lander writes the bundle line).
RULINGS USED: E74 (e-pack 3a) = OD 24/11 ~07:55Z (6) severity ladder + MAIN 118 06:16Z P1/P2/P3 (OD:L2328–2329). PUNISH-TIER = OD 26/11 ~19:50Z (L2641), ~20:35Z (L2649), ~20:40Z (L2651), ~21:00Z (L2658), ~21:10Z/~21:40Z witnesses (L2661/2667/2668), split-merge 26/11 ~21:00Z + 27/11 ~00:46Z/~01:00Z. 3b display (spSee) and oán door are not rulings that clash — kept beside the newer code.
### Clash table (hunk | file:line on ee44ccd8 | ruling | kept side)
| hunk | file:line | ruling OD:Lnn date | kept side |
|---|---|---|---|
| deathSentence: mercy for a spared death | dev/build/j8.js:107–112 | OD:L2649 26/11 ~20:35Z rec 1 (tử tội → ban chết or commuted to phế vị + lãnh cung chung thân) > OD:L2329 24/11 ~07:55Z (6) (E74 nghịch mercy = phế làm thứ dân) | PUNISH (punCold "phe", her + NPC); E74 tier arg + «no first-year mercy for nghịch» kept (no newer ruling on it); dsDan removed; BAL.crime.nghich.mercy "phe" (jbal2.js:2310) |
| crimeTier / convict / tsMonth / tsRecallCh / tsMonthAll | dev/build/j8.js:115–135 | MAIN 118 P1/P3 24/11 (no newer ruling on treason kinds or thất sủng) | E74 (comments moved to «phế vị + lãnh cung chung thân») |
| fall(): coin toss → crime weight | dev/build/j8.js:141 | OD:L2641 26/11 ~19:50Z + L2649 | PUNISH (punTier x); E74/3a side had only meRankN in the old text |
| j3 love-letter «Trình lên Hoàng thượng» | dev/build/j3.js:161 | MAIN 118 P2 24/11 (one tư thông road, law 11) — punish side only added "nang" to the old fall() | E74 ttNpcExposed (the one road); its tier now = PUNISH tt (next row) |
| ttExposed (family of the j3 / j30 hunks, law 11) | dev/build/j22.js:22–29 | OD:L2641/L2649 26/11 (the CRIME decides; BAL.charge.C.tt.tier = nặng) > MAIN 118 P2 24/11 (tư thông = death unless empMercy → lãnh cung) | r2 (MAIN 179 ruling 27/11 ~17:56Z): PROVEN tư thông (every ttExposed caller) = BAL.charge.ttProven "tu" → tử tội road (ban chết or commuted phế vị + lãnh cung chung thân, BAL.charge.tu.spare); SUSPECTED (Tố giác charge road) = C.tt.tier nặng = giáng + lãnh cung (owner verbatim OD:L2649 «hạ bậc, lãnh cung … cho là nặng»; the 19:05Z «nặng keeps the title» row MAIN quoted is void by L2641/L2649/L2658); her + NPC; man xử trảm |
| j3 «bị bỏ quên» | dev/build/j3.js:204 | MAIN 118 P3 24/11 (no fault ⇒ no lãnh cung); no newer ruling | E74 tsMonthAll (punish side was LIVE's old cold "keep") |
| j14 release rank | dev/build/j14.js:18–20 | OD:L2649 rec 5 26/11 (minh oan = old rank if seat free, else one lower) | PUNISH (coldTitleOf / coldBack) + 3a meRankN() |
| j30 tocao / expose | dev/build/j30.js:24–25 | OD:L2649 rec 6 + L2651 phản tọa; split-merge 27/11 ~00:46Z; tt tier = nặng | PUNISH (chBack phản tọa, chPunish at tt tier, tử tội spare roll) + 3b spSee on xinhh |
| j78 person-card acts | dev/build/j78.js:196–207 | split-merge B1 26/11 ~21:00Z + 27/11 ~00:46Z/~01:00Z (one «Tố giác»); owner word «đã khuất» (RV-172) | PUNISH/split-merge + 3b spSee on 8 rel/oán previews |
| j95 bribe card «Lời nhờ cậy» | dev/build/j95.js:~423 | OD:L2667 26/11 ~21:35Z (no buy-off of witnesses) + split-merge P2 | PUNISH (card stays removed; 3b only had a display wrap) |
| j95 caught-scene options | dev/build/j95.js:430–441 | split-merge B3/P6 27/11 ~00:46Z (one «Tố giác», listener picked) | PUNISH + 3b spSee on lose / silent lines |
| jagacts3 p3Free | dev/build/jagacts3.js:106 | OD:L2649 rec 5 (chung thân only by minh oan) ; 26/11 ~21:09Z MAIN (one oán door) | PUNISH signature (full, coldLife) + 3b oanAdd door |
| jbal2 tables | dev/build/jbal2.js:2447–2520 | none clash (additions both sides) | BOTH: punish w (+wthreat/wbribe/wkill) + 3b noise + sideq + punish tier/wit/cover |
| assemble.py list | dev/build/assemble.py:15 | — | b3b list + jcover.js after jcharge.js + jdead.js last |
Laws: law 1 two-way (every kept rule runs for her and NPCs the same: deathSentence, ttExposed, fall, tsMonth); law 3 gain-and-loss kept on the previews (spSee rows); law 4 numbers BAL only (BAL.crime, BAL.charge.C.tt.tier, BAL.charge.*).
Test expectations moved to the newer rulings (dev/test/leave-palace.test.js, 6 lines, comment PUNISH-TIER-9): treason + nhân từ → phế vị + lãnh cung (S and NPC); tư thông no mercy → giáng + lãnh cung; j30 «Bóc chuyện tư tình» no longer a separate ttExposed caller (folded into «Tố giác»).
### Tests on ee44ccd8 (http 127.0.0.1, Fold 755x1000 + iPad 1180x820)
| test | Fold | iPad |
|---|---|---|
| split-merge · punish-tier · punish-wit · cover · dup-piece-scan | ALL PASS | ALL PASS |
| charge-trinh-punish · charge-followups · dead-card · one-core-guard · place-close | ALL PASS | — |
| leave-palace (after the expectation move) | ALL PASS, 0 page errors | — |
| dead-family (every dead surface) | PASS 4/4 surfaces | PASS 4/4 |
| npc-purpose-scan (after 5211d747) | PASS 419 rows | — |
| door-onetap | run 1 FAIL 1 «NPC: no grouped door+tier choice seen» (NPC harm options 0, under quickcheck load); run 2 PASS (NPC harm options 2, grouped 1, page errors 0). b3b 612afc75 same test: options 12, grouped 4. Random draw of NPC motives; counts lower than b3b — RV please eye it | — |
| q-softlock | inside quickcheck (load) FAIL 5; standalone on 5211d747 PASS; b3b PASS; punish-stack-live-2 itself FAIL 2 (view parked by tab change) | Fold + iPad in the test |
| quickcheck --runs 3 | QUICKCHECK PASS part (open 1927 ms · old save loads + plays a buổi · TIME-SPILL PASS · perf median new/live render 200/231, tab 350/380, buổi 1500/1328 ms, tasks>200 17/19). CORE GATES FAIL: G1 one-core-text-rule jph.js:173 / jkpick.js:141 (files = b3b, untouched); G4 npc-purpose (j22:21, j8:89 — fixed in aa42bbab/5211d747, scan PASS); G4 q-softlock (load flake, standalone PASS); G4 kit-std-scan ENOENT .quickcheck/gates/kit-std/kit-std-scan.json (tool); G4 noise-hygiene: text-hygiene static 7 new keys in jkitpage.js / jmapz.js / jnotice.js (files = b3b, untouched), noise-day 0 full days (advisory) | |
| death-notice + dead-portrait stills, LOOKED: dead maid b/w figure, no killer name, new maid on stage, fits, same layout; dead consort b/w frame «Đã khuất», record rows | OK | OK |
Stills: https://ctm-img.victoria-tntt.workers.dev/img/_review/punish-stack-live-3/ tin-du-{fold,ipad}.png · lc-{fold,ipad}-dead.png. Verdict giver wipes: python3 dev/site/cdn_sync.py --wipe-review punish-stack-live-3
Sent: RV-163K (BIG, delta + this table), copy MAIN 179. Worktree /home/user/wt/psl3 (branch psl3, built, http 127.0.0.1:8761) kept for a fix round.
### PUNISH-TIER-9 r2 — review/punish-stack-live-3 = cd2c142a (MAIN 179 ruling on FLAG 3)
Delta vs 5211d747: j22 ttExposed → fall(p,…,BAL.charge.ttProven) ; jbal2 BAL.charge.ttProven="tu" ; leave-palace P2 parity (man xử trảm; she + NPC on the tử tội road: dead or phế + lãnh cung) ; npc-purpose row j22:21 «out» text ; index.html rebuilt. NẶNG kept = giáng + lãnh cung: owner verbatim OD:L2649 26/11 ~20:35Z «Tội vừa hạ bậc, lãnh cung và hạ bậc cho là nặng» (+ L2658 ~21:00Z «nặng = giáng + lãnh cung»), newer than the 19:05Z MAIN rec (L2636) quoted by MAIN, which L2641 declares void.
Tests on cd2c142a: leave-palace 135/135 · split-merge Fold + iPad ALL PASS · punish-tier Fold + iPad ALL PASS · charge-trinh-punish ALL PASS · npc-purpose-scan PASS 419 · one-core-guard PASS. 0 deletions vs LIVE.

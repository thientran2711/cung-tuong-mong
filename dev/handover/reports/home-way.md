# HOME-WAY report (worker session_01V1ZZH3KBeUcSLSUiQfAU1w, depth 1, START_CTX ~3 %)
PRIORITY #1 CHECK: OD 'Về phòng' 4 / 'home mark' 1 / 'cấm túc 2 tháng' 4 | main dev/build/jk3.js:390-406 (#k3room «Về <place>», hidden on the place page), dev/build/jplrule.js:61-87 (map «Về phòng · N khắc», «Nhà ta», cấm túc banner) | review/place-rules (landed f009e1a6) | claims: HOME-WAY row by MAIN 152. REUSED: travel() + BAL.walk.near/far (already in BAL: near 1, far 2), plHomeK/plHome, cutPay (khất bổng, j20), punish() (j8).

Branch review/home-way from origin/main f009e1a6. Commits: 213e3e97 (code+tests+kit docs), video script, 232c8ad1 (one-core guard: owner quote with a number removed from CSS comments), 181660b5 (fresh build), 6f8edc13 (3 light faults) + 6ecfc659 (fresh build). STATUS: LAND READY 6ecfc659 (supersedes 181660b5; adds the 3 light faults sếp approved). BIG reviewer via MAIN 153. Quickcheck on 6ecfc659: quickcheck.js PASS (open 0 errors · old save from LIVE ok · perf render 301/291, tab 684/535, buổi 2708/1948 ms within limits); gates dialog-fixed + button-crawl = same as LIVE main; next-dead failed once inside the gate run (iPad «B real then Sang buổi»; run 1 failed fold, run 2 passed) and passes 3/3 alone on both main and this branch = load flake.

## 1. Top-bar «Về phòng» (one rule with the Dư đồ)
BEFORE (LIVE f009e1a6, measured Fold + iPad at Ngự hoa viên): #k3room HIDDEN on the place page (both devices), label «Về Ngự hoa viên», tap = back to the place stage, never home.
AFTER: `homeWay()` / `homeGo()` / `homeName()` in jplrule.js = THE rule for every «Về phòng» (top bar #k3room in jk3 + Dư đồ top row plMap):
- away: always shown (place painting included), label «Về phòng · N khắc», N = travel(place,"home") = BAL.walk.near (1) / BAL.walk.far (2) (+ walkSlow), tap = goTo("home") then her room's page.
- no khắc left: disabled, «Về phòng · hết khắc» (title says why).
- second line = her palace's name (home mark), e.g. «Diên Huy cung». One page (Fold): label shown under the room icon while away (.hwaway, jk3/jk4); at home icon only as before.
- KIT.md §75 rewritten in place (canon overwrite of «Về <place>»).
## 2. Home icon
Dư đồ «Nhà ta» (place-rules) verified on every map view in tests (F). Top bar: palace NAME as second line of the kit button. Painted icon: KIT_REQUESTS K-ICO-HOME+ (ico-home.webp for #k3room + Dư đồ) → KK37 session_01V1ZZH16x8rVajpgG2KwrB5 (no code art).
## 3. Punishment by weight (BAL.punW, jtwoway.js beside confM; [thường, nóng nảy, nhân từ])
- lite (sev 0, NHẸ): no cấm túc; khất bổng cut [1,1,0] months (0 = cảnh cáo). mid (sev 1, VỪA): cấm túc m [1,2,1]. heavy (sev 2, NẶNG): demo [50,100,25] in 100 one rank, else m = BAL.tw.g.confM [2,3,1] (unchanged).
- punish() (j8) reads it for her AND every NPC (law 1); punishMonths(sev)/punishCut()/punishDemoP() + aaPunishTxt(sev) texts follow.
- OVERSTAY (jstagehere stayRoll): caught = NHẸ (Danh -BAL.sneak.danh + khất bổng 1 tháng, card «Lỗi nhẹ: không bị cấm túc»). Closing notices say the light price (no more «như lẻn vào»).
- NO FAULT ⇒ NO PUNISHMENT: when the buổi ends and the walk home cost more khắc than she had (button disabled), she is escorted home, no loss, card «Không phải lỗi của ngươi».
- NPC overstay: NPCs have no overstay roll (they follow schedules) — nothing to mirror; any NPC punish uses the same tiers.
Scan: `python3 dev/test/punish-weight-scan.py [--md]` (70 punish() calls + 19 direct cấm túc writers).

### LAW 16 — working rules this CHANGES (MAIN to confirm with sếp)
1. Every sev-1 punishment (31 calls + BAL-sev calls that resolve to 1): cấm túc 2 → 1 tháng (nóng nảy 3 → 2, nhân từ 1 = 1). Owner ruling 04:25Z asked for vừa between nhẹ and months.
2. Overstay: was punish sev 1 (cấm túc 2 tháng) → nhẹ (khất bổng 1 tháng / cảnh cáo), and no punishment at all without a way home.
3. place-rules test A expectation (cấm túc on caught overstay) overwritten to the light price.
APPLIED after sếp OD 26/11 ~05:55Z «3 lỗi nhẹ ok» (6f8edc13): NHẸ (khất bổng, no cấm túc), her and NPCs, for «làm phiền lúc thánh thượng nổi giận» (j2:162, jagacts2:80), «ăn mặc vượt phẩm» (j92:295, jdress:76), «vượt phẩm» (j8:185, BAL.shelf.acc.vpConf 1→0 = jshelf:302). The scan now fails if any of them is not sev 0; home-way.js checks vpConf. dress-offence.js: same 2 fails as LIVE main (8d maid dò la, 10 old save) = pre-existing (it is unseeded: one run showed 6 more «Người cùng cung» fails from a random same-house draw; reruns = main). Story-road cấm túc (BAL.road.*) unchanged.

## 4. Tests
- dev/test/home-way.js (new): A top bar walk home (cost = travel, arrives in room) · B 14 places: label N ∈ {near, far}, top bar = map label · C no khắc ⇒ disabled + no punishment · D caught overstay = light · E tiers her + NPC · F «Nhà ta». Fold PASS, iPad PASS.
- dev/test/place-rules.js PASS (A updated, law 16 item 3). tinbao-words scan PASS (expects the light price). room-btn-scan PASS. punish-weight-scan PASS.
- quickcheck: quickcheck.js PASS on 232c8ad1 (open 0 errors · OLD SAVE from LIVE loads + plays a buổi · perf render 272/247, tab 565/479, buổi 1475/1486 ms). Core gates: G1 one-core-guard + next-dead PASS; dialog-fixed (kit-dialog-2 empty Tốn/Được cell) and button-crawl (title «Ô lưu» Lui) FAIL the SAME WAY on LIVE main f009e1a6 (baseline run in /home/user/wt/hw-main) = pre-existing, not this branch. 181660b5 = 232c8ad1 + fresh build only; rebuild of 181660b5 identical except the allowed CTM_BI line.
- Videos: Fold https://ctm-img.victoria-tntt.workers.dev/img/_review/home-way/home-way-fold-755x1000.mp4 · iPad https://ctm-img.victoria-tntt.workers.dev/img/_review/home-way/home-way-ipad-1180x820.mp4 · frame sheets https://ctm-img.victoria-tntt.workers.dev/img/_review/home-way/sheet-fold.jpg https://ctm-img.victoria-tntt.workers.dev/img/_review/home-way/sheet-ipad.jpg (looked at: away label «Về phòng · 2 khắc» + palace name on both; tap → her room, 2 khắc; no khắc → «Hết giờ tiếp», «Không phải lỗi», cấm túc 0; caught with khắc left → «Bị bắt» Danh -8 · khất bổng 1 tháng · «Lỗi nhẹ: không bị cấm túc»). Script dev/test/home-way-video.js.

## 5. Before/after table (generated by dev/test/punish-weight-scan.py --md at 6ecfc659; before = LIVE f009e1a6)
| source | why | sev | before | after |
|---|---|---|---|---|
| j10.js:160 | "bị đồng đảng tố giác" | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| j10.js:169 | `hợp mưu vu cáo ${NM(t)}` | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| j13.js:31 | "giả bệnh khi quân" | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| j2.js:162 | "làm phiền lúc thánh thượng nổi giận" | 0 | cấm túc 2 tháng (was sev 1) | NHẸ: khất bổng 1 tháng (nhân từ: cảnh cáo) |
| j2.js:180 | "lục lọi cung phi tần" | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| j22.js:60 | "giả sảy thai, khi quân" | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| j4.js:31 | "buôn lậu trong cung" | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| j4.js:40 | "tư tình với thị vệ" | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| j41.js:53 | `tự tiện lẻn vào ${nm}` | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| j55.js:47 | "hậu cung can chính" | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| j55.js:127 | "hậu cung can chính" | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| j7.js:21 | "chôn hình nhân trù ẻo" | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| j7.js:26 | "gửi quà có độc" | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| j7.js:100 | "giết người diệt khẩu" | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| j70.js:210 | `bị bắt quả tang ${M.n.toLowerCase()} nhắm vào ${nm70(t)}` | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| j71.js:236 | "mưu hại trong cung" | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| j72.js:166 | q72Txt(o.pun,X) | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| j77.js:52 | `tự tiện lẻn vào ${nm}` | P.sev | by P.sev | by P.sev (same tiers) |
| j78.js:145 | "bị Hoàng hậu xét tội theo chứng cứ" | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| j8.js:112 | ? | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| j8.js:129 | "vu oan phi tần" | BAL.eff.j8.frameSev | by BAL.eff.j8.frameSev | by BAL.eff.j8.frameSev (same tiers) |
| j8.js:136 | "tố hụt Hoàng hậu, phạm thượng" | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| j8.js:151 | "phá việc học của hoàng tự" | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| j8.js:157 | "mưu hại hoàng tự" | BAL.eff.j8.pondSev | by BAL.eff.j8.pondSev | by BAL.eff.j8.pondSev (same tiers) |
| j8.js:159 | "con trai bị tố trù ẻo" | BAL.eff.j8.kframeSev | by BAL.eff.j8.kframeSev | by BAL.eff.j8.kframeSev (same tiers) |
| j8.js:182 | "bị Hoàng hậu xử tội" | n>=3?2:1 | by n>=3?2:1 | by n>=3?2:1 (same tiers) |
| j8.js:185 | "vượt phẩm" | 0 | cấm túc 2 tháng (was sev 1) | NHẸ: khất bổng 1 tháng (nhân từ: cảnh cáo) |
| j8.js:276 | "dâng đồ ngự dụng giả mạo" | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| j8.js:308 | "cài tang vật vu oan" | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| j8.js:312 | ? | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| j8.js:418 | "bị đồn sinh ra yêu vật" | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| j8.js:450 | "bị cung nữ tố giác mưu kế" | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| j9.js:152 | "xô ngã phi tần" | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| j92.js:272 | "mặc đồ đỏ vàng giữa quốc tang" | WD.tangPunish | by WD.tangPunish | by WD.tangPunish (same tiers) |
| j92.js:295 | "ăn mặc vượt phẩm" | 0 | cấm túc 2 tháng (was sev 1) | NHẸ: khất bổng 1 tháng (nhân từ: cảnh cáo) |
| j92.js:297 | "mặc đồ đỏ vàng giữa quốc tang" | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| j92.js:336 | "giá họa vu oan" | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| j92.js:338 | "lấy trộm đồ" | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| j92.js:345 | "giá họa vu oan" | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| j92.js:349 | "lấy trộm đồ" | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| j92.js:385 | "làm mất đồ ngự tứ mà giấu, tội bất kính" | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| j92.js:388 | "làm mất đồ ngự tứ, tội bất kính" | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| j95.js:442 | "chuẩn bị mưu hại" | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| j95.js:444 | "vu cáo phi tần không đủ chứng cứ" | to==="emp"?2:1 | by to==="emp"?2:1 | by to==="emp"?2:1 (same tiers) |
| j95.js:456 | "vu cáo người khác tư thông" | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| jagacts2.js:80 | "làm phiền lúc thánh thượng nổi giận" | 0 | cấm túc 2 tháng (was sev 1) | NHẸ: khất bổng 1 tháng (nhân từ: cảnh cáo) |
| jagacts2.js:97 | "lục lọi cung phi tần" | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| jaudit.js:255 | "bị Hoàng hậu xét tội theo chứng cứ" | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| jdress.js:76 | "ăn mặc vượt phẩm" | 0 | cấm túc 2 tháng (was sev 1) | NHẸ: khất bổng 1 tháng (nhân từ: cảnh cáo) |
| jemoact.js:414 | `mắng cung nữ của ${o.who.name}` | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| jemoact.js:417 | `phạm thượng với ${t.queen?"Hoàng hậu":t.name}` | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| jlost.js:140 | "lấy trộm đồ" | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| jmen.js:212 | ? | formal?2:1 | by formal?2:1 | by formal?2:1 (same tiers) |
| jmen.js:221 | "che giấu nam nhân lẻn vào hậu cung" | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| jrcp.js:184 | `dâng đồ làm ${who} phát bệnh` | sev | by sev | by sev (same tiers) |
| jrcv.js:242 | "bị Hoàng hậu xét tội theo chứng cứ" | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| jreign.js:218 | "can dự chuyện triều chính" | o.pun | by o.pun | by o.pun (same tiers) |
| jreign.js:260 | "là người của phe Tể tướng" | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| jroute.js:125 | "vu cáo người khác tư thông" | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| jroute.js:233 | "bị tố vu khống" | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| jroute.js:358 | "vu cáo phi tần" | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| jroute.js:367 | "vu cáo phi tần" | N.accPun | by N.accPun | by N.accPun (same tiers) |
| jroute.js:379 | "vu cáo phi tần" | N.accPun | by N.accPun | by N.accPun (same tiers) |
| jshelf.js:302 | "vượt phẩm" | B.vpConf | by B.vpConf | by B.vpConf (same tiers) |
| jstagehere.js:96 | `ở lại ${n} sau giờ đóng cửa` | 0 | cấm túc 2 tháng (was sev 1) | NHẸ: khất bổng 1 tháng (nhân từ: cảnh cáo) |
| jtruth.js:92 | `vu khống ${p===S?"ngươi":p.name}` | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| jtsb.js:100 | "ức hiếp người dưới phẩm" | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| jtsb.js:145 | "ức hiếp người dưới phẩm" | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |
| jworld2.js:145 | "dùng bùa ngải hãm hại người" | 2 | cấm túc 2 tháng, or one rank (1 in 2) | NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged |
| jworld2.js:147 | "bị nghi dính vào vu cổ" | 1 | cấm túc 2 tháng | VỪA: cấm túc 1 tháng (nóng nảy 2) |

| direct writer | who | months (BAL) |
|---|---|---|
| j13.js:24 | p | 1 |
| j72.js:430 | v | v.confined-1 |
| j8.js:100 | p | m |
| j8.js:102 | p | BAL.eff.j8.mercyConfine |
| jcoopworld.js:825 | S | (S.confined//0 |
| jemoact.js:637 | q | mNew |
| jrd_bd.js:72 | S | BDCF(k |
| jrd_ch.js:946 | v | BAL.road.ch_bi.conf |
| jrd_cn.js:9 | p | m |
| jrd_cn.js:136 | v | BAL.road.cn_chu.cam |
| jrd_cn.js:426 | S | BAL.road.cn_tinh.cam |
| jrd_cn.js:429 | S | BAL.road.cn_tinh.cam |
| jrd_cn.js:491 | S | BAL.road.cn_tinh.cam |
| jrd_cn.js:565 | rv67(A | "v" |
| jrd_cn.js:687 | rv67(A | "v" |
| jrd_muoi.js:13 | v | BAL.road.muoi_no.cam |
| jrd_nc.js:18 | S | NCCF(k |
| jrd_pt.js:51 | S | PFCF(k |
| jrd_thd.js:206 | rv67(A | "v" |
faults: []

## Handover
Work complete; only review remains. Worktrees /home/user/wt/hw-main and /home/user/wt/hw-vid (sparse) can be removed. Not done here: painted home icon (K-ICO-HOME+, KK37); pets khắc budget goes to FOREMAN E (E-d), not this branch.

## ROLLOVER HANDOVER (26/11 ~06:35Z) — HOME-WAY → successor (coordinator MAIN 153 opens it)
Worker session_01V1ZZH3KBeUcSLSUiQfAU1w, depth 1: START_CTX ~3 %, now ~32 % (≥ START + 25 %) → rollover, nothing of the follow-up started.
DONE: review/home-way BIG PASS 532fbce1 (MAIN 153's r6 fix: «no way home» = never had the khắc this buổi; had it and spent it = light roll).
NEXT JOB (MAIN 153 order 06:33Z, verbatim): "Follow-up on a NEW branch from 532fbce1 (review/home-way-nits): (1) Dư đồ disabled «Về phòng · hết khắc» shows generic «chưa đủ điều kiện» under CẦN → show the real reason (fix the kit reason path for all disabled kit buttons that have a known reason, law 11); (2) Fold: disabled label wraps «Về phòng · hết / khắc» over 3 lines → keep it to the kit button tier size (law 10), check every top-bar button label on Fold+iPad. Fold+iPad shots, LAND READY to me."
POINTERS: the rule = jplrule.js homeWay()/homeGo()/homeName() (w.title holds the real reason; the map button passes it only as title=, the kit «CẦN» reason path does not read it). Top-bar label + Fold layout: jk3.js k3Shell wrapper (label = w.label + "\n" + palace name) and the .hwaway CSS in jk3.js (kv1 block) + jk4.js (k3ph block, font .62rem, max-width 96px). Tests: dev/test/home-way.js (DEV=fold|ipadAir, SHOT_DIR=… writes A-<dev>.png), punish-weight-scan.py, place-rules.js, tinbao-words/scan.js. Build: bash dev/site/build_site.sh; quickcheck: bash dev/tools/quickcheck.sh (~20 min; dialog-fixed + button-crawl fail on LIVE f009e1a6 too; next-dead flakes under the gate load, passes alone). Videos/CDN: dev/test/home-way-video.js, python3 dev/site/cdn_sync.py img/_review/<topic>.
Worktree /home/user/cung-tuong-mong is on review/home-way 6ecfc659, clean.

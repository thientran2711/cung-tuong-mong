PRIORITY #1 CHECK ('Q3 helper answers' / 'RDHP' / 'BAL.road.hp'): OD L1876 (owner D-Q1 = "1") + L1601 (5) | main none (no RDHP / BAL.road.hp on origin/main 2850c45) | review/* review/questline-q3 (this branch), review/questline-audit (spec §3 G3, §4 Q3, §6 D-Q1), review/questline-q1a/b/c (NRASK, no overlap in code; merge = assemble.py list only) | claims E9 only

# REVIEW questline-q3 e05a23a — FAIL (reviewer E9r, Foreman E)
Base: 5cbfd62 (origin/main is now 2850c45; merge-tree conflicts only in built index.html / sw.js → rebuild on rebase). START_CTX ≈ 3 %.

## What holds (checked)
| Check | Result |
|---|---|
| (1) owner rule D-Q1 | 4 answers full / half / no / sab(+lk) drawn from base role × nết × liking × Tâm cơ × own road × nợ ân (jroad.js rdHpW); one word in the Gợi ý row before she picks, never odds (unit: no digit in hint); sabotage never shown except Nhiều chuyện «Lắm lời». No-ask road: roadhp-scan 203/203 tagged hồi keep a free option (0 hidden by filters in a neutral life); the 4 untagged («Cảm tạ, không dám nhờ», «…không kèm lời nhờ», «Không nhờ ai», «Họ cha, nhờ công trận») are correctly no-ask. Funnel: only odds of the option change (r0 called with odds / odds−half / 0); refusal re-fires the same hồi; no ending opened/closed. OK |
| (2) road files | jrd_*.js untouched (git diff 5cbfd62..e05a23a: only jrdhp.js new). OK |
| (3) ONE CORE | every number in BAL.road.hp (jbal2.js) — half, min, noC, sab.duc/oan, weights, coefficients; unit test changes half=33 and sees it. OK |
| (4) KIT | word goes into the §28.6 kitHintRow via the per-option `hint` override; no new CSS/frame; refusal line uses the existing A.rq speaker row. OK |
| (5) VANPHONG | 75 lines, cổ trang, no %, no shared line, rank voice via kSay works for th/hh/emp/eun/maid/doc/man/v (checked at Thường tại and Quý phi: «tiểu chủ»/«nương nương», «tần thiếp»/«bổn cung», Hoàng thượng «nàng»). No deadline / fixed-date words clash (lines are past results: «Thư nhà về», «chỉ một đêm», «buổi thỉnh an»). **FAIL items 1–3 below.** |
| (6) measures | re-ran `road-hp-bal.js 10 lives × 8 y askoff,ask`: won 17 % off vs 26 % on (n tiny, inside the worker's noise band 23.5 vs 22.5); 0 page errors. Formula check: cold Kiêu ngạo (liking −50, Tâm cơ 70) on v → [0,30,70,60] = sab 37 %; warm Ân cần (+50) → [80,20,0,0] = sab 0; unit: cold 42 vs warm 0. Plausible |
| (7) old save / co-op | quickcheck old save ok; unit: old open hồi without hpNo resolves, nrGuest → today's roll, __hpoff → today's roll. OK |
| (8) tests | roadhp-scan PASS · roadhp-unit PASS · trial merge q3+q1c (assemble.py both entries): nrask-scan ALL PASS, nrask-m-scan PASS, nrask-engine ALL PASS, roadhp-scan PASS → no regression · `bash dev/tools/quickcheck.sh` PASS (226 s, core gates PASS, render 266/245 ms) |
| shots (LOOKED) | Fold 755x1000@2: card «Nhờ Thái hậu nói một lời», Gợi ý «Thái hậu: Sẵn lòng; chẳng được gì», kit row, no overflow; refusal shot: Thái hậu portrait row «Từ chối: Thái hậu khép mắt: «Ai gia già rồi, chuyện ấy Quý nhân tự liệu lấy.»», option gone, Sức 75→72. iPad 1180x820@2: word card fine; **shot 2 shows no answer line** (item 4) |

## FIX LIST (numbered; worker fixes, reviewer re-checks)
1. **Raw «{Xung}» / «{xung}» on screen for the whole `off` role (56 options, the largest group)** — dev/build/jroad.js:159–186 rdHpWho has no `case "off"`, so P.sp = null and rdHpLine (jroad.js:194–196) skips kSay; RDHPL.off full/half/no (jrdhp.js, `off:{…}`) keep the tokens. Seen in the built game: «Vị quan ấy nhận lời: «{Xung} sẽ làm cho đến nơi.»», «…phép triều đình, {xung} không dám.» Fix the FAMILY: give `off` a speaker (e.g. `{role:"x",rw:"quan"}` as `doc` → «vi thần … tiểu chủ/nương nương»), and in rdHpLine fall back to a role speaker whenever a line holds {goi}/{xung} and P.sp is null. Scan (roadhp-scan or unit): for EVERY tag role, build the real helper with rdHpWho and render all 5 lines via rdHpLine at two ranks; FAIL on any leftover `{` or empty name. (The current scan only reads the source strings, so it passed this.)
2. **Wrong person on `off` tags (right-person rule)** — non-officials tagged `off` get the card label «Vị quan ấy» (jroad.js:198) and the line «Việc này phải theo phép triều đình»: jrdhp.js:90 «thầy kiện», :99 «thầy kiện», :109 «thợ cung», :112 «đội trưởng canh phòng», :149 «ông chép lại», :174 «lái buôn», :176 «trạm dịch quân», :178 «đoàn quân lương», :209 «học trò của cha» (scan the whole `off` list; envoys / sứ quán / phó tướng may stay `off` only if their line fits). Retag to `go` (or add one plain non-official type with its own 5 lines, no shared sentence), before/after table in the report.
3. **Empty helper → broken line** — when the person is missing, `mis` renders «: «Chuyện của {goi} cũng là chuyện của {xung}…»» and `foe` «Lần này  nể mặt…» (jroad.js:163 `mis`, :180 `foe`; rdHpLine :194). The options carry {mis}/{foe} so they likely only show with a person, but make it safe for the family: no person/name → use the `go` line set and label (and the go weights). Covered by the render scan of fix 1.
4. **iPad answer shot not forced** — dev/test/roadhp-shots.js:30 sets only `H.w[role]=[0,0,100,0]`; nết / liking / own road / nợ ân still add weight, so on iPad Thái hậu (Sẵn lòng) did not refuse and shot 2 shows the chapter result card instead of an answer line. Zero tr/aff/rdRiv/owe/tcSab as roadhp-unit's force() does, re-shoot both devices, LOOK, report.
5. Rebase on newest origin/main (2850c45) and rebuild index.html / sw.js; re-run roadhp-scan + roadhp-unit + quickcheck.

## Notes (not blocking)
- Phá ngầm is told at once in the answer line; the audit's delayed hidden-truth reveal can come with Q2 npcTell (worker already flags it).
- Only options whose label holds «nhờ» are tagged (brief scope). Asks worded «Xin Thái hậu…», «Cầu…» stay untagged — a later family pass if the owner wants every ask to a person to answer.
- Word «Không ưa» for Hoàng thượng / Thái hậu reads a bit flat; fine by VANPHONG.

Shots: local scratch only (/home/user/wt/q3r-shots), deleted with this verdict; CDN not used; no images in git.

---
# ROUND 2 — REVIEW questline-q3 18f638ed — FAIL (reviewer E9r2, Foreman E)
PRIORITY #1 CHECK ('Q3 helper answers'): OD L1876 (D-Q1 = 1) | main none (origin/main now 13e2b83, no RDHP) | review/* review/questline-q3 (this), review/questline-q1-land (trial-merged, below) | claims E9 only. START_CTX ≈ 4 %.
Base 711d7ba (ancestor OK). origin/main moved to 13e2b83: merge-tree conflicts only in built index.html / sw.js.

## Round-1 fixes, as a family
| # | Check | Result |
|---|---|---|
| 1 | raw {…} | roadhp-scan (5) RENDER: 4 320 lines (216 tags × 5 × rank 1/6 × cast/no cast) PASS. My own dump: 60 lines, every role × ranks 1/4/8 × all 5 kinds — 0 leftover tokens, 0 empty names. `off` = «Vi thần …» at every rank; th «ai gia … Đáp ứng / Hoàng hậu», hh «bổn cung … Thường tại», eun/maid «nô tài/nô tỳ … tiểu chủ / nương nương», emp «trẫm … nàng», man by profession («vi thần» nhạc sư, «nô tài» thị vệ). No %, no digit, no deadline word. No sentence shared across types (scan + read). OK |
| 2 | tags right role | 18 retags read against option text: {pa} → bro, đồng liêu cũ → srv, người đủ cao → go, thầy kiện / thợ cung / lái buôn / trạm dịch quân / đoàn quân lương / đội trưởng / ông chép → dan: OK. **FAIL item 1: the 4 «phu nhân Thượng thư Lễ bộ» + «sĩ lâm» in `dan`.** Sample of 32 other tags (tt, dtq, muoi, cn, nc, bd, td, ch, thd, cnv): right role; notes below. |
| 3 | empty helper in play | real res67 on an open hồi (tt_oan_8:t1:1 retagged in-page to mis / man / v / foe / n1 with no person / no name, each answer forced): card «Người được nhờ: Không rõ; …», answer line from the go set, refusal keeps the hồi (A.rq), 0 page errors. OK |
| 4 | shots (LOOKED, --no-net, scratch only) | Fold 755x1000@2: card «Nhờ Thái hậu nói một lời» Gợi ý «Thái hậu: Sẵn lòng; chẳng được gì»; answer shot «Từ chối: Thái hậu khép mắt: «Ai gia già rồi, chuyện ấy Quý nhân tự liệu lấy.»», option gone, Sức 75→72. iPad 1180x820@2: «Thái hậu: Không ưa; …»; answer shot now shows the line «… Đáp ứng tự liệu lấy.», option gone, Sức 75→72. No overflow, no cut text. OK |
| — | no regression | engine / odds / BAL (roadhp-unit ALL ok incl. half=33 read, cold 42 vs warm 0) · kit (hint override, no new CSS) · no-ask road (203/203 hồi keep a free option) · old save + co-op (unit f/e) · quickcheck PASS 157 s, old save ok, core gates PASS, render 196/202 ms. Trial merge onto review/questline-q1-land c0d48ad (assemble.py: + jrdhp.js), rebuilt: nrask-scan ALL PASS · nrask-m-scan PASS · nrask-engine ALL PASS · roadhp-scan PASS · roadhp-unit PASS. OK |

## FIX LIST (round 2)
1. **Wrong person in the new `dan` voice (right-person family, round-1 item 2 not closed).** dan lines say «nhận tiền công», «rụt rè thưa rằng phận nhỏ, chuyện trong cung không dám dây vào», «ở quán trà ngoài phố» — right for thầy kiện / lái buôn / quân trạm dịch, wrong for a high lady and a whole literati body: jrdhp.js:137,138,146,147 «Nhờ phu nhân Thượng thư Lễ bộ chuyển lời» (a Minister's wife, «Người ấy … phận nhỏ … tiền công») and :214 «Nhờ sĩ lâm dâng sớ xin tha» (a body, not «Người ấy», not paid). Fix the family: either give these their own fitting set (e.g. a «quý phu nhân» / «sĩ lâm» type, 5 own lines, no shared sentence) or make the dan lines neutral (no wage / «phận nhỏ» / street-tea-house words) and check all 14 dan option texts against the 5 lines; before/after table. (thd_sach_8 «học trò của cha chép» + «tiền công» is also off; covered by the same pass.)
2. Rebase on origin/main 13e2b83 (only built index.html / sw.js conflict → rebuild), re-run roadhp-scan + roadhp-unit + quickcheck.

## Notes (not blocking)
- fam holds «người quen» (td_an_8:s2:1) and «người đồng hương» (cnv_mat_10:c1:1) under the label «Người nhà»; thế giao is by the file's own design. Worth moving the first two to `dan` in the same pass.
- ch_benh:c1:0 «nhờ lương y xem» → doc label «Thái y»; fine if the lương y is in the palace.
- n1 fallback name «Hàn lâm học trò của cha» comes from the road files (jrd_thd cast), not this branch.

Shots: local scratch only (/home/user/wt/q3r2-scr), deleted with this verdict; CDN not used; no images in git.

---
# ROUND 3 — REVIEW questline-q3 dcc822b1 — PASS (reviewer E9r3, Foreman E)
PRIORITY #1 CHECK ('Q3 helper answers'): OD L1876 | review/questline-q3 under review | claims E9 only. Delta only vs 8d1ea64 (round-2 base).

| # | Check | Result |
|---|---|---|
| 1 | new type `si` («Vị ấy», 5 own lines) | 6 tags moved dan → si: phu nhân Thượng thư Lễ bộ ×4 (nc_vuong_6:s2:2, nc_vuong_9:c1:1, bd_hoang_6:s2:2, bd_hoang_9:c1:1), thd_sach_8:c1:2 (học trò của cha chép), thd_sach_11:s2:2 (sĩ lâm). Lines read: «nể tình nhận lời», «nhận lời cho phải phép, rồi chỉ làm lấy lệ», «khéo léo từ chối… không tiện ra mặt», «nhắc chuyện ngươi nhờ giữa buổi tiệc». No wage / phận nhỏ / street words; cổ trang; {ri} only; no %, no digit, no deadline. jroad.js label `si:"Vị ấy"`, jbal2 weights `si:[40,30,25,5]` + type map `si:"si"`. OK |
| 2 | 8 remaining dan | thầy kiện ×2, thợ cung, đội trưởng canh phòng, ông chép lại, lái buôn, trạm dịch quân, đoàn quân lương. Lines now neutral: «nhận lời, làm việc chu đáo», «nhận lời rồi làm qua quýt», «phận mình nhỏ mọn, việc lớn như thế không dám dây vào», «đem chuyện bán cho {ri}», «kể chuyện ngươi nhờ với kẻ quen». «tiền công» / «trong cung» / «quán trà» gone; fit all 8. OK |
| 3 | accidental tag changes | diff 8d1ea64..dcc822b: only the 6 si tags; no other RDHP key touched. OK |
| 4 | tests | roadhp-scan PASS (216 tags, 4 320 rendered lines, no shared sentence, si 6 / dan 8) · roadhp-unit PASS · quickcheck PASS 150 s, old save ok, core gates PASS |
| 5 | shot (LOOKED) | Fold 755x1000@2, answer shot: «Từ chối: Vị ấy khéo léo từ chối, nói việc ấy không tiện ra mặt.», option gone, Gợi ý row «Vị ấy: Sẵn lòng», no overflow, no cut text. (Hồi was a Thái hậu card retagged to si in-page, scratch only; images blank because --no-net.) OK |

Notes (not blocking): td_an_8:s2:1 «người quen» + cnv_mat_10:c1:1 «người đồng hương» still `fam` (round-2 note). Scratch shots in the session scratchpad, not in git.

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

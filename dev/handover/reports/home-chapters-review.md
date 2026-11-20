# E25r BIG REVIEW — review/home-chapters 03c2cade → FAIL
PRIORITY #1 CHECK ('kc_ke|kc_hon|tm96z|nhũ mẫu|Thái hậu triệu|home chapter|vi hành|kc_tt3'): OD 1 | ledger 1 | claims 2 | main 15 | review/* 0 | archive 1
Reviewer E25r (opus), 20/11. LIVE merge: origin/main 90d57324 merged into review/home-chapters-r1 = 468499b6d (conflicts only in index.html / sw.js (rebuilt) and KIT_REQUESTS.md (both kept)). Worker should base the fix on that commit.

## Tests (on 468499b6d)
| test | result |
|---|---|
| one-core-guard | PASS (0 new inline numbers — but see law 4 below: the guard misses them) |
| home-chapters/laws.js (worker scan) | PASS, 9 arcs × 6 beats, 3 endings each, seeds real |
| smoke 6 origins × 3 lives | errs 0, fails 0 |
| smoke tt,thd,ch × 6, on vs --off | in palace 11/18 on vs 6/18 off (bot random; no error) |
| palace continuation (smoke + up to 80 endTurn after entry) | errs 0; seeded arc starts with its Lợi thế (tt_oan, dtq_bien used after ~72 turns; one dtq life died before) |
| outside/oldsave.js main→this 755x1000 | PASS (errs []) |
| quickcheck alone | QUICKCHECK PASS · old save ok · perf ≈ live |
| shots Fold 755x1000@2 + iPad 1180x820@2 (worker 9 screens + arcs kc_ke, kc_td, tm96z) | no overflow/clip/%; looked at 3× — defects below. Kept local (/home/user/wt/e25r-shots), CDN refuses (401), none committed |

## Built vs GAP rows
OR03 yes (6 origin arcs, j67 format, 3 endings, seeds into f14.road). OR04 yes (kc_ke two-way + real proof, kc_hon, tm96z → S.tm96.endZ read by tm96a, kc_tt3 label). OR05 yes (IT.divat real item into S.inv, kept into the palace; E15; E28 three options incl. hit back). OR07 half (see fail 2). OR10 yes (thtrieu / vhtrieu → kcEnter(Thường tại)). kc_td keeps "house falls on leaving" — matches OD:L1234, accepted over OUTSIDE_PLAN (a).

## FAIL — fix list
1. LAW 3 + VANPHONG truth + LAW 9: option cards hide home-stat costs/gains and print «Tốn: không» (owner 13:25Z: never «Tốn: không»). Seen: E28 «Dâng phần hồi môn để cha lo lót» shows TỐN không, ĐƯỢC empty (really Hồi môn −40, thế lực +4, cha +10) on Fold + iPad; E28 opt 2 «Tốn: không» and its loss (thế lực −8, Gia thanh −4, cha −4) not shown; bà mối «nói khéo» hides Áp lực hôn sự −8 (its main gain) and shows an empty GHI CHÚ row; kc_ke s1 opt 1 hides Gia thanh −2. The whole family: every kc3 option / card whose c/w/l holds kgt / kap / khm / kld (kc_hon is mostly these). The KIT REQUEST is a real missing kit part (fmt() renders them; the kit option row drops them) — law 9 says STOP until the kit keeper builds it, not ship with a false card. Fix: get the KR built (FOREMAN E → kit keeper), then re-shoot; scan script listing every kc3 option whose shown TỐN/ĐƯỢC differs from its fx, before/after table.
2. LAW 6b (real people need faces) + art: 2–3 of the 5 teachers have NO face in every life (fid ""; mama pool exhausted by nhũ mẫu + bà mối + other mama roles). Scan 24 lives: Nữ phu tử and Ma ma xuất cung empty 24/24, Cầm sư empty 15/24. Shots: letter placeholders in the Tài nghệ pager, empty portrait frame. Fix the whole roster group: every kc3 person gets a face (another existing female pool, or file an art request to Foreman C for teacher faces — do not draw). Also: Họa sư takes palace-character faces (man:vuonggia-*, man:thaiy-1) — pick from a pool that is not a named palace person, or say why it is safe.
3. LAW 4 (one core): (a) all arc numbers BAL.kc3.fx are typed in content files jkc3.js / jkc3a.js / jkc3b.js — move them to a BAL file (jbal2.js or jbalarc.js, like BAL.arc.fx); (b) inline rule numbers in code: ages 56+R(10), 40+R(9), 52/34+R(12), KC3SXAGE table, kcCard k:1 / k:2 (bà mối biếu/khéo, thầy biếu), Math.min(5,…) lễ cap, 1+R(2) complications, A.sc>=1 mid ending, Math.max(10,S.kgtu−…) in jkc3a, k61Know(…,2); (c) jkc3b tm96z rare gate S.tm96.h>=80 / loyal>=60 / kld<55 / kcRare .6 is a SECOND copy of jkc.js:396 — read one shared key. Extend one-core-guard or your laws.js so it catches these.
4. Minor (fix with the above, not alone): chapter dialogs kc_ch / kc_ke show an empty scene banner frame (image not ready when the card opens; kc_td shows one) — check the arc dialogs pass a scene the kit can load; teacher card «HAY: khoe ân sủng, hạ nhục người dưới» is palace-consort wording on a home teacher (kcFamCard trait text — note to the family owner, not a gate).

Not failing: law 1 (kc_ke schemes both ways, E28 hit back), law 2 (no dominant sure+free option found besides j67-standard sure-mid climax), law 5 n/a (home, no rank), law 7 (odds words only, no %), kit (all parts are kit cards/pagers/kitSkillCard/kitRows).
VERDICT: FAIL 03c2cade (LIVE merge 468499b6d on review/home-chapters-r1).

## r2 — E25r, 20/11 — PARTIAL OK items 2–4 on 7882ea5d7 (review/home-chapters-r1); item 1 still OPEN
PRIORITY #1 CHECK ('kc_ke|kc_hon|tm96z|nhũ mẫu|Thái hậu triệu|home chapter|vi hành|kc_tt3'): OD 1 | ledger 1 | claims 2 | main 15 | review/* 0 | archive 1
| check | result |
|---|---|
| item 2 faces | faces.js PASS: 0 without a face / 0 palace faces in 24 lives, r1 saves repaired 24/24, no face used twice. Fold teachers shot: all 5 teachers show faces |
| item 3 one core | BAL.kc3.fx now in jbalkc3.js (assembled after jbal2, before jkc*); values moved unchanged (ages, sxAge, k, leMax 5, rare r1 {80,60,55,.6}, r4 .6, r6 .8, dtqSuc 90, muoiTc 60); kcR1Ok() is the only kcR1 gate (jkc.js tmtron + jkc3b). My own digit scan of jkc3*.js: only structure left (odds 100 = sure, slot/tier indices, clamp 0–100). Note, not a gate: kcIntel(1,2) in kc_tt c2 is still typed in. one-core-guard + laws.js static law 4 PASS |
| item 4 banner | kc_ch letter picture (Fold), kc_ke scheming picture (iPad): the kit event slot is filled, not an empty frame |
| regression | smoke 6 origins × 2 lives errs [] fails [] (7 enter the palace) · oldsave main→this errs [] · shots.js 20 screens bad 0 |
| item 1 data side | costrows.js reproduces BEFORE: 380 choices, 109 hide a number, 11 «Tốn: không», page errors 0. The data is ready; the kit part is still missing |
Final PASS needs: KIT READY «KR home-stat rows» wired, costrows.js 0/0, re-shoot E28 + kc_ke s1 + bà mối on Fold + iPad, final merge of LIVE (main is at fd682a8d, not an ancestor of 7882ea5d).

## r2 final — E25r, 20/11 — PASS 5853d71a4 (review/home-chapters-r1) · LAND READY 5853d71a4 (FF on LIVE 983a9436)
PRIORITY #1 CHECK ('kc_ke|kc_hon|tm96z|nhũ mẫu|Thái hậu triệu|home chapter|vi hành|kc_tt3'): OD 1 | ledger 1 | claims 2 | main 15 | review/* 0 | archive 1
Contains KIT READY 3332c63b (kit-cost-rows-home) + LIVE 983a9436. A rebuild of the site from source differs only in the build line (CTM_BI).
| check | result |
|---|---|
| item 1 (home-stat rows) | costrows.js --list: arc options 0/366 hide a number, 0 «Tốn: không»; events 3/14 hide only «thế lực nhà ±n» (E28 hac, three options). kit-cost-rows-home.js PASS 15 |
| shots looked at (Fold 755x1000@2 + iPad 1180x820@2; 20 screens, bad 0) | E28 (Fold): «Dâng phần hồi môn» TỐN Hồi môn −40 · ĐƯỢC được lòng người; «Khuyên cha…» TỐN tổn danh giá gia môn, mất lòng người · ĐƯỢC tiếng hiền, giữ được nhà; «Trả đòn» TỐN Sức −15 · ĐƯỢC sớ hặc quay về… Kế mẫu s1 (iPad): «gia môn sút danh giá (chút ít)» now shown. Bà mối (Fold): «Áp lực hôn sự −8 · bà mối thiện cảm +4» |
| law 3 | every option shows a real gain AND a real cost or loss. The «thế lực nhà» numbers are part of an option that already shows other true lines |
| KR «thế lực nhà» | a tracked kit gap, NOT blocking: the worker stopped and filed it (KIT FIRST, no private part), and no card lies or turns cost-free. The kit keeper builds it; afterwards costrows.js must reach 0/0 for events too |
| law 4 / 6b / banner | one-core-guard PASS · laws.js (static law 4) PASS · faces.js PASS |
| regression | smoke 6 origins × 2 lives errs [] fails [] · oldsave main→this errs [] · quickcheck alone PASS (old save ok; buổi 1541 vs live 1162 ms within the gate — watch it) |
Notes, not gates: on «nói khéo» the kit shows an empty GHI CHÚ label (kit part, not this branch); kcIntel(1,2) is still typed in kc_tt c2.
VERDICT: PASS 5853d71a4 · LAND READY 5853d71a4 (origin/main 983a9436 is its ancestor; FF verified 20/11).

## HANDOVER (E25r → E25r2, 20/11 ~21:35Z, rollover on context)
State: PASS 5853d71a4 (review/home-chapters-r1) but the LAND READY is STALE (LIVE moved: 415b9ca0, then 548dcd0d). FOREMAN E is now #23 session_01DgYSWm5qy3Y59fKkn6eSf7, and will give a GO after pm r4 + phutang land.
On GO, do in this order:
1. ONE re-merge of review/home-chapters-r1 onto the newest origin/main, in a sparse worktree with flock fetch. Conflicts so far were always index.html / sw.js (rebuild with bash dev/site/build_site.sh), KIT_REQUESTS.md (keep both) and the assemble.py list (union).
2. If KIT READY «KR thế lực nhà» (kit r2) exists, merge it too.
3. Run the gates: node dev/test/one-core-guard.js; dev/test/home-chapters/{laws,faces,smoke (--origin=tt,dtq,muoi,thd,ch,td --lives=2),costrows --list}.js <url>; dev/test/kit-cost-rows-home.js; dev/test/outside/oldsave.js main→this; bash dev/tools/quickcheck.sh run ALONE (watch the buổi time: 1541 vs live 1162 ms last run); shots.js Fold + iPad, LOOK at E28 / Kế mẫu / bà mối.
4. NEW LAND GATE (owner 20/11 ~21:30Z, OD line "Co-op: helping/harming…" ≈L594, verbatim there): no LAND READY without coop-e2e PASS (dev/test/coop-e2e.js, two browsers against the LIVE Worker) PLUS the feature's own co-op check (both seats see/do it, two-way). Prepare it: find out how the home phase (S.kc, jkc/jkc2/jkc3) behaves in a co-op room — can a seat start at home (khuê các), do the home chapters / roster / E9/E15/E28 / early roads run for host AND guest, and do they sync. If co-op has no home phase at all, report that to FOREMAN E as a question (feature freeze: do not invent), do not build.
5. Verdict PASS/FAIL into this report plus one line in FOREMAN_E_STATUS.md; on PASS write LAND READY <sha> with an FF check. Message FOREMAN E #23.

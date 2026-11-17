PRIORITY #1 CHECK ('allergy|dị ứng'): OD 2 | ledger 5 | claims 8 | main 15 | review/* 0; chapter goals = BAL.st14 (live, jst14) → tuned existing keys; her allergy reuses jrcp (rcpProf / RCP_AL / rcpAllergy) + jrash, no second system. kc2val: extended the existing bot (review-oi-r1 F1).
# CH1–4 GOALS + HER ALLERGY (+ kc2val F1) — worker D8 ch14-goals (opus), 17/11
START_CTX ≈ 3 % of the 1M window (get_session read 0; own estimate). Ended well under START_CTX + 25 %: no rollover.
Branches: **review/ch14-goals @c98fe27e73d0f640990d315ac172688408f00ccc** (from live main 6c4f21c3 + review/story-bot merged) · **review/kc2val-home @176f337f996aa8ab0d70e6383ced684b25c80abe** (on review/batch-0032-oi-r1 @36f86d3a, as Foreman D asked; kept apart so the ch1–4 measure base stays live main).

## 1–3. Chapter 1–3 goals (BAL.st14 only; texts print the constants)
| key | was | now | why (story bot) |
|---|---|---|---|
| goal.rel (ch3 «Học quy củ» kết thân) | 30 | **20** | ch3 36 % → 57 %. 15 measured no better (55 %): see «ch3 limit» |
| goal.nt (cnv ch2 «Lọt vào mắt Hoàng thượng») | 25 | **14** | cnv ch2 1/28 → 14/30; 16 gave 12/31, 12 gave 30/30 (trivial) |
| lim.nhapHi + lim.hiR (new) | – | **9 months for entry rank ≥ 3** (nc enters as Tần) | nc ch1 4/29 → 24/31; text «qua chín tháng» via f14NhapL() |
| goal.tin (cnv ch1) | 60 | 60 (kept) | 85 measured: still done in 1–2 months, so no change |
Code: jst14.js f14NhapL(m) (limit by her entry rank m.r0), jbal.js keys + comment. Story bot: 2 shards × 158 lives, CHSTOP=4, every origin × Dễ/Vừa/Khó (≥9 lives per cell).

**Before (P1, story-bot report, 281 lives, base 7abaf07a) → final (316 lives, this branch):** ch1 66 % → **83 %** · ch2 89 % → **94 %** · ch3 36 % → **57 %**.
| origin | diff | lives P1/final | ch1 P1 → final | ch2 P1 → final | ch3 P1 → final |
|---|---|---|---|---|---|
| tt | de | ~10/11 | 7/9 → 6/11 | 9/9 → 11/11 | 3/9 → 4/11 |
| tt | vua | ~10/11 | 5/9 → 9/11 | 9/9 → 11/11 | 4/9 → 4/10 |
| tt | kho | ~10/10 | 4/10 → 10/10 | 10/10 → 10/10 | 0/9 → 4/10 |
| dtq | de | ~10/11 | 7/9 → 7/11 | 9/9 → 11/11 | 3/9 → 8/11 |
| dtq | vua | ~10/11 | 5/9 → 10/11 | 9/9 → 11/11 | 0/8 → 7/11 |
| dtq | kho | ~10/10 | 7/10 → 8/10 | 10/10 → 10/10 | 3/10 → 6/10 |
| muoi | de | ~10/11 | 3/9 → 9/11 | 9/9 → 11/11 | 5/9 → 4/11 |
| muoi | vua | ~10/11 | 7/9 → 11/11 | 9/9 → 11/11 | 2/8 → 6/11 |
| muoi | kho | ~10/10 | 9/10 → 9/10 | 10/10 → 9/9 | 3/9 → 4/9 |
| cn | de | ~10/11 | 9/9 → 7/11 | 9/9 → 11/11 | 7/9 → 9/11 |
| cn | vua | ~10/11 | 7/9 → 10/11 | 9/9 → 11/11 | 4/8 → 8/11 |
| cn | kho | ~10/10 | 8/10 → 9/10 | 10/10 → 10/10 | 5/10 → 9/10 |
| nc | de | ~10/11 | 1/9 → 8/11 | 9/9 → 11/11 | 4/9 → 6/11 |
| nc | vua | ~10/11 | 2/10 → 9/11 | 10/10 → 11/11 | 3/10 → 7/11 |
| nc | kho | ~10/10 | 1/10 → 7/9 | 10/10 → 9/9 | 5/10 → 4/9 |
| bd | de | ~10/11 | - → 7/11 | - → 11/11 | - → 6/11 |
| bd | vua | ~10/10 | - → 5/10 | - → 10/10 | - → 4/9 |
| bd | kho | ~10/10 | - → 8/10 | - → 10/10 | - → 4/10 |
| td | de | ~10/11 | 7/8 → 8/11 | 8/8 → 11/11 | 6/8 → 7/11 |
| td | vua | ~10/10 | 5/10 → 9/10 | 10/10 → 10/10 | 5/10 → 6/10 |
| td | kho | ~10/10 | 7/10 → 10/10 | 10/10 → 10/10 | 3/9 → 9/10 |
| ch | de | ~10/12 | 3/9 → 10/12 | 9/9 → 12/12 | 3/9 → 6/12 |
| ch | vua | ~10/10 | 8/10 → 9/10 | 10/10 → 10/10 | 2/9 → 5/10 |
| ch | kho | ~10/10 | 7/9 → 9/10 | 9/9 → 10/10 | 4/9 → 5/9 |
| thd | de | ~10/11 | 8/9 → 8/11 | 9/9 → 11/11 | 5/8 → 7/11 |
| thd | vua | ~10/10 | 7/10 → 9/9 | 10/10 → 9/9 | 1/10 → 2/8 |
| thd | kho | ~10/10 | 5/9 → 10/10 | 9/9 → 10/10 | 3/9 → 5/10 |
| cnv | de | ~10/11 | 9/9 → 11/11 | 0/9 → 3/11 | 4/9 → 9/11 |
| cnv | vua | ~10/10 | 10/10 → 10/10 | 1/10 → 5/10 | 1/10 → 6/10 |
| cnv | kho | ~10/10 | 9/9 → 10/10 | 0/9 → 6/9 | 1/8 → 6/9 |
(P1 bd shows "-": bd had no chapters then (story-bot fault 1); live main now runs bd chapters. Cells ≈10 lives: ±15 pts each; totals are firm.)
Intermediate runs (315 lives each, same harness): rel 20 / nt 16: ch3 56 %, cnv ch2 12/31 · rel 15 / nt 12 / tin 85: ch3 55 %, cnv ch2 30/30, cnv ch1 still 100 %.

**Family findings I could NOT fix with BAL.st14 (need the coordinator's routing):**
- **ch3 limit (~57 %)**: logged each consort's thiện cảm at ch3 close (instory). Every miss is a life where the WHOLE harem dislikes her (best thiện cảm toward her ≤ −5, often −30…−80); every hit has one consort ≥ 20 by month 1–4. So the threshold is not the lever; it is the Sủng-saturation → jealousy flow (story-bot fault 2). Also a BOT gap: the tutorial follower's «kết thân» push never fired (0 times: unknown consorts show no gift/ally button until met, j61) — a real goal-following player would do better than 57 %.
- **ch2 «Lần đầu được sủng» (consorts) is done in month 1 in every life (99–100 % every cell)** and **cnv ch1 (Chủ tin 60) in month 1–2 (100 %)**: Sủng / Chủ tin saturate (fault 2 family); no goal value ≤ the cap changes that. Fix belongs with the Sủng/Chủ tin flow, then re-run `ch14cmp.py`.
- cnv ch3 6–9/10 now (was 1–4/9).

## 4. Her own allergy (S4-allergy / D39), two-way, reuses jrcp
- She has an allergy like everyone (rcpProf(S): same BAL.rcp.alP odds, same RCP_AL allergens). A gifted work holding it that she ACCEPTS (every way a gift reaches her chest: PEND.giftin «Nhận», PEND.pgin «Nhận ngay» / the kim bạc and maid-tasting paths that keep it) makes HER ill exactly like an NPC receiver: Sức −BAL.rcp.alSuc, the jrash rash (face overlay), she learns it; like an NPC receiver she may hold 1 evidence on the giver (BAL.rcp.alEv + hostility/2, moved from a typed 30 for both ways).
- Once known, the «Nhận» option says «kèm: ta kiêng …, nhận về dùng phải là nổi mẩn» and the dialog adds the line. Learnt also through «Hỏi thái y kiêng kỵ» (she is now listed: «Ta»).
- Family fix: NPC receivers of an allergen work now get the same jrash rash too (they only lost Sức before).
- Shown only with kit parts: the «Khẩu vị, kiêng kỵ» kitSkillCard / kitRows gets a first row «Ta» (unknown: «chưa rõ ta có kiêng thứ gì (hỏi thái y)»; known: red «kiêng hải sản (tôm, cá): nhận về dùng phải là nổi mẩn»). VANPHONG: no %, cổ trang.
- Test: dev/test/her-allergy.js (food + flower paths, non-allergen does nothing, warning once known, NPC rash, thái y list) PASS.

## 5. kc2val F1 (Foreman D add-on, OD:L1288)
kc2val.js home bot now self-studies like main's palace bot: async «Tự học» (lowest art) + Tứ đức self-study at Sức ≥ 60; handles the kit minigame (#kg82ok/#kg82skip) and the «dùng vật liệu gì?» dialog; NOSELF=1 turns self-study off in BOTH arms. (First try stuck 16 s per study on #kg82 → fixed; each study now < 1 s and always progresses.)
| arms (SEED 61/62/63 × 6 lives per arm) | cnv gap home − palace | nc gap |
|---|---|---|
| reviewer: palace self-study only | −71 (±21) | −219 (±16) |
| reviewer: both off | −19 (±25) | +12 (±17) |
| **both self-study (this), BAL.kcv as live** | **−3 (±22)** seeds 14/−40/17 | **−193 (±13)** seeds −183/−200/−195 |
| **both self-study, BAL.kcv.nc retuned** | (unchanged row) | **−63 (±15)** seeds −74/−22/−80 |
nc breakdown (palace − home, V points): rank 22, Sủng 61, Danh 55, Tư chất 36, tài nghệ 34. Retune (BAL.kcv only): nc dn 8→45, sung 10→45, st 3→14, kn 6→8, art 1→3 → home Danh 83 / Sủng 81 at entry. Stopped there: the rest is the palace rank step (Phi seat) a home road cannot carry + the palace arm's Sủng/Danh saturation (fault 2). **Re-measure nc after fault 2** (the carry may then be too high). cnv: no change needed.

## Gates
| gate | ch14-goals | kc2val-home |
|---|---|---|
| one-core-guard | 0 fails | 0 fails |
| quickcheck | PASS (render 355/349, tab 328/345, buổi 1030/1221 ms; old save ok) | PASS (render 177/285, buổi 770/970; old save ok) |
| her-allergy.js | PASS | – |
| coop-e2e (live Worker) | 60/60 (= live) | not run (no game rule change besides kcv numbers) |
| Fold 755x1000@2 + iPad 1180x820@2 shots, LOOKED at | goal card (thiện cảm 20) + taste card «Ta» row: no overlap, no h-overflow | – |
Shots: CDN img/_review/ch14-goals/ (fold-goal, fold-allergy, ipad-goal, ipad-allergy .webp). Note: the goal shot was forced to «Học quy củ» with msStart67, so it says «Chương 2». Pre-existing (also on live main, not touched): on iPad the «Sai cung nữ dò la khẩu vị» kitSkillCard in the taste card wraps its title one letter per line (kit keeper item).

SẴN SÀNG KIỂM c98fe27e73d0f640990d315ac172688408f00ccc
SẴN SÀNG KIỂM (kc2val-home) 176f337f996aa8ab0d70e6383ced684b25c80abe

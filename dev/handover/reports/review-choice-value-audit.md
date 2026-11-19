PRIORITY #1 CHECK ('choice-value-audit'): OD L582 + L1877 (owner 18/11 ~09:20Z) | ledger 0 | claims D row (this job) | main 0 (scan not on main) | review/* review/choice-value-audit (under review) | OD 'cứu giá / Hoảng sợ đứng nhìn' 0 hits
START_CTX ≈ 5 % of 1M (get_session reads 0; estimate) → rollover 30 %, ceiling 60 %. Finished at ≈ 18 %.

# REVIEW choice-value-audit (BIG, opus) — reviewer session_01964izCKF6xwyyBiCxwhjra, for Foreman D #3
Reviewed: review/choice-value-audit @84ca6625 (worker #2 session_01964izCU5vXM4nLAiNKfjgz). Live = origin/main e16e1d66 (moved past the merged 790cda59).

## VERDICT: FAIL 5 @84ca6625

Laws checked: 2 EQUAL-VALUE, 3 GAIN-AND-LOSS (the job), 4 ONE CORE, 7 cổ trang wording, 11 whole group, 16 never undo a rule, 1 two-way.

### FAIL list (for the worker)
1. **LAW 3, the owner's own family (Hoàng thượng night / summons decline) is still cost-only on the branch** — whole group not done:
   - a. `dev/build/j8.js:305` PEND.ksp (Hoàng thượng lật thẻ) «Cáo bệnh»: Tốn Sủng −2 · Ân tình −2; the only «Được» line is «nhường đêm» — giving up the night is the loss, not a gain. The scan SAW this card (pend:ksp) and passed it (item 2a).
   - b. `dev/build/jagmaid.js:92` PEND.amNight (cung nữ road, same night summons) «Cáo bệnh»: Sủng −D.decline, «nhường đêm; Hoàng thượng để ý −N» — same fault.
   - c. `dev/build/jts.js:297` «Hoàng thượng triệu <nơi>» panel «Cáo bệnh»: Mất Sủng only, no Được. Never reached by the scan (0 «Hoàng thượng triệu» modals in 100 turns seed 7, branch AND live).
   - d. `dev/build/jworld.js:118` world event (chosen to follow the Emperor's trip) «Cáo bệnh ở lại»: Danh −stayDanh only; also strictly worse than the free «Theo hầu ngự giá» (Sủng +folSung) → law 2 too. Not reached by the scan.
   - e. `dev/build/jcmaid.js:58` PEND.cmTt «Dặn <maid> chỉ viết chuyện vặt»: Lòng −ttLoy, Bạc −ttBac; the green «Được» words are losses («cha giận, tháng này không gửi bạc vào cung»). Its real gain (she does not spy on the Emperor, keeps Sủng) is not shown.
   The fix must follow the family already used (e.g. Sức +BAL.cv.rest for «Cáo bệnh», or another BAL gain MAIN prefers), then re-scan.
2. **The scan gate has two holes** (law 11: the gate is what keeps the whole group fixed):
   - a. Any green word under «Được» counts as a gain, even a loss word. Plant test on the branch: cost-only `{fx:{bac:-10}}` → COST-ONLY ✔, dominated `{bac:-10,duc:2}` vs `{bac:-10,duc:3}` → DOMINATED ✔, but `{fx:{sung:-2},x:"nhường đêm"}` → PASS ✗. Fix: a word-only gain must not clear a cost by itself — keep a reviewed allow-list of word gains (or a loss-word list: nhường, giận, mất, không gửi, bị phạt…) and print every cost + word-only-gain option in the report as a hand-check table (seed 7 branch has ~50 such rows, most are real gains: «giữ được nhân chứng», «cha thoát nạn», shop items…).
   - b. Coverage: 100 end-of-turn passes from a fresh low-rank start never reach rank-/condition-gated cards (Hoàng thượng triệu tsPanel, world-event cards like the trip, most MF7 merits). Drive those builders directly like PEND (tsPanel callers, WORLD card(w), MF7 / FV7 builders with forced pp), or add a static gate over `tsOpt({…mat…})` / `{n,fx,x}` literals with no Được.
3. **Card regressions made by the branch (jstip)**, seen in the scan's own card rows (seed 7, turn 2/14/59):
   - a. «Nhịn» (bớt xén stipend): «tháng sau dễ bị bớt xén nữa» (a risk) now shows GREEN under Được (on live it sat on the Kèm line after «không được không mất»).
   - b. «Tố lên Hoàng hậu / Thái hậu»: «Thái giám <X> bị phạt» (her gain) now shows RED on the Kèm line (the reorder pushed it out of «thành:»). Keep both inside the «thành:» segment.
4. **LAW 4 on lines this branch rewrote** (one-core gates pass because these are old, but the brief says numbers only in BAL and the line was touched): `j7.js` newgirl «tân nhân thiện cảm +20 / −10» + newGirl(20)/newGirl(−10) typed (the bạc beside it moved to BAL.cv.newgirl); `j7.js` guardrumour «Đút bạc» bac:−40; `j71.js` contest tutor bac:−20 (fInv7) / bac:−30 (j71x); `j24.js` loan «chanceW(40)». Move them to BAL (BAL.cv or the existing eff group).
5. **Report claim to correct**: «the owner's example is a TEST FIXTURE, not game content» — the literal words are fixture-only (0 hits for «lui về cung» in index.html), but the same choice (decline the Emperor's night, pay, gain nothing) is live game content (1a/1b/1c). The report must not tell MAIN the example was only a fixture.

### Checks that PASS
- Scan on branch (built 84ca6625, seed 7, 100 turns): **PASS** · 152 option modals · COST-ONLY 0 · HINT-NO-GAIN 0 · DOMINATED 0 · exempt 8 · 0 page errors.
- Scan on live e16e1d66 (seed 7, 100 turns): **FAIL** with real rows · 149 modals · COST-ONLY 53 · HINT-NO-GAIN 8 · DOMINATED 12 (td1 «Mặc kệ», Vu Lan «Thả đèn», «Bớt lễ nghĩa», Tân quân «mài mực», Phụ tuyến «Khéo từ chối», Hội phối đồ «Cáo bệnh, không dự»… — not only the fixture).
- Plant test: cost-only + dominated plants caught (exit 1); loss-word plant missed (FAIL 2a). Plants reverted, nothing committed.
- one-core-guard / one-core-text / one-core-bind / one-core-text-rule: PASS. odds-cap: PASS. (coregates.sh as a whole hit my 600 s timeout; its one-core parts were run one by one.)
- Fixed rows read: gains are visible under Được, no %, cổ trang wording, numbers via BAL.cv in the new text; Vu Lan three roads and Tân quân c1a now read as equal value; contest tutor shown only when it lifts the odds word — fine.
- Exempt classes: knowledge (night1/vnight answers, «Chia sẻ bí mật» topics), bet (Đặt cược boats, payout follows true odds), ending (ge1/ge2) — justified. Look (vlout veils): the exemption text says «same cover», but tiers differ in cover (che được ít / khá kín) at higher price — still a fair price/quality ladder; reword the exemption note.
- Law 16 «Hoảng sợ đứng nhìn»: no OD / ledger line made it (it came with the original j71 commit 493011f5, worker design) → not a law-16 break; OWNER FLAG below.
- Law 1: cứu giá options are hers only (MF7 npc path uses its own `npc:` function); no shared NPC option list changed.

### NOT RUN (stopped at FAIL, to save the worker's next round)
coop-e2e, quickcheck --runs 6, old save, paired bot run, Fold 755x1000@2 / iPad 1180x820@2 shots, final merge onto newest main e16e1d66 + FF. The next review runs them all. No shots taken (nothing to wipe on the CDN).

## OWNER FLAGS (for MAIN, not decided by me)
1. «Hoảng sợ đứng nhìn» removed from Cứu giá (2 options left) instead of given a gain — no OD line made the option.
2. «giữ lại N lượng bạc» as the Được of the pick-your-loss family (Bớt lễ nghĩa, Chịu rét, Giữ than, Vẫn đi lại, Từ chối cho mượn / kẻ hầu, Làm ngơ thư lãnh cung, Bỏ mặc con tin, Mặc kệ nợ cung nữ, Tiếp đãi lạnh nhạt, Thôi không chuộc…): it changes no state, it names the sibling's price she does not pay. Law 3 reading of this needs MAIN's / the owner's yes.
3. New gains: Sức +BAL.cv.rest (3) for every decline / stay-away; Đức +BAL.cv.duc (1) for forbearance (Đứng yên when slapped, Nhịn, Đốt thư).
4. Exempt classes (knowledge / look / bet / ending) — law 2 reading needs MAIN's yes.

---
## RE-CHECK #2 (opus, fresh reviewer session_01964izCFKDiZx647iWyRiV8, for Foreman D #5) — reviewed review/choice-value-audit @7f339bad
PRIORITY #1 CHECK ('choice value'): OD 1 | ledger 0 | claims 1 (this job) | main 0 | review/* review/choice-value-audit 7f339bad (under review) | archive 0
START_CTX ≈ 5 % of 1M (get_session reads 0; estimate) · depth 6 · finished ≈ 20 %.
Verdict branch review/choice-value-audit-rv @ca3d43a3 = 7f339bad + origin/main bb8e8ec9 merged (only index.html / sw.js conflicted → regenerated by assemble.py + build_site.sh). All gates below ran on ca3d43a3. LIVE has since moved to b1c3631e → the next round merges that.

### VERDICT: FAIL 2 @7f339bad (gates all PASS; two law faults left on the branch's own lines)
Laws checked: 2 EQUAL-VALUE, 3 GAIN-AND-LOSS (the job), 4 ONE CORE, 7 cổ trang wording, 11 whole group, 16 never undo a rule, 1 two-way.

#### FAIL list (for the worker — small, mechanical)
1. **LAW 4 + LAW 11 — round-1 FAIL 4 fixed only on the 4 lines it named, not the whole group** («typed numbers on lines this branch rewrote»). Still typed on lines the branch rewrote (move each into BAL — BAL.cv or the module's existing BAL.eff group — and print the key in the text):
   - `j24.js:30` «Một ánh mắt»: «hắn tình ý +10 / -5» typed in text + `m.tinh+=10` / `m.tinh-5` (the «Đốt đi» option was rewritten).
   - `j3.js:68` vase: `hh:-5, danh:-3, maid:30` / `maid:-30, duc:-3`.
   - `j3.js:70` coldletter: `duc:5`, `v.rel+=20`, «Làm ngơ» `duc:-2`.
   - `j42.js:362` confess «Nhận tội, xin tha»: `tin:-6, suc:-8`.
   - `j7.js:32` «Tìm kẻ tung tin» `suc:-10`, `v.rel-=10`; `j7.js:36` «Rình bắt kẻ giả ma» `suc:-10`; `j7.js:37` ghost «Mặc kệ» `danh:-3, maid:-5`; `j7.js:88` foreignwed «Tiến cử một tông nữ» `bac:-50, danh:-2`; `j7.js:92/94` maidhostage `maid:25` / `maid:-35`; `j7.js:149` condemnedmaid «Không can dự» `duc:-1`.
   - `j71.js:142` «Không dâng lễ» `th:-2` / `sung:-2` (and the NPC `bac>=100 → bac:-60` on the same line); `j71.js:299` «Đóng cửa cung giữ mình» `maid:-3`.
   - `jstip.js:142` «Tố lên …» text «(Danh -2)» / «hỏng: Danh -1» typed.
   - `jts.js:367` tsBorrowOpts «thiện cảm -2 (nợ ân tình)» typed.
   Found by a scan of every `+` line of `git diff origin/main..HEAD -- dev/build` for `stat:<number>` in fx and `<word> ±N` in text; the one-core gates pass only because these numbers sit in the frozen baseline. Shrinking the baseline is allowed (never growing).
2. **LAW 7 (VANPHONG L66 + WORKER_BRIEF L15 «no Chắc chắn»)**: `j7.js:25-26` poisongift «Nhờ Thái hậu đứng ra» / «Đẩy tội cho cung nữ»: «thành: thoát nạn chắc chắn …». Reword without «chắc chắn» (e.g. «thoát nạn ngay, khỏi phải đối chất») and re-run the scan (HINT-NO-GAIN must stay 0 — the hint reader must still read it as a gain).

#### Re-check of round-1 FAIL 1–5 + ROOT-59 owner flags
| item | result |
|---|---|
| FAIL 1 decline-the-Emperor family (j8 ksp, jagmaid amNight, jts summons ×3, jworld trip ×4, jcmaid cmTt) | **fixed** — every card has a real gain from ONE row BAL.cv.decl; shots + scan confirm |
| FAIL 2a loss words / 2b coverage | **fixed** — my own plant (ksp «Cáo bệnh» back to cost-only with «nhường đêm» as its only green word + trip «Cáo bệnh ở lại» gain-less, rebuilt) → scan FAIL, 5 rows caught (pend:ksp «được: nhường đêm» + world:away te/san/tuan/chinh); reverted. `--plant` self-test: PLANT OK 3/3 (cost-only, dominated, fake-green) |
| FAIL 3 jstip «Nhịn» / «Tố lên» | **fixed** (risk on Kèm, «được trả lại bạc và đồ tốt» under Được) |
| FAIL 4 law 4 on touched lines | **only the 4 named lines fixed** → FAIL 1 above |
| FAIL 5 report claim | **fixed** (KEY FINDING rewritten) |
| ROOT-59 (1) «Hoảng sợ đứng nhìn» restored with a gain | **done** — Tốn Sủng −BAL.cv.cuu.sung · Được Sức +BAL.cv.cuu.suc «giữ được thân mình vô sự»; three roads, none dominates (law 16 OK) |
| ROOT-59 (2)(3)(4) | done (giữ lại N = sibling's BAL price; rest 3 / duc 1; exempt classes judged on law 3 too) |
| Check 2 BAL.cv.decl = {suc:6,duc:2,sung:2,an:2} | one core OK — every reader prints/reads the key (j8, jagmaid, jts, jworld, jcmaid), no typed copy; receiver-choice (28ebffad) `jts.js:282` reads `(BAL.cv&&BAL.cv.decl||{suc:0}).suc` (guarded) |

#### Gates (all on ca3d43a3 = branch + LIVE bb8e8ec9)
| gate | result |
|---|---|
| choice-value-scan branch, 100 turns, seeds 7 / 11 / 23 / 31 | **PASS** 378 / 326 / 366 / 320 modals · COST-ONLY 0 · HINT-NO-GAIN 0 · DOMINATED 0 · 0 page errors |
| same scan on LIVE bb8e8ec9, seeds 7 / 11 / 23 / 31 | **FAIL** · COST-ONLY 81 / 67 / 72 / 73 · HINT-NO-GAIN 8 / 4 / 6 / 11 · DOMINATED 72 / 57 / 58 / 92 |
| word-only gains hand-check (seed 7, 124 rows, `--words`) | read all: real gains (giữ lại N lượng = sibling price, giữ được nhân chứng, shop items …); only wording fault = «thoát nạn chắc chắn» (FAIL 2) |
| plant tests | own plant caught 5/5; `--plant` 3/3 |
| one-core-guard / -text / -bind / -text-rule | PASS (baseline file unchanged by the branch) |
| odds-cap | PASS |
| quickcheck --runs 6 | **PASS** · core gates PASS · old save ok · perf median new/live render 188/164 ms, tab 280/322, buổi 1030/975 |
| coop-e2e vs live Worker | **63/63**, 0 page errors (fold / ipad / solo) |
| paired bot run (runbal2.sh + inbal2.js from review/balance-final, sens, CAP 20 min each, together) | branch 2 lives (HH 1, 14.7 yrs) vs live 7 (HH 2, 5.1 yrs). Sức per buổi 49.5 vs 51.6 → no runaway Sức. Bạc held per buổi ranks 0–5: 6–16 vs 4–37 (same band). ONE branch life held ≈ 827 bạc on average at rank 6 (741 buổi); the other branch life 14 at rank 6, live 8–14. 2 lives = too small to call; **next round: run ≥ 6 lives per arm and look at rank-6 Bạc** (FYI balance-final) |
| Fold 755x1000@2 + iPad 1180x820@2 shots: ksp lật thẻ, Cứu giá, Hoàng thượng triệu đánh đàn, cmTt (top + scrolled), looked at 3× | rows fit, gains visible (Cáo bệnh: «dưỡng sức, nghỉ trọn một đêm…» / Tốn Sủng −2 · Được Sức +6; Hoảng sợ đứng nhìn «giữ được thân mình vô sự»; Dặn … «được tiếng hiền …» Tốn Bạc −30), no horizontal overflow, 0 page errors. Scratch only, never uploaded (nothing to wipe on the CDN) |

#### Notes (not FAIL)
- Pre-existing on live, not this branch: MF7 merit cards show «có rủi ro · thành bại khó đoán» in the GỢI Ý line of SURE options that have a Kèm risk (Hô thị vệ, now also Hoảng sợ đứng nhìn); «Khó lường» odds word (j17/j63) is outside the VANPHONG ladder. Backlog for the hint owner.
- **LANDER (one core)**: BAL.cv.loanBack (this branch) and BAL.rk.loanBack (review/balance-final `jbal2.js:815`) are the same 40 % chance. **Keep BAL.rk.loanBack** — balance-final's rk row is the table of every per-roll risk chance (treatStep, abortDie, loanBack, riseKill …); the branch landing second points j24 card `chanceW(…)` and the monthly `roll(…)` at BAL.rk.loanBack and deletes `loanBack` from BAL.cv.
- Next round can be a short re-check: fix FAIL 1–2, rebuild, scan seeds 7/11/23/31, one-core ×4, plus a longer bot run; final-merge LIVE b1c3631e or newer.

## RE-CHECK #3 (opus, reviewer session_01964izEx119qJ5kCxatzjrR, for Foreman D #6) — reviewed review/choice-value-audit @4e78e63e
PRIORITY #1 CHECK ('choice value'): OD 1 | ledger 0 | claims 1 (this job) | main 0 | review/* review/choice-value-audit 4e78e63e (under review), review/balance-final (BAL.rk.loanBack) | archive 0
START_CTX ≈ 5 % of 1M (get_session reads 0; estimate) · depth 7 · finished ≈ 15 %.
Final merges on review/choice-value-audit (pushed): 5cfb90bd (+ LIVE 62055a31 law3-cost-only) → 83157297 (+ LIVE d9b32074 coop-thin F2–F4) → 8e45535d (+ LIVE 2481c80d kit-head-say / ev-pic-followups) → **d5e5c343 (+ LIVE edb2e724 opt-scroll-reset)**. Each: index.html / sw.js regenerated by assemble.py + build_site.sh.
Only real conflict: j8 PEND.ksp «Tắm gội chờ giá» — both sides gave it the same gain (law3-cost-only on LIVE, #4 here) → kept LIVE's wording «thành: được thị tẩm, gần Hoàng thượng đêm nay» (one gain, no double; the rest of the line identical, checked).

### VERDICT: PASS d5e5c343
Laws checked: 2 EQUAL-VALUE, 3 GAIN-AND-LOSS, 4 ONE CORE, 7 cổ trang wording, 9 KIT FIRST, 11 whole group, 1 two-way (role-parity).
| item | result |
|---|---|
| (1) FAIL 1 law 4+11 — typed numbers on lines the branch rewrote | **fixed** — my own scan of every `+` line of `git diff origin/main -- dev/build` (not jbal*): `stat:<n>` 0, `<word> ±N` 0, `.rel/.tinh/.aff ±= N` 0, `roll(N)` 0. Only `eyes(S)*5` on j7 ghost line — byte-identical to main and a game-wide pattern (11 files), not this branch's number (backlog note below). one-core baseline 4212 → 3930 (shrunk, never grown) |
| (2) FAIL 2 law 7 — «chắc chắn» | **fixed** — 0 in the branch diff; no `%` |
| (3) BAL.rk.loanBack | **OK** — j24 card + monthly roll read BAL.rk.loanBack; value 40 = main's typed roll(40) = review/balance-final jbal2 `loanBack:40`; BAL.cv.loanBack gone. Guard `jbal.js:409 if(!BAL.rk)BAL.rk={loanBack:40};` |
| (4) «giữ sức» / named gains (--fullsuc) | **OK** — jtsb «Khéo từ chối», j72 «Khéo từ chối», j4 «Mặc kệ» each keep a real cost (thiện cảm / án / ân tình) and a named gain; jreign «mài mực» «giữ được thân mình ngoài chính sự» not dominated; j8 ksp gain = LIVE's line. Text goes through the kit card (kitOptFinal), no new class / style / element in the diff (one `span class="r"` log line is pre-existing) → law 9 OK |

### Gates (one at a time)
| gate | sha | result |
|---|---|---|
| one-core-guard / -text / -bind / -text-rule | 5cfb90bd, 83157297, 8e45535d, d5e5c343 | PASS ×4 each |
| odds-cap | same four | PASS |
| choice-value-scan 100 turns seeds 7 / 11 / 23 / 31 | 5cfb90bd | **PASS** 371 / 348 / 358 / 335 modals · COST-ONLY 0 · HINT-NO-GAIN 0 · DOMINATED 0 · 0 page errors |
| choice-value-scan seed 7 | 83157297 / 8e45535d / d5e5c343 | PASS 334 / 347 / 357 |
| --fullsuc seeds 7 / 11 | 5cfb90bd | PASS 364 / 358 · (seed 7 again on 83157297: PASS 345) |
| --plant | 5cfb90bd / 83157297 / 8e45535d | PLANT OK 3/3 each |
| quickcheck --runs 6 | 5cfb90bd / 83157297 / 8e45535d | PASS · old save ok · core gates PASS · perf new/live (8e45535d) render 282/259 ms, tab 497/543, buổi 1221/1614 |
| coop-e2e vs live Worker | 5cfb90bd / 83157297 | 68/68 |
| role-parity-scan branch vs LIVE | 5cfb90bd (vs 62055a31), 83157297 (vs d9b32074) | **identical** — 276 rows, 31 gaps on both sides (incl. LIVE's cx2:chest / facFound / rouge N-ONLY) → no branch-only gap |
d5e5c343 (+ edb2e724, only jopic card-frame scrolling) re-ran the static gates + scan seed 7; the rest carries from 8e45535d (no option-card value code touched by edb2e724).

### LANDER notes
1. Delete `jbal.js:409 if(!BAL.rk)BAL.rk={loanBack:40};` (+ its comment line 408) when review/balance-final lands (jbal2 replaces BAL.rk whole; j24 already reads BAL.rk.loanBack).
2. receiver-choice reads BAL.cv.decl.suc (guarded) — unchanged.

### Notes (not FAIL, backlog)
- `eyes(S)*5` (odds bonus per eye) is typed in 11 modules (j22, j4, j68e–h, j7 ×2, j72, j92, j96, jroute) — one-core family for the BAL owner, pre-existing on LIVE.
- Pre-existing on LIVE (re-check #2 notes stand): «Khó lường» odds word outside the VANPHONG ladder (j17/j63, ksp); MF7 «có rủi ro · thành bại khó đoán» hint on sure options with a Kèm risk.
- My first try ran the four seeds in parallel on 4 CPUs → timeouts (exit 124, not a branch fault); re-ran one at a time.

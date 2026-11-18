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

PRIORITY #1 CHECK ('choice value cost-only'): OD L582 + L1877 | ledger 0 | claims 0 (mine: CLAIMS row 72) | main 0 | review/* 0 | archive 0 — reused: dev/measure/bacroad.js (bạc-road value model, kept), dev/measure/option-modal-scan.js (driver pattern)

# CHOICE-VALUE-AUDIT — worker report (opus, session_01964izBnYA5PzbmC6qJfmDG; coordinator Foreman D #2)
START_CTX (#3 session_01964izCHK28tcRj4VBLZSQH) ≈ 5 % of 1M (get_session reads 0; estimate) → rollover 30 %, ceiling 60 %.
START_CTX ≈ 3 % of 1M (get_session reads 0; estimate) → rollover at 28 %, ceiling 60 %. Rolled over at ≈ 27 % (see HANDOVER below).
Branch **review/choice-value-audit** (from origin/main d3ea24e8; LIVE 790cda59 merged). STATUS (#2): DONE — see «#2 FINISH» at the bottom; SẴN SÀNG KIỂM there.

## KEY FINDING — the owner's example IS live game content (corrected by #3, review FAIL 5)
The choice the owner names — decline Hoàng thượng's night, pay, gain nothing — exists in the game, in five places: j8 PEND.ksp «Cáo bệnh» (lật thẻ:
Sủng −2, Ân tình −2, nothing gained), jagmaid PEND.amNight «Cáo bệnh» (cung nữ road), jts «Hoàng thượng triệu …» «Cáo bệnh», jworld trip
«Cáo bệnh ở lại», jcmaid cmTt «Dặn … chỉ viết chuyện vặt». #1/#2 wrongly told MAIN it was only a test fixture; #3 fixed all five (see «#3 FINISH»).
What follows is #1's original note on the literal words, kept for the record:
«Tiếp» thân +3 vs «Từ chối khéo rồi lui về cung» Bạc −10 / thân −3 (OD L1877, ref owner-1811-0920-night-unfair.jpg) — the LITERAL words — are a hard-coded demo
option pair in the shot script dev/test/kit-fit.js:40 (the opt-card-short shots), copied in 6 more shot scripts. 0 hits in dev/build or the live
index.html. Fixed anyway (the owner must never see an unfair pair, even in a test shot): every demo pair is now symmetric —
«Tiếp» Sức −3 → thân +3 · «Từ chối…» Sức +3 → thân −3 (kit-fit, tassel-scan, fig-fill, shop-fix, dialog-person, stage-fig-size, act-pics-cases).
The scan reads these fixtures too, so the gate FAILS on live listing «Từ chối khéo rồi lui về cung» and PASSES on the branch (brief step 5).

## SCAN — dev/tools/choice-value-scan.js (gate) + dev/tools/choice-value-static.js (hand-check list)
Runtime (Playwright, built site): every PEND dilemma builder (225) + N end-of-turn passes (seeded) + the shot-script demo pairs. Each option card is
read through the kit's OWN act-card rows (j63 kaRows: Tốn / Được / Mất / Kèm), what the player reads; event outcome-hiding (kitIsEventChoice) is
switched off so a hidden gain still counts. Flags: COST-ONLY (a cost, nothing under Được — law 3) and DOMINATED (a sibling ≥ on every numeric line,
≤ on every cost, odds ≥, strictly better on one — law 2). Exit 1 on any flag.
`node dev/tools/choice-value-scan.js --turns 100 --seed 7 [--out f.json] [--md]`
EXEMPT (listed, never failing; reviewer please confirm): night1/vnight answers (each fits one of his tastes — learning his taste is the play),
talk topics «Chia sẻ bí mật…» (her taste, p3ChatF), vlout veils (same cover, the price buys the look), Đặt cược boats (payout follows true odds),
ge1/ge2 ending branches (outcome hidden on purpose).

## BEFORE / AFTER (seed 7, 100 turns; branch also seeds 11 / 23 / 31)
| build | option modals | COST-ONLY | DOMINATED | exempt |
|---|---|---|---|---|
| live d3ea24e8 (seed 7) | 151 | 60 | 12 | 5 |
| branch a09310a+ (seed 7) | 156 | 0 | 0 | 5 |
| branch (seed 11) | 126 | 0 | 0 | 4 |
| branch (seed 23) | 143 | 0 | 0 | 5 |
| branch (seed 31) | 129 | 2 → 0 (scan read «không tốn gì» as a cost; parser fixed) | 0 | 5 |
| #2: branch + LIVE 94d11623 merged, seed 31 | 138 | 2 (poisongift «Nhờ Thái hậu đứng ra», ilback «Thôi, không chuộc») → 0 | 0 | 5 |
| #2: + HINT-NO-GAIN check, seed 7 | 142 | 1 (ration «Khéo từ chối», new on main) + HINT-NO-GAIN 6 (stip «Nhịn» / «Tố lên…») → 0 | 0 | 4 |
| #2: seeds 23 / 31 | 157 / 146 | 1 / 1 (newgirl «Tiếp đãi lạnh nhạt», cứu giá «Hoảng sợ đứng nhìn») → 0 | 0 | 7 / 3 |
| **#2 final 22095cbb, seeds 7 / 11 / 23 / 31 (+ 84ca6625 seed 7: 158 modals, PASS)** | 165 / 132 / 152 / 133 | **0** (HINT-NO-GAIN 0) | **0** | 6 / 7 / 6 / 8 |
Static pass (literal {n,fx} with only costs and no gain marker): live 65 candidates → branch 54 (heuristic, many show a word gain or hit another person; hand-checked the empty ones, fixed below).

## WHAT WAS FIXED (whole group, every number via BAL; new group BAL.cv appended to jbal.js as ONE separate line)
BAL.cv = {ransom:60, coldAid:30, servAsk:10, rest:3, duc:1, skipAff:6, vulan:{den:{bac:-10,duc:4,danh:2},cung:{suc:-10,duc:4},cungMaid:8}, reign:{nhan:{sung:1,duc:1},mai:{sung:2}}}
| family | before (card) | after (card) | file |
|---|---|---|---|
| decline / stay-away (Khéo từ chối ×4 kinds, Không đến tấn phong, Cáo bệnh không dự / không tới, Mặc kệ ×5, Không can dự, Làm như không biết ×2, Lánh đi lối khác, Ngồi xem, Để tự khỏi, Ghi nhớ cứ như thường, Đóng cửa cung giữ mình, Không dâng lễ) | Tốn only | + Được: Sức +BAL.cv.rest (she keeps her strength) | j24 j25 j72 jtsb jts j4 j7 j95b j70 jrash jact jworld jworld2 j71 |
| pick-your-loss (Bớt lễ nghĩa, Chịu rét, Giữ than, Vẫn đi lại như thường, Từ chối cho mượn, Từ chối kẻ hầu, Làm ngơ thư lãnh cung, Bỏ mặc (con tin), Mặc kệ nợ cung nữ) | Tốn only | + Được: «giữ lại N lượng bạc» (N = the sibling's real price, BAL) | jecon jworld jworld2 j24 j3 j7 jcmaid |
| virtuous refusal (Đốt đi, làm ngơ; Đứng yên khi bị tát) | Tốn only | + Được: Đức +BAL.cv.duc | j24 jlooks |
| word gain hidden or on the red Kèm line (Tiến cử tông nữ, Đút bạc dập lời đồn, Để nàng chịu đòn, Nhận tội xin tha, Mở kho / Lo lót ngự khố, item «vào rương» from jstip) | Tốn only / gain shown red | gain under Được («thành: …»); jstip item line kèm: → thành: (every item event) | j7 j3 j42 jworld2 jstip |
| nothing to find (Rình bắt kẻ giả ma / Tìm kẻ tung tin with no culprit) | Sức −10 for nothing | no cost when no culprit, «yên lòng» | j7 |
| spoiled tea «Pha trà mốc mời khách» | only loss | not offered (n<0) | jstip |
| Vu Lan (Thả đèn Bạc −10 → Đức +3 dominated by free Cúng → Đức +5 Danh +1 Lòng +8) | dominated | Thả đèn Bạc −10 → Đức +4 Danh +2 · Cúng Sức −10 → Đức +4 Lòng +8 · Dò hỏi free → Tâm cơ + tai mắt | j7 |
| Tân quân lập uy c1a (mài mực Sủng +1 < nhẫn nại Sủng +2 Đức +1) | dominated | nhẫn nại Sủng +1 Đức +1 · mài mực Sủng +2 | jreign |
| contest tutor «bỏ bạc mời thầy kèm» (same odds word as free entry, ×12 festivals) | dominated | offered only when the tutor lifts her odds word | j71 (fInv7 + j71x) |
| typed numbers touched (jts thiện cảm −6, j24 20/10 lượng, j3 30, j7 60) | typed | BAL keys (law 4) | |

## HANDOVER (rollover at ≈27 %; worker → Foreman D #2 opens the successor)
Branch review/choice-value-audit, last pushed sha in the STATUS line. Successor steps:
1. `python3 dev/build/assemble.py && bash dev/site/build_site.sh`, then `node dev/tools/choice-value-scan.js --turns 100 --seed 31` (expect PASS after the «không tốn gì» parser fix) and seeds 7/11/23 once more; paste the before/after table update.
2. Gates (one at a time, ≤ 2 browsers): bash dev/tools/coregates.sh (one-core-guard / rules-one-source / kit-conform — was running at handover, result unknown), node dev/test/odds-cap.js, bash dev/tools/quickcheck.sh --runs 6 (old save included), node dev/test/coop-e2e.js vs live, Fold 755x1000@2 + iPad 1180x820@2 shots of the changed option cards (Bổng lộc tháng, Phụ tuyến lời nhờ, Lễ tấn phong, Vu Lan, Đại hàn, Thi tài lời mời; scratch only, never git), short paired bot run (runbal2 from review/balance-final, ~20 lives per arm) to check no runaway Sức/Đức.
3. Coordination: balance-final #2 (review/balance-final) also edits jbal.js / j7 / j71 numbers; my jbal change is ONE appended Object.assign line (BAL.cv), no existing key changed; j7/j71 edits are option literals (vulan, ghost, rumor, foreignwed, condemnedmaid, maidhostage, contest tutor). Expect token-level merges only.
4. Report «SẴN SÀNG KIỂM <sha> + touched files» to D #2. Touched: dev/build/{j24,j25,j3,j4,j42,j7,j70,j71,j72,j95b,jact,jbal,jcmaid,jecon,jlooks,jrash,jreign,jstip,jts,jtsb,jworld,jworld2}.js, dev/test/{act-pics-cases,dialog-person,fig-fill,kit-fit,shop-fix,stage-fig-size,tassel-scan}.js, dev/tools/choice-value-{scan,static}.js, index.html, sw.js.

OWNER FLAGS (design calls for D #2 / MAIN, not decided by me):
- Gain chosen for «stay away / decline» = Sức +3 (BAL.cv.rest, half of «Nghỉ ngơi một lát»). One number for the whole family; tune in one place.
- «Đứng yên» (not dodging a slap) now gives Đức +1 (forbearance). New mechanic — reviewer/MAIN may prefer another gain.
- Contest tutor option now hides when it cannot lift her odds word (instead of a bigger tutor effect, which would change NPC contest balance too — two-way).
- Exempt classes above (knowledge / look / bet / ending) — law 2 reading needs MAIN's yes.

## #2 FINISH — SẴN SÀNG KIỂM 84ca6625 (review/choice-value-audit, LIVE 790cda59 merged) (successor worker session_01964izCU5vXM4nLAiNKfjgz; START_CTX ≈ 4 % of 1M → rollover 29 %; finished at ≈ 22 %)
Merged LIVE 94d11623 then 790cda59 (only index.html / sw.js + one j24 line conflicted: took main's lxma0 gift + lxFix; generated files rebuilt).
NEW in the scan: **HINT-NO-GAIN** — an EVENT card hides its rows in play and shows a GỢI Ý line (jk2b kitHint); the scan now reads that hint at the
lowest Tâm cơ level and FAILS when an option with a real gain reads «chẳng được gì» (law 3 as she actually sees it). Root cause it found: the hint
reader merges number-less comma parts and reads «bị phạt» / «tội» as a loss, so «thành: X bị phạt, trả lại đồ» showed «chẳng được gì».
Fixes #2 (whole group, numbers via BAL.cv; BAL.cv line gained poison:{…} + newgirl):
| card | before | after | file |
|---|---|---|---|
| poisongift «Nhờ Thái hậu đứng ra» / «Đẩy tội cho cung nữ» | Tốn only (typed th -12 / maid -40 / duc -6) | Được: «thoát nạn chắc chắn» (hint reads it), numbers → BAL.cv.poison | j7 |
| ilback «Thôi, không chuộc» | «không tốn gì» + red kèm | thành: giữ lại <price> lượng bạc (only when she can pay) | jil |
| j24 borrow «Từ chối» | (#1 fix) printed BAL key not read by its option → one-core-bind FAIL | one amount for the choice (local amt) | j24 |
| stip embezzle «Nhịn» | «không được không mất» + kèm risk | Đức +BAL.cv.duc (forbearance family, like «Đứng yên») | jstip |
| stip «Tố lên Hoàng hậu / Thái hậu» | hint «chẳng được gì» | «được trả lại bạc và đồ tốt» first, own segment | jstip |
| ration «Sang mượn son phấn · Khéo từ chối» (new on main) | Mất only | thành: giữ nguyên hộp <part> | jration |
| newgirl «Tiếp đãi lạnh nhạt» | thân -10 only | thành: giữ lại BAL.cv.newgirl lượng (the brooch price, «Tặng trâm» reads the same key) | j7 |
| cứu giá «Hoảng sợ đứng nhìn» | Sủng -2, nothing; strictly worse than free sure «Hô thị vệ» Sủng +2 | not offered (as spoiled tea) | j71 |
Gates on the final sha: choice-value-scan seeds 7/11/23/31 PASS (table above) · one-core-guard / -text / -bind / -text-rule PASS · odds-cap PASS ·
coop-e2e (vs live Worker) all steps ok, 0 page errors · quickcheck --runs 6 PASS (core gates PASS, old save ok, perf median new/live: render 216/230 ms, tab 357/368, buổi 1019/964) · Fold 755x1000@2 + iPad 1180x820@2 shots of the changed
cards (Vu Lan, Bổng lộc tháng, Phụ tuyến, Có người đến, Lễ tấn phong, Thi tài, Kẻ hầu xin, Đại hàn, poisongift, Bổng lộc bị cắt xén) looked at —
scratch only, not in git. Short paired bot run (runbal2 from review/balance-final, sens, CAP 25 min each, run together): branch 6 lives (HH 4, mean
6.2 yrs) vs live 4 lives (HH 4, 9.5 yrs); Sức per buổi 54.1 vs 50.3, Bạc per buổi 10.5 vs 11.0 → no runaway Sức / Bạc (Sức +4 from the decline family's
Sức +3). Sample is small; years-to-HH difference is within bot noise but balance-final should know (FYI below).
Merge notes for the lander: vs review/balance-final only token conflicts — j24 borrow line (theirs BAL.rk.loanBack, ours amt / «thành: giữ lại») and
the j24 loan-repay line, jecon duty card (theirs dutyDanh gain + econDoDuty 3rd arg, ours «thành: giữ lại N lượng bạc»): take the union. vs
review/parallel-time: it also edits jstip sends — expect token-level only.
Touched (#2): dev/build/{j7,j24,j71,jbal,jil,jration,jstip}.js, dev/tools/choice-value-scan.js, index.html, sw.js (+ #1 list above).
OWNER FLAGS (#2 adds): «Hoảng sợ đứng nhìn» removed from Cứu giá (2 options left: Lao vào / Hô thị vệ) — MAIN may prefer giving it a gain instead;
«Nhịn» (embezzled stipend) now Đức +1 (forbearance) — same family as «Đứng yên»; HINT-NO-GAIN treats the GỢI Ý line as part of law 3.

## #3 FINISH — review FAIL 5 @84ca6625 fixed (worker #3 session_01964izCHK28tcRj4VBLZSQH; START_CTX ≈ 5 % of 1M → rollover 30 %)
Merged LIVE e16e1d66 first (only index.html / sw.js conflicted → regenerated). Commits d1a27621 (merge), 1e5a06ff (fixes), 55e5f652 (seed 31 find), + report.
### FAIL 1 — the owner's own family: decline Hoàng thượng (ONE row BAL.cv.decl = {suc:6, duc:2, sung:2, an:2})
| card | before (live) | after |
|---|---|---|
| j8 PEND.ksp «Cáo bệnh» (lật thẻ) | Tốn Sủng −2 · Ân tình −2 (typed), «Được»: nhường đêm (a loss) | Tốn Sủng −decl.sung · Được Sức +decl.suc, «nghỉ trọn một đêm cho lại sức» · Kèm nhường đêm, Ân tình −decl.an |
| jagmaid PEND.amNight «Cáo bệnh» (cung nữ road) | Sủng −D.decline, nothing | + Được Sức +decl.suc (same words) |
| jts «Hoàng thượng triệu đàn / cờ / du hồ» «Cáo bệnh» | Mất Sủng only | Được Sức +decl.suc · Mất Sủng sungGo_2 |
| jworld trip «Cáo bệnh ở lại» (×4 kinds te/san/tuan/chinh) | Danh −1 only; dominated by free «Theo hầu» | Được Sức +decl.suc, «ở lại nghỉ, khỏi đường xa vất vả» · Kèm Danh −1 (no longer dominated: each road has its own gain) |
| jcmaid PEND.cmTt «Dặn … chỉ viết chuyện vặt» | Lòng −10 · Bạc −30, «Được» = loss words | Được Đức +decl.duc, «không dò ý Hoàng thượng, giữ đạo bề tôi, Sủng không suy» · Kèm cha giận, không gửi bạc |
Why 6: «Cáo bệnh» to him = a whole night of rest = «Nghỉ ngơi một lát» (Sức +6, j76) — bigger than the stay-away family's Sức +BAL.cv.rest (3), because declining HIM costs more (Sủng / Ân).
Receiver-choice #2 (session_01964izGVAWwV6DabthJTS1n, review/receiver-choice) agreed by send_message: the summoned NPC's «Cáo bệnh» reads the SAME key
BAL.cv.decl.suc (ap(p,{sung:BAL.eff.jts.sungGo_2,suc:…})), guarded until this branch lands.
### FAIL 2 — scan gate holes closed (dev/tools/choice-value-scan.js)
- a. LOSS WORDS: a green word that names her own loss (nhường…, mất…, bị…, phải…, chịu…, thua, không gửi / không được, cha giận, … giận / oán / thù / nghi ngươi) is a COST, never a gain. Others' loss («Thái giám X …») stays her gain.
  Every cost + word-only-gain option is printed with `--words` as a hand-check list (WORD-GAIN rows; table below).
- `--plant` self-test (kept, part of the gate): plants cost-only {bac:-10}, dominated {bac:-10,duc:2} vs {bac:-10,duc:3}, fake-green {sung:-2,x:"nhường đêm"} → **PLANT OK · caught 3/3** (exit 1 = all caught; exit 3 = gate broken).
- b. COVERAGE: drives the gated builders directly — every MF7 merit × variant (PEND j71m), every FV7 festival × variant (j71f / j71i), every FX7 contest (j71x),
  every WORLD event card (window.WORLD_EVD[k].card, her among the chosen; trip × 4 kinds), every TSA panel builder (Hoàng thượng triệu đàn / cờ / du hồ …), and
  the cung-nữ-road night (amNight). Modals per seed-7 run: 158 → 333+.
- New rows the wider scan found, fixed (whole group): MF7 «Không can dự / Không dính vào ×2 / Không ra mặt / Mặc kệ ×2 / Bỏ qua» (nothing, dominated by a free gain road) → Được Sức +BAL.cv.rest (decline family);
  festival «Chuẩn bị kỹ rồi dự thi» (×9 festivals, same odds word as free entry) → offered only when it lifts her odds word (as the tutor), bạc → BAL.cv.tutor.fest;
  hội phối đồ «Mượn áo …» (gain words read neutral, card showed no Được) → «mặc … dự hội: hợp đề, dễ được chấm cao hơn». Festival dragon-boat «Cược …» added to the BET exemption (payout follows true odds).
### FAIL 3 — jstip regressions
- «Nhịn»: risk now «kèm: có thể bị bớt xén nữa vào tháng sau» → red Kèm (hint: «được tiếng hiền; nhưng có thể bị bớt xén nữa…»).
- «Tố lên Hoàng hậu / Thái hậu»: «Thái giám X phải chịu đòn» → GREEN under Được beside «được trả lại bạc và đồ tốt»; hint reads «được trả lại bạc và đồ tốt» (no HINT-NO-GAIN).
### FAIL 4 — law 4 on touched lines → BAL.cv
newgirl thiện cảm ±: BAL.cv.ngAff {warm:20, cold:-10} (text + newGirl()); guardrumour «Đút bạc»: BAL.cv.rumor {bac:40, danh:2}; contest tutor: BAL.cv.tutor {fest:20, fx:30};
j24 borrow chance (card chanceW + monthly roll): BAL.cv.loanBack 40 — LANDER: balance-final names the same chance BAL.rk.loanBack; keep ONE when both land.
### FAIL 5 — report: KEY FINDING rewritten at the top (the owner's example IS live game content, the five cards above).
### MAIN ROOT-59 ORDER (~23:05Z, STATUS line 279: the 4 owner flags) — applied
1. «Hoảng sợ đứng nhìn» RESTORED in Cứu giá (j71 MF7 cuuhoang): Tốn Sủng −BAL.cv.cuu.sung (2) · Được Sức +BAL.cv.cuu.suc (6), «giữ được thân mình vô sự» (no wound / Sức risk) · Kèm ngài bị thương nhẹ.
   vs «Lao vào» (Sức −10, risk −15, Sủng +8 …) and «Hô thị vệ» (free, Sủng +2): three roads, none dominates (scan PASS).
2. «giữ lại N lượng bạc» kept only where N = the sibling's BAL price (unchanged from #1/#2).
3. Sức +BAL.cv.rest 3 / Đức +BAL.cv.duc 1 kept.
4. Scan: exempt classes (knowledge / look / bet / ending) are exempt from LAW 2 only; LAW 3 (COST-ONLY, HINT-NO-GAIN) is now judged on them too → still 0. vlout note reworded (a price / cover ladder).
### Card look fix found in the shots
Sure declines in jts showed their certain loss under «BẠI» (a fail block on a sure option): summons «Cáo bệnh» (Sủng → fx = Tốn), «Cáo bệnh, không dự» (Danh → fx = Tốn), «Không đến» (thiện cảm / oán → Kèm). Group grep: no other sure tsOpt with Được + Mất.
### GATES (final sha 7f339bad = branch + LIVE d2da651b merged)
| gate | result |
|---|---|
| choice-value-scan seeds 7 / 11 / 23 / 31 (92185b90 = + LIVE 9a1d6922) | **PASS** 359 / 364 / 363 / 322 modals · COST-ONLY 0 · HINT-NO-GAIN 0 · DOMINATED 0 · 0 page errors |
| choice-value-scan seed 7 on 7f339bad (+ LIVE d2da651b) | **PASS** 350 modals |
| scan on LIVE 1130a49e (seed 7, same scan) | **FAIL** · COST-ONLY 72 · HINT-NO-GAIN 8 · DOMINATED 66 — lists ksp / amNight / summons ×3 / trip ×4 «Cáo bệnh», hội phối đồ «Cáo bệnh, không dự», cmTt … |
| --plant self-test | **PLANT OK · caught 3/3** (cost-only, dominated, fake-green «nhường đêm») |
| one-core-guard / -text / -bind / -text-rule | PASS (7f339bad) |
| odds-cap | PASS (7f339bad) |
| quickcheck --runs 6 (92185b90) | PASS · old save ok · core gates PASS · perf new/live render 184/205 ms, tab 323/346, buổi 1005/1008 |
| coop-e2e vs live Worker (92185b90) | 63/63 passed, 0 page errors |
| paired bot run (runbal2 sens, CAP 25 min each, together; branch 55e5f652 vs live e16e1d66) | branch 6 lives (HH 3, 7.2 yrs) vs live 7 (HH 2, 5.1 yrs); mean Sức 34 vs 48, Đức 32 vs 36, Bạc 46 vs 47, Sủng 50 vs 69 → no runaway Sức / Đức / Bạc (small sample, bot noise) |
| Fold 755x1000@2 + iPad 1180x820@2 shots (summons, ksp, trip, cmTt, amNight, Cứu giá) | looked at: rows fit, gains under Được, no overflow — scratch only, not in git |
Hand-check list of every cost + word-only-gain option: reports/choice-value-wordgains.md (seed 7, 104 distinct options, all read as real gains).
### SẴN SÀNG KIỂM 7f339bad (review/choice-value-audit)
Touched by #3: dev/build/{jbal,j8,jagmaid,jts,jworld,jcmaid,jstip,j7,j71,j24}.js, dev/tools/choice-value-scan.js, index.html, sw.js (+ #1/#2 lists above).
Lander notes: BAL.cv.loanBack vs balance-final BAL.rk.loanBack (same chance, keep one); receiver-choice reads BAL.cv.decl.suc (guarded) for the NPC «Cáo bệnh».
#3 context at finish ≈ 22 % of 1M (estimate; START_CTX 5 %).

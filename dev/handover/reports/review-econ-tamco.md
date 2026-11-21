# REVIEW econ-tamco (FOREMAN D #10, reviewer session_01964izCjh2dKcmvL4sSYKMG, opus, BIG)

PRIORITY #1 CHECK ('Tâm cơ|tamco|thuê người|BAL.road'): GAP OR21 / ECONOMY.md §5 «Chưa làm» | main: none (jecon §5 prices only; old BAL.road = jbalroad origin-roads table) | review/econ-tamco c45265d6 (this review; no other review/* on it) | claims ECON TAMCO #2 session_01964izCzXkfovcY4kd6X4Mk; KIT REQUEST «econ-tamco» open (dev/kit/KIT_REQUESTS.md).
START_CTX ≈ 12 %.

Reviewed: review/econ-tamco @ c45265d6c97a95b814365cd527df85a9f731d9f1 (final-merged LIVE 4e8cbaeb). origin/main is now f2e2d1cf: the land re-check must final-merge it.
Diff vs 4e8cbaeb: jtamco.js (new, 42 lines), jwhy.js spy price (1 line), assemble.py (jtamco after jecon), econ-tamco.test.js, index.html/sw.js.

## VERDICT: PASS-PENDING-KIT
Everything outside the kit part passes. **AS IS the branch BREAKS «shown = charged» → it may NOT land** until the kit «Tốn» part + the jtamco PEND.roadpick 2-line swap are in. Seen on the card (Fold 755x1000@2 and iPad 1180x820@2, bribe vs Hoàng hậu: price 88, tc 4, hire 40):
1. «Hao tâm cơ, tự mình sắp đặt»: «Tốn» row prints **không**, and Tâm cơ −4 is charged. The x text "tốn: Tâm cơ -4" does NOT reach the row (the kit drops it). So the card shows no cost for this road at all.
2. «Làm như thường»: «Tốn» prints **không**, and the scheme price is charged by the act (for bribe/block: on success).
3. «Thuê người làm thay»: «Tốn» prints **Bạc −40** only. The scheme price is charged on top.
Once the kit gives the option a cost field the fx does not pay (KIT REQUEST), «Tốn» must show: plain = price; tc = price + Tâm cơ −tc; hire = price + bạc −hire. Then send the branch back for a full PASS / LAND READY.

## Tests (run by the reviewer, one at a time, on c45265d6)
| test | result |
|---|---|
| econ-tamco.test.js (755x1000@2 + 1180x820@2) | PASS. Equal value for 13 schemes × every rival; card 4 options, no %; each road charges its fx/Tâm cơ and rolls the shown odds; price scan 0 mismatches; NPC roads 135 acts (tc 34/23, hire 15/21, plain 86/91), bad 0; page errors 0 |
| roadhp-unit.js | PASS |
| roadhp-scan.js | PASS (4320 rendered lines) |
| paid-tiers.js branch | FAIL 81 |
| paid-tiers.js plain LIVE 4e8cbaeb | FAIL 81, the same rows (diff of the normalised lists is empty): craft rows (Thêu khăn / Cắm hoa / Viết thơ / Chép kinh … «bán thêm < trả thêm», «quà không hơn») + a few shop items. **Pre-existing, not this branch.** |
quickcheck: not re-run here (the worker's run on c45265d6 was PASS 205 s). It is re-run at the land re-check after the final merge.

## Laws touched
- Law 1 two-way: OK. NPCs pick the same 3 roads inside the act (econRoadNpc), pay the same tc/hire, get the same +BAL.tcroad.up (aOdd wrapper, NPC only, ACTX.fz respected). The undefined-`a` branch of the wrapper cannot leak: the only `aRoll(o)` calls (j10 faction plot, jwhy her maid spy) are not inside a priced NPC act.
- Law 2 equal value: OK. hire = tc × BAL.tcroad.rate exactly (test checks every scheme × rival); tc and hire roads buy the same odds; the plain road is cheaper and worse.
- Law 3 gain-and-loss: OK. Every road has a cost and a gain.
- Law 4 one core: OK. All knobs in BAL.tcroad. The BAL.road wipe is fixed: no code reads the old tc keys from BAL.road (git grep rate/share/tcMin/up/npc* on BAL.road: 0 hits); roadhp unit + scan PASS. Spy now charges actBac("spy") = the printed price (law 11 group scan: 13 acts, 0 mismatches).
- Law 7 wording: OK. No %, odds as words + bar, cổ trang text.
- Law 9 kit first: OK. Kit dilemma card, no CSS added; the missing «Tốn» part was filed as a KIT REQUEST, not hacked.
- Law 12 devices: shots at Fold 755x1000@2 and iPad 1180x820@2 looked at: card in view, no overflow, no cut text.

## Bot measure (HH 36→45 %, early death 36→38 %, n 33/40)
Noise, not a balance shift. HH 12/33 vs 18/40: difference 9 points, SE of the difference ≈ 11.5 points (< 1 SE); the before arm also lost a shard (OOM). Early death +2 points is far inside noise, and the extra deaths are childbirth (9 vs 5), which the road code does not touch. NPC scheme acts on her are unchanged (blockf 7.2→6.0, landed accusations 2.3→2.0). Not blocking. Suggested (cheap, while waiting on the kit): one larger after-run (n ≥ 80) with run5e.sh to confirm HH sits inside the band.

## Notes for the fixer (not blocking; can ride with the kit swap)
- N1: at low odds (bribe vs Hoàng hậu: 8 → 20) all 3 roads read «Liều» with the same bar. The gain is only in the Được text («chắc tay hơn»). Law 3 holds, law 7 forbids %, so it is OK. Just be aware the player sees the same word.
- N2: her Tâm cơ is paid in econRoadGo before doAct, and the NPC road cost is paid before f0. If the act refused after that, the cost would be lost. No such path found (the card checks can()/ok() first), so low risk.
- N3: jwhy.js spy keeps a typed `:15` fallback when actBac is missing (dead path). Drop it for a clean law 4.
- N4 (follow-ups, already logged by the worker): co-op thin guest, jsgame person card and j70 chains run the plain road.

Shots: scratch only (/home/user/wt/rv-tamco-shots), deleted with this verdict; none in git or CDN.
Re-check: reviewer stays idle. On KIT READY + the swap: final-merge origin/main, re-run quickcheck + econ-tamco + roadhp, look at both devices, then LAND READY review/econ-tamco-rv <sha>.

## RE-CHECK 21/11 — review/econ-tamco @ 60703f26d71bf8f9f1d11a75e0ca9d4af843944c (on LIVE 8c8b8b6b) — FOREMAN D #13
PRIORITY #1 CHECK ('econ-tamco|ton:|ECON_WIN'): KIT_REQUESTS kit-ton-row DONE (KIT §13.16, LIVE e4fd4dcf) | main: j17 actLine ECON_WIN «hỏng: … không mất bạc» | review/econ-tamco only | claims ECON TAMCO #2 CzXkfovc.
Context: 17 % (start ~12 %). NOTE: LIVE has since moved to 64d2e094 (MAIN CHÍNH 84). The fix round must final-merge it.

### VERDICT: FAIL (1 item). Everything else PASS.
**F1 — on the ECON_WIN schemes (bribe, block, xinhh: price paid ONLY on success) the road card breaks «shown = charged».** KIT §13.16 / j63 treat «Tốn» as paid either way. The road card puts the scheme price in «Tốn» on all 3 roads and has no «hỏng» line. On a failed bribe, nothing of the price is charged. Seen in econ-tamco.test.js itself (bribe vs Hoàng hậu): the card shows «Tâm cơ -4 · Bạc -82», and a failed roll charges dBac 0, dTc −4. On the hire road the card shows «Bạc −122», and a failure charges −40.
The same acts' normal act card already says this (j17 actLine: `ECON_WIN.includes(k)` → «hỏng: …, không mất bạc»). Law 11 (whole group) + one source: the road card must follow the same rule.
Fix: for `ECON_WIN.includes(k)`, every road says what a failure keeps, with the j17 actLine wording and rule (one source, no new text table):
- plain road: «hỏng: không mất bạc»;
- Tâm cơ road: Tâm cơ is still spent, the bạc price is not;
- hire road: the hire is paid, the price is not. Show the hire and the price so the failure cost can be read off the card (e.g. split the Tốn figure, or say it in hỏng).
Extend econ-tamco.test.js: for an ECON_WIN scheme, force a fail and a success on each road, and check the charged bạc/Tâm cơ against the card's Tốn + hỏng lines (today the test records dBac 0 on a fail and still passes).
Non-ECON_WIN schemes (spy, poison, musk…) are fine: the price is paid either way, matching «Tốn».

### Gates re-run by the reviewer, one at a time, on 60703f26
| gate | result |
|---|---|
| revert audit `git diff 8c8b8b6b..60703f26` (depth-60 fetch; 8c8b8b6b is an ancestor; no merge resolved by me) | clean: 10 files, all econ-tamco (assemble.py +jtamco, jcoopthinf +ctx «econ», jecon econVeto refund, jtamco, jwhy, KIT_REQUESTS, 2 tests, index/sw). No LIVE hunk reverted. |
| assemble.py rebuild | index.html unchanged |
| econ-tamco.test.js Fold 755x1000@2 + iPad 1180x820@2 | PASS (rendered Tốn: «Bạc -82» / «Tâm cơ -4·Bạc -82» / «Bạc -122»; ptime deed path; price scan 0; NPC roads 150/135, bad 0) — but see F1 |
| econ-tamco-coop.js (live worker) | PASS 17 (both seats see the kit card; guest tc/hire paid ONCE by the host in her context with the odds she saw, nothing paid on her phone; two-way on the friend; host's own road) |
| coop-e2e.js | 68/68 |
| kit-ton-row.js | PASS 12 |
| roadhp-unit | PASS |
| roadhp-scan | FAIL 10 (untagged «Nhờ» in bd_* Bạc Đồ arcs). The same FAIL 10 on plain LIVE 8c8b8b6b: **pre-existing, not this branch** (for the bd road owner) |
| quickcheck | PASS 188 s, core gates PASS, old save ok, perf new/live render 234/197, tab 426/414 |
| shots Fold + iPad (looked at) | card in view, Tốn in kit red, no overflow, no %, odds words |

### Laws on the new code
- Law 1 two-way / co-op: OK. Her road rides with the act (ECON_HER → runAct ctx «econ»; ptSend/ptLand for sent deeds), the host pays it in her context, and NPCs use the same roads.
- Law 2: OK.
- Law 3: OK. The price and the NPC road are refunded when the j95c giá họa gate stops an act. That gate only fires for NPCs (`a===S` passes), so her road needs no refund.
- Law 4: OK.
- Law 7: OK.
- Law 9: OK (kit `ton` field, no CSS).
- «shown = charged»: OK except **F1** (ECON_WIN).
N1 (low odds: every road «Liều») and N3 (spy `:15` dead fallback) still stand, non-blocking.
Fixer: ECON TAMCO #2 session_01964izCzXkfovcY4kd6X4Mk. After the fix: final-merge the newest LIVE, then SẴN SÀNG KIỂM. The reviewer re-runs econ-tamco (+ the F1 fail/success check), econ-tamco-coop, coop-e2e and quickcheck.

## RE-CHECK #2 21/11 — review/econ-tamco @ d07e20bbab87eb892b8ac5b6b24e0984f17e3a01 (ECON TAMCO #3, on LIVE 56ff0db0)
PRIORITY #1 CHECK ('ECON_WIN|rcvMaidBribe|rcvJudge|aOdd'): main j17 actLine / jrcv rcvMaidBribe + rcvJudge / jagstf2 stf2BribeW | review/econ-tamco only | claims ECON TAMCO #3 CiU7bSoQ.
Context: ~24 %. LIVE moved to 9c1dd605 (kit-pcrow-square). The reviewer merged it locally (f42736e7, review/econ-tamco-rv, NOT pushed: index/sw conflicts only, rebuilt; diff vs main = the same 11 econ-tamco files, no revert). The revert audit of d07e20bb vs its base 56ff0db0 is clean.

### VERDICT: FAIL (2 items). F1 is FIXED.
**F1 fixed, verified.** Pay-on-success schemes: «Tốn» now holds only what is paid either way (plain «không», Tâm cơ road «Tâm cơ -n», hire road «Bạc -hire»). The price is a red «Bạc -N» on the THÀNH/Được row, and BẠI says «không mất bạc» / «chỉ mất tiền thuê, không mất bạc giá mưu kế» from one source (ECON_WIN_FAIL, shared with j17 actLine). A forced fail on each road charges exactly «Tốn».

**F2 — the road's odds gain never reaches the outcome on bribe, xinhh and musk (law 3 gain-and-loss, law 2 equal value, shown odds = rolled odds; law 11 whole group).** The roads sell +BAL.tcroad.up through aOdd / the frozen shown odds (fzRun). Three of the 13 priced schemes do not roll through aRoll/aOdd:
- **bribe**: the maid's receiver choice (jrcv rcvMaidBribe → jagstf2 stf2BribeW) weights «take» with the raw `oddsCl(oBribe(a,t))` (j8:129). Probe in the game (merged build, 120 tries each, Fold): frozen odds 0 → 4/120 taken, frozen odds 100 → 2/120 taken. Control **block**: 0/120 vs 108/120. The card shows plain «Liều» but the Tâm cơ / hire roads «Khó» (5 → 17 in another run), and she pays Tâm cơ −4 or Bạc −40 for no change. The test's §3c even says so («the maid decides, not the roll») and accepts it.
- **xinhh**: jaudit X.f → rcvJudge("xinhh",a,t,o) with `o=odA(a,raw)` and `roll(o)`, not aOdd. The same gap.
- **musk**: `o:()=>null` (no roll at all), so there are no odds to buy. A Tâm cơ / hire road there is cost-only.
NPCs: the same (the aOdd wrapper does not reach these paths), so law 1 holds but law 3 fails for them too.
Fix (whole group): make the success decision of each priced scheme read aOdd(shown odds, a), i.e. pass `aOdd(oddsCl(oBribe(a,t)),a)` into rcvMaidBribe/stf2Bribe and `aOdd(o,a)` into rcvJudge; or, for a scheme with no roll (musk), give no roads (no road card), or a road gain that really exists. Add a group scan test: for every scheme that gets the road card, freezing the odds at 0 vs 100 must change the success rate (as block does), for her and for an NPC. A scheme that fails the scan must not get the road card.

**F3 — econ-tamco.test.js is not stable.** Three runs, three results: merged build run 1 FAIL «tc road Tâm cơ change 0 vs -4»; worker's d07e20bb FAIL «sent deed … nodeed»; merged run 2 PASS. In that PASS run the tc road charged Tâm cơ −5 / Bạc −90 against a card that showed Tâm cơ −4 / Bạc −86 (the price moved between the card and the charge; the test recomputes the cost and so does not see it). Pin the state (seed, khắc, Q, rival choice) so the test is the same every run, and check the charge against the numbers the card showed at the click (not a recomputed cost). If the price really can move between the card and the payment in play, that is a «shown = charged» bug to fix too.

Minor (non-blocking, the kit wraps the row): on the Fold the red «Bạc -86» splits across two lines («Bạc» / «-86») at the end of the Được row.

### Gates on the merged build f42736e7 (one at a time)
| gate | result |
|---|---|
| econ-tamco | run 1 FAIL (F3), run 2 PASS |
| econ-tamco on the worker's d07e20bb | FAIL (sent deed nodeed) — F3 |
| bribe/block odds probe (reviewer script) | bribe ignores the shown odds — F2 |
| econ-tamco-coop / coop-e2e / kit-ton-row / roadhp-unit / quickcheck | not re-run this round (FAIL already found; the worker reports 17 / 92/92 / 14 / PASS / 197 s). All of them run at the next round. |
Fixer: ECON TAMCO #3 session_01964izCiU7bSoQZwWZBzj4B. Next round: final-merge the newest LIVE, then SẴN SÀNG KIỂM; the reviewer re-runs everything + the F2 probe.

## RE-CHECK #3 21/11 — review/econ-tamco @ ea374de9c23eabe947b775cacece8127cb652067 (ECON TAMCO #4, on LIVE d31c8ec0)
PRIORITY #1 CHECK ('aOdd|econRoadRolls|ECON_PRFZ|rcvMaidBribe'): main jrcv/jaudit/j29 receiver paths | review/econ-tamco only | claims ECON TAMCO #4 EeakvU1z.
The reviewer final-merged LIVE twice (6e07f837, then d3fa26d3) → **review/econ-tamco-rv 7752aa5b** (pushed; index/sw conflicts only, rebuilt). Diff vs main = the branch's own 15 files (454+/26−). No LIVE hunk reverted.

### VERDICT: FAIL (1 item). F2 + F3 FIXED.
- **F2 fixed.** bribe/bribel (rcvMaidBribe + j29 stf2Bribe), xinhh/trinhhh (rcvJudge + fallback) read aOdd; musk/catswap/her-as-judge get no road (econRoadRolls). Reviewer probe: bribe frozen odds 0 → 0/120, 100 → 120/120 (was 4 vs 2); block 0 → 98/120. econ-tamco-scan PASS (11 her + 11 NPC; bribe TVD 1, xinhh 0.98; musk/catswap «roads no»).
- **F3 fixed.** econ-tamco PASS 4/4 runs (both devices). The charges equal the card at the click: fail = Tốn only, success = + the shown price (−94). The price doubled after the card (188) is still charged at the shown 94.
- spy `:15` fallback dropped (N3 done). Fold «Bạc / -94» wrap → KIT REQUEST (non-blocking).

**F4 — the co-op land gate is not stable, and a guest's bạc went negative.** econ-tamco-coop.js on the final shas: run 1 (b1542e84) FAIL staging «no priced scheme this road can pay» (guest bạc 7, Tâm cơ 11); run 2 PASS 17; run 3 (7752aa5b) FAIL staging with **guest bạc −35, Tâm cơ 17** after her Tâm cơ-road step. The game blocks any choice that would take bạc below 0 (j19/j2 canPay), so −35 should not happen. Likely cause (to confirm): on the host her act charges the price/road FROZEN from her card (ECON_PRFZ / econRoadPay h.c) with no fresh can-pay check, while the host's copy of her bạc can be lower than her phone's.
Fix:
(a) Find what took her below 0. If it is a road/price charge, a road act whose frozen cost she can no longer pay on the host must stop with the usual «Thiếu bạc» (no partial charge), for her, the co-op guest and the NPC road.
(b) Pin the coop test: stage the guest's bạc/Tâm cơ so a priced scheme is always reachable, and assert that no road step leaves her bạc or Tâm cơ < 0.
(c) It must PASS 3 runs in a row.

### Gates on 7752aa5b (LIVE d3fa26d3 merged), one at a time
| gate | result |
|---|---|
| econ-tamco-scan | PASS 11+11 (on b1542e84) |
| econ-tamco | PASS ×4 (3 on b1542e84, 1 on 7752aa5b) |
| bribe/block probe | bribe 0/120 → 120/120 |
| econ-tamco-coop | 1 PASS / 2 FAIL — F4 |
| coop-e2e | 92/92 (b1542e84 and 7752aa5b) |
| kit-ton-row | PASS 14 |
| roadhp-unit | PASS |
| quickcheck | PASS 192 s on 7752aa5b (215 s on b1542e84), core gates PASS, old save ok |
| shots Fold + iPad | Tốn: không / Tâm cơ -5 / Bạc -50; Được: the price in red; no %, no overflow |
Laws 1/2/3/4/7/9: OK on the code. F4 is a co-op «shown = charged / no negative bạc» question.
Fixer: ECON TAMCO #4 session_01964izEeakvu1zSofrTWNJJ. Build on review/econ-tamco-rv 7752aa5b (or re-merge LIVE). Next round: econ-tamco-coop ×3 + coop-e2e + econ-tamco + quickcheck.

## RE-CHECK #4 21/11 — review/econ-tamco @ 9f6f99c193dcca7b9cf2855aea611e2400c06b01 (ECON TAMCO #4, F4) — REVIEW econ-tamco #2 session_01964izDDCznjEvfsCsb8aaR, FOREMAN D #14
depth 5 · START_CTX ~3 % (get_session reads 0; estimate) · now ~8 %.
PRIORITY #1 CHECK ('econLack|econRoadPay|ECON_PRFZ|ptLand'): OD 0 | ledger 0 | main: j9 runAct (no can-pay of its own), jptime ptLand | review/econ-tamco only | claims ECON TAMCO #4 EeakvU1z.
The reviewer final-merged LIVE 922b36b4 (index/sw conflicts only, rebuilt; assemble.py = main's list + jtamco.js after jecon.js, assemble rebuild = no change) → **review/econ-tamco-rv 079a147bac49a8a8244a50b46f9b1e768ff19024** (pushed, fast-forward of 7752aa5b).
Revert audit on a deepened fetch (merge-base 666def0c): `git diff 922b36b4..079a147bac49a8a8244a50b46f9b1e768ff19024` = 15 files, 477+/26−; the 12 removed non-build lines are all this branch's own edits (assemble list, j17 actLine, j29, j8, jaudit ×2, jcoopthinf, jecon ×2, jwhy spy, KIT_REQUESTS row). No LIVE hunk reverted.

### VERDICT: PASS — F4 FIXED at the root (whole group).
- jtamco `econLack` checks, before EVERY charge frozen from her card, that she can pay it NOW: Tâm cơ road tamco ≥ tc; bạc ≥ price (+ hire on the hire road; the price counted on every road, pay-on-success too, as ACT.ok needs). Both host-context paths: the runAct wrapper (her solo act and the co-op guest's act run on the host in her context) and ptLand (a sent deed landing later). Fail → «Thiếu bạc/Tâm cơ (cần N): <act> không thành, chưa tốn gì.», nothing charged, deed back undone. NPC roads: econRoadNpc picks a road only if bạc ≥ pr+hire+keep / tamco ≥ tc+min and pays in the same tick, so no NPC can go below 0.
- Numbers come from the card cost c (BAL via econRoadCost) — law 4 OK. Law 1: her, the guest and NPCs all stop at the same can-pay line. Laws 2/3 unchanged.
- Solo 3e: unpayable frozen hire / plain / tc → «Thiếu …», dBac 0, dTc 0 (seen in the log).

### Gates on 079a147bac49a8a8244a50b46f9b1e768ff19024, one at a time
| gate | result |
|---|---|
| econ-tamco-coop (2 players, host Fold + guest iPad) | PASS 18 / 18 / 18 — 3 in a row; «F4: no step leaves bạc or Tâm cơ below 0 (her on the host, her phone, the host)» ok each run |
| econ-tamco-coop seats swapped (host iPad + guest Fold) | PASS 19 |
| econ-tamco solo (Fold 755x1000@2 + iPad 1180x820@2) | PASS ×3 |
| econ-tamco-scan Fold / iPad | PASS 11 her + 11 NPC road schemes (N 40), both |
| kit-ton-row | PASS 14 |
| roadhp-unit | PASS |
| coop-e2e | 92/92 |
| quickcheck | PASS 175 s, core gates PASS, time-spill guard PASS, old save ok, perf new/live render 191/178, tab 382/365 |
| shots Fold + iPad (looked at) | road card in view; Tốn không / Tâm cơ -5 / Bạc -50; price red in Được; odds words, no %, no overflow. Fold «Bạc / -94» wrap = open non-blocking KIT REQUEST |
Laws 1/2/3/4/7/9/11/12: OK. N1 (every road «Liều» at low odds) stands, non-blocking. Shots scratch only (/home/user/wt/rv-shots), not in git/CDN.

**LAND READY review/econ-tamco-rv 079a147bac49a8a8244a50b46f9b1e768ff19024 — coop-e2e PASS + econ-tamco-coop both seats** (for MAIN CHÍNH 89 session_01Rc5AsN8weZNZcjxNiCsivs; on LIVE 922b36b4; if LIVE moved, the land merge = index/sw rebuild only).

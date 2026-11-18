# ROLE PARITY part 4 = B4 (worker opus session_01N1tNP4ot5eXFn8KFS9CsoB, Foreman B ROOT-2; branch review/role-parity-4)
PRIORITY #1 CHECK ('role-parity' / j83 illBuy / j22 talk:man / jdress ACT.xx / ACT.vp): OD 2 (18/11 ~21:30Z, 17/11 L1588) | ledger 0 | claims role-parity-4 = this session | main: j83 IROUTE + illBuy (already "same function for her and every consort"), j22 talkOpts man + affairMonth (NPC affair = flat roll 2), jdress ACT.xx + jshelf guess cause (player only), jagacts3 p3O / p3Run pattern | review/*: role-parity (d6c2dc17), role-parity-r1 (75f9dd84, base) — nothing on these acts | REUSED: illBuy / IROUTE / illWitness (j83), shelfCause / shelfAccuse (jshelf), haOpts (jagharm), p3Run / agcU / AGC3BTN (jagacts3), jmen S.menW / likeV.
START_CTX ~3 % of 1M; finished ~27 % (only push + report left at the limit).

## SẴN SÀNG KIỂM 28ee908e (review/role-parity-4 = base review/role-parity-r1 75f9dd84 + merge live main 790cda59 + rebuilt root site)
Commits: 7c3a93df (code + tests + open.json) · 3a239fd0 (merge main 790cda59) · afae0775 (guess belief weight) · 28ee908e (root site).
Scan NOT edited (dev/tools/role-parity-scan.js untouched, AMEND 21:16Z). open.json edit = pure deletions → rebase/merge on PART1 FIX READY keeps them (C-AG: regenerate from the seeded scan and re-drop these 45 keys).

## 1. What was built (ONE function per act, her button and the NPC option run the same code)
| gap (report role-parity.md §4.1 B) | before | after |
|---|---|---|
| j22 affair road «Chào hỏi đúng lễ», «Liếc mắt đưa tình», «Trao khăn tay», «Hẹn gặp riêng», «Cắt đứt» | player only (talkOpts man); NPC affair = flat monthly roll(2) when Sủng < 30 | cards built ONCE by `manCards(p,m,risk)` (j22); her talkOpts = manCards(S,…), an NPC consort's provider `agReg("consort","par4")` (new dev/build/jagacts4.js) offers keys maid:hail … maid:cut (the scan's KEYLAB names of these buttons) for a man really standing somewhere this buổi (jmen S.menW); the deed lands only if she stands where he is (pend pl). Per-woman feelings on the man (m.tv / m.fv / m.lv; hers stay m.tinh / m.af / m.letters). `lộRiskP`, `watcherOf`, `trystP`, `affairExposed(m,how,p)` take the doer; a lover night sets v.affair (j22 monthly conception / book / exposure, jmen lover nights); caught = the man dies, she is sentenced (deathSentence / lãnh cung, same as hers). Flat roll(2) off while par4 runs. |
| Đồ cấm «Sai cung nữ thân tín mua lén ngoài cung» (+ the other 3 routes, whole group) | player button; NPC = flat npcMonthly malice>60 roll(8) | NPC options cx3:illMaid / illTy / illCho / illAlly (AGC3BTN = IROUTE[r].n) run `illBuy(v,r,k)` — the same function as hers: bạc out = the route price, the item into her chest (or illP → her maid brings it next tuần), Đức −3, a failure leaves evidence with illWitness. Weights (never locks): someone in the killing band (else bandW), no item at hand yet (else haveW). Flat roll(8) off while par4 runs. Law 6c: the poison an NPC later uses (jpoison pgift / jagharm taint) is this bought item. |
| harm:xx «Tố xa xỉ» + harm:vp «Tố vượt phẩm» | P-ONLY: jshelf shelfCause allowed a GUESS only for her; NPC = monthly dice pass (npcO 15 / guessO 2) | `shelfCause`: a guess is allowed for an NPC doer too while the agent loop runs (shelfNpcGuess = haOn && p4On); NPCs choose it through jagharm haOpts (band, motive, odds, mindPick); a pure guess is weighed odds × BAL.ag.par4.guess.p (her belief — mind, not a gate). The monthly dice pass shelfNpcAccuse is off while it runs. |
Numbers: BAL.ag.par4 (jbal2 end) — man {hailDanh 1, hailAf 5, flirtTinh 12, seenDiv 3, sacD 5, tcD 5, dieP 50, tokTinh 15, trystTinh 10 = the old typed j22 values, moved; lonely 30, favW .25, cutRisk 45, like 20, g / l}, guess {p .3}, ill {keep 20 (old +20), band 3, bandW .2, haveW .1, g / l}. Off switch BAL.ag.par4.on = 0 → old flat rolls back.
Her side unchanged: the deeds run with par4 off is byte-identical to the base build (seed 1 607 = 607, seed 2 569 = 569).

## 2. Rows removed from dev/tools/role-parity-open.json (278 → 233, 45 rows, all seen closed by the scan run on 7c3a93df)
harm:vp × 9 (t1–t7, hh, up) · harm:xx × 9 · label:Sai cung nữ thân tín mua lén ngoài cung × 9 · maid:flirt × 9 · maid:hail × 9.
(Trao khăn tay / Hẹn gặp riêng / Cắt đứt were not in the list — the scan's worlds never reach tình ý 30 — they are covered by dev/test/role-parity-4.test.js.)

## 3. Tests / gates (build 28ee908e unless said)
| gate | result | note |
|---|---|---|
| dev/test/role-parity-4.test.js (new, seeded) | ALL PASS 12/12 | one builder; NPC gets the 5 cards; per-woman tình ý; tryst → v.affair / caught → man dies + sentence; illBuy bạc = price, item in chest / illP; xx / vp guess for NPC; off switch |
| role-parity.test.js (on 7c3a93df) | my 45 rows closed; still FAIL on the NEW-gap list = the part-1 nondeterministic set (cx2:maidTalk t1–t7, hh cx3:staffThuong, up cx3:facFound / harm:accuse / trinhth, maid:pil, PROMO-me facFound) | unseeded scan (review-role-parity.md FAIL), not this branch; waits for PART1 FIX READY. Re-run on 28ee908e: see §5 |
| one-core-guard | PASS (inline 4001 → 3996) | 3 typed numbers moved to BAL |
| quickcheck | PASS · open 1682 ms · old save ok · render 220/227, tab 519/438, buổi 1269/1220 ms, tasks>200 21/20 · core gates PASS | CDN reachable here |
| ag-stf2 | 23/23 | |
| ag-* suites (17) | all PASS; ag-all perf p95 8.6 ms once (parallel runs) → 6.4 ms alone (base 5.5, budget 8); ag-carry 1 FAIL once → PASS alone | flakes |
| ag-par3 | 1 FAIL «Nhờ giúp đỡ» | known pre-existing flake (part-1 review) |
| agmaid_check | 1 FAIL «Tiến cử option text» | same FAIL on live main (part-1 review) |
| ag-all okK | edited: a consort's maid:hail … maid:cut = her j22 man buttons (manCards) | |
| **deeds ratio ±3 %** (ag2perf-deeds 160 buổi) | **NOT within ±3 %**: par4 off = base exactly; par4 on, 8 seeds (off/on): 607/652, 569/576, 594/687, 609/673, 514/670, 231(life ended)/570, 644/671, 567/623 → mean of 7 comparable seeds +10.9 % | see below — reviewer / foreman decision |
| coop-e2e | BLOCKED (co-op host not in this env) | not faked |
Deeds analysis: the new deeds themselves are few (AG4 landings 1–12 per 160 buổi: flirt / hail / token, 1–3 buys). The rise is a trajectory shift: any change in the NPCs' dice use sends the seeded life elsewhere (ablations on seed 3: no man road 764, no buys 636, no guess 641 — all above off 594), e.g. seed 5 ends with 12 consorts alive vs 10 (more recruited, none died) and per-consort deeds +5–9 %; landings grow in 'call', cx2:maidSpy, cx:study. Perf budget holds (ag-all p95 6.4 < 8 ms, quickcheck buổi 1269 vs 1220 ms). The muted flat rolls (affair start, poison buy, monthly accusations) also mean fewer forced events. I did not tune numbers down to hit ±3 % (that would hide the acts the owner asked for).

## 4. Laws 1–6 check
1 two-way: NPC consorts now hold her 5 man-talk buttons, the 4 Đồ cấm routes and the guess accusation; nothing of hers changed. 2 equal-value: no new player choice. 3 gain-and-loss: every step has a gain (Danh, tình ý, Sức, an item) and a risk (seen → evidence, caught → death / lãnh cung, failed buy → evidence + bạc lost, false charge → Danh). 4 one core: all numbers in BAL.ag.par4 (+ BAL.odb.j22 / BAL.eff.j22 / BAL.eff.j83 reused); one-core-guard PASS. 5 harder as she climbs: n/a. 6 real world: (a) evidence: a seen flirt gives a real witness evA, a failed buy gives illWitness evidence; (b) people: the man is a real S.men person at his scheduled place, she must be there; (c) objects: bạc out, the item in her chest or with her maid, traceable (illP → inv). 7 wording: no new player-visible text (ledger lines AGC3ACT in Vietnamese, no %). 9 kit: no UI.

## 5. Notes for C-AG / reviewer
- Keys: the frozen scan names her consort man buttons maid:* (KEYLAB), so the NPC options use those keys; the maid group's runners of maid:* stay for maids (the doer decides). If the scan later aliases them (e.g. cx3:man*), rename in jagacts4 in one place.
- role-parity.test re-run on 28ee908e: none of the 45 removed keys reappears; FAIL list again = unseeded-scan noise, different from run 1 (cx2:maidTalk t1–t7, up cx3:facFound, label:Thắp hương cầu an t1–t7/hh — a button present on the base 75f9dd84 too (j68f / jemoact), PROMO-npc harm:taint); 26 other open rows seen closed this draw. Every row verdict waits for PART1 FIX READY (seeded scan).
- Worktrees: /home/user/wt/rp4 (branch), /home/user/wt/rp4-ho (this report), scratch /home/user/wt/rp4-tmp — removed after push.

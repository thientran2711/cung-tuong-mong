# BIG REVIEW — lr5 trio (help-housemate-lr5, srv-rank-lr5, selx-fair-lr5)
Reviewer session_01D3E3NYEAw2ySeXbRy1naHN (opus), opened by FOREMAN D session_01D3E3NYwRePZXPzMMwNfkEq, 27/11.
PRIORITY #1 CHECK: OD (help-housemate / srv-rank / selx-fair PASSed patches 3aa87e1b / 8559fea2 / c7594222; remerge report dev/handover/reports/remerge-lr5.md) | main LIVE 17f23656 (jdoor act-merge doors, jdoor5 s_xin, BAL.srvMpN + srvLoyal, jdayq) | review/* help-housemate-lr5 75eb6e45, srv-rank-lr5 a5fec6d6, selx-fair-lr5 c72de843, **review/door-onetap a843c869 (e84dfbc1 already fixes the LIVE door-card bug below)** | claims REMERGE lead session_01D3E3NZuZ53VXut5YsqK6ej; Q-SOFTLOCK / dayq-one-rule (FOREMAN D) RUNNING.
LIVE moved 4× during the review: 17f23656 → b16b4b93 (dayq-qsoftlock) → 0b43ee55 (mg-trim-lr5) → 066d9af0 (parity-facfix-lr5) → 4cd3f974 (kptitle-close).
Reviewer re-merged LIVE into all three at b16b4b93, 0b43ee55 and 066d9af0 (each time: sources auto-merged / disjoint, conflicts only index.html, sw.js, CHANGE.txt (branch line kept); rebuilt; assets.json = LIVE) and re-ran every own test + coop-e2e on each set of heads (all green; one srv coop timing row under 3 parallel runs passed 143/143 alone).
**FINAL heads (FF from LIVE 066d9af0, pushed, head == sha): help-housemate-lr5 3bd74d29 · srv-rank-lr5 7536d3c6 · selx-fair-lr5 76bd422b** — gates on these exact shas: help-housemate.test 8/8, srv-rank.js 14/14, selx-rules + selx-wire ALL PASS, coop-e2e 143/143 ×3.
LIVE 4cd3f974 (kptitle-close) touches only dev/build/j74.js: disjoint from all three → land «onto staged» as D did for mg-trim / parity.

## Verdicts
| branch | verdict | head (FF from LIVE 17f23656) | gates on that head |
|---|---|---|---|
| review/help-housemate-lr5 | **PASS → LAND READY** | **3bd74d29** (75eb6e45 + reviewer test-only commit 241efdaf + LIVE re-merges) | help-housemate.test 8/8 ALL PASS (was 3 FAIL); coop-e2e 143/143; receiver-choice 1 FAIL = identical on LIVE 17f23656 (pre-existing, stf2BribeW one-core row); real-tap video Fold + iPad |
| review/srv-rank-lr5 | **PASS → LAND READY** | **7536d3c6** (a5fec6d6 + reviewer video-script commit b54536da + LIVE re-merges) | srv-rank.js 14/14; coop-e2e 143/143; real-tap video Fold + iPad |
| review/selx-fair-lr5 | **PASS → LAND READY** | **76bd422b** (c72de843 + LIVE re-merges) | selx-rules ALL PASS; selx-wire ALL PASS; selx-flow real UI Fold 28 + iPad 33 shots, 0 errors, «every choice card was visible and tapped»; coop-e2e 143/143 (run 2; run 1 141/143 = lazy-id flake, §3) |

## 1. help-housemate-lr5
Merge resolution dev/build/j2.js:169 (hh «Cùng cung»/queen topic filter) = union of LIVE «Hậu lễ tạ tội», «Nhờ người đứng giữa» + branch «Nhờ giúp đỡ». Correct: different acts (jmend mediator vs jrcv helpAsk), no duplicate.
The 3 FAILs: NOT a code fault. LIVE act-merge (jdoor.js:22) folds «Nhờ giúp đỡ» into the «Giao hảo» door (regex already lists it) when ≥ 2 gh members stand; the test read the FOLDED list.
Fix (reviewer, test-only, 241efdaf): the card is read from the raw list (doorRaw, the list PEND.door shows) and a new reach() proves the tap path — rival: door «Giao hảo»; housemate: door «Giao hảo» (with «Mượn son phấn»); Hoàng hậu: plain button. 8/8 PASS. Video script taps the door, then the row.
Law checks: 1 two-way ✓ (NPC cx2:help may ask her; one asker never stacks two cards); 3 ✓; 4 ✓ (lock prints netTh, BAL.audit.loan + eff.jaudit.run/evRun removed with their only reader — no dead key, no second copy); 7 ✓; 9 kit ✓ («Lời nhờ» = kit dilemma card, door card = kit); co-op ✓ (143/143); old saves ✓ (no new save key).
**LIVE BUG found (not this branch; BLOCKING for every door on LIVE):** a door card opened INSIDE the person view (jdfv focus) is queued but never painted — jdayq.js:142 MutationObserver → dqPull (jdayq.js:82) takes it back after DQ.user is back to 0 (stat.pulled 1); after ✕ it stays in Q hidden with no re-arm (DQ.mt false). Reproduced on LIVE 17f23656 and again on b16b4b93 (after dayq-qsoftlock) with the «Trò chuyện» door (real tap, Fold). LIVE's own dev/test/act-merge-j1-tap.js also fails on LIVE. **review/door-onetap e84dfbc1 already fixes it** («a door card opened from the focus view now shows … LIVE left it queued»). The videos were therefore filmed on a LOCAL scratch merge (never pushed) of this branch + review/door-onetap: real taps housemate → «Nhờ giúp đỡ» → helpAsk result (bạc moves); NPC asks her → «Lời nhờ» card (4 answers) → «Giúp hết lòng». One more video on this branch alone shows the held door card.
Note for D (law 2, owner 27/11 ~00:46Z, LIVE family, not this remerge): the «Lời nhờ» receiver card (LIVE jrcv rcvHelpOpts) has 4 answers on one matter; the whole receiver-choice family should be checked against the NHẸ·VỪA·NẶNG rule by its owner.

## 2. srv-rank-lr5
Merge resolution dev/build/jbal2.js:920–923: LIVE `BAL.srvMpN=[6..18]` + `BAL.srvLoyal` kept (canon overwrite of srvMp, law 14), branch `BAL.srvMp=5` dropped, branch `BAL.srvCap={open,u,letW,demW}` appended. Checked: no `BAL.srvMp` reader anywhere in dev/build or dev/test; the ONE need source is srvMpNeed (j42.js:551 → BAL.srvMpN) and every srv-rank reader (spOutgrown jpromsv, j42 lock text, cnv-promo-sim climb policy) calls it; srvCap read by jpromsv:54/77 + jagstf2:46–47 only. No dead key, no double source (law 4 ✓).
Nits (pre-existing on LIVE, comment only, not blocking): jbal2.js:918 comment still says «srvMp = công lao per bậc (need (bậc+1)*srvMp)»; dev/measure/cnv-promo-sim.js:1 says «(rk+1)*BAL.srvMp». Law 14 tidy for whoever next touches jbal2.
Reachability: LIVE act-merge puts «Xin chủ cho đi hầu cung khác» in the «Xin chủ» door (jdoor5.js:5 s_xin) on the «Ban thưởng» tab; the old video tapped a hidden copy. Reviewer commit b54536da: video taps tab → door → row (test-only). Same LIVE door-card bug as §1 → filmed on a local scratch merge with review/door-onetap: iPad — the master «Cho đi» → «Đổi chủ» card, new house Hoàng hậu, cap Nữ quan; Fold — the master keeps her (Chủ tin 80 → 86).
Law checks: 1 ✓ (NPC servant same rule, parity rows); 5 ✓ (srvMpN rising); 4 ✓; co-op ✓ (proxy never a destination, 143/143); old saves ✓ (gate row loads + one month).

## 3. selx-fair-lr5
Clean merge. Delta vs LIVE checked line by line against the PASSed patch c7594222 (vs its base b881686f): every «+» line of selx-fair's own work is present (j32 ban hoa rows, jbal2 BAL.selx.w + BAL.kc2.soNeed, jkc kcSoPts/kcSoOk/kcTrialW, jselx selxCut/selxCutRow/selxCutWords + podium cut line, jselxday selxHallOdds + kept card words). The only patch lines absent are firstcard-2 stack wrappers (kitRiskOpt) that LIVE firstcard-3 replaced. Nothing extra.
Law checks: 4 ✓ (soNeed from BAL, cut from the contest, odds from selxOddsP + BAL.odds.cut); 7 ✓ (selection cards in words: hall «Cơ ta được giữ … Rất vững» kit odds chip; kept card «đứng thứ nhất trong mười hai người, được chín mươi bốn phần; mốc được giữ là sáu mươi tám phần (người thứ tư)»; digits only on the ending/podium rows, as before); 1 ✓ (same formula every girl); old saves ✓ (S.selx2.cut / S.kc.soPts optional).
selx-flow «text leaks» (Fold 2, iPad 5) = «Người lạ ???» in the stage panel fog for unnamed girls — not a selx-fair line (panel fog, LIVE family); flagged for the fog owner (owner OD 24/11 ~22:14Z «một vị …»).
coop-e2e: run 1 = 141/143 — 2 rows «the same world on both seats»: R#10.inv.21.iu (an NPC item's lazy ledger id, jcoopthinf «a lazy id one phone may not have given yet»); selx-fair touches no inventory / iu code. Run 2 on the same sha: **143/143** → the run-1 diff is the known lazy-id flake (coop-host-lag family), not selx-fair.
measure selx-fair.js (900 s timeout) not re-run: a measure, not a gate; the tune numbers are unchanged from the PASSed patch.

## Videos / shots (CDN, curl 206 checked)
https://ctm-img.victoria-tntt.workers.dev/img/_review/help-housemate-lr5/fold-755x1000-onetap.webm · ipad-1180x820-onetap.webm · fold-755x1000-lr5-liveDoorBug.webm · fold-lr5-door-held.png
https://ctm-img.victoria-tntt.workers.dev/img/_review/srv-rank-lr5/fold-755x1000-onetap.webm · ipad-1180x820-onetap.webm
selx-flow shots/videos: scratch only (/home/user/wt/shots-selx), looked at (hall odds card, kept card, podium).
Wipe the two _review folders when the lands are done (python3 dev/site/cdn_sync.py --wipe-review help-housemate-lr5 / srv-rank-lr5).

## Order advice for D
Land review/door-onetap (fixes the LIVE door-card bug, BLOCKING for every door in the person view) as soon as its review passes; help-housemate and srv-rank are reachable only through doors in the person view, exactly like every other door member.

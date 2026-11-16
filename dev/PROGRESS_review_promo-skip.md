# PROGRESS — review/promo-skip (main s10 worker, session_01UV1SzhzQSFQc43nUVdpwAi)
Owner rule 16/11 06:20Z (OD last line): promotion rewards that END A LONG ROAD (story road / long quest / a son's birth) give the rank
DIRECTLY, no exam. Ordinary promotion by meeting conditions keeps the exam. A princess's birth = exam with the conditions waived.
Update 16/11 06:45Z (OD, relayed by main s10): only the FIRST prince = direct rank; later sons and every princess = exam at once
(conditions waived); seats (j30 SEATCAP) still apply — a direct reward meeting a full seat goes to ONE placeholder (owner choosing the
equivalent reward); the faction sides Thái hậu / quyền thần go through the same hook. Update 16/11 07:15Z (OD): EVERY reward has a gain AND a loss;
every winning faction side = direct rank with its own cost; full seat = «Ân chỉ chờ phong» — DROPPED by the owner 07:20Z: a full seat gives a LARGE one-off compensation instead
(below), and the next rank still needs the normal exam. Supersedes OD:L525 for sons, the 15/11 17:20Z "reward = exam" note for quest rewards, and the 16/11 06:10Z coordinator line (faction win = exam).

## Audit — every place that raises a rank or grants a promotion exam (dev/build/*.js on origin/main 0a311183)
Scan: `git grep` for exGrace, exSonUp, promoteP(, promote(), `.rank++`, `.rank=`, `rank+1`, r97rise, r97srvRk, srvRise, exSrv*, srvMerit,
e67merit, "tấn phong / sắc phong / thăng / phong làm / lên một bậc" over the 201 assembled modules; open review/* branches touching
promotion (quests, origins, story-rare, story-love, reign-road-r1b) add no new rank grant (r1b's free rank is the STOPPED duplicate).

| # | place | trigger | today | class | change |
|---|---|---|---|---|---|
| 1 | j3.js:110 `promote()` → j8 promoteP(S) (+ jexam wrapper) | her monthly decree when promoReqP rows are met | EXAM (exam row in promoReqP) | condition gate → EXAM | none |
| 2 | j8.js:416 rivalsMonth `promoteP(v)` | NPC monthly decree | EXAM (jexam exSim at the decree) | condition gate → EXAM | none |
| 3 | j30.js:12 fillSeats `promoteP(w)` | a vacant seat filled from the eligible | EXAM (must have passed) | condition gate → EXAM | none |
| 4 | j34.js:8/45 contestOpen / Tranh ghế, jbal.js:43 Hoàng hậu contest | seat contest among eligible consorts | EXAM + contest; Hoàng hậu seat its own conditions (hhNeed) | condition gate / Hoàng hậu rules | none (Hoàng hậu seat untouched) |
| 5 | j8.js:409–410 Hoàng hậu pick on a vacancy | Hoàng thượng chooses | Hoàng hậu rules | Hoàng hậu rules | none |
| 6 | j8.js:321 birthP son → jexam exSonUp | her / an NPC bears a PRINCE | DIRECT (owner 15/11 20:05Z) | FIRST prince → DIRECT; later prince → WAIVED EXAM (06:45Z) | `promoReward(p, first?"son1":"son")`: first son of that mother = direct (seat checked), later sons = exGrace(p,"m"); drops a stale exam card. LOSS (07:15Z) for the first prince: Hoàng hậu oán +son1.hhOan 15, every other mother of a prince oán +son1.momOan 8 (danger = max(ghen, oán, −thiện cảm)) |
| 7 | j8.js:322 birthP daughter → exGrace(p,"f") | bears a PRINCESS | WAIVED EXAM | princess → WAIVED EXAM | through `promoReward(p,"dau")` (same behaviour) |
| 8 | jexam exGraceUp (promoteP wrapper) | passed a grace exam | rank on pass, IGNORED seats | follows #6/#7 | seats apply: a passed grace exam waits for a free seat (retried at every decree), then the decree |
| 9 | jreign.js:247 rgMine, Hoàng thượng side WINS the reign road (Tân quân lập uy, 6 chapters ≈ 3–4 years) | court outcome "thân chính" and she backed the Emperor | WAIVED EXAM (exGrace, reign-road-r1 reviewer) | long quest → DIRECT | **promoReward(S,"emp",{fx:1})** → exDirectUp: +1 rank at once, edict feedback + jealousy, text «…hạ thánh chỉ tấn phong ngươi làm X, không qua khảo hạch.» Guards KEPT (impossible-jump guards): BAL.rg.rankCap 6 (the road never reaches the Hoàng hậu seat; exDirectUp itself stops at Hoàng quý phi) and the Sủng floor `sungFloor(rank+1)+rankSung` (below it: «ban thưởng hậu hĩnh», as before). Seat full → large compensation (promoFullSeat). LOSS (07:15Z): Thái hậu quý −BAL.psk.emp.th 8; every consort of a losing side oán +emp.oan 10. |
| 10 | jreign rgMine, Thái hậu / quyền thần side wins | court outcome | no rank (che chở / Bạc + house) | long quest → DIRECT (07:15Z) | `promoReward(S,"th"|"quyen")` (cap rankCap, seats apply). Thái hậu side: decree «Thái hậu tâu xin» + the old che chở; LOSS Sủng −th.sung 6 + th.errN 2 Thái hậu errands (j72 việc nhờ, first after 3 tuần, then every 6). Quyền thần side: «triều thần dâng sớ tiến cử» + the old Bạc / house power; LOSS Danh −quyen.danh 6 + strike-back armed: after 24 months, 6 % a month (once): Sủng −10, Danh −6 «Bệ hạ đã lớn, nhớ chuyện cũ…» |
| 11 | j97.js:29–30/177–189 r97rise / r97srvRk (cnv servant story roads) | end of a servant story road | DIRECT decree (incl. «phá lệ» straight to Quý nhân, j97:185) | long quest → DIRECT | none |
| 12 | j42.js:294 srvRise «Hoàng thượng để mắt» (maid → Đáp ứng) | imperial pick event | DIRECT decree | imperial pick (owner 15/11 20:05Z: decree) | none |
| 13 | j42.js:196 srvMonth merit → servant rank | Công lao reaches the bar | EXAM (exSrvGate) | condition gate → EXAM | none |
| 14 | j42.js:284 «Ở lại làm ma ma» | servant career end choice | EXAM (exSrvMama, owner 20:05Z) | owner-ruled exam | none |
| 15 | j14 servRanks, NPC servants | merit gate | EXAM (exSrvNpc) | condition gate → EXAM | none |
| 16 | j67.js:1368–1369 servant arc «Ngày khảo việc» endings win / win2 («được ma ma tiến cử lên làm đại cung nữ», «Ma ma nâng ngươi lên một bậc») | end of a Mệnh truyện servant arc | only Công lao +10 / +6, then the Nội vụ phủ EXAM (#13) — the text promised a rank it did not give | story-road reward → DIRECT | **new j67 `e67srvUp(n)`**: servant rank +1 at once (cap srvMax of her palace, no exam; at the cap it falls back to Công lao +n). win text → «tiến cử lên một bậc» (the real next rank is named in the log). The other e67merit endings (praise / tiến cử with the Emperor) say no rank and stay Công lao. |
| 17 | j14.js:24 cold-palace release, j7.js:150 / j8.js:441 pardon | leaving lãnh cung | restore to Đáp ứng | not a promotion | none |
| 18 | j71 «xét công» | shortens the wait for the next decree by 1 month | helper of #1 | condition gate | none |
| 19 | j4 origin roads, j67 MS67 chapter goals | goals READ the rank («Lên bậc Phi», «Được tấn phong một bậc») | no grant | n/a | none |
| 20 | j99succ.js:202 succDebug | debug jump | n/a | n/a | none |

Never past the Hoàng hậu rules: exDirectUp returns "" at rank ≥ 6 (Hoàng quý phi) and in lãnh cung; the seat (#4/#5) keeps hhNeed + its contest.

## The one hook (jexam)
- `PROMO_SRC` = {son1:direct, son:grace, dau:grace, emp:direct, th:direct, quyen:direct}; `promoReward(p,src,o)`: none → ""; grace → exGrace;
  direct → seatFree(next)? exDirectUp : promoFullSeat; then `promoCost(p,src)` (the loss). Same rule for NPC consorts. Servant ranks
  (#11, #16) have no seats and stay outside the hook.
- Full seat (promoFullSeat, owner 07:20Z): rank unchanged; one-off Bạc = seat.bacM 4 × the next rank's monthly stipend (BAL.pay), Danh +6,
  2 × Hoàng thượng's bestow (rare gifts), a phong hiệu (or Bạc +120 if she already has one), her house power +8 (father +5). LOSS: every consort
  ghen +10 (an NPC winner: the others oán +6). Her p.ex is untouched: the next rank goes through the normal exam.

## Gain / loss table (BAL.psk, jbal2.js)
| source | gain | loss |
|---|---|---|
| first prince (son1) | +1 rank, no exam | Hoàng hậu oán +15; each other mother of a prince oán +8 |
| later prince / princess | exam at once, conditions waived | (the exam itself) |
| Hoàng thượng side wins | +1 rank (Sủng floor + rankCap kept), Sủng +winSung×k, Danh +6 | Thái hậu quý −8; each consort of a losing side oán +10 |
| Thái hậu side wins | +1 rank, Thái hậu +winTh×k, che chở 6 months | Sủng −6; 2 Thái hậu errands (việc nhờ) |
| quyền thần side wins | +1 rank, Bạc, Tai mắt +1, house power | Danh −6; strike-back after 24 months, 6 %/month once: Sủng −10, Danh −6 |
| full seat (any direct reward above) | instead of the rank: Bạc 4 × next rank's stipend, Danh +6, 2 rare gifts, phong hiệu (or Bạc +120), house power +8 / father +5; then the normal exam | every consort ghen +10 (NPC winner: others oán +6) — plus the source's own loss |

## Files
- jexam.js: `exDirectUp`, `promoReward`, `promoCost`, `promoFullSeat`, `promoMonth` (rivalsMonth wrapper: Thái hậu errands, strike-back); a passed grace exam waits for a free seat.
- jreign.js: all three winning sides through promoReward; header note. jbal2.js: BAL.psk (every gain/loss number) + BAL.rg comment.
- j67.js: `e67srvUp(n)` for the two servant-arc endings that promise a rank.
- j8.js birthP: son / daughter through promoReward.
- dev/test/promo-skip.js (new, 12 checks): first prince direct + mothers' oán; later prince / princess grace; each faction side direct + its loss; full seat → compensation (Bạc, gifts, phong hiệu, family) + jealousy, next rank still by exam; grace waits for a seat; strike-back.
- dev/test/reign.js: emp win = rank +1, no grace / window / card, text «không qua khảo hạch» (replaces the old "exam grace" check).

## Tests
- dev/test/reign.js 755x1000 PASS, 1180x820 PASS (outcome texts carry the decree + its loss).
- dev/test/promo-rules.js (755x1000@2, 844x390@3): all PASS (son direct, daughter waived exam, servant exams, chests).
- dev/test/promo-exam.js 755x1000@2: all PASS except «old save loads: exam state created…» which FAILS identically on the BEFORE build
  (origin/main) — pre-existing, not from this branch (the test expects an old build without jexam as its 2nd arg).
- dev/test/promo-next-rank.js: every rank ok, errors none.
- dev/test/promo-skip.js: 11/11 PASS. Thái hậu errand probe: promoMonth offers a «Việc nhờ» from the Thái hậu; when j72's monthly limit is full it retries.
- e67srvUp in-page probe: rank 0→1 with mp reset; at the cap → Công lao +6; risen consort → nothing.

## Balance
Harness: dev/measure/reign.js (full inpage6 "sens" bot, side policy, 80 months, seeds 0..N−1, same seeds before/after). BEFORE = origin/main
0a311183 (emp win = exam grace; th/quyen no rank). AFTER = this branch (final code, full-seat compensation). Machine quiet, 4 cores, PAR 4.
| side bot | build | n | dead | her side won / lost | rank at end (all) | rank at end (her side won) | Hoàng hậu | Thái hậu | Sủng | Danh |
|---|---|---|---|---|---|---|---|---|---|---|
| Hoàng thượng | before | 40 | 6 | 22 / 12 | 4.22 | 4.86 | 8 (20 %) | 81 | 89 | 84 |
| Hoàng thượng | after | 40 | 8 | 26 / 6 | 4.28 | 5.31 | 8 (20 %) | 74 | 84 | 79 |
| Thái hậu | before | 20 | 6 | 8 / 5 | 2.60 | 3.62 | 2 | 67 | 78 | 76 |
| Thái hậu | after | 20 | 3 | 5 / 11 | 4.40 | 4.60 | 0 | 83 | 94 | 87 |
| quyền thần | before | 20 | 5 | 13 / 2 | 3.90 | 5.15 | 2 | 73 | 85 | 79 |
| quyền thần | after | 20 | 4 | 16 / 0 | 4.00 | 4.75 | 3 | 80 | 85 | 82 |
Reading: 0 page errors in 160 lives. The court outcome (who wins) is the same rule before/after; its spread between runs is sample noise
(n 20 → ±11 points per share). Hoàng thượng side (n 40): winners end ≈ +0.45 rank higher, the Hoàng hậu rate is unchanged (20 %), Thái hậu
favour −7 on average (the loss works). Thái hậu / quyền thần sides: n 20 is too small to separate a +1 rank from noise; no sign of a jump to
Hoàng hậu (rankCap 6; the seat keeps its own rules). 
Per-origin Hoàng hậu rate — the original origin harness (dev/measure/run5b.sh: runb.js sens + inpage6 + inx/inpz, 9-origin rotation, HHSTOP,
5 shards × 6 = 30 lives per build; summary anx.py):
| build | n | Hoàng hậu | early death | median years to HH | per origin n/HH/died |
|---|---|---|---|---|---|
| before (main) | 30 | **43 %** (13) | 30 % | 7.6 | ch 3/1/1 · cn 4/3/1 · cnv 2/1/0 · dtq 5/3/1 · muoi 2/0/2 · nc 3/1/1 · td 1/0/0 · thd 5/3/2 · tt 5/1/1 |
| after (branch) | 30 | **47 %** (14) | 30 % | 7.1 | ch 4/2/1 · cn 3/1/1 · cnv 3/0/2 · dtq 4/3/1 · muoi 4/2/2 · nc 3/1/0 · td 2/2/0 · thd 3/1/0 · tt 4/2/2 |
At n = 30 one life = 3 points and the 95 % band is about ±17 points: +4 points (one life) is NOT a measurable change. Note: the BASE build is
already at 43 %, above the owner band 20–40 % (BALANCE_REPORT final was 33 %); that drift comes from main before this branch, not from it.
Per-origin cells hold 1–5 lives and cannot be read on their own.
PROPOSAL (not applied, rule unchanged): if the coordinator wants the overall rate back inside the band, the lever is on main's base balance
(e.g. BAL.hz / outQ, as in BALANCE_REPORT), not the long-road rewards. If a promo-skip-specific cap is wanted later: (a) BAL.rg.rankCap 6 → 5
(faction road never makes Hoàng quý phi), or (b) son1 direct only up to Phi (rank ≤ 4) and a waived exam above. Both are one-number changes.

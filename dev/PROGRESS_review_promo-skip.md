# PROGRESS — review/promo-skip (main s10 worker, session_01UV1SzhzQSFQc43nUVdpwAi)
Owner rule 16/11 06:20Z (OD last line): promotion rewards that END A LONG ROAD (story road / long quest / a son's birth) give the rank
DIRECTLY, no exam. Ordinary promotion by meeting conditions keeps the exam. A princess's birth = exam with the conditions waived.
Supersedes OD:L525 for sons, the 15/11 17:20Z "reward = exam" note for quest rewards, and the 16/11 06:10Z coordinator line (faction win = exam).

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
| 6 | j8.js:321 birthP son → jexam exSonUp | her / an NPC bears a PRINCE | DIRECT (owner 15/11 20:05Z) | long road → DIRECT | now through the shared helper `exDirectUp(p,why,o)`; same text; also drops a stale exam card of the old rank |
| 7 | j8.js:322 birthP daughter → exGrace(p,"f") | bears a PRINCESS | WAIVED EXAM | princess → WAIVED EXAM | none |
| 8 | jexam exGraceUp (promoteP wrapper) | NPC passed a grace exam | rank on pass | follows #7 | none |
| 9 | jreign.js:247 rgMine, Hoàng thượng side WINS the reign road (Tân quân lập uy, 6 chapters ≈ 3–4 years) | court outcome "thân chính" and she backed the Emperor | WAIVED EXAM (exGrace, reign-road-r1 reviewer) | long quest → DIRECT | **exDirectUp(S,"Bệ hạ nhớ công phò tá",{fx:1})**: +1 rank at once, edict feedback + jealousy, text «…hạ thánh chỉ tấn phong ngươi làm X, không qua khảo hạch.» Guards KEPT (impossible-jump guards): BAL.rg.rankCap 6 (the road never reaches the Hoàng hậu seat; exDirectUp itself stops at Hoàng quý phi) and the Sủng floor `sungFloor(rank+1)+rankSung` (below it: «ban thưởng hậu hĩnh», as before). No seat-count check, the same as the son's decree. |
| 10 | jreign rgMine, Thái hậu / quyền thần side wins | court outcome | no rank (che chở / Bạc + house) | not a promotion | none (the 06:10Z "exam for every side" line was never built and is superseded) |
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

## Files
- jexam.js: `exDirectUp(p,why,o)` (one helper for every long-road decree), exSonUp = exDirectUp(p,"mừng hoàng tử"); header note.
- jreign.js: Hoàng thượng-side win = exDirectUp; header note. jbal2.js: BAL.rg comment.
- j67.js: `e67srvUp(n)` for the two servant-arc endings that promise a rank.
- dev/test/reign.js: emp win = rank +1, no grace / window / card, text «không qua khảo hạch» (replaces the old "exam grace" check).

## Tests
- dev/test/reign.js 755x1000 ×3 PASS, 1180x820 PASS.
- dev/test/promo-rules.js (755x1000@2, 844x390@3): all PASS (son direct, daughter waived exam, servant exams, chests).
- dev/test/promo-exam.js 755x1000@2: all PASS except «old save loads: exam state created…» which FAILS identically on the BEFORE build
  (origin/main) — pre-existing, not from this branch (the test expects an old build without jexam as its 2nd arg).
- dev/test/promo-next-rank.js: every rank ok, errors none.
- e67srvUp in-page probe: rank 0→1 with mp reset; at the cap → Công lao +6; risen consort → nothing.

## Balance (see below; filled after the bot runs)

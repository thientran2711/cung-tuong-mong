# maid-ladder-6 — six-rung maid ladder + «Ma ma» stay-on chip (worker report)

PRIORITY #1 CHECK ('tam đẳng','nhất đẳng','SRK.maid','srvBar'): OD 1 (OD 19/11 ~01:26Z, L1939) + L1935 (ma ma question) | ledger 0 | claims 0 | main j14.js:34 SRK.maid (5 rungs), jbal2.js:17 srvBar/srvCd, jexam exSrv*, j42 cnv road | review/* 0 | reused: reports/hist-mama-ladder.md (expert, law 8), kit part kitTiers (j79:78) for the ladder display.
START_CTX ~10 %. Branch review/maid-ladder-6 from origin/main b1c3631e, final-merged LIVE 1cf5e8bb.

## Owner words (verbatim, OD 19/11 ~01:26Z)
"Cung nữ chia là thô sử, tam đẳng, nhị đẳng, nhất đẳng, nhất đẳng là đại cung nữ như giờ"

## New ladder (SRK.maid, j14)
| idx | old (5 rungs) | new (6 rungs) |
|---|---|---|
| 0 | Cung nữ thô sử | Cung nữ thô sử |
| 1 | Cung nữ | Cung nữ tam đẳng |
| 2 | Đại cung nữ | Cung nữ nhị đẳng (NEW rung) |
| 3 | Chưởng sự cô cô | Cung nữ nhất đẳng (= Đại cung nữ, shown as «Cung nữ nhất đẳng · Đại cung nữ» on the ladder) |
| 4 | Nữ quan | Chưởng sự cô cô |
| 5 | — | Nữ quan |
| (6) | ma ma = exam index 5 | ma ma = exam index 6 (BAL.srvRk.mama), shown as the 7th tier «Ma ma» stay-on chip |

Named rung indices live in BAL (one core, law 4): `BAL.srvRk = {tam:1, nhi:2, dai:3, cs:4, nq:5, mama:6, tier:[0,1,1,2,3,4]}`.
`tier` = the old 5-step standing used ONLY for art / frame / colour / leaderboard / greeting order (tam + nhị share the present «Cung nữ» robe, frame and colour — art default from the brief); helper `srkTier(rung)`.

## OLD SAVE MIGRATION (exact mapping)
Run once on load when the save lacks `S.lad6` (new games are born with `S.lad6=1`):
- every maid rank in the save (S.srv.rk, S.srv.rk0, S.srv.ex.to when numeric, S.rk.sr + the "s" trail of the leaderboard tracker, and every object with role "maid" and a numeric rk anywhere in S / rivals — staff, S.maid, rivals' maids, named posts): **old 0 → 0, old 1 → 1, old 2 → 3, old 3 → 4, old 4 → 5** (rk ≥ 2 → +1). Old «Cung nữ» (1) becomes tam đẳng; nobody lands on nhị đẳng by migration.
- eunuch ranks untouched; ma ma flag (S.srv.mama) untouched.

## STEP 0 — touch points (file:line on b1c3631e) and the change
| # | file:line | what | change |
|---|---|---|---|
| 1 | j14:34-36 | SRK.maid, srk() | 6 names; srkTier() helper; migration fn srvLad6() |
| 2 | j14:37 srkMax | maid cap by master rank 2/3/4 | BAL.srvRk.dai/cs/nq (3/4/5) |
| 3 | j14:41,44 | upkeep + sale roll at srk ≥ 2 (both roles) | maids read the tier (same money as today) |
| 4 | j14:49, j10:117, j15:70, jagacts3:174 | «Chưởng sự tra xét» needs maid srk ≥ 3 | ≥ BAL.srvRk.cs |
| 5 | jbal2:16-17 | BAL.ex.srvBar/srvCd idx 1..4 + 5 ma ma | +1 rung: [0,18,19,20,22,24,24] / [1,1,1,1,2,2,3] |
| 6 | jexam:233,273,275 | exSrvIx (mama 5, clamp 4), NPC exam clamp 4 + fallback arrays | BAL.srvRk.mama / .nq; no private fallback arrays |
| 7 | j42:18 CNV_WAGE | wage by rung [1,3,5,8,12] | moved to BAL.srvWage [1,3,4,5,8,12] |
| 8 | j42:48 SRVA.books.rk 3 | books chore from chưởng sự | BAL.srvRk.cs |
| 9 | j42:121,206,270,271,276,462 | Đại cung nữ gates (rk ≥ 2) + texts «chỉ/cần Đại cung nữ» | ≥ BAL.srvRk.dai, text from SRK |
| 10 | j42:409,463 | ma ma choice hi = rk ≥ 3; exit row text | ≥ BAL.srvRk.cs; expert wording «từ Chưởng sự cô cô trở lên, đỗ khảo hạch, được ở lại làm ma ma» |
| 11 | j42:466 srvRoadHTML | Thân phận cung nữ tab | + kitTiers ladder: 6 rungs + «Ma ma» stay-on tier (law 9 kit part) |
| 12 | jagstaff:172 | NPC maid ma ma option srk ≥ 3 | ≥ BAL.srvRk.cs (law 1: same rule as hers) |
| 13 | jworld2:182 (+comments 180-181, jbal2:1129) | đại phóng cung nhân spares rk ≥ 3 | ≥ BAL.srvRk.cs |
| 14 | jkiep:14,53 | kiếp milestone «lên Chưởng sự cô cô» rk ≥ 3 | ≥ BAL.srvRk.cs |
| 15 | jst14:41 | goal «Được thăng Đại cung nữ» rk ≥ 2 | ≥ BAL.srvRk.dai, name from SRK |
| 16 | j97:29,178,182,190 | r97srvRk clamp 4, calls 3/4 (Chưởng sự / Nữ quan) | BAL.srvRk.nq / .cs |
| 17 | jrd_cnv:894 / jbalroad | BAL.road.cnvMaRk 3 (chưởng sự seat) | 4 |
| 18 | jpromo:41-43,97,101 | promo chest by rung, ma ma 5 | +1 row for nhị đẳng, ma ma = BAL.srvRk.mama |
| 19 | jpromsv:14 BAL.sp.head.maid 3 | head servant = chưởng sự | 4 |
| 20 | jaudit:43 BAL.dbCost (by srk+1) + text 58-59 | cost to raise / effect text | +1 rung [0,20,30,40,80,120]; texts by srvRk / tier |
| 21 | jbal2:219,225 BAL.mline eye[rk], offRank 2 | Emperor's eye by rung | eye [.1,.25,.4,.6,1,1.2], offRank 3 |
| 22 | jbal2:400 U2 m.rk 5 per rung | maid test stat | 4 (top stays 20) |
| 23 | jagknow:339 tm.post 3 | "wants a post" below chưởng sự | maids: BAL.srvRk.cs |
| 24 | jbal:245-251 BAL.staff.posts rk 4/3/4 | named ma ma / cô cô | 5/4/5 (comment) |
| 25 | j60:40,63 / j3:11 pMaid sv2 / j59:20,42 / jhouse:17 / j92:20 / jk2b:354 / j88:46,48 | art, frames, colours, silk, portrait pick by rank | read srkTier (tam + nhị share the «Cung nữ» art); S.maid default rk 2 → BAL.srvRk.dai |
| 26 | jgreet:19,22 | bow order by rank | R.srv + tier |
| 27 | jrank:37,40 (+ server rank/worker/src/score.js servant 0..4) | leaderboard sr | client sends the tier (server unchanged, no deploy) |
| 28 | jk4:709, jkitpage:44-53 | title colour regex, kit sample page names | + «nhất đẳng / nhị đẳng / tam đẳng» names |
| 29 | j6:75 load | old save | srvLad6() before normAll; j2 new game S.lad6=1 |

## FOR C (Foreman B relays)
FOR C: maid-ladder-6 splits the old «Cung nữ» rung into «Cung nữ tam đẳng» + «Cung nữ nhị đẳng» (and Đại cung nữ is now «Cung nữ nhất đẳng»). Default shipped: tam + nhị đẳng share the present «Cung nữ» robe / frame-maid-1 / colour (BAL.srvRk.tier). Do tam đẳng and nhị đẳng need their own robe (or only a colour step)? If yes, list the pictures and B wires them by changing BAL.srvRk.tier only.

## Done (all 29 touch points above changed as listed)
Extra, found while working: j42 HUD help line «Bậc cung nữ: Cung nữ → Đại cung nữ → Chưởng sự cô cô» (HX.srk) now prints the whole SRK ladder + the ma ma rule; j79 KIT_RP_TITLES paints «Cung nữ tam/nhị/nhất đẳng» as one title; wage on the ladder written «N bạc mỗi tháng» (the date painter turned «Lương tháng 1 bạc» into «tháng giêng»).
Load order: BAL.srvRk + BAL.srvWage live in jbal.js (loads before j42, which reads them at top level).

## Scan (law 11) — before / after
Scan: `grep -rnoE "SRK\.maid\[[0-9]\]|srv\.rk\s*[<>=]=?\s*[0-9]|srk\([a-z]+\)\s*[<>=]=?\s*[0-9]|\.rk\|\|0\)\s*[<>=]=?\s*[0-9]|\"sv[0-9]\"" dev/build` (maid context).
| | before | after |
|---|---|---|
| typed maid-rung numbers (rk>=2 / >=3 / min(4) / sv2 / mama 5 / private fallback arrays) in maid code | 32 sites (rows 1–29 + jexam:272 NPC exam tier clamp) | 0 — the broad scan now lists only unrelated clamps (item grades, pips, timers) + rk>=1 «not thô sử» + rk 0/1 starts; eunuch srk>=3 in j8 kept (eunuch ladder unchanged) |
| rung tables in BAL with one entry per rung | 5 entries (srvBar/srvCd 6 incl. ma ma) | 6 (+ ma ma = 7): srvBar, srvCd, srvWage, mline.eye, dbCost, promo.srv |
| private fallback arrays (jexam NPC `B.srvBar||[...]`) | 2 | 0 |

## Gates
- `node dev/test/maid-ladder-6.js <new> <live> <out> 755x1000@2 1180x820@2` → **PASS 13/13** (6 rungs, lad6 on new life, every rung table sized, month promotion tam → nhị đẳng, ma ma choice only from Chưởng sự/Nữ quan, household cap 3..5, art tier, NPC exam on srvBar[5], migration 0→0 1→1 2→3 3→4 4→5 once + eunuch kept, LIVE-build maid save loads (Đại cung nữ → nhất đẳng, staff mapped, a month plays), Thân phận ladder 6 + Ma ma, hers marked, no overflow on both devices).
- `bash dev/tools/quickcheck.sh` (on 8aae6b15) → **QUICKCHECK PASS** · old save ok · core gates PASS (one-core-guard PASS, inline 3987 < baseline 4212) · perf new/live render 206/193 ms.
- `node dev/test/coop-e2e.js` → **63/63 passed** (incl. seat swap). Co-op: the ladder is code + BAL (same on both seats) and the rung lives in the host S (migrated on the host load, guests receive lad6 = 1), so both seats read the same host value.
- `promote-servants.js` (updated: rk 2 → BAL.srvRk.dai, names nhất đẳng, cost read via the rung) → 1 FAIL «NPC: a proud servant … leaves» = **same FAIL on live main** (pre-existing, not this job).
- `promo-rules.js` → 1 FAIL «844x390@3 reveal» = same on live main. `promo-exam.js` → «old save loads: exam state» FAIL = same on live main (consort exam).
- `player-dress.js` (updated: 6 rungs, dress by tier) → BAD 56/146 vs live BAD 52/138: the SAME missing dress pictures (faces lacking tm4 / tm2 sets), renumbered by the new rungs; no new art fault.
- Shots (CDN, review only): img/_review/maid-ladder-6/fold-755x1000.png, ipad-1180x820.png — looked at: ladder Bậc 1..6 + «Ở lại · Ma ma», hers «đang ở», wage words correct, no clipping.

## Open for main / reviewer
- FOR MAIN: leaderboard server (rank/worker/src/score.js) still has 5 servant steps; the client sends the tier (tam + nhị both shown «Cung nữ» on the board). A 6-step board needs a worker deploy — not done here.
- Bow order (jgreet) and Emperor's-eye table: tam/nhị đẳng share the «Cung nữ» bow rank (tier); eye has its own value .4 for nhị đẳng.

## REVIEW r1 (independent opus reviewer, 11/19/2026) — PASS after 3 reviewer fixes
PRIORITY #1 CHECK ('tam đẳng','srvLad6','prSeen','srvMax'): OD 1 (19/11 ~01:26Z) | main 1cf5e8bb (no 6-rung ladder) | review/* only review/maid-ladder-6 | claims worker session_01N1tNP6uwmf4WjfcYZ2eBKe. Branch review/maid-ladder-6-r1 = cb5a7cb3 + r1 fix; descends current origin/main 1cf5e8bb (final merge: already up to date).

Laws touched: 1 (NPC maids same ladder, same gates, NPC exam/ma ma choice read BAL.srvRk) PASS · 4 (every rung number in BAL.srvRk / srvBar / srvCd / srvWage / dbCost / mline.eye / promo.srv) PASS after fix 2 · 5 (bar 18/19/20/22/24/24, wait 1/1/1/1/2/2/3, merit need (rk+1)×srvMp: every step ≥ the one below) PASS · 6c (no item from nowhere) FAILED before fix 1 · 7 (wording: «Bậc n», «N bạc mỗi tháng», «Tức Đại cung nữ», no %) PASS · 9 (ladder = kitTiers in .kpsec/h4.kpst, KIT.md §kitTiers; «Ma ma» = 7th kit tier) PASS · 11 (my own scan, below) PASS after fix 2 · 12 (Fold 755x1000@2 + iPad 1180x820@2, looked 3×) PASS.

### Found and fixed on review/maid-ladder-6-r1 (small, reviewer-made)
1. OLD SAVE DUPLICATE REWARD (law 6c, migration): `srvLad6` moved her rung but not the promo-chest tracker `S.prSeen.s` (jpromo). Every old maid save at Đại cung nữ or above got its rung chest AGAIN on first load (old 2→3: áo lụa mộc + trâm đồng again; Nữ quan; old ma ma 5→6: y_mama again). Probe on cb5a7cb3: chests 1/1/1; after fix 0/0/0. Fix: j14 srvLad6 also does `S.prSeen.s = up(S.prSeen.s)`. Test maid-ladder-6.js migration step now checks prSeen moved + 0 chest (it FAILS on cb5a7cb3, PASSES on r1).
2. Two typed rungs missed by the worker's scan (law 4/11): j42 `srvMax()` no-master fallback `2` and j67 `e67srvUp` fallback `2` (old 2 = Đại cung nữ, now = nhị đẳng) → `BAL.srvRk.dai`.

### Reviewer scan (law 11): every SRK.maid / srv.rk / rk0 / srk( / srkName / srkMax / srvMax / prSeen / staff.posts / jrank / jexam / frame / colour use in dev/build (all.js excluded)
Typed maid-rung numbers left: 0 (after fix 2). Kept on purpose: rk>=1 «not thô sử», rk 0/1 starts, eunuch srk>=3 (j8, eunuch ladder unchanged), j9 sentPen srk×3 (scale, not a gate). Stored rung indices in a save: S.srv.rk/rk0/ex.to, S.rk.sr + "s" trail, every role-maid object (staff, S.maid, posts), S.prSeen.s (fix 1) — all migrated.

### Gates (on r1 3febc230)
- `dev/tools/quickcheck.sh` → QUICKCHECK PASS · old save ok · core gates PASS (one-core-guard, rules-one-source, kit-conform, coop-one-world) · perf new/live render 163/173 ms.
- `node dev/test/maid-ladder-6.js` (new vs LIVE 1cf5e8bb, 755x1000@2 + 1180x820@2) → PASS 13/13.
- `node dev/test/coop-e2e.js` → 63/63; `COOP_SWAP=1` → 63/63.
- Reviewer co-op OLD ROOM probe (scratch, live Worker): room made on LIVE 1cf5e8bb (host consort, guest maid at old Đại cung nữ, host NPC maids spread 0..4) → both seats reopened on the new build → host and guest see every NPC maid at the same migrated rung (12/12), guest maid 2→3 nhất đẳng, lad6 on both; after one played week and after a second reload of both: still 12/12, no second shift.
- LOOK: Fold 755x1000@2 + iPad 1180x820@2, Thân phận tab at nhị đẳng and Chưởng sự cô cô: 6 rungs + «Ở lại · Ma ma», «đang ở» on hers, capped rung reads «Cung chủ phẩm này chưa cho lên tới bậc này», no clipping / overflow. Shots in scratch only (not in git, not on CDN).
- Note (not this job): the worker's own Fold ladder shot is covered by a promotion chest the test itself queues (step 6 jumps her rung) — test artefact, not a game fault.

FOR C and FOR MAIN lines: present above (unchanged).
VERDICT: READY FF 3febc230 → final sha below (descends origin/main 1cf5e8bb).

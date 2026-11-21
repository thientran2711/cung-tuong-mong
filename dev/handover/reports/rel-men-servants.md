# rel-men-servants (KP22 «Ân oán» Nam nhân + Cung nhân) — worker report

PRIORITY #1 CHECK: OD 5 hits on «Ân oán» (L256 tab restructure, L357 picker, L900 picker space, L1929 picker compact) | ledger #23, #71 (LIVE) | main jhc.js relGrp/relPerson/hcRelHTML (me/emp/th/rivals only), j9 aff/oan; men/servant stores already in code: m.af / m.afw (j22), s.af (j10, jagstaff, j72), c.af (j10 court), S.srv.af (j42), m.grudge (jmen), s.grudge (j24), s.bullyBy (jagstaff) | review/* none | claims: kit-fig2-left (report only, DONE).

Owner lines (verbatim):
- OD:L256 "(06:00Z) Owner: tab restructure. Hậu cung = people in the palace: [Hoàng thượng · Thái hậu | Phi tần | Nam nhân | Cung nhân]. The old main tab 'Cung nhân' is renamed 'Giao tình' (coordinator named it) containing [Ân oán | Phe phái]. Replaces the 05:35Z decision. review/hau-cung-ui; tell the tutorial worker."
- OD:L357 "(07:10Z) Giao tình › Ân oán: the person picker uses small tabs + the kit horizontal people strip like Hậu cung, not a grid of big buttons."
- Ledger #23 "Men tab / tab restructure: Hậu cung [Chí tôn · Phi tần · Nam nhân · Cung nhân]; Giao tình [Ân oán · Phe phái]" (LIVE); #71 "People strip names only; third-person words; Ân oán tabs; figure ≥95%" (LIVE).

## What (branch review/rel-men-servants, from origin/main eb11e2ad)
1. ONE model (law 14), j9: `aff / oan / affAdd / oanAdd` now cover men and servants. Nothing new is invented: a man / servant reads and writes the stores the game ALREADY writes (m.af = his regard for her, m.afw[id] = for a consort; s.af.me / S.srv.af[sid] (servant road) / s.af[sid] servant↔servant / c.af[id] court). New only: their oán numbers (h.oan toward her, h.ro[key] toward others) and her / consorts' maps toward them (S.rl / S.ro / v.rl / v.ro keyed "m<n>" / "s<sid>" / j61 key) — so every pair is two-way (law 1). Key rules: `relKey`, `relHk` (no sid/consort-id collision: servants keep consorts as "r<id>").
2. Sources (law 6b, only real deeds) → table below. Numbers in BAL.relMS (law 4: hail 5, grudge 40, grudge2 20, srvGrudge 30, bully 20, threat 30, bribe 10). Fade = the shared BAL.oanFade × nết forgive (j28 oanMonth now also runs men + servants). Caps = the shared −100..100 / 0..100. The shared modifiers (mood, trust, slight…) apply to them as to everyone (so e.g. a grudge of 40 lands as 32–40).
3. Ân oán (jhc): GR = Ta · Chí tôn · Phi tần · Nam nhân · Cung nhân, relGrp by key. Nam nhân = the men she has met (menMet, the Nam nhân tab's rule); Cung nhân = the Hậu cung › Cung nhân tab's own list (trusted maid, household, court officials, Thái hậu's household, other palaces' servants). Kit parts unchanged (kitSubTabs, pager strip, kitRel2, kitNameRank). Rows: Thiện cảm + Oán both ways; a servant → her master also shows «Lòng» (kitRel2 kind pos). Strangers (j61 not known: "Người lạ" + silhouette) → their side «chưa rõ». Chí tôn ↔ men/servants: no pair (no store; the Emperor's / Thái hậu's rows are Sủng / thiện cảm toward consorts).
4. Old saves (normAll, once, S.relMSv): oán filled ONLY from what the save recorded: m.grudge (+grudgeN>0) → BAL.relMS.grudge; s.grudge → srvGrudge toward the owner; s.bullyBy → bully. Regard already lives in m.af / s.af (shown at once).
5. Co-op: his oán toward her (`oan`) added to MEN_P (personal, like af); m.afw / m.ro (toward consorts, other men) are world fields (host truth, same on both seats); her own maps are per seat. Pre-existing, not widened: court / Thái hậu servants' `af.me` is one "me" for both seats.

## Sources (deeds involving a man or a servant)
| # | Deed (file) | Before | Now |
|---|---|---|---|
| 1 | Greet a man, her / NPC consort (j22 manHail) | m.af +5 / m.afw +5 one way | relAdd(p,m,BAL.relMS.hail): both ways |
| 2 | Servant road greet a man (j42) | m.af + SRVA.hail.af | relAdd both ways |
| 3 | Report a man (jmen menReport: executed / beaten+banished / banned) | m.grudge (no number) | oanAdd(m, reporter, grudge) on every branch where he is punished; guard shamed: grudge2 |
| 4 | Threaten a man, he refuses (jmen Uy hiếp) | m.grudge="me", m.af −20 | + oanAdd(m,S,grudge) |
| 5 | Hide a man / look away / overhear / he pays (jmen) | m.af ± | unchanged (already in the model) |
| 6 | Punish a servant without cause (j24 judgeServ) | s.grudge=1 | + oanAdd(s,S,srvGrudge) |
| 7 | Servant bullies a servant (jagstaff nvp) | s.bullyBy | + oanAdd(victim,bully,bully) |
| 8 | Servant ↔ servant chat / gift (jagstaff), j10 seeded friends | s.af[sid] both ways | unchanged (in the model) |
| 9 | Threaten a servant over đối thực (j10 threatServ ×2), servant road blackmail (j42 cnvBlackOpts) | spyFor | + oanAdd(servant, threatener, threat) |
| 10 | Bribe taken (j29 bribeServ, jagknow tmTry, j42 cnvBribe take) | spyFor | + affAdd(servant, giver, bribe) |
| 11 | Gifts / talks to servants & court (jstaff bieu/hoi, j10 courtAct, j21, jthaiy, j72, jcycle) | s.af.me / c.af.me | unchanged (in the model) |
| 12 | Servant road colleagues (j42 srvAf, chat, gift, frame) | S.srv.af | unchanged (in the model) |
| not used | men's revenge rumour (jmen menGrudge): source unnamed («đám thị vệ») → her oán would need real proof (law 6a) | — | no write |

## Screens that show these relations (law 11 scan)
| Screen | Before | After |
|---|---|---|
| Giao tình › Ân oán | Ta · Chí tôn · Phi tần only | + Nam nhân, Cung nhân via aff/oan |
| Man card (j22 manCard, Hậu cung › Nam nhân) | «Ngươi quý hắn: m.af» (WRONG: every deed writes HIS regard) + «Hắn quý ngươi: tình ý word» | Hắn quý ngươi / Ngươi quý hắn = aff both ways, Hắn oán / Ngươi oán (when > 0), tình ý on its own line «Tình ý: …» |
| Court official card (j15) | c.af.me | aff(c,S) (same value) |
| Servant road men row (j42) | m.af ≥ 10 | aff(m,S) ≥ 10 |
| Servant cards (j15 bondBars) | Lòng / Chủ tin | unchanged (master bond, shown as «Lòng» in Ân oán) |

## Tests (worktree /home/user/wt/relms)
- NEW dev/test/rel-men-servants.js: 22/22 PASS (×3 runs): forced deeds both ways (D1–D4), fade (D5), old save once (D6), groups + rows on Fold 755x1000@2 and iPad 1180x820@2 (U1, U2), stranger «chưa rõ» (U4), man card = same numbers (U3), MEN_P has oan (C1), no page errors.
- one-core-guard PASS (after moving the greeting 5 into BAL.relMS.hail).
- QUICKCHECK on ab189e51 (origin/main 983a9436 merged): PASS · core gates PASS · old save from live loads and plays · perf new/live render 234/256, tab 577/607, buổi 1812/2236 ms, tasks>200 24/25. (First run on 1ef9f865 failed only G1: the greeting 5 typed in j22 → moved to BAL.relMS.hail.)
- coop-e2e 68/68 PASS · coop-home 51/51 PASS (first run died in its own wait helper st() line 90, rerun clean; not touched by this branch) · undef-scan PASS (253 names) · one-core-guard PASS.
- Shots (Fold 755x1000@2 + iPad 1180x820@2, each looked at 3×): https://ctm-img.victoria-tntt.workers.dev/img/_review/rel-men-servants/ rms-man-755x1000.jpg, rms-man-1180x820.jpg, rms-srv-755x1000.jpg, rms-srv-1180x820.jpg (X = a met guard / a servant of hers; groups Nam nhân 2 · Cung nhân 9–13). Verdict giver wipes: python3 dev/site/cdn_sync.py --wipe-review rel-men-servants.

## For the reviewer / owner-visible changes
- Man card label fix: «Ngươi quý hắn» used to print HIS regard (m.af). Now both directions are printed, and his tình ý is its own line «Tình ý: …». Player-visible wording change → reviewer please check VANPHONG.
- The greeting option still says «hắn quý ngươi +5» (amount from BAL); she now also gains regard for him (relAdd), as a consort talk does.
- Not done: the Chí tôn ↔ men/servants pair (no store; would need a game decision); a «Quý / Oán» row on the servant cards (they show Lòng / Chủ tin; Ân oán shows all three).

READY: review/rel-men-servants ab189e51 (from origin/main 983a9436).

## REVIEW r1 (BIG, opus, session_01N1tNP3Y82Jb8SEkEn2qJTD) — FAIL ab189e51
PRIORITY #1 CHECK: OD 0 new | ledger 0 | claims 5 | main 0 | review/* 1 (review/rel-men-servants) | archive 0 (from the opening prompt); git grep origin/main: kitRelRows (jkrel.js) already prints a «Thiện cảm» for men / servants from p.loyal — see F1.
START_CTX ~3 % (get_session reads 0; own estimate), depth 3. Branch already contains newest origin/main 983a9436 (re-fetched 17:20Z, unchanged). No fixes pushed (F1 needs the kit keeper).

Tests on ab189e51 (all PASS): quickcheck PASS (core gates incl. one-core-guard, time-spill, old LIVE save loads + plays, perf new/live render 248/212, tab 511/526, buổi 1352/1947 ms, tasks>200 23/25) · rel-men-servants.js 22/22 ×3 · coop-e2e 68/68 · coop-home 51/51 · undef-scan PASS (253) · role-parity ALL PASS.
Own probes: (a) wrapper probe on msAff/msAffAdd/msOan/msOanAdd over 400 buổi consort road + 300 buổi servant road: 0 page errors; kinds reaching the new path = rival↔srv, srv↔srv, man↔rival (NPC greeting), rival→thO/emp (hostility reads, 0 before and after), one rival→non-person read (hostility/motiveOK in the servant road, 0 before/after). (b) Old save made on LIVE 983a9436 with real deeds (menReport by her and by a consort, revenge-done man grudgeN 0, judgeServ without cause, s.bullyBy) → branch: oán 32 / 40 / 0 / 30 / 21 (BAL × nết), filled once (normAll ×2 unchanged), plays 3 buổi, 0 errors.
Laws checked: 1 two-way (every new write has both directions or is a one-sided feeling by nature; Chí tôn ↔ men/servants left out with reason) OK · 3 gain-and-loss (greeting gain-only with khắc; bribe = bạc for spy + regard) OK · 4 every new number in BAL.relMS / BAL.oanFade OK · 6b source table row by row vs code (j22, j42, jmen ×4 branches, j24, jagstaff, j10 ×2, j42 blackmail, j29, jagknow, j42 take) — each write sits on a real recorded deed, nothing invented OK · 9 KIT: Ân oán uses kitSubTabs / pager strip / kitRel2 / kitNameRank only OK.
Shots LOOKED 3× (scratch, not committed): Ân oán X = guard (Fold 755x1000@2, iPad 1180x820@2), X = her servant (both), X = stranger official (iPad), servant rows show Thiện cảm / Oán / Lòng.

FAIL items (worker):
F1 (law 4 one core + law 11 + law 14 + OD:L55 one fact one place) — ONE pair, TWO «Thiện cảm» numbers. KIT §52 `kitRelRows` (jkrel.js 25–42, used by the person card key jpcf pcfKey, Tuần lục j87, and the card the man card opens) sends every man / servant through the `p.loyal` branch: «Hắn → ta Thiện cảm» = p.loyal, «Ta tin cậy» = tinOf(p). Evidence (manCard text, Fold + iPad): «Hắn quý ngươi: Bình thường · 5 · Ngươi quý hắn · 5 · Hắn oán ngươi · 30 · … Hắn → ta Thiện cảm 62 · Ta → hắn Tin cậy 48» on ONE card; her servant: Ân oán «Thiện cảm 0 · Oán 38 · Lòng 68» vs her person card «Thiện cảm 68». This branch makes the second number visible, so it must make them one. Fix = kit part → filed dev/kit/KIT_REQUESTS.md «20/11 rel-men-servants» (rows read j9 aff/oan; servant loyal under «Lòng» like bondBars; strangers «chưa rõ»); after KIT READY: drop the j22 manCard custom relation lines «Hắn quý ngươi / Ngươi quý hắn / Hắn oán / Ngươi oán» (KIT FIRST: the card already carries the kit relation block; keep «Tình ý: …»), update rel-men-servants.js U3 to read the kit block.
F2 (one person, two names on one screen) — a stranger court official / servant: strip says «Người lạ» (silhouette) but the pair heading and side label say «Tổng quản thái giám ???» («Quan hệ giữa Tổng quản thái giám ??? và ta», side «Tổng quản thái giám Càn Thanh cung / Tổng quản thái giám ???»). Use the strip's stranger label in relPerson for unmet men / servants (name «Người lạ», like the strip); no «???» on screen (VANPHONG §3).
F3 (evidence) — the report's Fold servant shot rms-srv-755x1000 shows Ta ↔ Hoàng thượng, not a servant (the test's shot step sets relSel="s"+sid; when the target is the maid her key is the j61 key). Use relKey() in the shot step; re-shoot Fold + iPad.

Notes (not blocking, for Foreman B): N1 m.grudge/grudgeN (revenge rumours) and the new m.oan are two stores of one grudge; oán fades (BAL.oanFade) while the rumour count does not — acceptable now, a later merge would read oan. N2 nrMAsk reads aff(S.thO,S): before = S.thO.rel (undefined), now S.thO.af (0) — same «no» either way; the right value is S.th (pre-existing). N3 co-op: the friend's men ties live twice (m.afw/m.ro[friend id] world vs her seat's m.af/m.oan personal), pre-existing for af, now also for oán.
CDN: python3 dev/site/cdn_sync.py --wipe-review rel-men-servants done 17:25Z (4 objects); the worker re-shoots after the fix.

## r2 (fix worker, sonnet, session_01N1tNP64FJEwd9DWxE9nJFE) — F2/F3 DONE 494ea79b, F1 WAITING KIT §52
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 5 | main 0 | review/* 1 (review/rel-men-servants) | KIT §52 kitRelRows (jkrel.js 25–42) = the one relation-row place; KIT_REQUESTS «20/11 rel-men-servants» still OPEN at 17:30Z.
Branch review/rel-men-servants @494ea79b (origin/main 983a9436 already merged, unchanged).
- F2: new relMSName(o) (jhc) = «Người lạ» while k61Named(o) is false; used by relPerson (strip, pair heading, side label) and whoL (row heads «Người lạ → ta»). j61 pager hook skips a name already «Người lạ» (it printed «???» at stage 1). Court officials, servants, men all through the same helper.
- F3: test shot step uses tab="rel" + relKey(servant); new stranger-official shot; both devices. Fold servant shot now shows the maid (Liên ↔ Ta), not Ta ↔ Hoàng thượng.
- F1: NOT changed (jkrel.js is the kit keeper's). Prepared side: the man card (j22 manCard 69–72) has 4 custom lines «Hắn quý ngươi / Ngươi quý hắn / Hắn oán ngươi / Ngươi oán hắn» (aff/oan) — they are the SAME numbers as Ân oán. The kit block on the same card still prints p.loyal «Hắn → ta Thiện cảm» + «Ta tin cậy», so removing the custom lines now would leave only the OTHER number (worse). Left exactly as is; when the keeper marks the request DONE: merge it, delete j22 lines 70–71 (keep «Tình ý»), update U3 to read the kit block, rerun.
Scan (law 11) of places that print an unmet person's name:
| Place | Before | After |
|---|---|---|
| Ân oán strip (stage 1) | «???» | «Người lạ» |
| Ân oán heading / side label (stage 0,1) | real name or «???» | «Người lạ» |
| Ân oán row heads (stage 0,1) | real name («Liên Anh → ta») | «Người lạ → ta» |
| Man card / court card | men shown only when met (menMet); no «???» printed by this branch | unchanged |
| Other screens' «<tước> ???» (jmen menStageNm, jinv, jpet, kitName…) | pre-existing j61 name mask, not Ân oán | not touched |
Note (not mine): a long court title in the strip is cut («Tổng quản thái giám Càn T…»), pre-existing kit strip.
Tests (on 494ea79b): rel-men-servants 24/24 ×3 (new F2 ×2 devices) · quickcheck PASS (render 199/188, tab 447/392, buổi 1117/1183 ms) · one-core-guard PASS · undef-scan PASS (253) · coop-home 51/51 · coop-e2e 68/68 (first run 66/68: Thái hậu picture empty on the guest seat, CDN image timing; rerun 68/68) · role-parity: see last line below.
Shots LOOKED 3×, CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/rel-men-servants/ : rms-man / rms-srv / rms-stranger × {755x1000, 1180x820}.jpg. Wipe: python3 dev/site/cdn_sync.py --wipe-review rel-men-servants.

## r3 (fix worker, sonnet) — F1 DONE
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 8 | main: kit-relrows-ms (jkrel.js kitRelRows isMS branch, aff/oan, «Lòng» for her servants, strangers «chưa rõ») LANDED | review/* 1 (this branch). START_CTX ~3 %.
- Merged origin/main a201d968 (kit-relrows-ms + rel-picker-r3 popup picker + later lands). Conflicts j15 / j29 / j42 / jcoopworld / jhc resolved keeping both sides (my aff/oan reads, bribe affAdd, MEN_P «oan»; jhc: relCands + relPopBody carry Nam nhân / Cung nhân groups and the men↔Chí tôn exclusion; relPair rv/relMS guards). index.html/sw.js rebuilt.
- F1: j22 manCard custom lines «Hắn quý ngươi / Ngươi quý hắn / Hắn oán ngươi / Ngươi oán hắn» removed (kit block on the card now prints the same j9 numbers); «Tình ý» kept. jkrel.js untouched. No kit gap → no KIT_REQUESTS entry.
- Test rel-men-servants.js: U1 follows the popup picker (real slot click), selectors .krelpair .kr3r, U3 reads the kit block (no custom lines, aff both ways + oán equal j9), NEW S1 whole-group scan.
Before / after (law 11 scan, S1 on every met man + servant, both devices):
| Place | Before | After |
|---|---|---|
| Man card (j22) | custom aff/oan lines + kit «Hắn → ta Thiện cảm 62 (p.loyal)» = 2 numbers | kit block only: Thiện cảm 5 · Oán 38 · Ta → hắn Thiện cảm 5 |
| Person card pcfKey / Tuần lục j87 (kitRelRows) | loyal as Thiện cảm | aff(p,S) / oan (kit-relrows-ms) |
| Ân oán rows (jhc relRows) | aff/oan | unchanged = same numbers (S1: 0 mismatches over 8–41 people / 7–17 listed) |
| Her servant | Thiện cảm = loyal | Thiện cảm aff · Oán · Lòng = loyal |
Tests on 88c83c37: rel-men-servants 26/26 ×3 · quickcheck PASS (render 217/252, tab 391/403, buổi 1067/1070 ms) · one-core-guard PASS · undef-scan PASS (277) · role-parity ALL PASS · coop-e2e 124/124 (COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc) · coop-home 50/51: the only FAIL = «A has the home tabs» expects «Khuê phòng» but the home road now shows Hành sự|Dư đồ|Hậu cung|Giao tình|Hoàng tự|Tư trang|Tài nghệ|Mệnh truyện — stale expectation from the upstream tab rename, not touched by this branch (pre-existing; coop-home.js is outside this topic) · old save loads (quickcheck).
Shots LOOKED 3× (Fold 755x1000@2 + iPad 1180x820@2): https://ctm-img.victoria-tntt.workers.dev/img/_review/rel-men-servants/ rms-man / rms-srv / rms-stranger × both. Wipe: python3 dev/site/cdn_sync.py --wipe-review rel-men-servants.
READY: review/rel-men-servants 88c83c37.

## REVIEW r3 (BIG, opus, session_01N1tNP5VS6ZVp3CRYrxc8sA) — FAIL 0d4b38e8 (review branch 11b1f3f2)
PRIORITY #1 CHECK: OD 0 new (OD:L352 found, see F4) | ledger 0 | claims 8 | main 3 (kit-relrows-ms jkrel.js isMS branch LIVE) | review/* 1 (review/rel-men-servants) | archive 16.
START_CTX ~4 % (get_session reads 0; own estimate), depth 8 (limit 8).
Merge: newest origin/main c9ae030e merged on review/rel-men-servants-r1 @11b1f3f2 (only index.html/sw.js conflicted → rebuilt by build_site.sh). Pushed; the r4 worker starts from it.
r3 merge 7e4114b7 conflict hunks (git show --remerge-diff + script: every '+' line of base 983a9436..494ea79b and base..a201d968 must be in the result):
| File | Branch side | Main side | Result |
|---|---|---|---|
| j15 court card | aff(c,S) | c.af.me line + thcIs «Cung nữ thân cận» own card | both kept |
| j29 bribeServ | affAdd(s,a,relMS.bribe) | stf2Bribe(…aOdd(odds,a)…) | both kept |
| j42 cnvBribeOpts | take: affAdd(a,v,bribe) | tell/quiet cnvBribeAff ±coopBribe.grudge + x texts | both kept |
| jcoopworld | MEN_P +oan | W_KEYS/HOST_ONLY +nmReg/nmOrd | both kept |
| jhc | GR 5 groups, ct/ms Chí tôn exclusion, rv guard, relMS stranger filter | popup picker relCands/relPopBody, houseLine residence line | both kept (branch strips→popup; sameHouse line replaced by main's houseLine, which returns "" for men/servants — probed, 0 errors) |
Missing lines after the script: only the 3 branch lines and 1 main line that were rewritten into the merged form above. No LIVE behaviour lost.

Tests on 11b1f3f2: quickcheck PASS (core gates incl. one-core-guard, rules-one-source, kit-conform, coop-one-world; time-spill; old LIVE save loads + plays; perf new/live render 221/216, tab 352/349, buổi 938/1158 ms, tasks>200 18/18) · rel-men-servants.js 26/26 · coop-e2e 124/124 (COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc) · coop-home on LIVE c9ae030e = 50/51 with the SAME «Khuê phòng» FAIL → pre-existing, confirmed not this branch. Own both-seat Ân oán check NOT run (FAIL found first; next reviewer runs it).
F2 holds (stranger official/servant = «Người lạ», no «???», both devices). F3 holds (Fold servant shot shows the servant pair). Shots looked 3× (scratch): rms-srv / rms-man / rms-stranger × Fold 755x1000@2 + iPad 1180x820@2.
Laws: 1 two-way OK · 3 OK (note N5) · 4 BAL.relMS OK · 6b deeds OK · 9 kit parts OK · 7 FAIL (F4: «Lòng») · 11/16 FAIL (F4).

FAIL item (worker r4):
F4 (OD:L352 verbatim "Everyone's attitude to her (servants included) uses only ONE word "Thiện cảm"; drop "Lòng"." + VANPHONG.md line 55 (owner 11/15 10:10Z: kẻ hầu đối với ta = thiện cảm; avoid «Lòng») + law 4 one core + law 11 + law 16) — F1 is NOT closed for a servant toward her master. LIVE c9ae030e shows ONE number for her maid everywhere: home people info «thiện cảm 75», kit person block «Nàng → ta: thiện cảm 75» (= loyal). Branch 11b1f3f2, same maid: home people info (j2 homePeople) «thiện cảm 67» but kit person block + Ân oán «Thiện cảm 0 · Oán 0 · Lòng 67» (probe; shot rms-srv-755x1000: «Thiện cảm 0 · Oán 30 · Lòng 26»). aff(own servant, S) reads s.af.me, which nothing writes for household servants → «Thiện cảm» is a permanent 0 and the real attitude moves to the forbidden word «Lòng». Same for an NPC consort's servant toward its mistress (aff = s.af["r"+id] ≈ 0, «Lòng» = loyal).
 Fix (the branch's own rule "reuse the store the game already writes"): j9 msAff / msAffAdd — a servant toward ITS master (S.maid / ownerOf(s)===S → S; NPC staff → ownerOf(s)) reads / writes s.loyal (clamp 0..100); drop jhc relRows loy() «Lòng»; KIT §52 kitRelRows isMS «lòng» row removed by the kit keeper (filed KIT_REQUESTS «21/11 rel-men-servants r3»); then the scan table: every place printing a servant's attitude to her master (j2 homePeople, j95 mm:me, j8, jeitem 70–86, jts 437, kit block, Ân oán) = one «Thiện cảm» = loyal; test U2/S1 updated (no «Lòng», Thiện cảm = loyal).
Notes (not blocking, Foreman B): N4 «Lòng» is already on LIVE in other places against OD:L352 (bondBars jtin.js «Lòng / Chủ tin», HUD Nhân tâm «Lòng», KIT.md 1812/1813) — pre-existing family, worth one owner-rule sweep. N5 j42 «Bạc lạ» take now also gives regard +bribe (and the servant-road threat oán +threat) not shown on the option text (law 3 visible gain; small).
CDN: shots stay for r4 (worker re-shoots and wipes after the verdict).

## r4 (fix worker, sonnet) — F4 DONE
PRIORITY #1 CHECK: OD:L352 «servants use only ONE word Thiện cảm; drop Lòng» + VANPHONG line 55 | ledger 0 | claims 8 | main: kit-relrows-ms LIVE; kitRelRows isMS «lòng» row removal filed in KIT_REQUESTS 21/11 for the kit keeper (jkrel.js NOT edited) | review/* 1. Started from review/rel-men-servants-r1 11b1f3f2 (origin/main c9ae030e merged). START_CTX ~3 %.
- j9: new relMaster(x,y) — HER servant (S.maid / ownerOf(s)===S; not a man, not a court official) toward HER reads / writes s.loyal (clamp 0..100) in msAff / msAffAdd: ONE store, the number the game already writes. Servant road (isSrv, S.srv.af) unchanged. Old saves: nothing to migrate (loyal exists; the unused s.af.me of household servants is simply no longer read for their master).
- jhc relRows: loy() «Lòng» line removed.
Before / after (law 11 scan: every place printing a servant's attitude to her master):
| Place | Before (r3 branch) | After |
|---|---|---|
| j2 homePeople / j95 mm:me info | «thiện cảm» = loyal | same (= aff now) |
| Kit person block (kitRelRows isMS) «Thiện cảm» | aff = s.af.me = 0 | = loyal. (its «lòng» row stays until the kit keeper lands the filed request; same number) |
| Ân oán (jhc relRows) | «Thiện cảm 0 · Oán 30 · Lòng 26» | «Thiện cảm 46 · Oán 30» (= loyal; no «Lòng») |
| j15 court card / j2 / j8 oddsmakers reading loyal | loyal | unchanged |
| NPC consort's servant → its mistress (aff) | s.af["r"+id] ≈ 0 | UNCHANGED (s.af). Reviewer F4 asked for NPC masters too; I tried it and role-parity FAILS «maid:P-ONLY:maid:poison» (deterministic, ×2; PASS on pre-r4 11b1f3f2, on main c9ae030e and with the HER-only variant; with also npwRegard=0 still FAIL) — reading loyal for NPC servants shifts the NPC world. The player never sees a second number for that pair (no Lòng row any more), so the visible F4 is closed; if the reviewer wants NPC masters too, the scan's draw needs a look by whoever owns role-parity |
| «Lòng» in other places (bondBars jtin.js, HUD Nhân tâm, j10 rows) | pre-existing family, reviewer N4 | NOT touched (outside this topic; one owner-rule sweep recommended) |
Test: rel-men-servants.js U2 now «Thiện cảm = s.loyal, no Lòng» (aff(s,S)===loyal), S1 scan also asserts master aff = loyal and no «Lòng» in Ân oán: 26/26 (×3 + 8 more; one unexplained single FAIL 25/26 while quickcheck was loading the CPU, not reproduced in 8 reruns).
Gates on f7953cc6 (r4 first cut): quickcheck PASS (render 284/285, tab 621/571, buổi 1161/1496 ms, tasks>200 21/23, old save ok) · one-core-guard PASS · coop-e2e 124/124 · role-parity + undef-scan: see last line. coop-home not rerun (50/51 «Khuê phòng» pre-existing, confirmed on LIVE by reviewer r3).
Shots LOOKED 3× (Fold 755x1000@2 + iPad 1180x820@2; servant Thiện cảm 46 / 40 · Oán, no Lòng): https://ctm-img.victoria-tntt.workers.dev/img/_review/rel-men-servants/ rms-man / rms-srv / rms-stranger × both. Wipe: python3 dev/site/cdn_sync.py --wipe-review rel-men-servants.
FINAL (HER-only relMaster) 1142d04e: rel-men-servants 26/26 ×2 · role-parity ALL PASS · quickcheck PASS (render 238/294, tab 436/459, buổi 1111/1458 ms, tasks>200 19/20, old save ok) · coop-e2e 124/124 · undef-scan PASS (277) · one-core-guard PASS.
READY: review/rel-men-servants 1142d04e.

## r5 (fix worker, sonnet) — merge kit-relrows-ms1word + LAW 11 «Lòng» family (MAIN 98 ORDER 18:08Z)
PRIORITY #1 CHECK: OD:L352 «Everyone's attitude to her (servants included) uses only ONE word "Thiện cảm"; drop "Lòng"» + VANPHONG l.55 | ledger 0 | claims 8 | main: j84 word fixer already rewrites most «lòng ±N» on screen (so the player mostly saw «Thiện cảm» already) — this round makes the SOURCE say it too | review/kit-relrows-ms1word-rv c37b7713 (PASS by MAIN 99 19:02Z) = kit keeper #5's part. START_CTX ~3 %.
- Merged review/kit-relrows-ms1word-rv c37b7713 + origin/main dcff5884 (index.html/sw.js rebuilt). kit-relrows-ms.js on the merge: Fold PASS (47 people) + iPad PASS (47); own maid «Thiện cảm 51 · Oán 0 · Ta tin cậy 53» (no Lòng).
- NEW scan dev/test/servant-long-scan.js (exit 1 when a servant-facing «Lòng/lòng» survives): extracts every string / template literal (+ strings inside ${…}) of dev/build/j*.js (comments skipped) that uses «lòng» as an attitude word, runs it through VP.fix (the j84 fixer = what the player sees), prints SURVIVES / kept. First run: 751 → after narrowing to attitude shapes 217 literals in 75 files; 160 servant-facing.
- Changed at source (script /home/user/wt/lapply.py logic: pattern-by-pattern on the scanned lines only): ~150 lines in ~54 files → «Lòng/lòng ±N | N | <b>N</b> | với chủ | với ngươi | trung | thấp | dưới | lung lay | kẻ hầu khác lòng | kẻ hầu thêm/bớt Lòng | (lòng N+…)» → «Thiện cảm / thiện cảm …»; «Lòng cung nữ» → «Thiện cảm của cung nữ». Examples: jtin.js:5 bondBars «Lòng» bar → «Thiện cảm»; j15 servant lines + chip «lòng lung lay» → «thiện cảm lung lay»; j10 servant rows + Thưởng/Phạt «lòng ±N»; j24 / jhouse judge options + logs; j1/j19/HXN stat label «Lòng cung nữ»; j14 «Lòng trung» (maid caught); jk3 crew chip default label; j25/j63/j65/j68 result lines; j70/j72/jagacts3/jaudit/jpromsv/jemoact/jtc/jwhy/… effect texts; jgedata / jgedata_w2 end-conditions; jtut tutorial text; j79 help gloss «Lòng» entry deleted (the «Thiện cảm» entry already explains it; canon overwrite).
- Coupled code fixed in the same change (labels compared by text): j65 (×5: «Lòng »+maid name → «Thiện cảm »+name; HUD chip regex; popCard info regex), jk2b.js:1139 chip regex now also takes «Thiện cảm»; jstip.js vaitho «+3» moved to BAL.eff.jstip.maidUse (one-core-guard: the renamed word made the typed number visible).
- KEPT (not a servant's attitude; my reading of OD:L352): idioms (thử lòng, vừa/vui/buồn lòng, hết/một lòng, được/mất lòng, trong lòng), Thái hậu (j2:137 + j95:395 «Thái hậu · lòng N» — Thái hậu's thiện cảm word was already «thiện cảm» elsewhere; owner may want it renamed too — NOT changed), Hoàng hậu / general's loyalty («lòng trung» in joi, jentry, jrd_dtq, jrd_tt, jgedata_w1), Emperor's «lòng thương» (jht), the player's own heart (jemoact lòng ngươi / lòng nhẹ, jfeel prose), jemoact:369 «mất lòng y (lòng y −N)» = an NPC consort's regard for the target (could be «thiện cảm» later), jk2b:263 «được/mất lòng kẻ hầu» (idiom in a feeling-line map). Scan allow-list (KEEP) documents each class.
- NOT touched (kit keeper's / docs): KIT.md «Lòng» chips (lines 529/538/946/1723/1739/1775/1817/1818/2304/4512), jkrel.js (already one word after kit-relrows-ms1word), code comments, BAL comments, dev/test/* old Lòng expectations (stat-fx-2 / pcard-* look for the removed «Lòng người» tab — stale before this branch).
Before / after (scan): servant-facing «lòng» literals 160 → 0 on source (33 kept, listed) · on screen (after VP.fix) survivors 90 → 0.
Gates on db2fd3e5: rel-men-servants 26/26 ×2 · servant-long-scan exit 0 · quickcheck PASS (render 280/268, tab 496/489, buổi 1489/1222 ms, tasks>200 21/21, old save ok) · one-core-guard PASS · role-parity ALL PASS · coop-e2e 124/124 · undef-scan PASS (280) · kit-relrows-ms.js Fold+iPad PASS. Shots (Fold 755x1000@2 + iPad 1180x820@2, looked 3×; Hậu cung › Cung nhân card + earlier Ân oán): CDN img/_review/rel-men-servants/ staff-755x1000.jpg, staff-1180x820.jpg (+ rms-*). Wipe: python3 dev/site/cdn_sync.py --wipe-review rel-men-servants.
READY: review/rel-men-servants db2fd3e5 (r4 F4 + kit merge + law-11 family).

## REVIEW r4/r5 (BIG, opus, session_01N1tNP5VS6ZVp3CRYrxc8sA) — FAIL db2fd3e5 / head 04210f7a (review branch review/rel-men-servants-r5rv fafbf719)
PRIORITY #1 CHECK: OD:L352 + VANPHONG l.55/l.61 | ledger 0 | claims 8 | main kit-relrows-ms1word LIVE f44060d4 | review/* 1 | Foreman B order 19:43Z.
Merged origin/main 8c829c67 (only index.html/sw.js conflicted → rebuilt). (review/rel-men-servants-r1 still holds my r3 merge 11b1f3f2; a force-push was refused, so this round's branch is review/rel-men-servants-r5rv.)
Reviewer fixes on review/rel-men-servants-r5rv:
- _aa.html (92 k lines, the quickcheck gate page) had been committed by r5 commit 88499c2c → removed (192e7414).
- dev/test/opt-greyed.js expected «lòng … chưa tới» (jtruth witness option now says «thiện cảm … chưa tới») → updated; opt-greyed 0 FAIL on both devices.
- dev/test/one-core-text.js: the BAL.loy cut scan keyed on «lòng / trung thành / thân tín» only → after the rename it no longer watched servant thresholds; «thiện cảm» added (0 new hits, gate PASS).
Coupled code (whole repo grep of «Lòng/lòng» inside regex / includes / indexOf / === / tests): j65 popCard regex (thiện cảm for the maid, lòng for Thái hậu, matches the kept Thái hậu text), jk2b chip regex, kit-relrows-ms.js, rel-men-servants.js OK; opt-greyed stale → fixed above; others are descriptions. No save key uses the word.
servant-long-scan (run with file:// — it aborts every http request): 0 servant-facing «lòng» survive, 33 kept. Mine: rel-men-servants 26/26 not rerun after the main merge (FAIL found first).

Judgement on the worker's DEVIATION (NPC masters not switched): NOT acceptable as is — the claim "the player never sees a second number" is false after the r5 rename:
F5 (law 4 one core, OD:L352 one word, VANPHONG l.61 "bất kỳ «thiện cảm» nào cũng phải nói của ai với ai", law 11) — another consort's servant (Hậu cung › Cung nhân card, probe Fold): «Thiện cảm 58 · Ta tin cậy 47 · Đã quen · Nàng → ta Thiện cảm 0 · Oán 0». The bondBars bar «Thiện cảm 58» = loyal toward ITS mistress, unlabelled, right above «Nàng → ta Thiện cảm 0»; and Ân oán for that servant ↔ its mistress prints aff(s,v) = s.af["r"+id] = 0. One pair (servant → mistress), two stores, both now called «Thiện cảm». Before r5 the bar said «Lòng» (another word), so the rename made it visible.
 Fix (worker, pick one, both keep law 1): (A, recommended) one store for EVERY master: relMaster also for NPC masters (aff(s, ownerOf(s)) = s.loyal), then find what the role-parity «maid:P-ONLY:poison» cell reads (an NPC maid's poison gate reading aff(maid, owner) / s.af) and make that gate read the same loyal with the same cut as the player's road — the scan failing means NPC maids lost an act the player keeps = a law 1 break if left; do NOT lower the baseline. (B) keep two stores but never print the second: Ân oán shows no servant ↔ own NPC master pair (like Chí tôn ↔ men), and bondBars on a servant not hers labels whose bar it is («Thiện cảm với chủ» or the kit's who→whom label). Either way: the scan table of every place showing a servant's attitude to an NPC master.
Note N6 (pre-existing on LIVE, not this branch): j84 rewrites «Chủ tin» → «Ta tin cậy» on EVERY servant card, also on servants who are not hers (the bar is their mistress's trust) — wrong subject; one line for the kit/word keeper.
Laws: 1 OK (deviation avoided a two-way break; fix A must keep it) · 4 FAIL (F5) · 7 OK (scan 0) · 9 kit OK · 11 FAIL (F5 family) · 14 OK (j79 gloss overwrite).

## r6 (fix worker, opus, session_01N1tNP6hxgweGtRvQKBsdGp) — F5 Fix A + N6 DONE
PRIORITY #1 CHECK: OD:L352 (servants: ONE word «Thiện cảm») + VANPHONG l.55/l.61 | main kitRelRows one-word LIVE f44060d4 | review/* review/rel-men-servants-r5rv fafbf719 (base) | claims B rel-men-servants (r6 = this session). START_CTX ~4 % (own estimate).
Branch review/rel-men-servants-r6 @159dab21 (from -r5rv fafbf719; no main merge needed for this fix).
- F5 Fix A (law 4, law 1, OD:L352): j9 new relOwner(x) = a servant's master (S for S.maid / her household; an NPC consort via ownerOf or v.maid; none for men / court officials). relMaster(x,y) = relOwner(x)===y → aff / affAdd of a servant toward ITS master read / write s.loyal for EVERY master. Servant road (isSrv) unchanged (S.srv.af).
- Why role-parity «maid:P-ONLY:maid:poison» failed with Fix A (r4's deviation) — traced, NOT a game gate: the NPC maid's poison gate (jagstf2 asOpts → stfPoisonOk) never reads the old store. The scan's symmetric worlds («social» affAdd/relAdd +50/+40, «disfavour» relAdd −60) write the doer toward EVERY other consort, which for an NPC maid includes her own mistress; that write used to land in the dead s.af["r"+id], now in loyal. The scan's world snapshots (snapW for every world, mSnap for the maid worlds) did not hold servant loyal, so loyal leaked world to world (77/71/66 → 100 → 40, probed); with loyal 40 the maid's REAL needs (asNeeds tin gap) made the poison value < 0 (1144 evaluations: old 28 > 0, new 0). Fix in dev/tools/role-parity-scan.js: both snapshots also hold every servant's loyal / tin / af. Game rules untouched, baseline / open list untouched (OPEN_MAX 13). After: maid:poison = SAME (both sides), role-parity ALL PASS ×2.
- Before / after, every reader / writer of the old store (servant → its NPC master = s.af["r"+id]):
| Reader / writer | Before | After |
|---|---|---|
| j9 aff / affAdd (the only access; grep s.af["r"…] = 0 direct readers in dev/build) | s.af["r"+id] (≈ 0, nothing wrote it) | s.loyal |
| Game NPC world (runtime probe, wrapper on msAff/msAffAdd, 30 weeks consort road + 30 weeks servant road) | 0 reads / 0 writes | 0 reads / 0 writes (only 13 / 7 msAff calls at all) |
| Ân oán servant ↔ its NPC mistress (jhc relRows) | «Thiện cảm 0» (second store) | «Thiện cảm 56 / 76» = loyal (shots) |
| kit person block (kitRelRows) / Hậu cung › Cung nhân bars | bars = loyal, Ân oán = af (two numbers, one word) | one number |
| hostility / jagstaff asNeeds spite / stfPoisonOk / jagday agTell aff(m,d) / jlost loAskOdds | servant-servant keys or consort pairs; a listener/asked servant toward its own master now reads loyal (true regard) | same rule as her own servants since r4 |
| role-parity scan worlds | leaked into af "r" keys | leak removed (snapshots hold loyal) |
- N6 (LAW 11, VANPHONG l.55/l.61): the family = every servant-card trust/attitude label. jtin bondBars now names who → whom: hers «Thiện cảm · Ta tin cậy» (KIT_REL.srvThem / srvTrust); another master's «Thiện cảm với <chủ> · <chủ> tin cậy» (Thái hậu's household: «… Thái hậu»); servant road keeps «Chủ tin» (VANPHONG). bondOwner = j9 relOwner (one link). jaudit's bondBars override (it replaced the function with fixed «Thiện cảm / Ta tin cậy») now wraps it and only adds the runner note. j15 «Chưa đủ tin để sai việc kín (cần Chủ tin 40)» shown only on HER servants (was on every card) and the 40 now BAL.tinLv.send (also jtin bestSent, law 4). No kit part changed (sbar unchanged; KIT_REL unchanged) → no KIT_REQUESTS entry.
| Place (scan: every servant with a master, rel-men-servants N6) | Before | After |
|---|---|---|
| her maid / household card bars | Thiện cảm · Ta tin cậy | same |
| another consort's servant (32 per start) | Thiện cảm · «Ta tin cậy» (j84 / jaudit: wrong person) | «Thiện cảm với <chủ> · <chủ> tin cậy» |
| Thái hậu's household | Thiện cảm · Ta tin cậy | «Thiện cảm với Thái hậu · Thái hậu tin cậy» |
| j15 «cần Chủ tin 40» line | every card, typed 40 | her servants only, BAL.tinLv.send |
| kitRelRows (jkrel) «Ta tin cậy» | already own-only | unchanged |
| other «Chủ tin» texts (j22 / jroute / jaudit / jhouse / jeitem) | her own servants or the servant road | unchanged (right subject) |
 Note: on the final kit person card these bars are folded away by the kit pass (~1 s after render, the kit relation block «Nàng → ta» replaces them); they show on first render and in the card text — fixed either way.
- Gates on 159dab21: rel-men-servants 30/30 (new F5 + N6, both devices) · role-parity ALL PASS ×2 · servant-long-scan exit 0 (0 servant-facing «lòng») · quickcheck PASS (render 234/227, tab 410/435, buổi 1190/1248 ms, tasks>200 20/21, old LIVE save loads + plays, core gates PASS) · one-core-guard PASS · one-core-text PASS · undef-scan PASS (280) · opt-greyed: Fold PASS; iPad «tam» check flaky (palace-map «tạm» art timing; 1 of 3 runs red, rerun PASS; not this topic) · coop-e2e 124/124 (COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc) · coop-home 50/51 = the known pre-existing «Khuê phòng» FAIL (reviewer r3).
- Shots LOOKED 3× (Fold 755x1000@2 + iPad 1180x820@2): https://ctm-img.victoria-tntt.workers.dev/img/_review/rel-men-servants/ r6-rel-srv-mistress-*.jpg (Ân oán «Nhi → Hoàng hậu Thiện cảm 56», «Chỉ → Hoàng hậu 76» = loyal), r6-staff-own-*.jpg, r6-staff-other-*.jpg. Wipe: python3 dev/site/cdn_sync.py --wipe-review rel-men-servants.
- Note N7 (not changed, for Foreman B): the other direction master → servant in Ân oán («Hoàng hậu → Chỉ Thiện cảm 0», also «Ta → nàng Thiện cảm» for her own) reads the master's rl map, while her trust lives in tinOf («tin cậy», a different word per VANPHONG l.55). Not two numbers under one word, but the 0 may read odd; a rule call (show «Tin cậy» there?) is the owner's.
READY: review/rel-men-servants-r6 159dab21.

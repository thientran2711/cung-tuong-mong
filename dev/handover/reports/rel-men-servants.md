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

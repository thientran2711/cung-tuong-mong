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

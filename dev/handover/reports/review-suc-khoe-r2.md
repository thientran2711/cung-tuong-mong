PRIORITY #1 CHECK ('suc-khoe|Sức khỏe'): OD 8 | ledger 0 | claims 8 | main 15 (word hits; bundle NOT on main) | review/* 3 → review the existing fix, no rebuild.

# REVIEW r2 — review/suc-khoe-fix @ da50857d (HEALTH + PREGNANCY BUNDLE), Foreman D #8

Reviewer session_01964izEdQ4cDsTpuGgdScHp (opus). START_CTX ≈ 4 % of the 1M window (own estimate; get_session read 0).
Read: brief D8-suc-khoe-r2.md, START_CORE / START_WORKER / START_REVIEWER, reports/suc-khoe.md §4.1–4.7, OD 16/11 18:05Z / 18:08Z / 18:10Z / 18:17Z / 19:00Z (verbatim), review-suc-khoe-r1.md, suc-khoe-fix.md.

## Branch review/suc-khoe-r2 (pushed), head 7e1f42cad7234c842a737a42403bb31baacf32bf (origin/main 4719d424 is an ancestor)
| commit | what |
|---|---|
| db3fd360 | merge origin/main 7abaf07a into review/suc-khoe-fix da50857d. Conflicts: assemble.py (main list + jkh.js last), j3 (sucCap + main's host-only `worldOn()` NPC tick), j6 (hudFmt + BAL.time.khac), j8 (BAL.ghen.preg + BAL.pgRisk keys), j22 (khOcu + main's trystCh), jmort (p.nbWhy + BAL.mortx.youngAge), jbal2 (both blocks), jroute (see ONE CORE below) |
| b37865b7 | reviewer fix: j15 her card used `WAGE`, which main's one-core move (→ BAL.wage) deleted → `selfCardHTML` threw ReferenceError **on live main** (her own person card). Now BAL.wage. Found by suc-khoe.js |
| 6f0602ed | site rebuilt |
| 4f987217 | dev/measure/sk-bots.js: main's jfe.js now holds flip() until buổi tối; the bot calls endTurn directly and measured 0 nights on BOTH arms. The bot now flips each week at B4L (measure tool only) |
| 700e5bbc | merge origin/main 64c39ca2 (coop-thin-a live, scenes-3): assemble main list + jkh.js last; site rebuilt |
| 7e1f42ca | merge origin/main 4719d424 (batch-0415: wx-fx-size, fig-rank-match, save-dlg-fix; no co-op / health files; generated files only conflicted); site rebuilt |

## ONE CORE at the merge (OD:L1267)
While the fix put the blood-test numbers in a new `BAL.ngh`, main moved the same numbers into `BAL.route` (oil, cheat, ngDeath, npcAlum, npcOil, demandWin, demandFail, frame). Two blocks with the same numbers = the owner's violation example. Resolved: BAL.ngh keeps ONLY the keys BAL.route lacks (alumTc, oilTc, frameAff, accOan, accPun, needEv, seeMat, oilMat); jroute (rtNgOil, rtNgEst, rtNgLose, rtNgNpcRes, rtNgNpcAuto, PEND.rtNgNpc, text "Danh +…" / "(Sủng …, Danh …)") and jkh read BAL.route for the rest. The shared resolver rtNgNpcRes (her side and NPC side, one copy) is kept. Core gates PASS.

## r1 findings — checked on the merged build
| # | r1 | r2 verdict |
|---|---|---|
| F1 | ở cữ 2 months | FIXED (khOcu `<`; j35 + j22 read khOcu; no ×0.7 anywhere in the assembled list) |
| F2 | ceiling invisible on touch | FIXED — shots below: HUD "Sức 60/81", Sức help "Ta đang có" kit rows (Sức · Sức tối đa · Sức khỏe in words), her card kit chip "Sức tối đa 81" next to "Tuổi 46" + line "Thân thể hao tổn sau sinh nở, trúng độc"; consort card words line |
| F3 | "Sức +4" at the cap | FIXED (j76 uses sucCap) |
| F4 | ONE CORE | FIXED, and the merge duplicate with BAL.route removed (above) |
| F5 | clean mother never reaches the test | FIXED (khDeed: lệch-sổ fact weight lsW = accEv in jtruth ledger, her and NPCs; test proves cap 3 → test → cap 0). Bot: lech 60 → lech_set 34 tests, 31 mixed (accuser punished), 1 lost |
| F6 | drug card art + tab | 'tạm' allowed by the brief: KIT REQUEST y-duoc still open in KIT_REQUESTS.md (category art act-cat-y-duoc already on the CDN); act art request listed for Foreman C |
| F7 | two-way need | FIXED (her card needs accEv like NPC accusers; she gets evi from an NPC's lệch-sổ birth; rtNgNpcCards reads needEv) |
| F8 | j68e tonic | FIXED (chooseM wrapper → khTonic) |
| F9 | recDefend + thái y verdict | FIXED (k.thyRec; thyVerdict Khỏe mạnh / Hơi yếu / Có bệnh) |
| F10 | wording | FIXED ("Sức tối đa do Sức khỏe định."; no %, cổ trang words) |

Owner rulings re-checked: Sức khỏe = ONLY the Sức max (regen amounts unchanged, jmort `tired` off while BAL.kh.on — no double cut; my scan of every Sức increase in the assembled list incl. both new main merges: all read sucCap or go through apply/ap which clamp to it; only floors max(…,30) in jpet). Ở cữ 1 month, ×0.7 gone. Lệch sổ → existing blood test, truth decides, two-way. Childbirth death: jmort formula untouched (diff = p.nbWhy text only); nothing softens death; overdue raises it as specified. NPCs run the same functions; NPC rolls host-only (khGuest).

## Tests (merged build, one at a time)
| suite | result |
|---|---|
| core gates (one-core-guard · rules-one-source · kit-conform · coop-one-world · hooks) | PASS |
| dev/test/suc-khoe.js (1180x820) on db3fd360+ and on 700e5bbc | PASS (f: []) — first run caught the WAGE crash (fixed b37865b7) |
| dev/test/mortality.js 240 2 | ok, pageErrors [] |
| dev/test/routes.js 755x1000@2 + 1180x820@2 (local charset wrapper, not committed) | no page errors, no overflow, no cut text (16 shots, looked at the blood-test one) |
| quickcheck.sh @6f0602ed (vs live 7abaf07a) | PASS · old save ok · render+buổi 301+1034 vs 268+1058 ms (+0.7 %) |
| quickcheck.sh @700e5bbc (vs live 64c39ca2) | PASS · old save ok · render+buổi 295+897 vs 303+1022 ms |
| quickcheck.sh @7e1f42ca (vs live 4719d424) | PASS · core gates PASS · old save ok · render+buổi 261+953 vs 291+1112 ms |
| suc-khoe.js @7e1f42ca | PASS (f: []) |
| coop-e2e.js (LIVE Worker, Fold host + iPad guest + solo) @700e5bbc | **61/61**, no page errors, incl. "NPC Sức khỏe / Sức tối đa: guest = host" (not re-run on 7e1f42ca: that merge touches no co-op or health file) |

## Numbers (dev/measure/sk-bots.js fixed, BALJ conc .5, SEED0 5000, Sủng ≥ 25, 40 lives × 10 years, same seeds; A = main 7abaf07a, B = r2 merged)
| arm | NPC births / consort-years | births per consort-year | NPC conception / 100 nights | NPC mother died in childbirth (/100 births) | NPC miscarried / 100 pregnancies | her births | her childbirth deaths |
|---|---|---|---|---|---|---|---|
| A main | 367 / 3175 | **0.116** | 11.7 | 28 (6.7) | 19.8 | 22 | 2 |
| B r2 | 506 / 3119 | **0.162** | 16.4 | 47 (8.3) | 20.1 | 21 | 5 |
- Same picture as r1 (0.115 → 0.173): +40 % births per consort-year from the owner's ở cữ ruling (1 month, ×0.7 removed). BAL.conc NOT retuned (would undo her ruling) — a number for the owner / D57 owner, not a FAIL.
- Deaths: same jmort formula; more births → more childbirth deaths in total; per-birth NPC rate 6.7 vs 8.3 (overdue ×1.5 is the spec; small samples). Her 2 vs 5 (21–22 births each, noise-level samples). Death is a feature (OD 19:00Z) — reported, not changed.
- Health counters (B): preterm m8 10 / m9 27, preterm babies died 8, overdue 38, ở cữ kept 525, NPC drug 4, lệch sổ 60 → tests 34 (mixed 31, innocent lost 1); her Sức max < 30 y 98.7, 30–40 y 97.4; NPC 30–40 y health 91.1, cap 94.6, Sức 91.4.

## Shots (scratch only, not in git; looked at every one) — 755x1000@2 and 1180x820@2, age 46, scars 8, Sức 60
- HUD: "Sức 60/81" fits the kit cell on both (no overlap, not cut).
- Sức help (kit LUẬT panel, Chưởng sự cô cô): "Ta đang có: Sức 60 · Sức tối đa 81 · Sức khỏe Hơi yếu · thân thể hao tổn sau sinh nở, trúng độc".
- Her card: kit chips "Tuổi 46 · Sức tối đa 81" (same chip as Tuổi), line "Thân thể hao tổn…" — below the fold of the card's left column on both devices (same place as main's Tuổi chip; reachable by scrolling the card, visible on touch). No horizontal overflow, no page errors.

## Notes for the coordinator (not findings of this branch)
- LIVE BUG fixed here: j15 `WAGE` undefined on live main → her own card (showSelf) throws. Ships with this PASS; if this branch waits, cherry-pick b37865b7 to main.
- sk-bots (and likely dev/measure/preg-bots.js, same harness) measured 0 nights on current main because jfe.js holds flip() until buổi tối; fixed in sk-bots only.
- Open: KIT REQUEST y-duoc (F6 tab) + act art "Uống thuốc thúc sinh" (Foreman C).

PASS 7e1f42cad7234c842a737a42403bb31baacf32bf

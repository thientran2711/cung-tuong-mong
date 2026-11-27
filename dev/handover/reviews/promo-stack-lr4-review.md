# BIG REVIEW — review/promo-stack-lr4 (Foreman D PROMO-STACK REMERGE) — 27/11 ~03:30Z

PRIORITY #1 CHECK: OD 24/11 ~09:20Z «Kỳ sắc phong theo dịp lễ ok, làm luôn đi» + ~07:00Z đại lễ / quốc tang + 26/11 ~22:45Z «giữ sắc phong theo lễ trong năm như đang có» + ~22:58Z HUD «5/32 tuần» (counts in TUẦN) | main 4cfcda61 had no jpromob (LIVE now 17f23656, still none) | review/* d-stack-lr3 cb398c07 (source), promo-stack-lr4 d713f162 (under review) | claims: worker session_01D3E3NZ4EBSHMcWVkhfsBVX (built it), reviewer = this session (session_01D3E3NacPigdjGR1RRt4q3j), coordinator Foreman D session_01D3E3NYwRePZXPzMMwNfkEq.

Reviewed: d713f162 (= LIVE 4cfcda61 + merge cb398c07 01d5c8ab + d0c47043 tests + 80c628ea law-4 drop + LIVE merges a22cf45d / fa722503).
Final: **0aee038a** = d713f162 + reviewer fix commit + merge of LIVE 17f23656 (FF from LIVE 17f23656; pushed, origin head == 0aee038a).

## VERDICT: PASS → LAND READY review/promo-stack-lr4 0aee038a (FF from LIVE 17f23656)

## Merge audit (method)
- Re-ran the merge with `git merge-tree 4cfcda61 cb398c07` (base 3af7896e): 22 code files + 4 generated conflicted, matching the worker's table.
- Script (token-level): for every line LIVE or D added vs the base, checked that each added token run is in the resolved file (01d5c8ab). Only misses:
  - j1.js ghenUp, j28.js oanCool / ghenCool / oanMonth, j8.js:519 rivalsTurn fade = the ★ decisions #1–#3 (D net-ghen / net-thresholds not taken; LIVE pace-all kept).
  - jtsb.js:148/149, jts.js:340, jky.js:229, j63.js:397 = false alarms (literal → BAL key rewrites; read by hand, both sides there).
- ★ #1–#3 confirmed. LIVE BAL.oanCool {on:1, ghen:{base 1, than 3, pct .03, npc .5, dm}} covers the same pain: NPC-caused jealousy → oán toward the causer × .5 (same as D ghenOanK .5); D's ghenCool k .03 = LIVE ghen.pct .03; her own S.ro cools in LIVE oanCool(…, mine) with C.me. Behaviour lost vs D: (a) her own jealousy v.pg fades a flat −1 a turn (D: by rule); (b) D's oán fade proportional to oán (net.oanCool .10) is replaced by LIVE band ÷ season. Both are LIVE behaviour; any tuning goes into BAL.oanCool (MAIN / owner call, not a merge call). 80c628ea removes BAL.net.ghenOanK / ghenCool / oanCool. grep: no reader left in dev/build or dev/test → no second copy of a number (law 4).
- Semantic clash the token merge DID create (fixed, see below): j28.js oanMonth rollback path (BAL.oanCool.on = 0): base line untouched by LIVE + D changed it to `oanCool(h,h.oan)` (D's 2-arg signature) → with the LIVE `oanCool(w,mine,onlyMine)` it wrote `undefined` into every man / servant oán. Dead while on = 1, but it was a broken rollback.
- No other call of a D-signature oanCool/ghenCool and no BAL.net.ghen*/oanCool reader in the tree.
- LIVE 17f23656 (end-maxrank) merge: 12 source files, disjoint from promo (j32 / jend maxRank, jrank, jk2b …), auto-merged; only CHANGE.txt / index.html / sw.js conflicted → CHANGE = promo line, site rebuilt. assets.json = branch build (+25 D-stack pictures: place-*, act-opt-*, same as d713f162).

## Reviewer fixes (commit on the branch, small)
1. dev/build/j28.js:87 oanMonth rollback: LIVE flat-fade line restored for men / servants (see above).
2. dev/build/jpromob.js:54–57 `pbWkIn(m) = pbWk(m) − S.tuan`: «còn N tuần» counted whole months × 3 from the START of this month, so in trung / hạ tuần it said 1–2 tuần too many (e.g. hạ tuần, kỳ next month → «còn 3 tuần», truly 1). Used at the 4 kỳ countdowns (pbKyRow, pbDl «chờ kỳ», kỳ notice, chip), pbDlNext().w, and the 2 exam-retry texts (jexam cardH, result). pbWk(m) stays the plain span (for the HUD total y). Law 11 family = the worker's own scan table (6 sites); none missed.

## MAIN 167 items
1. pbWk(m) = m × (BAL.cut.tuanDays.length + 1) = 3 tuần / month (j3: 3 tuần per month) — one count, from BAL (law 4). Whole family converted (6 sites); not converted on purpose: quốc tang length, favour cap «24 tháng», promoRuleTxt gap text (rule text, not countdowns) — agreed.
2. j8.js:453 old «Cách lần sắc phong trước N tháng» row only when !pbKyOn(); jexam kitPromoHook gap = 0 when on. Other readers of the row (j34 candOK, j8 seatRivals, j68i rsn6, jexam EX_WAIVE/exBase) only filter it → removing it cannot block anything. NPCs follow the same rows (law 1).
3. pbDlNext(): read-only (no pbSt / pbDlSt; reads S.pb with `||{}`); returns {A,k,name,m,w}. OK.

## Laws
- 1 two-way: promoReqP rows and pbKyRow are the same for her and NPCs. OK.
- 2/3: no new choice sets. OK.
- 4 one core: pbWk from BAL.cut; D BAL.net copies removed; coregates G1 guard/text/khac/bind/textrule/c6 all PASS. Note (non-blocking): jagacts3 dance preview repeats ghenUp's rounding `max(1, round(n × npc))` inline — same number, but a shared helper would be cleaner. Pre-existing typed numbers (not from this branch): j2.js:172 Khiêu khích «ghen +15» / hh −15; j8.js:446 promoGap 3/5/7/9 (rollback only).
- 5: untouched.
- 7 wording: «còn N tuần», «chờ N tuần mới được thi lại» — cổ trang, no %. OK.
- 9–12 kit / devices: no new UI parts; rows / chips are kitChip + promo rows. Videos and shots looked at (frames of both webm + 4 jpg): Fold 755x1000 and iPad 1180x820 Sắc phong panel, «Kỳ tới: Tết Đoan ngọ, còn 6 tuần» (tháng ba thượng tuần → right), no «Cách lần» row, no overflow. Known gap (worker point 3, not this branch's to fix, law 9): the kit §77c HUD chip still says «Kỳ thăng: 2 tháng · Tần» next to «còn 6 tuần» → HUD-SACPHONG / kit keeper: use pbWkIn(kitPromoHook().months) for «còn» and pbWk for the span.
- Co-op: see gates. Old save: PASS.

## Gates on 0aee038a (reviewer runs)
| gate | result |
|---|---|
| promo-build (Fold, SP_OFF set-ups) | 48/48 ok, 0 page errors |
| promo-build WITHOUT SP_OFF (judgement run) | 43/48: the 5 BAD rows are set-up writes that stat-pace paces (S.hh / x.sung jumps → «Hoàng hậu -12», «Sủng 0 (cần 38)»), not rule faults → SP_OFF is a fair set-up (as ag-moodknow); it hides no real break |
| kit-promo-hook | 8/8 ok, 0 errors |
| coop-e2e (live Worker, Fold host + iPad guest) | run 1: 142/143; run 2: **143/143**; LIVE 17f23656: 143/143. Run-1 miss «after rejoin: same world» = R#11/14/16/17 `.evc.902` A undefined / B {} — LIVE jcharge.js:30 chStore creates an empty map on a READ (chHave/chOK → chSync); intermittent, not promo code. Follow-up for MAIN (non-blocking): make chSync not write on read, or drop empty evc maps in the canonical compare |
| quickcheck core gates | all PASS except G4 button-crawl «fold · Ô lưu · Lui · close did not close its layer» = identical on LIVE 17f23656 (crawled LIVE myself) |
| quickcheck part 2 | QUICKCHECK PASS · open 1904 ms · old save ok · perf new/live render 210/224, tab 512/600, buổi 1271/1138 ms, tasks>200 26/27 |
| promo-next-rank | 8 BAD, identical rows on LIVE 17f23656 |
| promo-rules | 26/28, the same 2 FAIL on LIVE (NPC servant exam roll, 844x390 reveal button) |

Videos / shots: https://ctm-img.victoria-tntt.workers.dev/img/_review/promo-stack-lr4/ fold-755x1000.webm, ipad-1180x820.webm, fold-sacphong.jpg, ipad-sacphong.jpg, ipad-stage-hud.jpg, fold-hanhsu.jpg (kept for the land report; the lander wipes the folder after landing: python3 dev/site/cdn_sync.py --wipe-review promo-stack-lr4).

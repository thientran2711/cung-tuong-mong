# ROW 12 — rest of the leave-palace endings + removal ladder (review/row12-leave)
PRIORITY #1 CHECK ('leave-palace|removal ladder|xuất cung'): OD 5 | ledger 0 | claims 8 | main 15 | review/* 7 | archive 0 (brief line) + own: 'warn|báo trước|tố giác' OD L2531 (25/11 ~23:33Z) | main: none | review/*: none (no jaccw / accusation warning anywhere) | claims: none.
KIT CHECK: reuses the standard decision dialog (pushDil + PEND card, kitOptModel j67 line «tốn · thành · hỏng»), pv() figure, odds words (word/oddsCl) — no new kit part.
Worker = session_01N1tNP356pGppKtZtsMDUZ1 (B ROOT 3 child 1 → child 2 session_01N1tNP4FQic23a4wJXFSmP4). START_CTX ~4 %. Depth 2.
Owner rows read verbatim: OD 24/11 ~06:05Z, ~06:45Z, ~07:25Z, ~07:55Z (L2309–L2329); 25/11 ~23:33Z (L2530–L2531); 26/11 ~19:50Z, ~20:35Z, ~20:40Z, ~21:00Z, ~21:10Z/~21:40Z (PUNISH-TIER, L2641–L2668); 26/11 ~21:30Z (L2666, her life ends only by the Emperor / the reign / her own choice); 24/11 ~08:08Z (no pre-action reminder on HER choices).

## STEP 0 — what exists
| piece (owner ruling) | where | state |
|---|---|---|
| Own-choice leaving = ending + «Về sau» epilogue (L2309), no confirm (L2324), Trả thẻ bài ending (MAIN 117), P1/P2/P3 (MAIN 118) | leave-palace r1–r6 (E64/E74, PASS ×5); r6 34ed061c | NOT LIVE. jleave.js identical to r6 and leave-palace.test.js (PUNISH-TIER expectations) already RIDE review/lc34-3b-r2-rv184 1a6a1aed and review/punish-stack-live-4-r2-rv184 e58aaa5c (both contain LIVE 22afefb4; RV-184 verdicts pending) → no separate re-merge (it would duplicate the stack). leave-palace.test on e58aaa5c: 135/135. |
| Forced-removal severity ladder (L2328 (6)) | content OVERWRITTEN by PUNISH-TIER 26/11 (nhẹ · vừa giáng · nặng giáng + lãnh cung · tử tội ban chết / commuted phế vị + lãnh cung chung thân; evidence count by tier × rank group; witnesses nặng/tử; tự thú −1, chối +1, phản tọa, pregnancy deferral, lãnh cung exits) | built on the same stack (jpun / jcharge, her + NPC); rv-163k/l PASS |
| Reign-end fates (Thái phi / theo con ra phủ / ni cô Cảm Nghiệp / ân xá về quê / tuẫn táng) incl. nhường ngôi / phế / lật đổ | jmort mortFate + jreignend reTx → emperorDies → over() → «Về sau» | LIVE + stack; covered by leave-palace.test |
| Leave endings added after E64's audit | jcharge.js:206 «Bị đuổi khỏi cung» (bought servant), jselx.js:83 «Ban hoa» | both reach lpvKindOf (duoi / que); no gap |
| **«a punishment never falls without a prior visible warning … every forced move (giải ra, cấm túc, lãnh cung, đuổi về, triệu kiến)» (L2531)** for the CHARGE roads | NPC «Tố giác» (+ its Trình Hoàng hậu road), «Tố tội thật», «Bóc chuyện tư tình», the NPC Hoàng hậu «Xử tội» | **MISSING**: the penalty fell the same buổi with no word before it (only a chance Tai mắt tell for BIG schemes; these acts are not BIG). Built here. |
| Place / overstay part of L2531 | review/place-close (LIVE 611fca61) | LIVE |

## WHAT CHANGED (branch review/row12-leave; base now review/punish-stack-live-4-f1-rv184 57f6e2c4 ⊃ LIVE a96564ad)
- NEW dev/build/jaccw.js (assembled after jcharge.js): the hook sits on each act's own f() (after every runAct gate), plus judge():
  1. first real start of the act by an NPC accuser → PREPARE (S.accw record, accuser plan BAL.accw.due buổi, j40 plan runner; «Xử tội» has its own due runner) — no penalty;
  2. her dialog «Sắp bị tố giác» (always shown; Cung Chính ti sends word): who, charge, weight, penalty if it sticks, when; three tiers (law 2):
     Nhẹ «Tự thú trước» (only when a lighter weight exists; chConfess −1 tier now) · Vừa «Dàn xếp với X» (bạc paid only if X takes it; X hands back that charge's pieces) ·
     Nặng «Cầu Thái hậu / Hoàng hậu che chở» (a dearer gift, paid either way; case shelved, pieces burnt, X Danh −); ✕ = wait for the day (today's road);
  3. law 1: an NPC target answers with the same list (BAL.accw.npcW, mindPick); her own accusation runs at once (her tap = no settlement), the NPC target may still confess / seek a patron.
- dev/build/jbal2.js BAL.accw (every number: due, settle bac/per/cap/odds/oán, shield bac/odds/foeDanh/oán, npcW). Shield 150 > settle cap 120 (cost rises with tier).
- dev/test/accw.test.js (new). Penalty-core tests that call an act's f() directly (punish-tier, punish-wit, charge-smoke, charge-taps, dup-piece-scan, srv-mc-video) set window.__awoff=1 (one line each): they test the penalty, the warning step is tested in accw.test.js.
- The hook sits on the act's own f() (after every runAct gate: knowing her, j95 motive, a sent servant's road) — the warning only comes when the act really starts. «Trình Hoàng hậu» is wrapped through «Tố giác» (jcharge chTo), not twice.
- Her card: Vừa / Nặng carry ton:{bac} + fx (kit Tốn row «Bạc 50 / 150»); a refused settlement hands the bạc back.
- Penalties untouched: punTier / chPunish / the acts' f() decide them (one core).

## LAW TABLE
| law | how |
|---|---|
| 1 two-way | same prepare + same three ways for NPC targets; her accusation on an NPC lets the NPC confess / seek a patron |
| 2 tiers | Nhẹ · Vừa · Nặng, cost and result rise together; one matter, ≤3 options |
| 3 gain-and-loss | each option: tốn + thành/được; tự thú hidden when no lighter weight exists (it would gain nothing) |
| 4 one core | BAL.accw; penalty words = punTierTxt / chPunTxt rule; no typed number |
| 6 real world | bạc really moves to the accuser / patron gift; pieces really returned or burnt |
| 7 wording | cổ trang, odds as words, no % |
| 9 kit | standard PEND dialog + j67 line, no new part |
| 11 family | every NPC road that sentences her by a charge: accuse (+trinhhh road), tocao, expose, Hoàng hậu judge. Not in it: trinhth (quở trách, no punishment), frame / plant / giahoa (fabricated schemes: BIG plan + Tai mắt tell, and wdframe already opens her defence card) |
| 18 freeze | builds only L2531 + the brief's tiered ways out; no new feature beyond |

## TESTS
| test | LIVE / base (psl4 without jaccw) | this branch | MUTATE (BAL.accw renamed → jaccw off) |
|---|---|---|---|
| dev/test/accw.test.js (Fold 755x1000) | **FAIL 2/9**: «first Tố giác on her: rank 3→0, lãnh cung true» — the penalty fell at once, no dialog | **22/22** ×3 (stable after witness setup fix) | **FAIL 2/9** |
| punish-tier Fold + iPad · punish-wit · charge-smoke · charge-taps · dup-piece-scan · charge-trinh-punish · leave-palace (135/135) · one-core-guard | — | ALL PASS on 4480ae6e | — |
| quickcheck 4480ae6e vs LIVE a96564ad | — | core «typed threshold» DIFF ×2 in jph.js:173 / jkpick.js:141 (files this branch does not touch: from the psl4/LIVE side) · Q-SOFTLOCK FAIL (1) inside quickcheck (run timed out at 1500 s on a loaded box); standalone dev/test/q-softlock.js: this branch **PASS**, bare psl4-f1 57f6e2c4 FAIL 8 (person-view hold, same box) → flaky on this box, not the branch; quickcheck perf not finished (timeout) → BIG rv reruns quickcheck on a quiet box | — |
Shots (scratch only, not uploaded; looked at 3×): Fold 755x1000 + iPad 1180x820 «Sắp bị tố giác»: whole text (who · charge (weight) · judge · 2 buổi · penalty if it sticks · wait line), three hand cards Nhẹ · Tự thú trước (Tốn không) / Vừa · Dàn xếp với Quý phi (Tùy duyên / Khó lường, Tốn Bạc 50) / Nặng · Cầu Thái hậu che chở (Có cơ / Khó lường, Tốn Bạc 150); no overflow, 0 page errors. Note: the kit voice rule prints «ngươi» as «ta» inside the dialog text (house rule, not this branch).

## NOT DONE / FOR MAIN (law 18, parking)
- Servant accusations (jagstaff asOpt «accuse» to the Hoàng hậu) and road-event accusations (j4, j67, jrd_*) already open her own event card with options before the verdict → left as they are.
- NPC fates at the Emperor's death (E64 note §E) stay player-only: her life ends there (OD 26/11 ~21:30Z), the j99succ epilogue freezes the world — parking-lot, not built.

SẴN SÀNG KIỂM review/row12-leave 4480ae6ea012610e7ac8c4dc235563fceec089ed (BIG; base psl4-f1 57f6e2c4 ⊃ LIVE a96564ad). Land after (or with) psl4-f1.

## HANDOVER
Worktrees /home/user/wt/r12 (branch), /home/user/wt/r12ho (handover). Shot script /home/user/wt/r12-shots/shot.js. Nothing open beyond the BIG rv.

## REVIEW (B BIG RV row12-leave, session_01N1tNP2Dw6kcWdsVjWrLddR, opus, FRESH; depth 3; START_CTX ~4 %) — 11/28/2026
PRIORITY #1 CHECK ('row12|leave-palace|accw|warning before punishment|PUNISH-TIER'): OD L2531 (25/11 ~23:33Z) + PUNISH-TIER L2641–L2668 | main LIVE now c03d6ee7 (lc35-ui5 on a96564ad; branch merges with main only in built files + KIT_REQUESTS.md, lander's job) | review/* leave-palace-r6, row12-leave 4480ae6e on psl4-f1 57f6e2c4 | claims B-ROW12 356pGppK.
KIT CHECK: reuses pushDil/PEND standard dialog + j67 «tốn · thành · hỏng» line + pv() figure + oddsCl words — no new part (static read; device shots not taken, see verdict).

**VERDICT: FAIL review/row12-leave 4480ae6ea012610e7ac8c4dc235563fceec089ed** (no r2: the gaps are design-size, not small fixes).

### What is sound (keep it)
- jaccw hook on ACT.accuse/tocao/expose f() + j8 judge(): prepares once, fires once. j40 plan runner clears v.plan before mindRun and npcAct is blocked while a plan is held, so no double-apply and no skip on the due buổi; awDel on every way out clears record + plan. Save/reload: S.accw + NPC .plan live in the save; PEND.accw rebuilds from the record; old save (no S.accw) reads null. Death/leave of either side: awLive / awOn guard both.
- Her card money: chooseM applies fx once, then go(); a refused settlement hands the bạc back (awPay(S,-pr) → +pr); a taken settlement moves pr to the accuser (law 6c OK). Numbers all from BAL.accw (law 4). Wording cổ trang, odds as words, no % (law 7). Kit dialog only (law 9).

### FAIL list (numbered, for the worker)
1. **LAW 11 / L2531 family incomplete** — the owner's rule is «a punishment never falls without a prior visible warning … every forced move». The branch covers 4 acts + judge; a full scan of every punishment call site (punTier / chPunish* / fall / punish / demote / cold / deathSentence, ~100 sites, table below) finds these roads that still land on HER the same moment with NO prior card or notice:
   | # | path | penalty | warned? |
   |---|---|---|---|
   | a | j30.js:16 demoteReview — Sủng under the rank floor 2 months | giáng | NO (month 1 only lowS+1, silent; floor shown nowhere) |
   | b | j30.js:17 demote after long illness | giáng | NO |
   | c | ACT xinhh «Xin Hoàng hậu giáng» by an NPC (RVGRP «Hại nặng» / BANDS[2]) → jaudit.js:267 → jrcv.js:218 rcvJudge (card only when q===S) → demote | giáng | NO |
   | d | j8.js:582 monthly Cung Chính ti raid → search() → fall / punish(p,…,2) (j8:361/364/365; only bùa opens the vuoan card) | giáng / lãnh cung | NO |
   | e | j92.js:298→295/297, jshelf.js:303/311, jdress.js:96 NPC «Hặc ăn mặc sai phẩm» / vượt phẩm / xa xỉ | khất bổng, thu đồ, cấm túc (quốc tang) | NO (passive dress hint only) |
   | f | jmen.js:260→213/209, jroute.js:122-124 a witness reports her with a man / tryst at once | tư thông: tử tội / cấm túc | NO |
   | g | j8.js:512 bribed maid sells her schemes | punish(…,2) | NO |
   | h | jagstaff.js:123 her own servant accuses her to the Hoàng hậu → fall(m) | giáng + Sủng | NO (the report's «servant accusations open her card» is not true for this road) |
   | i | j10.js:177/178/167 faction: hợp mưu on her / failed joint scheme / co-member sells out | fall / punish | NO |
   | j | j8.js:205 kframe (son framed for trù ẻo) — only a mindTell roll (≤80 %) | punish | chance only |
   | k | jtsb.js:103 she bullies twice, victim reports to the Hoàng hậu | chPunish uh | NO (her card never names the report) |
   | l | j14.js:29 lãnh cung minh oan exposes her as the framer · j8.js:471 birth omen «yêu vật» | fall / punish(2) | NO |
   | m | jaccw.js:88 NPC Hoàng hậu judge() when chReady() is null → j0 → j8:228 punish(p,…,n>=3?2:1) | punish | NO (fallback bypasses the warning) |
   | n | servant life: jcharge.js:206 «Bị đuổi khỏi cung», j42.js:589 chest search | đuổi / chết | NO |
   Warned (OK, no change): her own choice cards with «hỏng/lộ: bị phạt / phản tọa / ban chết» (j2, j7, j13, j22, j4, j41/j77, j55, jreign, j92:392, jemoact, j95, jroute, jcharge:165, j9/j8 her acts); defence cards before the verdict: vu oan jtruth vuoan, giahoa wdframe, rtBm blackmail, rcpacc, jworld2 vu cổ; prior notices: jlost hearing, jstagehere closing, quốc tang notice (j92:414), cn2 story; NPC-only / coop-only / reignend p===S skip.
   Fix (one rule, law 11): ONE shared «warned before it falls» step in front of the penalty core for every NPC/system-initiated road on her (a–n), either the jaccw prepare (2 buổi + «Sắp bị …» dialog with the Nhẹ·Vừa·Nặng ways out) or, for the monthly/system checks (a, b, d, e), a kit notice one step ahead (e.g. demoteReview month 1 «Sủng dưới mức … thêm một tháng sẽ bị giáng»). Add a scan test that fails when a punishment core call reachable for S has no preceding warning hook.
2. **LAW 1 two-way / brief check (4)** — her own accusation (accuse/tocao/expose, and her Xử tội as Hoàng hậu: judge wrap skips q===S) runs at once, while an NPC's is prepared 2 buổi; the NPC target can only confess / seek a patron (no «Dàn xếp» offer to her). Make her accusation ride the same 2-buổi prepare, the NPC target answering with the same list incl. a settlement offer she can take or refuse (her dialog).
3. **LAW 2 (soft, fix with 1)** — Vừa «Dàn xếp» and Nặng «Cầu che chở» give the same kind of result (evA(a,t,-n,c) in both: «trả lại» = «đốt» in code); Nặng adds only foe Danh −3 / oán, costs 150 non-refundable vs ≤120 refundable, and its base odds (shield.base 40) are BELOW Vừa (settle.base 45). Make Nặng's result truly bigger (e.g. the accuser loses ALL her pieces on her, or is phản tọa-lite) and its base odds not below Vừa. Also the Thái hậu gift goes to no one (bạc vanishes; law 6c-adjacent: record it as a real gift/ledger).

### Tests run (this box, quiet, ONE browser process at a time)
- quickcheck ALONE 4480ae6e vs live c03d6ee7: **FAIL** (2231 s total, quiet box). Core gate G1 one-core-text-rule DIFF ×2 jph.js:173 / jkpick.js:141 (files this branch does not touch: psl4/LIVE side) · time-spill PASS · open 2343 ms 0 errors · old save from live loads + plays a buổi OK · perf (median of 3 new/live) render 372/308 ms, tab 709/699, buổi 2295/2058, **longTasks>200ms 62/37 (limit 56) FAIL** — not attributed (base psl4 also differs from live c03d6ee7); the r2 rv must A/B perf psl4 57f6e2c4 vs branch.
- accw.test.js (Fold 755x1000) on 4480ae6e: 22/22 ok, 0 page errors (×1; confirms the 4-act hook works as claimed).
- Not run after the FAIL was clear (device shots, accw ×3/MUTATE/base, punish-*, leave-palace, oldsave-r1): the worker's numbers stand as theirs, not re-proved here; the r2 rv must run them all.
Shots: none taken (nothing uploaded, nothing to wipe).

## r2 (B FIXER ROW 12 leave r2, session_01N1tNP4252yURGUqLCgK7NK, opus; START_CTX ~5 %) — 11/28/2026
PRIORITY #1 CHECK ('row12|accw|warning before punishment|OD L2531|PUNISH-TIER'): OD L2531 (25/11 ~23:33Z) + row 12 WORKLIST_OPEN | main LIVE aecbc267 (lr-rules-r3 = psl4 57f6e2c4 + rules chain: RV-184 one-core scanner fix 617ea888 + stale-tests-8 chReady perf fix abda1390) | review/* review/row12-leave 4480ae6e → review/row12-leave-r2 | claims B-ROW12-LEAVE r2 FIXER = this session.
KIT CHECK: reuses pushDil / PEND standard dialog + j67 «tốn · thành · hỏng» line + Tốn row from ton:{bac} + pv() figure + oddsCl words + kitNotice (the month-ahead warning) — no new kit part.
Base: review/row12-leave 4480ae6e + merge LIVE aecbc267 (psl4 57f6e2c4 no longer moving; LIVE already holds psl4 + the rules chain) — only index.html / sw.js conflicted (rebuilt).

### What changed (rv FAIL list 1–3 + quickcheck)
1. **LAW 11 / OD L2531 — ONE warn-then-punish path for the whole family** (dev/build/jaccw.js, now assembled LAST so its wrap is outermost; also re-wraps after the j95 load timer):
   - every punishment core is wrapped: punish · fall · demote · chPunishX (chPunish / chConfess / chLie / chBack fall through it) · deathSentence · cold · punTier · srvAffairCaught · chSrvEnd · srvLaundry · **srvKill** (new named core in j42 for «sai đánh chết», was a bare die()).
   - the gate holds a core that would land on HER when the road is not her own choice: world turn (nextBuoi / endTurn context: monthly checks, raid, servant-life search, faction, birth omen …), an NPC doer (runAct of an NPC / a «by» / ACTX / CHX accuser), or a witness road inside her action (menReport / rtReport). Her own card tap (chooseM) and her own act (runAct a===S) fall at once — the card already named the risk.
   - held = a plain record in S.accw (core name + serialised args + CHX/PUNT snapshot) + her kit dialog «Sắp bị trị tội»: who brought it, the matter, the penalty if it sticks (the core's own rule words: aaPunishTxt / punTierTxt / chPunTxt), when (BAL.accw.due buổi); on that buổi the held core runs exactly as it would have (whole wrapped chain, gate passing). Same matter twice = one record; two matters = two.
   - three tiers: Nhẹ «Nhận tội trước» (the same penalty one step lighter now) · Vừa «Dàn xếp với A» (only with an NPC accuser; bạc to A, paid only if A takes it, refund on refusal; A hands back that charge's pieces) · Nặng «Cầu P che chở» (gift to the Hoàng hậu or into the Thái hậu's household S.thO; success = case shelved AND the accuser loses EVERY piece she holds on her + Danh − + oán).
   - monthly checks warn a month ahead (j30 demoteReview): Sủng under the floor → kit notice «Sủng của ngươi (n) dưới mức f của …; thêm một tháng như vậy sẽ bị giáng một bậc», long illness → «… tháng sau nếu Sức khỏe còn dưới 35 …» (BAL.accw.sickSuc); the next month's fall is then already warned (awOk). An old save already mid-count without the notice → held + warned by the gate.
   - already-warned world road: place-close overstay (plaque notice) runs inside awOk.
2. **LAW 1 + brief check 4** — her Tố giác / Tố tội thật / Bóc chuyện tư tình and her «Xử tội» as Hoàng hậu (also with no charge) now PREPARE 2 buổi like an NPC's; the NPC target answers the same list: confess (lighter now), seek a patron (her pieces burnt, her Danh −), **offer HER a settlement** (new dialog «Xin dàn xếp»: «Nhận bạc, bỏ vụ tố» / «Không nhận, cứ tố»), or wait; on the due buổi her act runs by itself (due runner).
3. **LAW 2 / 6c** — Nặng is a different, bigger kind (all the accuser's pieces on her burnt, not one charge's) and dearer (150 vs ≤120); odds base Nặng 60 > Vừa 45 (a band apart: Có cơ vs Tùy duyên); the Thái hậu gift goes into S.thO.bac (a real owner), the Hoàng hậu's into her purse.
4. quickcheck G1 DIFF ×2 (jph:173 / jkpick:141) was the psl4/LIVE side — fixed upstream by RV-184 617ea888, now in LIVE aecbc267. Perf: see quickcheck below (branch vs LIVE aecbc267, which = psl4 + the rules chain incl. the chReady perf fix).

### LAW 11 family — before / after (the reviewer's roads a–n)
| # | road | r1 4480ae6e | r2 |
|---|---|---|---|
| a | j30 demoteReview low Sủng | silent month 1, demoted month 2 | month 1 kit notice (awPre); month 2 falls warned; unwarned → held + dialog |
| b | j30 long-illness demote | none | month-ahead notice (sick===1); then falls warned |
| c | NPC «Xin Hoàng hậu giáng» → rcvJudge → demote | none | demote held (NPC doer, runAct npc ctx) + dialog |
| d | j8 monthly raid → search → fall / punish | none | held (world ctx) + dialog |
| e | j92 / jshelf / jdress hặc ăn mặc · vượt phẩm · xa xỉ | none | punish held (NPC act) + dialog |
| f | jmen menReport / jroute rtReport witness | none | menReport / rtReport run in npc ctx → held + dialog |
| g | j8:512 bribed maid sells her schemes | none | punish held (world ctx) |
| h | jagstaff accuse (her servant → Hoàng hậu) | none | fall held (ACTX = the queen / world ctx) |
| i | j10 faction hợp mưu / sell-out | none | fall / punish held |
| j | j8 kframe (son framed) | chance tell only | punish held (NPC act) |
| k | jtsb bully report to the Hoàng hậu | none | chPunish held (NPC doer / CHX accuser) |
| l | j14 minh oan exposes her · j8 birth omen | none | fall / punish held |
| m | jaccw judge() fallback (no charge) | punished at once | j8 judge punish held by the gate (NPC queen); her own Xử tội prepared |
| n | jcharge chSrvEnd · j42 chest search / pregnancy (srvAffairCaught) · j42 «sai đánh chết» | none | chSrvEnd / srvAffairCaught / srvLaundry / srvKill held + dialog |
Scan (dev/test/accw-scan.js, guard): **169 core call sites → all through the wrapped cores (gate)**; **47 direct punishment writes** (confined= / rank=punDown / seatPut / S.out= / die(«… đánh chết») / over(«Bị đuổi»)) → 47 reasoned (inside a core, a release/pardon, her own card, NPC-only, quarantine, view trick), **0 unknown**; jaccw.js last module; every core wrapped. A new direct write → FAIL. `node dev/test/accw-scan.js --table` prints the full per-site tables.
Not punishments (not gated, by design): deaths by murder / illness / childbirth (die() from poison, sickness …), Danh / Sủng hits of rumours, quarantine (j13 epidemic). NPC victims of world / NPC roads fall at once (no player to warn; NPC acts on NPCs prepare at act level as in r1).

### Tests (this box, ONE browser process at a time)
| test | result |
|---|---|
| accw.test.js (Fold 755x1000) | branch **57/57 ×3** · LIVE aecbc267 **FAIL 2/9** (no dialog) · MUTATE (BAL.accw renamed → jaccw off) **FAIL 2/9** |
| accw-scan.js | PASS (169 → gate, 47/47 reasoned, 0 unknown) |
| punish-tier Fold + iPad · punish-wit · charge-smoke · charge-taps · dup-piece-scan | ALL PASS |
| charge-followups · charge-trinh-punish | PASS with __awoff=1 (they test the penalty notice rows; without it they FAIL only because the penalty is now held — the held dialog text shows in the FAIL line) — same honest rule as r1's 6 penalty-core tests |
| leave-palace.test | 135/135 |
| one-core-guard | PASS |
| q-softlock (alone) | PASS |
| oldsave-r1 (LIVE aecbc267 save → branch) | 16 ok / 0 FAIL |
| save mid-wait | accw.test: real save() → deser(loadSlot) with a held record: record + her card back, then falls once on its day |
| quickcheck ALONE 0654c1cc vs LIVE aecbc267 (quiet box) | **PASS** 2174 s · core gates PASS (one-core-guard G1: 0 DIFF — the jph/jkpick rows are gone with RV-184 in LIVE · rules-one-source · kit-conform · coop-one-world · 17 hooks incl. q-softlock) · time-spill PASS · open 2180 ms 0 errors · old save from LIVE loads + plays a buổi · perf median of 3 new/live: render 325/314 ms, tab 612/621, buổi 1889/1761, **longTasks>200ms 47/48** (limit 56) — the r1 62/37 was the psl4 base vs c03d6ee7, gone on LIVE aecbc267 (stale-tests-8 chReady fix); this branch adds none |
Shots (scratch /home/user/wt/r12r2-shots, not uploaded; Fold 755x1000@2 + iPad 1180x820@2; looked at: core dialog ×3 (one full-size Fold pass), act dialog ×2, tiers / offer / notice ×1): «Sắp bị trị tội» (accuser named, matter, penalty, 2 buổi; Nhẹ Tốn không / Vừa Tùy duyên–Khó lường Tốn Bạc 20 / Nặng Có cơ Tốn Bạc 150), Nhẹ tapped → kit punishment notice «Cấm túc · mức tội nhẹ · giáng phẩm không», Vừa → bạc 500→480 no penalty, Nặng → 500→350 no penalty, «Sắp bị tố giác» act dialog (Bạc 60 / 150), «Xin dàn xếp» (her accusation, 60 lượng offered), month-ahead Sủng kit notice; no overflow, 0 page errors.

SẴN SÀNG KIỂM review/row12-leave-r2 0654c1cc932f69783c2b32523f47307125e081b9 (BIG; on LIVE aecbc267).

## REVIEW r2 (B BIG RV row12-leave r2, session_01N1tNP3VG7pVqhdoME4FsFh, opus, FRESH; depth 4; START_CTX ~4 %) — 11/28/2026
PRIORITY #1 CHECK ('row12|leave-palace|accw|warning before punishment|PUNISH-TIER'): OD L2531 (25/11 ~23:33Z) + row 12 WORKLIST_OPEN | main LIVE 8a30664e (⊃ aecbc267) | review/* row12-leave 4480ae6e (FAIL), row12-leave-r2 0654c1cc (this) | claims B-ROW12 r2 FIXER 4252yURG.
KIT CHECK: reuses pushDil / PEND standard dialog + j67 «tốn · thành · hỏng» line + Tốn row (ton:{bac}) + pv() figure + oddsCl words + kitNotice — no new part (see FAIL 4 for the empty-option fallback text).
Ancestry: aecbc267 IS an ancestor of 0654c1cc (so psl4 57f6e2c4 content is inside, via LIVE, not ridden separately). `git merge-tree --write-tree --name-only origin/main(8a30664e) 0654c1cc` → conflicts index.html + sw.js only (built files) = OK.

**VERDICT: FAIL review/row12-leave-r2 0654c1cc932f69783c2b32523f47307125e081b9** (4 items; each small, but item 1 touches the gate design → back to the fixer, not fixed here).

### What is sound (keep it)
- The gate idea works: all 11 cores wrapped and outermost at runtime (probe after load: every core `__aw`, contexts chooseM=her · nextBuoi/endTurn=w · menReport/rtReport=npc · runAct=act). The j95 / jagent timer re-wraps fire at 0 ms before jaccw's own 0 / 400 ms re-wrap; no double hold (AWIN). Save mid-wait → load → falls once on its day (accw.test real save()/deser). Her own tap / own act falls at once. Same matter = one record.
- Act-level accusations (law 1): her Tố giác / Tố tội thật / Bóc chuyện / her Xử tội prepare 2 buổi; the NPC answers incl. «Xin dàn xếp» to her (take / refuse). Nặng = all accuser pieces burnt, base 60 > 45, gift into S.thO / the queen's purse (law 6c traceable); a refused settlement refunds.
- j30 month-ahead notices work (fuzz: «pre:lowS» set, the month-2 demotion fell inside awOk, 2 seeds × 300 buổi).
- Fuzz (own instrument: setters on S.rank / confined / out / dead / cutPay / srv.lau record the stack + gate context of every worsening write): consort life 2 × 300 buổi with rivals hating her + her own deeds: 0 unwarned writes. Servant life 4 × 400 buổi: every Tân giả khố fell via awFire (held 2–3 per run) — BUT see FAIL 2.

### FAIL list (numbered, for the fixer)
1. **Gate safety — part of the penalty falls BEFORE the gate (penalty split; brief check 3 «no penalty lost»).** jcharge.js:216 wraps chPunish and runs chExtras FIRST (Ức hiếp → chUhPay: she pays BAL.charge.uhPay bạc to each victim; Mua chuộc → chMcFire: bought servants expelled), then calls chPunishX, which the gate holds. So the bồi thường bạc / dismissals fall at once, unwarned, even when she later escapes by Vừa / Nặng; and when the held chPunishX fires the «Bồi thường» / «Người hầu bị mua» notice rows are gone (CHPX was reset). A/B proof: charge-followups WITHOUT __awoff → «PASS ức hiếp her: she -20, victim +20» but «FAIL her notice: «Bồi thường» row names the victim» + «FAIL mua chuộc her: … notice row «Người hầu bị mua»»; charge-trinh-punish WITHOUT __awoff → «FAIL her notice: Chứng cứ + Bồi thường rows» (held dialog shown). So the __awoff in these two tests is NOT only a «the penalty is now held» switch: it hides this split (brief check 7 = not honest as a blanket). Same pattern: j8.js framed() applies Danh/Sủng − BEFORE punish(p,why,2). Fix (law 11, whole group): gate at the outermost penalty entry — add chPunish (and framed, or move framed's Danh/Sủng inside the held call) to CORE so the extras are held and fire together with the penalty; keep one notice with its rows; then drop __awoff from charge-followups / charge-trinh-punish (or keep it only after a held→fire variant of the same rows passes).
2. **LAW 11 family — servant-life punishments still unwarned (runtime-confirmed).** j42.js:327-330 srvMoodEvent «beat»: the master «sai thái giám đánh ngươi hai mươi trượng», Sức −20..34, and `die(«Bị … sai đánh trượng đến chết»)` when Sức ≤ 0 — no warning (fuzz: «Bị đánh đòn» 3–5× per 400 buổi, while its sibling branch «out» → srvLaundry IS held). j42.js:301 betrayFind «kill»: bare `die(«… sai người dìm ngươi xuống giếng …»)` — the line just above (spyFind) was moved to srvKill, this one was not; accw-scan's die() regex only knows «đánh chết / ban chết …», so it reports 0 unknown. Fix: route the beating through a named core (e.g. srvBeat, gated like srvLaundry) and betrayFind through srvKill; widen accw-scan BX for die()/apply({suc:-…}) punishments by a master/judge (dìm, giếng, trượng, đánh đòn).
3. **LAW 7 wording — held punTier shows the raw tier key as the offence.** jaccw awWhy() falls to awPlainWhy(A[1]) for punTier, but punTier(p,x,why,by) has the reason at A[2]; her card reads «Cung Chính ti báo tin: ta sắp bị xét tội **nang**, trong 2 buổi tới» (own Fold 755x1000 shot; also in accw.test's own output «sắp bị xét tội nang»). Fix: punTier → A[2] (and an accw.test assertion that the matter text has no tier key nhe/vua/nang/tu).
4. **LAW 7/9 — a held core with no way out (servant cores) shows the kit's empty-option fallback.** «Sắp bị trị tội» for srvLaundry (own iPad 1180x820 shot): «ta sắp bị xét tội chủ nhân chán ghét ta, sai người giải xuống Nội vụ phủ» + the box «Lúc này không còn việc để chọn · Đóng thẻ này; khi đủ điều kiện, việc sẽ mở lại.» — wrong for a warning (nothing will «open again»), and «xét tội <a whole sentence>» reads badly. Fix: for a held core with no tier option use the kit notice / one plain acknowledge option per the standard dialog (no new part), and say the matter as «bị …» (awSay's «bị» branch) for the servant cores.

### Advisory (not blocking; for MAIN / balance)
- Vừa with no charge pieces costs BAL.accw.settle.bac (20 lượng) whatever the penalty — a world/NPC death sentence or lãnh cung can be bought off for 20 at Tùy duyên-ish odds; Nặng 150 regardless of weight. Law 2 holds inside one matter, but a price that scales with the held penalty's tier would keep law 6a's «her defence can fail» meaningful.
- NPC victims of world / NPC core roads still fall at once with no ways out (she has three) — r1 accepted «no player to warn»; if MAIN reads law 1 as covering the ways out, that is a follow-up.
- j20 payCuts (the queen khất bổng her for hatred, no warning, bypasses the cores) is dead while agDOn() is true (default); if the agent day is ever off it is an unwarned punishment.

### Tests run (this box, ONE browser process at a time)
| test | result |
|---|---|
| accw.test.js (Fold 755x1000) on 0654c1cc | 57/57, 0 page errors (×1) |
| accw-scan.js | PASS (169 → gate, 47/47 reasoned, 0 unknown) — misses FAIL 2 (regex) |
| charge-followups / charge-trinh-punish WITH __awoff | ALL PASS / ALL PASS |
| same WITHOUT __awoff (A/B) | 2 FAIL / 1 FAIL — the FAIL 1 split (rows lost, bạc already paid) |
| own fuzz (state setters + gate context) | consort 2×300 buổi: 0 unwarned · servant 4×400 buổi: Tân giả khố all held; «Bị đánh đòn» unwarned 3–5×/run |
| own shots Fold 755x1000 + iPad 1180x820 (scratch, not uploaded; looked at 3×) | fall card (3 tiers, Tùy duyên / Vững, Bạc 20 / 150) OK, no overflow, 0 page errors; punTier card «tội nang» (FAIL 3); srvLaundry card empty-option box (FAIL 4) |
Not run after the FAIL was clear (the r3 rv runs them all on the final sha): accw ×3 / MUTATE / LIVE, punish-tier, punish-wit, charge-smoke/taps, dup-piece-scan, leave-palace, one-core-guard, q-softlock alone, oldsave-r1, quickcheck ALONE, «Phế» seal on cấm túc nhẹ on LIVE (item 10, unverified). r3 must also merge LIVE 8a30664e (built files only conflict).
Shots: scratch only, deleted with this verdict (nothing on the CDN, nothing to wipe).

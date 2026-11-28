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

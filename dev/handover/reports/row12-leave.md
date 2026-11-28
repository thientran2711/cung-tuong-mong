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

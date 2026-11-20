# ge-rank REVIEW (E35r, opus, BIG: rules/numbers) — PASS c5ebab9a1fb01b468b54cfa4eaff596059f6b46d
PRIORITY #1 CHECK ('law-5|rank key|GE law|ge.odds.rank'): OD 0 | main 0 (jge.js geOdds had no rank term; jbalge.js odds {base,per,min,max,noCond}) | review/* review/ge-rank only | claims E35 — ask from reports/ge-batu.md:55,109. GRAND_ENDINGS.md §2 line 94 already fixed in place on the handover branch.

Verdict: **PASS c5ebab9a1fb01b468b54cfa4eaff596059f6b46d** — no fixes needed (review/ge-rank-r1 not pushed: identical to review/ge-rank). FF holds on LIVE origin/main 548dcd0d (re-fetched at final merge, unchanged).

## What changed (read in full)
`BAL.ge.odds.rank: 2`; `geOdds` = base + pull·per − geRk()·rank → clamp [min,max] → noCond cap (order kept). `geRk()` = rkOf(S) (the one rank reader), servant life (isSrv) = S.srv.rk, clamped 0…7, try/catch → 0. Tests: ge-engine `rank` check, ge-rank-scan (new), coop-e2e COOP_GE probe. index.html + sw.js rebuilt (quickcheck build check PASS).

## Laws
- Law 5 (harder as she climbs): holds on 160/160 endings, every wave (pilot, W1–W3, Ba Tư jgedata_bd). Sane, not a wall: pull 0/3/6 at Hoàng hậu = 8/35/62 vs 22/49/76 at Đáp ứng (−14 max); never below min 5. Road chapter odds already carry their own ["-m","rank"] term (jbalbd) — same pattern.
- Law 4 (one core): geOdds is the ONLY GE odds site (jge.js:87 ge2 ladder word and :95 resolve both call it); no jgedata file types odds; one-core-guard PASS (inline 3776 ≤ 3930). No player word typed.
- Law 2/3: the rank term is the same for all 4 endings of a branch → their order never changes, none dominated; min 5 → none impossible; noCond cap is a min, so no inversion. Gain-and-loss unchanged.
- Law 1 / NPC rivals: no NPC or rival calls geOdds (git grep: only jge.js); in co-op each seat rolls on its own S — two-way checked.
- Old saves: nothing saved changes; S.srv missing/rk missing → step 0 (quickcheck old save ok).
- Note (not a fault): the maid ladder is 0–4 (MRCOL 5 rungs), so a servant life tops out at −8, a consort at −14.

## Gates (this box, c5ebab9a)
| gate | result |
|---|---|
| quickcheck alone (bash dev/tools/quickcheck.sh) | QUICKCHECK PASS · core gates PASS · old save ok · perf render 194/204, tab 380/424, buổi 1182/985, tasks>200ms 19/18 |
| ge-engine all | 1328/1328 |
| ge-rank-scan | PASS 0 faults, 160/160 after (0/160 before) |
| ge-guard | 8/8 |
| ge-bd-scan | 34 hits, ERRORS 0 |
| one-core-guard | PASS |
| CO-OP coop-e2e COOP_GE=1 (tt host / nc guest, live Worker) | 74/74 — each seat reads her own rank, host 5/guest 1 → 39/47, swapped → 47/39, again after 3 merged weeks |

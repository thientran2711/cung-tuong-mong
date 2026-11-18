PRIORITY #1 CHECK ('kỳ nguyệt|jcycle|cyBase|cycle-roll'): OD 5 | ledger 1 | claims 7 (none on this fault; D21 coop-b1b5 jcycle relay = done/live) | main 15 (jcycle.js cyBase/cyDaysM; jcoopworld.js B2 × jcycle relay) | review/* 0 → fix in jcycle.js, no second cycle model.

# cycle-roll: Kỳ nguyệt sự length rolled 5/6/7 EACH MONTH per woman (worker report, D9 brief)
START_CTX ≈ 4 % of the window (own estimate). Branch review/cycle-roll from live main 9fdc1199.

## What changed
- dev/build/jcycle.js: new BAL.cyc.len:[5,6,7] (the ONE place the set lives). cyBase(p) now holds only her fixed traits (t = cycle tuần, o = usual first day); the length is gone from it.
  New cyLen(p,mi) = BAL.cyc.len[hash("cyl|"+name+"|"+mi) % n]: rolled per (woman, month index). mi = S.turn = one value per year+month, so the seed is name + year + month; it is a pure function, so both co-op seats compute the same, and the player, NPCs and the co-op friend entry ({name}) all follow the same rule.
  cyDaysM(p,mi) reads cyLen. The first day is clamped so the whole cycle stays inside ONE tuần of ONE month (CY_TD=10), so a cycle never crosses into the next month and never changes length partway through. window.cyLen and window.cyDaysM are exported.
- dev/build/jflip.js cycleOf(): it used to compare cycleDaysOf(days 1..30) with S.tuan (0..2), which was wrong. It now reads cyTray(p), the same fact the night flip uses (it keeps the báo sớm / giấu lie rules).
- dev/test/cycle-roll.js: a new bot check.
- Old saves: nothing about the cycle is saved (it is pure name+month), so an old save just recomputes. quickcheck "old save ok".

## Whole family: readers of the length (before → after)
| reader | before | after |
|---|---|---|
| cyDaysM (jcycle) | len = cyBase.l, fixed per person for life | cyLen(p,mi), per month |
| cycleDaysOf → calendar jmcal:133 "Nguyệt tín" | fixed len | per-month len (shot: iPad dots 1–5 = len 5) |
| maid VIỆC card "Kỳ này (…)" PEND.cyrep → cyDaysM | fixed | per-month (Fold shot "mồng 1–6" = len 6) |
| Kính sự phòng book cyRep → cyDaysM (this month + last month) | fixed | per-month (last month gets its own roll) |
| jflip cycleOf (grey cards on the tray) | wrong days-vs-tuần compare | cyTray (same as nightCh) |
| cycOn / cyTray / nightCh / steal / late visit / jcoopworld B2 cyWait / cyPhase (conception fert) / cycleLate | tuần-based (cyBase.t) and do not read the length | unchanged (still tuần-based, t is unchanged, so co-op and conception give the same results as before) |
| typed 5/6/7 | `5+((h>>>7)%3)` in cyBase | none: BAL.cyc.len only (the test sets len=[4] → days follow) |
Note (not in this brief): OD 16/11 19:00Z says the cycle should block BY DAY inside the 10-night ledger. cycOn/cyTray still block the whole tuần. That is a separate job, so I left it untouched.

## Gates
- one-core-guard: PASS, 0 fails (inline 6669 ≤ baseline 6691).
- quickcheck.sh @a07bc14c: QUICKCHECK PASS · old save ok · core gates PASS · render 324/313 ms (+3.5 %), buổi 1089/1059 ms (+2.8 %), tab 350/411.
- cycle-roll.js (new): PASS, 396 draws (11 women × 36 months), split 5:.341 / 6:.341 / 7:.318; month→next month length changes in 81.6 % of pairs; every woman has ≥ 2 lengths; never crosses a tuần or month; friend entry = her; cycleDaysOf / maid card / calendar = cyLen; BAL drives it.
- cycle.js: "logic ok". Its UI part fails with "pop-up not shown" on LIVE main too: the start "Rương đồ khuê các" chest covers the pop-up, and the test's text regex is old. So this is not mine and not worse.
- coop-e2e (live worker): mine 60 ok / 0 FAIL vs live 59 / 1. coop-cyc: flaky on the live worker (live 33 ok; mine 26, then 36 ok, with different steps failing each run), so not worse.
- Shots LOOKED at (scratch, not in git): Fold 755x1000@2 VIỆC "Kỳ nguyệt sự" ("Kỳ này (mồng 1–6)", nothing overlaps, figure feet whole); iPad 1180x820@2 Lịch tháng with Nguyệt tín dots on 1–5. Page errors 0.

SẴN SÀNG KIỂM a07bc14cfd33bca8795ea576803bc17006ed17f5

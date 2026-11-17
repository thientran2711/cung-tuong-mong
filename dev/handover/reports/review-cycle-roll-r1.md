PRIORITY #1 CHECK ('kỳ nguyệt|jcycle|cyBase|cycle-roll'): OD 5 | ledger 1 | claims 7 | main 15 | review/* 1 (review/cycle-roll = this job) → review only.

# REVIEW r1 — review/cycle-roll @a07bc14c (opus reviewer, D9 brief)
START_CTX ≈ 5 % of the window (own estimate). Review branch review/cycle-roll-r1 = a07bc14c + merge of live main 05ebe3da (npc-agent-ag2-r2) + site rebuilt → 968e6209. Generated-file conflicts only (index.html, sw.js, assets.json): took main's, rebuilt with dev/site/build_site.sh. No code edits needed.

## (1) Whole family: every reader reads the one per-month function
git grep cyBase|cyDaysM|cycleDaysOf|cyTray|cycleOf|cyLen on the branch:
- cyDaysM → cyLen(p,mi) (the only length source; cyBase no longer carries a length).
- cycleDaysOf (jmcal:133 Nguyệt tín marks), maid VIỆC card (jcycle:165 dName(cyDaysM)), Kính sự phòng book cyRep (this month + last month, own roll each) → all go through cyDaysM.
- cycOn / cyTray / nightCh / stealNight / ACT steal+road / LACK / nightScene / late visit (jvisit meOk) / ksp tablet / cycleLate / cyPhase (conception) / jcoopworld cyWait (B2 relay) → tuần-based (cyBase.t), never read the length; t unchanged → same results as live.
- No typed 5/6/7 left: only BAL.cyc.len:[5,6,7] (the [5,6,7] fallback in cyLen only runs if BAL is missing). The test sets len=[4] and the days follow.
- jflip cycleOf: the old fallback compared cycleDaysOf (days 1..30) with S.tuan (0..2), so a woman whose cycle held day 1 or 2 got a grey card in trung/hạ tuần (inCycle does not exist anywhere, so this fallback always ran). Now it reads cyTray, which nightCh already uses for the bar (`!(r.w>0)`). So this is a real fix: it only removes wrong grey cards and keeps the báo sớm / giấu lie rule. No new behaviour the owner did not ask for.

## (2) Deterministic + co-op safe
cyLen = hash("cyl|"+name+"|"+S.turn) — a pure function of name + month counter (S.turn++ once per month in endTurn). The friend entry {name} rolls the same as her (test checks). B2 relay (cyWait → cycOn) is tuần-based and untouched. coop-e2e on the merged build: **62/62 ok, 0 FAIL** (cannot be worse than live; the worker measured live at 59/1).

## (3) Distribution (re-run myself, merged build)
cycle-roll.js: PASS, 396 draws, split 5:.331 / 6:.331 / 7:.338, month→next-month length changes in 86.5 % of pairs, every woman ≥ 2 lengths, never crosses a tuần or month, BAL drives it.

## (4) Old saves
Nothing about the cycle is saved (CYK flags only: lie/back/rk/rv/df/hide/rum…, no days or length). quickcheck "old save ok".

## (5) Conception / NPC nights vs the shown days
Fertility (cyPhase) and night blocking are tuần-based, and the shown days always lie inside her cycle tuần (first day clamped to CY_TD+1−len), so they agree as before. Blocking BY DAY = OD:L1396 → night-ledger job, out of scope.

## (6) VANPHONG
Maid card: "Tiểu chủ giữ ấm bụng mấy hôm nay (mồng 1–5)…", "…(ngày 21–25)…", book "đã báo, ngày a–b". No %, no numbers beyond dates. OK.

## (7) Gates (on 968e6209)
- quickcheck.sh: QUICKCHECK PASS · old save ok · core gates PASS (one-core-guard 0 fails) · render 274/256 ms, tab 393/394, buổi 1184/1073 (median of 3, new/live; perfgate passes; live runs alone ranged 717–1154 ms buổi, so this is noise — the change adds 1 hash per cyDaysM call; the worker measured +2.8 %).
- cycle.js: "logic ok"; UI part "pop-up not shown" also fails on LIVE main (same: the start chest "Rương đồ khuê các" + the start night flip cover the pop-up). Not worse. Note for a test-owner: cycle.js UI needs to click "Nhận" / "Ta biết rồi" first (my shot script does this).
- Shots LOOKED at (scratch, not in git): Fold 755x1000@2 VIỆC "Kỳ nguyệt sự" "(mồng 1–5)": kit dialog, option card "Báo đúng ngày", maid figure feet whole, nothing overlaps, no h-overflow. iPad 1180x820@2 Lịch tháng: Nguyệt tín dots on the cycle days inside thượng tuần, nothing cut; iPad VIỆC text read from the DOM ("Bẩm nương nương, tháng này nguyệt sự đến (ngày 14–19)…", len 6). Page errors 0 on both.

## Verdict
No blocking faults. 968e6209 has live main 05ebe3da as an ancestor → fast-forward main to it.

PASS 968e6209d9d5dd86b5b1cc45ed1c1a509dd166ab

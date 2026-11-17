# PROGRESS review/entry-exam-r1 (reviewer, Foreman D, opus) — 16/11

Reviewed: origin/review/entry-exam @ab50be5c (entry selection exam, jentry.js). Only the entry-exam diff was judged
(diff against merge-tree(ef6e7a05 kc-roads-cn-nc-r1, 96736fff mg-balance) = f5031650): jentry.js, jbal2 BAL.entry, jkc2 hooks,
assemble, tests, measure, reports. kc-roads round-3 FAIL items and mg-balance are NOT re-judged here.
START_CTX ≈ 3 % of the window (get_session read 0; own estimate).

## Branch
- review/entry-exam-r1 = ab50be5c + origin/main 92668096 merged (38becae9) + reviewer fixes (0d905472) + this file.
- Merge conflicts (all from mg-balance vs main, none in the entry-exam code): assemble.py (main's list + jmgt, jkc2, jentry),
  j83.js / jtabs.js (main's wording "tự học", "từ 0 đến 10", wkTierTxt + mg-balance's BAL.mgTier.wk.lvQ / lessonPts / "chút bậc
  tài nghệ"), index.html / sw.js regenerated. Site rebuilt.

## Reviewer fixes (small, made here)
1. jentry entWord copied the odds-ladder thresholds of j1 word() → now calls word() (ONE CORE, OD:L1267).
2. jentry kcPhucPlay: "Để tài nghệ quyết định" on the tiểu thư Phúc tuyển was a flat 5 → entSkipRaw() (the one "not playing" value
   the worker set for every other road).
3. BAL.mgTier.occ.tuyen [1.5,0] → [1,0]: at art level 0 (most new lives) the entry exam's "Độ khó" read "Khó" (OD 07:25Z: "mức vừa",
   not hard). Now "Vừa" for all 9 origins (direct.js run). Ease 1.2 sits between the measured 0.8 / 1.6 boards; skilled marks are
   9.0–10 at both, so the rank table does not move. Foreman B: keep this value when mg-balance is revised.
4. dev/test/kc-roads/coop-together.js: its clear() helper did not know the kg82 exam frame (chose the first art option, left the
   frame open → "B went through the selection card" failed). It now presses "Để tài nghệ quyết định" and the result's ✕
   (KIT kitOvSync turns #kg82ok into the header ✕ for every mini-game result; not a bug).

## Tests (this branch, local server, 0 page errors everywhere)
- dev/test/entry-exam/direct.js: 755x1000 9/9 PASS (twice: before/after fix 3; after: Độ khó "Vừa" ×9); 1180x820 5/5 PASS
  (tt, muoi, nc, cnv, ch); 1366x1024 3/3 PASS (dtq, td, cn). @2 shots at 755x1000 (dtq, nc, cnv) with longer waits.
- dev/test/kc-roads/direct.js 755x1000: 9/9 PASS.
- dev/test/kc-roads/route.js --origin=nc 755x1000@2: PASS (home road → Lễ ra mắt through the hook → Quý nhân, ceiling Tần, reload ok).
- Old save (own probe: origin/main build makes a palace save (nc) and a tiểu thư home-road save (muoi), loaded in this build):
  no Tiền truyện, no exam, no entry scene, S.entV unset, 3 buổi played, 0 errors.
- coop: see report (coop-together + coop-e2e).

## Rank distribution (re-run by the reviewer: dev/measure/mg-bots.js occ tuyen at art level 0 AND 1, 8 plays per kind×bot, then
dev/measure/entry-bots.js N=16 per origin) — within ±5 points of the worker's table. Skilled → ceiling 73–99 %; not playing → one step
under in most lives (bottom ≤ 28 %); random → bottom. Full table in dev/handover/reports/review-entry-exam-r1.md.
- dev/test/kc-roads/coop-together.js (live Worker): 26/26 PASS (both players get the road choice at the room start; B's exam at once,
  A's at the home-road end = tiểu thư month; no waiting, OD:L1288). dev/test/coop-e2e.js: 59/59 PASS.

RESULT: PASS (ship after kc-roads-cn-nc fix + mg-balance). Report: dev/handover/reports/review-entry-exam-r1.md (handover branch).

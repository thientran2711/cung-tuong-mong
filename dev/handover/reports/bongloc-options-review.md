# bongloc-options — BIG review (E47r) — round 1: FAIL
depth 2 (get_session lineage.depth 2 / limit 8). Reviewer E47r session_01DgYSWov9PiUe5YSGw6Kh4P, opened by FOREMAN E #29. Fixer E47 session_01DgYSWo9a1SYVhzmGV7E3Se.
PRIORITY #1 CHECK ('Bổng lộc|bongloc|blopt|M83'): OD 5 | main j20.js:12, j19.js:90 | review/* review/bongloc-options 6803e362 (E47) | claims E47.
Reviewed: 6803e362 merged with newest origin/main f44060d4 on review/bongloc-options-r a409727c (local; conflicts only index.html/sw.js → rebuilt). E47's follow-up head not on origin yet at verdict time.

## Gates run (a409727c)
- quickcheck ALONE: **PASS** (core gates PASS incl. G1 one-core; old save loads + plays a buổi; open 1496 ms 0 errors; perf new/live render 227/194, tab 426/366, buổi 1044/1058, tasks>200ms 18/18).
- law4-typed: 0 typed. bongloc-options.test.js: 5 runs → 4× PASS 13/13, 1× **FAIL 2/13** (flaky, see 3).
- stipend.js: «ev» step shown:false (stale, E47 already fixing).
- coop-e2e / both-seat / role-parity ×2: NOT run on this head (FAIL found first; run on the fix head).
- Shots: E47's 4 (Fold + iPad, cut + cấm túc) looked at: kit frame, «!» beside Bổng / Bị cắt xén, no Ghi chú row, reason line under cấm túc, odds in words. OK. (Fold option pictures still loading — CDN lazy.)

## FAIL items (fixer E47)
1. **Law 6 (real world) — she walks to Nội vụ phủ while under cấm túc.** `dev/build/jstip.js` stipEvent, the new `else{…O.push({n:"Đòi lại phần bị cắt xén"…` (no-maid road): offered and unlocked when `S.confined>0`. cấm túc is itself a skim cause (jstip.js:76), so cấm túc + cut + no usable cung nữ is a common case. The game forbids leaving the cung under cấm túc (j27.js:61 mapHTML disR «đang cấm túc»). Probe: rank 3, month 5, confined 2, maid spyFor → opts = Nhịn · Lót tay · **Đòi lại phần bị cắt xén** (no lock) · Tố lên Hoàng hậu · Ghi nhớ. Fix: when confined, lock it with the reason in kit words (e.g. «Đang cấm túc, không ra khỏi cung được») or leave it out; add the case to bongloc-options.test.js.
2. **Law 4 + law 11 — typed numbers in the sibling answers on the same frame.** The brief: every number of the cut answers from BAL. `jstip.js:66` stipAskOdds `/3`, `/4`, `-25` (the 25 duplicates the new BAL.blopt.sup); «Tố lên …» odds `T.risky?5`, `/2`, `/5`, `*15`; «Ghi nhớ» `eyes(S)*10`. Move them into BAL.blopt (or BAL.stip) and read them there; one source for the sup penalty.
3. **Flaky test.** bongloc-options.test.js «no cung nữ» check calls stipend() once; the skim is random, so with no cut the frame shows only Chu toàn / Bớt (seen: FAIL 2/13 in 1 of 5 runs). Loop until a cut (as the shot block does) or force the cut; same for any other single-roll check.
4. stipend.js stale «ev» step (already on E47's list).
Note (not blocking): the self road costs no khắc while the maid road is a parallel-time trip — consider a khắc cost when she goes herself (law 3 «time is its cost»).

## Laws checked
1 two-way OK (lót tay / đòi / tố / ghi nhớ answer the cut) · 2/3 OK (each answer has gain + cost; Đáp ứng now 2 bạc vs Danh −1) · 4 FAIL (item 2) · 6b OK (eunuch = S.court.ped via stipEunName) · 6c OK (cut goods restored by stipRestore; missing items shown «thiếu …») · 6 real-world FAIL (item 1) · 7 OK (no %) · 9 kit OK (kitRows, kitNoteBang, option cards; no private part) · 11 group scan table verified against the code (jecon month card + jstip cut card were the only periodic choice cards that lost options).

VERDICT: **FAIL** (items 1–3). Re-gate on E47's fix head: quickcheck alone, bongloc ×3, stipend.js, law4, coop-e2e full + both-seat, role-parity ×2, shots both devices.

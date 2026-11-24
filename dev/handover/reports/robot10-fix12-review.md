# E76r — SMALL review robot10-e-fix-1 8f97171e + robot10-e-fix-2 19183dca (sonnet; Foreman E child2)
PRIORITY #1 CHECK ('robot10 fix'): reports/robot10-E-fixer.md §1–3, briefs/E76r-review-robot-fix12.md | origin/main fd85907a (unchanged since both branches' base, so each branch merges as a fast-forward: merge sha = branch sha) | claims: ROBOT FIXER row only | no other review/* touches jstip/jecon/jagacts3-4 or dev/measure/robot10*.
Combined scratch merge (both on main): 7d082014 (review/robot10-e-fix-1-r, local only; index.html rebuilt identical).

## (A) review/robot10-e-fix-1 8f97171e — **PASS 8f97171e** (merge onto fd85907a = fast-forward)
- Scan coverage (law 11), grepped myself: every `queenP()` reader in dev/build/j*.js (≈90 sites) is either `q=queenP()` + `if(!q)`/`q&&`/`q?` guard, or fixed here. Remaining plain `queenP()` arguments: j8:459 `twDo(v,queenP(),…)` is under `qOn()`; jagacts3/jagacts4 `queenP()` as the target arg is behind `queenP()&&` / only after the closure fix. r10e-null-seat-scan: LIVE 3 unguarded direct reads + 0/86 variables → branch 0 + 0/88.
- Scan limitation (not a fail): helper list is fixed (rkOf rkName palaceOf agAt NM pv kitName houseOf ledgerId byKey); `aff(q,…)`/`odds` with a null q are not checked, but every such site I read is behind an `ok:` guard or `q&&`.
- Guard hides no state bug: empty seat = legal state (queen dead/out/not queen, qOn()=false); closures return "kn" when it empties between plan and landing. Khất bổng row now names cutBy (real orderer) → superior → Hoàng hậu → «Nội vụ phủ». Wording: only the name inside the existing row changes (an order by a consort now names her via the same p.cutBy the «why» line already printed). OK.
- r10e-econ-noqueen (nc-B save 005): LIVE fd85907a = 5 FAIL (TypeError null.queen at rkOf←rkName←stipEvent←econStipend); branch = ALL OK (seat empty cutBy «» → «Nội vụ phủ», cutBy «Hoàng hậu», seat filled unchanged).
- quickcheck PASS (bash dev/tools/quickcheck.sh, 533 s): core gates PASS, time-spill PASS, open 1673 ms, old save ok, perf new/live render 153/211, tab 383/462, buổi 1150/1138. role-parity ALL PASS ×1 (merged tree). index.html/sw.js rebuilt = committed.

## (B) review/robot10-e-fix-2 19183dca — **FAIL 19183dca 1**
No game file changed (diff = dev/measure inpage6/robot10/robot10-in + dev/test r10e-* only) ✔.
Checks that pass:
- r10e-audit: 2727 beats / 8954 options + Bạc lạ → 0 rows (LIVE harness: 13 false rows) ✔
- r10e-uiscan-book Fold 344x882 / 755x1000 / iPad 820x1180: kbk rows 0 (LIVE harness Fold: 39) and a real chip laid over a title still reported on all three ✔ (visible-overlap mutation caught)
- r10e-kcf: ok; MUTANT (confirm-yes line removed from inpage6) → «FAIL the bot leaves Bỏ cuộc? open» ✔ (stuck-confirm mutation caught)
- gain mutations on auditOpt: thành-block wrong (Bạc +9 vs w 20) → flagged; right → 0; «n» text Bạc +11 vs fx 20 → flagged; «Bạc +13 · mỗi tháng Bạc +8» vs w 20 → flagged (monthly skip does not mask a wrong gain), «+20 · mỗi tháng +8» → 0 ✔
- short real run (pf pt_hai skilled, CAP 240 s, UIEVERY 40, Fold): runs, no harness crash; rows: soft-lock after load, wall cap, save drift (= HOLD families), lag, and 4 number rows ↓.
**FAIL 1 — NEW false positive: Sủng under a trait.** The audit now reads the line the kit draws («ngay: Sủng −5»), which goes through sg() (j1:125, ×1.3 with trait nongnay, ×0.7 on gains with lanhlung; used by fmt AND apply), but compares it with RAW fx (sung −4). Proof in the short run (repro save pf 0857-004: has("nongnay")=true; apply({sung:-4}) moves Sủng by −5 = what the line shows): rows «Sủng -5 vs sung=-4», «-3 vs -2», «-4 vs -3», «+7 vs 5» (4 rows, 1 life). r10e-audit does not see it because its save has no trait. Fix: in auditOpt compare `sung` with `sg(raw)` (when S.emp, exactly sgNow) — e.g. map v from pools through sgNow for k==="sung" — and add a test with a nongnay/lanhlung save (apply the option, compare the real delta too). Everything else may stay.

## Verdicts
- review/robot10-e-fix-1 8f97171e: **PASS 8f97171e** (ancestor of nothing newer; main fd85907a is its parent chain → fast-forwardable).
- review/robot10-e-fix-2 19183dca: **FAIL 19183dca 1** (Sủng trait scaling false positive).

# E-TIER-B13-RV — BIG review of review/e-tier-b13 @ 6738c302 (batch 1 only)

Reviewer E-TIER-B13-RV (session_01DgYSWptGZG8FdKXhToAAqr, depth 2, START_CTX ≈ 5 %), opened by FOREMAN E C10; verdict to FOREMAN E C11 session_01DgYSWnTLKESBZ9JC7oK5Xh (verified: C11 is C10's child, rollover line in FOREMAN_E_STATUS.md 28/11 10:00Z).

PRIORITY #1 CHECK ('road.c.tier|road.c.st|rdseeds_tier|jrdcsd|equal-value'): OD 27/11 ~00:46Z law 2 canon overwrite (read verbatim ~00:36Z–~01:14Z) | main LIVE aecbc267: no BAL.road.c.tier, jroadc «Σgain == Σloss == BAL.road.c.st» | review/* e-tier-b13 6738c302 (this) | claims E-TIER-B13 (worker), no other reviewer.
KIT CHECK: reuses the j67 story card (kit event frame), kit option cards, oddsChip odds words — no UI part added or changed (data / rules only). dev/kit/KIT_CHECKLIST.md: no line touched. kit-std-scan (Fold + iPad, merge a378a05e): total 6 (baseline 28) {X06 4, X08 2} = the worker's number, no UI change.

## VERDICT: PASS — LAND READY BIG review/e-tier-b13-rv-m <SHA>
(<SHA> = the last commit on review/e-tier-b13-rv-m: LIVE aecbc267 + 6738c302, built files rebuilt, + 2 reviewer test-only fixes below.)

## (0) Merge
- 6738c302 onto LIVE c03d6ee7 → a378a05e, then onto LIVE aecbc267 → 890614d6 (+ the test fixes). Both times ONLY index.html + sw.js conflicted (built files) → rebuilt by dev/site/build_site.sh; assets.json = LIVE (no diff). No source conflict: LIVE changed j67 / jroad / jroad8 / jbal* lines this branch does not touch.
- Reviewer commits on the branch (test-only, no game code):
  1. dev/test/tier-b13-oldsave-all.js — NEW gate (see (1) mutants): pledge AND refusal saved on EVERY old way 0..3 of 5 hồi on the LIVE build, loaded in the new build, checked BY NAME.
  2. dev/test/rdc-play.js rival check — a rival who died / left between two recorded hồi is a legal recast (rdCast, ROAD_MAP §5), not a fault (see (1) rdc-play).

## (1) Claims re-run (6738c302 and the merge)
| check | 6738c302 | merge (a378a05e / 890614d6) |
|---|---|---|
| tier audit (regdump + classify, my run) | LIVE 22afefb4 4889 sets OK 617 · FLAT 1885 · MERGE 151 · CAP 2236 → OK 2757 · FLAT 1883 · MERGE 151 · CAP 98 = worker's numbers; jrdcsd 2156 sets CAP 2138 → 0, MERGE 0, FLAT 14 → 12 | LIVE c03d6ee7 / aecbc267 → same numbers |
| robot «only jrdcsd sets changed» (tier-b13-same.py) | 2156 changed, all jrdcsd.js, 0 missing / extra | same vs c03d6ee7 AND vs aecbc267 |
| rdseeds validator | 627 rows 0 errors (2 warnings) · fixture 52 rows 0 errors | 0 errors |
| rdc-play RDC_STOP12 (tt_ruong, muoi_tien, td_tichbien, nc_kinh) | ALL PASS ×4 (muoi_tien 3 runs PASS) | tt / td / nc PASS; muoi_tien rival check failed 3 of 5 runs (LIVE aecbc267 4/4 PASS, 6738c302 3/3 PASS) → root cause below → PASS after the test fix |
| tier-b13-oldsave (worker gate, LIVE save with a 4-way card pending) | ALL PASS (vs 22afefb4) | ALL PASS (vs aecbc267) |
| tier-b13-oldsave-all (reviewer gate, 20 cases × pledge / refusal) | ALL PASS | ALL PASS (vs aecbc267) |
| quickcheck (old save from LIVE) | worker: PASS | PASS · 565 s · old save ok · perf median new/live render 306/256, tab 681/630, buổi 2032/1428 ms (within perfgate) |
| time-spill guard | — | PASS static + runtime |
| core gates (coregates.sh) | all PASS except q-softlock + coop-one-world (coop: my worktree had no dev/index.html built → harness, not code) | all PASS except q-softlock (one-core-guard, rules-one-source, kit-conform, button crawl, dead-card, look-dedupe, press-keep, kit-std-scan, coop-one-world, manifest …) |
| q-softlock A/B (standalone, ≥2 runs each) | 6738c302 2/2 PASS · LIVE 22afefb4 1/2 | merge 1/2 · LIVE c03d6ee7 1/2 — LIVE fails the same way (fold / iPad «inside a person view the card waits») → LIVE-own flake, not branch-born |
| kit-std-scan | = worker | total 6 (baseline 28) |

MUTANTS (old-save mapping, built page edited, then restored):
- M1 rdcOm map → `return i` (no mapping): worker gate FAILS (2 FAIL). ✔
- M2 rdcOm map → `return 0` (always the first way): worker gate still **ALL PASS** — its only cases save on old way 3 and both map 3 → 0. ✘ gate gap. The reviewer gate tier-b13-oldsave-all.js FAILS on M2 (12 FAIL) and passes on the real build → added to the branch (fix 1). With it the old-save mapping is proven for every old index, kept ways (re-ordered: e.g. s2 om 1201) and the removed way, by name.
- Real build, by name: tt_ruong s1/s2/x1/c1/t1 × old ways 0..3: pledge → the way at om[i]; a kept way keeps its own name; refusal same. 20/20.

rdc-play muoi_tien on the merge (root cause, instrumented run): the road's rival (RV 8) DIES between chapters 8 and 9 (alive:false when rdCast runs for muoi_tien_9), rdCast recasts (RV 16) as ROAD_MAP §5 says («a person who died or left is recast»). The check compared against the rival's state at the last RECORDED hồi (chapter 7, still alive), so a death between records looked like a silent swap. LIVE's newer world (more deaths / leaves) makes it frequent; 6738c302 alone and LIVE pass by chance of path. Not a game fault → test fixed (fix 2): a rival who is dead / out at the end of the life is a legal recast.

## (2) Law scan (real sample: 44 hồi = 4 per origin × 11 origins, seed 7, plus 44 more seed 11, plus whole-family scripts over all 891 hồi; text read old 4 ways vs new 3 tiers)
- Law 2 TIERED CHOICES: every hồi = 3 ways, Σgain == Σloss == 1 / 2 / 3 steps (891/891); Tốn and Được rise together in steps; no two ways with the same gain AND cost keys (0/891); 28 hồi share a gain kind between two ways but at a different size (1 vs 3 steps) = a real ladder, which law 2 asks for. Climax: NHẸ «lo» (win or middle), NẶNG «hi» (win or lose) on every climax. The 12 FLAT composed sets (6 distinct beats: «Tiếng rên ở Thái y viện» ×4, «xin xem phòng» ×4, «Địa đồ giả», «Ngày thử giấy cống», «Ngày thử muối», «Ngày chọn người») rise 1 / 2 / 3 in steps; they only look flat on the audit's point scale (one Tai mắt / Tâm cơ step = 1 point vs one Sủng step = 3; NẶNG often carries Lợi thế sc the scan does not weigh) → law-2 fine in this batch's unit; batch 2 (FLAT BAL retune) owns the point scale.
- «a bạc road always has another road of matching tier»: the help-ask way «Nhờ người quen lo liệu, không dùng bạc» (jstory altOf67) = the SAME result (w, f, e, go) as the bạc way, paid in Sức + lower odds → it IS the matching non-bạc road of that tier, not a 4th tier in disguise (a separate act on one matter, counted OK by the audit). Limit (pre-existing, LIVE same): only the FIRST bạc way gets it; hồi with ≥2 bạc ways dropped 302 → 125 by this batch. → note for MAIN (item N2).
- Law 3: every kept way has a gain (891/891); the dropped way was the stance way first.
- Law 4: steps come from the writer rows (unit), numbers = steps × BAL.road.c.fx; the tier rule is BAL.road.c.tier [1,2,3] in place of BAL.road.c.st (canon overwrite, law 14); the validator mirrors it and rdc-play checks validator == BAL; converter writes steps only (no BAL values typed); one-core-guard PASS (om stored as a digit string).
- Law 7: no option / text wording changed by the convert (0 renamed ways); validator no digit / % / odds words; card odds = kit odds words.
- Law 1: NPC roads / scans read the same composed rows (RDC.def default composition) → same 3 tiers.
- Law 6b: recasts of a dead rival are told («… nay đã khuất, kẻ nối tay là …») — unchanged.
- Text vs numbers after the mechanical NHẸ shrink: 31 kept ways lost a gain / cost key their own name points at (e.g. «Dâng cả rương lên Hoàng thượng» keeps Đức, drops Sủng; «Xin Hoàng hậu cho ngày suy nghĩ» costs Danh, not Hoàng hậu). None reads wrong (the named person is still the act); listed as N3 for batch 2.
- Law 11: see FOR FOREMAN item N1 (other composed families still on the old rule).

## (3) Law 12 shots (merge, Fold 755×1000@2 + iPad 1180×820@2, outside git, looked 3×)
- Fold: tt_ruong_6 s (Tâm cơ 1 → Bạc 25 → Danh 4 + Sức 3, + help-ask «Khó lường»), cnv_kho_8 c (Tâm cơ 1 → Sức 3 + Đức 2 → Tâm cơ 2 + Danh 2), pf_co_11 x (climax, odds Hiểm / Khó lường / Tùy duyên, Danh 2 → Đức 2 + Tâm cơ 1 → Danh 6).
- iPad: tt_ruong_6 s, cnv_kho_8 c, dtq_ngua_6 s (Bạc 25 → Bạc 25 + Tâm cơ 1 → Danh 4 + Sủng 3, + help-ask «Có cơ»).
- 3 ways (+ the help-ask way on bạc hồi) in one row, no overflow, no cut text, no scroll change; 0 page errors. Harness note: dev/test/rdc-shots.js on iPad often shoots the home screen (the card waits behind the «!» pile) — a copy that re-shows the j67 card before the shot was used (as the worker did); climax iPad shots did not show the card in this harness.

## FOR FOREMAN (not blocking this batch)
- N1 LAW 11 — the SAME old equal-value rule lives in other composed families the tier audit did not scan (it read ARC67 / E68I / EVI / NRASK only): j7c.js (P2 intrigue, «4 stances of equal gain/loss steps»), j68c.js (P4 decisions, ~460 comps, «4 equal-value stances»), j71c.js («4 equal-value stances»), j72c.js (P3 việc nhờ, 256 seeds, «same total as its siblings»), jworldc.js (P6 world reactions, «4 equal-value stances»), + validators j7seeds / j68seeds / j72seeds / wseeds / fseeds_validate.py. They need their own batch (same converter idea: rdseeds_tier.py) — and law 14: today the old law-2 text sits beside the new one in code comments.
- N2 law 2 «bạc road»: only the first bạc way of a hồi gets the non-bạc help-ask road (jstory opts67 silver[0]); 125 composed hồi have 2–3 bạc ways. MAIN ruling or a small jstory change (one help-ask per bạc tier).
- N3 batch 2 (FLAT retune) inputs: the 12 FLAT composed sets above + 31 kept ways whose name points at a key the NHẸ shrink dropped.
- N4 98 CAP sets remain in the hand-written jrd_* / j67 / jend14 roads (jrd_cnv 40, jrd_pt2 14, jrd_ch 9 …); tier-audit §5 gives them no batch.
- N5 harness: q-softlock flakes on LIVE too (fold / iPad person-view case, 1/2 PASS on LIVE c03d6ee7 and 22afefb4); rdc-shots.js iPad card-behind-pile timing.
- Pre-existing writer oddity (LIVE same): rc-cn-o12 «Tặng bạc cho đầu bếp, nhờ nóng lại» GAINS bạc.

Shots: /home/user/wt/rvb13-work/shots, shots2, shots3 (scratch, not in git, deleted with the worktrees).

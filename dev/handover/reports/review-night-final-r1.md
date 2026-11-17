PRIORITY #1 CHECK ('night-final|nfHint|__ksz3'): OD 6 | ledger 0 | claims 8 | main 15 | review/* 1 → reviewed the existing branch review/night-final @ 5535697b, no rebuild.

# review-night-final-r1 — verdict: **FAIL 1 @72148b66** (review/night-final-r1; one item: co-op weeks hang at the end of tối)

Reviewer session_01964izDUxnFjybggNj6Ukev (opus), coordinator Foreman D #8. START_CTX ≈ 3 % of 1M (get_session reads 0; own estimate). Ended ≈ 20 %.
Rules read: START_CORE, START_WORKER, START_REVIEWER; reports/night-final.md §11–§12; FOREMAN_D_STATUS 04:50Z order; review-balance-core-r2.md.

## Branch
review/night-final-r1 = 5535697b + merge origin/main 6c4f21c3 (7a63d523: one conflict jflip.js life-reset hook → main's `lifeStore("flip scene",…)` + night-final's `CFN=0`; generated files rebuilt)
+ 16702ac7 (reviewer fix: Giữ chân GỢI Ý printed a typed "một bậc" → `kitNumVi(BAL.steal.keep.rung)`, one core)
+ 72148b66 (KIT_REQUESTS only: 390x844 v3 frame column, see 1b). origin/main 6c4f21c3 is an ancestor (FF). Still carries balance-core 9abcfa72 → lands only after balance-core.

## Checks
| # | check | result |
|---|---|---|
| 1a | §32.8a stale `__ksz3` (jksize `kszLive3Ok`) | Code read: frame valid only while its body + options are in #mb; stale one dropped and laid out again; late re-pick is a no-op. Refill probe (dialog on screen → Q[0] replaced + showModal on the same .dlg → the OLD pictures fire `load` → re-pick): branch 4/4 shows only the new options, live frame re-laid; live main 2/4 lost the dialog. Real flip choice on branch: 2 option cards (was 4) on Fold / iPad / 390. PASS |
| 1b | §43.0a compact title row — consistency scan (scratch kscan.js: every `button.ka.kart` in every tab + the real flip choice + a synthetic Kính sự phòng choice) at Fold 755x1000@2, iPad 1180x820@2, 390x844@3 | ~39 cards per size (Hậu cung, Giao tình, triều, staff, Tài nghệ panel, q72, dialog options): ALL `.kat` flex-wrap:wrap (one rule, no per-place variant), 0 chip-over-name overlaps, 0 cut names on Fold + iPad. Before/after Fold, same dialog: main "Chặn ngự giá" name 20 px ("Chặ" under the chip) → branch 116 px, whole (shots looked at). **390x844**: the v3 frame info column is only 146 px; cards cannot fit (name wraps per word, odds chip / values run past the card edge) — SAME ON MAIN (worse: name 0 px), not this branch's part → KIT REQUEST filed (KIT_REQUESTS.md 17/11, kit keeper). PASS on Fold + iPad |
| 1c | other kit-family tests | timed-choice-fit 9/9 OK; fig-feet-fam 93 cases, 0 px cut (755x1000, 1180x820, 390x844) |
| 2 | G4 probe = test artefact, seeds 7 + 3 | branch build: main's probe FAIL ×2 ("guest week changes the world"), branch probe (nfDone) PASS ×2; main build: both probes PASS ×2 (nfDone is a no-op, no nfOn on main). Artefact proven. PASS (note: the probe now skips jnf's co-op relay — see F1) |
| 3 | buổi perf on a FIXED save (scratch fixsave.js: one seeded save made on the live build, deser'd into both builds; iPad 1180x820, CPU ×4; 7 runs each, alternating, medians) | Identical work (buổi 1+2): wall 1820 / 1850 ms (−1.6 %), sync busy 720 / 796 ms (−9.5 %), render 247 / 258 ms. PASS. The tối buổi is NOT the same work: the branch plays the owner-ordered flip + choice every night (+4 render() calls: jnf hold / showChoice / finish / the choice, +1 endTurn pass); full day 16.1 s vs 12.5 s wall incl. the scene's animation time. A number for main, not a slowdown of existing work |
| 3b | quickcheck.sh --runs 7 @7a63d523 | PASS · open 1351 ms · old save ok · render 191/221, tab 297/298, buổi 895/771 (fresh life; gate PASS) · core gates PASS (one-core-guard 0) · time-spill PASS |
| 4 | old save | live-build save loads in the branch, plays a buổi, 0 errors. PASS |
| 5 | flip choice: ladder chip, two hints, VANPHONG | Chips read Khó / Năm ăn năm thua / Khá chắc (vary with state). Tranh sủng "dựa vào ân sủng; tài nghệ góp ít · thành: sủng chút ít · hỏng: mất chút sủng, chút đức" vs Chặn ngự giá "dựa vào nhan sắc, ân sủng; tài nghệ nặng ký (môn ngài chuộng thì lợi, môn ngài chán thì hại) · thành: sủng nhiều, nổi danh · hỏng: mất sủng nhiều, mất danh, Hoàng hậu phật ý" — clearly different, cổ trang, no %. Minor (left): Giữ chân carries the kit risk chip "có rủi ro" while its line says "hỏng: chẳng mất gì" (kit kitRisk means "can fail"). PASS |
| 6 | night-final.js 11/11 · night-multi.js 8/8 · night-steal-unit.js 29 PASS 0 FAIL · flip-entry ALL OK · page errors 0 | PASS |
| 7 | coop-e2e (live Worker) | **branch 56/64 (2 runs, same 8 FAIL) vs live main 60/60** → F1 |

## FAIL list
**F1 — co-op: every week hangs at the end of tối (coop-e2e 56/64 vs live 60/60, reproduced 2/2).** Both seats sit on "Chờ hảo hữu…" (next disabled, Q empty, COOPW.tr "night n f=true" repeating) for > 30 s at buổi 3 of every week: "buổi n:3 advanced for both" ×4, "week n: fold advanced" ×3, "week after rebirth advances". jnf holds the week end until tonight's flip choice is settled, and in co-op the relay that settles it is PARKED (owner 17/11 02:05Z) — so with this branch live, co-op play stops at the first evening. The brief's gate "coop-e2e not worse vs live" is not met. Not fixed here (no co-op patching, owner 02:05Z). Options for MAIN (decision not taken by the reviewer): (a) jnf off while co-op is on (`nfOn()` false when `COOPW.on`) so co-op keeps the live night until coop-thin E — smallest, touches no co-op code; then re-run coop-e2e (must match live) + night-final / night-multi; or (b) hold the branch until coop-thin E.

## For main / kit keeper
- KIT REQUEST (new): 390x844 v3 frame info column too narrow for option cards (pre-existing on main).
- KIT REQUEST (open, from #6): flip tassel over the rank line (jflip §48).
- Perf number if the owner asks: the night step adds ~4 render() per night (scene + choice) — inherent to her flip-choice rule.
- CDN img/_review/night-final/ (worker #6 shots): not wiped (the branch goes back to a worker); wipe with the final verdict.
Scratch only (not in git): /home/user/wt/nfr1-s (kscan.js, kscan2.js, fixsave.js, fixday.js, fixprof*.js, logs).

FAIL 1 @72148b66 + F1 above

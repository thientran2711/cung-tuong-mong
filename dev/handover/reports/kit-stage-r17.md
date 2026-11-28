# KIT-STAGE-R17 report (worker, child of MAIN CHÍNH 184; succeeds R16) — branch review/kit-stage-r17
PRIORITY #1 CHECK ('kit-stage-r16'): OD #47 + law 10/11/14 | main LIVE 18003079 | review/* kit-stage-r16 48492a68 (RV-178 FAIL on bundle), kk63-rv178 ebf9e552, kit-kri-xl-rv178 786f65ad (both LAND READY) | claims KIT-STAGE-R16 → R17 (RV-178 §3).
KIT CHECK: no new part; reuses jopic `kitOptCopy` (K-HAND-MAT §6.2o), jksize room CSS + K-XL-GROW-SAME, §28.8f own-box clamp, §57 EMO-SEAL. dev/kit/KIT_CHECKLIST.md.
START_CTX ~4 % of the window (own estimate).

## Chain
r17 = r16 48492a68 + merge kk63-rv178 ebf9e552 + merge kit-kri-xl-rv178 786f65ad + merge LIVE 18003079 (+ 3 fix commits). Gate: is-ancestor of 48492a68, ebf9e552, 786f65ad and origin/main 18003079 all OK; `git diff --diff-filter=D origin/main HEAD` = 0 files; assets.json = LIVE 18003079; build_site = committed except CTM_BI.
Conflicts: jkhand.js (kk63), jksize.js (kri-xl), jactj4.js + KIT_REQUESTS.md (LIVE E-GAIN3), index.html / sw.js (rebuilt).

## 1. jkhand.js — the enlarged card builds from the ONE copy `kitOptCopy` (K-HAND-MAT §6.2o)
- Conflict side taken = r16 (§101.10 enlarged card; kk63's side was only the OLD plate's `kitOptCopy` call); `kitHandBigBuild` no longer does its own `b.cloneNode(true)`: `const c=kitOptCopy(b,1)`.
- `kitOptCopy(b,face)` (jopic): new optional `face` = the hand's enlarged card keeps the card FACE's own Tốn / Được rows (`.kfill` / `.kdup`) instead of dropping them (default = the plate / «!» form: source rows only, unchanged for kk63). Reason, found by kit-hand (c2a «info on the FRONT … Tốn», KIT-HAND FAIL 2 on the first merge): the face's Tốn «không» + Được rows are exactly those kit copies; without face the enlarged card showed only the «Gợi ý» row, the Tốn line (owner 26/11 23:58Z «info on the FRONT») was gone. Every source row (Được, Mất, Kèm, Bại) is kept either way; Bại of a no-roll card reads «Mất» (kk63 rule).
- BigBuild keeps its own extras on top of the copy: hint row dropped when a Được / Mất row exists, doubled hint clause read once, `kNwMkDom`, odds meter rows removed (§93.8), empty `.kr-thanh` row dropped.
- Tests: kit-hand-mat-scan fold: dialogs 60, hand 58, lost «!» 0, lost plate 0, cards with a loss 0, pageerrors 0 · ipadAir: dialogs 60, hand 52, 0 / 0 / 0, pageerrors 0 · kit-hand PASS (was FAIL 2 before `face`) · press-keep PASS · badge-hand (below) · kit-std-scan hook 96 passes in coregates.
- test-only: dev/test/badge-hand.js «every enlarged card shows every row» expected the source label «Bại»; after K-HAND-MAT the copy labels a no-roll card's Bại «Mất» (a certain loss) → test accepts Mất for Bại → PASS 0 bad of 17 Fold + iPad.

## 2. jksize.js + KIT.md — ONE XL-size rule, ONE section (law 14)
- CSS: kept r15's room rules (XL `height:var(--kph)`, room knobs read from KIT_SIZE, end-scene bands --kes-top / --kes-bot, kv1 + kv2) and kri-xl's rule; DROPPED the `html.kv2 … .kszlive[data-kgrow="1"]:is([data-ksz="L"],[data-ksz="XL"])` grow selector (both kri-xl's XL-only version and r15's L/XL one: XL gets its height from the room rule). Kept the kv1 stacked-frame (NL/NM/NS) kgrow line.
- JS (auto-merged, read): `kszLiveLay3` sets `data-kgrow` only for XL on kv2 (L never grows → steps up to XL), clean kgrow per pick (`kszLivePick3_0`), kv2 flag not deleted at the end of the pick.
- KIT.md: §56.25 rewritten = old 56.25 (K-XL-GROW-SAME) + the whole of old §56.33 (room, end bands, Fold, before/after); the §56.33 heading deleted in place, no «changed to» note; code comments + test header that said §56.33 now say §56.25.

## Before / after table (iPad 1180x820 / Fold 755x1000, `xl-one-size.js` + `dialog-fixed.js`, real dialogs)
| device | dialog | LIVE-class build (before; numbers from the r15 report, not re-measured here) | r16 48492a68 | r17 |
|---|---|---|---|---|
| iPad | end: Đại kết cục | 754 px, runs to 822 (CUT) | 707 / 220x549 | 707 / 220x549 (90..799) |
| iPad | end: Kết cục / quiet end | 548 | 708 / 220x550 | 708 / 220x550 |
| iPad | person + long text (XL) | 780 | 780 / 220x635 | 780 / 220x635 |
| iPad | info-long XL (fig-col-fill) | body 466 | — | body 673 · fig 620 (OD #47: tall frame) |
| Fold | end ×3 | 770 | 888 / 220x730 | 888 / 220x730 |
| Fold | person + long text | 796 | 976 / 220x830 | 976 / 220x830 |
Stills looked at (Fold + iPad, own eyes): end «Đại kết cục» both devices (iPad frame 90..799 inside the 820 screen, Fold full frame, figure + strip + text clear), hand c2a enlarged card Fold + iPad (plaque name · picture + «Có cơ» badge · Tốn không · Thành …), kit-hand deal / lift / locked stills.

## Measures (build 395e7299, one browser at a time)
| test | result |
|---|---|
| dialog-fixed.js (Fold + iPad, incl. XL f) | all pass |
| xl-one-size.js | all pass |
| fig-col-fill-scan.js | frames 12 FAIL 0 |
| opt-frame-scroll-scan LIVE 135 / r17 133 frames + opt-frame-scroll-diff | FAIL 0 / FAIL 0 · fixed 0 still 0 · REGRESSIONS 0 |
| kit-opts-touchdrag.js | 8 cases FAIL 0 |
| emo-over-text.js | all pass |
| kit-dlg-avatar.js | PASS (a first run FAILed «ipad D: 3 label/toast frames» — «Danh +7 | Sủng +1 | Đức +1» — and passed on three more runs on r17, r16 and LIVE, and again after the last build: timing flake of the floating labels, not reproduced) |
| kit-hand · kit-hand-mat-scan ×2 · press-keep · badge-hand | PASS (see §1) |
| one-core-guard | PASS |
| coregates (G1–G3 + 14 hooks, base 18003079) | CORE GATES PASS · 950 s |
| quickcheck.js | QUICKCHECK PASS · 410 s · open 1877 ms · old save ok · render 242/220, tab 422/393, buổi 2273/1434 (one noisy median; r16 measured 1573/1420), tasks>200 ms 21/24 |

## Findings (not fixed)
- Hook 94 q-softlock is a known flaky on LIVE (r16 report); here coregates passed it.
- Perf: buổi median 2273 vs 1434 in this quickcheck run; r16 / earlier runs were 1573 / 1420. Re-run if RV wants it.

## HANDOVER
Ready for RV-178 (re-review the r17 delta: jkhand/jopic `face` + BigBuild, jksize CSS drop, KIT §56.25 merge, jactj4 / KIT_REQUESTS merge, 2 test-only files). Worktrees: /home/user/wt/r17 (branch), /home/user/wt/live (LIVE 18003079), /home/user/wt/r16, /home/user/wt/r15 (reference). Nothing pushed to main; no PR.

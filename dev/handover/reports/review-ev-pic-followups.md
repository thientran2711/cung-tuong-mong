# review-ev-pic-followups — r2 PASS 2481c80da1738089006763472d0356ddcc323dc9 (r1 FAIL below, kept as history)
PRIORITY #1 CHECK: OD 19/11 ~04:15Z, own r1 FAIL list, worker report ev-pic-followups §r2 | main kszOver3 jksize.js | review/* opt-scroll-reset (scroll-reset loop, separate) | claims ev-pic-followups.
## r2 verdict: PASS 2481c80da1738089006763472d0356ddcc323dc9 (= worker r2 34d4b3c7 + final-merge origin/main 6b1ab390 (earlier d9b32074) (re-merged after 7627f79c, quickcheck PASS 244 s + 11-frame regression subset 0 REG on the final build), only generated index.html/sw.js conflicted, rebuilt by build_site.sh, 0 markers)
- kszOver3 now counts .k3right>.opts: my r1 cause fixed. Diff of game code vs r1 branch = that one line (+ merges).
- Own regression scan (opt-frame-scroll-scan + opt-frame-scroll-diff, LIVE 7627f79c vs merged, one process per device): Fold FAIL 18→14, 1180 69→65, 1366 66→32. Raw REG 1+2+2 under 6-process load; those 5 frames (e68hairpinThief, e68giftArrive, giftin, newgirl, vlnvp) rerun twice in isolation on all 3 sizes: REGRESSIONS 0 both runs (load noise). My r1 five (rvframe, loveletter, e68droughtPrayer, e68leakRoof, e68servHero) no longer regress.
- Leftover FAILs all also FAIL on LIVE (stay=n: scroll-reset loop, opt-scroll-reset f6462525 owns it) — FOR MAIN: land opt-scroll-reset too.
- quickcheck --cpu 4 on 2481c80da1738089006763472d0356ddcc323dc9: PASS 229 s, old save ok, core gates PASS, render 283/271, tab 473/518, buổi 1215/1753, tasks>200ms 21/21.
- Shots DSF2 live|merged, Fold 755x1000, iPad 1180x820, 1366x1024 (rvframe, night1, caning, e68borrowDress; looked rvframe+night1 all 3 sizes): rvframe identical to LIVE, picture strip + 3 cards in frame; night1 Fold unchanged, iPad list scrolls inside with «Kéo xuống» (end snapped back = scroll-reset loop, same on LIVE). Not shot: person dialog / shop / identity card (selectors only touch .kszlive L/XL option frames).
- EVENTS.json part still PASS (r1).

---
# r1 history
# review-ev-pic-followups — FAIL 59fb29c041661521997c0b8ab4d5db8095f9d895 (merges LIVE main 5dc5d9e0; main has not moved)
PRIORITY #1 CHECK: OD 19/11 ~04:15Z, worker report ev-pic-followups, brief cag22-ev-pic-followups | main KIT 56.6/56.17 jksize.js | review/* ev-pic-followups only | claims row ev-pic-followups.

## Verdict: FAIL — iPad picture-fit regression (Law 10: "big picture only when the content fits without scrolling")
### Evidence (reviewer's own scan: dev/test/opt-frame-scroll-scan.js, LIVE 5dc5d9e0 vs branch, iPad 1180x820; programmatic scroll-to-end to avoid the wheel/re-render flake)
- The scroll-owner change itself works: #mb scrolls on LIVE in 60 frames (1180), 33 (1366); on the branch 0 / 0. Info column stands still, .opts scrolls, hint on.
- BUT 5 frames fit completely on LIVE (picture strip/M, no scroll) and on the branch now get a BIGGER picture, a scrolling list and a CLIPPED last card: PEND:rvframe, loveletter, e68droughtPrayer, e68leakRoof, e68servHero (1180). Shot (live | branch): rvframe 1180x820 — LIVE all 3 cards visible; branch picture ~1.7x taller, 3rd card cut at «Kéo xuống». Also PEND:caning/comet/dongchi/letterhome/phoenix/e68borrowDress/e68officialWife/wdframe flipped between "fits" and "scrolls" in the first run (load noise partly), stable in isolation only after the fix below.
- Cause: `kszOver3` (jksize.js:349) measures only scrollHeight-clientHeight of .k3right/.k3body/#mb. Once #mb clips and `.opts` is the scroll owner, the overflow lives INSIDE `.opts` and is invisible to it → `kszPicStep3` thinks nothing overflows and never shrinks the picture ladder, so the picture stays big and the list scrolls although a smaller picture would fit. (On LIVE iPad #mb overflow was visible to it, so the ladder worked.)
### Reviewer fix tried (not pushed; patch: scratchpad kszOver3-opts.patch = one line)
`[R,B,mb]` → `[R,B,mb,dlg.querySelector(".k3right .opts")]` in kszOver3. Result iPad 1180 full scan: LIVE fail 60 → branch 26 → branch+fix 20, regressions vs LIVE 5 → 0. Not pushed because: (1) it also changes the Fold/1366 picture ladder (no quickcheck run on it), (2) PEND:empnight on 1366 (and sometimes 1180) still goes fits → scrolls+clipped even with it (LIVE: no scroll, picc NS) — empnight is one of the re-render frames, so the worker must check it.
## Worker claims
(a) 131 → 22 FAIL: NOT reproduced as a clean win. Wheel-scan is flaky under load (the same frame flips); with programmatic scroll the iPad numbers are above. The 22 leftovers: confirmed PRE-EXISTING for pgin, prep, vlout (identical CLIPPED on LIVE incl. Fold, scrollTop resets on re-render) — not caused by this branch. empnight/rvframe-type are NOT pre-existing on iPad (see regression list).
(b) EVENTS.json: PASS. CDN img/EVENTS.json == repo file; thInv(:*)→ev-hao-huu, thBribe(:*)→ev-hoi-lo, giftto(:*)→ev-khach-den-2 (gift box), eunuch:*/j7:eunuch→ev-tai-mat. I LOOKED at all four pictures: friends in the moon-gate, silver pouch + jade tablets, gift box, window silhouette at night — all fit, no faces, painted.
## Not run (stopped at the first FAIL)
quickcheck, old-save load, 1366x1024@2 shots, person dialog / shop / identity card regression shots — rerun after the fix.
## FAIL list for the worker
1. Make the picture ladder see the option list: add `.opts` overflow to `kszOver3` (or measure the clipped column) so every frame that fits on LIVE still fits (no scroll, last card visible) on Fold, 1180 and 1366. Acceptance: scan with scroll-to-end programmatic, regressions vs LIVE = 0 on all 3 sizes (rvframe, loveletter, e68droughtPrayer, e68leakRoof, e68servHero, empnight, flood, vlcraft, j70def, night2 watched).
2. Make the scan deterministic: scroll the owner with scrollTop after settle (not 4 wheels) and compare against LIVE in the same run (regression column), run per device in its own process (timeout ≥ 25 min for all 3).
3. After 1–2: quickcheck, old-save, shots Fold+iPad+1366 looked 3x.
## FOR MAIN (pre-existing, not this branch)
pgin, prep, vlout (+ rcpacc, e68maidQuarrel, ksp, e68giftArrive, night2 intermittently): last option card unreachable on every device incl. LIVE Fold — option cards re-render ~1900 mutations/600 ms (.kdup chips, .kr-hint) and reset scrollTop.
## Shots (scratch only, not on CDN, not in git): live-/branch-/fix- 1180x820 and 755x1000 of caning, rvframe, night1, e68borrowDress. Worker's CDN shots left for main.

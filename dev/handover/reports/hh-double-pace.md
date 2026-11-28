# HH DOUBLE PACE — proof note for MAIN (RV-186 item 3; NOT fixed, for MAIN to rule)

PVQUY-POST-2 · session_01Rc5AsKMg38TfbMyywiukfd · depth 3 · branch review/pvquy-post-r2
PRIORITY #1 CHECK: OD stat-pace OD 26/11 ~04:20Z (jstatpace header) · MAIN 189 ruling «a display job must not change results» | main a96564ad: j1.js:173 apply, j8.js:24 ap, j24.js:102-103 hhLive/hhSet, j9.js affAdd | review/* review/pvquy-post 4256fe5f (had the fix folded in → FAIL RV-186) | claims PVQUY-POST.

## Question
Does LIVE pace a rise of «Hoàng hậu → ta» (hh) twice, and does the player see a different number than she gets?

## The path on LIVE a96564ad (this branch restores it exactly)
1. `apply({hh:n})` (j1.js:173) — hh is in SP_K, so `v = spG("hh", S, S.hh, n, spRk(S))` (pace #1: her own carry, her rank ceiling).
2. `S.hh = S.hh + v` — once the Empress bond is live (`hhBind`, j24.js:104), `S.hh` is an accessor; its setter `hhSet(S, …)` hands `round(v)` to
   `affAdd(Empress, S, v)` (j24.js:103).
3. `affAdd` runs its whole chain: trust trait (j28), titles (jdh), feelings (jfeel), mood (jmood), onlookers, **and its own stat pace** on the
   Empress's thiện cảm (pace #2).
Same for an NPC: `ap(p,{hh})` (j8.js:24) paces, then `p.hh`'s setter → `affAdd(Empress, p, …)` paces again.

## What LIVE SHOWS
LIVE `spSee("hh", n)` (jstatpace.js, LIVE line 29) = pace #1 only → the option chip (j1 `fmt`) shows `applyPace`.

## Numbers (built game, this branch = LIVE result path; Math.random held, emotion hook held; her rank 0, Empress bond live)
`real` = aff(Empress, her) after − before, with `apply({hh:n})`. `singleChain` = what ONE pace (affAdd chain alone, no apply pace) would give.

| bond before | asked n | apply pace (pace #1) | LIVE chip shows | real (pace #1 → affAdd chain incl. pace #2) | one pace only would give |
|---|---|---|---|---|---|
| −23 | 15 | 10 | 10 | **9** | 10 |
| 0 | 15 | 10 | 10 | **9** | 11 |
| 21 | 3 | 3 | 3 | **2** | 2 |
| 29 | 8 | 6 | 6 | **5** | 6 |
| 30 | 15 | 7 | 7 | **5** | 7 |
| 41 | 3 | 1 | 1 | **0** | 1 |
| 44 | 8 | 1 | 1 | **0** | 1 |
| 46 | 15 | 1 | 1 | **0** | 1 |
| 49 | 8 | 1 | 1 | **1** | 2 |
| −12 / −21 / 0 | 3 / 8 / 8 | = n | = n | = n | = n |

(Small rises far from the ceiling are not touched by either pace, so they agree.)

## Finding
- **Yes, LIVE paces hh twice**: real = affAdd-chain( spG(n) ), i.e. the already-paced number is paced again (rows 30/15: 15 → 7 → 5; 41–46: → 1 → 0).
- **On LIVE the chip and the real change differ** (law 4): the chip shows pace #1 (e.g. +7, +1), she gets +5, 0.
- **This branch (PVQUY-POST-2) keeps LIVE's result path untouched** (MAIN 189) and makes the PREVIEW honest instead: `spSee("hh")` → `hhSee(n)` =
  `affPreview(Empress, her, spG-peek(n))` — the dry run of exactly steps 1–3, so the chip now shows the real number (test rows «apply hh ±», «card
  apply({hh:6}/{hh:-4}) chip», «gift card queen», 0 fails in 8 runs).

## For MAIN to rule (not done here)
Should hh be paced once (drop pace #1 in apply/ap when the bond is live — what review/pvquy-post 4256fe5f had folded in), or stay as LIVE (two paces,
now shown honestly)? Changing it changes game results (every hh rise near the ceiling grows), so it needs the owner's word (law 16).

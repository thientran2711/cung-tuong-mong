# design-scale-p2-r1 — review of review/design-scale-p2 @49841ff0 (opus reviewer session_01UV1Szgio4EjKLQKSt3ZP8j)

RESULT: **PASS d8950434** (review/design-scale-p2-r1; descends from main e9c6021d — main has since moved to 73c06812: re-merge on GO).
Branch review/design-scale-p2-r1 = p2 49841ff0 + origin/main e9c6021d (via 9ddb3f6c, 802fe821 = design-scale-r1 live) + 4 reviewer fixes.
START_CTX ~5 % of the window.

## Merges
- main 9ddb3f6c: j59 geo conflict → main's kitSlotSw + page-chip gutter 46 always (no `innerWidth<600`); j93 kitReward: main's 2 new rules kept, its
  `@media (max-height:560px)` dropped (dead: canvas is always 820 high). Same resolution s15 took for r1 on main 802fe821 (clean re-merge).
- main e9c6021d: assemble.py file list (main) + kvfallback line; jne.js night-end (new on main) carried 3 orientation @media → the p2 build check
  FAILED the build (works as designed) → converted with dev/measure/kv-phase3.js: landscape≤900 → `:where(.kv2)`, ≤500 → dead, portrait → `:where(.kv1)`
  (night-end is a full-canvas scene: per-mode allowed by KIT §0.0).

## Reviewer fixes (on review/design-scale-p2-r1)
1. **kitView is not defined** (real bug, phase 3): 18 bare `kitView()` calls (j11 j26 j27 j57 jbook jflip jfx jfxkit jk2b jk3 jk4) — kitView only
   exists in rot.js, so dev/index.html (assemble.py; coop-e2e, direct tests) threw in jflip PL → coop-e2e 57/59 (page errors on Fold + iPad), and no
   `:where(.kv1/.kv2)` chrome rule applied there. Fix (group, one place): `dev/site/kvfallback.js`, put first in all.js by assemble.py — defines
   kitView()/KIT_FRAME/html.kv1-kv2 exactly like rot.js direct mode, no-op when rot.js is there. coop-e2e → 59/59. KIT §0.0 line added.
2. jne.js @media (above). 3. j59/j93 merge resolution (above). 4. KIT §0.0: "OPEN (phase 4)" list (below).

## Tests (on main 802fe821 merge, local sw-serve build; then key tests again on e9c6021d — see bottom)
| test | result |
|---|---|
| design-scale (6 sizes) | ok all true; A: RIGHT 98.2 % (only the "làm được N" badge = data), LEFT 100 %; fold room→page→room; 0 errs, no overflow at any size |
| tab-pairs 1180x820 / 755x1000 / 1366x1024 | 56 / 20 / 56 pairs, 0 mismatches, 0 errors (live .maptab bug fixed) |
| view-scale | errs 0, sameLandscapeLayout true, Fold s 1.2195 |
| coop-e2e (live Worker) | 57/59 before fix 1 → **59/59** |
| cardflip 4 sizes | exit 0 |
| dlg-clip 3 sizes | 78/80/78 cases, clipped 0, missing 0, errs 0 |
| popup-fullbody 4 sizes | exit 0 |
| newgame-ui 755x1000 / 1180x820 / 1366x1024 / 844x390 | exit 0 all |
| kit-conform 755x1000,1180x820 | exit 0 |
| kit-table 755x1000 / 1180x820 | 3 fails each: Mệnh truyện / Triều cục "Mục tiêu" value column spread 47.9 px — **same 3 on LIVE main** (pre-existing, not this branch) |
| scene-end | "bloom early" at 755x1000 — **same on LIVE main**; main 695934d1 fixed the test (measure from scene creation) |
| media-check | 0 (226 files) after the jne conversion |

## Screens looked at (host mode, 755x1000 / 1180x820 / 1366x1024 / 390x844; home + every tab + toilette)
Fold page = iPad right/left page scaled (room home, Hậu cung, Hành sự match the spread pages); top bar same height (time block wraps as one row);
one-row tab bar small but readable at s 1.22; rotated phone = spread. 0 page errors, no horizontal overflow at any size.

## Kit consistency finding (not a regression — same as r1/main; logged as phase 4 in KIT §0.0)
The phase-3 codemod rewrote @media faithfully, but phase 1 had classed some KIT MODALS / page content as "chrome/screen", so they still differ per
mode, which KIT §0.0's own RULE forbids ("kit panels/modals ... NO width/orientation breakpoint"): jpdlg `.kpdlg` grid/paddings, j79 dawn `.kpanel`
paddings + `.kpsc` scene-person card (kpid grid, kstgrid, kpfaces, placement), j93 kitReward `.kmtabs/.kmbloom/.kmbox`, jpm `.kpm-list`, jgpick
`.kipd2` two-column (spread only), p1 `.art .pcb` (spread only), jtoil `.toilw` (toilette), jcooptimer chip. Each should become ONE rule (the spread's)
for both modes; dialogs are ≤560 px in both modes, so the spread rule fits the page. Recommend a phase-4 task (kit keeper), with a dialog
rect-compare test like design-scale A for each modal.

## TOILETTE KIT REQUEST (report §5) — recommendation: option (a)
Seen: spread = kg82 dialog 940 px (x 120) spanning both pages, big mirror column + portrait + slots; one page = 566 px, no mirror, small portrait,
a large empty block under "Hôm nay". Every other kg82 mini-game (Cầm etc.) is 560 px in both modes, so the toilette is the odd one out of its kit group.
**(a) one-page toilette (≤574 px) on BOTH modes**, built by the kit keeper in jtoil/kg82: mirror as a short band at the top with her portrait in front of
it (the mirror stays — it is the scene's identity), "Hôm nay" occasions as one chip row, worn slots + bag grid below (bag scrolls), the two buttons
sticky at the bottom; delete the two `:where(.kv1) .toilw` rules.
- Gain: page = spread exactly (owner 07:47Z/07:50Z), same 560 px as every kg82 game (KIT FIRST consistency), Fold gets the mirror back, 2 per-mode rules gone.
- Risk 1: iPad loses the big mirror art — likely, small; the band keeps the mirror, and the spread's left page still shows the room behind the dim.
- Risk 2: 820 px height too tight for mirror + slots + bag in rounds 2–4 (brow/powder/rouge need a big face) — possible, medium; detect with dlg-clip +
  popup-fullbody at 755x1000/1180x820 and a look at all 4 rounds; fix: rounds 2–4 swap the bag area for the face canvas (it is not needed then).
- Option (b) keeps a two-page dialog — the only kg82 screen wider than one page — and gives the Fold a different layout again: against the one-frame rule.
**Gain outweighs loss** (one rule for both modes and the kit group; the risks are visible in tests and fixable in the same component).

## Final re-test on main e9c6021d (d8950434)
design-scale A: RIGHT 99.1 %, LEFT 100 % (582x623 both) · tab-pairs 1180x820 + 755x1000: 0 mismatches, 0 errors · coop-e2e 59/59 ·
scene-end 4 sizes PASS (main's test fix) · cardflip 2 sizes exit 0 · dlg-clip 2 sizes clipped 0 · newgame-ui 755x1000 exit 0 · media-check 0.
Not re-run on e9c6021d (passed on 802fe821, no related change since): view-scale, popup-fullbody, kit-conform, kit-table, newgame-ui iPad/phone.

## GO (s18) → READY b80ea61e (main 2232ea32 merged; assemble.py conflict = main's list + kvfallback; media-check 0; site rebuilt)
design-scale 6 sizes ok, 0 errs (A right 100 %, left 98.9 %) · tab-pairs 1180x820 / 755x1000 / 1366x1024: 0 mismatches (1366 showed 6 Dư đồ
mismatches only while design-scale ran in parallel; alone 0) · kit-conform exit 0 · boot-flash 755x1000 + 1180x820 exit 0 · boot-slow host exit 0 ·
coop-e2e 59/59 (one parallel run 57/59 "A frozen when B left" timing; alone 59/59).

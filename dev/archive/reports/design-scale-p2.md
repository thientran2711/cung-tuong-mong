SẴN SÀNG KIỂM 49841ff0

# design-scale-p2 — phase 2 + phase 3 + tab-mode root fix

Worker: session_01UV1Szh2HXLUxv3oHmnezMy (opus) · branch `review/design-scale-p2` from review/design-scale-r1 e7d697d1 (not yet on main) ·
owner rules OD 16/11 07:47Z + 07:50Z, OD:L110 L112 L116 L120 L123 L345 L985 · START_CTX ~6 % of the window; finished ~20 %.

## 1. Phase 2 — kv1 top bar (fixed through the kit, jk4)
Root cause: on the one page the time column is ~181 px (spread 226–276), so each of its two lines wrapped → block 75 px > her name block 72 px →
top bar 132 vs 129 → page box 3 px shorter (+12 px with a state chip such as "Có thai"; measured 147 vs 129).
Fix (jk4, kv1 only, chrome): the time block flows as ONE wrapping row of whole items (18 px lines, 6 px gaps; an item is never split) and the new
`kitTcFit` scales the whole block down together (zoom 5 % steps, min 80 %) when it would still be taller than her name block.
| case (same seeded save) | top bar spread / page | page box spread / page |
|---|---|---|
| base day | 129 / 129 (was 132) | 582x623 / 582x623 |
| + Có thai | 129 / 129 (was 147) | 582x623 / 582x623 |
| + 2 extra state chips + longest weather | — / 129 (zoom 0.9) | — / 582x623 |
design-scale A (same save): RIGHT page 112 elements x/y/w/h within 1 px **100 %**, LEFT page 104 elements **100 %** (r1: 95.4 % / 80.8 %).
Test fix: `dev/test/design-scale.js` copied only `S`; `rivals` is a global, so the two contexts could show different consorts (runs gave 14.7–98.2 %).
It now copies the whole save (`ser()`/`deser()`) and clears late overlays ("Luân hồi", dawn) before every tap (r1 note 4).

### Full-canvas screens per mode (spread 1180x820 vs page 590x820, same save; looked at every shot)
| screen | result |
|---|---|
| title / boot | same art, page = centre crop; ok |
| roulette (Luân hồi) | same card size; 5 columns vs 3 columns; ok |
| map (Dư đồ) | same map scale, page shows the left part (pan); ok |
| mini-game (Cầm: tấu khúc) | kit dialog 560 px in both; identical |
| podium | fills the canvas in both, same column/figure kit; ok |
| toilette (Điểm trang) | **DIFFERS**: spread = ~920 px two-column dialog (mirror + figure LEFT, controls RIGHT, spans both pages); page = one column, mirror column dropped, small portrait. Not fixable per mode without a kit decision → KIT REQUEST below. |
No overflow, no clipped text, 0 page errors in either mode.

## 2. Phase 3 — no width breakpoints left inside the canvas
- `dev/measure/kv-phase3.js` (codemod, `--write`): every remaining CSS width/height/aspect/orientation `@media` in p1.html + j*.js —
  DEAD **31 deleted**, ALWAYS **3 unwrapped**, PAGE **34 → `:where(.kv1)`**, LAND **12 → `:where(.kv2)`** (specificity unchanged; table:
  `dev/measure/kv-phase3-table.md`). Includes the jk4 `(max-width:999px)` blocks (top bar, Về phòng) and the dead `(max-width:0px)` block, j57's
  tab-label @media built in JS strings, jbd's backdrop @media in a template.
- JS by hand → `kitView().pages`: j11 pxCap, j26/j27 map zoom, j57 tabsFit + h2c, j24, jbook kitIsPortrait, jfx/jfxkit particle caps + edge art,
  jk2b card wide fallback (now = spread value) + court stage, jk2b roulette, jk4 kitHdMe/kitHdFit, jflip plates, jseal; dead short-landscape
  branches removed (jk2b 6.3b card, jflip side layout + `.kcf-side` CSS, jseal ≤500, jfx h<500, j79 ≥1200 kpanel).
- `node dev/measure/media-audit.js 590`: 189 (main) → 144 (r1) → **43, all ENV** (reduced-motion / hover / pointer / display-mode).
- BUILD CHECK: `dev/measure/media-check.js`, first step of `dev/site/build_site.sh`; exits 1 on any width/height/aspect/orientation `@media`,
  `matchMedia(...)`, `innerWidth/innerHeight` compare with a number OR with each other (orientation). Currently 0.
- KIT.md §0.0 updated (rule text, build check, top bar, tab mode).

## 3. Related bug — Dư đồ → Hậu cung kept `.maptab` (ROOT fix, whole family)
Root: tab-mode classes of `.game` were set by whichever `renderPanel0` layer handled the tab; layers that short-circuit the chain (jhc Hậu cung /
Đàn ông, jht Hoàng tự…, j72, j42 servant, jkc) never reached j38's maptab toggle or j6's cardtab toggle → the previous tab's class stayed.
Fix: j6 `KIT_TABMODE = ["maptab","cardtab"]` (every tab-dependent class of `.game`) is removed before EVERY panel render; each tab's renderer sets
its own. Test `dev/test/tab-pairs.js` (every ordered tab→tab pair, real mouse taps through the host transform):
| build | 1180x820 | 755x1000 |
|---|---|---|
| before (j6 fix reverted) | 56 pairs, **17 mismatches** (go→court/kid/story .maptab + stage hidden; court/kid→story stale .cardtab) | — |
| this branch | 56 pairs, **0 mismatches**, 0 errors | 56 pairs, **0 mismatches**, 0 errors |

## 4. Tests (local sw-serve build)
- design-scale.js full (6 sizes): ok {pageCanvas, spread, rotated, oneAtATime room→page→room, noErrors} all true; errs 0, overflow none at every size.
- kit-popup-sample 755x1000 / 1180x820 / 1366x1024 / 844x390: exit 0.
- stage-rail 755x1000,1180x820,1366x1024: PASS.
- cardflip 755x1000,1180x820,1366x1024,844x390: exit 0 (first run found a ReferenceError from my jflip edit — `side` still used in centreRect; fixed in 49841ff0, re-run exit 0).
- dlg-clip 755x1000 / 1180x820 / 1366x1024: 78 cases each, clipped 0, missing 0, errs 0.
- view-scale: exit 0, sameLandscapeLayout true, Fold 590x820 s 1.2195, taps ok, errs 0.
- design-scale A re-run: RIGHT 98.2 % — the only 2 differing elements are the Hậu cung sub-tab count badge (`.pct > i`, "làm được N": 1 vs 2 digits; the
  direction flips between runs) = data, not layout; LEFT 100 %.
- media-check: 0; media-audit 590: ENV only.
- NOT run: coop-e2e (live Worker), scene-end, popup-fullbody, newgame-ui (no change in those files beyond the codemod; reviewer may run).

## 5. KIT REQUEST (for the kit keeper / coordinator — not done here, LUẬT KIT TRƯỚC)
Toilette dialog (jtoil, `.ktoil…`): on the spread it is ~920 px wide (spans both pages); on the one page it falls back to one column without the
mirror. Per OD 07:50Z the page must be the iPad half scaled. Options: (a) toilette becomes a one-page (≤ 574 px) kit dialog on the spread too
(mirror above the controls, same as page) — page = spread exactly; (b) keep the spread two-column screen and give the page the mirror on top.
Recommend (a). Other dialogs wider than one page were NOT scanned here (kit popups measure 560 px in both modes per r1); a scan of every modal width at 1180x820 should follow.

## 6. Notes
- `CF.portraitBelow` in jflip config is now unused (plates follow kitView().pages); left in place.
- Old comments in the codemod output are marked `/* kv3:<action> */`.

# design-scale: ONE design frame + uniform scale (plan + phase 1)

Worker: session_01UV1SzjmR9rHoafmnuNS1KA (opus) · branch `review/design-scale` (from origin/main cdad7109) · owner rules OD 16/11 07:47Z + 07:50Z, OD:L110 L112 L116 L120 L123 L339 L345 L346 L985.

## 1. What main has today (PRIORITY RULE #1 check)

The s11 note "no uniform design-frame scaler found" is wrong: two of the three pieces already exist on main.

| piece | where | state |
|---|---|---|
| Uniform scaler (design canvas host) | `dev/site/rot.js`, KIT §0 "SUPPORTED SCREENS · DESIGN CANVAS"; test `dev/test/view-scale.js` | DONE. index.html is a thin host; the game runs in ONE iframe `#krotf` of the design size, scaled by `s = min(vw/DW, vh/DH)`, centred, paper bars. Narrow portrait (w/h < 0.62) is pre-rotated 90° + rotate prompt. `kitView()` = {w,h,s,rot}. Inside the frame the game only ever sees the design sizes. |
| Design sizes | rot.js | landscape **1180x820** (iPad spread) · portrait **755x1000** (a SEPARATE portrait design, not the iPad half) |
| One-page shell (phone) | `jk3.js` §6 `k3Shell` (KIT 31.7, kitPhoneShell): `.game.k3ph.k3home` / `.k3pop`, "Về phòng" `#k3room` | DONE for portrait < 1000 px wide: room home = main screen; tab tap opens the panel full screen; tapping the active tab or "Về phòng" returns; "Sang buổi" lands in the room. |
| Two-page spread (landscape) | `p1.html:26` grid `"hud hud" "stage panel" "bar bar"`, columns `1.05fr 1fr` | DONE but the halves are unequal: stage 596 px, panel 568 px (no gutter). |
| Tab change animation, swipe only in Tuần lục | page-curl / page-curl2 (OD:L985) | on main |

Other branches checked: `review/por-scale` = portrait face crop scale (unrelated); `review/scene-scale` = stage figure scale (j59, merged long ago); `review/fold-layout` = in main.

**What is NOT done (the real gap):** the portrait canvas is its own 755x1000 layout, so the Fold page is NOT a copy of the iPad half. Compare (screens at 1180x820 and 755x1000, Hậu cung → Chí tôn): on iPad the person card sits in a 568 px panel; on Fold it is laid out at 739 px, so the portrait frame, act cards, sub-tabs and line breaks are all different. The cause is ~100 width/orientation breakpoints that switch layout between the two canvases (table in §3).

## 2. Design frame chosen

**ONE PAGE = 590 x 820 CSS px = exactly half of the iPad 1180x820 spread.**

| screen | canvas the game sees | shown as |
|---|---|---|
| any landscape (iPad 1180x820, 1366x1024, Fold open 1000x755, phone 844x390) | SPREAD 1180x820 = LEFT page (room/stage) + RIGHT page (open tab) | `s = min(vw/1180, vh/820)` (unchanged) |
| portrait w/h ≥ 0.62 (Fold 755x1000, iPad portrait) | ONE PAGE 590x820 (was 755x1000) | `s = min(vw/590, vh/820)`: Fold 755x1000 → s 1.2195, page 719.5x1000, paper bars 17.7 px each side |
| narrow portrait w/h < 0.62 (390x844, Fold cover 412x1058) | SPREAD, rotated 90° + rotate prompt (unchanged, OD:L339) | as today |

Why 590x820: it is literally the iPad half, so the Fold page can be pixel-proportional to the iPad right page (same CSS px, only `s` differs: iPad 1.0 / iPad Pro 1.157 / Fold 1.22). The Fold aspect 0.755 vs page 0.72 costs only two 18 px paper bars. Keeping 755x1000 can never be proportional (different width ⇒ different wrapping).

Inside the spread each page gets the same box: `.game` padding 8 + a 16 px gutter between the pages (book binding), so the LEFT and RIGHT page content boxes are both **574 px** wide; the one-page canvas has the same 8 px margins ⇒ its content box is also 574 px. The constants live in ONE place (`KIT_FRAME` in rot.js, mirrored as CSS vars `--kpage-w`, `--kpage-h`) and `kitView()` gains `pages: 1|2`; `html.kv1` / `html.kv2` classes mark the mode. Game code asks `kitView().pages` instead of reading `innerWidth`.

Chrome (top bar, bottom tab bar, "Về phòng") is the only thing allowed to differ between the two modes (OD:L345 "one layout per orientation"): in the spread it spans both pages, on one page it spans one page. It is written ONCE per mode with `.kv1/.kv2` selectors in the kit, never with width queries.

## 3. Breakpoints inside the canvas (`node dev/measure/media-audit.js 590`)

189 breakpoints (CSS `@media`, `matchMedia`, `innerWidth/innerHeight` compares) in p1.html + dev/build/j*.js. Inside the canvas only two sizes exist, so each one is:

| class | count | meaning | action |
|---|---|---|---|
| DEAD | 37 | matches at neither 1180x820 nor 590x820 (e.g. `max-height:500px`, `min-width:1200px`) | delete (phase 3) |
| ENV | 42 | reduced-motion / hover / pointer / display-mode | keep |
| ALWAYS | 6 | matches at both | unwrap (phase 3) |
| PAGE | 76 | only the one-page canvas (29× `max-width:599px`, `max-width:999px`, `orientation:portrait`, `innerWidth<1000` …) | content rules: DELETE so the page uses the spread rules · chrome/shell rules: rewrite as `.kv1` |
| LAND | 28 | only the spread (`min-aspect-ratio:1/1`, `min-width:1000px`, `innerWidth>=1000`) | content rules: make unconditional · chrome: rewrite as `.kv2` |

Files with most rules: p1.html 28, j79 26 (panel kit), jk2b 9, jk4 7, j93 6, jinv 5. Full table: `node dev/measure/media-audit.js 590` (file:line, query, class, state at old 755x1000).

## 4. Migration in phases

1. **Phase 1 (this branch now):** rot.js portrait canvas → PAGE 590x820, `KIT_FRAME` + `kitView().pages` + `html.kv1/kv2`; spread = two equal 574 px pages with a gutter; phone shell (`k3Phone`) keyed to `kitView().pages===1` instead of `innerWidth<1000`; the chrome made to fit one page; the PAGE/LAND rules of the RIGHT-page content that the owner sees most (panel kit j79, person card, act cards, sub-tabs, inventory) converted so the page = the spread's right page; proportionality test `dev/test/design-scale.js`; KIT §0 rewritten (+ kit page sample). Game stays playable at all 6 sizes.
2. **Phase 2:** convert the remaining PAGE/LAND rules file by file (stage page j59/jk2b/jk3 HUD plaques, book jbook, toilet, game pick, coop timer, tutorial, load screen …), each listed with before/after in PROGRESS; the test's mismatch list must reach 0.
3. **Phase 3:** delete DEAD rules, unwrap ALWAYS ones; a build check fails on any new width/orientation `@media` or `innerWidth` compare outside the kit (`.kv1/.kv2` only).

## 5. Risks

| risk | likelihood | severity | detect / fix |
|---|---|---|---|
| Co-op: two players on different devices see different modes | possible | small | co-op sends state only (PREAMBLE perf rule); the mode is a local view class, never synced; coop-e2e test at 1180 + 590. |
| Modals/panels: kit panel was "560 px, full width under 600" | likely | medium | in the page they keep 560 px (fits in 574); fixed overlays live inside the frame, so they stay on the page; test opens a kitModal in both modes. |
| Text legibility on small screens | possible | small | owner accepted small text on phone landscape (OD:L346); Fold scale grows 1.22× vs iPad 1.0, text is bigger on Fold than on iPad. |
| Safe areas (notch, iPad home bar) | possible | small | host already pads `env(safe-area-inset-*)` on :root; the canvas fits inside; screenshot at 390x844 rotated + 844x390. |
| Stage figures shrink in the narrower spread left page (596 → 574 px) | likely | small | j59/kitStageScale measures the stage box, figures re-fit; book-fig-scale test + screenshot. |
| Old saves / localStorage keys tied to width (`hclh-kg-*`) | rare | small | keys are not width-based; load an old save in the test. |
| Phone shell regressions (Về phòng, map tab, popw) | possible | medium | test taps tab → panel → active tab → room on the one-page canvas. |

## 6. How reviewers test "same content, pixel-proportional"

`node dev/test/design-scale.js http://localhost:<port>/ <outdir>` (host mode `?khost=1`, real taps through the transform) at 755x1000@2, 1180x820@2, 1366x1024@2, 412x1058@2, 390x844@3, 844x390@3:
1. canvas per size: design w/h, s, pages (1180x820 → 2 pages; 755x1000 → 1 page 590x820; 412x1058 / 390x844 → rotated spread).
2. **proportional check:** open the same tab + person (Hậu cung → Chí tôn → Hoàng thượng, same save) and record every visible element rect inside the RIGHT page (relative to the page box). For each size, `screen rect / s` must equal the iPad 1180x820 rect within 1 CSS px for ≥ 98 % of elements; the list of mismatches is printed (file of element classes) — phase 2 drives it to 0.
3. Same for the LEFT page (room home: stage, plaques, figures) between the spread and the one-page home.
4. Taps land on the right tab at every size (incl. rotated), tab → page → back to room works on one page, 0 page errors, no horizontal overflow inside the canvas.
5. Side-by-side sheet (iPad right page vs Fold page scaled to the same width) for the human reviewer.

~10% xong / ~90% chơi được (game unchanged until phase 1 lands)

## 7. Phase 1 result (review/design-scale)

`node dev/test/design-scale.js` (built site, host mode for devices):

| size | canvas | pages | s | rotated | one-page flow | errors | overflow |
|---|---|---|---|---|---|---|---|
| Fold 755x1000@2 | 590x820 | 1 | 1.2195 | no | room → page → room | 0 | no |
| iPad 1180x820@2 | 1180x820 | 2 | 1 | no | spread | 0 | no |
| iPad Pro 1366x1024@2 | 1180x820 | 2 | 1.1576 | no | spread | 0 | no |
| Fold cover 412x1058@2 | 1180x820 | 2 | 0.5024 | yes | spread | 0 | no |
| phone 390x844@3 | 1180x820 | 2 | 0.4756 | yes | spread | 0 | no |
| phone 844x390@3 | 1180x820 | 2 | 0.4756 | no | spread | 0 | no |

Proportionality (same seeded game, Hậu cung → Chí tôn, every element relative to its page box): RIGHT page box 582x623 (spread) vs 582x620
(page), x + width equal for 100 % of 109 elements, x/y/w/h equal within 1 px for 97 %; LEFT page (room) x + width 100 %, full 82 % — the only
difference is the 3 px shorter page (one-page top bar 132 px vs 129: the time block wraps to 3 lines) which shifts the figures 3 px. Phase 2 item.
Breakpoints 189 → 143; content breakpoints 0 (`kv-codemod.js` reports no drop/unwrap left). Before/after per rule: `node dev/measure/kv-codemod.js` on
origin/main vs this branch.

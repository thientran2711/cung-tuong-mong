# Cung Tường Mộng: ONE UI KIT (single source of truth)

Owner rule 11/14: every image, frame, button, bar, card, tab, backdrop and other visual element comes from this kit.
No worker hand-draws a new style, a one-off frame, a custom button or a private CSS look. Reviewers check every
`review/<topic>` branch against this file with screenshots at the owner's devices (CSS px @ device scale): 755x1000@2 (Fold portrait),
1000x755@2 (Fold landscape), 1180x820@2 (iPad landscape), 1366x1024@2, 844x390@3 (phone landscape), plus a check that 390x844@3 shows the
game pre-rotated with taps landing on the right buttons (owner 11/15; 412x1058 / 390x844 portrait layouts are no longer reviewed).
Anything not listed here, or listed but drawn differently, is a FAIL.

## 0. SUPPORTED SCREENS · DESIGN CANVAS — RULE: ONE LAYOUT PER ORIENTATION, SCALED (owner 11/15) — `dev/site/rot.js`
**0.1 Rotate prompt (owner 15/11 05:50Z "390x844 shows the rotate prompt"; review/small-bugs-3):** on a narrow portrait screen (w/h < 0.62) the prompt
"⟳ Xoay ngang điện thoại để chơi" (`#krottip`, one line, `width:max-content`) shows on EVERY open and every turn back to portrait, until she turns the
phone (it goes) or taps it; the sideways game stays playable under it. Direct mode (tests, `?khost=0`) shows the same prompt without catching taps.
(Was: once per device for 4 s, localStorage `ctm-rot-tip` — a returning player saw the sideways title screen only; the prompt wrapped to 2 lines.)
**0.0 ONE DESIGN FRAME = ONE PAGE (owner 16/11 07:47Z + 07:50Z, OD:L112 L116 L123 L345; review/design-scale).** The unit is ONE PAGE
**590 x 820** = exactly half of the iPad spread. `window.KIT_FRAME = {spread:{w:1180,h:820}, page:{w:590,h:820}, margin:8, pageMargin:4, gutter:0}` (rot.js) is
the only place these numbers live; CSS reads `--kpage-w/--kpage-h`; JS asks `kitView().pages` (1 or 2). `html.kv2` = SPREAD (landscape: LEFT page
= her room / stage, RIGHT page = the open tab, two EQUAL 582 px page boxes meeting at the book binding); `html.kv1` = ONE PAGE (portrait: the room
home is the main screen, a tab opens the RIGHT page full screen, the active tab or "Về phòng" goes back — kitPhoneShell §31.7, now keyed to
`kitView().pages===1`; tab change by tap + short page animation, swipe only in Tuần lục, OD:L985). The page box is **582 x 623 in both modes**, so the Fold page
IS the iPad page scaled (iPad s 1.0, iPad Pro 1.157, Fold 1.1737).
**0.0a ONE PAGE BOX (owner 16/11 17:00Z s20, OD:L345 + OD:L1278; review/page-scale):** "màn hình dọc của điện thoại là cái scale ra của cái màn hình
ngang của iPad" — the open page must be the iPad right page scaled: same columns, rows and element positions. Root cause of the bag showing more rows on
one side (owner: 7 rows vs 4): the one-page canvas was 590x820 but its bottom bar is 32 px taller (two rows of 4 tabs, 76 px, vs the spread's one row,
44 px), so its page box was 582x591 vs the spread's 582x623, and every layout that fills free height by pixels (kitInvFit bag rows + extra column,
equipment slot size, fills) laid out differently. Fix (ONE place, `KIT_FRAME` in rot.js + kvfallback.js): the one-page canvas is **590 x 852** =
the spread's height + the extra chrome, so `KIT_FRAME.box` = 582x623 is the page box in both modes and nothing inside a page ever sees a different size.
RULE: whoever changes chrome height in ONE mode (top bar, bottom bar, back-to-room) changes `KIT_FRAME.page.h` by the same amount; page code never
reads the page height to decide columns/rows. **No `N vh` / `N dvh` sizes** inside the canvas (the one-page canvas is 32 px taller, so 1vh differs):
use `calc(N*var(--kvh))`, `--kvh` = 1 % of the SPREAD height (8.2 px) in both modes, set by rot.js/kvfallback (review/page-scale codemod: 50 sizes in
17 files — kit panel `--kph`, dialog art bands, reward tabs, pickers …); `100vh`/`100dvh` (fill the canvas) stay. `media-check.js` (build) fails on a new one. Test: `dev/test/page-scale.js` (every tab + every sub-tab of its first tab row + common pop-ups: page boxes
equal, every grid same columns x rows, ≥95 % of first-screen element rects equal within 2 px; Dư đồ is a full-canvas map screen, exempt).
**0.0b FULL SCREEN WIDTH (owner 17/11 03:54Z "hai cái mép trái và phải dư một khúc ... cho nó tràn màn hình luôn"; review/app-edge).** The app (top card, stage/content, bottom tab bar) always spans the FULL screen width (minus env(safe-area) insets); there are no left/right paper bands on any device. Root cause was `rot.js geo()`: one uniform scale `s = min(W/DW, H/DH)` on a fixed-width canvas, so a screen relatively wider than 590x852 (Fold portrait 755x1000: s 1.1737, canvas 692 px, 31 px band each side = 91.7 %) was letterboxed. Fix (ONE place, `geo()`): the scale stays the HEIGHT fit (so text, figures, chips keep their kit size) and the canvas width grows to `ceil(AW/s)` (Fold: 590 -> 644 design px; frames/columns grow, nothing is stretched), capped at `KIT_FRAME.maxGrow` (1.7) x the design width (beyond that, e.g. ultrawide, paper bands remain). `kitView().w` / `innerWidth` inside the frame are therefore >= 590 (page) / >= 1180 (spread); `--kpage-w` is the real page width. RULES: page content must be width-flexible (grid/flex, no fixed 582/590/1180 px); chrome uses the same kit inner padding at every width. Screens that never grow: width-limited 4:3 iPads (1366x1024, 1024x768) are already 100 % wide (spare paper strip at the TOP, §0 safe-area); narrow rotated phones (412x1058, 390x844) fill the screen width sideways. Measure: app width / viewport width = 100 % at 755x1000, 1180x820, 1366x1024, 412x1058, 390x844, 1024x768 (`#krotf` rect vs `innerWidth`).
- RULE: page CONTENT (panels, person card, act cards, chips, kit panels/modals, stage plaques and figures) has NO width/orientation breakpoint;
  the same CSS lays it out in both modes. Only CHROME (top bar, tab bar, page grid, back-to-room) and full-canvas SCREENS (title, roulette, map,
  scene panel, mini-game overlay, podium, load) may differ per mode, written once per mode with `:where(.kv1)` / `:where(.kv2)` selectors
  (specificity unchanged) or, in JS, `kitView().pages` — NEVER a width/height/aspect/orientation `@media`, `matchMedia(...)` or
  `innerWidth/innerHeight` compare (design-scale phase 3: 0 left; 31 dead blocks deleted, 3 unwrapped, 46 rewritten by `dev/measure/kv-phase3.js`).
- BUILD CHECK: `dev/site/build_site.sh` runs `node dev/measure/media-check.js` first and fails on any such breakpoint in p1.html / j*.js
  (allowed: prefers-reduced-motion, hover, pointer, display-mode, print).
- FALLBACK: `dev/site/kvfallback.js` (first in all.js via assemble.py) defines `kitView()`, `KIT_FRAME` and html.kv1/kv2 when rot.js is absent (dev/index.html: coop-e2e, direct tests); a no-op under rot.js. Call `kitView()` freely in game code.
- TOP BAR on the one page (jk4, design-scale p2): the time block flows as ONE wrapping row of whole items (18 px lines) and `kitTcFit` scales it
  down together (zoom 5 % steps, min 80 %) when it would be taller than her name block — so the bar has the spread's height and the page box
  under it is the spread's (582x623 both modes).
- BOTTOM BAR on the one page (owner 16/11 13:25Z (C), review/phone-bars; sample §0b): the 8 tabs are TWO ROWS OF 4 big buttons (36 px rows, label .86 rem via j57 `--tfs`; `tabsFit` sets `cols = ceil(n/2)` when `kitView().pages===1`, the spread keeps ONE row) and Sang buổi is ONE tall 84 px button spanning both rows at the right (p1 `:where(.kv1) .bar .main`). One rule in the kit bar, no per-screen CSS. Its extra 32 px are added to the one-page canvas (590x852, §0.0a), so the page box under the bars stays the spread's 582x623.
- TAB MODE (j6 `KIT_TABMODE` = maptab, cardtab): every tab-dependent class of `.game` is reset before EVERY panel render; the open tab's renderer
  sets its own. Test: `dev/test/tab-pairs.js` (every tab→tab pair, real taps, 1180x820 + 755x1000).
- OPEN (design-scale-p2 review, phase 4): kit modals / page content still carry per-mode `:where(.kv1/.kv2)` rules carried over by the phase-3 codemod, which this RULE forbids: jpdlg `.kpdlg` grid, j79 dawn `.kpanel` paddings + `.kpsc` scene-person card (kpid grid, kstgrid, kpfaces, modal placement), j93 kitReward `.kmtabs/.kmbloom/.kmbox`, jpm `.kpm-list`, jgpick `.kipd2` two-column, p1 `.art .pcb` (kv2), jtoil `.toilw` (KIT REQUEST: one-page toilette), jcooptimer chip. Each must become ONE rule for both modes (the spread's); `grep -n 'kv3:.kv' dev/build` lists them.
- Audit: `node dev/measure/media-audit.js 590` (must list ENV only). Tests: `dev/test/design-scale.js` (right/left page rects equal within 1 px), `dev/test/page-scale.js` (every tab, §0.0a).

The game is laid out at exactly TWO design sizes and never reflows on a device: the picture is scaled uniformly, like resizing a window.

| screen | layout drawn | how it is shown |
|---|---|---|
| any landscape: Fold 1000x755, iPad 1180x820 / 1366x1024, phones 844x390 … | **1180 x 820** (the iPad layout) | scaled by s = min(vw/1180, vh/820), centred |
| portrait, width/height ≥ 0.62 (Fold 755x1000, iPad portrait) | **590 x 852** (ONE PAGE = the iPad half; page box 582x623 as on the spread, +32 px for its taller tab bar) | scaled by s = min(vw/590, vh/852), centred (Fold: s 1.1737, 31 px paper bars) |
| narrow portrait phone, width/height < 0.62 (390x844, 412x915, 412x1058) | **1180 x 820** | pre-ROTATED 90° (the player turns the phone), then scaled; one-time tip "Xoay ngang điện thoại để chơi"; turning to real landscape drops the rotation without reload |

- How: index.html is a thin HOST (rot.js, top of `<head>`, turns the rest of the page into inert `<plaintext>` — never `window.stop()`, which
  leaves a page Chromium never paints) holding ONE frame `#krotf` (`index.html?krot=1`) of the design size, `transform:
  [translateX(vw) rotate(90deg)] translate(ox,oy) scale(s)`, origin 0 0; the bars around it are paper `#f6efe2` (never black).
- Inside the frame the game sees only the design size: `innerWidth/innerHeight`, every CSS media query and every JS breakpoint read
  1180x820 or 590x852. `kitView()` → `{w,h,s,rot,design}` is THE function to ask for the view (s = the screen scale). Never read
  `screen.*` or the host's size from game code.
- Pointer / touch / drag coordinates (page curl, sliders, map pan) arrive already divided by s and un-rotated (the browser maps them through
  the frame's transform); fixed popovers and overlays live inside the frame, so they stay on the canvas. Nothing in the game divides by s.
- `screen.orientation.lock('landscape')` only for a narrow portrait screen in an installed PWA / fullscreen; manifest `"orientation":"any"`.
- While typing (on-screen keyboard), the height shrink is ignored so the canvas does not jump.
- Direct mode (no host): `?khost=0`, or automated browsers (`navigator.webdriver`) unless `?khost=1` — tests that drive the game at a
  design size keep working; `dev/test/view-scale.js` tests the host (`?khost=1`).
- Phone landscape 844x390: s = 0.4756; smallest text 9.92 CSS px → 4.7 px on screen (main body .85rem → ~6.5 px) — owner 11/15 accepts it:
  no minimum-font workaround, no separate phone layout. Measured (view-scale.js): s 0.8475 @1000x755, 1 @1180x820, 1.1576 @1366x1024,
  1 @755x1000; tab + top-bar rects identical in all landscape sizes; taps land on the right tab everywhere incl. rotated 390x844.

Code lives in `dev/build/` (modules concatenated by `assemble.py`; later modules wrap earlier ones).
Kit core: `j15` (person card, pager, buttons), `j17` (effect lines), `j19` (act card, odds chip, frame, result card),
`j21` (relations, fbar), `jkit` (one act-card size + ⓘ full card), `jtin` (sbar), `j60` (portrait kit), CSS in `p1.html`.

---

## 1. Colours

### 1.1 Theme tokens (`p1.html :root`)
| token | value | use |
|---|---|---|
| `--bg` | `#f5ecdc` | page |
| `--panel` / `--panel2` | `#fffaf0` / `#f6ead6` | cards / options |
| `--ink` | `#2a1a12` | text |
| `--dim` | `#6b5643` | secondary text, neutral effects, labels |
| `--gold` | `#8f5f0c` | titles, active tab, frame label |
| `--line` | `#d2b071` | borders of buttons, options, chips |
| `--good` | `#2d7a52` | GAIN (green) |
| `--bad` / `--red` | `#c23b22` | COST / risk (red) |
| `--jade` `--peony` | `#5fa58c` `#e48aa4` | accents |
| `--sa2` `--sa3` | per season | seasonal UI theme (set by the season code, never by hand) |

### 1.2 Gain / cost colours (every act, option, result)
- gain: `.ef.g` = `--good`, bold; cost/loss: `.ef.r` = `--bad`, bold; neutral: `.ef.n` = `--dim`, normal weight.
- risks are on their own red line labelled `kèm` (`.kl` label + `.ef.r`), never mixed into the gain line.
- result toast deltas use the same `.ef g/r` spans (`resultShow`).

### 1.3 ONE rank palette B24 (owner Lượt 726/728: avatar frame/badge/halo, triều phục, rooms, any rank accent = the SAME colour per rank) (harem + servants + roles) — `dev/build/j1.js` (owner 11/16 13:00Z "nhạt nhòa quá → tươi hơn")
The values are typed ONLY in j1: `RCOL` (8 ranks), `RCOL_COLD` (lãnh cung), `MRCOL` (maids), `ERCOL` (eunuchs), `KIT_ROLE` (non-rank roles). Nobody keeps a copy:
read live `RCOL[rank]` / `KIT_RANK_COL[rank]` / `kitRankCol(rank|'cold')` (j60) / `kitServCol(role,rank)`. Used by: halo, ring, chips, card colour `--c`, portrait ground `.rk-c0..c7`,
text tone. B24 GROUNDS: ONE accessor `kitRankTone(title,col,ground)` (jk4) — ground `paper` (default for cream paper) = derived tone (`kitToneOf`); ground `stage` (painting / dark panel) = the RCOL base itself. Called without ground it returns the paper tone for `--rt` plus `;--rb:<RCOL base>` for the 8 harem ranks, so every existing builder carries both; CSS uses `--rt` on paper and `--rb` (+ dark ink edge) on stage tags / `.kesov` / `.krs` / `.modal.night`. No per-place colour. B24 note: Quý phi's "small royal-yellow touch, less than t7" (B21) has no existing kit accent slot; not invented here (see report). The TEXT tone on paper is DERIVED, never typed: `kitToneOf(base)` (jk4) = same hue, saturation kept ≥ .75 for vivid families, lightness lowered only until contrast ≥ 3.6:1
on parchment #fbf3e2 (jewel tones; plain text, no edge); `kitRankTone(title)` looks the title up in `KIT_RT` (title words → base colour read from j1) and applies `kitToneOf`.
Portrait grounds `.rk-c0..c7` are generated from `RCOL` by the `kit-rk` style (jk4), not typed in CSS.

| rank | name | base colour (RCOL) | family |
|---|---|---|---|
| 0 | Đáp ứng | `#eae3d0` | cream-ivory (kem / trắng ngà) |
| 1 | Thường tại | `#7fb394` | green (xanh lá) |
| 2 | Quý nhân | `#7e9ccb` | blue (xanh dương) |
| 3 | Tần | `#e3a3b8` | hồng phấn |
| 4 | Phi | `#a88bcb` | purple (tím) |
| 5 | Quý phi | `#e3a25b` | orange (cam) |
| 6 | Hoàng quý phi | `#d46a64` | red (đỏ) |
| 7 | Hoàng hậu | `#efbd69` | gold (vàng) |
| cold | Lãnh cung | `#8fa3b8` | cool steel grey |

Frame / gem / brocade art (`img/kit/frame-consort-N`, `gem-N`, `bg-consort-N`) are painted pictures per rank (see §3); they keep their painted look (re-painting them brighter is an art task, not a palette change).

### 1.4 Servant rank palettes (owner 11/14, brightened 11/16)
- maids `MRCOL` = `["#2fa08a","#12b58c","#3a78e0","#e4552b","#8d5ee6"]` (thô sử grey-jade, cung nữ jade, đại cung nữ blue, chưởng sự cô cô terracotta, nữ quan violet)
- eunuchs `ERCOL` = `["#7fa850","#20a860","#2f8ac8","#c4642a"]` (tiểu thái giám sage, thái giám green, thủ lĩnh steel blue, tổng quản bronze)
- j60 `KIT_MRCOL` / `KIT_ERCOL` are aliases of the j1 globals, not copies; `kitServCol(role,rank)`.
- used for: servant token badge `img/kit/tok-mN.webp` / `tok-eN.webp`, a 22 % tint over the servant brocade, the round-avatar ring, the title tone.

### 1.5 Role colours (non-harem) keep the existing `f.col` of each face constructor (emperor `#f0d070`, Thái hậu `#c9a0e0`, eunuch `#8a8aa0`, official/men `#6a8aa0`, physician `#8fc38a`, kids `#d9b25f` heir / `#c98aa0`).

---

## 2. Type sizes
- body font `--body` "Be Vietnam Pro"; display/titles `--display` "Noto Serif".
- act card text `--kfs`: `.76rem` (phone) / `.8rem` / `.875rem` (wide); `.kl` labels `.66rem` uppercase; chips `.75rem` (`.68rem` phone);
  buttons `.8rem`; frame label `.pfrw` `.7rem` gold 600; "Người lạ" label `.klab` `.72rem`.
- Never shrink text to fit: text wraps; no truncation (`…`, line-clamp) anywhere, act cards included (see 6: cards grow, rows of cards share one height, the panel scrolls).

---

## 3. Components (existing kit functions; use these, never new markup)

| piece | function / class | rules |
|---|---|---|
| effect token | `eff(t)`, `effList(tokens,def)` → `.ef g/r/n` | colours of 1.2 |
| odds chip | `oddsChip(word)` → `.oc .oc0..oc7` | ladder Liều/Khó/Năm ăn năm thua/Khá chắc/Chắc/Rất chắc/Nắm chắc; never %, never "Chắc chắn"; ODDS CAP (owner 17/11): a formerly-sure CHANCE act shows the cap word `capW()` (= word(BAL.odds.hi), Nắm chắc) and fails softly through the ONE kit path `oddsSoft` (j63; hint `kitSoftW` / `kitCapLine`, button gate `capAt(khắc,cost)`); pure bookkeeping (walking, fixed price, opening a panel, a decision) shows no word and never rolls |
| any price line | `kitParse('word · tốn: … · thành: … · hỏng: … · kèm: …')` | used by `optLine`, `dilLine`, `actLine`, `kitFix`; returns the labelled rows of section 6 (j63) |
| act card | `cardH(a,i)` → `button.card.kcard.ka` | the ACT CARD frame of section 6 (j63): title + odds chip, description, rows Cần / Tốn / Được / Mất / Kèm / Ghi chú |
| option (dialogs) | `button.opt` + `<small>` through `kitParse` → `.ka` | same ACT CARD frame (section 6) |
| button with price | `pbtn(attrs,name,line,why)` → `.ka` | same ACT CARD frame (section 6); conditions = Cần row |
| plain button | `.btn` | `#fffaf0`, `1px --line`, radius 6, min-height 40 |
| tabs inside a person card | `pcard({groups})` → `.pctabs .pct` (+ count `<i>`), active `.pct.on` = gold fill | groups for rivals come from `RVGRP` (Giao thiệp / Hại nhỏ / Hại nặng / Sát hại) |
| main tabs | `#tabs [data-tab]` (Hành động, Bản đồ, Phi tần, Quan hệ, Phe phái, Kẻ hầu, Con cái, Rương đồ, Tài nghệ, Tuyến truyện, Nhật ký) | servant-start uses `SRVTABS` |
| person card | `pcard({f,name,rank,status,ghen,lines,chips,rows,note,groups,empty,close})` → `.pc` | portrait (kit frame) left, info under it (optional `rows:[[label,value,cls]]` → `kitRows` in `.pcrows` under the chips, e.g. Chí tôn «Niên hiệu | Vĩnh An»; the name slot of the Emperor is always «Hoàng thượng», owner 21/11), actions right; one card at a time with `pager(key,items,mk)` face strip |
| labelled bar | `ghenBar(n)`, `fbar(v,lo,hi,good)`, `sbar(label,v,cls)` | always label + number beside the bar |
| chip | `chip(text,cls)` → `.chip` (`.hot` red, `.ok` green) | |
| modal / dialog / panel | `kitPanel(spec)` / `kitModal(spec)` (j79) → `.dlg.kpanel` | section 8. Legacy `Q.push({t,h,opts,who})` is converted automatically; `pframeArt(placeArt)` / random room art is never shown |
| facts | `kitFacts(facts)` (j79) | section 9: one fact per row, never a joined string |
| intel / evidence / threat | `kitIntel(list)` `kitEvidence(e)` `kitThreat(t)` (j79) | section 10 |
| odds meter | `kitOdds(word|number)`; `oddsChip(w)` now draws it (j79) | section 11: the 7-step ladder for the act's own odds only; side chances + HUD use `chanceW`/`chanceLvl` (Rất thấp…Rất cao) |
| glossary | `kitGloss(term)`, `KIT_GLOSS` (j79) | section 12 |
| mini-game frame | `kitGameFrame` `kitGameSet` `kitGameResult` `kitGameFig` `kitGameFigRefresh` (j79) | section 13, 13.4 |
| scene panel | `kitPanel({scene:true,…})`, `kitTiles(list)` (j79) | section 14 (identity card, opening story, title screen) |
| backdrop | `KIT_BD` + `kitBackdrop(el,key)` (jbd) | section 30: every full-screen backdrop, portrait AND landscape art |
| result card | `resultShow(title,before,ok)` → `#rtoast.karesult` | section 7 (j63) |
| status row | `renderHud2()` → `#hud2 .hc` | collapsible; every number labelled |

---

## 4. PORTRAIT KIT (j60)

Every person shown anywhere (cards, dialogs, lists, chips, scene tags, identity card, small avatars) is drawn by
`pcPort` (tall) or `mdH` (round). j60 wraps both, so every caller gets the kit automatically.

### 4.1 Tall portrait = `pcPort(f,col,status)` / `pframe(f)`
**Frame canvas (every frame, one single picture): 550 x 1037 px, shared by all frames.** Every frame's portrait OPENING is identical: 384 x 506 px with its top-left at (83, 214) (measured on every asset: all within ±1–2 px, the ma ma frame's carved band has see-through gaps). Above it there is room for crests (the Emperor's rising dragon is the tallest), at the sides for side dragons/halberds, and below for the frame's own hanging pendant and tassel (ngọc bội + tua rua). Nothing of a frame may leave this canvas; the whole picture will later be animated as one (the tassel is the part that moves).
**Size is set by the opening, never by the ornaments.** The `.pcp.kit` box is 480 canvas units wide and as tall as the canvas (aspect 480/1037); the stage `.kin` is scaled by `min(box width / 480, box height / 1037)` and centred, so in any one box every frame has exactly the same opening size and position; side ornaments may reach a little past the box edges, crest and tassel are inside its height. Layers, in % of the 550 x 1037 canvas (generated by `geo_apply.py` from the shared geometry):
1. `.kbg` brocade ground `img/kit/bg-<role>[-<rank>].webp` (servants: + palette tint), the opening + 2.4 px;
2. the portrait `.kpor` (`por-*`, or initials when missing): the live por framing the owner chose (whole head, face large, cut below the chest), `object-fit:cover` anchored at the top, starting 9 % of the opening lower (from 9 % of the opening below its top to its bottom) so crests never cover hair ornaments and the brocade shows as headroom. Old opaque `face-*` art (children) fills the opening with a soft oval vignette;
3. `.kfr` the frame picture, full canvas;
4. `.kgem` rank gem / servant token / unknown token at the band's bottom-right corner: at the band's bottom-right corner;
5. `.kemb` (player only) her origin (thân phận) as a small gold-and-white-jade medallion in the same style as the gem, beside it on the left: just left of the gem; tooltip and alt text = "Xuất thân: <origin name>";
6. `.klab` "Người lạ" (unknown only), above the opening's bottom edge; `.pcs` status stays on top.
The old rank grounds `.rk-*`, the gold border and the `rank-*.webp` corner icon are not drawn under the kit.

### 4.1b Pendants and tassels (part of each frame picture)
| frame | pendant (ngọc bội) | tassel |
|---|---|---|
| consort-0 Đáp ứng | small carved wooden bead | brown-grey silk |
| consort-1 Thường tại | small round green jade bead | soft green |
| consort-2 Quý nhân | silver-capped aquamarine bead | light blue |
| consort-3 Tần | rose-quartz flower | powder pink |
| consort-4 Phi | amethyst in silver filigree | lavender |
| consort-5 Quý phi | ruby and gold peony | crimson |
| consort-6 Hoàng quý phi | large white-amber jade bi with gold phoenix, pearl strings, amber drops | full orange-gold |
| consort-7 Hoàng hậu | large white jade bi disc with gold phoenix, pearl strings | long golden yellow |
| emp | the richest: large imperial yellow dragon jade bi set in gold with rubies and pearl strings, big gold knot | long double imperial yellow tassel |
| thaihau | very rich: white-and-lavender jade phoenix around a shou medallion, antique gold, amethysts, pearl strings | long double tassel, deep plum and gold |
| heir | gold-capped jade with small dragon | apricot yellow |
| prince | green jade qilin | deep blue |
| princess | pale pink jade peach blossom, pearl | soft pink |
| official | square dark-green jade seal | teal |
| physician | lacquered medicine gourd, jade bead | sage green |
| man | round white jade disc | charcoal black |
| royal | navy-and-gold python jade | navy and gold |
| guard | bronze tiger tally | dark crimson |
| cold | cracked pale grey jade | dull faded pewter grey (owner 11/15) |
| unknown | grey stone disc with mist | soft grey |
| eunuch-0..3 | jade bead → silver cap → silver + knot → gold-capped jade pendant | ERCOL `#8f9a8a` `#5f8a6a` `#3f6a8a` `#7a4a3a` |
| maid-0..4 / mama-0..4 | plain jade bead → jade flower → silver flower → silver plum blossom → gold plum blossom with pearl | MRCOL `#9aa3a8` `#5fa39a` `#4f74a8` `#a0584a` `#6a5a8e` |
Men's pendants and tassels are never pink or purple. Small frames (`mdH`) show the whole pendant + tassel too (§28.0, owner 15/11 06:35Z, review/tassel-fix).

### 4.1c FRAME COLUMN: label centred, rows OVER the pendant + tassel (owner 21/11 ~18:55Z, review/kit-pframe-overlay) — `KIT_PFO` (jk2b §20b)
- Every portrait-frame column (`.pc > .pcl`: Chí tôn, Phi tần / Nam nhân / Cung nhân tabs, every person dialog, all roles): (1) the label block ABOVE the frame (`.pcname`: title plate / rank / name) is centred on the frame's opening axis — the frame box is centred on the column (`align-self:center`, no auto side margins), so a frame a few px wider than the column overflows equally on both sides; (2) the rows UNDER the frame (`.pcrows` niên hiệu, `.kpkey` Biết tên / X → ta / Sủng, `.kpgrid`, `.kpfacts`, `.kwear`) start ONE gap (`KIT_PFO.gap` = 10 px) under the frame's carved BAND bottom = the frame's real bottom edge, lying OVER the pendant + tassel (no empty band); they sit above the frame (z 2) in the NORMAL kit text — no halo, glow, outline or shadow (owner 21/11 ~19:25Z). The column is that much shorter.
- `KIT_PFO.band[frame]` = bottom of the frame's carved BAR in canvas units (550x1037): the last row (y 720..900) where ≥ 50 % of the bar sample columns (x 25–44 % and 56–75 % of the canvas: corner ornaments and the pendant column excluded) are opaque; derived from the LIVE frames' alpha by `python3 dev/tools/pframe-band.py` (re-run after any frame re-cut, paste its table): 749 (consort-0/1/4, physician) … 770 (man). `KIT_PFO.fit(pc)` sets the frame box's `margin-bottom` so the first visible row lands EXACTLY at band + gap (one correction pass for the column's row-gap / empty rows); runs in the `kitPcFix` hook, on every frame resize (ResizeObserver) and inside `kitPcKeyFit` (which now counts the overlap when it sizes the figure).
- The frame stays ONE whole picture: border + pendant + tassel are never split into layers (owner 21/11 ~19:30Z); a later animation moves the whole frame, border to tassel (PARKING_LOT #12, not built); the rows simply lie on top of it. Narrow cards (`.kpnar`, phone portrait — not a supported screen) keep the name as a full row above portrait + bars; their rows also start at band + gap.
- Test `node dev/test/kit-pframe-overlay.js <url> <out> 755x1000,1180x820` (label centre − frame axis ≤ 3 px; first row top − the bar bottom MEASURED FROM THE FRAME PICTURE'S OWN ALPHA in the browser, same method as the script: 8…14 px, every scene); `dev/test/kit-leftcol-read.js` still gates readability (≥ 11.5 px).

### 4.2 Small avatar = `mdH(face,"xs|sm|big")` → `.md.kit.kmini` (kit 2: NO round avatars anywhere)
The SAME role/rank frame as the tall portrait, cropped to its body (canvas x 37–513, y 140–770, ratio 476:630): `.kmb` brocade at the opening,
the portrait, `.kmf` frame on top (`--kfr`). Widths: xs 22 px, sm 32 px, default 52 px, big 72–84 px; height follows the ratio. Every caller
(header, Hoàng thượng box, fact rows, pager, act-card titles, summaries) gets it through `mdH`; nobody draws a circle.

### 4.3 Roles, frames, grounds, badges
| role (`personRoleRank(p).role`) | who | frame | ground | badge |
|---|---|---|---|---|
| `player` | her (consort road), by rank 0–7 | the SAME `frame-consort-N` as any consort of her rank (on the stage she is marked by her rank-colour halo) | `bg-consort-N` | `gem-N` + origin medallion `origin-<k>` beside it (tt dtq muoi cn nc td ch thd) |
| `consort` | the 12+ phi tần, by rank (Hoàng hậu = 7) | `frame-consort-N` | `bg-consort-N` | `gem-N` |
| `cold` | anyone in lãnh cung (her too) | `frame-cold` | `bg-cold` | – |
| `emp` | Hoàng thượng | `frame-emp`: the MOST splendid frame of the game (rising five-clawed dragon crest with flaming pearl, dragons climbing both sides, imperial yellow enamel, rubies, pearls); Hoàng hậu's is second | `bg-emp` | – |
| `thaihau` | Thái hậu | `frame-thaihau`: second only to the Emperor, above the Hoàng hậu (grand phoenix over a gold-and-jade shou roundel, pine and clouds, deep plum enamel with gold shou medallions, amethysts and pearl strings) | `bg-thaihau` | – |
| `heir` | Thái tử (`k.heir`) | `frame-heir` (grander than Hoàng tử: young gold dragon crest with flaming pearl, small dragons at the upper corners, apricot-yellow enamel, pearls) | `bg-heir` | – |
| `prince` / `princess` | Hoàng tử / Công chúa | `frame-prince` (qilin) / `frame-princess` (peach blossom) | `bg-prince` / `bg-princess` | – |
| `maid` | cung nữ (and her, servant start), rank 0–4 | `frame-maid-N` (same frame, rank tassel) | `bg-maid` + MRCOL tint | `tok-mN` |
| `mama` | maid aged 36+ or `old` | `frame-mama-N` | `bg-mama` + MRCOL tint | `tok-mN` |
| `eunuch` | thái giám, rank 0–3 (court eunuchs: tq = 3, others 2) | `frame-eunuch-0..2`, rank 3 `frame-eunuch-3` (gold head-eunuch frame) | `bg-eunuch` / `bg-eunuch-3` + ERCOL tint | `tok-eN` |
| `official` | quyền thần / quan (j55 clans) | `frame-official` (crane) | `bg-official` | – |
| `physician` | thái y | `frame-physician` (bamboo, gourd) | `bg-physician` | – |
| `man` | nhạc sư, họa sư, sứ thần, công tử | `frame-man` (walnut + charcoal enamel, jade disc) | `bg-man` charcoal ink, silver clouds | – |
| `royal` | vương gia | `frame-royal` (python, navy + gold) | `bg-royal` navy, gold python | – |
| `guard` | thị vệ | `frame-guard` (steel + bronze, halberds, tiger) | `bg-guard` bronze-brown, armour scales, tiger roundels | – |
| `unknown` | anyone `kitKnown(p)===false` | `frame-unknown` (grey stone) | `bg-unknown` + silhouette `unknown-f/m/k` | `tok-unknown` |
| `other` | face with no known person | `frame-man` | `bg-default` | – |

Stage strangers: full-body grey silhouettes `img/kit/unknown-fig-f|m|k.webp` (900 px tall, transparent, child padded to adult height).

### 4.4 API (j60)
- `personRoleRank(p)` → `{role, rank, origin, sex, kid}` for any person object (S, consorts, kids, S.emp, S.thO, S.maid, servants, S.court members, S.men, clan officials, công tử, place records `{kind,ref}`).
- `kitDecor(faceOrPerson)` → frame/bg/badge/emblem URLs, colours, `known`, `label`.
- `kitFace(p)` → face object through the game's own constructors; `kitPortrait(p,{size:"lg"|"big"|"sm"|"xs"})` → HTML (lg = tall frame).
- ONE `kitPortrait` only (j60). The page-curl orientation check is `kitIsPortrait()` (jbook.js, boolean); never reuse the name `kitPortrait` for anything else (it once shadowed this one and broke the podium fallback, j90).
- `kitKnown(p)` → boolean, default `true`. Hook for the "who is known" worker: override with `window.kitKnown = p => …`. When false: silhouette + "Người lạ" in tall frames, round avatars, `pframe` label, `pcard` name, scene tags and stage figure.
  j61 (người lạ) stages: `kitKnown(p)` = face seen (stage ≥1), `kitKnownName(p)` = name known (stage ≥2, or a public figure: Hoàng thượng,
  Thái hậu, the reigning Hoàng hậu). Named but face not seen yet: grey silhouette in the stone frame, but the NAME stays everywhere
  (`pcard` name + rank line, face strip, stage tag, `kitName`, podium) and the frame label (`.klab`, round-avatar title) is the title
  (tước), never "Người lạ". Only stage 0 reads "Người lạ" (card, strip, frame label, stage tag, podium) or "<tước> ???" (`kitName` in
  lists, logs, the rank board). Stage 1 (face seen, no name): real portrait, name "???".
- `KIT_RANK_COL[r]` / `kitRankCol(r)`: rank colour (live RCOL; `'cold'` = `#cfd3d8`). `kitServCol(role,r)`: servant palette.
- Face constructors are wrapped to carry `__kp` (person) and `__kr` (role/rank): `pv pMe pEmp pTH pMaid pDoc pServ0 pServ kidFace0 kidFace pEunCourt pMan pMin h54Face pMsg`. A new constructor must return the person via the same wrapper (add one line in j60), never its own frame.

### 4.5 Art rules for kit assets
- Magnific `gpt-2-6` only, at most 1 style reference (face-consort-01), folder ba4aecfe-efce-47e2-b53f-30d292091886; painterly semi-realistic guofeng, soft light.
- Frames: rectangular 3:4, transparent centre, ornaments close to the band; cut out with Magnific background removal into a transparent PNG/WebP (clean, crisp edges), NOT chroma keyed by code (owner 21/11 ~18:55Z; all 34 re-cut by Foreman C, LIVE on the CDN 21/11 ~19:55Z, reports/frame-recut.md); each frame is ONE whole picture — border, crest, pendant and tassel are never split into layers (owner 21/11 ~19:30Z); normalised to the shared 550x1037 canvas (crest headroom, fixed opening, own pendant + tassel inside); < 150 KB each.
- Brocade: tone-on-tone, low contrast, soft centre glow, 360x480 webp.
- Men's frames/grounds: never pink or purple; man / royal / guard must stay distinguishable at a glance (charcoal / navy-gold / bronze).
- Never reuse a frame of another role; a new role gets its own frame + ground pair added to this table first.

---

## 5. Layout rules (all screens)
- No horizontal page scroll at any of the four sizes; no truncated text; act cards one size; the scene is not covered (slim ribbon, collapsible status); map full screen.
- Every name has its face (portrait kit); every bar labelled; disabled buttons say why.

---

## 6. ACT CARD (j63) — one frame for every act, option and priced button
- PARALLEL TIME (jptime, OD 18/11 ~20:35Z): a button that SENDS another person shows its order khắc and "chờ N khắc" together in the ONE Tốn row (`KA_TIME` accepts `chờ N khắc`; talk options: `optLine` puts it after the order khắc). N = the khắc the person is away (BAL.ptime).

Applies to: act cards (Hành động, servant road), person-card act groups (`.pcb`: consort, child, servant, court houses…),
dialog options (`.opt` / `.opts`), priced buttons (`pbtn`, `.btn`, `.rbtn`: court, festival, shop…). Built ONLY through
`kitParse()` (string → rows) and the frame `kaNorm()` (j63), which rebuilds every such button into the markup below
(a MutationObserver runs it after any render; `kitFix()` also calls it). Nobody writes this markup by hand.

```
button.ka [.kdis when disabled]
  span.kat                      title row
    span.kan                    action name (+ inline round avatar .md.xs, never on its own line, never over the title)
    span.kodds                  odds chip .oc (ladder colour) on the right; "Quẻ: dễ/khó hơn…" under it (green/red)
  span.klead                    act description (act cards only), dim, wraps, never clamped
  small.kb                      grid: label column (fixed 3.4rem; 3.3rem under 600px) | values
    span.kr.kr-why  > .krl "Cần"     .krv > .kwhy ✗ unmet (red) … .kwhy.kok ✓ met (green)   (first row)
    span.kr.kr-ton  > .krl "Tốn"     .krv > .ef.t time "2 khắc" (dark ink) · .ef.r resources (red)
    span.kr.kr-duoc > .krl "Được"    .krv > .ef.g (green)
    span.kr.kr-mat  > .krl "Mất"     .krv > .ef.r (red; outcome if it fails; old "hỏng" maps here)
    span.kr.kr-kem  > .krl "Kèm"     .krv > .ef.r (red; side risks: jealousy, exposure, Đức warning, "có thể bị phát giác")
    span.kr.kr-note > .krl "Ghi chú" .krv > .ef.n (dim, small; "(mỗi mùa dạy một lần)", "(chỉ buổi tối)", conditions)
  values in one row are separated by .ksep "·"
```

Rules
- Rows always in this order; an empty row is left out. Labels are Vietnamese title case `Cần / Tốn / Được / Mất / Kèm / Ghi chú`,
  shown small-caps in `#8a7350`. The old inline `TỐN / THÀNH / BẠI / KÈM` labels are gone.
- A value goes to its row by meaning (`kaRows`): a gain is always green and in Được; a cost/loss is always red (Tốn, Mất, Kèm).
  Sentiment uses `kcls` (j19 + j25): `+N` is a gain unless it is hostile (`ghen +`, `oán ngươi +`); harm to a rival ("nàng … -N") is a gain.
  Exceptions: a failure that still gives something ("đêm nhạt, Sủng +3") stays in Mất but its `+N` is green; "không mất gì" is neutral.
  Time (`N khắc`, `1-2 khắc`) is in Tốn in dark ink, never red. "không" disappears when a row has a real value.
  Sign wins: a value whose only number is negative (`lòng -5`, `kẻ hầu khác dễ lơ là (lòng -1)`) is a loss → red, never in Được
  (except harm to a rival, "nàng … -N", and less hostility, "oán -N"). Losses that come with a SURE act or option go to Tốn when they
  are her resources (Bạc, Sức, Sủng, Danh, Đức…) and to Mất otherwise (e.g. option "Phạt vì làm vỡ chén ngọc" → Được: kẻ hầu khác giữ
  kỷ cương (lòng +1) · Mất: lòng -5); a ROLLED act's side loss on success goes to Kèm (Mất is kept for the failure outcome).
  Trailing "(…)" notes split off into Ghi chú.
- Odds: ladder word only (Liều/Khó/Năm ăn năm thua/Khá chắc/Chắc/Rất chắc/Nắm chắc), never %; sure acts show no chip.
- Cần row: every condition with its live status, unmet first (✗ red, saying what is missing), then met (✓ green):
  khắc `2 khắc (còn N)` (used+c ≤ 4), `Sức ≥20 (có N)` for acts over 1 khắc (`can`), `Bạc N (có M)`, buổi `Buổi tối (đang buổi sáng)`,
  "chưa làm trong buổi này", lãnh cung / còn sống / cấm túc (CRIME), and the act's own requirement from `ok()` + `ACT[k].x` / `LACK[k]`
  with evidence counts `(có N)` from `evG`. Producers: `cardH` and `rvGroups` wrappers put the list on the button as `data-kneed`;
  any other disabled button turns its reason (`.kwhy`/`guessWhy`) into a ✗ item. A requirement that `ok()` checks but no text names
  shows "điều kiện riêng của việc này chưa có" (to be named by the act owner).
- Disabled (`.kdis`): grey ground `#eee7da`, grey title, chip greyed; the Cần row (from `.kwhy` / `cardWhy` / `guessWhy` / `data-kneed`) replaces
  the rows that cannot apply (Mất and Kèm hidden; Tốn and Được stay so she sees what it would give). Never opacity below 1 on the text.
- Frame: `#fffaf0`, `1px var(--line)`, radius 8, title row with a `#e6d3ac` hairline under it; hover border `--gold`.
- Size: cards sit in CSS grids with `grid-auto-rows:1fr` → every card in a grid has the same height (the tallest one's), the
  same width; text wraps inside its row; nothing is clamped or cut (no `…`, no line-clamp, no ⓘ needed); the panel scrolls.
  Columns — act cards `.cards`: 3 at ≥1200px, 2 at 600–1199px, 1 under 600px. `.pcb` / `.rbtn`: auto-fill min 230/260px, 1 under 600px.
  Dialog `.opts`: auto-fill min 250px (1 column in the dialog), 1 under 600px.
- CSS is scoped to `button.ka`, `.kb`, `.kr*`, and to `.cards/.pcb/.opts/.rbtn:has(> button.ka)`; other kit parts are untouched.
- A gain that rounds to 0 is never shown as a gain: "Sắc +0" becomes "Sắc không đổi" in Ghi chú.
- Not converted on purpose: the tiny map hotspot chips (`.mspot .acb`, j41) stay chips so the map is not covered; their odds use `oddsChip`.
- Text integrity (owner 15/11 "act card text broken", review/act-text): values are split at TOP LEVEL only — `kSplitTop(str, /sep/y)` (j19)
  never splits inside ( ) « » [ ] “ ” or a tag; `effList`, `kaModelStr`, `kaModel` all use it, so "(chơi 5 phần ra Khá, 9 phần ra Tinh xảo)"
  stays one item. Sentiment words (`KRED/KHOST/KGOOD`, j19) match whole words only (`kWB`): "nguyệt", "thùa", "giữa", "truyện" are not
  "nguy", "thù", "giữ", "truy". Ranges are words, never code: `kRangeW` (net in `kaRows`) makes "tiến bộ Thi +1..2" → "tiến bộ Thi một hai
  phần", "Sủng +3..8" → "Sủng +3 đến +8"; producers write them that way (`kStepW(a,b)`). A colour follows the meaning, never the row:
  a gain never sits in Kèm. Check: `dev/test/act-text-scan.js` (brk, dots, pct, frag, word1, sp2, glue, sign, twice, long).

---

## 7. RESULT CARD (j63) — after every act and choice

`resultShow(title, before, ok)` (called by `wrapR`, options, servant/child/court acts) → `#rtoast.rtoast.karesult`:

```
[seal THÀNH (green) | BẠI (red)]  act name                  title row, hairline under it
One short sentence of what happened, from the log of this act, rival names with their rank title ("Hoàng hậu Liễu Họa Mi").
Được  Sủng 8→17 (+9) · Ân tình 0→5 (+5) · Thái hậu: quý ngươi hơn (0→8, +8)                 green
Mất   Đức 30→26 (−4) · Hoàng hậu Liễu Họa Mi: ghét ngươi hơn (thiện cảm −15), ghen +25, oán +20   red, person name in ink
                                                     Xem đầy đủ ở Nhật ký   (link: opens the Nhật ký tab)
```
- SEAL (owner 11/15, replaces the old "outcome for her" guess): THÀNH / BẠI come ONLY from the act's own roll (`resultShow(title,
  before, true|false)`); an act without a roll ("sure", null) gets NO stamp: the neutral grey seal "KẾT QUẢ" (`.sure`). KIT PART
  `kitResultSeal(ok)` (renamed by reviewer r7: `kitSeal` is the Trân nữ seal, §39) → {cls: ok | bad | sure, t: THÀNH | BẠI | KẾT QUẢ} (j63; kit sample page). Never
  inferred from log words or from how many lines are Được / Mất (a good night stamped "BẤT LỢI · BẠI" because the option was named
  "Xin tha cho cung nữ bị phạt" and 12 consorts got jealous).
- KÈM (owner 11/15): other people's feelings — the consorts' ghen / oán — are not her gains or losses: one collapsed line
  "Kèm: 12 phi tần ghen thêm 8" — KIT PART `kitKemRow(K)` (j63, `.kb .kkem`, ranges as "3–8"; kit sample page), a tap opens the
  names (`.kkem.on`); a person she has not met is "người chưa quen".
  Their liking FOR HER (quý ngươi hơn / ghét ngươi hơn) and evidence stay in Được / Mất.
- Values are the REAL changes (snapshot before → now), never the option preview: no ranges, no "có thể", no repeated price line.
- One group per person; the two-way relation is ONE plain phrase (her feeling toward you; yours only if hers did not move);
  "Hoàng hậu với ngươi" merges into the queen's group. Lines with "→" lists, "thành:/kèm:" previews are never used as the sentence;
  a sentence that only repeats the act name is dropped.
- EVERY line says SHORTLY WHY (owner 18/11 09:03Z): `value · reason` on ONE row, label column left, value next to its label (left-aligned, never a centred floating column), the reason dim after the value: `Sức 56→74 (+18) · nghỉ qua đêm`, `Sủng 26→25 (−1) · lâu không được gặp Hoàng thượng`, `1 vị chưa quen biết: ghét ta hơn · ghé chơi cung ngươi`, KÈM `8 phi tần bớt ghen 1 · lòng ghen nguôi dần theo ngày`. Part `kitWhy` (j63: kaWhyCl / kaWhyStat / kaWhyWho / kaWhyKem / kaWhyHtml `.kwy`): the reason is read from the SAME Sổ ghi lines of the span (clause "lead: … Sức +10" → lead; a person matched by name; strangers stay unnamed), else the act's own title, else a short fixed cause per stat (KA_WHYD); max 44 chars, no colon, no %. Every result card (between-buổi "Trong cung vừa qua", act, event, night, co-op) goes through kaResultRows, so one part changes all. Kit sample page §7.
- Rows are arrays: one fact per line (`.kitem`), never joined sentences; also exposed as `window.kaLastResult {title, ok, sentence, rows:[{k,label,items[]}]}`.
- Same `.kb` row grid and colours as the act card; no change at all → Ghi chú "không đổi chỉ số". Stays 9 s; tap closes.



---

## 8. PANEL KIT (j79) — ONE frame for every modal, panel and pop-up

Applies to EVERY `#modal` item (rules/help ⓘ, HUD help, "Tin trong cung", "Tai mắt báo tin", dilemmas/event choices, rewards,
Bổng lộc / Ân thưởng / Quẻ, Tranh ghế rounds, results, night, pregnancy, death/ending, Lãnh cung, Nội vụ phủ, Tuyển tú…),
the week summary (dawn) and the lesson overlay (`#ov .mg`). The person card modal (`.modal.pcm`) keeps `pcard` (section 3).

```
.dlg.kpanel[data-kind]
  .kph            sticky header: brocade band (img/kit/bg-default) + seal + title (+ sub line: date/when)
    b.kpseal.kp-<kind>   LUẬT rule · ĐIỀU info · TIN news · BÁO notice · VIỆC choice · KẾT QUẢ result · ĐÊM night · KIẾP end
                         MẬT BÁO intel · CẢNH GIÁC threat · CHỨNG CỨ evidence · BAN THƯỞNG reward · TUẦN week · TÀI NGHỆ game
    .kptitle / small.kpsub
  #mb > .kpb[.kphas]
    .kpsubj       the panel's SUBJECT slot: a person = the FULL-BODY figure column (.kpsubj.kes, §32.2 / §50 — owner 16/11 07:35Z, OD:L448: the small 3:4 portrait is NOT allowed for a person pop-up); an item / event / info picture = .kpiart / .kpev / .kpitem. Never a room/place picture beside a person.
    .kpmain       blocks: .kpsec (h4.kpst label + content) · .kfacts · .kb rows · .ktiers · .kchips · .kpnote
  .opts.kpopts    options = ACT CARD frame (section 6)
  #mr > .kbtn     the ONE button (lacquer red, gold ring); `.kbtn.alt` = quiet secondary
```

API (data only, never markup):
```js
kitModal({kind:"news", title:"Tin trong cung", sub:when(),
  facts:[{who:v, text:"được lật thẻ bài đêm qua", chips:[["Sủng",3]]}, "Tháng này: Được mùa khắp nơi. Kho lúa +12."],
  sections:[{h:"Thang 4 mức", tiers:[{k:"30–59", n:"hại nhỏ", d:"Tung tin đồn, Dò la", c:"r"}]},
            {h:"Cách tính", rows:[["Nguy hiểm","Ghen, Oán hoặc ghét: lấy số cao nhất","t"]]}],
  opts:[{n:"…", fx:{…}, x:"Khá chắc · thành: … · hỏng: …"}],   // same option objects as Q items
  subject:person, btn:"Đã rõ", onClose:fn})                     // kitPanel(spec) queues without showing
```
Rules
- Header always: seal + title; the date/when goes to the sub line, never into the body.
- Picture only if it depicts the subject (the person speaking/affected via `subject`/`who`, or a specific item). `evArt()` room art,
  `--dart` backdrops and `pframeArt` are not drawn in panels.
- Body is structured: facts, rows, tiers, chips. No paragraph with several facts (section 9). Legacy `h` HTML is converted:
  first short `p.past` → sub line; prose → one fact per sentence; `p.past` with " · " lists → neutral chips; tables/rows keep the kit look.
- Deltas inside text become chips: green = gain for her, red = loss (sentiment via `kcls`: ghen +, oán + are red).
- One button style (`.kbtn`). Width 560 px (620 ≥1200 px), full width under 600 px; scrolls inside, header stays.
- Night (`.modal.night`) and end (`.modal.end`) keep their mood colours, same structure.
- **TAGS ON THE PICTURE (KIT 8.10, owner 21/11 mark #66 FINAL; jk2b.js `kitSceneArt` o.tags / `kitArtTags`, test dev/test/quest-chips-scan.js):** a dialog whose queue item has `qtags:[type, deadline]` (quest offer: «Giao thiệp» / «Hạn 4 tuần») shows exactly those TWO words as `.ksart-tag` on the TOP-LEFT of its event picture; no picture → kit rows «Loại | Hạn» above the text. All other quest info = kit label|value rows («Bước 1 | …»). Never a chip cloud in a quest / request / phụ tuyến dialog (phụ tuyến news lines `p.past.nochip` stay plain notes). KIT KEEPER to check: new option of the existing scene-art part, not a new part.
- **WARNING / REPORT ORDER (owner 21/11 mark #85; j70.js `thrLine70`, test dev/test/dialog-dup-scan.js):** a warning or report dialog (Lời cảnh báo, Tai mắt báo tin) reads (1) the messenger's words, (2) ONE plain fact line (who + what + when: «Tần Liễu Lạc Anh có thể hại ta mức nặng (vì ghen với ta, Ghen 52) · chưa rõ lúc nào») — no boxed `kitThreat` card inside the dialog, (3) the evidence line, then the options. The same fact is never printed twice, also when worded two ways: a messenger who already told what was seen (warn) leaves the fact line with who + plan + stage only, and a place named in the sighting is not added again «(ở …)» (rv fix 21/11; the maid's «thành: biết X có ý hại ngươi» row is dropped when the plain line says it).
- **ONE DIALOG STACK (KIT 8.9, owner 21/11 mark #46; jk4.js `kitDialogStack`, test dev/test/dialog-stack-scan.js):** a newer dialog is always the TOP layer (`#modal` z 42, above the room person card `#popw` z 41 and every second-layer pop-up); a WINNING dialog (death / era end «Kiếp này», night, life card, any dialog while S.dead) first closes every other second-layer pop-up (person card `popIdx`, kitCloseLayer layers incl. game result `#ov`, word pop-up `#kpop`, podium `#kpodov`, open kit book). Never two dialogs overlapping; no opener patches it, it runs in showModal for all of them.
- Kit page sample (#kit, §8): `kitPopSample(k)` opens the REAL pop-up via kitModal for k = info (ĐIỀU, Thái hậu) · rule (LUẬT, small 3:4 picture slot) · event (VIỆC, Hoàng hậu: kitEventStage figure + scene band + act-card options) · result (KẾT QUẢ) · news (TIN, no person, picture in its type frame); the kit page hides while it is open and returns on close. Test: dev/test/kit-popup-sample.js.

### 8.1 ONE FRAME SIZE per viewport (owner 15/11 session 8: "kích thước khung khác nhau mà"; review/panel-size) — `j79` tokens `--kpw` / `--kph`
Every `#modal .dlg.kpanel` (info, rule, news, notice, result, reward, night, end, intel, evidence, mood, item slot, place, calendar, choice,
every PEND event dialog with or without a stage figure, identity card) and the week panel `.dawn .dbox.kpanel` has the SAME width and the SAME height
at a given viewport; only the seal word and the content differ. Nothing sizes the frame by its content any more.
- Width `--kpw` = `min(560px, 100vw - 28px)` (`620px` from 1200 px wide). Height `--kph` = `min(100dvh - 32px, max(420px, 70dvh), 720px)`.
  Design sizes: 755x1000 → 560 x 700; 1180x820 → 560 x 574 (the game only ever sees these two, KIT §0; direct-mode sizes: 1000x755 560 x 529, 1366x1024 620 x 717, 844x390 560 x 358).
- Structure (flex column): `.kph` fixed on top, `#mb` = the text / option area, takes the rest and scrolls inside (rule L191: in event dialogs only
  the option list scrolls, `kdscroll`), `#mr` button row fixed at the bottom. A short panel leaves quiet paper; a long one scrolls.
- **kdscroll intro never shrinks (kit-kpb, 18/11).** In a `.dlg.kdscroll` the body `#mb` is a flex column: `.kpb` (intro / facts / item card) is `flex:0 0 auto` (jk4: `.modal .dlg.kdscroll>#mb>.kpb`), so it keeps its FULL height and never lies under `.opts`; only `.opts` takes the remaining height (`flex:1 1 auto`, min 96 px) and scrolls. A very long intro is capped by `kitDlgText` (`.kdtx`) and scrolls inside itself. Never set `flex-shrink`/`min-height:0` on `.kpb` in a picker (old rule `flex:0 1 auto;min-height:0` made pgpick 163 px of intro render as 23 px). Scan: `node dev/test/kpb-scan.js <url> <out.json> [WxH@dpr,...]` opens every PEND dialog with an option list + generic subject/facts/text pickers (2/4/8/24 options): FAIL when `.kpb` is shorter than its content or any intro text lies over `.opts`; `BEFORE=1` re-applies the old rule. Kit sample page §8: button "CHỌN NHIỀU" (`kitPopSample('pickmany')`).
- Event dialogs with a stage figure (`kdper`): the figure column (`--kdpw`) is cut to fit INSIDE the frame (kitDpFit reads the frame width); the frame never grows with the people.
- Nobody may set `width` / `max-width` / `height` on `.dlg.kpanel` or its variants (`kesdlg`, `kdper`, `kslot`, `kmc-modal`, `kpsc`); change the tokens.
  Exempt: the person card (`.modal.pcm`, `pcard` §3), the picture zoom lightbox, mini-game frame `#ov .mg` (§13), the week flip-book (§27).
- Scan: `node dev/test/panel-size.js <url> <out.json> [WxH@dpr,...]` opens 51 panel cases (every kind + every PEND dialog) and reports width / height per viewport; FAIL when they differ.

- **COMPACT SIZE (owner 16/11, iPad title menu in a near-full-screen frame; review/kpanel-compact, `dev/build/jkpc.js`) — §8.1 amendment.** The one big size is for INFORMATION panels only. A panel with little content gets ONE compact size: the same width (`--kpw`), height fitted to its content up to `--kph`, centred (`.dlg.kpanel.kpcompact`, `.modal.kpcompactm`). One rule, decided by content, never per place: `kitPanelCompact(dlg)` runs after every `showModal` and on every change of `#mb` (j74 mounts the title sub-screens after showModal) and says compact when `#mb` holds no section / row table / `.kmlist` / table / subject / person / faces / picture (`.kpsubj .kpiart .kdlgart .kaart .ksart img figure`) / stage figure / identity / info art, AND is either the title menu (`.kpmenu`) or a title sub-screen (`.kpt-mount`: Chọn sổ, Thiết lập, Sổ luân hồi), or has at most 3 facts and at most 220 characters outside its option list (menus, confirms, short notices, pickers with a few options; options may scroll inside the max). Nobody adds `kpcompact` or a height by hand; no per-place override.
- **MENU PANEL (owner 21/11 mark #37; review/menu-panel, `jkpc.js` + `j79.js` kpBuild + `jksize.js`).** Every panel of the ☰ / title menu (`.modal.kptitle`: home, Chọn sổ Một mình + Cùng hảo hữu, Sổ luân hồi, Thiết lập, Bảng vàng's popups) is ONE frame: the §8.1 width `--kpw` (locked with `!important` on `.modal.kptitle.kpscene`, bottom, centred), height = content up to `--kph`. Never narrow, never one word per line. Root cause of the old bug: the identity card (`kpIdLay`) set `--kpw` inline on `#modal`, and the next panel (☰ in game) inherited 307 px; `kpBuild` now clears `--kpw` / `kpside` for every non-identity panel, and `kitFrameLive3` never turns the menu into an event frame (`kszlive`).
  The title menu (`.modal.kpthome`) sits small at the bottom centre so the painting stays visible (portrait and landscape).
  **Layout is deterministic:** a menu panel never receives a picture slot from load timing. The §59 event placeholder (jph `kitEvArt`) skips panels whose `cls` has `kptitle` or whose spec has `kit.scene` / `kit.menu`; before this, the title menu got a placeholder room picture on the left (buttons squeezed to the right) only when EVART had finished loading, and none otherwise (owner shots 10:36 vs 10:39). Rule for new code: a layout choice reads structure, never "is the data loaded yet".
  Entering the game (title Tiếp tục, any reload, co-op rejoin) always opens Hành sự (her room), never the last tab (`d.tab="act"` in the slot load, j6, and the rejoin deser, jcoopworld).
  Scan: `node dev/test/panel-size.js <url> <out.json>` now also prints per case compact / frame height / content height / empty%, and FAILs when big frames differ, widths differ, or a compact frame is taller than the big one.
- **Short notice (kit keeper decision; superseded by the compact size above, its centring stays for the big frame):** a panel body with only facts (≤ 3), ≤ 220 characters in all, no `sections` / `rows` / `opts` / `subject` gets `.kpb.kpshort` from `kpBuild` and is centred in the frame (`#mb` flex column, `margin:auto 0`, text-align centre); the frame size is unchanged; long panels, person panels and event dialogs are untouched.
### 8.2 FRAME TEMPLATES — the ONLY dialog compositions (owner 16/11 "Má nó, kit chung đâu", review/kit-sweep) — scan `dev/test/kit-conform.js`
Every pop-up is ONE of these templates, built by the kit (kitModal / kitPanel / Q item → kpBuild); nobody composes columns, cards, boxes or
picture rows by hand inside a dialog. Pick by the rule; never add a per-place / per-dialog layout.
| Template | Structure | When to use |
|---|---|---|
| T1 PANEL (§8) | `.dlg.kpanel` > `.kph` (seal + title + sub, kit ✕) + `#mb` > `.kpb` > `.kpmain` (facts / kitRows / tiers / chips / notes) + `.opts.kpopts` + `#mr` | any notice, rule, result, news WITHOUT a picture or person |
| T2 EVENT FRAME (§8.2, = 6.2 / 32.2a "picture left, info right") | T1 + ONE picture LEFT `.kpsubj.kpiart(.kpev)` (kitSceneArt tall) + kit rows RIGHT; options BELOW as kit option rows (32.9) that scroll inside the frame | any dialog with a picture and NO person: events, place cards (32.8), chapter detail (72.3), item card (70.4), headArt notices. ONE picture only (`kitOnePic`, jk4: a headArt band is moved into the left slot) |
| T3 PERSON EVENT (32.7 / 50 `kitEventDp`) | T1 + the person's figure column LEFT (`.kpsubj.kes`, 32.2a cap/crop) + ONE banner in the right column + text + options | an EVENT (VIỆC / BÁO / ĐÊM / KẾT QUẢ…) where a person acts or speaks. Never for an ĐIỀU / LUẬT info panel |
| T4 — RETIRED (owner 16/11 07:35Z, OD:L448) | a 3:4 portrait `.kpsubj > pframe` for a person | a pop-up ABOUT a person (ĐIỀU / LUẬT / NGƯỜI info, Chứng cứ về X) is now T3: figure column LEFT, picture right top, info, buttons. `dev/test/kit-conform.js` FAILS the small-portrait form |
| T6 PERSON DIALOG OUTSIDE #modal (§50.2 `kitPersonDlg`, `dev/build/jpdlg.js`) | `.dlg.kpanel.kpdlg` = header + figure column LEFT + banner right top + text + buttons | the tutorial coach (LỜI DẶN), contextual tips, co-op / other overlays that are not #modal. ONE frame size for all of them: --kpw x --kph (tutorial pages, spotlight steps, tips) |
| T5 IDENTITY (28.11) | `.kpb.kpid` | the Nhập cung identity card only |
| OPTION ROW (6 / 6.2 / 32.9) | `button.ka` act card: picture left + Cần / Tốn / Được / Mất / Kèm rows | every choice inside any template; short ones 2 per row, long ones full rows |
| PERSON CARD (`pcard` §3 / 28.17 / 31.9) | `.modal.pcm` | the person card only (exempt from T1–T5) |
| SLOT / ITEM CARD (28.13f `kitSlotDress`) | T2 inside the panel | an equipment slot / item detail |
| NOTICE (42.2 `kitNotice`) | top-bar «!» box + one top chip line + «Tin báo» panel | every game notice; never a toast / pill / strip anywhere else, never at the bottom |
| STAGE RAIL (§77 `kitStageRail`) | square icons, left edge of the stage | every shortcut button on the stage (Lịch, Chat, Mục tiêu) and every status icon (§77.1 `kitStatusIcon`: download, …); nothing else floats on the stage or over the tabs |
Second-layer panels that must open OVER a #modal (item card `#kidfl`, co-op friend panel `#kctmp`, load panel) use the same `.dlg.kpanel`
markup (kpHeader + kit ✕ + T1/T2 body) in their own layer. Scan: `node dev/test/kit-conform.js <url> <out.json> [WxH,...] [maxPend]` opens every
panel kind + place cards + chapter detail + item card + every PEND dialog, classifies each CONFORMS / MIXED / CUSTOM by template, flags any loose
float over the tab bar and retired floats in the code; exit 1 on any MIXED / CUSTOM / float. Reviewers run it on every UI branch.
PERSON OPTION rule (coordinator 16/11): an option row that names a person shows THAT person's portrait in its picture slot (pcPort / kit face,
stranger = grey kit silhouette), never a generic act / event picture — the scan flags "generic picture on a person option" (fix owner: review/pcard-actrow).
The scan also opens the less-visited dialogs: outer court (menNtCard), Tranh ghế (contestOpen), lãnh cung, co-op lobby, and a servant life's PEND dialogs.

## 9. FACTS, ROWS, CHIPS, PEOPLE (j79)
- `kitFacts(facts,{group})`: `facts` = array of strings (split into sentences) or objects `{who, text, chips:[[label,n]], why, when, kind:"me"|"person"|"world"}`.
  Row = small face (or a gold dot for court/world facts) + the fact, the first mention of each person drawn as **rank title + name in rank colour**
  (`kitName`; the title is never doubled). With 4+ facts of 2+ kinds rows are grouped: **Ngươi / Người trong cung / Triều đình · thiên hạ**
  ("Tháng này: …" lines go to the last group, prefix dropped). Never pass a joined string of several facts from new code.
- `kitName(p)` · `kitTitle(p)` · `kitPersonLine(p,{sub,chips})` · `kitFaceH(p,size)`.
- `kitChip(label, n)` delta chip (sign + colour by meaning) · `kitChip(text,"ok"|"no"|"g"|"r"|"n")` status chip (✓ / ✗) · `kitChips(list)`.
- `kitRows([[label, value|[values], cls]])` = the act-card `.kb` grid (labels small caps `--k-lab`) = THE kit table for every label|value list (§51). `kitTiers([...])` ladders (rule panels).
- `kitTiles([[label,value]])` small stat tiles, 4 per row (scene panels).
- Tokens (j79 `:root`): `--k-hair #e6d3ac` hairlines · `--k-lab #8a7350` labels · `--k-card #fffaf0` · `--k-card2 #f6ead6` · `--k-seal #9a2c1c` · `--k-rad 8px`. The act card (j63) uses the same values.

- Rows (review/kit-fig2, owner 17:04Z): ONE fact per row — `kpSentences` also breaks where a sentence ends at a tag boundary
  ("… 42. <b>Thánh chỉ …", "…nặng.</span> Hoàng hậu …", "….) Tai mắt …"); a "Lý do: …" / "Vì …" sentence and a bracketed note
  ("(Chứng cứ X +1.)" = what that act gave) stay on the row BEFORE them; a reason repeated inside a row is kept once.
- No-change: `kitNoChange(html)` drops every "label N → N" clause from a fact row (all producers, old saved logs); a row left without
  words is not drawn. Producers name whose number it is ("Sủng của X a → b"), never "Sủng nàng".
- RANK + NAME TOGETHER (owner 15/11 "phẩm và tên người lúc nào cũng phải đi chung", review/pick-hint, jaudit §17): every full person name
  on screen comes with its title. `kitRankNamePaint(root, dry)` (MutationObserver on body, like kitRelPaint) replaces a bare known full
  name (kpPeople, not S, with a kitTitle) in any text node outside `.kname` by `kitName(p)` (title + name, kit colours); a name already
  after its title (same text, text just before, a title in the same small card, a short sibling label holding the title such as the
  person card rank line `.pcrk`, or "title name" earlier in the same block) is left as is. Doubled-title scan: `dev/test/rank-name-dup.js`.
  Short names (Hậu cung roster strip under portraits) are not full names and are never touched. Opt out: `[data-krn-skip]`.
  Scan: `dev/test/rank-name-scan.js` → dev/review/rank-name-scan.md.
- Titles: `kitTitled(title, name)` / `kitTitledName(title, name)` — the one title + name rule: name words the title already says are
  dropped ("Tổng quản thái giám" + "Tổng quản Lý Liên Anh" → "Tổng quản thái giám Lý Liên Anh"); only title words, never a surname
  that is also a rank (Tần Khinh Vũ). `kpPeopleIn` keeps the text's own title when the text already has ANY title before the name
  (court ranks, servants, officials, artisans: `KP_TITLE_RX`) or the first words of the person's own title ("Cung nữ" + a "Cung nữ thân
  tín"), or when the sentence says the rank later ("tấn phong X làm Quý nhân"). `kitDedupTitle(html)` cleans a title said twice in
  stored text. Test: `dev/test/news-face-real.js` (titleUnit + doubleTitles).
## 10. INTEL LIST · EVIDENCE CARD · THREAT CARD (j79)
- `kitIntel([{about:person, fact:"html", src:person|"tai mắt", week:"Tháng 3 · Năm 1 · Thượng tuần"}])`: face + name + fact, small "Nguồn: … · when" line.
- `kitEvidence({what, against:person, proves, how, when, strength, acts:[{n, odds, ton, duoc, mat, kem}]})`: header (face, what, against whom),
  rows Chứng minh / Có được, then the actions it enables as ACT CARDS (gain/cost rows, odds meter).
- `kitThreat({who, how, sure:"Khá chắc", when, defs:[{n, odds, ton, duoc, mat, kem}]})`: red-tinted card; who (face + rank title, or "Kẻ chưa rõ mặt"),
  how, how sure (odds meter), when, then "Cách đỡ" defence options as ACT CARDS.

## 11. ODDS METER (j79) + CHANCE SCALE (j1) — TWO scales, never mixed (owner 11/14 + 11/15 03:05Z, review/sub-odds)
**Ladder = the act's own success/failure ONLY.** `kitOdds(word|percent)` → `.kodm`: 7 segments filled to the level, red → amber → green, plus
the word. Ladder: Liều < Khó < Năm ăn năm thua < Khá chắc < Chắc < Rất chắc < Nắm chắc (`word()` thresholds 31/46/56/66/81/91). Tap → popover
with the whole ladder. It is the ONE word in the act card's corner / beside a dialog option (`oddsChip()`), and nowhere else.
**Chance scale = every side chance.** Anything that may come along with an act or stands in her state — có thai, được ban thưởng, lật thẻ,
bị lộ / bị phát giác, bị phạt, chết, nàng sảy thai… in Được / Mất / Kèm, result cards, Sổ ghi, hints, the stage chips — reads on
Rất thấp < Thấp < Vừa < Cao < Rất cao (0 → "Không có"), the same scale as the HUD/stage chips:
- `chanceLvl(n)` → "Thấp" (chips: `Có thai: Thấp`) · `chanceLo(n)` → "thấp" · `chanceW(n)` → "khả năng thấp" (inside a row:
  `có thai: khả năng thấp · được ban thưởng: khả năng vừa`; 0 → "không có khả năng"). Thresholds 8/18/35/60. All in `j1.js` next to `word()`.
- Never write `label: ${word(n)}` in a gain/risk/kèm string — write `label: ${chanceW(n)}`. Sổ ghi after the fact: `(khả năng: vừa)`.
- `kitBranchFx` (dilemma options read from `roll(N)` branches) writes its side rows with `chanceW`; the option's main roll keeps the ladder.
- `CHW` (j1) recognises a chance phrase so `dilLine` treats a line with side chances like before (a side chance never becomes the card's odds).
- Death risks on scheme buttons come from the real formula (poison / kpoison / pond): "nàng chết: khả năng thấp" (`kpDeathWord`).
- Check: `node dev/test/sub-odds.js <site> index.html <out> after` (word detector: no ladder word after ':' or '(').
Never %, never "Chắc chắn" (bookkeeping / decisions show nothing; a formerly-sure chance act shows Nắm chắc + the soft "hỏng", ODDS CAP §odds chip).

### 11.2 MÀU CHIỀU QUAN HỆ (owner 11/15) — `kitRel(dir,text)` + `kitRelPaint(root)` (jaudit §11), tokens in `p1.html :root`
| Chiều | Token | Màu | Ví dụ nhãn |
|---|---|---|---|
| Người khác → ta (thiện cảm, oán, ghen, tin… của họ với ta) | `--rel-them` | #7a4fa0 (tím) | "Nàng → ta: thiện cảm", "oán ta", "Hoàng hậu với ta", "Thái hậu → ta: thiện cảm", thẻ việc "thiện cảm +10", "ghen +25" |
| Ta → người khác | `--rel-me` | #2f6f9f (lam) | "Ta → nàng: thiện cảm", "Ta tin cậy", "tin cậy Tiểu Lộ Tử +3" |
- Only the LABEL takes the direction colour (weight 600); the number keeps the Được/Mất colour (green/red) where it is a change. Never green/red for a direction.
- Contrast on paper (#fffaf0): purple 5.8:1, blue 5.2:1 (AA). There is no dark-night UI theme (`color-scheme:light`).
- New code writes `kitRel("them"|"me", label)`; text already on screen is coloured by `kitRelPaint` (one MutationObserver pass, same as VP). Words come from `KIT_REL` (VANPHONG §1).

### 11.3 THIẾU LỄ on formal act cards (owner 11/15) — jaudit §16, numbers `BAL.thieuLe`
- Formal acts (Thỉnh an Thái hậu / Hoàng hậu, every talk with Hoàng thượng): when she is underdressed for her rank (nothing worn, or worn
  luxury < `BAL.thieuLe.frac` of her rank allowance; a worn bestowed rank set always counts as proper), the card shows in **Kèm**:
  "thiếu lễ (y phục dưới phẩm): Danh −2, Đức −1, Thái hậu thiện cảm −3" (strict host ×1.5), and "Vì sao" lists "Y phục dưới phẩm".
  The number on the card is the very object the act applies (one source). Same rule for NPCs (SOC serveTH). Test: dev/test/thieu-le.js.
- ONE judgement: `leAttire(p, occasion, host)` → `{state: "ok"|"plain"|"showy"|"overRank", delta:{danh,duc,aff}, why:[…]}` (jaudit §17).
  "plain" = dressed below rank, or (review/toilette) the day's `p.toilette = {day, score, makeup}` says no makeup / score < 40.
  Host by nết: etiquette-minded (Thái hậu Đa nghi/Kiêu ngạo, Hoàng hậu Kiêu ngạo/Ghen tuông) ×1.5; frugal (Hiền lành/Nhu mì) approves
  plain (Đức +1, thiện cảm +2) and frowns at showy (thiện cảm −2). Card head: "thiếu lễ (…)", "giản dị hợp ý Thái hậu", "y phục quá xa hoa, … không vừa mắt".

### 11.1 "VÌ SAO <bậc>?" — the odds breakdown (owner 11/15 05:55Z: no luck without cause) — `dev/build/jwhy.js`, KIT READY
- Tapping the odds meter (`.kodm`) on ANY act card, person-card act or option opens the same kit popover (`kpPop`) with:
  title `Vì sao <bậc>?` (`.kpopt`), one line per factor (`.kpopx > .ef.g` raises / `.ef.r` lowers / `.ef.n` neutral), then the
  7-step ladder. A factor reads `<who/what> <value>: dễ hơn|khó hơn [chút | N bậc]` — N = round(points/12), never %.
  Example: "Lòng Ngọc Lan 72: dễ hơn chút · Hoàng hậu đa nghi: khó hơn 1 bậc · Ngọc Lan quen người Càn Ninh: dễ hơn 1 bậc · Quẻ tuần: khó hơn 1 bậc".
- Factors are the REAL formula's inputs: an act with its own list gives it (`a.why()` on options, `ACT[k].why(a,t)` on consort acts);
  otherwise `whyDiff()` re-evaluates the act's own odds with each input (her Tai mắt, Tâm cơ, Tài, Sắc, Danh, Sủng, Đức, Thái hậu,
  Hoàng hậu, Ân tình, Sức, maid's Lòng, Tài nghệ bậc, the target's stats, Hoàng thượng's mood) set to neutral and lists every one
  that moves it. Quẻ tuần (`lotB`) is always its own line. Hidden facts stay hidden: a target's stats show without numbers; an
  unknown nết shows as "Nết <người> (ngươi chưa rõ)".
- The card's odds word = the odds the roll uses (servant sent, Quẻ, Sức included). Never build a second explanation panel.
- Spy (dò la) has ONE formula for everyone (`spyFactors`/`spyRaw`, knobs in `BAL.spy*`): the player, her maid at home, NPC consorts
  and their servants (`runAct` spy, j28 "người của X dò hỏi"), and the servant-start order (`ordOdds`).

## 12. GLOSSARY (j79)
`KIT_GLOSS` holds the plain meaning of every game term; `kitGloss(term)` draws it with a dotted underline, tap = popover. Delta chips and tiles
apply it automatically; HUD help (`HX`) reads the same text. Terms: Sủng, Danh, Đức, Sắc, Tài, Tâm cơ, Tai mắt, Ân tình, Sức, Bạc, Chủ tin, Lòng,
Ghen, Oán, Thù, Thiện cảm, Chứng cứ, Nguy hiểm, Quẻ / Quẻ tuần, Phục vị, khắc, Thị tẩm, Lật thẻ, Lãnh cung, Cấm túc, Bổng lộc, Ân thưởng,
Tranh ghế, Tuyển tú, Thế lực, Công lao, Kính sự phòng, Nội vụ phủ, Tân Giả khố, Thai, Cơ hội, Phúc duyên. A new term gets an entry here first.
**12.1 Road-aware glosses (review/small-bugs-2).** A stat means what it means on HER road: `kitRoad()` = "srv" (cung nữ road, `isSrv`),
"cold" (lãnh cung) or "" (consort). `KIT_GLOSS_ROAD[road][term]` overrides `KIT_GLOSS[term]`; read every gloss through `kitGlossText(term)`
(popover, HX). `kitHxRoad()` rebuilds the header tap texts (HX) when the road changes. No consort-only goal (lập Hoàng hậu, mẹ Thái tử,
thăng bậc, thị tẩm, lật thẻ, bổng lộc, sắc phong) shows on the cung nữ road or in lãnh cung: the Đức "!" badge (jk3 k3Hud) and the
Ân sủng plaque (jk3 k3AsRows) are consort-road only. Test: `dev/test/small-bugs-2.js` check 1.

## 13. MINI-GAME FRAME (j79) — for j82 and the lesson games
```js
box.innerHTML = kitGameFrame({art:"Cầm", title:"Tấu khúc", how:"Chạm đúng dây khi nốt chạm vạch đỏ.",
                              hud:[["score","Phần",0],["time","Thời gian","30 giây"]], id:"kgbox"});
kitGameSet("score", 12);                       // update a HUD cell
// j82 progress cell ("round"): its LABEL follows the game type (review/small-bugs-2) — kg82Open({..., round:"Môn", roundV:"1/3"}) locks it
// for an exam (engine "Hồi n/5" updates are ignored); otherwise kg82Set("round","Hồi 2/5") shows Hồi · 2/5, "Câu 1/5" Câu · 1/5, a place "Nhì" Hạng · Nhì.
document.getElementById("kgbox-res").hidden=false;
document.getElementById("kgbox-res").innerHTML = kitGameResult({
  parts:[["Phần chơi 7/10","+21"],["Cầm bậc 3","+27"],["Tài 62","+19"],["Chuẩn bị","+8"]], total:75, place:"Nhì", of:4,
  rivals:[{who:v, score:80, sub:"tài nghệ 45 + chuẩn bị 8 + màn thi 27"},{who:S, score:75}],
  gains:[["Sủng",3]], losses:[["Sức",-10]]});
```
Header seal TÀI NGHỆ; "Cách chơi" line; HUD cells (`.kgc`, kept in the DOM but HIDDEN: the PHẦN/HỒI/CÒN chip row is never shown, owner 17/11; engines still call `kitGameSet`); a game with a real time limit (HUD time value "N giây") shows the existing kit clock chip `kitCoopClock` (§69.4) at the right of the title line via `kitGameClock` (hidden for "nhìn kỹ", "–", "N tên", "đã hết", "không hạn"); the Điểm trang "Hôm nay" agenda block is removed; game box `.kgbox`; result rows (true numbers; "Phần chơi", never "điểm"), standings "Bảng định thứ" with face + rank title (the score `.kgrow>b` never wraps), Được/Mất chips.
In-game pieces keep the existing lesson-game classes (`.lanes`, `.lbtns`, `.simon`, `.memo`, `.goban`, `.mgopts`, p1.html) which are part of the kit;
game buttons use `.kgbtn` (or `.btn` inside `.kgbox`), `.on` = selected. The lesson overlay `#ov .mg` wears the same frame.

**`playArt(o)` (j82, the one entry for a game outside a contest: works, practice, and the steal game jsmg)** — options, all optional except `art` / `onDone`:
`art` (KG82_KIND key or art key) · `artName` (seal title before «:», default the art's name) · `title` · `occ` (mgTier occasion: hoc / hoi / trieu / exam / tuyen) · `note` (result row «Ghi chú»)
· `onDone(raw, {skipped})`. Added for review/steal-minigame (no new CSS, existing kit parts only): `rows` = intro rows above the two buttons, drawn by `kitRows` under the
`.kpst` heading `rowsHead` (default «Phần của ngươi»), the same intro block `startContest` uses (`.kgintro`) · `go` = the start button label (default «Bắt đầu»);
the skip button is ALWAYS the §13.6 quick option (`quick:{n, sub, roll?}` → `kitQuick`, never a private button) · `resRows(raw, skipped)` = the result rows instead of «Màn chơi» + note (one end button `#kg82ok`, shown as the ✕ like every game).
Example (jsmg): `playArt({art:"mua", artName:"Chặn ngự giá", occ:"trieu", rowsHead:"Trước khi ra tay", rows:[["Thắng","cơ duyên lần này lên một bậc: Khó → Năm ăn năm thua","g"],…], go:"Bắt đầu", quick:{n:"Thôi, không chơi", sub:"giữ nguyên Khó"}, resRows:(raw,sk)=>[["Kết quả",…]], onDone})`.

### 13.1 MINI-GAME ART · tranh bàn chơi (j82 + j91, owner 11/14: no code-drawn art where a painting is expected)
Every board and every object in every mini-game is a PAINTING (Magnific gpt-2-6, one style ref, folder ba4aecfe-…, no faces, no text): `img/kit/mg-<môn>-*.webp`.
The canvas of `.kgbox` only draws small live marks (aim trail, beat line, melody ribbon, ink strokes, silk threads, target rings, heat gauge, smoke colour, text labels) and PLACES the pictures.
API (j82, window): `kg82Bg(g,W,H,kind,veil,ay)` cover-fits the board painting (cached per size; `veil` = light wash 0–.15 for legibility, `ay` = vertical anchor, 1 keeps the bottom);
`kg82Spr(g,name,x,y,w,h,{rot,alpha,glow,ax,ay})` draws one sprite (`name` = file without `mg-` / `.webp`); `kg82Lbl(g,text,x,y,maxW,dark)` = text with a halo on paintings;
`kg82Preload(kind)` (the game starts once its pictures are loaded, ≤ 2.5 s). Board choice: `KG82.ctx` = `"thi"` (startContest, Tranh ghế) or `"hoc"` (lessons `openMG`, `playArt`: practice, works j83).
Contest boards = palace contest grounds with empty galleries, red curtains, lanterns. Lesson boards = quiet rooms (study, music room, kitchen…), teacher absent, only tools.

| Trò (khóa) | Nền thi `mg-<k>-bg` | Nền học `mg-<k>-bg-hoc` (bài học Tài nghệ · tự luyện · tác phẩm) | Mảnh rời (nền trong suốt) |
|---|---|---|---|
| Đàn (`dan`, học Cầm) | sân khấu nhạc, sàn gỗ bóng | phòng đàn: cổ cầm bên cửa sổ trăng | `dan-blossom` (hoa mai rơi), `dan-bridge` (nhạn đàn), `dan-tassel` |
| Hát (`hat`) | sân hát bên hồ sen đêm trăng | — (không có bài học) | `hat-lotus` (đóa sen theo giọng) |
| Cờ (`co`, học Kỳ) | bàn đá cẩm thạch dưới đình | thư phòng cờ bên rừng trúc | `co-board` (bàn cờ gỗ trơn, kẻ 7×7 bằng nét), `co-black`, `co-white` |
| Đầu hồ (`dauho`) | sân lát đá | — | `dauho-pot` (bình đồng hai tai; holes measured on the picture = the scoring holes, BAL.mgArt.dauho: mouth opening, lip, neck, two ear tubes lower than the mouth; dauho-lv5), `dauho-arrow` |
| Bắn cung (`ban`) | trường bắn cỏ xanh, lối cát | — | `ban-target` (bia trên giá; face centre at BAL.mgArt.ban.cy of the height; the painted rings = the scoring rings, BAL.mgArt.ban.ring; dauho-lv5), `ban-arrow` |
| Thơ (`tho`, học Thi) | án thư dài phủ dạ | thư phòng, án thư giấy trắng | `tho-slip` (thẻ giấy kem viền vàng; vẽ 3 khúc giữ viền) |
| Câu đối (`doi`) | vách vôi ngà giữa cột son, hai liễn đỏ để trống | — | `doi-slip` (thẻ giấy hồng điều nhũ vàng, chữ kem) |
| Đố đèn (`doden`) | sân hội hoa đăng ban đêm | — | `doden-panel` (mặt đèn khung son; lời đố viết lên rồi cắt 9 mảnh), `doden-lantern` (đèn đỏ có ô kem ghi lời giải) |
| Vẽ (`ve`, học Họa) | án gỗ trải giấy xuyến | họa thất: giá bút, giấy trắng | `ve-brush` (bút theo ngón tay), `ve-inkstone` |
| Cắm hoa (`hoa`) | bàn phủ lụa kem | — | `hoa-vase` (bình men ngọc; miệng = 36 % bề ngang), `hoa-<peony·orchid·chrys·plum·peach>-<l·m·s>` (cành dài/vừa/ngắn; gốc ở đáy ảnh, đóa hoa ≈ 10 % dưới đỉnh) |
| Thêu (`theu`) | khung thêu tròn căng lụa | phòng thêu bên song cửa | `theu-peony`, `theu-butterfly`, `theu-crane`, `theu-cloud` (mũi thêu) |
| Khéo tay (`kim`) | bàn may phủ gấm | — | `kim-knot` (nút chỉ vàng), `kim-spool`, `kim-needle` |
| Múa (`mua`, học Vũ) | sân khấu thảm đỏ tròn | đình tập múa trong vườn | `mua-mat` (đệm múa; sáng = ánh vàng), `mua-fan`, `mua-bell` |
| Nấu ăn (`banh`, học Nấu nướng) | bếp hội thi ngoài trời | bếp riêng trong cung | `banh-stove`, `banh-pot`, `banh-flame` (cao theo độ lửa), 19 nguyên liệu `banh-<nuoc·sen·nhan·duong·ga·thuoc·tao·kytu·gao·dung·yen·xuong·cusen·hanh·ot·giam·mam·ruou·muoi>` (ô nguyên liệu = thẻ giấy + ảnh) |
| Điều hương (`huong`, học Y thuật & điều hương) | bàn gỗ trải lụa rêu, khói nhẹ | phòng hương dược, kệ hũ | `huong-censer` (lư dưới làn khói), 7 hũ `huong-<tram·nhai·que·hong·bacha·dan·moclan>` (núm thanh trượt) |
| Chải chuốt · Điểm trang (`chai`, review/wardrobe + review/toilette jtoil) | `mg-chai-bg`: bàn trang điểm, gương đồng mờ, hộp trang sức | — | `chai-brow` (bút kẻ mày; đầu bút ở góc trên phải ảnh, ax .95 ay .02), `chai-puff` (bông phấn), `chai-rouge` (hộp son + giấy son) |
- **Điều hương near/far cue (huong-cue, owner OD 21/11 ~00:40Z)** — no word: a ring round her smoke swatch (width + colour step with closeness: hair → brown → gold → `--good` + glow `BAL.mgFx`) and a gauge of `BAL.mgTier.blend.star.length` pills in the same colours (0 empty … all full = matched). Steps are the SAME `BAL.mgTier.blend.star` thresholds as the grade; verdict ★ replaces the gauge after «Dâng hương». Drawn on the canvas in `k91Blend` (live marks only).

All 15 contest kinds + the 8 lessons (cam→dan, ky→co, thi→tho, hoa→ve, vu→mua, y→huong, theu, nau→banh) + practice/works (`playArt`) use these; any new mini-game adds its own `mg-<k>-bg(-hoc)` + sprites here first.
HUD: "Phần x/10 · Hồi x/y · Còn …" (every round/throw/vase/lantern = "Hồi"); standings heading "Bảng định thứ"; never "điểm".
HUD counts never pass their ceiling: "Phần" is the running share of the WHOLE game (same formula as the final mark), and `env.hud` caps any "a/b" at b (`kg82Cap`, counted in `KG82.over` for tests).
No text over text: a pop (`kg82Pop`) replaces any live pop it would land on; a round verdict ("Khớp hương mẫu!", "Đối chỉnh!", "Thế hoa cân đối!"…) is drawn IN PLACE of the hint/heading line it would cover (`k91Say`), never floating over other words. `dev/test/minigames91.js` fails on any overlap of canvas or DOM text in `#kg82`.

### 13.3 ĐIỂM TRANG BUỔI SÁNG (owner 15/11 09:30Z, review/toilette) — `dev/build/jtoil.js` (after jaudit, before j84) — awaiting kit review
- Entry: act card "Điểm trang" at the top of Hành sự every buổi sáng (deck card, b:0, 1 khắc `BAL.toil.khac`, sure act, Kèm + Ghi chú say what
  skipping means) AND the top-bar chip (k3 row line 1, `[data-k3="toil"]`): "Hôm nay: chưa điểm trang" → tap starts it; after: "Hôm nay: y phục
  hợp dịp · trang điểm đẹp" (`.ok` / `.hot`), tap = kpPop. Never forced, never blocks Sang buổi.
- Frame: the j82 game overlay (`kg82Open`, HUD Phần · Hồi x/4 · Còn). Hồi 1 CHỌN Y PHỤC (DOM, no canvas): left = her portrait `pcPort` with the
  picture of the WORN y phục's tier (figFor with that tier) + "Hôm nay" kitFacts of the day's occasions; right = `kitEquipSlots` (key "toil": Cài tóc,
  Hoa tai, Y phục, Đeo tay, Đeo eo, Túi thơm, Giày (GAP IT03); tap = take off) over `kitInvGrid` (key "toil", tabs Trâm cài · Y phục · Trang sức, the SAME items as Tư trang via
  `kinvItems`; tap = wear). Buttons: Mặc bộ này · Giữ đồ hôm qua. Verdict row (kitRows): hợp dịp / hợp phẩm / quá giản dị / quá phô trương / vượt phẩm /
  phạm tang. Hồi 2–4 TRANG ĐIỂM (canvas): the mirror of `mg-chai-bg` zoomed to fill the board, HER portrait in the glass (face from veil-fit),
  live marks only (gold dotted guides, ink stroke, powder bloom, rouge dots, closing ring) + the three sprites as the tool under the finger.
  The clock of each hồi starts at the first touch. Result = kitRows (each hồi /100, Phần chơi, Tay nghề chip, Dung nhan, Xa xỉ son phấn = `toilLvChips` (tier word chip + `kitLuxChip` "Xa xỉ N"; no beauty number),
  Hôm nay: who reacts how). The colour step shows the five-look ladder (`toilLvRows` in `kitRows`, makeup-lux). No new part: kitRows / kitChip /
  kitLuxChip only. The day's TOTAL xa xỉ display (Tư trang / room panel / Dư đồ, gold calligraphy label) is MAIN's kit part reading `luxTotal(S)` /
  `luxParts(S)` and the window event `ctm-lux` (jlux).
- Small CSS (`#toil-css`): `.toilw` two columns (portrait | slots + bag), one column under 640 px with a 110 px portrait beside the facts.
- Face look all day (owner 15/11): one layer in the face-effects slot `kitFxLayers` (jk2b §7 — tall frame, small avatar, stage figures; same box as
  the picture, order portrait < makeup < scar < veil): `<img class="kmkl kmkl-dep|kmkl-diem">` = an SVG drawn from `img/toil-fit.json`
  (mouth + both cheeks + face size per por-/fig- picture, `dev/figwork/toilfit.py`). Looks: none (mộc / vụng / vừa), `dep` (rosy feathered cheeks,
  light lip tint, brighter skin), `diem` diêm dúa (owner 15/11: the same painted layer a little stronger — deeper, wider rouge, bolder lip tint, a little more powder sheen;
  pretty, noticeably overdone, never clownish) — presets `TOIL_LOOKS`. Only her face. Sheet: `node dev/test/toil-looks.js`.
- Since §60 (review/mk-colour): a colour step (Chọn màu) before the skill hồi; blush + lips + eyelids + brows wear HER picked colours (see §60).

### 13.4 TÀI NGHỆ FRAME WITH HER LIVE FIGURE · kitGameFig (owner 16/11 ~21:30Z, review/minigame-frame) — `dev/build/j79.js`
- ONE frame for EVERY mini-game: `kg82Open` -> `kg82Frame` -> `kitGameFrame({..., fig:true})` (contests, exams, works, lessons, self-practice, Điểm trang, Chải chuốt, scheme/slap/td games: all 30 kinds in `KG82.kinds`, scan = before the change a static painting `.kgpic` column / none; after: `.kgfig` on every kind).
- Wide screens (html.kv2: iPad 1180x820, 1366x1024): LEFT column `.kgfig` = HER full figure in the outfit she wears now (`kitStageFig(S)`: kit figure at the KIT_FIG ratio, women ~.79; the face layers of `kitFxLayers` ride on it, so Điểm trang makeup, scar, veil show LIVE). One mirror only: Điểm trang no longer shows the static mirror picture nor the round `kitFaceZoom` disc; the prop picture is OFF by default (the game board already paints it); `g.prop:true` + `g.pic` draws a small corner thumbnail if a game ever needs one.
- Fold / one page (html.kv1): NO left column, the game alone at full width (`:where(.kv1) .kgfig{display:none}`; the legacy small picture band is gone too).
- Live change: after an outfit / makeup pick call `kitGameFigRefresh()` (jtoil does in toilDressUI and toilColUI). Play animation: while the game runs (frame not `.kg-idle`) the figure breathes (`.kgf-anim`, off with Settings "Hiệu ứng: Gọn" and reduced motion). Rim light only: this part never overlays glow on the person.
- KIT REQUEST (art, Foreman C): per-game "hands on the instrument / brush / fan" figure poses (e.g. đàn). Until then the figure breathes.
- Not a tài nghệ frame (no figure): pet care mini-game (`petcGameBox`).
- Sample: kit page §13.4.

### 13.6 QUICK BUTTON · kitQuick (owner 18/11 ~05:45Z + ~05:55Z, review/mg-skip-all) — `dev/build/j79.js`, odds `BAL.skip` (jbal2)
The ONE quick / skip choice of EVERY mini-game, beside its start button (the old `#mgskip` look: `.kbtn.alt` + class `kquick`, big line = name, `<small>` line).
- `kitQuick({id, n, win, lose, sure, sub, data})` → button HTML (default id `kg82skip`, name "Để trời định"); `kitQuickSub(o)` → only the small line (j5 `#mgskip`, j83).
- Small line = the odds WORD of `BAL.skip.od` (`word(od(BAL.skip.od))`, VANPHONG ladder, never %) · `thành: <win>` · `hỏng: <lose>`; `sure:1` = no roll, no word (a sure act shows no odds word).
- `kitQuickRoll()` = THE quick roll (`roll(od(BAL.skip.od))`), the only one; co-op: it runs where the game runs (the seat that plays).
- `sub:"…"` = a game whose quick choice keeps its OWN rule (contests / exams: the mark of a girl of her level; court acts: the act's odds; slap: no play) — same part, its own line.
- Name per game type: "Để trời định" (lessons, Tu đức, care games), "Học nhanh" (Tài nghệ lessons / practice), "Điểm trang nhanh" (makeup), "Kết nhanh" (veil craft).
- Outcome table (a quick result never beats a good own play): lesson won = tiến bộ một phần (j5/j83: 1 of 3 pts; jtd: the progress of a `BAL.skip.raw` play), lost = 0 · works / crafts = never a product (sure) · makeup won = Đoan trang (`BAL.toil.tier[0]`, the middle tier), lost = Vụng về; "Để mặt mộc" stays its own choice · care (pet, plant) won = `BAL.skip.care` of the gain, lost = nothing.
- Audit: `node dev/test/mg-skip-audit.js` (every game listed, FAILS a new game frame without kitQuick); page test `dev/test/mg-skip.js`.

### 13.7 RULES SCREEN «Sẵn sàng» + GUIDED ROUND «Hướng dẫn» · kgReady / kgTut (owner OD 20/11 ~00:20Z, review/mg-ready-guide) — `dev/build/j82.js`, numbers `BAL.mgTier.tut` (jbal2)
Owner (verbatim): "Có nhiều cái game đó tôi không biết luật chơi. Vừa mới vào game các bạn đã bắt đầu bạn trừ giờ của tôi là không có được. Phải cho tôi cái option là khi mà vào cho tôi đọc, cho tôi cái thời gian tôi đọc, khi nào tôi ready thì tôi bấm sẵn sàng rồi bắt đầu mới trừ giờ của tôi chứ. Phải thêm cả cho tôi có option là hướng dẫn, có nghĩa là sẽ có một màn hướng dẫn chơi, tức là một màn hướng dẫn chơi nhanh đó để còn biết chơi."
The ONE first screen of EVERY mini-game (all KG82_KIND kinds and every caller: startContest, playArt, jmgcal Thử tay, jexam, jentry, jslap, jtd, jts tsGame, j92 Chải chuốt, jsgame mưu kế, jroute Nghiệm thân, the j5 openMG fallback; new callers — e.g. Foreman E person mini-games — use it too, never a private rules screen):
- `kgReady(box, spec)` — call right after drawing the intro (rows + start button + §13.6 quick button) inside `.kgbox`. It puts on top a rules block `.kgr`: `.kpst` «Luật chơi · <name>», kit rows (`kitRows` via kg82Rows) Môn / Luật (the kind's `how`) or the caller's `steps` rows, and the **EVENT picture** `.kgr-ev` on top (mg-intro-2, owner OD 21/11 ~04:17Z CANON, overwrites the old `.kgr-demo` picture of the move: that picture is GONE everywhere — the «Hướng dẫn» round teaches the move): `evArtOf(spec.ev)` (festival `fest:<fk>` for a festival contest, `sys:tuyen-tu` entry exam, `sys:thi-tam` Khảo hạch, default `cat:tai-nghe`; `ev:false` = none, used by the pet / plant care dialogs), hidden when the manifest has no file. The rules block is the heading + the kit «!» `kgBang` (§13.7.4) holding the Môn / Luật rows (or steps) and the «chưa tính giờ» note. NO TEXT IN PLAY (owner OD 20/11 ~05:10Z): every pop word goes through the ONE kit table `kg82Sym` (j82): ★★★/★★/★ = how well, ✗ = miss, ▼ = look here, ↻ = once more, a/b = a count; in-play buttons are signs (`?` hint, `✓` done, word only in the tooltip, `k91Btns` 4th item); test dev/test/mg-noword-a.js; then a `.kpnote` "chưa tính giờ". The caller's start button (`spec.go`, default `#kg82go`, its own onclick kept) becomes «Sẵn sàng» (small line: "từ lúc này mới tính giờ" / untimed: "bắt đầu chơi"); «Hướng dẫn» (`#kgrtut`, `.kbtn.alt`) is added beside it. While this screen is up the frame's «Cách chơi» line is hidden (`.kg-ready`, no duplicate). NOTHING runs: no engine, no canvas, no clock chip (§13 kitGameClock) until «Sẵn sàng».
- spec: `kind` (KG82_KIND key) | for an own game `n`, `t`, `how`, `e` (demo group), `pic`; `steps:[[label,text]]` (rows instead of Luật: jtd Tu đức rules + example, jsgame steps — shown EVERY time, no more first-time-only cards); `go` (selector); `timed:false`; `tutor(box, env) → stop` (an own engine for the guided round); `v` (env.v); `lv`.
#### 13.7.4 `kgBang(html,title)` / `kgBangRows(head,allRows,shownRows,extra)` — everything long goes behind the kit «!» (mg-intro-2, `j82.js`; thin wrappers of `kitNoteBang(text,title)` §62.1, no own pop-up)
Owner OD 21/11 ~04:17Z: an intro / contest frame shows SHORT essentials; "những thông tin không cần thiết đưa hết vào dấu chấm than". `kgBang` = the heading words + the kit round «!» holding the HTML (popup title = the heading). `kgBangRows` = a `.kpst` heading with that «!» holding ALL rows + the few essential rows shown. Used by startContest («Phần của ngươi»: «Gồm» + «Độ khó» shown; «Đối thủ»: name + «tài nghệ n» per rival, the breakdown behind the «!»), jentry, jexam, playArt `o.rows`, and every `kgReady` rules block. Test: `node dev/test/mg-intro-2.js`.
- `kgTut(box, spec)` = «Hướng dẫn»: the intro is kept aside (DOM fragment, handlers intact), the SAME engine runs in `.kgbox` on the EASIEST board (`mgSet(kind,{occ:"hoc", d: lowest gap of BAL.ag.mg2.cal.d})`), with `.kgt-bar` on top ("Hướng dẫn · <name>", the live step line: chạm / kéo / giữ / thả / chờ, "không tính phần, không mất gì, thử lại được") and «Về luật chơi» under it. The ghost hand `.kgt-hand` (one SVG, `KG82_HAND`, body-level fixed, pointer-events none) reads the engine's OWN hint hook `KG82.peek()` every frame — point `{x,y}` (tap), `{drag:[[x,y]…]}` (the hand travels the path), `{sel}` (a button), `{hold, x,y | hsel}` (hold / release) — so every engine family (j82, j91, jnwp, jnwq, jlant, jts, jslap, jtd, jhd, j92, jsgame, jroute) is guided by the same driver; an own game adds a `KG82.peek` (jroute: «Ra tay» while no gaze is on the bowl). Unscored: env.hud never touches the HUD / clock, env.end only ends the round, demo cards off (`KG82.noDemo`), `S` untouched, `KG82.tier/lv/occ/ctx/peek/run` put back. It ends by itself after `BAL.mgTier.tut.part` of the engine's rounds (round "a/b": a−1 ≥ max(1, ⌈b·part⌉)), on the engine's end, or after `BAL.mgTier.tut.ms`; «Xong hồi hướng dẫn» shows `BAL.mgTier.tut.back` ms, then the SAME rules screen returns (repeatable). ✕ during the round closes the game and keeps nothing.
- Co-op: the read time is on her own screen only; the shared buổi clock is never paused (the steal game's host hold `BAL.steal.mg.coopMs` still counts while the friend reads).
- Test: `node dev/test/mg-ready-guide.js` (every kind × every caller, scan table). Kit page sample «§13.7».

#### 13.7.3 NWB — word-free play-area parts (jnwb.js; owner OD 20/11 ~05:10Z «không có một cái mini game nào mà có chữ») — documented by the kit keeper 21/11
`NWB.ic(name)` svg icon (stroke = currentColor) · `NWB.btn(id, icon, {alt,cls,label})` icon-only button (the label is only aria-label / tooltip) · `NWB.pips(n,on)` a row of dots (`.nwb-pips`, `.nwb-pip.on`) · `NWB.POP` symbol pops (✓ ✗ ★) for canvas feedback · `.nwb-cap` the ONE-LINE guiding caption BESIDE pips (huong-cue-2: td_hanh «còn N phần để chia», «<tên> · cần X phần · nhận Y»; .75rem bold, ink, centred, wraps, no px size). It is the DOM counterpart of the canvas pill `kg82Guide` (§13.7.2): the same rule «one short state-driven line», drawn in the DOM where the play area is DOM. A caption is never a rule paragraph; no other class may carry a play-area sentence.
#### 13.7.1 MINI-GAME CUE KIT · BAL.mgFx (review/mg-visual base + review/mg-play2 extensions, owner OD 20/11 ~08:05Z) — `dev/build/j82.js`, numbers `BAL.mgFx` (jbal2)
ONE look for every in-play cue on any mini-game canvas (every engine family calls these; no engine draws its own glow, lane or danger mark):
- `kg82FxPop(since,now)` / `kg82FxRing(g,x,y,r,since,now)` (mg-visual): the press pop scale + the blooming press ring (`pop, ms, glow, ring, blur, pass, ringW, dim`).
- `kg82FxLane(g,x0,x1,y0,y1,W)` (mg-play2): THE lit path to follow — board outside [x0,x1] darkened `laneDim`, bright core (glow × `lane`), two glowing edges (`laneEdge`, ring colour). Rule: any band the player must keep the piece in / steer along uses it, drawn exactly on the scoring band; contrast lane vs board ≥ `laneMin` (luminance gap, tested). Today: den tssteer, duho tspluck reach zone.
- `kg82FxBad(g,x,y,r,now,hitAt)` (mg-play2): THE «avoid this» look — kit `--bad` danger ring + small ✕ badge round any thing she must NOT touch; `hitAt` → red burst over `badMs`, returns a shake offset (`badShake`) for the hit thing / her piece. Never on a pickup. Today: den lotus pads.
- Test: `node dev/test/mg-play2.js` (lane contrast ≥ laneMin, danger ring red rim, hit = penalty, dodge demo, guided hand).

#### 13.7.2 MINI-GAME GUIDING LINE + «Vì sao» ROW (owner OD 21/11 ~00:50Z «guiding words stay», review/mg-5s-clear) — `dev/build/j82.js`
- `kg82Guide(g, text, cx, cy, tone, sz, maxW)`: ONE pill (kit card ground, coloured rim) on any mini-game canvas = the single short, state-driven guiding line. `tone` is a WORD — `"wait"` (neutral, `--k-lab`) · `"go"` (tap now, `--good`) · `"bad"` (danger, `--bad`); colours are tokens, never typed in an engine (a ready colour string still works). Kit page sample §13.7.2. Type shrinks to fit `maxW` (not below 10 px); a longer line is cut with «…» — a guiding line is ONE SHORT line (≤ ~34 characters). No engine draws its own pill (td_dung's local pill() still has to be switched to it: rv branch review/td-dung-clear-rv).
- `KG82.why = "…"`: an engine sets it when it ends; `kg82ShowRes` shows it as the kit row «Vì sao» above the button, then clears it (also cleared at `kg82Play`).
- A DOM button in play may keep a short word: set `data-kgkeep="1"` (kit pass in j82 «NO TEXT IN PLAY» skips it). Used: «Quạt lửa», «Thưa», «✓ Dán».
- Rules-screen demos `NWB_DEMO.aim / slapbar(kind) / cook / tspluck / doiline / hoadien` (jnwb): the object, a hand doing the move, the ✓ (still under Cảnh động off).
- Used by: ban, tat, ne, banh, duho, doi, hoadien, td_ngon. Tests: `mg-noword-a/b` whitelist exactly these strings (GUIDE table).

#### 13.7.3 FIGURE-COLUMN BACKDROP PER SUBJECT (owner OD 21/11 ~03:48Z + ~03:50Z, review/mg-5s-clear) — `dev/build/j82.js` KG82_MGBG, `j79.js` kitGameFig
On the wide screen (html.kv2) the figure column of every mini-game frame (intro AND playing) stands on a NEW tall painting per subject, not the board picture, not the flat yellow. ONE table `KG82_MGBG[kind]` → `img/mgbg-<kind>.webp` (art: Foreman C). `kg82Pic(kind)` records the kind, `kg82Open` passes it, `kitGameFig` sets `--mgbg` + `.kgf-bg`; a missing file = the old cream gradient (CSS layered fallback). Fold (html.kv1) has no figure column: unchanged.

### 13.8 HEAD-TO-HEAD SPLIT BOARD «Thách đấu» · kitGameVs (owner OD 20/11 ~01:00Z item 1, K-PM-1, review/kit-gamevs) — `dev/build/jgamevs.js`, knobs `BAL.gameVs` (jbal2)
ONE shared live board for EVERY person-minigame art (đàn, cờ, hát, múa, thư pháp, họa, thêu, hương … any KG82 / person game that plays against a living NPC or friend): her board + the opponent's live score and clock side by side. Display only: no game logic, no rule numbers (the game owns them; the part only has `BAL.gameVs` = pop / warn / end knobs).
- `kitGameVs({box, me:{p|face,name}, opp:{p|face,name}, unit:"phần", round, total, oppBoard})` → controller; mounts at the top of `box` (default `kg82Box()`), after `kgReady` (§13.7). Portrait = `kitFaceH` (kit portrait), score and clock = kit chips (`.kchip`), panes use `--k-hair / --k-card / --gold`.
- API: `setScore(side,n)` (bump) · `setClock(side,secondsLeft|null)` («còn N giây», red under `BAL.gameVs.warn` of `total`) · `setTurn(side|null)` («Đến phiên» + gold ring) · `setRound(text)` · `end({win:"me"|"opp"|"draw",text})` (locks the board, ring green / red) · `vs.me` / `vs.opp` = board slots the game draws into · `destroy()`. `side` = "me" | "opp".
- Layout: `html.kv1` (Fold portrait) opponent pane above, her pane below; `html.kv2` (iPad / spread) side by side, her LEFT, opponent RIGHT, round state between. Reduced-motion: no bump animation.
- Words (VANPHONG): «phần» (never điểm / %), «khắc/giây», «Đến phiên», «Nàng thắng / Nàng thua / Hòa nhau».
- Mount rule: a person minigame calls `kgReady` first, then `kitGameVs`; never a private scoreboard. Kit page sample «§13.8» (fake opponent ticking). Test: `node dev/test/kit-gamevs.js` (API, words, stacked / side-by-side, Fold + iPad + 390x844 + 1510x2000 shots).

### 21.2 BRANCH CHART · kitBranchMap (K-GE-1, review/kit-ge; owner OD:L1623 (1), design GRAND_ENDINGS §2.10) — `dev/build/j79.js`
- `kitBranchMap(m, o)` → HTML of the node chart of ONE branch, `kitBranchMapMount(el, m)` draws it into `el` (keeps `m` on `el.__kbm` so a tap on a node opens its card), `kitBranchMapOpen(m, key)` = the card (existing `kitModal` info card). `m` = the return of `geMap(branch)` (jge.js): `{n, spine[{id,at,n,seen,past,here}], rare[{at,id,n,seen}], ends[{i,n,st,ch,slots[{sh,ti}],fail{n},card}], count{txt}}`.
- Layout: counts chip on top («Đại kết cục n/4 · Danh hiệu n/8 · Kỳ ngộ n/2») · the spine, vertical: Nhập cung · .4 … .11 · ch12 · ch13 · ch14 · Hồi kết nhánh (node = its name once seen, else a dashed «?» pill); chapters behind her this life SOLID (rail + filled dot), ahead DOTTED (dotted rail, hollow dot); her kit face (round `.kbm-me`, `kitFace(S)`) on the chapter she is in; the 2 kỳ ngộ hang off the .4 / .11 nodes at the right (diamond pill, «?» until found) · «Bốn ngả kết cục»: the 4 Đại kết cục in a grid (2 columns on a phone / Fold, 4 in one row on `html.kv2`), each = name (or «?») + its state word this life (`geStateWord`: Còn mở lit gold ring · Chỉ còn đường thua dashed red · Đã khép · chương n dim) + the 2 title slots (K-GE-2 plates thiện / ác when earned, else «?») + its fail node under a dashed rule («thua»; lit red when it is the only road left).
- CSS note (ge-map, GE03): the node rule is `.kbm .kbm-n` (specificity 0,2,0) so a host list rule such as the Sổ luân hồi mount `.kpmain li{padding:2px 0}` cannot zero the 22px room of the rail dot; `.kbm-f` (fail node) wraps (`flex-wrap`, its «thua» label `flex:none`) so a long fail name never breaks «thua» one letter per line on 4 columns. Look unchanged; every place of kitBranchMap (kit sample §21.2, Sơ đồ nhánh page) gets both.
- Card (tap): an ending that was reached → rows Hai ngả rẽ (both Ngã rẽ words) · Điều cần (words, no numbers, no %) · Kiếp này (state) · Danh hiệu (plates) · Ngươi từng đạt (kiếp n); a «?» node → «Chưa ai biết ngả này dẫn tới đâu.» + its state. Spine / rare nodes: name + «ngươi đang ở đây / đã đi qua / chưa tới».
- Kit tokens only (`--gold --trim --line --k-card --k-card2 --k-hair --k-lab --k-sel --good --bad`); no painting. The page itself (identity tab row × road rows — use the existing kit tab row — + «Sổ luân hồi» mount, `BAL.ge.mapOn`) is the build worker's; this part only draws one chart. Test `node dev/test/kit-ge.js`, kit page sample «§21.2».

### 82.1 «THIÊN MỆNH» TITLE PLATE, TWO TONES + PLATE-LABEL ROWS (K-GE-2 / K-GE-3, review/kit-ge) — `dev/build/jtitle.js` + `j79.js`
- K-GE-2: `kitTitlePlate` takes a tone: `o.sh` or the title's `.sh` or the grand-ending key suffix (id `ge_<branch>_<n>t|a`) → class `kdh-shT` (thiện = gold-white, dark-gold text) / `kdh-shA` (ác = gold-crimson, cream text). Same shape, size, sparkle and tier-8 effects as the plain plate (`kdh-t8`); a title without a tone draws the plain plate. Painted plate art (`img/kit/title-plate-8.webp`) is not used for a toned plate (CSS only until Foreman C draws the two tones).
- K-GE-3: a `kitRows` row whose LABEL is a title plate (`.krl > .kdh`) puts the plate on its own line above the value, value at full width (`.kpkb .kr:has(>.krl>.kdh)`), at every width: fixes the one-letter-per-line value on 412x1058 / 390x844 for jdh «Danh hiệu trên đầu», the earned-title rows of the Danh hiệu tab and the Bảng «Thiên mệnh» rows (jge.js:173), same rule for any future row of this shape. The plate keeps its own case (no uppercase from the label style).
- Test `node dev/test/kit-ge.js` (755x1000 · 1180x820 · 412x1058 · 390x844), kit page sample «§82.1».
### 13.9 THE WAY BACK «Quay lại» on EVERY mini-game screen · kg82BackX / kg82Back (owner 20/11 ~04:45Z, ROOT-73, review/mg-back) — `dev/build/j82.js`
Owner: "thêm cho tôi một cái option là cái chữ X hoặc là chữ go back, quay lại, để mà khi mà tôi vào một cái game mà tôi không có muốn thì tôi có thể go back để tôi ra tôi chọn cái game lại."
- ONE kit ✕ (`kitXHTML('data-kitx="kgback"',"Quay lại")`, the 32.10 ✕, no new look) put by `kg82Open` in the frame header (`.kph`, top right): rules screen, «Hướng dẫn», play and result. Never two ✕: jk4 `kitOvSync` adds none when it is there.
- (0) `KG82.backPre` = a FREE back before «Sẵn sàng» (cleared by «Sẵn sàng», any result screen, kg82Close): the game closes, nothing played, nothing spent. Callers that cost something only REMEMBER the charge: `kgDefer(cost, open)` (cost = {suc, bac, th, khac, tch} or the caller's pay function) → `kg82Open` keeps it as `KG82.payOnGo` (a lesson also in `S.mg.pay`, so a reload reopens the same unpaid lesson) → `kgPay()` takes it on «Sẵn sàng» / the quick option / any result / an outcome close (joining jaudit's pending cost when there is one, so its one result card shows the whole cost). Never a snapshot or a refund: `spend()` (which moves the world) does not run before «Sẵn sàng». Wired: lessons j23 + j2, practice j83, jrcp teacher, jveil craft, jsgame paid choice; `KG82.preBack` = the caller's own clean-up for that back (jaudit works deck card: the card untaken); jtd = its own «Thôi, để lúc khác»; jaudit's pending cost for the unplayed game is dropped.
- Order: (1) `KG82.back` (caller with nothing at stake, set right after kg82Open: Thử tay → the kind list, the kind not saved; Chải chuốt rules screen → back) — `KG82.backAsk` = confirm lines while a board is live; (2) a result button `kitOvBtn` (#kg82ok / #kg92ok) is pressed (old 32.10 behaviour); (3) `KG82.xdo` = the only way on of a screen (jtoil result, Nghiệm thân blood scene; jsgame «Ra tay» asks first with the kit confirm «Ra tay?» — «Ra tay» / «Ở lại», never silent); (4) otherwise GIVE UP (laws 2/3: never a free escape): kit `kitConfirm` «Bỏ cuộc?» («Bỏ cuộc» / «Chơi tiếp»), lifted over #ov by `body.kg82cf`, then the caller's OWN lose path with 0/10 — during play `KG82.quit()`, on the rules screen the «Sẵn sàng» button runs with `KG82.giveUp` (kg82Play / sgEng / jroute end at once with 0, no board, no clock). `KG82.quitAsk` = the caller's own confirm lines when its lose result is not 0/10 (jtoil: Để mộc).
- `kg82Close` clears back / backAsk / quit / quitAsk / xdo. Callers never draw their own back button.
- Test: `node dev/test/mg-back.js [page] [WxH] [shotdir]` (every caller × every screen, scan table).

### 59.2 SMALL SPINNER · kitSpin (KP16, review/kit-modal-spin; life-preload part b) — `dev/build/jph.js`
- `kitSpin({s,label,cls})` → `<i class="kspin">`: a 28 px (18 px with `s:true`) gold ring on the parchment hair-line (`--gold`, `--k-hair`), turning at the game pace (`--pace`); still gentle breath under «Hiệu ứng: Gọn» (`kspin-still`) and, via the global reduced-motion rule, not turning. Spoken label = `CTM_WAIT.spin` («Đang chờ…»). ONE look: the dialog wait of the life gate (`#modal.klifewait::after`, jload.js) draws the same ring, so a dialog waiting up to 3 s for its picture shows the spinner instead of nothing.
- Use `kitSpin()` anywhere a short wait needs a sign (buttons, chips, a pane); never a private spinner. Test `node dev/test/kit-modal-spin.js`; kit page sample «§59.2».

### 8.3 A DIALOG OPENED FROM THE TITLE SCREEN (KP18, review/kit-modal-spin) — `kitModal` in `dev/build/j79.js`
- `kitModal` puts a dialog opened while `#title` is up on the title layer by itself (adds the existing class `kptitle` = `.modal.kptitle`, z 55, j74): kitConfirm / notice / pick work from any title sub-panel, no caller patches it (the jcloud `dropAsk` patch is gone). In play (title hidden) nothing changes.
### 13.10 GAME MARK CHIP «n/10» + AMBER CLOCK · kitGameMark / kitGameClock (owner OD 20/11 ~07:15Z, review/kit-mark) — `dev/build/j79.js` (+ `mgFast` in jmgt.js, `tone` in kitCoopClock)
- ONE small chip «n/10» in the game title line (`.kgmk`, left of the `.kgclk` clock), the same kit chip look as the clock (`kitChips` / `.kchip.n`). Number only: no word, no %. The 17/11 clutter ruling stands: the PHẦN/HỒI/CÒN row stays hidden; this is the only extra chip.
- Wired ONCE for every kind: all engines report through `env.hud` → `kg82Set` → `kitGameSet`; `kitGameSet("score"|"time")` calls `kitGameMark`. The chip READS the HUD score and never grades again: since review/mg-score-same every engine puts `mgLive(env,x)` (the already graded mark, equals the result) in `env.hud({score})`, so a second `mgGrade` would double-grade. "a/b" counts as 10·a/b, "–/10" = 0. `KG82.cur` (the running env: kind + ease) is set by the three env makers (j82 kg82Play, j92 Chải chuốt, jsgame) and read by the clock. No engine draws or updates the chip itself.
- Rewritten only when the number changes; a DROP replays the kit pop (`.kgmk-pop`, scale 1→1.22→1, off under reduced motion); a rise does not pop. Hidden before «Sẵn sàng» (no engine, §13.7); a ✕ «Quay lại» (§13.9) never touches it.
- `kitGameClock`: the clock chip is NORMAL (`.kchip.n`) and turns AMBER (`.kchip.w`, `.kgclk-amber`) once the FULL-MARKS WINDOW of the kind's time part is passed (elapsed > `mgFast(env,kind)` × round length; only a real window > 0 — a window of 0 or none stays normal); the window is `BAL.mgTier.lev[kind].fast` read through `mgFast`, the very value `mgPace` uses (ONE CORE). A kind with no time part (no `lev[kind].fast`) never turns amber; a new round resets the clock to full → normal again. `kitCoopClock({tone})` lets the caller set the chip tone (the old auto-red at ≤ 20 s stays for the co-op clock, where no tone is given).
- Test: `node dev/test/kit-mark.js` (every kind: chip, graded value, pop, amber clock). Kit page sample «§13.10».

### 81.1 ENTRY GATE «cổng cung → điện tuyển» · kitEntryGate (K-OI-1 / KP07, review/kit-podium-gate; OD:L1244 + L1261) — `dev/build/j93.js`
- `kitEntryGate({kind, origin, road, to})` (joi.js `oiGate` calls it once per life, right before her first selection card inside the palace; `to` = the name of the selection): a `kmStage` scene queued with `kmPush` (one big moment at a time): a gate whose two leaves swing open (`rotateY`, hinged at the outer edges) while the picture pushes in and a warm glow rises, caption «<cap> · Vào <to>» (no %, no numbers), then ONE kit button (§81, `.kbtn.kmend`, label by kind: consort / bride «Vào điện» · maid «Theo ma ma» · corridor «Tiếp theo»). An outside tap only skips to the final frame; only the button closes it. Gọn / reduced motion = the final frame at once (leaves open, button there).
- Kinds: `consort` (tt dtq muoi ch thd td: sedan) · `bride` (nc bd: bridal sedan + envoy) · `maid` (cnv: maids behind a mama, a narrower side gate) · `corridor` (cn: the Càn Thanh corridor, no leaves, cold lantern glow).
- ART SLOTS (Foreman C paints; nothing is drawn in code): `img/kit/entry-gate-bg-<kind>.webp` (the scene, 4:3), `img/kit/entry-gate-door-l.webp` / `entry-gate-door-r.webp` (the two leaves, transparent, hinged at the outer edge). A slot not on the CDN yet is listed once for painting (`kitPhNote("entry", …)`) and the scene stays complete: dark gate ground, two plain leaves in the kind colour, the caption. Art rows G1–G7 of reports/review-origin-intros.md map to these slots (+ per-kind procession layers later).
- Test `node dev/test/kit-entry-gate.js` (4 kinds × Fold 755x1000 / iPad 1180x820 × normal / reduced motion: scene, leaves, caption, one button by kind, outside tap does not close, queue order, fit, the joi.js caller); kit page sample «§81.1».

### 20.1 TUYỂN TÚ ON THE PODIUM (OR09, review/kit-podium-gate) — `kitPodiumShow` (j90) fed with family records
The Phúc tuyển result of the Tuyển tú arc (her + thứ muội + khuê hữu) goes on the SAME kit podium (§20): the sister and friends are family records (`S.kc.fam`), not rivals, so each entry carries the optional entry fields instead of a person: `{who:<record>, place, score:"9 phần", sub:"thứ muội"|"khuê hữu", fig:"" (figure src, "" = none), face:<kitFaceH html>, nameH:<kitName html>}`; hers: `{who:S, place, score, sub, you}`. `kitPodiumShow(list,{title:"Phúc tuyển",sub:"Tuyển tú · Nội vụ phủ",next:"Tiếp",onNext})`. Test `node dev/test/kit-podium-tt.js` (Fold + iPad, normal + reduced). The GAME WIRING (kcPhucPlay `fin`: how the sister's and friends' Phúc marks are drawn — ONE CORE, from BAL — and the call) is the build worker's, not the kit's: see reports/kit-podium-gate.md.

## 14. SCENE PANEL (j79) — identity card, opening story, title screen
- Compact translucent kit frame (`rgba(255,250,240,.90)` + blur) to one side in landscape (max 440 px / 44vw, vertically centred, right) and in the
  lower part in portrait; the background art stays visible. Fits ONE screen, no scrolling, buttons always visible (tested at the 4 sizes).
- Identity card ("Thân phận kiếp này"): portrait beside the text; name with rank title once; origin and age once; story sentence; stats as `kitTiles`
  (4 per row); one note line; the two choices side by side (ACT CARD frame). Header sub line: Phúc duyên.
- Any panel can ask for it with `kitPanel({scene:true, …})`.

## 6.1 ACT ART SLOT (j79, kit 2)
Every act card (`button.ka.kcard`) has its illustration on the LEFT in the SAME rectangular portrait frame and size as the consort card
(`kitArtFrame(src,label,cls,col)` → since 11/14 the simple PICTURE FRAME of 28.19 (`figure.ksart.ksart-tall.kartf2`, category line + chip); box `--kaw`×`--kah`, `--kah` = `--kaw`×4/3 (170×227 px, 128×171 px under 600 px; jk3);
art is 3:4, 384x506 (the frame's photo window). Rows on the right. Cards: one column on the Fold (min 440 px per card), 2–3 on wide screens.
Category colour (owner 11/14): the brocade is tinted, the photo window gets a coloured ring, a ribbon under the window names the category
(also `title` on hover), and the card has a 4 px left edge in the same colour. Legend (`KIT_CAT`):
| key | name | colour |
|---|---|---|
| giao-thiep | Giao thiệp | `#c4607a` |
| hau-ha | Hầu hạ | `#3f8f8c` |
| le-nghi | Lễ nghi | `#b8901c` |
| hoc-tap | Học tập · Tài nghệ | `#3f62a8` |
| ban-thuong | Ban thưởng | `#d98a1c` |
| trung-phat | Trừng phạt | `#5a3a2a` |
| muu-ke | Mưu kế | `#5a3f8f` |
| hai-nguoi | Hại người | `#7a0f14` (blood red) |
| y-duoc | Y dược | `#5d8a3c` (KP06, review/kit-modal-spin: medicine / pregnancy / physician acts — thuốc, an thai, thụ thai, mang/có thai, thái y, chữa/khám bệnh, bồi bổ, bắt mạch; «Hầu thuốc …» / «Mang … thuốc men» stay Hầu hạ; checked first, art `act-cat-y-duoc`) |
| sung-ai | Tranh sủng | `#b03a7a` (Chặn ngự giá, Tranh sủng, lật/rút/giữ thẻ, Liếc mắt đưa tình: winning the Emperor's night, checked first) |
| nghi-ngoi | Nghỉ ngơi | `#5f9a5f` |
| buon-ban | Buôn bán | `#a8692a` |
| di-lai | Đi lại | `#7d8456` |
| cham-con | Chăm con | `#e08a6a` |
| trieu-chinh | Triều chính | `#22405f` |
Older text below (square slot) is replaced by this. Image = `img/act-<key>.webp` where `img/ACTS.json` `acts` maps the card title (or its slug)
to `<key>` (title read WITHOUT the target's mini portrait; then ACTS.json `prefix`, names with `*`, longest act name the title starts with: j79 `kitActKey`); otherwise `img/act-cat-<category>.webp` when listed in `ACTS.json` `have`; otherwise the brocade tile with the category word.
Categories (`kitActCat(name)`): hau-ha Hầu hạ · hoc-tap Học tập · giao-thiep Giao thiệp · muu-ke Mưu kế · hai-nguoi Hại người · nghi-ngoi Nghỉ ngơi ·
buon-ban Buôn bán · le-nghi Lễ nghi · di-lai Đi lại. Art: square, painterly, same style anchor as portraits, ≤ 60 KB webp.
Grid rows: every card in a row has the row's height (fitted to content, `grid-auto-rows:auto` + stretch), no empty space from a taller row.

### 14.1 BOOT COVER (`dev/site/kboot.js`, owner 15/11 "Khi vừa bấm vào game, có chừng ít hơn 1 giây hiện khung này")
- The ONLY screen before the kit exists. From the first paint until the game is built the player sees the title backdrop (KIT §30
  `KIT_BD.title` art, same positions/veil) with ONE scene panel (§14 frame values) "Cung Tường Mộng" · "Cửa cung đang mở" + a moving bar in
  the §35 progress-track look; then a .35 s fade to the title / loading screen. Never the bare static markup of p1.html.
- Inlined at the top of `<head>` by build_site.sh (before rot.js); its small CSS mirrors the kit values because no kit CSS/JS exists yet.
  If `KIT_BD.title` (jbd.js) or the §14 frame changes, change kboot.js too.
- Host page (rot.js design canvas): the same cover in the design box until the frame has painted its own.
- Let go by `kbootDone()` (last `<script>`, assemble.py) only when the game script ran to its end (`window.__ctmBuilt`).
- WATCHDOG (owner iPad 15/11 "Bị gì đây mới vào game"): script not finished (`data-why=broken`) → failure card "Cửa cung chưa mở được"
  with "Mở lại" and "Quét lối cũ rồi mở lại" (drops shell caches + service worker; keeps pictures and saves; reloads the whole page, query
  such as `?room=` kept) and the last error, small. A SLOW open is not a failure (review r1): 15 s → the cover keeps its bar and says
  "Đường xa, cung đang dựng dần…"; 30 s → the same card with the slow text (`data-why=slow`), and it still lets go the moment the game is ready.
  Boot errors are kept in localStorage `ctm-boot-err` (last 8).
- Test: `dev/test/boot-flash.js` (first-paint states + screencast, CPU 4x, slow network), `dev/test/webkit-boot.js`,
  `dev/test/boot-slow.js` (throttled cold open: never a broken card, cover gone when ready), `dev/test/krx-diff.js` (kRx emulation = native).

### 14.2 OLD-SAFARI RULE — no regex lookbehind literals
- iPad/iPhone Safari < 16.4 cannot PARSE `(?<=` / `(?<!` in a regex literal: one such literal anywhere = the whole game script dead.
  Write `kRx("pattern","flags")` (j0): native RegExp where lookbehind works, an emulation elsewhere. `dev/test/webkit-syntax.js` FAILs a literal.

## 6.2 OPTION CARD = SMALL ACT CARD WITH ITS PICTURE LEFT (owner 15/11 "Hình minh họa cho từng hành động bên trái. Bên phải là thông tin. Tôi nói hoài vậy."; review/opt-pics) — `dev/build/jopic.js` (after jph) + jk4 `kitCompactCSS`
Markup: dev/handover/refs/owner-option-picture-left.jpg (docs branch). Owner rulings 15/11: keep BOTH act-card forms — the big Hành sự card
(§6 / §6.1) unchanged; every dialog option card is the ONE final form of §6.2b (66x88 picture, Tốn / Được / Mất rows, "!").
- WHERE: every option of every dialog — `#modal .opts > button.ka` (events, dilemmas, nights, reactions, servant matters, festivals, co-op,
  pickers) and kit choice panels `.kpscopts > button.ka`. Not: the identity card's approved pinned pair (`.nlopts`). ONE place: the outermost
  `kaNorm1` wrapper calls `kpOptArt(b)` after the j63 frame (and kitHideOut / kitHint) built the card. Nobody adds pictures by hand.
- LAYOUT: `.kaart` (kitArtFrame picture, 66x88 per §6.2b, cover-cropped, category edge colour `--kcc0`) LEFT · `.kabody` (title + risk chip / odds,
  Cần / Tốn / Được / Mất / Gợi ý rows as §6 / §28.6) RIGHT. CSS = the §43 small-card rule set `kitCompactCSS(B,w,h)` (jk4, ONE string, used for
  `.kpane` act cards with B=`button.ka.kart` and for options with B=`button.ka.kart.kopt`). Options: one card per row, full width
  (overrides 31.16 `k3grid` when the cards have pictures; owner L109), all cards of a dialog one height (§6.2b). The tiny portrait icon beside an option title (j25 `.md`) is removed: the picture replaces it.
- TAP ON THE PICTURE = `kitPicZoom(src)`: the picture large over the screen (`#kpzoom`), tap anywhere closes; it does NOT choose the option
  (capture-phase click handler). Any other kit part may call `kitPicZoom(src)`.
- PERSON OPTION CARD (owner 21/11 ~04:27Z "Bạn đã thật sự làm mấy cái khung theo một cái kit chưa? Mà tại sao cái avatar này không có", review/dialog-person): an option that targets / chooses a PERSON
  (entourage, spy / gift / plant / evidence / item targets, any `kgt` / `kgp` option) has the KIT AVATAR PART in its picture slot: `kitOptAvatar(b, face, person, src)` (jopic) puts `mdH(face,"big")` (KIT §4.2: the
  rank frame + ground + badge of her rank, tassel whole) into `.kaart.kaav` (the slot loses its picture frame / edge ring; `button.ka.kopt.kopav`), and the title becomes the kit STACK rank / name (`kitRankName`; a stranger
  "rank / ???"; a "· đang nhắm" marker stays as the small `.kanx` line). Never an event picture, never a loose portrait crop (`.kopface` is retired for people). An option names its person in `kgp` (a person object:
  servants, kids, any NPC) or `kgt` (rival / "emp" / "th" / "maid"); a sentence about a person ("Tố Quý phi …") keeps its words and is stacked only in its rank-led form. Scan: `dev/test/dialog-person-scan.js` (part B).
- THE LEFT SLOT = THE MAIN SUBJECT (owner 21/11 #58 #67 #70 #76 #77, law 6b; jksize `kszSubject3` / `kszOwnAct3`, jk4 `kitStagePeople`; the default ma-ma narrator and `BAL.staff.narrator` are DELETED): first match wins: (1) the person the dialog names (`who` / stage); (2) a choice she makes ALONE (`KIT_ACT_PIDS`, `entpick`, `m.act`, `m.shop`, `m.ownAct`) → HER OWN figure; (3) exactly ONE other person named in the lines → that person; many people → nobody; (4) only her ("ta") → her own figure; (5) nobody → the event picture on the left. Small frame with a subject: its framed avatar left, the event picture at the TOP of the right column. When the subject is HER the rank/name tag gets «(ta)» under the name (`kszTa`).
- ONE AVATAR RULE (owner 21/11 #62 #64 #65 #78 #79; jksize `kszAvatarRule3` at every layout; rows carry `data-kfp` / `data-kfn`, j79 `kpFactRow`): a line naming ≥ 2 people has NO avatar; the left subject NEVER has a line avatar (one person = one image per dialog); a SECOND person's avatar sits ON the event picture (`.kevav`, top-left overlay), never in the text; no left subject (picture left) → the one acting person keeps her avatar beside her line, same on Fold and iPad; an unnamed carrier has none. `kitFaceH` draws only real face objects (a servant's `src` "home"/"pick" is her origin, not a picture: the broken-image bug). An item named in a dialog = `kitItem` size sm (jitev `kitItemTag`). Scan: `dev/test/dialog-person-scan.js` part C (every PEND builder + 14 rounds of play, both devices).
- NO HEAD SEAL ON A DIALOG FIGURE (owner 21/11 #73, same-person-twice family): the left full-body figure of a modal dialog (`#modal .dlg`, not the book pages) carries NO round head seal (`kfsFigs` filter in jfigseal.js; stage figures keep §28.8d); the feeling of a mood event sits on the event picture corner (§28.19b mark). A line whose avatar is hidden (`.kfav-off`) is ONE grid column (no squeezed text).
- WHICH PICTURE — `kitOptPic(title, button)` → `{src, key, how}`; owner ruling: one picture per MEANING GROUP, reused everywhere; first hit wins:
  1. `act` — `kitActKey(title)`: the option is an act, or ACTS.json already holds its own choice picture (act-pics2 "-h" keys);
  2. `log` — ACTS.json "log" meaning rules (`kbkRules`, the Tuần lục picture of the same choice line; key "-" = none);
  3. `rule` — `KIT_OPT_RULES` (jopic): ~60 meaning groups (thôi / im lặng / giữ mình / đứng xem / từ chối / trả lại / nhận lỗi / quỳ xin / thưa trình /
     vâng mệnh / lì xì / đút bạc / dâng lễ / góp bạc / cược / lạnh lùng / cảnh cáo / đáp trả / chứng cứ / ghi nhớ / tố giác / theo dõi / dò la / sai người /
     đốt / giấu / buông tay / hẹn gặp / hạ độc / thử độc / vu oan / rình thời cơ / trách phạt / canh giữ / hoảng sợ / an ủi / giúp / tiệc / bái kiến /
     xin ân / chép kinh / cầu / thái y / dạy con / dự thi / kết mạng / vẽ / kết thân / sớ / đòi nợ / khen / trang điểm / mời thầy …) → an existing act
     picture when it truly shows the action, else a group picture painted for it (`img/act-opt-<group>.webp`);
  4. `face` — a person picker (title starts with a consort's name / "Hoàng thượng" / "Thái hậu") → that person's portrait (`pv`, face at the top);
  5. `item` — an item picker (title = an item name in `IT`) → `kitItemSrc(k)`;
  6. `own` — a picture the option already carries;
  7. `ph` — the §59 act placeholder (light / dark by `kitPhTone`), recorded in `CTM_MISSING_PICS` as kind "opt" (so the owner sees it still lacks one).
  A key whose file is not on the CDN (`img/_index.json`) is skipped. The card carries `data-kopic="<how>:<key>"` (tests, audits).
- Painted for groups with no fitting picture (gpt-2-6, folder ba4aecfe…, hands-only house style of the act pictures, 384x506 webp ≤ 53 KB;
  ids in dev/figwork/optpics/gens.txt, prompts in prompts.json): `opt-thoi` (closing a fan, turning away), `opt-thua-trinh` (hands folded
  in a polite bow before a seated superior), `opt-buong-tay` (letting a jade pendant go by a lake), `opt-rinh-cho` (dark: watching from behind
  a lattice for the moment), `opt-canh-giu` (barring and locking the palace door, casket moved), `opt-hoang-so` (alarm, toppled cup).
- Kit sample page §47: "§6.2" + "§6.2b" (options with and without cost/gain; the three options of the owner's markup "Hoàng hậu triệu kiến" through kaNorm → kpOptArt).
- Tests: `dev/test/opt-pics.js` (every option kind → its picture source; layout at the design sizes: picture left 84x112, nothing wider than
  its box, zoom opens and does not choose). Scan of every option title (static + bot): dev/test/opt-pics-table.md (before/after).

### 6.2b FINAL OPTION CARD — ONE size, Tốn + Được only, "!" for the rest (owner 18/11 ~07:25Z, review/opt-card-short; supersedes the tall/square form-by-content rule, the person-dialog fill rule and the review switch) — `kitOptFinal` / `kitOptInfo` / `kitNumBox` (jopic), `kitOptEqual` (jk4), frame rule in jksize
- PAID ONLY WHEN IT WORKS (K-WIN-PAY, KIT_REQUESTS 21/11 econ-tamco F1): on a ROLLED card the Được slot is the Thành row (`.kwinrow`); a red item there (a §88 THÀNH Mất price, e.g. ECON_WIN bribe / block / xin Hoàng hậu) reads «Bạc -30 khi thành» (CSS suffix, never typed by a caller); green items and sure cards (no roll) carry no tag. Test `node dev/test/kit-win-pay.js <url> <out>`.
### 6.2b FINAL OPTION CARD — ONE size, Tốn / Được / Mất rows, "!" for the rest (owner 18/11 ~07:25Z, review/opt-card-short; supersedes the tall/square form-by-content rule, the person-dialog fill rule and the review switch) — `kitOptFinal` / `kitOptInfo` / `kitNumBox` (jopic), `kitOptEqual` (jk4), frame rule in jksize
- ITEM = ONE UNIT (K-EF-UNIT, KIT_REQUESTS 21/11 econ-tamco RE-CHECK #2): in every card row (`kaRowH`) a STAT item («Bạc -94», «Tâm cơ -3», «2 khắc», «Sức 80→98 (+18)»; `kaUnit(h)`) gets `.kef1` = `white-space:nowrap`, so «Bạc» / «-94» never split at a line end; the rule is `!important` with an id-weighted `:is(#kef1-unit,.kef1)` so NO card host (§6.3 square card / kitCompactCSS `.krv>*{white-space:normal!important}`, `.kpabox`, `.kopt`) can undo it (r2, rv-kit-ef-unit FAIL); info rows (`kitRows`, j79) tag their stat items the same way (`kaEfTag`); items wrap as wholes between the «·» separators; long word items keep wrapping. Test `node dev/test/kit-ef-unit.js <url> <out>` runs on a REAL option dialog (.kopt, column 280..auto), the Hành sự act tab + person card act rows (.kart) and bare rows: every unit nowrap and on one line, inside its card.
Owner (verbatim core): "mấy cái nút … cùng một kích thước thôi … cái hình đại diện hình chữ nhật … tốn không được không … màu xám … ghi chú nằm trong cái nút hình dấu than … chỉ còn hiện ở cái ô này là tốn và được thôi."
- EVERY dialog option card (`button.ka.kopt`, not a person card `.pc` row §6.3): picture box 66x88 (3:4 rectangle, never square, never stretched; same box in every dialog), min height 104 px, content centred vertically; the cards of ONE dialog are ONE height = the tallest card of that dialog (`kitOptEqual`, `data-kapic="eq"`).
- A card that has no picture of its own gets the §59 placeholder when a sibling has one (`kitOptUnify`): no picture-less card next to picture cards. The odds meter (`.kodds`, the Liều…Nắm chắc word) sits ON THE TITLE ROW at its right end (owner 21/11 ~04:00Z, #49a; never its own row): the title takes the rest of the row and may wrap to two lines. TITLE ROOM (§6.2b-1, review/kit-opt-title-wrap, `kitOdFit` / `KIT_ODFIT` j79 — ONE rule for EVERY `button.ka` whose `.kat` carries `.kodds`: dialog option cards, act cards, compact pane cards): the choice reads the room the TITLE gets beside the meter, never the card width — when the title does not fit on one line beside the row meter (bar + word) and that room is under `KIT_ODFIT.room` = 12 em, the card gets `kodstk` = the meter stacks bar-over-word (a long word «Năm ăn năm thua» wraps under the bar at 5.4 em) so the title keeps its width and the odds stay on the title row (owner OD 18/11 ~09:02Z «title never squeezed by the odds chip»); only a title row too narrow even for that (stacked meter + `KIT_ODFIT.min` = 7.5 em, e.g. a person card pane on a 390 px phone) puts the meter under the title at the right (`kodrow`). `kitOptTier` counts a layout whose title room is under 7.5 em as not fitting (2 columns → 1 column). The general act card title is `flex:1 1 0` (the meter no longer drops to its own row just because the title needs two lines). `.kodm.oc` is `inline-flex` (the `.oc` inline-block of p1 had made the stack dead). Every fit is VERIFIED on the real layout (a meter still under the title → stack, then `kodrow`; a step taken on a passing layout is redone 120 ms later), compares with a 4 px pad (canvas vs DOM widths), re-runs when web fonts arrive, and `kitOptTier` re-fits all cards after its trial layouts (`kitOdRefit`; the observer stays silent when the row ends at the width it last reported). Test: `node dev/test/kit-opt-title-wrap.js <url> <out>` (DEVS=412x1058,390x844 for the secondary devices). The picture FILLS the card height (top to bottom, #49c): `kitOptTier` sets the picture's height = the card's height after the tier is picked.
- ROWS: exactly **Tốn** and **Được** are visible. No cost → grey row "Tốn: không"; no gain → grey row "Được: không" (`.kfill`). Mất folds into Tốn — and so does every CERTAIN loss (law 3, review/odds-meter-back): on a card with no roll of its own (no odds; the «Nắm chắc» meter of kitOptOdds is `data-ksure`) a «mất: …» parsed as a Bại row stands in Tốn too, never «Tốn: không» behind «!»; a rolled card's Bại stays folded (it is a failure outcome, not a price). The `.kdup` copies are on purpose: j65 dedupeBtns skips them (it used to delete the folded original, which emptied Tốn on the next pass); further Được rows (Được ngay / Thành) fold into the Được row (copies, `.kdup`). Rolled cards: the Thành row is the Được row.
- A card that has no picture of its own gets the §59 placeholder when a sibling has one (`kitOptUnify`): no picture-less card next to picture cards. The odds meter (`.kodds`, the Liều…Nắm chắc word) sits ON THE TITLE ROW at its right end (owner 21/11 ~04:00Z, #49a; never its own row): the title takes the rest of the row and may wrap to two lines; on a narrow card (< `KIT_OPT.stackW` = 430 px, class `kodstk`) the meter stacks bar-over-word so the title keeps its width. The picture FILLS the card height (top to bottom, #49c): `kitOptTier` sets the picture's height = the card's height after the tier is picked.
- ROWS (owner 21/11 ~05:05Z, #72, canon overwrite): three rows in this order — **Tốn** (the price only: khắc, bạc, …; never a loss) → **Được** (every gain, further Được ngay / Thành rows fold into it as `.kdup` copies; rolled cards: the Thành row is the Được row) → **Mất** (every loss as red chips: «mất: …», a certain Bại, the «nhưng …» part of a hint; own row `.kr-mat2 .kdup` after Được, `kitOptFinal`). No cost → grey row "Tốn: không"; no gain → grey row "Được: không" (`.kfill`); no loss → no Mất row. The `.kdup` copies are on purpose: j65 dedupeBtns skips them. Test: dialog-fixed (h).
  Everything else — Cần, Bại, Kèm, Ghi chú, Vì sao, the lead text — is folded (`.kofold`, display none) and opens from the **"!"** in the card's top-right corner (`kitOptInfo(b)` → `#kpinfo` overlay = the whole card, every row; tap anywhere closes; the tap NEVER chooses the option, capture-phase handler like `kitPicZoom`). The "!" exists only when something is folded. "trả khi làm xong" (a Ghi chú) moves into Tốn (`kitOptCompactRows`).
  A DISABLED card (`kdis`) has the same two rows; its "!" is the SAME colour as every other "!" (no red variant, owner 18/11 09:30Z) and the reason (Cần) is inside. The Được slot is always labelled "Được" (a rolled card's Thành row too).
- DIALOG NUMBER LINES: formula / threshold lines of a dialog's info (Phẩm = …, Xa xỉ range / Lưu ý / Son phấn of the dress dialog, Thường dưới 6 · Khá 6 · Tinh xảo 10 · Tuyệt phẩm 15) are wrapped with `kitNumBox(html)` (jopic): hidden (`.knum`), a "!" sits INLINE in the top-right corner of the info block (absolute, same x as the card "!", never its own row) and opens them in `#kpinfo`; the key sentences ("Chỉ vật liệu quý mới thành Tuyệt phẩm…", "Vật liệu tốt, quý còn làm quà…") stay as text. Used by the three material dialogs (jwkr, jtds, j83).
- FRAME RULE (every layout, jksize `.k3right`): the portrait/figure AND the info (event picture, text, chips) STAND STILL; only the option list (`.opts`) scrolls (`overflow:clip` on `.k3right`, `overflow-y:auto` on `.opts`, min 112 px). The right column never scrolls as a whole.
- Person-card act rows (`.pc > .pcr`, §6.3) are NOT dialog options: they have the SQUARE 76x76 picture + Tốn/Được beside it and the info box under (§6.3, 21/11). Removed: `KIT_OPT_VAR`, `kitOptVarSet`, `kitOptFit0` early exit, `kitOptShortTier`, the square form (`kasq`) for dialog options.
- Tests: `node dev/test/opt-card-scan.js <url> <out> <tag> 755x1000,1180x820 none <cases>` (card heights equal per dialog, picture box, title em, visible rows, fixed-top check = scroll every scroller, portrait/info must not move) and `node dev/test/opt-card-bang.js <url> <out> [WxH]` ("!" on a card / on the dialog opens the overlay and chooses nothing).

### 6.2c TALL FRAMES ON THE PHONE (owner 18/11 ~16:05Z CANON, review/opt-card-short #3; replaces the 09:20Z "every dialog" rule) — jksize
Owner (verbatim core): "chỉ có mỗi cái khung nào mà cao cao như vậy thôi. Còn có những cái khung thấp, khung nhỏ, khung ngắn thì cứ để bình thường."
- PHONE (html.kv1): ONLY a live frame of class **L or XL** (`.dlg.kszlive[data-ksz=L|XL]`) grows (top and bottom) to `aspect-ratio: KIT_FRAME.page.w / page.h` (the screen's shape) with the tall cap `--kph`; `#mb` / `.k3body` fill the grown height. S / M frames and plain modals (info / result) keep their natural height. iPad / spread unchanged.

### 6.2d TWO OPTION LAYOUTS + ONE SIZE PER BUTTON TIER (owner 18/11 ~16:05Z + 16:15Z, review/opt-card-short #3) — `KIT_OPT` / `kitOptTier` (jopic), called from `kszBtnGridLive3` (jksize) and `kitOptEqual` (jk4); `KIT_SIZE.opt = KIT_OPT`
Order of work (owner): frame class S/M/L/XL (§6.2c, KIT_SIZE) -> option LAYOUT -> button TIER. Phone AND iPad use the same rule.
- LAYOUT `1` = one long button per row; LAYOUT `2` = a two-column grid. Per dialog `kitOptTier(.opts)` tries, in this order, the first whose cards ALL fit their tier (no card taller than the tier, no text cut sideways): `[2 columns, tier S]`, `[1 column, tier M]`, `[1 column, tier L]`. A single option never uses layout 2. Long text -> long rows; short text -> 2 columns. Written on the grid as `data-kol` / `data-kot` (and `--k3c`).
- BUTTON TIERS (ONE size each, never a variant inside a tier): the picture box and the card height come from `KIT_OPT.tiers`; the width is the cell.
  | tier | picture (3:4) | card height | used by |
  |---|---|---|---|
  | S | 60x(card height) | 132 | layout 2 (two-column cell; iPad: two columns whenever the text fits, owner 21/11 ~04:00Z #49b) |
  | M | 66x88 | 104 | layout 1, normal text |
  | L | 84x112 | 140 | layout 1, longest text (largest card any layout needs: Fold dress / mat2, 119 px at M) |
  A tier size is the LARGEST card that tier needs over every layout phone -> iPad; to change a tier edit `KIT_OPT.tiers` only (CSS is generated from it).
- Picture-less cards (hide-out cards, `button.kopt` without `.kaart`) take the same tier height; the "!" is always the card's own top-right child (`kitOptTier` moves it back if a builder put it inside the title).
- "!" (owner 18/11 09:30Z): ONE colour for every "!" (no red); card "!" `top:5 right:6`, dialog "!" (`.knbang`) absolute in the info's top-right corner at the same x; never its own row. In layout 2 the cards' "!" sit one per column (two columns by construction).
- Tests: `node dev/test/opt-card-scan.js <url> <out> <tag> 755x1000,1180x820 none <cases>` prints per case `TIERCHK <layout><tier> bad <cards whose rendered picture / height != tier>/<n>`, `BANG` (right edge x of every "!"; a `COL` mark = a "!" not in the one colour), `tier` (the attempts: layout+tier:heights, ok) and the older columns.

### 6.2e OPTION FRAME: figure fill, tag on top, title band (owner 18/11 ~21:20Z, OD tail; review/opt-card-short #6; kit, whole group, every tier, Fold + iPad)
1. The figure FILLS the left column: the frame body is the tallest of figure / info / grown tall frame; `kszFigFill` (jksize, after the feet-fit) grows the figure body to that height (the column keeps its width so the option cards keep theirs; the box may spread to KSZ_FILLW x the column, the painted body is narrower). Reference = ipad-mat2 (Quý nhân Tống Ngọc Hành). Where the width cap stops it, the rest is below the figure, never above it.
2. Rank + name tag at the TOP of the left column (`align-self:flex-start`), figure right under it; never centred / sunk.
3. Every option card: ONE title band per frame (`--kat-h` = the tallest title band of the frame, incl. the odds chip), title (+chip) vertically centred in it; the card's text block starts at ONE offset (`--kbtop`: the tallest block centred in the tier height). Set by `band()` in `kitOptTier`, inside every tier fit. Tier L height 128 -> 140 (equal bands make the longest card need 138).
4. LAW 10 is re-checked after the tier is picked and 350 ms after the frame settles (`kszEvLaw10`).
5. Samples (scan, kit page) use REAL event text (a real event's description lines), never placeholders («Hỏi khó.»).
Scan (`dev/test/opt-card-scan.js`): `FIG top/gap` (tag top <= 3 px; unfilled gap under the figure <= 12 px), `TITLE ... band-centre` (title-group centre minus band centre, equal across the cards of a frame, spread <= 2), `SCROLLBIG`.

## 6.3 PERSON-CARD ACT ROWS — every act a person card offers is the LONG HORIZONTAL ROW (owner 16/11, iPad 755x1000 shot of Tiểu Hoa's card; review/pcard-actrow) — `dev/build/jk4.js` (after the §43 compact block)
Owner: "this button does not follow the shared kit; if the text is long we HAVE a kit part for that, the long horizontal option row — why not use it?"
Fault: the person-card acts (Tâm sự / Sai đi dò la / Nghe ngóng chung…) of the stage pop-up were big §6 cards in a 2-column `.pcb` grid — tall boxes, uneven
heights, text clipped at top and edges, rows overlapping. Causes: (1) the pop-up (`#popw .pcpop`) is not inside `#panel`, so `kitActCompactOn` never ran for it (no
picture slot, no compact form); (2) the compact card form (§43 / §6.2 `kitCompactCSS`) only applied inside the `kpane` container query (≤ 640 px), so on a wider pcr
the `.pcb` / `.rbtn` / `.kskacts` auto-fill grids won.
- RULE (OVERWRITTEN owner 21/11 ~02:08Z, review/kit-pcrow-square; the 16/11 «3:4 picture filling the row» form is gone): an act on a person card (`.pc > .pcr`: stage pop-up, every Hậu cung / Giao tình / Hoàng tự tab, court, staff, kids, servants — every tab with the person's figure on the LEFT) is ONE card per line, full width:
  TOP BLOCK = the act's own SQUARE picture (ONE size per device (68 px on a narrow pane under 420 px, 84 normal, 96 on the iPad two-page view (html.kv2): the sizing of the approved «Dò hỏi gia thế» card) in every host; cover-cropped; NEVER stretched by the text, never 3:4; no own picture → the §59 placeholder) on the LEFT, and on its RIGHT the title + odds ladder and ONLY the **Tốn** and **Được** rows (a rolled card's Thành row is the Được row).
  UNDER the top block: ONE full-width INFO BOX (`.kpabox`) holding everything else — the lead sentence, Cần, Bại, Mất, Kèm, Ghi chú, Vì sao, hints. A card with no such text has no box. A card with more text grows downward; nothing clips; no grid cell; no per-act variant. The group container (`.pcb`, `.rbtn`) is a one-column flex stack, 8 px gap.
  Where: `kitPcActSplit(b)` / `kitPcActScan` (jk4; idempotent, run from a debounced observer after every render, no host calls it) + CSS `#kit-pcard-actrow`; `kitOptFit0` returns early for `.pc>.pcr` acts (no fill-to-text any more, `kitOptFill` is dialog-only now).
- §6.3b-1 NO BULLET NOTE BOX ON A PERSON CARD (owner 21/11 ~02:10Z): the descriptive note of the card (`.pcn.kpres`: «Người chạy việc của cung… / Gặp nàng ta ở tẩm cung…», Chí tôn «Trọng tài… / Mê sắc…») is hidden; the kit yellow «!» (`.khap.kpcbang`, §78) sits on the TOP-RIGHT corner of the left avatar/figure (`kitPcNoteBang`, jk4); tap → the same text in the kit info popup (subject = that person). An act RESULT («…: thành / hỏng») stays on the card — feedback to a tap is not a description.
- §6.3b-2 RANK + NAME TAG CENTRED (owner 21/11 ~02:14Z): in the two-column card the rank line and the name at the top of the left column are centred over the figure, in every tab (Chí tôn «Hoàng thượng» included).
- §6.3h PERSON INFO BLOCK = FIXED HEIGHT, ONE LINE PER ROW (owner 21/11 ~05:15Z #86, option A; review/kit-info-fixed): every row of the person info block (`.pc .pcf .kr`: Sở trường · Tính nết · Đã biết · Dạo này …) is ONE line (`white-space:nowrap` + «…»). A value longer than its line gets a kit round «!» (`kitNoteBang`, `.kgnb`) at the end of the row; tap → the kit popup titled with the row label holds the FULL text (the «Dạo này» court story stays whole there, and under «Chuyện cũ»). The block never grows with text, so the action list is always right under it and only the action list scrolls (§6.3c frame). `kitInfoOneLine(root)` measures after layout; run by the panel observer + on resize, no host calls it. Whole group = every person card (Chí tôn / Phi tần / Nam nhân / Cung nhân / Hoàng tự / maid pop-up). Test `node dev/test/kit-info-fixed.js <url> [WxH,...] [rv,staff,court]` (injects a 3-sentence «Dạo này»: block height unchanged, every row one line, «!» present, popup holds the full text, first act visible under the block).
- §6.3i LEFT COLUMN SCROLLS WITH THE CARD, NEVER SILENTLY CUT (owner 21/11, MAIN 89 mark #38; rv FAIL round 1 → fixed): the figure ALWAYS fills the column width (OD 18/11 21:20Z, 21/11 ~03:54Z — it is NOT shrunk to fit; `kitPcKeyFit` stays the no-op that keeps the natural width). The rows already sit up (§6.3f/kit-leftcol-read). What still does not fit the card height scrolls with the card (the card is its own scroller, thin always-on bar) and an explicit «more below» cue shows: class `kpmore` (set by `kitPcMore`, on every `.pc.kpwide` that scrolls and is not at its end) paints a bottom fade (sticky `::after`). Both `kitPcMore` and `kitPcTagColour` run after every render / renderStage, from the person-card observer, once more 500 ms later (`kitPcLate`), `kitPcMore` again when a block of the card changes size (ResizeObserver: pictures, late rows), when web fonts finish loading (`document.fonts`), two frames after every render, on scroll, and in the SAME microtask a card becomes `.pc.kpwide[data-k2]` (MutationObserver: pages that rebuild their card every few seconds, e.g. the rival tab, no longer blink without the cue — r6). Test `dev/test/kit-mark-fix.js` (a world without the scene's person = SKIP; every scene is measured on the settled page AND again 1 s later, both must pass; `REP=n` repeats every scene).
- §6.3j RANK + NAME = ONE COLOUR on the person-card tag (OD 16/11 16:10Z «Rank+name one colour: OK», 21/11 04:33Z; MAIN 89 check #3): the name under the rank line takes the rank colour in PURE CSS (r6, no JS timing): `pcHead` (j15) puts the same `--rt` on `.pcname` and `.pcrk`, and `.pc .pcl .pcname:has(~ .pcrk)` uses the rank line's own colour expression (`var(--rt, …--rc…)`), so both match from the first paint; `kitPcTagColour` remains only as a fallback for a rank line built outside `pcHead`; same unit as the story text (§48.3). kit-rankunit itself does not touch this header; this rule does.
- §6.3g ONE ACT CARD EVERYWHERE (owner 21/11 ~04:52Z «nút to nút nhỏ» repeated ≥3 times, OD L980–981; review/kit-act-grid; the approved «Dò hỏi gia thế» sizing): the §6.3 card form (square picture + title + Tốn/Được beside it, everything else in the full-width box under, `kitPcActSplit`) applies to EVERY compact act card outside dialogs: `.pc>.pcr`, every `.kpanec` host — Tài nghệ skill cards (`.kskacts`: Tự học / Học với thầy / Các lỗi, sách phổ), Tư trang › Việc (`.rbtn`), quick acts, pop-ups. ONE picture size per DEVICE (`--kpa-d`): iPad (html.kv2) 96, Fold 84, a narrow panel (html.kpnarrow, < 480 px measured on #panel by `kitActPicSize`) 72 — the same everywhere, no per-card form (kasq / tall / fill-to-text are gone for these hosts); ONE card per line (`.kskacts` is one column now, `.kpanec .rbtn` a flex column): no side-by-side cells, no cards of unequal heights. NOT touched: the big Hành sự deck (`.cards`, §6 big card), dialog option cards (`.kopt`, §6.2b). Test `node dev/test/act-grid-scan.js <url> <out> 755x1000,1180x820 [art,inv-viec,act,tab-rv,tab-staff,pop-maid]` (picture square and the one size, only Tốn/Được beside it, box under and full width, no two cards side by side). Before the change: Tài nghệ cards 72x72 / 72x96 / 56x56 in a 2-column grid with heights 74–182 px; Tư trang › Việc 170x170 pictures, 2 cards per row on iPad.
- §6.3c ONE PERSON-TAB FRAME (owner 21/11 ~02:36Z): in every person tab (Hậu cung ×4, Giao tình `.krelpg`, Hoàng tự ×5) the TOP BLOCK (pane bar, sub-tabs, face / mother strip) is FIXED, only the person card below scrolls INSIDE itself (`#panel.kpfr` set by `kitPcFrameMark` after every render / panel mutation; NO `:has()` on #panel — it cost +30 % tab time in quickcheck). The left column is part of the card and scrolls with it.
- §6.3d INTRO LINES BEHIND «!» (owner 21/11 ~02:38Z): the intro / explanation line(s) above a person strip (`.pgwrap > .ph`: Hoàng tự tabs, counts) are not drawn; a round «!» (`.kppbang`) at the top-right of the top block opens them in the kit info popup (`kitPcIntroBang`), so the top block is ONE fixed height whatever the text (strip top 229 px in kin / kvo / qt, Fold + iPad).
- §6.3e FIGURE FILLS THE LEFT COLUMN (owner 21/11, Cung nhân + Hoàng tự shots): the figure is always the full column width (`kitPcKeyFit` no longer shrinks it for the key lines; the old 100 px portrait with empty bands is gone); the mother block (`.kpl`) always stands ABOVE the facts table in the info group, Fold and iPad alike.
- §6.3f LEFT COLUMN: NO EMPTY BAND, READABLE ROWS (owner 21/11 ~03:32Z, person dialog «Bảo Châu»: figure, an empty band, then tiny relation rows squeezed at the bottom): the relation / key rows (`.kpkey`: Nàng → ta, Ta → nàng, Thích, Ghét, status chip) start 10 px under the frame's band bottom, over the pendant + tassel (§4.1c, owner 21/11 ~18:55Z) at a readable size (>= 11.5 px; was ≈ 9 px: `.kpkey` .92rem, `.kr2-cp` 1em, heads .8em, chips >= .8rem). Same rule in every person card / dialog (the stage pop-up, every tab). Test `node dev/test/kit-leftcol-read.js <url> <out> 755x1000,1180x820 pop-maid,tab-rv,tab-court,tab-staff,tab-kin`.
- HOW (one place): CSS `#kit-pcard-actrow` (jk4) + `kaNorm` now ends with `kitActCompactOn(root)`, so any host that normalises its cards (pop-up, tabs, dialogs
  that embed a person card) gets the picture slot and the row form with no call of its own. Nobody writes act markup / grid CSS for a person card by hand.
- NOT in this rule (own approved kit parts): the Hành sự deck (`.cards` in #panel, §6/§6.1 big card and its category tabs), dialog options (`.kopt`, §6.2), the
  Tài nghệ `.ktacts` rows. Reviewers FAIL any `.pcb` / `.rbtn` / `.srvb` act drawn as a grid cell.
- SAME FAMILY — gift / work-gift recipient rows (Tư trang → Dâng, tặng tác phẩm / Tặng quà, `jgift`, owner 16/11 iPad landscape): the recipient rows are §6.2 option
  rows, so (a) a row hidden by its sub-tab (Chí tôn / Phi tần / Cung nhân) must STAY hidden: the hide rule now out-ranks the compact-card `display:flex`
  (`html body #modal .kgiftdlg .opt[hidden]`), and the filter runs on every draw, not only when the tab row is first built (Chí tôn showed the whole harem);
  (b) the LEFT picture of a recipient row is that person's own kit portrait (`face:gift`; strangers = the kit silhouette from `pv`), never the generic scene picture
  + a silhouette chip; (c) the tab count = rows of that tab. Chí tôn = Hoàng thượng, Thái hậu, Hoàng hậu only (j61 known-name rule for her name: "Hoàng hậu ???").
- SAME FAMILY — PERSON-TARGET PICKERS (spy target "Sai … đi dò la", gift recipient, evidence / item target, plant servant, any "chọn người"): the option's LEFT picture is
  THAT person's kit portrait (stranger: the kit silhouette from `pv`), never a scene / meaning-group picture. How: the option carries `kgt: <person>` (rival object / "emp" /
  "th" / "maid") — `kitOptPic` (jopic) reads it first; an option whose title starts with a portrait chip (`.md`) is treated the same. New picker = set `kgt`, nothing else.
- PERSON DIALOG OPTION LIST (kdper): the option rows are a flex column (rows grow to their text; the old grid rows stayed at the 130 px floor and cut long rows). When
  picture + text leave the list under ~280 px (tiny nested scroll box) the WHOLE right column scrolls as one list (`kdpall`, jk4 `kitDpAll`), the person pinned left.
- Test: `dev/test/pcrow-square.js` (square picture one size, only Tốn/Được beside it, box under and full width, «!» present when a note exists, tag centred; Fold + iPad; hosts rv/court/staff/kin/rel/pop-up) and `dev/test/pcard-actrow.js` (every person-card host × 5 design sizes: every act is a row ≥ 90 % of its group, one per line, no clipped child, equal
  treatment). Before/after table: `dev/test/pcard-actrow-table.md`. Kit sample page §47: "§6.3".

### 6.3b PERSON CARD AT SHORT LANDSCAPE (844x390; main s11 item 4, review/kit-keeper-2) — `kitPcWide` (jk2b)
One rule for EVERY person card (stage pop-up for maid / elder / consort / emperor, Hậu cung / Giao tình / Hoàng tự / Nhân sự tabs, the card in a dialog): when the screen is landscape and
at most 520 px high (a phone sideways), the card is the TWO-COLUMN card whatever its container width (`kitPcWide` returns true and sets `--kpcw` = 92 px): name, rank, picture and info chips in the
narrow left column (sticky, scrolls by itself when taller than the card), the acts (long rows, 6.3) in the right column starting at the card's top — the first act is on the first screen, never
500 px down a stacked page. Wider screens are unchanged (container rule 31.18). Test: `dev/test/pcard-land.js` (every host: acts beside the picture, first act fully visible without scrolling at 844x390; other sizes: no horizontal overflow).

## 15. STAGE OVERLAYS (j79) — nothing on the stage covers a figure
**15.1 Place subtitle (review/small-bugs-3):** the subtitle after the place name (`.stop .scene-t .rmsg`, "· Ở đây còn 1 người.") never shrinks under its
longest word (`min-width:min-content`; the title row wraps): 390x844 direct mode set it one letter per line. Test `dev/test/small-bugs-3.js` wrap.
- The status chips (`#hud2`) live in the header as its second row (`.hud2.khud`): collapsed = Buổi/khắc + Quẻ; expanded (▾) = every chip wraps
  in the header, which grows while the stage shrinks. Never an overlay on the stage.
- The date shows ONCE (header line), in the wording guide's words; the duplicate date chip is hidden. Every "T3/1" text anywhere (logs, news,
  intel, summaries, old saves) is rewritten on screen to "Tháng ba · thượng tuần · năm thứ nhất" (`kitDate(m,y,tuan,buoi,full)`; uses `VP.date`
  from j84 when present).
- The place title on the stage is the NAME only; the place description line is dropped for every place (a visit message stays, wrapped).
- No truncation: header name/date, Hoàng thượng box, stage name tags, face labels wrap (no ellipsis, no line-clamp).
- Test: Pixi figure bounds vs every `.stop` overlay rectangle must not intersect (stage.js in the kit owner's scratchpad; numbers in the report).

## 16. INTEL + EVIDENCE PANELS (j79 over j78 data)
- Person card: "Chứng cứ N ›" chip → `kitEvidencePanel(v)`: subject portrait, every piece as an evidence card (what it proves, how, when), then
  "Dùng chứng cứ" acts (`evidenceActs(v)`) as ACT CARDS (closed ones show the reason in Cần); tap runs `evidenceDo`.
- "Đã biết: N tin ›" chip → `kitIntelPanel(v)`: `kitIntel` rows from `intelOf(v)` (+ old `S.notes`), one fact per row with source and when;
  a fact that is no longer true carries a "nay đã khác" chip. The old one-line "Đã biết: a · b" is gone.

## 17. WORDING
Player-visible text follows dev/kit/VANPHONG.md (j84): a panel that only informs or closes has no button: ✕ + tap outside + Esc (32.10); dates as in section 15;
no %, no "điểm/chỉ số", no English. Kit row labels (Cần / Tốn / Được / Mất / Kèm / Ghi chú) and tab names are read from the live UI; the kit never
hard-codes tab labels.

## 18. KIT REVIEW: review/act-cards (j63) — ADOPTED
j63 (act card + result card, final head 1388289) is part of the kit: same tokens as the panels (`--k-hair`, `--k-lab`, `--k-card`), Cần row first
(drawn by j79 as ✓/✗ status chips), rows Cần / Tốn / Được / Mất / Kèm / Ghi chú, the odds chip is the 7-step meter, no clamping.
Kit-owner additions on top (j79): act art slot (6.1); per-row equal heights fitted to content; columns follow the real grid width (max 3, min 280 px);
"; " in a price line splits two values; Sức rule in Cần follows `SUC_FLOOR` (j80); scheme ok() conditions all have words (`LACK`); death risks as
ladder words from the real formulas; "có thể gặp người" → real words.


## 19. KIT 2 (kit owner #2, owner feedback 11/14)
- INFO ART: every rule / info / help panel (`data-kind` rule|info) shows a representative picture in the same frame (`.kpsubj.kpiart`) left of the
  structured body. `img/info-<key>.webp` (384x506) when listed in `img/INFO.json {"have":[keys]}`; else act-category art; else tinted brocade + topic word.
  Keys (`KIT_INFO`, title regex → key): nguy-hiem, ra-vao, que, bong-loc, an-thuong, sac, tai, tam-co, duc, tai-mat, thai-hau, hoang-hau, long, an-tinh,
  khac, lich, thai, lat-the, lanh-cung, cam-tuc, tranh-ghe, tuyen-tu, noi-vu, tan-gia-kho, phe-phai, chung-cu, suc, bac, phuc-duyen, tin.
  HUD help panels use the rule layout: "Là gì" row + "Ngươi đang có" (the live chip / meter).
- IDENTITY CARD ("Thân phận kiếp này"): her FULL-BODY figure (`figFor(S)`, `img.kidfig2`) stands on the origin background; the panel sits beside her
  (landscape and wide portrait: figure left, panel right, ≤54–58 vw) or under her (portrait < 600 px: figure above, height = space above the panel).
  Panel: name with rank title, origin · age, story line, tiles 2 per row, note, the two choices. Hooks kept for j86: `.kpid` (gets `.kpidf` when the
  figure shows; its portrait is hidden then) and `.kpnote`. A stale result toast is dismissed on every scene panel.
- STATUS (`#hud2`): expanded = columns by purpose (`.khg > .khc`): Tư chất (Sắc, Tài, Tâm cơ, Đức, Tai mắt) · Nhân tâm (Thái hậu, Hoàng hậu, Lòng) ·
  Ân sủng (Thai, Lật thẻ, Ân tình, Ân thưởng) · Thời gian (buổi/khắc, Quẻ, Bổng lộc) · Tình trạng (anything else); 4 columns, 2 under 600 px.
  Collapsed = Buổi/khắc + Quẻ in the header, and a Tư chất block (`#kstat`) on the stage top-left (or top-right) ONLY when it covers no figure —
  measured against `kitFigRects()` (her `#mefig`, every `#tokens .tok img.figimg`, using the opaque art box from j59 when known) on every render.
- STAGE NAME TAGS: one line, never cut (`white-space:nowrap`, no max-width), smaller under 600 px, so they never stack over a child's figure.
- SELECTION OUTLINE: `.ksel` = 3 px `--k-sel-ring #a8740c` outline + 7 px `--k-sel #fff3c4` halo + soft glow (face picker, picked options).
- WORDING: no "có thể" in previews/results — every chance is a ladder word from the real formula (`word(n)`), every effect its true delta
  (AOUT death/miscarriage/heir lines are computed for the card's target: `kitTgt()`).

- STATUS SHEET (kit 2): the expanded status is a SHEET laid over the lower panel (`#hud2 .khg`, fixed, placed from `#panel`'s box, header "Tư chất ·
  trạng thái" + "Thu lại"); the stage never shrinks or gets covered when it opens. Collapsed by default.

## 20. TAB GROUPS + SUB-TABS (kit 2, owner 11/14: 8 bottom tabs)
- **Replaced 11/15 06:00Z (owner, review/hau-cung-ui, jhc.js):** Hành sự · Dư đồ · **Hậu cung** (Hoàng thượng · Thái hậu `court` · Phi tần `rv` ·
  Nam nhân `men` · Cung nhân `staff`) · **Giao tình** (Ân oán `rel` · Phe phái `fac`) · Hoàng tự · Tư trang · Tài nghệ · **Mệnh truyện**. See §36.
- (old) Bar: Hành sự · Dư đồ · **Hậu cung** (Phi tần · Giao tình · Phe phái) · Cung nhân · Hoàng tự · Tư trang · Tài nghệ · **Mệnh truyện** (Mệnh truyện ·
  Việc nhờ · Sổ ghi). The game's tab keys stay (`rv rel fac story nho|quest|req log`); hidden member buttons stay in the DOM so `[data-tab="log"]`
  links keep working. Group table `KG`; a module adding a tab to a group adds its key there.
- SUB-TABS = the ONE segmented control `.ksub > .ksubb(.on)` (sticky at the panel top); labels are read from the live tab buttons (j84 wording).
  The last sub-tab per group is remembered (`localStorage hclh-kg-<group>`). Servant mode keeps its own tabs (no grouping). `tabsFit` (j57) stays
  the bar rule: one font size, 8 columns (2 rows of 4 under 700 px).
- Person-card group tabs show "làm được / tổng": `Hại nặng 2/5` (title: "làm được 2 trên 5 việc").

## 21. SKILL CARD = THE ONE HEAD CARD (kit 2; one form since review/tabs-kit r7, owner 11/15) — `dev/build/j79.js`
`kitSkillCard({kind, k, name, kicker, level, max, word:"Bậc", prog:[cur,need] | prog:cur+need:n, bar:false, desc, next, levels:[text per level], acts:[pbtn…], img, stepsAttr, can})` → `.kskill`
- ONE card for every art and Tứ đức course (Tài nghệ), every Tác phẩm line, the Mệnh truyện chapter head and the Sắc phong head, and every
  empty state (`kitEmpty(title,lines,o)` = the big empty card of §37.2). No other head / empty frame.
- LEFT: the painted picture as `kitSceneArt(src,name,{size:"thumb"})` (§28.19: 64 px square, 56 px on phones). `img` default = `kitSkillArt(kind,k)`
  (`img/art-<k>.webp` / `img/vir-<k>.webp` when in INFO.json have; else act-category art).
- RIGHT: kicker (small, e.g. "Chương 2", "Điều kiện sắc phong"), name + **kitSteps** (`max` segments + "<word> l/max"; with `stepsAttr` the steps are a
  button that opens the levels, e.g. `data-v85tab`), one desc line, tiến bộ bar `kitBar` (`.kskp`) or `kchip g "Đã tinh thông"` (`bar:false` = none),
  next unlock `kchip n "<word> n mở"` + what it gives (`next`, else `levels[level]`).
- BELOW: act cards (`pbtn`) in `.kskacts.pcb`, each in its own `.kpanec` cell (auto-fit grid, min 240 px): narrow cells give the compact act of §43
  (own act picture only). `can:false` dims a card (nothing to do); lists put doable cards first, mastered last.
- Deleted: the old per-level list (`.ksls`), the 170 px art column, review/tabs-kit's `kitSkillHead` / `.ksk2` duplicate. Sample: trang mẫu kit (§47).

## 22. PERSON STATS (kit 2)
Every consort card shows the player's stat set as kit tiles under the portrait (`kitPersonStats(v)`): Sủng · Đức · Danh · Sắc · Tài · Tâm cơ; unknown
values read "chưa rõ". Reveal hook: `window.kitStatKnown(v,key) -> true|false|null` (j61/j85 Đức stages, intel); `kitStatReveal(v,key)` records a
reveal in `S.kstat`. Defaults: Sủng from the Kính sự phòng book (`S.kf`), Danh public, Sắc once met, Đức via `ducKnown(v)` when present.
**Danh is public** (j61, kit review 11/14): Danh = tiếng tăm trong cung, what the whole palace says about a person, so it is the one number
shown even for a stranger (stage 0 "Người lạ"); every other tile reads "chưa rõ" until the matching reveal.

## 23. PORTRAIT PICKER (kit 2)
`kitPicker({id, title, items:[{k, face, label}], cur, rows:2, note, onPick(k)})`: small rectangular
kit frames (no tassels), whole rows only in pages (‹ ›, "trang 2/4" — never a count of faces: owner "đừng ghi số", 16/11; no inner scroll, no half row), selection = gold ring +
✓ badge on a pale-gold tile (`.ksel`), radio semantics, arrow keys + Enter/Space. **NO TABS (owner 16/11 s23, "bỏ cái tab đấy luôn, chỉ hiện ra
những cái khung avatar"): a face / avatar picker shows ONE list of frames, no "Phi tần 32 | Cung nữ 52" tabs, no counts on tabs; the GAME picks the set from her
identity, she never filters** — `kitFaceScope()` (j88, the one rule for solo + co-op + new life): a cung nữ life (palace maid, `isSrv()` / origin `cnv`) →
faces m01–m52 only; every other life → `facePool("all")` = the whole pool of 84 painted women of «90 nhân vật nữ» (every id has rank-ladder art).
(`filters` / `onFilter` stay in the part for a future non-face picker; no face picker passes them.) j86 (face pick on the identity card) is the only user; the standing figure follows.

## 24. VEIL OVERLAY (kit 2, for j70 scars)
`scarOf(p).veil` → the veil is drawn over the face in every tall portrait (`.kin > img.kveil`, over the portrait image box), every small frame
(`.kmini > img.kveil`) and on the stage figure (`.tok > img.kveilf`, at the head of the figure's opaque box from j59: 4–15 % of body height,
middle 40 % of its width). Assets: `window.KIT_VEIL = {por, fig}` (empty until review/wardrobe delivers the pearl-string veil; the old
img/veil*.png is rejected). Status chips such as "Hủy dung (vừa) · còn N tuần" use `kitChip(text,"no")` / `chip(text,"hot")` only.

## 25. DILEMMA OPTIONS WITHOUT RISK DATA (kit 2)
`dilLine` derives the rows from the option's own outcome code: each `roll(N)`-guarded `apply/ap(S,…)/die` → "<effect>: <ladder word>"
(gain → Được, loss → Kèm), unguarded `apply` → certain; a `roll(expr)` that can be evaluated gives the main odds word. Only the option's OWN
code counts (`dilSrc`, j17): a `go` that is a global scene / step function (`go:nightScene`) opens the next step and is certain here; a certain
`c6` option (no `p`) has no roll in its code (review/odds-meter-back).
ONE ODDS RULE (review/odds-no-unknown, law 4 + law 7): a rolled option whose line has no ladder word names the odds of its roll as `p` (the
SAME number its go rolls, also when the roll sits in a helper: toilAns, cnvRun, loDo, fzRun); `oddsLead(c,s)` (j17) puts `word(p)` first in its
line — used by `dilLine`, the j67 line (`c.j67`) and `kitOptModel`. There is NO "unknown" odds word: only the 7 ladder words exist; a chance
the player must not see (a poisoned dish) shows her real guard against it, the same for a clean dish (jpoison «Nhận ngay» =
100 − pgOdds(giver → her)), so the card is never a tell. Side chances keep `chanceW` (§ odds words). Gate: `node dev/test/odds-unknown-scan.js`
(static, every rolled dialog option, exemptions with reasons) + `node dev/test/odds-no-unknown.js <url>` (runtime, Fold + iPad).

## 26. HONOUR PODIUM · BỤC VINH DANH (j90, kit owner, owner 11/14) — screen 1 of every ranking result
Applies to EVERY ranking board of the game ("một lời phàn nàn là cả nhóm"): every contest that plays the j82 mini-game (`startContest`: j71 hội thi,
festivals, tranh tài…), Tranh ghế result (j34), hoàng tự khảo thí (j53 `.ktlist`), công chúa dâng nghệ (j54 `.h54list`), and any new ranking
(tuyển tú with a ranking, thi tài…) through the API below. Two screens: **screen 1 = the podium alone**, full screen, only the winners;
"Tiếp" → **screen 2 = the existing score board / result panel, unchanged** (`kitGameResult`, kit panel). The podium is never mixed into the board.

```
#kpodov (fixed, z 9000) > .kpod[.kpod-win when she is Nhất]
  .kpod-hd > .kph   seal VINH DANH (gold) + contest title + sub
  .kpod-stage       backdrop img/kit/podium-bg.webp (red drapes, gold clouds, no people). NO rays / halo behind anyone (owner 11/14: "giống hào quang")
    .kpod-col.kpod-p2 | .kpod-p1 | .kpod-p3      DOM order Nhì (left) · Nhất (centre, highest) · Tam (right)
      .kpod-fig     FULL-BODY figure (fig-*.webp for her dress tier and age via figFor; kids via kidFigSrc); stranger = img/kit/unknown-fig-f|m|k
                    (kitKnown false → name "Người lạ"); no figure art → the kit's tall 3:4 frame (`kitPortrait(p,{size:"lg"})`). Never a round avatar.
                    Per place a soft STAGE LIGHT (`--kl` colour): .kpod-beam = soft spotlight falling from above onto the person (in front, screen blend, faint),
                    .kpod-pool = oval pool of light at the feet on the step, .kpod-motes = a few small floating motes. Nhất warm gold, Nhì soft silver-white,
                    Tam pale copper-rose; higher place = a little brighter; all subtle. Her own column: a little brighter + "Ngươi" tag ("Con ngươi" for her child).
      .kpod-step    lacquered dais block (img/kit/podium-step.webp, border-image), Nhất step highest, Nhì middle, Tam lowest (heights fitted to content)
        .kpod-medal img/kit/medal-1|2|3.webp (gold / silver / bronze cloud medallion with tassels) + word Nhất / Nhì / Tam
        .kpod-plq   cream kit plaque: rank title + name (kitName, rank colour), sub (e.g. "Xuất sắc"), score "N phần", prize (kitChip or text, green)
  .kpod-ft          her place when she is not in the top three ("Ngươi đứng thứ 5 trong 5 người · 18 phần") + the ONE kit button "Tiếp" (.kbtn)
  .kpod-fx          confetti layer
```
Motion (CSS + Web Animations, transform/opacity only): Tam rises at 0.3 s, Nhì 1.0 s, Nhất 1.8 s (step grows, figure drops in, its light fades in).
The celebration FOLLOWS HER, whatever her place: paper + petals in her place colours (Nhất red-gold + plum petals, Nhì silver-white, Tam copper-pink) burst
from HER figure when her column appears and fall over HER step, then a light petal fall over her step; at Nhất a little stronger (second burst, longer fall).
Outside the top three: only the place lights, no confetti. Tap anywhere (not the button) = skip to the final state; Enter/Esc = skip, then Tiếp.
`prefers-reduced-motion: reduce` → final state at once, no motes, no confetti.
Layout: figures sized by the free height (`--kfh`, Nhất 100 %, others 84 %), never cover the plaques; plaques wrap text (no truncation), no horizontal
scroll; tested 755x1000@2, 1180x820@2, 1366x1024@2, 412x1058@2, 390x844@3, 1024x768@2 (shots dev/shots/podium/).

API (data only):
```js
kitPodiumShow([{who:person, score:75 /* or "8.5 phần" */, place:1, prize:[["Sủng",8],["Danh",3]] /* or "Phong Tần" */, sub:"Xuất sắc"}, …],
              {title:"Hội Thượng nguyên", sub:"Môn Thơ", next:"Tiếp", onNext:fn});   // ≥ 2 entrants, else nothing shown
kitPodium(list,o)            // HTML only (no overlay)
kitPodiumTag(qItem,list,o)   // a Q item shows the podium first, then its panel (non-enumerable: never saved)
kitFigOf(person)             // full-body src (figure, kid figure, or stranger silhouette)
```
Art: Magnific gpt-2-6, 1 style ref (face-consort-01), folder ba4aecfe…; no faces. medal-1..3 (240 px, keyed), podium-step (512x384), podium-bg (1344x752).

## 27. WEEK REPORT FLIP-BOOK (j87) — `kitBook({pages,onClose})`
The week summary (dawn) is an old ledger she turns page by page. j87 replaces the j79 week panel; "Vào ngày mới" on the closing page
(button id `dawn-go`) closes the book and the day goes on as before. The ✕ at the top right (kit-x, 32.10), a tap on the ground around the book or Esc closes it at any page.

Pages (data only; kitBook never takes markup for structure):
```js
kitBook({head:"Sổ tuần · Tháng tư · thượng tuần · năm thứ nhất", host:el, onClose:fn, pages:[
  {kind:"cover",  title:"Sổ tuần", sub:"<date>", note:"Hạ · nắng gắt"},
  {kind:"text",   title:"Tổng lược", sub:"…", blocks:[{h:"Quẻ tuần"},{rows:[[l,v,cls]]},{chips:[["Sủng",3]]},{facts:[…]},"html"]},
  {kind:"person", who:v, chips:[["Thiện cảm",5]], rows:[["Hiện nay",[…]]], blocks:[{facts:[…]}]},
  {kind:"end",    title:"Tuần này đến đây là hết.", seal:["HẾT","TUẦN"], note:"Sổ ghi 12 việc, 4 người.", btn:"Vào ngày mới"}]})
// → {next(), prev(), go(n), close(), cur, max, mode, relayout()}
```
- Blocks use the kit pieces only: `{h}` section label (`h4.kpst`), `{rows}` = `kitRows`, `{chips}` = `kitChips`, `{facts}` = `kitFacts` (one block per
  fact so a page can split between rows). A heading never ends a page.
- Week content (`wkBookPages()` from the saved log since `S.wkSnap`): cover → **Tổng lược** (date, tiết, Quẻ tuần rows, her deltas as chips,
  rank/children, Bổng lộc row "Đã lĩnh …" or "Kỳ tới: còn N tuần", "Sổ này ghi" = names with faces, "Việc của ngươi" facts) → **one page per person**
  (Hoàng thượng first, Thái hậu, then by number of facts): large kit portrait `pframe` (3:4 frame with tassel), rank title + name, this week's
  delta chips (Thiện cảm / Ghen / Oán from the per-person snapshot `S.wkSnap.pp`; Sủng on the Emperor's page), "Hiện nay" row, facts →
  **Triều đình · thiên hạ** → closing page. Sentences without a name follow the previous sentence of the same log line; repeated lines show once
  with a "N lần" chip.
- Fit: pages never scroll. Each page is filled in an off-screen measure page of the real size; what does not fit continues on the next page
  with the title + "tiếp theo". Re-paginated on resize/rotation (keeps the current page).
- Layout: two-page spread when the viewport is ≥ 900 px wide and landscape (iPad 1180x820, 1366x1024), the closed cover centred; one page at a
  time otherwise (Fold 755x1000, phones). Person page: portrait column `--por` beside name/chips/facts; under 440 px page width facts run full
  width below the portrait. Font scales with the page (`--fs` 13–17 px).
- Turning (page-curl kit, §34): drag/swipe follows the finger with the WHOLE-SHEET turn (§34.0 `kitSheetTurn` via `kitCurl`: the sheet swings around the spine, both faces printed with their pages; `KIT_TURN_MS` 800 ms);
  release past ~40 % or a flick completes, else it falls back. Tap the right/left page edge, the ‹ › buttons, ←/→/PageUp/PageDown, Esc = Lui.
  `prefers-reduced-motion` (or Cảnh động off): cross-fade instead of the turn. Soft paper sound with the Tiếng động slider.
- Art: `img/book-cover.webp` (indigo thread-bound cover, title label strip: the title is written in it, word per line), `book-right.webp`
  (right/single pages, stitches on the inner left edge), `book-left.webp` (left pages of a spread, stitches on the inner right edge),
  `book-end.webp` (closing page; the HẾT TUẦN seal is placed in its seal box). The art is stretched to the page; content sits inside the red
  double border. Without the art: CSS paper with a red double rule and a CSS cloth cover (same layout).
- Event art (j89 `evArtOf`): every fact row of the week (Việc của ngươi, person pages, Triều đình · thiên hạ) carries a small 3:4 print of its
  event on the right (`.kbk-ev > .kfacts + img.kbk-evart`, 3×4 em, cream mat, thin red line, slight tilt). The sentence picks the event id
  (`kbkEvId(text, ctx)`: thị tẩm → sys:thi-tam, có thai → sys:co-thai, đầu độc → plot:poison, tin đồn → plot:rumor, Được mùa → qs:mua, sứ thần →
  qs:cong …); a sentence with no match takes its page's context (world → triều chính, Hoàng thượng → sys:mood-vui/gian, Thái hậu → thỉnh an,
  others → có người đến chơi). No manifest yet → no print (the row stays as before).
- "Hiện nay" row: each "label number" pair never breaks inside (`.kbk-pair` nowrap; pairs wrap as wholes). Page < 440 px: the row moves under the
  portrait (first block of the full-width flow).
- While the book is open nothing covers it: the floating result card (`#rtoast`) is dismissed when the book opens and hidden while it is open.
- Re-measured when the web fonts finish loading (no early page break from fallback-font metrics).
- Book art is published from the 768x1024 originals (no blur at @2/@3).
- Cover seal vs. hint (review/book-title r6): the cover `.kbk-in` is a size container and `.kbk-cseal` gets `margin-bottom:max(0px,calc(3cqh + 2.2em + 4px - 7cqw))`, so the TUẦN seal always clears the page-turn hint, also when the hint wraps (844x390).
- Wording (VANPHONG): Sổ tuần, Tổng lược, Bìa sổ, Trang N / M, tiếp theo, Tuần này đến đây là hết., seal HẾT TUẦN, Lui, Vào ngày mới.

### 27.1 COVER TITLE PICTURE · `KBK_TITLE_IMG` (owner 11/15, review/book-title) — `dev/build/j87.js`
The cover label of the Tuần lục shows the title as a brush-written picture, not as text: `img/title-tuanluc-d4s.webp`
(https://ctm-img.victoria-tntt.workers.dev/img/title-tuanluc-d4s.webp, 160x1200 RGBA cut-out: T-u-ầ-n-l-ụ-c stacked, aged ink, and at the
foot the game's own red Trân nữ seal (§39 kitSeal SVG rendered to PNG, 62 px, dulled toward the ink) in place of the plum-blossom seal of the
owner-picked render d4).
- `KBK_TITLE_IMG = {"Tuần lục": KBK_ART.title}`: a cover page whose title is a key here (or that passes `titleImg:"img/…"`) gets
  `<img class="kbk-ltimg" alt="<title>">` in `.kbk-label`; the `.kbk-lt` text stays in the markup (`.has-img`) and is shown instead whenever the
  cover art or the title picture has not loaded (`KBK_ART.title` is preloaded like the other book art → class `art-title` on `.kbk`).
- Placement (art cover only, `.kbk.art-cover.art-title`): the picture fills the label slot minus 12 px in width and 20 px in height,
  top-aligned 10 px inside (`object-fit:contain; object-position:50% 0`), so it scales with the cover at every size.
- The running header (`Tuần lục · Tháng …`), the dialog label and every other title stay text.
- New book titles: write/cut the picture (tools: review/act-pics2 `dev/figwork/title/cutout.py`; seal swap
  `dev/figwork/title/seal_swap.py` + `seal_render.js` on this branch), push with cdn_sync, add one key to `KBK_TITLE_IMG`.
- Test: `node dev/test/book-title.js <build url> <outdir>` (cover at the 5 sizes; checks picture drawn inside the label, text hidden,
  header text, overflow, broken images). Kit page sample §27.1.

## 28. KIT 2b (kit owner #3, owner feedback 11/14) — `dev/build/jk2b.js`, loaded just before j84
### 28.1 PERSON CARD PORTRAIT CELL (one cell for everyone)
- Every `.pc` (consort, servant, child, court, men…) draws its portrait in ONE cell: the WHOLE frame canvas, top edge to the end of the tassel
  (canvas x 0–550, y 0–1037, aspect 550:1037). The crest room above the photo window is always kept (Hoàng hậu's phoenix, the Emperor's
  dragon, Thái hậu's phoenix show whole; low ranks simply show brocade-free headroom), and the jade pendant (ngọc bội) + tassel (tua rua) under
  the band are ALWAYS drawn whole (owner 15/11 06:35Z; review/tassel-fix — replaces "the pendant/tassel is not drawn in the card").
  The cell keeps its width, so the photo window keeps its size (no zoom, no shrink); the cell only grows downwards and text below/beside it
  flows after the tassel (it is in the layout box, never an overflow that could cover text).
- Cell width `--kpcw` is the same for every card on a screen (`clamp(150px,34vw,230px)`; ≥1000 px `clamp(170px,17vw,230px)`), so the photo window
  (384x506 canvas units) has the same size for every rank and role. Nobody sets another size.
- Layout: portrait floats left; name, rank title, ghen line, stat tiles and the info rows sit beside it; act groups run full width below.
  The Fold (755x1000) shows portrait + name + rank + the first info rows without scrolling; the card scrolls as one block (`.pc` overflow).
### 28.0 ONE FRAME FUNCTION (owner 11/14 B) — `pcPort(face)` everywhere
- Every portrait frame — person card, dialog subject, act-art frame, small frames in face strips (Bảng phẩm vị, pager), header, Hoàng thượng
  box, chips, facts, podium, week book, strips — is the SAME `pcPort` cell (j60 layers on the 550x1037 canvas). `mdH(face,size)` calls pcPort
  and shows the same cell at a smaller width (`span.md.kit.kfc`, xs 26 px · sm 38 · default 60 · big 84; aspect 550:1037 since tassel-fix). No other frame
  markup exists (the old cropped `.kmini` body frame is gone). A change to the frame shows at every size.
- Cell = the whole canvas x 0–550, y 0–1037 (aspect 550:1037): crest room on top, photo window, band, jade pendant + tassel — at EVERY size
  (person card, dialog subject, header, face strips, plaques, Sổ ghi / Tuần lục rows, gift recipients, kit page). `mdH` sizes are widths
  (xs 26 · sm 38 · 60 · big 84 px), height = width × 1037/550; frames in one row share their top line, so a row of frames stays aligned.
  The header portrait keeps the width it had when crest+window+band equalled her name block (§32.12 `--kmeh` × 550/795); the pendant hangs
  below inside the header. No rank-ring box-shadow around the small frame (the frame art is the border). Scan: `dev/test/tassel-scan.js`
  (every `.kin` on 23 views: visible share of the canvas must be 1, photo-window width unchanged, no text over the pendant zone).
- Portrait placement (owner 11/15, `dev/build/jkpor.js`, replaces the fixed 5 % raise of C1 below; the 1.14x scale is KEPT, never zoom): per por picture
  the top of the head (first opaque row, hair ornaments included) is moved to 3 % of the window under its top edge (lift capped at 0.14 so the
  picture still covers the window bottom; more body shows below), and the BODY (mid-point of the shoulder/chest rows, head ignored) to the
  window centre (offset capped ±18 % of the picture, and — reviewer r6 — never so far that the picture's own painted side edge comes inside the window). Same rule in every pcPort cell and size (card, strips, header, rows). Measured on all
  faces c01–c32: scale 1.14 before = after, head gap 2.9 px at a 96 px window (one capped at 8.5), body centre 0 % (before −16…+11 %).
- Portrait cut (C1): the por picture is 1.14x the window, raised 5 % of its height and clipped to the window (head near the top edge, the
  person larger); old `face-*` art and the grey silhouette keep the plain window.
- Crests (C2): every rank and role has its own crest on the top bar, `img/kit/crest-<key>.webp` (gpt-2-6, one style reference = the approved
  Hoàng hậu frame; sheets in Magnific folder ba4aecfe…): consort-0 plum sprig (wood) · consort-1 orchid (green lacquer) · consort-2 silver lotus
  · consort-3 clouds + pink lotus · consort-4 small luan + chrysanthemums · consort-5 luan + red peony · consort-6 small phoenix + amber ·
  ONE top ornament per frame, never two: the small motif painted at the top centre of consort-0..5 and unknown frames was removed from the
  frame picture (corners kept) and the crest stands on the bar; frames whose painted top is already a full crest keep it and get no extra crest
  (Hoàng hậu phoenix, Hoàng thượng dragon, Thái hậu, Thái tử, HQP twin phoenixes, guard tiger, prince qilin, princess phoenix + peach, royal python,
  official crane, physician bamboo, man jade disc, cold bare plum, head eunuch cloud). maid-0..4: a flower/bell spray standing ON the silk bow painted on
  the maid frame (jasmine + jade bead → jade plum → silver plum + silver bell → silver plum + jade bells → gold plum + pearls); ma ma 0..4: silk
  bows on the cartouche; eunuch 0..2: jade ring above the whisk. Width grows with rank (300→432 canvas units for consorts), base on the top bar (y 172).
  Data: `KIT_CREST` {ar, base, w, key(frameUrl), html(frameUrl)}; a new role adds its crest here.

### 28.2 STAGE SCALE — owner is j59 (main) since the main merge; jk2b's scaler is retired (section 16 of jk2b). j59's height cap raised to 90 % of the stage (owner A). Text below kept for history.
- `kitStageScale()` after every `renderStage` + resize: every adult figure (her `#mefig`, every `#tokens .tok.fig img.figimg`) gets the SAME height
  `--kfig` (all fig-*.webp are cut head-to-hem on 900 px); children keep their j73 age ratio of that height. Feet on the floor line `--kfb` (26.3).
- Height (owner A): the figures fill the stage — feet on the floor band near the bottom (KIT_FLOOR feet line 90 % of the way from the floor
  top to the picture bottom), head ~2.5 % under the top edge; room under the feet for the name tags.
- Nobody is cut at the stage edges: a last check (`kitStageEdge`) shifts the group inside a 6 px margin, else shrinks everyone once more.
- Crowded row: figures never overlap (owner OD:L1049; review/stage-slots-fix-r1): the old row scaler `kitStageScale` is retired (j59 + the kit slot function, §33.7, lay the stage out); a crowd scales down by ONE common factor, then pages.
  When she is on stage with others she stands at the left and the row takes the rest of the width.
- Name tags hang under the feet (absolute, one line, never cut). When neighbours would touch, tags drop to 2 or 3 staggered lines and the
  floor band grows to fit them.
### 28.3 STAGE FLOOR
`KIT_FLOOR[picture] = floorTop` (fraction of the room picture where the floor starts); the crop keeps the floor; `--kfb` feet bottom, `--kfh` room
for the figure. Phone portrait: stage 40 % of the screen on scene tabs, 24 % on card tabs (Hậu cung, Cung nhân, Hoàng tự) so the card has room.
### 28.4 TRONG CUNG BLOCK (Hoàng thượng · Thái hậu · Hoàng hậu)
- `kitCourtHTML(cls)` → `.kcourt`: per person a row = small kit frame (`mdH xs`) + name + "Tâm trạng <word>" + "Với ngươi <word>" (green/red/neutral
  `.ef`), "chưa rõ" when unknown. Tap a row = that person's card (Hoàng thượng `showEmp`, Thái hậu → Giao tình on her, Hoàng hậu → Hậu cung on her).
- Header chips (owner E): Thái hậu and Hoàng hậu chips (`#kcchips .kcchip`: mini frame, title, mood) beside the Hoàng thượng box on wide screens
  (≥1000 px), at the right end of the status row on the Fold and phones. Tap = card.
- The full table is a "Trong cung" column in the status sheet (`#hud2 .khg`). Nothing of it is on the stage; the Tư chất block also left the
  stage (it is in the sheet: "▾ Tư chất").
- Hooks (data only): `window.kitCourtMood(who)` → text|[text,"g"|"r"]|null, `window.kitCourtKnown(who)` → bool (who = emp|th|hh). Default: the
  Emperor's mood is public (MOODS), Thái hậu / Hoàng hậu moods "chưa rõ" until a module says; attitudes from Sủng / `S.th` / `S.hh` (`affW`).
### 28.5 "COVERS NO FIGURE" = the painted silhouette
`kitFigRects()` (j79, replaced in jk2b) returns per figure 24 horizontal bands with the opaque extent of the art (alpha mask read once per picture),
so stage blocks may stand beside a head or between figures, never over the painted body. Used by #kstat, #kcourt and every later stage overlay.
### 28.6 OPTION MODE "cost" (hidden outcomes for EVENT choices)
- EVERY event choice (owner 11/15 14:30Z: main story, side stories, festivals, NPC visits, toilette reactions, servant matters, the palace
  grant, contests… — every event) shows ONLY the cost: the Tốn row with Sức / khắc / Bạc (`.ka.khideout`) and the Cần row; no Được / Mất /
  Kèm / Ghi chú rows; the head keeps the kit ODDS METER (see the kitOptOdds line below). NO COST → NO Tốn row (owner 13:25Z / 17:08Z: never "Tốn: không"; see §42.6). Active acts (Hành sự, person-card acts,
  their pickers, the shop, gifts) keep the full numbers (owner 15:05Z).
- WHICH dialogs are events — `kitIsEventChoice(m)` (jk2b), ON BY DEFAULT:
  · every item built from a PEND entry (`mkP` / `pushDil` / `pushFront`: it carries `pid` / `pp`) EXCEPT the active-act pickers in
    `KIT_ACT_PIDS` (giftpick, plantpick, taintpick, evpick, itarget, shop, plantsv, wkgive, runner, vlget, vlcraft, vlnvp, vlout, htban, h54ban);
  · every item a builder flags `ev` — approachOne (Có người đến, Thái hậu triệu, Kẻ hầu xin, Một ánh mắt, Lời mời vào phe), FESTEV
    festivals (`ev:"fest"`), Việc của kẻ hầu, Ban cung, the contest rounds (Tranh ghế), the festival contest entry (j71);
  · a kit choice panel (`kit.kind:"choice"`).
  An item flagged `act` (its own act's picker / confirm: Nội vụ phủ đưa người, Xuất gia?, Kiếp này chưa trọn, a map card, the learning
  pickers, Hảo hữu tìm đến), `shop` (Hàng chợ đen) or `showOut` is never an event. A NEW builder with choices must carry `ev`, `act` or `shop`
  (or come from PEND): `python3 dev/test/opt-scan.py --fail` lists every call site and fails on an unclassified one.
- KIT PART `kitHint(o, m, lv)` → `{hint}` (jk2b; pure, also for bots — review/event-balance). Read from the option's OWN data (fx + its
  x / j67 line as `dilLineRaw` writes it: the odds, people and state of THIS moment), so it is TRUE now and changes with the context — no
  fixed answer to learn (owner 15:10Z). Words only, no stat number (a count in a story phrase is written in words: "hai mươi trượng").
  Order: the main gain first, the rough chance, the price beyond Tốn ("nhưng …"), what a failure brings ("hỏng thì …"). A story phrase of
  the data keeps its own words ("cha hài lòng", "cả họ bị tru di", "lộ là chết", "lần này không thể có thai"). Never a filler word
  ("chuyện khác", "có cái giá", "có lợi về …").
  · Clarity by her Tâm cơ / Tai mắt (`kitHintLevel`, `BAL.hintMid` 25, `BAL.hintSharp` 45, `BAL.hintMat` 3):
    0 VAGUE — generic people ("được lòng bề trên", "hạ được đối thủ"), no chance word; a deadly failure is always said ("hỏng thì mất mạng").
    1 PLAIN — the roles (Thái hậu hài lòng, Hoàng hậu phật ý, bệ hạ để mắt hơn), the size "(nhiều)" / "(chút ít)", a rough chance
      ("dễ thành" / "thành bại khó đoán" / "khó thành") and the failure ("hỏng thì cả họ bị tru di").
    2 SHARP — names ("Hoa Băng Tâm thất sủng") and the reading of the moment the data carries ("ngài trọng tài, rất hợp").
  · A hand-written override per option: `hint` (string or fn(lv)); it may never lie (must match the data).
  · An option with NO odds word (a decision, no roll) cannot fail: its "Mất:" items are a sure price and read "nhưng …", never "hỏng thì …" (review/pets-fix-r6: ts-b "Nhịn"
    read "hỏng thì mất thể diện").
- KIT PART `kitHintRow(text)` → the row `Gợi ý | <span class="ef i">…</span>` (`.kr-hint`; `.ef.i` = dim italic value, kit act-card CSS j63).
- KIT PART `kitOptOdds(b)` (jk2b, owner 19/11 ~01:48Z: «để lại cái thể hiện cái đó như cũ») → the option head shows the kit ODDS METER `kitOdds`
  (§ odds meter, j79: 7 segments red → green + the VANPHONG ladder word Liều / Khó / Năm ăn năm thua / Khá chắc / Chắc / Rất chắc / Nắm chắc;
  tap = the ladder). The meter is the card's own `.kat > .kodds` (kaNorm → kaOdds → oddsChip from the option's line = the odds the roll uses,
  law 4; a rolled option names its odds by `p`, §25 ONE ODDS RULE); kitHideOut never removes it. An option with no roll (a certain outcome)
  gets the same meter at «Nắm chắc». Only the 7 ladder words exist (no unknown word, no unlit meter). Never a percentage.
  The «an toàn / có rủi ro / liều» risk chip (kitRisk, `.krisk`) is RETIRED everywhere.
- After the choice the result card (section 7) shows the full Được / Mất + why, and the Tuần lục logs the truth.
- Balance of the hidden outcomes: audited by bots on review/event-balance (owner 14:30Z / 15:10Z), which builds on `kitHint`.
- Tests: `dev/test/opt-render.js` (every PEND event dialog + every direct builder + every act picker + the real night + clarity; `--bot`
  classifies every dialog the bot meets) and `dev/test/opt-scan.py` (static: every call site classified).
- Use (data only): `Q.push({…, ev:1, opts:[…]})` for an event built outside PEND; `act:1` / `shop:1` for an active act's picker / a shop;
  `hideOut:true` on an item or one option hides it too; any other priced button: `data-khide="1"`.
- KIT SAMPLE PAGE: the one page of §47 (`#kit`, jkitpage.js) — samples "§53" (kitChip tones, the 7 odds-meter steps, an event option in cost
  mode run through the real modal markup + kaNorm → kitHideOut: odds meter + Tốn + kitHintRow, no Tốn when free, a certain option at «Nắm chắc»;
  kitResultSeal ×3, kitKemRow).
  (The duplicate `?kit` / `kitSample()` page of review/opt-render was dropped by reviewer r7.)

### 28.7 PERSON CARD: portrait and bars always in view (owner D)
- Left column = portrait cell, name, rank title, the BARS (`.kpbars`: Ghen, Ngươi với nàng · thiện cảm, Oán, Nàng với ngươi, Sủng).
  Right column (`.pcr`) = facts (`.kpfacts`: stat tiles, age, nature, chips) → act-group tabs (`.pctabs`) → act cards (`.pcb`).
- Screens ≥600 px (Fold, iPad): two columns; the left column is sticky (own scroll if taller than the card) while the right one scrolls, so the
  bars stay visible next to the buttons; facts, act tabs and act cards sit in the right column beside the portrait for EVERY card (consort,
  servant, child, court).
- Phones (<600 px): portrait left with name, rank and bars beside it; facts, tabs and act cards below. When the portrait scrolls out, a slim
  sticky strip (`.kpstrip`: small frame, name, rank, the same bars) stays at the top of the card.
- After an act the bars run from the old value to the new one (0.6 s, `KIT_BARW` remembers the last width per person and bar; none with
  prefers-reduced-motion). j93 kit-motion may replace the easing, not the markup.

### 28.8 VEIL + SCAR LAYERS (review/wardrobe j92)
- Layer order everywhere: portrait < scar strokes (`img.kscar`) < veil (`img.kveil2`) < frame. Placed per picture from `KIT_SCAR.fit` /
  `KIT_VEIL.fit` (`style(file,tier)`); the por-* boxes were re-derived from the fig-* boxes through the porcrop geometry (the por pictures were
  re-cut after the fit was measured). No fit data → nothing drawn (never a guessed place).
- **AVATAR = ID CARD (owner 17/11 ~18:10Z; review/kit-fx-register, jk2b.js `KIT_LASTING` / `KIT_BAKE`)**: every avatar-class frame (pcp tall, span.md / kmini / kfc,
  lists, cards, pickers: everything built by `pcPort` / `mdH`) shows the BASE PORTRAIT + LASTING marks only (today: the hủy dung scar; pox scars etc. plug in with
  `KIT_LASTING.add({id,layers:(p,file)=>[{id,src,rect:[l,t,w,h,deg],o:[ox,oy],alpha}]})`). NO makeup, NO temporary mark (slap, rash, pallor, poison, ink, veil: the veil is worn, never on an avatar, kept on stage figures) on any avatar, hers included. The lasting marks are BAKED with the photo into ONE image (canvas -> blob URL, cached per picture + marks + size
  bucket tall 384 px / small 192 px, LRU 80, revoked 60 s after eviction) and the avatar `<img>` simply gets that src (`data-kbk` marks it until the bake is ready,
  then it is swapped). There is NO `.kfxc` / `.kfx` overlay box in avatar frames any more (the old box mis-registered by 5.5 %: lips on the chin, scar beside the cheek).
  A person without a lasting mark gets the plain photo: no canvas, no cost. Do NOT add per-frame overlay boxes; add a layer to `KIT_LASTING` instead.
  Stage figures (`kitFxPut`, `.kfxf` box laid over the figure image, idle animation off on that figure) and the mirror close-up keep the FULL look (unchanged).
- Scar only when the player knows (`KIT_SCAR.on`: herself or j70 `knows(p)`, or `p.scar.known`); a veil is public; never on the grey silhouette.
### 28.8b FACE FX REGISTRY — `kitFaceFx` / `KIT_FACEFX` (review/appearance-port, dev/build/jface.js) — ONE layer for every face condition
- Every condition that changes how a face looks registers ONE entry; nobody adds their own hook on `kitFxLayers`, `effSac` or `pcard`:
  `KIT_FACEFX.add({id, z, ready, state(p), seen(p,st), sac(p,st), chip(p,st), html(p,file,st)})`.
  `state` = the true condition (rules run on it whatever the player knows) · `seen` = may she see it on this face · `sac` = Sắc lost (summed into
  `effSac`) · `chip` = `[text, cls]` on the person card when seen · `html` = the layer markup for one por-/fig- picture ("" without fit data).
  `ready:false` hides only the PICTURE (logic and chip still run) until the owner approves that entry's pilot.
- Layer order (z): portrait < 10 ốm pallor < 12 trúng độc < 20 rash < 30 slap < 90 phạt (chip only, no layer) < scar < veil < frame. All entries reach the tall
  frame, the small frame and the room-stage figures through the one `kitFxLayers` hook. Event-stage figures already get the layers: `kitStageFig`
  emits `<span class="kfxf kesfx">` with `kitFxLayers`; only a NEW kind of figure needs to call `kitFxLayers(p,file)` into a `.kfx` / `.kfxf` box.
  The `.kfxf` box copies the figure's transform.
- Helpers: `KIT_FACEFX.faceBox(file)` (veil-fit box, band = nose bridge), `cheekBox(file,{dx,dy,sw,sh})` (scar-fit cheek box, fractions of the box),
  `cssFace(file,cls,{sat,br,tint,eye,lip})` (CSS-only pallor: backdrop saturate/brightness masked to the face oval + tint; eye/lip spots only as
  fallback when the face has no landmarks).
- Entries: `ill` (ốm / Sức < 25, CSS), `doc` (trúng độc, CSS), `rash` (jrash, img/rash-1..3.png), `tat` (img/fx-slap.png,
  approved), `phat` (phạt quỳ / trượng: chip only). Postponed, plug in the same way: dưỡng nhan glow, tóc bạc sớm, đậu mùa marks.
- EVERYONE (review/facefx-all, owner 16/11): ONE rule for every person with a face: her, consorts, her maids / eunuchs / ma ma, other cung's servants, court staff, children, men, Hoàng thượng, Thái hậu.
  `KIT_FACEFX.person(ref)` = the one lookup (person object, face object `__kp`, place record `{kind,ref}`, consort id, `"sv:<sid>"`, or name) used by the pcard hook, `kitFxLayers`, the room stage and the podium;
  `KIT_FACEFX.everyone()` lists all (sources plug in with `KIT_FACEFX.group({id,list})`, a source carries no rule); `KIT_FACEFX.owner(p)` (household) drives the single "seen" rule `KIT_FACEFX.seen(p)`
  (herself, or not a stranger and her own people / a cung she knows). The only exception: `KIT_FACEFX.deny` = no tát / phạt on Hoàng thượng and Thái hậu.
  State API for other branches (mortality, elder-staff): `KIT_FACEFX.api.{ill(p,k,st), cure(p), poison(p,sev,how,by,weeks), rash, slap, pen}`; Thái hậu's illness is `S.thIll`, Hoàng thượng's `S.emp.ill`.
  A picture shows only when `img/veil-fit.json` + `scar-fit.json` have rows for that por-/fig- file (women's files have them). Rows for eunuch / emperor / child / men / physician files: KIT REQUEST (code needs no change).
  `kitFxPut(img,p,host)` (jk2b) lays the layers over any drawn figure (room stage, podium). Causes: j13 monthly illness for servants and children (jface `fxIllMonth`), epidemic reaches servants, taster poisoned, Phạt servant,
  servants with a grudge harm each other, hostile consorts reach servants (`fxServMonth`).
### 28.8e BODY-FIT BOX — `KIT_BODY` (KP09 / GAP v4 J7, review/kit-body-fit, dev/build/jbody.js; KIT REQUEST looks-2 17/11) — WHERE a body part sits on ANY person picture
- ONE part for every overlay that belongs on hair or clothes (looks-2 hair / clothes looks now; any later robe / hair decal), the way `img/veil-fit.json` serves the lower face. Nobody measures a body in their own code.
- ZONES `KIT_BODY.zones` = hair · head · chest · waist · sleeveL · sleeveR (viewer's left / right) · skirt · hem. A zone row = `[left%, top%, width%, height%, rotateDeg]` in % of the picture box = the SAME unit as a veil-fit row (fig-*: figure image box; por-*: portrait picture), so a layer drops into the one `.kfxf` / KIT_AV face-fx box.
- DATA, first hit wins: (1) `img/body-fit.json` `{ "<por-/fig- file>": { "<zone>": [l,t,w,h,deg] } }` = per-figure measures (Foreman C fills / corrects; a partial row overrides only its zones; cdn_sync, no rebuild). (2) MEASURED from the picture (`BAL.body.auto` = 1): fig-* from `kitFigBody` (§33.6: alpha bbox, head top fig-ht.json, head x, torso core, width profile) + the veil-fit face box when the picture has one (else head = top → `BAL.body.fig.chin` of the body); chest / waist = the torso core never wider than `chestW` / `waistW` × this head's half-width; sleeves = paint edge → chest side; hem = last tenth of the body. por-* = hair / head / chest from the face box only. Ratios: `BAL.body` (one core). No row and no measure → NOTHING (never a guessed place).
- API: `KIT_BODY.rect(file,zone)` · `.style(file,zone)` · `.rows(file)` · `.want(file,cb)` · `.img(cls,src,file,zone,extraCss)` = the layer `<img class="kbody …">` (vars form, §28.8b CSS). The measure is async: a layer asked before it lands is emitted hidden (`img.kbody-wait`) and placed the moment it arrives (no re-render). `.debugHtml(file)` / `.debugFill()` = zone outlines (kit sample).
- USERS (whole group): every person picture already runs the ONE `kitFxLayers` stack (room stage tokens + her figure `kitFigFx`, event stage `kitStageFig` .kesfx, podium `kitFxPut`, mirror, every avatar via KIT_AV), so a `KIT_FACEFX` entry that emits `KIT_BODY.img` reaches all of them. Wired: looks-2 HAIR (`lkhair`: Tóc rối / Tóc ẩm / Hoa lá vương tóc → zone hair, file `fx-hair-<id>-<lv>.png`) and the CLOTHES looks the jcloth bake does not paint (khoi, moc on figures; every clothes look on portraits → zone `BAL.body.cloth[id]`, file `fx-cloth-<id>-<lv>.png`). A slot draws only when its file is in `LOOKS_ART` (Foreman C, Magnific gpt-2-6): until then chip + Sắc only, as before. jcloth's tea / wet / mud / crease bake keeps its own cloth mask (owner-approved; same idea, pixel mask).
- Kit sample §28.8e: a consort, a maid, a eunuch, the emperor, a child + a portrait with every zone outlined. Test `node dev/test/kit-body-fit.js <url> [outdir] [WxH@d…]` (A whole-group scan 11 figure kinds × 4 + 4 portraits: every zone inside the picture and the painted body, body order; B sample; C live stack on her stage figure: layers placed on their zone of the drawn picture, avatar stack carries the layer).
### 28.8c FACE EXPRESSIONS — removed (owner 11/14 22:50Z): no code-reshaped faces; feelings are shown by the small mood icons (emotion kit).

### 28.8d FIGURE MOOD SEAL — `kitFigSeal` (review/kit-figure-mood, dev/build/jfigseal.js; owner 17/11 ~17:40Z, OD tail "kế bên cái đầu của họ")
ONE kit part: the SAME mood seal as the pcPort frames (jemo `emoBadge`: `img.kemo.kemo-<k>`, `img/kit/emo-[m-|mo-]<k>.webp`, `emo-an` when the mood is not known to her, nothing for a stranger, same tap = kit popover) is pinned beside the HEAD of every interactable full-body figure (on a STAGE: at the head, on the head height of the figure's sex, §78.y). No new art, no new mood logic.
- WHERE (scan table in reports/kit-figure-mood.md): room / place / Dư đồ place view / lãnh cung / home visits = j59 stage figures (`#tokens .tok.fig img.figimg`, her own `#mefig`); event + person dialogs, book person pages, pet-care dialog = `kitStageFig` (`img.kesimg`) and `kszFigHtml` (`.kszfs>img`). Both makers register WHO the figure is (`data-kfsp`, jfigseal registry); nobody reads it from the picture.
- NOT: silhouettes (unknown-fig), mini-game figure `.kgfig`, new-life identity card `.kpfig`, crowds/shadows, hidden / still-loading figures, `window.__emoOff=1`.
- RULE (`KIT_FIGSEAL`): ON A STAGE (`#stage` figures) the chip stands ON the badge line of the figure's sex, BESIDE «ta ở đây» / the speech bubble (§78.y `kitBadgeAt(st,fig,"emo")`: bottom = the line = the highest REAL head top (hair / crown / hat included) of the visible figures of that sex − G; centre = centre line ± (`KIT_BADGE.mw` .1 × H / 2 + `KIT_BADGE.sp` .012 × H + chip / 2), right first, mirrored when the right would leave the stage, touch `#kshR`/`#kshL` + 10 px or a neighbour's mark column; one size per stage) — owner OD 19/11 ~02:05Z «phải nằm ở gần bên cái nhân vật» + ~03:50Z (never on the head). Elsewhere (dialogs, book): size = `k` .105 x figure BODY height (kitFigBody head top -> feet), 22..50 px; centre at head height (about 8.5 % of the body under the head top); beside the head on the right, its inner edge `gap` .012 x body past the painted hair/headdress edge (kitFigBody wl/wr of the top 15 %); left side when the right would leave the stage / dialog column; clamped inside `#stage` / `.kszfig` / `.kesf`; never over the face.
- Host: nearest non-clipping ancestor of the figure (class `kfshost` = position:relative when it was static); the seal follows the figure (resize, paging, re-render, image load: `kitFigSealAll()`).
- Test: `node dev/test/fig-seal.js <W>x<H>@dpr <outdir>` (seal inside stage, not on the face, size, beside the head).
### 28.9 DELTA CHIPS + WORDING
- `kpChipify` (jk2b): a delta chip takes the whole short clause before the number (up to 6 words, stops at punctuation): "nhà Hộ bộ thế lực −2";
  linking words in front (và, được, mất, khiến, nên…) stay outside the chip.
- Contest tables are titled "Bảng định thứ" (any old "BẢNG ĐIỂM / Bảng điểm" is rewritten on screen by VP).
### 28.10 EVENT + STORY ART (j89 evArtOf / stArtOf)
- Event choices, news panels ("Tin trong cung"), story/chapter cards: the picture goes in the PICTURE FRAME (28.19, `kitSceneArt(src,label,{shape:"tall"})`, `.kpsubj.kpiart.kpev`)
  left of the body, unless the panel is about a person (then the person's portrait, section 8).
- Picture (data only, first match): `item.art` · `item.stArt:[arc,beat,ending]` → stArtOf · `item.evId` → evArtOf(id, week) · `item.pid` (+`pp.id`)
  → evArtOf("<pid>:<id>") · news → evArtOf("news:<title>") · default category. Label = `evArtTitle`.
- The result card right after an event choice shows the same picture small on its left (`#rtoast.kevres > .kpevr`).
- Merged review/event-art dd2f253 (96 st-* story pictures, EVENTS.json stories, j89 stArtOf).
#### 28.10c PICTURE BY MEANING — no default picture (owner 15/11 "Mấy cái ảnh minh họa không liên quan gì cả" + "Hình minh họa đâu? Khung sự kiện đâu?", review/ev-art-fit) — `dev/build/jevfit.js`
- NEVER a stand-in picture: not "who is on the stage" (the old jk4 default gave every visitor the "Có người đến chơi" gift box, the Emperor
  "Hoàng thượng ngự giá", Thái hậu "Thỉnh an"), not the room she stands in (jtsb tsbPlaceArt; the room stays only for PLACE dialogs, jplace),
  not "people visiting" for unmatched news (jk2b kitNewsArtId → `cat:tin-cung`).
- Order (kitEvArt, jk4): own banner `img/ev-<key>.webp` (jevban) → own EVENTS.json id (pid / e68 / q72 …) → **the MEANING GROUP**
  `kitEvFit(m)` → j24 approach title → week-book table on the title (with "Chính/Phụ tuyến · " stripped: "tuyến" was read as "yến") →
  nothing = §59 placeholder (listed in `CTM_MISSING_PICS`, to be painted).
- Groups (owner 15/11): ONE picture (or 2–3 variants) per MEANING, shared by every event of that meaning = an EVENTS.json category,
  addressed as `"cat:<group>"` (j89 evArtCat). `KIT_EVFIT` rows `[rule, group | {src,lab} | fn(m), title RegExp, body RegExp]`, tested on the
  title (prefixes stripped) and the first two sentences of the text (never option hints); first hit wins. Caption = the group's title.
- Groups added: `mat-bao` Mật báo, lời cảnh báo · `am-muu` Âm mưu · `bac-tien` Bạc tiền, bổng lộc · `canh-phong` Canh phòng cung ·
  `hao-huu` Hảo hữu trong cung (co-op) · `nguy-gia` Cứu giá — painted gpt-2-6, 1024x768 (mat-bao 1024x690, focal kept in the 2.3:1 band); `tham-hoi` Sang chơi,
  hàn huyên (ev-khach-den) · `qua-tang` Quà tặng, ban thưởng (ev-khach-den-2, the gift box, no longer inside khach-den) · `tin-cung` Tin trong cung.
  Dress remarks (Lời nhận xét, … chê dung nhan) use the toilette pictures `ev-toil-<who>-<praise|scold>`; Hội phối đồ `ev-toil-crowd-jealous`.
- WHICH PANELS: every event-like pop-up, not only choices — kinds notice (BÁO), news (TIN), result (KẾT QUẢ), choice (VIỆC), reward,
  intel, threat, evidence (`kitEvFitWant`). Not: rule / info (ĐIỀU) / person cards, look-up panels, shop / pick lists, act pickers,
  the identity card, night panels (review/night-end), Nhập cung (review/newgame-ui).
- Test: `node dev/test/ev-art-fit.js <url> <out.json> [steps] [seeds]` (every dialog built + bot lives → picture, group, rule);
  `EVJSON=img/EVENTS.json node dev/test/ev-art-fit-shots.js <url> <dir>` (owner cases at 755x1000, 1180x820, 844x390).
### 28.11 IDENTITY CARD + REINCARNATION BACKGROUND (owner item 6)
- (11/14 19:10Z, replaces the frame part below) The origin picture is a WIDE band across the top of the card: `img/origin-wide-<k>.webp` (1280x720, gpt-2-6, one per origin) in the PICTURE FRAME (28.17, shape wide, no caption), height `clamp(84px,19dvh,190px)`; name, origin · age, tiles below it. The two choices are sticky at the bottom of the card (the body scrolls under them), choice titles wrap (never cut).
- The origin picture (`img/bg-origin-<k>.webp`) is no longer the backdrop: it sits in the kit art frame `.kpidart` (kitArtFrame) — landscape:
  frame left, facts right; portrait/Fold: frame on top, facts below. Her full-body figure still stands on the background.
- One shared background for every reincarnation screen: `img/bg-reborn-p.webp` (portrait 1200x1602) / `img/bg-reborn-l.webp` (landscape 1920x1080),
  gpt-2-6, no people (moon with the wheel of rebirth, jade bridge, lotus lanterns).
#### 28.11a IDENTITY CARD — one figure tier, fixed column, fast face picker (owner 15/11 "mỗi người 1 chiều cao … che cả nhân vật … quá lag"; review/newgame-ui) — `kpIdFig` / `kpIdLay` / `kitTn` / `kitPickerGo` (j79), j86
- ONE COMMON FIGURE TIER (coordinator 16/11, review/newgame-ui-r2): her standing figure is drawn with the same BODY height (head top → feet,
  `kitFigBody` .ht → .b, as 33.6; crowns / hairpins above the head not counted) for EVERY face, consort and maid, at every age, and the
  painted figure (crown top → feet) stands CENTRED between the two frame lines of the scene (§32.2b, s22): spread = screen top and bottom
  (column left of the panel); one page (`html.kv1`) = screen top and the panel's top edge (figure ABOVE the panel, `kitView().pages===1`,
  never a pixel breakpoint). Gap above = gap below, each ≥ `KIT_DP_GAP`. Body height per screen = min(portrait 80 % / landscape 84 % of the screen height, (the height between the two lines − 2 gaps) / (1 + `BAL.bookFrame.cRef`)),
  skull top → feet, the SAME for every face (§56.4; the old cap by the widest robe `KPID_WR` is gone: nobody is shrunk for an outlier). A robe / sleeve wider than the column
  spreads to the right UNDER the panel (panel z-index 1, figure transparent, no mask / fade, nothing cut): `kitFullFigX` keeps the painted left edge inside the column.
  Never object-fit:contain in a box: kpIdLay places the picture in px on both layouts (--kidh is only the one-page area height).
- FIXED COLUMN: the panel is the ONE frame size of KIT 8.1 (`--kpw` / `--kph`; kpIdLay never sets its width); the figure column is the
  space left of the panel (its left edge minus 8 px). The figure is centred in the column. The panel never covers her.
- PINNED CHOICES (r2): "Nhận / Đổi thân phận" sit BELOW the card's scroll area (`#mb.kpmbw` = flex column: `.kpscroll` scrolls, `.kpscopts` is a
  plain row under it), never over the body, so the picker, its "Dung mạo chỉ để nhìn…" note and the last picker row are never covered.
- `kitTn(src)` = the small pre-sized copy `img/tn/por-…webp` (128 px wide, ~7 KB; was the 384x506 portrait, 30–55 KB) / `img/tn/fig-…webp`
  (240 px tall, ~7 KB) when `img/TN.json` lists it (`dev/art/tn_make.py`, list from `dev/test/newgame-ui-enum.js`: every face the picker can
  show at a new game = 420). The picker cells use it; a pick shows the low-res figure AT ONCE (prefetched for the page in view) and swaps in
  the crisp one when decoded (`decode()`); body measured on the small copy.
- PICKER (kitPicker, every picker): page turns never re-measure the layout (`root.__kpc`), the next page's pictures are decoded before the
  swap (≤ 80 ms wait), the pages either side decoded in idle time; `onPage(cells)` hook. A pick changes the selected cell IN PLACE (no rebuild),
  the small portrait and the figure; no game `render()` while the identity card covers the screen (it renders once when the card closes).
- Under any full-screen scene panel (.modal.kpscene with its painted backdrop) or the Luân hồi deck the stage Pixi layer and the FX layer stop
  (`kitStagePause`), restart when the stage shows again.
- CORS (all pixel reads): every `new Image()` whose pixels are read on a canvas sets `crossOrigin="anonymous"` (CDN pictures; without it the
  canvas is tainted and every measure silently fell back to the whole picture — kitFigBody, jk3 topOf were affected; jsl headX, jkpor, jmark, jk2b already had it).
- Opening card "Nhập cung" / "Nhập cung làm cung nữ": EVENT frame (32.2) — `stage:[S]` + headArt `img/ev-nhap-cung.webp` (consort road) /
  `img/ev-nhap-cung-cn.webp` (palace-maid road), gpt-2-6 1280x716 (181 / 206 KB); facts as kit rows (kitRows); no portrait strip.
  `kpIsScene` treats a "Nhập cung" card that names its stage as an event panel.
- Test: `node dev/test/newgame-ui.js <url> <WxH> [shot]` (tier/column/timings/Nhập cung), THR=4 / TRACE=page|pick for traces.
### 28.12 kitRoulette — LUÂN HỒI, face-down pick (owner 11/14 item 6b approved; owner 11/15 04:00Z face-down idea + exact flow) — KIT READY
`kitRoulette({items:[{k,src,wide,name,rare}], target, toEl, done})` on the reincarnation background (`kitBackdrop(ov,"roulette")`), at a new game
AND at rebirth (hooked on `nlCard`, once per rolled life). The origin is pre-rolled (j52 seed + j69 weights): the cards only SHOW it, odds unchanged.
1. All origins FACE-UP: `kitOriginFace(it)` = kitSceneArt wide band + name + rarity chip (Rất hiếm / Hiếm / Thường gặp). Buttons `Tiếp` (`.kbtn`) · `Bỏ qua` (`.kbtn.alt`).
2. `Tiếp` → every card flips face-down (painted back `img/kit/card-back.webp`, gpt-2-6: crimson brocade, gold wheel of rebirth on a lotus) and the
   deck is SHUFFLED in view (cards gather to the centre and deal back to new places, twice; FLIP transforms only).
3. "Chạm một lá để nhận thân phận kiếp này": the tapped card glows gold, moves to the centre enlarged (≤ 2.3×, ≤ 62 % width / 50 % height) and flips
   over = the rolled origin; the other cards stay face-down, dimmed. Its name becomes the sub line; `Tiếp` returns.
4. `Tiếp` → the revealed picture flies into the identity card's art frame (`#modal .kpidart .ksart`) while the card slides in (landscape from the
   right, portrait from below). `Bỏ qua` at any step ends at once.
- Card = outer `.krt` (moves) › `.krc` (flips, preserve-3d) › `.krf` front (in flow, gives the size) + `.krb` back (laid over, rotateY 180).
- **Chip baseline rule (owner 11/15, kit-wide)**: any card tile with a chip/label under a wrapping title is a flex column with the chip pinned to
  the bottom (`margin-top:auto`) and the tiles of a grid row stretched to one height, so the chips of a row share ONE line. Measured 0 px spread per row.
- Reduced motion (`prefers-reduced-motion` or Cảnh động off): same steps, no motion (instant flips, no shuffle travel, no fly).

#### 28.11b IDENTITY CARD BODY (kit-fit r3, reviewer: name + age line lost / clipped on iPad + Fold)
Root cause: the road cards (jkc `.kkcp` "Con đường", 300 px) were inserted at #mb level, between `.kpscroll` and the pinned Nhận / Đổi row, so the scroll area kept 106 px (iPad) and
the name + age line (`.kpidn`) sat under the sticky strip. Now the road section is INSIDE `.kpscroll` (before the face picker); only Nhận / Đổi stay pinned. One-page (kv1) card: picture
`clamp(84px,14dvh,190px)`. Test: kit-fit3 "idn" (name + age line fully inside the scroll area, 5 sizes). The Fold figure column (~90 px) was fixed in r2b (§28.11a: figure above the panel, 263 px at 755x1000).

#### 28.12b ORIGIN / IDENTITY CARD GRID — `kitRouFit` (jk2b), ONE fit for every origin picker (owner 16/11 s23: "to ra, trải dài hết cái màn nền")
The origin cards (Luân hồi `#kroul`; the same `.krgrid` / `.krt` is what every origin / identity pick uses, new life and co-op life alike — co-op runs the same `nlCard` → `kitRoulette`)
grow to span the background width: side margin `--krside` = 5 % of the width (14..72 px, so the title, the moon wheel and the scene stay visible), ONE gap `--krgap`
(10..20 px = 1.6 % of the short side) between columns, rows AND between title → cards → Tiếp / Bỏ qua, page padding `--krpad`. Card width `--krw` (≤ 300 px) is found by measuring:
for 5 / 4 / 3 / 2 columns the widest card for which title + all rows + buttons fit the screen; among the (almost) widest the FEWEST rows wins (landscape 2 pages: ≥ 70 % of the widest;
portrait: ≥ 85 %). Result: iPad 1180x820 and 1366x1024 5 × 2, Fold 755x1000 4 × 3, Fold cover 412x1058 and phone 390x844 3 × 4. A last partial row is centred.
Picture, name and chip scale with the card (`--krw`: name 8.8 %, chip 7 %, padding 4.5 %, name ≤ 1.2rem, chip ≤ 1rem); all tiles of the grid get ONE height (chips share the baseline, §28.12).
Re-fitted on resize and when fonts load (never after a card is picked). `data-krc` / `data-krw` on `#kroul` = the chosen columns / width (tests).
Sample: kit page §28.12b. Test: `node dev/test/kit-fit3.js <url> <outdir> [WxH,...]` (cards inside the screen, no horizontal scroll, side margins equal, gaps equal, face picker without tabs, 84 painted women).
- Test: `node dev/test/inv-origin.js <url> WxH@dpr <out> <tag>` (`window.__kroulStep` 0 face-up · 1 shuffling · 2 pick · 3 revealed). Shots `dev/shots/inv-origin/`.
### 28.13 kitItem — ONE item tile (KIT READY)
`kitItem({src, name, grade:0..4, qty, label:[text,"ok"|"no"|"n"], on, empty, size:"sm"|"md"|"lg"|"xl", data, tip})` → `.kitem` (52 / 72 / 104 / 150 px; xl = the reveal spotlight, KIT §54.1).
Simple frame (not the portrait frame): square box, 2 px border + radial ground in the grade colour (`KIT_GRADE`): Thường `#9a8a78` · Tinh phẩm
`#3f8f6a` · Trân phẩm `#3f62a8` · Tuyệt phẩm `#7a4fa0` · Ngự tứ `#b8901c` gold with a red inner ring and a small red "Ngự" seal (Vietnamese, no Chinese characters in UI — owner 11/15). Under the box:
name (wraps, never cut), the grade CHIP ON the bottom edge of the frame (§54.1b; no grade line under the picture), optional status chip; `qty>1` → "×N" badge; `on` → "Đang mặc" band; `empty` → dashed empty slot.
Picture: `kitItemSrc(k, fallback)` = `itemArt(k)` (j98, review/item-art) → `WD_ITEMS[k].icon` (wd-*) → fallback. Use it for every item anywhere:
chest, Tư trang, wardrobe slots, reward chests, peddler, works, reward panels. Nobody draws another item box.
- (11/15) `size:"slot"` = a bag slot for kitInvGrid (square only, fills its grid cell; name + grade in the tooltip / aria-label; empty = a recessed
  square, no stripes). `onText` = worn band text ("Đang đeo"); `mark:[text,"r"|"g"|"n"]` = small corner tag ("đã tẩm"). `kitItemSrc` returns the src string.
- (11/15 owner markup 1115-inv-markup) GRADE = PORTRAIT ART. Every non-empty kitItem (slot, sm, md, lg, panel picture) sits on the SAME painted
  ground + frame as the portrait of a matching tier (class `.kigN`, jk2b §15b): ground `img/kit/bg-consort-T.webp` (cover) under a soft light pool,
  frame = `frame-consort-T` cut to the frame only (no tassel) → `img/kit/islot-frame-N.webp`, drawn as a 9-slice `border-image` (corners crisp at
  every size). Thường = t0 wood/taupe · Tinh phẩm = t1 jade · Trân phẩm = t2 pearl-silver on blue · Tuyệt phẩm = t4 gold-peony on lavender ·
  Ngự tứ = t5 red-gold rubies on the t7 imperial gold ground (+ red "Ngự" seal). No new art: crops of existing kit frames only. Picture 76 %, tags above the frame.
  The old pale tint + 2 px border is gone. `ghost:src` (empty only) = faint silhouette = the TYPE outline of an empty equipment slot.
### 28.13b kitInvGrid — THE BAG (owner 11/15 04:00Z, shot 1115-49c7629b) — `dev/build/jinv.js` (after jk3) — KIT READY
`kitInvGrid({key, tabs:[{k,label}], items:[{cat,src,name,grade,qty,on,onText,mark,tip}], minRows:4, onPick:fn(item)})` → `.kinv`:
- Tab row = the ONE category tab row of k3CatTabs (`.pctabs.kcattabs`, buttons from `kitTabRowHTML(list,cur,attr)` in jk3; "Tất cả" first, count `<i>` = items);
  sticky, one sideways row under 1000 px; choice remembered per key (`hclh-kinv-<key>`).
- Grid `.kinvg` = recessed tray of SQUARE SLOTS (`repeat(auto-fill,minmax(60px,1fr))`, 54 px under 600 px). Items fill the first slots (kitItem "slot":
  painted icon on the grade ground, ×N count, worn band, corner tag); the rest are EMPTY squares; `kitInvFit()` pads to whole rows (≥ minRows rows).
- Tap / Enter on a slot → `onPick(item)`. Tư trang: item panel = `kitModal` kind info (title = item, sub = kind · grade) with the 512 px painting in a
  kitItem lg, kitFacts (use, count, worn, own taint, rank, giver) and act cards (pbtn: Đeo/Tháo · May áo · Dùng · Tặng · Bán · Tẩm · Nghiệm độc) that run j8 `itemAct`.
- Tư trang tabs (real j8 `IT.kd`): Trang sức · Vải vóc · Thuốc men (Thuốc bổ, Thuốc, Độc dược) · Hương liệu · Lễ vật (Lễ vật, Kỷ vật) · Thư từ ·
  Tạp vật (only when such an item exists). The bag starts EMPTY: items are only earned (peddler, gifts, bestowals). When j92 (wardrobe) lands its
  Trâm cài / Y phục chest uses the same kitInvGrid.
- (11/15) The grid GROWS by whole rows into the panel's free height (no big empty gap at the bottom); what is left (< one row) goes to the
  equipment slots below (they grow up to 112 px). Refit on grid width / panel height change (ResizeObserver).
### 28.13f ITEM / EQUIPMENT-SLOT CARD — compact (owner 11/15: "ĐIỀU · Ô cài tóc" far too big) — `kitSlotDress` / `kitSlotFit` (jinv)
Every item panel (bag tile → kinvOpen / wdOpen / wdFabOpen) and every "Bên mình" slot panel (cài tóc, đeo tay, đeo eo, túi thơm, khăn che
mặt, y phục → keqPick / wdSlotOpen) is the standard kit dialog box (`.dlg.kitslot`: kit panel width min(560 px, 100vw − 24 px), never
taller than the person dialog 32.7 — min(100dvh − 32 px, 720 px) — only its body scrolls):
1. TOP ROW: the small item tile LEFT (kitItem at the bag-grid tile size, 64 px; an empty slot shows its faint ghost; the grade chip is on its frame edge; the grade word is not
   repeated under it), its kit rows RIGHT (Phẩm / Được / Mất / Ghi chú) + the "Đã biết: …" chip.
2. The info lines FULL WIDTH under that row ("Rương chưa có trâm cài nào khác.", "Nhờ thái giám mua đồ, hoặc chờ được ban thưởng."),
   plain lines without the round fact dots or faces; the pick-a-piece row (`.keqpick`) full width too.
3. The acts by the option rule (32.9): a short act (name + one row that does not wrap) is a cell of a 2–3 column grid; an act with two or
   more rows (Cần / Tốn / Được / Kèm, odds) or a wrapping line is a full-width row; the short cells pack together (dense grid). Cards keep every line, sized to their content (no
   stretched cells, no tall empty space).
4. No "Lui": the header ✕, a tap outside, Esc (32.10).
Test: `node dev/test/slot-card.js <build page> <outdir> <tag> [sizes]`. Shots before / after: dev/shots/kit-close/slot-before-*, slot-after-*
(755x1000, 1000x755, 1180x820).
### 28.13g TƯ TRANG SUB-TABS (owner 11/15) — `kinvSubHTML` (jinv)
Tư trang opens with the ONE sub-tab control (§20 `.ksub > .ksubb`, the Hậu cung one; kept inside `.kinvsubw`, sticky at the panel top), THREE tabs:
**Túi đồ** (default) = LEFT column: "Đang mang" (6 wear slots, `kitEquipSlots({col:true})`, slot = bag cell up to 72 px, floor 40 px so the column always ends inside the panel; still too tall at 40 px → `.kinvtight` hides the two column titles and the pet's spare lines; the limit is the exact panel content bottom (every bottom margin/padding between), the fit re-runs when the column itself grows (ResizeObserver), and column slots never show the Xa xỉ tag (it is on the bag cell, tap panel and sum line) — page-scale-r1)
and DIRECTLY UNDER Y phục the PET box (`petSideHTML`, jpet: same column width and slot size; the pet that follows her, else the first; name in its grade colour,
age, effect chip / "ở tẩm cung", "+N con nữa"; 0 pets = one empty slot "Chưa nuôi con nào"; tap = opens Thú cưng); RIGHT = the bag grid + category chips filling the whole
right side down to the frame bottom (whole rows; the Sắc / Xa xỉ sum line under it) ·
**Thú cưng** = every pet as a kit card (`kitSkillCard` via `petPanelHTML`, jpet): rows (`petRowsL`), Chăm (→ jpetcare: Cho ăn / Tắm chải / Chơi), Cho theo hầu,
Gửi về Ngự thú viên, and "Nhờ thái giám tìm thú nuôi" (the pet shop) ·
**Việc** = the Tư trang acts (Nhờ thái giám mua đồ, Soát đồ, Sai cung nữ…, Chợ đen, Xin đồng minh), doable ones first (`kitDoableFirst`,
§37.1 of review/person-acts when merged; jinv carries the same rule until then). The pick is remembered per viewer (`hclh-inv-sub`).
Row/column counts of the bag are NOT tuned per device here (kitInvFit fill is owned by review/page-scale).
### 28.13h GIFT DIALOG "Tặng quà" / "Dâng quà" (owner 11/15, review/gift-ui) — `giftDialog` / `giftDecorate` / PEND.giftto (jgift) — kit parts only
One dialog for giving any chest item (bought goods and handmade works; chest "Tặng", works "Dâng, tặng", Emperor / Thái hậu card "Dâng quà"):
- LEFT: the ITEM's own picture (kitItem lg in its grade frame, `.kpsubj.kpitem.kgiftpic`), never an event picture; the result card shows it too.
- RIGHT, top: the kit item-card head of the shop card 28.13d (`.kshdt`: `.kshdn` name in its KIT_GRADE colour + `.kshds` "kind · grade"), then
  `kitRows` in `.kinvrows` (Dùng / Nguồn / Người làm / Làm lúc / Lưu ý / Đã tẩm / Khi tặng / Hợp nhất). No chip or row style of its own.
- Recipients: the kit tab row (`kitTabRowHTML`, `.pctabs.kcattabs.kgifttabs`) Chí tôn / Phi tần / Nam nhân / Cung nhân with "givable/total";
  a tab with nobody in it is NOT drawn (Nam nhân has no gift rules yet, so it never shows; one group only → no tab row). Each person is a kit
  dialog option (portrait `mdH xs`, name, odds · Tốn · Được · Kèm via kitParse) or a locked option with its reason (`.kwhy`).
- Close: the kit ✕ only (32.10 turns the "Thôi" option into kit-x). The item someone else wears (`kitOtherItem`, tap a slot on her card) is
  a kitModal info card: kitItem lg + kitItemRows + the owner line (`mdH sm` + name) + kitFacts, closed by the kit ✕.
- An option with `kgg:"all"` is not a recipient: it shows under every recipient tab (review/poison-gift: "Bỏ độc vào…" on food, drink and sachets,
  jpoison). A handmade work's recipient row carries the chân tình check in its Ghi chú ("Chân tình: đủ — …" / "chưa đủ — cần …", jpoison
  gfSincere). The poison card it opens (PEND.pgpick, in KIT_ACT_PIDS) is a plain kit dialog: options with the real odds word + Tốn/Được/Mất/Kèm
  and `option.why()` for the kit "Vì sao" popover (11.1; `option.base` = the act's base, else BAL.spyBase). The incoming-dish card (PEND.pgin)
  is an event choice (28.6: price + hint, own `hint`/`risk`).
### 28.13i ITEM PICK GRID — every "choose an item to give / offer / plant / use on someone" dialog (owner 15/11 session 8, review/gift-pick) — `dev/build/jgpick.js` (last module)
Owner: "Khung tặng quà tôi muốn hiện hình món đồ luôn, xếp theo như kiểu ô tư trang á. Xếp hàng ngang để chọn rồi có animation khi tặng."
- Trigger: a dialog (Q item) whose options carry `ik` = the S.inv index of the item. No other flag; a new picker only sets `ik` on its options.
- Grid = the 28.13e tile grid (`.kshg`, here `.kipg`, columns `minmax(96px,1fr)`, 84 px under 600 px wide; max height min(46vh, 420 px),
  scrolls) of PICK tiles `.kshc.kshpick.kipc`: picture = kitItem "slot" in the item's grade frame (`giftArt` / j98 itemArt, the Tư trang
  picture) · name in its KIT_GRADE colour (2 lines) · what it is (IT.d, or the work tier) · (grade = the chip on the picture). No button row. Taint = corner tag
  "đã tẩm". A tile she cannot choose (option `lock`, or not enough bạc) is greyed (`.kshno`) but still selectable to read why.
  Doable tiles first, then the dialog's own order. Horizontal rows that wrap (the Tư trang look).
- Tap a tile → selected (31.13: glow + ×1.06, the rest at .75 opacity; `aria-checked`), the first doable tile is preselected.
  Under the grid `.kipd`: that option's OWN kit card (display copy of its `.opt`: name, odds word, Tốn / Được / Mất / Kèm or the reason
  `.kwhy`) + ONE confirm button `.kipgo` (kit `.kbtn`, verb per dialog: Tặng / Dâng / Cài vào rương), greyed when the option is locked.
  Confirm clicks the real option button, so chooseM and every wrapper (cost, j25 visit ticket, §64 item-event hooks) run unchanged.
  Above the card: the KIT §70 item detail strip (`kitItemDetail({e},{cls:"kidet-strip",noLux:true})`, jitd). Close = the kit ✕ (32.10), no Thôi row.
- Phone landscape (height ≤ 500): grid and detail side by side.
- Users: giftpick (Hậu cung act "Tặng quà", now with the gift card's own line `giftEval`: odds · tốn · thành · kèm), giftto (Dâng quà
  Hoàng thượng / Thái hậu), plantpick (Cài đồ vào rương). Scan: `node dev/test/gift-pick-scan.js` (every option list built from S.inv).
- Gift moment: a confirmed gift (giveTo by her) plays §68 `kitFxGiftCarry` after the state is applied.
- Test: `node dev/test/gift-pick.js <build url> <outdir> [WxH@dpr,…] [shots]`. Kit page sample "§28.13i".
### 28.13c kitEquipSlots — "Đang mang" EQUIPMENT SLOTS (owner 11/15, RPG-style) — `dev/build/jinv.js` — KIT READY
`kitEquipSlots({key, title, slots:[{k,label,item:{src,name,grade,tip}|null,ghost,mini}], sum, onPick:fn(slot)})` → `.keq` under the bag:
header = kit section title + totals (Sắc/Danh chips · "Xa xỉ <total>" neutral · "N món vượt phẩm: dễ bị tố" law notice; chips wrap, never cut).
Slots auto-fit (≥ 80 px columns, wrap to a 2nd row when needed). Each slot = kitItem "slot" (same grade ground + frame as the bag).
TIDY RULE (owner): under a FILLED slot at most 2 short lines — item name in its grade colour + main effect chip(s) (+ "N th" for a timed dress)
+ a small red ⚠ only if vượt phẩm (law; reason in the tooltip; luxury is never hinted). EMPTY slot: the slot name only + the type silhouette (`ghost`). Full facts only on tap.
ROW ALIGNMENT (owner 15/11 05:45Z OCD rule; review/pets-fix): every slot is FOUR fixed rows on a CSS subgrid — picture · name (`.keqnm`) ·
chips (`.keqfx`) · note line (`.keqnote`: the `.keql2` part of `mini`, e.g. "theo hầu · Khỏe", "còn N tháng", ⚠). `keqMiniSplit(mini)` splits a
slot's `mini` at its `.keql2`, so names, chip lines and note lines sit on one line across a row even when one slot has a chip and its
neighbour has none (was: the followed pet's status line 17 px lower than the others). Measured by dev/test/pets-fix.js (row.pets / row.tutrang ≤ 1 px).
Tư trang slots = the rules' wear slots (`IT.sl`, j8 wear()/wearBonus/vpItems/tố vượt phẩm are generic on it):
Cài tóc (hair) · Hoa tai (ear, GAP IT03: hoatai / hoataivang, rewards only) · Giày (shoe, GAP IT03: giayhoa / giaygam; numbers BAL.wearSlots) · Đeo tay (wrist) · Đeo eo (waist: ngọc bội ngự ban, Danh +1, still never given/sold) · Túi thơm (scent: túi thơm thêu, Sắc +1,
worn instead of used up; a tainted sachet keeps hurting via taintHit) · Y phục (áo may từ vải, `S.dress`, 3 tháng; the slot shows the GARMENT:
j92 painting `img/wd512/wd-<tier>-y-NN.webp` picked by her tier and, inside the fabric grade's band, a stable hash of fabric+rank).
Khăn che mặt (veil): the j70 hủy dung veil (`p.scar={sev,known,veil}`, same field KIT_VEIL draws on portraits); she has it once her face was
harmed; art = KIT_VEIL's veil for her rank (veil-t1..t8 pearl strands / veil-silk-ivory|pink). Worn with a mark (sev>0): hides it, Sắc +2; worn
with the face healed: 1 in 4 a month whispers, Danh -1 (⚠ on the slot). Toggle in its tap panel (Che mặt / Bỏ khăn). Not in the luxury score.
Hoa tai / Giày hoa: NOT added — no item painting exists (held until the owner OKs new art). New slots need a real `IT.sl` rule first.
### 33c kitItemRows(k, o) — the ONE fact block of an item
Kit act-card rows (kitRows): Phẩm (grade name in its colour) · Được (effects; worn effects ×1.5 above her rank as wearBonus) · Mất (vượt phẩm,
contraband, loss, own taint — never the hidden luxury level) · Ghi chú (months left, slot, rank it suits). Used at the top of the item panel (bag slot tap) and the
equipment slot tap (dress panel). Never re-written per screen.
### LUXURY axis (owner 11/15) — NUMBERS, never words — `luxVal(k)`, `luxAllow(p)`, `luxOf(p)`, `luxMonth(p)` (jinv, via j8 itemMonth: everyone)
Every wearable item / garment has "Xa xỉ N" = [8,16,28,44,64][grade] + giá/10. Her allowance = 36 + 16 × rank (+10 if Sủng ≥ 60).
kitItem `lux:N` → a small dark corner tab "Xa xỉ N" (top-right; "đã tẩm" moves to the left) on bag slots, equipment slots and the panel picture.
Header chip `kitLuxChip`: ONLY the worn total "Xa xỉ <total>", neutral colour (owner 11/15: never the allowance, never a level word, colour or
warning — she learns the limit from what happens: ghen, gossip, Thái hậu). Item panels show only each item's own "Xa xỉ N". The ⚠ under a slot and the
"N món vượt phẩm: dễ bị tố" chip are kept: vượt phẩm is palace LAW (j8 rank caps, tố vượt phẩm), not the hidden luxury rule. Rules (internal levels): ≤ allowance fine; ≤ 1.5× → others' Ghen +1
(× trait: Kiêu ngạo/Tham vọng 1.5, Xảo quyệt 1.2, Hiền lành/Nhu mì 0.5; half for an NPC wearer); above → Ghen +3, Thái hậu may frown
(chance 50 − Đức/2, 10–50: Thái hậu -3 / NPC Danh -2), gossip 1 in 4: Danh -1; nothing worn from Quý nhân up: 1 in 4 Đức +1.
It extends ghen (v.ghen) and itemMonth; vượt phẩm/tố stays j8 vpItems/vpAccuse.
### KIT RULE (11/15): the category tab row — never clips, centred, sticky only on long pages
`#panel .kcattabs` (jk3): (1) no upward cover shadow, so act cards above it always show their full border; (2) one spacing token `--k-tabgap`
(10 px) above and below, neighbours' own margins zeroed → the row sits centred between the cards above and the list below; (3) sticky ONLY
when the panel content is > 1.5× the panel height (`kitTabStick()` sets `.kstick`); on short pages it scrolls with the page and never overlaps.
Test: dev/test/inv-grade.js checks on every panel tab that each act card's bottom edge hits the card itself, and reports the gaps above/below.
### 28.13d kitShop — THE SHOP (owner 11/15 09:40Z + 10:30Z + 10:45Z markups, review/act-pics; owner 11/15 shop-fix: "the shop IS the person dialog") — `dev/build/jinv.js` — THE pattern for EVERY buying screen
`kitShop({key, title, info, stage:[{__fig, __cap, __role, age}], items:[{k, src, name, grade, lux, price, unit, eff, rows, sub, stock, have, onBuy(x,q)}], money:()=>n, carry:9, sell:{items, empty}})`.
- The card IS the KIT 32.7 person dialog (kitDpApply / kitDpFit, jk4) — same component, same box (people + 470 px wide, height
  min(100dvh − 32 px, 720 px)), same header, same figure column: the seller full-body at the kit figure scale (KIT_FIG, never a private
  size), two-line name chip under the feet. `stage` takes a pseudo person `{__fig: src, __cap: name, __role}` (kitFigOf / kitName pass it
  through). NO size of its own: test = its box equals a plain 32.7 dialog with the same person ±1 px.
- RIGHT column (where a person dialog has text + options): the kit tab row "Mua" | "Bán" at the very top (no "Ta có N bạc": the money is on the main screen)
  (kitTabRowHTML, `.pctabs.kcattabs`), then the TILE GRID (28.13e), the only thing that scrolls.
- No buy panel under the grid (never repeat the item). Buying is ON the tile (28.13e). Tap a tile picture → the kit item card floats over
  the dialog (`.kshdet`: kitItem + name + kind · grade + kitRows "Tốn: Bạc −N mỗi món" (Bán: "Được: Bạc +N mỗi món") + kitItemRows
  Phẩm / Được / Mất / Ghi chú), closed by its ✕ (kit-x), a tap outside it or Esc.
- No "Thôi": the dialog closes with the header ✕ (kit-x, 32.10); the button row is hidden.
- Buying q pushes q items (the bag stacks them ×q), the shop stays open (tiles, money refresh; q back to 1).
- Bán = her sellable goods as the same tiles ("bán 15 bạc · có 2"), same stepper, button "Bán" / "Bán · 30 bạc"; nothing to sell → the
  `empty` line (Nội vụ phủ: how to get goods — luyện tài nghệ, tab Tài nghệ). Doable tiles first in both tabs. Sell data: review/econ jecon.js
  `econSellable(p)` → one entry per bag index `{ix,k,name,grade,src,price,via:"noivu"|"agent",risk,no}`; the Nội vụ phủ tab shows via "noivu"
  (legal, 70 % price, no risk), grouped by k+name (equal goods stack, "có N"), `no` greys the tile with its reason; one sale = `econSellUI(ix)`
  (else `econSell(S,ix)`); price = entry.price (else `econPrice(S, inv)`). The risky "Bán ra ngoài cung" stays j83 wkSell (not in this shop).
  Until they exist jinv's fallback (`kitShopSellable` / `kitShopPrice`) does the same from the bag: each handmade work its own tile
  (wk.n, wkSellVal, sold by wkSell with j83's odds) + items with a price (half price, j8 sellItem).
Used by: Nội vụ phủ "Nhờ thái giám mua đồ" (`kitShopNvp`, seller `img/fig-eunuch-ndp-tray.webp` = Nội vụ phủ eunuch holding a tray, stock 5, carry 9).
**Shop panel layout (review/shop-panel, owner 18/11):** outside option on the seller = «Để ta xem» (never a 2-item list); the panel keeps the seller figure LEFT; RIGHT = tabs «Mua» | «Bán» + a fixed 3-COLUMN `.kshg` (`.kshop[data-kshop] .kshg`, the grid scrolls down); **review/shop-panel-r2 (owner 18/11 ~18:30Z): NO picture strip on top (`.kdpban` hidden in `.kshopd`), NO "Ta có N bạc"; a tile shows ONE gain row «Sắc +2 · Danh +1» (`kitShopEff`, never the slot/kind word đeo tay / cài tóc / dùng; one line, ellipsis); the Bán tile shows the price only «25 bạc» (no "bán", no "có N").** **review/shop-panel-r3 (owner 18/11 ~18:55Z): under «Mua» | «Bán» ONE more row of the kit tab row (`.pctabs.kcattabs.kshkinds`, `kitTabRowHTML`, the same part as the Tư trang chest tabs and kitSubTabs; scrolls sideways when narrow) = item KIND, the SAME groups as the chest (`KINV_CATS`: Trang sức / Y phục / Vải vóc / Thuốc men / Hương liệu / Lễ vật / Thư từ / Tác phẩm / Tạp vật; Trang sức split by wear slot `KEQ_TT`: Cài tóc, Đeo tay, Đeo eo, Túi thơm…). First tab «Tất cả» (as the chest), a kind filters the 3-col grid; only kinds present in the current list; no row when the list has one kind (pet shop). Each item carries `cat` (`kitShopCat(k, crafted)`); the pick is remembered per mode (`o.cat[mode]`), so Mua and Bán each keep their own. Same in Nội vụ phủ, Tư trang «Nhờ thái giám mua đồ» and the Bán tab.** Test: `dev/test/shop-panel.js` (kind row, filter, buy + sell).
Next buying screens (Tư trang buy, gifts, peddler) must call kitShop, not dialog option cards.
Test: `node dev/test/shop-fix.js <build url> <outdir> [WxH@dpr,…]` (box = plain person dialog, row alignment, buy ×2 → bag ×2, sell, item card,
✕). Shots before / after: dev/shots/shop-fix/ (755x1000, 1000x755, 1180x820, 844x390).
- (review/pets-fix) A shop / pick person dialog (`kitModal({shop})` or `kitModal({pick:true})`) is not an event: it never gets the event band
  picture (kitEvArt returns null for it; a title word such as "tuyết" used to pull the snow-day picture). `pick:true` = the same dialog without
  a shop grid: users — the pet care screen (jpetcare: the pet is the "person" of the left column, `stage:[{__fig, __cap, __role}]`; right column
  = kitStatRow care cells, kitRows, kitGameFrame mini-game with `.kgbtn` pieces, act cards; closed by the kit ✕) and the pet shop (jpet petShop,
  same seller and "???" naming as kitShopNvp).
### 28.13e ALIGNED TILE GRID + BUY ON THE TILE (owner 11/15 shop-fix, "everything on one line") — `.kshg` / `.kshc` (jinv) — for every grid of goods
Any grid of goods with a price (shop, later gifts, peddler, rewards to pick) uses this tile, never a free-flowing column:
- Grid: equal columns `repeat(auto-fill, minmax(118px, 1fr))` (124 px ≥ 1000 px wide); rows `max-content`, so every tile in a row has
  the same height.
- Tile = a grid with FIXED rows, in this order: picture (kitItem "slot", ≤ 84 px square; 64 px on short landscape) · NAME (grade colour,
  2 lines reserved, clamped at 2 — a one-line name still keeps the 2-line slot) · USE LINE (one short effect, 2 lines reserved, clamped) ·
  PRICE (one line, the unit price once) · STEPPER `[−] q [+]` (30 px) · BUTTON (34 px, full tile width). Content never pushes a row:
  picture tops, name tops, use-line tops, price bottoms, steppers and buttons sit on one line across a row (test: spread ≤ 1 px).
- q starts at 1, q ≤ what she can afford, the stock and the bag limit per kind (`carry` minus what she has); − greyed at 1, + greyed at the max.
  q > 1 shows as the Tư trang stack badge on the picture (kitItem `qty` → `.kitq` "×N", bottom-right — the same badge as the bag), live.
- Button: "Mua" (q = 1) / "Mua · 60 bạc" (q > 1, the total) — Bán tab "Bán" / "Bán · 30 bạc". Cannot: the same button greyed with a short
  word ("Thiếu bạc", "Hết hàng", "Rương đầy"; a long reason goes to the tooltip). A tile she cannot buy even once has its picture greyed.
- Tap the picture → the floating kit item card (28.13d). Never TỐN/CẦN rows on the tile.
- PICK MODE `.kshc.kshpick` (j83 recipes, `dev/build/jwkr.js`): the same tile for "choose what to make" — picture · name (grade colour) · what it
  takes (ingredients) · level line ("Họa bậc 2" / "mọi bậc") · button ("Làm"; locked = greyed "Chưa mở", reason in the tooltip). No stepper row; the grid,
  tab row (`kitTabRowHTML`, one tab per kind when an art makes several) and tile sizes are the shop's. Panel spec `kit:{kind:"info", pick:1, html}` = the shop panel (`.kshopd`: no category art, button row hidden, header ✕ kit-x), never a "Thôi" row. Sample on the kit page (§47 `#kit`): id "§28.13e", the real `wkrTile` (one open, one locked).
Scene rule (same branch, jk2b kitEvArt): a dialog id with NO EVENTS category (plain "Tin trong cung", other pid without a category) gets the room she
is in (j17 evArt, season × buổi), never the j89 default category (Triều chính, officials kneeling).

### 28.14 WARDROBE K1 + K2 (review/wardrobe j92)
- K1 `kitWearSlots(p,{size})` (review/dress-offence, owner 16/11 18:30Z: "6 wear slots + the pet = 7"): SEVEN kitItem tiles right under the portrait on
  EVERY person card (player, consorts, maids, ma ma, Thái hậu…): Cài tóc (`p.wd.tram`) · Hoa tai · Đeo tay · Đeo eo · Túi thơm (jinv worn IT.sl) · Khăn che mặt
  (KIT_VEIL) · Y phục (`p.wd.y`) · Giày (GAP IT03: 8 wear slots + the pet = 9 tiles) · Theo hầu (jpet `p.petOn`); an empty slot = the empty kitItem with the slot name. Data: `dressSlots(p)` / `dressView(p)`
  (jdress). Marks, all existing kit parts, shown ONLY when the player has SEEN that dress (`dressNow(S,p)`: same place this buổi, or a Dò la report,
  while she still wears the same set; her own row always): kitItem corner tag `mark:["Vượt phẩm","r"]` on a piece above the wearer's rank (WD pieces
  only once their phẩm is known), the item's Xa xỉ box (`lux`), and the label row `.kwearl` = outfit status chip (Đúng phẩm / Vượt phẩm / Quá giản dị /
  Phạm tang, when known) + `.kitl` "Xa xỉ N / M" (her total vs her rank allowance; red when above; `BAL.lux.xx.showBud` false = total only).
  Tap: her own → Tư trang on that slot; someone else → item panel (name, grade, what she has seen, where Tố vượt phẩm / Tố xa xỉ are).
- K2 Rương đồ: REMOVED (review/balance-unified, 11/15). The wardrobe has no block of its own; it lives in Tư trang's ONE bag + "Đang mang"
  (`dev/build/jwdinv.js`, after jinv): WD trâm in the bag tab Trang sức, WD y phục in the tab Y phục (picture `WD_ITEMS[k].icon` = img/wd-<key>.webp,
  grade ground, corner Xa xỉ N); worn ones carry the worn band (Đang mặc, one word for every slot), pawned ones the tag "đang cầm". Đang mang: Cài tóc = `p.wd.tram`,
  Y phục = `p.wd.y` (one slot each). Tap an item → the one item panel (kitItemRows-style Phẩm · Được · Mất · Ghi chú, "chưa rõ phẩm" until learnt)
  + j92 act cards Cài/Mặc · Tháo · Tặng · Bán lén · Cầm cố · Chuộc lại; tap the Cài tóc / Y phục slot → pick another (1 khắc), fabric "May áo",
  Tự chọn đồ, Chải chuốt. Header: Sắc/Danh of ONE `wearBonus`, Xa xỉ total (ONE `luxOf`, WD included), and the Đúng/Vượt phẩm chip only when known
  or someone said it (j92 hidden rule: the level / allowance is never shown).
### 28.15 PERSON CARD after review FAIL 5b81408
- Screens 600–999 px portrait (Fold) on card tabs: stage 22 % of the screen. Left sticky column order: name, rank, BARS, portrait, wear slots, facts;
  right column: act tabs + act cards. Fold 755x1000 without scrolling: name y≈585, bars 630–733, first act card 679–793 (measured).
- `.kpstrip` (small frame, name, rank, bars) turns on below 1000 px whenever the bars are out of view.
### 28.17 PERSON CARD LAYOUT (owner 11/14, iPad shots 1114-ipad-card-layout-1/-2; replaces 28.7, 28.15 and the round-1 full-width header)
Every person card `.pc` (consort, servant, child, Emperor, Thái hậu, court, officials, strangers; panel, pop, modal), jk2b §18:
- iPad / landscape (`kitPcWide()`: width ≥ 1000 px or landscape): LEFT column (sticky, own scroll if taller) = name + rank, the BIG kit portrait
  (pcPort, rank ornament whole), wear slots, then ALL the info: relation block `.kpbars` (Ghen · Ngươi với nàng + bar · Oán + bar · Nàng với ngươi ·
  Sủng), stat tiles, Tuổi, Tính nết, chips. RIGHT column = an opaque sticky block `.kpstick` (note + act-group tabs `Gặp mặt 3/3 · Giao thiệp …`),
  then the act cards scrolling under it.
- Fold portrait (600–999 px): LEFT = name + rank + big portrait + tiles/facts (sticky); RIGHT = sticky `.kpstick` with the relation block on top,
  note and act-group tabs, then the acts. Phones (< 600 px): one column in the same order.
- Each fact once: real nodes are moved, nothing copied; no small duplicate portrait/name; the Sủng stat tile is hidden when the relation block shows Sủng.
- Sticky blocks are opaque (`--panel2`) with an 8 px cover upward; nothing peeks above them (measured 0 px at every size).
- Size: portrait screens < 1000 px: the card fills the panel exactly under the sticky sub-tabs (`.kpcfull`) and the face strip scrolls away when a
  person is opened (no strip band left between bar and card); after an act the card re-fits unless she scrolled the panel herself. Wide screens:
  strip + card, card = rest of the panel.
- Tested 686x880@2.2, 755x1000@2, 1180x820@2, 1366x1024@2, 412x1058@2 (dev/shots/hotfix-card/after3-*).
### 28.18 NO LONE BUTTON ROWS (owner 11/14, Fold) — jk2b §19
- A single button never takes a whole row; it folds into an existing control (chip, sub-tab, menu). First case: the "Bảng phẩm vị" row above the
  Phi tần face strip is gone at every size; the rank table opens from her rank chip in the top bar (`#me-r`, dotted underline, title "Chạm để xem Bảng phẩm vị") from ANY tab or sub-tab (sets `tab="rv"` directly; closes an open person-card modal).
  Inside the table the way back is "Về hồ sơ từng người" (sub-tab look). Leaving the tab/sub-tab closes the table.
- Sticky sub-tabs `.ksub` in the panel: opaque and the panel's 8 px top padding band above them is covered (box-shadow in `--panel`), so nothing peeks above.
### 28.16 kitName: no doubled title
`kitTitle` returns no title when the name already starts with it or with any role word (`KIT_ROLEPRE`: Thái y, thái giám, tổng quản, quan, thị vệ, vương gia, nhạc sư, công tử, ma ma, cô cô…).

### 28.19 PICTURE FRAME — `kitSceneArt` = `kitArtFrame` (owner 11/14 18:55Z + 19:10Z + 19:30Z) — THE ONE non-person picture component
Owner: "khung màu mè quá"; tassels (tua rua) and rank crests only on PEOPLE portraits. Every NON-PERSON picture uses ONE simple frame:
identity origin band, roulette tiles, event / news / Mệnh truyện chapter pictures, the result card's small picture, act-card art (6.1), info / rule art
(19), skill art (21). `kitArtFrame` (j79) is a one-line wrapper of it (shape tall); the old ornate consort-frame art (`.pcp.kit.kartf`) is deleted. People keep `pcPort` / `pframe` (28.0).
```js
kitSceneArt(src, label, {shape:"wide"|"tall", fb:"fallback src", col:"#category colour", cap:true|false, cls})
// → figure.ksart.ksart-wide|ksart-tall[.ksart-cat]  > span.ksart-ph (label, shown only while the picture is missing) + img + figcaption | em.ksart-chip
```
- Frame: 1 px `--gold` line + 2 px cream inner line + 1 px `#e6d3ac` hairline, radius 4, ground `#efe4cf`; picture `object-fit:cover` inside a 3 px mat.
- Shapes: wide 16:9 (a card's top band; the band may be capped in height, the picture then crops top/bottom) · tall 3:4 (ev-* / st-* / act-* / info-*).
- Size `size:"thumb"` (tabs-kit r7): the same frame as a small SQUARE tile beside text, `--ksth` 64 px (56 px under 600 px), 2 px mat, never
  stretched by its slot. Used by the §21 card (skills, works, chapter, sắc phong, empty). No other small picture tile (no private `--kth` squares).
  Inside a fixed slot (`.kaart`, `.kpiart`, `.kskart`, `.kpev`) the frame fills the slot.
- Caption: plain label = dark strip bottom-left (`figcaption`); with `col` = category colour on the frame line + small centred chip (act cards).
- Never add a crest, tassel, brocade or rank frame to a picture of a place / thing / scene.

#### 28.19b CORNER MARK — `kitSceneArt(src, label, {mark, markAlt})` (owner 15/11 mood dialog, review/mood-dialog) — `dev/build/jk2b.js`
- `o.mark` = a small seal picture laid in the TOP-RIGHT corner of any kitSceneArt frame (`i.ksart-mark`, a background layer, not an `<img>`,
  so the "picture fills its slot" img rules of `.kdpban` / `.kaart` / `.kpev` never stretch it); width clamp(34 px, 17 %, 64 px), 1:1,
  drop shadow, no tap. `o.markAlt` = its text (aria-label). Thumb tiles: 40 % at 2 px.
- Passed through every path that builds a dialog picture: `headArt:{src,label,mark,markAlt}` (jk3 band) and a kitEvArt result
  `{src,lab,mark,markAlt}` (kitEventStage / kitEventDp banner, jk4).
- First user: the MOOD BOX "Tâm trạng · X" (jevb `emoBox`): mark = the SAME painted mood seal as on the portrait
  (`img/kit/emo-[m-|mo-]<k>.webp`, emoArtSet: women / young men / mature men; `emo-an` when the mood is unknown).
- MOOD BOX PICTURE (owner 15/11 "ảnh khung tâm trạng là hiện sự việc liên quan, nhưng là tấn phong kìa"): the picture of the EVENT that caused
  the current mood, caption = that cause in its own words (« » option quotes dropped). `emoCauseArt(cause)`: the event picture recorded with the
  cause when an event choice set it (evbMood → cause.a) → `EMO_CAUSE_EV` (mood-cause words: qua đời / mất con, sinh hạ, lãnh cung, giáng /
  cấm túc / phạt, tấn phong, thị tẩm / lật thẻ, ốm, việc triều, làm nhục, đối đãi tử tế, chơi đùa) → the week book table `KBK_EVRE` → a picture
  made for that line (kbkSpecific, only if on the CDN) → the mood's own scene `img/ev-mood-<k>[-2].webp` (no cause / no picture; 10 moods incl.
  `an` = chưa rõ, 2 each, 800x600, no people, gloomy moods dark). Caption then = the mood word ("Chưa rõ lòng người" when unknown).
- LOOK-UP PANELS (`kit.look`: Tâm trạng · X, Đã biết về X, Chứng cứ về X) are not visits: kitEvArt returns only their own headArt or
  nothing — never the person-dialog default "Có người đến chơi" (jk4) and never the §59 placeholder (jph).
Test: `node dev/test/mood-dialog.js <build url> <outdir> [WxH@dpr,…]` (tấn phong / mất con / thị tẩm / no cause / recorded event / unknown /
intel panel / the Emperor with the men's seal).

## 29. SETTING CONTROLS · SLIDER / TOGGLE / TEXT BOX (jkitctl, kit review 11/14) — KIT READY: slider/toggle/input
Every setting control of the game uses these three (no browser-default range, checkbox or monospace text box anywhere). First user: Thiết lập
(title screen; ☰ in the game opens the same screen, so it is also the in-game Thiết lập). Each keeps a real `<input>`/`<textarea>` with the given id,
so handlers (`oninput`, `onchange`, `.value`, `.checked`) stay as they are.
```js
kitSlider({id:"o-mus", label:"Nhạc", value:.5, min:0, max:1, step:.05, sub})          // label · track · number 0–100
kitToggle({id:"o-vib", label:"Rung", on:true, sub, yes:"Có", no:"Không"})             // label · state word · switch
kitInput({id:"x-in", label:"Dán bản chép", value, placeholder, rows:4, readonly, sub}) // label above · paper box
kitInputize(textareaOrInput, label)   // turns an existing box (older module markup) into the kit text box with its label
```
```
label.kctl.kslider  > span.kctl-l (+small sub) + span.kctl-c > input.kslr[type=range] + output.kctl-v
label.kctl.ktoggle  > span.kctl-l (+small sub) + span.kctl-c > b.ktg-w + input.ktg[role=switch] + span.ktg-t > i
label.kctl.kinp     > span.kctl-l + textarea.kinput | input.kinput
```
- Row: label left (`.88rem` 600, sub `.74rem` --dim), control right, hairline `--k-hair` between rows, row ≥ 44 px; the whole row is the tap target.
- Slider: 40 px tall hit area; 10 px track in `--line` with the filled part lacquer red → amber (`#b0402c → #c98a2a`), the rest `--k-card2`;
  knob 28 px gold ring with a lacquer-red centre (the seal colours); the number (0–100, `--gold`, bold) always beside the track. Fill and number
  follow the finger (document `input` listener, `--v`).
- Toggle: switch 52×32 (knob 24): off = `--k-card2` track + cream knob; on = lacquer-red track (`.kbtn` gradient, gold inner ring) + gold knob.
  State word left of the switch (default Có / Không; Tiếng uses Mở tiếng / Im tiếng), red when on. Keyboard focus = the kit selection ring.
- Text box: `--k-card` paper, `1px --line`, radius `--k-rad`, body font `.85rem` (never monospace), min-height 40 px, focus = `--k-sel` halo;
  read-only boxes `--k-card2`. Buttons next to it are `.kbtn` / `.kbtn.alt`; a picked choice button gets `.ksel`.
- Thiết lập: ONE switch "Tiếng" (replaces the old "Mở tiếng" button + "Im tiếng" box: on = sound on and not muted), sliders Nhạc · Tiếng động ·
  Giọng, switches Rung · Cảnh động; grid of 2 columns when the panel is ≥ 480 px, else one. Chép sổ / Nạp sổ: kit text boxes + `.kbtn`.
- `prefers-reduced-motion`: no knob animation. Tested 755x1000@2, 1180x820@2, 1366x1024@2, 412x1058@2, 390x844@3, 1024x768@2 (dev/shots/title-screen/).

Chọn sổ (j74): one kit section per sổ: `h4.kpst` "Sổ một/hai/ba" + `kitRows` (Kiếp = rank title + name, Ngày = `kitDate`; empty: Kiếp "Chưa ghi")
KIT SLOT ROW `.kslot` (owner 16/11 "info on top, buttons below"; COMPACT s22, kit request "3 sổ + Phúc duyên on iPad 1180x820 without scrolling,
room for the Sổ mây card"): ONE part for every sổ / room / Sổ mây / Nhập ám hiệu slot. Grid of two columns: the slot name `h4.kpst` as a 6.4em
label column on the left (rule on its right, words kept together); on the right the `kitRows` on top as label+value PAIRS that flow on a line
(a pair never splits; a value wraps only when it alone is longer than the line, `text-wrap:pretty`; info line-height 1.22) and the `.kslot-a` kit
buttons in ONE row below (30 px, equal width). Same rule in both canvases (no breakpoint). Solo row 72 px (was 144), room row 88 px, Sổ mây 66,
Nhập ám hiệu 55 (its row shortened to "Gõ ám hiệu hảo hữu gửi", MAIN s22 content call (a)); iPad 1180x820: Một mình (Sổ mây + 3 sổ + Phúc duyên)
520 px of the 574 max, Cùng hảo hữu (Nhập ám hiệu + 3 rooms + Phúc duyên) 558 px — no scroll on either tab; Fold 755x1000: no scroll. Test `dev/test/kit-fit2.js` slots / slotsco; kit page sample "§29 slot" (j74).
- **Chọn sổ frame + buttons fix (owner 17/11 "Lỗi tùm lum", review/save-dlg-fix):** (1) ROOT of the small frame + empty picture column: `kitFrameLive3` (jksize.js) re-laid the title page as an event frame (380 px, picture column) because the page parts (`.kpt-mount`) are mounted AFTER showModal, so the `KSZ_LIVE_SKIP` test saw an empty body; `.kpt-mount` is now in `KSZ_LIVE_SKIP` (Chọn sổ, Thiết lập, Sổ luân hồi keep the page layout, 560 px). (2) ONE button rule (j79, every `.kbtn`): a word never breaks inside a button (`word-break/overflow-wrap normal`, no hyphens); `.kslot-a` buttons wrap to a new row (`min-width:min-content`) instead of squeezing. (3) "???" on a slot summary: the name masks of the loaded life (j61 `k61Node`, jaudit `kitRankNamePaint`) now skip `.kpt-mount` and `.kslot` (they show OTHER lives). Tests: `dev/test/save-dlg-scan.js`, `dev/test/save-dlg-mask.js`.
- **Sổ mây card in Chọn sổ (owner 16/11, review/chonso-cloud, `jcloud.js` `miniHTML()`):** first card on the "Một mình" tab, above the 3 sổ, the SAME `.kslot` part: `h4.kpst` "Sổ mây" + `kitRows` (Tình trạng; linked: Ám hiệu masked `••••-••XY` + "đồng bộ lúc" time) + `.kslot-a` buttons from the ONE `btnsHTML()` shared with Thiết lập › Sổ mây (not linked: Giữ sổ trên mây / Nối sổ; linked: Đồng bộ ngay / Ám hiệu sổ / Các bản đã giữ). Opens the same `data-cl` jcloud flows; no co-op card (a co-op life never lives in the cloud).
+ `.kbtn` "Tiếp tục kiếp này" / `.kbtn.alt` "Kiếp mới" (asks "Chắc chắn?" once). The list is redrawn on every visit, so a half-confirmed
"Chắc chắn?" never survives leaving the screen; the Nạp sổ paste box closes when Thiết lập is left.

## 30. BACKDROP KIT · PORTRAIT + LANDSCAPE (jbd, owner 11/14 16:05Z) — KIT READY: landscape-art
Owner rule: every full-screen / large backdrop exists for BOTH shapes — a portrait painting AND its own painted wide composition (gpt-2-6,
same scene / same people), never a stretched or faded copy, never an empty panel. ONE registry + ONE rule (`dev/build/jbd.js`, loaded before j74):
```js
KIT_BD = { key: {p:"portrait art", l:"wide landscape art", m?:"4:3 art", pos, posl, posm, grad, gradl, gradm, col, sel?, box?} }   // the only place a backdrop url lives
kitBackdrop(el, "key", {box})   // puts classes `kbd kbd-key` on el (null = take it off); box:true = choose by el's own shape
```
- THREE shapes: portrait `p` (taller than wide) · 4:3 landscape `m` (wider, up to 7:5 = 1.4: iPad 1366x1024, 1024x768) · wide landscape `l`
  (over 7:5: 1180x820, 16:10, 16:9). An entry without `m` uses `l` for both. Viewport by CSS media query (no script needed); a backdrop on a box
  that is not the whole screen (`box:true`, e.g. the podium panel `.kpod`, max 1100 px wide) is measured with ResizeObserver → `data-kbdo="p|m|l"`
  by the same thresholds (`kitBdShape(w,h)`).
- A backdrop whose people sit beside a panel needs art for each landscape tier so the panel covers nobody: the title's group fills the left 58 %
  of `title-key-l` (fine from 1.4 up) but would run under the menu at 4:3, so `title-key-m` (4:3) keeps all six people in the left half.
- No half of any landscape art may be empty mist / plain colour (kit review 11/14).
- `sel` = static screens that wear the backdrop by their own selector (no JS): `#title.title`, `.kpod`, `.modal.night`.
- `grad`/`gradl` = the soft veil for that shape (title: portrait fades at the bottom under the menu; landscape keeps the painting clear, the menu
  panel sits on the calm right side of the wide art). Never write `background:url(...)` for a backdrop elsewhere; add an entry.
- Panels over a backdrop stay kit panels (section 14 scene panel: right column in landscape, bottom in portrait).

| key | where | portrait | landscape |
|---|---|---|---|
| `title` | title screen + Chọn sổ / Sổ luân hồi / Thiết lập (j74) | `img/title-key.webp` 1350x1800 | wide `img/title-key-l.webp` 2100x1400 (same Emperor, lead consort in red with fan, 4 consorts on the left 58 %; lotus pond, bridge, moon, palace on the right) · 4:3 `img/title-key-m.webp` 1920x1438 (all six in the left half) |
| `reborn` | identity card / every reincarnation modal (jk2b `kitRebornBg`) | `img/bg-reborn-p.webp` | `img/bg-reborn-l.webp` 2100x1400 (redrawn 11/14: wheel-moon, jade bridge left, pavilion + weeping plum right, lotus lanterns across; no empty half) |
| `roulette` | origin wheel `#kroul` (jk2b `kitRoulette`) | `img/bg-reborn-p.webp` | `img/bg-reborn-l.webp` |
| `podium` | honour podium `.kpod` (j90), box-measured | `img/kit/podium-bg-p.webp` 1050x1400 (new) | `img/kit/podium-bg.webp` |
| `night` | thị tẩm modal `.modal.night` (night2 card; `pushFront`/`deserQ` now keep the card's `cls`) | `img/tam-cung-dem-p.webp` 1050x1400 (new) | `img/tam-cung-dem.webp` |

Not backdrops (checked 11/14 at 755x1000@2, 1180x820@2, 1366x1024@2): the map (`mapimg`, pannable picture with hotspots in a tab), the stage scenes
(`SCIMG`, 1280x720 inside the stage; owned by the stage/HUD layout), the week book (kitBook pages over a CSS dawn sky), the death card (kit panel
over the game), origin pictures (now in the identity art frame, 28.11). Mini-game backgrounds (`img/kit/mg-*-bg*.webp`, 1024 square, review/minigames,
not on main yet) sit inside the game box; when that branch merges, any of them shown full screen must get a KIT_BD entry with both shapes.
Tested 755x1000@2, 1180x820@2, 1366x1024@2, 412x1058@2, 390x844@3, 1024x768@2 (dev/shots/landscape-art/).

## 31. KIT 3 · FOLD LAYOUT (kit owner, owner Fold/iPad shots 11/14) — `dev/build/jk3.js` (before j84) + j59 gutters + jk2b §2/§18/§19
Supersedes 15 (status in the header), 19 STATUS/STATUS SHEET, 28.3 stage heights, 28.4 header chips. One rule set for every screen and mode
(consort road, cung nữ road, lãnh cung).

### 31.1 TOP BAR = ONE slim row
`☰ · her kit frame + name + rank chip (#me-r, tap = Bảng phẩm vị) + short date · Bạc / Sức / Sủng / Danh` (servant road: Chủ tin in place of Sủng).
Date = VANPHONG short form `Tháng ba · trung tuần · năm thứ nhất` (`k3Date()`), shown ONLY here. Phones < 600 px: the four stats drop to a
second row. Nothing else lives in the top bar: the Hoàng thượng box, Thái hậu / Hoàng hậu chips and the status chip row moved to the stage (31.2);
`#hud2` stays in the DOM only as the host of the status sheet. The old "▾ Tư chất" toggle is gone.

### 31.2 STAGE HUD — kit plaques at the stage edges (`#kshL` in `.stop`, `#kshR`)
**31.2a State row never past the edge (review/small-bugs-3, KIT_REQUESTS "k3 top state row wrap/overflow rule"):** under 600 px the two lines of `#k3tt`
flow as ONE wrapping row of whole items (`.kstl`/`.kstv` `display:contents`, flex-wrap; each `.k3r` nowrap): time, toilette, weather, quẻ and every
`K3_STATE` chip stay whole, the next item drops to a new line (was: "Quẻ Hạ (Co…" cut at the right edge). ≥ 600 px the `khd2` two-row bar applies (§32.12).
Plaques: `--k3pl` = `rgba(255,250,240,.88)`, `1px --line`, radius 8, text ≥ .75rem (.64rem on narrow stages `.k3n`), never truncated.
- LEFT column (`--kgw` wide): place name (`#sc-t`) · time plaque (Buổi …, còn N khắc, weather chip with its painted icon, Quẻ tuần) ·
  Tư chất (Sắc, Tài, Tâm cơ, Đức with icons; icon + number in 2 columns on narrow stages, label in the tooltip) · Tình trạng chips (Giả bệnh,
  Mang thai, Lãnh cung, Cấm túc …).
  EXTENSION (jstory, owner 17:06Z): a module adds a state chip by pushing its key to `window.K3_STATE` and appending a
  `#hud2 .hc.hot[data-hx=key]` button (label + `<b>value</b>`); jk3 draws it in the top-bar state row (`#k3tt`) like the others.
  Used by the story deadline chip `pl67` "Hạn lo liệu <còn N buổi/ngày>" (short label so the top row fits at 1000x755; the task name is in the dialog it opens and the Mệnh truyện block; tap = that story choice again).
  Label and value are spaced by `.k3tt .k3r>.k3l+b` (jk4, review r6: "truy sát4 buổi" ran together). Kit page sample `§31.2` (jstory).
- RIGHT column: Hoàng thượng (mood) · Thái hậu · Hoàng hậu (`với ngươi ±N` green/red, mood only when known: no "chưa rõ" filler) · her servant
  (`Lòng N`) — tap = that person's card. Servant road: + Hoàng thượng để ý, Lương tháng, Công lao.
- ÂN SỦNG plaque (owner 11/15 04:05Z, review/sub-odds; `k3AnSung` / `k3AsRows`, jk3) right UNDER the court chips, same solid plaque card and
  column width: header "Ân sủng", one fact per line, label left / value right, labels never cut: Tai mắt N · Có thai: Rất thấp…Rất cao ·
  Lật thẻ: Rất thấp…Rất cao (`chanceLvl`, j1 — the chance scale, NEVER the act ladder) · Ân tình (đêm) N · Số lần ân thưởng N ·
  Bổng lộc: sau N tuần (shown nowhere else). Consort road only (not the servant road). Tap a row = that fact's own card (j19 HX text,
  Bổng lộc card, Ân thưởng card) via `k3Explain(k)`.
- CROWDED stage (`k3AsCrowded`: the right column would pass the stage floor − 8 px, or touch a figure body `kitFigRects()` or a name tag):
  the plaque collapses to ONE chip "Ân sủng ›" (`.kas-one`); tap = the plaque opens IN PLACE (owner 11/15 17:40Z + reference shot
  an-sung-ok): the full Ân sủng plaque above, same column width, label left / value right, header "Ân sủng ‹" (`.kasfold`) folds it
  again; never a floating popover (the old `kpPop` `.kascard` overflowed the right edge and cut values). While open the right column
  scrolls inside the stage (`.kshR.kasx`) instead of passing the floor; it folds back on a new place / buổi / month. Re-checked
  whenever the content or the stage size changes. Measured at Fold 755x1000, iPad 820x1180 / 1180x820 / 1366x1024, phones 412 / 390.
- The figures stand BETWEEN the two columns: j59 reads `--kgl/--kgr` (the plaques' real widths) as gutters; measured 0 plaque/figure overlaps.
- NO STATUS SHEET (owner 11/15 04:05Z): the "Tư chất · trạng thái" sheet (`#hud2 .khg`) and every opener are gone — `k3Sheet(true)` is a
  no-op, `#hud2` is kept folded (`hclh-h2c` forced to "1") and stays only as the hidden data source of the plaques. A tap on a plaque row or on
  a top-bar Tư chất cell opens that fact's own explanation (`k3Explain`), never a sheet. Its rows all live elsewhere: Tư chất (top bar), Tai mắt +
  Ân sủng + Bổng lộc (Ân sủng plaque), Lòng cung nữ + Trong cung (court chips), Quẻ tuần (top bar time row).
- One fact, one place: date (top bar), khắc + weather + Quẻ (time plaque; the old dots ●●●● are gone), Thái hậu/Hoàng hậu attitude (their chip),
  Sủng (top bar), Chủ tin (top bar on the servant road).
- Check: `node dev/test/an-sung.js <site> index.html <out> after` (column inside the stage, no overlap with figures / name tags, no clipped label,
  no ladder word, the sheet cannot open, the collapsed chip opens its card).

### 31.3 ONE STAGE SIZE
Portrait split (only when the phone shell 31.7 is off): fixed aspect 2:1 (600–999 px) / 3:2 (< 600 px) on EVERY tab (no more 22/24 dvh "card tab" squeeze); the panel below scrolls. Landscape: the left column.
Figures (j59): one height for all adults, 80–85 % of the stage at Fold/iPad (measured), feet on one floor line.

### 31.4 SCENE CROP + FLOOR ANCHOR (`KIT_FANCHOR`, jk2b §2)
Per room (same composition in every season × buổi): `{x, feet}` fractions of the picture = centre of the open floor and the feet line.
The picture is cover-cropped keeping the floor; on tall stages it slides sideways so the open floor sits in the middle of the free zone between
the plaques; feet stand on the painted floor, the group is centred on `x` (never on the bed / furniture). Rooms: duong-tam-dien .5/.93,
khon-ninh-cung .55/.92, kinh-su-phong .45/.92, lanh-cung .36/.93, ngu-hoa-vien .3/.9, ngu-thu-phong .5/.92, phi-tan-cung .5/.9,
tam-cung-dem .68/.94, thai-y-vien .45/.9, tu-ninh-cung .5/.9. A new room adds its line here.

### 31.5 STICKY BARS · CHIP LISTS · PANEL SCROLL
- Every sticky bar in the panel (`.ksub` sub-tabs, card blocks 28.17) is opaque and covers the panel's top padding band; nothing peeks above it.
- Chip lists / selectors (`.relsel` "Xem quan hệ của", `.pctabs`, `.chips`, `.kchips`) wrap, never clip; the panel scrolls.
- No lone button rows (28.18).

### 31.7 kitPhoneShell (jk3 §6) — portrait screens under 1000 px wide (Fold, phones)
Two views instead of the split: HOME = the room full screen between the slim top bar and the tab bar (stage HUD plaques on it; figures big on the
floor; tap a person = card) · PANEL = a bottom tab opens full screen in place of the room (sub-tabs, compact picker strip, person card get the
whole height). Back to the room: tap the active tab again, or "‹ Phòng" (kit `.btn`, top bar, only shown in PANEL view); "Sang buổi" always lands
in the room; any code that switches tab opens the PANEL view. A card opened from the room (`#popw`) shows full screen (`html body .game#game.k3ph.k3pop>#popw{grid-area:stage}`: j59dock gave it `grid-area:panel`, which the one-page grid (hud/stage/bar) does not have, so it took implicit tracks and squeezed the top bar to 329 px on the Fold) and returns to the room. RULE: a docked panel on the k3ph grid uses ONLY `hud`/`stage`/`bar`; scan: `node dev/test/fold-popw.js <device> <outdir> <tag>` lists every element whose grid-area is missing in its grid parent (only hidden ones remain: #emp/#hud2 in the top bar, #stage on the map tab).
Result cards / events overlay as before. Classes on `.game`: `k3ph` (shell on) · `k3home` · `k3pop`. Room view measured: 686x880 670x720 (0.93) ·
755x1000 739x867 (0.85) · 412x1058 400x860 (0.47) · 390x844 378x646 (0.59). Landscape / ≥ 1000 px keep the split (31.3).

### 31.8 Portrait room paintings (stage tier "p", jk2b §2) — CANCELLED by owner 11/14 (landscape room art is used full screen; hook KIT_STAGE_P kept, unused)
`img/<scene>-<season>-<buoi>-p.webp` (3:4, 1536x2048, people-free, open floor lower 45 %, details in the middle 60 % of the width). Used whenever
the room view is taller than wide (phone shell, iPad left column) and `KIT_STAGE_P[scene]` is true; floor anchor `KIT_FANCHOR["<scene>-p"]={x,feet}`.
No other code change; until then the 16:9 art + its anchors are used.

### 31.9 PERSON CARD INFO GRID (jk2b §20) — every person card
Facts as short labelled value chips `.kpgrid > .kpgr > .kpq` (relation row: Ghen · Thiện cảm N ▮ · Oán N ▮ · Nàng với ngươi · Lòng/Chủ tin;
stats row: Sủng · Đức · Danh · Sắc · Tài · Tâm cơ; small row: Muốn hại ngươi ⓘ · Tuổi · Tính nết; status chips after). Unknown = "?" (dim), the
long wording is the chip's tooltip (tap = kpPop). Fold/phones: next to the portrait (name + rank on one line above); iPad: under the portrait.
Act-group tabs: one sticky row (sideways scroll on narrow). The helper sentence ("Không gặp mặt: phải sai người…") is a Ghi chú row on the acts it
explains, never a body line. Compact picker strip always visible above the card (palace labels dropped under 1000 px portrait).

### 31.10 NON-PERSON PICTURES — ONE component: `kitSceneArt` / `kitArtFrame` (28.19; review/identity-card merged 11/14)
Act cards, events, news, story, info, skills, works, places, identity origin band, origin wheel: simple gold-line frame, NO pendant/tassel
(tassels are for people only); act/info slot `--kaw` 170 px (128 px on phones) × 4/3.

### 31.11 CATEGORY TABS — `k3CatTabs` (jk3 §7): any `.cards` grid of 6+ act cards in 2+ categories (Hành sự, servant Phận sự, Cung nhân, Tài nghệ…)
gets the kit tab row `.pctabs.kcattabs` ("Tất cả" + one tab per act category from `KIT_CAT`, count làm được/tổng), sticky, one sideways-scrolling row
under 1000 px; the choice is remembered per tab (`hclh-kcat-<tab>-<n>`).

### 31.12 TOP BAR ROW 2 — `k3TopRow` (jk3): time (Buổi + 4 khắc dots, filled = left; weather chip; Quẻ) + status chips | Tư chất (Sắc · Tài · Tâm cơ ·
Đức, icon + number; Đức < 50 shows a small gold "!" whose tooltip says "Cần Đức 50 mới được lập Hoàng hậu" — stats are never red, red = cost/risk only).
Fold/phones: a compact row under the name/stats; iPad (≥ 1000 px): the empty middle of the bar, two columns. The stage keeps only the place name
(text on the painting, one line, light halo), the court chips and the figures; name tags under figures are text on the painting too (rank + name, one line).
Floating notes (`.kmnote`) sit just above the bottom tab bar.
PLACE STAGE LAYOUT (owner 18/11 ~02:50Z + ~03:02Z, OD:L1814/L1818; `dev/build/jplst.js`, review/place-stage): NO plaque over the stage (`#sc-t` stays in the DOM as the data carrier, hidden).
  Slots: (1) people-count chip (`.kchip.j59hchip` = kit person icon + number) = FIRST item of the stage rail (kitStageRail item `{id:"here",order:0,chip:()=>html}`, new `chip` item kind: a non-button, never tappable), V/L/M stand under it; none at 0 people.
  (2) place name = top of the right column (`#kpname`, kit paper like `.k3p`, 1.1rem bold); the court cards (`#kshR`) are shifted down by `--kpnh` (name height + 6). (3) the place-entry line (`S.visit.msg` minus the count: "Thái giám chặn cửa", "Hoàng thượng không ra vườn hôm nay"…) = a §42.2 `kitNotice` (r4 ONE NOTICE SYSTEM; owner 18/11 ~03:3xZ "chip giống tai mắt báo"): the top-bar «!» box + one top chip line for BAL.entryToastMs, once per visit line, no modal, no sound; `kitLineToast(text)` (jplst) is routed to kitNotice. A line that carries a BUTTON ("… vừa rời đi [Theo]") stays tappable as the persistent top-of-stage `.kmnote.kmslot > .kchip`; never over a head. Figures keep the full kit size (no plaque cap).

### 31.13 SELECTED STATE — ONE look for every picker (jk3 §8, owner 11/14 approved; kit owner #2)
Dung mạo faces (`kitPicker .kpki`), consort / servant / kid picker strips (`.pface`), origin wheel tiles (`.krt`), pressed kit toggles (`.ksel`):
NO box / background block and NO check badge (`.kpkck` removed from the markup and hidden). Selected = soft gold glow following the frame's own
outline (`--k-glow`: `drop-shadow(0 0 5px #ffd66e) drop-shadow(0 0 2px #be8c1ee6)`), the frame ×1.06–1.07, full colour; unselected opacity .7–.75.
`aria-checked` / `aria-pressed` stay. Buttons (`.ksel` on `.kbtn`) get the same glow as a 2 px ring + soft halo.
### 31.14 RESULT TEXT AS BULLETS — `kitBullets(el)` / `kitBulletsHTML(html)` (jk3 §11, owner 11/14)
A long result / report / spy / news paragraph (≥ 70 letters, 2+ facts) becomes `ul.kbl` (one fact per line, small gold dot). Split on the
text's own sentence ends and on a "Label:" after a long header ("X nghe lén chuyện của Y: Nết: Đa nghi" → 2 lines); a sentence that is only
"( … )" filler becomes a dim footnote `small.kblf`; "(Bạc +60)" / "(thiện cảm -3)" get kit gain/cost colours. Applied automatically (MutationObserver)
to `#rtoast .ksen` (result card), `.pc .pcn` (person-card result note), kit panel facts (`.dlg.kpanel .kfacts`); never the identity card.
A quoted speech “…” is ONE fact: never split inside the quotes (a speech of two sentences stays one line; the next fact starts after the
closing ”) — review/toilette 15/11, same rule in the kit fact rows `kpSentences` (j79, event / news dialogs). Scan `node dev/test/kbl-quote-scan.js <oldRef>` (116 multi-sentence speeches in the game: bullets 115 cut → 0, fact rows 115 → 0).
### 31.15 SMALL GROUP RULES (kit owner #2)
- Name tags under figures never overlap: a tag that would touch another steps one line down (up when no room) — `k3Tags()` (jk3 §10).
- Court chips (Hoàng thượng / Thái hậu / Hoàng hậu / her servant): title one line (`nowrap`); the right plaque column is `max-content` (min
  `--kgw`, max 46 % of the stage) and j59 reads its real width as the gutter.
- A card opened from the room (`#popw`) lies above the panel's sticky rows (z 12); its "✕ Lui" sits in the card's top-right corner (no lone row, 28.18).
- Kit panel button row (`.dlg.kpanel>.mr`, buttons that mean something; close words are gone, 32.10) is pinned at the dialog bottom; the body scrolls under it.
- Category tabs (31.11) stay ONE sideways row under 1000 px (the chip-list wrap rule 31.5 excludes `.kcattabs`).
- Person info chip labels start with a capital ("Lòng 70", not "lòng").
- A row holding several bars (servant "Lòng ▮ 78 · Chủ tin ▮ 52", `.sbar`) gives one chip per bar.
- An act RESULT on a person card (`popMsg` → `.pcn`, e.g. "Sai đi dò la: thành …") stays on the card as `.pcn.kpres` under the sticky tabs, listed by
  kitBullets; only a helper sentence ("Không gặp mặt: phải sai người…") moves into the acts' Ghi chú (31.9). Before this fix the result vanished.
- Her own age: chip "N tuổi" (`#me-a.k3age`) right after the rank chip in the top bar, every device and road; nowhere else in the bar.
- Act cards never show an empty Mất row ("không mất gì") — j63 kaRows.
- End card (j32 `over(h,t,fate[,alive])`): "Chết vì" only when she died; a living ending (thoái vị, xuất cung, xuất gia, về quê…) reads "Kết cục"
  and "Kiếp này khép lại." Callers may pass alive=true/false.
- Dialog options (26.6 event rule hides outcomes): an option with `showOdds:true` keeps its odds word; `showOut:true` shows the full act card.
- Stage veil / scar overlay (`kitFigFx`): laid over the DRAWN figure (object-fit + object-position + the image transform), not the img box.

### 31.16 OPTION GROUPS — layout per screen ('rows' | 'grid') + DIALOG HEADER PICTURE (jk3 §13, owner 11/14)
Component: every dialog option group (`#modal .opts`, `.kpscopts`) gets `.k3rows` (full-width cards, one per row) or `.k3grid` (equal cells,
2 columns; 3 on ≥ 1000 px when 3+ short options). Chosen PER SCREEN: a Q / kitModal item sets `optLayout:'rows'|'grid'`; without it the
layout is read from the options' content — LONG option = Cần / Được / Mất / Kèm rows, an odds word, or a title over 2 lines; SHORT = title +
cost line. All long → rows · all short → grid · mixed → long ones span the full row, short ones share the grid.
A dialog may carry `headArt:"img/…webp"` or `{src,label}` → wide kitSceneArt band on top (height clamp 90–220 px).

| screen | layout | reason |
|---|---|---|
| Weekly events (j68), side events, dilemmas (j70) — event rule shows cost only | grid | short: title + Tốn |
| Mệnh truyện chapters (j67) | grid | short (cost only, outcomes hidden) |
| Succession card "Tiên đế băng hà" | rows (`optLayout:'rows'`) + headArt | long, consequential choices |
| Big story events | rows + headArt | long texts |
| Night / thị tẩm choices | auto → grid when cost-only, rows when they carry odds | content |
| Result cards (#rtoast) | n/a | no options (bullet list 31.14) |
| Reward chests, minigame start, confirm Yes/No | grid | 2–4 quick picks |
| Chải chuốt, Tư trang actions | auto (grid for quick picks, rows for act cards with Cần/Được) | content |
| Identity card | approved pinned pair (unchanged) | owner approved |
| Sổ luân hồi / Chọn sổ | grid | slot picks |
| Act lists in Hành sự, servant Phận sự, person-card acts | rows (act cards, `.cards`, not dialogs) | long: Cần/Tốn/Được/Mất rows + odds |
| Act-like options inside a dialog (`showOdds` / `showOut`) | auto → rows | they show odds / outcomes |

### 31.17 ONE PERSON CARD · CATEGORY FRAMES · ALIGNED TOP BAR (jk3 §14, owner 11/14 — "iPad landscape = two phone panels side by side")
- Person card: the iPad two-column card on EVERY screen ≥ 600 px (`kitPcWide`), Fold included — no separate Fold card. Left column top-aligned:
  name → rank → rank frame at full column width (the frame picture's empty headroom is trimmed per frame) → chips (wrap, never clipped) →
  one short dim helper line "Mới biết tên ⓘ" (full text in the tooltip) → Biết tên / Nơi ở. Column `--kpcw` 29 vw (170–240 px) on 600–999 px.
- A consort card ALWAYS shows the relation row Ghen · Oán · Thiện cảm · Nàng với ngươi ("?" when unknown) — kitPersonChips.
- kitSceneArt with a category (`kcat-<cat>` + `--kcc`): rich double border in the category colour, four corner ornaments whose shape differs
  per category (square / round / diamond …), inner hairline style per category, label plaque at the bottom; never a tassel.
- Top bar: SUPERSEDED by 32.1 — all eight cells are ONE kitStatCell (the old copy-the-font approach drew Tư chất separately; review FAIL).

### 31.18 PANELS SIZED BY THEIR OWN CONTAINER (owner 11/14 23:30Z "iPad landscape = two phone panels side by side") — jk2b §18 / jk3
- The person card and the act lists read the width of the box they sit in, never the screen: `kitPcWide(pc)` measures the card's container
  (`#panel`, the stage for a room card, a dialog) → `.kpwide` (two columns) from 440 px, `.kpnar` below; the left column `--kpcw` = 36 % of the
  container (150–240 px), set on the card. Act lists: `#panel.k3pn` (panel < 440 px, ResizeObserver) gives the small act picture (`--kaw` 128 px).
  No CSS `container-type` (it would trap the fixed status sheet inside the panel). Category tabs are one sideways row at every width.
- Result: the iPad right panel (≈ 470 px), the Fold full-screen tab (≈ 670 px) and a phone tab (≈ 375 px) use the same rules; the iPad panel
  and the Fold tab render the same two-column card. Panels are plain blocks (no viewport rules inside), so they can sit in a book page
  container (kitBookSpread, review/page-curl) as they are.
- Card left column: name → rank → frame at full column width, trimmed so the frame's ornament (crest / cloud top, `img.kcrest --ct`) starts
  right under the rank (gap ≤ 12 px, measured 686 + 1180); the trim runs throttled (it starved under constant DOM mutations before).

### 31.19 ACT ORDER — doable first (owner 11/15 04:55Z "Nên để hành động nào làm được ở trên cùng") — `kitActSort` (jk3, end)
Every act list (Hành sự and each category tab, person-card act groups, Cung nhân, map place acts — any `.cards` / `.rbtn` whose children are
all act cards `button.ka`) reads: 1) doable now · 2) blocked ONLY by time (every ✗ in Cần is a buổi / khắc item) · 3) blocked by anything else
(greyed). Source order is kept inside a group. The order is decided once per list per buổi (`KAS_ORD`, keyed by the set of acts + date + buổi)
and then kept: doing an act (it turns "đã làm") never makes the list jump while she reads. A list is classified only after its greyed cards
have their Cần row. Check: `dev/test/sub-odds.js` (order.sorted / order.stable).

### 31.20 EFFECT ROWS SAY REAL EFFECTS (owner 11/15 04:55Z–07:05Z)
- Được / Mất / Kèm carry only real game effects with a number or a concrete consequence. No flavour ("được tiếng cứng cỏi", "giữ lễ",
  "giữ êm thể diện", "cha mẹ vui lòng", "Thái hậu vui lòng" next to "Thái hậu quý ngươi +3"): map it to its stat or drop it.
- A positive never sits on the red Kèm line (j63 `kaRows`: a green item written under "kèm:" goes to Được).
- Relations (owner 11/15 09:55Z, supersedes the "quý" wording of the sub-odds merge): ONE word, **thiện cảm**, from `KIT_REL`
  (jaudit, VANPHONG §1): chips "Nàng → ta: thiện cảm" / "Ta → nàng: thiện cảm", card lines "thiện cảm +10", "oán ta +8";
  unknown value → "chưa rõ nàng nghĩ gì". Labels coloured by direction (§11.2). `S.hh` IS the Hoàng hậu's own regard for her
  (j24 `hhBind`); the result card shows the real before→after. Personality scales a change (persF trust/slight): the card draws it
  with the same functions (exact when her nết is known, else a range). Audits: `dev/test/rel-audit.js`, `dev/test/act-audit.js`.
- Đức warning on acts that lower Đức below the bar: ONLY "Đức 33 → 28" on the Kèm line (`ducWarnTxt` j19 / `ducWarn` j6), never "còn 28",
  never a rank-rule suffix; rank requirements live in the rank / promotion screens.
- No placeholder rows: "không mất gì" / "không được gì" never show in Mất / Được (j63 `kaRows`); a row that would be empty is omitted.
- A side risk that comes with an act (being seen, a rumour…) is a Kèm item on the chance scale with its real consequence:
  "bị người thấy, một phi tần nắm 1 chứng cứ: khả năng thấp" — never an odds word glued into Được.
- GHI CHÚ only when it adds information: a note that repeats Cần ("(chỉ buổi tối)" when Cần shows "Buổi tối") is dropped (`kaNoteDedup`, j63).

### 31.21 NEVER THE SAME FACT TWICE ON A CARD (owner 11/15 09:40Z) — `kaNorm1` (j63)
- A Cần item that is only "afford the cost" ("thiếu bạc (cần 20)", "Bạc 20 (có 5)") is dropped when the Tốn row already shows that
  cost (Bạc −20). When she is short, the Tốn row itself adds a red "thiếu bạc (có N)" and the card is greyed. Cần keeps only the
  conditions that are NOT the cost: time (khắc, buổi), rank, place, Sức ≥ 20 for long acts, items, people, evidence.
- Same rule for any row: a value already shown in one row is never repeated in another (Ghi chú that repeats Cần is dropped, j63).

## 32. KIT 4 · ONE STAT CELL · EVENT STAGE · EVENT FRAMES (kit owner #3, owner + review 11/14) — `dev/build/jk4.js` (after jk3, before j84)

### 32.1 kitStatCell / kitStatRow — THE number cell (owner: "where is the shared kit, why do workers draw their own?")
`kitStatCell(icon,label,value,{id,k,bar,title,warn,cls,vcls,tag,nobar})` → one cell: `.kstl` label line (icon + name) · `.kstv` number line ·
optional `.kstb` 0–100 bar (an empty slot is kept in row cells so every cell has the same height). `kitStatSet(cell,value,{bar,title,warn})`
updates in place. `kitStatRow([{id,cls,title,cells}],{id})` → groups side by side, hairline between groups. Sizes (cls):
- default — top bar: label line 15 px (.7rem), number line 21 px (display face 1.02rem, tabular), bar 4 px. ALL label lines share one baseline
  and ALL number lines one baseline across both groups (owner 15/11 ~17:50Z: LEFT Sắc · Tài · Tâm cơ · Đức · Danh · Sủng/Chủ tin | RIGHT Bạc · Sức). Measured with a text-baseline probe:
  1180x820 labels 29.5 / numbers 49.5 for all 8 cells + the time block; 686x880 82.9 / 102.9 all 8; 390x844 104.9 / 128.9 all 8.
- `kst-tile` — info tile grid `.kstgrid` (`kitTiles`: identity card, person stats).  `kst-chip` — one-line chip (person-card info grid, kitPcGrid).
- The time block (`#k3tt`) uses the same two lines: buổi + khắc dots on the label line, weather + Quẻ on the number line (each line is a block
  with the cell's own font, so its strut gives the same baseline).
Top bar layout: iPad ≥ 1000 px one row `menu · me · time · [Sắc Tài Tâm cơ Đức Danh Sủng | Bạc Sức]` when it fits, else the two-row bar
(32.12); 600–999 px row 1 `menu · me · RIGHT COLUMN (time, "‹ Nơi" under it)`, row 2 all eight cells (two groups, same lines; each group grows by
its `--kn` cell count so all eight cells are equally wide); phones < 600 px: row 2 time on one line, row 3 the eight cells with the icon as the
label (name in the tooltip). Every cell has a tooltip "<name> <value> · chạm để xem đủ" and a tap opens its explanation (k3Explain; HX texts from
KIT_GLOSS; servant road: the Sủng cell is "Chủ tin" → HX.tin). Bars: Sức, Sủng, Danh (they move with their cells). Number-fly targets are the
cell ids `#hud-<key>` (popNum, coinPop, game-feel KF_CELL) — ids never change when a cell moves group. Đức < 50 below Hoàng hậu: small gold "!" (tooltip "Cần Đức 50 mới được lập Hoàng hậu").
`dev/test/kit_dupes.js` fails when a retired private variant comes back (table below).

### 32.2 kitEventStage — people FULL-BODY beside the text (owner 23:50Z, approved)
Every kit panel whose subject is a person (weekly events with a main actor, Mệnh truyện chapters, night / thị tẩm, person reports,
succession) gets: a wide scene band on top (headArt 31.16, else the event picture moved out of the tall slot, framed by type 32.3), then the
stage row — 1–2 BIG full-body figures (`kitFigOf`: right tier, age band, unknown silhouette; scar / veil overlays laid on the drawn figure
via `kitFxLayers`; a rash overlay is read the same way when `KIT_RASH` exists — the allergy art is not in this branch yet) with the name
under each — beside the text, then the option group (31.16). A dialog may name its people: `stage:[p1,p2]`. Week book (j87): every person
page shows `kitStageFig(p,{cap:false})` (full-body figure) instead of the portrait frame. Phones: the book opens the right (info) page directly.

| screen | Fold 686x880 | iPad 1180x820 | how |
|---|---|---|---|
| Event / dialog with a person (`who`) | yes: figure column ≤ 36 % of the dialog (32.2a: cap + crop) | yes: column ≤ 36 % / 264 px, figure cut below the waist when wider | kitEventStage → kitDpFit (auto) |
| Succession card (Tiên đế băng hà) | yes, `stage:[her, son]` + headArt band, options as rows | yes | kitEventStage + optLayout rows |
| Two people (night: Hoàng thượng + her; duel events) | yes, column 46 %, two figures side by side | yes | `stage:[a,b]` |
| Week book person page | yes (one page at a time) | yes (spread, figure in the left column of the page) | kitStageFig in j87 |
| Result card after an act (#rtoast) | no — a bottom toast, keeps the small event picture | no | 28.10 |
| Person card (Hậu cung, room card) | no — rank frame portrait (owner-approved card) | no | 28.17 / 31.17 |
| Identity card | already a full-body figure (approved) | same | 28.11 |
| News / event without a person | no figure: the event picture in its type frame | same | 32.3 |

#### 32.2a CAP + CROP — the figure column never grows for the people (owner 15/11, "Sao khung này, khung trái nhân vật to vậy … nếu cắt váy thì cũng ok mà"; review/stage-fig-size) — `kitDpFit` (jk4) + `kitFigBody` width profile (jkit)
Cause of the owner shot (VIỆC "Thái hậu chê dung nhan", tablet portrait = 755x1000 design canvas): 32.7b / 50 sized the column BY the people
(full column height, column as wide as the painted figure), so a wide-robed Thái hậu made the column 49 % of the dialog (42 % on 1180x820).
Rule, for EVERY dialog with a person column (32.7 / 50 / 50.1: events, visits, summons, toilette reactions, Mệnh truyện / night / succession
cards with a person, the Nội vụ phủ shop, pet care):
- Column width ≤ `KIT_DP_COL` = min(36 % of the dialog, 264 px) (and the right column keeps ≥ 250 px). The people are fitted INTO it.
- (§56.4, owner 18/11 ~07:50Z) NOTHING is cut: the column is `overflow:visible`; a wide hem / sleeve spreads right under the text, which is drawn on top (`.kpmain`, `.opts` z-index 1). One person is never shrunk for width; SEVERAL people side by side are scaled to the column width so they never overlap. The old head → waist width test (`KIT_DP_CROP.knee`) and the zoom-and-cut at the floor (`KIT_DP_CROP.minH`) no longer apply.
- Height (§56.4): body = column height / (1 + `BAL.bookFrame.cRef`), skull top → feet, the same for every person; the name chip sits above the tallest painted top. No scaling down for width (one person), no zoom-and-cut at the floor.
- The face is never cut and never squashed (aspect kept); the chip is never cut. Phones (< 600 px) use the same rule in the top row.
Measured (`node dev/test/stage-fig-size.js <url> <outdir> <tag> [sizes] [kinds]`, before → after, column % of the dialog):
Thái hậu chê dung nhan 755x1000 49 % → 36 %, 1180x820 42 % → 36 %; Thái hậu triệu 49 % / 42 % → 36 %; every kind ≤ 36 % at every size.
- Week book (Tuần lục) person page: see §56.3 (owner 18/11); the figure rule of every other frame is §56.4.
- INFO panels about a person (kind info ĐIỀU / rule LUẬT / person NGƯỜI) show the FULL-BODY figure column like every other person pop-up (owner 16/11 07:35Z, OD:L448) — kitEventStage no longer returns early on those kinds.
- MAIN ACTOR: the column shows the first person who is not the player (stage / who); the player stands there only when the event is about her
  alone (then as rank + name, never "Ngươi" — owner rule: rank and name always together).
- TRUE PROPORTIONS (owner 15/11 "figure squashed"): a person picture is never scaled differently in X and Y. kitDpFit takes the aspect from
  the loaded picture itself (naturalWidth / naturalHeight) when it differs from the kitFigBody cache; a picture that failed to load is no
  longer cached with the .45 fallback aspect (measured again on the next call). Wide robes are CUT (column clip), never squeezed.
- CORS READ (review stage-fig-size-r1): `kitFigBody` (jkit) and the frame-top measure (jk3 topOf) load the picture with
  `crossOrigin="anonymous"`. CDN pictures (IMG_BASE, CORS-open) without it taint the canvas, `getImageData` throws and the measure falls
  back to the whole picture box (no core, no width profile) — then 32.2a shrank a wide-robed figure to fit its full width instead of cutting
  the robe (Thái hậu 310–350 px tall in a 477–495 px column, empty space above her). A figure not yet measured is hidden (never shown at its
  raw picture size) until kitDpFit lays it out.
  Scan: `stage-fig-size.js` checks every fig-/por- picture on screen (rendered w/h vs natural w/h, object-fit fill only) after each dialog.
- LATE FIGURE LIST (kit-sample race "1180 run drew no figure"): kitFigOf needs FIGS (j28 FIGURES.json, then j39 merged list incl. Thái hậu);
  a person dialog opened earlier is drawn again whenever the list changes (≤ 60 s); the dialog keeps its content height while a figure loads.
  Identity card (§14 / 28.11, kpIdFig): the unknown-lady silhouette stands in while the list / picture loads (retry 400 ms, ≤ 30 s; one reload on error).
- Option / act card title portrait (j25 tiny face before "Thưa rằng do Hoàng thượng định"): the framed mini portrait `.kan>.md.kfc` is zoomed
  to one text line (zoom .43 ≈ 21 px) so the title stays on its line and the card keeps its neighbours' height.

#### 32.2b EQUAL GAPS — the figure sits between the two frame lines (owner 16/11 s21, VIỆC "Tiết Thanh minh": "cách cái đường line của cái khung ở trên nó bằng với cái chân, với cái đường line của cái khung ở dưới"; review/kit-fit) — `kitDpFit` + `KIT_DP_GAP` / `kitFrameLines` / `kitFrameGaps` (jk4)
- In EVERY frame with a full-body figure column (all KP_SEAL kinds with a person: VIỆC, TIN, KẾT QUẢ, BÁO, ĐÊM, ĐIỀU, LUẬT, MẬT BÁO, CHỨNG CỨ, BAN THƯỞNG,
  CẢNH GIÁC, NGƯỜI, KIẾP; visits, summons, toilette reactions, the shop, pet care) the gap from the frame line ABOVE (the header rule = bottom of
  `.kph`) to the top of the name chip = the gap from the painted feet to the frame line BELOW (the frame's inner bottom edge).
- Both gaps ≥ `KIT_DP_GAP` = max(5 % of that height, 14 px), so chip + figure use ≤ 90 % of it (the kit figure scale, 85–90 %); a figure the column
  width (32.2a cap) keeps shorter is CENTRED between the lines (equal larger gaps), never standing on the floor with the empty space above.
- A figure cut at the floor (short column, 32.2a minVis) is not full-body: its chip stays one gap under the header rule.
- Measured by `kitFrameGaps(dlg)` → {top, bot, full, h}; test `dev/test/kit-fit.js` (Fold 755x1000 + iPad 1180x820: |top − bot| ≤ 2, both ≥ 14).
- WHOLE GROUP (s22): the same rule for every full figure in a frame outside #modal's person column —
  · week book person page (`kitBookFigClamp`, jsl; §34.6 size unchanged): frame lines = the running-head rule (`.kbk-rh` bottom) and the
    page frame's bottom line (art pages: the painted border's inner edge, `KBK_ART_LINE.b` = 2.44 % of the page height above its bottom,
    measured on book-right/left.webp; plain pages: the drawn `.kbk-in` frame); the figure is raised by half the difference (never lowered
    past its column floor = the page-number row, never above the column top); `data-kgap` on `.kesfi` = "top/bottom" px;
  · identity card (`kpIdLay`, j79, §28.11a): centred between screen top/bottom (spread) or screen top/panel top (one page);
  · coach / tip person dialog (`kitPersonDlgFit`, jpdlg): header rule ↔ bottom of the figure area (round 1).
  Test `dev/test/kit-fit2.js` (book, id: |top − bot| ≤ 2 / 4 px).

### 32.3 Event / news pictures framed by TYPE (owner 23:20Z)
`kitEvCat(m,{src})` maps the j89 event category (from the `ev-<cat>.webp` file or `evArtCat`) to a kit category frame (31.17: colour +
corner ornament + inner hairline): Triều chính (triều chính, tham quan, mùa màng, thiên tai, biên ải, sứ thần, hòa thân, quốc tang, đại xá) ·
Sủng ái (Hoàng thượng vui, ngự giá, vi hành, đi săn, tư tình, mật ước) · Trừng phạt (Hoàng thượng giận, hình phạt, lãnh cung, hỏa hoạn) ·
Lễ nghi (lễ hội bốn mùa, tế lễ, yến tiệc, tấn phong, tuyển tú, thỉnh an, tang lễ, việc Hoàng hậu) · Chăm con (sinh nở, các con) · Giao thiệp
(khách đến, thư nhà, chuyện lạ) · Hầu hạ (kẻ hầu, cung nữ) · Học tập (tài nghệ) · Nghỉ ngơi (thời tiết, điềm trời, bệnh, dịch) · Mưu kế (tranh
sủng, tin đồn, tai mắt, vu oan, hối lộ) · Hại người (đầu độc, hại thai). Applied to the wide band and to the tall event slot. Tài nghệ skill
cards use the Học tập frame with their own pictures `img/art-*.webp` (registered in img/INFO.json; before, the list had no art-* keys and every
card fell back to the generic Học tập picture).

### 32.4 BẢNG GỘP TRÙNG — duplicate-UI audit (kit owner #3, 11/14)
| kind | two (or more) code paths found | now | status |
|---|---|---|---|
| stat cell | top bar `.st` (p1) · Tư chất `span.k3tcv` (jk3) · Fold compact Tư chất (3rd style) | kitStatCell (jk4) | DONE, kit_dupes guards `.st/.stats/.k3tcv/#k3ts` |
| stat tile | `.ktile` (kitTiles, j79) | kitStatCell `kst-tile` | DONE (`.ktile/.ktiles` guarded) |
| info chip on person card | `.kpq` (kitPcGrid, jk2b) | kitStatCell `kst-chip` | DONE (`.kpq/.kpu` guarded) |
| court chips | header `.kcchips/.kcbox` (jk2b, hidden but in the DOM) · stage plaques `.k3c` (jk3) | `.k3c` only | DONE (old removed, guarded) |
| non-person picture frame | `.kartf` (old) · kitSceneArt | kitSceneArt / kitArtFrame | DONE earlier (guarded) |
| event picture | tall slot `.kpsubj.kpev` · dialog band `.kdlgart` | both kitSceneArt + type frame (32.3) | DONE |
| person figure in dialogs / book | small `pframe` portrait · stage `figimg` | kitStageFig (kitFigOf + kitFxLayers) | DONE for kit panels + week book |
| bars | `.mini` (stats) · `.fbar` (relation) · `.sbar` (servant Lòng/Chủ tin) · `.pgh` (Ghen) · `.kskb` (skill progress) · `.kmbar` (result motion) | — | OPEN: needs ONE kitBar(value,{tone}) — next |
| tab rows | `.ksub` (sub-tabs) · `.pctabs` (person act groups) · `.kcattabs` (act categories) | — | OPEN: same look already (31.11/31.5); one builder kitTabs next |
| status chips | `#hud2 .hc` (j19 status sheet) · `.kchip` (kit chips) · `.k3r` (time-block rows) | — | OPEN: sheet rows → kitStatCell tiles / kitChip next |
| buttons | `.btn` (old) · `.kbtn` (kit) · `pbtn` act buttons | — | OPEN: `.btn` still on ~15 old screens |
| name tags under figures | j59 `.tag` (one builder, j59tagHTML) | — | single path ✔ |
| headers / panels | kitPanel (`.dlg.kpanel`) · old `.dlg` dialogs | kitPanel | mostly migrated (26.x); old `.dlg` left in minigames |


### 32.5 DIALOG — ONLY THE OPTIONS SCROLL (owner 11/15, dev/owner-shots/1115-dlg-scroll-*.jpg) — `kitDlgFit` (jk4, wraps showModal)
Every dialog / event card with an options list (`#mb > .opts`: kitEventStage figures, headArt, speaker portrait, story text, notes —
week events, encounters, choice cards) is a flex column: title, picture / figures and story text are FIXED (flex:none) and stay visible;
ONLY the options list scrolls (flex:1, overflow auto, rows keep their full height) with a soft top shadow once scrolled (`.kdsh`).
The picture is capped at 28vh (24vh under 1000 px wide); if the fixed part still takes more than 55 % of the dialog, the picture is
compressed first (down to 14vh, `--kdpic`), figures scale with it. Dialogs without `.opts` (Đã rõ cards, person cards, identity /
Luân hồi panels with `.kpscopts`) are unchanged. Shots: dev/shots/book-release/dlg/.

### 32.5b THE TEXT AREA SCROLLS TOO — `kitDlgText` (jk4; review/kit-keeper-2, Foreman D finding D-R1 "long event text is clipped"; owner OD:L191 "in dialogs only the option list / text area scrolls")
The event frame body `#mb` stays `overflow:hidden` on purpose (title `.kph`, picture / figures, buttons never scroll away) but it now has TWO scroll areas inside it, never more:
the options list (`.opts`, 32.5) and the STORY TEXT (`.kpb > .kpmain`). `kitDlgText` (called by `kitDlgFit` after the picture compression) lets the text keep its natural
height as long as the options keep at least min(their content, 42 % of the body, 96 px minimum); a longer text is capped to the rest (`max-height` on `.kpb`, class `kdtx` on the dialog) and
scrolls INSIDE `.kpmain` (soft top shadow `.kdsh` once scrolled, same as the options). Nothing is ever clipped: a text taller than the frame is reachable by scrolling it, at every viewport.
Person dialogs (`kdper`, figure column on the left, 32.7) are not capped: their whole right column scrolls (`.kdpall`, pcard-actrow) with the person pinned on the left.
Dialogs without `.opts` (notices, results, news, rules, info) already scroll their whole `#mb` (§8).
### 32.5c TEXT (+ COUNTDOWN CHIP) STAYS ABOVE THE OPTIONS — event dialog with a picture band, whole-column scroll (kit-size-10, night-final KIT REQUEST "clock chip off screen on Fold")
Rule: in ONE dialog the order down the right column is always **picture band → question text (+ the §69 countdown chip of a timed choice) → option cards**, on every device. A timed choice shows its clock without scrolling.
Root cause (found by the scan, not only the chip): `.kdpall` (32.5, whole column scrolls) forced a 2-row grid, but a dialog with a picture band (`.kdpbanner`, 32.6/50) has THREE rows (band, text, options). The options took row 2, so the text fell into an implicit row 3 BELOW the options (412x1058: chip at y 971–990 in a 285–777 body; 390x844: y 1298; the options also pushed first). Whole family: every event dialog that has a band + figure and goes `kdpall` (narrow right column / long option list), with or without a clock.
Fix, one place (jk4 `#kit-dp-all`): `.kdper.kdpall.kdpbanner>#mb{grid-template-rows:max-content max-content max-content}` and its `.opts{grid-row:3}`. No private CSS in any caller, no per-screen variant; a timed choice (night-final `jnf` flip choice, later ones) only puts `kitCoopClock(...)` in the text (`<p class="nfcd">`). Limit: the chip is above the options at the top of the column; if the player scrolls down to read the last card it scrolls off like the text (the figure column stays pinned).
Sample: kit page §8 button "VIỆC CÓ ĐỒNG HỒ" (demo numbers `BAL.kitpage.clock`). Test: `node dev/test/timed-choice-fit.js <url> <outdir> [WxH,…]` (755x1000, 412x1058, 1180x820, 390x844; 3 variants: sample / 2 options / no chip): text block above the options, chip inside the screen and inside the dialog body without scrolling. Before (main 744b80e7): 10 of 12 cases FAIL.
Family scan: `node dev/test/dlg-clip.js <url> <out.json> [WxH@dpr,…]` opens every kit modal and every PEND event dialog twice (own text, +long text) at the 5 sizes and FAILS on any text cut off by a clipping ancestor or a long dialog with no scroll area. Sample: kit page §8 "VIỆC DÀI".

### 32.8 THE FEET ARE NEVER CROPPED — live v3 frame (kszlive), figure column vs the frame cap (fig-feet-crop-2, owner 17/11 "hình nào cũng bị crop mất chân hết trơn", VIỆC "Kính sự phòng" timed choice on Fold 755x1000 + iPad 1180x820; OD:L1459)
Rule: in EVERY dialog the painted feet of every figure (hem + shoes) end inside the frame. A figure is scaled down to fit when it must; its bottom is never cut. The tag stays ABOVE the head (OD:L1351).
Root cause (found by the family scan, not by the one dialog): the live v3 frame (`kitFrameLive3`, jksize) is capped (`.dlg.kszlive` max-height, overflow hidden). At size XL (and any size whose option list is tall) the figure column (tag + the layout's figure body `KIT_SIZE.fig[...]` 420 px × KIT_FIG.fac) plus header and padding was taller than the cap, so the bottom of the figure and the last option card were clipped; `kitFrameFitsLive3` returns true for XL without looking at the cap. The older 32.7 column (`kitDpFit`) sizes the people to the column floor and never had the fault; the earlier fix (fig-cutout-code-r2) covered only that path.
Fix, one place (jksize `kszFeetFit`, called first in `kitFrameApplyLive3`): room = cap − (frame header + button row) − body padding; when the figure column is taller than the room the figure is scaled by just enough (`dlg.__kszShrink`, read by `kszFigFit`, reset on every repick); R's maxHeight follows the new figure height so the options scroll inside the info column. A frame that already fits is untouched (shrink = 1). No per-dialog CSS, no caller change.
Test (family): `node dev/test/fig-feet-fam.js <url> [WxH,…]` (default 755x1000, 1180x820, 1366x1024, 412x1058, 390x844) opens the timed choice (3 variants), the kit §8 pop-ups, and each person kind with ONE and THREE long options, measures the painted feet of every figure against the lowest clipping edge, exit 1 when any is cut by more than 1.5 px.

### 32.8a LIVE v3 FRAME IS TIED TO ITS OWN BODY (night-final #6, 17/11) — `dev/build/jksize.js`
- `dlg.__ksz3` (the live 3-part frame) is valid only while its body and options are still in `#mb` (`kszLive3Ok`). The `.dlg` element is re-used: when it is filled again, a stale `__ksz3` is dropped and the new body is laid out again (`kitFrameLive3`), and the late image-load re-pick (`kszLiveRepick3` / `kszLiveLay3`) does nothing for a frame that left the page. Before: a late picture load re-inserted the OLD options next to the new ones (every option shown twice). `kdpall` is removed with the other old layout classes.

### 32.8b NARROW T3 — stack, never squeeze (review/narrow-t3, owner 17/11, Fold cover 412x1058 + phone 390x844; reviewer r2 item 1)
Rule: where the screen leaves the live v3 frame (`kszlive`) so little width that even the M layout would give its right column less than the option-card minimum (274 px), the frame STACKS. Test (`kszNarrow3`, jksize): modal width − 16 − 24 (padding) − 12 (gap) − `KIT_SIZE.fig3.M.cw` (140) < `KIT_SIZE.v3.narrow.minRight` (274), i.e. a screen under ~450 px. Wider screens (Fold 755, iPad 1180, 1366) never enter it (pixel-compared: unchanged).
Narrow layout (`data-narrow="1"`, ladder `NL` > `NM` > `NS`, first that leaves nothing scrolling inside #mb, `kitFrameFitsLive3`): top row = a reduced figure (`KIT_SIZE.v3.narrow.NL/NM`: height = f × modal height, ≤ max; NS = the small portrait of the "one" presentation) + the picture strip + the text; BELOW it the option cards, FULL width, ONE column (`kszBtnGridLive3`), ONE size per dialog (kitOptFit0 → kitOptFill: person dialogs keep the tall 3:4 picture filling the card, 54..84 px wide, no square, nothing empty beside the text). If even NS does not fit, #mb scrolls (the old rule 32.5).
Duplicate option block (KIT REQUEST "showModal after viewport resize renders the option block twice", Foreman B): root cause = the showModal wrapper reset the live frame only when the message changed; a second showModal of the SAME message (resize, harness re-open) rebuilt #mb in the old layout but left `kszf ksz3 kszlive` + `__ksz3` on the dialog, so the next fit passes mixed the two layouts. Now `kszLiveReset3` runs before EVERY render (jksize showModal wrapper).
Test: `node dev/test/kit-fit.js <url> <out> <tag> 412x1058,390x844,755x1000,1180x820` (flags PERSON DIALOG cards not one size, square, ONE WORD PER LINE).

### 48.2 NAME TAG = RANK line 1, NAME line 2, for every figure (fig-feet-crop-2 add-on, owner 17/11 "Kính sự phòng là cái phẩm hả?", OD:L1351)
`kitTitleOf(p)` (j79) is the ONE rank source of the tag: `kitTitle(p)`, else the title words the name starts with (Thị vệ, Vương gia, Hoàng tử, Công chúa, Phế phi, Quản sự, Sứ thần, Thái y…); `kitTitledName` drops the repeat from line 2. Read by `kszRankName` (v3 frame + pendant) and `kitName` (32.7 column). The office / place (Kính sự phòng…) is the dialog title and never the rank line (the old `KIT_SIZE.v3.office` override is deleted). Test: `node dev/test/tag-rank-scan.js <url> [--table]` (every kind of person; FAIL on an empty / office rank line, a title word starting the name line, or two tag sources disagreeing): before 13 of 48 FAIL, after 0 of 49.

### 32.6 PEOPLE ON THE PICTURE — event stage (owner 11/15, dev/owner-shots/1115-figs-on-scene.jpg) — `kitEsOvFit` (jk4)
When an event dialog has a place / event picture band (headArt or the event picture), kitEventStage puts the people ON it (`.kesov`):
feet on the picture's floor line (86 % of its height), body height = KIT_FIG.h × picture height (kitFigBody, forehead to feet; men
×KIT_FIG.man, capped under the top edge; children by age), standing in the kit's fixed slots (§33.7 slot function `kitSlotCx/kitSlotScale`: 1 → centre, 2 → 1/3 · 2/3 of the picture width, whole visible art, NEVER overlapping, one common scale-down),
name chips inside the picture's bottom edge (neighbours that touch go to a second row; never cut). No separate figure column: the story
text runs full width under the picture, then the options. With 32.5 the picture + people + text stay fixed and only the options scroll;
the picture is 30vh (26vh under 1000 px), compressed by kitDlgFit on short screens, and the figures are re-laid to its height.
Without a picture band the person column layout 32.7 applies. Shots: dev/shots/book-release/dlg/s1180-*, s686-*.

## 34. BOOK UI · kitCurl (page curl) + kitBookSpread (two-page book) — `dev/build/jbook.js` (before j87) — KIT READY: page-curl
Owner 11/14 (00:15Z, 00:45Z approval + later change): the UI is an open book. **iPad landscape = two-page spread**: LEFT = picture page
(illustration only: the big full-body figure / scene that goes with the right page; it never takes info away from the right page),
RIGHT = the text page exactly as already approved (Hậu cung card with its own frame, chips, tabs, acts…). **Phone / portrait = the RIGHT
page only** (no illustration page on phones, accepted loss; no "Mở trang" button). **A tab switch is a page turn on both devices**, and
every page turn is the WHOLE SHEET swinging around the spine (§34.0, owner 11/15 10:00Z; supersedes the corner curl). Mockups (not wired yet; the fold-layout kit owner wires it): `dev/shots/book/`.

### 34.0 PAGE-TURN RULE (owner 11/15 06:25Z + 07:50Z + 10:00Z) — `kitSheetTurn` (jbook) — the ONE way any page turns
Owner refs `dev/owner-shots/1115-turn-ref-1.jpg`, `-2.jpg` (her binder app). Binding for every book/page in the game (tab switch,
week book j87, kitBookSpread, any future book). Never write a private turn.
1. **Whole sheet, around the spine.** The sheet turns as ONE piece about the spine (the page's left edge: iPad = the gutter between picture
   page and text page; phone/Fold = the left edge of the single page). No corner fold, no diagonal crease, no strips.
2. **Content is printed on the sheet.** The front face carries the page being turned away, the back face the new page (07:50Z: never blank
   paper); both are still copies (kclPrep: no ids → one `#panel` only) that rotate, foreshorten and tilt WITH the sheet (10:00Z). Never pin
   content to the page beneath while an empty sheet moves.
3. **The next page is already underneath** (06:25Z): forward = the live new page lies under the lifting sheet from the first frame.
   Backward = the same motion reversed: the sheet carrying the new page comes back over the spine and lands exactly on it; the old page
   (still copy) lies underneath until covered.
4. **Look:** perspective from above the spine (the free edge grows toward the reader at mid-turn), a slight tilt (≈4°) + skew (≈2.4°) at
   mid-turn so it reads as paper, face shading by angle, a soft shadow cast on the ground under the lifted sheet. The sheet stays inside the
   page area vertically (never over the top bar / tab bar).
4b. **Tờ lật luôn đục, không trong suốt** (owner 11/15 02:40Z, Fold Hậu cung → Giao tình: the old corner curl let the old and new text show
   through each other and the old page's bottom chips poke out under the curl). The turning sheet is fully OPAQUE paper on both faces
   (solid paper ground `.ksht-face` behind the printed content); no opacity, blend or filter on the sheet or its content, no backdrop show-
   through; only the page underneath is visible BESIDE the sheet, never through it; nothing of the old page exists outside the sheet.
   A single-page book turn is CLIPPED at the spine (`vanish`): the sheet lifts, stands up at the spine
   and is gone there — it never fades and never lies over the picture page (iPad) or off screen (phone). Checked mid-turn at 20/45/70 %
   on 755x1000@2, 412x1058@2, 1180x820@2, 1366x1024@2 (dev/shots/review/page-curl/).
5. **Timing — ONE constant `KIT_TURN_MS` = 800 ms** (jbook; owner 11/15 01:50Z "cho animation lật trang chậm lại": was 680–760 ms, then 1300 ms; 16/11 KIT REQUEST C32b → 800 ms, the 1300 ms curl felt stiff) for
   every book turn (week book, book swap; tabs: none, §34.0a), ease `kitTurnEase` (slow lift, even swing, long gentle settle as it lands). A finger drag
   follows the finger; its release finishes in proportion. A new tap while a turn runs makes the running turn jump to its end at once, then
   the new one starts (fast taps never pile up, jam or leave a sheet behind). Only transforms (and the face shading) change per frame.
6. **Input:** tab bar buttons, ‹ › buttons and keys turn the page everywhere; a horizontal SWIPE exists ONLY inside the Tuần lục book (`kitBook`: landscape curl following the finger, portrait paper slide). Nowhere else in the game swipes between tabs (owner 15/11): tabs change by tap and the page swaps at once (§34.0a, no animation). The page swipe is ignored in the map, dialogs, form controls and anything that scrolls sideways (person strip, chips).
7. **"Cảnh động" off (`OPT.fxon=false`) or prefers-reduced-motion:** no turn animation at all — the page changes at once (short cross-fade).
```js
const t=kitSheetTurn({host, front, back, under, w, h, x, y, p:0, ctx, vanish, shadeL, shadeR}); // spine = left edge at (x,y)
t.set(p);           // 0 = flat on the right (front up) … 1 = turned onto the left (back up); backward = run 1 → 0
t.setBack(el); t.setFront(el); t.destroy();
kitCurl(o)          // = kitSheetTurn(o) (old call shape kept for j87 / kitBookSpread); the corner-fold engine is kept as kitCurlFold, unused
kitCurlSwap(el, fn, {dir, ms});   // kept in the kit, NOT used by tabs (§34.0a); kitCurlSwap.hold(p) / .end() = test hooks
```
Test: `node dev/test/sheet-turn.js <url> WxH@dpr <out> <tag>` (frames held with kitCurlSwap.hold, one #panel, no overflow, fast taps,
swipe, Cảnh động off). Shots: `dev/shots/page-curl2/`.

### 34.0a TAB CHANGE = INSTANT, NO ANIMATION (owner OD 16/11 15:45Z + 15:55Z; review/lag-play)
A tab change (#tabs, every device, portrait AND landscape, Fold AND iPad) swaps the page at once: no curl, no paper slide, no fade
(also Dư đồ → page). The page turn below applies ONLY inside the Tuần lục book (`kitBook`). `kitCurlSwap` is kept in the kit but no
tab uses it. (Also the biggest tab-switch lag: the turn copied the whole page 3–4 times.) The Dư đồ leather unroll (kitUnroll) plays only in LANDSCAPE; portrait shows the map at once (owner 15:45Z: portrait tab change = no effect at all; reviewer lag-play-r1).

### 34.0b PORTRAIT = PAPER SLIDE, LANDSCAPE = CURL (owner 15/11 "Page turn only on landscape"; review/page-curl2-r1, C32; keeper text 16/11)
One rule for every BOOK page change (Tuần lục via `kitBook`, any future book; tab switches: §34.0a, none): `kitIsPortrait()` (orientation: portrait — phones and Fold portrait, one page on screen, no book to turn) → the page is a sheet of paper that SLIDES sideways (`kitSlideSheet`, called as `kitSheetTurn({…, slide:true})`, same host/front/back/under/set(p) API and same `.ksht*` classes, no new CSS; only transform changes per frame); landscape (book spread or a wide single page) → the whole-sheet curl of 34.0.
- Durations: `KIT_SLIDE_MS` = 300 ms (portrait slide, ease `kitSlideEase` = ease-out cubic), `KIT_TURN_MS` = 800 ms (landscape curl, `kitTurnEase`). Both are read by every caller; a caller never passes its own number (`kitCurlSwap` `ms` is for tests only).
- Gọn / "Cảnh động" off / reduced motion: no slide and no curl; a ~120 ms cross-fade (`kitCurlFade`, j87 `fade`).
- Swipe: only inside `kitBook` (see 34.0 item 6).
- Test: `dev/test/page-curl.js` (landscape curl frames use `KIT_TURN_MS`), `dev/test/sheet-turn.js`.

### 34.1 (HISTORY — superseded by 34.0 for page turns) kitCurl v2 corner fold, now `kitCurlFold` (owner 11/15 03:30Z)
Owner refs `dev/owner-shots/1115-curl-ref-1.jpg`, `-2.jpg`: the CORNER lifts first and leads, the sheet folds on a DIAGONAL, tilts as it
turns, shows the BACK of the page with a soft curved shading and a dark gradient along the fold — never a vertical cylinder roll.
```js
const c=kitCurl({host, front, back, w, h, x, y, dir:1, shadeR:true, mirror:false, vanish:false, keepId:false});  // spine at (x,y), sheet w×h to its right
c.set(p, dir);      // p 0 = flat on the right … 1 = flat on the left (lands on the left page); dir 1 forward, -1 back
kitCurlRun(c, from, to, ms, done, ease);   // rAF tween (default ease in-out cubic); returns cancel()
c.destroy();
kitCurlSwap(el, fn, {dir, ms});  // LIVE page turn: copy el, fn() re-renders it, the copy curls away over the new content (tab switch)
kitCurlOff();       // true when "Cảnh động" is off (OPT.fxon=false) or prefers-reduced-motion → cross-fade (kitCurlFade / .kcl-fade)
```
- Geometry: the bottom-outer corner A=(w,h) travels to C(p)=(w−2wp, h−lift·sin πp) (lift = min(0.3h, 0.62w)); the fold is the perpendicular
  bisector of A–C, clamped so the spine is never folded. Visible: the old page on the far side of the fold + the FLAP (the folded part,
  reflected across the fold) carrying the BACK face (`back`: an Element/HTML, or plain paper); the uncovered side shows what lies under the curl.
- Look: bend shading across the flap from the fold (dark in the bend → sheen → darker rim), the flap's soft shadow on the page below, a shadow
  along the fold on the page being uncovered. `mirror` = the bottom-LEFT corner leads (turn back on a single page). `vanish` fades the
  sheet over the last 28 % (a live page leaving the screen). `keepId` keeps the root id on the copy so `#id` styles still apply.
- Cheap per frame: the old page and the flap sit in overflow-hidden half-plane boxes aligned to the fold; a frame changes only
  `transform`/`opacity` (compositor), no clip-path, no layout, no repaint. One copy per face (no strips).
- Durations: week book 680 ms, book swap 700 ms, kitCurlSwap 720 ms (unused by tabs, §34.0a).
- Live wiring (jbook, end): a tab switch in the game (tab bar, Hậu cung/Mệnh truyện sub-tabs) = instant swap, no curl / slide / fade (§34.0a).
  To Dư đồ: landscape → the map unrolls (kitUnroll); portrait → the map is there at once. Leaving Dư đồ: instant.

### 34.1b kitLeather — Dư đồ is an unrolled LEATHER MAP, not a book page (owner 11/15 04:00Z)
`kitLeather(el)` (CSS only, no new art): tanned hide with grain + burnt edges, uneven hide outline, stitched border, two rolled ends, the
painting inset with a soft burnt edge and leather tone. Full panel, no gutter, no spine, no paper. The info strip that used to sit over the
map (season · khắc left · travel cost legend · festival chip) is removed; the map tools (− + ⓘ Ra vào, Danh sách) float on the painting.
`kitUnroll(el)`: going to the map in landscape (portrait: none, §34.0a), it unrolls from the middle (the two rolls slide out); reduced motion / Cảnh động off: none.
**KIT_MAP_MS** (jbook, owner 11/15 01:30Z "Dư đồ animation cuộn cho chậm lại") = the ONE map-motion timing: `unroll` 1150 ms (was 620 ms),
`ease` cubic-bezier(.45,.05,.3,1) (ease-in-out: soft start, soft stop). Any touch / click / wheel / key on the map during the unroll ends
it at once (final frame), so the player's hand is never fought. A re-render during the unroll (e.g. a portrait finishing loading) that
replaces the map element continues the unroll at the same point (`kitUnrollKeep`, negative animation-delay) — before, it was cut off at
~0.3 s, which is the "too fast" the owner saw. Centring the map on her place (j27/j38) is an instant jump, not an animation.
Any future Dư đồ motion (glide to a place, palace detail map) reads its time from KIT_MAP_MS — no private durations.
Live: `.game.maptab #panel .mapv` gets it on every render. kitBookSpread `double` = the leather map over the whole book area.

### 34.1d Map labels — one look for every place, locked or not (owner 11/15 "map grey box", j41 accSpot)
Every place on Dư đồ wears the SAME label: name + "N bóng · K khắc" (+ silhouettes). A place she cannot enter now adds only a small
lock mark (`.mlock`, after the name) — no grey box over the map art, no reason line, no buttons on the map, nothing cut.
**LOOK (owner 16/11 "Chữ nhỏ quá, mờ nữa", review/map-labels, p1.html `.mspot .mlab`)**: the label is a LIGHT PAPER CHIP, never faint text on the painting: paper `#fffaf0` (96 %), ink `#2a1a12`, 1 px gold-brown hairline `#c9a35a`, soft drop shadow, display serif 600, **13 px for every place** (big, small palace slots, empty rival palaces, locked, "ở đây" ring) — no `.sm` / phone size cut, no opacity (the old `.off` .75, `.empty` .5, `.srvno` .6 are gone). The "N bóng · K khắc" row (`.mmeta`) is the same paper family, 12 px. The lock (`.mlock`) is a non-shrinking flex item so it can never cut the name; a name wider than its slot wraps at spaces (`width:max-content; max-width:max(100%,4.4em)`), never cut. The Dư đồ floor zoom (`mapFit`, j38) is the smallest zoom at which no two chips touch (re-run on image load, fonts ready and size change), so neighbours never overlap; the "−" button stops there. The palace detail map (`.kpmv`, D30) is skipped by that fit and inherits the chip colours; its own `.kpm-spot .mlab` size should be 13 px too.
Scan: `node dev/test/map-labels.js <dev/index.html> <OUT> [viewports]` (font px, contrast, opacity, cut, overlap, edge per label).
Tapping the label opens the kit option card (`j77Card`): the reason, Xin yết kiến / Xin bái kiến, Lẻn vào (odds ladder, khắc, what is lost), wait.
WALK RULE (owner 11/15 01:35Z, `walkOk(tc)` / `walkWhy(tc)` in j9 — one rule for map, list, person-card visit/see, servant road): she may
walk anywhere whose walk cost ≤ khắc left (never walk + 1). Arriving with 0 left is allowed: the tap first shows a kit card "Đường đi N khắc
· đến nơi là hết buổi, chỉ kịp xem ai ở đó" (Đi, ✕ to stay, `j77LastWalk`); she sees who is there, next buổi she starts there. A label says
"hết khắc" ONLY when 0 are left; a walk longer than what is left shows "đi N khắc" and NO lock mark (owner-bug 16/11 18:30Z "chỗ nào cũng khóa hết", review/dudo-lock): the lock mark (`.mlock`) means ONLY that a rule keeps her out now (accessOf fails, cấm túc, lãnh cung); an open place that is just far (farther than the khắc left) gets ONE grey kit state: the same label greyed, no lock mark (`.mspot.awalk` map label, `.mtile.awalk` Danh sách tile; owner 16/11 "chỗ không đủ khắc thì cho nút màu xám", review/map-labels-2-b); it stays tappable and its tap card offers walk spill. Rule locks (`.agrey`) keep the normal label + lock mark + reason; nothing is grey at full khắc. Every "go there" button (map, list, person cards "Đến gặp" / "Đến cung nàng thăm" / "Đến chỗ hắn", generic data-go) reads ONE rule: `walkBlock(k)` (disabled reason) / `walkLate(k)` (arrives next buổi) / `walkGo(k)` (go now or spill), j9. Test: `GRID=1 node dev/test/dudo-lock.js dev/index.html` (lock mark = rule lock for every life × buổi × khắc; every far place reached by spill).
WALK SPILL (owner 11/15 09:05Z, `walkSpill(k)` / `walkSpillGo(k)` in j9): a walk longer than the khắc left is NOT a dead end. The card
says "Đi bây giờ thì đến nơi vào buổi chiều" (N and M in the 32.8 fact line) and offers "Đi (đến nơi vào buổi sau)" — "Tốn: M khắc buổi
sáng + (N−M) khắc buổi chiều · Thành: đến nơi buổi chiều, thấy ai ở đó" — plus ✕ to stay (no separate "Đợi buổi sau" for this case). Going
spends the M khắc left, turns the buổi (normal end-of-buổi processing: NPCs move, news cards first), then pays the rest from the new
buổi and she arrives with 4−(N−M) khắc, seeing who is there then (1 left in the morning, Thái y viện 3 khắc → 1 + 2, arrives in the
afternoon with 2 left). Not across the night: from buổi tối the night rule stands (no spill; "Sang ngày mới"). If the place is
closed in the next buổi (e.g. Thái y viện / Ngự hoa viên at night), the card says so and offers no spill. NPCs do not pay walk costs
(placeWhere puts them per buổi), so there is nothing to change for them. Not in co-op world mode (its own buổi turns).

### 34.1c kitBookLive — the LIVE game is the open book (every tab, both roads; owner 11/15 priority)
`kitBookLive()` runs after every render (jbook, end): `.game.kbook` (no cover board).
- **NO DARK COVER BOARD (owner 11/15 02:35Z, Fold Hậu cung: "Nó có cái nền tím gì ở dưới kìa")** — the purple/indigo cloth board
  (`.kbk-board`, `.kbs-book::before`, the week book `.kbk-book::before` var(--cloth)) is GONE on every tab, every size, the room view and the
  week book. The page lies straight on the game background; the only book edge is a thin paper edge / spine in the kit cream-brown
  (`#e6d3ab → #c9ad7d`, ≤ 4 px, soft brown shadow) — never a dark band, never a thick strip under the page or above the tab row.
  (The week book's own painted front cover page `k-cover` is a picture of the book's cover, not a board, and stays.)
- iPad landscape (≥ 900 px, landscape): the room stage = LEFT picture page (room painting printed on the page: paper margin, thin red rule,
  stacked leaves outside, gutter shadow inside), the tab panel = RIGHT text page (paper, crease + gutter shadow on its inner edge, stacked
  leaves outside), no gap between them, no board behind them. Phone / portrait: ONE paper page (the panel) straight on the game background.
- Every tab of both roads (Hành sự … Mệnh truyện; cung nữ: Phận sự, Đồng liêu, Thân phận, Sổ ghi) uses it; a tab switch curls the right page
  (§34.1). Not a book: Dư đồ (leather map, §34.1b), title, end screen.
- Room stage = ONE backdrop: the Pixi room copy (j11) is drawn only when it is the very picture + crop #scimg shows (incl. the portrait
  painting kitFloorFit swaps in) and covers the stage; otherwise it is hidden and the CSS backdrop alone shows (owner shot
  `dev/owner-shots/1115-two-backdrops.jpg`: two backdrops stacked in the cung nữ room on iPad).

### 34.2 kitBookSpread — the book container
```js
const bs=kitBookSpread(host,{pic, text, double, mode:"auto"});   // host = the area between the top bar and the tab bar
bs.set({pic, text, double});              // replace content (no turn). text: an Element is MOVED in (stays live, e.g. #panel)
bs.swap(()=>{ /* switch tab: the game re-renders #panel */ bs.set({pic:kitBookPic({...})}) }, {dir:1});  // tab switch = curl
bs.mode   // "spread" (host ≥ 900 px wide and landscape, same rule as kitBook) | "single"
kitBookSpread.wantsPic(host)              // false on phones: skip building the picture page there
```
- Spread: two `.kpaper` pages, outer page edges (stacked leaves), soft gutter shadow + crease, a thin cream-brown paper edge (no dark board). Forward swap: the old right
  page curls over to the left, its back already showing the NEW left picture; the new right page lies underneath. dir −1: the new right page
  curls back in from the left over the old spread.
- Single: only the text page (`.kbs-r`). Forward swap: the old page curls away to the left revealing the new one; dir −1: the new page curls
  back in. Swipes are left to the caller (tab bar / gestures of the live layout).
- `double`: the Dư đồ map — shown as the leather map (kitLeather) over the whole book area in both modes; pages, gutter and paper
  edge are hidden. Turning to it unrolls the map in landscape (portrait: at once, §34.0a); leaving it is instant (the map is not a page, it never curls).
- Paper skin `.kpaper` (warm paper, faint fibres, edge tint) is reusable on its own for any page-like surface.

### 34.3 kitBookPic — the picture page (illustration only)
`kitBookPic({scene, ax, feet, figs:[{src,h,x,dim}], cap, slots:[{label,n,img}], plate})` → HTML: a printed plate inside a thin red double
rule: the room picture cover-cropped on its floor anchor (`ax` = KIT_FANCHOR x, 31.4), full-body figures (`kitFigOf(p)`) standing on the
`feet` line, sized by their BODY (§34.6; `h` ignored); `dim` = anonymous silhouettes (`img/kit/unknown-fig-*.webp`); `cap` = small caption plaque (place name /
"Thử y phục" — a caption, never the right page's facts); `slots` = try-on slots beside her figure (Tư trang).

### 34.6 BOOK FIGURE SCALE — one body rule on every book page (owner 16/11 "Nhân vật sao chưa theo tỉ lệ chuẩn", Tuần lục p.7–8, iPad 1180) — `kitBookFig` (jkit) · `kitBookPicFit` (jbook) · `kitBookFigClamp` (jsl)
Fault: the book sized the whole PICTURE BOX (person page: `.kesfi` = 100 % × `--kfr` of the column; kitBookPic: `--fh` × plate), not the BODY. The
"unknown" silhouette (`unknown-fig-*.webp`) is painted to its box edges (no margin, hair bun at the very top), a real figure carries margins
and a crown, so the silhouette stood 10–15 % taller, with another head height and foot line than Thái hậu beside it. The ground shadow
(`drop-shadow`) of `.kbp-fig` also lacked the kit alpha-clean `url(#kfa)`.
Rule (measured like the stage `kitEsOvFit` §33.6 and the dialog `kitDpFit` §32.2a/32.7b — one body height per viewport):
- `kitBookFig(b, fac, H, o)` → `{ih, iw, dy, body}`: body = head top (`ht`, else painted top) .. feet (`b`) of `kitFigBody`; `fac = KIT_FIG.fac(src, age)` (woman 1, man 1.07,
  child by age). Person page column (default, = dialog rule 32.7b, the tallest person fills the column): body = `H × fac / KIT_FIG.man` (woman .935 H, man ≈ H).
  Picture plate (`o.stage`, = stage rule §33): body = `min(KIT_FIG.h × H, KIT_FIG.maxPx) × fac`. `ih` = picture box height, `iw = ih × true aspect` (never stretched),
  `dy` = how far the box hangs below the foot line (painted feet < 1 stand ON the line, the same line for every figure of the page).
- Silhouettes use the SAME path, box and scale as real figures (a silhouette is a figure whose file is `unknown-fig-f|m|k`; `fac` from the same table).
- Person pages (Tuần lục, Mệnh truyện, Sổ luân hồi — j87 `personBody` → `kitStageFig`): column `--porf` = 36 % of the inner page width (j87 layout); `kitBookFigClamp` (live, jsl) fits the figure into it, left edge against the page edge.
  both call `kitBookFig`. A figure is NEVER scaled to fit (the old "not below 85 %" shrink made a wide Thái hậu smaller than the silhouette beside her): the column widens as before
  (≤ 74 % of the page) and what is still wider is cut at the column edge (32.2a, soft 24 px fade). An unmeasured figure is hidden, never shown at its raw box.
- `kitBookPic` figures: `h` is ignored (kept so old callers do not break); `age` = child factor; sized by `kitBookPicFit` (on load / resize / DOM insert), feet on `--feet`.
  `filter:url(#kfa) … drop-shadow` on every `.kbp-fig` (like `.kesimg`), so the ground shadow shows no faint rectangle.
- Test: `SHOTS=1 node dev/test/book-fig-scale.js <page.html|url> <outdir>` — per viewport (755×1000, 1000×755, 1180×820, 1366×1024, 844×390): body px, body/column, foot gap, aspect error for
  Thái hậu, a normal consort, the silhouette f / m and a kitBookPic with 1 real + 2 silhouettes; FAIL if women's bodies differ > 3 % or an aspect is off > 1 %.

### 34.4 Page mapping (owner-approved; iPad left page · right page)
| tab | LEFT (picture, iPad only) | RIGHT (text, iPad + phone) |
|---|---|---|
| Hành sự / home | her room with her figure | act categories + acts |
| Dư đồ | the map spans BOTH pages (`double`); a tapped place → left = place scene with silhouettes | map · place info + acts |
| Hậu cung › Phi tần | the selected consort full-body in her palace (caption = palace) | picker strip + card + action tabs + acts (as approved) |
| Giao tình / Phe phái | relation web / faction emblems picture | lists |
| Cung nhân, Hoàng tự, Hoàng thượng / Thái hậu cards | the selected person full-body in their place | card + chips + acts |
| Tư trang | her full body in the current outfit + Trâm / Y phục / Ngọc bội slots | chest grid |
| Tài nghệ | the art picture (`img/art-*.webp`) with her practising | levels + lessons |
| Mệnh truyện / events / Sổ tuần | chapter or scene picture / full-body figure | text + choices |
| Sổ ghi | calendar | entries |

### 34.5 Tests · shots
`node dev/test/page-curl.js <url> WxH@dpr <out>` (week book: frozen mid-curl frames, back turn, finger drag, reduced motion = fade, no
page errors) · `node dev/test/book-mock.js <url> WxH@dpr <out> <tag>` (mockups). Shots: `dev/shots/book/`.

## 44. TOP 15 · LÔ A (review/ts-a, `dev/build/jts.js`, before j84) — the pieces other modules may reuse
Owner 11/15 02:00Z (Top 15 of dev/research/TRUNGSINH_COMPARE.md). Everything is built from existing kit parts; the only new CSS (`#ts-css`) lays out the dressing board.
- **`tsOpt({n, fx, odds, need:[{t,ok}], duoc:[], mat:[], kem:[], note, later, go})`** → a dialog option (Q item `opts`) that always shows Cần / Tốn / Được / Mất / Kèm + odds word
  (j63 frame). `fx` = costs paid on choosing (→ Tốn); `odds` 0–100 (null = sure, no word); `need` = the Cần row (✗ unmet disables the option, a bot
  falls back to the first enabled option). `later:1` = the option opens a mini game: no result card on choosing; the game's end shows ONE result card
  built from the snapshot taken before the costs (`tsPre()`).
- **Cần row for dialog options**: `kaNorm1` reads `Q[0].opts[i].need` into `data-kneed` before the frame is drawn (any module may set `need`).
- **`tsPanel({t,h,opts,who,art,stage,btn})`** → event panel with its painting (`art` = existing `img/ev-*`), people standing on it (`stage`, KIT 32.6),
  outcomes shown (`showOut`).
- **`tsGame({kind, art, title, odds, risk, intro, onDone(res)})`** → any j82 mini game (`dan`, `co`, … and the two new ones below) inside the kit frame
  (`kg82Open`) with **Bắt đầu** and **Bỏ qua** (plain odds `odds`, word shown on the button). `res = {raw 0–10, skipped, guard}`. Bots skip.
  New kinds (own mechanics, no other kind uses them): `duho` **tspluck** (lotus drifting through a "Tầm tay" band, tap to pick; optional alarm
  "Lau sậy bên bờ khẽ động" + **Hộ giá** button for 3.5 s when `risk`), `den` **tssteer** (drag a floating lantern along the bright current,
  wind pushes sideways, avoid lotus). Boards = existing paintings `img/ev-le-ha.webp` / `img/ev-le-thu-2.webp` (`TS_IMG`, cover-fit by `kg82Bg`),
  sprites `hat-lotus`, `doden-lantern`. Đàn / cờ in private summons use the lesson boards (`KG82.ctx="hoc"`).
- **Status chips** `Nguy hiểm chung: N` (`data-hx="tsnh"`) and `Xét phẩm: thiếu N | đủ` (`tsxp`) sit in the stage's RIGHT column under the
  court chips (`window.K3_RIGHT`, exported by jk3) — never on the top bar's buổi line (review FAIL 11/15: on Fold with "‹ Phòng" they broke
  the date line and the top bar grew). Tap → their panels (Nguy hiểm chung: bar value, people the player knows AND can name (k61Named; never "Phi ???"), unknown count, Cách
  tính, actions, closed by the kit ✕ (32.10, no "Lui");
  Xét phẩm: promoReqP rows Đủ / Thiếu).
- **Dressing board** (Hội phối đồ): four slots (Cài tóc · Đeo tay · Áo · Hương, phấn) as `kitItem` tiles, inventory tiles as buttons aligned to the
  TOP of their grid row (`align-self:start`, flex column: pictures and names line up whatever the name length); selected tile =
  the one kit selected look (31.13: `--k-glow` glow, ×1.06, others opacity .75; class `.ts-on`, no box). HUD: Phần x/10 · Hồi n/4 chỗ. Result → `kitPodiumShow`.
- **Lễ tấn phong**: the guests come to her palace, so she meets each (k61Meet: name + face, never a named grey stranger); the still-life
  picture ev-tan-phong (a decree scroll on a tray) is no longer the stage: her own rite is her person dialog (32.7, the host full-body),
  an NPC's rite the host's person dialog — nobody stands on a still life.
  Relation words: "khách quý ngươi +4", "nàng quý ngươi +5", "Nàng quý ngươi: Quý mến · 34" (VANPHONG §1), never a bare "thiện cảm".
- Pictures used: ev-tai-nghe (đàn), ev-hoang-de-vui-2 (cờ), ev-le-ha (du hồ), ev-sinh-no (ân thưởng sau sinh),
  ev-le-xuan-2 / ev-le-thu-2 (thả đèn), ev-yen-tiec (báo đề), ev-dieu-lanh / ev-le-thu-3 (hội phối đồ). No new art.

## OWNER POINTS 14/11 (fold-layout) — checklist (✔ = verified in screenshots dev/shots/fold-layout/ at 686x880@2.2 + 1180x820@2)
| time | point | component | status |
|---|---|---|---|
| 16:00 | top bar too tall, date wraps, chips on own rows | 31.1 slim bar + 31.12 row 2 | ✔ |
| 16:00 | stage changes size per panel; figures tiny | 31.3 / 31.7 shell, j59 gutters | ✔ (room 83–87 % height) |
| 16:00 | sticky person header overlaps text | 28.17 card layout | ✔ |
| 16:00 | Giao tình chip rows cut | 31.5 chip lists wrap | ✔ |
| 16:05 | portrait + landscape backdrops | jbd (main) + 31.8 portrait room tier | ✔ mechanism; room "-p" art pending (art worker) |
| 16:10 | fix whole groups via kit | 31.6 inventory | ✔ |
| 16:15 | rows show above sticky tab bar; Tư chất toggle dumps into panel | 31.5 opaque sticky bars; toggle removed, sheet centred | ✔ |
| 16:20 | info on the room scene, slim bar, duplicates dropped | 31.2 + 31.12 (later moved to bar by owner 19:05) | ✔ |
| 16:25 | one fact one place (court chips vs Nhân tâm) | court chips; sheet rows hidden | ✔ |
| 16:30 | card header duplicate (hotfix) | 28.17 | ✔ |
| 17:10 | no "Bảng phẩm vị" row (rank chip); scene moved up | 28.18, 31.1 | ✔ |
| 17:20 | room over-zoomed, figures on furniture | 31.4 KIT_FANCHOR | ✔ (10 rooms measured at 686) |
| 17:45/17:40/18:05 | person card layout (iPad left info / right tabs; Fold portrait + info, tabs, acts) | 28.17 + 31.9 | ✔ |
| 18:00 | picker always visible; one combined build | 28.17 kitPcSize, compact strip | ✔ |
| 18:15 | info as short chips, stats visible, "?" for unknown | 31.9 kitPersonChips | ✔ |
| 18:20 | Tư chất always visible (top bar) | 31.12 | ✔ |
| 18:30/18:45 | phone room = full-screen home; tabs full screen | 31.7 kitPhoneShell | ✔ |
| 18:40 | Đức not red; khắc dots; place name / name tags as text, one line | 31.12 | ✔ |
| 18:45 | palace names on picker at all sizes | compact strip keeps `.psep` | ✔ |
| 18:55 | no tassels on non-person pictures; bigger act pictures; bigger card portrait | 31.10, 31.9 (portrait col 36 %) | ✔ |
| 19:00 | Hành sự category tabs (and other long act lists) | 31.11 k3CatTabs | ✔ Hành sự; other lists use the same component (auto) |
| 19:05/later | iPad bar middle: time | Tư chất columns; stage keeps place + court + figures | 31.12 | ✔ |
| 19:10 | Oán next to Ghen; one shared component | 31.9 order Ghen · Oán · Thiện cảm · Nàng với ngươi | ✔ |
| 19:10 | identity card wide simple picture frame; "Đổi thân phận (-100" cut at 686 | 28.19 kitSceneArt (review/identity-card merged) | ✔ (kit2-*-1ident) |
| later | selected state: gold glow, no box, no check badge, others dimmed | 31.13 | ✔ ident picker + Phi tần strip |
| later | court chips "Hoàng / thượng" wrap at 1180 | 31.15 nowrap + max-content column | ✔ |
| later | servant "Lòng 70" as a chip | 31.9 / 31.15 one chip per bar | ✔ |
| later | long results as bullet lists | 31.14 kitBullets | ✔ (servant "Sai đi dò la" card) |
| later | her age in the top bar | 31.15 `#me-a` | ✔ |
| later | PIXI room crop = #scimg crop (j11), figures big on the floor | 31.4 | ✔ 686 + 1180, 6 rooms × seasons × buổi, canvas drawing (scimg opacity 0) |
| 23:00 | full-width option cards / per-screen rows-grid; big events get a header picture | 31.16 + headArt | ✔ (mixed groups: short first, odd short spans the row — review) |
| 23:15 | Fold person card = the iPad Hậu cung card | 31.17 + 31.18 (container width) | ✔ 686 + 1180 (kit3-*-2haucung) |
| 23:20 | act/event pictures: distinct frame per category, no tassel | 31.17 + 32.3 kitEvCat | ✔ acts, events, news, Tài nghệ (Học tập) |
| 23:30 | iPad landscape = two phone panels; phone = one panel, same components | 31.18 (panels read their container) | ✔ card + act lists; book spread wiring = review/page-curl |
| 23:40 | option layout decided per screen (table) | 31.16 table | ✔ |
| 23:50 | big events + week book: full-body figures beside the text, wide scene band | 32.2 kitEventStage / kitStageFig | ✔ succession (simulated), actor event, week book (kit3-*-4/5/6) |
| late | top bar: ONE stat cell for all 8 (labels on one baseline, numbers on one baseline), time block on the same two lines | 32.1 kitStatCell / kitStatRow | ✔ measured 1180 / 686 / 390 (KIT 32.1) |
| late | duplicate-UI audit + guard | 32.4 + dev/test/kit_dupes.js | ✔ stat cell, tile, chip, court chips; bars / tab rows / status chips / old .btn OPEN |
| late | Tài nghệ cards have their own pictures | INFO.json art-* + vir-* | ✔ 6/6 arts (art-theu, art-nau unused: no such art in ARTS; vir-* unused: no Tứ đức skill cards yet) |
| late | gap between rank and portrait frame | 31.18 trim (frame + crest) | ✔ crest starts ≤ 12 px under the rank (686, 1180) |
| late | Thái hậu chip opens her card (not Giao tình) | kitThCardHTML (jk4) | ✔ 686 |
| review | servant road: 2nd figure cut at strip edge; place line under court chips | j59 full width under the plaque column + strip fits one whole figure; #sc-t max width | ✔ 686 + 1180 (servant road) |
| review | picker: "1/18" counter cut the last column | kitStripFit drops faces until nothing is cut | ✔ 686 |
| review | old court chips .kcchips in the DOM | removed (kitCourtChips = cleanup only) | ✔ guarded by kit_dupes |
| review | lãnh cung rank chip said "Đáp ứng" | k3Hud: "Phế phi · lãnh cung" | ✔ code; not shot |
| 11/15 | two backdrops stacked on the stage (iPad, cung nữ room) | j11 pxTick: the PIXI picture always covers the whole stage box (stale crop / resize) | ✔ 1180 + 1366 servant road, home + 4 places: one canvas layer, full box |
| decision 38 | Tần, Phi, Quý phi are palace heads | PAL_HEAD=3 (j1) in palHeadOK / palFix / houseOf / assignHouses | ✔ she gets her own palace at Tần; old saves re-house on load |

### 31.6 INVENTORY (group → member → status; screenshots dev/shots/fold-layout/)
| group | members | status |
|---|---|---|
| (a) top bars / status | consort HUD, servant HUD (j42 srvHud2), lãnh cung, status sheet | one slim row + stage plaques + centred sheet: DONE all modes |
| (b) stages | every tab (act, map excluded: full-screen map, rv, rel, fac, staff, kid, inv, art, story, log), 10 rooms × seasons × buổi | one size, floor anchors: DONE |
| (c) person cards | consort, servant, kid, Emperor (modal), court/officials, strangers | 28.17 layout: DONE (review/hotfix-card) |
| (d) chip lists / selectors | Giao tình relsel, act-group tabs, chips, sub-tabs, pager | wrap / opaque sticky: DONE |
| (e) panel scroll / clipping | all tabs | audit: 0 ellipsis, 0 clipped text, 0 horizontal overflow at 7 sizes |
| (f) sticky tab bars | Hậu cung / Mệnh truyện sub-tabs, card blocks | opaque, padding band covered: DONE |
| (g) collapse/expand toggles | "Tư chất" (removed; plaque tap → centred sheet), status "Thu lại" | DONE; other toggles in game: none found besides j57/j19 status toggle (same sheet) |

---

## CHUYỂN ĐỘNG (kit motion, j93) — game feel

Owner 11/14: "game chưa ra cảm giác game". Every celebrated or feared moment uses ONE of these pieces; no worker animates on their own.
Code `dev/build/j93.js` (after j86, before j84). Art `img/kit/mo-*.webp` (Magnific gpt-2-6, 1 style ref face-consort-01, folder ba4aecfe…, transparent).

### Rules (all pieces)
- NO fan rays / halo / conic-gradient light anywhere (owner 11/14: "giống hào quang"). Light = soft radial glow from inside the object.
- Duration 0.3–2 s per piece; transform / opacity / clip-path only (smooth on Fold 755x1000@2 and iPad 1180x820@2).
- STILL PEOPLE (review/face-sharp, owner 15/11 "mặt bị mất nét"): NO continuous (infinite) animation on a people picture or its ancestors
  (stage #mefig / .tok.fig .figimg, dialogs .kesimg, portraits, avatars): no idle sway, no pulsing halo / glow. An animated transform or filter
  makes the compositor re-sample the picture every frame (face detail −8…−13 %, her face hazy beside a still maid). Her rank-colour halo and the
  selection glow are STATIC filters. One-shot moves (enter, slide, promotion glow) are fine: the picture is crisp again when they end.
  Check: `node dev/test/face-sharp-scan.js <url> <WxH@dpr> <out.json>` must report `animated: 0`.
- Tap anywhere skips to the final frame; a second tap closes. Long pieces show "Chạm để bỏ qua" / "Chạm để đóng".
- `prefers-reduced-motion: reduce` or the "Cảnh động" switch off (`OPT.fxon=false`) = final frame at once, no travel (`kmReduced()`).
- Big moments go through ONE queue `kmPush(fn(done))`: one at a time, waiting while the week panel (#dawn), the podium (#kpodov) or the roulette is open. Death clears the queue.
- Overlays auto-close (except the reward, which waits for "Nhận"); nothing is blocked for longer than the moment.
- Bot runs (`window.__bot`) and `quiet` code paths never animate. Loading a save never animates (the first render only takes a snapshot).

### Pieces
| # | moment | API | trigger (wired) | look |
|---|---|---|---|---|
| 1 | thị tẩm | `kitFlipTablet(p,{me})` · `kitFlipNote(p)` | wraps `flip()` (week start, after the week panel) | ONLY when the tablet is HERS: full piece — 5 green tablets `mo-tablet-back`; the middle one lifts and flips in 3D (rotateY) to `mo-tablet-front` with rank + name (one word per line); gold glow + sparks; result chip with the face, "Thẻ bài của ngươi được lật". The title "Hoàng thượng lật thẻ bài" sits above the lift height (padding on `.kmtabs`, title on its own layer). Someone else's tablet: NO overlay — `kitFlipNote` shows one short line `.kmnote` (kit chip with face: "Tối nay Hoàng thượng lật thẻ <bậc> <tên>") under the top bar, `pointer-events:none`, fades after ~2.8 s, never asks for a tap. |
| 2 | quẻ tuần | `kitXamPlay(el,lot)` / `kitXamHTML(lot)` | wraps `dawn()` (Quẻ tuần section) and every modal holding the old `.xam` (Gieo lại, Phật đường, the HUD chip) | `mo-xam-tube` shakes (0.9 s), `mo-xam-stick` jumps out and lands (0.7 s), the lot word pops (green good / red bad / ink neutral); the section rows fade in after. In the week panel it starts after the calendar. |
| 3 | kết quả | `kitResultFx(card)` | wraps `resultShow` (j63 result card `#rtoast.karesult`) | seal `mo-seal-thanh` (chữ Việt "THÀNH") or `mo-seal-bai` ("BẠI") stamps on the card's corner (scale 2.6→1, card thumps); each changed stat floats up as a pill (green +, red −); every 0–100 stat row gets a thin bar `.kmbar` running from the old to the new value (green up / red down). Existing `.seal` word (THÀNH/HỎNG/BẤT LỢI) stays. |
| 4 | thăng phẩm, tấn phong | `kitEdict({who,from,to})` | state diff after `render()`: `S.rank` up (also cung nữ → Đáp ứng when `S.srv.risen`) | closed edict `mo-edict-closed` → unrolls (clip-path) to `mo-edict-open` with "Thánh chỉ · Tấn phong X làm <bậc>" (Hoàng hậu: "Lập … làm Hoàng hậu"); the kit portrait (mdH big) changes from the old rank frame/brocade to the new one under a light sweep; chips old → new (new chip in `RCOL[rank]`, pops with sparks). j11's "Tấn phong" stamp is replaced (sound and haptics kept). |
| 4b | giáng phẩm, lãnh cung | `kitGloom({title,sub})` | state diff: `S.rank` down, or `S.out` newly set | screen darkens (radial vignette), 14 dry leaves `mo-leaf-dry` fall and sway, grey caption. |
| 5 | qua buổi | `kitDayShift()` | wraps `buoiShift()` (#curtain) | sky band slides in (b0 morning gold, b1 afternoon amber, b2 night indigo) + an incense stick `mo-incense` beside the buổi label, ember burning down, two smoke wisps. |
| 5b | qua tuần | `kitCalendar(el,{from,to,…})` | wraps `dawn()` | calendar `mo-calendar` in the middle: last week's page flips up (rotateX) revealing the new week (Thượng/Trung/Hạ tuần · tháng · năm), then the week panel rises (1.35 s; tap skips). |
| 6 | có thai, sinh con | `kitBloom({title,sub})` | state diff: `S.preg` newly set; `S.kids` grew | peony `mo-peony` blooms (scale + turn), warm glow, 12 petals `mo-petal-peach` burst out; caption "Có tin vui" / "Hạ sinh hoàng tử|công chúa". |
| 6b | chết | `kitInk({title})` | wraps `over()` | two ink blots `mo-ink` spread over the screen, caption "<title> · Mở Sổ luân hồi", then the Kiếp này panel underneath. |
| 7 | ban thưởng, quà | `kitReward({kind,title,from,items:[{n,d,img,tier}],bac})` | wraps `bestow()` (every ân thưởng: night → tray, contest/promo/story/accuse/birthday/nurse/dau → chest, son/sinhthan → golden chest); state diff: new chest entries with `from` (Thái hậu/Hoàng hậu → tray, a consort → gift box) | `kind`: `tray` (mâm sơn son phủ khăn gấm `mo-tray` → `mo-tray-open`), `chest` (rương gỗ chạm vàng `mo-chest`), `royal` (rương rồng phượng vàng `mo-chestg`, Ngự tứ), `gift` (hộp gấm `mo-giftbox`). Closed box floats and glows, "Chạm để mở" + who gives. Tap: rattle, lid opens (open art), a soft warm light glows from INSIDE the box (`.kmlight`: radial-gradient, centred on the box mouth per kind via `--gx/--gy`, breathes gently by opacity/scale; centring uses the separate `translate` property so animation never moves it), then (owner 17:02Z "quá nhanh", KIT §54.1) a pause, and EACH item rises out of the box into the spotlight one at a time (`kitRevealHTML`: kit graded frame `kitItem` size xl + name + `kitGradeChip` in the item's REAL grade), holds ~1.3 s glowing in its grade colour, and settles on the shelf under the box (kitItem sm); the silver comes last; silver coins `mo-coin-silver` bounce out when there is silver; then the list (`kitGradeChip` sm · name · use) + "Nhận". Lowest grade first, best last. Tap during the reveal = skip to the end. Timings `BAL.reveal` (jbal2). `kind` also `pouch` (bọc vải `mo-pouch`, for found things: entries `from:"find"`). `tier` = real grade 0..4 (KIT_GRADE) — `kmTierOf(k)` = `kitItemInfo(k).grade`, never a price guess. |
| 7b | mua đồ | `kitFlyItem(k)` (old; purchases now = jfx `kitGain` reveal + `kitCoins("out")`, KIT §54) | state diff: new chest entry without `from` | the item icon flies to the Tư trang tab, which glows. |
| 8 | panels, buttons | CSS | `.dlg`, `.dlg.kpanel`, `#kpop` open with `kmIn` (rise 14 px + scale .96→1, 0.28 s); result card rises; every button / option / act card / chip presses in on touch — now the jfx touch kit (§ CẢM GIÁC / FX: scale .96, rim light, ripple, spring back) | |
| + | nguy hiểm | `kitAlarm()` | wraps `showModal` for threat dialogs (pid items outside the safe list, same list as j11's heartbeat) | red inner edge pulses twice (0.8 s each). |
| 9 | thời tiết | `kitWxChip()` / `kitWxEffects(w)` | after every `render()` | chip `.hc.kmwx` in the status row (after Quẻ tuần) with the painted icon `mo-wx-<k>` and the weather name; tap = `kpPop` with the weather's REAL effects read from the code (j3 endTurn, j80 sleepRegen, j9 placeWhere/travel, j8 contests, j12 rollWx). |
| 9b | hạt thời tiết | wraps j11 `mkPart` | same PIXI mechanism (no new rules): rain streaks darker blue-grey and longer, snow/petals/leaves 1.5–1.7× larger, leaves in autumn colours, mist denser; inside her palace (`home`) at 60 % so it reads as "through the window". |

Grade colours (items, rewards): Thường `#9aa3a8`, Tinh phẩm `#5fa58c`, Trân phẩm `#4f74a8`, Tuyệt phẩm `#9a5ab8`, Ngự tứ `#e0a526` (stronger glow). Until the wardrobe grades exist, `kmTierOf(k)` reads the item price (≥150 Tuyệt, ≥80 Trân, ≥40 Tinh) and every item of a golden chest is Ngự tứ.

Art list (`img/kit/`): mo-tablet-back, mo-tablet-front, mo-xam-tube, mo-xam-stick, mo-seal-thanh, mo-seal-bai, mo-edict-closed, mo-edict-open, mo-leaf-dry, mo-leaf-maple, mo-petal-peach, mo-petal-plum, mo-peony, mo-ink, mo-incense, mo-calendar, mo-tray(-open), mo-chest(-open), mo-chestg(-open), mo-giftbox(-open), mo-ingot-silver, mo-ingot-gold, mo-coin-silver, mo-coin-gold, mo-wx-{hoadao,muaphun,suongsom,troiquang,nanggat,vekeu,giong,domdom,laphong,nangvang,gioheomay,trangram,tuyetnhe,tuyetday,suonggia,maino}.
Not done here (other owners): kitRoulette (thân phận, review/kit-2b) and the honour podium (j90, section 26); the motion queue waits for them (`#kpodov`, roulette).

## CẢM GIÁC / FX (game feel, jfx) — touch kit · kitFx(kind) · Pixi overlay · numbers fly (owner 11/14–11/15 "chưa có cảm giác game", review/game-feel)

Code `dev/build/jfx.js` (after jload, before j84). One table, one function: no worker shakes the screen, buzzes the phone or spawns particles
on their own — they call `kitFx(kind,{el}|{x,y})` with a kind from the table below (add a row there when a new moment needs one).

### Touch kit (CSS + one pointer listener; every `button, .btn, .kbtn, .opt, .card, .pct, [role=button|tab], [data-tab]`)
- Press: `scale:.96` (the individual `scale` property, so an element's own `transform` is never overwritten), shadow pulls in to a 1 px gold rim
  + soft gold light (`--kf-rim`). Release: springs back .96 → 1.025 → 1 (240 ms). Stage figures (`.tok`) press but don't spring.
- WHO PRESSES (owner 15/11 "Whole tab panel bounces on any tap", review/press-fx): ONLY the real tappable element under the finger —
  jfx `kfTapOf(target)`: the nearest KF_TAP element that is really tappable (button, a[href], .btn/.kbtn/.opt, role=button|tab, data-tab,
  onclick, or a pointer cursor); a plain container (`div.card`, a pane, a tab panel) is skipped, and no container over 30% of the screen (KF_BIG; a real
  button up to 70%, KF_BIGR: a phone-landscape act card is ~45%) is ever pressed. The press look is ONLY the `.kfdown` class kfTapOf sets — never CSS `:active` (it matches every ancestor of the finger, so
  `.card:active` sank the whole panel). Empty space and plain text press nothing. Test: dev/test/press-fx.js (taps empty points of every tab /
  sub-tab / dialog at the 5 viewports; FAIL on any pressed container or anything >50% of the screen; checks real buttons still press).
- Ripple: pale-gold radial ripple from the touch point (`.kfrip`, a fixed clip box over the element — the element itself is not touched;
  skipped on elements bigger than 45 % of the screen).
- Primary buttons `.kbtn` (not `.alt/.kdone/.ksel`, not disabled): a slow light sheen sweeps across every 7 s.
- Locked (`:disabled`, `.kdis`, `aria-disabled`): the button shakes ±4 px (300 ms) + buzz `lock`, and its reason (first ✗ `.kwhy`, else `title`)
  pops as a dark chip `.kflockwhy` just above it for ~2 s. The reason rows on the card stay as they are.
- Tabs: a 3 px lacquer-red/gold underline `.kftl` slides (320 ms) to the selected tab — main tabs `#tabs`, person-card tabs `.pctabs`, sub-tabs `.ksubs`.
- Hover (mouse only): faint gold rim.

### kitFx table (`FX` in jfx; buzz patterns in j11 `VIB`, ms)
| kind | moment (wired at) | screen | light | particles (Pixi overlay) | buzz (`VIB`) |
|---|---|---|---|---|---|
| decree | ân thưởng / thánh chỉ (`bestow`, leaving lãnh cung) | light shake | gold rim + soft centre glow | gold spark streaks shoot up | decree [20,40,20] |
| promote | thăng phẩm, tấn phong (`promoteP`, with the j93 edict) | light shake | gold | gold streaks + twinkling stars | promote [30,30,60] |
| coin | lĩnh bổng (monthly pay, when the week panel/sổ tuần opens) · any Bạc gain (`apply`) | — | — | silver coins with square holes rain and spin | coin 15 |
| hit | bị tát / bị phạt / bị hại by a scheme (`punish`, frame/kframe/musk on her) | hard shake | red edge blinks twice | small ink blots | hit 30 |
| harm | heavy harm (free for new wiring) | hard shake | red | ink spreads | harm [30,30,70] |
| poison | trúng độc (`ACT.poison` on her) | hard shake | red | ink spreads | poison [80,40,120] |
| expose | bị phát giác / định tội / phế (`deathSentence`, `fall`; result card text "bị lộ / phát giác") | hard shake | red | ink spreads | expose 120 |
| verdict | the seal of a sentence (goes with expose) | light shake | — | — | — |
| ink | someone else falls / her scheme lands | — | — | small ink blots | — |
| birth | sinh con (`kitBloom` "Hạ sinh…") | — | warm glow | petals + flowers burst | birth [15,30,15,30,15] |
| preg | có thai (`kitBloom` "Có tin vui") | — | warm | petals fall | preg [15,30,15] |
| favour | sủng (after the night) | — | — | petals fall | — |
| night | đêm thị tẩm (`nightFx`) | — | warm dim | warm motes rise | night 10 |
| death | chết (`kitInk` overlay) | NO shake | screen darkens slowly | — | death 45 (one soft pulse) |
| demote | giáng phẩm / lãnh cung (`kitGloom`) | — | darkens | grey ash falls | demote [60,50,60] |
| ash | goes to lãnh cung (`goTo('lc')`) | — | — | ash | — |
| win | result card THÀNH (`resultShow`) | — | — | stars twinkle over the card | win [12,40,12] |
| fail | result card BẠI / BẤT LỢI | — | — | grey smoke puffs from the seal | fail 35 |
| mgwin / mglose | trò nhỏ thắng / thua (`openMG` grade ≥2 / <2) | — | — | stars / smoke | win / fail |
| lantern | đêm lễ (festToday() + buổi tối, once per night) | — | — | 9 đèn trời rise slowly with a glow | — |
| lock | locked button touched | element shake | — | — | lock 14 |
Ambient: seasonal petals (spring/summer pink-white, winter red plum) or autumn leaves drift over HER palace screen (`S.place==="home"`), 6
pieces on phones / 10 on iPad, only while no dialog, week panel, motion overlay, podium or title covers the screen.
Numbers fly: after every result card, each changed stat (Sủng, Danh, Sức, Bạc, Đức, Sắc, Tài, Tâm cơ) leaves the card as a green/red pill
(`.kfnum`, "Sủng +6") and flies into ITS top-bar cell (`#hud-<k>`), which glows gold (+) or red (−) on arrival (`.kfhit/.kfhit-r`); stats
without a cell (Thái hậu, Hoàng hậu, Tai mắt, Ân tình) rise and fade. Replaces j93's rising `.kmfls` pills.

### kitGain — EVERY item she gains is revealed (owner 11/15, loot-game rule)
`kitGain(entry|key,{from})` (jfx; drawn with the kit reveal piece `kitRevealHTML` KIT §54.1 = kitItem xl + kitGradeChip, no private markup; cannot be tapped away before `BAL.reveal.gainMin`): the item rises in the centre with a light burst in its GRADE colour (KIT_GRADE), its painting, name and
grade under it, "Nhận"; tap Nhận or anywhere → it flies into the Tư trang tab (sfx-open on reveal, sfx-coin + buzz `coin` on landing), the tab
glows. Queued with the motion pieces (kmPush). No "Lui" button (kit motion overlay: tap closes).
- ONE universal path: after every render, j93 `kmDiff` compares S.inv with the last snapshot; every new entry that is not already shown by
  `kitReward` (ân thưởng via bestow → chest/tray; a gift from another person → tray/gift box) goes through kitGain — Tài nghệ works from every
  lesson / practice mini-game (cooking, embroidery, painting, calligraphy, music…), purchases (replaces j93 kitFlyItem there), finds,
  stories, any call site (35 `inv.push` sites today). A new call site needs no wiring. Test `dev/test/item-gain.js` fails on a silent add.
- Handmade works (j83 `IT.tp` + `entry.wk`): own name (`wk.n`, e.g. "Bát gà hấp lá sen"), tier word from the score (`wk.ti`: Thường · Khá ·
  Tinh xảo · Tuyệt phẩm; q ≥ 6 Khá, ≥ 10 Tinh xảo, ≥ 14 Tuyệt phẩm), tier painting `item-tp-<kind>-b<ti+1>` (j98 `itemArt(entry)`).
  The Tư trang bag (jinv) now keeps each work as its own piece with that name / picture / tier, and its panel offers Dâng, tặng · Bán · Bày.

### Rules
- Buzz = `navigator.vibrate` = Android only (owner's Fold). iPhone/iPad have no vibrate: nothing fails, the picture effects carry the moment.
- "Rung" off (`OPT.vib=false`) → no buzz. "Cảnh động" off (`OPT.fxon=false`) or `prefers-reduced-motion` → buzz only: no shake, flash,
  particles, ripple, sheen, flying numbers, underline slide (`kfStill()`). Bots / `quiet` → nothing.
- Pixi: ONE loader `kitPixi()` (j11) shared by the stage layer and the FX overlay; library bundled at `dev/vendor/pixi-8.5.2.min.js`
  (659 KB, ~183 KB gzip), listed in `assets.json` (group fig, first in line) so sw.js caches it and it plays offline; never fetched on the
  title/loading screen. Overlay canvas `#kfxcv` fixed full screen, z 9450, `pointer-events:none`, resolution 1; ticker STOPS and the canvas
  hides when no particle lives. Quality `KFX.q` drops ×0.7 (min .3) after ~0.5 s under 48 fps and climbs back after 4 s at 58+.
- z order: flashes 9440 < particles 9450 < ripple 9460 < reason chip / flying numbers 9470 (above j93 overlays 9100, under the loader).
- No fan rays / halo (KIT motion rule): the gold "rays" are short streak particles that fly and fade, never a static fan.
- Tests: `dev/test/game-feel.js` (755x1000@2, 1180x820@2, 412x1058@2 run direct, CPU 4x); shots `dev/shots/game-feel/`.

### 32.7 ONE / TWO PEOPLE WITHOUT A SCENE PICTURE — person column LEFT, text + options RIGHT (owner 11/15 04:45Z, iPad "VIỆC · Có người đến") — `kitDpApply` / `kitDpFit` (jk4)
Every kitEventStage dialog that names one or two people (`who`, `who2`, `stage:[a,b]`) and has NO place / event picture band — visitors
("Có người đến"), people asking something (Thái hậu's questions, Việc khó xử), invite / choice cards with one person, two visitors:
- (11/15: scale + chips now per 32.7b and 37 — people fill the column, name chips on TOP.) LEFT column = the people FULL-BODY, the full height of the dialog (under the title to the bottom). Scale = KIT_FIG of that column
  (woman body .79 × column height, forehead to feet via kitFigBody; men ×1.07; children by age; never shrunk to fit the text).
  Feet on one line just above the name chips (33.5 two-line chip: rank on top, name below, rank colour). Two people stand side by side,
  in the kit's fixed slots (§33.7 `kitSlotCx/kitSlotNeed`: 1/3 · 2/3 of the column, whole visible art, NEVER overlapping; the column is as wide as the widest art × (k+1) up to its cap, then everyone scales down together); a chip that would touch its neighbour goes up one row
  (over the hem), chips are clamped inside the column, never cut. The column is as wide as the people (or the widest chip).
- RIGHT column: TOP = the event text (a fact row keeps its small face if it has one; the empty "world" dot is dropped);
  BELOW = the options, one per row, full width, every line (Cần / Tốn / Được / Mất / Kèm, odds). ONLY the options list scrolls (32.5).
- Dialog: height min(100dvh − 32 px, 720 px); width = people + ~470 px, capped to the screen; the right column keeps ≥ 280 px —
  only if the screen is narrower than that do the people take one common factor (Fold 755 with two people still fits unshrunk).
  No-option cards (Đã rõ) use the same layout; the button row sits under the right column.
- Phones (< 600 px wide): people on top (row min(48dvh, 460 px), same KIT_FIG rule in that row), then the text, then the options
  (only they scroll); the dialog fills the screen height.
- A dialog WITH a picture band keeps 32.6 (people stand on the picture: e.g. "Nam nhân nơi cấm địa", headArt events).
How: `.kpb` becomes display:contents so its figure column and text join #mb's grid next to `.opts` (no DOM move; kitDlgFit / kitEsFit
still run; kitEsFit hands 32.7 columns to kitDpFit). Test: `node dev/test/dialog-person.js <site url> WxH@dpr <outdir> <tag> [kinds]`
(kinds host, th, invite, ally2, many, men, pic). Shots before / after: dev/shots/dialog-person/ (755x1000, 1180x820, 1366x1024, 412x1058).
Options in the right column follow 32.9 (all short → 2-column grid, else rows); the "one per row" above is the long case.

### 84c PERSON-LESS FRAME — main picture fills the column (map-tap-go, owner 18/11 ~06:10Z "no empty space"; kit part owned by the map-tap-go worker, KIT_REQUESTS row closed)
A T7 frame (kitFrameLive3 / kszFrame3) whose subject is no person — a place card (m.placeK), or `sp.noWho` — carries NO narrator and NO second picture: its ONE picture is the left main picture. S / narrow ("one"): the standard kit picture (KIT_SIZE.pic[picS], 120x160, centred). M / L / XL ("fig"): `.k3main.k3mpic.k3fill` = the picture FILLS the left column (align-self stretch, cover-crop with kitPicFocus, true ratio, never stretched); the right column decides the body height (fits = the frame stays inside the screen). Used by every person-less VIỆC frame (today: the place card; scan: dev/test/map-tap-go.js + kit-conform place:*). kit-conform rule: a `.k3fill` picture must be as tall as `.k3right` (no empty band). Sample: kit page §84c.

### 32.8 PLACE CARD — the place-event frame for every place card (owner 11/15 08:55Z + 08:58Z) — `kitPlaceDress` / `kitPlaceSil` (jplace)
**16/11 (owner "Má nó, kit chung đâu", review/kit-sweep) — SUPERSEDES the layout below:** the place card is template T2 (§8.2): ONE place picture LEFT (headArt moved by `kitOnePic`), RIGHT kit rows (`kitRows`: Chủ vị · Đường đi · Còn · Bóng người · Giờ) + the card's own lines as kit fact rows, options below as kit option rows scrolling inside the frame. No top band + second picture, no `.kplhost` portrait cell, no `.kplinfo` box, no silhouettes drawn on the picture (the count is a row). Text below kept for history.
Every place card — tap on a place on Dư đồ or in Danh sách nơi (`j77Card`: closed place, Xin bái kiến / Xin yết kiến / Lẻn vào / Nhờ thái
giám, walk spill 34.1d), the last walk of a buổi (`j77LastWalk`), the greeting card (`accEtqCard`: Bái kiến rồi vào / Vào thẳng) — uses
the SAME large place-event frame as place event dialogs (32.6), VERTICAL on every size (owner 08:58Z replaced "picture left, info right"):
- TOP = the place picture of the current season + buổi (`kitPlaceArt(k)`: img/<nơi>-<mùa>-<buổi>.webp via sceneImg; a palace without
  its own picture uses the shared phi-tan-cung picture, the approved rule; her own palace tam-cung-dem), wide kitSceneArt band with the
  place name; when people are there, that many grey kit silhouettes (img/kit/unknown-fig-f/m/k, f/m/k by who is really there, ≤ 5 + "+N")
  stand on its floor — shapes only, no faces.
- MIDDLE = one info box `.kplinfo`: a fact line "Đường đi N khắc · Còn M khắc · K bóng người", a dim hours / entry-rule line (mở cửa sáng,
  chiều · sáng thỉnh an, lúc khác phải được mời · chỉ vào khi được triệu), then the card's own lines (reason, greeting rule, why a way in
  is closed). No empty "world" dot, no repeated "Có N bóng người ở đó" line.
- BOTTOM = the buttons by 32.9. Waiting (owner final names 11/15): at night "Sang ngày mới"; in the day "Sang buổi" only when one buổi helps
  (not for a place that opens only in the morning); a too-long walk gets the spill button instead (34.1d).
- 32.8b THE HEAD OF THE PALACE (owner 11/15 15:45Z, "VIỆC · Chung Tú cung") — `kitPlaceHost(k)` (jplace): when the palace has a head
  who is at home (consort palaces: her chủ vị; Càn Ninh: Hoàng hậu; Đức Thọ: Thái hậu), the MIDDLE row is two columns `.kplhost`:
  LEFT her portrait (`pcPort`) with name + rank ABOVE (48 kitNameRank), drawn through `relPerson` so a head she has NOT met is the grey
  kit silhouette (stranger rule 49.3, the name stays); RIGHT the info box `.kplinfo` (she is in, the greeting rule, "cần N khắc, còn M").
  The picture band with its grey silhouettes stays on top unchanged (owner OK); no "Thôi" button (32.10 ✕). Applies to every place card
  of that palace: the greeting card (`accEtqCard`), the "you are here but have not greeted" card (`cbGreetCard`), the closed-place card
  (`j77Card`) and the last walk (`j77LastWalk`).
Not yet: the outer-court card (`menNtCard`, a kitModal rule card). Test: `node dev/test/place-card.js <url> WxH@dpr <outdir> <tag>`
(spill, last, night, rank, etq, sneak). Shots before / after: dev/shots/place-card/ (755x1000, 1180x820, 412x1058).

### 32.9 ONE OPTION LAYOUT RULE — `kitOptLayout` (jplace, replaces k3IsLong; every dialog incl. 32.6 / 32.7 / 32.8)
- SHORT option = name + at most ONE effect row; LONG = two or more rows (Cần / Tốn / Được / Mất / Kèm / Ghi chú) or a name over two lines.
- All short → 2-column grid of equal buttons (3 on ≥ 1000 px with 3+); any long → each long one is a full-width row, short ones share the
  grid. If a grid cell is too narrow for its own lines (an effect value wraps, a name over two lines — e.g. 32.7 two-person column on Fold,
  phones) the group goes back to rows (`kitOptCramped`). A Q item may still force optLayout.
- "Để sau" / "Bỏ qua" / "Không đi" (`kback`): compact secondary button, name only (rows without a number dropped), in its own place — the
  old "Thôi always last" rule is gone (owner 11/15, 32.10): "Thôi" / "Lui" are never buttons any more, the dialog closes with its ✕. When
  every other option is long it is a slim full row, otherwise a grid cell. The meaningless "Ghi chú: không được mất gì" line is gone everywhere (j63 drops it).

### 32.10 CLOSING A PANEL — ONE ✕ (kit-x) + tap outside + Esc; forced panels have none (owner 11/15: "no Thôi / Lui / Đóng / Đã hiểu buttons") — `kitXHTML` / `kitXAdd` / `kitCloseSync` / `kitCloseLayer` (jk4), j3 `kitCancelIx`
RULE (fold-popw 11/16): the ✕ never overlaps content. A card WITH a `.kph` header carries it inside the header; a card WITHOUT one (`.kit-x.kxabs`, e.g. the person / Hoàng thượng card `.kp-person`) reserves a 48 px strip at the top of the dialog (`#modal .dlg:has(>.kit-x.kxabs),#ov .kpanel:has(>.kit-x.kxabs){padding-top:48px}`, jk4): text and scrollers start under the ✕, so a scrolled option list never runs under it. Scan: `node dev/test/fold-popw.js <device> <outdir> <tag>` (✕ hit-test at 5 points of the ✕ while the list scrolls 30/60/100 %).
**32.10a A floating card never covers a dialog (review/small-bugs-3; owner 844x390: the result card sat on the dialog's options and its catcher ate
the first tap).** While any dialog is open (`#modal`, any visible `[role=dialog]`: reward box, game frame, book, item sheet, podium) — `kitDialogOpen()`,
body class `kdlg-on` — the act result card `#rtoast` and the `kitLine` pill `#kupdline` are PARKED (hidden, no `#kxcatch`). When the last dialog
closes, a parked result card comes back with a fresh 7 s timer and its catcher. New floating cards join the same rule (add their id to the
`kdlg-on` CSS in jk4). Test `dev/test/small-bugs-3.js` toast.
THE component — one place, every panel inherits it (#modal: event dialogs, choice cards, place cards 32.8, person cards / self / Hoàng thượng
(pcm), info and report cards, Tư trang item and slot cards 28.13f, the shop 28.13d, title-screen pages, co-op pages; plus the week book
kitBook, game / lesson results in #ov and the person card opened from the room #popw).
- THE ✕: `kitXHTML(attrs, label)` → `<button class="kit-x" aria-label="Lui">✕</button>` (VANPHONG "Lui"): 36 px square, kit ink on a cream ground, hair
  border, gold ring on focus (night: dark ground, gold ✕). ONE per panel, at the TOP RIGHT of the panel header `.kph` (placed absolutely: the
  header keeps the height of every other dialog, the title gets 56 px of right padding). A card without `.kph` (person cards `pcm`) gets it at
  the dialog's own top-right corner (`.kit-x.kxabs`, 8 px in); the room person card (#popw) has it as `#popx.kit-x` in the card's corner
  (jk3 §9); the week book at the screen's top right (`.kbk > .kbk-x`); a game result at its header's right end. A floating card inside a
  panel (shop item card) uses the same class at its own top right. `kitXAdd(dlg, close)` adds it (once) and wires it.
- THE ✕ IS NEVER COVERED (owner 16/11 "Nút tắt bị che", review/press-fx-r1): nothing in or over a panel may sit on its ✕. The docked room card
  `#popw` lies above the pane bar (`#popw` z 41 > `.kpbar` z 29, jk3 §9), and the panel person card's top line is the pane bar's bottom
  (`kitPcSize`, jk2b, KIT 45.2), so a card is never scrolled with its top under the bar. When the card's own body scrolls (phones), the ✕ follows: jk3 §9 sets `--kpcxy` = the card's
  scrollTop and the ✕ is translated by it, so it never leaves the card's top-right corner. Test dev/test/press-fx.js
  (check "✕ on top"): for every tab with a room person open and the panel + card scrolled to the end, the point under `#popx` must hit `#popx`.
- NO CLOSE-ONLY BUTTONS: a dialog option whose label is only "Thôi" / "Lui" / "Đóng" / "Đã hiểu" / "Đã rõ" and has no effect
  (`kitCancelIx(m)`, j3) is never drawn; a card's button row word "Đã hiểu" / "Đã rõ" / "Lui" / "‹ Lui" / "Đóng" / "Xong" is hidden
  (`data-kxw`), and an empty button row is not drawn. The old behaviour stays: ✕ runs that option through `chooseM` (its `go` and every
  wrapper run as before) or clicks that button (`onClose` runs; title pages go home). A button that MEANS something stays
  ("Tạ ơn", "Tuân chỉ", "Cúi đầu", "Bước vào", "Chuyển kiếp", "Đầu thai kiếp sau", "Tiếp tục", "Vào ngày mới", "Để sau", "Bỏ qua"…), and
  so do story choices that begin with "Thôi," (they carry an outcome: "Thôi, không đào sâu" Đức +2…).
- TAP OUTSIDE: a tap on the dimmed ground around the box closes a closable panel exactly like ✕. Only a real tap: the press must START on the
  ground and end there, moved < 10 px, within 0.9 s — a drag or scroll that starts in the box and ends on the ground never closes, a swipe on
  the book never closes. The room person card (docked beside the stage) closes on a tap on the empty scene (not on a person, a button or
  a plaque). Full-screen boxes (phones) have no ground: ✕ and Esc.
- Esc closes the top-most open closable panel (an overlay over the dialog first — book, game result — then the dialog, then the room card);
  it runs after the panel's own key handler (title pages, the book and the podium keep theirs).
- FORCED PANELS: a dialog with options and no close-only option (an event that must be chosen — week events, Việc khó xử, story chapters,
  summons, the death / rebirth card, a decree to accept) has NO ✕; a tap outside and Esc do nothing. A card whose only button means
  something (above) is forced too. `m.mustChoose:true` forces a dialog even if it carries a "Thôi". While a game runs (#ov) there is no ✕.
- Writers: never add a "Thôi" / "Lui" / "Đóng" / "Đã hiểu" button to close; give the dialog its cancel as `{n:"Thôi", fx:{}}` (optionally
  with `go`) or leave `btn` empty on a card — the kit turns it into ✕ + tap outside + Esc. Words: VANPHONG §1.
- THE TAP IS SPENT ON CLOSING (owner 11/15: "the outside tap closed the result card and also ran the act under it"): a card with a dimmed
  ground (#modal, the book, game results) closes on the ground's own click, so nothing under it fires. A card that floats WITHOUT a ground —
  the act result card `#rtoast` (THÀNH / BẠI / BẤT LỢI) — gets the full-screen transparent catcher `#kxcatch` (`kitCatchOn(card, close)` /
  `kitCatchOff()`, jk4) right under it while it is open: the first tap outside closes it on release (pointerup / touchend) and every
  event of that tap (pointerdown / touchstart / touchend / mousedown / mouseup / click) is swallowed; the catcher stays 400 ms after the
  close to eat a late ghost click. A later floating card uses the same pair. Test: `dev/test/kit-close2.js` taps an act button's position
  under each card kind (result, info, choice, person, shop, item; touch and mouse) and checks the card closed and khắc / Sức / Bạc / Sủng /
  the log did not change.
Test: `node dev/test/kit-close.js <build page> <outdir> [WxH@dpr,…] [oldsave.json]` (✕ / tap outside / Esc per panel kind, drag-to-ground
stays open, forced dialog stays, room card, book, "Sang buổi" / "Sang ngày mới", no close words on any tab, old save loads).
Shots: dev/shots/kit-close/ (755x1000@2, 1000x755@2, 1180x820@2, 844x390@3).

### 32.11 NEWS CARD "Tin trong cung buổi này" (owner 11/15, kept: the morning news matters; the Tuần lục is only the week's summary)
- Fires at the start of a buổi when something happened (j9 nextBuoi, j3 endTurn → the first buổi of the new tuần): title "Tin trong cung
  buổi này", `kind:"news"` (seal TIN). The night's rest is its own line about HER: "Ta ngủ một đêm: Sức +N" (j76, her face).
- Picture = the scene of its MAIN item (`kitNewsArtId`, jk2b): the first sentence that maps by the week book's table (j87 `KBK_EVRE`;
  "thẻ bài … được lật" → thị tẩm; the "Tai mắt kể:" lead-in is not a scene), none → "Có người đến chơi". Never the "Triều chính" default.
- Closes by the kit (32.10): ✕, a tap outside, Esc; no "Đã hiểu".
- Rows name whose number moved: "Sủng của <tên> 35 → 38" (the person's face from the shared avatar renderer kitFaceH); a line with no
  change says nothing about numbers (no "Sủng nàng 45 → 45"; j75 NPC effort / family gift lines).

### 32.12 TOP BAR GRID — her block never wraps · portrait = name block height · two-row fallback (review/header-fix → review/header-danh) — jk4 `kitHdFit`
**Name block vs time block (review/small-bugs-3, 1000x755):** `kitHdClash(hd, tc)` — the right edge of her block's text + 8 px must stay left of
the time block's first text / icon, else the two-row bar (`khd2`). A long date ("Tháng chạp · trung tuần · năm thứ hai mươi ba") ran under the
weather icon in the one-row bar. Test `dev/test/small-bugs-3.js` header.
The bar re-fits whenever its content changes after render (MutationObserver on the header + picture load; review/small-bugs-3-r1:
1180x820 a late date/weather write left the one-row bar overlapping).
Her portrait never waits for the figure manifests (review/small-bugs-2): `kitMePor()` (jimg) = `por-player-<look>-t1-a<band>` from her
life-long identity `S.fid`, the same picture on every life type (cung nữ, lãnh cung, every origin); `porOf(S)` uses it while FIGURES*.json load.
(review/header-fix wrote this as "31.19", which main already uses for ACT ORDER.)
- ≥ 600 px her block is fixed: frame · name (1 line) · rank chip + age chip (1 line) · short date (1 line); `max-content`, never shrinks
  (owner 11/15 Fold shot: name on 2 lines, chips under "‹ Ngự hoa viên", date on 3 lines). The time block is the column that gives.
- Her portrait frame (`#me-p > .md.kfc`): width = the name block's height × 550/795 (owner 15/11 10:30Z: crest + window + band as tall as the name block); since tassel-fix the cell is the whole canvas (550:1037), so the jade pendant + tassel hang below, whole (owner 15/11 06:35Z, §28.0).
- Two-row bar (600–999 px; ≥ 1000 px when the one row does not fit → `header.hud.khd2`, measured by `kitHdFit` on render/resize, one pass):
  row 1 `menu · her block · (gap) · RIGHT COLUMN`, right column = time block with the "‹ Nơi" button under it, same left/right edges
  (owner 08:35Z option A); row 2 the eight kitStatCells. The one-row test is made in the seal's one-row form (`.kseal-pad`, KIT 39: 1000–1179 px
  icon-only cells), then kitSealHud re-measures — so the bar returns to one row after a long place / name is gone.
- Fixes the reviewer note (kit-close.md #3): at 1000x755 / 1180x820 with a long name the quẻ line "Quẻ Thượng thượng (Danh)" ran over the Sắc number
  → now the two-row bar. Probe: `node dev/test/header-danh.js <index.html> <outdir> 755x1000@2,1000x755@1,… [oldsave.json]` (groups, label /
  number line spread, bars, tooltips, quẻ/time vs cells overlaps, seal gap to the quẻ line, box overlaps, lines per item, back-home one row).

## 33. ONE FIGURE SCALE · KIT_FIG (owner 11/15 "người trên sân khấu quá nhỏ"; review fold-layout r3 FAIL 1366) — `dev/build/jkit.js` (top) + j59 + jk4

**Single source of truth** for how big full-body people are drawn: `KIT_FIG` (jkit.js, also `window.KIT_FIG`, CSS `--kfig`).

| who | factor (× adult woman) | ≈ share of the stage / picture height |
|---|---|---|
| adult woman | 1 | **KIT_FIG.h = .79** (owner 11/15: the ratio approved in the page-curl shot kept as `dev/shots/curl2/ipad1180-tab-45-ref-ratio.jpg` (from a51a155f), measured .787) |
| adult man / eunuch / official / physician (`fig-emperor/eunuch/official/physician/man-*`) | **KIT_FIG.man = 1.07** | ≈ .85 (capped under the place ribbon; the cap never shrinks the others) |
| child, age a < 18 | `.55 + .03·a` (5 → .70, 10 → .85, 15 → 1) | by age |

`KIT_FIG.fac(src, age)` = the factor of one figure file for one person. No other file may keep its own height factor
(the old j59 `MANF`/`MEN`/child formula and the `.7` "tall stage" strip factor are gone; j59 reads KIT_FIG).

Stage rule (j59 — every room / place / servant road / lãnh cung stage):
1. Everybody in one scene has ONE scale: woman BODY height (kitFigBody: forehead-top to feet, crowns/hairpins not counted, 33.6) = .79 × stage height (feet on the floor line — the painted floor
   anchor is honoured only while the kit height still fits — heads under the place ribbon). Men ×1.07 — a taller figure is CAPPED under the ribbon on its own, it never lowers the women. Children by age.
2. People use the FULL stage width (owner 11/15): they may stand behind/under the RIGHT plaque column — its plaques float on top on a
   solid card (`.kshR .k3p` opaque). The left gutter (if any) is kept. An EMPTY plaque column reserves no gutter (jk3 k3Gut).
3. Widths count the visible body (kitFigBody alpha bbox l..r; silhouettes too), not transparent margins.
4. **Superseded by 33.7 (slot template, owner 11/15 06:55Z)** for positions, pages and chips; the counts stay: 3 iPad / 2 Fold, her included.
   (history) At most **3 people at once on iPad, 2 on Fold / phones** (her included; owner 11/15 "4 is too crowded") at that one scale. They are packed by their
   **CORE** body column (kitFigBody cl..cr = narrowest torso/skirt run on the 35–80 % band × 1.2; sleeve flare beyond it is not
   counted): each figure may step back over its left neighbour by up to **20 % of its core** so each person reads clearly (later ones in
   front, same scale, no back row). The outer sleeves of the first and last figure are counted, so no sleeve is ever clipped at the
   stage edge. Figures may stand under the right plaque column (plaques float on top, solid).
   When more people are there than fit, the stage shows a **page** of whole people (as many as fit packed, ≤ 3 iPad / 2 Fold); the count
   chips "› N" / "N ‹" in the stage's bottom corners (name row, under the feet) turn to the next / previous people. No clipped
   scroll strip. Names are never cut: neighbouring chips that would touch go to two rows (stagger); chips are clamped inside the
   stage again after late modules fill them.
5. No "her + 1" shrink (owner 11/15). The one remaining exception is a stage narrower than ONE whole person, which scales down to
   exactly one person.
   Size cap (owner 11/15): the body height never exceeds `KIT_FIG.maxPx` = 542 px (what .79 gives on the 1180 iPad stage), so a
   taller stage (1366: .61 of 889 px, larger iPads) keeps the 1180 figure size and fits her + 2 like 1180.
   The cap applies to iPad-wide layouts (viewport ≥ 1000 px, where 3 people are allowed). On Fold / phones (2 people) the room view keeps
   the full .79 of its taller stage while she and the next person fit packed; only a stage too narrow for that (Fold cover 412) falls back
   to the maxPx cap (review 11/15: the cap had shrunk the Fold inner screen, the primary device, from .79 to .66).
   She herself stands on the stage at EVERY place she is (j28, owner 11/15): first / left, chip in her rank colour, counted in the 3 / 2.
   Measured 11/15: dev/shots/book-release/stage/n*.jpg, table in dev/PROGRESS_book_release.md.
6. Name chips are never cut: in the strip each slot is at least chip width + 8 px.

Event stage (jk4 kitStageFig / kitEventStage, week-book person pages): each figure carries `--kfr = KIT_FIG.fac/KIT_FIG.man`,
so a man fills the figure box and a woman / child stand at their kit ratio; feet share the bottom line (`.kesf` justify-end).

### 33.6 Event stage BODY FIT — `kitFigBody` (jkit, one copy) + `kitEsFit` (jk4, review/men, owner 11/15 "Quý phi ~80% of the guard")
The `--kfr` cap above limited the CANVAS height and the column width, so wide-robed / tall-headdress consorts came out ~80 % of a man.
Every kitEventStage row (`.kpsubj.kes`) is now fitted after it is drawn (and on resize):
- `kitFigBody(src)` (cached): alpha bbox t/b/l/r + **head top** = first rows of fair skin (forehead) − a hair allowance (4.5 % of the
  body), so crowns, hairpins and phoenix headdresses above the head do not count. Grey silhouettes (no skin) use the bbox top.
- Body (head top → feet) = .9 × box height (clamp 200–400 px, 40 dvh) × KIT_FIG ratio (man 1 · woman 1/KIT_FIG.man · child by age).
- Feet on one line: the transparent margin under the feet is pulled out (negative margin); transparent side margins take no room.
- Row too narrow → every figure scales by the SAME factor (ratios kept). Names never cut (chip max-width = visible body, min 80 px).
- The rooms / places stage (j59) keep their own bbox fit (§33 rules 1–6); the headdress rule could move there later.

Measured BEFORE 11/15 (.86 / ×1.08, superseded — see the table in dev/PROGRESS_book_release.md) (dev/shots/review/fold-layout/k33-*.jpg; figure image height / stage height; 0 page errors, 0 horizontal overflow, 0 cut chips):

| viewport | consort room (her + 1) | cung nữ, master away (her + 1) | cung nữ, 3 people | cung nữ, 6 people |
|---|---|---|---|---|
| 686x880@2.2 | .86 / .86 (no strip) | .83 / .90 man (no strip) | .78 + "› 1" | .78 + "› 1"/"4 ‹" |
| 1180x820@2 | .86 / .86 | .66 (Hoàng hậu, wide) + "› 4" | .66 | .66 + counts |
| 1366x1024@2 | .83 / .83 | .75 / .81 man | .62 + "› 1" (was .30, cut) | .62 + counts |
| 1024x768@2 | .78 / .84 man | .60 + "› 1" | .60 | .60 + counts |

**KIT 33.6 · kitFigBody(src, cb)** (jkit.js; review/men jk4 has the same code — drop that copy when merging, jkit adds cl/cr): the ONE body measurement — alpha bbox + CORE column cl..cr + head top from the
forehead skin minus a hair allowance; j59 room/place stages (J59BB cache) and jk4 event stages size every figure by it.

**KIT 33.4 · kitImgErr(img, {sel, cls, text, swap})** (jkit.js): the ONE null-safe fallback for inline `<img onerror>`;
does nothing when a re-render already detached the picture (fixes "Cannot read properties of null (reading 'classList')"
from j15 pcPort). Used by j15, j3, j90 (podium), jk4 (event stage). New inline onerror handlers that touch a parent must use it.

Open (next kit pass): podium (j90), identity card, co-op friend figure, minigame podium still size their single figure by
their own box (one person per box, no scene) — move them onto `--kfig`/`KIT_FIG.fac` when they show two people together.

**KIT 33.5 · STAGE NAME CHIP (owner 11/15 iPad shot 1115-stage-name.jpg)** — every name chip under a full-body figure is TWO lines:
rank / role on the top line (small, .74rem, 600), name on the line below (bigger, 1rem, 700). Both lines are tinted by the person's colour
from the ONE rank → colour lookup (j59col: kit rank palette RCOL for consorts / Hoàng hậu, MRCOL maids, ERCOL eunuchs, Emperor gold
#c9a227, Thái hậu amber #b06f1c, lãnh cung grey), darkened with ink (top 75 %, name 45 %) so pale ranks stay legible. A title-only chip
("Hoàng thượng") is one big line. Rules live in jk3 (stage, incl. her own #j59metag) and jk4 (.kesf .kpsn — event stage and week-book
person pages, same two lines from kitName's .kti + name). Chips stay inside: strip slots are ≥ chip width + 8 px; in a single row
neighbours whose chips would touch go to two staggered rows (j59 crowd), and the final overlap check re-lays out.

### 33.7 STAGE SLOT TEMPLATE · khuôn ô sân khấu (owner 11/15 06:55Z + 07:30Z + 08:00Z, review/stage-slots) — `dev/build/j59.js` j59lay
Every stage that shows full-body people (room, place, her palace, servant road, lãnh cung, co-op — all go through j59lay) uses ONE template:
1. **Slots = the FIXED SLOT TABLE (33.12, owner 16/11 19:54Z + ~20:04Z, review/stage-pets-r7).** A view has the kit table's slot count, never one computed from who stands there:
   TAG BAND (fig-tag-chip, 17/11): the floor band under the feet (`KIT_SLOTS.band`, jkit) = 64 px = the tallest tag (title plate «Trăng soi rèm ngọc» + rank + name, 57 px) + 3 px gap + air, so a plate never pushes the name below the stage. When a tag WRAPS (phones: long rank/plate/name, 72–112 px) j59 raises the floor for that stage to tag height + 5 (`FOX`); never cuts the tag, never shrinks the feet out of view. Scan: `dev/test/fig-tag-fit.js` (stage, plate/plain, 8 origins x 3 places x 5 sizes), `PLATE=1 dev/test/fig-feet-fam.js` (dialogs).
   one-page view (Fold room, Fold place painting, iPad room page — the Fold page IS the iPad page scaled, KIT §0) = **2**; the iPad full-screen place painting over the whole spread = **4**.
   The FREE width (stage − the LEFT RAIL strip `KIT_SLOTS.rail` = 66 px, always, or the rail's measured right edge + 5 px if wider − left plaque gutter − right side column, always reserved; `st.dataset.j59free = x0,avail`) is cut into N equal columns; slot i = centre of column i
   (`kitSlotCxE`). (stage-figsize, owner 16/11 ~21:20Z + s24: the rail strip moves the Fold slots right, 113/323 → 156/337 px of the 582 px page, and no head stands under a rail button — r6 FAIL 1.)
   NEVER CUT (`kitSlotIn(cx, l, r, lo, hi)`, jkit): when a figure's visible art (kitFigBody l..r, sleeves included) would leave the stage (`KIT_SLOTS.edge` = 4 px) or reach under the right side column, that slot's centre is pulled in by exactly that much (nothing else moves; its pet follows the body); a slot never moves for a figure that fits. dev/test/stage-slots-fixed.js checks centre = kitSlotIn(slot) ± 2 px and the art inside lo..hi. 1 person stands in slot 1 (not the centre) — puzzle pieces: anyone placed snaps to that slot, never shifts. Others are reached by swiping (33.9).
2. **Body on the slot centre, no shrink, no fewer slots (owner 16/11 19:54Z, replaces 'never overlapping')**: the BODY centre (kitFigBody core column cl..cr) stands on the slot centre,
   feet on the kit floor line `kitSlotFloor(stage height)` (one line per stage height: the name-chip band `KIT_SLOTS.band`, no painted-floor or chip-height shift), at the KIT_FIG
   scale (woman .79 / maxPx on the iPad spread, man ×1.07 capped under the ribbon, child by age). Nobody is scaled down or moved to make room: wide skirts / sleeves MAY overlap
   the neighbour (clothing only); a figure is never pulled in beside a panel (the slots already lie inside the free width). While any picture of the view is still loading the
   people are hidden (`.stage.j59wait`, at most 6 s), never shown as an unplaced pile. She stands still (no idle sway: KIT motion rule STILL PEOPLE).
   Test: `dev/test/stage-slots-fixed.js` (room, Ngự hoa viên, Thái y viện; every view by a real swipe; body centres, feet, pets, same slots on every view and stage).
   **THE SLOT FUNCTION (review/stage-slots-fix-r1, jkit.js)**: `kitSlotSw(k,avail)` = spacing, `kitSlotCx(i,k,x0,avail)` = slot centre, `kitSlotScale(visWidths,avail)` = common scale-down, `kitSlotNeed(visWidths)` = width a group needs. The room / place stage (j59), the event picture band (`kitEsOvFit`) and the event person column (`kitDpFit`) ALL call it; no other part may place standing people with its own numbers. Test the event parts: `node dev/test/stage-slots-fix-r1-ev.js <page> <WxH@dpr> <outdir> <tag>`.
3. **Never a mini portrait on the stage** (owner 08:00Z): a person without figure art stands as the kit's full-size soft silhouette
   (`img/kit/unknown-fig-f|m|k.webp`, `.j59sil`, man silhouette ×1.07) in a slot, with the real chip; a stranger is the grey silhouette
   with "Người lạ". Only things that are not people (a chest) keep their small token, still in a slot.
4. **Name chip** (two lines, 33.5) centred on the slot centre, at most the slot width − 8 px (`--j59sw`), wraps instead of being cut;
   every chip's top is the same line, 3 px under the floor line (her chip too). Two slots' chips can never touch.
   Line 2 is always a PERSONAL name (owner 07:30Z): posts go on line 1 ("Tổng quản Kính sự phòng" / "Lương Phúc An").
   Court officers get a stable cổ trang name once per life (`kitNames`, j59: `S.court.{tq,ksp,ped,ty}.pn` = `.name`, the
   lãnh cung stand-in `S.lcfPn`), unique among everyone in the life, saved; old saves get theirs on the first render after loading.
5. **Pages.** Page 1 = her in slot 1 + the first N−1 others; every later page = the next N others — **she appears once only**.
   Next chip **"+N"** (N = people not shown yet), back chip **"‹"**; each stands in its own gutter (46 px; 34 px on phones) at the stage's bottom corners
   (name row), reserved on every page of that place, so a chip never covers a figure or a name.
6. **One head count** `kitHereCount()` = the OTHER people (not her, not a chest / errand) on the stage of the place she stands in.
   It feeds the stage title ("Ở đây còn N người."; "Không gặp ai." at 0), the page chips and the Dư đồ label of her place
   (countAt: her place reads the stage; other places use the arrival rules, the maid road its own `j59srvCount`). Dư đồ counts
   other people only — "bóng: người khác đang ở đó, không tính ta" (UI names her "ta", owner 11/15 05:05Z); her own place wears its own mark (.here).
Tests (755x1000@2, 1000x755@2, 1180x820@2, 1366x1024@2, 844x390@3 — portrait phones are not supported, owner 11/15): `dev/test/stage-slots.js` (via `stage-slots.sh <WxH@dpr> <tag>`: places with 1, 2, 3, 5 others + Kính sự phòng with a man and a
person without art; slot centres, feet line, chip tops, overlaps, her count, counts, page errors, old save) and `dev/test/stage-counts.js`
(map count = arrival count on every place, consort and maid roads). Shots: `dev/shots/stage-slots/` (before = main, after = this build).

### 33.8 STAGE PET · thú theo hầu trên sân khấu (owner 16/11 17:30Z + 18:00Z, review/stage-pets) — `KIT_PET` / `kitPetOf` / `kitPetArt` (jkit.js) + `j59petPut` (j59.js) — awaiting kit review
- WHAT: every person on a room / place stage (j59: her, every NPC, co-op friend) shows their ONE "theo hầu" pet (`p.pets[p.petOn]`, `tsbPetOn`; already synced in co-op, no new packet) in ONE fixed spot. A stranger (`kitKnown` false) shows no pet. No fancy placement (no shoulder / hand perch), no outdoor-only rule: big pets appear anywhere.
- SPOT (33.12, owner 16/11 19:54Z "exactly ngay cái location đó"): FIXED by the owner's SLOT only — the pet's visible bottom-centre stands at `kitPetSpot(slot centre, slot width)` = slot centre + `KIT_SLOTS.pet.sx` (.3) × slot width, feet on the slot floor line, in front of the owner's legs (never moved by the owner's art width, the species size or a neighbour). Static `<img class="kspet">` (z 2, no pointer events); only motion = 1.5 px idle bob under Hiệu ứng "Đầy đủ" (`.stage.j59fx`), none under reduced motion.
- SIZE = the kit CLASS per species × the woman body height H of the stage: `KIT_PET.h` S .24 · M .30 · L .34 (visible pet height / H; round 2: S raised from .18 and M from .26 so a small pet reads on iPad and Fold; L stays .34 — .36 covered 8-9 % of the torso), times the growth scale of the pet (Non .62, Thiếu niên .8, grown / Linh thú 1). `KIT_PET.cls`: S = meomuop hoami tho cavang meo sao uyenuong cachep vet lyngu ngoctho · M = cho sutu linhmieu camke cuuvi phuong · L = hac thienma bachloc kylan thanhlong. (Foreman C's art table decides the final classes: change ONLY `KIT_PET.cls`.)
- LAYOUT: the pet takes no slot and changes no slot (33.12); a large pet may overlap its owner's legs and the neighbour's hem.
- ART: `img/pet-stage/pet-<key>.webp` (Foreman C, cut-out). Until a species has it: PLACEHOLDER = the existing transparent pet picture of the pet's growth stage (`petPSrc`), the `<img>` carries `data-ph="1"`. Dropping C's file on the CDN replaces it, no code change.
- OCCLUSION (owner: "check that large pets do not cover the person's body"): measured from pixel alpha masks by `dev/test/stage-pets.js` (face band = head top → 22 % of body; torso = core columns, 25–75 % of body); numbers in dev/handover/reports/stage-pets.md.
- Kit page sample §33.8 (jkitpage): S / M / L next to the kit woman silhouette.
- 33.9 SWIPE STAGE (j59 `j59swipe`/`j59go`/`j59chips`, rule text in jkit.js; owner 16/11 18:22Z, replaces "3 people on one stage" and the A/B samples): people NEVER shrink (KIT_FIG, no J59HMIN shrink); a view holds the FIXED SLOT TABLE count (33.12: one page 2, iPad spread 4; the old 46 px page gutters and the ‹ › / "+N" buttons are gone); the others are reached by SWIPING the row left / right (touch or mouse, no arrow buttons): the figures, pets and name chips follow the finger (`--j59dx` → CSS `translate`), on release (≥ 56 px) the row slides out and the next view slides in (220 ms, transform only, instant with reduced motion); under 56 px it bounces back; a drag never opens a pop-up (click swallowed), a tap does. Two BIG count chips (`.j59more`, content = ONE kit function `j59chipIco(n)`: the grey GROUP-of-three icon (man, woman, child; Magnific gpt-2-6 painting flattened to the unknown-fig grey, `img/kit/unknown-ico-n.webp`, 192 px tall ~145 wide, owner 17/11 ~14:15Z) drawn by `j59ico()` + the text "+N"; aria-label/title stay "N người ở bên trái/phải · vuốt…"; icon alt="", single src so the jcdn CDN fallback works; the same `j59ico()` draws the PLACE HEADER count inside the same light kit plaque (`.kchip.j59hchip`, readable on dark scenes): "Ngọc Thanh các [plaque: icon 5]" replaces "· Ở đây còn 5 người." in every place header (`j59hdrCount`, "Không gặp ai." stays text), kit chip at the big size: 1.05rem, 5/15 px padding, 2 px border; not tappable; readable at Fold 755) in the TRUE BOTTOM corners of the stage (6 px in; only a side column / rail whose height reaches the chip moves it beside it, flush; owner 17/11 13:02Z + 14:15Z, replaces the top-corner / beside-the-column placement): LEFT = the people off the left side (already passed), at the bottom-left; RIGHT = the people off the right side (still to come), at the bottom-right; each side its own count, hidden at 0. Never on a side column / rail (it steps beside it), never on a figure's name chip (it steps up above the name row); the chip is placed again on the next frame once the side column has its full height (morechip-fix). Test: dev/test/morechip-scan.js (every place, page 1 and 2, five sizes: icon loaded and >= 18 px tall, text "+N", aria-label kept, true corner (<= 14 px from the stage edge or flush against a column) at the bottom, header shows icon + N, height >= 28 px, bottom half, not on column / rail / name chip). A new place always opens on its first view (the view index is kept per place). Own room order: her + her pet + maid + maid's pet first (homePeople order), eunuchs etc. on the next swipe. Only her own room and the last Dư đồ level (the full-screen place painting, 33.10) show people on a backdrop. Tests: dev/test/stage-swipe.js (1/2/6 people, drag + mid-animation shots, chips, frame times), dev/test/stage-pets.js. Numbers: dev/handover/reports/stage-pets.md ROUND 4.
### 33.10 FULL-SCREEN PLACE VIEW · tầng cuối Dư đồ (owner 16/11 18:22Z SWIPE STAGE + 19:15Z HÀNH SỰ STAGE + 19:25Z single hall; review/stage-pets r6) — `kplAway` (jplfs.js) read by the kit shell `k3Phone` / `k3Stage` (jk3.js) + j59
- WHEN: she stands anywhere that is NOT her own residence (`S.place !== "home"`; every hall of her own palace is "home"), consort road, alive, not lãnh cung, not the maid road. STAGE = WHERE SHE IS (owner OD 18/11 ~19:45Z (5), review/stage-here; overwrites the 16/11 19:15Z "Hành sự stage = her room only"): the stage on Hành sự and EVERY tab (phone + iPad) paints `S.place`; her room comes back only at a new day or when she walks home on Dư đồ.
- HOW (no new part): `k3Full()` (jk3) = away AND (one-page screen OR the place page itself, `K3SH.home`). The place PAGE (arrival, "Về <nơi>" button) uses the ONE-PAGE shell of KIT §0 on every screen size: the place painting over the whole page box (header + tab bar stay); the SAME left rail (#krail) and right side column (#kshR) as her room stand on it (33.11), people use the free width between them (33.7b); tap a person = that person's card page (`k3pop`), ✕ = back to the painting; the way back to the map is the first button of the left rail (33.11). Any TAB on a two-page screen (iPad) = the normal spread: stage (her place, normal plaques) | panel; on a one-page screen (Fold) a tab is the panel page and "Về <nơi>" returns to the painting.
- CLOSING ALERT (§77.2, jstagehere.js): rail item `closing` while her place closes at the next khắc or is already closed.
- PEOPLE: kit figure scale (KIT_FIG .79, iPad maxPx 542 → 492 px body at 1180x820; Fold 609 px = .79) on the FIXED SLOT TABLE (33.12): Fold (one page) 2 slots per view, iPad spread 4; swipe + "+N" chips (33.9).
- ROAD: Dư đồ → (palace with ≥ 2 halls: courtyard level, jpm `kpmParts`) → hall → painting; single-hall places (Ngự hoa viên, Thái y viện …) go straight from the Dư đồ tap to the painting (review/single-hall). Any other road into a place (person card, follow, event) also lands on the painting (`goTo` → `k3ShowPlace`); coming home restores the spread.
- Test: `node dev/test/place-fs.js <page> <WxH@dpr> <outdir> [tag]` (room → Dư đồ → courtyard → hall → painting → swipe mid-drag → tap pop-up → cards page → single-hall places → home). Shots + numbers: dev/handover/reports/stage-pets.md ROUND 6.
### 33.11 SIDE COLUMNS ON EVERY SCREEN WITH A PICTURE (owner 16/11 ~19:20Z via s22, OD last line: Dư đồ, courtyard, place, room "đều sẽ có những cái thông tin cột trái và cột phải y chang giống như cái phòng ngủ") — `kitSideHost()` (jk3) + jk3 `k3Stage` + jrail `kitStageRail`
- ONE right column (#kshR: court chips, maid, Ân sủng, danger / xét phẩm) and ONE left rail (#krail: back to the map, Lịch tháng, Mục tiêu chương …) — the same elements, content and width rule (k3RW: 24 % of the PAGE width, 132–172 px; the map leather and the full-screen place painting span the iPad spread = 2 pages, so their page width is half the box: 139 px at 1180x820 on room, map, courtyard and place alike) on: her room stage, the full-screen place painting (33.10), the Dư đồ plan and the courtyard level. `kitSideHost()` = the map leather `.mapv` on the Dư đồ tab, else #stage; both columns are appended to it (no copy, no variant). On the map leather they sit 34 px in (inside the stitch) above the rollers; the plan / courtyard picture and the hall rows use the space between (`.mapv.kside`).
- BACK TO THE MAP = rail item `back` (icon img/kit/ico-map.webp, title "Về Dư đồ" / "Về <cung>"), first in the left rail wherever there is a level to go back to (courtyard → plan; place / hall → plan or its courtyard). It replaces the j38 "‹ Dư đồ" pill (stage bottom-left, over her name) and the courtyard's "‹ Dư đồ" button (over the "Tây phối điện" label, pl-courtyards-r2 review) — both hidden (#tomap stays as the hidden action the rail button clicks, so the jpm courtyard return keeps working).

## 35. LOADING SCREEN · NHẬP CUNG LẦN ĐẦU + kitProgress (review/loading, `dev/build/jload.js` before j84) — awaiting kit review
Owner 11/14: images + sounds are downloaded to the device on first entry with a proper loading screen; afterwards the game runs offline.
- Screen `#kload.modal.kpscene.kload` = the `title` backdrop (`kitBackdrop(el,"title")`, KIT_BD, no new art) + ONE kit scene panel
  (`.dlg.kpanel.kpsc`, `kpHeader("notice","Cung Tường Mộng","Lần đầu nhập cung · thỉnh tranh vẽ, tiếng nhạc về máy")`): right column in
  landscape, bottom in portrait (section 14). Body `.klb`: one `kitProgress` + `.kpnote` lines (one-time note; size of the background set;
  iPad/iPhone Safari: see 35.1). Buttons `.kpopts` only when the line is cut/stalls:
  `.kbtn.alt` "Vào cung ngay" + `.kbtn` "Thỉnh tiếp". Fades out (0.45 s) when the essential set is in; z 9600.
- **kit-progress-run (owner 21/11: «cái khung này cứ đứng ở một chỗ, một cam nhỏ nhỏ đầu rồi nó chớp tại chỗ, mà không phải là chạy tới như nhiều game khác»; replaces the old behaviour)**: the bar is built ONCE and then updated IN PLACE — a live caller calls `kitProgressSet(root, o)` (same elements, only `--v`, the words and the sub line change; the CSS `width` transition and the sheen play), never `root.innerHTML = kitProgress(…)` on a timer (that rebuilt the fill 8×/s: no transition, the whole block blinked). The shown value only moves FORWARD **within one run**: the total grows while pictures are discovered so have / total can fall — a per-`key` max keeps the best (`o.key`, default the label) for the RUNNING bar (the life cover; the first-load cover resets it when its bar is rebuilt = a new load); a SNAPSHOT caller (a panel built on the state of now, `o.fresh:true`, the sổ panel) shows the real value and never inherits an old max (rv FAIL fix: 10/10 then, for a new life, 0/20 reads «mới chút ít», not «đủ cả»), still animating from what it showed before; the HTML form (a kitModal section, e.g. the sổ panel) animates from the value it replaced (`--v0 → --v`, `kprogGrow`). While it waits a soft sheen (`kprogSheen`, 1.7 s loop) runs over the filled part so it never looks frozen even when one picture is slow; reduced motion: no animation. Words stay dlPart (no %). Callers (all three fixed): the life cover `lPaint` (jload, 120 ms loop, key `life`), the first-load cover `paint` (key `core`), the sổ panel `dlPanel` (key `fig`). Guard `dev/test/kit-progress-run.js`.
- `kitProgress({label,have,total,sub})` → `.kprog`: `h4.kpst` label · track `.kprog-t` (12 px, `--line` border, `--k-card2` ground, fill
  lacquer red → amber `#b0402c → #c98a2a` like the kit slider) · number `.kprog-n` in WORDS (mới chút ít / một phần tư / quá nửa / gần đủ / đủ cả, from CTM_WAIT.dlPart; never MB or %) (display font, `--gold`) · sub line `.kprog-s`
  (time left in words: "còn chừng nửa phút / một phút / N phút", "sắp xong"). Never "%" (VANPHONG); MB is the only unit.
- Background indicator = the status icon `dl` (§36.6 / §77.1, no chip): tap → info panel with `kitProgress` + "Tạm ngưng / Thỉnh tiếp" (remembered); still ✓ then gone when done.
- Wording: "thỉnh" (bring in) for downloading; no tải/dữ liệu/phiên bản (VANPHONG §3).
### 35.1 iOS/iPadOS Safari: choose-first notice (review/ios-install-first)
A Home-Screen app on iOS has its own Cache Storage + localStorage, apart from Safari, so a download made in Safari is repeated in the app. In Safari (IOS && !standalone) with <50% of the core set cached and no earlier choice, `jload.js` shows the SAME `#kload` kit panel in mode "ask" and downloads NOTHING: `.kpnote` lines + stacked `.kpopts.ask` buttons: `.kbtn` "Thêm vào màn hình chính (khuyên)" (mode "guide": 3 numbered `.kpnote` steps, Share → "Thêm vào MH chính"; no download) · `.kbtn.alt` "Chơi luôn trên trình duyệt" (stores localStorage flag `ctm-ios-browser`=1, then the normal download with a line that the app will download again) · when a Safari save exists `.kbtn.alt` "Mở sổ mây trước (chưa thỉnh tranh)" (enter with no download and open Thiết lập › Sổ mây at once; notice returns next visit). Installed app, Android, desktop: unchanged. Test: `node dev/test/ios_install_first.js`.

Mechanics (not visual): assets.json (dev/site/assets.py) = [path, sha256/16, bytes, core|fig]; cache `ctm-assets` keyed `path?h=hash`,
never wiped by a build (sw.js prunes only keys no longer in assets.json); app shell in `ctm-shell-<content hash>`; co-op worker and every
other origin bypass the service worker.
Tested 755x1000@2, 1180x820@2, 1366x1024@2, 686x880@2.2, 412x1058@2, 390x844@3, 1024x768@2 (dev/shots/loading/).
### 33.12 FIXED SLOT TABLE · ô cố định (owner 16/11 19:54Z + ~20:04Z "giống như là những cái mảnh ghép ... đặt vô là nó dính vô cái khúc đó luôn"; review/stage-pets-r7) — `KIT_SLOTS` / `kitSlotsN` / `kitSlotFloor` / `kitPetSpot` (jkit.js), read only by j59lay
- ONE table for every view that shows people on a backdrop (her room, the full-screen place painting, lãnh cung, servant road, co-op): `KIT_SLOTS = {page:2, spread:4, band:50, pet:{sx:.3}}`.
- COUNT: `kitSlotsN(stage)` = 4 on the iPad full-screen place painting (spread wide, `kitView().pages===2` + `.kplfs`), else 2 (every one-page view: Fold / Fold cover room and place, iPad room page). Never from art widths or head count.
- X: slot i = centre of equal column i of the free width (`kitSlotCxE`); the BODY centre (core column) stands on it. Y: feet on `kitSlotFloor(stage height)` = stage height − max(3 %, band). Same x / y on every view of a swipe and on every stage of the same view type.
- PET: visible bottom-centre at `kitPetSpot(slot centre, slot width)`, feet on the same floor line (33.8 SPOT).
- ACCEPTED (owner 19:54Z): wide skirts / sleeves / big pets may overlap the neighbour's clothing; bodies never leave their slot centre. Fold cover (412 px) is narrow: neighbours' bodies come close.
- Loading: people of a view are hidden until every picture of the view is measured (`.stage.j59wait`, max 6 s) — never an unplaced pile.
- Test: `node dev/test/stage-slots-fixed.js <page> <WxH@dpr> <outdir> [tag]` (env OLD=<older build page> adds the old-save load).
### 35.3 LIFE GATE · the pictures of THIS life first (owner OD 18/11 ~01:50Z "vô game mà thấy những cái ô nó trống ... bực bội lắm"; review/life-preload) — `dev/build/jload.js`
- FIRST SCREEN = all of it (owner OD 18/11 ~01:35Z: brown chips, empty room, letters "L"/"M" instead of icons, missing stat / top-bar icons): the gate also waits for every CSS background of the visible screen (`lBgs`, checked every 5th round), and ends with one more `render()` + check (icons that wait for a probe). Every small kit UI picture (`img/kit/` except mini-game, night-end, podium, card-flip scenes; +5 MB) is in the `core` set (dev/site/assets.py `ALWAYS`), so a UI icon never waits after the first loading screen. Scan: `node dev/test/first-screen-groups.js <out.json> fold` (first screen of every origin: only people + the queued event picture are outside core).
- `kitLifeSet()` = the pictures one life needs now: her portrait + figure, Hoàng thượng, Thái hậu, her maid, court physician / eunuch, her servants (`S.staff`), the people in the place she stands, consorts whose figure is already chosen (`fid`; never picks one), the room scene (`evArt`), the first 3 queued dialogs (`kitEvArt` of `Q`). Plus every `<img>` inside the viewport that has not finished (Luân hồi wheel, identity card, top-bar chips, Hậu cung page…).
- When a life starts or changes (a new `S` object reaches `render()`: new life, Tiếp tục, Luân hồi, load, co-op join outside a context swap; or `start()` is called) the SAME §35 screen covers the game at once as `#klife.modal.kpscene.kload.klife` (title backdrop, kit scene panel, `kpHeader("notice","Cung Tường Mộng",CTM_WAIT.lifeHead)`, `kitProgress` label `CTM_WAIT.lifeLabel` counted in pictures, `.kpnote` `CTM_WAIT.lifeNote`; panel fades in only after .45 s so a fast gate shows only the backdrop). It closes (0.45 s fade) when every picture is loaded AND decoded and the screen has nothing pending twice in a row; portraits that arrived are marked in j39 `PORK` and the game re-renders once, so chips open on the real portrait, not the fallback face. Slow line: after 6 s sub line `CTM_WAIT.lifeSlow` + `.kbtn.alt` `CTM_WAIT.lifeGo`; after 25 s it opens anyway. z 2147483500 (above the Luân hồi wheel). Never % / MB.
- TITLE PREFETCH (owner 18/11 02:06Z "không lẽ bây giờ tôi cứ bấm từng kiếp"): as soon as the figure manifest is in and no life is open, the life sets of EVERY saved life (slots 1–3, newest first; `kitSaveLifeSet(save)` lends the save's S / rivals to `kitLifeSet` for one synchronous call) come in the background, 4 at a time, before the generic `fig` set. A life whose set is all here never shows the gate (`cached:true` in `KLOAD.lifes`); `start()` (a new life) always shows it until the Luân hồi wheel is full. Hook `KLOAD.prefetch {lives, n, bytes}`.
- During play: after renders (at most every 2.5 s) the life set is re-checked and anything new is fetched at once; the background `fig` pool waits while it is busy (front of the line).
- Dialogs: `showModal` → when a picture inside `#modal .dlg` is still on its way the dialog stays invisible (`#modal.klifewait`: opacity 0, no taps, layout and text kept) until it is in, at most 3 s. (KIT REQUEST 18/11: loading picture slot + small spinner, KIT_REQUESTS.md.)
- Test: `SW=1 node dev/test/life-preload.js <outdir> fold,ipadAir 5` (fresh profile, core set first, then a 5 Mbps line: new life the real way → no empty picture box on any screen; prints the gates with picture count, MB and time). Hook `KLOAD.lifes`, `window.KLIFE`.
### 35.2 NEW BUILD · chip "Có bản mới" + reopen at a natural break (owner 11/15; 03:10Z "đang chơi thì sao") — `dev/site/swreg.js`, inlined by build_site.sh
- sw.js is generated per build (`ctm-shell-<content hash>`); the page registers it (`updateViaCache:"none"`) and calls `registration.update()`
  on open, on every return to the foreground (visibilitychange / pageshow / focus / online) and every 20 min. New worker: skipWaiting →
  clients.claim → `controllerchange` → the build is pending. index.html is network first (`cache:"no-cache"`). `window.CTM_BUILD` = build id.
- RULE: a new build NEVER reloads the page in the middle of play. While playing, the only sign is the status icon `st-upd`
  (§77.1 `kitStatusIcon`, glyph ⟳ placeholder + seal-red dot; no chip on the top bar, nothing next to her rank; hidden while any dialog is open). Tap → card `#kupd.kupd` (bottom centre above `#tabs`, z 9700, ≤420 px):
  `.dlg.kpanel[data-kind=notice]` + `kpHeader("notice","Có bản mới","Mở bản mới ngay?")` + `.kpnote` "Sổ đang chơi giữ nguyên, mở lại đúng chỗ.
  Để sau thì bản mới tự mở khi ngươi sang buổi." + `.kbtn.alt` "Để sau" · `.kbtn` "Mở bản mới".
- The new build opens by itself only at a natural break: (1) after Sang buổi / Sang ngày mới, once the new buổi is written and its dialogs are read
  (not after she has spent a khắc of it); (2) when the app comes back from the background after ≥ 10 min, before she does anything; (3) on the
  title screen or the first-entry loading screen. Never during a mini game / lesson, motion moment, honour podium, week book, page turn, or a
  death screen. Then: save() → `localStorage["ctm-upd-resume"]` {slot} → reload → the new build opens the SAME sổ through the title's own
  "Tiếp tục" (same buổi, khắc, tab, queued dialogs) — no title screen, no Nạp sổ — and shows the line `#kupdline.kupdline` "Đã mở bản mới"
  (top centre under the top bar, kit chip look, 4.5 s, fades).
- Co-op (§ jcoop): never reloads while in a room unless both go. Builds are exchanged over the room's `act` relay
  (`{t:"act",k:"ctm-upd",mode:"ver"|"have"|"ask"|"go"|"later"|"going",v}`; older clients ignore non-invite acts → no Worker change). Either
  side finding a new build → both show the chip. Both reopen at the next buổi both have passed (the room's sync point) or together on request:
  chip → card "Bạn chơi cùng sẽ được hỏi…" → the friend gets the card "Bạn muốn mở bản mới ngay" with "Để sau" · "Cùng mở". Before the reload
  `COOPW.snap()` keeps the local week; after it the lobby's own "Trở lại phòng" rejoins (same code, same seat) and `COOPW.restore()` puts the week
  back. Line meanwhile: "Hai người cùng mở bản mới, đang vào lại phòng". Two different builds never play on: `COOPW.hold` freezes Sang buổi and the
  older side walks through the same save → reload → rejoin at once.
- Wording: "bản mới", "mở bản mới", "Để sau", "Cùng mở"; never "tải lại trang", "phiên bản", "cập nhật" (VANPHONG §3).

## 36. HẬU CUNG = PEOPLE · GIAO TÌNH = ÂN OÁN · THẺ QUAN HỆ 3 CỘT (owner 11/15 04:15Z–06:00Z, review/hau-cung-ui) — `dev/build/jhc.js` (before jload, j84)

### 36.0 Tab groups
`KG` (j79) = hc `["court","rv","men","staff"]` "Hậu cung" · gt `["rel","fac"]` "Giao tình" · mt (unchanged). New tab keys `court`, `men` are buttons
in `#tabs` (hidden members, servant road hides them); every old key and `[data-tab]` link keeps working; a remembered sub-tab that left a group
falls back to the group's first sub-tab. Sub-tab labels (VP TABS): "Hoàng thượng · Thái hậu" (under 640 px panel: "Thánh thượng"), "Phi tần",
"Nam nhân", "Cung nhân"; "Ân oán", "Phe phái". The `.ksub` row is the one segmented control (§20), 4 segments fit at 390 px.
- **court**: pager of Hoàng thượng + Thái hậu, each a `pcard`; group "Việc hôm nay" = the day's Hành sự act cards about them (`cardH` of `deck`,
  same index, same Cần/Tốn/Được/Mất/odds), or one line saying where to meet them. No new mechanics.
- **men**: only men she has met (`k61St(m) ≥ 1`; unnamed = "Người lạ" + "Hỏi người hầu"), strip label = given name (2 words), names unique per
  life (`menUnique`: no repeated last word, no surname doubled). A man's card with no act says why (where he can be met). Men never appear
  in Phi tần, Ân oán or Cung nhân.

### 36.1 PEOPLE-CHIP LIST (owner 04:25Z "2 cột trên dưới chưa theo hàng") — `.kpplist` (+ `.kbk-toc`)
Every list of people chips (Giao tình "Xem quan hệ của", week book "Sổ này ghi", any similar list) is ONE grid:
`repeat(auto-fill, minmax(min(100%, 11.5em), 1fr))`, gap 4 px 8 px. Columns line up across rows; every portrait is the same `mdH(f,"xs")` cell;
the name sits left-aligned beside it and wraps inside its own cell; a list title (`.kppl-h`) spans the full row. No free flex-wrap lists.

### 36.2 THẺ QUAN HỆ 3 CỘT — `kitRel3(face, rank, name, col, middleHTML, rightHTML, extra)` (`.krel3`)
One card per person: LEFT = the kit portrait (`pcPort`, full column 120–170 px, the person-card frame) with rank (small, rank colour) over the
name (never cut); MIDDLE = the two-column relation box (`kitRel2`, §49.1) + small notes + the act card that is possible there (e.g. Đến gặp);
RIGHT = "Đã biết" bullets (`kitKnownList(v)`: intel + notes, newest first, one fact per line, the person's own name dropped, source · date
as a small dim line, max 4, then "Xem thêm N điều ›" → the intel panel). Container ≤ 560 px: the three blocks stack in the same card
(portrait ≤ 180 px centred). Used by Giao tình › Ân oán for "Ngươi", for another consort, for Hoàng thượng and Thái hậu.

### 36.3 RELATION WORDS (owner 11/16 15:00Z, replaces the 11/15 sentence + bar rules) — see §49.1 kitRel2
Relations are TWO columns (that person → me | me → that person), short words Thiện cảm / Oán / Ghen / Sủng, number in its colour, no bars; the longer "Nàng quý ngươi: …" sentences are retired. Labels are `kitGloss` terms: a tap shows one line.

### 36.4 PORTRAIT BOX (owner 05:45Z "khung nhảy", "muốn đặt đâu là đặt") — person card left column
- ONE box for every person and rank: the `.pcp.kit` cell at the full left-column width (left edge = the name/rank's left edge, width = the chips
  column), its top headroom trimmed by ONE constant `KIT_PORT_TRIM` (= .015 of the canvas, the tallest painted top: Thái hậu / Hoàng thượng /
  Hoàng hậu) — never measured per frame (jk3 §14). Switching people never moves or resizes the box (0 px shift).
- **STANDARD FRAME + NO HEADROOM (owner 16/11 "trả về như ban đầu ... chỉ cần dịch hình đi lên sát với cái tên"; review/hc-portrait-revert,
  `dev/build/jhcpor.js`, supersedes the constant trim above and the 15/11 wide-frame ruling):** the person-card portrait cell (`.pc>.pcl>.pcp.kit`) shows
  the SAME standard frame file and proportion (550x1037 canvas, `frame-<x>.webp`) as the header avatar, roster strip, dialogs and every other
  `pcPort` cell. There is NO wider card-only variant (the `-w` files and `frame_wide.py` are retired; nothing requests them). Only the headroom rule
  stays: the cell's top = the higher of the frame's first opaque row (`KIT_FRW[frame][1]`) and its `KIT_CREST` crest top, 4 px under the name
  (name block no longer padded to 2.4em); its bottom = under the tassel (`[2]`). Constants per frame file (no measuring). The box top therefore differs
  between frames with tall and low crests; when it differs between two people the cell and the left column under it slide in 180 ms (FLIP; none with
  reduced motion / Cảnh động off). Kit page sample §36.4.
- Swap: the old portrait (`.kin`) fades out over the new one in 180 ms (`.kpxf`); none with reduced motion / Cảnh động off. The strip's small
  frames are the same pictures, so the next portrait is already loaded.
- Crests (§28.0, `KIT_CREST`): each crest's SOLID base (lowest row ≥ 25 % of its widest row, measured from the webp) sits 6 canvas units BELOW
  the bar line, overlapping the frame top like a crown piece — no gap; consort-1..5 crests are 310–330 wide so they stay clear of the frame's
  own corner ornaments (no pile). New crest = measure its solid base and set `base = solid/h + 6/h`.

### 36.5 WEEK BOOK PERSON PAGE (amends §27, owner 04:30Z + 04:35Z)
Every page about a person, continuation pages included, is the same page: the full-body figure (kitStageFig) fills the page body height on the
left (`.kbk-full`: column `--porf` = 36 % of the inner page width; figure height = body × `--kfr`, men 1, women 1/KIT_FIG.man, same scale on
every page), the text column on the right with the name (continuation: "(tiếp theo)", no small portrait). The text column is measured
(`paginate`, real heights) and continues on the next page only when really full; the figure never shrinks. Phones (page < 440 px): same, the
text sits on a soft paper panel over the figure's edge. The filler "(Đã ghi vào mục Đã biết …)" never becomes a fact in the book.

### 36.6 BACKGROUND DOWNLOAD = STATUS ICON (owner 16/11 16:25Z; overwrites the old chip / strip under the tab bar) — see §77.1
No chip and no reserved strip any more (`body.kload-dock`, `.kloadchip` are gone: the game frame keeps its full height). The "Thỉnh tranh nhân vật" background
download is ONE `kitStatusIcon` ("dl"): a small SQUARE icon in the stage rail (title screen: the same button in a bottom-left dock), a calm bobbing ↓ while it
runs, still ✓ for 5 s when it is finished and then gone, a red dot when it is paused / cut. Tap → kit info panel (progress bar, what is coming, "Tạm ngưng /
Thỉnh tiếp"; ✕ top-right, tap outside, Esc). (Touches jload `paintChip`; the first-load flow of review/cdn-images is untouched.)

### 36.7 NGƯỜI CHẠY VIỆC (owner item 2, was "Sai đi: …")
One line on the cung nữ thân tín card only: `runnerLine()` → "Người chạy việc: <tên>" (tap: what it means) + "Đổi ›" when two or more servants
can go → dialog (PEND `runner`): choose a servant or "Để game tự chọn" (`S.runner`, read by `bestSent`). The Cung nhân header no longer repeats it.

## 37. HOÀNG TỰ = 5 TAB CON · DẢI NGƯỜI + THẺ NGƯỜI (owner 11/15 09:10Z + 09:20Z, review/hoang-tu) — `dev/build/jht.js` (after jhc, before jload/j84)

### 37.0 Tab group
`KG.ht` = `["kid","kvo","kin","hon","qt"]`, bottom button "Hoàng tự" (key `kid` kept, every `[data-tab="kid"]` link works). Sub-tab labels
(long → short when the `.ksub` row or a segment would overflow, measured after render): **Con của ngươi** / Con ngươi · **Kế vị** ·
**Hoàng tự trong cung** / Trong cung · **Hôn sự** · **Quý tộc kén rể · kén dâu** / Quý tộc. Servant road / after death: the extra keys hide,
`tab` falls back to `kid`. The old one-page tab (j15 `kidTabHTML` + j51 kvbox + j53 Thượng thư phòng box + j54 Hôn sự box) is no longer drawn
for a living player; nothing is lost: each fact now sits on a person card.

### 37.1 Every sub-tab = the people strip (`pager`, §36 / j15, `sep` groups) + ONE person card (`pcard`)
- **Con của ngươi** (`kid`): her children, `kidCard` unchanged (portrait by real age: j73 identities a4/a9/a14/a20; Tư chất (word) · Hiền tài
  (number from 6) · Văn · Võ · Đức (bars from 3), Hoàng thượng thương, nết học, Thái tử / kế vị chip; groups = the existing acts: Học hành · Chăm con ·
  Thăm con · Tài nghệ · Hôn sự). See §37.6.
- **Kế vị** (`kvo`): every prince in `kvOrder()`; strip label "N. <tên>"; card rank "Kế vị thứ N · tuổi"; lines Mẹ · Hiền tài · Văn/Võ/Đức ·
  được thương; chips Thái tử / Đích tử / Trưởng tử / Nhà vợ chống lưng; group "Vì sao đứng thứ N" = one short reason per line (`kvReasons`).
  The rule is ONE line on top: `kitGloss("Lập đích, lập trưởng, lập hiền")` (tap = the full rule). Her own son: "Xem con ở mục Con của ngươi".
- **Hoàng tự trong cung** (`kin`): the other mothers' children, strip grouped by mother (sep = "<phẩm> <tên>", j61 masks unknown names);
  left = Mẹ · Tư chất / Hiền tài as the palace's word ("lời đồn", from 6) · Được thương (word); RIGHT pane = group "Cả cung đều biết" (owner 11/15):
  the mother (`kitPersonLine`, stranger rule on her face and name) + `kitRows` Tuổi · Thứ bậc (hoàng tử / công chúa thứ N of the Emperor) ·
  Tước vị (+ kế vị thứ N) · Nuôi dạy (mother + palace; nhũ mẫu when she is dead / in lãnh cung; "nuôi dưới gối" + mẹ đẻ after a takeaway) ·
  Sức khỏe (word) · Học (Thượng thư phòng · thầy) · Khảo hạch · Hôn sự. Never Văn / Võ / Đức / Hiền tài / tư chất / thương as numbers.
  An unmet child adds a note + the mother's "Đến cung nàng thăm" act card.
- **Hôn sự** (`hon`): princesses then princes (hers first) from 14 or promised / married; card = Mẹ, Hôn sự, the spouse row (face + line),
  chip "Nhà chồng / Nhà vợ chống lưng +b" (gloss); her own child's group "Việc hôn sự" = Bàn hôn sự (+ letters / nhờ con nói giúp for a married
  daughter). Header: rule (16 bàn, 18 cưới) + Nhà thông gia chống lưng ngươi + the Bắc Địch envoy line.
- **Quý tộc kén rể · kén dâu** (`qt`): unpromised công tử (`S.hPool`) then quý nữ (`S.qPool`); card = Nhà (con trai/gái <chức>), Phe, Tuổi,
  Sắc · Tài (or "chưa rõ"), "Hỏi được cho: <con>" when a match fits her child; act "Dò hỏi gia thế" (1 khắc, Bạc -5, sure) for a stranger.

### 37.2 Empty tab / sub-tab / panel = ONE kit card (`kitEmpty(title, lines, {art|topic, acts})` → `.kempty`, j79 §21; `htEmpty` = thin alias)
Owner 21/11: "khi không có thông tin thì hiện như «Ta chưa có con»: nhìn cái trang cho nó đỡ trống". Picture LEFT (`o.art` path, else
`kitInfoArt(o.topic||title)`, else neutral tile; narrow container ≤ 420 px: picture over text) + title «Ta chưa có …» / «Chưa có …» (seal colour) +
2–3 hint bullets saying how it fills. Never a blank panel, a lone `<p class="past">` or a run-on paragraph. Used by every empty state: Phe phái hậu cung,
Nam nhân, Hoàng tự (Con của ta / Kế vị / Hoàng tự trong cung / Hôn sự / Kén rể), Thư từ, Mệnh truyện (Chương / Sắc phong / Đã qua), Việc nhờ (3 tabs), Gia tộc,
Phụ tuyến, Triều cục, bảng xếp hạng. Scan: `node dev/test/empty-scan.js`; forced-empty shots: `node dev/test/empty-shots.js`.

### 37.3 Strangers (owner "mọi tên có mặt", "Người lạ")
Công tử / quý nữ are strangers until seen in a marriage talk, met by a daughter, promised / married, or asked about: grey kit silhouette
(`img/kit/unknown-m|f.webp`, frame-unknown via `__kr`), name "Người lạ", house / faction / age shown, Sắc · Tài "chưa rõ".
Names never share a given name or "surname + last word" with anyone in the game (j61 would mask it as "<chức> ???"); a clashing old name is
renamed once (it was only ever shown masked).

### 37.4 Faces
Công tử = `img/FIGURES-congtu.json` (10 identities × a18/a26, gpt-2-6, own manifest — never in the men pool); quý nữ = khuê các dress
`img/FIGURES-kc.json` tier kc, a face nobody else holds in this game (added to `figUsed`), fallback a free consort face. Frames: công tử
frame-man, quý nữ frame-man (role other), strangers frame-unknown.

### 37.5 Marriage talks are acts, not events
`htban` (princes) and `h54ban` (princesses) open with `showOut` + `optLayout:"rows"`: every option is the full act card (Tốn · Được · Mất ·
Kèm + odds ladder), restored the same way from a save (`deserQ`).

### 37.6 TƯ CHẤT vs HIỀN TÀI (owner 11/15, review/hoangtu-tuchat) — j53 + `BAL.tc`
- Birth: `k.tc` tư chất (hidden, fixed) = BAL.tc.base + mom·(Tài, Đức, Tâm cơ, arts of the mother) + emp·(the Emperor's hidden gifts) ± rnd.
  Văn · Võ · Đức start at 0–2 and grow monthly (`tcGrowCore`, every mother): natural growth by age band, the mother at hand (her Tài → Văn,
  Đức → Đức), the Emperor's attention (thương), teacher from 6 (`KT` rates), mother's lessons (Dạy chữ / Dạy lễ nghi from 3), all × `tcMul(tư chất)`.
- Shown: tư chất only as a ladder word (chậm hiểu · tầm thường · khá · thông tuệ · hơn người): her own child once the nhũ mẫu (1 tuổi) or the
  teacher (6 tuổi) has said (noise nzNurse / nzOwn); another mother's child only as "lời đồn" from 6 (noise nzOther). Hiền tài = ktHien(Văn, Võ, Đức),
  shown only from 6 (before: "còn nhỏ, chưa rõ"); her own child: the number; others: word vs the age's norm (kém / dưới / ngang / hơn / vượt chúng bạn).
  Văn · Võ · Đức bars only for her own child from 3.
- Kế vị: under 6 a son ranks only by đích / trưởng / Hoàng thượng thương; lập hiền counts from 6.
- Old saves: `ktInit` turns the old talent into tư chất (BAL.tc.old) and refills age-appropriate Văn · Võ · Đức (old leanings kept), `k.tcv = 1`.

### 37.7 CHILD STRANGER RULE (owner 11/15) — jht + j61
Every child's NAME is public (announced at birth: j61 `k61Pub` / `k61IsKid`); the FACE is the grey child silhouette (`img/kit/unknown-k.webp`,
frame-unknown, via the usual `k61Sil`) until she has met the child: her own children from birth (stage 3), a visit to the mother's palace
(`goTo`), a festival banquet, a khảo hạch they sit together, a child she takes in. Strip, card, Kế vị list, exam rows all follow. j61's
stranger card is not used for children (their card is drawn by jht). Old saves: other mothers' children start unmet once (`S.kmet`).

## 38. EMOTION SEAL (numbered 36 on main before review/hoang-tu restored §36 Hậu cung) · dấu tâm trạng (review/emotion, `dev/build/jemo.js`, owner 11/14) — one layer of `pcPort`
- Every frame drawn by `pcPort` (so every size: tall frame, person card cell, `mdH` xs/sm/default/big strips) carries `img.kemo.kemo-<k>`:
  `img/kit/emo-<k>.webp` (160 px, transparent; owner-approved set: a simple palace lady — soft oval face, wide two-bun chignon, pink flower, gold bộ diêu — with a bold ink expression on a solid colour ground per feeling, thin gold rim; gpt-2-6, Magnific VXUSWLpMMU; pilot sheet dev/shots/emotion/pilot-emo-lady.jpg).
  Keys: vui · binh · buon · gian · so · ghen · lo · dau · muu · an (chưa rõ "?").
- Place: top-left corner of the photo window, over the frame edge (left 8.5 %, top 17.5 %, width 22 % of the canvas); sm 30 %, xs 38 % so it stays ≥ 11 px.
  z-index 4 (above frame and crest), drop shadow. Giận and Đau khổ pulse softly (off with reduced motion).
- No ring/aura around the frame (owner 11/14 late: removed); the seal alone shows the feeling.
- Fog: stranger → nothing; known person, no fresh news → grey "?" seal; her own → always.
- Data only through `window.kitEmotion(p)` → `{k,name,v,why,known}`; tooltip/alt "Tâm trạng: <tên> (<cause>)". Nobody draws another mood icon; no code-reshaped facial expressions (owner 22:50Z): the seal + ring are the only display of feelings.

### 38.4 MOTION + LOOPS + EFFECT SPRITES — `kitEmoSeal` (review/kit-figure-mood, dev/build/jemoseal.js; owner 17/11 ~18:00Z + ~18:30Z (D))
EVERY `img.kemo` (pcPort frames, person cards, lists, mood box, figure-head seal 28.8d) moves; no place draws its own motion.
- SCOPE (owner 19/11 ~06:25Z, canon overwrite): the lean-in happens ONLY from the mood seals beside the figures ON THE STAGE (`lean.stage` = `img.kfseal`, the jfigseal head seals: room stage, Dư đồ, place stages, stage dialogs) and from a seal inside a tab / panel she has opened (`lean.panel` = `#modal,.krbox,.kmov,.dlg`). Every avatar / portrait frame (top-bar pcPort, lists, cards) is ALWAYS A STILL IMAGE: no lean, no idle sway (`kesCan`; `lean.deny` = `header.hud,.hud` never leans). While the big seal leans it PLAYS Foreman C's painted loop when the feeling has one (`KIT_EMOSEAL.animKey` = alias only; a feeling WITHOUT an alias probes `img/kit/emo-anim/<set><key>.webp` by its own key, so a new loop file (vui, binh, …) is picked up by adding the file, no code; aliases: gian/phanno -> `img/kit/emo-anim/gian.webp`, khoc/buon -> `khoc.webp`, animated webp 6 frames x 140 ms, women set only) with its small effect sprite (`img/kit/emo-fx/<ak>.webp`, placed by `KIT_EMOSEAL.fxSpec[ak]` = width / x / y fractions of the big seal + `fall` / `rise` motion; giận smoke at the head corner, khóc tear on the cheek, same grow / shrink envelope) and NO extra CSS shake (`kemo-played`); a feeling without painted frames keeps its CSS motion until Foreman C paints it.
- Timing + size (owner 19/11 ~06:55Z, canon overwrite of ~05:05Z): live only while the seal is on screen (IntersectionObserver -> `kemo-live`), only with Cảnh động on, no reduced-motion, not Gọn (`OPT.fxon===false`), never per place. (1) SMALL = STILL: the picture does not move; at most the idle `rotate` (`KIT_EMOSEAL.idle` = ±0.6deg, period 8–11 s, barely visible, never a shake). (2) LEAN-IN: every `lean.min..max` s (4–8, random per seal) ONE seal leans in: it is lifted onto a fixed overlay clone `img.kemo-big` (z `lean.z`, above every UI, never clipped by a frame, CLAMPED inside the screen with a margin for its own motion = `lean.margin` 9 % of its size + `lean.marginPx` 4 px) and POPS OUT FAST (`lean.grow` .5 s, ease-out, well under 1 s) to ONE relative HEAD FRAME and never bigger (owner 19/11 ~07:10Z, no per-figure measuring): `kesHead` = `lean.head.f` (.2) x the stage's standard figure height (`#stage` dataset `kmlH` x stage scale, the same value the head markers use; .2 = the head of a typical stage figure with her hair, measured once: player figure .208 of its body), the same for every seal on every stage; a seal in a dialog = f x the dialog figure height, else `lean.head.panel` (.1) x the short screen side. The small seal is never shrunk below its own size. The big seal stays inside the screen (clamped, margin `lean.margin` .16). (3) HOLDS big (owner 19/11 ~07:25Z canon overwrite: the hold is 3 s, `lean.holdMin` 3, `lean.loops` 0; n = 3 / d loops, may be a fraction) while the feeling's own motion `kemoL-<m>` loops n times, one loop = `keys[k].d` s (giận 2.0 shake + heat glow · buồn/khóc 3.6 slow droop · vui 2.8 bounce-sway ±9° + glow (owner 19/11 ~07:05Z: a feeling without a painted loop yet must show a CLEARLY visible slow motion of its own, never a near-still seal; amplitudes ~2x since seal-lean-3) · sợ 2.4 tremble · lo 2.8 bob · ghen/hờn 3.0 side glance · mưu 3.0 glint · đau 2.8 wince · bình/an 3.0 nod), n = holdMin / d; (4) SHRINKS BACK SLOWLY (`lean.shrink` 1.8 s) back onto the still seal (the clone is removed, the real seal reappears). A lean is ~5.3 s end to end (grow .5 + hold 3 + shrink 1.8). EVENT DIALOG (owner 19/11 ~07:25Z): the mood seal beside the person's figure in EVERY event / person dialog (`lean.open` = `.ksz3`) leans ONCE each time the dialog opens (`lean.openDelay` .7 s after the seal shows, forced: it ends a running stage lean, which is scheduled again), then stays still (once-flag on the figure column `lean.openKey` = `.kszfig`, built anew at every opening; the `.ksz3` shell can persist between openings); stage / panel seals keep the random lean. 3-PART LOOPS (owner 19/11 ~08:00Z; giận first): a feeling with `KIT_EMOSEAL.three[ak] = {out,back,c0,c1}` (clip seconds; c0 / c1 = the gold circle as a share of the 288 px clip frame at the clip's start+end vs in the loop: giận 1.65 s / 2.64 s, .569 / .833) and the three files `<set><ak>-out.webp`, `<set><ak>.webp`, `<set><ak>-back.webp` (all probed, preloaded by `kesPre`, the lean WAITS until they are known: never starts with a wrong set) plays: `out` while it pops out (grow = out length, CSS envelope `kemo-3p` ease-in-out), the loop for the 3 s hold, `back` while it shrinks (shrink = back length), ending on the still. Geometry: the clone box = head frame / c1 so the loop's circle = the head frame (hands / smoke may leave the circle: the clone is never clipped), start / end scale = c0 vs the still seal so the clip's small circle sits exactly on the small seal. No CSS shake, no fx sprite in this mode (the clips carry both). A missing part = the single loop / CSS motion. Test base: `KIT_EMOSEAL.anim` can be pointed at a `_review` folder before the set goes live (`GIAN3=<base>` in fig-seal.js / seal-lean-video.js). SAY BUBBLES (K-HEAD-SAY x EMO-SEAL LEAN, ROOT-69): the big seal never covers a say bubble (§78.z, `.ksay-lay>.khead.ksay`): no lean starts while a say bubble is open on the speaker's figure or overlaps the planned big box (`kesBubbleRects` / `kesHit`, pad `lean.bubblePad` 10 px; it waits and retries every `lean.bubbleRetry` 900 ms, a dialog seal's once-flag is not consumed), a running lean ends at once when a bubble overlaps it (watcher), and a bubble that is about to show while a lean overlaps it ENDS that lean first (`kitEmoSeal.yield(rect)`, called by jmark `kitSay` / `kitSayAll` before the bubble is made visible; the bubble has priority, the seal leans again later). Test: `MOTION=1 node dev/test/seal-say.js <W>x<H>@dpr <outdir>` (A bubble then forced leans, B lean then bubble, C mood change under a bubble; rAF-sampled overlap frames must be 0).
STAGE SEALS UNDER A MODAL (ROOT-66, owner 19/11 ~07:25Z): while any dialog / sheet / book page is open (`kitDialogOpen()`, `body.kbk-open`; `lean.modalIn` = the seals inside it) a seal outside it never leans and a running lean ends (`kesBlocked`): only the seal beside the person in the dialog leans. No empty disc: a seal whose still is not loaded stays hidden (`kemo-wait`) until it loads. STAGGER: one lean at a time on the whole screen; the next starts only after the previous one fully ended + `lean.gap` s. The lean ends at once when the small seal leaves the screen, moves, is re-rendered, Cảnh động / Gọn is switched, or the window is resized. Envelope = CSS `scale`/`translate` (kemoGrow / kemoShrink), feeling = `transform`/`filter` (separate properties, never fight), no layout, no per-frame JS (Fold perf). Unknown key / act-* key = its feeling, else `defaultMotion` (nod). ALL numbers are data in `KIT_EMOSEAL` (no per-place motion).
- Frame loop (painted by Foreman C): `img/kit/emo-anim/<set><k>.webp` (set = "" / m- / mo-). Probed once; if present the seal plays it on the BIG clone during the lean-in only (swapped in at lean start, clone removed at lean end / leaving the screen); absent = still + CSS motion.
- Effect sprite layer (painted): `img/kit/emo-fx/<k>.webp`, one small fixed `img.kemofx` per LEANING seal on the big clone (`fxSpec`), pointer-events none, removed when the lean ends; absent = no layer. Nothing is drawn in code.
- Keys khoc + hon are in the seal map (names Khóc / Hờn); the mood logic (jemo EMO) decides when a person is in one.
- Tap card (28.8d / jemo emoTipHTML): mood + cause ONLY when she knows it (`kitEmotion().causeKnown`, data-kemoc), else the line "Nguyên do chưa rõ"; the seal itself is shown to anyone who sees the person (never gated by intel).
- ONE source (owner 17/11 ~18:40Z, Sims model ~18:10Z): the seal key comes from `emoSealKey(p,m)` (jemo) = AG-MOODKNOW `sealKeyFor(pid)` (strongest summed feeling among live causes) for a person she sees; unknown mood stays `an`. No pop-over (the old `kitEmoSeal.pop` is removed). khoc -> buon picture and hon -> gian picture (`KIT_EMOSEAL.fb`, `emoSealSrc`) until the real `emo-<set>khoc|hon.webp` exist; jemoseal probes once and swaps.
- "Vẻ mặt" (owner 19:25Z): ONE seal = act > visible intent > dominant feeling from C-AG FEELINGS-18 `faceKeyFor(pid) -> {kind:'act'|'intent'|'feel', key, level, feel?}` (emoSealKey prefers it, then sealKeyFor). Art keys are data (`KIT_EMOSEAL.art` = the keys that have a picture; a key without art shows `KIT_EMOSEAL.fb[key]` else the calm `binh` seal, then swaps to the real `emo-<set><key>.webp` when a probe finds it); unknown keys get `defaultMotion`. Tap card top lines (`kitFaceRows`, jemocause.js): "Đang: <act>" (act only) · "Cảm xúc: <name> (<bậc>)"; NO intent face (owner 20:15Z: no "Vẻ mặt" line, intents never draw the seal), then the cause list; names from KIT_EMOLABEL -> EMO -> KIT_FACENAME.
- r4 (reviewer r3 FAIL 1-5): causes are grouped by DISPLAY label (ghen + chanh = one "Chạnh lòng" group); tones are DATA (`KIT_EMOTONE` table, `kitEmoTone(k)`; unknown key = neutral; no inline kind list in jevb/jemo); the seal name is ONE (`kitSealName(p,m)`: seal key name, else its feeling, else "tâm tư") for the header sub line, badge alt, data-kemo; bold driver = `kitFaceDrive` = faceKeyFor().feel.key first, then feel key, sealKeyFor, legacy mood; `kitFaceName(k)` returns "" for an unnamed key (rows hidden, never the raw key; headings use `kitEmoWord` = "tâm tư").
- r6 (FEELINGS-18 final API, review/feelings-18-r1): the seal reads `faceKeyFor(pid)` ONLY (jfeel): `{kind:'act'|'feel', key ("act-<feeling>" for an act), level, name, fb, set, art, lines}`. `art` = the painting to draw (CDN-resolved, feelArt chain), `fb` = next fallback (onerror), `name` = the word shown (seal alt, data-kemo, header sub line, = the card). Card top lines = `f.lines` ("Đang: <act>" · "Cảm xúc: <name> (<bậc>)"). NO intent anywhere (owner 20:15Z). The seal is shown only for a KNOWN person (`kitEmotion(p)` non-null, `kitIsKnown`); a stranger gets no seal; faceKeyFor itself is NOT gated. Tones: `kitEmoTone` reads BAL.feel.sg (feelGood/feelBad), `KIT_EMOTONE` only for legacy keys. `kitFaceDrive` strips "act-". jemoseal motion: key (or its feeling key) -> `KIT_EMOSEAL.keys`, else `defaultMotion`; a still that is a fallback is replaced by its own painting once it exists (probe)
- Tap list (38.5, `kitMoodCauseRows(L, drive)` in jemocause.js; owner ~18:25Z): rows grouped by feeling kind; the kind driving the seal FIRST with its rows in bold; the other kinds by summed strength high -> low; inside a kind soonest-to-fade first; every row "còn N khắc"; unknown cause "Nguyên do chưa rõ". Label table `KIT_EMOLABEL` (ghen = "Chạnh lòng", owner 17/11 ~18:38Z; key and Ghen score unchanged). Wired into the mood box rows (jevb emoBox) when review/ag-moodknow lands (it supplies mkCauses/emoCauses with `left`).
- Test: `MOTION=1 [FAKE=1] [SECS=36] node dev/test/fig-seal.js <W>x<H>@dpr <outdir>` (FAKE routes a loop + effect for gian to the still to prove the plumbing). MOTION prints `lean` = idle rotate range + half-period, lean count / rest gap (4–8 s) / duration / peak scale / min start gap between any two seals (stagger), and writes strip frames `strip-<key>-<0idle|f1..f4>-<W>x<H>.png` for gian, buon, vui (montage: `python3 dev/test/seal-strip.py <outdir> <W>x<H>`).

## 42. CLOSE-BUGS RULES (owner 15/11 16:40Z–17:24Z, review/close-bugs) — `dev/build/jclose.js` (after jaudit, before j84)
_(Renumbered by reviewer r6: this section was §40 on review/close-bugs; main already has §39 kitSeal, §40 APP ICON, §41 kitMeMark. Old refs "KIT §40.x" = §42.x.)_
Each rule closes a whole class; the scans that prove it live in `dev/test/cb-*.{js,py}` (before/after tables in `dev/PROGRESS_close_bugs.md`).
### 42.1 CHẠM — no browser tap paint
- `-webkit-tap-highlight-color: transparent` on every element of the game (the Android/Chrome default is a translucent BLUE RECTANGLE over the
  whole tappable box — the owner saw it over her figure on the stage). The only press feedback is the kit's (`CHUYỂN ĐỘNG` :active scale +
  brightness; a `filter` follows the picture's own pixels, so it follows the figure's shape). A figure / picture never shows a focus outline
  from a tap; keyboard `:focus-visible` rings stay on buttons. Never add a rectangular background / box-shadow / outline on a figure's press.
### 42.2 `kitNotice(spec)` — THE ONE NOTICE SYSTEM: top-bar «!» box + top chip + «Tin báo» panel (owner OD 18/11 ~22:10Z, review/stage-here r4) — `dev/build/jnotice.js` (after jstagehere)
Owner: "Bất kỳ một cái thông báo nào của cái game đều phải vô cái ô này hết ... khi mà cái ô này nó sáng lên, đồng thời là cái thanh này nó cũng hiện ra ... chỉ hiện ra chỉ có khoảng 5 giây hay là 10 giây" · "phải nằm ở trên chứ không phải nằm ở dưới" · "bấm vô để nó hiện ra một cái khung nhỏ ... một cái tranh đại diện ... và cái thông tin kế bên".
- ONE ENTRY POINT: `kitNotice({id, line, text, pic, kind, sticky, go, goLabel, again})` or `kitNotice("one line")`. `line` = the SHORT chip line; `text` = the full panel text (default = line); `pic` = representative picture (default = the kit «Tin báo» info picture); same `id` = the same notice (updated, chip again only when its line changed or `again`); `sticky` = the box stays lit while it exists (closing alert); `go`/`goLabel` = one real action row in the panel. Also `kitNoticeDrop(id | "prefix*")`, `kitNoticeSeen(id?)`, `kitNoticeList()`, `kitNoticeOpen(id?)`, `kitNoticeBox()`. List in memory, newest first, `BAL.noticeMax` kept.
- BOX `#kntbox` = the §77 square kit button (32 px, radius 8, card paper, gold hairline) holding the §78 yellow round «!» disc `.khap`, a CHILD of the fixed top bar `header.hud` at its first free spot (top-right first, nothing of the bar under it; stays put while that spot is free). Unread → `kbusy` blink + `kbadge` seal-red dot; sticky → blink; all read → calm dim «!»; empty list → no box. Tap → the panel listing the unread notices (else the last 6).
- CHIP `#kntchip.ktbt` = ONE line, the `.ktbt` pill (card paper, gold trim, 2/12 px padding, .8rem) with a 16 px `.khap` «!» in front, `white-space:nowrap`. Up for `BAL.entryToastMs` (5 s) then fades; tap → the panel of that notice. Place (one finder, TOP ONLY, never at the bottom): (a) a fully free slot of the top bar; (b) a quiet part of the top bar — over no word, number, picture or button of it, only empty bar tracks (Fold: over the mood slider track), lowest row first; (c) a band of two chip heights just under the top bar over nothing kept (`kitToastKeepRects`: people whole box, cards / tappable rows whole box, names, chips, map spots, the map title plaque `.maptools`); (d) straddling the bar's lower edge over no bar word and nothing kept. None → no chip: the lit box carries it. Hidden while a dialog / the book is open (shown when it closes); re-checked every 300 ms while up.
- PANEL «Tin báo» = `kitPanel({kind:"notice"})` (seal BÁO, ✕ / outside / Esc close): the kit picture slot shows the notice's own picture, the full text beside it as kit fact rows; one option row only when the notice has a real action (`go`, e.g. Tai mắt news «Để ta xem» → Dư đồ). Opening marks the listed notices seen.
- ROUTED (scan `python3 dev/test/notice-scan.py [ref]`): `kitLine` (every caller; the old bottom pill `#kupdline` is gone), `kitLineToast` (place-entry lines, jplst), the closing alert (§77.2), Tai mắt news (jagknow `tinBaoOn`; line «<người> báo: <nơi> có chuyện», picture = the place, action «Để ta xem»), the flip note (j93 `kitFlipNote`), the «CẤM» place line (j42 `srvToast`); errands («cung nữ về báo tin») call `kitNotice` directly. NOT notices (own rulings, unchanged): the act result card `#rtoast` (jksize: routine acts keep the small result card), the tutorial coach `kitTip`, the co-op clock `#kctm/#kctmf`. Nobody draws another toast, pill, strip or bar.
- `kitToastKeepRects` / `kitToastCol` (jclose) stay the shared keep-clear list; `kitToastPlace` / `kitToastCollapse` are no longer used by notices (no stage-rail «!» item).
- Sample: kit page §42.2 (box lit / calm, chip, button that opens the panel). Test: `DEV=fold|ipadAir node dev/test/stage-here.js` (faults `toast-cover`: chip-low / hud-word / kept / person / card; `collapse-no-box`; `float-toast` = any visible `#kupdline`, `#ktbtoast`, floating `.kmnote`, `body > [role=status]` other than the chip), `node dev/test/stage-stay.js` (the closing notice text names the stay odds).

### 42.3 THỜI TIẾT THEO BUỔI — `WX_BUOI`
- The week rolls ONE weather (`S.wx.b`, its flag f drives every rule); the WORDS shown follow the buổi (`S.wx.n = wxAt(S.wx.b, buổi)[0]`, icon
  `[1]`). Night never: nắng, ve kêu, "sớm". Day never: trăng, sao, đom đóm, đêm, dế. "sớm" only in the morning. Every new weather row gives all
  four buổi. Rules that read the weather use `S.wx.b` / the flag (kitWxEffects reads the week). Weather never adds walking khắc (owner 06:40Z).
### 42.4 ONE NEED PER STAT on an act card
- The Cần row names each stat once, with the REAL gate: a card costing Sức c > 5 needs "Sức trên c"; otherwise "Sức ≥5"; rest cards and 1-khắc
  acts need no Sức. The gate's reason uses the same words ("cần Sức trên 20 (có 17)") so the card shows one line, never "Sức ≥5" beside it.
### 42.5 BÁI KIẾN ALSO FROM INSIDE
- Inside a palace whose chủ vị outranks her and is home, without having greeted this buổi (walked in with the last khắc, the buổi turned while
  she was there): tapping that palace on Dư đồ opens the place card with "Bái kiến <phẩm>" (1 khắc) or the reason ("cần 1 khắc, còn 0"), and
  "Thôi" (she stays; not asked again this buổi). The new buổi's visit line says so. A walk that arrives next buổi says the greeting comes on arrival.
### 42.6 EVENT OPTIONS SHOW ONLY REAL COSTS — no "Tốn: không" row (see 28.6). One implementation: `kitHideOut` (jk2b) drops the empty Tốn row; the jclose wrapper was removed (reviewer opt-render r7).
### 42.7 FESTIVAL CONTEST TITLES — `FT7` (j71)
- Every contest variant has its own title naming what it really asks for: "<hội> · Lời mời: <Thi …>", "<hội> · <Thi …>" (day card). The
  festival's bracketed theme ("Hội Phượng (thi cưỡi ngựa bắn cung)") is dropped from titles (`fShort7`), so a contest that is not the theme
  says why it is there ("Hội Phượng · Lời mời: Thi thêu cờ phướn cho đội thắng"). A new variant without an FT7 title fails dev/test/cb-fest.js.

## 43. kitActCompact — act cards in a narrow pane (owner 11/15; from review/kit-fig2 KIT §39, cherry-picked by tabs-kit r7) — `dev/build/jk4.js`
_(Renumbered by reviewer tabs-kit-r7: was §42 on review/tabs-kit; main's close-bugs took §42. Old refs "KIT §42 kitActCompact" = §43.)_
Copied unchanged from review/kit-fig2 3e212597e (jk4 "KIT 39 · kitActCompact", `kitActCompactOn` + its CSS) because tabs-kit needs it before
kit-fig2 is merged; when kit-fig2 merges, keep ONE copy (kit-fig2's text is the reference; number it §43). Summary: inside an inline-size
container `kpane` under 640 px every act card is compact: the act's OWN picture (ACTS.json key) as an 84 px square thumbnail (72 px under 420 px)
left, title + odds on one line, one-line description, Cần/Tốn/Được chips; no own picture → no thumbnail (`.kanoart`), never a category / skill
picture as stand-in. Containers: person card `.pc > .pcr` (kit-fig2) and — tabs-kit r7 extension — any `.kpanec` (skill-card act cells,
Việc nhờ act area, Nợ ân rows). `kitActCompactOn(root)` runs after `render()` and (jtabs) after `renderPanel()`.
- (review/opt-pics, owner override 15/11) the small card's picture is a 3:4 PORTRAIT RECTANGLE, 84x112 (72x96 in a pane under 420 px), never a
  square crop; the rule set is ONE string `kitCompactCSS(B,w,h)` (jk4), also used by every dialog option card (§6.2). The big Hành sự card is untouched.
- r8 (owner 11/15 14:30Z "no group images"): the rule is now EVERY act card, not only panes: `kitActArt` returns no `act-cat-*` src and
  `kpActArt` marks a card without its own picture `.kanoart` (no picture slot, text full width) — Hành sự deck, person cards, Ân oán.
- Fix that came with it (main bug): jk3's sort helper was also named `kitActKey(b)` and, in the one concatenated script, replaced j79's
  `kitActKey(name)` (ACTS.json lookup) — every name lookup threw, so acts matched by prefix / wildcard lost their own picture across the game
  (j79 kitActArt wrapper, j87 news pictures). jk3's helper is now `kitActSortKey`.

### 43.0a TITLE ROW NEVER SQUEEZES THE NAME (night-final #6, 17/11) — `kitCompactCSS` in `dev/build/jk4.js`
- Every compact option card (`button.ka.kart.kopt`) title row `.kat`: the name `.kan` keeps at least `min(6.5em,100%)`; when name + chips (odds ladder `.kodds`, risk chip) do not fit on one line, the chips WRAP to the next line, right-aligned (`.kodds{margin-left:auto}`). Was `nowrap` + `min-width:0`: the name shrank to one letter and the chips covered it (Kính sự phòng flip choice, Fold + iPad). Cards whose row fits look the same as before.

### 43.1 SMALL ACT CARD: PORTRAIT PICTURE, TAP = DETAIL, ⓘ MARK (owner 16/11, review/actcard-small; `dev/build/jk4.js`)
The big Hành sự card is unchanged. The small card (§43 compact form) shows the act picture as a 3:4 PORTRAIT rectangle (84x112 px; 72x96 under 420 px), no longer a square.
Tapping the picture, or the info mark ⓘ (`span.kainfo.ktinfo` = the §46 kit info glyph, no private style; a gold "!" means warning in the kit; shown only on a small card WITHOUT an odds label `.kodm`), calls `kitActZoom(btn)` = ONE kit pop-up
`kitModal({kind:"info"})` (section 8 frame, `.kbtn` "Đã rõ"): the act picture in `kitArtFrame` (the 3:4 kit picture frame, 28.19), the odds label, the full description,
the Cần/Tốn/Được rows, and the "why" text of `kitWhyHtml` when there is an odds label. Tapping the odds label itself still opens the why popover (jwhy). No private overlay frame.
Option cards (`.kopt`) and the big Hành sự card are not touched. Sample: kit page §43.1.

## 45. PANE = FIXED BAR + SCROLL BODY (owner 11/15, review/tabs-kit · `dev/build/jpane.js`)
**45.1 A face strip is never half under the pane bar (review/small-bugs-3; 844x390 Hậu cung › Phi tần showed the palace labels "Càn Ninh cung…"
cut off above the frames).** `kitPcSize` fit (jk2b) scrolls a newly opened person card flush under the sub-tab bar; when the scroll cannot carry the
`.pstrip` fully under the bar, the strip is shown whole (labels included). The fit also re-runs after a re-render of the same person until the player
scrolls herself (`__kpcUser`). Test `dev/test/small-bugs-3.js` strip.
**45.2 The sticky edge is the PANE BAR's bottom + its gap (owner 16/11 "Mất chữ", ref dev/handover/refs/owner-roster-cut.jpg; review/hc-portrait-r1).**
Since §45 the sub-tabs sit inside `.kpbar` (+ 6 px bottom padding, 1 px hair line, 10 px kit gap). `kitPcSize` still measured the `.ksub` row's bottom,
so on narrow portrait screens (755x1000, 820x1180, Fold) the fit scrolled every face strip 17 px under the bar: palace labels ("Khải Tường cung",
"Chung Tú cung"…) cut in half under Chí tôn / Phi tần / Nam nhân / Cung nhân. Now the card's room and the fit's edge are the bar's bottom + its
margin-bottom (falls back to `.ksub` when no bar). Before → after (scan rt/scan.js, every strip tab, picks first + second-last person):
755x1000 and 820x1180: panel scroll 17 → 0, strip under the bar 7 px → 0, clipped labels 4–6 per tab (57 total at 820x1180) → 0; 1000x755,
1180x820, 1366x1024 unchanged (0); 844x390 the strip is carried fully under the bar as before (never half).
- Every tab pane is one layout: the **pane bar** (`.kpbar`) holds the page's sub-tabs (`.ksub`) and its first filter row (`.kcattabs`, Hành sự categories, Tư trang item filters, the jtabs sub-tabs); everything else is the list.
- The bar sits flush at the top of the pane, directly under the header frame (the pane's own border is the kit gap), full width, opaque, no shadow; it never moves. The list scrolls below it and is cut off at the bar's bottom edge; nothing shows above or behind the bar (pane top padding is 0 while a bar is present). `scroll-padding-top` = bar height, so anchored scrolling stops below it.
- Tabs keep drawing their own rows where they always did; `kitPane()` (after every panel render, on panel child changes and on resize) moves them into the bar. k3CatTabs finds its row by `data-g`, kgSub finds `.ksub` inside the bar. No other code may make a row sticky.
- Exception `.kpinline` (kit-fig2 r8): a picker that lives INSIDE the list and owns its own tab row (Ân oán "Xem quan hệ của" X / "với" Y,
  §49.2b) wraps tab row + strip in `.kpinline`; `kitPane()` never moves a row inside `.kpinline` into the bar, and that row is static (never
  sticky, no shadow, jpane CSS). The pane's own sub-tabs (Hậu cung · Ân oán …) still go to the bar as usual. Use it only for such pickers.
- Test: `dev/test/pane-bar.js` (5 sizes, every tab, at rest and scrolled, ±1 px: bar flush, does not move, nothing above, nothing over its edge, opaque, full width; pane ends at the bottom nav).

## 46. KIT TABS: SUB-TABS, CHECK ROWS, INFO GLOSS (owner 11/15, review/tabs-kit · `dev/build/jtabs.js`)
- **Chip-row overflow = edge fade, never a scrollbar (C39, owner 15/11, `jk3.js` `kitTabFade`)**: every sideways chip/tab row (`.pctabs .kcattabs .ksub .ksubs .kmc-tabs .kchips .chips .relsel .hud2 .j59strip`) has NO scrollbar track or thumb (one kit rule: `scrollbar-width:none` + `::-webkit-scrollbar`). A 22 px mask fade on the side that has more chips (`.kfl` left, `.kfr` right; set by `kitTabFade` on scroll, resize and, throttled to 150 ms, DOM change) tells the player the row scrolls; the fade never reaches the chips fully inside the row. No sliding `.kftl` line on chip rows (only the bottom nav `#tabs` has it, `kfTabsClean` removes strays): the selected chip is marked by its own gold fill. New chip rows just use the kit row classes; scan: `node dev/test/tab-underline-scan.js <url>`.
- **Over-full sub-tab bar (review/kit-subtabs-overflow, K-Q2-1, 18/11)**: a `kitSubTabs` bar (`.pctabs.kcattabs.ktsub`) NEVER scrolls sideways (no edge fade, no clipped tab) and the trailing ⓘ (`.pctinfo`) never covers a tab. When the tabs do not fit one line they WRAP to a 2nd row at the SAME fixed tab size (law 10: one size per tier, nothing shrinks); the ⓘ keeps the right end of the last row (static, not sticky). One CSS rule in `jtabs.js` (`html body :is(#panel,#kitpage) .kcattabs.ktsub{flex-wrap:wrap}`) = every kitSubTabs bar in the game, every device (Tài nghệ, Mệnh truyện incl. the Q2 6th tab «Phụ tuyến», Việc nhờ, Ân oán pickers, outside Người nhà/Ra phố). Kit sample §46.1. Scan + table: `dev/test/subtabs-overflow.js`. The other chip rows (`.kcattabs` filters, Tư trang kinds) keep their own sideways scroll rule.
- **Sub-tabs** `kitSubTabs(key,[{k,label,doable,total|n}])`: the same `.pctabs.kcattabs` row as Hành sự, count "làm được/tổng"; it goes into the pane bar (§45); the choice is remembered per tab; the first visit opens the first group with something she can do. No long single scroll of mixed cards.
- Heads, skill cards, chapter / sắc phong heads and empty states = §21 `kitSkillCard` / `kitEmpty`; pictures = §28.19 thumb; act cards = plain `pbtn` in `.kpanec` cells (§43). A lone act card takes the whole row (auto-fit grid).
- **Rules text** never as a paragraph on the page: `kitInfo(term)` = "ⓘ term" gloss (KIT_GLOSS) that opens on tap.
- **Check rows** `kitChecks([[ok,text]])`: ✓ green / ✗ red chip + text, unmet first.
- **Person rows**: `kitPersonLine(p,{sub})` (portrait + name + what is owed / what is known) inside `.ktprow`, with the act for that person beside it.
- Tài nghệ = Tứ đức · Cầm kỳ thi họa · Vũ · Y · Nữ công · Tác phẩm; Mệnh truyện = Chương này · Sắc phong · Đã qua; Việc nhờ = Đang làm · Nợ ân · Trong cung. Header numbers are `kchip`s.
- Tác phẩm (j83 works) = one §21 card per art that makes works: what it makes as `kchip`s, "phẩm +bậc", the quality ladder line, and "Tự luyện, làm tác phẩm" (bậc 5) as an act card; the rules sit behind `ⓘ Tác phẩm`. Việc nhờ "Đang làm" keeps the kit person card pager (`pcard`, as Hậu cung).
- Test: `dev/test/tabs-kit-shots.js` (5 sizes, every sub-tab: 0 errors, no horizontal overflow, no clipped card, no Thôi/Lui, sub-tabs in the pane bar).

## 47. TRANG MẪU KIT · the kit sample page (luật KIT TRƯỚC, owner 11/15 16:50Z; tabs-kit r7) — `dev/build/jkitpage.js`
Open the game with `#kit` at the end of the address (or `kitSamplePage()` in the console): a full-screen page draws every registered kit part
with the REAL kit functions at the current screen size; ✕ closes. Every new / changed kit part pushes its sample in the same commit as its
KIT.md section: `KIT_SAMPLES.push({id:"§nn", title, html:()=>…})`. Now: §28.19 wide/tall/thumb, §21 card (skill with acts, chapter, empty),
§46 kitChecks + kitInfo, §43 compact act in a `.kpanec`, §48 kitNameRank, §49.1 kitRel2, §53 kitChip tones + odds meter + an event option in cost mode + kitResultSeal + kitKemRow, §52 kitRelTable + kitRelDelta, §57 kitNumDelta. Test: `node dev/test/kit-page.js <url> [outdir] [sizes]` (every sample renders, no
error, no horizontal overflow, 0 page errors).

_(Numbers: review/kit-fig2 used 37-40, then 42-45; main took 37-43 and tabs-kit 45-47, so kitNameRank = §48, Ân oán = §49, kitEventDp = §50; kitActCompact is main's §43 (one copy, the tabs-kit superset).)_
## 48. NAME + RANK ABOVE THE PICTURE · `kitNameRank` (owner 11/15: "people read top to bottom") — `dev/build/jk4.js`
ONE rule for every person label: the rank on one small line (rank colour), the name under it, THEN the portrait / figure — never under it.
`kitNameRank(rank, name, col, me, small)` → `.knr` (`.knr-r` small rank line, `.knr-n` name); `small` = true adds `.knr-s` (rank .66rem / name .72rem, the smallest kit sizes; compact picker strips, §49.2c) — never a per-place font override. Used by:
- every person dialog (32.5 / 32.7, the shop seller too): the chip `.kpsn.knr` stands at the TOP of the figure column, centred over its
  person; two chips that touch → the second goes to a second line, still above the heads (kitDpFit lays the people out again under it);
- Ân oán (§49): both side blocks;
- person cards (Hậu cung · Phi tần / Thánh thượng, Cung nhân = the servant card): wide card = rank, name, then the portrait; narrow card
  (`.kpnar`) = the name block is a full row above the portrait + bars (was beside the portrait).
NOT moved (reported to the coordinator with shots): stage figures (j59) — their name tags stay at the feet: on the stage the heads reach
the top edge (KIT 33: figures fill the stage), where the scene title (top left) and the chip column (top right, `#kshR`) already sit;
a label over the head would cover either. Pets: no pet card exists on main yet.
Test: `node dev/test/name-rank.js <url> <outdir> <tag> [sizes]` + `dev/test/fig-fill.js` (chip bottom ≤ painted top).

**48.1h THE ONE RULE: glow on paintings, plain on paper (owner 11/16 13:50Z + 13:55Z; 15/11 22:25Z)**: on paper / frame backgrounds (pop-up captions, cards, lists, name boxes, Tuần lục, dialogs) rank text = the vivid tone as PLAIN text, no stroke, no shadow, no glow; on paintings everybody glows (48.1d/e). The stage tag and the 3-line title tag (§82) use this one rule. Legibility on paper = tone floor ≥ 3.6:1 (`kitToneOf`).

### 48.6 TWO FORMS ONLY · `kitRankName(who, o)` — `dev/build/jk4.js` (owner 17/11 ~16:20Z, review/kit-rank-name; OD "RANK + NAME KIT RULE")
Owner: "hiện đang thấy hai chữ quý phi" — the kit showed rank + name in many ways, and a person card printed the rank 3 times (header tag, name line, frame pendant). Now EXACTLY TWO FORMS:
- **STACKED** (default) = `[title plate] / rank / name`, top to bottom: every avatar, portrait frame caption, figure-foot label, person card header, dialog column tag. Markup `.knr` (+ `.kt3` with the title plate); built by `kitNameRank(rank,name,col,me,small)`.
- **ONE LINE** (`o.form:"line"`) = `rank name`: ONLY result lines, logs, toasts and Tuần lục / week-book prose. Markup `b.kname` (+ `.krl` when built from parts); built by `kitName(p)`.
- `kitRankName(person | null, {form, parts:{rank,name,col,me,title}, col, me, small})` is the one entry that picks the form; kitName / kitNameRank stay as the two implementations (do not call a third way).
- **The rank is never printed twice**: `kitDedupRank(rank,name)` drops the rank/title words a plain-text name already starts with ("Hoàng hậu Lý Ngưng Sương" under "Hoàng hậu" → "Lý Ngưng Sương"; only multi-word ranks or title words, so the surnames Tần / Phi are safe). A person whose name IS the title (Hoàng thượng, Thái hậu) prints it once.
- **Person card header** (`pcHead`, j15): rank line (`.pcrk`) over the bare name (`.pcname`, `data-krn-skip`); the frame pendant `.klab` is hidden inside `.pc>.pcl` (the header above it already names the frame). The rank-name paint (jaudit `kitRankNamePaint`, KRN_SKIP now `.knr .krl .pcname .pcrk`) never re-adds a title there; its sibling-label check no longer ignores a `.pcrk` that carries the small rank icon (`img.ic`) — that was the root of "Hoàng hậu / Hoàng hậu Lý…".
- Scan: `node dev/measure/rank-name-scan.js <url> <W>x<H> --table` (every tab + person dialogs + book: a rank printed twice in one card/frame = FAIL; stacked form inside prose / line form outside result lines = flagged); `sh dev/measure/rank-name-sites.sh` (every source site by form + the home-made `rkName(..) name` concatenations still to move). Kit page sample §48.6.

### 48.1 RANK TITLE · `kitRankTone` + `.krt` / `.krn` (owner, ref. shot of another game: a title floating above the name) — `dev/build/jk4.js`
The rank / role line above every name is a TITLE, the name under it is plain ink. One look everywhere a rank sits over a name:
- TITLE: serif `var(--display)` (Noto Serif) bold, letter-spacing .03em, in the rank's OWN colour (`--rt` = `kitRankTone(title)`), VIVID
  (owner 11/16: jewel tones derived by `kitToneOf`, ≥ 3.6:1 on parchment #fbf3e2, plain text, no edge), no chip, no background.
- FRAMED UI (dialogs incl. kitEventDp captions, person cards, Tuần lục, lists, podium plates, kit page): PLAIN text in the vivid tone — no glow,
  no outline. On a dark `.modal.night` panel the tone is lightened (55 % + white), still plain.
- ON A PAINTING (stage name tags `.j59t` over the scene, captions over a picture `.kesov`, the kit sample's scene row `.krs`): the tone
  lightened (72 % + white) + a thin dark outline (8 hairline text-shadows `--krt-ol` #1c100a) + a soft glow of the same colour (3 px + 8 px).
- NAME: `--krt-ink` #2a1a12, bold, no colour; on a painting it keeps the paper halo of scene words (KIT 33.5); on `.modal.night` parchment #f3e6cf.
- Sizes: title .84rem (a title that IS the name, e.g. "Hoàng thượng", `.j59only`: .92rem); name as before (stage 1rem, knr .98rem).
  Tuần lục heading: title .62em of the 1.4em heading, on its own line above the name.
`kitRankTone(title, col)` → colour = `kitToneOf(base)` where the base comes from the ONE palette in §1.3/§1.4 (`KIT_RT` maps title words to a j1 base: Đáp ứng..Hoàng hậu → `RCOL`, Phế phi/lãnh cung → `RCOL_COLD`, maids → `MRCOL`, eunuchs → `ERCOL`, Thái hậu / Hoàng thượng / Thái y / Hoàng tử / Công chúa / Người lạ / officials / guards / ma ma → `KIT_ROLE`). No hexes live here any more; on `.modal.night` the tone is lightened in oklch (64 % + white) so it stays vivid.

Men are never pink/purple. Unknown title → the caller's colour darkened (80 % + black).
**48.1d/e GLOW ON PAINTINGS ONLY (owner 11/16 13:55Z, option 1; replaces the 15/11 "only her tag glows" and "paper halo" rules)**: on a PAINTED background (stage name tags `.tok .tag` and `#j59metag`, `.kesov` captions over an event picture, the kit scene row `.krs`, figure / scroll art) the NAME, RANK and TITLE of EVERY person glow so they read clearly: RANK line = its rank tone (`--rt`) with, right around the letters, a LIGHT tint of its own rank colour (stacked 3/3/5/5/8 px, 14–30 % colour + white, over a 1 px paper rim; NO dark hairline, it darkens the halo behind the letters) and the saturated rank colour further out as the neon (11 px; her tag +16 px) — letter vs halo ≥ 3:1, measured by `dev/test/stage-tag-contrast.py` (glow-aware: letters made transparent, mask of the letters); NAME line = ink + the light-gold glow (1/3/7/11 px, gold); TITLE plate (`kitTitlePlate`, §82, rule in jtitle.js) = glow in its tier colour. HER tag glows brighter than the others: rank glow +14 px +20 px layers, name = the 48.1b strong gold glow (`.kmy`). Co-op: each player's own S is "her". Scan `dev/test/stage-tag-contrast.js` guards legibility on dark carpets / night scenes.
**Stage side cards** (`.ksh .k3c`, the people column beside the stage): a person's title + name stack as rank line over the name (title
`.kti` display:block), so a long "Cung nữ thân tín Hồng Ngọc" never widens the column (755) or squeezes the card (844).
**48.1c NO BOX (owner 15/11 ~20:40Z)**: person-dialog captions (kitEventDp `.kdpcap`, 32.7 `.kesf>.kpsn`, the event-stage overlay
`.kesov>.kpsn`) have no box / frame / plate: rank + name sit straight on the dialog background (title colour + outline as above, name plain
ink, hers gold-glow). Over a picture (`.kesov`) the name keeps the paper halo of scene words for readability.
**48.1b HER OWN NAME (owner 15/11 ~20:10Z)**: the name of HER character (the local player's `S` only; in co-op the friend's name is
NOT marked) = near-black ink #1a0f08 + a soft light-gold glow (`.kmy`: text-shadow #fff6d8 1px, #ffe9a8 3px, #f3cf6a 6px, #e8bd4a 11px),
on a PAINTING (stage tag, .kesov, .krs); in framed UI her name is plain black bold, no glow (owner 22:25Z). Everybody else's name stays plain ink (stage names keep the paper halo for readability). `.kmy` is set by:
`kitNameRank(rank,name,col,me)` (4th arg; omitted → `kitIsMyName(name)` = it is `S.name`), Ân oán `relSide` (her side "Ta"), stage tag
`.j59n` when the figure is S, `kitName(S,{named:true})` (32.7 captions, Tuần lục heading, podium plate), her identity card (kpIdentity),
her person card `.pcname` (pcard `o.me`, or o.name === S.name) + its sticky strip. Kit page sample §48.1 shows her name next to another.
Where it applies (one CSS block `#kit-rt`, nobody styles a title over a name on their own): `kitNameRank` (sets `.krt`/`.krn`), stage name
tags `.j59t`/`.j59n` (j59 sets `--rt`), 32.7 / kitEventDp captions `.kpsn .kname .kti` (kitName sets `--rt` on `.kti`), person cards
`.pcrk` over `.pcname` (j15 sets `--rt`) and the sticky strip `.kpstrip`, Tuần lục person heading `.kbk-pname`, honour podium name plates `.kpod-plq` (j90). Dialog face captions (`.faces figcaption`, j3: "Nhập cung", "Thân phận kiếp này") are built with `kitNameRank` (rank over name). A title INSIDE a sentence
(kitName in prose rows) keeps the plain inline look (no glow, no outline, the line's own font) BUT in its rank tone (48.3). Kit page sample §48.1: every title on parchment and on a dark scene (`.krs`).
Test: `node dev/test/rank-title.js <url> <outdir> <tag> [sizes] [day,night,rain,cold,dp,kit,old]` (colours, serif, title above name,
no tag overlap / cut; OLDURL=<old build> for the old-save case).

### 32.7b PEOPLE FILL THE COLUMN (owner 11/15, replaces the KIT_FIG .79 scale inside 32.7 columns) — `kitDpFit` (jk4) — CAPPED by 32.2a (15/11): the column never grows for the people; wide figures are cut below the waist or scaled to fit

### 48.3 RANK TITLE + NAME IN RANK COLOUR EVERYWHERE · `kitRankPaint` (owner 15/11 s8: "Phẩm bậc trong mấy ô chọn này chưa theo màu phẩm, màu phẩm xuất hiện mới nơi có tên và phẩm của người.") — `dev/build/j79.js`
ONE rule: wherever a person's rank / role title stands right before that person's name — picker rows of every act ("Sai … đi dò la"
targets, gift / plant / visit pickers), cards, dialogs, lists, logs, Tuần lục, toasts, popups, co-op — the title is in its rank tone
(`kitRankTone`, plain text in framed UI, lightened 55 % on `.modal.night`), the name in the person's colour (hers black `.kmy`).
- New code writes `kitName(p)` (or `kitRankNameH(p, title, name)` = the kitName block with the text's own title).
- Plain words "title name" already written by any builder are painted by `kitRankPaint(root)`: one MutationObserver pass (same model as
  kitRelPaint §11.2) wraps each visible "title name" run of a KNOWN person (`kpPeople()`) into `<b class="kname"><span class="kti"
  style="--rt">title</span> name</b>`; the list form "name (title, …)" ("Mạnh Bích Dao (Tần, chủ vị)") gets the name block and the
  title in its tone. Words never change (textContent equal). `kitRankText(html)` does the same on an HTML string (kpFactRow runs it before
  kpChipify, so a delta chip never eats the end of a name). Works beside review/pick-hint's `kitRankNamePaint` (jaudit §17: a BARE name gets
  its title via kitName; "title name" written as text is left to this pass). Titles: consort ranks, Phế phi, Thái tử / Hoàng tử / Công chúa,
  servants (Cung nữ [thân tín / thô sử], Đại cung nữ, Chưởng sự cô cô, Ma ma, Thái giám, Tổng quản, Nữ quan, Nhũ mẫu), Thái y, Thị vệ,
  officials, Công tử. Skipped: existing kit name blocks (.kname .knr .krt .krn .kpsn .pcrk .pcname .j59t/.j59n .kpod-plq .kbk-pname),
  `[data-vp-skip]`, `[data-norank]` (opt-out), form fields.
- `kpPeopleIn` (Tuần lục / news rows): a title the text itself writes before the name now goes INSIDE the name block in its tone (it stayed ink).
- CSS: `html body .kname .kti{color:var(--rt)}` in `#kit-rt` (jk4); the Tuần lục rule no longer forces the title to the name colour (j87).
Scan: `node dev/test/rank-colour.js <url> <out.json> [WxH] [tuần] [shots]` (every place × person × picker, every tab, bot play; each visible
pair OK/PLAIN) + `python3 dev/test/rank-colour-sites.py` (source sites: KIT / TEXT painted / SPLIT must be 0).

### 32.7b PEOPLE FILL THE COLUMN (owner 11/15, replaces the KIT_FIG .79 scale inside 32.7 columns) — `kitDpFit` (jk4)
In a 32.7 person column every person stands from just under the name chips (37) down to the column floor: painted top (hair, crown,
hat) under the chips, feet on the floor, aspect kept. Man and woman alike (no ×1.07 here); children keep their age factor
(KIT_FIG.fac < 1, feet on the same floor). Two people: the §33.7 slots (1/3 · 2/3, never overlapping); the right column keeps ≥ 250 px (was 280),
so two adults fit the column on Fold 755; a narrower screen gives them one common factor (the live game shows ONE main actor in an event pop-up, `kitStagePeople` slice(0,1); the 2-person layout stays in the kit). Measured (fig-fill.js):
painted height ≈ 0.99 of the column under the chips; ≈ 0.93 of the whole column with a two-line chip on top (the chip itself takes the
rest). Stage figures, 32.6 picture bands and week-book figures keep KIT_FIG (33).

### 32.7c PERSON DIALOG HEIGHT = ITS CONTENT (owner 11/15 "Khung to quá", "VIỆC · Có người đến") — `kitDpFit` (jk4)
Every person dialog (32.7: visitors, invitations, confrontations, the shop) is as tall as its content — title + event text + options —
never stretched to the screen: height = clamp(min(100dvh − 32 px, 500 px), natural height, min(100dvh − 32 px, 720 px)). The people are
scaled to that column (32.7b). Content taller than the cap (many options, the shop grid) keeps the cap and only the options / grid scroll,
so the shop and a full person dialog share the same box; a two-choice visit is a short card. Options that cannot be taken go last
(doable first). Test: `dev/test/fig-fill.js` (dialog size + fill), `dev/test/shop-fix.js`.

## 49. ÂN OÁN · RELATIONS (owner 11/15) — `dev/build/jhc.js`
### 49.1 kitRel2 — ONE relation component everywhere (owner 11/16 15:00Z 4.6–4.8; replaces kitRelRow + the 3-column kitRelTable; bars are gone)
`kitRel2([{head, dir:"them"|"me"|"x", rows:[{w, now, d, kind:"good"|"bad"|"pos", gloss?, unk?}]}, …], {week})` (jkrel.js) → `.kr2`: TWO column boxes side by side —
LEFT = that person → me ("Nàng → ta", purple tab), RIGHT = me → that person ("Ta → nàng", blue tab); one box when only one direction exists (Hoàng thượng → ta: Sủng, Ân tình; Thái hậu → ta) — a LONE box spans the WHOLE row width (owner 21/11 ~02:14Z: half a frame left empty is wrong; overwrites the 16/11 «one column wide» rule); test `dev/test/kit-rel2-span.js`.
Rows use SHORT words only (Thiện cảm / Oán / Ghen / Sủng / Ân tình / Tin cậy; tap = kit gloss), the NUMBER in its meaning colour (thiện cảm > 10 green, < −10 red; oán/ghen ≥ 20 red; sủng green), NO bars, no mixed rows.
`week:true` adds the "Hiện nay" and "Tuần này" columns, aligned inside each box (Tuần này = green/red change or "—"). Unknown value → "chưa rõ". Container < 260 px: the two boxes stack (left first).
`kitRelTable(kitRelRows(p,snap),{head})` builds the two columns from the fixed rows of §52. Callers (the full list, all via kitRel2): Ân oán pair view (`relRows`, jhc), week-book person pages (j87), person-card left key block (`pcfKey`, compact), Gia tộc card (jkc), kit sample §49.1 / §52.
Never draw a relation any other way; `kitRelDelta` (a change inside a sentence, §52) stays.
### 49.2 Picker + pair — "Xem quan hệ của X" · "với Y"
Two strips = the Hậu cung pager strip (`pager`, j15: ‹ ›, N/M, selected highlight), groups Ta · Chí tôn · Phi tần (k61Hide still lists
only consorts she knows by name), labels = the name only (`PG.rel`, `PG.relY`; an outside link that sets `relSel` still selects X).
Panel = ONE pair, heading "Quan hệ giữa X và Y": X (kitNameRank + portrait) | the rows both ways | Y; then "Đã biết về X" (facts about
X only, each with its source · when). Y defaults to Ta (her own relation with X); X = Ta → Y defaults to the first of strip 2. X = Ta →
the "Đã biết" box is hidden (her own facts are in Tư chất / Mệnh truyện). Hoàng thượng ↔ Z: sủng (+ ân tình for Ta); Thái hậu ↔ Z: thiện cảm.
A value shows when the one who feels it is Ta, or Ta has met both; else "chưa rõ".
### 49.2b Picker = small tabs + one strip (owner 11/15: "like Hậu cung") — `hcRelHTML` (jhc)
Each picker ("Xem quan hệ của" X, "với" Y) is a row of small kit sub-tabs (`kitSubTabs`, §46: Ta · Chí tôn · Phi tần, each with its head
count) over the Hậu cung pager strip (j15 `pager`) of THAT group only — no group labels inside the strip. The X tab follows an outside link
(relSel); Y keeps its own tab, default Ta (her own relation with X; Chí tôn when X = Ta). Tabs and strips are remembered (KTSUB, PG).
Markup: each picker = `.kpinline.krelpk` (label + kitSubTabs row + strip) — the §45 `.kpinline` exception keeps the row with its strip.
### 49.2c COMPACT PICKER (owner 15/11 "Khung này choáng space quá" · review/rel-picker) — CSS in jhc `kit-hc`, fit in j79 `kitStripFit`
Each Ân oán picker is ONE flex row `.kpinline.krelpk`: label (`.krelst`) + kitSubTabs group chips (no band behind them) + the face strip
(`.pstrip`, flex basis 300 px). The strip sits beside the chips when the width allows, else wraps directly under them. Faces and labels are small:
a face label is `kitNameRank(rank, shortName, rankColour, me, true)` (5th arg = the small size `.knr.knr-s`: rank .66rem over name .72rem, §48) — the rank in its rank colour over the short name (owner 11/15 ~793); Ta keeps her
glow. The pager ‹ › and the N/M count are shown ONLY when the faces do not all fit: `kitStripFit` measures first with them hidden (`.pstrip.kpall`),
keeps that when every face is whole, else drops `.kpall` and measures again with the arrows. This applies to EVERY `pager()` strip in the game
(Hậu cung, Chí tôn, staff, kid, qt, rel...). Never write a custom picker/strip row: use `.krelpk` + `kitSubTabs` + `pager`.
Sample on the kit page: §49.2c (few faces: no arrows; overflowing faces: arrows + count).
### 49.3 relPerson + THE STRANGER RULE (owner 11/15) — `isKnown61` / `met61` (j61), `relPerson` (jhc)
**49.3a CHÍ TÔN ARE MET FROM DAY ONE (review/small-bugs-2):** Hoàng thượng and Thái hậu are met from the first day of palace life on every
road — `isKnown61` returns true for them (and `k61SeedChiTon` keeps their k61 level ≥ 2, old saves included). The reigning Hoàng hậu is a
consort: silhouette until met (`met61`). `kitChiTonMet(k)` ("emp" | "th" | "hh") is the same answer for the stage chips' attitude
(`window.kitCourtKnown`). Stage chip, mdH, pcPort, kitPortrait (news / Tuần lục rows), kitStageFig / kitFigOf (dialogs) all agree —
test `dev/test/small-bugs-2.js` check 3.
`relPerson(k)` = the ONE helper of Ân oán: person object → face drawn from THAT object, name, rank, colour (`data-pid` / `data-fk` on the
side block; the test checks face key == person key for every X).
STRANGER RULE — one gate for every renderer: a consort Ta has NOT MET is the grey kit silhouette of her sex (portrait `img/kit/unknown-f`,
figure `unknown-fig-f`); her name stays. Met (`met61`) = Ta talked / acted with her (`S.met`, set by talk and every act on her) or she
lives in the same palace; the k61 "Đã quen" level alone is NOT met (owner case: listed in Ân oán, "Ta chưa gặp …", real face). The gate is
`isKnown61(e)` (k61 face level ≥ 1 AND, for a consort, met61), which every renderer already reads: mdH (strips, news rows, chips, intel),
pcPort / pframe (person card, Ân oán), kitFace, kitFigOf / kitStageFig (event dialogs 32.6 / 32.7, the week book Tuần lục person pages,
place screens). Others (Hoàng thượng, Thái hậu, servants, men) keep the face level. `kitStrangerOf(v)` (j61) = the same silhouette for a
caller that holds the person, not a face object. "Ta chưa gặp <tên> … Gặp nàng ta …" (VANPHONG).
NEWS / TUẦN LỤC ROWS (kitFacts, j79 kpPeopleIn): the row's face = the person named FIRST in the sentence (the subject) — names are matched
longest-first, then ordered by their place in the text (before: the longest name won, so "Thường tại A tặng quà cho Tần B" showed B's face
and B's rank colour on A's row). The face is mdH(kitFace(p)) = the same por file + current-rank colour as her Hậu cung strip tile.
Tests: `node dev/test/rel-row.js <url> <outdir> <tag> [sizes]`; `node dev/test/stranger-sweep.js <url> [outdir]` (one unmet consort through
every renderer: no real face / figure file, silhouette present; 8 news rows: src + rank colour == her strip tile; met again → face back).
49.3b FACE REVEAL BY DIALOG (owner 15/11 ~21:00Z, review/face-reveal): an event dialog that SHOWS a person (the Q item carries her /
him as `who` / `who2` / `stage` / `faces` / `kit.subject`) reveals that face when it opens (j61 `k61Shown` at showModal: face level ≥ 1, a
consort also met61), so the dialog and every renderer afterwards draw the real face / figure; name level ≥ 2 when the person speaks to her
(options + `who`) or the text names them. Hoàng thượng / Thái hậu / Hoàng hậu / children (named from day one) get their face from their first
dialog. Only MENTIONED people (news lists, tuyển tú roll, marriage-candidate rows, rumours) stay strangers. Only the dialog REALLY DRAWN reveals: the hook runs after
j68 evGate (an optional event it holds / drops reveals nobody). Look-up panels she opens herself (`kitPanel` spec `look:1`: Đã biết về X,
Chứng cứ về X, Tâm trạng · X) never reveal / meet — a new look-up panel with a `subject` must carry `look:1`. Check: `node dev/test/face-reveal-look.js <url>`. Scan: `node dev/test/face-reveal-scan.js
<url> [steps] [seeds]` (every dialog the bot sees: site, people shown, stranger before, revealed after); static list `python3 dev/test/face-reveal-sites.py --md`.
Shots: dev/shots/kit-fig2/.

### 49.4 kitMoodHud — THE MOOD BAR IN THE FIXED TOP BAR (owner 11/18 ~05:40Z) — `dev/build/jmood.js` (mbHud) — KIT READY (owner picked this layout 11/18 ~06:05Z)
One row under the eight stat cells inside `header.hud` (`#hud-mood.kstm`, grid-column 1/-1 so it follows every top-bar grid variant): her mood seal (emoBadge) · "Tâm trạng" · band word (mbBand, colour class) · `kitSignedBar` (§49.1: calm at the centre, red left / green right) · signed number. Tap or Enter = the existing mood box (`data-emo-open="me"`, jpcf). The number comes from ONE accessor `kitMoodVal()` (moodBar(S) if the npc-chain model is live, else S.mood.v).  Test/shots: `dev/test/hud-mood-shots.js`.

## 50. kitEventDp — THE event-with-a-person dialog (owner 11/15, replaces 32.6 for events with a person) — `dev/build/jk4.js`
ONE component for every event where a person appears: NPC visits ("Có người đến"), invitations (Đoan ngọ …), confrontations, the
Emperor's visits. It is the 32.7 person dialog:
- LEFT: the person full height (32.7b), name + rank ABOVE (37 kitNameRank). Two people stand side by side (32.7 rule).
- RIGHT, top: the event picture as a landscape BANNER (`.kdlgart.kdpban`, height clamp(96 px, 24vh, 190 px), cover-cropped at the focus
  point `KIT_FOCUS[file]` (CSS object-position; default 50% 50%; list + crop sheets: dev/review/event-banners.md). No picture → no banner.
- RIGHT, middle: the event text as kit rows (the empty "world" dot is dropped).
- RIGHT, bottom: the options as kit option cards (Được / Mất / odds), doable first; TWO per row when every option is short (≤ 2 rows,
  ≤ 70 characters), else one per row (`.opts.kdpo2`). Only the options scroll.
- Height = content (32.7c), inside the standard person-dialog box.
- Shop / care dialogs (`.kshopd`: pet shop, errand shop, pet care) carry the same banner; their body (`.kpmain`) starts in grid row 2 UNDER it and scrolls itself (review/care-overlap: it spanned rows 1 to -1 and the picture covered the bars / first tiles). Test: `node dev/test/care-scan.js <url> <WxH@dpr> <outdir>` (cases in dev/test/care-cases.js; add every new kshopd dialog there).
`window.KIT_EVENT_DP=false` restores 32.6 (people on the picture) for a test. Test: `node dev/test/event-dp.js <url> <outdir> <tag> [sizes]
[kinds]` (mock, long, nopic, emp: banner in the right column, focus, fill, chip above, option columns, empty space under the options).
- Tap (owner 11/15): no visible label; TAPPING any seal (hers or an NPC's, any frame size) opens the kit popover `kpPop` (j79) with the mood
  word + the one-line cause the game knows ("Giận: bị Hoàng hậu trách"; "Tâm trạng chưa rõ" for the grey seal); any other tap closes it; the tap
  never also opens the card under it (capture handler in jemo). Keyboard: Enter/Space on the focused seal.
- Art (owner 11/15 v2): same chibi lady, soft watercolour/gongbi, thin gold rim, expressions exaggerated like emoji so each mood reads at 38 px.
- Data only through `window.kitEmotion(p)` → `{k,name,v,why,known}`; alt "Tâm trạng: <tên> (<cause>)". Nobody draws another mood icon; no code-reshaped facial expressions (owner 22:50Z): the seal + ring are the only display of feelings.

- MEN wear men's seals (owner 11/15, review/emo-men): same 10 moods, same coloured grounds, gold rim and marks (Sợ: pale purple upper face + fear lines; Giận: red flushed face + anger mark). `img/kit/emo-m-<k>.webp` = young man (Hoàng thượng, thái tử/hoàng tử, công tử/nam nhân, vương gia, thái giám, thị vệ); `img/kit/emo-mo-<k>.webp` = mature man with cap and short beard (quan, thái y, any man 45+ except Hoàng thượng). Women and girls keep `img/kit/emo-<k>.webp`. ONE rule `emoArtSet(p)` in jemo (personRoleRank sex/role); art cut from 5x2 chroma sheets by `dev/art/emo_cut.py`; check: `dev/test/emo-men.js`, sheet dev/shots/emo-men/sheet.jpg.

### 50.1 ONE TEMPLATE FOR EVERY EVENT WITH A PERSON (owner 11/15 13:00Z + 13:15Z; acceptance "VIỆC · Thái hậu triệu") — review kit-fig2 r8
- LEFT: ONE person — the main one (`stage[0]` / `who`); a second person is named in the text (owner "several people → only the main one").
- Festival dialogs (j71 invitations j71i / j71x, the festival day, its contests): `kitFestKey(m)` → evId `fest:<k>` = the festival's own
  picture (Đoan ngọ = ev-le-ha), never the Triều chính default (owner 13:00Z).
- RIGHT top: a banner for EVERY event with a person: its own event picture, else the picture of its kind — `j24:<slug of the title>`
  (EVENTS.json: Có người đến, Thái hậu triệu, Hoàng thượng đến, Kẻ hầu xin, Một ánh mắt, Việc của kẻ hầu), else `e68:<id>`, else the week-book meaning
  table `KBK_EVRE` (j87) on the TITLE, else Hoàng thượng / Thái hậu / visitor by who it is (never the room picture); a dialog about herself alone gets a
  banner only when the table finds a real meaning.
- Height = content: `kitDpNat` adds banner + text + the options' own content (not the stretched grid cell, which clipped the options and
  made them scroll), floor 300 px (was 500: a two-choice summons left 125–340 px empty — reviewer r6 item 1a), cap min(100dvh − 32, 720).
- Short options (≤ 2 rows, ≤ 70 characters) 2 per row; the 32.9 "long" mark (k3long / k3odd) no longer breaks such a group.
- Not changed (rule: number chips wait for fix-float `kitRelDelta`): option rows still say "Thái hậu → ta: thiện cảm +3" (NAMES.th / hh).
Test: `node dev/test/event-dp-scan.js <url> <outdir> <tag> [sizes] [save.json]` — every j24 approach kind + every festival / feast /
merit invitation, opened for real and measured (layout, one person, banner in the right column, chip above, fill, empty px under the options).

## 39. ẤN TRÂN NỮ · kitSeal (owner 11/15, review/brand) — `dev/build/jseal.js` (after jk4)
- Ported from Phượng Lệnh `public/choi/js/kit/seal.js`: square cinnabar seal, TRÂN over NỮ cut white into the cinnabar (bạch văn), Vietnamese
  seal-script capitals drawn in code (`kitSealWord(w,x,y,bw,bh,sw)`, one even stroke on a 6×10 grid, diacritics carved the same way), worn
  edge + grained ink by FIXED-seed turbulence (`#kseal-ink`, same every render), carved mask `#kseal-tn`, tilt −2°. Inline SVG, no image.
- `kitSeal({cls})` → markup (64-unit viewBox; size with CSS `--kseal`; colour = `currentColor`, cinnabar #b02a20). Defs injected once
  (`#kseal-defs`). Nobody draws another seal; Phượng Lệnh's THÀNH/BẠI/HÒA result seals are not ported (not used here).
- Top bar: ONE seal in the top-right corner of the cream bar (`header.hud > .kseal-hud`), a mark only: aria-hidden, `pointer-events:none`,
  no tap, z-index 2, multiply blend. Its room is made by measuring the bar (kitSealHud, on every renderHUD + resize):
  wrapped bar (portrait / phone landscape) → the Buổi/Quẻ block steps left (`#k3tc` margin-right = seal + 12 px), seal 38 px (30 px when
  height ≤ 500); one-row bar (≥ 1000 px landscape) → the bar keeps a right gutter (`.kseal-pad`), seal centred in it; 1000–1179 px the stat
  cells use the phone label form (icon only, name in tooltip) and the seal is 34 px, so the longest quẻ "Quẻ Thượng thượng (Giao thiệp)"
  no longer runs into the cells (it did by 58 px at 1000 px before this change).
- "Có bản mới" chip (swreg.js place()): never on the seal. Spots in order: right of rank/age, right of the date, right of the "Buổi …"
  line (one-row iPad bar 1000–1179: checked against every leaf of the bar + the seal); only if none is free, just under the bar, centred
  (reviewer r6: the under-bar spot at 1000/1180 sat on the stage's "Hoàng thượng" card, owner 16:40Z).
- Ữ: the tilde is lifted clear of the U's arms (top room 6.2, deeper wave); before r6 the arms + tilde merged under the ink filter and the
  seal read "TRÂN NƠ".
- Measured (dev/test/brand-seal.js, ±1 px, dev/shots/brand/seal-measure.jsonl), gap seal→nearest part of the bar / quẻ line / chip:
  755×1000 12 / 12 / 332 · 1000×755 15.9 / 334.6 / 426 · 1180×820 23 / 497.5 / 513 · 1366×1024 23 / 589.3 / 940 · 844×390 12 / 12 / 431;
  time block → stat cells (one-row): 17.6 (1000), 18.7 (1180), 110.5 (1366); 0 overlaps, 0 page errors, no horizontal overflow.

### 39.1 THE SEAL ON EVERY EVENT FRAME (owner 15/11 ~20:15Z, review/cal-plus) — `kitSealEvPlace` in jseal.js
- Every EVENT dialog wears one kitSeal (`.kseal-ev`) in a corner of its frame: kitEventDp, 32.7 person dialogs, place-event frames, event stages,
  plain event cards, news / intel / result / night / end / threat / evidence / reward cards. Event = `kitSealEvIs(m, dlg)`: a panel with its own
  kind (kitPanel / kitModal) only when that kind is in `KSEAL_EV.kinds`; a queue item without its own kind is something that happened
  (event, festival, contest, pay day, news …) except the HUD help cards (Thang / Ra vào / Quẻ / HXN titles). Tool panels (rules, info, person
  card, calendar, shop, act pickers `KIT_ACT_PIDS`, `act` / `shop`) never get one.
- Placement (owner 21/11 ~03:47Z, #44, «chỗ có, chỗ không» — canon overwrite of the measured corner search): ONE fixed place, never measured: the TOP-RIGHT of the frame's header bar (`.kph`), just left of the ✕ slot, ONE size (`KSEAL_EV.fix` = 34 px, top 4 / right 52 = left of the ✕ slot, which stays free), on every event dialog, Fold + iPad; the header reserves the room (`padding-right`), so it never covers a word. No bottom strip, no corner search.
- A mark only: aria-hidden, pointer-events none, multiply, opacity .9. Test: `node dev/test/seal-events.js <index.html> [outdir] [sizes]`.

## 40. APP ICON (owner 11/15, review/brand) — `dev/art/make_icons.py`
- From the title/first-load key art (img/title-key.webp, backdrop 'title'): the lady in the red/gold phoenix headdress, face + ornaments +
  shoulders, in a gold band on cinnabar #8a2a1e. icons/icon-192.png, icon-512.png (purpose any, rounded tile), icon-maskable-192/512.png
  (purpose maskable, full bleed, round portrait inside the 80 % safe circle), apple-touch-icon.png 180 (opaque), favicon = dev/build/icon.webp
  (inlined) + icons/favicon-48.png. Preview: dev/shots/brand/icon-preview.png. An installed Android PWA may keep the old icon until reinstall.

## 41. kitMeMark · dấu "là ngươi" (owner 11/15) — `dev/build/jmark.js` (before j84)
- EIGHT markers, one per rank: `img/kit/me-mark-<r>.webp` (gpt-2-6, transparent, NO tassel), growing in grandeur: 0 ivory plum · 1 silver orchid +
  green jade · 2 silver flower + aquamarine · 3 jade lotus bud · 4 amethyst chrysanthemum + luan · 5 ruby peony · 6 gold phoenix on a jade cloud ·
  7 amber-gold phoenix with spread wings (Hoàng hậu; owner 11/15 swapped 6↔7). Size factor `KIT_MEMARK.sc[r]` (0.78 → 1.22). Sheet dev/shots/me-mark/ranks8.jpg.
- Where: her stage figure `#mefig` (any slot) and her figure in dialogs / event stages (`kitStageFig` adds `.kesme`). Never on anyone else.
- STAGE SIZE (owner 18/11 ~06:15Z "chốt A1"; line: owner OD 19/11 ~02:05Z + ~03:50Z): on stages the marker stands ON the badge line of her sex (§78.y `kitMarkLine(st,sex)`: the highest REAL head top of the visible figures of that sex − G), on her centre line, level with every bubble of that line; `KIT_SLOTS.band` 70 and `KIT_FIG.h` .79 are unchanged; j59 `meCap` shrinks the one body H just enough that the men's standard line + bounce stay inside the frame (`kitMarkRoom`); when a crown / tall hat lifts the line past that room the marker shrinks (down to `KIT_MEMARK.tiny`), never sinks onto a head.
- GLOW: `.kmemark` / `.kmmapmk` drop-shadow stack uses the Hoàng hậu title pill's gold (`--dh` = RCOL[7] #efbd69, jtitle kdh tier 8): white core + 3 halos 6/12/22 px.
- DIALOG placement rule (dialogs / event stages; stages use the row above): marker bottom = top of her head (first opaque row of the figure art, hair ornaments included) − `KIT_MEMARK.gap` (1.2 %)
  × her drawn figure height. Measured: iPad dialog 6.3 px on 524 px, 390 dialog 3.8 px on
  320 px (all = rule). Height 8.5 % of the figure × sc[r], 26–72 px; when the room above the head is short (dialog, scene title, plaques,
  chips) it SHRINKS (down to 12 px), never covers the head or the title.
- Size: `KIT_MEMARK.big` = 1.05 (owner 17/11 07:15Z: "to hơn một xíu", 2–8 % allowed; one value, every figure and rank).
- Glow (owner 17/11 07:00Z, map-me-mark): BRIGHT static glow = white core + three gold halos on the `.kmemark` layer (never an animated filter, perf ≤ live).
- Motion (Cảnh động on, no reduced motion): squash-and-bounce loop `kmmBob` 2.6 s, transform only on the mark's own `<img>` (origin bottom centre): rises 11 px, drops fast, squash (scaleY .84 / scaleX 1.1), rebound 5 px, small second landing, settles, rises again. Reduced motion / Hiệu ứng Gọn → still mark, same glow. Never the figure.
- Items: `S.meMarks` (owned ranks), `S.meMark` (chosen; null = highest owned). Every promotion adds that rank's marker; old saves get ranks
  0..current on load. The rank chest of review/gift-chest (`kitReward({kind:"chest",title:"Phẩm phục …"})`, jrankset `rsChest`) gets the
  marker as one more item through a `kitReward` wrapper in jmark (no edit in jrankset). Tư trang: tab "Dấu ấn"; tap a marker → "Dùng"
  (`kitMeMarkUse(r)`), any owned one, older ones too. Servant road: none until she becomes a consort.

> Numbering note (reviewer tabs-kit-r6, 11/15): review/tabs-kit wrote these as §39/§40, which clashed with main (§39 kitSeal,
> §40 APP ICON) and with open branches (review/kit-fig2 §39 kitActCompact / §40 kitEventDp, review/ts-a §39 TOP 15,
> review/kit-table / fix-float §39 kitRelTable). Renumbered to §45/§46; §41–§44 were left free for those branches; main took §41 (kitMeMark), close-bugs §42 (CLOSE-BUGS RULES); tabs-kit r7 put kit-fig2's kitActCompact at §43 (reviewer r7: it was §42 on the branch, clashed with close-bugs §42); §44 still free.
> kit-fig2's jk4 `kitActCompactOn` and §46 `kitActCompact` (jtabs) were the same idea — folded in tabs-kit r7: jtabs uses kit-fig2's part (§43).

## 51. KIT TABLE · every label|value list = ONE kitRows grid (owner 11/15 17:27Z, review/kit-table) — j79 `.kpkb` + `kitRows` / `kitReqRows`
(Numbered §41 on review/kit-table; renumbered §51 by review/kit-table-r6 because main §41 = kitMeMark — coordinator registry.)
Owner bug: in LUẬT · Ân thưởng ("Đêm thị tẩm vui | Trâm ngọc bích…", "Sinh hoàng tử | Ngọc bội ngự ban…") the right column started at a
different x on every row, because each legacy row (`.pcb.rows > .pcrow`, a flex row with `justify-content:space-between`) sized its own
label ("Sinh hoàng tử" wrapped to 3 lines, one word per line).
- **Rule:** any list of label | value rows is built with `kitRows([[label, value|[values], cls]])` — one CSS grid, rows are `display:contents`,
  so every value of the table starts at the SAME x (±1 px). Never write `<div class="pcrow"><span>label</span><b>value</b></div>` again
  (a `.pcrow` with ONE cell, e.g. a news line or a log line, is a plain list line, not a table).
- **Label column (one width per table):** `grid-template-columns: fit-content(var(--kt-lab, max(34%, 7rem))) minmax(0,1fr)` = the longest
  label, capped at 34 % of the table (never under 7rem, so a label is never one word per line); longer labels wrap INSIDE the column
  (`white-space:normal`, no word breaking). A caller may set `--kt-lab` on a container for a narrower/wider cap; nobody sets private widths.
- **Values:** `cls` = g | r | n | t (green / red / dim / ink). A value that is already a kit piece (`kitChip`, `.ef`, `kitName`) is kept as
  is; an array of values is joined with the kit `·` separator. Silver in a value = `kitChip("Bạc", n)`, never "+N bạc".
- **Person card groups (`pcard`, j15):** a group may hold kit rows as tuples `["label", value, cls]` next to buttons/notes; the tuples
  become ONE `kitRows` table, the strings stay in the `.pcb` grid below it (Điều ngài thích, Tư chất, Tài nghệ, Đường đi của cung nữ,
  Việc nhờ "Bước này" / "Các bước").
- **Tables written one after another** (shop detail: price row + `kitItemRows`): `kitRowsJoin(kitRows(a), kitRows(b))` merges them into
  ONE grid so the values line up across both.
- **Requirement lists:** `kitReqRows([[ok, "Sủng 8 (cần 15)"], …])` = the same table: label = what is needed, value = ✓/✗ + numbers
  (green met, red unmet). "Ghế Phi: còn chỗ" → Ghế Phi | ✓ còn chỗ; "X (a, b)" → X | a, b; a bare sentence → sentence | ✓ đủ / ✗ chưa đủ.
  Used by Mệnh truyện "Điều kiện sắc phong …" (legacy j6 panel and the tabs-kit sub-tab Mệnh truyện · Sắc phong, jtabs `ktStoryHTML`;
  r6 replaced `kitChecks(R)` there: §46 kitChecks stays for one-cell check lists such as chapter steps).
- **Relation chip in a rule text:** "mỗi lần: phi tần khác ghen +3" = `kitChip(kitRel("them","phi tần khác ghen ta"), 3, "r")`
  (label purple §11.2, number red).
- **Fact rows without a person (`kitFacts` world rows):** no blank round dot any more (`.kfact > .kfdot` hidden, text takes the row); the
  week book keeps its small diamond bullet.
- review/small-bugs-3: the econ override of the Bổng lộc rule card (jecon `blCard`, rank | bạc · goods · lễ nghĩa · ban thưởng) was still legacy
  `.pcrow`; now kitRows like j20. Test `dev/test/small-bugs-3.js` bl.
- Migrated (legacy `.pcrow` → kitRows): Ân thưởng (rewards + Sổ ân thưởng), Bổng lộc, Thang nguy hiểm (j24 fallback), Tuyển tú, Bảng phẩm
  vị "Ghế theo phẩm", Kiếp này (end card) + Sổ luân hồi, Tranh ghế (contestants + score table), Hoàng thượng "Điều ngài thích" (j15 + jhc),
  self card Tư chất / Tài nghệ, cung nữ "Đường đi", identity card (nlCard), Kế vị box, Thượng thư phòng box, Việc nhờ steps, Điều kiện
  sắc phong. j65 / j69 DOM fixes read both `.pcrow` and `.kb > .kr` rows. Tuần lục HIỆN NAY is review/fix-float (kitRelTable), not here.
- Kit sample page (§47, `#kit`): jkitpage registers §51 samples kitRows, kitRowsJoin, kitReqRows, `kitChip(kitRel(…))`.
- Test: `node dev/test/kit-table.js <site url> <W>x<H>@dpr [shotdir]` opens every tab / sub-tab / person / category, the HUD rule dialogs,
  rule panels, item dialogs, the shop, Sổ luân hồi and the end card; per list it prints the value-x spread, labels standing one word per
  line, and any legacy two-cell `.pcrow` or flex space-between row list. Exit 1 on any fail.

### 51.1 ONE BLOCK = ONE LABEL COLUMN · `kitRowsAlign(root)` (owner 15/11 "Hàng trên hàng dưới chưa alignment", review/row-align) — j79
Owner bug: mood dialog "Tâm trạng · …", block ĐANG TÁC ĐỘNG: "LO ÂU | …" and "ẢNH HƯỞNG | …" started their values at different x, because
the 2nd row was a kitPanel section with no heading = a 2nd kitRows grid sizing its own label column.
- **Rule:** inside one block every label | value row shares ONE label column (the widest label of the block, capped as in §51), so all
  values start on one vertical line, like TỐN / ĐƯỢC / MẤT / GHI CHÚ in action cards. A heading (`h4.kpst`) starts a new block.
- **How:** `kpBuild` (every kit panel, spec sections and legacy html) runs `kitRowsAlign(main)`, which joins kit tables (`.kb.kpkb`)
  that read as one block into ONE grid: (a) a table right after a table; (b) a section with no heading whose first child is a table,
  after a section / table that ends with a table; (c) a bare table right after such a section (e.g. Xét phẩm "Ghi chú" under
  "Điều kiện lên …"). Content after the joined rows keeps its order. Callers write nothing special: just don't hand-build rows.
- Narrow screens: unchanged §51 column cap (`fit-content(max(34%,7rem))`), long labels wrap inside the column.
- Migrated in the same pass (scan): Bổng lộc (jecon `blCard` override still wrote legacy `.pcrow` rows) → `kitRows` (rank | N bạc · goods).
- Sample on the kit page: "§51.1". Test: `node dev/test/kit-table.js <url> <W>x<H>@dpr [shots] [steps]` now also measures `kit-block`
  (kit tables with the same left edge, ≤22 px apart, no heading between = one block; value-x spread must be ≤1 px) and has a `mood`
  step (emoBox for the player + 3 women).

> Numbering note (review r6, 15/11): review/fix-float first wrote these as §51 (relation table, §51.1 kitImgSync) and §52 (number delta). The coordinator's registry reserves §51 for kit-table, so they were renumbered: relation table = §52, kitImgSync = §52.1, number delta = §57.

## 52. RELATION TABLE · kitRelTable / kitRelRows / kitRelDelta (owner 11/15 15:30Z + 16:50Z "LUẬT KIT TRƯỚC", review/fix-float) — `dev/build/jkrel.js` (after jaudit, before jint)
ONE component for "how this person stands with me", wherever a person's relation numbers are listed with their change (week book
person pages today; any new screen that lists them). Replaces the private chip row + "Hiện nay" row of the week book (`.kbk-rel`,
`.kbk-relchips`, `.kbk-pair`, `.kbk-pchips` are gone).
```js
kitRelRows(person, snap)   // → the FIXED rows for that kind of person, same order every time:
//   phi tần / Hoàng hậu : "<Nàng|Hoàng hậu> → ta: thiện cảm" · "<…> oán ta" · "<…> ghen" · "Ta → <nàng|Hoàng hậu>: thiện cảm"
//   Hoàng thượng        : "Hoàng thượng → ta: sủng"          Thái hậu : "Thái hậu → ta: thiện cảm"
//   kẻ hầu              : "<Nàng|Hắn> → ta: thiện cảm" · "Ta tin cậy"
//   stranger ("Phi ???") or anyone else: one row "<…> → ta: thiện cảm" = "chưa rõ nàng nghĩ gì" (no numbers)
//   row = {dir:"them"|"me", label, now:int, d:int|null, kind:"good"|"bad"}; snap = S.wkSnap (pp[id]=[rel,ghen,oan,ta→nàng], sp, sung, th)
kitRelTable(rows, {head:true})   // → kitRel2 (§49.1): TWO column boxes, left = that person → me, right = me → that person; rows carry w (short word), sj, ob
kitRelDelta(label, "them"|"me"|"none", d, kind)    // → .krd: one relation change inside running text (a fact line)
```
- TWO column boxes (owner 11/16 15:00Z): LEFT "Nàng → ta" (that person → me), RIGHT "Ta → nàng"; short words (Thiện cảm / Oán / Ghen / Sủng / Tin cậy), NO bars; inside each box the **Hiện nay** and **Tuần này** columns are aligned (numbers right-aligned, tabular, never wrap).
  Number colour = meaning (§49.1); change = Được/Mất colour, "—" when nothing moved; whole numbers, negative with "−". Container < 260 px: the boxes stack. Words carry `data-vp-skip`.
- `kitRelDelta` inside facts: the same look as a table row, no chip box, never wraps; between two other people (`"none"`) no direction
  colour ("thiện cảm +7"). The week book redraws every relation chip of a log line with it (`kbkRelInline`, j87), and the on-screen word
  fixer turns "thân ±N" into "thiện cảm ±N" everywhere.
- Week book (§27 / §36.5, amended 17:45Z): every page keeps its own subject and its full-length figure — Tổng lược = her own figure,
  each person = that person, Triều đình · thiên hạ = Hoàng thượng; a person without a painting (or before img/FIGURES.json arrives)
  gets the kit silhouette `img/kit/unknown-fig-{f,m,k}.webp`, replaced by the painting as soon as the list arrives. Under the name:
  `kitRelTable(kitRelRows(p, S.wkSnap))`. No chip row, no "Hiện nay" row of its own.
- Sample: kit sample page §47 (`#kit`): every row kind, a narrow and a wide table, inline deltas (§52), number deltas (§57).
- Test: `node dev/test/book-person.js <url> [sizes]` (fixed rows, column x ±1 px, no private chips, integers, no card text, every page
  has a figure, small avatars without a box, page turn without re-render / undecoded pictures).

- MEN / SERVANTS (KIT_REQUESTS 20/11 rel-men-servants, review/kit-relrows-ms): a man, servant, maid or court official reads the ONE j9 relation model — `aff`/`oan`, never `p.loyal` as «Thiện cảm» (law 4: one pair, one number). Man: «Hắn → ta» Thiện cảm aff(p,S) + Oán oan(p,S), «Ta → hắn» Thiện cảm aff(S,p), no Tin cậy. Servant / official: Thiện cảm + Oán. HER OWN servants (S.maid, ownerOf(p)===S) also «Ta tin cậy» = tinOf(p); NO «Lòng» row (OD:L352 «only ONE word Thiện cảm; drop Lòng», KIT_REQUESTS 21/11 kit-relrows-ms1word; KR2_W has no «Lòng» word). Not met (relMSMet false) → one «chưa rõ» row. Week snapshot `s.ms[relKey]`. Guarded on `relMS`/`relMSAll` (lands with or after review/rel-men-servants; before it the old loyal branch runs). Test `node dev/test/kit-relrows-ms.js <url> <out>`.

### 52.1 NO FLASH on page / tab turns — `kitImgSync(root, ms)` (jbook)
A picture shown again (on a turning sheet's copy `kclPrep`, a page that was hidden, a page the game has just re-rendered in
`kitCurlSwap`) must never paint one empty frame while it decodes. `kitImgSync` marks every `<img>` `decoding="sync"` + eager and returns a
promise resolved when all are decoded. Used by kclPrep (every sheet copy), kitCurlSwap (the new page of every tab turn), kitBook (whole
book after layout). Full figures (`kitStageFig`), book pictures (`kitBookPic`) and week-book event prints are `decoding="sync"`.
kitBook never rebuilds its sheets when a relayout comes out the same (fonts ready, book art loaded): it only repaints.
Copies (review r6 → r7): `kclPrep` gives each copied `<img>` the live one's `currentSrc` (the same decoded bitmap, no second srcset pick);
`kitImgPending(root)` = a picture of the copy is not decoded yet; `kitSheetTurn(...).pending()` / `.ready(ms)`. kitBook keeps the live sheet
shown and the copy hidden until the copy is decoded (≤ 350 ms), then turns; kitCurlSwap hides the sheet until decoded and turns from
the start, or skips the turn if it is still not ready. A turning sheet never shows a blank portrait.

## 53. EVENT-CHOICE PARTS · kitHint · kitOptOdds · kitHintRow · kitKemRow · kitResultSeal (owner 11/15 14:30Z / 15:05Z / 15:10Z, review/opt-render) — `dev/build/jk2b.js`, `dev/build/j63.js`
Index of the shared parts review/opt-render added (number from the coordinator's registry; the rules live where they apply):
- `kitIsEventChoice(m)` + `KIT_ACT_PIDS` + data flags `ev` / `act` / `shop` — which dialogs are events (cost mode): §28.6.
- `kitHint(o, m, lv)` → `{hint}` (pure, bots too), `kitHintLevel()` (Tâm cơ / Tai mắt → vague / plain / sharp): §28.6.
- `kitHintRow(text)` (`.kr-hint`, `.ef.i` in j63 kit CSS), `kitOptOdds(b)` (the kit odds meter on every option, certain = «Nắm chắc»; a rolled option's `p` → `oddsLead`, §25): §28.6.
- `kitResultSeal(ok)` (THÀNH / BẠI / grey KẾT QUẢ, j63; not `kitSeal`, which is the Trân nữ seal §39), `kitKemRow(K)` (`.kb .kkem`): §7.
- Samples on the kit page (§47): ids "§53" (chip tones + the 7 odds-meter steps; an event option in cost mode through the real modal markup → kaNorm →
  kitHideOut; kitResultSeal ×3; kitKemRow). Tests: `dev/test/opt-render.js`, `dev/test/opt-scan.py --fail`.

## 54. ITEM REVEAL · GRADE CHIP · kitLose (owner 11/15 08:20Z + 17:02Z, review/game-feel) — `dev/build/jkrev.js` (before jfx, j84) — awaiting kit review
Registry: §54 = game-feel parts (coordinator). Samples on the kit page (#kit): §54.1, §54.2.
### 54.1 kitItemInfo · kitGradeChip · kitRevealHTML
- `kitItemInfo(entry|key)` → `{k, name, src, src512, grade 0..4, gname, col, sub}` — the ONE answer to "what does this item look like, what grade
  is it", the SAME as the Tư trang bag: works = j98 `itemArt(entry)` + WTIER word (Thường · Khá · Tinh xảo · Tuyệt phẩm, colour of grade ti);
  garments / hairpins = j92 `WD_ITEMS[k].icon` + `g`; veils = jveil `vlSrc` + `vlG`; everything else = j98 `itemArt(k)`. No picture → empty kit
  frame, never a letter. Used by kitGain, kitReward items (jfx `kgItem`), kitLose, j93 `kmTierOf/kmItemImg`, and the bag for veils (jinv).
  Sweep test `dev/test/item-pics.js`: every IT / WD / work id has its picture on the CDN `_index` and the reveal grade == the bag grade.
- `kitGradeChip(grade, {name, extra, size:"sm", col})` → `.kgchip.kgcN`: pill in the KIT_GRADE colour (Thường `#9a8a78` · Tinh phẩm `#3f8f6a` ·
  Trân phẩm `#3f62a8` · Tuyệt phẩm `#7a4fa0` · Ngự tứ gold→red gradient), white bold text; `name` replaces the word (work tiers), `extra` after
  " · " (item kind); `sm` = the list size (kitReward list). Every grade label on a reveal / reward list / lose card is this chip.
- `kitRevealHTML(info, {from, noSub})` → `.krev`: light pool in the grade colour (bursts, then breathes) + `kitItem` size **xl** (the kit graded
  frame) rising (`BAL.reveal.rise`) + name (display font) + `kitGradeChip` + optional "from" line. Inside dark motion overlays only.
- Pacing `BAL.reveal` (jbal2, ms): shake 420 · pause 700 · rise 550 · hold 1300 · shelf 380 · list 350 · gainMin 900 · fall 1300 · coins 900.
  kitReward: tap → shake → open → pause → for each item: rise + hold in the spotlight → shelf → … → list + Nhận (3 items ≈ 8 s; tap = skip).
### 54.2 kitLose · kitCoins — EVERY item that leaves her Tư trang, every silver loss (owner 08:20Z)
- `kitLose(entries, {why, title, text, to, bac})`:
  `sell` — the item (kitItem md) rises from the Tư trang tab and flies away; silver coins fly INTO the Bạc cell (`o.bac`), which glows.
  `give` — the item rises from the tab and flies up / away, fading.
  `lose` — lost / confiscated / robbed / bullied: a kit notice card (`kitPanel` kind notice, cls `klose`, queued after the open card) whose
  picture (kit panel `itemPic`) is the first item in the kit frame fading, greying and falling (`.kitem.klsfall`, CSS only; more items named in the text), title (Bị tịch thu · Bị cướp · Bị lấy
  trộm · Bị ép giao đồ · Bị soát phòng · Soát ra đồ bẩn · Mất đồ), the story line that removed it, "Mất khỏi Tư trang: …", "Đã hiểu".
  `fade` — gone with no story we can name: the item fades and falls by the tab, no card.
- `kitCoins("out"|"in", n, {x,y})`: silver coins `mo-coin-silver` fly out of / into `#hud-bac` (cell glows red / gold). `kitLose({bac:n})` = out.
- WIRING = ONE place: jfx `kmDiff` (every render). Gone entries = in the last snapshot, not in S.inv, not worn / veiled / pawned (`kfWorn`).
  Why: a tag set by the call that removed it (sellItem / wkSell / wdSell / wdPawn → sell; giveTo / wkGive / plantItem → give; useItem / wdWear /
  vlWear / wkPoison / takeItem / taintItem → use = nothing; inspect / search → lose), else the new log / queued card / result-card sentence that
  names the item (tịch thu · cướp · trộm · đòi / bắt nạt · soát / vứt · mất → lose; bán / cầm → sell; tặng / dâng → give; uống / dùng / đeo… →
  use), else fade. Silver: S.bac below the snapshot → coins out (purchases: kitGain reveal + coins out); sales → coins in.
  Entries ever seen (bag or worn) never re-reveal (taking a garment off, a veil off, redeeming a pawn = no kitGain).
- Off: "Cảnh động" off / reduced motion → no flights, the card still shows, chip/frames static; bots / quiet → nothing. Test `dev/test/item-lose.js`.

## 55. KHẢO HẠCH TẤN PHONG — promotion exam (owner 15/11 17:20Z, review/promo-exam · `dev/build/jexam.js`)
No new kit part: the exam is built only from existing parts.
- Rounds and result: the j82 game frame (`kg82Open` = `kitGameFrame`, `kg82Rows` = `kitRows`, `.kg82act` kit buttons, `kg82Play` engines,
  `kitGameResult` for the score table). The result's "Đã hiểu" is hidden by KIT 32.10 and the frame closes with the kit ✕ (jk4 kitOvBtn).
- Quiz rounds (Lễ nghi, Trị cung, Xử án, Thái hậu hỏi) use the j82 quiz engine with new question banks (`EXQ`); no CSS.
- Act card «Khảo hạch tấn phong» = an ordinary deck card (`cardH`: odds chip, Cần/Tốn rows, THÀNH / BẠI blocks); the BẠI block says the wait.
  Picture: ONLY its own act picture (ACTS.json «Khảo hạch tấn phong» → act-khao-hach-tan-phong.webp); with no own key the card gets no
  picture slot at all (`data-kexam` + kpActArt guard, `.kanoart`), never the category tile/picture (owner 14:30Z). Category word: Lễ nghi.
- Mệnh truyện › Sắc phong: the exam row is one more `kitChecks` row; status = `kitChip(text,"g"|"r"|"n")` in the `.ktop` row (as §46 header
  numbers) next to `kitInfo("Khảo hạch tấn phong")`; cold palace shows `kitEmpty` (no promotion card).
- Test: `node dev/test/promo-exam.js <url> [oldBuildUrl] [outdir|-] [sizes]`; next-rank scan: `node dev/test/promo-next-rank.js <url>`.
- Rules 15/11 20:05Z (review/promo-rules): son's birth = decree at once (`exSonUp`); daughter's birth = exam at once, conditions waived
  (`exGrace(p,"f")`); servant / ma ma road = the same exam run (`exRun`, card «Khảo hạch Nội vụ phủ», `BAL.ex.srvBar/srvCd`), NPC servants seeded roll.

## 65. PROMOTION REWARD · rank chest + kitPersonReveal (owner 15/11 20:05Z #9, review/promo-rules · `dev/build/jpromo.js`, after jitev)
Every rank-up, on every road, gives the new rank's FULL SET as real items (consort ranks: y phục + trâm of phẩm rank+1 via `wdGain(nvp)`,
Đeo tay, Túi thơm, extras `BAL.promo.extra[rank]`; servant road `BAL.promo.srv[rank]`), then two screens, queued after the j93 edict (kmPush):
- **65.1 the chest** = j93 `kitReward` (KIT "Chuyển động" #7) — consort ranks kind `chest`, title «Phẩm phục <rank>» (jmark adds the head mark
  «Dấu ấn»), servant road kind `pouch` «Đồ thưởng <rank>». Rows merge duplicates («Lụa Hàng Châu ×2»). No new CSS.
- **65.2 `kitPersonReveal({who, title, sub, line, btn})`** — one person presented: the full-body transparent figure (`kitFigOf`) big in the
  centre, body-fitted by `kitFigBody` (body = 90 % of the figure box, feet on its bottom line, KIT 33), the kit name (`kitName`), one cổ trang line,
  the kit button (`.kbtn.kmtake`, "Nhận"). Card = the SAME frame rule as the kitReward list (`.kmlist,.kprev-card` in j93, one rule). Short landscape (≤560 px): figure left, card right.
  Light behind the figure: the painted KIT §68 `orb` light (atlas frame 3, warmed by filter) under the figure, never over the face. HTML: `kitPersonRevealHTML(o)`.
  Used for «Nội vụ phủ phụ cấp người hầu» (the servant assigned at the rank-up: `prStaff`); reusable for any "a person is presented" moment.
- Sample page: §65.2. Test: `node dev/test/promo-rules.js <url> [oldBuildUrl|-] [outdir|-] [sizes]`.

## 66. RANK-CHANGE FX (owner 15/11 20:05Z #13) — `dev/build/j93.js` kitEdict / kitGloom
- **66.1 rank up** = `kitEdict` (edict, frame swap, chip old → new); the light gold glow on the new frame is PAINTED (KIT §68):
  `kitFxBurst("glowburst", frame)` + `kitFxLight("glow-gold", frame)` (screen blend on the dark stage); the sparks at the new chip are painted
  `spark` + `petal-peach` (j93 `kmSpark` now calls kitFxBurst for every caller: edict, tablet, reward chest). The old CSS gradient sweep and the
  code-drawn dots are removed (reviewer r1: owner rule "effects painted, code only animates"). The chest's inner light (`.kmlight`), the bloom
  glow (`.kmglow`) and the incense ember / smoke of the day shift are the painted `orb` / `ember` / `smoke` atlases (CSS only scales / fades / warms them).
- **66.2 rank down / cold palace** = `kitGloom({title, sub, who, from, to})` (to = -2 → cold palace): `kmRankDownHTML(p,from,to)` adds her portrait
  in the OLD frame, which fades to grey (`filter` on the painted frame; demotion: crossfades to the lower rank's frame), and the old rank chip
  splits along a cut (`clip-path` halves of the same chip) and its halves fall (transform/opacity); at the split painted cracked-jade
  shards burst from the chip (KIT §68 `kitFxBurst("jade", chip, 8)`), on top of jfx's `demote` moment (dim + jade + ash). The new chip («<lower rank>» / «Lãnh cung») comes up dim. Called by j93 kmDiff.
  Reduced motion / Cảnh động off: final state (grey frame, new chip). Sample page: §66.2.
- **66.3 Nội vụ phủ thu đồ** (review/scenes-3, owner OD:L374; `dev/build/jdemo.js`): after kitGloom, for HER the kit person dialog (kitPanel notice, subject = the Nội vụ phủ eunuch `pEunCourt("ped")`) with the decree line («Phụng chỉ: …»), «Mâm thu về» = the kit item tags (kitItemTag §70, class `kiev-own kiev-txt`) side by side in `.kdemo-tray` (one row, wraps), rows Vì sao / Bị thu / Lấy lại, button «Tuân chỉ». ONE rule for her and every consort: jdh2's weekly state check (cold / giang) calls `demoSeize(p,kind,why)`: worn jewellery above rank (IT.rk > rank; lãnh cung = every worn piece) and wardrobe tram / y above phẩm go to the Nội vụ phủ store (S.il.box, why "demote") and come home by themselves once she stands high enough (`demoReturn`, weekly). NPC consorts: same, data + news line. No new numbers.

## 56. SCENE LIGHT · KIT_LIGHT + stage classes `.kown` / `.kwet` + kitBookFigClamp (owner 11/15, review/scene-light) — `dev/build/jsl.js` (after jk4)
_(Renumbered by reviewer r7: this section was §41 on review/scene-light; main uses §41 for kitMeMark, §56 is scene-light's registry slot. Old refs "KIT §41.x" for scene light = §56.x.)_
One module owns how light/colour is applied to scene paintings and to characters on them. Nobody adds private `filter:` rules on `.scimg`,
`#mefig`, `.tok.fig .figimg` or `.kesimg`; change the knobs here instead.

**56.1 KIT_LIGHT (character light per buổi).** One CSS variable `--klf` (a list of interpolable filter functions) set on `:root` from
`S.buoi` + season by `KIT_LIGHT.sync()` (wrapped around `render`, `renderStage`, `kitEventStage`). Every character filter rule writes
`filter:var(--klf) drop-shadow(…)` (p1 `.tok.fig .figimg` / `#mefig`, j59 static halo / selection glow, jk4 `.kesimg`). Knob `BAL.klfStrength`:
**0 = characters keep their painted colours (owner choice A, default)**, .5 light, 1 full. `KIT_LIGHT.css(buoi, season, k)` returns the string.

**56.2 Graded scene paintings (stage classes).** A place whose painting is one of the per-buổi graded images (j94 `<name>-<season>-<buổi>`,
buổi ∈ sang|trua|chieu|toi) gets `.stage.kown`:
- `.stage.kown .scimg{filter:none}` — the old stacked filters (p1 `.sc-home.day` brightness 1.35 + sepia .12, j25 room tiers rp1 sepia .25,
  rp2/rp3 saturate) are NOT applied on top of graded paintings (owner 17:24Z: "her room at trưa all brown"). rp2/rp3 keep a tiny lift.
- j12 lightTick draws NO per-buổi wash on any scene (owner 16/11: every scene has 4-buổi paintings; `KIT_SCENE_TINT` and the b4Light override are gone). Only the weather washes (rain / snow / frost) remain.
- `.stage.kown.kwet` = wet weather (`wet()`: drizzle, storm, heavy snow) on a graded painting: **warm, soft light** (owner 12:35Z: spring rainy
  afternoon must not look like the cold palace) — painting grade + `.light` layer (z-index 0, **below** characters) a faint warm ivory gradient. Rain streaks come from j11 particles.
  Characters are never overlaid. Lãnh cung (`.sc-lc`) is excluded and keeps its bleak painting.
- `window.kitSceneTag()` re-applies the classes (called after `renderStage` and `lightTick`).
- **ONE scene grade `--kscf` (review/place-colour, owner 15/11 LUẬT SỬA CẢ NHÓM "check every place").** The only filter on a scene
  picture is the CSS variable `--kscf` on `#stage`, written by `kitSceneTag()` from `KIT_SCENE.grade(KIT_SCENE.state())` and used by BOTH
  backdrops: `.scimg` and the Pixi copy `.pxc` (on WebGL devices Pixi hides `.scimg`, so before this every `.scimg` filter — the wet-light
  lift, the rp2/rp3 lift — silently did not show there: phones and no-WebGL screens showed different colours). Grades (`KIT_SCENE.G`):
  dry `none`; wet day `saturate(1.05) contrast(.95) brightness(1.05)` + `.light` ivory `rgba(255,234,198,.10)→rgba(255,222,178,.06)`;
  wet night `saturate(1.02) contrast(.96) brightness(1.02)` + amber `.04→.05` (re-measured on every graded place: the r9 wet grade took chroma
  −1.7 on average, −3.5 on warm chiều halls = greyer; now chroma ±0, b* +1, L* +5); consort
  palace tier rp2 `saturate(1.04)`, rp3 `saturate(1.07) brightness(1.02)`; `sc-lc` (Lãnh cung, Tân Giả khố) always `none` (the bleak
  painting as painted). The old p1.html/j25 stacked rules (`.sc-home` brightness 1.25/1.35 + sepia .12, rp1 sepia .25, rp2/rp3 saturate
  1.3–1.4 + hue/sepia) are overridden for every picture, graded or not. Never add a `filter:` on `.scimg`/`.pxc` elsewhere: change `G`.
- Dry snow / frost on a graded painting: no cool `rgba(200,225,255)` wash on `.light` (it gave every winter place a blue-grey lãnh-cung
  cast); the frost edge (`.stage.frost` inset glow) stays. Lãnh cung keeps its grey weather wash.
- Characters: never under any scene layer — `.light` (z 0) and `.pxc` (z 0) sit below `.tokens` (z 1); figure filter is `var(--klf)` = 
  `brightness(1)` (owner 06:00Z choice A). Checked by the grey probe figure in the scan.
- Scan (LUẬT SỬA CẢ NHÓM): `node dev/test/place-colour.js <index.html> <OUT> 1180x820 0/2 "" nopx` (+ shard 1/2) then
  `python3 dev/test/place-colour.py <OUT> [<BEFORE_OUT>]` → every place × 4 seasons × 4 buổi × the season's 4 weathers + Dư đồ map +
  festival maps: filter chain, mean L*/a*/b* seen vs painted, grey-probe figure colour, flags, contact sheets, before/after table.

**56.4 Life-state place.** `kitLifePlace()` (jsl.js, run before every `render`/`renderStage`): in lãnh cung (`S.out`) the place is always
Lãnh cung (`coldVisit()`), a cung nữ serving in Tân Giả khố (`S.srv.lau>0`) is always in Tân Giả khố. Before, a new day left
`S.visit.k="home"` in lãnh cung, so a reload (`deser`) or any `S.place="home"` showed her old palace picture (Ngọc Thanh các).
Test: `node dev/test/life-place.js <index.html> <WxH>` (lãnh cung in session / new day / reload / back home, restored, promoted palace,
maid room, Tân Giả khố in session / reload / done, maid risen, old save).

**56.3 Full-body figure on the Tuần lục person page (owner 18/11 ~06:45Z ... ~07:20Z; overwrites the 17/11 narrow-column fit, the 18/11 "wide robes cropped" rule and every frame-shape idea of the same day).** LAYOUT = the live one (`--porf` column = `KBK_FIG_COL` .36, text column as live). SIZE = ONE body for everybody: SKULL TOP (kitFigBody `ht`, head-top table `img/fig-ht.json` / face mesh, dev/art/FIGURE_GATE.md; never crown, bun or hat) to FEET = column width / `BAL.bookFigW` (.343; her p.5 shot: Fold 641 px, iPad 534 px); kids by KIT_FIG.fac. NOTHING is cut and nobody is shrunk: a wide robe / sleeve / lantern spreads out of the column over the text area, the text (`.kbk-phead`, `.kbk-flow`, z-index 1) is drawn ON TOP of the transparent figure (`.kbk-por` overflow visible, z-index 0); painted left edge on the column's left edge. Crowns rise into the free paper; ONE feet line for all = the column floor, moved down toward the page's bottom line only as far as the tallest Hoàng hậu crown (`BAL.bookFrame.cRef` .072) needs to clear the running-head rule by `gap` px (never needed on Fold/iPad: gap 118 / 70 px), else the one body is lowered for all. `kitBookFigClamp` (jsl). Every figure needs its head-top row (c03 review canvases: `dev/test/fullbody-frame-c03ht.json`, merge into fig-ht.json at go-live). Test: `dev/test/fullbody-frame-scan.js` (spread <= 1 %, crown below the rule, cut 0). Step 1 = Tuần lục; other frames after the owner OK.
**56.4 EVERY frame with a full-body person (owner 18/11 ~07:50Z, step 2 of 56.3; "layout is OK, just paste the person at the right scale, cut nothing, the text may sit on top of the figure").** The layout of each frame is unchanged; only the figure changes, in the shared kit parts: `kitFullFigX(b, iw, cw)` (jkit: the ONE horizontal place: painted core centred on the column, painted left edge never left of the column's left edge, a wide robe spreads right) and the ONE body rule skull top (`kitFigTop`) → feet, the same for everybody of the frame, men NOT ×1.07, children by `KIT_FIG.kid(age)`. Places: centre pop-ups (`kszFigFit`, jksize: news / notice / info / rule / result / choice / night / intel / reward at M / L / XL), the Nội vụ phủ shop / pet care / several-person stages (`kitDpFit`, jk4), the coach and tips (`kitPersonDlgFit`, jpdlg), the identity card (`kpIdLay`, j79), the Tuần lục / Sổ luân hồi person pages (56.3). No figure column clips (`.kszfs`, `.kpdfig`, `.kpsubj.kes` are `overflow:visible`), no crop, no mask / fade; the text (`.k3right`, `.kpdr`, `.kpmain`, `.opts`) is z-index 1, the transparent figure z-index 0. The room is reckoned for the TALLEST crown (`BAL.bookFrame.cRef`, Hoàng hậu thaihau-h3-a36 .072) and a worn-title plate, never for the person shown: a taller crown (catalog max .132, maid m50 t8 a18) rises into the free space above the column and the name tag (z-index 2) stays on top; nobody is shrunk for an outlier. Frame cap too small for the XL figure → `kszFeetFit` scales ALL people of that frame by the same factor (never per person). Test: `node dev/test/fullbody-frames-scan.js <index.html> [outdir]` (cut 0, squeeze 1.000, spread ≤ 1 % per frame kind and size, over c03 t1/t6/t8, Hoàng hậu, tallest crown, widest robe, old wide maid, man, old emperor, SELF).
**56.5 HEAD AT THE CENTRE of the figure column (owner 18/11 ~09:25Z, KIT RULE for every frame with a person; same one kit part as 56.4).** `kitFigBody` measures `hx` = the x of the head (centre of the painted run over the first 12 % of the body below the skull top); `kitFullFigX(b, iw, cw, lim)` puts `hx` on the column's horizontal centre (fallback: the core centre). A wide robe spreads to BOTH sides, under the text (drawn on top). Only when the art would pass the frame's own left edge (`lim` = px the column has to its left inside the frame) the figure moves right by just that much: the scan reports that head offset (iPad choice with the tallest crown: 27 → 14 px; widest robe 21 → 2 px). Callers: `kszFigFit` (centre pop-ups), `kitPersonDlgFit`, `kitDpFit` (shop / pet / one person), `kpIdLay` (identity card), `kitBookFigClamp` (Tuần lục, lim = the page margin). SCROLL HINT (owner 09:25Z): the fade / «Kéo xuống» belongs ONLY to the scrolling text / option column (kitScrollCues skips any container with a figure column; short scrollers get an own strip below); the scrolling column may run OVER a robe that spreads under it, but the figure's own column rect never gets a fade, line or pill. Test: `node dev/test/figure-head-fade-scan.js <index.html> [outdir]` (head-centre offset px, cut at frame, cues over the figure column; Fold 755x1000 + iPad 1180x820).
**56.6 SCENE PICTURE SIZE (owner 18/11 ~16:10Z + 19/11 ~04:15Z "Hình minh họa của cái sự kiện này đâu?", CANON OVERWRITE; fullbody-frame s4 + ev-pic-fig).** Every event frame (`.k3ev`, every family) SHOWS its own scene picture; it is NEVER dropped (the old LAW-10 second step `data-evfit="x"` = hidden picture is gone). The picture is BIG (it fills what the text and buttons leave) ONLY while everything under it fits the frame with NO scroll. When the frame would scroll (info column `.k3right`, body, `#mb`, or the option list `.k3right>.opts` — the scroll owner of L/XL frames since 56.18, so its overflow counts too: `kszOver3`), `kszPicStep3(dlg)` steps the picture down `KIT_SIZE.v3.picLadder` = LL → NL → NM → NS (`KIT_SIZE.pic`, heights per `kitSzMode`), biggest first, stopping at the first class with no scroll; a class smaller than THE STRIP is used only when it removes the scroll. THE STRIP = `kszEvStrip3(box)` = the standard narrow strip ratio NM 300x84 at the column width, at most NL (Fold ≈ 304x85, iPad ≈ 602x140): when no class removes the scroll, and when the option list still scrolls (`kszEvLaw10`, `data-evfit="s"`), the picture is the strip (`dlg.dataset.picc="strip"`). Called by BOTH appliers (`kitFrameApply3`, `kitFrameApplyLive3`); `dlg.dataset.picc` = the class used ("" = big). The fit tests (`kitFrameFits3`, `kitFrameFitsLive3`) restore the picture style they measured with. Nobody sets a picture size per frame. Scans: `node dev/test/scene-pic-scan.js <index.html> [out.json]` (frame | content | picture class | scrolls) and `node dev/test/ev-pic-coverage.js <index.html> [out.json]` (every PEND event, maid + consort life, + Q kinds; picture shown / source own · room-placeholder · generic; exit 1 when a frame shows no picture), Fold + iPad. An event whose source is a placeholder (`ph-*`) or a kind banner gets a fitting painted scene in the ONE table img/EVENTS.json (`events`), else an ART ORDER to Foreman C.
**56.7 PHONE IDENTITY CARD = OLD APPROVED LAYOUT (owner 18/11 ~09:30Z "Trả về cái màn hình luân hồi cũ").** Her figure LEFT, ONE long vertical panel RIGHT (`.modal.kpfig.kpside`: panel width `min(560, screen − 16 − 12 − 140)`, height = the screen − 16). `kpIdLay` takes it on one page (`html.kv1`) whenever the screen leaves the panel `KIT_SIZE.v3.narrow.minRight` next to the smallest figure column (`KIT_SIZE.fig3.M.cw`) — Fold 755x1000 yes; 412 / 390 portrait phones no (figure ABOVE the panel as before). In this layout the ONE body of the screen is capped so the widest painted figure stands in the column whole (`KPID_WR` .5, the same body for every face).
- Test (committed): `node dev/test/book-col-scan.js <outdir> [shots]` — real week book at 755x1000, 1180x820, 1366x1024, 412x1058, 390x844: figure column / page, text frame width, relation table cut / header band / card background (must be 0).
- §52.2 compact (17/11, person-card left key): `kitRelTable(rows,{compact:true})` = `kitRelCompact`: per direction ONE flex line (`.kr2cl`): head (`.kr2ch`, direction colour) then pairs word + number (`.kr2ci`, never split, wraps between pairs); no box, no band; numbers keep §52 meaning colours.
- §52 'on paper': `kitRelTable(rows,{paper:true})` (every book page) = no header band, no card; header is a coloured line over a hair rule; boxes stack when the frame is < 430 px; a lone box takes the whole frame; a label never breaks inside a word.

## 60. MAKEUP COLOURS · kitSwatches · kitFaceZoom · colour layer on her pictures (owner 15/11 19:05Z, review/mk-colour) — `dev/build/jtoil.js` §60
Like modern dress-up / makeup games: the colours she picks at the morning mirror show in EXACTLY those colours on HER OWN pictures (portrait,
round avatar, stage figure, person dialogs, Tuần lục — every place `kitFxLayers` draws her) for the whole day.
- **Flow** (13.3): Hồi 1 dress → verdict → "Trang điểm" opens **CHỌN MÀU** (new step, no khắc): left = `kitFaceZoom` (her face live with the
  picks at the "đẹp" strength), right = `kitSwatches` with 4 rows, then "Trang điểm" (the 3 skill hồi, tools painted in her colours) / "Để mặt mộc".
- **Palette** `TOIL_COL` (cổ trang names, VANPHONG): Phấn mắt (hoa đào · hồng mai · ráng chiều · kim sa · nâu trầm · tử vi), Phấn má (hồng phấn ·
  hoa đào · hải đường · yên chi · ráng chiều · hồng sen), Son môi (hải đường · đỏ thắm · hồng đào · chu sa · mận chín · san hô), Màu mày (nâu trầm ·
  đen tuyền · thanh đại · nâu nhạt · khói). Defaults = the approved "đẹp" blush + lip colours.
- **Save**: `p.toilette.col = {mat, ma, son, may}` (only when made up). Old saves / bots: no `col` → `toilColFix` gives the defaults; unknown keys
  fall back too. The look rules are unchanged: a layer only for "đẹp" (score ≥ tier[1]) and "diêm dúa"; diêm dúa = the SAME picks, stronger
  NAMES (makeup-theme, owner 17/11 OD:L1553-1554): the screen never prints these ids or "đẹp/tuyệt/vừa/vụng"; it reads ONE source `TOIL_MK` (VANPHONG §1 makeup table): `moc` Mặt mộc · `vung` Vụng về · `vua` Đoan trang · `dep` Kiều diễm · `tuyet` Khuynh thành · `diem` Diêm dúa (overdone). Preset rows: `TOIL_STY` "Kiểu thanh nhã" / "Kiểu cầu kỳ"; a preset shows only its name, never its tone (OD:L1515).
  (`TOIL_MKS`: lip .86 vs .62, lid colour .70 vs .50 and higher toward the brow, outer wing, lower lash line, deeper brows, the round strong blush).
- **`kitSwatches({key, rows:[{k,label,sel,items:[{k,name,short,col:[r,g,b]}]}], onPick(rowK,itemK)})`**: one row per part — label (display
  font) + the picked full name (dim), then round colour swatches (30 px, a soft sheen) with the short name under each; picked = gold ring + gold
  tint (`.kswt-i.on`, `aria-checked`). Grid `auto-fill minmax(54px,1fr)`, wraps on any width. Tap → `onPick`. CSS `#kswt-css`.
- **FACE AXIS (owner 17/11 ~18:00Z, review/mirror-center r2)**: every place that centres a face in the mirror / a round frame centres `toilAxisX(file)` = the face's REAL centre read from the picture's own pixels (`toilEyePx`: centroid of the skin pixels of the heaviest skin run in the face band, async, cached; the fit files are NOT trusted: the mk-fit mesh sits on average 3.0 % of the picture width, up to 10 %, right of the painted face and the toil-fit mouth likewise). Until the pixels are read it falls back to the mesh minus that bias (`TOIL_AXIS_BIAS`). Users: the close-up camera `toilReveal` (also slides the standing figure by `--ktdx` so the axis lands on the glass axis of the plate, `TOIL_PLATE.gx` = the mirror's symmetry axis measured on the painting), the makeup board `toilGeom`, `kitFaceZoom`. Test: `node dev/test/mirror-center.js <url> <WxH@dpr>` (6 portraits).
- **`kitFaceZoom(p, file)`**: a round bronze-mirror frame (gold ring) with the face of picture `file` centred from `img/toil-fit.json`, the picture +
  `kitFxLayers(p,file)` (so the zoom shows exactly what every other place shows). 200 px (110 px beside the facts under 640 px). CSS `#kfzoom-css`.
- **Colour layer** `toilMkLayer` → `<img class="kmkl kmkc">` in the face-effects slot (order: picture < skin/blush SVG `kmkl` < colour layer `kmkc`
  < scar < veil), its box = the face region of the picture. Painted in a canvas FROM THE PICTURE ITSELF (`toilMkDraw`): lips (outer minus mouth
  opening), eyelids (layers from the lash line toward the brow; the eye stays clear), brows (only hair pixels darker than the skin) are recoloured
  to the picked colour with each pixel's own light/shade (highlights on the lip keep some shine), soft masks (canvas shadow, works on old Safari);
  output pixel = what makes mix(picture, layer, α) equal the painted pixel. Cache 80 layers; a not-yet-painted layer is a 1 px blank.
- **Anchors** `img/mk-fit/<face>.json` (face = `consort-c05`, `maid-m07`, `player-look1`…; loaded only for her face): 60 points per picture
  (lips 12+8, eye A 7+3, eye B 7+3, brows 10+10) in 1/4000 of the picture, made by `dev/art/mkfit/mkfit.py` (MediaPipe Face Landmarker on a
  face crop of every por-/fig- picture in toil-fit.json; sanity check against the toil-fit mouth; pair transfer por↔fig when detection fails).
  `dev/art/mkfit/md5.json` = CDN md5 measured on; after any re-crop/redraw run `python3 -I dev/art/mkfit/mkfit.py --stale` and cdn_sync the
  changed `img/mk-fit/*.json`. A picture without anchors keeps the older SVG lip oval in her colour (never guessed).
- **§60.5 FINAL-LOOK REVEAL** (D28, owner 15/11 23:30Z; rewritten owner 16/11 ~21:25Z OD; `toilReveal(info, done)` in jtoil.js, called by `toilFinish` before the result card; `kmStage` overlay `.ktrv-ov`):
  NO round frame. ONE camera (`.ktrv-cam` = painted room plate `img/toil-mirror-room.webp` + her FULL-BODY figure with today's dress + the same `kitFxLayers` makeup layers). Phase 1: the figure steps in on the room.
  Phase 2: the look effect from §68 (đẹp/tuyệt = plum + peach petals + a RIM light + `favour` chime; diêm dúa = stronger RIM light + sparks from her silhouette's edges + gold petals + `rankNew`; vụng = ink blot + smudge wobble + `mglose`;
  mặt mộc / vừa = plain daylight + `mirror`). Phase 3: the CAMERA ZOOMS (transform on `.ktrv-cam`, plate and figure together, face centred at 36 % height, face width ≈ 40 % of the short side) to a close-up of her face with the clothes still in shot, same background;
  close card = `kitRows` (Dung nhan tier · Kiểu preset · Hôm nay hint, `TOIL_HINT`) + the kit scene-end button. Light NEVER lies on her face: only `kitFxRim` (§68.7). Tap = skip to the zoomed state. Gọn / reduced motion: straight to the zoomed state + card.
  Co-op: nothing is sent. Test: `node dev/test/mk-reveal.js <url> <WxH@dpr> <dir> [looks]` (manual mode: `toilReveal({manual:1,…})` exposes `window.TOIL_REV {fx, go, zoom, close}`).
- Sheet: `node dev/test/mk-colour.js <url> <out.jpg> [face] [tier] [age]`; flow test: `dev/test/toilette.js` (palette step included).
  Kit page: sample "§60".

## 57. NUMBER DELTA · kitNumDelta / kitDeltaAuto (kit request from kit-fig2, KIT_REQUESTS.md; review/fix-float) — `dev/build/jkrel.js`
One inline change for anything that is not a person's relation ("Kho lúa −10", "nhà Hộ bộ thế lực +6", "Sủng +3"), the same family as
`kitRelDelta` (§52): `<span class="krd krd-n"><span class="krd-l">label</span> <b class="g|r|n">±N</b></span>`.
- Label in ink (weight 600, `kitGloss` when the word has a gloss); the number a whole number with "+" / "−", Được/Mất colour by what it
  means for her (`kpSent`: ghen +, oán + are red); no chip box, never wraps.
- `kitDeltaAuto(label, d, textBefore)` picks the right one: relation words (quý/với ngươi|ta, oán ngươi|ta, ghen, thiện cảm, thân) →
  `kitRelDelta` with the KIT_REL words ("Nàng → ta: thiện cảm", "Nàng oán ta", between two other people "thiện cảm" without a direction
  colour); anything else → `kitNumDelta`.
- The actor is always named (review r6): a bare "thân / thiện cảm ±N" right after another change of the same person toward me in the
  same sentence ("Nàng oán ta +2, thân −2", textBefore = the 60 characters before it) is that person's thiện cảm toward me →
  "Nàng → ta: thiện cảm −2" (or "<Name> → ta: thiện cảm"). Only a label the writer already framed ("hai người khác: thiện cảm")
  or one with no such lead stays the undirected "thiện cảm". Sample on the kit page §57.
- Used by every fact line: `kpChipify` (j79, overridden in jkrel) → `kitFacts` → news "Tin trong cung hôm nay", Tuần lục, panel notes,
  Bổng lộc row. New code that prints a change inside text calls `kitDeltaAuto` / `kitNumDelta`; boxed `kitChip` stays for chip ROWS
  (e.g. "Ta tuần qua"), never inside a sentence.


## 57.1 STAT FX · kitStatFx / kitStatGlow (owner 15/11 s8, review/stat-fx) — `dev/build/jstatfx.js` (after jfxkit)
Every stat / number change she can see, readable. ONE entry; replaces `popNum` (apply), `coinPop`, the result-card fly of `kfNumbers` and the old
gold `kfhit` flash (those now call it).
- `kitStatFx([{k,dv,name?,from?}],{src})`: `k` = top-bar key (sung danh suc bac duc sac tai tamco; other keys give a label only), `dv` signed, `from` = point/rect to fly from.
- Label carries NAME + delta ("Danh +2", `.ksfl.g|.r`, 1.02rem bold pill). Result card: label holds ~0.9 s then flies ~1.5 s to its cell; change with no card:
  label under the cell, held ~1.6 s. Several changes QUEUE (700 ms apart, 950 ms from a card, max 10); a tap anywhere skips (`kitStatFxSkip`).
- The cell then glows GREEN (+) / dim RED (-), 3 pulses over ~2.6 s, its number (.kstv) scales ~1.15x and takes the colour (`kitStatGlow(cell,dv)`; class `.ksf-g/.ksf-r`).
- The same change announced by two paths (apply + result card / coin) shows once (2.2 s window per key+delta, different `src`).
- Gọn (Hiệu ứng: Gọn) = glow only, no label; reduce-motion = steady glow (`.ksf-s`), no movement. Not run in `quiet` / bot.
- `kitStatSet` on a non-HUD cell/tile (person card, status sheet) whose number changes calls `kitStatDelta` = the same glow, so relation numbers on cards pulse too.
- Colour is by MEANING: gain green, loss red, never by row. `kcls` (j19) now matches whole words (`KWB`): "Thêu thùa" is no longer hostile (thù), "Nguyên đán" no longer
  "nguy", "truyền/truyện" no longer "truy"; a KÈM value that is an explicit gain stays green (`kemCol`). Scans: `dev/test/stat-fx-scan.py`, `stat-fx-scan.js`. Sample: kit page §57.1.

## 58. LỊCH THÁNG · kitMonthCal + kitDeskCal (owner 15/11 ~18:30Z, review/month-calendar) — `dev/build/jmcal.js` (after jevb, before j84)
A wall calendar so she can prepare for the festivals ahead. Registry: §58 (coordinator).
- **Source = FEST only** (j31 table + j71 `thanhtho`, hidden while `S.thDead`). Private contests, tea parties, private banquets and every
  other surprise event are not in FEST and never appear. Nobody adds a calendar entry anywhere else.
- **Time model:** the game has no day of the month (a turn = one tuần, `S.tuan` 0/1/2). Squares 1–10 = thượng, 11–20 = trung, 21–30 = hạ tuần.
  A festival sits on its traditional day (`MCAL.days`: Nguyên đán 1–3, Thanh minh 5, Đoan ngọ 5, Thất tịch 7, Lạp bát 8, Trùng cửu 9,
  Nguyên tiêu / Vu Lan / Trung thu / Thánh thọ / Đông chí 15, Vạn thọ 25, Giao thừa 30) when that day is inside the tuần FEST holds it in
  (FEST.t, the tuần the festival event really fires); otherwise on the first day of each of its tuần (Hội Phượng 1, 11, 21 — all month).
- `kitMonthCal({o})` → HTML; `o` = months from the current month (-1 = last month, 0..11 ahead). A normal PHONE MONTH VIEW (owner 21/11 ~03:43Z mark #42,
  review/calendar; the old wall of 13 month chips is gone, nothing may bring a month chip row back): header row `‹  Tháng ba · năm thứ nhất  ›` (date text from
  `mcMonName` / `mcYearName`, never typed; `(tháng sau)` / `(N tháng nữa)` / `(đã qua)` when not this month; two 44 px `kbtn alt .kmc-ar` arrows, `data-kmcm` = target
  month, disabled at -1 / 11; SWIPE the grid sideways = next / last month, with a short slide that respects reduced motion), then the grid: per tuần one light label
  strip (`Thượng tuần` + `kchip g` "Tuần này" + quẻ chip; the current tuần strip is gold = today, the game has no day inside a tuần) over 2 rows x 5 EQUAL SQUARE
  cells (`aspect-ratio:1`, days 1–30; 5 columns by default because the Fold dialog is only ~290 px wide, 10 columns gave 27 px squares; a container query (`.kmc` width ≥ 470 px = iPad) switches to ONE row of 10 per tuần, ~50 px squares, whole month without scrolling; grid capped at 560 px wide),
  festival cells = the festival painting `img/ev-fest-<k>.webp` (cover) + day number + short name (`MCAL.short`); other known days = tag + count + moon / cycle marks.
  Tap a day = that day's box below the grid (`mcDayBox`, kit rows); under it one `kitRows` table of the month's festivals (day | name · "còn N tuần" / "tuần này" / "đã qua").
- A festival square or list name opens the kit popover (`kpPop`, hover too with a mouse): name, day + tuần + time left, one line
  (`MCAL.line`), "Có thể thi" (the SC7 contests of its j71 pool FV7, same Thái hậu filter as fvPick), "Còn có" (wagers, banquets, gifts,
  rites), "Thắng thi" (`prize7`). Short; no paragraph.
- `kitMonthCalOpen()` = `kitModal({kind:"cal"})` (seal "LỊCH", no info picture column; `#modal.kmc-modal` widens the panel to 780 px).
- **kitDeskCal** (owner update): the painted desk calendar `img/kit/desk-cal.webp` (gpt-2-6, cut out; plain wooden `desk-cal-plain.webp`
  in lãnh cung / as a servant) stands in a corner of HER room's stage (`S.place` "home", or "lc" while `S.out`); never elsewhere. Size
  `KIT_DESKCAL` = 11 % of the stage height, 48–84 px (≥ 44 px tap). Corner order: bottom-right, bottom-left, top-left under the place title,
  top-right; the first one that covers no name tag, side card, title, chip, "+N"/"‹" page chip or figure body (figure box at 60 % width) wins (`kdcPlace`,
  re-run after renderStage and on resize). One tap opens `kitMonthCalOpen()`.
- No save data (old saves load unchanged). Samples on the kit page (#kit): §58 (this month), §58.1 (tháng giêng), §58.2 (both desk calendars).
- Test: `node dev/test/month-cal.js <index.html> [outdir] [sizes]` (opens from the rail "Lịch tháng" button; the room desk calendar is retired by jrail; 2 arrows ≥ 44 px, no chip row, 30 equal squares in 6 rows (narrow) or 3 rows (wide ≥ 470 px), swipe both ways, arrow disabled before last month; every month; no clipped
  text / overflow in any month; only FEST keys; popover on screen; Thánh thọ hides after Thái hậu dies; lãnh cung = plain; none away from home;
  390x844 = rotate prompt).

### 58.3 What she KNOWS on the calendar (owner 15/11 ~20:15Z, review/cal-plus) — `mcExtra(o)` in jmcal.js
Still NO private contests, tea parties, private banquets or surprise events. Each entry is one short line; ONE source per entry (read-only):
| key | tag in the square | where it comes from |
|---|---|---|
| bong | Bổng lộc | day 1 of every month (j20/jstip pay on the first day; "Nội vụ phủ phát đồ"); not on the servant road |
| thaiy | Thái y | only if `thaiyNextVisit()` exists (review/thaiy; number = wk, or {w} / {m,t[,y][,d]}) — nothing invented here |
| sinh / hh | Sinh thần / Thiên thu | her `S.bmonth` (j20 sinhthan, made at first read like j20 does); the Empress's rival entry `bmonth` (made once); she as Empress = "Thiên thu" |
| prep | Sửa lễ | the tuần before Vạn thọ / Thánh thọ: "Sửa lễ vật dâng …" (gift reminder) |
| due | Lâm bồn | `S.preg` once she knows (`!S.pregUnk`, j75): day 1 of month +(10 − preg); fake pregnancy says so |
| exam | Khảo hạch | jexam `S.ex.w0 / w1` (window open / last tuần), `cd` (may be considered again) |
| tuyen | Tuyển tú | j27: tháng hai thượng tuần of every third year |
| kexam | Con thi | j53 `KTE` yearly tests her children can sit (not the surprise "Khảo bài") |
| kid | Sinh nhật | each child's `bmo` (made once) |
| pet | Thú lớn | jpetcare `petcNext`: the tuần a pet is old enough for its next stage (+ "cần thêm tình cảm") |
| note | Hẹn | SỔ HẸN `S.calNotes` (58.5) |
| wx | Trời | next tuần's weather, only with a servant who reads the sky (age ≥ 40, else lanh lợi) — see 58.4 |
| friend | Hảo hữu | co-op: the friend's birthday, her known due month, her notes she chose to share |
| cy | (faint dot) | only if `cycleDaysOf(S, month)` exists (review/cycle): "Nguyệt tín", no tag, not in the list |
- Square: day number, moon mark (CSS circle: 1 sóc dark, 8 thượng huyền, 15 vọng full, 23 hạ huyền) top-right, "+N" when more than one thing,
  the first entry's tag at the bottom (`.kmc-tg`, order `MCX.ord`), festival squares unchanged (painting + name). Every square is a button.
- Tuần label: the quẻ she drew that tuần — `kchip` Cát (g) / Bình / Hung (r) (current from `S.lot`, earlier tuần from her log line "Xin xăm: quẻ …").
- 13 tabs: "Tháng trước" (o = −1, for her log) + this month + 11 ahead. The list under the grid = festivals + every entry but bổng / cycle.
### 58.4 Weather from the world seed
`rollWx` (j12) draws its entry by `mcWxIdx(year, month, tuần)` = hash(Hoàng thượng's name + date) instead of Math.random, so a forecast is
true and both co-op players see the same weather (S.wx is a world key). Distribution stays uniform per season.
### 58.5 Day box + SỔ HẸN
- Tap a day → `.kmc-day` under the grid (re-drawn in place, scrolled into view; a festival square also opens the 58 popover): kit rows of the
  day (festival, moon rite, entries, quẻ), the festival check list `kitChecks` (58.6), "Tuần ấy, sổ đã ghi" = her log lines of that tuần (≤ 6,
  past and current tuần), and on today / future days the SỔ HẸN form: `kitInput` + 4 preset `.kbtn.alt` + `.kbtn` "Ghi vào sổ" (+ co-op
  `kitToggle` "Cho hảo hữu cùng thấy"). Notes: ≤ 48 characters, ≤ 40 kept, "Bỏ" removes one.
- Reminder: at the start of the tuần before → kit notice "Sổ hẹn · Tuần sau"; on the tuần → "Tuần này" + a log line "Sổ hẹn: …" (once each).
### 58.6 Festival check list `mcPrep(k)`
From its FV7 pool (Thái hậu variants dropped after her death): contests in two lines: ✓ "Thi đã sẵn: …" (her SC7 score ≥ 50, "phong độ tốt") and ✗ "Thi chưa sẵn: …";
gifts (P) → ✓ when Tư trang holds an item the receiver likes (IT tg), wagers → ✓ with ≥ 20 bạc. Unmet first. The popover adds "Sửa soạn: N/M đã sẵn".
- Old saves: new fields are lazy (`S.calNotes`, `S.calNoteN`, rival / kid `bmonth` / `bmo`, `S.bmonth` as j20). Samples: §58.3 (this month, a day picked).
- Test: `node dev/test/month-cal.js …` checks 13 tabs, every square a button, the day box on every size (no overflow / clipping), a note saved
  → listed → reminded, the forecast equals the next roll, entries of a pregnancy / exam / pet / kid, and the cycle / thái y hooks when stubbed.

## 64. ITEMS IN EVENTS · kitItemTag · kitItemFx (owner 15/11 ~18:10Z, review/item-events) — `dev/build/jitev.js` (after jfx) (registry: coordinator)
Owner rule: every event where an item could come into her hands shows the ITEM'S ICON in the dialog, and each choice acts on it with an animation.
### 64.1 ievOf · kitItemTag — the item in the dialog
- `ievOf(m)` → `{I (kitItemInfo §54.1), e, key, acts[], who}` for a dialog (Q[0]); null = no item. ONE resolver, used by the game (showModal /
  chooseM) and by the scan: `m.item` (explicit) · `IEV_PID[pid](pp)` (giftin / pgin: the real entry pp.e; cnvBribe: silver; story beats with `gi`;
  `false` = never an item, e.g. tsbPetGift; tsbBul: her demanded entry, "Giao" = give) · econ `STIP_EV` goods events (E68: the options in `no` give the gift back) · nouns in the dialog
  title / text / option names (`IEV_NOUN`, specific first) when at least one option acts on the item.
- Option act = `o.ia` (explicit) · the resolver's list · `IEV_OPT` text overrides · the EARLIEST verb of the option name (`IEV_VERB`):
  burn · tear · smash · pour · well · bury · back · refuse (= back only when the item is offered to her) · give · use · keep. Idioms are excluded
  (giữ kín / giữ phép / giữ lời…, nhận lời / nhận lệnh / nhận tội…, chôn chặt, "đã đốt", giả vờ nhận). Buttons carry `data-kia`.
- `kitItemTag(I)` → `.kiev` holding ONE `kitItem` size md (the kit graded frame: picture, grade chip on its bottom edge, name, grade background) — no private frame.
  Place: on the event banner (`#mb > .kdlgart .ksart`, bottom-right, `.kiev-ban`), else floated at the top of the text column (`.kiev-txt`).
  Phone landscape (height ≤ 500) uses 56 px.
- Story items with no IT entry are real IT items now (pr 0, `story:1`, art img/item-<k>.webp + item512, gpt-2-6): Bức thư `thu`, Mật thư `matthu`,
  Mảnh giấy nhắn `giaymat`, Tín vật `tinvat`, Khăn tay lụa `khantay`, Chén thuốc `chenthuoc`, Bát canh `batcanh`, Lệnh bài `lenhbai`,
  Tập sách chép tay `sachchep`, Cành hoa ép `canhhoa`, Hình nhân bùa ngải `hinhnhan` (il: đồ cấm, soát ra là tội).
### 64.2 kitItemFx(act, I, {from, to}) — the animations (shared; any module may call it)
| act | what plays | ms (`BAL.itev`) |
|---|---|---|
| keep | rises, arcs into the Tư trang tab, tab glows (the kitGain flight path, §54) — a REAL entry in S.inv | 900 |
| back / give | arcs to the person (the dialog figure; `to`), shrinks, fades; no figure → off the left edge (back) / up (give) | 1000 |
| (give target) | give flies to the dialog figure only when the option names that person (`.kpsn` name in the option text); "đem cho cung nữ", "nộp Hàn lâm viện", "dâng Thái hậu" with another person shown → up (r1) | |
| probe | an option whose outcome decides (giftin "Đem đến Thái y viện"): after the choice, a new entry of the item in S.inv → keep, else give (up) (r1) | |
| burn | sepia → charred, burn front (`.kievflame`) climbs, the paper is eaten from the bottom, embers rise, ash falls | 1400 |
| tear | splits along a jagged line, halves tilt apart and fall, paper scraps | 1100 |
| smash | shakes, 5 shards fly out and fall, dust | 1100 |
| pour | tips over (−115°), dark drops fall from the lip | 1200 |
| well | thrown in an arc, shrinks, sinks; 3 ripple rings + splash | 1300 |
| bury | drops, sinks into a rising earth mound (`.kievmound`), dust | 1300 |
| use | brightens, rises, dissolves in sparkles | 900 |
- Parts: fixed clones `.kievfx` (WAAPI transform/opacity/filter/clip-path), particles on the jfx Pixi layer: new `KF_SPAWN` kinds `embers`,
  `ashfall`, `scraps`, `dust`, `drops`, `splash` (budgeted by `kfBudget`, off with the rest of the FX kit). Gentle court style, 0.9–1.4 s.
- Tap skips: while an animation runs, a transparent catcher `#kievcatch` takes the next tap and finishes every animation (it never reaches the
  dialog under it); it removes itself when the last animation ends (safety 2.2 s). `kitItemFxSkip()` does the same from code.
- Off: "Cảnh động" off / reduced motion → no flight (keep still adds the item, the tab glows); bots / quiet → nothing.
- Silver (bribes, `vangbac`): keep = `kitCoins("in")` from the icon, no item.
### 64.3 Wiring (one place) and the claim rule
- showModal (wrapped): resolves Q[0], places the tag, sets `data-kia`. chooseM (wrapped): reads the icon + figure rects, runs the choice, then
  the act. While the choice runs, goods of THAT item added by the choice (econ goodsGive box, kmDiff → kgGroups reveal) are CLAIMED: no second
  box / reveal — the flight from the dialog is the reveal; an entry the choice removes leaves with the act, not with kitLose's bag fly (give / sell / fade); a forced loss (jtsb tsbBul "Giao") keeps its §54.2 notice card after the flight. A dialog that already draws the item in the kit frame (jtsb `.tsbtile`) gets no second frame: that tile is the flight source.
  keep with nothing added by the choice → the engine adds the entry (`from` = giver / story); except dialogs that own the outcome (`own`: giftin,
  pgin — a poisoned dish eaten or thrown away adds nothing → the act becomes `use`). A story item (IT `story:1`) she kept earlier that a later
  choice sends back / destroys is taken out of Tư trang for real (no §54.2 animation: the act shows it).
- Options stay in cost mode (§53 opt-render untouched: the tag is outside `.opts`).
- Tests: `node dev/test/item-events.js <url> <outdir> [sizes] [save]` (real dialogs: gift, poisoned / plain dish, econ goods events, story
  letters / tokens / dish / jade with every act; frame + grade, acts, real entry, no double reveal, tap-skip, overflow, cost mode);
  scan `node dev/test/item-events-scan.js <url> dev/review/item-events-table.md [--fail]` (every E68 variant, ARC67 + GB67 beat, j97 rare,
  PEND builder: event → item → choice → act; fails on a destroying/handing choice with no item found, or an item without a picture).
- Kit page (§47): sample "§64" = every story item tag + one button per act.

## 62. NIGHT-END + NEW-DAY PICTURES · kitNightEnd · kitNewDay (owner 15/11 19:35Z, review/night-end) — `dev/build/jne.js` (after jevb, before j84)
Owner: a closing picture for each night shows the END-of-night mood (never the bedding act, no faces), how the night moved the Emperor's
mood (liked / did not like) and the rewards; sound + light by mood; a new-day picture by season / festival when no bedding night.
- **kitNightEnd({tier, m0, m1, before, items, line})** — a kit motion stage (j93 kmStage, queued with kmPush, id `#kneov`): the picture
  (4:3, `img/kit/ne-night-<tier>.webp`, framed like every kit picture: gold line + parchment ring) with its light layer, the title
  (Đêm mặn nồng · Đêm êm đềm · Đêm lạnh nhạt), one line, then the kit list panel `.kmlist` = ONE `kitRows` table (§51): Hoàng thượng |
  mood before → after · ngài hài lòng / bình thản / không vui (g / n / r), Được / Mất = `kaResultRows(before)` (Sủng, Ân tình, Danh, Bạc …
  before → after), Kèm = `kitKemRow`; reward rows = `kitItem` sm + `kitGradeChip` + name (the kitReward list row). Button Nhận (reward) /
  Tiếp tục. Tap during the picture = show all; tap outside the list after = close. On close each reward item flies to Tư trang
  (`kitFlyItem`). It REPLACES the night's result toast ("Đêm thị tẩm") and the pillow-talk option's toast; the bestow tray (`kitReward`) is
  held during her night and shown on this card instead (no double reveal).
- **Tier rule** = `BAL.nightEnd` (jne): points = the night's own score `s` (j8 night1: prep + talk fit + his mood + luck, −2 confiscation)
  + toilette today (jtoil makeup `tuyet` Khuynh thành / `dep` Kiều diễm +1, `vung` Vụng về / `diem` Diêm dúa −1) − 2 if the pillow talk lost her Sủng or Ân tình − 2 if she is ill;
  ≥ 6 mặn nồng, ≥ 3 êm đềm, else lạnh nhạt. His mood after: warm one step better, cold one step worse (never to giận dữ), normal unchanged.
  `window.kneLast` = {tier, pts, why[], m0, m1, items} for tests.
- **kitNewDay({host, night, day, wx, then})** — plays inside the week panel `#dawn` BEFORE the Tuần lục book (j87) when she had NO bedding
  night in the tuần that ended: beat 1 the lonely night (`ne-night-lonely`; Đêm không được triệu: "Đêm qua Hoàng thượng nghỉ ở cung X" /
  "không lật thẻ bài nào" / "Thẻ bài của ngươi được lật, nhưng đêm qua ngươi không hầu giá" / stolen on the road / lãnh cung; or Đêm theo lệ:
  mùng một / rằm at the Empress's palace — j75 nightWhy causes), beat 2 the dawn: season `ne-dawn-<xuan|ha|thu|dong>` or, on a festival
  day (`festToday`), that festival's own band picture `ev-fest-<k>-b.webp` ("Sáng <tên lễ>"), the day's weather drifting over it
  (petals / plum / maple / snow / rain / fireflies by `S.wx`). 2.2 s + 2.4 s (`BAL.nightEnd.lonelyMs/dawnMs`), tap = skip to the book.
  Not for a servant (isSrv: lonely beat skipped only) — a bedded tuần shows no beats (the night card closed that night).
  **FULL SCREEN (owner 21/11 mark #84 «Sang buổi»: picture FULL screen on phone + iPad, title + Tiếp theo on the picture, no black background; review/ending-screens-2):**
  every beat is THE full-screen picture of KIT 81c (`.kne-pic.kfull`: covers the whole screen, no frame / border / dark band, soft top + bottom shade);
  title + line (`.kne-cap`) and the ONE kit button «Tiếp theo» (81, `.kmend`) lie ON the picture, the title just above the button. Picture = the
  portrait `<name>-port.webp` (phone, kv1) / landscape `<name>-land.webp` (iPad, kv2) once listed in `img/INFO.json` (ART REQUEST Foreman C), until then
  today's 4:3 painting cropped to fill around its focus (FOC). The night-end CARD (kitNightEnd) is a result card and keeps its framed 4:3 picture.
- **Sound** (kitSfx when review/sfx is merged, else j11 sfx): warm sfx-zither + vo-f-laugh-soft-1 · normal sfx-wx-crickets + sfx-night ·
  cold sfx-candle-out + vo-f-sigh-1 · lonely / custom sfx-night-watch (mõ canh) + sfx-wind · dawn sfx-wx-birds (đông: sfx-wind); j18 bell
  still rings with the book. **Light (r2, painted only, §68):** `kitFxLight` clips placed INSIDE the picture at the painted light source (LIGHT table in jne):
  warm candle flicker + painted peach petals · normal candle + painted fireflies (orb) · cold candle gutters out + moonlight fades in, NO
  particles, no celebration (j11 nightFx's night/favour bursts are held during her night) · lonely lantern dims + the season's drift
  (petals / fireflies / leaves / snow) · dawn glow-gold rises + the day's weather (painted petal / plum / leaf / snow / streak-rain /
  orb-firefly frames of the §68 atlases). Particles are DOM frames clipped to the picture: they never cover the words or the list.
  Gọn / reduced motion: still lights (poster), no particles, same texts.
- Layout: column (picture over list) everywhere; landscape up to 900 px high (phone 844x390, 1000x755, 1180x820) = picture left, list right.
  The Nhận / Tiếp tục button sits under the list (outside its scroll): always on screen (844x390 included); the list scrolls.
- **62.3 In-night pictures by tone (owner s8):** the pillow-talk dialog (night2) shows `ev-night2-warm` (close) when the night
  score s ≥ 6, `ev-night2-tender` (hand in hand; both drawn by review/pic-dupes) when s ≥ 3, else `ev-night2` (apart) — same thresholds as its j8 text
  (kitEvBanner wrapper in jne). ksp / prep keep their own banners; night1 (quilt carry) belongs to review/pic-dupes.
- **62.4 One pop-up look (owner s8):** the night dialogs (.modal.night) use the same light paper kit panel as every pop-up; the night
  feel = jbd backdrop picture + ĐÊM seal only. Scan: `python3 dev/tools/dark_panels.py index.html` (0 dark panel rules).
- Art (gpt-2-6, folder ba4aecfe, no faces, light/dark by tone; r2 redraw 1536x1152, ids `dev/art/night-end-r2-gens.txt`):
  `img/kit/ne-night-{warm,normal,cold}.webp`, the lonely night PER SEASON `img/kit/ne-night-lonely-{xuan,ha,thu,dong}.webp`,
  `img/kit/ne-dawn-{xuan,ha,thu,dong}.webp`; festivals reuse the 14 `ev-fest-<k>-b.webp`. Each picture has a focal point (FOC in jne)
  → `object-position`; portrait screens show the dawn / lonely beats in a 3:4 frame cropped around it.
- **62.5 Follow-ups (owner 15/11 21:10Z, L666–669):** rằm (trung tuần) / festival nights show `img/kit/ne-night-ram-{warm,normal}` /
  `ne-night-fest-{warm,normal}` (cold keeps `ne-night-cold`; the line names the festival). The lonely beat when he slept at another palace says
  the music drifts from it (stranger rule: an unmet consort is not named) + soft zither. Morning after (save field `S.neMorn {d, tier}`, old saves:
  absent → nothing): mặn nồng → dialog "Kính sự phòng ghi sổ" (Danh +`BAL.nightEnd.after.warmDanh`); lạnh nhạt → "Lời ra tiếng vào" (Danh
  `coldDanh`) with the jtoil reaction buttons Nhẫn nhịn / Cười trừ / Đáp lại. Bots / no UI: the Danh change only.
- **Loading:** a painted 32x24 thumbnail (inline LQ) shows blurred at once; the picture fades in on load; the card / beat waits at most
  `BAL.nightEnd.wait` (700 ms) for it. Never an empty frame.
- **Scene rule (owner 15/11 ~21:45Z, all full-scene pictures):** every full-scene picture serves landscape AND portrait screens. Paint
  landscape, high-res (≥ 1536 px wide), the subject inside a centred safe zone; store a focal point per picture and crop portrait screens
  (755x1000 = 3:4, 9:16) around it with `object-position`. **Painted only (owner):** every picture, light and particle here is PAINTED art
  (Magnific gpt-2-6); code only animates painted sprites (transform / opacity / filter) — no CSS-gradient glows, CSS dots or lines as art.
- Kit sample page: §62 (all 9 pictures + "Xem thẻ đêm" opens a sample card). Test: `node dev/test/night-end.js <url> <outdir> <WxH,…>`.

## 67. LẬT THẺ BÀI · kitCardFlip — the end-of-day card-flip scene (owner 15/11 20:50Z, review/cardflip) — `dev/build/jflip.js` (after jsfx, before j84)
Replaces j93 piece 1 (kitFlipTablet / kitFlipNote: muted while `flip()` runs). Played once per week after the tablet is decided
(j8 `flip` → j75 `S.nightWhy` → j93), through the kit motion queue `kmPush`, after the week panel / Tuần lục book / title (never over them).
- Painted art only (gpt-2-6, folder ba4aecfe, CDN `img/kit/`): `cf-gplate-ksp` (Kính sự phòng, the Emperor's tray: vermilion lacquer rim with gilded gold peonies, pale champagne-gold silk floor, soft lamplight; owner 16/11 15:05Z: gold is allowed but natural lacquer + gilt in the game's painting style, never flat yellow) → `cf-gplate-emp` (same tray on the Emperor's desk), each as a landscape 1600x1200 and a portrait 1200x1600 picture (`-p`, used when screen w/h < .95; the portrait tray is taller so 20+ cards plus name tags fit); `cf-hand-emp` (his hand, yellow dragon sleeve, no face, cut out); `cf-seal-thitam` (cinnabar seal THỊ TẨM). The older yellow `cf-plate-*` files stay on the CDN only for builds that predate review/tham-flip-ui. Code only moves / fades / filters them.
- Geometry: `BAL.cardFlip.plates.{l,p}` = per picture the tray FLOOR (measured from the pixels) + the tray RIM (safe zone). The plate box is
  fitted so the rim stays on screen; card slots are computed in the same box → cards sit on the floor at every aspect (2..20+ cards: the
  biggest card that fits in 1–5 rows). The plate's own picture lies over the cards in soft-light (painted lamplight on them) + a soft shadow.
- Cards = each eligible woman's OWN kit frame (`mdH` → pcPort cell: frame, portrait, jade pendant, tassel) by HER knowledge (j61: unknown =
  grey silhouette, name "???"). Deck = j75 `S.nightWhy.rows` (alive, in the palace) + the co-op friend; sorted by rank.
- Beats (`BAL.cardFlip.t`, others' nights ×`other`): all lit → barred cards (nightCh 0; monthly cycle via `inCycle(p)` / `cycleDaysOf(p,month)`
  when review/cycle is in) grey and are lifted out → the rest re-arrange → "carried to the Emperor": plate A cross-fades to B under a slow
  drift, cards glide to B's floor → his hand reaches in, the card he turned lifts, glows (filter glow + §68 `kitFxLight("glow-gold")`) and
  grows to the centre, the others dim → result chip (j93 `.kmres`). Hers: seal stamped on her card, §68 `kitFxBurst("glowburst"/"spark"/
  "petal-peach")` (fallback: jfx `kitFx("decree")` + painted mo-petal-peach), sfx-win + bell.
- Truth: the scene shows j75's result, never changes it. `S.nightWhy.flip0` (j75, 2 lines) = the card he turned; a steal inside j8 flip is
  recorded by a `stealNight` wrapper. Turned ≠ final night → the chip says why (custom: nightWhy text "Hôm nay là rằm: theo lệ…"; stolen:
  "Giữa đường, Hoàng thượng bị mời sang cung khác.") and who has the night. No flip → "Đêm nay Hoàng thượng không lật thẻ bài nào."
- Wording (VANPHONG): Kính sự phòng dâng thẻ bài · Thẻ bài người không thể hầu giá được rút ra · Thẻ bài được dâng lên Hoàng thượng ·
  Hoàng thượng lật thẻ bài · Đêm nay ngươi được thị tẩm. · Thẻ bài của ngươi được lật. · Tối nay: <bậc> <tên> / được chọn hầu đêm nay.
- Tap while it plays = the final still; the scene never closes by itself or by a tap: it ends with ONE kit button `kitSceneEnd` (§81): "Chuẩn bị thị tẩm" when she is picked (`pick=="me"`), "Ta biết rồi" otherwise (owner OD:L1261, 16/11). Reduced motion / Cảnh động off = the final still only. Phone landscape
  (h < 560, w/h > 1.5): card left of centre, chip on the right. Servant road, bots, `quiet`: no scene. No save state (old saves load).
- Co-op: the friend's card is on the tray (her real eligibility); the scene waits while `COOPW.pend` so both players see it when the merged
  week arrives. Each player's pick is still rolled locally (protocol unchanged).
- **KIT PART `kitEmpHand(handEl, cardEl, {still,time})` (§67b, review/flip-hand; owner 16/11 17:40Z: "bị nhỏ, bị cắt, giống như dán vào" → "có một người thò tay vào").** The ONE Emperor's hand: painted `cf-hand-emp` (sleeve + hand, no face), used by every scene where his hand appears (today only the card flip; any new scene calls this part, never its own hand). Markup `<div class="kcf-hand"><img class="kcf-hs"><img class="kcf-hi"></div>`. Rules: (1) size comes from the SCREEN (`BAL.cardFlip.hand`: ≥ `h` card heights, ≥ `minH` of the screen height, ≤ `maxH`), never a small sticker; (2) the sprite is turned `rot`° about the pinch point so the forearm runs straight up, and its height is raised until the two sprite edges that carry the sleeve (left edge rows 0..`cutL`, top edge columns 0..`cutT`, measured from the pixels) lie ABOVE the top of the screen → the arm always enters from the screen edge, no cut edge is ever visible, no fade-in; (3) motion = slide in along the arm (ease-out `reach`), a small touch-down dip (`press` card heights), rest until the card is picked, lift WITH the card by the same pixels (`lift`), leave the way it came (ease-in); (4) a soft blurred shadow (the hand's own silhouette, `.kcf-hs`, offset `shadow.dx/dy` of the hand height, wider while it is high) lies on the tray, and the picked card throws `.kcf-cs` (soft dark pad, offset 5/9 cqw) while it is up; all transform/opacity only, no extra WebGL, no filter animation. A longer sleeve or a different pose is an ART REQUEST to Foreman C (`Emperor hand + sleeve, long, cut-out`), never drawn here.
- API: `kitCardFlip({deck:[{id,p,bar}],pick,turned,resHTML,onEnd})`, `cfDemo(n,barred,who)` (kit page §67 "Xem lật thẻ"), `cfGrid(n,W,H)`.
- LABELS UNDER THE RAISED CARD (s22 kit request: Fold 755x1000 row labels overlapping under the raised card; iPad 1180x820 a faded label through
  the result chip): (1) `.kcf-mine` is TWO things — the white glow `<i>` on her card AND the overlay class of her night; the glow rule now targets
  `i.kcf-mine` only (before, the overlay itself took left 8.5 % / top 17.8 % / 83 % × 54.4 % and the whole scene shrank into a box on her
  nights: tray, cards and labels stacked under the raised card). (2) `coverTags` hides the name tag of EVERY other card whose box meets the
  picked card's final centre rect (its open lower part: tassel + own tag) or the result chip (`.kmres`), measured after the chip is shown
  (+ once more after the chip's pop). Test `dev/test/kit-fit2.js` flipme / flipother: visible tags overlapping each other / the picked card /
  the chip = 0.
- SMOOTHNESS + CALM (owner 16/11, review/cardflip-smooth; iPad "giựt" + "too fast"): (1) only transform / opacity / filter move; no `mask-image` on the moving
  box (edge fade = static `.kcf-vig` overlay), no soft-light blend of two full plates over the cards (= one static `.kcf-lamp` gradient); (2) plates + hand + seal are
  loaded AND `img.decode()`d before the scene starts (`preload`); (3) `will-change` only while the scene runs (`.kcf-act` on the overlay, removed at the final still /
  close; the drifting plate box only during the carry); (4) every card state uses one filter chain (grayscale sepia saturate brightness drop-shadow) so states interpolate;
  (5) card moves are batched FLIPs (`glide`: all reads, all writes, all reads = one layout, not one per card); (6) the turned card is NOT re-parented (no childList
  mutation for the many body MutationObservers while it moves); (7) reduced motion / Gọn (`kmReduced`) = final still only (unchanged).
  Timing = `BAL.cardFlip.turn` {lift 400, move 750 → the flip is 1.15 s (others' nights ×.82), ease cubic-bezier(.45,0,.55,1) = soft ease-in-out, pause 600 = the face rests
  before the reveal words / seal / burst / glow}; `t.centre`, `t.res`, `t.end` are derived from it (change `turn` only).
- REVEAL LIGHT = THE WHOLE FRAME GLOWS + SLOWER (owner 16/11 12:00Z, review/cardflip-glow2; replaces the running ring light of cardflip-glow): the old reveal sat on the portrait and hid the face, the next one ran painted glows round the ring ("như chơi casino"). Now `edgeLight()` (only caller: `showRes`) adds ONE `.kcf-halo` div hugging the frame ring's rectangle (`BAL.cardFlip.edge.path`, fractions of the card; `rad` corner, `blur`/`spread` glow size, `op` / `lo` opacity range): a soft warm gold box-shadow glow + thin bright rim around the WHOLE frame at once, nothing moving along it, no sparks. It breathes slowly (`edge.breath` 3600 ms ×`slow`, opacity only, until the scene closes). Nothing is drawn over the portrait window. Gọn / reduced motion: the same glow stands still. RULE for the whole game: a frame light is always the whole frame glowing, never a light that runs / chases / orbits a frame. Timing ≈1.75× cardflip-smooth: `BAL.cardFlip.slow` 1.75 scales every hard-coded motion (arrive, lift-out, arrange, carry, drift, hand, CSS fades via `--kcf-s`); `t`, `turn` {lift 700, move 1300, pause 1100, tail 4200}, are the slowed numbers. Her card: reveal at ≈10.7 s, animation ends ≈14.9 s, then waits for the button (others' nights ×.82).
- NAME UNDER EVERY CARD + HER CARD'S WHITE GLOW (owner 16/11 14:00Z + 14:05Z, review/tham-flip-ui): under every card the kit name tag `kitNameRank(rank, name, rankColour, me, small)` (KIT §48: rank in its jewel tone over the name, no title, plain vivid text, no glow: the tray floor is a pale silk surface = the paper rule 48.1h; HER name = bold black `.kmy`; unknown = rank + "???"). The tag is `.kcf-tag` inside the card box (`.kcf-c`, container `cqw`), outside the filter part (`.kcf-f`) so it never gets the card's dark drop-shadow; the picked card shows the larger kit size right under its frame. (review/tham-flip-ui-r1: top 79 % of its box, below the frame; `coverTags()` in jflip hides the tag of any other card that the picked tag / tassel column would cross, because the result chip already names the pick.) `grid()` reserves `TAGH` px under every card and never makes a column narrower than `TAGW` (so two names never overlap). One card per person: `cfDemo` caps n at the roster. HER card on the tray (`.kcf-mine`, from the very start, static, whole frame, never over the portrait, hidden when it becomes the gold reveal halo): a soft WHITE glow so she knows it at a glance; co-op: each player's own card (`c.p===S`).
- Test: `node dev/test/cardflip.js <url> <outdir> 755x1000,1000x755,1180x820,1366x1024,844x390 2 few|all` (real week end, beats measured in
  page time, cards inside the floor, picked card on screen, chip never over it, 22 + 2 cards, reduced motion, old save, page errors).

## 59. PLACEHOLDER PICTURES · KIT_PH · kitPhTone (owner 15/11 ~18:45Z, review/placeholder-pics) — `dev/build/jph.js` (last module)
Generic palace still-lifes (Magnific gpt-2-6, no people, no faces) stand in for every EVENT or ACT that has no picture of its own, so the
owner recognises "this one still lacks its picture" in play. They are deliberately emblematic (no scene, no people) so they never look like a real picture.
**ONE SET PER REAL ORIENTATION AND SIZE** (owner OD:L1343 7.3 / OD:L1439; K-ICO-2, review/kit-ico-rank; art Foreman C, 2x the slot), each in light + dark:
| set | files `img/ph-<o>-<tone>-<size>.webp` | slots (KIT_SIZE.pic §84) |
|---|---|---|
| portrait 3:4 | `ph-p-{light,dark}-{ps,pm,pl}` 168x224 · 240x320 · 324x432 | PS 84x112 · PM 120x160 · PL 162x216 (act cards, person-less frame pictures, 3:4 buttons) |
| landscape 2:1 | `ph-l-{light,dark}-{ls,lm,ll}` 384x192 · 600x280 · full | LS 192x96 · LM 300x140 · LL full width; the narrow strips NS / NM crop the same set |
| wide ~4.3:1 | `ph-w-{light,dark}-ll` 1720x400 | long strips (aspect > 3.8 and width >= 400: NL, the VIỆC DÀI top picture) |
| square 1:1 | `ph-s-{light,dark}-{s56,s64,s72}` | Q56 · Q64 · Q72 buttons and thumbnails |
- **ONE rule picks the file** (`kitPhPick(w,h,tone)` in jph.js): orientation from the slot's real aspect ratio (< .9 portrait, <= 1.15 square, else landscape / wide), size from its real
  width (breakpoints = midpoints of the KIT_SIZE.pic widths, table `KIT_PH.sz`). The wraps (`kitEvArt`, `kitActArt`, jopic) hand out the LARGEST file of the orientation; `kitPhFit(root)` then
  swaps every `<img src*="/ph-">` for the file of the slot it really sits in (on add through one MutationObserver, when a hidden slot gets a box through one IntersectionObserver, on resize).
  Nobody names a ph file by hand; a new slot size needs no code, only a KIT_SIZE.pic entry and its art. Scan test: `node dev/test/ico-ph.js <url> <outdir>` (every visible placeholder = the file `kitPhPick` gives for its own slot).
- The old pictures `ph-event-*` / `ph-act-*` are no longer referenced (they stay on the CDN, unused).
- **Tone rule (`kitPhTone(text,{cat,fam})`)**: DARK when the act category is `hai-nguoi` / `muu-ke`, or the event family (j68) is `rumor` / `myst`,
  or the id + title + first sentence of the body (event) / the act name (act) match `KIT_PH_NEG` (harm, poison, framing, scheming, spying, rumours, bribery, theft,
  punishment, jealousy/rivalry, quarrels, resentment, cold palace, demotion, crime, illness, death…); otherwise LIGHT. Tone, never time of day.
- **Events**: outermost `kitEvArt` wrapper. When the dialog would show nothing, or only the room she stands in (j17 `evArt`, the old generic
  stand-in), it shows the event placeholder. Never replaces: EVENTS.json category art, own banners `ev-<key>` (jevban), story beats (`stArt`),
  explicit `art`, festival bands, j24 people pictures. Shop / pick / gift / giftin dialogs keep their rules (no event picture).
- **Acts**: `kitActArt` returns the placeholder (`r.ph = "light"|"dark"`) when the act has no own key (`kitActKey`) or its `img/act-<key>.webp`
  is not in the CDN index; j79 `kpActArt` draws it in the normal act-art slot (`kitArtFrame`, category edge colour) of every act card
  (deck, person cards, panes, exam card): jk4 (`kpActArt` / `kitActCompactOn`) and jexam no longer drop the slot once `kitPhActReady()` —
  replacing the earlier "no thumbnail" (`.kanoart`) state. Card marked `data-kph="light|dark"` (not observed by j63 kaMO: no render loop).
- **Not changed**: the week book (Tuần lục) lines — owner 11/15 "no picture rather than a repeated one" still holds there.
- **Before the manifests load** (EVART / ACTS.json) nothing is replaced and nothing recorded (every id would look unmapped).
- **Dev list**: `window.CTM_MISSING_PICS` = `[{kind:"event"|"act", id, tone, title}]`, each logged once (`console.info("[CTM missing pic]",…)`).
  Whole-game list: `node dev/tools/missing_pics.js <build url> <out.json> dev/art/MISSING_PICS.md`.
- Kit sample page: §59 (four pictures).
### 59.1 LOADING STATE · the picture is on its way (owner OD 18/11 ~01:50Z + 02:06Z "phải có một cái dòng chữ ... đang tải hình"; review/life-preload, kit-keeper delegate of MAIN s41) — `dev/build/jph.js`
- §59 = "this has NO picture yet" (still-life). §59.1 = "the picture is coming". Every `<img>` slot of the game (portrait chips `.kpor`, figures, pframe / pcard, event and act picture boxes, Hậu cung / servant rows, Dư đồ markers, Luân hồi cards…) whose picture has not arrived: the img gets `data-kwait` and shows a soft parchment ground (radial `#fbf4e4 → #eadbbd`) that BREATHES (opacity 1 → .62, `calc(1.6s*var(--pace))`, opacity only; `data-kwait="s"` = still under reduced motion / Hiệu ứng Gọn via `reducedMotion()`). Never the dark ground of the slot, never an empty box.
- Line: when the slot is at least 72 px tall, 64 px wide and its parent box is positioned, the parent gets `data-kwaitp` = `CTM_WAIT.picWait` ("Đang thỉnh tranh…", display font .72rem, `#8a6a40`, centred). Smaller slots (chips, 44 px icons) = ground only. A PORTRAIT on its way (`por-*`, any size: top-bar chip, side cards, rows, dialogs) shows the kit soft portrait silhouette (`img/kit/unknown-f|m.webp`, the stranger portrait; `kitPhPorG`: men / boys = m) over the ground (`data-kwait="pf|pm"`, still `pfs|pms`), so a small portrait slot never reads as an empty frame (entry-blank-r3, review item 6).
- ONE rule, no per-place code: a MutationObserver (added `<img>`, changed `src`) + one capture `load` / `error` listener (error → cleared; jcdn retries or hides it). A failed picture never keeps the shimmer.
- With it: the life gate (§35.3) keeps the first screens of a life full, and dialogs wait ≤ 3 s for their picture; §59.1 covers whatever still arrives later (a tab opened for the first time on a slow line).
- Sample: kit page §59.1 (44, PS, PM, PL, LM; one still). Scan: `SW=1 node dev/test/life-preload.js <outdir> fold,ipadAir 5` counts `blank` (incomplete, no §59.1) = must be 0, and `wait` (incomplete with §59.1).

## 68. PAINTED EFFECTS · kitFxBurst · kitFxSprite · kitFxLight · kitFxSheet · kitFxEdge · kitFxObj · kitFxGift · kitFxLetter (owner 15/11 20:55Z + 21:00Z + 22:35Z + 22:45Z, review/fxkit) — `dev/build/jfxkit.js` (right after jfx.js)
Every effect is PAINTED (Magnific gpt-2-6, folder ba4aecfe…, Kling clips from painted stills); code only moves / fades / glows painted art.
Files: CDN `img/fx/` (cdn_sync.py, never git), on demand only (assets.json group `fx`: jload never pre-downloads; sw.js caches each file by
content the first time it plays). Sources + recipes: `dev/fxwork/` (gens.txt = every Magnific id, slice.py, light.sh, sheet.sh, atlas.json).
### 68.0 PARTICLE SIZE + PLACE (owner 17/11 "hoa đào bay … hình hoa to quá", review/wx-fx-size)
ONE size rule for every falling thing (petal-*, osmanthus, leaf, snow, ash, paper): `kfUnit()` (jfx.js) = stage size (sqrt of the stage rect area / 640, clamp .5–1.15), applied in `kfkSp`, so weather, season and every `kitFxBurst` of those kinds scale with the painted stage, never with the device pixel count. A petal is ~11–18 px (a fingernail next to a figure's hand); `kitFxBurst` petal kinds default to scale .65. Weather AND season layers (lay wx / se / se2) are clipped to the stage rectangle (the "petal = season" merged layer too); weather and falling celebration petals (`kfFall`: petals / peach / goldpetals) are hidden while over a stage chip or the place name (`KF_INFO`, `kfOverInfo`): never over text. Radial bursts (flowers, kitBloom) stay free but use the same small size. Test: `node dev/test/wx-fx-size.js <url> <out> <sizes> shots`.

### 68.1 API (target = element | {x,y} viewport px | null = screen centre; everything fire-and-forget, auto-cleans)
| call | does |
|---|---|
| `kitFxBurst(name, at, n, o)` | n painted particles of a sprite kind with the kind's motion (fall / burst / rise / bloom / rain / flash); o {motion, scale, speed, tint (neutral art only), up, life} → Promise(count) |
| `kitFxSprite(name, o)` | one particle, full control (x,y/el, vx, vy, g, drag, life, spin, sway, grow, a0, fade, frame, rot) |
| `kitFxLight(name, target, o)` | painted light clip on black, `mix-blend-mode:screen` (WebM VP9 + MP4 H.264; weak device → 6×4 WebP sheet; reduced motion / Gọn → poster still); o {dur, fade, scale, size, cx, cy, inside, opacity, rate} → handle {stop(ms)}. Screen blend only reads on dark / painted scenes — on cream paper use `kitFxBurst("glowburst")` |
| `kitFxSheet(name, target, o)` | true-alpha sprite sheet played once (silk, thread) or a light's sheet; o {fps, loop, hold, keep} → handle |
| `kitFxEdge(name, o)` | full-screen painted edge overlay bleeding in from outside (portrait / landscape art); o {in, hold, out, opacity} → handle |
| `kitFxObj(name, frame, target, o)` | one painted object (atlas frame) as a DOM picture for staged moments → {to(x,y,ms,{r,s}), frame(i), stop()} |
| `kitFxGift(act, target, o)` | gift moments: `give` (box / silk bundle carried up, ribbon slips off), `open` (lacquer box opens: light + sparks), `refuse` (set down, taken back); o {kind:"box"\|"silk", from} |
| `kitFxGiftCarry(target, o)` | the whole gift moment (review/gift-pick, 22:45Z #4/#5): item picture `o.item` (from `o.from`) drops into an open lacquer box at the screen bottom (`o.wrap:"silk"` → silk bundle), box closes, a maid's hands (`gift-hands` atlas: box with ribbon · box untied · silk bundle; celadon court sleeves) carry it up to `target`, ribbon slips off on arrival; accepted → `kitFxGift("open")` light + sparkles; `o.refuse` → set down, carried back down. Tap = skip (`.kfxk-catch`). Gọn / reduced motion / bots: nothing. ~4 s. |
| `kitFxLetter(target, o)` | secret letter rises sealed, then opens; o {kind:"seal"\|"roll"\|"envelope", open} |
| `kitFxPreload([names])` · `kitFxClear()` | warm a scene's files · remove every live effect |
`kitFx(kind)` (jfx, §54) is the event-level entry and now uses only these painted parts (table below).
### 68.2 Registry (sizes = one download each)
| kind | name | source / alpha | size |
|---|---|---|---|
| sprite | petal-plum, petal-peach, petal-lotus, osmanthus, leaf, ash, paper, coin, lantern, jade, gift (4: box closed/open, silk bundle, ribbon), letter (4), gift-hands (3, 288 px, 37.7 KB: hands holding the ribboned box / untied box / silk bundle; gpt-2-6 YMLPpsoWeC→O6fk3CMynm, Bh4zaXUoQR, iGqlYRY3uK, bg removed) | gpt-2-6 sheet on slate → images_remove_background | 10–22 KB |
| sprite | snow, spark, ember, orb, streak, smoke, incense, glowburst, lotuslight | painted on black → luma alpha (slice.py) | 4–16 KB |
| sprite | ink, brush | painted on white → ink alpha | 34–42 KB |
| light | candle, glow-gold, moonlight, lantern-red, divine, fireworks | gpt-2-6 still on black → Kling 2.5 loop (start = end frame) → light.sh | 6–45 KB per clip (fireworks 180 KB) |
| sheet | silk (white silk descends), thread (red thread snaps) | Kling clip → video_remove_background → sheet.sh | 25–76 KB |
| edge | blood, poison, ink | gpt-2-6 full frame on white, -p 3:4 and -l 4:3 → ink alpha | 40–106 KB |
Library on the CDN ≈ 1.6 MB (both video formats); a device downloads ≈ 1.1 MB at most, scene by scene (danger 91 KB, poison 93 KB,
death 74 KB + incense, festival 214 KB, gift 22 KB, letter 13 KB, promotion ≈ 40 KB).
### 68.3 kitFx moments (jfx FX table, all painted)
decree: gold glow + rays + gold dust · promote: glow + rays + sparks + gold-leaf petals · hit (slap): brush streak + paper shake ·
harm / expose: ink-blood edge + ink · poison: green-black edge · verdict / seal: shake + ink blot · rumour: ink-wisp edge · birth: warm glow +
flowers · preg: lotus light + lotus petals · favour: seasonal petals · romance: peach blossom · betray: red thread snaps · night: embers ·
death: dim + white silk + incense · demote: dim + cracked jade + ash · festival: sky lanterns + fireworks · letter: sealed letter · coin: silver rain.
Old flat CSS flashes: red → painted blood edge; gold / warm → painted glowburst; dark / night stay plain colour washes (grading, not an object).
### 68.4 Budget + switches (owner 22:35Z)
- Sprite atlas ≤ ~40 KB, light clip ≤ ~400 KB, centre art ≤ ~250 KB. ONE Pixi layer (jfx), pooled sprites (`KFK.pool`), hard cap `KFK_CAP`
  (140 phone / 240), ticker stops when empty and when the page is hidden; lights stop when hidden; nothing awaits an effect (co-op never waits).
- Thiết lập "Hiệu ứng: Đầy đủ / Gọn" (`OPT.fxon`, kitToggle in j74). Gọn = stills, no particles. Until she picks (`OPT.fxpick`): weak devices
  (saveData, deviceMemory ≤ 2, ≤ 2 cores) start in Gọn; slow frames (KFX.q at its floor with particles on screen, 3 checks) switch to Gọn.
- prefers-reduced-motion → same as Gọn. Bots / quiet → nothing.
### 68.5 Tests + sample
`node dev/test/fxkit.js <url> <out> [shots]` (5 sizes + reduced motion): every kind loads, 50 bursts → 0 leaks + pool reused, every kitFx kind,
lights play (screen blend), low-end sheet, edges / gift / letter / sheets clean up, auto-Gọn, frame time, heap after bursts, bytes per scene.
Kit page sample "§68": a button per sprite kind, light, sheet, edge, gift act, letter and kitFx moment.
### 68.8 PERSON MOTION · kitFigMove(kind, who, o) (owner 15/11 20:05Z item 13 + 22:45Z list; review/presentation-wiring) — `dev/build/jfxkit.js`
The ONE part that animates a stage figure. `who` = person (or its stage wrapper `ref`), `"me"` (her figure), a picture element, or a snapshot `kfkSnap(img)`. Filter + translate on the picture itself (composite "add", so the people-picture filter `url(#kfa)` stays first); terminal kinds use a GHOST copy so a re-render cannot cut them. Pace = kitPace. Gọn / reduced motion / bots / hidden figure (`kfkSeen`): nothing.
| kind | what | ms (x BAL.pace) |
|---|---|---|
| `flush` | slapped / scolded: one jolt + brief red flush | 900 |
| `poison` | poisoned: tints green, then blurs, recovers | 3200 |
| `grey` | demoted / cold palace: dims to grey, recovers | 2600 |
| `die` | death: ghost greys, sinks and fades; white silk (`kitFxSheet silk`) falls over | 3000 |
| `drag` | punished: ghost dragged off the stage (`o.dir` -1 / 1), dims | 1700 |
| `out` | leaves the stage: ghost slides out and fades | 1000 |
| `in` | arrives: slides in and fades up (`o.from` px) | 1000 |
| `glow` | rim light of a tone (`o.tone`: lotuslight = pregnancy pink, glow-gold, candle) via `kitFxRim`, never over the face | 2400 |
`kitFxSheet(name, target, {reverse:true})` plays a sheet backwards (red thread JOINS two people = the snap sheet reversed; placeholder until the painted join thread lands, see ART REQUEST). Sample: kit page §68.8. Test: `node dev/test/presentation-people.js`.
### 68.9 ENTRANCE · kitEdictOpen(dlg, {kind:"scroll"}) (owner 15/11 ~18:15Z, OD:L528; S3-152; review/presentation-wiring) — `dev/build/jfxkit.js`
An event card opens like an imperial edict unrolling: the painted rolled edict (`img/kit/mo-edict-closed.webp`, same picture as j93 `kitEdict`) shows at the card's centre and fades while the card's own paper opens from its middle line to full height (clip-path, no drawn shapes). One call per card, fire-and-forget; `o.ms` x BAL.pace (default 1200). Gọn / reduced motion / bots / a card under 120x80 px: nothing. Co-op: local only. Returns `{stop()}` or null. Log `KFK.log` `edict:open`; ghost class `.kfxk-g`. Who calls it: `jpres.js` `kpresShow` when the plan has `ent:"scroll"` = group `trieu-chinh`, category `tan-phong`, every `Chính tuyến` main-story card (also a card whose picture category resolves to `tan-phong`, e.g. `Kết quả tranh ghế`). Side-story and plain cards: no entrance. Sample: kit page §68.9. Test: `node dev/test/presentation-people.js` (edict block).
Seal moment (S3-205): `KPM.seal` -> `kitFx("seal")` (jfx FX table: lock vibration + shake + ink blots) at the stamp element: `Kết quả tranh ghế` card (showModal wrapper) and her promotion-exam verdict (`exDone` wrapper). Origin-frame PLACEHOLDER (until ART REQUEST A1 lands): a `Chính tuyến` card gets `data-kpres-origin` + a two-line inset rule in the origin colour (`KPO`); `KPO_ART[origin]` = painted frame url removes the rule.

**People moments (jpres.js KPM, S3-151/182/205)** — one table, every call through the kit: `kpmGo(moment, person, second)` with moments slap · poison · harm · rumour · death · drag · out · preg · birth · rise · fall · favour · join · betray. Hooks: `ACT[k].f` (KPM_ACT table: tat, phatquy, poison, kpoison, slowpoison, pgift, pond, pushp, trip, huydung, thathu, phonghoa, rumor, lygian, frame, kframe, ally, xinhh, banphe: plays on a SUCCESS text only), `kill` / `deathSentence` / `dieIf` (NPC dies), `punish` / `fall` (NPC dragged / flushed), `slapGive`, `birthP`, `renderStage` (a figure that left the stage fades out), `render` (state scan of the people on the stage: pregnancy announced, rank up / down, cold palace). Her own moments stay the j93 scenes / j11 feedback.
### 68.7 PERSON-SAFE LIGHT · rim light only (owner 16/11 ~21:25Z OD; review/diemtrang-fx) — `kitFxRim` · `kfkPersons` · `KFK_PERSON` in `dev/build/jfxkit.js`
RULE: light / glow NEVER lies over a person or a face (avatar, portrait, stage figure, her figure, makeup zoom, reveal figure). Light starts at the person's own outline and radiates OUTWARD only.
`KFK_PERSON` = the selector of person pictures (`img.figimg, #mefig, img.kpor, .kfzoom, .ktrv-fw>img, span.md.kmini, .kpod-fig>img`; a new kind of person picture is ADDED THERE, never handled by a caller).
`kitFxRim(els, {tone|rgb, a, r, dur})` = drop-shadow pulse on the picture (true silhouette, `composite:"add"` so the picture's own filters stay). The ONE guard `kfkRimFor(box, name, o)` is called by `kitFxLight`, `kitFxSheet` (light sheets) and
`kitFxBurst` (light sprites `glowburst`, `orb`, `lotuslight`; table `KFK_LSP`): when the light's box meets a visible, uncovered person, the call draws a RIM on that person and returns the rim handle instead of an overlay. Same inside `kfPx` kinds `rays` and `lotus`
and the summer light shafts `KF_RAYS` (not drawn while persons are on the stage). The podium beam `.kpod-beam` (j90) stands BEHIND the figure. Particles (petals, sparks, coins) are objects, not light, and stay; a reveal sends sparks from the silhouette's edges, never from the face.
Test: `node dev/test/rimlight-scan.js <url> <WxH@dpr>` (every light entry point over a person: no overlay element reaches a person, a rim animation runs).
### 68.6 WEATHER + SEASON LAYERS (owner 16/11 12:08Z round 2, review/weather-fx2) — `kfWxCfg` / `kfSeCfg` / `KF_WX` / `kfBolt` in `dev/build/jfx.js`
ONE kit part for every weather / season picture; nothing is drawn per screen. Painted sprites only (atlases of §68.2); the only non-art is a plain white rectangle (the stage mask and the lightning wash).
- Layers on the one `#kfxcv` canvas: WEATHER (`wx`, today's `S.wx`, clipped to the stage rectangle) and SEASON (`se`, month, whole screen, sparse). Falling weather of the season's own kind (spring petals, autumn leaves, winter snow) IS the season layer (one effect, cap x.85); wind is NOT merged (it stays a bold stage layer).
- Spring (Jan-Mar): PINK peach blossom only (`petal-peach`, tint pink), never leaf / osmanthus / gold (yellow reads as autumn). Festival Tet / Nguyên tiêu use the same peach petals; gold petals only on Giao thừa.
- Summer (Apr-Jun, lotus season): no petals. Season layer `sun` = golden motes (`orb`/`ember`, tint warm) drifting up + `KF_RAYS` (slanted painted `streak` beams, one `glowburst` sun glow at the top right). Heat shimmer and dragonflies are NOT done (no painted dragonfly atlas yet; kit request).
- Snow (`snow` 64, `snowh` 100, `frost`, `snowp`): bigger flakes (x1.5-2.5), blue tint so they read on light paintings, denser; still no blizzard.
- Wind (`wind`, autumn "gió heo may"): up to 96 blown leaves across the whole stage height from the left, 5-9 px/frame, strong spin and gusts, plus pale wind streaks (`streak` lines, brown-grey, tilted by their path).
- Fireflies (`fly`, night "đom đóm" + Thất tịch / Trung thu): each = soft lime halo (normal blend, so it shows on light art) + bright core, 2 sprites on the same path, slow blink.
- Storm lightning = `kfBolt()` (j11 calls it with the thunder sound): a light wash over the WHOLE stage rectangle (above figures and art), two strobes + fade. The old CSS `.stage::after` flash (45 % high) is deleted.
- Rain unchanged. Gọn / reduced motion / bots: no particles and no flash (`kfStill`); caps = cap x phone x height x adaptive `KFX.q`, hard `KFK_CAP`.
- Kit page sample §68: row of `weather <kind>` buttons (`kfWxPreview(id)`: one full-screen burst; `bolt` = lightning).
## 70. ITEM DETAIL · kitItemDetail · kitItemCard · kitItemTap (owner 15/11 "Khi bấm vào món đồ không thấy hiện thông tin món đồ", review/item-info) — `dev/build/jitd.js` (after jitev, before jtoil)
Registry: §70 (next free number; coordinator to confirm). Rule: **tapping ANY item cell shows this block** — never a blind act (wear / place / take off) on a tap,
never a private item card. Reuses §54.1 kitItemInfo (picture, name, grade), §51 kitRows, kitItem (§15), kitGradeChip, kit-x (§32.10), pbtn.
### 70.1 kitItemRef(ref) — the resolver
`ref` = "key" · `{k}` · an S.inv entry · a kitInvGrid tile `{g}` (bag / dress pick) · `{ix}` inv index · `{wdSlot:"tram"|"y"}` (worn garment) · `{e}`;
`who` = another person (her worn piece; no Xa xỉ row, no "ngươi" risks). → `{k, e, g, I, wd, it, work, veil, worn, who, qty}` or null.
### 70.2 kitItemDetailRows(ref, o) — ONE row set for every item (kit table §51)
| row | content |
|---|---|
| Phẩm | grade word in the KIT_GRADE colour (works: tier + "(N phần)") |
| Loại | kind · slot: "Trâm cài · cài tóc", "Y phục · mặc", "Trang sức · đeo tay", "Vải vóc · may áo", "Tác phẩm tự tay · Thêu", "Mạng che mặt · che mặt" |
| Hợp đề | theme tags: Hội phối đồ đề (jts TS_THEME: Thanh nhã · Phú quý · Hương sắc) + an item's own `th` list (future dress-contest themes) |
| Được / Mất | the effects (jinv kitItemLists / jwdinv wdItemLists — the old builders, now lists) |
| Xa xỉ | wearables of the player: "món này N · Bên mình A → B · hạn mức phẩm ta M"; B over M → red "…: quá hạn mức". `BAL.itd.allow=false` hides the allowance (owner 08:10Z rule) |
| Lai lịch | origin / giver: "Hoàng hậu ban", "X tặng", "Nội vụ phủ cấp…", "tự tay ta làm" |
| Ghi chú | duration, rank it suits, đồ phẩm known, pawn, count in the chest, `o.note` |
`o` = {months, dress, pawn, note, lead (rows put first, e.g. the shop price), noLux, luxItem (Xa xỉ row = the piece only, for a board that is not worn: Hội phối đồ)}. **kitItemRows(k, o)** (jinv) and **wdItemRowsE(e, o)** (jwdinv) now
return this, so every older caller shows the same rows (Tư trang panels, Bên mình slot panels, shop card, gift picker, works panel econWkOpen).
### 70.3 kitItemDetail(ref, {acts, size, cls}) → `.kidet`
Picture (kitItem md/lg, the kit graded frame) · name (display font, grade colour) · kitGradeChip + kind · "Đang mặc" chip when worn · the rows ·
`acts` (pbtn HTML or `{id,n,sub,why,go}`) in a 2-col kit button grid. `cls:"kidet-strip"` = the framed strip used beside a grid (dress pick, Hội phối đồ, veil picker).
### 70.4 kitItemCard(ref, {acts, note, closeModal}) · kitItemTap(ref)
**16/11 (review/kit-sweep):** the card is the kit panel frame (template T2 §8.2): `.dlg.kpanel` + kpHeader (ĐIỀU · name · kind) + kit ✕, item picture LEFT `.kpsubj.kpiart`, grade/worn chips + `kitItemDetailRows` + acts RIGHT, in its own layer `#kidfl` over any panel. No private `.kidc` card frame.
- `kitItemCard` floats `.kidc` (z 9470: above dialogs and minigames) with the block; ✕ / tap outside / Esc close it. Plain act buttons (data-kinvact /
  data-wd …) run their own handler, then the card closes (`closeModal:true` also closes the panel under it).
- `kitItemTap(ref)` → `data-kid="k" [data-kix=i] role="button" tabindex="0"`: any tile with it opens the card on tap (capture, stops the tap).
  `data-kidpick="wear"|"use"` on a pick tile (Bên mình slot panel) → the card carries the ONE act (Cài / Mặc / Đeo / May áo).
- `kitItem({sel:true})` = the selected tile (gold ring, lifted) whose detail is shown beside its grid.
### 70.5 Sites (scan `node dev/test/item-info-scan.js`, table dev/review/item-info-table.md)
Dress pick (jtoil Hồi 1: tap = select + strip, buttons Cài / Mặc / Đeo / Tháo; "Mặc bộ này" / "Giữ đồ hôm qua" unchanged) · Tư trang bag + Bên mình panels ·
Bên mình pick tiles (card + act) · shop picture card (price row + detail) · reward box rows / shelf (j93) · event item tag (§64) · bully demand tile (jtsb) ·
Hội phối đồ board (jts: tap = select + "Đặt vào …" / "Bỏ ra") · veil picker (jveil) · other people's worn slots (jk2b kitWearSlots → card with who).
Tests: `node dev/test/item-info.js <url> <outdir> [sizes]`. Kit page: sample §70.
### 70.6 INLINE ITEM STRIP · kinlStrip / kinlPick (owner mark #21, OD 21/11 ~02:45Z; review/bag-inline; `dev/build/jkinl.js`)
Rule: in an item grid, tapping an item opens NO pop-up and has no ✕ (a pop-up hides the other pictures; players tap picture after picture). The info shows INLINE under the grid:
`.kidet.kidet-inline` = LEFT small SQUARE picture (`.kinlpic`, the kit graded frame) · MIDDLE name, kind, the §70.2 rows and the act buttons (`.kinvacts`, 150 px+ columns) · RIGHT one small box / vertical column of the grid's summary chips (`.kinlchips`: Sắc +N · Xa xỉ N · ✓ Đã biết: Đúng phẩm). Empty state «Chạm một món để xem.» (chips stay).
- `kitInvGrid({inline:true, onPick, sum, …})` renders the strip under the grid in place of the old `.kinvsum` chip line; tapping another tile swaps the strip IN PLACE (`kinlPick`: the grid is not re-rendered, the selected tile wears `kitem-sel`).
- ONE code path for the whole group: the pick still builds its info pop-up with `kitModal({kind:"info"})`; while a pick is captured (`KINL.cap`) that call is diverted into the strip. So every opener wrapped round `kinvOpen` (works, recipe books, shelf, Dấu ấn, wardrobe, …) fills the strip with no change of its own.
- Selection = item id, kept per grid and re-captured on every render (Đeo → Tháo, a sold item empties the strip). A «Bên mình» slot of the same panel (`kitEquipSlots`) uses the same strip (`kinlPickSlot`, `{slot:i}` selection).
- Action pop-ups (confirm sell / pick a recipient / choose a person) stay pop-ups: they are acts, not info.
- `kinlDetail(ref,{key,sum,acts,facts,noLux,luxItem})` = the SAME strip for a picker that keeps its own selection (no kitInvGrid): picture left, name + kind + §70.2 rows, `sum` chips right, acts full width; `ref` null = the empty state. Used by the dress chest (jtoil, Chọn y phục), Hội phối đồ (jts), the veil picker (jveil), the gift picker (jgpick, under its grid) and the Đa Bảo Các drawer (jdisp `kdrShow`). The old `kitItemDetail(...,{cls:"kidet-strip"})` beside a grid is gone from every picker.
- Others' worn slots (`.kwear [data-kwear]` of a person card / person dialog): `kinlWear(cell,who,slot)` opens the strip right UNDER the slot row (narrow column = stacked: picture, info, chips, acts); another cell swaps it, the same cell folds it. No pop-up, no ✕. One function for every opener (jk2b, jdress, jgift).
- A pick tile INSIDE a strip (the Bên mình slot strip: «Chạm một món để cài») swaps that strip in place (`kinlPickInline`), never a floating card.
- Guard: `node dev/test/bag-inline-scan.js` lists every remaining item pop-up site (kitItemCard / info itemPic) with why it is allowed; a new site fails.
Used by: Tư trang › Túi đồ (+ Bên mình slots), every picker above. Fold 755x1000 + iPad 1180x820. Kit page: sample §70.6.
## 83. ONE ANIMATION PACE · BAL.pace (owner 16/11 15:05Z "mấy cái animation là tôi muốn nó chậm thôi"; review/anim-pace)
`BAL.pace` (jbal2.js, = 1.75) is the ONLY speed knob for key-moment animations (OD:L1267 one core). JS: `kitPace(ms)` (Gọn / reduced motion keep the old ms); CSS: `var(--pace)` on :root (set from BAL.pace). Scaled: the whole j93 motion kit (`animation` durations/delays >= 0.3 s, `kmStage.later`, scene timers), BAL.reveal (box/chest/item reveals), BAL.cardFlip.slow, night-end beats (BAL.nightEnd), kpromo preview, podium j90, week dawn (p1 .dsky/.lan/.sun/.dbox + bell + calendar), gloom/bloom/alarm fx, kfx red/night/dark, srvToast, jbuoi. NOT scaled: micro feedback (< 0.3 s: taps, dialog open/close, hover, ripples), infinite loops, stat-fx (already 2.7 s), map unroll (KIT_MAP_MS), result toasts (already 7-9 s). New animations: write the old-speed number and multiply by BAL.pace / var(--pace); never hard-code a second speed.

## 74. BUỔI TRANSITION · buoiShift (owner 15/11 "Animation qua buổi … lật trang sách. Kỳ quá", review/buoi-transition) — `dev/build/jbuoi.js` (last module)
Registry: §74 (KIT_NUMBERS.md; was "§71 to confirm"). Replaces the old buổi change (dark ink wipe + paper-page sound + incense curtain). Page turn now exists ONLY in Tuần lục (review/page-curl2).
`curtain()` → `buoiShift()` (called after the state changed, never awaited, never in sync): one fixed overlay `#buoitr` (z 36, pointer-events none), ~1.7 s (dawn 2 s):
tinted ink-wash veil thins out over the scene that already holds the next buổi's §56 light · painted sky band (hills, sun disc / moon disc slide along an arc from the previous
to the new buổi position) · brush-calligraphy title "Buổi trưa" on an ink-wash plate + kit seal (§39 kitSeal) · night→morning = dawn variant (painted mist + first light + glowburst).
Tap anywhere = skip (listener only; the tap still reaches the game). Gọn / reduced motion / weak device (`kfStill`) = one quick tint fade (260 ms), bots / quiet = nothing. The buổi bell / night-watch sfx stays.
Art (Magnific gpt-2-6, recipes `dev/fxwork/buoi/slice_buoi.py`, CDN `img/fx/`, on demand, group fx): `buoi-wash` (ink alpha, used as CSS mask so one file serves all colours, 38 KB), `buoi-mist` (luma alpha, 42 KB), `buoi-hills` (ink alpha, 35 KB), `buoi-orb` (sun | moon, 15 KB) = 130 KB, downloaded the first time a buổi changes.
UPDATE 16/11 (anim-pace): FULL SCREEN at every size (tint + ink wash + vignette cover the viewport; sky band + title centred, sized by vmin), clearer, pace x BAL.pace (~3 s, dawn ~3.5 s). SEASON variants (SEAK: xuan petals / ha lotus + warm haze / thu maple leaves / dong snow + cold haze) and FESTIVAL variants (the game's own FEST table: newyear, nguyentieu, thanhminh, doanngo, phoenix, thattich, trungthu, trungcuu, dongchi, giaothua; name shown under the title) use the kit particle layer's painted sprites + a tint; optional painted band skin `img/fx/buoi-band-<key>.webp` (BTR_ART lists existing: thu, trungthu); missing = today's per-buổi look. Test hook `window.__btrVar={sea,fest}`.
Test: `node dev/test/buoi-transition.js <url> <out>` (6 viewports). Kit page sample §74 (a button per buổi). Test hook `window.__btrHold` stops the auto end.

OWNER 18/11 ~06:20Z (review/buoi-banner, canon overwrite of the veil): the game UI stays visible and in place under the animation. The opaque full-screen backdrop (tint, ink wash, vignette) is REMOVED; sky band, sun / moon, mist, first light, title plate, seal, season / festival sprites stay as approved. The whole `#buoitr` lies on the screen at `BTR_OP` = 0.85 (owner's pick from the 70 / 80 / 85 ladder). Gọn = the title only, ~0.7 s.
OWNER 18/11 ~06:35Z (approved the approach): the WHOLE group (sky / mountain band + title + icon + seal + sub line) is ONE compact block anchored flush against the TOP EDGE of the stage (`.stage` top − 2 px, `--btr-top`; iPad too), centred horizontally; the title block overlaps the lower ~60 % of the band (no gap, nothing in the middle of the stage); the band's top and bottom edges feather out (vertical mask on `.btr-sky`, no box-shadow line); the sub line (festival / season name) is bold, ~1.3–1.9 rem, full-strength ink with a soft halo, for every variant.

## 75. kitBackBtnHtml · painted "back to a place" button (owner 15/11, review/room-btn) — `dev/build/jk3.js`
- Replaces the wide text bar "‹ Phòng" in the header (owner: it read like an empty field) and the "‹ Dư đồ" chip on a place stage. ONE part: `kitBackBtnHtml(kind,label)`
  → `<img.kbi>` (img/kit/ico-<kind>.webp, 30 px, gpt-2-6 gouache, transparent, 128 px WebP ~7 KB: ico-room = red-lacquered door under green tiles with a lantern,
  ico-map = palace scroll map) + `<span.kbl>` label; the button class is `.kbackb` (no border / ground in the header; a soft paper pill over the stage art for #tomap).
- Header `#k3room` (phone shell only, as before): label "Về phòng", or "Về <place>" when she is elsewhere (tooltip + aria-label the same). >= 600 px: icon + label in the
  right column under the time block, right-aligned, no bar. < 600 px: icon only (label in tooltip, same rule as the stat cells), under the menu button next to the time block.
- New back buttons to a place MUST use this part (`node dev/test/room-btn-scan.py` fails on a text "‹ <place>" bar). New icon kinds: add `img/kit/ico-<kind>.webp` in the same style.
- Tests: `node dev/test/room-btn.js <url> <outdir>` (6 viewports). Kit page: sample §75. Number §75 (KIT_NUMBERS.md; was provisional §72).
## 69. CO-OP BUỔI CLOCK · kitCoopClock (owner 15/11 ~21:25Z, review/coop-timer) — `dev/build/jcooptimer.js` (after jkitpage)
**16/11 (owner shot faa95830 "Nữa, kit chung đâu", review/kit-sweep):** the floating `#kctm` chip strip over `#next` / the tab bar is GONE — it duplicated the header friend chip (§69.2). The friend chip is the one display; the wait words ("Trong lúc đợi: …") and the "Tạm dừng" button live in its kit notice (tap the chip → `kitCoopFriendPanel`, kit ✕ in the header, no "Đóng" button). `kitCoopClock` stays a kit sample only.
- `kitCoopClock({left, len, state, fr})` → one row of kit chips (`.kchips.kctm`, `kitChip` look): clock chip with a small ring
  (`.kctm-r`, share of time left) + words, and the friend's chip. state `run` → `.kchip.n` "Còn 1 phút 42 giây" (`.r` under 20 giây);
  `pz` (a pause or a hold) → `.kchip.w` "Đợi · còn …"; `stop` (room frozen) → `.n` without counting; `up` → `.r` "Hết buổi". fr `ready` →
  `kitChip("Hảo hữu đã sẵn sàng","ok")`, `busy` → `kitChip("Hảo hữu đang dở tay, xin đợi","w")` (never what she is doing). `btn` → the chip
  button "Tạm dừng" (`button.kchip.n[data-ctm=hold]`, ≥ 26 px, gold edge, like §35.2's chip button). Time words: "N phút M giây" / "M giây" (no clock digits).
- `kitCoopLenRow()` → the host's pick on the lobby's "Mời hảo hữu" screen (jcooplobby `wait`, host only): one `kitRows` row "Mỗi buổi tối đa"
  with three chip buttons "3 phút" / "5 phút" / "8 phút" (`button.kchip`, chosen = `.g` "✓ 5 phút"); kept in localStorage "ctm-coop-len";
  default `BAL.coopTm.buoiMs` = 5 phút (owner 23:10Z). The clock stands still (pause budget, `BAL.coopTm.pauseCapMs`) ONLY while a player is
  in a mini game (owner 23:20Z: not dialogs, rewards, gifts, edicts, night moments).
- `kitCoopHold(mine)` → the kit panel over both screens while the game is held (same markup as the freeze panel #coopfz: `.modal.kpscene >
  .dlg.kpanel` + `kpHeader("notice",…)` + `kitRows`): mine → "Đang tạm dừng" + `.kbtn` "Tiếp tục"; the friend → "Hảo hữu xin tạm dừng"
  ("Hảo hữu xin tạm lui chốc lát. Hậu cung dừng lại cho đến khi hảo hữu trở lại.") + `.kbtn.alt` "Về màn đầu". Released → kitLine "Cuộc chơi tiếp tục".
- Placed by jcooptimer as `#kctm` (fixed, right edge = #next's right, 6 px above the bottom bar), co-op only, hidden while a dialog,
  the title or the freeze panel is up. Events use `kitLine` (§42.2): "Hảo hữu đã sẵn sàng", "Hết buổi: sang buổi cho cả hai",
  "Hết buổi: xem xong là sang buổi", "Hết buổi tối: sang ngày mới".
- #next in co-op reads "Sẵn sàng" (the lock words "Đợi hảo hữu…" stay). Numbers: `BAL.coopTm` (jbal2). Sample on the kit page (§47): "§69".

- §69.1 (owner 16/11 "Đồng hồ count down … nút sẵn sàng của hảo hữu đâu", "chờ mà không hiểu nên làm gì tiếp", review/coop-timer-r1):
  the friend's chip is ALWAYS shown, with her name (`o.name`, ≤ 16 chars): `ready` → `kitChip("<Tên> đã sẵn sàng","ok")`, `busy` (mini game) →
  `.w` "<Tên> đang dở tay", `hold` → `.w` "<Tên> xin tạm dừng", `away` (friend offline) → `.r` "<Tên> đang vắng", else `.n` "<Tên> đang hành sự".
  `o.me` (SHE is ready, the friend not): friend chip `.w` "Hảo hữu đang dở tay, xin đợi" + `.n` "Trong lúc đợi: xem các tab, Tư trang, Sổ ghi",
  no Tạm dừng button. #next lock words (jcoopworld lockNext) always say why: "Chờ hảo hữu…" (she is
  ready / her week end is out), "Đợi hảo hữu" (host's places / a step after a dialog), "Hảo hữu đang vắng", "Đang nối lại…", "Đợi cùng bản mới".
  Khắc spent and she can still press "Sẵn sàng": #next gets the kit selected look `.ksel` (§31.13).
  Freeze panel (#coopfz, peer): "Hảo hữu đang vắng (máy ngủ hay chuyển sang việc khác). Hảo hữu mở lại trò chơi là tự vào lại; …".
- §69.2 «HẢO HỮU» ICON · kitCoopFriend(o) (CANON OVERWRITE, owner 21/11 ~06:30Z, OD verbatim: "ở cái thanh trên cùng ... một cái icon ... off là màu
  xám ... On là sẽ màu tươi hơn ... xong thì có một cái dấu tích màu xanh kế bên ... đang bận thì là nó hiện cái dấu ba chấm kế bên ... bấm vô người đó
  thì nó ra thông tin"; review/hao-huu): `#kctmf`, a CHILD of the FIXED TOP BAR `header.hud` (like the §42.2 «!» box), always on in co-op (hidden only
  under the title). While the room is frozen (`#coopfz`, she is away) or held (the hold panel) the bar's own icon stays in the bar under the panel and a
  COPY `#kctmfu.kup` (body child, fixed, z 9600, aria-hidden, tap inert) stands at the SAME spot above the panel, so the grey icon / ⏸ are seen.
  `#kctmf` / `#kctmfu` carry `data-k61skip` and the partner sheet's title puts her name in a `data-k61skip` span: her name is written only once she
  is known by name (k61Named), so the j61 DOM name mask must not re-map those words to another record (rv r2 A).
  `button.krailb.kctmf[data-ctm=fr]` = the §77 kit square icon button `.krailb`, compact 32 px like `#kntbox` / `.krail.khud` (padding 3 px): her portrait
  `kitFaceH(friend,"xs")` once met (`isKnown61`), the painted kit icon `img/kit/ico-friend.webp` (K-ICO-HAOHUU) while she is a stranger (no face
  before meeting, §49.3). GREY = the kit's `.krailb.koff` (§77b) when she is offline (away), full colour when online. Badge = the kit's §77b `kitStBadge(st)`
  (K-BADGE-HAOHUU, the button's LAST child, the only round part): ready → `ok` "✓" green · busy / work → `busy` "…" · hold → `pause` "⏸" ·
  away: none (the grey icon says it). NO name and NO status words on
  screen: they are the aria-label / title and a visually hidden span (`.kctmf-vh`, "<name or Hảo hữu của ta> · ✓ Đã sẵn sàng" …). Beside it the
  shared buổi countdown as ONE short kit chip `.kctmf-t` (`m:ss` / `⏸ m:ss` while stopped / `.r` "Hết buổi") — owner 16/11 countdown rule kept.
  Status is pushed at once: each client sends {mode:"st",bz,kh,…} on change (checked every 250 ms). Place = ONE FIXED SLOT per viewport
  (innerWidth x innerHeight, kept per viewport): found once, right → left / top → bottom, against the whole boxes of the bar's direct children (a word
  growing inside its block cannot reach it), every word (text-node rects), every picture / button, the seal and the «!» box; sized for the widest
  content (icon + «⏸ 0:00» / «Hết buổi»); kept across her page reloads (localStorage `ctmHhSlot`, UI only); never re-placed on a content change, only when a word or picture of the bar really lies under it. No free
  slot → a strip under the bar at the right edge (`header.hud.kctm-pad`). Being a bar child, the «!» box, the notice chip and the rail dock keep clear of it.
  Tap → the «Hảo hữu» partner sheet `kitHaoHuuOpen()` (`dev/build/jhaohuu.js`, ONE panel): `kitPanel({kind:"info"})` with her full-body figure
  (stranger: the kit `unknown-fig-f` as a stage pseudo person, never her entry), Thân phận (Danh vị = `kitName` rank unit, Cung) · Tư chất
  (`kitPersonStats`) · Sức khỏe · Trong cung của nàng (Con cái, Cung nữ thân cận) · Lúc này (Hảo hữu = this status `COOPW.frInfo` + `frWord`, Ngươi,
  Đang ở, one kpnote of what to do meanwhile); options «Tạm dừng» (when the room may pause) + «Đóng». Stranger rule OD:L165: «Hảo hữu của ta»,
  every field «chưa rõ» but what anyone sees. Servant road: Danh vị Cung nữ / Hầu hạ / Cung; home road: «ở phủ nhà, chờ kỳ tuyển tú».
  `kitCoopFriendPanel(o)` (the old status-only notice `#kctmp`) is only the fallback when jhaohuu is absent. Samples on the kit page "§69".
  Test: `COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc node dev/test/coop-haohuu.js <outdir>`.

- §69.3 INVITE GUIDE · kitCoopSteps({sent, joined, wait, you}) (owner 16/11 "Rồi sao nữa", C43 review/coop-invite-ux) — `jcooptimer.js`: the 1-2-3
  guide of the lobby's "Mời hảo hữu" screen as `kitRows` rows (joined to the Ám hiệu / Hảo hữu rows with `kitRowsJoin`): "1 · Gửi lời mời" (`.w`
  "… chạm Gửi đường dẫn bên dưới" → `.g` "✓ đã gửi cho hảo hữu" once Gửi / Chép đường dẫn / Chép mã is tapped), "2 · Hảo hữu vào phòng" (`.w`
  "… đang đợi hảo hữu vào phòng · m:ss", the time ticks each second in place, text only; `.g` "✓ đã vào phòng"), "3 · Cùng chơi" (`.n` "tự bắt đầu khi
  hảo hữu vào, không phải chạm gì"). Guest (`you:"b"`) row 1 reads "Nhận lời mời ✓". The kpnote under the buttons adds "Muốn thử một mình: mở đường
  dẫn trên máy khác". When the friend joins the lobby plays `sfx-join` + `kitLine("Hảo hữu đã vào phòng. Cuộc chơi bắt đầu.")` and hands over to the
  shared game at once (existing COOP "both" → "start"). Sample on the kit page "§69". Test: `node dev/test/coop-invite-ux.js`.
- §69.4 CLOCK CHIP IN A TIMED CHOICE DIALOG (kit-size-10): `kitCoopClock({left,len})` goes in the dialog text right under the question (`<p class="nfcd">`); the kit keeps text + chip above the options (§32.5c). A caller never positions, pins or restyles the chip. Sample: kit page §8 "VIỆC CÓ ĐỒNG HỒ".

## 78. PLACE ICON · kitPlaceIcon + HAPPENING MARK · kitHapMark (owner 16/11 Dư đồ split, review/act-dedupe) — `dev/build/jact.js`
- `kitPlaceIcon(k, size=14)` → the kit icon set glyph (`ic()`, img/<n>.webp) that says what a place is FOR, class `.ic.kplic`, placed BEFORE
  the place name on every place-name site: Dư đồ map label (`.mspot .mlab`), Danh sách tile (`.mtile b`), stage place title (`#sc-t h2`).
  Map `KIT_PLACE_IC`: Nội vụ phủ `bac` (mua sắm) · Thái y viện `y-thuat` · Ngự hoa viên `place-vuon` (garden moon-gate) · Cần Chính điện / Dưỡng Hòa điện `sung`
  (gặp Hoàng thượng) · Đức Thọ cung `duc` (thỉnh an, chép kinh) · Càn Ninh cung `danh` (phượng ấn) · Kính sự phòng `place-ksp` (thẻ bài) · Lãnh cung `place-lc`
  (closed gate) · own palace `home` and every consort palace `r<N>` `place-cung` (palace roof) · Dãy nhà cung nhân `place-cnh` · Tân Giả khố `place-tgk` (wash tub) ·
  Thượng thư phòng `place-ttp` (books, scroll, ink) · A ca sở `place-acs` (toy horse, bow) · Đông cung `place-dc` (crown prince's crown). All painted (gpt-2-6) in the
  same style as the older glyphs, 128 px webp on the CDN. A place without a glyph shows no icon. Faces never go on place names.
- `kitHapMark(k)` → `<i class="khap">!</i>` when place k has a happening this buổi (`adHapAt`): a 13 px light-gold disc (`--trim`) with an
  ink "!" and a cream ring, after the place name (map label and list tile). Max 2 places per buổi, re-rolled every buổi, gone after she arrives.
- Kit page sample `§78`.
## 71. SHARP PEOPLE · kitFigHD + #kfa alpha-clean (owner 15/11 "mặt mất nét" / "ô chữ nhật vàng khi chọn", review/face-sharp) — `dev/build/jfighd.js` (last module)
- **kitFigHD(img)** — every `<img>` of a `fig-*.webp` anywhere (stage #mefig / .figimg, dialogs .kesimg, identity .kidfig2, podium, cards) gets
  `srcset="<900 file> <w900>w, img/hd/<name> <wHd>w"` and `sizes=<drawn width>px`; the browser loads the HD twin ONLY when the figure is
  drawn larger than its 900 px file (width × devicePixelRatio). `src` never changes (code that keys on src is untouched). Automatic for every
  figure image (MutationObserver + resize); `kitFigHDAll()` re-fits all. Manifest `img/FIGURES-hd.json` = `{"files":{"fig-x.webp":[w900,wHd]}}`.
  HD twins: `dev/figwork/hdcut.py` (same gpt-2-6 painting cut from its ~1800 px sheet; later fixes kept by detail transfer), checked by
  `dev/figwork/hdqa.py` (down(hd) == the approved 900 file; head detail ≥ 1; face sheets looked at) before `cdn_sync`.
- **#kfa** — SVG filter (alpha' = 1.07·alpha − 0.065) that clears the faint alpha haze of cut-out figures. It comes FIRST in every
  people-picture filter (`filter:url(#kfa) var(--klf) drop-shadow(…)`), so halo / selection glow / ground shadow trace the silhouette and never
  draw a rectangle. Never animate these filters (§ motion rule STILL PEOPLE).
- Never display a figure above its file without an HD twin: new figure art ships its `img/hd/` twin (≥ 1.5× the largest drawn size).
- Tests: `dev/test/face-sharp.js` + `face-sharp-cmp.py` (face detail on screen vs file), `dev/test/face-sharp-scan.js` (animated = 0).
- Kit page sample §71.

## 73. PERSON CARD FILL · pcfBlocks (owner 15/11 "khung bên phải nó đang bị trống", review/pcard-fill; re-split 17/11 review/person-leftcol) — `dev/build/jpcf.js` (last module, after jopic) + `kitPcKey` / `kitPcKeyFit` (jk2b §20a)
Composition only: NO new component. **17/11 (owner ~04:26Z + ~04:40Z, option 1 compact) the card is split in two; the mood card and the "Lòng người" block/tab are gone (mood already sits on the portrait frame, the relation block IS the left block):**
- **LEFT, under the portrait, always in view (`.kpkey`, built by `pcfKey`, completed by `kitPcKey`)**: the acquaintance chip (`k61StChip`, moved from the chips), ONE compact two-way relation block `kitRelTable(rows,{compact:true})` (§52.2: one line per direction, no box), and the Thích / Ghét lines once known (moved from the right panel; unknown ones are dropped, not shown as "chưa rõ"). It sits before the wear slots and the stat chips; the relation chips of `.kpgrid` (rowA) are not drawn when the key block exists (one fact, one place). Numbers glow green / red when an action changes them (`pcfStatWatch`, key = direction + word).
- **Fit (`kitPcKeyFit`, kit only)**: the key block must be visible without scrolling the left column. When the card is too short for portrait + key, the figure (`--kpcw`, min 112 px) gets smaller by exactly the missing height, never per screen; the left column is at least 172 px wide (`--kpcl`) so the key text does not wrap to one word a line. iPad 1180x820 card 429 px: figure 150-180 px wide; Fold 755x1000: full 240 px.
- **RIGHT**: the info panel `.pcf` (ONE label column, no block headings since owner 21/11 ~02:00Z: rows Sở trường / Tính nết / Trọng / Hay, Đã biết ≤ 2 rows (1 line each), Dạo này 1 row) stays FIXED: `kitPcFix` moves it into the sticky `.kpstick` above the act tabs; heading and rows share one line; the act cards below are the only scrolling area. Extra blocks of other modules (`PCF_X`: Kỷ niệm, Ân oán chưa dứt) + Việc nhanh go in the tab "Chuyện cũ" (2+ act groups) or under the acts (one group / none).
Narrow cards (< 440 px container: unsupported phone portrait): the key block is a full-width row under the portrait row (`grid-area:key`, jk4 narrow template).
Old list (kept for the right panel): 3. **Sở trọng** `kitRows`: known tính nết + "Hay: …" (PERS tend); the Emperor: known likes + habits (+ jmind Sở trường). 4. **Đã biết** `kitRows` of the newest intel + the `.kchipb` chips opening "Đã biết về X" / "Chứng cứ về X". 5. **Dạo này** `kitRows` (week | line). 6. **Việc nhanh** act cards (`pbtn` in `.kskacts`), only when the card has no live act of its own.
Not filled: her own card, children, "Người lạ". Dislikes/likes (review/pcard-dislikes, `jdis.js`) are rows of the Sở trọng block; `kitPcKey` lifts the known ones to the left.
**Event dialogs (ksz3 "Có người đến" / kdper, §32.7)**: NOT changed here. The figure there is the event stage column (§32.7b/§33.6, ladder `kszLivePick3`), a taller left column makes the ladder jump to XL; a key strip needs its own kit task (see reports/person-leftcol.md).
**73.1 Fact rows (owner 17/11 ~14:15Z + ~14:40Z, review/pcard-facts) — kit part `kitFactRows` / `kitFactTap` (`j79.js`, next to `kitRows`)**: a known-fact row (Sở trọng / Đã biết / Dạo này, the Hậu cung / Giao tình / Nam nhân / Cung nhân / NPC cards, and the "Đã biết về X" column of the relation card) shows the FACT itself first, short ("Thích Cầm", "Ghét …", "Ta đã biết: đó là Quý phi …"): no "Tháng …, năm …: Dò được:" prefix and no "…" cut-off (the `.krv` line-clamp is gone). When / how / who found it open in a kit pop-up (`kpPop`) on tapping the fact; a tappable fact carries the kit dotted underline (`.kgl.kfx`, same look as the glossary tip). `kitFactRows([{l:label, f:fact html | [facts], d:{when,how,src}|null, c:cls}])`; `kitFactTap(fact, detail)` for one fact; no detail → plain text, nothing to open. `kitKnownList(p)` (jhc) now also returns `how` (Dò được / Chuyện trò / Dâng quà …). Test: `node dev/test/pcard-facts.js <url> <outdir> [WxH@dpr]`.
**62.2 THE ONE KIT POPUP LAYER (rv kit-ghichu-sections FAIL, 21/11): `.kpop` (#kpop, kpPop) has z-index 9995 — above the big emotion avatar (`.kemo-big`, 9990/9991) and every picture layer, below only the 9999 effect decorations (pointer-events:none). Before: z-index 60, so on the Fold the «Năm bậc !» popup of the art-rule modal opened UNDER the avatar (title and first line hidden). Scenes checked, Fold + iPad: art-rule modal «!», kitNoteBang, kitTapWord, kitFactTap. Test `node dev/test/kit-popup-layer.js <url>`.**
**48.3 RANK + NAME = ONE COLOURED UNIT in story text (owner 21/11 ~04:33Z #61 «tể tướng không thấy phẩm màu … tên Trịnh Thừa Chí phải đi chung với phẩm màu»; review/kit-rankunit) — `kitRankText` / `kitRpRx` / `kitRpOne` (`j79.js`)**: every «title name» in story / dialog text is ONE `.kname` unit in the rank colour (`kitRankTone`), also for a story NPC that is NOT in the people list: «Tể tướng Trịnh Thừa Chí» = «title + 3–4 Capitalised words» (family + 2 given names; a 2-word «name» after a title is a PLACE — Ma ma Đức Thọ, Thái giám Càn Thanh, Công chúa Cao Ly — and stays plain; also plain when followed by cung|điện|khố|viện|quốc|phủ|các… or when the name holds a known palace/country name, `KIT_RP_PLACES`). Before/after table: `node dev/test/kit-rankunit-scan.js` (OLD 2–4 words: 45 distinct strings / 81 uses incl. ~25 place names; NEW: 14 distinct / 20 uses, all persons); a court post alone («nhà Tể tướng», Thượng thư, Thị lang, Tướng quân) carries its colour. Known people win; text already inside a unit is never wrapped again (no nesting). Test `node dev/test/kit-rankunit.js <url>`.
**62.1 NO VISIBLE «Ghi chú» ROW (owner 21/11 ~04:30Z «Mấy cái ghi chú như vậy là để thành cái dấu chấm than ở kế bên cái sự việc của nó», repeat of OD L1867; review/kit-ghichu-bang) — `kitRows` / `kitNoteBang` (`j79.js`)**: in every kit row table (dialog info frames such as «Bổng lộc tháng ba», item cards, results, books) a row labelled «Ghi chú» is NOT drawn: its text goes behind the kit yellow round «!» (`.khap.kgnb`) at the END of the row just above it (the line it explains: «Bị cắt xén … (!)»); tap → the kit pop-up titled «Ghi chú» with that text. A Ghi chú with no row above it stays a row. One place (kitRows), no caller changes. Act-card Ghi chú (person-card info box §6.3, option cards behind their own «!» §6.2b) are separate approved forms. Test `node dev/test/kit-ghichu.js <url>`.
**73.2 TAP-WORD (owner 21/11 ~03:40Z CANON, review/kit-tap-word) — `kitTapWord(word, meaning)` / `kitTraitWords(keys)` (`j79.js`, next to `kitFactTap`)**: a trait is NOT a bullet box and NOT behind the avatar «!»: it is a short WORD with the kit dotted underline; tapping it opens the small kit popup with ONLY that word's meaning (word as the title). The person header rows read «Tính nết | Đa nghi, Hiếu thảo», «Trọng | tài nghệ, sắc». One word per trait game-wide (ETRAITS: «Đa nghi», never «dễ nghi»). `kitTraitWords(["danghi","hieuthao"])` (or the words) → the comma-joined tap-words, meaning from ETRAITS. The avatar «!» (§6.3b-1) stays only for non-word info (e.g. «Người chạy việc của cung…»). Test: `node dev/test/kit-tap-word.js <url>`; kit sample «§73.2».
`pcfBlocks(person, o, quick)` returns the HTML (kit sample §73). `window.__pcfOff=true` disables. Test: `node dev/test/pcard-fill.js <url> <outdir> [sizes]`.

## 76. kitPalaceMap — palace DETAIL map (Chính điện · Đông / Tây phối điện) — `dev/build/jpm.js` (last module) — review/palace-map → re-ported as review/palace-map-port (number 71: main's §33 is the figure scale)
Owner 11/15: a palace has the chủ vị's main hall and side halls where others live together. Flow: **Dư đồ → tap a consort palace (any of the 8
MAPH.rivalSlots, also Càn Ninh) → the palace detail map → tap a hall → that hall's room with exactly its people.** Back: room → detail → Dư đồ.
```js
kitPalaceMap({slot, k, why})   // → HTML: div.mapv.kpmv (inside the Dư đồ leather, kitLeather §34.1b) — slot 0..7 or "kn", k = palace key
**Hall plaque names (E3, owner OD:L1475, 16/11 21:48Z):** every hall carries its own court name from ONE table, `HALL_PN` in `dev/build/jhall.js` (`hallName(palaceName, part)`, `hallRole(part)`; history: `dev/handover/reports/hall-names-history.md`). The generic role (Chính điện / Đông phối điện / Tây phối điện / Dãy nhà cung nhân) is shown ONLY as a small subtitle: the first words of the `.kpm-rs` line of each hall row, the `title` of a hotspot, and the room line after the place name (§15.1). Display-only: part ids / palace keys / slots unchanged. Consumers: `kpmParts`, `placeOf` (jpm.js), `resRoomName` (jres.js). A new palace in jpal.js → add its row to `HALL_PN` (scan: `node dev/test/hall-names-scan.js`).

**r3 rules (owner OD:L1415 + 16/11 21:12Z):** `kpmArt(slot)` → `{src,dir,tam}`: the exact painted state (mourning tang-<buổi>, festival <lễ>-<buổi>, else <mùa>-<buổi>) with `tam:false`; a stand-in (missing state → season × nearest buổi, or a picture that does not paint EVERY hall of the place, see `KPM_HALLS` in jpm.js, audited by eye: `nhat-cac` = one pavilion only) is allowed ONLY with `tam:true` → kit chip `kitTam` (jgrey.js, top-right here because the leather crops the lower edge); it vanishes by itself when the exact picture lands. A hotspot/label is NEVER put on a hall that is not painted in the picture: those halls (Đông/Tây phối điện, Dãy nhà cung nhân) stay only in the kit list rows below. `.kpmv .mapw` keeps a 1.76:1 box while the painting loads. Test: dev/test/pl-courtyards-nostandin.js (0 unmarked stand-ins).
kpmSplit(k)        // {chinh|dong|tay: {ppl:[rivals present], n, res:[residents]}} — n from S.where + countAt(k): Σn = the Dư đồ chip count
kpmHallOf(p, k)    // = jres residenceOf(p).part when p lives in this palace, else "chinh" (guests)
kpmRoomImg(k, part)// = jres residenceArt(palSlot(k), part) without "img/" / ".webp" (25 rooms × 4 seasons × 4 buổi)
```
- Picture: Phượng Lệnh L2 courtyard paintings (bird's-eye; same family as our img/map-* which came from PL L1), ONLY the most luxurious
  grade `nhat` (owner 11/15): `img/pl2/nhat-<form>-<mùa>-<buổi>.webp` (16 states) + festivals `nhat-<form>-<lễ>-<buổi>.webp` (festToday();
  missing → the normal state of that buổi). The courtyard follows the RANK of the palace's CURRENT chủ vị (owner 11/15, as in Phượng Lệnh; our
  8 names are labels) — lookup `rankDir` in hotspots.json: Hoàng hậu → can-ninh · Hoàng quý phi → vinh-hoa · Quý phi → quy-cung · Phi → phi-cung
  · Tần → cac · no chủ vị → spare-cung. It changes as soon as the head is promoted, demoted or replaced; same-rank palaces share a picture
  (accepted). An empty palace opens its (empty) courtyard too; a hall tap there = the "Cung trống" card. Rooms = OUR residence paintings only.
- COURTYARD RULE (owner 11/16, OD:L1422; overwrites the 11/15 "other places" line): a courtyard picture exists ONLY for places with SEVERAL halls (`kpmParts(slot,k).length>=2` in jpm.js, one rule, no per-place list): consort palaces (by rank dir) and Ngọc Thanh các (home, form cac + dãy nhà cung nhân). A place with exactly ONE hotspot (Cần Chính điện, Nội vụ phủ, Ngự hoa viên, Dưỡng Hòa điện, Đức Thọ cung, Trường Môn viện, Kính sự phòng, Càn Ninh cung) goes STRAIGHT from the Dư đồ tap to the place (`kpmEnter(slot,"chinh")`: its existing room painting and everyone present; the room's back button is the plain "‹ Dư đồ"). KPM_DATA.places[k] = {label} only (no form, no spots, no `have`); the unused single-hall courtyard files stay on the CDN, nothing references them (pl2_sync.py keeps `have` only for dirs with >=2 spots). Test: dev/test/single-hall.js.
- Fit: the courtyard picture takes the height the hall rows leave (container units, aspect kept, hotspots stay on the picture): nothing clipped
  at 686x880, 755x1000, 1180x820, 1366x1024.
- Room header: in a hall the visit line reads only "Ở đây có N người. Người ở: <this hall's residents>." (not the whole palace).
- Hotspots: one set per picture in `img/pl2/hotspots.json` (fractions of the picture), inlined into jpm.js by `python3 dev/tools/pl2_sync.py [rawdir]`
  (also converts new PL files to 1792 px webp and rebuilds the state lists). Each hall = the map's own spot skin (`.mspot` + `.mlab` + `.msil`
  silhouettes): name + chip "N bóng người" (0 → "vắng"). Under the picture: one kit `.btn` row per hall (name · N bóng người · ở: residents —
  residence is public; who is present stays anonymous until she goes in, as on Dư đồ). Fold portrait: rows stacked; iPad: three in a row.
- Tap a hall = the Dư đồ tap rule (j77Tap: access, khắc, bái kiến card) to the palace, then the room: stage picture = the hall's residence
  painting (KIT_FLOOR / KIT_FANCHOR set per hall), title "<cung> · <hall>", people = curPeople() filtered to that hall (chest of an absent chủ vị
  in Chính điện; servants / men / kids in Chính điện). Already there: free, straight to the room. The hall choice lasts this buổi (`S.hall`).
- ONE SOURCE (review/residence-art `jres.js`, merged): who lives in which hall = `residenceOf` / `roomResidents`; room picture = `residenceArt`;
  floor lines = jres KIT_FLOOR / KIT_FANCHOR. jpm keeps no hall or picture logic of its own (only the present-this-buổi count from S.where/countAt).
  Càn Ninh: one hall (jres keeps everyone under the Hoàng hậu as "kn"). Her own home (Ngọc Thanh các, or her palace) adds a 4th row/hotspot
  "Dãy nhà cung nhân" (chip "N cung nhân" = her servants) → the cung-nhan room (residenceArt(null,"cungnhan")) with her servants on the stage.
- Back: the room's `#tomap` reads "‹ <cung>" and returns to the detail map; the detail map's "‹ Dư đồ" returns to the plan; any tab-bar tap closes it.
- Test: `node dev/test/palace-map.js <url> <W>x<H>@dpr <outdir> <tag>` (shots map → detail → room → back; checks Σ hall counts = countAt, room people =
  hall people, no overflow, no page errors). Shots: `dev/shots/palace-map/`.
- Residence rooms (jres.js, loaded after jk4): 25 rooms × 4 seasons × 4 buổi = 400 paintings `img/<room>-<mùa>-<buổi>.webp`; API `residenceArt / residenceOf / roomResidents / roomPeople / resRoomName`. Map labels stay the Dư đồ kit name tags (`.mlab`); readable Dư đồ tags are the later C46 item.


## 72. LỜI DẶN TÂN THỦ + MỤC TIÊU ĐỜI MÌNH (owner 11/15 03:55Z "hướng dẫn tân thủ"; 16/11 "không thấy ... mục tiêu đời mình? Chơi bị lạc lối" + "Không bấm xem được") — `dev/build/jtut.js` + `dev/build/jgoal.js` (after jnight, before j84) — awaiting kit review · §72 (coordinator registry; §71 = kitFigHD)

### 72.1 kitCoach (spotlight) + kitTip (was §36 on review/tutorial)
ONE look for every teaching moment: the kit panel (`.dlg.kpanel[data-kind=guide]`, `kpHeader("guide",…)`, seal **LỜI DẶN** `.kp-guide` in the
ma ma token colour `#a0584a`), the guide's portrait in the kit frame (`pcPort`, role mama rank 3), body `.ktut-say` (kit text, `kitRows` for
legends), buttons `.kbtn` / `.kbtn.alt`. No private frame, no new art.
- **Guide** = a REAL palace elder (owner 16/11): name, title and face from `staffGuide()` of review/elder-staff ({id,name,title,office,face,kr};
  intro line "<Tên> ma ma, <title>"; the same face as elsewhere). No hard-coded name in player text. Fallback while that module is absent = Quế ma ma: an existing ma ma painting (`img/FIGURES-servants.json` role mama, age band a51 → a36), the first mama identity nobody
  in this kiếp wears (`S.fidUsed`, reserved as `S.tutFid`; one face per person). Speech per VANPHONG §2: "nô tỳ" + "tiểu chủ" (Tần and up
  "nương nương"; cung nữ road "ta" + "ngươi"); "chạm", "mục"; no %, no chữ Hán, no foreign words.
- `kitCoach({title, sub, html, target, pad, interact, marks:[el|fn], side, big, btns:[{k,t,alt}], on(k)})` → `#ktut` (fixed, z 9300):
  the target stays bright inside a gold ring (`.ktut-hole`: 3 px `#f0d070` + soft glow, the rest of the screen `rgba(30,18,10,.58)`);
  `marks` = extra gold rings with no hole (the tab button of the step). The card goes below / above / beside the target (the side with room);
  a target too big for that (a whole panel) gets the card at its lower edge, above the tab bar. A step that asks for a tap (`interact`) lets
  taps through the hole only and never puts the card over the target; every other step takes all taps outside the card. Re-measured on
  resize, rotation, scroll and every 140 ms while open (the hole follows a target that moves: page turn, map unroll, re-render). No target =
  centred card on a plain dim. Reduced motion / Cảnh động off (`kmReduced`): no slide of the hole, no card rise.
- `kitTip({id, title, html})` → `.ktip` above the tab bar (`#tabs` / `#next`, like the "Có bản mới" card): small portrait,
  1–3 sentences, one `.kbtn` "Đã hiểu". Only the card takes taps; it never opens over a dialog, the menu, a motion moment, the week book or a
  mini game (it waits), and a dialog that opens hides it until the dialog is gone. One at a time, 1.5 s apart, each id once per device.
- **Lượt dẫn đầu kiếp** (`KTUT_STEPS`, "lời dặn n/12"): 1 **Game này chơi gì** (owner 16/11: "bạn tôi hỏi ủa game này chơi cái gì? Mục tiêu là gì?"):
  4 short pages in the big centred card (`.ktut-big`, ≤580 px), each a painted picture (`kitSceneArt` wide, `.ktut-pic`) + `kitRows`: Game này là gì ·
  Mục tiêu (sống sót, đi lên tới Hoàng hậu / Hoàng thái hậu, nhà và con, Mệnh truyện, kết cục) · Chơi thế nào (tuần-buổi-khắc, Hành sự,
  Dư đồ, Hậu cung · Giao tình, Tài nghệ, Tư trang/điểm trang, sự việc, Sang buổi; cung nữ road: its own tabs) · Được · mất (chết, lãnh cung,
  các ngôi, Phúc duyên, chơi cùng bạn); "Tiếp" turns the page (sub "trang i/4"), "Bỏ qua lời dặn" on every page. Replay: ☰ or Thiết lập →
  **Xem lại lời dặn** (starts again from page 1) · 2 Thanh trên cùng `#kstrow` · 3 Buổi · khắc · quẻ tuần `#k3tt` ·
  4 Đọc một thẻ việc (a quiet act card she can do now) · 5 Làm thử (tap the lit card; real act) → Thẻ kết quả `#rtoast` (kept open while
  explained) · 6 Dư đồ (a reachable place label) · 7–8 one step per tab GROUP read live from `#tabs [data-tab]` + `KG` + `.ksub [data-ksub]` (today: Hậu cung =
  Chí tôn · Phi tần · Nam nhân · Cung nhân; Giao tình = Ân oán · Phe phái) · 9 Tư trang · 10 Mục tiêu chương (the goal strip 72.2, ring on Mệnh truyện) ·
  11 Ghi sổ · Nạp sổ `#menu` · 12 Sang buổi `#next` ("Đã hiểu"). Steps whose tab is not on screen (cung nữ road) are left out.
  "Tiếp" / "Bỏ qua lời dặn" on every card; the tour pauses (hides) while a dialog, the menu or a moment is up and resumes after.
- **When**: the first kiếp on the device starts it after "Nhập cung"; an old player (a Sổ luân hồi entry, another sổ, or a sổ already in play,
  and nothing recorded on this device) gets ONE question card (only while the sổ is in its first 2 weeks; a sổ past week 2 gets no
  tour, no question and no tips — `S.tutOld` — until she turns the switch on again or picks Xem lại lời dặn) "Lời dặn tân thủ" (Không cần / Nghe ma ma dặn). ☰ → **Xem lại lời dặn**
  (`.kbtn.alt.ktutb`, only with a kiếp in play) replays it. Thiết lập → kit switch **Lời dặn tân thủ** (`OPT.tut`, `#o-tut`) turns the tour
  and the tips on/off. State: device `localStorage hclh-tut` {tour, asked, seen{}} + `S.tutTour` in the sổ (an old sổ loads unchanged).
- **Lời dặn lần đầu** (`KTUT_TIPS`): first open of Hành sự, Dư đồ, Phi tần, Giao tình, Phe phái, Cung nhân, Hoàng tự, Tư trang, Tài nghệ,
  Mệnh truyện, Sổ ghi (tabs the tour showed count as seen); quẻ đầu tuần; trò nhỏ; mưu kế (category / person-card harm tabs); thị tẩm;
  có thai; tuyển tú; tranh ghế; lãnh cung; luân hồi (a new kiếp after a past one); chơi cùng bạn. Facts only from the game (KIT_GLOSS, code).
- Off for `window.__bot` / `quiet` and for automated browsers (`navigator.webdriver`) unless `localStorage hclh-tut-test = "1"` or `?tut=1`:
  measure bots and screenshot scripts are never blocked. Co-op: all local to each machine; nothing in the shared world waits for it.
- Test: `node dev/test/tutorial.js <url> WxH@dpr <outdir>` (whole tour, skip midway, replay from ☰, old sổ). Shots: `dev/shots/tutorial/`.


### 72.2 kitGoalStrip — THE goal strip (owner 16/11 "Không bấm xem được") — `dev/build/jgoal.js`
- ONE strip for "where am I in my life": `kitGoalStrip({G?, cls?, next?})` → `button.kgoal[data-kgoal]`: small label line
  `Mệnh truyện · Chương N «chapter»` (`.kgoal-k`, `--k-lab`), the current step in bold (`.kgoal-t`, ≤2 lines), "Việc kế: …" (`.kgoal-n`),
  and a round seal-red "›" (`.kgoal-go`) so it reads as tappable; card `--k-card`, hairline `--k-hair`, 4 px `--k-seal` left edge, ≥44 px tall.
- Where: (a) top of Hành sự / Phận sự — it REPLACES the old plain line `.srvhead.obj67` (j67 keeps `.obj67` as the wrapper; there is no
  second strip); (b) the main stage `#stage > #kgoalst` (one line, no "Việc kế", under the scene title at the left, `--kgoal-top`, width = the free
  space left of the stage chips `.k3cs/.k3c` (≤440 px), never over a chip or a figure's face), hidden when the Hành sự strip is on screen at the same time (no double strip).
- Tap anywhere on it → `kitGoalDetail()` (72.3). The chapter card on Mệnh truyện › Chương này opens the same detail (no dead tap).
- Data: `kitGoalNow()` → `{road, C:{kind ms|arc|all|v1, n, max, t, g, steps[{t,ok}], act, acts, next, wait}, kicker, title, goal, step,
  next:[{t, why, tab, act?, card?, where}]}` — the ONE source for strip, detail, goal card and the tutorial step (old saves: v1 story too).
  Next things (2–3, plain words): thỉnh an Hoàng hậu (else Thái hậu) sáng nay / sáng mai · in Chương 1 "Làm Hoàng thượng để mắt tới" ·
  học một môn tài nghệ · kết giao một người; cung nữ road: phận sự · làm quen các nơi (Dư đồ) · kết thân đồng liêu (tab names from
  SRVTABS: Phận sự · Đồng liêu · Thân phận); a story act waiting → "Quyết hồi truyện".
- Road hook (review/outside-r2-r2): `window.kitGoalAlt()` → a chapter object (kind v1 + optional `road`, `todo:[{t,why,tab,tl?}]` (tl = the tab label on that road)) or null.
  When it returns one, strip / detail / card use it instead of the palace chapter of `S.st`. jkc sets it at home before the tuyển tú
  ("Chờ kỳ tuyển tú", next = months left, todo = tài nghệ · lòng cha mẹ · danh tiếng on the home tabs).

### 72.3 kitGoalDetail + kitGoalCard — chapter detail and "Mệnh truyện kiếp này" — `dev/build/jgoal.js`
- Both are a kit panel in the event frame (§8 + §32.2): `headArt` = the wide origin painting (`kitOriginWide`), `subject` + `stage:[S]` = her (full-body figure on
  the picture, §32.6), sections of `kitRows` / `kitChecks` / `kitReqRows` only.
- `kitGoalDetail()` (seal ĐIỀU): Mục tiêu chương · Tiến độ (✓/✗ steps, "xong một điều là đủ" for an any-step chapter) · for Chương 1 the
  tấn phong table (`promoReq` via `kitReqRows`) · for a story chapter Hồi i/n, Kế tiếp, Lợi thế, Hạn, Đã qua · Việc nên làm (what, why,
  "chạm: <tab> › thẻ <act>") + one option "Đi làm: …" per thing: opens that tab and rings the act card with kitCoach (72.1), the ring goes
  when she taps the card. MINIMAL view of review/chapter-detail (C24): C24 grows this panel (story so far by hồi with pictures, evidence /
  witness steps), keeping kitGoalNow as data.
- `kitGoalCard()` (seal BÁO "Mệnh truyện kiếp này"): queued right after the Nhập cung card of a NEW life only (`S.goalCard`), on each machine
  for its own life (co-op guest too): Đường đời kiếp này (đường lớn, truyện riêng «…» · N chương, chương này, mục tiêu) · Việc nên làm trước ·
  Xem lại (the strip, the Mệnh truyện tab). Never for an old save, bots or `quiet`. The 72.1 tour starts after it.
- Test: `node dev/test/goal.js <url> WxH` (new life: goal card after Nhập cung; strip in Hành sự + on the stage; tap → detail; Đi làm → ring;
  old save: no card, no tour). Shots `dev/shots/goal/` (few, small).


## 77. kitStageRail · THE stage icon rail (owner 16/11, shot 1b571e3a; review/goal-strip-fix) — `dev/build/jrail.js` (after jgoal, before j84)
- `dock:true` (stage-here r3d): on a game screen whose stage is hidden (Fold panel tab) the `onTitle` status icons (and any `dock:true` item) stand in a FREE SLOT OF THE FIXED TOP BAR (`header.hud`, class `.krail.khud`, compact 32 px buttons, found by `hudSlot` against every header element, the notice box §42.2 included) — never over scrolling content. No free slot → the old corner dock above the tab bar. Alerts are NOT rail items any more (r4: the ONE «!» is the §42.2 top-bar box). Test: `dev/test/stage-here.js` fault `rail-cover`.
ONE vertical column of small SQUARE kit icon buttons (rounded corners 8 px, the same corner as the kit ✕ `.kit-x`) at the LEFT edge of every stage (her room, every place, co-op), under the scene title
(`#sc-t`), never over a face (left gutter only: 44 px buttons = the minimum tap target, on every screen height, 6 px apart). Kit look: card paper,
gold hairline, inner hair ring, soft shadow, painted icon; a kit seal-red dot (the only round part: it is a dot, not a button) = something new.
SHAPE RULE (owner 16/11 15:05Z, "game của mình đa số các nút là hình vuông hoặc chữ nhật … đừng làm hình tròn"): NO icon button in the game is round. Every icon button is a rounded-corner square (radius 8 px, like `.kit-x`) or a rectangle; `border-radius:50%` is only for dots, avatars/medallions, seals, sliders' thumbs and decoration, never for something you tap. New round tap target = FAIL.
- Order: (1) **Lịch tháng** `img/kit/ico-cal.webp` (K-ICO-1; `mo-calendar.webp` stays the 290x420 page-flip picture of the calendar panel) → `kitMonthCalOpen()` (§58; the desk calendar in her room's corner is retired: one place).
  (2) **Chat** (co-op only) — added by review/coop-chat through the API, `order:20`, icon `img/kit/ico-chat.webp`.
  (3) **Mục tiêu chương** `img/kit/ico-goal.webp` (K-ICO-1; `mo-edict-closed.webp` stays the wide scroll of the goal flip) → `kitGoalDetail()` (§72.3); dot while the chapter goal / step changed since she
  last opened it (`S.goalSeen`, optional, old saves fine). It REPLACES the goal strip (§72.2): no strip on the stage, none on top of Hành sự.
- API: `kitStageRail.add({id, icon, title, onTap, badge:()=>bool, when:()=>bool, order})` · `kitStageRail.remove(id)` · `kitStageRail.paint()`.
  Re-drawn after every `renderStage` / `render` and on resize. Nobody draws another floating stage button; new ones go into the rail.
- The chapter detail closes like every kit modal: ✕ in the header, tap outside, Esc (a "Đóng" close option → 32.10 kit ✕).
- Sample: kit page §77. Test: `node dev/test/stage-rail.js <url> <outdir> [WxH,...]` (rail inside the stage, no button over a face box,
  no goal strip, no desk calendar, goal → detail with ✕ / Esc / outside close, calendar → LỊCH panel).

### 77.2 CLOSING ALERT · a §42.2 kitNotice (owner OD 18/11 ~19:45Z (5) + ~22:10Z, review/stage-here r4) — `dev/build/jstagehere.js` (after jplst)
- WHEN: `stClose()` = she stands in a place that is not hers and (a) it is the last khắc of the buổi (`BAL.time.khac - used <= 1`, buổi < B4L) and `accessOf(S,k)` for the NEXT buổi says no, or (b) it is closed now and she stayed on. Hours = the ONE access rule (j41 accessOf / ACC_DAY / B4L); no number of its own.
- LOOK (r4, ONE NOTICE SYSTEM §42.2): `kitNotice({id:"close:<buổi|place|now>", kind:"close", sticky:true, line:"<Nơi> sắp đóng cửa sau khắc này" / "<Nơi> đã đóng cửa, ngươi vẫn ở lại", text:"… (<lý do>). Ở lại = như lẻn vào: <word(accSneakO)>.", pic:<the place picture>})` → the top-bar «!» box lights, the top chip shows once per buổi (seen key `S.closeSeen`, optional, old saves fine; after a reload the notice is back in the box without a second chip), tap → «Tin báo» panel. Dropped from the box when she leaves or the place opens. No stage-rail item.
- Staying past closing = LẺN VÀO (r2, MAIN ROOT-55 20:08Z (d)): at a buổi turn that finds her still inside a place now closed to her, `stayRoll` rolls the existing «Lẻn vào» caught row ONCE for that buổi (j41 `accSneakO(k)`; caught = Danh -`BAL.sneak.danh` + `punish` like accSneak's fail, guards walk her home, card "Bị bắt"); not caught = she stays, a log line. Key `S.stayRoll` (optional). Tests: `DEV=fold|ipadAir node dev/test/stage-here.js`, `node dev/test/stage-stay.js`, `node dev/test/act-place-audit.js` (acts → place; home acts bring her home; remote acts `ACT_REMOTE` + `window.actRemoteHook` for parallel time).

### 77.1 kitStatusIcon · ONE status icon (owner 16/11 16:25Z, review/status-icons) — `dev/build/jstatus.js` (after jrail) on top of `kitStageRail`
Owner: "nhiều game bây giờ … chỉ là một cái icon biểu tượng download nằm ở một cái góc nhỏ … có animation sao đó để cho người chơi biết là có cái gì đó đang
download về. Người nào muốn biết thông tin thì bấm vô cái nút đó thì nó sẽ hiện những cái thông tin … Cái nào bỏ vô trong cái icon được thì mình cứ việc bỏ thôi."
RULE: a status that only says "something is running / done / needs you" is NEVER a chip, strip or reserved band on screen. It is a status icon = the §77 square
rail button + (optional) activity animation + tap → a kit info panel with the details.
- API: `kitStatusIcon.set(id,{title, glyph, busy:()=>bool, done:()=>bool, badge:()=>bool, show:()=>bool, panel:()=>kitPanelSpec, order})` · `.refresh()` · `.remove(id)`.
  It registers a rail item `st-<id>` (rail extras: `glyph` text instead of a painted `icon`, `busy`, `done`, `onTitle`). Old saves: nothing stored.
- Look/motion: the rail button as §77. busy = the glyph bobs ±3 px with opacity .55→1 (transform + opacity only, `calc(1.8s*var(--pace))`, no layout, no
  JS timer; off under reduced motion / Hiệu ứng Gọn via `reducedMotion()` — static glyph then); done = still, green; badge = the seal-red dot (needs her).
  No @media (KIT §0). While no game is on screen the rail items with `onTitle` sit in a fixed bottom-left dock (`.krail.kstdock`; hidden behind dialogs / the book).
- Panel: `kitPanel({kind:"info",look:1,…})`; the only options are real actions (e.g. "Tạm ngưng / Thỉnh tiếp"); closing = ✕ / tap outside / Esc, never "Đã hiểu".
- PAINTED ICONS (K-ICO-3, review/kit-ico-rank): `dl` = `img/kit/ico-download.webp`, `upd` = `img/kit/ico-update.webp` via `icon:` (a text `glyph` is only the fallback for a status with no painted icon). busy = the painted icon bobs (same CSS-only motion), done = still with a green kit border, badge = the seal-red dot.
- Users: `dl` (Thỉnh tranh nhân vật, jload; own info panel) · `upd` (Có bản mới, swreg; `onTap` opens its own card §35.2). · `tin` (PARALLEL TIME, `dev/build/jptime.js`, owner OD 18/11 ~20:10Z/~20:20Z): busy = someone she sent is away, badge = a report came back; panel = the reports (kitFacts + kitChips) + the people still away ("về khắc K") + the one optional real action «Đợi tin» (jump her clock to the next return khắc, same day). Glyph `信` until the painted icon (KIT REQUEST K-PT-1) exists. NOT status icons: co-op buổi clock `#kctm` + friend chip `#kctmf`
  (jcooptimer; the countdown must stay readable — owner/coordinator ruling 16/11).
- Sample: kit page §77.1. Test: `node dev/test/status-icon.js <url> <outdir> [WxH,...]` (idle → none; busy; paused dot; done ✓ then gone; panel ✕ / Esc / no "Đã hiểu";
  no old chip / dock band; game padding-bottom unchanged; icon 44 px inside the stage, over no face).

### Dialog sticky bottom bar vs sticky strips (review/flip-newlife-r1)
The pinned bottom action bar of a kit dialog (`.dlg.kpsc>#mb>.kpscopts`, `.dlg.kpanel>.mr`) is z-index 9, ABOVE every sticky strip that scrolls in the dialog body (`.ksub` 5/7, `.kpstick` 6). Before r1 the identity card face-pick strip painted over "Nhận thân phận / Đổi thân phận" at 1180x820. New sticky parts inside a dialog body must stay below 9.

### §77b kitStBadge · round status badge on a rail button (K-BADGE-HAOHUU, rv hao-huu item 6) — `dev/build/jrail.js`
`kitStBadge(st)` → `<b class="kbdg ok|busy|pause" aria-hidden="true">✓|…|⏸</b>` (st = `ok` green ✓ ready · `busy` grey … at work · `pause` amber ⏸ she paused · anything else = "" no badge). Put it as the LAST child of a `.krailb` (compact 32 px in `.krail.khud`, 44 px on the stage rail): 20 px disc, white 14 px glyph (⏸ is drawn as two 3x10 px CSS bars, font independent; rv N4: readable on a phone), 2 px card-paper ring, bottom-right corner (-7/-7 px), never takes the tap. Offline = add class `koff` to the `.krailb`: every child except the badge goes grey (grayscale + opacity .7). Kit-page sample §77b. No private badge CSS: a feature that needs a status corner uses this part (law 9).
- PAUSE SIGN IN CHIP TEXT (K-CHIP-PAUSE, MAIN 92): never the ⏸ font glyph inside a chip / row text (it reads as a smudge at chip size). Use `<i class="kpzb" aria-hidden="true"></i>` = the same two CSS bars as the badge (3 x 10 px, currentColor, 4 px right gap), e.g. the friend clock chip «▮▮ 1:05» (clock pz) and the friend status `hold` glyph (FST, chip + panel row + jhaohuu now-rows). Test `node dev/test/kit-chip-pause.js <url> <out>`.

## 80. CO-OP CHAT "Thư từ" · kitChatBtn · kitChatPanel · kitChatList · kitChatBubble (owner 16/11, review/coop-chat) — `dev/build/jcoopchat.js` (after jcooptimer)
Registry: §80 (KIT_NUMBERS.md). KIT REQUEST filed in KIT_REQUESTS.md (chat bubble + list part was missing; built here as a proper kit part, no private chat UI).
- `kitChatBtn({unread, flow})` → `button#kchat.kchatb`: painted icon `img/kit/ico-chat.webp` (128 px, gpt-2-6 gouache: lacquer-red speech bubble holding a sealed letter with a plum blossom; 8 KB, CDN, on demand) + red count badge `.kchat-n` ("9+" above 9). Placed by the module on the LEFT of HER room scene (`#stage`, `S.place==="home"`, co-op only, never in solo, hidden under the title / freeze panel / dead). `flow:1` = in-flow (kit page).
- `kitChatPanel({msgs, seat, name})` → kit panel markup (`.dlg.kpanel.kpsc[data-kind=notice]`, `kpHeader("notice","Thư từ","Truyền tin cùng <name>")`, the kit ✕ (32.10) in the header) inside `#kchatp.modal.kpscene` (z 9400, covers the screen; tap outside / Esc / ✕ close it back to the icon). Body = `.kchat-list` (`kitChatList`: `kitChatBubble` per line, mine right on cream-gold, friend left on paper; head = sender name + game-style time "hạ tuần, tháng 3 · Buổi chiều"; empty note "Chưa có thư nào…") + a row of the kit text box (`kitInput`, 300 chars) and the kit button `.kbtn` "Gửi". Enter sends.
- Text is ALWAYS escaped (plain text only). Sender name = her character name at send time.
- Arrival while the frame is closed: unread badge + lit icon (`.kchat-un`), shake (`.kchat-shake`) + §68 `kitFxBurst("glowburst")` + `kitFxLight("glow-gold")`, sound `kitSfx("notice")` (the sound kit's own OPT.snd / mute / hidden-tab rules). Gọn / reduced motion / bots: no shake, no particles, a still gold glow only. Away from her room: `kitLine("Có thư từ hảo hữu")` + sound.
- Transport: PROTOCOL §10 (Worker `chat` message, last 50 per room, history in the `room` snapshot, unread = friend lines newer than localStorage `ctm-chat-seen-<room>`).
- Tests: `node dev/test/coop-chat.js <out> [AxB@dpr] [BxH@dpr]` (two clients, live Worker) · `node coop/worker/test/chat.test.mjs` (server). Kit page: sample §80.
- Rail (owner 16/11): the left of the stage is ONE icon column, `kitStageRail` (KIT §77). When `kitStageRail.add` exists, jcoopchat mounts the chat icon there (`add({id:"chat",icon:"img/kit/ico-chat.webp",title:"Thư từ",onTap,badge,glow})`, `pulse("chat")` on arrival, `remove` outside her room); the own `button#kchat` is only the fallback until §77 merges (no separate floating icon style stays after that: delete `kitChatBtn` placement then, keep the sample). Coordinator: re-point `ICON()` in dev/test/coop-chat.js to the rail item at merge.

### 50.2 kitPersonDlg — THE person pop-up for hosts outside #modal (owner 16/11 07:35Z + 07:37Z, OD:L448 / OD:L963; review/popup-fullbody) — `dev/build/jpdlg.js`
- RULE: every pop-up where a person appears = LEFT the person's FULL-BODY figure (rank + name chip above), RIGHT TOP the event picture (landscape banner), below it the info, bottom the buttons. The small framed portrait (`.kpsubj` + pframe) is never used for a person pop-up. ONE event = ONE frame size for all its pages / steps.
- #modal dialogs get it from kitEventStage / kitDpApply (§32.7, §50). Overlays OUTSIDE #modal (tutorial coach `kitCoach`, tips `kitTip`, any future notice) call `kitPersonDlg({kind,title,sub,p,fig,name,pic:{src,lab},html,btns,})` and then `kitPersonDlgFit(root)`; nobody writes a second copy.
- Size: ALWAYS the one pop-up frame (`--kpw` x `--kph`, §8.1) — tutorial pages, spotlight steps and tips are identical, and identical to every #modal person pop-up of the viewport (reviewer popup-fullbody-r1 #3, OD:L963). A spotlight card that cannot sit beside its target lies at the free edge; the rest of the target stays tappable.
- Figure: kitStageFig (§32.2) laid by `kitPersonDlgFit` — the painted body (head-top .. feet) fills the figure column under the name chip, feet on the column floor, body = the column height / (1 + `BAL.bookFrame.cRef`) skull top → feet, the same for everybody (§56.4); a wide hem / sleeve is NOT cut: it spreads right under the text (`.kpdr` z-index 1, `kitFullFigX`). Guide figure: `fig-mama-*` (`mmFig()` in jtut).
- Narrow (< 600 px): figure column clamp(84px,32%,140px) beside the text (the #modal template stacks the figure on top there; a coach card that tall would cover the screen).
- Tests: `dev/test/popup-fullbody.js` (every PEND person event, person info / news / result / night / intel / evidence, the tutorial pages + steps, a tip: FAILS a small portrait, a missing figure column, pages / steps of one event that differ in frame size) and `dev/test/kit-conform.js` (T4 small portrait = FAIL; tutorial pages / steps one size).
- 50.3 DEFAULT BANNER (`kitDefaultBanner`, jk4): a person pop-up whose event has no picture of its own (ĐIỀU / LUẬT / BÁO / KẾT QUẢ / ĐÊM / tai mắt / chứng cứ) still shows the picture RIGHT TOP: kitInfoArt of its title (info-*.webp / act-cat-*), else one act-cat picture per kind (KIT_KIND_BANNER). A person panel without an options group scrolls as a whole: its figure column is the visible height of #mb and sticks at the top.
- popup-fullbody.js also FAILS: no picture right top, figure column / visible figure < 150 px, any person pop-up whose frame size differs from the viewport's frame (all kinds, tutorial pages / steps / tip).

## 81. SCENE-END BUTTON — every animation scene ends with ONE short button (owner OD:L1261, 16/11 07:20Z; review/kit-keeper-2) — `dev/build/j93.js` (`kitSceneEnd`, `kitSceneEndLabel`, `kmStage`)
RULE: no animation / scene closes by itself, and no scene closes by a tap anywhere. The scene plays (a tap during it = skip to its final frame, hint "Chạm để bỏ qua"); at the final frame the hint
disappears and ONE kit button `.kbtn.kmend` (bottom centre of the scene, safe-area aware, 140 px min width, fades in) shows words that fit the event. ONLY that button closes the scene
(the next queued scene starts after it). Never "OK"; never a second button in the same scene (scenes that already end with a list + their own button, e.g. the reward chest "Nhận", count as having it).
Parts: `kmStage(cls,html,{end:"…"})` does it for every scene built on it (no `hold` auto-close any more); `kitSceneEnd(ov,label,onClick)` is the same button for a scene that is NOT built on kmStage
(it removes the hint, adds `.kmend`, one button even if called twice); `kitSceneEndLabel(cls,o)` = `o.end` || class table `KM_END` || "Tiếp theo".
Words (VANPHONG register): card flip lands on HER → "Chuẩn bị thị tẩm"; another consort picked → "Ta biết rồi"; promotion edict / demotion → "Đã hiểu"; birth / pregnancy → "Tiếp theo"; death → "Tiếp theo";
anything else → "Tiếp theo" (information) or "Đã hiểu" (a rule / consequence). The caller may pass its own short words (`end`).
Reduced motion / Gọn: the scene is shown at its final frame at once, the button is the same. The queue safety timer is now 10 min (a scene waits for her button).
SCENES THAT MUST USE IT (list for the sweep, state at this commit): ON kmStage = DONE (button automatic): card flip km-tablet (j93 kitFlipTablet) · promotion edict km-edict (kitEdict) · demotion / cold palace km-gloom (kitGloom) · pregnancy / birth km-bloom (kitBloom) · death km-inkov (kitInk) · the big card flip scene `jflip.js` kitCardFlip (r1: `kitSceneEnd`, "Chuẩn bị thị tẩm" when it lands on HER, "Ta biết rồi" otherwise; CF.hold auto-close removed).
STILL TO SWEEP (call `kitSceneEnd`, remove their own auto-close timer / tap-to-close): `jtoil.js` toilReveal (§60.5, auto zoom + "Chạm để đóng") ·
`jpromo.js` kitPersonReveal + `kitReward` chest (manual: own "Nhận" — check wording per event) · item fly / reveal (`jitev.js` kitItemFx, `jkrev.js`) · level-up / skill reveal · festival and place-day scenes ·
night end / new day (`jnight.js` kitNightEnd, kitNewDay) · week change calendar (`kitCalendar`, dawn) · co-op scenes (`jcoop*`: buổi clock end, waiting-strip results) · the card-flip VIDEOS (`cardflip-videos`) · a `kitFlipNote`-like note is NOT a scene (no tap) and stays.
The sweep worker finds the rest with `grep -n "Chạm để đóng\|Chạm để bỏ qua\|later(.*close" dev/build/*.js`.
**81b. FULL-BLEED SCENES (owner 17/11, toil-reveal-fix; `j93.js` `.km-full`):** a scene whose own backdrop fills the screen (makeup reveal `ktrv-ov`, card flip `kcf`) carries the class `km-full` on its `.kmov`: no padding top or bottom, so the backdrop runs edge to edge and the scene-end button sits ON it (no dark band under the button; top and bottom treated the same). Its own content keeps clear of the button with `var(--kmend-room)` (= 68px + safe-area, defined on `.kmov`). Podium: its footer has no cream band (`.kpod-ft{background:none}`). Scenes that centre content on the dim overlay keep `.km-endon` padding (nothing to bleed). `kitSceneFit` skips `km-full`.
**81c. kitFullPic · THE full-screen scene PICTURE (owner 21/11 marks #52 + #84; review/ending-screens-2; `j93.js`):** ONE picture layer for every full-bleed scene that shows a painting: `kitFullPicHTML({key, fb, mode, cls, fx, fy, extra, img})` → `.kfull` (absolute, covers the WHOLE screen: no frame, border, radius or dark band; `object-fit:cover` around `--kfx/--kfy`; a soft top + bottom shade `.kfull-shade` keeps the title and words on it readable); the scene's title, card and ONE button (81) lie ON it. ORIENTATION by KIT §0 (`kitSzMode`: kv1 / kv2, never a width test): phone portrait = `img/<key>-port.webp`, iPad landscape = `img/<key>-land.webp`, used only when the key is listed in `img/INFO.json {have:[…]}` (Foreman C adds it with the picture: no code change, no 404). Until then the scene's own picture `fb`: mode "cover" (big painting, cropped to fill) or "blur" (small card picture: blurred copy fills the screen, the sharp picture sits whole in the middle — never stretched). `kitFullOri()` / `kitFullSrc(key, fb)` = the pick. While one is open the room's lean-in emotion seal clone (`span.kemo-big`, jemoseal) is hidden. Users: kitLearn (§86, "blur"), kitNewDay beats (§62, cover; its own `.kne-pic` gets `.kfull`). Test: `node dev/test/fullscreen-scenes.js` (Fold + iPad).
Sample: kit page §81 (opens a real scene: the button shows after the animation and only it closes). Test: `dev/test/scene-end.js`.

### 45.4 PANE BAR NEVER OVER A POP-UP (main s14 bug ".kpbar above modal"; review/kit-keeper-2)
`.kpbar` (the sticky pane bar, §45) was z-index 40 while every `.modal` (dialogs, notices, results) is z-index 30, so the bar drew OVER an open pop-up. The bar is now z-index 29: under every `.modal` (30), the week summary `.dawn` (40), toasts (45); `#popw` (41) still lies above the bar. Rule: nothing sticky inside `#panel` may use a z-index ≥ 30 (it would cross the pop-up layer). Test: `dev/test/kpbar-modal.js` (a pop-up open over every pane tab: the pop-up's centre point belongs to the pop-up, not to the bar).

### 28.13b BIG ITEM · frameless + hi-res (D3 item-big, OD:L686; KIT REQUEST from review/item-big @adda320; review/kit-keeper-2) — `kitItem` / `kitItemBigSrc` (jk2b)
Sizes `lg` (150 px) and `xl` (min(260 px, 36 dvh)) of `kitItem` are the CENTRE picture of an item (info pop-up, gift / econ / pet-care / veil / mark pictures, reward spotlight): they carry NO frame — no border, no ground, no box-shadow, no overflow clip, no tier ground image
(the 9-slice frame and the t-ground of §28.13 are for `slot` / `sm` / `md` only). The painting stands alone on the pop-up's paper with a soft drop shadow; the grade is the grade chip on the bottom edge of the painting box (§54.1b) and the name; the floating chips (`kitq` ×N, `kits` Ngự, `kiton`, `kitm`, `kitx` Xa xỉ) stay.
`kitItem({…, frame:true})` keeps the frame for a special case (none today).
HI-RES: for lg / xl a small painting `img/item-X.webp` (256) is requested as `img/item512/item-X.webp` (512; `kitItemBigSrc(src)` does the mapping, other sources unchanged); if the 512 file is missing the small one is shown (`onerror`, one swap). So the ~20 call sites that passed the small src (jgift, jinv, jkrev, jmark, jpet, jpetcare, jveil, jwdinv, jlost …) are hi-res and frameless WITHOUT being touched.
Not covered (own source functions, no item512 mapping): pet stage pictures, veil / mark pictures, wardrobe `wd-*` icons (`img/wd512/…` are already 512 where the call site passes them), the 22 items with no `item512` painting (list in reports/item-big.md → ART REQUEST). Tư trang grid (`slot`) and all lists (`sm` / `md`) keep their frame.
SPLIT with 28.13f (main s14, 16/11, OD:L686): CENTRE displays — the receive / lose / reward NOTICES whose picture slot holds the item (`kind:"notice"` + `itemPic`: kitLose "Mất đồ", receive, reward; `.kpb.kphas > .kpsubj.kpitem`; jinv `kpBuild` skips `kitSlotDress` for them) show the ITEM ALONE, big (picture column `min(150px,38%)`), sharp, frameless. The bag / Tư trang item pop-up (`kinvOpen`), every `kind:"info"` panel with an item picture (gift, econ, veil, mark) and the equipment-slot cards stay COMPACT with the grade frame + ground (28.13f, owner "ĐIỀU · Ô cài tóc far too big"): `kitSlotDress` marks their item `kitem-fr` (frame on, 64 px header icon). Rule for new code: item alone in the middle of a notice = lg/xl frameless; item as a row/slot/card in a list or bag = md / slot / `frame:true`.
Sample: kit page §28.13b. Test: `dev/test/item-big.js` (also the real "Mất đồ" notice box ≥ 120 px and the bag pop-up still framed).
IT01 CHECK (review/kit-item-big, ROOT-77 queue): the KIT REQUEST of reports/item-big.md (frameless big mode + hi-res source + call sites) is ALREADY met by the above — `node dev/test/item-big-scan.py` lists every big call site (24: 9 pass src512, 5 pass the small item src that kitItem maps itself, 3 pet pictures already ask `img/pet512/` via `petSrc(k,1)`, 4 veil paintings `img/veil-<tier>.png` (one size), 2 wardrobe icons `w.icon`, 1 empty ghost): none is framed, none needs a call-site change. `node dev/test/kit-item-big.js` guards the mapping (item → item512 relative and CDN-prefixed, item512 / pet512 / wd / veil / empty unchanged, md / slot keep the small file, the 512 → small fallback). ART GAPS (no 512 twin, listed for Foreman C — not drawn here): 22 items with no `item512` (a-giao, bo-dieu, bot-ngua, dan-co, gam-to-chau, hac-dinh-hong, hinh-nhan, huong-tram, lua-hang-chau, nghien-muc, ngoc-boi-ban, nhan-sam, phan-son, thu-nha, thuoc-an-thai, thuoc-giai, tram-phuong, tranh-co, tui-thom, vong-ngoc, xa-huong, yen-sao); the 213 wardrobe icons `img/wd-*.webp` (`img/wd512/` holds 138 garment paintings, a different set); the 4 veil paintings (single size); 44 `img/pet-stage/` pictures.
## 79. TÁT AS A SHORT GAME · kg82SlapBar · slapGame · slap tiers (owner 16/11, review/slap-mg) — `dev/build/jslap.js` (after jts) + `jface.js` (marks) + `BAL.slap` (jbal2) — KIT §79 (confirmed by the coordinator brief)
- **Engine `slapbar`** (j82 `KG82_ENG`, kinds `tat` and `ne`): one needle swings over a bar, ONE tap, about 3 s (`BAL.slap.bar.ms` / `.dodge.ms`). `tat`: red zone = nặng (raw 10), amber = vừa (6), elsewhere or too late = nhẹ. `ne` (dodge): tap inside a green zone = dodged. Drawn with the j82 helpers only (`kg82Canvas`, `kg82Silk`, `kg82Lbl`, `kg82Pop`); no private CSS. `KG82.peek` serves bots; `window.__slapTap()` taps (tests).
- **`slapGame({dodge, title, go, skip, skipSub, rows, onDone({raw, skipped})})`**: intro card = `tsRows` + two `.kbtn` (play / skip), then the game, then straight on. Bots skip. `slapTierOf(raw)` = 1..3.
- **Her slap**: `doAct(i,"tat")` is wrapped: game first, then the normal act with `SLAP.next = tier`. "Tát luôn" = nhẹ (`BAL.slap.def`): a lazy slap is a light one, so a harder slap is a risk she chooses; a random tier would make skipping a free gamble.
- **NPC slap on her** (`runAct(npc, S, "tat")` wrapped): tier rolled by rank gap (`BAL.slap.npc`), a `tsOpt` card "Né đòn" (dodge game, tier -1; nhẹ misses altogether) / "Chịu đòn". Skip = no dodge. Bots take the rolled tier.
- **Marks** (kit face fx entry `tat`): `p.slap.sev` 1..3. Same `img/fx-slap.png`, darker per tier (`.kslap.s1/.s2/.s3` in the one face-fx stylesheet); nặng adds the painted `img/fx-slap-swell.png` (soft red swelling, no blood). Weeks, Sắc, Đức, grudge, Hoàng thượng / Thái hậu, evidence: all in `BAL.slap`. Old saves without `sev` read as nhẹ (facefx-all-r2 rule on main; reviewer r1). `slapGive(p, by, why, sev)`; `slapSev(p)`.
- **Evidence**: vừa / nặng slaps may give the target or a witness a chứng cứ at once (`evT`, `evW`) and a mark that is still on may be reported later (`rep`, weekly, once per mark).
- **Co-op**: acts on the friend go through the existing `runAct` path (deltas sent by jcoopworld); the tier rides on the same `res` message (`m.slap`) so the friend's face gets the same mark. No dodge in co-op (the friend's act is already resolved on the sender's side).
- **r2 (review/slap-mg-r2)** — difficulty = the ONE tier system `mgTier` (jmgt, review/mg-balance): occasions `tat` (her slap, stakes by HER rank) and `ne` (dodge, stakes = the attacker's rank) in `BAL.mgTier.occ`; skill = Vũ (`KG82_F.tat/ne`, like Bắn cung). The engine reads `env.lv` as the ease 0..5; zones are TIME windows round the centre crossing (`BAL.slap.bar.redMs/amberMs`, `dodge.safeMs`, needle speed `w`, all by ease), so rates do not depend on the screen. Intro row "Độ khó" = `mgDiffTxt`. Dodge card odds = `BAL.slap.dodgeOdds[tier]` (measured).
  First play of each kind: the j91 one-screen demo card (`k91DemoCard`, `S.mgSeen`); the clock starts after "Đã hiểu, bắt đầu". Idle `BAL.slap.hint[tier]` ms → the j91 hint glow (`k91Glow`) round the zone + the line says where to tap. Gọn / reduced motion (`kfStill`): no pops (the result is a still line), the glow is a still outline.
  Painted parts drop in by file name (no code change): board + left picture `img/kit/mg-tat-bg.webp`, `mg-ne-bg.webp` (kg82Bg / kg82Pic), sprites `mg-tat-ruler`, `mg-tat-hand`, `mg-tat-zone-red`, `mg-tat-zone-amber`, `mg-ne-zone-green` (kg82Spr, `KG82_SPR.tat/ne`); until then kit silk + plain shapes, each missing file listed once in `CTM_MISSING_PICS` (kind "mg").
  `kg82Pic` (whole family): a kind whose painting is not on the CDN (`KIT_CDNHAVE`) gets no picture column at all (was: a broken picture for ~2 s until the CDN retry gave up).
- **r3 (reviewer, review/slap-mg-r3)**: the game no longer closes by itself (OD:L1261): the result row ("Kết quả: Tay nặng / Né kịp…") stays with the j82 end button `#kg82ok` "Đã hiểu" (the kit turns it into the frame ✕, OD:L331, same as every j82 game / playArt); only it closes and the act card follows. Game length words printed from `BAL.slap.bar.ms` / `dodge.ms` (`kitNumVi`, ONE CORE). Intro rows coloured by meaning (every tier costs Đức → loss colour, OD:L908). Hint line "Giữa thước đang sáng" = the glow ring. The NPC-slap result card carries the slapper (`who`, full-body person pop-up, OD 07:35Z).
- Test: `node dev/test/slap-mg.js <url> <WxH[@scale]> <outdir> [N]` (met face + kslap s1/s2/s3 + kswell asserts, demo, glow, Gọn, tier vs rank, costs per tier, dodge flow, screenshots). Rates: `node dev/measure/mg-bots.js <url> tat,ne e0,e2,e5 skilled,casual,random 200` (anticipation bot).

## 82. TITLE SYSTEM PARTS · name tag in 3 lines, title plate, hiệu joined to the rank, title info card (owner 16/11 13:00Z / 13:15Z / 13:20Z; review/title-tag) — `dev/build/jtitle.js`
RANK (Tần, Phi, Quý phi…) is NOT a title. Three things, three parts:
- **Danh hiệu (title, line 1)** — a worn plate over the head, chosen by her. `kitTitleWorn(p)` → title object or null (`S.titleWorn` / `p.titleWorn` = id in `KIT_TITLES` or an object `{id,name,tier 1..8,when,how,fx}`; game logic owns the data, the kit draws it). Every title has its OWN short evocative name (never "<place> · <festival>"). A worn title may give a stat only while worn (`fx` text on the card).
- **Hiệu (emperor-granted: Thục, Hiền, Đức…)** — the game's existing `p.hieu` / `S.hieu` (j8 "ban hiệu"). It JOINS THE RANK everywhere: `kitHieuJoin(rank,p)` → "Thục phi", "Đức quý phi" (not Hoàng hậu, not lãnh cung); called by `rkOfFace` (j19) and `rkName` (j8), so stage tags, pop-up captions, lists, log, HUD all carry it; `kitRankTone` colours it by its last word.
- **3-line tag** — line 1 plate, line 2 rank (+hiệu), line 3 name. ONLY on the painted stage (tag UNDER the feet, `j59tagHTML`) and on the left full-body figure of person pop-ups / event frames (ABOVE the head, `kitStageFig(p,{plate:true})` from `kitEventDp`); everywhere else rank + name only (`kitNameRank`). `kitTitleTag3(p,rank,name,col,me)` builds it for samples.
`kitTitlePlate(t,o)`: pill with the tier colour = `RCOL[tier-1]` (the one palette, §1.3), name in `var(--display)` bold white with a dark edge. ART SLOT: when `img/kit/title-plate-<tier>.webp` exists (transparent painted plate, Foreman C) it replaces the CSS plate (`.kdh-art`, background image 100 % x 100 %); until then the CSS placeholder is shown. Effects rise with the tier: 1–2 flat; 3–4 soft glow; 5–6 glow + light sweep; 7 + sparkle star; 8 two stars + gentle pulse. Still (no motion) when `kfStill()` / reduced motion. Tap a plate (not on the stage) → `kitTitleOpen(t)` = kit info panel: Đạt được (when), Cách có (how), Khi đeo (effect), Đang (worn or not).
Sample: kit page §82. Test: `dev/test/title-tag.js` (stage 3 lines in order, pop-up plate above rank, no plate in lists/cards, "Thục phi" on stage, info card opens, 0 page errors).

## 61. FIG-BG · NOT SHIPPED (owner 16/11 13:30Z, OD:L1314)
The C8 painted-scroll background behind full-body figures is switched off everywhere: figures stand directly on the frame's own background. The art stays in storage (img/), unused; no jfigbg module in the build.

## 84. KIT SIZE SYSTEM · 4 frame sizes, ONE layout per frame kind, ONE figure scale, THE button, picture sizes (owner 16/11 15:00Z s17 + 16:00Z s19 sample review (1)–(9); review/kit-size) — `dev/build/jksize.js`
STATUS: LIVE since phase 2 (see "PHASE 2 · LIVE" below); sample sheets (`kitSizeSheet(area)`, area = frames | buttons | long | items; shots `dev/test/kit-size-ba.js` + `dev/test/kit-size-compose.py`). NOT yet wired into the game: the mass change waits for the owner's OK (relayed by main).
- ONE table `KIT_SIZE`: frame sizes S/M/L/XL (width per view kv1/kv2, body cap), figure sizes S/M/L/XL as measured BODY height, layouts, picture sizes, button classes.
- `kitFrameSize(dlg)`: the smallest size whose body holds the content (person frames need an info area ≥ 210 px). `kitFrameApply` = unify buttons + fit figures + pick size.
- (7) ONE layout per frame kind: `KIT_SIZE.kindLay` — big (VIỆC, ĐIỀU, LUẬT, BÁO, ĐÊM) = figure L, column 176; small (KẾT QUẢ, TIN) = figure M, column 140. The size class changes ONLY the info area.
- (6) ONE figure scale: `kszFigFit` sizes every figure by its measured body (`kitFigBody` ht→b) = the layout's body height × the child factor `KIT_FIG.kid(age)` (men are NOT taller, §56.4). Never by the picture box. The column height is the same for everybody (skull top → feet + the tallest Hoàng hậu crown); `kszFeetFit` reckons its room for that crown and a worn-title plate, never for this person.
- (1) tag ABOVE every frame figure = `kitTitleTag3` (title plate when worn, rank line 1, name line 2; Thái hậu / Hoàng thượng gold, rank only). Painted scenes: tag UNDER the feet (j59). Tuần lục book: no tag.
- (2) info kinds `KIT_SIZE.infoKinds` (ĐIỀU, LUẬT, TIN, KẾT QUẢ, BÁO without options): NO "Đã hiểu" / "Đã rõ" button; header carries `kitXHTML` ✕; tap outside closes (first tap only closes, OD:L418).
- (3) `.kszbody` and `.kszright` centre vertically.
- (4)(5) THE button `kszBtn`: row 1 = picture LEFT + name / TỐN / ĐƯỢC / MẤT; row 2 = GỢI Ý in one full-width box. In a frame every button is full width and the same class (`kitBtnUnify`: the largest needed). Class (`kitBtnSize`) sets only the picture: S Q56 · LS Q72 · LR PS 84x112.
- (9) pictures: portrait PS/PM/PL, landscape LS/LM/LL, NARROW strips NS 192x56 · NM 300x84 · NL full x 110/140 (= the banner of a person frame), square Q56/Q64/Q72.
- **v3 (kit-size #3, owner 16/11 16:45Z s20 (1)–(6); sample only, waiting for her verdict)** — same file, functions `kszFrame3(spec,size)` / `kitFramePick3` / `kitFrameApply3` / `kitFrameFits3`; kit page: `kitSizeSheet("v3:<kind>")` (14 kinds of `KP_SEAL`) and `kitSizeSheet("items3")`; shots `dev/test/kit-size3.js`, `dev/test/kit-size3-items.js`, `dev/test/kit-size3-compose.py`.
  - (1) EVERY frame = person + event picture. Event picture = the real game path (`spec.pic`, else `kitDefaultBanner(m,kind)`). A frame with no person of its own shows its NARRATOR `KIT_SIZE.v3.narrator` (thân tín maid for TIN / LUẬT / BÁO / TUẦN / MẬT BÁO…, Hoàng thượng for ĐÊM / BAN THƯỞNG, the player for KIẾP / KẾT QUẢ of her own act).
  - (2) each size has its OWN presentation `KIT_SIZE.v3.pres`: **S = "one"** (one main picture left, by `KIT_SIZE.v3.focus`: event-centred kinds → event picture left stretched to the body, person = kit avatar in a fact row; person-centred kinds → portrait frame `pcPort` with tag above, event picture = strip on top of the info; buttons = a grid under the body across the whole frame); **M / L / XL = "fig"** (full figure `KIT_SIZE.fig3` M 300 / L 370 / XL 480 body px, column 140 / 162 / 220; event picture TOP-RIGHT as wide as the info + button column). The body is exactly as tall as the left column; the event picture GROWS into what the text leaves → no empty space. Picker: the smallest size whose presentation holds the content (S: info ≤ the portrait column, or body ≤ `bodyS` 200 with the event picture; body + buttons ≤ `capS` 340; XL: more text scrolls inside the info column).
  - **kit-size #4 narrator (owner 16/11 19:23Z s22, overwrites the maid / Emperor / player narrator of (1))**: a frame without its own person is told by the NAMED PALACE OFFICIAL whose office covers the topic. ONE map in BAL: `BAL.staff.narrator` (jbal) kind → post: TIN / BÁO / TUẦN / VIỆC = `kn` Quản sự ma ma (palace report, maids, lệ bạc) · LUẬT / ĐIỀU / CHỨNG CỨ = `tn` Chưởng sự cô cô (Thái hậu's edicts, cung quy, punishments) · ĐÊM = `ksp` Kính sự phòng · BAN THƯỞNG = `tq` Tổng quản thái giám · no office fits: MẬT BÁO / CẢNH GIÁC / NGƯỜI = her thân tín maid (her own informant), KIẾP / KẾT QUẢ = the player. `kszWho3` resolves it (jstaff `elderBy`, `S.court.tq/ksp`), real faces/figures (`staffFace`, figFor). Size S keeps the #3 portrait pendant (owner 16/11 ~19:32Z reversed the small-figure S after the full-screen shots: "để nguyên hình toàn thân sẽ không thấy rõ cái mặt").
  - (3) FOCAL CROP (owner 16/11 19:54Z TIN sheet (2); overwritten by owner ~21:20Z, coordinator FAIL of the blur-pad: "the picture must FILL the kit frame, the letter must sit inside the crop"): `KIT_PIC_SUBJ` holds a focal box for EVERY event picture (ev-* / info-* / act-cat-*: 329, each looked at; guard `node dev/test/kit-size7-focus.js` fails a picture without one — a new picture MUST add its box). `kitPicFocus(box,img)` (called by `kszPicFit3`) is ALWAYS `cover` (the picture fills the frame at every size, NEVER letterboxed, scaled down or padded with a blurred copy — the old `.kpz` zoom-out is deleted) and positions the crop so the CENTRE of the focal box is the centre of the visible window (clamped to the picture). When the box is bigger than the window (thin strips) the window shows the middle of the subject; the frame, not the picture, adapts: a strip's floor height = the subject, at most the standard NARROW ratio NM (300x84). Guard: `node dev/test/kit-size7-pics.js <url> <WxH>` renders every event picture in the real frame at S/M/L/XL (strip kind + event-centred kind) and fails when one does not fill or its subject centre is outside the window. Outside v3 frames `kitSceneArt` starts every event picture's cover crop on its subject centre (object-position).
  - (9c) EVERY CARD / ROW HAS A PICTURE (owner 16/11 21:10Z chapter goal list + 21:18Z Tư trang "HÔM NAY"): goal / task option cards "Đi làm: <việc>" find their picture on the task (`kitOptPic` wrapper, jopic: full title → task without the prefix → act / category picture `kitActArt`, never the placeholder when a real one exists); the card's picture form follows its text (§6.2b: short text → small square). Agenda / today rows = `kitAgendaFact({k,n})` (jksize): th Thái hậu · hh the Empress (none: kit portrait fallback) · emp / night Hoàng thượng · fest the festival picture `ev-fest-<key>` · else the act picture. Users: Tư trang HÔM NAY (jtoil). Other today / agenda lists must use the same part.
  - (9b) PICTURE SIZE PER FRAME SIZE (owner 16/11 19:54Z TIN sheet (1): only the kit's standard sizes, no stretched ratio): S event-centred = left picture `KIT_SIZE.pic[KIT_SIZE.v3.picS]` = PM 120x160 (3:4 portrait), centred in the body, never stretched; S person-centred = portrait pendant `pcPort` + event strip across the info (floor NM ratio); M / L / XL = event band top-right as wide as the info column (LL family: full width), height = what the text leaves, floor = subject at most NM ratio.
  - (4) buttons: frame layout first, then its button area = grid (`kszBtnGrid3`): cell = what the widest SHORT (class S) button needs at its narrowest (title ≥ 6.5 em, chips never break; ≥ 140); cols = what fits; short buttons 1 cell, long (LS / LR) the cells for ≥ 280 (full row on narrow frames). THE one kit button `kszBtn` everywhere.
  - (5) items (owner 17:20Z): ONE MASTER = the XL item (frame + picture + Xa xỉ square box, `KIT_SIZE.item3`), at L 104 / M 72 / bag slot (`kszItem3` = the real `kitItem` sizes): the Xa xỉ box keeps exactly the same place and size relative to the frame at every size (measured 0.747 / 0.027 / 0.227 of the frame at XL, L, M, slot); only its content changes (word + number at XL / L, number only at M / slot). Grade chip: §54.1b (on the frame edge, scales with the frame). S 52 dropped. Wear row: grade chip on the frame, no grade line.
- **PHASE 2 · LIVE (owner 16/11 19:22Z s22 approval; review/kit-size)** — `kitFrameLive3(m)` (jksize.js, now in the build, last module) = the LAST step of every `showModal` (outermost wrapper): a `#modal` kit panel (`kpBuild`) of a `KP_SEAL` kind is re-laid as THE v3 frame, MOVING the game's own nodes (header `.kph` + ✕, info `.kpmain`, option buttons `.opts` with their handlers): `.dlg.kszf.ksz3.kszlive[data-ksz][data-pres][data-focus] > #mb > .k3body(left + .k3right[.k3ev · .kpmain · (M/L/XL) .opts.k3btns]) + (S) .opts.k3btns`. Left = the event's own person (`kitStagePeople`) else the kind's NARRATOR (`kszWho3`, `BAL.staff.narrator`); ĐÊM narrator tag line 1 = his office (`KIT_SIZE.v3.office.ksp` "Kính sự phòng"). Event picture = the dialog's own band / tall slot / `headArt`, else `kitEvArt`, else `kszEvSrc3` (never lazy). Size = `kszLivePick3`: smallest S/M/L/XL whose presentation holds the content (`kitFrameFitsLive3`, also inside the modal box); re-picked when a figure loads and on resize. Option buttons (§6.2 cards) = the v3 grid `kszBtnGridLive3` (cell = widest short card at min-content with title ≥ 6.5 em; long cards span ≥ 280). XL: the body stays the figure's height, more content scrolls in the info column. The older fit passes (`kitDlgFit`, `kitDpFit`, `kitDpApply`, `kitCompactFit`, `kitOnePic`, `kitSlotFit`) skip a live frame; the `.dlg` is reset (`kszLiveReset3`) before the next pop-up, and also after `showModal` re-shows the SAME item (its `#mb` was rebuilt, so the frame is laid again; review kit-ico-rank-r1: the end card re-shown with its Bảng vàng line kept the old layout). NOT converted (pages / menus, keep their layout): `.kpid`, person card (pcm), two-person stages (`.kes2`), bodies with a page part (`KSZ_LIVE_SKIP`: calendar, pickers, inventory, shop grid, relation tables, stat grid, tables, exam, card flip, slots, pets, gifts), ≥ `KIT_SIZE.v3.live.maxOpts` 7 options, ≥ `maxSecs` 4 headed sections. Tests: `dev/test/kit-size5.js <url> 755x1000,1180x820 [outdir]` (size, box in screen, cut text, empty px, figure gaps, scroll, "Đã hiểu"), `dev/test/kit-conform.js` template **T7** (k3body frame). Still to do (handover in dev/handover/reports/kit-size.md): items → `kszItem3` XL master in jk2b `kitItem`, the "Đã hiểu" literal audit, old-save + coop-e2e runs.
- **kit-size #8 (kit keeper, 16/11 ~22:00Z–)** — (a) item Xa xỉ box = ONE master in container units (`.kitem>.kitb{container-type:inline-size}`; `kitItem` writes `<span class=kxw>Xa xỉ</span><b>N</b>` for EVERY caller; sample §84.5). (b) place cards (`kitPlaceDress`, jplace) carry ONE place picture: `m.placeK` cards never get a second event picture from an inherited `evId` (jk2b guard; kit-conform place:tgk/ttp/night MIXED → CONFORMS; sample §8.2b). (c) an option whose title names a live person shows THAT person's kit portrait in `kitOptPic` (jopic), not a meaning-group picture, outside a person-event frame (kit-conform "generic picture on a person option"; sample §6.2c). (d) event pictures fill the frame (sample §84.3). (e) pager caption = "trang x/y" only. OPEN OWNER QUESTION: grade chip overlay on the item frame edge for every `kitItem` caller (kszItem3 has it; kitItem still prints the grade line below) — changes ~40 layouts, NOT built.
- **kit-size #9 (kit keeper, 16/11 ~23:20Z; owner chose "1", s26)** — **§54.1b GRADE CHIP ON THE FRAME**: the grade (Phẩm) of EVERY `kitItem` caller (~40 layouts: bag, wear row + pet box, gifts / gift shelf, shop, Tư trang detail, reveal cards, chests, event item tags, co-op inventory…) is `kitGradeChip(g,{size:"fr",name:o.gname})`, drawn INSIDE `.kitb` by `kitItem` (`kitItemGrade`), centred ON the bottom edge of the picture frame (half inside, half hanging below), exactly like the big item frame. The grade line under the picture (`.kitg`) is gone (rule, CSS and every `.kitg{display:none}` workaround removed). ONE change in `kitItem` + the kit CSS; callers pass nothing new; a picture that is NOT a graded item (recipe tiles, jwkr / jrcp) passes no `grade` (null / undefined) and gets no chip, a real item of grade 0 keeps "Thường" (owner via main s27 00:12Z) (`gname` = grade-word override: pets PET_TIER, works WTIER, kitItemInfo).
  - Size: font `max(9.2cqw,7px)`, padding `max(1.3cqw,1px) max(2.4cqw,2px)`, radius `max(2.2cqw,2px)` in container units of the frame (`.kitb` is the container), so it scales with slot 43-58 (7 px) / M 72 (7 px) / L 104 (9.6 px) / XL 150 (13.8 px); widest word "Tuyệt phẩm" is ≤ 85 % of a 58 px slot. `.kitb` is `overflow:visible` so the chip can hang below; named tiles get `margin-bottom:max(.06*--isz,5px)` for the hanging half (bag slots rely on the grid gap; the wear / pet column `.keqc>.kitem-slot` gets 6 px).
  - Corner plan (nothing covers anything, measured on 60 combos × 3 variants): chip = bottom edge centre · Xa xỉ box = top-right (§84 (5), untouched) · Ngự seal = top-left (the old bottom-left detour is gone) · "đã tẩm" tag = top-right, or left under the seal row when the Xa xỉ box is there · ×N = bottom-right lifted above the chip · "Đang mặc" band = lifted above the chip.
  - Duplicates removed: the second chip beside the name in the item detail (`kitItemDetail`, `kitItemCard`), under the name on the reveal card (`kitRevealHTML` now shows the kind as a small line `.krevs`), beside the tile in the Hoàng thượng ban row (`jne`), the pet tier hack in `petTile` / `petPicK`. The sample builders `kszItemTile` / `kszItem3` render the real `kitItem` (no sample-only chip, no transform copy).
  - Samples: kit page §54.1 (chip sizes + frames at slot / M / L / XL), §28.13 item sizes, `kitSizeSheet("items3")`. Tests: `dev/test/kit-size9-chip.js` (60 frames: chip on the edge, inside the frame, no overlap, no `.kitg`), `dev/test/kit-size9-live.js` (bag + card on the real game, Fold + iPad), `dev/test/kit-size9-sheet.js`.

## 83. KIT MARKS (owner 11/16 15:00Z kit review, review/kit-marks) — gold imperial rank · text-line colour · ink-brush ✓/✗ · seals · place icon · grade chip
- **83.1 Imperial gold (2.4)**: Hoàng thượng and Thái hậu rank + name = imperial gold everywhere, never black (`KIT_ROLE.emp/th` in j1 → `kitRankTone`; a person whose NAME is the title is painted as a title by `kitNameRank`, `.knr-only`). Glow only on paintings (§48.1h).
  - hoangthuong-gold (owner 21/11, OD:L1362): ONLY the Emperor's name «Hoàng thượng» as a card head (`.pcname.krt[data-imp=emp]` from `pcHead`; `kitNameRank` with rank = name) is painted as a TITLE in `--rt` (KIT_IMP, bright imperial yellow), never ink: the `.pcname` name rule must not win over the `.krt` rule (jk4 `kit-rt`). Thái hậu is NOT changed by this rule (her look stays: KIT 33.5 stage chips amber, her card name as before). Test dev/test/hoangthuong-gold-scan.js (Emperor must be KIT_IMP; Thái hậu card name must stay unchanged).
- **83.2 Text lines (2.6)**: inside a sentence / list row the rank AND the name are the SAME rank tone (`kitNameTone`, j79 → `--rtn` on `.kname`); her own name (.kmy) and "ngươi" keep ink. Only on PAINTINGS the stage rule applies (rank tone + glow, name ink + gold glow).
- **83.3 ✓ / ✗ (4.5)**: ONE bare ink-brush mark, no circle/box: `kitMark(ok)` → `.kmk.y|n` (SVG mask in the row's own colour; the glyph stays inside hidden so textContent is unchanged); `kitMarkPaint(root)` wraps every ✓ ✗ ✔ ✘ typed by older builders (same observer pass as kitRankPaint). `kitChecks` uses `.kchm` + kitMark. (The earlier in-game tick could not be found in the shallow history; this is a fresh brush stroke in the same spirit — owner to confirm.)
- **83.4 Number deltas in the person card (4.11)**: no square boxes around +3 / −3 (the boxes in the catalogue were the sample's demo `.btn` triggers; now bare `.lnk` text). The number beside the stat is enough.
- **83.5 KẾT QUẢ seal (5.2)**: amber-orange `#b8650a` (`.rtoast.sure .seal`), never grey.
- **83.6 Grade chips (5.3, 5.4)**: ONE part `kitGradeChip(grade,{size,name,extra})`: normal size under the item name on the reveal card / detail / lists; `size:"sm"` = the grade tag over an item picture or in a tight row. Not two parts. 5.4 `kitGloom` = the demotion scene (old chip cracks, frame turns grey), shown once in the rank-down screen — now labelled on its sample.
- **83.7 Place icon (5.6)**: `kitPlaceIcon` sits ABOVE the place name, centred: map chips, map tiles, the stage title (jact CSS `.ic.kplic{display:block}`).
- **83.8 Kit sample page**: a sample may carry `where:"…"` (shown under its heading: where it is used + size). Samples 2.2 (§36.4) and 3.6 (§73) no longer render empty when the page opens before a game. Still erroring without a game (outside this branch): §58, §58.1, §58.3, §28.13e, §76. Tests: `node dev/test/kit-sample-probe.js <url>`, `dev/test/kit-marks.js <url> <out.jpg> <WxH@dpr> <ids>`.
- **83.9 Danger button + kitConfirm** (kit request cloud-del / Foreman D): `.kbtn.kdanger` (charcoal with a cinnabar rim, same size as `.kbtn`, never lacquer red) for irreversible actions; `kitConfirm({title, lines:[…], yes, no, type?, onYes, onNo})` (j79) = centre pop-up on kitModal: the lines, optional type-to-confirm field (kitInput; the danger button stays disabled until it matches), the panel's own quiet button = no, `.kbtn.kdanger` = yes. Sample §83.9 on the kit page. Replaces the inline two-tap "Chắc chắn?" wherever the action deletes data.
- **83.10 Mood mark on picture corners (owner 15:10Z 7.2)**: `.ksart-mark` is bigger: `clamp(46px,24%,88px)` (thumb 52 %).

## 84. GREYED OPTION + STAND-IN MARKER (owner 16/11 ~21:10Z "why Chung Tú cung" + s24 scope change; review/opt-greyed) — `dev/build/jgrey.js` (last module) + `j3.js` (render) + `jpm.js`
- **84.1 Greyed option**: an option the player KNOWS but cannot take now because of COST (bạc, sức), RANK or an ITEM is NEVER hidden. It stays in the kit option list (the ACT CARD frame, §6) greyed, not tappable, with a red chip in the Cần row saying why and when it opens again ("thiếu 37 bạc (cần 40, có 3) · mở lại khi đủ bạc"). API: `kitOff(opt, why, when)` sets `opt.off`; builders `kitWhyBac(need)` `kitWhySuc(need)` `kitWhyRank(r)` `kitWhyItem(name,n)` and `kitWhenBac/Rank/Item()`; shortcut `kitOffBac(opt,fee)` (greys only when she is short). Numbers print live values / BAL, never typed (ONE CORE). j3 `showModal` renders `opt.off` as `disabled` + `data-kneed`, `chooseM` refuses it. Wired: Ma ma giáo tập (jtds) and teacher choice (jrcp). Kit sample §84.
- **84.1a Auto chip (review r1)**: j3 `showModal` gives EVERY modal option that is short of bạc (`fx.bac`) the same kit reason chip via `kitOffBac`, so no bạc-short option is greyed without a reason; hand-typed "(thiếu bạc…)" labels in option names are forbidden (removed from j54 h54show). Kim bạc test (jpoison) is greyed with `kitWhyItem`/`kitWhenItem`, not hidden.
- **84.1b need[] -> chip, ONE place (opt-greyed-2)**: an engine need `[{t,ok,w?}]` (same shape as the Cần row / `data-kneed`) is mapped by `kitOffNeed(opt, needs)` in jgrey.js: the first unmet need becomes the reason chip, `w` (or the kitWhen* default) the "opens again" line. `kitOffIf(opt, ok, why, when)` is the one-line form. The ch70 / evChoice engine (`c6` in j68) takes `{need:[...]}` in its settings and applies it itself. Evidence has its own builder `kitWhyEv(a,n)` ("thiếu chứng cứ về <tên> (cần n, có m)") + `kitWhenEv()`; also `kitWhenWit()` `kitWhenTy()`. Whole group now greyed instead of hidden: giải độc item (jface), trình chứng cứ / gọi cung nữ làm chứng / mời Thái y (jtruth; thresholds BAL.truth.witLoy / tyArts), tặng lại bằng món đồ (jtoilr), tố giác (j70, ×2; need = accNeed). Still hidden on purpose: story-locked ones (Hoàng hậu tố cáo rank rules, 84.3). Kit sample §84 'need[] chips'. Tests: dev/test/opt-greyed.js (PASS2).
- **84.2 TIME is not a grey reason** (s24): acts spill into the next buổi; never grey an option for lack of khắc.
- **84.3 Stay hidden**: options that are unknown or locked by story (e.g. Quyền Hoàng hậu powers before rank 7).
- **84.4 Stand-in marker 'tạm'**: ONE small chip `kitTam(isStandin)` (`.ktam`, TOP-right of a position:relative picture box (one position everywhere; no per-place override)) on any stand-in picture; shown only while the picture lookup says stand-in (`kpmArt()` returns `tam:true` when the festival/season×buổi state or the rank form falls back); disappears by itself when the exact picture exists. Wired: palace courtyard (kitPalaceMap); dialog option pictures (jopic `KIT_OPT_TAM` title → existing act picture, `kitOptPic` returns `tam:true`, `kpOptArt` adds the chip in `.kaart`; first entry: "Giữ chân Hoàng thượng" → act-thap-den-hau-ruou-h, night-final). Other picture lookups call `kitTam(art.tam)` the same way.
- Test: `node dev/test/opt-greyed.js <url> <shotdir>`.

## 85. DƯ ĐỒ STYLE C · "họa đồ chú thiêm" (owner 16/11 "kiểu C là đã ok rồi"; Foreman C art + KIT REQUEST map-frame-c; review/map-frame-kit) — `dev/build/jmapc.js` (last module) + `j38.js` mapFit
Replaces §34.1b (kitLeather frame on the Dư đồ), §34.1d chip look of `.mspot .mlab` / `.mmeta`, the floating `.maptools` overlay and the dark people-count chip `.msil`.
- **85.1 No frame, full screen**: the map fills the WHOLE page area edge to edge (map width = page width, map height = page height; no mask fade, no margins, no outline); the leather skin, rolls and stitches are hidden on the Dư đồ (`.kleather` stays as the container class).
- **85.2 Slip**: every place name (`.mlab`) and its info row (`.mmeta` "N bóng · K khắc" / reason) sits on the pale-yellow paper slip `img/kit/mapslip.webp` (9-slice, painted by Foreman C). 13 px display serif 600 (label), 12 px (row). Used by: Dư đồ labels (locked / walk / here / empty) and the palace detail `.kpm-spot` (jpm). Not slips: `.mtile b`, `#sc-t h2`.
- **85.3 Cartouche + tools row**: a small "Dư đồ" cartouche `img/kit/mapslip-cartouche.webp` (text from CSS) and the tools (−, +, Ra vào, Danh sách) float ON the map as an overlay row (top, between the left rail and the right column; no band, nothing shrinks the map). The palace detail keeps its own "‹ Dư đồ" button in the same row (no cartouche).
- **85.4 One info line**: the dark chip `.msil` is GONE everywhere (`silChip`, `k61SilChip`, `kpmSil` return ""); the text row is the only info line and is shown on every device (Fold included, it was hidden under `.kv1`).
- **85.5 Overlap test**: `mapFit` (j38) tests every place as ONE box (`.mlab` + `.mmeta` union), cap fit+3.5; floors: iPad 1.75, Fold ≈2.5 (zoom steps unchanged). Clipped labels at the pan edge fade out (14 px mask) except in the palace detail.
- **85.6 Full screen, overlays (owner 17/11 03:52Z, OD:L133/L1410/L1433)**: on every Dư đồ level the plan/painting is `position:absolute;inset:0` of `.mapv`; the tools row, the left rail `#krail` (left 6 px, top 6 px) and the right column `#kshR` (right 6 px, top 6 px) are overlays ON it, same kit columns as her room stage. Palace map: the plan is pannable/zoomable as before. Courtyard level (`.kpmv`): the painting COVERS the area (width = max(100cqw, 100cqh x 1.76), centred, pan sideways), the hall rows sit on it at the bottom. The last level (place painting) was already full screen. jplfs's old `margin-left:56px / margin-right:column` rule is neutralised in `jmapc.js` (last module). The shell canvas width (side bands) belongs to app-edge, not this part.
- Scan: `node dev/test/map-full.js <url> <shotdir|-> [WxH,..]` (map width / page width = 100 % and height 100 % on the palace map and the courtyard level, tools row overlay, columns inside the page, no horizontal scroll). Sizes 755x1000, 1180x820, 1366x1024, 412x1058, 390x844.
- **85.7 Fit-all, soft edges, flush pan, room weather (owner 17/11 ~12:12Z / 12:25Z / 12:35Z, review/map-me-mark)** — `jmapc.js` CSS + `j38.js` mapFit + `jfx.js` kfStageRect:
  (1) DEFAULT ZOOM (landscape; PORTRAIT kv1 = §85.8, zoom to the free height) = the WHOLE palace map inside the free area (screen minus left rail / right card column / tools row, read from the `.mapw` margins `--kmv-fl/fr/ft`); `window.__mapFit` = that zoom, +/− zoom from it (max fit+2.5). Place labels shrink (`--mls`, floor `KMAP_MLS` .85 = the readable minimum on EVERY device incl. Fold, j38) until no two touch; still touching → NEVER hide (owner 18/11 "Tên của những cung khác đâu", OD L1032): `kmSolve` (j38, pure geometry, deterministic, <150 ms) places every tag as ONE box (.mlab + .mmeta): variant 2 = name on one line (`.kmnw`), moves the lower-priority tags to the nearest clear spot, A tag that still covers the middle of its own building needs no leader; otherwise a thin gold leader line + dot (`.mlead`) joins the building (dot nearest the tag) to the REAL slip / info-row rect (never an empty corner of the union box). Hard rules: no tag box touches another, leader ≤ 90 px, leader dot ≥ 40 px from any other tag (≥ 16 only if no layout exists), no leader through another tag or crossing another leader; at the default view a tag is whole inside the visible box, or (building mostly cut by the edge) whole outside with NO dot/leader drawn. Her place and `!` places keep home. **MARKER GLOW (owner 18/11 ~21:50Z, one kit token in jmark.js)**: the light around her «ta ở đây» marker (map `.kmmapmk` and stage `.kmemark`) is a RIM glow on an UNDER-layer (`img.kmglw` = the same picture, black, blurred, exactly behind the real picture) in HER CURRENT RANK colour (`RCOL[S.rank]`, vivid); the real picture only gets a hairline dark rim; light never paints over the picture. Test: scan `markBad` + `*-marker.png` crops. **GREY STATE (owner 18/11 ~19:05Z/19:10Z/19:15Z, class `.mgrey`, one kit state)**: every place she cannot reach now (not enough khắc / rank too low / forbidden) and every empty palace (ONLY its name, no second line - owner 18/11 ~21:50Z) shows its WHOLE tag grey (name slip + info row), lock + short reason kept; courtyard (`.kpmv`) hall tags of such a palace grey too. GREY IS LOOK ONLY: every grey place with a door stays tappable with its dialog incl. «Lẻn vào» (out-of-khắc keeps walk spill); empty palaces and Ngoại triều stay non-buttons. Test: `node dev/test/map-labels-scan.js <url> <dir|-> <sizes> [ranks]` (union boxes, dots, leaders, grey==unreachable, dialog «Lẻn vào», courtyards). Result: 0 overlaps at every size. On PORTRAIT (Fold) the fit-all uses the FULL map width (the right part runs under the right column, faded edge; pan brings it flush). Fold / iPad / 1366 / phone all use the one rule.
  (2) SOFT EDGES on the painted map (`.mapimg` mask): LEFT/RIGHT wide `--kmv-fade-x` (clamp 44 px / 9 % / 120 px), TOP/BOTTOM thin `--kmv-fade-y` 12 px; labels stay on top. Overview and courtyard (`.kpmv`) level alike.
  (3) FLUSH PAN: the map content is padded by the overlay frames (margins `--kmv-fl` 56 px, `--kmv-fr` column + 8 px, `--kmv-ft` 46 px, courtyard `--kmv-fb` 54 px for the hall list), so dragging to the end lands the map edge flush against the frames, nothing hides under them, place labels never sit under an overlay at either end. (Exception, main s31 12:48Z: Fold PORTRAIT fit-all at rest — the part of the map running under the right column keeps its labels (A ca sở, Đông cung) under the cards until the map is panned; r1 measured.)
  (4) ROOM WEATHER on the map: `kfStageRect()` returns the `.mapsc` rect on the Dư đồ tab → the same "wx" layer (same kinds, caps, Gọn / reduced-motion gates, ONE Pixi canvas); no night stage decoration on the map.
  (5) HER PLACE: `kitMeMapMark()` (jmark.js, §41.2) = her owned rank marker with the same glow and squash-bounce loop above her place's label (`.kmmapmk`, 36 px × sc[r] × big, scales with the label); her place's info row = **"Ta + N bóng · còn K khắc"** (N = others there), alone **"Chỉ có ta · còn K khắc"** (K = khắc left this buổi, written "còn K khắc"); other places unchanged ("N bóng · travel khắc").
- **85.8 PORTRAIT DƯ ĐỒ (owner 17/11 ~13:12Z, review/map-portrait; `html.kv1` = every portrait size; iPad landscape `html.kv2` and the courtyard level `.kpmv` are NOT touched)** — `jmapc.js` CSS + `j38.js` mapFit, no new DOM (the same `#kshR` content of `k3Stage`):
  (1) CARD ROWS: `#kshR` on the overview map is ONE grid over the leather (pointer-events none, the cards take the clicks). Row 1 (under the tools row, right of the left rail) = the 4 people cards `.k3cs > .k3c` (Hoàng thượng / Thái hậu / Hoàng hậu / Cung nữ thân tín), 4 equal columns, same height; row 3 (bottom) = Ân sủng `.kas` (its rows in 2 columns) + Nguy hiểm chung `.k3py`, same height. Compact form: when `#kshR` is narrower than 620 px (container query, not a media query) the avatar `.md` is hidden and the type shrinks (.66 / .64 rem); wide (Fold) the cards keep the avatar. Nothing covers the map.
  (2) MAP between the rows: `mapFit` reads the REAL row heights (`--kmv-ft` = rows 1 bottom + 6, `--kmv-fb` = row 3 top gap + 6, `--kmv-fl/fr` = 0) and ZOOMS TO THE FREE HEIGHT (`fit = max(1, freeH × aspect / pageW)`, pan sideways, +/- from there). At open the view is centred on her place; when her place and every visible "!" place fit in the page width together it centres on that span. Label scale `KMAP_MLS_ONE = [1, 1.12]` (floor 1 = kit size, no shrink below it; colliding low-priority labels hide instead, `.sm` first). Fold 755x1000: zoom 1.38 (was .92), 20 of 29 labels at 13 px (was 15 of 29 at 11 px).
  (3) SKY: every area that is not map (the bands between the rows, the faded map edges) shows the day's weather sky: `data-sky` on `.mapv` (set after every render by `kmSkyKey()`: `KIT_SKY` weather kind → key; `night` added in the buổi tối) → one gradient per kind (`--s0/--s1/--s2` zenith / middle / horizon, `--cl` cloud colour, `--kmv-nt` night veil) painted on `.mapsc` by `KMSKYBG` (ONE value, also the kit page swatches `.kmsky`). The weather particles are unchanged and keep covering the whole page area. A PAINTED sky does not exist yet → ART REQUEST to Foreman C (reports/map-portrait.md); until then the CSS gradients are the sky.
- **78.y STAGE BADGE LINES (owner OD 19/11 ~02:05Z two lines per sex + OD 19/11 ~03:50Z FAIL of r5 "nó đang che trực tiếp ngay trên đầu"; canon overwrite of the standard-head line of r4; review/errand-scene r6)** — every head marker on a stage — the player's «ta ở đây» (`.kmemark`, §41), the speech bubble (`.khead` white / whole-bubble yellow, §78.z) and the mood seal at the head (`.kfseal`, §28.8d) — is anchored from the REAL HEAD TOP of the figures on screen: the first opaque row of each figure picture (hair, ornaments, crown, hat included; `kitHeadTop(fig)` = kitFigBody `t`, the alpha bbox of the art, measured once per picture and cached), never a fixed fraction of the figure box and never a "standard" head. TWO lines per stage, one per sex (`kitBadgeSex(fig)` = the `KIT_FIG.fac` rule: emperor / eunuch / official / physician / man / unknown-man = men): `kitMarkLine(st,sex)` (jmark.js) → `{top,bottom,head,h,H,Hs,floor,sc,sex,real,room}`, head = min(real head top of every VISIBLE figure of that sex: `#mefig` + `#tokens .tok.fig img.figimg`, not paged away; fallback floor − standard body of that sex when none shows), bottom = head − G, G = max(`KIT_BADGE.gapMin` 7 px, `KIT_BADGE.gap` .024 × H) + `KIT_BADGE.reach` .2 × seal size (the seal's lean-in + droop reach, so even mid-motion nothing touches a head); H = the stage's ONE woman body (j59 `data-kml-h` / `-m` / `-f`). (1) «ta ở đây» and the bubble stand ON the line of their figure's sex (`kitBadgeAt(st,fig,kind,w,h)` → top = bottom − h) on the figure's centre line (body core centre) — every woman's marks level, every man's marks level; a line lifted by a crown or tall hat lifts every mark of that sex (level), never sinks onto a head. (2) The mood seal stands on the SAME line, BESIDE the primary mark: centre = centre line ± (`KIT_BADGE.mw` .1 × H / 2 + `KIT_BADGE.sp` .012 × H + seal / 2) — mw = the widest primary mark, so seal and bubble / «ta ở đây» never overlap when both show; right first, mirrored when the right would leave the stage, touch `#kshR`/`#kshL` + 10 px or a neighbour's mark column. Sizes follow H only (`kitBadgeEmoSize(st)` = .105 × H, 22..50 px). (3) No mark ever covers hair, headdress, face or another mark. j59 caps the one H so the men's standard line and the bounce stay inside the frame (H × `KIT_FIG.man` + `kitMarkRoom(H)` ≤ stage − floor band); `room` < mark height → «ta ở đây» shrinks. Dialog / event figures keep the head rule of §41. Scans: `node dev/test/head-marker-gap.js <base> W H [json]` (every stage × figure × mark: gap to the REAL head top, opaque pixels of ANY figure under every mark, mark–mark overlaps, level per sex, inside the stage; `HH=1` = she is the crowned Hoàng hậu) and `node dev/test/bang-line-scan.js` (Δ to the sex line, level / column spread, chip–chip overlap). Real video of the marks + seal motion: `node dev/test/head-marker-video.js <base> W H out.mp4`.
- **78.z HEAD MARKER = SPEECH BUBBLE (owner OD 19/11 ~02:40Z + ~03:05Z, canon overwrite of the yellow round «!» disc above a person's head; review/errand-scene r5)** — ONE kit part `kitHeadMarkHtml(title,role,state,text)` (jact.js) → `<i class="khead">` holding the bubble picture ITSELF, no round disc behind it: `state` "on" (default) = `KIT_HEADMK.on` img/kit/ico-talk-y.webp, the WHOLE bubble bright yellow with black dots (a person who brought a notice — shown above that person only when she has one); "off" = `KIT_HEADMK.off` img/kit/ico-talk-w.webp, white bubble with black dots (plain state). Size `KIT_HEADMK.px` 24 px, thin dark rim + (on) the soft yellow glow, the same `khapNudge` motion as .khap (reduced motion = still). Placed only by the stage badge lines (§78.y `kitBadgeAt(st,fig,"hap",w,h)`: bottom on the figure's sex line, level with «ta ở đây»). The file is probed once at load; while it is missing / on load error the part falls back to the yellow «!» disc (`.khead.kfb` = the .khap look). The brown img/kit/ico-talk.webp is never used. Stays «!» (`.khap`): option cards (§6.2b), the top-bar notice box (§42.2 `#kntbox`), the Dư đồ place labels (§78). Users: jerr.js errSync (`.kmerr-bang`, §90). Kit samples §78.z + §78.z say. **"say" state (K-HEAD-SAY, owner OD:L1627 (5) manga speech bubbles + OD 19/11 ~03:50Z never over a head)** — the SAME part grown to hold a spoken line, no second bubble: `kitHeadMarkHtml(title,role,"say",text)` → `<i class="khead ksay"><span class="ksay-t">text</span><b class="ksay-tail"></b></i>` = plain WHITE bubble (CSS, no picture), black text in the kit font, small tail down to the speaker, same dark rim; max width `KIT_HEADMK.sayW` {s 150 / m 188 / l 230, bp [480,760] = stage width tiers phone / tablet portrait / iPad landscape} and font `KIT_HEADMK.sayFs` {12.5 / 13.5 / 15}. Placement is `kitSay(st,fig,text,{ms,title})` (jmark.js, §78.y; returns `{el,close()}` or null): the part owns its OWN stage layer `.ksay-lay` (appended to `#stage` by kitSay, z 41) so it works in co-op and servant-road lives where errSync / jerr's layer never exist. The bubble BOTTOM (= tail tip) stands ON the speaker's sex line (`kitMarkLine`) on the figure's centre line, never over any head / hair / crown, clamped inside the stage; two bubbles never overlap (the later one shifts sideways, the tail stays on its speaker via `--ksay-tx`), a bubble never covers another figure's head (shifted sideways, last resort lifted above that head, `data-raised=1`); too little room → ≤ 2 lines at W / 1.25 W / 1.5 W, then smaller font down to `KIT_HEADMK.sayMinF` .7 but never below `KIT_HEADMK.sayMinPx` 10.5 design px (the smallest kit text, .64rem = 10.24 — FAIL rule of the kit-head-say review), then ONE line, still none → no bubble (null), never sinks, never truncates. Re-placed on every measure / resize (`kitSayAll`, hooked in `kbRe`); `kitSayClear(st)` removes all. Pop in/out `ksayIn` / `ksayOut` (`KIT_HEADMK.sayIn` 200 / `sayOut` 150 ms, khapNudge family: little hop + wobble); reduced motion = still. Scan: `node dev/test/head-say.js <base> W H [json]` (S1 on the sex line, S2 0 opaque pixels of any figure under a bubble, S3 no overlap, S4 inside, S5 tail inside, S6 no truncation) — whole family (every stage × pair × short/long lines × device). Users: jchat.js (palace chatter: maid greeting, idle chatter, happening talk) must call `kitSay`, no own layer / CSS.
- **78.x "!" mark (owner 17/11 ~13:32Z)** — `jact.js` `.khap` (kitHapMark): BRIGHT FRESH YELLOW badge (`--khy` #ffd91a, radial highlight, dark ink "!", soft yellow glow), 15 px (13 px on `.sm`) — **owner 17/11 ~14:08Z "to hơn một xíu nữa": +25 % → 19 px everywhere (the old 13 px `.sm` rule never applied and is removed), glyph .82rem, corner offset -7 px**; every ~5.2 s one little shake + hop (`khapNudge`, transform only, 3 delay phases by `.mspot:nth-child`), `prefers-reduced-motion` = static glow; reads differently from her own rank marker (`.kmmapmk`, a crest above the label). `.mspot .mlab i.khap` beats the slip rule `.mspot .mlab i`.
- Test (85.8): `node dev/test/map-portrait.js <url> <shotdir|-> [WxH,…]` (kv1: 4 cards one row above, same size; 2 blocks one row below, same height; map full width, fits the free height; her place inside the view; 0 label overlaps; sky per weather incl. night; kv2: column unchanged, map margin 56).
- **85.9 MAP FRAME KEEPS ITS BOX WHILE THE PAINTING LOADS (review/dudo-blank, 17/11)** — `p1.html` `.mapw{aspect-ratio:1792/1000}` (palace detail `.kpmv .mapw` keeps its 1.76 box, jpm). Before: the frame's height came from the `<img>` alone, so on a slow/cold CDN (Fold, first open) the Dư đồ frame was 0 px high, every hotspot + label collapsed into a strip (map looked BLANK until the picture arrived, labels under the −/+ row). Now the hotspots sit in their right places on the paper ground at once and the picture fades in under them. `mapFit` (j38) uses the same ratio before load (1.792 / 1.76 detail); the detail map re-centres on the next two frames (jmapc), not only on image load. Every view that shows a painting + hotspots through `.mapw` (Dư đồ, courtyard detail) is covered; no other `.mapimg` user exists (scan in the report). Test: `node dev/test/dudo-blank.js <url> <shotdir|-> [WxH@dpr,…] [s]` (spots painted + art loaded within N s), `node dev/test/dudo-slow.js <url> <shotdir|-> WxH@dpr [delayMs|fail]` (picture delayed/failed: frame keeps its box, spots in view; `DETAIL=1` = courtyard detail), `node dev/test/dudo-title.js` (map title/cartouche never touches the −/+ / Ra vào / Danh sách row).
- Test: `node dev/test/map-frame-kit.js <url> <shotdir> [WxH,…]` (no .msil, slip present, 0 overlaps at default/+1/+2 zoom, tools above the map, palace detail). Kit sample §85.

- **85.10 SECOND LEVEL OF CÀN NINH / ĐỨC THỌ + HER PEOPLE (owner OD 18/11 ~19:25Z (4)(5), ~19:45Z; review/map-zones)** — `dev/build/jmapz.js` (last module). The Dư đồ zones of 19:25Z were CANCELLED at ~19:45Z ("thêm một tầng nữa mất công một lần bấm nó rối"): consort palaces keep their own tags; no zone layer, no fog.
  (1) Càn Ninh (slot "kn") and Đức Thọ ("p:tn") open the courtyard (§76 kitPalaceMap) with the 3 painted halls (plaques Mẫu Nghi điện / Khôn Hòa hiên / Thục Thận trai; Từ Khang điện / Di Xuân hiên / An Thọ trai) WHILE she may walk in now; locked / out of khắc → the one-hall tap (place card with «Lẻn vào», walk-spill). Each hall: "N bóng người" (people she meets = map count, unchanged) + "K cung nhân" = that household's servants the ONE ledger (S.roster, j95) puts in the palace now, by the activity the record gives them (`MAPZ_ACTHALL`: serve/attend/receive… → chính điện; clean/brew/work → Đông phối điện; rest/sleep/eat/own deeds `ag_*` → Tây phối điện); the chính điện row adds "Cung nhân: X trong cung · Y đi vắng". Counts only. Đức Thọ uses the Càn Ninh courtyard as a `tạm` stand-in (kitTam) until its own painting exists (ART REQUEST).
  (2) HER PALACE (Ngọc Thanh các / her granted palace / her side hall): the servants' row (or her own hall row when housed) names HER people where the ledger puts them now: "Trong cung: … · Đi vắng: <tên> (ở <nơi>)".

## 86. kitLearn · HỌC THÀNH TÀI level-up scene (review/scenes-3, owner OD:L712) — `dev/build/jlevel.js`
`kitLearn({kind:"art"|"vir", k, from, to})` — the scene for HER tài nghệ (Cầm, Kỳ, Thi, Họa, Vũ, Y…) or Công Dung Ngôn Hạnh reaching a new bậc (hook = addArt / addVir, every road; NPCs: no scene). Built on kmStage as a FULL-BLEED scene (81b `.km-full`) on THE full-screen picture (81c kitFullPic, `.kfull.klearn-fig`) — owner 21/11 mark #52 ("Vẽ … một cái nền tranh ứng với từng cái môn học đó … trên iPad là phải ngang nguyên một cái màn hình, full nguyên cái màn hình"): header «Học thành tài» + «<tên> lên bậc N» on top, the §65.2 card at the bottom (kitSteps «Bậc n/5», kit rows of what she gained = the skill card's own effect lines ARTFX / VIRFX + the recipes the level opens (Tứ đức, RCP_ST), ONE button «Tiếp theo» (KM_END `km-learn`)), both ON the picture. Picture = ONE painting PER SUBJECT: `img/learn-<art|vir>-<k>-port.webp` (phone, kv1) / `-land.webp` (iPad, kv2), live once listed in `img/INFO.json` (ART REQUEST to Foreman C: 6 tài nghệ + 4 Công Dung Ngôn Hạnh × 2); until then the skill's own painting (kitSkillArt, as on the skill card) in 81c "blur" mode. `kitLearn({t})` (a new lối without a subject level, jky) = the same scene with its line, no bậc (before: an empty overlay with no button). `kitLearnHTML(o)` = its HTML. Sparks = kitFxBurst glowburst + spark. Reduced motion / Gọn: final frame. Sample page: §86. Test: `node dev/test/fullscreen-scenes.js`.

## 33.40 Right column width, tab-bar info slot, no stat badge (owner 17/11 06:45Z, 06:50Z, 07:55Z, 08:00Z)
- Right status column (#kshR): ONE width KIT_RCOLW = 140 px (k3RW in jk3.js; only a stage < 528 px shrinks it to >= 132). All cards share the width; `.k3cs` is a grid with equal rows, so Hoàng thượng / Thái hậu / Hoàng hậu / cung nữ cards have ONE height; Ân sủng and Nguy hiểm chung are taller by content.
- Tab bar trailing info slot: `kitSubTabs(key,list,info)` puts `info` (e.g. kitInfo("Cách học")) at the RIGHT END of the bar (`.pctinfo`, sticky). No info band under tabs. Users: Tài nghệ (Cách học / Tác phẩm), Mệnh truyện (Luật chương; Tâm nguyện on its tab), Việc nhờ. Info that belongs to one section goes in `kitSecHead(left,right)` (`.ksech`): Tứ đức title + Đức chip + ⓘ luật Đức. A real status chip (Danh sư) keeps a one-line `.ktop`.
- Top-bar stat cells never wear a "!" badge (kitStatSet drops .kstw; `warn` option removed). The Đức goal (lập Hoàng hậu) is in the cell tooltip and the tap popup (k3DucNeed).


## 87. Option rows (kit-option-rows, s34)
- Option grid cells (jksize kszBtnGrid3 / kszBtnGridLive3): a card's TEXT column keeps >= KIT_SIZE.v3.btn.txtMin (200 px) beside its picture (kszNeedTxt), so two or three picture cards on a ~600 px area stack in ONE column and use the width; 2 columns only when each cell fits (e.g. 858 px). Never per modal.
- "Says nothing" lines (j63 KA_NOTHING, one regex for kaRows + the empty Mất/Được filter): "không được mất gì", "không được không mất", "không mất không được", "không được gì", "không mất gì" are never shown. A real loss must be written as a loss, not as this line.
- dilLine (j17): a sure option x that already starts with a label (thành:/tốn:/hỏng:/ngay:/kèm:) is not wrapped in a second "thành: " (was the literal "thành:" under ĐƯỢC).
- (r2, reviewer FAIL f7e2e1ef) Figure-left event frame (jksize kszLiveLay3): when the option column is narrower than a card needs (kszNeedTxt + KIT_SIZE.v3.btn.stackBelow 80 px; Fold 304 px beside the figure) the options get `.kszstk`: every row stacks LABEL OVER VALUE so values use the whole text column (190 px, was 137 and 2-3 words per line). Not moved under the figure: with the frame's own max height the second card then falls outside (tried, worse).
- Scan (r2): node dev/measure/option-modal-scan.js <fold|ipadAir|ipadPro|pixel|iphone14> [turns] [json] [seed] — seeded Math.random (default 7) + a direct Hội phối đồ builder on every run; NARROW = text col < 170 or value col < 150; flags NARROW / CLIP / EMPTY / LIT / NOTHING.
- Scan: node dev/measure/option-modal-scan.js <fold|ipadAir|ipadPro|pixel|iphone14> [turns] [json] flags NARROW / CLIP / EMPTY / LIT / NOTHING.

## 88. THÀNH / BẠI blocks on every act / option card (kit-thanh-bai, s34; owner 17/11 ~17:10Z)
Owner: "khi mà một cái nút nào đó nó sẽ có một cái chữ gọi là thành, là tôi được cái gì, mất cái gì. Còn nếu mà tôi bại thì được cái gì và mất cái gì."
- Layout (j63 kaRows / kaBody, ONE place for every act card, person card act, dialog option and button): [title + odds] · Cần · Tốn (price paid EITHER way: khắc, Bạc/Sức spent regardless — shown ONCE above both blocks) · THÀNH block (head "THÀNH", rows Được / Mất / Kèm) · BẠI block (head "BẠI", rows Được / Mất / Kèm) · Ghi chú.
- Kèm (other people's feelings, side risks) sits INSIDE the block it belongs to: the block label written before it in the source ("thành: … · kèm: …" -> THÀNH, "hỏng: … · kèm: …" -> BẠI); with no label a bad thing goes to BẠI. A cost written under "thành:" of a roll act (e.g. Bạc paid only when the bribe lands, OD 17:00Z) is THÀNH Mất, not Tốn.
- A SURE act (no roll and nothing under hỏng:) shows ONE block, THÀNH. Any act that gets a roll shows both (OD 17:00Z: almost no act stays sure; the layout is the same for every act the moment it gets a roll). A sure act that still carries a "hỏng:" part is shown with both blocks.
- BẠI with nothing to show prints one dim line "Tốn công, không được gì" (MAIN s34 17/11 ~17:35Z: odds cap 95 % + soft fail, nearly every act gets this; the owner asked what happens on failure, so the answer is shown; inside a block the old "says nothing" lines of §87 stay hidden). A disabled card hides its BẠI block (as it always hid Mất / Kèm).
- Source strings are unchanged: "hỏng:" stays the INPUT label (alias "bại:" accepted by kaModel / kaModelStr / j19 kitParse); the player only ever sees THÀNH / BẠI. "được ngay:" gains stay above both blocks (row "Được ngay").
- Every shown "HỎNG/Hỏng" is now "BẠI/Bại": result seal (kitResultSeal, j19/j25 seals), log "Bại.", quest tag, tutorial, option sample label, kit sample page, VANPHONG.
- Row classes unchanged (.kr-duoc/.kr-mat/.kr-kem) plus .kb-t / .kb-b / .kb-a; heads .kbh .kbh-t/.kbh-b; empty BẠI row .kr-none. Scan: node dev/measure/thanh-bai-scan.js [json] (deck cards in 5 game states + every labelled source string).
- (r2, reviewer r1 FAIL 922c7253) Empty THÀNH prints its OWN dim line "Không được gì thêm" (empty BẠI keeps "Tốn công, không được gì"). A no-roll card whose only part is a certain loss (hỏng: only, no thành:) is ONE block (THÀNH, row Mất): "Cáo bệnh, không dự" = THÀNH · Mất Danh -1. A no-roll card with both parts still shows both blocks.
- (r2) SCROLL CUE (jksize kitScrollCues, ONE place): every modal frame column that scrolls (.k3right, #mb, .body … overflow auto, > 6 px hidden, >= 100 px tall) gets a last-child `.kscue` (sticky bottom): a bottom fade + chip "Kéo xuống" while scrollTop+clientHeight < scrollHeight-6; it goes at the end. Called after every showModal (120 / 700 ms), on scroll, on resize, and a MutationObserver keeps the cue the last child. option-modal-scan flags CUT-NOCUE (an option card cut by a scroll column that shows no cue).
- (r4, owner 17/11 ~20:50Z, s36: the THÀNH/BẠI layout made option cards almost twice as tall — COMPACT) (1) NO head rows: the old `.kbh` THÀNH / BẠI heading lines are gone. On a ROLLED card (R.one false) the gain/loss row of each block is itself labelled **THÀNH** (green, replaces ĐƯỢC) and **BẠI** (red, replaces MẤT); the Được+Mất items of one block share that ONE row (item colours stay green/red); **KÈM** keeps its own row right after the block it belongs to. Order: Cần · Tốn · Được ngay · THÀNH · Kèm · BẠI · Kèm · Ghi chú. A SURE card keeps ĐƯỢC / MẤT / KÈM, no heads, no THÀNH/BẠI words. Empty THÀNH row = "Không được gì thêm", empty BẠI row = "Tốn công, không được gì" (cost-mode cards, kitHideOut, still show neither: the outcome is hidden on purpose). Row classes: `.kr-thanh .kb-t`, `.kr-bai .kb-b` (+ `.kr-none` for the empty line); `.kr-duoc/.kr-mat/.kr-kem` stay on sure cards; `kaNorm1` re-reads a thanh/bai row back into duoc/mat by item colour. Consumers updated: j93 (stat deltas), jk3 k3IsLong, jk2b kitHintOf (reads Được|Thành, Mất|Bại). A disabled card hides BẠI and the red items of THÀNH. (2) LABEL LEFT, VALUE RIGHT at EVERY size: the r2 stacked layout (`.kszstk`, label over value on Fold / narrow option columns) is REMOVED; instead the label column is narrow (`fit-content(4.3rem)` in jk4 option cards, 3.4rem j63 base; "Được ngay" may wrap to two lines). (3) "Kéo xuống" chip (jksize `.kscue`): smaller, sits in the SOLID lower part of the bottom fade (fade 36 px, opaque from 42 %), so it never covers readable text. Scan: option-modal-scan EMPTYHEAD now flags any leftover `.kbh` head OR a row whose value is stacked under its label; thanh-bai-scan counts `.kr-thanh/.kr-bai`. Measured: Hành sự card text block (.kb) height Fold 618 px wide: "Nghỉ ngơi một lát" 80 -> 58, "Điểm trang" 157 -> 136, "Thỉnh an Thái hậu" 200 -> 157 (card 264 -> 242); iPad Air 564 px: 80 -> 58, 157 -> 136, 219 -> 176 (card 283 -> 242). Event option card (Hội phối-style, Fold 304 px): 138 -> 111.

## 87. kitRankList · kitRankRow · kitRankHead · kitRankFoot · THE ranked list (KIT REQUEST A + B of review/rank-port-r2; kit keeper, review/kit-ico-rank) — `dev/build/jkrank.js` (before jrank)
ONE list for every ranking ("place · face · name · numbers · score": the Bảng vàng "Kiếp" and "Người chơi" boards, any later top-N). Never a private row.
- `kitRankRow({rank, face, name | nameH, you, sub, cols:[a,b], line, score, unit, mine, cls})` — place number (top 3 gold numeral) · kit face (`mdH(…,"sm")`) · name + the kit "Ta" chip (`kitChip(you,"n")`, only on `mine`) with a small second line `sub` · two value columns · score (number + small unit). `mine` = own-row highlight (cream-gold, seal-red bar at the left).
- `kitRankHead({rank, name, cols:[a,b], unit})` — the header row (aria-hidden; hidden on the one-page layout). `kitRankList({head, rows:[row html]})` — the frame (cream card, gold hairline, rows split by the kit hair).
- `kitRankFoot({label, row, note, btns})` — the own-life strip under a list: small label line ("Ta trên bảng · hạng N trên M"), ONE `kitRankRow` (mine), a small queue note, then a button row (kit `.kbtn`, wraps; shares the width on kv1).
- Layout reads `html.kv1` (one page: the two columns fold into the second line `line`, header hidden) / `html.kv2` (spread: all columns). No `@media` (§0). Classes `krl-*` and the root `krlist` belong to this part only (root was `.krl` = the act-card row LABEL class of §6/j63 → its border boxed every Cần/Tốn/Được label; renamed, batch-s32a).
- Users: jrank (Bảng vàng, both tabs + the own-life footer). Podium entries (`kpodCol`, §26.1) take optional `fig` / `face` / `nameH` / `you` so a board can feed it without a person object. Sample: kit page §87. Test: `node dev/test/rank-e2e.js` (list rows + own row + footer).

## §KWAIT — one table for every loading / waiting line (review/loading-words, 11/17)
`dev/site/kwait.js` = `window.CTM_WAIT`: boot cover, Thỉnh tranh, Sổ mây, co-op wait/reconnect, new-build lines, Luân hồi wait, ghi sổ failure. Code reads `CTM_WAIT.key`, never types such a line. Literary cổ trang, no %, no tech words (tải, kết nối, mạng, server, build, MB, tệp, bộ nhớ đệm, trình duyệt); the long road to the server is "đường xa". Scan: `python3 dev/test/wait-words-scan.py` (must print 0 BAD outside story prose).
- (r3, reviewer r2 FAIL 8a1e5b3f) Event options in COST MODE (PEND dialogs, kitHideOut, KIT 28.6: Tốn + Gợi ý only, the outcome is hidden on purpose) lost their Được/Mất rows but kept the THÀNH / BẠI heads: empty headings with the hint hanging under BẠI ("Có người đến" / "Thu làm tai mắt", sure "Bỏ bạc nhờ vẽ cho đẹp"). kitHideOut now removes the heads with the rows (a placeholder such as "Không được gì thêm" would tell the player the outcome while the kit hides it). Scan: option-modal-scan flags EMPTYHEAD (a head with no row under it), waits 900 ms per new modal + calls kitScrollCues before measuring, and drives the cost-mode builders directly (pushDil mkP giu / night1 / night2 / doc / phan / trom).

## 89. kitDisplayRoom · ĐA BẢO CÁC — the full-screen display room + tư trang drawer (owner OD 17/11 ~18:30Z (A), ~18:25Z (c)(d), ~18:33Z (3); kit-display-room) — `dev/build/jdisp.js` (last module) — KIT READY (view/drawer/rail; data = review/display-shelf API)
ONE view for every display shelf: her own room and (read-only) an NPC's room. Like Dư đồ (§85): the room fills the whole area between the top bar (`header.hud`) and the bottom bar (`nav.bar`), both stay visible.
- **89.1 Entry**: left-rail icon "Đa Bảo Các" (`kitStageRail` id `disp`, order 40, §77; placeholder `img/kit/ico-room.webp` until the ART REQUEST icon lands). It is shown only when the real data API exists (`shelfOf/shelfPut/shelfTake` + `BAL.shelf.groups`, review/display-shelf): no one-way door. `kitDisplayRoomOpen(p,{fixture,known,ro})` opens it (`p ≠ S` = read-only, title "Đa Bảo Các của <tên>"); `kitDisplayRoomClose()`; `kitDisplayRoomHTML(model)` = the pure markup (kit page sample §89). Without the real API it opens only with `{fixture:true}` (kit page, tests; fixture = real Tư trang pieces, 2 per group).
- **89.2 Layout = ONE PAINTED CURIO CABINET (đa bảo các; owner OD 17/11 ~21:55Z "cái hình nền này nó có sẵn mấy cái kệ trên nó luôn")**: `KDR_PIC` = the painted picture(s) with the shelves already in them (Foreman C): `land` (`html.kv2`, iPad) = ONE picture 2 columns × 6 rows, fitted to the area (no scroll); `port` (Fold / phone) = a tall 1 × 12 picture (or stacked segments), full width, the room scrolls (`.kdr-sc`). Each compartment = a slot in fractions of ITS picture `{cx, fy, w, h}` (centre x, shelf floor line, interior); the piece stands on (cx,fy), the group label chip sits at the slot's top-left. Slot arrays = `reports/display-bg.md` (measured), pasted into `KDR_PIC.*.slots`; until then an even-grid STUB; picture missing on the CDN = stub look (plain plank `.kdr-plank`, shown only while `.kdr-bgi` is absent). No CSS shelf bars when the picture is there. Header: cartouche + "Đã bày N/12 món" + kit ✕ (also Esc).
- **89.2b UP TO 5 PIECES PER GROUP (owner OD ~22:05Z; API review/display-shelf-r3: BAL.shelf.per, slots "<g>", "<g>~1..4", shelfSlots/shelfIn/shelfPut(p,ix)/shelfTake(p,slot))**: each compartment has `per` spots (slot.spots = measured picture x of each spot from display-bg.md; stub = evenly spaced), a piece keeps the spot of its slot; the drawer lists all placed pieces ("Đang bày n/5", each tap → item card "Cất xuống") and the owned pieces of the group; a full group replaces its weakest piece (shelfPut). Header counts pieces.
- **89.2c EMPTY SLOT = GREY SILHOUETTE + COMPLETE-SET GLOW (owner OD ~21:20Z)**: every empty spot of a compartment (all `per` of them) shows `.kdr-sil`: a representative cut-out of that group made IN CODE from the group's existing painted pieces (`silKeys(g)`: BAL.shelf.it keys of the group, varied over the spots; CSS `brightness(0) opacity(.2)` grey fill + hairline outline; no new art, no hand-drawn SVG, not tappable); a placed piece covers it. Every piece of a COMPLETE set (shelfView items[i].set {id,name,full}, `full:true`) wears `.kdr-glow` = the shared kit glow token `--k-glow` + a slow pulse (none under reduced motion / Gọn: `.kdr-calm`); loose pieces and partial sets stand plain. Fixture: first 3 placed pieces = a full set, one partial. Test checks silhouettes + pieces = 12 × per spots, glow only on full-set pieces, no animation when calm.
- **89.3 One shelf** (`.kdr-sh`): group label = kit chip (`.kchip n`, top-left) · the piece as a CUT-OUT picture standing on the painted shelf at the slot point (NO item frame; `kitItemSrc` painting + drop shadow) · a red kit chip "Vượt phẩm" / "Héo" at top-right when it applies (her room only) · empty shelf = soft dashed "Còn trống" placeholder. 
- **89.4 Drawer** (`.kdr-drw`, a bottom sheet inside the room; the second owner view "Tư trang": ONLY the owned pieces of the tapped group): handle + title (group) + kit ✕; "Đang bày" row (the placed piece, tap → kit item card with "Cất xuống"); the owned pieces as the Tư trang slot grid (`.kinv .kinvg` + `kitItem` "slot": grade frame, Xa xỉ = the standard kit lux box (no private number text), corner mark "Vượt phẩm" when above her rank, "Ngự tứ" for an imperial gift). Imperial gifts may be placed even above rank (owner (d)); the warning is information, not a block. Rises with `kdrUp` (calm / Gọn / reduced motion: none; `--pace`).
- **89.5 Flow**: tap shelf → drawer → tap a piece → `kitItemCard` (§70) with the ONE act "Trưng bày" (greyed with the reason when `shelfWhyNot`) → placed, card and drawer close, `kitLine("Đã bày …")`. Tap a placed piece → "Cất xuống" (back to the chest). Read-only: no drawer, a tap on a piece = the item card without acts.
- **89.6 SET LINES + SET GLOW (KIT REQUEST (6); owner OD 17/11 ~20:47Z "she must see what to collect; random pieces show nothing" + ~21:20Z "a whole set glows")**: ONE part `kitSetLines(lines)` (jdisp.js, `window.kitSetLines`) = the fact strip `.kdr-sets`: one row per set `[state dot + the line exactly as jshelf wrote it]`. Data `shelfView(S).sets = [{id, on, k, t}]` (her own room only; `k` = `on` counting now: gold dot that pulses like its pieces + bold line · `wait` whole, counts next week: faded gold dot · `miss` pieces still missing: grey dot · `bad` broken: red dot, red text). Loose pieces form no line. Used by the display room (a flex footer under the cabinet, `flex:0 0 auto`, max 26 % of the room / 5.6 rem then scrolls; NOT a position on the cabinet picture, so it works with the stand-in pieces and the painted cabinet alike; hidden in an NPC's room and with no lines) AND by the interim `shelfOpen` dialog (same function, whole list, `#modal .kdr-sets` unclamped). The glow on the pieces is §89.2c (`.kdr-glow`, shared `--k-glow`; the pulse stops under reduced motion / Gọn, `.kdr-calm`). Words come from jshelf (`SHELF_SET_N/STAT`, VANPHONG); no number or word is typed in the part. Test: display-room.js (strip present, row count, glow dots, her room only). Sample: §89 (4 fixture lines: on / wait / miss / bad).
- Data API (review/display-shelf jshelf.js): `shelfOf(p).g[group]` · `shelfPut(S,ix)` · `shelfTake(S,group)` · `shelfWhyNot(S,e)` · `shelfGrp(k)` · `luxPiece(k)` · `BAL.shelf.groups`. Group count/labels come from `BAL.shelf.groups` (fixture: 12 placeholder groups). Old saves: nothing stored here.
- Scan: `node dev/test/display-room.js <url> <outdir|-> [device,…]` (HOST mode; fold, ipadAir, ipadPro, foldLand (supported screens only; narrow phone portrait shows the rotate prompt, OD:L339): room between the bars, 12 shelves, 2 cols on kv2 / 1 col else, no item frame, drawer inside the room with only that group's pieces, item card → Trưng bày → placed + drawer closed, Cất xuống, ✕, read-only no drawer, no page errors). Kit sample §89.

## 79. kitReveal · FACE REVEAL motion — the real picture appears IN PLACE out of the grey (owner OD 18/11 ~06:20Z "FACE REVEAL ANIMATION", review/face-reveal-anim) — `dev/build/jreveal.js` (last module) — KIT READY
- **79.1 What**: the moment she first SEES a person's face, every place that draws that person's picture plays ONE reveal: the grey stranger silhouette stays on top of the real picture and a soft hole opens from the face outward (ink-wash clears), `BAL.faceReveal.ms` (= 1000 x BAL.pace, ease-out). Never an instant swap, never a scene change, never blocks a tap (`pointer-events:none`).
- **79.2 Which places (ONE part)**: tall frame (`pcPort` / `pframe`, kind `pc`), small avatar (`mdH`, kind `md`), room-stage figure (`#tokens .tok.fig`, kind `fig`), event-stage figure (`kitStageFig`, kind `kes`; also the week book). The four outer wrappers only MARK the element (`data-krv` = person key `kOf61`, `data-krvs` 1 face / 0 grey, `data-krvk` kind, `data-krvsil` the grey picture); nothing else is edited. A new place that draws a person must come from those kit functions, never its own `<img>`.
- **79.3 When**: (1) `k61Know` / `k61Meet` (every way of learning a face: greet, arrival, scouting, servants' reports, event dialogs) flip a stranger's face; (2) a place that was drawn grey is drawn with the face. ONE reveal per kind per flip, in whichever place draws the new face first; places that open within `BAL.faceReveal.win` (8 s) still play, later ones show the face as is. Loading a save, known people, her own household: nothing plays.
- **79.4 Gọn / reduced motion / "Cảnh động" off / bots**: the grey fades out in `BAL.faceReveal.lite` (350 ms), no mask. Co-op: local only (a render of local state; nothing is sent, nothing waits).
- **79.5 Safety**: the grey ghost waits (paused) until the real picture has loaded, keeps the box of the real picture every frame (a stage figure is sized when it loads; before that, the box the grey stood in), is removed on `animationend` or a timer, and its animation is `!important` (some frames set `animation:none`).
- **79.6 Test**: `node dev/test/face-reveal.js <url>` (frame + avatars + event figure: grey before, one veil each after, removed, second look plays nothing, Gọn = `krvlite`, a known person plays nothing); `node dev/test/face-reveal-stage.js <url> W H scale [dir]` (real dialog + real stage greeting); recording + contact sheets: `face-reveal-rec.js` + `face-reveal-burst.py`.

## 90. kitErrandScene · SAI NGƯỜI ĐI (errand scene r2, NON-BLOCKING; owner OD 18/11 ~20:05Z, ~20:10Z canon overwrite, ~20:15Z/~20:20Z; review/errand-scene) — `dev/build/jerr.js` (last module) — motion only, no new frame/chip
The scene is a PICTURE of ONE state "person P is away until khắc K" (task {who,nm,k,lbl,t0,due,back,read,rep}), read through ONE adapter (`errTasks / errAwayOf / errNews / errNow / errWhen`): with the parallel-time core (`window.PTIME`, jptime `S.away`, BAL.ptime) it reads ITS state; without it the same shape lives in `S.erra` (created at the gates, landed at the due khắc on spend / nextBuoi, kit status icon «tin» registered here). Nothing blocks play: no hold, no deferred result, no shield.
- tap: time moves at once; the person walks OFF the stage to the left (clone of her figure on `#stage > .kmfly.kmerr.kmerr-lay`, her real token `visibility:hidden`); while away her slot shows the kit chip `kchip n` «đang đi dò la…» (`errWord(k)`, table ERRV, VANPHONG); the kit status icon «tin» (§77.1) is busy.
- at khắc K: she walks back ON in the background; the kit head marker (`.khead` yellow speech bubble, §78.z; fallback the .khap «!») stands ON the badge line of her sex (§78.y, `kitBadgeAt(st,fig,"hap")`: a clear gap above the highest real head top of that sex) on her centre line, the mood seal beside it, never overlapping; tap = the kit status panel with the report (never a forced modal). Not on the page in view: the icon's red dot is the «!». The news also goes through the ONE notice entry point `kitNotice({id:"errand:<id>",line,text,go,goLabel})` (stage-here r4, jnotice.js, in the build before jerr) — single call site `errNotify` in jerr.js.
- RUNNER ALWAYS DRAWN (kit rule `kitErrandSpot(st)`): a person with no token in view (crowded stage «+N», other swipe page) walks with her own painted figure `kitFigOf(p)` from / to the kit spot (left .14 of the stage, kit floor line `kitSlotFloor`, height `KIT_FIG.h`). One place to change.
- Numbers: `BAL.errand {n:2, msWalk:650}` (fallback) / `BAL.ptime.kinds[k].n`. Reduced motion / Gọn: chips only. Bots / co-op / servant road: nothing. Old saves: `S.erra` lazy.
- Gates (fallback; the adapter reads jptime's tasks when present): `runAct` (46 acts; `ERR.self` = she goes herself) + `scout`, `invite`, `h54Act thu`, `tdAct gift`, `htAct ask` (jht exposes `window.htAct`).
- ONE «tin» PANEL (owner ruling ROOT-57): jerr.js OWNS the kitStatusIcon id `tin` (registered last, its render wrapper is outermost). Its badge / rows / buttons cover (a) her sends (S.away rows by "me" or S.erra) and (b) the RECEIVER side: with parallel-time present, `PTIME.orders()` (+ `ordWhen`, `answer(id)`) rows with «Nghe lệnh» / «Xem lời nhờ» calling `PTIME.answer`. jptime's own `ptIcon` set("tin") must lose: it should drop it or guard it with `if(!kitStatusIcon.has('tin'))` (`kitStatusIcon.has(id)` added in jstatus.js). Panel spec = kit info (`subject`, `facts`, `sections`, `opts`); the key `h` is NOT read.
- Test: `dev/test/errand-scene.js` (fixed seed; Fold 755x1000 + iPad 1180x820; 38 checks) and `dev/test/errand-scan.js`.

**56.8 CROWN ROOM = THE TALLEST HOÀNG HẬU CROWN, MEASURED ON THE WHOLE CATALOG (owner 18/11 ~18:40Z "scale figures down to leave headroom"; name tag covered the Hoàng hậu's phoenix crown).** `BAL.bookFrame.cRef` was .072 (measured on the `fig-thaihau-*` files only); a scan of all 8570 `fig-*.webp` (head-top table, crown above the skull top / body) gives the true tallest crown **.131** (`fig-consort-c09-t8-a26`, `fig-maid-m45/m50-t8-a18`). Every user of the room (`kszCrown`, `kszFeetFit`, `kpIdLay`, `jpdlg`, `jk4` column, book `jsl`) reads that one value. Figure class bodies `KIT_SIZE.fig` (S/M/L/XL, M3/L3/XL3, NL3/NM3 and the narrow ladder NL/NM `f`,`max`) are redone = old h × 1.072/1.131, so a column (body + crown room) keeps its old height and the body shrinks: S 142 · M 218 · L 294 · XL 398 · M3 284 · L3 351 · XL3 455 · NL3 246 · NM3 171. Test: `dev/test/figure-head-fade-scan.js` (FAIL when the name tag overlaps the painted figure; prints crown top below frame top). **iPad identity card** (`kpIdLay`, spread): the left figure is the SAME body as the Luân hồi book figure, `BAL.bookFigBody.kv2` (534).

**56.9 FOLD IDENTITY CARD, FIGURE BIG AGAIN (owner 18/11 ~20:25Z).** In the figure-left + long-panel layout (`kpside`, KIT 56.7) the figure is about the full height of the frame: body = (screen height − 2 × KIT_DP_GAP) / (1 + `BAL.bookFrame.cRef`) (rule 32.2b, crown headroom kept); the figure column = body × `KPID_WR` and the panel (`--kpw`, set by `kpIdLay`) takes the rest, at least `KIT_SIZE.v3.narrow.minRight` (274), at most 560; a body that would leave less is lowered. Fold 755x1000: figure ≈ 800 px tall beside a ≈ 340 px panel; never over the panel, never clipped. iPad spread unchanged (book body 534). Only the identity card uses this layout.

**56.10 IDENTITY CARD PANEL USES THE FREE HEIGHT (LAW 10, MAIN 18/11 ~20:55Z).** Spread (iPad): the card panel is the whole screen height (`--kph` calc(100% − 24px)), not 70 %, so the scene picture and all stat tiles fit with no «Kéo xuống». Narrow side panel (Fold, `kpside`): the stat tiles are LONG ROWS (one per row, label left / value right), never wrapped in a 4-column grid. Test: `figure-head-fade-scan.js` idcard (cues on 0 on both devices).

**56.11 IDENTITY CARD SKELETON = THE SỔ TUẦN LỤC PAGE (owner 18/11 ~21:25Z).** Same figure size as the book on both devices (`BAL.bookFigBody`: Fold 641 / iPad 534, one source with `BAL.bookFigW`), the info frame runs the full screen height on both, and takes the width the figure leaves: Fold figure column = body × `KPID_WR` (≈ 314) → frame ≈ 410 px (was 340); iPad frame 440. Stat tiles: ONE size (Fold: one long row per tile; iPad: 2 equal columns), no wrap, no scroll. The figure stands whole beside the frame, never under it.

**56.12 STANDARD FIGURE FRAME = THE CROWNED HOÀNG HẬU (owner 18/11 ~21:35Z).** Every figure class is measured on the crowned Hoàng hậu (`BAL.bookFrame.cRef` .131 = the tallest phoenix crown of all 8570 figures): the crown top stands just under the name tag, the feet on the column floor, nothing cut, tag never over the crown. Classes now (body skull → feet, same everywhere): **M3 284 · L3 351 · XL3 393** (XL3 was 455 and was always shrunk to 393 by `kszFeetFit` in the real XL frame on both devices — now the class IS the real value, no shrink) · narrow phone classes NL3/NM3 = f × modal height, at most 246 / 171 (phones only, not on Fold/iPad) · person dialogs (coach / tips / shop, `kitPersonDlgFit`) fill their column: body = (column − gaps)/(1 + cRef) (≈ 346 on Fold, 345 on iPad). The old ladder S/M/L/XL (142/218/294/398) is the kit sample sheet only. Test: `dev/test/figure-head-fade-scan.js` (name over figure, crown headroom, cut, FAIL when one class has two bodies).

**56.13 MINIMUM EDGE MARGIN (reviewer, ROOT-55).** The painted figure (robe, hem, sleeve) keeps at least `KIT_SIZE.edge` = 12 px from the left edge of its frame (and from the screen edge in the identity card), in every class and on both devices: `kszLimL` (M3/L3/XL3), `kitPersonDlgFit` (coach / tips), `jk4` person column (shop), `kpIdLay` (card column starts at the margin; side layout never spreads left). `kitFullFigX` accepts a negative limit (figure pushed right). Test: figure-head-fade-scan.js prints the left margin and FAILs below 12 px.

**56.14 NO FIGURE OR PROP IN THE TEXT (reviewer ROOT-56 FAIL: rose tip in the Fold coach text).** `BAL.figWideRef` = .65 = painted width / body that a person column must hold (99.9th percentile of all 8570 `fig-*.webp`: p50 .347, p90 .446, p99 .596, max .838 = three outlier files). Person dialogs (`kitPersonDlgFit`, coach / tips): the figure column grows to `figWideRef × body + edge + 8` (`--kpdcw`, as far as the text column keeps `KIT_SIZE.v3.narrow.minRight`), and `kitFullFigX(…, rmax)` moves a figure left when its right edge would pass the column. Identity card side layout: column = `figWideRef × body` (was KPID_WR .5). Scan (figure-head-fade-scan.js, 10 figures × Fold + iPad): figure over text = 0 px in person dialogs, identity card and shop; FAIL otherwise. News / choice frames (M3/L3/XL3): a wide robe still spreads UNDER the text (owner 56.4, drawn on top; up to 39 / 60 / 29 px for the widest robe) — printed, not a FAIL, waiting for the owner: holding .65 there means columns 205 / 248 / 276 px and a text column of 229 px in M (below the kit minimum 274).

**56.15 PERSON DIALOG = THE SAME FIGURE STANDARD (owner OD 21:20Z (1), via ROOT-57).** `kitPersonDlgFit` (coach / tips, every `.kpdlg`): the crowned Hoàng hậu fills the left column from just under the name tag to the frame's bottom edge at the standard body (`KIT_SIZE.fig.L3.h` + crown room); the buttons sit in the bottom-right corner of the RIGHT column only (`--kpbh` kept free under the text), so no empty band is left under her feet; when the text is short the frame height follows the figure standard (`--kph` set on the dialog = header + max(figure column, text), never above the default pop-up height). Fold + iPad measured: frame 487 px (was 557–559), tag → crown 8 px, feet 24 px above the frame bottom; figure over text stays 0.

**56.16 FEET GAP IN THE PERSON DIALOG.** In `kitPersonDlgFit` the feet stand at most `KIT_SIZE.edge` (12 px) above the figure column's bottom line (was 5 % of the column height = 20–24 px on Fold / iPad), so the figure column ends at the frame's bottom edge like the option frames.
**56.17 FIGURE FILLS THE FRAME (owner 19/11 ~04:15Z "tại sao ông hoàng thượng á, đứng trên cao vậy mà không có giãn cái tỷ lệ ra cho đúng mấy cái khung?"; OD 18/11 ~21:20Z (1)).** Live centre frames (`.ksz3`): after the size is picked (`kszLivePick3` sets `dlg.__kszFill`; never inside the picker), when the frame body is taller than the class figure column (XL: the info / option column is taller and scrolls inside), `kszFigFill3` grows the ONE body of the frame so the figure column (name tag + worn-title plate room + the tallest Hoàng hậu crown room `cRef` + skull → feet) reaches the body floor: target = the room the frame cap leaves for an L / XL frame (owner 21/11 ~03:54Z, #47: every L / XL frame of a device gets the SAME figure size and position, whatever the info or options say); an S / M frame keeps min(room, the info column's own height). Same factor for every person of the frame (read from the frame, never from the figure), true proportions (height and width together), feet on the column floor, head centred on the column (56.5), a wide robe spreads under the text (56.4). The class bodies M3/L3/XL3 (56.12) stay the minimum. Fold night1 XL: body 393 → 588 px (figure 418 → 644 px, fill .57 → .88 of the frame body); iPad 393 → 409. Scan: `node dev/test/fig-col-fill-scan.js <index.html> [out.json] [shotdir]` (body, figure, fill, top gap, bottom gap per frame kind, Fold + iPad; FAIL when the feet stand > 8 % of the body above its floor or fill < .70; identity card printed only, 56.11).
**56.18 ONE SCROLL RULE FOR EVERY OPTION FRAME, ON EVERY DEVICE (ev-pic-followups, MAIN ROOT-65 19/11; extends 56.6 + the Fold rule "the portrait + info stand still, only the option list scrolls").** In every L / XL centre option frame (`.ksz3.kszlive`, all event families, choices, timed choices) `#mb` is a flex column that CLIPS (never scrolls), `.k3body` is `flex:1 1 auto; min-height:0` and `.k3right` clips: the figure column and the info (picture, text, chips) stand still and the option list `.opts` is the ONE scroll owner. Until 19/11 the three CSS rules (`#mb` flex column + clip, `.k3body` flex 1, frame height) were `html.kv1` only (Fold); on iPad (spread) `#mb` scrolled the WHOLE body, the last option card was clipped and no «Kéo xuống» showed. Now the rules are not tied to `html.kv1`: Fold 755x1000, iPad 1180x820 and 1366x1024 behave the same. The hint is the standard `kitScrollCues` strip («Kéo xuống ▾», short scroller = own strip below the list), on while the list has more, off at its end; scrolled to the end the last option card is fully visible. Scan: `node dev/test/opt-frame-scroll-scan.js <index.html> [out.json]` (every PEND event family + Q option kinds at the three sizes; columns: frame, device, scroll owner `#mb|opts|none`, last card fully visible y/n, hint y/n; exit 1 on `#mb` scrolling, a clipped last card, or a scrolling list without a hint). Because `.opts` is the scroll owner, the 56.6 picture ladder measures `.opts` overflow too (`kszOver3`), so a frame whose options fit with a smaller picture never gets the big picture + a scrolling list (law 10). Regression check per device in its own process: run the scan on LIVE and on the branch (`SZ=[[1180,820]]`), then `node dev/test/opt-frame-scroll-diff.js live.json branch.json` (column `stay` = scrollTop read back after settle; exit 1 on any frame that passes / fits on LIVE and fails / scrolls on the branch).
**56.19 THE OPTION LIST NEVER RE-LAYS ITSELF OUT FOR NOTHING; A RE-LAYOUT KEEPS THE SCROLL (opt-scroll-reset, C-AG #22 for MAIN ROOT-65 19/11).** Root cause of the 56.18 residual (pgin, rcpacc, empnight, ksp, … scroll snapped back to the top): (1) `kitOptFinal` (jopic) compared its idempotence signature over the whole `small.kb`, INCLUDING its own copied chips (`.kdup`, `.kfill`, «!»); the rank-name painter (jaudit `kitRankNamePaint`) titles a bare name inside a copied chip one frame later, so the next `kaNorm` pass rebuilt every copy, the painter titled them again, … (~1900 DOM edits / 600 ms, every frame). Now `kitOptSig(b,kb)` signs the SOURCE rows only. (2) `kitOptTier` ran again on every `kaNorm` pass (any node added anywhere: a toast, a timer) and its trial layouts (2 columns S first) shrank the list for a moment, so the browser clamped the list's `scrollTop`. Now it keeps the pick when nothing changed (`kitOptTierSig`: list width, picked tier, each card's class, text length and height) and a real re-pick restores the scroll of the list and its scrolling ancestors. (3) `kszLivePick3` (a late picture load / resize re-picks the frame size, smaller frames first) also restores the scroll of every scroller in the frame (`.opts`, `.k3right`, `.k3body`, `#mb`), and an option card's picture (fixed `.kaart` box) no longer triggers a re-pick when it loads: scrolling revealed lazy card pictures whose load re-picked the frame in the middle of the wheel — the «first wheel lost» case. Scan: `opt-frame-scroll-scan.js` also fails a frame whose FIRST wheel does not scroll (column w1) and, with `HOLD=3000`, a list that leaves its end within 3 s (column hold).

## 31.2b kitGroupFold · stage right column groups (owner 18/11 ~20:55Z, review/stage-rightcol) — `dev/build/jk3.js` (kitGroupFold, k3crew, k3chitonG) + `jplst.js` + `j59.js` (--kgrb) — KIT READY
ONE generic group accordion `kitGroupFold(key,label,n,itemsHTML)` (replaces the requested `kitCrewPlaque`). Closed = one kit row «Label · N ›» (no faces, same look as «Ân sủng ›»); tap = the group's existing person cards drop down IN PLACE («Label · N ‹» folds). ONE group open at a time, key in `window.__kgfOpen`, kept for the session. Kit sample page: §31.2b.
Stage column order (#kshR, stage host only; the Dư đồ map grid keeps the old chips): «Cung nhân · N» (her personal maid + S.staff maids/eunuchs, chip = face + name + Lòng, tap = Cung nhân tab) · «Chí tôn · 3» (Hoàng thượng, Thái hậu, Hoàng hậu cards) · Ân sủng · Nguy hiểm chung.
Place name = plain TEXT on the picture (`#kpname`, no plaque/frame, 2 lines: hall / palace, shadow token `--kts` shared with the figure name tags); the column is shifted down by `--kpnh`.
The "+N people" chip corner stays free: j59chips sets `--kgrb` (chip height + 10) and the column's max-height subtracts it (overlap 0 px). Test: `node dev/test/stage-rightcol.js <outdir>` (Fold + iPad × 1/6 servants × closed/Cung nhân/Chí tôn × 2 places).

PHONE DƯ ĐỒ GROUP BUTTONS (owner 18/11 ~21:40Z, review/stage-rightcol; OD "no full-width bars"): on the portrait (kv1) Dư đồ the groups are NOT bars. «Cung nhân» / «Chí tôn» = two kit RAIL buttons (kitStageRail label+count variant: `{id:"kgf-cn",label,count:()=>n,active:()=>bool,onTap,when,order}` = the same 44 px square button, bold number over a tiny label, gold ring while open), right under the book / scroll icons. Tap = the group's people list drops down in the empty left strip of the map (`#kgfdrop`, kit .k3p card of .k3c person cards, one open at a time, same `window.__kgfOpen`, tap the button again to close), under the rail, above the Ân sủng row, never over the rail. iPad (kv2) map and the stage keep the right-column kitGroupFold (§31.2b above). Scan: `node dev/test/stage-rightcol.js <out>` (Fold 755x1000, phone 412x1058, iPad; `ONLY=map` for the map pass): rail buttons = 2, no bars, list inside the map, list∩rail = 0, no place tag fully under the rail buttons.

RIGHT-COLUMN PLACEMENT (owner 18/11 ~21:52Z, via ROOT-56): on the iPad (kv2) Dư đồ AND on every stage (any size) the right column starts with the SAME two small buttons (kitGroupBtns: «Cung nhân» / «Chí tôn», number over label, side by side, the rail button look) instead of header bars; tap = that group's person-card list drops down in the column right under the buttons (kitGroupFold = the open card only, header «Label · N ‹» folds it, one open at a time, `window.__kgfOpen`). One kit part, two placements: left rail (phone Dư đồ) and top of the right column (everything else). The wide «Label · N ›» bars no longer exist.

### 13.x NO TEXT IN MINI-GAME PLAY (owner OD 20/11 ~05:10Z; review/mg-noword-kit)
One kit change, every kind and caller follows: (1) `.kg82 .kghow` («Cách chơi» sentence) never shows above the board — the sentence stays on the rules screen (.kgr) and in «Hướng dẫn»; (2) the clock chip in a game (`kitGameClock`) = the kit clock ring + the number only, never «Còn … giây»; (3) `kg82Signs` (j82, MutationObserver pass): inside the play area a button shows a SIGN (? hint, ✓ done, ↶ ↷ tilt, ♨ fan, ● other; word only in title/aria-label), `small` lines hidden, a kit row (.krl + sentence) hidden unless it holds a number (then only the number stays). Never the rules block, the guided bar, or the result. Test dev/test/mg-noword-kit.js (every KG82 kind, whole frame, DOM + canvas). Painted icons to replace the glyph signs: see KIT_REQUESTS.

### 13.11 kit-rows-b (kit keeper, 20/11; KP12 · KP15 · KP17 · KP19 · KP20 · KP21 · K-PM-1)
- **KP12 `kaSent`** (j63): the writer's explicit class `g`/`r` on a value wins over the word-meaning colouring (`kcls`); an unclassed `<b>item name</b>` never colours a row («Son phần giáng» under THÀNH stays green).
- **KP15 `kitReward` shelf** (j93): at most 8 icons + one `+N` chip (`.kmsh-more`) while a box with more than 9 items is being opened; the full list below always holds every item, so 22 items never cover the list / «Nhận».
- **KP17 `kitEvArt`** (jk4): an act picker / shop (`m.act`, `m.shop`, `m.pid` in `KIT_ACT_PIDS`) is never tagged with a guessed `evId`.
- **KP19 `kitStepList(list)`** (jtabs): ONE step list with three states `[["done"|"now"|"next", text, note?]…]` → ✓ / ▸ / · (kitChecks has two; `kitSteps` is the level-pips part, unrelated). Used by Việc nhờ «Các bước» (j72).
- **KP20 chapter cover**: the chapter detail panel (`kitGoalDetail`, jgoal) puts the chapter cover (`chapModel().cover`) in the `headArt` band instead of the origin picture.
- **KP21 act-card parser** (j63): (1) a coloured item that starts with a label («kèm: <span class="g">…») has the label stripped and is routed by it (push); (2) a labelled value «a, Chủ tin với X +3» is split at top-level `;` / `, ` (not in a clause about «nàng») and each piece routed alone (pure gain in Kèm → Được; long lists = one short line per value).
- **K-PM-1 `kitGameVs`** (jgamevs): panes no longer stretch to the tallest cell (`align-items:start`, was an empty lower half on Fold 755x1000); new `vs.setMood(side,text)` = a mood line IN the pane flow (`.kgvs-mood`), never a bubble over a board / ladder row.
- **KP13** (checked, no kit change needed): a pay-only-on-success act already reaches the kit as `thành: Bạc -N … · hỏng: không mất bạc` (game side j2 `payWinBac`/`payWinFail`, j17/j19/j25/j70); `kaRows` puts «Bạc -N» in the Mất row under THÀNH and «không mất bạc» under BẠI, Tốn stays empty — guarded by `dev/test/kit-rows-b.js`.
### 13.12 Signs only on the running board (review/kit-signs-preplay, 20/11)
`kg82Signs` (j82) turns a button into a sign ONLY on the running play board. A game that builds its OWN non-play screens (makeup «Trước gương đồng»: dress, pre-play «Trang điểm / Điểm trang nhanh / Để mặt mộc», colour pick, result) sets `KG82.setup=1` there (jtoil: toilDressUI, the pre-play screen, toilColUI, toilFinish) and `KG82.setup=0` when the board starts (toilMakeup); `kg82Open` / `kg82Play` clear it, and `kg82Open` also resets the stale `KG82.phase` and `KG82.ready` of the previous game. The pass returns while `KG82.setup` is set. Before: dress / pre-play / colour screens showed only «●» on the red start button and the third button. Guard: `dev/test/mg-signs-preplay.js` (all 31 kinds' rules / pre-play screens: no sign; makeup screens keep words, its drawing step keeps ✓).

### 13.13 Narrow option column: the text gets the width (review/kit-opt-text, KP14; MAIN decision 20/11 «law 10: frame → layout by text → button size»)
`jk3` option layout marks a single-column option group narrower than 340 px with `.k3tight` (Fold 755: the options sit in a 304 px column beside the figure). In it a picture card (`button.ka.kart`) shrinks its `.kaart` picture to 62x84 (inline important, removed again when the group relays out) and the gap to 7 px: the text column grows 188 → 213 px. Never the text that shrinks. Guard: `dev/test/kit-opt-text.js`.

### 13.14 Home-stat rows + «quý nhau» in the option card rows and the word mode (review/kit-cost-rows-home; KIT page sample §28.6h)
Family: the four home-road stats (Gia thanh kgt, Áp lực hôn sự kap, Hồi môn khm, Lời đồn kld) and «quý nhau». (1) `NAMES.kld = "Lời đồn"` (jkc, with kgt/kap/khm): `fmt` prints it like Sủng/Bạc. (2) Rows (`kaRows` j63): `KA_STAT` + `KIT_COSTRE` know «Hồi môn» (a dowry spent is a Tốn, kept in the word mode too); `kaSent` reads Áp lực hôn sự / Lời đồn as «less is better» on the plain-text path (the html path already carries the `kGood`/`KLOW` class). (3) Word mode (`kitHintPhrase` / `kitHintSign` / `KIT_HINT_MAG`, jk2b): one phrase triple per stat («gia môn thêm danh giá», «hôn sự bị thúc ép hơn», «thêm của hồi môn», «người ngoài xì xào thêm») and «quý nhau» («hai bên quý nhau hơn / bớt quý nhau»); no stat is ever an «unknown stat line» that vanishes, so a card that holds one never reads «không được mất gì» and a decline row never shows a hidden liking loss. Guard `dev/test/kit-cost-rows-home.js` (15 checks incl. all real home cards of every origin): before 11/15 FAIL (stat dropped / hint «không được mất gì» / pressure read as gain), after PASS.

### 60.1 kitColDot / kitColDots — read-only colour dot + family name (review/kit-e-rows; E30 dresscode, PARKING #11; KIT page sample §60.1)
`kitColDot(fam,{role:"main"|"sec", size:"sm"|"md"})` (jtoil, next to the §60 picker `kitSwatches`): a round dot (12 px sm / 16 px md, 1 px `--line` ring, soft sheen like the §60 swatches) in the family colour + the family name after it (`.75rem`, ink); `role` adds a small «chính» / «phụ»; not tappable (no button / link, `title` = the name). The colour is DATA, never the kit's own: `fam` = a key of the ONE table `BAL.dc.fam` (jbal2: `{hex,n}`; review/dresscode) or a ready object `{hex|col, n|name}`; an unknown key shows its key as the name with a neutral dot. `kitColDots([[fam,role],…])` = a row of them with `.ksep ·` between. Use it inside `kitRows` values (item rows «Màu»), the festival calendar popover and the festival gate panel; `dcDots()` of review/dresscode already calls `kitColDot` when it exists. Guard `dev/test/kit-e-rows.js`.

### 13.15 «thế lực nhà ±n» in the word mode (review/kit-e-rows; E25b «KR thế lực nhà», E28 «Cha bị hặc tội»)
`kitHintPhrase` (jk2b) has a phrase triple for HER OWN house's clan power only — E28's wording «thế lực nhà ±n» (jtd `tdPowAdd`): «thế lực nhà ngươi thêm vững» / «… sút giảm» (+ `KIT_HINT_MAG` entry). ANOTHER house (j55 wording: the name comes before «thế lực» — «nhà Hộ bộ thế lực +6», «nhà nàng thế lực -6», «nhà Lễ bộ thế lực +3») never reads as hers (law 6a): it gets one neutral phrase «thế các nhà quyền thần đổi thay» whatever the sign. So a home option that raises or lowers her house's power is no longer an «unknown stat line» that vanishes from the hint; rows already keep the phrase (kaRows). rv FAIL fix 20/11. Same file / family as §13.14. Guard `dev/test/kit-e-rows.js`.

### 60.2 kitDressPicker — the ONE dressing view (review/kit-dress-picker; owner OD 20/11 ~21:45Z; KIT page sample §60.2)
Owner (verbatim): «màn chọn trang phục … có cái khung pop up ra, nhưng không có nhân vật bên khung trái, nên sau này tôi thay trang phục không thấy được bộ mình mặc, thêm cho tôi nhân vật thay đồ bên trái, nhưng làm sao cho đẹp á. Chứ không phải như mấy khung sự kiện».
`kitDressPicker({p, rank, head, body})` (jtoil): HER full-body figure on the LEFT as a LIVE preview, the choices (`body` = wear column + bag + item detail; `head` = optional line) on the right. The preview is her figure at the tier of the dress she wears now (`kitDressFigSrc(p,rank)` — j88 picks by `figTierOf`, the same trick as `toilPorAt` / `toilFigAt`), and every pick re-renders the picker, so it changes as she dresses. Look: a warm mirror-like stand (soft radial paper, floor shadow, name plate under it), NOT the event frame. Sizes: ≥ 521 px two columns (stand 34 %, min 150 px); a wide game frame (iPad) already has its own left figure column `.kgfig` — that column IS the preview there (`kitGameFigRefresh(p,{src})`, no second figure); a frame narrower than 480 px (a phone) gets no stand — decided by the measured frame width, media-check forbids viewport breakpoints in CSS and JS (law 12: Fold 755 + iPad first). Scan of the game (law 11): the only dress picker is `toilDressUI` (makeup «Trước gương đồng» step 1; the Hội phối đồ theme dress step and the co-op redraw call the same function); Tư trang shows her on the stage beside the bag. Guard `dev/test/kit-dress-picker.js` (Fold / iPad / phone: exactly one figure, left of the choices, nothing cut off, follows the dress rank).

### 13.17 kg82 screens stack without overlap — one sticky bar at most (review/kit-kg82-stack; owner Fold shot of «Thử tay: Tài nghệ các môn»)
Cause: `.kg82 .kg82act` was `position:sticky;bottom:0` for EVERY block (jcui), so a screen with several of them (a «Thử tiếp» button, a heading, the 31-button list of kinds, the «Chép mã» button) pinned them all to the same bottom edge and the grid was drawn OVER the «Đã thử» row, the button and the «Hoặc chọn một môn» heading above it. Rule now: every `.kg82act` stacks in the normal flow and takes its own height; only the LAST `.kg82act` of a screen is the sticky bottom bar, and only on a screen that has no grid block (a `.kg82act` with 4+ buttons) — a screen with a grid scrolls as ONE column and nothing is pinned over it. Guard + scan `dev/test/kit-kg82-stack.js` (the pick screen, a result-like screen, a multi-block screen, the rules screen of every kind; Fold 755x1000 + iPad 1180x820): before = iPad pick screen 4 overlaps and 3 pinned blocks on both devices, after 0 / 0.
### 13.16 The «Tốn» row accepts a price the fx does not pay itself (review/kit-ton-row; FOREMAN_D econ-tamco «KIT-BLOCKED», KIT_REQUESTS L85 + L80; KIT page sample §28.6i)
Option field `ton:{tamco:-n}` / `ton:{bac:-pr}` (j17 `dilTon`, used by `dilLine`): a PRICE the act pays elsewhere (Tâm cơ spent on a road, the scheme price on «Làm như thường»). It is inserted as «tốn: …» right after the odds word unless the line already has a «tốn:» part; display only — nothing is charged here. In a hidden-outcome card (`kitHideOut`, jk2b) the Tốn row used to keep only khắc / Sức / Bạc / Hồi môn: it now also keeps every price the option ITSELF names (its `ton` field or a «tốn: …» part of its line) whatever the stat (Tâm cơ / Đức / Danh / Sủng …), because a price is known up front; a plain `fx` consequence («ngay:») of a hidden-outcome card stays hidden (outcome rule). **Economic stats only (kit-ton-row-2, MAIN CHÍNH 83 decision, per the hint rule «words only, no stat numbers» for relations):** the keep-rule covers khắc / Sức / Bạc / Hồi môn / Tâm cơ / Đức / Danh / Sủng; a relation / liking price («thiện cảm -3», «quý ngươi -3», Ân tình …) stays words only in a hidden-outcome card («mất lòng bề trên»), never a number. «quý nhau» (L80) is already in the word map since §13.14 (kit-cost-rows-home): the decline row's liking loss reads «hai bên bớt quý nhau». Scan `dev/test/kit-ton-row.js` (7 stats × fx / «tốn:» / ton × open / hidden, Fold + iPad): before 4/12 FAIL (ton field never shown; hidden «tốn:» prices of Tâm cơ / Đức / Danh / Sủng dropped), after 12/12. econ-tamco wiring (D, 2 lines): `PEND.roadpick` puts `ton:{tamco:-tc}` / `ton:{bac:-price}` instead of the «tốn:» text in x.

### 49.2d GIAO TÌNH › ÂN OÁN PICKER = ONE ROW OF TWO PERSON SLOTS (owner 21/11, 3rd time "bớt chiếm không gian"; review/rel-picker-r3) — `hcRelHTML` / `relCands` / `relSlot` / `relPopOpen` (jhc)
Replaces the two chip+strip blocks of §49.2c. ONE row «[face Ta ▾] ⇄ [face Hoàng thượng ▾]» (kit face `mdH` xs + `kitNameRank` small, `.pface.krslot`); ⇄ swaps X and Y. A slot opens a kit dialog (`kitModal`, kind notice, content class `kpick` so the live frame keeps it a plain list) with the group tabs (`kitSubTabs`: Ta · Chí tôn · Phi tần) over the Hậu cung pager strip (`pager`, ‹ › only when the faces overflow). The relation card starts right under the row. Picker height 154 → 55 px (Fold + iPad). Men / servants are not relation persons (`relPerson` knows Ta, Hoàng thượng, Thái hậu, consorts only), so their tabs do not exist. Gate: `node dev/test/relpick-scan.js <url> <outdir> <tag>`.

**49.2d addendum (owner 21/11 ~02:14Z + ~02:16Z):** the relation card = heading + the kit relation table (`kitRel2`, both directions) + residence line + action + «Đã biết về», NO portraits (the two faces are the picker slots); height = content (Fold card bottom 739 → 470 px, iPad 711 → 410). Residence wording = ONE function `houseLine(p, me)` (j27): «Chủ vị <cung>, nơi ta ở» (p heads the palace she lives in) · «Ở <cung> của ta» (she heads it, p lives under her) · «Cùng <cung> với ta» (two non-head housemates only). Generators switched to it: j15 (Phi tần act note), j6 (person card note), j78 (busy reason), jhc (Ân oán card).

## 21b. BIG CARD of the Mệnh truyện sub-tabs — `kitSkillCard({big:true, body})` / `kitEmpty(title,line,true)` (review/chapter-card, owner marks #26/#27, 21/11 ~02:58Z-03:02Z)
- Owner (verbatim, #26): "mình lấy cái hình to giống như là ở cái hình của cái nút ở mấy bên ở phía bên hành sự á ... Sau đó là cái tên chương ... mình để cái tên chương ở trên ... những cái thông tin như là mục tiêu ... ghi ở ngay ở dưới nó". #27: "ở dưới thông tin là theo cột rất là đẹp đó. Tôi thích nhìn như vậy ... mình chơi luôn một cái hình to ... Làm tương tự ... cho các cái tab nhỏ khác đã qua triều cục rồi tâm nguyện".
- Form: picture LEFT at the big Hành sự act-card size (`--kbw` 170 px wide, 3:4, same on every sub-tab), title / steps / `body` (kit rows or chips) in the column RIGHT of it. Rows below the card stay the kit two-column rows (`kitReqRows`, `rows67`, `kitChecks`); `Đi làm` button under them. `body` takes ready kit HTML only.
- Used by: Chương này (milestone, arc, v1), Sắc phong, Đã qua, Triều cục, Tâm nguyện, Phụ tuyến, and the empty states of those tabs + Việc nhờ (`kitEmpty(..,1)`). No `big` = the small thumb card as before (arts, pets, moods…). Kit sample §21 shows it.

## 21c. CHAPTER SLIDE — `kitSlide(key, slides, {cur, tocTitle, tocMore})` (dev/build/jkslide.js; review/chapter-card, owner marks #28/#29, 21/11 ~03:05Z/~03:07Z) — DRAFT, kit keeper to OK
- Owner (verbatim #28): "Làm thành cái kiểu cái slide á. Tức là một cái hình to, dài ... ghi cái tên ... chương 1 ... tên của cái chương ... từng cái hồi ... đè lên trên cái hình đó luôn cũng được ... nút mũi tên ... vuốt qua một cái là nó sẽ qua chương 2 ... những cái thông tin ở dưới cũng sẽ đi qua theo". #29: "Làm tương tự ... bất kỳ một cái chỗ nào mà có liên quan tới chương ... không cần phải để chương 1, chương 2 ... một cái nút ở một cái góc nhỏ ... mục lục chương".
- slides = `[{kicker:"Chương 1", title, sub:"Hồi x/y", img, body:<kit html>, tap:"fnName"?, toc:[state "done|now|next", text, note?]}]`. One wide picture (kitSceneArt wide, 21:9) with kicker / title / sub written ON it, arrows (`.kslar`) + horizontal swipe change slide, the `body` (kit rows, checks) under it follows the slide, `Mục lục` corner button (bottom-right of the picture) opens a kit modal listing every chapter as kitChecks (done / now / next). No chapter list is printed on the screen.
- Used by: Mệnh truyện › Chương này (past chapters + current), Đã qua (every closed chapter + rare endings), Triều cục (the 6 chapters). Kit sample §21c.
## 21d. INFO / CHAPTER DIALOG PICTURE FILLS ITS COLUMN (owner mark #43, 21/11 ~03:45Z) — DRAFT
- `.kpb.kpinfo > .kpsubj.kpiart.kpev` (the picture of an info / chapter dialog, `kitGoalDetail` and every info panel with an event picture): on the spread (html.kv2) the column is 40 % (170–260 px) and the picture is 1.5 x the big act-card height with its image covering it (no empty band under a small picture); on the portrait one page (html.kv1) the column is stacked: a 16:9 picture band over the rows (the dialog is only ~250 px wide there; the 170 px tile used to squeeze the text to 64 px). CSS in jkslide.js `#kit-infopic`.

### 6.2f KIT DIALOG REGRESSION TEST (owner 21/11 ~04:00Z, angry repeat; review/kit-dialog) — `dev/test/dialog-fixed.js`, hook `dev/tools/quickcheck.d/80-dialog-fixed.sh`
Fold 755x1000 + iPad 1180x820, the Hồi kết nhánh dialogs + Đại kết cục + a fail result + the quiet end: (a) odds on the title row; (b) iPad 2 columns / phone 1 column; (c) the option picture fills its card; (d) scroll every scroller — figure, event picture and info never move; (e) exactly one Trân nữ seal, top-right of the header, 34 px; (f) the left figure has the same size + position in every dialog of the same frame size. The test fails on the build before this branch (33 FAIL) and runs inside quickcheck, so a later session cannot drop these rules.

### 6.2g EVERY DIALOG = A KIT FRAME SIZE · LEFT SLOT · LIST COLUMNS (owner 21/11 marks #71 #75 #76 #80 #82, review/kit-dialog-2) — `jksize.js` (end of file + kszSlot3), `j79.js` :root `--kpw`
- **#71 every dialog is S / M / L / XL (law 10).** `KIT_SIZE.frame` is the ONLY width table; `html.kv1/kv2 { --kszW-S/M/L/XL }` is generated from it and the pop-up width `--kpw` = min(`--kszW-L`, screen − 28) (nothing types 560 / 680 any more). The live v3 frame picks S/M/L/XL by content. Every other dialog (pick-lists ≥ `v3.live.maxOpts`, sectioned pages, the item card, tutorial coach / tip, co-op rooms, shop, the loading cover = the one pop-up page frame of §8.1) is `KIT_SIZE.legacy.size` = **L**: `kitFrameTagAll()` (one MutationObserver pass) writes `data-ksz` on every `.dlg` / `.dbox.kpanel` that has none. The scene cover frames take `width:var(--kpw)`. A dialog never has a size of its own. Test: dialog-fixed (i) opens 19 dialog kinds on Fold + iPad (every kitPanel kind, choice ± person, pick-list, spyPick, kitConfirm, item card, tip, coach, shop) and fails on a dialog with no `data-ksz` or whose width is not its size's width (on old main: 7 FAIL).
- **#76 LEFT SLOT = the MAIN SUBJECT.** A small («one») frame's left column holds ONE of: a **person** (portrait frame + name tag, `kszPor3`), an **item** (the item tile `.k3mitem > .kiev`, a leading `.kiev` item tag of the body text or `m.item` / `spec.item`), a **matter** (the event picture itself, `.k3mpic`). `kszSubject3({foc,who,explicit,item,subject})` decides: an item → item; a person who is explicit in the dialog (`who`) or a person-centred kind → person; else matter. The dialog can force it with `m.subject` = "person" | "item" | "matter" (the dialog-person session decides WHO). `kszSlot3(type,{who,item,src,mk})` is the one builder for both the builder (`kszFrame3`) and the live frame (`kszLiveLay3`). Figure frames (M / L / XL) keep the full figure left and put an item back at the top of the text (`.kiev-back`).
- **#80 the event picture is the TOP of the right column** whenever the left slot holds a person or an item (approved small frame «Bị từ chối»): `.k3right` is `justify-content:flex-start` (a frame with no picture there keeps its text centred), no empty band above the picture.
- **#75 the same content on phone and iPad.** One code path for both devices: a small notice with a person shows that person's portrait in the left slot on the Fold exactly as on the iPad («Lỡ hẹn»); a device changes the layout, never the content. Tests: dialog-fixed (j) per device; `dev/test/phone-drop-scan.js` plays the same seeded game on both and lists every feature / text one device drops.
- **#82 LIST COLUMNS.** `KIT_SIZE.list`: on the iPad (kv2) a kit facts list `.kfacts` with ≥ 3 rows, every row ≤ 110 characters and a text column ≥ 2 × 260 + 12 px is laid in **two columns** (`data-kcols="2"`, `kszListCols3`, run by `kszLiveLay3` before the frame size is picked so the shorter list can take a smaller frame, and by the tag pass); the phone keeps one column; long rows keep one column. Test: dialog-fixed (k).
## 91. kitEndScreen · THE ENDING SCREEN, full screen (owner marks #48 #50 #51, OD 21/11 ~03:56Z / ~04:03Z / ~04:06Z; review/ending-screens) — `dev/build/jend.js` (last module) — KIT READY (art pending: Foreman C)
Owner (verbatim, ~04:06Z): "bất cứ một cái gì mà kết thúc một cái game, kết thúc một cái kiếp là đều phải có một cái khung đẹp của nó … thay vì là khung nhỏ thì tôi muốn là khung full màn hình luôn … dưới là có cái nền … mỗi một cái nó sẽ có một cái nền khác nhau". #48: white mourning flower (hoa tang) top centre + white drapes down the frame sides; #50: the festive twin (red/gold celebration flowers + festive drapes/garlands) + its own «wow».
- **91.1 ONE part, no new flow**: the ending dialog that was there (its kit body, figure, buttons, co-op + save behaviour) is SHOWN as a full-screen ceremonial screen. A showModal wrapper marks the card BEFORE the base paints it (`m.cls += "kes kes-<tone> kes-t-<type>"`, so the KIT §84 size fit measures the ending frame) and adds the layers after.
- **91.2 Which dialog is an ending** — `kitEndType(m)` derives it from the queued card (old saves and the co-op guest need no stored flag): the life end card of `over()` (j32, t «Kiếp này», cls `end`) → `S.kesT` (set by the `over()` wrapper from h / fate / alive via `kesLife`; a save without it: read from `S.fate`) · the Hồi kết nhánh result (jge `PEND.geR`) → `grand` / `fail` · any card whose cls carries `kes-t-<type>` (Bảng Thiên mệnh `geBoardPanel` → `fate`; a rare ending's result card of `r97Take` → `rare`). A caller that knows the type before `over()` runs calls `kitEndNext(type)` (jge grand exit, j97 rare exit «Nữ vương Cao Ly»).
- **91.3 Types** (`KIT_END.types`, tone + fallback picture): `death` (died) · `exile` (alive: phế / đuổi / lãnh cung / điên / thứ dân) · `fail` (Kết cục of the Hồi kết nhánh) = **mourn**; `leave` (alive, rời cung bình an: xuất cung, xuất giá, xuất gia, thành thân, trốn đi…) · `throne` (Thái hậu / Mẫu hậu / Thái phi / lên ngôi / nữ vương) · `grand` (Đại kết cục) · `fate` (Bảng Thiên mệnh) · `rare` (Kỳ ngộ = kết hiếm j97) = **fest**.
- **91.4 Layers**: (a) background = the whole screen (`.kes-bg`, under it nothing: top bar and bottom bar hidden) = `img/end-bg-<type>.webp` (Foreman C, one picture safe for portrait + landscape, `object-fit:cover`, focus 50 % 30 %); until it lands: the approved event picture of that ending (`m.art` of the end card, else `KIT_END.types[t].pic` → `img/ev-<pic>.webp`) blurred + dimmed (mourn also greyed); no picture at all: the tone gradient. (b) the frame = the kit dialog frame at the KIT's own size (ending-screens-land, 21/11, laws 9/10/11): it always takes the kit's LARGEST v3 layout XL (figure XL; narrow screens keep the kit's stacked ladder) and then the kit XL width `--kszw` + the kit height (content up to the kit limit, §8.4) — NO ending-only width/height, so the left figure is the same kit XL figure slot as every other XL dialog (`dialog-fixed.js` (f), quickcheck G4 80-dialog-fixed); the ending adds only a top offset `calc(var(--kes-top) − var(--kes-bot))` (flower room) and the tone ring (mourn white/grey, fest gold/red). (c) overlay `.kes-ov` on the frame: flower top centre (`clamp(130px,26% of the frame,250px)`, 64 % above the edge) + left / right drapes from the top corners down the sides (`clamp(40px,7.5%,104px)` wide, 62 % outside the frame) — mourn `img/kit/death-flower.webp`, `death-drape-l/-r.webp`; fest `img/kit/fest-flower.webp`, `fest-drape-l/-r.webp` (transparent WebP, Foreman C); a missing piece is dropped (`kes-miss`), never a code-drawn flower.
- **91.5 Entrance** (MOTION, once per card): fest = frame rises (.62 s), flower drops in, drapes unfurl, painted kit sparks + glow + petals (`kitFxBurst` glowburst / spark / petal-peach|plum); mourn = slow fade (1.1 s), flower settles, drapes unfurl; `exile`/`fail` + a few painted ash / incense; `death` keeps j93's ink + white silk (j93 now plays that death ink ONLY on a mourning ending: a festive life ending no longer gets the death ink). Reduced motion / «Hiệu ứng: Gọn» (`kmReduced`) = no motion (`kes-calm`). Bots / quiet: none.
- **91.6 Co-op**: pure rendering of each seat's own queued card → each seat sees its own ending screen; nothing is sent.
- Kit page sample §91 (both tones as a still preview + live open buttons); `kesSample(type)`.
- Test: `node dev/test/ending-screens.js [outdir|-] [url] [WxH@dpr,…] [--noart]` (10 ending cases + old save (OLD=<live index.html>): kes classes, background covers the screen, top bar hidden, frame inside the screen at the kit XL width `--kszw` + every ending of one device shows the same kit figure slot (figure table), flower on the top edge centre, drapes on the side edges (stand-in pictures by route), no art → no piece, the button acts and the next dialog is not an ending screen, no page errors / overflow). Scan: `node dev/test/ending-scan.js` (every `over(` / ending caller → its type).
## 92. kitFocus · DƯ ĐỒ FOCUS VIEW + kitIdle + kitMoodSay (K-FOCUS-1 / K-FOCUS-1b; owner OD 21/11 ~06:20Z, ~06:50Z, ~06:55Z; worker duodo-focus) — `dev/build/jfocus.js` (last module) — KIT READY
ONE full-canvas focus layer for a person standing on the place stage. PURE DISPLAY (no game logic, no numbers of its own: counts / odds words / costs come in the data); every knob in `KIT_FOC` (not `KIT_FOCUS`, that name is the event-banner focus table in jk4).
- LAYER `.kfoc` (z 46) = the area between the top bar and the tab bar (both stay live), on kv2 across BOTH pages. Back → front: the PLACE PAINTING (`.kfoc-bg`, the stage `#scimg` picture, cover, blur 6 px; no blur in reduced motion / Gọn / Cảnh động off) spanning the whole layer (both pages on kv2, so a stranger silhouette or the panel never sits on plain grey) + dim veil rgba(20,12,8,.55) (no painting found → old backdrop blur 6 px + brightness .45 / rgba(20,12,8,.62)) · the FIGURE (the person's own stage picture, `KIT_SIZE.fig.XL.h` × `KIT_FIG` fac, ONE size in both modes, feet on the floor line area bottom − 64 kv1 / − 56 kv2, centred, never shrunk; moved down only if the head would pass the tab row) · HEAD TABS (`.pctabs .pct` look, «Giao thiệp 3/9», 8 px over the head, none for ONE group) · LEFT + RIGHT FAN COLUMNS (col width 168 kv1 / 300 kv2; left edge = figure centre − (XL.cw/2+12); acts alternate L R L R in act order; a longer column scrolls INSIDE itself) · PLATE (the stage name tag `j59tagHTML`, 6 px under the floor line) · SAY box · PLAY layer · ✕ (kit `.kit-x`, 44 px).
- FAN BUTTON `.kfoc-b` = ONE size per mode (64 kv1 / 72 kv2 high): act picture left (56 / 64 px square, §59 placeholder when none), right the act name (bold, MAX 2 LINES, line-clamp + …) + ONE line «odds word · Tốn x» (two nowrap parts «odds word» · «Tốn x»: on a narrow column it wraps to 2 lines between the parts, so neither the odds word nor the price is ever cut; never %); text never leaves the button. Columns 236 kv1 (capped by the room beside the figure) / 300 kv2. A clamped button (`.kfoc-clamp`, measured after layout) always gets the «!», whose popover starts with the full name + sub-line; `aria-label`/`title` = full name · sub-line; a button with «!» keeps 20 px right padding so the badge never covers the title; a round «!» (`.khap`) opens the kit popover `kpPop` with the §6.3 rows (`info`); a locked act (`off`) = grey look, tap = popover with `why`.
- API `const F=kitFocus.open({p,fig,from,plate,groups,group,onAct,onClose})` — `fig` = the stage figure `<img>` (the stage token is hidden while the focus is open), `from` = its DOMRect, `groups:[{k,n,can,tot,acts:[{id,n,pic,word,ton,off,why,info}]}]`. `F.setGroup(k)` (columns fold 120 ms, fan out 220 ms) · `F.say([{who,face,text}],{onDone})` (NPC-initiated: bottom box min 84 / max 132 px, face xs + name chip on the top edge, «Tiếp ▸»; plate hidden + fan folded while it shows) · `F.choices([{id,n,pic,word,ton}],onPick)` (the fan buttons again) · `F.play({skip:{n,sub,onSkip},onBack})` → the play layer element over the figure (+40 px each side; fan folded, tabs hidden, ✕ becomes ◂ «Quay lại»); `skip` = ONE kit skip button (fan-button look, bottom-centre of the layer, outside the play element so the game's innerHTML never wipes it, text never cut); ◂ calls `onBack` then ends play if still playing; the HUD strip keeps 56 px clear each side (never under ◂) · `F.setGroups(G)` (replace the groups with fresh counts, keep the current group if it still exists, no fold anim; during play/choices it applies when they end) · while `F.say` shows, the head tabs hide and the figure rises (individual `translate`) by the overlap so the box never covers the legs / plate, `F.hud(mark,clock)` (slim strip with `.kgmk` / `.kgclk`, fed through kitGameMark / kitGameClock; NO word in play), `F.endPlay()` · `F.react({seal,line,deltas})` (seal lean, ONE bubble beside the head via kitMoodSay, delta chips float up from the chest, 1.6 s) · `F.close()` (animated) · `F.destroy()` (instant) · `F.figRect()`. One focus at a time; local display only (co-op: state goes the existing act path).
- MOTION (all knobs in KIT_FOC; WAAPI; tap during OPEN skips to the end): OPEN «she walks to me»: veil 360 ms; figure from its stage rect to the centre + XL scale 700 ms cubic-bezier(.2,.7,.2,1) with two soft steps (−8 px twice); tabs fade + drop 6 px at 600 ms (200 ms); fan buttons slide out from behind the figure, alternating L/R, 40 ms stagger, 220 ms each. CLOSE: fan folds 160 ms, the figure walks back 600 ms, veil out 300 ms. Reduced motion / «Cảnh động» off / Gọn: 150 ms cross-fade, no walk, no blur.
- kitIdle (CSS, applied by a scan to every `#tokens .tok.fig img.figimg`, classes `kidl` / `kidl-sway` / `kidl-turn`, individual `scale` / `rotate` / `translate` properties because the stage pins `transform:none`): breath = scaleY 1 → 1.006 from the feet, 3.6–4.4 s per figure (own random phase; children 2.8–3.2 s); sway ±0.35° 7–9 s (women + children only); every 9–15 s ONE figure (never two, global gap ≥ 4 s, never the Emperor / children) turns the head: 0.8° + 2 px toward the screen centre for 1.2 s. Off with reduced motion / `kf-still` / Gọn; never moves the feet line or the figure box.
- `kitMoodSay(figEl,text,{seal,hold})` — ONE short bubble beside the head (side toward the screen centre, wraps, never cut), 220 ms in, stays `KIT_FOC.idle.sayMs` (3500), 300 ms out, tap hides; ONE bubble at a time; the mood seal leans while it shows. Callers (jdfv) pick WHO and WHAT (cổ trang line, VANPHONG).
- Test `node dev/test/kit-focus.js <url> <out>` (Fold + iPad: layer between the bars, figure whole + centred, tabs above the head, no fan button over the figure, one button size, no clipped text, columns scroll inside, say / choices / play / hud / react / group switch / close, walk runs + tap skips + walks back, kitIdle on every figure, ONE mood bubble). Shots + mp4 of the walk: `img/_review/kit-focus/` on the CDN.

**56.20 A RE-LAYOUT NEVER LOSES A TAP (ksz-lost-tap, LIVE fault 21/11).** A late picture or a resize re-lays the live frame (kszLiveRepick3 → kszLivePick3), moving / resizing the option cards under a finger already aimed at the old place. Rule, one place for every live frame (jksize.js): (1) the re-pick never runs while a pointer is down inside the modal (it waits for pointer-up + 120 ms); (2) kszStaleSnap3/kszStaleMark3 keep the old rectangle of every option button; for 300 ms after a re-lay a pointer-down that lands where a button WAS (and is not on it now) delivers its click to THAT button (kszKeep3 wraps every other late re-fit: kitFrameApplyLive3, kitPersonDlgFit). Tests: dev/test/ksz-late-tap.js (scan: every dialog kind x devices x early taps), dev/test/ksz-late-tap-real.js (the real Hồi kết dialog, finger on the card edge after the cards move).

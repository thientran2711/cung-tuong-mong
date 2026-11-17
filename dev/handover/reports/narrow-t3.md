# narrow-t3 (kit worker, sonnet, session_01UV1SzgsQDt2y7LHaYSDb8g)

PRIORITY #1 CHECK: reviewer report review-opt-pic-same-r2.md item 1 (narrow T3 = new kit job) + the open KIT REQUEST in FOREMAN_B_STATUS ("showModal after viewport resize renders the option block twice"); CLAIMS row 770 (this job); origin/main + origin/review/* have no narrow mode (`git grep kszNarrow3` = 0). Base = review/opt-pic-same-r2 9b2f7821 (going live).

**Branch review/narrow-t3 @ aa1a3387** (jksize.js + KIT.md §32.8b + site rebuilt). No other file touched.

## What
1. NARROW T3 (`kszNarrow3`, jksize): modal width − 16 − 36 − fig M column (140) < 274 (kit option-card minimum) ⇒ the live v3 frame stacks. Ladder NL > NM > NS (first that leaves nothing scrolling in #mb, `kitFrameFitsLive3`): top row = reduced figure (h = 26 % / 19 % of the modal height, ≤ 260 / 180) + picture strip + text; NS = small portrait ("one"). Option cards BELOW, full width, 1 column (`kszBtnGridLive3`), ONE size per dialog; because the cards are now ≥ 274 px, `kitOptFit0` takes its `kitOptFill` path: person dialogs keep the tall 3:4 picture filling the card (54..84 px wide), never a square, nothing empty. No card is near 40 % of the screen (tallest seen 124 of ~575 = 22 %). Wider screens never enter it (threshold ≈ 450 px).
2. DUPLICATE OPTION BLOCK = REAL, root cause in the kit (not only the harness): the showModal wrapper reset the live frame only when the message changed or the body was gone; a SECOND showModal of the same message (viewport resize, re-open, the reviewer harness) re-rendered #mb in the old layout but left `kszf ksz3 kszlive` + `__ksz3` on the dialog, so fit passes mixed the two layouts (empty band under the banner, options below the fold, option cards twice). Fix: `kszLiveReset3()` before EVERY render. Probe (toilReact real flow / + extra showModal / + resize event, 755 and 412): 1 `.opts`, 3 buttons, `k3body` only, in all 3 modes (before: old-layout mix in modes 2–3). Real-flow th-scold at Fold 755 + iPad 1180 shows T3 right, no empty band, options visible (shots).

## Gates on aa1a3387
- quickcheck.sh --runs 3: PASS 144 s · open 1270 ms · old save ok · core gates PASS · time-spill PASS · perf new/live render 145/253, tab 310/350, buổi 862/968, tasks>200ms 13/14.
- build_site (media-check, img-allowlist, assemble) PASS.
- fig-feet-fam.js 755x1000, 1180x820, 412x1058, 390x844: FIG-FEET-FAM OK · 124 cases, 0 px cut.
- Fold/iPad NOT changed: seeded-random pixel compare base 9b2f7821 vs aa1a3387 at 755x1000 + 1180x820, 15 kinds (man, visit, toil, many, two, child, emp, thtrieu, fest, choice, news, result, night, info, reward) = 30 shots: 27 identical, 3 differ by ≤ 459 px of 755 000 (figure idle motion; base vs base differs 0..236 px the same way).

## Scan table (node dev/test/kit-fit.js, all frame kinds, before = 9b2f7821, after = aa1a3387)
| size | violations before | after | what is gone |
|---|---|---|---|
| 412x1058 | 27 | 10 | PERSON DIALOG cards not one size (fest 602/635/254, choice 256/472, thtrieu 454/745, visit 1058/747/582, man 203/406, child, two) + square 'two' + toil gap (= the duplicate render) |
| 390x844 | 27-ish (same list) | 10 | same |
| 755x1000, 1180x820 | 17 | 13 | only the toil gap (duplicate render); rest old |
Remaining at 412/390 (same on base, not T3): court tab act rows "empty under text" (person-card rows, picture fills by rule); 'scroll' (a 10-option menu: ≥ 7 options keep the page layout; at 412 its cards are 190 px wide so kitOptFit0 falls back to squares) ⇒ NOT fixed here: needs the same stacking for the page-layout (kdper) person menus, a follow-up kit job if the owner opens such a menu on the phone.

## LOOK (host build, own shots; dev/handover/shots/narrow-t3/ on this branch — CDN sync not used)
- 412 + 390: man / visit / toil (th-scold) / choice / two / fest / thtrieu / reward: figure + strip + text on top, cards below one column, one size, tall 3:4 pictures, text not cut, name not clipped; 3-card visit scrolls inside the frame (old rule 32.5).
- Fold 755 + iPad 1180: unchanged (man / visit / toil).
Not done: kit page (kszsheet) has no narrow sample; scroll-menu narrow (above); reward kind at 412 showed one card picture not yet loaded in the shot (lazy load, same on base).

ROLLOVER: not needed (ctx ≈ 20 %).

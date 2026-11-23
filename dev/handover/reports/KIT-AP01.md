# KIT-AP01 report (Kit Keeper #8) — 23/11
PRIORITY #1 CHECK ('AP01 frame overlay'): GAP_LIST_v5 AP01 | review/gapart1 f478b213 (9 frames on CDN, unwired, KIT REQUEST) | main: KPO_ART={} placeholder only (jpres.js) | claims none.
START_CTX ~5 %.

Branch **review/kit-ap01-frame** (off origin/main ca801185) — sha **57061678fbda35b6fbbba8ce32417b722cecb2bd**. Touches kit + AP01 wiring only; no gapart1 merge needed (keys are CDN img/kit/kpo-*.webp).

## What changed
- dev/build/jpres.js: `KPO_ART` filled (tt dtq muoi cn nc td ch thd srv, cnv -> srv); kpresShow also sets `--kpo-img`; ONE CSS rule in #kpres-css: `.dlg[data-kpres-story=main][data-kpres-art]::after` = 9-slice border-image (slice 110, width 26px) over the card, pointer-events none, + card padding 26px so text stays inside. Cards without a frame keep the old double rule.
- dev/kit/KIT.md: placeholder paragraph replaced (canon overwrite) by the ORIGIN FRAME kit part.
- dev/build/jkitpage.js: kit sample §AP01 (9 buttons open a sample main-story card per origin) — built, not opened by me.
- Site rebuilt (index.html, sw.js, assets.json).

## Shots (looked at; scratch only, not in git)
Main-story card, Fold 755x1000@2 and iPad 1180x820@2: dtq, nc, tt, cn, td, thd, muoi, ch seen (consistent layout, colour/ornament per origin, text inside frame, no overlap except the pre-existing TRẦN NỮ seal touching the top-right ornament). srv not captured separately (harness reused previous origin) — same file mechanism. Not all 9 x 2 devices looked 3x.

## Tests
quickcheck PASS on 57061678: open 1656 ms, old save ok, perf render 241/241, tab 489/447, buổi 1174/1105, core gates PASS. 0 page errors in shots.

## Open
Seal vs top-right ornament overlap (minor, pre-existing element). Next request from MAIN: KIT-MGBG (review/kit-mg-backdrop) — not started.

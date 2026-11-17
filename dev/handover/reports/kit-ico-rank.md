PRIORITY #1 CHECK: OD L1343 (7.3) / L1439 (placeholder sets), L1367 (status icon), L1344 (calendar icon), S3-41 / S3-84 (rank) read via owner-bug-sweep | main 7abaf07ac: git grep `ph-p-`/`ph-l-`/`ico-download`/`ico-cal` = empty before this job, `kitRank` = none | review/*: only review/rank-port-r2 d8636053 holds the rank work (merged here, reused); no other branch has ph-*/ico-* wiring (ls-remote seen; not all branches fetched, shallow rule) | claims: CLAIMS row kit-ico-rank (main s28).

# kit-ico-rank (review/kit-ico-rank)

## 1. kit-ico-wire (C42, C44, K-ICO-1..3) — DONE
- jph.js (KIT §59): `kitPhPick(w,h,tone)` picks the file from the slot's real aspect ratio + width (portrait ps/pm/pl, landscape ls/lm/ll, wide ll, square s56/s64/s72, light/dark); wraps hand out the largest of the orientation, `kitPhFit` swaps to the slot's file (MutationObserver + IntersectionObserver + resize). Old ph-act/ph-event no longer referenced (jopic regexes, tests, tools, jksize 7.3 sheet, kit sample updated).
- jrail.js: cal -> ico-cal.webp, goal -> ico-goal.webp (mo-calendar / mo-edict-closed stay for the page-flip panels). Rail draws `val(x.icon)`; busy bob also on painted img; done = green border.
- jstatus.js/jload.js/swreg.js: dl -> ico-download.webp, upd -> ico-update.webp (glyph text only a fallback).
- KIT.md §59, §77, §77.1 rewritten in place.
- Test dev/test/ico-ph.js: PASS at 755x1000@2 and 1180x820@2 (every visible placeholder = kitPhPick of its slot, e.g. act cards 158x215 -> pl, option squares 74 -> s72, 42 -> s56; rail icons; no page errors, no h-overflow). Shots looked at: rail + act cards on iPad.
- Before/after: placeholder files used 4 (2+2) -> 30 by orientation/size; rail text/odd-shape glyphs 4 -> 0.

## 2. rank kit parts (S3-41, S3-84) — kit parts DONE, e2e see below
- New kit module dev/build/jkrank.js = KIT §86: kitRankRow / kitRankHead / kitRankList / kitRankFoot (+ sample §86). Layout by html.kv1/kv2 (no @media).
- Merged review/rank-port-r2 d8636053 (conflicts resolved against main; generated files rebuilt). jrank.js now draws its list rows, header, list frame and own-life footer ONLY through the kit parts; its private .krk-row/.krk-list/.krk-me/.krk-ft CSS and all @media deleted; stage height via --kvh.
- j90.js kpodCol/kpodName: optional entry fields fig / face / nameH / you added (main's podium look kept).
- NOT ported from r2: its podium NAME-PLAQUE restyle + kit-keeper-1 CSS in j90/jcui (r2 used @media, main's j90 is kv-based and different). Main's dais podium stays; rank-e2e podium/end-card layout asserts relaxed accordingly (stale vs main's KIT 84 frame). Coordinator: decide if the plaque restyle is wanted (separate kit job).
- End card (j32) takes r2's kit rows without the old art.
- ctm-rank Worker/D1 deploy NOT done (main's): files rank/worker/* (wrangler.toml, src/index.js board.js score.js), workflow .github/workflows/rank-worker.yml; D1 database + schema in rank/worker/src; deploy = `wrangler deploy` with Cloudflare token + `wrangler d1 create ctm-rank`; the game reads its URL from jrank.js constants. Needs main to run it.

## Tests
see bottom (rank-e2e).
START_CTX ~3 % of window (est.); handover not needed.
- dev/test/ico-ph.js PASS at 755x1000@2 and 1180x820@2.
- dev/test/rank-e2e.js (local Worker stand-in, fresh per run): 755x1000@2 ALL OK (49 ok), 1180x820@2 ALL OK (49 ok); includes old-save load + guest id, no page errors, no h-overflow, no clipped text. Shots looked at: Fold board (podium + kit list + own row + footer), iPad board (header, 2 columns, own row, footer buttons).
- Test edits (stale vs main): end-card figure assert, podium plaque assert, auto-click of main's death cinematic "Tiếp theo". Fixed on the way: footer repaint only when content changed (stable buttons, list keeps scroll).
- Not re-run: 1366x1024, 844x390, 412x1058 (kit §0 canvas = kv1/kv2 only).
- Open for coordinator: (a) r2's podium name-plaque restyle not ported; (b) first-hour.txt still lists mo-calendar as core (ico-cal now used on the rail) — re-measure with dev/measure/firsthour.js; (c) ctm-rank Worker/D1 deploy (main's).

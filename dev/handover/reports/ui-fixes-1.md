# ui-fixes-1 — worker report (session_01UV1SzjovTp4KY9Xq1JSKvC, sonnet; reports to MAIN s36)

PRIORITY #1 CHECK ('rail icon|kitSceneArt|header seal|room label'): OD kit-ui rules read | main: kitSceneArt jk2b.js, kitStageRail jrail.js, kitHdFit jk4.js, kfOverInfo jfx.js (all reused, extended) | review/* none of the 4 claimed | claims: only this row.

Branch **review/ui-fixes-1** from main d4a850ce, head **7f902a5b** (pushed; built site included; the sha holds its own build).
Tests: `bash dev/tools/quickcheck.sh --runs 3` = **PASS** (open 2114 ms, old save ok, core gates PASS; perf new/live: render 190/224, tab 443/406, buổi 1109/1153, tasks>200ms 17/17).

## What changed (kit parts only)
1. **Rail slots (jrail.js kitStageRail)**: a slot whose icon is still arriving = class `kld`: kit shimmer on card paper + the first letter of its name (data-g); failed icon = `kerr` keeps the letter; cached icon never flashes. Applies to every rail entry (Lịch, Mục tiêu, Chat, status icons) because they all go through paint().
2. **Picture frames (jk2b.js kitSceneArt)**: figure gets `ksart-ld` while the img loads: kit shimmer (@keyframes kitShim, reduced-motion = still) with the label in dark ink instead of the dark brown box; onload -> `kok` hides the label layer (real art swaps in, a see-through webp never shows the label); onerror/no picture keeps the old label plate. Every card picture (act cards, events, news, chapters, skills, origins, info) is made by this ONE function.
3. **Header at narrow widths (jk4.js kitHd3 + .khd3/.khd3s)**: measured, not a media query (media-check passes). When the time block does not fit beside her name block (412 px: it was squeezed to 3 px and ran under the TRÂN NỮ seal / off screen) it takes its OWN ROW (menu · me / time block / cells); if the eight cell labels do not fit either, icon + number only (title still names the cell). Same header on every screen. At 590/755 design page nothing changes (khd3 is not set).
4. **Label under flower sprite (jfx.js kfOverInfo)**: the guard tested only the sprite CENTRE (+4 px) against a rect list refreshed every 1.5 s, so a petal whose edge touched the pill stayed visible. Now: margin = sprite half size, refresh 0.5 s, and the list also covers map place plates (`.mlab`). Covers all clipped weather/season/falling sprites over: place pill #sc-t, side cards .k3c/.k3p, rail buttons, map labels.

## Scan / before-after (dev/test/ui-fixes-1.js, dev/test/ui-fixes-1-petals.js; host mode, CDN art delayed 6–8 s, cache off)
| family | before | after |
|---|---|---|
| rail slots while icon loads (755x1000) | 2 of 2 empty white squares | 2 of 2 shimmer + letter (L / M), icons swap in |
| ksart frames while art loads (Hành sự, 21 frames, 1180x820) | brown box + label | 21 shimmer-paper frames; loaded ones show art (verified 755x1000, 1180x820, 1366x1024) |
| header 412x1058 (direct) | time block 3 px wide under seal, cells overlap ("Tâm c"), off screen | time block own row, cells icon+number, nothing under the seal; no horizontal overflow |
| frames where a visible petal overlapped a stage chip, 25 s, 1180x820 spring | 389 / 945 (worst 38 px) | 0 / 929; 1000x755-class Fold 0 / 846 |
Page errors 0; docW == viewport at every size/tab. Old save: quickcheck old-save PASS.
Note: in real HOST mode 412x1058 is rotated into the 1180x820 spread (header already fine there); the 412 fault shows in direct mode / any page narrower than 590, which is what .khd3 fixes. 360 px direct would still overflow her name block (min-width:max-content), out of scope (rotate prompt device).

## Shots (CDN img/_review/ui-fixes-1/, JPG; delete after verdict: `python3 dev/site/cdn_sync.py --wipe-review ui-fixes-1`)
base https://ctm-img.victoria-tntt.workers.dev/img/_review/ui-fixes-1/ : 755x1000-1-act-BEFORE, 755x1000-2-act-AFTER, 755x1000-3-rail-BEFORE, 755x1000-4-rail-AFTER, 1180x820-1-act-AFTER, 1180x820-2-rel-BEFORE, 1366x1024-1-rel-AFTER, 412x1058-1-header-BEFORE, 412x1058-2-header-AFTER (.jpg).

## Not done / notes for reviewer
- Pill-vs-petal is measured by Pixi bounds vs DOM rects; no static decorative sprite was found over #sc-t, the culprit was the falling spring petal (other seasons use the same guard).
- No kit request needed (no new kit part; four existing parts changed). KIT.md not edited by me: add a line under §77 (rail loading look), §28.17 (ksart-ld), §32.12 (.khd3) if the reviewer wants it in the doc.

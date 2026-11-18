# minigame-frame report (kit keeper, session_01UV1Szhm13GLNs2444D3agj)

START_CTX ~3 % (1M window); no rollover needed.
Branch `review/minigame-frame`, sha **bd223466** (base origin/main 9c49f13c, built files included). SẴN SÀNG KIỂM bd223466.

## What changed (owner 16/11 ~21:30Z mini-game layout decision)
- `kitGameFig` / `kitGameFigRefresh` (j79.js) + `.kgfig` CSS; `kitGameFrame({fig:true})`; `kg82Frame` passes `fig` for EVERY game (`kg82Open` is the one door: contests, exams, works, lessons, practice, Điểm trang, Chải chuốt, slap/scheme/td games).
- Wide (html.kv2): left column = her full figure via the kit part `kitStageFig(S)` (KIT_FIG ratio, face layers of `kitFxLayers`, so makeup shows live). Fold / one page (html.kv1): column not drawn, game full width (no breakpoint, kv switch only; media-check passes).
- Điểm trang (jtoil.js): static mirror picture removed (`pic` dropped, also in j92 Chải chuốt); `toilColUI` no longer draws `kitFaceZoom` disc; dress round no longer draws the `pcPort` portrait; both call `kitGameFigRefresh()` so outfit / makeup picks change her figure live. `.toilw` Fold rule simplified (no empty 110px column).
- Prop picture is OFF by default (the game board already paints it); `g.prop:true` + `g.pic` gives a small corner thumbnail.
- Play animation: figure breathes while the game runs (frame not `.kg-idle`); off with "Hiệu ứng: Gọn" / reduced motion. Rim light only, no glow on the person.
- KIT.md: §13.4 + registry row; kit page sample §13.4 (jcui.js).

## Scan (before / after)
All 30 kinds in `KG82.kinds`, opened via playArt at iPad Air and Fold: before = static `.kgpic` painting column or none; after = `.kgfig` + `.kesimg` on all 30, visible on iPad, hidden on Fold, no `.kgpic`, 0 page errors. Not a tài nghệ frame: pet care (`petcGameBox`).

## Tests
- quickcheck bd223466: PASS (open 1282 ms, old save ok, perf render 264/292, tab 389/309, buổi 1233/958).
- build_site.sh: media-check + img-allowlist OK.
- dev/test/minigames.js (dan, co, mua) at 1180x820 and 755x1000: started, see result line below (machine was saturated).
- coop-e2e.js: not run (no co-op code touched; frame is client-side, no state sent).

## Samples (CDN review folder; the Điểm trang shots have the black layer neutralised by a TEST-ONLY style)
- https://ctm-img.victoria-tntt.workers.dev/img/_review/minigame-frame/diemtrang-2-colour-1180x820.jpg
- https://ctm-img.victoria-tntt.workers.dev/img/_review/minigame-frame/dan-play-1180x820.jpg
- https://ctm-img.victoria-tntt.workers.dev/img/_review/minigame-frame/diemtrang-2-colour-755x1000.jpg
- https://ctm-img.victoria-tntt.workers.dev/img/_review/minigame-frame/dan-play-755x1000.jpg

## Open items for main
1. BLACK DISC ROOT CAUSE (review/diemtrang-fx owns): the makeup layer `<img class="kmk kmk-dep">` collides with j79.js:1249 `.kmk` (ink-brush ✓/✗ glyph: background:currentColor + mask). Rename the makeup class or scope the glyph rule. Without it, the live figure on the Điểm trang screens shows black.
2. KIT REQUEST (art, Foreman C): "hands on the instrument" figure poses per game (đàn, thư, họa, múa, thêu...). Not drawable in code; figure only breathes for now.
3. Fold dress round lost her portrait-in-dress preview (owner: no figure column on Fold). If she wants a small preview on Fold, say so.
4. Reveal (toilReveal / ktrv) still uses `kitFaceZoom` — diemtrang-fx owns it; `kitFaceZoom` stays defined.
5. Merge diemtrang-fx after it lands, then re-shoot Điểm trang without the test patch.

~80 % done / ~75 % playable.

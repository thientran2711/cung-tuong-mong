PRIORITY #1 CHECK ('kitHapMark'): OD 1 | main 9 (KIT §78, jact.js:166) | review/* 0 | claims 0.

# map-me-mark — worker report (sonnet)

## §1 What the place "!" (kitHapMark, KIT §78) shows today
A small gold "!" disc on a Dư đồ place slip (and the Danh sách tile) = that place has a "happening" this buổi (adHapAt, jact.js). Max 2 places per buổi, re-rolled every buổi, disappears after she arrives (the event fires on arrival; tap = go there). Events that put one: Hoàng thượng dạo vườn (Ngự hoa viên, BAL.ad.strollP 80 %), hai phi tần cãi nhau (garden, needs 2 free rivals), nghe lỏm chuyện (any place with 2+ rivals present), có người nhờ việc (q72 favour), Ngày hội (festival place, fixed), tiếng khóc ở Trường Môn viện (night, cold-visit event). Chance per buổi: BAL.ad.hapP 65 %, second one hap2 35 %. NOT covered: summons, pending quests, other quest types (no event→map system beyond these six). Shot (forced garden + Dưỡng Hòa điện): https://ctm-img.victoria-tntt.workers.dev/img/_review/map-me-mark/1180x820-map-hap.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/map-me-mark/755x1000-map-hap.jpg. Note: the Đức "!" in the top bar is still there on this build (OD 08:00Z statbar, other worker).

## §2 "you are here" marker = kitMeMark (KIT §41, jmark.js), over her head on her figure
- Size: KIT_MEMARK.big = 1.05 (one kit value, all ranks/figures).
- Glow: white core + 3 gold halos, static (no animated filter, perf ≤ live).
- Motion: kmmBob 2.6 s, transform only on the mark's own img: rise 11 px, fast drop, squash (scaleY .84 / scaleX 1.1), rebound 5 px, small second landing, settle, rise. prefers-reduced-motion / Hiệu ứng Gọn = still mark, same glow (unchanged gate).
- Branch review/map-me-mark sha ff6ade20 (jmark.js, KIT.md §41, rebuilt site). Not touched: figures, other kit parts.
- Shots: loop sheets (8 frames, 325 ms apart) https://ctm-img.victoria-tntt.workers.dev/img/_review/map-me-mark/1180x820-mark-loop.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/map-me-mark/755x1000-mark-loop.jpg; iPad stage https://ctm-img.victoria-tntt.workers.dev/img/_review/map-me-mark/1180x820-stage.jpg.
- LOOK: iPad stage mark clearly brighter, loop visible. Fold 755x1000: the stage tab is the card list (no figure on screen), the mark shrinks to 12 px in the dialog ("Nhập cung") because room above the head is short — same shrink rule as live (min tiny=12); not changed.
## Tests / gaps
node build ok (media-check 0, img-allowlist OK); own shots above, 0 page errors. dev/test/quickcheck.sh does NOT exist on main or on the handover branch (depth 30) → not run; face-sharp-scan not re-run (only the mark img animates, never a figure). KIT page sample for §41 does not exist (no KIT_SAMPLES entry) — not added; main to decide.

## HANDOVER (worker rolled over at ~25 % ctx; successor continues on review/map-me-mark, base ff6ade20, worktree /home/user/wt/map-me-mark)
DONE (ff6ade20): kitMeMark (KIT §41, jmark.js) +5 % (KIT_MEMARK.big), bright glow, squash-bounce loop; §1 answer sent to main.
TODO, in this order (main s31 messages 12:11–12:35Z; read the OD lines on this branch verbatim):
1. Dư đồ default = whole palace fit-all (not zoomed in) beside the right card column; +/− still zoom. Code: j27.js mapHTML `const z=window.__mapZ||(kitView().pages===1?2.5:1)` (2.5 on single-page = Fold), j38.js mapFit/.mapsc scroll-centre on `.mspot.here`, jmapc.js (map-full 29131677 layout). Sizes Fold 755x1000, iPad 1180x820/1366x1024, 412x1058, 390x844; before/after shots.
2. Edge fade: all four map edges; LEFT/RIGHT wide (the loang, under the right card column / left buttons), TOP/BOTTOM thin. jmapc.js:16 today masks 14 px on all sides. Kit values only.
3. Room weather effect (jfxkit, same as Hành sự room) also on Dư đồ, perf ≤ live.
4. Pan bounds: map may drag a bit further so its edges land flush against the overlay frames (right card column, left buttons); no map part hidden under them; every place label (e.g. "Chính điện · 8 người" top-left in her Fold place view) stays clear of overlays. Overview + place views (.kpm-spot palace detail), all sizes.
5. Her marker ON her current place on the map (visible at fit-all) + her place's count line "Ta + N bóng · K khắc" (N = others there); alone "Chỉ có ta · K khắc"; other places unchanged. ONE VANPHONG/kit string. mapHTML count is `n=countAt(s.k)` in j27.js (+ jact.js wraps .mlab with kitPlaceIcon/kitHapMark; mapHTMLgrid tiles too). Marker: reuse kmmSrc(kmmCur()) image, kit part in jmark.js/KIT §41 + KIT §78 note.
Gate list if quickcheck.sh missing: reports/batch-0430.md. SHOT HARNESS (reuse): /tmp/claude-0/-home-user-cung-tuong-mong/4bc00dee-48f9-58f9-b6a9-63d1cc448724/scratchpad/mm.js (may be gone; pattern = dev/test/map-labels-2.js; start(); click "Nhận thân phận"; close "Nhập cung" dialog; click tab buttons by text; NODE_PATH=/opt/node-tools/node_modules). Build: bash dev/site/build_site.sh; upload shots: python3 dev/site/cdn_sync.py img/_review/map-me-mark (then rm the folder, never commit).

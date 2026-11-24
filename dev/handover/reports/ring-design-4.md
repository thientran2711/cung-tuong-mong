# RING-DESIGN-4 report — MAIN's ring3 frame check, FIX ALL 1–6 (successor of RING-DESIGN-3)
Worker: RING-DESIGN-4 session_01V1ZZH3w4Qe8y5BUHHuit3G (design), depth 1, START_CTX ≈ 5 %. Coordinator MAIN 125 → MAIN 126 session_01V1ZZH3LU36oJRpijfqgKNb. Branch review/ring-design-4 (from 0cc43436 + merge review/kit-woodskin a035fdb9). Design only — nothing lands.
PRIORITY #1 CHECK: review/ring-design-3 0cc43436 + reports/ring-design-3.md + AREA_PLAN + KIT_REQUESTS 24/11 RING-DESIGN-3 block | OD 24/11 07:27Z–15:40Z read verbatim | review/kit-woodskin (KK21, KIT §98 kitPick + kitDim + title/chip, 7b) REUSED | claims RING-DESIGN-3 → RING-DESIGN-4.

## Review page (Vietnamese, for MAIN to check first)
https://ctm-img.victoria-tntt.workers.dev/img/_review/ring4/index.html — stills Fold 755x1000 + iPad 1180x820 @2 (s3/), videos vid/fold|ipad-1x|2x.mp4, per-ruling checklist, perf table; real-device probe kperf.html?kperf=1 (now includes kitPick; container run: every step p95 16.7–16.8 ms).
ONE life on both devices: Phùng Uyển Ninh, Thường tại, buổi trưa, 15 people in the garden (Dư đồ «Ta + 15 bóng» = sum of areas); same chosen girl on both: Quý nhân Tư Mã Ý Hoan.

## Fixes (MAIN list)
1. No see-through people: focus dim = KIT §98.3 kitDim (opaque copy + static filter); stand-ins drawn opaque; enter/back/talk move the camera / slide, never fade people; the map→area cover is CUT away (a fading cover showed people half see-through). Followers step behind her left shoulder (her free right side holds the plaques).
2. Fold count/title: kit fixes (KK21 §98.2 + 7b jrail stale left 880c7c8b); mock feeds the area count and «Ngự hoa viên · <khu>» (kitArea request 7).
3. Name plates: declutter (chosen first), wrap inside the kit 12em, never overlap / cut.
4. No «???»: the life met the consorts (real k61Meet, saved), strangers would show «Người lạ»; option rows with an unknown name are filtered.
5. THẺ GỖ TREO = kit §98.1 kitPick (wood signpost, rail, cords, wood plaques, drop + sway, tap lift / tap choose), side:'r' after she steps out; KK21 fixed my 2 faults (text clipped, «!» badge on title) in a035fdb9. Quạt nút / nan quạt giấy stay kit .kfoc-b buttons, also low and face-safe (picker drops below any face it would cover).
6. Re-shot all stills + mp4 1×/2× both devices. Frame AUDIT (run.js) on every still AND every 0.1 s of both videos: see-through, plate overlap/cut, «???», stray live bubbles, picker over a face, top-bar overlaps → stills 0 faults; videos only transient overlaps of plaques during the kit drop-in (1 sample each). Contact sheets looked at by eye (2–4 fps).

## Known / honest notes
- Mock hides live game bubbles (.kfoc-mood/.khead.ksay) and holds world popups while it runs.
- Map→area: in the container the tab switch takes ~1.5 s (covered by the area painting); kitArea must mount without a full render (RING-DESIGN-3 lesson).
- Fold, first area entry: one frame (≈4.75 s in fold-1x) the new title «Ngự hoa viên · Ngự đạo» wraps narrow before §98.2 re-measures — told to KK21 below as a kit note.
- The stepped-out girl can fully cover a dimmed person standing at the talk spot (iPad Vườn hoa / Fold Thủy tạ).
- KIT_REQUESTS RING-DESIGN-4 block: 7b DONE by KK21; 8 (.j59sil opacity .92) and 9 (live «???» rule → owner via MAIN) open; 10 DONE (3-line names).

## Re-run
`cd dev/review/ring3; export SAVE=/home/user/wt/ring4-shots/life.json PICK='Tư Mã Ý Hoan'` (missing → `node meet.js` after boot writes a life, then `node capture.js`) → `bash dev/site/build_site.sh` (needs the merged kit) → `node run.js <fold|ipad> <shots|video|perf>` → enc + fin scripts in /home/user/wt/ring4-shots (ffmpeg cut at CUT, 2× = setpts 2) → `python3 dev/site/cdn_sync.py img/_review/ring4`. ~Design 95 % / playable 0 %.

## HANDOVER → RING-DESIGN-5 (rolled at context ≈47 % > START 5 % + 25 %; worker rule OD 16/11 08:22Z — the COORDINATOR opens the successor)
State: review/ring-design-4 has kit-woodskin 66bf8bb5 MERGED (KIT_PLAQUE rename; mock does not use KIT_PICK) but the CDN page img/_review/ring4 still shows the e9a98922 shoot. Re-shoot was stopped. Shots/scripts in /home/user/wt/ring4-shots (life.json = the ONE life; prev.py, enc.sh, fin.sh; contact sheets via ffmpeg fps). Worktree /home/user/wt/ring4 (sparse). After merging a kit sha ALWAYS run `bash dev/site/build_site.sh` (index.html is built; do NOT commit index.html/sw.js — `git checkout -- index.html sw.js` before commit).
MAIN 127 FAIL of e9a98922 (verbatim, 24/11 19:38Z) — fix ALL, whole family, same shot names, new sha:
(1) SAME KIẾP, DIFFERENT WORLD per device: Fold m1 has 6 areas … iPad has 5 areas … different people per area. Who stands where must come from game state, never from screen size (law 6). Same areas + same people on both devices; layout only may differ.
(2) SEE-THROUGH servants: grey silhouettes are translucent — must be opaque (KK22 req 8 .j59sil; use the kit fix, don't patch locally).
(3) OVERLAP behind chosen person: s-hang/p-hang/p-fan iPad — a dark servant head peeks out right behind Tư Mã Ý Hoan's head; silhouettes overlap the lady's sleeves. People never overlap; servant stands clearly beside/behind with a gap.
(4) Thẻ gỗ (p-hang): Fold 6 plaques in one narrow column, labels break to 3 lines («Khen tài nghệ nàng ta»); a faded ghost word under «Bàn tán về … Hàn Như Ý» on both devices (hidden text layer showing through). Plaques by the person near the feet per OD 24/11 ~15:30Z.
(5) Quạt nút (p-fan): iPad «Bàn tán về Hoàng hậu Hàn Như Ý» card — «Tốn 1 khắc» cut by the next card; Fold cards overlap each other's text edges.
(6) Nan quạt (p-rib): Fold top two ribs cut (…hidden under the next rib); iPad last rib «Cảnh báo nàng ta» runs off the bottom edge.
(7) Small: on Fold the «!» button jumps between d0 (beside TRẦN NỮ seal) and all other frames (below it) — pre-existing on bare LIVE? say which.
Then check every frame yourself (sheet of the videos too, fps=12 tile) for see-through people, box over face, overlaps, «???» before posting READY.
My analysis for the successor:
- (1) area.js assign(): capacity uses kv() (view.kv1 3 / kv2 4) AND a width fit on D (device span) → different areas per device. Make it device-free: fixed groups-per-area from BAL.area (e.g. grpPerArea 2 = what Fold holds at kit scale) and NO width test; iPad then shows the same 2 groups wider apart. Lối đi appears on both or neither.
- (2) The stand-in asset img/kit/unknown-fig-f.webp body alpha is 255 (only the hem fades) — it reads ghostly because it is pale flat grey; kitDim copy over it too. Get KK22's opaque stand-in look (req 8) as a class/function usable outside `.stage.j59 .tok` (mock figure = `#kar .kar-f > img`), apply it; no local filter.
- (3) stepOut() puts followers behind her left shoulder (overlap). Need a no-overlap layout: followers beside her with a gap (Fold has room only if she stands further right — then the plaque band shrinks). Fold geometry: stage 636, rail ~82 px; plaque kv1 152 px, 2 columns need ≥ 312 px band.
- (4)(5)(6) kit plaque width/height on Fold (3-line names) + «ghost word» under the 2-line name in .kpk plaques → KK22 (kitPick §98.1); fan/rib overlaps are the mock's own picker geometry (area.js picker 'fan'/'rib') — give fan buttons enough vertical step for the 3-line card (bh), clamp rib fan so the last rib stays inside the stage (D.H) and the top ribs don't cover each other's text (span/r0).
- Audit (run.js __karAudit): add person-person box overlap (except intended), card-card text overlap, element off-stage bottom.

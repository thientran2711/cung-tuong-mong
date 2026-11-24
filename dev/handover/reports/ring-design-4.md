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

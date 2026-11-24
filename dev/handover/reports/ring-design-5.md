# RING-DESIGN-5 report — MAIN 127 FAIL list (7 points) on the ring4 mock
Worker RING-DESIGN-5 (successor of RING-DESIGN-4), coordinator MAIN 127 session_01V1ZZH4Dz8sCyYc7mCxjmAH. Branch review/ring-design-4 (kit-woodskin f685185 merged).
PRIORITY #1 CHECK: OD 11 | ledger 0 | claims RING-DESIGN-4→5 | main 0 | review/* review/ring-design-4 + review/kit-woodskin (KK22 KIT §98.9/98.10 REUSED, no local kit patch).
Review page (same URL): https://ctm-img.victoria-tntt.workers.dev/img/_review/ring4/index.html — s3/<fold|ipad>-<shot>.jpg (same shot names), vid/fold|ipad-1x|2x.mp4.

## Fixes
1. SAME AREAS + SAME PEOPLE on both devices: area.js assign() no longer reads kv()/device span; capacity = BAL.area.grpMax (2 groups) + BAL.area.refSpan (520 px = the narrowest device at kit scale). Result identical on Fold and iPad (9 areas: 5 real + «Lối đi nhất/nhì/tam/tứ», each with its own hotspot). Only layout (gaps, background crop) differs.
2. Opaque servants: KK22 kit class `.ksil` (+ `.j59sil` opacity 1) applied to every stand-in figure `#kar .kar-f img`; no local filter.
3. No person overlaps another: followers stand BESIDE the master with a gap (BAL.area.folGap .05, folS .60); stepping out puts the followers on her LEFT with the same gap (as many as leave the plaque band: BAL.area.band kv1 128 / kv2 210); her own figure in talk() is limited to the free room, never over her.
4. Plaques (kitPick, KK22): Fold labels ≤ 2 lines, no ghost word (verified in p-hang/l-hang).
5. Quạt nút: cards stacked by their MEASURED height + gap, starting beside her when the band ≥ 230 px (iPad) else over her robe below the face (Fold); her plate hides if a card would cover it.
6. Nan quạt: ladder of ribs, pins stepped by rib height + gap, tilt only 0..14°, clamped inside the stage; lifted rib clamped to the right edge; tab row moved off her face.
7. «!» jump on Fold: PRE-EXISTING on bare LIVE (no mock code): life Khổng Vân Yên, place=vuon, tab act→go→act: «!» at (557,33) beside the TRẦN NỮ seal on the first render, then (557,51) below it after the next render (probe /home/user/wt/ring5-shots/bang2.js). Not caused by KAR → HUD kit (jrail/hud chip row), KK22/MAIN.

## Audit (run.js __karAudit extended: PERSON-OVERLAP, CARD-OVERLAP (rotated ribs skipped), OFF-STAGE)
Stills: iPad 0 faults. Fold: OVER-FACE on p-rib/l-rib = the audit box (30–70 % × top 18 %) touched by the tab row/first rib; looked at the crop — face clear. Fold l-hang TOP-OVERLAP = kit lifted plaque (small line wraps under the name) → KIT REQUEST sent to KK22 (OPEN).
Videos (scrub every 0.1 s): only transient overlaps while rib/fan open or my figure slides in (1 sample each, ≤ 6 px); OVER-FACE on Fold rib = same audit-box note. Contact sheets (fps 1.5) looked by eye: no see-through people, no box over a face, no «???» (strangers = «Người lạ»).

## Honest notes
- 4 «Lối đi» areas appear because on Fold a 2-person group already fills a 520 px area; names «nhất/nhì/tam/tứ» are mock-only (VANPHONG/owner to rule).
- Perf table on the page is not re-measured (perf.json missing this round); geometry changes touch only mock layout.
- ~Design 95 % / playable 0 %.
Re-run: cd dev/review/ring3; SAVE=/home/user/wt/ring5-shots/life.json (node meet.js writes it) PICK='Tư Mã Ý Hoan' node run.js <fold|ipad> <shots|video>; encode with ffmpeg (cut at the logged CUT, 2× = setpts=2*PTS); python3 dev/site/cdn_sync.py img/_review/ring4.

## Round 2 (MAIN 127 3 small fixes, same page)
(1) map: «Lối đi» areas have NO map hotspot (listed in the grid only), «Ngự đạo» hotspot moved above the grid → no label ghost under the grid, no cramped strip.
(2) fan/rib: cards never cover her name tag (stack bottom = tag top when the band overlaps the tag; fan gap tightens to 3, rib tilt shrinks to fit); the earlier «hide the tag» hack removed.
(3) Fold tabs: fan/rib tabs one row (mock .pctabs). kitPick (hang) tabs stack vertically on Fold → KIT REQUEST sent to KK22 (OPEN) together with the lifted-plaque wrap. Mock also clears a stale rail slot (inline left/flex-direction) — the kit 7b fix is flaky (one run showed the rail + head-count chip on the right over the title).
Videos re-shot; contact sheets fps=12 looked at: settled frames 0 see-through / 0 overlap / name tag visible; scrub only single-sample transient overlaps while the rib/fan/hang open (≤ 1 frame each) and one 6 px frame while my figure slides in.

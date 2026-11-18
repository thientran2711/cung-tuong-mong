# veil-zoom-r2 (D25: face overlays follow the portrait zoom, re-based on latest main)

Branch review/veil-zoom-r2 @ f88a191b4b9c3aacaa88b4c0c699f8077fd12818 = review/veil-zoom-r1 (622dffcb) merged onto origin/main ee5d33de (contains main; fast-forwardable). Generated index.html / sw.js / assets.json conflicts resolved by rebuilding with dev/site/build_site.sh.

## Cause of the 1180x820 offset (new, in main's stage code)
Main's stage slot layout (j59: `.j59sz` figure sizes) resizes stage figures AFTER kitFxPut put the face-layer box (`.kfxf`). The box kept the old size/offset: probe at 1180x820 showed box 215 px wide (translateX -107) over a 125 px figure (translateX -62), so veil/scar/rash/slap sat on the wall beside the figure. The old scan did not catch it (it compared layers with the first `img.kfxon` and the box's own geometry).

## Fix (one rule, no per-place variant)
- jk2b.js: new `kitFxLay(box,img)` = the box geometry (drawn rect + picture transform); `kitFxPut` calls it, then keeps the box laid with a ResizeObserver + load event on the picture. Covers every kitFxPut place (stage tokens, her figure, podium figures).
- dev/test/veil-zoom.js: the stage box is compared with ITS OWN picture (`c.__fig`).
- KIT.md 28.8: "Stage-box follow (D25-r2)" note.
- Portrait frames (jkpor kporFx, .kfxz) unchanged from r1.

## Places list (LUẬT SỬA CẢ NHÓM) before -> after
| place | before (main+r1) | after |
|---|---|---|
| stage tokens (NPC/consort/maid figures) 1180x820 | box 215 vs fig 125 px, veil on the wall | box = figure, veil on face (probe + screenshot) |
| her stage figure (mefig) | same mechanism | same fix (no fit data for her figure file in the scan, nothing drawn by design) |
| podium figures (kitFxPut) | same mechanism | same fix |
| portrait frames, person card, dialog column, galleries, header avatar, Tuan luc, kitFaceZoom, reveal | r1 fixed, ok | ok (scan) |

## Scan dev/test/veil-zoom.js on the rebuilt site (layers, FAIL, stage rows max error)
| viewport | layers | fail | stage max err |
|---|---|---|---|
| 755x1000@2 | 788 | 0 | 1.1 % |
| 1000x755@1 | 866 | 0 | 2.0 % |
| 1180x820@2 | 914 | 0 | 2.9 % |
| 1366x1024@2 | 858 | 0 | 1.3 % |
| 844x390@2 | 1496 | 0 | 3.9 % |
| 390x844@2 (rotate prompt) | 792 | 0 | 1.7 % |
Page errors: none in any run. Screenshots looked at: 1180x820 stage token face (before: veil on wall; after: veil on face), main at 1180x820 / 844x390 / 390x844 (rotate prompt shown). Mid-flip 3D sheets counted only.
Not covered: her own stage figure shows no overlay in the scan (no fit entry for her figure file; by design nothing is drawn); real touch / iOS Safari; no old-save test run (no save data touched).

## KIT REQUEST (kit keeper must approve, KIT.md 28.8)
1. "Zoom-follow (D25)" note + jkpor `kporFx` / `.kfxz` / `--kxl,--kxt,--kxw,--kxh` (from r1).
2. New "Stage-box follow (D25-r2)" note + `kitFxLay` and the ResizeObserver re-lay inside `kitFxPut` (jk2b).
No new kit part, no private CSS, no wording, no numbers, no art.

SẴN SÀNG KIỂM f88a191b4b9c3aacaa88b4c0c699f8077fd12818

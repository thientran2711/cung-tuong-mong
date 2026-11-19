# rank-palette-b24 — report (kit keeper, sonnet) — branch review/rank-palette-b24 @ 6702ccc (from main 3584ea42)

PRIORITY #1 CHECK: OD 2 | ledger 0 | claims 2 (rank-palette-b24 ORDERED) | main 8 (j1 RCOL = the ONE table, read by j59/jk4/jmark/jkitpage) | review/* 0 | archive 0
Law 4: the token table already existed = `RCOL` in dev/build/j1.js (halo, ring, chips, `--c`, `.rk-c0..c7` ground, title plate `--dh`, text tone all read it). No second table made; values replaced in place.

## Change
- j1.js RCOL: t1 #eae3d0, t2 #7fb394, t3 #7e9ccb, t4 #e3a3b8, t5 #a88bcb, t6 Quý phi #e3a25b (cam), t7 Hoàng quý phi #d46a64 (đỏ), t8 #efbd69.
- jk4.js kitToneOf: the derived paper-text tone used to push every vivid base to saturation ≥ .9, which turned the soft B24 colours back into hot pink/red. Rank bases (RCOL members) now keep their own saturation; only lightness is lowered for contrast. Servants/roles unchanged.
- jmark.js: fallback gold = new t8. KIT.md §1.3 table + note. Kit page §1.3 (8 swatches with rank names, reads RCOL live) needed no code change.
- dev/tools/rank-colour-scan.py (committed): lists rank-colour reads (86 lines) and stray OLD hexes; before = 18 hits (j1, jmark, KIT.md table/§glow) , after = 0 stray (historical reports excluded by being under dev/handover).

## Scan before/after (file:line | element | old | new token)
| place | element | old | new |
|---|---|---|---|
| j1.js:13 RCOL | the table | 8 old hex | B24 8 hex |
| j59.js haloColor / j59col (RCOL[k]) | halo, outline, name tags | read RCOL | same, new values |
| jk4.js KIT_RT / kitRankCol / .rk-c0..c7 | text tone, portrait ground | read RCOL | same |
| jtitle.js `--dh` (title plate) | rank plate | read RCOL | same |
| jmark.js:19 KMM_GOLD | memark glow fallback | #ffc400 | #efbd69 |
| KIT.md §1.3 + glow line | doc | old hex | new hex |
No other rank hex table exists (scanned dev/build, kit, site, test, rank, coop). Art (title-plate-N, frame/gem/bg painted pictures) is Foreman C's, not touched.

## Tests / shots
build_site.sh OK (media-check, img-allowlist, assemble). Kit sample probe: no page errors at 755x1000 and 1180x820. Shots (outside git) in /home/user/wt/rankpal-shots/: before-/after2- × 755x1000/1180x820 × s1.3 (swatches) / s48.1 (rank titles on paper, painting, night panel). Looked 3×: 8 distinct readable colours; text on paper is darkened (derived) so Đáp ứng cream reads as ivory-bronze and Quý phi orange as amber — still distinct from Hoàng quý phi red and Hoàng hậu gold.

## Open points
1. B21 Quý phi "small royal-yellow touch": no existing kit accent slot supports it → NOT built; if wanted, file a KIT_REQUEST (plate corner accent).
2. Painted art that carries rank colour (kit frame/gem/bg/title-plate images) still has old painted colours until Foreman C repaints.
3. I did not play-through full game screens (only kit sample page); stage halo/badges read the same table.

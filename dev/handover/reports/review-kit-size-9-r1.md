# review-kit-size-9-r1 — reviewer (sonnet, SMALL) of review/kit-size-9 @ code ad1a3399 / build fd91dd72

VERDICT: **FAIL** (1 blocking leftover, 1 small layout fix). No code pushed by the reviewer (branch review/kit-size-9-r1 = fd91dd72 unchanged).
START_CTX ~5 % (estimate).

## Numbered list for the worker (kit keeper)
1. **Leftover grade line, gift picker tile** — `dev/build/jgpick.js:29` (kipTile) and the sample `jgpick.js:114` still print `<span class="kshp">${I.gname}</span>` (the grade WORD) under the picture, while kitItem now also draws the chip on the frame edge: every gift-pick tile shows the grade twice ("Tinh phẩm" chip + "Tinh phẩm" bold word under the description). The branch never touched jgpick.js. Fix: drop the `.kshp` grade word in kipTile + sample (and its grid row: `.kshc.kshpick` grid-template-rows in jgpick.js:97 and jinv.js:482 reserve that 4th text row), re-check the tile height. Whole family: scan every `.kshc` tile that prints a grade word (grep `gname}` / `KIT_GRADE[..].n` next to a kitItem: only jgpick:29/114 found; jitev:94 uses it only in the tooltip = fine).
2. **Chip touches the name** on named tiles inside `.kshc` grids (gift pick, shop, pet shop): the hanging half of the chip ends exactly where the name line starts (gap 0, glyph tops of the first name line touch the chip at Fold, e.g. "Vòng ngọc Hòa Điền", "Nhân sâm trăm năm"). The jk2b "named tiles get margin-bottom" rule does not reach the `.kshpic` wrapper (it is the button around the kitItem). Fix: same margin-bottom (or row gap) on `.kshc>.kshpic` so name/price starts >= 3 px below the chip. Look again at Fold 755x1000 and iPad 1180x820.

## Notes (not blocking)
- The worker's live scan (kit-size9-live) found 0 frames on pets / reward / gain (n=0 in its own output, errs 0): those screens were NOT covered by the "chip hit 0 / nochip 0" claim. I scanned shop (kitShopNvp), pet shop, gift tiles and a synthetic reveal / reward sm tile / lg tile row myself: chip present on every non-empty frame (shop 12, pet 11, kip 4, reveal+sm+lg 15), none outside the frame, 0 `.kitg`, 0 standalone `.kgchip` next to a picture. Full-screen reward overlay and kitGain are gated by kfOn (bots/quiet) and I could not trigger them in a headless run; judged by the shared kitItem/kitRevealHTML code and the synthetic render only.
- Chip readability: 7 px at Fold slot (bag, wear, shop) — legible at 2x in the shots, small but the word is whole. XL (reveal, item card) 13.8 px is large, as the worker said; looks fine next to the name.
- Item card (kitItemCard) still has the PHẨM row; owner call, not a defect.
- Kit-conform: 1180x820 CONFORMS 98 / MISSING 2 (stale), 755x1000 as the worker reported; the MIXED lines (T7 event pictures: 0, kpscroll) are old and unrelated.

## Checks run (worker's build served from the worktree at fd91dd72)
| check | result |
|---|---|
| static: `.kitg` refs in j*.js | 0 |
| static: kitGradeChip callers | j93 reward LIST rows (text only, no picture) + jk2b kitItemGrade + jkrev; no private chip |
| kit-size9-chip (60 frames) | bad 0 |
| kit-size9-live Fold + iPad | errs 0, bag/wear/card old 0 out 0 hit 0 nochip 0 (pets/reward/gain n=0, see note) |
| own scan shop / pet shop / gift tiles / reveal | chip on every frame; gift tile = duplicate grade word (finding 1); chip touches name (finding 2) |
| quickcheck.sh fd91dd72 | PASS 151 s, open 1358 ms, old save ok, perf new/live 226/282 ms render |
| coop-e2e | 57/59 twice; the same 2 fails ("each sees the other as a person", "friend starts as Người lạ") also fail on origin/main 08725411 (57/60) = pre-existing/flaky, not from this branch |
| co-op both seats | chip is in shared kitItem, no seat-dependent code; coop-e2e no page errors |
| old save | quickcheck old save loads and plays a buổi |
| shots looked at | chip sheet 60 frames, bag Fold + iPad, wear pick Fold, item card Fold, shop Fold, gift tiles Fold, reveal/sm/lg synthetic Fold |

Re-review after the fix: only jgpick.js + the `.kshc>.kshpic` rule + a gift tile Fold/iPad shot.

## R2 re-check (code 526e1bc8 / build 0295fa45) — VERDICT: **PASS 0295fa45** (ancestor = current origin/main 08725411 included)
1. Gift pick tile: grade word gone (kip tiles: 4 chips, wordsBelow []); Fold shot looked at: chip, then name, then use line, no duplicate.
2. Chip/name gap: kit-size9-gap iPad 0 touches; my overlap scan shop / pet shop / gift tiles Fold + iPad = 0; kit-size9-gap Fold dupWord 0.
Other checks: kit-size9-chip 60/60 bad 0; quickcheck PASS 147 s (old save ok); coop-e2e 59/59.
Nit (not blocking): on the kit SAMPLE page at Fold, the XL "Ngự tứ" chip of the last item-frame sample hangs over the next section heading "§8.2b · Thẻ nơi chốn" (the sample has no bottom margin; docs page only, not a game screen). Also one sub-pixel touch (-0.6 px) "Tiến bộ" in a kinvg sample, did not reproduce on a second scan. Suggest a margin-bottom under the XL sample row at the next kit touch.

## R3 delta check (code 844a3949 / build a227d507) — VERDICT: **PASS a227d507** (origin/main is an ancestor)
Delta = kitItem draws no chip when `o.grade==null` (jk2b), recipe tiles (jrcp:210, jwkr:84) pass no grade; real grade 0 keeps "Thường".
- Scan of every kitItem call without `grade:`: only empty slots, kitItem({}) sample and the 2 recipe tiles. Live: bag/wear/card Fold + iPad nochip 0; shop 12 + pet shop 11 + gift tiles 4 all have chips (no real item lost its chip through a missing grade); chip sheet 61 cells bad 0; kit page nochip = only the 2 recipe samples (Cháo trắng hành phi, Yến sào hầm sâm) as intended.
- quickcheck PASS 149 s. coop-e2e not re-run (delta touches no co-op code; 59/59 on 0295fa45).
- Nit still open (not blocking): §8.2b sample-page heading overlapped by the XL chip at Fold (gap -16.4 px) was not fixed.

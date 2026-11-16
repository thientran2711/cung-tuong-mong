# PROGRESS small-art-wire (D45 art wiring) - branch review/small-art-wire

Base: origin/review/promo-rules-r1 @ 0d425b5a8 + origin/main (2afdafc.. latest, assemble list kept: main list + jpromo after jitd) + origin/review/small-art @ 7aa5bc832 (docs only; pictures are on the CDN).

## Wired
| What | Where | Detail |
|---|---|---|
| ITEM_ART_G keys | j98.js | hoatai g1, hoataivang g2, giayhoa g0, giaygam g1; ngocboi_r0..r7 = 0,0,1,1,2,2,3,4; vongngoc_r1..r4 = 1,1,2,2; tuithom_r1..r7 = 0,0,1,1,2,2,3 (grade = how the chest frames it) |
| IT entries (per-rank pieces) | jinv.js (RANKED_W / RANKED_B / RANKED_S) | ngocboi_rN (sl waist, Danh +1..3), vongngoc_r1..4 (sl wrist), tuithom_r1..7 (sl scent). rk = the rank that receives it (never "vuot pham" for its owner). `ngocboi` (ngu ban keepsake) and `tuithom`, `vongngoc`, `vongvang` untouched. Sachets are added to TAINT xa/bua `on` (same family as tuithom). Sellable at pr (not keepsakes). |
| BAL.promo | jpromo.js | wrist[r] -> vongngoc / vongngoc_r1..r4 / vongvang x3; NEW waist[r] = ngocboi_r<r>; scent[r] = tuithom / tuithom_r1..r7 (array now; prSetFor accepts a string too); prSetFor adds the Deo eo piece |
| BAL.promo.srv | jpromo.js | rank 3 Chuong su co co +wd:y_chuongsu, rank 4 Nu quan +wd:y_nuquan, rank 5 Ma ma +wd:y_mama |
| WD_LIST rows | j92.js | y_chuongsu "Ao gam lam chuong su co co" (P0 g0), y_nuquan "Ao lua cham nu quan" (P0 g1), y_mama "Ao gam xanh reu ma ma" (P0 g1) (Vietnamese with diacritics in the code). Art img/wd-y-*.webp (CDN). New const WD_SRVONLY: these three are excluded from wdPickAt, wdPool and jearn plain-y picks, so they never show up in the shop / random rewards / starting wardrobe of anyone else. |
| Site rebuilt | assets.json, index.html, sw.js | `bash dev/site/build_site.sh`; hashes of the 16 replaced pictures (thive-4 fig/por, c02-t1-a18 fig/por/tn, ev-hoang-de-gian/vui) equal the CDN `_index.json`. |

## KIT REQUEST (stopped, not built)
- **Wear slot rows "Hoa tai" and "Giay hoa"** in the Tu trang equipment kit (`KEQ_TT` in jinv.js / kitEquipSlots): a NEW slot row = a kit/UI decision, so I did NOT add IT entries or slot rows for earrings and shoes. Only the art keys are registered (ITEM_ART_G: hoatai, hoataivang, giayhoa, giaygam) so `itemArt()` already returns their pictures the moment the kit keeper adds the two slots (then add IT rows: hoatai sl "ear", hoataivang sl "ear", giayhoa sl "shoe", giaygam sl "shoe", rank/price tiers per the owner's rank + luxury rules; promo set could then give them from a rank).

## Tests
See the final report (node dev/test/promo-rules.js, dev/test/small-art-wire.js, item-pics). New test: dev/test/small-art-wire.js.

## Not done
- No earrings / shoes items (above). No per-rank pieces for vongvang (r5..r7 reuse it, as in small-art).

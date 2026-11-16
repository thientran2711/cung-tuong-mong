# PROGRESS small-art (D45 + promo-rules art follow-ups) — branch review/small-art

All art: Magnific gpt-2-6, project folder ba4aecfe-efce-47e2-b53f-30d292091886, style ref = `lJ8Mcw4gv9` (wd-tram-maudon icon). Every image looked at; backgrounds removed with Magnific remove-background; items cut to 88 % in a square, 512 + 256 WebP, transparent. All files are on the CDN (pictures are not in git). Content art only, no kit frames. Code is NOT changed: the keys below only need registering (see "Wiring").

## Sheets (Magnific ids, generation -> remove-bg)
- G1 earrings/shoes/bangles `eIOGtJLdqL` -> `WDsNevycXe` · G2 pendants `If60CAitvE` -> `xSdEw3IjfW` · G3 sachets `CqGdbTCEEy` -> `rgeCU3Dxtc` · G4 maid robes `VXURBZ5MMU` -> `MBwZ8HQDCm`
- Guard 4 indigo lineup `Sytb9qWUb8` -> `0egiom4TfW` (edit of original `Syttpu5Ub8`) · c02-t1-a18 `xSdE7M3jfW` -> `Do72mCTpcl` (second candidate `rgeCwVnxtc` unused)
- Emperor scenes: `lJ8H9smgv9` (gian), `vQZDKf5a47` (vui); uploaded refs `Bh4YE01oQR`, `0egi82FTfW`

## key -> status
| Key / file | What | Status |
|---|---|---|
| item-hoatai, item-hoataivang | earrings: white jade drops (silver hooks) / gold filigree + pearl + enamel | DONE (256+512) |
| item-giayhoa, item-giaygam | embroidered shoes: celadon plum-blossom / crimson peony brocade with pearls | DONE (256+512) |
| item-ngocboi_r0 .. _r7 | per-rank Đeo eo pendants (plain jade disc -> ruyi cloud -> lotus leaf -> butterfly -> double fish -> phoenix plaque -> huan -> grand phoenix set). `ngocboi` (ngự ban, Ngự tứ) untouched | DONE 8 x (256+512) |
| item-vongngoc_r1 .. _r4 | middle-rank Đeo tay bangles (gold-inlay white jade, jadeite, gold/silver twist with jade beads, jade pair with gold phoenix clasp). r0 = existing `vongngoc`, r5-r7 = existing `vongvang` | DONE 4 x (256+512) |
| item-tuithom_r1 .. _r7 | per-rank Túi thơm (peach, gourd, mandarin-duck cushion, peony round, lotus, phoenix double-pouch, filigree incense ball). r0 = existing `tuithom` | DONE 7 x (256+512) |
| wd-y-chuongsu, wd-y-nuquan, wd-y-mama | maid robes: Chưởng sự cô cô (steel teal), Nữ quan (indigo, gold clouds), Ma ma (olive brocade). Rank 1 = y_cungnu, rank 2 = y_luamoc already exist | DONE (256, wd size) |
| fig-man-thive-4-a18/a26/a36/a51 + por-* | guard 4: crimson robe -> deep indigo, same faces/armour/sword | DONE (fig 900 px, por 384x506 via porcrop) |
| fig/por/tn-consort-c02-t1-a18 | grey skin fixed: warm porcelain skin, same face/pose/dress | DONE |
| ev-hoang-de-gian, ev-hoang-de-vui | Emperor audit offenders (Qing round hat with red knob + queue): redrawn, gold hair crown / Ming flat gauze hat, no queue | DONE (768x1024) |

## Emperor costume audit (no Qing hat, no cheongsam collar)
Looked at: fig-emperor a18-a51 x2 looks (8), face-emperor, por/hd versions share the same costume, ev-hoang-de-* (4) and 55 act/ev pictures that show him (act-hoang-*, ht-*, chan-ngu-gia*, thi-tam, su-than-*, thinh-an*, trieu-chinh, long-the-*, ...). Offenders: ev-hoang-de-gian (Emperor at the window in a Qing cap with braid), ev-hoang-de-vui (attendant in Qing cap with braid, Emperor's small knobbed cap) -> both redrawn and re-uploaded in place (same key). ev-hoang-de-dem (gold crown + fur collar) and ev-hoang-de-vui-2 (no people) pass. Everything else shows Ming/Tang style (gold hair crown, round crossed collar). NOT checked: the ~600 act pictures still to be drawn on review/act-pics2 (they must follow the rule: Emperor = gold hair crown / mianguan, crossed round collar, never a knobbed Qing cap or braid).

## Wiring (for whoever owns code; I did not touch j8/j98/j92/jpromo)
- IT + ITEM_ART_G (j98): add keys hoatai (g1), hoataivang (g2), giayhoa (g0), giaygam (g1), ngocboi_r0.._r7 (g0..g4 by rank), vongngoc_r1.._r4 (g1..g2), tuithom_r1.._r7 (g0..g3). Files follow `img/item-<key>.webp` + `img/item512/item-<key>.webp` exactly like j98 expects.
- BAL.promo (jpromo.js): wrist[r] -> vongngoc_r1..r4 for r=1..4; a new waist list ngocboi_r<r>; scent -> tuithom_r<r> (r0 stays tuithom).
- WD_LIST (j92) rows needed for the new robes, art `img/wd-y-chuongsu|nuquan|mama.webp`: e.g. ["y_chuongsu","y","Áo gấm lam cô cô",0,0,"xanh",{sac:1}], ["y_nuquan","y","Áo lụa chàm nữ quan",0,1,"lam",{sac:1}], ["y_mama","y","Áo gấm xanh rêu ma ma",0,1,"xanh",{sac:2}] and BAL.promo.srv entries "wd:y_chuongsu" (rank 3), "wd:y_nuquan" (rank 4), "wd:y_mama" (ma ma).
- Slot rows for earrings/shoes (Hoa tai, Giày hoa) are a code/kit item (jinv.js note); art now exists.
- Replaced files keep their keys: assets.json / SW precache hashes of the 16 replaced pictures need the normal site rebuild.

## Credits
Magnific: 7 sheets x 80 + 3 edits x 65 + 4 x 65 (c02 x2, emperor x2) ... about 1,000 credits, plus 8 remove-bg x 3.
## Skipped
review/art-complete slices (eunuch/kid/old-love art) untouched. No per-rank bangles for r6/r7 (vongvang repeats, not requested).

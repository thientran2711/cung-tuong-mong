# look-decals report (LOOK_DECALS section A) — art worker, 11/17/2026
Model gpt-2-6 (Magnific), every mark painted OPAQUE on plain white, then:
- opaque marks (tra, daumua, hoadao, la, tuyet, ink): images_remove_background, alpha eroded 2 px (no halo).
- soft/pale marks (uot, bun, muoi, bui, scar, thuydau, hair, moc): white-matte alpha extracted from the raw render (alpha = 1 - min(RGB), colour un-premultiplied), because the AI cut-out left a white fringe on a red robe. Scar alpha x1.8 (marks were too faint).
Output: img/<key>.webp, transparent, 768 px long side. Masters stay in the Magnific library (raw creation id = painted master; cut-out id = background removed).
Looked at: every raw image, then every final on ivory (248,244,230) and red (170,30,40) swatches. No text, no person, no grey box, no halo.

| key | raw creation | cut-out creation | size | looked OK |
|---|---|---|---|---|
| fx-stain-tra-1 | s78Ia8ol8e | lJItCybgv9 | 768x732 | yes |
| fx-stain-tra-2 | rgdXtdvxtc | vQ2Acq3a47 | 768x714 | yes |
| fx-stain-tra-3 | KLDpoDQkqp | CqznVkYEEy | 768x659 | yes |
| fx-stain-uot-1 | lJItfmYgv9 | (matte of raw) | 605x768 | yes (grey-blue, translucent) |
| fx-stain-uot-2 | SymhEvXUb8 | (matte of raw) | 768x721 | yes |
| fx-stain-bun-1 | 8a6iA2mIrU | (matte of raw) | 768x203 | yes (hem strip ~4:1) |
| fx-stain-bun-2 | rgdXtI7xtc | (matte of raw) | 768x191 | yes |
| fx-stain-moc-1 | w4vaHc87EI | 4RQFrvP9Aa | 768x506 | yes |
| fx-stain-moc-2 | gOtmunmSXO | 8a6inyTIrU | 768x507 | yes |
| fx-muoi-1 | w4vaH0I7EI | dtP427PXSL | 768x627 | yes |
| fx-muoi-2 | vQ2A0STa47 | iGb5sFy3uK | 768x646 | yes |
| fx-bui-1 | mERZ0NXhJQ (2nd try; 1st iGb5LIL3uK too faint) | (matte) | 768x704 | yes |
| fx-ink-1 | tC3RYSImZJ | EbnYpzjuuO | 768x286 | yes |
| fx-ink-2 | fHGzVybCDY | JNfC5arOq4 | 768x286 | yes |
| fx-pox-thuydau-1 | jUBoaWCLD0 | O6CEKCvynm | 732x768 | yes (soft red papules) |
| fx-pox-thuydau-2 | 3z5Ksv9REY | VXw767qMMU | 730x768 | yes |
| fx-pox-daumua-1 | huZ2cylvqL | SymhFvTUb8 | 768x735 | yes (raised pustules, not gory) |
| fx-pox-daumua-2 | dtP4Zl7XSL | N2Hqj5p6D9 | 768x696 | yes |
| fx-pox-scar-1 | s78ICDTl8e | UPhvHCRwny | 768x682 | yes (pale; code scales opacity) |
| fx-pox-scar-2 | w4vaHBu7EI | jUBofhsLD0 | 768x758 | yes |
| fx-hair-xo-1 | 1ledmTjr4r | vQ2ATcFa47 | 768x569 | yes (anchored at top edge) |
| fx-hair-xo-2 | VXw7NsEMMU | jUBofvKLD0 | 768x573 | yes |
| fx-hair-xo-3 | s78ICeMl8e | rgdXvhuxtc | 768x653 | yes |
| fx-vuong-hoadao-1 | aFAGT3afSh | fHGzMM4CDY | 760x768 | yes (tiny notch top-left, harmless) |
| fx-vuong-la-1 | Bh9NAPKoQR | SymhFHtUb8 | 727x768 | yes |
| fx-vuong-tuyet-1 | Bh9NA91oQR | tC3RW0smZJ | 690x768 | yes |

Contact sheets (ivory + red, ≤1200 px): https://ctm-img.victoria-tntt.workers.dev/img/_review/look-decals/sheet-1.png .. sheet-6.png (delete after the verdict: python3 dev/site/cdn_sync.py --wipe-review look-decals).
Notes for code: wet/mud/scar/thuydau/hair/moc are translucent by nature (alpha max 0.45-0.95); multiply on the cloth mask. Mud strips are wide (4:1), tile or scale along the hem. Dark hair on a red robe is dim by design.
Note: uot/bun keys were re-uploaded after the first batch (same keys, cleaner edges on red). Nothing committed to git (images are on the CDN only).

## Add-on (owner OD ~23:48Z "Vẽ miếng nếp nhăn bằng Magnific"): crease decals
Neutral grey crumpled-silk patches (light ridges, dark valleys), opaque on transparent, AI cut-out + 2 px alpha erosion. Multiply/tint on the cloth mask. Sheet: img/_review/look-decals/sheet-7.png.
| key | raw creation | cut-out creation | size | looked OK |
|---|---|---|---|---|
| fx-crease-1 | lJItH8igv9 | N2HqgYj6D9 | 208x768 | yes (tall ~1:3.7) |
| fx-crease-2 | SymhbtzUb8 | aFAGekRfSh | 204x768 | yes |
| fx-crease-3 | huZ2MRwvqL | kspefJP16B | 221x768 | yes |
| fx-crease-4 | 5jMDhVVKxe | Ifi3Tb5tvE | 214x768 | yes |
| fx-crease-knot-1 | 8a6ic6MIrU | xSXBu97jfW | 768x753 | yes (radiating gathers round a knot) |
| fx-crease-hem-1 | Lwo8QIoswO | Symh5ZLUb8 | 768x92 | yes (thin ruffle strip ~8:1, tile or scale) |

# PROGRESS review/cycle-art (A7b) — art for the monthly cycle, from review/cycle-r3 d9c47fad1 (origin/main eba64ead4 already inside)

All pictures: Magnific gpt-2-6, folder ba4aecfe-efce-47e2-b53f-30d292091886, each looked at. Style refs: Ngự hoa viên scene cplQijT0eP (bright), tẩm cung đêm iGq8UJy3uK (dark). No Emperor, no blood, nothing explicit; women in fine silk with hairpins, the clerk in teal (no pink/purple on men). On the CDN (never git).

| file | size | Magnific id | use |
|---|---|---|---|
| img/ev-cyrep.webp | 640x480 92 KB | O6fxpCRynm | banner of the monthly report pop-up (maid bowing, softly speaking to her; open Kính sự phòng register on the table) |
| img/act-xem-so-nguyet-su.webp | 384x506 58 KB | gOIbcmpSXO | Hành sự card "Xem sổ nguyệt sự" (silver slid to the clerk, register open) |
| img/act-xem-len-so-nguyet-su.webp | 384x506 18 KB | Syt50aJUb8 | Hành sự card "Xem lén sổ nguyệt sự" (night, cloaked figure peeks at the register by one candle) |
| img/act-opt-bao-ky-dung.webp | 384x506 53 KB | xSduzxUjfW | option "Báo đúng ngày" (maid hands the clerk the honest note) |
| img/act-opt-bao-ky-lui.webp | 384x506 50 KB | gOIbTUNSXO | option "Báo lùi vài hôm" (day marks pushed one place later) |
| img/act-opt-bao-ky-som.webp | 384x506 49 KB | huRD7fOvqL | option "Báo sớm, nói đã sạch kỳ" (note sent early at the door, name tablets ready) |
| img/act-opt-bao-ky-giau.webp | 384x506 46 KB | 5jVvZreKxe | option "Giấu, không báo" (maid turns away from the records-office door, note unsent) |
Bytes added: 0.37 MB on the CDN, loaded on demand (pop-up 92 KB + 4x~50 KB; cards 76 KB).

## Wiring
- Pop-up: `KIT_DLGMAP["cyrep"]=[["cyrep","Kỳ nguyệt sự"]]` (jevban.js) → `img/ev-cyrep.webp` (same path as every own banner; replaced the room / "Hoàng thượng ngự giá" fallback). The pop-up's pid is `cyrep` (mkP).
- Act cards: CDN `img/ACTS.json` acts += "Xem sổ nguyệt sự" → xem-so-nguyet-su, "Xem lén sổ nguyệt sự" → xem-len-so-nguyet-su (downloaded the live file, added 2 keys, JSON validated, 390 live keys + 2 kept, uploaded).
- Options: jopic.js KIT_OPT_RULES, 4 rules at the TOP (^báo đúng ngày / ^báo lùi / ^báo sớm / ^giấu, không báo). Before: all three "Báo …" hit the tố giác rule (`to-giac`, an accusation picture — wrong), "Giấu" hit giau-trong-ruong-h.
- Rule-steal scan (old vs new KIT_OPT_RULES over 29,713 string literals of dev/build/j*.js): 5 titles change, all intended: "Báo đúng ngày", "Báo lùi vài hôm", "báo lùi", "Báo sớm, nói đã sạch kỳ" (to-giac → new), "Giấu, không báo" (giau-trong-ruong-h → new). Nothing else moved.
- Generated files rebuilt with dev/site/build_site.sh (assemble order unchanged, jcycle.js LAST).

## Tests
`node dev/test/cycle.js index.html <out> 755x1000@2` ALL OK; pop-up screenshot: banner + 4 option pictures correct; 755x1000 Hành sự deck: both cards show their own picture (no §59 placeholder). Other sizes not re-run (art only; code change = 1 map entry + 4 regex rules).
No KIT REQUEST.

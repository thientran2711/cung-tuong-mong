# PROGRESS review/placeholder-pics (KIT §59, owner 15/11 ~18:45Z)
Task: 4 generic placeholder pictures for events / acts without their own picture, wired by tone; dev list of who uses them.

## Art (Magnific gpt-2-6, folder ba4aecfe-…, style refs cplQijT0eP day / s7o88xTl8e night; 2 variants each, looked at all 8)
| file | size | picked creation | rejected |
|---|---|---|---|
| img/ph-event-light.webp | 640x480 | s7oC4Btl8e | 3zbs0qgREY (near duplicate) |
| img/ph-event-dark.webp | 640x480 | gOIuNmtSXO (indigo night, moon, one candle) | xSdvOB3jfW (too red, tablecloth) |
| img/ph-act-light.webp | 384x506 | Do7ih4Fpcl (blank round fan, lacquer box, hairpin, peach blossom) | MBw6mPlDCm |
| img/ph-act-dark.webp | 384x506 | 5jV8SBGKxe (blank fan, one candle, indigo) | KLMIUodkqp (fan painted, less "blank") |
All on the CDN (cdn_sync.py). No people, no faces.

## Code
- dev/build/jph.js (last in assemble.py): KIT_PH, kitPhTone, outermost kitEvArt wrapper (null / room stand-in → ph-event-*),
  kitActArt wrapper + kitPhActCard (act with no own key or file missing on CDN → ph-act-* in the art slot), CTM_MISSING_PICS + console.info once,
  kit sample §59. Week book unchanged (owner rule: no repeated picture there).
- dev/kit/KIT.md §59 documents the tone rule.
- dev/tools/missing_pics.js → dev/art/MISSING_PICS.md (counts + lists).
- dev/test/placeholder-pics.js: old save → new build, deck acts all have a picture, an event dialog shows ph-event-*, no errors/overflow.

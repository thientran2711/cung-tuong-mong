# SFX test results (review/sfx, 15/11 PM, after merging main 80be56be0)

Machine load 40–50 during all runs.

| Test | Result |
|---|---|
| dev/audio/inventory.js | 428 rows · 0 unmapped · 0 missing · 0 meaning mismatch · 6934 card texts, 0 text mismatch · 0 page errors |
| dev/test/sfx.js 1180x820@2 | 104/104, 0 page errors after the jfx kfWhy fix (the run before the fix: 104/104 + 1 page error 'T is not iterable', fixed), 0 HTTP ≥ 400 |
| dev/test/sfx.js 755x1000@2 | 103/104 (co-op 'friend joins' timed poll under load; re-run alone 7/7 pass), 0 page errors, 0 HTTP ≥ 400 |
| dev/test/sfx-smoke.js (3 weeks new game + old save .out/oldsave.json 1 week, sound on) | 755x1000, 1000x755, 1180x820, 1366x1024, 844x390, 390x844: all ok, 0 errors, 0 HTTP ≥ 400, 0 dead audio files, 30–48 sounds per 3 weeks |

## New files (measured, dev/audio/meas.sh)
```
sfx-wx-birds.mp3 dur=2.089796 I=-17.7 peak=-3.9 lead=0 bytes=16971
sfx-wx-cicada.mp3 dur=2.194286 I=-17.8 peak=-4.4 lead=0 bytes=17807
sfx-wx-crickets.mp3 dur=2.142041 I=-19.4 peak=-1.3 lead=0 bytes=17389
sfx-rite.mp3 dur=2.455510 I=-22.7 peak=-6.0 lead=0 bytes=19897
sfx-festival.mp3 dur=1.384490 I=-22.8 peak=-1.8 lead=0 bytes=11328
sfx-confiscate.mp3 dur=1.567347 I=-20.7 peak=-1.3 lead=0 bytes=12791
sfx-search.mp3 dur=1.854694 I=-21.7 peak=-1.7 lead=0 bytes=15090
sfx-scheme.mp3 dur=1.776327 I=-20.6 peak=-3.2 lead=0 bytes=14463
```
(I = integrated loudness; norm.py targets max momentary −16 LUFS, the same rule as the 86 older sfx files.)

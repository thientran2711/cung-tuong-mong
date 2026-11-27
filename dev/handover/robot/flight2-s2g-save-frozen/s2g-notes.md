## SAVE FROZEN b2550 5154622 (stored) — QuotaExceededError (added by runner supervisor, merge into flight2-s2g.bugs.md at LIFE DONE)
- 10:53Z, CP after buổi 2600 (year 18): «CP SAVE ERROR: setItem failed 259× — QuotaExceededError key hclh-save-v2-1 (5299793 chars)»; first failure at 5247844 chars (log line 378), the live save kept growing 5247844 → 5299793 chars while the stored save stays at the b2550 value 5154622 chars (stored clock 18.218.2.3 vs live 18.223.2.1).
- Runner BUGs: «QuotaExceededError: the game save no longer fits localStorage (j6 save() swallows it: every later save is lost)» and «SAVE STALE: stored b2550 live b2600».
- Consequence: any crash/resume now restores b2550 (about 50 buổi lost); the life itself keeps playing in memory. Shot: shots-flight2-s2g/m-look-2600.png (VM only).

## Final addendum (LIFE DONE 16:12Z)
- Stored save never recovered: stored stayed 5222025 chars (SAVE STALE b<3000 … b<3300 at live b3800 … b4100), live save reached 7883116 chars, setItem failed 8435× by buổi 4046.

# flight2-s9f save quota split (game bug, 2nd seat after s3f)

- GAME BUG: SAVE QUOTA SPLIT b2716 stored 5233180 / live b2746, lsK 6312 KB
- life flight2-s9f · iPad 1180x820 · harness 8ea10d7e (pin=0) · game 5e013076 (local server)
- stored save key hclh-save-v2-1 froze at 5233180 chars (last good = ckpt CP buổi 2716, year 19, ~15:53Z); the live page keeps playing
- detected 15:56Z: stored save.at lagged ckpt.at 169 s; rechecked 16:00Z: lag 409 s, live buổi 2746, lsK 6312 KB (all localStorage keys), save still 5233180 chars
- earlier: save grew ~0.18 MB per 100 buổi (3.38M @1623, 4.25M @2117, 4.83M @2541, 5.23M @2716)
- F #24 order 16:00Z: keep playing live, no reload / no voluntary re-arm; if the runner must re-arm or the page crashes, resume from the stale ckpt and note «RESUMED FROM STALE SAVE b2716, lost N buổi»
- proof for B's save-fix (rv9 01bad0f6)
- 16:24Z update: live buổi 2816, stored save still 5228745 chars (stale since ~15:53Z), lag >1300 s; life valid, playing on
- 18:35Z LIFE DONE: Lãnh cung age 40, harness b3447 (game clock ≈ b3202); stored save stayed 5228777 chars; no further freeze/rewind after the 16:46Z resume.

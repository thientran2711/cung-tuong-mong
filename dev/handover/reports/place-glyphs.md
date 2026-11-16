# place-glyphs — STATE: PAUSED until the owner's morning (owner order via main s10, 11/16 ~06:17Z). NOT ready for review.
Branch review/place-glyphs (commit pushed; code only). Session session_01UV1SzmEsuu42GCFecC9HGf. No new generation after the pause order.

## Audit: places without a glyph (before)
Had glyph: nvp(bac) tyv(y-thuat) vuon(hoa = brush+blossom, not a garden) thu/dtd(sung) tn(duc) kn(danh).
Missing: ksp, lc, home + every consort palace r<N>, cnh, tgk, ttp, acs, dc  (+ a real garden glyph for vuon per D56).

## Done (9 glyphs, gpt-2-6, folder ba4aecfe, 3 old icons as refs, transparent bg, 1k, 2 candidates each, ALL 18 looked at on contact sheets; picked one each)
place-ksp (3 jade tablets) · place-lc (closed gate + bare plum) · place-cung (palace pavilion roof; used for home and every r<N>) · place-vuon (moon-gate garden) ·
place-cnh (servants' house + folded silk) · place-tgk (wash tub) · place-ttp (books, scroll, inkstone) · place-acs (toy horse, bow) · place-dc (crown prince's crown).
128 px webp, trimmed to bbox. Uploaded to the CDN: img/place-<key>.webp. Sheet: dev/handover/reports/place-glyphs-sheet.png (large + 14 px preview row).
Code (review/place-glyphs): dev/build/jact.js KIT_PLACE_IC + kitPlaceIcon (r<N> fallback -> place-cung); KIT.md §78 updated. No code-drawn art.

## Nội vụ phủ scene (D56) — PARTIAL, not wired
Base (spring-morning) = Magnific creation lJ8bS37gv9 (looked at; the other candidate eIOnX8odqL also good). 15 season x buổi edits (residence_prompts.txt wording) were ALREADY queued before the pause (65 credits each):
xuan-trua YML60jaWeC · xuan-chieu xSdQsBMjfW · xuan-toi YML60SQWeC · ha-sang u5n8HVRQLD · ha-trua Bh4cI2xoQR · ha-chieu vQZeCTua47 · ha-toi lJ8bUFcgv9 · thu-sang 1lpEjC4r4r ·
thu-trua TdSZDZzVNR · thu-chieu yiCLNZfPW9 · thu-toi rgeusJOxtc · dong-sang 3zb7ATbREY · dong-trua UPmkOZCwny · dong-chieu tCiMakYmZJ · dong-toi O6fj902ynm.
Not yet looked at, downloaded, or uploaded. Wiring still to do: SCN_HAVE/SCIMG "plx-nvp" -> noi-vu-phu (nvp currently borrows sc "ksp" in jact.js l.84), KIT_FLOOR/KIT_FANCHOR.

## NOT done
Tests, Playwright shots of Dư đồ (1180x820@2, 755x1000@2, 844x390), looking at the glyphs in game at 14 px. Other D56 icons (palace roof/garden done; Kính sự phòng tablets, Lãnh cung done) — none left except the scene.
## Credits
Glyphs 18 x 40 = 720; scene base 2 x 65 + 15 x 65 = 1105; stray estimate call 65. Total ~1890.
## Next (owner's morning)
Owner reviews the sheet (samples). If approved: mass production/wiring goes to Foreman C per main s10.

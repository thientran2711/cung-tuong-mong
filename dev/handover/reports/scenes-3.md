# scenes-3 — report (worker sonnet, branch review/scenes-3)
Base origin/main 7abaf07ac. START_CTX ≈ low (fresh session); no rollover needed.
## What was built (3 owner-approved items, nothing more)
1. demotion-scene (S3-82, OD:L374): `dev/build/jdemo.js`. ONE hook = jdh2 weekly state check → `window.dhConfiscate(p,"cold"|"giang")` (every route: demote, fall, cold, inline drops; her and every consort). `demoSeize` takes worn jewellery above rank (lãnh cung: all worn pieces) + wardrobe tram/y above phẩm (issued base robe stays) into the Nội vụ phủ store (S.il.box why "demote"); `demoReturn` (weekly) gives them back once the owner stands high enough (nothing lost for good). Her scene = kit person dialog (kitPanel notice, Nội vụ phủ eunuch), decree line, «Mâm thu về» item tags row (`.kdemo-tray`, KIT 66.3), rows, «Tuân chỉ». NPC consorts: data + news line (co-op host only).
2. level-up-scene (S3-203/D14, OD:L712): `dev/build/jlevel.js` = new kit part KIT §86 `kitLearn`; hook on addArt + addVir (all roads), her only. Shows effect lines from ARTFX/VIRFX (same text as her skill card) + recipes opened (Tứ đức). Painting `img/scene-thanhtai.webp` = ART REQUEST in FOREMAN_C_STATUS.md; placeholder = skill's own painting (onerror swap).
3. biếu quà làm lành (S3-209/D19, OD:L752): jts.js `tsOptGiftsItem` + `PEND.tsgiftpick` + `tsGiftWorth`: second option in Nguy hiểm chung (panel + maid warning) → kit gift picker (items + works) for the person with the most ill will; worth = wkEval (works: tastes/fatigue/chân tình) or giftVal + jlux.luxGift (mọn = refused); item goes through giveTo (one gift rule). Numbers moved to BAL.tsGift (bac 12, ghen 8, oan 5, aff 3, eq 4) — the old hard-coded 12/8/5/3 in tsOptGifts now read BAL.
## Family scan / before-after
| Group | Before | After |
|---|---|---|
| demotion/cold routes that confiscate worn above-rank items | 0 of 3 (cold, giáng, cấm túc n/a) only hiệu/title items | cold + giáng = 2/2 via the single dhConfiscate hook, her + NPC |
| roads that raise a tài nghệ / Công Dung Ngôn Hạnh bậc with a scene | 0 | all (addArt/addVir are the only two writers; addArtP(S) → addArt) |
| "Biếu quà làm lành" entries | 2 (panel, maid warning) bạc only | 2/2 also offer the item/work option |
## Tests
- node dev/test/scenes3.js (Fold 755x1000@2.6 + iPad 1180x820@2): errors [] on both; gift picker rows (item/work ok/locked), gift go (ghen 40→32, item leaves chest), demo (2 worn pieces seized, scene queued), NPC seize, return on rank, cold (worn piece gone), level scene (Cầm bậc 3, VIR) all PASS. Shots looked at (kept outside git).
- quickcheck: see main message.
## Notes / for the coordinator
- Eunuch name "???" in test = no court generated in the test life; real life shows the name (same as jdh2's notice).
- Open: the cấm túc kind is left as is (OD says demotion / lãnh cung only).
- No old-save break: new state only S.il.box entries (why "demote"), created on demand.

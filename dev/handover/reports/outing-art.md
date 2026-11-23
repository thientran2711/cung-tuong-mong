# outing-art (KP23 outings wiring) — worker session_01N1tNP5iasNKdRpY67DYyCp, SMALL
PRIORITY #1 CHECK ('outing'): OD 13 | ledger 0 | claims 8 (row 'KP23 outings wiring' = this) | main 15 hits, no reader of img/outing-* | review/* 0. Art: GAPART2 row KP23 (C).

Branch **review/outing-art @ 4627c50b** (off origin/main a689bb80; source 7d400460 + build 4627c50b). No BAL / save / co-op / time change.

## What
`dev/build/jevban.js`: one table `KIT_OUTING` (key, title regex, body regex), `kitOutingKey(m)`, `kitOutingSrc(key)`, and a `kitEvArt` wrapper. A dialog that is an outing gets `img/outing-<place>-port.webp` (kv1 phone) / `-land.webp` (kv2 iPad) as its picture (same orientation rule as kitFullPic: `kitFullOri`). Live only when the file is in the CDN index (`KIT_CDNHAVE`, like every ev banner); otherwise nothing changes (old chain: room picture). Stage figures stay (the pictures are establishing backdrops, no people). Dialogs with own art (`art`, `stArt`, `headArt`, place card, ending) are untouched. The 4 files are LIVE on the CDN (_index + HTTP 200).

## Place table (every outing / trip place found)
| place / trip | where in code | before | now |
|---|---|---|---|
| Chùa Hộ Quốc: Thái hậu's "Chùa Hộ Quốc cầu an" | j67 c3 | room picture | outing-chua-ho-quoc |
| Chùa Hộ Quốc: "Gặp ở chùa Hộ Quốc" (road ch) | jrd_ch x1 | room picture | outing-chua-ho-quoc |
| Chùa Hộ Quốc: "Gặp nhau ở chùa Hộ Quốc" (road td) | jrd_td x1 | room picture | outing-chua-ho-quoc |
| Chùa Hộ Quốc: meeting an old friend (outside route) | jkc3b s1 | room picture | outing-chua-ho-quoc |
| Cảnh Sơn trip with the Emperor (Trùng cửu, "Theo ngài lên núi") | j7 trungcuu via jact2 festival place | room picture | outing-ngu-uyen-ngoai |
| Place Chùa Hộ Quốc on the outside map (kc_chua) | jkcg SCIMG kc-chua | own painting kc-chua | unchanged (own painting; the establishing picture would be a downgrade) |
| Festival outings with own banner: Thanh minh tảo mộ, Hội Phượng, j71 festival dialogs, đông chí lễ tế | j31/j71 `headArt` ev-fest-* | festival painting | unchanged (own painting wins) |
Deliberately NOT matched (mention only, not an outing): chat/message/task texts naming the temple (j67 c1, jrd_ch s2 + Lâm Khải message, j72 th_kinh2, jrd_td c2/Gửi lão), endings (jgedata, jroute), Thu săn (children's contest j53), the horse-bolts hazard (j71), kids hunt option (jend14).
ART NEEDED (no painting yet, keep fallback): Nam Giao altar outing (đông chí hầu lễ tế, no headArt path of its own), hunting ground (thu săn / sân tàu ngựa) as her own outing, lake/boat outing (Đoan ngọ, du hồ), Thanh minh grave-sweeping field. Nothing painted by me.

## Tests
- `dev/test/outing-art.js` (new): Fold + iPad, 12 title/body cases (4 temple + 1 park positive, 7 negatives), port on kv1 / land on kv2, own-picture/headArt/place-card untouched, not-in-index fallback (no throw), real dialogs open with the outing picture, plain dialog unchanged, 0 page errors: ALL OK.
- quickcheck (bash dev/tools/quickcheck.sh): PASS · open 1492 ms · old save loads and plays a buổi · core gates PASS · perf new/live: buổi 1187/2233 ms.
- coop-e2e (live Worker): 141/141. Both seats read the same dialog text → same place; each seat's file follows its own device (Fold port, iPad land), same picture.
- Old save: quickcheck old-save step OK; no state field added.

## Shots (Fold 755x1000@2 + iPad 1180x820@2, looked 3x)
CDN img/_review/outing-art/: fold-chua.jpg, fold-ngoai.jpg, ipadAir-chua.jpg, ipadAir-ngoai.jpg (delete after verdict: `python3 dev/site/cdn_sync.py --wipe-review outing-art`).
NOTE for review: the dialog picture is a WIDE band on both devices, so the Fold portrait file shows as a cropped horizontal slice (readable: meadow + bridge). Kept the kv port/land rule as ordered; switching the band to always `land` is a one-word change if the keeper prefers.

# kit-dress-picker — report (kit-mark; owner OD 20/11 ~21:45Z via MAIN ROOT-81)

Branch `review/kit-dress-picker` @ 17c9ac7e (from LIVE 548dcd0d). `bash dev/tools/quickcheck.sh 17c9ac7e` PASS (201 s, core gates PASS, old save ok; perf buổi 2534 vs live 1084 = inside the 2613 limit but high — earlier reruns of other branches show the same one-off spikes). First pushes failed the build on `media-check` (a width media query, then an `innerWidth` test): the phone case is now decided by the MEASURED frame width (<480 px). `golive.sh` not run (classifier refuses). `coop-e2e` (two browsers, Fold host + iPad guest): 68/68 passed.

## Owner (verbatim)
«… game không tự thay đồ … buổi sáng tôi phải tự chọn trang phục, hiện tại trong game, màn chọn trang phục, có cái khung pop up ra, nhưng không có nhân vật bên khung trái … thêm cho tôi nhân vật thay đồ bên trái, nhưng làm sao cho đẹp á. Chứ không phải như mấy khung sự kiện». (The «new day never auto-changes her outfit» half is E30's job.)

## What I found (law 11 scan of every dress picker)
- The only dress picker popup is `toilDressUI` (jtoil: makeup «Trước gương đồng» step 1; the Hội phối đồ theme dress step and the co-op redraw jcoopthinf:256 call the same function). `wdWearUI` (j92) is the Tư trang wear action, no popup of its own; Tư trang shows her on the stage beside the bag.
- Fold 755 (html.kv1): the game frame hides its figure column (`.kgfig` display:none on kv1) → the picker had NO figure. iPad: the frame already shows `.kgfig`, but it did not follow the dress she picks.

## Fix — KIT §60.2 `kitDressPicker({p, rank, head, body})` (jtoil; kit page sample §60.2)
Her full-body figure on the left as a LIVE preview (the tier of the dress she wears now, `kitDressFigSrc` = j88 `figTierOf` trick), choices on the right. Look: a warm mirror-like stand (soft radial paper, floor shadow, name plate), not the event frame. Fold: the picker's own stand. iPad (a frame that already has a visible `.kgfig`): that column is refreshed with the preview (`kitGameFigRefresh(p,{src})`), no second figure. Frame narrower than 480 px (phone): no stand, reads as before.

## Tests
`dev/test/kit-dress-picker.js` 19/19 (Fold 755x1000 / iPad 1180x820 / phone 390x844): exactly ONE figure on screen, left of the choices, picture loaded, nothing cut off + «Mặc bộ này» in view, the figure follows the dress rank (rank 0 ≠ rank 7) with state put back, phone shows none. one-core-guard + media-check + kit-conform (quickcheck) green. Shots LOOKED: CDN `img/_review/kit-dress-picker/dress-{fold,ipad}.jpg` (delete with the verdict).

## Honest limits
- Co-op: `coop-e2e` passes (both seats, 68/68) and the co-op redraw calls the same `toilDressUI`, but that run never opens the dress picker — no co-op-specific screenshot of it. The figure is `S` = the local seat's player, so each seat sees her own.
- The figure art is per rank TIER (j88), so the preview changes when the worn dress changes rank band, not for every single garment of the same band.
- Tư trang (stage figure beside the bag) is untouched.

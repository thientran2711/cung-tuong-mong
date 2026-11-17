# map-frame-art — SAMPLE READY, round 3 (irregular parchment-leather sheet, no rectangular frame)
Rounds 1-2 (rectangular borders: ornate, then thin/muted) REJECTED by the owner. Her words 16/11: the map should look like ONE sheet of old leather/parchment (giấy da), slightly torn or cut in a nice way, "đâu mà vuông vức như vậy". So: no frame at all, the map's own outline becomes an irregular sheet; the kit-cream page shows around it. Base origin/main; nothing on main, no PR, no CDN upload yet.

## 3 variants (Magnific gpt-2-6, folder ba4aecfe…, every image looked at)
- (a) lightly torn edges: ragged fibrous torn rim, a few nicks, one small tear, darker aged rim; window edge also hand-torn
- (b) deckled hand-cut edge: soft wavy feathered outline like handmade paper
- (c) elegantly cut shape: gently curved sides, concave scalloped cartouche corners, soft worn rounded corners
Two paintings per variant (2:1 iPad, 1:1 Fold). Painted on magenta (outside) + green (map window) chroma, both keyed out, edge fringe despilled; ONE small tint pass (saturation x0.52) so the leather sits with the map paper and the kit cream UI.

## How it is built (real CSS on the live Dư đồ, 1180x820@2 and 755x1000@2; map art from CDN)
Per variant and device two webp, sized to the `.kleather` box @2 (iPad 2324x1242, Fold 1490x1538):
- `mapsheet-<v>-<dev>.webp` = the sheet overlay (parchment ring, outside AND map window transparent)
- `mapsheet-<v>-<dev>-mask.webp` = silhouette alpha (everything inside the outer irregular outline)
CSS recipe (replaces kitLeather's clip-path/gradients/rolls/stitch):
`.kleather{padding:0;background:none;clip-path:none;-webkit-mask:url(mask) 0 0/100% 100% no-repeat;mask:…}` ; `.kleather::before{content:"";position:absolute;inset:0;z-index:6;pointer-events:none;background:url(overlay) 0 0/100% 100% no-repeat}` ; `.mapsc` fills the box (height 100%, no radius/shadow); `.maptools` inset about 13% top / 7% sides (Fold 11%) / 8% bottom so buttons stay inside the window; shadow = `filter:drop-shadow(0 3px 5px #3a1e0a66)` on `.panel:has(>.kleather)`. The map stays pannable under the overlay (pointer-events none). Whole-image stretch only (aspect 1.87 vs 2:1 and 0.97 vs 1:1: invisible).
Sizes (KB overlay / mask): see frames-spec.json (about 160-250 / 20-40); window_pct = hole bbox in % of the image.

## Self-check vs owner art rules
Painted, never code-drawn: yes (CSS only layers the painting). Sharp @2: overlay is at device size. Small files: overlay 160-250 KB (a-ipad ~247 KB is the largest), masks <40 KB. Static image, no perf cost. Edge fringe: magenta/green despilled, checked on the real page (pink halo found on (b) in the first pass and fixed).
Honest notes: the map tools row (Ra vào / Danh sách) on Fold already overlaps a hall label at the top in current main (not caused by the sheet); on (c) Fold the cut corner needs the 11% side inset. Labels near the window edge can be clipped by the sheet like any panning map. Window shape stays slightly wavy in (a)/(b), cut-corner in (c).
Files: sample-{a,b,c}-{ipad,fold}.jpg + sheet-map-frames.jpg in `map-frame-art/`.

## Next (after owner choice)
Upload the chosen variant's 4 webp (2 overlays + 2 masks) to the CDN as img/kit/mapsheet-<v>-<ipad|fold>[-mask].webp, kit-keeper spec (above), KIT READY-for-keeper.

(image removed per OD ~14:15Z storage rule — images under reports/map-frame-art/ and any reports/map-frame-art.* pictures are no longer in git)

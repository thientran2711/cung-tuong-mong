# hairpin-tryon — hairpin try-on sample (ART worker, Foreman C)

PRIORITY #1 CHECK ('hairpin dress-up'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0. Reused: parked dress-up artifact "Phòng Thử Y Phục" (read it; it is an outfit/hair placement tool with a db, so it did NOT fit: made a NEW private artifact), m09 body spec, style ref m09, rank-vankien sample method (Magnific gpt-2-6, folder ba4aecfe…).

## Link
Try-on page (private artifact, owner must open from her account): https://claude.ai/artifact/XzxMY7EXFotVTNf9SKJjmW
Nothing live in the game. Images on CDN: https://ctm-img.victoria-tntt.workers.dev/img/_review/hairpin-tryon/ (12 files, 0.5 MB; wipe with `cdn_sync.py --wipe-review hairpin-tryon` after the verdict).
NOTE: the artifact frame blocks remote images (CSP), so the page ships the same files beside itself (assets/). The CDN copy is the review/game source.

## What was made (Magnific gpt-2-6, folder ba4aecfe…, 5 gens: 2 figures, 1 pin sheet, 2 background removals; ~280 credits; every image looked at)
1. Figure: consort court robe (wide sleeves, floor hem, layered), ancient double-loop high bun, NO pins/ornaments/earrings, clean forehead. figure_full.webp (0.5 scale, 620x1796, 520 px headroom added above) + figure_head.webp (full-res head crop).
   m09 overlay (silhouette, red = new, blue = m09): head, shoulders and feet coincide ≤ ~2% at scale 0.598 (feet matched). overlay_m09.webp in the CDN folder. Hair is a double-loop (not m09's single bun) so the top of the head differs by design.
2. Hair occlusion: hair_front.webp = dark-hair pixels of the figure (local colour mask, no Magnific segment call), same coordinates as figure_head. 9 anchors (top notch, both loop tops, both upper hair sides, both mid sides, both behind-ear), each with default angle, lift 80, scale 0.7 and cover radius 90 (its own front-hair zone). anchors.json.
3. Pins: 8 sprites cut from one sheet: pearl-dangle gold pin, peony, phoenix, jade butterfly, bu-yao long tassels, two-prong flower fork, jade ruyi + red tassel, plum blossom. pins_meta.json holds tip (insert end), head (ornament end) and ob (line where the ornament ends and the shaft starts).
4. Page: choose a pin (tap or drag) and tap/drop on a dot. Each placed pin is split at `ob`: shaft drawn first, then hair_front redrawn only inside the anchor's cover zone and only on the head side of the ornament base, then the ornament on top. Result: the shaft vanishes INTO the hair, the ornament sits on top. Sliders: rotate, size, lift (sink/raise), cover radius; remove one / all; "Đè lên tóc" toggle shows the old on-top look for comparison; head close-up / full body; copies a JSON layout. Layout: side by side on iPad 1180x820 (screenshot checked), stacked at ≤860 px (Fold 755x1000 screenshot checked on the local file; the published page was not opened in the real viewer).

## Still off / to decide
- Front view only: no true "back of the head" anchors; behind-ear anchors are the nearest. A back-view figure would be needed for real back pins.
- Dangles (tassels) are part of the rigid sprite, so at large tilt they swing sideways instead of hanging down.
- Anchors sit on the hair silhouette edge; pins inside the hair area (e.g. through the loop hole) are not covered by the cover zone model.
- Hair mask excludes the face rectangle below the hairline, so a few fringe strands at the temples are not in hair_front (invisible unless a pin lies there).
- Sprite scale 0.7 default is a guess; owner can set cỡ per pin and copy the layout JSON.

Source (no images): this folder (build.py, pins.py, page.src.html, anchors.json, pins_meta.json).

~25% xong / ~0% chơi được (sample only, nothing live).

## V2 (owner 02:10Z via Foreman C ROOT-12: "cho trâm cắm sát tóc, có cây chỉ được cắm nửa cây")
Cause: pins 1, 5, 7 had `ob` at the END of the dangles, so the whole dangle length (255-390 sprite px) counted as ornament and stayed in the air above the hair. Fixes (code only, 0 credits):
- New per-pin `hb` (cap base): 1=150, 5=170, 7=150, others = ob. Pivot and shaft start at `hb`; dangles (hb..ob) are drawn separately and always hang straight down (gravity), the thin centre rod is masked out (pins 5, 7).
- Lift 0 = ornament base FLUSH 4 px inside the hair edge; slider now -150..260 (negative sinks the cap into the hair). Default lift 0 for all 9 anchors.
- Shaft enters INSET 16 px inside the hair mass; hair_front cover zone is centred on the shaft line and its radius follows shaft length (max(R, len/2+70)).
- Checked: all 8 pins on 4 anchors (top, 2 upper sides, mid side) at 1180x820, screenshot on CDN img/_review/hairpin-tryon/flush_8pins.webp. Pearl/tassel strings of 1, 5, 7 can overlap the forehead at the side anchors (they hang straight down); owner can lower cỡ or move the pin.

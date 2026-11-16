# map-frame-art — SAMPLE READY, round 2 (restrained frames)
Round 1 (carved lacquer / silk+dragons / cloisonné) REJECTED by the owner 16/11: "xấu quá, sến" (too thick, saturated, busy). Round-1 samples replaced by these files.
New brief (Foreman C): thin band (~half), muted colours that sit with the map parchment + kit cream/red-brown UI, no figurative ornament.
Base origin/main. Nothing on main, no PR, no CDN upload yet.

## 3 new styles (Magnific gpt-2-6, folder ba4aecfe…, flat #00FF00 centre keyed to transparent, despilled, every image looked at)
- (a) thin dark rosewood rim, hairline gold inlay line inside, tiny plain gold L corner brackets
- (b) narrow museum-mount silk band, soft ink-grey/ivory with woven texture, hairline gold inner edge, plain corners
- (c) aged tea-stained paper edge, faint ink line, faint pale-brown window-lattice corner
Per style 2 paintings (2:1 for iPad 1180x820, 1:1 for Fold 755x1000), resized to ~device size @2 so almost no edge stretch.

## Mock method (real CSS, live Dư đồ)
Built game from origin/main, screenshots 1180x820@2 and 755x1000@2 (Playwright, CDN map art loaded). `.kleather` leather/rolls/stitch hidden, clip-path off, painting padded under the frame; frame = `.kleather::before{border:Bpx solid transparent;border-image:url(frame) S/stretch;border-image-width:S/2px}`. Spec in frames-spec.json: px size, slice S (final px), band B (@2 px).

| file | px | slice S | band @2 (css) | KB |
|---|---|---|---|---|
| mapframe-a-ipad | 2324x1162 | 79 | 33 (16.5) | 37 |
| mapframe-b-ipad | 2324x1162 | 73 | 33 (16.5) | 56 |
| mapframe-c-ipad | 2324x1162 | 79 | 35 (17.5) | 56 |
| mapframe-a-fold | 1500x1500 | 81 | 33 (16.5) | 45 |
| mapframe-b-fold | 1500x1500 | 110 | 47 (23.5) | 120 |
| mapframe-c-fold | 1500x1500 | 88 | 40 (20) | 72 |

Band is ~1/3 of round 1 (50/64 css) and the map gets that room back. Files are tiny (37-120 KB), well under the budget.

## Self-check vs owner art rules
Painted, never code-drawn: yes (CSS only places the painting). Sharp at @2: yes (about 1:1 pixels). Small files: yes. Static, no perf cost. Hairline gold edge held crisp in the mock; no green fringe seen.
Honest notes for the owner: (a) reads very dark maroon-brown on the cream UI; (c) paper is a warmer yellow than the map parchment; (b) is the quietest. A tint pass is possible on the chosen one.
Files: sample-{a,b,c}-{ipad,fold}.jpg + sheet-map-frames.jpg in `map-frame-art/`.

## Next (after owner choice)
Upload the chosen style's 2 webp to the CDN img/kit/mapframe-<style>-<ipad|fold>.webp, kit-keeper spec, KIT READY-for-keeper.

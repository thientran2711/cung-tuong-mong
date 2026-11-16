# map-frame-art — SAMPLE READY (Magnific gpt-2-6, painted, 3 styles)
START_CTX ~8%. Owner 16/11 18:45Z: the CSS kitLeather frame of the Dư đồ is ugly; paint a new one with Magnific.
Base: origin/main. Nothing pushed to main; no PR.

## What was painted
All frames painted with gpt-2-6 (folder ba4aecfe…), flat #00FF00 centre keyed to transparent (despilled edge), every image looked at.
Per style two aspect-fitted paintings (same style reference): 2:1 for iPad landscape, 1:1 for Fold portrait (a 3:2 first pass was rejected: edges would stretch ~1.8x).
- (a) carved red lacquered rosewood, key-fret + cloud relief, gold phoenix/peony corner pieces
- (b) imperial-blue silk brocade mount, gold-thread piping, gold dragons, jade roller end caps
- (c) bronze + cloisonné enamel, lotus scroll, quatrefoil medallion corners

## 9-slice (real CSS border-image on the live game, not a paste-up)
Mocks are screenshots of the real Dư đồ (built from origin/main dev/build, CDN map art) at 1180x820@2 and 755x1000@2 with the frame laid over `.kleather` (kl-roll / kl-tone / stitch hidden, clip-path off, painting padded under the frame). Frame = `.kleather::before` with `border-image-source:url(frame) ; border-image-slice:S ; border-image-width:S/2 px ; border-image-repeat:stretch`; each file is rendered at 1:1 @2 so corners are native-sharp, edges stretch <=1.2x.
Specs: `frames-spec.json` (px size, slice S, band thickness in @2 px). Band: iPad 100 px (=50 css), Fold 128 px (=64 css). Webp 200-310 KB each (>~250 KB budget for 3 of 6; quality can drop to ~80 for the chosen one).

| file | px | slice S | KB |
|---|---|---|---|
| mapframe-a-ipad | 2381x1191 | 250 | 203 |
| mapframe-b-ipad | 2381x1191 | 128 | 246 |
| mapframe-c-ipad | 2048x1024 | 160 | 273 |
| mapframe-a-fold | 1489x1489 | 320 | 223 |
| mapframe-b-fold | 1498x1498 | 139 | 310 |
| mapframe-c-fold | 1304x1304 | 280 | 296 |

## Self-check vs owner art rules
Painted never code-drawn: yes (CSS only places the painting). Sharp at @2: yes (native size, see sample jpgs). Small files: ok, see table. Effects/perf: static image, no animation. Transparent centre keyed with despill, edges checked on the real map (no green fringe seen). Known: map labels clipped at the map's right edge are the existing pan behaviour, not the frame.
Files: sample-{a,b,c}-{ipad,fold}.jpg + sheet-map-frames.jpg in `map-frame-art/`.

## Next (after owner choice relayed by Foreman C)
Upload the chosen style's 2 webp to the CDN as img/kit/mapframe-<style>-<ipad|fold>.webp (dev/site/cdn_sync.py), short spec for the kit keeper, report KIT READY-for-keeper.

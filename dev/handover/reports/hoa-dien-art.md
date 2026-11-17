# hoa-dien-art — report (art worker session_011xDdVR5e4J9ieDW6yVDSq1, coordinator Foreman C ROOT-9 session_011xDdVRcPyvGXaGQCff5fCJ)

PRIORITY #1 CHECK: OD tail 17/11 ~17:30Z / ~17:45Z (hoa điền becomes an item, clean foreheads) | main: none (art) | review/*: review/huadian-size(-r1..r3) dev/art/huadian-size (face.py, ref.json REUSED; shrink2/locate/a18_boxes looked at — boxes are stale after the r1–r6 swaps, so not used), review/hoa-dien-r1 (j92 WD_LIST hd_*, jhd.js hdImg/hdAnchor → file names) | claims: ROOT-9 order 17/11 19:42Z only.
START_CTX ~3 % (1M window). Code branch: review/hoa-dien-art (dev/art/hoa-dien-art/). Images never in git.

## STEP 0 answer (sent to ROOT-9)
1. No pixel-identical pre-huadian sources (marks painted at generation; huadian-size overwrote the CDN originals; img/_keep/maid-ty-redraw also marked) → local removal per file.
2. Live candidates (women por, CDN _index): consort t 1024, ty 1024, tm 640, kc 128, tcold 128; maid base 468, t 1664, tm 832, ty 1664, kc 208; player 36; same count fig; hd ~3.4k; tn 840. Marks seen on t, ty, tm, kc and maid base/tm; tcold clean.
3. Anchor: yes — clean3/twin write the mark centre per file (STEP 3 HD_ANCHOR source).

## STEP 1 method (dev/art/hoa-dien-art/det3.py, clean3.py, twin.py)
- det3.detect: forehead zone from the face (ref.json for a18, haar otherwise); 2nd-order Lab skin fit; mark = dE outliers clustered near the forehead centre; brow/hair (dark, low chroma, big or touching the zone edge) never touched; weak clusters (peak < MINPEAK 20) = "nomark", no change.
- det3.remove: Telea inpaint + matched skin grain inside the mask only (hard mask).
- twin.py (fig/hd/tn): template-match the por face into the twin (scale search) and detect in the mapped zone at the twin's own size; if the twin is a different painting (some hd are), its own haar face is used.
- Output LOSSLESS webp → pixel diff outside the mask = 0 (lossy re-encode would change edges outside by up to ~70 levels). Bytes: por ~2.8× (decision asked from ROOT-9).

## Batch 1 (6 por, NOT live, waiting ROOT-9's look)
| file | status | px changed | out_diff | size |
|---|---|---|---|---|
| por-consort-c05-t5-a18 | clean | 338 | 0 | same |
| por-consort-c03-t8-a26 | clean | 481 | 0 | same |
| por-consort-c01-kc-a18 | clean | 375 | 0 | same |
| por-maid-m01-a18 | clean | 337 | 0 | same |
| por-maid-m28-t8-a51 | clean | 246 | 0 | same |
| por-maid-m01-ty3-a18 | clean | 274 | 0 | same |
Singles: https://ctm-img.victoria-tntt.workers.dev/img/_review/hoa-dien-art/b1/{before,after}/<name>.webp . fig/hd twins of these tested: 10/11 clean (1 hd missing on CDN), out_diff 0.

## STEP 2 (8 sprites + 7 icons, NOT live, waiting ROOT-9's look)
Magnific gpt-2-6, folder ba4aecfe; picked (bg-removed) creations: hd-mai 3z5qLf9REY, hd-dao 9ZFu1azNYZ, hoadien-bac 6AqFxueiJO, hd-diep fHG2T2LCDY, hd-lan ovN4A9Y829, hd-sen 5jMToDeKxe, hd-maudon huZ3WG4vqL, hd-phuong SymIuCdUb8 (sources jUBdt57LD0, rgdpInMxtc, tC36GyfmZJ, LwoXhpQswO, 3z5qxbzREY, 1leD8Xwr4r, SymICCBUb8, 5jMTXIvKxe).
Files (names the code requests): img/hd-hd-{mai,dao,diep,lan,sen,maudon,phuong}.webp + img/hd-hoadien-bac.webp (long side 192, 9–16 KB); img/wd-hd-{mai,dao,diep,lan,sen,maudon,phuong}.webp (256², 8–15 KB). Review copies: img/_review/hoa-dien-art/sprites/.

## Pending
- ROOT-9 look on batch 1 + sprites; lossless decision; W2c consort-ty skip list.
- Whole-family detector pass (counts per family) running; then batches by family (por → fig → hd → tn), counts reported per batch.

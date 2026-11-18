# mud-decals report (art worker, 11/18/2026; brief briefs/art-mud-decals.md)
PRIORITY #1 CHECK: OD 18/11 ~01:06Z (vertical grain), ~02:45Z (mud lv1 OK, lv2/3 crude), 17/11 ~00:05Z; reports/look-decals.md method reused; fx-stain-bun-1/-2 looked at first (hem strips, brown (106,47,2)).
Method: Magnific gpt-2-6 (folder ba4aecfe…), painted opaque on plain white, white-matte alpha (alpha = 1 - min(RGB), un-premultiplied), cropped to content, long side 768 px, colour darkened x0.64 (bun-7 x0.72) to match bun-1/-2 earth brown, alpha x1.12. Webp on CDN img/<key>.webp. Nothing in git.
| key | raw creation | size | shape | looked OK |
|---|---|---|---|---|
| fx-stain-bun-3 | gOthd9fSXO | 676x699 | drop cluster, tails pointing down | yes |
| fx-stain-bun-4 | bxVDnSy5Y2 | 768x764 | splash spray fanning up from a dense base at the bottom edge (anchor at hem; bottom edge is flat by design) | yes |
| fx-stain-bun-5 | lJIme6ngv9 | 369x768 | 3 vertical drip runs, darker + bead at bottom, fade at top | yes |
| fx-stain-bun-6 | CqzY3jhEEy | 251x768 | tall narrow wicking stain, wide dark base, ragged feathered top (gpt-2-6 snapped 1:3 to 9:16) | yes |
| fx-stain-bun-7 | YMsgkhCWeC | 768x249 | heavy hem band, very uneven top edge with tongues/peaks (anchor at bottom, bottom edge flat) | yes |
| fx-stain-bun-8 | TdU7jEyVNR | 392x768 | soft vertical knee scuff patch, vertical streaks (alpha max 0.79, softest) | yes |
Looked at every raw and every final on ivory (248,244,230) and red (170,30,40). No text, no person, no grey. All earth brown, translucent; no horizontal bands (bun-7 is a hem band by brief but ragged, not straight).
Notes for code: bun-4 and bun-7 are anchored at their BOTTOM edge (place on the hem line); bun-5/-6 top end fades to nothing, bottom end is the dark part (place with the bottom lowest). Multiply/normal on the cloth mask as for bun-1/-2.
Contact sheets: https://ctm-img.victoria-tntt.workers.dev/img/_review/mud-decals/sheet.png (bun-3,4,5) and sheet-2.png (bun-6,7,8); ivory top row, red bottom row. Delete after verdict: python3 dev/site/cdn_sync.py --wipe-review mud-decals

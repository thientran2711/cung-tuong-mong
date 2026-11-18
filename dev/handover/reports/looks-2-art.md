# looks-2-art — ART worker report (looks-2 overlay set)

PRIORITY #1 CHECK: OD 22:50Z / 22:58Z, OD 01:36Z 18/11 (no redraw of her figure: overlay layers only), MAIN s38 order, looks-2.md §0.5/§5-6, main jlooks.js (face looks = img/fx-{id}-{lv}.png on the veil square via lkFaceImg; clothes/hair have no draw code = body-fit KIT REQUEST open), CDN fx-* 404 before this job, claims none.

Method: each effect painted ALONE (gpt-2-6, plain white/black bg, never her figure) -> cut transparent locally -> placed in the 384 veil square -> previewed on her UNTOUCHED hd figure (fig-hd-consort-c01-t1-a18) in toil-room-c3. Placement: only inside a face-skin core measured on 30 consort portraits (95% of marks on skin on average, 28/30 faces >=85%).

## Status (CDN img/_review/looks-2/; NOTHING at live keys yet — waits for owner verdict via Foreman C)
Face-square finals (transparent 384x384, 3 levels): fx-pox-thuydau-N, fx-pox-daumua-N, fx-pox-scar-N, fx-smu-N, fx-muc-N (+ -m mirror), fx-bui-N, fx-muoi-N, fx-moho-N, fx-lanh-N  → final-candidates/. Looked and OK'd by ROOT-13: pox x3, smu, muc, muoi; redone after feedback: lanh, moho, bui (v4).
Preview only: stain-tra (v3 owner-approved), stain-uot (hair sheen faint), PREVIEW-hair-1..3 (tóc bù xù / flyaways, wind look).

## Final state (18/11 ~01:12Z)
Whole face-square set (fx-pox-thuydau/daumua/scar-1..3 with BOTH cheeks at every level, fx-smu-1..3, fx-muc-1..3 (+ -m; smear moved up off the lip), fx-bui-1..3 (terracotta-beige, measured hue 19-26deg on 4 skin tones), fx-muoi-1..3, fx-moho-1..3, fx-lanh-1..3) LOOKED + OK by Foreman C ROOT-13. Owner order (01:20Z): every effect = 3 singles lv1/2/3 on the same face/crop (v5/v6 files). Hair previews (PREVIEW-hair-1..3, locks rooted in the hair mass) OK as preview only. HOLD: nothing at live keys until the owner's verdict; ROOT-13 sends her set by set.
Skin-hit check (30 consort portraits, after the cheek change): 93-94% of marks on skin, 26-28/30 faces >=85%.

## Update (18/11 ~01:46Z, Foreman C ROOT-14)
Owner rulings applied: pox (thuydau/daumua/scar) scaled down + sparse random scatter, no dense dot fields (she fears them); lv1 = 5 spots, lv2 = 8, lv3 = 13 (v9); muc 1-3 approved. ROOT-14 OK'd: scar v9, smu v5, lanh v5, muoi v6, bui v10 (lv2 rebuilt as soft patch, no stripes), moho v12 (clear specular drops, forehead/hairline only, 3/6/10, no trickle). Magnific whole-figure redraw tried once for moho as comparison only: dropped (breaks no-redraw rule). Hair previews OK as preview. HOLD: no generations, nothing at live keys until owner verdicts; ROOT-14 relays. Latest review files: v9 pox, v5 smu/lanh, v6 muoi, v10 bui, v12 moho, PREVIEW-hair-*; transparent finals in final-candidates/ (30 files).

## Findings
1. Key mismatch: code draws fx-smu/muc/bui/muoi/moho/lanh-N + fx-pox-{thuydau|daumua|scar}-N; the order named fx-smudge/fx-ink. Files follow the CODE keys (ROOT-13: no aliases).
2. veil-fit.json fig rows are off on the live fig + hd fig files (e.g. c01-t1-a18: needs ~-0.42W and a lower box); por rows are right. Face box for previews found by template-matching the por square onto the hd fig. ROOT-13 logged it for main.
3. Generic frontal layout: lash runs/lip positions follow average faces; lip tint dropped (ROOT-13) because lips cannot be clipped per face.
4. CLOTHES (stain-tra, stain-uot) and HAIR (tóc rối, tóc ẩm/bết, trâm lệch) overlays cannot be drawn in game until the body-fit / hair-fit KIT REQUEST (main) exists. Trâm lệch cannot be done as an overlay at all (it moves an existing pin).
5. Magnific content filter rejected the first "pustule" prompt; reworded as raised bumps.

## Remaining
Upload finals to exact keys after the owner's verdict; tóc ẩm/bết, bùn gấu áo, áo xốc xếch, etc. need the body/hair-fit boxes first.

## FINAL TABLE (18/11 ~02:40Z) — approved by the owner via Foreman C ROOT-14; NOT uploaded to live keys (waits for main's veil-fit fig-row fix)
Approved: thủy đậu (lv1 = v9 layout reverted, lv2/lv3 v9), đậu mùa (same), sẹo rỗ v9, mực 1-3 (+ mirrored -m), bụi v10, muội (lv1 v11 cheek, lv2/lv3 v6), mồ hôi v14. DROPPED by the owner (main does them): lem phấn (fx-smu-N), lạnh (fx-lanh-N) — files kept in img/_review/looks-2/dropped-for-main/ in case main wants them. All files are 384x384 RGBA, face-square for the veil fit (code keys of main jlooks.js lkFaceImg: fx-pox-{thuydau|daumua|scar}-N, fx-muc-N, fx-bui-N, fx-muoi-N, fx-moho-N; mực also has -m mirrored variants).
| live key | source file (CDN review) | md5 |
|---|---|---|
| img/fx-bui-1.png | img/_review/looks-2/final-candidates/fx-bui-1.png | b1a191dad47f2e42ce0fea5451ff4e4d |
| img/fx-bui-2.png | img/_review/looks-2/final-candidates/fx-bui-2.png | eda1baa53b5888d94cc0e3eb1591ac77 |
| img/fx-bui-3.png | img/_review/looks-2/final-candidates/fx-bui-3.png | 0d2b8f19a53c410a5d1484c6e9e4e958 |
| img/fx-moho-1.png | img/_review/looks-2/final-candidates/fx-moho-1.png | b3c16bca84579b3516a4c1a93bbf5d2e |
| img/fx-moho-2.png | img/_review/looks-2/final-candidates/fx-moho-2.png | d78eac12b8f9dec56efece729d62c290 |
| img/fx-moho-3.png | img/_review/looks-2/final-candidates/fx-moho-3.png | d905d8dd529d2eb4f75bfa3720803320 |
| img/fx-muc-1-m.png | img/_review/looks-2/final-candidates/fx-muc-1-m.png | 1877d63ccf678410aabcf8d741b6f92b |
| img/fx-muc-1.png | img/_review/looks-2/final-candidates/fx-muc-1.png | 626ce205518b911244e79ff881df3c90 |
| img/fx-muc-2-m.png | img/_review/looks-2/final-candidates/fx-muc-2-m.png | 022836f1cffe3b6dff3b0e8ca46a6f6e |
| img/fx-muc-2.png | img/_review/looks-2/final-candidates/fx-muc-2.png | 8a9b859bf390e520b3186c2f333ce542 |
| img/fx-muc-3-m.png | img/_review/looks-2/final-candidates/fx-muc-3-m.png | 750294d3d8b47591cdb6a17b65a989ec |
| img/fx-muc-3.png | img/_review/looks-2/final-candidates/fx-muc-3.png | 36365374fa5745e037abff28432f3258 |
| img/fx-muoi-1.png | img/_review/looks-2/final-candidates/fx-muoi-1.png | 8408314b9446ce9d733e5ead9907f2bd |
| img/fx-muoi-2.png | img/_review/looks-2/final-candidates/fx-muoi-2.png | 47fde5b028c05a892647cf6e0bf5e8b6 |
| img/fx-muoi-3.png | img/_review/looks-2/final-candidates/fx-muoi-3.png | 2ca38071ef9976639badf2db1aae1806 |
| img/fx-pox-daumua-1.png | img/_review/looks-2/final-candidates/fx-pox-daumua-1.png | 1fe817866fd7034a1eca16da5ee55344 |
| img/fx-pox-daumua-2.png | img/_review/looks-2/final-candidates/fx-pox-daumua-2.png | 7564baf6e1a12a24548042a75a1e870a |
| img/fx-pox-daumua-3.png | img/_review/looks-2/final-candidates/fx-pox-daumua-3.png | 2fdbb5c10b5e6872454cf77e75bccb44 |
| img/fx-pox-scar-1.png | img/_review/looks-2/final-candidates/fx-pox-scar-1.png | dbf4c7a7e019fa5e9dca4344e0da881f |
| img/fx-pox-scar-2.png | img/_review/looks-2/final-candidates/fx-pox-scar-2.png | dba2e12df513ec7dd70cc6518b53943f |
| img/fx-pox-scar-3.png | img/_review/looks-2/final-candidates/fx-pox-scar-3.png | 56c9299853be96ee1b57f0ad0b749ad2 |
| img/fx-pox-thuydau-1.png | img/_review/looks-2/final-candidates/fx-pox-thuydau-1.png | 2c307cd2086c87090e182cacc6dcde86 |
| img/fx-pox-thuydau-2.png | img/_review/looks-2/final-candidates/fx-pox-thuydau-2.png | 7aceb76824e4edc75e654574d133f0bc |
| img/fx-pox-thuydau-3.png | img/_review/looks-2/final-candidates/fx-pox-thuydau-3.png | 94eb415af02fe75a66f9c52317d74cd8 |

Ready upload command (run only after Foreman C says go, from a checkout with the files pulled: `python3 dev/site/cdn_sync.py --pull 'img/_review/looks-2/final-candidates/*'`, then copy each file to img/<name>):
  for f in img/_review/looks-2/final-candidates/*.png; do cp "$f" "img/$(basename $f)"; done; CLOUDFLARE_API_TOKEN=proxy-injected python3 dev/site/cdn_sync.py $(ls img/_review/looks-2/final-candidates | sed 's#^#img/#')
After upload: add each key to LOOKS_ART in jlooks.js (main) and verify the face box (veil-fit fig rows are off on live fig files; por rows OK).
Placement caveat: overlays assume the average face layout; mồ hôi side drops follow the average face outline.

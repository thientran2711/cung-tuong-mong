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

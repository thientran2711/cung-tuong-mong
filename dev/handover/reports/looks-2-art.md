# looks-2-art — ART worker report (looks-2 overlay set)

PRIORITY #1 CHECK: OD 22:50Z / 22:58Z, OD 01:36Z 18/11 (no redraw of her figure: overlay layers only), MAIN s38 order, looks-2.md §0.5/§5-6, main jlooks.js (face looks = img/fx-{id}-{lv}.png on the veil square via lkFaceImg; clothes/hair have no draw code = body-fit KIT REQUEST open), CDN fx-* 404 before this job, claims none.

Method: each effect painted ALONE (gpt-2-6, plain white/black bg, never her figure) -> cut transparent locally -> placed in the 384 veil square -> previewed on her UNTOUCHED hd figure (fig-hd-consort-c01-t1-a18) in toil-room-c3. Placement: only inside a face-skin core measured on 30 consort portraits (95% of marks on skin on average, 28/30 faces >=85%).

## Status (CDN img/_review/looks-2/; NOTHING at live keys yet — waits for owner verdict via Foreman C)
Face-square finals (transparent 384x384, 3 levels): fx-pox-thuydau-N, fx-pox-daumua-N, fx-pox-scar-N, fx-smu-N, fx-muc-N (+ -m mirror), fx-bui-N, fx-muoi-N, fx-moho-N, fx-lanh-N  → final-candidates/. Looked and OK'd by ROOT-13: pox x3, smu, muc, muoi; redone after feedback: lanh, moho, bui (v4).
Preview only: stain-tra (v3 owner-approved), stain-uot (hair sheen faint), PREVIEW-hair-1..3 (tóc bù xù / flyaways, wind look).

## Findings
1. Key mismatch: code draws fx-smu/muc/bui/muoi/moho/lanh-N + fx-pox-{thuydau|daumua|scar}-N; the order named fx-smudge/fx-ink. Files follow the CODE keys (ROOT-13: no aliases).
2. veil-fit.json fig rows are off on the live fig + hd fig files (e.g. c01-t1-a18: needs ~-0.42W and a lower box); por rows are right. Face box for previews found by template-matching the por square onto the hd fig. ROOT-13 logged it for main.
3. Generic frontal layout: lash runs/lip positions follow average faces; lip tint dropped (ROOT-13) because lips cannot be clipped per face.
4. CLOTHES (stain-tra, stain-uot) and HAIR (tóc rối, tóc ẩm/bết, trâm lệch) overlays cannot be drawn in game until the body-fit / hair-fit KIT REQUEST (main) exists. Trâm lệch cannot be done as an overlay at all (it moves an existing pin).
5. Magnific content filter rejected the first "pustule" prompt; reworded as raised bumps.

## Remaining
Upload finals to exact keys after the owner's verdict; tóc ẩm/bết, bùn gấu áo, áo xốc xếch, etc. need the body/hair-fit boxes first.

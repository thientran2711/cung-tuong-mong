# LOOK DECALS — painted by MAIN s38 art worker (owner exception ~00:05Z; was Foreman C) for the looks filters (MAIN s38, 17/11 23:55Z)
Owner rules (read verbatim in dev/OWNER_DECISIONS.md): 23:45Z (Magnific paints small TRANSPARENT decals; CODE places them on ANY figure/outfit as a filter, like the makeup layer; never repaint whole figures), 23:30Z (makeup smudge = code), 23:20Z (creased/sloppy outfit = code), ~00:00Z (review this list for C).
Source of the effect list: BAL.looks.cat (jlooks.js, live) = 15 items + pox — reports/looks-2.md §5–6.
Decal spec (owner ~00:05Z): Magnific gpt-2-6, the mark painted OPAQUE in normal colour, then background removed → webp with a TRANSPARENT BACKGROUND, ~768 px long side, the mark alone (no person, no robe); code sets opacity/blend on the outfit; 2–3 shape variants each; LEVELS (nhẹ/vừa/nặng) are made by code (count, size, opacity), NOT separate paintings. Keys below = CDN img/<key>.webp.

## A. C PAINTS (decals)
| Effect (player word) | Where | Keys | Causes |
|---|---|---|---|
| Vết trà loang | clothes | fx-stain-tra-1..3 | Hắt trà |
| Ướt, nước loang | clothes | fx-stain-uot-1..2 (drip/patch marks; code also darkens the cloth) | mưa, giông, hắt nước, tuyết (gấu áo) |
| Bùn bắn gấu áo/giày | clothes hem | fx-stain-bun-1..2 | bùn sau mưa, bị xô ngã, giông |
| Móc chỉ vạt áo | clothes | fx-stain-moc-1..2 (pulled thread snag) | cành cây quẹt |
| Muội khói | face / clothes | fx-muoi-1..2 (soft soot smudge) | khói bếp, lò than |
| Bụi lấm mặt | face | fx-bui-1 (fine dust speckle) | gió heo may / gió lớn |
| Vệt mực | face | fx-ink-1..2 (black brush smear) | Quạt mực |
| Thủy đậu | face | fx-pox-thuydau-1..2 (red spot clusters) | bệnh |
| Đậu mùa | face | fx-pox-daumua-1..2 (dense raised pustules, not gory) | bệnh |
| Sẹo rỗ (sau đậu mùa) | face | fx-pox-scar-1..2 (pockmark scars) | đậu mùa khỏi |
| Tóc rối, sợi tóc xổ | hair edge | fx-hair-xo-1..3 (loose dark strands, transparent) | gió, bị xô ngã, cành cây |
| Trâm lệch | hair | none (code tilts the existing pin layer) | gió |
| Vương trên tóc/áo | hair / clothes | fx-vuong-hoadao-1, fx-vuong-la-1, fx-vuong-tuyet-1 (single petal / maple leaf / snowflake sprites) | hoa đào bay, lá phong, tuyết |

## B. CODE ONLY (no painting)
| Effect | How |
|---|---|
| Phấn son lem nhem (mưa, khóc, mồ hôi) | streak/blur of the makeup layer (worker smudge-code) |
| Áo nhăn, nhàu, xốc xếch | crease filter on the cloth mask (worker cloth-xoc) |
| Áo ướt sũng (overall) | cloth darken + slight gloss on the cloth mask, plus fx-stain-uot decals |
| Áo ám khói | grey tint on the cloth mask (+ fx-muoi decal) |
| Tóc ẩm / bết | hair darken + gloss on the hair mask |
| Má đỏ, môi tái vì lạnh / má ửng vì nắng | colour on the makeup layer |
| Mắt đỏ khi khóc | colour on the makeup layer |
| Khuynh thành lấp lánh | glow + twinkle filter (worker tuyet-glow) |

## Not needed
Emotion faces (owner dropped 17:40Z). Whole-figure repaints with any effect (owner 23:45Z).

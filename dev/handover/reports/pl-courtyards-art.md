# pl-courtyards-art (art worker for Foreman C, OD:L1415)
START_CTX ~8%.

## SAMPLE READY
Courtyard: nhat-cac. Sheet: dev/handover/reports/pl-courtyards-art/sample.jpg = [existing nhat-cac-xuan-sang | NEW thanhminh-sang | NEW tang-sang].
Method: gpt-2-6 edit of the existing PL picture (reference = nhat-cac-xuan-sang from CDN); buildings/trees/rocks/cranes/camera unchanged, only dressing changes.
Self-check: same viewpoint and buildings; thanhminh = pale drizzle light, willow sprigs on eaves, offering table at steps, chrysanthemum pots; tang = white drapes/lanterns on eaves, pillars, gate, grey light, bare blossom tree. No glossy floor, no faces. Output 1344x752 (existing 1792x1013) -> batch will resize to 1792 + webp <=250 KB.
Waiting for owner verdict via Foreman C. Batch = 299 rows, 6 dirs.

## SAMPLE v2 (after owner rejection: too dark, no weather, no grey, tang = decorations only)
Sheet = [existing nhat-cac-xuan-sang | NEW thanhminh-sang | NEW tang-sang]. Prompt now forbids rain/mist/overcast/darkening and changes decorations only.
Mean RGB (448x252): existing 155,136,119; thanhminh 161,138,119; tang 166,149,131 (white cloth adds brightness). Same sky, light, paving, blossom in bloom.
Thanh minh: willow garland on the lower eaves/doors + offering table with fruit and incense at the steps. Tang: white drapes on eaves and doors, white lanterns, white banner on the gate, red door panels covered.

# FLORA1 — F2 hair-flower table re-tiered by petal count (proposal only)
FLORA1 · depth 6 (limit 8) · START_CTX ≈ 4 % of 1M (get_session used_tokens read 0; own estimate) · worker of C #6 · 0 credits, 0 gens · nothing applied to builder / ART_RULES.

## TÓM TẮT CHO CHỦ (tiếng Việt)
Chị nói đúng: bảng F2 hiện tại KHÔNG xếp theo số cánh. Ví dụ t3 cẩm tú cầu (~240 cánh nhỏ) và trà kép (~60) nhiều cánh hơn t4 lan (6), ly (6), ngọc lan (~12), và t6 quỳnh (~25), phù dung đơn (5). Bảng mới: số cánh TĂNG DẦN NGHIÊM NGẶT, mọi hoa bậc trên đều nhiều cánh hơn mọi hoa bậc dưới.

| Bậc | Số cánh | 5 hoa (số cánh) |
|---|---|---|
| t1 Đáp ứng | 4–5, đơn | quế (4) · tử đinh hương (4) · lê (5) · đào đơn (5) · mai đỏ (5) |
| t2 Thường tại | 6–9, đơn | lan (6) · ly hổ (6) · thủy tiên (6+chén) · mộc lan tím (~9) · lựu (6) |
| t3 Quý nhân | 10–16, bán kép | ngọc lan (~12) · hồng nguyệt quý (~16) · đỗ quyên kép (~10) · mộc cận kép (~15) · lạp mai (~15) |
| t4 Tần | 20–30, kép | quỳnh (~25) · sen hồng (~22) · bích đào (~28) · đệ đường kép (~25) · huyên thảo kép (~20) |
| t5 Phi | 45–90, kép đầy | trà kép trắng (~65) · thục quỳ kép (~50) · hồng trà vàng (~45) · phù dung kép (~45) · thúy cúc (~80) |
| t6 Quý phi | 150–vài trăm | mẫu đơn (~200) · cúc đại đóa (~300) · sen ngàn cánh (vài trăm) · cẩm tú cầu (~240) · thược dược cầu (~150) |

Mỗi bậc 5 màu khác nhau (vd t6: đỏ thẫm · vàng · trắng · xanh tím · hồng). 6 prompt bảng hoa mới: `dev/art/flower_sheets/hoa_bac_t1_v2.txt … t6_v2.txt` (bản cũ giữ nguyên). Chưa áp vào builder — chờ chị duyệt. Lưu ý: t7/t8 thêu hoa = loài t6 của người đó (Lượt 1342) → nếu duyệt, hoa thêu t7/t8 cũng đổi theo.

## 1. Current F2 table (30 flowers) — as painted
Counts = petals (or tepals; for clusters, petals in one worn cluster). "Visual density" is what the eye reads in a hair flower.

| t | # | Current flower (variety used) | Petals | Layering | Size | Colour | In correct tier? |
|---|---|---|---|---|---|---|---|
| 1 | 1 | jasmine (J. sambac, single) | 5–9 lobes | single | 2–3 cm sprig | white | ~ (t1–t2) |
| 1 | 2 | peach blossom, single | 5 | single | 3–4 cm | pink | yes |
| 1 | 3 | osmanthus cluster | 4 per floret | single, clustered | tiny florets | gold | yes |
| 1 | 4 | pear blossom | 5 | single | 3 cm | white | yes |
| 1 | 5 | climbing rose (R. multiflora) | 5 (single) / ~20 if double | single | 2–3 cm | pink | yes if single |
| 2 | 1 | apricot blossom | 5 | single | 3 cm | pale pink | same as t1 → not fuller |
| 2 | 2 | gardenia (double, the usual one) | ~25–35 | double | 7–8 cm | white | too full → t4 |
| 2 | 3 | red plum blossom | 5 | single | 2–3 cm | red | same as t1 |
| 2 | 4 | begonia / crabapple "hải đường" | 5–10 | single/semi | 3–4 cm | pink | ~ |
| 2 | 5 | lilac | 4 per floret | single, spray | tiny | lavender | fewer than t1 |
| 3 | 1 | crabapple blossom (Xifu) | 5–10 | single/semi | 3–4 cm | pink | too few |
| 3 | 2 | camellia (painted double) | ~40–70 | double | 8–10 cm | red/pink | too full → t5 |
| 3 | 3 | magnolia bud | 9 (closed) | bud | 8 cm | white/pink | too few |
| 3 | 4 | hydrangea | ~60 florets ×4 ≈ 240 | dense dome | 10–15 cm | blue/pink | MUCH too full → t6 |
| 3 | 5 | azalea | 5 lobes | single | 5 cm | magenta | too few |
| 4 | 1 | orchid (cymbidium) | 6 | single | 6–8 cm | pale green | too few → t2 |
| 4 | 2 | michelia | ~10–12 narrow | single | 5 cm | ivory | → t3 |
| 4 | 3 | pink lotus (single) | ~18–24 | single, many rows | 15 cm | pink | ok t4 |
| 4 | 4 | lily | 6 | single | 15 cm | white/pink | too few → t2 |
| 4 | 5 | red camellia (single) | 5–8 | single | 8 cm | red | too few |
| 5 | 1 | herbaceous peony (double) | ~60–150 | double/bomb | 12–15 cm | pink | ok t5/t6 |
| 5 | 2 | full-bloom lotus | ~20–25 | single | 15–20 cm | pink | too few → t4 |
| 5 | 3 | China rose ("Old Blush") | ~15–20 | semi-double | 6–8 cm | pink | too few → t3 |
| 5 | 4 | narcissus (Chinese sacred) | 6 + cup | single | 3–4 cm | white/gold | far too few → t2 |
| 5 | 5 | double camellia | ~40–70 | double | 8–10 cm | pink/red | ok t5 |
| 6 | 1 | tree peony | ~100–300 | very full | 15–25 cm | rose/red | ok t6 |
| 6 | 2 | cotton-rose hibiscus (painted single) | 5 (single) / ~40 double | single | 10–12 cm | pink→red | too few (single) |
| 6 | 3 | epiphyllum | ~20–30 | semi-double star | 12–15 cm | white | too few → t4 |
| 6 | 4 | large chrysanthemum (incurved) | ~200–300 | very full | 12–20 cm | gold | ok t6 |
| 6 | 5 | double magnolia | ~12–18 | semi-double | 12 cm | white/pink | too few → t3 |

Count of mis-tiered flowers: 18 of 30.

## 2. NEW F2 table (strict: every t(k+1) flower > every t(k) flower)
Ranges: t1 4–5 · t2 6–9 · t3 10–16 · t4 20–30 · t5 45–90 · t6 150+. Each rank: 5 colours, 5 shapes. Index n → FLOWERS[t][(n-1)%5] unchanged.

| t | # | Prompt words (English) | Petals | Layering | Colour | Shape | VN label |
|---|---|---|---|---|---|---|---|
| 1 | 1 | golden osmanthus cluster, tiny 4-petal florets packed into one round palm-size cluster | 4 | single | gold | round cluster | Hoa quế |
| 1 | 2 | lilac spray, tiny 4-petal lavender florets in one cone-shaped palm-size spray | 4 | single | lavender | cone spray | Hoa tử đinh hương |
| 1 | 3 | white pear blossom, single, exactly 5 rounded white petals with dark red-tipped stamens | 5 | single | white | flat 5-star | Hoa lê |
| 1 | 4 | single pink peach blossom, exactly 5 cupped pink petals in one row | 5 | single | pink | cup | Hoa đào đơn |
| 1 | 5 | single crimson plum blossom, exactly 5 round crimson petals in one row, golden stamens | 5 | single | crimson | round saucer | Hoa mai đỏ |
| 2 | 1 | pale green cymbidium orchid, 3 sepals + 3 petals (6 parts) and a spotted lip | 6 | single | pale green | orchid | Hoa lan |
| 2 | 2 | orange tiger lily, 6 recurved orange tepals with dark spots | 6 | single | orange | recurved star | Hoa ly hổ |
| 2 | 3 | Chinese sacred narcissus, 6 white petals around a small golden cup | 6+cup | single | white+gold | star + cup | Hoa thủy tiên |
| 2 | 4 | purple lily magnolia, about 9 long purple-pink tepals in a tall closed cup | ~9 | single | purple | tall tulip-cup | Hoa mộc lan tím |
| 2 | 5 | single scarlet pomegranate flower, 6 crinkled scarlet petals on a waxy red calyx | 6 | single | scarlet | crinkled bell | Hoa lựu |
| 3 | 1 | ivory michelia (white champak), about 12 long narrow ivory tepals in two loose rows | ~12 | semi-double | ivory | narrow-petal star | Hoa ngọc lan |
| 3 | 2 | semi-double pink China rose 'Old Blush', about 16 soft pink petals in two rows, open centre | ~16 | semi-double | soft pink | open rose | Hoa hồng nguyệt quý |
| 3 | 3 | hose-in-hose double azalea, magenta-red, two funnels one inside the other, about 10 petals | ~10 | semi-double | magenta-red | double funnel | Hoa đỗ quyên kép |
| 3 | 4 | semi-double lavender rose of Sharon, about 15 lavender petals in two rows, dark red eye | ~15 | semi-double | lavender | ruffled saucer | Hoa mộc cận kép |
| 3 | 5 | wintersweet sprig, waxy pale yellow blooms of about 15 translucent tepals each, several on one twig | ~15 | semi-double | pale yellow | waxy cups on twig | Hoa lạp mai |
| 4 | 1 | white epiphyllum (queen of the night), about 25 long narrow white petals in three rings, star shaped | ~25 | double | white | big star | Hoa quỳnh |
| 4 | 2 | single pale pink lotus, about 22 large spoon-shaped petals around a green seed head | ~22 | double rows | pale pink | bowl | Hoa sen hồng |
| 4 | 3 | double deep rose-red peach blossom 'Bi Tao', about 28 petals in tight layers | ~28 | double | rose-red | rosette | Hoa bích đào |
| 4 | 4 | double golden kerria, about 25 golden petals in a round pompon, a few blooms together | ~25 | double | golden | small pompons | Hoa đệ đường kép |
| 4 | 5 | double orange daylily 'Kwanso', about 20 ruffled orange petals in three layers | ~20 | double | orange | ruffled trumpet | Hoa huyên thảo kép |
| 5 | 1 | formal double white camellia, about 65 petals in perfect spiral rows like a geometric rosette | ~65 | full double | white | geometric rosette | Hoa trà kép trắng |
| 5 | 2 | double scarlet hollyhock, about 50 tightly ruffled scarlet petals in a round pompon | ~50 | full double | scarlet | ruffled pompon | Hoa thục quỳ kép |
| 5 | 3 | pale yellow tea-scented China rose, about 45 petals, high pointed centre, quartered rows | ~45 | full double | pale yellow | high-centred rose | Hoa hồng trà vàng |
| 5 | 4 | double blush-pink cotton-rose hibiscus, about 45 large loosely ruffled petals | ~45 | full double | blush pink | loose ruffle | Hoa phù dung kép |
| 5 | 5 | peony-flowered violet Chinese aster, about 80 long incurved violet petals in a dome | ~80 | full double | violet | incurved dome | Hoa thúy cúc |
| 6 | 1 | crimson tree peony, rose form, about 200 silky crimson petals in many layers, bigger than a palm | ~200 | very full | crimson | huge rose-form | Hoa mẫu đơn |
| 6 | 2 | golden incurved chrysanthemum, about 300 petals curling inward into a perfect ball | ~300 | very full | gold | ball | Hoa cúc đại đóa |
| 6 | 3 | white thousand-petal lotus, several hundred white petals in dense layers, no seed head visible | 300+ | very full | white | layered bowl | Hoa sen ngàn cánh |
| 6 | 4 | blue-violet mophead hydrangea, a full dome of about 60 florets (about 240 small petals) | ~240 | very full | blue-violet | dome cluster | Hoa cẩm tú cầu |
| 6 | 5 | rose-pink bomb-form herbaceous peony, about 150 petals, a high dome of narrow petals on a ring of broad guard petals | ~150 | very full | rose-pink | bomb dome | Hoa thược dược cầu |

Setting check: all are Chinese garden flowers of Song–Qing (Chinese aster = Qing gardens; hydrangea 绣球 / 八仙花 Song; thousand-petal lotus 千瓣莲 Ming; "Bi Tao" 碧桃 double peach; kerria 棣棠; daylily 萱草; hollyhock 蜀葵). No dahlia / modern imports.

Moves vs current: kept same tier — peach, osmanthus, pear, plum(t2→t1), lotus t4, tree peony t6, chrysanthemum t6; moved — orchid/lily/narcissus → t2; michelia/China rose/azalea → t3; epiphyllum → t4; camellia (formal double) t5; hydrangea t3 → t6; herbaceous peony t5 → t6 (bomb form); hibiscus t6 → t5 (now double). Dropped: jasmine, climbing rose, apricot, gardenia, begonia, crabapple, magnolia bud/double magnolia (replaced by purple lily magnolia), single red camellia.

## 3. Prompts
`dev/art/flower_sheets/hoa_bac_t1_v2.txt … hoa_bac_t6_v2.txt` — same layout as v1 (line 1 style, title, 5-flower line, list, label/no-people line); changed only: "Feeling of this rank" line (+ petal range + "Paint the petal count exactly as written") and the 5 flower lines (variety + petal count). v1 files untouched.

## 4. Open points for the owner / C #6
1. SZ rule says even t1 flowers are "LARGE palm-size, never tiny florets": osmanthus and lilac are tiny-floret flowers, so they are written as one palm-size cluster/spray (already the case in v1). Alternative 4–5-petal large blooms if she prefers: single yellow rose (Rosa xanthina, 5).
2. Hydrangea and wintersweet/kerria are cluster/multi-bloom flowers; count = petals in what is worn.
3. If approved: FLOWERS lists live in `dev/art/owner-copy/mk_ranks_v3.py:4`, `dev/art/owner-copy/pr-night-1119/mk.py:11`, `dev/art/face-common/make_new_s62_65.py`, plus rule F2 text (ART_RULES line 119) — foreman's job. t7/t8 embroidery (= person's t6 species, Lượt 1342) changes with t6.
4. Already-approved pictures painted with old flowers would differ — no redraw without the owner's yes (A20/A21).

## Handover
Done; nothing pending. No gens, no credits.

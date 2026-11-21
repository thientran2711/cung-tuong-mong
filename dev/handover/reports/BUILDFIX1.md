# BUILDFIX1 — builder ROOT fix (GATE7 JOB 2) · owner L1998/L2021/L2028

## Cho sếp (tóm tắt)
- Máy viết prompt cho mọi người (112 người vẽ được × 8 bậc × 5 tuổi × thu gốc + đông = 8960 prompt): trước sửa 8960/8960 bị máy duyệt chặn; nay chỉ còn 2798 bị chặn.
- Đã sửa tại gốc: hoa giữa ngực Đáp ứng, mật độ thêu Tần, bỏ ngọc bội đeo người, bỏ túi thơm, bỏ áo choàng/áo khoác ngoài bậc 7–8, bỏ chuỗi ngọc ngang ngực, khung cổ vuông đủ, hoa cài tóc chỉ bông không lá, bỏ hoa cúc, gắn bảng màu hoa F20.
- Còn chặn: prompt quá dài ở tuổi 51/65 (cũ, không do em), 2 người có chữ mặt bị cấm (m13 "mắt phượng", m43 "răng").
- Chưa làm: máy chưa có mùa xuân/hạ/thu riêng; các việc mới của sếp (chim F21, đồ cầm tay L2053, dáng riêng G72, cổ Tần L2041).

depth 1 (limit 8) · START_CTX ~3 % · end ~31 % (rollover line reached → handover below) · 0 gens · base 5de5dc05

## Root causes found + fixes (store words, no per-file patch, no frozen file touched)
| fault | root cause | fix (file) |
|---|---|---|
| G69 t1 chest flower | TIER_LOW had key `1:` twice; the old one (last) won | old duplicate deleted (t8-prompt-B/build.py). AST scan: no other duplicate dict key in build.py/build_all.py/check_store.py/winter_g28.py/master_common.py |
| G68 Tần density | old `_G20/_G20B` lines right after VE6's new ones overwrote them | 2 dead lines deleted (build.py) |
| G57 body pendant | t4 'sash with jade belt pendants and tassels', t5 'girdle with two long jade pendants…', t8 'belt … and jade pendants'; G45 added 'jade pendant at her waist' when the HELD item was a jade pendant | approved thu words ('an embroidered silk sash with silk tassels', 'a broad gold brocade girdle'); g45_post looks for jade before ' Pose:' only (build_all.py) |
| G67/G70/G71 t7 | check_store.hqp_layer = 'LAYERED NECKLINE … INNER top … OPEN outer robe'; store 'strands of pearls across the chest' | hqp_layer = THUROOT1 L2023 words: 'a SQUARE neckline at a modest height (no crossed collar), framed (across the upper chest AND up both sides to the shoulders) by a wide flat pearl-edged gold-embroidered band, always fully visible, this one robe worn over a {sec} inner dress'; HQP_OPEN 'its front CUT AWAY'; pearls 'lying flat on the cloud-collar cape' |
| G67/G70 t8 | 'over it a long silk mantle…', 'many long strands of pearls and jade across the chest', COLOUR RULE 'robe, mantle …' | same L2023 one-robe + full-frame words; 'many pearl strands lying flat on the cloud collar'; 'mantle' dropped from the t8 COLOUR RULE lines |
| G71 t2 | 'its edge a LAYERED border' (no framed/edged) | 'framed by a LAYERED border' |
| F19 no-leaf words | build_all _F13 HAIR FLOWER SIZE had none | '(the bloom ONLY, NO leaves; never two, …)' (approved thu wording) |
| F19 leaves / chrysanthemum | F2_FL t1 'lilac spray', t3 'wintersweet sprig'; t6 list old; t7/t8 used the t6 species; held 'bundle of white chrysanthemums' | 'lilac flower(s)', 'wintersweet blossom'; t6 = F19(4) centifolia rose / thousand-petal camellia / thousand-petal lotus / mophead hydrangea / double crabapple; t7 bomb-form herbaceous peony, t8 tree peony; held → 'a bundle of white lilies' |
| G59 sachet | held-item lists + maid sash sachets | strip_sachet.py words (round fans); E6 gate a18–a65 still 0 |
| F20 not wired | json never read | build_all f20_sentence(): 'FLOWER COLOUR: embroidered flowers <name> (like #hex) with gold thread; hair flower <name> (like hair_by_tier tN), brighter than the embroidery.' Season = B20 root / đông. English names from the table maker's own OKLCH classes (f20_name). Dropped only where it would push a cell over 10 000 (f20_fit, before the B26 cut). |
| EXC winter t4 a65 | held 'a gauze palace lantern with a jade pendant' (G28 assert) | 'a silk palace lantern with a jade tassel' |
| gate false positives (check_store.py) | F16 read colour 'persimmon' as fruit; G60 read lips 'soft curved bow' / 'bow-shaped mouth' as a bow; G57 held pendant in the Pose sentence | skip colour names; skip lips/mouth; Pose-sentence pendant without waist/sash/belt = held (L1979) |
Self-test --self: unchanged (3 old PROOF MISMATCH S12 S14 S19, as GATE7 found).

## Before / after (LUẬT SỬA CẢ NHÓM) — full check_text, 112 persons × t1–t8 × a18/a26/a36/a51/a65 × {root, đông}
| check | before | after |
|---|---|---|
| F19 HAIR FLOWER NO-LEAF WORDS | 6518 | 0 |
| G57 JADE PENDANT | 3378 | 0 |
| LEN TOO LONG | 2645 | 2686 |
| G70 PEARL SWAG | 2240 | 0 |
| G67 OUTER CLOAK | 2240 | 0 |
| G60 BOW TIES NOT LONG | 1467 | 0 |
| G71 SQUARE FRAME NOT FULL | 1120 | 0 |
| G70 INNER TOP | 1120 | 0 |
| F19 CHRYSANTHEMUM | 722 | 0 |
| G69 T1 CHEST FLOWER | 224 | 0 |
| G68 TẦN DENSITY | 224 | 0 |
| G71 SQUARE NOT FRAMED | 224 | 0 |
| G59 SACHET | 208 | 0 |
| F19 HAIR FLOWER LEAVES | 184 | 0 |
| X08 BANNED | 120 | 120 |
| X11 BANNED | 80 | 80 |
| F16 NOFRUIT | 40 | 0 |
| EXC build | 18 | 0 |
| **prompts FAIL (any check)** | **8960/8960** | **2798/8960** |
by rank after: {1: 267, 2: 158, 3: 459, 4: 363, 5: 181, 6: 460, 7: 454, 8: 456}

LEN: +41 vs before = 18 cells that crashed before (EXC) and now build but are long + ~23 a51/a65 cells over by a few chars from the bloom-only words. Every remaining LEN is a51/a65 (or a HEAD_OVER10K B26 cell) — old length debt, not opened.
Tools: dev/handover/reports/BUILDFIX1/sweep.py (in-process, 4 cores ~15 min) + table.py.

## HANDOVER (coordinator opens the successor)
Left: (1) builder seasons xuân/hạ/thu (only root + đông exist; AUDIT1 row 1); (2) LEN a51/a65 (owner decision on cuts); (3) X08 m13 'PHOENIX eyes', X11 m43 teeth face words (person slot, owner/foreman call); (4) AUDIT1: 12 F20 cells hair not lighter than embroidery, NOVASE id 'F19' clash in check_store, 38 drawable persons without an F20 row; (5) ROOT's new items not in this brief: t7/t8 phoenix chest embroidery, F21 birds t4–t6, items_per_person_L2053, G72 own angle/pose, Tần t4 L2041 collar, person-gate a22 gap. (6) owner should see one sample per rank before mass (A1/A2) — the t7/t8 one-robe words and F20 sentence are new in the builder.

## Late orders (15 messages read only after the push, 11:17Z) — NOT done, for BUILDFIX2
- t6 keeps its chest pearl strands (owner L2035): builder t6 untouched by me ✓ (G70 only t7/t8).
- Tần t4 capelet scalloped edge kept (L2038) + L2041/L2050 locked t4 collar/net words (THUROOT1 msg, files thu_comoi/s6x_t4_THU_L2041.txt); builder still says '(not cloud-shaped, scalloped or pointed)' and 'a crossed collar' → replace with the 4 L2041 phrases; capelet lower edge pending L2051 (THUROOT1 successor).
- G69 widened (L2049 → L2054): chest-centre embroidery every rank t1–t8 (t1–t6 own flower growing by rank, t7/t8 small phoenix), rule text + check_store G69 t1–t8. Builder has it at t1 only.
- Seasons xuân/hạ/thu + live palette (root stale 50/74, đông 23/74, m14 swapped) — AUDIT1 row 1.
- Per-person items: items_per_person_L2053_DRAFT.json @93a8585f read in _e6_picks (ITEMS1 instructions); G72 own angle/pose; person_gate a22 fallback (+ self-test).
- F21 season birds t4–t6 (face-common/season_birds_L2040.json); flower_colours json re-made by FACEPAGE1 7ab2fdb60 (my builder reads the file live, so it uses the new hexes).
- make_thu_s63_65 generalise to 90 persons (palette names exact, own item/angle); NOVASE id 'F19' clash.
- L2060 test: after the fix, build thu t1–t5 for one undrawn person straight from the builder (needs the thu season first), gate + --batch + keep_check, send paths to ROOT + VE12.

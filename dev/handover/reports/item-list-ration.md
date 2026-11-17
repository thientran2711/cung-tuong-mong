# ITEM LIST FOR ART — monthly ration (phần lệ), cosmetics, tribute bestowals

PRIORITY #1 CHECK: OD 24 (L1577 owner 08:25Z; L1327 expert-first; L1402 freeze) | main: dev/ITEMS.md (33 items + `tp`), ITEMS_EARNED.md, jtoil.js/jmkt.js (makeup levels, `BAL.toil.box`), jveil.js (veil items `mc<P><g>`) | review/*: none for ration items (review/makeup-theme-r1 = names only) | claims: none.
Author: ration research expert (sonnet), session for Foreman B. RESEARCH ONLY: nothing here is built; Foreman C paints from it. Companion report: `monthly-ration-history.md`.
Sources of the real-world names: see the history report §Sources. Facts marked (hist) are real; (fic) are from the dramas / novels; everything else is game design.

## 0. How to read this list

**Ladder.** The game already has ONE grade ladder (OD:L47/L303): Thường · Tinh phẩm · Trân phẩm · Tuyệt phẩm · Ngự tứ (frame colours from kitItem). The owner's words "phẩm thường / tinh xảo / thượng phẩm / cống phẩm" are mapped onto it so no new palette exists:

| Tier | Ladder grade (frame colour) | Owner's word | Meaning for art |
|---|---|---|---|
| T1 | Thường | phẩm thường | plain, humble materials, a little worn, simple cloth/paper wrapper |
| T2 | Tinh phẩm | tinh xảo | careful craft, clean shapes, one fine detail (lacquer, silver inlay) |
| T3 | Trân phẩm | thượng phẩm | rich materials, gilding, fine carving, silk-lined case |
| T4 | Tuyệt phẩm | cống phẩm | tribute quality: rare material, imperial workshop finish, tied with a yellow silk cord |
| (T4 + seal) | Ngự tứ | — | NO new painting: the T4 art plus a small yellow-silk wrap/seal-ribbon overlay made by the kit (cost: 1 overlay, not N paintings). Only the Emperor bestows it; cannot be sold/given |

Each tier of each item has its OWN Vietnamese name (below). Some items have only T1–T3 or only T3–T4 (marked). A tier name never repeats across items.

**Art rules for the painter (Foreman C).** Style = the game's item painting (match existing `img/item-*.webp` such as the incense/pets lines; the STYLE_ANCHOR portrait prompt is for figures, not objects). One object (or one tight set) per picture, centred, transparent background, no text, no Chinese characters, no hands, no tray/stand unless the description says so (OD:L303/L304/L686). Draw/keep ≥1024 px sources because the receive/lose screen shows the item big and alone (OD:L686). Samples first: paint ONE item × 4 tiers (suggest **Loa tử đại**, C4) and show the coordinator before the rest (owner's "samples first" practice).

**Rank column.** Ranks in the game (VANPHONG): Cung nhân (maid) · Đáp ứng · Thường tại · Quý nhân · Tần · Phi · Quý phi · Hoàng quý phi · Hoàng hậu. Groups used below: **L** = Cung nhân, Đáp ứng, Thường tại · **M** = Quý nhân, Tần, Phi · **H** = Quý phi, Hoàng quý phi · **E** = Hoàng hậu. "Ration" = what Nội vụ phủ hands out monthly at that tier by right; "Bestow" = only by Emperor / Thái hậu / Hoàng hậu; "Buy" = hàng rong / Nội vụ phủ / lén mua. Design rule: the ration tier rises with rank only by ONE step per group (L→T1, M→T1–T2, H→T2–T3, E→T3); T4 is NEVER rationed (balance law OD:L1577 C: higher rank = bigger allowance but also bigger costs — retinue, gifts, scrutiny; see history report §5).

**Existing items** are marked **[EXISTS: key]** (ITEMS.md key; reuse the name, do not repaint unless the picture is a borrowed one — ITEMS.md says 11 items still lack their own picture). **[NEW]** = no such item yet.

## A. Monthly-ration goods (Nội vụ phủ phát lệ)

| # | Item | T1 Thường | T2 Tinh phẩm | T3 Trân phẩm | T4 Tuyệt phẩm (cống) | Ration | Bestow/Buy | Visual keys (tiers) |
|---|---|---|---|---|---|---|---|---|
| A1 | **Gạo lệ** (grain) [NEW] | Gạo tẻ kho | Gạo tám thơm | Gạo Yên chi (pink rice) | Gạo ngự điền cống | L,M: T1/T2; H,E: T2/T3 | T4 tribute only (hist: the Yuquan "rouge rice" 胭脂米 grown for the court) | cloth sack tied with hemp / lacquered rice bin / small white jade-lidded jar of faintly pink grains / yellow-silk-tied jar with gold-flecked pink grains |
| A2 | **Trà lệ** [NEW; the game already has tea in play, not in ITEMS.md — Foreman B to confirm the existing key and keep that name] | Trà thô | Trà Long Tỉnh | Trà Bích La xuân | Trà bánh Phổ Nhĩ cống | L: T1; M: T1/T2; H,E: T2/T3 | T4 tribute (hist: Qing tribute teas, Pu'er cakes) | bamboo-leaf packet / small tin with green leaves / porcelain caddy with curled silver-green leaves / round dark tea cake wrapped in paper and yellow cord |
| A3 | **Than sưởi** (winter charcoal) [NEW] | Than củi | Than bạc sương | Than hồng la | — (T1–T3 only) | L: T1; M: T1/T2; H: T2; E: T3 | Buy by the basket | straw basket of black charcoal / basket of grey-white "silver frost" sticks / lacquer scuttle of red-glowing smokeless sticks |
| A4 | **Nến thắp** [NEW] | Nến mỡ | Nến sáp ong | Nến thếp vàng | Nến hỷ long phượng | L: T1; M: T1/T2; H,E: T2/T3 | T4 Bestow (wedding/festival); NOT a Thị tẩm gift | cream tallow stubs / honey-coloured tapers in a paper roll / red candles with gilt bands / pair of thick red candles with dragon and phoenix relief |
| A5 | **Dầu đèn** [NEW] | Dầu mè thắp | Dầu trà | Dầu đèn hương liệu | — (T1–T3) | all by rank | Buy | small clay oil jar / glazed jar / cut-glass cruet with amber oil and a floating wick |
| A6 | **Vải bông** (maid and low-rank cloth) [NEW] | Vải bông xanh | Vải bông trắng nhuộm | — | — (T1–T2 only; higher ranks get silk) | L only | Buy | folded indigo cotton / folded printed cotton |
| A7 | **Tơ lụa lệ** (silk bolts) [EXISTS: luahang, gamto, gamvang] | Lụa Hàng Châu | Gấm Tô Châu | **Vân cẩm Giang Ninh** [NEW] | Gấm minh hoàng | L: none (A6); M: T1; H: T2; E: T3 | gamvang by right for Hoàng hậu only; T4 Bestow | plain folded silk / brocade with small florals / cloud-pattern brocade with gold thread / imperial yellow brocade bolt (already drawn: only Vân cẩm is new; **Gấm minh hoàng has no own picture yet — paint it**) |
| A8 | **Thực hạp** (meal box; Emperor's "ban thiện") [NEW] | Hộp cơm cung | Hộp thiện tinh | Hộp thiện ngự bếp | — (T1–T3) | L,M: T1 monthly; H,E: T2 | T3 = Emperor sends a dish to a favoured consort (hist: 賞膳) | plain wooden box / lacquered tiered box / red-and-gold tiered box under a lid with a yellow ribbon |
| A9 | **Sữa lệ** (milk, "bò sữa") [NEW] | Sữa bò tươi | Bánh sữa | Nhũ bì | — (T1–T3) | M: T1; H,E: T2/T3 (hist: milch cows allotted by rank) | Buy | clay jug / dried-milk cake on a leaf / thin folded cream-skin on a small plate |
| A10 | **Hộp trang sức** (the cosmetics box; the "hộp" = `BAL.toil.box` lượt, OD:L1577 D) [NEW] | Hộp gỗ trơn | Hộp sơn mài | Hộp khảm xà cừ | Hộp vàng khảm ngọc ngự dụng | L: T1; M: T1/T2; H: T2/T3; E: T3 | T4 Bestow | plain wooden lidded box / red lacquer with a gold floral line / mother-of-pearl inlaid / gold-rimmed jade-inlaid box with yellow cord. Each box is shown CLOSED; the cosmetics inside are items C1–C8 |
| A11 | **Bạc lệ** (silver pay; draws the "Nội vụ phủ phát lệ bạc" receive) [NEW art for the existing currency] | Túi bạc vụn | Bao bạc nén | Thỏi bạc nguyên bảo | Nguyên bảo vàng | by rank (silver already exists as Bạc) | T4 Bestow only | cloth pouch with loose silver / red paper wrapper with ingot shapes / one boat-shaped silver ingot / one gold ingot on yellow silk |
| A12 | **Hòm lệ Nội vụ phủ** (the monthly parcel that appears on "phát lệ" day; tap to open → items fly into Tư trang) [NEW] | Bọc vải gai | Hòm gỗ đóng đinh | Hòm sơn son | Hòm ngự dụng | by rank: L T1, M T1/T2, H T2/T3, E T3 | T4 = Emperor's own bestowal parcel | cloth bundle tied with hemp / plain nailed crate with a paper tag (no text) / red-lacquer chest with brass fittings / gold-edged chest tied with yellow silk |
| A13 | **Phiếu lãnh lệ** (ration slip) [NEW, optional UI icon] | Thẻ gỗ | Thẻ tre khắc | — | — (T1–T2) | all | — | small wooden tally / bamboo slip with a red thread. Use only if the later UI needs a "this month's lệ" glyph. |

## B. Cosmetics (đồ trang điểm) — the box contents

The makeup mini-game has THREE hand parts (kẻ mày · đánh phấn/má · chấm son) and six result levels (Mặt mộc · Vụng về · Đoan trang · Kiều diễm · Khuynh thành · Diêm dúa; jtoil.js). Items C1–C4 feed those three parts; C5–C9 are hair/body/scent. Existing `sonphan` ("Son phấn Dương Châu"), `huongtram`, `tuithom`, `xahuong`, `ngocdungcao` are reused.

| # | Item | T1 Thường | T2 Tinh phẩm | T3 Trân phẩm | T4 Tuyệt phẩm (cống) | Ration | Bestow/Buy | Visual keys |
|---|---|---|---|---|---|---|---|---|
| C1 | **Phấn mặt** (powder) [EXISTS in part: `sonphan` "Son phấn Dương Châu" is the generic combined item; propose it stays as the T2 of C1+C3 combined lookup or is retired by the later build — leave to Foreman B] | Phấn gạo | Phấn hoa lài | Phấn ngọc trâm | Phấn trân châu ngự | L: T1; M: T1/T2; H: T2/T3; E: T3 | T4 Bestow (hist: pearl powder in Qing court recipes) | white rice-flour in a folded paper / round tin of white powder with jasmine / small porcelain pot with a hosta-flower lid / mother-of-pearl lidded jar, pearly shimmer |
| C2 | **Má hồng** (yên chi, rouge) [NEW] | Yên chi giấy | Yên chi bánh | Yên chi hoa hồng | Yên chi Yên chi sơn cống | L: T1; M: T1/T2; H: T2/T3; E: T3 | T4 Bestow (hist: rouge named after Yanzhi mountain safflower) | red-stained paper leaflets in a fold / small flat dish with a pink cake / lacquer disc box with a rose motif, rose-red cream / white-jade tiny jar, deep rose colour, yellow cord |
| C3 | **Son môi** (khẩu chi) [NEW] | Son sáp | Son hoa hồng | Son điểm giáng | Son thiên chu cống | L: T1; M: T1/T2; H: T2/T3; E: T3 | T4 Bestow | small wax stick on a leaf / small porcelain pot with rose-red paste / lacquer petal-shaped dish with deep red / tiny gold-lidded jade jar with a single crimson drop painted on the lid |
| C4 | **Mày ngọc** (brow ink) [NEW] | Than liễu | Thanh đại | Họa mi đại | **Loa tử đại** (螺子黛) | L: T1; M: T1/T2; H: T2/T3; E: T3 | T4 Bestow — THE flagship tribute (owner 08:25Z; hist: Persian blue-green brow-ink cakes of the Sui court, a piece "worth ten gold") | a few charred willow twigs tied with thread / a blue-grey paste lump in a small dish / smooth dark blue-green sticks in a case / three small snail-spiral blue-green cakes in a silk-lined lacquer case with a yellow cord |
| C5 | **Dầu tóc** [NEW] | Nước bào hoa | Dầu hoa quế | Dầu lan hương | Dầu bách hoa cống | L: T1; M: T1/T2; H: T2/T3; E: T3 | T4 Bestow | glass bowl of clear sticky liquid with wood shavings / small cruet of golden oil with osmanthus sprig / carved white-porcelain bottle with orchid / crystal and gold flask with a ribbon |
| C6 | **Hoa điền** (forehead ornament) [NEW, optional] | Hoa điền giấy | Hoa điền vàng lá | Hoa điền ngọc trai | Hoa điền phỉ thúy cống | M+ monthly only a few; not rationed to L | Buy, T4 Bestow | tiny red paper petals / gold-leaf plum motifs on a leaf / pearl-set tiny flowers on silk / kingfisher-feather-blue ornaments |
| C7 | **Hoa lộ** (flower dew, scented water) [NEW] | Nước hoa lài | Lộ hoa hồng | Lộ tường vi | Lộ hoa Tây dương | M,H,E: T2–T3 monthly (fic: Rose Dew in 《Hồng lâu mộng》) | T4 Bestow (foreign tribute) | small clay jug / clear glass vial with a pink liquid / slim crystal bottle with a rose-pink stopper / small gilt-capped cut-glass bottle with a ribbon |
| C8 | **Cao dưỡng nhan** (face cream) [EXISTS only at T4: `ngocdungcao` = Ngọc dung cao, a cure item] | Mỡ dưỡng | Cao nhũ hương | Cao tuyết nhan | **Ngọc dung cao** [EXISTS] | M,H,E: T1/T2 monthly | T4 is the existing cure; do not move it | a pat of white grease in a leaf / small porcelain jar / white jade lidded jar / existing Ngọc dung cao art |
| C9 | **Bột tắm** (bath powder / soap) [NEW, optional] | Bồ kết | Táo đậu | Táo đậu hoa hồng | — (T1–T3) | all by rank | Buy | bundle of dark pods / small cloth sack of cream powder / lacquer box of pink powder |
| C10 | **Gương đồng** (mirror, used at the makeup scene) [NEW] | Gương đồng | Gương đồng khảm bạc | Gương thủy tinh Tây dương | Gương ngự khảm ngọc | L: T1; M: T1/T2; H,E: T2/T3 | T4 Bestow (hist: Western glass mirrors came as tribute) | round bronze mirror with a plain back / with silver-inlaid petals / clear oval hand mirror with a gilt frame / jade-inlaid mirror in a lacquer stand with yellow cord |
| C11 | **Lược và trâm bới** (comb set) [NEW, optional; hairpins already exist in the wardrobe] | Lược gỗ | Lược sừng | Lược ngà | Lược ngọc cống | all by rank | Buy | simple wooden comb / horn comb / carved ivory-coloured comb / jade comb |
| — | **Son phấn Dương Châu** [EXISTS: sonphan], **Hương trầm** [EXISTS: huongtram], **Túi thơm thêu** [EXISTS: tuithom], **Xạ hương** [EXISTS: xahuong, taint tool; keep as the dark item in the box, never rationed] | | | | | existing | existing | reuse existing art; do not repaint |

## C. Rare tribute bestowals (Emperor / Thái hậu only; T4 art, Ngự tứ when bestowed)

These are single-grade pictures (T4 look). Each is bestowed rarely; "vinh hạnh" per owner 08:15Z ("cống phẩm rất là hiếm mà được hoàng thượng ban cho là rất là vinh hạnh").

| # | Item | Name | Visual | Notes (hist) |
|---|---|---|---|---|
| D1 | Brow ink | **Loa tử đại** = C4 T4 | see C4 | flagship; owner's own example |
| D2 | Incense, agarwood | **Kỳ nam hương** | a dark resinous wood chunk in a small silk-lined case with a yellow cord | the Đại Việt agarwood that did go as tribute; pride for a Vietnamese player; may share art with huongtram T4 if the later build wants |
| D3 | Incense, ambergris | **Long diên hương** | a grey-brown waxy lump on a small jade dish | (hist) ambergris, a court perfume |
| D4 | Pearl | **Đông châu** | a single large lustrous round pearl on a small silk cushion in a gold dish | (hist) Qing court rank markers; the biggest Ngự tứ; no sale |
| D5 | Rouge tribute | **Yên chi Yên chi sơn cống** = C2 T4 | see C2 | |
| D6 | Pearl powder | **Phấn trân châu ngự** = C1 T4 | see C1 | |
| D7 | Hairpin ornament | **Điểm thúy trâm** (kingfisher-feather hairpin) | a hairpin with blue feather inlay | the hairpin wardrobe (j92) already has T4 hairpins; use that art, do NOT paint a new one |
| D8 | Foreign scent | **Lộ hoa Tây dương** = C7 T4 | see C7 | |
| D9 | Wrap | **Hộp ngự tứ** (seal wrap) | a yellow-silk ribbon / small seal, one reusable overlay | the "Ngự tứ" marker (see ladder table) |

## D. Count and order of painting

| Group | Items | Pictures (tiers) |
|---|---|---|
| A ration | 13 (A7 reuses 3 exist: +1 new, A3/A5/A8/A9 are T1–T3) | ≈ 38 |
| B cosmetics | 11 (C8 reuses 1) | ≈ 40 |
| C tribute (distinct, beyond C-tier T4s) | D2, D3, D4, D9 | 4 |
| Total | | ≈ 80 pictures |

Suggested order (balance of effort vs visible gain): **1** C4 Mày ngọc (sample 4 tiers) → **2** A10 Hộp trang sức + A12 Hòm lệ (the "receive" scene) → **3** C1–C3 (the three hand parts) → **4** A1–A4 (the ration staples) → **5** C5, C7, D2–D4 → **6** the rest (C6, C9–C11, A5–A9, A11, A13 only if the later UI wants them). If paint budget is tight, drop optional ones marked "optional" (C6, C9, C11, A13).

## E. Open points for Foreman B / main (do not block painting)
1. **Tea**: the owner (08:15Z) says "hiện tại chỉ có trà và vải". ITEMS.md has no tea key (cloth is there). Confirm where tea lives in code and keep that name as the A2 name; the A2 tier names here are proposals.
2. **Rank scale**: ITEMS.md uses `rk` 0..7 (Phi = 4, Quý phi = 5, Hoàng hậu = 7), jveil/wardrobe use P 0..8 (0 = cung nhân). This list uses rank NAMES only so both scales can map.
3. **Gấm minh hoàng, Trâm phượng cửu vĩ** have no source (ITEMS.md "Lỗ hổng 1"). A7's "by right for Hoàng hậu" gives Gấm minh hoàng a source later; Trâm phượng stays outside this task.
4. **Existing generic `sonphan`** will collide with C1–C3 if the later build splits cosmetics into phấn/má/son. Decide then; art here is by part.
5. **No % anywhere** in names or descriptions; the later numbers use the odds ladder (VANPHONG).

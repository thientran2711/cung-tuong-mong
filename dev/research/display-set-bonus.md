# DISPLAY SHELF — GROUP SET BONUS table (history / drama expert, sonnet)

Brief: dev/handover/briefs/display-set-bonus-expert.md. Owner rulings: OD:L1715 (20:45Z idea), OD:L1716 (20:42Z + 20:47Z, CANON OVERWRITE: SETS 2 / 3 / 5 inside a group, random pieces nothing), OD:L1714 (5 per group), OD:L1327.
REVISION 2 (rewrite after the owner's 20:47Z refinement; revision 1 'full group of 5' is gone).
START_CTX ~12 % of window (estimate); rollover at ~37 %, hard ceiling 60 %. Single pass, no rollover needed.

PRIORITY #1 CHECK ('set bonus|đủ bộ|shelf.*(bonus|set)|groupBonus'): OD 2 (L1715, L1716) | ledger 0 | claims 0 | origin/main 0 real hits (only OD:L381 "vẽ đủ bộ", emotion art, unrelated) | review/display-shelf-r3 ae10b963 0 (jshelf.js has no set logic; BAL.shelf.per = 5, groups/it table, wt, mood, see, th). New feature, owner-ordered.

## A. The existing bonus path to REUSE (named, file:line, origin/main + review/display-shelf-r3 ae10b963)

1. **wearBonus(p)** = the equipment-points path. Final ONE definition: dev/build/jwdinv.js:44 (wraps/replaces j8.js:212 and jinv.js:296); veil +2 Sắc is added by a wrapper at jinv.js:313 (the pattern to copy: a small wrapper that adds one more source). Summary shown by jinv.js:335 / jtoil.js:298 / jwdinv.js:120 as chips "Sắc / Danh". Live read: j8.js:37 `effSac(p)=cl(p.sac+wearBonus(p).sac,0,130)`. An equipment piece is worth +1 (ngọc bội Danh +1, túi thơm Sắc +1, jinv.js:258-259) up to +2 (veil Sắc +2). Computed on read, nothing stored, nothing to take back.
2. **Title flat bonuses** (jbal2.js:465-467, jdh.js:114 wrapper): types `sac/danh/sung/duc/tai/tamco` +v "while worn"; Sắc goes through wearBonus, the others are APPLIED on wear and TAKEN BACK exactly on removal. This is the existing route for a lasting non-Sắc point.
3. **Shelf data** (review/display-shelf-r3 jshelf.js): `BAL.shelf.groups` (:19-21, 12 groups), `BAL.shelf.per = 5` (:67), `shelfIn(p,g)` / `shelfList(p)` (:169-170, slots `g`, `g~1` … `g~4`), `shelfBad(e)` = plant below BAL.shelf.plant.wither (:164), dead pieces `caykho` / `longtrong` (:34, :60), `shelfOver` (vượt phẩm charge), `shelfSeed` for NPCs (:168), `BAL.shelf.th` Thái hậu rebuke (thAff −6, danh −2).

**Build instruction (no new bonus system):** one function `shelfSetsOf(p)` → list of whole sets. Sắc part: add to wearBonus by ONE more wrapper (same pattern as jinv.js:313), never multiplied by the ×1.5 over-rank rule. Danh / Đức / Tài / Tâm cơ part: the jdh flat apply / take-back pattern (item 2), driven by the weekly set check, so a broken set takes its point back exactly. NB for the builder: on origin/main wearBonus(p).danh is only a chip (j8.js:37 uses .sac only) — Danh must go through the apply / take-back route, not the chip.

## B. Rules (one rule for all 12 groups, player AND NPC)

1. A SET (bộ) is a named list of 2, 3 or 5 pieces of ONE group, one table `BAL.shelf.set[id] = {g, m:[piece keys], size, st:{stat:+n}, minus:{…}}`. Pieces of one set share a maker / kiln / painter / series / occasion (the "reason" column). A piece belongs to exactly ONE set. Random pieces of a group, even five of them, give NOTHING.
2. Size sets the bonus: **pair = +1, triple = +2, five = +3** of the set's stat (one equipment piece is +1, jinv.js:258; veil +2). A set of 5 fills the whole group (5 slots, BAL.shelf.per), so a 5-set means giving up the other sets of that group; a pair + a triple fits together. Matched kinds only: two of one kind never count twice.
3. A set is whole at the weekly check when every member stands on the shelf (any slot of its group) and none is dead / withered (plant `pc < plant.wither`, `caykho`, `longtrong`, starved bird / fish), tainted, burnt out (incense per tuần), stopped (clock, music box not wound; lamp out of oil), under a pending vượt phẩm charge or confiscated, given away, or sold. A broken set gives NOTHING until the member is replaced or cared back (the other sets of the group keep working). Checked once a tuần: swapping pieces in and out gives nothing between checks. Imperial-only pieces never count.
4. Hard ceiling (balance guard): total set points of one person ≤ `BAL.shelf.setCap` = 6, of which Danh ≤ 3; never Sủng.
5. Stat route = section A. Sắc via a wearBonus wrapper (never ×1.5); Danh / Đức / Tài / Tâm cơ via the title-style apply / take-back, so a broken set takes its point back exactly. A minus rides the same route (negative stat) or the existing `BAL.shelf.th.thAff` Thái hậu line.
6. NPCs: same table, same weekly check, in the weekly shelf pass (shelfSeed / arrange, BAL.shelf.npc); stats via `ap(p,{…})`, data only, host side in co-op. NPC plants / birds die on npc.care .8, so NPC sets break and mend by themselves; a show-loving NPC (taste +) is the one who collects whole sets; a rival's set is seen by visitors like any piece.
7. Piece names marked **NEW** are not in dev/research/display-shelf-items.md: art list in section D. All other members already exist in that list (names from it).

## C. THE TABLE — sets per group (12 groups, 26 sets)

Confidence [S] well attested, [~] period practice, [?] drama detail from memory (check the script before quoting).

| Group | Set (bộ) | Members | Size | Bonus | Minus | Reason (same maker / series; history / drama) | Breaks when |
|---|---|---|---|---|---|---|---|
| 1 Hoa cảnh | Tam quân tử | Chậu lan, Chậu cúc thu, Mai trắng | 3 | Đức +2 | — | Mai, lan, cúc are three of the four "quân tử"; the gentlewoman's flowers [S]. | any of the three withers / dies |
| 1 Hoa cảnh | Ngọc đường phú quý | Mẫu đơn, Hải đường | 2 | Danh +1 | — | Hải đường + mẫu đơn = the "ngọc đường phú quý" pun; Dương Quý phi is the peony beauty, hải đường her sleepy look (Lý Bạch; Minh Hoàng) [S]. | either withers |
| 1 Hoa cảnh | Hoa Tết | Thủy tiên, Chậu Phật thủ | 2 | Sắc +1 | — | Narcissus basins and Phật thủ citron were the two Tết room pieces of Qing palaces [~]. | either withers (thủy tiên 2 tuần, quickest) |
| 2 Đồ sứ | Lam bạch Cảnh Đức Trấn | Bình thanh hoa, Mai bình men lam | 2 | Danh +1 | — | Both blue-and-white of Jingdezhen: the everyday good ware of a rich house [S]. | either given away / confiscated |
| 2 Đồ sứ | Ngự diêu | Chén bát bảo cửu đào, Bình phấn thái hoa điểu, Chén đấu thái | 3 | Danh +2 | Chủ vị (Hoàng hậu, Thái hậu) thiện cảm −1 | One imperial kiln, Qing / Ming court ware; kept by emperors [S]. Minus: Niên Canh Nghiêu and his sister fell on charges of over-show and over-rank [S]. | any one taken (the chén đấu thái above Phi is a vượt phẩm charge) |
| 3 Ngọc ngoạn | Phúc tử | Hồ lô ngọc, Cải thảo phỉ thúy | 2 | Đức +1 | — | Hồ lô (many seeds) and the cabbage with locust and katydid both mean many sons and blessing; the cabbage was in Cẩn phi's dowry [S]. | either given away / lost |
| 3 Ngọc ngoạn | Như ý cát tường | Ngọc Như Ý, San hô đỏ | 2 | Sắc +1 | Danh −1 (tiếng khoe của) | Như Ý = "as you wish", the sceptre of promotion; red coral tree = tribute treasure of the inner palace [~]. Minus: jade and coral in a hall is the sign historians held against Triệu Hợp Đức's Chiêu Dương điện (Hán thư Ngoại thích truyện) [S]. | either taken |
| 4 Thư họa | Tay mình | Bức tranh tự vẽ, Bức thư pháp (her handmade) | 2 | Tài +1 | — | A consort's own brush and calligraphy read as a woman of letters [~]. | either given away |
| 4 Thư họa | Tết liễn | Câu đối đỏ thêu chỉ vàng, Chữ «Phúc» ngự bút | 2 | Danh +1 | — | Couplets and the emperor's New Year «Phúc» (Khang Hy writing it for Thái hậu is the famous case) [S]. | either taken |
| 4 Thư họa | Danh gia cổ họa | Tranh cổ, NEW Sơn thủy cổ họa, NEW Hoa điểu cổ họa | 3 | Tài +2 | — | Three scrolls of one old painter (a hand, a school): the collector's series, as the Yongzheng-era Thập nhị mỹ nhân albums were a series [S/~]. | any one given away |
| 5 Hương lô | Đồng khí | Lư hương đồng nhỏ, Lư Tuyên Đức, NEW Hạp hương đồng | 3 | Tâm cơ +2 | — | Xuande bronze burners were the connoisseur's ideal; a burner, a box of incense and its bronze fittings a full set [S/~]. A burner set also knows scents (Chân Hoàn recognises the musk of Hoan Nghi hương [S]); a tainted piece never counts. | any one taken / tainted |
| 5 Hương lô | Hương cung đình | Lư men pháp lam, Hộp hương hạc đứng | 2 | Sắc +1 | — | Cloisonné burners = imperial workshop; crane burners stood in Thái hậu's rooms [S/~]. | either taken |
| 6 Chuông gió | Phong linh | Chuông đồng nhỏ (phong linh), Thiết mã mái hiên | 2 | Đức +1 | — | Both are eave bells of palace and temple roofs [S]. | either taken |
| 6 Chuông gió | Dây chuông | Chuông vỏ sò, Chuông ngọc khánh, Chuông pha lê Tây | 3 | Đức +2 | — | Strung chimes of three materials, hung together under one eave [~]. | any one taken |
| 7 Bình phong, rèm | Rèm hạ | Rèm trúc, Rèm lụa mỏng | 2 | Tâm cơ +1 | — | Summer blinds of a low consort: seeing without being seen, thùy liêm [~]. | either taken |
| 7 Bình phong, rèm | Bình phong Tô thêu | Bình phong thêu để bàn, Bình phong khảm xà cừ | 2 | Danh +1 | — | Suzhou embroidery and lacquer-and-pearl were court-workshop gifts [S/~]. | either taken |
| 8 Đồ Tây dương | Cơ giới Tây | Đồng hồ tự minh, Hộp nhạc Tây dương | 2 | Danh +1 | Thái hậu thiện cảm −1 | Both are Jesuit / tribute clockwork (Ricci's clock to Wanli; Tự minh chung xử) [S]. Minus: Qianlong's 1793 edict to Macartney: the court "never valued ingenious articles" (kỳ kỹ dâm xảo) [S]; an old Thái hậu frowns. | either unwound or taken |
| 8 Đồ Tây dương | Thiên văn | Kính viễn vọng, Địa cầu nhỏ, NEW Nhật quy nhỏ | 3 | Tài +2 | — | Khang Hy's court of Jesuit astronomers: telescope, globe, sundial [S]; a scholarly, not romantic, set. | any one taken |
| 9 Quạt | Quạt mùa | Quạt tròn lụa, Quạt gấp trúc vẽ | 2 | Sắc +1 | — | Round silk fan (Ban Tiệp dư's Oán ca hành) and the painted folding fan are the summer pair of a lady [S/~]. | either taken |
| 9 Quạt | Quạt quý | Quạt đàn hương chạm, Quạt lông công | 2 | Danh +1 | — | Carved sandalwood and peacock feather: the gift fans of high consorts [~]. | either taken (peacock fan below Phi = charge) |
| 10 Chim cá | Chim lồng | Họa mi, Vẹt biết nói | 2 | Tâm cơ +1 | — | Songbirds and Dương Quý phi's parrot "Tuyết y nữ" that warned of the emperor [S]: the room has ears. | either dies / ailing |
| 10 Chim cá | Thú vui nhàn | Dế trong lồng, Chậu cá vàng | 2 | Sắc +1 | Danh −1 (mê chơi) | Cricket keeping and goldfish bowls were palace pastimes; Xuande, the "cricket emperor" (Xúc chức thiên tử), is the example of a ruler mocked for it [S/~]. | dế dies (1 tuần, short life) or fish ailing |
| 11 Nhạc khí | Dây | Đàn cổ Tiêu Vĩ, Tỳ bà lưng ngà, Đàn tranh nhỏ | 3 | Tài +2 | — | Three string instruments: the zither, pipa and zheng of a court consort (Dương Quý phi's pipa) [S/~]. | any one taken |
| 11 Nhạc khí | Sáo ngọc | Sáo trúc treo giá, Ngọc địch | 2 | Tài +1 | — | Bamboo flute and jade flute: Chân Hoàn's xiao scenes [~]. | either taken |
| 12 Văn phòng, đèn | Ngũ bảo thư phòng | Nghiên Đoan Khê, Chặn giấy ngọc, Thạch Thái Hồ, NEW Bút lông, NEW Mực Huy | 5 | Tài +3 | — | The scholar's table: ink-stone, paperweight, rock, brush, ink; "văn phòng tứ bảo" plus the literati rock [S]. Fills the whole group. | any one taken |
| 12 Văn phòng, đèn | Đèn dạ | Cung đăng lụa, Dạ minh châu | 2 | Danh +1 | — | Palace lantern and night-shining pearl = lights of the inner halls (Chiêu Dương điện lore) [S/~]. | lamp out of oil / pearl taken (alternative to the 5-set: the group holds only 5 slots) |

Left out on purpose (no set, history gives none): Bonsai tùng, đĩa Long Tuyền, Tư ấn, Gương Tây. Pieces outside a set simply stand as décor with their luxury value only.

Minus rows (4 of 25, each with a real reason): Ngự diêu (Niên family), Như ý cát tường (Triệu Hợp Đức), Cơ giới Tây (Macartney edict / Thái hậu), Thú vui nhàn (Xuande).

## D. NEW pieces needed (art list for Foreman C) — 6 pieces

| NEW piece | Group | Set | Look (painted, one cut-out, Magnific gpt-2-6, ratio as the other shelf pieces) | Rank / source / price hint |
|---|---|---|---|---|
| Sơn thủy cổ họa | Thư họa | Danh gia cổ họa | A hanging scroll, aged silk mounting, a misty mountain-and-water ink landscape, brown seal at the corner | QN; mua / EV; giá ~200 |
| Hoa điểu cổ họa | Thư họa | Danh gia cổ họa | A hanging scroll in the same aged mounting: a bird on a flowering branch (small), same painter's red seal | QN; mua / EV; giá ~200 |
| Hạp hương đồng | Hương lô | Đồng khí | A small lidded bronze incense box with a round lid and a little ladle and tongs laid beside it, warm Xuande bronze colour | TT; mua; giá ~100 |
| Nhật quy nhỏ | Đồ Tây dương | Thiên văn | A small brass sundial / gnomon plate on a wooden stand, engraved hour ring, Jesuit instrument style | Phi; ngự ban; giá ~240 |
| Bút lông | Văn phòng, đèn | Ngũ bảo thư phòng | A bamboo-handled writing brush on a small jade brush rest, soft white-and-dark hairs | TT; mua; giá ~80 |
| Mực Huy | Văn phòng, đèn | Ngũ bảo thư phòng | Two black ink sticks (Huy mực) with gold characters on one, in a little lacquer tray | TT; mua; giá ~100 |

Each needs a `BAL.shelf.it` entry (group, rank, gr, pr, src) and an IT "Bày biện" item; nothing else new.

## E. Balance note — total of all sets vs the Hoàng hậu band (estimate, NOT measured)

- Hoàng hậu needs Sủng 85 and Danh 78 (j1.js:6-8); Danh steps between ranks +8 … +13; target band Hoàng hậu ≈ 20–35 % (HANDOVER:38; measured ≈ 32 %, HANDOFF_MAIN:14).
- Sủng, the binding gate, is untouched. All 26 sets together would give Danh about +9 (minus about −2), but the ceiling `setCap` = 6 points per person (Danh ≤ 3) makes that moot; and allowance (36 + 16 × rank, 148 at Hoàng hậu) with the falling shares wt (≈ 2.1 × the best piece per group) lets a Phi (allowance 100) hold perhaps 3–5 pieces' worth of sets, i.e. 1–2 sets, +1 to +3 points.
- One equipment piece is +1; a realistic player ends with 1–6 set points = 1–6 extra equipment pieces. Versus a Danh step of 8–13, set Danh ≤ 3 is ≤ about a quarter of ONE step over a whole life.
- Estimate: Hoàng hậu reach moves by about 1 point of ≈ 32 % at the ceiling, probably less (paired-smoke standard error ≈ ±9 at n = 30, ±6 at n = 60, so the shift is below what the smoke can see). Minus rows (4) cost Danh −1 / thiện cảm −1 each, so the average net is smaller than the plus side alone.
- Guards if the smoke disagrees: lower `setCap` to 4, turn Danh pluses into Đức / Tài, or sets count only from Quý nhân up. Smoke as ordered: paired ≥ 60 lives vs main; report Hoàng hậu share and early death.
- BAL keys: `BAL.shelf.set = {cap:6, capDanh:3, size:{2:1,3:2,5:3}, s:{<id>:{g,m:[…],st:{…},minus:{…}}}}`, one table in jshelf.js beside BAL.shelf; no % anywhere.

## F. Player-visible words (cổ trang, no %, VANPHONG)

Set name shown as «Bộ <tên>»: «Bộ Tam quân tử: Đức +2.» · «Bộ Ngự diêu: Danh +2, nhưng chủ vị không ưa khoe của.» · «Bộ Cơ giới Tây: Danh +1, nhưng Thái hậu không ưa đồ ngoại bang.» · on the shelf, an unfinished set shows «Bộ Tam quân tử: còn thiếu Mai trắng» (so she knows what to collect; random pieces show nothing) · broken: «Bộ Tam quân tử khuyết: chậu lan đã héo.» · mended: «Bộ Tam quân tử đủ lại.» Plants / birds name the piece that failed.

## G. Short Vietnamese summary for the owner (ONE yes / no)

```
Sếp ơi, bảng "bộ" cho Nơi trưng bày: 12 nhóm, 26 bộ (cặp, ba, năm món cùng một thợ/một lò/một họa sĩ).
- Cặp cộng 1, bộ ba cộng 2, bộ năm cộng 3 điểm nhỏ (Sắc, Danh, Đức, Tài hay Tâm cơ). Không bộ nào cộng Sủng.
- Bày lẫn lộn món rời thì không được gì. Phải gom đúng bộ: ví dụ Tam quân tử (lan, cúc, mai), Ngự diêu (ba món sứ cung đình).
- 4 bộ có điểm trừ vì sử: Ngự diêu (nhà họ Niên bị tội khoe của), Như ý cát tường (Triệu Hợp Đức), Cơ giới Tây (Thái hậu ghét đồ ngoại bang), Thú vui nhàn (vua Tuyên Đức mê dế).
- Cây héo, chim cá chết, hương cháy hết, đèn cạn dầu hay món bị tặng đi: bộ đó khuyết cho tới khi thế lại.
- NPC dùng y bảng này, bộ của họ cũng khuyết khi cây chim chết.
- Cần vẽ thêm 6 món mới: 2 tranh cổ, hạp hương đồng, nhật quy, bút lông, mực Huy (có mô tả sẵn).
- Mỗi người cộng tối đa 6 điểm bộ (Danh tối đa 3); em ước chừng dải Hoàng hậu lệch khoảng 1 điểm, sẽ đo bằng smoke ≥ 60 kiếp.
Sếp duyệt: CÓ hay KHÔNG?
```

# DISPLAY SHELF — GROUP SET BONUS table (history / drama expert, sonnet)

Brief: dev/handover/briefs/display-set-bonus-expert.md. Owner rulings: OD:L1715 (20:45Z idea), OD:L1716 (20:42Z, option 1), OD:L1714 (5 per group), OD:L1327 (history ideas: expert first).
START_CTX ~12 % of window (estimate); rollover at ~37 %, hard ceiling 60 %. Single pass, no rollover needed.

PRIORITY #1 CHECK ('set bonus|đủ bộ|shelf.*(bonus|set)|groupBonus'): OD 2 (L1715, L1716) | ledger 0 | claims 0 | origin/main 0 real hits (only OD:L381 "vẽ đủ bộ", emotion art, unrelated) | review/display-shelf-r3 ae10b963 0 (jshelf.js has no set logic; BAL.shelf.per = 5, groups/it table, wt, mood, see, th). New feature, owner-ordered.

## A. The existing bonus path to REUSE (named, file:line, origin/main + review/display-shelf-r3 ae10b963)

1. **wearBonus(p)** = the equipment-points path. Final ONE definition: dev/build/jwdinv.js:44 (wraps/replaces j8.js:212 and jinv.js:296); veil +2 Sắc is added by a wrapper at jinv.js:313 (the pattern to copy: a small wrapper that adds one more source). Summary shown by jinv.js:335 / jtoil.js:298 / jwdinv.js:120 as chips "Sắc / Danh". Live read: j8.js:37 `effSac(p)=cl(p.sac+wearBonus(p).sac,0,130)`. An equipment piece is worth +1 (ngọc bội Danh +1, túi thơm Sắc +1, jinv.js:258-259) up to +2 (veil Sắc +2). Computed on read, nothing stored, nothing to take back.
2. **Title flat bonuses** (jbal2.js:465-467, jdh.js:114 wrapper): types `sac/danh/sung/duc/tai/tamco` +v "while worn"; Sắc goes through wearBonus, the others are APPLIED on wear and TAKEN BACK exactly on removal. This is the existing route for a lasting non-Sắc point.
3. **Shelf data** (review/display-shelf-r3 jshelf.js): `BAL.shelf.groups` (:19-21, 12 groups), `BAL.shelf.per = 5` (:67), `shelfIn(p,g)` / `shelfList(p)` (:169-170, slots `g`, `g~1` … `g~4`), `shelfBad(e)` = plant below BAL.shelf.plant.wither (:164), dead pieces `caykho` / `longtrong` (:34, :60), `shelfOver` (vượt phẩm charge), `shelfSeed` for NPCs (:168), `BAL.shelf.th` Thái hậu rebuke (thAff −6, danh −2).

**Build instruction (no new bonus system):** one function `shelfSetOf(p)` → list of groups whose set is whole. Sắc part: add to wearBonus by ONE more wrapper (same pattern as jinv.js:313), never multiplied by the ×1.5 over-rank rule. Danh / Đức / Tài / Tâm cơ part: the jdh flat apply / take-back pattern (item 2), driven by the weekly set check, so a broken set takes its point back exactly. NB for the builder: on origin/main wearBonus(p).danh is only a chip (j8.js:37 uses .sac only) — Danh must go through the apply / take-back route, not the chip.

## B. When is a set "whole" (one rule for all 12 groups, player AND NPC)

A group's set is whole when, at the weekly check:
1. all `BAL.shelf.per` (5) slots hold a piece, five DIFFERENT kinds (two of one kind never count twice);
2. no piece is dead or withered/ailing (plant `pc < plant.wither`, `caykho`, `longtrong`, a starved bird / fish), tainted (ties to TAINT, a poisoned piece never counts), burnt out (incense `per`), stopped (clock / music box not wound, lamp out of oil);
3. no piece is under a pending vượt phẩm charge or confiscated, and nothing was given away or sold (a piece leaving the shelf = the slot is empty = broken);
4. checked once a tuần (no swap-in, swap-out trick); a broken set takes its point back at once and gets it again at the next check after it is whole.
Imperial-only pieces (imp:1) can never be placed, so they never count.

Data gaps for the builder (found while counting kinds):
- **Chim cá has 4 kinds** (họa mi, vẹt, kim ngư, dế; the dead cage is not a kind) and **Quạt has 4 placeable kinds** (the 5th is the imperial trường phiến). A 5-different-kinds set is impossible there. Recommendation: add ONE new piece each — Chim cá: «Chim bạch yến trong lồng» (rank TT, low care, ties to the cricket/songbird pastime); Quạt: «Quạt xếp ngà chạm» (rank Tần, tượng nha phiến, Suzhou/Guangzhou make).
- Nhạc khí, Chuông gió, Văn phòng, Đồ Tây dương have exactly 5 kinds; Ngọc ngoạn has exactly 5 placeable kinds (2 are imperial-only). Their full set therefore needs EVERY piece, including the Phi / Quý phi ones, so these sets are rank-gated by nature (fine: a late reward).

## C. THE TABLE — 12 groups

Plus = ONE lasting point, +1 each (= one equipment piece, jinv.js:258). No set gives Sủng. Minus only where history gives a real reason. Confidence tags as in display-shelf-items.md: [S] well attested, [~] period practice, [?] drama detail from memory (check the script before quoting).

| # | Group | SET PLUS | SET MINUS | Historical / drama reason | What breaks the set |
|---|---|---|---|---|---|
| 1 | Hoa cảnh | Đức +1 | none | Lan = quân tử, cúc = ẩn sĩ, mai = chịu rét: a room of living flowers reads as a gentle, steady woman [S]; the Qing court's 9th-month chrysanthemum viewing and the Tết narcissus basins [~]. | Any plant withered or dead (plant clock, jshelf plant.wither / `caykho`); a plant given away. Set returns when the pot is watered back or replaced. |
| 2 | Đồ sứ | Danh +1 | none | Five good Jingdezhen pieces = a house of means and taste; porcelain was the standing gift and the Qianlong court's pride (phấn thái) [S/~]. | A piece given away, confiscated (vượt phẩm: chén đấu thái below Quý phi), or broken by a quarrel event. |
| 3 | Ngọc ngoạn | Sắc +1 | Danh −1 | Jade was thought to feed the skin and keep beauty (jade worn and rubbed on the face, the Dương Quý phi tradition) [~]. Minus: a hall of jade and pearl was the very sign historians held against Triệu Hợp Đức's Chiêu Dương điện (Hán thư Ngoại thích truyện) [S]; the Niên family fell partly on over-show [S]: the whole room of jade earns «tiếng khoe của». | Any piece given away / confiscated / lost to a frame-up (planted ngọc tỷ is not a set piece). Both plus and minus go together: broken set = neither. |
| 4 | Thư họa | Tài +1 | none | A consort who hangs her own brush and good scrolls is read as a woman of letters; the emperor's praise of such consorts (Như Ý truyện / Diên Hy công lược scenes) [~]; the ngự bút «Phúc» is the strongest favour sign [S]. | A scroll given away or taken; tranh tự vẽ taken down. (Biển ngự bút hangs at the door, not a set piece.) |
| 5 | Hương lô | Sắc +1 | none | Incense scented robe and room: the cheap daily art of a well-kept woman [~]. Drama: Chân Hoàn truyện's Hoan Nghi hương with xạ hương [S] — a tainted burner NEVER counts, so a set can never hide a poisoned piece. | Incense burnt out (hương trầm per tuần), a tainted piece (nghiệm độc positive), a piece given away. Needs a refill each tuần: a real upkeep cost. |
| 6 | Chuông gió | Đức +1 | none | Eave bells and jade chimes steady the heart; phong linh hung under palace and temple eaves for centuries, khánh = ritual sound [S/~]. | A piece given away or taken; a storm / vandal event may break one (builder's choice). |
| 7 | Bình phong, rèm | Tâm cơ +1 | none | Screens and curtains are how a palace room sees without being seen (thùy liêm, rèm châu, bình phong: a lady speaks and listens behind them) [~]. | A piece given away or confiscated. (Rèm châu above her rank = charge → breaks it.) |
| 8 | Đồ Tây dương | Danh +1 | Thái hậu thiện cảm −1 | Clocks, music boxes, telescopes, globes were Jesuit tribute and talk of the court (Matteo Ricci's clock to Wanli; the Qing Tự minh chung xử) [S]. Minus: the old guard called them «kỳ kỹ dâm xảo» and Qianlong's 1793 edict to Macartney says the court «never valued ingenious articles» [S]; a conservative Thái hậu frowns on foreign toys in a consort's room. | A clock / music box not wound (servant forgets), any piece given away. |
| 9 | Quạt | Sắc +1 | none | A fan is a woman's grace: Ban Tiệp dư's round fan (Oán ca hành) [S], painted folding fans as courtesy gifts [~]. A full cabinet of fans reads as a woman who knows how to carry herself. | A piece given away; a peacock fan above her rank = charge. Needs the 5th piece added (see B). |
| 10 | Chim cá | Tâm cơ +1 | none | Dương Quý phi's parrot «Tuyết y nữ» that warned of the emperor [S]; songbird and goldfish keeping was palace pastime [~]: the room has eyes and ears. | ANY bird / fish dead or ailing (the empty cage stays); starved 2 tuần (hw 2). The set that costs most care. Needs the 5th piece added (see B). |
| 11 | Nhạc khí | Tài +1 | none | Instruments on stands = a consort who plays: tỳ bà and khánh were Dương Quý phi's famous skill, Chân Hoàn plays flute and zither [S/~]; music is the oldest way into the emperor's evening. | A piece given away. (Not played = no break; it is not a care item.) |
| 12 | Văn phòng, đèn | Danh +1 | none | A scholar's desk (nghiên Đoan Khê, chặn giấy, thạch Thái Hồ, cung đăng, dạ minh châu) = thanh danh văn nhã [S]. Counter: Phú Sát Hoàng hậu's frugality praised, so there is NO minus here. | Lamp out of oil (thêm dầu 1×/tuần), a piece given away. Dạ minh châu is Quý phi+, ngự ban only: this set is the latest to complete. |

Totals if one holds ALL 12: Sắc +3, Danh +3 −1 = +2, Đức +2, Tài +2, Tâm cơ +2, Thái hậu thiện cảm −1. Never Sủng.

## D. NPC rule

The same table, same check, same numbers for every NPC consort (two-way law). Builder: NPC shelves already seed by rank (shelfSeed, BAL.shelf.npc) and arrange weekly within capF × allowance; the set check runs inside that weekly pass and applies / takes back through `ap(p,{…})` (data only, host side in co-op, like jpromo NPC). NPC plants and birds die on the existing NPC care rate (npc.care .8), so an NPC set breaks and mends on its own; a vain NPC (taste +) is the one who fills a whole group. A rival's set is visible to visitors like any shelf piece (OD 17/11 ~18:30Z) and a Hoàng hậu with Danh set sees a minus-set room the same way the player does.

## E. Balance note — total of all 12 sets vs the Hoàng hậu band (estimate, NOT measured)

- Numbers: Hoàng hậu needs Sủng 85 and Danh 78 (j1.js:6-8). Steps between ranks need Danh +8 … +13. The target band is Hoàng hậu ≈ 20–35 % (HANDOVER:38; measured ≈32 %, HANDOFF_MAIN:14).
- Sủng, the binding gate, is untouched (no set grants it). Danh: all 12 sets together = net +2 (and that is impossible in practice: 60 pieces against an allowance of 36 + 16 × rank = 148 at Hoàng hậu, with the falling shares wt [1, .5, .3, .2, .1] ≈ 2.1 × the best piece per group; a realistic Phi (allowance 100) fits 1–2 sets, i.e. +1 to +2 points of anything).
- One equipment piece is worth +1; a realistic player ends with 1–3 set points, about the weight of 1–3 extra equipment pieces. Versus a Danh rank step of 8–13 this is ≈ 10–25 % of ONE step spread over a whole life.
- Estimate: Hoàng hậu reach moves by less than 1 point of the ≈32 % (well inside the paired-smoke standard error: about ±9 at n = 30, ±6 at n = 60). Minus side: −1 Danh (jade) and −1 Thái hậu thiện cảm (Tây dương) cost about as much as they give, so the net is not positive on average.
- Guards if the smoke disagrees: (1) drop every Danh plus to Đức / Tài, (2) per-life cap of 3 set points (BAL.shelf.setCap), (3) sets count only from Quý nhân up. Smoke as ordered: paired ≥ 60 lives vs main, report Hoàng hậu share and early death.
- BAL keys proposed (one table, in jshelf.js beside BAL.shelf): `BAL.shelf.set = {g:{hoa:{duc:1}, su:{danh:1}, ngoc:{sac:1,danh:-1}, thuhoa:{tai:1}, huong:{sac:1}, chuong:{duc:1}, phong:{tamco:1}, tay:{danh:1,thAff:-1}, quat:{sac:1}, chim:{tamco:1}, nhac:{tai:1}, van:{danh:1}}, cap:3}` — all sizes small, tunable; no % anywhere.

## F. Player-visible words (cổ trang, no %, VANPHONG)

Names: «Đủ bộ Hoa cảnh», «Đủ bộ Đồ sứ», «Đủ bộ Ngọc ngoạn», «Đủ bộ Thư họa», «Đủ bộ Hương lô», «Đủ bộ Chuông gió», «Đủ bộ Bình phong, rèm», «Đủ bộ Đồ Tây dương», «Đủ bộ Quạt», «Đủ bộ Chim cá», «Đủ bộ Nhạc khí», «Đủ bộ Văn phòng, đèn».
Lines: «Đủ bộ Hoa cảnh: Đức +1.» · «Đủ bộ Ngọc ngoạn: Sắc +1, nhưng tiếng khoe của: Danh −1.» · «Đủ bộ Đồ Tây dương: Danh +1, nhưng Thái hậu không ưa đồ ngoại bang.» · broken: «Bộ Hoa cảnh khuyết: chậu lan đã héo.» · mended: «Bộ Hoa cảnh đủ lại.» Hoa and Chim cá broken lines name the piece that failed, so she knows what to fix.

## G. Short Vietnamese summary for the owner (ONE yes / no)

```
Sếp ơi, bảng "đủ bộ" cho Nơi trưng bày (12 nhóm, mỗi nhóm đủ 5 món KHÁC loại):
- Mỗi bộ cộng đúng 1 điểm nhỏ, bằng một món trang bị. Không bộ nào cộng Sủng.
- Hoa cảnh Đức+1 · Đồ sứ Danh+1 · Ngọc ngoạn Sắc+1 · Thư họa Tài+1 · Hương lô Sắc+1 · Chuông gió Đức+1
- Bình phong Tâm cơ+1 · Đồ Tây dương Danh+1 · Quạt Sắc+1 · Chim cá Tâm cơ+1 · Nhạc khí Tài+1 · Văn phòng Danh+1
- Có trừ (vì sử): Ngọc ngoạn Danh−1 (hầu Triệu Hợp Đức bị chê khoe của); Đồ Tây dương Thái hậu bớt ưa 1 (kỳ kỹ dâm xảo).
- Bộ bị khuyết khi: cây héo/chết, chim cá chết, hương cháy hết, đèn cạn dầu, món bị tặng đi hay bị tịch thu; thế lại món là đủ bộ lại.
- NPC dùng y bảng này; cây chim của họ cũng héo, bộ của họ cũng khuyết.
- Em thêm 2 món mới: Chim bạch yến, Quạt xếp ngà (Chim cá và Quạt mới có 4 loại, thiếu một).
- Dùng lại đường cộng điểm trang bị có sẵn; em ước chừng dải Hoàng hậu lệch chưa tới 1 điểm, sẽ đo bằng smoke ≥ 60 kiếp.
Sếp duyệt: CÓ hay KHÔNG?
```

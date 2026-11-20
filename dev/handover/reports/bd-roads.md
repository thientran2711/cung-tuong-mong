# bd-roads — Bắc Địch's own 4 roads (E14, lead, under Foreman E ROOT #7)
PRIORITY #1 CHECK ('Bắc Địch' / 'bd_'): OD 18/11 ~22:05Z (GE D2 = own 4 roads) | main: jrd_nc.js bd alias loop (end of file, bd_hoa→nc_su, bd_ngua→nc_gian, bd_tuc→nc_tuc, bd_hoang→nc_vuong), jorigins.js ARC67.bd_hoa/bd_ngua/bd_tuc/bd_hoang (.4, numbers BAL.orig.hoa/hoang… jbal.js + BAL.arc.fx jbalarc.js), jkc2.js KC2LAND.bd, dev/test/ge_guard/cat.py bd_san…bd_hen catalogue rows (names only, no road code); no bd .4 rare in j97 today | review/*: only review/grand-endings-design (GRAND_ENDINGS.md §2.13, §3 bd rows, §4.2) — no road code for bd_san/bd_soi/bd_tuyet/bd_hen anywhere | claims none.
Branch: review/bd-roads (PLAN commit fcc296d7: dev/story/ROAD_MAP.md §4.5b + §5.4 rows). START_CTX ≈ 3 % of the window.

## §PLAN
### (a) Premise ids and OLD-SAVE migration
- New bd lives roll one of 4 NEW premises `bd_san`, `bd_soi`, `bd_tuyet`, `bd_hen`: each a new .4 arc `ARC67.<id>` (o:"bd", arcFx, RTHEME67) + `.5–.11` via rdDef + j97 rare at .4 + RD97L rare at .11. bd stays a country branch of nc (no 10th origin; ORIGIN_BR.bd, KC2LAND.bd, STORY/QUEST67.bd unchanged).
- The old premises are NOT mapped onto the new ids (their .4 content differs: bd_hoang = two elder brothers, bd_soi = uncle + young brother; a remap would change a running life's story under it). Instead:
  - `bd_hoa`/`bd_ngua`/`bd_tuc`/`bd_hoang` .4 arcs (jorigins.js) stay registered and get `old:1`;
  - their alias chapters stay registered: the alias loop is REMOVED from jrd_nc.js and moved VERBATIM into jrd_bd.js (legacy block) — so `S.st.f14.road="bd_hoa"` + plan `st:bd_hoa_5…11` of a saved life keep resolving and play on to .11 (law 6c: nothing vanishes);
  - an `arcIds67` wrapper in jrd_bd.js drops `old:1` premises, so new lives only get the 4 new roads (old saves keep their own written plan/pool ids).
  - Test: a save mid-road on bd_hoa (.6 running) loads and plays to .11; a new bd life rolls only bd_san/soi/tuyet/hen.
- jrdhp.js keys `bd_hoa_6:…`, `bd_hoang_*` stay (they serve the legacy chapters).

### (b) People (law 6b) and objects (law 6c)
- §5.4 rows added: Ba Đồ (Bắc Địch groom of Thượng tứ viện = the existing unnamed row, now named), Tổng quản Thượng tứ viện, mare Tuyết Câu, thúc phụ Hô Diên Liệt, em trai Ô Lặc, Thát Mộc (uncle's embassy guard), A Sử Na Cát (old border chief), Hộ bộ Lang trung, Thác Bạt Phong (betrothed). {pv}/{mh}/{v}/{emp} = existing people.
- In code: nc's road people exist as text + §5.4 rows only. For bd I add one people book `BDP` in jrd_bd.js (id, name, role, where steppe/border/capital, alive, met), state in `S.st.f14.fb` keys `bd.p.<id>.*`, moved by chapter go: closures (e.g. Khả đôn arrives in the capital at bd_soi .8, Thát Mộc taken alive / killed at .6, Phong jailed at bd_hen .9), read by text tokens; so a person named in a chapter has one living state across the road and can be referred back to (and by the GE wave: «brother alive» condition of ge2 reads `bd.p.olac.alive`).
- Objects: the border-map copy, the uncle's letters, the cut girth, the oath stone, the mare — each tracked (kept / given / burnt / seized) in the same book or as real items via existing item code where one exists; never vanished.
- FOR E question (non-blocking, I proceed with the book): if a full world NPC (schedule) is wanted for the capital-side steppe people (Khả đôn in the capital, Phong with the embassy), that is a jworld/jmen task, not roads.

### (c) File layout
- `dev/build/jrd_bd.js` (lead): header + BDP people book + arcIds67 old-premise filter + legacy alias block (moved from jrd_nc.js) + bd_san (.4–.11, rares) + bd_soi (.4–.11, rares).
- `dev/build/jrd_bd2.js` (writer 2): bd_tuyet + bd_hen, same shape (ARC67 .4 via arcFx, rdDef .5–.11, RD97L push via rdRare), uses BDP + NCL.bd land tokens.
- assemble.py: `'jrd_nc.js','jrd_bd.js','jrd_bd2.js'`; `'jbalroad.js','jbalbd.js'` (numbers file must load before jroad/jrd_*).
- jrd_nc.js: ONLY the alias block at the file end is removed (FYI Foreman B — jrd_* are B's); NCW/BDW openings and NCL.bd tokens stay (legacy aliases still use them).
- j97 .4 rares: 4 rows appended to j97's rare list (or pushed from jrd_bd via RARE97.defs if load order allows — decided while writing; numbers in BAL.arc.rare either way).

### (d) Numbers (ONE CORE, law 4) — `dev/build/jbalbd.js`, one block per writer
- `.4`: `BAL.arc.fx.<road>` (per-beat c/w/l/o/sc + E fx, same shape as jbalarc.js) and `BAL.arc.rare.<road>` (p, np, sc, c, bar, fx).
- `.5–.11`: `BAL.road.fx.<road>_<n>` (same shape as jbalroad.js nc_*), `BAL.road.rare.<road>_11`.
- chapter constants (deadlines, months of cấm túc, gate floors) in `BAL.road.bd.<road>` — text prints the constant via kitNumVi, never a typed number.
- Odds shown only as the VANPHONG ladder words (engine does it); costs and gains level per option (law 2/3; measured by a bot ≥20 lives per road, npc-roads-bal.js style).

### (e) Split
- E14 (me): bd_san + bd_soi, BDP, legacy/migration, assemble, jbalbd lead block, tests + measure harness.
- Writer 2: bd_tuyet + bd_hen to the ROAD_MAP §4.5b outline in `jrd_bd2.js` + the writer-2 block of jbalbd.js; base = review/bd-roads after my scaffold commit (I will message Foreman E «SCAFFOLD bd-roads <sha>» once jrd_bd.js helpers + empty jrd_bd2.js + jbalbd.js + assemble entries are pushed, so writer 2 starts on a building tree). Writer 2 pushes to `review/bd-roads-w2`; I merge.
- Both: every chapter = equal-value options (gain-only ok, never cost-only), two-way, real evidence/people/objects, harder with rank, cổ trang words, raw option names carrying the GE Chuỗi/Khóa intents of GRAND_ENDINGS §3/§4.2 with thiện- and ác-leaning options on every Chuỗi.

## §WRITER 2 — bd_tuyet + bd_hen (E14b, opus; branch review/bd-roads-w2, base review/bd-roads @23647ebf, merged 61b40bfe; head ecd14280)
PRIORITY #1 CHECK ('bd_tuyet' / 'bd_hen' / 'Năm tuyết trắng' / 'Lời thề bên đống đá'): OD 18/11 ~22:05Z (GE D2 = own 4 roads) | main: none (no bd_tuyet / bd_hen code; dtq_bien «Khói lửa Nhạn Môn» is a different road, no reuse) | review/*: review/bd-roads (scaffold + bd_san/bd_soi, BDP book, BD97, lead number helpers bdR/bdS/bdX/bdE/bdG — reused), review/grand-endings-design §3 bd rows (GE intents) | claims: E14 (lead), me (writer 2).
START_CTX ≈ 4 % of the window.

### Files (only these two)
- `dev/build/jrd_bd2.js`: `ARC67.bd_tuyet` / `ARC67.bd_hen` (.4, arcFx, o:"bd") + RTHEME67 entries + `BD97.push` (.4 rares) · rdDef `.5–.11` for both · `RD97L.push(rdRare(…))` (.11 rares) · object helper `bdO` (fb "bd.o.<thing>").
- `dev/build/jbalbd.js` writer-2 block: `BAL.arc.fx.bd_tuyet|bd_hen`, `BAL.arc.rare.bd_tuyet|bd_hen`, `BAL.road.fx.bd_tuyet_5…11|bd_hen_5…11`, `BAL.road.rare.bd_tuyet_11|bd_hen_11`; uses the lead's bdR / bdS / bdX (law 5: `["-m","rank",BAL.road.bd.rk]` on every risky option and climax) / bdE / bdG, plus `bd2E` (bdE + the e67bien ending amounts). No typed number in any text (ONE CORE); rare bars print `BAL.arc.rare.<road>.bar` / `RR(id).bar`.

### Per-chapter table
| ch | bd_tuyet · Năm tuyết trắng | bd_hen · Lời thề bên đống đá |
|---|---|---|
| .4 | Năm tuyết trắng — A Sử Na Cát begs grain at Nhạn Môn; win Lương qua cửa ải / win2 Lương đổi ngựa / mid / lose Cửa ải đóng; j97 rare «Tuyết tan giữa đông» (rw nt_hocuu) | Lời thề bên đống đá — Phong rides in with the embassy guard; win / win2 Chàng ở lại kinh thành / mid / lose Lời đồn theo chân ngươi; j97 rare «Hòn đá thề trở về» (rw ngocboi) |
| .5 | Kho Thường Bình — ask / buy / pledge the dowry chest (hoimon "kho"); granary ledger evidence; {v}'s grain house | Hòn đá trong tay áo — keep (da "ta") / return ("tra") / show the Emperor ("vua") / bury ("chon"); maid who saw the bag |
| .6 | Chợ lương đổi ngựa — the price: fair, Binh bộ's rule, or mares / the south pasture; wet grain sack, skimmed horses | Kết nghĩa — sworn brotherhood before the court; who presides; exchange of knife and hairpin (dao) |
| .7 | Cướp biên — the chief binds the raiders / they flee; mercy, law, heads at the gate; {v}'s cousin in Binh bộ (two-way) | Trận đấu vật — the poisoned cup (chen "ta"/"thaiy"/"dly"); thái y; {v}'s steward (two-way) |
| .8 | Người lánh nạn ở Nhạn Môn — tents under the wall, a spy in the camp, census | Lá thư bị chặn — mistranslation by {v}'s Tứ Di quán interpreter / a true letter (thu "dly"/"dot"/"vua"); intercept {v}'s letter (two-way) |
| .9 | Sốt trong trại — steppe cure, thái y, or fire; lose = A Sử Na Cát dies (bdKill) | Ngục Đại Lý tự — Phong jailed (w "nguc"); jailer, witness, her written statement |
| .10 | Mở cửa ải — the gate tally (lenhbai "ta"/"tra"/"asnc"); open for people / for the whole tribe (only if she holds the tally or bought the small gate) / hold | Đêm trước phiên xử — plead, the steward, or open the cell (flag mo); win freed (kinh, or tn if fled) / mid exiled (tn) / lose dies (bdKill) |
| .11 | Khúc ca mùa xuân — the winter song (khuc "thien"/"oan", ge4 written in t1); results Mùa xuân mang tên ngươi / Tuyết tan, người ở lại / Mùa xuân không về; RD97L «Bia đá bên ải Nhạn Môn» (rw bienngu) | Lời thề sau cùng — with him / exiled / his coffin (openings by bdAlive); results Lời thề giữ trọn / Người đi, lời ở lại / Lời thề nhuốm máu; RD97L «Hoàng thượng làm chứng lời thề» (rw nt_dongchau, needs Phong alive) |

People (law 6b): A Sử Na Cát (BDP asnc: met .4, w "ai" .8, killed on .9 lose, w "tn" .11) and Thác Bạt Phong (BDP phong: w "kinh" .4, "nguc" .9, freed / exiled / killed .10) read by later openings (`bdAlive`). Everyone else is a standing office (Lang trung bộ Hộ, lão tướng trấn thủ Nhạn Môn, Đại Lý tự, Tứ Di quán, Hồng Lô tự, Thận hình ty) or the cast rival {v}. No new BDP person.
Objects (law 6c): dowry chest, gate tally, winter song, oath stone, knife, poisoned cup, seized letter — each has an owner state in fb `bd.o.*`, moved only by a choice, never vanished (sold = "ban" for the tribe's goats; burnt letter = "dot").
Two-way (law 1): every {v} beat has an option that does back to {v} what {v} does (counter-memorial, dig {v}'s cousin's horse book, intercept {v}'s letter, name {v}'s steward).
GE reach (§3 rows) — options carry both shadings on every Chuỗi (raw names for the GE wave): ge1 relief («tự ra ải phát lương», «Gửi áo bông…», «Nhận sợi dây da…» / ác «Nhắn trưởng lão: con gái thì phải nghe lời»); ge2 trade («giá công bằng», «mỗi năm mở chợ lương đổi ngựa» / ác «đồng cỏ phía nam sông», «Đòi ngựa cái chửa»); ge3 gate («mở cửa cho người, đóng cửa với giặc» / ác «Tự trao lệnh bài…», «mua chuộc lính giữ cửa nhỏ», «Giữ lệnh bài…»); ge4 song («Viết khúc ca tuyết trắng» / ác «Viết khúc ca oán»). bd_hen: ge1 («Giữ hòn đá trong tay áo», «chờ ta ở cửa Tây», «Cho ngục tốt mở cửa…» ác), ge2 («Đưa hòn đá cho Hoàng thượng», «Chôn hòn đá…», «Khai: không quen…», «người {land} nóng tính, xin xử nghiêm» ác), ge3 («Uống bát rượu kết nghĩa», «nghĩa huynh của Đại Hy» / ác «xin chàng làm thị vệ của cung»), ge4 (Phong dead: «Thề trước linh cữu: đòi máu cho chàng» ác / «truy tội kẻ đã giết chàng» thiện). Flag counts per chapter (thiện-leaning an/nghia/that/le vs ác uy): bd_tuyet 9–12 / 2–5, bd_hen 3–11 / 1–4 (+ tinh / phan neutral).

### Measures and tests (build file:///…/dev/index.html of this branch)
- Structure probe (scratch chk.js): both roads rdFull, 8 chapters, R97 + RD97L rows present, every beat's numbers array length = its options, no go: using G without its g amounts, every option has a cost, new bd pool = bd_san, bd_soi, bd_tuyet, bd_hen; 0 page errors.
- Option level (scratch val.js, one value scale per stat, risky options at their real odds): mean spread per beat bd_tuyet+bd_hen 1.04 (lead roads 1.26), max 2.0; no free-gain option (every sure option has a cost; gain-only none).
- road-rare.js bd_tuyet,bd_hen: ALL PASS (E.r97, road tally, rare fired → ✦ tag + title + finale, recast told, 0 page errors).
- npc-roads-tokscan.js: titleBad 0, tagBad 0, errs 0.
- dev/measure/bd-roads-bal.js (lead harness) 20 lives per road: no-loss options 0, beats with spread > 6: 0 (three beats levelled in ecd14280), rolled options not harder at higher rank 0, digits/% 0, unknown tokens none; bot bd_tuyet 20/20 reach .11 (win 4 · mid 10 · lose 6), bd_hen 20/20 reach .11 (win 11 · mid 3 · lose 6); page errors 0.
- road-full.js: life 1 of bd_tuyet walked .1–.14 in order (4:bd_tuyet … 11:bd_tuyet_11, fin «Mùa xuân mang tên ngươi»); the long 20-life run then crashed the browser target (memory, run in parallel with another bot) — reachability is covered by bd-roads-bal above.
- Wording: no %, no digit, no modern word in player text; Emperor «nàng / trẫm», Thái hậu «ai gia», servants «chủ tử», officials «nương nương».
- NOT run here (lead's harness): kc-roads direct / coop-together and npc-roads bd extension, old-save migration, quickcheck gates — E14 runs them on the merged branch.

### FOR C (pictures, via MAIN; draw nothing): .4 + .11 scenes and the 4 rares — snow at Nhạn Môn with grain carts; the oath ovoo stone on a steppe hill; Phong at the Ngọ môn; the stone stele «Bia đá bên ải Nhạn Môn»; the Emperor on the west gate tower with her.
### FOR E14: merge review/bd-roads-w2 (only jrd_bd2.js + the writer-2 block of jbalbd.js).

## §BUILT (E14 lead: bd_san + bd_soi; writer 2 E14b: bd_tuyet + bd_hen on review/bd-roads-w2)
Files on review/bd-roads: `dev/build/jrd_bd.js` (BDP people book + bdMan world hook, BD_OLD filter, legacy alias loop moved verbatim from jrd_nc.js, bd_san, bd_soi), `dev/build/jrd_bd2.js` (writer 2), `dev/build/jbalbd.js` (ONE CORE numbers, lead block + writer-2 block), `dev/build/j97.js` (+1 line: appends BD97 .4 rare rows), `dev/build/jrd_nc.js` (alias block removed, header comment updated — FOR B), `dev/build/assemble.py` (jbalbd after jbalroad; jrd_bd, jrd_bd2 after jrd_nc), `dev/story/ROAD_MAP.md` §4.5b + §5.4, `dev/test/bd-legacy-save.js`, `dev/measure/bd-roads-bal.js`.

### Per-chapter table — bd_san · Mùa thu săn (GE: ge1 Thống lĩnh ngự mã · ge2 Tri kỷ lưng ngựa · ge3 Mũi tên trường săn · ge4 Về với thảo nguyên)
| Ch | Title | Cast | Results | Raw options carrying GE intents (thiện + / ác −) |
|---|---|---|---|---|
| .4 | Mùa thu săn | emp, v, Ba Đồ, Tuyết Câu | Một tên trước ngự giá / Người hiểu ngựa / Một ngày săn như mọi ngày / Tên bay gần ngự mã; ✦ j97 «Một tên hai nhạn» | ge2 «Xin ngự giá cho cưỡi Tuyết Câu theo đoàn», «Lùa nai về phía ngự giá»; ge1 «Bắn chặn đường hươu…», «Thúc Tuyết Câu chắn trước ngự mã»; + «Nhờ Ba Đồ thắng yên cho các phi tần…», «Tặng em gái {v} một con ngựa khác»; − «Khéo từ: ngựa chỉ quen tay chủ» |
| .5 | Chuồng ngựa Thượng tứ viện | emp, v, maid, Ba Đồ, Tổng quản | Chuồng ngựa nghe lời ngươi / Ngựa của Đại Hy / Tổng quản ghi hận | ge1 «Tâu xin cho Ba Đồ giữ chìa khóa», «Tâu xin hai người cùng trông»; ge3 «Giữ bản chép sổ, chờ lúc cần» (−); ge4 «Xin ngài cho Ba Đồ dắt ngựa ra»; + «Nhường con ngựa ô cho {v}»; − «Tâu rằng ngựa ô chưa thuần…» |
| .6 | Đai yên bị cắt | v, maid, emp, phu ngựa nhỏ | Kẻ cắt đai bị bắt / Đai mới, lòng không yên / Bị nói là tự vu (evidence can fail, law 6a) | ge3 «Đặt bẫy: để lộ tin còn sợi đai thứ hai» (−), «Cho người hỏi thẳng thái giám ấy» (−); ge2 «Thưa thật: có kẻ cắt đai»; + «Rút đơn, chỉ xin đổi người giữ yên», «Sang cung {v} hỏi khéo» |
| .7 | Cưỡi ngựa cùng vua | emp, v | Người cùng ngài phi ngựa / Áo cưỡi cất vào rương / Lời sớ thắng | ge2 «Nhận lời, cưỡi Tuyết Câu đi trước dẫn đường», «Xin ngài xuống ngựa hỏi dân» (+); ge1 «Xin dạy các công chúa nhỏ cưỡi ngựa…»; + «Dạy {v} cưỡi cho vững», «Lấy túi bạc bên yên chia cho dân»; − «Tâu rằng đường ngoài thành không hợp người mới học» |
| .8 | Dịch ngựa | emp, maid, v, thú y | Chuồng ngựa khỏi bệnh / Mất nửa đàn / Ngựa {land} bị đổ tội | ge1 «Dùng cách chữa thảo nguyên…», «Cùng thú y chữa theo cả hai phép»; + «Gửi {v} một gói thuốc phòng dịch», «Xin tự bỏ bạc chuộc đàn ngựa…»; − «Để thú y làm theo sách», «Mời {v} xuống chuồng xem tận mắt» |
| .9 | Hội bắn mùa xuân | emp, v, em trai nhà {v} | Cung thần của hậu cung / Tên trúng, người không nhớ / Tên trượt trước cả triều | ge1 «Nhận dạy các hoàng tử», «Đưa cây cung cho hoàng tử ngươi đã dạy»; ge3 «Giữ cách bắn cho riêng mình» (−), «Đáp: mũi tên không biết nhà ai» (−); + «Hạ cung, chúc em trai {v} thắng», «Chỉ cho các hoàng tử cách nghiêng tên» |
| .10 | Tiếng gọi thảo nguyên | maid, emp, v, Ba Đồ, {mh} | Gió bắc trong tay áo / Ngựa về chuồng / Bị bắt ở cửa Tây (cấm túc BAL.road.bd.conf.san10) | ge4 «Lên ngựa ra cửa Tây…», «Bảo Ba Đồ cứ để ngựa đó», «Cho Ba Đồ cưỡi con ngựa ấy về thăm nhà» (Ba Đồ really leaves: BDP w=tn); ge2 «Thưa: thiếp quay lại, vì ngài ở đây»; − «Hỏi lại {v} sao biết rõ thế» |
| .11 | Vi trường năm sau | emp, v, maid, Ba Đồ | Nữ kỵ bên ngự giá / Ngựa về chuồng, người về cung / Mũi tên lạc; ✦ RD97L «Hoàng thượng trao cương ngựa ngự» | ge2/ge1 «Thúc Tuyết Câu chắn mũi tên» (Tuyết Câu can be hurt: BDP), ge3 «Bắn trả về phía rừng, bắt sống kẻ bắn»; + «Nhắc {v} chỗ ấy không yên»; − «Xin Thái bộc giữ mọi xe ở sau» |

### Per-chapter table — bd_soi · Sói đầu đàn (GE §4.2: ge1 Nữ Khả hãn · ge2 Lập em làm hãn · ge3 Sói già phải chết · ge4 Con trai hai cõi)
| Ch | Title | Cast | Results | Raw options carrying GE intents |
|---|---|---|---|---|
| .4 | Sói đầu đàn | emp, v, {pv}, Hô Diên Liệt (envoy), Ô Lặc (letter) | Kim trướng chờ {pv} / Ấn của Đại Hy cho Ô Lặc / Kim trướng chưa có chủ / Thúc phụ ghi nhớ ngươi; ✦ j97 «Phụ hãn tỉnh lại» | ge2 «Tâu: Ô Lặc là con trưởng…», «Đưa lời nhắn lên Hoàng thượng»; ge1 «Tâu: chờ {pv} tỉnh…», «Giữ lời nhắn, chưa đáp»; + «Xin Hoàng thượng cho thái y theo sứ…», «Gửi ngay vòng ngọc của mẹ…»; − «Nhận ngựa thay Hoàng thượng…» |
| .5 | Hai phong thư | emp, maid, v, lão thư lại Binh bộ | Bản đồ trong tay ngươi / Không còn bản đồ / Dấu mực mới | ge2 «Trình cả hai phong thư lên Hoàng thượng», «Đốt bản chép, trình lão thư lại…»; ge1 «Giữ bản đồ, không trao ai»; ge3 «Đưa thúc phụ bản đồ giả» (−), «Nhờ lão chép một bản sai các đồn» (−); map object tracked fb bd_soi.map |
| .6 | Sứ giả mang dao | emp, maid, v, Thát Mộc (in S.men while in the capital) | Dao không tới được em / Dao trả về chủ / Thù chồng thêm thù | ge1 «Bắt sống Thát Mộc, đổi lòng y»; ge2 «Tha Thát Mộc, gửi về kèm lời nhắn» (+); ge3 «Chém Thát Mộc, gửi đầu về trướng» (−, BDP alive −1) |
| .7 | Chợ ngựa đóng cửa | emp, v | Chợ ngựa theo ý ngươi / Chợ ngựa vẫn đóng / Biên ải giằng co | ge1 «Khước từ giao kèo chợ ngựa của thúc phụ»; ge2 «Xin mở lại chợ ngựa bằng một hòa ước nhỏ», «Gửi lời: mở chợ ngựa ở ải tây…»; ge3 «Khuyên triều đình xuất binh» (−), «Gửi lời: xin xuất binh ra ải» (−) |
| .8 | Khả đôn vào kinh | emp, v, maid, {mh} (BDP kd: where moves) | Mẹ ở bên ngươi / Mẹ ở xa / Mẹ bị thương | ge2/ge4 «Đón {mh} vào cung, công khai», «Xin Hoàng thượng mở ải đón {mh}» (+); ge1 «Xin cho đội vệ của {mh} mang gươm»; ge3 «Dùng {mh} làm mồi nhử» (−); Khóa ge1 «Đưa {mh} về ải tây trong đêm», «Gửi bạc, xin bà về ải tây» |
| .9 | Hội đua ngựa mùa hạ | emp, maid, v, Ô Lặc, trưởng lão | Hồ Bạch Thủy hô tên nhà ngươi / Hội đua chia đôi / Con trai thúc phụ thắng | ge1 «Tự mình ra đua, cưỡi ngựa của em»; ge2 «Chọn một dũng sĩ đua thay em», «Nhắn dũng sĩ đua thay em…»; ge3 «Mua chuộc người chấm của thúc phụ» (−); ge4 «Cho tay đua mang cờ của hoàng tử» (beat only with a living son) |
| .10 | Đêm tuyết Âm Sơn | emp, v, Tổng binh Âm Sơn, Ô Lặc | Âm Sơn theo ý ngươi / Tuyết phủ Âm Sơn / Tuyết chôn quân | ge2 «Chỉ xin sứ thần, không xin binh»; ge1 «Đổi binh lấy lời thề của các bộ»; ge3 «Xin cả đạo quân ra ải» (−); ge4 «Nhận lời thề cho con trai» (son only) |
| .11 | Chủ nhân kim trướng | emp, v, trưởng lão | Em trai lên ngôi hãn / Thảo nguyên chia đôi / Thúc phụ thắng, mối hòa lung lay (Ô Lặc can die: BDP); ✦ RD97L «Kim trướng gọi ngươi là Khả đôn» | ge2 «Viết tên Ô Lặc»; ge1 «Thưa: thiếp» (t1); ge3 «Viết tên thúc phụ, đổi lời thề…» (−); + «Phản đối: lấy thành của người đang tang»; − «Đồng ý một tòa thành, đổi lấy chợ ngựa» |

### Old saves (law 6c)
- `BD_OLD` = bd_hoa/bd_ngua/bd_tuc/bd_hoang: still registered (premises in jorigins.js + alias chapters, the loop moved unchanged); `arcIds67("bd")` drops them for NEW lives only (and keeps them while no new road exists, so the pool is never empty). A save already on one of them keeps `S.st.f14.road` + plan ids and plays on. Test `dev/test/bd-legacy-save.js` (result below).
- NPC consorts never have origin nc/bd (BAL.nroad org lists), so jnroad's road list is untouched; FOR B if that ever changes: jnroad.js nrRoads reads `o===` directly and would need the BD_OLD filter.

### People (law 6b)
`BDP` book (jrd_bd.js): lie Hô Diên Liệt, olac Ô Lặc, thatmoc Thát Mộc, bado Ba Đồ, tuyetcau Tuyết Câu (mare), asnc A Sử Na Cát, phong Thác Bạt Phong, kd Khả đôn — each with role, goal (`want`), where (`w`: thảo nguyên / biên ải / kinh thành / ngục) and alive, kept per life in S.st.f14.fb `bd.p.<id>.*` and moved by chapter options (bdMove / bdKill / bdMeet). A steppe MAN in the capital (`man:1`, e.g. Thát Mộc during .6, Phong in bd_hen) is pushed into `S.men` as an embassy member (role Sứ thần, the envoy's schedule and lawful places, jmen) and marked away/dead when he leaves/dies — so he stands where the world shows present people.

### Tests and measures (merged branch review/bd-roads @23278b63, all 4 roads)
| Check | Result |
|---|---|
| dev/tools/quickcheck.sh (core gates one-core-guard · rules-one-source · kit-conform · coop one-world · hooks; time-spill guard; open; old LIVE save loads + plays; perf vs live) | PASS (161 s; render 180/183 ms, buổi 877/1061 ms new/live) — first run FAILED one-core-guard (rare tables keyed like fx tables; shape defaults typed in helpers) → fixed 888becec (rare tables set key by key, defaults in BAL.road.bd.def) |
| dev/test/road-full.js bd_san,bd_soi (1 life each, full frame) | 16/16 PASS (chapters 1–14 in order, .4 = premise, .5–.11 = road, rival constant, finale tells the origin end) |
| dev/test/bd-legacy-save.js (new) | 4/4 PASS: old bd_hoa life saved at .6 loads in a fresh page, keeps road bd_hoa, plays to bd_hoa_11; 8 new bd lives → only new roads {bd_san 3, bd_soi 2, bd_hen 2, bd_tuyet 1}; 0 page errors |
| dev/test/kc-roads/direct.js ORIGINS=bd,nc (bd added; new bd life must roll a new road) | PASS (bd rank 2 road bd_tuyet; nc rank 3 road nc_gian) |
| dev/test/kc-roads/coop-together.js --a=cnv --b=bd | 26/26 PASS (B = bd enters the palace, A at home, same world/date; no overflow; 0 page errors) |
| dev/measure/bd-roads-bal.js static (4 roads, 202 beats, 608 options) | no-loss options 0 · beats with value spread > 6: 0 · rolled options not harder at higher rank 0 · digits/% 0 · unknown tokens none |
| bot 20 lives / road (bd-roads-bal.js, fresh page per life) | bd_san 20/20 reach .11 (win 8 · mid 5 · lose 7) · bd_soi 20/20 (win 6 · mid 7 · lose 7, after c47c282e raised «Viết tên Ô Lặc» base 35→45; before: 1 win in 17) · bd_tuyet 20/20 (4 · 10 · 6) · bd_hen 20/20 (11 · 3 · 6) (writer 2); 0 page errors |
| npc-roads bd | not applicable: NPC consort origins (BAL.nroad org) never include nc/bd, so no NPC plays a bd road (FOR B below) |
| dev/measure/road-option-scan.js | broken on main for every jrd file (BAL fails to load stand-alone: «setting 'hp'»); replaced for bd by bd-roads-bal.js (same checks in the real build + value levels) |
| Shots | none (no UI touched; chapter cards are the j67 kit cards) |

### FOR B (Foreman B — jrd_* owner)
- jrd_nc.js: ONLY the bd alias loop left the file (moved verbatim into jrd_bd.js, legacy block) + header comment line; NCW/BDW openings and NCL.bd tokens stay (legacy bd chapters use them).
- jnroad.js nrRoads(o) reads `ARC67[id].o===o` directly; if NPC origins ever include bd, add `!BD_OLD.includes(id)` there.
- dev/measure/road-option-scan.js cannot load BAL stand-alone on main (all jrd files) — fix or retire.
### FOR C (pictures via MAIN; nothing drawn)
- bd_san: .4 autumn hunt at Bắc Uyển (she on the white mare Tuyết Câu, bow drawn, the Emperor's party), .11 the arrow from the maple wood; rares «Một tên hai nhạn» (two geese falling before the royal horse), «Hoàng thượng trao cương ngựa ngự» (she holding the imperial horse's reins).
- bd_soi: .4 the golden tent in snow, Phụ hãn lying inside; .11 the investiture edict before two kneeling envoys; rares «Phụ hãn tỉnh lại» (Phụ hãn waking, the silver wolf seal), «Kim trướng gọi ngươi là Khả đôn» (nine elders turning to her).
- writer 2's list above (bd_tuyet, bd_hen). Chapter .5–.10 cards use the road theme pictures (RTHEME67 emp/maid) unless C wants per-chapter art.
### FOR E
- Law 6b people: steppe men in the capital are in S.men (embassy role, jmen schedule; away = off schedule). NOT yet in the world: women guests (Khả đôn living in the capital/her palace at bd_soi .8+) and the stable groom Ba Đồ (a servant, BDP only) — they have a living state (where/alive/goal) in BDP and every chapter reads it, but they do not stand on a map stage. If the BIG review wants them on stage, that needs a jworld guest/servant hook (not roads).
- The 16 grand endings (jgedata_bd.js) = next wave; Chuỗi/Khóa raw names are in the tables above + writer 2's GE reach list.

## READY
«SẴN SÀNG KIỂM bd-roads 23278b63» sent to Foreman E ROOT #8 (session_01DgYSWoyrPRWJPqSp4gfECg). Worktree /home/user/wt/bdr kept until the review verdict.

## HANDOVER (E14 → successor, 19/11 ~05:55Z) — round 2 fixes after E14r FAIL (reports/bd-roads-review.md)
Rollover reason: context 43.5 % ≥ START_CTX 3 % + 25 % (owner OD:L1217 / 16/11 s14). The COORDINATOR (Foreman E #8, session_01DgYSWoyrPRWJPqSp4gfECg) opens the successor; E14 stops here.
State: branch review/bd-roads @23278b63 (pushed, clean). Worktree /home/user/wt/bdr (sparse, hooks installed) — the successor can reuse it or make its own. Scratch logs /home/user/wt/bdr-scratch (bot / road-full logs, built copies idxN.html).
Split for r2 as before: lead = bd_san + bd_soi + shared code (jrd_bd.js, measure, merge); E14b (session_01DgYSWppboKRwbR35fzT2U4) = bd_tuyet + bd_hen in jrd_bd2.js + writer-2 block of jbalbd.js.
Fix plan (lead's part; each a whole family over all 4 roads, scan + before/after table):
1. Law 2 climaxes (32 x1 beats): numbers only, in dev/build/jbalbd.js x1 rows (bdX(base,stat,flag,cost)). Rule: the option whose endings are [win,mid] or ["mid","lose"] or "mid" must NOT have higher base AND lower cost AND softer fail than the [win,lose] option — give the [win,lose] option the higher base (e.g. 45) and the [win,mid] option the lower (e.g. 30), or a bigger ending payoff via the ending fx; the "mid only" option keeps its cost and gains duc only. First fix the measure: dev/measure/bd-roads-bal.js:28 `if(!o.e)vs.push(...)` → also value e: options (p·value(win ending fx) + (1−p)·value(fail ending fx) + cost) and add a dominance flag (odds ≥ AND cost ≤ AND fail ending k ≥ another option's, one strictly) → table before/after for all 32.
2. Law 6b moved people: bd_san .10 c1 «Cho Ba Đồ cưỡi con ngựa ấy về thăm nhà» (bdMove bado tn) — then .10 x1 / .11 text and options naming Ba Đồ or the west-gate horse must read bdP("bado","w") / RD_FL("bd_san.westgate"): add beat `if:` variants or a told return (e.g. .11 opening line "Ba Đồ đã về lại kinh" + bdMove("bado","kinh") in .11 s1/s2 go only if he left; or swap option text by a function). Scan every BDP id (lie, olac, thatmoc, bado, tuyetcau, asnc, phong, kd) after each move/kill in all 4 roads (grep bdMove/bdKill, then every later chapter mentioning the name).
3. Law 6c objects: reuse writer 2's `bdO` (jrd_bd2.js) — MOVE it into jrd_bd.js as the one helper (jrd_bd2 loads after, so define it first in jrd_bd.js and delete the copy in jrd_bd2.js), set it on every give/buy/receive in bd_san/bd_soi: ngựa ô given to {v} (.5 c2), dao cắt cỏ (.6 c2), cây cung sừng (.9 E.win), ngựa trắng bought (.10 s2), con ngựa hồng to {v}'s sister (.4 c1), vòng ngọc (.4 s1 bd_soi), chim ưng non (bd_soi .5 s2) and «Gửi chim ưng tìm em» (.10 s2 — only if the hawk is still held: beat/option `if`), sợi đai (already RD_FL bd_san.girth → move onto bdO), bản đồ (bd_soi.map → bdO), thư (bd_soi.letters → bdO). Table: object · owner before → after · chapter.
4. Merge origin/main 56e0ec51 (conflicts index.html, sw.js, assemble.py): keep main's assemble list + 'jbalbd.js' after 'jbalroad.js' and 'jrd_bd.js','jrd_bd2.js' after 'jrd_nc.js'; take main's index.html/sw.js then rebuild with bash dev/site/build_site.sh.
Rerun after fixes (all on the merged build): road-full (1 life/road, all 4), dev/test/npc-roads.js (timeout > 2400 s), bot 20 lives/road (dev/measure/bd-roads-bal.js <url> 20 <road> — one road per process, fresh page per life, ~3 min/life; goto WITHOUT waitUntil domcontentloaded), static measure, bd-legacy-save, kc-roads/direct ORIGINS=bd, quickcheck. Then «SẴN SÀNG KIỂM bd-roads <sha> r2» to Foreman E #8.
Gotchas: ending go = (A,G) for .5–.11 / (_A,_ok,G) for .4 arcs + BD97 rows; rare x text reads BAL.arc.rare.<id>.bar directly (AR not defined at load); rare tables set key by key (one-core-guard); helper defaults live in BAL.road.bd.def; two big chromium pages at once can crash (renderer ~5 GB).

## §ROUND 2 (E14c, lead; successor of E14) — state at rollover 19/11 ~07:05Z
PRIORITY #1 CHECK ('bd-roads r2' / 'Ba Tư'): review/bd-roads @ 23278b63 (E14, FAIL r1) | reports/bd-roads-review.md (4 fixes) | OD 19/11 ~06:40Z/~06:42Z/~06:50Z (princess origin Bắc Địch → Ba Tư; Bắc Địch stays in court events) | E19 mapping reports/foreign-princess-3-history.md @1d778b78 | claims E14 → E14c; writer 2 E14b.
START_CTX ≈ 3 %; rollover at 36 % (≥ 3 % + 25 %). Branch head: **review/bd-roads @ add24c42** (pushed). NOT yet sent «SẴN SÀNG KIỂM» (Foreman E: one READY after r2 fixes + Ba Tư rewrite of all 4 roads).

### Fix 4 — merge main: DONE (d51b86b0, origin/main 56e0ec51; assemble keeps jbalbd.js after jbalroad.js and jrd_bd.js, jrd_bd2.js after jrd_nc.js; site rebuilt).
### Fix 1 — law 2 climaxes: lead DONE, writer 2 in progress
- Measure gap closed: dev/measure/bd-roads-bal.js now values e: options (p·V(win ending) + (1−p)·V(fail ending) + own w + cost), checks DOMINANCE (odds ≥, cost ≤, fail k ≥, win k ≥, one strict) with NO flag and with ALL the beat's flags on; text functions are checked for digits/tokens too. `STATIC=1 XROWS=1 node dev/measure/bd-roads-bal.js <url> 0 <roads>`.
- Rule applied: soft-fail ([x,mid]) option base 30 vs hard-fail 45 (gap > flag bonus 10); among hard-fail options the higher base also costs more; .4 arcs halve costs (−3 and −2 both → −1), so a .4 cost gap needs e.g. {suc:-4}.
- Before (r1 build): dominated beats bd_san 7, bd_soi 7, bd_tuyet 6, bd_hen 6 (14/18/12/12 rows over two flag states); spread>6: bd_soi 2, bd_tuyet 1, bd_hen 5. After lead rows: bd_san 0/0, bd_soi 0/0. bd_tuyet/bd_hen: E14b's part (not merged yet).
- Lead climaxes, before → after (p at neutral life · weighted cost · win k/fail k):
| climax | before (p · cost · win/fail k per option) | dom. before | after | dom. after |
|---|---|---|---|---|
| bd_san | «Giương cung bắn con lợ…» p38 cost0.7 1/-1 / «Thúc Tuyết Câu chắn tr…» p48 cost0.7 1/0 / «Hô cấm quân, chỉ lối c…» p100 cost2.0 0/0 | yes | «Giương cung bắn con lợ…» p48 cost0.7 1/-1 / «Thúc Tuyết Câu chắn tr…» p33 cost0.7 1/0 / «Hô cấm quân, chỉ lối c…» p100 cost2.0 0/0 | no |
| bd_san_5 | «Tâu xin cho Ba Đồ giữ …» p38 cost2.1 1/-1 / «Tâu xin hai người cùng…» p48 cost1.4 1/0 / «Thưa: việc của Thượng …» p100 cost2.0 0/0 | yes | «Tâu xin cho Ba Đồ giữ …» p48 cost2.1 1/-1 / «Tâu xin hai người cùng…» p33 cost1.4 1/0 / «Thưa: việc của Thượng …» p100 cost2.0 0/0 | no |
| bd_san_6 | «Trình sợi đai, con dao…» p38 cost2.1 1/-1 / «Đặt bẫy: để lộ tin còn…» p38 cost2.1 1/-1 / «Rút đơn, chỉ xin đổi n…» p100 cost2.0 0/0 | no | «Trình sợi đai, con dao…» p38 cost2.1 1/-1 / «Đặt bẫy: để lộ tin còn…» p38 cost2.1 1/-1 / «Rút đơn, chỉ xin đổi n…» p100 cost2.0 0/0 | no |
| bd_san_7 | «Xin dạy các công chúa …» p38 cost2.1 1/-1 / «Xin ngài để thiếp tự đ…» p43 cost2.0 1/-1 / «Thưa: thiếp thôi cưỡi …» p100 cost2.0 0/0 | yes | «Xin dạy các công chúa …» p38 cost2.1 1/-1 / «Xin ngài để thiếp tự đ…» p43 cost3.0 1/-1 / «Thưa: thiếp thôi cưỡi …» p100 cost2.0 0/0 | no |
| bd_san_8 | «Dùng cách chữa thảo ng…» p38 cost2.1 1/-1 / «Cùng thú y chữa theo c…» p48 cost1.4 1/0 / «Thưa: thiếp không dám …» p100 cost2.0 0/0 | yes | «Dùng cách chữa thảo ng…» p48 cost2.1 1/-1 / «Cùng thú y chữa theo c…» p33 cost1.4 1/0 / «Thưa: thiếp không dám …» p100 cost2.0 0/0 | no |
| bd_san_9 | «Tự giương cung bắn mũi…» p38 cost2.1 1/-1 / «Đưa cây cung cho hoàng…» p48 cost1.4 1/0 / «Hạ cung, chúc em trai …» p100 cost2.0 0/0 | yes | «Tự giương cung bắn mũi…» p48 cost2.1 1/-1 / «Đưa cây cung cho hoàng…» p33 cost1.4 1/0 / «Hạ cung, chúc em trai …» p100 cost2.0 0/0 | no |
| bd_san_10 | «Ở lại, xin Hoàng thượn…» p43 cost1.4 1/-1 / «Lên ngựa ra cửa Tây, p…» p38 cost2.1 1/-1 / «Bảo Ba Đồ dắt ngựa về …» p100 cost2.0 0/0 | yes | «Ở lại, xin Hoàng thượn…» p38 cost1.4 1/-1 / «Lên ngựa ra cửa Tây, p…» p43 cost2.1 1/-1 / «Bảo Ba Đồ dắt ngựa về …» p100 cost2.0 0/0 / «Thắng Tuyết Câu, ra cử…» p43 cost2.1 1/-1 / «Đóng cửa sổ, ngồi đến …» p100 cost2.0 0/0 | no |
| bd_san_11 | «Thúc Tuyết Câu chắn mũ…» p38 cost2.1 1/-1 / «Bắn trả về phía rừng, …» p38 cost1.4 1/-1 / «Kéo cương ngự mã chạy …» p53 cost2.0 0/-1 | yes | «Thúc Tuyết Câu chắn mũ…» p43 cost2.1 1/-1 / «Bắn trả về phía rừng, …» p38 cost1.4 1/-1 / «Kéo cương ngự mã chạy …» p53 cost2.0 0/-1 | no |
| bd_soi | «Tâu: chờ {pv} tỉnh, ch…» p43 cost0.7 1/-1 / «Tâu: Ô Lặc là con trưở…» p38 cost0.7 1/-1 / «Thưa: việc ngoài ải, t…» p100 cost2.0 0/0 | yes | «Tâu: chờ {pv} tỉnh, ch…» p43 cost1.4 1/-1 / «Tâu: Ô Lặc là con trưở…» p38 cost0.7 1/-1 / «Thưa: việc ngoài ải, t…» p100 cost2.0 0/0 | no |
| bd_soi_5 | «Giữ bản đồ, không trao…» p43 cost1.4 1/-1 / «Đưa thúc phụ bản đồ gi…» p38 cost2.1 1/-1 / «Đốt bản chép, trình lã…» p48 cost2.0 0/-1 | yes | «Giữ bản đồ, không trao…» p43 cost2.1 1/-1 / «Đưa thúc phụ bản đồ gi…» p38 cost1.4 1/-1 / «Đốt bản chép, trình lã…» p48 cost2.0 0/-1 | no |
| bd_soi_6 | «Bắt sống Thát Mộc, đổi…» p38 cost2.1 1/-1 / «Tha Thát Mộc, gửi về k…» p48 cost1.4 1/0 / «Chém Thát Mộc, gửi đầu…» p43 cost3.0 1/-1 | yes | «Bắt sống Thát Mộc, đổi…» p38 cost2.1 1/-1 / «Tha Thát Mộc, gửi về k…» p33 cost1.4 1/0 / «Chém Thát Mộc, gửi đầu…» p43 cost3.0 1/-1 | no |
| bd_soi_7 | «Gửi lời: mở chợ ngựa ở…» p43 cost1.4 1/-1 / «Gửi lời: xin xuất binh…» p38 cost3.0 1/-1 / «Gửi lời: thiếp xin khô…» p100 cost2.0 0/0 | yes | «Gửi lời: mở chợ ngựa ở…» p38 cost1.4 1/-1 / «Gửi lời: xin xuất binh…» p43 cost3.0 1/-1 / «Gửi lời: thiếp xin khô…» p100 cost2.0 0/0 | no |
| bd_soi_8 | «Đón {mh} vào cung, côn…» p43 cost1.4 1/-1 / «Phục sẵn thị vệ, bắt n…» p38 cost3.0 1/-1 / «Đưa {mh} về ải tây tro…» p53 cost2.0 0/-1 | yes | «Đón {mh} vào cung, côn…» p38 cost1.4 1/-1 / «Phục sẵn thị vệ, bắt n…» p43 cost3.0 1/-1 / «Đưa {mh} về ải tây tro…» p53 cost2.0 0/-1 / «Đưa {mh} đi sâu vào bộ…» p53 cost2.0 0/-1 | no |
| bd_soi_9 | «Tự mình ra đua, cưỡi n…» p38 cost2.1 1/-1 / «Nhắn dũng sĩ đua thay …» p48 cost3.0 1/0 / «Nhắn em: thua cũng đượ…» p100 cost2.0 0/0 | no | «Tự mình ra đua, cưỡi n…» p38 cost2.1 1/-1 / «Nhắn dũng sĩ đua thay …» p48 cost3.0 1/0 / «Nhắn em: thua cũng đượ…» p100 cost2.0 0/0 | no |
| bd_soi_10 | «Chỉ xin sứ thần, không…» p43 cost1.4 1/-1 / «Đổi binh lấy lời thề c…» p43 cost1.4 1/0 / «Xin cả đạo quân ra ải…» p38 cost3.0 1/-1 | yes | «Chỉ xin sứ thần, không…» p43 cost1.4 1/-1 / «Đổi binh lấy lời thề c…» p28 cost1.4 1/0 / «Xin cả đạo quân ra ải…» p48 cost3.0 1/-1 | no |
| bd_soi_11 | «Viết tên Ô Lặc…» p48 cost2.1 1/-1 / «Viết: chia thảo nguyên…» p48 cost1.4 0/-1 / «Viết tên thúc phụ, đổi…» p53 cost3.0 0/-1 | no | «Viết tên Ô Lặc…» p48 cost2.1 1/-1 / «Viết: chia thảo nguyên…» p58 cost1.4 0/-1 / «Viết tên thúc phụ, đổi…» p63 cost2.0 0/-1 | no |


### Fix 2 — law 6b moved people: lead DONE
- bd_san .10: the west-gate horse is an object (bdO "nguatay": gate/chuong/bado); x1 text + options follow it (if-variants, fx rows 4–5 in BAL); .11 cast(): if Ba Đồ (now Bạc Đồ) is away he returns with a told line (g function, fb bd_san.badove) and the horse goes back to the stable.
- bd_soi .8: Khả đôn (now Vương hậu) — capital (temple outside the walls / Lễ bộ guest house) or western border; c1/c2 only in the capital, new c3 at the border (BAL row = c1), t1/x1/E.win/.11 s1 texts by place, x1 variant «Đưa {mh} … trong đêm» at the border (BAL row 4).
- bd_soi .11 E.lose: Ô Lặc (Nê Niết Sư) dead vs «lưu lạc».
- Scan: `python3 dev/measure/bd-scan.py [files]` (6b away moves → later lines guarded/UNGUARDED; `/*bd6b: why*/` notes). Before (23278b63): jrd_bd.js 6b unguarded 9 (bado 6, olac 3); after: 0. jrd_bd2.js (writer 2) before: asnc 1, phong ≈20 (heuristic) — E14b fixing.
### Fix 3 — law 6c objects: lead DONE
- bdO (fb "bd.o.<thing>") is ONE helper in jrd_bd.js (copy removed from jrd_bd2.js). Booked now: nguahong (→ em gái {v}), nguao (→ {v}), so (vua/tongquan/chep), dai (girth; was RD_FL bd_san.girth), daocat, cungtd (tiên đế bow), nguatrang (bought), nguatay, cungvua (lent at .11 t1, handed back at every .11 ending), vongngoc, nguasu, ansoi (.4 rare → ta; .11 s1 only if held, else a mourning-letter variant, BAL row 4), chimung (.5 s2 received; .10 «Gửi chim ưng» only if held, lost on fail; trader variant BAL row 4), yen, bando (was RD_FL bd_soi.map), thuluc (was RD_FL bd_soi.letters). Non-objects marked `/*bd6c: why*/` (a person, a skill, the bow lent for one shot).
- Scan before: 59 give/buy options, 18 NO BOOK; after: 62 options, 39 booked, 23 used up, 0 NO BOOK. jrd_bd2.js before: 11 NO BOOK — E14b fixing.

### BA TƯ rewrite (Foreman E order 06:48Z, E19 §A.2/§C.2) — lead roads + origin DONE, writer 2 in progress
- One per-life switch in jrd_bd.js: bdLegacy() (road in BD_OLD) → bdCountry() "bd"/"bt"; bdTxt(old,new); bdTxtProp(obj,key,old,new) (getter). NCL.bt token row: {land} Ba Tư, {pv} Phụ vương, {mh} Vương hậu, {quan} Vương trung vương, {pa} Thế tử huynh, {pb} Vương thúc, {canh} {laq} {nden}. Foreman E ruling: an OLD save (bd_hoa/ngua/tuc/hoang) stays wholly Bắc Địch, every new life wholly Ba Tư.
- BDP people: lie Mi Hồ Lan (vương thúc, house Mihran) · olac Nê Niết Sư · thatmoc Đạt Lỗ · bado Bạc Đồ · tuyetcau Ngọc Câu · asnc A La Hám (lão tướng trấn Tật Lăng) · phong Mật Hồ Đạt (writer 2's name) · kd Vương hậu. Capital = «Tô Lận» (Suishu 蘇藺城 = Ctesiphon; chosen over «Taq»; FOR E19: please confirm).
- bd_san → «Mã cầu và săn hổ» (.9 «Mã cầu và hội bắn xuân», .10 «Tiếng gọi con đường tơ lụa», Kim Quang môn, Tây Thị, cỏ mục túc…). bd_soi → «Ngai vàng Tô Lận» (.7 «Tây Thị bị chặn đường tơ lụa», .8 «Vương hậu vào kinh», .9 «Trận mã cầu chọn ngôi», .10 «Đoàn hộ tống trên Thông Lĩnh», .11 «Người ngồi ngai vàng»; rares «Phụ vương tỉnh lại», «Tô Lận tôn ngươi làm Nữ vương»; ấn sói → nhẫn ấn có cánh, key ansoi kept). Ids, keys, flags, option order/count, numbers unchanged (skeleton diff identical); rare path/bad entries re-matched.
- Origin-level rows on the switch (39 calls, listed by bd-scan.py): jorigins ORIGIN_BR.bd n/land/t, STORY.bd, QUEST67.bd, GE_ID.bd, ORIGIN_LORE.bd; jkc2 KC2LAND.bd + KCPL nb_* + family names + home cards + treaty/sending-off; joi OI_TXT/OI_CAP/OI_SELT; jentry ENT_INTRO/ENT_LINE. Court-event Bắc Địch untouched (j54/j55/jht/jct2/jk2b/jroad/jrdhp; jgedata_w1:284 dtq ending left). jgecat.js regenerated from cat.py (bd_san/bd_soi road + GE names: Theo đường tơ lụa / Cướp ngựa về tây, Nữ vương Tô Lận / Nữ vương sắt máu, Lập em làm vua / Dựng vua bù nhìn, Vương thúc phải chết / Bắt thúc giao triều); ge-guard 6/6, ge-engine 104/104.
- New test dev/test/bd-batu-switch.js: old life 16 rows all Bắc Địch, new life 16 rows all Ba Tư, 0 page errors; steppe words left in road texts: bd_san/bd_soi 0, bd_tuyet/bd_hen 145 (writer 2 not merged yet) → FAIL until then.

### Tests run so far (review/bd-roads builds)
| Check | Result |
|---|---|
| one-core-guard | PASS (after fixes 1–3) |
| bd-roads-bal static, bd_san + bd_soi | no-loss 0 · spread 0 · dominated 0 · not-harder 0 · digits 0 · tokens ok · page errors 0 (final Ba Tư build 8fe88f15) |
| bd-scan.py jrd_bd.js | 6b 0 unguarded · 6c 0 NO BOOK |
| scenario probe (Ba Đồ away/back, Vương hậu at border, hawk/seal variants) | correct, 0 page errors |
| ge-guard / ge-engine | 6/6 / 104/104 |
| bot bd_soi (structure build 7c3921bf-b7605b0a, Bắc Địch text) | 12/12 lives reached .11, 0 errors (killed at rollover); .11 tally: 0 win · 8 mid · 4 lose → WATCH: no .11 win in 12 (r1 had 6/20). Cause likely .11 x1: soft options raised to 55/60 for the spread; «Viết tên Nê Niết Sư» p48 is the only win road (+ rare). If 20 lives give < 2 wins, lower «chia» 55→50 / «vương thúc» 60→55 or raise the win option 45→50 and re-check spread/dominance. |
| bot bd_san | crashed when run beside bd_soi (two pages, renderer memory) → must run ALONE |
| NOT yet run | road-full ×4, npc-roads (>2400 s), road-rare, bd-legacy-save, kc-roads direct + coop-together, bot 20 lives × 4 roads on the FINAL build, quickcheck, tokscan (npc-roads-tokscan.js), vp |

## HANDOVER (E14c → successor, 19/11 ~07:05Z)
Rollover reason: context 36 % ≥ START_CTX 3 % + 25 % (owner OD:L1217 / 16/11 s14). The COORDINATOR (Foreman E, session_01DgYSWkgmeMCRaqRT4UCEJE) opens the successor; E14c stops.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
State: review/bd-roads @ add24c42 pushed, clean (local untracked dev/idx_r2a.html + .claude/ excluded via .git/info/exclude). Writer 2 E14b = session_01DgYSWppboKRwbR35fzT2U4: doing r2 fixes 1–3 + Ba Tư rewrite of bd_tuyet («Năm đoàn người chạy nạn») + bd_hen («Lời thề trước lửa thánh») in jrd_bd2.js + writer-2 block of jbalbd.js on review/bd-roads-w2; told to merge review/bd-roads (latest add24c42) first and send «W2 R2 READY <sha>» to the LEAD — the successor must tell E14b its own session id at once.
Successor steps:
1. On «W2 R2 READY <sha>»: merge origin/review/bd-roads-w2 (only jrd_bd2.js, writer-2 jbalbd block, maybe cat.py rows of bd_tuyet/bd_hen — else ask E14b for titles + 4 GE names each ≤4 chữ, edit cat.py rows + OTHER map, `python3 dev/test/ge_guard/gen_js.py && node dev/test/ge-guard.js` → 6/6); `bash dev/site/build_site.sh`.
2. Gates on the merged build: `STATIC=1 XROWS=1 node dev/measure/bd-roads-bal.js <url> 0` (all 4: 0 no-loss/spread/dominated/digits); `python3 dev/measure/bd-scan.py` (0 UNGUARDED, 0 NO BOOK, origin rows listed); `node dev/test/bd-batu-switch.js <url>` → PASS; one-core-guard; ge-guard/ge-engine.
3. bd_soi .11 win rate (see table) — check over 20 lives, adjust numbers in jbalbd.js bd_soi_11 x1 if needed (keep 0 dominated / spread ≤ 6).
4. Full rerun list (ONE chromium page at a time — two crash): bot 20 lives/road (`node dev/measure/bd-roads-bal.js <url> 20 <road>`, copy dev/index.html to dev/idx_r2b.html first so rebuilds do not disturb it), road-full (all 4), npc-roads (timeout > 2400 s), road-rare, bd-legacy-save (old save must also stay wholly Bắc Địch), kc-roads direct ORIGINS=bd,nc + coop-together --a=cnv --b=bd, tokscan, quickcheck (dev/tools/quickcheck.sh).
5. Append §ROUND 2 results (tables above + writer 2's tables) here; push review/bd-roads; send ONE «SẴN SÀNG KIỂM bd-roads <sha> r2» to Foreman E (session_01DgYSWkgmeMCRaqRT4UCEJE) → E14r session_01DgYSWnZE2bT1FR9J6cjqDy.
FOR E19 / Foreman E: (a) «Tô Lận» (蘇藺城) as the capital — confirm; (b) GRAND_ENDINGS.md (review/grand-endings-design) still names bd roads/GE in steppe words — the GE design doc must follow cat.py (law 14); (c) art FOR C lists in §BUILT are Bắc Địch scenes — must be redone for Ba Tư (Foreman C, via MAIN).
Gotchas: text functions (t/g/rt/E.t/rare t as ()=>…) go through fill67 — fine; option `if:` variants need their own BAL fx row at the same index (rdFx maps by index of the full list); bdO(k,v) returns "" (safe inside go); rdFb treats 0 as unset.

## §WRITER 2 r2 — fixes for review r1 (bd_tuyet + bd_hen; E14b, review/bd-roads-w2, base review/bd-roads @d51b86b0)
PRIORITY #1 CHECK ('bd-roads r2'): review r1 dev/handover/reports/bd-roads-review.md (FAIL: law 2 climaxes, 6b moved people, 6c objects) | review/bd-roads @d51b86b0 (main merged, bdO moved into jrd_bd.js — reused, my copy gone) | claims: E14c lead, me bd_tuyet + bd_hen. Touched only jrd_bd2.js + the writer-2 block of jbalbd.js.

### (1) Law 2 — climaxes (all 16 x1 of bd_tuyet + bd_hen), lead rule: soft-fail option base ≥ 15 below every hard-fail option, never cheaper-and-likelier
| chapter | hard fail [win, lose] before → after | soft fail [win/win2, mid] before → after | sure mid |
|---|---|---|---|
| bd_tuyet .4 | 35 · suc −3 → 45 · suc −3 | 45 · suc −2 → 30 · suc −2 | danh −2 → duc +1 |
| bd_tuyet .5 | 35 → 45 | 45 · bac −80 → 30 · bac −40 | same |
| bd_tuyet .6 .7 .8 .11 | 35 → 45 | 45 (.11: 40) · suc −2 → 30 · suc −2 | same |
| bd_tuyet .9 | 35 → 45 | 45 · duc −2 → 30 · duc −2 | same |
| bd_tuyet .10 | 35 → 45 | 45 · duc −3 → 30 · duc −2 | same |
| bd_hen .4 .5 .6 .7 .9 .11 | 35 → 45 | 45 · suc −2 → 30 · suc −2 | same |
| bd_hen .8 | 35 → 45 | 45 · bac −80 → 30 · bac −40 (text: «phạt bổng lộc», was «cấm túc» with no confinement) | same |
| bd_hen .10 | 35 → 45 | 40 · duc −3 → 30 · duc −2 | same |
The ác-leaning soft options («xử nặng cả toán», «giá có lợi…», «đốt lều sốt», «đổi lương lấy ngựa chiến» …) are no longer dominant: lower odds by 15, a fail that still costs.

### (2) Law 6b — scan of every BDP id in jrd_bd2.js after a move / kill
| id | moved / killed at | later mentions | fixed how |
|---|---|---|---|
| asnc | .4 met; .8 w "ai"; .9 lose bdKill; .11 w "tn" | .10 x1 «Tự trao lệnh bài cho A Sử Na Cát» · .11 s1/s2/s3 | already guarded (.10 option `if` bdAlive, .11 openings by bdAlive); no change |
| phong | .4 w "kinh" (was in s1 only) · .9 "nguc" · .10 win "kinh" / fled "tn" · mid "tn" · lose bdKill | .5–.8 Hội Đồng quán · .11 s1 «Chàng đi cùng sứ đoàn» | .4 s2 options now move him to the capital too (s1/s2 are one slot); .11 s1 only while w "kinh"; NEW .11 s4 «Chàng đã đi trước» when he fled by the west gate (w "tn"); s2 exile, s3 coffin unchanged |
| lie, olac, thatmoc, bado, tuyetcau, kd | not used by bd_tuyet / bd_hen (lie only as «quân của thúc phụ» on the steppe, never moved in these roads) | — | — |

### (3) Law 6c — objects through the bdO ledger (one helper, jrd_bd.js)
| object (bd.o.*) | holder before → after | chapter / option |
|---|---|---|
| trangsuc (her jewel box) | her → ban (sold for grain) | bd_tuyet .4 s1 |
| day (chief's leather cord) | asnc → vua / ta / asnc | bd_tuyet .4 s2 (3 options) |
| hoimon (dowry chest) | ta → kho → ve / ban | .5 t1, .11 c1 (c1 only if "kho") |
| sokho (granary ledger copy) | thư lại → vua / ta / tra | .5 c1 |
| baouot (wet grain sack) | trạm → dsv (Đô sát viện) / tram | .6 c1 |
| nguatrang (white mare) | asnc → vua / asnc / ta (Thượng tứ viện stall) | .6 t1 |
| de (the tribe's goats) | asnc → thon / asnc / ta | .7 t1 |
| aobong (cotton coats) | cung → ai | .8 s1/s2 |
| baithuoc (her mother's recipe) | ta → thaiy / ta | .9 t1 |
| lenhbai (gate tally) | lão tướng → ta / tra / asnc | .10 s1, x1 (option `if` reads it) |
| thuthuc (uncle's arrow letter) | ta → dot / ta / giu | .10 t1 |
| khuc (winter song) | — → thien / oan | .11 t1, rare |
| day2 (new cord) | sứ → ta | .11 s1 |
| damo (grave stone) | — → ai / tn | .11 s3 |
| co / chi (grass sprig / green thread) | phong → ta / dot · ta → phong | bd_hen .4 s2 |
| cung (horn bow) | vua → phong | .4 c1 (on success) |
| nguaban (reward horse) | vua → phong | .4 x1 |
| da (oath stone) | phong → ta / tra / vua / chon; coat lining flag → phong with the coat | .5, .11 c1/s3/s4, rare |
| dao / tram / khan (knife / hairpin / kerchief) | swapped at the oath | .6 t1 |
| daingoc (jade belt) | vua → phong | .6 x1 (on success) |
| chen (poisoned cup) | ta → thaiy → dly on .7 win | .7 s1, c1, E.win |
| thu / thuhoi / thuv (seized letter / her reply / {v}'s letter) | dly / dot / vua · dot / phong / dly / vua · ta | .8 |
| aolong (her mother's fur coat) | ta → phong | .11 s2 |

### Tests (build of dbc8a5c6)
- structure probe: both roads full, numbers = options everywhere (bd_hen_11 s4 added), 0 page errors.
- bd-roads-bal 20 lives per road (one road per process): static both roads: no-loss 0, spread>6 0, dominated climaxes 0, not-harder-with-rank 0, digits/% 0, unknown tokens none. Bots: the 20-life process crashes the browser target after ~12 lives (memory), so run in 10-life batches; before the crash every life reached .11 (bd_tuyet 12/12: win 6 · mid 4 · lose 2; bd_hen 5/5). Batch results follow in a later line.
- bd-scan.py: 0 UNGUARDED, 0 NO BOOK. bd-batu-switch.js: PASS (0 steppe words). Token probe: new bd life → land «Ba Tư», pb «Vương thúc», bdCountry "bt".
- cat.py: not touched (not in my two files); no bd_tuyet/bd_hen row of mine there.

### (4) Ba Tư rewrite (owner OD 19/11 ~06:40Z; E19 mapping foreign-princess-3-history.md §A.2 / §C.2 / §E) — text only, in place (law 14)
Ids, beat keys, flags, bdO / BDP keys, option ORDER and every number unchanged; country words through the tokens of NCL.bt ({land} Ba Tư, {mh} Vương hậu, {pb} Vương thúc, {quan} Vương trung vương), never typed. Probe: a new bd life on bd_hen resolves land «Ba Tư», pb «Vương thúc», mh «Vương hậu», bdCountry "bt"; static measure «unknown tokens: none».
| before (Bắc Địch) | after (Ba Tư) | where |
|---|---|---|
| bd_tuyet «Năm tuyết trắng» — snow famine on the steppe | «Năm đoàn người chạy nạn» — refugees of the Đại Thực advance on the silk road | .4 title, g, E |
| A Sử Na Cát, trưởng lão bộ lạc biên | A La Hám, lão tướng trấn Tật Lăng (BDP n/r/want → E14c) | all chapters |
| cửa ải Nhạn Môn · lão tướng trấn thủ Nhạn Môn | Ngọc Môn quan · quan trấn thủ Ngọc Môn | .4–.11 |
| sợi dây da tết (the chief's token) | dấu ấn bạc khắc ngựa có cánh (bdO "day", "day2") | .4 s2, .11 s1 |
| «người của ta đành tự lấy» (threat) | «Thần không dám đòi, chỉ dám xin…» (plea) | .4 s2 |
| đổi lương lấy ngựa / ngựa cái chửa / đồng cỏ phía nam sông | đổi lương lấy bạc Ba Tư và lạc đà / lạc đà cái / hòm bạc giữ lửa | .4 x1, .5 s2, .6 |
| thư lại Binh bộ bớt ngựa | thư lại Hộ bộ nấu bớt bạc | .6 c2 |
| cướp biên — kho thóc thôn biên, lão nông | hồ thương bị cướp trên đường Lương Châu, lão phu xe | .7 |
| đàn dê cuối cùng | đàn lạc đà cuối cùng (bdO "de") | .7 t1, .11 c1 |
| thầy thuốc thảo nguyên · sữa ngựa, khói lá ngải | thầy thuốc Ba Tư · nước lựu, khói nhũ hương | .9 |
| chôn trưởng lão bên chân ải · hòn đá trên mộ | tháp đá cho chim trời (không chôn) · lửa thánh bên tháp (bdO "damo") | .9 E.lose, .11 s3 |
| quân thúc phụ · thư thúc phụ «làm Khả đôn cả thảo nguyên» | quân {pb} đã hàng Đại Thực · «làm {mh} cả {land} dưới cờ Đại Thực» | .8 c1, .10 |
| «Khúc ca mùa xuân» / khúc ca tuyết trắng / «Bia đá bên ải Nhạn Môn» | «Khúc ca Nô Nhụ» (tết xuân phân) / «Bia đá bên Ngọc Môn quan» | .11, RD97L |
| .4 rare «Tuyết tan giữa đông», áo lông của mẹ, «Công chúa tan tuyết» | «Lửa thánh qua cửa ải», khăn gấm của {mh}, «Công chúa giữ lửa» | BD97 |
| bd_hen «Lời thề bên đống đá» | «Lời thề trước lửa thánh» (thần giữ lời thề, đền lửa) | .4–.11 |
| Thác Bạt Phong | Mật Hồ Đạt (Mihrdād; BDP n/r/want → E14c) | all |
| hòn đá thề khắc tên | nhẫn ấn khắc cánh chim (bdO key "da" kept) | .4–.11 |
| «Chôn hòn đá dưới gốc tùng» | «Dâng nhẫn vào lửa thánh ở Hỏa Tiên từ» (da "chon" kept) | .5, .11 |
| cành cỏ quanh đống đá · «Đốt cành cỏ» | nhúm tro lò lửa thánh gói lụa đỏ · «Rải gói tro xuống hồ» | .4 s2 |
| tục kết nghĩa thảo nguyên, rượu sữa ngựa | tục kết nghĩa thề trước lửa, rượu nho bát bạc | .6 |
| thư chữ {land} | thư chữ Bát La Bà (Pahlavi) | .8 |
| tiếng tù và · tuyết cuối mùa · về bắc · cửa Tây (ngựa) | tiếng chiêng · gió cuối đông · về tây · Kim Quang môn | .4, .10, .11 |
| Trấn biên tướng quân | Hữu vũ vệ tướng quân (Peroz's real Tang title) | .11 s1 |
Left as is (GE design names, comments only): ge1–ge4 titles in the road header comments (the GE wave renames them).
Rare path/bad lists re-checked: every entry matches a raw option name of its road.

## §ROUND 2 results (E14d, lead; successor of E14c) — review/bd-roads @0308cbcc (final LIVE merge pending «LIVE <sha> caoly»)
### Merges
- Writer 2 «W2 R2 READY dbc8a5c6 (FINAL)» merged; its tables are §WRITER 2 r2 above. W2 touched only writer-2 x1 rows (16 in jbalbd.js) and jrd_bd2.js, no lead rows, so the bd_soi result stands.
- caoly-road (30d7cca8, then review/caoly-road-r6 e5241e4a) merged. Conflicts resolved by hand, never char-diff:
  - jkc2.js, 5 hunks: kept the bdTxt Ba Tư variants and applied the Cao Ly nc-side text («cánh hạc», «Hưng Vương tự», «sông Lễ Thành», «rừng đèn», «chợ sứ quán», nhẫn khắc hạc). 0 Nam Chiếu left.
  - joi.js:131: OI_SELT `S.origin.k==="bd"?bdTxt("Bắc Địch","Ba Tư"):"Cao Ly"`.
  - assemble.py: the Cao Ly list (jallot, jagmin) plus jbalbd after jbalroad and jrd_bd/jrd_bd2 after jrd_nc.
  - jgecat.js regenerated by gen_js.py; index.html/sw.js rebuilt.
- NOTE: commit b723e14a says «TRIAL (local only)», but it IS pushed on review/bd-roads. It is the real merge commit.
### Capital «Tô Lận» — KEPT (E14d check; E19 archived)
Tùy thư 波斯國都達曷水之西蘇藺城: Tô Lận = Ctesiphon, a Hán-Việt name with a source, and cổ trang. «Taq» is only a [B/D] note in §C.2 and not cổ trang.
### GE catalogue (dev/test/ge_guard/cat.py, 0c3785ea) — Ba Tư names
- bd_tuyet «Năm tuyết trắng» → «Năm đoàn người chạy nạn». GEs: Mẹ người chạy nạn / Lương thảo đổi hòa / Mở cửa Ngọc Môn / Khúc ca Nô Nhụ.
- bd_hen «Lời thề bên đống đá» → «Lời thề trước lửa thánh». GEs: Lời thề trọn vẹn / Dâng lửa lời thề / Nghĩa huynh đường xa / Đòi máu cho chàng.
- OTHER map keys renamed, opposite values kept («Mẹ người chạy nạn»:«Nữ chúa lưu vong» …).
- ge-guard 6/6, check.py ERRORS 0.
### NIT-1 / NIT-2 from the caoly-road review (fa67b84a)
- NIT-1 jnroad.js: `nrKhaOf(X)`. On an nc road, {kha} = NCL.nc.kha («Phác») whatever the player's origin. Otherwise TOK67.kha() as before.
- NIT-2 jgedata.js:119: «treo tấm da trước cửa cung ngươi» → «cười lễ nghi cố quốc của ngươi».
- Family scan of every nc GE block (jgedata nc_tuc; jgedata_w2 nc_gian/nc_su/nc_vuong): no other steppe text. 2 pull-list option names point at bd-only beats; pull lists are not player text, so they are left as is.
### Old-save test, case (4): Cao Ly + Ba Tư in one build (dev/test/bd-batu-switch.js)
Case (4) checks:
- the nc origin: {land} = Cao Ly and {kha} filled («Phác»), with 0 Ba Tư / Tô Lận / Nam Chiếu / Bắc Địch words;
- OI_SELT for the nc origin says Cao Ly;
- OI_SELT for a new bd life says Ba Tư;
- OI_SELT for an old bd_hoa save says Bắc Địch.
Result: PASS, 0 faults, 3110 road texts with 0 steppe words.
### Bots (dev/measure/bd-roads-bal.js, 20 lives each, one chromium page at a time)
| road | reached .11 | .11 win / mid / lose | errors |
|---|---|---|---|
| bd_soi (watch, build idx_r2b) | 20/20 | 3 / 9 / 8 | 0 |
| bd_san | 20/20 | 8 / 4 / 8 | 0 |
| bd_tuyet | 20/20 | 11 / 3 / 6 | 0 |
| bd_hen | 20/20 | 9 / 6 / 5 | 0 |
bd_soi meets the ≥2-win bar, so no retune of bd_soi_11. Writer 2's 12-life crash warning was not seen in any of these 20-life runs.
### Gates (build of 0308cbcc = caoly-road-r6 merged)
- PASS:
  - static bd-roads-bal STATIC=1 XROWS=1, all 4 roads: 0 no-loss / spread>6 / dominated / not-harder / digits; tokens ok;
  - bd-scan: 0 UNGUARDED; 6c 130 options, 0 NO BOOK;
  - one-core-guard PASS;
  - bd-batu-switch PASS (incl. case 4);
  - bd-legacy-save PASS (old bd_hoa → .6 → reload → bd_hoa_11; new lives roll only the new roads);
  - road-rare PASS;
  - ge-engine 808/808;
  - npc-roads-tokscan 0 bad;
  - kc-roads/direct ORIGINS=bd,nc: 0 fail;
  - kc-roads/coop-together --a=cnv --b=bd: 26/26. The first run was 25/26 on one CDN CORS console error (por-player-look4-t1-a18.webp); the rerun was clean, so that was environment;
  - road-full 1 life × 4 roads, 9/9 each;
  - npc-roads: 2 lives (tt, dtq), 0 FAIL. Life 3 was cut by my time limit (≈1 h per life here).
- quickcheck: QUICKCHECK PASS, but CORE GATE G4 70-manifest-guard FAILS on the LIVE CDN: FIGURES-kc.json maid|kc 52 < floor 208, total 264 < floor 420. → «CDN, pending MAIN» (E #13 checked it again on LIVE 2bda29a1 and sent it to MAIN). Not a bd-roads fault.
### Still open, FOR E / E19 successor (from E14c)
- dev/GRAND_ENDINGS.md still uses steppe words for bd_tuyet / bd_hen.
- The FOR C art lists (§FOR C above) need redoing for Ba Tư (fire temple, Tô Lận, Ba Tư dress), not steppe.
### FINAL — merge of LIVE main 0de74d9e (caoly-road landed) → review/bd-roads @9c96112d
- Conflicts: assemble.py only, plus index.html/sw.js. assemble.py takes main's list (jrcv, jptime, jagwhy*, jgamevs, jchat*, jbalky, jky) and adds jbalbd.js after jbalroad.js and jrd_bd.js/jrd_bd2.js after jrd_nc.js. index.html/sw.js taken from main and rebuilt with build_site.sh. jgecat.js regenerated: ge-guard 6/6, check.py 0 errors. NIT-1 (nrKhaOf) and NIT-2 (jgedata.js:119) came through unchanged.
- Gates on the 9c96112d build:
  - static, all 4 roads: 0 faults;
  - bd-scan: 0 UNGUARDED, 6c 130 options / 0 NO BOOK;
  - one-core-guard PASS (inline 3837 / baseline 4212);
  - bd-batu-switch PASS incl. case 4 (Cao Ly {kha} Phác, 0 faults);
  - caoly-oldsave 14/14 (main build 72f7c0c5, before Cao Ly, as the old one);
  - bd-legacy-save PASS; road-rare ALL PASS; ge-engine 808/808; tokscan 0 bad;
  - kc-roads direct bd,nc 0 fail; coop-together 26/26;
  - road-full 1 life × 4 roads, 9/9 each;
  - quickcheck: QUICKCHECK PASS, core gates PASS, old save ok, perf equal to live.
- G4 manifest-guard now PASSes, so the CDN floor is fixed.
- G4 50-coop-one-world: the first quickcheck had seed 3 FAIL (R.evm changed by the guest week). It passed 5 standalone runs on seed 3, it passed on main's build, and the second full quickcheck passed. So it is flaky and not tied to this branch (R.evm is written in j29.js with a random roll; bd-roads does not touch it). Recorded FOR MAIN as a flaky gate.

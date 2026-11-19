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

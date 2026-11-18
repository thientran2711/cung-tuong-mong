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

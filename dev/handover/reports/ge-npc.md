# ge-npc — GAP J4 (GE08, GE09, GE10, OR19) — review/ge-npc @ f9045383 (base LIVE 30e8714e)
PRIORITY #1 CHECK: OD L1288 (NPC origins = player pool), GRAND_ENDINGS §2.5(1), §2.9, STORY_ROADS_PLAN §3.0 | main: BAL.ge.npc {on:false} (jbalge.js:121), BAL.ge.help.rw "not live" (jbalge.js:120), S.geSeat only "me" (jge.js:106), nrOrigin clan-only (jnroad.js:33), news = log() only (jge.js:113) | review/*: none for ge-npc; foreign-princess-samples = art only (not touched); ge-writers-w3 / bd-roads touch jbalge.js / jnroad.js on other lines (no overlap) | claims: CLAIMS row 395 (this session).
STATUS: SẴN SÀNG KIỂM review/ge-npc @ a28b107f (J4 #2 session_01N1tNP2HPE2wxkW8ADNGHw1, base LIVE 8cf6b7d7). #1 START_CTX ~6 %; #2 START_CTX ~10 % (own estimate), ended ~30 %.

## What (all numbers in BAL; kit only)
- **jgenpc.js** (new; assemble.py after jnroadhp.js). GE09 NPC parity: an NPC consort whose road v.nr.r is a live GE branch gets `v.ge` (same shape as S.ge). Each chapter she plays off-screen (nrPlay wrap): per stage of the chapter's path she picks ONE option weighted by her nature (jmind `mindPick`: her lean side `BAL.ge.npc.w.lean`, endings her nature points to `w.pull`, shies from closing them `w.close`) → same pull/push/close/doom/lean rules as the player + `@<chapter>=<ending key>` (jnroad nrEnd now stores `nrEnd.k`). Road closes → Hồi kết: Ngã rẽ 1/2 from `BAL.ge.npc.nat` (trait weights) × (1 + pull of the open ending owning the pair × `pw`); «Theo người ấy» only with a real bond (BAL.ge.bond.sis). Same odds (BAL.ge.odds), shading (BAL.ge.var), fail/quiet rule.
  Success on her: rw stats she has, rank step via seatHas/seatUp (never above seat rules), HH via the j8 lập hậu pattern (only with no queen and player not HH), seat summits → `v.ge.seat` (seat locks BOTH ways: jge `geSeatTaken` now also reads rivals' v.ge.seat; NPC side reads S.geSeat + other NPCs), leave summits `BAL.ge.npc.leave` → she leaves (alive=false, v.left; a queen never leaves this way), jdh title on her, Kim sách in HER chest (law 6c), Bảng row (jge `geBoardList` now derives NPC rows from rivals → co-op guest sees them). Fail: loss on her; a rank loss = palace news line only.
- **GE10**: nrHelped wrap — help → +`BAL.ge.help.pull` on her leading open ending; betrayal → −`help.push` (0 → fail-only); the rival she told gets +pull (two-way, laws 1–2). She unlocks after the player's help and no betrayal → `BAL.ge.help.rw` to the player once.
- **GE08**: each NPC unlock → kit `kitPanel({kind:"result", title:"Thiên hạ truyền tin", subject:v, facts})` centre pop-up, once per player (S.geNs), endTurn + guest render hook (jworld pattern); the news makes her name known (j61 k61Know stage 2). Her own unlock keeps the existing geR event.
- **OR19**: `nrFpRoll(v)` at game start (start hook) / on arrival: share = BAL.orig.ow.nc over consort origins (6.52, no new number), country by BAL.orig.br.nc, cap `BAL.nroad.fp.max` per country (player counts), face no. `v.fpf` from `fp.faces` never twice (player gets S.fpf); her house = the country's land (tdHouse null); house daughters (dad+clan) never. nrOrigin returns her princess origin → one of its roads. Stand-in face = her drawn face until princess art (Foreman C; samples branch exists).
- Files: jgenpc.js (new), jge.js (geSeatTaken, geBoardList, window.geK), jnroad.js (2 lines), jbalge.js (help, npc), jbal2.js (nroad.fp), assemble.py, index.html/sw.js rebuilt.

## Tests
- dev/test/ge-npc-unit.js — **ALL OK 31/31** (3 runs) on this build: state, chapter feed, resolve, title, Kim sách, Bảng, pop-up once, no %, seat locks both ways, HH crown, leave, help/betray/rival/reward once/no reward after betrayal, princess share/house/origin/cap/faces/house daughter, off switch, old save month.
- Spread probe (400 NPC roads, 24 branches): grand 14 %, quiet 21 %, fail 65 %; open endings at road end median 2; thiện 38 / ác 19.
- Bots dev/measure/ge-npc-bots.js, **50 lives × 15 y** (#2, 1073 s, page errors 0):

| style | her death | NPC roads | ended | on GE branch | Hồi kết | grand | fail | quiet | thiện/ác | seats | left | NPC HH by GE | NPC HH end | princesses | NPC deaths | errs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| off (LIVE) | 0.50 | 10.42 | 9.54 | 0 | 0 | 0 | 0 | 0 | – | 0 | 0 | 0 | 0.58 | 0 | 4.50 | 0 |
| on | 0.38 | 10.16 | 9.58 | 7.22 | 5.66 | 1.14 | 3.42 | 1.10 | 43/14 | 0 | 0.30 | 0.02 | 0.48 | 0.52 | 5.08 | 0 |
  Summits (on): FREE 10, CLAN 8, FOLLOW 7, TRADE 4, SIS 4, MERCY 4, FAME 3, GENERAL/POWER/SACRIFICE/ADV/HH/REV 2, KING/JUST/RELIEF/NUN/CHILD 1. Her death .50 vs .38 = noise (SE of the gap ≈ .10; no code path touches her mortality). FREE no longer dominates as much (10 of 59).
- Shots (#2, retaken on the merged build; kit result panel «Thiên hạ truyền tin» + Bảng Thiên mệnh, Fold 755x1000@2 + iPad 1180x820@2, looked 3×: no cut text, no overflow, page errors 0): CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/ge-npc/ge-npc-news-fold.webp, -news-ipad.webp, -board-fold.webp, -board-ipad.webp. Shot script dev/test/ge-npc-shots.js.

## #2 RESULTS (20/11, all on review/ge-npc after merging LIVE 8cf6b7d7)
- Merge: f2b4fa86 (only conflict assemble.py: LIVE list + jgenpc.js after jnroadhp.js; index.html/sw.js rebuilt). kit-ge (kitBranchMap, Thiên mệnh plate) merged clean, no overlap with jgenpc.
- Fix a28b107f: one-core-guard flagged `nt:1` in jgenpc.js (Kim sách item flag, read as the stat nt) → `nt:true`; guard PASS.
- ge-npc-unit 31/31 (twice: merged build + final build) · ge-engine 104/104 in 17 s on branch (LIVE 12 s): the old >40 min was machine load, not the nrPlay/endTurn/start wraps · ge-guard 6/6 · nroadhp-unit 40/40 · npc-roads 4×60 38/38 (2616 s; first run was cut by my cap under load at 3/4 lives, no fails) · npc-roads-saves 6/6 (LIVE save → branch) · coop-e2e 68/68 (live Worker) · undef-scan PASS · quickcheck: open ok, old LIVE save loads + plays a buổi, perf median new/live render 242/281 ms, tab 642/618, buổi 2069/1661 (noise band), tasks>200ms 25/25; core gates PASS after the fix.

## Known limits (say so in review)
Known limits (not built, say so in review): NPC maids on cnv roads have no grand ending (consorts only); the co-op FRIEND's own unlock is not news for the other player and her S.geSeat does not lock the friend (coop-thin lane); NPC fail outcome text is not shown to the player (news line only on a public fall, per design).

## REVIEW r1 (opus BIG, session_01N1tNP6UyqC6o8nnNuZC3Sj) — PASS c925183e (review/ge-npc-r1; contains LIVE 983a9436) + 2 FLAGS for the owner
PRIORITY #1 CHECK: worker's line verified (BAL.ge.npc was {on:false} on LIVE; no other review/* builds NPC grand endings) | main: jge.js / jnroad.js / jbalge.js / jbal2.js only, plus new jgenpc.js | review/*: ge-batu (bd grand endings, not landed) + bd-roads (LANDED in eb11e2ad) touch the same feature area, no overlap | claims: CLAIMS rows 395 / 444 / 463. START_CTX ~5 % (1M window, own estimate).
- **Merges**: LIVE 7a35db20 → 48cbe84f (conflicts: assemble.py = LIVE list + jgenpc.js after jnroadhp.js; jbalge.js = LIVE W3 rw rows (ch_* thd_* cnv_chu/ban/ma) + branch help/npc) · LIVE eb11e2ad → 826d1720 (assemble.py same rule; jnroad.js auto-merge keeps LIVE nrKhaOf + branch OR19 hook + nrEnd.k) · LIVE a99673e8 (ge-batu) → 12f77e91 (jbalge.js = LIVE bd rw rows + branch help/npc) · LIVE 983a9436 (outside-nums, jkc2 only) → c925183e. The W3 merge means 36 live branches now (was 24): NPC grand endings cover the W3 identities automatically (nBranch reads GE_DATA). bd (Ba Tư) roads landed: a Bắc Địch/Ba Tư princess NPC now gets one of the 8 bd roads (checked: roll → k bd, clan "Ba Tư", origin bd); with ge-batu now LIVE, bd_san / bd_soi / bd_tuyet / bd_hen carry grand endings, so a Ba Tư princess NPC on those 4 roads plays the funnel too (bd_hoa/ngua/tuc/hoang have no GE data → none, same as the player). Extra bots on the ge-batu merge: on-arm 2×20 lives × 15 y, page errors 0, grand 1.3–1.65 per life, THH 2 / KING 3 in 40 lives.
- **My only code change**: dev/measure/ge-npc-bots.js — env SEED (life i of every arm starts from the same mulberry32 draws) + arms `ge` (NPC grand endings only) and `fp` (princesses only) + fate per life. No game code changed.

### NUMBERS FLAG (her death .50 off vs .38 on at n=50) — re-measured, NOT a balance move
Bots 200 lives × 15 y per arm, SEED=5000 (same opening draws), page errors 0:

| arm | lives | her life ended | NPC Hồi kết | grand | fail | quiet | thiện/ác | left | NPC HH at end | princesses | NPC deaths |
|---|---|---|---|---|---|---|---|---|---|---|---|
| off (= LIVE) | 200 | 0.42 | 0 | 0 | 0 | 0 | – | 0 | 0.43 | 0 | 4.94 |
| on (branch) | 200 | 0.48 | 7.84 | 1.50 | 4.74 | 1.61 | 210/89 | 0.35 | 0.51 | 0.53 | 4.43 |
| ge only | 195 | 0.43 | 8.07 | 1.26 | 5.12 | 1.68 | 180/66 | 0.33 | 0.46 | 0 | 4.42 |
| fp only | 200 | 0.48 | 0 | 0 | 0 | 0 | – | 0 | 0.59 | 0.52 | 4.61 |

- SE of one arm ≈ .035, of a gap ≈ .05: on − off = +.06 (z ≈ 1.2); the n=50 gap (−.12) had the OTHER sign → noise, as the worker said. Fates (off/on/ge/fp): «Xuất gia làm ni cô» 35/45/41/36, old age «Tuổi trời đã tận» 28/28/17/31, end at the Emperor's death (reign lines) ~15–18 each arm, illness/accident 0–4. No murder/plot fate in any arm; none of her fates goes through a jgenpc path (jgenpc writes only NPC state, the once-only help reward Danh+6 Đức+3 to her, and seat locks). Verdict: no real move of her survival; nothing to flag to the owner on balance.
- Spread (on): 300 grand in 200 lives; FREE 54 (18 %, still the top summit), CLAN 26, POWER/OFFICE 14, REV 15, CHILD 15, MERCY/JUST/NUN 12, HH 8 …

### Checks (all on the merged build)
| check | result |
|---|---|
| ge-npc-unit | 31/31 (all 4 merges) |
| one-core-guard | PASS (fails 0) · undef-scan PASS (254 names) |
| ge-guard | 6/6, then 8/8 after ge-batu (40 live branches) |
| quickcheck | PASS ×4, last on c925183e (old LIVE save loads + plays a buổi; perf new/live render 195/220, tab 441/438, buổi 940/1214 ms; core gates PASS) |
| coop-e2e | 68/68 ×3 (live Worker; last on 12f77e91 — c925183e adds only jkc2 from LIVE) |
| coop-thin-c L3 (guest world read-only, lane touching rivals/jnroad) | 16/16 on 826d1720 and 12f77e91; earlier 6 paired runs: branch 3/6 and LIVE 2/6 had ONE act kind time out / mismatch (a different kind each run: laydo, ksab, xx, laydol on the branch; nuoc, tea on LIVE) → flaky on LIVE too, not this branch |
| ge-engine / nroadhp-unit / npc-roads-saves | ge-engine 104/104 (9 s; worker saw 17 s under load — no perf cost found) · nroadhp-unit 40/40 · npc-roads-saves 6/6 (LIVE save → branch). npc-roads 4×60 not re-run (worker 38/38; the merges add no NPC-road code besides LIVE's own) |
| shots Fold 755x1000@2 + iPad 1180x820@2 (news pop-up + Bảng), looked 3× | no cut text, no overflow, page errors 0 — https://ctm-img.victoria-tntt.workers.dev/img/_review/ge-npc/ge-npc-r1-news-fold.webp · -news-ipad · -board-fold · -board-ipad |

### Laws / design rows
- GE09 ✔ (§2.9 row by row): same 4 endings / funnel / fail / shadings; pull, closing, lean from HER picks (mindPick over option weights from her traits — no flat roll) + her Đức; Ngã rẽ 1/2 from nature per the design map (Ân cần/Khiêm nhường → Lấy ân, Tham vọng/Kiêu ngạo/Xảo quyệt → Lấy uy, Kín đáo → Buông; bond → Theo người ấy, weighted); same resolve/odds/seat locks; title (jdh), Bảng row, summit (HH via the j8 lập hậu pattern, seats, leave), fall = news line only. Not built: the 2 kỳ ngộ per branch for NPCs (design line «4 grand endings + 2 kỳ ngộ»; worker did not list it) → known limit.
- GE10 ✔ help +pull / betrayal −push (0 → fail-only) / told rival +pull / reward once after help without betrayal.
- GE08 ✔ kit `kitPanel` (j79) centre pop-up, once per player, endTurn + guest render; player's own unlock keeps its kit event with the «Thiên hạ truyền tai» line. Seal = KẾT QUẢ (kit kind "news" is the no-person variant, so "result" with the person column is the kit-legal choice).
- OR19 ✔ share = BAL.orig.ow.nc over consort origins, country by BAL.orig.br.nc, cap/faces BAL.nroad.fp, never a house daughter; stand-in face until Foreman C's princess art.
- Law 1 two-way ✔: her help/betrayal moves an NPC's ending; an NPC's seat locks hers and hers locks the NPC's; the betrayed NPC strikes back by the existing jnroadhp carrier rules (oán → agSpite). An NPC cannot directly push/pull HER funnel (only through stats/seats/oán) — same as before, noted.
- Law 4 ✔ (guard 0). Law 6b ✔ people: a leaving NPC = alive:false + v.left (same convention as the existing NPC nun path jagacts3/jroute); 6c ✔ Kim sách in her chest. Law 7 ✔ no %, no digits in the new lines. KIT ✔ no private part.

### FLAGS (FOR B → MAIN → owner; nothing changed by me)
1. **World-changing summits reached by an NPC** (design §2.9 names only HH / Thái hậu / leave): NDE (4 per 200 lives), KING (7), ANNEX (1), THH (3 in the ge arm) are kept as title + seat-lock only; the Emperor still reigns and the player's life goes on, while the news line says e.g. «Ngôi nữ đế từ nay thuộc về nàng.» (NDE). For the PLAYER these endings close the life (§2.5 (3)). Owner decision needed: (a) keep as now (title + lock, news worded softly), (b) an NPC reaching such a summit changes the world (new reign / the player's life closes), (c) NPCs cannot reach these summits (treated as fail-only for NPCs — breaks parity, law 1). Recommend (a) with the news line reworded by the writer, until the world can simulate it.
2. **Kit observations (kit keeper, not this branch)**: the kitPanel result pop-up with an NPC subject shows the medallion + framed card (no `.kpsubj.kes` full-body column; KIT §8 says a person pop-up uses the FULL-BODY column) and a generic tea-set picture beside the person; the same look is on LIVE panels (geBoardPanel speaker) → whole-group question for the kit keeper.
- Perf note: ge-engine 9 s here (worker 17 s vs LIVE 12 s was machine load); quickcheck perf within band on every merge.

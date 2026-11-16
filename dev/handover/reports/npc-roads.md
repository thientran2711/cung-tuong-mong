# npc-roads — LEAD WORKER, NPC ROADS (Foreman D)
Worker: session_01DgYSWmUVjZctWQWG8HUzdY (opus). START_CTX ≈ 4 % of the 1M window (get_session reads 0; own estimate ~40k after the start reads);
rollover at 29 %, ceiling 60 %. Coordinator: Foreman D (id at the top of dev/handover/FOREMAN_D_STATUS.md).
Branch `review/npc-roads` (base = Foreman B engine `review/road-map-next` 33b8789a: jroad.js + jrd_tt.js + BAL.road; merges B's newer
engine fixes as they land; never patches jroad.js). Progress file: dev/PROGRESS_review-npc-roads.md on the branch.

## STATUS
- STEP 1 = this PLAN (below), pushed 18:30Z (docs 848a3b9b).
- U0 core + U1 consorts BUILT on review/npc-roads (see BUILD U0+U1 at the end). U2 maids + U3 men = next (design at the end).

## 0. LUẬT ƯU TIÊN SỐ 1 — what exists and is reused (checked origin/main + review/road-map-next + road-b1/b2/b3 + docs reports)
| piece | where | reuse |
|---|---|---|
| 36 women roads: `.4` premise arcs ARC67[road] | j67 (main) | road list + .4 title/endings for NPCs |
| `.5`–`.11` chapters `ROAD14[road][n]` → ARC67 ids (t, sj, w, E{k,tag}) | jroad.js + jrd_tt (engine), jrd_dtq/muoi/cn (road-b1), jrd_nc/td/ch (road-b2), jrd_cnv/thd (road-b3) — WIP | READ at runtime only (titles, cast key w, ending tags/k). Never copied. A road an NPC rolls uses the chapters registered in this build; missing ones are skipped until B lands them. |
| j72 Việc nhờ (T7 templates, fu:1 follow-ups, steps C/G, deadline dl, nợ ân ledger q72Debt, q72Make(T,rq)+q72Offer, evHistSeen anti-repeat) | j72 (main) | the ONE help hồi of an NPC road = a j72 follow-up quest (same card, same deadline/countdown, same ledger) |
| jreign Tâm nguyện lines (Thái hậu, Hoàng hậu, Phế phi Lý, maid, Tổng quản, Thái y: 3 steps each) + the Emperor's road (Tân quân lập uy) | jreign (main) | Emperor + Thái hậu roads = jreign (no second road). Hoàng hậu / Tổng quản / Thái y: their jreign line is kept; their NPC road never offers a help hồi while their rgl line is open (no double ask). |
| NPC stats (sac/tai/tamco/duc/danh/sung, trait, malice, clan, dad), clanOf, j55 court houses tdHead/tdPowAdd, relAdd/oanAdd, odA | j1/j8/j9/j10/j55 (main) | NPC chapter odds/outcomes use the NPC's own stats through odA; gains/losses go to the real fields (sung, danh, dad/house pow, relations, oán) |
| promotion promoteP, deaths (npc-death), new faces (j27/j55 tuyển tú), maid rise (j8 sendMaid, j14 mlEye, j42 srvRise) | main | no rank is written by a road: rank changes only through promoteP (normal seat rule) |
| npc-agent AUDIT (report only, main s20; implementation = Foreman C AG1–AG6) | reports/npc-agent.md | proposes a road data field `p.road` = origin key for the agent's "road weight". CONFLICT AVOIDED: this branch stores `p.nr = {o: origin key, r: road id, n: chapter, …}`; AG1 should read `p.nr.o` / `p.nr.r` (see §8 coordination). |
| men: S.men (j22 MROLES: Thị vệ, Thái y, Vương gia, Nhạc sư, Sứ thần, Họa sư), eunuchs (staff role eunuch; Tổng quản, Kính sự phòng), officials (j55 house heads), princes (kids) | main | men templates attach to these real people only |
No NPC road / NPC origin exists anywhere (git grep `nroad|npcRoad|\.nr\b` on main + review/*: 0). NPC rivals have no origin field (npc-agent §2 confirms).

## 1. Units (1 unit = 1 NPC; built kind by kind)
| unit | NPCs | road source | count per life |
|---|---|---|---|
| U0 core | — | jnroad.js engine for NPC roads (state, roll, monthly off-screen step, help hồi, news) | — |
| U1 consorts | every rival consort incl. Hoàng hậu (alive, not out) | one of the 4 roads of her rolled origin (36 roads, ROAD14/ARC67) | ~10 at start (BAL.ps.harem) + tuyển tú arrivals |
| U2 maids | every staff maid of a consort + her own maids (S.maid, staff), cung nữ in pools | cnv roads (4: cnv_chu/ban/mat/ma) with maid wording; a maid raised to consort keeps her road and changes origin to cn (cn roads from the next chapter) | ~20–40 |
| U3 men | S.men (6 roles), eunuchs (Tổng quản, Kính sự phòng, staff eunuchs), officials (5 house heads), princes ≥ BAL age | ~20 men templates (new data, ROAD_MAP §4.10 to add), 8 chapters each (.4–.11) | ~15–25 |
| — | Hoàng thượng, Thái hậu | jreign (existing) | 2 |

Origin roll (women, U1): canon-first, data table BAL.nroad.org (ONE CORE):
- from her house: clan Tể tướng → tt, Đại tướng quân → dtq, Thái hậu kin → ch, Hàn lâm → thd, Hộ bộ → muoi|td, Lễ bộ → thd|td (weights in BAL);
  a consort who rose from maid (j8 sendMaid / j14 mlEye / j42) → cn; a foreign bride → nc (one per land, KC2LAND words).
- uniqueness (canon §5.2): one father = one record. If the player is tt/dtq (her father IS the Tể tướng / Đại tướng quân), no NPC gets that
  origin (she would be a second daughter of the same father): fallback to a non-unique origin of her house. ch NPC allowed (cousin = the
  ch_ho canon). nc: never the same land as the player.
- road roll: one of the origin's 4 roads, weighted against roads already held by another NPC of the same origin and against the player's
  own road (so two women do not live the same road in one life). Re-rolled every life (OD:L1252 variety).

## 2. How an NPC road advances (off-screen) and when it touches her
State (saved): `v.nr = {o, r, n, k, t, h, hk, c:{cast key: id}, e:"…"}` (origin, road, current chapter 4..11, last ending sign, turn next
chapter is due, the help chapter index of this life, its help kind, her road cast, ending tag) — ~60–90 bytes per NPC.
- Pace: chapter .4 opens BAL.nroad.d0 months after she enters (or at game start), each next chapter after BAL.nroad.gap [min,max] months, so
  .4→.11 spans about the middle of a long life (like hers, ROAD_MAP §5.3). Host-only in co-op (world state, the jreign/j95 pattern).
- Cast: the chapter's cast key `w` of ARC67 (dad/v/hh/th/emp/maid/eun/doc/off/gd/man) is filled from REAL people of this life, kept for the
  whole road (same rival every chapter, OD:L1247); her rival `v` can be ANOTHER NPC or THE PLAYER (then the hatred is real both ways:
  oanAdd/relAdd). Dead/out cast → recast with the line «… nay đã khuất, kẻ nối tay là …» in the news (same rule as rdCast, §5.2).
- Resolution of a chapter (agent rule OD:L1386, same rules for all): the NPC plays the chapter's climax with her OWN stats: odds =
  odA(v, BAL.nroad.base + her test stat/3 + Lợi thế from her earlier chapter + her help bonus), the test stat taken from the chapter's
  own climax options (the stat they reward, e.g. tamco/danh/duc/sung) — no flat roll invented for NPCs. Her choice of approach follows
  her trait (clean/own/buy/cold option tags of the chapter, OD:L1248 not the AI-best). Ending = win/mid/lose by the same k sign as j67.
- Gain AND loss (gain-and-loss rule, OD:L582/L243/L266): every NPC chapter end moves real fields both ways — win: her Danh/Sủng or her
  house power up AND a real cost (Sức, bạc, oán of the loser, Đức for a "buy" approach); lose: the mirror. Numbers in BAL.nroad.fx.
  Rank only through promoteP (no road writes a rank). .11 never kills her, never sends her to lãnh cung (§5.5).
- When it touches HER (rare, real reasons only):
  1. HELP HỒI — ONE chapter per NPC road per life (index h rolled per life, so the same woman asks at a different point and for a different
     thing every life, OD:L1252) becomes a j72 follow-up quest «PHỤ TUYẾN · {A}: «road title» · Chương n — «chapter title»» (SIDE STORY +
     name + step, OD:L499) with a deadline (BAL), one task (one hồi, OD:L1243). She asks only with a real motive (OD:L1226): her bond to the
     player ≥ BAL.nroad.askRel, or same faction (facOf / rgSideOf), or the player holds what the chapter needs (Sủng for an Emperor plea,
     Thái hậu regard for a Đức Thọ cung plea, bạc for a loan…). Otherwise her chapter runs alone. ~12 help kinds (speak for her to the
     Emperor, carry a letter out, hide a witness, lend bạc, ask the Thái y, stand witness, beg the Thái hậu, warn her, keep a secret, find
     proof, give a gift, refuse/betray) mapped from the chapter's cast key `w` and road — each with 2–3 options of equivalent cost
     (bạc road vs Sức/khắc/favour road, OD:L582) and a real loss. Result → her chapter odds (helped = Lợi thế) + j72 nợ ân + relation;
     betray (tell her rival) = gain with the rival, real oán with her.
  2. SHE IS IN THE CAST — the NPC's rival/foe is the player: chapter result lands on the player (Danh/Sủng/Chứng cứ small, BAL) with a
     news line and real oán; the player's own road reads the same person if her road cast that NPC (one rivalry, not two).
  3. NEWS — one palace news line when an NPC she knows ends a chapter («Tin trong cung: {A} — «chapter title»: ending tag»); capped per
     month (BAL.nroad.newsMo) so the log is not flooded.
  4. PERSON CARD — her road and chapter («Tuyến truyện: «road» · chương n») on the NPC's card through an EXISTING kit row; if no kit row
     fits → KIT REQUEST (stop that part).

## 3. Canon checks (ROAD_MAP §5) built into the code
- Names/places only from §5.2 and the NPC's own record (her father = her house head tdHead(clan) or her own dad record; nc land words
  from KC2LAND). No second father for anyone; the player's father is never an NPC's father unless the NPC is written as kin (ch cousin).
- Ranks print RANKS[i].n; no typed rank names, no typed numbers (BAL.nroad). Ages never stated as numbers.
- Story-only NPCs: only via §5.4 registry (Tố Nga, Xuân Đào, Lưu ma ma, old steward, envoy, dying mama). For NPC roads they appear
  only as names in news lines of the road that owns them (cn_ban, cnv_ban, cnv_ma, td_an, nc_*, cn_than); a story-only NPC is never
  cast in two roads at once (one per life; if the player's road holds her, the NPC road uses a recast/generic line). New story-only
  names → a §5.4 row via Foreman B first.
- Dead NPC → road closed (state kept for Sổ ghi, never resumed); NPC who leaves (out) → closed. A consort raised from maid keeps her
  identity (name, face) and continues as cn.
- Endings .11 for NPCs: the road's own .11 ending tags (ARC67 E tag) — reused, never retyped.

## 4. Balance (gain-and-loss) and numbers
- BAL.nroad (jbal2.js, ONE CORE): d0, gap, base, fx {win,mid,lose}, onMe (effect on the player when she is the rival), askRel, help
  bonus, help deadlines dl per kind, help costs per kind (bạc valued by rank = existing rank price helper of jstory/j72), newsMo, org weights.
- Help options: every option has a cost AND a loss; bạc road vs non-bạc road of equivalent value (OD:L582); refuse costs bond + the
  NPC remembers (nợ ân −). Scan script dev/measure/npc-road-scan.js (same legend as road-option-scan: free gain / no effect / digits) → 0/0.
- Bot check (U4): HH reach % and early-death % with NPC roads ON vs OFF (window.__nroff), n ≥ 30 lives each, no measurable skew.

## 5. Save size
~75 NPCs × ~80 B ≈ 6 KB worst case per save (help quests live in the existing q72 store). Measured in U4 (road-saves style test).
Old saves: lazy fill on load (NPCs without nr get one at the next month; NPCs already past their entry start at .4 then); no plan of the
player changes (the player's road is untouched).

## 6. Tests (U4)
- dev/test/npc-roads.js: long sims (bot lives of 15–30 game years, several origins): every live NPC road walks .4 → .11 in order (chapters
  present in the build), ends with a .11 tag, 0 page errors, 0 "dead/recast" errors (dead cast recast + told; dead NPC road closed),
  help hồi offered at most once per NPC per life, its title says PHỤ TUYẾN + name + step.
- old saves load (main save, phase-1 save, full-road save of review/road-map tests + a save from before this branch).
- vp scan (VANPHONG: no %, ladder words, cổ trang) on every new line; kit-only scan (no new CSS/parts: cards = j72 card + log).
- 6 viewports for the help card + person-card line: 755x1000@2, 1180x820@2, 1366x1024@2, 1000x755, 844x390, 390x844.

## 7. ETA (opus, one session; rollover expected after U1)
U0 core + U1 consorts ≈ 3 h · U2 maids ≈ 1 h · U3 men templates (≈20 × 8 short chapter lines + endings, map §4.10 first) ≈ 3 h ·
U4 tests/balance ≈ 2 h. First SẴN SÀNG KIỂM after U0+U1+U4-part (consorts) — reviewable alone; U2/U3 follow on the same branch.
Dependency: this branch carries review/road-map-next → review/story14-p1-r2 (not on main); it cannot land before story14 + road-map PASS.

## 8. Engine needs (for Foreman B, also written in ROAD_MAP §8) and coordination
- E1 (engine, B): rdCast / castRv67 preference — when the player's road casts rival `v`, prefer a consort whose NPC road already has the
  player as her rival (`v.nr.c.v === "me"`), so the two rivalries are one. Hook proposal: castRv67 filter list `RD_CASTPREF` (array of
  fns returning a weight). Not blocking (NPC side can adapt to the player's cast instead).
- E2 (data, B helpers): every `.5`–`.11` chapter keeps `w` (main cast key) and climax pool `p[3]` options with reward keys `w:{…}` — NPC
  roads read them (already the pattern; please keep it in all jrd_<origin>.js).
- C1 (Foreman C AG1 npc-agent): NPC road field is `p.nr` (`p.nr.o` origin key, `p.nr.r` road id), not `p.road`.
- Pictures: none needed for U0–U3 (help card = j72 card with the NPC's face; news = log lines). Missing pictures: NONE → nothing for C.
- KIT: person-card road line needs an existing kit row (check pcard/kitLine §42 in U1); KIT REQUEST if none.

## BUILD U0+U1 (consorts)
- dev/build/jnroad.js (assembled after jreign.js): `p.nr` state; origin from her house (BAL.nroad.org; fromMaid → cn; tt/dtq never shared
  with the player); road = one of the origin's 4 j67 premises, avoiding the player's road and roads other NPCs hold; chapters = ARC67[road]
  (.4) + ROAD14[road][5..11] read at run time (missing → skipped); monthly (monthTick wrapper, host only, `__nroff` off switch) a due
  chapter is played with her own stats: odds = odA(v, base + stat/div ± Lợi thế of her last chapter + help), stat = the one the
  chapter's climax options reward; end = the chapter's own E tag; gain AND loss on her fields + house power (BAL.nroad.fx); real rival
  (another consort or the player when she is cold to the player, at most BAL.nroad.meMax at once): real oán both ways, result lands on
  the player; dead rival recast and told in the news line; dead/out NPC → road closed.
- Help hồi: one chapter per NPC road per life (index in BAL.nroad.helpN) → j72 follow-up `nr_<kind>` (8 kinds: emp, th, hh, thu letter,
  do (dò la, B = her rival), y (thái y), che (shelter), bac (loan)); title «{A}: «road» · Chương n «chapter»» (+ jstory «Phụ tuyến · … ·
  Lời nhờ»); asked only with a real motive (bond ≥ askRel, same faction/side, never her own rival); options: Sức road vs bạc road
  (bạc by rank BAL.nroad.bac/bacRk) + betray (tell her rival: rival bond +, her bond −, her chapter harder); every option cost + real loss.
  Result → her chapter (hb ±BAL.nroad.help) + j72 nợ ân ledger + bond.
- News: «Tin trong cung · {A} · «road» chương n: «chapter» — ending» (≤ BAL.nroad.newsMo a month; always when the player is the rival).
- Person card (Hậu cung): row «Tuyến truyện: «road» · qua chương n: tag» in .pcinfo (same pattern as j85 ducLine / j24 danger line).

## NEXT: U2 maids + U3 men (design for the successor)
- U2 maids (jnroad.js, same engine): staff maids (`allServ()` role maid, each consort's `p.staff`) + the player's maids get `s.nr` with
  o:"cnv" and a cnv road (cnv_chu/ban/mat/ma; their {mis} = the maid's real mistress). Help hồi asker kind "sv"/"maid" in j72 (q72A).
  Chapters read wording by «maid» state (no S.srv for NPCs: the maid is always «kẻ hầu» in her own lines). A maid raised to consort
  (j88 f88Carry / j8 sendMaid / j14 mlEye / jkc) keeps her nr: wrap f88Carry → `n.nr = {…m.nr, o:"cn", r: a cn road, n: next chapter}`
  (origin cn = Cung nữ được sủng hạnh). Bot cost: ~40 maids × a monthly check — keep it O(n) with the `t` due turn (already so).
- U3 men: NEW data (ROAD_MAP §4.10 to add, B checks canon): 20 templates × .4–.11 short off-screen lines (title + 3 ending tags with
  k sign + test stat + cast key), attached only to real men: Thị vệ (gd): «Đường lên Thống lĩnh», «Mối tình bên cổng cung», «Án mất
  trộm ngự khố» · Thái y: «Y thư thất truyền», «Đơn thuốc bị tráo» · Vương gia: «Đất phong», «Lòng người ngoài biên» · Nhạc sư: «Khúc
  nhạc mừng thọ» · Sứ thần: «Điều ước hai nước» · Họa sư: «Bức họa mỹ nhân» · Tổng quản: «Ấn Tổng quản», «Đường về quê» · Kính sự
  phòng: «Sổ ghi Kính sự phòng» · tiểu thái giám: «Từ tiểu thái giám đi lên» · quan (j55 house heads): «Ghế Thượng thư», «Lời đàn
  hặc», «Thông gia với phủ khác» · hoàng tử (age ≥ BAL): «Thái phó và học vấn», «Ngôi Đông cung», «Ra trận lập công». Effects through
  real fields only (S.men af/loyal, eunuch rank, house pow tdPowAdd, kid study/heir weight); Emperor + Thái hậu = jreign (no new road).
  Help kinds reuse the 8 nr_* templates with rk "man"/"off"/"eun"/"doc" (q72A kinds exist).
- Engine needs unchanged (§8). No pictures needed.

## TESTS (U0+U1, review/npc-roads f699bbf4)
| test | result |
|---|---|
| npc-roads.js @755x1000, 4 lives × 180 months (tt, dtq, thd, muoi), build = review/npc-roads + road-b1/b2/b3 merged LOCALLY (not pushed) | 38/38 PASS: 113 NPC roads, every road of her origin, chapters in order .4→.11, roads close after .11, none plays after death/close, ≤1 help hồi per NPC, 0 page errors; chapter ends 359 won / 112 middle / 263 lost; player as rival 3 of 113 |
| same test, help part: 8 kinds × (option 0, betray) | titles «{A}: «road» · Chương n «chapter»»; ok → her next chapter +Lợi thế, betray → harder; gain-and-loss scan 24 options, 0 without cost or real loss |
| npc-roads-saves.js @1180x820 (this build + LIVE main site save) | 5/5 PASS: main save loads, live consorts get a road (lazy), ser/deser keeps every v.nr, plays on, person card row present, 0 page errors |
| save size | NPC road state 4.1–5.1 KB per save (25–31 consorts over 15 years) vs 640–820 KB whole save (< 1 %) |
- On review/npc-roads ALONE only tt has .5–.11 (engine branch), so other NPC roads close after .4 until B's roads land (by design).
- OPEN (not blocking): in bot lives the help hồi was offered 0 times in 113 roads — the bot builds no bonds, so the motive gate (bond ≥
  BAL.nroad.askRel, same faction/side) never opens; in the forced test the quests work. Balance pass with a bond-building bot = U4.
- Not done: screenshots (the bot page stays behind the rebirth/boot cover; the row is one text span in the existing kit person card
  .pcinfo, j85 pattern; the help card is the unchanged j72 card) → reviewer please eyeball Hậu cung card + one nr_* offer at 755x1000 / 1180x820.
- Kit: no CSS, no new part. VANPHONG: cổ trang lines, no %, odds shown by j72's ladder words.

SẴN SÀNG KIỂM f699bbf4b9355398c7ad1387baab4f1b0bb59fc0 (U0+U1 consorts; U2/U3 next on the same branch)

## HANDOVER (worker rollover, context ≈ START_CTX + 25 %)
Successor (opened by Foreman D): continue review/npc-roads with U2 maids, U3 men, U4 bond-bot balance per 'NEXT' above. Worktree
/home/user/wt/npcr may be reused; the local test branch tmp/npcr-full (+ /home/user/wt/npcrt) was removed — recreate by merging
origin/review/road-b1/b2/b3 into a local copy (conflicts: assemble.py = union of lists, jbal2.js = keep both sides, index.html/sw.js
rebuild). Tests: `node dev/test/npc-roads.js <url> 4 180` (~40 min), `node dev/test/npc-roads-saves.js <url> https://thientran2711.github.io/cung-tuong-mong/`.

## BUILD U2 + U3 + U4 (successor worker session_01DgYSWnAp8mvj9ZAfXiKrhf, START_CTX ≈ 5 % of the 1M window, own estimate)
- U2 maids (jnroad.js): every staff maid of every house (allServ role maid) + the player's trusted maid S.maid lives one of the 4 cnv roads
  (cnv_chu/ban/mat/ma, .5–.11 from jrd_cnv when landed); {mis} = her real mistress (ownerOf; the player for her own maids). Her odds =
  BAL.nroad.base + (m.st + her trait m.tr + servant rank × m.rk) / div (+ Lợi thế after a won chapter, + help). Chapter end on real fields:
  mp (merit → servant rank, j14) and loyal (to her mistress) + her mistress's Danh share; rival = the coldest maid of ANOTHER house (af both
  ways). Asks the player only with a real motive: her own maid with loyal ≥ m.askLoy, another house's maid when the player is close to her
  mistress (bond ≥ askRel or same faction). A maid raised to consort (j8 sendMaid, j14/jmline eye — both go through j88 f88Carry, wrapped)
  keeps her road state: same log, same help chapter, goes on as a cn road from her next chapter (`pr` = her old road; `wasMaid` → origin cn).
  News «Tin trong cung · X, người hầu của …» (own maids always, others within newsMo). Road line on her card in the Kẻ hầu tab (pcard lines,
  the j70 staff-tab pattern).
- Help-card voice (all 8 nr_* cards, whole group): a consort says ta + Tỷ tỷ / Muội muội, a maid nô tỳ + Tiểu chủ / Nương nương (tsGoi),
  a eunuch nô tài, a man thần (Vương gia: bản vương), VANPHONG §2. FIX (same group): the address after a full stop was lowercase
  («… rồi. tỷ tỷ được …») in all 8 cards → capitalised.
- U3 men (NEW dev/build/jnroadm.js, after jnroad.js): 20 templates × 8 chapters (proposed §4.10 below) on the REAL men only: S.men by role
  (the m96 Thanh mai trúc mã man excluded: his story owns him), court men S.court (tq, ksp, ty, ped), staff eunuchs (servant engine, road
  eun_len), the house heads (trS().H; the player's own father excluded: her road owns him), sons of NPC consorts ≥ BAL.nroad.men.kidAge
  (her own children excluded: ch12 is about them). Odds from his own stat (S.men loyal, house head sk, prince tal; court men BAL st).
  Real fields both ways (BAL.nroad.men): S.men loyal (jmen bribe odds) + rival man's loyal; court men af toward a patron consort / away
  from the other side (ksp af.me = the night-register odds of jcycle), a lost chapter costs the patron Danh; house heads pow + rival
  house pow + house relation (enmity; off_thong binds/splits the two houses); princes fond/tal/hp + rival prince's fond. When the
  player's side is hit (her house, her son, she is the patron/foe) the news line always shows and says so. Help asks: S.men tinh ≥ askTinh,
  court men / house heads af.me ≥ askAf, allied house (tdRel ≥ askRel); princes and the Nội vụ phủ buyer never ask.
  Man kinds read ONLY men templates (bug found in test: kind "st" Sứ thần matched j67's o:"st" shared arc st_the).
- Tags of men chapters are story words only: never a rank, a death, a dismissal or an heir (real state stays with its own systems).
- Kit: no CSS, no new part (j72 card, log lines, pcard lines). VANPHONG scan of every new string: no %, no digits, no banned words
  («Bạn học» → «Đồng môn», «nước mình» → «bản quốc», «công mình» → «công lao»).

## TESTS (U2+U3+U4, review/npc-roads 02405da5; build = this branch + road-b1/b2/b3 merged LOCALLY, not pushed)
| test | result |
|---|---|
| npc-roads.js @755x1000, 4 lives × 180 months (tt, dtq, thd, muoi) — consort regression after the refactor | 38/38 PASS (110 NPC roads, gain-and-loss scan 24 options → 0 without cost/loss) |
| npc-roads-maids.js, 2 lives × 120 months + forced raise / help / card | 22/22 PASS: 36–52 maid roads a life, all cnv, in order, rival always another house; staff eunuchs live eun_len; 4 raised maids a life go on as cn with the same log; help cards say nô tỳ + Tiểu chủ; Kẻ hầu card line |
| npc-roads-men.js, 2 lives × 120 months + forced help / prince / card / co-op guest | 23/23 PASS: 17–18 men roads a life (S.men 9, court 4, houses 4–5), .4→.11 in order, tags on every end, no road for her father / m96 / her children, fields in range; help for man/doc/eun/ksp/off with thần / nô tài / bản vương; prince road .4→.11 moves fond/tal/hp; card line once he is known; guest plays nothing |
| npc-roads-saves.js @1180x820 (LIVE main save + this build) | 6/6 PASS (+ maid/eunuch/man road state survives ser/deser) |
| save size | consorts 3.9–5.7 KB + maids/eunuchs 1.4–2.3 KB + men 2.1–2.5 KB per save (≈ 1 % of a 575–765 KB save) |

## U4 BALANCE (dev/measure/npc-roads-bal.js, month-loop lives, 40 lives × 15 years per style)
| run | style | her death % | NPC Danh / Sủng / rank (live) | NPC dead | HH seat held % | kids dead | chapters consort/servant/men | help asked consort/servant/men |
|---|---|---|---|---|---|---|---|---|
| 1st numbers | off | 40.0 | — | 3.9 | 17.5 | 1.3 | 0/0/0 | 0/0/0 |
| 1st numbers | on | 37.5 | — | 4.3 | 42.5 | 2.4 | 79.5/90.0/132.7 | 0.8/0.2/0.3 |
| after rebalance | off | 42.5 | 66.1 / 92.1 / 3.8 | 4.0 | 37.5 | 1.7 | 0/0/0 | 0/0/0 |
| after rebalance | on | 48.6 | 60.3 / 89.8 / 3.8 | 4.4 | 54.3 | 1.4 | 74.9/80.5/122.7 | 0.9/0.3/0.2 |
| after rebalance | bond | 40.0 | 63.8 / 90.8 / 3.7 | 4.1 | 25.0 | 1.8 | 75.0/71.0/124.2 | 5.5/2.1/9.2 |
- Rebalance (BAL.nroad.fx): wins outnumber losses (≈ 50 : 37), so win {danh 3, sung 2, suc −4} vs lose {danh −4, sung −3, suc −2}, mid {suc −2, danh −1}
  → expected Danh/Sủng of a chapter ≈ 0; NPC Danh/Sủng/rank with roads ON ≈ OFF (above). The «HH seat held» column is noise at n = 40: the OFF
  build alone moved 17.5 → 37.5 % between runs of the same code. Her death % and NPC deaths stay within noise.
- The month loop does not play her climb, so «her HH reach» is not read here (the full-play bot npc-roads.js has no rank metric); NPC-world skew is.
- Help hồi with a bond-building player: ≈ 17 asks in 15 years (≈ 1 a year) vs ≈ 1.4 with no bonds → the motive gate works (U1 OPEN item closed).

### 4.10 Men — road templates (PROPOSED by Foreman D, review/npc-roads jnroadm.js; canon check Foreman B)
Off-screen roads of REAL men (U3). Each chapter: title (player text) [cast key w] — win tag / lose tag (middle = «việc còn dở dang»); .11 = win / middle / lose. Test stat in brackets after the road. Tags are story words only: never a rank, a death, a dismissal or an heir.
**gd — Thị vệ (S.men)**
- gd_tl · Đường lên Thống lĩnh [loyal]
  - .4 Ca trực đêm mưa [gd] — giữ vững cổng cung / để lọt kẻ lạ
  - .5 Kẻ đứng trên [gd] — được Thống lĩnh để mắt / bị Thống lĩnh quở
  - .6 Đồng liêu ghen [gd] — êm chuyện với đồng liêu / bị đồng liêu gài
  - .7 Bạc lót tay [bac] — từ chối bạc bẩn / dính tiếng nhận bạc
  - .8 Hộ giá đi săn [emp] — hộ giá chu toàn / để ngựa kinh trước thánh giá
  - .9 Kỳ khảo võ [gd] — đứng đầu kỳ khảo / thua kém người sau
  - .10 Lời tiến cử [off] — được tiến cử / lời tiến cử bị gác lại
  - .11 Đường lên Thống lĩnh [emp] — được Hoàng thượng nhớ tên / giữ được chỗ đứng / lỡ đường thăng tiến
- gd_tinh · Mối tình bên cổng cung [loyal]
  - .4 Chiếc khăn rơi [gd] — trả khăn kín đáo / bị người khác trông thấy
  - .5 Lời hẹn dưới cây hòe [gd] — giữ được lời hẹn / lỡ hẹn
  - .6 Kẻ dòm ngó [eun] — qua mắt kẻ dòm ngó / bị kẻ dòm ngó ghi tên
  - .7 Thư tay [man] — thư đến tay người nhận / thư lạc đường
  - .8 Lệnh đổi ca [gd] — vẫn được trực chỗ cũ / bị đổi đi xa
  - .9 Tin đồn trong cung [eun] — tin đồn lắng xuống / tin đồn lan rộng
  - .10 Chọn giữa tình và chức [gd] — giữ được cả hai / phải buông một
  - .11 Mối tình bên cổng cung [gd] — hẹn ngày nàng ra cung / giữ trong lòng, không nói / dứt tình cho yên thân
- gd_kho · Án mất trộm ngự khố [loyal]
  - .4 Đêm ngự khố mất đồ [eun] — báo kịp lúc / bị nghi đầu tiên
  - .5 Dấu chân bên tường [gd] — lần ra dấu vết / dấu vết bị xóa
  - .6 Kẻ tình nghi [eun] — tìm ra kẻ đáng ngờ / bị đổ oan một phần
  - .7 Thận Hình ti tra hỏi [eun] — khai rõ ràng, được thả / chịu đòn tra
  - .8 Món đồ trở lại [bac] — tìm lại món đồ / món đồ bặt tăm
  - .9 Kẻ đứng sau [off] — lần ra kẻ đứng sau / bị chặn đường tra xét
  - .10 Trình án [emp] — án được trình lên / án bị dìm
  - .11 Án mất trộm ngự khố [emp] — rửa sạch tiếng, được thưởng / án khép lại, không ai được gì / mang tiếng mãi
**ty — Thái y (S.men Thái y + court Thái y)**
- ty_thu · Y thư thất truyền [loyal]
  - .4 Cuốn sách nát [man] — giữ được cuốn sách / sách mất mấy trang
  - .5 Phương thuốc lạ [man] — đọc ra phương thuốc / đọc sai một vị
  - .6 Thử thuốc [bac] — thuốc có hiệu / thuốc vô hiệu
  - .7 Đồng liêu dị nghị [off] — thuyết phục được Thái y viện / bị chê là tà thuật
  - .8 Bệnh dịch ngoài thành [emp] — cứu được nhiều người / dịch lan rộng
  - .9 Tranh công [off] — giữ được công lao / bị kẻ khác nhận công
  - .10 Dâng sách [emp] — sách được dâng lên / sách bị gác xó
  - .11 Y thư thất truyền [emp] — y thư được chép vào Thái y viện / giữ riêng một bản / sách cháy, chỉ còn trong trí nhớ
- ty_tra · Đơn thuốc bị tráo [loyal]
  - .4 Thang thuốc khác màu [man] — nhận ra kịp / không nhận ra
  - .5 Ai chạm vào thuốc [eun] — lần ra người chạm thuốc / dấu vết đứt
  - .6 Lời đe dọa [v] — đứng vững trước lời dọa / im lặng vì sợ
  - .7 Bệnh nhân trở nặng [bac] — cứu được bệnh nhân / bệnh nhân nguy kịch
  - .8 Thái y viện xét việc [off] — được tin / bị nghi
  - .9 Chứng cứ [v] — giữ được chứng cứ / chứng cứ bị lấy mất
  - .10 Trước mặt Hoàng hậu [hh] — lời khai được tin / bị buộc tội
  - .11 Đơn thuốc bị tráo [hh] — rửa oan, kẻ tráo thuốc lộ mặt / giữ được tiếng, mất lòng tin / mang tiếng oan, vẫn bị nghi
**vg — Vương gia (S.men)**
- vg_dat · Đất phong [loyal]
  - .4 Chiếu ban đất [emp] — nhận đất màu mỡ / nhận đất cằn
  - .5 Mùa màng [bac] — mùa được / mất mùa
  - .6 Quan địa phương [off] — quan địa phương phục / quan địa phương chống
  - .7 Lời gièm vào kinh [emp] — lời gièm bị gạt / lời gièm lọt tai Hoàng thượng
  - .8 Thuế đất [bac] — nộp đủ thuế / thiếu thuế
  - .9 Thái hậu hỏi han [th] — được Thái hậu khen / bị Thái hậu trách
  - .10 Dâng biểu [emp] — biểu được chuẩn / biểu bị bác
  - .11 Đất phong [emp] — đất phong yên ổn, dân quý / giữ được đất, mất lòng triều / đất phong lụn bại
- vg_bien · Lòng người ngoài biên [loyal]
  - .4 Tin biên ải [emp] — được đi trấn biên / bị giữ lại kinh
  - .5 Quân lương [bac] — đủ quân lương / thiếu quân lương
  - .6 Tướng dưới quyền [gd] — tướng dưới quyền phục / tướng dưới quyền ngờ vực
  - .7 Sứ giặc đến [envoy] — giữ thể diện triều đình / để sứ giặc lấn lời
  - .8 Trận đầu [gd] — thắng trận đầu / thua trận đầu
  - .9 Lời đồn mưu phản [emp] — lời đồn tan / lời đồn bám theo
  - .10 Về kinh [emp] — về kinh trong vinh dự / về kinh lặng lẽ
  - .11 Lòng người ngoài biên [emp] — biên ải yên, lòng người theo / giữ được biên, mất lòng triều / bị Hoàng thượng nghi kỵ
**ns — Nhạc sư (S.men)**
- ns_tho · Khúc nhạc mừng thọ [loyal]
  - .4 Lệnh soạn khúc [th] — nhận lệnh vui vẻ / nhận lệnh trong lo âu
  - .5 Bản phổ cũ [man] — tìm được bản phổ cũ / bản phổ thiếu trang
  - .6 Đàn bị hỏng [bac] — sửa được đàn / đàn hỏng hẳn
  - .7 Nhạc công bỏ đi [man] — giữ được nhạc công / thiếu người tấu
  - .8 Tập trước Thái hậu [th] — Thái hậu gật đầu / Thái hậu nhíu mày
  - .9 Kẻ chép trộm [man] — giữ được khúc nhạc / khúc nhạc bị chép trộm
  - .10 Đêm trước tiệc thọ [th] — mọi thứ sẵn sàng / còn dở dang
  - .11 Khúc nhạc mừng thọ [th] — khúc nhạc vang khắp Đức Thọ cung / tấu xong, không ai nhắc / lạc một nhịp trước Thái hậu
**st — Sứ thần (S.men)**
- st_uoc · Điều ước hai nước [loyal]
  - .4 Quốc thư [envoy] — trao quốc thư đúng lễ / sai lễ khi trao quốc thư
  - .5 Lễ bộ tiếp sứ [off] — được tiếp đãi chu đáo / bị Lễ bộ làm khó
  - .6 Điều khoản đầu [off] — giữ được lợi cho bản quốc / phải nhượng một điều
  - .7 Quà dâng Thái hậu [th] — quà được nhận / quà bị trả lại
  - .8 Tai mắt quanh sứ quán [gd] — thoát được tai mắt / bị theo dõi sát
  - .9 Hội đàm [emp] — hội đàm êm thấm / hội đàm căng thẳng
  - .10 Đóng ấn [emp] — ấn được đóng / việc đóng ấn bị hoãn
  - .11 Điều ước hai nước [emp] — điều ước thành, hai nước giao hảo / điều ước tạm hoãn / hội đàm đổ vỡ
**hs — Họa sư (S.men)**
- hs_hoa · Bức họa mỹ nhân [loyal]
  - .4 Lệnh vẽ chân dung [emp] — nhận lệnh vẽ / nhận lệnh trong lo sợ
  - .5 Phi tần ngồi họa [v] — nét vẽ được khen / bị chê vẽ không giống
  - .6 Bạc lót tay [bac] — từ chối bạc lót tay / nhận bạc, vẽ đẹp thêm
  - .7 Bức họa bị đổi [eun] — giữ được bức thật / bức họa bị tráo
  - .8 Hoàng thượng xem tranh [emp] — Hoàng thượng khen / Hoàng thượng phật ý
  - .9 Lời vu [v] — gạt được lời vu / mang tiếng vu
  - .10 Bức họa cuối [emp] — hoàn thành bức họa / bức họa dang dở
  - .11 Bức họa mỹ nhân [emp] — bức họa treo ở Càn Ninh cung / tranh cất vào kho / bị cấm cầm cọ một thời
**tq — Tổng quản (S.court.tq)**
- tq_an · Ấn Tổng quản [loyal]
  - .4 Ấn bị dời chỗ [eun] — tìm lại ấn / ấn trễ một ngày
  - .5 Kẻ nhòm ngó ghế [eun] — dẹp được kẻ nhòm ngó / kẻ nhòm ngó lớn mạnh
  - .6 Sổ chi tiêu [bac] — sổ sách sạch / sổ sách hụt
  - .7 Phe phi tần [v] — giữ được thế đứng giữa / bị kéo vào một phe
  - .8 Hoàng thượng hỏi tội [emp] — được tha / bị quở
  - .9 Thái hậu ra mặt [th] — Thái hậu che chở / Thái hậu lạnh nhạt
  - .10 Người nối tay [eun] — chọn được người tin cẩn / người nối tay trở mặt
  - .11 Ấn Tổng quản [emp] — giữ ấn vững vàng / giữ ấn, mất lòng người dưới / suýt mất ấn
- tq_que · Đường về quê [loyal]
  - .4 Thư từ quê [man] — thư báo bình an / thư báo tin dữ
  - .5 Xin phép về thăm [emp] — được chuẩn / bị bác
  - .6 Gửi bạc về quê [bac] — bạc đến nơi / bạc bị chặn
  - .7 Họ hàng tìm đến [man] — giúp được họ hàng / họ hàng làm khó
  - .8 Người cũ trong làng [man] — gặp lại người cũ / người cũ đã khuất
  - .9 Lời đồn ăn bớt [eun] — lời đồn bị bác / lời đồn bám theo
  - .10 Ngôi mộ tổ [bac] — sửa được mộ tổ / không kịp sửa mộ
  - .11 Đường về quê [emp] — lo xong việc quê, lòng nhẹ nhõm / lo được một nửa / quê nhà xa mãi
**ksp — Kính sự phòng (S.court.ksp)**
- ksp_so · Sổ ghi Kính sự phòng [loyal]
  - .4 Một dòng bị tẩy [eun] — phát hiện kịp / không ai hay
  - .5 Thẻ bài lật sai [emp] — sửa được sai sót / sai sót đến tai bề trên
  - .6 Phi tần đút lót [v] — từ chối khéo / nhận bạc, mang nợ
  - .7 Hoàng hậu xem sổ [hh] — sổ sạch / sổ có chỗ lạ
  - .8 Kẻ chép sổ [eun] — giữ được sổ / sổ bị chép ra ngoài
  - .9 Tin có thai [man] — ghi đúng ngày / ghi lệch ngày
  - .10 Sổ được trình [emp] — sổ khớp từng dòng / sổ lệch một dòng
  - .11 Sổ ghi Kính sự phòng [emp] — sổ được tin như vàng / giữ được sổ, người ghi bị nghi / sổ thành mối họa
**eun — tiểu thái giám (staff eunuchs + Nội vụ phủ S.court.ped)**
- eun_len · Từ tiểu thái giám đi lên [loyal]
  - .4 Việc nặng đầu tiên [eun] — làm xong chu toàn / làm hỏng việc
  - .5 Sư phụ [eun] — được sư phụ nhận dạy / bị sư phụ bỏ
  - .6 Đồng liêu chèn ép [eun] — qua được chèn ép / bị chèn ép
  - .7 Việc kín của chủ [mis] — giữ kín việc của chủ / để lộ việc của chủ
  - .8 Bạc đầu tiên [bac] — để dành được bạc / mất bạc
  - .9 Được giao việc lớn [mis] — việc lớn thành / việc lớn hỏng
  - .10 Lời tiến cử [eun] — được tiến cử / bị gạt tên
  - .11 Từ tiểu thái giám đi lên [mis] — thành người tin cẩn của chủ / vẫn là kẻ hầu lặng lẽ / bị chủ ghẻ lạnh
**off — house heads (j55 trS().H, her father excluded)**
- off_ghe · Giữ ghế trong triều [sk]
  - .4 Tờ biểu đầu năm [emp] — biểu được khen / biểu bị chê
  - .5 Kẻ dòm ghế [off] — dẹp được kẻ dòm ghế / kẻ dòm ghế lớn mạnh
  - .6 Việc trong bộ [off] — việc trong bộ trôi chảy / việc trong bộ ách tắc
  - .7 Ngự sử xét sổ [off] — qua được kỳ xét / bị bắt lỗi
  - .8 Lòng Hoàng thượng [emp] — Hoàng thượng tin / Hoàng thượng ngờ
  - .9 Môn sinh [off] — môn sinh đắc lực / môn sinh phản thầy
  - .10 Buổi chầu lớn [emp] — đứng vững trước triều / bị triều thần vây
  - .11 Giữ ghế trong triều [emp] — ghế vững như bàn thạch / giữ được ghế, mất bè cánh / ghế lung lay
- off_dan · Lời đàn hặc [sk]
  - .4 Tấu đàn hặc [off] — tấu bị gạt / tấu được đem ra nghị
  - .5 Ngự sử tra xét [off] — sổ sách sạch / sổ sách có vết
  - .6 Đồng minh trong triều [off] — đồng minh đứng ra / đồng minh im lặng
  - .7 Chứng cứ [off] — chứng cứ bị bác / chứng cứ được tin
  - .8 Lời trong hậu cung [hh] — hậu cung nói đỡ / hậu cung im lặng
  - .9 Đại Lý tự xét [off] — được minh oan một phần / bị kết một tội nhẹ
  - .10 Hoàng thượng định đoạt [emp] — được tha / bị phạt bổng
  - .11 Lời đàn hặc [emp] — rửa sạch, kẻ đàn hặc mất mặt / qua được, tiếng còn vương / mang tội, phủ suy
- off_thong · Thông gia với phủ khác [sk]
  - .4 Lời ngỏ [off] — lời ngỏ được nhận / lời ngỏ bị từ chối
  - .5 Xem tuổi [off] — tuổi hợp / tuổi xung
  - .6 Sính lễ [bac] — sính lễ xứng / sính lễ thiếu
  - .7 Kẻ chen ngang [off] — gạt được kẻ chen ngang / bị kẻ chen ngang phá
  - .8 Hoàng thượng hỏi đến [emp] — Hoàng thượng chuẩn / Hoàng thượng chần chừ
  - .9 Lời đồn trong kinh [off] — lời đồn tan / lời đồn làm hai phủ ngờ nhau
  - .10 Ngày cưới [off] — lễ cưới linh đình / lễ cưới lặng lẽ
  - .11 Thông gia với phủ khác [emp] — hai phủ kết thành một khối / thông gia mà không thân / hôn sự đổ vỡ, hai phủ thành thù
**hz — sons of NPC consorts ≥ BAL.nroad.men.kidAge**
- hz_hoc · Thái phó và học vấn [tal]
  - .4 Ngày đầu ở Thượng thư phòng [off] — được Thái phó khen / bị Thái phó phạt
  - .5 Kinh sử [off] — thuộc làu kinh sử / học trước quên sau
  - .6 Đồng môn [off] — kết thân với đồng môn / bất hòa với đồng môn
  - .7 Phụ hoàng khảo bài [emp] — trả lời trôi chảy / ấp úng trước phụ hoàng
  - .8 Cưỡi ngựa bắn cung [gd] — bắn trúng hồng tâm / ngã ngựa
  - .9 Bài văn đầu tay [off] — bài văn được truyền tay / bài văn bị chê
  - .10 Kỳ khảo cuối [emp] — đứng đầu các hoàng tử / đứng sau các hoàng tử
  - .11 Thái phó và học vấn [emp] — văn võ song toàn, phụ hoàng đẹp lòng / học hành bình thường / bị phụ hoàng chê lười
- hz_le · Lễ trưởng thành [tal]
  - .4 Lễ đội mũ [emp] — được ban áo mũ / lễ bị hoãn
  - .5 Phủ đệ đầu tiên [bac] — phủ đệ chu toàn / phủ đệ thiếu thốn
  - .6 Người hầu cận [eun] — chọn được người hầu tin cẩn / người hầu ăn bớt
  - .7 Ra mắt tông thân [th] — tông thân khen / tông thân chê
  - .8 Việc triều đầu tiên [off] — làm tròn việc / làm hỏng việc
  - .9 Lời khuyên của mẫu phi [mom] — nghe lời mẫu phi / trái ý mẫu phi
  - .10 Phụ hoàng ban thưởng [emp] — được ban thưởng / không được nhắc tên
  - .11 Lễ trưởng thành [emp] — được phụ hoàng tin giao việc / trưởng thành lặng lẽ / bị chê chưa ra dáng
- hz_tran · Ra trận lập công [tal]
  - .4 Xin ra trận [emp] — được chuẩn / bị giữ lại
  - .5 Tướng già dạy việc [gd] — được tướng già nhận dạy / bị tướng già coi thường
  - .6 Quân lương [bac] — quân lương đủ / quân lương thiếu
  - .7 Trận đầu [gd] — thắng trận đầu / thua trận đầu
  - .8 Thư mẫu phi [mom] — thư đến kịp / thư thất lạc
  - .9 Công và tội [off] — công được ghi / tội bị kể
  - .10 Khải hoàn [emp] — khải hoàn trong tiếng reo / trở về lặng lẽ
  - .11 Ra trận lập công [emp] — lập công lớn, phụ hoàng ban thưởng / về bình an, công nhỏ / bại trận, mang tiếng
## FOR FOREMAN B (relay by Foreman D)
- §4.10 above is a PROPOSAL (data = dev/build/jnroadm.js on review/npc-roads; the rows are printed from that file). Please check canon
  (titles, cast keys, no clash with §5.2/§5.4) and copy into ROAD_MAP §4.10; changes → tell D, the data follows the map.
- No new story-only NPC, no new place name (Thượng thư phòng, Thận Hình ti, Càn Ninh cung, Đức Thọ cung, Đại Lý tự already in the game).

SẴN SÀNG KIỂM 02405da5cc35a01450d2dccd1ee3f2f70c5585a2 (U2 maids + U3 men + U4 balance; U0+U1 reviewed separately at f699bbf4)
- Reviewer please eyeball at 755x1000 / 1180x820: Kẻ hầu card road line (own maid), a Nam nhân card (known man), one maid nr_* offer.
- Not done: screenshots (bot pages stay behind the boot cover); no viewport run of the cards (text lines in existing kit cards only).

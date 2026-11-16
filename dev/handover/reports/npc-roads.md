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

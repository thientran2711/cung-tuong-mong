# OD03 — Emperor's monthly favoured / disfavoured art (fav-art) — worker report

PRIORITY #1 CHECK ('favArt|empArt|favour|od03'): OD 26 | ledger 1 | claims 8 | main 15 | review/* 0 | archive 58. Owner rule: OD:L1484 (16/11 ~23:05Z, verbatim, "mỗi tháng ... hoàng thượng tự chọn một cái môn ..."). Main has NO month-art code (the 15 main hits are other "favour" words); the BASE review/night-balance-bundle (from balance-core) ALREADY holds the core (jbalcore.js: empArtMonth / empArt / eaLearn / eaTell / stBestArt / stealArtB / stealShown; BAL.steal.art {fav:1,dis:.75,neu:0}, BAL.steal.ea {mat,r0,rMat,disc,w}; co-op: empArtMonth MUTE + eaLearn ONLY_ME in jcoopone). Law 13 → REUSED it; built only the missing parts below.

Branch: review/od03-favart (base review/night-balance-bundle 21703845). Order: MAIN CHÍNH 92 via Foreman D (#15 → #16 session_01964izEETBrWc48AZ1jsSvM).

## What was missing and is now built (62 lines in 5 game files)
| # | gap on the base | fix | law |
|---|---|---|---|
| 1 | NPC flip-choice (jsteal stModes) weighed Tranh sủng / Chặn ngự giá by the TRUE odds incl. a month art she does not know; the player sees only stealShown | stModes → stSeen = stealShown (month art only once she knows it); the roll stays the true oSteal | 1 two-way |
| 2 | NPC «Hỏi sở thích Hoàng thượng» (cx2:likes) never revealed the month art; hers did (discover hook, BAL.steal.ea.disc); NPC never asked again once the flower was known | one rule eaAsk(p) (BAL.steal.ea.disc) for her discover AND the NPC ask; NPC ask open while eaOpen(v) | 1 two-way, 4 one core |
| 3 | her Kính sự phòng ask closed once all likes were known, so the month art could not be asked | ask also open while eaOpen(S) | 3 gain-and-loss (cost bạc, gain info) |
| 4 | the month art was shown nowhere but a log line | Emperor card (kit pcard group "Điều ngài thích") rows «Tháng này chuộng» / «Tháng này không ưa» = art name, or «chưa rõ» (eaRows; kit rows, no new part) | 9 kit, 7 cổ trang (no %) |
| 5 | old save: no month art until a played week ran | deser hook draws it on load (guest muted, host's arrives) | old saves |
Numbers: none new — BAL.steal.art / BAL.steal.ea / BAL.art.odds (the bundle's tuned table). Odds in the flip card stay words (jnf word(), stealShown). Equal-value: Tranh sủng vs Chặn ngự giá unchanged (bundle's tuning); fav adds, dis subtracts (gain-and-loss).

## Tests
- dev/test/od03-favart.js (new): card rows unknown/known · her ask open/closed · NPC ask at ea.disc 0 → 0/50, 100 → ≥40/50 · seen < true when unknown, = when known · stModes reads stSeen · old save (no ea) draws on load + plays → **PASS** (3 runs).
- dev/test/balance-core.js → PASS, 0 page errors.
- **coop-e2e 97/97 PASS** (live Worker) with a new check in same(): both seats read the same month art at start / weeks 1–3 / after rejoin, incl. a month rollover (theu/vu@0 → nau/theu@1 on both).
- quickcheck (e9451578, before site build): QUICKCHECK PASS for open / old save from LIVE / perf (render 273/288 ms, buổi 1511/1397); FAIL lines were (a) NOT BUILT → fixed (build_site committed), (b) G2 rules-one-source «need th» — **PRE-EXISTING on the base**: rules-one-source.js on base 21703845 build gives the same class (need th 62 vs 70, thCheck 67/70); this branch touches no promotion "need" code. Old save ok on both.

## run5b.sh measurement (bundle numbers; 5 shards × 9-origin rotation, HHSTOP, sens bot)
Counter: dev/measure/od03-count.js (EXTRA), table: dev/measure/od03-table.py. Arm ON = this branch; arm OFF = same build with BAL.steal.art={fav:0,dis:0,neu:0} (month art drawn, no effect) = "before". Kind = the trier's best art vs his month art. Tries counted at stealWin / stealFail (tie losers excluded). "true odds" = oSteal before the mini-game rung.

| flip tries (all NPC) | OFF tries | OFF won | OFF odds | ON tries | ON won | ON odds |
|---|---|---|---|---|---|---|
| favoured month | 147 | 39 % | 40 | 247 | **53 %** | 55 |
| neutral | 804 | 40 % | 39 | 1380 | 42 % | 38 |
| disfavoured | 147 | 41 % | 41 | 239 | **34 %** | 22 |
By choice (ON): Chặn ngự giá fav 57 % (odds 63) / neu 41 % (38) / dis 30 % (16); Tranh sủng fav 48 % (48) / neu 43 % (38) / dis 37 % (29) → the bold road rides the month art (×2), the safe one less (×.75), as BAL.steal.m.*.art says. Shown odds when unknown: road dis 37 vs true 16, fav 45 vs true 63 → not knowing costs real choices (Tai mắt / ask worth it).

| her month (best art vs his art) | OFF Sủng/mo | OFF Danh/mo | ON Sủng/mo | ON Danh/mo |
|---|---|---|---|---|
| favoured | −0.02 | −0.26 | +0.10 | +0.14 |
| neutral | +0.51 | +0.52 | +0.44 | +0.08 |
| disfavoured | +0.13 | −0.09 | +0.29 | −0.32 |
Lives: ON 20 · HH 6 (30 %) · yrs to HH 7.5–20.1; OFF 14 (off2 still running at write time; finished lives only) · HH 8 (57 %) · 5.8–17.7.

FINDINGS for D (balance owner, not changed here):
1. The sens bot NEVER presses Tranh sủng / Chặn ngự giá itself (0 "me" tries in 34 lives), so she gets none of the month-art gain while NPCs get it → her Sủng/Danh-by-month rows are noise and the HH drop ON 30 % vs OFF 57 % (≈2 SE, small sample) is likely the NPCs' month-art wins with no answer from the bot. Bot policy (inpage6) should learn the flip choice before this number is read as balance.
2. Realised win % is compressed vs odds (dis odds 22 → 34 % won) by the NPC steal mini-game rung (BAL.steal.mg npcP:1) — as designed, noted for the read.

SẴN SÀNG KIỂM cd43bd8a (review/od03-favart)

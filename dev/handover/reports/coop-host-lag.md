# coop-host-lag — host-only world writes reach the guest one merged week late (law 11 family) — worker #1 report + HANDOVER

PRIORITY #1 CHECK ('figThPick|host-only|coop host lag'): OD 0 | ledger 0 | main jfigx:39 figThPick (lazy, host only) | review/names-unique-r2-r1 8d71fed7 (jnamefix host-only sweep, LAND READY, not on main) | review/* none for the fix | claims: this row only. G #6 (review/coop-thin-g) not touched: my code is a NEW file jcoophl.js + one assemble.py line (overlap with G = assemble.py list only).
Worker session_01N1tNP6rvC3RLvQMFGeo8UB (opus), depth 2, coordinator Foreman B ROOT-1 session_01N1tNP4TLZqJMNrsakh7Bjk. START_CTX ≈ 4 % (used_tokens reads 0; estimate) → rolled over at ≈ 29 %.
Branch **review/coop-host-lag** @ **6fb5ca7a** = origin/main 26f3bfa9 + merge of review/names-unique-r2-r1 8d71fed7 (assemble list: jname + jnamefix kept beside main's jnwb; site rebuilt) + this work. **Lands AFTER names-unique-r2-r1.**

## Root cause (one rule for the whole family)
Level 0–2 rooms (LIVE default = 0): a merged week reaches each seat as fromCanon → deser → ~35 deser hooks → render (lazy picks). Any world write the HOST makes there (or later in render) and the guest does not make the same way rides only the host's NEXT end → the guest sees it one merged week late. At level ≥ 3 the host's snapshot + world deltas (jcoopthinc C.apply) already carry it.

## Scan (law 11) — two tools
1. `dev/test/coop-host-lag-scan.js [lives] [months]` (lister, one page): replays deser+render+every lazy face pick from one save as host and as guest (different RNG), diffs the canonical world. Run 2 lives × 6 months (pre-fix):

| side | world path | hits | member |
|---|---|---|---|
| host-only | S.fidUsed.n / R#.staff.#.fid | 32 / 32 | lazy figPick at render (both seats pick, different faces) |
| host-only | R#.pets.n.life, lifeW | 3 | jpetlife plAssign at load |
| host-only | R#.staff.#.tho/thoM/thoO | 3 | jmort initAll lifespan at load (host only) |
| guest-only | R#.pets.n.lifeY/old, S.wx.lv/kd/kl | 3 / 2 | derived on the guest (wx = per-khắc cache) |

2. **Gate** `dev/test/coop-e2e.js` new check "the same world on both seats (canonical W)" after every merged week (two seats, LIVE Worker; `COOP_WDIFF=1` writes wdiff.txt). Baseline (pre-fix, 1 run): week 1 = 13 paths, week 3 = 56 paths incl. **R#1.staff.#s25.name/call (host-renamed ma ma, guest old name)**, tho/thoM/thoO, mk/emoH/emo, fidUsed (guest pid), __mkAt, S.wx.

## Fix — dev/build/jcoophl.js (new, assembled last) — whole family, generic
- HOST, after a merged week / start / state / peer rejoin / guest "ask" / every host lazy pick or rename: diff its canonical world (W_KEYS + NPCs; viewer rows, friend entry, her personal parts, "__" stamps dropped) vs the world last shared → ops `{t:"act",k:"ctm-wfix"}` (Worker relays as is; no Worker change). Merge-safe: a number whose base is a number is never sent (m3 adds deltas → double count), except NOADD state numbers (same list as merge.js).
- GUEST applies the ops in place (object identity kept; her own coop entry kept), counted as a sync (CW.inFC) for the tripwire; every host rename (nmFix any sweep) also rewrites HER OWN texts (law 6b), again after her next merged week.
- Faces: host `figFill` at its endTurn (before its end goes out) and at every check: every world person without a face gets one, so C carries it; **host reserves the friend's own face (her pid) in S.fidUsed** (before: only her seat held it; host could give her face to an NPC); guest never stores a world person's face (shows a seeded pick, not stored; off at level ≥ 3).
- Inert at level ≥ 3 (thin deltas carry the world), solo never runs it. Host cost: check 8 ms (Fold, measured stat.ms).

## (c) rebirth flake = TIMING, not a bug
Evidence: in every logged case "A sees the reborn friend by her new name" passed (she WAS reborn, later) and the misses ran beside other suites. The test waited 12 fixed tries (~11 s). Now a 45 s time budget; printed time: 10/10 runs reborn in 1.5–3.2 s.

## Tests (build 6fb5ca7a minus the last small commit, see HANDOVER)
| test | result |
|---|---|
| coop-e2e ×10 LIVE Worker (4 random, 3 guest cung nữ, 2 both cung nữ, 4 with COOP_HL_FORCE) | forced (a) Thái hậu face same merged week **4/4**, forced (b) renamed servant same week **4/4**, guest's own text renamed **4/4**; rebirth **10/10**; Thái hậu picture equal 10/10; totals 74/76, 74/76, 78/79, 76/76, 71/76, 74/76, 79/79, 75/76, 69/76, 78/79 |
| world parity gate remaining (not this family, open) | R#.resHead/resHall (guest assignHouses writes housing; resHead numeric id is delta-added by m3 — merge bug), S.men.#.tin (one seat writes), R#.emoH (NPC feeling history, non-id array, per seat), fidUsed after rejoin (guest restore), R#.mk [] |
| names split 2/10 (L2-3 B=cn, L2-5 random) | NOT diagnosed: the old check printed 300-char cuts; 6fb5ca7a prints exact A-only/B-only names → rerun |
| one-core-guard / undef-scan | PASS / PASS |
| names-oldsave, quickcheck, coop-bot THIN=9 (+TRIP), coop-home, old-save | NOT RUN yet (see HANDOVER) |

## HANDOVER #1 → #2 — DONE by worker #2 (see "## #2" below)

## #2 — worker session_01N1tNP4bsWeYsVudLfWWFKf (opus), depth 2, START_CTX ≈ 4 % (used_tokens reads 0; estimate)
PRIORITY #1 CHECK ('palFix|hhBind|tinOf|resHead|emoH|coop host lag'): OD 0 | ledger 0 | main: jpal palFix, j24 hhBind, jtin tinOf (no co-op rule) | review/* none for these (names-unique-r2-r1 = names only; coop-thin-g / coop-staff-split: no file of mine; my code = jcoophl.js only, + coop-e2e.js) | claims: this row.
Branch **review/coop-host-lag** @ **3d73134b** = #1 6fb5ca7a + merge LIVE origin/main dd248d5d + #2 work (all in dev/build/jcoophl.js + dev/test/coop-e2e.js; site rebuilt). Still lands AFTER names-unique-r2-r1.

### (1) names split 2/10 = TEST artifact, not a game fault
Exact names (new print): `Bonly:["Trình Sơ Ảnh"]` = A's OWN name. When a player is a servant (cn / tiểu thư road), her own entry on the OTHER seat is a coop staff entry `{coop:true}` in her mistress's staff; the e2e names list counted staff without dropping `coop` (consorts were filtered, staff were not). Fixed in the test (`staff.filter(x=>!x.coop)`); the world is the same. 0 name splits in the 36 runs after.

### (2) LAW 11 — every left member, proven with a forced e2e test or a real-run trace; none left as a ticket
| member | root (found by run evidence) | fix (jcoophl, level < 3; solo + level ≥ 3 untouched) | proof |
|---|---|---|---|
| R#.resHead / resHall (+ pal, palLone, palWait) | each seat ran palFix (deser / render / month) its own way; m3 ADDS two seats' resHead ids (run R1: `R#11.resHead A=2 B=3`, base 1 → 4 = a third consort) | world housing is the HOST's: guest palFix restores every world person's housing (her own S housing stays hers; NPC move lines not logged on her seat), her week end carries the room base's housing (CW.cW), host relays housing numbers at once (safe: the guest never moves them, nothing added twice) | forced (c): a consort's head = herself → host re-houses → guest same week **13/13** (final build 4/4); new gate "every person a world record points to (house head, spy master) exists" **176/176 checks** |
| S.men.#.tin (+ any world person's first Chủ tin) | jtin tinOf stores a lazy first value on READ (from loyal at that moment); the guest's visit stored one the host never had (men = host-only, never merged) | guest shows the first value, never stores it; host stores + relays (base unset → sent) | forced (d): a man's tin unset → both read → guest = host same week **13/13** (final 4/4) |
| R#.emoH (feeling history) + R#1 emo/mk | real-run trace (COOP_EMOTRACE): `normAll → staffInit → consorts → hhBind → affAdd → emoEv → emoSet` on the Empress: j24 hhBind "migrates" a plain old `hh` number of an object when consorts() first binds it; every rebuild (rejoin, merged week) made new objects, each seat blended at its own moment → an extra cause "được X đối đãi tử tế" on the Empress on ONE seat (+ her regard drifted) | at level < 3 that world write is the host's: guest drops the old number unblended, host blends + relays (soon "hh") | forced (e): a feeling cause the host writes in the merge path reaches the guest same week **10/10** after its test fix (3 earlier fails = the test's guest lacked the cause text; final 4/4); emoH/emo/mk diffs in the gate **0** in the last 22 runs (before: 5 of 12) |
| Thái hậu face changed c15 → c06 on the HOST (law 6c) | host picked lazy faces while waiting for the friend (after its "init" C); the room start (begin → fromCanon of the init C) dropped them, the next render picked another face | host keeps the first face it gave each person (key = who) and gives it back after the start rebuild | new gate "the Thái hậu keeps the face she had at the start" **60/60 checks** in 15 runs |
| guest's first week without the host's writes (no Thái hậu face) | a FIRST join has no world of hers at "start" (she picks her person later: "state" → newLife); ops sent before were dropped, nobody asked again | guest also asks on "state" | start "same Thái hậu picture" 12/12 after (before: 2 fails in 22) |
| S.fidUsed: her own people's faces only on her seat (after rejoin) | host reserved only her pid | host reserves every face her own people hold (her P: pid, maid, staff, kids) — the host can no longer give one to a world person | gate S.fidUsed equal 12/12 after |
| net / trong / khScar,khTmp (lazy, deterministic) | jnet netOf, jtrong trongOf, jkh khInit store a fixed-hash / children-count value on first READ: one seat that drew the card holds it | not a world split (same value on both seats when read): the gate reads every world person on both seats first, then compares | gate clean 12/12 after |
| tho / thoM / thoO (jmort lifespan) | host-only secret number; the guest never holds it (deleted on her seat), merge keeps the host's | none needed (guest never shows it) | scan row only |
| a world person ADDED by a host op ("a"; #1 path) had no viewer rows on the guest | ops carry the world part only (rl/ro/gp/ep/evm, rel/oan/ghen/ev dropped); coop-home under load: `rivalsBuoi → hostility → oan` read `x.ro[...]` of a new consort → TypeError, entry week stuck | the guest starts her rows toward this seat empty, as fromCanon does (ghen = ghenNew0, ONE CORE) | coop-home under load: before 46 ok + 4 FAIL (TypeError, entry week stuck); after **51/51** (main 51/51) |
| other number ids (spyFor, lover, owner …) delta-added by m3 | the true root is the server merge (coop/worker/src/merge.js NOADD; G14 in reports/coop-thin-guest-audit.md): a Worker deploy, not a client branch | gate covers spyFor (+ resHead); 0 hits in 18 runs | NOT changed here: Worker change = server deploy (Foreman B / coordinator) |

Scan `node dev/test/coop-host-lag-scan.js 2 6` (lister, no relay) on the final build: host-only rows = what jcoophl relays (fid 35, tho 8, pets life 6, emoH v 1 = the host blend); guest-only rows = what the guest now leaves to the host (emoH 25 / mk 12 = she no longer blends; wx 6 / pets lifeY,old 6 = derived caches, excluded as before). Page errors 0.

### (3) Tests (final = 3d73134b)
| test | result |
|---|---|
| coop-e2e LIVE Worker, final jcoophl (X1–X6, Y1–Y6 = 12 runs: 5 random, 2 B=cn, 2 both cn, 4 COOP_HL_FORCE incl. B=cn) | **11/12 clean** (84/84, force 86/86); X4 = khScar gate artifact (fixed by the both-seat read, no code change) |
| coop-e2e on the last commits (Z1–Z2 on 79da5810, Z3–Z4 on 3d73134b: random, force+cn, random, force) | **4/4 clean** (84/84, 86/86) |
| earlier batches on the way (S/T/U/V/W, 24 runs) | every fail traced and fixed above; one CDN CORS console error (W7, img por-maid-m27, infra) |
| forced (a) Thái hậu face, (b) renamed servant + her own text, (c) housing, (d) trust, (e) feeling cause — same merged week | (a)–(d) **13/13**, (e) **10/10** after its test fix; final build **4/4 each** |
| rebirth / old save / solo inside coop-e2e | pass in every run |
| quickcheck (`bash dev/tools/quickcheck.sh`) | **PASS** 584 s (old save ok, core gates PASS, perf new/live render 358/342, buổi 2490/2712) |
| names-oldsave (old = origin/main dev/index.html, new = this build, 8 y × 8 lives) | **PASS** (errsOld 0, errsNew []) |
| undef-scan / one-core-guard | **PASS** / **PASS** |
| coop-bot THIN=9 TRIP=1 (level 3: jcoophl inert there; new vs main side by side) | bot STALLS on BOTH builds the same way (a modal the bot cannot close; main 12 w: stuck at week 6; 4 w ×2: main 0/4 + 4/4, new 0/4 + 4/4); jcoophl OFF 4/4, #1 jcoophl 4/4, one new 0/4 → not a branch fault (bot flake, main too). Tripwire STATE per guest act, 4-week runs: new 9670/24 acts = 403, main 7113/18 = 395 (≈ same); week-0 runs 2643 vs 2220 (5 vs 7 acts). One removed risk: fidBack no longer renders inside the "start" event |
| outside/coop-home.js | **51/51** on 3d73134b (run beside 2 e2e lanes); main 51/51 |
Laws: 6b/6c (one face per person, her people's faces reserved, a face never changes), 11 (whole family + gates), 4 (no new number; NOADD = merge.js list), 14 (one world copy: ops patch it; the guest never writes host-owned parts). No UI change (no shots).

## REVIEW r1 — BIG reviewer session_01N1tNP6RAQ5d4gTSNa3cYiK (opus), depth 3, START_CTX ≈ 4 % (used_tokens reads 0; estimate)
PRIORITY #1 CHECK ('coop-host-lag'): OD 0 | ledger 0 | claims 8 | main 0 | review/* 1 (review/coop-host-lag) | archive 0. Also seen: review/coop-name-clash c2353df6 (SSK, names lane, does not touch jcoophl/j95c).
Branch **review/coop-host-lag-r1 @ fe7297f6** = LIVE origin/main **983a9436** + review/coop-staff-split-r1 a069b6ea + review/coop-host-lag 3d73134b (which holds names-unique-r2-r1 8d71fed7) + 3 reviewer fixes. Base = staff-split-r1 merged with newest LIVE (land order names-unique → staff-split → host-lag kept).
Merge conflicts resolved: assemble.py (LIVE list + jname/jnamefix), j10.js (staff-split hhHas coop filter + names-unique nmNew mkServ), jkc2.js (LIVE bdTxt Khả hãn/Ba Tư vương + names-unique gv/gm/gf names), coop-e2e.js (staff-split one-place/identity checks + host-lag Aonly/Bonly print + world-parity gate), index.html/sw.js rebuilt.

### Verdict: PASS fe7297f6 for the coop-host-lag scope — LAND HOLD on the names-unique stack (role-parity, below)
| law | result |
|---|---|
| 1/2/3/5/7/9/10/12 | not touched (no UI, no option, no number); no shots needed |
| 4 ONE CORE | one-core-guard PASS (fails 0); no new number (NOADD = merge.js list) |
| 6b/6c real people (one name, one face) | improved; 1 residual (Thái hậu face, below) |
| 11 whole family | worker's table checked by forced/real runs + 2 more members found and fixed (below) |
| 14 one copy | ops patch the one world; the guest no longer writes host-owned names/faces |

### (1) "names split 2/10 = test artifact" — CONFIRMED, no hidden split
My own check (not the worker's): on every seat, after start / every merged week / rejoin / rebirth, every person object listed with all its places (rivals, every staff list, kids, Thái hậu staff, own staff/kids); the WHOLE set of names (world + herself + the coop entries) compared between seats as a multiset; each player exactly once (one coop entry = the friend, never herself, no object in 2 places).
54 e2e runs + 2 forced (12 on the merged worker build, 6 worker build A/B, 36 on reviewer builds; random, B=cn, A=cn, both cn, COOP_HL_FORCE, force+cn): **one-place 0 bad** (1 = a run where the host's socket dropped 1006 at the start, friend not placed: network); **names split after a merged week 0** except R4, where the week itself never merged (stall, below). The worker's test fix (staff.filter(!coop)) is right.

### (2) Law-11 family, forced/traced by me
| member | how I proved it | result |
|---|---|---|
| (a) Thái hậu face same week / keeps her face | e2e gates in 56 runs | 55 ok; **E1: host c01 at start, guest none for 20 s, then the host itself showed c16 from week 1 (face changed)** — 1/56, not reproduced in 26 runs after with extra logging (RVTH). Residual, see FOR B |
| (b) renamed servant + her own text same week | COOP_HL_FORCE runs (R4, Q3, Q6, B3, B6, C5, D5, H5, G4, FD) | ok in every run that merged its week |
| (c) housing resHead/resHall + "every id points to a person" | gates in every run | 0 hits |
| (d) men.tin lazy-on-read | forced (d) in force runs | ok |
| (e) emoH hhBind migration | gate (emoH/emo/mk) every run | 0 diffs |
| fidUsed (friend's people's faces) | gate | **Q3 (worker code): after rejoin S.fidUsed held maid:m50 / maid:m36 on the guest only** (her own new maids, drawn after her last end). FIXED r1 (rsv), 0 in 44 runs after |
| op-added person without ro/rl | coop-home 51/51 | ok |
| **NEW member: guest-only world rename at start** | my check found a start split in 5/20 runs on BOTH the worker build and mine (8 s, not converging until week 1); trace E/F: R8 maid sid21 «Thu Thiền» on host, «San Hô» on guest; guest's own maid also «Thu Thiền». Root: j95c **j95cDedupe** (start / ageInit / j95sync) renames a WORLD servant on the guest seat only; the host keeps the old name, the merge puts it back: one person, two names for a week, then a full-name clash with her own maid | FIXED r1: at level < 3 on the guest every world servant keeps its name (host owns world names, as jnamefix rules). Forced proof RV_FORCEDD: worker build renamed the world servant (kept=false), r1 kept it (kept=true, gDd 1). Start splits after fix: 0 in 12 runs |
| level >= 3 "untouched" claim | code read: figFill at host endTurn, fidBack at start and fidNote ran at level 3 too | FIXED r1: gated by !lvl3() (now really inert there) |
| tho/thoM/thoO, net/trong/kh | scan rows / gate | as the worker says |

### (3) Tests on fe7297f6 (and paired main 983a9436)
| test | result |
|---|---|
| coop-e2e (my copy with the independent check) ×54 + forced 2 | listed above; other reds: week stall ×4 (R4 week 3, Q4 + D3 after rebirth, FD0 week 3 on the worker build), CORS rank-worker console error ×1 (infra) |
| week stall on main? | **yes, paired**: main coop-e2e ×8 → M5 stalled at week 1 (same signature: modal open, end not sent, seat steps back to buổi 1); coop-bot THIN=9 TRIP=1 4 w: main 2/4, new 4/4 and 0/4 — pre-existing, not this branch |
| quickcheck ×2 | **PASS** ×2 (old save ok, core gates PASS; perf new/live render 272/224 & 226/218, buổi 1158/2315 & 1177/1103) |
| one-core-guard / undef-scan | PASS / PASS |
| names-oldsave (old = LIVE, new = r1, 8 y × 8 lives) | PASS |
| names-unique (15 y × 3 lives) | 0 failures |
| outside/coop-home | 51/51 |
| coop-bot THIN=9 TRIP=1 (level 3) | no page errors, 0 weeks with divergence; tripwire STATE per week new ≈ 2.9k vs main ≈ 4.9k (not worse) |
| **role-parity** | **FAIL 1 (×2 runs): maid:N-ONLY:maid:accuse**. main 983a9436 ALL PASS; main + staff-split-r1 ALL PASS; r1 with jcoophl REMOVED still FAILS → it comes from the **names-unique-r2-r1 stack on newest LIVE** (or the j10/jkc2 merge of it), not from coop-host-lag. names-unique tip alone (old base f43efc71) cannot be compared (old open-gap list, many gaps) |

### FOR B / FOR MAIN
1. LAND HOLD: names-unique-r2-r1 merged with LIVE 983a9436 fails role-parity maid:accuse (player cung nữ's «Tố cáo … trước Hoàng hậu», j42 p.sk==="hh"); the names lane must fix it on its own branch before it lands; then re-merge this r1 on it (expect assemble.py / j10 / jkc2 / coop-e2e as above).
2. FOR MAIN (not a FAIL): the server merge NOADD for other id numbers (spyFor, lover, owner…) = Worker deploy (coop/worker/src/merge.js), not in this branch.
3. Pre-existing on main: the week stall (modal open, end not sent, seat steps back to buổi 1 on a late room snapshot: jcoopworld "room" handler catch-up while CW.sent<wk) ≈ 1 in 8–14 e2e runs on main and branch alike; coop-bot THIN=9 stalls on main too. Worth a co-op worker.
4. Residual (1/56): Thái hậu face changed c01→c16 on the host from week 1 in run E1 (guest had none at start). Not reproduced in 26 runs with logging; a follow-up for the co-op lane with the RVTH logger (dev/test copy in this report's runs).
5. kc2 «Xuân Đào» rename (jkc2 kc2Init renames any k61All person named Xuân Đào) is another guest-side world rename of the same kind; rare (names-unique avoids the name) — left as a note.
6. coop-name-clash (c2353df6) reviewer: my j95cDedupe guard keeps world names on the guest; its "host decides one name list" should agree; re-check after merge.

Reviewer fixes (all in dev/build/jcoophl.js): j95cDedupe guest guard; rsv (guest's own people's faces reserved on the host at once, also sent with "ask"); !lvl3() on figFill / fidBack / fidNote.

## R2 — lazy-face family closed for every figure (B LANDER #2b session_01N1tNP6cqrrDPRXd6b6opjm, 21/11 04:30Z–07:40Z)
PRIORITY #1 CHECK ('lazy face', 'figThPick', 'f88Take', 'mkMigrate' co-op): OD 0 | ledger 0 | claims: this lane (Foreman B ROOT-4 order 04:19Z) | main: jcoophl r1 only | review/*: coop-host-lag-r1(-land463) only → built on 081797c8.
Branch review/coop-host-lag-r2 @ **f13d8932** (base LIVE db6ae2a0 + host-lag 081797c8). Only dev/build/jcoophl.js + new dev/test/coop-hl-faces.js (+ generated index.html/sw.js).
Causes (probe = dev/test/coop-hl-faces.js: N real rooms, level 0, every figure's face host vs guest at start + after week 1; before: 3/8 rooms bad):
1. Host faces given by paths no wrapper sees (jfigx figFor / figPick(S.thO) call the module's own figThPick) were never sent → guest had none; next merged week re-drew them (Thái hậu c29 → c22).
2. check() with no shared base yet (after a room start) set shared=now without sending → writes in that gap reached no one.
3. A later "pick" timer cancelled the start/week check (soon() keeps one why).
4. The GUEST stored her own lazy face for world people: render path (unwrapped pick) and the j88 pool f88Take (f88Draw / f88Carry, outside render) → two faces, kept by both merges (consort:c16 host vs maid:m34 guest; e2e R#7 c22 vs m42/m40).
5. Same family, other lazy write: mood memory mkMigrate made by the guest's first mood read only (e2e R#10.mk A=undefined B=[]).
Fix (jcoophl.js): host fidScan after every render + retry until figxReady; fidBack after every merged week; base-C fallback when no shared; every world face sent as idempotent "s" ops at start/week/rejoin/ready/state (faceDue survives a later timer); guest render never stores a world face (gSnap/gBack); guest f88Take for a world person returns the face without storing/reserving; host mkMigrate for every world person with a mood.
Tests on f13d8932 (each alone, base db6ae2a0): coop-hl-faces 16/16 + 8/8 rooms clean (was 3/8 bad) · coop-e2e 104/104 ×5 · COOP_HL_FORCE=1 106/106 + with COOP_SWAP=1 106/106 · COOP_NC_FORCE=1 106/106 · quickcheck PASS · undef PASS · role-parity ALL PASS.

## HANDOVER (07:40Z 21/11, ctx 36 % > START 5 % + 25 %) → successor opened by Foreman B
- LIVE moved to aee7ff84 (164 files since db6ae2a0). Left: merge origin/main into review/coop-host-lag-r2 f13d8932 (jcoophl.js is the branch's own file; coop-e2e.js / assemble.py may conflict → LIVE side + branch additions; generated files = LIVE's then `bash dev/site/build_site.sh`), push, then rerun ONE AT A TIME: `N=8 node dev/test/coop-hl-faces.js`, `node dev/test/coop-e2e.js <out>` ×5 (all 104/104 or the new LIVE count), `COOP_HL_FORCE=1` and `COOP_HL_FORCE=1 COOP_SWAP=1` coop-e2e, `COOP_NC_FORCE=1` coop-e2e, quickcheck, undef-scan, role-parity (alone, ~10 GB).
- Then send Foreman B «SẴN SÀNG KIỂM coop-host-lag-r2 <sha>» (Foreman opens an opus BIG reviewer). Note for the reviewer: guest f88Carry still sets n.fromMaid on her seat (face not stored) — check the host makes the same world fact.

## R2c — merge LIVE + the portrait-clash member (B LANDER #2c session_01N1tNP5ihpHbBRmxrezPTPd, depth 6, START_CTX 10 %, 21/11 07:34Z–11:40Z)
PRIORITY #1 CHECK ('S.pid' clash, 'reserveFriend', 'coop-hl-faces'): OD 0 | ledger 0 | claims: this lane only | main: jcoophl r1 only | review/*: coop-host-lag-r2 only (coop-emo-seat: no file overlap, not on LIVE at a4ee93d7 → its lander re-runs coop-hl tests if it lands second).
Branch review/coop-host-lag-r2 @ **70309b27** = f13d8932 + merge LIVE aee7ff84 + merge LIVE 2bab70e1 + 3 fixes. Generated index.html/sw.js = LIVE's, rebuilt; source merged clean; LIVE changed no function jcoophl wraps (figThPick/figPick/figFor/f88*/mkMigrate/nmFix).
1. NEW member found on the merge (law 11, same family): **a world consort given the FRIEND's own portrait** (her S.pid, drawn on her Luân hồi before her person reached the host). j88's figPick guard on HER seat (`rivals.includes(who) && who.fid===S.pid → who.fid=null`) wiped it there only: one consort, two faces for good (probe trace: r5 consort:c19 applied from the host, then nulled by j88 on the guest). The probe did not count it (only Thái hậu + redraw = bad). Pre-existing (f13d8932 alone: 2/8 rooms guest-missing; on aee7ff84 merge: 3/8, two of them later showing a different guest face).
   Fix (jcoophl reserveFriend, host): a rival holding her portrait yields — face dropped, FLAST + FID note dropped (else fidBack puts it back after the merged week), figFill draws a new one (check runs figFill when a clash was cleared), the diff sends it. Scope = rivals only (= j88's guard); a Thái hậu / servant / her maid's face equal to hers is a duplicate face, not a split → NOTE for the reviewer (a first try over all world people / her people's faces re-drew those at week 1: 4/8, 2/8 bad).
   Test: coop-hl-faces now counts a face still split after week 1 as bad.
2. coop-e2e "hl force (c)" FAIL ×2 on the aee7ff84 merge = TEST artifact: the forced re-housing put the consort under the GUEST player; the host reads resHead 902, her seat "me" (jcoopworld REFF: "me" = that seat's pid) — same fact. The test now maps "me" to the seat's pid; COOP_SWAP run exercises exactly that case (902/902 PASS).
Tests on 70309b27 (each alone): coop-hl-faces N=8 three runs on the fixed code: 8/8, 8/8 (pre-commit), 7/8 (R4: at the START window the guest had no Thái hậu face within 20 s — the host sent only 2 "ask" checks in that window, no "start" face send; healed by week 1, redrawn 0 — residual start-timing of cause 2/3, ~1 in 32 room starts on this branch; LIVE without r2 had 3/8 of this kind) · extra run 8/8 (total 31/32 room starts clean, 0 splits after week 1) · coop-e2e 104/104 ×5 · COOP_HL_FORCE=1 106/106 · +COOP_SWAP=1 106/106 · COOP_NC_FORCE=1 106/106 · quickcheck PASS (old save ok; perf new/live render 262/283 ms) · undef PASS (266) · role-parity ALL PASS.
Left for the reviewer: (a) Thái hậu / servant / her maid holding the same pool face as her portrait or her people = duplicate face (both seats agree), not fixed here; (b) the start-window miss above (heals at week 1); (c) #2b's note: guest f88Carry sets n.fromMaid on her seat. LIVE is at a4ee93d7 now (branch has 2bab70e1): the land re-merge needs only index.html/sw.js rebuilt unless co-op files move.

## REVIEW r2-r1 — BIG reviewer session_01N1tNP2pAt8zEYzvzn4yUxb (opus), 21/11; branch review/coop-host-lag-r2-r1 @ c34efd5b (contains LIVE 9c5b6de3)
PRIORITY #1 CHECK: grepped OWNER_DECISIONS / OWNER_LEDGER / HANDOVER / PROGRESS + git grep origin/main and origin/review/* for fidBack / FID / reserveFriend / rfYield / roomFaces / mindTr / netOf; reused jcoopworld rfYield / roomFaces (coop-room-faces, LIVE) and the r2c clash path; no new mechanism added; read CLAIMS + FOREMAN_B_STATUS (Foreman B = ROOT-8 session_01N1tNP5aArhXJqHNFSRixhK).

VERDICT: NOT YET — reviewer rolled over by context (summary compaction > START + 25 %). Branch is pushed; a successor reviewer finishes it. Do NOT land 70309b27 alone: the fixes below are needed.

### Findings on 70309b27 (+ fixes on review/coop-host-lag-r2-r1)
1. Start-window miss (7/8) = REAL BUG, not a probe artifact: the host answered the guest's "ask" with the diff only, no faces (R5 guest had no Thái hậu face). Fix: "ask" in FACEW.
2. Thái hậu redraw one beat after the merged week (same signature as r1 E1): fidBack ran only on "week"/"start"; a later rebuild (fromCanon) re-drew. Fix: fidBack in CW.afterFC (after every host rebuild, before render).
3. After LIVE coop-room-faces: room audit (D) failed 3/8 on the branch, 0/14 on LIVE: fidBack gave a world servant its pre-join face while the guest drew it for her own maid. Fix: fidBack treats every face of the friend's own people as held; reserveFriend's r2c clash covers her maid/staff/kids, order-aware (only a face the merged W never had yields on the host; otherwise rfYield makes HER person yield).
4. Lazy-write family (law 11, two more members): jmind mindTr (trM fade on read) and jnet netOf (net drawn on read) stored on world people on the guest seat (e2e after rejoin). Fix: wrapped like tinOf (guest shows, host stores + sends).
5. «hl force (c)» test mapping (resHead 'me' -> 901/902 by seat): checked against jcoopworld REFF/me(): correct, hides no fault.
6. f88Carry note (#2b (c)): a guest-made world consort is dropped by the merge on both seats (forced CARRY probe 3/3): no lasting split.
7. Probe artifact: servant sid collides across seats (j10 sidN per seat); probe key now sid+name. The collision itself belongs to coop-guest-names.

### Tests on c34efd5b (chain6)
coop-hl-faces x3 N=8: 24/24 rooms clean · coop-e2e x5: 4x 136/136, 1x 135/136 (open item B) · HL_FORCE 138/138 both seat orders · NC_FORCE 138/138 both · coop-room-faces x3: 2 PASS 37/37, 1 FAIL (open item A) · coop-pool-face 13/13 · coop-arrive-see L9 swap0 89/89, swap1 89/89 · coop-emo-seat 25/25 · undef-scan PASS (281) · quickcheck PASS, old save ok, perf new/live render 218/240, tab 484/459, buổi 1005/992, tasks>200ms 21/19 · role-parity ALL PASS · worker node tests 7/7.

### OPEN (successor: fix or prove LIVE has it, then rerun the set above)
A. Stuck week (~5/40 runs on the branch since LIVE 9c5b6de3; 0/14 roomfaces+e2e runs on LIVE so far): the guest never sends her week end: CW.pend=true, sent=-1, Q holds night dialogs ("cnvScold:… quở mắng", "e68q6srvCredit:Kẻ hầu") that are never shown, so tryEnd waits on Q.length for ever. Next: run LIVE coop-room-faces/e2e ~10x more to get a real LIVE rate; if LIVE is clean, bisect the branch commits (70309b27 alone vs + my fixes) for what keeps Q un-shown on the guest.
B. After rejoin: S.fidUsed guest-only tail (maid:m09/m33) — coop-room-faces' figUsed writes held faces into the list on each seat; the host's "state" check (added) did not close it. Likely the guest's own new faces before her blob reaches the host; decide: host adds friendFaces to the list at every check, or the probe ignores the list tail order.

### HANDOVER
Worktree /home/user/wt/hl-r2r1 (review/coop-host-lag-r2-r1), LIVE build in /home/user/wt/hl-old (detached 9c5b6de3). Chain scripts /tmp/claude-0/rv/chain6.sh (logs c6/). Overlaps still to rerun by whoever lands second: coop-emo-seat (landed), coop-arrive-see (landed), coop-room-faces (landed), coop-thin-g F1 (assemble.py / coop-e2e.js).

## REVIEW r2-r2 — successor BIG reviewer session_01N1tNP4aNyydwDP7vchNRnH (opus), 21/11–22/11; START_CTX ≈ 5 % (used_tokens reads 0; estimate) → rolled over at ≈ 30 %
PRIORITY #1 CHECK: OD/handover = this report «REVIEW r2-r1» | main LIVE ea112384 (merged) | review/* review/coop-host-lag-r2-r1 | claims: coop-host-lag = Foreman B only; also read reports/coop-cyhold.md + coop-week-stall.md (landed on LIVE; different signatures: level ≥ 5 cyHold / rebirth gate — not this one).

VERDICT: NOT YET — rolled over by context. Branch review/coop-host-lag-r2-r1 @ **97efea56** (= c34efd5b + merge LIVE ea112384 + 2 test-only commits; jcoophl.js unchanged since c34efd5b). Successor finishes the gate chain below.

### OPEN A (stuck guest week) — ROOT FOUND: test-bot gap, not a game fault (both seats can play on)
- Probe: new dev/test/coop-qtrace.js (COOP_QTRACE=1; every Q push + stack, last render / showModal, every `#modal.hidden=true` while Q is not empty + stack; chains jspread's own `hidden` view SP13.vo). Wired into coop-e2e + coop-room-faces (dump on «#next enabled» fail and on a week that does not advance).
- Trace (B-rgx40, branch, guest iPad): Q = [«La Hương Ngưng quở mắng» (j42 srvMoodEvent cnvScold, night), «Kẻ hầu» (e68)], CW.pend, sent −1; showModal called 6× with Q=2 and EVERY call hides the modal from **jdfv.js:57**: `if(m.dfSeen&&DF.encM===m&&DF.F){M.hidden=true;return}` = Dư đồ focus view (3) NPC-INITIATED: the card plays IN the stage scene (SAY box «Tiếp» → choices) instead of the centre modal. A player sees and answers it; the co-op bots' clear() only clicked the modal / kmov, so the card waited for ever and tryEnd waited on Q.
- Why "since LIVE 9c5b6de3": jdfv (duodo-focus 82b04623) is in 9c5b6de3. Why the branch shows it more: jdfv plays a card only when its speaker has a stage figure IMG (dfHasFig); this branch gives the guest the host's world faces (that is its fix), so on LIVE the guest's speaker often has no picture → old centre modal → bots pass. Not a branch fault: on LIVE the same happens whenever the speaker has a picture (dfViewOn is off only under window.__bot; co-op tests do not set it).
- Numbers (ea112384 base, room-faces unless said): branch 4 stuck / ~57 runs (rf6, rfx23, rf25, rgx40), e2e 0/6; LIVE 0/15 room-faces + 0/4 e2e.
- Fix (test-only, 97efea56): coop-e2e.js + coop-room-faces.js clear(): if a focus card plays → click `.kfoc-say .kfoc-next`, then the first enabled `.kfoc-b` (DF.encM set), then `.kfoc-x` when the focus is idle and Q is empty; `window.__kfocN` counts it; room-faces prints «KFOC focus cards answered [A,B]».
- SUCCESSOR, to close A: run `COOP_QTRACE=1 node dev/test/coop-room-faces.js <out>` ≥ 20× (2 in parallel is fine, ~6.5 min each) on 97efea56: expect 0 stuck and some runs with KFOC > 0 (proves the path is exercised). If a stuck remains, the QTRACE line names the hider (hidTr stacks). Also worth a FOR B note: other co-op bots (coop-bot*, coop-home, coop-kcco …) have the same clear() gap once the guest's speakers have pictures (fix the group, law 11: one shared clear helper would be the clean cure — not done here).
- Other room-faces reds seen, test artifacts: (D) «maid:m21 a:R[#1].staff[5] vs b:F.coopAsk[#s14>1].s» = the friend's open coopAsk request copy of a servant she put into NPC #1 and the world servant the host made from it (same person) → (D) now keys servants by sid+name (89209625).

### OPEN B (S.fidUsed guest-only tail after rejoin) — not reproduced
- e2e on ea112384 merge: 6/6 runs 136/136 (no fidUsed diff). Predecessor saw 1/5 on c34efd5b before LIVE moved. Code read: guest rsv on figPick of her own people + rsv list in "ask" + host reserveFriend at every check + j66 figHeld pushes held faces on both seats (order may differ, the gate compares by index). If it shows again: run with COOP_WDIFF=1 and see whether it is order only (then the e2e gate should compare fidUsed as a set) or content (then add rsvSend from the guest render wrapper for every new face of mine() people).

### Gates done on 1c755b67 / 89209625 (jcoophl = c34efd5b)
one-core-guard PASS (fails 0) · undef-scan PASS (286) · coop-e2e 136/136 ×6 · coop-room-faces 37/37 in every run except the 4 stuck + 1 (D) artifact above.
### Gates LEFT for the successor (CO-OP LAND GATE, one at a time unless noted)
coop-room-faces ×20 (A, above) · coop-e2e ×5 (+ COOP_HL_FORCE=1, + COOP_HL_FORCE=1 COOP_SWAP=1, COOP_NC_FORCE=1) · `N=8 node dev/test/coop-hl-faces.js` ×3 · coop-pool-face · coop-arrive-see · coop-emo-seat · quickcheck (`bash dev/tools/quickcheck.sh`) · role-parity (alone, ~10 GB) · re-merge LIVE if it moved (generated index.html/sw.js = LIVE's, then `bash dev/site/build_site.sh`). Then verdict «## REVIEW r2-r3» + LAND READY line at the END of FOREMAN_B_STATUS → MAIN CHÍNH 102 session_01Rc5AsKiX9qxS7M6883Uf6h (main moved from 101, see FROM MAIN 22:50Z).
Laws touched: 4 (no number; one-core PASS), 6b/6c (one face per person — improved), 11 (whole group: lazy-write family done by r2-r1; the bot-clear gap is a test group, FOR B). No UI / wording / option change (1/2/3/5/7/9/10/12 not touched; no shots needed).

## REVIEW r2-r3 — BIG reviewer-lander session_01N1tNP3VQoNHCTut3Sc6VXC (opus), 22/11; START_CTX ≈ 4 % (used_tokens reads 0; estimate)
PRIORITY #1 CHECK: OD/handover = this report «REVIEW r2-r2» | main LIVE 02c6d8f4 (merged) | review/* review/coop-host-lag-r2-r1 + review/coop-thin-g-f1 30e12013/c40d175b (same bot hunk, reused verbatim) | claims: coop-host-lag = Foreman B only.

VERDICT: **PASS 273a527a6** (review/coop-host-lag-r2-r1; contains LIVE 02c6d8f4 = newest origin/main; FF-able).

### What I did on top of 97efea56
1. Merge LIVE 02c6d8f4 (bongloc-options: jcoopworld famops/E44 items, jecon/jptime/jstip/jtoil/jbal2) — no function jcoophl wraps moved; index.html/sw.js = LIVE's, rebuilt.
2. LAW 11 — ONE bot hunk (the order's ask): our r2-r2 clear() variant DROPPED; the hunk of **review/coop-thin-g-f1 30e12013 (.kfoc-next «Tiếp ▸») + c40d175b (.kfoc-b «m<k>» when Q[0].dfSeen)** is used VERBATIM everywhere:
   - coop-e2e.js: both clear() lines = thin-g-f1's clear() verbatim (incl. its earlier guarded bot-family lines: #kroul skip, .kmov end, #ov done/skip, __clrK option cycle) → `git merge-tree HEAD origin/review/coop-thin-g-f1`: coop-e2e.js auto-merges clean. Only conflicts left for whoever lands second: **dev/build/assemble.py** (both add lines after jcoopthinf: keep BOTH — jcoophl.js (wraps nmFix/figPick/figThPick/endTurn) and jcoopthinf6b.js + jcoopthing.js (wrap act/doAct/playArt/exRun); different functions, order free; keep jcoophl last as now) + generated index.html/sw.js (rebuild).
   - Whole group scan (every dev/test/*.js with a clear()): 17 = thin-g-f1's 16 + coop-room-faces (thin's hunk pasted); 22 own-clear bots outside thin's set got the same hunk (20 standard shape: coop-ask-srvprobe, coop-ban-cung, coop-chat, coop-cyhold, coop-dresscode(-scan), coop-e2e-tr, coop-errand, coop-guest-maid, coop-guest-names, coop-haohuu, coop-looks(-act), coop-lost-scan, coop-pool-face, coop-toil-look, coop-ton-row, oldroom-r1, or20-j68q-coop, show-why-coop; + coop-lag CLEAR1 + coop-play's modal loop); the other 29 co-op bots eval coop-e2e's clear() (readFileSync … indexOf('async function clear(')) and inherit it. Before: 1/68 bots answered a focus card (ours, a variant) → after: 68/68, one hunk text. Thin-g-f1 does not touch those 22 files → no conflict.
   - KFOC count (room-faces) moved outside the shared hunk (capture click listener).
3. NEW member of the host-lag family (fixed, jcoophl nmFix wrapper): the host's **nmOrdPrune** drops a done rename order (S.nmOrd[pid]) with NO rename → a host world write no check sent; the guest kept the old order through the merged week AND rejoin (e2e COOP_NC_FORCE: «S.nmOrd A={} B={902:[maid Độc Cô Tĩnh Thù→Thu Thiền]}» after week 3 + after rejoin). Fix: snapshot S.nmOrd before nmFix; host + changed + no renames → soon("nm"). After: NC_FORCE 4/4 both seat orders.

### Tests on c6be0092 (jcoophl final) / 273a527a (tests only after it)
coop-room-faces ×20 on e424c16a (KFOC>0 in 2 runs, 0 stuck — OPEN A closed) + ×2 on c6be0092: 22/22 PASS 37/37 · coop-e2e ×5 on c6be0092: 5/5 136/136 (earlier lane on 09a5a439: 4/5 + 1 flake below) · COOP_HL_FORCE=1 138/138 ×3 · +COOP_SWAP=1 138/138 ×2 (one red BEFORE the unify = cnvScold focus line, the gap this hunk closes) · COOP_NC_FORCE=1 138/137 ×2 + SWAP 137/137 ×2 (after the nmOrd fix) · coop-hl-faces N=8 ×4: 32/32 rooms clean · coop-pool-face 13/13 ×3 · coop-arrive-see L9 swap0 89/89 ×2, swap1 89/89 + 90/90 (one 88/89 visitPal flake before, not repeated) · coop-emo-seat 25/25 ×2 · coop-guest-names 40/40 (new hunk) · undef-scan PASS (286) · one-core-guard PASS · quickcheck PASS ×2 (273a527a: old save ok, perf new/live render 231/229, tab 443/390, buổi 984/1202, tasks>200ms 18/18) · role-parity ALL PASS.
CO-OP LAND GATE: coop-e2e PASS + the feature's both-seat checks (hl-faces, room-faces, pool-face, arrive-see, emo-seat, HL/NC force both orders) PASS.

### Flakes seen (not this branch; FOR B)
- coop-e2e 1/10 «both seats same Thái hậu picture»: same fid both seats (consort:c23), guest figFor '' all run = her FIGURES.json fetch failed once under 2-lane load and j28/j39 never retry (catch(()=>{})). Same as Foreman D's old «guest Thái hậu blank» note. A real weak-network player would see no figures until reload → worth a small retry (j28/j39 loadFigs), separate lane.
- arrive-see swap1 1/4 visitPal: guest visitPal did not move her (place home); 3 reruns clean.
### Laws
4 one-core PASS (no number) · 6b/6c one face / one name per person (improved: nmOrd) · 11 whole group: host-lag write family + bot clear family (68/68) · no UI / wording / option change (1/2/3/5/7/9/10/12 not touched; no shots). Worktrees removed; no CDN review folder used.

## REVIEW r3 (re-land after LIVE bb92f986 conflict; MAIN CHÍNH 103 order 22/11 02:50Z) — same reviewer session_01N1tNP3VQoNHCTut3Sc6VXC; NOT YET, rolled over by context (≈ 29 % ≥ START 4 % + 25 %)
PRIORITY #1 CHECK: OD/handover = MAIN 103 order (via Foreman B) + this report | main LIVE bb92f986 (night-balance-bundle + od03-favart; merged) | review/* review/coop-host-lag-r2-r1 273a527a, review/coop-thin-g-f1 30e12013/c40d175b, LIVE 735606d8 (3 pasted clear() versions → one helper) | claims: coop-host-lag = Foreman B only.

Branch **review/coop-host-lag-r3 @ 624257fd** = 273a527a + merge LIVE bb92f986 + rebuild + 1 test commit. dev/build diff vs LIVE = jcoophl.js + assemble.py only (unchanged since 273a527a).
### Done
1. **THE shared helper: `dev/test/lib/coop-clear.js`** (path for coop-thin-g / coop-guest-week-lag to reuse): `first(o, fn[, arg])` = `tap(o)` then the bot's own `o.p.evaluate(fn)`; `tap` order: (1) Luân hồi roulette «Bỏ qua» `#kroul .krskip` → (2) LIVE's manual kit scene close `.kmov [data-km-close]` (skipped while `window.__noclose`, cn-force) → (3) jfocus «Tiếp ▸» `.kfoc-next` → (4) jdfv encounter choice `.kfoc-b` «m<k>» when `Q[0].dfSeen`; counts (3)+(4) in `window.__kfocN`. Usage in a bot: `const st=await require('./lib/coop-clear.js').first(o,()=>{…its own steps…})`.
2. Group scan + rewrite (script: every dev/test/*.js with a clear(); before → after): pasted roulette blocks 36 → 0, pasted [data-km-close] blocks 35 → 0 (33 standard + coop-night/coop-cyhold/cn-force variants: their extra «tap the reward box open» steps stay inline), pasted jfocus/jdfv blocks 39 → 0 (thin 16 + my 22 + room-faces); **41 bots call the helper** (incl. coop-lag CLEAR1 via first(o,CLEAR1), coop-play via tap(o)), **29 bots eval coop-e2e's clear()** text (readFileSync…indexOf('async function clear(')) and get it through the `require` inside it. Non-co-op kit tests that use .kfoc (kit-focus, duodo-focus-view, seal-*, …) are UI tests, not bots — untouched.
3. coop-e2e merge: our EMOTRACE hook kept; the merge-train-4 CSS hide of .kcf/#kroul dropped (LIVE night-final); LIVE's kg82 steal-game skip step re-inserted before `__co()`; LIVE's month-art check + our Thái hậu face-for-life check both kept.
4. 624257fd: 17 more co-op bots still hid .kcf/#kroul with CSS (LIVE night-final fixed coop-e2e only) → room-faces r3 run 1 stuck at buổi 0:3 (both «Chờ hảo hữu…»); hide removed in all 17 (helper + each bot's .kmend step end them like a player). Not yet re-run.
### Gate results so far on 893ce193 (before 624257fd)
coop-e2e run 1 141/141 · run 2 **134/142 = STUCK NIGHT** (guest B week 2 buổi 3: tr «night 2» repeated, Q [], modal true, sent 1; host A «Chờ hảo hữu…» → later world diff / month-art null / rebirth fails are consequences) · room-faces run 1 FAIL 36/38 (stuck night 0:3, CSS hide → fixed in 624257fd), run 2 37/37. Chain stopped for the rollover.
### SUCCESSOR — left
(a) Find what keeps the guest's night open in e2e run 2: rerun `node dev/test/coop-e2e.js <out>` (+ `COOP_QTRACE=1`) until it repeats; dump `#modal` title/buttons and `document.querySelector('.kmov,#ov,#kg82,.kcf,#kroul')` on the stuck seat. Suspects: a jnf night-choice / card-flip (.kcf) or #kneov frame that neither the helper nor thin's .kmov/#ov steps press; compare with LIVE's own coop-e2e on bb92f986 (run it 3× on a LIVE worktree: if LIVE sticks too, it is the night bundle's test gap, fix it in the helper = one place).
(b) Then the CO-OP LAND GATE chain on the final sha, one at a time / 2 lanes: coop-e2e ×5, COOP_HL_FORCE=1, +COOP_SWAP=1, COOP_NC_FORCE=1, +COOP_SWAP=1, coop-room-faces ×3 (COOP_QTRACE=1), `N=8 node dev/test/coop-hl-faces.js`, coop-arrive-see `<workerURL> 9 0` and `9 1`, coop-emo-seat, coop-pool-face, coop-guest-names, coop-night, coop-cyhold (helper users), undef-scan, one-core-guard, quickcheck, role-parity (alone).
(c) PASS → «LAND READY … → MAIN CHÍNH 103 session_01Rc5AsKQ599YyHUeSs7YqLK» at END of FOREMAN_B_STATUS + tell Foreman B; name dev/test/lib/coop-clear.js as THE helper in the line. coop-thin-g-f1 must then drop its pasted hunks and call the helper (its 16 files will conflict once on the clear() line: take the helper call).

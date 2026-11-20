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

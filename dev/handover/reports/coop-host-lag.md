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

## HANDOVER #1 → #2 (Foreman B opens the successor)
Worktree /home/user/wt/chl (sparse, branch review/coop-host-lag); handover worktree /home/user/wt/chl-ho. Runner: /home/user/wt/chl-shots/lane.sh (`lane.sh L1 "ENV" ...`, summary in runs/summary.txt).
1. Rerun coop-e2e on 6fb5ca7a (≥10: random, COOP_B_ORIGIN=cn, both cn, COOP_HL_FORCE=1) — read the exact names diff of any "same names" FAIL; decide if it is this family (host rename not relayed) or staff-split placement (each player in one place).
2. Add `emoH` to the FEEL info filter in coop-e2e (same feeling-memory family as mk/emo) or fix that family if Foreman B assigns it; resHead/resHall/men.tin = guest-side world writes (mirror family) → follow-up tickets, not this branch.
3. Run: names-oldsave (old = origin/main dev/index.html, new = this build, 8 y × 8 lives), `sh dev/test/quickcheck.sh`, coop-bot THIN=9 (and TRIP=1 guest tripwire: must not rise vs main), outside/coop-home.js, old-save load (inside coop-e2e: passes).
4. Then SẴN SÀNG KIỂM coop-host-lag <sha> to Foreman B.
Laws: 6b (renamed person never named by a stale text, also on her seat), 6c (one face per person, her face reserved), 11 (scan + gate table), 4 (no new number; NOADD = merge.js list), 14 (no second copy of the world: ops patch the one copy). No UI change (no shots).

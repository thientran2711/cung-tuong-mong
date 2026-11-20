# coop-name-clash — co-op player-vs-NPC full-name clash (law 6b) — worker report

PRIORITY #1 CHECK ('name clash coop'): OD 0 | ledger 0 | claims 0 (this row only) | main 0 | review/* 0 | archive 0 — reused: name core S.nmReg / nmNew / nmFix from review/names-unique-r2-r1 8d71fed7 (BIG PASS, not LIVE) + coop-e2e checks from review/coop-staff-split-r1 a069b6ea (PASS) + jcoophl relay of review/coop-host-lag 3d73134b (in review; tested merged, not merged here).
Worker session_01N1tNP3ZzsWP7BnSee6wGzB (opus), depth 3, coordinator Foreman B ROOT-2 session_01N1tNP57XDdMmRT5t1ZtPQB. START_CTX ≈ 3 % (used_tokens reads 0; estimate); finished under rollover.

Branch **review/coop-name-clash @ c2353df6** = names-unique-r2-r1 8d71fed7 + LIVE origin/main 983a9436 (jkc2: nmNew kept + main's bdTxt Ba Tư titles; assemble list = main's + jname/jnamefix) + review/coop-staff-split-r1 a069b6ea (j10 hhHas without coop entries + its e2e checks; j10 keeps nmNew mkServ) + this work. Site rebuilt.

**LAND ORDER:** names-unique-r2-r1 → coop-staff-split-r1 → **coop-name-clash** (contains both, so landing it lands all three) → coop-host-lag (merges clean except assemble.py list + coop-e2e.js hunks; tested merged, see H runs). jcoophl.js is NOT touched; it relays the two new world keys by itself (it diffs X.W_KEYS).

## Root cause (3, all found in code, proven by forced tests)
1. The cung-nữ player's coop staff entry (`{sid:pid,coop:true}` in her mistress's staff) was NOT marked as the friend in `nmPeople` (only coop rival entries were): on the host she was a world person, a consort holding the same full name kept it (the reviewer's «Bạch Phương Hoa» = R5) and her entry could be renamed on the host only.
2. The friend's own people (her maid, servants, children, home family, marriage pools) live only on her seat: the host's name list never saw them, and the guest's registry was personal (her nmNew avoided only what her screen showed, never the host's own people or anyone the host ever named).
3. A new life (first character / rebirth) names its people in start()'s throwaway world, then attach() drops it into the room: nothing checked the draft against the room's people.

## Fix (jname.js, jnamefix.js, jcoopworld.js — host decides, guest reads the same)
- `S.nmReg` (every name ever given) and `S.nmOrd` (host rename orders) are WORLD keys + HOST_ONLY: the guest's new names avoid every name the host ever gave.
- `nmPeople`: coop staff entry = the friend (guest); on the host `nmFrPeople` adds her own people from the room's P (paths "maid", "staff.3", "kc.fam.2", …). Her people hold their full names before world people and the host's own people (those give way, texts follow — names-unique rule). Seen only through her blob they give no short-form ("like") rename of a living world person (that churned a consort for a marriage-pool candidate every merge).
- Behind the HOST player (or an earlier person of hers) her person must give way, but the host cannot rename a person on her seat → ORDER `S.nmOrd[pid]=[{p,o,n}]` (n registered); her seat applies it (`nmOrdApply` after every rebuild, and at render when a relayed order arrives), idempotent, texts follow only when nobody else (incl. the other player's people) holds the old name; host drops the order once her blob shows it done. `nmRewrite` never rewrites S.nmReg / S.nmOrd.
- `nmBirth(C)` in attach(): every person of a new life whose full name — or a short form of a living person's — is already in the room (NPCs + staff + kids, court, men, Thái hậu staff, the other player's people, nmReg, dnames) is renamed before it is sent. Host sweeps again at join/rebirth (onState).
- Solo: COOPW off → nothing new runs (nmFrBlob null, S.nmOrd dropped).

## Scan (law 11) — `node dev/test/coop-name-scan.js [--list]` (86 name sites classified REG / BIRTH / SWEEP / KEEP; 0 unclassified)
| path that creates / renames a person while a friend is in the room | before (05e407fe) | after (c2353df6) |
|---|---|---|
| join / rebirth: host places her (onState) | OPEN (no sweep until next load) | COVERED nmFix("join") |
| new life on either seat (draft vs the room) | OPEN | COVERED attach → nmBirth |
| her coop STAFF entry (cung-nữ player) | OPEN (world person) | COVERED guest |
| her own people in the host's list | OPEN (unseen) | COVERED nmFrPeople |
| her person behind the host player | OPEN (no path) | COVERED order nmOrder / nmOrdApply |
| guest's new names avoid every host name | OPEN (personal registry) | COVERED nmReg world key |
| new world person on the host (consort / servant / man / promoted maid / renamed eunuch) | COVERED nmNew REG + sweep | COVERED |
| **open** | **6** | **0** |
Level ≥ 2 rooms (not LIVE default): jcoopthinb checkNames (name + maid on the host) unchanged; level 0 path = attach/nmBirth.

## Tests
| test | result |
|---|---|
| coop-e2e new check "one name list over both seats (world + host's people + guest's people)" every week, both seats | in every run below |
| forced clash `COOP_NC_FORCE=1` (F1 world consort = guest's name + world servant = her maid's → host's world gives way at once; F2 guest's maid / name = host's name → host order → her seat renames; F3 her rebirth draws a world consort's name → renamed at birth) | first batch 10 runs + 8 + 4 + **final 10 on c2353df6 (8 forced): F1 8/8, F2 8/8, F3 8/8; name-list / player-clash checks 0 FAIL in all 10** (both seats) |
| final batch (F1–F5, G1–G5: 4 random, 4 guest cn, 2 both cn) | 9 runs 92/92–94/94; G3 (guest cn, unforced) 2 FAIL = "same Thái hậu picture" (known host-lag lane V3-3, fixed by coop-host-lag; passes in every H run) |
| merged with coop-host-lag (H1–H8, COOP_HL_FORCE in 3) | after fixes H5–H8 **4/4 clean** (106/106, 108/108); found + fixed on the way: the guest's nmRewrite rewrote her copy of an order (S.nmOrd o→n) — now protected |
| bugs found by the runs and fixed | both-cn start split (join sweep renamed a world consort for a short form → nmBirth checks short forms); order rewritten on the guest; marriage-pool churn ("like") |
| coop-home | 51/51 |
| names-oldsave (LIVE 983a9436 → this build, 8 y × 4 lives) | PASS (0 dup, 0 banned, 0 miss, 0 stale) |
| quickcheck (bash dev/tools/quickcheck.sh) | PASS: core gates, time-spill, old save ok, perf new/live render 246/275, tab 534/479, buổi 1623/1373 ms |
| undef-scan / one-core-guard / coop-name-scan | PASS / PASS / 0 open |
| role-parity.test | 1 FAIL `maid:N-ONLY:maid:accuse` — the SAME FAIL on the base names-unique-r2-r1 + main 983a9436 build (05e407fe, without my change); LIVE main passes → from the names-unique merge, not this branch (follow-up for the names lane). Also notes cx2:chest / cx4:rougeSteal now closed (trim open list) |
| solo | unchanged (no co-op → no new code path; quickcheck + old save) |
Laws: 6b (one living person = one full name across both seats; texts follow), 1 (same rule both seats, either player's rebirth), 4/14 (one name core, one registry: the host's), 11 (scan 0 open). No UI change → no shots.

## Follow-ups (not this branch)
1. role-parity `maid:N-ONLY:maid:accuse` on names-unique-r2-r1 + LIVE main (shows on 05e407fe too).
2. coop-e2e "same Thái hậu picture" at start/week 1 (guest cn) = coop-host-lag lane.
3. Without coop-host-lag a host rename of a world person reaches the guest one merged week later (same family); with it, same week.

SẴN SÀNG KIỂM coop-name-clash c2353df6 (review/coop-name-clash).

## REVIEW r1 (BIG, opus) — session_01N1tNP3dftEE3NNrkg7qe5S, depth 3, START_CTX ~4 % — **PASS 44cf5202** (review/coop-name-clash-r1)
PRIORITY #1 CHECK ('name clash coop'): OD 0 | ledger 0 | claims 1 (this item) | main 0 | review/* 1 (review/coop-name-clash; + coop-host-lag-r1 fe7297f6 used for the merged check) | archive 0.
Branch review/coop-name-clash-r1 @ 44cf5202 = c2353df6 + 2 reviewer fixes + merge of newest LIVE origin/main f6866eb8 (contains it).

Code read (jname / jnamefix / jcoopworld delta): host decides, guest reads the same — confirmed. nmPeople marks the coop STAFF entry as the friend; nmFrPeople adds her own people from the room P; nmOrder/nmOrdApply/nmOrdPrune; nmBirth in attach; nmFix("join") in onState; nmReg/nmOrd W_KEYS + HOST_ONLY; nmRewrite never touches nmReg/nmOrd; solo: COOPW off → nmOrd dropped, nmFrBlob null.

Reviewer fixes:
| # | finding | fix | proof |
|---|---|---|---|
| R1 | her coop entry's kids are a COPY (kidsCopy drops dead children) so an order path "kids.i" can point at another child in her real S → host nmOrdPrune dropped the order as "done" before her seat applied it (then re-ordered with a new name each sweep) | 8c59e781 nmOrdPrune keeps an order while ANY of her people still holds the old name (same name fallback nmOrdApply already uses); family scan: only kids are copied with shifted indices (her staff on the entry = [], nmFrPeople uses real paths) | dev/test/coop-name-ordprune.js: before {keptWhilePending:false}, after {keptWhilePending:true, droppedWhenDone:true} |
| R2 | role-parity FAIL maid:N-ONLY:maid:accuse (on names-unique base too, LIVE passes) is NOT a game gap: the player maid holds «Tố cáo <mistress> trước Hoàng hậu» (j42 srvTalk sk:"hh") on both builds (probe). names-unique re-draws the scan's seeded world (mistress Doãn Doanh Nguyệt rk3 vs LIVE Mộ Dung Lăng Vân rk1) and no visited place holds the Hoàng hậu that khắc | 75413e37 dev/tools/role-parity-scan.js asks the Hoàng hậu directly for a player maid (visit person {kind:"srv",sk:"hh",ref}); role-parity-open.json trimmed of 3 closed entries (hh cx2:chest, hh cx4:rougeSteal, maid errand) | role-parity: branch PASS, LIVE 983a9436 PASS (scan fix) — clears Foreman B's LAND HOLD reason for names-unique-r2-r1 |

Tests (reviewer's own runs):
| test | result |
|---|---|
| coop-name-scan | 86 sites, 0 open, 0 unclassified |
| forced clash COOP_NC_FORCE e2e | 17 runs on 8c59e781 + 3 on 44cf5202 = 20 forced runs (iPad host 11, Fold host 9): F1 20/20, F2 20/20, F3 20/20; "one name list over both seats" 0 FAIL in all |
| coop-e2e unforced | 3 runs: 2 × 92/92; 1 × 2 FAIL "week 1 advanced" = host held by the «Tuyển chọn: Môn thi · Đàn» minigame modal (shot 06), test-bot timing, not names. Forced run 8: 2 FAIL "same Thái hậu picture" = known host-lag lane V3-3 (fixed by coop-host-lag) |
| final 44cf5202 | e2e 94/94 ×3 (Fold host ×2, iPad host ×1), quickcheck PASS, role-parity PASS, undef-scan PASS, one-core-guard PASS, coop-name-scan 0 open |
| quickcheck | ×3 PASS (c2353df6 render 251/219; 75413e37 274/254; 44cf5202 233/222 ms, buổi 1150/1039, old save ok) — perf within noise |
| names-oldsave LIVE 983a9436 → branch (8 y × 4 lives) | PASS |
| coop-home | 51/51 |
| merged with review/coop-host-lag-r1 fe7297f6 (conflicts: jkc2 = equal, kept this side's no-extra-draw form; coop-e2e 4 hunks = both sets of checks kept; built files rebuilt) | 3 runs NC force: 102/102, 108/108 (+COOP_HL_FORCE), 102/102 — not pushed (test only) |
Test note: COOP_SWAP=0 still swaps (string "0" is truthy) — use unset for the Fold host.
No UI change → no shots needed (VANPHONG: no new player words; KIT: none).

Minor (not blocking): nmBirth may rename the new player's own drawn name; she sees it first after attach (freshName is drawn after the identity pick), so no shown name changes.

**LAND ORDER:** names-unique-r2-r1 → coop-staff-split-r1 → **coop-name-clash-r1 44cf5202** (contains both + LIVE f6866eb8; landing it lands all three; the role-parity fix 75413e37 is inside) → coop-host-lag-r1 (re-merge: assemble.py list + jkc2 + coop-e2e hunks, as resolved above).

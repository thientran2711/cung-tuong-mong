# names-unique-r2 (GAP OD06) — worker J2, session_01N1tNP3uzAn8LvJLqxfmtDm

PRIORITY #1 CHECK: OD:L1444 (names rule) | main: freshName only avoided living names, banned surnames in pools | review/* names-unique-r1 PASS dcb2ea96 (never landed) | claims: this row only.

Branch review/names-unique-r2 = LIVE 30e8714e + merge of names-unique-r1 + new-pool conversion. SHA bf9f80002 (pushed).
Start context ~10%; finished well under rollover.

## What
- Merged r1 (jname.js pools + nmNew, jnamefix.js registry S.nmReg / old-save migration / month sweep) onto LIVE; 21 source conflicts resolved keeping LIVE behaviour (trait labels, capSweep, ORIGIN_BR, role-parity code untouched).
- Converted every name site added since 16/11: jnpcd (npcFreshName + dead-maid wrapper removed; registry replaces S.dnames use), jmort (replacement officers/maid -> nmNew), j59 (J59 pools -> j59gen(kind)=nmNew), jagmaid (amName registers, maid replacement), jagmin (censor name), jcoopthinb (freeMaid, reg:false for guest), jkc + jkc2 (home road family: father/brother/mother "X thị"/sister/friends/Bắc Địch given names, Xuân Đào clash), jrd_cn, jrd_thd, jmen guards, j22, j55, j8, j10, j42, j2.
- "Phế phi họ Lý" -> "họ Tần" everywhere (as r1; nmFix rewrites old saves); text surnames Lý/Trịnh/Mạc in kit samples and j71/jrd_td replaced.
- Fixes found by tests: nmRewrite now renames keys that carry a name with a suffix (S.npw "Name|maidSell"); nmNew registers "Lão X Tử" with "Tiểu X Tử".
- assemble.py: jname.js after j0.js, jnamefix.js last. coop-e2e: names-equal check on both seats (from r1).

## Scan table (names-audit, 3 lives x 12 y = 36 life-years, all 8 origins rotating)
| | LIVE 30e8714e | r2 bf9f80002 |
|---|---|---|
| people | 1275 | 1572 |
| duplicate full names | 156 (927 people) | 0 |
| given-name clashes among living | 40 | 0 |
| banned VN-style surname/given | 209 | 0 |
| page errors | 0 | 0 |
Literal scan of dev/build/j*.js for banned surnames before a name: none left (only place "Dương Châu" + comments).

## Tests
- names-unique.js 8y x3: failures 0 (after fixes). names-oldsave.js (LIVE old save -> r2, 8y x2): player name kept, 0 dup, 0 banned, 0 registry misses, turn plays; ONE residual: life 1 reports a stale key "S.npw.Thu Thủy|maidSell/eitPil" — likely a given name held by 2 maids (both renamed, text can't tell which is which, so no rewrite). Harmless cooldown key; not verified further.
- quickcheck.sh: PASS (open 1651 ms, old save ok, core gates PASS, perf new/live render 250/276, buổi 1246/1546).
- co-op e2e (dev/test/coop-e2e.js, live Worker, includes the same-names-on-both-seats check): 72/72 passed, no page errors.

## Not done / notes
- No browser shots (no UI change; names only).
- Worker did not touch other lanes' branches.

## REVIEW r1 (opus BIG, session_01N1tNP6fWrZSFyTwWVjxNXT) — branch review/names-unique-r2-r1
PRIORITY #1 CHECK: OD:L1444 (names rule, read verbatim) | main: no name core on LIVE (pools + banned surnames, e.g. LIVE Thái y "Đặng Tử Hiên") | review/* names-unique-r1 (merged here), names-unique-r2 bf9f80002 | claims: this review row only.
START_CTX ~15 %. Base: bf9f80002 + LIVE origin/main 90d57324, dbddaed2, f43efc71 merged (only index.html/sw.js conflicted, rebuilt).

### Residual root cause (S.npw "Thu Thủy|maidSell")
Two causes, both law 6b (a name in any record must name a real person), both fixed in jnamefix.js:
1. Name shared by 2+ people who were ALL renamed (two maids "Thu Thủy"): nmFix rewrote texts only when held===1, so every text/key kept naming nobody. Fix: when no one keeps the old name, its texts + name keys go to the first holder renamed (player family → friend's people → world order).
2. (the case the worker saw) In an old save the new name could be one a person who already LEFT the save had (sold/dead maid, no registry in old saves); her key "NewName|maidSell" existed, so the key move was blocked (`!(k2 in o)`) and the old key stayed. Fix: the first sweep (no S.nmV) seeds S.nmReg from S.dnames + the name part of S.npw keys, so no one is renamed into a gone person's name; a blocked numeric key merges (max cooldown); the registry is never rewritten.
3. Found by the stricter test: nmRewrite protected the renamed person's OWN titled name ("Thị vệ X", "Công chúa X", "Thái y X", "Vương gia X" are in the protect list because they contain X) → every titled text kept the old (often Vietnamese-surname) name. Fix: never protect an entry whose bare name is the old name.
4. Last literal person name: court Nội vụ phủ eunuch "Tiểu Ngân Tử" (j10 S.court.ped) clashed with staff eunuchs at start (5 start-renames in 40 lives) -> nmNew("eun") -> 0.
Also: Phế phi's name (S.lcfPn) was outside nmTaken → freshName could give a consort her given name (npc-death r8 caught it, clash 3/300) → nmTaken holds it (LIVE j59 behaviour). amName (jagmaid) also checks the registry.
Test group fixed: names-oldsave.js no longer skips refs=0 renames (that filter hid cases 1–3) and ignores S.nmReg (holds old names by design); npc-death.js used the removed J59N (crash) → j59gen("f"); tag-rank-scan fixture "Phế phi họ Tần".

### Tests (final build)
| test | result |
|---|---|
| names-oldsave LIVE→r1, 8 y × 8 lives | PASS: 0 dup, 0 banned, 0 registry miss, 0 stale (before fixes: stale texts/keys in 6 of 8 lives) |
| names-unique 10 y × 3 + stress 2000/kind | 0 failures |
| month safety-net sweep, 3 lives × 3 y | 0 runtime renames (every name site goes through nmNew) |
| npc-death.js | 3 FAIL = the same 3 that FAIL on LIVE (Trường Môn stage ×2 flaky, Thái y viện name) — pre-existing, not this branch; J59N crash fixed |
| coop-e2e (live Worker, same-names both seats) | 72/72 ×4, 71/72 ×1, 68/72 ×2. The fails: one seat holds one extra person in a consort's staff list (count 36 vs 37), or one staff name differs at week 1 only (healed by week 2). The SAME extra-staff split shows on LIVE f43efc71's code with the same check (38 vs 37), so it is an old co-op one-world staff-sync gap, not names. → new ticket for the co-op lane (staff list of world consorts not one copy). |
| quickcheck (final 8d71fed7) | PASS: core gates PASS, old save ok, buổi 1176/1340. Two earlier runs FAILed on buổi (3052, 3272 ms): --runs 5 shows LIVE swings the same way (live 3821/3716 ms), a random heavy event; the name core costs ≈10 ms per turn (profiled) |
| literal scan j*.js banned surname + name | 0 (only Dương Châu / Hoàng đế / comments) |
Laws: 4 ONE CORE (one pool jname.js, core gates PASS); 6b fixed for renamed people; 9/10/12 no UI change (names only; no shots needed beyond quickcheck); 14 old pools are aliases only, no second list.

VERDICT: PASS 8d71fed7 (review/names-unique-r2-r1; contains LIVE origin/main f43efc71). Follow-up ticket, NOT blocking: co-op staff lists of world consorts can split between seats (old, shows on LIVE too).

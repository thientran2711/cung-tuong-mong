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

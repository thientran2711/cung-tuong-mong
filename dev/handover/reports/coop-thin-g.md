# coop-thin G — WEEK END + HER PERSONAL MONTH ON THE HOST — STEP 0 (report first, before code)

PRIORITY #1 CHECK ('coop-thin-g|herWeek|gWk|coopGuest|THINMAX 13|colCheck ctx|seatWeek ctx'): OD 1 (17/11 ~01:15Z thin guest, option 2, VERBATIM: "end state is 2 ONLY … each part moved to 2 drops the guest's own computation for good") | ledger 0 | claims CLAIMS:318 (this worker only for G) | main 7bc73251: no part G (jcoopthin A–F4 + E on LIVE) | review/* none for G (base review/coop-thin-f6b-r1 6194dd6a = F5 + hostnull + F6a + F6b) | archive: audit §3 row G, f6.md family 6/12 (colCheck must never run in her context on the host), f2.md:236 (sfx attribution), f2.md:237 / hostnull.md:67 (Tranh ghế L6 = L7).

Worker session_01N1tNP4tAZPWV3hUSqy8aiQ (opus), depth 8 (limit 8), coordinator Foreman B ROOT-7 session_01N1tNP3bh5eNWUZw2nJQW4G.
START_CTX ≈ 4 % of 1M (used_tokens reads 0; estimate) → rollover at ≈ 29 %, ceiling 60 %.
Branch review/coop-thin-g STACKED on origin/review/coop-thin-f6b-r1 6194dd6a. Worktree /home/user/wt/ctg (sparse). Local Worker (THINMAX 13): `cd coop/worker && npx wrangler dev --port 8787 --ip 127.0.0.1`.

## 0a. Every week-end / month step that runs PER SEAT today (level 12, base 6194dd6a)
| # | step | file:line | where her copy runs today | G (level 13) |
|---|---|---|---|---|
| 1 | night go → each seat runs `nextBuoi` under CW.allowN → `endTurn` | jcoopworld.js:654-658 nCheck; :803 nextBuoi wrapper | her PHONE (local nextBuoi → endTurn on her local S) | host runs HER endTurn in withSeat("b") on her store (TH.seatOf b), from the top of the event loop, BEFORE his own (same pre-week world her phone saw); her phone runs nothing at go |
| 2 | endTurn body: resolveTonight, Sủng −1, Sức regain, rivalsTurn, monthTick (tuan 2), makeDil, rollWx, placeWhere, flip, newLots, deal | j3.js:95-108 | her phone; world writes dropped by the part C lens; world loops muted by worldOn()=false (jcoopone MUTE / ONLY_ME / PERSON, inline worldOn j3/j8/j13) | same code in her context with `worldOn()` false (CW.gWk: the guest-side guards run exactly as on her phone) and every world write put back after (part E's wSnap / wRestore) |
| 3 | monthTick (her stipend monthPay, pray/fert/confined…, maidMonth, pregMonth, itemMonth, anMonth, restock (shop), oanMonth, assignHouses, illMonth, coldMonth, servRanks, servMonth, facMonth, Đức→Thanh danh, kidsMonth, rivalsMonth, storyMonth, heirMonth, …) | j3.js:110-… | her phone | host, in her context (row 2) |
| 4 | 46 endTurn wrappers (jcoopone guard table, jcol colCheck, jpromo, jreign, jseat, jstaff, jsteal, jmort, jpetlife, jvisit, jdh/jdh2 npcOK, …) | j*.js (scan: `grep -l "endTurn=function"`) | her phone; ~22 of them test `COOPW.seat!=="a"` directly (list §0d) | the seat tests read ONE helper `coopGuest()` = guest seat OR her week end on the host (CW.gWk) → same branch as on her phone |
| 5 | jcoopworld endTurn wrapper: CW.pend = true, lockNext, render; CW.news | jcoopworld.js:799-801 | her phone (then tryEnd → sendEnd) | in her context: the host's CW.pend / news / inTurn are kept (her week end never marks the HOST's week as ended) |
| 6 | sendEnd: toCanon + guestNet → `{t:"end",week,state:C}` | jcoopworld.js:241 | her phone sends her C (P.b = her phone's person) | guest never sends `end`; host's toCanon writes P.b = her store (+ his acts on her stand-in as DELTAS, the rule merge3 applied) |
| 7 | Worker: `end` → sub-<seat>; tick when both ended → merge3(base, sub-a, sub-b) | coop/worker/src/index.js:261-268, :346-353; merge.js | server | level ≥ 13: the host's `end` ticks alone, F = the host's C (no merge3, no sub-b); a guest `end` is refused (error "thinend", ignored by the client) |
| 8 | week: fromCanon rebuild on each seat; drop of the host's store of her (rebuilt from C.P.b) | jcoopworld.js:580 onWeek; jcoopthinb.js:135 drop | both | guest: fromCanon(C) = apply the host's snapshot (display); host: same (her store rebuilt from his own serialization = no change) |
| 9 | reign ending (G5): empWeek → emperorDies (her heir → Thái hậu / tuẫn táng) on BOTH seats | jcoopworld.js:785-795 | her phone, from the merged week | host runs hers in her context in onWeek BEFORE his own (the world's S.emp still the old Emperor), result written to her store + CW.base.P.b + patch |
| 10 | seat caps after the merge (G20): seatWeek on the guest | jcoopworld.js:752 | her phone | host, in her context, after his own endTurn (his new rank is real, her stand-in sees it): promoFullSeat card = part-D card |
| 11 | Tuần mới news card (CW.mine = her stats after her endTurn) | jcoopworld.js:565 newsHTML | her phone | her store keeps S.gMine (her stats right after her week end); her phone's card reads it |
| 12 | her death in the week end (die → over: lifeSave / record on the DEVICE, over card, CW.dying) | j3.js:145, j32.js:32, jcoopworld.js:815 | her phone | in her context: S.dead + S.coopOver = [h,t,fate,alive] only; her phone runs the real over() from the week (the existing path for a death caused on the other seat: onWeek → die) |
| 13 | colCheck (Sưu tầm): endTurn + render wrapper, DEVICE ledger "cung-colms" | jcol.js:23, :36-37 | her phone | never in her context on the host (would write the HOST's device ledger, f6.md); her phone's render-time colCheck keeps doing it on her device |
| 14 | other DEVICE ledgers reachable from her week end (record "cung-kiep", ctm-arcs, ctm-e68h, ctm-rare97, succBook, ctm-ge, cung-luanhoi, NL_KEY …) | j3:144, j67:41, j68:12/14, j97:281, j99succ:178, jge:61/142/158, jkiep, j52 | her phone (her device) | in her week-end context every store.set / localStorage write is kept OFF the host's device (logged TH.G.dev); FOR H: replay them on her phone (list of keys seen in the 12-month run in Done) |
| 15 | seat copies `seat` / `seatd` (her week for a rejoin) + local snap ctm-coop-wk | jcoopworld.js:845-882; index.js:190-212 | her phone → server seat-b | guest: off at level 13 (her week lives on the host); host's own copy unchanged (H) |
| 16 | syncRoom re-end / CW.restore of her week | jcoopworld.js:619-624, :885+ | her phone | guest: no re-end, no restore of her own week at level 13 (the host's snapshot is the truth) |

## 0b. Where her copy lives
- Level ≤ 12: during the week her person is the HOST's store (TH.seatOf("b"): her acts F1–F6, her buổi E, her cards D) + her phone's local copy (patched by the host, her tối `erd` diff sends her phone's own changes back). At the week end her PHONE's copy runs the week (row 1) and goes to the server; the host's store is dropped at `week` and rebuilt from the merged C.P.b.
- Level 13: the host's store is the ONE copy for the whole week, week end included; her phone only shows it (patches during the week, the host's C at `week`).

## 0c. Old-room upgrade path (C.thin < 13 save → 13)
The room level is negotiated per connection (min(want, cap a, cap b), Worker thinIn). A room saved at ≤ 12 holds C.P.b = the last MERGED week. At level 13 the host's store is built from exactly that P.b the first time it is used (TH.seatOf, unchanged code): "the host takes P_b from the last merged C once"; from then on the host writes P.b. Nothing in C changes shape, so every item / kid / servant in P.b stays (law 6c). Test: §Tests 'old room upgrade' (a level-12 week with her items, then the room reopened at 13: P.b before == host store after, item ids equal).

## 0d. Seat-guard family (rows 4, LUẬT SỬA CẢ NHÓM) — scan `grep -n "COOPW.seat\|C.seat\|CW.seat" non-co-op j*.js`
22 world/guest guards read the seat directly: j10:37/57, j39:52, jagent:27, jdemo:13, jdh:48, jdh2:36, jemoact:88, jfigx:40/49, jil:30, jkh:40, jlux:140, jmline:20, jmort:35, jnpcd:77, jnroad:15, jpet:128, jpetlife:38, jpq:35, jpromo:108, jreign:30, jseat:20, jsmg:99 (via worldOn), jstaff:20, jsteal:35, jvisit:18, jweather:40. Not guards (kept): jmem:247 (id tag), jil:62 (already ctx), jil:213 / jsmg:127 (message sender), jcloud / jmcal (room bookkeeping). All guards → `coopGuest()` (one helper, jcoopworld), so her week end on the host takes the same branch her phone took.

## 0e. Measured host week end today (level 12, host Fold 686x880, CPU ×4, local Worker, probe dev/test/coop-thin-g-perf.js, median of 7)
| run | own endTurn (with render) | without render |
|---|---|---|
| plain week (tuan 0) | 2979 ms | 2275 ms |
| month week (tuan 2 → monthTick) | 1282 ms | 527 ms |
(First run in a fresh room carries one-off warm-up; re-measured with G built, same probe, both persons.) Perf gate: her week end in context b ≤ +40 % of his own.

## Next (building)
CAP 12 → 13, Worker THINMAX 13, everything behind TH.on(13) (`gW()`); levels 0–12 + solo unchanged except the seat-guard helper (same value outside her week end). New module dev/build/jcoopthing.js (after jcoopthinf6b). Then the leftovers: sfx / attribution of her week-end effects (TH.tapRun → her phone), Tranh ghế rounds in her context (j34 contestWeek), colCheck (row 13).

PASS 12f52db7fe1c8341b947441a4cde7807bea7d165

# review/schedules3-r5 — independent review of review/schedules3-r4 @ f388b4de (D29, Foreman C)
Reviewer branch **review/schedules3-r5 @ 12f52db7** = origin/main 50299942 + merge of f388b4de (51f9364b) + merge of origin/main fb367740
(main moved during the review). Its ancestor is the current origin/main fb367740 (checked after the last fetch), so the coordinator can
fast-forward. Conflicts: assemble.py only (main's list incl. new `jtitle.js`; put back `jk95` after `jk2b` and `j95, j95b, j95c, jqsave`
just before `jkpc`); index.html / sw.js are generated: taken from main and rebuilt with dev/site/build_site.sh after each merge.
Main's 66 new commits (2232ea32 → fb367740) add no PEND cards, no `people.push`, no `S.where` / `whereOf` / `countAt` / `placeWhere`
reader (grep of the added lines): nothing new for the ledger. No reviewer code fix was needed.

## r3 FAIL items: really fixed, whole family?
| r3 item | r4 fix (read in the diff) | verdict |
|---|---|---|
| 1 jroute NPC acts bypass gate + record | `rtCaughtBy`: blackmail now `(greedy‖roll) && motiveOK(v,S,"uyhiep")`, report `motiveOK(v,S,"tocao")`, both logged with `j95actLog` (`rtGate`); monthly re-demand re-gated (motive gone → she stops and `T.bm` cleared); `rtBm` (hostile uyhiep, nr) and `rtNpcEsc` (witness role + `j95bPut` record line) declared in P95B. Same module family: frame-her-child (`accuse`) and NPC foe oiling the bowl (`frame`, `rtGateT`) gated too. `uyhiep`, `tocao`, `accuse`, `frame`, `spy`, `provoke` are all in H95 (hostile set). | fixed at the source; sens audit saw `uyhiep` 1 and `accuse` 1 gated with 0 (d)/(g) faults |
| 2 jroute witnesses outside the record | `rtWit`, `rtNpcMeet` use `whereOf` (j95 overrides it to read `S.roster.P[...][j95kh()]`, i.e. the record at this khắc; falls back to S.where only when the record is off, e.g. co-op); `rtSeen` fallback pool (any consort with mat≥2 anywhere) removed: nobody there → footsteps line. Family: jmen `menEyes`, `menNpcSee`, the seen-with-a-man loop, jgift walk witnesses also moved to `whereOf`. Remaining `S.where` readers in old modules are map/count/placement code already wrapped by j95 (countAt, placeWhere, npcEncounters) and PASSed on schedules2. | fixed |
| 3 LUẬT SỬA CẢ NHÓM scan | `dev/test/pend_consort_scan.py` (re-run by me): 47 cards read consorts, 28 declared; every card new since schedules2 with a consort id in params is declared or her own pick (rtBm, rtNpcEsc, rtNgNpc, sgpick, cmBrawl, cmScorn); `cmSecFor` spy needs a consort passing `motiveOK(...,"spy")`. The script's other MISSING rows are old schedules2 cards or indirect bodies without a consort param; the live audit (g) covers them (0 below). | done, table in the r4 report checked |
| 4 full re-run | below | done |

## Tests (my runs)
| test | build | result |
|---|---|---|
| roster_audit **sens 18** (CAP 3300) | 51f9364b | **17 018 checks, all (a)–(r) 0**, page err 0, J95/J95B errors 0; gate 395 (uyhiep 1, accuse 1, frame 74, spy 14, provoke 42…) / pass 3 213; knownTgkElder 13 936 (main bug, known) |
| roster_audit **rand 18 shard 4** (CAP 3300, timeout 7000) | 51f9364b | time cap, 10 lives, **39 947 checks, all (a)–(r) 0**, page err 0; gate 1 294 / pass 10 357 |
| roster_audit sens 4 shard 3 (CAP 900) | 12f52db7 (after main fb367740) | 4 676 checks, all 0, page err 0 |
| stage-counts.js | 51f9364b ×2, 12f52db7 ×1 | thd 147/147/152, cnv 67/65/68 walks, **0 mismatches**, 0 errors |
| roster_dom 20 moments | 51f9364b: 755x1000@2, 1180x820@2, maid road (ORIGIN=cnv) 755x1000; 12f52db7: 755x1000@2 | **0 bad**, 0 page errors each |
| roster_oldsave (save made on main 50299942 without j95 → this build) | 51f9364b | loads at 755x1000 + 1180x820, record built on load, 48 checks each, 0 bad, 0 errors |
| coop-e2e (live Worker) | 51f9364b ×2 | 57/59 and 56/59: "A frozen when B left" + "A cannot advance while frozen" (+ once a CDN CORS console line). **Same two fail on plain main 50299942 (57/59)** → live Worker presence / proxy keeps the closed socket open, not this branch (j95 is off while `COOPW.on`). Coordinator: worth a note to whoever owns co-op presence. |
| 6 viewports, built site in host mode (lib/device.js openHost): fold 755x1000, foldLand 1000x755, ipadAir 1180x820, ipadPro 1366x1024, iphone14Land 844x390, iphone14 390x844 | 51f9364b and 12f52db7 | no horizontal overflow, 0 page errors at all 6; 390x844 = rotate prompt "Xoay ngang điện thoại để chơi" |
Screenshots looked at: all 6 sizes (Ngự hoa viên, side column, card list readable, no cut text) and a direct 1180x820 stage after the
reconcile: S.visit = record (4 consorts + men; map count 6 = stage 6), drawn as one figure + "+5" (one grey KIT §59 placeholder while the
picture loads — main's behaviour, not this branch).

## Other checks
- **ONE CORE (OD:L1267)**: r4 adds no player-visible number; the gates use the shared `motiveOK` (j95) and existing BAL-driven rolls.
- **Kit**: r4 adds no style / class / frame (grep of the added lines in dev/build: 0 new markup; the hits are old schedules2 code using kitRows/kitChip). KIT REQUEST K14 still pending at the kit keeper; nothing private drawn.
- **VANPHONG**: new player-visible lines "<name> thấy ngươi với <man>. Nàng không nói gì, nhưng đã ghi nhớ.", "<name> thôi đòi bạc của ngươi.", record reason "lén chuẩn bị trốn khỏi cung (kế đã lập từ trước)": cổ trang, no %, no "có thể"/"Chắc chắn".
- Not reviewed (per brief): review/people-ledger (stage 2).

## Non-blocking notes (unchanged from r3/r4)
- `rtNgNpcAuto` takes the first Hiểm foe only; if that one fails the gate nobody else is tried (fewer frames, never an ungated one). Fine.
- Known gaps listed by the worker: one-khắc "cnv thiếu m4" at maid→consort promotion, one-buổi child at her palace (dtq) — neither showed in my runs.
- Main's j77 option text "Chắc chắn · tốn …" (VANPHONG forbids "Chắc chắn") — main bug, not this branch; for the coordinator's list.

## Handover
Reviewer done; no successor needed. Worktrees /home/user/wt/sch5, sch5main, sch5docs and /home/user/wt/sch5out removed after push.

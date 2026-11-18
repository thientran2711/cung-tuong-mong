# review coop-thin-a r1 — PASS b95a56e3c (Worker deploy: SAFE, may deploy; rollback plan §5)

Reviewer session_01UV1SzgchwneMvxW4bNtCDm (opus, BIG co-op), coordinator MAIN s28. START_CTX ≈ 4 % (1M window).
Branch reviewed: review/coop-thin-a @ 89a9dc78 (base f5220eaa). Trial merge onto main 7abaf07ac → **review/coop-thin-a-r1 @ b95a56e3c**
(ancestor = current origin/main 7abaf07ac, fast-forwardable). Conflicts: generated files only (index.html, sw.js, assets.json) → rebuilt.
Main moved since base by coop-main-faults (jcoopone runAct own-act guard), kit-size-10, j61/j95 — no overlap with part A code.

## Verdict per check
| # | Check | Result |
|---|---|---|
| 1 | No player-visible change with the flag off (solo untouched) | PASS. quickcheck PASS ×4 (old save ok, core gates, time-spill). Solo buổi: direct A/B on the same box, trial merge WITH vs WITHOUT jcoopthin: buổi 867/866 ms, render 246/283, tab 318/350 → no cost. vs live main the medians wobble 841–961 / 766–866 (single runs 540–970 ms, ±20 % noise): 961/830, 847/833, 841/766, 893/841. Code path in solo: two pass-through wrappers on render/showModal/save + fromCanon counter. |
| 2 | Room level + capability: on only when BOTH seats have it; old rooms keep working | PASS. Worker: level = min(want, cap a, cap b), 0 while a seat is silent or builds differ; old clients never send `thin` (live Worker ignores unknown t; room reply `caps` only read for "seatd"). coop-e2e LIVE 60/60 + swapped 60/60 (old save, solo, rebirth, leave/return). Note N1 below (stale cap). |
| 3 | withSeat registry complete? | **Defect found and fixed here.** 4 of the 23 names the report/contract say are registered (NOLUCK jdh, FORCE jdh2, inFlip + stoleFrom jflip) live inside IIFEs: `TH.reg` caught the ReferenceError and dropped them silently. The contract's self-registration pattern (`if(window.COOPW&&COOPW.thin)COOPW.thin.reg(...)` from a module's own file) could never run either: every module loads BEFORE jcoopthin. Fix (r1): queue `window.THIN_REG` (modules push [name,get,set] right after the declaration; jcoopthin drains it, later pushes register at once), `TH.REGBAD` lists any failure, coop-thin-a.js checks REGBAD empty + the 4 names. Full scan of what is still unregistered: §3 (by owning part). By design A registers only what A touches; each part registers what its code reaches — now written into contract C3 with the list. |
| 4 | Room RNG deterministic per room | PASS. sfc32 seeded room code + week + stream; same draws both seats (test), different room / week / stream → different draws (node check: X8E9 w3 life .77344…, AB12 w3 life .06291…, X8E9 w4 .06906…, night .54949…). Not wired to rules (correct for A). |
| 5 | Worker snap/delta/do with versions (local wrangler only, NOT deployed) | PASS. npm test ALL OK (merge, vault, seat, stale, thin). wrangler dev local: coop-thin-a level 1 24/24 + swapped 24/24 (snap → guest, delta, gap → snapreq → full, intent probe in her context, host intact). Deploy verdict §5. |
| 6 | Tripwire + 4-week baseline reproducible, categorised per part | PASS after r1 additions. Reproduced on LIVE Worker, 4 runs: changing writes 26 673 / 23 545 / 25 255 / 28 570 (worker: 22 377 / 20 897) — same order, random bot. Was NOT categorised per part (only by root + innermost function). r1: each write gets its owning part from the OUTERMOST engine entry on the stack (B life, C world, D dialogs, E buổi/night, F1–F5, G week end, C/H sync, ? unassigned) + a STATE meter without private `__` keys: jwdinv `wdOf` sets `p.__wdmig=1` and deletes it in its finally (re-entry guard) = ~50 % of all counts, not a guest computation. |
| 7 | A→B/D contract clear enough to build from the repo alone | PASS after r1 edits to coop-thin-a.md C3 (canon overwrite in place): THIN_REG pattern, the unregistered-state list per part, and three rules that were missing: call-scoped flags (enter withSeat only from the top of the event loop; G beside endTurn, not inside), timers/promises scheduled inside fn run later against the HOST's S, UI side effects other than render/showModal/save (toasts, sounds, stat floaters, overlays, DOM, localStorage) are not stopped yet — B adds them to the no-op list in jcoopthin. |

## Tests on b95a56e3c (final)
- quickcheck PASS (median of 5 and 7; numbers above). Worker `npm test` exit 0.
- coop-e2e vs LIVE Worker: **60/60**; COOP_SWAP=1 (iPad hosts, Fold joins): **60/60**.
- coop-thin-a.js flag off, LIVE Worker: **19/19**, swapped **19/19** (incl. new check: registry, no silent failure).
- coop-thin-a.js level 1, local wrangler dev with part A Worker: **24/24**, swapped **24/24**.
- coop-bot TRIP=1 4 weeks ×2 on the final meter (live Worker): 0 divergence, 0 page errors.
  | run | changing writes | STATE (no `__` keys) | B | C | C/H | D | E | F1 | F2 | G | ? |
  |---|---|---|---|---|---|---|---|---|---|---|---|
  | 3 | 25 255 | **8 065** | 37 | 410 | 1 045 | 1 254 | 1 929 | 2 321 | 421 | 12 | 636 |
  | 4 | 28 570 | **11 450** | 39 | 454 | 1 201 | 2 024 | 2 167 | 4 361 | 187 | 10 | 1 007 |
  Report from now: "STATE ≈ 10 k (median of 2), raw ≈ 21–29 k". Biggest real writer: `log`/`logChoice` S.logs (her own log, under F1/D/E).
  coop-bot exits 1 on "friend-position mismatch" (1–2 per run, "B sees A at r5, A is at r901" after A's rebirth / early buổi):
  **pre-existing** — same on main 7abaf07ac with the same bot (run 2: 1 mismatch); not caused by A. Owner of the fix: part E/H (positions) — not patched (OD 17/11 02:05Z).
- Shots: none needed (no UI change); bot/e2e shots kept in scratch outside git and deleted.

## §3 Per-player module state the registry does not hold yet (acorn scan of all.js: module-level variables written inside functions)
Owning part registers via THIN_REG (or proves per-phone UI) before running that code in withSeat:
- **B** (start / nlRun): `J95B.bind/ev/notes/next` (j95b start wrapper CLEARS them → would wipe the host's), `SP13.L/held` + `SP13.reset` (jspread rumours),
  `KMS/KMSNAP` (jkc kcSnapReset sets KMS=S → host misses one rank/cold-palace overlay), jtut start wrapper `T.fresh/PICK/NEWLIFE` (host-phone tutorial: must not fire in context b), `K61NEW` (transient).
- **D** (cards): `J78.cur/ctx`, `IEV.cur/hold`, `RCP.ctx`, `KIP_GO/KIP_GIVE`.
- **E** (buổi + night): jflip `life/cur/KEEP`, jnight `cur/busy/asked/again`, jne `N/HELD/PREV`, `J95C.later`, `btrPrev/btrEl/btrEnd`, `advLock`.
- **F**: call-scoped `ACTK ECON_AT RUMT nrTalk` jmem `SUP/CAUGHT/CTX` `PID_AVOID __restAct __cardSuc`; mini-game / UI-ish `TOIL.st SG KG82 PETC mgStop/mgDone`.
- Per phone, never register: tab, relSel, GIFT_TAB, KINV_SUB, jcoop* socket/timer state, picture/DOM/fetch caches (KIT_*, FIG*, KPOR*, TOIL_*C), seenIds.

## §5 Worker deploy verdict: SAFE to deploy (main does it, not the reviewer)
- The LIVE Worker (deployment 01:31Z, version f7d52a7d) is byte-for-byte main's `coop/worker/src/index.js` (wrangler --dry-run bundle of origin/main
  vs the live script content via the Cloudflare API: identical but one blank line). So deploying review/coop-thin-a-r1 adds ONLY the "thin guest, part A" block
  (+91 bundle lines; dry-run 43.46 KiB / gzip 11.87 KiB). No new DO class, no migration; new storage keys only `hsnap:*` and meta fields tcap/thin/hv/dn,
  written only after a NEW client says `thin`; level stays 0 unless the host sets the dev flag → production rooms see no change except the room reply's
  `caps:["seatd","thin"], thin:0` (clients read caps only for "seatd").
- Rollback: `npx wrangler rollback f7d52a7d-a2d5-4a4a-95a2-84499cc53b3b` (Workers versions; or redeploy main's index.js from 7abaf07ac). Safe because old code
  ignores the extra meta fields and the `hsnap` keys (dead data; a later part may delete them). Deploy order: Worker first, then the client (old Worker ignores `thin`
  anyway, so order is not critical; coop-e2e 60/60 was run with the NEW client against the OLD live Worker).
- Notes (non-blocking, for H): N1 `m.tcap[seat]` is not cleared when a seat reconnects on an OLD build (it never says `thin`) → the level can stay > 0 with an
  old-build guest; harmless now (host also needs !CW.hold; level 0 in production) — H should key tcap by socket or send the build id in the join URL.
  N2 every delta re-reads and re-writes the whole stored snapshot (up to 6 M chars) in DO storage; at level ≥ 1 with deltas every ~1.2 s this is heavy —
  E/F/H should keep the snapshot in memory and coalesce writes. N3 a stale `hsnap` from an earlier session is sent to the guest when the level turns on,
  then replaced by the host's fresh snap a moment later (benign).

## Reviewer changes on review/coop-thin-a-r1 (small, test/registry only)
- e2e586a62: THIN_REG queue + TH.REGBAD (jcoopthin), NOLUCK/FORCE/inFlip/stoleFrom pushed from jdh/jdh2/jflip; coop-thin-a.js registry check;
  tripwire part attribution + coop-bot "TRIPWIRE by part".
- b95a56e3c: tripwire STATE meter (without private `__` keys).
- Docs (handover branch): coop-thin-a.md contract C3 rewritten in place (canon overwrite) with the items in check 7.

## Rollover
Not needed (context well under START_CTX + 25 %).

# review coop-thin-c r1 — PASS review/coop-thin-c-r1 eb3675a6 (READY FF; reviewer #2)

PRIORITY #1 CHECK ('coop-thin-c|jcoopthinc|thinW|world read-only'): OD 1 | ledger 0 | claims 8 | main 0 | review/* 2 (review/coop-thin-c 475beba7, this review/coop-thin-c-r1) — plus brief hits OD L1487/L1489/L1493/L1494, OD:L1063.

Reviewer session_01N1tNP4NkEVbfkftEhoSW5h (fresh opus), coordinator Foreman B s6 session_01N1tNP6aS1jVsCvD9kpxdH1. START_CTX ≈ 3 % (used_tokens reads 0; estimate); ends ≈ 25 % (no rollover).
Per Foreman B s6 (worker #2 rolled over, no successor): this review also OWNS THE MERGE (handover #2 → #3 steps 1–4).

**Verdict branch review/coop-thin-c-r1 @ f65b5b6c (pushed)** = 475beba7 + merge origin/main 086f1d60 (49db1ded) + reviewer fix 1 (e1cb9bee) + reviewer fix 2 (db032884) + merge origin/main 579e8976 (d3730f16: coop-thin-b-r3 is now LIVE on main, so this is the landing sha) + merge origin/main 60b0e3bf (db6fd5fd) + reviewer fixes 3+4 (f65b5b6c). origin/main is an ancestor (fast-forward possible).
Merges: only generated files (index.html / sw.js / assets.json, taken from main + site rebuilt) and assemble.py (kept the jcoopthinc line) conflicted. In the 2nd merge git auto-kept the branch's old j2/jbal/jcoopthinb lines (BAL.eff.j2.start) over the lander's ONE key BAL.allyRel — reverted to main's three files (C does not touch them); one-core-guard PASS. Diff vs main is now C only: assemble.py, jcoop.js (rxWrap), jcoopask.js, jcoopthin.js, jcoopthinc.js, jcoopworld.js (+ tests).

## Reviewer fixes (both in jcoopthinc.js, small, proven before/after)
| # | Fault (item 2 "nothing of hers dropped": tried to break it) | Fix | Proof |
|---|---|---|---|
| F1 | A pack of her NPC ops the Worker could not hand to the host (`nohost`: his socket closed between her act and the send; `nothin`) was LOST: only `bado` was listened to; part B retries nohost, C did not. Her act's NPC effect silently gone, her own cost kept. | pending packs kept by intent id (PD); on `nohost` / `nothin` the pack goes back in the queue, in order, and is sent again when the room is on; sends also wait while `COOP.frozen` (host away). A pack is cleared when the host's answer (view dr) or `bado` comes. | new check C10 (simulated nohost on her phone): before **FAIL** host 92 → 92, resend 0; after **PASS** 88 → 91 (applied once), resend 1; green in every later run (L3 / swap / L4). |
| F2 | The host's 3-way merge (m3) took HER WHOLE ARRAY for arrays without an id: an NPC's `kids` came back whole from her op, undoing what the host changed meanwhile (a child's death / ageing in his step). Found from the L4 kframe failure (2/2 runs). | members keyed by `name` when they have no id/sid/ci (a child's name is unique in the world, j1 mkKid); lists without any key (memories: a capped ring) still travel whole. (A positional merge was tried first and dropped: it garbled the `mem.me` ring — 6 C2 FAILs per run, seen and reverted.) | unit on the real m3: b=[{A alive}] h=[{A dead, kid p22}] a=[{A alive, kk x38}] → before `[{A alive, kk x38}]` (death undone), after `[{A dead, kid p22, kk x38}]`; full C2 green after. |
Tests changed: coop-thin-c.js C10 (F1), its own `key` = jcoopthinc key, `TRACE=1` (`TRACE_N`) per-field trace, vp staging used a status that does not exist ('vuot' → 'over'; the act text printed "undefined"), and a child's lazy face identity (j73 `kid`) / per-phone k61 handle (`kk`) are not counted as the act's effect (see note N2). New probe dev/test/coop-thin-c-perf.js.

## Verdict per check
| # | Check | Result |
|---|---|---|
| 1 | One switch thinW / stateOn / oldRan; old guards 0 runs in a C room; level 0/1/2 = old behaviour | PASS. Code read: `stateOn(n) = worldOn() \|\| thinW()` — below level 3 thinW is false, so every guarded path runs exactly as before (only a counter is added); the C hooks (rxWrap, CW.cW, lensR/lensW, wrapF frames, runAct/pickTarget wrappers) all test `lOn()/gOn()/on()` (level ≥ 3) first. C8 oldRun {} / {} both seats in every C run; coop-e2e (level 0) 63/63 + swap 63/63, coop-p2, coop-b1, thin-a L0/L1 green. |
| 2 | DOMAX: ops = only what changed, packed / split, nothing of hers dropped | PASS after F1 + F2. prune / split / pack read; C9 bado 0 / unsplittable 0 in every run (55–64 packs, largest NPC field 2 943 chars, 1.cz). Two drops found and fixed (F1 transport, F2 merge). Left (note N1): a socket that LOOKS open but is dead (phone asleep) still loses an intent without any error — transport level, all intent kinds (B, C, D), needs ack + resend + dedupe on the host. |
| 3 | Every ACT kind scripted; rerun; 5 kinds traced by hand both seats | PASS. Final sha: L3 17/17 (C2 47/47), swap 17/17 (48–49/49), L4 17/17 (47–49/49). Hand trace (TRACE=1, L3 swap = guest Fold, and L4): **musk** suc 80→55, preg 3→0, hidden, ro{1:16}, emo/bel/blamed → host the same, "by":"me" stored as 902; **takeaway** child out of the NPC's kids, her rel −30 / oan +25 stay HER rows (host's own rel 6 untouched, ro[902]=25 in the world), emo/mem in the world; **gift** NPC inv gets the item from:"me" → 902 on the host, her rel +5 (host's row −5 untouched); **pushp** rel/oan hers, emo/emoH/bel/cz/mem in the world, plus a `w` op on emp (the Empress's anger at her) = her act's world effect; **trinhhh** ev 4→2 hers (host 0), cz shared; **kframe / kpoison / pond** at L4: evm.me → 902, cz / mem shared. Every field lands once and comes back to her phone. |
| 4 | Tripwire W / R / Rarr | PASS: 0 in every run (lens catches 16–20 k / run). |
| 5 | "Who rolls" guards kept; world windows end() on her household = part E | PASS. Scan: worldOn / npcOK count per file (j3 j8 j13 j42 jgift jagent jdemo jdh jdh2 jemoact jil jkh jlux jmline jnroad jpet jpromo jreign jseat jstaff jsteal jweather jmort jpetlife jvisit) = main's in every file; jcoopone.js unchanged. world-events-2: `S.wwin` is a W key (jworld pushes it into W_KEYS at load, before jcoopthinc installs the lens → it gets the accessor); `S.wwMe` / `wwSeen` / `wwEnd` are her person (written as before); the guest's worldTick does nothing (host() false), so the windows' end() runs on the host only and does not reach her household — exactly part E's scope line; C does not break or change it. |
| 6 | Perf of the lens Proxy on the guest Fold | PASS. coop-thin-c-perf (guest Fold 755x1000@2, swap, median of 15): render 30.1 ms with lens vs 42.9 ms at level 2 (noise level, not slower); a full read of every NPC field 0.70 vs 0.10 ms; ser() 4.7 vs 1.3 ms; NPC turn on the guest 0.7 ms (NPCs do not act there). quickcheck perf below. |
| 7a | coop-p2 "B1 guest: an NPC bribe reaches her as the j42 card" | Not reproduced: coop-p2 45/45 on the merged sha (B1 12/12 incl. that check). It was the B/D test on an older main; nothing in C runs at level 0. |
| 7b | coop-b1 laydo / takeaway family | C adds nothing: coop-b1 is a level-0 room (C code does not run). Runs: branch 25/41 then 43/43; main 086f1d60 27/41 (same laydo family). main now has coop-b1-regress (landed); on the final sha: 43/43 (db32 era sha d3730f16). |
| 8 | G4 coop-one-world seeds 1–10, this sha vs main (S.wwin) | S.wwin: no failure on either side. Merged branch (before the 2nd main merge): seeds 1–10 PASS except seed 9 once (`R.evm` 1 path in the guest's sent week = the old level-0 safety net); seed 9 re-run 13× → 2 fails / 30 runs total; main 086f1d60 seeds 1–10 PASS, seed 9 0/16. Level 0 runs none of C (thinW false), so this is not C; it points at a rare, timing-dependent R.evm path in the old guestNet. Final sha: seeds 1–10 PASS on d3730f16. |

## Tests on the final sha f65b5b6c (pushed) (LIVE Worker ctm-coop.victoria-tntt.workers.dev)
| test (f65b5b6c unless noted) | result |
|---|---|
| coop-thin-c L3 / L3 swap / L4 (TRIP=1) | 17/17 / 17/17 / 17/17 (C2 all, C7 0, C8 {}/{}, C9 0/0, C10 resend 1) |
| coop-e2e | 63/63 |
| coop-thin-d-probe L4 | 33/34 — P1 'ev: the proof is on her phone mid-week' FAIL once (was 34/34 on d3730f16 and db0328 era) → rerun needed |
| coop-thin-a L0, quickcheck | running when #1 rolled over (/home/user/wt/rvc-out4/fin.txt) |
| on d3730f16 (main 579e8976 merge): e2e swap 63/63, p2 45/45, b1 43/43, thin-b L4 136/136, thin-a L0/L1 19/19 / 24/24, b-r1 39/39, b-r3 25/25, guest-maid 37/37, d-probe L4 34/34, one-world seeds 1–10 PASS, one-core-guard PASS | |
| coop-thin-d L3/L4: 4 kit sameDom FAILs (data-kfsp) — SAME on main 60b0e3bf (L2 48/52): main's kit-fx-register, not C | |
| infra noise seen: CDN image CORS console errors (e2e/gm 'no page errors'), Worker 502 on a WebSocket once | |

## Open items (not blocking, for Foreman B)
- **O1 (watch, week end):** C4 "week merged once" stuck in 3 of 9 full L3/swap runs on reviewer builds (first two on the dropped positional-merge build; 1 of 6 on the final m3), 0 of 8 on the merge-only build (A/B side by side, same load). Same picture each time: the guest pressed end (pend), never sent it (`sent:-1`, her `end` never reached COOP.send), new-week cards in Q (Điềm báo, Hội phối đồ: báo đề, Lời cảnh báo) with the modal HIDDEN → tryEnd waits for Q empty forever. Lead: in a C room her date keys (tuan / turn) are lens, so her endTurn's date change is dropped and jworld's endTurn hook (`if(now()!==t0){worldTick(); if(Q.length&&modal.hidden)showModal()}`) never shows those cards; whatever else usually shows them did not. Evidence that F1/F2 cause it is weak (A/B 0/8 vs 1/6 on the final), but a stuck week is what sếp hates most → part E (week end on the host) should take it, or a small fix: after the guest's endTurn frame closes, `if(Q.length&&$("modal").hidden)showModal()`. likely: có thể · nặng (stuck week, reload clears) · seen in coop-thin-c C4.
- **N1** dead-but-open socket loses an intent silently (all parts) — needs host-side dedupe by intent id + guest resend until the answer — hiếm (phone asleep while she acts) · vừa · part H (reconnect) owner.
- **N2** a child's face identity (j73 `kid`) is rolled lazily by display code on whichever phone shows her first, and `kk` (j61) is each phone's own handle stored on the world object: on a child both phones show before a sync, the host's roll wins and her picture of that child can change once — hiếm · nhỏ · roll the identity at birth on the host (part G) .
- **N3 (kit, not C):** iPad 1180x820 guest, new-life "Phẩm phục Tần" item card with 22 items: the item-icon spotlight rows spill over the list and the Nhận button covers list text (kitRevealHTML with many items). No kit file differs from main → KIT REQUEST added to dev/kit/KIT_REQUESTS.md on this branch.
- coop-thin-d at level 3 (not a gate before: the worker ran L4): 3 runs, a different single fail each (kit sameDom fig/one picture timing ×2, reconnect double tap + CORS page error ×1); L4 52/52 and d-probe L4 34/34. Flaky family of that test, not C logic.
- Under load (two pairs at once on 4 CPUs) C2 sometimes reports one kind `got:false` (the host's answer later than 15 s); A/B shows the same on the base build.

Shots: Fold 755x1000@2 + iPad 1180x820@2, both seats, L3 and L3 swap (NOACT): looked at, scratch only (deleted). Host Fold / iPad "Nhập cung" figure card clean; guest Fold Rương đồ card clean; guest iPad see N3. CDN img/_review/coop-thin-c/ (worker's) wiped with this verdict.

## Reviewer fixes 3 + 4 (f65b5b6c)
- **O1 fixed (was open):** after her endTurn / nextBuoi / monthTick world frame, if Q holds cards and the modal is hidden, showModal (the week end waits for an empty Q). C4 stuck: 3/9 before → 0/6 (3 rounds L4 + L3 swap) + 0/3 in the final batch.
- **C8 red (round 3 of that loop, L3 swap):** guest oldRun {"ask":1} + 4 C2 kinds with her ops not yet sent. Cause: the room held for a moment (CW.hold / reconnect → TH.on(3) false) while the lens stayed installed: stateOn("ask") let jcoopask's temp-id path run once, and her ops waited in the queue (F1: wait, not lost) past the test's 15 s read. Fix: stateOn also true while the lens is installed (C.lensOn = lOn). Final batch C8 {}/{} ×3.

## ROLLOVER HANDOVER #1 → #2 (reviewer session_01N1tNP4NkEVbfkftEhoSW5h, 11/17/2026 21:20Z, context ≈ 38 %)
State: branch review/coop-thin-c-r1 @ f65b5b6c pushed (origin/main 60b0e3bf is an ancestor; main may have moved again → merge again, generated files from main + rebuild, KIT_REQUESTS both entries; check j2/jbal/jcoopthinb stay main's: ONE key BAL.allyRel). Worktree /home/user/wt/rvc (sparse), logs /home/user/wt/rvc-out*, scratch shots deleted.
Left: (1) read /home/user/wt/rvc-out4/fin.txt: thin-a L0 + quickcheck on f65b5b6c (quickcheck: `bash dev/tools/quickcheck.sh`); (2) rerun coop-thin-d-probe L4 (P1 failed once on f65b5b6c; if it repeats, check whether fix 3's showModal changes when her ev card shows mid-week); (3) one more L3 swap if time; (4) wipe worker shots `python3 dev/site/cdn_sync.py --wipe-review coop-thin-c`; (5) set the verdict line + CLAIMS row 869 + send_message Foreman B ROOT session_01N1tNP3WvLNPV6guHYCkC66.
Verdict as of #1: every brief check 1–8 PASS (see table); 4 reviewer fixes; nothing failing that is C except the one d-probe P1 to recheck.

## REVIEWER #2 (session_01N1tNP6cMqcMNhStqaraUuW, 11/17/2026 21:25Z–23:10Z) — VERDICT: PASS review/coop-thin-c-r1 eb3675a6 (READY FF)

PRIORITY #1 CHECK ('coop-thin-c|jcoopthinc|nohost|stateOn'): OD L1487/L1489/L1493/L1494 + OD:L1063 | main none (C not on main; jcoopthin parts A/B/D) | review/* review/coop-thin-c 475beba7, review/coop-thin-c-r1 (this) | claims B rows 869 (#1, rolled over) + 951 (#2). Started from '## ROLLOVER HANDOVER #1 → #2'; finished checks not redone.
START_CTX ≈ 8 % (estimate); ends ≈ 45 % (no rollover).

**Verdict sha eb3675a6** = f65b5b6c + merge main 4c8568f5 (93956e3e) + reviewer #2 fix F1b (6b2489a8) + merges main 99f3978d (86e51ae7), c7375c0c (4eac30bc), b048e495 (eb3675a6). origin/main b048e495 is an ancestor. Every merge: only generated files (index.html / sw.js / assets.json, taken from main + site rebuilt) and KIT_REQUESTS.md (both entries kept) conflicted; j2 / jbal / jcoopthinb = main's (ONE key BAL.allyRel). Diff vs main in dev/build = C only (assemble.py, jcoop.js rxWrap, jcoopask.js, jcoopthin.js CAP 4 + doFn, jcoopthinc.js, jcoopworld.js). main moved 4 times during this review (UI batches s36a–s38b: kit, shelf, map frame, display room — no co-op file).

### #1's 4 fixes — whole family?
| fix | check | result |
|---|---|---|
| F1 nohost / nothin resend | the listener returned early unless `gOn()` (C switch on): a "thin" level drop or a build hold (TH.on false) landing BEFORE the Worker's nohost / nothin answer dropped the pack again — the same loss by another door | **fixed (F1b, 6b2489a8)**: the error listener runs on any guest seat (`CW.on && !host()`); the pack goes back in SQ, and send() already waits while `!TH.on(1) || COOP.frozen`. bado still counted for every id. C10 green after (resend 1, applied once) ×6 runs. B / D intents: B retries nohost itself; D and the dead-but-open socket stay note N1 (part H). |
| F2 kids keyed by name | does any other no-id list carry a `name` with duplicates (merge would fold two members into one)? | inv items are `{k,…}` (no name → whole list, old behaviour); kids names are unique (j1 mkKid). No other no-id named list met in the C2 runs (C2 53/53 kinds compare keyed members both seats). PASS. |
| O1 showModal after her world step | covers endTurn / nextBuoi / monthTick (render excluded): every world step that can queue cards | PASS; C4 "week merged once" green in all 9 C runs of this review. |
| C8 stateOn while the lens is installed | the one switch is `stateOn`; the only other user of thinW() is jcoopthinc `on()` itself (git grep) | PASS; C8 {} / {} every run. |

### Runs (Worker ctm-coop.victoria-tntt.workers.dev)
| test | sha | result |
|---|---|---|
| coop-thin-c L3 / swap / L4 (TRIP=1) | 86e51ae7 | 18/18 · 17/17 · 17/17 (C2 53/53, C7 0, C8 {}/{}, C9 0/0, C10 resend 1) |
| coop-thin-c L3 / swap / L4 | 6b2489a8 | first L3 16/19 and swap 17/21 (C2 kpoison / takeaway / expose / trinhth / rash) were run while I had a second browser running (CPU load); the 5 kinds alone with TRACE 5/5 and full reruns L3 17/17, swap 17/17, L4 17/17 — load, not C (same picture #1 noted: answers later than the 15 s read) |
| coop-thin-c L3 swap (TRIP=1) | eb3675a6 | 17/17 |
| coop-thin-d-probe L4 | 6b2489a8 | 34/34 (#1's P1 33/34 did not repeat) |
| coop-thin-a L0 / L1 | 6b2489a8 | 19/19 / 24/24 |
| coop-thin-b L4 | 6b2489a8 | 135/136: only fail = console CORS on ctm-rank.victoria-tntt.workers.dev/life (rank Worker, test origin; infra) |
| coop-thin-b-r1 | 6b2489a8 | 39/39 (one earlier run: page.goto 60 s timeout, infra) |
| coop-thin-b-r3 (DFLAG=1, L2) | 6b2489a8 vs main 4c8568f5 | branch 23/25 once (R10 'inv deferred'), then 25/25 ×3; main 25/25 ×2 and **23/25 once with the SAME R10 fails** → main's flaky R10 (level 2: C does not run), not C |
| coop-e2e | 6b2489a8 / 86e51ae7 | 63/63 / 63/63 |
| coop-p2 | 6b2489a8 | 46/46 (7a: the B1 bribe card check green) |
| coop-b1 | 6b2489a8 | 43/43 (7b: C adds nothing) |
| coop-guest-maid | 6b2489a8 | 37/37 |
| coop-one-world seeds 1–10 | 6b2489a8 | 10/10 PASS (S.wwin clean); seed 9 again on 86e51ae7 PASS |
| one-core-guard | 6b2489a8 / 86e51ae7 | PASS / PASS |
| quickcheck | 6b2489a8 | PASS (render 163/158, tab 349/324, buổi 893/985 ms vs live) |
| golive.sh dry run | eb3675a6 | **checks OK** (quickcheck PASS: render 168/149, tab 283/274, buổi 830/807 ms, tasks>200ms 11/11, core gates PASS) — "To go live run again with --yes" |

Shots (Fold 755x1000@2 + iPad 1180x820@2, host + guest, L3 and L3 swap, NOACT): looked at, scratch only, deleted. Fold host "Nhập cung" figure card clean; Fold guest "Phẩm phục Tần" item card (10 items) clean; iPad guest 22 items = N3 (kit, KIT REQUEST already on this branch), not C. No CDN review folder used by #2 (#1's wiped).

Open notes carried (not blocking): N1 (dead-but-open socket, part H), N2 (child face identity rolled lazily, part G), N3 (kitRevealHTML many items, kit keeper), coop-thin-b-r3 R10 flaky on main (Foreman B: one B worker look).

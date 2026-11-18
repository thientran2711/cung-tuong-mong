# coop-c4-stuck — report (worker session_01N1tNP6Nm2s72Nr8peEMWEf, opus, for Foreman B ROOT)
depth 1 · START_CTX ≈ 4 % of 1M (used_tokens reads 0; estimate) · finished ≈ 22 %.
PRIORITY #1 CHECK ('reshowQ' / 'stuck dialog' / 'kit-x clear'): OD 0 | ledger 0 | main jcoopworld.js:777 reshowQ (only guard) | review/* coop-thin-f1, life-preload-fu-r2: reshowQ unchanged, no fix of this | claims: this job only. Reused: reshowQ, kitCancelIx / kit ✕ (jk4 kitXAdd), coop-e2e clear().
Branch **review/coop-c4-stuck @ a4f193e5** (from origin/main 2850c45b). SẴN SÀNG KIỂM a4f193e5.

## Root cause (proved)
The dialog was NOT hidden. In the signature `modal:false` means `#modal.hidden === false`: the card IS on screen (review r1 read it as "hidden").
Q[0] = jty tyWeek "Điềm báo". Its only option is `{n:"Đã rõ",fx:{}}`, a pure close (KIT_CLOSE_W). The kit drops that option from the list
(kitCancelIx), so the card's only exit is the kit ✕ (jk4 kitXAdd, aria-label "Lui"). The co-op test helper clear() (27 copies in 26 files, and
17 more suites eval coop-e2e's copy) clicks `#mr button` / `.opts button` / `.kbk-x,[aria-label="Đóng"]`, never the ✕. It returns 'stuck', so the
seat never ends its week (pend true, sent -1). It is flaky because tyWeek only rolls the omen (BAL.ty.plotCh) when she has an enemy.
A real player is NOT stuck: the ✕ closes the card (probe: ✕ click → Q 0, modal closed). So this is a test-harness bug, not a game bug.
Instrumented runs on main (a trace on the modal's `hidden` setter + a 3 s watchdog for "Q non-empty + modal hidden"): 0 hidden-with-Q events in 36 runs.
2 of the 36 runs stuck (≈ 6 %). One was dumped: Q ["Điềm báo","Hội phối đồ: báo đề","Lời cảnh báo"], modal visible, the only button the kit ✕.
The other was cut off by my 600 s timeout, so it left no dump.

## Fix (whole family)
| # | where | before | after |
|---|---|---|---|
| T1 | co-op test clear(), every copy (scan script: regex on the `m.querySelector('#mr button…')` chain) | 27 chains in 26 files without the ✕: coop-ask-srvprobe, b1, b2b5, bot, chat, cyc, dbg-hostdeath, e2e, guest-maid, looks-act, looks, night, one-world-play, p2, pets, play, r2, rejoin-stats, rev2, sleep, timer-lag, timer, toil-look, oldroom-r1, show-why-coop, sw-update ×2 (+ the 17 suites that eval coop-e2e's clear: thin-a/b/c/d/e, …) | each chain ends `\|\|m.querySelector('.dlg .kit-x')` (the player's own exit). ts-a already used kitModalClose; panel-size is not a clearer. |
| T2 | coop-e2e press() | a click on "Sẵn sàng" while a card is still queued (not yet on screen) is ignored by nextBuoi (Q.length), but press() counted it → "buổi 1:1 advanced for both" FAIL (1 of 6 e2e runs on c30486d3) | a press counts only when it took (bend / pend / waiting / #next locked / buổi moved, condition ≤ 2.5 s); otherwise it presses again |
| G1 | game jcoopworld reshowQ (co-op only) | while a book (.kbk-bar, Tuần lục) was up the reshow was dropped for good, and closing the book draws nothing (j87 onClose): a card queued and hidden under the book stayed unseen until some later render | re-arms (400 ms) until the book is gone, then shows; exposes CW.reshowQ / CW.qN / CW.qArmed for the test. Solo untouched. |

Game family scan (paths that can leave Q non-empty with no dialog open):
- Every `#modal.hidden=true` site checked: j3 showModal (only when Q is empty), j74 (title screen open, legitimate), jcloud / jcooplobby drop (only when Q is empty), jcoopworld closeModal (only when !S). None hides the dialog while Q holds a card.
- The 200 `Q.push` sites rely on showModal or render → reshowQ (co-op); unchanged. The only reshow blocker was the book (G1).
- Static pure-close single-option cards: 1 (jty Điềm báo). Dynamic ones are covered by test S2.

## New test dev/test/coop-c4-stuck.js (deterministic, condition waits only), both seats
- S1: Tuần lục book up + card queued + dialog hidden + reshow run forced → the book closes → the card shows.
- S2: a pure-close card shows only the kit ✕, and the shared clear() closes it.
- S3: guard: Q non-empty + no dialog open → shown.
- S4: a week with ✕-only cards on both seats ends once.

Before (main code + old clear): **5/11**. S4 reproduces the exact flake signature (Q ["Điềm báo",…], modal visible, sent -1, the week never ends); S1 host stays hidden for good.
After: **11/11**.

## Gates (live Worker)
- coop-c4-stuck L3 ×10 all green (11/11, or 12/12 when a setup week runs) · L0 11/11 · L5 11/11 · L3 swap 11/11 · L5 swap 11/11
- coop-thin-c L3 ×10 16/16 (one 17/17) · thin-c L5 16/16
- coop-e2e on c30486d3 ×5: 4×63/63 + 1×61/64 (the press race, fixed by T2). On a4f193e5 ×5 63/63 + COOP_SWAP=1 63/63 (also 63/63 on c30486d3)
- coop-p2 45/45 · coop-night 105/105 · coop-thin-e L5 32/32 ×2 + swap 32/32 · coop-one-world seeds 1–10 PASS · one-core-guard PASS
- quickcheck a4f193e5 PASS (core gates PASS, open 1247 ms, old save ok, render 217/226, tab 371/436, buổi 1081/1092 ms new/live, tasks>200ms 18/19)

Repro rate: before ≈ 6 % (2/36 thin-c L3, instrumented main). After: 0/10 thin-c L3, and 0 runs with the dialog signature among the other ~40 co-op runs.

## Notes
- Conflict risk: coop-thin-f1 / life-preload-fu-r2 touch jcoopworld.js. My game diff is the reshowQ lines only (+3). The test edits are mechanical one-line appends; whoever lands second re-runs the patch (the scan regex is in this report, script /home/user/wt/c4-scr/patch_clear.py logic: append `||m.querySelector('.dlg .kit-x')` to each `#mr button` chain).
- life-preload-fu r2's ask (B was blamed for this flake): confirmed NOT B. It is this harness bug, and it is on main too.
- CLAIMS: the original row was pruned from CLAIMS.md by someone else, so it was re-added.

## REVIEW r1 (opus reviewer session_01N1tNP4qzpqrMB5FZNZNqSm, for Foreman B) — PASS
depth 1 · START_CTX ≈ 3 % of 1M (used_tokens reads 0; estimate) · finished ≈ 12 %.
PRIORITY #1 CHECK ('reshowQ' / 'kit-x clear' / 'stuck dialog'): OD 0 | ledger 0 | main jcoopworld reshowQ (only guard) | review/* none other | claims: this review only. The worker's report has the line.

Branches (both descend from origin/main a8a10c66):
- **FULL review/coop-c4-stuck-r1 @ ca661db3** (ca661db3e2d45de4434b87366007db4babad9a02) — tests + jcoopworld reshowQ guard. Touches dev/build/jcoopworld.js (+ built index.html, sw.js) → waits for the MAIN freeze (C-AG LIVE).
- **SPLIT review/coop-c4-stuck-r1-tests @ f60b4024** (f60b4024b4b4237872263021501e128601b72d87) — tests only (27 files under dev/test/, no game file, no built file). May land now. In it coop-c4-stuck S1 prints "reshowQ book guard not in this build, S1 not run" (S1 tests the guard); S2–S5 run. Once the guard lands, the full branch's test runs S1 again.

### (1) Root cause — proved
- jty tyWeek "Điềm báo" has one option {n:"Đã rõ",fx:{}}. j3 kitCancelIx drops it from the option list (KIT_CLOSE_W pure close), and jk4 kitCloseSync adds the kit ✕ only when kitModalCloser finds a real closer (= chooseM(cancelIx)). So "Đã rõ" is not a dead button: it IS the ✕ (kit rule, same for every pure-close card). Not a game bug; no kit change needed.
- NEW S2b (both seats, Fold 686x880 / iPad 1180x820, + swap): a REAL Playwright pointer tap (hit-tested) on the ✕ closes the card. For this one check other layers are made click-through: the harness leaves the life-start Luân hồi roulette (kitRoulette step 0, never picked by the helpers), edict movies and panels on top; a player closes those first.
- The old clear() pressed only #mr / .opts buttons → 'stuck' on a ✕-only card → pend true / sent -1 = the flake signature. Confirmed.

### (2) No weakened test — old vs new
| helper | before | after (r1) |
|---|---|---|
| clear() in 26 files (27 chains) | #mr button → .opts button → (book/✕ labels) → 'stuck' | same chain, then the dialog's kit ✕ **only if on screen** (r1 tightened the worker's `m.querySelector('.dlg .kit-x')` to `[...].find(x=>x.offsetParent!==null)`) → 'stuck'. The ✕ is last: it never skips a real choice. Hidden dialog path unchanged (returns '', the week cannot end → the test FAILS). |
| coop-e2e press() | a click counted at once | counted only when it took (stricter) |
| coop-lag CLEAR1 | already presses any visible dialog button (all.pop()) | unchanged |
| solo tests | wipe Q directly | not affected |
Shared helper instead of 26 copies: not cheap (each file's clear differs); one-line appends kept. Family scan after the main merge: every '#mr button' chain has the visible-✕ fallback (26/26).
NEW negative checks S5 (both seats): (a) a queued card with the dialog truly hidden → clear() presses nothing, the card stays queued (showModal held so the room's own armed reshow cannot race it); (b) a ✕-only card whose ✕ is not on screen → clear() says 'stuck', never clicks it.

### (3) reshowQ guard — no double show, no loop
- Shows only when Q non-empty AND #modal hidden; showModal draws Q[0] only. Re-arms (400 ms) only while .kbk-bar is up with the same condition; the render hook arms only when !qT → one timer at a time. Solo: CW.on false → untouched.
- Checked live L0 / L3 / L5, both seats, + swap (S1/S3 green every run).

### (4) life-preload-fu r2 flake: same harness bug (as the worker says). Note for that reviewer.

### Gates (live Worker)
FULL branch (before the 2nd main merge, on 1b5ca1dc): coop-c4-stuck L3 ×10 all green (17/17, one 18/18) · L0 18/18 · L5 17/17 · L3 swap 17/17 · L5 swap 18/18 · coop-thin-c L3 ×10 16–17/16–17 · thin-c L5 16/16 · coop-e2e ×5 63/63 + COOP_SWAP 63/63 · p2 45/45 · night 105/105 · thin-e L5 32/32 + swap 32/32 · one-world seeds 1–10 PASS · one-core PASS · quickcheck PASS (228 s, old save ok, perf same as live).
After merging main a8a10c66: c4 L3 ×3 + 2 green, L5 swap: one S5a race FAIL (16/17) → fixed (hold showModal) → L5 swap ×3 green, L0 17/17 · thin-c L3 ×3 16/16 · e2e 63/63 + swap 63/63 · thin-e L5 32/32 · p2 45/45 · night 105/105 · one-world 1–3 PASS · one-core PASS · quickcheck PASS (195 s, old save ok).
SPLIT branch: c4 L3 ×3 13/13 · L0 13/13 · L5 swap ×2 13/13 · e2e ×2 63/63 + swap 63/63 · thin-c L3 ×5 16–17 · p2 45/45 · one-core PASS. (No built file changes → quickcheck not needed.)
No shots taken for the verdict (no UI change); CDN review folder not used.

Verdict: **PASS FULL review/coop-c4-stuck-r1 ca661db3** (waits for the freeze) · **PASS SPLIT review/coop-c4-stuck-r1-tests f60b4024** (may land now).
Touched files FULL: dev/build/jcoopworld.js, index.html, sw.js, dev/test/{coop-ask-srvprobe,coop-b1,coop-b2b5,coop-bot,coop-c4-stuck,coop-chat,coop-cyc,coop-dbg-hostdeath,coop-e2e,coop-guest-maid,coop-looks-act,coop-looks,coop-night,coop-one-world-play,coop-p2,coop-pets,coop-play,coop-r2,coop-rejoin-stats,coop-rev2,coop-sleep,coop-timer-lag,coop-timer,coop-toil-look,oldroom-r1,show-why-coop,sw-update}.js. SPLIT: the same dev/test files only.
Side note (not this task): in co-op the life-start Luân hồi roulette (#kroul) can stay on screen over a running world when nobody picks; harmless for a player (she taps it first) but worth knowing for later harness work.

### REVIEW r1 — final merge after F1 LIVE (18/11 ~23:10Z)
- Merged main 53544bd8 (coop-thin-f1 LIVE) into review/coop-c4-stuck-r1 → **1130a49e** (1130a49edade358c627742e94633e3c35c44f698), descends from origin/main 53544bd8.
- F1 landed the SAME reshowQ guard in a fuller form (qBlocked: the book only when visible, or a mini game up). Conflict resolved by keeping F1's guard as is and adding only the test hooks (CW.qN counter, CW.reshowQ, CW.qArmed) so coop-c4-stuck S1 runs again. Checked: no double timer (render arms only when !qT), no loop beyond the blocked time, solo untouched. coop-cyc / coop-e2e: main already held the split's lines (+ F1's nrdy), taken from main.
- Diff vs main now: dev/build/jcoopworld.js (+2 lines: counter + hooks), index.html, sw.js (rebuilt).
- Gates on 1130a49e (live Worker): coop-c4-stuck L3 ×3 17–18/17–18 (S1 runs, both seats) · L0 17/17 · L5 swap 17/17 · coop-e2e 63/63 + COOP_SWAP 63/63 · coop-thin-c L3 16/16 · coop-thin-e-net L6 20/20 · one-core PASS · quickcheck PASS (176 s, old save ok).
- Verdict: **PASS review/coop-c4-stuck-r1 1130a49e — READY FF.**

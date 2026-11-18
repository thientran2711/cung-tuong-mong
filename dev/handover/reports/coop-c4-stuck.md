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

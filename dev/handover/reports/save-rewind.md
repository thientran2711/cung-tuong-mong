# save-rewind — B FIXER SAVE-REWIND (opus) session_01N1tNP32jhAFNgcHJLVZMQL → FOREMAN B ROOT 2 child 6 session_01N1tNP337kNhnZqGoHJPfXB
PRIORITY #1 CHECK ('SAVE REWIND'): OD 0 | ledger 0 | claims 8 (STATUS/tally lines only) | main 0 | review/* 0 besides the B save stack (review/save-fix-stack-rv24 06062f15, rv25 22ae90b4 — reused, not redone) | harness: robot-rt.js f65d019b «SAVE REWIND» detector (F side) read.
depth 7 · START_CTX ≈ 4 % (used_tokens read 0; own estimate).

## VERDICT: **STACK CURES IT** — no game code changed
Branch **review/save-rewind a9772d74496550e99d1e622d3600e2b43377655c (pushed)** = review/save-fix-stack-rv25 22ae90b4 + ONE new file `dev/test/save-rewind.js` (no dev/build change, no BAL, no player-visible word, no kit part; slotEnc/slotDec untouched; old saves load = F's own LIVE sổ loads on the stack).

## (b) Root cause (LIVE d9ca7892)
LIVE `dev/build/jspread.js:115`: `save=function(){… if(SP13.L.some(x=>x.code)){SP13.held=1;…return} …}` — while a CODE world card that jspread moved to a later buổi is waiting (not on screen yet), EVERY autosave is dropped. The step that planned it (often the month flip: stipend / month-start cards) and every buổi after it stay unwritten until that card is shown and answered. The screen meanwhile is free (no card open): the player sees the new buổi, the sổ still holds the buổi before the step. A reload / tab close then loads the older sổ = «SAVE REWIND».
LIVE `jqsave.js:14` jqSaveable counts every card with ANY function as code (an empty «Tiếp tục» go, a generator rk card) → far more moved cards are «code» and hold. LIVE `jqsave.js:27` also holds for a code card in Q with no «same buổi» limit.
The stack cures it in TWO layers (both proven): (1) save-unseen-lists r2/r4: empty-go and generator cards are data (written into the sổ) — on rv25 F's run moves 14–20 cards and NONE is code (SP13.stat.unsaved never counted); (2) save-year-rollback: even a real code card waiting no longer holds the save. MUTATE «live» puts both back → FAIL; MUTATE «hold» puts back only the hold (for every moved card) → FAIL.
F's s18d: the month flip 1.4.2.3 → 1.5.0.0 (b49 → b50) was never written; the robot sat in 1.5.0.0 (stuck on the place page «Trường Xuân cung · Vĩnh Xuân hiên») and its level-3 unstick reloaded twice → both times back to 1.4.2.3 (harness saveRewind ×2, CP b50 «stored 1.4.2.3»). It is not a debounce, not a missing unload handler (every render() already writes; LIVE has no solo pagehide save and needs none) and not the quota case — it is the write being HELD.
The stack already holds the cure (review/save-year-rollback, in rv24/rv25): jspread no longer holds the save for a waiting code card (the step is always written, the unseen code card is left out = ACCEPT row in reports/save-unseen-lists.md), and jqsave holds only within the SAME buổi while a code card is ON SCREEN (time cannot move then), plus a buổi counts as written only when the slot really took the write (SAVE_N).

## (a)+(e) Test — `node dev/test/save-rewind.js <page> fold,ipadAir`
F's own checkpoint sổ (8ae99226 review/flight2-s18, flight2-s18d.ckpt.json, all localStorage keys) → title → «Tiếp tục kiếp này» → 8 real «Sang buổi» taps like the robot (every card answered; helpers = save-boundary-reload.js, one copy) across a month flip; sổ read every 200 ms; then the player leaves on a free screen: **reload** (page.reload) or **close** (visibilitychange hidden + tab close with pagehide → a new tab) → loaded again must equal the screen. Slot writes counted.
| page | Fold 755x1000 reload | Fold close | iPad 1180x820 reload | iPad close |
|---|---|---|---|---|
| LIVE d9ca7892 | **FAIL**: free screen 1.12.0.0 / sổ 1.11.2.3 ×20, 1.12.0.1 / sổ 1.11.2.3 ×21, 1.12.1.1 / sổ 1.12.1.0 ×22 (= 2 buổi lost over the month flip) | **FAIL** (same, + 1.12.1.2 / 1.12.1.1) | **FAIL** (5 dates behind, incl. 1.11.2.2 / sổ 1.11.2.0) | **FAIL** |
| rv24 06062f15 | **PASS** 0 of 309 | **PASS** 0 of 305 | **PASS** 0 of 279 | **PASS** 0 of 293 |
| rv25 22ae90b4 (= this branch) | **PASS** 0 of 305 | **PASS** 0 of 283 | **PASS** 0 of 297 | **PASS** 0 of 297 |
| MUTATE hold (rv25; every save dropped while any moved card waits) | **FAIL** (7 dates behind, 71 drops) | **FAIL** | **FAIL** | **FAIL** → 4/4 caught |
| MUTATE live (rv25 + LIVE card sort + LIVE hold on a waiting code card, = LIVE jspread.js:115 + jqSaveable) | **FAIL** (4 dates behind) | **FAIL** | **FAIL** | **FAIL** → 4/4 caught |
(Over the 8 taps LIVE happened to land in sync at the very end, so its reload after the last tap matched; the fault is every free moment in between — exactly when the robot reloaded.)

## Perf smoke (no save storm) — slot writes per tap (≈ 2 buổi incl. the night)
| | Fold reload | Fold close | iPad reload | iPad close |
|---|---|---|---|---|
| LIVE | 54 (6.8/tap) | 61 (7.6) | 68 (8.5) | — |
| rv24 | 135 (16.9) | 116 (14.5) | 123 (15.4) | 108 (13.5) |
| MUTATE live (LIVE hold on rv25) | 72 (9.0) | 62 (7.8) | 60 (7.5) | 69 (8.6) |
| rv25 | 118 (14.8/tap) | 112 (14.0) | 109 (13.6) | 133 (16.6) |
The stack writes ≈ 2× LIVE because LIVE DROPPED the held writes (the bug) — putting the LIVE hold back on rv25 gives LIVE's count again (MUTATE live row); the rv25 count is the plain render→save rate (one write per render that changes the screen, j6), no loop, no timer, no write without a render. No new writer is added by this branch.

## (c) LAW 11 family — every state change a reload could lose the same way (rv25 = this branch)
| change | path that writes it | LIVE | rv25 | keep / fix |
|---|---|---|---|---|
| buổi / khắc step (Sang buổi, auto-advance) | j6 render→save; jqsave step-write at once (key changed) | HELD by jspread while a code card waits → lost | written at once (save-rewind PASS, save-boundary-reload buoi/day) | stack cures |
| night commit (tối → sáng, jnf scene) | same, after the night scene | HELD (same) | written (8 taps include 4 nights, 0 mismatch) | stack cures |
| tuần / tháng flip (stipend, month cards) | same | HELD — F's b49→b50 | written (month flip in every case; save-boundary-reload month / month-0s) | stack cures |
| year flip (Tết, year-end) | same | HELD (robot M2) | written (save-boundary-reload year ×3 / year-0s / robot-y3) | stack cures |
| purchases / acts / gifts in a buổi | act → render → save | HELD while a moved code card waits | written at once | stack cures |
| dialog choice (chooseM) | render → save | HELD (same) | written at once | stack cures |
| a CODE card on screen (options run code) | jqsave hold within the same buổi | held (no buổi limit) | held only inside the buổi; a reload lands before that card, never a buổi back | keep (ruled ACCEPT, reports/save-year-rollback.md) |
| unseen code card moved by jspread | — | blocks every save | left out of the sổ, step still written (SP13.stat.unsaved) | keep (ACCEPT row, save-unseen-lists) |
| new life / identity card | j52 nl mark + jqSaveNow | slot empty in the first buổi (robot M4) | written at once | stack cures (save-unseen-lists) |
| death | j6 save removes the slot | — | — | keep (save-death-rebirth gate) |
| ☰ to title | j6 menu: save() then title | — | — | keep |
| Sổ mây on, title showing | jcloud drops a background save (no change of the life) | — | — | keep (by design) |
| co-op seat | jcoopworld CW.snap = ser() on every save + pagehide / visibilitychange snapSave(true) | — | — | keep (co-op has its own unload write) |
| tab hidden / closed (solo) | no extra writer needed: every change is already written at its render | — | close case PASS | keep |

## Gates
Only a new test file is added: the stack's own gates (SUL, scans, quickcheck, death, notice, knsell, coop-e2e — reports/save-unseen-lists.md «## MERGE rv25», merger session_01N1tNP4dWzNLTa9hBMQxHNc) cover the code, which is byte-identical to rv25. save-rewind.js is the new gate: LIVE FAIL 4/4, rv25 PASS 4/4, MUTATE FAIL.

## Note for Foreman F (harness, not game)
robot-rt.js f65d019b logs a 1-buổi rewind as «the game saves at the buổi start: not a bug». With the stack live, a reload never goes back a buổi (it lands at the current buổi; at most before an open code card in that buổi), so after the stack ships every SAVE REWIND (lost ≥ 1) is a real bug.

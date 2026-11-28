# REPORT — B FIXER SAVE-FAIL-WARN (session_01N1tNP6Pj5FGKjGNBJE8zTs, depth 1)
PRIORITY #1 CHECK ('không lưu được|khong luu duoc|saveFail|QuotaExceeded|saveblocked'): OD 0 | ledger 0 | claims 8 | main 10 — j6.js:112–116 saveBlocked() (robot10 E-FIX-3) + its callers jcloud writeSlot, jcoopworld snapSave, jcoopthine guest copy, j16 x-write line; dev/test/r10e-saveblocked.js + r10e-savewrite-scan.py | review/* 0. REUSED: saveBlocked(), CTM_WAIT.saveBlocked words, kitNotice (hold / again / sticky options), kitNoticeDrop, the r10e scan + test.
KIT CHECK: reuses kitNotice (§42.2 chip + Tin báo box, §42.2a hold), kitNoticeDrop. No new part, no CSS, no new word.

## Why E saw nothing (2)
1. **Told ONCE.** saveBlocked() called kitNotice with the same id + same line on every refused write; kitNotice drops a repeat of the same line (`again` false → no chip). So the player got ONE 5 s chip at the first refused write and then silence for every later one (E-S5: x540 refused writes).
2. **The one chip was easily lost**: the step that runs the save also posts its own notices (e.g. «Trong cung có hội…»); the newest notice takes the chip, so the save chip could last well under 5 s, or wait behind a card and then be replaced.
3. **3 save writers were silent** (swallowed the error, never called saveBlocked): j1 store.set of the cross-life stores (cung-luanhoi / cung-kiep / ctm-nextlife), j52 pdSet (phúc duyên), jcoopthin host per-room store ctm-thin-d (her cards / patches; a host reload resyncs from it). The r10e scan missed them (and missed every slotPut writer: it only looked at localStorage.setItem / LS.set).
4. Wording CTM_WAIT.saveBlocked exists and prints; not the cause.
5. (E's page was pre-rv26: the cause — the 5 M unpacked save — is gone on LIVE; this branch makes a future failure visible.)

## Fix (3) — LAW 11 table (every save writer)
| writer | calls saveBlocked? LIVE → fix | notice seen? LIVE → fix (Fold 755x1000 + iPad 1180x820) | fix |
|---|---|---|---|
| j6 save (every autosave: jqsave / jspread / jdayq / jnotice / jcloud / jslots / jtsb wrappers all end here) | yes → yes | first write only (≤5 s) → SEEN, HELD under the top bar until writes work; told again each new buổi | saveBlocked: kitNotice hold:true + again at a new buổi |
| jqSaveNow (life start) | via save → same | not seen after the first → SEEN | (same) |
| j1 store.set cung-luanhoi / cung-kiep / ctm-nextlife | NO → yes | never → SEEN | catch → saveBlocked for those 3 keys |
| j52 pdSet ctm-phucduyen | NO → yes | never → SEEN | catch → saveBlocked |
| jcoopthin D.save ctm-thin-d (co-op host resync store) | NO → yes | never → (static) | inner try → saveBlocked |
| jcloud writeSlot | yes → yes | (module-private; static) | — |
| jcoopworld snapSave SNK | yes → yes | (static) | + saveOk on success |
| jcoopthine guest copy ELS | yes → yes | (static) | — |
| j16 Thiết lập › Nạp sổ › Ghi vào ô | own red line → same | SEEN (real taps, both devices) → SEEN | — |
| recovery: a write works again | — | LIVE keeps «Không ghi được sổ» forever, also inside the sổ → fix drops it + writes once more without it | saveOk() |
Same buổi, more refused writes: one line in Tin báo, no chip per write.

## Wording (proposal, NOT changed — VANPHONG is hers)
Live line: «Không ghi được sổ (chỗ cất trong máy bị chặn hoặc đã đầy).» It says what happened, not what to do. There is no in-game «delete a slot» action, so «xin dọn bớt ô lưu» would point at nothing. Proposal (same style): «Không ghi được sổ: chỗ cất trong máy đã đầy hoặc bị chặn. Xin vào Thiết lập › Chép sổ giữ lại bản chép.» — for MAIN to put to her if wanted; one edit of CTM_WAIT.saveBlocked in dev/site/kwait.js.

## Test (4) dev/test/save-fail-warn.js
LIVE 5fb13d60: 17 FAIL (static scan 3 silent; repeat / new buổi / jqSaveNow / 4 cross-life writers / recovery, both devices). Fix: ALL OK (2 runs). MUTATE=1 (saveBlocked back to the LIVE one-shot form): 16 FAIL.
r10e-saveblocked.js hardened: it restored writes before its on-screen check; with saveOk a working write now drops the notice, so the restore moved after the check (2/2 ALL OK).

## Gates (branch review/save-fail-warn 371c5d7f4c34812a2d523c0b92507f0e5b0d0a1b, base LIVE 5fb13d60, one browser at a time)
| gate | result |
|---|---|
| save-fail-warn.js (Fold + iPad) | fix ALL OK ×2 · LIVE 17 FAIL · MUTATE 16 FAIL |
| r10e-saveblocked.js | ALL OK ×2 (hardened, see above) |
| r10e-savewrite-scan.py | 8 writers / 0 silent (LIVE 3 silent) |
| SUL save-unseen-lists.js | PASS 32/32 |
| save-rewind.js | PASS 4/4 |
| oldsave-r1.js (LIVE build save → new) | 16/16 |
| notice: notice-scan.py · notice-late-save.js · kit-notice-hold.js | PASS · PASS fold+iPad · PASS |
| quickcheck ALONE | run 4 **PASS** (render 293/282, tab 492/540, buổi 1660/2596, tasks>200 30/32). Runs 1+3: perf longTaskMaxMs 5045 / 6505 over the ceiling; run 2: q-softlock 4 FAIL on iPad + perf. Checked: q-softlock alone on this build PASS ×2; a probe (saveBlocked throws a page error on first call, not committed) over a perf run showed saveBlocked NEVER runs in the perf lives (no code of this branch runs on a working save except an early-return saveOk), that run PASSED; and in run 4 LIVE itself had a 6595 ms task → the worst task depends on the random life (tú nữ selection cards), not on this branch. |

Files: dev/build/j6.js, j1.js, j52.js, jcoopthin.js, jcoopworld.js; dev/test/save-fail-warn.js (new), r10e-saveblocked.js, r10e-savewrite-scan.py; built index.html / sw.js / assets.json. Tier: save (small, 5 source lines + tests).
Shots: none kept (looked at the Thiết lập › Nạp sổ red line on Fold; chip positions in the test output: Fold [165,160,425×22], iPad [377,45,425×22]).

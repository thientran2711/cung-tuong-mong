# rv-robot-bugs-m1 — reviewer report (child of MAIN CHÍNH 137)
PRIORITY #1 CHECK: OD «Kiếp thứ hai» 1 | main kitStatusIcon 15, no title-blank guard | review/* robot-bugs-m1 only | claims robot-bugs-m1 session_01V1ZZGzi8hGNhxUQKvbGBbx.
VERDICT: **PASS 13b0907a** (base = origin/main 9f72524b, so it fast-forwards).

## Tests
QUICKCHECK PASS (169 s: open 1420 ms, old save ok, perf new/live render 184/205, buổi 931/916) · core gates PASS · build matches (only the CTM_BI line differs).
LIVE-vs-branch real taps (page.mouse through the host transform), fresh profile, load cover dismissed → home panel:
| device | step | LIVE 9f72524b | branch 13b0907a |
|---|---|---|---|
| Fold 755x1000 | ✕ | 0 buttons (blank) | 6 |
| Fold | Esc | 0 | 6 |
| Fold | tap outside | 0 | 6 |
| Fold | Thiết lập → ✕ | 0 | 6 |
| iPad 1180x820 | ✕ / Esc / outside / Thiết lập ✕ | 0 | 6 |
0 page errors in all runs. Pair picture looked at: CDN img/_review/robot-bugs-m1/pair.jpg (left LIVE Fold blank, middle branch Fold, right branch iPad). Art is missing in the shots only because the CDN was blocked in the test.

## (A) title guard + jload stall button — OK
- Guard (j74): single path, runs after closeModal + MutationObserver; no private UI (reuses go("home")/resumeGame). Confirmed live repro fixed.
- jload «Vào cung ngay»: same KIT button `.kbtn alt data-kl="go"` and same wording as the existing error path (law 9 OK, no new CSS, no new text). Stall = 20 s with no file finished, no `KLOAD.err`, phase core; «Thỉnh tiếp» stays error-only.
- Slow-but-alive download: the button only APPEARS (nothing auto-fires); `go` sets phase skipped + close() + startBg(); startBg is guarded by `bgOn`, and when the pool later finishes its second close()/startBg() are no-ops (el null, bgOn) → no double start, no save touched. A single big file slower than 20 s shows the button too: harmless, it is the player's choice.
- NOT independently reproduced: the true hung-request case (my route hang still hit the error path first, button was there at t=8 s via error); I verified the stall branch by reading the code. Death+reload ✕ not separately driven: it ends in the same state (title, #modal hidden, empty Q) that the guard catches (proved on fresh).
## (B) j25 null-guard — OK
`typeof S`/`Array.isArray(rivals)` guard before `rivals.find`; no behaviour change with a life. 'sung' not reproduced by worker either; accepted.
## (D) geLifeNo — OK
Readers: j79 chip → geK.lifeNo; jge results (l.103) → geLifeNo; jkcg kctGive → geK.lifeNo (private copy removed; its `lifeLog().length+1` is only a dead fallback if jge is absent). Others (jtut veteran, pastHTML, lifeSave) read lifeLog for other purposes, not a life number. over() sets S.dead then lifeSave in the same call, so «S.dead ⇒ log holds this life» holds. Pre-existing, not touched: lifeLog is capped at 40, so the number stops growing there; co-op toCanon flips S.dead for a moment (no reader).
## (C) agree: leave as KIT §13.9 design (law 16). Parking-lot for MAIN: the ✕ «Quay lại» on a result card reads poorly; offer a kit-level rename later with the owner.
~100% xong / ~90% chơi được

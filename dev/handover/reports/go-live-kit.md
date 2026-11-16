# go-live-kit — worker report (owner OD:L1370 (b)–(f))

Branch: `review/go-live-kit` @ `49f19f1c` (contains origin/main 12f52db7; FF-ready at report time). Tier of this branch: **BIG**
(touches dev/site/build_site.sh + new dev/site/buildinfo.py = deploy scripts) → full review. Never pushed to main.
START_CTX ≈ 3 % (get_session read 0; estimate). Full doc for users of the kit: `dev/tools/GO_LIVE.md` (on the branch).

## Priority rule #1 check
git grep origin/main + origin/review/*: no tier/quickcheck/rollback/golive/nightly tool existed. REUSED: `window.CTM_BUILD`
(content hash, swreg.js, KIT §35.2), the "Có bản mới" update flow, `jnotes.js` "Thông tin cập nhật" Settings row + sub-screen (D10),
`dev/test/lib/device.js` (real profiles, HOST mode), the old-save pattern of game-feel.js, the turn loop of perf.js.

## What was built
| # | file | what | time measured on this box |
|---|---|---|---|
| 1 | `dev/tools/tier.js` | SMALL/BIG per changed LINE vs live main (comments ignored via a comment mask; string-only edits = text; layout-number edits = UI; numbers inside text, game numbers, BAL/save/co-op/time/rank words, logic in core modules, deploy/boot scripts, server Worker → BIG; unknown → BIG). Prints the test list. Exit 0 SMALL / 2 BIG. Probes: text in jnotes/jecon → SMALL, BAL numbers → BIG, CSS px in p1.html → SMALL, `S.bac+=` in a UI module → BIG, new function in j40 → BIG | ~1 s |
| 2 | `dev/tools/quickcheck.sh` + `.js` | sha holds its own build (fresh build == committed index.html, build line aside) · Fold open 0 page errors (main + game frame, onerror + unhandledrejection) · old save made by the LIVE build loads in the new one and plays a buổi · iPad perf smoke at 4x CPU (new life, 3 tabs, 1 buổi, long tasks) measured on new AND live build, fail on a jump (>1.5x / +6 long tasks, >1.6x worst task, >1.6x buổi) or ceilings. CDN requests blocked (code check, stable timings). Verified it FAILS on an injected page error | **33–40 s** per sha (branch 38 s, main 34 s) |
| 3 | `dev/site/buildinfo.py` + `build_site.sh` + `dev/build/jnotes.js` | `window.CTM_BI={s,t,c,b,h}` (source sha, commit time, ONE what-changed line, build hash, last 10 live builds read from live main's own CTM_BI). Written after V → a rebuild that only changes the line never triggers a player update; deterministic. Line source: env CTM_CHANGE → `dev/site/CHANGE.txt` (if it differs from live) → newest non-merge subject. Shown with KIT parts only: Settings `.kctl` row small text `mã <sha> · mm/dd/yyyy hh:mm`; the "Thông tin cập nhật" page starts with `kpsec`+`kpst`+`kitRows` (§51) "Lần cập nhật đang chơi" (Mã · Lúc · Điều mới) + "Các lần trước". No new CSS, no KIT REQUEST. Test `dev/test/build-line.js` (Fold + iPad: row, page, kit rows, no inline style, no cut label, no overflow, no page errors) ALL OK | build +~1 s |
| 4 | `dev/tools/rollback.sh previous\|<sha> [--yes]` | NEW commit on top of live main with the good build's exact tree (`commit-tree`), FF push under flock, tag `live/…-rollback`. No reset, no force-push, nothing lost. Pages serves the old files in ~1–2 min; sw.js returns to the old version → players get "Có bản mới" at a natural break; CDN untouched (content-keyed, add-only). Quickchecks the target first. Dry run (no --yes) tested on b5dd6f38 | ~1 min + push |
| 4b | `dev/tools/golive.sh <sha> [--yes]` | the push step: fetch under flock, FF check, tier, quickcheck on that exact sha (no skip switch), push sha:main, tag `live/<UTC>-<sha>` (message = what-changed line) so rollback finds "previous" | ~1 min + push |
| 5 | `dev/tools/nightly.sh [ref] [--quick]` | throw-away worktree at live main, suites one by one with time limits, report `/home/user/wt/nightly/<date>-<sha>.md` | `--quick` 20 min; full adds coop-e2e (≤40 min) + perf.js fold,ipadAir (30+ min/device) ≈ **1.5–2 h** |
| + | `dev/tools/shots.js` | SMALL tier: title, home, every tab on Fold 755x1000 + iPad 1180x820 (HOST mode, CDN pictures on), overflow + page errors | ~80 s |
| 6 | `dev/handover/HANDOVER_TO_SESSION8.md` §1 | push recipe replaced in place (tier → quickcheck → push → build line, rollback, nightly) | — |

## Nightly --quick on live main fb367740 (17:00–17:21Z): 4 FAIL / 11
Report copy: `dev/handover/reports/go-live-kit/nightly-quick-2026-11-16-fb367740.md`.
- quickcheck, build-line: FAIL only because live main does not have the kit yet (scripts missing / no build line) — will pass once merged.
- kit-conform: REAL finding on live main — 16 (Fold) / 15 (iPad) dialogs MISSING an approved frame template; Fold float `kloadchip`.
- cloud-save: test is stale — the `#dawn` new-day overlay intercepts its click (test needs the overlay closed first), not a game crash.
- PASS: shots, game-feel (6 min), tab-pairs (5 min), phone-bars, save-slots, update-notes.

## Screenshots (menu build line)
- Fold 755x1000: `dev/handover/reports/go-live-kit/build-line-755x1000.jpg`
- iPad 1180x820: `dev/handover/reports/go-live-kit/build-line-1180x820.jpg`

## Notes for the coordinator
- The build line shows the SOURCE commit (the commit before the build commit): a build cannot contain its own sha. Rollback accepts both.
- Player-visible what-changed line should be Vietnamese (CHANGE.txt); without it the English commit subject shows.
- Tags `live/*` are pushed by golive.sh/rollback.sh (they never move main). If tag pushes are unwanted, rollback falls back to the build-line history.
- Thresholds of the perf smoke were set from 5 runs on this box (live: 9–13 long tasks >200 ms, worst 1.4–1.7 s, buổi 0.9–1.2 s at 4x CPU).

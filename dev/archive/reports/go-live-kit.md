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

## r2 FIX (worker opus, 16/11 ~18:40Z) — review r1 FAIL list 1–3 fixed · branch `review/go-live-kit` @ `35d6206c`
START_CTX ≈ 5 % (estimate). Contains origin/main **b7c5d787** (merged; conflict only in generated index.html/sw.js + CHANGE.txt (kept the kit's line), site rebuilt). Never pushed to main.

1. **BLOCKER rollback target (rollback.sh + golive.sh).** Every target (`previous` or a named sha) must be (a) an **ancestor of live main** (`merge-base --is-ancestor`, deepens a shallow clone once before refusing) AND (b) a **known live build** = a `live/*` tag or an entry of main's build line `CTM_BI.h`; else STOP. A kit-branch commit like 319b194c is inside main's history once the branch is live, so (a) alone does not stop it — (b) does. `--known-live` lifts (b) only (old mains from before the build line); (a) is never lifted. `previous` = newest tag that is an ancestor, has other files than main and was **not rolled away** (a `rollback: live <bad> -> …` commit marks <bad>) → a second `previous` goes further back, never toggles forward (r1 note fixed too). No tag → `CTM_BI.h[0]` (what was live when main was built) → else STOP. **golive.sh tags the build live NOW (`live/…-<sha>-baseline`) BEFORE the push** when it has no live tag (first go-live / main moved without golive); if that tag cannot be pushed it stops without pushing main. Dry run lists the commits undone. Tag names now carry seconds. Push = plain FF (no --force anywhere); script asserts main is an ancestor of the rollback commit before pushing.
2. **Perf gate (quickcheck.js + new `dev/tools/perfgate.json` = the ONE place for every perf number).** 3 runs of NEW and LIVE, alternating, iPad 4x CPU; cold-start outlier runs (open or playable > 2x that build's median) dropped; **medians** compared. Gated vs live: **render ms** (fastest of 12 direct render() calls/run), **tab ms** (4 tabs x 2 visits, per tab the faster, median), buổi ms, tasks > 200 ms (counted over play only), worst task — each FAILS when new > live + max(addMs, live x ratio) (render 100 ms/0.3, tab 120 ms/0.3, buổi 1500/0.5, tasks 5/0.5, worst 800/0.6) + absolute ceilings (render 1500, tab 3000, buổi 45000, tasks 40, worst 5000). Self-test switch `--inject-render-ms N` (only slows the NEW build). Time 2.5–3.3 min per quickcheck (budget 5–10).
3. **tier.js**: `dev/tools/(tier|quickcheck|golive|rollback|nightly|shots|perfgate|gate-selftest)*` and `dev/test/lib/*` → BIG "go-live gate" (+ test `bash dev/tools/gate-selftest.sh`); any other `dev/tools/*` → BIG "unsure". Proof: `tier.js 35d6206c` → BIG with every dev/tools file BIG.

New `dev/tools/gate-selftest.sh <live main> <READY sha> [--perf]`: scratch bare origin sharing this clone's objects (no copy, no real push), quickcheck stubbed only inside the scratch clone. GO_LIVE.md updated (target rules, perf gate, self-test).

### Dry-run log — gate-selftest.sh origin/main(b7c5d787) 35d6206c → 14 passed, 0 failed
(A = first-ever go-live + first-ever rollback; B = real rollback; C = second previous; D = normal tagged rollback; E = bad targets. The A dry run undoes 17 commits / 20 files, 790 deletions = exactly the kit itself, `git diff main old-main`.)
```
== A first go-live of 35d6206c on main b7c5d787, then rollback previous (dry)
    LIVE 35d6206c · tag live/20261116-182852-35d6206c · what changed: Thiết lập › Thông tin cập nhật: hiện mã lần cập nhật đang chơi, lúc nào, �
  PASS main == 35d6206c
  PASS push FF: b7c5d787 is an ancestor of new main 35d6206c
  PASS baseline tag on old main b7c5d787 (made before the push)
    target b7c5d787 (tag live/20261116-182852-b7c5d787-baseline)
    dd4c316a7 go-live kit r2: GO_LIVE.md (rollback target rules, perf gate, gate-selftest)
  PASS previous -> old main b7c5d787
  PASS dry run changed nothing
== A2 same with NO live/* tags (fallback: CTM_BI.h[0] of main)
    target b7c5d787 (build line of main (CTM_BI.h[0], no usable live/* tag))
  PASS no tags: previous -> old main b7c5d787 (build line)
== B rollback previous --yes
    ROLLED BACK: main 35d6206c -> 53a9ce88 (files of b7c5d787) · tag live/20261116-182853-53a9ce88-rollback · site back in ~1-2 min
  PASS push FF: 35d6206c is an ancestor of new main 53a9ce88
  PASS main 53a9ce88 has exactly the files of b7c5d787
  PASS rollback commit sits on top of 35d6206c (history kept)
== C previous again (must not toggle forward to 35d6206c)
      skip live/20000101-000001-35d6206c (rolled away earlier)
    STOP: no previous live build found (no live/* tag or build-line entry that is an ancestor of main). Name the sha: rollback.sh <sha>
  PASS STOP (no older build) - no toggle
== D a newer build goes live on top of the rollback, then previous (dry)
    LIVE 5787b846 · tag live/20261116-182856-5787b846 · what changed: ? · site updates in ~1-2 min (GitHub Pages)
  PASS push FF: 53a9ce88 is an ancestor of new main 5787b846
    target 53a9ce88 (tag live/20261116-182853-53a9ce88-rollback)
  PASS previous -> the rollback build 53a9ce88
== E bad targets are refused
  PASS refused 319b194c: not a known live build; main unchanged
  PASS refused 3251fbcd: not an ancestor of live main; main unchanged
    tag live/20000101-000000-b7c5d787-baseline 68644af3
    tag live/20000101-000001-35d6206c 635ab4ca
    tag live/20261116-182853-53a9ce88-rollback 91d61e52
    tag live/20261116-182856-5787b846 f34248ef
```

### Perf gate runs (all on this box, iPad 4x CPU, median of 3; new/live)
| run | sha | render ms | tab ms | buổi ms | tasks>200 | result |
|---|---|---|---|---|---|---|
| normal 1 | 8b905906 | 285/291 | 406/423 | 933/3492 (live outlier) | 15/29 | PASS |
| normal 2 | 8b905906 | 297/303 | 412/403 | 937/1038 | 15/14 | PASS |
| normal 3 | 8b905906 | 299/314 | 401/430 | 1118/1088 | 14/15 | PASS |
| +250 ms per render() 1 | 8b905906 | **501**/280 (limit 380) | **683**/370 (limit 490) | 1274/938 | 17/13 | **FAIL** render + tab |
| +250 ms per render() 2 | 8b905906 | **541**/304 (limit 404) | **648**/382 (limit 502) | 1339/965 | 16/13 | **FAIL** render + tab |
| final (after main merge) | 35d6206c | 302/284 | 389/368 | 970/989 | 13/14 | **PASS** (old save ok, 0 page errors, 183 s) |
Earlier (first draft, 8e2c… not kept): the 12 render() repeats were counted as long tasks → 1 normal run hit the old ceiling 30; fixed by counting long tasks over play only. Run-to-run spread of a single run: render ±60 ms, tab ±50 ms; the median of 3 moved ≤ 30 ms between normal runs, so the 100/120 ms margins leave ≥ 70 ms headroom, while +250 ms lands ≥ 120 ms over the limit.
Note: in normal 1 the LIVE buổi median was itself slow (2 of 3 live runs slow, so the median kept it); only the buổi/tasks limits loosen in such a run, render/tab baselines stayed stable; the absolute ceilings still apply.

Next: reviewer r2 — re-check only rollback.sh, golive.sh (baseline tag), quickcheck.js/perfgate.json, tier.js, gate-selftest.sh.

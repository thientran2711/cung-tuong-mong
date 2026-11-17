# GO-LIVE KIT (owner OD:L1370: option 1 + tiered checks)

One branch at a time, right after its reviewer PASS, by the foreman who owns it. One small change per push. Never a merge train.

## The recipe (every push to main)
1. On the branch: merge `origin/main`, write ONE line of what changed in `dev/site/CHANGE.txt` (player-facing Vietnamese, VANPHONG words),
   `bash dev/site/build_site.sh`, commit. That commit is the READY sha.
2. `node dev/tools/tier.js <READY sha>` → SMALL or BIG + the test list. The script decides, not the worker.
   - SMALL (UI / layout / CSS / text / art / kit look only): the listed touched-part tests + `node dev/tools/shots.js <dir>` (Fold 755x1000 +
     iPad 1180x820, look at every shot) + old-save load (inside quickcheck). ≈15–25 min.
   - BIG (BAL / numbers, save / slots / migrations, co-op / sync, time / buổi / khắc, progression / rules, server Worker, boot / deploy
     scripts): full review as before.
3. `bash dev/tools/golive.sh <READY sha>` → re-checks FF, prints the tier, runs `dev/tools/quickcheck.sh` on that exact sha.
   Then `bash dev/tools/golive.sh <READY sha> --yes` → pushes `sha:main` (FF-only, under `/home/user/wt/fetch.lock`) and tags
   `live/<UTC yyyymmdd-hhmm>-<sha>`. Last line = `LIVE <sha> · tag … · what changed: …`.
4. Check the menu: title (or ☰) → Thiết lập → row "Thông tin cập nhật" shows `mã <sha> · <time>`; its page starts with
   "Lần cập nhật đang chơi" (Mã · Lúc · Điều mới) and "Các lần trước" (last 10 live builds).

## Tools
| tool | what | time on this box |
|---|---|---|
| `dev/tools/tier.js [ref] [--base origin/main] [--json]` | SMALL/BIG per changed line (text-only and layout-number edits stay SMALL; BAL words, save/co-op/time words, game numbers, numbers inside text, logic in core modules → BIG; unsure → BIG). Exit 0 SMALL, 2 BIG | ~1 s |
| `dev/tools/quickcheck.sh [sha] [--net] [--cpu N] [--runs N]` | sha holds its own build (fresh build = committed index.html, build line aside) · Fold open, 0 page errors · old save made by the LIVE build loads + plays a buổi · iPad perf GATE (4x CPU): 3 runs of new AND live, alternating, cold-start outliers dropped, MEDIANS compared — render() ms (fastest of 12 calls), tab-change ms (4 tabs x 2 visits), buổi ms, tasks > 200 ms, worst task; each must stay under live + max(addMs, live x ratio) and under absolute ceilings. All perf numbers in ONE file `dev/tools/perfgate.json`. `--inject-render-ms N` = self-test (adds N ms to every render() of the new build; must FAIL) | 2.5–3 min (budget 5–10 min) |
| `dev/tools/gate-selftest.sh <live main> <READY sha> [--perf]` | proves the gate on a scratch origin (no real push): first go-live tags the old main, rollback previous with/without tags, real rollback, no toggle-forward, newer build then rollback, bad targets refused; `--perf` adds normal PASS + injected +250 ms FAIL. Run it when tier.js says 'go-live gate' (any dev/tools/* change is BIG) | ~20 s (+6 min with --perf) |
| `dev/tools/shots.js <dir> [device…] [--no-net]` | title, home, every tab on Fold + iPad (HOST mode, real profiles), overflow + page errors | ~80 s |
| `dev/tools/golive.sh <sha> [--yes]` | FF check → tier → quickcheck → push → live tag | ~1 min + push |
| `dev/tools/rollback.sh previous\|<sha> [--yes]` | one-step rollback (below) | ~1 min + push |
| `dev/tools/nightly.sh [ref] [--quick]` | full suites on live main, dated report in `/home/user/wt/nightly/` | see report |

## Build line (KIT parts only)
`dev/site/buildinfo.py` (run by `build_site.sh` after `sw.js` is made) writes `window.CTM_BI={s,t,c,b,h}` into index.html:
source commit, its time (UTC), the what-changed line (env `CTM_CHANGE` → `dev/site/CHANGE.txt` when it differs from live → newest
non-merge commit subject → HEAD subject), content build hash, and the last 10 live builds read from live main's own `CTM_BI`.
It is written after V, so a rebuild that changes only this line never makes players download a new build, and it is deterministic
(commit time, not the clock). Shown by `dev/build/jnotes.js` with `kpsec` + `kpst` + `kitRows` (§51) and the Settings `.kctl` row.

## Rollback — what it does
- main is NEVER reset or force-pushed. A new commit is made on top of live main whose files are exactly the good build's files
  (`git commit-tree <good>^{tree} -p <main>`), main is fast-forwarded to it and tagged `live/…-rollback`. All commits stay.
- Target rules (any target, `previous` or a named sha): it must be an ANCESTOR of live main AND a KNOWN live build (a `live/*` tag or
  an entry of main's build line `CTM_BI.h`), else STOP. A kit-branch commit is inside main's history once the branch went live, but it
  was never live and does not contain the old main (review r1 blocker: 126 files / 4339 lines). `--known-live` lifts only the
  "known" rule for an old main from before the build line existed; the ancestor rule is never lifted.
- `previous` = newest `live/*` tag that is an ancestor of main, has other files than main, and was not rolled away earlier (a
  `rollback: live <bad> -> …` commit on main marks <bad>); so a second `previous` goes one build further back, never forward to the
  bad build. No such tag → main's build line `CTM_BI.h[0]` (what was live when this build was made) → else STOP, name a sha.
- `golive.sh` tags the build that is live NOW (`live/…-<sha>-baseline`) BEFORE its push when it has no `live/*` tag yet (first go-live,
  or main moved without golive), so `previous` always has a target. The dry run lists the commits whose changes are undone.
- Site: Pages serves main's root → old index.html + sw.js live in ~1–2 min; players get "Có bản mới" and reopen on the good build at a
  natural break. CDN pictures untouched (content-keyed, only added) → the old build finds its pictures.
- After: the broken branch merges main (its change is now undone), `git revert <rollback commit>` on the branch, fix, review, go live.
- A save-format change in the bad build: ask that branch's owner before rolling back.

## Core gates (review/one-core-land, owner CO-OP FIRST 16/11 s23 + OD:L1267)
quickcheck.sh step 1b runs `dev/tools/coregates.sh` after the build: G1 one-core-guard (no BAL key set twice, no typed core text, no NEW inline
rule number; the sha's frozen list may not be longer than live's), G2 rules-one-source (Fold), G3 kit-conform (Fold), G4 every
`dev/tools/quickcheck.d/*.sh` hook (co-op one-world probe = `50-coop-one-world.sh`, contract in quickcheck.d/README.md). Any FAIL = the go-live FAILS.
Typical cost ~85 s; whole quickcheck ~4.5 min.

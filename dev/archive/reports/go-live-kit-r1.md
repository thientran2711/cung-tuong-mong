# go-live-kit review r1 (BIG tier) — review/go-live-kit @ 49f19f1c (contains main 12f52db7)

START_CTX ~3 %. Reviewer: sonnet, session_01UV1Sziqerw2LafzSqMsfcB. Checked against OD:L1370 (b)-(f). Nothing pushed to main.

## VERDICT: FAIL (1 blocker, 2 must-fix)

### FAIL list
1. BLOCKER — rollback.sh `previous` picks a WRONG build when no earlier live/* tag exists (= the very first rollback after the kit goes live).
   Repro (scratch bare origin: main=12f52db7 -> golive.sh 49f19f1c --yes -> `rollback.sh previous` dry run): target = 319b194c (a kit-branch
   commit that does NOT contain live main 12f52db7); dry run reports "126 files changed, 285 insertions, 4339 deletions". With --yes it would
   commit that old tree on top of main and throw away everything main gained since. Cause: fallback uses `git rev-list --first-parent --reverse
   SRC..M -- index.html | head -1` (SRC = CTM_BI.h[0].s = 12f52db7), but SRC reaches M through the merge's 2nd parent, so the first-parent walk
   returns the kit branch's own first build. Fix: (a) when G is chosen, require `git merge-base --is-ancestor G M` and abort if the diff touches
   > N files / G is not a first-parent-or-merged ancestor build; (b) fallback should use SRC itself when `SRC:index.html` exists (12f52db7); (c)
   golive.sh: if live main has no live/* tag, tag the OLD main (baseline) before the first push so `previous` always has a tag.
   Positive: `rollback.sh <sha> --yes` (explicit 12f52db7) works as specified — new commit with exactly that tree on top of main, FF push, tag
   `live/…-rollback`, no force, 49f19f1c still an ancestor of main, `git diff 12f52db7 main` empty.
2. quickcheck perf gate is too weak for "no perf regression". (i) Injected +250 ms busy-wait in every render() → PASS (tabs 1160 vs 715 ms, buổi
   1579 vs 1398 ms, long tasks 14 vs 12 — within the allowances); tab-change ms is measured but never gated. (ii) The LIVE baseline is sometimes
   a cold-start outlier (2 of 6 runs here: live playable 41.8 s / 47.2 s, worst task 36–40 s) and the allowance is max(live*1.6, live+800 ms), so
   in those runs anything passes. Fix: gate tab ms; run the live baseline twice and use the lower (or cap the baseline at the absolute ceiling);
   keep the absolute ceilings.
3. tier.js classes dev/tools/* (tier.js, quickcheck.*, golive.sh, rollback.sh, nightly.sh, shots.js) as SMALL ("dev tools, not in the game"). A
   change to the gate itself would then need only the SMALL checks. Fix: move `^dev/tools/` (and dev/test/lib/device.js) to BIG_PATH ('go-live gate').

### Non-blocking notes (fix when convenient)
- tier.js is over-conservative on pure wording: review/act-text-r1 (28 files of text) → BIG ("logic change (unsure)" on template literals), so SMALL
  is reachable mostly for UI/art/CSS. Safe direction, no action required.
- golive.sh prints the tier but never gates on it: a BIG sha with no reviewer PASS can still be pushed (spec (a) says "right after reviewer PASS").
  Consider requiring a `--reviewed <report>` argument when tier = BIG.
- After a rollback, `rollback.sh previous` again would pick the bad build (newest tag whose tree differs from main) = roll-forward toggle. Say so in GO_LIVE.md.
- Player-visible "Các lần trước" shows an English commit subject ("sw.js rebuilt for merged main de239eca"): the CHANGE.txt (Vietnamese) rule must be enforced by golive (warn if the line has no Vietnamese letters).
- iPad Settings row: the date wraps ("… 11/16/2026 / 17:24"); cosmetic.
- golive/quickcheck must be given a full sha (a branch name is not fetched) — documented usage says sha, fine.

## What passed
(b) tier.js: 5 real merged review branches with their own diff (base = merge 2nd parent): actcard-small-r1 SMALL (8 SMALL files), art-complete-r2 SMALL
(36), buoi-transition-r1 BIG (time module jbuoi.js + assemble.py), balance-pass-r1 BIG (BAL numbers jbal/jecon/jrest…), coop-chat-r1 BIG (Worker +
protocol + jcoopchat), cloud-save-r1 BIG (jcloud save module), anim-pace-r1 BIG (BAL.pace), contest-ui-r3 BIG (BAL.cp), appearance-port-r1 BIG (prog), act-text-r1
BIG (over-conservative, see notes). Synthetic probes: `S.bac+=5` in a UI module → BIG; `localStorage` in a UI module → BIG; number in jtime4 → BIG; style-only in
jinv → SMALL; CSS → SMALL; unknown root file → BIG; dev/site non-listed scripts → BIG. No false SMALL found for BAL/save/co-op/time/progression.
(c) quickcheck.sh: 36–83 s per sha (budget 5–10 min). Really FAILS on: injected page error (FAIL perf: 2 page errors), deser() throwing (FAIL old save),
and source changed without rebuild (FAIL "NOT BUILT"). Old save made by the LIVE build loads and plays a buổi (4 runs). Generated files restored; .quickcheck/ ignored.
(d) build line: build-line.js ALL OK on Fold 755x1000 + iPad 1180x820; I looked at the shots: sub-screen starts with "LẦN CẬP NHẬT ĐANG CHƠI" (Mã/Lúc/Điều mới) + "CÁC LẦN TRƯỚC",
kit rows/section heads like the neighbouring "NGÀY …" sections, no inline style, no cut text, no overflow, 0 page errors; Settings row "Thông tin cập nhật" + small
"mã 8189c4cb · 11/16/2026 17:24" matches the other `.kctl` rows (dates mm/dd/yyyy). Settings shots: scratchpad row-755.jpg / row-1180.jpg (not committed).
(e) rollback.sh: FF-only, no force, nothing lost — see FAIL 1 for the one bug.
(f) nightly.sh: starts a throw-away sparse worktree, builds, starts the two local servers, runs the suites one by one with limits (observed start and first suite; I
stopped it after ~1 min to save CPU; the worker's own --quick run report exists). golive.sh: refused a non-FF sha ("STOP: … does not contain live main"), "already live" when sha == main,
checks OK + prints push command without --yes, with --yes pushed exactly sha:main FF and tagged live/<UTC>-<sha> (message = what-changed line).
build_site.sh change: build 4–6 s, index.html opens, 0 page errors, old save loads, perf equal to live on quiet runs (long tasks 12 vs 12, buổi 1220 vs 1193 ms); CTM_BI null-safe.
Next: worker fixes 1–3, re-push to review/go-live-kit, ask for r2 (only rollback.sh / quickcheck.js / tier.js need re-checking).

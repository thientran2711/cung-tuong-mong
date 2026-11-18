PRIORITY #1 CHECK ('handover-archive|dev/archive|dọn kho|cleanup'): OD 5 (OD L1817 owner "Ủa mới lượt 7 à…" + earlier image/storage cleanups) | ledger 0 | claims 8 (older image-sweep / img-cleanup jobs, finished — not this) | main 2 | review/* 3 (old image-sweep branches) → nobody on this job (MAIN s43 order 18/11 02:58Z + ADD 03:05Z in dev/handover/FOREMAN_D_STATUS.md).

# handover-archive report (worker, sonnet, docs-only)

## Result: 5 live coordination files are now < 100 KB (all ≤ 99.3 KB in bytes/1000); old entries sit in dev/archive/

| file | before (lines / KB) | after live (lines / KB) | moved to dev/archive/<name>-11-18-2026.md (lines / KB) |
|---|---|---|---|
| FOREMAN_C_STATUS.md | 1645 / 537.5 | 233 / 99.2 | 1417 / 451.5 |
| FOREMAN_B_STATUS.md | 622 / 236.9 | 217 / 99.1 | 410 / 143.8 |
| FOREMAN_D_STATUS.md | 460 / 149.3 | 222 / 99.1 | 243 / 54.1 |
| HANDOVER_SESSION9.md | 1140 / 282.4 | 358 / 79.7 | 789 / 210.3 |
| CLAIMS.md | 1021 / 227.3 | 445 / 99.3 | 581 / 133.8 |
| OWNER_LEDGER.md | 62 KB | untouched (brief) | – |

KB = bytes/1000. Archive files include a 1-line header and one `<!-- moved … -->` comment per run (2 runs per file), so archive lines = moved lines + 3. Other sessions kept appending while I worked; "before" is the copy fetched at the start of each run.

**Nothing lost:** every run asserts live_after + moved = lines_before and `archive_one.sh` also checks that every original line (multiset, `sort`/`comm`) is in live ∪ archive; any miss aborts before commit. `grep -rln "^<<<<<<< " dev` = 0 after every push.

## Rules used (and where I went beyond the brief — please read)
- Each file went in its own commit (fetch → reset --hard origin → script → check → commit → push; retried on reject). Script: `dev/tools/archive_move.py` (+ `archive_one.sh`), re-runnable in seconds: `sh dev/tools/archive_one.sh FOREMAN_C_STATUS --limit 97`.
- Pass 1 (as briefed): lines dated older than 24 h move, except open asks (lines starting FOR MAIN / KIT REQUEST / KIT NOTE / QUESTION / OPEN OWNER QUESTIONS / WAITING FOR … that are not closed; KIT REQUEST/QUESTION kept whatever the age). Header block (≤ first 8 lines or first `## `), the 150 newest-dated lines, and cited line numbers always stay. Old `RUNNING` / `READY` / `PASS` / `ORDER` lines are stale snapshots → moved (live state is in CLAIMS.md / main).
- **Pass 2/3 (owner target ≤ 100 KB beats "older than 24 h")**: the project moves so fast that 24 h of text alone was 150–450 KB per file. To reach the target I also moved finished lines < 24 h old, oldest first (never open asks, header, protected, 150 newest). For CLAIMS.md, rows whose state is RUNNING/READY but older than 24 h were moved too (oldest first) — 378 rows said RUNNING, most from 16/11 05–07Z whose sessions are long gone. **If a foreman needs an old row back: `grep` it in dev/archive/CLAIMS-11-18-2026.md and paste it back.**
- **Cited line numbers kept:** HANDOVER_SESSION9.md lines 1–74 (tags [HO/HANDOVER_SESSION9.md:L2…L74]) and CLAIMS.md lines 1–58 (tags L50/L51/L58) were not touched (only lines after them moved). FOREMAN_*_STATUS.md are not cited by any tag. OWNER_DECISIONS.md, dev/rules/** (except the 1 line), HANDOVER.md, OWNER_LEDGER.md, HO/* cited files: untouched.
- Heuristic limits: files mix newest-first and oldest-first sections and many lines have no date (they inherit the previous dated line). I could not verify "answered/unanswered" for every FOR MAIN line; each FOR MAIN from the last 48 h is kept.

## reports/ and briefs/ → dev/archive/reports, dev/archive/briefs (git mv, same names)
| folder | before | moved | left |
|---|---|---|---|
| dev/handover/reports | 667 | 369 | 298 |
| dev/handover/briefs | 257 | 43 | 214 |
Moved only if the file name is mentioned nowhere in live text (dev/** outside archive/reports/briefs, incl. rules, CLAIMS, STATUS, FOREMAN_*.md, OWNER_LEDGER) AND its latest dated mention is older than 24 h (or none). Sub-directories (art sheets etc., 13 MB) were not moved. Most briefs stay because OWNER_LEDGER.md / FOREMAN_*.md (untouchable) still name them. Commits: reports 5c3ade83, briefs f06c3f3d.

## prio1.sh (dev/tools/prio1.sh)
Diff: new `AR=$(grep -rn -i -E "$P" dev/archive …)` ; prints `== ARCHIVE (dev/archive, last 8)`; last line gets ` | archive N` appended (same format otherwise); the lock dir `/home/user/wt` is created if missing (before, the script hung on a worker without that dir).
Before: `PRIORITY #1 CHECK ('handover-archive|dev/archive|dọn kho|cleanup'): OD 5 | ledger 0 | claims 5 | main 2 | review/* 3` (claims fell 8 → 5 because old rows moved to the archive)
After:  `PRIORITY #1 CHECK ('handover-archive|dev/archive|dọn kho|cleanup'): OD 5 | ledger 0 | claims 5 | main 2 | review/* 3 | archive 27`
Note: a PRIORITY #1 check for an older topic now finds its hits in the `archive` field instead of `claims`.

## Standing rule
Added to dev/rules/START_FOREMAN.md as a 4th bullet of the ROLLOVER block (commit d68967dc), exactly: "At every rollover the outgoing foreman/main moves finished entries older than 24 h of its STATUS/HANDOVER into dev/archive/ so the live file stays ≤ 100 KB."

## Commits (all on claude/cung-tuong-mong-handover-hj0h8w)
tools 3611c1f7 · D cfae1c0e→c35f16ab · B 5e1a538c→82d2650d · C c948a837→40b04256 · S9 292f3da5→7fa77e0f · CLAIMS fcadfa15→dfbbf4dd · reports 5c3ade83 · briefs f06c3f3d · prio1 dd7fe6c9 · rule d68967dc (first→second run per file).
Follow-up for MAIN/D: the live files will grow again — each foreman re-runs `archive_one.sh` at its rollover (the standing rule).

DONE 0ed250c1

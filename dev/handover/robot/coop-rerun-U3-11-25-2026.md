# U3 co-op rerun — results + HANDOVER (runner session_01N1tNP64GnUphva1hStHgSV, 11/25/2026)
PRIORITY #1 CHECK ('robot-rt-coop|rerun'): done at start (brief b-root-rerun.md); all patches/dumps below are on the handover / saves branches.
Rows: U3 pair 3 (host kiếp 1,3–10; guest kiếp 1,3–12,14–17). Rule now (MAIN 139): a valid co-op rerun = SEGMENT (2 h real-tap OR year 2, 0 stuck, ≥1 save+reload). Runner base accepted by MAIN 140: review/robot-coop-stack-u3 512cfee6 (provisional) = c4163a93 + fix-5-r1 3f672533.

## Segments / rooms (all real taps, jsClicks 0, no Escape after room 8)
| # | room | seed | devices | game | harness | result |
|---|---|---|---|---|---|---|
| – | CT8Q, 2GZ2 | 31,32 | Fold/iPad | main ca5af050 (LIVE Worker) | c29a6b5b | both seats looped (unstick never reached ✕); evidence partly lost |
| – | BGMQ | 32 | Fold/iPad | main ca5af050 | c29a6b5b+U3 | year 1 week 0 buổi split → FIXER #11 (saves u3r/BGMQ @10fc7a4b) |
| – | 9YAK, K6TA, V8UE, HCEP | 33–38 | Fold/iPad | fix-6 d16c5300 / c4163a93 | 4523381f / 5edf09f6 | bare #title after ☰ «Ô lưu» → ✕ (HCEP root cause, FIXER #12; saves u3r/9YAK, K6TA, HCEP) |
| – | 10 | 39 | Fold/iPad | c4163a93 | 5edf09f6+B | 65 min clean, buổi 28, 0 stuck — NO reload → not counted |
| S1 | QWGM | 40 | Fold/iPad | c4163a93 | 5edf09f6+B+U3 | INVALID stuck week 2 night (cause 3, known-fixed-pending-land) u3r/QWGM @b27d5585 |
| S2 | T6BR | 41 | Fold/iPad | c4163a93 | same | INVALID stuck week 2 night (same) u3r/T6BR @dd6abff8 |
| S3 | 7S44 | 42 | Fold/iPad | stack 512cfee6 | same | INVALID stuck year 1 m4 w3: «Bị châm chọc» + «Thang cơ duyên» popup (known harness, fixed in shared patch) u3r/7S44 @be307c0a |
| S4 | (room 15, seed 43) | 43 | Fold/iPad | stack 512cfee6 | 5edf09f6 + shared patch 3f4ceacd + U3 RELOAD_AT=20,45 | RUNNING (started 12:34Z, seg close at 120 min or year 2) |
Valid segments U3: 0 so far.

## Bugs / findings (all reported to Foreman B)
- HCEP: ☰ «Ô lưu» during co-op → slot chooser → ✕ leaves the room silently; button-less #title behind (FIXER #12). Harness now never taps ☰ in co-op.
- «Tâm trạng · X» look-up panel: ✕ «Lui» needs ~9 taps (re-queue/stack, no dedupe) seen 4× (rooms 8, 10, 13 ×2) — u3r/tamtrang-lui @fd792466.
- ktut «Lời dặn» (Thỉnh an Thái hậu hoặc Hoàng hậu) over the dawn scene stalled the guest in 2GZ2/K6TA/QWGM — U1's ktut patch in the shared diff.
- Throughput: ~16–25 real-tap buổi/hour/seat (year 2 is not reached in 2 h; segments close on time).
No lives ended → no moment logs / end-of-life reviews yet (nothing to review).

## How to run (successor)
1. Container: sparse worktrees; fetch --depth=30 under flock /home/user/wt/fetch.lock.
2. Game: git worktree of origin/review/robot-coop-stack-u3 (512cfee6); `bash dev/site/build_site.sh`; serve repo root with python3 -m http.server 8732 (127.0.0.1). Own Worker: `cd coop/worker && npm install && npx wrangler dev --local --port 8788`.
3. Harness: files dev/test/{realtap,robot-rt,robot-rt-coop}.js of review/robot-realtap 5edf09f6 + `git apply` handover dev/handover/robot/realtap-B-5edf-patch.diff (3f4ceacd or newer).
4. Run: `COOP_URL=http://127.0.0.1:8788 SEG_MIN=120 SEG_YEAR=2 RELOAD_AT=20 RTV=1 node dev/test/robot-rt-coop.js http://127.0.0.1:8732/index.html <out> host=fold guest=ipad kiep=1 seed=<n> tag=<name>` (one room per container; never quickcheck next to it). Stuck → harness writes stuck-N-dump.json per seat after 15 min: push both to review/robot10-coop-saves u3r/<room>/ + tell Foreman B / FIXER.
5. Next seeds: 44+; U3 keeps host Fold (U2+U3b swap devices).

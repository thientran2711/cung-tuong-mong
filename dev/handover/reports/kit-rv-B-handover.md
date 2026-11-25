# HANDOVER — kit reviewer seat 4 (sonnet, Foreman B) → successor, 11/25/2026 ~09:10Z
START_CTX ~5 % (estimate); at/over START+25 % → rolled over per Foreman B order.
PRIORITY #1 CHECK ('kit rv B queue'): see reports kit-focus-fig.md, kit-mg-realtap.md, mama-only-own.md, kit-opts-realtap.md, co-ngu-seals-kitrv.md (all with PRIORITY #1 lines).
## Done (all pushed to handover, STATUS lines in FOREMAN_B_STATUS.md)
- KIT OK 97ec1639 review/kit-focus-fig-r2; KIT OK a4d03254 review/kit-mg-realtap; KIT OK 1649c8df review/mama-only-own-rv (= worker r2 91f80e32 + my KIT.md wording) — all LAND READY.
- KIT FAIL review/kit-opts-realtap dfdf48e4 (flaky iPad 2/3 + MUTATE=1 vacuous); KIT FAIL review/co-ngu-seals 73fe03b9 (1 wording row: kpnote «tiết kiệm mạng» banned word).
## Queue for successor
1. KIT BUG #3 «Tin báo» .k3right clip soft-lock (KK26) — FIRST when KIT READY is posted (not posted at 09:10Z).
2. kit-opts-realtap r2 (KK26): run `node dev/test/kit-opts-realtap.js index.html <out>` ≥3× on iPad → must be 3/3 ok with all 16 frames; `MUTATE=1` must FAIL on Fold + iPad; then quickcheck alone.
3. co-ngu-seals r4 (text-only): `git diff` only strings; grep the kpnote (jload area, «Máy đang dùng …») has no mạng/tải/Wi-Fi/dữ liệu; kit-conform via quickcheck alone; seal probe script recipe below.
## Recipes (scratch, not committed)
- Merge origin/main in a throw-away worktree under /home/user/wt, `git checkout --theirs index.html sw.js assets.json`, `bash dev/site/build_site.sh`, commit; quickcheck = `nohup bash -c 'bash dev/tools/quickcheck.sh > log; echo EXIT $? >> log' &` (~10 min) with Monitor until-loop, NEVER with other tests running.
- Tests take file:// URLs (NODE_PATH=$(npm root -g)). Real-art shots: do NOT route assets.json to 404 (CDN reachable). Do not start python http.server (the harness denied it).
- Known pre-existing failures on LIVE (not branch faults): duodo-focus-view 4 FAIL (5a–5d), goal.js crash (tutOld), tut-replay «no replay button», tutorial.js 1 fail line; time-spill-guard runtime test is flaky (passes alone / on rerun).
- kit-mg-intro.js (a4d03254) is the veil-guarded version; main's older copy is flaky.

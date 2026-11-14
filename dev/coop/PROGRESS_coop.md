# PROGRESS · co-op phase 1 (branch review/coop)

Lead/backend: coop/worker/** + dev/coop/PROTOCOL.md. Worker B: dev/build/jcoop.js + jcooplobby.js. Worker C: dev/build/jcoopworld.js.

## Log
- 14/11: branch review/coop from origin/main 574f560. PROTOCOL.md written (message types, canonical state C, merge3, week sync, freeze).
- Worker coop/worker: Worker + Durable Object `Room` (SQLite-backed, hibernatable websockets, state chunked 40k chars/key,
  gzip binary frames above 200 KB, stale-socket alarm 45 s, idle rooms deleted after 30 days). merge3 in src/merge.js + test.
- GitHub Action .github/workflows/coop-worker.yml: deploys on push to main touching coop/worker/** (and manual run).

## Deploy
- (pending) URL:

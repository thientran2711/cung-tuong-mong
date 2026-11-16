# PROGRESS — review/cloud-save (C44 "Sổ mây", worker, opus)

Spec: OWNER_DECISIONS 15/11 (session 8) "One character on phone AND iPad without losing the save, solo and co-op" + foreman brief
(≥128-bit code, KV/R2/DO storage, size + rate limits, no PII, validation, CORS to the game origin, 10 versions, conflict pick).

## Done
- Worker (existing `ctm-coop`, no new Worker): `coop/worker/src/vault.js` + route in `src/index.js`; Durable Object class `Vault`
  (migration tag v2), per-IP rate-limit bindings, `VAULT_ORIGINS` var — `coop/worker/wrangler.toml`. API in the file header.
  Why a DO and not KV: strongly consistent compare-and-set for conflicts, nothing to pre-create (KV needs a namespace id).
- Local mock: `coop/worker/test/mock-do.mjs` (in-memory DO storage) + `mock-server.mjs` (node http → the real `worker.fetch`).
- Worker tests: `coop/worker/test/vault.test.mjs` (CORS, code format/uniqueness/hash naming, round trip, 409, keep, 10-cap +
  chunk cleanup, validation, size, per-vault + per-IP limits, drop). `npm test` and the deploy workflow run it.
- Client `dev/build/jcloud.js` (after jslots in assemble.py): Thiết lập › Sổ mây (`.cloudwrap`, borrowed by j74 like `.optwrap`),
  panels Ám hiệu sổ mây / Nối sổ / Hai bản sổ khác nhau / Các bản đã giữ. Kit parts only (kitModal scene panel, `.kslot` card,
  kitRows, kitInput, `.kbtn`/`.kbtn.alt`/`.ksel`, `.kpnote`); no new CSS. Per-sổ 3-way merge, auto sync on open / title / buổi end /
  app hidden, backup before overwrite, stale-life save guard.
- Co-op: room list + seat pid travel (`ctm-coop-pids`, `COOP.pidFor` in jcoop.js) — co-op lives never go to the cloud.
- j74: `.cloudwrap` in Thiết lập parts/park list, `CTM_CLOUD.wire()` on opening Thiết lập, `CTM_DRAWSLOTS`, sub line.
- Security notes: `dev/review/cloud-save-SECURITY.md`.
- e2e: `dev/test/cloud-save.js` (see Tests).

## DEPLOY PENDING (Cloudflare not connected on this account — NOT deployed)
The client defaults to the co-op Worker URL (`COOP.url`, https://ctm-coop.victoria-tntt.workers.dev). Until the Worker is deployed,
Sổ mây shows "Chưa nối được mây…" and the game works as before (local-first). Steps for the coordinator:
1. Merge review/cloud-save to main after review PASS. The existing workflow `.github/workflows/coop-worker.yml` runs on any push to
   main touching `coop/worker/**`: it runs `merge.test.mjs` + `vault.test.mjs`, then `npx wrangler@4 deploy` with the repo secrets
   CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID. So the MERGE ITSELF DEPLOYS (migration v2 adds the `Vault` class; existing rooms untouched).
   Manual alternative: `cd coop/worker && CLOUDFLARE_API_TOKEN=… npx wrangler@4 deploy`.
2. The token needs Workers Scripts:Edit (already used for rooms). The `[[ratelimits]]` bindings need no extra resource;
   if the deploy rejects them, delete the two `[[ratelimits]]` blocks and redeploy (code checks the bindings exist).
3. Smoke test after deploy:
   `curl -s -XPOST -H 'content-type: application/json' -H 'Origin: https://thientran2711.github.io' https://ctm-coop.victoria-tntt.workers.dev/api/vault/new -d '{}'`
   → `{"k":"<26 chars>"}`; the same with `Origin: https://evil.example` → 403. `GET /api/health` still `{ok:true}`.
4. Rebuild the site (assemble.py + build_site.sh) as usual so jcloud.js ships.

## Tests
- `cd coop/worker && npm test` → merge ok, vault ok 39.
- `python3 dev/build/assemble.py && node dev/test/cloud-save.js shots` (spawns the mock on a free port; shots in dev/shots/cloud-save/, not committed).
  Result 16/11: ALL 45 OK — phone 755x1000@2 ↔ iPad 1180x820@2 round trip (link by code, per-sổ merge, buổi-end auto upload, continue
  same buổi on the other device), offline → conflict panel → keep this device / keep cloud (backup version made), restore from
  Các bản đã giữ, 10-version cap, co-op room + seat pid carried / co-op life never uploaded / solo sổ untouched by a co-op buổi,
  old v5 sổ + old single room key on 1366x1024@2, no page errors, nothing off screen on all screens incl. 844x390.
- Found + handled on the way: a save made while the title is open holds the title's own kptitle panel in P (old behaviour); the
  hash ignores it and uploads strip it, else every title visit looked like a change (false conflicts). VP turns "Đang dùng" into
  "Đang mặc" (item rule) → versions list says "Bản đang theo".

## Resume notes
- Deviations from the owner design text: code is 26 chars (security rule ≥128 bit) instead of 8; "on app close" = visibilitychange
  hidden / pagehide with `keepalive` fetch (only for bodies < 60 KB; larger ones usually still finish).

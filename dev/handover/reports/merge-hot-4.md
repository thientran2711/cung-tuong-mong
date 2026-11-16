# merge-hot-4: review/cloud-save-r1 @7e187abe (C44 "So may") onto origin/main 0c23da40

- Conflicts: index.html, sw.js (generated) -> main's side, rebuilt with dev/site/build_site.sh; assets.json = rebuild. assemble.py auto-merged = main's list + 'jcloud.js' (after jslots.js).
- coop/worker + .github: nothing changed on main since the PASS base (c4e89f89), so no re-review needed. coop-worker.yml parses (yaml ok); wrangler.toml parses: DO bindings ROOM+VAULT, migrations v1+v2 (Vault), ratelimits VAULT_RL/VAULT_NEW_RL, VAULT_ORIGINS.
- Tests: worker merge ok, vault ok 48; dev/test/cloud-save.js ALL 45 OK; save-slots.js ALL OK; coop-e2e.js 59/59 (live Worker, pre-deploy); boot 755x1000@2 and 1180x820@2: 0 page errors, no horizontal overflow.
- DEPLOY: merging to main auto-deploys coop/worker (migration v2). If the account rejects [[ratelimits]], drop those two blocks (miss guard works without them).
- Post-deploy smoke test: see dev/PROGRESS_review-cloud-save-r1.md / reports/review-cloud-save-r1.md; quick check: node dev/test/coop-e2e.js /tmp/e2e (live) plus node dev/test/cloud-save.js against the deployed Worker.

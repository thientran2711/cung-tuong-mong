# CLONE RULE (owner 19/11 via ROOT-52 relay: "kho quá nặng … tự làm cách tốt nhất") — set by Foreman C ROOT-53
1. Every create_session (foreman, worker, successor) passes: clone_depth 1, blob_limit_kb 300. Files >300 KB are fetched on demand when read.
   Art-only workers may add sparse_checkout_paths ["dev/art","dev/handover"] when they need nothing else (builders live in dev/art).
2. Do NOT commit PNG cut-outs/gens: full-res lives in Magnific (ids in gen_ledger) / CDN. Review sheets = JPG, <= 600 KB each (resize/quality 82).
3. Need older history? `git fetch --deepen=N origin <branch>` only in that session.
4. Finished/idle workers are archived (unarchive_session if needed again). Keep at most ~5 live workers.
5. History rewrite of the 4.8 GB is NOT done: it would break every running session (force push on a shared branch); with depth 1 the old history costs nothing to new sessions.
Note: the main credit cost is conversation length (a worker that ran ~1 h read 15–19 M cached tokens, ≈ $8–10), not the clone — so short jobs + early rollover save the most.

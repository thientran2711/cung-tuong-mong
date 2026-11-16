# PROGRESS — review/cloud-save-r1 (reviewer: normal + security review of C44 Sổ mây)

Base: review/cloud-save @38bf315 merged onto origin/main 0a31118, then c4e89f8 (assemble.py conflicts: jcloud.js kept after jslots; site rebuilt). After the 2nd merge: vault 48, cloud-save 45 OK, save-slots OK.

## Reviewer changes on -r1
- Sync code 26 → 8 chars (owner design) with a persisted per-network miss guard in vault.js (works without `[[ratelimits]]`);
  client regex/words ("tám chữ và số", "như ABCD-EFGH", lockout message); tests updated (+9 guard checks).
- Security review: dev/review/cloud-save-r1-SECURITY.md.

## Tests (16/11)
- coop/worker: merge ok; vault ok 48. `wrangler@4 deploy --dry-run`: config valid, bindings ROOM, VAULT, VAULT_RL, VAULT_NEW_RL, VAULT_ORIGINS.
- dev/test/cloud-save.js shots: ALL 45 OK (mock passes CF-Connecting-IP, so the guard was live). save-slots.js: ALL OK.
- coop-e2e.js (live Worker): 59/59. panel-size.js: same verdict as main (pre-existing height spread + PEND:plantpick btnOut), widths identical, errs 0.
- Screens looked at: 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844 (rotate prompt): Thiết lập › Sổ mây, Nối sổ,
  Ám hiệu sổ, conflict pick, Các bản đã giữ — kit parts only, no overflow, no page errors.

## Notes (not FAIL)
- No "xóa sổ trên mây" button yet (drop endpoint exists).
- 1000x755 Nối sổ: the panel's corner seal sits over the last line of the kpnote (kit seal placement on short scene panels) — kit follow-up.
- Test shot 2-code-phone.png captures a night card-flip overlay instead of the code panel (test artifact; the assert passes).
- Two devices joined to the same co-op room at the same time share one pid/seat (newest socket wins) — expected for one player.

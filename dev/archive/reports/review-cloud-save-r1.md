PASS 7e187abe27073b10fb4fd02434d212b43ec1142a

# Review r1 — C44 Sổ mây (cloud save), branch review/cloud-save-r1

- Branch: review/cloud-save @38bf315 merged onto origin/main c4e89f8 (ancestor of the PASS sha → fast-forwardable). assemble.py: jcloud.js after jslots; site rebuilt.
- Security review: dev/review/cloud-save-r1-SECURITY.md (on the branch). Progress: dev/PROGRESS_review-cloud-save-r1.md.

## Code-length decision: 8 characters (owner design) — switched on -r1
- Judged safe for save data WITH a per-network miss guard, which I added to vault.js: one guard DO per IPv4 address / IPv6 /56, persisted,
  independent of `[[ratelimits]]`; after 10 wrong codes in an hour or 30 in a day every lookup from that network gets 429 (an in-flight
  counter blocks parallel guessing); new codes 10/hour, 30/day per network; fails closed.
- Numbers: 32^8 = 1.1e12 codes. Untargeted hits per year = networks × 30 × 365 × vaults / 1.1e12 → 1 000 rented IPs vs 100 vaults ≈ 0.001/year;
  a 100 000-node botnet vs 10 000 vaults ≈ 10/year (unrealistic threat for game saves). Targeted guess of one player's code: unreachable.
- Client: "tám chữ và số, như ABCD-EFGH"; lockout message "Gõ sai nhiều lần quá; đợi một lúc lâu rồi gõ lại."
- Cost: a mobile CGNAT IP where someone types 10 wrong codes delays sync on that IP for up to an hour (local-first, nothing lost).
- If the vault ever holds anything of value: move to a long device token issued at Nối sổ (future note, not needed now).

## Tests (after the final merge)
- coop/worker: merge ok, vault ok 48 (39 + 9 guard checks); `wrangler@4 deploy --dry-run` valid (ROOM, VAULT, VAULT_RL, VAULT_NEW_RL, VAULT_ORIGINS).
- cloud-save.js ALL 45 OK (guard live in the mock); save-slots.js ALL OK; coop-e2e 59/59 (live Worker); panel-size: same verdict as main
  (pre-existing height spread + PEND:plantpick), widths identical, 0 errors.
- Screens looked at 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844 (rotate prompt OK): kit parts only
  (kitModal scene, .kslot, kitRows, kitInput, .kbtn/.ksel, .kpnote), VANPHONG wording (no %), no overflow, no page errors. Old saves load.

## Deploy risks (merge = auto-deploy of coop/worker)
- Migration v2 `new_sqlite_classes=["Vault"]` after v1; Room untouched; dry run OK.
- `[vars] VAULT_ORIGINS` replaces dashboard vars — the Room code reads none, so nothing lost.
- If Cloudflare rejects the deploy (e.g. rate-limit bindings), the old Worker keeps running: live rooms are NOT broken; vault stays off
  (client: "Chưa nối được mây…"). Fix: drop the two `[[ratelimits]]` blocks — the r1 guard still limits.
- Coordinator smoke test after deploy: POST /api/vault/new with Origin https://thientran2711.github.io → {"k":"<8 chars>"}; evil Origin → 403; GET /api/health ok.

## Notes (not FAIL)
- No "xóa sổ trên mây" button yet (drop endpoint exists).
- 1000x755 Nối sổ: the panel's corner seal sits over the last kpnote line (kit seal placement on short scene panels) — kit follow-up.
- Test shot 2-code-phone.png captures a night card-flip overlay instead of the code panel (test artifact).
- Storage worst case ≈ 26 MB per vault (MAX_SLOT 900 000 chars; real sổ ≈ 37 KB) — tighten if storage cost ever matters.

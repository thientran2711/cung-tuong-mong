# Sổ mây (C44) — reviewer security review r1 (review/cloud-save-r1)

Scope: `coop/worker/src/vault.js`, `src/index.js` route, `wrangler.toml`, `.github/workflows/coop-worker.yml`, `dev/build/jcloud.js`,
`dev/build/jcoop.js` (pidFor). Worker notes: `dev/review/cloud-save-SECURITY.md`.

## 1. Code length — DECISION: 8 characters (owner design), with a per-network miss guard (implemented on -r1)
The 26-char / 128-bit rule came from the foreman's brief, not the owner; the owner's design says "private 8-char sync code".
What a vault protects: game saves only (no money, no PII). The risk of a short code is an UNTARGETED guess hitting some stranger's vault.

Numbers (alphabet Crockford base32, no I L O U; typed O→0, I/L→1, case/dashes ignored): 32^8 = 1.1e12 codes (40 bits).
- Guard (new on -r1, `GUARD` in vault.js): one Vault-class DO per network (IPv4 address, IPv6 /56; `::ffff:` mapped → IPv4), named
  sha256("ctm-guard:"+net), persisted in DO storage (survives eviction), independent of the `[[ratelimits]]` binding.
  A lookup of a code that does not exist = a miss. After 10 misses in an hour or 30 in a day, EVERY code lookup from that network
  is refused (429) until the window ends — so a guess that would hit is never answered. An in-flight counter makes the check
  atomic against parallel guesses (test: 40 parallel guesses → at most 10 answered). Real-code lookups never count.
  New codes: 10/hour, 30/day per network (plus `VAULT_NEW_RL` 5/min when the binding exists). Guard failure = fail closed.
- Attacker budget = 30 guesses / network / day. Expected hits per year = networks × 30 × 365 × N / 1.1e12, N = live vaults:
  | attacker networks | N = 100 vaults | N = 10 000 vaults |
  |---|---|---|
  | 1 | 1e-6 | 1e-4 |
  | 1 000 (rented proxies) | 1e-3 | 0.1 |
  | 100 000 (botnet) | 0.1 | 10 |
  Targeted guess of ONE player's code: ~5.5e11 guesses needed → unreachable.
- Judgement: safe enough for save data at this game's scale (hobby game, N in the hundreds). A 100 000-node botnet aimed at a
  save game to open random strangers' saves is not a realistic threat; even then the loss is a game save, and 10 versions remain
  unless the attacker also floods puts/drop. IF the vault ever holds anything of value (purchases, PII), move to a long device
  token issued at "Nối sổ" (8-char code only for pairing) — design note for the future, not needed now.
- Cost of the guard: two extra DO calls per vault request; a shared IPv4 (mobile CGNAT) where someone types 10 wrong codes in
  an hour delays sync for that IP for up to an hour (local-first: nothing is lost; "Gõ sai nhiều lần quá; đợi một lúc lâu rồi gõ lại.").

## 2. Checklist
| Item | Verdict |
|---|---|
| Auth model (code = key) | OK. Server makes the code (`crypto.getRandomValues`, 256 % 32 = 0, no bias); client cannot choose it. |
| DO naming | OK. sha256("ctm-vault:"+code); guard names use a different prefix → cannot collide. Code never stored. |
| Timing-safe compare | N/A: no secret is compared; lookup is by hashed DO name (existence only). |
| CORS | OK. Exact-origin allow-list (`VAULT_ORIGINS`, default `https://thientran2711.github.io`), `Vary: Origin`, preflight 204 only for it, 403 otherwise, no credentials, no wildcard on /api/vault. JSON content type forces preflight; 415 otherwise. Co-op room routes keep their old `*` CORS (unchanged, no credentials). |
| Rate limits | `[[ratelimits]]` validated by `wrangler@4 deploy --dry-run` (4.162.0: bindings listed). Fallback if the account rejects them: the r1 guard (persisted per-network) + per-vault in-memory limits still limit. |
| Whitelist rebuild | OK. `cleanBundle` rebuilds from fixed keys only (`1/2/3`, known fields) → no `__proto__` copy-through (JSON.parse makes own props; never merged with Object.assign onto a shared prototype). Types, ranges, lengths checked; sổ text `^CTM[12]:[A-Za-z0-9+/=]+$`; control chars and `<>` stripped. |
| Script injection on render | OK. Client `esc()` on every server string before kitRows/kitInput; numbers only from ints; sổ decoded through `readCode` (same as Nạp sổ), never inserted as HTML. |
| Body cap | 2.6 MB per request = 3 × 900 000-char sổ (the "900 KB" in the design notes is the per-sổ cap `MAX_SLOT`). Enforced BEFORE parsing: `content-length` check, then streaming count with abort → 413. |
| Version cap 10 | OK, head never dropped, old chunks deleted (tested). |
| 180-day expiry | OK. DO alarm every 30 days; deletes a vault idle > 180 days. Guard objects delete themselves after 2 idle days. |
| Error messages | OK. Short codes only (`nocode`, `slow`, `big`, …); no stack traces; DO internals never echoed. |
| Secrets in repo | None. `account_id` in wrangler.toml is not a secret (already there); token comes from repo secrets. |
| Logging of codes | None. Codes travel only in POST bodies (not URLs), no `console.log` of bodies; IP only used as a guard/binding key, the guard stores hashed name + counters only (tested: no IP in storage). |
| Storage abuse | Worst case per vault ≈ 26 MB; new vaults capped 10/hour/network. Acceptable; tighten `MAX_SLOT` (real 40-week sổ ≈ 37 KB) if Cloudflare storage bills ever matter. |

## 3. Deploy risks (merge to main auto-deploys `coop/worker/**`)
- Migration `v2` `new_sqlite_classes = ["Vault"]` appended after `v1` (Room untouched) — correct order; dry run OK.
- `[vars] VAULT_ORIGINS`: a deploy with `[vars]` replaces dashboard vars; the Room code reads no env vars (only `env.ROOM`), so nothing lost.
- If Cloudflare rejects the deploy (e.g. rate-limit binding), the old Worker keeps running: live rooms are not broken; the vault
  just stays undeployed (client shows "Chưa nối được mây…"). Remedy in the worker's PROGRESS (drop the two `[[ratelimits]]` blocks).
- The vault route is matched before the co-op routes only for `/api/vault*`; `GET /api/health` and rooms unchanged (tested; coop-e2e 59/59 against the live Worker with this client).
- Pre-existing: workflow uses unpinned `wrangler@4` (not this item).

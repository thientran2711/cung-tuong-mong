# Sổ mây (cloud save) — security notes for the reviewer (C44, review/cloud-save)

Scope: the new Worker endpoints `coop/worker/src/vault.js` (routed from `coop/worker/src/index.js`, same `ctm-coop` Worker as co-op
rooms), the client `dev/build/jcloud.js`, the seat-pid hook in `dev/build/jcoop.js` (`pidFor`). Tests: `coop/worker/test/vault.test.mjs`
(39 checks, no network) and `dev/test/cloud-save.js` (browser e2e against `coop/worker/test/mock-server.mjs`, the real handler on mock DOs).

## Design in one paragraph
No account, no e-mail. `POST /api/vault/new` makes a random 26-character Crockford base32 code (130 bits, `crypto.getRandomValues`,
no modulo bias) on the server. Whoever holds the code can read and write that vault: the code is the only key. Each vault is one
Durable Object named `sha256("ctm-vault:" + code)`, so the code itself is never stored server-side. The vault holds up to 10 versions;
each version = the three solo sổ as compressed `CTM1:/CTM2:` text (same format as Chép sổ) + the co-op room list + a short summary.

## Threats and how each is handled

| # | Threat | Handling |
|---|---|---|
| 1 | Guessing / enumerating codes | 130-bit codes (2^130 space). Unknown codes return 404 and create nothing (a DO without `meta` answers 404; no storage write). Per-IP rate limit binding `VAULT_RL` (120/min) on every call, `VAULT_NEW_RL` (5/min) on creation. |
| 2 | Code leaked from server storage / logs | Storage name is a SHA-256 of the code; the code travels only in POST bodies (never in URLs, so not in access logs, referrers or browser history). Responses carry `cache-control: no-store`. |
| 3 | Code leaked by the player | UI warns in plain words (code panel: "Ám hiệu này là chìa khóa sổ … Chớ đưa cho người khác."). "Thôi nối" unlinks the device; the `drop` endpoint wipes a vault (not yet exposed in UI — see Open points). Damage is limited to game saves (no personal data in a vault). |
| 4 | Weak code from a modified client | The server makes the code; a client cannot choose it. |
| 5 | Oversized / abusive uploads (storage cost, DoS) | Body capped at 2.6 MB while streaming (`readCapped`, aborts early; `content-length` checked first) → 413. Each sổ ≤ 900 000 chars; ≤ 3 rooms; 10 versions max per vault (oldest dropped, head never) → worst case ≈ 26 MB per vault. Per-vault limit 40 writes / 200 reads per 10 min → 429. Idle vaults (180 days without access) delete themselves (DO alarm). |
| 6 | Malformed / hostile JSON | `cleanBundle` rebuilds the object from a whitelist (unknown keys dropped), checks types and lengths, sổ text must match `^CTM[12]:[A-Za-z0-9+/=]+$`, room code `^[A-Z0-9]{4}$`, pid `^[A-Za-z0-9]{8,32}$`, numbers range-checked, strings stripped of control chars and `<>` and cut to length. Bad JSON → 400; non-JSON content type → 415; only POST (+OPTIONS) → 405 otherwise. |
| 7 | Stored XSS through summaries (names shown in another device's UI) | Server strips `<>`/control chars; client escapes every value (`esc`) before `kitRows`/`kitInput`; sổ text is base64 and only decoded through `readCode` (JSON.parse + version check), never inserted as HTML. |
| 8 | Malicious save content (crafted sổ) | Only someone with the code can write it, i.e. the player herself. The client loads it through the same `readCode`/`loadSlot`/`deser` path as Nạp sổ (version range checked); a sổ this build cannot read is never written over a local sổ (`decode` → undefined → skipped). |
| 9 | Cross-origin abuse from other web pages | CORS allow-list `VAULT_ORIGINS` (default `https://thientran2711.github.io`); requests without an allowed `Origin` get 403 (preflight too) and no `Access-Control-Allow-Origin`. Note: CORS stops browsers only; non-browser clients can fake `Origin` — they still need the code (row 1). JSON content type forces a preflight. The co-op room endpoints keep their old `*` CORS (unchanged). |
| 10 | Race / lost update between two devices | The DO is single-threaded and strongly consistent: `put` with `base ≠ head` → 409 (compare-and-set). KV was not used because it is eventually consistent and could silently lose a version. |
| 11 | Silent data loss on conflict | Client merges per sổ: only-local-changed → send, only-cloud-changed → take, both → kit panel, she picks. Before a cloud copy replaces a local one (pick "cloud" or restore) the local sổ are uploaded as a `keep` version first; the losing cloud copy stays in the 10 versions. A life still in memory whose sổ was replaced is blocked from writing it back (`STALE` guard on `save`); with Sổ mây on, a solo life is not saved while the title is up (she left the game; "Tiếp tục" reloads the sổ), so background saves cannot fake a local change. |
| 12 | Co-op state clobbering (host/guest, "newest personal state wins") | The cloud never carries or uploads a co-op life: co-op lives stay on the room DO. Only the room list line + the seat pid travel, so another device rejoins the SAME seat and the room server's own rules decide the state. Co-op lives never enter solo sổ (jslots guard, re-tested). |
| 13 | Seat pid exposure | The pid lets a device take a co-op seat. It is stored only inside the vault (code-protected) and in the device's localStorage; validated format; a device that joined a room itself keeps its own pid for it. |
| 14 | PII | None collected. No IP is stored (used only as the rate-limit key inside Cloudflare's binding). Device label is one of three generic words from viewport/touch (Điện thoại / Máy tính bảng / Máy tính), never the user-agent. Character names are fictional game data. |
| 15 | Local device compromise | The code sits in localStorage `ctm-cloud` (same trust as the saves themselves). |
| 16 | Rate-limit state loss | Per-vault counters live in DO memory (reset if the object is evicted) — a soft limit; the per-IP binding is the hard one. |
| 17 | Replay / downgrade of an old version | Only the code holder can write; a restore is an explicit choice (asks "Chắc chắn?") and backs up the current sổ first. |

## Open points for the reviewer / coordinator
- `[[ratelimits]]` needs wrangler ≥ 3.86 (workflow uses wrangler@4: OK). If the account rejects the binding, removing the two blocks
  keeps everything working (the code checks `env.VAULT_RL` exists) — only rows 1/5 lose the per-IP part.
- No "delete my cloud sổ" button yet (endpoint `drop` exists and is tested). Add on owner request.
- Codes are 26 characters (owner's design said "8-char like ám hiệu"); 8 characters (40 bits) is guessable at scale, so the foreman's
  ≥128-bit rule was applied. Copy / share buttons avoid typing; typed input ignores case, spaces and dashes, O→0, I/L→1.

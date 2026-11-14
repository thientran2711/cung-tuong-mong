Cloudflare account_id (owner, 14/11): 7fc1b88a522c6a91b40051536fa02cae
API token: NOT stored here — owner enters it via the secure credential form when co-op work starts (host api.cloudflare.com).
Backend plan: Workers + Durable Objects (one DO per co-op room = single authoritative world state, WebSocket).
API token: saved via secure credential form on the session environment (host api.cloudflare.com, proxy-injected); verified active 14/11 — can list Workers on the account.
GitHub Actions secrets set by owner (14/11): CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID on thientran2711/cung-tuong-mong — deploy the co-op Worker from a GitHub Action so any session/account can update it.
One app: title screen offers "Chơi một mình" / "Chơi cùng bạn" (Mời bạn / Nhập mã); single-player unchanged and offline.

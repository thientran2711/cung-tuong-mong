# cloud-save (C44 "Sổ mây") — worker, 16/11 — SẴN SÀNG KIỂM
1. Branch review/cloud-save @ 38bf315fb6e9654de5cd31a79410e9a923b08ddb (from origin/main eba64ead4).
2. Built: Vault Durable Object on the EXISTING ctm-coop Worker (coop/worker/src/vault.js: 130-bit server-made code, sha-256 DO name,
   CORS game origin only, 2.6 MB body cap, per-vault + per-IP limits, whitelist validation, 10 versions); client dev/build/jcloud.js
   (Thiết lập › Sổ mây: Giữ sổ trên mây / Nối sổ / Ám hiệu sổ / Các bản đã giữ / conflict pick, kit parts only); co-op room list +
   seat pid travel (jcoop pidFor), co-op lives never uploaded. Security notes: dev/review/cloud-save-SECURITY.md.
3. Tests: coop/worker npm test (merge ok, vault 39 ok); dev/test/cloud-save.js ALL 45 OK x3 (755x1000@2, 1180x820@2, 1366x1024@2, 844x390;
   round trip, conflict both ways, restore, 10-cap, old v5 sổ, co-op); dev/test/save-slots.js ALL OK.
4. DEPLOY PENDING (not deployed): merging to main AUTO-DEPLOYS via .github/workflows/coop-worker.yml (migration v2 adds Vault).
   Steps + smoke test in dev/PROGRESS_review-cloud-save.md.
5. Next: security review + kit/VANPHONG review (opus for the Worker part), then merge. Open: code is 26 chars (not the 8 in the owner
   design) for the ≥128-bit rule; no "delete cloud sổ" button yet (endpoint exists).

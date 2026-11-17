# review learn-scene-fix r1 — PASS 41836865
PRIORITY #1 CHECK: OD 1572/1574 (07:25Z, 07:28Z, 07:40Z, 07:45Z) read verbatim | brief s31-learn-scene.md + worker report read | origin/main grep: no other scene-thanhtai code; branch already on latest origin/main 65dcf52f (merge-base = main, no re-merge needed).

Checked
- 10 subjects (6 ARTS + 4 VIR) each show img/scene-thanhtai-<k>.webp, naturalWidth 768, no 4xx (own run of dev/test/learn-scene.js, Fold + iPad Air): ALL PASS.
- Key missing from CDN index -> kitSkillArt fallback at once, missing file never requested; index null -> fallback, no request.
- Order: made-item dialog -> level-up scene -> buoi transition -> next VIEC; nothing opens under a running scene; no-scene path immediate. Steps 1-6 pass on both devices.
- kmPush family: pre on learn, reward, tablet, promo; jne already preloads; edict / gloom / bloom / ink / cfPlay are CSS-only (no picture) - ok.
- LOOKED at Fold learn-cong, iPad learn-cam (own pictures, kit frame, no black), Fold order-buoi (buoi picture shows after scene).
Gates: coregates.sh PASS (G1 one-core, G2 rules-one-source, G3 kit-conform, hooks) ; site rebuild = same content (only build-line sha differs); media-check 0; img-allowlist OK; one-core-guard PASS (fails 0); oldsave-r1 16/16. Not run: quickcheck (absent).
Faults found: none. Fixes by reviewer: none.

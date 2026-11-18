# START_ART — verbatim owner rules

Art rules live ONLY in dev/art/FIGURE_GATE.md (owner 18/11 ~22:45Z).

**⛔ APPROVED FORMS FIRST (owner 18/11 ~22:20Z): before ANY gen read dev/art/FIGURE_GATE.md section A0 (approved forms) — copy the approved form unchanged; only the held item and the pose may change (calmer with rank and age).**

## ⛔ GATE ZERO — PRIORITY RULE #1 FIRST (owner OD:L5 + 17/11 02:55Z): before writing any code, git grep origin/main + origin/review/* and grep OD/OWNER_LEDGER for what your task touches; reuse what exists; your report starts with "PRIORITY #1 CHECK: …" (hits). Reviewers FAIL a brief or report without it. Full text: top of START_CORE.md.






## OTHER ART/PROCESS LINES — not figure rules (events, effects, CDN, perf, pets…); R1c/MAIN to sort. Do NOT add new art rules here.

### OD:L335 15/11 ~05:45Z (owner, annoyed that workers don't follow the kit)
[OD:L364] - (07:45Z) Act pictures: inventory of 713 meanings → draw ~613 more pictures (≈29,500 credits, under the draw-without-asking order). Each Tuần lục line = one act = one picture (follow-up reaction sentences merged into the first line). The Emperor doesn't wear a Qing-style feathered hat; costume in the original style (crossed-collar robe), no cheongsam-style collar.
### OD:L797 15/11 (session 8) — Action odds explanation is hard to understand (owner screenshot)
[OD:L800] - (session 8, later) Owner: "Khoan, xin lại" → credential form re-sent; owner saved the Cloudflare token for api.cloudflare.com. R2 listing verified OK. CDN uploads UNBLOCKED (scripts that need a variable: CLOUDFLARE_API_TOKEN=proxy-injected; the proxy injects the real key).
### OD:L1146 16/11 (session 8) — Owner corrections (angry: "nói một đằng làm một nẻo", "phá mọi thứ")
[OD:L1230] - (16/11 07:30Z, s10) OWNER RULE (art, refines 06:55Z): SAMPLE pictures are made by the MAIN chat (so she sees them at once); after she approves a sample, MASS PRODUCTION goes to Foreman C. ALL art is PAUSED tonight (she sleeps, nobody can review) — resume in her morning. Also: rebalance load — Foreman C's queued non-art D-list (D3, D9, D11–D14, D19, D25, D44) moves to Foreman B (only 2 sessions running) so C is free for art production.
### OD:L7 2026-11-14
[OD:L213] - (02:00Z, owner said it in the old session, relayed by it) Owner: do all 15 ideas in dev/research/TRUNGSINH_COMPARE.md "Đào sâu" → Top 15 (release animals to disfigure, two-way; themed outfit-matching contest; minigames when the Emperor summons her privately: play to the rhythm, chess, lake outing that may meet an assassin; investiture ceremony with guests congratulating + handing out lì xì; show stat thresholds before an exam; one shared danger bar combining jealousy/grudge; pets; first impression when meeting someone who hates her; bullying for silver with 2 buttons; dating consequences by status; secret pact to bear a child when the Emperor is infertile (ties to routes); post-birth rewards; fire burning belongings (ties to lost-items); wishes/lantern release; handmade items to give). Rules: never copy that game's text/art/names; shared kit; cards with full Cần/Tốn/Được/Mất + odds; everything has a real cause + omen; NPCs same rules; art only when needed and ask owner first; harm stays abstract.
[OD:L203] - (01:30Z) Owner: from now on ALL images go to Cloudflare, not stored in the GitHub repo → worker review/cdn-images (R2 + Worker or Pages; IMG_BASE; cdn_sync for new art; git rm img/ without rewriting history).
### OD:L658 15/11 ~20:55Z — Painted, never code-drawn (owner)
[OD:L659] - All day-closing / night / bedding / card-flip pictures and scenes must be PAINTED with Magnific gpt-2-6 (folder ba4aecfe…), never drawn with code (CSS/SVG/canvas shapes). Code only animates painted art (move, glow, fade).
### OD:L661 15/11 ~21:00Z — Effects painted with Magnific too (owner)
[OD:L663] - Coordinator method: (1) particle effects (petals, leaves, snow, embers, sparkles): paint single sprites with gpt-2-6 on a plain background, cut with images_remove_background → transparent PNG/WebP, check edges on dark + light, animate with the existing Pixi/jfx particle layer; (2) light effects (candle flame flicker, glow, moonlight, lantern): Magnific short video on pure BLACK background, shown with mix-blend-mode: screen (black disappears, no alpha needed, works on iPhone Safari) — exported as a small looping MP4/WebM or sprite sheet; (3) only when a solid effect needs real transparency: video_remove_background → frames → sprite sheet WebP (Safari-safe). Keep files small (download-size rule).
### OD:L710 15/11 ~22:35Z — Calendar ideas all; art level-up scene; performance budget (owner)
[OD:L713] - Owner worry: many Magnific animations → heavy game and co-op lag. RULES (performance budget):
[OD:L714]   1. Load art ON DEMAND (only when the scene plays; never preload all); service-worker cache after first use. Fix the 129 MB first-load (download-size task) first.
[OD:L715]   2. WebP at the display size (big centre art ≤ ~250 KB, sprites ≤ ~40 KB); effect videos ≤ ~400 KB short loops, or sprite sheets.
[OD:L716]   3. One shared particle layer (Pixi/jfx) reused by all effects; cap particle counts; pause effects when the tab is hidden.
[OD:L717]   4. Settings: "Hiệu ứng: Đầy đủ / Gọn" (Gọn = still pictures, no particles/video) + auto-Gọn on weak devices.
[OD:L718]   5. Co-op: online messages carry only small game state, never graphics, so animations don't add network lag; each player's effects run locally. Animations must not block or delay sync (they play after the state is applied; tap to skip).
[OD:L719]   6. A perf test (frame time + memory + bytes per scene) in CI for 755x1000 and a mid phone profile.
### OD:L7 2026-11-14
[OD:L141] - (23:10Z) Owner: too many images/sounds — download images + audio to the device on first entry with a loading screen + loading bar; afterwards play from device; only what truly needs online stays online (co-op). Worker on review/loading (content-hashed long-lived asset cache, no full re-download per build).
[OD:L267] - (07:30Z) Owner asked why worker disks fill up: the repo has ~5 GB of image history + each worker checks out 1.4 GB (img/ in the tree) × ~13 workers. When cdn-images reaches main, img/ leaves the tree → ~0.2 GB per worker. Slimming history (new repo/filter) needs owner consent.
[OD:L278] - 08:10Z cdn_sync 216 shrunk maid huadian images (batch 3).
### OD:L335 15/11 ~05:45Z (owner, annoyed that workers don't follow the kit)
[OD:L385] - (09:45Z) Trung y: approved 4 rank groups (white / ivory / moonlight white with silver trim / pale yellow Hoàng hậu with clear trim), ~32,000 credits; drop the 4 old looks; the outfit slot stays truly empty until she wears another dress, Nội vụ phủ reissues after a few weeks by chest; undressing in her own palace is not penalised.
[OD:L399] - (10:45Z) Each pet stage gets its own picture (4 pictures/pet, Linh thú also its own, more majestic) — 88 pictures.
[OD:L489] - LIVE CDN (16:40Z) pushed every image still on the machine before closing the session: 22 Tổng lược line pictures (act-pics2), 384 figures + 384 trung y portraits c01–c12 + FIGURES-ty.json, fig-eunuch-ndp-tray.
### OD:L547 15/11 ~18:45Z — Placeholder pictures for missing art (owner)
[OD:L547] ## 15/11 ~18:45Z — Placeholder pictures for missing art (owner)
### OD:L661 15/11 ~21:00Z — Effects painted with Magnific too (owner)
[OD:L661] ## 15/11 ~21:00Z — Effects painted with Magnific too (owner)
[OD:L662] - Owner wants effects (falling petals, candle flicker, glow, embers…) made with Magnific too, then put into the game; worried they may be too transparent / hard to separate from the background.
### OD:L768 15/11 ~23:30Z — Makeup "final look" reveal scene (owner; coordinator design)
[OD:L775] - Painted art + Magnific effects rules and perf budget apply; co-op: friend sees only a small notice.
### OD:L1146 16/11 (session 8) — Owner corrections (angry: "nói một đằng làm một nẻo", "phá mọi thứ")
[OD:L1156] - (16/11) Owner asked why maid and ma ma figures have no HD: their source sheets are ~950 px, so they are sharp at normal stage size and soft only when drawn >900 px. Proposal pending.

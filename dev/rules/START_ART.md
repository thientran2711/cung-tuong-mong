# START_ART — verbatim owner rules

Holds: any art work, incl. the main chat making samples (tools, Magnific, CDN, sizes, samples vs mass production, style anchor).

Read in full at start by: ART. Reading sets: MAIN = START_CORE + START_FOREMAN + START_MAIN; FOREMAN = START_CORE + START_FOREMAN; WORKER = START_CORE + START_WORKER; REVIEWER = START_CORE + START_WORKER + START_REVIEWER; ART = START_CORE + START_WORKER + START_ART. Then read ONLY the dev/rules/topic/*.md files your task touches (list in dev/PRIORITY_RULES.md).

Format: [source:Lnn] = line in the source file (OD = dev/OWNER_DECISIONS.md on the docs branch); the text after the tag is the owner's line, copied unchanged by script. Every rule line lives in exactly ONE file under dev/rules/ (find a tag: grep -rn '\[OD:L123\]' dev/rules). CANON OVERWRITE (owner OD:L1232): when a rule changes, delete the old line and write the new one IN ITS PLACE in the same file; never keep the old one with a 'changed to' note. Headings '### OD:Lnn' are the OD section headings the lines sit under. Generated 11/16/2026 from dev/PRIORITY_RULES.md + dev/art/OWNER_ART_RULES.md (owner rule OD:L1241, low context).

### OD:L7 2026-11-14
[OD:L48] - Owner (night of 11/14): art may proceed without waiting for approval; workers self-check and redo bad images; previews saved for later viewing.
[OD:L122] - (01:25Z) Owner: save credits until the game runs. Do now only illness, poisoning, slap/punishment. Postpone pregnancy art, nun, glow, grey strands, smallpox (and other non-essential art).
### OD:L335 15/11 ~05:45Z (owner, annoyed that workers don't follow the kit)
[OD:L364] - (07:45Z) Act pictures: inventory of 713 meanings → draw ~613 more pictures (≈29,500 credits, under the draw-without-asking order). Each Tuần lục line = one act = one picture (follow-up reaction sentences merged into the first line). The Emperor doesn't wear a Qing-style feathered hat; costume in the original style (crossed-collar robe), no cheongsam-style collar.
### OD:L797 15/11 (session 8) — Action odds explanation is hard to understand (owner screenshot)
[OD:L800] - (session 8, later) Owner: "Khoan, xin lại" → credential form re-sent; owner saved the Cloudflare token for api.cloudflare.com. R2 listing verified OK. CDN uploads UNBLOCKED (scripts that need a variable: CLOUDFLARE_API_TOKEN=proxy-injected; the proxy injects the real key).
### OD:L1146 16/11 (session 8) — Owner corrections (angry: "nói một đằng làm một nẻo", "phá mọi thứ")
[OD:L1230] - (16/11 07:30Z, s10) OWNER RULE (art, refines 06:55Z): SAMPLE pictures are made by the MAIN chat (so she sees them at once); after she approves a sample, MASS PRODUCTION goes to Foreman C. ALL art is PAUSED tonight (she sleeps, nobody can review) — resume in her morning. Also: rebalance load — Foreman C's queued non-art D-list (D3, D9, D11–D14, D19, D25, D44) moves to Foreman B (only 2 sessions running) so C is free for art production.
### OD:L7 2026-11-14
[OD:L213] - (02:00Z, owner said it in the old session, relayed by it) Owner: do all 15 ideas in dev/research/TRUNGSINH_COMPARE.md "Đào sâu" → Top 15 (release animals to disfigure, two-way; themed outfit-matching contest; minigames when the Emperor summons her privately: play to the rhythm, chess, lake outing that may meet an assassin; investiture ceremony with guests congratulating + handing out lì xì; show stat thresholds before an exam; one shared danger bar combining jealousy/grudge; pets; first impression when meeting someone who hates her; bullying for silver with 2 buttons; dating consequences by status; secret pact to bear a child when the Emperor is infertile (ties to routes); post-birth rewards; fire burning belongings (ties to lost-items); wishes/lantern release; handmade items to give). Rules: never copy that game's text/art/names; shared kit; cards with full Cần/Tốn/Được/Mất + odds; everything has a real cause + omen; NPCs same rules; art only when needed and ask owner first; harm stays abstract.
[OD:L29] - All art: Magnific gpt-2-6 only. Event art: just draw, no previews needed. Story (Mệnh truyện) art: ~468 images pending owner's OK ("duyệt vẽ tiếp").
[OD:L93] - (19:50Z) Owner: redo t8 huadian; pilot first — she approves before it's applied to everyone. (General: any art change = pilot → owner approval → roll out.)
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
### OD:L746 15/11 ~23:05Z — Owner batch: makeup 8, CDNH works, old player looks as new faces, lover art, gifts from works, dress contest themes + luxury, weather painted (owner)
[OD:L751] - Promoted old-love men: DRAW the 56. General rule: anything that can be drawn → draw it; Magnific credits are plentiful.
### OD:L1146 16/11 (session 8) — Owner corrections (angry: "nói một đằng làm một nẻo", "phá mọi thứ")
[OD:L1160] - (16/11) Owner (tired, angry that it wasn't done from the start): EVERY figure must be sharp when enlarged — maids, ma ma, eunuchs, men and everyone else; nobody left out; spend the credits. → review/fig-hd-upscale (Magnific upscale for figures with no large source) + review/face-sharp-hd2 (from source sheets).
### OD:L7 2026-11-14
[OD:L98] - (20:45Z) Owner: art previews must be HIGH resolution (native-res crops, one consort per file), not blurry downscaled sheets.
[OD:L141] - (23:10Z) Owner: too many images/sounds — download images + audio to the device on first entry with a loading screen + loading bar; afterwards play from device; only what truly needs online stays online (co-op). Worker on review/loading (content-hashed long-lived asset cache, no full re-download per build).
[OD:L267] - (07:30Z) Owner asked why worker disks fill up: the repo has ~5 GB of image history + each worker checks out 1.4 GB (img/ in the tree) × ~13 workers. When cdn-images reaches main, img/ leaves the tree → ~0.2 GB per worker. Slimming history (new repo/filter) needs owner consent.
[OD:L278] - 08:10Z cdn_sync 216 shrunk maid huadian images (batch 3).
### OD:L335 15/11 ~05:45Z (owner, annoyed that workers don't follow the kit)
[OD:L385] - (09:45Z) Trung y: approved 4 rank groups (white / ivory / moonlight white with silver trim / pale yellow Hoàng hậu with clear trim), ~32,000 credits; drop the 4 old looks; the outfit slot stays truly empty until she wears another dress, Nội vụ phủ reissues after a few weeks by chest; undressing in her own palace is not penalised.
[OD:L399] - (10:45Z) Each pet stage gets its own picture (4 pictures/pet, Linh thú also its own, more majestic) — 88 pictures.
[OD:L489] - LIVE CDN (16:40Z) pushed every image still on the machine before closing the session: 22 Tổng lược line pictures (act-pics2), 384 figures + 384 trung y portraits c01–c12 + FIGURES-ty.json, fig-eunuch-ndp-tray.
[OD:L490] - (16:50Z) Huadian on the CDN (e.g. c05 t5 moon, t8 bird) the owner still sees as BIG → shrink one more size: sample a few faces for owner approval first, then batch. (This is new work, not redoing old work.)
### OD:L547 15/11 ~18:45Z — Placeholder pictures for missing art (owner)
[OD:L547] ## 15/11 ~18:45Z — Placeholder pictures for missing art (owner)
### OD:L661 15/11 ~21:00Z — Effects painted with Magnific too (owner)
[OD:L661] ## 15/11 ~21:00Z — Effects painted with Magnific too (owner)
[OD:L662] - Owner wants effects (falling petals, candle flicker, glow, embers…) made with Magnific too, then put into the game; worried they may be too transparent / hard to separate from the background.
### OD:L768 15/11 ~23:30Z — Makeup "final look" reveal scene (owner; coordinator design)
[OD:L775] - Painted art + Magnific effects rules and perf budget apply; co-op: friend sees only a small notice.
### OD:L1013 15/11 (session 8) — One character on phone AND iPad without losing the save, solo and co-op (owner)
[OD:L1018] - (session 8) Owner (verbatim): "Ok, làm kiểu vậy gấp đi." → face-sharp approach APPROVED + URGENT: hi-res sources for every large face/half-body display, never show a figure above its native size; her screenshot screen + stage first.
### OD:L1146 16/11 (session 8) — Owner corrections (angry: "nói một đằng làm một nẻo", "phá mọi thứ")
[OD:L1156] - (16/11) Owner asked why maid and ma ma figures have no HD: their source sheets are ~950 px, so they are sharp at normal stage size and soft only when drawn >900 px. Proposal pending.
### ART/STYLE_ANCHOR.md
[ART/STYLE_ANCHOR.md:L2] STYLE ANCHOR (OWNER 11/14, replaces the Emperor anchor): the EARLY CONSORT PORTRAITS she loved — semi-realistic, painterly, almost 3D-real rendering with soft light and fine detail (face-consort-01, 05, 12, 18 (OWNER CONFIRMED these four: best refs), plus 20, 24, 26, 32, 34, 37; Magnific links in img/STYLE_REFS.txt; local PNGs in scratchpad/faces-raw/face-consort-NN.png). Pass 2-3 of them as STYLE references on every generation (plus the identity's own master for face consistency once it exists). Later full-body figures drifted toward flatter anime/watercolor: do NOT imitate them.
[ART/STYLE_ANCHOR.md:L3] Prompt prefix (start every prompt with it, unchanged):
[ART/STYLE_ANCHOR.md:L4] "Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering of the reference portraits; full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porcelain skin; serene gentle neutral expression, soft eyes, closed lips or faint smile; elegant, slim, clearly adult; beautiful/handsome romantic-lead looks for everyone; face clearly visible, 3/4 or frontal view."
[ART/STYLE_ANCHOR.md:L5] Never: tanned skin, sly/scheming look, glare, smirk, open-mouth laugh, pout, hand at mouth, sad/tearful face, caricature, plain/unattractive faces, childlike faces for adults.
[ART/STYLE_ANCHOR.md:L6] Output: 2k high, lineup of the same person across the needed age bands in one image; background removed; figure height ~900 px transparent webp; por 256x256.
[ART/STYLE_ANCHOR.md:L8] OWNER RULE (11/14): EVERYONE in the palace is beautiful/handsome at every age: consorts, the player, maids, mamas, eunuchs, officials, physicians, Thái hậu, men, children. No plain, homely or unattractive face anywhere; older people beautiful and dignified.
[ART/STYLE_ANCHOR.md:L10] OWNER 11/14: this IS the style she loves (confirmed on consort-01, 05, 12, 18). REJECTED looks: consort-02 (sharp upturned slanted narrow eyes "mắt xếch", cold) and consort-08 (looks like crying). Never draw slanted/upturned narrow eyes or teary/sad eyes; eyes soft, round-almond, warm.
[ART/STYLE_ANCHOR.md:L12] OWNER 11/14: nobody looks poor. Maids wear embroidered fine silk with hairpins (trâm) and small jewellery; eunuchs fine embroidered robes; everyone dressed richly for an imperial court (rank still readable by richness).
[ART/STYLE_ANCHOR.md:L14] OWNER 11/14: men never wear pink or purple/lavender (any role, any age). Men colours: deep blue, navy, teal, green, black, white/ivory, grey, brown, crimson/red, gold/yellow (Emperor), earth tones.

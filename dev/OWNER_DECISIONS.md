# OWNER DECISIONS LOG (Cung Tường Mộng) — newest last. Main session keeps this up to date.
Older binding rules: see dev/HANDOVER.md (all sections). This log adds every decision from 11/14 (main session 2) on.


> **PRIORITY RULE #1 (LUẬT ƯU TIÊN SỐ 1) (owner, 15/11 ~05:25Z):** BEFORE ASSIGNING ANY TASK to a worker, the coordinator MUST check whether it already exists: (1) grep OWNER_DECISIONS + HANDOVER + PROGRESS_*.md; (2) `git grep` on origin/main AND every origin/review/* branch (feature names, keywords); (3) check the list of running workers. If it exists → reuse it / ship that branch, do NOT build anew, do NOT tell the owner "not there yet" without checking. Workers must also do step (2) before writing new code. (Lesson: handmade items j83 and the 4 buổi already existed on branches while the coordinator said "not there yet".)

## 2026-11-14
- Faces: pool = 84 women (32 consorts + 52 maids). Part C = 52 maids in consort tiers t1–t8 + cold. NPC consorts only draw a maid face once that face has consort-tier art (F88_NEED_C).
- Huadian: consorts only (incl. maids promoted to consort). Never on maids (m0–m4), mamas, servants, cold palace. 84 unique styles (HUADIAN.md c01–c32, HUADIAN_C.md m01–m52). Size t1 = c03 t1 red flower; grows ~5%/tier. 8 distinct tiers. Painted on skin (no sticker look). Raised/jewelled styles must stay small; flat gold-leaf styles may be a bit larger. Approved: t1–t6, t8 phoenix (to be ~15% smaller), t7 being redone in flat gold-leaf + red enamel style.
- No facial moles on anyone. Removal combined with adding huadian in one edit pass.
- Poses: calm standing, may turn at an angle, NO flying sleeves/sashes/hems; HANDS varied with props, different per age.
- Veils: consorts t1–t8 = bead strands (no fabric); t1/t2 swapped (silver t1, pink-silk-cord t2); t7 approved. Maids m0–m1 + cold palace = thin ivory silk veil; maids m2–m4 + mamas = thin pink silk veil. Face must stay recognisable.
- Disfigurement (hủy dung): claw marks ON the face, 1/2/3 strokes by severity (approved); visible when the player knows.
- Contests: no multiple-choice quizzes; every subject its own real minigame (15 done).
- Results: podium screen first (full-body figures; NO halo rays; soft stage light per rank gold/silver/bronze; confetti at the player's own place), then the score table. Player figure may appear on the podium.
- Event choices (weekly events, story chapters, side events, dilemmas): show only costs (Sức, khắc, bạc); results card shows numbers afterwards. Normal act cards keep full price/gain/loss/odds.
- Wardrobe: 2 slots (Trâm cài, Y phục) beside portraits for everyone; grades Thường/Tinh phẩm/Trân phẩm/Tuyệt phẩm/Ngự tứ; Đúng/Vượt phẩm/Quá giản dị HIDDEN until someone remarks; "Tự chọn đồ" fast but risky; "Chải chuốt" minigame decides; sell 40–60% (risk), pawn/redeem; Ngự tứ unsellable; frame-ups with planted items.
- Rewards come from the real item pool; some items only obtainable as imperial gifts. Reward reveal = tray/chest centre screen, tap to open, items pop out by rarity.
- Origin odds (j69) approved: nc 6, thd 9, cn 13, dtq 17, muoi 17, ch 13, td 9, tt 8, cnv 8 (%), Phúc duyên bonus tt/td +10, cnv +20; cnv must be winnable (~10–15% HH) — decided by balance worker.
- Balance numbers: decided by us, don't ask. Targets: early death ~40–45%, HH ~32%, childbirth death 8–12%/birth.
- Portrait cards: big 3:4 frame (owner reference ~25% screen width on Fold); inner image SAME size for every rank; top ornaments (phoenix/dragon) fully visible in reserved headroom; main info visible without scrolling on Fold.
- Stage: everyone same scale on one floor line; scene crop shows most floor (KIT_FLOOR).
- No round avatars anywhere — rectangles only.
- iPad: "Trong cung" block (Hoàng thượng/Thái hậu/Hoàng hậu status) under the Tư chất block on the stage's left.
- Identity screen: origin art goes into a framed picture (left/top), info right/bottom; a new common reincarnation backdrop. Roulette animation (light runs over origin tiles, slows, stops on the rolled origin, zooms into the identity card) at new game AND rebirth.
- Game feel: animations for key moments (card flip for night selection, weekly fortune sticks, stamp Thành/Bại, promotion scroll, demotion gloom, day/week transition, pregnancy/death, reward chest…). All art for them by gpt-2-6.
- Weather: already implemented (affects who appears where, emperor mood, Sức, contests; particle effects in j11). Only make it clearly visible + weather chip. Don't re-propose.
- Scenes: every location background in 4 seasons.
- All art: Magnific gpt-2-6 only. Event art: just draw, no previews needed. Story (Mệnh truyện) art: ~468 images pending owner's OK ("duyệt vẽ tiếp").
- Scenes: also vary by time of day (each buổi: morning/afternoon/evening(+noon if exists)) × 4 seasons.
- Time: 4 buổi per week (Sáng, Trưa, Chiều, Tối) × 4 khắc = 16 khắc (owner agreed to recommendation). Sức remains the main limit; rebalance. Light shifts gently by khắc within a buổi.
- Who-is-where: habits (hidden, per person, drift over time) + weekly intentions (seek Emperor, allies, avoid foes, scheme, seek player) + 15–25% surprises; Emperor too. Player learns habits via spies/servants/observation; NPCs learn the player's habits and may lie in wait. Target predictability 35–55%. (review/schedules, j95)
- Catching secrets: trysts/secret meetings happen at hidden spots (mostly night); map shows anonymous paired silhouettes; player may stumble on them (see faces / one face / they scatter leaving a token / player gets spotted). Choices: denounce (needs proof), keep as leverage, silence for favour, ignore. Two-way: NPCs can catch the player. (j95)
- ONE location ledger (S.roster): every living person in the palace has exactly one place + activity at every khắc; map, stage, spies, encounters, reports all read from it (never contradictory). Dev audit tool dev/tools/roster.js <save> [week buổi khắc] prints the full roster; owner can export a save (Chép sổ) and ask the main session who was where. (j95)
- The record holds place AND action (+target +motive from real state). Every NPC decision must be motivated by current stats/relations/traits (e.g. favour 100 never secretly harms the player) unless a recorded reason exists (coerced, ordered, betrayal for big gain, misunderstanding). Shared motive gate + audit (0 contradictions).
- Before release, the record (j95) must pass a bot audit (30+ lives × 2 years, smart+random bots, all origins; invariants: headcount, one place each, map/stage/spies match, motive gate 0 contradictions, deaths removed, save/load stable) + an independent re-check. Report dev/test/ROSTER_AUDIT.md must be clean.
- Every minigame (contests, lessons, self-practice, works, Chải chuốt, any other) has its own painted background + painted sprites (gpt-2-6); lessons use study/practice rooms, contests use festival courts.
- New cross-origin love arc 'Thanh mai trúc mã' (j96): sweetheart outside, forced into the palace; he is a real NPC man with a role (Hàn lâm, cấm quân, Trạng nguyên, vương gia, thái y, envoy for nc…); ~7 chapters, endings incl. ally, exposed affair, he marries another, he dies, rare escape.
- Every story arc has at least one RARE ending: hidden conditions + small roll (5–15%), shown as a glowing 'Cơ duyên hiếm' choice; Sổ luân hồi records rare endings found (x/y), no carry-over; rare rewards. Love arc spans 3 chapters. (j97, j96)
- Stage figures must be BIG (fill stage height, feet on floor, heads near top). One shared frame function for every portrait size — rank ornaments (phoenix, dragon…) visible everywhere (fix once = fixed everywhere). Every rank frame has its own top ornament filling the headroom (smaller for low ranks); portraits cropped tighter. Person card: portrait + relation/stat bars stay visible (sticky) while scrolling actions; bars animate on change. 'Trong cung' block removed from stage → small chips in the top bar (Thái hậu, Hoàng hậu next to Hoàng thượng), full version in Chỉ số sheet.
- Housing: Hoàng hậu lives alone (Càn Ninh); Hoàng quý phi also alone; Tần, Phi, Quý phi are palace heads (chủ vị) with Quý nhân/Thường tại/Đáp ứng in side halls (≤~3). Player gets her own palace on reaching Tần.
- Approved: draw a unique top ornament for every rank/role frame (all 8 consort ranks, maid ranks, mamas, eunuchs, Emperor dragon, Thái hậu, princes/princesses, officials, physicians, men, cold palace, stranger); higher = grander.
- Origin spread: every origin reaches HH ~20–40% (smart bot), overall ~32%; cnv (servant start) ~20–25% (long road, not hopeless) with real milestone achievements recorded in Sổ luân hồi; early suicide must never pay off.
- Anti reroll-by-death: a life counts as 'trọn kiếp' after 1 game year OR reaching Quý nhân (cnv: Chưởng sự/sủng hạnh). Dying/abandoning before = 'kiếp dở dang': no Phúc duyên from that life, −30 PD, next life cannot reroll origin; warning before voluntary abandonment.
- Wardrobe items REDO: outfit icons must be drawn from the game's own character outfits per tier (owner rejected the first set). Per tier 20 items = 10 hairpins + 10 outfits, for 8 consort ranks + 5 maid ranks (260 total). Collection count per life → Sổ luân hồi titles at milestones (no carry-over of items). Sample tier (Tần) first for approval.
- Collection milestones (20/50/100/200 items in a life) also grant Phúc duyên (~+5/+10/+20/+35, once per life; lost if kiếp dở dang).
- Every item (incl. crafted works from lessons, 4 quality tiers drawn differently: crude → exquisite) gets painted art (gpt-2-6). Items shown in a simple shared kit frame (kitItem) with background colour by grade (Thường/Tinh phẩm/Trân phẩm/Tuyệt phẩm/Ngự tứ).
- Owner (night of 11/14): art may proceed without waiting for approval; workers self-check and redo bad images; previews saved for later viewing.
- (16:00Z) Owner complaint, Fold 755x1000 (shots dev/owner-shots/1114-fold-*.jpg): game unplayable, NOT one shared kit. (1) Top bar too tall (~1/3 screen): date wraps over itself, Hoàng thượng chip alone on a row, Thái hậu/Hoàng hậu chips on another row with empty space. (2) Stage height changes per panel: with Hậu cung/Phi tần open the scene shrinks to a strip with tiny figures; must stay one size, figures BIG. (3) Phi tần person card (sticky) overlaps the text under it (duplicated, clipped). (4) Giao tình "Xem quan hệ của" chip rows cut off. Kit-first priority #1: fix as a GROUP for every screen/panel, kit owner first, review gate, test on Fold + iPad before showing her.
- (16:05Z) Owner: iPad landscape title screen has a blank right half (art only fills the left). Every full-screen backdrop must be made for BOTH portrait and landscape from the start (not portrait-only): title, reincarnation/identity, origin, Sổ luân hồi, minigame/contest/lesson backgrounds, podium, reward/animation screens, scenes. Landscape = its own painted wide composition (gpt-2-6), never a stretched/faded copy or empty panel. Shot: dev/owner-shots/1114-ipad-title-empty.jpg.
- (16:08Z) Owner: workers waiting on her decision (maid-art A/B → review/*) — go ahead, don't ask. Standing rule: don't ask her for go-aheads; decide and proceed.
- (16:10Z) Owner: circled spots are only examples; never fix piecemeal. Every fix = the whole group (all screens/modes/elements of that kind) via the kit component; reviewer FAILs spot-only fixes.
- (16:15Z) Owner shots 1114-fold-giaotinh-scroll.jpg / 1114-fold-tuchat.jpg: list rows scroll up behind the tab bar and show through above it; 'Tư chất' toggle in the top bar dumps its content into the bottom panel (replacing the tab content, clipped, chips vanish) — far from its button and cut off. Group fix: every collapsible/expand toggle opens its content next to its button or as a full kit sheet, never inside another panel; sticky tab bars fully opaque, nothing shows through.
- (16:20Z) Owner: put info ON the room scene (stage) instead of stacking bars/pushing Tư chất into the bottom panel; drop or relocate what isn't needed. Decided design: slim one-row top bar (menu, mini-portrait, name, rank, Bạc/Sức/Sủng/Danh); stage overlay plaques at edges (place + date/khắc/weather top-left; Hoàng thượng/Thái hậu/Hoàng hậu chips top-right; Tư chất left; Nhân tâm + Quẻ tuần right/bottom); figures stay big in the centre; Tư chất toggle removed; duplicates dropped; tap plaque → full sheet. Same on all screens/modes and iPad.
- (16:25Z) Owner: Hoàng hậu shown twice (court chip 'chưa rõ' = mood; Nhân tâm 'Hoàng hậu với ngươi -5' = attitude). Rule: one fact, one place. Court chips (Hoàng thượng/Thái hậu/Hoàng hậu) show portrait + title + attitude to player + mood only if known; those rows leave Nhân tâm. Audit all screens for duplicates.
- (16:30Z) Owner very upset: person card (Phi tần) no longer the layout she approved — sticky header (from kit-2b) drawn over the card's own copy: info twice, overlapping, actions clipped, card at bottom of screen. URGENT hotfix: one sticky header only, no duplicate, opaque, actions scroll beneath, all person-card types. Lesson: main session must play-test inside the game on Fold before merging any kit change.
- (17:10Z) Owner (phone small): remove the 'Bảng phẩm vị' button row in Phi tần (rank table via rank chip/☰ instead); move the room scene up — no empty band under the top bar. No lone full-row buttons anywhere.
- (17:20Z) Owner: room scene over-zoomed (only a slice of the room), figures tiny and standing in wrong spots (by/on the bed). Rule: whole room composition visible with floor, figures big with feet on the painted floor in open floor slots, never on furniture; per-scene floor anchors; check every scene×season×buổi on all devices. Top bar empty band still wasteful.
- (17:45Z) Owner: person card layout (rejects full-width sticky header): LEFT column = big portrait frame (name, rank, stat tiles under it); RIGHT top = info (Ghen, Người với nàng, Oán, Nàng với ngươi, Sủng); directly under it = the action group tabs (Gặp mặt / Giao thiệp / Dùng chứng cứ / Hại nhỏ…) then the act cards. Shots dev/owner-shots/1114-ipad-card-layout-*.webp. Applies to all person cards; on narrow portrait keep the same order (portrait left/top, info, tabs, acts).
- (17:40Z) Owner refinement, person card on iPad: left = big portrait + name + rank, and ALL info under it (relation bars Ghen/Người với nàng/Oán/Nàng với ngươi/Sủng, stat tiles, tuổi, tính nết); right = action tabs + acts only. Fold portrait: portrait left, relation info at top right, then tabs + acts.
- (18:00Z) Owner: the consort picker strip must ALWAYS stay visible on Fold (never scrolled away to make room); and she rejects partial deliveries — ship the slim top bar, stage overlays, scene fix, picker and person card together as one build. Lesson: never show her a screenshot that still has a known complaint unaddressed.
- (18:05Z) Owner: iPad person-card layout APPROVED (left portrait + all info, right action tabs). Phone/Fold version too cluttered → phone design: picker always visible in one compact row; card top = medium portrait left + name/rank + 3 tight relation lines right; stat tiles via tap on portrait (sheet); action tabs one horizontally scrolling row, sticky; helper sentences moved to disabled-reason of acts; acts full width.
- (18:15Z) Owner: person-card info is too wordy/space-hungry, and stats (Tài, Đức, Sủng, Sắc, Danh, Tâm cơ) must be visible on the card (not hidden). → compact grid of short labelled value chips ('?' for unknown, long text in tooltip), relation row + stats row + small row; same tight grid on iPad left column.
- (18:30Z) Owner: stage frame on Fold too narrow for the room art; asks about painting phone-specific backgrounds. Decision (ours): yes — after the slim-top-bar layout fixes the stage aspect, add a 'stage-phone' tier to the shared backdrop mechanism (jbd) with per-scene floor anchors, then paint phone-shaped versions of every room × season × buổi with gpt-2-6. Everything kit-first: kit owner builds the component, then all screens use it.
- (18:45Z) Owner idea, agreed: on phone/Fold portrait the room scene is the full-screen HOME view (slim top bar + bottom tabs stay); each tab opens as a full-screen panel replacing the room; Lui/tap active tab returns to the room; tap a person on the room → card. iPad keeps the approved split layout. Phone room paintings will be made for the full-screen portrait shape (3:2 strip spec voided).
- (19:10Z) Owner: identity card origin picture should be a wide landscape picture across the card top with a simple frame (current ornate small frame 'màu mè quá'). Group: same simple wide frame for scene pictures inside cards. Also found: player figure has a cheek mole (fix), 'Đổi thân phận (-100' truncated at 686.
- (18:20Z) Owner: her Tư chất (Sắc/Tài/Tâm cơ/Đức) must be visible at all times on phone too (in the slim top bar), not only on the room home. Always send her BOTH Fold and iPad screenshots together.
- (18:40Z) Owner (room home): why is Đức red (stats in normal ink; red only for cost/risk, warnings as a small mark+tooltip); 'còn 4 khắc' → 4 round dots; place name text directly on the scene, no frame, one line; figure name labels without background, rank+name one line.
- (18:45Z) Owner: palace names (Càn Ninh cung…) must stay on the consort picker at all sizes (compact Fold version dropped them — restore).
- (18:55Z) Owner: tassels (tua rua) only on people portraits; act/event/story/item/place pictures use a simple frame without tassel; act pictures larger in their area. Owner also: person-card portrait bigger, filling from card top to the action-tab row.
- (19:00Z) Owner: Hành sự split into category tabs (Giao thiệp, Hại người, Buôn bán, Lễ nghi…) instead of one long list; same for other long act lists. Tư chất row goes in the empty band of the top bar (confirmed).
- (19:05Z) Owner: iPad top bar has empty middle → move info up. Decided: Tư chất (and buổi/khắc/weather/quẻ if it fits) in the top bar on ALL devices (one component); stage keeps only place name + court chips + figures.
- (19:10Z) Owner: Oán next to Ghen in person info. Reminder: everything via one shared kit component; fix once = fixed everywhere. → kit owner keeps a checklist of all today's owner points in KIT.md.
- (19:20Z) Owner: iPad top bar middle split into 2 columns: (1) buổi/khắc/weather/quẻ, (2) Tư chất. Removed from stage.
- (19:25Z) Owner rejected the portrait room pilot (phi-tan-cung -p): 'xấu quá, vẽ lại'. Redo master faithful to the approved landscape room (palette, furniture, soft painterly near-3D), muted natural colours, depth, modest rug; seasons via outside view/flowers/light only; show master before variants.
- (19:35Z) Owner: act/event pictures must show the act (e.g. Chặn ngự giá shows only a lantern); symbolic people allowed in act pictures. → audit all 108 act-*.webp, redraw unclear ones (review/act-art2).
- (19:40Z) Owner: don't redraw room backgrounds — keep the old landscape room art; it's fine in the full-screen room view. Portrait -p room set cancelled.
- (19:55Z) Owner: Chặn ngự giá picture composition OK, but too bright — act is evening-only → night version. Rule: act pictures match the act's time of day.
- (20:10Z) Owner APPROVED the identity card (wide origin picture, simple frame, pinned choice buttons) — review/identity-card 360f138a; ships with the fold-layout build.
- (20:15Z) Owner: selected state in face picker ugly (yellow box behind frame + check over crest). Kit: one selected style everywhere — glow following frame outline, slight enlarge, unselected dimmed, small check at bottom-right inside frame; no box.
- (20:30Z) Owner: selected state = gold glow around the frame is OK; NO check badge.
- (20:50Z) Owner: map lacks servants' quarters, kitchen, physicians, study rooms etc. Decided to add: Dãy nhà cung nhân, Ngự thiện phòng, Nội vụ phủ, Hoán y cục, Phật đường, học đường/Thượng thư phòng; check Thái y viện + Ngự thư phòng reachable. Plan + pilot scene first (review/places).
- (21:00Z) Owner: result/report texts (e.g. spy 'dò la' result) as bullet lists, one fact per line; gains/costs coloured; filler as footnote. All result/report/news/event texts.
- (21:05Z) Owner, final: do NOT redraw act pictures. Keep originals; only the lookup bug fix + Tranh sủng category + night Chặn ngự giá. Rule for coordinator: never start redraws the owner didn't ask for; existing art stays unless she asks.
- (21:30Z) Owner: add difficulty modes Dễ / Vừa / Khó. Vừa = current balance targets (HH ~32%, early death ~40%). Dễ ≈ HH ~50%, early death ~20%; Khó ≈ HH ~15–20%, early death ~55%, more Phúc duyên. Chosen at new life (kit UI), stored per life, shown in Sổ luân hồi. Also proposed (not yet started): rare 'Nữ đế' ending after Thái hậu regency.
- (21:40Z) Owner rejected new-place pilot art (Dãy nhà cung nhân): 'looks too AI, not the game style'. Rule: new scenes start as gpt-2-6 EDITS of approved game scenes (inherit texture/palette), painterly, no glossy floors, no dead symmetry; show a side-by-side with an existing scene before variants.
- (21:50Z) Owner asked where princes/princesses live. Decided: babies with nhũ mẫu in mother's palace; princes 6+ move to A ca sở (study at Thượng thư phòng); crown prince in Đông cung; princesses with mother until married; orphans to Thái hậu/Hoàng hậu (as j95). Added to places plan.
- (22:00Z) Owner: Nữ đế is NOT a rare ending. At the succession point the player CHOOSES: (a) son becomes emperor (she = Hoàng thái hậu), (b) she rules as regent (nhiếp chính, buông rèm), (c) she takes the throne herself (Nữ đế). Each path needs conditions and has its own consequences/epilogue chapter.
- (19:20Z) Owner: show her own age in the top bar next to name/rank.
- (19:25Z) Owner frustrated huadian keeps being redone. Decision: stop all huadian changes; keep the approved marks (t1 small flower per identity motif, NOT a dot); only finish a51 ageing. Huadian is closed — don't reopen.
- (19:30Z) Owner: items are never free/automatic — must be obtained by crafting, buying or gifts (e.g. the face veil after hủy dung: craft, buy, or be gifted; until then scars show). Same for NPCs. Audit all free grants (review/items-earned).
- (19:40Z) Owner (c19 sheet): t6–t8 huadian too big, look like scars/birthmarks → shrink t6–t8 marks to ~t4–t5 size on all consorts (grander by material, never larger); fix missing marks. Pilot first.
- (19:50Z) Owner: redo t8 huadian; pilot first — she approves before it's applied to everyone. (General: any art change = pilot → owner approval → roll out.)
- (20:10Z) CO-OP design (owner, to build after fold-layout/balance/difficulty): 2 players, one shared palace and timeline, both must be ONLINE together (one leaves → game freezes for both, no AI stand-in). Invite by code/link. Each buổi both act in parallel; "Sẵn sàng" button, ~60s countdown after the first presses; shared events seen by both; mutual acts need the other's accept. Death → reincarnate immediately at the same moment, choosing cung nữ (in palace) or tiểu thư ngoài cung (playable khuê các path until tuyển tú, can still help the friend: letters, gifts, father's faction). No waiting, no time skip for one player, no 'reborn in next generation'. Needs a realtime backend (e.g. Firebase; owner creates the account). Estimate 3–5 days.
- (20:15Z) Owner: build the 'tiểu thư / life outside the palace' route now — for single-player (new origin/opening path before tuyển tú, and reincarnation option) and later co-op. 
- (20:30Z) CO-OP rule (owner): ONE shared world state — every fact (who hates whom, ranks, favour, rumours, deaths, events, ledger) is identical for both players; personal story-arc events stay per player but their effects land in the shared world and affect each other. What each player KNOWS may differ (fog of knowledge: spies, 'chưa rõ'), but the underlying truth is one. Implementation: one authoritative world state (host/server), both clients render from it; player-specific data = only her knowledge + her story progress.
- (20:35Z) Owner APPROVED t8 huadian style = the c26 pilot (small symmetric vertical gold phoenix around her motif), but ~15–20% smaller. Roll out to all 32 consorts × 4 ages (incl. redoing the 4 pilots smaller).
- (20:45Z) Owner: art previews must be HIGH resolution (native-res crops, one consort per file), not blurry downscaled sheets.
- (21:10Z) Owner gave Cloudflare Account ID (dev/coop/CLOUDFLARE.md). Co-op backend = Cloudflare Workers + Durable Objects. Token later via secure form.
- (21:20Z) Owner: Part C a51 hair jet-black and colour off vs a18–a36. Rule for all ageing: keep her warm dark-brown hair with painted highlights (subtle silver OK, never jet-black), colour-match a51 to the same tier's other ages.
- (21:35Z) Owner: t6 marks (and t7, t8) too big on Part C too. Rule: t6–t8 marks ≈ t1–t4 size, inside the gap between the inner brow ends; tiers differ by material only. Applies to consorts + Part C. Pilot → approval → roll out.
- (21:40Z) Owner final: huadian t6 stays as is; only t7 and t8 smaller (consorts + Part C).
- (22:00Z) Owner APPROVED t7/t8 smaller huadian (Part C pilot m08/m33): roll out to Part C 52 and consorts 32 at that size.
- (22:05Z) Owner APPROVED the Tiểu thư ngoài cung plan (dev/OUTSIDE_PLAN.md on review/outside) — build it. Also fix tuyenTu() ages to 18+.
- (22:20Z) Owner set GitHub secrets CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID; co-op and single-player live in the same app/link (title: Chơi một mình / Chơi cùng bạn).
- (22:30Z) Coordinator decision: the succession choice card (Hoàng thái hậu/Nhiếp chính/Nữ đế) shows full outcomes + odds like a normal act (it's a deliberate decision, not a hidden event); epilogue chapter choices stay costs-only.
- (22:45Z) Owner: add allergy (dị ứng) — painted rash overlay on the face (like scars), veil can be used for it too. Two-way; causes incl. rival schemes; heals over weeks / Thái y. Pilot overlay art first.
- (22:55Z) Owner: item rivalry — people who see/learn you own a fine item may demand/extort it; servants bribed to steal items, then keep or plant them to frame you (or frame others with your item). Two-way, motive-gated. (review/item-conflict)
- (23:00Z) Owner: dialogs/events use full-width (horizontal) option cards wherever possible, no 2-col gaps (kit group fix). Big events get a painted background/header picture (pilot: Tiên đế băng hà).
- (23:15Z) Owner: Fold/portrait person card = copy exactly the iPad Hậu cung panel layout (left: name/rank, vertical frame, chips; right: action tabs + acts). One component for both devices.
- (23:20Z) Owner: act/event pictures must keep a distinct frame per category/type (colour + ornament), no tassel.
- (23:30Z) Owner principle (binding): iPad landscape = two phone-portrait screens side by side (left: room home, right: open tab panel). Phone shows one half at a time with the SAME components/layout — no separate phone variants.
- (23:40Z) Owner correction: option-button layout is decided PER SCREEN (some 2-col, some full-width rows) — analyse each screen: long options (Cần/Tốn/Được/odds) → full-width rows; short options → 2-col grid; table in KIT.md for owner review.
- (23:50Z) Owner: big events and the week book use full-body figures of the involved person standing big beside the text (like the identity card), with a wide scene band on top; replaces small avatars where space allows (kitEventStage).
- (00:05Z) Owner: why did workers draw their own stat cells instead of the kit? Rule reinforced: ONE component per element kind (kitStatCell etc.); duplicate implementations = review FAIL; kit owner runs a duplicate-UI audit (KIT.md 'Bảng gộp trùng') + dev/test/kit_dupes.js.
- (00:15Z) Owner: the UI reads like an open book — iPad = two-page spread (left room, right tab), phone = one page; tab switch = page turn on the right; week-book page flip must CURL like real paper (not a rigid card). (kitPageCurl, review/page-curl)
- (00:25Z) Owner: event art too saturated/'AI' (Tiên đế băng hà) — match the muted, soft palette of the identity/origin pictures; redo. Theft/framing: owner APPROVED building it as pure game rules with a fresh worker. Rash light level too faint (reads as blush) — strengthen slightly.
- (00:35Z) Owner: 'Vào cung ngay' vs 'Ở nhà chờ tuyển tú' must be a real dilemma with visible gains/losses (balanced so players hesitate; HH% close between paths).
- (00:45Z) Book-spread mapping proposed (left = picture page: scene/full-body; right = text page: chips/tabs/acts; Dư đồ = double-page map; Tư trang = her full body try-on; phone = right page by default, tap figure to turn). Mockups requested from review/page-curl; awaiting owner choice.
- (01:00Z) Owner APPROVED the two-page book UI. Left page = illustration only (right page keeps the approved content, e.g. Hậu cung card with avatar). Phone: tab tap shows the left illustration page full screen with a button ('Mở trang ›') that turns (curl) to the right page full screen; back turns to illustration.
- (01:15Z) Owner APPROVED all 8 appearance conditions: illness, poisoning, slap handprint (faint, aesthetic) + punishment status, glow from dưỡng nhan, early grey strands, smallpox marks (overlays, review/appearance); pregnancy figures (same face/outfit/age, belly; stages — coordinator: 6 & 9 months; ages ≤50; ship as drawn, review/pregnancy-art); nun figure for xuất gia ending (one face, 4 ages). Rash light level approved-pending.
- (01:25Z) Owner: save credits until the game runs. Do now only illness, poisoning, slap/punishment. Postpone pregnancy art, nun, glow, grey strands, smallpox (and other non-essential art).
- (01:30Z) Owner change: on phone portrait tabs open the right (info) page directly; no left illustration page on phone (accepted). iPad keeps the two-page spread.
- (01:35Z) Owner: rash light level OK (all rash overlays approved). Tiên đế băng hà muted version lost the imperial gold (looks like wood) → redo between vivid and muted: soft antique gold must read as gold.
- (01:55Z) Owner LOVES the Mệnh truyện st-* style (watercolour-painterly, harmonious colour, back-view figures). Rule: event/ceremony art follows the st-* style (fresh gens with st-* refs), not edits of the 3D scenes. Redo Tiên đế băng hà that way.
- (02:05Z) Owner: slap handprint approved; illness/poison stronger (ốm nhẹ ≈ old ốm nặng). Temporary EXPRESSIONS (buồn/giận/khóc/đau) allowed as states, done in code (landmark mesh warp + tiny tear overlay), no redraws; base art stays serene.
- (02:20Z) Owner: emotion system — mood per person shown as painted emotion icons on avatar frames; events change moods by personality; moods feed back into decisions (two-way, motive gate). Tiên đế băng hà approved but one side officials, other side harem. Research trungsinhgame.com by bot (respect site rules).
- (02:45Z) Owner: Độ khó row overlaps the face picker on the identity card (fix). Servant-start (cung nữ) must be shown in maid outfit, not consort dress — figure always matches current role/rank (all origins).
- (02:50Z) Owner: emotion icons must be human faces showing the emotion (not symbolic objects); readable at small size.
- (03:00Z) Owner: illness (light/heavy) + poisoning looks approved; code expressions approach OK but emotions must be clearer (stronger).
- (03:15Z) Owner APPROVED Tiên đế băng hà picture (review/succession2 816d0976).
- (03:30Z) Owner page-curl reference (dev/owner-shots/1115-curl-ref-*.jpg): the turning page lifts diagonally from the corner, rotates/tilts as it turns (corner leads), with a soft curved bend and a dark gradient shadow along the fold — not a vertical cylinder roll.
- (04:00Z) Owner on book mockups: Dư đồ is NOT a book page — show it as a leather map (unrolled leather/hide map look, full screen, no gutter) and remove the info strip above the map. Tư trang = game-style inventory grid of empty square slots, split by item-type tabs. Origin roulette (Luân hồi) screen approved; idea: cards face-down, player picks blindly; rarity chips must align on one line per row. Shots dev/owner-shots/1115-*.jpg.
- (22:15Z) Owner: paint each person's residence (nơi ở) as that person's backdrop on iPad (8 consort palaces currently share phi-tan-cung) — pilot Cảnh Phúc cung (xuân-sáng + tối) first, then rollout after approval. Owner wants 2-player co-op playable ASAP to play with a friend — co-op phase 1 started now (review/coop, Cloudflare Worker+DO).
- (22:30Z) Owner: face-down origin flow = show all 9 origins face-up first → "Tiếp" → cards flip face-down + shuffle → player taps one → it glows, flips, moves to page centre → "Tiếp" → that origin's picture animates over to the character-selection page. Odds unchanged.
- (22:35Z) Owner: the 8 palace paintings are for the 8 palace heads (chủ vị); lower consorts living in the same palace get their own different side-room paintings (phối điện/thiên điện), varied so co-residents don't share.
- (22:40Z) Owner: residence paintings get the full sáng/trưa/chiều/tối × 4 seasons set (16 painted variants each), not season-by-tint.
- (22:45Z) Owner: speed up co-op with several workers (target: play with a friend tonight). Split: lead/backend (Worker+DO+PROTOCOL), B client+lobby, C shared-world gameplay; MVP first (reborn as cung nữ; tiểu thư later).
- (22:50Z) Owner: no more code-reshaped facial expressions — feelings are shown by the small mood icons (jexpr/face-lm removed from review/appearance; illness/poison/slap/rash overlays stay). Owner asked to redraw place backdrops' 4 seasons × sáng/trưa/chiều/tối more beautifully — pilot Ngự hoa viên first.
- (23:00Z) Owner: co-op rebirth = same choice as single player (stay outside as tiểu thư or tiến cung), not forced cung nữ. Residence art: lower consorts sharing a thiên điện may appear together (2–3 people) in one room picture; cung nữ quarters likewise shared.
- (23:10Z) Owner: too many images/sounds — download images + audio to the device on first entry with a loading screen + loading bar; afterwards play from device; only what truly needs online stays online (co-op). Worker on review/loading (content-hashed long-lived asset cache, no full re-download per build).
- (23:40Z) Owner approved the residence backdrop look (Cảnh Phúc chính điện pilot: 'Nền ok'). Asked to check whether the Quý phi's outfit is right for her rank (shot dev/owner-shots/1115-residence-quyphi.jpg) — sent to consort-art worker to verify tier/pose.
- (23:55Z) Owner: the wide sweeping skirt pose is OK — do not raise pose issues she didn't complain about; only answer exactly what she asks (here: is the Quý phi outfit right for her rank).
- (00:00Z) Owner rejected the seasons redraw pilot (Ngự hoa viên v2): KEEP the old place backdrops. No seasons rollout; review/seasons not merged.
- (00:05Z) Owner: emotion icons don't look cổ trang — same simple drawing style but faces with ancient hairstyle + hairpins (cài trâm) like consorts; must stay readable small.
- (00:10Z) Owner angry: I sent emotion shots taken on an OLD base (rejected layout: Bảng phẩm vị button, Tư chất dropdown, small room strip). RULE: every screenshot sent to the owner must be on the approved current layout (review/fold-layout / page-curl base). Workers must base UI work on it; coordinator checks shots before sending.
- (00:15Z) CORRECTION: owner's 'Vẽ lại 4 mùa…sáng trưa chiều tối' meant the NEW residence paintings (palace main halls/side halls), not redrawing old place backdrops — coordinator misread it (seasons pilot wasted). Residence rooms get full 4 seasons × sáng/trưa/chiều/tối. Old place backdrops stay.
- (00:25Z) Owner: emotion = icon only, NO colour ring/aura around avatar frames. PRIORITY: finish the new book UI (page-curl, on top of fold-layout) first; all other UI work is then rebuilt/fixed on the new UI (no owner shots from other UI branches until book UI is final).
- (00:35Z) Owner: audit every place/room backdrop; any without full 4 seasons × 4 times → paint the missing variants now (edits of existing, keep old art). Worker on review/place-seasons.
- (00:45Z) Owner: as soon as the book UI is finished, put it live immediately (fast kit review + Fold/iPad play-test, then merge fold-layout+page-curl to main).
- (01:00Z) Owner: hairpin emotion icons look male — must clearly read as ancient-court women (feminine face, lips, fuller hairstyle with flowers/bộ diêu, no single topknot), still legible small.
- (01:10Z) Owner approved the t7/t8 small huadian rollout on all consorts ('Hoa điền ok').
- (01:25Z) Co-op: players must see each other live in the same place (e.g. Ngự hoa viên) and see the same NPCs there → sync per buổi, live presence, shared per-buổi seed for NPC whereabouts (coordinator decision answering owner's question).
- (01:35Z) Co-op release plan: ship week-sync MVP first (after bug fixes + bot year), then per-buổi same-place sync (see each other live, same NPCs via host 'where', player-to-player acts with Nhận/Từ chối) as the next update (~4–5 h more).
- (01:40Z) Owner approved the residence xuân-sáng sheet (25 rooms) → rollout all 16 variants per room + wire into game.
- (01:55Z) Owner approved the emotion icon set 'palace lady' (pilot-emo-lady: oval face, red lips, two-bun chignon, flower, bộ diêu).
- (02:00Z) Owner: co-op players have the FULL interaction set with each other like with NPCs, incl. harm/scheme/sát hại, depending on place/rank/conditions; not a simple Nhận/Từ chối card — only invitation-type acts ask the target; harm resolves with normal odds/detection.
- (02:30Z) Owner: Dư đồ → tap a palace → palace DETAIL map (like reference game's drawn map) showing Chính điện / Đông viện / Tây viện each with 'N bóng người' (real count this buổi) → tap a part → that room painting with exactly the people there. Pilot Cảnh Phúc detail map first (review/palace-map).
- (02:50Z) Owner: do not draw new map art — the Phượng Lệnh repo (thientran2711/phuong-lenh-art) already has the full palace map, per-place detail maps, 4 seasons × 4 times and festivals; take them from there.
- (03:20Z) Owner: like Phượng Lệnh, palace detail art is chosen by the RANK of the palace's chủ vị (PL's per-rank courtyards); our 8 palace names are just labels. Empty palace → spare-cung.
- (03:30Z) Owner on Tư trang: act cards (Gánh hàng rong / Soát đồ) lost their bottom border (clipped) — fix in kit for all card rows. Item slots must use per-grade backgrounds, stronger than the pale tints: REUSE the existing consort portrait frame/background art per grade (no new drawing).
- (03:35Z) Owner: Tư trang has empty space below the bag → add equipment slots (ô trang bị, what she wears) like RPG games, filling the page.
- (03:40Z) Owner: room interiors use OUR own residence paintings (Phượng Lệnh interiors are drawn differently) → continue the 25-room × 16-variant rollout. PL art only for the palace map / detail courtyards.
- (03:55Z) Owner (repeated, angry): people on stages too small. RULE: ONE kit figure-scale standard for every place figures appear (stage, event, book page, rooms, co-op, podium…): figure ≈85–90% of picture height, same scale for all in a scene, never shrink to fit — extra people via +N; names never cut. Any reused picture must follow it.
- (04:00Z) Owner: in co-op the friend is 'Người lạ' until met, same knowledge rules as NPCs (no name/face until met); reborn friend = unknown again.
- (04:10Z) Owner: palace detail courtyards use only Phượng Lệnh grade 'nhat' (most luxurious); no nhi/tam mixing.
- (04:15Z) Owner: in the kit figure scale, men are a bit taller than women (≈1.08×); children by age.
- (04:30Z) Owner: on walks she can meet men; zones forbidden to men (inner hậu cung) / women (outer court); seeing a man where he shouldn't be → report to guards / Cung Chính ti, ignore, hide him, hide & eavesdrop, later leverage. Same rules for NPCs. Worker on review/men (existing male art only).
- (05:10Z) Owner: Tư trang Y phục slot must show the garment (existing wardrobe art img/wd512), not the fabric roll.
- (05:20Z) Owner: equipped slots must show the item's info inline (Được/Mất/công dụng), not only after tapping; header warning chip must not be cut.
- (05:25Z) Owner: stage name labels = rank on top line, name below, text coloured by rank (kit rule, all stages).
- (05:40Z) Owner: no 'Gánh hàng rong' inside the palace — renamed to 'Nhờ thái giám mua đồ' (Nội vụ phủ eunuch buys from outside).
- (05:45Z) Owner: category tab row must sit centred (equal gaps) between the card row above and the content below; sticky row must not cover content.
- (05:50Z) Owner: worn items have a luxury axis too: within rank but too luxurious → jealousy/ghen ghét, superiors' disapproval; modest dress small Đức/Danh. Same for NPCs; shown in Đang mang.
- (06:00Z) Owner: add more wear slots with real rules (hoa tai, ngọc bội, túi thơm, khăn che mặt…), using existing item art; rank + luxury rules per slot.
- (06:05Z) Owner: stage figures taller still → KIT_FIG woman .92, men ×1.07; don't shrink for 'her+1' — figures may stand behind the plaque column.
- (06:15Z) Owner approved figure ratio of dev/owner-shots/1115-fig-ok.jpg (iPad 1180 Ngọc Thanh các, ≈.76–.80 of stage) as the standard → KIT_FIG women at that ratio everywhere (supersedes .92).
- (06:20Z) Owner: no grey boxes over locked places on Dư đồ — same label style + lock mark; actions in a tap card; no cut text.
- (06:25Z) Owner: during page curl, the next page must already be visible underneath the lifting page (like a real book).
- (06:40Z) Owner: no Chinese characters in UI — ngự tứ seal shows Vietnamese 'Ngự' in the red square seal.
- (07:00Z) Owner: luxury shown as numbers (corner 'Xa xỉ N' per item; header total vs allowance), not words. Ref dev/owner-shots/1115-xaxi-ref.jpg.
- (07:15Z) Owner: choice cards (e.g. Nam nhân nơi cấm địa) must show each option's full Tốn/Được/Mất (+ odds), like Hành sự cards — not costs only.
- (07:20Z) Owner: 4 named guards → paint 4 distinct guard looks (thive-3, thive-4 × 4 ages).
- (07:40Z) Owner: wants alternative story routes (not only climbing to Thái hậu): tư tình with another man (incl. for a child), escape the palace, leave legally (xuất gia, ban hôn), follow another man. Worker on review/routes (design + build, tasteful, full option cards, same rules for NPCs).
- (07:45Z) Owner: iPad stage shows 3–4 people at once (max 4) at the approved scale; Fold 2–3; extra via › N.
- (07:50Z) Owner: the back of the curling page must show page content (the new page's image), not blank paper.
- (08:10Z) Owner: don't show the rank luxury allowance — only item 'Xa xỉ N' and the worn total; player learns limits from consequences.
- (08:20Z) Owner: men's intrusions must not be luck — plan-driven (scheduled meetings/shifts in world state); she sees it only if she is really there at that time; recognition by stats; tai mắt can tip her off in advance.
- (08:30Z) Coordinator decision for owner's '3–4 people on iPad': allow ~35% overlap on iPad (25% Fold), size by core body width so sleeves don't force the strip; same scale.
- (08:40Z) Owner: tư tình child → classic 'trích huyết nghiệm thân' blood test (can be tampered by either side; same rules for NPCs). Sent to routes worker.
- (08:50Z) Owner: in dialogs only the option list scrolls; title/picture/figures/text stay fixed (kit rule for all dialogs).
- (08:55Z) Owner: blood test gets animation/minigame; scheme acts get minigames (worker review/scheme-games; always option to skip and use plain odds; NPCs plain odds).
- (09:05Z) Coordinator: to let owner play with a friend sooner, ship review/coop (includes book-release 1b90526) as one live release after kit review; iPad 3–4 people, dialog scroll, full flap come in the next update.
- (09:10Z) Owner: event dialogs put the people standing on the scene picture (not a separate figure column) to save space; text full width below.
- (09:30Z) Scheme minigames: first worker stopped by a safety classifier (likely the poison-dose game). Scope narrowed to abstract games: Nghe ngóng, Truyền lời, Mặc cả; no poison minigame.
- (09:40Z) Coordinator decision: the player figure is drawn on the stage at every place she is (not only home/lãnh cung).
- (09:50Z) Owner: 4 people too crowded → max 3 on iPad, 2 on phone/Fold; less overlap.
- (10:00Z) Owner: page turn = whole sheet swinging around the spine with content attached to the sheet (rotates/tilts with it), like her binder-app reference; not content pinned to the page beneath.
- (10:05Z) Owner: poison/heavy-harm minigame should be abstract, not explicit → 'Thời cơ' timing/attention game (no method detail).
- (10:40Z) LIVE: review/coop merged to main 614b00ec (book UI + fold-layout + KIT_FIG + co-op 2 người).
- (01:20Z, via the old session) Owner: home-screen-installed app / phone stuck on an old build because of the old sw.js → the new sw must check for a new build on app open and on return, and switch to it automatically after one reopen; assigned to worker review/loading.
- (01:25Z) Owner (home screen shot, 'Thanh gì đây'): the striped purple band between the stage picture and the button row = the book cover edge (.kbk-board) showing → bug, remove; the cover must never show as a separate band. Assigned to the reviewer in batch 2.
- (01:30Z) Owner: from now on ALL images go to Cloudflare, not stored in the GitHub repo → worker review/cdn-images (R2 + Worker or Pages; IMG_BASE; cdn_sync for new art; git rm img/ without rewriting history).
- (01:30Z) Owner: Dư đồ scroll/unroll animation too fast → slow down (~2×, ease, interruptible, off with Cảnh động) → worker review/map-anim.
- (01:35Z) Owner (Dư đồ: 2 khắc left yet every place says 'hết khắc'): the old rule required walk time + 1 khắc. Coordinator decision: any place whose walk ≤ remaining khắc is reachable; arriving as the buổi ends is still allowed (only time to see who is there; next buổi starts there); the word 'hết khắc' only when truly 0 left, otherwise show 'đi N khắc'. Assigned review/map-anim.
- (01:40Z) Owner: draw khuê các dresses for the tiểu thư route → khuê các everyday wear, a18, every player face (32 consorts + player if used), no huadian; try 4 people first for owner approval; images to Cloudflare. Branch review/khuecac.
- (01:45Z) Owner allowed pushing the 2 maid fix batches (wip/maid-art-fix, wip/maid-art-b-fix). Re-checked: both (and 89dd550/7b3f527/212db69, maid-art-c) already PASSED and have been on main since 14/11 — the note in HANDOVER.md was stale; nothing left to push.
- (01:50Z) Owner: slow the page-turn animation (~2×, ~1.1–1.4 s, smooth) → worker review/page-curl.
- (01:55Z) Owner: khuê các dresses (girls outside the palace) drawn for all 84 faces (32 consorts + 52 maids).
- (02:25Z) Owner APPROVED khuê các dresses (sample 4 faces c05 c08 c29 m05, slightly lighter/softer rendering accepted) → draw the remaining 80 faces, wire into the tiểu thư route.
- (02:30Z) Owner: add poor-girl outfits for the outside route. Coordinator: origins thd (poor teacher) and td (criminal official) wear poor clothes; tt/dtq/muoi/ch wear khuê các. Poor clothes = coarse cloth/cotton in pale colours, wooden hairpin, neat, clean, pretty — no patches, no tears (keeps the 'nobody looks poor/miserable' rule). Try 4 faces first, send for owner approval; 84 faces.
- (02:35Z) Owner disliked m05 huadian 'hai quả anh đào' (looks like cherries). Change m05 to one small cherry blossom (5 notched petals), all tiers t1–t8 × 4 ages. Branch review/m05-huadian. Other object/fruit motifs not changed yet (owner hasn't complained) — asked owner.
- (02:00Z, owner said it in the old session, relayed by it) Owner: do all 15 ideas in dev/research/TRUNGSINH_COMPARE.md "Đào sâu" → Top 15 (release animals to disfigure, two-way; themed outfit-matching contest; minigames when the Emperor summons her privately: play to the rhythm, chess, lake outing that may meet an assassin; investiture ceremony with guests congratulating + handing out lì xì; show stat thresholds before an exam; one shared danger bar combining jealousy/grudge; pets; first impression when meeting someone who hates her; bullying for silver with 2 buttons; dating consequences by status; secret pact to bear a child when the Emperor is infertile (ties to routes); post-birth rewards; fire burning belongings (ties to lost-items); wishes/lantern release; handmade items to give). Rules: never copy that game's text/art/names; shared kit; cards with full Cần/Tốn/Được/Mất + odds; everything has a real cause + omen; NPCs same rules; art only when needed and ask owner first; harm stays abstract.
- (02:10Z) Owner APPROVED poor-girl dresses (4-face sample) → draw all 84 faces; thd/td wear poor clothes.
- (02:15Z) Owner DROPPED idea 11 'secret pact to bear a child when the Emperor is infertile' ('hơi tào lao') — not doing it; the other 14 stay.
- (02:20Z) Owner: change every object/fruit/animal-shaped huadian to flowers/leaves (keep classic dot/drop/moon/flame marks). About 23 maid faces + c17, c27; each motif its own flower/leaf, no duplicates; 8 tiers × 4 ages. Branch review/m05-huadian.
- (02:25Z) Owner: bullying for silver must also demand items she owns (real items in Tư trang). Assigned review/ts-b; reuse the existing 'uyhiep' act.
- (02:35Z) Owner (Hậu cung shot): purple background still under the page → remove the dark purple book cover entirely on every tab/size; only a thin paper border in kit tone if needed. Assigned to a new reviewer, merged into review/main-next with map-anim + page-curl.
- (02:40Z) Owner: the turning page is transparent on phone portrait (both pages' text overlap) → the turning sheet must be fully opaque on both faces, no text from the page beneath showing through; KIT §34.0. Assigned to the main-next merger (page-curl).
- (02:55Z) Owner: 'Đẩy lên live đi' + from now on builds that passed review (kit reviewer PASS) go live right away, no need to ask. Pushed main = 355d6d58 (loading: app updates itself to the new build).
- (03:05Z) Owner disliked 'có thai: Liều · được ban thưởng: Liều' on act cards. Rule: the Liều…Nắm chắc ladder is only for the act's own success/failure odds; side chances (pregnancy, reward, card turned…) use the ladder Rất thấp/Thấp/Vừa/Cao/Rất cao like the status cells (hud-chance2). Assigned review/sub-odds.
- (03:10Z) Owner worried about reloads mid-play. Coordinator: never auto-reload mid-play; only a 'Có bản mới' chip (tap: Mở bản mới / Để sau); auto-apply at Qua buổi / reopening the app after a long time; after reload AUTOMATICALLY re-enter the same life at the same spot; co-op doesn't drop. Assigned review/update-flow.
- (03:15Z) Owner: the main session may push images to Cloudflare itself (including overwriting fixed images with the same name), no need to ask.
- (03:20Z) Co-op update: both see the chip; at Qua buổi (sync point) the host signals → both save, open the new build, AUTOMATICALLY re-enter the same room/spot; a room refuses clients on a different build (old client is guided to update and rejoin); can proactively 'Mở bản mới ngay' (asks the other). review/update-flow.
- (03:40Z) Owner: fix the play-with-friend UI URGENTLY so the owner can play with a friend → worker review/coop-ui (test on 2 devices on live, fix blockers, top priority).
- (03:45Z) Owner: the Thỉnh an act picture (skirt + shoes kneeling on a cushion) looks like a kneeling punishment → change picture: consort making a graceful phúc thân curtsey/bow before the hall, no cushion kneeling. Prefer existing art, else draw with gpt-2-6. review/thinhan-art.
- (03:55Z) Owner: needs a new-player tutorial. Design: guide mama (existing art), start-of-life guided pass ≤12 steps with highlight rings + try one act; first-time contextual tips per feature; on/off + replay in menu; doesn't force old players; co-op runs separately. review/tutorial.
- (04:05Z) Owner: move Tai mắt + Ân sủng (Có thai, Lật thẻ, Ân tình đêm, Số lần ân thưởng) onto the stage, right column under the Hoàng thượng/Thái hậu/Hoàng hậu/servant chips; remove the 'Tư chất · trạng thái' panel entirely (other info already lives elsewhere). Có thai/Lật thẻ on the Rất thấp…Rất cao ladder. Assigned review/sub-odds.
- (04:15Z) Owner: Giao tình per person split into 3 columns — left big person picture as elsewhere, middle relation bars, right "Đã biết" bullet list. review/hau-cung-ui.
- (04:15Z) Owner asked "Sai đi Tiểu Lâm Tử là sao" → change to "Người chạy việc: …" with explanation, in one place only, person selectable. Chip "Thỉnh tranh nhân vật" must not cover content. review/hau-cung-ui.
- (04:20Z) Owner: huadian too big (Hạ Tố Tâm, Phi). New rule: t1 = c03 t1 size; grows very little, max ~1.25× t1 width by t6; t7 half size, t8 small gold phoenix. Audit all consorts + Part C maids, shrink oversized ones (review/m05-huadian).
- (04:20Z) Owner: portrait frame (Quý phi) top ornament detached, misaligned → fix in the per-rank frame kit, ornament attached to the frame (review/hau-cung-ui).
- (04:25Z) Owner: people lists (Sổ tuần 'Sổ này ghi') must be straight vertical columns → kit rule: every person-chip list uses an even column grid. review/hau-cung-ui.
- (04:30Z) Owner: person page in Sổ tuần → figure full page height (from below the title to above the page number), text in the right column; kit rule §27. review/hau-cung-ui.
- (04:35Z) Owner: 'next' pages in Sổ tuần also need a full-page full-body figure like the first page; only turn the page when truly out of space; the line '(Đã ghi vào mục Đã biết…)' becomes a small footnote. review/hau-cung-ui.
- (04:45Z) Owner: dialogs with a person (e.g. 'Có người đến') → left full-body person filling the dialog height; right top event text, right bottom choice buttons. Kit rule KIT §32.7 for person dialogs without a scene picture. review/dialog-person.
- (04:50Z) Owner disliked the new Thỉnh an picture (seen from behind, hands look placed behind her bottom) → redraw: vạn phúc curtsey, hands joined in front at the right hip, side/3-4 view facing Thái hậu; Thái hậu at correct age, no huadian. act-thinh-an-v3.
- (04:55Z) Owner: Hành sự (and every act list) — acts doable now on top, then acts blocked only by time, then acts blocked by other conditions; stable order. review/sub-odds.
- (04:55Z) Owner asked "tiếng cứng cỏi là sao" → ban vague effect words with no real rule in Được/Mất/Kèm; good things don't go in the red Kèm line. review/sub-odds.
- (04:55Z) c12 Phi huadian shrunk (~c03 t1 × 1.2), pushed to CDN.
- (05:05Z) Owner: men don't belong in the Hậu cung tab → move to Cung nhân, section 'Nam nhân đã gặp'; men's names must not repeat; a man's card must have acts or a clear reason. review/hau-cung-ui.
- (05:08Z) Owner reported live bug: Hậu cung › Phi tần (Hạ Tố Tâm, Dùng chứng cứ) people strip shows only 1 person, person card shrinks to ~1/3, picture and act cards cut, big empty space below → urgent fix (review/hau-cung-ui, pushed separately).
- (05:12Z) Owner asked about balance of 'Có người đến' (Nhịn: Đức+2, ghen+3 / Đáp trả: Danh+1, oán+10). Coordinator: not balanced (Nhịn almost always better; jealousy for enduring makes no sense). Redo as a real dilemma: Nhịn Đức+2, Danh−1, servants' loyalty −2, the other party presses further; Đáp trả Danh+2, loyalty+2, oán+6, Đức−1 if the other is higher rank, with a failure chance. Audit every 2–3-option event for a dominant option. review/ts-b.
- (05:15Z) Owner reported bug: Thỉnh an Hoàng hậu says 'thiện cảm +4' but nothing changes. Fix: the act really raises 'Hoàng hậu với ngươi +4'; result card shows real numbers. Unified terms: 'Ngươi với nàng' / 'Nàng (Hoàng hậu, Hắn…) với ngươi', drop bare 'thiện cảm'. Audit every relation effect. review/sub-odds + review/hau-cung-ui.
- (05:18Z) Owner APPROVED the shrunk huadian size (c12 Phi) → make it the size standard for every tier.
- (05:20Z) Owner: the Hậu cung tab must also include Hoàng thượng, Thái hậu (first group of the people strip, person card + existing acts). review/hau-cung-ui.
- (05:25Z) Owner: 'Ngươi với nàng / Nàng với ngươi' hard to understand → clear subject-verb labels: 'Nàng quý ngươi: <level> · number', 'Nàng oán ngươi: number', 'Ngươi quý nàng…', 'Hoàng hậu quý ngươi +4'; levels: Ghét/Không ưa/Bình thường/Có cảm tình/Quý mến/Thân thiết. Everywhere (cards, Giao tình, acts, results, logs).
- (05:28Z) Owner annoyed: the Thỉnh an Hoàng hậu no-relation-gain bug was reported on 14/11 and still not fixed (old session didn't log it). → HOTFIX top priority (review/hotfix-thinhan), live as soon as it passes review.
- (05:35Z) Owner: Hậu cung gets its own small tab next to Phi tần for Hoàng thượng + Thái hậu, and its own small tab 'Nam nhân' also in Hậu cung (NOT in Cung nhân). Hậu cung: Phi tần | Hoàng thượng · Thái hậu | Nam nhân | Giao tình | Phe phái. (05:35Z worker machine restarted — all workers stopped, resumed from worktrees.)
- (05:40Z) Owner: the check 'every button produces exactly the result it says' (assigned 14/11) was lost in a session change → reassigned: review/act-audit (automated check of every button, before/after compare, report ACT_AUDIT.md, fix wrong ones). Added to the open-bugs list.
- (05:45Z) Owner: portrait frame — top ornament gaps away from the frame; switching person makes the frame jump, not smooth; position doesn't follow margins → portrait box fixed to one standard, ornament attached to frame, person switch fades 150–200 ms without shifting (review/hau-cung-ui).
- (05:45Z) Owner: Hoàng hậu/Hoàng quý phi must live alone (currently seen sharing Càn Ninh) → fix residence rules; Thái hậu aged 43 looks young → Thái hậu 50–62, art matching age (review/court-rules).
- (05:50Z) Owner: the note 'còn N: cần 50 mới lên Hoàng hậu' on act cards is both redundant and numerically off → remove from every act card; remove repeated CẦN notes (review/sub-odds).
- (05:50Z) Reviewer 2: balance FAIL (j92 wearables collide with the new Tư trang) → needs a worker to merge WD wearables into Tư trang before merging balance/emotion/difficulty/lost-items/appearance/schedules2/outside. Bot on main: HH 54% (high), early death 29%.
- (05:55Z) Owner asked whether 'Sai đi dò la' odds (Khá chắc) are based on anything or pure luck → currently just 40 + loyalty/3 then roll. Rule: odds must come from real factors (servant's talent/nature, target's Tâm cơ/nature, guards, acquaintance, Tai mắt, quẻ), and tapping the odds word shows 'Vì sao …' listing the factors (no %). Applies to every act; NPCs same formula. review/act-audit.
- (06:00Z) Owner: tab restructure. Hậu cung = people in the palace: [Hoàng thượng · Thái hậu | Phi tần | Nam nhân | Cung nhân]. The old main tab 'Cung nhân' is renamed 'Giao tình' (coordinator named it) containing [Ân oán | Phe phái]. Replaces the 05:35Z decision. review/hau-cung-ui; tell the tutorial worker.
- (06:15Z) Owner: not just hiding notes — check whether the rule/formula is wrong. Found: 'còn N' = Đức after the act (33−5=28, 33−4=29, 33−3=30) — math right, but the VP rewrite lost the word 'Đức'. REAL BUG: text says 'Thái hậu 50' but the rule checks BAL.hhTh=55; code comment says 40. Assigned act-audit: every number shown to the player must read from the same rule constant; list mismatches.
- (06:20Z) Owner: 'Sửa luật cho đúng một nguồn luôn, xong báo tôi' → review/rules-one-source first priority of the act-audit worker.
- (06:35Z) Owner reported bug: arriving at Kính sự phòng with 1 khắc left → buổi ends, game auto-advances to evening and kicks her to Dư đồ, no chance to see anyone. Rule: no auto buổi advance/no relocation; she stands at that place and sees this buổi's people; she presses Qua buổi herself; next buổi starts there; only relocate for a real, clearly stated reason. review/court-rules.
- (06:38Z) Owner reported bug: while at Kính sự phòng, tapping that place on Dư đồ jumps to Hành sự instead of entering the place. Fix: tapping the current place → opens that place's stage; the '‹ Phòng' button returns to the current place and shows its name. review/court-rules.
- (06:40Z) Owner: keep the act-card warning in the form 'Đức 33 → 28: cần Đức 50 mới lên Hoàng hậu' (don't remove; don't write 'còn 28'); threshold read from the rule table.
- (06:45Z) Owner correction: running out of khắc on arrival STILL auto-advances the buổi, but she stays at that place with 4 new khắc, sees the new buổi's people, carries on. (Replaces 'no auto buổi advance'.) Owner says she reported it on 14/11 — no branch fixing it found in git history. review/court-rules.
- 06:45Z LIVE main=f7a9e9880 HOTFIX Thỉnh an Hoàng hậu (card had picked the wrong option 'Hỏi han sức khỏe', which did nothing; now really Hoàng hậu quý ngươi +4, result card before→after).
- (06:55Z) Owner (Kính sự phòng, 3 silhouettes): (1) she appears on both stage page 1 and page 2 → she appears only ONCE (first page), later pages show only others; (2) page buttons '1 ‹' / '› 1' confusing → show '+N' (N = number of people not yet shown), back button '‹'; (3) title 'Ở đây có 1 người' disagrees with Dư đồ '3 bóng' → one count source, matching, clearly worded (e.g. 'Ở đây có 2 người khác'); (4) standing positions must follow a standard template: slots 1, 2, 3 fixed, same foot line, centred in slot — guards/eunuchs currently off; names never overlap. Assigned worker stage-slots (when disk allows).
- (07:05Z) Owner: act cards show only 'Đức 33 → 28', WITHOUT 'cần Đức 50 mới lên Hoàng hậu'.
- (07:30Z) Owner: every button/choice must have a purpose — a choice that gains/loses nothing (e.g. 'Hỏi han sức khỏe') must get a real fitting effect or be removed from the game. act-audit lists + fixes.
- (07:30Z) Owner asked why worker disks fill up: the repo has ~5 GB of image history + each worker checks out 1.4 GB (img/ in the tree) × ~13 workers. When cdn-images reaches main, img/ leaves the tree → ~0.2 GB per worker. Slimming history (new repo/filter) needs owner consent.
- (07:30Z) Owner viewed the 4-buổi backgrounds, disliked Kính sự phòng evening as too garish/AI (11 sheets of 4 seasons × 4 buổi sent; waiting for owner to point out places to redo).
- (07:30Z) Owner: stage label line 2 must be the person's NAME, not title ('Thái giám / Tổng quản' is wrong) → every NPC gets a proper period name, title on line 1 (review/stage-slots).
- (07:35Z) Owner: THE MAIN SESSION MAY draw art when it sees something missing, no need to ask — must match game style (gpt-2-6, STYLE_ANCHOR).
- (07:35Z) Owner: draw pets now; 4 is too few → 18–24 pets, with grades + Xa xỉ N (rules like wearables), each grade a different use (warns of harm, guards the palace, eavesdrops, Sủng, Danh…), rare divine beast SAVES ONE LIFE for its owner; real downsides; NPCs same rules. review/pets.
- (08:00Z) LIVE main=e659176f0 coop-ui (fixed stuck Vào phòng button, empty Hành sự on rejoin, Gửi/Chép đường dẫn buttons, 6-step guide). Week-3 buổi desync not yet reproduced.
- (08:00Z) Owner: stage draws extra people as small portraits standing on the floor → banned; extras go into '+N', strangers = life-size silhouettes (stage-slots). 'Quen biết 3/3' confusing → clear wording (hau-cung-ui). 'MẤT: không được gì' meaningless → remove/replace with real consequence (sub-odds).
- (08:05Z) Owner: stranger portraits blurry + half-face zoomed → strangers use silhouettes; audit ALL displayed images (blur, zoom, face cropping, fallback images) review/img-quality.
- (08:10Z) Owner: rename 'Sổ tuần' and audit every name to sound period/archaic → style worker drafts a proposal table (recommends 'Tuần lục'), coordinator approves then applies.
- (08:10Z) Owner: the page turn must BEND with the finger on press-drag (drag back and forth, stop = it holds), release past halfway or flick to complete the turn, otherwise it springs back; ‹ › buttons also curl; the cover curls too (stiffer). review/drag-curl.
- (08:10Z) Owner asked again about straight columns in 'Sổ này ghi': assigned to review/hau-cung-ui since 04:25Z, not live yet.
- 08:10Z cdn_sync 216 shrunk maid huadian images (batch 3).
- (08:15Z) Owner: act pictures in Sổ tuần repeat (Nhịn = Làm thơ; Ngủ đêm = Đi) → every act with a different meaning gets its own fitting picture (draw if missing); 'Đi.' → 'Đến <place>'; 'Nhịn.' gets context; label 'X quý ngươi'. review/act-pics.
- (08:20Z) Owner: Thỉnh an Hoàng hậu and Thỉnh an Thái hậu pictures must differ (Đức Thọ cung/Thái hậu vs Càn Ninh cung/Hoàng hậu; vạn phúc curtsey hands in front, not turned away). review/act-pics (replaces thinhan-art v2).
- (08:30Z) Owner: online leaderboard for all players (login or anonymous guest, game remembers everyone): LIFE ranking (one row per life, incl. several lives of one person) + PLAYER ranking; 1st/2nd/3rd + list. Coordinator: self-generated guest code + nickname; 'Công danh' score computed from real outcomes (Worker recomputes); Worker + D1 on Cloudflare; login later. review/rank.
- (08:35Z) Owner: events affecting her (e.g. memorial investigation, Sủng +4, Tể tướng family's power −5) aren't announced in-game, only seen in Sổ tuần → rule: every event that changes her stats/relations/standing, or that her own act started, must be announced immediately (result card/toast 'Xem'); Sổ tuần is only a summary. act-audit.
- 08:35Z Thái hậu a51 aged to 55–62 + dark Kính sự phòng/Thái y viện backgrounds colour-graded (grade, layout kept) on CDN; review/m05-huadian bca3d5c0d.
- 08:35Z Archaic renaming table: dev/handover/NAMING_PROPOSAL.md (recommended: Sổ tuần → Tuần lục; Qua buổi → Sang buổi; Qua đêm → Đợi sáng; Chơi cùng bạn → Cùng tri kỷ; …). Coordinator does NOT change 'Cơ may' → 'Cơ duyên' (different meaning). Waiting for owner to look.
- 08:35Z review/hau-cung-ui d562fe84e SẴN SÀNG KIỂM → reviewer 1 queue.
- (08:45Z) Owner: 'Sai đi dò la' picks a random person → rule: every act targeting a person/place of hers must let her CHOOSE the target (kit picker), odds computed for the chosen target; no player act auto-picks a random target; NPCs pick targets by real motive. act-audit.
- (08:55Z) Owner: place card (tap a place on Dư đồ) must have that place's picture on the left (right season/buổi), info top right, buttons bottom right; buttons per shared kit: short → 2-col grid, long → full rows; remove 'GHI CHÚ không được mất gì' on the Thôi button. review/place-card (on top of dialog-person).
- (08:58Z) Owner correction: the place card reuses the large frame of the place event card — place picture on top, info box in the middle, buttons at the bottom (short: 2 cols; long: rows). Replaces the left/right layout. review/place-card.
- (09:00Z) Owner asked whether spying should be random or targeted → coordinator recommends both: 'Sai đi dò la <person>' targeted (main) + a cheaper 'Nghe ngóng chung', real news weighted by real factors (who is active/scheming, the maid's acquaintances, Tai mắt) to discover people worth watching. act-audit.
- (09:05Z) Owner: 1 khắc left, place 3 khắc away → 'Không vào được' is a dead end. New rule: offer 'Đi (đến nơi vào buổi sau)' — spend the remaining khắc, advance the buổi, deduct the rest of the walk from the new buổi, arrive next buổi and see that buổi's people; replaces the 'Đợi buổi sau' button. review/place-card.
- (09:10Z) Owner: Hoàng tự tab reads like a text report → rebuild with the shared kit, sub-tabs (Con của ngươi | Kế vị | Hoàng tự trong cung | Hôn sự | Công tử quyền thần), person cards/people strip like Hậu cung. review/hoang-tu.
- (09:15Z) Owner annoyed: the '1 khắc left but can't walk though the day is long' bug reported since 14/11 → separate HOTFIX hotfix/walk-spill, live before place-card.
- (09:20Z) Owner: marriages must include princes too (finding wives for sons), not only princesses → chính phi/trắc phi from noble daughters of powerful ministers, mother petitions for a marriage decree, in-laws back her faction + succession, NPCs same rules. review/hoang-tu.
- (09:25Z) Checked: công tử are only data rows in Hôn sự, no art yet ('???' silhouette); no noble daughters of powerful ministers yet. Plan: noble daughters reuse the 84-face khuê các art (faces unused in that life); draw ~10 new công tử × 2 ages (gpt-2-6). review/hoang-tu.
- (09:30Z) Owner: the game lacks feel (buttons press-in/glow, animations); wants PixiJS for effects, device VIBRATION, screen shake per event — said since 14/11 but not done (code has VIB but almost never calls it). → review/game-feel: press/glow/ripple buttons, Pixi particle layer (falling petals, gold rays, falling silver, flying numbers), kitFx(kind) screen shake + vibration per event, respecting Cảnh động/Rung.
- (09:40Z) Owner: 'Nhờ thái giám mua đồ' — court background wrong (→ her room + eunuch carrying a tray); make a square-cell grid like a wuxia game shop: item cell, price + Mua button below; no repeated info (CẦN lacking silver + TỐN silver is duplicate) — kit rule: if the only condition is enough money, don't write CẦN. review/act-pics + act-audit.
- (10:05Z) Owner circled face-thaihau-3 (sly face, slanted eyes, side glance, smirk, heavy lipstick) → redraw gentle, per face rules; audit the other face-thaihau. act-pics. (10:05Z cdn_sync 11 act-pics files: separate thỉnh an TH/HH, bái kiến, nhịn, làm thơ, ngủ đêm, eunuch carrying tray…)

## 15/11 ~05:00Z (owner)
- Midday/afternoon/evening backgrounds too garish, "AI": colour-grade in code like the approved night Kính sự phòng/Thái y viện; original morning and Lãnh cung are the reference. Add a per-buổi light layer over characters. Sample first (review/scene-light).
- Dư đồ must have a midday buổi (take map-*-trua from review/place-seasons).
- She can promote maids/eunuchs herself (Chưởng sự cô cô, Nữ quan, Thủ lĩnh, Tổng quản), limited by her rank; NPCs same rules.
- Pets: grades use exactly the grade ladder, colours and cell frames of equipment/items, no new palette.
- Item cut-outs (especially hairpins) still dirty: re-cut, don't redraw.
- Everyone beautiful, serene faces; faces don't reveal personality (Thái hậu 2/3/5 redrawn, on CDN).
- Merge "Thánh thượng · Thái hậu" into a 2-word tab (proposal: "Chí tôn").
- "Qua đêm" becomes "Qua ngày" (or "Sang ngày mới"); drop "Đợi sáng".
- "Nhờ thái giám mua đồ" panel: full-body eunuch on the left like a person event card, no place background; top = intro text, below = item cell grid (Tư trang cells), under each cell price and Mua button. Use the shared kit.

## 15/11 ~05:05Z (owner) archaic names + shop
- Chơi cùng bạn / Mời bạn → "Cùng hảo hữu" / "Mời hảo hữu" (tri kỷ too intimate). Bảng vàng: ok. Qua đêm → Qua ngày.
- The word "ngươi" referring to the player in the UI becomes "ta" (first person): "Con của ta", "Hoàng hậu với ta". NPC dialogue addressing her keeps "ngươi".
- Wuxia-style shop: cell with item picture, name, use, unit price; selecting a cell shows a quantity row +1/+2/+3/+4/Tối đa, auto total, then Mua button.

## 15/11 ~05:10Z (owner, repeated many times)
- Person card (Hành sự with one person): name + rank tight at the very top, portrait frame pulled up, remove the empty space above; spare room goes to info.
- GENERAL RULE: in every button/act list in the game, available buttons on top, dimmed ones below.
- Acts on the right of the person card split by small shared-kit tabs; tapping a tab shows only that group's acts.

## 15/11 ~05:15Z (owner) stipend + selling handmade items
- Review the monthly stipend for balance against item prices; show a card when the stipend arrives.
- Handmade items from skill lessons (embroidery, painting, calligraphy…) become items, sellable to the Nội vụ phủ eunuch. Eunuch card has 2 kit tabs: Mua | Bán.

## 15/11 ~05:20Z (owner) economy by rank
- Concern: Hoàng hậu 320/month can't spend it all, Đáp ứng 30 while items, lessons, schemes all cost 20–30. Coordinator's chosen direction: high ranks get more money but face/duty/servant costs rise with rank (HH surplus only ~3–4× Đáp ứng); low ranks get reasoned income sources (selling handmade items, rewards, birth family, working for superiors); tiered prices (common 3–15, mid 20–60, luxury 100–400, above-rank items carry risk); low ranks have silver-free paths (khắc, Tâm cơ, favours) but slower/riskier; monthly stipend card shows income and spending clearly.

## 15/11 ~05:35Z (owner)
- Place background colour grading: APPROVED (softer, less AI). Grade all places (except Lãnh cung).
- Dư đồ: do NOT grade. Dư đồ morning/midday/afternoon/evening images come from Phượng Lệnh, kept exactly.
- Character light layer: owner still undecided; waiting for a comparison sheet (none / light / current). Default off.
- REMOVE every "Thôi" button (and Lui/Đóng) across the game; every closable panel gets one ✕ in the top-right corner.
- Wording must pair: "Sang buổi" / "Sang ngày mới" (drop "Qua ngày").
- (05:40Z) Handmade items: redraw the self-sewn dance dress all 4 grades (dress upright, fully visible from collar to hem, not folded, no hanger); redraw Điệu múa all 4 grades as a dancing figure; redraw the Tuyệt phẩm endgame chess problem to differ clearly from Trân phẩm. Calligraphy/music scores/sutras: no Chinese characters. In-game handmade items use the per-grade frame + background like equipment (kitItem).

## 15/11 ~05:45Z (owner, annoyed that workers don't follow the kit)
- Every screen MUST use shared kit components (frames, figures, tabs, buttons, ✕); workers may not make their own frames/figures. Reviewer FAILs every branch with private versions.
- Owner is OCD: every row/column must align to margins; prices, names, buttons in a grid on the same horizontal line.
- Shop panel: eunuch figure full frame height like person dialogs; remove the buy box below (no repeated item); − number + and the Mua button right on the cell.
- (05:50Z) Supported screens: Fold-size phone (~755x1000) portrait + landscape; phone landscape; iPad landscape. NO narrow phone portrait (iPhone-like): the game shows a rotate-to-landscape prompt. New test sizes: 755x1000, 1000x755, 1180x820, 1366x1024, 844x390 (+ check 390x844 shows the rotate prompt).
- (05:55Z) Tapping outside a panel (dimmed backdrop) anywhere closes it, like ✕ (except mandatory panels).
- (05:55Z) Tuần lục: EVERY act/meaning gets its own picture; sharing because "same scene" is not accepted; news lines also get their own pictures.
- (06:00Z) Character light layer: option A chosen, NO overlay; characters keep original colours in all 4 buổi. Only grade backgrounds.
- (06:00Z) Character cheeks turn black on dark backgrounds (cut-out bug, alpha holes in the face) → scan every person image, patch alpha in code.
- (06:05Z) The eunuch buy/sell panel uses EXACTLY the person dialog (same component, same size), not bigger.
- (06:10Z) Landscape: every landscape screen uses EXACTLY the iPad layout (1180x820 design frame) scaled up/down uniformly like resizing a window, no re-layout; Fold portrait: 755x1000 frame scaled. One layout per orientation.
- (06:12Z) Small text on phone landscape: accepted, no separate layout.
- (06:20Z) No review queue: whichever batch finishes and passes review first goes live first; run several reviewers in parallel, each merging onto the latest main.
- (06:25Z) Bad weather (storm, heavy rain, snow, ice): going out costs extra walking khắc + possible cold / slipping (real risk when pregnant), reduced by umbrella/rain cape/sedan/someone shielding; shown on the card and announced when it happens; NPCs same rules.
- (06:35Z) Tapping a character on the stage → opens EXACTLY the kit person dialog (full-body person left, info right), not a private frame.
- (06:35Z) Portrait frame must show the full jade pendant + tassel (currently cut off at the bottom).
- (06:40Z) Weather rule correction: NO extra walking khắc (Sức already recovers slowly, no double penalty). Cold/slipping is a Mất of OUTDOOR acts (garden walk, blocking the imperial procession in the garden, kneeling in the courtyard…), shown on that act's card, not on the walking card.
- (06:50Z) Everyone's attitude to her (servants included) uses only ONE word "Thiện cảm"; drop "Lòng". Person names must not contain numbers.
- (06:55Z) Pace: KEEP the current speed (16 khắc/week, reaching Hoàng hậu ~188 weeks, ~2–3 hours of real play). Don't speed up.
- (07:00Z) Relation direction colours (shared kit, every worker must use): OTHERS → ME = PURPLE (#7a4fa0); ME → OTHERS = BLUE (#2f6f9f). No green/red (reserved for Được/Mất). Colour the label text too; changing numbers still use gain/loss colours. Kit function kitRel(dir,text).
- (07:05Z) The people strip in Hậu cung shows only NAMES (drop titles like "Thái y"); tap to learn who. No cut text.
- (07:10Z) Words for OTHER people must be clear third person: women "nàng ta", men "y"/"hắn", Emperor "bệ hạ", Thái hậu "Thái hậu", neutral "vị ấy". "Ta" is the player.
- (07:10Z) Giao tình › Ân oán: the person picker uses small tabs + the kit horizontal people strip like Hậu cung, not a grid of big buttons.
- (07:10Z) The figure in person dialogs nearly fills the column (≥95%), applied to every person dialog via the kit.
- [x] LIVE 482a99f97 (07:08Z): balance-unified — 4 buổi, handmade items, wardrobe merged into Tư trang, co-op with 4 buổi.
- (07:15Z) Relation lines (thiện cảm/oán) use ONE kit component: label; "word · number" one line + bar at the same position/length on every line; thiện cảm has a centre mark (negative/positive), oán/ghen (non-negative) fill from the left but same size; oán also has a word ladder.
- (07:20Z) Character name + rank ALWAYS ABOVE the portrait/figure (small rank line, then name line), everywhere; one kit component kitNameRank.
- (07:25Z) Keep TWO separate stats: thiện cảm (like/dislike, decides whether they help) and oán (resentment for past deeds, decides retaliation, fades over time). Keep the word "oán" (not "thù"). Tapping the label shows a short explanation.
- (07:35Z) Đáp ứng rank: drop the brown colour (looks like a servant). Change background/frame/jade to pearl ivory white, elegant, distinct from Lãnh cung. Sample first.
- (07:45Z) Act pictures: inventory of 713 meanings → draw ~613 more pictures (≈29,500 credits, under the draw-without-asking order). Each Tuần lục line = one act = one picture (follow-up reaction sentences merged into the first line). The Emperor doesn't wear a Qing-style feathered hat; costume in the original style (crossed-collar robe), no cheongsam-style collar.
- (07:50Z) Đáp ứng: settled on IVORY WHITE (warm ivory, not pure white); text/chips use a deeper ivory-champagne code for legibility.
- (07:50Z) My character has a court emblem (not a plain arrow) above her head on every screen, with a light effect (float + soft glow), drawn with Magnific; only her, not NPCs.
- (07:55Z) Emotion icons (emo-*): keep the round chibi faces but redraw in the game's painting style (soft, muted colours, thin gold outline, no thick black lines).
- (07:58Z) Emotion icons get no text; tapping shows the emotion's name (Vui, Buồn, Giận, Hờn…) + reason if any.
- (08:00Z) Label for items in use in Tư trang: only ONE word "Đang mặc" for every item (drop "Đang cài", "Đang đeo"…).
- (08:05Z) Items gifted at game start (family, relatives) must come out of the kitReward brocade box/chest (exists: tap to open, chest shakes, lid pops, items fly out by grade). Entering the palace with a rank → Nội vụ phủ grants a rank OUTFIT SET via chest; every promotion also grants the new rank's set. NPCs same rules (no animation).
- (08:10Z) Equipment slot panel (Ô cài tóc…): use exactly the kit's standard dialog size, not bigger; top: small item cell left + info right; note line spans the width; compact act buttons (2–3-col grid or full rows as fits); remove the "Lui" button.
- (08:20Z) EVERY time items/silver reach her there is a tap-to-open/receive animation: gifted = brocade box; rewarded/granted = tray/chest/imperial chest; found/searched = cloth bundle/pouch; bought = item flies into the bag, silver flies out; sold = item flies away, silver flies in; lost/confiscated = item fades and falls + notice card. Several items at once go in one chest. One shared function kitGain/kitLose.
- (08:35Z) Top bar: option A chosen (place button under the time block, right column).
- (08:35Z) Demoted/sent to cold palace: above-rank items are CONFISCATED in a scene — Nội vụ phủ eunuch (person dialog) takes each item cell onto a tray, announcing the confiscation by decree.
- (08:40Z) Đáp ứng frame: use the plum-branch wood frame + gold corners (the current Lãnh cung frame style, refreshed, nicely glossy) with ivory brocade inside; the Lãnh cung frame becomes a clearly withered/grey version. The Hoàng quý phi frame must be grander than Quý phi.
- (08:40Z) Chest opening receive step: remove the white info box; each item cell has the grade name on the frame border, item name right under the cell (silver: "Bạc +20").
- (08:45Z) Sound: every game moment needs sound (buy, sell, receive gift/reward/grant, open chest, confiscation, minigames, weather, ceremonies…), gentle court style; inventory + fill gaps (review/sfx).
- (08:55Z) Honour podium (Bảng vàng + every contest): characters big, most prominent; the podium shrinks to just the name-plate cell under the feet; 1st/2nd/3rd medals at the top right of the name-plate cell (or beside the figure). Ranking list: portrait frame by the life's highest rank. Remove duplicate title: only "Bảng vàng".
- (09:10Z) Add a BREACH-OF-ETIQUETTE rule: formal occasions (thỉnh an, banquets, festivals, meeting/serving the Emperor at night, investiture) without rank-correct dress → lose some Đức/Danh + host's thiện cảm; warned on the card beforehand; NPCs same rules.
- (09:10Z) Đáp ứng frame: gold too bright → paler, dimmer, smaller (champagne/silver), fitting the lowest rank.
- (09:10Z) Emotion icons: must show each emotion CLEARLY (Vui with bright open eyes, not squinting; Giận clearly angry); draw the full set and resend.
- (09:15Z) Empty outfit slot (confiscated/robbed/none yet) → she wears TRUNG Y by rank tier (low: white silk … Hoàng hậu: pale yellow silk), modest. Going out/meeting people in trung y → lose Danh, serious breach of etiquette; there is an event of being robbed of clothes on the road (with a cause, announced immediately) → must walk back in trung y. NPCs same rules.
- (09:20Z) Act pictures: check anatomy closely (hands, fingers, hands attached to the body) — act-khong-ban-chinh-su has wrong hands, redraw; re-audit all of batch 1.
- (09:30Z) Every morning offers "Điểm trang": outfit-choice minigame (by the day's occasion) + makeup minigame (clumsy → exquisite). Result affects how others see her that day by their nature: those who like simplicity praise, sticklers for etiquette see plain dress/bare face before superiors as disrespect; showiness draws jealousy/criticism. Skipping doesn't block. NPCs same rules. (review/toilette)
- (09:45Z) Trung y: approved 4 rank groups (white / ivory / moonlight white with silver trim / pale yellow Hoàng hậu with clear trim), ~32,000 credits; drop the 4 old looks; the outfit slot stays truly empty until she wears another dress, Nội vụ phủ reissues after a few weeks by chest; undressing in her own palace is not penalised.
- (09:55Z) Đáp ứng frame: plum-branch wood still comes out bright orange → try (A) the OLD Đáp ứng frame (grey-brown wood) + ivory background, (B) a very pale pastel plum-branch frame. Portrait inside the frame still small (head far from frame edge) → fix kit portrait placement so the head is near the top edge, face bigger.
- (09:55Z) 22 pets redrawn in the game's painting style (not realistic), natural poses, no cushions/rocks/pedestals; birds perch in a cage or on a stand; fish in a bowl.
- (10:00Z) Pets: Thường–Tinh phẩm are real animals; higher grades are increasingly legendary (nine-tailed fox, baby qilin, jade rabbit, baby phoenix, spirit tortoise, divine white deer…), no ordinary lions/tigers/foxes. Update jpet data too.
- (10:00Z) Each finished batch gets its own reviewer immediately, no queue (open more reviewers when needed).
- (10:05Z) Emblem above her head: 8 tiers, one emblem per rank (gold phoenix on jade clouds = Hoàng hậu; jade lotus bud = a middle tier; drop design 1; no tassel). Only a gentle bob up and down, no glow. One shared ratio: fixed distance above the head top in every image. The emblem is an item: in the chest at every promotion, in Tư trang, press Dùng to switch, old emblems kept.
- (10:05Z) Trung y: style approved; huadian must be the shrunk version (sample uses unfixed original art).
- (10:08Z) Trung y: 8 tiers, each tier's colour = the rank colour of the portrait frame background (pale, plain silk): Đáp ứng ivory, Thường tại pale green, Quý nhân pale blue, Tần pale pink, Phi pale purple, Quý phi pale rose red, Hoàng quý phi pale amber orange, Hoàng hậu pale yellow (~64,000 credits).
- (10:10Z) Emotion icons: APPROVED. Fix "Sợ": anime-style pale face (top half pale purple/blue fading down) + fear mark above the head (like the anger mark).
- (10:15Z) Relation wording: "thiện cảm" wins (drop the "quý ngươi" rule in KIT §31.20). Every act must go through one odds function odA (one source).
- (10:20Z) Pets grow: Non → Trưởng thành → Linh thú, each stage unlocks more effects; Ngự tứ only saves a life once fully grown. Virtual-pet care: full screen with the pet's picture, stats Đói/Sạch/Vui/Tình cảm, minigames feed/bathe/play; neglect → sick/sad/runs away (with notice). Art: each pet has young + adult pictures.
- (10:30Z) Top bar: her portrait cell as large as the whole name block (currently too small, empty space above).
- (10:40Z) Other people's pets: visiting another's palace (NPC or hảo hữu in co-op) she can help care (+thiện cảm), harm (abstract), steal (bigger pets harder, may bite, may get caught). NPCs do the same to her pet. Same rules, full cards.
- (10:42Z) Pets grow through 4 stages: Non → Thiếu niên → Trưởng thành → Linh thú (art for the first 3 stages; Linh thú = adult art + aura effect).
- (10:45Z) Each pet stage gets its own picture (4 pictures/pet, Linh thú also its own, more majestic) — 88 pictures.
- (10:50Z) Pets: baby qilin + white deer are lovely → style reference. Cat, dog, parrot still realistic → redraw every real animal in the qilin/white-deer style.
- (10:52Z) Remove the tortoise from pets: Linh quy ngàn năm → Thiên mã (Ngự tứ); Bạch quy → Hạc đỉnh hồng (Trân phẩm).
- (10:55Z) Pet markings by stage: young few/none, more beautiful as it grows, Linh thú most beautiful.
- (10:57Z) Linh thú: differs from adult by the painting itself (majestic pose, coat/markings/ornaments), NO glow effect.
- (11:05Z) Tư trang split into 2 small tabs: "Việc" and "Túi đồ" (bag + Đang mặc slots visible at once, no scrolling).
- (11:05Z) Remove the start-of-buổi "Tin trong cung" frame (duplicates Tuần lục, confusing). Others' news goes only into Tuần lục (with a new-news mark). Things affecting her are still announced immediately with a short clear card.
- (11:05Z) Some characters' facial skin dirty/dark streaks → scan everything, propose light cleaning (no face redraw).
- (11:10Z) Linh thú: aura allowed but PAINTED INTO the picture; each pet has its own Linh thú picture. Change: Kỳ lân up to Ngự tứ, Thiên mã down to Tuyệt phẩm.
- [ ] (11:10Z) Unmet people still show their faces in news cards and Tuần lục pages → kit-fig2 audits every place that draws person images.
- [ ] (11:20Z) News card: Tịch Nhan/Ngọc Hành pictures show the wrong person, cell backgrounds same colour despite different tiers → kit-fig2 shares images with Hậu cung + frame colour by current tier.
- (11:30Z) Đáp ứng frame: APPROVED A (old frame + ivory brocade).
- (11:30Z) Head marks: all 8 are lovely; SWAP: the current Hoàng hậu mark goes to Hoàng quý phi (tier 6), the current Hoàng quý phi mark goes to Hoàng hậu.
- (11:30Z) Portrait in frame: NO zoom; keep the old ratio (chest up), only MOVE the image up to the frame's top edge → shows more down toward the waist.
- (11:30Z) Pets: fine as they are; small dog ok; ONLY the cat is still realistic → redraw.
- (11:30Z) DECISION REVERSED: KEEP the start-of-buổi news card (daily news matters; Tuần lục is only the weekly summary). Clearer name: "Tin trong cung hôm nay". Fix the Triều chính picture.
- (11:30Z) Facial skin: besides cleaning, faces must look rosy and healthy (light blush, not heavy); fix pale/wan faces.
- (11:35Z) Portrait in frame: the BODY must be horizontally centred in the frame (many images lean left, gap at right edge); the head may be slightly off. Keep ratio, only shift.
- [ ] (11:40Z) Thỉnh an Thái hậu/Hoàng hậu pictures wrong: modern-style bow, tight cheongsam-style skirt → redraw the vạn phúc pose (hands together at the hip, slight knee bend, head bowed) + wide-sleeved court dress, straight skirt; audit every act picture with tight skirts/modern bows.
- [ ] (11:45Z) Tapping outside to close the result card (THÀNH) falls through to the button below → runs an act. Rule: for every open card, the first outside tap ONLY closes the card, never falls through (kit-close fixes + tests).
- [ ] (11:50Z) Skill Nấu nướng: before playing it already shows BẠI, takes Sức −15, Bạc −6, all the buổi's khắc → the act ran twice (suspected tap-through). Rule: each tap runs once only; an unplayed game deducts nothing and gives no result (act-audit fixes + tests).
- (11:55Z) Makeup shows on her face: light → normal face; pretty → light blush, pink lips, brighter skin; overdone → gaudy, overly round red cheeks, deep red lips, white powder (comic). Shown everywhere her image is drawn during that buổi/day.
- (12:00Z) Correction on the Nấu nướng bug: NOT a tap-through. One tap deducts and shows BẠI immediately, only then the game appears. Correct order: tap → game → after playing deduct and show the result card. Audit every act with a minigame.
- [ ] (12:05Z) Handmade item (fair-quality candied fruit) has no picture, generic name "Tác phẩm tự tay · Thường" (wrong grade), no receive animation. Rule restated: EVERY item that appears must glow in its grade colour, tap to receive and it flies into Tư trang (game-feel fixes + tests every place items are added).
- LIVE CDN (12:05Z) Thỉnh an Thái hậu/Hoàng hậu redrawn (vạn phúc, wide court dress).
- (12:10Z) Giving gifts: left picture cell = the item (not Triều chính); right frame = item info (grade, maker, date/time, use); recipient list split into tabs like Hậu cung (Chí tôn/Phi tần/Nam nhân/Cung nhân). Audit every dialog that still falls back to the Triều chính picture.
- (12:10Z) Varied handmade works: each kind (cooking, embroidery, painting, calligraphy…) ~10 items per grade, each with its own picture, higher grades look grander.
- LIVE CDN (12:10Z) Đáp ứng frame A + 8 head marks (6/7 swapped). Code is on review/rank0-ivory awaiting review.
- (12:12Z) New Thỉnh an picture: owner APPROVED (use as the reference for the vạn phúc pose + court dress in redraws).
- (12:20Z) The Triều chính picture showing up everywhere is because many events have NO own picture and fall back to the default. To do: find every image used for 2+ different events (and every default fallback) → draw own pictures for the missing events.
- (12:25Z) Handmade minigames must match the dish: choose the dish first (recipe with picture) → the game's ingredients/steps belong to that dish (chicken soup: chicken, ginseng, lotus leaf…; beauty sweet soup: lotus seeds, longan, white fungus, red dates…) → the product is that dish, correct picture, grade by score.
- (12:25Z) Add the choice "Bỏ độc vào" when gifting food/drink/sachets (needs poison). Odds by Tâm cơ, whether the recipient tests for poison, thiện cảm, item grade. If exposed it's traced back to her. NPCs do it to her too; she has "Thử độc". DEFAULT (owner may change): poisoning the Emperor and Thái hậu not allowed (food tasters, crime of lèse-majesté).
- (12:35Z) App logo: use the girl in the red phoenix crown at the centre of the loading-screen painting as the app icon (192/512/maskable/apple).
- (12:35Z) Red seal "Trân nữ" (Phượng Lệnh, seal.js, SVG) placed at the top RIGHT corner of the top-bar frame (where owner circled), not covering the quẻ text.
- (12:35Z) Card for an item someone else is using: picture cell = that item.
- (12:35Z) New kit kitActCompact: when a person figure is on the left, the act cards on the right use a small picture + info beside it, no text overflow.
- (12:35Z) Nghỉ dưỡng sức (+20) vs nghỉ một lát (+6) same price → distinguish: dưỡng sức evening only, ends the buổi, needs tonic/silver; một lát any time, 1 khắc.
- (12:35Z) Room on a rainy spring afternoon gloomy like the cold palace → grade weather/buổi warmer, softly brighter.
- LIVE CDN (12:35Z) 88 new pet images (22 pets × 4 stages) + 18 act pictures fixed to the vạn phúc pose.
- (12:40Z) Rebuild in game UI (kit, with pictures, not like text pages): Tài nghệ tab, Mệnh truyện tab, Việc nhờ tab.
- (12:45Z) Children's portraits (Hoàng tự) each zoomed differently → normalise by head size for EVERY portrait family (children, công tử, servants, Emperor…).
- (12:45Z) A newborn cannot have "Hiền tài". At birth only TƯ CHẤT (innate, hidden, only hinted via ladder words). Văn/Võ/Đức start near 0, grow through teaching (tutors, mother, Emperor), multiplied by tư chất. Hiền tài derived from Văn/Võ/Đức, considered only from age 6. Before 6 succession ranks by legitimacy/seniority + Emperor's affection.
- (12:50Z) Hoàng tự trong cung (other consorts' children): must show what the whole palace knows (mother, age, birth order, title, who raises them). Unmet children: grey child silhouette everywhere.
- [ ] (12:55Z) Thái hậu figure (Tuần lục) cut straight, losing the left corner of the robe → extend the robe, re-cut; audit every full-body figure cut straight at an edge.
- (13:00Z) Person event dialog (VIỆC · Có người đến…) too big: use the kit's standard person-dialog size, fitting content; name + rank ABOVE the figure.
- (13:00Z) Đoan ngọ invitation uses the Triều chính picture + tiny people, labels covering heads → needs its own picture (dragon boat), fix the overlapping labels.
- LIVE CDN (13:00Z) 136 act pictures batch 3.
- (13:05Z) The filter button row (Tất cả/Nghỉ ngơi/…) floats over cards while scrolling → fix it right under the stats frame, OUTSIDE the scroll area; only the list below scrolls. Kit rule for every tab.
- (13:05Z) Owner asked about Nhịn/Đáp trả balance: done in review/ts-b (cfbffb955), under review (R2), not live.
- (13:15Z) Shared template kitEventDp for EVERY event where a person appears: left = full-body figure (name above); right top = event picture (landscape); middle = info; bottom = choice buttons (short two per row or long, depending on content). Landscape picture: crop from the portrait image by focus point if possible, draw landscape only if not.
- (13:15Z) The Emperor's daytime card must have acts: request an audience, offer soup, offer a painting/poem/item (chosen from the bag), attend at chess/zither, invite for a garden walk; Thái hậu similar.
- (13:15Z) "Chân tình" is currently a hidden nature test → change to a real cause, shown in "Vì sao" (handmade for the right person + close enough). Add an explanation of Ân tình.
- (13:15Z) Shared-image audit: don't redo the act-picture part (act-pics2 already has the meaning map), only audit dialogs/events/news cards.
- (13:20Z) Self-study flower arranging shows a book picture → split the generic "Tự học" image into one per subject (flower arranging, calligraphy, zither, chess, painting, cooking, embroidery, dance…), do first.
- (13:20Z) review/kit-close round 2 ready for review (Tư trang 2 tabs, news card kept + renamed "Tin trong cung buổi này", tap-through guard) → R5. ts-a returned → af76 fixing.
- (13:25Z) The gift-return event (Khương Lạc Anh) plays a senseless laugh → sound follows the event's meaning. Event choice buttons lack Được/Mất → audit ALL events, every choice must have Cần/Tốn/Được/Mất + certainty level + Vì sao; remove "TỐN không".
- (13:30Z) URGENT BUG: event choice buttons (night-service pillow talk…) lose Được/Mất even though the code has them → the choice renderer drops the result text. Fix first (af76, review/opt-render).
- (13:30Z) Night service gives Sủng +5, Đức +3, Ân tình +6 yet stamps BẠI → the THÀNH/BẠI stamp follows only the act's real outcome, not line counting; others' jealousy is KÈM, merged into 1 line; trace the source of Bạc −5.
- LIVE CDN (13:30Z) 200 item images with fixed cut edges, Chinese characters removed, dance dress/dance/chess problem redrawn. j83 variety: option A chosen (10 items × 4 grades).
- (13:35Z) Dialog image audit done: 290 dialogs (118 meanings) use only 23 images; 16 images shared; 121 meanings need their own image (76 fall back to default) → act-pics2 draws them, compositions croppable to landscape for the event frame.
- (13:35Z) Coordinator settled daytime Emperor acts: Xin hầu cờ (needs Kỳ), Xin đánh đàn (needs Cầm), Mời dạo ngự hoa viên (no storm); once per day, shared with Xin yết kiến; NPCs can do them too.
- (13:35Z) Trung y batch 1 (c01–c12, 8 tiers) passes; keep, push to CDN when the branch passes review.
- (13:40Z) BUG: "Nàng oán ta 2.36000…" decimals → round every stat when written + fix old saves; "thù" → "oán"; Tuần lục logs the CARD's text instead of the real outcome → log the real outcome.
- (13:45Z) Tuần lục: overflowing text cut at the page bottom; copies the card's instruction text verbatim (Dùng chứng cứ…) → log the event concisely, long pages continue on the next page; chips never wrap.
- (13:45Z) Thái hậu robe cut: caused by the Tuần lục layout (widest figure cut by a narrow column), fix CSS, don't draw more. Pale skin: fix 807 portraits (a*<8.0). Edge-cut figures: re-cut from the source sheet first.
- (13:55Z) Mệnh truyện hiding a witness costs 40 silver for no reason, no gains/losses → add gains/losses, a silver-free path, price by rank, allow postponing a few buổi.
- LIVE CDN (13:55Z) 19 separate Tự học pictures per subject (wired in code when act-pics2 reaches main).
- (14:05Z) REVERSES KIT §28.6 (11/14: event choices show only Tốn): owner wants EVERY choice to show full Được/Mất/certainty. review/opt-render.
- (14:05Z) Owner's night notes: mood cells for male characters; act buttons with consorts must have small pictures; rebuilt tabs must have sub-tabs; event success/failure must change her mood + face; the flower-arranging game must be a flower-arranging game (each item its proper game); the "trả quà" event must involve a real gift; after tranh sủng + bath it must go to a new day; crying sounds like laughing → replace; Ân tình/chân tình numbers must be VISIBLE; expensive materials must be worth the money; send rosy-skin sample + makeup sample.
- (14:15Z) Tuần lục: every line uses the same picture of her room → each line type gets its own picture; if none, show no picture, never repeat the room picture. Choice lines need context (a bare "Mặc kệ." is wrong).
- (14:30Z) REVERSED AGAIN (owner remembered setting the rule herself): choices in ALL events (main story, side story, festivals…) do NOT show Được/Mất/certainty, only the price (Sức/Bạc/khắc) + Cần conditions. KIT §28.6 stays. In return: a worker bot-audits the balance of all event choices, no choice dominant/too costly, no skew in the paths to Hoàng hậu/Thái hậu/nữ đế.
- (14:30Z) Act button pictures in the person card: any act without its own picture gets one DRAWN; group pictures banned (owner very annoyed). If none yet, leave it empty rather than a group picture.
- (14:30Z) Mood cells must show the causes currently acting (her and every NPC).
- (14:35Z) Makeup: "đẹp" slightly less blush; "diêm dúa" = the current "đẹp" blush a bit stronger (deeper lips, glossier powder), still pretty, NOT clownish.
- (14:40Z) Reactions to outfit/makeup (strict host punishing a bare face, jealous people, the Emperor liking/disliking, consorts teasing gaudiness…) must SHOW AN EVENT FRAME, not silently in the log. Max 1–2 frames per occasion, the rest merged.
- (14:50Z) RULE: when the owner reports one bug, fix the WHOLE GROUP (e.g. expensive materials not worth it: audit every skill/item + every pay-more-for-better choice). Recorded in WORKER_BRIEF; coordinator restates it in every assignment.
- (15:00Z) APPROVED: new makeup version (đẹp + diêm dúa, a820a52ab). APPROVED rosy-skin sample → fix 807 portraits. Male mood cells: only male/female needed, but the middle-aged male set already made is used anyway.
- [ ] (15:00Z) Huadian on face c05 in outfits t5, t8 still big → shrink + audit every consort portrait.
- (15:05Z) APPROVED event-choice design: show price + Cần; one verbal HINT line (no numbers, truthful); labels an toàn/có rủi ro/liều; hints get clearer with Tâm cơ/Tai mắt. After choosing: result card with full Được/Mất + Vì sao. Active acts (Hành sự, person card, shop, gifts) still show full numbers.
- (15:10Z) CORRECTION: NO "same situation, same tendency" (players memorise → boring). Outcomes depend on the context at the time (randomised natures of the people involved each life, mood, relations, who is watching, hidden preferences), so the best choice changes by life/day; hints are true for the current context. Skilful play MUST clearly beat random play; random play must be punished, demoted, sometimes killed. Balance goals: no choice always right in every context; a hint-reading bot clearly beats a random bot; a bot always picking one slot loses.
- [ ] (15:30Z) Tuần lục person page: the top chip row differs per person, HIỆN NAY misaligned/cut text/bare "thiện cảm"/"Nàng ta oán ta 4.24", 2-colour chips, lines with only a name → one fixed template for everyone, integers, wording via kitRel (fix-float).
- LIVE CDN (15:30Z) 17 person-card act pictures + 10 makeup reaction images + dialog images + 46 missing pictures; ACTS.json merged (points only to existing images).
- [ ] (15:45Z) Sổ tuần: turning the page makes the character figure and the right text column flash → page turns must not redraw from scratch/flash.
- [ ] (15:45Z) The "VIỆC · <cung>" box on visiting another's palace (Chung Tú cung): KEEP the palace banner + people silhouettes as now (owner OK). Below the banner: LEFT the palace head's portrait (Phi Đoan Mộc Tử Yên; grey silhouette if unmet), RIGHT the explanation (at the palace, lower-rank guests must pay respects, needs 2 khắc has 1…). At the bottom the buttons (Vào thẳng không bái kiến…); remove the Thôi button (close via ✕).
- (15:45Z) Owner asked to HAND OVER to a new session and CLOSE this one (credit cost). Save everything the owner said.
- [ ] (16:40Z) Dư đồ: evening with 4 khắc left yet no Bái kiến button (afternoon with 1 khắc is correctly not enough). Bái kiến must show when there are enough khắc; if evening audiences aren't allowed the card must state why. Audit every act with khắc/buổi conditions.
- [ ] (16:40Z) Trường Môn viện (cold palace): "Phế phi họ Lý" shows an empty frame, no figure → every story side character (deposed consort, side-story NPCs) must have a figure (draw if missing); audit the whole group of NPCs without images.
- [ ] (16:40Z) Weather "nắng gắt" in the evening → weather must fit the buổi (evening: clear sky/bright moon/muggy, no sun). Audit the whole weather × buổi table.
- [ ] (16:40Z) Tapping her figure on the stage shows a faint blue rectangle over it (tap area/press effect exposed) → remove; press effect must follow the figure's shape or be absent.
- [ ] (16:40Z) Bottom corner button still says "Qua ngày" (must be "Sang ngày mới"); the "Đã mở bản mới" chip covers the scene title.
- LIVE CDN (16:40Z) pushed every image still on the machine before closing the session: 22 Tổng lược line pictures (act-pics2), 384 figures + 384 trung y portraits c01–c12 + FIGURES-ty.json, fig-eunuch-ndp-tray.
- (16:50Z) Huadian on the CDN (e.g. c05 t5 moon, t8 bird) the owner still sees as BIG → shrink one more size: sample a few faces for owner approval first, then batch. (This is new work, not redoing old work.)
- (16:50Z) LUẬT KIT TRƯỚC (KIT-FIRST RULE, restated, priority #1): EVERY place showing info (chips, stat rows, relations, cards…) across the game must come from the standard kit. Workers must NOT write/draw their own style. No kit yet → worker stops, reports to the coordinator → build the shared kit component, record it on the kit page (KIT.md + kit sample page) → only then workers use it. Fixing Tuần lục means switching to the standard kit and auditing the whole game, not just Tuần lục.
- (16:50Z) ACTION pictures (Hành sự, person-card acts, self-study…): minimise people, only hands, a corner, objects, like the existing Hành sự pictures. Main/side story event pictures may have people.
- (16:50Z) Explaining "thù": the old game still had a leftover "thù −15" in the log (bug); the fix changes all to "oán". Owner keeps the rule, "oán" stays.
- [ ] (16:55Z) Tuần lục: "Chứng cứ về Khương Lạc Anh +1: Khương Lạc Anh tặng Trâm gỗ đào cho Tống Cẩm Tú" → an ordinary gift is NOT evidence; evidence lines must state the real source (who, what), not stick to other events (suspect j25 attaching the week-change line to a log line). Same page: Đáp ứng/Thường tại ranks mixed up, decimals, "Nàng ta oán ta", chip "thân +7" not per kit, ".." marks. Handed to session 6.
- [ ] (16:58Z) Tuần lục (Mộ Dung Tịch Nhan): "oán ta +3" and "đến +23" split into 2 chips of 2 colours; the log still copies the card's promise text (khoảng +3 đến +23) instead of the real outcome; name chip wraps to 3 lines; "6.6" decimal. Handed to session 6 (same Tuần lục kit-fix group).
- [ ] (17:00Z) Tuần lục: the "Triều đình · thiên hạ" page has only 1 line, the rest of the page empty (owner sent a shot without words; coordinator read it as wasted page) → short sections share a page, new page only when out of room. Handed to session 6, ask owner again if she meant otherwise.
- [ ] (17:02Z) Gift brocade box: items fly out too fast → slow down, each item appears with a glow, pause to admire (every chest/box/pouch); item cells show only LETTERS "Á","T" instead of pictures (Áo lụa Hàng Châu vân thủy, Thoa bạc song điệp) → audit every item missing a picture and draw; grade label "Thường" wrong (item is Tinh phẩm); news card still has the line "Sủng nàng ta 30 → 30". Handed to session 6.
- [ ] (17:04Z) Tin trong cung card (live): EVERY avatar in the lines is not the real person in the owner's world, even her own → prioritise reviewing + merging kit-fig2's news-image fix, then check on a real save. Same card: TA line repeats the investiture reason twice; evidence attached to the investiture line; Triều đình line "Sủng nàng ta 30 → 30" with empty icon/unclear who/no change; chips "thân", "Kho lúa", "nhà Hộ bộ thế lực" not per kit. Handed to session 6.
- (17:06Z) Story events must clearly say MAIN STORY or SIDE STORY (with story name, step). Events that demand resources (e.g. 40 silver to hide a witness) must give a DEADLINE to gather them, longer or shorter by severity; accept first, complete when enough, with a countdown; fails only when it expires. Audit every story event. Handed to session 6.
- [ ] (17:08Z) Invitation "Hội Phượng (thi cưỡi ngựa bắn cung) · Lời mời thi thêu": festival name and contest subject don't match → make them match or explain (embroider the banner for the winning team); audit EVERY festival × contest pair. Bedroom banner + Emperor pasted on + overlapping labels. Handed to session 6.
- [ ] (17:12Z) Owner no longer sees Có thai / Lật thẻ / Ân tình: still in the "Ân sủng ›" block on the right of the stage (collapsed by default, not visible from the Hành sự tab) → proposal: openable from every tab (tap the Sủng/Ân tình cell at the top), remember open state. The "Múa trong yến tiệc" card shows 2 duplicate Sức conditions (>20 and ≥5) → remove the duplicate. Handed to session 6.
- (17:14Z) The "Tuần lục" title on the book cover: draw with Magnific as old-style calligraphy (Vietnamese letters, no Chinese characters), beautiful; make 3–4 samples for owner to pick, then attach to the book top. Handed to session 6.
- [ ] (17:16Z) Small avatars (Tuần lục "Sổ này ghi" and every shared use) have an extra square border around the frame → remove the square, keep only the rank frame. Each person's name in a different colour → one kit style. Handed to session 6.
- (17:20Z) NEW RULE: promotion requires an EXAM. Meeting conditions (Sủng/Danh/Đức… + enough waiting time since the last one) only grants ELIGIBILITY TO SIT. Pass to be invested; fail and no promotion, must wait some time before retaking. NPCs too. Handed to session 6 (ask owner: do the maid/mama roads take exams).
- [ ] (17:24Z) Midday room still a gloomy single brown (fix on review/scene-light not live yet) → review soon. Weather "đom đóm" at midday (same weather × buổi bug). The Emperor grants an antique painting with no chest/animation (fix on review/game-feel; rewards must use chest/tray). Handed to session 6.
- [ ] (17:27Z) LUẬT · Ân thưởng box: 2-column table misaligned (each row's right column starts at a different spot) → one kit table, fixed-width label column, value column on one line ±1px; audit EVERY label|value list in the game + measuring test. Handed to session 6.
- [ ] (17:30Z) Stipend says "1 súc vải, 1 gói trà" but the chest doesn't contain them; monthly per-rank allowances don't go into the chest either → every issued/granted item must be a real item in the chest (with picture, usable) + stipend chest animation; audit every place that "gives items" only in text. Handed to session 6.
- (17:33Z) NEW FEATURE: monthly stipend skimming (as in palace dramas): due to lost favour, a recent offence/punishment/demotion, a resentful superior sending others to squeeze her, a greedy Nội vụ phủ eunuch not yet bribed… Show an event frame when the stipend arrives (coarse cloth, mouldy tea, missing silver) with the reason; choices: endure / bribe / send a maid to demand it / report upward / remember it. NPCs suffer it too. Handed to session 6.
- (17:36Z) Top stat bar: move DANH into the left group right after Đức (Sắc · Tài · Tâm cơ · Đức · Danh); right group only Bạc · Sức · Sủng. Handed to session 6.
- [ ] (17:40Z) The "Ân sủng" block on the right of the stage, when reopened, balloons, overflows the right edge, cuts text → open in place, column width, aligned. Her figure (Thường tại) has a black mark at the neck from cut-out → fix + audit black marks around neck/collar on every figure. Handed to session 6.
- (17:45Z) CORRECTION: Tuần lục does NOT pack pages. Each new section/story on a new page is right. The real bug on the Triều đình · thiên hạ page is the MISSING FULL-BODY FIGURE; every page must have a full-body figure.
- (17:45Z) Huadian: some tiers (Thường tại, Tần…) still big → measure per tier, propose a smaller size for every tier, send samples first.
- (17:45Z) The kit-first rule must be ENFORCED: paste it verbatim into every work/review assignment; reviewers fail home-made parts; workers log missing kit requests in dev/kit/KIT_REQUESTS.md. The rule sits at the top of dev/handover/WORKER_BRIEF.md.
- (17:45Z) Session 5 archived on owner's order.
- (≈17:50Z, owner said directly to session 6) Top bar — CORRECTS 17:36Z: LEFT group: Sắc · Tài · Tâm cơ · Đức · Danh · Sủng; RIGHT group: only Bạc · Sức. (Read 'Danh sủng' as Danh then Sủng.) Keep alignment ±1px, bar under Sức/Sủng, explanations, flying-number targets.
- (≈17:55Z, owner sent shot dev/owner-shots/1115-an-sung-ok.jpg) The 'Ân sủng' panel as in this shot is FINE: opens in place in the right column, same width as the person cards, label left / value right (Tai mắt, Có thai, Lật thẻ, Ân tình (đêm), Số lần ân thưởng, Bổng lộc). This is the standard; the 17:40Z ballooning bug must return to exactly this shot. No need for opening from other tabs (17:12Z proposal dropped).
- (≈18:00Z, owner) The 'Tuần lục' lettering: must be VERTICAL (fitting the vertical title slot in the book picture), and look older (ancient calligraphy, dry ink, like an old book/scroll label); still Vietnamese letters, no Chinese. The 4 horizontal samples v1–v4 dropped → act-pics2 redraws vertical d1–d4, fitted onto the right slot in the book picture.
- (≈18:02Z, owner) Owner going to sleep, tells session 6 to keep working. (PASS → push main; drawing/pushing CDN needs no asking; samples needing her choice get collected and reported tomorrow morning.)
- (≈18:05Z, owner) Worker watch reminder: once every HOUR (not 30 minutes). 30-minute reminder deleted, hourly schedule kept (minute 32).
- (≈18:20Z, owner — "FROM VICTORIA") CHATGPT IS THE FINAL CHECKER of all rules and numbers: AGENTS.md at the repo root (CLAUDE.md wins on conflict); chats with ROLES: DUYỆT A (seams, all game rules side by side) + VAI: DUYỆT B (item by item), add B2 only when the queue piles up; no role → "ROLE NOT GIVEN". Gate: items carrying rules/numbers/engine/design are FINAL only after "CHATGPT AUDIT PASSED: <branch> <head>"; owner's play doesn't wait (goes live after reviewer + Claude's tests, audit runs in parallel). Queue QUEUE.md + audit-fast/ on branch chatgpt-claims; reports docs/reviews/chatgpt/<branch>_Audit_<mm-dd-yyyy>.md; only BLOCKING reopens; claims as new files, earlier wins; ChatGPT only writes reports/claims/verdicts/logs, PRs from chatgpt/<topic>; each chat on an hourly schedule (owner sets it), runs memoryless; Vietnamese with the owner, never asks her (OPEN (hers) into the log). Claude on each wake: merge report PRs, redo OPEN_AUDITS, assign a fixer for every BLOCKED in that same turn.
- (≈18:20Z, owner) Add ONE ChatGPT COORDINATOR chat (VAI: ĐIỀU PHỐI): (a) reviews the whole game, (b) each sheet pasted S<n>; gives strengths/gaps/add-change, historically right palace intrigue (with sources), ideas from good games; each idea with risk, feasibility, size, how to catch/undo, ONE verdict; numbers only proposals. Doesn't write rules/numbers/code/design, no UI/art/voice. Pushes its answer to docs/ideas/ChatGPT_S<n>_Answer_VI.md (PR "ChatGPT S<n> answer") then tells the owner in 1 line. CLAUDE.md rule: every owner idea/bug/ruling on rules/numbers → ONE S<n> paste block for the COORDINATOR chat in that same reply; next turn merge + summarise for the owner + put the approved parts into the design as PROVISIONAL; S_LOG.md on chatgpt-claims; unanswered S<n> re-listed in every report.
- Done: main 62a0506ac (AGENTS.md, CLAUDE.md, docs/reviews/chatgpt, docs/ideas; synced OWNER_DECISIONS/WORKER_BRIEF/KIT_REQUESTS to main); branch chatgpt-claims 24f69f701 (QUEUE 3 items, audit-fast, OPEN_AUDITS, S_LOG S1).
- (~18:30Z, owner) LANGUAGE: from now on every repo work file is written in ENGLISH to save credits (this log included). Player-visible text stays Vietnamese.
- (~18:30Z, owner) REPLACES the 18:20Z ChatGPT setup: no per-item audit, no schedule, no gate. WEEKLY CHATGPT AUDIT only when she asks "đoạn audit tuần này" (one English paste block; report docs/reviews/chatgpt/Weekly_Audit_<date>.md via PR; Claude then merges, answers every finding ACCEPTED/REJECTED, fixes BLOCKING first, reports in Vietnamese). CHATGPT IDEA REVIEW only when she asks "đoạn điều phối tuần này" (one English paste with her open ideas from dev/IDEAS_OPEN.md; answer docs/ideas/ChatGPT_Ideas_<date>_VI.md via PR; Claude summarizes with adopt/park/drop). Done: main ebbbd9eff (AGENTS.md rewritten, CLAUDE.md rules, dev/IDEAS_OPEN.md); branch chatgpt-claims deleted.
- (coordinator note, 15/11 ~13:00Z) Promotion exam implementation choice to confirm with the owner: a son's birth no longer gives +1 rank immediately; it grants an immediate exam with conditions waived. Servant/mama road stays automatic until she decides.
- (~18:00Z, owner, screenshot Tuần lục person page) Figures standing in the book look bare → add a simple, pretty BACKGROUND behind full-body figures that suits the book; the same background is used behind the figure in person event pop-ups (kitEventDp left column). Different by identity: women vs men, and/or one per status — each consort rank, each maid rank, each male role. NOT room backgrounds (she is tired of rooms) — something different and varied. Coordinator: samples first for her pick, then wire as one kit part.
- (~18:10Z, owner) ITEM EVENTS: any event that offers/presents an item she could get (letter, gift…) shows the ITEM ICON in the event dialog; choices accept/reject: accept → the item flies into Tư trang; reject/burn (e.g. 'đốt thư') → an animation of the letter burning. Sweep ALL events involving items for matching animations (whole class). Owner asks for proposals of PEOPLE animations too (ideas list sent; waiting for her pick).
- (~18:15Z, owner) Event dialogs just pop up — wants nicer entrance animations. Example: promotion = imperial edict scroll. Main-story (chính tuyến) dialogs: frame style tied to her ORIGIN identity — 9 origins = 9 frame styles, recognisable as main story at a glance. Side stories (phụ tuyến): too many events, asked for ideas. Coordinator sent proposals; waiting for her pick.
- (~18:20Z, owner, on huadian sample) The 'after' size (0.07 × face width) is TOO SMALL — can't see it. Asked what the percentages are (before 9.5–19.5 % of face width; after 7 %). → new sample at a middle size (0.09 and 0.10, i.e. about the c03 t1 reference) for her pick; still no batch.
- (~18:25Z, owner) Tuần lục title: picked vertical variant d4 (title-tuanluc-d4.webp). Replace the small plum-blossom seal at the bottom with the 'Trân nữ' seal (the game's own red seal, jseal.js / KIT §39). Then wire it on the book cover label.
- (~next day, owner) Asked why only Ngọc Thanh các was checked for the brown/sepia wash — every other room/place must be checked too (whole-class rule). → audit worker: every place × 4 buổi × seasons × weather, before/after table, fix any remaining wash.
- (~owner, next day, reference screenshot of another game: title 'Huyết Mạch Đã Tỉnh' above the character name) The RANK line above names (kitNameRank: her and every character on stage/figures) should look like that: serif title in the RANK'S OWN COLOUR (rank frame colour family) with a soft glow/outline; the NAME line below in plain dark/black. Technique only, no assets copied.

## 15/11 ~18:30Z — Month calendar (owner)
- Add a CALENDAR like a real wall calendar: a month grid of 3 rows (one row = one tuần: thượng/trung/hạ) x 10 squares (days), with day numbers.
- Days that hold a festival of the year are marked in their square, so the player can PREPARE AHEAD instead of rushing when the notice comes.
- Keep it short: just the festival name, what contests it has, or short info about that festival.
- Only the fixed yearly festivals (common knowledge) go on it. Private contests, tea parties, private palace banquets and other surprise events do NOT appear on the calendar.
- Calendar entry (owner): a small desk-calendar icon in a corner of her room background picture; tap it to open the calendar.

## 15/11 ~18:50Z — Act pictures: no faces, not hands-only (owner)
- "Hands" was only an example. Each act picture shows whatever fits the act: hands, feet, a back view or a silhouette (e.g. dancing, spying/eavesdropping shown as a whole figure from behind or as a shadow is OK).
- Do NOT redraw a picture just to show hands. Existing whole-figure back views and silhouettes are fine.
- The ONLY hard rule: no visible face of any character (a face makes the player think it is a specific person).
- Background light: DARK background = scheming, plotting, negative acts; LIGHT background = normal acts.

## 15/11 ~18:45Z — Placeholder pictures for missing art (owner)
- Draw 4 generic palace-intrigue pictures used whenever an EVENT or an ACT has no picture of its own: event-light, event-dark, act-light, act-dark.
- Light/dark = tone (positive vs negative/scheming), NOT time of day.
- Purpose: when the owner sees one of these in play she knows that event/act still lacks its own picture and can report it; the coordinator can also list every event/act that falls back to them (easy to find as the game grows).

## 15/11 ~19:05Z — Portrait scale per group + makeup colours (owner)
- Young-boy portraits: ~140 are big-face close-ups. Zoom/crop the small-face ones to match the big-face ones instead of redrawing.
- Not every person in the game needs the same scale, but within EACH GROUP of people (boys, girls, consorts, maids, eunuchs, men...) portraits must share one face scale, so switching person to person never jumps big/small. Fix the whole class (scan all groups).
- Makeup mini-game, "diêm dúa" side: like modern fashion/makeup games, the colours she picks (eyeshadow, blush, lipstick; eyebrow if any) must show in THOSE EXACT COLOURS on her own character picture (portrait + figure). Today only blush shows; add lips and eyes without making the picture look off. The "đẹp" look already approved stays as is.

## 15/11 ~19:15Z — Thái y pulse check (owner question)
- Owner: no option to invite the Thái y to take her pulse; how does she know if she is pregnant or how her health is? Does the Thái y come monthly/automatically? (Coordinator answered with today's facts + proposal; waiting for her pick.)

## 15/11 ~19:35Z — Night-end and new-day pictures (owner)
- A closing picture for each night: NOT a picture of the bedding act, but the END-of-night mood: a warm/passionate night vs a cold/distant night vs a lonely night when she was not summoned. It shows how the night affected the Emperor's mood (liked / didn't like) and the rewards given.
- Add sound + on-screen animation by mood (e.g. happy night = soft laughter; unhappy night = a sigh).
- When she skips to a new day (no bedding that night), show a NEW-DAY picture that depends on the season (xuân/hạ/thu/đông) and on festivals that day; make it beautiful.
- Owner asked for more ideas of this kind.

## 15/11 ~19:50Z — Art completeness rule + handmade recipes (owner)
- ART RULE (every character ever drawn, incl. the new faces for suitors / foreign princes): full set of 4 AGE BANDS (18–25/26–35/36–50/51+). If the person can rise in rank, EVERY rank they can hold × 4 age bands.
- HANDMADE WORKS (j83, ~10 per type): she must NOT be able to make everything from the start. Each item needs its recipe/pattern learnt first — learn it, or BUY the recipe (recipe books / pattern sheets as shop items with their own pictures).
- Why it matters:
  - repeating the same item to the same person loses effect (the Emperor gets bored; after N times no points) — same for Thái hậu and consorts;
  - each person has likes and dislikes; a wrong gift may be refused or make them angrier;
  - some people have allergies; gifting what they're allergic to can make them accuse her of trying to harm them.

## 15/11 ~20:15Z — Teacher learning + sub-styles per art (owner)
- "Học với thầy" is almost never chosen: low ranks have no bạc for it, and at high ranks the arts are already maxed. Fix: lower the price a lot, or make palace tutoring free / paid in something else (check how learning in the palace should cost).
- Each art splits into sub-styles like dishes do (cầm: kinds of instruments/pieces; họa: kinds of painting; etc.). Each person has their own taste among them; a gift/performance only pleases when it matches. More variety and choice, and it stops players knowing everything too early/fast.
- Owner asked to see pet tiers, item/handmade art (sheets sent).

## 15/11 ~20:30Z — Session handover; story chapter labels; bạc-alternative balance (owner)
- Session 6 is heavy: hand over to a new coordinator session; workers report to the new session. Session 6 stays only until the remaining workers have reported, then is archived.
- Story quests: instead of only "9 tuyến báo thù cho nhà, bước 2/4", show the CHAPTER/ACT too (e.g. "Chương 1 · Hồi 3") so she knows which chapter she is in.
- BALANCE RULE for every choice that costs bạc: there is always another road (already a rule), AND that other road must cost an EQUIVALENT value. If 20 bạc buys Danh +1, the non-bạc road (Sức, khắc, favour, risk, items…) must hurt as much as 20 bạc does at that rank (bạc is scarce at low ranks, so value it by how hard it is to earn at her rank). Neither road may be the obvious pick: with only 20 bạc in the pocket she should hesitate between the two. A road that is too cheap makes the bạc road dead, and vice versa.

## 15/11 ~21:00Z — Pre-palace route status; face reveal when they approach her (owner)
- Owner asked if the route BEFORE entering the palace (tiểu thư ngoài cung, jkc.js) is done so she can start a new life. Checked: it is built on review/outside @ 0062c04d (owner-approved plan dev/OUTSIDE_PLAN.md) but was NEVER merged; it is based on a much older main (diff vs main: 129 files, −9.7k lines) → must be re-ported onto current main + reviewed before she can play it.
- FACE REVEAL (fix the whole class): she learns a face not only when she approaches someone, but whenever THAT PERSON appears to her in an event dialog (comes to talk, picks a quarrel, frames/harms her, any event box where the person is shown). From that moment the avatar AND the full-body figure show the real face (no grey silhouette), everywhere that person appears.

## 15/11 ~20:05Z — Big owner batch (recorded by session 6, assigned by session 7)
ANSWERS to open questions:
- Son's birth = direct promotion, no exam. Daughter's birth = exam. Servant/mama road (cung nữ road) = exams too.
- doat-giai pictures with the Emperor handing the prize: KEEP.
- Huadian size: 8.5%.
- Ngự tứ pet life-save stage: owner asked coordinator to recommend (Linh thú now vs Trưởng thành) → coordinator decides; pet bar label "No" vs "Đói": owner did not pick → coordinator decides.
- Co-op: helping/harming/stealing a friend's pet must be wired NOW. RULE: every feature must work in 2-player co-op; no "later".
- Animation/frames ideas: once ideas are given, BUILD them without waiting for approval. Any future needed animation: just do it.

BALANCE / SYSTEMS:
1. Thái hậu thỉnh an gives thiện cảm almost every morning (+8, "khá chắc"); she reached 50+ while consorts stay <5–10. Needs events that LOWER Thái hậu's affection, and her reactions must depend on her personality (some Thái hậu are harsh). Thỉnh an gain must not be a flat +8.
2. PERSONALITY SYSTEM for EVERY character (player included, same feature set for all): personality groups so people treat each other differently (not one colour); each person has a "trọng" (what they value), taken from the 13 virtues (hiếu, lễ, nghĩa…). Every action has a base scale; the gain/cost is scaled by the target's personality and trọng (more or less than base). Audit all people: whatever she has, they have; whatever they have, she has.
3. MOOD (The Sims-like) separate from the per-event emotion cell: a mood bar that goes up/down with successes/failures, events, needs; mood bands (vui/buồn/giận/hờn…) change success odds of her acts, her choices and how others see her (e.g. sad → someone who loves her comes to comfort her). Applies to NPCs too.
4. Stipend skimming (cắt xén bổng lộc): check whether only bạc is skimmed; also skim items (fewer items, or a lower grade than due).
5. Poisoning the Emperor / Thái hậu must be POSSIBLE (now never allowed): e.g. she hates him; story lines like a liaison with a Vương gia → poison the Emperor to put the Vương gia on the throne; kill a harsh Thái hậu. With proper risk/consequences.
6. Emperor visits in person: besides being carried wrapped to his chamber, sometimes the Emperor comes to HER palace and stays the night (rare; more likely at high Sủng). Gives more Danh/Sủng but more jealousy, Thái hậu may be displeased. Build + ideas.
7. Stolen clothes (cướp y phục): the theft may target the outfit she wears, an outfit in the wardrobe/mirror, etc. by event; if she loses her only outfit she must get a re-issue (Nội vụ phủ / stipend / family), never stuck in trung y forever. Show the odds when she answers back.
8. Start of a life as a thiếu nữ: a chest/delivery of her girlhood belongings appears; these clothes and jewellery (gold/jade hairpins, gold bangles, sachets…) fill ALL 6 slots with ordinary girlhood items and she may keep them into the palace (fallback outfit).
9. PROMOTION REWARDS: every rank-up gives a full set (dress + full jewellery set, plus extras like cloth, food, drink…). Two screens: (1) reward chest with items → Nhận; (2) then the new eunuch/maid assigned appears: full-body transparent figure big in the centre, with a cổ trang line ("Nội vụ phủ phụ cấp thêm …") → Nhận.
10. Header: the top bar keeps only HER info. Other people's info (Emperor Ân tình/Ân sủng, Thái hậu, Hoàng hậu…) moves to tabs in her room (tap the Emperor tab → his info).
11. SOUND by event GROUP (not per event): dramatic events → dramatic music, romantic → romantic, etc.; music AND human voices; game must not feel too quiet. Plus animations and screen effects.
12. Event FRAMES by event group, main story and side story (build).
13. Animations to build (all approved): people slide in / fade out of the stage; promotion = portrait frame changes to the new rank frame, rank chip text changes, light gold glow; demotion / cold palace = rank chip cracks and falls, frame fades to grey; dragged away for punishment = figure dragged off stage, screen dims; slapped / scolded = one-beat screen shake + brief red flush; death = figure greys, fades, white silk falls over; pregnancy announced = soft pink light around her; birth = swaddled baby appears in her arms / beside her; favoured = petals fall around her; poisoned = figure tints green then blurs; alliance / betrayal = red thread joins two people or snaps.
14. UPDATE NOTES: after each live update, a small notice (not always shown) — tap it to see what changed in that version; plus a button in Settings ("Thông tin cập nhật") listing each version's changes. Very short: only what went live / what was fixed. No long text.
15. Spawn a HISTORY expert worker and a GAME-DESIGN expert worker to dig ideas from palace-drama films/history that the game lacks → add them (then build without waiting).
- (coordinator s7 decision, delegated by owner 20:05Z) Ngự tứ pet saves a life only at Linh thú (top stage); Trưởng thành does not. Pet care bar label = "Đói" (owner's word): the bar shows hunger, higher = hungrier, warning colour when high.

## 15/11 ~20:10Z — Her own name (owner)
- Rank-title look: HER character's name is black ink with a soft light-gold glow/outline, so she can instantly tell which name is hers. Other people's names stay plain black (paper halo on stage only for readability).

## 15/11 ~20:15Z — Calendar ideas, Trân nữ seal on event frames, rosy skin mismatch (owner)
- Calendar: owner asked for more ideas to make it useful → coordinator listed ideas (below); per owner rule, build them without waiting.
  Ideas: (a) her own days: birthday, Emperor's/Thái hậu's/Hoàng hậu's birthdays (Vạn thọ/Thánh thọ/Thiên thu) with gift reminders; (b) stipend day, Nội vụ phủ issue days, monthly thái y visit if built; (c) KNOWN deadlines: exam/khảo hạch dates, tuyển tú year, pregnancy due month, children's birthdays and school exams, pet growth; (d) "sổ hẹn": acts she schedules ahead (send a gift on day X, visit someone) + reminder the day before; (e) prep checklist per festival (what contest, what art/item to prepare, ready ✓/✗ from her inventory and art levels); (f) lucky/unlucky days from the weekly quẻ (only known ones); (g) weather forecast for the coming tuần if she has the right servant/skill; (h) tap a day → past log of what happened that day (memory); (i) moon phases (rằm/mùng một) for rites; (j) co-op: the friend's important days visible too.
- Event dialog frames: add the Trân nữ seal (kitSeal "TRÂN NỮ" stamp) in a corner of every event frame.
- Rosy skin: some consorts' faces are now rosier than their hands (mismatch) → hands/neck/arms must match the face tone (whole class audit). Player look 1 (fig-player-look1) still does not look rosy → fix. Owner marked Ngọc Lan (maid) as the liked reference.

## 15/11 ~20:20Z — Thái y: build all 4 ideas (owner)
1. Routine pulse visit by the thái y once a month, free: short verdict (khỏe / hơi yếu / có bệnh).
2. "Mời thái y bắt mạch" anytime, small bạc cost (with an equivalent non-bạc road): clearer health state, can detect slow poison, musk (xạ hương) and other hidden harm already in the game (j40 plots).
3. Pregnancy: already found by the thái y 3–6 weeks after conception (j75) — keep; a requested pulse check may find it earlier (from ~1 month), or symptoms (nausea) hint at it.
4. A bribed thái y (S.court.ty.af bribes exist) may lie or secretly leak news; a trusted thái y avoids this.
All must work in co-op.

## 15/11 ~20:25Z — Monthly cycle (kỳ nguyệt sự) (owner)
- Every woman in the palace (her, consorts, maids who can be summoned) has her own monthly cycle. During it her card is taken off the flip (lật thẻ bài): however favoured, she cannot be summoned those days.
- The cycle record is kept by a palace office (Kính sự phòng eunuchs keep the book; a mama/thái giám of each palace reports dates). Whoever can read the book knows everyone's dates.
- Uses: proves which night a bedding was on and whether a child is the Emperor's (ties into j22 pregMismatch / Kính sự phòng ledger bribe), exposes liaisons (tư thông), and hints pregnancy (a woman who stops reporting her cycle). Bribing / reading / forging the book becomes possible (with risk).
- Show her own cycle on the calendar; co-op too.

## 15/11 ~20:30Z — What 'dark' means for pictures (owner)
- DARK picture for scheming/negative events/acts = gloomy, shadowy, ominous mood (âm u, tối tăm) like the first act pictures in Hành sự she liked — NOT simply a night-time sky. A daytime scene can be dark in mood (heavy shadows, cold muted palette, low light). LIGHT = normal mood. Applies to act redraws, placeholders, event backgrounds, everything with light/dark by tone.

## 15/11 ~20:40Z — NPC deaths/replacement, Phế phi họ Lý story, real side stories, fig-bg pick, event name tag (owner)
- Lãnh cung: when a real rival is sent to the cold palace, Phế phi họ Lý STAYS too (two people there). She only leaves when she dies.
- ALL NPCs can die. After a death: maids and eunuchs are replaced right away by a NEW person (new face/picture — never reuse the dead person's picture); some posts have no replacement (e.g. Phế phi họ Lý in lãnh cung: empty until a real person arrives).
- Phế phi họ Lý gets her own story line (a real side-story quest).
- SIDE STORIES must be real stories: every NPC carries a life goal / ambition / personal story; helping them fulfil it completes a side quest with rewards. Today's "phụ tuyến" are only small daily events (someone comes, frames her…) — real side lines need their own plot, like in games where a side line is the story of a secondary character.
- Event person dialog: remove the square box around the rank + name caption (circled "Tần / Liễu Phương Hoa"); put rank + name straight on the white dialog background.
- fig-bg: owner picks A = SILK HANGING SCROLL, drawn like a real vertical scroll with a rod at the top and a rod at the bottom (like an edict scroll held vertically); the person is painted ON the scroll. Fix: the Vương gia figure spills outside the scroll — figures too big. Inside the scroll ALL figures are the same size; the Emperor/men need not be taller than the others (tall men make the figure too big for the scroll).

## 15/11 ~20:50Z — fig-bg crop rule + card-flip (lật thẻ bài) scene (owner)
- fig-bg A (silk scroll): wide robes that would spill past the scroll edge are CROPPED to the scroll frame (accepted), never sticking out.
- END-OF-DAY CARD FLIP SCENE (big event → make it beautiful; Magnific painted scene / video allowed, but it must blend with the game's own animation so it looks like ONE continuous event, not pasted):
  1. Tray (Kính sự phòng) with every eligible woman's card = her existing avatar frame (the jade-pendant frame with tassel); NO back-side art needed (the Emperor knows the names; he chooses, not a lucky draw).
  2. Start: all cards lit. Then the ones in their monthly cycle (or otherwise barred) turn grey (animation), are lifted out of the tray; the rest re-arrange neatly (animation).
  3. The tray is carried/presented to the Emperor (animation).
  4. He picks: the chosen card glows and grows to the centre of the screen.
  5. If it is HER card, an extra animation tells her she was chosen.
  Coordinator to propose how (owner asked for the idea) and then build.

## 15/11 ~20:55Z — Painted, never code-drawn (owner)
- All day-closing / night / bedding / card-flip pictures and scenes must be PAINTED with Magnific gpt-2-6 (folder ba4aecfe…), never drawn with code (CSS/SVG/canvas shapes). Code only animates painted art (move, glow, fade).

## 15/11 ~21:00Z — Effects painted with Magnific too (owner)
- Owner wants effects (falling petals, candle flicker, glow, embers…) made with Magnific too, then put into the game; worried they may be too transparent / hard to separate from the background.
- Coordinator method: (1) particle effects (petals, leaves, snow, embers, sparkles): paint single sprites with gpt-2-6 on a plain background, cut with images_remove_background → transparent PNG/WebP, check edges on dark + light, animate with the existing Pixi/jfx particle layer; (2) light effects (candle flame flicker, glow, moonlight, lantern): Magnific short video on pure BLACK background, shown with mix-blend-mode: screen (black disappears, no alpha needed, works on iPhone Safari) — exported as a small looping MP4/WebM or sprite sheet; (3) only when a solid effect needs real transparency: video_remove_background → frames → sprite sheet WebP (Safari-safe). Keep files small (download-size rule).

## 15/11 ~21:10Z — Night follow-ups: build all 4 (owner)
1. Morning after a mặn nồng night: Kính sự phòng comes to record it in the book, maids gossip, Danh +small.
2. Morning after a lạnh nhạt night: other consorts already know and mock her — wire into the existing reaction buttons (Xin lỗi / Cười trừ / Đáp lại style).
3. Night the Emperor spends at another palace: she hears music drifting over; if she knows that consort, she learns who it is (stranger rule otherwise).
4. Full-moon (rằm) or festival nights: the night-end picture shows a full moon / flower lanterns (painted variants, Magnific).

## 15/11 ~21:15Z — Card-flip shows HER knowledge (owner)
- In the card-flip scene, each card's face/name follows HER knowledge (j61 stranger rule): unknown people show the grey silhouette + '???'. Everything shown in the game is what SHE sees, never what the Emperor knows.

## 15/11 ~21:20Z — Recipes also from levelling an art (owner)
- Besides buying/teachers, each time an art goes up one level she ALSO learns one new recipe/pattern of that art (plus the usual level rewards). Not everything must be bought. (Self-study still doesn't open a new sub-style; the level-up recipe comes from sub-styles she already knows, or the next basic one.)

## 15/11 ~21:25Z — Co-op buổi timer (owner)
- Co-op today (checked): each player presses Sang buổi; the first waits ("Đợi hảo hữu xong buổi") until the other also finishes (jcoopworld bend/onBuoi). No countdown.
- Owner wants: a SHARED countdown per buổi (e.g. 2 min, in BAL) visible to both = the MAXIMUM length of a buổi. When one player presses "Sẵn sàng" the other sees "Hảo hữu đã sẵn sàng"; if both are ready the buổi advances immediately (no need to wait for the timer). When the timer runs out, the buổi advances for both (open dialogs resolved safely / carried as in the night-desync fix). Pause the timer during forced dialogs/minigames? → coordinator decides sensible rules (e.g. timer pauses while a player is in a minigame, with a cap).

## 15/11 ~21:35Z — Art notes: poems, incense, dress items, item display, makeup tones, young pets (owner)
- Handmade POEM works (item-tp-tho-*): wrong — they look like painted framed panels. A poem must look like a poem: a written scroll / poem sheet / fan with calligraphy. REDRAW all tho items (all subjects × 4 tiers).
- Khúc nhạc, điệu múa, bình hoa: OK (mixed square/rectangle frames on múa: leave it).
- Incense (item-tp-huong-*): r04 and r05 both yellow; r01–r03 too similar → give each a distinct colour (recolour/redraw).
- Y phục tuyệt tác items are beautiful. Check the in-game equipment DRESS items (y phục trang bị): they look like clothes hanging on a rack — owner dislikes that. If needed, REDRAW all in-game dress items in the tuyệt-tác dress style (garment displayed flowing, no rack).
- ITEM RESOLUTION / BIG DISPLAY: item pictures shown big in the centre of the screen (receive / lose / reward) must be sharp (no upscaled blur) → draw/keep high-res sources (e.g. ≥1024 px) and serve a big size for centre display. In the centre display show the ITEM ALONE on a transparent background (no grade frame, no background tile). Only inside Tư trang does the item get the grade frame + background.
- MAKEUP (mk-colour): "đẹp" lipstick tone a little lighter/softer (slightly, not much) — today it's too close to diêm dúa. More colours, incl. ORANGE/coral tones. Presets: 6–7 "đẹp" looks and 6–7 "diêm dúa" looks, 3 cool-tone + 4 warm-tone, like modern makeup.
- PETS: very cute overall, OK. But the THIẾU NIÊN (young) stage of several pets looks thin and loses cuteness: mèo mướp, chó nhỏ lông xù, thỏ ngọc, mèo tuyết, chó sư tử lông vàng, linh miêu mắt ngọc, cửu vĩ hồ, ngọc thố (circled). Redraw thiếu niên stage to keep a cute, chubby young look (adolescent but still adorable). Trưởng thành and Linh thú stay.

## 15/11 ~21:45Z — Scene pictures for both orientations (owner)
- Night-end/new-day/card-flip and other full scenes must work on landscape AND portrait screens. Rule: paint LANDSCAPE, high-res (≥1536 px wide), with the subject inside a centred safe zone so a portrait crop (3:4 / 9:16) still shows it; store a focal point per picture (object-position) so portrait screens crop around it. Current night-end art is 1024x768 (4:3 landscape) → check portrait crops at 755x1000 and redraw wider/higher-res if the subject gets cut.

## 15/11 ~21:50Z — Sub-styles: always 4; also Công Dung Ngôn Hạnh (owner)
- Checked: Kỳ (cờ) exists as an art (ARTS: Cầm, Kỳ, Thi, Họa, Vũ, Y thuật & điều hương) and as a work kind (Cờ).
- EVERY art / work kind must have exactly 4 sub-styles (recipes branch has some with 3 → add a 4th).
- Công · Dung · Ngôn · Hạnh (j85) must ALSO have 4 sub-styles each, learnt and valued the same way (tastes/trọng, teachers, level-up unlocks).

## 15/11 ~22:00Z — Sounds: no owner approval (owner)
- Game sounds go straight into the game; do NOT send them to the owner for listening/approval. Coordinator + workers judge by measurement and by meaning-mapping; owner reports anything she dislikes while playing.

## 15/11 ~22:25Z — Rank title look: brighter; glow only on paintings (owner)
- Rank-title colours are too pale/dull, hard to read → make every rank colour more SATURATED and vivid (still readable).
- The GLOW + outline effect only where the name sits ON A PAINTING (stage figures over the scene picture, scroll/figure art). In framed UI (dialogs, cards, name boxes, Tuần lục text, lists — anything with a panel/paper background) use the same vivid colour as PLAIN text: no glow, no outline.
- Her own name: black + light-gold glow on paintings (per 20:10Z); in framed UI plain black (bold OK).

## 15/11 ~22:30Z — Pet decisions (owner)
- Ngự tứ pet saves her life only at the LINH THÚ stage (keep as now, coordinator's recommendation).
- Pet bar label stays "No" (do NOT change to "Đói").

## 15/11 ~22:35Z — Calendar ideas all; art level-up scene; performance budget (owner)
- Calendar: build ALL coordinator ideas (a)–(j) from 20:15Z.
- Art level-up (every art / Công Dung Ngôn Hạnh level): a short "học thành tài" celebration scene (painted, Magnific) that also shows what she gained: items appear (fly to Tư trang), new effects/abilities/recipes shown as info lines.
- Owner worry: many Magnific animations → heavy game and co-op lag. RULES (performance budget):
  1. Load art ON DEMAND (only when the scene plays; never preload all); service-worker cache after first use. Fix the 129 MB first-load (download-size task) first.
  2. WebP at the display size (big centre art ≤ ~250 KB, sprites ≤ ~40 KB); effect videos ≤ ~400 KB short loops, or sprite sheets.
  3. One shared particle layer (Pixi/jfx) reused by all effects; cap particle counts; pause effects when the tab is hidden.
  4. Settings: "Hiệu ứng: Đầy đủ / Gọn" (Gọn = still pictures, no particles/video) + auto-Gọn on weak devices.
  5. Co-op: online messages carry only small game state, never graphics, so animations don't add network lag; each player's effects run locally. Animations must not block or delay sync (they play after the state is applied; tap to skip).
  6. A perf test (frame time + memory + bytes per scene) in CI for 755x1000 and a mid phone profile.

## 15/11 ~22:45Z — Painted animations for ALL events (owner)
- Animations for every event and game moment, not just nights. Code-drawn weather is tolerated, but other code effects look off-style (e.g. the red screen flash for danger). Replace with painted (Magnific) effects. Owner asked for recommendations; per owner rule build them.
- Coordinator list (build all, painted sprites/short black-bg screen-blend videos, perf budget applies):
  1. Danger / harm / punishment: ink-blood spreading from the screen edges (painted ink bleed, dark red), instead of the flat red flash.
  2. Poison: green-black ink seeping, a cracked tea cup.
  3. Slap / scolding: brush-stroke impact streak + paper shake.
  4. Gift giving: the chosen item wrapped in a silk cloth / lacquer gift box (painted), carried by a maid's hands across to the person, ribbon untied on arrival; refused → box returned / set down.
  5. Receiving a gift: box opens with a soft light + painted sparkles.
  6. Rumour / gossip: drifting painted ink-whisper wisps / fluttering paper notes.
  7. Edict / decree: scroll unrolls with gold dust (painted).
  8. Promotion: gold petals + light rays; demotion: cracked jade + falling grey ash.
  9. Secret letter / spying: candle-lit paper sliding under a door, wax seal.
  10. Festival: lanterns rising, fireworks (painted), confetti of petals.
  11. Exam / contest win: red seal stamp slam + petals; loss: ink blot.
  12. Death: white silk falling, incense smoke curls.
  13. Pregnancy / birth: soft pink lotus light, swaddle reveal.
  14. Love / romance: drifting peach blossom + red thread.
  15. Weather: keep code, but optionally upgrade rain/snow/petals to painted sprites for style match.

## 15/11 ~22:55Z — Co-op pause + timer sync (owner)
- Add a "Tạm dừng" button in co-op: pressing it pauses the game for BOTH players (the other cannot continue) until the one who paused resumes. Friend sees a cổ-ngữ notice (e.g. "Hảo hữu xin tạm nghỉ, chờ giây lát").
- When one player is in a minigame (or forced dialog), the other must wait — normal; the shared buổi timer pauses for both (with the cap).
- The waiting player sees only a generic old-style notice, NOT what the friend is doing (e.g. "Hảo hữu đang dở tay, xin đợi" / "Hảo hữu đang bận việc").
- Owner's main worry: LAG. Sync design: the host owns the clock as an absolute deadline (server time), not a per-device countdown; pause/resume are sent immediately and stamp the remaining ms; each client shows remaining = deadline − synced now (clock offset measured with pings), so both screens agree within ~0.2 s; on resume the host re-issues the deadline; give a 1–2 s grace before auto-advance so a slow message never steals time; reconnect restores the paused/remaining state from the room snapshot (builds on fix-float r8 CW.wkIn / bend resend).

## 15/11 ~23:05Z — Owner batch: makeup 8, CDNH works, old player looks as new faces, lover art, gifts from works, dress contest themes + luxury, weather painted (owner)
- MAKEUP presets: 8 + 8 = 4 cool + 4 warm for "thanh nhã/đẹp" and 4 cool + 4 warm for "diêm dúa" (add the missing cool one in each). Lips must fit each face exactly — no offset; workers must check every face/picture carefully (anchor QA sheet of lips on all player faces).
- Công Dung Ngôn Hạnh: checked — they produce NO handmade works today (works come from Cầm/Kỳ/Thi/Họa/Vũ/Y). → Design CDNH outputs (e.g. Công: may vá/thêu túi thơm…; Dung: phấn son tự chế / kiểu tóc; Ngôn: thư từ, lời chúc, bài khuyên; Hạnh: kinh chép, việc thiện) with 4 sub-styles each, giftable like other works.
- OLD-SAVE PLAYER LOOKS (look1–4): DRAW the 128 (ranks t2–t8 + cold × 4 ages) AND add these 4 faces into the game as new selectable/NPC faces for variety across all roads (tiểu thư, cung nữ, …).
- Foreign princess origin: owner hadn't seen it. Checked: origin "nc" = "Công chúa nước Nam Chiếu hòa thân" exists in j1. Make it visible/clear in the identity pick; consider more foreign-princess origins/variants (e.g. Bắc Địch) — coordinator: add at least one more with its own story line.
- Promoted old-love men: DRAW the 56. General rule: anything that can be drawn → draw it; Magnific credits are plentiful.
- "Biếu quà làm lành" (Nguy hiểm chung) costs bạc → also allow giving a handmade WORK (or an item) instead, valued by tastes/fatigue rules (equivalent value rule).
- DRESS CONTEST (hội phối đồ): every wearable item needs a THEME tag (Thanh nhã / Phú quý / Hương sắc …) shown on the item, AND a LUXURY value (xa xỉ, e.g. up to 200). Scoring needs both: right theme AND luxury fitting her RANK (rank allowance: e.g. 200 only Tần/Phi+). Over her rank's allowance = vượt phẩm penalty even if the theme matches (greedy players who just chase the highest number get punished). Make luxury visible and meaningful (today it's faint). Builds on jaudit/jinv luxMonth + vượt phẩm.
- WEATHER: redo with Magnific painted effects using the same method (sprites + black-bg screen-blend videos), perf budget.

## 15/11 ~23:10Z — Co-op buổi timer length (owner)
- Owner worries 2 min is too short because reward/gift animations eat time. Decision (coordinator rec, owner leaning 5): DEFAULT 5 min per buổi; host can pick 3 / 5 / 8 in the co-op lobby. Timer PAUSES during reward/gift/edict/night animations and minigames (with the cap), so animations never eat play time. Both 'Sẵn sàng' → advance immediately. Measure real buổi lengths with bots/e2e and log them (median/p90) to confirm the default.

## 15/11 ~23:15Z — CDNH works detail; luxury as a RANGE and a deeper system (owner)
- Công Dung Ngôn Hạnh works follow the same shape as other works: each work kind has 10 items (e.g. túi thơm = 10 kinds of sachets), each item in 4 grade tiers, with its own art (Magnific).
- Dress contest luxury is a RANGE per theme/occasion (e.g. 100–150): the outfit's luxury must fall INSIDE the range — below it = too plain (giản dị), above it = phô trương / vượt phẩm. Range also capped by her rank allowance.
- "Luxury is faint" means the FEATURE is shallow, not the picture: deepen xa xỉ as a real system — every wearable/gift has a visible luxury value; occasions (thỉnh an, yến tiệc, lễ, hội phối đồ, tang, lãnh cung) each expect a luxury range; hosts' tastes (frugal / showy, "trọng") shift reactions; overspending builds a reputation (xa hoa → Thái hậu/Hoàng hậu frown, Danh/Đức effects), under-dressing reads as thiếu lễ; luxury ties to monthly allowance (luxMonth) and rank; NPCs follow the same rules.

## 15/11 ~23:20Z — Timer pauses only for minigames; spread events across buổi (owner)
- Co-op timer: only MINIGAMES pause the buổi timer; animations/hoạt cảnh do NOT (overrides 23:10Z on that point; default 5 min stays).
- Events pile up in the MORNING (buổi sáng): everything arrives at once. Spread events across the day's buổi (sáng/trưa/chiều/tối/đêm): each event gets a fitting buổi (thỉnh an + edicts morning, gossip/visits midday/afternoon, banquets/intrigue evening, night stuff at night), a per-buổi cap on popups (queue the rest to later buổi), stipend/rewards not all on the same morning. Measure: popups per buổi histogram before/after with bots.

## 15/11 ~23:30Z — Makeup "final look" reveal scene (owner; coordinator design)
- After the makeup minigame: a reveal scene of her FINAL LOOK of the day.
  1. Full-body figure (today's dress + makeup overlay) steps in on a painted backdrop: her dressing room before a tall bronze mirror, warm lamplight (Magnific plate; landscape with portrait focal point).
  2. Look-specific effect: đẹp/thanh nhã = soft petals + gentle glow + light chime; diêm dúa = gold sparkle, stronger warm light, bolder sound; vụng = a smudge-ink wobble + embarrassed sound; mặt mộc = simple soft daylight.
  3. Then a smooth ZOOM into the face, which lands inside a round bronze-mirror frame (gương đồng) like her avatar frame, so on a phone she clearly sees today's face (lips/eyes/blush with her chosen colours). Hold 2–3 s; tap to skip / tap again to close.
  4. Close card: look tier (vụng/vừa/đẹp/tuyệt/diêm dúa) + preset name + a one-line hint of how people may react today.
- During the minigame, the mirror already shows her portrait (jtoil) — keep it live-updating with the chosen colours as she picks them (preview).
- Painted art + Magnific effects rules and perf budget apply; co-op: friend sees only a small notice.

## 15/11 ~23:35Z — Makeup: 8 'vụng' looks (owner)
- Add 8 VỤNG (clumsy) looks drawn on her face like the other presets: crooked brows, lipstick past the lip line / uneven, smudged eyeshadow, blotchy or patchy powder, uneven blush, smeared mascara-like ink, etc. (4 cool + 4 warm colour variants). Shown when the makeup minigame score is low (vụng tier), using her picked colours where possible. Same exact-anchor QA so the clumsy look reads as intentional, not a rendering bug.

## 15/11 ~21:45Z (session 7 clock) — Move house to a new account (owner)
- Owner: move now. Session 7 sums up everything and packs the handover so that a NEW main chat (session 8) on a NEW account continues all of it: re-open EVERY unfinished worker; no worker and no owner idea from today may be lost.
- Owner asked to check which account had its usage limit reset today or yesterday.

## 15/11 (late, session 7) — Her face blurry on stage (owner screenshot)
- Owner screenshot (Ngọc Thanh các, Thường tại, 20 tuổi, chưa điểm trang): HER figure's face is hazy/soft while maid Ngọc Lan beside her is crisp; owner suspects background removal ("tách nền sao mà mặt bị mất nét"). → review/face-sharp worker (find the real cause, whole class).
- (owner, last message to session 7) The account runs on paid usage: once workers stop reporting, archive this chat. → Session 7 stopped its remaining agents (their WIP is on their branches) and archived itself.

## 15/11 (session 8 start) — Takeover by main session 8 on the new account (owner)
- Owner's opening order to session 8 (verbatim, Vietnamese): "Việc đầu tiên: đọc dev/handover/HANDOVER_TO_SESSION8.md ... làm đúng mục 0 → 5: dựng máy, kiểm kết nối GitHub/Cloudflare/Magnific, tạo lịch theo dõi mỗi giờ, giao người duyệt cho mọi nhánh 'SẴN SÀNG KIỂM', mở lại MỌI thợ đang dở theo file PROGRESS của nhánh, rồi giao hết việc còn lại trong dev/handover/OWNER_LEDGER.md mục 'UNASSIGNED'. Không được bỏ sót thợ nào hay ý nào của sếp. Ghi mọi lời sếp vào dev/OWNER_DECISIONS.md ngay trong lượt đó."
- Connectors on the new account (session 8 check): GitHub push OK; Magnific OK (project "Personal" ba4aecfe-efce-47e2-b53f-30d292091886 reachable, ~1.41M credits left); Cloudflare NOT connected — the credential form for api.cloudflare.com was declined by the owner. → CDN uploads are BLOCKED: workers keep new images in their worktree, list them in dev/PROGRESS_<branch>.md under "PENDING CDN UPLOAD", and the coordinator uploads once a Cloudflare token is added to the environment's network secrets.
- dev/handover/OWNER_LEDGER.md did not exist on the docs branch → ledger sweep worker re-spawned (s7 note 9a).

## 15/11 (session 8) — Rank colour missing in picker rows (owner screenshot)
- Owner (verbatim): "Phẩm bậc trong mấy ô chọn này chưa theo màu phẩm, màu phẩm xuất hiện mới nơi có tên và phẩm của người."
- Screenshot dev/handover/refs/owner-rank-colour-picker.jpg: action "Sai Ngọc Lan đi dò la", target picker rows "Hoàng hậu Chu Thục Nghi", "Quý phi Tần Kiều Nguyệt", "Phi Hạ ..." — the rank word is plain text, not in its rank colour. Rule: EVERY place that shows a person's rank with their name (picker rows, cards, dialogs, lists, logs, toasts, popups) shows the rank in its rank colour via the shared kit. → worker review/rank-colour (LUẬT SỬA CẢ NHÓM: scan every name+rank render, before/after table).

## 15/11 (session 8) — Action odds explanation is hard to understand (owner screenshot)
- Owner (verbatim): "Giải thích khó hiểu quá."
- Screenshot dev/handover/refs/owner-pick-hint-unclear.jpg, same action "Sai Ngọc Lan đi dò la": the line "Cơ may tính theo người được chọn: tâm cơ và nết của nàng ta, thái giám canh cungCung nữ thân tín Ngọc Lan có quen người bên ấy không, Tai mắt của ta." is a jumbled list (wrong subject, glued words "cungCung", trailing fragment). Rule: every action's "what decides the odds" line must read as one clear, short cổ-trang sentence a player understands at a glance (who/what raises or lowers the odds), names inserted with correct spacing and their kit colour. → worker review/pick-hint (whole family: every action picker hint across the game; scan + before/after table; VANPHONG).
- (session 8, later) Owner: "Khoan, xin lại" → credential form re-sent; owner saved the Cloudflare token for api.cloudflare.com. R2 listing verified OK. CDN uploads UNBLOCKED (scripts that need a variable: CLOUDFLARE_API_TOKEN=proxy-injected; the proxy injects the real key).

## 15/11 (session 8) — Hậu cung person panel: wasted space around the portrait frame (owner screenshots)
- Owner (verbatim): "Ảnh 1 phía trên này còn dư chỗ nhiều nè, ảnh 2, 2 bên trái phải còn dư kìa, kéo giãn cạnh trái và phải cho khung avatar to bề ngang xíu đi."
- Screenshots dev/handover/refs/owner-hc-portrait-top-gap.jpg + owner-hc-portrait-width.jpg (Hậu cung › Phi tần, Hoàng hậu card, ~1180 wide): (1) big empty band between the name title ("Người lạ") and the portrait frame → close the gap; (2) empty space left and right of the framed portrait in the left column → widen the avatar frame horizontally to use the column width (keep the frame art proportions sane, no stretch distortion of the face/silhouette).
- Whole family: the same person panel in every Hậu cung sub-tab (Chí tôn / Phi tần / Nam nhân / Cung nhân) and every other place using this portrait frame layout, at all viewports. → worker review/hc-portrait.

## 15/11 (session 8) — Gift picker shows item pictures in a Tư trang grid + gift animation (owner screenshot)
- Owner (verbatim): "Khung tặng quà tôi muốn hiện hình món đồ luôn, xếp theo như kiểu ô tư trang á. Xếp hàng ngang để chọn rồi có animation khi tặng."
- Screenshot dev/handover/refs/owner-gift-picker.jpg (VIỆC "Tặng quà" to Hoàng hậu: today a text-only vertical list of items with ĐƯỢC lines).
- Decision: the gift picker shows each item as its PICTURE cell, same kit cell as Tư trang (picture + name + grade colour), laid out in horizontal rows to pick from; selecting a cell shows its ĐƯỢC/MẤT/odds detail (kit rows) and a confirm button. On giving: painted gift animation per 22:45Z list items 4–5 (item wrapped in silk / lacquer box carried across, ribbon untied on arrival; refused → box set down/returned) using §68 painted-fx. Whole family: every "choose an item to give/offer/bribe/use" picker in the game uses the same picture grid. → worker review/gift-pick.

## 15/11 (session 8) — Label/value rows not aligned (owner screenshot)
- Owner (verbatim): "Hàng trên hàng dưới chưa alignment."
- Screenshot dev/handover/refs/owner-row-align.jpg (ĐIỀU "Tâm trạng · Chu Thục Nghi", block ĐANG TÁC ĐỘNG): row "LO ÂU | Khương Lạc Anh được tấn phong · 2 tuần trước" and row "ẢNH HƯỞNG | vui thì dễ chịu nghe…" — the value columns start at different x because each label sizes its own width.
- Rule: inside one block, every label/value row shares ONE label column width (the widest label), so all values start on the same vertical line (same as the TỐN/ĐƯỢC/MẤT/GHI CHÚ rows). Fix in the shared kit row part, whole family across the game. → worker review/row-align.

## 15/11 (session 8) — Mood dialog: picture must match the mood, mood icon on the picture, rank always with name (owner screenshot)
- Owner (verbatim): "Rồi ảnh sự kiện này không hợp với khung tâm trạng, nên để ảnh sự kiện liên quan tới tâm trạng, và thêm icon tâm trạng 1 góc ở sự kiện. Nên ghi rõ tâm trạng hoàng hậu chu thục nghi, phẩm và tên người lúc nào cũng phải đi chung."
- Screenshot dev/handover/refs/owner-mood-dialog.jpg (ĐIỀU "Tâm trạng · Chu Thục Nghi", Hiện nay: Lo âu; picture = cheerful tea table "Có người đến chơi").
- Decisions: (1) the mood dialog picture shows a scene matching the CURRENT mood (lo âu → anxious scene, etc.; each mood gets its own painted picture(s), Magnific gpt-2-6), not an unrelated event picture; (2) a mood icon sits in one corner of the picture (kit part, same icon as the mood elsewhere); (3) title reads "Tâm trạng · Hoàng hậu Chu Thục Nghi".
- GENERAL RULE (owner): a person's RANK and NAME always go together, everywhere (titles, headers, dialogs, lists, logs, toasts), never the bare name — rank in its rank colour (see rank-colour entry). → worker review/mood-dialog; rule added to review/rank-colour scope.

## 15/11 (session 8) — Tapping an item shows no item info (owner screenshot)
- Owner (verbatim): "Khi bấm vào món đồ không thấy hiện thông tin món đồ."
- Screenshot dev/handover/refs/owner-item-info-tap.jpg (TÀI NGHỆ "Điểm trang: Trước gương đồng", Hồi 1 dress pick: ĐANG MẶC slots + chest grid; tapping a chest cell only wears/removes it).
- Decision (coordinator design): tapping an item cell ALWAYS shows its info via one shared kit item-detail part (picture, name, grade colour, kind/slot, theme tag, xa xỉ value vs her rank allowance, effects ĐƯỢC/MẤT, origin/giver, notes) — in this dress picker as an info strip/panel next to the chest with buttons "Mặc / Cài" or "Tháo"; wearing no longer happens on a blind tap. Whole family: every item cell in the game (Tư trang, dress pick, gift picker, shop, chest, rewards, co-op) uses the same tap → info behaviour. → worker review/item-info (shared kit part; review/gift-pick reuses it).
- CORRECTION (owner, verbatim): "Không, ảnh khung tâm trạng là hiện sự việc liên quan, nhưng là tấn phong kìa." → The mood dialog picture shows the EVENT THAT CAUSED the mood (here the cause is "Khương Lạc Anh được tấn phong" → the tấn phong / promotion event picture), not a generic per-mood scene and not an unrelated event picture. Mood icon still sits in a corner of that picture. Per-mood pictures are only a fallback when the cause has no picture. Whole family: every place that shows a mood/state with its cause uses the cause event's picture.

## 15/11 (session 8) — Event dialog figure column far too big; cropping the skirt is OK (owner screenshot)
- Owner (verbatim): "Sao khung này, khung trái nhân vật to vậy. Tôi bảo là kit chung thế nào, nếu cắt váy thì cũng ok mà. Hiện tại khung pop up đang có mấy kit chung?"
- Screenshot dev/handover/refs/owner-stage-fig-huge.jpg (VIỆC "Thái hậu chê dung nhan", tablet portrait): the left figure column takes ~60 % of the dialog with a huge full-body Thái hậu; KIT §32.2 says figure column 36 % (Fold) / ~170 px of a 470 px dialog (iPad), figure ≤ 40 dvh → the kit cap is not enforced on this dialog.
- Coordinator answer to "how many shared pop-up kits": ONE panel frame (KIT §8 kpanel) for every pop-up; inside it the subject is shown one of two ways — small 3:4 portrait (.kpsubj) or the event stage full-body figure column (§32.2 kitEventStage); plus the separate person-card modal (pcard), mini-game frame (§13) and scene panel (§14).
- Decision: enforce §32.2 on EVERY event dialog: figure column capped (36 % / ~170 px), and when height is short CROP the figure (owner: cutting the skirt is fine — show head to knees/waist, face always fully in view) instead of growing the column or shrinking the face. Whole family scan of all dialogs with a stage figure at all viewports. → worker review/stage-fig-size.

## 15/11 (session 8) — Badly drawn hands on the "Thỉnh an Hoàng hậu" act picture (owner screenshot)
- Owner (verbatim): "Vẽ tay kì vậy."
- Screenshot dev/handover/refs/owner-bad-hands-thinhan-hh.jpg (Hành sự card "Thỉnh an Hoàng hậu", Lễ nghi picture: folded hands are malformed).
- Decision: redraw that picture (Magnific gpt-2-6) with clean, natural hands; AND audit EVERY act/event picture for malformed hands/fingers (look at each; list + redraw the bad ones). → added to review/act-pics2 worker scope (it is already redrawing act pictures).

## 15/11 (session 8) — Owner asks to see the shared pop-up kit
- Owner (verbatim): "Gửi tôi ảnh kit chung pop up." The kit sample page (#kit) has NO pop-up (KIT §8 kpanel) sample → worker review/kit-popup-sample adds §8 samples (panel with small portrait subject, with event-stage figure, with options, result) to the kit page and produces screenshots for the owner.

## 15/11 (session 8) — Two different acts share the same picture (owner screenshot)
- Owner screenshot dev/handover/refs/owner-dup-act-picture.jpg (no words, both circled): "Nghỉ ngơi một lát" and "Đọc sách giải khuây" show the SAME picture (round window, vase, lacquer box). Rule: every act / event shows its own picture; no two different acts share one. → worker review/pic-dupes: scan all act + event picture keys for duplicate files/near-duplicates (perceptual hash), redraw the extra ones (gpt-2-6), matched to each act's text.

## 15/11 (session 8) — Tài nghệ act card text broken and unclear (owner screenshot)
- Owner screenshot dev/handover/refs/owner-act-text-jumble.jpg (circled): card "Tự học Thi: viết thơ, thư pháp": ĐƯỢC "tiến bộ Thi +1..2 · Tinh xảo: cần chơi 9 phần · Tuyệt phẩm: chỉ vật liệu quý); dâng · tặng được" (stray ")"), KÈM "tự tay chơi thì ra Thư pháp «Vọng nguyệt» (chơi 5 phần: Khá" (unclosed, cut), "+1..2" is not player wording. Rule: every act card line is complete, short, clear cổ-trang wording (VANPHONG), no broken brackets, no code-like ranges, no truncation. → worker review/act-text: whole family over all act cards (scan every generated card text for unbalanced brackets, "..", cut text, glued words).

## 15/11 (session 8) — Khắc check must use the whole DAY's khắc, not the buổi (owner screenshot)
- Owner (verbatim): "Tại sao 2 khắc còn 1 lại đỏ, tôi còn cả ngày mà, công thức tính khắc của bạn, phải tính theo tổng số khắc 1 ngày, chứ không phải theo buổi. Chỉ được đỏ, khi còn khắc, khi mà qua buổi mới, không làm được việc đó, hoặc không vào được nơi đó chứ."
- Screenshot dev/handover/refs/owner-khac-day-budget.jpg ("Tự học Thi": CẦN "✗ 2 khắc (còn 1)" red while GHI CHÚ already says "kéo sang buổi chiều"; same on other cards).
- Rule: the khắc requirement is checked against ALL khắc left in the DAY (remaining buổi included); an act longer than what is left in this buổi simply spills into the next buổi (as the walk-spill rule 15/11 09:05Z–09:15Z). The khắc chip is red ONLY when (a) the day does not have enough khắc left, or (b) the act/place is tied to this buổi (e.g. thỉnh an = morning only, a place closed next buổi) so spilling makes it impossible — and then the red chip says that reason in words. Whole family: every act, place, Dư đồ walk, servant act, co-op. → worker review/khac-day.

## 15/11 (session 8) — Old unstyled screen flashes for <1 s when opening the game (owner screenshot)
- Owner (verbatim): "Khi vừa bấm vào game, có chừng ít hơn 1 giây hiện khung này."
- Screenshot dev/handover/refs/owner-boot-flash.jpg: before the game is ready, a raw skeleton shows (OLD tab names Việc/Bản đồ/Phi tần/Quan hệ/Phe/Kẻ hầu/Con/Rương/Nhật ký, a vertical stat list, empty panels, the app icon in the middle). Rule: from the first paint the player sees only a proper painted loading/title screen (kit style) until the game UI is fully built; no stale markup, no old labels. → worker review/boot-flash (also remove/rename the stale static HTML labels).

## 15/11 (session 8) — Thơ minigame too hard for players who don't know classical verse (owner screenshot)
- Owner (verbatim): "Mini game này khó quá, tôi có rành mấy câu xưa tiếng việt đâu."
- Screenshot dev/handover/refs/owner-poem-game-hard.jpg (TÀI NGHỆ "Thơ: Học Thi": drag words into the blanks of the 8-word line, word 6 must rhyme with word 6 of the 6-word line; 21 s; distractors nở/ghét/mành/Lời/ai).
- Coordinator design (to build): the game must be winnable by matching visible patterns, not by knowing old verse. (1) The rhyme is SHOWN: the target rhyme ending is highlighted (e.g. "-anh" in the lục line) and each word tile shows its ending tinted, so the rhyme blank is a colour/ending match; (2) only 1–2 blanks per line at low Thi level, more blanks at higher level; distractors are clearly wrong (different ending, wrong length) at low level; (3) a meaning hint line under the bát line (plain modern words, e.g. "ý: nhớ người ở xa") so word order makes sense; (4) after a wrong drop the tile bounces back with a soft hint; after ~8 s idle the right tile glows faintly (hint costs a little score, never blocks); (5) more time at low level; (6) a short 1-screen demo the first time. Same review for the other word/knowledge minigames (Kỳ, Họa, Cầm, đối đáp, etc.): no minigame may require real-world classical knowledge to succeed. → worker review/mg-easy (QUEUED: subagent cap 20 reached).

## 15/11 (session 8) — Stage name tag: rank needs the same light halo as the name (owner screenshot)
- Owner (verbatim): "Phẩm của tôi cũng viền sáng như tên."
- Screenshot dev/handover/refs/owner-stage-rank-halo.jpg (stage, her tag "Thường tại / Mạnh Mộng Điệp": the name has a light paper halo, the rank line in its rank colour has none and is hard to read on the painting).
- Rule: on stage/picture name tags the RANK line gets the same light halo/outline as the name (kitNameRank §48), for every person, keeping its rank colour. → added to review/rank-colour scope.

## 15/11 (session 8) — Tapping the Mệnh truyện chapter shows nothing (owner screenshot)
- Owner (verbatim): "Bấm vào báo thù cho nhà không có thông tin gì hiện ra à."
- Screenshot dev/handover/refs/owner-chapter-tap-empty.jpg (Mệnh truyện › Chương này: chip "Báo thù cho nhà" + card "Chương 1 · Báo thù cho nhà · Hồi 4/5", MỤC TIÊU / KẾ TIẾP lines, the rest of the page empty; tapping the chip/card does nothing).
- Decision: tapping the chapter chip or card opens the chapter detail (kit panel): story so far by hồi (with each hồi's picture), the goal broken into steps with live progress (chứng cứ 0/3 with each evidence found/missing and where to look; nhân chứng: who, safe or in danger, how to protect; rank needed: Tần, now Thường tại; dâng sớ step), what to do next with a "Đi làm" link to the act/place, risks. The empty page area under KẾ TIẾP shows this same progress inline. Whole family: every tappable chip/card in Mệnh truyện / Việc nhờ / Sổ ghi / Sắc phong opens its detail; no dead taps anywhere (scan for clickable-looking elements with no handler). → worker review/chapter-detail (QUEUED: subagent cap).

## 15/11 (session 8) — Whole tab panel bounces on any tap (owner screenshot)
- Owner (verbatim): "Tôi chạm vào chỗ nào của tab này thì khung này nó cứ nhấp nhô lún lên lún xuống của khung luôn."
- Screenshot dev/handover/refs/owner-pane-bounce.jpg (Mệnh truyện tab: the whole pane circled; tapping anywhere, even empty space, makes the entire panel press down/up).
- Rule: the press/sink feedback (game-feel) belongs ONLY to the actual tappable element under the finger (button, card, chip), never to a whole panel/pane/container, and never on empty space. Whole family: scan every pane/tab/container for press animations bound to the container (event delegation picking the pane) and fix in the shared game-feel part. → worker review/press-fx (QUEUED: subagent cap).

## 15/11 (session 8) — Stat +/- animations too fast; make the changed stat glow (owner)
- Owner (verbatim): "Animation khi các điểm cộng trừ nhanh quá, nhìn không kịp là cộng trừ cái gì, và ví dụ cộng điểm danh, tôi muốn thấy rõ animation như số danh phát sáng, chớp vài giây, số to hơn xíu chẳng hạn."
- Decision: every stat change shows WHAT changed and is readable: the flying number carries the stat name + delta ("Danh +2") and moves slower (~0.9–1.2 s) to its top-bar cell; the target cell then glows (gold for +, dim red for −), pulses 2–3 times over ~2–3 s, and the number briefly scales up (~1.15×) while counting to the new value; several changes queue/stagger instead of overlapping; tap skips; respects Hiệu ứng Gọn (Gọn = glow only, no fly). Applies to all stats (Sắc, Tài, Tâm cơ, Đức, Danh, Sủng, Bạc, Sức) and relation numbers on person cards. Builds on game-feel (KF_CELL, popNum, coinPop). → worker review/stat-fx (QUEUED: subagent cap).
- Owner also asked again for PICTURES of each shared frame (pop-up with small portrait, pop-up with full-body stage, person card, mini-game frame, scene panel) → review/kit-popup-sample worker told to send them first.

## 15/11 (session 8) — Buổi change page-flip animation looks odd (owner)
- Owner (verbatim): "Animation qua buổi hiện tại có hiệu ứng lật trang sách. Kỳ quá."
- Decision (coordinator design, replaces the page-flip for buổi changes; the week book keeps its own page curl): a TIME-OF-DAY transition — the current scene cross-dissolves through a soft ink-wash veil into the next buổi's lighting (§56 scene-light), while a small painted sky band slides the sun/moon along its arc and the new buổi name appears as a brush-calligraphy title with a seal ("Buổi trưa"), ~1.5–2 s, tap to skip; Gọn = quick fade only. Night → morning uses a dawn variant (mist + first light). Painted pieces via §68 painted-fx / Magnific gpt-2-6; perf budget; co-op: plays locally after state applies. → worker review/buoi-transition (QUEUED: subagent cap).
- (session 8) Owner (verbatim): "Cái vụ số khắc trong ngày có thợ làm rồi mà." → Confirmed: review/time-spill (j76 "thời gian liền mạch trong ngày") was merged to main on 14/11. review/khac-day was told to build on j76/jtime4 (no second system) and find why the CẦN khắc chip is still per buổi.

## 15/11 (session 8) — Owner rulings: stage glow only for HER; stat glow green; buổi transition approved (owner)
- Owner (verbatim): "Cái chữ phẩm ở trên sân khấu á, là chỉ có tôi là mới có chữ phẩm và tên là phát sáng thôi, còn những người khác là bình thường. ... Bây giờ phẩm của tôi và tên của tôi là phát sáng, còn của những người khác trên sân khấu là không phát sáng đi."
  → RULE (overrides the earlier "rank halo for everyone" entry): on the stage, ONLY HER tag (rank line + name line) has the light glow/halo — that is how the player tells herself apart. Every other person's stage tag has NO glow (plain rank colour + name, still readable). Applies to co-op: each player sees only her own tag glowing (the friend's tag plain).
- Owner (verbatim): "Tới ô Danh thì ô đó phát sáng: vàng nếu cộng, không phải, xanh lá chứ." → stat-fx: + glows GREEN (− glows dim red), not gold.
- Owner approved the buổi transition design as written (ink-wash dissolve to the new buổi light, painted sky band with sun/moon arc, calligraphy buổi title + seal, dawn mist + first light, tap to skip, Gọn = quick fade) and added: "Vẽ bằng magnific cho giống các hiệu ứng và chuyển màn khác" → all its pieces painted with Magnific (gpt-2-6), same method as the other painted effects/transitions (§68).

## 15/11 (session 8) — Header "‹ Phòng" bar → a room icon button (owner screenshot)
- Owner (verbatim): "Làm thành biểu tượng phòng hay sao để bấm đi."
- Screenshot dev/handover/refs/owner-room-button.jpg (header right column: a wide empty bar with "‹ Phòng" that reads like an empty field).
- Decision: replace it with a compact painted ROOM ICON button (kit button, Magnific-painted icon of her residence/door; small label under/beside it, e.g. "Về phòng"; when she is elsewhere the label names where it goes back to). Same icon style as the other HUD icons; tooltip; works on all viewports; co-op same. The freed header space stays clean (no empty bar). Whole family: any other "‹ Nơi" back bars use the same kit icon button. → worker review/room-btn (QUEUED: subagent cap).

## 15/11 (session 8) — Giao tình relation picker wastes space; press-fx URGENT (owner screenshot)
- Owner (verbatim): "Khung này choáng space quá. Coi sắp xếp lại đi. Làm gấp cái vụ chạm vào đâu cũng có hiệu ứng khung to nhún, nhức đầu quá."
- Screenshot dev/handover/refs/owner-giaotinh-picker-space.jpg (Giao tình › Ân oán: "Xem quan hệ của" group tabs + portrait strip with ‹ › pager, then "với" group tabs + another strip, each strip mostly empty, tall; the actual relation card starts far down).
- Decision (coordinator design): compact the two pickers: one row each — label + group chips + portraits on the SAME line where width allows (iPad), smaller portrait cells, pager only when the strip overflows, no tall empty bands; or a single two-slot selector "[Hoàng thượng] ⇄ [Tần Kiều Nguyệt]" that opens a kit person picker on tap. Goal: the relation card is visible without scrolling on 1180x820 and 755x1000. Same fix for other screens using these person strips with large empty space. → worker review/rel-picker (QUEUED: subagent cap).
- press-fx made URGENT → worker review/press-fx spawned immediately.

## 15/11 (session 8) — A gain shown in red (owner screenshot)
- Owner (verbatim): "Tại sao + mà màu đỏ."
- Screenshot dev/handover/refs/owner-kem-plus-red.jpg ("Tự học Thêu thùa: thêu khăn": KÈM "tiến bộ Thêu thùa +1..2" in red).
- Rule: every value is coloured by its MEANING (gain green, loss red, neutral plain), never by the row it sits in; gains belong in ĐƯỢC, not KÈM. Whole family across all cards → added to review/act-text scope (scan: "+N shown red / −N shown green").

## 15/11 (session 8) — Redraw the thị tẩm quilt-carry picture (owner screenshot)
- Owner (verbatim): "Vẽ lại, nhìn kì quá."
- Screenshot dev/handover/refs/owner-night-quilt-redraw.jpg (VIỆC "Đêm thị tẩm": eunuchs carrying her rolled in the phoenix quilt — bloated shapeless bundle, awkward pose, cropped maids at the edges). → redraw (gpt-2-6) + check other night pictures; assigned to review/pic-dupes worker.

## 15/11 (session 8) — Night picture looks cold on a warm night; night panel is dark, unlike the game (owner screenshots)
- Owner (verbatim): "Ảnh này là gì mà nhìn như bị ghẻ lạnh vậy." Screenshot dev/handover/refs/owner-night-cold-picture.jpg: text "Ngài khẽ cười, kéo ta lại gần" but the picture shows her and the Emperor sitting far apart. → the night picture must match the night's tone (warm → close/tender, tasteful; cold → distant); draw the warm version. Assigned to review/pic-dupes worker.
- Owner (verbatim): "Tại sao khung này màu tối, khác hoàn toàn game mình." Screenshot dev/handover/refs/owner-night-dark-panel.jpg: the ĐÊM panel uses a black/dark theme (dark body, dark title band) unlike every other pop-up. Rule: ONE pop-up look (KIT §8): night panels use the same light paper panel as the rest; the night feel comes from the painted picture/background, the ĐÊM seal colour and lighting accents only — never a dark panel body. Whole family: scan every kpanel kind / data-kind and any dark-themed dialog (night, lãnh cung, death, KIẾP end…) → same light panel. → worker review/night-panel (QUEUED: subagent cap; coordinate with B1 night-end-r1).

## 15/11 (session 8) — Sổ ghi numbers don't match the header (owner screenshot)
- Owner (verbatim): "Tại sao không khớp."
- Screenshot dev/handover/refs/owner-log-mismatch.jpg: Sổ ghi "Đêm nay ta được thị tẩm. Sủng 33 → 40 …" while the header shows Sủng 37.
- Rule: every stat/relation change is logged with its reason; the log's "X → Y" chain for each stat replays exactly to the header value; same-moment changes in applied order. Whole family audit of unlogged stat changes. → worker review/log-sync (spawned).

## 15/11 (session 8) — Fold page-turn looks stiff; pick-hint must cover all groups; status questions (owner)
- Owner (verbatim): "Animation lật trang của fold nhìn kì lắm. Nó đơ chứ không cong giống trang sách." → page turns (week book / any book UI) must CURL like a real paper page following the finger (bend, shadow, back side visible), not a stiff flat flip; Fold first, all viewports. Reuse review/drag-curl (orphan branch, ledger D37) + review/page-curl. → worker review/page-curl2 (QUEUED: subagent cap).
- Owner (verbatim): "Rồi mày phải làm cho các nhóm khác chứ sao chỉ sửa 1 chỗ vậy." → answered: review/pick-hint already rewrote the whole family (spy, poison, schemes j70, exams, pets, tsb, men; scan shows 0 old-style lines); the owner's example was only one sample.
- Owner asked: "Thợ làm vụ tranh sủng được, thị tẩm xong là qua ngày mới xong chưa" → jnight (new day after a won tranh sủng + night) went LIVE with fix-float r9 (main 7ba53114d).
- Owner asked: "Thợ làm animation nhận thưởng xong chưa" → reward chest + promotion/demotion FX are on review/promo-rules (waiting review after fxkit, queue A9); night celebration FX is in the failed night-end-r1 (queue B1). Not live yet.
- Kit-sample worker findings on main (to fix): (a) info panels about a person now use the full-body stage column — no small 3:4 portrait variant is used any more; (b) "Bổng lộc" rule picture missing (placeholder); (c) option card with a tiny portrait icon breaks its title onto 2 lines at 1180 ("Thưa rằng do Hoàng / thượng định"); (d) "Hoàng hậu triệu kiến" event shows the player's figure captioned "Tần Mộng Điệp" without rank and the generic "Có người đến chơi" picture (mood-dialog fix covers look-up panels only) → added to review/stage-fig-size + review/mood-dialog follow-ups.

## 15/11 (session 8) — Week book person page shows an unrelated entry (owner screenshot)
- Owner (verbatim): "Giải thích gì mà không liên quan tới hoàng thượng vậy."
- Screenshot dev/handover/refs/owner-weekbook-wrong-entry.jpg (Tuần lục p.5 Hoàng thượng: chip "Sủng +7", the only entry is the raw Điểm trang card text "hôm nay thỉnh an thái hậu, thỉnh an hoàng hậu, hội phượng … (không điểm trang: mặc như hôm qua, mặt mộc)" — nothing about the Emperor; the Sủng +7 came from "Đánh đàn ở ngự hoa viên").
- Rule: each person page in the week book lists ONLY what happened with THAT person this week, each entry one short past-tense sentence explaining the change and its cause (e.g. "Ta đánh đàn ở ngự hoa viên, Hoàng thượng đi ngang nghe được, Sủng +7."), with the event's picture; never raw act-card text, never entries attached to the wrong person; the chip totals equal the sum of the listed entries. Whole family: every week-book page (people, her own page, summary). → worker review/weekbook-entries (QUEUED: subagent cap).
- (session 8) Owner (verbatim): "Đã sửa ảnh nhân vật mặc đồ to chưa." Screenshot dev/handover/refs/owner-weekbook-wide-robe.jpg (Tuần lục p.6 Thái hậu: wide robe spreads under the text column). → not yet live; added to review/stage-fig-size (figure stays in its column, wide robes cropped at the edge, face fully visible; week book pages included). Silk-scroll stage frames (fig-bg step 2, crops wide robes to the scroll) still queued (C8).
- (session 8) Owner (verbatim): "Trang này sao không có ảnh nhân vật liên quan. Tôi báo bạn rồi mà. Kiểm tra coi làm tới đâu rồi." Screenshot dev/handover/refs/owner-weekbook-court-nofig.jpg (Tuần lục "Triều đình · thiên hạ" without a figure). → Checked: the fix (every page has its subject's full-body figure; Triều đình · thiên hạ shows Hoàng thượng; j87) was in fix-float r8 and went LIVE with main 7ba53114d this session; her screen was the older cached build ("Có bản mới" chip showing). Ask her to tap "Có bản mới" and re-check.

## 15/11 (session 8) — Contest podium: rewards for 2nd/3rd, same figure scale, contestants become known (owner screenshot)
- Owner (verbatim): "Hạng 3 và hạng 2 không được thưởng gì à, 2 hình nhân vật hạng 2 và 3 cũng không to bằng nhân vật tỉ lệ chuẩn, và những người này cùng tôi tham gia hội thi thì lúc này tôi biết mặt biết tên là đúng mà đúng không."
- Screenshot dev/handover/refs/owner-podium.jpg (VINH DANH "Khéo tay: Thi tài ngày Thất tịch · Gỡ rối chỉ": Nhất Đáp ứng Tô Mạn Châu 87 phần with Sủng +8 Danh +3; Nhì = her 83 phần, no reward; Tam Tần Mộ Dung Tịch Nhan 78 phần, no reward; 2nd/3rd shown as grey silhouettes, smaller than standard figures).
- Rules: (1) every podium place gets a reward, scaled by place (Nhất > Nhì > Tam; e.g. smaller Sủng/Danh + a token item), shown as chips under each place; consolation for taking part can be a small Danh/skill progress; (2) all podium figures use the SAME standard figure scale (kit figure tier), only the podium height differs; (3) YES — everyone who competed with her becomes KNOWN at the contest (face + name revealed, marked "đã gặp"), so real figures, never silhouettes, for contestants she has seen; the same "meeting reveals face" rule for every shared event (banquets, thỉnh an, festivals). Whole family: all contest/podium screens (exams, dress contest, festival games, co-op leaderboard podium). → worker review/podium-fix (QUEUED: subagent cap).

## 15/11 (session 8) — Contest intro layout: picture left, info right, scrolling contestant box (owner screenshot)
- Owner (verbatim): "Khung ảnh minh họa cho thi cái gì ở bên trái, bên phải là thông tin, khung người tham gia nếu nhiều người thì kéo lên xuống được, chỉ kéo mỗi khung người thôi."
- Screenshot dev/handover/refs/owner-contest-intro-layout.jpg (TÀI NGHỆ "Cắm hoa: Tết Thất tịch · Cắm thế thiên – nhân – địa" intro: circled the empty PHẦN/HỒI/CÒN boxes ("–") and the long ĐỐI THỦ list that makes the whole dialog scroll).
- Decision: contest/minigame INTRO screen = left column: a painted illustration of what is contested (e.g. the flower arrangement, Magnific gpt-2-6 where missing); right column: info (CÁCH CHƠI, PHẦN CỦA TA rows, odds); the ĐỐI THỦ contestant list is its own fixed-height box that scrolls by itself (only that box scrolls; buttons always visible). The PHẦN/HỒI/CÒN counters appear only once the game runs (no empty "–" boxes on the intro). Phones: picture on top (short band), then info, then the scrolling list. Whole family: every contest/exam/minigame intro. → added to review/podium-fix scope (renamed contest-ui).
- (session 8) Owner (verbatim): "Hình như có thợ vẽ rồi đó. Coi thử. Tôi nói rồi. Trước khi cho thợ làm gì phải coi có ai làm chưa mà." → Checked: yes — review/night-end-r1 already has painted night pictures by tone (ne-night-warm/normal/cold/lonely, KIT §62; not live, review FAIL). Coordinator mistake: assigned new night art without checking. Fix: pic-dupes told to drop it; night-end-r1 worker re-spawned to fix its FAIL list AND reuse those pictures for the in-night dialog by tone AND convert dark night/other dark panels to the light kit panel (C30 merged into B1). Coordinator rule reaffirmed: LUẬT ƯU TIÊN SỐ 1 check (OWNER_LEDGER + git grep main/review/*) BEFORE every new assignment.

## 15/11 (session 8) — Owner review of the 7 kit screenshots (owner markup)
- Owner (verbatim, summary of her voice note): the Thái hậu figure in the ĐIỀU info panel looks SQUASHED (shortened) to fit the whole wide robe; "tà áo của những người mặc áo to có thể bị mất một khúc cũng không sao, nhưng con người phải đúng tỷ lệ nhân vật, không có crop kiểu này." Screenshot dev/handover/refs/owner-fig-squashed.jpg. → RULE: figures always keep their true aspect ratio (never scaled differently in X and Y); wide robes are cropped instead. → review/stage-fig-size (scan for distorted figures everywhere).
- Owner: "Sự kiện có nhân vật, ảnh sự kiện có nhân vật, ok nè." → pop-up with event stage (screenshot 2) approved.
- Owner on the person card (screenshot 3): "khung bên phải nó đang bị trống rồi. Mình có cần phải bỏ thông tin gì của nhân vật này vô không?" → coordinator recommendation (to build unless she objects): fill the empty right area with the person's useful info via kit parts: current mood + its cause picture (mood-dialog), "Lòng người với ta" relation rows (thiện cảm/oán/sủng/ghen), what she likes/hates (trọng/ghét, known tastes), "Đã biết" facts and evidence, recent dealings with her this month (from the log), and quick actions (Thỉnh an, Tặng quà, Dò la) as act-card buttons. → worker review/pcard-fill (QUEUED).
- Owner on the scene panel / identity card (screenshot 5): "ở bên trái là phải có một cái hình nhân vật nữa mà sao ở đây tôi không thấy hình nhân vật nào nữa." → regression: identity card full-body figure missing → review/stage-fig-size (figure load race).
- (session 8) Owner (verbatim): "Hiện tại bảng thông tin và bảng kết quả hình thức giống nhau. Tại sao không giữ 1 khung thôi. Chứ bày thêm chi vậy." → Answer: they ARE one frame (KIT §8 kpanel); only the seal word (ĐIỀU / KẾT QUẢ / TIN / VIỆC) and the content differ. The 7 screenshots showed uses of the same frame, not separate frames. RULE kept: one pop-up frame; reviewers FAIL any pop-up that is not the kpanel.

## 15/11 (session 8) — Every option card: illustration LEFT, info RIGHT (owner markup, repeated ask)
- Owner (verbatim): "Hình minh họa cho từng hành động bên trái. Bên phải là thông tin. Tôi nói hoài vậy."
- Markup dev/handover/refs/owner-option-picture-left.jpg (VIỆC "Hoàng hậu triệu kiến": options "Cúi đầu nhận lỗi", "Thưa rằng do Hoàng thượng định", "Dâng lễ vật xin bỏ qua" — she marks a picture box on the LEFT of each option and the info on the RIGHT).
- RULE (binding, all dialogs): every option / choice card in events, dilemmas, nights, reactions etc. uses the SAME layout as the Hành sự act card: a small painted illustration of that action on the left, title + CẦN/TỐN/ĐƯỢC/MẤT/GỢI Ý rows on the right (KIT §6 act card). Pictures: reuse an existing act/event picture when it truly shows the action, otherwise paint new ones (Magnific gpt-2-6; per option meaning, not per event). Tiny portrait icons beside option titles go away (the picture replaces them). Whole family: scan every option card in the game; list options without a picture; draw them in batches by frequency. → worker review/opt-pics (QUEUED-NEXT, top of queue).

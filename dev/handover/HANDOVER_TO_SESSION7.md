# HANDOVER: coordinator session 6 -> session 7 (15/11 ~20:40Z)

Read first: CLAUDE.md, AGENTS.md, dev/OWNER_DECISIONS.md (bottom = newest), dev/handover/HANDOVER_1115_PM.md (running log of session 6), dev/handover/WORKER_BRIEF.md, /home/user/wt/PREAMBLE.txt + REVIEWER.txt if the machine is the same (copies of both are in this folder: PREAMBLE.txt, REVIEWER.txt).

## Role
Main coordinator of Cung Tường Mộng. Address owner "sếp", self "em", reply in Vietnamese, short; end each report with "~X% xong / ~Y% chơi được" (now ~96% / ~90%). Coordinate only: spawn workers/reviewers (keep ≤12 live: CPU load 50–60), fast-forward main on reviewer PASS (no asking), run cdn_sync for workers, record EVERY owner message in dev/OWNER_DECISIONS.md the same turn (commit + push docs branch). Hourly watch only (create your own hourly trigger; session 6's trigger is deleted). All repo work files in ENGLISH; player text Vietnamese. ChatGPT only when owner says "đoạn audit tuần này" / "đoạn điều phối tuần này" (see CLAUDE.md).

## Live
main = 64e91f1ae (player-dress). Fast-forward recipe:
S=<sha>; M=$(git ls-remote origin main|cut -f1); flock fetch.lock git fetch --depth=30 origin $S; git merge-base --is-ancestor $M $S && flock fetch.lock git push origin $S:refs/heads/main

## KIT section registry
On main §39–§56 (see PREAMBLE). Reserved: §52 fix-float relation table (+§52.1 kitImgSync), §57 kitNumDelta, §58 month-calendar, §59 placeholder-pics, §60 mk-colour, §61 fig-bg, §62 night-end, §63 recipes. Book title used §27.1.

## Workers still running in session 6 (their reports arrive in session 6; session 6 forwards them to you)
| Topic | Branch | State |
|---|---|---|
| reviewer ts-a + bot | review/ts-a | running |
| reviewer small-bugs-2 | review/small-bugs-2 | running |
| reviewer book-title | review/book-title @ e7769dc32 | running (PASS → ff main) |
| sfx | review/sfx | running |
| balance-pass (+ new bạc-equivalence scan) | review/balance-pass | running |
| item-events (item icon in dialogs, fly to Tư trang / burn) | review/item-events | running |
| place-colour (all rooms + lãnh cung stage background) | review/place-colour | running |
| rank-title (glowing rank line above names) | review/rank-title | running |
| month-calendar (desk calendar icon on room picture → 3×10 grid, fixed festivals only) | review/month-calendar | running |
| placeholder-pics (4 placeholder pictures + missing list) | review/placeholder-pics | running |
| por-scale (portrait face scale per group; sample first) | review/por-scale | running |
| mk-colour (makeup colour picks on her picture; sample approved by coordinator, sent to owner) | review/mk-colour | running |
| night-end (night mood pictures + seasonal dawn; sample sent) | review/night-end | running, wiring |
| recipes (learn/buy recipes, repeat fatigue, tastes, allergies, sub-styles per art, cheap teacher, bạc-equivalence) | review/recipes | running |
| fix-float r8 (co-op night desync from r7 FAIL) | review/fix-float(-r8) | running |
| act-picture redraw 380 (no faces, dark/light by tone) | review/act-pics2 | running, 8/380 live |
| art-complete (age×rank completeness: A 272 + eunuchs 360 + grown kids 144 approved; mamas via code) | review/art-complete @ 8028d57f6 | running |
Done, waiting owner: fig-bg sample (review/fig-bg 21eb452d3; A scroll / B moon window / C silk wash, rec C) — on her pick spawn step 2 (§61).

## New work to start (owner, not yet assigned)
1. Story quest progress label: show "Chương N · Hồi M" next to "bước 2/4" for every story line (e.g. 9 tuyến báo thù cho nhà) — whole class.
2. Thái y: owner was offered (1) monthly routine pulse visit, (2) "Mời thái y bắt mạch" anytime (finds illness, slow poison, musk), (4) bribed physician lies. Pregnancy already found 3–6 weeks later by thái y (j75). Waiting her pick.
3. Phế phi họ Lý side story (backstory, secret/evidence vs common enemy) — offered, waiting her yes.
4. Extra toilette reaction buttons (Ghi hận / Mách Hoàng hậu / Tặng lại / Hỏi bí quyết) — offered, waiting.
5. Night ideas 1–4 (morning gossip after nights etc.) — offered, waiting.
Queue (small, from HANDOVER_1115_PM): download-size (129 MB first load), fig-export-1100, rank-ui, toast over dialog at 844, k3 state row wrap kit rule, "thân ±N" → "thiện cảm" wording sweep, palace labels clipped above face strip, Bổng lộc legacy table, name/time overlap 1000x755, goodsGive empty "from" line, item names capitalised mid-sentence, 390x844 subtitle wrapping, 844x390 book cover hint overlaps TUẦN seal.

## Open owner questions
Huadian size 10/9/8% (rec 10%); son's birth exam vs direct promotion; servant/mama road exams; doat-giai pictures with Emperor keep/drop; Ngự tứ pet life-save stage; pet label "No" vs "Đói"; co-op pet actions; Ân tình header icon; fig-bg A/B/C; art-complete: old-save player looks (128) and promoted old-love men (56) draw or not.

## Machine notes
Main checkout shallow; workers use sparse worktrees in /home/user/wt/<name>; fetch --depth=30 under flock /home/user/wt/fetch.lock; never clone. Packs ~8 GB → repack when load drops (nice, pack.threads=1, --window=0). Own http server per worker, kill by PID only. Magnific balance ~1.45M credits.

## ACCOUNT MOVE (owner 15/11 ~22:10Z)
Account usage ~98%: the project moves to another account (new container). Everything needed must be on GitHub or the CDN.
- Reference images that lived only on local disk are now in dev/handover/refs/ (owner markups: pets, fig-bg, rosy; samples: night-end, por-scale, rank-title, mk-colour, calendar, pets, handmade works, fig-bg, placeholders, Ân sủng ref, rank-title ref).
- Session 6 agent log: dev/handover/AGENTS_SESSION6.txt.
- NOT saved (too big, rollback only): /home/user/wt/porscale-orig/ (150 MB originals of 3317 re-cropped portraits). The re-crop is live; to roll back one would need the old CDN versions (not kept).
- Running workers were told to commit+push WIP and write PROGRESS resume notes: balance-pass (review/balance-pass), fix-float r8 (→ review/fix-float-r8), mk-colour (review/mk-colour), reviewer small-bugs-2 (review/small-bugs-2-r6). Check each branch's PROGRESS file before re-spawning on the new account.
- New account setup: re-create Cloudflare CDN access (api.cloudflare.com connector) for cdn_sync, Magnific connector (folder ba4aecfe-efce-47e2-b53f-30d292091886 must be reachable — it belongs to the old Magnific account; if not shared, art jobs need a new folder and STYLE refs re-uploaded), GitHub access to thientran2711/cung-tuong-mong.

## SESSION 7 STATE AT ACCOUNT MOVE (15/11 ~22:15Z) — resume list for the next coordinator
main = d8b81af9e (check `git ls-remote origin main`). Session 7 ran in its own container (4 CPUs; /home/user/wt recreated; PREAMBLE copy at dev/handover/PREAMBLE.txt, coordinator line says session 7 — update to the new session). All agents below were told to push WIP + write PROGRESS resume notes. On the new account: read each branch's dev/PROGRESS_*.md, then re-spawn (worker = continue; reviewer = re-run review from the branch tip, reuse any pushed -r1 branch).
Went LIVE via session 7: month-calendar r1, chap-label r1, item-events r1 (§64), art-complete r1 (jartc + 50 pics), sfx r1.

### Workers (branch → state)
- review/coop-timer — co-op buổi countdown (§69), ready/timeout, host clock, pauses with cap.
- review/skin-match (art) — face vs hand/neck skin tone audit of all fig-*, player look1 rosy, ref maid m03.
- review/place-art @ 83864aa5d DONE (on place-colour): 9 trưa regraded, 5 nights darkened, 34 new paintings (tan-gia-kho, phong-cung-nu), j42/j94 wiring → place-colour reviewer asked to merge + review together.
- review/art-complete (art) — head c1feba27c (clean stop): KC c11–c32 + maids m01–m52 done, mole sweeps done; eunuch ranks: u01 done, u02–u30 left (87 sheets; ue_spec.py/ue_gens.txt; PROGRESS 'Group (b)'); rank-aware eunuch picker (jartc part 3) SẴN SÀNG KIỂM; group (c) grown kids 144 + kidBandOf not started. (old-save player looks 128 + promoted old-love men 56 now APPROVED by owner 23:05Z — draw them.)
- review/act-pics2 (art) — redraw 152/380+ live; worker re-checking keys 1–92 darks for night-sky look, continuing from 153.
- review/idea-history (aa1714ed) + review/idea-design (17b2ba71) — DONE docs: dev/ideas/HISTORY_IDEAS_1115.md, DESIGN_IDEAS_1115.md.

### Reviewers running (branch → r1)
(all session-7 reviewers have reported; none running)
recipes (cut — see below) (+ level-up grants a recipe, 4 sub-styles everywhere, Công/Dung/Ngôn/Hạnh sub-styles, Kỳ in sub-style UI), place-colour.

### READY, reviewer NOT yet spawned
- review/fix-float @ 922818a21 (= fix-float-r8; from s6) — co-op nights desync fixed (pp.nd stamps, stale nights never end a buổi, CW.wkIn, bend resend); coop-e2e plain 5×59/59, COOP_NIGHTS 2×59/59. Needs re-review r8 (merge onto current main; earlier r7 FAIL was only the co-op nights). coop-timer builds on it.
- review/fxkit @ 261c7c5f1 — KIT §68 painted-fx (jfxkit.js after jfx; 24 sprite kinds, 6 light loops, 2 alpha sheets, 3 edge overlays; 1.57 MB on CDN, ≤1.1 MB per device, on demand; Settings 'Hiệu ứng: Đầy đủ / Gọn' replaces 'Cảnh động'; red flash → ink-blood edge; all jfx/jitev code shapes → painted). REVIEW THIS FIRST (cardflip, promo-rules, night-end depend on it). Follow-up wiring list in its PROGRESS (harm/poison/rumour/seal/romance/betray/letter/gift steps; jitev burn flame, j93 light/sweep, j90 podium beam, night-end gradients still code-drawn).
- review/cardflip @ 1daf0d9d4 — card-flip scene §67 (jflip.js after jsfx; j75 2-line flip0 hook; painted plates landscape+portrait, Emperor hand, THỊ TẨM seal; shows real result incl. rằm/steal reasons; her-knowledge cards). Open: co-op pick still local (needs B2 host night), §68 guarded not merged, 844x390 plate edges fade, j93 kmFree doesn't wait for the week book.
- review/cal-plus @ 08c66800a (base e3fc5f61) — calendar (a)–(j) §58.3–58.6 + Trân nữ seal on every event frame §39.1 (168 dialogs scanned). Coordinator decision: ACCEPT weather from a seed (Emperor name + date) in j12 — needed for a true forecast and co-op sync. Reads thaiyNextVisit/cycleDaysOf if present.
- review/coop-pets @ 3236348b6 — co-op pet help/harm/steal relay, late-act re-send, gifts to friend reach her, NPC pets host-only, Ngự tứ text fix, label stays 'No'; coop-e2e 3×59/59 (E2E_TO=120000), coop-pets.js 44/44. Audit dev/coop/COOP_AUDIT.md: BROKEN in co-op → B2 nights (host must pick the Emperor's night; shared heir), B4 festivals + NPC schemes skip the guest, B3 Emperor death off in co-op, B1 item/kid steal + servant acts, B5 exam seat caps → co-op worker after review.
- review/promo-rules @ 53b0084d0 — son direct promo, daughter grace exam, servant/ma ma exams (exRun), reward chest §65 + kitPersonReveal, demotion FX §66 (glow waits for §68 fxkit); kitReward short-screen fix game-wide; j92 month-end dress gift off. promo-rules.js 29/29, coop 59/59. Art missing: per-rank pendants/bangles/sachets, maid robes per maid rank. Choices to check: her servant cap +1/rank, NPC caps unchanged (face pool full).
- review/cycle @ 578384ce — monthly cycle (jcycle.js last, BAL.cyc; cycleDaysOf/cycleLate/cycOn), Kính sự phòng book (2 roads), NPC read/forge, j19 'nguy' inside 'Nguyệt' red-text fix; cycle.js all sizes, coop-e2e 59/59. Merge note: assemble list clashes with jthaiy — keep both, jcycle last. Balance look needed on its prices/odds.
- review/thaiy @ 1445f431 — all 4 thái y ideas (jthaiy.js, BAL.thy, thaiyNextVisit()/thaiyVisits()); thaiy.js 49/49; coop-e2e cut off at 34 ok/0 fail by load → re-run in review. Site not rebuilt on branch.
- review/small-bugs-3 @ f490eb76 — 12 items (thân→thiện cảm, item caps, giver line, toast over dialog, face strip, header clash, subtitles, Bổng lộc kit table, k3 row, §28.1, §53 samples, Tuần fallback, rotate prompt). Close KIT_REQUESTS row "k3 top state row wrap" (now §31.2a).

### Owner decisions NOT yet assigned (start these on the new account)
1. result-sfx: win/fail sound on EVERY result surface, once, distinct; sound on by default; iPhone Safari unlock (owner ~22:05Z).
2. item-art: poem items as calligraphy scroll/sheet/fan (44), incense distinct colours, equipment dress no-rack redraw, pet thiếu niên chubby redraw ×8; save 1024 masters img/hi/<key>.webp (21:35Z).
3. item-big: centre-screen item display hi-res, transparent, no tile; frame only in Tư trang (21:35Z #4).
4. night follow-ups on top of night-end (21:10Z): morning after mặn nồng, lạnh nhạt mockery, Emperor-elsewhere music, rằm/festival variants.
5. fig-bg step 2 (20:40Z/20:50Z): A silk hanging scroll with top+bottom rods, same figure size inside, wide robes cropped to frame, status colour/motif table (review/fig-bg 21eb452d3, §61).
6. NPC death + replacement whole class (new face, never reuse; some posts empty) + Phế phi Lý stays in lãnh cung until death + Lý side story (20:40Z).
7. Real side stories: NPC life goals → side quests (20:40Z; pair with personality).
8. econ-items (20:05Z #4,#7,#8): stipend item skimming (+ charcoal/ice by rank from history ideas), stolen clothes re-issue + odds, girlhood chest 6 slots.
9. personality + trọng (13 virtues) for everyone incl. player; Thái hậu thỉnh an not flat +8, archetypes, lowering events (20:05Z #1,#2).
10. emperor (20:05Z #5,#6): poison Emperor/Thái hậu roads (taster / two-pot / touch record checks), Emperor visits her palace.
11. header-tabs + update-notes (20:05Z #10,#14).
12. presentation (20:05Z #11–#13): sound by event group + voices, event frames by group/main/side story, remaining approved animations (via §68).
13. mood bar (Sims-like, 20:05Z #3).
14. huadian 8.5% batch (reuse review/huadian-size).
15. Idea builds (owner: build without waiting): memories/Kỷ niệm + hook ledger first, then witnessed NPC scenes, bond ranks, arch-rival, Chí hướng, onboarding mentor, co-op Liên thủ, life-end montage, taste book; history: trap dress, Ban Tiệp dư palanquin, hiệp lý lục cung, child-raising below Tần, hidden prince, tùy giá.
16. Small queue: whole-game mole audit with dev/figwork/artcomplete/demole_por.py; consort-c12-ty5-a51 pale patch over eyes → redraw; jk2b §7 veil/scar box follow jkpor zoom; outside route art (house/city paintings, Huynh trưởng civilian figure, house map); VP "theo lòng nàng" ambiguity; download-size; fig-export-1100; rank-ui; Bổng lộc / goodsGive done in small-bugs-3.
Owner questions still open: j72 Việc nhờ "bước" vs "Hồi" (rec keep bước); stage paper halo behind names at night (rec keep); hourly watch trigger was blocked by permission in session 7 — new coordinator should create its own.
KIT registry additions by session 7: §64 item-events, §65 promo-reward, §66 rank-change FX, §67 card-flip, §68 painted-fx, §69 coop-timer.
- (s7 add, ~22:35Z) main = d8b81af9e (small-bugs-2 r6, ff by s6). Owner 22:25Z rank-title colours vivid + glow only on paintings → sent to rank-title reviewer. Owner 22:30Z pet label stays "No" (my "Đói" decision cancelled; coop-pets told). fix-float r8 checkpoint 677e54e6b (CW.wkIn, bend re-send) → coop-timer told to build on it. mk-colour checkpoint 5fcc2dece (14 presets; diêm dúa preset ⇒ made-up face). NEW queue item: real-phone UA test mode (rot.js host mode on 390x844 is what phones see; tests run direct mode); Kính sự phòng 844x390 name tags overlap (cosmetic).
- (s7 add) recipes-r1 @ edf6a92b0 NOT final (cut by account move): level-up grants a recipe, 4 sub-styles for all 11 kinds, Kỳ OK, book/ma ma prices fixed to bạc rule, co-op shared taste seed, old-save sub-styles kept. TODO before PASS: merge onto current main, item-events/month-cal/ts-oldsave/coop-e2e, recipes.js all sizes. Resume: dev/PROGRESS_recipes-r1.md. Tứ đức sub-styles spec in that file → worker on top of r1. Coordinator decisions: (a) Tứ đức levels 2/4/5 each open the next sub-style — OK; (b) consort-teacher cost (thiện cảm −4) must scale with rank to match the palace teacher fee in value; (c) Tứ đức teacher fee → 8% of pay like arts.
- (s7 add) Owner 22:35Z: (1) all calendar ideas (a)–(j) = review/cal-plus (in progress); (2) NEW UNASSIGNED: painted 'học thành tài' level-up scene on every art / Công Dung Ngôn Hạnh level-up (gains fly to Tư trang, new recipe lines; uses §68); (3) PERFORMANCE BUDGET now a PREAMBLE kit rule; NEW UNASSIGNED high priority: download-size (129 MB first load) first, then Settings 'Hiệu ứng: Đầy đủ / Gọn' + auto-Gọn, perf test (frame time, memory, bytes per scene).
- (s7 add) Owner 22:45Z painted animations for ALL moments (15-item list in OWNER_DECISIONS) → sent to fxkit worker (library + red-flash replacement first); wiring into every event = follow-up worker after §68 lands.
- (s7 add) fxkit INTERIM: §68 API live on review/fxkit @ cdbccc6e8 (jfxkit.js after jfx; img/fx/ 0.42 MB; 17 sprites, 5 screen-blend lights; OPT.fxon Đầy đủ/Gọn + auto-Gọn; all code-drawn Pixi textures removed). promo-rules glow/crack + night-end effects should switch to it when merging.
- (s7 add) LIVE main = face-reveal r1 (f0d289692): any drawn dialog showing a person reveals face (after evGate; held dialogs don't), her household known, look-only panels (Đã biết / Chứng cứ / Tâm trạng) don't reveal, old-save backfill.
- (s7 add) outside-r2-r1 @ 4965a1166 FAIL (fixes made: home identity card 18 tuổi, 13 non-bạc twins for 2–10 bạc acts, home road hidden in co-op for now, wording). FAIL items for a worker on top of r1: (1) Gia tộc pager portraits under the sub-tab bar at 755x1000/844x390; (2) home road in co-op (shared calendar + S.kc sync, then remove kcCoop gate); (3) Phúc tuyển result card stays open over the first palace screen; (4) S.kc became undefined at turn 3 in one 1366 random run — find the choice that clears it; (5) girlhood chest (#8) not on branch. Notes: dev/PROGRESS_review-outside-r2-r1.md.
- (s7 add) night-end-r1 @ b1ac1047e FAIL (r1 fixed mood step in bot path, KIT §62 scene + painted rules). FAIL items for worker on r1 (use §68 fxkit): (1) CSS-drawn glows/moon/sun/fireflies/snow/rain in jne.js → painted sprites/lights; (2) all 8 pictures 1024x768 → redraw ≥1536 wide, safe zone, focal point, portrait object-position crop; (3) lonely picture is autumn in every season → per-season or neutral; (4) beat shows empty frame when picture slow → wait or skip; (5) no celebration FX over a cold night; puffs cover row text; (6) 844x390 Nhận button below fold. MANIFEST.json: JSON union with sfx. Night follow-ups (21:10Z) start after this passes. Notes: dev/PROGRESS_night-end-r1.md.
- (s7 add) LIVE main = placeholder-pics r1 (ddde2842d): 4 placeholder pictures (KIT §59), act/exam picture slot kept; MISSING_PICS.md: events 1/303 (e68:flowerBloom), acts 18/95 on placeholder → art queue.
- (s7 add) act-pics2 @ f224e35d4: 192/380 live; 25 night-sky darks in keys 1–92 redrawn as K-g-h (cache-safe names). Next from key 193 (scenes 193–212 written). Coordinator decisions for next worker: redraw sai-khat-bong (pink floral on a man → no pink), redraw bao-cung-chinh-ti (3–4 figures = group), say-thai (miscarriage) tone → dark (fix tag in redraw_order.txt and redraw).
- (s7 add) Owner 22:55Z co-op timer additions (Tạm dừng for both, generic waiting line, lag-safe absolute deadline + clock offset, grace, reconnect, latency e2e) → sent to coop-timer worker.
- (s7 add) LIVE main = rank-title r1 (43daceaf3): vivid rank tones (≥4.4:1), glow/outline only on paintings, plain in framed UI; her name gold glow on paintings / black bold in UI (§48.1b); no box around dp captions (§48.1c).
- (s7 add) HIGH PRIORITY REGRESSION: at 844x390 the stage tags overlap (Quý phi / Đáp ứng) and figures squeeze bottom-left beside '+2' — clean on e5a327d1, broken on d8b81af9 (likely small-bugs-2 r6 'j59 panel side by centre'). Fix first on the new account. Owner questions from rank-title: Thái hậu title bronze vs plum frame; Hoàng thượng #8f6800 vs Hoàng hậu #8c5f00 look alike; Đáp ứng muted on paintings.
- (s7 add) LIVE main = place-colour r1 + place-art (f53bdade0): one scene grade incl. Pixi, root-cause fix j3 new-day overwrote lãnh cung visit, 34 new paintings (Tân Giả khố, maid room), 0 flagged states in 968. Check: painting missing in reviewer's 844x390 shots (may be the same 844 stage regression or test timing).
- (s7 add) Owner 23:05Z batch — ALL UNASSIGNED (account move): (a) makeup 8+8 presets (4 cool/4 warm each) + exact lip QA — s6 told mk-colour directly; (b) Công Dung Ngôn Hạnh WORKS: design CDNH works with 4 sub-styles each, giftable (pairs with recipes-r1 Tứ đức spec); (c) DRAW the 128 old-save player looks (t2–t8+cold × 4 ages) AND add look1–4 as new faces on all roads (HELD item now APPROVED); (d) DRAW the 56 promoted old-love men (APPROVED); rule: anything drawable → draw, credits plentiful; (e) foreign princess: origin 'nc' Nam Chiếu hòa thân exists → make it visible in identity pick + add ≥1 more foreign-princess origin with its own story line; (f) 'Biếu quà làm lành' also accepts a handmade work/item of equivalent value; (g) DRESS CONTEST: theme tag on every wearable + visible luxury value (≤~200); score needs right theme AND luxury within her rank allowance; over → vượt phẩm penalty; (h) WEATHER redo with §68 painted effects under the perf budget.
- (s7 add) Owner 23:15Z refinements (UNASSIGNED): CDNH works = 10 items per kind × 4 grade tiers with own Magnific art (same shape as j83 works); dress-contest luxury = a RANGE per theme/occasion (inside good / below too plain / above phô trương) also capped by rank; deepen xa xỉ into a real system (visible luxury on every wearable/gift, each occasion expects a range, host taste/trọng shifts it, overspending → xa hoa reputation, under-dressing → thiếu lễ, tie to luxMonth + rank in jaudit/jinv/j92; NPCs same). Co-op timer: owner 23:10Z default 5 min, host picks 3/5/8, pause during reward/gift/edict/night animations → sent to coop-timer worker.
- (s7 add) Owner 23:20Z: co-op timer pauses ONLY for minigames (sent to coop-timer). NEW UNASSIGNED: spread events across the day — each event family gets a fitting buổi (thỉnh an/edicts sáng, visits/gossip trưa–chiều, banquets/intrigue tối, night things đêm), cap popups per buổi, queue the rest; no stipend+rewards+news all the same morning; bot histogram of popups per buổi before/after; whole class (j68, j72, jevb, econ, festivals, toilette reactions).
- (s7 add) Owner 23:30Z NEW UNASSIGNED: makeup final-look reveal scene after the makeup minigame (build on review/mk-colour once it lands; design in OWNER_DECISIONS 23:30Z): full-body figure steps in on painted dressing-room/bronze-mirror backdrop, look-specific §68 effect, zoom into face inside a round bronze-mirror frame, hold 2–3 s, tap skip, close card (tier + preset + reaction hint); in-minigame mirror portrait live-updates colours; co-op friend sees a small notice only.
- (s7 add) Owner 23:35Z: makeup also needs 8 VỤNG looks (4 cool + 4 warm; crooked brows, lipstick past the line, smudged shadow, blotchy powder, uneven blush; anchor-exact) — told to s6 mk-colour worker; carry over if it stops (review/mk-colour PROGRESS).
- (s7 add) SESSION 6 CLOSED (archived). Its last branches to re-spawn: review/j59-fix @ da15718ce (844 stage regression fix) → s7 reviewer spawned (review/j59-fix-r1); review/mk-colour (latest) — left: --stale re-measure + fixtoil → toil-fit2.json, 8+8 presets, 8 vụng looks, lips QA, viewport tests, then review (dev/PROGRESS_mk-colour.md); review/balance-pass (latest) — HH 0% on bots (promo-exam gate?), bạc-equivalence scan (dev/PROGRESS_balance-pass*.md).

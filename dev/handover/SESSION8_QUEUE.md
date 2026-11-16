# SESSION 8 QUEUE (coordinator's live dispatch list; nothing from HANDOVER_TO_SESSION8 may drop off)
Status: QUEUED / RUNNING (agent) / SẴN SÀNG KIỂM / REVIEWING / PASS-LIVE / FAIL→worker / BLOCKED(reason)
Slots: browser-heavy <= 6 at once, total agents <= ~12 (4 CPUs). Hourly watch refills slots in this order.
CDN uploads OK again (owner saved the Cloudflare token; R2 verified). Use CLOUDFLARE_API_TOKEN=proxy-injected if a script needs the variable.

## A. Reviewers (HANDOVER_TO_SESSION8 §2, priority order)
| # | Branch | Status |
|---|---|---|
| A1 | review/j59-fix → r1 PASS 48a1c58d3 | LIVE |
| A2 | review/fxkit → r1 PASS f012058f3 | LIVE |
| A3 | review/small-bugs-3 → r1 PASS d34b5116a | LIVE |
| A4 | review/fix-float → r9 PASS 7ba53114d | LIVE (main fast-forwarded) |
| A5 | review/coop-timer → r1 PASS b2690dfb3 (stuck-buổi fix, reconnect, countdown, friend chip KIT §69.2) | LIVE (owner notified) |
| A6 | review/thaiy | QUEUED |
| A7 | review/cycle (after A6; keep jcycle last) | QUEUED |
| A8 | review/cal-plus | QUEUED |
| A9 | review/promo-rules (after A2) | QUEUED |
| A10 | review/coop-pets | QUEUED |
| A11 | review/cardflip (after A2) | QUEUED |
| A12 | review/art-complete (code part: eunuch picker) | QUEUED |
| A13 | review/recipes-r1 (finish cut review) | QUEUED |

## B. Workers on FAILED reviews (§3)
| B1 | review/night-end-r1 @ 8d1652244 (r2: FAIL fixed + tone pictures + light panel + follow-ups) | REVIEWING (night-end-r2) |
| B2 | review/outside-r2-r1 @ add2c0669 (5 FAIL items fixed) | REVIEWING (outside-r2-r2, opus) |

## C. Unfinished workers (§4 + §9)
| C1 | face-sharp-r1 PASS ca5791108 → merge-train-1 (HD batch continuing) | MERGING |
| C2 | review/rank-colour @ 99b8b62 (KIT §48.3) | REVIEWING together with pick-hint-r1 |
| C3 | review/art-complete @ e8a7446e4+ (part 2 PAUSED by coordinator to free a slot; resume from /home/user/wt/artc PROGRESS) | QUEUED |
| C4 | review/act-pics2 @ 5f80a2727 (237/380 live; 143 left from thu-cu-lot) | RESUME later (QUEUED) |
| C5 | review/skin-match @ 9bb31ae53 (1500/1500 on CDN) | SẴN SÀNG KIỂM → reviewer QUEUED-NEXT |
| C6 | review/mk-colour (8+8 presets, 8 vụng, lips QA, then reveal scene) | QUEUED |
| C7 | review/balance-pass (HH 0%, bạc-equivalence scan) | QUEUED |
| C8 | review/fig-bg step 2 (silk scroll A) | QUEUED |
| C9 | review/huadian-size (batch at 8.5%) | QUEUED |
| C10 | OWNER_LEDGER sweep (docs) | DONE (dev/handover/OWNER_LEDGER.md; D29–D49 added) |
| C11 | review/pick-hint @ 29972cd7 (incl. rank+name together + rank halo) | SẴN SÀNG KIỂM → REVIEWING (pick-hint-r1) |
| C12 | review/hc-portrait → r1 PASS 583858942 (+ roster labels fix KIT 45.2) | LIVE |
| C13 | gift-pick-r1 PASS ff5f42b77 → merge-train-1 | MERGING |
| C14 | review/row-align @ 0886f329b | reviewer stopped (stuck) → re-review QUEUED-NEXT |
| C15 | review/mood-dialog → r1 PASS f8f51797c | LIVE |
| C16 | review/item-info → r1 PASS 3ef079f61 | LIVE |
| C17 | stage-fig-size-r1 PASS 11881dfa1 → merge-train-1 | MERGING |

## D. UNASSIGNED owner asks (§5; ledger worker refines into dev/handover/OWNER_LEDGER.md)
D35 → review/tutorial-r2 @ 62ae4ed74 (goal card, 12-step tour, tappable goal strip, kitGoalDetail §72) — adding "what is this game" intro, then review
D5+ → Emperor side story (accession, weak court) + every NPC side quest line (owner 16/11, opus) — after C49
D1 result-sfx · D2 item-art · D3 item-big · D4 NPC death/replacement + Phế phi Lý side story · D5 real side stories (NPC goals→quests) · D6 econ-items · D7 personality + trọng 13 virtues, Thái hậu archetypes, thỉnh an not flat · D8 emperor poison roads + Emperor visits her palace · D9 header only her info + room tabs · D10 update-notes popup + Settings "Thông tin cập nhật" · D11 presentation (sound by event group + voices, frames by event group, §68 into every event, 15-item list 22:45Z) · D12 mood bar · D13 spread events across buổi (cap + histogram) · D14 'học thành tài' level-up scene · D15 download-size 129 MB + perf test CI · D16 Tứ đức sub-styles + CDNH works 10×4 with art · D17 luxury/xa xỉ system + dress-contest themes + range · D18 foreign princess origin visible + one more · D19 "Biếu quà làm lành" accepts works/items · D20 weather redo with §68 · D21 co-op B1–B5 · D22 real-phone UA test mode · D23 whole-game mole audit · D24 consort-c12-ty5-a51 eye patch · D25 veil/scar box follow jkpor zoom · D26 idea builds DESIGN_IDEAS_1115 + HISTORY_IDEAS_1115 (memories + hook ledger first) · D27 extra toilette reaction buttons · D28 makeup final-look reveal (inside C6)
All QUEUED. Dependencies: D11/D20/D14 after A2 fxkit; D21 after A4/A5; D17+D16+D19 share econ files → one worker at a time.
Added by the OWNER_LEDGER sweep (C10; detail + sources in dev/handover/OWNER_LEDGER.md §7). Most are owner-approved work stranded on unmerged branches 600–1100 commits behind main → worker re-ports onto current main, then reviewer:
D29 schedules + ONE location ledger j95 (habits/intentions, trysts, S.roster, motive gate, ROSTER bot audit) — re-port review/schedules2 (+wip/kit-j95) · OD:L32–36
D30 palace detail map + residence paintings (PL 'nhat' courtyards by chủ vị rank → rooms with real people; 25 rooms × 16) — re-port review/palace-map (incl. residence-art) · OD:L134–166
D31 difficulty modes Dễ/Vừa/Khó per life — re-port review/difficulty v8, re-measure with C7 · OD:L85, L128
D32 succession choice (Hoàng thái hậu / nhiếp chính / Nữ đế + epilogues, Tiên đế băng hà art) — re-port review/succession2 · OD:L88, L106, L131
D33 Lối riêng routes + trích huyết nghiệm thân (+ water-bowl picture) — re-port review/routes, fix bot, escape 10–25% · OD:L184, L190, L192
D34 scheme minigames Nghe ngóng/Truyền lời/Mặc cả/Thời cơ — re-port review/scheme-games, wire j78/j9/bribe · OD:L192, L195, L199
D35 new-player tutorial — finish review/tutorial (2/3) on the current tabs · OD:L227
D36 online leaderboard (review/rank) + Bảng vàng podium per 08:55Z + end-of-life card (review/rank-ui WIP) · OD:L281, L378
D37 finger-drag page curl — re-port review/drag-curl · OD:L276
D38 lost items + item rivalry (extort, steal, plant to frame) — re-port review/lost-items (jlost) · OD:L108, L117
D39 appearance overlays (illness, poison, slap/punishment, allergy rash; her own allergy) — re-port review/appearance + review/items-earned (jrash) · OD:L107, L121–130
D40 bad-weather outdoor-act risks (cold/slip, umbrella/cape/sedan) — re-port review/weather with reviewer fixes · OD:L348, L351
D41 she promotes her own maids/eunuchs (Chưởng sự cô cô, Nữ quan, Thủ lĩnh, Tổng quản), rank-capped, NPCs same · OD:L302
D42 places leftovers: Dãy nhà cung nhân via edit (review/places), Hoán y cục/học đường reachable, A ca sở + Đông cung for princes · OD:L82, L86, L87
D43 postponed appearance art (pregnancy 6/9 months, nun, glow, grey strands, smallpox) — confirm with owner first · OD:L121, L122, L751
D44 fig export ≥1100 px (Fold stage upscales figures) · PM:L223
D45 small art: earrings + embroidered shoes, guard 4 indigo, c02-t1-a18 grey skin, Emperor costume audit (no Qing hat) · AM:L34, OD:L364
D46 draw own pictures for acts/events still on placeholder (MISSING_PICS: acts 18/95, e68 flowerBloom) + Đoan ngọ banner check · OD:L444, L550
D47 small-bugs-4: jaudit 'Vì sao' trung y wording; 'Phi ???' greet/arc tab; VP 'theo lòng nàng'; one kit sample page; "Đang cài" leftover; servant-road header '!' · PM:L224–308
D48 outside-route art: house/city paintings, Huynh trưởng civilian figure, house map · PM:L330
D49 collection milestones: Sổ luân hồi titles at 20/50/100/200 items + Phúc duyên once per life (replace jearn stand-in) · OD:L45, L46
Dependencies: D29 before D13 (events/places read the ledger); D30 + D42 share j11/jbd scene files; D31/D33 re-measure with C7; D39 before D43; D36 podium uses j90.

## E. Open owner questions (§6) — ask one at a time
j72 bước vs Hồi · stage paper halo · Thái hậu title bronze vs plum · HT vs HH gold alike · Đáp ứng muted on paintings
| C18 | review/kit-popup-sample @ b6242dea (screens sent to owner) | SẴN SÀNG KIỂM → reviewer QUEUED-NEXT |
| C19 | review/pic-dupes-r1 @ b0ff9ff35 (hanh-le-v2 fixed) | SẴN SÀNG KIỂM → short re-review QUEUED-NEXT (sonnet) |
| C20 | review/act-text @ 593e66b3a (PAUSED for slot; left: full after-scan 6 states, 755 panel scan fix, long rows) | QUEUED (resume) |
| C21 | review/khac-day → r1 PASS 2d038139e (+ co-op walk-spill COOPW fix) | LIVE |
| C22 | review/boot-flash (owner s8: raw old skeleton flashes on launch) | RUNNING |
| C22 | boot-flash-r1 PASS 20f4d7c9e → merge-train-1 | MERGING |
| C23 [→ FOREMAN B] | review/mg-easy (owner s8: Thơ minigame too hard; visible rhyme, hints, level-scaled; audit all knowledge minigames) | QUEUED-NEXT |
| C24 [→ FOREMAN B] | review/chapter-detail (owner s8: tap chapter shows nothing; detail + inline progress; no dead taps) | QUEUED-NEXT |
| C25 | review/press-fx → r1 PASS 2afdafc39 (+ close ✕ never covered) | LIVE |
| C26 [→ FOREMAN B] | review/stat-fx (owner s8: slower readable stat +/- with name, cell glow GREEN for +, red for −, pulse/scale) | QUEUED-NEXT |
| C27 [→ FOREMAN B] | review/buoi-transition (owner s8: page-flip on buổi change looks odd → ink-wash time-of-day transition; needs A2 fxkit) | QUEUED-NEXT |
| D50 | consorts without full-body figure art show a placeholder frame in the dialog person column (seen 755x1000, mood-dialog worker) → art-complete follow-up | QUEUED |
| C28 [→ FOREMAN B] | review/room-btn (owner s8: header '‹ Phòng' bar → painted room icon button) | QUEUED-NEXT |
| C29 [→ FOREMAN B] | review/rel-picker (owner s8: Giao tình relation pickers waste space → compact) | QUEUED-NEXT |
| C30 | night-panel → merged into B1 | MERGED |
| C31 | review/log-sync @ e51896108 → review FAIL (week card noise, bổng lộc twice, monthly drift twice, bookkeeping lines, wording) → same worker fixing | RUNNING |
| C32 [→ FOREMAN B] | review/page-curl2 (owner s8 APPROVED: Tuần lục only — landscape curl, portrait paper slide; no swipe elsewhere; tab change animation only on tap) | QUEUED-NEXT |
| C33 [→ FOREMAN B] | review/weekbook-entries (owner s8: week book person page shows unrelated raw entry; per-person readable entries) | QUEUED-NEXT |
| C34 [→ FOREMAN B] | review/contest-ui (owner s8: ALL study/work/minigame frames picture LEFT info RIGHT incl. result panel; REAL PRIZES by place (themed item, bạc, chest, title, Emperor gift) + podium rewards 2nd/3rd, same figure scale, contestants revealed; intro layout picture-left/info-right/scrolling contestant box, no empty counters) | QUEUED-NEXT |
| C35 [→ FOREMAN B] | review/pcard-fill (owner s8: person card right side empty → mood, relations, tastes, known facts, recent dealings, quick actions) | QUEUED-NEXT |
| C36 | review/opt-pics → r1 PASS 900ace7fb | LIVE |
| C37 [→ FOREMAN B] | review/panel-size (owner s8: all pop-ups same frame size per viewport) | QUEUED-NEXT |
| D51 | fxkit follow-ups: cracked tea cup, scroll unroll, red seal slam, swaddle reveal, letter under door + wire call sites (PROGRESS_fxkit.md); clean committed .out/ folder on main | QUEUED |
| C38 | ev-art-fit-r1 PASS 10d770744 → merge-train-1 | MERGING |
| C39 [→ FOREMAN B] | review/tab-underline (owner s8: stray bar through selected chip + grey scroll track under chip rows, all tab rows) | QUEUED-NEXT |
| D52 | skin-match audit of 7347 never-measured figures (plan in PROGRESS_review-skin-match.md; worktree /home/user/wt/skin cache) | QUEUED |
| C40 [→ FOREMAN B] | review/actcard-small (owner OVERRIDE: keep big + small cards; small card picture square → portrait rectangle 3:4; equal sizes per grid; tap picture → big + info; odds label or "!" → why-detail) | QUEUED-NEXT |
| C41 [→ FOREMAN B] | review/tuduc-mg (owner s8: Tứ đức minigames missing → 4 games Công/Dung/Ngôn/Hạnh, easy rules) | QUEUED-NEXT |
| C42 | review/evidence-truth @ 353c17048 (jtruth.js; clean player 0 true evidence) | REVIEWING (opus) |
| C43 | review/coop-invite-ux (owner s8 'Rồi sao nữa': waiting state, 1-2-3 steps, auto-continue on join) | QUEUED |
| C44 | review/cloud-save (owner s8: same character on phone + iPad, solo + co-op; sync code, auto upload, conflict pick, 10 versions) | QUEUED-NEXT |
| C45 | review/newgame-ui @ f4ddeefeb (lag fixes, same heights, Nhập cung event frame) | REVIEWING (opus) |
| C46 [→ FOREMAN B] | review/map-labels (owner s8: Dư đồ labels tiny/faint/cut → readable kit name tags) | QUEUED-NEXT |
| C47 | review/stage-side → r1 PASS 6298d2f55 | LIVE (note: 755x1000 3 people shows 2 + page chip) |
| C48 review/save-slots → r1 PASS c36a06321 | LIVE |
| C49 | review/palace-start @ 3ac727833 (3–5 small kids, 50/50, no đích tử, accession setting; faction road = hook only → D5) | REVIEWING (opus) |
## Ownership marks (16/11): items in dev/handover/FOREMAN_C.md Slice C are [→ FOREMAN C]; items in FOREMAN_B.md are [→ FOREMAN B]; everything else = session 8.
| D53 | opt-pics leftovers: 25 options still on placeholder (dev/test/opt-pics-table.md r1) | QUEUED [→ FOREMAN C] |
| C50 | hc-portrait-revert-r1 PASS 0001eaf49 → merge-train-1 | MERGING |
| C51 | review/reign-road (Emperor side story + faction road + NPC side quests, built on palace-start) | RUNNING (opus, session 8) |
| C52 | review/balance-after-truth (owner s8: impact of evidence-truth + palace-start on Hoàng hậu / death rates) | RUNNING (opus) |
| C53 | review/act-dedupe (owner s8: Hành sự repeats other tabs (vẽ/thơ/viết văn vs Tài nghệ) → one place per thing; whole-game audit) | RUNNING (sonnet) |
| C54 | review/mortality (owner s8: age-based death/illness for all incl. Emperor/Thái hậu; poison/assassination; Emperor death → her fate) | RUNNING (opus) |
| C55 | review/elder-staff (owner s8: real named elderly staff in offices; tutorial guide = real NPC via staffGuide()) | RUNNING (opus) |
| watch 16/11 | panel-size-r1 a523531da → main. merge-train-1 (6) running, then merge-train-2 (13 PASSes). Kit keeper review/kit-keeper-1 for K1–K5 + KIT number collisions §71/§72. tutorial-r2 10a37960b reviewer running. Act split + lifespan: waiting for the owner. |
| C56 | review/facefx-all (face marks for every person; from appearance-port-r1) | RUNNING (sonnet) |
| C57 | review/newgame-ui-r2 (fix reviewer FAIL: §8.1 vs 28.11a portrait tier, pinned choices) | RUNNING (sonnet) |
| C58 | review/act-dedupe wave 1 (approved AI/VIỆC/ĐI ĐÂU split; dedupe, icons, '!', shop) | RUNNING (opus). Waves 2–3 QUEUED after |
| LIVE 16/11 | main = 4f5e5f3b3 (merge-train-1 + 2). In: boot-flash, stage-fig-size, face-sharp-r1, hc-portrait-revert, gift-pick, ev-art-fit, tab-underline, actcard-small, pcard-fill, mg-easy, buoi-transition, room-btn, rel-picker, appearance-port, stat-fx, pic-dupes-r2, kit-popup-sample, thaiy, cal-plus, pick-hint+rank-colour, cardflip, promo-rules + kit keeper fixes. Post-merge regression worker running (review/postmerge-fix-1). |
| C59 | elder-staff 06a008041 reviewer running |
| C60 | review/coop-chat (owner-approved co-op chat) | RUNNING (sonnet) |
| C61 | review/fig-hd-upscale (Magnific upscale HD for servants/eunuchs/men; owner approved credits) | RUNNING (sonnet) |
| C62 | review/servant-system (room-stage household bug + servant audit/proposal) | RUNNING (opus) |
| C63 | review/facefx-all-r1 (fit rows + merge main) | RUNNING (sonnet) |
| C64 | review/slap-mg (slap + dodge minigame, 3 tiers) | RUNNING (sonnet) |
| C65 | review/kpanel-compact (LIVE: title menu frame huge + layout flips) | RUNNING (sonnet) |
| C66 | review/pcard-actrow (LIVE: person-card act boxes → kit long row) | RUNNING (sonnet) |
| C57 | newgame-ui-r2 70119a805 reviewer | RUNNING |
| C59 | elder-staff-r1 a3dbdc19f | LIVE |
| MOVED TO FOREMAN D (16/11) | newgame-ui-r2 review, row-align re-review, C43, C44, C3, D50, D51, D52; act waves 2–3 on GO |
| watch 16/11 #2 | merge-train-3 (12 PASSes: D40, D32, D30, D38, C33, C46, C34, mk-colour, opt-pics2, placeholder-pics2, recipes-r2, update-notes) RUNNING. Foreman B Q16–Q20 answered; Q21 sheets sent to the owner. newgame-ui-r2 reviewer still waiting for a slot. |
| watch 16/11 #3 | main 7f20b751b. Train 3 += page-curl2, stat-fx-2, places-port, outside-art, item-art-r5, small-bugs-4. Running urgent: modal-scroll, coop-night-sync, kit-sweep (+ stage rail/goal icon), kpanel-compact reviewer, pcard-actrow (+ person pickers, gift Chí tôn), cardflip-smooth, book-fig. Disk cleaned to 1.5 GB (old worktrees, tmp packs, git prune). |
| C64 | review/slap-mg 3c4f1c81b SẴN SÀNG KIỂM. Its KIT number becomes §78 (§76 = kitPlaceIcon, §77 = kitStageRail). Review AFTER review/facefx-all-r1 lands (both touch slapGive / KIT_FACEFX 'tat'; merge by hand). Co-op dodge not built. | WAITING |
| LIVE | co-op: shared timer frozen after rejoin + friend stuck after rejoin → review/coop-night-sync (top priority) |
| C60 | review/coop-chat bdd2b6b53 SẴN SÀNG KIỂM (Worker v coop-2 already deployed, backward-compatible). Review AFTER goal-strip-fix (kitStageRail) lands: mount the chat in the rail, remove the fallback button, renumber §76→§80, and run coop-e2e + coop-chat after coop-night-sync. | WAITING |

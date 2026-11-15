# SESSION 8 QUEUE (coordinator's live dispatch list; nothing from HANDOVER_TO_SESSION8 may drop off)
Status: QUEUED / RUNNING (agent) / SẴN SÀNG KIỂM / REVIEWING / PASS-LIVE / FAIL→worker / BLOCKED(reason)
Slots: browser-heavy <= 6 at once, total agents <= ~12 (4 CPUs). Hourly watch refills slots in this order.
CDN uploads OK again (owner saved the Cloudflare token; R2 verified). Use CLOUDFLARE_API_TOKEN=proxy-injected if a script needs the variable.

## A. Reviewers (HANDOVER_TO_SESSION8 §2, priority order)
| # | Branch | Status |
|---|---|---|
| A1 | review/j59-fix (+ r1 WIP) | RUNNING wave 1 |
| A2 | review/fxkit → r1 PASS f012058f3 | LIVE |
| A3 | review/small-bugs-3 | RUNNING wave 1 |
| A4 | review/fix-float → r9 PASS 7ba53114d | LIVE (main fast-forwarded) |
| A5 | review/coop-timer (after A4) | QUEUED |
| A6 | review/thaiy | QUEUED |
| A7 | review/cycle (after A6; keep jcycle last) | QUEUED |
| A8 | review/cal-plus | QUEUED |
| A9 | review/promo-rules (after A2) | QUEUED |
| A10 | review/coop-pets | QUEUED |
| A11 | review/cardflip (after A2) | QUEUED |
| A12 | review/art-complete (code part: eunuch picker) | QUEUED |
| A13 | review/recipes-r1 (finish cut review) | QUEUED |

## B. Workers on FAILED reviews (§3)
| B1 | review/night-end-r1 FAIL 6 items + in-night picture by tone + light night panel (C30 merged) + follow-ups | RUNNING |
| B2 | review/outside-r2-r1 FAIL 5 items → worker | QUEUED |

## C. Unfinished workers (§4 + §9)
| C1 | review/face-sharp (her face hazy on stage; LIVE BUG) | RUNNING wave 1 |
| C2 | review/rank-colour (owner s8: rank colour in picker rows, whole class) | RUNNING wave 1 |
| C3 | review/art-complete (eunuch ranks, grown kids, 128 old looks, 56 old-love men, demole) | RUNNING wave 1 |
| C4 | review/act-pics2 @ 5f80a2727 (237/380 live; 143 left from thu-cu-lot) | RESUME later (QUEUED) |
| C5 | review/skin-match @ 9bb31ae53 (1500/1500 on CDN) | SẴN SÀNG KIỂM → reviewer QUEUED-NEXT |
| C6 | review/mk-colour (8+8 presets, 8 vụng, lips QA, then reveal scene) | QUEUED |
| C7 | review/balance-pass (HH 0%, bạc-equivalence scan) | QUEUED |
| C8 | review/fig-bg step 2 (silk scroll A) | QUEUED |
| C9 | review/huadian-size (batch at 8.5%) | QUEUED |
| C10 | OWNER_LEDGER sweep (docs) | DONE (dev/handover/OWNER_LEDGER.md; D29–D49 added) |
| C11 | review/pick-hint @ 29972cd7 (incl. rank+name together + rank halo) | SẴN SÀNG KIỂM → REVIEWING (pick-hint-r1) |
| C12 | review/hc-portrait (owner s8: Hậu cung portrait frame top gap + widen) | RUNNING |
| C13 | review/gift-pick (owner s8: gift picker picture grid + gift animation; animation needs A2 fxkit) | RUNNING |
| C14 | review/row-align @ 0886f329b | REVIEWING (row-align-r1) |
| C15 | review/mood-dialog → r1 PASS f8f51797c | LIVE |
| C16 | review/item-info @ 50a0f22da (KIT §70 jitd) | REVIEWING (item-info-r1; BAL.itd.allow=false per owner 08:10Z) |
| C17 | review/stage-fig-size (owner s8: event dialog figure column cap + crop skirt) | RUNNING |

## D. UNASSIGNED owner asks (§5; ledger worker refines into dev/handover/OWNER_LEDGER.md)
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
| C19 | review/pic-dupes (owner s8: two acts share one picture; scan + redraw) | RUNNING |
| C20 | review/act-text (owner s8: broken/unclear act card text, whole family) | RUNNING |
| C21 | review/khac-day @ 0ce947402 (j76need one source) | REVIEWING (khac-day-r1) |
| C22 | review/boot-flash (owner s8: raw old skeleton flashes on launch) | RUNNING |
| C22 | review/boot-flash | RUNNING |
| C23 | review/mg-easy (owner s8: Thơ minigame too hard; visible rhyme, hints, level-scaled; audit all knowledge minigames) | QUEUED-NEXT |
| C24 | review/chapter-detail (owner s8: tap chapter shows nothing; detail + inline progress; no dead taps) | QUEUED-NEXT |
| C25 | review/press-fx (owner s8 URGENT: whole pane bounces on any tap) | RUNNING |
| C26 | review/stat-fx (owner s8: slower readable stat +/- with name, cell glow GREEN for +, red for −, pulse/scale) | QUEUED-NEXT |
| C27 | review/buoi-transition (owner s8: page-flip on buổi change looks odd → ink-wash time-of-day transition; needs A2 fxkit) | QUEUED-NEXT |
| D50 | consorts without full-body figure art show a placeholder frame in the dialog person column (seen 755x1000, mood-dialog worker) → art-complete follow-up | QUEUED |
| C28 | review/room-btn (owner s8: header '‹ Phòng' bar → painted room icon button) | QUEUED-NEXT |
| C29 | review/rel-picker (owner s8: Giao tình relation pickers waste space → compact) | QUEUED-NEXT |
| C30 | night-panel → merged into B1 | MERGED |
| C31 | review/log-sync (owner s8: Sổ ghi Sủng 33→40 vs header 37; audit unlogged stat changes) | RUNNING |
| C32 | review/page-curl2 (owner s8 APPROVED: Tuần lục only — landscape curl, portrait paper slide; no swipe elsewhere; tab change animation only on tap) | QUEUED-NEXT |
| C33 | review/weekbook-entries (owner s8: week book person page shows unrelated raw entry; per-person readable entries) | QUEUED-NEXT |
| C34 | review/contest-ui (owner s8: REAL PRIZES by place (themed item, bạc, chest, title, Emperor gift) + podium rewards 2nd/3rd, same figure scale, contestants revealed; intro layout picture-left/info-right/scrolling contestant box, no empty counters) | QUEUED-NEXT |
| C35 | review/pcard-fill (owner s8: person card right side empty → mood, relations, tastes, known facts, recent dealings, quick actions) | QUEUED-NEXT |
| C36 | review/opt-pics (option cards picture LEFT + info RIGHT) | RUNNING |
| C37 | review/panel-size (owner s8: all pop-ups same frame size per viewport) | QUEUED-NEXT |
| D51 | fxkit follow-ups: cracked tea cup, scroll unroll, red seal slam, swaddle reveal, letter under door + wire call sites (PROGRESS_fxkit.md); clean committed .out/ folder on main | QUEUED |
| C38 | review/ev-art-fit (owner s8: unrelated event pictures; no generic default; paint missing) | RUNNING |
| C39 | review/tab-underline (owner s8: stray bar through selected chip + grey scroll track under chip rows, all tab rows) | QUEUED-NEXT |
| D52 | skin-match audit of 7347 never-measured figures (plan in PROGRESS_review-skin-match.md; worktree /home/user/wt/skin cache) | QUEUED |
| C40 | review/actcard-one (owner s8: one compact act card everywhere, EQUAL card sizes in every grid; tap picture to enlarge) | QUEUED-NEXT (unless owner objects) |

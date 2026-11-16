# percent-measure (s12/s13 worker, 11/16/2026)

Base: origin/main bd6342c73 (2160 commits). Method and raw evidence below. Nothing on main was changed.

## RESULT
- **% xong (features live on origin/main vs planned): ~42%** weighted (unweighted 40%). If every PASS waiting for merge (merge-train-4/5 etc.) lands: ~57%.
- **% choi duoc (test runs passing on origin/main, Fold 755x1000 + iPad 1180x820): ~66% verified** (105 of 160 valid runs). Upper bound ~83% if the 34 timed-out runs are not counted. No confirmed blocking bug in the core play loop; the unverified third is mostly test-harness drift and timeouts (details in part B).

## A. Method (% xong)
Planned = features named in dev/STORY_ROADS_PLAN.md, dev/IDEAS_OPEN.md, HANDOVER_SESSION9 open items, OWNER_DECISIONS 1241-end, FOREMAN_B/C/D slices, SESSION8_QUEUE, CLAIMS.md: 70 rows. Live = (a) review branch tip is an ancestor of origin/main (git merge-base --is-ancestor) and/or (b) the feature module in dev/build/*.js exists on main (git ls-tree) / key identifier found by git grep. A module absent on main = not live. Weight = rough size (1 small fix .. 20 for the 4 roads x 9 origins). Partial credit only where a smaller live part is shown (evidence column). PASS = reviewer PASS but not on main.

Weights by group: Story W=91 live 33% (with PASS 35%); Systems W=111 live 51% (with PASS 76%); UI W=18 live 44% (with PASS 83%); Art W=33 live 36% (with PASS 41%); total W=253.

Biggest gap: the Story group (14-chapter frame, tutorial chapters, full roads, NPC roads, origin intros = 60 of 253 weight points, almost all 0%). Without NPC roads + origin intros + P3 (the planned-not-started big three) the live share would be ~50%.

| Group | Feature | Weight | Live | PASS pending | Evidence |
|---|---|---|---|---|---|
| Story | 14-chapter life frame (P1) | 8 | n |  | review/story14-p1 not on origin (=?), dev/build/jst14.js absent; git grep f14 index.html/dev/build = 2 stray hits |
| Story | Tutorial ch1-3 as story tasks, done-to-reward (P2) | 6 | n |  | grep tu14 = 0 on main |
| Story | 4 full roads x 9 origins, 8 chapters x 3-5 hoi each (P3) | 20 | partial 0.15 |  | only j67 premises live: ~47 arcs (36 origin + 8 shared + 3 stage) vs target ~288 chapters => 15% |
| Story | Endgame ch12-14 as chapters (P4) | 6 | partial 0.35 |  | st_dong/st_con arcs + Tranh ngoi + reign road live (jreign.js, j67.js); chapter-form not built |
| Story | Story bot balance (P5) | 3 | n |  | balance-after-truth running, not on main |
| Story | NPC own roads (P6, OD:L1243/1252) | 10 | n |  | no module; plan only |
| Story | Origin intros: 3-4 painted panels x9, entry animation, tuyen tu rank minigame (OD:L1244/1250) | 10 | n |  | art = samples only (foreign-princess v3, 3 glyph samples); no code on main |
| Story | Pre-palace home roads (6 of 8 origins live; cn+nc not yet) | 6 | partial 0.75 |  | jkc.js + outside-r2-r2 on main; review/kc-roads-cn-nc not on origin |
| Story | Origin roads j67 (4 premises/origin, castRv67, ctm-arcs) | 6 | y |  | dev/build/j67.js on main; grep castRv67 hits |
| Story | Chapter goal card + coach tour (jgoal/jtut, KIT 72) | 3 | y |  | jgoal.js, jtut.js on main; kitCoach/kitGoalDetail hits |
| Story | Chapter detail hoi-by-hoi (jchap) | 2 | n | y | jchap.js absent on main; chapter-detail-r1 PASS in merge-train-4 (RUNNING) |
| Story | Viec nho j72 + Thanh mai truc ma j96 | 3 | y |  | j72.js, j96.js on main |
| Story | Emperor/reign road + faction road | 4 | y |  | review/reign-road-r1 ancestor of main; jreign.js on main |
| Story | Evidence-truth + palace-start (kids, accession) | 4 | y |  | evidence-truth-r1, palace-start-r1 ancestors of main; jtruth.js |
| Systems | Co-op core (lobby, world, timer, night-sync) | 10 | y |  | jcoop/jcooptimer/jcooplobby/jcoopworld on main; coop-night-sync-r1 LIVE bd6342c7; CI coop-e2e 59/59 |
| Systems | Co-op invite UX (1-2-3 steps) | 2 | n | y | kitCoopSteps grep = 0 on main; coop-invite-ux-r1 PASS not merged |
| Systems | Co-op chat (Thu tu) | 2 | n |  | jcoopchat.js absent; coop-chat-r1 reviewer running |
| Systems | Co-op pets | 1 | n |  | review/coop-pets not ancestor |
| Systems | Cloud save (So may) | 3 | y |  | jcloud.js on main; cloud-save-r1 LIVE (merge-hot-4), smoke PASS |
| Systems | Promotion exam (Khao hach tan phong) | 5 | y |  | jexam.js, jpromo.js; promo-exam/promo-rules ancestors |
| Systems | Promo-skip / faction-win rules | 1 | n | y | review/promo-skip not ancestor (RUNNING) |
| Systems | Stipend + skimming (real goods, chest reveal) | 3 | y |  | econ-stipend ancestor; jstip.js |
| Systems | Econ items (alt-cost rule, re-issue) | 2 | n |  | jeitem.js absent; econ-items-r1 RUNNING |
| Systems | Succession choice (Thai hau / nhiep chinh / Nu de) | 3 | y |  | succession-port-r1 ancestor; j99succ.js |
| Systems | Mortality (age death, Emperor death, her fate) | 4 | n |  | jmort.js absent; review/mortality RUNNING |
| Systems | Difficulty modes De/Vua/Kho | 2 | n | y | jdiff.js absent; difficulty-port-r1 PASS in merge-train-4 |
| Systems | Loi rieng routes + trich huyet | 3 | n | y | jroute.js absent; routes-port-r1 PASS in merge-train-4 |
| Systems | Scheme minigames (Nghe ngong/Truyen loi/Mac ca/Thoi co) | 3 | n | y | jsgame.js absent; scheme-games-port-r1 PASS e25486e0 (KIT OK) in merge-train-4 |
| Systems | Lost items + item rivalry | 2 | y |  | jlost.js on main; lost-items-port-r1 ancestor |
| Systems | Appearance overlays + face marks (illness, rash, scar) | 3 | y |  | appearance-port-r1, facefx-all-r2 ancestors; jrash.js, jveil.js |
| Systems | Weather port | 2 | y |  | weather-port-r1 ancestor; jweather.js |
| Systems | Weather painted fx (weather-fx-one) | 1 | n |  | review/weather-fx-one not ancestor (reviewer RUNNING) |
| Systems | Palace map + residences + places port | 4 | y |  | palace-map-port-r1, places-port-r1 ancestors; jplace.js, jres.js |
| Systems | Schedules + ONE location ledger (j95/j95b/jk95) | 4 | n |  | j95.js/j95b.js absent; schedules3 RUNNING |
| Systems | Personality 13 virtues + dislikes + NPC mind (D7, OD:1248) | 5 | n | y | jtrong/jdis/jmind absent; personality-r1 PASS (merge-train-5), npc-mind RUNNING |
| Systems | Memories + hook ledger (D26) | 2 | n |  | jmem.js absent; RUNNING |
| Systems | Collection milestones (D49) | 1 | n | y | jcol.js absent; collect-ms-r1 PASS in merge-train-4 |
| Systems | Month calendar + cal-plus + Thai y | 3 | y |  | thaiy, cal-plus, month-calendar ancestors; jthaiy.js |
| Systems | Cycle (nguyet su) cards + monthly report | 2 | n | y | jcycle.js absent; cycle-r3 PASS in merge-train-4 |
| Systems | Servants: elder staff + tutorial guide NPC | 2 | y |  | elder-staff-r1 ancestor; jstaff.js |
| Systems | Servants: household on her room stage (LIVE BUG fix) | 3 | n | y | jhouse.js absent; servant-system-r1 PASS e82a9bcf not merged |
| Systems | Promote own servants (D41) | 2 | n |  | jpromsv.js absent; RUNNING |
| Systems | Hoang tu (princes) + tu chat | 3 | y |  | hoang-tu, hoangtu-tuchat-r6 ancestors; jht.js |
| Systems | Men (nam nhan) + emotions | 3 | y |  | men, emo-men ancestors; jmen.js |
| Systems | Pets + pet care | 2 | y |  | pets, pet-care ancestors; jpet.js, jpetcare.js |
| Systems | Toilette + recipes + makeup colour | 3 | y |  | toilette, recipes-r2, mk-colour ancestors; jtoil.js |
| Systems | Toilette reaction buttons (D27) | 1 | n | y | jtoilr.js absent; toil-react-r1 not ancestor |
| Systems | Luxury (D17) | 2 | n |  | jlux.js absent; luxury-r1 RUNNING |
| Systems | Online leaderboard + Bang vang (jrank) | 3 | n |  | jrank.js absent; rank-port not ancestor (D36 re-port) |
| Systems | Podium kit (kit-podium) | 1 | y |  | kit-podium ancestor |
| Systems | Minigames: Tu duc x4 (jtd/jtds) | 3 | n | y | jtd.js/jtds.js absent; tuduc-mg-r1, tuduc-sub-r1 PASS in merge-train-4 |
| Systems | Minigames: Tho easy / knowledge audit (mg-easy) | 2 | y |  | mg-easy-r1 ancestor |
| Systems | Minigames: slap + dodge (slap-mg) | 1 | n |  | jslap.js absent; reviewer queued |
| Systems | Minigame balance audit (mg-balance, owner HIGH 07:10Z) | 3 | n |  | not started |
| Systems | Result sounds / SFX | 1 | n | y | result-sfx-r1 PASS in merge-train-4; sfx base live (jsfx.js) |
| Systems | Boot / offline / CDN loading (jload + sw.js) | 3 | y |  | jload.js; boot-flash-r1, loading ancestors |
| UI | Kit core: close cards, sweep, panel size, stage slots, act-dedupe, flip, stat-fx2, page-curl2 | 8 | y |  | kit-close, kit-sweep-r1, panel-size-r1, stage-slots-r6, act-dedupe-r1, cardflip-smooth-r1, stat-fx-2-r1, page-curl2-r1 all ancestors |
| UI | Live-bug fixes pending: modal-scroll (Hoc Cam swipe), an-tinh + log-sync (An tinh 0->N) | 3 | n | y | modal-scroll-r1 / an-tinh-fix-r1 / log-sync-r2 not ancestors; merge-hot-1 RUNNING (jlogsync.js absent) |
| UI | New-game screen redo (newgame-ui-r3) | 2 | n | y | not ancestor; PASS f484d226 |
| UI | Row align, act-text wording, flip-newlife, fig-bg silk scroll, mood-bar, header-own, item-big | 5 | n | 0.4 | none ancestors; row-align/flip-newlife PASS or RUNNING, jfigbg/jmood absent |
| Art | Place paintings 4 buoi x seasons, every place has the 16-set (D54) | 4 | y |  | postmerge-fix-1-r1 LIVE a942395b |
| Art | Figures a18/a26/a36/a51 for every character (art-complete) | 8 | partial 0.5 | 0.1 | art-complete-r1 ancestor (group c done), part 2 PAUSED; skin-audit-r1 PASS pending |
| Art | Face sharp HD + fig HD upscale servants/eunuchs/men | 3 | partial 0.4 |  | face-sharp-r2 ancestor; fig-hd-upscale not on main |
| Art | Item / act / option pictures (placeholders removed) | 4 | partial 0.6 | 0.2 | item-art-r5, act-pics2-r7, pic-dupes-r2 ancestors; placeholder-pics3, small-art-wire, opt-pics3 PASS pending; act-pics2 237/380 |
| Art | 38 festival buoi pictures (OD:L1258) | 2 | n |  | ordered 07:15Z, not started |
| Art | Origin intro painted panels x9 origins | 5 | n |  | samples only, none approved |
| Art | Foreign-princess (nc/bd) cast art v3 | 3 | n |  | samples v3 awaiting verdict |
| Art | 9 place glyphs (v1 live, owner rejected style, v2 = 3 samples) | 1 | partial 0.4 |  | place-glyphs-r1 LIVE 11100a99; redo pending |
| Art | Hua dian size / motif fix (huadian-size-r3 FAIL) | 1 | n |  | not ancestor, FAIL |
| Art | Postponed appearance art (pregnancy 6/9 mo, nun, glow) | 2 | n |  | D43 waits on owner |

## B. Method (% choi duoc)
Served origin/main root (index.html, 5 MB) with a local static server; Playwright/Chromium; both owner devices: Fold portrait 755x1000 and iPad landscape 1180x820 (dpr 1). Ran 83 existing scripts from dev/test (no .github workflow runs browser tests; no package.json) on each device = 166 runs, 120-150 s cap, 3-4 in parallel. Pass = exit 0 and no FAIL/pageerror line, or the script's own PASS / "FAIL 0". Plus coop/worker unit tests: merge.test.mjs ok, vault.test.mjs ok (48). Boot smoke: both devices load with 0 page errors, 0 failed requests. CI note from CLAIMS: coop-e2e 59/59 live after the last deploy (not re-run here).

Counts (166 runs): 92 clean + 11 self-reported PASS = 103; re-run alone after load: +2 (act-dedupe-vp iPad, actcard-small Fold) = 105. 34 timeouts (machine at load 12; 4 browsers at once), 23 BAD, 6 wrong-argument runs of mine (map-labels, month-cal, header-danh need a file path, not a URL) excluded. 105 / (166-6) = 66%; excluding the 34 timeouts too = 105/126 = 83%.

Real play bots on main, all with 0 page errors: act-dedupe-bot (3 lives x 6 weeks, both devices, FAIL 0), evtruth-bot (4 lives, both devices; cut at the time cap, no errors), silent-events (10 buoi, no silent events), succession (PASS, both devices), reign (both), story-deadline (both), stipend (both), hint-dedup 120 turns (both), stranger-sweep, weekbook-entries, promo-next-rank, stat-fx-scan, rank-name-dup, rel-words-scan, stage-rail (PASS), panel-size, tab-underline, pcard-fill, int-stats, pane-bar, dialog-art, pic-fallback-scan.

### Failures, triaged
Confirmed blocking play bug: none found.
Needs a look (probably not blocking, not proven either way):
1. Tests that tap in a fresh new game (podium, minigames, minigames-j71, inv-grade, toilette, mk-e2e) fail because the new-game roulette overlay (#kroul, button "Bo qua") intercepts pointer events. goal / mood-dialog read S as null after start(). Same cause class: the test start sequence predates the new-game roulette (review/newgame-ui); the owner's real tap path was not checked here. A worker should run one real new-game tap-through on both devices to confirm.
2. tutorial.js: "tour did not start" on a fresh life (event queue busy). Could be real (first-run tour) or the same harness drift. Needs a person-style check.
3. overlay-close: 8 of 35 openers do not open ("lesson <art> teacher" x8: Cam, Ky, Thi, Hoa, Vu, Y, Theu, Nau). Likely needs a teacher present; check.
4. kit sample page (#kit): 15 samples throw "reading 'lot' / 'rcpL' / 'pal'" without a game state. Dev page only, not gameplay.
5. load-migrate: SW cache.add fails (offline/CDN in this sandbox). webkit-boot: output only, no verdict. Both infra.
Timeouts (not verdicts): goal(Fold), stage-side, silent-events(partial runs ok), stage-counts, krx-diff (reached "diffs 0" then hit cap), rel-audit, rest-cards, podium, kit-table, rank-title, act-audit, an-sung, opt-render, cdn-timing(iPad), cardflip(iPad), evtruth-bot.

Not covered: real co-op e2e on this box, Safari/WebKit, real touch gestures (page curl), art correctness, balance (win-rate bands), the unmerged branches (this is main only).

Raw data: runner results were in the session scratchpad (166 lines); the script list above is the dev/test names.

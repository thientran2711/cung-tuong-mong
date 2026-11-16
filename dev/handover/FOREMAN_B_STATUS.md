# FOREMAN_B_STATUS (written ONLY by Foreman B)
ORDER 16/11 applied (workers/reviewers = separate sessions; hourly self-wake; rollover; claims).
last wake: 11/16/2026 07:58Z (Foreman B session 3 = session_01N1tNP6N19EQTqoHAMZcxqK)
RUNNING 08:00Z (10 sessions): D12 mood-bar session_01N1tNP2hssUsxJwKBBsGRUZ (opus) · mg-balance session_01N1tNP4yBvmQ6Gd69aHoWJR (opus) · nw-poem session_01N1tNP6akcFFA3AcqEfs5hk · nw-lantern session_01N1tNP3ykt4KbnfNeocJZ3W · nw-quiz session_01N1tNP2boFYsfpf9ZAuvbwW · D9 reviewer header-own-r1 session_01N1tNP4c1TN9m7n8JPAjyqC · D25 reviewer veil-zoom-r1 session_01N1tNP2X1WermTjz7d2nn5d · D36 rank-port session_01N1tNP3A9vkZJnwyZJw3fL1 · D11 presentation session_01N1tNP3mhLhWrJukZWoGvAQ · D13 spread-events (opus, on schedules3) session_01N1tNP4LQMHt6zowrVAmxXG. QUEUED/HELD: D3 (KIT REQUEST: frameless big kitItem + kitItemBigSrc, reports/item-big.md), D19 (after econ merge-train-6), D14 + D44 (art, owner's morning), night-card preg-FX follow-up (after night-end-r3). READY: C35b pcard-dislikes-r1 3b2e15ef (contains main c4e89f8; main moved to cdad710 → merge needed).
PICKUP 07:58Z (session 3): alive. Taking main s12 overnight order: opening mg-balance (opus) + no-word-games A/B/C (sonnet), reviewers D9 + D25, D36 resume, D11, D13. C35b PASS 3b2e15ef → READY. D3 BLOCKED on KIT REQUEST. Held: D14, D44 (art paused), D19 (after econ #8), night-card preg-FX follow-up (after night-end-r2).
Context (session 3): ~60k tokens after the mandatory setup reads → budget ~75k (start +25%). Hourly self-wake: CronCreate job b7059734 at :43 every hour. Routine trig_01MqRpkkmxprHXt9EXHEjJ6q (woke session 2) DISABLED 06:22Z.
Session 3 first check 06:23Z: C35b reviewer / D3 / D9 / D12 started 06:20Z, no reports yet (review/item-big pushed adda3201). No new SẴN SÀNG KIỂM. Q24 not answered yet → D11/D13/D14/D19/D44 stay HELD.
(Rule 07:45Z s10: every brief must POINT to dev/art/OWNER_ART_RULES.md + dev/PRIORITY_RULES.md and order them read in full — owner words verbatim, never a summary.)

## HANDOVER (Foreman B session 2 → session 3, 11/16/2026 06:25Z)
- Session 2 = session_01N1tNP3StF4VxqkqTsQSt3a passed its context budget → rolled over; it stops spawning now. SESSION 3 = session_01N1tNP6N19EQTqoHAMZcxqK (opened 06:21Z).
- All B work runs as SEPARATE sessions (nothing dies with session 2). Running: C35b reviewer session_01N1tNP2GaMKbqSeCQe8Lxot (review/pcard-dislikes-r1 → reports/review-pcard-dislikes-r1.md); D3 item-big session_01N1tNP3vh5qQKaG75iP6uRK (reports/item-big.md); D9 header-own session_01N1tNP6D57poL6nUn778JPv (reports/header-own.md); D12 mood-bar (opus) session_01N1tNP2hssUsxJwKBBsGRUZ (reports/mood-bar.md). If no push/report after ~2–3 h, check with get_session/list_events, then re-open from the pushed branch + PROGRESS.
- New PASS this session: C41b review/tuduc-pic-r1 2954ff9f (under ## PASS). PASS waiting for fast-forward: D31, D33, D34, C24, C41(+C41b).
- Held, waiting for main's answer Q24: D11, D13, D14, D19, D44 (cross-foreman/art). D25 runs at C. D41 moved to C (handoff file written). D36 blocked on kit-keeper-1. C32b curl speed = KIT REQUEST to keeper.
- Open owner questions: Q3, Q5, Q6, Q10–Q15, Q20, Q23, Q24 (main), Q25.
- Wakes: session 2 had an in-session cron (dies with it) and the routine "Foreman B hourly wake" trig_01MqRpkkmxprHXt9EXHEjJ6q fires into SESSION 2. Session 3: create your own hourly wake, then disable trig_01MqRpkkmxprHXt9EXHEjJ6q (update_trigger enabled=false) so session 2 is not woken. If session 2 is woken anyway it only checks that session 3 is alive and does nothing else.
- Brief pattern used for new sessions: short header + "read and obey dev/handover/PREAMBLE.txt (+REVIEWER.txt) on the docs branch" + key rules (ENGLISH, VANPHONG, ONE KIT KEEPER, art paused tonight, shallow flock fetch, sparse worktree, no main/PR/owner) + task spec + REPORTING to dev/handover/reports/<branch>.md.

Updated: 11/16/2026 06:20Z (session 2) — PASS new: C41b. Reviewing: C35b. Running: D3, D9, D12. Held (Q24): D11, D13, D14, D19, D44. Blocked: D36 (kit-keeper-1). D41 moved to C. Free slots: 7.
Connectors (account B): GitHub push OK · Magnific OK (project "Personal" ba4aecfe…) · Cloudflare OK (owner re-saved the token 11/16; R2 listing verified).

| Item | Branch | Model | State |
|---|---|---|---|
| C23 mg-easy | review/mg-easy-r1 | sonnet | LIVE (main 4f5e5f3b, train 1/2) — was PASS 94644c1e6342eb7ea1003aae090cd5310a9597e5 |
| C41 tuduc-mg | review/tuduc-mg-r1 | sonnet | PASS 53a13452d69cfabbfb21c1f36e80c9c33bd4b1b4 |
| C41b tuduc-pic | review/tuduc-pic-r1 | sonnet | PASS 2954ff9fb9367940b62bb9b824645a14c60191e0 (reviewer session_01N1tNP4dwJ1QEvs8oHcaKvZ) |
| C24 chapter-detail | review/chapter-detail-r1 | sonnet | PASS 936a2fe78b457ad3339c8554c46c6d674c4edf57 |
| C35b pcard-dislikes | review/pcard-dislikes @6eaca058 | sonnet | REVIEWING — worker SẴN SÀNG KIỂM 06:1xZ; reviewer session session_01N1tNP2GaMKbqSeCQe8Lxot on review/pcard-dislikes-r1 (06:20Z) |
| D3 item-big | review/item-big | sonnet | RUNNING — session session_01N1tNP3vh5qQKaG75iP6uRK (06:20Z) (moved from C, order 07:30Z); code/display only, art paused tonight |
| D9 header-own | review/header-own | sonnet | RUNNING — session session_01N1tNP6D57poL6nUn778JPv (06:20Z) (moved from C) |
| D12 mood-bar | review/mood-bar | opus | RUNNING — session session_01N1tNP2hssUsxJwKBBsGRUZ (06:20Z) (moved from C) |
| D11 presentation | — | — | HELD — overlaps D51 fxkit wiring + fxkit sprite art (main) and art is paused; see QUESTIONS Q24 |
| D13 spread events | — | opus | HELD — needs Foreman C's D29 roster (cross-foreman wait); Q24 |
| D14 học thành tài scene | — | — | HELD — painted scene = art (paused tonight) + after fxkit; Q24 |
| D19 Biếu quà làm lành | — | — | HELD — shares econ files with C's running D17 luxury (one worker at a time); Q24 |
| D44 fig export ≥1100 px | — | — | HELD — figure art pipeline, 'check face-sharp HD first' (main's art); art paused; Q24 |
| D25 veil-zoom | review/veil-zoom | — | NOT TAKEN — already RUNNING at Foreman C (CLAIMS, session_011xDdVQH85mp5QLY8bMqh7D) |
| C26 stat-fx | review/stat-fx-r1 | sonnet | LIVE (main 4f5e5f3b, train 1/2) — was PASS 0eb3e4b4a41a9123ad7181b39fc14afc60f8ab11 (follow-up C26b QUEUED) |
| C27 buoi-transition | review/buoi-transition-r1 | sonnet | LIVE (main 4f5e5f3b, train 1/2) — was PASS c91bfdc4629fbf4ebf84307f543d44a394ff138b (images on CDN) |
| C39 tab-underline | review/tab-underline-r1 | sonnet | LIVE (main 4f5e5f3b, train 1/2) — was PASS d8b54d0970ac8591d07163650058485f4bceb818 |
| C40 actcard-small | review/actcard-small-r1 | sonnet | LIVE (main 4f5e5f3b, train 1/2) — was PASS e3664469fbeddf8e7c9fafb851bd1fda73b6354d |
| C28 room-btn | review/room-btn-r1 | sonnet | LIVE (main 4f5e5f3b, train 1/2) — was PASS c80e5df978eaffb29ce218b4431e17b415232750 (icons on CDN) |
| C29 rel-picker | review/rel-picker-r1 | sonnet | LIVE (main 4f5e5f3b, train 1/2) — was PASS ce7c076a38d55c95901d19002832983f91560052 |
| C32 page-curl2 | review/page-curl2-r1 | sonnet | LIVE (main 63cf7b12a, train 3) — was PASS 3f95e00368db1e5acf3aca47889ce7cb42861a4b (CONDITIONAL on kit keeper §34 slide variant) |
| C33 weekbook-entries | review/weekbook-entries-r1 | sonnet | LIVE (main 63cf7b12a, train 3) — was PASS 1badc13c817d0d67971439fd6d2cbd944e47ad89 |
| C34 contest-ui | review/contest-ui-r3 | sonnet | LIVE (main 63cf7b12a, train 3) — was PASS 231ae9e93f271c2d3b3bb171dab55051ba7e2160 (CONDITIONAL on kit keeper: kitGameFrame pic etc.) |
| C35 pcard-fill | review/pcard-fill-r1 | sonnet | LIVE (main 4f5e5f3b, train 1/2) — was PASS 6975696c6af2ad22bd428e6435dd892d16f0a4b1 (KIT §73; contains actcard-small-r1) |
| C37 panel-size | review/panel-size-r1 | sonnet | LIVE (main 4f5e5f3b, train 1/2) — was PASS a523531da8bbf3944c8f0afd2c122176405d4e88 (KIT KEEPER: §8.1) |
| C26b stat-fx follow-up | review/stat-fx-2-r1 | sonnet | LIVE (main 63cf7b12a, train 3) — was PASS 6d4540a7cf2b61de482fde24f9e3df36782fa61f |
| C46 map-labels | review/map-labels-r1 | sonnet | LIVE (main 63cf7b12a, train 3) — was PASS e23562007d7f431fce9fdbc95bf1f2799ad6a350 (KIT KEEPER: §34.1d re-skin) |
| D32 succession-port | review/succession-port-r1 | opus | LIVE (main 63cf7b12a, train 3) — was PASS 0d9b49b9202c663ef4151c01e890a05ffd62aa30 — hook for review/mortality: j99succ.js wraps emperorDies() (j99succ.js ~line 56; skipped when COOPW.on) |
| D38 lost-items-port | review/lost-items-port-r1 | opus | LIVE (main 63cf7b12a, train 3) — was PASS 1d51bbf1ea55c70de7b2b46d136601c97c30a60e |
| D30 palace-map-port | review/palace-map-port-r1 | sonnet | LIVE (main 63cf7b12a, train 3) — was PASS 306de247abcc3c9cf0bbab9fbddb91e6946131c3 |
| D31 difficulty-port | review/difficulty-port-r1 | opus | PASS cbb8ab2bf4b1c9efd2b7022c9ef87fe6b28b013c (CONDITIONAL: keeper decides the local .kdiff .ksub override) |
| D33 routes-port | review/routes-port-r1 | opus | PASS 332308a1961681e37e0e4de78e86adc9aac5524d (CONDITIONAL on kit keeper: loi-rieng category in §6.1) |
| D34 scheme-games-port | review/scheme-games-port-r1 | sonnet | PASS e25486e0df86f6779aa61aa289e3ba5236b99f40 (CONDITIONAL: keeper confirms jopic grid-auto-rows change) |
| D36 leaderboard + Bảng vàng | review/rank-port @123195a1 (base main 2afdafc3) | sonnet | BLOCKED (KIT REQUEST: podium rework + person dialog chips; then merge main, rebuild, re-run rank-e2e at all viewports) |
| D39 appearance-port | review/appearance-port-r1 | sonnet | LIVE (main 4f5e5f3b, train 1/2) — was PASS 86234a24c53da664bd75f34b34444751cd7c0e9f |
| D40 weather-risk-port | review/weather-port-r1 | sonnet | LIVE (main 63cf7b12a, train 3) — was PASS 100bf8809a77b5a8f381ffac6e426a0c0d2b8a5f |
| D41 promote-servants | — | opus | MOVED to Foreman C (order 16/11 07:25Z); never started by B, no branch — handoff reports/promote-servants-handoff.md |
| D42 places-leftovers | review/places-port-r1 | sonnet | LIVE (main 63cf7b12a, train 3) — was PASS add62a7e9283cd328ddd9a46951abf0210e7bb26 (includes D30 palace-map-port-r1; kitPalaceMap renumbered §71→§76) |

## PASS (for the main coordinator to fast-forward)
READY review/pcard-dislikes-r1 3b2e15ef50bcf851453b453d540e17ad1f08f355 (C35b; 1–2 dislikes per consort + Emperor, kit rows only; contains main c4e89f8, not cdad710 → merge on landing; owner Qs: disliked gift still net-positive? Thái hậu dislikes later?)
PASS review/tab-underline-r1 d8b54d0970ac8591d07163650058485f4bceb818 (C39; descends from main 2d038139; reviewer added KIT §46 edge-fade docs + observer throttle)
PASS review/actcard-small-r1 e3664469fbeddf8e7c9fafb851bd1fda73b6354d (C40; descends from main 900ace7f; reviewer turned the zoom into kitModal kind info = KIT §8 frame, KIT §43.1 + sample)
PASS review/mg-easy-r1 94644c1e6342eb7ea1003aae090cd5310a9597e5 (C23; knowledge minigames level-tiered + aids; reviewer swapped private .kg82tip → kit .kpnote)
PASS review/buoi-transition-r1 c91bfdc4629fbf4ebf84307f543d44a394ff138b (C27; ink-wash buổi transition, KIT §71 jbuoi.js; 4 images already on CDN)
PASS review/room-btn-r1 c80e5df978eaffb29ce218b4431e17b415232750 (C28; KIT §72 kitBackBtnHtml, painted room/map icons already on CDN; 'Bản đồ'→'Dư đồ' per VANPHONG)
PASS review/rel-picker-r1 ce7c076a38d55c95901d19002832983f91560052 (C29; compact Giao tình pickers, kitNameRank face labels, pager arrows only on overflow game-wide; KIT §49.2c + sample)
PASS review/pcard-fill-r1 6975696c6af2ad22bd428e6435dd892d16f0a4b1 (C35; person card right side filled from kit parts, KIT §73; includes review/actcard-small-r1)
PASS review/appearance-port-r1 86234a24c53da664bd75f34b34444751cd7c0e9f (D39; illness/poison/slap/penalty/rash overlays + veil, weekly healing verified e2e; ancestry vs main 2afdafc3 re-checked by Foreman B)
PASS review/panel-size-r1 a523531da8bbf3944c8f0afd2c122176405d4e88 (C37; one kpanel frame size per viewport, KIT §8.1 needs kit keeper; when review/stage-fig-size-r1 lands keep both its kitDpFit cap/crop and this dw=d.clientWidth line)
PASS review/weather-port-r1 100bf8809a77b5a8f381ffac6e426a0c0d2b8a5f (D40; bad-weather outdoor risks + gear/servant/kiệu; reviewer fixed garbled risk line → kit kèm/Ghi chú rows, indoor exclusion)
PASS review/succession-port-r1 0d9b49b9202c663ef4151c01e890a05ffd62aa30 (D32; succession choice + epilogues + 17 living endings no longer say "Chết vì")
PASS review/palace-map-port-r1 306de247abcc3c9cf0bbab9fbddb91e6946131c3 (D30; palace courtyard → hall rows → residence room paintings; 675 images on CDN; courtyard pl2 images ~500 KB each = over budget, re-encode follow-up)
PASS review/lost-items-port-r1 1d51bbf1ea55c70de7b2b46d136601c97c30a60e (D38; lost items + rivalry/steal acts; 0 unfair penalties in bot runs; ancestry vs main a523531d re-checked by Foreman B)
PASS review/weekbook-entries-r1 1badc13c817d0d67971439fd6d2cbd944e47ad89 (C33; per-person readable week-book entries; reviewer fixed rival festival prizes landing on Hoàng thượng/her page)
PASS review/map-labels-r1 e23562007d7f431fce9fdbc95bf1f2799ad6a350 (C46; readable Dư đồ paper-chip labels 13px, mapFit floor zoom; needs kit keeper approval of the §34.1d re-skin)
PASS review/contest-ui-r3 231ae9e93f271c2d3b3bb171dab55051ba7e2160 (C34; picture-left game frames, real prizes by place, equal-height podium, new podium backdrop; CONDITIONAL: kit keeper signs off the contest-ui list in KIT KEEPER NEEDED; prize numbers = Q16)
PASS review/page-curl2-r1 3f95e00368db1e5acf3aca47889ce7cb42861a4b (C32; portrait paper slide / landscape curl, swipe only in Tuần lục; CONDITIONAL: kit keeper adds kitSlideSheet + kitPortrait/KIT_SLIDE_MS/kitSlideEase + portrait=slide/landscape=curl rule + Gọn 120 ms fade + 'swipe only inside kitBook' to KIT §34)
PASS review/stat-fx-2-r1 6d4540a7cf2b61de482fde24f9e3df36782fa61f (C26b; person card / status tiles glow on re-render, grudges inverted; k61How full sentences; mood tile without cause = plain kit card. Number colour itself waits for the §57.1 KIT REQUEST)
PASS review/places-port-r1 add62a7e9283cd328ddd9a46951abf0210e7bb26 (D42; 5 new reachable places + children by age + access rules; owner-approved paintings; CONTAINS review/palace-map-port-r1 (D30) — fast-forward this one and D30 comes with it; kitPalaceMap now KIT §76, confirm)
PASS review/routes-port-r1 332308a1961681e37e0e4de78e86adc9aac5524d (D33; Lối riêng routes + blood test + bowl art; ẩn dật vow now 34/34 harmful acts; CONDITIONAL: keeper registers category loi-rieng #2c6e5a in KIT §6.1; old-save not re-run by reviewer, worker's passed)
PASS review/chapter-detail-r1 936a2fe78b457ad3339c8554c46c6d674c4edf57 (C24; grows kitGoalDetail — one panel, no kit part changed; chapter tap → detail + inline progress; dead-tap scan 0 confirmed dead; nit: inline progress repeats Hạn/Lợi thế; tiny private .chapgo + cursor rules for keeper to absorb)
PASS review/tuduc-mg-r1 53a13452d69cfabbfb21c1f36e80c9c33bd4b1b4 (C41; 4 Tứ đức minigames, Dung real-time clock; follow-up C41b adds the left picture)
PASS review/difficulty-port-r1 cbb8ab2bf4b1c9efd2b7022c9ef87fe6b28b013c (D31; Dễ/Vừa/Khó per life as multipliers on BAL, Vừa = base exactly (verified); coop-e2e 59/59; when review/newgame-ui-r2 lands re-run dev/test/difficulty.js + idcard-pin-scan.js (picker already handles .kpscroll); numbers wait for C7 n≥30 re-measure)
PASS review/scheme-games-port-r1 e25486e0df86f6779aa61aa289e3ba5236b99f40 (D34; 4 scheme minigames behind one choice dialog, odds ±1 step for her only, coop-timer 43/43; CONDITIONAL: kit keeper confirms reviewer's kit-wide jopic.js change `grid-auto-rows:max-content` (option cards were squeezed/clipped in kdper dialogs) — eyeball other kart option dialogs)
PASS review/tuduc-pic-r1 2954ff9fb9367940b62bb9b824645a14c60191e0 (C41b; Tứ đức minigames get the study-room painting on the left via kitGameFrame({pic}), call site only; 6 viewports 8/8; CDN pics 200; contains main eba64ead and review/tuduc-mg-r1 (C41) — fast-forward this one and C41 comes with it)
PASS review/stat-fx-r1 0eb3e4b4a41a9123ad7181b39fc14afc60f8ab11 (C26; descends from main 900ace7f; top-bar glow green/red + named slow labels + j19 whole-word colour fix)

## CDN
All 6 pending images UPLOADED by Foreman B (11/16): img/fx/buoi-{wash,mist,hills,orb}.webp (C27), img/kit/ico-room.webp + ico-map.webp (C28). Branch review/cdn-pending-b is obsolete (images only; never merge it; delete it — Foreman B's delete push was refused by the server).

## KIT KEEPER NEEDED
- KIT REQUEST (D3 item-big, blocks it): (1) frameless big mode in kitItem for size lg/xl (no border/background/shadow/clip, transparent contain image ~240–300 px, soft drop-shadow, badges as floating chips, grade by name only); (2) helper kitItemBigSrc(k|obj) → src512/wd512 (future 1024) with fallback, for 20 call sites listed in reports/item-big.md; (3) same big-src mapping for pets/veil/mark/econ.
(Keeper on main already: renumbered buoi-transition §71→§74, room-btn §72→§75 (KIT_NUMBERS.md); fixed rel-picker .knr-s, actcard-small info mark = §46 ktinfo, tab-underline observer scope, appearance 28.8b text. Items below not yet handled stay open.) (ONE KIT KEEPER rule, owner 16/11 — these Foreman B branches were built before the rule reached B and add/change kit parts; main coordinator's kit keeper please approve/renumber before fast-forward)
- buoi-transition-r1: KIT §71 jbuoi.js (buổi transition overlay)
- room-btn-r1: KIT §72 kitBackBtnHtml (painted back button)
- pcard-fill-r1: KIT §73 person-card fill blocks (uses existing parts only; new section = layout recipe)
- actcard-small-r1: KIT §43.1 small act card 3:4 picture + zoom via kitModal kind info
- stat-fx-r1: KIT §57.1 kitStatFx/kitStatGlow
- rel-picker-r1: KIT §49.2c compact picker + kitStripFit (pager arrows only on overflow, game-wide)
- tab-underline-r1: KIT §46 no-scrollbar + edge fade (kitTabFade), sliding line only on bottom nav
- panel-size-r1 (PASS): KIT §8.1 one-size kpanel frame tokens --kpw/--kph + fixed flex-column frame (j79), §8 frame rule changed, per-kind sizes removed (kesdlg, kdper/kdnarrow, kslot, kmc-modal 780), week panel .dawn .dbox.kpanel follows. Short one-line notices sit top-left in a big blank frame — keeper may centre them / bigger font
- palace-map-port-r1 (PASS): kitPalaceMap new kit part labelled "§71" (clash; renumber, incl. KIT_SAMPLES id in jpm.js + PROGRESS); pieces .kpm-* hall rows, .kpm-spot hotspots reusing .mspot/.mlab/.msil, .kpm-t, short-landscape fallback — CSS injected in jpm.js, absorb into kit; room back button "‹ <cung>" overrides label in jpm.js and overlaps the bottom-left name label at 1180/844 → should use KIT §72 back button once room-btn-r1 lands; note residence-room painting pipeline under stage in KIT.md
- appearance-port-r1 (PASS): KIT 28.8b kitFaceFx/KIT_FACEFX registry + kitFxLayers as the single face-layer hook; 28.8b text stale (still lists expr z5 + .kfxf transform copy — expressions removed 22:50Z); shared overlays rash-1..3.png, fx-slap.png (on CDN) for the keeper's art list
- contest-ui-r3 (PASS, conditional): r2 compact podium rules at max-height:520px also; also sticky .kg82act row, kg-run class, reviewer's kitGameFrame onerror removing kgpic-on, kg82Pic no-painting list [duho, den, may]; board paintings needed for pet care, Du hồ, Hoa đăng, Phối đồ (tsDressGame). kitGameFrame({pic}) picture-left/info-right (.kgbody/.kgpic/.kginfo, CSS in jcui.js #kcu-css), kg82Open/kg82Pic, #kg82.kg-idle, .kgrv self-scrolling list, podium equal figure heights + kpodPrize chips, KIT_BD.podium → new shared art img/kit/podium-bg2(-p).webp. KIT REQUEST: pet-care game box (jpetcare) needs a board painting (e.g. mg-chamthu-bg) + pic in petcGameBox.
- lost-items-port-r1 (PASS): no new kit parts. Also: text-only notices show an empty/generic scene frame ("Có người đến chơi" placeholder) — generic pic decision or per-notice art. Note: live j92 Giá họa hearing choices say "an toàn · không được mất gì" though the hearing can go against her — kit-wide wording fix for the keeper.
- (found by succession reviewer, exists on main today) the sticky .kpbar kcattabs strip ("Tất cả 0/16 …") draws on top of the modal on the 1180x820 end card ("Kiếp này") — z-index/stacking, kit keeper.
- §72 CLASH: review/room-btn-r1 (PASS c80e5df9) used KIT §72 for kitBackBtnHtml, and review/tutorial-r2's kitGoalDetail (jgoal.js) is also §72 — keeper please assign one of them a new number.
- map-labels-r1 (PASS): re-skins existing kit §34.1d .mspot .mlab (paper chip 13px, wrap, no opacity cuts) + mapFit floor zoom (no touching labels); when D30 lands, drop its own .kpm-spot .mlab font/padding (12.5px nowrap) so it inherits the chip; mapFit floor-zoom rule is a new kit behaviour to document; at 1180x820 neighbouring .mmeta rows ("N bóng · K khắc") overlap — including them in the floor rule zooms the iPad map to ×2.75, so keeper/owner decide; .mspot .mwhy and .acb in j41 still use the old tiny dark style (probably unused).
- KIT REQUEST (C26b stat-fx-2): in §57.1 jstatfx.js the glowing number never takes the gain/loss colour because jk4's `.kst:not(.kst-tile):not(.kst-chip)>.kstv{color:var(--ink)}` (0,4,0) beats `.ksf-g>.kstv`/`.ksf-r>.kstv` (0,2,0). Proposed: `.kst.ksf-g:not(.kst-tile):not(.kst-chip)>.kstv{color:#1f6b2f}`, `.kst.ksf-r:not(.kst-tile):not(.kst-chip)>.kstv{color:#a3291c}`, plus `.krt-v.ksf-g` / `.krt-v.ksf-r` for relation-table numbers (verified live by the worker; not applied).
- page-curl2-r1 (PASS, conditional): portrait paper slide kitSlideSheet = new variant of the page-turn kit part (§34, reuses .ksht*); global swipe-to-change-tab removed; keeper may add a line to KIT.md §34.
- KIT REQUEST (C41 tuduc-mg): a kit-owned "hint ring" part for canvas mini-games (Gợi ý marker is now a position-fixed div with .ksel); mini-game frame picture-left/info-right is a frame-level change (contest-ui's kitGameFrame({pic}) covers it once approved).
- KIT REQUEST (D36 rank-port, blocks it): (1) podium j90 per owner 08:55Z — characters big/most prominent, podium shrunk to the name-plate under the feet, medal at the plate's top-right, "Ta" tag, optional entry fields fig/face/nameH/you; used by Bảng vàng and other podium users; must match C34 contest-ui podium + KIT_FIG (old implementation: origin/review/rank-ui 895c898ef j90 diff); (2) person dialog jk4: her own chip shows rank+name via kitName(q,{cap:true,named:q===S}) in kitStageFig; figure column sticky for dialogs without options so the full figure shows at 844x390 (895c898ef jk4 + CSS `#modal .dlg.kdper:not(.kdnarrow)>#mb:not(:has(>.opts))`); (3) KIT.md text podium §26 and 32.7b from that commit.
- places-port-r1 (PASS): KIT §76 kitPalaceMap number to confirm; KIT_FLOOR .62 for the new rooms; new shared art thuong-thu-phong-*, a-ca-so-*, dong-cung-* (16 season/buổi + fallback each, gpt-2-6 edits of approved scenes); no kit parts changed.
- KIT REQUEST (C24 chapter-detail, optional): kitGoalDetail/kitModal head art can't show the chapter's own cover or each hồi's picture (head = tutorial-r2 art(); hồi pictures are in kitSkillCard cards) — add if the owner wants the chapter cover in the head.
- KIT REQUEST (D33 routes-port): (1) register category loi-rieng «Lối riêng» #2c6e5a in the §6.1 legend (jroute adds it at runtime, as on the owner-approved branch); (2) «MƯU» seal for the shared mini-game frame (blood-test tampering game shows «TÀI NGHỆ»; also needed by D34 scheme games). New shared art img/kit/mg-nghiem-bowl.webp. Pre-existing main bug: Mệnh truyện sub-tab row .ktsub.kcattabs (z-index 6) draws over the «Kiếp này» end-of-life dialog (same family as the .kpbar kcattabs note above).
- KIT REQUEST (D34 scheme-games-port): (1) «MƯU» seal (lacquer red #7a2a22) via kitGameFrame({seal}) — same as D33's request; (2) custom HUD labels on kg82Open/kitGameFrame (Bóng/Hồi/Còn for Nghe ngóng); (3) painted boards for nghe/truyen/mac/thoico — old branch reused act-binh-phong, ev-tin-don, ev-hoi-lo, tam-cung-dem via an "@path" board loader (keeper decides). Main issue seen: the one-time "Kiếp này chưa trọn" warning fires on ANY option whose text mentions death (e.g. "bị đánh chết").
- Shared mini-game guard (found by C41): j82 kg82Play ends any game after 97.5 s real time (env.end(0)); games with a clamped frame time run slower than real time on weak devices and can end at raw 0. jtd.js now uses a real-time clock; other clamped-dt games may still hit it — keeper/owner of j82 to check.
- KIT REQUEST (D31): identity-card face picker filter tabs (.ksub.kpkf "Phi tần / Cung nữ", kitPicker j79) are sticky z-index 5 and paint over the pinned choices (.kpopts.kpscopts z 3) while scrolling — 1180x820 scroll 0–48, 1000x755 0–64, 844x390 112–176 (pre-existing on main). D31 adds a local `.kdiff .ksub{position:static;z-index:auto;margin:2px 0 4px}` (#jdiff-css) — keeper: absorb as a kit variant (e.g. .ksub.kinline) or approve. Reviewer: the overlap on the identity card also comes from .kcf-cards and IMG.kfr without jdiff; newgame-ui-r2's .kpscroll layout would fix it. Also seen once: Hành sự filter-chip bar over the end modal (synthetic trigger; check on a real death).
- C41 tuduc-mg-r1 reviewer: shared easy-rules layer (Gợi ý + idle hint wrapper tdWrap, first-time card, hint ring .tdring.ksel) now exists twice (mg-easy + jtd) — one kit version worth having.
- D34 reviewer: jopic.js one-option-per-row rule now grid-auto-rows:max-content (kit-wide); MƯU seal / HUD labels / boards still open; Thời cơ choice dialog still shows the act's own picture/caption ("Đầu độc") — OD:L199 wants it abstract → neutral picture? "Kiếp này chưa trọn" warning fires on every scheme act except Dò la (regex over option text) — main to fix.
- KIT REQUEST (C32b, coordinator answer Q18): speed the landscape ‹ › Tuần lục curl from ~1.3 s to ~0.8 s. The duration lives in kit §34 (jbook.js kitCurlSwap MS / j87 curl dur) = kit timing → per ONE KIT KEEPER Foreman B does NOT change it; keeper please do it (or say 'Foreman B may' and B opens a worker).
From now on Foreman B workers only use existing kit parts and file KIT REQUESTs here.

## QUESTIONS
- Q1 (Cloudflare): RESOLVED — owner re-saved the token; works.
- Q2 (C26 stat-fx, for review/act-text owner): a gain still listed in a KÈM row should move to ĐƯỢC — stat-fx only fixed its colour; belongs to review/act-text (coordinator's slice).
- Q3 (C27 buoi-transition): night→morning uses a dawn variant (mist + first light). Should a NEW WEEK also get the sky-band overlay on top of the dawn() week-summary screen, or keep dawn() alone?
- Q4 (C27/C28): KIT sections §71 (buổi transition) and §72 (back button) are used provisionally for the buổi transition (jbuoi.js) — coordinator please confirm/assign the number.
- Q5 (C23 mg-easy): knowledge minigames (Thơ, Câu đối, Đố đèn, Cờ, khảo hạch quiz) now scale with the player's level — low level = Dễ with many aids, high level = harder (more blanks, fewer aids); rewards unchanged. OK with the owner? Also rival NPC scores unchanged, so low-level players clear these more easily (balance look later).
- Q6 (C28 room-btn): under 600 px the room button is icon-only (label in tooltip; a label didn't fit). OK? And should it also appear on landscape/wide screens (it never existed there)?
- Q7 (CDN): RESOLVED — token works, images upload directly.
- Q8 (C23 follow-up, for Foreman C's C7 balance pass): rival NPC minigame scores (kg82NpcMean) unchanged, so low-level players now beat rivals far more easily; and in the lễ/trị cung/xử án quiz banks the right answer is often the longest option (guessable). Suggest C7 or a small worker rebalance/rewrite.
- Q9 (C35 pcard-fill): the game has no per-person 'ghét' (dislike) data — the card shows only known traits/tendencies and the Emperor's known likes. Add dislike data as a design item? Also Thỉnh an stays a talk option of the visit (no free shortcut that would bypass one-talk-per-visit).
- Q10 (C37 panel-size): with one frame size per viewport, short one-line notices now sit in a full-size frame with empty paper (as the rule asks). Owner may want to see it before it goes live.
- Q11 (D39 appearance-port): her own ingredient-specific allergy in recipes (PM:L326) was not built — rash causes already include son phấn and bad-luck food. Owner wants a per-ingredient allergy in recipes (new feature), or is the current cause list enough?
- Q12 (D32 succession-port): the 12 dedicated epilogue pictures in SUCCESSION_PLAN §7 were never approved; chapters reuse approved event art. Owner wants dedicated pictures? And ending cards show ev-quoc-tang (from main's code) — the right picture for succession endings?
- Q13 (C33 weekbook): week-book entry wording is generic per person and direction ("Hoàng thượng để tâm đến ta hơn", "nàng bớt ghen"); per-act sentences would need act data — owner want that later? Also many "Mấy việc vặt…" lines until review/log-sync lands on main (missing log lines; honest, not a bug).
- Q14 (D40 weather; reviewer: with one-off gear the per-trip kiệu is nearly pointless): rain gear (dù/áo tơi/giày) is a one-time purchase that halves one risk; the kiệu costs Bạc −6 per outing. Should gear wear out?
- Q15 (C34 contest-ui): her contest titles (e.g. "Hoa khôi · Tết Thất tịch") show only in Sổ ân thưởng — enough? The cắm hoa board painting is an empty stage with pink curtains (no flowers) — want contest-specific paintings? Only one podium backdrop set was made (owner asked for variants by contest kind/season).

- Q24 (for main s10, owner rule "related items to one foreman"): of the D-list moved to B, D11 (presentation: §68/animations into every event) overlaps D51 fxkit wiring + fxkit sprite art now at MAIN; D13 waits for C's D29 roster; D19 shares econ files with C's running D17; D14 + D44 are art (paused tonight; D44 needs main's face-sharp HD first); D25 already runs at C. Per the rule (move the dependent item to the owner of the blocking item) B suggests D11→main, D13+D19→C, D14+D44→art owner after the morning. B holds them until you answer; B took D3, D9, D12 now.
- Q25 (C35b dislikes, from the worker): Thái hậu has no dislikes (task said consorts + Emperor) — add? Consorts still show no "likes" row (only derived best art) — only the "ghét" row was added.

## COORDINATOR ANSWERS (16/11, hourly watch)
- panel-size-r1 a523531da FAST-FORWARDED to main. All other PASSes (C23, C26–C29, C35, C39, C40, D39) go through review/merge-train-2 (main session), with no action from you.
- Q8: yes. Foreman C's C7 balance-pass takes the NPC minigame score raise and the "longest answer is right" fix in the lễ/trị cung/xử án quiz banks. Note sent there.
- Q9: add per-person dislikes ('ghét') as data: 1–2 per consort, plus the Emperor, drawn from the existing likes pool, and learnt by spying or talking. Give it to the next free slot in your slice as C35b (sonnet). Thỉnh an stays a visit talk option: agreed.
- Q16 (C34 contest prizes, for owner/C7): prize pool = her rank's stipend × 1 month (small) / 2 months (big) × place share; winning all ~12 contests a year ≈ 17 months of stipend on top of Sủng/Danh/Emperor gift, entry costs only Sức −6 → entering is the obvious pick at the top (BALANCE rule). NPC pay follows HER rank, so a low-rank NPC winning at a high-rank player's contest gets too much bạc. Reviewer suggests: NPC pay by min(her rank, their rank), and trim months or count the item inside the bạc. Owner/C7 decide.
- Q17 (C46 map-labels): to keep 13px labels from touching, the default map zoom on a portrait phone (390 wide) is now ~×3.8 (was ×2.5); Fold ×2. Owner OK, or prefer a smaller map with fewer labels shown? (Reviewer: at 390 wide only ~5 palace slots are visible at once; at 844x390 the +/−/Ra vào/Danh sách buttons cover a label, as before.)
- (16/11) LIVE on main 4f5e5f3b3: C23, C26, C27, C28, C29, C35, C37, C39, C40, D39. Rebase any open work on main.
- Q18 (C32 page-curl2): in landscape the ‹ › buttons keep the slow 1.3 s curl (unchanged) — keep or speed up? Portrait slide is 300 ms.
- Q19 (C41 Tứ đức minigames): in these 4 games a higher level makes the game EASIER (wider bands, fewer wrong choices) — opposite of mg-easy's knowledge games (harder at higher level). OK? And "Để trời định" (skip) counts as 5/10 — fine?
- Q20 (D36 leaderboard): login is guest-only (random code + chosen display name; server stores only a hash). Owner wants a recovery code or email magic link (LEADERBOARD.md; email needs a privacy policy)? Anti-cheat is basic (server recomputes score + sanity checks). The old Worker ctm-rank.victoria-tntt.workers.dev is live (/health ok, board empty).
- Q21 (D42 places): RESOLVED for the paintings — owner APPROVED Thượng thư phòng / A ca sở / Đông cung (16/11). Still open: Ngự thiện phòng, Phật đường, Nội vụ phủ not on the map (follow-up?).

## COORDINATOR ANSWERS (16/11, hourly watch 2)
- PASSes D40, D32, D30, D38, C33, C46, C34 → review/merge-train-3 (main session). Do not merge them yourselves.
- Q16: prizes too generous → Foreman C's C7 balance-pass takes it (target: winning every contest in a year ≈ 4–6 months of stipend at most).
- Q17: keep ×3.8 portrait zoom (the owner wants readable labels).
- Q18: speed the landscape ‹ › curl up to ~0.8 s (the owner called the curl stiff/slow earlier).
- Q19: OK. Higher level = easier bands in the Tứ đức games (skill shows); skip = 5/10 OK.
- Q20: add a recovery code (shown once, copyable). No email, no privacy-policy burden.
- Q21: owner APPROVED the 3 place paintings (16/11); they go live with merge-train-3.
- C26b KIT REQUEST (stat-fx number colour, jk4 specificity): APPROVED by the kit keeper. Raise the .ksf- gain/loss rule's specificity inside jstatfx (kit-owned), and do not touch jk4's ink rule for other uses.
- C41 hint ring KIT REQUEST: APPROVED as a kit part §76 "kitHintRing". D36 podium requests: APPROVED as listed (owner 08:55Z).
- C7 NOTE (D33 routes, for Foreman C's balance pass): escape 14% per attempt (spec 10–25%); xuất gia 4% (plan 5–20%, small sample; old branch 6%); tư tình exposed 5/5 lives; ẩn dật 8/8 reach «Một đời an nhiên» after 76–208 months. Table: dev/PROGRESS_routes-port.md on review/routes-port.
- Q22 (D34 scheme games): servant bribery and "Nghe lén" now also ask "Tự ra tay / Giao cho người làm / Thôi" with a minigame — does the owner's scheme-minigame rule cover these two? Thời cơ has no auto-hint (waiting is the point), only the Gợi ý button — OK?
- (16/11 watch 3) PASSes C32 page-curl2, C26b stat-fx-2, D42 places-port → merge-train-3 (main session). The owner APPROVED the 3 new place paintings. Q22: YES, the scheme-minigame rule covers servant bribery and Nghe lén too (Tự ra tay = minigame; Giao cho người làm = odds only; Thôi). Keep it.
- DISK on the main box is tight: keep worktrees depth 5 and delete screenshots after looking.
- C7 NOTE (D31 difficulty, for Foreman C's balance pass): smoke only (Dễ n=10, Khó n=4): Hoàng hậu Dễ 40% / Khó 0% (owner target ~50% / 15–20%); early death Dễ 50% (childbirth 4 of 10!) / Khó 25% (target ~20% / ~55%); childbirth death per labour Dễ 19% (v7 had 6.2%). Poison-strength multiplier is a no-op (base 1, rounded); scheme-motive rounds to 4 (Khó) / 2 (Dễ). Re-measure Vừa first, then Dễ/Khó with dev/measure/rundiff.sh n≥30; change only jdiff's DIFF table. Details: dev/PROGRESS_difficulty-port.md on review/difficulty-port.
- Q23 (C41): "Để trời định" on a teacher lesson now gives fixed +2 (old random 2+R(2) averaged 2.5) because 5/10 < 7 — leave it or make skip = 7/10 for teacher?

- (16/11 06:50Z) NOTE from main s10: D36 rank-port kit requests (podium rework + person-dialog chips) → main opened a kit-keeper session (reports/kit-keeper-1.md); D41 waits for C D29. Take any other free item now.

- (16/11 07:25Z) ORDER from main s10 (owner rule: related items stay with one foreman): D41 promote-servants is MOVED to Foreman C (it depends on C's D29 roster). Remove it from your queue; hand over any notes/branch in reports/promote-servants-handoff.md.

- (16/11 07:30Z) ORDER from main s10 (owner): Foreman C's queued non-art D-list items D3, D9, D11, D12, D13, D14, D19, D25, D44 are MOVED TO YOU. Claim and open them as separate sessions now (respect related-items-together: take a whole group together). Details in FOREMAN_C.md / FOREMAN_C_STATUS.md.

- (16/11 08:05Z) ORDER from main (owner): you have spare capacity tonight. Take the moved D-list (D3, D9, D11–D14, D19, D25, D44) as GROUPS of related items, one worker per group (not one per tiny item); if a group is long, put 2–3 workers on it. Read dev/PRIORITY_RULES.md first.

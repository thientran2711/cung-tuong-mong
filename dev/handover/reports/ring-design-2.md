# RING-DESIGN-2 report — «KHU VƯỜN» crowd areas + focus + person-interaction picker (owner 24/11 ~15:30Z)
Worker: RING-DESIGN-2 (MAIN CHÍNH 124). START_CTX ≈ 3 % (estimate; get_session reads 0). Design only, nothing landed. Branch review/ring-design-2.
PRIORITY #1 CHECK ('khu vực|schedule|ngự hoa viên'): OD 59 | ledger 8 | claims 8 | main 15 | review/* 9 | archive 0 → REUSED: j95 FIXED SCHEDULE record (R.P plans, ACT95, master→thân tín links), j95ppl/j95ledObj, j59tagHTML/j59known/j59col (plaques + stranger rule), place view k3ShowPlace (iPad = ONE wide scene), the garden painting `ngu-hoa-vien` (+ season/buổi variants SCN_VAR), kitFocus §92 fan button `.kfoc-b` markup + `.pctabs` tabs + kitMoodSay, review/ring-design r2 harness (boot), review/selection-scene yard density (4 full-size per Fold view).

STATUS: STILLS DONE (Fold + iPad, 3 pickers) · MP4 1×/2× NOT YET · PERF TABLE NOT YET · index.html NOT YET → see HANDOVER at the end.
Stills on CDN: https://ctm-img.victoria-tntt.workers.dev/img/_review/ring3/stills/<fold|ipad>-<state>.jpg
states: a0 / a1 / a2 = area Non bộ / Lối hoa / Đình bên hồ · g-<pk> group lit · s-<pk> she steps out · p-<pk> picker open · l-<pk> one choice lifted · t-<pk> talk (speaker left, her right, kit bubble). pk = fan | hang | bac.
NOTE: those stills came from two different random lives (Fold one was a maid-road life, HUD differs). boot.js now rejects maid-road + opening lives — RE-SHOOT both with the same KSEED before showing the owner (complete-mock rule OD 24/11 ~14:50Z).

## Real crowd numbers (law 4 / 6b — measured on the live schedule, not invented)
j95 record, 59-person roster, 10 seeds × 4 buổi × 4 khắc at Ngự hoa viên (incl. followers):
| buổi | median | p90 | max |
|---|---|---|---|
| sáng | 2 | 6 | 6 |
| trưa | 12 | 17 | 17 |
| chiều | 12 | 18 | 18 |
| tối | 0 | 2 | 2 |
About half are thân tín followers ("follow" 504 of ~960 plan-slots) → GROUPS ≈ masters ≈ 7–9 at peak. At 70 NPCs (×70/59): peak ≈ 21 people ≈ 10–11 groups.
Garden acts in the record: walk, follow, seekemp, music, poem, paint, stroll/attend (Emperor), ag_cx3 pmPlay/pmDuel (cờ, thách đấu), talkSecret, talkHealth, flaunt, effort.

## Law 8 — how an imperial garden is laid out (from memory, needs an expert to confirm)
Forbidden City Imperial Garden (御花园 = Ngự Hoa Viên), north of Khôn Ninh cung, ~1.2 ha, symmetric about the central axis with Khâm An điện in the middle. NE: Đôi Tú sơn rockery with Ngự Cảnh đình on top (Trùng Dương climb). East/west: Phù Bích đình and Trừng Thụy đình, square pavilions bridged over ponds; Vạn Xuân đình / Thiên Thu đình (round-roofed pavilions); Giáng Tuyết hiên (flower viewing), Dưỡng Tính trai / Vị Dục trai (study/rest halls); pebble-mosaic paths, old cypresses (Liên lý bách), flower beds/peony terraces. Consorts went with their maids/eunuchs behind them, lower ranks yield and bow on the path; dramas (Chân Hoàn truyện, Diên Hy công lược) use the garden for chance meetings with the Emperor, quarrels by the water, secret talks behind the rockery (the game already has SPOT95 «sau hòn non bộ»).
→ three AREAS, each a crop of the ONE existing painting (no new art; the painting already shows rockery left, path + flower beds centre, pavilion over the pond right):
| area | crop | purposes (record acts) |
|---|---|---|
| Non bộ | left | tryst, ambush, spy, scheme, talkSecret, walk, changed |
| Lối hoa | centre | stroll/attend (Emperor), seekemp, paint, flaunt, effort, walk |
| Đình bên hồ | right | music, poem, pmPlay (cờ), pmDuel, talkHealth, walk |
| Lối đi (overflow, only when needed) | centre | anyone who did not fit |

## 1) CROWD — options
- **A «KHU VƯỜN» (RECOMMENDED)**: a crowded place = 3 areas (same painting, camera pans = she walks along the garden, not a page flip). Each NPC goes to the area of her PURPOSE (record act → area table above). Each view holds as many groups as fit at the ONE kit figure scale (never shrink, OD:L177), max BAL.area.view kv1 3 / kv2 4; a group that does not fit goes to the next area by affinity, then to an overflow «Lối đi» area — nobody is turned away (no cap on NPCs, owner 15:30Z). Area switch = kit `.pctabs/.pct` row at the top of the stage: «Non bộ · 4 | Lối hoa · 3 | Đình bên hồ · 7» (people count, so she never gets lost) + swipe. Fold measured: 2 groups per view (a master + her maid ≈ 240 px at KIT_FIG) after the right column folds away in crowd mode (see kit requests) — that is exactly the sân chờ density she liked (owner 24/11 ~05:00Z: 3–4 full figures per Fold view). iPad: 3–4 groups, right column stays.
- B «Trang nhóm»: same, but groups simply in pages of 3/4 with the live j59 ‹ › chips; no purpose → loses «có mục đích rõ ràng» (her 15:30Z ask). Simpler, cheaper.
- C «Lọc theo việc»: one view with the 3–4 most relevant groups (known people, Emperor, drama) + head-count chip «còn n nhóm» opening a list. Fewest figures, but the rest are hidden behind a list = the «get lost» she disliked.
Capacity check at 70 NPCs: peak ≈ 11 groups → A gives Fold 3 areas × 2 + overflow (≈ 5–6 views), iPad 3 × 4 = 12 (3 views). Proposal BAL (not landed): `BAL.area={vuon:[areas…],view:{kv1:3,kv2:4},gap:.06,feet:.9,zoom:{kv1:1,kv2:1.45},folS:.86,folDx:.40,folDy:.035,panMs:760,walkMs:700,stepK:1.12,spot:{kv1:.24,kv2:.30},farOp:.55,pkMax:6,extraName:'Lối đi'}` (mock: dev/review/ring3/scen3.js). Other crowded places (Đức Thọ cung thỉnh an, sân chờ …) reuse the same part with their own area table (law 11).

## 2) FOCUS (built in the mock)
Background never darkens (owner 09:05Z). Tap a group → the others cross-fade to a pre-darkened copy (brightness .52 / strangers .8) and the group stays full colour; its caption chip («Đang ngâm thơ») stays, others fade to .35. Tap a person → she WALKS OUT to the talk spot (left third: speaker-left rule) and grows ×1.12 with one soft bob, her own followers step back (×.95, dim), other groups fade to .55; masters' plaques always, followers' plaques only when they step out (no overlapping plaques).
## 3) PICKER — three ideas (all kitFocus `.kfoc-b` buttons + `.pctabs`; no frame, no card, never over a face)
- **P1 «Quạt nan»** (fan): the full kit fan buttons (picture + name + odds word · Tốn) open like fan ribs from her hip on her free side, 45 ms stagger. Most readable (all info at once), 6 buttons fit on Fold.
- **P2 «Thẻ treo»** (hanging plaques): compact buttons (picture + name) drop from above beside her and swing to rest (pendulum 9° → −6° → 3° → 0); tap = it lifts and shows its line, tap again = choose (same as her card rule 15:15Z). 2 columns.
- **P3 «Bậc đá»** (stepping stones at her feet): square kit buttons (picture + 2-line name) rise from the ground on a shallow arc from her front foot; tap = lifts + its line shows above as a kit chip; tap again = choose. Most «game-like», smallest footprint, readable on Fold; least text at once.
RECOMMENDATION: P3 for everyday people-interaction (game feel, nothing covers her body/face, matches her «nút nằm dưới chân» wish) with tap-to-lift details; P1 as the fallback when a person has many acts (≥ 7) or on the first visit. Group tabs (Giao thiệp / Mưu kế / Hại người, real counts from dfData) sit above the stones.

## Checklist per ruling (stills r3)
| ruling | status |
|---|---|
| no dotted oval (08:55Z) | OK — no ring track at all |
| bg normal brightness (09:05Z) | OK — dim only on figures (cross-fade copy), painting untouched |
| kit buttons / no round avatars / kit frames (09:15Z) | OK — .kfoc-b, .pct, .kchip, j59 plaque, kitMoodSay; live round idle bubble suppressed in the mock (it is a live element — report: check kitMoodSay/df idle face is not round) |
| strangers grey «Người lạ» | OK — j59known false → kit unknown-fig silhouette + j59 «???» plaque |
| ≤ 3–4 groups per view, no cap (15:30Z) | OK — Fold 2, iPad 3–4; overflow area |
| iPad = one wide landscape scene | OK — place view spans the spread |
| group lit / others dim; person steps out (15:30Z) | OK |
| no frame/panel; animated start→end (15:30Z) | OK in mock (enter, pan, dim, step, picker, lift, talk) — needs the mp4 to show |
| not cards for person acts (15:30Z) | OK |
| speaker left / her right (04:35Z) | OK — t-* stills |
| never cut figures | OK on stills; P3 stones overlap the skirt hem on Fold (not the face) |
| complete mock (14:50Z) | NOT YET — re-shoot both devices with the same consort life |
| smoothness gate | NOT YET — run.js perf mode written, not run |

## KIT REQUESTS (to file in dev/kit/KIT_REQUESTS.md by the successor)
1. `kitArea` crowd-area layer (areas from BAL, purpose assignment, pan, group shapes master+followers behind). 2. kitFocus: export `btnHTML` + two layouts (fan arc, stones row) + compact `.kfoc-b` variants (square, tap-to-lift). 3. Fold crowd mode: fold the right column (kitGroupFold §31.2b family) while an area view is open. 4. Dim = cross-fade to a pre-filtered copy (no animated CSS filter) as the ONE kit dim (law 11: §93/§95/§92 veils still darken whole screens — report only).

## HANDOVER (context rollover at START+25 %)
Code: dev/review/ring3/ (boot.js seeded life `KSEED=<n>`, scen3.js crowd from the record + proposed BAL.area, area.js engine KAR, run.js driver, capture.js → crowd.json = the real crowd replayed on both devices).
Next steps: (1) `cd dev/review/ring3; KSEED=14 node run.js fold shots; KSEED=14 node run.js ipad shots` (check same consort HUD), look at every frame vs the checklist; (2) `node run.js <dev> video` → ffmpeg webm→mp4 1× and 2× (`setpts=2*PTS`) into img/_review/ring3/vid/; (3) `node run.js <dev> perf` → perf-<dev>.json (rAF p95 at CPU 1/4/6×, gate p95 ≤ 20 ms; if a step fails: drop the bob/pendulum, keep opacity only); (4) img/_review/ring3/index.html (stills Fold+iPad side by side, videos, recommendation) → `python3 dev/site/cdn_sync.py img/_review/ring3`; (5) file the 4 KIT REQUESTS; (6) report to MAIN 124 «SẴN SÀNG KIỂM». ~Design 70 % / playable 0 %.

## BRIEF CHANGES AFTER THIS WORK (MAIN 123 msg 15:40Z, owner OD row «(24/11 ~15:40Z real, MAIN CHÍNH 123 chat)» — successor READS IT VERBATIM first)
1. AREAS adopted as a SECOND LEVEL of Dư đồ: tap Ngự Hoa Viên → the garden's own map with its areas, each with a silhouette head-count; she enters ONE area and interacts only there (whole family: every crowded place). → the in-scene tab row of this mock becomes an area MAP level; keep the per-area scene (KAR) as the inside of one area.
2. FIRST deliverable = a written PLAN: areas (law 8 table above is the start) + which of 60–70 NPCs go to which area by purpose/nết/schedule (reuse j95 record; the measured numbers above; proposed BAL.area) → goes to Foreman C to paint the area map + one scene per area; until then mock on existing backgrounds (crops) and SAY SO.
3. Mock ALL 3 pickers, owner names: «thẻ gỗ treo» (HER FAVOURITE = P2 here), «quạt nút» (= P1 fan of buttons), «nan quạt giấy» (paper-fan ribs: NOT built yet — a third variant where buttons sit on rotated fan ribs from one pivot). P3 «Bậc đá» is extra; my recommendation above (P3) is superseded by her preference — re-recommend after mocks. Winner = every person-to-person talk screen.
4. Smoothness: dropping animation is NOT allowed — optimise until p95 ≤ 20 ms at 4× throttle on Fold + iPad; report what was done (current engine already: transform/opacity only, dim via cross-fade of a pre-filtered copy, will-change; next levers: fewer simultaneous WAAPI, contain:paint per figure, smaller decoded image sizes).
Coordinator now = MAIN CHÍNH 125 session_01V1ZZGzMTVHzyPyJN9e5Qzp.

# AREA PLAN — crowded places as a second Dư đồ level (Ngự hoa viên first) — RING-DESIGN-3, 24/11
PRIORITY #1 CHECK ('khu vực|ngự hoa viên|tầng thứ hai|kitPalaceMap|SPOT95|schedule'): OD 24/11 ~15:30Z + ~15:40Z rows (areas adopted, plan first), OD 18/11 ~19:25Z/~19:45Z (Dư đồ zones CANCELLED, palace 2nd level kept) | main: jpm.js kitPalaceMap (KIT §76) + jmapz.js 2nd level of Càn Ninh/Đức Thọ (KIT §85.10), j95 record (habits/intents/Emperor/followers), SPOT95 «sau hòn non bộ», SCIMG vuon=ngu-hoa-vien, KIT_FLOOR/KIT_FANCHOR | review/ring-design-2 5d80ac8c (KAR area engine, first area table, measured crowd) | claims RING-DESIGN-2 → RING-DESIGN-3. REUSED: everything above; nothing rebuilt.

Status: DESIGN (written plan for MAIN → owner → Foreman C art + a build foreman). Nothing lands from this branch.
Owner rulings this plan obeys (verbatim in dev/OWNER_DECISIONS.md, rows 24/11): ~15:40Z (1) second Dư đồ level with areas + head-counts, she enters ONE area; (2) plan of which of the 60–70 NPCs go where BEFORE art, then the garden map + one scene per area get painted; ~15:30Z no hard cap that forces NPCs against their nết, NPCs come with a clear PURPOSE, each view ≤ 3–4 groups, scale to 60–70; ~09:10Z one screen, no paging inside a view; ~09:00Z the place must feel full; law 4 (numbers in BAL), law 6b (real people, real schedules), law 8 (history first), law 11 (whole family).

## 1. The flow (three levels, all existing kit parts)
1. **Dư đồ** (kitLeather §34.1b): the Ngự hoa viên label keeps its kit chip «N bóng · K khắc» + silhouettes (§34.1d) — N = everyone in the garden now.
2. **Garden map = SECOND LEVEL** (tap the label while she may walk in): the SAME kit part as Càn Ninh / Đức Thọ — `kitPalaceMap` (§76) + the `jmapz` hall-row pattern (§85.10). The garden's own bird's-eye painting, one `.mspot` hotspot per AREA (kit `.mlab` paper label: area name + «N bóng người» / «vắng» + `.msil` silhouettes), and under it one kit `.btn.kpm-row` per area (name · N bóng người · what is happening there in one short line, e.g. «có người gảy đàn»). Back = «‹ Dư đồ». Locked / out of khắc → the one-tap place card as today (walk spill, Lẻn vào). The courtyard rule of §76 («a courtyard picture exists only for places with ≥ 2 halls») already allows it: the garden now has 5 areas.
   (Not a re-opening of the 18/11 «Dư đồ zones» she cancelled: those were extra zoom layers on the WHOLE map; this is the second level of ONE place, which she asked for at 15:40Z and which Càn Ninh / Đức Thọ already have.)
3. **Area scene** (tap an area): the area's own frontal painting; its groups stand on the floor band; ≤ `BAL.area.view` groups per view (kv1 Fold 3 / kv2 iPad 4) and always as many as fit at the ONE kit figure scale (never shrink, OD:L177). Tap a group → it stays lit, others dim (figures only, painting keeps its brightness); tap a person → she steps out toward her; the person-interaction picker (§4 of the mock report) opens at her feet. Leaving the area = «‹ Ngự hoa viên» back to the garden map (walking between areas inside the garden costs NO khắc — the khắc was paid to reach the garden; owner can change via `BAL.area.moveKh`).

## 2. Ngự hoa viên — the areas (law 8: Forbidden City Imperial Garden 御花园; expert check still requested)
Real layout (north of Khôn Ninh cung, ~1.2 ha, symmetric about the central axis): Khâm An điện in the middle on the axis; Đôi Tú sơn rockery with Ngự Cảnh đình on top (NE); Phù Bích đình / Trừng Thụy đình = square pavilions bridging the ponds (E/W); Vạn Xuân đình / Thiên Thu đình = round-roofed pavilions; Giáng Tuyết hiên + peony terraces (flower viewing); pebble-mosaic paths, ancient cypresses. In dramas: chance meetings with the Emperor on the main path, poems / music by the water, quarrels on the path, secret talks behind the rockery (the game already has SPOT95 «sau hòn non bộ trong Ngự hoa viên»).

| key | area (player name) | real model | PURPOSE — record acts (ACT95 / ag_ codes) that send a person here | nết pull (for «walk» / free choice; words = the ONE pool BAL.net.F/M) |
|---|---|---|---|---|
| `ngudao` | **Ngự đạo** | central axis path before Khâm An điện | Emperor `stroll`, `attend`/`escort` (tổng quản, thị vệ), `seekemp` (chờ gặp Hoàng thượng), `ag_flaunt`, `ag_cx2:court`, `ag_cx2:show`, `ag_cx2:flat` | Kiêu ngạo, Tham vọng, sắc ≥ 75 |
| `vuonhoa` | **Vườn hoa** | Giáng Tuyết hiên + peony terraces | `paint` (vẽ tranh, ngắm hoa), `walk`, `ag_effort`, `ag_cx3:talkPraise`, `ag_cx3:talkGossip`, hawker `sell`, kids `play` (with nhũ mẫu), Thái hậu `walk` | Ân cần, Nhiều chuyện, Ham vui, default for plain «dạo vườn» |
| `thuyta` | **Thủy tạ** | Phù Bích đình over the pond (cho cá ăn) | `music` (gảy đàn; nhạc sư too), `poem`, `ag_cx3:qin`, `ag_cx3:talkHealth`, feeding fish | Điềm tĩnh, Khiêm nhường, Ham học |
| `dinhco` | **Đình cờ** | Vạn Xuân đình | `ag_cx3:pmPlay` (cùng chơi cờ), `ag_cx3:pmDuel` (thách đấu), Emperor's `empWager` | Nóng nảy, Thực tế (a wager / a duel) |
| `nonbo` | **Non bộ** | Đôi Tú sơn + Ngự Cảnh đình | `tryst`, `spy`, `scheme`, `ambush`, `ag_cx3:talkSecret`, `changed` (đổi ý, hóng mát), j95 secret meetings (SPOT95) | Kín đáo, Xảo quyệt, Thù dai |

Rules of assignment (one function, reads only the j95 record + BAL; deterministic per buổi×khắc so every reader agrees, law 6b):
1. **Purpose first**: a master goes to the area whose `acts` list holds her record act (first match). Followers (`follow`, `ag_follow`, thân tín, cung nữ, thái giám) are never placed on their own: they stand BEHIND their master in her group (owner ~07:58Z), so they never count as a group.
2. **Two-person acts**: a master whose record carries a partner (`with` = the other's id: cờ, chia sẻ chuyện riêng, gây sự `provoke`, hẹn kín) joins the partner's group in the PARTNER's area → the quarrel pair stands face to face (owner ~08:05Z).
3. **Plain walk** («dạo vườn» with no target): the area with the strongest nết pull (table above), ties → Vườn hoa.
4. **Seek the Emperor** (`seekemp`, the biggest crowd at trưa): the Emperor walks a ROUTE through the garden — one area per khắc, `BAL.area.route` (Ngự đạo → Vườn hoa → Thủy tạ → Đình cờ). Bold nết (Kiêu ngạo / Tham vọng / sắc ≥ 75) wait where he IS now; the others wait «tình cờ» where he will pass NEXT, doing something proper there (they show the act of that area: ngắm hoa / cho cá ăn). This spreads the crowd the way palace dramas do, and gives her a real reason to pick an area.
5. **Grouping inside an area**: masters of the same act in the same area whose affection ≥ `BAL.area.joinAff` stand together as ONE group (2–4 masters, «Đang chuyện trò»); a group never holds more than `BAL.area.grpMax` masters (then a second group of the same act). A master with affection ≤ `BAL.area.avoidAff` toward someone in a group keeps apart (her own group, or the next area — a real «tránh mặt», law 6b).
6. **No cap on the garden** (owner 15:30Z): nobody is ever sent away or kept home by a number. If an area has more groups than fit one view, the extra groups go to the NEIGHBOUR area with the closest purpose (`BAL.area.near`), and only if every area is full a sixth area **«Lối đi»** (the side path, `extraName`) appears on the garden map. Measured: at 70 NPCs the overflow area appears only in the busiest trưa khắc on Fold.
7. **Schedule** comes from the record (habits per buổi, Emperor's hours, season `j95seaV`, rain): the plan adds nothing of its own. Expected pattern: sáng = Thủy tạ + Vườn hoa (thơ, vẽ); trưa = Ngự đạo + Vườn hoa (the Emperor's hour, seekers); chiều = Thủy tạ (đàn) + Vườn hoa; tối = almost empty (lantern walk, Non bộ trysts).

## 3. Head-counts (law 6b: MEASURED on the live record, not invented)
Measure: `dev/review/ring3/measure.js` — the j95 record of a 55-person roster, 12 seeds × 4 buổi × 4 khắc (192 khắc), people at Ngự hoa viên incl. followers; the area of each by rule 1 (rule 4 spread not applied yet = worst case for Ngự đạo). «@70» = ×70/55.

| buổi | garden total median / p90 / max | Ngự đạo p90 (@70) | Vườn hoa p90 (@70) | Thủy tạ p90 (@70) | Đình cờ p90 (@70) | Non bộ p90 (@70) |
|---|---|---|---|---|---|---|
| sáng | 5 / 7 / 7 | 0 (0) | 3.5 (4.5) | 3.3 (4.2) | 0 (0) | 0 (0) |
| trưa | 16 / 21 / 23 | 12.3 (15.6) | 9.2 (11.7) | 3.8 (4.8) | 3.5 (4.5) | 1.9 (2.4) |
| chiều | 12 / 17 / 17 | 5.3 (6.7) | 6.0 (7.6) | 9.4 (12.0) | 1.8 (2.2) | 0 (0) |
| tối | 1 / 1 / 3 | 0 (0) | 1.0 (1.3) | 0 (0) | 0 (0) | 0 (0) |

People ≈ 2 per group (a master + her thân tín; about half of everyone in the garden is a follower). So at 70 NPCs the trưa peak ≈ 27 people ≈ 12–13 groups: Ngự đạo ≈ 7 groups before rule 4, ≈ 3–4 after the route spread (seekers split over Ngự đạo / Vườn hoa / Thủy tạ by nết). Capacity: Fold 5 areas × 2–3 groups ≈ 12–13 (+ «Lối đi» in the worst khắc), iPad 5 × 4 = 20. → Every view stays ≤ 3–4 groups at 70 NPCs with no cap on anyone.
Other people already in the record who use the garden: the Emperor + tổng quản + thị vệ (Ngự đạo), Thái hậu (Vườn hoa, fine days), the hawker eunuch (Vườn hoa, goes where buyers are), nhạc sư / họa sư (Thủy tạ / Vườn hoa), princes and princesses with nhũ mẫu (Vườn hoa, `kidFight`/`kidTutor` events), men's trysts (Non bộ). Strangers she has not met show as the grey «Người lạ» stand-in (§59.1) in every count and scene.

## 4. BAL (law 4) — proposed block, numbers ours (lands with the build, never typed elsewhere)
```js
BAL.area={
 vuon:[ // order = garden-map order; x = where the area sits on the garden map picture (hotspot), acts = purposes (rule 1), net = nết pull (rule 3)
  {k:'ngudao', n:'Ngự đạo',   acts:['stroll','attend','escort','seekemp','ag_flaunt','ag_cx2:court','ag_cx2:show','ag_cx2:flat'], net:['Kiêu ngạo','Tham vọng']},
  {k:'vuonhoa',n:'Vườn hoa',  acts:['paint','walk','ag_effort','ag_cx3:talkPraise','ag_cx3:talkGossip','sell','play'], net:['Ân cần','Nhiều chuyện','Ham vui']},
  {k:'thuyta', n:'Thủy tạ',   acts:['music','poem','ag_cx3:qin','ag_cx3:talkHealth'], net:['Điềm tĩnh','Khiêm nhường','Ham học']},
  {k:'dinhco', n:'Đình cờ',   acts:['ag_cx3:pmPlay','ag_cx3:pmDuel','wager'], net:['Nóng nảy','Thực tế']},
  {k:'nonbo',  n:'Non bộ',    acts:['tryst','spy','scheme','ambush','ag_cx3:talkSecret','changed'], net:['Kín đáo','Xảo quyệt','Thù dai']}],
 near:{ngudao:['vuonhoa','thuyta'],vuonhoa:['ngudao','thuyta'],thuyta:['dinhco','vuonhoa'],dinhco:['thuyta','nonbo'],nonbo:['dinhco','vuonhoa']},
 route:['ngudao','vuonhoa','thuyta','dinhco'],   // the Emperor's walk, one area per khắc (rule 4)
 bold:{sac:75},                                   // seekers who wait where he IS (plus the bold nết above)
 joinAff:10, avoidAff:-20, grpMax:4,              // rule 5
 view:{kv1:3,kv2:4},                              // max groups per VIEW (Fold / iPad); fewer when they do not fit at KIT_FIG
 extraName:'Lối đi', moveKh:0,                    // overflow area (rule 6); walking between areas costs 0 khắc
 // look/motion of the area scene (mock values, measured smooth — see report)
 gap:.06, feet:.9, folS:.86, folDx:.40, folDy:.035, zoom:{kv1:1,kv2:1.45}, panMs:760, walkMs:700, stepK:1.12, stepY:.045,
 spot:{kv1:.24,kv2:.30}, farOp:.55, pkMax:6};
```

## 5. Same pattern for the other crowded places (law 11) — measured peaks (people incl. followers, p90 / max, 55 roster)
| place | when crowded | p90 / max | masters p90 | areas (second level) |
|---|---|---|---|---|
| Ngự hoa viên | trưa, chiều | 15–21 / 23 | 12 | the 5 above |
| Càn Ninh cung (Hoàng hậu) | sáng (thỉnh an) | 14 / 16 | 11 | ALREADY a second level (§85.10 halls: Mẫu Nghi điện / Khôn Hòa hiên / Thục Thận trai). Inside Mẫu Nghi điện at thỉnh an: groups by RANK ROW (law 8: seated by rank, higher nearer the Hoàng hậu) → «Hàng trên» (Phi and up) / «Hàng dưới» (Tần and below) as two areas of the hall when > view cap |
| Đức Thọ cung (Thái hậu) | sáng | 10 / 12 | 6 | ALREADY a second level (Từ Khang điện / Di Xuân hiên / An Thọ trai); same rank-row split inside Từ Khang điện |
| consort palaces (Dực Khôn, Chung Tú, Vĩnh Hòa, Trường Xuân) | tối (servants home) | 10–12 / 14 | 7–10 | ALREADY kitPalaceMap halls; the servants' row «Dãy nhà cung nhân» = one area; when > cap, split by duty (`clean`/`serve` vs `rest`/`sleep`, MAPZ_ACTHALL) |
| Sân chờ (tuyển tú, ≥ 12 tú nữ) | opening days | 12–24 | — | areas = the call ROWS of the selection (law 8: girls were called in rows of 5–6 by banner/order) → «Hàng 1 … Hàng n», each ≤ cap; her friends/foes stand in their own groups inside a row |
| Tân Giả khố / dãy nhà cung nhân | when punished / off duty | ≤ 8 | — | one area today; if > cap: «Bên giếng» / «Sân phơi» by chore |
Rule for every place (one kit part): a place with ≥ 2 areas opens kitPalaceMap; an area/hall whose groups exceed `BAL.area.view` splits by the place's own real order (purpose / rank row / call row / chore) — never a blind page, never a cap on who may come.

## 6. ART BRIEF for Foreman C (paint after the owner approves this plan; Magnific gpt-2-6 only, folder ba4aecfe…, look at every image; START_ART + FIGURE_GATE)
All pictures: NO people in them (figures are the game's own); bright daylight states first (owner 09:05Z: normal brightness, day looks like day); same painterly family as `ngu-hoa-vien` and the courtyard maps.
**A. Garden map (second level)** — `img/pl2/`-family bird's-eye courtyard painting of the WHOLE Ngự hoa viên, 1792 px wide (§76 fit rules), seen from above and slightly south (same angle as the palace courtyard maps), showing the five areas clearly apart so a hotspot + paper label fits on each: Ngự đạo = the central stone path in front of Khâm An điện (middle, bottom→centre); Vườn hoa = peony terraces + Giáng Tuyết hiên (left-centre); Thủy tạ = a square pavilion bridging a lotus pond (right); Đình cờ = a round-roofed pavilion with a stone chess table (left); Non bộ = the rockery hill with a small pavilion on top (upper right, partly hidden behind cypresses). Leave the top 12 % plain (tabs/title) and clear ground in each area for the label. States: xuân-sáng/trưa/chiều/tối first, then hạ/thu/đông (16), festivals later. Hotspots go into `img/pl2/hotspots.json` (dir `ngu-hoa-vien`).
**B. One scene per area** (eye-level FRONTAL like every stage painting, 16:9, ≥ 1792×1008; `KIT_FLOOR` floor band from ~62 % down; feet line `feet:.9`):
| area | what the camera sees (frontal, eye level) | floor band | where the groups stand |
|---|---|---|---|
| Ngự đạo | the stone-paved axis path running across the picture, Khâm An điện's yellow-tiled hall + marble balustrade far behind, two old cypresses framing | wide flat paving 62–100 % | 4 slots along the path at 15 / 38 / 62 / 85 % of the width; the Emperor's group always the centre slot |
| Vườn hoa | peony terraces and flower beds, Giáng Tuyết hiên behind, a low stone bench | gravel/pebble-mosaic path 64–100 % | 4 slots, flower beds BEHIND the feet line, never in front of the figures' legs |
| Thủy tạ | a square pavilion standing over a lotus pond, low railing in front, willows | the pavilion floor / pond-side terrace 60–100 % (no water in the feet band) | 3–4 slots on the terrace; the musician's group at the centre |
| Đình cờ | a round-roofed open pavilion with a stone chess table and stools in the middle distance | stone floor of the pavilion court 63–100 % | 3–4 slots; the chess pair seated/standing at the table centre |
| Non bộ | the rockery hill with a narrow path and a small pavilion on top, shaded, a hidden nook between rocks | path at the rock foot 64–100 % | 3 slots, one of them in the half-hidden nook (secret talks) |
Every area scene: the important props in the CENTRAL 45 % of the width (the Fold portrait shows ~42 % of a 16:9 painting; iPad shows all of it as ONE wide landscape scene, never a half panel — owner 15:30Z); nothing tall in the front 10 % that would cut legs; floor band level and readable so feet never float (owner 08:25Z). States: xuân × 4 buổi first (the mock uses crops of the ONE existing `ngu-hoa-vien` painting until then — MAIN ruling, mock only), then the other seasons.

## 7. Build split (after her pick; not this branch)
- Foreman C: art A + B (+ hotspots.json).
- Build foreman (D or E): `kitArea` = the KAR engine as a kit part (areas from BAL.area, rules 1–6, groups, focus/dim, step-out), wired into kitPalaceMap for `vuon`, then the law-11 places of §5; whole-family scan + before/after table; the picker the owner picks = kit part shared with MOTION-DESIGN-3 (gift flow).
- KIT REQUESTS filed in dev/kit/KIT_REQUESTS.md (RING-DESIGN-3).

# road-map — Foreman B opus lead (story roads plan owner)
START_CTX ~3 % of a 1M window (session_01N1tNP4TguHSiLpDgAN6EDF). Branch `review/road-map` (base origin/main + merge of review/story14-p1-r2).

## Status
- STEP 1 DONE: master map dev/story/ROAD_MAP.md (docs branch + review/road-map). 288 road chapters, frame order, owners, canon §5.
- STEP 2 (B lead part): jroad.js engine + tt pilot (4 roads × .5–.11 = 28 chapters + 4 rare finales) — see Tests.

## What was built (review/road-map)
- dev/build/jroad.js — engine: `rdDef(road,n,def)` registers chapter `.n` as `ARC67["<road>_<n>"]` (o:"rd", outside every pool);
  a NEW 14-chapter life whose rolled road is complete (`rdFull`) gets Phần giữa = [.4 premise arc, .5 … .11] instead of the phase-1 filler;
  incomplete roads keep the phase-1 frame (roads ship one by one; old saves unchanged). Cast carried across chapters (`S.st.f14.act`,
  `rdCast`); each chapter's ending kept (`S.st.f14.re/ends`; `rdK()`, `rdPrev()`, `rdEnd(n)`) so openings follow the previous ending.
  `.11` = the origin finale (result card «Kết cục xuất thân», family reward tier BAL.road.finTier; j67 chFinale67 not run for that life).
  Rare finales: push j97-shaped entries into `RD97L` (registered into RARE97 after load).
  Thanh mai trúc mã (j96) in a full-road life = SIDE story (S.st.X thread kind "tm"), opened at chapters BAL.road.tm; never numbered.
- dev/build/jrd_tt.js — the 4 tt roads, data only. dev/build/jbal2.js — BAL.road {first,last (from BAL.st14.parts), finTier, cap, tm}.
- assemble.py: jst14.js, jroad.js, jrd_tt.js after j67.js.
- Tests: dev/test/road-full.js (bot walks every full road 1..14, road order, finale, same rival, tm96 side, phase-1 fallback),
  dev/test/road-saves.js (main-build save, phase-1 save, full-road mid-road save round trip; 1180x820).

## HELPER BRIEF (B1 dtq+muoi+cn · B2 nc(+bd)+td+ch · B3 thd+cnv+endgame)
1. Branch `review/road-<group>` off `review/road-map` (sparse worktree, PREAMBLE rules). Read ROAD_MAP.md §3–§5 and your origins' §4 lines.
2. Pattern file: dev/build/jrd_tt.js. One file per origin `dev/build/jrd_<origin>.js`; add it to assemble.py right after `'jrd_tt.js', `.
3. FIRST read your roads' `.4` arc in dev/build/j67.js (its endings E keys and tags; its cast keys) — `.5` opens on the aftermath of `.4`
   (2–3 openings with `if:RDW(1)` / `if:RDW(0)` or `if:()=>rdPrev()==="<key>"`); rewrite your §4 lines in ROAD_MAP.md to what you build.
4. Chapter shape = j67 arc: `{t,w,sj,g,cast(A){return rdCast(A,["v"])},p:[[openings],[2 rắc rối],[1 bước ngoặt],[1 cao trào]],B:{…},E:{win,mid,lose}}`;
   every option has a gain AND a loss (w/wx + l/lx), odds via `o:()=>…` (shown as the VANPHONG ladder, never %), climax options `e:[ok,fail]`.
   Hostile roles real (OD:L1247): `rdOan(A,"v",n)` / `rdRel(A,"v",n)`. `.11` endings close the origin story; add one `RD97L.push({a:"<road>_11",…})`.
   Text: cổ trang Vietnamese per VANPHONG (ngươi, tiểu chủ/nương nương via tokens); names only from §5 (tokens {dad},{v},{hh},{foe},{mis}…).
5. Numbers: chapter-level constants in BAL.road (jbal2.js, add keys under `BAL.road.cap.<road>` etc.); never type a rank name — RANKS[i].n.
6. HISTORY CHECK chapters (§8.3): build the structure, mark them in your report for the expert pass (OD:L1327).
7. Test: `bash dev/site/build_site.sh`, own http server on a free port (kill by PID), `node dev/test/road-full.js <url> 1`
   (~3–4 s per game month; one life per road ≈ 5–15 min; run in background, read the log) and `node dev/test/road-saves.js <url> <main url>`.
   Kit only: chapters render through j67 cards / kitPanel / kitGoalDetail — no new UI.
8. cnv (B3): see ROAD_MAP §8.4 (len14 vs an 8-chapter road) — decide in the cnv road and write it in the map.

## Tests
Build sha 240c68a79 (review/road-map). Logic tests (the chapters add no new UI: they render through the existing j67 cards / kitPanel):
- road-full.js @755x1000, one life per road (first option): tt_co, tt_oan, tt_tranh, tt_mat each walk 1..14 in order, 4..11 = the road
  (.4 premise then _5…_11), origin ending told by the .11 finale (Người cầm quân cờ / Tiếng nhà trong sạch / Một nhà một lòng /
  Trung cung là chỗ dựa), same rival all road, Thanh mai trúc mã opened as side story (tm96a) never numbered, incomplete road keeps
  the phase-1 frame, 0 page errors: 23/24 then (after test fix, regex ignored the tm96 splice) tt_mat run 10/10.
- road-saves.js @1180x820: main-build save (dtq) loads, no road state, plays on; phase-1 save keeps its plan; full-road tt_co save
  mid-road (ch12) keeps road, cast and plan, plays on, Mệnh truyện tab renders; 0 page errors: 4/4.
- Not done: screenshots of a road chapter card (the rebirth roulette covered the page in my quick shot; cards are unchanged j67 kit
  cards) — reviewer should look at one tt_* chapter card at 755x1000 and 1180x820.
- Notes for review: choice costs inside chapters are inline numbers like every j67 arc (same data convention); chapter-level numbers in
  BAL.road. HISTORY CHECK: tt_oan .9 (Tam ty hội thẩm). Bot speed ~3.4 s per game month.

SẴN SÀNG KIỂM 240c68a79

## HANDOVER (rollover at START_CTX+25 %, 11/16/2026 ~16:50Z) — successor = B1 worker + engine owner
- Order from Foreman B s6 (16:44Z): take B1 = dtq + muoi + cn roads .5–.11 (84 chapters) on `review/road-b1` (pushed, = 240c68a7);
  stay ENGINE OWNER of jroad.js: B2 (review/road-b2) / B3 (review/road-b3) send engine change requests to you; any jroad.js change →
  push on `review/road-map-next`, tell Foreman B + B2 + B3. Apply the pattern fixes from reviewer road-map-r1 when it reports.
- Report B1 in dev/handover/reports/road-b1.md (docs branch); "SẴN SÀNG KIỂM <sha>" to Foreman B (session_01N1tNP2qaiWybrEsrX5iL9y).
- Start: sparse worktree on review/road-b1; read ROAD_MAP.md §3–§5 + §4.2/4.3/4.4 drafts; the HELPER BRIEF above; dev/build/jrd_tt.js
  (pattern) and jroad.js. FIRST read each road's `.4` arc in j67.js (E keys/tags, cast) — dtq_bien/vu/binh/huynh, muoi_tuoc/lau/doi/no,
  cn_chu/tinh/ban/than — rewrite the map lines, then write dev/build/jrd_dtq.js, jrd_muoi.js, jrd_cn.js (add after 'jrd_tt.js', in
  assemble.py). HISTORY CHECK: dtq_vu .9, dtq_binh .7, muoi_lau .7.
- Known: bot speed ~3.4 s/game month (road-full one life ≈ 9 min; run with nohup + log, filter roads: `node dev/test/road-full.js <url> 1 dtq_bien,dtq_vu`).
  The road-full fallback check needs at least one incomplete road somewhere (it scans tt..thd). tm96 side story opens tm96a only in bot
  runs (bot plays main beats only) — fine.
- Worktree /home/user/wt/road-map (review/road-map) can be removed by the successor.

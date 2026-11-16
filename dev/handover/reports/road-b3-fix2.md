# road-b3-fix2 — fix of review-road-b3-fix-r1 item 1 (thd_hoc .5–.11 never runs)
Worker: opus (story roads). Coordinator: Foreman B s8. Branch **review/road-b3-fix2** @ 83641f2a (base review/road-b3-fix-r1 401ae165; no main merge — origin/main moved to eba64ead, merge at landing).
Read: PREAMBLE, START_CORE, START_WORKER, topic story-roads, review-road-b3-fix-r1, road-history (thd_hoc pass 2).

## Cause (measured)
A life seeds 3–5 palace children aged BAL.ps.kidAge 1–4, and the 14 chapters span only ~1–2 game years (probe: her age 18/19 → 20/21 over
ch1–14; children 3–4 at .4 → 5–6 at ch14). A pupil gate at BAL.tc.hienAge (6) is therefore almost never met → thdHocOk false from .5.

## Fix (option 1 of the reviewer, + the roll guard of option 2)
- ONE CORE: new `BAL.road.thd_hoc.vlAge = 3` (jbal2.js) = the vỡ lòng age; pupils ({n1}/{n2}, thdHocIn/Cast/Ok) from that age.
  History (road-history pass 2): the road IS the vỡ lòng morning class; princes enter school proper at about six = BAL.tc.hienAge.
- `thdHocBig(A)` = {n1} at BAL.tc.hienAge+: the school-age wording; else a vỡ lòng twin (same options, costs, odds):
  .7 g/s1/x1/E: court exam at Văn Hoa điện before the Lục bộ → (small) Hoàng thượng examines the vỡ lòng class at Thượng thư phòng with Đại học sĩ;
  .7 x1 «đê điều» answer → explains the word «Hiếu»; .7 t1 «cưỡi ngựa bắn cung» only for a school-age son (small: đọc thơ);
  .10 x1 «theo hầu buổi chầu» only school age (small: seated beside the Emperor at the family banquet); .5 c1 «Đại học» → «Tam tự kinh» (a vỡ lòng primer).
- Roll guard: `ARC67.thd_hoc.ok` (set in jrd_thd.js) = a royal child of vỡ lòng age whose mother is a live consort (liveRivals) exists;
  `ARC67.thd_hoc.cast` casts that mother first (else j67's rule), so .5 keeps the same {v}. Old saves: ok only matters for a new roll.

## Whole family (LUẬT SỬA CẢ NHÓM) — scan of road chapters for a child in an age-bound act
Scan: /tmp script (child word + học/đọc/săn/ngựa/bắn/chầu/khảo/giảng/viết/chép/hỏi) over jrd_tt/dtq/muoi/cn/thd/cnv + jend14 + j67 + jst14, then read by hand.
| place | before | after |
|---|---|---|
| thd_hoc .5–.11 | pupils ≥ 6 → road never ran | pupils ≥ vlAge 3; school-age beats twinned on hienAge; roll guard |
| jend14 ke14 s2 (ch14, her son {k}) | «Mời thầy giỏi dạy {k}», «Cho {k} theo Hoàng thượng đi săn» (bắn nai), «… lặng lẽ học bài» for a son born this life (≤1–2 y) | school-age only (egKidBig = son67 ≥ hienAge); twins for a small son with the same costs/odds/effects: «Chọn nhũ mẫu biết chữ cho {k}», «Bế {k} sang thỉnh an Hoàng thượng mỗi sáng», «Giữ con trong cung, chưa tranh» |
| jend14 ke14 t1 | «{k} hỏi ngươi: làm vua…» from a baby | small son: she asks herself while lulling him; rt «Đứa trẻ nhớ lời ngươi» → «chép lời ấy vào sổ…»; «Bảo nó tự nghĩ» → twin «Để con lớn rồi tự nghĩ» (same numbers) |
| jend14 ke14 x1 rt | «đặt tay lên vai {k}» | small: «bế {k} lên tay trước Thái miếu» |
| jrd_tt c2 (TT_VKID) | «nếu con nàng sau này…» | OK (future tense) |
| jrd_cnv_ma r97 «bế con quỳ» | | OK (a baby) |
| NOT B3 (j67 main, note for its owner) | j67 kid arc x1 «Xin cho con học ở Thượng thư phòng cùng Thái tử» (need kid, any age); j67 thd_hoc .4 premise texts | .4 now only rolls with a pupil ≥ vlAge; the j67 kid arc is untouched |

## Tests (own server, this build; one bot at a time — two parallel bots were OOM-killed once, the container restarted)
| test | result |
|---|---|
| road-full thd_hoc (2 lives, first + random) | **17/17**: `4:thd_hoc 5:thd_hoc_5 … 11:thd_hoc_11 12:noi14 13:hau14 14:ke14`, finale told («Người thầy được tôn kính») |
| road-rare thd_hoc + the other 7 B3 roads | **ALL PASS** (thd_hoc: path at thd_hoc_5, .11 tally, ✦ rare fired, recast told) |
| road-option-scan (all jrd_*) | 0 free gain / text-only / dominance / bold≤safe / inverted / VANPHONG / digits; (D) thd+cnv 0 (59 = the B1 roads, unchanged, coordinator's call) |
| road-end (6 cases + old f14 plan) | **27/27** |
| road-saves @755x1000 (main save, phase-1, mid-road tt / thd_hoc / cnv) | **6/6**, old saves load |
| coop-e2e (live Worker) | **59/59** |
| cnv_chu «closed at ch9 with no finale» | not reproduced: 3 lives alone 24/24 (ch1–14, road .4–.11, finale told each life). One earlier run with 2 bots in parallel: life 2 stalled at ch12 len14 (maid rise milestone, jst14, not B3) for the bot's 400-month cap with the finale already told, then the page crashed on memory — not seen in the solo run; note for the jst14 owner if it shows again |
Test change: road-full / road-rare retry in a FRESH context (a fresh world) when the road's premise ok() is false — the world and its children carry over between lives in one storage, so a same-page retry can never roll it.

## Notes
- A world whose children are all < vlAge (or only the Hoàng hậu's) cannot roll thd_hoc that life (by design); over later lives in the same world the children grow and the school-age wording takes over.
- No UI change (texts only, j67 kit cards); no new kit part.

## NEW GATE one-core-guard (Foreman B s8 23:24Z) — NOT done, handed over (worker rolled over: context at the ceiling)
- The guard is not on origin/main yet (main 08725411); it is on review/one-core-land-r1 and needs that branch's jbal (ONE CORE block).
- Measured: one-core-land-r1 dev/build + this branch's jroad/jrd_thd/jrd_cnv/jend14 added to assemble.py → `fails: 229`,
  inlineNow 9681 vs baseline 6691 = **~2990 inline rule numbers** in the 4 road files (option c/w/l stat costs and gains [fx], odds and
  stat comparisons [cmp]); e.g. jrd_thd suc:-2 ×128, danh:-2 ×124, duc:3 ×70. One fail line per (file, pattern).
- Successor: wait for road-onecore's BAL key pattern (dev/handover/reports/road-onecore.md, worker session_01N1tNP2CnQZTs1376PcZZun),
  merge latest origin/main (once the guard is there) into review/road-b3-fix2 @ 83641f2a, move every number into BAL.road.* with values
  unchanged, regenerate jrd_thd/jrd_cnv from rdfrag (rdfrag/cat.sh — edit the rdfrag sources, not the generated files), run
  `node dev/test/one-core-guard.js` → 0 fails (no --allow-grow), then re-run road-full thd_hoc, road-rare (8 B3 roads), road-option-scan,
  road-end, road-saves, coop-e2e — ONE bot at a time (2 parallel bots OOM-killed the container once).
- Everything above (item 1 fix + family + tests) stands at 83641f2a.

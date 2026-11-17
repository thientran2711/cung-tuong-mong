# PROGRESS — review/emperor-visit (orphan #19 / D8, VISIT half only; owner OD:L603)

Worker session_01DgYSWnVJ8zy6Hr7QeM3HD1 (Foreman D). START_CTX ~3 %. The poison-road half (OD:L602) was dropped from this task by Foreman D s4 (parked with the coordinator).

## Base
review/mortality-r1 @2d3428f8 + origin/main merged (745f25eb): conflicts index.html / sw.js (generated, rebuilt) and assemble.py (main's list + jmort.js after jbal2.js).

## PRIORITY RULE #1 (what existed)
- j7 event `empnight` ("Đêm khuya … Hoàng thượng đứng ngoài rèm cửa cung ngươi", Thắp đèn hầu rượu / Phô tài / Khuyên ngài giữ long thể): in the generic event
  pool (Sủng ≥ 20, max once per 12 months, same weight at any favour); its night went through the Kính sự phòng prep (bath, quilt, carried to Dưỡng Hòa điện);
  a normal night only. EXTENDED here, no second event.
- j24 short visit "Hoàng thượng ghé cung ngươi uống chén trà" (Có người đến pool): hard-coded 60 / 50 / +2 / +2 and the odds word "Chắc chắn" (VANPHONG ban).
- j8 nightFx (every road into a night): hard-coded 3 / 2 / ghen 8 / bestow 10 + 4·s.
- j75 one night per day (ntTake / ntReason / lockFirst on "Thắp đèn hầu rượu"); jtrong Thái hậu archetypes (TH_ARCH.neg) and trọng (trongMul); jmort host().

## Done
- BAL.visit + BAL.night (jbal2.js) — every number of the visit, the tea visit and the night.
- dev/build/jvisit.js (after jhouse in assemble.py): daily visit roll after flip (rare, rises with Sủng and Ân tình, his nature), gap, gates; empnight out of the
  generic pool; the card keeps its words + names the consort whose tablet he left; Thắp đèn → visit night (own opening, then the normal night cards) →
  extras after nightFx (Sủng, Danh, all consorts ghen, the left consort ghen + quý ngươi −, Hoàng hậu −, Thái hậu displeased by chance × archetype × trọng)
  → "Sáng hôm sau" card with the button "Đã hiểu" (OD:L1261). Khuyên ngài giữ long thể: Đức + Thái hậu +, Sủng −.
- Co-op: host-only roll for both seats, S.emp.visit (world key emp) tells the guest; visited seat plays the card, other seat reads a news line.
- Family: j8 nightFx and j24 tea visit read BAL (tea wording fixed: no "Chắc chắn").
- Test + bot: dev/test/emperor-visit.js (flow, safe road, gates, frequency bot per Sủng level; BEFORE=1 = old rule).

## Next / open
See dev/handover/reports/emperor-visit.md (handover branch).

## Review r1 (reviewer session_01DgYSWoamKdMf5ewt8WHax6, branch review/emperor-visit-r1)
- Merged origin/main b85cdb1e (mortality-r1 is already on main, so no ship-order dependency left). Conflicts: jbal2 (BAL.visit/night + BAL.psk kept), assemble (main's list + jvisit.js), generated files rebuilt.
- FAMILY FIX "shown ≠ applied" (night gains): new j8 nightGain(s) (BAL.night) is the one formula for nightFx (her), j75 rivalNight (NPCs; was typed 3/2), j8 nx() (night talk line; was a typed "Sủng +5, Ân tình +5 / +3, +2") and j79 stealX (Tranh sủng / Chặn ngự giá floor; was typed 3/2 and chance 22 → BAL.night.bestow + bestowS × stealS). Test 1b checks every mood × q × talk: shown == nightFx applied.
- Morning card removed: on main the night's closing card (jne kitNightEnd, KIT §62, own kit button) already shows the visit night's real Được / Mất / Kèm rows (extras are applied inside nightFx); the separate "Sáng hôm sau" modal was drawn UNDER that scene and closed by ✕. Now the night card carries the visit caption (jne hook window.kneLineHook).
- Bug found by dev/test/cycle.js: jvisit replaced the "Thắp đèn hầu rượu" lock and dropped jcycle's monthly-days lock (empnight not locked). Fixed: earlier lk kept; the daily roll also skips her while her tray is put away.

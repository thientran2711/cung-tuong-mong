# PALACE AUDIT + DISTANCE EFFECT — worker report (Foreman D; session_01D3E3NYCMYjjACU3pnjjM84)
PRIORITY #1 CHECK ('palace distance thị tẩm ban cung near'): OD 24/11 ~08:15Z + ~08:45Z (handover OD L2333, L2343) | ledger 0 | main origin/main 68799300: j27.js:4 PLNAME, j26.js MAPH, jpal.js:14 PAL_WEST, jbancung.js bcNear/bcDistOf, j8.js:60 nightCh, jvisit.js visCh/visGo, jplx.js places | review/* review/ban-cung(-rv) (landed), review/emperor-visit(-r1) (landed = jvisit) | claims D (this seat). No distance effect existed on main (git grep 'bcNear' = jbancung only); reused bcDistOf + residenceOf (jres), no new measure.
Ruling followed (OD 24/11 ~08:45Z): KEEP the game names (no renames). Map positions = proposals only (law 16).

## JOB 1 — every Dư đồ place vs Ming/Qing
Distance d = plan distance (MAPH anchors) to Dưỡng Hòa điện (0.502, 0.442). "far" = jpdist pdFar 0..1 over the consort palaces (= 1 − jbancung bcNear).
Real positions: Forbidden City inner court (research doc dev/research/palace-residence.md [S1–S8]); axis = Càn Thanh → Giao Thái → Khôn Ninh → Ngự hoa viên north.

| game place (key) | game name | real counterpart | real position | game map (x,y; d; far) | match? |
|---|---|---|---|---|---|
| dtd | Dưỡng Hòa điện (tẩm điện) | Càn Thanh cung (Ming / early Qing) / Dưỡng Tâm điện (from Yongzheng) | axis (Càn Thanh) / just W of axis, S of the Tây lục cung (Dưỡng Tâm) | .502,.442 — axis, centre | YES (axis = Càn Thanh model) |
| kn | Càn Ninh cung (Hoàng hậu) | Khôn Ninh cung | axis, directly N of the Emperor's palace | .50,.258; d .184; far .29 | YES |
| vuon | Ngự hoa viên | Ngự hoa viên (Yuhuayuan) | axis, far N end of the inner court | .50,.15; d .292 | YES |
| thu | Cần Chính điện (phê tấu) | Càn Thanh as audience hall / Dưỡng Tâm front hall / Ming Văn Hoa | axis, S of the sleeping hall | .502,.664 — axis S | YES (roughly) |
| tn | Đức Thọ cung (Thái hậu) | Từ Ninh / Thọ Khang cung | WEST, outside the Six Palaces, apart | .193,.333 — far west; d .328 | YES |
| lc | Trường Môn viện (lãnh cung) | no fixed hall; popularly a remote closed hall (Diên Hy, far SE; Bắc ngũ sở N) | remote corner | .714,.148 — far NE corner; d .362 | YES (remote corner) |
| home | Ngọc Thanh các (dưới Tần) | low consorts in side halls / the Bắc ngũ sở-type quarters | behind/beside the Six Palaces | .323,.502 — west; d .189; far .31 | ROUGH (fine) |
| ksp | Kính sự phòng | Kính sự phòng (eunuch office) | outer, near the Emperor's quarters (Dưỡng Tâm/Càn Thanh side) | .662,.887 — far SE; d .473 | ROUGH (an office; position does not affect play) |
| tyv | Thái y viện | Thái y viện — OUTSIDE the palace walls (Ming/Qing: east of Đông An môn area) | outside, SE | .733,.683 — SE | YES (roughly, outer SE) |
| nvp | Nội vụ phủ | Nội vụ phủ (Qing household dept.) | W, inside Tây Hoa môn | .15,.60 — west | YES |
| cnh | Tích Cần viện (cung nhân) | servants' quarters (wei-fang, outer rows) | outer W/N rows | .14,.69 — far west | YES (roughly) |
| tgk | Tân Giả khố | Tân Giả khố (Xinzheku, punishment laundry) | outer W | .16,.50 — west | YES |
| ttp | Thượng thư phòng | Thượng thư phòng (Shangshufang) | by Càn Thanh (S, E side) | .86,.67 — far E | ROUGH (far from axis; non-consort, no effect) |
| acs | A ca sở | A ca sở (Nam tam sở / Càn Đông ngũ sở) | E of the Đông lục cung | .79,.16 — NE | YES |
| dc | Đông cung | Đông cung / Dục Khánh cung (crown prince) | EAST (Dục Khánh cung, E outer) | .83,.47 — E | YES |
| nth | Ngự thiện phòng | Ngự thiện phòng (S of Dưỡng Tâm / outer E kitchens) | outer | .758,.49 — E | ROUGH |
| pd | Phật đường | Anh Hoa điện / Trung Chính điện (Buddhist halls, WEST) | WEST | .80,.29 — EAST | OFF (side), minor; proposal P4 |
| pal5 | Diên Huy cung (standing 2) | Diên Hy cung (Yanxi) | Đông lục cung, far SE corner, "cold" | .608,.491; d .117; far 0.00 (NEAREST) | OFF: history's remote corner is the nearest palace here (name echo only; standing 2 by plan nearness) |
| pal4 | Thừa Minh cung (2) | Thừa Càn cung (Chengqian) | Đông lục cung, inner row | .606,.359; d .133; far .07 | YES |
| pal6 | Vĩnh Hòa cung (1) | Vĩnh Hòa cung (Yonghe) | Đông lục cung, inner/E row | .606,.241; d .226; far .46 | YES |
| pal7 | Trường Xuân cung (2) | Trường Xuân cung (Changchun) | TÂY lục cung (west) | .606,.13 — EAST, far N; d .329; far .90 | OFF (side) |
| pal2 | Chung Tú cung (1) | Chung Túy cung (Zhongcui) | Đông lục cung | .675,.241; far .63 | YES |
| pal0 | Cảnh Phúc cung (1) | Cảnh Nhân / Cảnh Dương cung | Đông lục cung | .683,.491; far .30 | YES |
| pal1 | Khải Tường cung (1) | Khải Tường cung = Thái Cực điện (renamed 1859) | TÂY lục cung | .678,.359 — EAST; far .33 | OFF (side) |
| pal3 | Hàm An cung (0) | Hàm Phúc cung (Xianfu) | TÂY lục cung, NW | .666,.13 — EAST far NE by lãnh cung; far 1.00 | OFF (side); "remote" role OK |
| pal8 | Vĩnh Thọ cung (3) | Vĩnh Thọ cung (Yongshou) | TÂY lục cung, the palace NEAREST Dưỡng Tâm — favourites | .332,.262 — west by Càn Ninh; d .248; far .55 | OFF (distance): top standing but mid-far on the plan |
| pal9 | Dực Khôn cung (3) | Dực Khôn cung (Yikun) | TÂY lục cung, near Dưỡng Tâm — favourites | .397,.262; d .208; far .39 | OFF (distance), smaller |
| Dưỡng Tú viện (planned, OD 24/11 ~08:20Z–09:05Z) | — not on the map yet | Ming: candidates lodged inside the palace before choice; Qing: viewed at Thần Vũ môn / Ngự hoa viên, kept in outer quarters | N / outer | not built | when built: put it outer N/NW (beside Ngự hoa viên or by Tích Cần viện), never inside the Six Palaces |

Summary: axis (Emperor, Empress, garden, study), Dowager west and apart, lãnh cung remote, servants/offices outer — all match. The consort palaces are 8 east + 2 west (history 6 + 6), so four "west" names sit east (Trường Xuân, Khải Tường, Hàm An, and the 2 real west ones are not the nearest).
### Small map-move PROPOSALS (law 16 — nothing moved; for MAIN 117 → sếp)
- P1 (clearly off) — DONE in r2 (see R2): Vĩnh Thọ + Dực Khôn (standing 3, "nearest the Emperor" in history and in bcWhy's words «Cung bậc nhất lục cung») are mid/far on the plan, while Diên Huy (standing 2) is the nearest. Proposal: move PAL_WEST anchors from y .262 down to y ≈ .40 (x .40/.44 → beside Dưỡng Hòa điện, west side), making them the two nearest (far ≈ 0–.1). Effect: the top palaces get the most visits (matches history), Diên Huy becomes mid.
- P2 (optional): Trường Xuân / Khải Tường / Hàm An are west palaces in history; moving them west needs 3 new west slots + Dư đồ art (Foreman C) — bigger than "small"; recommend NOT now.
- P3: no move for Diên Huy: its far-SE "cold" history is already played by Hàm An (far 1.00, standing 0).
- P4 (tiny): Phật đường is east; the real Buddhist halls are west (Anh Hoa điện). Non-consort, no effect on play; leave unless the map is redrawn.

### How «gần Hoàng thượng» appears to her in Ban cung (built, see JOB 2)
Every card now ends with «ngự giá: <ladder word> (<why>)» — the word = odds of at least one visit in BAL.palDist.showWk (12) tuần at THAT palace from the real visCh (law 7, no %):
- far palace: «Nhận Hàm An cung · tạ ơn, dọn sang · ngự giá: Khó lường (cung xa ngự tẩm, ngài ít lui tới; mỗi lần ngự giá thêm Sủng +4, Danh +3)»
- middle: «Xin Cảnh Phúc cung · Tùy duyên · thành: … · hỏng: … · ngự giá: Tùy duyên (cung không xa không gần ngự tẩm)»
- near (far ≤ .25): «… · ngự giá: Có cơ (cung gần ngự tẩm, ngài năng lui tới, thẻ bài dễ lật)»
(Words above at Sủng 60; at low Sủng every palace reads «Mong manh», the truth.)

## JOB 2 — distance effect (BUILD)
Branch review/palace-distance from origin/main 68799300. Final sha: see SSK line below.
- NEW dev/build/jpdist.js (after jvisit in assemble.py): BAL.palDist {night .3, visit .5, nightSung 2, farMin .6, nearMax .25, visSung 4, visDanh 3, showWk 12} (law 4).
  pdFar(p) = where p lives (jres residenceOf: chủ vị / side hall → her palace; Hoàng hậu → Càn Ninh; below Tần → Ngọc Thanh các; servant / lãnh cung → 0), measured exactly like jbancung bcNear (same MAPH anchors, same spread; pdFarIx(i) = 1 − bcNear(i)).
  1. tablet: nightCh × (1 − .3 far) (covers flip, empPick, jledger — all read nightCh);
  2. visit: window.visCh × (1 − .5 far) (jvisit daily roll + jagacts2 emp:visit; jvisit.js 1 line: visRoll reads window.visCh);
  3. night Sủng: nightGain + round(2 far) for whoever's night it is (her; the NPC inside rivalNight);
  4. a visit to a far palace (far ≥ .6: Chung Tú, Trường Xuân, Hàm An): extra Sủng + round(4 far), Danh + round(3 far) + log/news «Hậu cung truyền nhau: <ai> ở tận <cung>, dù ở xa vẫn được ngự giá; ai cũng biết ân sủng ấy không nhỏ.» (her: printed as real before → after; NPC: same line + newsAdd).
  Law 1: same functions for her, the co-op friend (her own seat) and NPC consorts. Laws 2/3: near = more nights/visits, far = more per night/visit (tablet EV near 22×4 = 88 vs far 15–22×6 ≈ 90–126 over runs, within 25 %); near is not strictly better.
- jbancung.js: every card's text ends «· ngự giá: <word> (<why>)»; the card FACE (kit hint channel o.hint, jk2b kitHint — the same API jvisit uses; no new kit part) = the kit's own hint + «ngự giá <word>: cung xa, ngài ít đến, song mỗi lần đến là ân sủng lớn» / «… cung gần, ngài năng đến» / «… cung không xa không gần». Word = word(pdVisOdds) (shown = applied).
- Tests touched: rules-one-source.js (night floor = BAL.night.sung + pdNightAdd, was typed 9), emperor-visit.js (forced flow pins BAL.palDist.visit = 0, else a far home makes the forced 100 % visit miss), coop-ban-cung.js (+3 two-seat distance checks).
## GATES
- dev/test/palace-distance.js PASS 26/26 (×6 runs): measure = bcNear for all 10 palaces; her/NPC tablet near > far (ratio 0.7); her/NPC visit near > far (ratio 0.5); her night Sủng +2 far; NPC night inside rivalNight gets HER own add; far visit Danh +bonus + line, near none (her + NPC + her news); Ban cung card words = word(pdVisOdds), no %; one core (BAL 0 → no effect); tablet EV within 25 %; pure (50 calls).
- one-core ×3: one-core-guard PASS (inline 3547 ≤ baseline 3592), one-core-text PASS, one-core-bind PASS (1343 prints, 0 mismatches).
- quickcheck PASS on dea7ce8a (core gates PASS incl. rules-one-source, old save from LIVE loads + plays a buổi, perf new/live render 284/331 ms); re-run on final sha → see SSK line.
- coop-e2e 142/142; coop-ban-cung 26/26 incl. «palace distance: same far table / host person / guest person same on both seats».
- ban-cung.js 33/33. emperor-visit.js: FAILs «forced visit did not pick her» on THIS branch AND on origin/main 68799300 (main also fails «nx shown≠applied»): pre-existing, not from this branch (logs /home/user/wt/pdist-x/ev*.log).
- Old save: quickcheck old-save step (LIVE build save → this build) ok; no new save field.
- Shots Fold 755x1000 + iPad 1180x820 (dev/test/palace-distance-shots.js): CDN img/_review/palace-distance/ (6 jpg): pd-bancung (card face «ngự giá Mong manh/Hiểm: cung xa … song mỗi lần đến là ân sủng lớn»), pd-bancung-end, pd-log (both lines «… dù ở xa vẫn được ngự giá …», NPC at Trường Xuân + her at Hàm An «Sủng 69 → 73 · Danh 33 → 36»). 0 page errors, no overflow. Looked at all.
- FINAL: quickcheck PASS on 9e655c3e (core gates PASS · old save ok · perf render 248/237 ms, tab 504/561, buổi 2847/1939, tasks>200ms 26/28); coop-ban-cung re-run 26/26 on 9e655c3e.

SSK review/palace-distance 9e655c3ed013a179ec66e392e9a77e24a425d0b4 (TIER BIG; base origin/main 68799300; diff = jpdist.js new, jbancung.js (card text + hint), jvisit.js 1 line, assemble.py 1 entry, tests: palace-distance.js + palace-distance-shots.js new, rules-one-source.js / emperor-visit.js / coop-ban-cung.js adjusted; rebuilt index.html + sw.js).
REVIEWER NOTES: (1) BAL numbers are ours (tablet .3, visit .5, +2 night, far bonus 4/3) — tune if the robot says so. (2) P1 map move (Vĩnh Thọ / Dực Khôn nearer the hall) NOT done (law 16) — awaiting sếp via MAIN 117. (3) emperor-visit.js fails on main too (pre-existing).
Worker on call for the reviewer. Worktrees: /home/user/wt/pdist (kept for review fixes), /home/user/wt/pd-main (to delete).

## R2 — P1 DONE (Foreman D order 24/11 ~07:00Z: «P1 IS ALREADY RULED … DO IT now»)
SẴN SÀNG KIỂM r2 review/palace-distance ed777943b4575794e6c32b50efc74e4f564cf47a (on 9e655c3e; base main 68799300).
- jpal.js PAL_PLAN: the Dư đồ art's Tây lục cung courtyards (2 columns × 3 rows west of the axis) now hold the palaces that were WEST in history. Inner column (nearest Dưỡng Hòa điện): Vĩnh Thọ (south, far .01) and Dực Khôn (middle, .04); the north courtyard is empty (Trữ Tú, dropped 18/11). Outer column: Khải Tường (= Thái Cực, south, .41), Trường Xuân (middle, .44), Hàm An (= Hàm Phúc, north, .88). Count correction: 3 west names were east, not 4 (Trường Xuân, Khải Tường, Hàm An); the 3 east courtyards they left keep their painted buildings with no label.
  Names keep their slot INDEX, so every save's S.pal / v.pal is unchanged; only plan coordinates move. Travel cost (mapPos grid) does not read slot coordinates. Farthest palace is now Chung Tú (1.00); nearest is Diên Huy (0), then Vĩnh Thọ / Dực Khôn.
- palace-distance.js 27/27: nearest/farthest are now computed, not fixed names. New checks: Vĩnh Thọ / Dực Khôn far ≤ .1; all 5 Tây lục cung names sit west of the axis.
- ROBOT visits table (dev/measure/palace-distance-bot.js, 4000 tuần per palace, real nightCh / visCh rolls, Sủng 60, rank Phi, her vs NPC at the same palace):
    palace | far | HER nights/100t · visits/100t · Sủng(nights) · Sủng(visits) · Danh(visits) | NPC same
    Diên Huy cung | 0 | 16.3 · 5.7 · 65 · 39.9 · 17.1 | 23.8 · 5.35 · 95.3 · 37.4 · 16
    Vĩnh Thọ cung | 0.01 | 17.9 · 5.25 · 71.6 · 36.8 · 15.8 | 23.3 · 5.33 · 93.3 · 37.3 · 16
    Dực Khôn cung | 0.04 | 15.8 · 4.22 · 63.2 · 29.6 · 12.7 | 23.7 · 5.55 · 94.7 · 38.9 · 16.6
    Thừa Minh cung | 0.11 | 17.8 · 4.4 · 71.1 · 30.8 · 13.2 | 23.1 · 5.17 · 92.2 · 36.2 · 15.5
    Khải Tường cung | 0.41 | 16.1 · 4.28 · 80.6 · 34.2 · 12.8 | 22.1 · 4.03 · 110.5 · 32.2 · 12.1
    Trường Xuân cung | 0.44 | 14.8 · 3.77 · 74.1 · 30.2 · 11.3 | 20.2 · 4.05 · 100.9 · 32.4 · 12.1
    Cảnh Phúc cung | 0.48 | 13.9 · 4.1 · 69.6 · 32.8 · 12.3 | 20.2 · 4.22 · 100.9 · 33.8 · 12.7
    Vĩnh Hòa cung | 0.74 | 13.9 · 3.33 · 69.8 · 36.6 · 16.6 | 19.4 · 3.13 · 97 · 34.4 · 15.6
    Hàm An cung | 0.88 | 13.8 · 2.3 · 82.9 · 29.9 · 13.8 | 17.4 · 2.88 · 104.6 · 37.4 · 17.3
    Chung Tú cung | 1 | 12.5 · 2.73 · 74.8 · 35.4 · 16.4 | 18.1 · 2.23 · 108.9 · 28.9 · 13.4
  Read: near palaces get more nights (her 16–18 vs 12.5 per 100 tuần at Chung Tú) and more visits (5.7 vs 2.7). Far palaces gain more per night and visit, so total Sủng stays even (her Diên Huy 65+40 = 105 vs Chung Tú 75+35 = 110). Near also means more chances of a child and more Ân tình, so neither side is strictly better (laws 2/3). Same rule for her and the NPC (law 1): both drop by the same ratio near → far (her nights 16.3 → 12.5, NPC 23.8 → 18.1). The NPC's level is higher only because her Sắc / arts are higher in this run (the bot equalises Sủng and rank only).
- GATES r2 (ed777943): quickcheck PASS (core gates PASS, old save ok, perf render 252/283 ms); one-core ×3 PASS; ban-cung 33/33; coop-e2e 142/142; coop-ban-cung 26/26 (an earlier run was 22/26 because the host had not merged the friend yet (A.fr null), the same flake the ban-cung half shows; re-run 26/26).
- Shots (CDN img/_review/palace-distance/, 8 jpg): pd-map-fold + pd-map-ipad (Dư đồ with the west column), pd-bancung (Fold/iPad), pd-log (Fold/iPad). Looked at all.

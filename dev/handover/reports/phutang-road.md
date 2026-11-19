# phutang-road — Phù Tang princess: NEW road family (E21, lead, opus, under FOREMAN E)
PRIORITY #1 CHECK ('Phù Tang|pt_hai|pt_tang|pt_su|pt_dang|NCL.pf|KC2LAND.pf'): OD 3 (19/11 ~06:40Z / ~06:42Z / ~06:50Z) + FIGURE_GATE «OWNER LƯỢT 283» | main: none for pt_/pf (j71.js:238 court event only) | review/*: review/bd-roads (shape: jrd_bd.js / jrd_bd2.js / jbalbd.js / bd-scan.py / bd-roads-bal.js, NCL.bt country switch), review/caoly-road (E20, renames KC2LAND.nc / NCL.nc) | claims: E20 caoly-road, E14c bd-roads r2 | REUSED: reports/foreign-princess-3-history.md §B/§C.3 (E19), the bd people/object-book pattern (bdP/bdMan/bdO), arcFx / rdDef / rdRare / RD97L / R97L.
★ THE 18 LAWS read first (all 18). Applies 1, 2, 3, 4, 5, 6abc, 7, 8, 11, 13, 14, 18.
Branch: review/phutang-road, BASE = origin/review/bd-roads @63abfabc (not main: the 3-country frame NCL.bt + per-life country switch lives there; bd-roads is not on main yet). PLAN commit d85faf79 (dev/story/ROAD_MAP.md §4.5c + §5.4 rows). START_CTX ≈ 3 %.

## §PLAN
### (a) How Phù Tang joins hòa thân (3rd country branch, no 10th origin)
- `ORIGIN_BR.pf={par:"nc",k:"pf",land:"Phù Tang",n:"Công chúa Phù Tang hòa thân",r:BAL.orig.pf.r,o:BAL.orig.pf.o,th:BAL.orig.pf.th,…}`; roll share `BAL.orig.br.nc.pf` (set in jbalpt.js, so jbal.js line 142 is not touched → no clash with E20/E14c). originBrPick already handles a 3rd key.
- `STORY.pf`, `QUEST67.pf` (3 grades from BAL.orig.quest), family letter rows `fam_pf` (j72 shape, rf `S.origin.k==="pf"`), joi land word (bride kind already covers nc branches: add "pf").
- Home phase .1–.3: `KC2LAND.pf` (land, dad «Phụ hoàng» / ruler «Thiên hoàng» inside Phù Tang scenes, mom, court, sub, fest, places P → KCPL keys `np_*`); jkc2.js: `kc2Br()` returns "pf", and each `kc2Br()==="bd"?…:…` ternary becomes a per-branch field (KC2LAND[br].x) so pf gets its own words (smallest edit; FYI Foreman B). Because jkc2 loads after jrd_*, the pf home data lives in a new `jkc2_pf.js` right after jkc2.js.
- Land tokens: `NCL.pf` row + TOK67 wrap chained over the bd one (`S.origin.k==="pf"?NCL.pf[k]:prev()`).
- Roads dealt: ARC67.pt_* carry `o:"pf"`, so `arcIds67("pf")` returns exactly the 4 pt roads (no filter needed, no legacy).
- Entry: jentry needs no change (branch is rolled inside nc); jgecat label row "pf" added for the later GE wave.
- Starting numbers (BAL.orig.pf, ONE CORE): between nc and bd (Phù Tang writes as an equal → Thái hậu cool, not hostile): rank like bd, th between.
### (b) People (law 6b) — real living NPCs
- One book `PTP` in jrd_pt.js, state in `S.st.f14.fb` keys `pt.p.<id>.*` (where: hb trên biển / tn Phù Tang / cang Minh Châu / kinh / nguc; alive; met). Rows in ROAD_MAP §5.4 (11 rows added).
- Men in the capital stand in `S.men` on the jmen schedule (`ptMan`, the bdMan pattern: envoy role, haunt thu; monk haunt vuon; away when at sea / home / jailed / dead).
- People: Tá Bá Kim Thành (envoy chief), Cát Thành Trọng Lữ (scholar), Tiểu Ngọc (her maid, 4th ship), Thân Lão (kiêng-keeper), Nham Lão (helmsman), Kim Hựu Thành (Tân La merchant), Ô Cửu (pirate chief), Tịnh Viên + Pháp sư Trí Viễn (writer 2), unnamed Hồng Lư tự khanh / Minh Châu thứ sử / Thị bạc sứ. Names [D] = invented in Hán-Việt shape (no real historic person used for an invented deed — law 8/E19 §F.5).
- Rule from bd r1 fix 2: after any ptMove/ptKill every later line naming that person reads ptP/ptAlive — measured by `dev/measure/pt-scan.py` (6b 0 unguarded).
### (c) Objects (law 6c) — one object book `PTO` (fb "pt.o.<thing>" = holder), used by BOTH files (one helper)
- quốc thư, hồi thư, rương cống + niêm phong, gương đồng của mẫu hậu, thanh đao Phù Tang, hộp kinh, xá lợi, nhật ký hải trình, danh sách sứ đoàn, hải đồ, giấy thông hành Thị bạc, sổ Tân La, ngọc trai chuộc người, hạt giống trà. Set on every give / buy / receive / lose / burn / hide; later beats read it (pt-scan 6c 0 unbooked).
### (d) Files and order
- `dev/build/jbalpt.js` after jbalbd.js (lead block + writer-2 block); `dev/build/jrd_pt.js` (lead: NCL.pf/TOK67, PTP/ptMan/PTO, PT97, pt_hai, pt_su) and `dev/build/jrd_pt2.js` (writer 2: pt_tang, pt_dang) after jrd_bd2.js; `dev/build/jkc2_pf.js` after jkc2.js; j97: `if(typeof PT97!=="undefined")R97L.push(...PT97)` beside the BD97 line.
- Tests: kc-roads (direct + coop-together) and npc-roads extended to pt; road guards; vp; build_site; quickcheck; `dev/measure/pt-roads-bal.js` (bd-roads-bal shape WITH the r1 fix: climax e: options measured + dominance check) bot ≥20 lives per road; pt-scan.py; one-core-guard.
### (e) Numbers (law 4, 5, 2/3)
- `BAL.arc.fx.pt_*`, `BAL.arc.rare.pt_*`, `BAL.road.fx.pt_<road>_<n>`, `BAL.road.rare.pt_<road>_11`, `BAL.road.pt` (rk, man ages/traits, conf, def, deadlines). Shapes ptR (risky, odds on one stat, −rk per rank) / ptS (sure: cost + smaller gain) / ptX (climax). Climax rule from bd r1 fix 1: the safe win/mid option gets the LOWER base, so no option is better on odds AND cost AND fail at once (dominance 0). Odds shown as VANPHONG ladder words only (engine). Text prints constants, never typed numbers.
### (f) Split
- E21 (me): scaffold (jkc2_pf, jbalpt, jrd_pt helpers + empty jrd_pt2, assemble, j97/j72/jkc2/joi/jgecat wiring), pt_hai + pt_su, tests + measure harness.
- Writer 2 (opus): pt_tang + pt_dang in `jrd_pt2.js` + writer-2 block of jbalpt.js, to ROAD_MAP §4.5c, using PTP/PTO/ptMan/NCL.pf; base = review/phutang-road after my «SCAFFOLD phutang-road <sha>» message; pushes to `review/phutang-road-w2`; I merge.
- Era rulings (Foreman E): no Wokou word; Tang-style jacket + pleated skirt (no thập nhị đơn); outbound princesses = parking lot; every [D] rendering checked for cổ trang tone.

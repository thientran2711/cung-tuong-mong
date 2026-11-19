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

## §WRITER 2 (E21b, opus) — pt_tang + pt_dang
PRIORITY #1 CHECK ('Phù Tang|pt_hai|pt_tang|Cao Ly' + 'pt_tang|pt_dang|Tịnh Viên|Trí Viễn|Ô Cửu'): OD 3 | ledger 0 | main 1 (j71.js:238 court event, unrelated) | review/*: only review/phutang-road (E21 scaffold 75e7e2fa) — no pt_tang/pt_dang text anywhere | REUSED: E21's PTP/ptP/ptMove/ptKill/ptMeet/ptMan (people), ptO (one object book), PT97 / RD97L, shapes ptR/ptS/ptX/ptE/ptG; bd_san as the shape; bd-roads-bal.js as the measure (E21's pt harness not pushed yet).
Branch review/phutang-road-w2 (base review/phutang-road @75e7e2fa). Files touched: ONLY dev/build/jrd_pt2.js and the writer-2 block of dev/build/jbalpt.js (+ one helper `pt2E` = ptE with a win2 ending, in my block). No shared helper changed. No UI.

### Per-chapter table (16 chapters, 100 beats, 312 options; every chapter: s1 after a won / s2 after a mid-or-lost chapter, c beat incl. a {v} beat, t1, climax x1)
| id | title | beats | opts | people (law 6b) / objects (law 6c) | ác-leaning options (GE) |
|---|---|---|---|---|---|
| pt_tang (.4) | Lời thỉnh bên kia bể | 6 | 18 | Tịnh Viên met; Trí Viễn met at t1 / hopkinh→tinhvien, dodiep | «Cười: cung {v} cũng có đạo sĩ ra vào đấy thôi» |
| pt_tang_5 | Một khoang thuyền | 7 | 21 | / hatgiong (ta / tinhvien / tn), hopkinh→kho | «Bỏ bạc nhờ quan coi kho làm sổ cho nhanh» |
| pt_tang_6 | Chuyến vượt biển bị chặn | 6 | 18 | cast: both monks → cang; endings → kinh, lose: Tịnh Viên → nguc / thuthay | «Cho người khơi chuyện nhà {v} từng buôn lụa lậu», «Bắt nó khai» |
| pt_tang_7 | Mắt thầy | 6 | 18 | cast brings both back to kinh with a told line (bd r1 fix 2 pattern) / thuthay | «Cho tung lại lời: kẻ nói Phật phạt mới mang khẩu nghiệp» |
| pt_tang_8 | Phe Phật, phe Đạo | 6 | 19 | / hopdan (ta / quan / thaiy), dodiep (kho / ta / chay) | «Sai người tráo đan độc vào hộp quà Quán chủ dâng, rồi tố» (framing, can win: law 1/6a) |
| pt_tang_9 | Xá lợi | 6 | 19 | / xaloi: cast v (taken by {v}'s eunuch) → ta / vua / trivien / chua | «Gặp riêng {v}, đổi xá lợi lấy im lặng» |
| pt_tang_10 | Thanh đao dâng chùa | 6 | 18 | Trí Viễn beat guarded PTTVK / daotang (ta / kho / chua / vua) | «Đáp: không có đao nào» |
| pt_tang_11 | Thầy đi hay ở | 7 | 21 | win: Trí Viễn (+ Tịnh Viên if free, dodiep not burnt) → hb, xaloi/hopkinh go with him (PTSAIL); c2/c3 split on dodiep | «Đưa ra chuyện xá lợi bị tráo bởi người cung {v}» |
| pt_dang (.4) | Thuyền hồi môn | 6 | 18 | cast: Kim Hựu Thành cang → kinh / ruongbac→ocuu, hangdao→huuthanh, thugiac→huuthanh, giaythonghanh | «Hỏi lại: nhà {v} chở muối lậu qua sông thì gọi là gì?» |
| pt_dang_5 | Hàng đao và bạc | 6 | 20 | Kim beats guarded PTHT / hangdao (vua / kho / huuthanh), dao_bb, dao_ht, dao_v, dao_vua | «Nhờ Kim Hựu Thành chở lén hòm đao lên kinh» |
| pt_dang_6 | Thuyền giặc | 6 | 20 | Ô Cửu at sea (hb) / haido | «Cho thủy quân đánh úp ban đêm», «Tung tin thủy quân đã sẵn» |
| pt_dang_7 | Tiền chuộc | 6 | 19 | / ngoctrai (ta → ocuu); fake pearls flag | «Cho thợ làm ngọc giả trộn vào hộp», «Cho người bơi lén ra cắt dây» |
| pt_dang_8 | Thị bạc ty | 6 | 19 | / sothibac (tbs / ta / kho / vua), tramhuong | «Gặp riêng Thị bạc sứ, buộc y nghe lời ngươi từ nay» (leverage) |
| pt_dang_9 | Thanh đao chém sắt | 6 | 20 | / daochem (from hangdao's holder → vua / tn / thuyquan), thugiac as proof; c1 count reads every single sword given | «Hỏi lại: đao ở nhà {v} có giấy…» |
| pt_dang_10 | Bến cảng | 6 | 20 | cast: Ô Cửu hb → nguc (caught by the sea chart or surrenders), ruongbac ocuu → thusu; x1: pardon → cang / jail / ptKill | «Cho người dọa y: khai nhà {v} mua đồ cướp thì được sống» (ge3), «Đòi y một phần lời» |
| pt_dang_11 | Luật biển | 8 | 24 | c1/c2/c3 split on Ô Cửu cang / nguc / dead (PTOC); endings move Kim → cang | «Nhắc chuyện anh họ {v} từng làm Thị bạc sứ» |
Rares: PT97 «Ngọn đèn trước tượng» (pt_tang .4, Đức bar) · «Chén rượu gửi giặc» (pt_dang .4, Tâm cơ bar, ruongbac → ta); RD97L «Giới đàn bên kia bể» (pt_tang_11, Đức bar) · «Ngọn đèn ba nước» (pt_dang_11, Tâm cơ bar). All numbers BAL.arc.rare.pt_* / BAL.road.rare.pt_*_11.
GE raw names (for the later wave): ge1 pt_tang «Xin ngài dựng giới đàn ở chùa Pháp Vân» / pt_dang «Xin ngài giao phường Tân La cho Kim Hựu Thành»; ge2 «Ngồi đọc kinh cho thầy đến sáng» / «Xin tha Ô Cửu…»; ge3 «Sai người tráo đan độc…» / «Cho người dọa y…»; ge4 «Xin ngài cho thầy sang bể theo thuyền sứ» / «Xin ngài ban luật: bến mở…».
Holder words used in ptO beyond E21's list (FYI for pt-scan): binhbo, thusu (Minh Châu prefect's store), tbs (Thị bạc sứ), quan (Thái Thanh quán), thaiy (Thái y viện), thuyquan, v (rival {v}'s house). Object keys: hopkinh hatgiong dodiep thuthay hopdan xaloi daotang | ruongbac hangdao thugiac giaythonghanh ngoctrai sothibac tramhuong daochem haido dao_bb dao_ht dao_v dao_vua.

### Measure (dev/measure/bd-roads-bal.js, STATIC, real build, roads pt_tang,pt_dang)
| check | pt_tang | pt_dang |
|---|---|---|
| no-loss options (law 3) | 0 | 0 |
| value spread > 6 (law 2) | 0 (3 fixed: mat weight 4 → mat gains cut in .6 s1, .9 c2, .11 s2) | 0 |
| climax dominated, no flag + all flags (law 2, r2 check) | 0 | 0 |
| rolled options not harder at rank (law 5) | 0 | 0 |
| digits / % in text (law 7) | 0 | 0 |
| unknown tokens | none | none |
| page errors | 0 | 0 |
| one-core-guard | PASS (fails 0) | PASS |
Bot (bd-roads-bal.js copy with origin pf, scratch only, not in git): running 3 lives/road at the time of writing — result line added below when done. quickcheck: needs the build committed on the sha; left to E21's merge build (I commit only jrd_pt2.js + jbalpt.js to avoid index.html/sw.js merge conflicts).

### FOR C (pictures — draw nothing; list only)
- pt_tang: chùa Pháp Vân (sân, tháp, chánh điện with the offered sword), Pháp sư Trí Viễn (Đại Hy master monk, 51+, eyes clouded; serene), Tịnh Viên (Phù Tang monk, 36), the sutra case with bronze lock, bình lưu ly of the relics, bến Minh Châu with an envoy ship at monsoon; buổi luận đạo in điện Tập Hiền (Quán chủ Thái Thanh quán, Đạo robe).
- pt_dang: Kim Hựu Thành (Tân La merchant, 40, jade ring, Silla dress), Ô Cửu (sea-raider chief, 38, NOT ragged — a captain's coat; no Wokou look), three black-sail ships off the port, the six sword crates, the iron-cutting sword, Thị bạc ty office + ledger, the stone sea-law stele / three-nation lighthouse (rare).
- Era: Tang-style dress only (jacket + pleated skirt), no thập nhị đơn, no Wokou imagery.

### FOR E / E21
- Roll share BAL.orig.br.nc.pf untouched (E21 flips at merge).
- No shared helper changed; holder words above are new strings for ptO — pt-scan may need them in its holder list.

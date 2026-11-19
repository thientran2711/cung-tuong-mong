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
Bot (bd-roads-bal.js copy with origin pf, scratch only, not in git), 3 lives/road on a619703f: pt_tang 3/3 reached .11 (win 1, lose 2), pt_dang 3/3 reached .11 (win2 1, mid 2); errors 0, page errors 0. (≥20 lives/road = E21's pt-roads-bal at merge.)
pt-scan.py (E21) on 1d49cfc9: 6b unguarded 0; 6c NO BOOK 0 (54 give/buy/receive: 35 booked, 19 used up) after fixing 7 (sỏi + ngọc → ptO; ship space ×2, a secret, a draft, the novice servant → pt6c comments).
**W2 DONE review/phutang-road-w2 @1d49cfc9.** quickcheck: needs the build committed on the sha; left to E21's merge build (I commit only jrd_pt2.js + jbalpt.js to avoid index.html/sw.js merge conflicts).

### FOR C (pictures — draw nothing; list only)
- pt_tang: chùa Pháp Vân (sân, tháp, chánh điện with the offered sword), Pháp sư Trí Viễn (Đại Hy master monk, 51+, eyes clouded; serene), Tịnh Viên (Phù Tang monk, 36), the sutra case with bronze lock, bình lưu ly of the relics, bến Minh Châu with an envoy ship at monsoon; buổi luận đạo in điện Tập Hiền (Quán chủ Thái Thanh quán, Đạo robe).
- pt_dang: Kim Hựu Thành (Tân La merchant, 40, jade ring, Silla dress), Ô Cửu (sea-raider chief, 38, NOT ragged — a captain's coat; no Wokou look), three black-sail ships off the port, the six sword crates, the iron-cutting sword, Thị bạc ty office + ledger, the stone sea-law stele / three-nation lighthouse (rare).
- Era: Tang-style dress only (jacket + pleated skirt), no thập nhị đơn, no Wokou imagery.

### FOR E / E21
- Roll share BAL.orig.br.nc.pf untouched (E21 flips at merge).
- No shared helper changed; holder words above are new strings for ptO — pt-scan may need them in its holder list.
## §BUILT (E21 lead: scaffold + pt_hai + pt_su; writer 2 = pt_tang + pt_dang on review/phutang-road-w2)
Plan change vs §PLAN (d): no `jkc2_pf.js` — jrd_pt.js loads after j4/j67/j1 so ORIGIN_BR.pf / STORY.pf / QUEST67.pf live in jrd_pt.js; KC2LAND.pf sits in jkc2.js itself (its place loop runs at load), fam_pf in j72.js beside fam_bd.
### Wiring (files outside the pt files; each a small, listed edit)
| file | edit |
|---|---|
| jkc2.js | kc2Br() returns "pf"; KC2LAND.pf (land, dad, mom, court, fest «Lễ Thanh tẩy cuối hạ», places np_*, own place lines, own card words tx); place loop over Object.keys(KC2LAND) with `pre`/`line`; kc2Pre reads `pre`; family names (Thiên hoàng / Hoàng hậu / Hoàng huynh / Hoàng thúc / Hoàng muội); home cards (viết chữ, thanh tẩy ở đền Thần, bến Nan Ba), fest option, treaty, hồi 3 text, gifts; 5 literal «Nam Chiếu»/«phụ vương» lines the pf (and nc) life reaches now print `${L.land}` / `${L.dad}` (same output for nc — helps E20's Cao Ly rename); SCIMG np* = neutral palace pictures until C paints; n_send pf = ev-hoa-than; BAL.kcv.pf = BAL.kcv.nc |
| joi.js | OI_TXT.pf (intro panels a/d/h), OI_CAP.pf, «Lễ ra mắt» for pf, sứ thần Phù Tang, OI_SELT.pf |
| j72.js | fam_pf letter (phụ hoàng asks the next embassy's ship into Minh Châu), BAL.m72.pfOk |
| j97.js | PT97 → R97L (beside BD97) |
| jgecat.js | label «Công chúa hòa thân · Phù Tang» |
| assemble.py | jbalpt.js after jbalbd.js; jrd_pt.js, jrd_pt2.js after jrd_bd2.js |
### Per-chapter table — pt_hai · Vượt bể (people: Tá Bá Kim Thành, Tiểu Ngọc, Nham Lão, Thân Lão, Kim Hựu Thành, Ô Cửu)
| ch | title | x1 climax (win/lose · win2/mid · mid) | moves / objects | thiện / ác options |
|---|---|---|---|---|
| .4 | Thuyền thứ tư chưa tới | chờ gió mùa · hồi môn bù cống · viết thư đòi cống bù | ruong/nhatky → Nham Lão, danhsach → envoy; van; hoimon → kho; rare «Lửa hiệu trên Ngũ Đảo» (nt_dongchau) | stand by the envoy / mock {v} |
| .5 | Thư từ Phúc Châu | thủy sư đi ngay · thương thuyền Tân La · chờ gió | thu → vua/ta/hl | send water / keep the letter, bribe the Tự |
| .6 | Người giữ kiêng | luật Đại Hy · lễ thanh tẩy · để thủy thủ xử theo lệ (Thân Lão dies) | Thân Lão nguc → cang / tn / dead; luoc | save him / let custom kill him |
| .7 | Thương thuyền Tân La | thương quán Tân La · trả bạc khi người về · để thủy sư tìm | Kim Hựu Thành → kinh / cang; nhatky → ta / kho; giaythue; trang | buy / have Thị bạc seize it |
| .8 | Giặc biển Đông Hải | thủy sư đánh đêm (lose: Tiểu Ngọc dies, chest sinks) · chuộc bằng ngọc · cho Ô Cửu một bến | Ô Cửu → nguc / hb / cang; ngoctrai → Ô Cửu; ruong → kho / bien; manhao; haido | ransom / give a pirate a harbour |
| .9 | Bến Minh Châu | vào chầu kể chuyện · ở lại chữa bệnh · để Hồng Lư tự lo | Tiểu Ngọc → kinh; niem → ta / kho / chay; ruong escort | bring her in / bribe {v}'s cousin |
| .10 | Kiểm cống | trình chứng (lose: cấm túc BAL.road.pt.conf.hai10) · bù bằng hồi môn · để ngài xét | nhatky → hl; tram; hoimon | prove + counter-accuse {v}'s cousin (law 1) / drop it |
| .11 | Danh sách sứ đoàn | ghi mực son + lễ tế biển · ghi người chết là «ở lại học đạo» · thuyền hộ tống | envoy → tn (S.men leaves); Tiểu Ngọc kinh / tn; Thân Lão, Nham Lão → tn; Ô Cửu dead / tn / cang; guong → tn; rare «Đèn trên mặt bể» (bienngu) | honest roll / hide the dead |
### Per-chapter table — pt_su · Khiển Đường sứ (people: Tá Bá Kim Thành, Cát Thành Trọng Lữ; unnamed Hồng Lư tự khanh, Lễ bộ thượng thư, sứ Tân La)
| ch | title | x1 climax | moves / objects | thiện / ác options |
|---|---|---|---|---|
| .4 | Quốc thư hai mặt trời | «thiên tử» = người giữ đền Thần · nhận lỗi thay · không dám bàn | quocthu → hl / kimthanh / kho; rare «Hai mặt trời, một bầu trời» (ngocboi) | read faithfully / kneel first |
| .5 | Hồi thư | buồn mà còn đến · thư riêng cho phụ hoàng · «thư của Đại Hy, {land} phải vui» | hoithu → envoy; togiang → hl | soften the word / let «Vương» stand |
| .6 | Chỗ ngồi đêm Nguyên đán | {land} trên Tân La (lose: Biên cương −BAL.road.pt.bien) · hai bàn đối diện · đỡ đại sứ ngồi tạm | — | yield / block {v} |
| .7 | Lạy hay vái | quỳ lạy cùng đại sứ (lose: cấm túc su7) · «quỳ một gối là lễ trọng nhất» · ngồi yên | — | shield the envoy / leave him alone |
| .8 | Hồi tứ | đủ sách cả luật lệnh · đổi lụa lấy thuốc + thầy thuốc · nhận theo Hộ bộ | kiem → vua / kho; sach | give the books / keep the treasures home |
| .9 | Lưu học sinh | cho dự thi (win: Trọng Lữ làm Hiệu thư lang, stays) · khuyên về nước · để đại sứ quyết | trongla flags quan / ve | open the exam / send him home |
| .10 | Thuyền về | lệnh giả, tra người sai (law 1 vs {v}'s father; lose: mang tiếng vu Lễ bộ) · hoãn không truy · để ngài xét | lenh → ta / hl / vua / chay | expose / burn the order |
| .11 | Ai về cố quốc | chiếu cho thuyền vào bến · thuyền hộ tống · đứng đến khi thuyền khuất | ptSail: envoy → tn, scholar → tn unless he holds office; hoithu, thuta, quat, but → tn; rare «Bài thơ trăng Tam Lạp» (nt_haiduong) | — |
### Lead measures (review/phutang-road; all 4 roads merged at 16cc8f1d)
| Check | Result |
|---|---|
| dev/measure/pt-scan.py (6b + 6c family scan, all 4 roads; stops at a told return) | 6b: 0 unguarded · 6c: 103 give/buy/receive options, 58 booked (ptO / PTP), 45 used up, 0 NO BOOK |
| dev/measure/pt-roads-bal.js STATIC pt_hai / pt_su (copy of bd-roads-bal r2: values incl. climaxes, dominance) | no-loss 0 · spread > 6: 0 (after re-levelling pt_hai_7.c1 + pt_hai_9.c1; before 2 at 6.3) · climax dominance 0 · not harder at rank 0 · digits/% 0 · unknown tokens none |
| dev/test/road-full.js pt_hai (1 life, full frame; test now reads the origin from the premise arc, pt_* → pf) | PASS: 1:nhap14 2:sung14 3:tap14 4:pt_hai 5–11 pt_hai_5…11 12–14 endgame, fin = the .11 ending |
| bot ≥20 lives / road | RUNNING (2 parallel processes; 4+ chromiums crashed the 15 GB box: «Target crashed» = renderer memory under load, not the roads — a single pt_su life alone plays to ch.14, heap < 400 MB, 0 errors) |
### FOR C (pictures via MAIN; nothing drawn) — lead part
- Branch: `img/origin-wide-pf.webp` (16:9) + `img/bg-origin-pf.webp` (3:4) — home phase places np* use neutral palace pictures until then (SCIMG npTam…npHo; n_send shows ev-hoa-than). Emblem img/kit/origin-pf.webp = KIT REQUEST (like bd).
- Home places (KC2LAND.pf): Phòng của ngươi (bình phong giấy dó, gương đồng), Chính điện của Thiên hoàng (rèm trúc), Vườn rêu, Đền Thần bên bờ biển (cổng gỗ son giữa nước triều), Khách quán sứ Đại Hy, Chợ Tây kinh đô, Bến Nan Ba (bốn thuyền sứ chờ gió). Tang-era dress only (áo kiểu Đường + váy xếp; no thập nhị đơn).
- pt_hai: .4 bến Minh Châu nhìn ra khơi · rare «Lửa hiệu trên Ngũ Đảo» (lửa dọc bờ, đốm lửa ngoài khơi) · .8 thuyền buồm đen sau dãy đảo đá · .11 rare «Đèn trên mặt bể» (đèn giấy trôi trên biển đêm, Hoàng thượng đứng bên).
- pt_su: .4 sứ thần dâng quốc thư giữa điện · rare «Hai mặt trời, một bầu trời» (nàng cầm bút dưới quốc thư) · .6 yến Nguyên đán hai dãy sứ · .11 rare «Bài thơ trăng Tam Lạp» (trăng trên bến, thuyền nhổ neo).
### FOR E
- Base = review/bd-roads (Foreman E OK 06:56Z); phutang-road lands AFTER bd-roads PASS+LAND; I re-merge bd-roads' newest head (E14d sends its r2 sha) before SẴN SÀNG KIỂM.
- Shared files touched (jkc2 / joi / j72 / j97 / jgecat / assemble): small edits listed above; E20 (caoly-road, from main) edits the nc text on some of the same jkc2 lines — whoever lands second resolves; my edits there are `kc2Br()==="pf"?…:` prefixes and `${L.land}`/`${L.dad}` in place of the literal «Nam Chiếu»/«phụ vương» (same output for nc).
- BAL.kcv.pf = BAL.kcv.nc (home-phase carry row) until a kc2val pass re-measures pf.
- Women of the roads (Tiểu Ngọc, the mother) live in the PTP book only — same filed jworld item as bd's women guests.

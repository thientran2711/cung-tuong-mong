SẴN SÀNG KIỂM home-chapters 03c2cade (review/home-chapters, from main 377d5ce3) — BIG review
PRIORITY #1 CHECK ('kc_ke|kc_hon|tm96z|nhũ mẫu|Thái hậu triệu|home chapter|vi hành|kc_tt3'): OD 1 | ledger 1 | claims 2 | main 15 | review/* 0 | archive 1
LAW 13: kc-lore(-r1), kc-roads-cn-nc(-fix,-fix2,-r1,-fix-r1), kc2val-home(-r1), outside(-r2,-r2-r1,-r2-r2), chapter-detail-r1 checked: kc-lore + outside-r2 already on main (archive reports), kc-roads landed as jkc2; none holds kc_ke/kc_hon/tm96z/endZ/di vật/nhũ mẫu/Thái hậu triệu → built new on main.

## What (GAP OR03 OR04 OR05 OR07 OR10; OUTSIDE_PLAN §5 §6 §8 §9)
New files dev/build/jkc3.js (engine, roster, events, kc_tt), jkc3a.js (kc_dtq kc_muoi kc_thd kc_ch kc_td), jkc3b.js (kc_ke kc_hon tm96z); BAL.kc3 in jbal2.js (+ BAL.kc3.fx per arc, BAL.arc.fx format, filled by j67 arcBeats/arcOpt); assemble.py after jkc2.js. Only new home lives of the six khuê các origins (S.kc.c3); jkc2 roads (S.kc.kd) and old saves untouched.
- OR03: origin chapter = j67-format arc (s1 → 1–2 of 3 complications → turn (65 %) → climax; endings win/mid/lose), old KCOB texts reused as beats; old 3 fixed beats only for old saves. Every ending seeds a palace arc (S.kc.seed3): at entry it is the life's palace road (jst14 f14.road / pool head) and starts with Lợi thế +sc. Seeds: tt tt_tranh|tt_mat/tt_co/tt_oan · dtq dtq_bien|dtq_huynh/dtq_binh/dtq_huynh · muoi muoi_tuoc/muoi_lau|muoi_no/muoi_doi · thd thd_tho/thd_sach/thd_tro|thd_hoc · ch ch_co/ch_bi|ch_benh/ch_ho · td td_an/td_song|td_ke/td_tha. Rare options kcR4 (dtq) / kcR6 (muoi) kept on the climax. Lore kept (dtq brother lost from s1; td house falls in kcEnter).
- OR04: kc_ke «Kế mẫu» (two-way schemes; exposing needs real proof S.kc.proof; she can frame you and win) or kc_hon «Hôn sự» (bà mối + suitor people; climax can end the life by marriage) + tm96z «Thuở thanh mai» (replaces the weekly tm events; every ending writes S.tm96.endZ {tok,promise,force}; tm96a reads force via TOK67.lvforce and tok at thread start) + kc_tt3 «Tuyển tú» = the existing Sơ/Phúc/Điện round shown as the last chapter (endings kept / trả thẻ / early).
- OR05: E9 mother ill → «Lời trăng trối»: real item IT.divat «Trâm bạc của mẫu thân» (Kỷ vật, keep, giver = her name) into S.inv on both options; mother dead, di nương raised to Kế mẫu, kc_hon → kc_ke if not started. E15 «Nhà trai thử dung mạo» after «Xin cha cho xem mặt trước» (was a dead end). E28 «Cha bị hặc tội» (tt/dtq/thd): clan power moves via tdPowAdd; 3 options incl. hitting back (law 1).
- OR07: nhũ mẫu (Người nhà; acts: kể chuyện xưa, dò la viện di nương — proof only if she really acted, ru ngủ), 5 teachers as people (Tài nghệ pager; favour → tiers học trò / được quý / truyền nhân; tier speeds that art's lessons ×1/1.25/1.5; acts Hầu (Sức) vs Biếu (Bạc) equal roads; truyền nghề at tier 2), bà mối a person (her face on «Bà mối đến nhà», acts biếu / nói khéo; gift lifts the next house), every suitor house = a man with face/age/nature (Giao du pager).
- OR10: kc_ch win → «Thái hậu triệu» (enter now as Thường tại beside Thái hậu, or wait: Đức + TH favour); vi hành success → next month «Thánh chỉ» (enter now as Thường tại, or wait: Đức, vh kept for Điện tuyển). Nhập cung card text fixed for these entries.
- New event cards print true lines (odds word + tốn + thành + hỏng) — the old kcO pattern showed «Nắm chắc» on rolled options.

## Tests (all on 03c2cade build)
| test | result |
|---|---|
| node dev/test/one-core-guard.js | PASS (0 new inline numbers) |
| dev/test/home-chapters/laws.js (9 arcs: law 3 gain+loss every option, law 2 proxy, 3 endings, seeds real, BAL fx per beat) | PASS |
| dev/test/home-chapters/smoke.js 6 origins × 4 lives | errs [], fails [], every planned chapter ended; road = seed in all 9 palace entries |
| smoke --off vs on (tt,thd,ch × 6) | same outcome mix: 11/18 enter palace both ways (no balance shift) |
| dev/test/outside/oldsave.js main→this, 755x1000 | PASS |
| bash dev/tools/quickcheck.sh | QUICKCHECK PASS (core gates, old save ok, perf ≈ live) |
| dev/test/home-chapters/shots.js Fold 755x1000@2 + iPad 1180x820@2, 9 screens each | 0 overflow / clip / ??? / % ; looked at |
SHOTS: CDN upload refused (cdn_sync HTTP 401 Authentication error, same account issue as E24) → no images committed; rerun `node dev/test/home-chapters/shots.js <url> <dir>` to see them.
KIT REQUEST filed (dev/kit/KIT_REQUESTS.md on the branch): option cost rows show «Tốn: không» for home stats khm/kgt/kap/kld (example E28 hồi môn). Not a gate.
DOUBTS for the reviewer: IT.divat borrows the jade hairpin icon (ITIMG.tramngoc) — FOR C art list: one painting «Trâm bạc của mẫu thân». Teacher / bà mối / suitor faces come from the existing pools (mama/man/maid/official). A few arc options give a loss only in words (law-3 scan accepts lx text).

## HANDOVER (E25 rolls over 20/11 ~09:16Z at ctx 37.7 % > START ≈3 % + 25 %; depth 8, cannot open a child → FOREMAN E opens the successor)
Task for the successor = r2 fixes of the FAIL in reports/home-chapters-review.md @a3cc98226 (read it in full), base = review/home-chapters-r1 468499b6d (reviewer's LIVE 90d57324 merge). Push to review/home-chapters (or -r2), then «SẴN SÀNG KIỂM home-chapters r2 <sha>» to FOREMAN E.
Map of the code: jkc3.js = engine (kc3Reg/kc3Thread/kc3Fire/PEND.kc3/kc3Res/kc3End, seed → kc3Seed + newThread67 wrap, TOK67.lvforce wrap), roster (kc3Roster/kc3Mk, KC3THAY, KC3SXAGE, kc3Acts, teacher tiers + addArt wrap), events (kc3Ev helper prints true lines; mebenh/divat/xemmat/hac/vhtrieu/thtrieu; kc3Early), story tab wrap, kc_tt arc. jkc3a.js = 5 origin arcs, jkc3b.js = kc_ke/kc_hon/tm96z (kc3EndZ). BAL.kc3 in jbal2.js (end of file); BAL.kc3.fx.* still typed inside jkc3/jkc3a/jkc3b → FAIL item 3: move them to a BAL file (e.g. new jbalkc3.js listed in assemble.py before jkc3.js, like jbalarc).
Fix list (whole family each, scan table before/after):
1. kit cost/gain rows hide home stats (kgt/kap/khm/kld) — KIT REQUEST sent to FOREMAN E → MAIN kit keeper; do NOT build a private part; when KIT READY: wire, re-shoot, table every kc3 option shown vs fx.
2. faces: kc3Mk fid from kcFreeFid(role,[]) runs dry (mama pool) → Nữ phu tử / Ma ma xuất cung "" 24/24, Cầm sư 15/24; pick another existing pool fallback (maid/consort-free? check FIGIX keys) or list an art request for C; Họa sư must skip named palace faces (man:vuonggia-*, thaiy-1) — exclude by key.
3. ONE CORE: ages (56+R(10), 40+R(9), 52|34+R(12)), KC3SXAGE, k:1/k:2 on cards, Math.min(5), 1+R(2) in kc3Thread, A.sc>=1 in kc3ScEnd, Math.max(10,kgtu) (jkc3a muoi), k61Know(…,2) (jkc3a td) → BAL; tm96z rare gate (h>=80/loyal>=60/kld<55/.6) must read the SAME key as jkc.js:396 (move both to one BAL key); extend dev/test/one-core-guard.js patterns so these are caught.
4. empty scene banner on kc_ch / kc_ke dialogs (the kit picture box above the text is empty: find how kcE dialogs get their banner — act-pic/jopic by title? — and give kc3 dialogs the same source).
Tests to rerun: one-core-guard, dev/test/home-chapters/{laws,smoke,shots}.js (server: python3 -m http.server from the worktree root; shots need the overlay cleanup already in shots.js), dev/test/outside/oldsave.js (main.html from git show origin/main:index.html under .port/), bash dev/tools/quickcheck.sh. CDN gave 401 for E-account → say so, no images in git.
Worktrees /home/user/wt/e25 (review/home-chapters) and /home/user/wt/e25ho (handover) can be reused; flock /home/user/wt/e25.build.lock around builds.

## r2 — E25b (opus, session_01DgYSWob7AScwYwurseKupN) — SẴN SÀNG KIỂM home-chapters r2 7882ea5d7 (kit part pending)
PRIORITY #1 CHECK ('kgt|kap|khm|kld|KR home-stat|kc3Mk|kcFreeFid|BAL.kc3|home-stat rows'): OD 0 | ledger 0 | claims 8 | main 15 | review/* 0 | archive 24
Branch review/home-chapters-r1: 9d860229 = LIVE merge of origin/main 66bd36cd (conflicts index.html/sw.js only, rebuilt), then 1bf9bbb97, d0c190c6f, 7882ea5d7.
Fix list of reports/home-chapters-review.md @a3cc98226:
1. Home-stat cost/gain rows — WAITING FOR «KIT READY: KR home-stat rows» (no private part built). Data side done: every number of every kc3 choice is in its c/w/l or in its j67 line (the scan reads them from there). New scan dev/test/home-chapters/costrows.js renders every arc beat option (9 arcs, all origins), every home event option and the roster act cards, and lists each home-stat number (Gia thanh / Áp lực hôn sự / Hồi môn / Lời đồn / thế lực nhà / «X với ta ±n») the shown card does not print + every TỐN/ĐƯỢC «không» row whose line has content. BEFORE (now):
| family | choices | home number not shown | «Tốn/Được: không» with content |
|---|---|---|---|
| arc beats | 366 | 101 | 10 |
| events E9/E15/E28/early | 10 | 8 | 1 |
(act cards: the scan does not find them on screen yet — only one act carries a home stat, bà mối «nói khéo» w kap −8; check by eye after wiring.) AFTER the kit part: rerun `node dev/test/home-chapters/costrows.js <url> --list`, must print 0 / 0. Cause is the kit option card's hint words (jk2b kitHintPhrase) having no words for home stats; that is the kit keeper's part.
2. Faces (law 6b) — whole roster group: kc3Fid takes the role's pool, then the next existing pool of the same sex (BAL.kc3.ros.pool mama→maid, man→official…; all pools have the 4 age bands, kcPor picks her age's band), never a named palace face (BAL.kc3.ros.noFid: man:vuonggia, man:thaiy, emperor, thaihau); Họa sư prefers man:hoasu-1 (the painter face). Old r1 saves: the month hook gives a face to anyone without one or with a palace face. Scan dev/test/home-chapters/faces.js, 24 lives:
| role | before (no face) | after (no face / palace face) |
|---|---|---|
| Nữ phu tử | 24/24 | 0 / 0 |
| Ma ma xuất cung | 24/24 | 0 / 0 |
| Cầm sư | 15/24 | 0 / 0 |
| Họa sư | palace faces (vuonggia/thaiy) | 0 / 0 |
| Nhũ mẫu, Bà mối, Vũ sư, 72 suitors | 0 | 0 / 0 |
r1 saves repaired 24/24, no face used twice. No art request needed (no drawing). Possible follow-up for C (not a gate): own faces for the 3 older women teachers instead of maid faces at a36/a51.
3. ONE CORE: all BAL.kc3.fx blocks moved out of jkc3/jkc3a/jkc3b into new dev/build/jbalkc3.js (assemble.py after jbal2.js). Inline numbers → BAL.kc3: ros.age (nm/ba/thay/le), ros.sxAge (was KC3SXAGE), ba.bieu.k / ba.khe.k / thay.bieu.k, thay.truyen.tier, thay.leMax (also jkc.js lễ-nghi lock / «nay x/5» / max), cal.nc (1+R(2)), mid (A.sc>=1), ev.qMax, gtuMin (muoi kgtu floor), know.foe (k61Know level), rare.r4/r6/dtqOc (jkc.js:459/460 now read the same keys as jkc3a). kcR1 elope gate: ONE function kcR1Ok() reading BAL.kc3.rare.r1 {h,loyal,kld,p}, used by jkc.js tmtron and jkc3b tm96z. laws.js got a static law-4 scan of jkc3*.js (R(n), roll(n), kcRare odds, k:n, Math.min|max(n, typed comparisons, k61Know level, arc number blocks, a second kcR1 gate) — proven to fail on an injected line.
4. Banner: kc3 chapter dialogs had no picture of their own → the §59 placeholder, often still loading (empty frame). Each arc now names its EVENTS.json meaning group (KC3PIC: kc_ch thu-nha, kc_ke am-muu, kc_tt mat-uoc, kc_dtq bien-ai, kc_muoi bac-tien, kc_thd tai-nghe, kc_td vu-oan, kc_hon khach-den, tm96z tu-tinh), passed to the kit as the dialog's evId "cat:<group>" (beat card, result card, ending card; restored on reload via deserQ). Shots: letter picture on «Thư của cô mẫu», scheming picture on «Kế mẫu». Teacher «HAY» trait text: kcFamCard owner's, not touched (note only).
Tests on 7882ea5d7: one-core-guard PASS · laws.js PASS (incl. static law 4) · faces.js PASS · smoke 6 origins × 3 lives errs [] fails 0 · oldsave main→this and r1→this 755x1000 errs [] · quickcheck alone PASS (old save ok, perf ≈ live; the only FAIL line was "not built" before the build commit) · shots.js Fold 755x1000@2 + iPad 1180x820@2 (10 screens each, bad 0), looked at: chapter dialogs show their picture, 5 teachers with faces. CDN upload 401 (Authentication error) → shots kept at /home/user/wt/e25b-shots, none in git.
Remaining: item 1 wiring after KIT READY (then rerun costrows.js and re-shoot E28 + kc_ke s1 + bà mối).

## r2 final — E25b — SẴN SÀNG KIỂM home-chapters r2 5853d71a4 (review/home-chapters-r1)
Base: KIT READY 3332c63b (review/kit-cost-rows-home, includes LIVE main 983a9436) merged = 1d3bf5ef9 (conflicts assemble.py list union + KIT_REQUESTS both kept + index/sw rebuilt). Item 1 wired: kit parts only, no private rows.
- Data side: relation gains/losses written in kit words («<người> thiện cảm ±n», was «… với ta / với ngươi ±n», 13 lines, jkc3.js) so the kit hint map names them.
- costrows.js now reads the card as the kit shows it (stat name OR the kit's own hint words from kitHintPhrase) at the sharpest hint level (Tâm cơ 100: below it the kit hides «hỏng thì …» by design); «không» row check fixed (only a bare «không» cell).
| family | before (r2 first SSK) | after |
|---|---|---|
| arc beat options | 101/366 hide a home stat · 10 «không» | 0/384 · 0 |
| home events E9/E15/E28/early | 8/10 · 1 | 3/14 · 0 (all «thế lực nhà», E28) |
E28 «Dâng phần hồi môn…» now TỐN Hồi môn −40 · ĐƯỢC «được lòng người» (Fold + iPad shots looked at). Left: «thế lực nhà ±n» (clan power, tdPowAdd) has no kit words → NEW KIT REQUEST «KR thế lực nhà» filed in dev/kit/KIT_REQUESTS.md on the branch (3 E28 options); worker draws nothing.
Act cards (bà mối «nói khéo», teachers): shot looked at, Tốn/Được rows shown (e.g. «Bạc −20 · bà mối thiện cảm +10»); the scan cannot find act cards on screen (not counted).
Tests on 5853d71a4: one-core-guard PASS · laws.js PASS · faces.js PASS · smoke 6×2 errs [] · kit-cost-rows-home.js PASS 15 · shots.js Fold 755x1000@2 + iPad 1180x820@2 bad 0 (20 screens, looked at E28, matchmaker, chapter dialogs) · quickcheck alone PASS (old save ok, perf ≈ live). CDN 401 → shots local /home/user/wt/e25b-shots, none in git.

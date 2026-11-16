# road-b3-fix — fix of review road-b3-r1 FAIL (thd + cnv roads .5–.11, jend14 ch12–14)
Worker of Foreman B s7 (session_01N1tNP6YA61ntHf4XBa4y1f). START_CTX ~4 % of a 1M window; at write ~20 %.
Branch `review/road-b3-fix` = origin/review/road-b3-r1 0426e7bb + origin/review/road-b1-fixa **072bc1e5** (fix A: rdCast f.keep, road q97 carried
across the road, road-option-scan with dominance / inverted / VANPHONG / rare reachability checks, B1 roads). Merge conflicts: assemble.py
(one list = fix A's + jrd_thd/jrd_cnv/jend14 after jrd_cn), jbal2.js (both BAL.road blocks), road-saves.js (fix A's + origin list arg),
index.html/sw.js rebuilt. Engine (jroad/j67/j97/j42) untouched. Two helpers did the content (one per file family); I did jend14, BAL, tests.
Source of jrd_thd.js / jrd_cnv.js stays dev/build/rdfrag/*.js (byte-identical concat checked before and after).

## Before / after (road-option-scan = dev/measure/road-option-scan.js, real BAL; own state scans by the helpers)
| item | check | before | after |
|---|---|---|---|
| 1 | x-beat dominance thd / cnv / jend14 | 3 / 8 / 0 | 0 / 0 / 0 |
| 1 | x-beat bold ≤ safe thd / cnv / jend14 | 15 / 16 / 3 | 0 / 0 / 0 |
| 1 | free fixed «mid» with a gain beside a costly option (thd) | 15 | 0 |
| 1 | cnv state-aware x-beat scan (maid/raised × mistress alive/dead) | 80 | 0 |
| 2b | rare finales reachable (thd_tro_11, thd_hoc_11) | 0/8, 0/9 path hits | OK (fix A carries q97 across the road; scan: no LOW) |
| 2c | cnv_ma_11 rare «hộp còn nguyên» after the box was burned | possible | 0 (S.st.f14.lmmBox="burn" set by «Đốt hộp», LMMBOX() read) |
| 3 | thd promised effects not applied (lx oán hoc_5/6/9/10, tho_10 cấm túc, hoc_10 «Tâu tên») | 7 | 0 (rdOan / CN_CAM + BAL.road.thd_tho.cam / e67heir) |
| 3 | cnv maid-pickable options with Sủng in c/w/l | 21 (6 costs, 15 gains) | 0 (MAT2: Sủng need:["nsrv"], maid twin on Hoàng thượng để ý need:["srv"]) |
| 3 | cnv double hh (cnv_chu_9 E.tell) / false «Chủ tin rơi xuống đáy» / lmmCon({hh}) / odds on S.hh at an empty seat | 1 / 1 / 1 / 4 | 0 / 0 / 0 / 0 |
| 4 | cnv maid-only beats after the rise (ma_5/6/9, ban_7/9/11, chu_7/8) | 16 listed (42 keyword hits) | 0 (need:["srv"] + raised twins; 23 harmless hits left, read by hand) |
| 5 | cnv texts/speakers/stats for a dead Thái hậu or both gone (mode scan) | 3 + 249 | 0 (CNV_QFIX once in _hd_cnv.js, 3 cases hh / th / emp) |
| 5 | thd unguarded Hoàng hậu / Thái hậu texts | 11 | 0 |
| 5 | jend14 Thái hậu acting when dead (noi14 c1/x1/s1/s2/E.win, hau14 s1/s3/t1/win, ke14 s3/E.win) | 11 | 0 (need:["th"], noi14 x2 Hoàng thượng variant, twins, effect getters) |
| 6 | cnv road content reading srvMis67 (silent recast) / dead mistress acting | 5 / ~20 | 0 / 0 (S.st.f14.act.mis kept once, death told once A.rc + log) |
| 7 | thd_hoc pupils of any age / wrong sex / invented «một công chúa nhỏ» | yes | 0 (school age BAL.tc.hienAge, son-first, one-pupil variants) |
| 7 | thd_sach .9 tay trái / tay lành / giải cha / .10 trang gạch đỏ continuity | 4 | 0 |
| 8 | thd_tro_6 Hàn lâm viện questioning; Tam pháp ty in full; thd_tho_7 no hồi tị | 1 / 3 / 1 | 0 / 1 (first use) / 0 (option «Xin Chưởng viện cho cả hai hồi tị») |
| 8 | cnv verdicts not the Emperor's (chu_9/10, mat_10, ban_8) | 4 | 0 («… tâu lên, Hoàng thượng phê») |
| 9 | jend14 typed rank 7 / 6, RANKS[S.rank+1] unclamped | 3 | 0 (EG_HH/EG_TOP from RANKS.length, egRankN clamps) |
| — | VANPHONG (all road files) | 4 | 0 |
| — | road-option-scan, all 168 road chapters + jend14 (3280 + 74 options): free gain / text-only / digits / inverted / double Lợi thế / dominance / bold≤safe / VANPHONG | — | 0 each (cn_chu_9 x1 «not readable» = B1 file, not B3) |

Rule used for item 1 (whole family): every x beat bold base ≥ safe base + 10, or the safe one carries a real cost (then bold base > safe);
free sure-mid options cost Danh/Sức/Đức. Per chapter.beat lists: helper reports below (thd, cnv).
New BAL key: `BAL.road.thd_tho.cam` (jbal2.js, comment there).

## Known limits (for the reviewer to judge)
- cnv: where a road needs the mistress alive (all of cnv_chu, cnv_mat .5–.9, cnv_ban .9) her death / cold palace ends the rest of that road
  (cast fails → jst14 shared chapter, jroad tells the origin ending from the last road chapter, d69d6d24); her death is told once (log + A.rc),
  but no full dead-mistress version of those chapters is written. cnv_ban (other chapters) and cnv_mat .10/.11 run on with dead-mistress variants.
- Old saves whose mistress died before act.mis existed fall back to srvM() (the new mistress) — no history to recover.
- road-fixb-scan (fix A tool) still lists 31 cnv HH hits: texts CNV_QFIX rewrites at run time (the scan does not evaluate getters); the helper's mode scan shows 0.
- RD97L x thresholds stay typed (j97 convention, item 9 note).
- KIT REQUEST from r1 (1180 event card text under the options, jk4 kdpall) is the kit keeper's, not touched.

## Tests (own http server, build of this branch)
| test | result |
|---|---|
| road-option-scan (all jrd_* + jend14) | see table: 0 on every check |
| road-end.js (6 cases × 2 lives + old f14 plan) | 51/51 PASS (build with the jend14 fixes) |
| road-full @755x1000 thd_tro (OOM in r1) | 10/10 PASS — 1..14 in order, 4..11 = thd_tro, fin «Khoa trường trong sạch», 12 noi14 13 hau14 14 ke14, tm96 side, 0 page errors |
| road-full @755x1000 cnv_ma (OOM in r1) | 10/10 PASS — fin «Người nối nghiệp Lưu ma ma», 12 len14, 0 page errors |
| road-saves (origin/main save → this build, phase-1 save, mid-road thd + cnv saves) @755x1000@2 and @1180x820@2 | 5/5 PASS at each size (main save loads with no road state and plays on; td phase-1 plan kept; mid-road thd + cnv saves keep road, cast, plan), 0 page errors |
| coop-e2e (item 10) | not run: belongs to fix A; fix A at 072bc1e5 has NO coop fix → **fix A's coop fix NOT merged** (none pushed yet) |
Test change: road-saves phase-1 case uses origin td (thd is full on this branch now).

## Helper reports (per chapter.beat)

### thd helper

## REQUIRED BAL key (add to jbal2.js BAL.road before commit — code reads it)
`thd_tho:{cam:3}, /* months of cấm túc the Emperor gives {v} when thd_tho .10 x1 «Xin xử đúng luật» wins (was text-only «cấm túc một mùa»; applied with jrd_cn CN_CAM, printed with kitNumVi) */`

## Counts (road-option-scan on jrd_thd.js + own strict check)
| check | before | after |
|---|---|---|
| X-BEAT DOMINANCE thd | 3 | 0 |
| X-BEAT BOLD ≤ SAFE thd (scan) | 15 | 0 |
| strict rule (free safe → bold ≥ safe+10; costed safe → bold > safe, any cost set) | 23 | 0 |
| free fixed e:"mid" with a gain (review listed 13; +tho_8, hoc_11) | 15 | 0 |
| phantom effects (promised, not applied) | 7 | 0 |
| unguarded Hoàng hậu / Thái hậu texts | 11 | 0 |
| VANPHONG | 1 | 0 |
| free gain / text-only / digits / inverted / double Lợi thế | 0 | 0 |
| rare finales (RD97L) | 4 ok | 4 ok (no LOW; tro_11/hoc_11 reachable via road q97) |

## Changes by chapter.beat
- tho_5 x1: bold «Tâu… đề đã lộ» base 35→45 (50 > costed safe 46).
- tho_6 s1: lx «người hầu oán» → «bất bình» (no oán stat for servants). x1: bold base 40+danh/4 (47.5 > safe 46); rf + E.lose switch Hoàng hậu/Hoàng thượng on qOn(); E.lose hh −3 moved to go: hh −3 only while she sits, else Sủng −2.
- tho_7 c1 rf: Thái hậu → Chưởng viện when S.thDead. t1: hồi tị — text states the lệ; new option «Xin Chưởng viện cho cả hai hồi tị» ({n1} and {v}'s uncle; f recuse +6 to «Viết về tuyết»), replaces the passive «Không nhìn {n1}». x1: bold «đáp thẳng» 35+tamco/4 (42.5 > 37.5).
- tho_8 x1: «Xin hoãn» gets c danh −2.
- tho_9 x1: bold «Viết tiếp» base 40 (47.5 > 40).
- tho_10 c2 rf: Hoàng hậu only on qOn(). x1: bold 42 + real cấm túc on {v} (CN_CAM, BAL.road.thd_tho.cam); safe «tha» costs danh −2, base 35+mercy+duc/5 (41 < 42); «giữ chữ» costs sung −2.
- tho_11 x1: bold «xóa tiếng… cho cả {v}» c suc −2 duc −1, base 40+peace+duc/5 (46 > 45/41).
- sach_5 t1: hh-free text (a Thân vương's in-law, tôn thất) + need:["hh"] / if:!qOn() twin options (sung instead of hh). x1: bold base 45 (50 > 49); «Giấu, chờ thời» costs danh −2.
- sach_6 s2 rf: {hh} only on qOn(). x1: bold 36+danh/5 (42 > 41).
- sach_7 c2 rt: {hh} only on qOn(). x1: bold 42+sung/5 (48), safe tiêu cục 38+… (47); the escort sets road flag S.st.f14.thdKinh.
- sach_8 x1: bold 38 > safe 32; «Rút lại» costs danh −2.
- sach_9 g / s1 opt3 / s2 opt2 (+ twin «Gửi bạc lót tay lính bắt cha»): father arrested at his inn when thdKinh, else escorted from the village; s2 rt «tay chân lành lặn» only when .7 not lost; t1 «tay trái» only after rdEnd(7)==="lose".
- sach_10 x1: «trang đã gạch đỏ» if rdEnd(8)==="win" (bonus folded in, base 34); bold 38.
- sach_11 x1: bold base 42 (45.75 > 40).
- tro_5 x1: «Để hắn đi» costs danh −2.
- tro_6 c2 rf: Hoàng hậu only on qOn(). x1: the Emperor asks her in Ngự thư phòng the night before (poems still at Hàn lâm viện); «mừng thọ Thái hậu» → «mừng tiết Vạn thọ» when S.thDead; bold 45+tai/4 (52.5 > 49); «đề do Hoàng thượng» costs danh −2.
- tro_8 x1: bold 42; safe «xin ngài tự đọc» costs danh −2, base 36; «Không đưa» costs danh −3. Tam pháp ty glossed in full here only.
- tro_9 g: Tam pháp ty short. x1: bold 40+wide+danh/6 (45 > 40); «không dám bàn» costs danh −2.
- tro_10 x1: bold 46 ≥ free safe 36+10; «Ở cung chờ tin» costs danh −2.
- tro_11 c1: Tam pháp ty short. x1: «không dám bàn» costs danh −3 (no longer dominates «chỉ xin trả tên»).
- hoc (cast): pupils = living children with age ≥ BAL.tc.hienAge (j53, no typed 6); {v} must have a child of school age; {n1} = her child, son first; {n2} = another school-age child or "" — no invented «công chúa nhỏ»; helpers thdHocAge/thdHocIn/thdHocKid/thdHocSon/thdHocTwo/thdN2. One-pupil wording: the class's other pupils are the unnamed thư đồng (officials' sons), never a named royal child.
- hoc_5 g (one-/two-pupil, «hoàng tự»); s3 wx «cơ hội» → «một lần thử»; c1 if two + new c3 one-pupil variant; x1 bold 45, «{n2} đọc trước» if two + twin «các thư đồng đọc trước» (base 30+…, oán 4 on failure as the lx says); «cả lớp đọc chung» costs danh −2.
- hoc_6 g/s1/t1/x1 texts via thdN2; s2 rf Hoàng hậu only on qOn(); x1 bold 42+duc/5 (48 > 41); «đứa nào cũng như nhau» costs danh −2 + real oán 4 («{v} chưa nguôi»).
- hoc_7 t1 if two (rt by sex: cưỡi ngựa bắn cung / thư pháp) + new t2 one-pupil beat; x1 bold 45+… (50 > 40); «chấm cả lớp như một» costs danh −2.
- hoc_8 s1 texts via thdN2, «Cho {n2} tự xử» if two + twin «Để thư đồng tự xử».
- hoc_9 s2 rt / t1 via thdN2; x1 bold 40+brave+tai/3 (50) ≥ free safe 40+10; «tự giảng» twin for one pupil; lx reworded to what happens (no phantom «hiểm»).
- hoc_10 g Đông cung only when {n1} is a son; s1/s2 one-pupil texts («Dạy những trò còn lại…»); x1 «Tâu tên {n1}» bold 46, rt by sex; «mỗi đứa một tài» costs suc −2 + oán 3 on failure; «Tâu tên {k}» only for her son of school age, applies e67heir(6) on success (rt promised «ngài vẫn để ý {k}»); «chỉ dạy chữ» costs danh −2 (dominance gone).
- hoc_11 s2/t1 rt via thdN2; x1 bold 41+… (46) ≥ free safe 36+10; «Cúi đầu» costs danh −2; RD97L t Đông cung only for a son; bad list «Đánh đủ mười thước» → «Bắt quỳ chép đủ mười lượt» (option renamed in r1).

## Not done / notes
- RD97L path/bad matching reads raw o.n, so option names stay plain strings (twins with if, never function names).
- Remaining oán/hận/thù words (sach_8 s1 «không mùi thù», tro_5 t1 «mối hận cũ», tro_9 c1 «nửa triều thành kẻ thù») are descriptive, no mechanic promised; left as is.
- Runtime smoke (node stubs): every function text of the 28 chapters returns a string with Hoàng hậu on/off, Thái hậu alive/dead, two pupils / one pupil. Browser tests not run (helper scope).


### cnv helper

Files: dev/build/rdfrag/_hd_cnv.js, cnv_chu.js, cnv_ban.js, cnv_mat.js, cnv_ma.js → dev/build/jrd_cnv.js regenerated (cat of the 5 fragments only).
`node --check dev/build/jrd_cnv.js` OK. Nothing committed. No new BAL key needed (cnvMaRk unchanged).

## Shared code (moved to _hd_cnv.js, once)
- `CNV_QFIX` is now ONE function in the header (removed from the 4 fragments; each fragment still calls `CNV_QFIX("cnv_x")`).
  Three modes via `CNV_QM()`: "hh" (seat filled), "th" (empty seat, Thái hậu), "emp" (both gone → the Emperor: «Hoàng thượng»,
  Dưỡng Tâm điện, «Trẫm», speaker "emp", hh stat → «Hoàng thượng để ý» for a maid / Sủng once raised). Special regexes removed;
  texts needing exact wording are functions of CNV_QM.
- `CNV_QN/CNV_QON/CNV_QK/CNV_QV`: name / "a woman holds the inner palace" / favour key / favour value (odds use CNV_QV, never S.hh).
- Road mistress: `CNV_MID/CNV_MIS/CNV_MOK/CNV_MCUR/CNV_MT/CNV_MC/CNV_REL`. {mis} is kept once in `S.st.f14.act.mis`
  (set when the road's .4 thread is created, or at the first cnv cast; old saves fall back to srvM()). Wrappers (in my file, engine
  untouched): `TOK67.mis` and `who67("mis")` read the road's mistress for cnv road threads (a gone one has no portrait).
  A gone mistress (dead / cold palace) is told once: «X nay đã khuất, …» → A.rc + log (flag S.st.f14.misT).
  Chủ tin changes only while she is still the mistress this maid serves (CNV_MCUR).

## Before / after
| check | before | after |
|---|---|---|
| road-option-scan: free gain / text-only / digits / VANPHONG / inverted | 0/0/0/3/0 | 0/0/0/0/0 |
| road-option-scan: X-BEAT DOMINANCE | 8 | 0 |
| road-option-scan: X-BEAT BOLD ≤ SAFE | 16 | 0 |
| own state-aware x-beat scan (maid/raised × mistress alive/dead, need/if filtered) DOM+WEAK | 80 | 0 |
| item 3: options a maid can pick with Sủng in c/w/l (unique) | 21 (6 costs + 15 gains) | 0 |
| item 3: odds reading S.hh | 4 | 0 |
| item 3: double hh (cnv_chu_9 tell) / phantom «Chủ tin rơi xuống đáy» / lmmCon({hh}) | 1/1/1 | 0/0/0 |
| item 5: visible texts/speakers/stats for a dead or absent Hoàng hậu/Thái hậu (own mode scan: hh+thDead, th, emp × maid/raised) | 1+2 (hh+thDead), 122+127 (emp) | 0 |
| item 6: srvMis67 reads in road content (silent recast) | 5 | 0 (only the fallback in the header) |
| item 6: dead mistress acting (own scan, mistress dead, cnv_ban + cnv_mat .10/.11) | ~20 options/texts | 0 (guards / CNV_MT variants; RD97L cnv_mat_11 gated by CNV_MIS alive) |
| item 4: raised-visible texts with maid-only actions (keyword scan) | 42 hits | 23 hits, all reviewed false positives (history, Thu Cúc / Xuân Đào / palace servants doing laundry) |
| road-fixb-scan cnv: DOM / TH / WORD («sau rèm») | 17 / 1 / 4 | 0 / 0 / 0 |
| road-fixb-scan cnv: HH | 34 | 31 — by design: these texts are rewritten at run time by CNV_QFIX (scan does not model the getters); verified 0 in my mode scan |
| runtime smoke (scratch build of this tree, chromium file://): cast/act.mis, {mis}/who after j42 reassign, emp/th text+speaker+stat, MAT2 twins maid/raised, beat card render | — | all as expected, 0 page errors |

## Changed chapter.beat (one line each)
- chu (all): cast `CNV_MC(A,1)` (road needs her alive); CHU_MIS → CNV_REL; CHU_T/CHU_Q call functions / three modes.
- chu_5.x1: «Giữ trong lòng» costs suc −2 (lx true); «Lén cho {v} biết» gains tamco +2 on success.
- chu_5.s2: «Lặng lẽ tìm thêm chứng cứ» lx/rf raised-true. chu_6.s1/c1 rt neutral/raised. chu_7.c1 rt neutral.
- chu_6.x1: bold renamed «Bắt tận tay kẻ dò hỏi»; safe «Cho nàng mang tin giả về» costs bạc −15.
- chu_7: c2 maid-only + new c3 raised twin (send a trusted person); x1 raised text, «… đến khi {mis} về»; E.lose raised text.
- chu_8: s1 text three modes (Hoàng thượng chuẩn / lệnh Thái hậu / khẩu dụ Hoàng thượng); s1 opts rt/rf raised (no laundry basket);
  t1 odds CNV_QV; E.take raised + E.lose: Nội vụ phủ tâu lên, Hoàng thượng phê (item 7).
- chu_9: x1 «Kể hết» costs tamco −2; rt/E.mid/E.lose three modes, verdict = Emperor's (item 7); E.tell fx hh removed (once, in w);
  s1 lx no double name.
- chu_10: x1 «Xin dâng chuyện lên Hoàng thượng» costs danh −3 (not suc); E.lose «Thận hình ty tâu lên, Hoàng thượng phê» (item 7);
  «sau rèm» → «sau bình phong» (g, c1 rt, .8 take).
- ban (all): cast `CNV_MC(A,0)`, .9 `CNV_MC(A,1)`; BAN_MIS → CNV_REL; BAN_T calls functions.
- ban_5: s2 heading «Tỷ muội ở cung khác»; s2 text, E.win, E.lose dead-mistress variants (tag «Vòng thật về chỗ cũ»); s3 opt3 and x1
  bold if:CNV_MOK + dead twin «Đem tang vật đối chất với Thu Cúc»; x1 «Giữ tang vật» costs danh −2, «Báo Nội vụ phủ» gains danh +2.
- ban_6: s1 opt2, s2 opt3, t1 opt2 if:CNV_MOK; s2 text dead variant.
- ban_7: s1 «Chạy đến xin tha» maid-only + raised twin «Sai người xuống sân Nội vụ phủ xin tha»; s2 opt renamed «Lo bạc đút lót người
  coi Tân Giả khố», opt3 rt raised; c2 opt1 cost tin −3 in c (no dead-mistress go); t1 maid-only + new t2 raised twin; x1 lx «chủ giận»;
  raised x1 «Xin Hoàng thượng cho thái y» costs Sủng −2.
- ban_8: c2 lx «chủ»; t1 if:CNV_MOK; x1 «Làm chứng, kể hết» (renamed), «Chỉ làm chứng về Phúc An» gains danh +2, «Để Xuân Đào tự nói»
  costs danh −2; E.lose maid text true to tin −8, raised «Nội vụ phủ tâu lên, Hoàng thượng phê phạt bổng» (item 7).
- ban_9: s1 «Đứng hầu» maid-only + raised «Ngồi nghe, không nói»; x1 «Xin xử nhẹ cả hai» costs đức −2.
- ban_10: s2 opt2, x1 opt3 if:CNV_MOK; c2 opt3 if:CNV_MCUR; x1 «Nhận cuộc mặc cả» costs đức −2.
- ban_11: s2 opt3 if:CNV_MOK; x1 raised text; opt1/opt3 maid-only + raised twins (seal-paper testimony, «Viết tờ nhận một phần lỗi…»
  danh −4 bạc −20).
- mat (all): MATM = CNV_MOK; matMis/MATV read the road mistress; matSrv drops tin when she is not the current mistress; MATT calls functions;
  cast .5–.9 `CNV_MC(A,1)`, .10/.11 `CNV_MC(A,0)`; MAT2 twin helper.
- mat Sủng twins (MAT2, consort Sủng / maid «Hoàng thượng để ý» shown in the hint, success nt moved from go to w): .5 c1, .5 t1,
  .6 s1, .6 s2 ×2, .6 c2, .6 t1, .7 c1, .7 t1, .8 s2 ×2, .8 t1 ×2, .8 x1, .9 s1, .9 t1, .11 s1, .11 s2 ×2 (raised «Đứng chờ…»),
  .11 t1 ×2.
- mat_5.s1: raised lx three modes. mat_6.x1 safe costs danh −2. mat_7.x1 safe costs Sức −2.
- mat_8: c1 maid-only + new c3 raised twin; x1 «Không xin gì» costs danh −2.
- mat_9: s1 maid text emp variant; c1 heading «Người cùng phòng năm xưa»; x1 raised text three modes, rf raised; safe costs danh −2.
- mat_10: g maid (gone mistress) + raised (no live-Thái hậu claim when dead) + emp; s1 text emp; s2 rt; x1 heading «Phiên tra gói vải
  đỏ», text three modes (Hoàng hậu hears, tâu lên Hoàng thượng); opt3 rt three modes; «Chờ Hoàng thượng đến» costs danh −2;
  E.win «Hoàng thượng phê cho {v} cấm túc»; E.lose raised «Hoàng thượng phê cấm túc ngươi» (item 7).
- mat_11: s2 maid text gone-mistress variant; c2 text three modes (no «hầu Thái hậu» when she is dead); x1 safe costs đức −1;
  RD97L x reads CNV_MIS (alive, not out).
- ma (all): LMMT calls functions; header comment.
- ma_5: s2 heading «Lần thứ hai»; c1/c2/t1/x1 maid-only + raised twins c3/c4/t2/x2 (her palace's coal cut; «Tự bù bằng gấm» moved to t2);
  x1 safe costs đức −2; E.lose lmmCon({[CNV_QK()]:-3}).
- ma_6: t1 «Lấy trộm…» maid-only + raised «Sai người thân tín lấy một cuốn sổ gốc»; x1 safe costs Tai mắt −1.
- ma_7: c2 odds CNV_QV; t1 raised text; x1 «Cáo bệnh» costs đức −3.
- ma_8: c2 if:CNV_QON (+ odds CNV_QV); x1 bold base 35, safe costs danh −2.
- ma_9: t1 opt1 maid-only + raised «Kể vì sao chọn từng người…»; opt2 lx/rf kỳ thi/kỳ tuyển; x1 rt/rf raised; «Đứng thẳng chờ» costs danh −2.
- ma_10: c2 odds CNV_QV; x1 «Xin ma ma tự giữ» costs bạc −15; «Đốt hộp cùng ma ma» sets S.st.f14.lmmBox="burn".
- ma_11: x1 safe costs Tai mắt −1; RD97L x = Đức ≥ 35 && LMMBOX() (.10 ended win/mid and the box was not burned) (item 2c).

## BAL keys
None needed.

## Not done / notes
- Chapters that need the living mistress (all cnv_chu; cnv_mat .5–.9; cnv_ban .9) cast false when she is gone: jst14 fills the slot with a
  shared chapter and jroad tells the origin ending from the last road chapter (existing engine path). The «nay đã khuất» line then only
  reaches the log (no thread to carry A.rc). Writing a full dead-mistress version of those chapters was not done (the road IS her).
- Old saves in which the mistress died BEFORE act.mis existed fall back to srvM() (the new mistress) — no history to recover the first one.
- A maid moved to another mistress while the road's mistress lives (Tân Giả khố → srvReassign) keeps the road's mistress in texts;
  Chủ tin effects then do not apply (CNV_MCUR).
- road-fixb-scan HH 31 (cnv) are CNV_QFIX getter texts; the scan does not evaluate them. Suggest teaching the scan CNV_QFIX or ignore cnv.
- Empty t slots when the mistress is dead (cnv_ban_8 t1; cnv_mat_5/9 t1 but those chapters do not run) → engine skips the slot.
- The worktree shows index.html and sw.js modified: NOT by me (my test build was a scratch copy; started with only assets.json modified).


## Handover
Nothing left open on my side except the known limits above. Worktree /home/user/wt/b3fix removed after push.

fix A coop fix: NOT merged (fix A head 072bc1e5 holds none).

SẴN SÀNG KIỂM 68067fe16546455e3f9ea655de7a74d61399047c

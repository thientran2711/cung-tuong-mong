PRIORITY #1 CHECK: OD L644/L1072/L1243/L1252/L1601 (read verbatim) | main dev/build/jnroad.js nrOffer + 8 stock nr_* cards (stock nr_hh on a queen asker: same fault, pre-existing) | review/* review/questline-q1a 1b6005a (engine, under E7ar), review/questline-q1b 255f5b2a (this) | claims E7b session_01DgYSWqDaerQBfKu5bPRkef, E7ar session_01DgYSWpCXPTeYeHGVi3ZVZ2

# questline-q1b — BIG review (reviewer E7br, Foreman E)
Scope: `git diff 1b6005a 255f5b2a` only (jnrask_b.js + one assemble.py line + generated index.html / sw.js). Engine = q1a (E7ar reviews it).
Read in full: CLAUDE.md, START_CORE/WORKER/REVIEWER, E-common, E7-questline-q1, questline-expert (A+B), questline-q1a, questline-q1b (both rounds), ROAD_MAP §4.5–4.9, VANPHONG §2/§3. Every one of the 240 asks (h + 4 labels/loss lines each) was read against its chapter (title, sj, cast in jrd_*.js, ROAD_MAP line).

## VERDICT: FAIL 255f5b2a
The writing is strong: every ask is about its own chapter's conflict, the 9 origins sound different (nc custom/letters/envoys, td old case/witness/tiểu đệ, ch the reverse ask against cô mẫu, thd poems/books/exam/teaching, cnv nô tỳ asks), the two asks of a chapter never share a kind (0/120), money is only ever a cost (no «xin bạc» shape; kinds thu 34 · do 60 · emp 44 · che 37 · y 17 · hh 25 · th 23, never bac), the option order matches the stock cost roads, no number in the data (ONE CORE ok: deadlines are the road chapters' own story text, not BAL values). FAIL for a small set of text faults, one story contradiction for the maid askers, and one engine-side group fault the q1b data exposes 25 times.

## Fixes (numbered)
1. **cnv_mat_9 (both asks) assume the maid has risen** («Từ tớ thành chủ, {me} không biết ngồi ghế nào…», «Từ tớ thành chủ, đồ dùng {me} được cấp lại…»), but cnv askers are NPC maids only (nrMInit) speaking as nô tỳ — "nô tỳ … từ tớ thành chủ" contradicts itself. ROAD_MAP §8.4: every cnv chapter must read right as a maid. Rewrite both so they read right for a maid (e.g. the summons turned back, old roommates' envy, the mistress's old punishment record). Also cnv_mat_9[0] o1: label says «nữ quan Khôn Ninh cung», loss line says «ma ma» — make them the same person.
2. **cnv_ban_10[0]** «mấy thái giám của chính phủ ấy» reads as the modern word «chính phủ» (government) — VANPHONG §3. → «của chính Nội vụ phủ».
3. **«ghi ngươi vào lòng»** as a loss line (ch_co_9[0] o1, td_ke_10[1] o1) reads as gratitude («ghi lòng tạc dạ»). → «để bụng ngươi» / «ghi hận ngươi».
4. **ch_ho_5[0]** «Lệ ấy do Trung cung định» contradicts the chapter (ROAD_MAP 4.7: the Thái hậu calls whom first at her own palace, Đức Thọ cung). Reword the hh ask so the Hoàng hậu's part is real (e.g. the consorts' thỉnh an order at Khôn Ninh cung that the Thái hậu copies), or change it to another kind (chapter keeps 2 different kinds).
5. **True information only (HANDOVER L46)**: four asks state as fact that the PLAYER's family has people at court / in a district / who read books: nc_su_9[0] «Nhà {call} có người ở triều», nc_vuong_6[0] «Nhà {call} có người nói được trong triều», td_song_9[0] «{Me} biết nhà {call} có người ở huyện», thd_hoc_9[0] «Nhà {call} có người đọc sách». False for a cn/cnv/thd player. Make them conditional or questions («Nếu nhà {call} có người…», «{Call} có người nhà quen … không?» as thd_hoc_7[1] already does).
7. **ch_co_5[0] o1** label «… xin cho nàng ở lại cung ngươi»: an option label is the player's own voice → «cung mình» (house style of every stock label; the only label of jnrask*.js with «ngươi»; nrask-shots flagged it because j84 prints «cung ta» on screen). Add «ngươi» in labels to nrask-scan.
6. **FOR THE ENGINE (q1a, E7a/E7ar; whole group incl. the stock nr_hh card on main)**: an NPC Hoàng hậu can ask (nrOffer rk "hh"; nrask-shots uses a queen asker), and nrAskPick may then deal an **hh-kind** ask: «{Call} thưa với Hoàng hậu giúp {me}…» spoken by the Hoàng hậu herself (q1b: 25 hh asks, e.g. td_an_7[1], ch_co_10[0], cnv_ma_7[0]; q1a: 21 + 4 others naming the Hoàng hậu, tt_mat_6/8/9/10). Fix in nrAskPick/nrKind: a queen asker never gets kind hh (and never the stock nr_hh); q1b needs no data change for this — every q1b chapter has a second ask of another kind. Add a check to nrask-engine.js (queen asker → no hh ask/card). q1b may land only with this engine fix (or with q1a carrying it).

Not blocking (writer's choice, note for later polish): the 60 «do» asks lean on one shape (dò la, «… giúp {me} biết …» ×34); the expert kit K5 also offers giữ vật chứng / gài người / đồng mưu / cảnh báo — worth mixing in on a later pass. «bên ấy» for the player's palace (5 asks) is colloquial but fine.

## Tests (run by the reviewer on 255f5b2a, worktree /home/user/wt/e7br-q1b)
| test | result |
|---|---|
| build_site.sh → index.html | same as committed except the build line (built) |
| node dev/test/nrask-scan.js | ALL PASS · 432 asks (jnrask 96 + jnrask_b 120 chapters) · 1232 sentences · 864 labels · 864 loss lines · 9 origins 24/24 |
| node dev/test/nrask-engine.js | ALL PASS (kinds never bac + flip; offer carries av; every ask × 2 voices renders, no raw slot; fallback; old saves; play/betray; no page errors) |
| bash dev/tools/quickcheck.sh | QUICKCHECK PASS · 329 s · core gates PASS · old save ok · perf new/live render 143/168, tab 352/387, buổi 855/775 ms |
| own scans | kind pairs per chapter differ 120/120; h ≤ 235 chars; bạc/Sức road labels follow the stock order (Sức-road labels never name money); emp/th/hh/y asks name their power; 0 digits/%; slots only |

## Shots (Fold 755x1000@2 + iPad 1180x820@2, HOST mode, node dev/test/nrask-shots.js; CDN upload not used: 401 in this container; scratch only, deleted after the verdict)
Picks: nc_su_7:0 peer · td_an_7:1 QUEEN · ch_co_5:0 peer · thd_hoc_8:1 peer · cnv_mat_9:0 peer (10 offer + 10 tab shots). Looked at them: kit j72 offer card + kit option cards (Tốn/Thành/Bại rows, ladder words Khó/Năm ăn năm thua/Khá chắc/Chắc), no overflow, no raw slot, no cut text, no page errors, both devices.
Seen faults: **td_an_7 queen offer** = Hoàng hậu Chu Bạch Lộ says «… sắp vu cho bổn cung tội trộm đồ. Trung cung sẽ phải xử. Muội muội thưa trước với Hoàng hậu, để bà nghe bổn cung …» (fix 6). **cnv_mat_9** «Từ tớ thành chủ …» (fix 1; the script can only cast a consort asker, the real asker is a maid with «nô tỳ»). Script «FAIL» on ch_co_5 tab = fix 7 (label text «cung ngươi» shown as «cung ta»). SHOTS FAIL 2 = these, not layout.
Maid voice (cnv, nô tỳ/tiểu chủ) not shot by nrask-shots (consort askers only); engine test renders every ask in 2 consort voices.

## Re-review
Text-only fixes 1–5, 7 on jnrask_b.js (rerun nrask-scan + nrask-engine; no quickcheck needed for text) + fix 6 in the q1a engine (with an nrask-engine check) → a SMALL re-review of the diff only.

## ROUND 2 — reviewer E7br2 (opus), 18/11 ~07:40Z — review/questline-q1b 2b80a8a3
PRIORITY #1 CHECK ('questline-q1'): OD 0 new | ledger 0 | claims E7a/E7b/E7c2 + reviewers of this slice | main 0 (no NRASK on main) | review/* questline-q1a 54f10e8 · q1b 2b80a8a3 · q1c 99aa2c5 (the three under review) | archive 0. START_CTX ≈ 4 % (own estimate; get_session read 0).
Setup: LOCAL merge origin/main 09b1bba + q1c 99aa2c5 (carries q1a 54f10e8) + q1b 2b80a8a3 (assemble.py: jnroadm → jnrask → jnrask_b → jnrask_m; index.html/sw.js rebuilt by build_site.sh). Not pushed.
Scope: whole jnrask_b.js re-scanned (120 chapters, 240 asks, h + 4 label/loss lines each) per prior family, plus the new {B}-free rule and the 7 reworded asks (diff f990dce..2b80a8a), against engine nrAskPick/NRSELF/tx in jnroad.js (q1a).

### VERDICT: FAIL 2b80a8a3 (2 small text fixes; everything else holds)
Prior items, whole-family re-scan of the file:
| item | family | now | result |
|---|---|---|---|
| 1 | cnv maid asker reads as risen/consort; label vs loss go-between | 0 (cnv_mat_9 both asks read as a maid; «cung {me} hầu», «sổ thị tẩm» fit cnv_mat) | OK |
| 2 | modern word | 0 («chính phủ» gone; «lớp/năm học» = jrd_thd.js canon on main) | OK |
| 3 | loss line reads as thanks | 0 | OK |
| 4 | hh ask on a matter not the Trung cung's | 0 of 25 hh asks (each names a real Trung cung act: seal, seating, search order, thỉnh an order, tra/khám) | OK |
| 5 | player's family/people/past stated as fact | 1 left → fix 1 | FAIL |
| 7 | label in the asker's voice / «ngươi» | 0 (no slot, no ngươi in 480 labels) | OK |
| new | every chapter keeps ≥1 {B}-free ask | 120/120; no do-ask without {B}; two asks of a chapter never share a kind (120/120); no typed tỷ/muội/bổn cung/nô tỳ; slots only | OK, but one reworded ask is unplayable → fix 2 |

### Fixes (numbered)
1. **jnrask_b.js:181 thd_tho_8[0] (hh)** «{call} từng nghe {me} ngâm bài ấy từ lâu.» states a shared past the game never had (HANDOVER L46 true information; same family as item 5 — the fix-1 scan looked for family/servants/doctor only, not shared past). Make it conditional or a request without the claim (e.g. «Nếu {call} từng nghe {me} ngâm bài ấy…», or ask the player to have the Trung cung check the paper/date instead).
2. **jnrask_b.js:393 ch_co_8[1] (emp, reworded for the {B}-free rule)** «… ra tay với một người trong cung … {Call} khéo để Hoàng thượng đến thăm người ấy mấy hôm» + label «Khéo mời Hoàng thượng ghé thăm người bị nhắm đến»: the ask never says who, so the player cannot do it; and when hasB is false because the rival IS the player (nrRival meOk), «người ấy» is the player herself. Reword so the ask needs no target (e.g. the asker asks to be kept near the Hoàng thượng / given a duty away from Đức Thọ cung so cô mẫu cannot use her); label + loss line to match. The other 6 rewordings (td_song_6, thd_tro_6, td_an_7, td_tha_6, thd_tho_5, thd_hoc_6) read right with or without a rival.

### Cross-file (not q1b's fault; for Foreman E)
- **nrask-scan FAILS on the merged tree**: `ksp_so_10[0]` label «Nói với Hoàng thượng ngươi tin sổ ấy» (jnrask_m.js:286, q1c) trips the «ngươi in labels» check that q1b fix 7 added to nrask-scan. q1c owes «… rằng mình tin sổ ấy» (or the scan must exempt men askers — Foreman's call); q1b+q1c cannot land together until one of them changes.
- Engine note for q1a (not blocking q1b): nrOffer lets an NPC whose rival is the player (nrRival meOk) ask the player for help; then hasB=false and the anonymous {B}-free asks («kẻ tố», «một người trong cung») point at the player. Consider no help offer when riv===S.
- Info: 14 q1b chapters have only an hh ask + a {B} ask (nc_su_8, td_an_7, td_tha_5, ch_co_10, ch_bi_8, thd_tho_8, cnv_ban_5/8/10, cnv_mat_9, cnv_ma_6/7 …); a queen asker or a queen player with no real rival gets the stock card there (engine fallback by design, true text). Fine.

### Tests (merged tree)
| test | result |
|---|---|
| build_site.sh | built |
| node dev/test/nrask-scan.js | 636 asks (96+120+102 chapters), 9 origins 24/24 — **1 FAIL = ksp_so_10 (q1c, above)**; 0 fails in jnrask_b |
| node dev/test/nrask-engine.js | ALL PASS (checks 7 queen never hh / Thái y never y, 8 kAddr voices + men by trade, 9 no {B} without rival, fallback, old saves, no page errors) |
| node dev/test/nrask-m-scan.js | PASS |
| bash dev/tools/quickcheck.sh | QUICKCHECK PASS · core gates PASS · old save ok · perf new/live render 215/231, tab 440/419, buổi 1111/1268 ms |
| own scans | 240 asks: kinds thu 34 · do 60 · emp 44 · che 37 · y 17 · hh 25 · th 23 (never bac); h ≤ 235 chars, label ≤ 56; 0 digits/% |
ONE CORE: no number in jnrask_b.js (costs/odds stock BAL.nroad.*). Kit: data only, j72 card + kit option cards, no CSS.

### Shots (node dev/test/nrask-shots.js, HOST; Fold 755x1000@2 + iPad 1180x820@2; scratch /home/user/wt/e7br2-shots, deleted after verdict; CDN not used)
thd_tho_8:1 (do) and ch_co_8:1 (emp), offer + Việc nhờ tab, 8 shots, looked at: kit j72 offer card (VIỆC chip, title «Phụ tuyến · Quý phi … · Chương 8 … · Lời nhờ (1 bước)», 1-step box, Nhận lời / Khéo từ chối option cards), tab with kit option rows Tốn/Thành/Bại + ladder words Khá chắc / Khó; Quý phi speaks «bổn cung» to a lower player who is «Muội muội» (kAddr right); no overflow, no raw slot, no cut text, no page errors. The ch_co_8 offer shows fault 2 on screen («… đến thăm người ấy mấy hôm» with no one named). SHOTS OK.

### Re-review
Text-only: fixes 1–2 in jnrask_b.js → rerun nrask-scan (after q1c's ksp_so_10) + nrask-engine; a SMALL diff-only re-review is enough.

# ROUND 3 — reviewer E7r3 (opus, ONE reviewer for q1a + q1b + q1c), 18/11
PRIORITY #1 CHECK ('questline-q1|NRASK|NRQX|nrAskPick'): OD 0 new | main none (no NRASK on main 9c58140) | review/* questline-q1a a615eb7 · q1b 2f79ae26 · q1c b013ddf (the three under review) | claims E7a2 / E7b / E7c2 (this slice)
START_CTX ≈ 3 % (own estimate).
Setup: LOCAL merge origin/main 9c58140 + q1a a615eb7 + q1b 2f79ae26 + q1c b013ddf (not pushed). **q1a is NOT on newest main any more** (main moved b2a9d34 → 9c58140: place-stage / map-tap-go); only conflict = assemble.py list (main added jplst.js; kept it + jnroadm → jnrask → jnrask_b → jnrask_m) and generated index.html/sw.js (rebuilt with build_site.sh). The landing sha must be rebased on main again.
Method: own NRASK dump of all 636 asks (318 chapters) + whole-family scans across ALL three files (one reviewer → one standard), engine code read (jnroad.js:100–131), tests, shots.

## VERDICT: q1a FAIL · q1b FAIL · q1c PASS
One cross-file family is open: **time words vs the card deadline** (j72 card prints «hạn 6 tuần», BAL.nroad.dl, j72.js:142). Round 2 made this a FAIL family for q1c (E7cr2 fix 2: «rằm», «mồng một», a future span shorter than the deadline) and q1c fixed it + put the rule in nrask-m-scan (men only). The SAME words stand in q1a and q1b data (LUẬT SỬA CẢ NHÓM: the family is the whole help-ask set, not one file). Seen on screen: cn_chu_10#1 Fold offer reads «Đêm mai bổn cung phải đến gian trà nhỏ…» directly above the chip «hạn 6 tuần».
Rule (same as q1c's): no fixed date (đêm nay / tối nay / sáng mai / ngày mai / đêm mai / «Mai …» / rằm / Tết / cuối tháng) and no future span shorter than the deadline («N ngày nữa», «mấy hôm nữa», «trong ba ngày», «trong một tháng»). Kept as fine: event-relative «trước khi …», «trước kỳ khóa sổ», «đêm hẹn», past spans («đã nửa tháng», «ba năm trước»), spans longer than the deadline («ba tháng nữa»), durations of the ask itself («nới hạn thêm một tháng», «hoãn thuế một năm»).

## Tests (merged tree, built)
| test | result |
|---|---|
| node dev/test/nrask-scan.js | ALL PASS · 636 asks, 318 chapters, 1272 labels/loss lines (no rule for time words outside the men file → gap, see q1a fix 2) |
| node dev/test/nrask-m-scan.js | PASS (204 asks) |
| node dev/test/nrask-engine.js | ALL PASS (1–9, 7b, 7c: 92 chapters with queen-naming asks, 2208 draws queen asker + queen player → 0; live queen offers 0; other askers still draw them, 91 chapters) |
| bash dev/tools/quickcheck.sh | QUICKCHECK PASS first run · 408 s · core gates PASS (kit-conform green, no G3 tutorial float this time) · time-spill PASS · open 1556 ms · old save ok · perf new/live render 185/185, tab 387/427, buổi 954/1032 ms |
| own scans | chapters with no {B}-free ask 0/318 · non-hh asks naming the queen 37 (all filtered for a queen asker / player) · chapters left with no ask for a queen asker or player → stock card: 22 (63 when also no rival; engine fallback by design) · «ngươi» in labels 0 · time-word family: q1a 8 asks, q1b 18 asks, q1c 0 |
| shots Fold 755x1000@2 + iPad 1180x820@2 (nrask-shots / nrask-m-shots; local scratch, deleted with this verdict; not in git, CDN not used) | SHOTS OK on all 24 (no overflow, no raw slot, no page error). LOOKED: cn_chu_10#1 offer (Fold) shows the time-word fault above «hạn 6 tuần»; cn_chu_10 tab (iPad) kit option rows Tốn/Thành/Bại + Năm ăn năm thua / Khá chắc; ch_co_8#1 (Fold) «Xin muội muội khéo tiến cử bổn cung hầu ngài ở Ngự thư phòng ít lâu» reads right, no target needed; thd_tho_8#0 (iPad) asks for the paper/ink check, no shared past; ksp_so_10 tab (Fold) label «Nói với Hoàng thượng mình tin sổ ấy», ladder Khó / Chắc; gd_tinh_5#1 (iPad) «đêm hẹn», Thị vệ «nô tài … tiểu chủ», rival veiled «Vương gia ???». Kit j72 card + KIT §6.2 option cards only, no private CSS |
ONE CORE: no number typed in any jnrask*.js (scan: no digits); costs / odds / deadline stock BAL.nroad.*. Old saves: engine test 5 PASS (no p.av → stock), missing entry → stock card (test 4).

## q1b — FAIL 2f79ae26 (round 2 fixes HOLD; one cross-file family open)
| round 2 item | check | state |
|---|---|---|
| fix 1 thd_tho_8#0 (hh) | asks the player to have the Trung cung check the paper and ink; no shared past (iPad shot read) | FIXED |
| fix 2 ch_co_8#1 (emp) | asks to be recommended to serve at Ngự thư phòng so cô mẫu cannot send her; needs no target, reads right when her rival is the player (Fold shot read) | FIXED |
| family «player's past / standing as fact» | own scan of every sentence with {call}/{Call} + từng / được gần / được hầu / được ngồi / nghe lời / hiểu ý / thân với / quen biết / được sủng …: jnrask_b.js 0 claims left (nc_gian_7#0 «Lúc {call} hầu ngài, xin…» and td_song_10#1 «{Call} vào hầu, nhắc bà…» are requests, fine) | FIXED 10 → 0 |
| rebase | on q1a a615eb7; diff vs q1a = jnrask_b.js + assemble.py + generated files only | OK |

### Fixes (numbered)
1. **Time words vs «hạn 6 tuần» (family of q1c round-2 fix 2), 18 asks in jnrask_b.js** — reword each without a fixed date / a span shorter than the deadline; labels + loss lines to match:
   - :18 nc_gian_6#0 «Trước rằm» · :24 nc_gian_9#0 «mười ngày nữa thì bị thẩm» · :26 nc_gian_10#0 «đêm nay ngài gọi {me}» · :31 nc_su_6#0 «mười ngày nữa là Vạn thọ» · :59 nc_vuong_7#0 «đến cuối tháng»
   - :101 td_song_8#0 «trong một tháng không có thuốc tốt» (a limit shorter than the deadline, = q1c st_uoc_10)
   - :409 ch_benh_9#1 label «… đóng dấu ngay đêm nay» · :145 ch_benh_10#0 «Đêm nay Thái y viện nói là đêm quyết» · :410 ch_benh_10#1 «Đêm nay là đêm quyết»
   - :171 ch_bi_10#0 «… một đêm, sáng mai {me} sẽ quyết» · :437 ch_bi_10#1 label «Sai người canh cửa Ngự sử đài đêm nay»
   - :185 thd_tho_10#0 «mấy hôm nữa thì dán» · :198 thd_sach_10#0 «Mai cha {me}… Đêm nay» · :462 thd_sach_10#1 «Ngày mai cha {me} quỳ»
   - :238 cnv_chu_10#0 «Đêm nay {me} bị giải» · :267 cnv_ma_5#0 «trong ba ngày» · :271 cnv_ma_7#0 «bảy ngày nữa tra» · :273 cnv_ma_8#0 «Ba ngày nữa là chung thẩm»
   Then rerun nrask-scan with q1a's new shared time rule (q1a fix 2) on the q1a+q1b+q1c merge: ALL PASS.

### Re-review
Text-only: diff of jnrask_b.js + nrask-scan / nrask-engine on the merge.

# ROUND 4 — reviewer E7r4 (opus, delta re-review of q1a + q1b + q1c), 18/11
PRIORITY #1 CHECK ('questline-q1'): OD 0 | main 0 (no NRASK on main a2ad240) | review/* questline-q1a 90796d3 · q1b 7f12b48c · q1c 154506f (the three under review) | claims E7a2 / E7b / E7c2 (this slice)
START_CTX ≈ 3 % (own estimate).
Setup: LOCAL merge origin/main a2ad240 + q1a 90796d3 + q1b 7f12b48c + q1c 154506f (not pushed). Only conflict: assemble.py list (q1b and q1c both add after jnrask.js) → jnroadm → jnrask → jnrask_b → jnrask_m, jplst.js kept; index.html/sw.js rebuilt with build_site.sh.
Method: read EVERY h / label / loss line of all three data files for the family, with my own sweeps beyond the shared regex: fixed dates, festivals/seasons, «(sáng|chiều|tối|trưa|đêm|ngày|hôm) (mai|nay|kia|mốt)», «tuần/tháng/năm sau», N ngày|đêm|hôm|tuần|tháng, bare «mai», and hour-scale words (từ chiều, trưa, trước giờ, giờ ấy, cửa cung đóng, canh, khắc, kiệu sắp, ngay, lập tức). Festivals / «cuối năm» / «đầu xuân» checked against the road text on main (jrd_*.js): every one is the chapter's own scene (tt_tranh_10 «bữa gia yến cuối năm», muoi_lau_5 «trước kỳ Diêm vận ty đốt sổ cũ cuối năm», nc_su «Sương giáng», nc_tuc_5 «Nguyên đán», nc_tuc_9 «Phật đản», ch_bi «Thanh minh», td_ke_10 «Triều hội đầu xuân», muoi «yến Trung thu») → allowed.

## VERDICT: q1a FAIL · q1b FAIL · q1c rebase OK
The time-word family is NOT gone as a whole family: 1 fixed date the shared scan does not catch («chiều mai», q1b) and 3 hour-scale deadlines («before the palace gates close tonight», «the palanquin is at the door / fever since this afternoon»), each shown directly above the chip «hạn 6 tuần».

## Tests (merged tree, built)
| test | result |
|---|---|
| node dev/test/nrask-scan.js | ALL PASS · 636 asks, 1759 sentences, 1272 labels / loss lines — but misses «chiều mai» (regex gap, q1a fix 2 below) |
| node dev/test/nrask-m-scan.js | PASS (204 asks) |
| node dev/test/nrask-engine.js | ALL PASS (1–9, 7b, 7c; NRSELF 648 queen offers) |
| bash dev/tools/quickcheck.sh | QUICKCHECK PASS first run · 397 s · core gates PASS (no G3 tutorial float) · time-spill PASS · open 1513 ms · old save ok · perf new/live render 210/182, tab 369/396, buổi 943/1023 ms |
| shots Fold 755x1000@2 + iPad 1180x820@2 (nrask-shots; tt_co_10:1, cn_chu_10:1 from q1a; td_ke_9:0, cnv_mat_8:0 from q1b; local scratch, deleted; not in git, CDN not used) | SHOTS OK ×16 (no overflow, no raw slot, no page error; kit j72 card + KIT §6.2 option rows). LOOKED: cn_chu_10 (Fold tab + iPad offer) «Đêm hẹn ở gian trà nhỏ năm xưa» = round 3 fault fixed; td_ke_9 Fold offer «…đến Ngự hoa viên vào chiều mai» above «hạn 6 tuần»; tt_co_10 iPad offer «…phải ra khỏi cung trước khi cửa cung đóng» above «hạn 6 tuần»; cnv_mat_8 iPad offer «Kiệu sắp đến cửa… chỉ bảo bổn cung trước giờ ấy» above «hạn 6 tuần» |
| rounds 1–3 | no regression: NRQX queen filter + 7c, {B}-free ask per chapter (scan), «ngươi» in labels 0, player's-past family 0 (q1b), no digits in jnrask*.js (ONE CORE) |
| q1c 154506f | `git diff b013ddf 154506f` on jnrask_m.js / nrask-m-scan.js / nrask-m-shots.js = empty; assemble.py only gains main's jplst.js → rebase only, data unchanged; PASS b013ddf stands |
| q1a branch | `git log origin/main..90796d3` = 8 q1a commits only, origin/main a2ad240 is its ancestor |

## q1b — FAIL 7f12b48c (the 18 asks of round 3 + 15 more reworded, read each: fixed; family not closed)
| round 3 item | state |
|---|---|
| the 18 listed asks (nc_gian_6/9/10, nc_su_6, nc_vuong_7, td_song_8, ch_benh_9/10, ch_bi_10, thd_tho_10, thd_sach_10, cnv_chu_10, cnv_ma_5/7/8) | FIXED (read each; «sắp …», «chờ ngày tra», «đóng dấu cho kịp», «Ngày xét án»; nc_gian_10 «trước giờ ấy» = before the emperor's summons, event-relative, fine) |
| whole family | NOT CLOSED — 3 asks below |

### Fixes (numbered)
1. **jnrask_b.js:90–91 td_ke_9#0** — «{call} xin ngài đến Ngự hoa viên vào chiều mai» (a fixed date; seen on the Fold offer above «hạn 6 tuần»; the shared regex misses it — q1a fix 2). Reword event-relative, e.g. «…vào đúng buổi bẫy sập»; label «Mời Hoàng thượng dạo vườn vào giờ ấy» then fits.
2. **jnrask_b.js:260 cnv_mat_8#0** — «Kiệu sắp đến cửa, mà {me} không biết một phép nào của đêm hầu giá… chỉ bảo {me} trước giờ ấy» — the palanquin is at the door = minutes, under a 6-week deadline (seen on iPad). Reword to the scene without hour-scale, e.g. «Đêm hầu giá đầu tiên đã định, mà {me} không biết một phép nào… chỉ bảo {me} trước đêm ấy».
3. **jnrask_b.js:523 cnv_mat_8#1** — «Kiệu sắp đến, mà {me} sốt nhẹ từ chiều» — same family («từ chiều» pins now to this afternoon). E.g. «Đêm hầu giá đã định, mà mấy hôm nay {me} sốt nhẹ»; label/loss lines to match.
Then rerun nrask-scan with q1a's widened TIME rule on the q1a+q1b+q1c merge: ALL PASS.

### Re-review
Text-only: diff of jnrask_b.js + nrask-scan on the merge.

# questline-q1b — help hồi asks for the nc · td · ch · thd · cnv roads (E7b, Foreman E)
PRIORITY #1 CHECK: OD L644/L1072/L1243/L1252/L1601 (brief) | main dev/build/jnroad.js nrOffer/nrKind + 8 stock nr_* cards (reused, untouched) | review/* none for NRASK (prio1.sh "NRASK nrOffer": OD 0 · ledger 0 · claims 0 · main 0 · review/* 0) | claims E7a/E7c siblings only. START_CTX ≈ 3 % (get_session read 0; own estimate), depth 1.

## What
- Branch `review/questline-q1b` @ **344e1e92** (from main a95e8d4): `dev/build/jnrask_b.js` (data only) + one assemble.py line + generated site.
- `NRASK[<chapter id>] = {k, h, o}` for **120 chapters** = every help chapter (.5–.10, BAL.nroad.helpN) of the 20 roads of nc (gian/su/tuc/vuong), td (an/ke/song/tha), ch (co/benh/ho/bi), thd (tho/sach/tro/hoc), cnv (chu/ban/mat/ma).
  - `k` = a stock kind (emp 19 · th 13 · hh 12 · thu 23 · do 27 · y 7 · che 19; **never «bac»**) chosen for THAT chapter's ask (not only from the cast key): it reuses the stock costs/odds/sk (BAL.nroad.op/.bac/.suc/.dl), no number in the file.
  - `h` = the ask in the asker's voice about the chapter's own conflict, from the H1 writer kit (B2 shapes K1–K7 + origin rows: nc custom/letters/envoy, td old case/witness/brother, ch the reverse ask against Cô mẫu's orders, thd poems/books/exam/teaching, cnv nô tỳ asks).
  - `o` = two [label, loss line] pairs **in the stock card's option order** (emp/th/hh/che: Sức road, bạc road; thu/do/y: bạc road, Sức road); betray option stays stock. Money only as a cost.
- Slots only, no typed pronoun: `{me}` `{Me}` `{call}` `{he}` `{B}`. `{call}` should be lowercase mid-sentence and capitalised at a sentence start (my local hook does this). Chapter cast tokens ({land} {pa} {n1} {foed}) never used. cnv lines never name the maid's mistress (she may be the player).
- assemble.py: `jnrask_b.js` sits right after `jnroadm.js` now; when q1a lands with `jnrask.js` it must be **after jnrask.js** (rebase fix: one word).

## FOR E7a / engine (format sent to E7a by send_message 05:2xZ; no reply yet)
The engine must: look up `NRASK[ROAD14[x.p.nr][x.p.nn]]`; use `e.k` in nrKind/nrOffer (else stock kind); fill `h` and `o[i][0]` / `o[i][1]` into the stock card's `h`, `s[0].ch[i].n`, `s[0].ch[i].lx`; slots as above. My stand-in is `dev/handover/shots/questline-q1b/hook-local.js` (NOT pushed to the game branch). If q1a's shape differs, I convert the file (mechanical).

## Tests
- `quickcheck.sh` **PASS** (316 s; core gates PASS: one-core-guard, rules-one-source, kit-conform, coop one-world, hooks; old save ok; perf new/live render 170/139, tab 376/293, buổi 854/864 ms — within noise of a data-only change).
- `test-b.js` (with the local hook): 120 entries · 336 cards rendered through PEND.q72o + q72Card · askers lower consort / higher consort / Hoàng hậu / trusted maid / other maid · **faults 0 · page errors 0**. Checks: chapter exists, kind used, self-word right per asker (muội/tỷ/bổn cung/nô tỳ), no raw token, no %, no lowercase start / after a full stop, both option labels on the card.
- Variety scan (node, all of jnrask_b.js): 0 shared sentence between any two asks; 0 duplicated option label (8 repeats found and rewritten); 0 unknown token; 0 digit/%.

## Shots (CDN upload refused: cdn_sync HTTP 401; git refuses images) — PNGs in worker scratch /home/user/wt/q1b-shots/ (shared container); else rerun dev/handover/shots/questline-q1b/shots-b.js <build url> <dir> (needs hook-local.js until q1a lands)
Files: `td_song_8-755x1000.png`, `td_song_8-1180x820.png` (Quý phi asks: «Em trai tỷ trúng tên…», kit j72 card), `cnv_ban_7-755x1000.png`, `cnv_ban_7-1180x820.png` (trusted maid: «… Nô tỳ không có đường đến Thái y viện. Tiểu chủ cứu nàng ta một lần.»). Looked at all four: kit card, no overflow, no cut text. (Portraits show «Đang thỉnh tranh» only in the file:// build.)

## Notes
- nc and the cnv askers: NPC consorts never draw nc today (BAL.nroad.org has no nc); the nc rows are ready if that changes. cnv askers are only maids (nrMInit).
- The step title (s[0].n, e.g. «Mời thái y xem kín») stays stock — the brief's spec has no step field.

## ROUND 2 (18/11 ~06:40Z) — rebased on q1a + converted to its engine shape → **255f5b2a**
- Branch `review/questline-q1b` rebased on `review/questline-q1a` 1b6005a (force-with-lease, own branch). assemble.py: `jnrask_b.js` right after `jnrask.js`.
- Converted to q1a's shape: entries are lists, h without outer “ ” (engine adds them), slots {me}{Me}{call}{Call}{he}{B} as nrAskOf.
- nrask-scan rules met: **second ask written for all 120 chapters** (240 asks, 2 per chapter, mostly a different kind/shape than the first); every «do» ask names {B} (19 first asks rewritten); no typed «mình»/«em» (td_song «em trai» → «tiểu đệ»); 0 shared sentence / label / loss line across jnrask.js + jnrask_b.js.
- Tests: **nrask-scan ALL PASS** (432 asks, 9 origins 24/24 each) · **nrask-engine ALL PASS** (864 cards both voices, fallback, old saves, play/betray) · **quickcheck PASS** (336 s; core gates PASS; perf new/live render 158/175, tab 373/332, buổi 844/997 ms).
- Not re-shot (text-only change on the same j72 card; q1a's nrask-shots covers the card on Fold/iPad). Maid voice (cnv, nô tỳ/tiểu chủ) was checked in round 1 with the same slot meaning.

## FIX 1 (18/11 ~07:00Z) — review FAIL 255f5b2a (reports/questline-q1b-review.md) → **53c08086**
Items 1, 2, 3, 4, 5, 7 fixed; item 6 is the engine (E7a/E7ar: a queen asker must never get an hh ask / stock nr_hh — q1b needs no data change, every chapter has a 2nd ask of another kind).
LUẬT SỬA CẢ NHÓM — scan of all 240 q1b asks per fault family (script: node /home/user/wt/q1b-scr/fam.js dev/build/jnrask_b.js + a wide «nhà {call} / {call} có / {call} quen» sentence scan):
| family | before | after | fixed |
|---|---|---|---|
| F1 maid asker reads as risen / consort (cnv) | 2 | 0 | cnv_mat_9[0] (now: roommates' envy, asks a room change via Trung cung), cnv_mat_9[1] (winter clothes cut after the summons) |
| F1b label and loss line name different go-betweens | 1 | 0 | cnv_mat_9[0] o2 (nữ quan both) |
| F2 modern word | 1 | 0 | cnv_ban_10[0] «chính Nội vụ phủ» |
| F3 loss line reads as thanks («ghi … vào lòng») | 2 | 0 | ch_co_9[0] «để bụng ngươi», td_ke_10[1] «ghi hận ngươi» |
| F4 hh ask: Trung cung «decides» a matter that is not hers | 2 | 0 | ch_ho_5[0] (thỉnh an order at Khôn Ninh cung, which cô mẫu copies), ch_ho_10[1] (seating at the six-palace banquet) |
| F5 true info: player's family / servants / doctor friend stated as fact | 14 | 0 | nc_su_9[0], nc_vuong_6[0], td_song_9[0], thd_hoc_9[0] (review) + same family: nc_gian_9[1], nc_su_6[0], td_ke_6[0], td_song_8[0], ch_benh_6[0], ch_benh_8[1], ch_ho_6[0], thd_sach_8[0], cnv_chu_5[0], cnv_ma_10[0] → «Nếu …» / «… có quen … không?» |
| F7 option label (player's voice) says «ngươi» | 1 | 0 | ch_co_5[0] «cung mình»; nrask-scan now fails any label with «ngươi» |
Tests: nrask-scan ALL PASS (432 asks) · nrask-engine ALL PASS · quickcheck PASS (337 s; core gates PASS; perf new/live render 154/168, tab 336/361, buổi 774/788 ms).
Not blocking note kept for later polish: the «do» asks lean on the dò-la shape.

## REBASE (18/11 ~07:20Z) on q1a ed01a6b (NRSELF engine fix, review item 6) → **b34eaedd**
Data unchanged from 53c08086. nrask-scan ALL PASS · nrask-engine ALL PASS incl. check 7 (648 queen offers, never hh) · quickcheck PASS (334 s).

## REBASE 2 (18/11 ~07:45Z) on q1a 54f10e8 (fix r2: kAddr address, {B}-skip, hh/queen, dup-key) → **2b80a8a3**
New rule: an ask naming {B} is not drawn without a rival. Scan: chapters whose asks ALL name {B} 7 → 0 (reworded the non-do ask of td_an_7, td_song_6, td_tha_6, ch_co_8, thd_tho_5, thd_tro_6, thd_hoc_6). Typed tỷ/muội in asks: 0. nrask-scan ALL PASS · nrask-engine ALL PASS · quickcheck PASS (362 s).

## FIX 2 (18/11 ~08:05Z) — review ROUND 2 FAIL 2b80a8a3 → **44b7805f** (pushed; waits for E7a2's q1a sha to rebase, then one SẴN SÀNG KIỂM)
- Fix 1 thd_tho_8[0] (hh): no shared past; she asks the player to have the Trung cung check the paper and ink of the pages; labels/loss lines match.
- Fix 2 ch_co_8[1] (emp): needs no target and reads right when her rival is the player: she asks to be recommended to serve at Ngự thư phòng, so cô mẫu cannot send her; labels/loss lines match.
- Whole family «the player's past / standing stated as fact» (scan: every sentence with {call} + từng/được gần/được hầu/được ngài nghe lời/hiểu ý …): before 10 → after 0. Fixed: thd_tho_8[0], td_an_9[1] («Có khi {call} đoán ý …»), and 8 «{call} được gần ngài / được ngài nghe lời / được hầu bên ngài / được ngồi gần ngài» → «Lúc {call} hầu ngài …» / «Nếu có dịp hầu ngài …» (nc_gian_7[0], nc_su_7[0], td_an_8[0], td_ke_6[1], ch_benh_10[0], thd_tho_7[0], thd_sach_9[0], thd_tro_8[0]).
- nrask-scan ALL PASS on q1a+q1b (the merged-tree fail ksp_so_10 is q1c's label, for Foreman E) · nrask-engine ALL PASS.
- REBASE 3 (18/11 ~08:20Z): FIX 2 rebased on q1a a615eb7 (main b2a9d34) → **2f79ae26**. nrask-scan ALL PASS · nrask-engine ALL PASS (incl. 7c NRQX) · quickcheck PASS (436 s). SẴN SÀNG KIỂM sent.

## FIX 3 (18/11 ~08:40Z) — review ROUND 3 FAIL 2f79ae26 → **147a268b** (pushed; waits for E7a2's q1a sha with the shared TIME rule, then one SẴN SÀNG KIỂM)
Family «time words vs the card deadline (hạn 6 tuần, BAL.nroad.dl)» — scan of every h / label / loss line of all 240 asks (/home/user/wt/q1b-scr/time.js: fixed dates đêm nay/tối nay/sáng mai/ngày mai/Mai/rằm/mồng/Tết/cuối tháng/cuối năm/cuối xuân/canh …, spans N ngày|hôm|đêm nữa, trong N ngày|tháng, mấy hôm nữa, trước khi trời sáng, ngay trong đêm, festivals):
| | before | after |
|---|---|---|
| fixed date or span shorter than the deadline (the review's 18 asks) | 18 asks | 0 |
| same family beyond the review list: «cuối năm» ×5 (td_an_8 ×2, td_song_9 ×2, ch_ho_8), «cuối xuân» (thd_hoc_7), «Đêm trước Thanh minh» ×2 (ch_bi_10), «trước khi trời sáng» ×2 (cnv_chu_8, cnv_ban_7), «sáng nay» (ch_ho_6) | 11 asks | 0 |
| kept (rule: event-relative / past / the ask's own scene): «trước tiết Sương giáng», «dịp/lễ Vạn thọ đã gần», «lễ Nguyên đán», «lễ Phật đản», «trước tiết Thanh minh», «đêm giỗ» (td_tha_9 = the chapter's own scene, like «đêm hẹn»), «ngày giỗ tiên đế» (a hypothetical choice of day), «mấy hôm nay» (past) | 15 hits | 15 (fine) |
Wording: «sắp …», «chờ ngày tra», «không sớm có thuốc», «đóng dấu cho kịp», «ít hôm», «ngày xét án», «cho kịp kỳ phát áo mùa»; labels + loss lines match.
nrask-scan ALL PASS · nrask-engine ALL PASS (on q1a a615eb7). Next: rebase on E7a2's new q1a (shared TIME rule in nrask-scan), make it PASS, quickcheck, then SẴN SÀNG KIỂM.
- FIX 3b (18/11 ~09:00Z): rebased on q1a 90796d3 (shared TIME rule in nrask-scan) → **7f12b48c**. The shared scan caught 4 more of the family (nc_gian_9[1] / nc_tuc_6[0] / cnv_ban_9[1] bare «mười ngày», td_an_9[1] «Ngày giỗ») → reworded; family total 33 → 0. Kept: durations of the favour itself (mượn mấy hôm, thêm một đêm, xin hoãn một ngày). nrask-scan ALL PASS · nrask-engine ALL PASS · quickcheck PASS (378 s). SẴN SÀNG KIỂM sent.

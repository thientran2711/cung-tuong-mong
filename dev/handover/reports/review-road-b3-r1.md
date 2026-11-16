# Review road-b3 r1 — review/road-b3 bcc79551 (thd + cnv roads .5–.11, 8 rare finales, jend14 ch12–14)
Reviewer: Foreman B reviewer (session_01N1tNP5xkQQ97yrv7pUMVL9), coordinator Foreman B s7. START_CTX ~4 % of a 1M window.
Read: REVIEWER.txt, PREAMBLE.txt, START_CORE/WORKER/REVIEWER, topic story-roads + wording + balance (gain-and-loss lines), reports road-b3,
review-road-map-r1, review-road-b1-r1, road-history (pass 1 + pass 2); jend14.js in full by me; jrd_thd.js / jrd_cnv.js read in full by two
reader agents (one per file), every BLOCKING hit below re-checked by me on the code; own scans (x-beat dominance, inverted e:, hh guards, VANPHONG words).

Merge: `review/road-b3-r1` = origin/review/road-b3 bcc79551 + origin/main e987508d + origin/review/road-map-next **d69d6d24** (engine moved:
origin ending told when .11 cannot run). Conflicts: assemble.py (main's list + jst14/jroad/jrd_tt/jrd_thd/jrd_cnv/jend14 after j67), jbal2.js
(both blocks), assets.json (main's; B3 adds no art, assets.py gives main's v), index.html/sw.js rebuilt. Head after my fixes: **0426e7bb9b9c7eba8094635a91004c8180ef1f28** (descends origin/main e987508d), pushed.
Note: the branch still carries story14-p1-r2 (Foreman C) → cannot reach main before C's story14 PASS.

## VERDICT: FAIL (9 items + coop blocker 10). Items 1–6 are the SAME PATTERN flaws as review-road-b1-r1 (fix with B1's family, one rule, one scan).

1. **Climax dominance (gain-and-loss OD:L582/L478; b1-r1 item 2).** Scan (base odds of the safe `e:["win","mid"]` ≥ base of the bold
   `e:["win","lose"]` at ≤ cost): **34 of 56** road x beats + **3 of 3** endgame x beats (noi14/hau14/ke14 x1: safe and bold have the same
   base 40/35 and the same Sức cost). Worst: thd_tho_10, thd_tro_8, thd_tro_10, thd_hoc_5/9/10/11, cnv_mat_6–11, cnv_ma_5/6/8–11 (safe is
   FREE at 40–45 vs bold 30–35 with a cost). Strictly dominated (reader, re-checked): cnv_ban_5 x1 «Báo Nội vụ phủ xử theo phép» vs «Giữ
   tang vật», cnv_ban_8 x1 «Chỉ làm chứng về Phúc An» vs «Để Xuân Đào tự nói», cnv_ma_7 x1 «Khai ít» vs «Cáo bệnh», cnv_chu_5 x1 «Lén cho {v}
   biết» vs «Giữ trong lòng». Free fixed `e:"mid"` with a gain beside a costly option (13 in thd: tho_10, sach_5/8, tro_5/6/8/9/10/11,
   hoc_5/6/7/10). Fix rule = b1-r1 item 2 (bold base ≥ safe base + 10 OR the safe one carries a real cost); add the check to road-option-scan.
2. **Rare finales.** (a) ENGINE (b1-r1 item 1a, owner = engine successor, not B3): RD97L never gets `E.r97` → all **8 B3 finales** (4 thd +
   4 cnv) pay the ✦ cost and give a plain win. (b) B3 content: `path` lists unreachable — thd_tro_11 **0/8** and thd_hoc_11 **0/9** entries
   match a .11 non-climax option (they name .5–.10 options / x1 options; j97 counts only the .11 thread's own s/c/t picks); thd_tho_11 and
   thd_sach_11 OK (6 hits). (c) cnv_ma_11 rare «chiếc hộp gỗ còn nguyên» tests `rdEnd(10)!=="lose"` but the .10 mid ending can be «Đốt hộp
   cùng ma ma» → the finale places a burned box.
3. **Effects promised but not applied / phantom effects (OD:L477 true hints).**
   - cnv: **Sủng is dead for a maid** (j42 sets S.sung=0 while she serves; srvRise overwrites it with 15+nt/5) → 6 phantom Sủng COSTS
     (cnv_mat_5 t1, _8 x1, _9 s1, _9 t1, _11 t1, _8 s2 l) make those options free for a maid, 15 phantom Sủng gains (cnv_mat .5 c1, .6 s1/s2×2/c2/t1,
     .7 c1/t1, .8 s2/t1×2, .11 s1/s2×2/t1). Fix: need:["nsrv"] (j67 convention) or a maid twin on `nt`.
   - thd lx promising oán/resentment with no effect: thd_hoc_5 x1 «{v} thấy con bị xếp sau», _6 x1 «{v} chưa nguôi», _9 x1, _10 x1.
   - cnv_chu_9 x1 «Khai {mis}» hh+6 in w AND E.tell fx hh+6 (+12, double); cnv_ban_8 E.lose «Chủ tin rơi xuống đáy» applies only tin −8.
   - Empty seat: 4 odds read S.hh while text/cost turn to the Thái hậu (cnv_chu_8 t1, cnv_ma_7 c2, cnv_ma_8 c2, cnv_ma_10 c2); cnv_ma_5 E.lose
     go `lmmCon({hh:-3})` not rewritten by CNV_QFIX.
4. **Maid / raised state mismatch (cnv, beat text vs her state).** Beats that assume she is still a maid fire after srvRise, no need/if:
   cnv_ma_5 c1/c2/t1/x1 (copies the Nội vụ phủ ledger, hands coal to six palaces), cnv_ma_6 t1 (steals a ledger), cnv_ma_9 t1/x1 rt;
   cnv_ban_7 s1 (raised text says she cannot run to the yard, option 1 still «Chạy đến xin tha trước khi đánh»), _7 s2 «cầm chổi», _7 t1 «Ở lại
   canh đến sáng» at Tân Giả khố, _9 s1 «Đứng hầu, không nói», _11 x1 «Đưa Xuân Đào ra trước Nội vụ phủ … quỳ cạnh» (contradicts its own .8
   raised goal); cnv_chu_7 c2/x1/E.lose (errands, «chuyển ngươi ra xa, đổi người giữ chìa khóa»), cnv_chu_8 s1 «giỏ đồ giặt». Fix: need:["srv"]
   on maid-only options + a raised twin, or CNV text switch like the goals.
5. **Hoàng hậu / Thái hậu alive guards (b1-r1 item 6).** CNV_QFIX turns every Hoàng hậu beat into a Thái hậu beat when the seat is empty but
   never checks `S.thDead` (CHU_Q too) → with both gone the beats speak for a dead Thái hậu (w → "th" portrait): cnv_chu_8 t1/x1/goal, all of
   cnv_chu_9, cnv_mat_9 s1/x1, cnv_mat_10 g/s1/s2/x1, cnv_ma_8 c2, c2 options of cnv_mat_7, cnv_ma_7/10/11; unguarded live-Thái hậu texts:
   cnv_mat_10 g (raised) «… và Thái hậu đã nghe», cnv_mat_11 c2 «đi hầu Thái hậu ở hành cung»; thd: thd_tho_7 c1 rf, thd_tro_6 x1 «mừng thọ
   Thái hậu» (no need:["th"]); thd_sach_5 t1 «người họ ngoại của {hh}» + c:{hh:-3} with no hh guard; rf/E texts naming the Hoàng hậu with no
   guard: thd_tho_6 x1 rf + E.lose (fx hh −3), thd_sach_6 s2, thd_sach_7 c2, thd_tho_10 c2, thd_tro_6 c2, thd_hoc_6 s2.
6. **Silent recast / dead person acting (r1 item 4 family).** cnv {mis}: when her mistress dies while she is a maid, j42 srvReassign gives a new
   S.srv.mid → `{mis}` silently becomes another woman who inherits the road (cnv_chu lost child/musk/letter, cnv_ban «Thu Cúc theo {mis} tám
   năm»); after the rise srvM keeps the dead mistress, so a dead {mis} keeps acting (cnv_chu_11 «{mis} đến cung ngươi», win «Tâm phúc trọn đời
   của {mis}», cnv_ban_9 «{mis} cầm bút»). cnv_chu/cnv_ban have no alive guard; cnv_mat MATM() passes a reassigned mistress. Fix: carry the
   road's mistress id in S.st.f14.act (mis), tell the change («… nay đã khuất, …») and give a dead-mistress variant.
7. **Cast/continuity guards (thd).** thd_hoc pupils {n1}/{n2} are any living child (`alive` only, `age` never read; school age in the game is
   6, j3/j51) → an infant catches crickets, sits the khảo hạch, «cưỡi ngựa bắn cung»; a daughter cast as «hoàng tự … Đông cung»; fallback n2
   «một công chúa nhỏ» invents a child. thd_sach_9 t1 «viết bằng tay trái» true only after .7 lose (cha gãy tay phải), _9 s2 «tay chân lành
   lặn» contradicts .7 lose; thd_sach_9 g «giải cha về kinh» after .7 x1 win already brought him; thd_sach_10 x1 option 2 «trang đã gạch đỏ»
   exists only when rdEnd(8)==="win".
8. **History rules (road-history pass 1/2).** thd_tro_6 x1 the Emperor questions her at Hàn lâm viện (thd_tho_8 itself says a consort never
   enters it) → after, in Ngự thư phòng; Tam pháp ty spelled out in full 3 times (thd_tro_8 g, _9 g, _11 c1) → once; thd_tho_7 {n1} judges with
   no hồi tị until .8; verdicts not the Emperor's: cnv_chu_10 E.lose (Thận hình ty convicts {mis}), cnv_chu_9 (Trung cung «xử»), cnv_mat_10 x1
   (Hoàng hậu presides «gác án»; raised E.lose cấm túc), cnv_ban_8 E.lose raised (phạt bổng by a Nội vụ phủ hearing) → «… tâu lên, Hoàng thượng
   phê» / Hoàng hậu acts with the Emperor's word.
9. **ONE CORE (OD:L1267), small.** jend14 `egQueen=S.rank>=7`, `S.rank<6` in egHauWin, `RANKS[S.rank+1]` unclamped (same typed 7 as j8; move
   to a named rank index / RANKS.length−1, clamp). RD97L `x` thresholds typed (S.tai>=45, S.danh>=50 …) — j97 convention, OK unless Foreman B
   moves j97 to BAL.
10. **coop-e2e regression on this line** (see Tests; not B3 content, blocks the merge).

## Fixed by me on review/road-b3-r1 (small, whole family)
- jend14: beat text vs cast person — noi14 s2 «{v} bế con» now casts a mother with a living child (vf + if), noi14 t1 «Kết thân một bà mẹ có
  hoàng tử» needs {v} with a living son, ke14 c1 «Bà mẹ của hoàng tử khác» casts a mother of a son, ke14 s2 text no longer names «con của
  {v}» when {v} has no son.
- road-history PASS 2 (coordinator order): thd_hoc .5 «giáo tập» of the vỡ lòng class by the Emperor's order, classics stay with the Hàn lâm sư
  phó; NO strokes on a prince — .8 «Phép của Thượng thư phòng» is now «quỳ chép sách» (options, rt, x1 «bị phạt quỳ», lose tag/text);
  thd_tro .8 g: the Đăng Văn drum was tried and blocked first; thd_tro .11 «Hoàng thượng giảm tội» (2 texts); cnv_chu .8 «có ý chỉ Hoàng hậu,
  Thái hậu chuẩn» (Hoàng thượng chuẩn when the Thái hậu is dead; Thái hậu's own order when the seat is empty; CNV_QFIX rule added so the
  empty-seat text never reads «Thái hậu và Thái hậu»).
- thd_hoc recast of a mother who lost her last child is now told (A.rc + log, same line style as rdCast) — it deleted K.v first so rdCast was silent.
- hh guards: thd_sach_6 c2 «Tâu lên {hh}», thd_hoc .6 «Xin Hoàng hậu cho người đến xem lớp» (need:["hh"]).
- thd_hoc_8 x1 rf promised «phạt bổng ba tháng» that was never applied → «quở một câu».
- VANPHONG: «bạn» ×10 → tỷ muội / tri kỷ / «thân nhau»; «chắc chắn» ×3 removed; «Bản cung» → «Bổn cung» (cnv + CNV_QFIX); stat word «thù» →
  «oán» where the code applies oán («thêm thù», «ghi thù»); «phút cuối» → «giờ chót»; thd_hoc_11 «Ông ngoại của thầy» → «Cha của thầy».
- road-option-scan after fixes: 56 chapters, 1068 options, 0 free gain, 0 no-effect, 0 double Lợi thế, 0 digits.

## KIT REQUEST (not a B3 FAIL) — event card at 1180x820 shows no beat text
Root cause confirmed on the ORIGIN/MAIN build too (tt_co card): jk4.js kitDpAll (review/pcard-actrow, «no tiny nested scroll box») adds
`.kdpall` when the option list is < 280 px; its CSS forces `#mb>.opts{grid-row:2}`, so the event text block `.kfacts` is auto-placed AFTER the
options (measured: opts 417–995 px, kfacts top 1001 px at innerHeight 820) — the beat text sits at the bottom of the scroll column, under the
last option, never on screen. At 755x1000 the list is tall enough, no kdpall, text shown. Shared kit fault (every j67 event card that hits
kdpall) → kit keeper: in kdpall order picture, then .kfacts, then .opts (e.g. place .kfacts in row 2 and .opts in row 3).

## Checked and OK
- r1 item 1: 0 `A.sc` in any `o:` (scan + both readers). Inverted `e:["mid","win"]`: 0. No HTML/style in chapter data; chapters render through
  the j67 kit event card (VIỆC frame, speaker figure, option cards, GỢI Ý rows) — no private parts. Digits/% in text: 0 (RD97L x labels =
  j97 convention). No «Khôn Ninh cung».
- Engine use: rdDef .5–.11 for all 8 roads, RDW/rdPrev openings, rdCast for {v} (told), {n1}/{n2} carried; BAL.road.end / cnvMaRk / tienSc read
  where commented; jend14 frame only on new lives (S.st.f14.eg), old f14 plans untouched (road-end case).
- cnv maid-only effects (tin/nt/merit) all need:["srv"] or isSrv-guarded helpers; CNV_QFIX getters live only on static ARC67/RD97L data,
  never serialised (save = ser(S)).
- ROAD_MAP §4.8/§4.9/§2/§5.4/§8.4 match the built chapters; §8.4 decision (cnv keeps the 8-chapter road, rise inside the road, len14 = ch12 if
  still a maid) is sound.

## Tests (own http server, build of this branch)
| test | result |
|---|---|
| road-option-scan (jrd_thd + jrd_cnv, 56 ch, 1068 options) | 0 free gain · 0 no-effect · 0 double Lợi thế · 0 digits (before and after my fixes); it does not see items 1/3/4 — own scan: 34/56 + 3/3 x-beat dominance, 0 inverted |
| road-full @755x1000, 1 life/road, first-option bot | thd_tho, thd_sach, thd_hoc, cnv_chu, cnv_ban, cnv_mat: PASS (1..14 in order, 4..11 = the road, finale told, tm96 side only; cnv lives 12 = len14). thd_tro, cnv_ma: browser OOM crash (box 15 GB, ≤2 bots) — not re-run, flow engine-shared |
| road-end.js (6 cases × 2 lives + old f14 plan) | 51/51 PASS (later lives on the build with my jend14 fixes) |
| road-saves.js @1180x820 (origin/main save → this build, phase-1 save, mid-road saves tt/thd/cnv) | 6/6 PASS, 0 page errors |
| road-card.js thd_sach_9, cnv_mat_8 @1180x820@2; thd_hoc_8 (new «quỳ chép sách» text), cnv_chu_8, hau14 @755x1000@2 — shots looked at | kit j67 event card, no overflow, 0 page errors; 1180 beat text missing = KIT REQUEST above; option thumbnails blank in shots (CDN lazy-load timing, as r1) |
| coop-e2e (Fold host + iPad guest, live Worker) | **this branch 9 FAIL** (week 1–3 never advance: guest stuck with a modal open, host pend; after-rejoin date; rebirth name) vs **origin/main 59/59 ok**. B3 code cannot run in week 1 (roads start at ch4, jend14 at ch12) → the carried 14-chapter frame / road engine (story14-p1-r2, road-map) is the suspect; must be found and fixed before this line reaches main (owner: Foreman C story14 + engine successor). Solo, old save, no-overflow, no page errors: ok |

## Handover
Context at write ~20 % (start ~4 %). Worktrees /home/user/wt/rb3r1 (review branch), /home/user/wt/rb3doc (this file) — removed after push.

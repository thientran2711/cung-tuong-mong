# road-b1 — B1 worker (dtq + muoi + cn full roads) + jroad.js ENGINE OWNER
START_CTX ~5 % of a 1M window (session_01N1tNP2sDgtu4GovRB3yT4X, successor of road-map lead session_01N1tNP4TguHSiLpDgAN6EDF).
Rollover at ~30 % (START_CTX + 25 %), ceiling 60 %. Branches: `review/road-b1` (roads), `review/road-map-next` (engine).

## Engine log (jroad.js, review/road-map-next)
- 93e6a6f0: rdRel / rdOan / RDW moved from jrd_tt.js into jroad.js (shared by every jrd_<origin>.js; none may redefine them).
- 0c642337 (base = review/road-map-r1 38b78cce): recast told to the player (rdCast logs «X nay đã khuất / đã rời cung, kẻ nối tay là Y.» and heads
  the chapter's first hồi card; r1 item 4); tm index from BAL.road.tm.length (r1 item 5); .4 story names n1/n2 carried across the road (B3 request).
- a85f3321: late STORY keys get the j67 frame (j67 wrapper named wrap67(k), jroad runs it at load end) → Bắc Địch (jorigins STORY.bd) lives run
  a67init + full roads (B2 browser-verified bd_ngua 5–11); road-option-scan ignores {n1}/{n2}/{v2} + function texts; road-full reports __run errors.
- 33b8789a: tt pilot fix (r1 items 1–3, 5 + road-history pass 1), see below. d49926ed / eeb80516: scan + road-full test fixes.
All engine shas sent to B2 + B3 with the 3 r1 pattern rules.

## tt pilot fix — review/road-map-next (r1 FAIL items + road-history pass 1) → SẴN SÀNG KIỂM eeb80516
| measure (road-option-scan / check.js over jrd_tt.js) | before | after |
|---|---|---|
| free gain (no cost, no numeric loss) | 183 | 0 |
| no cost, no gain, no loss | 42 | 0 |
| double Lợi thế (A.sc in o:) | 30 | 0 |
| check.js errors (gain AND loss, openings, tokens, endings) | 306 | 0 |
| digits in text | 1 | 0 |
- Cast-guarded: tt_oan .7 s2 ({v} above her, new s3 otherwise), tt_mat .6 c2 (+c3), tt_tranh .5 c2 ({v} has a child, +c3), tt_co .9 c2, tt_mat .10 s2/c2
  (reads the .8 ending); Thái hậu options need:["th"]. Typed rank names removed; RANKS[Math.min(S.rank,RANKS.length-1)].
- History: tt_co .10 / tt_oan .10 Ngự thư phòng after court (no screen); tt_oan .9 Tam ty glossed once, «Xin quan ấy hồi tị», Emperor gives a khẩu dụ;
  tt_co .8 «hộp tấu niêm phong», Emperor away at the Giao rite; tt_co .11 the Emperor asks her father, not her; tt_tranh «gia ấn»; tt_mat rare =
  «Hoàng hậu tiến lời, Hoàng thượng ghi nhớ», gated on the Hoàng hậu ill or childless, reward hh/danh + flag S.st.f14.tienloi (BAL.road.tienSc = 2
  Lợi thế for the ch13 hồi form — B3 to read it; today ch13 hau is a milestone).
- Recast + ONE CORE items 4/5 in the engine (above). Tests: tt road-full being re-run on eeb80516 (result line added below when done).

## B1 roads — review/road-b1 (84 chapters + 12 rare finales) → SẴN SÀNG KIỂM 5dbacee3
Files: dev/build/jrd_dtq.js (dtq_bien, dtq_vu, dtq_binh, dtq_huynh), jrd_muoi.js (muoi_tuoc, muoi_lau, muoi_doi, muoi_no), jrd_cn.js (cn_chu,
cn_tinh, cn_ban, cn_than); BAL.road.<road> keys in jbal2.js (deadlines in months, rank indexes, thresholds — each commented); assemble.py lists
them after jrd_tt.js; ROAD_MAP §4.2–4.4 rewritten to the built chapters (on review/road-b1; docs copy untouched per brief). Branch carries
review/road-map-next (engine + tt fix) → it also carries story14-p1-r2: cannot reach main before story14 passes.
Rules applied (whole family): .5 opens on the .4 aftermath (RDW + rdPrev of .4 keys incl. win2); same rival {v} cast once per road (rdCast);
rdRel/rdOan on top of real losses; every option a real loss (scan 0/0/0, check.js 0 errors on all 3 files); no A.sc in odds; cast-guards on
beats about a cast person's rank/illness; consort never in a court hall or at a hearing (verdicts/titles = the Emperor; treason mercy = his grace);
no typed rank names (RANKS[BAL.road…].n); road endings never kill, never lãnh cung, Hoàng hậu road open.

### Tests (build 5dbacee3, http server own port)
| test | result |
|---|---|
| road-full.js @755x1000, 1 life per road (first option) | 12/12 roads walk 1..14 in order (4 = .4 premise, 5–11 = road, 12 shared/child, 13 hau, 14 ke), finale = road ending, same rival all road, 0 page errors. Endings seen: Khải hoàn, vua trọng mà dè · Cha sạch án, kẻ làm giả bị trị · Cha bị gạch tên công thần · Huynh mang nhục suốt đời · Tước truyền đời · Trắng án, nhà kẻ hãm hại đổ · Giang Nam nhớ ơn nhà ngươi · Món nợ thành sợi chỉ đỏ · Chủ tớ thành tỷ muội · Lộ chuyện cũ, bị phạt · Tố Nga ở lại bên ngươi · Họ Thẩm không được nhận |
| road-saves.js @1180x820 | 7/7 PASS: main-build save, phase-1 save (thd), full-road mid-road saves tt / dtq / muoi / cn keep road + cast + plan and play on, 0 page errors |
| road-option-scan.js (all jrd_*) | free gain 0 · no-effect 0 · double Lợi thế 0 · digits [] |
| chapter cards (kit j67 event card) | cn_ban .6, dtq_vu .9, muoi_lau .7 at 755x1000 + 1180x820: overflow 0, 0 page errors, speaker figure + event art + option cards (TỐN / GỢI Ý) |
| bd probe (engine a85f3321) | forced bd life → S.st.f14 on, STORY.bd wrapped, 0 errors (B2 confirmed bd_ngua 5–11 on its branch) |
Test notes: start() now sets S a tick later on fresh storage → road-full/road-saves wait for S (fixed on both branches). Six parallel
bot browsers hit the container memory limit (one page holding ~57 game months of pictures grows to ~5.8 GB RSS; JS heap stays ~57 MB) —
run ≤3 bots at a time.

### Observations for the reviewer (not B1 code)
- Card title «Chính tuyến · <origin> · Chương n · Hồi i/n» wraps to 2 lines at 755 and 1180 (shared j67 card header; same on main arcs).
- jk2b hint line (shared): an odds option whose price is Sủng (not Sức/Bạc) shows no TỐN row, and its GỢI Ý may show only the gain words
  (e.g. dtq_vu .9 «Xin Hoàng thượng tự đọc lời khai»: c sung −3, l sung −3, lx present). If a loss must always be hinted, that is a kit fix in jk2b.

### HISTORY / DRAMA doubts (OD:L1327 → expert pass 2)
- dtq_bien: new places Ứng Châu, kho Thông Châu, trạm Lư Câu; .9 memorial allowed only from rank BAL.road.dtq_bien.speak (invented custom);
  Emperor riding out against advice (Thổ Mộc echo, no names); .7 retired general living near Đức Thọ cung.
- dtq_vu .9 (HISTORY CHECK) Tam ty + hồi tị + mother's petition; .10 palace paper / musk ink as proof.
- dtq_binh .7 (HISTORY CHECK) 杯酒釋兵權 retelling, she is NOT at the feast (acts by dish, note, Thái hậu, a night word); .9 c2 Emperor hands
  her a sealed edict for her father ({v} objects in text); .11 s1 father sends his draft retirement memorial as a family letter.
- dtq_huynh: .8 secret rescue gives "Lệnh:" orders (illegal by design, lx names the risk); places sông Hắc Thủy, Ngọ Môn, cửa Đông Hoa, Hồng lô tự.
- muoi_lau .7 (HISTORY CHECK) diêm dẫn / Tuần diêm Ngự sử / Diêm vận ty; .8 charge «unpaid over-quota salt tax»; .10 trial at Đại Lý tự, she
  stays in the palace, «Đại Lý tự tâu, Hoàng thượng phê y».
- muoi_tuoc: bảo cử sponsor for a merchant title, hereditary vs lifetime title; .7 Quản Trọng allusion; .9 Đại Lý tự vs Hình bộ.
- muoi_doi: private «kho thường bình»; Thất phẩm for a merchant. muoi_no: Kính sự phòng bribery trope; eunuch moneylender in Nội vụ phủ.
- cn_chu .8 no real promotion (should a road chapter call jexam?); .7/.9 punishments of {v} are text only.
- cn_tinh .9 inquiry by Kính sự phòng vs Thận hình ty / Hoàng hậu; .11 lose (pay cut + confinement) weight; guard name kept in S.st.f14.cnG
  (engine n1 carry now exists — can be simplified).
- cn_ban twist: {v} borrowed Càn Ninh cung's name (the Hoàng hậu blamed in .4 win was framed). cn_than: flood-relief case, posthumous honour,
  {v}'s invented father/grandfather (like td foeDad); places Châm công cục, Thượng cung cục, Phật đường Đức Thọ cung, cổng Thần Vũ.
- Walk-ons without a §5.4 row (text only, no face): old Thẩm steward, an aunt, an old censor, a nun, the boatman, a salt clerk, Diêm vận sứ.
- .4 rare endings (j97) can end a .4 with a rare tag: .5 openings use RDW on the k sign, so they still run, but the text may not mention it.

## HANDOVER
- Done: B1 84 chapters (5dbacee3), engine owner duties (latest road-map-next eeb80516), tt pilot fix. Next for whoever continues: reviewer
  findings on road-b1 / road-map-next; expert pass 2 text changes; jk2b hint observation if the kit keeper takes it.
- Scratch (not in git): /home/user/wt/b1/dev/build/_parts/ (per-road parts, mk.sh assembles jrd_<origin>.js, check.js = structural checker,
  BRIEF.md = writer brief incl. r1 + history rules). Worktrees: /home/user/wt/b1 (road-b1), /home/user/wt/rmn (road-map-next), /home/user/wt/b1docs.

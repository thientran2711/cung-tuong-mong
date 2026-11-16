# road-b3 — Foreman B helper B3 (thd + cnv full roads .5–.11, endgame ch12–14)
START_CTX ~6 % of a 1M window (session_01N1tNP3uKUEBnyjuk4bnC7X). Rollover at ~31 %, ceiling 60 %.
Branch `review/road-b3` (off review/road-map @ 240c68a7; merged review/road-map-next 93e6a6f0 → 0c642337 → a85f3321). Worktree /home/user/wt/b3.
Coordinator: Foreman B s7 session_01N1tNP6YA61ntHf4XBa4y1f. Engine owner: B1 session_01N1tNP2sDgtu4GovRB3yT4X.

## What was built
(a) ROADS — 8 roads × .5–.11 = 56 chapters + 8 rare finales (RD97L):
- dev/build/jrd_thd.js (thd_tho, thd_sach, thd_tro, thd_hoc), dev/build/jrd_cnv.js (cnv_chu, cnv_ban, cnv_mat, cnv_ma).
- Source = one fragment per road in dev/build/rdfrag/<road>.js, joined by `bash dev/build/rdfrag/cat.sh` (headers _hd_thd.js/_hd_cnv.js).
  Writer briefs kept there (BRIEF.md, POLISH.md). assemble.py: 'jrd_tt.js', 'jrd_thd.js', 'jrd_cnv.js', 'jend14.js'.
- Pattern = jrd_tt.js + review road-map-r1 PATTERN RULES: .5 opens on .4's ending (RDW / rdPrev), same cast carried, hostile roles real
  (rdRel/rdOan), no A.sc in o:, every option a real loss (c, or odds + l, or an ending), lx names that real loss, cast-state beats guarded.
- ROAD_MAP.md §4.8 / §4.9 rewritten to the built chapters; §2 endgame lines; §5.4 story-only rows (Ôn thái y, Phúc An, Thu Cúc,
  Phùng cô cô, thd_tho uncle/Chưởng viện, thd_tro {n1}/{n2}/Thị lang, thd_sach dyke clerk); §8.4 DONE; §7 change log.
- BAL.road.cnvMaRk (SRK.maid index of the chưởng sự seat, cnv_ma .11).
- {n1}/{n2} of the .4 arcs carried by the engine (my request, road-map-next 0c642337); thd casts read A.n1 || S.st.f14.n1 || fallback
  (cast() runs before the engine fills A.n1).
- cnv: texts switch on S.srv.risen (maid / consort), options need:["srv"] / need:["nsrv"]; maid-only effects (tin, nt, merit) only while a
  maid; every Hoàng hậu / Càn Ninh / Trung cung text and hh effect turns to the Thái hậu when the seat is empty (CNV_QFIX helper per file:
  replaces text fields by getters that pick the wording; 99 fields).
- thd_hoc: a carried mother who lost her last child is recast (else the whole road fell to shared arcs, seen in a bot life).

(b) ENDGAME — dev/build/jend14.js + BAL.road.end (+ BAL.road.tienSc from the engine owner):
- New lives on this build (S.st.f14.eg = 1): ms:hau / ms:ke → st:hau14 / st:ke14; end:12 resolved when ch12 opens: still a maid → len14 ·
  son → st_dong · child → st_con · none → noi14 «Người nối dõi». Older f14 saves unchanged (tested).
- noi14 (ch12x childless): real effects S.fert / S.pray months (j8 conceiveCh), Thái hậu, Danh, an ally mother (relation).
- hau14 «Tranh ngôi Trung cung» (ch13): openings by state (already Hoàng hậu: unseat attempt / «lục cung chờ xem»; Trung cung criticised;
  seat vacant); rival = her strongest seat rival (seatW). Win = one real step: below the Phi seats an ân thi at once (jexam exGrace), at
  the top seat Thái hậu + Danh weight for the lập hậu choice, as Hoàng hậu che chở months. The tt_mat rare «Hoàng hậu tiến lời» flag gives
  Lợi thế BAL.road.tienSc. The seat itself stays decided by the lập hậu rules (j8/j34).
- ke14 «Mẫu nghi thiên hạ» (ch14): son is Thái tử (guard) / son not yet / no son (mother of the lục cung); rival = the mother of the
  competing prince. Win: no Thái tử yet and her son dear enough (fond >= keFond) → setHeir; else e67heir.
- Reused, not rebuilt: st_dong/st_con (j67), MS67.len14 (jst14), seatW (j8), exGrace (jexam), setHeir/e67heir/j51/j99succ.
- Open (not built, a new system): real adoption of a motherless child (no adoption data on main).

## ROAD_MAP §8.4 decision (cnv len14 vs 8-chapter road)
DECISION: cnv keeps the 8-chapter road (.4–.11) like every origin; ms:len14 is no longer a middle chapter. The rise happens INSIDE the
roads: cnv_mat .8 «Đêm đầu» raises her (srvRise) when Hoàng thượng để ý >= BAL.ntRise.at; the other roads raise «Hoàng thượng để ý» on
real deeds (cnv_chu .10/.11, cnv_ban .7/.8/.10/.11, cnv_ma .5/.9) and the game's own rise rule offers the rise. Every chapter reads right
as maid or consort. Still a maid when the road ends → chapter 12 = len14 (jend14 eg12); 13–14 open once she is raised.
REASON: one frame for all 9 origins (4 + 8 + 3), no cnv special case in jroad.js; len14 would push a road chapter out of 4–11; the rise
belongs to the story; a maid never raised still gets her whole road.

## Tests (build b902ddef + later; 755x1000 unless noted; own http server)
| test | result |
|---|---|
| road-option-scan (jrd_thd + jrd_cnv, 56 chapters, 1068 options) | 0 free gain · 0 text-only · 0 double Lợi thế · 0 digits |
| road-option-scan jend14 (3 chapters, 72 options) | 0 free gain (1 listed "go": ke14 s2 now also c:{danh:-2}) · 0 text-only · 0 double |
| road-full 1 life/road: thd_tho, thd_sach, thd_tro, cnv_chu, cnv_ban, cnv_mat, cnv_ma | 1..14 in order, 4..11 = the road, finale told, same rival, tm96 side only: PASS (cnv lives: 12 = len14, bot never raised her) |
| road-full thd_hoc | FAIL before fix (.6–.11 shared arcs after the mother lost her child, no finale); after fix 2 lives: 17/17 PASS (finales «Người thầy được tôn kính», «Được tôn mà một mẹ còn hận») |
| road-end.js (6 cases: childless / son / daughter / cnv maid / already Hoàng hậu / cnv raised childless + old f14 plan) | 27/27 |
| road-saves.js @1180x820 (main save, phase-1 save, full-road mid-road saves tt, thd, cnv) | 5/5 |
| road-card.js chapter cards thd_sach_9, cnv_mat_8, hau14 @755x1000@2 + 1180x820@2 | kit j67 event card, no overflow, 0 page errors |
NOTE (kit, not B3): at 1180x820 the j67 event card shows no beat text above the options (same on the tt pilot tt_co_7); at 755x1000 it is shown.
Test fixes: road-end/road-saves now goto waitUntil 'load' (start() before load left S undefined on this build); road-saves takes an origin list.

## Engine requests (to B1)
1. DONE 0c642337: carry .4 story names n1/n2.
2. OPEN: a road chapter whose cast fails is replaced by a shared arc; if .11 never runs the life gets no «Kết cục xuất thân» (fin empty).
   Ask: tell the origin ending anyway (rdFinale on the last road chapter that ran, or chFinale67).

## HISTORY CHECK (OD:L1327) — pass-1 rules applied (no consort in court hall / trial / kinh diên / behind a screen; verdicts the Emperor's;
three courts named once; hồi tị options; grace for sedition). Doubts left for the expert:
- thd_sach .9 văn tự ngục (one half-quoted sentence; Đại Lý tự proposes, Emperor confirms); .8 a consort sending a book into the court
  lecture through a scholar/eunuch.
- thd_tho .7 consorts' poems judged by Hàn lâm judges in Ngự hoa viên (palace literary event); .8 evidence by eunuch, answers in writing.
- thd_tro .6 an old Tiến sĩ recalled to write birthday poems; .8 Đăng Văn drum, a consort carrying a petition; .9/.11 Tam pháp ty for an
  exam case, death for buying papers (spared as grace), rọc phách reform proposed by a consort; .10 palace re-exam.
- thd_hoc whole road: a consort teaching princes at Thượng thư phòng (premise from j67 .4); ruler strokes on a prince; Mạnh Tử "quân vi khinh".
- cnv_chu .8 Nội vụ phủ searching a consort's palace on a Trung cung order; .10 Thận hình ty (a raised consort answers in her palace).
- cnv_ban .7 a maid stopping the Emperor's palanquin; .10 a stolen-goods register reaching the Emperor; .11 Hoàng lăng duty as punishment.
- cnv_mat .7–.8 a maid with no rank in the Kính sự phòng register / summoned without a tag; .10 love-charm inquiry at Càn Ninh cung.
- cnv_ma .6 palace silk resold through a consort's family shop; .7–.8 Thận hình ty / Tổng quản judging a senior ma ma.
- Real book titles and place names kept (Mạnh Tử, Luận ngữ, Quỳnh Châu, Vân Nam) — no dynasty / real person / year.

## Notes for the reviewer
- KIT: no UI added; chapters render through the j67 kit event card / kitPanel / result card.
- Inline per-option costs/odds follow the j67/jrd_tt convention; chapter-level numbers in BAL.road (end, cnvMaRk, tienSc).
- CNV_QFIX (cnv files) rewrites text fields into getters at load (data-side, no engine function wrapped). Known limits: if both Hoàng hậu
  and Thái hậu are gone the text still says Thái hậu; 4 odds formulas still read S.hh.
- {mis} after the rise = the same former mistress (srvM keeps her); a mistress transferred mid-road is not told.
- Bot lives never raise the cnv maid inside the road (first options), so chapter 12 = len14 in every cnv bot life; the raise path itself
  is covered by road-end (cnv raised → noi14) and the cnv_mat .8 code path is only stub-tested.

SẴN SÀNG KIỂM bcc79551367325d3bd00ab98f207728ece37c13f

Worktree /home/user/wt/b3 removed after push (re-create from review/road-b3 for fixes).

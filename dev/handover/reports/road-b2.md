# road-b2 — helper B2 (nc + bd branch, td, ch roads .5–.11)
START_CTX ~4 % of a 1M window (session_01N1tNP4zDh6M8kQNxdcYKvM). Branch `review/road-b2` (off review/road-map @240c68a7, merged review/road-map-next a85f3321).
Coordinator: Foreman B s7 (session_01N1tNP6YA61ntHf4XBa4y1f). Engine owner: session_01N1tNP2sDgtu4GovRB3yT4X.

## Done — SẴN SÀNG KIỂM b62c96d8a13f6313325e271cb117bff62c31d33a
- dev/build/jrd_nc.js (nc_gian, nc_su, nc_tuc, nc_vuong), jrd_td.js (td_an, td_ke, td_song, td_tha), jrd_ch.js (ch_co, ch_benh, ch_ho, ch_bi):
  84 chapters (.5–.11) + 12 rare finales (RD97L), assemble.py after jrd_tt.js. BAL.road keys in jbal2.js (td_an.rank, ch_co.trust, ch_benh.heir, ch_bi.shield).
- Bắc Địch branch (OD:L1213/L1215): the nc roads are written once with land tokens ({land} {pv} {mh} {quan} {pa} {pb}, TOK67 keys in
  jrd_nc.js) and registered again under the bd premises (bd_hoa→nc_su, bd_ngua→nc_gian, bd_tuc→nc_tuc, bd_hoang→nc_vuong); .5 has NCW/BDW
  openings that follow whichever premise was played. bd lives run the 14-chapter frame since engine a85f3321 (my blocker report).
- Pattern = reviewer road-map-r1 rules: no A.sc in odds, every option a real numeric cost / failure loss / ending, cast-state beats guarded,
  no digits in text. History pass (road-history.md) applied: she never stands in a court hall or trial; retrials open with the Emperor's chỉ
  (Tam ty named once); verdicts are his; nc screen/Hồng Lô tự scenes moved to the inner palace. Thái hậu death (S.thDead) guarded in ch_*/nc_tuc.
- ROAD_MAP.md §4.5–4.7 rewritten to the built chapters; §5.2 places, §5.4 story-only NPCs, §7, §8.3 history items (on review/road-b2; the docs
  copy is the lead's to sync).

## Tests (build of b62c96d8)
- road-option-scan.js (engine version): B2 roads 0 FREE GAIN / 0 NO-COST / digits [] / 0 DOUBLE (remaining hits are tt only, fixed by the engine owner).
- road-full.js @755x1000, one life per road: nc_gian nc_su nc_tuc nc_vuong td_an td_ke td_song td_tha ch_co ch_benh ch_ho ch_bi 87/87 PASS;
  bd_hoa 1 life PASS; bd_ngua bd_tuc bd_hoang 24/24 PASS. Every life 1..14 in order, 4 = premise, 5..11 = road, finale tells the origin ending,
  same rival all road, tm96 side story, 0 page errors.
- road-saves.js @1180x820 with the full-road life switched to nc / td / ch / bd: 4/4 each (main-build save, phase-1 save, full-road mid-road
  save keeps road + cast + plan and plays on, 0 page errors).
- Screenshots (not committed): chapter .5 card of nc_gian, td_an, ch_co, bd_ngua at 755x1000 and 1180x820 — j67 kit card «Chính tuyến ·
  <origin story> · Chương 5 · Hồi 1/5», kit option cards, no overflow, no new UI.
- Test-harness notes: (a) start() waits up to 2.5 s for figure images (j52 nlFigsReady), so right after load S can be undefined → road-full /
  road-saves fail with "reading 'origin'" when the CDN is slow; I ran them with a wait for nlFigsReady() (engine owner told). (b) the option
  card's «Tốn» row does not show costs in tamco/duc/danh/sung (e.g. c:{tamco:-1} shows as "an toàn", no Tốn) — the gain-and-loss costs on
  those stats are invisible to the player (pre-existing kit card behaviour, tt too) → kit/engine owner.

## Notes per road (HISTORY CHECK, doubts, rare finales)

## Per road — doubts / HISTORY CHECK (deduplicated, current)
- nc_gian: HC Hội Đồng quán as merchant lodging, Lễ bộ lộ dẫn at Chính Dương gate, Đại Lý tự spy case, night cấm quân search of a consort's palace. Doubt: {v}-family claims generic.
- nc_su: HC tam quỳ cửu khấu for a prince-envoy, Thượng Lâm offence handed back, iron export ban, envoy seating by tribute year. Doubt: {pa} counted as family token (NCL), not a new NPC — confirm.
- nc_tuc: HC (court-hall/screen scenes REMOVED after the history pass: the Emperor brings the memorial to her palace) .10 nghĩa nữ into a noble genealogy, .7 altar search. Doubt: chapter g texts name the Thái hậu even when S.thDead (hồi switch via need/x2; g string stays).
- nc_vuong: HC (screen/Hồng Lô tự scenes REMOVED after the history pass; her word goes by eunuch/letter) losing claimant made Thân vương. Doubt: rival's relatives only "anh họ / thông gia" (no name) so the j55 clan record is not contradicted.
- td_an: HC .10 Tam ty retrial of the late emperor's case, recusal of a protégé judge; .8 petition-rank rule (invented); year-end burning of seal registers (invented).
- td_ke: HC forged Nội vụ phủ search order, censor's memorial at the spring audience. ENGINE: {n1} is per-thread (A.n1); td_ke keeps it in S.st.f14.n1 via an IIFE wrapper — lead may move it to jroad.js.
- td_song: HC surname restored by merit, pardoned son in the cấm quân, Hộ bộ census. Doubt: .4 mid monk branch (chùa Hộ Quốc) not followed; .5+ reads mid as "Tiểu Thạch in the army".
- td_tha: HC phản tọa vs tự thú, autumn assizes, witness from lãnh cung, khi quân, vu cổ inquiry. Doubt: .4 win2 "{foed} bị xử" read as held until the autumn assizes so he can still bargain.
- ch_co: HC Cửu môn đề đốc (Qing title), yếm thắng doll, private seal of Đức Thọ cung. Doubt: auto-added costs mapped by gain kind; lead may retune.
- ch_benh: HC outside physician in the palace, stand-in at Phụng Tiên điện rite, mourning rules, seal after death. Uses existing S.thDead (no engine request); unlike j4 it applies no hh −20.
- ch_ho: HC clan meeting at phủ Quốc cữu, ngoại thích impeachment, private seal to a niece. Doubt: a .4 ending on a j97 rare key with k>0 has no .5 opening (slot skipped).
- ch_bi: HC ban chết of a late emperor's consort and exile of her house, Hàn lâm cart in the inner palace, censors petitioned against the Thái hậu. ENGINE REQUEST: no Thái hậu standing value (S.thPow); the lose ending is th−10 sung−5 danh−5 only.

## BAL keys (added in jbal2.js BAL.road)
- BAL.road.td_an = {rank:3} — petition rank index (RANKS[3]); the premise chapter number is read as BAL.road.first−1 (tdPre() in jrd_td.js), no extra key.
- BAL.road.ch_co = {trust:50} — Thái hậu → ta, for .11 x1 option and rare x.
- BAL.road.ch_benh = {heir:40} — Thái hậu → ta, for .11 "trao người" option and rare x.
- BAL.road.ch_bi = {shield:3} — months of S.shield from the .11 win.
- All other roads: {} (deadlines told in text, costs inline as in jrd_tt).

## Rare finales (RD97L tag → reward item)
- nc_gian «Trung hiếu lưỡng toàn» → bienngu
- nc_su «Hai triều cùng sắc phong» → nt_dongchau
- nc_tuc «Lễ cố hương vào lịch cung» → nt_haiduong
- nc_vuong «Hai nhà thề hòa bằng rượu của ngươi» → bienngu (notes said «…trước mặt ngươi»; code wins)
- td_an «Ngự bút phục tước, biển Trung hiếu» → bienngu
- td_ke «Nắm thóp kẻ chủ mưu» → nt_dongchau
- td_song «Em lập công, rửa tên cha» → bienngu
- td_tha «Con gái làm chứng cho cha» → nt_dongchau
- ch_co «Cô mẫu trao ấn Đức Thọ cung» → ngocboi
- ch_benh «Vạch mặt kẻ dâng thuốc độc» → nt_nhuy
- ch_ho «Hai người cháu cùng cầm họ ngoại» → nt_haiduong
- ch_bi «Họ Lâm phục danh, hai nhà giải oán» → nt_dongchau
- The 4 bd premises copy the nc rare finales (alias loop at the end of jrd_nc.js).

## Open doubts (for the lead / reviewer)
1. Recast rival: rdCast may give a {v} who is not kin of the Thái hậu (ch_ho) or not of {foed}/{n1}'s faction (td_*); text assumes kinship. Same silent-recast item as REVIEW_R1 §4 (engine).
2. Rare x condition texts carry digits ("Tâm cơ từ 45", "Sủng từ 40", "Đức từ 45", "{v} … từ 30") following the j97/jrd_tt convention; scan.js does not cover RD97L. Change to words if VANPHONG requires.
3. td_song: the .4 mid monk branch is not followed by .5–.11.
4. td_tha: {foed} after .4 win2 is held until the autumn assizes (reading of "bị xử").
5. S.shield label in j24/j70 says "Hoàng hậu che chở" although ch_bi's source is the Thái hậu (jreign does the same) — needs a source-aware label.
6. ENGINE: a random Thái hậu death (j13) mid-road — ch_* chapters carry S.thDead branches, but who67 shows no figure for th beats; rare finales need !S.thDead.
7. DONE (engine a85f3321, merged): Bắc Địch lives now run the 14-chapter frame; verified in browser + road-full.
8. Auto-cost pass (gain-and-loss rule) added small danh/suc/sung −2/−3 costs to formerly free options in all 12 roads; lx texts still name the story loss.


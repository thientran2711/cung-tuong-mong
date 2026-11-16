# road-b2 — helper B2 (nc + bd branch, td, ch roads .5–.11)
<<<<<<< HEAD
START_CTX ~4 % of a 1M window (session_01N1tNP4zDh6M8kQNxdcYKvM). Branch `review/road-b2`. Coordinator: Foreman B s8 (session_01N1tNP4LoQPgWaFJWtCiVsJ).
Engine: fix A (session_01N1tNP2G4bsFxWrsbzomkzU, review/road-b1-fixa b1999905 + 1926db20 merged).

## ROUND 2 — SẴN SÀNG KIỂM 50805e8ce71657cb2288eff3ab96e808ad2cc874
Applied road-b1-r1 PATTERN items 2,3,4,5,6,7,8,9 to all three B2 files (whole family, per-file tables below), history PASS 2 (nc .11 envoy
audience → inner-palace gia lễ yến with «ngồi sau rèm» / «ngồi ngang hàng Hoàng hậu trong yến» (need hh); td_an .10 x1 deposition read by the
old steward) and PASS 3 edits (nc_gian night search by Nội vụ phủ eunuchs, not cấm quân; ch_benh t2 incense «thay Thái hậu trong hàng nội mệnh
phụ»). New BAL key BAL.road.ncConf (cấm túc months). Merged engine road-map-next d69d6d24 and fix A (rare finales E.r97, extended scan, road-rare).

### Tests (build of the round-2 code)
- road-option-scan.js (fix A extended): B2 roads 0 on every list — free gain, no-effect, digits, double Lợi thế, INVERTED, X-BEAT DOMINANCE,
  BOLD ≤ SAFE, VANPHONG banned words; all 16 rare finales (12 + 4 bd aliases) reachable. Remaining hits on the merged branch are B1/tt files only.
- road-rare.js: 16 roads, 84/84 PASS (E.r97 built, road tally feeds .11, rare fired → ✦ tag/title/finale, mid-chapter recast told, 0 errors).
- road-full.js @755x1000, 1 life per road: nc_gian nc_su nc_tuc nc_vuong + bd_hoa bd_ngua bd_tuc bd_hoang 8 lives PASS (the 9th life in the same
  page crashed on memory — run td and ch in fresh pages:) td 31/31, ch 31/31 PASS. Every life 1..14 in order, 4 = premise, 5..11 = road,
  finale tells the origin ending, same rival, 0 page errors.
- road-saves.js @1180x820 (full-road lives switched to nc, bd, td, ch): 7/7 PASS (main-build save, phase-1 save, 4 mid-road saves keep road +
  cast + plan and play on, 0 errors).
- Chapter-card shots: unchanged UI (j67 kit card) — round-1 shots stand (nc_gian/td_an/ch_co/bd_ngua .5 at 755x1000 + 1180x820).

### Before / after (counts per item, by file)
**jrd_nc.js**
| item | before | after | how measured |
|---|---|---|---|
| 2 climax dominance — scan3 X-BEAT DOMINANCE | 4 | 0 | rdparts/scan3.js |
| 2 climax — scan3 BOLD ≤ SAFE | 19 | 0 | rdparts/scan3.js |
| 2 climax — extra (costed safe ≥ bold at typical stats; free/cheaper bold beside a costlier bold) | 8 (gian_6, gian_8, gian_9, su_5, su_6, vuong_7; tuc_10 x1/x2, tuc_11 x1/x2, vuong_11) | 0 | own scratch scan, stats 40 and 30, flags off/on |
| 3 inverted e:["mid","win"] | 0 | 0 | scan3 |
| 4 promised loss/gain not applied | 11 | 0 | by hand |
| 5 history (consort at audience/banquet/trial/signing, outer officials dealing with her directly, verdicts not the Emperor's, Càn Ninh cung used as the Emperor's hall) | ~30 instances in 15 chapters | 0 known | by hand + grep |
| 6 Hoàng hậu / Thái hậu assumed alive (+ beat pools that could empty) | 18 | 0 | grep + j67 need/oNeed67 |
| 7 continuity | 12 | 0 known | by hand |
| 8 ONE CORE (typed amount duplicating a cost; RANKS; number tables) | 2 / 0 / 0 | 0 / 0 / 0 | grep |
| 9 VANPHONG (cơ hội; chắc chắn/bạn/modern/Khôn Ninh) | 1 / 0 | 0 / 0 | scan3 |

**jrd_td.js**
| item | what | before | after |
|---|---|---|---|
| 2 | x beats where a free or cheaper "safe" option (fixed mid / mid-lose / win-mid) beats or ties the costly bold one (stricter own rule: every non-bold x option has a real cost or base ≤ bold −10) | 25 of 29 x beats (scan3: dominance 12, bold≤safe 1) | 0 (scan3 0 / 0) |
| 3 | inverted e:["mid","win"] | 0 | 0 |
| 4 | text promises a loss/gain not applied | 8 | 0 |
| 5 | history (consort at court / trial, direct contact with outer courts or outside men, consort testimony read at court) | 24 | 0 |
| 6 | Hoàng hậu / Thái hậu used without guard | 7 | 0 |
| 7 | continuity / recast identity facts | 20 | 0 |
| 8 | unclamped RANKS[...] / typed amounts duplicating a cost | 4 / 0 | 0 / 0 |
| 9 | VANPHONG banned words ("cơ hội") ; chắc chắn / bạn / Khôn Ninh / modern words | 1 ; 0 | 0 ; 0 |

**jrd_ch.js**
| item | check | before | after |
|---|---|---|---|
| 2 climax dominance | scan3 X-BEAT DOMINANCE | 8 | 0 |
| 2 bold ≤ safe | scan3 X-BEAT BOLD ≤ SAFE | 13 | 0 |
| 2 free fixed «mid» with a gain in a climax | own scan | 22 | 0 (each now costs Danh/Sức/Bạc/Sủng) |
| 3 inverted e:["mid","win"] | scan3 INVERTED | 0 | 0 |
| 4 promised loss/gain not applied | by hand | 6 | 0 |
| 5 history (consort decides / contacts outer court / non-Emperor verdict) | by hand | 10 | 0 (rest in HISTORY DOUBT) |
| 6 Thái hậu assumed alive (texts read with S.thDead) | sim over all .5–.11 × prev end × th dead/alive × queen yes/no | 104 | 0 (3 hits left are past-tense false positives) |
| 6 Hoàng hậu / Càn Ninh cung assumed (no queen) | same sim | 59 | 0 (2 false positives: «Ngôi Trung cung đang trống», «tranh ngôi Trung cung») |
| 6 empty beat pool (non-climax slot) | same sim | 36 | 0 |
| 6 empty climax / empty option list | same sim | 0 | 0 |
| 7 continuity (.4 r97 not handled, recast identity, ch_benh shop owner) | by hand | 5 | 0 |
| 8 ONE CORE (typed amount duplicating a cost, digits in fn text) | scan3 + grep | 2 | 0 |
| 9 VANPHONG («bạn», «hóa đơn», «chắc chắn») | scan3 | 3 | 0 |

### HISTORY DOUBT lists (for the history expert; pass 3 said all PLAUSIBLE — kept for the record)
#### nc (for history pass 3)
1. A consort meeting a male envoy who is her kinsman: in her palace's outer room behind a curtain with a Nội vụ phủ eunuch (nc_gian .11 t1, nc_tuc .10 c1/.11 s1, nc_vuong .10 s1/.11 s1 both delegations) or in the ngự uyển with eunuchs (nc_su .5 s2/s4/.10 t1) — acceptable with the Emperor's leave?
2. «Xin ngồi ngang hàng Hoàng hậu trong yến» succeeding «chỉ một đêm ấy» — even as a one-night favour, is any seat level with the Empress plausible, or should success be «ghế ngay dưới Hoàng hậu»?
3. The Emperor bringing state papers (treaty clean copy, reply quốc thư draft, Binh bộ memorial, a blank sheet «nàng viết đi») into a consort's palace and asking her to read/annotate (nc_su .9/.11 x1, nc_vuong .5/.6/.8/.10 x1) — tolerated as a private favour, or too much «hậu cung can chính»?
4. Lộ dẫn for a foreign caravan issued by Lễ bộ (nc_gian .6) — or Hồng Lô tự / Binh bộ / the city gate office?
5. A consort's memorial (biểu) read out at court by the Emperor (nc_tuc .8 s2, nc_vuong .9 c1) — the failure text already says Lễ bộ returns it; is the success line acceptable?
6. A consort being allowed to visit her home country (nc_tuc .11 c2, nc_vuong .11 t1 «trẫm cho người hộ tống») — historically almost never; keep as a promise only?
7. Sending word through the wife of the Lễ bộ Thượng thư at thỉnh an (nc_vuong .6 s2, .9 c1) as her channel to the outer court.
8. Hội thề held at Hồng Lô tự with the Emperor's lời thề drafted by a consort (nc_vuong .11 x1).
9. j97 nc_gian rare .4 text (not my file): «sứ hai nước sang, đều qua cung ngươi trước» — same family as the fixed su_11/vuong_11 lines.

#### td (for pass 3)
1. td_an .10 x1: may a household steward (gia nô) read a consort's written deposition in a Tam ty hearing, or would the court clerk / a Đại Lý tự official read a palace document passed down by the Emperor? (lose line now also says a gia nô may not read it).
2. td_an .9 x1 / .11 x1: consort kneels before the ngự án with her own petition in a private audience — acceptable, or must it go through the Ngự sử who stands in her name (.8 c2/c3 already offer that)?
3. td_ke .6 c2: a consort arranging to hide a dismissed official ({foed}) at a farm or the Hộ Quốc temple — plausible through her people?
4. td_song .10 t1 «Xin theo ngự giá xem» thao trường — may a consort accompany the Emperor to a guards' drill?
5. td_song .11 t1 she meets her brother (a palace guard) at the East gate for one khắc — risky but allowed with the lose cost, or forbidden outright?
6. td_tha .8 s2/.10 c3/.11 c3: the wife of an official under investigation entering the inner palace to plead — permitted with a Thái hậu/consort's leave?
7. td_tha .11 x1 «Xin Hoàng thượng nghe chính lời {foe}»: the Emperor hearing a consort privately about her father's case before signing the verdict — fine?
8. Titles: {foed}'s office ("Thượng thư" in td_an .10 c2) vs the father "Thị lang bộ Lễ" in td_song .7/RD97L while the forged seal is Binh bộ's — consistent enough?
9. "kỳ thu thẩm" (autumn assizes) as the deadline for {foed}'s case in td_tha .8 — correct term for this setting?

#### ch (for pass 3)
1. ch_co_7: the Emperor asking a consort's opinion on the Cửu môn đề đốc seat, even privately at a family supper — acceptable, or must she refuse?
2. ch_co_9 c1 / ch_ho_8 c1: a consort asking the Emperor for a Tri phủ post for a kinsman (and «lo bạc chạy chức» through Lại bộ).
3. ch_benh_6 x1: consorts at the ancestral rite in Phụng Tiên điện; can a niece «stand in» the Thái hậu's place at all (rf has Lễ quan stop her)?
4. ch_benh_10 s3: who keeps the inner-palace funeral of a Thái hậu (Trung cung by rule?) and Lễ bộ's part.
5. ch_bi_6/9/10/11: a consort writing letters to an outer official (Lâm Khải, Biên tu Hàn lâm viện) and meeting him behind a screen at chùa Hộ Quốc.
6. ch_bi_10 t1 «Tự mình đi»: a consort leaving the palace at night in a maid's dress (only a Danh loss on failure) — keep?
7. ch_ho: a family taking a consort in as «cháu nuôi» to replace a dead niece (Qing đài kỳ-like) — plausible?
8. ch_ho_9 x1: the Emperor asking both nieces how to handle the ngoại thích memorial.
9. ch_co RD97L: the Thái hậu handing her private seal to a consort «trước mặt Hoàng thượng»; ch_benh .4/.11: a consort holding Đức Thọ cung's seal.
10. ch_bi_11 x1/x2: clearing an exile sentence of the previous reign quietly (no edict) — is a quiet chỉ through Nội vụ phủ right?


## ROUND 1 (kept below)
=======
START_CTX ~4 % of a 1M window (session_01N1tNP4zDh6M8kQNxdcYKvM). Branch `review/road-b2` (off review/road-map @240c68a7, merged review/road-map-next a85f3321).
Coordinator: Foreman B s7 (session_01N1tNP6YA61ntHf4XBa4y1f). Engine owner: session_01N1tNP2sDgtu4GovRB3yT4X.
>>>>>>> a1438803 (Foreman C s7: handover to s8)

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


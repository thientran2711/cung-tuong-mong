# OB-NGOAICUNG — palace words / palace people outside the palace (report to MAIN CHÍNH 146)

PRIORITY #1 CHECK ('ngoài cung|tì nữ|nha hoàn|ROAD8_LAB|placeWord|người hầu'): OD 24 | ledger 0 | claims 0 | main 15 | review/* 0 | archive 0
→ reused: jroad8 ROAD8_LAB (the existing ONE label table of the stage groups, maid-8tabs #36), kitMaidTitle (ONE maid title), srkName (ONE servant rank),
j68 evGate (ONE dialog gate). No review/* branch touched this; no claim.

Branch `review/ob-ngoaicung`, base LIVE origin/main 5e013076. Owner rows: OD 25/11 ~22:45Z (wording family) + ~22:48Z (event gating family, same context source).

## What changed (one source, keyed by place)
- **jroad8.js** — `ROAD8_LAB` is now THE word table keyed by place context; `placeCtx()` = `""` palace · `srv` cung nữ road · `kc` at home before the palace
  (tiểu thư phủ: khuê phòng, phủ, kinh thành, journeys — `isKc()`) · `kc:dan` thôn nữ (cnv) · `kc:nc` foreign princess at her own court (nc/bd/pf).
  `placeW(key)` falls back kc:x → kc → "". Keys: `cn`/`ct` head-count groups, `maid` (her maid's title, no palace rank), `sv_maid`/`sv_eunuch`
  (her household servants), `t_mus/t_craft/t_rite/t_vir/t_fee/tch_cons` (teachers), `fame3` (skill level-3 line). No scattered ifs: every caller reads `placeW`.
- Callers: `kitMaidTitle` (figure tag, cards, lists, name builder «Nhờ … đưa thư»), `srkName` (only her own household), jk3 crew chip tips, jgift
  (at home only her maid is in reach; tab labels from the table), jrcp/jtds teachers (no palace office, no consort teacher before the palace — law 6),
  j2 skill fame line.
- **Event / news / dialogue-tag family (law 6 + 11)**: `placeEvOk(m)` / `placeSift()` — at home no palace person (speaker figure rk emp / th / c<rank> /
  cold / sv, her own maid excepted) appears in a dialog; home pools (pid kc…: kcE incl. Chiếu tuyển tú + Sơ/Phúc/Điện tuyển, kc2Sel) untouched; the
  palace news sheet «Tin trong cung buổi này» dropped. Runs inside j68 evGate and as the OUTERMOST showModal wrapper (jdayq holds dialogs first).
  Journal: `PLACE_LOG_DROP.kc` (one pattern table) + every line written inside jkc `kcW` (the palace world's own buổi) stays out of her home sổ.
  Home guards in the modules that addressed her as a palace woman: jcycle (Kính sự phòng / ma ma notices), jdc («Trong cung chê…»), jagknow knSellTick
  (the palace gossip seller — the exact event of her k3 shot).
- **Kit (jgrey.js §84 «tạm»)**: `kitTamFit(root)` — the stand-in chip takes the first corner (TR → TL → BR → BL) that covers no visible text / button /
  name tag; run after each renderStage + resize. KK33 (session_01V1ZZH31ewdNsRsk4VYngAQ) told (kit part).

## Before / after (scan: `node dev/test/ob-ngoaicung/scan.js <url> out.json [--play=600]`, iPad 1180x820, 5 home roads)
| road | surface | BEFORE (LIVE 5e013076) | AFTER |
|---|---|---|---|
| tt/td (tiểu thư phủ) | head-count | 1 Cung nhân · 3 Chí tôn | 1 Người hầu · 3 Trưởng bối |
| tt/td | group list | Cung nhân · 1 — Cung nữ thân tín tam đẳng X | Người hầu · 1 — Tỳ nữ thân tín X |
| tt/td | maid title / figure tag / «Nhờ … đưa thư» | Cung nữ thân tín tam đẳng | Tỳ nữ thân tín |
| cnv (thôn nữ) | head-count / list / title | Cung nhân · Chí tôn / Cung nữ thân tín tam đẳng | Người ở · Gia đình / Người ở thân tín |
| nc / bd (công chúa) | head-count / list / title | Cung nhân · Chí tôn / Cung nữ thân tín tam đẳng | Người hầu · Vương tộc / Tỳ nữ thân tín |
| all | crew chip tip | Cung nữ thân tín | (maid title above) |
| all | Tài nghệ teacher lines | «(ma ma) hoặc nợ một ân (phi tần giỏi Công)», Nữ quan Thượng nghi cục… | «(nữ sư)», Nữ sư / Nhạc sư / Ma ma trong phủ; no consort teacher |
| all | dialogs with a palace speaker at home (600 random steps) | tt 12 · td 9 · cnv 11 · nc 5 · bd 22 (Có người bán tin, Có người đến/tìm đến by consorts, Hỏa hoạn lớn, Lễ Phật đản, Sứ đoàn, Tỉnh thân, Đại hàn…, Án ngự khố) | 0 on all 5 roads |
| all | journal lines (sample) | «Kỳ nguyệt sự… Kính sự phòng tạm cất thẻ bài», «Ma ma dặn nhỏ…», «Trong cung chê…», «X sang cung ngươi», «được Hoàng thượng ban/ngự tứ», «+3 Phúc duyên: tròn năm thứ 1 trong cung», «Cả cung nghe danh» | gone; left (by design): letters/gifts INTO the palace, bought rumours «Ngươi biết được (nghe lời đồn)…», realm-wide events (lũ, hạn, đại xá, phiên vương), «Người ngoài khó trông rõ việc trong cung» weather |
| iPad stage | «tạm» chip | on the place name «Khuê phòng» | bottom-right corner (TL blocked by rail icons) |
Strict surfaces (head-count, lists, tips, maid title, figure tags): SCAN PASS on tt, td, cnv, nc, bd.

## Shots (NEW names, looked at both)
- https://ctm-img.victoria-tntt.workers.dev/img/_review/ob-ngoaicung/ngc-home-nguoihau-fold-755x1000.jpg
- https://ctm-img.victoria-tntt.workers.dev/img/_review/ob-ngoaicung/ngc-home-nguoihau-ipad-1180x820.jpg
(«Người hầu · 1 — Tỳ nữ thân tín», «3 Trưởng bối», «tạm» bottom-right clear of «Khuê phòng». This life's room had its exact picture, so the shot script
puts the kit chip on the stage the same way jres does, to show the corner rule.)

## Gates (final sha bc93314f)
- quickcheck vs LIVE 5e013076: build ✓ · old save ✓ · open 2197 ms ✓ · perf ✓ (median new/live: render 267/295, tab 601/621, buổi 2015/4827, tasks>200ms 26/28).
  Only FAIL = G4 button-crawl «Ô lưu · Lui · close did not close» — PRE-EXISTING: the same FAIL on LIVE 5e013076 (crawler run side by side, both FAIL).
  (Earlier runs: perf flipped run to run under load; kitTamFit then made lighter in bc93314f — scans only the chip's picture box, only when a chip is shown.)
- coop-e2e alone: 143/143 passed.
- selection/opening: `dev/test/outside/route.js --origin=tt` FAILS «did not enter the palace» on LIVE 5e013076 exactly as on this branch (pre-existing: its
  random play stalls before Điện tuyển); home start, every home tab, save + reload pass. Family scan (5 home roads, 600 steps): SCAN PASS, 0 palace speakers.

## Expert note (law 8)
Ming–Qing gentry households: a daughter's personal maid is 丫鬟 / 婢女 (Vn nha hoàn / tỳ nữ), the close one 贴身丫鬟 (tỳ nữ thân cận/thân tín); men
servants 家丁 (gia đinh); servants as a body 下人 / 仆人 (người hầu, gia nhân). 宮女 (cung nữ) and graded ranks (一/二/三等) belong to the palace's
Nội vụ phủ only. 至尊 (chí tôn) is the sovereign alone — wrong for parents; family heads are 長輩 (trưởng bối). Teachers of gentry girls: 女先生 / 女師
(nữ sư), 琴師 / 樂師 (nhạc sư), a household 嬤嬤 for needlework; 教習嬤嬤 (ma ma giáo tập) are palace instructors. A village family has no maid;
a hired live-in hand is «người ở» (Vietnamese usage) — see question 1.

## Open for MAIN (not decided by me, law 16/17)
1. Thôn nữ (cnv) starts with a personal maid (S.maid). Real-world law 6 says a farm girl has none; I only re-worded it «Người ở thân tín». Keep / remove?
2. Bottom tabs at home still read «Hậu cung» / «Hoàng tự» (owner 21/11 ~03:15Z froze the 8 tabs «y chang»; I did not rename).
3. Gift at home: only her maid is a recipient now (emperor/consorts out of reach). Family as gift recipients needs a design.
4. outside/route.js is stale on LIVE (see Gates).

## PART 2 (MAIN 146→150 orders, 25/11 22:40Z–00:49Z) — sha 028bcd08 (+ this report)
- **Home bottom tab names** (MAIN 148): same 8 tabs, names from KCTABS per variant: tiểu thư «Khuê phòng · Dư đồ · Gia tộc · Giao du · Thư từ · Tư trang ·
  Tài nghệ · Mệnh truyện»; thôn nữ «Nhà tranh · … · Gia đình · Xóm làng · Tin tức …»; công chúa «Tẩm cung · … · Vương tộc · Triều đình · Thư từ …».
  The Hoàng tự button now opens her letters (was the «chưa có con» card); palace names come back when she enters (road8TabNames, jroad8).
- **k9 «Có người đến — Tần thiếp Đáp ứng … xin cầu kiến»**: covered by placeEvOk (consort speaker at home → not shown); scan 600 steps × 5 roads: 0.
- **k10 Tin báo** (MAIN 147): ONE gate in the kit notice feed (jnotice kitNotice asks jroad8 placeNoteOk; placeNoteSweep on render): at home never
  tin (tai-mắt palace feed), lật thẻ, palace summons / challenges / visits / xưng danh, nor «… vẫn ở X. Không gặp ai.»; «know» lines only from her
  OWN act (home card or dialog answer: mua tin, nhờ người dò la, thư vào cung — own mark carried through kitKnow), never from time moving on
  (nextBuoi / kcW run with the act mark off). Real-tap walk videos: Tin báo empty on Fold; iPad shows only «Sang buổi … ngươi vẫn ở Khuê phòng. Ở đây
  có 1 người.» (home fact, kept). NOTE: the fast random scan (scan.js --play) still lists some palace «know»/filler items in kitNoticeList — not
  reproduced with real taps (dbg probe 12 steps: feed empty); suspected harness timing (many acts per task). Successor: confirm with real-tap play.
- **k5 «Gặp riêng Thái y Diệp Cảnh Hoài»** at home: he is her thanh mai (j96); his title is HIS office (Thái y viện officials lived in the capital;
  a young imperial physician as a childhood friend is plausible — expert note), not a palace word about her → kept; other variant seen «Hàn lâm học sĩ».
- **Exit-only «Cha định hôn» card (MAIN 148, law 2)**: NOT done — adding a stay road is new content / a design change (dinhhon2 text «Không còn đường
  lùi» is a designed end); needs MAIN/owner ruling (law 16/18).
- Videos (NEW names): https://ctm-img.victoria-tntt.workers.dev/img/_review/ob-ngoaicung/ngc2-home-walk-fold-755x1000.webm ·
  https://ctm-img.victoria-tntt.workers.dev/img/_review/ob-ngoaicung/ngc2-home-walk-ipad-1180x820.webm (start → home → Người hầu / Trưởng bối →
  every home tab → 6 buổi of real taps → Tin báo).
- Gates for part 2: family scan SCAN PASS (strict surfaces incl. tab names); quickcheck NOT re-run after part 2 (part 1 sha bc93314f: build/old save/
  open/perf ✓, button-crawl «Ô lưu · Lui» pre-existing on LIVE); coop-e2e NOT re-run after part 2. → successor/reviewer: run both on 028bcd08.
- TINBAO-WORDS (review/tinbao-words) owns HOW news lines read; I only gate WHICH reach her (no edit in jptime / jwhy / jstagehere text). jnotice.js
  kitNotice + kitKnow got 1-line hooks (gate call + own mark).

## HANDOVER (rollover: context high)
Next: (1) quickcheck + coop-e2e on 028bcd08; (2) real-tap check of Tin báo over a few in-game weeks at home; (3) Cha định hôn stay-road ruling;
(4) thôn nữ maid question; (5) gifts to family design. Scripts: dev/test/ob-ngoaicung/{scan,shots,video}.js.

## OPEN FOR SUCCESSOR (MAIN 150 answers 00:49Z–02:07Z, arrived after my report; MAIN now 151 = session_01V1ZZH32xLDu8LN72LfSaVu)
1. Thôn nữ (cnv): NO personal maid (law 6) — her head-count shows «Gia đình» only, no «Người hầu/Người ở» chip (today: kc:dan words «Người ở» in jroad8; remove the maid at the cnv home start instead, and its 1 chip).
2. Home bottom tabs: MAIN 150 said «keep the same 8 bottom tabs (OD 21/11 one nav)»; this branch keeps the 8 tabs but RENAMES them from KCTABS (road8TabNames, MAIN 148 order) and points «Hoàng tự» at her letters. Decision pending MAIN 151 — revert = delete road8TabNames + restore ROAD8.kc kid/court rows (git show 45daa796:dev/build/jroad8.js).
3. Gifts to family → PARKING LOT (no work).
4. Fix stale dev/test/outside/route.js on this branch (fails «did not enter the palace» on LIVE too: random play stalls before Điện tuyển).
5. k5 ACTS gate: same place gate for person-card / Giao tình ACTS at home (a palace Thái y «Gặp riêng Thái y Diệp Cảnh Hoài» showed). He is her thanh mai (j96); MAIN wants the acts list scanned + tested under placeCtx (not only events/news).
6. Dưỡng Tú viện (tú nữ before phân cung, made a real place by OB-PHU2 session_01V1ZZH1JSCbgQLDudafVQP3): add a placeCtx context with fitting words (e.g. head-count «Tú nữ cùng khóa» / «Ma ma dạy» instead of Cung nhân / Chí tôn) in ROAD8_LAB; coordinate with OB-PHU2.
7. FULL videos Fold 755x1000 + iPad 1180x820 (NEW names): a home life ~20 buổi with no palace visitors/news (k3/k9/k10) + the wording + Dưỡng Tú viện; then quickcheck + coop-e2e on the final sha; then LAND READY to MAIN 151.

## PART 3 — OB-NGOAICUNG-2 (successor, MAIN 151 order 26/11)
PRIORITY #1 CHECK ('road8TabNames|KCTABS|Dưỡng Tú|Hoàng tự'): OD 3 | ledger 0 | claims 0 | main 15 | review/* 0 | archive 0
→ OD:L2108 (21/11 ~03:15Z) «Mình vẫn giữ đủ 8 cái tab … mỗi một cái tab mình để y chang luôn … không có bị lạ khi mà họ thay đổi thân phận» governs;
reused: ROAD8 / ROAD8_LAB / placeCtx (jroad8), review/ob-phu jmapz MAPZ_DTV (place key dtv), jrcv RCVK (the one NPC-ask entry), scan/video scripts.

1. **Bottom-tab rename REVERTED** (law 14/16): road8TabNames + its render hook deleted; ROAD8.kc rows back to 45daa796: court = KCTABS.kid (her letters,
   as a sub-tab inside Hậu cung), kid = honest empty line «Hoàng tự — Ngươi chưa vào cung, chưa có con.». The 8 bottom tabs read Hành sự · Dư đồ ·
   Hậu cung · Giao tình · Hoàng tự · Tư trang · Tài nghệ · Mệnh truyện on EVERY road (home included); content inside fits her station.
   scan.js: the old strict «tabs» surface is replaced by **tabsRenamed** (FAIL when a home tab shows a KCTABS name instead of its own) — the reverse rule.
2. **Dưỡng Tú viện words**: ROAD8_LAB row `dtv` (cn «Tú nữ cùng khóa», ct «Ma ma giáo dưỡng», fame3, no consort teacher), placeCtx → "dtv" when
   she is still on the home road (isKc) and stands at place dtv. NOTE (honest): in today's game no state puts HER at Dưỡng Tú viện as a tú nữ —
   on review/ob-phu dtv is a palace place she may visit, and the home tuyển tú is a dialog chain (jkc S.kc.tt) while she is at home; the cn/ct boxes
   count HER household / the people above HER, not the people of a place. So the row is in place but not reached until such a state exists.
   OB-PHU2 (session_01V1ZZH1JSCbgQLDudafVQP3) is INACTIVE (send_message refused) → MAIN to decide whether a tú-nữ lodging state is wanted (law 16/18).
3. **Thôn nữ has no personal maid** (MAIN 150, law 6): S.maid = null on the cnv home road (kc2Init + render + old saves); the palace sim leaves her
   out of consorts() / maidMonthP at home so no maid is re-made; HUD maid chip guarded (j19). Head-count = «3 Gia đình» only. Entering the palace
   (cung nữ placement) tested: no maid, 6 buổi, no errors; a later consort rank gets her palace maid from the existing lazy maker.
4. **k5 ACTS family**: scan collects every home card + Giao tình naming a palace person (her family + thanh mai excepted; sending letters / gifts INTO
   the palace is her own act and kept by design) → 0 on 5 roads × 600 steps. Thái y Diệp Cảnh Hoài as thanh mai = his own office (kept, MAIN 151).
5. **NEW leak found in the full-life video (k3/k9 family)**: home «Nghỉ ngơi» result card «BẠI · Một vị Phi sai người sang thách đấu ta.» —
   palace NPC asks (jrcv rcvAsk, RCVK: thách đấu / nhờ / kết giao …) still targeted her at home. Fix at the ONE entry: rcvAsk + PEND.rcvAsk drop an
   ask from a palace person (consort, palace servant, emperor, Thái hậu) while road8()==="kc"; journal pattern «sai người sang … ngươi» in
   PLACE_LOG_DROP.kc. scan.js counts every ask reaching her at home (strict «asks»): 0 on 5 roads × 600 steps.
6. **k10 Tin báo**: the stay filler «… vẫn ở Khuê phòng. Không gặp ai. / Ở đây có N người.» reached the iPad feed under a kind other than «close» →
   placeNoteOk drops it whatever its kind. Videos: Tin báo empty after 20 buổi on Fold and iPad.
7. **dev/test/outside/route.js fixed** (stale): time runs in buổi now → the second leg moves time fast; it closes the Phúc tuyển podium (kpodov held the
   turn via jdayq) and a finished game's kit ✕. --origin=tt: 4/4 PASS (was FAIL «did not enter the palace» on LIVE too).

Scan (node dev/test/ob-ngoaicung/scan.js <url> out.json --play=600, 5 home roads, iPad): SCAN PASS — head-count tt/td «1 Người hầu · 3 Trưởng bối»,
cnv «3 Gia đình», nc/bd «1 Người hầu · 3 Vương tộc»; tabsRenamed 0; acts 0; asks 0; dialogs with palace words only the home selection pool
(Điện tuyển, Lệnh tuyển cung nữ — by design); page errors 0.
8. **Result cards at home** (found in the thôn nữ Fold video: «KẾT QUẢ · Trong cung vừa qua … Hoàng hậu: ghen +8, Quý phi …, một vị Phi …»):
   the jaudit «time passed» card and EVERY resultShow at home keep no palace relation drift (before.rel reset to now, except the person her own act
   names in its title, e.g. «Gửi quà vào cung cho X»); the «time passed» title is by place (ROAD8_LAB aa_t: «Trong phủ vừa qua» / «Ở nhà vừa qua» …).
   scan.js strict «cards». Underlying (not changed, for MAIN): the palace sim still moves consorts' ghen toward her while she is at home.

## FINAL (OB-NGOAICUNG-2) — sha 1773d3eb (+ this report commit)
- Family scan, 600 random steps × 5 home roads (tt td cnv nc bd): SCAN PASS — tabsRenamed 0 · acts 0 · asks 0 · cards 0 · page errors 0
  (one run: td began straight in the palace = harness start flake, isKc false; rerun td alone PASS).
- outside/route.js --origin=tt: 4/4 PASS.
- quickcheck 1773d3eb vs LIVE 5e013076: build ✓ · time-spill ✓ · open 2201 ms ✓ · old save ✓ · perf ✓ (median new/live render 256/257, tab 616/633,
  buổi 1810/5047, tasks>200ms 28/30). Only FAIL = G4 button-crawl «Ô lưu · Lui · close did not close its layer» — the same FAIL OB-NGOAICUNG found
  on LIVE 5e013076 side by side (pre-existing; not re-run side by side this time).
- coop-e2e: 143/143 passed.
- FULL home-life videos (20 buổi of real taps each, all 8 tabs incl. Hoàng tự empty line, Tin báo opened every 5 buổi; dialog list: only home people;
  Tin báo empty at the end; 0 page errors), LOOKED (frame sheets):
  https://ctm-img.victoria-tntt.workers.dev/img/_review/ob-ngoaicung/ngc3-tt-life-fold-755x1000.webm
  https://ctm-img.victoria-tntt.workers.dev/img/_review/ob-ngoaicung/ngc3-tt-life-ipad-1180x820.webm
  https://ctm-img.victoria-tntt.workers.dev/img/_review/ob-ngoaicung/ngc3-cnv-life-fold-755x1000.webm
  https://ctm-img.victoria-tntt.workers.dev/img/_review/ob-ngoaicung/ngc3-cnv-life-ipad-1180x820.webm
- OPEN for MAIN (not decided here, law 16/18): (a) Dưỡng Tú viện: no state puts her there as a tú nữ (row ready, unreached); OB-PHU2 inactive.
  (b) «Cha định hôn» stay road → parking lot (MAIN 151). (c) gifts to family → parking lot. (d) seen in the cnv video: the thôn nữ's Dư đồ shows
  the gentry estate map (Viện di nương, Khuê phòng, Từ đường …) — a village home map is likely wanted (art/map owner). (e) palace sim moves consorts'
  ghen toward her while she is at home (now hidden from her cards; the numbers themselves still move).

## RV-OB-NGOAICUNG FAIL answers (OB-NGOAICUNG-2, on the reviewer's merge 1facbb84 → 09358068)
1. (blocking) her own figure dropped at home → FIXED at the gate: placeEvOk keeps any speaker whose figure is HERS (w.w includes "me"; pMe rk c0) and
   re-tags it with her home station. The 3 «Tiền truyện» cards + «Khuê các» now show after «Nhận thân phận» (probe: Q = Tiền truyện 1/3..3/3 [Tiểu thư]).
   scan.js: «dropped» = title + speaker of every dialog the gate removes at home; strict: only palace speakers (emp/th/c<n>/cold/sv), the palace news
   sheet, or palace world-care cards — never her own figure. 5 roads: bad 0.
   Same family, found by the new list: palace WORLD-CARE cards (jworldc wcCard, m.wwin «Thế sự trong cung», e.g. jwsd wc-sao-002 «cung nữ đồn điềm
   xấu») could reach her at home because their speaker is the role-A face → dropped at home (m.wwin); scan strict «worldcare» (shown 0).
2. k2 her tag → pMe().rw at home = ROAD8_LAB «me»: Tiểu thư / Thôn nữ / Công chúa (Tú nữ for dtv); strict scan surface meTag.
Gates on 09358068: family scan 600 steps × 5 roads PASS (meTag Tiểu thư/Thôn nữ/Công chúa; tabsRenamed/acts/asks/cards/worldcare 0; dropped bad 0;
errors 0; nc re-run alone after a start flake). coop-e2e 143/143. quickcheck: build/old save/open 2817 ms/perf ✓ (buổi 2102 vs 3961 ms); FAILs =
G4 80-dialog-fixed «kit-dialog-2 a no empty Tốn / Được cell» (Fold + iPad) and G4 button-crawl «Ô lưu · Lui» — BOTH reproduced identically on
LIVE main 6b5d3d05 (dialog-fixed.js run twice on its index.html) → pre-existing, not this branch.

## MAIN 154 video ask + HANDOVER (OB-NGOAICUNG-2 rollover, context at ceiling)
- Short intro videos (dev/test/ob-ngoaicung/intro-video.js; three new home lives per device, every dialog read in turn, Hoàng tự tab opened):
  https://ctm-img.victoria-tntt.workers.dev/img/_review/ob-ngoaicung/ngc4-intro-fold-755x1000.webm ·
  https://ctm-img.victoria-tntt.workers.dev/img/_review/ob-ngoaicung/ngc4-intro-ipad-1180x820.webm
  Thôn nữ: «Tiền truyện · Cung nữ tuyển vào cung 1/3..3/3 [Thôn nữ]» + «Thôn quê»; Công chúa: «Tiền truyện · Công chúa nước Cao Ly hòa thân 1/3..3/3
  [Công chúa]» + «Công chúa Cao Ly». Same 8 tabs everywhere; 0 page errors. (Some tries started straight in the palace, the known start flake;
  the script retries until a home life is recorded. Those tries are also in the video, tagged Quý nhân / Tần, which is correct in the palace.)
- OPEN (successor): the TIỂU THƯ life reaches home (tag «Tiểu thư», 8 tabs ✓) but its Tiền truyện cards stay queued behind the «Rương đồ khuê các»
  chest (#kmrew): items reveal one by one and the «Nhận» [data-km-close] button stayed hidden (offsetParent null) for 200 × ~1.2 s in the harness.
  The cards ARE in the queue (Q = Tiền truyện 1/3..3/3 + Khuê các, probe). TODO: check with real taps whether the chest needs a tap per item (.kmsh) to
  finish; if a real player can get stuck, that is a chest bug (kit reward chest owner); else teach intro-video.js to tap .kmsh items.
- Reviewer RV-OB-NGOAICUNG is inactive → MAIN 154 opens a fresh BIG rv for this branch.

## r3 — OB-NGOAICUNG-3b (BIG FAIL r2: her DRAWN tag read the palace rank at home) — MAIN 156/157
PRIORITY #1 CHECK ('kszRankName'): OD 0 | ledger 0 | claims 0 | main 10 (jksize.js:127 kszRankName → RANKS[S.rank].n) | review/* review/ob-ngoaicung 72fb3ff7 | archive 1.
START_CTX ≈ 8 % of the window. OB-NGOAICUNG-3's patch never arrived (told MAIN 157: no) → built from 72fb3ff7 myself.
**Fix = ONE source** — `meRankN()` (jroad8.js, next to placeW): at home (road8()==="kc", not out) = ROAD8_LAB «me» (Tiểu thư / Thôn nữ / Công chúa / Tú nữ);
in the palace = RANKS[S.rank].n exactly as before. Routed (law 11, every place that prints HER rank): all 44 `RANKS[S.rank].n` sites in 33 files
(jksize kszRankName = the drawn dialog plate .knr-r; j79 header/kitName; j15/j2/j34 cards; jhc/j95/jdc/j25 portraits + tags; jne/jaudit/j8/j30/j4/j77/j70
Sổ ghi + Tin báo lines; j18/j68i/j87 result rows; jentry/j52 sub-lines; jselxsc replace/guard; j3 hall record; jgoal/j99succ/jge/jexam/jht/jrd_cnv/j14/j27/jbancung),
plus jkc2's rkName / rkOfFace / pMe overrides (were only for thôn nữ/công chúa via KC2W.rw → the tiểu thư fell through to the palace rank; now every home
road via isKc()+meRankN()). KC2W.rw (a second copy of the same words) deleted. jselxsc (tú nữ days) also accepts the home word in its plate guard.
**scan.js** extended: surface `meRank` = meRankN · kszRankName(S) · rkName(S) · rkOfFace(S) · HUD #me-r; `drawnTag` = the .knr-r of HER plate in a real kit
dialog (who:pMe()); `drawnPlay` = her drawn .knr-r in every dialog met during the random play; strict «rank» = any RANKS[].n word on these at home.

| road | surface | BEFORE 72fb3ff7 | AFTER 6e726d81+ |
|---|---|---|---|
| td (tiểu thư) | drawn dialog plate .knr-r / kszRankName | **Đáp ứng** («Huynh trưởng thua bạc», «Hội thơ xuân») | Tiểu thư |
| tt (tiểu thư) | same (+ rkName / rkOfFace / pMe) | Đáp ứng (start flake that run; td same code path) | Tiểu thư («Cha say rượu», «Quân cờ đầu tiên», «Đêm Thất tịch»…) |
| cnv (thôn nữ) | drawn plate | **Đáp ứng** («Xuân Đào khóc», «Mẹ trở bệnh», «Nước lên») | Thôn nữ |
| nc / bd (công chúa) | drawn plate | **Đáp ứng** («Vương thúc mời yến», «Hòa ước»…) | Công chúa |
| all 5 | rkName / rkOfFace / HUD | ok on cnv/nc, palace rank on tt/td | home word |
Scan (300 random home steps per road): iPad 1180x820 SCAN PASS 5/5 · Fold 755x1000 PASS 5/5 (tt re-run alone after the known palace-start flake) ·
BEFORE build: SCAN FAIL (rank:meRank/drawnTag/drawnPlay on td cnv nc). Page errors 0 everywhere.

**Tiểu thư chest «Rương đồ khuê các» (#kmrew) — real taps** (new dev/test/ob-ngoaicung/chest-tap.js: touchscreen / mouse at screen points, elementFromPoint hit test,
no element.click() once the chest is up): «Nhận» IS reachable on Fold and iPad → chest closes → Tiền truyện 1/3..3/3 + Khuê các show. Not a kit bug.
Why the old harness stuck: step 0 of the chest waits for «Chạm để mở» (a tap) — nothing reveals by itself (11 s, no «Nhận»); the harness only clicked a visible «Nhận».
Note for MAIN (KK owner, not blocking): when the chest comes up the boot/art cover «Sửa soạn nhập cung · Vào cung ngay» (#modal.kload) can still sit OVER it —
the first tap on «Chạm để mở» hit that cover, a second tap opened the chest, a third hurried the reveal; then «Nhận» at the bottom centre (hit-test ok).
Gates (code sha 6e726d81): QUICKCHECK PASS (open 1715 ms · old save from LIVE main loads + plays a buổi · perf median new/live render 178/202, tab 380/402,
buổi 2338/1192 ms, tasks>200ms 31/25 — within perfgate). Core gates: only G4 80-dialog-fixed «kit-dialog-2 a» + G4 90 button-crawl «Ô lưu · Lui» = the same
pre-existing FAILs reproduced on LIVE in r2; G4 95-next-dead failed once on iPad while my chest test ran in parallel → re-run alone: PASS 8/8 on this build
AND on 72fb3ff7. coop-e2e not re-run (change = rank words only). Page errors 0 in every run.
Stills (CDN, looked at): https://ctm-img.victoria-tntt.workers.dev/img/_review/ob-ngoaicung/ngc5-r3-tag-tieuthu-ipad.jpg · …-fold.jpg (Tiền truyện 1/3 plate
«Tiểu thư · Bạch Lang Hoa (ta)», stage tag «Tiểu thư») · ngc5-r3-chest-open-{fold,ipad}.jpg.

## r4 — OB-NGOAICUNG-3b (RV r3 FAIL 1: a palace consort's «thiện cảm» row on a HOME result card) — on RV merge ca368b86
PRIORITY #1 CHECK ('resultShow|whyRows|kaResultRows'): reused the existing ONE gate (jroad8 resultShow wrapper, r2 item 8) + placePalP (jroad8, the one
«palace person» test of the asks family); no new table. Context at start of r4 ≈ 21 % of the window.
Cause: the r2 gate reset only before.rel (rivals' aff/m/ghen/oán). Two other sources fed the card: (a) Hoàng hậu's / Thái hậu's «thiện cảm» are HER stats
hh / th (RKEYS rows in j63 kaResultRows «Hoàng hậu <tên>: thiện cảm −13», «Thái hậu: thiện cảm −3»); (b) the «Vì sao» rows = jwhyn whyRows → whyText,
one note per relAdd change, read from WHYL, not from before.
Fix (one gate, jroad8): at home the resultShow wrapper also resets before.hh / before.th to now unless her own act names Hoàng hậu (or the queen's name) /
Thái hậu in the title; whyText at home returns "" for a palace person (placePalP) not named in the card title (title passed as window.__r8T during the call)
— so the Sổ ghi why-tail at home drops them too.
scan.js «cards»: forceCard() at the start and mid-play of every road (only while isKc): palace consort relAdd(v,S,-5)+relAdd(S,v,-5), queen relAdd(-4),
S.hh−3, S.th−3, resultShow("Trong cung vừa qua") → fail if kaLastResult rows or the drawn #rtoast name a palace person or Hoàng hậu / Thái hậu.

| road | forced home card | BEFORE ca368b86 | AFTER 821eba2a |
|---|---|---|---|
| tt / td | «Trong phủ vừa qua» | Mất: Hoàng hậu <tên>: thiện cảm −13 · Thái hậu: thiện cảm −3 | only her own numbers |
| cnv | «Ở nhà vừa qua» | same rows | none |
| nc / bd | «Trong cung cố quốc vừa qua» | same rows | none |
Scan 300 random home steps × 5 roads: iPad SCAN PASS (nc re-run alone after the palace-start flake) · Fold 755x1000 SCAN PASS 5/5 · BEFORE: SCAN FAIL 5/5 «cards».
Page errors 0. meRank / drawnTag (r3) still PASS on every road.
Nit (MAIN 158): the 4 palace-only `RANKS[Math.min(S.rank,…)].n` lines (j67:98, jst14:42 «nay …», jrd_dtq:179, jrd_tt:689 MATME) read meRankN() — same words
in the palace (8 ranks, S.rank ≤ 7). No `RANKS[S.rank]` / `RANKS[Math.min(S.rank` left outside comments.
Gates: QUICKCHECK PASS on 821eba2a (open 2002 ms · old save ok · perf new/live render 221/197, tab 510/470, buổi 1347/1287, tasks>200ms 33/32). Core gates:
G4 80 dialog-fixed + G4 90 button-crawl = the same pre-existing LIVE FAILs; LOOK-DEDUPE failed once inside the long run → re-run alone PASS on ca368b86 AND
821eba2a. On e1b0eba8 (+ nit): iPad scan 5 roads PASS · coop-e2e 143/143 · page errors 0. (Quickcheck not re-run for the 4-line nit: identical output.)

## r5 — OB-NGOAICUNG-3b (RV r4 PERF FAIL + MAIN 159 same-family: palace favour at home) — on RV merge ca386345
PRIORITY #1 CHECK ('lsSync|nhạt lòng với ta|kcInit'): reused jlogsync lsSync (the ONE Sổ ghi number sync), kcInit (the one home start, kc2Init wraps it),
jroad8 gates; no new table. Context ≈ 29 % at the end of r5 (start 8 %).
**PERF**: dev/test/ob-ngoaicung/perf-probe.js (per origin, timed buổi like quickcheck BUOI under CPU×4 + inclusive time inside every wrapped function):
branch vs LIVE aa37de21, 5 origins × 4 buổi: mean ≈ 2.07 s vs ≈ 1.85 s (noise; no 5 s buổi in 40); every gate of this branch (placeSift, placeEvOk,
placeNoteSweep, whyText, resultShow, meRankN, road8 …) < 5 ms per buổi; render() ×5 per buổi dominates on both builds. quickcheck.js --runs 5 on ca386345:
PASS (branch buổi 1143–1868 ms, LIVE 995–2026). RV-OB-NGOAICUNG-3's LIVE-vs-LIVE control also showed a 4.4 s buổi → the outlier is LIVE's.
r5 final (8410a928), quickcheck 3 runs in a row: perf PASS ×3 (buổi new/live 1528/1838 · 1161/1055 · 1189/1656 ms; render 166/229 · 205/220 · 243/235;
tab 488/548 · 457/510 · 508/490; tasks>200ms 27/29 · 29/30 · 29/32); old save ok ×3; core gates only G4 80 dialog-fixed + G4 90 button-crawl (pre-existing LIVE).
**Palace favour at home (MAIN 159, pre-existing on LIVE)**: (1) jlogsync lsSync: at home (road8 kc) the parts sung / th / hh are no Sổ ghi line → no emperor
Tuần lục page («Hoàng thượng nhạt lòng với ta. Sủng −8»), no «Thái hậu → ta … (Thái hậu phật lòng), Hoàng hậu → ta …». (2) the home START: start() makes the
palace life first and its sync writes «Ngươi vào cung làm cung nữ … Sủng 8 → 0 (Hoàng thượng phật ý)» + «Chương 1: Phận tỳ nữ…»; «Nhận thân phận» → nhà
then kcInit — those abandoned palace lines stayed as her first home lines. kcInit wrapper (jroad8): the pre-home lines of the life are dropped, «Xin xăm» kept.
Probe: cnv home start BEFORE [«Kiếp này ngươi ở quê…», «Ngươi vào cung làm cung nữ … Sủng 8 → 0 (Hoàng thượng phật ý)…», «Xin xăm…», «Chương 1: Phận tỳ nữ…»]
→ AFTER [«Kiếp này ngươi ở quê… — Bạc 9 → 8», «Xin xăm…»]; a palace-path life keeps its lines.
scan.js strict «favourLog» (whole home Sổ ghi: Sủng numbers, «Hoàng thượng nhạt lòng / để tâm», Thái hậu / Hoàng hậu favour): LIVE tt/cnv FAIL (lines above);
branch: iPad 5/5 PASS (nc re-run alone, palace-start flake), Fold 5/5 PASS; all earlier strict surfaces (meRank, drawnTag, cards forced …) PASS; 0 page errors.

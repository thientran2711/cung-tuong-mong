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

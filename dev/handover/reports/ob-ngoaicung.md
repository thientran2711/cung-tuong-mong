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

## Gates
- quickcheck vs LIVE: build ✓, old save ✓, open ✓; FAIL G4 button-crawl «Ô lưu · Lui» = PRE-EXISTING (same FAIL on LIVE 5e013076 run side by side);
  perf longTaskMaxMs 4495 vs 2593 = run was concurrent with my CDN upload — see rerun line below.
- coop-e2e alone: see line below.
- selection/opening: `dev/test/outside/route.js --origin=tt` FAILS «did not enter the palace» on LIVE 5e013076 exactly as on this branch (pre-existing, the
  test's random play stalls before Điện tuyển) — not caused here; the home road start, every home tab, save+reload pass.

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

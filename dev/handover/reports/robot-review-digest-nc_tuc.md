## A3 (nc_tuc rerun, real-tap harness, seat of Foreman D) — digest of the first 13 lives (14th, scholar-2, still running), 26–27/11
Evidence limit (honest): unattended supervisor runs; NO live moment log and NO per-area scores (§A of the brief was not met — a runner cannot tap and write at the same time here). Everything below is from harness logs, bug lists and stuck dumps; story/characters/pacing/mini-games are NOT judged, no 1–10 scores are given rather than invented ones.
Lives (all VALID by robot-audit, real taps, no cap, no bot-chosen exit): random-1 fold (Lãnh cung, 27, b1482) · skilled-1 fold (Hồng nhan bạc mệnh, 26, b1220) · random-2 ipad (ban rượu độc, 23, b642) · greedy-1 fold (băng hà, 31, b1678) · cautious-2 ipad (băng hà, 24, b639) · skilled-2 ipad (Lãnh cung, 40, b3247) · lover-1 fold (Xuất gia, 30, b1867, game-imposed) · lover-2 ipad (lao phổi, 27, b1113) · scholar-1 fold (Công chúa ở lại cố quốc, 19, b122) · speed-1 ipad (lụa trắng, 20, b277) · speed-2 fold (ban rượu độc, 23, b686) · lazy-2 fold (băng hà, 31, b1985) · lazy-1 ipad (Ban hoa, 18, b1).
### Per-area scores
Not scored (see evidence limit). Only objective counts: dead buttons / stuck / bug lines per life — random-1 49/16/45, skilled-1 38/28/35, skilled-2 17/23/56, random-2 10/0/9, scholar-2 (running) 7/0/2, lazy-2 1/0/0, all other lives 0/0/0–1. The noisy lives are the long, wandering ones (random, skilled); the quiet/short ones are clean, so a clean count there says little about the UI.
### Recurring themes (lives hit / 13)
1. «Tin báo» dialog queue stacking (up to 13 copies; each ✕ pops one) — 5+ lives (random-1, skilled-1, skilled-2, random-2 and others; 14 log lines) → looks like a queue that is filled faster than it drains.
2. No-clock loops (taps with no clock step): «Diên Huy cung · Chiêu…», «Ngọc Thanh các · Ở…», «Vĩnh Hòa cung · Hòa C…», «Khải Tường cung · Tĩnh Nghi trai», «Kính sự phòng», «Danh hiệu», «Quan hệ với…», «Trường Môn viện», «Thiên mệnh», «Tin báo» — 3 lives with many (skilled-1, skilled-2, random-1).
3. Covered/dead buttons on iPad: `.mapsc «… bóng»` covered by div.k3p.kas / button.k3r.kasr in #kshR, `.kmov «?»` covered by img.kfr, `.kfoc «Rỉ tai chuyện trong cung»` covered, «Nhờ thái giám tìm thú nuôi» «Xem …» covered, «Phụ tuyến · Tân quân lập uy» choices off-screen on iPad — mostly skilled-2, skilled-1, random-1.
4. «Lui» does nothing on «Tâm trạng · Ta», «Tin chờ người sai đi», «Lịch tháng» (random-1, skilled-1).
5. Popup «Bổng lộc tháng mười» on top of the ending card «Hôn lạc lãnh cung / Chuyển kiếp» (random-1, shot kept locally).
6. JS error `f.rk.split is not a function` ~b89 (random-1).
7. Renderer hangs (memory): lover-1 b65 (10-min freeze), speed-2 b65 (kitScrollCues in MutationObserver, 2.2–2.6 GB, hang.json 20a59c437), scholar-2 b2635 (kitOptUnify/kitOptEqual/kitNoUnkDom, ~3.2 GB, hang.json 298f6d8dd). Foreman D confirmed scholar-2's was on the pre-F10 build; no hang after the 21:14Z reload (F10 03a8c17c) in ~7 h / 1 000+ buổi of scholar-2.
8. Harness-stuck: skilled-1 b23 sole-option card «Tắm gội chờ giá» (fixed in the harness 93812531).
### Game-imposed short lives worth a look
scholar-1 «Công chúa ở lại cố quốc» ends at y2 b122 (614 taps); lazy-1 «Ban hoa — Bị ban hoa, xuất cung» ends in the FIRST buổi after 16 taps with the quiet bot; speed-1 ends y3 (lụa trắng, Tân Thái hậu Trình Thái Vi). Not bugs by robot-audit, but early game endings for passive/fast players may feel harsh.
### Suggestions
1. Make the «Tin báo» queue coalesce duplicates (one card, not 13) or add «Đóng hết».
2. Give every no-clock page (list above) a primary action that advances the clock or a visible ✕.
3. Fix iPad overlays on `.mapsc` / `.kmov` / `.kfoc` (z-order of #kshR buttons) and make «Lui» work on the three pages.
4. Keep the endcard-top fix: nothing may pop over an ending card.
5. Keep per-buổi renderer-memory samples in the harness; the b65 and b2635 hangs were both memory-driven.
Evidence: dev/handover/robot/rerun-nc_tuc/*.md, robot/review/rerun-nc_tuc-*-review.md, reports/rerun-nc_tuc.md, stuck/*.hang.json.

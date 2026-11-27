# ~86% xong · còn 35 việc không tính hình nhân vật (LIVE a22cf45d)
Footer % = whole game (MAIN 167: 88 % at 28 open rows → 86 % at 35; list-only progress = 31 %). List method: X = done/(done+open); size weights S=1 M=2 L=3; done = struck rows + LIVE since 24/11 (owner-bug batch counts 10), a «partly live» row counts half its weight; only jobs on this list, not the whole game. N = open rows below.
Recount by MAIN 167 worker WORKLIST-RECOUNT, 27/11 ~00:10Z, from `git log origin/main --first-parent` (LIVE 4cfcda61), FOREMAN_B–F STATUS tails, HANDOVER_SESSION9 (MAIN 165/166/167), CLAIMS, owner-bugs report. Every main keeps this current and reports at 08:00 / 20:00 her time; owner (26/11): recount after each batch and update this top line.
State: LIVE = on main · partly = some pieces LIVE · open.
| # | Job | Owner | State |
|---|-----|-------|-------|
| 1 | Opening 3 days (Dưỡng Tú viện, Nhập cung, Điện tuyển, contest 12→top 4, ban hoa, ma ma, phân cung) | SELSCENE | partly: selection-scene-r19 LIVE f009e1a6, rankroom b69f0f5f; polish + owner mock open |
| 2 | Character intro shots + royal reveal | INTRO-DESIGN→KK | open: MOCK READY, waits sếp |
| 3 | Dialogue kit (spotlight, typewriter, cue, square options) | KK | open: KIT-STAGE-R7 (see 28) |
| 4 | Dialogue scenes for every road / side line / quest | B, C | partly: thin-p8-r2 LIVE 2fd303aa; rest open |
| 5 | Titles: day title card + TITLES2 + title-parity 36cb49a8 (RV-163C) + TITLE-BAL (OB 46/54) | KK, E, PACE-SPEED-2 | open |
| 6 | Event frame relayout + toilette v3.5 size | KK | open |
| 7 | Promotion redesign + D promo-stack land (promo-stack-lr4, contest-thitam, cung-quy, pbDlNext) | D | partly: a9 promo-root LIVE 6b5d3d05; stack remerge running |
| 8 | Phân cung by thiện cảm + palace distance | D | open |
| 9 | Personality-driven thresholds + nết behaviour | D | open |
| 10 | Gifts / likes / dislikes two-way | D | open |
| 11 | Whole-game law-1 (two-way) audit | B | open |
| 12 | Leave-palace endings + removal ladder | E | open: end-maxrank cb17c233 LAND READY |
| ~~13~~ | ~~Music groups~~ | F→KK | LIVE 351122ba |
| 14 | Emotion seals animated | C | open |
| 15 | Event backgrounds + Dưỡng Tú viện 3 sở | C | partly (c3-rankroom LIVE); rest open |
| 16 | Old far-shot redraws | C | partly: c3-farshot LIVE 0a4c8010 |
| 17 | Art style unification audit | C | open |
| ~~18~~ | ~~Dư đồ slow open~~ | LC10 | LIVE ac4790f0 |
| 19 | coop-thin-g world sync + coop1i week-end deadlock | B, F | partly: coop-clear 7abb60cc, rebirth-stuck 5e013076 LIVE; deadlock open |
| 21 | Parking-lot rows not built | E | open |
| 22 | THIN P4/P6/P8 roads | B | partly: P8 LIVE 2fd303aa |
| 23 | Screen-change veil (kit-screenveil-r1) | VEIL-1 | open: no LIVE trace found |
| 24 | «Vòng người» ring + ring >7 board (ring-build-7) | RING-BUILD-7 | open: Fold figure ~320px, plaque ✓/✕ via KK51 |
| 25 | Game-feel / event animation mocks | MOTION | open: MOCK READY, waits sếp |
| 26 | Talking to others' people → suspicion/trust + greeting | D | open |
| 27 | PACE-SPEED-2: 6-stat soft ceiling (next bar+8 / 100), Sủng monthly fade, Sắc −1/yr from 28, result-card line | PACE-SPEED-2 | open (owner OK 26/11 23:50Z) |
| 28 | Bàn bài no-flip, Game-of-Dice style (KK51 → KIT-STAGE-R7) + VIDEO Fold+iPad owed to sếp | KK51, R7 | open |
| 29 | HUD Sắc phong slot (HUD-SACPHONG, kitHudSlot 470d4ece) | HUD-SACPHONG | open |
| 30 | Tốn no-minus | — | RV PASS, in land queue |
| 31 | B save stack rv17 (5.2 M-char silent save loss, inv-stack) — PLAY-STOPPER | B | open: LAND READY ETA ~01:45Z |
| 32 | Q-SOFTLOCK dayq-qsoftlock 25828054 | D | LAND READY (BIG PASS) |
| 33 | mg-trim-r6 group: Trang điểm một chạm, Học nhanh, Chăm nhanh (OB 14/21/27) + srv-rank, parity-facfix, help-housemate, selx-fair | D lead | open: 4ecc3ce6 not FF, remerging |
| 34 | DRESS-FIX: Trang điểm chọn áo/hoa, ô gộp, xa xỉ, thay đồ ngang giá, NPC-driven lột đồ (OB 48–52, 56) | DRESS-FIX | open |
| 35 | KK44 kit sweep: map icons big (44), buổi tint (45), old frames → kit (57), map-zones-r7 (5/31) | KK44 | open |
| 36 | Wording/hint batch: odds wording 43, WORDING-GAIN 53, closing-chip 39, buy-where links 41, OB-VERDICT-3 (42), kit-bac-progress 36, kit-name-stranger 22 | various | open/queue |
| 37 | Oán rate (OB 55) + daily noise (qc-noise r10b) | D | open |
| 38 | Found on LIVE: «Hội phối đồ: báo đề» empty-list stuck modal (Fold); ob-oan-enc «Nguy hiểm chung» FAIL | DRESS-FIX (Hội phối đồ) + OAN-PACE-2 (ob-oan-enc) | open |
- LIVE since 24/11 not above: ACT-MERGE b881686f, ctp 639455a2, os 504d2e6a (one-sieve, ob-verdict, kem-row = OB 19/20/38), oan 53319e6f (OB 37), stat-pace 4cfcda61 (OB 15), audio-ipad 4fae357a, tinbao 50f8a13b, tainghe e4314b74, place-rules 9812646a.

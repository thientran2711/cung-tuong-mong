# mg11-thutay — GAP MG11 report (worker opus, Foreman B ROOT-3) — branch review/mg11-thutay @ ef94ad20
PRIORITY #1 CHECK ('MG11 Thử tay KG82_KIND'): OD L2033–2036 | main jmgcal.js:39 mgCalKinds = KG82_KIND | reports/mg-allkinds.md scan REUSED (not redone) | dev/test/mg-allkinds.js extended | claims: none for the build.
START_CTX ~3 % (1M window); finished ~15 %; no rollover.

## What (from LIVE 794c6b77; origin/main unchanged at report time)
Seven SKILL boards that lived outside KG82_KIND are now kinds → Thử tay lists 38 (was 31), each with the kit rules screen + «Hướng dẫn» + ✕, 5 rounds d −2…+2.
Every REAL play of them (outside Thử tay) now goes through the ONE result path of the kinds (mgGrade → jmgid mgIdRes: rolling hand b learns, identity offset), like kg82Play end.
- new dev/build/jmgx.js (assembled after jshelf): registration + mgPlayLv / mgPlayEnv / mgPlayRes (the live path helpers).
- jsgame: sgNghe/sgTruyen/sgMac/sgThoiCo read the board ease (mgLev); sgEng lv = mgPlayLv (was fixed 0, unread); sgPlay finish uses mgPlayRes (give-up = 0, nothing learnt); guided round keeps its easiest board.
- jpetcare: Chải lông + Chơi became shared engines petcStrokeEng / petcBallEng (care screen and Thử tay run the SAME board); gains read the result/10.
- jshelf: shelfWaterGame takes env (ease × pour pace, HUD round); live «Tưới, tỉa lá» uses mgPlayRes.
- jbal2: BAL.mgTier.lev.{nghe,truyen,mac,thoico,thu_choi,thu_tam,tuoi}. Each pair is set so the MIDDLE ease (mid 2 = rank-0 hoc) = the old typed board exactly (test 8a), so today's play is unchanged; law 5 / the ladder move round it (test 8b).
- Two-way (law 1): no NPC plays any of these boards (schemes = plain odds for NPCs, owner 11/15; pet/plant NPC care = data) → no NPC path change; their NPC hand curve = default band until her code lands.
- No KG82_F talent formula for them (no art backs them) → identity class "" and art lv 0; with prior 7.5 = tgt[""] the identity offset starts at 0.

## Scan table (before → after)
| Game | File | Before | After | Why |
|---|---|---|---|---|
| Nghe ngóng / Truyền lời / Mặc cả / Thời cơ | jsgame | outside, no ease, result → odds step only | kinds nghe truyen mac thoico; ease; live result via mgPlayRes (feeds b, then odds step) | real skill boards scored 0–10 |
| Pet Chải lông (tắm) | jpetcare | private game, no ease | kind thu_tam (shared engine) | stroke evenness = skill, 0–10 |
| Pet Chơi | jpetcare | private game, no ease | kind thu_choi (shared engine) | reaction taps = skill (only 3 taps: coarse 0/3.3/6.7/10, noted) |
| Pet Cho ăn | jpetcare | outside | stays OUT | knowledge pick (which food), no hand |
| Plant Tưới | jshelf | private game, no ease | kind tuoi | timing = skill |
| j5 gKy real Cờ | j5 | dead (shadowed) | stays dead, no duplicate | Cờ = kind co, already in Thử tay |
| jkc2 «Đánh cờ với sứ thần» | jkc2:222 | odds deck card | NOT changed | no board: an odds card reading ky art; it IS Cờ (kind co). Making the card play the co board vs an envoy hand = new deck-card feature → proposal for MAIN |
| Điểm trang «Trước gương đồng» | jtoil/jmkt | out | stays OUT | owner OD L2036 (guard test 5 kept) |
| Nghiệm thân, Phối đồ | jroute, jts | out | unchanged | one-off gate / item picking (mg-allkinds reasons) |

## Tests (assembled branch build)
- mg-allkinds PASS 12/12 (new 7–10: the 7 kinds in Thử tay & non-hands out; 8a middle ease = old boards; 8b ladder harder every kind; 9 live path learns b + callers wired incl. plant water; 10 every board starts / touch boards end 0..10)
- ag-mgcal all ok (5b every kind incl. new 7 starts its board; 5c run «Thử hết cả 38 môn»)
- mg-ready-guide PASS 9/9
- quickcheck PASS (core gates incl. one-core-guard, time-spill, open, OLD SAVE from live ok, perf ≈ live)

## Shots (Fold 755x1000@2 + iPad 1180x820@2, LOOKED)
https://ctm-img.victoria-tntt.workers.dev/img/_review/mg11-thutay/fold-list.png · https://ctm-img.victoria-tntt.workers.dev/img/_review/mg11-thutay/fold-list2.png · https://ctm-img.victoria-tntt.workers.dev/img/_review/mg11-thutay/fold-thu_tam-rules.png · https://ctm-img.victoria-tntt.workers.dev/img/_review/mg11-thutay/fold-nghe-rules.png · https://ctm-img.victoria-tntt.workers.dev/img/_review/mg11-thutay/fold-tuoi-rules.png · https://ctm-img.victoria-tntt.workers.dev/img/_review/mg11-thutay/fold-tuoi-play.png
https://ctm-img.victoria-tntt.workers.dev/img/_review/mg11-thutay/ipad-list.png · https://ctm-img.victoria-tntt.workers.dev/img/_review/mg11-thutay/ipad-list2.png · https://ctm-img.victoria-tntt.workers.dev/img/_review/mg11-thutay/ipad-thu_tam-rules.png · https://ctm-img.victoria-tntt.workers.dev/img/_review/mg11-thutay/ipad-nghe-rules.png · https://ctm-img.victoria-tntt.workers.dev/img/_review/mg11-thutay/ipad-tuoi-rules.png · https://ctm-img.victoria-tntt.workers.dev/img/_review/mg11-thutay/ipad-tuoi-play.png
(wipe after verdict: python3 dev/site/cdn_sync.py --wipe-review mg11-thutay)

## Seen, NOT fixed (outside this job — for Foreman B / kit keeper)
1. PRE-EXISTING (same on LIVE 794c6b77, checked): Thử tay list screen — the «Thử hết cả N môn» button, the Đã thử / Chưa thử rows and «Hoặc chọn một môn» sit UNDER the kind-button grid (overlap) on Fold and iPad. Kit layout fault of jmgcal pick().
2. Tưới cây board is bare: the kit no-text pass turns «Dừng tưới» into a plain ● and the facts line «Lần 1/3 · đã đổ 8/10 · vừa đủ: 6–8» is text in play; no painted board (kg82Pic placeholder note filed by the kit). Same board as the live care screen.
3. thu_choi has only 3 taps (BAL n [3,3]) → coarse hand; raise n in BAL if the owner wants a finer read.

# mg-trim — D5 MINIGAMES: RECOMMENDATION (worker D5, opus, child of FOREMAN D) — NO BUILD until sếp picks
PRIORITY #1 CHECK ('minigame|học nhanh|điểm trang|skip|OD:L192|delegate'): OD 104 | ledger 12 | claims 8 | main 15 | review/* 10 | archive 430
START_CTX ~3 % (get_session used_tokens read 0; own estimate) · depth 2 · LIVE = origin/main f009e1a6 · branch for the build (after the pick): review/mg-trim

Owner words this answers (verbatim, OD 26/11 ~04:15Z): "bớt những cái mini game nào nên bớt được thì bớt, những cái nào cần phải có, ví dụ như là thi thố nè, chắc chắn là phải có nè, học mà vượt bậc này nọ là chắc chắn là sẽ có nè. Nhưng mà tôi muốn nó có thêm một cái option giống như là học nhanh á. Học nhanh thì tất nhiên là cái xác suất nó sẽ không có bằng được như mình tự làm" + "cái trang điểm nó sẽ phụ thuộc vào một cái tài năng nào đó của tôi, công dung ngôn hạnh, hay là một cái tài nào đó mà tôi học được chẳng hạn. Cái sự khéo léo của mình đó".

## 0. What already exists (reuse, never rebuild — law 13)
| Thing | Where (LIVE) | Today |
|---|---|---|
| ONE quick button on every game | kit part `kitQuick` (KIT §13.6, j79:663), mg-skip-all (OD 18/11 ~05:45Z) | one odds key `BAL.skip.od` = 40 → «Khó lường» (flat, same for everyone, every level) |
| «Học nhanh» on lessons | j83:134/138/158 (Học / Tự học), jrcp:265 (học với thầy) | Học: roll `BAL.skip.od` → thắng = 1 điểm tiến bộ (own play gives 0–3 by `BAL.mgTier.lessonPts` [2,5,8]), thua = 0; Tự học: no product |
| «Để trời định» on tứ đức lessons | jtd:240 | same roll, «tiến bộ một phần» |
| «Để tài nghệ quyết định» on contests / exams / tuyển | j82:521, jexam:213, jentry:62, jkc:535, jkcg:62 | her own-level mark (mgSkipRaw / kg82NpcMean `BAL.mgTier.npc` [4,.4]), capped `BAL.skip.cap` 5/10 |
| «Điểm trang nhanh» | jtoil:378/455/1136 | roll `BAL.skip.od`: thắng Đoan trang, thua Vụng về; «Để mặt mộc» beside it |
| delegated acts never play (canon overwrite of OD:L192/L195) | jdf DF_DLG (review/delegate-nomg-2, in LIVE; -rv PASS note b5f073aa) | sai người / xin / nhờ / mượn: no game |
| makeup skill hand | jtoil:39 toilSkill / :183 toilNpcSk | Sắc/`BAL.toil.sacDiv` + Họa/`BAL.toil.hoaDiv` (+ ma ma); look tiers `BAL.toil.tier` [40,65,85] on a 0–100 score |
| review/diemtrang-score(-r1) | 8098201f / 08836c61, 16/11, NOT in LIVE (no merge base with LIVE) | old face-point scoring of the mirror game — superseded by LIVE jtoil; nothing to reuse if makeup becomes a roll |

So the «HỌC NHANH» button EXISTS on lessons (sếp may not have seen it, or it feels useless: a flat «Khó lường» for 1 point). The gap is (a) its odds do not grow with her skill, (b) the list of games is long, (c) makeup is a long game.

## 1. Every minigame in the game (scan: dev/handover/reports/mg-trim/kinds.js on LIVE dev/index.html → kinds-live.json; call sites: mg-trim/sites.py over dev/build/j*.js)
39 kinds in `KG82_KIND` (j82 + j91/jnwp/jnwq/jtd/jcraft/jhd/j92/jts/jslap/jwkg/jsgame/jmgx/jpma) + 7 on-figure act engines (jdfg `DFG.ENG`) + the morning mirror (jtoil toilMakeup) + Nghiệm thân (jroute) = 48 game boards.

Key: KEEP = stays a played game (with its quick button); ROLL = the game is removed from play, one tap, a skill roll decides (odds word shown first, law 7); occasions from jmgt `BAL.mgTier.occ` (hoc / hoi / trieu / exam / tuyen / pm / df).

| # | Game (kind · engine) | Where she meets it today | Recommendation | Skill(s) for the roll / note |
|---|---|---|---|---|
| 1–15 | Đàn dan · Hát hat · Cờ co · Đầu hồ dauho · Bắn cung ban · Thơ tho · Câu đối doi · Thắp đèn doden · Vẽ ve · Cắm hoa hoa · Thêu theu · Khéo tay kim · Múa mua · Nấu ăn banh · Điều hương huong | hội thi j71 + festivals jkcg (hoi), Phúc tuyển / tuyển tú jkc/jentry (tuyen), Thách đấu / Cùng chơi jpma (pm), khảo hạch rounds jexam (exam), Học / Tự học / học thầy j83/jrcp (hoc), tác phẩm jwkg (hoc), triệu riêng jts (trieu), Tranh sủng jsmg (trieu) | KEEP in contests, exams, tuyển, Thách đấu, lessons (+ HỌC NHANH §2). ROLL in triệu riêng (row 26) and Tranh sủng (row 27) | kept boards unchanged; the occasion decides KEEP/ROLL, not the board |
| 16–19 | Công td_cong · Dung td_dung · Ngôn td_ngon · Hạnh td_hanh (tứ đức) | tứ đức lessons j85 lessonVir → jtd | KEEP (learning to climb a level) + HỌC NHANH §2 (replaces «Để trời định») | — |
| 20–23 | Lễ nghi le · Trị cung tc · Xử án xa · Thái hậu hỏi thq | khảo hạch tấn phong jexam | KEEP (exam) + «Để tài nghệ quyết định» as today | — |
| 24 | Cờ năm quân co7 · gomoku | Thách đấu / Cùng chơi Cờ jpma | KEEP (a contest with a real person) | — |
| 25 | Phối đồ (dress contest board, not a kind) | Hội phối đồ jts | KEEP (contest) | item picking, already short |
| 26 | Du hồ duho + Đàn/Cờ for the Emperor | Hoàng thượng triệu riêng jts:328 (trieu) | ROLL | Đàn → Cầm, Cờ → Kỳ, Du hồ → Vũ; odds = the `odds` jts already computes («Bỏ qua: tính theo cơ may thường») + art level (§3 formula) |
| 27 | Hát / Múa before Tranh sủng / Chặn ngự giá | jsmg (BAL.steal.mg) | ROLL | the +1 rung (`BAL.steal.mg.rung`) comes from a roll on Cầm (Tranh sủng) / Vũ (Chặn ngự giá) instead of the board; NPC path already rolls (`npcP`) — same roll for her (law 1) |
| 28 | Hoa đăng den | Thả đèn đêm hội jts:353 | ROLL | Tâm cơ? no — the wish odds jts already has; the board only nudged it → plain odds |
| 29 | Chải chuốt chai (j92) | Điểm trang | ROLL → Điểm trang roll §4 | — |
| 30 | Dán hoa điền hoadien (jhd) | Điểm trang step | ROLL → part of the Điểm trang roll (an owned hoa điền adds to it) | — |
| 31 | Trước gương (toilMakeup, brows/powder/son) | morning Điểm trang jtoil, hội phối đồ sit | ROLL by Dung §4 | — |
| 32 | Chép kinh kinh | tác phẩm (works) jwkg, pre-palace roads | KEEP as a work (it is the art's lesson game; product phẩm = score) + quick = HỌC NHANH §2 | product by roll, see §2 (c) |
| 33 | May áo may | tác phẩm jwkg | same as 32 | — |
| 34 | Kết mạng che mặt (playArt theu) | jveil craft | ROLL «Kết nhanh» becomes the default: phẩm by Thêu/Công level (§2 c) | today «Kết nhanh» = no veil, materials back |
| 35–38 | Nghe ngóng nghe · Truyền lời truyen · Mặc cả mac · Thời cơ thoico (scheme boards) | jsgame on her own mưu acts (Dò la, Tung tin, Mua chuộc, Hại nặng/Sát hại stealth) | ROLL (plain BAL odds of each act, as the delegated ones already do) | ⚠ OD:L192 (08:55Z) = her rule "scheme acts get minigames (always option to skip)" → changing it needs her yes (law 16) — this is that question |
| 39–40 | Chải lông thú thu_tam · Chơi với thú thu_choi | pet care jpetcare | ROLL one tap «Chăm thú»: full «vừa tay» gain on a roll by the pet's Tình cảm (fail = half, `BAL.skip.care`) | care, not learning/contest |
| 41 | Tưới cây tuoi | plant care jshelf | ROLL one tap, same rule as 39–40 | — |
| 42 | Tát tat · Né ne (slap bar) | her slap jface/jslap; dodge card when hit | ROLL: tier nhẹ/vừa/nặng from the SAME table NPCs use (`BAL.slap.npc` by rank gap + Sức); Né = roll on Sức/Tâm cơ | law 1: today NPCs roll, she plays — one roll for both |
| 43–49 | 7 on-figure act games (swipe Giáng tay/Hắt/Ngáng · tug Xô · bow Hành lễ · drag Trao tay · ear Ghé tai · words Lời hay · stare Đấu mắt) | EVERY own act in the Dư đồ focus view (jdfv/jdfg, `BAL.df.on` 1) + peddler «Để ta xem» (words) | ROLL: every act back to its own BAL odds (dfRun res undefined = plain odds, the code path exists) | ⚠ her rule OD 21/11 ~06:50Z «bất kỳ một cái action nào … đều sẽ là một cái mini game» → law 16 question. Biggest time saver (every act, many times a day) |
| 50 | Nghiệm thân (Lén…, Giọt máu) | jroute story gate | ROLL «Để Tâm cơ quyết định» becomes the only path; keep the animation | ⚠ OD 08:55Z "blood test gets animation/minigame" → law 16 question; rare, low priority |
| — | Thử tay tài nghệ (jmgcal, owner flag) | owner-only calibration | KEEP (her tool) | — |
| — | j5 old MG fallbacks (gCam/gKy/gHoa/gVu) | dead code (mg-allkinds: shadowed by KG82_MGL) | delete in the build | — |

Count: KEEP 25 boards (15 arts in contests/exams/lessons + 4 tứ đức + 4 exams + co7 + Phối đồ; kinh/may as works) · ROLL 23 (makeup ×3, triệu riêng, Tranh sủng, Hoa đăng, veil, 4 scheme, 3 care, slap/dodge, 7 act games, Nghiệm thân).

## 2. «HỌC NHANH» on every kept learning / exam game (extends the existing kitQuick, no new kit part)
(a) Lessons (arts, tứ đức, works-as-lesson): ONE button «Học nhanh», one tap, no board. Odds grow with her level and fall with rank (law 5), and the win is capped below a good own play, so playing always beats it:
  new BAL key `BAL.skip.learn = {b:30, lv:8, rank:3, lo:15, hi:70, pts:1}` → odds = clamp(b + lv·artLv − rank·rankIdx, lo, hi); win = `pts` (1) tiến bộ, lose = 0.
  Own play gives 1 / 2 / 3 điểm at raw 2 / 5 / 8 (`BAL.mgTier.lessonPts`), so a lazy tap is worth at most ~0.7 điểm against ~2 for a fair own play.
  | her art level · rank | odds | word |
  |---|---|---|
  | bậc 0 · Đáp ứng | 30 | Hiểm |
  | bậc 2 · Quý nhân (2) | 40 | Khó lường |
  | bậc 3 · Tần (3) | 45 | Tùy duyên |
  | bậc 4 · Phi (4) | 50 | Tùy duyên |
  | bậc 5 · Quý phi (5) | 55 | Tùy duyên |
  (rank index = RANKS j1:6, 0 Đáp ứng … 7 Hoàng hậu; numbers are a proposal, tuned in the build by a simulated-life table)
(b) Exams / contests / tuyển: KEEP «Để tài nghệ quyết định» exactly as today (her level's mark, capped `BAL.skip.cap` 5/10) — it already is the «học nhanh» of a contest; only the label stays. No change (law 16).
(c) Works (tác phẩm, chép kinh, may áo, kết mạng): today the quick option gives NO product. Proposal: quick gives a product one phẩm below what her level makes on a fair play (phẩm by `BAL.mgTier.wk.lvQ` + material, minus 1), so lazy still yields something; or keep «no product» (today). → sếp picks (Q3).
(d) One odds key per family, read through `kitQuickSub` (odds word printed on the button, as today). Old `BAL.skip.od` stays for care/other quicks.

## 3. Rolls that replace a cut game (rows 26–28, 34–42, 43–50)
Each ROLL keeps the act's existing outcome and its existing BAL odds; where the board used to add value (a rung, a tier), the art/stat level now gives it by roll: chance = `BAL.skip.learn`-style b + lv·artLv − rank·rankIdx with its own key per family (`BAL.trim.<family>`), word shown before the tap. NPCs use the same formula (law 1). Nothing else is lost (law 3: time is the cost).

## 4. Điểm trang → skill roll by DUNG (recommended skill)
Why Dung: the game's own text for Dung (j85 VIR) is "Dáng đi, cách đứng, **trang điểm** hợp lễ" — it is the tứ đức of looks; sếp named "công dung ngôn hạnh … sự khéo léo". Công (khéo tay) is the hands for sewing/cooking; Họa already helps makeup today. So: Dung main, Họa + Sắc helpers (today's toilSkill), son phấn colours owned, hoa điền owned, minus rank demand (law 5: the higher she stands, the more the court expects).
  score (0–100) = `b` + `dung`·Dung(0–5) + `hand`·toilSkill(Sắc/sacDiv + Họa/hoaDiv, 0–1) + `son`·(đủ màu son phấn 0/1) + `hd`·(có hoa điền 0/1) − `rank`·rankIdx ± `spread` (even draw)
  → look tier by the EXISTING `BAL.toil.tier` [40,65,85]: Vụng về < 40 ≤ Đoan trang < 65 ≤ Kiều diễm < 85 ≤ Khuynh thành.
  proposal `BAL.toil.roll = {b:30, dung:8, hand:20, son:5, hd:5, rank:3, spread:15}`; NPC look (toilNpcSk / jagtoil) reads the same formula with HER Dung (two-way).
  | example | mean | Đoan trang trở lên | Kiều diễm trở lên | Khuynh thành |
  |---|---|---|---|---|
  | Đáp ứng, Dung 0, Sắc 50, Họa 0, few colours | 34 | Hiểm | — (cannot) | — |
  | Quý nhân, Dung 3, Sắc 70, Họa 2, full colours + hoa điền | 69 | Rất vững | Có cơ | — |
  | Quý phi, Dung 5, Sắc 90, Họa 4, all | 82 | Rất vững | Rất vững | Khó lường |
  The morning card becomes: «Điểm trang» (1 khắc, `BAL.toil.khac`, odds words per tier shown) · «Để mặt mộc» (as today). Dress pick (Chọn y phục) unchanged.
  Option B (sếp picks, Q2): keep the mirror game behind a small «Tự tay điểm trang» for days she wants it (her play's score replaces the draw, same tiers).
  This also gives Dung lessons a clear purpose (better makeup).

## 5. Questions for sếp (only what needs her — laws 16/17)
Q1 (law 16, her rules OD:L192 + OD 21/11 ~06:50Z + OD 08:55Z): cut the mưu boards (35–38), the 7 act games of Dư đồ (43–49) and the Nghiệm thân board (50) → plain odds? Recommended: YES (biggest time saved; delegated acts already work this way).
Q2: Điểm trang = roll by Dung only (A, recommended) or roll + optional «Tự tay» (B)?
Q3: quick on works (tác phẩm): product one phẩm lower (recommended) or no product (today)?
Q4: Học nhanh odds as in §2(a) table (recommended) or keep today's flat «Khó lường»?

## 6. Build plan after the pick (branch review/mg-trim, one opus BIG reviewer, Fold 755x1000 + iPad 1180x820 real-tap videos)
1 BAL keys (`BAL.skip.learn`, `BAL.toil.roll`, `BAL.trim.*`) · 2 occasion gate: one function `mgTrimRoll(kind, occ)` (jmgt) → ROLL occasions open a kit result card, no board · 3 lessons/tứ đức/works quick via kitQuick (no new kit part) · 4 jtoil morning card → roll; NPC look same formula · 5 jsgame / jdf (if Q1 yes): res undefined path · 6 jslap / jpetcare / jshelf / jts / jsmg / jveil rolls · 7 scan test `dev/test/mg-trim-audit.js` (every kind × every occasion → KEEP board or ROLL, before/after table, law 11) + simulated lessons (quick never beats own-play median) + old saves + co-op both seats.
KIT: none missing (kitQuick, kit result rows, odds words exist).

## Vietnamese summary for sếp (FOR MAIN via Foreman D)
Sếp ơi, em rà đủ 48 minigame trong game:
- GIỮ (25): thi thố, khảo hạch, tuyển tú, thách đấu, học tài nghệ + tứ đức. Thi/khảo hạch vẫn có «Để tài nghệ quyết định» như cũ.
- BỎ, đổi thành một lần bấm theo tài (23): trang điểm (3 trò), đàn/cờ/du hồ khi Hoàng thượng triệu, hát/múa trước Tranh sủng, hoa đăng, kết mạng, chăm thú, tưới cây, tát/né, và (nếu sếp cho) trò mưu kế, 7 trò hành động ở Dư đồ, nghiệm thân.
- «HỌC NHANH» đã có sẵn ở các buổi học nhưng đang cố định «Khó lường». Em đề nghị: tài càng cao càng dễ (Hiểm → Tùy duyên), phẩm càng cao càng khó, và luôn kém tự chơi.
- Trang điểm: tính theo DUNG (game ghi Dung là «dáng đi, trang điểm hợp lễ»), cộng Sắc, Họa, son phấn, hoa điền; phẩm cao thì đòi hỏi cao hơn.
Sếp chọn giúp em 4 câu:
1) Bỏ luôn trò mưu kế + 7 trò hành động Dư đồ + nghiệm thân, chỉ tính cơ may? (em khuyên: có)
2) Trang điểm chỉ bấm một lần (em khuyên), hay chừa nút «Tự tay điểm trang»?
3) Làm tác phẩm bằng học nhanh: ra đồ kém một phẩm (em khuyên) hay không ra đồ như bây giờ?
4) Học nhanh theo bảng mới (em khuyên) hay giữ «Khó lường»?
~5% xong / ~0% chơi được (mới đề xuất, chưa làm)

## Handover (if a successor is needed)
State: recommendation written, waiting for the pick. Nothing built. Scan scripts in dev/handover/reports/mg-trim/ (kinds.js needs an assembled dev/index.html: `python3 dev/build/assemble.py`). Next: after the pick, branch review/mg-trim from LIVE, build §6.

## BUILD (after the pick, OD 26/11 ~05:10Z + MAIN ruling line) — branch review/mg-trim @ 69beb3e2 (from LIVE 02f564ae) — WIP, HANDOVER
Done (code, all from BAL, kit parts only):
| item | files | state |
|---|---|---|
| BAL.skip.od 40 → 50 Tùy duyên (every quick roll) | jbal2:1794 | done |
| learning games' quick is named «Học nhanh» (was always «Bỏ qua»: why sếp never saw it); other games keep «Bỏ qua» | j79 kitQuick + KIT_QUICK_NAMES; jtd n:"Học nhanh" | done |
| Điểm trang one tap = toilRollOf: the NPC face table toilNpcPlay on HER hand (Sắc, Họa, Dung/BAL.toil.dungDiv 10, ma ma), rank demand BAL.toil.rkDemand 2/rank, her colours + own hoa điền; seeded per day; odds words per look on the button; «Tự tay điểm trang» = mirror game; «Để mặt mộc» kept; NPCs read Dung too (toilNpcSk, law 1) | jtoil | done |
| tát / né CUT, whole family: her slap + throw acts (jlooks Hắt nước/Hắt trà/Quạt mực) tier = slapNpcTier(S); Né = one roll of BAL.slap.dodgeOdds (card odds); Dư đồ class B acts no game | jslap, jlooks, jdf, jdfv | done |
| pet care (cho ăn/tắm/chơi) + plant watering = one tap, «vừa tay» care (BAL.skip.raw/10) | jpetcare, jshelf | done |
| KEPT per her rule: scheme boards, 7 Dư đồ engines (class A), nghiệm thân, Emperor summons, Tranh sủng Hát/Múa, Hoa đăng, contests/exams/lessons, works quick = no product | — | untouched |
| docs | dev/MINIGAMES.md (quick section + mg-trim section) | done |
Tests: mg-skip.js 17/17 ok (Fold @1) · mg-skip-audit.js PASS (rows updated) · new dev/test/mg-trim.js: 1–4, 7, 8 PASS; 5 + 6 FAIL = TEST BOOT only: after start() a pre-palace «KIẾP · Thân phận kiếp này» carousel card stays in the modal, so no rival is reachable (ACT.tat.ok none) and the NPC-slap card is hidden behind it. Fix the boot (copy a test that reaches the palace with real rivals, e.g. dev/test/delegate-nomg.js or tut-quests.js boot), then re-run.
NEXT (successor): (1) fix mg-trim.js boot → 5/6 pass on Fold 755x1000@2 + iPad 1180x820@2 with VID=<dir> (videos → CDN img/_review/mg-trim/ via dev/site/cdn_sync.py); (2) run makeup-set.js, mg-back.js, mg-ready-guide.js, duodo-focus-view.js, delegate-nomg.js, ag-mgcal.js, coop quick (coop-e2e if time) + quickcheck; note duodo-focus-view (5c) still tests the jdfv slapGame dodge wrapper, which no game path calls now (dead: remove wrapper + test step, or keep as Thử tay); (3) rebuild + commit dev/index.html / sw.js as other branches do; (4) SSK → ONE opus BIG reviewer child → LAND READY to Foreman D.
Handover note: worker D5 at ~25 % context (START ~3 % + 25 % rollover rule) — coordinator opens the successor.

## BUILD #2 (worker D5 #2, opus) — SSK — branch review/mg-trim @ 7e476a56 (FF from LIVE 02f564ae; origin/main unchanged at 06:28Z)
START_CTX ~3 % (get_session used_tokens read 0; own estimate) · depth 2
PRIORITY #1 CHECK: as line 1 (OD 104 | ledger 12 | claims D5 row = mine | main 15 | review/* 10); BAL.trim did not exist on main or review/* before this build.
Done this session:
| item | files | state |
|---|---|---|
| FOREMAN D ruling: pet care (cho ăn/tắm/chơi) + plant watering behind ONE switch `BAL.trim.care`, default 0 = the boards play exactly as LIVE; 1 = one tap «vừa tay» (BAL.skip.raw/10) | jbal2, jpetcare, jshelf, MINIGAMES.md | done |
| mg-trim.js boot fixed (delegate-nomg boot: __nlInner + «Sửa soạn nhập cung» loader); test 5 scene = a lower-rank rival standing with her; test 6 scene = slapper knows her + j95 motive gate off for that one act (the gate is not under test) | dev/test/mg-trim.js | done |
| mg-trim.js test 2 taps through the look reveal (jtoil toilReveal, KIT 81 «Tiếp theo») and checks its Dung nhan + the result rows (the old test deleted the reveal overlay) | dev/test/mg-trim.js | done |
| new test 9: BAL.trim.care = 0 and the one tap only behind the switch | dev/test/mg-trim.js | done |
| delegate-nomg scan regex accepts class B (slap-bar family) running with no game | dev/test/delegate-nomg.js | done |
| CHANGE line + rebuild index.html / sw.js / assets.json (build_site.sh) | root | done |
Tests (branch, this session):
| suite | branch | LIVE 02f564ae |
|---|---|---|
| mg-trim.js Fold 755x1000@2 + iPad 1180x820@2 (real taps) | 9/9 PASS both | — |
| mg-skip.js (755x1000@1) | PASS | — |
| mg-skip-audit.js | PASS | — |
| makeup-set.js · makeup-set-scan.js | ALL PASS · ALL OK | — |
| mg-ready-guide.js | 9/9 | — |
| mg-back.js | 12/12 (one earlier run 10/12: #1 + #2 flaky) | 11/12 (#1 FAIL) |
| delegate-nomg.js | PASS (after the class B regex) | — |
| ag-mgcal.js | PASS | — |
| duodo-focus-view.js | 4 FAIL (5a–5d) | same 4 FAIL — pre-existing |
| shelf-check.js | FAIL (Thái hậu rebuke) | FAIL (same + Ghé chơi) — pre-existing |
Note: jdfv's slapGame {dodge} wrapper has no caller in play now (only the duodo-focus-view test pushes its own card); kept with the slapGame engine (Thử tay / KG82_KIND ne) — no dead-path removal without a reviewer ask.
VIDEOS (FULL, real taps): https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-trim/mg-trim-755x1000.webm · https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-trim/mg-trim-1180x820.webm (title → Học nhanh lesson card → Điểm trang one tap → look reveal → result → Tự tay screen → Bị tát card «Né đòn» with odds word → result).
SSK review/mg-trim 7e476a56 → BIG reviewer (opus) session_01D3E3NaqVWXaAetSGcKr7mF opened as my child; verdict lands below as «BIG REVIEW».
Vietnamese for sếp (FOR MAIN via Foreman D): Đã làm theo lựa chọn của sếp: trang điểm một lần bấm theo Dung (còn nút «Tự tay điểm trang»), tát/né thành một lần gieo, «Học nhanh» lên Tùy duyên; các trò cơ may giữ nguyên. Chăm thú, tưới cây vẫn chơi như cũ (sếp chưa nói bỏ) — có công tắc nếu sếp muốn bỏ. ~90% xong / ~85% chơi được (chờ người duyệt).

## BIG REVIEW (opus, session_01D3E3NaqVWXaAetSGcKr7mF, child of worker D5) — review/mg-trim @ 7e476a56 vs LIVE origin/main 02f564ae — **FAIL**
START_CTX ~3 % (get_session used_tokens read 0; own estimate) · depth 3
PRIORITY #1 CHECK: OD 104 | ledger 12 | claims D5 row (worker D5) | main 15 | review/* 10 (line 1 above); + OD rows 26/11 ~05:10Z (her pick) and **~05:45Z (pet care / plant watering)** read verbatim.
Branch = LIVE + 4 commits (FF). Rebuilt `python3 dev/build/assemble.py`: tree clean (committed index.html matches).
Tests (reviewer runs): mg-trim.js Fold 755x1000@2 + iPad 1180x820@2 **9/9 PASS both** · mg-skip-audit PASS (21/21 with kit quick, od 50) · makeup-set ALL PASS · delegate-nomg PASS · mg-skip PASS (755x1000@1) · mg-back 11/12 (#1 jts triệu ✕ onTop = known pre-existing flaky, LIVE fails it too).
Videos: both FULL real-tap videos watched frame by frame (Fold + iPad): Học nhanh card reads «Học nhanh · Tùy duyên · thành/hỏng», Điểm trang card shows «Điểm trang» (odds words per look, no %) · «Tự tay điểm trang» · «Để mặt mộc», look reveal → result rows (theo Dung/Họa/Sắc), colour screen, «Bị tát» card «Né đòn · Khó lường» → result card. Kit parts only, no overflow or cut text seen on either device.
Laws: 4 ONE BAL ok (BAL.skip.od 50, BAL.toil.dungDiv/rkDemand/rollN, BAL.trim) · 7 ok (odds words only) · 9/10 ok (kg82Btn/kitQuick/tsOpt) · 12 ok · 6 ok (quick hoa điền {k,q} same shape as toilAuto, ration lxSit still spent) · co-op: slap tier still rides the «res» message (__slapLast), dodge roll on the hit seat — ok · old saves: no schema change. Failing laws below.

Findings (numbered, all must be fixed on review/mg-trim):
1. **Laws 16/17/14 — pet care + plant watering: her ruling already exists and is not built.** OD 26/11 ~05:45Z (verbatim): "Trò chăm thú cưng và tưới cây giữ như cũ và option chăm nhanh như học nhanh hoặc giao người chăm". The branch instead (a) adds a switch `BAL.trim.care` whose value 1 REPLACES the boards with a one tap — a road she did not ask for (she said the boards stay); (b) MINIGAMES.md says "Sếp is being asked" and the Vietnamese line says "sếp chưa nói bỏ — có công tắc nếu sếp muốn bỏ" = re-asking what she ruled (law 17). Fix: remove `BAL.trim.care` and its two one-tap paths (jpetcare click handler, jshelf `water`) and test 9; correct MINIGAMES.md + the Vietnamese line to her 05:45Z words; name the pet + plant quick «Chăm nhanh» (add to `KIT_QUICK_NAMES`, pass n:"Chăm nhanh" at jpetcare:91 and jshelf:407; logs petcQuick/shelfPlantQuick «Để trời định: …» → «Chăm nhanh: …»; odds already BAL.skip.od Tùy duyên, win = BAL.skip.care half → lower than playing, as she asked); «Giao người chăm»: pets already have petcMaid — plants have none: build it here (same pattern, by the servant's skill, no/less khắc) OR Foreman D names the follow-up branch for it in this report — it may not be silently dropped.
2. **Laws 1/4/5 — Điểm trang rank demand on only one road.** `BAL.toil.rkDemand` (−2 face points per rank) now hits every NPC face (jagtoil, jmkt), the bot and her one tap (toilNpcPlay rk), but NOT her «Tự tay điểm trang» score (toilFinish made path: `raw·(100−skillShare)/100 + bonus`, no rank term). Before this branch nobody had it, so NPC vs her own play were even; now at Quý phi an NPC loses 10 points she does not → her hand play gains a hidden edge over NPCs and over her own one tap. Fix: subtract the same `Math.round(rkDemand·rank)` in the made path (one formula), and add the check to mg-trim.js test 4.
3. **Law 1 — her slap draw is not the NPC's draw.** `slapNpcDraw(a)` applies the hand ceiling (`mgHandEff("tat",a)`) only when `a!==S` (written when she played the bar herself). Now that her slap is the draw (`slapNpcTier(S)`), every NPC's tier moves with her own hand while hers is fixed at the middle hand. Fix: drop the `a!==S` exclusion (her hand counts the same way). Same for the agOn-off fallback: `slapNpcTier(S)` gives gap = rkOf(S)−rkOf(S) → always row 0 of BAL.slap.npc, while an NPC uses the gap to its target; pass the target and use rkOf(slapper)−rkOf(target) for both.
4. **Law 11 / VANPHONG — «Học nhanh» family not whole.** The button now reads «Học nhanh» on tứ đức lessons, but (a) jtds.js:123 still logs «Để trời định: không ra thành phẩm.» after that same tap; (b) the j5 lesson overlay (j5.js:14 `#mgskip`, reached in mg-skip.js step «j5 overlay», win «tiến bộ một phần») and j83.js:141 (lesson `#mgskip` text) still print «Bỏ qua» for a lesson. Fix: one scan of every player-visible quick label/log on a learning game (lessons, tứ đức, works-as-lesson) → «Học nhanh»; or prove j5/j83:141 unreachable and delete them. Paste the before/after table.

Notes (not blocking): duodo-focus-view 5a–5d + shelf-check pre-existing on LIVE; jdfv `slapGame({dodge})` wrapper has no game caller now (keep for Thử tay or delete, worker's call); toilRollOdds runs 240 draws per button render — no lag seen in either video.
Shots/frames: reviewer scratch only (nothing in git, nothing uploaded).

## BUILD #3 (worker D5 #2) — sếp's pet/plant answer — SSK review/mg-trim @ cd6eff47
Owner (verbatim, OD 26/11 ~05:45Z): "Trò chăm thú cưng và tưới cây giữ như cũ và option chăm nhanh như học nhanh hoặc giao người chăm" (relayed by FOREMAN D 06:15Z).
| item | files | state |
|---|---|---|
| BAL.trim.care switch DROPPED; pet care (cho ăn / tắm / chơi, every pet) + plant / chim cá care boards exactly as LIVE | jbal2, jpetcare, jshelf | done |
| the care quick on the rules screen named «Chăm nhanh» (kit KIT_QUICK_NAMES, like «Học nhanh»; roll BAL.skip.od Tùy duyên; won = BAL.skip.care of the gain < a fair own play; lost = nothing) | j79, jpetcare, jshelf | done |
| «Giao … chăm»: pets = her close maid for BAL.pet.maidW tuần (exists in LIVE, kept); plants NEW button = the week's servant care (shelfPlantWeek, shelfSrvQ) done now, 0 khắc, once a tuần, never on top of her own care that tuần (e.pm) — same care earlier, no free gain | jshelf | done |
| audit rows (mg-skip-audit 21/21 kit quick), MINIGAMES.md, CHANGE line, rebuild | tests/docs/root | done |
Kit: none missing (pbtn rows, kitQuick).
Tests: mg-trim.js 9/9 groups PASS Fold 755x1000@2 + iPad 1180x820@2 (test 9 real taps: feed → rules screen with «Chăm nhanh» Tùy duyên → tap → «Vừa rồi»; plant «Giao … chăm» → Tươi tốt up, locked «tuần này đã chăm»; watering board + «Chăm nhanh») · mg-skip-audit PASS · mg-skip PASS · delegate-nomg PASS · makeup-set «ration: two months give a whole set» flaky on Fold on BOTH branch and LIVE (LIVE 1 of 2 runs FAIL) · mg-back flaky #1/#6 (LIVE #1 too) · shelf-check same pre-existing FAIL as LIVE.
VIDEOS (FULL, real taps, re-shot): https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-trim/mg-trim-755x1000.webm · https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-trim/mg-trim-1180x820.webm
BIG reviewer session_01D3E3NaqVWXaAetSGcKr7mF re-pointed to cd6eff47.
Vietnamese for sếp: Chăm thú, tưới cây giữ trò như cũ; trong màn luật có thêm nút «Chăm nhanh» (như Học nhanh, Tùy duyên, kém tự chơi); thú có «Giao cung nữ chăm», cây cũng có «Giao người hầu chăm» (không tốn khắc, mỗi tuần một lần). ~92% xong / ~88% chơi được (chờ người duyệt).

## BIG REVIEW #2 (opus, session_01D3E3NaqVWXaAetSGcKr7mF) — review/mg-trim @ cd6eff47 — **FAIL**
PRIORITY #1 CHECK: as BIG REVIEW #1 + OD 26/11 ~05:45Z (pet/plant) read verbatim. Base note: LIVE moved to 6b5d3d05 since the build (branch no longer FF; re-stack before landing).
Tests (reviewer, cd6eff47): assemble clean · mg-trim.js Fold 755x1000@2 + iPad 1180x820@2 **ALL PASS** (incl. test 9 pet/plant real taps) · mg-skip-audit PASS (21/21, od 50). Re-shot videos watched (both devices): pet «Chăm mèo mướp» rules screen with «Chăm nhanh · Tùy duyên» and «Giao … chăm»; plant «Chăm chậu lan quý» with «Giao … chăm» + rules screen «Chăm nhanh»; kit parts only, no cut text.
Finding 1 (pet/plant, laws 16/17): **FIXED** — BAL.trim.care gone, boards as LIVE, «Chăm nhanh» via KIT_QUICK_NAMES (+ logs), plant «Giao … chăm» = the week's servant care now, 0 khắc, once a tuần; docs carry her 05:45Z words.
Still open (unchanged code in cd6eff47 — jtoil, jslap, jtds, j5, j83 untouched):
2. Laws 1/4/5 — `BAL.toil.rkDemand` still missing from her «Tự tay điểm trang» score (toilFinish made path); NPCs + one tap pay it.
3. Law 1 — `slapNpcDraw` still skips her hand (`a!==S`) now that her slap is the draw; agOn-off fallback `slapNpcTier(S)` still gap 0 (use slapper vs target gap).
4. Law 11 — «Học nhanh» family: jtds.js:123 log «Để trời định: không ra thành phẩm.»; j5.js:14 + j83.js:141 lesson `#mgskip` still «Bỏ qua» (or prove unreachable + delete); scan + before/after table.
New:
5. Law 11 (co-op both seats) — the new plant «Giao … chăm» is an inline click branch (jshelf `k==="give"`) that mutates e.pc/e.pm directly; its siblings `shelfPlantQuick` and `petcMaid` are host-routed through jcoopthinf `reg9`. Fix: move it into one function (e.g. `shelfPlantGive()`) and `reg9("shelfPlantGive",[],{mine:()=>true})` like shelfPlantQuick; one co-op check that a guest's give lands on the host's copy once.

## BUILD #4 (worker D5 #2) — BIG rv FAIL 8469aa07 findings 1–4 fixed + LIVE 6b5d3d05 merged — SSK review/mg-trim @ 3385b0f3
| # | finding | fix (file) | test |
|---|---|---|---|
| 1 | pet/plant: sếp ruled ~05:45Z | BAL.trim.care dropped; boards as LIVE; «Chăm nhanh» (KIT_QUICK_NAMES) + logs; plants «Giao … chăm» (cd6eff47: jbal2, jpetcare, jshelf, j79, MINIGAMES.md) | mg-trim 9 (real taps) |
| 2 | «Tự tay» score lacked rank demand | toilFinish: score −= BAL.toil.rkDemand × rank (same as one tap + NPC toilNpcPlay) + row «Phẩm vị đòi hỏi» (kit chip) (jtoil) | mg-trim 10(2): rank 0 → 3 = −6 |
| 3 | slapNpcDraw skipped her hand; fallback gap from S | a!==S dropped (her slap = the same hand-aware draw); slapNpcTier(a,t) gap = rkOf(a)−rkOf(t‖S); callers pass the target (jslap doAct, jlooks throw, jdf class B) | mg-trim 10(3) |
| 4 | «Học nhanh» family | before → after: j5 #mgskip «Bỏ qua» → «Học nhanh» · j83 #mgskip «Bỏ qua» → «Học nhanh» · jtds log «Để trời định:» → «Học nhanh:» · jtd n «Để trời định» → «Học nhanh» (+ result row) · j83 playArt ×4 + jrcp already «Học nhanh» · care: jpetcare/jshelf «Để trời định» → «Chăm nhanh» (n + logs) · no other learning quick label/log in j5/j83/jrcp/jtd/jtds/j85/jwkg | mg-trim 10(4), mg-skip (j5 overlay + Tu đức read «Học nhanh») |
LIVE 6b5d3d05 merged (db29521a): conflicts only on the lesson quick lines (LIVE's kStepW progress words kept, named «Học nhanh») + built files (rebuilt). mg-skip-audit regexes accept LIVE's words.
Tests @3385b0f3: mg-trim 10 groups ALL PASS Fold 755x1000@2 + iPad 1180x820@2 (real taps) · mg-skip-audit 21/21 · mg-skip PASS · makeup-set ALL PASS · delegate-nomg PASS · mg-ready-guide 9/9 · ag-mgcal PASS · mg-back 11/12 (#1 = LIVE too).
VIDEOS re-shot (same URLs): https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-trim/mg-trim-755x1000.webm · https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-trim/mg-trim-1180x820.webm
~94% xong / ~90% chơi được (chờ người duyệt).

## BIG REVIEW #3 (opus, session_01D3E3NaqVWXaAetSGcKr7mF) — review/mg-trim @ 3385b0f3 (FF from LIVE 6b5d3d05) — **FAIL (1 item)**
Tests (reviewer, 3385b0f3): assemble clean · mg-trim.js Fold 755x1000@2 + iPad 1180x820@2 ALL PASS (incl. test 10) · mg-skip-audit PASS · mg-skip PASS.
Findings 2, 3, 4: **FIXED** (b8ea33be). Tự tay score subtracts BAL.toil.rkDemand·rank, with a kit «Phẩm vị đòi hỏi» chip row. slapNpcDraw counts her hand; slapNpcTier(a,t) uses the gap to the target, and jslap/jlooks/jdf pass the target. «Học nhanh» is now on j5/j83 #mgskip and in the jtds log.
Still open:
5. Law 11 (co-op, both seats): jshelf.js:406 `k==="give"` is still inline in the click handler (it changes e.pc/e.pm directly). The fix is unchanged from review #2: put it in one function `shelfPlantGive()` and register `reg9("shelfPlantGive",[],{mine:()=>true})` in jcoopthinf beside shelfPlantQuick. The plant redraw already goes through shelfPlantDraw (UI9-captured). Check once that a guest's give lands on the host's copy, once per tuần.
After 5 is fixed and LIVE is unchanged, I expect PASS; re-review will cover only that change plus the mg-trim test.

## BUILD #5 (worker D5 #2) — BIG rv #2 (32077029) finding 5 — SSK review/mg-trim @ c961211e (FF from LIVE 6b5d3d05)
Findings 2–4 of rv #2 were fixed in 3385b0f3 (BUILD #4 table). Finding 5 (co-op): the plant «Giao … chăm» is now ONE function `shelfPlantGive()` (jshelf, the click handler only calls it) registered `reg9("shelfPlantGive",[],{mine:()=>true})` beside `shelfPlantQuick` (jcoopthinf); her open plant key SHPC.g rides in CX9 like the sibling.
Co-op check: dev/test/coop-thin-f4.js new row G2 (2 browsers, host Fold + guest iPad, real coop worker). Result `ROWS=G1,G2`: G2 = the SAME outcome as its sibling G1 on this setup — both "local 1, sent 0" (the level-9 intent runs on her phone, nothing sent) — and G1 fails identically on LIVE 6b5d3d05 (ran there: FAIL G1 local 1 sent 0; D1 FAIL too) → pre-existing level-9 routing state, not this branch; G2's wrapper ran (registered). Her plant screen stays on her phone only (G1/G2 ui ok).
Tests @c961211e: mg-trim ALL PASS Fold 755x1000@2 + iPad 1180x820@2 · mg-skip-audit PASS. No UI change since 3385b0f3 (videos at the same URLs stand).

## BIG REVIEW #4 (opus, session_01D3E3NaqVWXaAetSGcKr7mF) — review/mg-trim @ c961211e (FF from LIVE 6b5d3d05) — **PASS c961211e**
Finding 5 is FIXED. The plant «Giao … chăm» is now one function, `shelfPlantGive()` (jshelf), and is host-routed with `reg9("shelfPlantGive",[],{mine:()=>true})` in jcoopthinf, beside shelfPlantQuick. jcoopthinf loads after jshelf, so the bare call in the click handler hits the wrapper.
Findings 1–4 were fixed earlier (reviews #2 and #3); the code is unchanged since 3385b0f3 apart from the move above.
Tests (reviewer, c961211e): assemble clean · mg-trim.js on Fold 755x1000@2 and iPad 1180x820@2 ALL PASS · delegate-nomg PASS · makeup-set ALL PASS · mg-skip-audit and mg-skip PASS at 3385b0f3 (those files have not changed since).
Co-op, coop-thin-f4 ROWS G1,G2: G2 behaves like its sibling G1. Over 3 runs on the branch, the G1/G2 send-or-local row and the plant-screen row both flip between ok and FAIL. G1 on LIVE 6b5d3d05 also FAILED 2 of 3 runs (sent 0, local 1) → pre-existing flakiness at level 9, not caused by this branch. G2 «Giao … chăm» passed its intent row once (sent to the host, 459 ms).
Laws: 1 ok (slap draw and makeup demand are now the same for her and NPCs) · 2/3 ok (quick options sit below a fair own play) · 4 ok (all numbers from BAL) · 5 ok (rank demand) · 7 ok · 9/10 ok (kit parts only, the new row is kitChip) · 11 ok (Học nhanh / Chăm nhanh families, co-op routing) · 12 ok (videos on both devices) · 16/17 ok (her 05:10Z + 05:45Z words; nothing beyond them).
Known pre-existing, not this branch: duodo-focus-view 5a–5d, shelf-check, mg-back #1/#6 flaky, coop-thin-f4 G rows flaky.

## LAND READY review/mg-trim c961211e (FF from LIVE 6b5d3d05) — BIG REVIEW #4 PASS (61b51dfe)
Videos: https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-trim/mg-trim-755x1000.webm · https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-trim/mg-trim-1180x820.webm (wipe img/_review/mg-trim after the verdict giver lands it).
Open for Foreman D (pre-existing, not this branch): co-op level-9 F4 intents (coop-thin-f4 G1/G2/D1) run local on the guest on LIVE too.
Vietnamese for sếp: Đã xong bớt minigame theo lựa chọn của sếp: trang điểm một lần bấm theo Dung (còn «Tự tay điểm trang»), tát/né một lần gieo, «Học nhanh» Tùy duyên ở mọi buổi học; chăm thú, tưới cây giữ trò, thêm «Chăm nhanh» và «Giao người chăm». ~100% xong / ~95% chơi được (chờ đưa lên).

## HANDOVER (worker D5 #2 → successor) — 26/11 10:25Z — context 37.5 % (START ~3 % + 25 % passed) · depth 2
State: review/mg-trim @ bb0ae651 = c961211e (BIG rv #4 PASS) + merge of DRESS review/lc21-dress 3af7896e (jtoil toilColUI union). LAND READY bb0ae651 was sent; MAIN 157 (10:12Z) HOLDS it: CO-OP REGRESSION in dev/test/coop-thin-f4.js (local wrangler = LIVE worker): mg-trim 0/11 in chain, 1/11 alone (FAIL P2 P3 P4 P5 G1 G2 K1 K2 R1 T1 D1; r.now same:false / pend:false = guest intents not mirrored) vs LIVE 3af7896e 8/10. Logs: dev/handover/reports/land-chain-21.md «mg-trim HOLD».
Suspect (MAIN): the +1 line in dev/build/jcoopthinf.js `reg9("shelfPlantGive",[],{mine:()=>true})` (after reg9("shelfPlantQuick")) + coop-thin-f4 row G2. Other co-op-touching changes on the branch to check if reverting that line does not fix it: jslap/jlooks runAct/doAct wrappers (her slap = one draw; COOP res "tat" message path), jpetcare/jshelf (pet/plant quick renamed «Chăm nhanh», shelfPlantGive function), j79 KIT_QUICK_NAMES, jtoil.
NEXT (successor, in order): (1) worktree on review/mg-trim; build LIVE 3af7896e + branch; run `node dev/test/coop-thin-f4.js <local wrangler URL per land-chain-21.md>` on BOTH, same machine, ×2 → confirm the gap. (2) Revert the reg9 shelfPlantGive line (FOREMAN D/MAIN 157 ruling: the reg9 family is Foreman B's; leave plant «Giao … chăm» local like LIVE's behaviour) and drop row G2 from coop-thin-f4 (or keep it local-only); re-run ×2 vs LIVE. If still failing, bisect the branch commits (b8ea33be, cd6eff47, c961211e, bb0ae651). (3) Check mg-craft (dev/test/mg-craft*.js) 1/25 «kim lower at ease 0 than 5» on branch vs LIVE (likely flake / BAL.skip.od 50 change). (4) mg-trim.js Fold 755x1000@2 + iPad 1180x820@2, mg-skip-audit, makeup-set, dress-tap. (5) rebuild (bash dev/site/build_site.sh), commit, push review/mg-trim, send «LAND READY <sha>» to FOREMAN D session_01D3E3NaVk7n7f8KTo2enJna (BIG rv already PASS; a revert-only fix needs no new big review unless D asks).
Rules: START_CORE + START_WORKER (handover branch), report file = this file, never push main, no PRs. Videos (CDN): img/_review/mg-trim/mg-trim-755x1000.webm, mg-trim-1180x820.webm (still valid unless UI changes).

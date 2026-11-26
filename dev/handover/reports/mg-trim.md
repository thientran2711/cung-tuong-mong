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

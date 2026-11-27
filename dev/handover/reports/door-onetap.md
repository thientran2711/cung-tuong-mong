# DOOR-ONETAP — every act-merge door → ONE-TAP act (worker DOOR-ONETAP, MAIN CHÍNH 168)

PRIORITY #1 CHECK: OD 27/11 ~00:46Z (law 2 = 3 tiers, merge same-result) · ~00:50Z (weigh each matter on its own scale) · ~00:54Z (Emperor 6 moves) · ~01:00Z (result names the real topic/art/item + real reason) · ~01:03Z (odds word on button, auto best-fit never worse than best old option, tiers for risk) · ~01:05Z (approved) · ~01:07Z (convert EVERY door; robot: every old member still happens as a result) | main fa722503: dev/build/jdoor.js (engine: doorFold :38, PEND.door :67/:219, doorPick :77, deck build/open :139/:153; rows talk/gh/play/hau/pho/so/dola :19–27, P5–P14 :182–201), jdoor5.js (srv s_xin/s_phan/s_gh + deck rows SRVG/COLDG/KCR/twins), jact2.js:84 HSD (Hành sự deck doors H2–H14 + anthai), jdf.js:128–130 DOOR.cardM / DOOR.more | review/*: review/act-move (ACT-MOVE-2 session_01Rc5AsKcua4c5HAaG5qQueY: jamove.js + Emperor 6-move doors + BAL.df.person/palace — NOT touched here), act-merge-J0…J5 (all on LIVE) | claims: E-TIER-AUDIT session_01DgYSWoFVCrpS7YmQGBGr58 skips doors (FOREMAN_E_STATUS 27/11 ~00:56Z) — doors are mine.

## 1. Model (one engine change, every door at once)
Each door row gets ONE of three modes (table §2). The member acts themselves are NOT rewritten: a picked member runs its old road (talk(-1-j) / doAct / empAct / deck act(i)) with its own price, lock, roll, result, co-op intent and log.
- **ONE** — one tap = act. The game picks the member: (1) among members that can run now (not locked, affordable, khắc left), (2) the HIGHEST odds (a.o; ACT members by their odds band) → guarantees «never worse than her best old option», (3) tie → the door's preference (pref: his liked topic she knows / his favourite art she has, else her strongest art / the item he values most in her chest / the cheapest way she can pay), (4) tie → old roll seed (fixed per target + buổi, no re-roll by redraw). The button shows that member's odds word + its tốn/thành line BEFORE the tap (the kit act button already prints a.o / a.x — the door just carries the picked member's values instead of o:100).
- **TIER** — the door opens the standard choice card (PEND «door» / DOOR.card, KIT §7.1 tier in title) with AT MOST 3 rows nhẹ · vừa · nặng; each row = the best member of that tier by the ONE rule, titled «<việc thật> · <mức>», its own odds word + tốn/thành/hỏng line. Only where cost AND result really rise (law 2). The door button line shows the 3 words, e.g. «nhẹ Vững · vừa Có cơ · nặng Hiểm».
- **SPLIT** — members are NOT one matter (different target / opposite result / different ending): the door is dissolved, each member (or each sub-group, itself ONE or TIER) is its own button again (owner 26/11 ~07:32Z «cái nào cần để riêng thì để riêng»; ~00:54Z «10 nút khác nhau còn hơn 10 nút như nhau»).
- **Result card (~01:00Z)**: the member's own result card (it already names its own act/topic/art/item) gets ONE kit line on top: «<door>: <member thật> — <vì sao chọn>» (why = the pref that won: «ngài thích nghe chuyện thơ phú» / «sở trường Cầm, bậc 4» / «món ngài quý nhất trong rương: Ngọc bội» / «lối chắc nhất lúc này»). A scan lists every member result text that is generic («thành công / thất bại» without cause) → reworded per VANPHONG in this branch (family fix, before/after table).
- No number typed (law 4): odds/costs come from the members (BAL). Tier membership + prefs = a data table in the new module (no numbers).

## 2. Plan table (58 door rows on LIVE fa722503)
| Door (file) | Members | Mode | Best-fit / tiers |
|---|---|---|---|
| talk «Trò chuyện» (jdoor:19) | Hỏi han sức khỏe, Khen tài nghệ, Bàn tán về…, Chia sẻ bí mật, Thử lòng, Cảnh báo nàng, Rỉ tai chuyện trong cung, Nương theo, Tạ lỗi, Nhún nhường, Nhắc lại ân xưa | TIER | nhẹ = lời thăm hỏi (Hỏi han, Khen, Nương theo, Nhún nhường, Nhắc ân xưa, Tạ lỗi — pref Tạ lỗi when she holds a grudge, Khen when her art is known) · vừa = chuyện trong cung (Bàn tán, Rỉ tai, Cảnh báo) · nặng = chuyện thật lòng (Chia sẻ bí mật, Thử lòng) |
| gh «Giao hảo» (jdoor:21) | Kết giao, Tặng quà, Giúp đỡ nàng, Giúp chăm thú nuôi, Nhờ giúp đỡ, Mượn son phấn, Ghé chơi | TIER + SPLIT «Kết giao» | nhẹ Ghé chơi / Mượn son phấn · vừa Giúp đỡ / Giúp chăm thú (pref: her pet exists) · nặng Tặng quà (auto item: the one she values most that Hành trang holds, law 6c leaves inventory). «Kết giao» (alliance = different result) stays its own button. «Nhờ giúp đỡ» → Q2 |
| play «Cùng chơi / Thách đấu» (jdoor:23) | Cùng chơi, Thách đấu | TIER | nhẹ Cùng chơi (no stake) · vừa Thách đấu (stake BAL); game = her strongest |
| hau «Hầu chuyện» (jdoor:24, emp) | Tâng bốc, Nói thật lòng, Bàn chuyện triều chính | ONE | pref: topic in «Điều ngài thích» she knows → else best odds; result names the topic + his reaction (owner's own example) |
| pho «Phô tài» (jdoor:25, emp) → ACT-MOVE-2 «Hiến nghệ» | Phô tài <môn> (+ KM_EMPACT ways added by ACT-MOVE-2) | ONE | pref: his favourite art if her level ≥ her best − 1, else her strongest; result names art + level |
| so «Xem sổ Kính sự phòng» (jdoor:26, ksp) | Xem sổ thị tẩm, Xem sổ nguyệt sự, Hầu chuyện xem lén sổ nguyệt sự | SPLIT → 2 | «Xem sổ thị tẩm» ONE · «Xem sổ nguyệt sự» TIER nhẹ xem lén (free, risk) / vừa lót tay (bạc, sure) |
| dola «Dò la tin tức» (jdoor:27, serv/maid) | Nghe ngóng chung, Sai đi dò la | TIER | nhẹ Nghe ngóng chung · vừa Sai đi dò la (auto target: the rival whose place/plan she knows least, ties → biggest threat) |
| P5 Dò la (spy, bribe, bribel; spyk hidden) | | TIER | nhẹ Nghe lén · vừa Mua chuộc người hầu · nặng bribel (big bribe) |
| P6 Khiêu khích | Khoe quà ngự ban, Khiêu khích, Trút giận, Hạ nhục | TIER (tiers exist) | best within tier |
| P7 Hãm hại | 11 ACT + 3 talk | TIER (exist; roll groups → best-fit, roll seed = tie-break) | best within tier (place-bound ones win where they can run: pushp at the lake) |
| P8 Hạ uy thế | rumor, block, blockf, lygian, frame, plant, giahoa, xinhh | TIER (exist) | best within tier |
| P9 Hại hoàng tự | ksab, musk, kframe, kpoison, catswap, pond | TIER (exist) | best within tier |
| P10 Lấy của | batnat, laydo, laydol, petsteal, thaopet, phonghoa | TIER (exist) | best within tier (phonghoa moved by OD 00:09Z → follows PUNISH rows) |
| P11 Tố cáo | accuse, tocao, expose, xx, vp, trinhhh, trinhth | ONE (tiers = charge weight from jcharge if ≥ 2 charges are open) | pref: the charge with the strongest real evidence, the right listener |
| P12 Mặc cả chứng cứ | uyhiep, banphe, tieuhuy | TIER | nhẹ Tiêu hủy đổi ân · vừa Uy hiếp đòi bạc · nặng Bán cho kẻ thù nàng |
| P13 Quyền Hoàng hậu | judge, conf, reward, pardon, cutpay, takeaway | SPLIT → 3 | «Ban thưởng» ONE · «Tha tội» ONE (only when accused) · «Trừng phạt» TIER nhẹ cắt bổng · vừa tịch thu / bắt người hầu · nặng xử tội |
| P14 Ra uy | tat, phatquy | TIER (exist) | nhẹ Tát · vừa Phạt quỳ |
| srv s_xin «Xin chủ» (jdoor5) | ban thưởng, tiến cử, đi cung khác | SPLIT → 3 | three different wishes |
| srv s_phan «Phản chủ» | Mật báo, Tố cáo trước HH | TIER | nhẹ Mật báo · nặng Tố cáo |
| srv s_gh «Giao hảo» | Trò chuyện, Biếu quà nhỏ | TIER | nhẹ Trò chuyện · vừa Biếu quà nhỏ |
| HS H2 Nghỉ ngơi (jact2) | một lát, dưỡng sức, Dưỡng nhan | TIER + SPLIT «Dưỡng nhan» | nhẹ một lát · vừa dưỡng sức; Dưỡng nhan (Sắc, other result) own card |
| HS H3 Cáo bệnh | Giả bệnh, Đóng cửa tĩnh dưỡng | SPLIT | different results |
| HS H4 Thỉnh an | Thái hậu, Hoàng hậu | SPLIT | different persons |
| HS H5 Bắt mạch, chữa bệnh | Mời thái y, Sang Thái y viện, Truyền thái y, Tự bốc thuốc, Tĩnh dưỡng | TIER | nhẹ Tĩnh dưỡng / Tự bốc thuốc · vừa Sang Thái y viện · nặng Mời / Truyền thái y |
| HS H6 Xem sổ KSP | Xem sổ nguyệt sự, Xem lén | TIER | nhẹ lén · vừa lót tay (same as «so») |
| HS H7 Đọc sách | giải khuây, binh thư sử sách | TIER | nhẹ giải khuây · vừa binh thư |
| HS H8 Dâng tài nghệ | Múa yến tiệc, Kinh hồng vũ, Đánh cờ với HT, Đàn Phượng cầu hoàng, Vẽ chân dung tặng TH | ONE (= Hiến nghệ rule) + SPLIT «Vẽ chân dung tặng Thái hậu» | her best art / his favourite |
| HS H11 Tai mắt | Nghe ngóng chung, Sai cung nữ dò la, Cài tai mắt | TIER | nhẹ nghe ngóng · vừa sai dò la · nặng cài tai mắt |
| HS H14 Rời cung | trốn, xuất gia, xin ban hôn, về quê, nhờ TH nói giúp | Q1 | different endings |
| HS anthai | An thai, Báo tin có thai | SPLIT | different results |
| srv deck ×5 (Hầu việc, Dò la cho chủ, Học, Nghỉ ngơi, Kiếm thêm) | same-purpose ways | ONE (Dò la cho chủ, Kiếm thêm → TIER by risk: nhẹ the safe way · vừa the risky one) | best odds, tie → cheapest she can pay |
| cold deck ×6 (Nghỉ ngơi, Xin ân xá, Kêu oan, Kiếm sống, Rời cung, letter carriers) | | ONE except «Rời cung» (Q1) | Xin ân xá / Kêu oan: pref the helper with the most tình; letter: the surest carrier |
| khuê các KCR ×16 + twins | same act, ways differ only by payment / way | ONE | best odds, tie → the payment she holds most of (bạc vs Sức); «Tránh xem mặt» ONE |

## 3. Files (boundary agreed with ACT-MOVE-2 — asked 27/11, waiting reply)
- NEW dev/build/jone.js only, in assemble.py AFTER jamove.js / jdoor5.js / jact2 deck rows (every door registered). It wraps doorFold d.open, PEND.door, DOOR.rowsJ2 and the deck build/open; reads a row field `best` / `pref` if a row (e.g. ACT-MOVE-2's Emperor doors) brings one. No edit to jdoor.js rows, jdf.js, jbaldf.js, jamove.js.
- Branch review/door-onetap based on review/act-move head (rebase on its final sha before LOOK READY).
- Kit: no new part — ONE = existing act button (odds word from a.o), TIER = existing choice card §7.1, result line = existing result-card row. If the kit act grid cannot print the 3-word tier line, KIT REQUEST first (stop).

## 4. Robot dev/test/door-onetap.js
Sweep AA.scen dau/cao/hh/con × 4 buổi × state variations (his likes known/unknown, her art levels, chest items, bạc 0/full, khắc low, grudge, pet, evidence) on every person kind + every deck road:
A. a ONE door tap runs exactly one member, no card; a TIER card has ≤ 3 rows with distinct tiers; a SPLIT door no longer appears.
B. picked member odds ≥ max odds of all runnable members (raw list) — never worse than her best old option.
C. law 6c: union of picked members over the sweep ⊇ every old member (each member happens as a RESULT somewhere); a member never picked = FAIL with its name (→ fix its tier / split).
D. result card has the «<door>: <member> — <why>» line, names the real art/topic/item; 0 generic result texts.
E. NPC parity unchanged (AGC3DOOR / DOOR.ofKey), co-op talk intent still carries the member key, old saves with a pending PEND «door» load (opens the tier card or runs nothing).
F. 0 page errors; quickcheck + act-audit suites green. Then Fold 755x1000 + iPad 1180x820 mp4 → LOOK READY → RV-163D.

## Questions for MAIN
Q1. «Rời cung» (Hành sự H14 + lãnh cung): 4 different endings + «Nhờ Thái hậu nói giúp». Rec: TIER nhẹ «Xin về quê phụng dưỡng» · vừa «Xuất gia» / «Xin ban hôn» (auto: ban hôn when she has a match) · nặng «Trốn khỏi cung»; «Nhờ Thái hậu nói giúp» = its own button (a help step, not an ending).
Q2. gh «Nhờ giúp đỡ» (she asks the consort a favour — reverse direction): rec = its own button (SPLIT), not inside Giao hảo tiers.
Q3. talk tiers as in §2 (rec) — or talk = ONE (auto topic only, no tiers). Rec TIER: Chia sẻ bí mật / Thử lòng really cost more risk and give more.

~5 % this task (plan) / ~0 % in game.

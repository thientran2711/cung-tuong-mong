# RV-ACT-MERGE — ONE BIG review of the ACT-MERGE set (J0–J5), reviewer for MAIN CHÍNH 157 → 158 → 159

PRIORITY #1 CHECK ('act-merge' review): OD 26/11 ~07:25Z (merge every action button, whole game) + ~07:32Z (merge ONLY true duplicates; ĐỂ RIÊNG stays) + ~08:08Z (khuê các option A, in J5) + ~08:15Z (plan e50465e1 adopted) | main 3af7896e → 1dcb373e (FREEZE coop-freeze-kmrew-rv2, 12:11Z) | review/act-merge (plan) + review/act-merge-J0..J5 (all heads below) | claims ACT-MERGE J1–J5. Rules read: START_CORE (18 laws) + START_WORKER + START_REVIEWER; plan act-merge.md; reports act-merge-J1..J5.md.

## VERDICT: BIG PASS review/act-merge-ALL 03e9c9d2

Land head: **review/act-merge-ALL 03e9c9d2** (r8). It is LIVE aa37de21 + J1 5d3d4543 (J0 52334847 inside) + J2 94824fd6 + J3 f4572d0f + J4b 3b163bcc + J5 79dd67e5, rebuilt with assemble.py + build_site.sh. origin/main aa37de21 is its ancestor, so main can fast-forward to it. **review/mg-trim is NOT inside** (J4b re-stacked without c961211e; mg-trim lands on its own once FOREMAN D clears coop-thin-f4).

## TÓM TẮT CHO SẾP (tiếng Việt)
- Toàn game: **157 → 85 tên nút** (quét bằng script, không đếm tay). Mỗi nút trùng gộp thành **một nút**; bấm vào mở **khung chọn cách làm**. Mỗi cách giữ nguyên giá, khắc, cơ hội và kết quả như trước. Mở khung không tốn khắc.
- Nút nào là việc riêng thì **để riêng**, đúng lời sếp lúc 07:32. Ví dụ: Hòa giải, Thỉnh an, Xin che chở, Xin ân điển, các bước đường tình với nam nhân, Cầu tự, Giả mang thai, Chép kinh.
- Em bấm thật trên Fold và iPad, có tranh thật. Lần duyệt đầu em bắt được 5 lỗi. Thợ đã sửa hết, em kiểm lại rồi:
  - lãnh cung hiện trùng 2 nút;
  - thẻ Hậu cung mất dòng «2 khắc»;
  - máy mở cửa bị chép ra 3 nơi, nay chỉ còn 1;
  - khung chọn của Hành sự thiếu hình nàng;
  - khuê các chưa gộp.
- Lưu cũ vẫn chơi được. Tốc độ không chậm hơn bản đang chạy.

## NAME TABLE old → new (for sếp; from reports act-merge-J1..J5.md, checked against the UI by real taps and DOM)
| Screen | OLD buttons (each its own button) | NEW button → ways inside | ĐỂ RIÊNG (own button) — why |
|---|---|---|---|
| Dư đồ › phi tần khác cung | Hỏi han sức khỏe · Khen tài nghệ nàng · Bàn tán về <người> · Chia sẻ bí mật · Thử lòng · Cảnh báo nàng · Rỉ tai chuyện trong cung · Nương theo | **Trò chuyện** | Hòa giải (nhắm vào hai người khác) · Chào hỏi (chỉ khi chưa quen) |
| | Tặng quà · Giúp đỡ nàng · Nhờ giúp đỡ · Mượn son phấn · Ghé chơi | **Giao hảo** | |
| | Cùng chơi · Thách đấu | **Cùng chơi / Thách đấu** | |
| | Dò la · Nghe lén câu chuyện | **Dò la** | |
| | Khoe quà ngự ban · Khiêu khích · Trút giận · Hạ nhục | **Khiêu khích** (nhẹ · vừa · nặng) | Khiêu khích ≠ Hãm hại (lời nói, không hại thân) |
| | Hắt nước · Hắt trà · Quạt mực · Ngáng chân · Hạ độc · Đẩy xuống hồ sen | **Hãm hại** (nhẹ Hắt trà · vừa Hủy dung · nặng Hạ độc …) | |
| | Tung tin đồn · Vu oan | **Hạ uy thế** | |
| | Đẩy con nàng xuống hồ | **Hại hoàng tự** (chỉ khi nàng có con) | khác người bị hại, tội nặng nhất |
| | Hặc ăn mặc sai phẩm · Tố xa xỉ | **Tố cáo** | |
| | Tát · Phạt quỳ | **Ra uy** (khi có cả hai; một mình thì để trần) | Ra uy ≠ Hãm hại (quyền phẩm vị, công khai) |
| Dư đồ › phi tần cùng cung | Hỏi han · Bàn tán … / Cùng chơi · Thách đấu / Hắt … · Tát · Phạt quỳ | **Trò chuyện** · **Cùng chơi / Thách đấu** · **Hãm hại** · **Ra uy** | Mượn son phấn (một mình) · dòng «Cùng cung» = lý do |
| Dư đồ › Hoàng hậu | Hỏi han · Chia sẻ bí mật · Tạ lỗi · Nhún nhường / Cùng chơi · Thách đấu / Hắt nước · Hắt trà · Quạt mực | **Trò chuyện** · **Cùng chơi / Thách đấu** · **Hãm hại** | Thỉnh an (lễ) · Xin Hoàng hậu che chở (chỉ Hoàng hậu cho) · Xin son phấn · Khiêu khích |
| Dư đồ › Hoàng thượng | Tâng bốc · Nói thật lòng · Bàn chuyện triều chính / Phô tài: <môn> … | **Hầu chuyện** · **Phô tài** (khi ≥ 2 môn) | Xin ân điển (xin bạc, rủi ro mất sủng) · Dâng một cành hoa |
| Dư đồ › Kính sự phòng | Xem sổ thị tẩm · Xem sổ nguyệt sự · Hầu chuyện, xem lén sổ nguyệt sự | **Xem sổ Kính sự phòng** | Đút lót lật thẻ · Hỏi sở thích Hoàng thượng · Chào hỏi |
| Dư đồ › cung nữ thân cận / người hầu | Nghe ngóng chung · Sai đi dò la | **Dò la tin tức** | Trò chuyện / Tâm sự · Hỏi chuyện · Giao việc phòng bị · Xem người · Tiến cử |
| Dư đồ › người hầu | Thưởng vô cớ · Phạt vô cớ · Tha lỗi · Đổi người | **Thưởng phạt** | (như trên) |
| Dư đồ › Thái hậu · thái y · nam nhân · rương | — | — (giữ nguyên) | bốn việc khác hẳn / các bước đường tình nối nhau / ba mục đích khác nhau |
| Hậu cung › thẻ phi tần (46–54 → 11–12 nút) | Dò la · Mua chuộc cung nữ · Sai cung nữ thân tín lấy lòng · Tự đi dò la | **Dò la** | |
| | Hắt trà · Hủy dung · Bỏ phấn lạ · Thả thú dữ · Hạ độc · Hạ độc dần · Tặng quà ăn có độc · Đẩy xuống hồ sen … | **Hãm hại** (nhẹ / vừa / nặng) | |
| | Tung tin đồn · Rút thẻ bài · Nhờ ơn người quen · Ly gián · Vu oan · Cài đồ vào rương · Giá họa trộm đồ · Xin Hoàng hậu giáng | **Hạ uy thế** | |
| | Phá việc học · Bỏ xạ hương · Vu con nàng trù ẻo · Hạ độc con nàng · Mua chuộc bà đỡ · Đẩy con nàng xuống hồ | **Hại hoàng tự** | |
| | Ép nộp của · Sai người lấy trộm đồ · … thân tín · Trộm / Hại thú nuôi · Phóng hỏa kho đồ | **Lấy của** | Lấy của ≠ Hãm hại (lấy đồ thật, không hại người) |
| | Tố giác · Tố tội thật · Bóc chuyện tư tình · Tố xa xỉ · Hặc ăn mặc · Trình Hoàng hậu · Trình Thái hậu | **Tố cáo** | |
| | Uy hiếp đòi bạc · Bán cho phe khác · Trả chứng cứ lấy lòng | **Mặc cả chứng cứ** | Mặc cả ≠ Tố cáo (bán / trả chứng cứ, không xin xử) |
| | Xử tội · Tịch thu · Ban thưởng · Ân xá · Khất bổng lộc · Xin bế con nàng | **Quyền Hoàng hậu** (phẩm 7) | |
| Hành sự (36 → 20 tên) | Nghỉ ngơi một lát · Nghỉ ngơi dưỡng sức · Dưỡng nhan | **Nghỉ ngơi** | Điểm trang · Hối lộ Kính sự phòng · Cầu tự · Trò chuyện với cung nữ · Phát bạc cứu giúp · Để ý nam nhân · Giả mang thai |
| | Giả bệnh · Xin rút thẻ bài, đóng cửa tĩnh dưỡng | **Cáo bệnh** | |
| | Thỉnh an Thái hậu · Thỉnh an Hoàng hậu | **Thỉnh an** | |
| | Mời thái y bắt mạch · Sang Thái y viện · Truyền thái y · Tự bốc thuốc · Tĩnh dưỡng | **Bắt mạch, chữa bệnh** | |
| | Xem sổ nguyệt sự · Xem lén sổ nguyệt sự | **Xem sổ Kính sự phòng** | |
| | Đọc sách giải khuây · Đọc binh thư, sử sách | **Đọc sách** | |
| | Múa trong yến tiệc · Kinh hồng vũ · Đánh cờ · Đàn khúc Phượng cầu hoàng · Vẽ chân dung | **Dâng tài nghệ** | |
| | Sai cung nữ đi dò la · Nghe ngóng chung · Cài tai mắt | **Tai mắt** | |
| | Trốn khỏi cung · Xin xuất gia · Xin ban hôn · Về quê · Nhờ Thái hậu nói giúp | **Rời cung** | |
| | An thai · Báo tin có thai | **An thai** | |
| Tài nghệ / Tứ đức | Tự học · Học với thầy (ma ma) · Học với Thái hậu | **Học** | Học lối mới · Tự học, làm tác phẩm · Phát bạc cứu giúp |
| Cung nhân | Thêm cung nữ · Thêm thái giám / Thưởng · Phạt · Tha lỗi · Đề bạt · Đổi người | **Thêm người** · **Thưởng phạt** | Cài người · Tra xét · Thân cận · Phòng bị · Xem người · Hỏi chuyện · Tiến cử |
| Hoàng tự | Dạy chữ · Dạy lễ nghi · Tự dạy con tài nghệ · Mời thầy riêng · … | **Dạy con** · **Chăm con** | Dẫn con thỉnh an · Về thăm con … |
| Tư trang | Nhờ thái giám mua đồ · Sai cung nữ mua lén · Hối lộ người Thái y viện · Chợ đen | **Mua đồ** | Kiểm tra đồ · Xin đồng minh · Tìm thú nuôi; thú cưng / cây: giữ nguyên (OD ~05:45Z) |
| Cung nữ › Phận sự | Quét sân · Dâng trà · Theo hầu · Lĩnh đồ … / Nghe ngóng cho chủ · Tự đi dò la · Canh chừng / Học lễ nghi · Luyện thêu / Nghỉ lấy sức · Chải chuốt · Thuốc bổ / Thêu khăn bán · Lén giữ đồ | **Hầu việc** · **Dò la cho chủ** · **Học** · **Nghỉ ngơi** · **Kiếm thêm** | |
| Cung nữ › chạm người | Xin chủ ban thưởng · tiến cử · đi cung khác / Mật báo · Tố cáo chủ / Trò chuyện · Biếu quà | **Xin chủ** · **Phản chủ** · **Giao hảo** | Hành lễ thỉnh an · Quỳ dâng trà ≠ Cúi đầu lui tránh · thái y · nam nhân |
| Lãnh cung | Nghỉ ngơi một lát · Đọc sách / Trồng rau · Thêu khăn bán / Xuất gia · Trốn · Xin phế / Nhờ người ngoài · Nhờ <người> đưa thư / Cầu xin · Gửi thơ · Nhờ con cầu xin | **Nghỉ ngơi** · **Kiếm sống** · **Rời cung** · **Kêu oan** · **Xin ân xá** | Chép kinh, giữ đức (giữ đức ≠ xin tha) |
| Khuê các (OD option A) | 2 cách của cùng một việc (bạc / sức) và các việc cùng kết quả | **Hầu <mẹ>** · **Gần gũi <người>** · **Hại thứ muội** · **Dò xét viện** · **Lễ chùa** · **Ra chợ** · **Nghe tin ở trà lâu** · **Thư phường** · **Đi thăm <bạn>** · **Tránh xem mặt** · **Thư cho người ấy** · **Dò tin trong cung** · **Gửi lễ** · **Học lễ nghi** · **Mời thầy giỏi** · **Xin vào cung sớm** (+ dân nữ: Thuốc cho mẹ …) | thỉnh an, hầu cha, Gặp riêng, các cảnh — mỗi cái một việc |

## 1. INTEGRATION (step 1)
- r1 792da51f (10:45Z): J1 fe457201 + J2 64cd51f2 + J3 ad3bc9e8 + J4 3b92b4b2 + J5 27414648. One source conflict: assemble.py. Both module lines were kept ('jshelf.js','jactj4.js' and 'jdoor.js','jdoor5.js'). Built files: took theirs, then rebuilt.
- r2 4b599983, r3 02d80c24: rebuilt on the fix heads (below).
- r4 5e3ac197 (12:35Z): merged LIVE 1dcb373e (FREEZE) and J4b 3b163bcc (on J1 07d74f6a). Only built files conflicted; rebuilt.
- r5 cde3a492: J1 5d3d4543 (khuê các groups across the whole panel) + J3 f4572d0f (j3-deck test) + J5 425118ed. r6 1632412c: J5 46402c89 (test only).
- r7 6567f099: merged LIVE aa37de21 (home-way).
- **r8 03e9c9d2**: J5 79dd67e5 (J5c: khuê các exact-pair rows + pair-only keys). jdoor5.js is md5-identical to J5's.

## 2. FAULTS FOUND (r1) → fixed and re-checked
| # | Fault | Owner | Fix head | Re-check |
|---|---|---|---|---|
| F1 | Lãnh cung DUPLICATES. After every render(), j76.js:124 re-adds «Nghỉ ngơi một lát» and «Đọc sách giải khuây» because the deck-array fold hid every j76 card. They then show bare next to the «Nghỉ ngơi» door. It happened on the J5 head alone too (deal() clean; deal()+render() gives the duplicates). | J5b / J1 | J1 07d74f6a display-only fold (the deck is untouched; j76.js back to J1's text) + J5 5c88d5d6 | real tap iPad: panel «Nghỉ ngơi* · Cầu xin · Nhờ người bên ngoài · Chép kinh · Kiếm sống* · Rời cung*», no duplicates; act-merge-j5 «no bare member after render()» PASS |
| F2 | Law 9 / ONE DOOR ENGINE: the deck doors existed 3 times. (a) jdoor.js had a DOOR.deck block with no rows (dead code). (b) jdoor5.js had a private copy of the runner (pickCard/openCard/act/deal). (c) jact2.js hsdBuild was a third fold, done in the DOM, plus a Q.push fallback. | J1 (owner) + J5b + J3 | J1 78200514 → 07d74f6a; J3 f27af4f1; J5 5c88d5d6 | static: jdoor5 + jact2 now only call DOOR.deck(rows); no private deal/act wrapper and no Q.push fallback left; one fold (DOOR.road hs/srv/cold/kc) |
| F3 | The Hậu cung card door rows dropped the old button's «Cần» row, so the way's khắc and its Sức need were not shown. LIVE showed «Cần ✓ 2 khắc»; the Hành sự / Tài nghệ / lãnh cung rows said «Tốn N khắc». The same card kind looked different in different places (OD:L1095). | J2 | 94824fd6 (+T6) | real tap Fold: «Hắt trà · nhẹ — tốn: 2 khắc, Đức -3 …», «Đẩy xuống hồ sen [OFF ngươi đang ở Ngự hoa viên]» |
| F4 | The deck door card opened with who=null, so no figure showed. J4's tab doors show her figure (pMe()). | J1 / J3 | J1 4821c522 | J3 Fold + iPad taps with her figure |
| F5 | act-merge-j5.js wrote to a hard-coded /home/user/wt/J5-out | J5b | 9969a51d | runs anywhere |
| F6 | Khuê các doors did not show once the fold became display-only: on the kc road the cards sit inside category dialogs. | J1 / J5b | J1 07d74f6a, J5 5c88d5d6 | act-merge-j5 kc dtq / cnv (r4 run) |
| F7 | Khuê các catch-all rows: «Hầu …» caught the teacher cards, «Hầu cha ở thư phòng» and «Hầu phụ vương …» (a fake 1-name door). On the ngoại quốc roads, the twin «Dạy <muội> một điệu múa» never folded with «Kết thân <muội>». | J5c | ed0a646c + 79dd67e5 | act-merge-j5-kcscan ALL OK on 8 origins; real taps below |
| (MAIN) | OB-OAN dead tap: dfHasFig must need a visible token | J2 | 88a99b5c | df-folded-who PASS (r3, r4) |

## 3. LAW CHECK (each law the work touches)
- L1 two-way: the NPC act keys are unchanged (AGC3BTN); AGC3DOOR / haDoor = DOOR.ofKey, so her side and theirs map to the same door. ag-par3: ALL 6 against LIVE 7 (same rows; «Nhờ giúp đỡ» is fixed). role-parity: only the LIVE facHTML row.
- L2 equal value / L3 gain-and-loss / L4 one core: every way runs its OLD act path with its own price, odds and result. j3-ways parity covers 168 runs. Its 3 «diffs» are all in the evening state and all show an unrelated rival's sung/danh going undefined→3, while the khắc and the dialog titles are identical. That is a world tick in the harness, not an act difference; the J3 head alone gives 206/0. j1 156 cards / 146–148 runs, khắc = the member's own. j2 T2 checks the same old key. j4 Thưởng: Bạc 200→190. G1 one-core-guard PASS (no new inline number). Door opening = 0 khắc (j1, j1-deck, j4).
- L6 real world: no act is removed. Members keep their deeds, objects and evidence (the same functions run).
- L7 wording: no %; odds are in the 7 words (Rất vững / Vững / Có cơ / Tùy duyên / Khó lường / Hiểm / Mong manh, as seen in the rows). shown-odds.test PASS.
- L9 kit first: the chooser is the existing option dialog (DOOR.card / pushDil, kit option rows, ✕). G3 kit-conform PASS. No new kit part. After F3 and F4, the door rows look the same in every place.
- L11 whole group: one engine for every door family (talk, card, deck, tab, srv, cold, kc).
- L12 two devices: real taps on Fold 755x1000 and iPad 1180x820 with REAL CDN art over http. Scenes: consort pop-up fan → Trò chuyện → topics with the locked «Cảnh báo nàng ta» grey + «!» → Hỏi han → game → result (1 khắc); Hậu cung «Hãm hại» card; Hành sự «Nghỉ ngơi» (locked «Nghỉ ngơi dưỡng sức» grey with «Chỉ buổi tối»); Tài nghệ «Học Công»; lãnh cung «Nghỉ ngơi». Shots are in scratch only, not in git and not on the CDN.
- Locked ways: shown grey INSIDE the doors with their reason (off.why / cardWhy); a door whose ways are all locked is itself locked with the first reason.

## 3b. WHOLE-FAMILY FOLD-RULE SCAN (MAIN 160 ask: a catch-all word swallowing another group's cards; a pair that never folds)
Every rule was run over all 7761 n:"…" literals in dev/build/j*.js: 58 rules = DOOR.T talk/card rows, DOOR.D deck rows (hs/srv/cold/kc), and the J4 rows (built per tab from fixed lists).
- Talk / card rows (rival, hh, emp, ksp, serv, maid, srv; scoped by person kind): the extra hits («Tạ lỗi với Hoàng thượng trước đã», «Thử lòng ông ta bằng một tin giả», «Kết giao với nhà tướng trẻ», «Tặng quà, không nói gì» …) are all event-dialog options (j67, jrd_*, jkc3a). They are never in a rival/hh talk list, so they cannot be folded. No overlap between two rules of the same kind.
- Hành sự / srv / lãnh cung rows: exact ^…$ lists, no stray hits.
- Khuê các keys: the real catch-alls were «Hầu (.+)», «Giúp (.+)», «Dò la viện …» and «Thăm (.+)». J5c made them exact pairs, and every KCR key is now pair-only: a door forms only when a card of a DIFFERENT name on today's deck gets the same key. Twins join their base's KCR door. The only multi-hits left are the intended pairs.
- Pairs that never fold: none left. kcscan covers 8 kc origins; j1 / j2 / j3 / j4 / j5 check «no member bare beside its door» and «≥ 2 ways dealt ⇒ door».

## 4. INVENTORY (act-inventory.js, the same harness on LIVE and on ALL r1)
Distinct action names in the whole game: **157 → 85** (plan ≈ 80). Every name in LIVE that is missing in ALL is a door member listed in the NAME table, or a person's name. Nothing is lost. The one duplicate found was F1, now fixed. Servant pop-up (programmatic, r4): Tâm sự · Dò la tin tức · Thưởng phạt · Hỏi chuyện · Giao việc phòng bị · Xem người · Tiến cử (10 → 7); «Thưởng phạt» → Thưởng vô cớ · Phạt vô cớ · Đổi người; choosing Thưởng spends 1 khắc and Bạc 200→190.

## 5. TESTS (r4 5e3ac197 unless marked)
| Test | r8 03e9c9d2 (earlier rounds where noted) |
|---|---|
| quickcheck | PASS: open 2.4 s; old LIVE save loads and plays a buổi; perf median new/live: render 244/259 ms, tab 529/548 ms, buổi 1150/1792 ms, tasks>200 ms 24/35. TIME-SPILL PASS |
| core gates | G1 one-core PASS · G2 rules PASS · G3 kit-conform PASS · G4: odds-cap, coop-one-world, mk-layer, manifest, npc-purpose, dead-card, look-dedupe, press-keep, q-softlock, next-dead, anchor-table all PASS. dialog-fixed and button-crawl FAIL = LIVE baselines |
| act-merge-j1 / j1-deck | FAIL 0 / FAIL 0 |
| act-merge-j2 | T1–T4 + T6 PASS |
| act-merge-j3-deck / ways / look | exit 0 / 0 diffs (r4, r7) / PASS |
| act-merge-j4 Fold + iPad | PASS |
| act-merge-j5 / j5-kcscan | ALL OK / ALL OK on 8 origins |
| df-folded-who | PASS (r3, r5, and r7 alone twice) |
| greet-stranger, ag-stf2 (23), cold-faction, shown-odds, dress-tap (32) | PASS |
| LIVE's new tests: observer-leak, scroll-cue-loop (r4), stage-stay, place-rules, kit-why-scan (r7) | PASS |
| role-parity / ag-par3 / maid-8tabs | 1 / 5–7 / 4 = LIVE (LIVE 1dcb373e: ag-par3 6 on 2 runs out of 2; «phe phái» and «Phòng bị» are NPC-random rows) |
| Khuê các real taps (J5c, r8) | cnv Fold + iPad: 5 doors (Thuốc cho mẹ · Cưới vợ cho huynh trưởng · Trả nợ nhà lý trưởng · Lễ lý trưởng · Học lễ nghi bà Tư), each opens with its 2 rows; 10/10 ways each paid its own khắc (2,3 · 1,4 · 1,4 · 1,3 · 3,4); 0 bare, 0 unfolded, 0 page errors. dtq Fold: 385 views, 16 doors, 0 bare, 0 unfolded, 0 page errors. Final (J5c): cnv Fold 32 views and iPad 64 views, 5 doors each, 10/10 ways; dtq Fold 384 and iPad 385 views, 16 doors each, 33 ways + 1 locked way greyed with its reason. Every way paid exactly its own khắc (used delta = cardCost); 0 bare, 0 unfolded, 0 page errors; no teacher door any more. Stills: img/_review/act-merge-J5/j5c-*.jpg |

Known LIVE baselines, not worse: dialog-fixed synthetic «(kit-dialog-2 a)» 2 · button-crawl «Ô lưu · Lui» 1 · role-parity facHTML 1 · ag-par3 6 (LIVE 7) · maid-8tabs 4 (LIVE 6). Under CPU load in quickcheck r2, next-dead FAILed once; alone it passed 5 out of 5 runs (flaky).
Integration-only test items, not game faults:
- j3-deck «DOOR IN LÃNH CUNG»: the J3 test assumes lãnh cung has no doors, but J5's doors are now there, as planned.
- j3-ways: the evening world tick described in §3.

## LIMITS
- Servant «Thưởng phạt» from the Dư đồ PERSON VIEW: the harness never puts a servant figure on the stage (J4b reported the same), so this row was checked through talk() + chooseM, not a finger tap.
- Khuê các: my own real tap did not reach a kc life. The real taps are J5c's (rows above).
- coop-thin-f4 was not run (no co-op worker URL). It belongs to mg-trim, which is NOT in this land.

## STATE
BIG PASS 03e9c9d2 sent to MAIN 160 and to lander LC22 at ~15:50Z. Reviewer worktrees /home/user/wt/am-all, am-r4 and am-ho, plus logs in /home/user/wt/am-logs (scratch, not in git).

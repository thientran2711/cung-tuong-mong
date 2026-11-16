# PROGRESS — review/log-sync

Task (owner 15/11, OWNER_DECISIONS "Sổ ghi numbers don't match the header", screenshot dev/handover/refs/owner-log-mismatch.jpg
on the docs branch): "Tại sao không khớp." Sổ ghi said "Đêm nay ta được thị tẩm. Sủng 33 → 40 …" while the header showed Sủng 37.
Rules: (1) every change of a header stat / relation number has a log line with its reason; (2) each stat's "X → Y" / "+n" chain
replays to the header value; (3) same-moment changes in the order applied. LUẬT SỬA CẢ NHÓM: audit + fix the whole family.

## Cause (owner's case)
The night-talk card (PEND.night2, j8.js) runs `nightFx(s)` — which writes the night line "Sủng 33 → 40 · Ân tình …" (j75) — and
THEN the chosen talk's own effect, with no line: "Xin ân cho gia đình" hỏng = Sủng -3 (40 → 37, exactly the screenshot), "Thì thầm
nói xấu" hỏng = Sủng -2 / -6 + Danh -3, "Xin cho con" hỏng = Ân tình -2, "Xin tha cho cung nữ" = Đức +3 + Ân tình +1, "Im lặng" =
Ân tình +2, "Xin ân" thành = Danh +5 + Bạc +40. (On today's main logChoice folds the line and appends a net "Sủng 33→37", which
still breaks the chain and gives no reason; the owner's build was older and showed nothing at all.)

## Fix (dev/build/jlogsync.js, loaded last; small edits in j2, j3, j65)
- Shared parser of her stat tokens (Sắc, Tài, Tâm cơ, Đức, Danh, Sủng, Bạc, Sức, Ân tình, Tai mắt, Thái hậu / Hoàng hậu → ta):
  "L a → b", "L +n", "L -n (chạm đáy)", "L đã đầy N". A token right after a word ("nàng Sủng -10", "Hàn Như Ý Danh +2",
  "ít nhất Sủng +3") is someone else's or a promise.
- lsFix: a stated delta that is not the real one (clamp at 0/100, Sủng trait ×1.3 / ×0.7) is rewritten to the real one
  ("Danh 3 → 0 (chạm đáy)", "Sủng +9"); what no line explains is returned.
- Ledger + lsSync after every player action (act, choice, talk, place, scheme, lesson, danh sư, buổi / tuần change, mini-game
  pay, any tap + render): an unexplained change gets one line "<action>: Sủng 40 → 37 (reason)".
- Time ticks name their reason: weekly "Một tuần trôi qua, ân sủng nhạt dần: Sủng -1." / "Nghỉ ngơi qua tuần: Sức +4." (j3),
  "thơ hay được truyền tụng", "Đức cao/thấp" → Thái hậu (j3, v85Month), "lâu ngày, ân tình phai dần" (anMonth), "đàn cầm dưỡng
  sức" (artMonth); stipend / illness / lãnh cung / festivals / rivals' turn / y phục … join the end-of-turn line as reasons.
- Night talk: its own result line after the night line ("Xin ân cho gia đình: hỏng. Sủng 40 → 37.").
- Act summaries (runOpt, j2) and choice lines (logChoice, j3) list only what their own lines do not already say, starting from
  the value the Sổ ghi already shows (no "Đức 0→3" after "Đức +3 vì …").
- j2 snapReal now includes Ân tình: every act / choice summary used to say "Ân tình 0→N" (false; broken chain).
- j65 trueText: "Tài +1 (đã đầy 100)" (owner: unclear) → "Tài 99 → 100 (đã đầy)"; ACTRES / fixToast accept the new form.
- No UI / CSS added (log text only) — no kit part needed.

## Tests
- `python3 dev/build/assemble.py`, wrap dev/index.html with `<!doctype html><meta charset=utf-8>…` as dev/_t2.html, serve dev/.
- `CH=100 node dev/test/log-sync.js http://127.0.0.1:<port>/_t2.html 25 sens 777` (also `rand 4242`, `rand 99`): bots
  (dev/measure/inpage4.js) play 2500 actions; after EVERY action the new Sổ ghi lines are replayed per stat and must end at the live
  value; every miss is reported with the stack of the code that changed the stat (accessors on S), mapped to j*.js:line.
  For a build elsewhere: IDX=<index.html> BLD=<build dir> ASM=<assemble.py>.
- `python3 dev/test/log-sync-table.py before1.json,before2.json after1.json,after2.json` → before/after table.
- `node dev/test/log-sync-night.js <url>`: the owner's case, each night-talk choice forced to fail → PASS when the night's lines
  replay to the header.
- Screens 755x1000 and 1180x820: Mệnh truyện › Sổ ghi after a failed "Xin ân cho gia đình": "… Sủng 8 → 13 … Xin ân cho gia
  đình: hỏng. Sủng 13 → 10." with header Sủng 10; "Thi lên bậc 2. Tài 99 → 100 (đã đầy)".

## Before / after (3 bot runs × 2500 actions: sens 777, rand 4242, rand 99; before = origin/main d34b5116a)
| | before | after |
|---|---|---|
| checks (one after every bot action) | 14986 | 14978 |
| replay ≠ header (unlogged change) | 872 | 2 |
| broken 'a → b' chains (audit stops counting at 300 per run) | 900 | 7 |
| someone else's / promise token only (no real change) | 72 | 38 |

| stat | code path (first game frame) | before | after | last log line before |
|---|---|---|---|---|
| sung | `endTurn j3.js:89` | 147 | 0 | Ngủ một đêm: Sức +18 |
| danh | `caught j85.js:183` | 121 | 0 | Bày mưu : Ra tay ngay: tung tin đồn → Người của Liễu Phương Hoa phát giác ngươi định tun |
| suc | `lesson j2.js:171` | 108 | 0 |  |
| bac | `lesson j2.js:171` | 108 | 0 |  |
| th | `v85Month j85.js:141` | 43 | 0 | Ngủ một đêm: Sức +18 |
| bac | `econStipend jecon.js:45` | 35 | 0 | Ngủ một đêm: Sức +18 |
| an | `anMonth j8.js:296` | 28 | 0 | Ngủ một đêm: Sức +18 |
| bac | `A0.f jwhy.js:45` | 27 | 0 | Dò la Quý phi Bạch Như Ý: Quý phi Bạch Như Ý có nết Đa nghi. (Đã ghi vào mục Đã biết trên |
| danh | `j85.js:74` | 25 | 0 |  |
| hh | `v85Month j85.js:141` | 21 | 0 | Ngủ một đêm: Sức +18 |
| suc | `endTurn j3.js:90` | 20 | 0 | Âu Dương Thanh Liên được Hoàng thượng triệu đánh cờ. |
| bac | `j85.js:74` | 19 | 0 | Ngươi kết giao với Hoa Họa Mi:  thành . (sai Lão Vinh Tử đi) |
| tamco | `A0.f jwhy.js:45` | 15 | 0 | Dò la Quý phi Bạch Như Ý: Quý phi Bạch Như Ý có nết Đa nghi. (Đã ghi vào mục Đã biết trên |
| tamco | `Object.go j76.js:82` | 15 | 0 | Đọc sách giải khuây.  Ân tình 0→2 . |
| th | `aaThieuLeApply jaudit.js:230` | 12 | 0 | Thiếu lễ (mặc trung y), mặt mộc (Thái hậu trọng lễ): Thái hậu thiện cảm -5. |
| bac | `econPatron jecon.js:38` | 8 | 0 | Ngủ một đêm: Sức +18 |
| bac | `hireMaster j2.js:174` | 7 | 0 | Mời danh sư vào cung dạy: 3 tháng tiến bộ gấp đôi. |
| bac | `maidMonthP j8.js:349` | 5 | 0 | Cẩm kê của ngươi bị bỏ bê lâu ngày, đã bỏ đi. |
| bac | `ordMonth70 j70.js:335` | 5 | 0 | Đêm qua thẻ bài của Thượng Quan Bạch Lộ được lật. Tai mắt kể: Lý Cẩm Tú đứng đợi ngự giá |
| suc | `coldMonth j14.js:18` | 5 | 0 | Ngủ một đêm: Sức +18 |
| suc | `petWeek jpetcare.js:60` | 4 | 0 | Ngủ một đêm: Sức +18 |
| hh | `runOpt j2.js:82` | 4 | 0 | Thiếu lễ (mặc trung y): Hoàng hậu thiện cảm -3. |
| sung | `j85.js:74` | 4 | 0 |  |
| bac | `coldMonth j14.js:18` | 4 | 0 | Ngủ một đêm: Sức +18 |
| sung | `goTo j2.js:106` | 4 | 0 | Đến Ngự hoa viên. |
| duc | `pushPond j9.js:75` | 4 | 0 | Đẩy nàng xuống hồ sen: Trịnh Phương Hoa trượt chân rơi xuống hồ sen, ướt sũng, nhiễm lạnh |
| danh | `ap67 j67.js:127` | 4 | 0 | Được dự khảo hạch tấn phong Quý nhân : Hoàng hậu Đoan Mộc Nguyệt Hoa khảo, hạn đến hết T |
| sung | `wdMonth j92.js:384` | 4 | 0 | Được dự khảo hạch tấn phong Quý nhân : Hoàng hậu Đoan Mộc Nguyệt Hoa khảo, hạn đến hết T |
| suc | `taintHit j8.js:219` | 4 | 0 | Ngủ một đêm: Sức +4 |
| bac | `bestow j20.js:22` | 3 | 0 | Đôi uyên ương của ngươi bị bỏ bê lâu ngày, đã bỏ đi. |
| duc | `trip j9.js:78` | 3 | 0 | Ngáng chân nàng: Tô Ngưng Sương vấp ngã giữa chốn đông người. Danh -3. |
| danh | `Object.go jstip.js:135` | 3 | 0 | Bổng lộc bị cắt xén : Tố lên Thái hậu →  Thái hậu gạt đi, cho là ngươi nhỏ nhen.  Danh - |
| danh | `pushPond j9.js:77` | 3 | 0 | Đẩy nàng xuống hồ sen:  Ngươi xô Trịnh Phương Hoa bị người thấy. |
| danh | `wdAccuse j92.js:279` | 3 | 0 | Ngươi hặc Phi Âu Dương Thủy Tiên quá giản dị;  tra xét ra Phi Âu Dương Thủy Tiên ăn vận đ |
| danh | `tyRob jty.js:95` | 3 | 0 | Trên đường ở Đức Thọ cung, kẻ lạ giật mất Áo gấm hoa mai. Ngươi phải mặc trung y về cung |
| danh | `Object.run j28.js:78` | 2 | 0 | Ngủ một đêm: Sức +18 |
| tamco | `ageYear j35.js:24` | 2 | 0 | +3 Phúc duyên: tròn năm thứ 1 trong cung. |
| bac | `P.f jbal2.js:71` | 1 | 1 | Thuốc độc nhắm vào Mạnh Vân Khanh bị phát hiện, tra ra người của ngươi.  Kẻ được ngươi s |
| sung | `fall j8.js:70` | 2 | 0 | Ngươi bị tố giác, chứng cứ rành rành, bị giáng xuống Đáp ứng. |
| danh | `scar70 j70.js:476` | 2 | 0 | Đáp ứng Hạ Khinh Vũ  (vì ghét ngươi, thiện cảm -97) định  thả thú dữ làm hại dung nhan |
| sung | `j24.js:30` | 2 | 0 | Âu Dương Thanh Liên được Hoàng thượng triệu đánh cờ. |
| sung | `scar70 j70.js:476` | 2 | 0 | Đáp ứng Hạ Khinh Vũ  (vì ghét ngươi, thiện cảm -97) định  thả thú dữ làm hại dung nhan |
| bac | `petMonthOf jpet.js:157` | 2 | 0 | Được dự khảo hạch tấn phong Quý nhân : Hoàng hậu Đoan Mộc Nguyệt Hoa khảo, hạn đến hết T |
| danh | `ACT.<computed>.f j11.js:59` | 2 | 0 | Trong tẩm cung Kiều Mộng Điệp tìm thấy hình nhân bùa ngải.  Danh Kiều Mộng Điệp -12 · Sủ |
| sung | `ACT.<computed>.f j11.js:59` | 2 | 0 | Ngươi vu oan Đoan Mộc Diễm Thu bị lộ.  (sai người đi) |
| danh | `pl67Lapse jstory.js:66` | 2 | 0 | Chương 3 · Hồi 1/4 · Thuyền muối đêm :  Hỏng. |
| duc | `j85.js:72` | 1 | 0 | Bổng lộc tháng tư : Bớt lễ nghĩa → Ngươi bớt lễ nghĩa tháng: Danh -1, Đức -1.  Ân tình 0 |
| suc | `illMonthP j13.js:18` | 1 | 0 | Chương 3 · Hồi 1/4 · Thuyền muối đêm :  Hỏng. |
| danh | `wdAccuse j92.js:281` | 1 | 0 | Ngươi hặc Phi Hoa Họa Mi quá giản dị, Hoàng hậu bỏ qua, chỉ dặn lần sau giữ ý. Danh -2. |
| suc | `ACT.<computed>.f j11.js:59` | 1 | 0 | Ngươi có thêm chứng cứ về Thường tại Diệp Khinh Vũ : Thường tại Diệp Khinh Vũ định mua c |
| sac | `petBonus jpet.js:59` | 1 | 0 | Đôi uyên ương của ngươi bị bỏ bê lâu ngày, đã bỏ đi. |
| danh | `petBonus jpet.js:59` | 1 | 0 | Cẩm kê của ngươi bị bỏ bê lâu ngày, đã bỏ đi. |
| th | `relDo j68.js:50` | 1 | 0 | Âu Dương Thanh Liên được Hoàng thượng triệu đánh cờ. |
| suc | `ACT.poison.f j11.js:58` | 1 | 0 | Mưu hại  ·  Tần Mộ Dung Nguyệt Hoa  (vì ghét ngươi, thiện cảm -100) định  hạ độc  nhắm v |
| bac | `servRanks j14.js:35` | 1 | 0 | Ngủ một đêm: Sức +14 |
| danh | `econDoDuty jecon.js:34` | 1 | 0 | Bổng lộc tháng tư : Bớt lễ nghĩa → Ngươi bớt lễ nghĩa tháng: Danh -1, Đức -1.  Ân tình 0 |
| danh | `framed j8.js:75` | 1 | 0 | Mưu hại  ·  Phi Âu Dương Lăng Vân  (vì ghét ngươi, thiện cảm -100) định  vu oan  nhắm và |
| danh | `wdAccuse j92.js:284` | 1 | 0 | Ngươi bị cấm túc 2 tháng vì ăn mặc vượt phẩm. |
| danh | `brbTick7 j71.js:320` | 1 | 0 | Đêm Tết Thất tịch, Hoàng thượng dừng chân ngắm đèn của Mộ Dung Nguyệt Hoa. |
| danh | `festival j8.js:427` | 1 | 0 | +3 Phúc duyên: tròn năm thứ 1 trong cung. |
| suc | `ap67 j67.js:127` | 1 | 0 | Chương 3 · Hồi 1/6 · Thanh mai trúc mã: Ngày từ biệt : Ngươi giấu tín vật dưới đáy rương |
| an | `j24.js:30` | 1 | 0 | Âu Dương Thanh Liên được Hoàng thượng triệu đánh cờ. |
| danh | `deathSentence j8.js:65` | 1 | 0 | Bày mưu : Ra tay ngay: hạ độc con nàng →  Đức -18 vì hạ độc con nàng.   Ngươi: suýt bị b |
| danh | `wdAccuse j92.js:282` | 1 | 0 | Ngươi hặc Phi Kiều Ngọc Hành ăn vận quá giản dị, làm mất thể diện hoàng gia:  thành . Phi |
| danh | `Object.go j8.js:261` | 1 | 0 | Đêm thị tẩm : Bàn thơ văn, cầm kỳ → Hoàng thượng nhíu mày nhìn Thoa bạc song điệp, Áo gấ |
| duc | `jts.js:244` | 1 | 0 | +2 Phúc duyên: thả đèn cầu bình an đêm Tết Thất tịch. |
| sung | `framed j8.js:75` | 1 | 0 | Mưu hại  ·  Phi Âu Dương Lăng Vân  (vì ghét ngươi, thiện cảm -100) định  vu oan  nhắm và |
| tamco | `ACT.<computed>.f j11.js:59` | 1 | 0 | Trong tẩm cung Kiều Mộng Điệp tìm thấy hình nhân bùa ngải.  Danh Kiều Mộng Điệp -12 · Sủ |
| danh | `cFin7 j71.js:361` | 0 | 1 | Tết Trùng cửu:  Không thành:  Mạnh Ngọc Dao đoạt giải cờ (Sủng +2, Danh +2). Ngươi hạng 3 |
| danh | `illMonth j13.js:30` | 1 | 0 | Lý Linh Lung được Hoàng thượng triệu đánh đàn. |

After-run remainders (2): `cFin7 j71.js:361` (festival mini-game result arrives in a timer callback; the bot never renders, the
real game's render right after syncs it) and `P.f jbal2.js:71` (the cost of the act that ended the life; fixed in a later commit:
lsSync now also runs when she is dead). Broken chains after (7): a token in a news line that is about someone else but has no
subject word before it (e.g. a festival winner "(Sủng +2, Danh +2)"), read as hers by the replay.

## Open / notes for the coordinator
- Night line "Tranh sủng. Thành. · được thị tẩm đêm nay: ít nhất Sủng +3 …" in the owner screenshot: the card's promise text
  appears in the Sổ ghi result (her older build). The parser treats "ít nhất Sủng +3" as a promise; the wording itself is an
  act-text item, not changed here.
- News lines that name another consort's numbers without a subject word ("… đoạt giải cờ (Sủng +2, Danh +2)") read like hers;
  a wording pass ("nàng được Sủng +2 …") would remove the last ambiguity.
- Relation numbers per consort (ghen / thiện cảm / oán) are not replayed by this audit (only Thái hậu / Hoàng hậu → ta); the
  night line already logs ghen before → after.

## r1 (reviewer FAIL @ e51896108 → fixed)
1. Week card flooded: tick / catch-all lines carry `<i class="kls" data-ls="t|c">`; jlogsync wraps wkSummary and wkBookData
   so marked lines are left out (whole family: dawn card, Tuần lục). Test dev/test/log-sync-week.js (bots, 100 weeks): every
   week's marked lines vs the card text → PASS, 0 leaks. Screens 755x1000 / 1180x820 of Tuần lục: no bookkeeping lines.
2. Bổng lộc: the parser reads the line's total "… = +57 bạc" (items not counted); stipend no longer tagged (no stray reason).
   NPC ban thưởng into her purse (jecon econDoDuty) now named ("<name> ban thưởng").
3. Monthly Thái hậu / Hoàng hậu drift by Đức: j3 monthTick and v85Month write into ONE group with one wording
   (lsDucWhy "Đức thấp, bị coi nhẹ" / "Đức cao, được quý hơn"); j85's own news text for it removed.
4. Fewer lines: time ticks are buffered and written once per turn change, folded into the morning line
   "Ngủ một đêm: Sức +18 · ân sủng nhạt dần: Sủng -1 · …" (that line is then marked bookkeeping); a catch-all joins the action's
   own newest line ("Đọc sách giải khuây — Tâm cơ 27 → 28 (hiểu thêm lòng người).") and is a separate line only when the action
   wrote none. Sens bot: 4 catch-all lines / 1309 (the rand bot's are lessons whose mini-game the bot drops; in the game the cost
   is paid via aaPayMG with its result card).
5. Every catch-all part has a reason (the action's pop text, else a sign-aware word: tốn bạc / hao sức / Hoàng thượng để mắt …);
   logChoice joins with " — " (no double arrow); night talk line: "Hỏng: Sủng 37 → 34." / "Sau đó: Ân tình 7 → 9." (no repeated
   choice name; "Thì thầm nói xấu" forced to fail says Hỏng). Also: "Hoàng thượng đến" card (j24) now logs its Sủng/Ân tình;
   j70 "Ngươi mất: Sức -43" no longer repeats a loss its body already states.
Audit (3 seeds × 2500 actions, after merge of origin/main 6298d2f55): see the report; noWhy (catch-all without reason) = 0.

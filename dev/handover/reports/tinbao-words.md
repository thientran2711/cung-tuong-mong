# tinbao-words — one clear sentence per news line (worker TINBAO-WORDS, child of MAIN 147)

PRIORITY #1 CHECK: OD 'nghe ngóng trở về' 0 | claims 4 (Tin báo save/harness/reviewer rows, none on wording) | main jptime.js:158 | review/* 0; 'Ở lại = như lẻn' OD 1 | main jstagehere.js:25 + jnotice.js sample + dev/test/stage-stay.js.
Owner bug OD 25/11 ~23:36Z (verbatim): "Cái gì mà tùm lum chữ lặp tới lặp lui, lũng ca lũng cũng không hiểu nổi." Shot k16-ipad-tinbao-repeated-words.jpg.
Branch review/tinbao-words (base origin/main 5e01307). Neighbours told: OB-NGOAICUNG (gating) and PLACE-RULES (overstay logic) — only TEXT of jstagehere line()/short() changed, no logic.

## Root causes (whole family, law 11)
1. `kitRankNamePaint` (jaudit) put «title + name» before EVERY mention of a name, even several in one text node → «Cung nữ thân tín tam đẳng X … Cung nữ thân tín tam đẳng X …». Now: one title per person per block.
2. Errand report (jptime ptLand/ptPanel): head «X nghe ngóng trở về · thành.» + log line «X nghe ngóng trở về: X nghe ngóng được …». Now `ptRepText`: head dropped when the report already starts with the doer; outcome in words («, việc đã thành.»).
3. `spyNews`/`spyWho` (jwhy): «về Phi ở một thiên điện (chưa quen) (nàng đang được sủng): Một vị Phi có nết …» → «X nghe ngóng được chuyện về một vị Phi ta chưa quen; nàng ta đang được sủng, ai cũng bàn tán. Nàng ta vốn tính nhiều chuyện.»
4. `intelLearn` (j78) returns its facts with «Nàng ta» instead of the full name at each fact head (`j78Nang`; stored fact keeps the name); trait fact «vốn tính <nết>» (jchat regex follows); J78_WHERE «Nhật ký» → «Sổ ghi».
5. Closing alert (jstagehere line): «Ở lại = như lẻn vào: X.» → «… mà ta vẫn nán lại, chẳng khác gì lẻn vào; may rủi: X.»
6. jagent agWhy «… · con gái thầy đồ nghèo» → «…, vốn là con gái …»; nghe lén note «nghe lén: nàng … — …» → «nghe lén được nàng ta …, vì …»; j21 «Sổ ghi thêm» line ends with its period; j28 trait notice «Ngươi biết X vốn tính …».
7. NET at the one notice entry: `kitSay` (jnotice; kitNotice line/text/items + kitKnow): no «=», no « · thành/hỏng», « · » inside a sentence → «, », «) (» → «, », «a: b: c» chain → one colon (colons inside «(…)» kept), a head sentence said twice → once, «có nết X» → «vốn tính x», a repeated «title name» → bare name after the first.
8. Free choice card (jopic kitOptFinal): a card with no cost/gain/loss/hint and no odds («Xem tin», «Để ta xem», «Để sau», «Xem lời nhờ») shows no «Tốn: không / Được: không» rows (`.kfree`; notes stay behind «!»). KIT.md §6.2b ROWS line updated in place. NOTE for MAIN: this narrows the §6.2b grey-row rule (owner 18/11 "tốn không được không … màu xám") for free cards only, per this bug's brief — law 16, please confirm with sếp if needed.

## Tests
- `node dev/test/tinbao-words/scan.js` — static builders (kitNotice/kitKnow/noteAdd/ptNote/log…), kitSay on the owner's exact lines, producers in place. after: PASS · before (main): 13 FAIL.
- `node dev/test/tinbao-words/bot.js <root> <out.json> 2 1 900` — 2 bot lives (seed 1) + forced family runs, collects notices, RENDERED Tin báo rows, cards, Sổ ghi lines; `table.py before.json after.json`.
- `node dev/test/tinbao-words/shots.js <root> <out> <tag> video` — full Tin báo from the real producers, Fold + iPad + video.
- dev/test/stage-stay.js: check follows the new line (chipOdds true); its «caught/free» faults are the same on main (pre-existing).

## Before / after (bot, same seed; NEWS = what she reads in Tin báo)

### NEWS (Tin báo: notices, rendered rows, cards, forced family runs)
lines collected: before 749 · after 1567

| pattern | before | after | example before | example after |
|---|---|---|---|---|
| chain3 | 105 | 15 | Bích Đào báo: Bẩm tiểu chủ, chuyện buổi trước: nô tỳ nghe Huệ Tâm kể: Đường Nhu Gia tự tay làm một tác phẩm. | Tần Liễu Tố Nga gặp kỳ ngộ với Quý phi Nghiêm Tố Ngưng: Cát phục đỏ thêu kim tuyến về lại tay Nghiêm Tố Ngưng Liễu Tố Nga: Danh +11 Nghiêm Tố Ngưng: t |
| titleTwice | 101 | 17 | Nghe nói Hoàng hậu Nhan Như Ý gặp kỳ ngộ với Uyên Ương: Tần ??? để bụng oán Hoàng hậu Nhan Như Ý; Uyên Ương thành tai mắt của Hoàng hậu Nhan Như Ý tro | Chi Nhi nhờ quen người ở thiên điện của Thường tại Thượng Quan Ngọc Hành mà nghe ngóng được chuyện về Thường tại Thượng Quan Ngọc Hành. Nàng ta vốn tí |
| chain2 | 93 | 28 | Sổ ghi thêm về một vị Thường tại: Phòng của Trình Tử Đàn: bày 1 món, hợp phẩm. | Đáp ứng Chân Tịnh Nghi gặp kỳ ngộ với Phỉ Thúy Chân Tịnh Nghi: Danh +2 Phỉ Thúy: thiện cảm +24 |
| name3x | 57 | 31 | Thanh Trúc dò la Trình Tử Đàn trở về · thành. Thanh Trúc nghe lén chuyện của một vị Thường tại: Một vị Thường tại thích tác phẩm Thi. Một vị Thường tạ | Chi Nhi nghe lén chuyện của một vị Phi: Nàng ta không ưa tác phẩm Họa. Nàng ta thích tác phẩm Vũ. Không có gì sai trái để làm chứng cứ. (Đã ghi vào mụ |
| dotMid | 56 | 0 | Thanh Trúc dò la Trình Tử Đàn trở về · thành. Thanh Trúc nghe lén chuyện của một vị Thường tại: Một vị Thường tại thích tác phẩm Thi. Một vị Thường tạ |  |
| dotOk | 53 | 0 | Thanh Trúc dò la Trình Tử Đàn trở về · thành. Thanh Trúc nghe lén chuyện của một vị Thường tại: Một vị Thường tại thích tác phẩm Thi. Một vị Thường tạ |  |
| rawNet | 29 | 0 | Thanh Trúc nghe ngóng trở về · thành. Thanh Trúc nghe ngóng trở về: Thanh Trúc nghe ngóng được về Tần ở một thiên điện (chưa quen) (nàng đang được sủn |  |
| paren2 | 12 | 0 | Thanh Trúc nghe ngóng được về Tần ở một thiên điện (chưa quen) (chuyện nghe được ngoài hành lang): Một vị Tần để bụng Hoàng hậu Nhan Như Ý nhất; mức n |  |
| tonFree | 3 | 0 | Để ta xem TỐN không ĐƯỢC không |  |

### LOG (Sổ ghi lines, same bot lives)
lines collected: before 687 · after 1042

| pattern | before | after | example before | example after |
|---|---|---|---|---|
| chain2 | 46 | 88 | Hội phối đồ: báo đề: Đã hiểu, sẽ chuẩn bị. | Hội phối đồ: báo đề: Đã hiểu, sẽ chuẩn bị. |
| chain3 | 45 | 73 | Phụ tuyến · Tâm nguyện Thái y (1/3): Sách thuốc thất lạc · Lời nhờ (1 bước): Khéo từ chối (“Sư phụ thần để lại bộ y thư dang dở) — Ngươi khéo khước từ | Kỳ ngộ: Xin ông kể thêm vài điều — Kỳ ngộ «Xin ông kể thêm vài điều»: có người trông thấy, Danh -4; Phùng Lộc Toàn thiện cảm +20; biết thêm chuyện của |
| titleTwice | 32 | 33 | Thanh Trúc nghe lén chuyện của Hoàng hậu Nhan Như Ý: Hoàng hậu Nhan Như Ý có nết Kiêu ngạo. Hoàng hậu Nhan Như Ý không ưa tác phẩm Thêu thùa. Không có | Chi Nhi nấp nghe ngoài cửa sổ Càn Ninh cung thì bị người của Hoàng hậu Viên Mặc Lan bắt gặp, bị phạt quỳ ngoài sân. Nàng sợ vì bị sai việc nguy hiểm:  |
| dotMid | 23 | 40 | Ngủ một đêm: Sức +18 · ân sủng nhạt dần: Sủng -1. | Ngủ một đêm: Sức +18 · ân sủng nhạt dần: Sủng -1. |
| name3x | 17 | 23 | Thanh Trúc nghe lén chuyện của Hoàng hậu Nhan Như Ý: Hoàng hậu Nhan Như Ý có nết Kiêu ngạo. Hoàng hậu Nhan Như Ý không ưa tác phẩm Thêu thùa. Không có | Chi Nhi nấp nghe ngoài cửa sổ Càn Ninh cung thì bị người của Hoàng hậu Viên Mặc Lan bắt gặp, bị phạt quỳ ngoài sân. Nàng sợ vì bị sai việc nguy hiểm:  |
| rawNet | 8 | 0 | Thanh Trúc nghe ngóng trở về: Thanh Trúc nghe ngóng được về Tần ở một thiên điện (chưa quen) (nàng đang được sủng, ai cũng bàn): Một vị Tần có nết Kiê |  |
| paren2 | 6 | 10 | Thanh Trúc nghe ngóng trở về: Thanh Trúc nghe ngóng được về Tần ở một thiên điện (chưa quen) (nàng đang được sủng, ai cũng bàn): Một vị Tần có nết Kiê | Phụ tuyến · Thư muội muội: xin cây trâm cài · Lời nhờ (2 bước): Khéo từ chối (“Tỷ tỷ, muội sắp thành thân, tủ chưa có món trang sức đẹp nào) — Ngươi k |
| eq | 4 | 3 | Bổng lộc tháng ba: +28 bạc · 1 súc Vải bông · 1 gói Trà Long Tĩnh · 1 hộp Than liễu · 1 hộp Son sáp · 1 lọ Nước bào hoa · 3 cây Nến mỡ dê · trả công 1 | Bổng lộc tháng ba: +20 bạc · 1 súc Vải bông · 1 gói Trà Long Tĩnh · 1 hộp Than liễu · 1 hộp Son sáp · 1 lọ Nước bào hoa · 3 cây Nến mỡ dê = +20 bạc (c |
| dupHead | 1 | 0 | Có người tìm đến: Tiếp chuyện — Trình Tử Đàn buông lời khiêu khích ngươi. Trình Tử Đàn buông lời khiêu khích ngươi. Vì sao: Quý nhân Trình Tử Đàn: tín |  |

Remaining NEWS hits after: kỳ-ngộ rows (innerText of kit stat chips «A: Danh +4 B: thiện cảm +54» read as colons — chips, not prose), bare short names said 3× in a long multi-report errand (allowed: name, not title). LOG (Sổ ghi) has wider older families (stat lines «Sức +18 · …», «Vì sao: …», Hội phối đồ) not routed through kitSay — out of this scope, listed for a follow-up.

## Shots (CDN)
https://ctm-img.victoria-tntt.workers.dev/img/_review/tinbao-words/tb2511-before-fold.jpg · tb2511-after-fold.jpg · tb2511-before-ipad.jpg · tb2511-after-ipad.jpg · tb2511-before-ipad.webm · tb2511-after-ipad.webm

## Round 2 — speaker shown, body never names her (owner OD 25/11 ~23:54Z, verbatim: "Cái gì mà câu từ nó cứ lặp tới lặp lui không hiểu nổi luôn.")
Shot k20-ipad-tinchonguoisai-repeat.jpg: «Tin chờ người sai đi» (jerr errPanel; fallback jptime ptPanel) with the maid's figure + plate at the left, body «Cung nữ … Xạ Nguyệt nghe ngóng trở về» / «… trở về: Xạ Nguyệt nghe ngóng được …».
- jptime `ptVoice(lines, person)`: her report in her own voice («Nô tỳ …» / «Nô tài …»), her title+name removed, «ta / ngươi» → «chủ tử»; no head line before lines that already say it. Used by jerr errPanel and jptime ptPanel for the report of the person shown (another person's report keeps plain sentences).
- After: «Nô tỳ nghe ngoài hành lang được chuyện về một vị Đáp ứng chủ tử chưa quen. / Nàng ta thích tác phẩm Vũ.» (before: the owner's exact repeat, reproduced on main).
- Every speaker dialog: scan.js (4) checks every pushModal({who: X …}) body for `${X.name}` → 2 hits fixed (jact / jagharm gossip «ngươi nghe nàng ta to nhỏ…»); main = FAIL. shots.js reads the «Tin chờ người sai đi» body and exits 1 when the speaker's name is in it (after: nameInBody false on Fold + iPad).
- Shots: tb2511b-{before,after}-{fold,ipad}.jpg (Tin báo), tb2511b-{before,after}-{fold,ipad}-tin.jpg (Tin chờ người sai đi), tb2511b-{before,after}-ipad.webm.
- jstagehere: PLACE-RULES owns the file (review/place-rules, adds an entry line); I sent them my words for all 3 lines (no «=», «may rủi: X» at the end). On merge their file wins and carries my wording; my jstagehere hunk can be dropped.

## Round 4 — merged E90r PASS 8908b077 (review/news-runner-lines-r1) per MAIN 149
- 8908b077 added 1 commit over 2608109d (ptRepRows rows composer + result as kit chip; invite runner no doubled line). Merged; conflicts in jptime/jerr resolved by keeping E90r's ptRepRows and adding the speaker voice INSIDE it: ptRepRows(rep,nm,person,shown) → ptVoice on the rows when the person is the one shown. My ptRepVoice removed. index.html/sw.js/assets.json rebuilt.
- Gates: news-runner-lines.js 0 FAIL · tinbao-words/scan.js PASS · shots.js nameInBody=false Fold+iPad («Nô tỳ nhờ quen người ở Chung Tú cung mà nghe ngóng được chuyện về Tần Thôi Uyển Dung. / Nàng ta thích tác phẩm Thi. [Việc thành chip]»).
- Shots: tb2511d-{fold,ipad}.jpg, tb2511d-{fold,ipad}-tin.jpg, tb2511d-ipad.webm.

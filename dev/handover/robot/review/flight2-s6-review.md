# flight2-s6 end-of-life review (ROBOT-PLAYER-REVIEW §B) — persona: skilled (core gamer, bot=sens)

## 1. Summary
- Persona skilled · origin thd · road thd_tho · iPad 1180x820 · seed 795064746 · life flight2-s6d (earlier runs s6, s6b, s6c void: harness bugs).
- Life: Diêu Hải Lan, «Con gái thầy đồ nghèo». Years 3 (age 18 → 20), 471 buổi, 913 taps, max rank Đáp ứng (rank 0; dropped to «Phế phi · lãnh cung» in year 1–2, back to Đáp ứng in year 3).
- Ending: Xuất gia — «Xuất gia làm ni cô», age 20, game-imposed (exitPick null; audit: VALID, last bot tap «Sang ngày mới»; danger «Nguy hiểm chung» was 86 on the last screens).
- Real time: ~5 h 40 min on the life (07:05Z–12:43Z) incl. 9 resumes from checkpoints; JS clicks 0; dead buttons 67 (all #dawn false positives, harness); stuck 4; bugs 32.

## 2. Scores
a. First 15 minutes — 6/10. Pretty start (Bình minh mùa xuân cinematic, clear «Tiếp theo»), but the Hành sự list is long and half greyed cards give no sense of the goal; the first visitor says «Tần ???» with no name.
b. Gameplay loop & pacing — 4/10. Each buổi is many taps (daily cinematic, Tin báo, Danh hiệu, Lịch tháng, queued dialogs); ~25 min per game year of real taps. Cards «hết khắc buổi này» leave nothing to do but «Sang ngày mới». The same «Tâm trạng» / «Tin báo» dialogs return again and again.
c. Buttons & UI — 3/10. Real taps exposed: act cards under the fixed #tabs bar (first life minutes); «Tin báo — 70 tin mới» with no ✕ at the top; a dialog queue that stacks copies (8× «Tâm trạng · Quý nhân Đường Hân Duyệt») so each ✕ looks dead; six «no-clock loops» (150 taps, game clock not moving): Hậu cung person focus at 0 khắc, Danh hiệu, Lịch tháng, Tin báo, Nhờ thái giám tìm thú nuôi, Chung Tú cung page; three softlocks where «Sang ngày mới»/«Sang buổi» is greyed or does not turn the buổi with no dialog on screen (queue Q=6, Q=1 «Tin trong cung buổi này», Q=2 «Có người đến / Y phục dự Tiết Đông chí»); page error «f.rk.split is not a function» (Hậu cung, known).
d. Story & drama — 4/10. Cause of the demotion to lãnh cung in year 1 was never shown to me (no scene explained it); gossip lines always say «cung nữ ??? kể». The ending (xuất gia, age 20) arrived after a Bổng lộc chest screen with no build-up I could read.
e. Characters & interactions — 5/10. Named consorts act (Cố Mặc Lan brings the prince to the Emperor, Quý nhân Lưu Lục Châu gets praised) and the Tin báo feed feels alive; but unnamed tellers «???» and a visitor shown as a grey silhouette «Tần ???» break it.
f. Choices & fairness — 4/10. In lãnh cung every card was greyed or cost Bạc (e.g. «Đưa cơm áo» Bạc -20) with the same small gain; I could not tell what would lift me out. Cards that need «chưa làm trong buổi này» / «đã làm hôm nay — mai chia bài mới» are explained but hard to read.
g. Rewards, feedback & emotion — 6/10. Bổng lộc chest («Chạm để mở»), Danh/Bạc floaters and the cinematic day transitions feel good; losses (demotion) had no feedback.
h. Mini-games — n/a. None entered on this life (harness only plays them to the end when offered).
i. Visuals & sound — 7/10. Palace map at night, Bình minh mùa xuân and Tiết Thanh minh fades are strong. Heavy: the page froze for ~35 min at save ~777k chars (chrome renderer 11 GB RSS, 90% CPU) around yr2 — a phone player would force-quit.
j. Co-op — n/a (solo).

## 3. Loved / hated
- Loved: (1) the dawn cinematic and season fades; (2) the night palace map; (3) the Tin báo gossip feed with named ranks.
- Hated: (1) no-clock loops / queued dialogs that look like dead buttons; (2) «Tin báo» with no ✕ at the top; (3) not knowing why I was demoted and why the life ended.
- Would I play another life? Not until the dialog queue / softlock family is fixed; the world is nice but a stuck «Sang ngày mới» costs the whole session.

## 4. Bugs (to the fast lane; evidence in dev/handover/robot/flight2-s6d-loop1/ and CDN img/_review/s6d-loop1|s6d-loop2|s6d-tinq1)
- Q-softlock family (dialog queue Q=1/2/6, «Sang ngày mới»/«Sang buổi» does not turn) — fix button-crawl-fix-5 de62f99c in review.
- Dialog queue holds N copies of the same «Tâm trạng» dialog (each ✕ pops one).
- «Tin báo» dialog without a header ✕.
- Page freeze / memory blow-up with a ~800k–1M char save in year 2–3 (save 1.12M chars at buổi 369) — save-growth e573b9b8 is the fix owner.
- «f.rk.split is not a function» (Hậu cung pcPort) — fixed in button-crawl-fix-1, not on LIVE during this life.
- Harness only: #dawn false DEAD BUTTONs (~45 per dawn cinematic).

## 5. Suggestions (as a player; MAIN files new-feature ones in PARKING_LOT.md)
- Show why a demotion happened (one scene or a line in Tin báo).
- Give lãnh cung a cheap way back (a card with no Bạc cost).
- A «Đóng hết» / skip-all on Tin báo and queued dialogs.
- Name the gossip teller (or say «một cung nữ») instead of «???».

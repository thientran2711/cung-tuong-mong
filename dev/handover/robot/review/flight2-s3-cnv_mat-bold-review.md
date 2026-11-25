# Player review — flight2-s3e-cnv_mat-bold (slot 3, persona greedy / min-maxer)

## 1. Summary
- Persona: greedy (min-maxer) played by a real-tap bot (harness 4523381f, Fold 755x1000). Origin cnv, road cnv_mat, seed 1037176545. Earlier runs s3 / s3b / s3c / s3d were voided (harness bugs, container restarts, resume stall); only s3e counts.
- Years: 10 game years (age 18 to 30), buổi 1418, 29616 real taps, 0 JS clicks.
- Max rank: none above «Cung nữ tam đẳng» (rank 0) for the whole life, served Hoàng hậu Lâm Kính Nghi, later Uyển quý phi Nam Cung Uyển Đình, later Phi Thượng Quan Bích Lạc; briefly Tân Giả khố (Y4).
- Ending: «Xuất cung tuổi 30» (game-imposed at age 30, type death/ending, exitPick none) — counts as a valid life.
- Real time: 07:38Z to ~19:10Z = ~11.5 h (about 120 buổi/h; 16 stuck traps of 15 min each = 4 h of that was lost to two game traps).

## 2. Scores (1-10)
a. First 15 minutes: 6. Pretty and clear top bar (stats, mood, 4 time dots), but the first screens are a wall of icons and a floating «Ân sủng» card with no goal sentence. Day 1 I could not tell what to do next beyond tapping 'Sang buổi'.
b. Gameplay loop & pacing: 3. Over 10 years the main result card is almost always «Nguy hiểm chung: Thôi. — ta không được gì, cũng không mất gì» (Sổ ghi Y8: 5 times in one week). Same laundry/bedding rooms every buổi. Nothing I did moved my rank.
c. Buttons & UI: 4. Two real traps: (1) «Tin báo» dialog (46 / 65 / 116 unread) has no ✕ visible at the top and no footer button, 12 stuck traps; (2) «Lệ tháng» reward dialog where the item hint «Ghi chú» repeats «· còn 6 lần dùng» ~25× and covers the dialog, 4 stuck traps. Also the three round shortcut icons cover the «Ân sủng» card labels; the name tag at the bottom right is squeezed into a vertical stack; the mood bar was reported covered once. 
d. Story & drama: 4. I see gossip («buông lời khiêu khích», «Nội vụ phủ bớt xén bổng lộc» repeated for every consort) but none involves me; my mistress changed twice and my post changed (tam đẳng → Tân Giả khố → back) with no scene I noticed.
e. Characters & interactions: 4. The ledger book (Sổ ghi) with portraits and the news list show a living court, but people never reached me or reacted to what I did; the same «sai người sang ghé chơi cung ta» lines repeat.
f. Choices & fairness: 3. As a min-maxer I found no lever: Danh 100 and 303 bạc at 28, Công lao shows «11/10», yet no promotion option appeared. Nothing to spend on, so no trade-offs.
g. Rewards, feedback & emotion: 4. Wins and losses are not shown: stat changes appear as small numbers; «Nguy hiểm chung: 34 / 68» bare numbers vs «Thôi» words (two notations); a rank-less decade feels flat. The ending has no text.
h. Mini-games: n/a (the bot never opened one that I noticed in the logged screens).
i. Visuals & sound: 8. Art is the strongest part: autumn/snow laundry yard, snowy Dư đồ map, ledger book, open-gate ending. Sound not testable in this headless run. Minus: the Dư đồ map labels overlap and every place says «đang cấm túc (1 tháng)».
j. Co-op: n/a (solo).

## 3. Top 3 loved / top 3 hated
Loved: (1) the snowy palace map and seasonal room art; (2) the Sổ ghi book (portraits, tabs, page flip); (3) the gorgeous open-gate ending illustration.
Hated: (1) «Tin báo» pile that cannot be closed/read, grows to 116; (2) a decade with no visible progress («ta không được gì, cũng không mất gì»); (3) overlapped/garbled UI bits (shortcut icons over «Ân sủng», vertical name tag, 25× repeated hint).
Would I play another life? Maybe one, for the art, but only if the first minutes gave me a clear goal and the cung nữ phase did not stall for ten years.

## 4. BUGS (reported to Foreman F #7 as found)
1. «Lệ tháng · Nội vụ phủ phát» reward dialog: «Ghi chú» hint for item «Chải tóc vấn Kiều cầu kỳ» repeats «· còn 6 lần dùng» ~25× (loop in the string builder) and covers the dialog → real-player trap (harness: 4 stuck, 15 min each). Repro: reach a monthly stipend containing that item with 6 uses left, open its hint. Shot: shots-flight2-s3e-cnv_mat-bold/bug-uses-loop.png, stuck-2.png.
2. «Tin báo» dialog (N tin mới) shows no ✕ and no footer in view; 12 stuck traps; closes only via harness ladder lvl 3. Shot: stuck-1.png. Save: stuck-1-save.json.
3. «Công lao 11/10» (value above cap) on the stats card (Y9).
4. Raw numbers in prose, e.g. «Nguy hiểm chung: 68», «Sủng 29 → 17», «Sủng 0» (VANPHONG: no raw numbers/odds) while the result card uses word grades («Thôi»).
5. Dư đồ map: every place tagged «đang cấm túc (1 tháng)» and labels overlap (Vĩnh Hòa / Thừa Minh / Cảnh Phúc).
6. Ending screen «Xuất cung» has no text/button in the end shot.
7. Dead-button log: «Tâm trạng Bình thản -5» covered by span in #kntc (Tích Cần viện page), 1 time.
8. Same seed gives different origin rolls per run (stats/names differ s3c vs s3e); seed does not reproduce the character.

## 5. Suggestions (player view; feature freeze, law 18: MAIN files new-feature ones in PARKING_LOT)
- Give «Tin báo» a ✕ and a 'đã đọc hết' footer; cap/collapse repeated «bớt xén bổng lộc» news.
- Show a visible reason when I am reassigned or when Chủ tin drops to 0.
- Make 'Nguy hiểm chung' outcomes differ or let me pick other actions earlier; a cung nữ should have a visible ladder (what to do to reach the next rank).
- Show an ending text with my life summary.

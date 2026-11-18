PASS c053ee925cb347196d4cdf27ade3bd72008e1a40
# Review: review/story14-p1-r2 @ f5305341 (14-chapter frame, phase 1, fix of r1 FAIL) — reviewer r3

Branch `review/story14-p1-r3` @ c053ee92 (pushed) = f5305341 + 4 small reviewer fixes + merges of origin/main fb367740, 12f52db7, 2934bede,
c19b25eb, 810d594a, ec315daf, 86229158 (main moved 7 times during the review; conflicts only in assemble.py — main's list + `jst14.js` after `j67.js` — and the
built index.html / sw.js / assets.json, regenerated with dev/site/build_site.sh). origin/main 86229158 is an ancestor: fast-forward ready. Full test set ran on every merge up to b429007c (810d594a); the last two merges
(ec315daf install/status/tutorial, 86229158 map labels: no story code) were checked with build + story14-view (+ story14-host on 03f343e9): PASS.
If main moves again: the only conflicts are assemble.py (add `'jst14.js'` after `'j67.js'`) and the built files (rebuild).
Read: CLAUDE.md, START_CORE / START_WORKER / START_REVIEWER, REVIEWER.txt, PREAMBLE.txt, topic story-roads.md + wording.md, VANPHONG, r1 FAIL list, r2 worker report.
START_CTX ~3 % (estimate; context_usage read 0).

## r1 FAIL items — verified
| # | item | verdict |
|---|---|---|
| 1 | home road closes ch1 «Lỡ dịp» | FIXED. Tutorial months wait at home (f14El/wait), msCheck67 skips a tutorial chapter at home, kcEnter wrapper restarts it at entry (t0, r0 = entry rank). Test item-1 check PASS (3 entry ranks: open, full time, reward only on a real step, HẠN "tính từ ngày nhập cung" at home). Co-op friend goes through the same kcEnter; coop-e2e 59/59. |
| 2 | cnv double reward / servant steps | FIXED. cnv ch1/ch2 servant steps (Chủ tin, Đại cung nữ, Hoàng thượng để ý, phong Đáp ứng); len14 replaced by a shared arc (no reward) when already raised. Test PASS. |
| 3 | hostility keyword scan | FIXED. F14ROLE table role by role; muoi_no / ch_ho not hostile; test fails on any unlisted role. Note: bd arcs are not in the table (bd has no frame at all, see note 1). |
| 4 | ONE CORE | FIXED for jst14 (BAL.st14 + BAL.ntRise; scan 0 typed game numbers; 45 now one constant in j42 ×4 + j67 + jst14). Whole family, reviewer fix: the old j67 `len` / `sung` milestones (same deeds as len14 / sung14) still typed Danh 4 / 2 and reward tier 2 / 1 → now read BAL.st14.danh / rw (same values, old saves unchanged). |
| 5 | false certainty in previews | Was NOT fixed in the visible UI → reviewer fix. (a) the preview printed the ACT ladder ("kết: X · Khá chắc") for the chance an ending holds, also on SURE options: VANPHONG says the ladder is only the act's own odds and a sure act carries no word; the chance of an accompanying thing uses Rất thấp…Rất cao. (b) The real story dialog does not show that text: the kit hint (jk2b kitHint/kitOptModel, KIT 28.6) splits on " · " and dropped the word, so the player still saw "kết: Cha con xa cách" as certain (and on a sure option a bare ladder word would have been read as the act's odds → "thành bại khó đoán"). Fix in j67 PEND.j67: `kết: X (có thể xoay chiều: <chanceLvl>)`, inside the ending phrase so the hint keeps it. Seen in the dialog at 755x1000: "được tiếng hiền, kết: Cha con xa cách (có thể xoay chiều: Vừa)". Test check updated (scale words + the kit hint, where the hint names the ending). "Xoay chiều" result row + log line PASS. Neutral bias even (base 15/15). |
| 6 | Chương 1/15 | FIXED (f14Norm after j96 / jkc splices + every syncMain67). Test: max 14 at start and after 12 months, no "/15". |
| 7 | "Hạn: không có hạn" | FIXED: msHan67 = one HẠN row in card, panel, tab, chapter detail. Seen: "còn 6 tháng, rồi chương tự khép, không thưởng" next to "Hoặc qua sáu tháng đầu (0/6), không thưởng". |
| 8 | test gaps | FIXED (fast bot runs all 9 origins incl. cnv, fails on origin mismatch; checks for 1/2/3/5/6). Reviewer fix: the sensible-bot part failed in 2 of 4 runs ("bot played a life with the frame 0"): its first life was left to the roulette, and a rolled **bd** life has no chapter frame (note 1); first life now pinned to tt. |

## Reviewer fixes on review/story14-p1-r3 (small, all in this branch's scope)
1. j67 option preview: turn chance on the chance scale, inside the ending phrase (item 5 above).
2. jgoal: chapter 1/2 of the 14-chapter tutorial (nhap14 / sung14) lost the guide row "Làm Hoàng thượng để mắt tới" and the "Muốn lên <bậc>" requirement rows that main shows for `nhap` (keyed on id "nhap"): now `nhap|nhap14|sung14` / `nhap|nhap14`. Seen in the chapter detail at 1180x820.
3. j67 old len/sung read BAL.st14 (item 4).
4. story14-frame.js: item-5 check, first-life pin, label quote.

## Tests (merged build fb367740 + fixes)
| test | result |
|---|---|
| dev/test/story14-frame.js (20 sensible-bot steps, fast bot 9 origins, items 1/2/3/5/6, L1247/L1253, old saves vs main fb367740 + frame-off) | 27/27 PASS, 0 page errors on every merge after the bd pin (0b339d52, b9c3b97a, 0484824b, 0a41ee8c, b429007c) |
| dev/test/story14-view.js 755x1000 + 1180x820 | PASS |
| dev/test/story14-host.js (host ?khost=1 via lib/device.js: Fold 755x1000, iPad 1180x820, iPad Pro 1366x1024) | PASS (0a41ee8c), shots looked at |
| dev/test/coop-e2e.js (live Worker) | 59/59 PASS (0484824b, 0a41ee8c incl. main's new co-op chat; one 57/59 run on b9c3b97a = random rebirth of the friend into a home road, re-run 59/59, main 12f52db7 59/59) |
| dev/test/story-deadline.js, kc-lore/scan.js | PASS |
| dev/test/kc-lore/route-td.js | PASS ×3; 1 FAIL run = random home life ended in marriage at month 3, then the harness pressed "Kiếp này" (new life) and read it as "did not enter the palace": harness flake, not this branch (main passes other random walks the same way) |
| dev/test/chap-label.js CHECK=1 | 1 FAIL "arc head has Chương · Hồi" — **same FAIL on origin/main** (checked on main 0ce59361 and 2934bede at 755x1000), not this branch |
| one-core scan dev/measure/st14-onecore-scan.py | 0 typed game numbers, 0 number words |
Viewports (deviceScaleFactor 1, looked at each): Mệnh truyện tab at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390 (direct) — chips "Chương 1/14 · Nhập cung học việc", "còn 13 chương", HẠN row; no horizontal overflow, 0 page errors; 390x844 shows the rotate prompt. Story dialog at 755x1000 + 1180x820 (tt_co hồi 1). Pictures blank = CDN slow in this sandbox.
Kit: no new UI part (kitRows / rows67 / kchip / card67 rows / kit hint); chips match the existing .ktop chips. No KIT REQUEST. Wording: no %, cổ trang; ladder use now per VANPHONG.

## Notes for the coordinator (not blocking this PASS)
1. **bd (Công chúa Bắc Địch hòa thân) lives get NO chapter frame, on main too**: jorigins.js defines STORY.bd after j67 wraps STORY (j67:192 `W.init → a67init`), so a bd life keeps the v1 story (`S.st={step,done,tag,m}`), no j67 chapters, no 14-chapter frame, its 4 ARC67.bd_* arcs never run from Mệnh truyện. OD:L1215 says bd becomes a country branch inside nc (Foreman C D18) — that restructure should give it the frame; until then every bd life misses OD:L1242. F14ROLE will need the bd_* roles then.
2. ONE CORE follow-up (pre-existing main code, not this branch's numbers): j67 scEnd67 Lợi thế thresholds 1 / 3 are typed, and jst14 f14Odds/f14Why mirror the neutral 1; f14Plan builds Phần cuối as 3 fixed entries and Phần giữa around "4 premises", so changing BAL.st14.parts alone would not reshape the plan.
3. A sure option that has a gain does not print its ending at all (j67 `gain||eT`, main behaviour), so neither the ending nor its turn chance shows there: no false certainty, but phase 2 may want the ending shown.
4. The tutorial step counter shows the time-limit line as a step ("Bước 0/2"). Cosmetic.
5. 844x390 direct: the Mệnh truyện sub-tab pill row is cut at the right ("Tâm nguyệ…"); this branch does not touch that row.
